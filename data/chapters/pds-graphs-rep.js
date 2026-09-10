// Textbook chapter: Graph Representations & Traversals.
//
// Full teaching text, written to be learned from directly. Plain-text
// convention: ALL-CAPS lines are headings, "• " a bullet, "1. " a numbered
// step, KEY:/REMEMBER: and GATE TRAP: make callout cards, a lone equation
// becomes a formula block, [[FIG:id]] places a figure.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['pds-graphs-rep'] = {
  figs: [
    {
      id: 'graph-vocab',
      caption: 'A self-loop and a multi-edge (both forbidden in a simple graph) next to a directed edge, where order matters.',
      svg: '<svg viewBox="0 0 340 170" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-gv1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="55" cy="95" r="14"/><circle cx="165" cy="95" r="14"/><line x1="69" y1="95" x2="151" y2="95"/><path d="M69,89 Q110,60 151,89"/><path d="M45,84 C 15,60 25,20 54,82"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><text x="55" y="99">A</text><text x="165" y="99">B</text><text x="110" y="52">multi-edge</text><text x="18" y="30">self-loop</text></g><g stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="270" cy="50" r="14"/><circle cx="270" cy="140" r="14"/><line x1="270" y1="64" x2="270" y2="126" marker-end="url(#ah-gv1)"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><text x="270" y="54">C</text><text x="270" y="144">D</text><text x="270" y="98" font-size="10">directed</text></g><text x="170" y="163" font-size="10" text-anchor="middle" fill="currentColor">a simple graph forbids the loop and the multi-edge; direction is separate</text></svg>'
    },
    {
      id: 'bfs-dfs-trace',
      caption: 'The BFS tree of the six-vertex example, drawn by distance level. The dashed edge (5,6) is a real edge that BFS never uses as a tree edge.',
      svg: '<svg viewBox="0 0 300 190" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.5" fill="none"><line x1="160" y1="24" x2="95" y2="80"/><line x1="160" y1="24" x2="230" y2="80"/><line x1="95" y1="80" x2="55" y2="140"/><line x1="95" y1="80" x2="130" y2="140"/><line x1="230" y1="80" x2="230" y2="140"/><line x1="130" y1="140" x2="230" y2="140" stroke-dasharray="4,3"/></g><g stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="160" cy="24" r="14"/><circle cx="95" cy="80" r="14"/><circle cx="230" cy="80" r="14"/><circle cx="55" cy="140" r="14"/><circle cx="130" cy="140" r="14"/><circle cx="230" cy="140" r="14"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="160" y="28">1</text><text x="95" y="84">2</text><text x="230" y="84">3</text><text x="55" y="144">4</text><text x="130" y="144">5</text><text x="230" y="144">6</text></g><g font-size="10" fill="currentColor" text-anchor="middle" opacity=".75"><text x="160" y="10">d=0</text><text x="60" y="66">d=1</text><text x="255" y="66">d=1</text><text x="30" y="170">d=2</text><text x="130" y="170">d=2</text><text x="255" y="170">d=2</text></g></svg>'
    },
    {
      id: 'dfs-edge-types',
      caption: 'The DFS forest of the directed example: one tree edge chain with a back edge and a forward edge, and a second tree whose only edges out of it are cross edges.',
      svg: '<svg viewBox="0 0 320 210" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-gv3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.5" fill="none"><line x1="45" y1="24" x2="45" y2="66" marker-end="url(#ah-gv3)"/><line x1="45" y1="84" x2="45" y2="126" marker-end="url(#ah-gv3)"/><line x1="45" y1="144" x2="45" y2="186" marker-end="url(#ah-gv3)"/><path d="M35,190 C -15,140 -15,50 35,20" marker-end="url(#ah-gv3)"/><path d="M55,80 C 100,110 100,150 55,182" marker-end="url(#ah-gv3)"/><line x1="255" y1="24" x2="255" y2="66" marker-end="url(#ah-gv3)"/><path d="M243,20 C 150,45 120,80 57,82" stroke-dasharray="3,3" marker-end="url(#ah-gv3)"/><path d="M243,80 C 150,110 120,150 57,180" stroke-dasharray="3,3" marker-end="url(#ah-gv3)"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><circle cx="45" cy="15" r="14" fill="none" stroke="currentColor"/><text x="45" y="19">1</text><circle cx="45" cy="75" r="14" fill="none" stroke="currentColor"/><text x="45" y="79">2</text><circle cx="45" cy="135" r="14" fill="none" stroke="currentColor"/><text x="45" y="139">3</text><circle cx="45" cy="195" r="14" fill="none" stroke="currentColor"/><text x="45" y="199">4</text><circle cx="255" cy="15" r="14" fill="none" stroke="currentColor"/><text x="255" y="19">5</text><circle cx="255" cy="75" r="14" fill="none" stroke="currentColor"/><text x="255" y="79">6</text></g><g font-size="10" fill="currentColor"><text x="-6" y="105">back</text><text x="105" y="130">forward</text><text x="150" y="45">cross</text><text x="150" y="140">cross</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

Every structure so far in this subject — arrays, linked lists, stacks, queues, trees, heaps, hash tables — has a built-in shape: a tree's edges only ever go from a parent to its children, a linked list's edges only ever go forward. A graph drops that restriction. It says only that some pairs of things are related, with no promise about shape at all: cities and the roads between them, people and their friendships, tasks and which must finish before which. Because the shape is unconstrained, a graph can represent almost anything relational, and that generality is exactly why it needs its own chapter.

Two questions follow immediately from "no built-in shape." First, how do you even store something this unstructured in memory — and the answer turns out to matter enormously for how fast later algorithms run. Second, how do you explore it — visit every reachable vertex, in what order, using what memory — since there is no parent pointer to fall back on. This chapter answers both, and everything after it — shortest paths, minimum spanning trees, the harder graph algorithms — is built directly on the representations and the two traversal orders (breadth-first and depth-first) developed here.

WHAT A GRAPH IS

A graph G = (V, E) is a set of vertices V (also called nodes) together with a set of edges E, where each edge connects a pair of vertices. That is the entire definition — everything else in this chapter is a distinction drawn on top of it.

An edge (u, v) means u and v are related in whatever sense the graph is modelling. If the relation has no direction — "city A is connected to city B by a road you can drive both ways" — the graph is undirected, and edge (u, v) is the same edge as (v, u). If the relation is one-way — "task A must finish before task B starts" — the graph is directed (a digraph), and edge (u, v), drawn u → v, is a different edge from (v, u); one can exist without the other.

An edge can carry a number, its weight, representing a cost, distance, capacity, or time associated with traversing it. A graph with weights is a weighted graph; without them, every edge is treated as costing the same (conventionally 1), and the graph is unweighted. Whether a graph is weighted is a separate question from whether it is directed — the four combinations (undirected/unweighted, undirected/weighted, directed/unweighted, directed/weighted) are all common.

KEY: Directed vs undirected asks whether an edge has an orientation. Weighted vs unweighted asks whether an edge has a cost. These are independent choices — do not let one imply the other.

SELF-LOOPS, MULTI-EDGES AND SIMPLE GRAPHS

Two more distinctions, both about what an edge set is allowed to contain.

A self-loop is an edge from a vertex to itself, (v, v). Nothing in the bare definition of a graph forbids it — a road that starts and ends at the same city, a task that (absurdly) must finish before itself.

A multi-edge (or parallel edge) is more than one edge between the same pair of vertices — two different roads connecting the same two cities. A graph that allows this is a multigraph.

A simple graph is one with no self-loops and no multi-edges: at most one edge between any given pair of distinct vertices. Unless a question says otherwise, "graph" defaults to "simple graph," and essentially every counting formula in this chapter (maximum edges, number of graphs on n vertices) is a fact about simple graphs specifically — allow self-loops or multi-edges and the counts change.

[[FIG:graph-vocab]]

DEGREE OF A VERTEX

The degree of a vertex v in an undirected graph, written deg(v), is the number of edges incident to it — edges that touch it. If v has a self-loop, that loop is incident to v twice (both its ends land on v), so it contributes 2 to deg(v), not 1. This is not a special rule invented for loops; it falls straight out of "count the edge-endpoints touching v."

A directed graph splits degree into two numbers, because in-coming and out-going edges play different roles. The in-degree of v, in-deg(v), counts edges pointing into v (edges (u, v) for any u); the out-degree, out-deg(v), counts edges pointing out of v (edges (v, w) for any w). A vertex can have high in-degree and low out-degree, or the reverse — a popular web page linked-to by thousands of sites but linking out to only a handful has huge in-degree and tiny out-degree.

THE HANDSHAKE LEMMA

Here is the first fact worth deriving rather than memorising, because the derivation is what makes it unforgettable.

Take any undirected graph and sum the degree of every vertex: Σ deg(v) over all v in V. Now look at that sum from the edges' point of view instead of the vertices'. Every single edge (u, v) contributes exactly 1 to deg(u) and exactly 1 to deg(v) — that is the definition of degree, "how many edges touch me." So each edge is counted exactly twice in the sum, once at each endpoint, whether or not those endpoints happen to be the same vertex (a self-loop still contributes its 2 to the one vertex it touches).

1. Pick any edge in the graph — it has exactly two endpoints (possibly equal, for a loop).
2. That edge adds exactly 1 to the degree count at each endpoint — 2 total across the whole sum Σ deg(v).
3. Since this is true for every one of the |E| edges independently, and the sum Σ deg(v) is nothing but the total of these per-edge contributions, Σ deg(v) = 2 |E|.

Σ deg(v) = 2|E|

This is the handshake lemma (or degree-sum theorem): shake hands at a party, and the number of hands shaken is twice the number of handshakes, because each handshake involves exactly two hands. It holds for every undirected graph — connected or not, simple or not, loops or not — because the argument never used any of those properties.

Two consequences follow immediately, and both are used constantly.

REMEMBER: The number of odd-degree vertices in any undirected graph is always even. Proof: split Σ deg(v) into the sum over odd-degree vertices plus the sum over even-degree vertices. The even part is a sum of even numbers, hence even. The total, 2|E|, is even. So the odd part must also be even — and a sum of odd numbers is even only if there is an even count of them.

For a directed graph, the analogous fact splits by direction instead of doubling: Σ in-deg(v) = Σ out-deg(v) = |E|, because every edge contributes exactly one unit to some vertex's in-degree and exactly one unit to some (possibly different) vertex's out-degree — it is never double-counted the way an undirected edge is, since its two "sides" are different quantities.

PATHS, CYCLES AND CONNECTIVITY

A walk from u to v is a sequence of vertices u = v0, v1, ..., vk = v where consecutive vertices are joined by an edge. A path is a walk that never repeats a vertex — no backtracking, no revisiting. A simple path is the same thing (some authors use "path" loosely to mean "walk," so "simple path" removes the ambiguity by insisting explicitly on no repeats).

A cycle is a path that returns to where it started — v0 = vk with k ≥ 1 — with no other repeated vertex along the way (in an undirected simple graph, a cycle needs at least 3 distinct vertices, since a "cycle" of length 2 would require two parallel edges between the same pair).

An undirected graph is connected if there is a path between every pair of vertices. If it is not, it breaks into connected components: maximal sets of vertices, each internally fully reachable, with no path crossing between different components. "Maximal" matters — a component is not just some connected subset, it is the largest one containing that subset; you cannot add another vertex reachable from it without it already having been included.

Directed graphs need a sharper vocabulary, because "path from u to v" no longer implies "path from v to u." A directed graph is strongly connected if every vertex can reach every other vertex by a directed path — u to v and v to u both exist for every pair. It is (only) weakly connected if the underlying undirected graph, obtained by dropping every arrow's direction, is connected, even though many directed paths may be missing. A directed cycle (1→2→3→1) is strongly connected. A directed path with no way back (1→2→3) is weakly connected but not strongly connected — 3 cannot reach 1 at all.

GATE TRAP: "Connected" applied to a directed graph is ambiguous unless you specify which kind. A graph can be weakly connected (drawn as one piece if you erase the arrows) while having no strongly-connected pair of vertices whatsoever, e.g. a directed path. Always ask "strongly, or just weakly?"

SPECIAL FAMILIES OF GRAPHS

A handful of shapes recur often enough to deserve their own names.

A complete graph on n vertices, written K_n, has every possible edge present: every pair of distinct vertices is joined. To count its edges, note that each of the n vertices could be paired with any of the other n − 1 vertices, giving n(n − 1) ordered pairs — but each undirected edge {u, v} is counted twice this way, once as (u, v) and once as (v, u), so divide by 2.

edges(K_n) = n(n − 1) / 2

This is also just "choose 2 vertices out of n," C(n, 2), which is the same formula written a different way. K_4 has 4·3/2 = 6 edges; K_5 has 10; this number is the maximum any simple undirected graph on n vertices can have, since a simple graph forbids exactly the two things (loops, multi-edges) that would let you exceed it.

A bipartite graph has its vertices split into two sets X and Y such that every edge joins a vertex in X to one in Y — no edge has both endpoints in the same set. Matching problems (jobs to workers, students to hostels) are naturally bipartite. A bipartite graph can be recognised by attempting a 2-colouring, covered in detail later in this chapter; the short version is that a graph is bipartite exactly when it contains no cycle of odd length.

A tree, seen in an earlier chapter as a data structure, is — in graph terms — simply a connected, acyclic undirected graph: connected (one piece) and acyclic (no cycles anywhere). A forest is a disjoint collection of trees — acyclic, but not necessarily connected; every connected component of a forest is itself a tree.

A directed acyclic graph (DAG) is a directed graph with no directed cycles — you can never leave a vertex and, by following arrows, return to it. Task-scheduling graphs (edge u→v meaning "u must happen before v") are DAGs precisely because a cycle there would mean a task must precede itself, which is unschedulable.

A subgraph of G = (V, E) is any graph G' = (V', E') with V' ⊆ V and E' ⊆ E, where every edge in E' still has both its endpoints in V' (you cannot keep an edge while dropping one of its endpoints). A spanning subgraph keeps all of V but only some of E.

A graph is called dense when the number of edges is close to the maximum possible, Θ(V²), and sparse when it is much smaller — typically O(V) or O(V log V). This is not a hard threshold; it is a description of which asymptotic regime the graph lives in, and it drives the entire representation choice in the next section.

HOW MANY EDGES CAN A TREE HAVE, AND WHY

Since trees show up constantly as the "minimum-connected" case, it is worth deriving the fact that a tree on n vertices always has exactly n − 1 edges, rather than taking it on faith.

1. First, a finite tree with at least 2 vertices always has a leaf — a vertex of degree 1. If every vertex had degree ≥ 2, you could walk from any starting vertex always choosing an edge you have not just come from; with infinitely many steps forced into a finite vertex set, some vertex must repeat, and the walk between its two visits is a cycle — contradicting acyclicity. So a degree-1 vertex must exist.
2. Remove that leaf and its single incident edge. The remaining graph on n − 1 vertices is still connected (the leaf could not have been anyone's only route to anyone else, since it had exactly one edge) and still acyclic (removing an edge cannot create a cycle). So it is again a tree, now with n − 1 vertices.
3. By induction, a tree on n − 1 vertices has (n − 1) − 1 = n − 2 edges (base case: a tree on 1 vertex has 0 edges, trivially).
4. Adding back the removed leaf and its one edge gives n vertices and (n − 2) + 1 = n − 1 edges.

edges(tree on n vertices) = n − 1

This single formula is the source of several other results in this chapter, because "tree" is really just another name for "the cheapest possible way to be connected."

MINIMUM EDGES TO STAY CONNECTED

How few edges can an n-vertex graph have and still be connected? The tree result above already tells you the answer is achievable at n − 1 — a tree is connected by definition — but it is worth seeing why you can never do it with fewer.

1. With 0 edges, an n-vertex graph has n separate components (every vertex isolated).
2. Adding any single edge can merge at most two components into one, so it can reduce the component count by at most 1.
3. Starting from n components and adding m edges, the number of components is therefore at least n − m (it could be more, if an edge joins two vertices already in the same component and does nothing).
4. For the graph to be connected — exactly 1 component — you need n − m ≤ 1, i.e. m ≥ n − 1.

min edges for connectivity = n − 1

And m = n − 1 is achievable, since a tree with exactly n − 1 edges is connected — so the bound is tight, not just a loose inequality.

MAXIMUM EDGES WHILE STILL DISCONNECTED

The opposite extreme: what is the most edges an n-vertex graph can have while still failing to be connected? Intuitively you want to waste as few edges as possible on "keeping it disconnected" and pack the rest as densely as you can, which means making one component as close to complete as possible and starving the rest.

Suppose the graph splits into two groups of sizes k and n − k, with no edges allowed between them (more groups only wastes more of the vertex budget on separation), and each group made a complete graph internally. Total edges = C(k, 2) + C(n − k, 2). Try a few splits for n = 6 to see which is best:

1. Split (3, 3): C(3,2) + C(3,2) = 3 + 3 = 6.
2. Split (2, 4): C(2,2) + C(4,2) = 1 + 6 = 7.
3. Split (1, 5): C(1,2) + C(5,2) = 0 + 10 = 10.

The most lopsided split wins, and it always will: C(k, 2) + C(n − k, 2) is a sum of two convex (upward-curving) functions of k, and such a sum is maximised at the extremes of its range, not in the middle — pulling one group down to a single isolated vertex and dumping everyone else into one complete component wastes the least edge-capacity on the separation. With k = 1, C(1, 2) = 0 and the rest is C(n − 1, 2):

max edges while disconnected = (n − 1)(n − 2) / 2

For n = 6 this gives 5·4/2 = 10, matching the split-(1,5) computation above. Notice this is the count for "K_{n-1} plus one isolated vertex," the single densest disconnected graph on n vertices.

GATE TRAP: Do not confuse "maximum edges while disconnected" with "minimum edges to guarantee connectivity is impossible without more information." The formula above is a maximum for one specific worst (densest) disconnected shape; a graph with more edges than (n−1)(n−2)/2 is FORCED to be connected, since it exceeds every disconnected graph's capacity, but a graph with fewer edges is not forced to be disconnected — it might still happen to be a sparse connected graph.

COUNTING GRAPHS AND SPANNING TREES

Two further counting facts are worth having, because they come up as standalone questions and because they show what "the space of all graphs" looks like.

How many distinct simple undirected graphs are there on n labelled vertices? There are C(n, 2) = n(n − 1)/2 possible edges (every unordered pair of distinct vertices), and a graph is exactly a choice, for each possible edge, of "present" or "absent" — an independent binary decision per possible edge. With C(n, 2) independent binary choices:

number of simple graphs on n labelled vertices = 2^(n(n − 1)/2)

For n = 4 that is 2^6 = 64 distinct labelled graphs, ranging from the empty graph to K_4.

How many different spanning trees does K_n have — that is, in how many ways can you pick n − 1 of K_n's edges so that the result is connected and acyclic? This is Cayley's formula, and while its proof (via the Prüfer sequence, a bijection between labelled trees and strings of length n − 2 over an n-symbol alphabet) is beyond what this chapter derives, the result itself is used directly:

number of spanning trees of K_n = n^(n − 2)

For n = 4, that is 4² = 16 spanning trees; for n = 3 (a triangle), 3¹ = 3, matching the fact that a triangle has exactly 3 ways to remove one edge and leave a connected, acyclic path.

WHEN "n VERTICES, n − 1 EDGES" MEANS A TREE — AND WHEN IT DOESN'T

A common trap is treating "n vertices and n − 1 edges" as automatically meaning "tree." It is not, on its own — you additionally need either connectivity or acyclicity, and then the other one comes for free. The following four statements about a graph with n vertices and exactly n − 1 edges are equivalent — any one of them, combined with the edge count, forces all the others:

• (a) The graph is a tree (connected and acyclic, by definition).
• (b) The graph is connected. (If it had a cycle, removing one cycle edge would keep it connected with n − 2 edges, but the minimum-edges-for-connectivity result above says that is impossible — so no cycle can exist, i.e. it is acyclic too, hence a tree.)
• (c) The graph is acyclic. (A forest with c components and n vertices has exactly n − c edges — apply the tree-edge-count result to each component and add — so n − 1 edges forces c = 1, i.e. connected, hence a tree.)
• (d) Every pair of vertices is joined by exactly one simple path. (Two distinct paths between the same pair would create a cycle by combining them; and disconnection would mean some pair has zero paths — either failure breaks "exactly one," so this is just (a) restated operationally.)

GATE TRAP: A graph with n vertices and n − 1 edges that is NOT connected is not a tree — it could be, say, two separate trees whose edge counts happen to add up to n − 1 with fewer vertices covered, or one tree plus isolated vertices. The n − 1 edge count only forces "tree" once you also know either connectivity or acyclicity; by itself it forces neither.

REPRESENTING A GRAPH IN MEMORY

A graph as a mathematical object is just two sets, V and E. To compute with it, you need a concrete data structure, and unlike arrays or trees there is a genuine choice here with real trade-offs — this is one of the most exam-relevant parts of the whole chapter precisely because both structures below are simple, and the entire difficulty is knowing which one costs what.

[[FIG:adj-matrix-list]]

THE ADJACENCY MATRIX

Number the vertices 1 to n. The adjacency matrix is an n × n array M where M[i][j] = 1 if there is an edge from i to j (or M[i][j] = weight(i, j) for a weighted graph, and some sentinel like ∞ or −1 for "no edge"), and 0 (or that sentinel) otherwise.

Because M has n rows and n columns regardless of how many edges actually exist, its space is Θ(n²) always — a graph with zero edges and a graph with the maximum possible number of edges occupy exactly the same amount of memory. This is the matrix's core weakness for sparse graphs: most of the grid is wasted storing "no edge" markers.

In exchange, checking whether a specific edge (i, j) exists is a single array lookup, M[i][j], which is O(1) — the matrix's defining strength. Finding all of i's neighbours means scanning row i, which takes O(n) regardless of how many neighbours i actually has, since you must check every column to know which are 0.

For an undirected graph, M is symmetric — M[i][j] = M[j][i] for every i, j — since edge (i, j) and edge (j, i) are the same edge. This symmetry is itself a useful test: if you are handed a matrix and told the graph is undirected, it had better be symmetric, and if it is not, the graph must be directed.

KEY: (M²)[i][i], for an unweighted, loop-free graph with boolean matrix M, equals deg(i). Derivation: (M²)[i][i] = Σ_k M[i][k]·M[k][i]. For an undirected graph M[k][i] = M[i][k], so this is Σ_k M[i][k]², and since each entry is 0 or 1, squaring changes nothing — the sum just counts how many k have M[i][k] = 1, which is exactly i's degree. More generally, (M^p)[i][j] counts the number of distinct walks of length exactly p from i to j — each matrix multiplication extends a walk by one more edge, summed over every intermediate vertex it could pass through.

THE ADJACENCY LIST

The adjacency list instead keeps, for each vertex i, a list of only its actual neighbours: an array of n list-heads, list[i] holding exactly the vertices adjacent to i (and, for a weighted graph, the weight alongside each one).

Space is Θ(n + e): n for the array of list-heads, plus — for an undirected graph — 2e for the neighbour entries, since every edge (u, v) is stored once in u's list and once in v's list (for a directed graph it is e, since edge (u, v) is stored only in u's out-list). Space scales with what is actually present, not with a fixed n² grid, which is why this representation is the standard choice for sparse graphs.

Checking whether edge (i, j) exists now costs O(deg(i)) in the worst case — you must scan i's list looking for j, since there is no direct index the way a matrix offers. This is worse than the matrix's O(1). But finding all of i's neighbours is O(deg(i)) exactly — you read precisely as many entries as there are neighbours, no wasted scanning of absent edges — which is strictly better than the matrix's forced O(n).

[[FIG:bfs-dfs-trace]]

REMEMBER: Matrix is O(1) edge lookup, O(n) neighbour enumeration, Θ(n²) space always. List is O(deg) edge lookup, O(deg) neighbour enumeration, Θ(n+e) space. Since graph algorithms overwhelmingly need "enumerate my neighbours" far more often than "does this one specific edge exist," the list wins for essentially every traversal algorithm on a sparse graph, which is most graphs met in practice.

THE SPACE CROSSOVER, WORKED EXACTLY

"For a graph with V vertices and E edges, which representation takes less space?" can be answered exactly, not just "usually the list," by comparing the two space costs as concrete counts rather than asymptotic classes.

1. Adjacency matrix: V² cells, one unit each, always — regardless of E.
2. Adjacency list (undirected): V head-pointers plus 2E neighbour entries, one unit each — V + 2E total.
3. The list uses less space exactly when V + 2E < V², i.e. E < (V² − V)/2 = V(V − 1)/2 — but V(V − 1)/2 is precisely the maximum possible number of edges in a simple undirected graph on V vertices (the complete graph K_V, derived earlier in this chapter).
4. So for any simple graph that is not complete, the adjacency list uses strictly less space than the matrix. At E = V(V − 1)/2 exactly (the complete graph), the two are equal: V + 2·V(V−1)/2 = V + V(V − 1) = V².

REMEMBER: The adjacency list never uses more space than the matrix for a simple graph, and uses strictly less unless the graph is complete. "Which is smaller" is not usually a close call — it collapses to "is this graph complete," and almost nothing met in practice is.

For a directed graph the same argument runs with V + E instead of V + 2E (each edge stored once, in its source's out-list), crossing over at E = V(V − 1), the maximum edge count for a simple directed graph — the same shape of result.

INCIDENCE MATRIX AND EDGE LIST

Two further representations are worth knowing, each suited to a specific kind of algorithm rather than to general traversal.

The incidence matrix has one row per vertex and one column per edge; entry [v][e] is 1 if vertex v is an endpoint of edge e (for a directed graph, some conventions use +1 for the tail and −1 for the head, to encode direction algebraically). Its size is Θ(V · E), which for a typical sparse graph (E in the tens or hundreds of V) is far larger than either the matrix or the list — it is rarely the space-efficient choice. It earns its place in specific settings, such as expressing a graph's structure as a linear-algebra object for flow or circuit problems, where the vertex-edge incidence relationship itself is what the algorithm operates on.

An edge list is simply the list of all edges, each stored once as a (u, v) pair (with a weight if applicable) — no per-vertex organisation at all. Its space, Θ(E), is the smallest of all four representations. Its weakness is that finding a specific vertex's neighbours requires scanning the entire list, O(E), since edges are not grouped by vertex. It is the natural representation for algorithms that need to process every edge as a flat collection — sorting all edges by weight, for instance, which the algorithms chapter uses for building minimum spanning trees — rather than for algorithms like BFS or DFS that repeatedly ask "who are this vertex's neighbours."

CONVERTING BETWEEN REPRESENTATIONS

Going from a matrix to a list: scan every row i and, for every column j with M[i][j] ≠ 0, append j to list[i]. This visits all V² matrix entries once, so it costs O(V²) even if the graph is very sparse — you cannot know which cells are 1 without checking all of them.

Going from a list to a matrix: first allocate and zero-initialise a V × V array (already O(V²), since you must write every cell even the ones that stay 0), then for each vertex i and each neighbour j in list[i], set M[i][j] = 1. The list-scanning part is O(V + E), but the zero-initialisation forces the whole conversion to be at least O(V²) regardless.

GATE TRAP: "Convert list to matrix" is often assumed to inherit the list's O(V+E) cost, since reading the list only takes that long. But writing a full V×V matrix — even one full of zeros — is unavoidably O(V²) work, and that dominates whenever E is small. Building a matrix can never be faster than O(V²), no matter how sparse the source.

WHY WE NEED A SYSTEMATIC WAY TO EXPLORE A GRAPH

Neither representation, on its own, tells you "which vertices are reachable from here" or "in what order do things become reachable." Answering that needs an algorithm that visits every vertex exactly once, keeps track of what has already been seen (so it never loops forever around a cycle), and processes neighbours in some definite, describable order. Two such algorithms dominate the whole subject: breadth-first search, which explores level by level outward from a source, and depth-first search, which plunges as deep as possible before backing up. Different orders, and — as the rest of this chapter shows — genuinely different guarantees.

BREADTH-FIRST SEARCH: THE ALGORITHM

BFS explores a graph outward from a source vertex s in order of distance: it visits every vertex at distance 1 from s, then every vertex at distance 2, and so on, never visiting a farther vertex before a nearer one. It achieves this using a queue — first-in, first-out — plus three pieces of bookkeeping per vertex: a visited (or colour) flag so no vertex is processed twice, a distance array dist[] recording how many edges from s each vertex is, and a parent array recording, for each vertex, which vertex first discovered it (this is what lets you reconstruct the actual shortest path afterward, not just its length).

1. Mark s visited, set dist[s] = 0, parent[s] = none, and enqueue s.
2. While the queue is not empty: dequeue a vertex u.
3. For each neighbour v of u (in the order the representation lists them): if v is not yet visited, mark it visited, set dist[v] = dist[u] + 1, parent[v] = u, and enqueue v.
4. Repeat step 2 until the queue empties. Every vertex reachable from s has now been visited exactly once.

A FULL BFS TRACE

Take the undirected graph with adjacency lists (neighbours listed in increasing order): 1: [2,3], 2: [1,4,5], 3: [1,6], 4: [2], 5: [2,6], 6: [3,5]. Run BFS from vertex 1, showing the queue's exact contents after every step.

1. Initialise: visited = {1}, dist[1] = 0, parent[1] = —, queue = [1].
2. Dequeue 1. Neighbours 2, 3, both unvisited. Mark both visited, dist = 1, parent = 1. Enqueue in listed order. Queue = [2, 3].
3. Dequeue 2. Neighbours 1 (visited, skip), 4, 5 (both unvisited). Mark visited, dist = 2, parent = 2. Queue = [3, 4, 5].
4. Dequeue 3. Neighbours 1 (visited, skip), 6 (unvisited). Mark visited, dist = 2, parent = 3. Queue = [4, 5, 6].
5. Dequeue 4. Neighbour 2 (visited, skip). Nothing new. Queue = [5, 6].
6. Dequeue 5. Neighbours 2 (visited), 6 (already visited — it was enqueued in step 4, when 3 discovered it first). Nothing new. Queue = [6].
7. Dequeue 6. Neighbours 3 (visited), 5 (visited). Nothing new. Queue = [] — done.

Discovery order: 1, 2, 3, 4, 5, 6. Distances: dist[1]=0, dist[2]=dist[3]=1, dist[4]=dist[5]=dist[6]=2. The BFS tree — the edges actually used to discover a new vertex — is {(1,2), (1,3), (2,4), (2,5), (3,6)}. The real edge (5,6) is not a tree edge: by the time 5 is processed, 6 is already visited (discovered via 3), so this edge is simply skipped as "leads somewhere already known." It connects two vertices at the same distance level, which is exactly what a non-tree BFS edge always does in an unweighted graph — it can never connect vertices more than one level apart, since a vertex is discovered the moment any neighbour at the previous level reaches it.

[[FIG:bfs-dfs-trace]]

WHY BFS FINDS SHORTEST PATHS IN AN UNWEIGHTED GRAPH

The claim is that dist[v], as computed above, equals the true shortest-path distance (fewest edges) from s to v — not merely "some" distance. The proof is by induction on the distance value itself.

1. Base case, distance 0: only s is at true distance 0 from itself, and BFS sets dist[s] = 0 directly. Match.
2. Inductive hypothesis: assume BFS has correctly assigned dist = k to exactly the vertices at true distance k, for all k up to some value, and that they were all enqueued (in some order) before any vertex at distance k+1.
3. Every vertex at true distance k+1 has, by definition of distance, at least one neighbour at true distance k. Since all distance-k vertices are dequeued before any distance-(k+1) vertex can be (they were enqueued earlier and the queue is FIFO), that neighbour is processed and discovers the distance-(k+1) vertex, assigning it dist = k+1 — before any vertex farther away gets a chance to reach it first with a longer count.
4. No vertex at true distance k+1 can be assigned a smaller dist, because that would require a neighbour at true distance < k, which by the inductive hypothesis would already have been discovered — but by the same logic that neighbour cannot itself be closer than k, or the vertex would have true distance less than k+1 to begin with.

So BFS distances and true shortest-path distances coincide exactly, and the parent pointers trace out an actual shortest path — follow parent[] backward from any vertex to s.

GATE TRAP: This shortest-path guarantee holds only for unweighted graphs, where "distance" means "number of edges." Run plain BFS on a weighted graph and it still gives you the path with the fewest edges — which can easily be a much more expensive path in total weight than some other route with more, cheaper edges. Weighted shortest paths need Dijkstra's algorithm or Bellman-Ford, which belong to the algorithms chapter.

BFS COMPLEXITY

With an adjacency list: every vertex is enqueued and dequeued exactly once (that is where the "visited" check earns its cost), contributing O(V) total, and every vertex's adjacency list is scanned exactly once, over the whole run contributing O(E) total (since summing every vertex's degree, by the handshake lemma, gives 2|E| for an undirected graph — still Θ(E)). Total: O(V + E).

With an adjacency matrix, finding "all neighbours of u" costs O(V) per vertex regardless of actual degree (a full row scan), and this happens once per dequeued vertex, giving O(V²) overall — no way around it, since the matrix cannot skip past the zeros.

BFS with an adjacency list: O(V + E). BFS with an adjacency matrix: O(V²).

WHICH BFS ORDERS ARE POSSIBLE

A frequent question style gives a graph and a starting vertex and asks which of several sequences could be a valid BFS order, or how many distinct BFS orders exist, when the order neighbours are enqueued within a single dequeue step is left unspecified (only the level-by-level property is fixed).

The rule for checking a proposed sequence: it is a valid BFS order exactly when every vertex appears no earlier than all vertices at a smaller true distance, and — within a distance level — every vertex could only have been enqueued after its actual discovering neighbour was dequeued. Concretely: build the levels by true distance from the source, and check the sequence lists level 0, then some permutation of level 1, then some permutation of level 2, and so on, never mixing levels out of order.

Counting distinct orders: multiply the number of independent tie-breaking choices at each branch point. Take vertices 1, 2, 3, 4 with edges 1-2, 1-3, 2-4, 3-4 (a 4-cycle). BFS from 1: vertex 1 has two unvisited neighbours, 2 and 3, which can be enqueued in either order — 2 independent choices, giving orders (1,2,3,4) or (1,3,2,4). Whichever order they are dequeued in, the first of them to be processed discovers 4 (both 2 and 4 are adjacent, and 3 and 4 are adjacent, so 4 is reachable from whichever of {2,3} goes first); the second one finds nothing new since 4 is already visited. So exactly 2 distinct BFS orders exist for this graph from vertex 1 — one per choice at the single branch point, with no further branching afterward.

DEPTH-FIRST SEARCH: THE ALGORITHM

Where BFS spreads outward level by level using a queue, DFS commits to a single path as deep as it can go before backing up — using a stack, either an explicit one or the call stack of a recursive implementation. Two extra pieces of bookkeeping matter for DFS that did not for BFS: a discovery time, the step at which a vertex is first reached, and a finish time, the step at which all of its descendants have been fully explored and it is about to be popped. These times are what let DFS classify edges, coming up next.

Recursive form: DFS-VISIT(u) marks u discovered (colour it grey, record discovery time), then for every neighbour v of u in listed order — if v is undiscovered (white), recursively call DFS-VISIT(v); once every neighbour has been considered, mark u finished (colour it black, record finish time). The top-level DFS(G) calls DFS-VISIT on every still-white vertex, in some fixed vertex order, to make sure disconnected parts are all covered — this is exactly what produces a DFS forest rather than always a single tree.

An explicit-stack version pushes u, and instead of a clean recursive return, must be careful to only pop u once all of its neighbours have been considered — which either needs the stack to hold "the next neighbour index to try" alongside u, or accepts a variant where a vertex can be pushed multiple times and later pops are simply ignored if it is already visited. The recursive version is cleaner precisely because the call stack automatically remembers "which neighbour was I up to" via the loop variable in each frame.

A FULL DFS TRACE WITH EDGE CLASSIFICATION

Take the directed graph with adjacency lists (explored in listed order): 1: [2], 2: [3,4], 3: [4], 4: [1], 5: [2,6], 6: [4]. Run DFS starting at vertex 1 (the smallest unvisited vertex), continuing at the next unvisited vertex in numeric order once the first tree is exhausted.

1. Visit 1: discovery time d[1] = 1, colour grey. Neighbour: 2.
2. Visit 2: d[2] = 2, grey. Neighbours: 3, 4.
3. Visit 3: d[3] = 3, grey. Neighbour: 4.
4. Visit 4: d[4] = 4, grey. Neighbour: 1 — but 1 is grey (still on the recursion stack, an ancestor). Edge (4,1) is a BACK edge — it points to an ancestor still being processed, and its existence means the graph has a cycle (1→2→3→4→1).
5. Vertex 4 has no more neighbours. Finish 4: f[4] = 5, colour black.
6. Back at 3, no more neighbours. Finish 3: f[3] = 6, black.
7. Back at 2, next neighbour: 4. Vertex 4 is black (already finished) and is a descendant of 2 (discovered via 2→3→4, so d[2] < d[4] < f[4] — all inside 2's still-open interval). A finished descendant reached by a non-tree edge is a FORWARD edge: (2,4).
8. Vertex 2 has no more neighbours. Finish 2: f[2] = 7, black.
9. Back at 1, no more neighbours. Finish 1: f[1] = 8, black. Tree 1 complete: tree edges (1,2), (2,3), (3,4); back edge (4,1); forward edge (2,4).
10. Next unvisited vertex in order: 5. Visit 5: d[5] = 9, grey. Neighbours: 2, 6.
11. Vertex 2 is black; its interval [2,7] is entirely finished before 5 was even discovered (f[2]=7 < d[5]=9) — neither ancestor nor descendant of 5. Edge (5,2) is a CROSS edge, connecting to an already-completed, unrelated part of the forest.
12. Next neighbour of 5: 6, unvisited. Visit 6: d[6] = 10, grey. Neighbour: 4.
13. Vertex 4 is black, interval [4,5], long finished before 6 started — again unrelated. Edge (6,4) is a CROSS edge.
14. Vertex 6 has no more neighbours. Finish 6: f[6] = 11. Back at 5, no more neighbours. Finish 5: f[5] = 12.

[[FIG:dfs-edge-types]]

Final times: (d,f) = 1:(1,8), 2:(2,7), 3:(3,6), 4:(4,5), 5:(9,12), 6:(10,11). Edge tally: tree — (1,2),(2,3),(3,4),(5,6); back — (4,1); forward — (2,4); cross — (5,2),(6,4).

EDGE CLASSIFICATION: THE RULE AND THE PARENTHESIS THEOREM

Every non-root-to-child edge (u,v) encountered during DFS falls into exactly one of four categories, decided entirely by v's colour and, if v is already visited, by the relation between the two discovery/finish intervals.

• Tree edge: v is white when (u,v) is examined — this is how v gets discovered at all.
• Back edge: v is grey — v is a currently-open ancestor of u on the recursion stack. Its interval [d[v], f[v]] is still open and entirely contains u's (open) interval.
• Forward edge: v is black, and v is a descendant of u — d[u] < d[v] < f[v] < f[u], meaning v's whole interval sits nested inside u's.
• Cross edge: v is black, and v is not a descendant of u — v's interval is entirely finished before u's even opens, i.e. f[v] < d[u], so the two intervals are disjoint.

This is exactly the parenthesis theorem: treat each discovery as an opening parenthesis and each finish as a closing one; for any two vertices, their intervals are either completely nested (one entirely inside the other, an ancestor-descendant relationship) or completely disjoint (neither an ancestor of the other) — they can never partially overlap. Every edge-classification rule above is just naming which of those two configurations, and which direction, a given non-tree edge exhibits.

KEY: A back edge exists in a DFS of a directed graph if and only if the graph has a directed cycle. If DFS ever completes with zero back edges, the graph is guaranteed acyclic — a DAG — and this is precisely how cycle detection in a directed graph works: run DFS, and watch for any edge to a grey vertex.

WHY UNDIRECTED GRAPHS HAVE NO FORWARD OR CROSS EDGES

Run DFS on an undirected graph and only tree edges and back edges ever appear — never forward, never cross. The reason is that every edge is examined from both of its endpoints (edge {u,v} sits in both u's list and v's list), so whichever endpoint is reached first necessarily discovers the other one through that very edge, making it a tree edge from that side. Consider the edge from the later-processed endpoint's perspective: by the time it is examined, the other endpoint is already coloured — and it must be grey (an open ancestor), because if it were black (finished), the edge would already have been traversed as a tree edge from the earlier endpoint's exploration (an undirected graph cannot finish exploring one endpoint of an edge without having already considered the edge itself). So the only possibilities are "first traversal, still white → tree edge" or "second traversal, now grey → back edge" — forward and cross, which both require the far endpoint to already be black, simply cannot happen.

GATE TRAP: In an UNDIRECTED graph's DFS, the edge leading straight back to your immediate parent — the tree edge you just came down — is not a "back edge indicating a cycle." It is simply the same tree edge examined from the other side. A genuine back edge in an undirected DFS must reach a grey ancestor that is not your direct parent; only that signals an actual cycle.

DFS COMPLEXITY

Exactly as with BFS, every vertex is visited (and finished) exactly once — O(V) — and every adjacency list is scanned exactly once in full over the whole recursion — O(E) with an adjacency list, or O(V) per vertex (hence O(V²) overall) with a matrix, for the identical reason as BFS: the matrix forces a full row scan regardless of actual degree.

DFS with an adjacency list: O(V + E). DFS with an adjacency matrix: O(V²).

WHICH DFS ORDERS ARE POSSIBLE

The same "count the branch points" method used for BFS orders applies to DFS, but the consequences of an early choice run deeper, because DFS commits fully to one branch before considering the other. On the 4-cycle from before (1-2,1-3,2-4,3-4), DFS from 1 first chooses between neighbours 2 and 3.

If it picks 2 first: from 2, the only unvisited neighbour is 4 (1 is visited); from 4, the only unvisited neighbour is 3. Order: 1, 2, 4, 3. If it picks 3 first instead: symmetric argument gives 1, 3, 4, 2. So exactly 2 distinct DFS orders exist here too — one choice at the root, and every choice after that is forced (no more unvisited neighbours to branch on). In general, count the number of unvisited-neighbour choices available at each step of a full trace and multiply them; a step with only one legal (unvisited) option contributes a factor of 1 and does not grow the count.

APPLICATIONS: COUNTING CONNECTED COMPONENTS

Either traversal answers "how many connected components does this graph have?" directly: initialise every vertex as unvisited, and repeatedly pick any unvisited vertex, run a full BFS or DFS from it (which necessarily visits every vertex in its component and nothing outside it — that is exactly what "component" means), mark all of them visited, and increment a component counter. The final counter value is the component count, and — as a byproduct — each traversal's visited set is exactly one component's vertex list.

The reason this necessarily works: a single BFS/DFS from a vertex v reaches every vertex with a path to v (by construction — it explores every edge out of every discovered vertex) and no vertex without one (it never invents an edge). That set of "vertices with a path to v" is, by definition, v's connected component.

CYCLE DETECTION

In a directed graph, cycle detection is exactly the back-edge test derived above: run DFS with the standard white/grey/black colouring, and the graph has a cycle if and only if some edge is examined while its destination is grey.

In an undirected graph, the test is different because — as shown above — every non-tree edge in an undirected DFS is automatically a "back edge" in the loose sense of reaching an already-grey vertex, since forward and cross edges cannot occur at all. The correct test is: a cycle exists if and only if DFS encounters an edge to an already-visited vertex that is not the immediate parent (the vertex you arrived from). Reaching the parent back along the same tree edge is expected and does not indicate a cycle; reaching any other already-visited vertex does.

BIPARTITENESS CHECK BY TWO-COLOURING

A graph is bipartite exactly when its vertices can be split into two sets with every edge crossing between them, and the standard test is a 2-colouring run via BFS (DFS works too, with the same logic): colour the source vertex 0, and whenever BFS discovers a new vertex through an edge, give it the opposite colour of the vertex that discovered it. If BFS ever finds an edge connecting two same-coloured vertices, the graph is not bipartite; if it finishes without any such conflict, it is.

Trace the check on a triangle, vertices 1-2-3-1 (a 3-cycle, so odd-length):

1. Colour 1 = A. Enqueue 1.
2. Dequeue 1. Neighbours 2, 3, both uncoloured. Colour both B (opposite of 1). Enqueue both.
3. Dequeue 2. Neighbour 1 is A, opposite of 2's B — fine. Neighbour 3 is already coloured B — same colour as 2. Edge (2,3) connects two B vertices. Conflict — NOT bipartite.

Now the 4-cycle, vertices 1-2-3-4-1 (even-length):

1. Colour 1 = A. Enqueue 1.
2. Dequeue 1. Neighbours 2, 4, uncoloured. Colour both B. Enqueue both.
3. Dequeue 2. Neighbour 1 is A, opposite of B — fine. Neighbour 3 uncoloured — colour A (opposite of B).
4. Dequeue 4. Neighbour 1 is A, opposite of B — fine. Neighbour 3 is already A — opposite of 4's B — fine, no conflict.
5. Dequeue 3. Neighbours 2 (B, opposite of A — fine), 4 (B, opposite of A — fine). No conflicts anywhere — bipartite, with parts {1,3} and {2,4}.

Why an odd cycle always breaks it: walking around any cycle, the colour must flip at every edge (each new vertex gets the opposite colour of the one that reached it). After an odd number of edges, an odd number of flips has occurred, so the vertex you return to would need to be the opposite of its own colour — impossible — which is exactly the contradiction the triangle trace above hit directly. An even cycle flips colour an even number of times, landing back on the same colour it started with, consistently.

KEY: A graph is bipartite if and only if it contains no odd-length cycle. The 2-colouring BFS/DFS is simply the mechanical way to either find such a cycle (as a same-colour conflict) or certify that none exists.

TOPOLOGICAL SORT

A topological order of a DAG is a linear ordering of all its vertices such that for every edge u→v, u appears before v in the order. It exists if and only if the graph is a DAG — a cycle u→...→u would force u to appear before itself, which no linear order can do — and, crucially, a DAG can have more than one valid topological order whenever it does not fully constrain every pair of vertices.

Two standard methods produce one. Take the DAG with edges 1→2, 1→3, 2→4, 3→4, 3→5, 4→6, 5→6 (adjacency lists, explored in listed order: 1:[2,3], 2:[4], 3:[4,5], 4:[6], 5:[6], 6:[]).

METHOD 1: DFS FINISH-TIME ORDER, REVERSED

Run DFS from vertex 1 (continuing at the next unvisited vertex in order afterward), and read off vertices in decreasing order of finish time.

1. Visit 1: d[1]=1. Neighbours 2, 3.
2. Visit 2: d[2]=2. Neighbour 4.
3. Visit 4: d[4]=3. Neighbour 6.
4. Visit 6: d[6]=4. No neighbours. Finish 6: f[6]=5.
5. Finish 4: f[4]=6 (no more neighbours). Finish 2: f[2]=7 (no more neighbours).
6. Back at 1, next neighbour: 3. Visit 3: d[3]=8. Neighbours 4, 5.
7. Neighbour 4 is already black — a cross edge (3,4), not a tree edge; move on. Neighbour 5 unvisited: visit 5, d[5]=9. Neighbour 6 already black — cross edge (5,6). Finish 5: f[5]=10.
8. Finish 3: f[3]=11 (no more neighbours). Finish 1: f[1]=12 (no more neighbours).

Finish times, increasing: 6(5), 4(6), 2(7), 5(10), 3(11), 1(12). Reversed (decreasing finish time) gives the topological order: 1, 3, 5, 2, 4, 6.

Why this always works: an edge u→v means v must be fully finished before u can finish (v is explored, directly or indirectly, from within u's call before u returns — either as a descendant, or already black from elsewhere, but never still grey, since that would require a back edge and hence a cycle, impossible in a DAG). So f[v] < f[u] for every edge u→v — u always finishes after v — and sorting by decreasing finish time is exactly sorting so that every u comes before every v it points to.

METHOD 2: KAHN'S ALGORITHM (IN-DEGREE REMOVAL)

Compute every vertex's in-degree, repeatedly remove a vertex with in-degree 0 (there must always be one available, in a DAG, or the algorithm would stall with a cycle remaining), append it to the output, and decrement the in-degree of each of its out-neighbours — some of which may now themselves hit 0 and become removable.

In-degrees on this DAG: 1:0, 2:1, 3:1, 4:2, 5:1, 6:2. Initial queue of in-degree-0 vertices: [1].

1. Dequeue 1, output = [1]. Decrement in-degree of 2 (1→0, enqueue) and 3 (1→0, enqueue). Queue = [2, 3].
2. Dequeue 2, output = [1, 2]. Decrement in-degree of 4 (2→1, not yet zero). Queue = [3].
3. Dequeue 3, output = [1, 2, 3]. Decrement in-degree of 4 (1→0, enqueue) and 5 (1→0, enqueue). Queue = [4, 5].
4. Dequeue 4, output = [1, 2, 3, 4]. Decrement in-degree of 6 (2→1, not yet zero). Queue = [5].
5. Dequeue 5, output = [1, 2, 3, 4, 5]. Decrement in-degree of 6 (1→0, enqueue). Queue = [6].
6. Dequeue 6, output = [1, 2, 3, 4, 5, 6]. Queue empty, all vertices output — done.

Kahn's order: 1, 2, 3, 4, 5, 6 — a different valid order from Method 1's 1, 3, 5, 2, 4, 6, and both are correct, since this DAG does not fully constrain the relative order of, say, 2 and 3, or of 4 and 5.

KEY: A DAG's topological order is generally not unique. Two correct algorithms run on the same DAG can — and often do — produce different valid orders. "The" topological order is a slight misnomer; ask instead "a valid topological order," unless a specific tie-breaking rule (like always preferring the smallest available vertex) is stated.

GATE TRAP: If Kahn's algorithm terminates having output fewer than V vertices, the remaining, never-reachable-zero-in-degree vertices are exactly the ones caught in a cycle — this is the standard way to both detect a cycle in a directed graph and prove no topological order exists, as an alternative to the DFS back-edge test.

COUNTING VALID TOPOLOGICAL ORDERS

Take the smaller DAG with vertices 1-5 and edges 1→2, 1→3, 2→4, 3→5. Vertex 1 must precede everything; beyond that, the graph is two independent chains, 2→4 and 3→5, with no constraint between the two chains at all — 2 and 3 can appear in either relative order, likewise 4 can come before or after 3 or 5, subject only to 2 preceding 4 and 3 preceding 5.

1. Fix vertex 1 first — forced, since it precedes every other vertex. One slot used, 4 remain: the two length-2 chains (2,4) and (3,5), each internally ordered.
2. Counting the orderings of the remaining 4 positions is a matter of choosing which 2 of the 4 slots go to the (2,4) chain (the other 2 automatically go to the (3,5) chain, in forced internal order): C(4, 2) = 6.
3. List all 6 to confirm: 2,4,3,5 / 2,3,4,5 / 2,3,5,4 / 3,5,2,4 / 3,2,5,4 / 3,2,4,5 — each is a genuine interleaving that respects "2 before 4" and "3 before 5," and no other interleaving of 4 items into two ordered pairs exists.

number of valid topological orders = 1 × C(4,2) = 6

This "count the interleavings of independent chains" technique is the general method: identify which parts of the DAG are totally ordered relative to each other (a single directed path) versus completely unordered relative to another such chain, and use a binomial coefficient (or its multinomial generalisation, for more than two chains) to count interleavings.

SHORTEST PATH AND PATH EXISTENCE VIA BFS

"Does a path from s to t exist?" is answered by running BFS (or DFS) from s and checking whether t was ever visited — reachability is exactly what a traversal computes. "What is the shortest path (fewest edges) from s to t, and what does it look like?" is answered by the same BFS run: dist[t] gives its length, and following parent[t], parent[parent[t]], and so on back to s and then reversing gives the actual vertex sequence.

On the six-vertex BFS trace earlier, the shortest path from 1 to 6 is reconstructed as parent[6]=3, parent[3]=1, giving the path 1→3→6, length 2 — matching dist[6]=2 computed during the trace.

ARTICULATION POINTS AND BRIDGES

An articulation point (or cut vertex) is a vertex whose removal increases the number of connected components. A bridge is an edge whose removal increases the number of connected components. Both describe single points of failure in a graph's connectivity, and both can be found by one DFS pass using the low-link idea, at a recognition level here (the full linear-time algorithm belongs to a more advanced treatment).

During DFS, alongside the usual discovery time disc[v], compute low[v]: the smallest discovery time reachable from v's subtree using at most one "escape" edge — either a back edge straight out of the subtree, or the low value already computed for a child. A non-root vertex v is an articulation point if it has some DFS-tree child c with low[c] ≥ disc[v] — meaning c's entire subtree has no way to reach anything above v except through v itself, so removing v strands that subtree. The tree edge (v, c) is additionally a bridge under the strictly stronger condition low[c] > disc[v] — no way back to v either, not even to v itself via some other route.

Concretely: take a triangle on {1,2,3}, connected to vertex 4 by a single edge (3,4), and vertex 4 connected onward to vertex 5 by a single edge (4,5). Vertex 3 is an articulation point — removing it leaves {1,2} connected to each other but cut off from {4,5}. Vertex 4 is also an articulation point — removing it strands vertex 5 alone. Both edges (3,4) and (4,5) are bridges — each is the unique connection joining what would otherwise be two separate pieces, so removing either splits the graph.

STRONGLY CONNECTED COMPONENTS

A strongly connected component (SCC) is a maximal set of vertices in a directed graph, every pair of which can reach each other. Kosaraju's algorithm finds all of them in three steps: run a DFS on the graph and record every vertex's finish time; build the transpose graph by reversing every edge's direction; then run DFS again on the transpose, processing vertices in decreasing order of the finish times recorded in the first pass, and each resulting DFS tree from this second pass is exactly one SCC. The reasoning mirrors the topological-sort argument — the highest-finishing vertex in the first pass must belong to a "source" SCC in the condensation (the DAG formed by shrinking each SCC to a point), so starting the reversed search there can only ever explore backward within that one component before the ordering forces it to stop.

WORKED PROBLEMS

1. Space comparison. A graph has n = 1000 vertices and e = 2000 edges. Compare adjacency matrix and adjacency list space usage.
   Matrix: n² = 1,000,000 cells, fixed. List (undirected): n + 2e = 1000 + 4000 = 5000 units. The list uses about 1/200th the space — vastly more efficient here, since e is far below the complete-graph threshold n(n−1)/2 ≈ 499,500 derived earlier.

2. Handshake application. An undirected graph on 8 vertices has degree sum 26. How many edges?
   Σdeg(v) = 2|E|, so |E| = 26 / 2 = 13.

3. Degree-sequence validity via parity. Is 3, 3, 2, 2, 2 a possible degree sequence for some simple undirected graph on 5 vertices?
   Sum = 3+3+2+2+2 = 12, which is even, satisfying the necessary handshake condition (|E| = 6). It is also actually realisable: label the vertices a(3), b(3), c(2), d(2), e(2), and take edges a-b, a-c, a-d, b-c, b-e, d-e. Check: deg(a)=3 (b,c,d), deg(b)=3 (a,c,e), deg(c)=2 (a,b), deg(d)=2 (a,e), deg(e)=2 (b,d) — matches exactly, and 6 edges gives degree sum 12 = 2×6. Valid.

4. Forest degree-sum check. A forest on 12 vertices has exactly 4 connected components. Is the degree sequence 3,3,2,2,2,2,1,1,1,1,1,1 possible?
   A forest with c components and n vertices has n − c edges (apply the tree-edge-count result to each component and sum): 12 − 4 = 8 edges, so the required degree sum is 2×8 = 16. The proposed sequence sums to 3+3+2+2+2+2+1+1+1+1+1+1 = 6+8+6 = 20 ≠ 16. Impossible — the sequence does not match what an 8-edge forest on 12 vertices requires, regardless of any other property.

5. BFS order. Undirected graph, adjacency lists (increasing order): 1:[2,3], 2:[1,4], 3:[1,4,5], 4:[2,3], 5:[3]. Find the BFS order from vertex 1.
   Queue trace: start [1], visited={1}. Dequeue 1: neighbours 2,3 unvisited, enqueue → [2,3]. Dequeue 2: neighbour 1 visited, neighbour 4 unvisited, enqueue → [3,4]. Dequeue 3: neighbour 1 visited, 4 already visited (enqueued by 2), 5 unvisited, enqueue → [4,5]. Dequeue 4: neighbours 2,3 both visited, nothing new → [5]. Dequeue 5: neighbour 3 visited, nothing new → []. Order: 1, 2, 3, 4, 5.

6. DFS edge classification count. Directed graph, adjacency lists (listed order): 1:[2,3], 2:[4], 3:[4], 4:[1]. DFS from 1 — classify every edge.
   Visit 1 (d=1). Neighbour 2: visit 2 (d=2). Neighbour 4: visit 4 (d=3). Neighbour 1: grey → BACK edge (4,1). Finish 4 (f=4). Finish 2 (f=5). Back at 1, next neighbour 3: visit 3 (d=6). Neighbour 4: black, and is 4 a descendant of 3? No — 4's interval [3,4] finished (f=4) before 3 was even discovered (d=6), so disjoint intervals → CROSS edge (3,4). Finish 3 (f=7). Finish 1 (f=8). Tally: tree edges (1,2),(2,4),(1,3) — 3 tree, 1 back, 0 forward, 1 cross.

7. Valid topological orders, counted. DAG with edges 1→2, 1→3, 2→4, 3→5 (as derived above in the chapter). How many valid topological orders exist?
   Vertex 1 is forced first. The remaining structure is two independent 2-chains (2→4) and (3→5); interleaving two ordered pairs into 4 slots has C(4,2) = 6 ways. Total valid orders: 6.

8. Both topological-sort methods on one DAG. Edges 1→2, 1→3, 2→4, 3→4, 3→5, 4→6, 5→6 (as traced above). Give the order from DFS-finish-reversed and from Kahn's algorithm.
   DFS finish times (from the full trace above): 6 finishes at 5, 4 at 6, 2 at 7, 5 at 10, 3 at 11, 1 at 12 — reversed order: 1, 3, 5, 2, 4, 6. Kahn's algorithm (from the full trace above, removing in-degree-0 vertices in the order they hit zero): 1, 2, 3, 4, 5, 6. Both are valid — they differ because the DAG leaves the relative order of {2,3} and of {4,5} unconstrained.

9. Bipartite check. Is the graph with edges 1-2, 2-3, 3-1 bipartite?
   Attempt 2-colouring by BFS from 1: colour 1 = A. Neighbours 2, 3 get colour B. Dequeue 2: neighbour 1 is A (fine, opposite), neighbour 3 is already B — same colour as 2, and edge (2,3) connects them. Conflict. Not bipartite — this is the triangle, an odd (length-3) cycle, and the theorem (bipartite iff no odd cycle) predicts exactly this failure.

10. Maximum edges, three ways. For n = 6: what is the maximum edge count for (a) a simple undirected graph, (b) a simple directed graph, (c) an undirected graph guaranteed disconnected?
    (a) K_6: n(n−1)/2 = 6×5/2 = 15. (b) every ordered pair of distinct vertices, no self-loops: n(n−1) = 30. (c) the densest disconnected shape, K_5 plus one isolated vertex: (n−1)(n−2)/2 = 5×4/2 = 10.

WHAT TO CARRY INTO THE NEXT CHAPTER

Every algorithm in this chapter treated all edges as equally costly to traverse — BFS's "distance" was a plain edge count, and topological sort never looked at edge weights at all. The moment edges carry different weights, "shortest" stops meaning "fewest edges" and starts meaning "least total cost," which plain BFS cannot compute — that is exactly the gap Dijkstra's algorithm and Bellman-Ford fill. Likewise, once a graph is weighted, "connect everything as cheaply as possible" becomes its own question, answered by minimum spanning tree algorithms built on the same adjacency-list traversal machinery developed here. The representations, the queue-versus-stack distinction, and the edge classification from this chapter are the foundation every one of those heavier algorithms assumes you already have.
`
};
