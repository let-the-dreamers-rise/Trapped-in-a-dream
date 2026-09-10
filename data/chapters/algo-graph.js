// Textbook chapter: Graph Algorithms (shortest paths, MST, and the heavier
// traversal applications).
//
// This is the full teaching text for the topic — written to be read by someone
// who already has the representations-and-traversal chapter (pds-graphs-rep)
// behind them, in the order a good book would teach it, with every claim
// derived or demonstrated rather than stated. The short summaries in
// data/questions/algo.js remain as reference cards; this is the thing you
// learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS
// lines are section headings, "• " starts a bullet, "1. " a numbered step,
// "KEY:" and "GATE TRAP:" make callout cards, a lone equation becomes a
// formula block, and [[FIG:id]] places a figure — from this chapter's figs
// list or from the topic's own figure set in data/questions/algo.js.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['algo-graph'] = {
  figs: [
    {
      id: 'scc-condensation',
      caption: 'Three strongly connected components and the condensation DAG they collapse to. Every edge between components points the same way as in the original graph.',
      svg: '<svg viewBox="0 0 380 160" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-scc1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.5" fill="none"><ellipse cx="70" cy="85" rx="55" ry="38"/><ellipse cx="205" cy="42" rx="45" ry="30"/><ellipse cx="325" cy="85" rx="50" ry="38"/><line x1="118" y1="68" x2="163" y2="52" marker-end="url(#ah-scc1)"/><line x1="245" y1="58" x2="285" y2="72" marker-end="url(#ah-scc1)"/><line x1="112" y1="105" x2="278" y2="105" marker-end="url(#ah-scc1)"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="70" y="80">1, 2, 3</text><text x="205" y="38">4, 5</text><text x="325" y="80">6, 7, 8</text></g><g font-size="10" fill="currentColor" text-anchor="middle" opacity=".75"><text x="70" y="98">mutual cycle</text><text x="205" y="55">mutual cycle</text><text x="325" y="98">mutual cycle</text><text x="70" y="140">SCC 1</text><text x="205" y="95">SCC 2</text><text x="325" y="140">SCC 3</text></g></svg>'
    },
    {
      id: 'ap-lowlink',
      caption: 'Two triangles joined by bridges to a pendant path. Vertices 3, 4 and 7 are articulation points; edges (3,4), (4,7) and (7,8) are bridges — exactly the edges with no alternate route around them.',
      svg: '<svg viewBox="0 0 380 180" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.4" fill="none"><line x1="40" y1="50" x2="40" y2="110"/><line x1="40" y1="50" x2="100" y2="80"/><line x1="40" y1="110" x2="100" y2="80"/><line x1="100" y1="80" x2="170" y2="80" stroke-dasharray="4,3"/><line x1="170" y1="80" x2="220" y2="50"/><line x1="170" y1="80" x2="220" y2="110"/><line x1="220" y1="50" x2="220" y2="110"/><line x1="170" y1="80" x2="250" y2="80" stroke-dasharray="4,3"/><line x1="250" y1="80" x2="320" y2="80" stroke-dasharray="4,3"/></g><g fill="none" stroke="currentColor"><circle cx="40" cy="50" r="12"/><circle cx="40" cy="110" r="12"/><circle cx="100" cy="80" r="15" stroke-width="2.4"/><circle cx="170" cy="80" r="15" stroke-width="2.4"/><circle cx="220" cy="50" r="12"/><circle cx="220" cy="110" r="12"/><circle cx="250" cy="80" r="15" stroke-width="2.4"/><circle cx="320" cy="80" r="12"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><text x="40" y="54">1</text><text x="40" y="114">2</text><text x="100" y="84">3</text><text x="170" y="84">4</text><text x="220" y="54">5</text><text x="220" y="114">6</text><text x="250" y="84">7</text><text x="320" y="84">8</text></g><text x="190" y="150" font-size="10" text-anchor="middle" fill="currentColor">thick circles = articulation points; dashed edges = bridges</text></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

The representations-and-traversal chapter gave you the machinery to walk a graph and to order the vertices of a DAG. This chapter spends that machinery. Real questions about networks are almost never "can I get from s to t" — they are "what is the cheapest way", "what is the fewest wires I need to keep everyone connected", "which single point of failure would split the network in two". Every one of those is a graph algorithm built on BFS, DFS, or a priority-queue variant of them.

We will do five things: find the strongly connected pieces of a directed graph, find the single points of failure in an undirected one, build the cheapest possible skeleton connecting every vertex (the minimum spanning tree), find the cheapest path from one vertex to every other (single-source shortest paths), and find the cheapest path between every pair at once (all-pairs shortest paths). Every algorithm is traced by hand on a concrete graph, with the data structure shown after every step, because the traces are where the algorithm's logic actually lives.

RECAP: BFS, DFS AND TOPOLOGICAL SORT

Breadth-first search explores a graph level by level: starting from a source s, it visits everything at distance 1, then everything newly reachable at distance 2, and so on, using a queue to hold the frontier. Because it discovers vertices in strictly increasing order of edge-count, the first time BFS reaches a vertex is via a shortest path in that edge-count sense — this only means "shortest" when every edge costs the same, which is why BFS cannot be used once edges carry different weights. Cost: Theta(V + E) with adjacency lists.

Depth-first search instead plunges as deep as it can before backing up, using a stack (explicit or via recursion), and records a discovery time and a finish time for each vertex. Those two timestamps classify every edge — tree, back, forward or cross in a directed graph, only tree and back in an undirected one — and a directed graph has a cycle exactly when DFS finds a back edge. Cost: Theta(V + E) with adjacency lists, same as BFS, because both visit each vertex once and scan each edge once.

Topological sort orders the vertices of a DAG so every edge points left to right, and only makes sense for a DAG — a cycle has no such order, since it would require some vertex to precede itself. Both methods you already have — repeatedly removing indegree-0 vertices (Kahn's algorithm, using a queue) and reading off DFS finish times in reverse — run in Theta(V + E), and a DAG can have many valid topological orders when the DAG itself leaves some pairs of vertices unconstrained.

[[FIG:bfs-dfs-layers]]

KEY: BFS and DFS answer "does a path exist" and, for BFS, "what is the fewest-edges path" — but neither one knows what a weighted "shortest path" means. Everything from here on is about giving edges a cost and adapting the traversal machinery to respect it.

STRONGLY CONNECTED COMPONENTS

In a directed graph, reachability is not symmetric: u can reach v without v being able to reach u. A strongly connected component (SCC) is a maximal set of vertices that are all mutually reachable — for every pair u, v in the set, there is a directed path u to v and a directed path v to u. Every vertex belongs to exactly one SCC (its own singleton, if it has no cycle through it).

Why bother finding them? Because once you shrink each SCC down to a single point, what is left — the condensation — is always a DAG. There cannot be a cycle among condensed SCCs, because any such cycle would prove those SCCs were mutually reachable and so should have been one SCC in the first place. This is enormously useful: any question about the directed graph's overall structure ("can I reach vertex t from vertex s") reduces to a question about a DAG, which you already know how to handle with topological order.

[[FIG:scc-condensation]]

KOSARAJU'S ALGORITHM, TRACED

Kosaraju's algorithm finds every SCC in two DFS passes. The idea: run DFS on the graph G and record finish times, exactly as for topological sort. Then build the transpose graph G^T — every edge reversed — and run DFS on G^T again, but this time choosing the next unvisited start vertex in DECREASING order of the finish times from the first pass. Each tree produced by this second DFS is exactly one SCC.

Why does reversing and reordering work? The vertex with the highest finish time in pass one must belong to a "source" SCC of the condensation — an SCC with no incoming edges from any other SCC — because if some other SCC had an edge into it, DFS would have had to finish that other SCC's exploration strictly later (it would still be on the call stack, delaying the finish). Starting the second DFS there, on the TRANSPOSE, can only explore backward within that one SCC: any edge leaving it in G^T would be an edge entering it in G, which cannot exist since it is a source. So the first tree is forced to be exactly that SCC, and inductively the same argument applies to what remains.

Trace it on a concrete 8-vertex directed graph. Vertices 1–8, edges: 1→2, 2→3, 3→1 (a triangle), 4→5, 5→4 (a 2-cycle), 6→7, 7→8, 8→6 (a triangle), plus the connecting edges 3→4, 5→6, 2→6.

1. Pass one, DFS from vertex 1 (adjacency lists in increasing numeric order). Discover 1, then 2, then 3. From 3, visit 1 — already grey (an ancestor) — a back edge, skip. From 3, visit 4 (unvisited) — discover 4.
2. From 4, visit 5 — discover 5. From 5, visit 4 — grey ancestor, back edge, skip. From 5, visit 6 — discover 6.
3. From 6, visit 7 — discover 7. From 7, visit 8 — discover 8. From 8, visit 6 — grey ancestor, back edge, skip. Finish 8.
4. Finish 7, then finish 6, then finish 5, then finish 4.
5. Back at 3: next neighbour is 4, already black — nothing to do. Finish 3.
6. Back at 2: next neighbour is 6, already black — since 6 is a descendant of 2 in the DFS tree (not an unrelated, already-finished subtree), this is a FORWARD edge, not a cross edge — nothing to do either way. Finish 2. Finish 1.

Finish times: 8→9, 7→10, 6→11, 5→12, 4→13, 3→14, 2→15, 1→16. Decreasing-finish-time order for pass two: 1, 2, 3, 4, 5, 6, 7, 8.

7. Build G^T by reversing every edge: 1←2 becomes an edge 2→1 out of... more usefully, list G^T's adjacency directly: 1:[3], 2:[1], 3:[2], 4:[3,5], 5:[4], 6:[2,5,8], 7:[6], 8:[7].
8. Pass two, start at 1 (highest finish time). DFS(1) in G^T visits 1, then 3 (1's only neighbour), then from 3 visits 2, then from 2 visits 1 — already visited, stop. Finish this tree: {1, 3, 2}. That is SCC 1.
9. Next unvisited in the order is 4. DFS(4) in G^T visits 4, then 5 (since 3 is already visited), then from 5 visits 4 — already visited, stop. Tree: {4, 5}. That is SCC 2.
10. Next unvisited is 6. DFS(6) in G^T visits 6, skips 2 and 5 (visited), visits 8, then from 8 visits 7, then from 7 visits 6 — already visited, stop. Tree: {6, 8, 7}. That is SCC 3.

Three SCCs: {1, 2, 3}, {4, 5}, {6, 7, 8}. The condensation is exactly SCC1 → SCC2 → SCC3, a DAG, matching the connecting edges 3→4, 5→6 and 2→6 which all go the same direction and never backward. Total cost Theta(V + E): two DFS passes plus building the transpose, each linear.

KEY: Kosaraju needs the finish times from an ordinary DFS, a literal transpose of the graph, and a second DFS restricted to start vertices in decreasing finish-time order. Skip the ordering and the second pass can merge unrelated SCCs into one tree.

TARJAN'S ALGORITHM AND THE CONDENSATION DAG

Tarjan's algorithm finds all SCCs in a SINGLE DFS pass, using the same low-link idea articulation points use (met properly two sections from now): alongside the discovery time disc[v], track low[v], the smallest discovery time reachable from v's subtree using at most one edge that jumps to an already-visited vertex still "active" (on the current DFS stack, not yet finished into its own SCC). A vertex is the root of an SCC — meaning "pop everything down to and including v off the stack; that popped set is one SCC" — exactly when low[v] equals disc[v], meaning nothing in v's subtree can escape to an earlier, still-active vertex.

At this level of detail you should recognise the shape of the algorithm and why it needs only one pass (the low-link values accumulate as the single DFS proceeds, rather than needing a second traversal on a transposed graph) rather than reproduce every implementation subtlety of the auxiliary stack. Both Kosaraju and Tarjan run in Theta(V + E); Tarjan is usually preferred in practice for needing only one pass and no transpose, while Kosaraju's two-pass structure is the one worth being able to trace by hand.

ARTICULATION POINTS AND BRIDGES, TRACED

Switch to undirected graphs and a different kind of fragility question: which single vertex, if removed, would split the graph into more pieces? That is an articulation point (or cut vertex). Which single edge, if removed, would do the same? That is a bridge. Both matter for network reliability — an articulation point or bridge is a place with no backup route.

Both are found with one DFS, computing for each vertex v its discovery time disc[v] and a low-link value low[v]: the smallest discovery time reachable from v's own subtree by using at most one "escape" — either a back edge straight out of the subtree to an ancestor, or a low value already computed for a child. Intuitively, low[v] answers "if I stand in v's subtree, how far back up the tree can I reach without going through v?"

The test for a non-root vertex v: it is an articulation point if some DFS-tree child c has low[c] ≥ disc[v] — the child's whole subtree has no escape route above v, so removing v strands it. The tree edge (v, c) is a bridge under the strictly stronger test low[c] > disc[v] — no escape even back to v itself via some other path, so the edge itself is the only connection. The root of the DFS tree is a special case, proved below.

Trace this on the two-triangles-plus-pendant graph: vertices 1–8, edges 1-2, 2-3, 3-1 (triangle), 3-4, 4-5, 5-6, 6-4 (triangle), 4-7, 7-8. Start DFS at 1, adjacency lists sorted increasing, a time counter t starting at 1.

1. Visit 1: disc[1]=1, low[1]=1. Its neighbours are 2 and 3; visit 2 first (tree edge).
2. Visit 2: disc[2]=2, low[2]=2, parent 1. Neighbour 1 is the parent (skip); neighbour 3 is unvisited (tree edge).
3. Visit 3: disc[3]=3, low[3]=3, parent 2. Neighbour 1 is visited and is NOT the parent — a back edge to an ancestor, so low[3] = min(3, disc[1]=1) = 1. Neighbour 2 is the parent (skip). Neighbour 4 is unvisited (tree edge).
4. Visit 4: disc[4]=4, low[4]=4, parent 3. Neighbours 3(parent, skip), 5 (tree edge).
5. Visit 5: disc[5]=5, low[5]=5, parent 4. Neighbours 4(parent, skip), 6 (tree edge).
6. Visit 6: disc[6]=6, low[6]=6, parent 5. Neighbour 5 is the parent (skip); neighbour 4 is visited, not the parent — back edge, low[6] = min(6, disc[4]=4) = 4. No unvisited neighbours; finish 6, return to 5 with low[6]=4.
7. At 5: low[5] = min(5, low[6]=4) = 4. Child 6's test: low[6]=4 ≥ disc[5]=5? No (4 < 5) — 5 is not an articulation point via this child. Finish 5, return to 4 with low[5]=4.
8. At 4: low[4] = min(4, low[5]=4) = 4. Child 5's test: low[5]=4 ≥ disc[4]=4? Yes — 4 IS an articulation point. Continue 4's neighbours: 6 is visited, not parent — back edge, low[4] stays min(4, disc[6]=6) = 4. Next neighbour of 4 is 7, unvisited (tree edge).
9. Visit 7: disc[7]=7, low[7]=7, parent 4. Neighbours 4(parent, skip), 8 (tree edge). Visit 8: disc[8]=8, low[8]=8, parent 7, no other neighbours. Finish 8, return to 7 with low[7]=min(7, low[8]=8)=7. Child 8's test: low[8]=8 ≥ disc[7]=7? Yes — 7 IS an articulation point. Finish 7, return to 4.
10. At 4: low[4] = min(4, low[7]=7) = 4 (unchanged). Child 7's test: low[7]=7 ≥ disc[4]=4? Yes — 4 confirmed an articulation point (already found via child 5; a vertex only needs one qualifying child). Finish 4, return to 3 with low[4]=4.
11. At 3: low[3] = min(1, low[4]=4) = 1 (unchanged, since the back edge to 1 was already stronger). Child 4's test: low[4]=4 ≥ disc[3]=3? Yes — 3 IS an articulation point. Finish 3, return to 2 with low[3]=1.
12. At 2: low[2] = min(2, low[3]=1) = 1. Child 3's test: low[3]=1 ≥ disc[2]=2? No (1 < 2) — 2 is not an articulation point. Finish 2, return to 1 with low[2]=1.
13. At 1 (the root): low[1] = min(1, low[2]=1) = 1. Vertex 1 has exactly ONE child in the DFS tree (vertex 2). Root special case: the root is an articulation point if and only if it has TWO OR MORE children in the DFS tree — with only one child, removing the root cannot separate anything the child's subtree wasn't already connected to. So 1 is NOT an articulation point.

Articulation points: {3, 4, 7}. Bridges (edges failing low[child] > disc[parent] strictly): (3,4) since low[4]=4 > disc[3]=3; (4,7) since low[7]=7 > disc[4]=4; (7,8) since low[8]=8 > disc[7]=7. Edges inside either triangle are never bridges — each has an alternate route.

[[FIG:ap-lowlink]]

REMEMBER: A non-root vertex v is an articulation point when some child c satisfies low[c] ≥ disc[v]; a root is an articulation point only when it has two or more DFS-tree children. Forgetting the root's special rule is the single most common mistake in this algorithm.

GATE TRAP: Do not confuse the articulation-point test (low[c] ≥ disc[v], non-strict) with the bridge test on the same edge (low[c] > disc[v], strict). An edge (v, c) with low[c] = disc[v] exactly makes v an articulation point but does NOT make (v, c) a bridge — c's subtree can still get back to v itself, just not past v.

WHY WE NEED A MINIMUM SPANNING TREE

Suppose you must connect n sites with cable, and each possible cable run between two sites has a cost. You want every site connected to every other (directly or through others), using the least total cable. A spanning tree already answers "connect everything with the fewest edges" — exactly V − 1 edges, no cycles, from the previous chapter. Now add weights and ask for the CHEAPEST such tree: the minimum spanning tree (MST).

An MST exists whenever the graph is connected, and it always has exactly V − 1 edges — adding any more would create a cycle (redundant, since a tree already connects everything), and having fewer would leave something disconnected. The question is which V − 1 edges, out of possibly many more, minimise the total weight — and remarkably, a correct choice can be built purely greedily, one edge at a time, with a guarantee that no later edge will ever need to be undone.

THE CUT PROPERTY

A cut of a graph is any partition of its vertices into two non-empty sets S and V − S. An edge "crosses" the cut if it has one endpoint in each set. The cut property is the fact that makes every MST algorithm work:

For any cut (S, V − S) of a connected weighted graph, if e is a minimum-weight edge crossing that cut, then e belongs to SOME minimum spanning tree.

Prove it by an exchange argument. Suppose, for contradiction, some MST T does not contain e. Since T is a spanning tree, adding e to T creates exactly one cycle (T plus one extra edge always creates exactly one cycle — the previous chapter's tree-edge-count result). That cycle must cross the cut (S, V − S) at least twice, because it starts on one side, must cross to reach the other endpoint of e, and must cross back again to close up. Let f be some other edge of that cycle that also crosses the cut. Since e was chosen as a minimum-weight crossing edge, weight(e) ≤ weight(f). Now swap: remove f from T and add e instead. The result, T', is still a spanning tree — the cycle is broken by removing f, so no cycle remains, and connectivity is preserved because f was replaced by e which reconnects the two pieces f used to join, via the cut. Its total weight is weight(T) − weight(f) + weight(e) ≤ weight(T), so T' is also a minimum spanning tree, and it contains e. This proves some MST contains e.

THE CYCLE PROPERTY

The mirror statement: for any cycle in the graph, if f is the UNIQUE maximum-weight edge on that cycle, then f belongs to NO minimum spanning tree. The proof is the same exchange run backward — if some MST did contain f, removing f splits the tree into two pieces, and the cycle (minus f) must cross that split via some other edge g; since f was the unique maximum on the cycle, weight(g) < weight(f), so swapping g in for f gives a strictly lighter spanning tree, contradicting that the original was minimum.

KEY: The cut property says "the cheapest way across any boundary is always safe to take." The cycle property says "the priciest edge on any cycle is never needed, if strictly heaviest, because there is always a cheaper way around." Kruskal's algorithm is the cycle property applied edge by edge from the top; Prim's is the cut property applied cut by cut from one growing tree.

KRUSKAL'S ALGORITHM

Kruskal's algorithm sorts all edges by weight ascending, then walks the sorted list adding each edge unless it would create a cycle with edges already chosen — i.e., unless its two endpoints are already connected through previously added edges. It stops once V − 1 edges have been added. Correctness follows directly from the cut property: consider the components formed by the edges accepted so far; the next edge in sorted order that joins two different components is, among all edges crossing the cut between those two component-sets and everything else, tied for minimum weight (nothing lighter remains unexamined), so it is safe by the cut property.

Detecting "would this edge create a cycle" quickly is exactly what a disjoint-set (union-find) data structure is for, so Kruskal is built on top of one.

UNION-FIND: BY RANK AND PATH COMPRESSION

A disjoint-set structure supports two operations: find(x), which returns a representative ("root") for whichever set x currently belongs to, and union(x, y), which merges the sets containing x and y. Kruskal calls find on both endpoints of an edge — if the roots differ, the endpoints are in different components, so the edge is safe and union merges them; if the roots are equal, the edge would close a cycle and is rejected.

Implemented naively — each element points to a parent, roots point to themselves, find walks up parent pointers — a long chain of unions can build a tall, thin tree, making find slow: attaching every new element as a child of the previous root, with no balancing at all, produces a chain of height n − 1 after n − 1 unions, so a single find costs Theta(n) in the worst case.

Two independent fixes remove this. Union by rank keeps an approximate height ("rank") for each root and always attaches the SHORTER tree under the root of the TALLER one (ties broken by convention, and the surviving root's rank increases by one only on a tie). This alone caps every tree's height at O(log n), since a tree of rank r must have been formed by merging two trees of rank ≥ r − 1, so its size at least doubles every time its height increases — exactly the argument that bounds a balanced binary tree's height by log(size).

Path compression is a second, independent fix applied during find: after walking up to the root, go back and re-point every visited node directly at that root, so any future find along that same path is O(1). Applied alone it already keeps trees shallow over time; applied together with union by rank, the two reinforce each other.

REMEMBER: Union by rank bounds height by controlling which tree gets attached under which. Path compression flattens a tree lazily, only on the finds that actually walk it. Together, over a sequence of m union/find operations on n elements, the amortised cost per operation is:

T(m operations) = O(m · alpha(n))

where alpha is the inverse Ackermann function — a function that grows so slowly it is under 5 for any n you could ever construct in practice. For every purpose in this course, treat union-find operations as O(1) amortised.

Trace it briefly (union by rank only, no compression triggered here since no find walks a chain of length > 1): start with 8 singletons {0..7}, ranks all 0. union(0,1): equal ranks, attach root(1) under root(0), rank[0] becomes 1. union(2,3): similarly, root(3) under root(2), rank[2]=1. union(4,5): root(5) under root(4), rank[4]=1. union(0,2): equal ranks (both 1), attach root(2) under root(0) (by the tie convention "second argument's root goes under the first"), rank[0] becomes 2. union(4,6): ranks differ (rank[4]=1 > rank[6]=0), attach root(6)=6 directly under root(4)=4, no rank change. union(0,4): ranks differ (rank[0]=2 > rank[4]=1), attach root(4)=4 under root(0)=0. After this, parent[6] is still 4 (6's parent was set to 4 by the union(4,6) step and nothing since has touched 6 directly) — union-by-rank only ever changes the pointer at a ROOT, and 6 stopped being a root the moment it was attached to 4.

GATE TRAP: "parent[x] after a union" is asking for x's IMMEDIATE parent pointer, not its ultimate root — and union by rank changes the parent pointer only of whichever ROOT gets attached, never of a non-root element. Trace unions one at a time and update only root pointers; do not assume every element's parent becomes the newest overall root.

KRUSKAL TRACED, EDGE BY EDGE

Take an 8-vertex weighted graph on A–H with edges: C-E(1), B-C(2), G-H(2), A-C(3), F-G(3), A-B(4), F-H(4), B-D(5), E-F(5), C-D(6), D-E(7), D-F(8), E-G(9). Sorted ascending (ties broken in listed order): C-E(1), B-C(2), G-H(2), A-C(3), F-G(3), A-B(4), F-H(4), B-D(5), E-F(5), C-D(6), D-E(7), D-F(8), E-G(9).

Initialise each of A–H as its own singleton set. Kruskal needs V − 1 = 7 edges.

1. C-E, weight 1: different sets (C alone, E alone) — accept. Union {C,E}. MST weight so far: 1.
2. B-C, weight 2: B alone, C in {C,E} — different — accept. Union {B,C,E}. MST weight: 3.
3. G-H, weight 2: different sets — accept. Union {G,H}. MST weight: 5.
4. A-C, weight 3: A alone, C in {B,C,E} — different — accept. Union {A,B,C,E}. MST weight: 8.
5. F-G, weight 3: F alone, G in {G,H} — different — accept. Union {F,G,H}. MST weight: 11.
6. A-B, weight 4: both already in {A,B,C,E} — SAME set — reject (would close a cycle).
7. F-H, weight 4: both already in {F,G,H} — SAME set — reject.
8. B-D, weight 5: B in {A,B,C,E}, D alone — different — accept. Union {A,B,C,D,E}. MST weight: 16.
9. E-F, weight 5: E in {A,B,C,D,E}, F in {F,G,H} — different — accept. Union merges into ALL 8 vertices: {A,B,C,D,E,F,G,H}. MST weight: 21. That is 7 accepted edges — stop.

Final MST edges: C-E, B-C, G-H, A-C, F-G, B-D, E-F, total weight 1+2+2+3+3+5+5 = 21. Two edges (A-B and F-H) were correctly rejected as redundant by the cycle property — each closes a cycle whose maximum edge is itself.

[[FIG:mst-highlight]]

PRIM'S ALGORITHM, TRACED

Prim's algorithm grows a single tree from one starting vertex, at every step adding the cheapest edge with exactly one endpoint inside the growing tree and one outside — this is the cut property applied at the cut between "tree so far" and "everything else". Maintain, for every vertex not yet in the tree, a key value: the weight of the cheapest edge seen so far connecting it to the tree (infinity if none yet), and a parent pointer recording which tree edge achieves that key.

Run it on the same 8-vertex graph, starting from A. Full adjacency: A: B(4), C(3). B: A(4), C(2), D(5). C: A(3), B(2), D(6), E(1). D: B(5), C(6), E(7), F(8). E: C(1), D(7), F(5), G(9). F: D(8), E(5), G(3), H(4). G: E(9), F(3), H(2). H: F(4), G(2).

1. Initial keys: A=0, all others infinity. Extract minimum unvisited: A (key 0). Add A to the tree. Relax A's edges: key[B] = min(inf, 4) = 4; key[C] = min(inf, 3) = 3.
2. Keys now: B=4, C=3, D=inf, E=inf, F=inf, G=inf, H=inf. Extract minimum: C (key 3). Add C. Relax C's edges: key[B] = min(4, 2) = 2 (via C); key[D] = min(inf, 6) = 6; key[E] = min(inf, 1) = 1.
3. Keys: B=2, D=6, E=1, F=inf, G=inf, H=inf. Extract minimum: E (key 1). Add E. Relax E's edges: key[D] = min(6, 7) = 6 (no change, 7 is not smaller); key[F] = min(inf, 5) = 5; key[G] = min(inf, 9) = 9.
4. Keys: B=2, D=6, F=5, G=9, H=inf. Extract minimum: B (key 2). Add B. Relax B's edges: key[D] = min(6, 5) = 5 (via B, an improvement).
5. Keys: D=5, F=5, G=9, H=inf. Extract minimum: tie between D and F at 5 — break alphabetically, take D. Add D. Relax D's edges: key[F] = min(5, 8) = 5 (no change).
6. Keys: F=5, G=9, H=inf. Extract minimum: F (key 5). Add F. Relax F's edges: key[G] = min(9, 3) = 3 (via F, an improvement); key[H] = min(inf, 4) = 4.
7. Keys: G=3, H=4. Extract minimum: G (key 3). Add G. Relax G's edges: key[H] = min(4, 2) = 2 (via G, an improvement).
8. Keys: H=2. Extract minimum: H (key 2). Add H. All 8 vertices now in the tree.

MST edges via parent pointers: C-A(3), E-C(1), B-C(2), D-B(5), F-E(5), G-F(3), H-G(2). Total weight 3+1+2+5+5+3+2 = 21 — the same total as Kruskal found, and in fact the same edge set, just discovered in a different order.

REMEMBER: The MST's total weight never depends on which start vertex Prim uses or which order Kruskal's algorithm was coded in (beyond how ties are broken) — every correct MST algorithm is finding the same greedy structure the cut and cycle properties guarantee, only walking through it differently.

COMPARING KRUSKAL AND PRIM

Kruskal's cost is dominated by sorting the E edges: O(E log E), and since E is at most V², log E ≤ 2 log V, so this is the same as O(E log V). Each of the E edges is examined once, and each examination costs O(alpha(V)) amortised for the union-find calls — negligible next to the sort.

Prim's cost depends on the priority-queue implementation. With a binary heap supporting decrease-key, each of the V extractions costs O(log V) and each of the E edges can trigger one decrease-key at O(log V), giving O(E log V) overall — the same order as Kruskal. With a plain array holding keys (no heap), finding the minimum unvisited key is a linear O(V) scan, done V times, giving O(V²), and updating a key after finding a cheaper edge is O(1) — no heap bookkeeping.

KEY: The array version of Prim wins over the heap version on DENSE graphs, where E is close to V². There, E log V is close to V² log V — WORSE than the array's plain V² — because the heap's log-factor overhead on every one of the many edges outweighs its faster minimum-extraction. On sparse graphs (E close to V), the heap version's E log V is far below V², so the heap wins.

BORŮVKA'S ALGORITHM

A third MST method, older than both Kruskal and Prim, works in rounds: in each round, every current component simultaneously finds its own cheapest edge leaving it, and all of these edges are added at once (a component's chosen edge might coincide with another's, so duplicates are merged). Since a component's cheapest outgoing edge is safe by the cut property regardless of what other components are doing, every round is correct, and because every component's size at least doubles each round (each merges with at least one other), at most O(log V) rounds are needed, each costing O(E), giving O(E log V) overall — the same order as the other two, but naturally parallelisable since all components act at once.

WHEN THE MST IS UNIQUE

If every edge weight in a connected graph is DISTINCT, the minimum spanning tree is unique. Prove it by contradiction: suppose T1 and T2 are both MSTs of equal (minimum) weight but T1 ≠ T2. Let e be the minimum-weight edge that lies in exactly one of them, say T1 but not T2. Adding e to T2 creates a cycle; since all weights are distinct, that cycle has a unique maximum-weight edge f, and f ≠ e is possible only if weight(f) > weight(e) is forced by e's minimality among the differing edges — replacing f with e in T2 gives a spanning tree of strictly lower weight than T2, contradicting that T2 was minimum. So no such differing edge e can exist, meaning T1 = T2.

The converse is FALSE: an MST can be unique even with repeated weights, if the repeats never create a genuine choice — for instance, if two equal-weight edges never lie on a common cycle at the point Kruskal would consider them, only one order of acceptance is ever possible.

COUNTING MINIMUM SPANNING TREES

When weights repeat and DO create a genuine choice, count the MSTs by finding every point where Kruskal could have picked either of several equal-weight edges without changing the final total weight, and multiplying the number of independent choices.

Worked example: vertices A, B, C, D with edges A-B(1), B-C(1), C-D(1), A-D(1) (a 4-cycle, all weight 1) plus a diagonal A-C(2). A spanning tree needs 3 edges. Using three of the four weight-1 cycle edges gives a spanning tree of total weight 3 — removing any one of the four cycle edges leaves the other three forming a path through all 4 vertices, which is a valid spanning tree, and there are 4 ways to choose which edge to omit. Using the diagonal A-C(2) instead of any weight-1 edge would need only 2 more cycle edges to complete a tree (since A-C already connects A and C), but the cheapest such combination has weight 2 + 1 + 1 = 4 > 3, strictly worse. So the diagonal is never used, and the minimum weight is 3, achieved by exactly 4 distinct spanning trees.

KEY: To count MSTs, first find the minimum total weight (it is unique even when the tree is not), then count the distinct edge sets achieving exactly that weight — usually by finding a cycle of equal cheapest-available edges where any one may be dropped.

WHAT SURVIVES WHEN WEIGHTS CHANGE

Adding the same CONSTANT c to every edge weight leaves the MST unchanged: every spanning tree has exactly V − 1 edges, so every spanning tree's total weight increases by exactly (V − 1)·c — a fixed amount added to every candidate, which cannot change which one is smallest. Multiplying every weight by a positive constant also preserves the MST, since scaling every candidate's total by the same positive factor preserves their relative order.

This does NOT extend to shortest paths, because different s-t paths generally use different NUMBERS of edges. Adding a constant c to every edge adds k·c to a path using k edges — paths of different lengths shift by different amounts, so the previously-shortest path can stop being shortest. A strictly increasing but non-linear transformation of the weights (for instance replacing each weight w by w²) also breaks both MST and shortest paths in general, since it need not preserve the relative ORDER of every pair of possible SUMS, only of individual weights.

GATE TRAP: "Add k to every edge weight" is often paired with a claim about shortest paths rather than MSTs specifically to catch this confusion. If the question is about the MST, adding a constant is always safe. If it is about shortest paths, it is safe only when it is guaranteed every candidate path uses the same number of edges — otherwise compute an explicit counterexample rather than assume either way.

The minimum-weight edge in the whole graph is always in every MST (when weights are distinct — otherwise in at least one), by the cut property applied to the cut isolating either endpoint: no edge crossing that trivial cut can be cheaper. The maximum-weight edge on any cycle, if it is the UNIQUE maximum on that cycle, is in no MST, by the cycle property — unless that edge is a bridge, in which case it lies on no cycle at all and the cycle property simply does not apply to it, so a bridge is always in every MST regardless of its weight.

THE SECOND-BEST SPANNING TREE

The second-best spanning tree is the minimum-weight spanning tree among all spanning trees other than the true MST (it may tie the MST's weight if the MST is not unique). Find it by trying, for each edge e NOT in the MST, replacing e's cheapest possible substitute: adding e to the MST creates one cycle, and removing the maximum-weight other edge on that cycle gives the best spanning tree that must include e. The overall second-best is the minimum, over all non-tree edges e, of (MST weight) − (max cycle edge weight) + weight(e). This is at least the MST weight, with equality only when the MST is not unique.

MST IS NOT A SHORTEST-PATH TREE

A shortest-path tree from a source s (built by Dijkstra or BFS) records, for every vertex, the cheapest route FROM s. A minimum spanning tree records the cheapest way to connect all vertices to each other, with no designated source at all — and these are genuinely different objects, not two names for the same thing.

Counterexample: a triangle on vertices s, a, b with edges s-a(1), a-b(1), s-b(10). The MST uses the two cheap edges s-a and a-b, total weight 2 — it never includes s-b, since that would be the unique maximum edge on the triangle's cycle. But the shortest path from s to b directly along edge s-b costs 10, while the MST's route s→a→b costs 1+1=2, which happens to be cheaper here — so in this case the MST route is also the shortest path. Modify the weights to s-a(1), a-b(1), s-b(1.5): now the MST still uses s-a and a-b (total 2, still cheaper than replacing either with s-b), but the actual shortest path from s to b is now the direct edge s-b at cost 1.5, shorter than the MST's route of cost 2. The MST's own path from s to b is not the shortest path from s to b — proving the two trees are different objects even when both exist on the same graph.

GATE TRAP: "The MST gives the shortest path between any two vertices" is false in general — it is true only for the two ENDPOINTS of an edge that is itself in the MST (trivially, that single edge is a path, and no other route through the tree could beat one edge without contradicting the cycle property locally), never guaranteed between two arbitrary vertices in general or on a general weighted graph.

RELAXATION AND THE SHORTEST-PATH INVARIANT

Every shortest-path algorithm in this chapter is built from one operation: relaxation. Maintain a tentative distance estimate dist[v] for every vertex, initialised to 0 for the source s and infinity for everyone else. To relax an edge (u, v) with weight w(u, v): if dist[u] + w(u, v) < dist[v], then update dist[v] = dist[u] + w(u, v) and record parent[v] = u — a cheaper route to v has been found, going through u.

Relaxation never makes an estimate too small: at every point in every algorithm built from it,

dist[v] ≥ delta(s, v)

where delta(s, v) is the TRUE shortest distance from s to v. This holds initially (0 = delta(s,s), infinity ≥ anything) and is preserved by every relaxation, since a relaxation only ever sets dist[v] to dist[u] + w(u,v), which by induction is at least delta(s,u) + w(u,v) ≥ delta(s,v) (the triangle inequality that shortest paths always satisfy). The different algorithms differ only in WHICH ORDER they choose to relax edges in, all converging on dist[v] = delta(s,v) once every edge on some shortest path to v has been relaxed in the right order.

DIJKSTRA'S ALGORITHM, TRACED

Dijkstra's algorithm chooses its relaxation order greedily: repeatedly extract the unfinalised vertex with the smallest tentative distance, finalise it (its distance is now known to be exactly correct), and relax every edge leaving it. This requires all edge weights to be NON-negative — the reason is proved in the next section.

Trace it on a 5-vertex directed graph, source s: s→t(10), s→y(5), t→x(1), t→y(2), y→t(3), y→x(9), y→z(2), x→z(4), z→x(6), z→s(7).

1. Init: dist[s]=0, all others infinity. Extract minimum unfinalised: s (0). Finalise s. Relax s's edges: dist[t] = min(inf, 0+10) = 10; dist[y] = min(inf, 0+5) = 5.
2. Distances: s=0(F), t=10, x=inf, y=5, z=inf. Extract minimum unfinalised: y (5). Finalise y. Relax y's edges: dist[t] = min(10, 5+3) = 8; dist[x] = min(inf, 5+9) = 14; dist[z] = min(inf, 5+2) = 7.
3. Distances: s=0(F), y=5(F), t=8, x=14, z=7. Extract minimum unfinalised: z (7). Finalise z. Relax z's edges: dist[s] finalised, skip; dist[x] = min(14, 7+6) = 13.
4. Distances: s=0(F), y=5(F), z=7(F), t=8, x=13. Extract minimum unfinalised: t (8). Finalise t. Relax t's edges: dist[x] = min(13, 8+1) = 9; dist[y] finalised, skip.
5. Distances: s=0(F), y=5(F), z=7(F), t=8(F), x=9. Extract minimum unfinalised: x (9). Finalise x. Relax x's edge to z: already finalised, skip.

Final distances: s=0, y=5, z=7, t=8, x=9. Extraction order: s, y, z, t, x — strictly non-decreasing distance values, which is not a coincidence: it is exactly the property the proof below guarantees.

WHY DIJKSTRA'S PROOF NEEDS NON-NEGATIVE WEIGHTS

Correctness proof, by induction on the order of finalisation. Claim: when a vertex u is extracted (finalised), dist[u] = delta(s, u), its true shortest distance. This is trivially true for the first extraction, s itself (dist[s]=0=delta(s,s)). Suppose it holds for everything finalised so far, and u is the next extraction, chosen because dist[u] is the smallest tentative value among the unfinalised. Consider the TRUE shortest path from s to u; it leaves the finalised set at some edge (x, y) with x finalised and y not (or u itself is the exit point). By the inductive hypothesis dist[x] = delta(s,x), so relaxing (x,y) already set dist[y] ≤ delta(s,x) + w(x,y) = delta(s, first step of the true path to u).

Here is where non-negativity is used: because every remaining edge weight from y onward is ≥ 0, the true distance to u can only be ≥ the true distance to y — delta(s,u) ≥ delta(s,y) ≥ dist[y]. But u was chosen as the SMALLEST tentative distance among all unfinalised vertices, including y, so dist[u] ≤ dist[y] ≤ delta(s,u). Combined with the invariant dist[u] ≥ delta(s,u) from relaxation in general, this forces dist[u] = delta(s,u) exactly.

If an edge weight can be negative, "the true distance can only be ≥ the true distance to y" fails — a negative edge further along the path could make the FULL path to u cheaper than the partial path to y, even though y is reached first. Once a vertex is wrongly finalised too early, Dijkstra never revisits it, and the error is permanent.

Concrete failure: directed graph S→C(1), S→A(2), A→B(1), B→C(-5). The true shortest path S to C is S→A→B→C = 2+1−5 = −2. Trace Dijkstra: extract S(0), relax: dist[A]=2, dist[C]=1. Extract the minimum unfinalised, which is C(1) — finalise it, since C currently has the smallest tentative distance. C has no outgoing edges, so nothing more happens to it. Continue: extract A(2), relax: dist[B]=3. Extract B(3), relax edge B→C: candidate dist = 3 + (−5) = −2, strictly less than dist[C]=1 — but C is ALREADY FINALISED, so standard Dijkstra never revisits it. Dijkstra reports dist[C] = 1. The true answer is −2. Dijkstra is wrong by exactly the margin the later negative edge could have saved.

GATE TRAP: "Dijkstra fails with negative edges" is often tested by giving a graph where it happens to get the RIGHT answer despite a negative edge (because the negative edge never gets a chance to undercut an already-finalised vertex) — do not conclude negative edges are safe from one example. The failure requires that a vertex be finalised BEFORE a cheaper route through a later negative edge is discovered; always trace the actual extraction order rather than trusting a rule of thumb.

DIJKSTRA'S COMPLEXITY AND SPECIAL CASES

With a plain array holding tentative distances, finding the minimum unfinalised vertex is an O(V) scan, repeated V times, giving O(V²) total; relaxation is O(1) per edge, O(E) overall — dominated by the V² term. With a binary heap supporting decrease-key, each of the V extractions is O(log V) and each of the E possible relaxations triggers at most one O(log V) decrease-key, giving O((V+E) log V). With a Fibonacci heap, decrease-key drops to O(1) amortised, so only the V extractions cost O(log V) each, giving the best known bound O(E + V log V) — the array is better for dense graphs (E close to V²) for exactly the reason Prim's array version was, and the heap is better for sparse ones.

Two question types are worth naming explicitly. "How many times does relaxation SUCCEED (actually improve a dist value)" is not fixed by V and E alone — it depends on the specific weights and the order edges are examined in, and must be counted by tracing, as in the walkthrough above (there, exactly 6 successful relaxations occurred: t and y from s, t/x/z from y, x from z, x from t). "What is the order of vertex extraction" is answered directly by the trace's sequence of finalisations, always non-decreasing in distance, as proved above.

If every edge has weight 1 — an unweighted graph — Dijkstra's greedy choice of "smallest tentative distance" always coincides with "fewest edges so far," and finalising vertices in order of increasing distance becomes identical to BFS's level-by-level order. Dijkstra on an unweighted graph reduces exactly to BFS, just implemented with unnecessary priority-queue overhead — this is why BFS, not Dijkstra, is the right tool the moment all weights are equal.

BELLMAN-FORD, TRACED

When edges can be negative (but no reachable cycle has negative total weight — shortest paths are undefined otherwise, since a walk around such a cycle could reduce distance without limit), Bellman-Ford finds correct shortest distances by relaxing every edge, in some fixed order, for V − 1 full passes.

Why V − 1 passes suffice: prove by induction on path length that after k passes, dist[v] is correct for every vertex whose true shortest path uses at most k edges. Base case k=0: dist[s]=0 is already correct for the 0-edge path to s. Inductive step: if dist is correct for all ≤ k-edge shortest paths after k passes, consider a vertex v whose true shortest path uses exactly k+1 edges, ending with edge (u, v); u's shortest path uses k edges, so dist[u] is already correct by the inductive hypothesis, and SOME pass among the next one relaxes edge (u,v) (since every edge is relaxed every pass), setting dist[v] correctly. Since a shortest path on V vertices with no negative cycle uses at most V − 1 edges (using more would need repeating a vertex, i.e., containing a cycle, and dropping that cycle can only shorten a non-negative-weight cycle or is disallowed for a negative one), V − 1 passes cover every possible path length.

Trace it on a 5-vertex directed graph, source S, edges (in this exact relaxation order) S→A(6), S→B(7), A→B(8), A→C(5), A→D(-4), B→C(-3), B→D(9), C→A(-2), D→C(7), D→S(2).

1. Init: dist[S]=0, others infinity.
2. Pass 1 (relax all 10 edges in the listed order): S→A gives dist[A]=6. S→B gives dist[B]=7. A→B: 6+8=14, not less than 7, no change. A→C gives dist[C]=6+5=11. A→D gives dist[D]=6-4=2. B→C: 7-3=4, less than 11, update dist[C]=4. B→D: 7+9=16, not less than 2, no change. C→A: 4-2=2, less than 6, update dist[A]=2. D→C: 2+7=9, not less than 4, no change. D→S: 2+2=4, not less than 0, no change. After pass 1: S=0, A=2, B=7, C=4, D=2.
3. Pass 2: S→A: 0+6=6, not less than 2, no change. S→B: 0+7=7, no change. A→B: 2+8=10, not less than 7, no change. A→C: 2+5=7, not less than 4, no change. A→D: 2-4=-2, less than 2, update dist[D]=-2. B→C: 7-3=4, no change. B→D: 7+9=16, no change. C→A: 4-2=2, no change. D→C: -2+7=5, not less than 4, no change. D→S: -2+2=0, not less than 0, no change. After pass 2: S=0, A=2, B=7, C=4, D=-2.
4. Pass 3: check every edge again — S→A(6 vs 2, no), S→B(7 vs 7, no), A→B(10 vs 7, no), A→C(7 vs 4, no), A→D(-2 vs -2, no), B→C(4 vs 4, no), B→D(16 vs -2, no), C→A(2 vs 2, no), D→C(5 vs 4, no), D→S(0 vs 0, no). NO edge relaxes. The algorithm has converged.

Distances did not change at all in pass 3, so pass 4 (the theoretical V−1=4th pass) is guaranteed to also find nothing — early termination: if a full pass makes zero updates, every distance is already final and remaining passes may be skipped. Final distances: S=0, A=2, B=7, C=4, D=-2.

REMEMBER: The bound V − 1 passes is a WORST CASE guarantee against the worst possible edge order. This graph converged after only 2 passes because the edges happened to be relaxed in an order that let information propagate quickly; a different edge listing on the same graph could take the full V − 1 passes to reach the same final answer. Both the number of passes actually needed and the final distances depend on the graph, but only the passes-needed count depends on the edge ORDER.

DETECTING A NEGATIVE CYCLE

If a graph does have a negative cycle reachable from the source, no finite shortest distance exists for vertices on or past it — Bellman-Ford detects this by running ONE EXTRA (a V-th) pass after the guaranteed V − 1: if any edge still relaxes on that extra pass, a negative cycle reachable from the source exists (a vertex on such a cycle can always be made "cheaper" by going around the cycle once more, so convergence is genuinely impossible, not merely slow).

Trace it: directed graph S→A(1), A→B(2), B→C(-4), C→A(1) — note the cycle A→B→C→A has total weight 2 − 4 + 1 = −1, negative. V = 4, so 3 standard passes: pass 1 gives S=0, A=1, B=3, C=−1 then C→A relaxes 4→A giving A=0 (since −1+1=0<1) — after pass 1: S=0,A=0,B=3,C=−1. Pass 2: A→B gives B=0+2=2 (update), B→C gives C=2−4=−2 (update), C→A gives A=−2+1=−1 (update). After pass 2: S=0, A=−1, B=2, C=−2. Pass 3: A→B gives B=−1+2=1, B→C gives C=1−4=−3, C→A gives A=−3+1=−2. After pass 3 (the V−1=3rd, supposedly final pass): S=0, A=−2, B=1, C=−3.

Now run the extra (4th) pass to test for a negative cycle: S→A: 0+1=1, not less than −2, no change. A→B: −2+2=0, less than 1 — relaxes! B→C: 0−4=−4, less than −3 — relaxes! C→A: −4+1=−3, less than −2 — relaxes! Three of the four edges still improve their target on the supposedly-final pass — exactly the signature of a negative cycle: A, B and C will keep decreasing forever, once around the cycle at a time, each lap subtracting 1 more (matching the cycle's total weight of −1).

GATE TRAP: A negative EDGE alone does not break Bellman-Ford — only a negative CYCLE does, and only for vertices reachable from it. A graph can have negative edges, converge cleanly in V − 1 passes exactly as the S→A→B→C→D example above did, and give perfectly well-defined shortest distances.

SHORTEST PATHS IN A DAG

If the graph is guaranteed acyclic, there is a faster method than either Dijkstra or Bellman-Ford, and it tolerates negative weights freely (a DAG cannot have a cycle at all, so the "no negative cycle" restriction is automatically satisfied). Topologically sort the vertices, then process them in that order, relaxing every outgoing edge of each vertex as it is reached. Because every edge of a DAG goes from earlier to later in ANY valid topological order, by the time a vertex u is processed, every edge that could possibly still improve dist[u] has already been relaxed (it would have to come from some vertex earlier in the order, which has already been processed) — so a single left-to-right pass, O(V + E), suffices. This is strictly cheaper than Dijkstra's O((V+E) log V) and needs no priority queue at all.

ALL-PAIRS SHORTEST PATHS: FLOYD-WARSHALL

Sometimes every pair's shortest distance is wanted at once, not just from one source. The Floyd-Warshall algorithm builds this up by allowing progressively more vertices to be used as intermediate stops. Define d^(k)[i][j] as the shortest distance from i to j using only vertices numbered 1 through k as possible intermediate stops (i and j themselves are always allowed as endpoints regardless of k). d^(0)[i][j] is just the direct edge weight w(i,j), or infinity if there is none (0 on the diagonal).

To compute d^(k) from d^(k-1), ask: does the best path from i to j that is now allowed to use vertex k as a stop actually use it? If it does not use k, its cost is still d^(k-1)[i][j] — no change from before. If it does use k, then k appears exactly once (using it twice would mean a cycle through k, never helpful for a shortest path with non-negative-length detours), splitting the path into i-to-k and k-to-j, both of which only need intermediates from 1..k-1 (since k itself is the split point, not an intermediate of either half) — so that cost is exactly d^(k-1)[i][k] + d^(k-1)[k][j]. Taking the better of these two options gives the recurrence:

d^(k)[i][j] = min( d^(k-1)[i][j], d^(k-1)[i][k] + d^(k-1)[k][j] )

Running this for k = 1 up to V, updating the full V×V table each time, leaves d^(V)[i][j] as the true shortest distance from i to j allowing ANY vertex as an intermediate — the complete all-pairs answer. Since each of V values of k requires updating all V² table entries in O(1) each, the total cost is O(V³).

Trace it on a 4-vertex directed graph with edges 1→2(3), 1→4(7), 2→3(4), 2→4(2), 3→1(2), 4→1(6), 4→3(-5).

D^(0) (direct edges, infinity for none, 0 on the diagonal):
Row 1: [0, 3, INF, 7]. Row 2: [INF, 0, 4, 2]. Row 3: [2, INF, 0, INF]. Row 4: [6, INF, -5, 0].

1. k=1 (allow vertex 1 as a stop): only rows whose entry to column 1 is finite can improve, since the update needs d[i][1] + d[1][j]. Row 2 has d[2][1]=INF, so row 2 is unchanged. Row 3: d[3][1]=2, candidates 2+[0,3,INF,7]=[2,5,INF,9], beating the current [2,INF,0,INF] at columns 2 and 4 — row 3 becomes [2, 5, 0, 9]. Row 4: d[4][1]=6, candidates 6+[0,3,INF,7]=[6,9,INF,13], beating [6,INF,-5,0] at column 2 — row 4 becomes [6, 9, -5, 0].
   D^(1): Row1 [0,3,INF,7]. Row2 [INF,0,4,2]. Row3 [2,5,0,9]. Row4 [6,9,-5,0].
2. k=2 (allow vertex 2): the "via" row is row 2, [INF,0,4,2]. Row 1: d[1][2]=3, candidates 3+[INF,0,4,2]=[INF,3,7,5], beating [0,3,INF,7] at columns 3 and 4 — row 1 becomes [0,3,7,5]. Row 3: d[3][2]=5, candidates 5+[INF,0,4,2]=[INF,5,9,7], beating [2,5,0,9] at column 4 — row 3 becomes [2,5,0,7]. Row 4: d[4][2]=9, candidates 9+[INF,0,4,2]=[INF,9,13,11], none beat [6,9,-5,0] — unchanged.
   D^(2): Row1 [0,3,7,5]. Row2 [INF,0,4,2]. Row3 [2,5,0,7]. Row4 [6,9,-5,0].
3. k=3 (allow vertex 3): via row is row 3, [2,5,0,7]. Row 2: d[2][3]=4, candidates 4+[2,5,0,7]=[6,9,4,11], beating [INF,0,4,2] at column 1 — row 2 becomes [6,0,4,2]. Row 4: d[4][3]=-5, candidates -5+[2,5,0,7]=[-3,0,-5,2], beating [6,9,-5,0] at columns 1 and 2 — row 4 becomes [-3,0,-5,0]. Row 1 unaffected (its column-3 entry, 7, times the check gives nothing smaller).
   D^(3): Row1 [0,3,7,5]. Row2 [6,0,4,2]. Row3 [2,5,0,7]. Row4 [-3,0,-5,0].
4. k=4 (allow vertex 4): via row is row 4, [-3,0,-5,0]. Row 1: d[1][4]=5, candidates 5+[-3,0,-5,0]=[2,5,0,5], beating [0,3,7,5] at column 3 — row 1 becomes [0,3,0,5]. Row 2: d[2][4]=2, candidates 2+[-3,0,-5,0]=[-1,2,-3,2], beating [6,0,4,2] at columns 1 and 3 — row 2 becomes [-1,0,-3,2]. Row 3: d[3][4]=7, candidates 7+[-3,0,-5,0]=[4,7,2,7], none beat [2,5,0,7] — unchanged.
   D^(4), the final table: Row1 [0,3,0,5]. Row2 [-1,0,-3,2]. Row3 [2,5,0,7]. Row4 [-3,0,-5,0].

Sanity check two entries against actual paths: d[1][3]=0 should be path 1→2→4→3 = 3+2−5 = 0. Correct. d[4][2]=0 should be path 4→3→1→2 = −5+2+3 = 0. Correct. All diagonal entries stayed 0, confirming no negative cycle exists.

If, during the algorithm, some d[i][i] were ever pushed below 0, that would mean a walk from i back to i with negative total weight had been found — a negative cycle through i — and Floyd-Warshall detects negative cycles exactly this way, by checking the diagonal after all V rounds. Floyd-Warshall tolerates individual negative EDGES throughout (as this trace did), it only fails to give a meaningful answer once a negative CYCLE exists.

KEY: Floyd-Warshall's cost, O(V³), does not depend on how many edges the graph has — it always does the same amount of work whether the graph is sparse or dense, because it is built around a fixed-size V×V table, not around iterating over edges directly.

When the graph is SPARSE (E much smaller than V²) and has no negative weights, running Dijkstra from every one of the V vertices instead costs O(V) times Dijkstra's own O((V+E) log V), giving O(V² log V + VE log V) — for sparse graphs this beats Floyd-Warshall's flat O(V³). When negative edges are present without a negative cycle, Johnson's algorithm makes running Dijkstra V times possible anyway: add a new dummy source vertex with a zero-weight edge to every existing vertex, run Bellman-Ford once from it to get a potential h(v) for every vertex, then reweight every edge as w'(u,v) = w(u,v) + h(u) − h(v) — this reweighting is engineered so every w' is non-negative while every shortest path's RELATIVE ranking is preserved exactly, letting ordinary Dijkstra run safely V times and the true distances be recovered by undoing the shift.

TRANSITIVE CLOSURE

A closely related question — not "what is the shortest path" but simply "does ANY path exist from i to j" — is answered by Warshall's algorithm, which is exactly Floyd-Warshall with the (min, +) arithmetic replaced by (OR, AND): reach[k][i][j] = reach[k-1][i][j] OR (reach[k-1][i][k] AND reach[k-1][k][j]), read as "either i already reached j without k, or i reaches k and k reaches j." The final table, reach[V][i][j], is the transitive closure of the graph — a 1 wherever a path exists, regardless of length or weight. It costs the same O(V³), for the same reason: a fixed V×V table, updated once per candidate intermediate vertex.

CLASSIC REDUCTIONS ON SHORTEST-PATH MACHINERY

Several other questions are not new algorithms at all, but the shortest-path machinery pointed at a transformed problem.

Longest path in a DAG: negate every edge weight and run the DAG shortest-path algorithm (topological order, one relaxation pass); the "shortest" path in the negated graph is the longest path in the original, since minimising a sum of negatives is the same as maximising the original sum. This works only because a DAG cannot have a cycle — negating weights in a general graph could create a negative cycle, and worse, longest path in a general graph is NP-hard, so no polynomial reduction of this kind can exist there.

Widest path (bottleneck shortest path): instead of minimising a SUM of edge weights, maximise the MINIMUM edge weight along the path — useful for "what is the highest-bandwidth route" style questions. Replace Dijkstra's relaxation rule "dist[u] + w(u,v) < dist[v]" with "min(bottleneck[u], w(u,v)) > bottleneck[v]" and extract the vertex with the largest current bottleneck value first instead of the smallest distance; the same greedy correctness argument (the cut property, this time maximising rather than minimising) carries over unchanged.

Counting shortest paths: alongside dist[v], maintain a count cnt[v] of how many DISTINCT shortest paths reach v. Whenever an edge (u,v) relaxation strictly IMPROVES dist[v], reset cnt[v] = cnt[u] (every shortest path to v now goes through this newly-better route via u). Whenever a relaxation finds an equal-cost alternative (dist[u] + w(u,v) = dist[v] exactly, not smaller), add to the count instead: cnt[v] += cnt[u], since u's shortest paths and the existing ones to v are both valid, distinct shortest routes. This is a straightforward add-on to Dijkstra, DAG shortest paths, or Bellman-Ford — the underlying relaxation order does not change.

WORKED PROBLEMS

Each of these follows a shape the exam uses repeatedly. Work through the steps, not just the final number.

1. Kruskal with union-find. Graph on P, Q, R, S with edges P-Q(4), Q-R(2), R-S(3), P-S(5), P-R(6), Q-S(7). Find the MST weight.
   Sort: Q-R(2), R-S(3), P-Q(4), P-S(5), P-R(6), Q-S(7). Need V−1=3 edges. Accept Q-R(2): sets {Q,R}. Accept R-S(3): R and S different — sets {Q,R,S}. Accept P-Q(4): P and Q different — sets {P,Q,R,S}, done, 3 edges. Total weight = 2+3+4 = 9.

2. Prim with the key array. Graph on A, B, C, D, E with edges A-B(2), A-C(5), B-C(1), B-D(7), C-D(3), C-E(6), D-E(2), starting from A.
   Init keys: A=0, rest infinity. Extract A: relax B=2, C=5. Extract B(2): relax C = min(5, 2+1=3) = 3; D = min(inf, 2+7=9) = 9. Extract C(3): relax D = min(9, 3+3=6) = 6; E = min(inf, 3+6=9) = 9. Extract D(6): relax E = min(9, 6+2=8) = 8. Extract E(8). MST edges: A-B(2), B-C(1), C-D(3), D-E(2). Total weight = 2+1+3+2 = 8.

3. Dijkstra with extraction order and final distances. Graph on A, B, C, D with edges A-B(2), A-C(5), B-C(1), B-D(7), C-D(3), source A.
   Extract A(0): relax B=2, C=5. Extract B(2): relax C = min(5, 2+1=3) = 3; D = min(inf, 2+7=9) = 9. Extract C(3): relax D = min(9, 3+3=6) = 6. Extract D(6). Extraction order: A, B, C, D. Final distances: A=0, B=2, C=3, D=6.

4. Bellman-Ford with per-pass arrays and negative-cycle detection. Directed graph, cycle 0→1(1), 1→2(-1), 2→0(-1), source 0.
   V=3, cycle total weight = 1 − 1 − 1 = −1, negative. Pass 1: 0→1 gives dist[1]=1; 1→2 gives dist[2]=1−1=0; 2→0 gives candidate 0−1=−1 < 0, update dist[0]=−1. After pass 1: [0]=−1,[1]=1,[2]=0. Pass 2: 0→1 gives 1: −1+1=0, update dist[1]=0. 1→2: 0−1=−1, update dist[2]=−1. 2→0: −1−1=−2, update dist[0]=−2. Values keep dropping every pass by 1 around the cycle — the extra (3rd) pass will relax again, confirming: this graph has NO well-defined shortest distances, since all three vertices lie on a negative cycle reachable from (and reaching back to) the source. Applying Dijkstra here instead would simply pick the smallest tentative value each round while never noticing the ever-cheaper loop, silently reporting some finite but WRONG value instead of correctly reporting "undefined."

5. Floyd-Warshall through all k. Directed graph on 1,2,3,4 with edges 1→3(4), 2→1(6), 2→3(2), 3→4(1), 4→2(3). No edge elsewhere (infinity), diagonal 0.
   D^(0): [0,INF,4,INF] / [6,0,2,INF] / [INF,INF,0,1] / [INF,3,INF,0].
   k=1 (via row1=[0,INF,4,INF]): row2 d[2][1]=6, candidates 6+[0,INF,4,INF]=[6,INF,10,INF], no improvement over [6,0,2,INF]. row3 d[3][1]=INF, no change. row4 d[4][1]=INF, no change. D^(1) = D^(0).
   k=2 (via row2=[6,0,2,INF]): row1 d[1][2]=INF, no change. row3 d[3][2]=INF, no change. row4 d[4][2]=3, candidates 3+[6,0,2,INF]=[9,3,5,INF], beats [INF,3,INF,0] at columns 1 and 3 — row4 becomes [9,3,5,0].
   D^(2): row1 [0,INF,4,INF]. row2 [6,0,2,INF]. row3 [INF,INF,0,1]. row4 [9,3,5,0].
   k=3 (via row3=[INF,INF,0,1]): row1 d[1][3]=4, candidates 4+[INF,INF,0,1]=[INF,INF,4,5], beats [0,INF,4,INF] at column 4 — row1 becomes [0,INF,4,5]. row2 d[2][3]=2, candidates 2+[INF,INF,0,1]=[INF,INF,2,3], beats [6,0,2,INF] at column 4 — row2 becomes [6,0,2,3]. row4 d[4][3]=5, candidates 5+[INF,INF,0,1]=[INF,INF,5,6], no improvement over [9,3,5,0].
   D^(3): row1 [0,INF,4,5]. row2 [6,0,2,3]. row3 [INF,INF,0,1]. row4 [9,3,5,0].
   k=4 (via row4=[9,3,5,0]): row1 d[1][4]=5, candidates 5+[9,3,5,0]=[14,8,10,5], no improvement over [0,INF,4,5] except column2: INF vs 8 — row1 becomes [0,8,4,5]. row2 d[2][4]=3, candidates 3+[9,3,5,0]=[12,6,8,3], no improvement (row2's column2 is already 0). row3 d[3][4]=1, candidates 1+[9,3,5,0]=[10,4,6,1], beats [INF,INF,0,1] at columns 1 and 2 — row3 becomes [10,4,0,1].
   D^(4), final: row1 [0,8,4,5]. row2 [6,0,2,3]. row3 [10,4,0,1]. row4 [9,3,5,0]. Diagonal all 0 — no negative cycle (there are no negative weights here at all). Shortest distance 1→2 is 8, via 1→3→4→2 = 4+1+3 = 8, matching the table.

6. Counting MSTs with repeated weights. Triangle on A, B, C with all three edges A-B, B-C, A-C equal weight 5. How many distinct MSTs, and what is the MST weight?
   A spanning tree needs 2 edges. Any 2 of the 3 equal-weight edges connect all three vertices (removing any one edge from a triangle still leaves a connected path). All three choices give total weight 5+5=10, and none is preferred by weight since they are equal. Number of distinct MSTs = 3 (choose which single edge to leave out), MST weight = 10.

7. Dijkstra fails on a negative edge. Directed graph S→A(4), A→B(2), S→C(4), C→B(-10), source S. Compare what Dijkstra reports for B against the true shortest distance.
   True shortest S to B: via S→C→B = 4 + (−10) = −6, versus S→A→B = 4+2=6; true answer is −6. Dijkstra: extract S(0), relax A=4, C=4 (tie, take A first alphabetically). Extract A(4): relax B = min(inf, 4+2=6) = 6. Extract C(4) (the tie's other half, still tentative at 4): relax B = min(6, 4−10=−6) = −6 — but wait, B was not yet finalised at this point (C had the same tentative distance as A, so the tie is broken but neither is finalised before the other's turn), so this update IS accepted, dist[B] becomes −6, matching the true answer. If instead A had been given a strictly smaller distance than C by even a small amount and been extracted while B was already finalised through some other cheap prior edge, the -10 edge would arrive too late — the general failure mode requires the cheapening edge to fire only after its target is already locked in, which depends on the exact numbers, confirming the earlier warning that this must always be checked by tracing, not assumed from the mere presence of a negative edge.

WHAT TO CARRY INTO THE NEXT CHAPTER

Every algorithm in this chapter assumed the graph itself was simply given — its vertices, its edges, its weights, fixed before the algorithm starts. The next stage of the syllabus, dynamic programming, often revisits some of these very same problems (shortest paths, in particular) from a different angle: building the answer up from smaller subproblems rather than greedily committing to one choice at a time, which matters once the greedy exchange arguments this chapter relied on — the cut property, the relaxation invariant — no longer apply cleanly, such as when a path is also constrained by a limited number of edges or a budget. The traversal and shortest-path machinery built here is also exactly what later topics in compilers (control-flow analysis) and networks (routing) are quietly built on top of.
`
};
