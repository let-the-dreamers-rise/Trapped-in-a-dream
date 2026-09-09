// Textbook chapter: Graph Theory (the discrete-mathematics side — degree
// sequences, Euler/Hamiltonian graphs, planarity, colouring, connectivity,
// matchings, spanning-tree counting). Representations, traversal algorithms
// (BFS/DFS) and shortest-path/MST algorithms belong to pds-graphs-rep and
// algo-graph respectively; this chapter recaps only the vocabulary those
// chapters also use, and does not re-teach traversal mechanics.
// Written directly (no subagent) to match the depth and voice of the other
// chapters in data/chapters/.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['engmath-graph-theory'] = {
  figs: [
    {
      id: 'euler-vs-hamilton',
      caption: 'An Euler circuit uses every EDGE exactly once (it may revisit vertices); a Hamiltonian circuit visits every VERTEX exactly once (it may skip edges). The two conditions are unrelated in general — a graph can have one, both, or neither.',
      svg: '<svg viewBox="0 0 380 170" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" fill="currentColor" text-anchor="middle"><text x="95" y="14">Euler circuit (edges)</text><text x="285" y="14">Hamiltonian circuit (vertices)</text></g><g stroke="currentColor" stroke-width="1.4" fill="none"><circle cx="50" cy="60" r="4" fill="currentColor"/><circle cx="95" cy="35" r="4" fill="currentColor"/><circle cx="140" cy="60" r="4" fill="currentColor"/><circle cx="95" cy="90" r="4" fill="currentColor"/><line x1="50" y1="60" x2="95" y2="35"/><line x1="95" y1="35" x2="140" y2="60"/><line x1="140" y1="60" x2="95" y2="90"/><line x1="95" y1="90" x2="50" y2="60"/><line x1="50" y1="60" x2="140" y2="60"/><circle cx="240" cy="60" r="4" fill="currentColor"/><circle cx="285" cy="35" r="4" fill="currentColor"/><circle cx="330" cy="60" r="4" fill="currentColor"/><circle cx="285" cy="90" r="4" fill="currentColor"/><line x1="240" y1="60" x2="285" y2="35"/><line x1="285" y1="35" x2="330" y2="60"/><line x1="330" y1="60" x2="285" y2="90"/><line x1="285" y1="90" x2="240" y2="60"/></g><g font-size="9" fill="currentColor" opacity=".8" text-anchor="middle"><text x="95" y="140">uses the diagonal edge too —</text><text x="95" y="152">every edge, once each</text><text x="285" y="140">skips the diagonal —</text><text x="285" y="152">every vertex, once each</text></g></svg>'
    },
    {
      id: 'planar-euler-formula',
      caption: "A planar embedding of K4: 4 vertices, 6 edges, 4 faces (3 inner triangles plus the unbounded outer face). Check Euler's formula: V − E + F = 4 − 6 + 4 = 2.",
      svg: '<svg viewBox="0 0 260 220" width="100%" style="max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.4" fill="none"><circle cx="130" cy="30" r="4" fill="currentColor"/><circle cx="40" cy="180" r="4" fill="currentColor"/><circle cx="220" cy="180" r="4" fill="currentColor"/><circle cx="130" cy="130" r="4" fill="currentColor"/><line x1="130" y1="30" x2="40" y2="180"/><line x1="130" y1="30" x2="220" y2="180"/><line x1="40" y1="180" x2="220" y2="180"/><line x1="130" y1="30" x2="130" y2="130"/><line x1="40" y1="180" x2="130" y2="130"/><line x1="220" y1="180" x2="130" y2="130"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="130" y="105">f1</text><text x="85" y="160">f2</text><text x="175" y="160">f3</text><text x="130" y="10">f4 = outer face</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

The graph representations chapter introduced vertices, edges and the vocabulary needed to program with graphs — adjacency lists, BFS, DFS, degree. This chapter takes the same objects and asks purely STRUCTURAL questions about them: can this exact degree sequence even belong to a real graph, can a graph be drawn on paper with no edges crossing, can a route be found that uses every road exactly once, how many distinct spanning trees does a complete graph have. These questions do not need an algorithm to run — they are settled by counting arguments and existence proofs, and GATE tests them as standalone combinatorial facts, independent of any traversal.

DEGREE SEQUENCES AND WHEN THEY ARE REALISABLE

The DEGREE SEQUENCE of a graph is the list of all its vertices' degrees, conventionally written in non-increasing order. Not every list of numbers is the degree sequence of SOME simple graph — a list that cannot be realised by any simple graph is called NOT GRAPHICAL.

The HANDSHAKE LEMMA (already proved in the graph representations chapter, restated here because every graphicality check depends on it) says Σ(all degrees) = 2|E|, since each edge contributes exactly 1 to each of its two endpoints' degree counts. Two immediate consequences: the SUM of any valid degree sequence must be even (an odd sum could never equal 2|E| for any integer |E|), and the NUMBER OF ODD-DEGREE VERTICES in any graph is always even (if it were odd, the sum of the odd-degree vertices' degrees, each odd, would itself be odd when combined with the even-degree vertices' contributions — an odd number of odd numbers sums to odd — making the whole sum odd, contradicting the lemma).

These two necessary conditions (even sum; even count of odd-degree vertices — note these are really the same fact stated two ways) rule out some sequences immediately, but they are NOT sufficient on their own — passing them does not guarantee the sequence is graphical.

The ERDŐS–GALLAI THEOREM gives the full sufficient-and-necessary test. A non-increasing sequence d₁ ≥ d₂ ≥ ... ≥ dₙ is graphical if and only if its sum is even AND, for every k from 1 to n:

Σ(i=1 to k) dᵢ ≤ k(k−1) + Σ(i=k+1 to n) min(dᵢ, k)

The left side is the total degree "demand" of the k highest-degree vertices. The right side is the maximum degree they could possibly supply among themselves (each of the k vertices can connect to at most k−1 others within the group, giving k(k−1) total degree from internal edges) plus what the remaining n−k vertices can each contribute to them (each outside vertex can supply at most min(dᵢ, k) edges into the top-k group, capped both by its own degree and by there only being k top vertices to connect to). If the demand ever exceeds the supply for any k, the sequence cannot be realised.

Check the sequence (4, 4, 3, 3, 2, 2) on 6 vertices. Sum = 4+4+3+3+2+2 = 18, even — passes the first test. Check k=1: left side d₁=4; right side 1(0) + min(4,1)+min(3,1)+min(3,1)+min(2,1)+min(2,1) = 0+1+1+1+1+1 = 5. 4≤5, passes. Check k=2: left side 4+4=8; right side 2(1) + min(3,2)+min(3,2)+min(2,2)+min(2,2) = 2+2+2+2+2 = 10. 8≤10, passes. Check k=3: left side 4+4+3=11; right side 3(2) + min(3,3)+min(2,3)+min(2,3) = 6+3+2+2 = 13. 11≤13, passes. (Continuing through k=4,5,6 would also pass, and k=n always passes trivially since it reduces exactly to the handshake-lemma sum condition already checked.) This sequence IS graphical.

GATE TRAP: A sequence can pass the "even sum" check and still fail to be graphical — that check alone is NECESSARY but never SUFFICIENT. The classic failing example is (3, 3, 3, 1): sum = 10, even, passing the first test cleanly. But check k=1 in Erdős–Gallai: left side 3; right side 1(0) + min(3,1)+min(3,1)+min(1,1) = 0+1+1+1 = 3. That passes too (3≤3) — so try k=3 instead: left side 3+3+3=9; right side 3(2) + min(1,3) = 6+1 = 7. 9 > 7, FAILS. This sequence is not graphical, and only the full Erdős–Gallai check (not the sum check alone) catches it. A quicker way to see the same failure by hand for small cases: three vertices of degree 3 in a 4-vertex simple graph would each need to connect to ALL 3 other vertices, forcing all three of them to connect to the 4th vertex, which would then need degree at least 3 too, not the stated 1.

EDGE COUNT FROM A DEGREE SEQUENCE. Given a valid degree sequence, the number of edges follows immediately from the handshake lemma: |E| = (Σ degrees)/2. For (1, 2, 2, 3, 4): sum = 1+2+2+3+4 = 12, so |E| = 6.

KEY: Every question in this section reduces to one of two moves — either sum the degrees and halve for the edge count, or check the sum's parity (and, when a full proof is demanded, run Erdős–Gallai) to decide realisability. There is no third technique needed for degree-sequence questions; the temptation to try constructing the graph explicitly by trial and error is almost always slower than these two direct checks.

COUNTING ALL SIMPLE LABELLED GRAPHS ON n VERTICES. A simple graph on n LABELLED vertices is completely determined by which of the C(n,2) possible vertex-pairs are chosen as edges — each pair is independently either an edge or not, giving 2^C(n,2) = 2^(n(n−1)/2) distinct labelled simple graphs on n vertices (including the empty graph with no edges at all, and the complete graph Kₙ with every possible edge). For n=4: C(4,2)=6, so there are 2⁶=64 distinct simple labelled graphs on 4 vertices.

GATE TRAP: This count is of LABELLED graphs — the 64 graphs on 4 vertices are counted as distinct even when two of them have IDENTICAL shape but differ only in which labelled vertex plays which role (exactly the same labelled-vs-unlabelled distinction already flagged for Cayley's formula below). The number of structurally distinct (unlabelled, "up to isomorphism") simple graphs on 4 vertices is a much smaller number — 11 — found by grouping the 64 labelled graphs into isomorphism classes; GATE occasionally asks for one count and occasionally the other, so read the question carefully for the word "labelled" or "up to isomorphism" before answering.

TREES

A TREE is a connected, acyclic graph. The graph representations chapter already proved, by induction, that a tree on n vertices has exactly n−1 edges — restated here because trees are the backbone of the spanning-tree material below. A tree with 15 vertices therefore has exactly 14 edges; a tree with 20 vertices has exactly 19 edges.

A LEAF is a vertex of degree 1. Every tree with at least 2 vertices has at least 2 leaves (a fact provable by considering the longest path in the tree — both of its endpoints must be leaves, since if either had a further neighbour outside the path, the path could be extended, contradicting it being longest).

Given a tree's non-leaf degree information, the number of leaves can be computed directly from the handshake lemma. A tree has 2 vertices of degree 3, 1 vertex of degree 2, and all remaining vertices are leaves (degree 1); how many leaves, and how many total vertices, if this is known to be a tree with these three groups only?

1. Let L be the number of leaves. Total vertices n = 2 + 1 + L = L + 3.
2. Since it is a tree, |E| = n − 1 = L + 2.
3. Sum of degrees = 2|E| = 2(L+2) = 2L+4.
4. Sum of degrees also equals (2×3) + (1×2) + (L×1) = 6+2+L = L+8, adding up the three groups directly.
5. Set the two expressions for the degree sum equal: 2L+4 = L+8, giving L=4.
6. Total vertices: n = L+3 = 7.

Verify: degree sequence is (3,3,2,1,1,1,1), sum=12, |E|=6=n−1=7−1 ✓.

EULERIAN GRAPHS

An EULER CIRCUIT is a closed walk that uses EVERY EDGE of the graph exactly once, starting and ending at the same vertex (it may revisit VERTICES freely — only edges may not repeat). An EULER PATH is the open version: uses every edge exactly once, but may start and end at different vertices.

[[FIG:euler-vs-hamilton]]

THEOREM (Euler circuit existence): A connected graph has an Euler circuit if and only if every vertex has even degree.

Derive the "only if" (necessary) direction: every time the circuit passes THROUGH a vertex (not counting the start/end visit), it uses one edge to arrive and a different edge to leave — consuming the vertex's edges in pairs. Since every edge at every vertex is eventually used exactly once by the full circuit, and each "pass-through" visit consumes edges two at a time, every vertex's degree must be even for its edges to be fully paired off with no edge left over. (The "if" direction — that even degree everywhere is also sufficient — is proved constructively, by an algorithm that stitches together edge-disjoint cycles at shared vertices; taken as given at this level.)

THEOREM (Euler path existence): A connected graph has an Euler path (but not necessarily a circuit) if and only if EXACTLY TWO vertices have odd degree (and it must start at one of them and end at the other) — or, as the boundary case, zero vertices have odd degree, which is exactly the Euler CIRCUIT condition again (a circuit is technically also a valid, though closed, Euler path).

GATE TRAP: "Exactly two odd-degree vertices" and "zero odd-degree vertices" are the ONLY two possibilities for a graph to have an Euler path at all — by the handshake lemma's corollary that the number of odd-degree vertices is always even, a graph can never have exactly one, or exactly three, odd-degree vertices; a question offering "exactly 1" or "exactly 3" as a possible answer for when an Euler path exists is offering an impossible degree-parity count, not a genuine alternative case.

HAMILTONIAN GRAPHS

A HAMILTONIAN CIRCUIT is a closed walk that visits EVERY VERTEX exactly once (returning to the start), using whichever edges happen to connect consecutive vertices on the tour — it need not use every edge, and may skip many of them entirely. A HAMILTONIAN PATH is the open version.

Euler and Hamiltonian conditions are about entirely different things (edges versus vertices) and are LOGICALLY INDEPENDENT — a graph can have an Euler circuit but no Hamiltonian circuit, a Hamiltonian circuit but no Euler circuit, both, or neither, with no implication running in either direction.

Unlike the clean if-and-only-if characterisation available for Euler circuits, there is NO known simple necessary-and-sufficient condition for Hamiltonicity — determining whether an arbitrary graph has a Hamiltonian circuit is, in fact, NP-complete in general (a fact belonging properly to the theory of computation and algorithms chapters, mentioned here only for context). What GATE tests instead are sufficient (but not necessary) conditions that GUARANTEE a Hamiltonian circuit exists, the most common being DIRAC'S THEOREM: if every vertex of a simple graph on n≥3 vertices has degree at least n/2, then the graph is guaranteed to have a Hamiltonian circuit.

GATE TRAP: Dirac's theorem is a SUFFICIENT condition only, never a necessary one — a graph can fail the "every vertex has degree ≥ n/2" test and still perfectly well have a Hamiltonian circuit (a simple cycle graph Cₙ, where every vertex has degree exactly 2, has an obvious Hamiltonian circuit — the cycle itself — yet fails Dirac's bound for any n>4, since 2 < n/2 once n exceeds 4). Never conclude "no Hamiltonian circuit exists" merely because a graph fails Dirac's condition; the theorem only ever lets you conclude existence, never non-existence.

STATEMENTS ABOUT EULERIAN VS HAMILTONIAN — DISTINGUISHED PRECISELY: "Eulerian" is about EDGES (uses every edge once), has a clean even-degree characterisation, and is checkable in linear time. "Hamiltonian" is about VERTICES (visits every vertex once), has no known simple characterisation, and is NP-complete to decide in general. A question describing a "circuit using every edge" is asking about Euler; a question describing a "tour visiting every city" (the language of the travelling salesman problem) is asking about Hamilton.

PLANAR GRAPHS AND EULER'S FORMULA

A graph is PLANAR if it can be drawn in the plane with no two edges crossing (except at shared endpoints). Such a drawing is a PLANAR EMBEDDING, and it divides the plane into regions called FACES, including exactly one UNBOUNDED (outer) face that always counts as one of the faces.

EULER'S FORMULA for any connected planar embedding: V − E + F = 2, where V is the vertex count, E the edge count, and F the face count (including the outer face).

[[FIG:planar-euler-formula]]

Verify on K4 drawn planar: V=4, E=6 (every pair of 4 vertices connected, C(4,2)=6), and the drawing shown has F=4 faces (three inner triangular faces plus the outer face). Check: 4−6+4=2 ✓.

Use Euler's formula to answer "given V and E for a planar graph, how many faces": a connected simple planar graph has 8 vertices and 12 edges — by Euler's formula, F = 2 − V + E = 2 − 8 + 12 = 6 faces.

MAXIMUM EDGES IN A SIMPLE PLANAR GRAPH is derived from Euler's formula plus one extra observation: in a simple graph (n≥3), every face is bounded by AT least 3 edges (a face bounded by fewer than 3 edges would require a multi-edge or a self-loop, both excluded from simple graphs), and each edge borders exactly 2 faces (one on either side), so counting (face, bounding-edge) incidences two ways gives 3F ≤ 2E, i.e. F ≤ 2E/3. Substitute into Euler's formula: V − E + F = 2 becomes V − E + (at most 2E/3) ≥ 2 is the wrong direction — substitute correctly: since F ≤ 2E/3, and V−E+F=2 exactly (not an inequality — Euler's formula is an equality for any valid connected planar embedding), we get V−E+2 ≤ ... rearrange from F=2−V+E combined with F≤2E/3: 2−V+E ≤ 2E/3, so 2−V ≤ 2E/3 − E = −E/3, so V−2 ≥ E/3, giving E ≤ 3(V−2) = 3V−6.

E ≤ 3V − 6 (maximum edges, simple connected planar graph, V≥3)

For V=10: E ≤ 3(10)−6 = 24. A simple connected planar graph on 10 vertices can have AT most 24 edges.

FOR BIPARTITE PLANAR GRAPHS specifically, the bound tightens further, because a bipartite graph has NO ODD CYCLES at all, so every face must be bounded by AT least 4 edges (not just 3, since a 3-cycle — a triangle — is itself an odd cycle and cannot appear in a bipartite graph). Redo the counting argument with the bound 4F ≤ 2E instead of 3F ≤ 2E: F ≤ E/2, and substituting into V−E+F=2 the same way gives:

E ≤ 2V − 4 (maximum edges, simple connected BIPARTITE planar graph, V≥3)

For a bipartite planar graph on 12 vertices: E ≤ 2(12)−4 = 20.

KEY: The two edge bounds, 3V−6 for general simple planar graphs and 2V−4 for bipartite planar graphs, come from the identical Euler's-formula argument, differing only in the minimum face-boundary length used (3 edges per face in general, 4 edges per face when triangles are forbidden by bipartiteness). Re-deriving which minimum applies, rather than memorising two disconnected formulas, avoids mixing them up under pressure.

The NON-PLANARITY OF K5 AND K3,3. K5 (5 vertices, every pair connected, so E=10) VIOLATES the E≤3V−6 bound directly: 3(5)−6=9, but K5 has 10 edges, exceeding 9 — so K5 cannot be planar. K3,3 (the complete bipartite graph on parts of size 3 and 3, E=9) is bipartite, so it must satisfy the tighter bound E≤2V−4: 2(6)−4=8, but K3,3 has 9 edges, exceeding 8 — so K3,3 cannot be planar either. (Kuratowski's theorem, stated for recognition, says these two graphs are in fact the fundamental obstruction to planarity: a graph is non-planar if and only if it contains a subdivision of K5 or K3,3 as a subgraph — the two edge-counting arguments just given prove the "these two specific graphs are non-planar" half directly, without needing the full theorem.)

GRAPH COLOURING AND THE CHROMATIC NUMBER

A PROPER COLOURING assigns a colour to every vertex such that no two ADJACENT vertices share a colour. The CHROMATIC NUMBER χ(G) is the minimum number of colours needed for a proper colouring.

χ(Kₙ) = n: in a complete graph, every pair of vertices is adjacent, so every vertex needs a colour distinct from every other vertex's colour — forcing all n colours to be different, and clearly n colours suffice (just give each vertex its own colour). χ(K6 minus one edge): removing a single edge from K6 means exactly one pair of vertices is no longer adjacent, so those two (and only those two) can now safely SHARE a colour — every other pair remains adjacent and must still differ. This allows one fewer colour than the full K6 would need: χ(K6 − e) = 5.

χ(Cₙ) (cycle graphs) depends on PARITY: for even n, χ(Cₙ)=2 (alternate two colours around the even-length cycle, and the alternation closes up consistently since the cycle has an even number of steps back to the start). For ODD n, χ(Cₙ)=3 (attempting the same 2-colour alternation around an odd cycle forces the last vertex to match the colour of its neighbour on one side, since the odd count breaks the alternation pattern exactly at closure — a third colour is needed to patch that one clash). χ(C5)=3 (5 is odd) and χ(C7)=3 (7 is odd) — both odd cycles need exactly 3 colours, never more, since the alternation-plus-one-patch scheme always resolves with exactly 3.

χ(bipartite graph) = 2 for ANY connected bipartite graph with at least one edge, by the very definition of bipartite: the two parts of the bipartition are themselves the two colour classes, since every edge runs between the two parts and never within one, so no two same-part (same-colour) vertices are ever adjacent. This includes complete bipartite graphs: χ(K_{3,5}) = 2.

REMEMBER: χ(G)=2 for a graph with at least one edge if and only if G is bipartite — this is not a coincidence limited to complete bipartite graphs, it is the exact defining characterisation of "2-colourable," and it is also equivalent to "G has no odd cycle" (a fact worth connecting directly to the odd-cycle chromatic-number-3 result above: an odd cycle is the smallest possible obstruction to 2-colourability, and it is present as a subgraph in every non-bipartite graph).

BIPARTITE GRAPHS: RECOGNITION AND THE STANDARD FALSE STATEMENTS

A graph is BIPARTITE if its vertices can be split into two groups such that every edge runs between the groups, never within one. Equivalent characterisations, all provable from one another: (a) 2-colourable, (b) contains no odd-length cycle, (c) the BFS/DFS 2-colouring test (from the graph representations chapter) never finds a same-colour edge.

Any graph containing an ODD CYCLE as a subgraph — including a triangle (a 3-cycle, the shortest possible odd cycle) — is DEFINITELY NOT bipartite: a single triangle already needs 3 colours by the odd-cycle argument above, immediately violating the 2-colour requirement.

GATE TRAP: A common false statement offered as a distractor is "every planar graph is bipartite" or its reverse "every bipartite graph is planar" — NEITHER implication holds in general. K4 is planar (drawable with no crossings, shown above) but NOT bipartite (it contains triangles, being complete on 4 vertices). K3,3 is bipartite by construction (two parts of size 3, all cross edges) but NOT planar (proved by the edge-count violation above). Planarity is about drawability without crossings; bipartiteness is about the absence of odd cycles; the two properties are logically independent, and having one says nothing about the other.

COMPLEMENT GRAPHS AND SELF-COMPLEMENTARY GRAPHS

The COMPLEMENT of a simple graph G, written Ḡ, has the same vertex set as G, with an edge between u and v in Ḡ exactly when there is NO edge between u and v in G. Since every pair of vertices is either an edge or a non-edge in G, |E(G)| + |E(Ḡ)| = C(n,2) — the total number of possible pairs on n vertices — always.

A graph is SELF-COMPLEMENTARY if G is isomorphic to its own complement Ḡ. Since a self-complementary graph must have |E(G)| = |E(Ḡ)| (they are isomorphic, hence have the same edge count), and |E(G)|+|E(Ḡ)|=C(n,2), a self-complementary graph must have |E(G)| = C(n,2)/2 — which requires C(n,2) to be even. C(n,2) = n(n−1)/2; this is an integer always, but for it to additionally be even, n(n−1)/2 must be divisible by 2, i.e. n(n−1) must be divisible by 4. Checking n mod 4: if n≡0 (mod 4), n(n−1) has n divisible by 4, so the product is divisible by 4. If n≡1 (mod 4), n−1 is divisible by 4, same conclusion. If n≡2 (mod 4), n=4k+2 and n−1=4k+1 (odd) — n(n−1) = (4k+2)(4k+1), and 4k+2=2(2k+1) contributes only a single factor of 2, giving n(n−1) divisible by 2 but not necessarily 4. If n≡3 (mod 4), similarly only a single factor of 2 is guaranteed. So self-complementary simple graphs can exist only when n ≡ 0 or 1 (mod 4) — this is a necessary condition (it is also known to be sufficient — such graphs do exist for every n≡0 or 1 mod 4 — but proving sufficiency requires an explicit construction, taken as given here).

REGULAR GRAPHS: k-REGULAR GRAPHS, THE WHEEL GRAPH, AND THE PETERSEN GRAPH

A graph is k-REGULAR if every single vertex has degree exactly k — no exceptions, no vertex allowed to differ. Since the sum of all degrees is 2|E| (the handshake lemma proved earlier), a k-regular graph on n vertices has sum-of-degrees = nk, so |E| = nk/2. This is a direct, one-line consequence of the handshake lemma applied to the special case where every degree is the same number — it is worth deriving on the spot rather than memorising as a separate formula, since it is exactly the general edge-count-from-degree-sequence idea from earlier in this chapter, specialised to a constant sequence.

KEY: For |E| = nk/2 to come out as a whole number, nk must be EVEN. If k is odd, this forces n to be even — an ODD-regular graph can only exist on an EVEN number of vertices (e.g. a 3-regular graph needs an even vertex count: the Petersen graph below is 3-regular on 10 vertices, and no 3-regular simple graph exists on, say, 7 vertices). If k is even, n can be anything, since nk is automatically even regardless of n's parity.

Familiar regular graphs already met in this chapter: Kₙ is (n−1)-regular (every vertex is adjacent to all n−1 others), giving |E| = n(n−1)/2 = C(n,2), matching the earlier direct count. Cₙ (the n-cycle) is 2-regular for every n≥3 (each vertex has exactly two neighbours along the cycle), giving |E| = 2n/2 = n edges, matching the obvious count of one edge per cycle step. K_{n,n} is n-regular (each vertex on one side connects to all n vertices on the other side); it has 2n vertices total and n·n/2·... — computed directly, each of the 2n vertices has degree n, so the total degree sum is 2n·n, giving |E| = 2n·n/2 = n². This matches the direct count of a complete bipartite graph (every one of the n vertices on one side paired with every one of the n vertices on the other side gives exactly n² edges), and it holds for every n with no parity restriction, since the vertex count 2n is automatically even regardless of whether n itself is odd or even — the odd-k-needs-even-n rule above concerns the DEGREE's parity against the VERTEX COUNT's parity, and here the vertex count is doubled by construction.

THE WHEEL GRAPH W_n consists of a CYCLE on n vertices (called the RIM) plus one additional HUB vertex connected to every rim vertex (n additional "spoke" edges). So W_n has n+1 vertices total and n (rim) + n (spokes) = 2n edges. W_n is NOT regular in general: each of the n rim vertices has degree 3 (two rim neighbours plus one spoke to the hub), while the hub itself has degree n (one spoke to every rim vertex) — the hub's degree grows with n while every rim vertex stays fixed at degree 3, so W_n is regular only in the special case n=3 (giving a 3-regular graph on 4 vertices — which is exactly K4, since a 3-cycle plus a hub joined to all three vertices is precisely the complete graph on 4 vertices).

Worked example — W7 (the wheel explicitly named in the question bank: "a 7-cycle rim plus one central hub connected to all 7 rim vertices"): W7 has n=7, so 7+1=8 vertices total and 2(7)=14 edges. Each rim vertex has degree 3; the hub has degree 7. Sum of degrees = 7(3)+7 = 21+7 = 28 = 2(14), confirming the edge count via the handshake lemma independently. W7 IS Hamiltonian (the rim cycle itself is already a Hamiltonian cycle using only rim edges, entirely ignoring the hub and spokes). Checking whether W7 is Eulerian: every one of its 7 rim vertices has degree 3 (odd) and the hub has degree 7 (also odd), so all 8 vertices of W7 have odd degree — 8 odd-degree vertices total, an even count as the handshake lemma always requires, but since an Eulerian circuit needs zero odd-degree vertices and an Eulerian path allows AT most two, W7 has neither.

GATE TRAP: Whether a wheel graph W_n has an Eulerian path or circuit is NOT something to re-derive by drawing a picture — it follows directly and always from the rim-degree argument: every rim vertex has degree exactly 3 (two rim edges plus one spoke) no matter what n is, so W_n always has at least n odd-degree vertices from the rim alone. Since n≥3 for any wheel graph, this is already more than the two-odd-vertex ceiling an Eulerian path permits, so NO wheel graph W_n, for any n≥3, is ever Eulerian in either sense (no circuit, no path) — this is worth having memorised outright as "wheel graphs are never Eulerian," a direct structural consequence of the fixed degree-3 rim, rather than a fact to re-check case by case.

THE PETERSEN GRAPH: a single, specific, extremely frequently examined graph — 10 vertices, 15 edges, and 3-REGULAR (every vertex has degree exactly 3, consistent with |E|=nk/2=10·3/2=15). It is most easily pictured as an outer 5-cycle and an inner 5-pointed "pentagram" (a 5-cycle traversed by skipping one vertex each step, i.e. connecting inner vertex i to inner vertex i+2 mod 5), with each outer vertex additionally joined by a spoke to the corresponding inner vertex — 5 outer-cycle edges + 5 inner-pentagram edges + 5 spokes = 15 edges exactly, matching the regular-graph edge count derived above.

The Petersen graph is the standard textbook source of "small graph, surprising properties" GATE questions, and every one of the following facts is worth holding as a fixed, memorised fact rather than something to re-derive from a picture under time pressure:

KEY: The Petersen graph is 3-regular (10 vertices, 15 edges), NON-PLANAR (it requires a subdivision of K5 or K3,3 as a subgraph, per Kuratowski's theorem mentioned above — it is one of the two smallest, most famous non-planar graphs used as a teaching example alongside K5 and K3,3 themselves), has CHROMATIC NUMBER 3 (it contains odd 5-cycles, ruling out 2-colouring, and 3 colours suffice by explicit construction), has GIRTH 5 (the length of its shortest cycle is 5 — there is no triangle and no 4-cycle anywhere in it, part of what makes it such a useful extremal example), and is NOT Hamiltonian (it has no cycle visiting all 10 vertices, despite being connected and 3-regular — famously the smallest 3-connected, 3-regular, non-Hamiltonian graph, making it the standard counterexample whenever a question implies "high connectivity plus regularity should guarantee a Hamiltonian cycle").

GATE TRAP: It is tempting to assume that a "nice," highly symmetric, connected, regular graph like the Petersen graph must be Hamiltonian — after all, Dirac's theorem earlier showed that high minimum degree relative to n tends to guarantee Hamiltonicity. But Dirac's threshold needs minimum degree at least n/2, and the Petersen graph's degree is only 3 against n=10 (3 < 5 = n/2), so Dirac's theorem simply does not apply here — it says nothing at all about whether the Petersen graph is Hamiltonian, and in fact it is NOT. This is a clean illustration of exactly the sufficiency-not-necessity trap flagged earlier: failing a sufficient condition proves nothing either way, and the Petersen graph happens to fail to be Hamiltonian for reasons the theorem was never equipped to detect.

GRAPH ISOMORPHISM

Two graphs G and H are ISOMORPHIC if there is a bijection between their vertex sets that preserves adjacency exactly: u and v are adjacent in G if and only if their images are adjacent in H. Isomorphic graphs are, structurally, "the same graph" drawn or labelled differently — every purely structural property of one (degree sequence, number of cycles, planarity, chromatic number, connectivity) is shared exactly by the other.

Checking two graphs are isomorphic in general requires exhibiting an actual bijection and verifying it preserves every edge — there is no shortcut, and no known efficient general algorithm is guaranteed fast for all graphs (graph isomorphism is a famous problem whose exact computational difficulty is still not fully settled, though it is known to be no harder than a certain intermediate class between polynomial-time and NP-complete problems). Proving two graphs are NOT isomorphic, however, is often fast: exhibit one invariant (a property any isomorphism must preserve) that differs between them, exactly as was done for group isomorphism in the previous chapter.

The standard checklist of necessary (but individually not sufficient) invariants, in the order it is fastest to check them:

1. SAME NUMBER OF VERTICES. If |V(G)| ≠ |V(H)|, no bijection between the vertex sets can even exist.
2. SAME NUMBER OF EDGES. An isomorphism preserves adjacency exactly, so it preserves the total edge count.
3. SAME DEGREE SEQUENCE (sorted). Each vertex's degree must match its image's degree, so the multiset of all degrees, sorted, must be identical between the two graphs.
4. SAME NUMBER OF CONNECTED COMPONENTS, and matching component sizes.
5. SAME CYCLE STRUCTURE — in particular, the presence or absence of a cycle of each specific length must match (a triangle in one graph must correspond to a triangle in the other, under any valid isomorphism, since adjacency and hence "these three vertices form a cycle" is preserved).

GATE TRAP: Passing EVERY item on this checklist does NOT prove two graphs are isomorphic — it only fails to disprove it. Two graphs can have identical vertex counts, edge counts, and even identical degree sequences, while still not being isomorphic, if their edges are connected up in genuinely different patterns. The standard example: two graphs on 6 vertices, each with degree sequence (2,2,2,2,2,2) (every vertex degree 2), can differ structurally — one being a single 6-cycle (one big loop) and the other being two separate 3-cycles (two disjoint triangles). Both have V=6, E=6, and the identical degree sequence (2,2,2,2,2,2), yet they are NOT isomorphic: the 6-cycle is connected (one component) while the two-triangles graph has 2 components, violating checklist item 4 — which is exactly why checking the FULL list, not stopping after degree sequences match, matters.

CONNECTIVITY

A CUT VERTEX (or articulation point) is a vertex whose removal (along with all its incident edges) DISCONNECTS the graph, or increases its number of connected components. A CUT EDGE (or bridge) is the edge analogue: an edge whose removal disconnects the graph.

Three connectivity measures, related by a standard inequality: VERTEX CONNECTIVITY κ(G) is the minimum number of vertices that must be removed to disconnect G (or to reduce it to a single vertex, for a complete graph, which cannot otherwise be disconnected by removing vertices at all). EDGE CONNECTIVITY λ(G) is the minimum number of edges that must be removed to disconnect G. MINIMUM DEGREE δ(G) is the smallest degree among all vertices.

κ(G) ≤ λ(G) ≤ δ(G)

The right-hand inequality (λ≤δ) is easy to see directly: removing all δ(G) edges incident to the minimum-degree vertex isolates that vertex, disconnecting the graph using at most δ(G) edge removals, so the true minimum λ(G) can be no larger than this. The left-hand inequality (κ≤λ) is a genuine theorem (removing one endpoint from each of a minimum edge cut set gives a vertex cut of at most the same size, with a bit more care needed for the exact argument) taken as given at this level.

Evaluate all three for the cycle graph C6 (a single 6-cycle, every vertex degree 2): δ(C6)=2 (every vertex has degree exactly 2). Removing any one vertex from a cycle leaves a path — still connected — so κ(C6)>1; removing any two (non-adjacent, or even adjacent) vertices from a 6-cycle always disconnects it into pieces, so κ(C6)=2. Removing any one edge from a cycle leaves a path — still connected — so λ(C6)>1; removing any two edges disconnects it into two separate paths, so λ(C6)=2. Confirm the chain: κ=2 ≤ λ=2 ≤ δ=2 — all three equal here, which is typical of highly symmetric, "regular" graphs (every vertex the same degree), where the inequality often collapses to equality.

Now evaluate on a "star plus one extra edge" example to see the inequality become STRICT: take a star graph on 5 vertices (one centre C connected to 4 leaves) and add one extra edge directly between two of the leaves, say leaf A and leaf B. Degrees: centre has degree 4, leaves A and B now have degree 2 each (connected to the centre AND to each other), the other two leaves have degree 1 each. δ(G)=1 (the two untouched leaves). λ(G): removing the single edge from any degree-1 leaf to the centre disconnects that leaf — so λ(G)=1, matching δ exactly on this occasion. κ(G): removing the centre vertex C disconnects EVERYTHING (every leaf's only connection besides the A–B edge runs through C) — but does removing just one vertex always work? Removing leaf A alone does not disconnect the graph (B, the centre, and the other two leaves are all still connected through the centre) — so no single leaf removal disconnects it, but removing the centre C does, in one vertex removal — so κ(G)=1 too. This particular graph again gives κ=λ=δ=1, so try a graph specifically DESIGNED to separate them: take two disjoint triangles and join them by a single "bridge" edge connecting one vertex from each triangle. δ(G)=2 (every vertex has degree 2 within its own triangle, except the two bridge endpoints, which have degree 3). λ(G)=1 (removing the single bridge edge disconnects the two triangles completely). κ(G)=1 too, since removing either bridge endpoint vertex also disconnects the two triangles. Here κ=λ=1 while δ=2 — the inequality κ≤λ≤δ is STRICT on the right side (1≤1<2), showing a "weak link" (the bridge) can make a graph much easier to disconnect than its minimum degree alone would suggest.

GATE TRAP: A HIGH minimum degree δ(G) does NOT guarantee high connectivity — the bridge example just constructed has every vertex at least degree 2, yet a single edge removal disconnects the whole graph (λ=1). Minimum degree is only an UPPER BOUND on connectivity (κ,λ≤δ), never a guarantee of it; a graph can have every vertex highly connected LOCALLY while still having one fragile "bottleneck" edge or vertex that collapses the whole structure.

SPANNING TREES AND CAYLEY'S FORMULA

A SPANNING TREE of a connected graph G is a subgraph that includes every vertex of G, uses only edges from G, and is itself a tree (connected, acyclic) — necessarily using exactly n−1 edges, whatever G's own edge count happens to be.

CAYLEY'S FORMULA: the number of distinct LABELLED spanning trees of the complete graph Kₙ is nⁿ⁻². (The standard proof uses the Prüfer sequence — a bijection between labelled trees on n vertices and sequences of length n−2 drawn from n labels, giving nⁿ⁻² such sequences and therefore that many trees — taken as given at this level; the formula itself, and evaluating it, is what is directly tested.)

Compute the number of labelled spanning trees of K4: n=4, so nⁿ⁻² = 4² = 16.

GATE TRAP: Cayley's formula counts LABELLED spanning trees — trees where the vertices are distinguishable individuals (vertex 1, vertex 2, ...), so two spanning trees with the same tree SHAPE but a different assignment of labels to positions count as different trees. This is why K4 (only 4 vertices) already has 16 distinct spanning trees despite there being only 2 fundamentally different tree SHAPES on 4 unlabelled vertices (a path, and a "star" with one centre connected to the other three) — the 16 counts every distinct way of assigning the 4 labels onto those shapes, not the number of shapes itself.

PERFECT MATCHINGS

A MATCHING is a set of edges with no shared endpoints (no vertex touched by more than one chosen edge). A PERFECT MATCHING is a matching that covers every vertex — possible only when the graph has an even number of vertices (an odd number of vertices can never be perfectly paired off, by a simple parity argument: each matched edge accounts for exactly 2 vertices).

The number of perfect matchings in the complete bipartite graph K_{n,n} is n! — derive this directly: label one side's vertices 1 through n; a perfect matching pairs vertex 1 on that side with ANY of the n vertices on the other side (n choices), then vertex 2 with any of the REMAINING n−1 (since one is now taken), and so on down to the last vertex having only 1 choice left — giving n×(n−1)×...×1 = n! total perfect matchings.

For K_{3,3}: the number of perfect matchings is 3! = 6.

HALL'S MARRIAGE THEOREM answers, for a general (not necessarily complete) bipartite graph with parts X and Y, exactly when a matching exists that covers every vertex of X (a "complete matching from X into Y"): such a matching exists if and only if, for every subset S of X, the NEIGHBOURHOOD N(S) (the set of all vertices in Y adjacent to at least one vertex in S) satisfies |N(S)| ≥ |S| — informally, no group of vertices in X can collectively "demand" more distinct partners in Y than actually exist among their combined neighbours.

Why is the condition necessary (if a complete matching exists, the condition must hold)? If some subset S of X had |N(S)| < |S|, then the |S| vertices in S would need |S| distinct matching partners, but only |N(S)| < |S| candidates exist among all of S's combined neighbours in Y — by the PIGEONHOLE PRINCIPLE, at least two vertices of S would be forced to compete for too few partners, and no matching could cover all of them. (The reverse direction — that the condition is also sufficient — is a genuine theorem, proved by an augmenting-path argument; taken as given at this level.)

Apply Hall's theorem to detect a matching failure: X={x1,x2,x3}, Y={y1,y2,y3,y4}, with x1 adjacent to {y1}, x2 adjacent to {y1}, x3 adjacent to {y2,y3}. Take S={x1,x2}: N(S) = {y1} only (both x1 and x2 are adjacent only to y1), so |N(S)|=1 < |S|=2 — Hall's condition FAILS for this subset, so NO complete matching from X exists: x1 and x2 are both forced to compete for the single shared neighbour y1, and only one of them can actually be matched to it.

KÖNIG'S THEOREM connects matching to VERTEX COVER (a set of vertices touching every edge) in bipartite graphs specifically: in any bipartite graph, the MAXIMUM matching size equals the MINIMUM vertex cover size. (This equality is special to bipartite graphs — for general graphs, maximum matching and minimum vertex cover can differ, related instead only by the weaker inequality that a minimum vertex cover is always at least as large as a maximum matching, since each matched edge needs at least one of its two endpoints in any vertex cover.) König's theorem is what makes bipartite matching efficiently solvable, and it is the reason bipartite matching problems (job assignment, resource allocation) appear so often as GATE's worked example of a problem that is easy specifically because the underlying graph is bipartite.

WORKED PROBLEMS

1. GRAPHICALITY CHECK BY ERDŐS–GALLAI. Is the sequence (5,5,4,3,3,2,2,2) graphical? Sum = 5+5+4+3+3+2+2+2 = 26, even — passes. Check the tightest likely constraint, k=2: left side 5+5=10; right side 2(1) + min(4,2)+min(3,2)+min(3,2)+min(2,2)+min(2,2)+min(2,2) = 2+2+2+2+2+2+2 = 14. 10≤14, passes. Check k=1: left side 5; right side 1(0)+min(5,1)+min(4,1)+min(3,1)+min(3,1)+min(2,1)+min(2,1)+min(2,1) = 0+1+1+1+1+1+1+1=7. 5≤7, passes. A full check would run every k up to 8, but these two checks (plus the even-sum check) find no violation, and the sequence is in fact graphical.

2. EDGE COUNT FROM DEGREE SEQUENCE. A simple undirected graph has 6 vertices with degrees 3,3,3,3,2,2. How many edges? Sum = 3+3+3+3+2+2 = 16. |E| = 16/2 = 8.

3. EULER PATH/CIRCUIT DETERMINATION. A connected graph has exactly two vertices of odd degree, all others even. Does it have an Euler circuit, an Euler path, or neither? By the theorem, exactly two odd-degree vertices means an Euler PATH exists (starting at one odd-degree vertex and ending at the other), but NOT an Euler circuit (which strictly requires ALL vertices, with no exceptions, to have even degree).

4. FACES FROM EULER'S FORMULA. A connected, simple, planar graph has V=6 vertices and E=10 edges. How many faces? F = 2−V+E = 2−6+10 = 6.

5. MAXIMUM PLANAR EDGES, BOTH BOUNDS. For a simple connected planar graph on 10 vertices, general maximum edges: 3(10)−6=24. If it is additionally known to be BIPARTITE, the tighter bound applies: 2(10)−4=16 — nearly a third fewer edges permitted once triangles (and all other odd cycles) are forbidden.

6. NON-PLANARITY BY EDGE COUNT. Confirm K5 is non-planar using the edge bound. V=5, E=C(5,2)=10. Bound: 3(5)−6=9. Since 10>9, K5 violates the bound and cannot be planar — confirmed independently of invoking Kuratowski's theorem by name.

7. CHROMATIC NUMBER FAMILY. State χ(G) for: K6 (χ=6, complete graph needs one colour per vertex); C5 (χ=3, odd cycle); C8 (χ=2, even cycle); K_{4,4} (χ=2, bipartite); the Petersen graph (χ=3, a fact about this specific well-known graph, stated for recognition — it is 3-regular, non-planar, and famously requires 3 colours despite looking, at a glance, like it might need more given its irregular drawing).

8. LABELLED SPANNING TREE COUNT. Using Cayley's formula, how many labelled spanning trees does K5 have? n=5, so n^(n−2) = 5³ = 125.

9. WHEEL GRAPH EDGE AND DEGREE CHECK. For the wheel graph W10 (a 10-cycle rim plus one hub), how many vertices, how many edges, and what is the degree of the hub versus a rim vertex? Vertices: n+1 = 11. Edges: 2n = 20 (10 rim edges plus 10 spokes). Hub degree: n = 10 (one spoke to every rim vertex). Rim-vertex degree: 3 (two rim neighbours plus one spoke), for every one of the 10 rim vertices. Sanity check via the handshake lemma: sum of degrees = 10(3) + 10 = 40 = 2(20), matching the edge count exactly. Since W10 has n=10 (even), checking Eulerian status: all 10 rim vertices have odd degree 3, and the hub has even degree 10 — that is already 10 odd-degree vertices, far exceeding the two-vertex ceiling for an Euler path, so W10 (like every wheel graph with n≥3) has neither an Euler circuit nor an Euler path, exactly as the GATE TRAP above predicts regardless of whether n itself is even or odd.

CLOSING: HOW THIS CHAPTER'S THEOREMS COMBINE UNDER TIME PRESSURE

The single most valuable exam habit this chapter builds is treating every "does such a graph exist" or "is this graph X" question as a sequence of cheap necessary-condition checks, run in increasing order of effort, before attempting any full construction or exhaustive search. A concrete worked sequence, pulling together tools from across this entire chapter on one example: asked whether a simple graph with degree sequence (4,4,4,4,4) on 5 vertices can be planar and bipartite simultaneously, the fastest path is NOT to attempt to draw it. First, the even-sum check for graphicality: sum = 20, even, passes (and in fact this sequence is exactly K5's degree sequence, which is graphical trivially since K5 exists). Second, is it planar? Edge count from the sequence is 20/2=10, compare against the bound 3(5)−6=9; since 10>9, this graph is NOT planar — the question is already answered without checking bipartiteness at all, since a graph failing to be planar cannot simultaneously be "planar and bipartite." This is the same discipline as the K5/K3,3 non-planarity worked problems above: reach for the cheapest applicable bound (edge-count violation) before reaching for the more elaborate tool (Kuratowski subdivisions, explicit embeddings, or brute-force adjacency checking).

The same layered-cheap-checks-first habit applies directly to the regular-graph material just covered: before attempting to construct or draw a claimed k-regular graph on n vertices, check the single-line parity condition first (nk must be even, and if k is odd this forces n even) — a claimed 3-regular graph on 7 vertices can be dismissed in one line (3×7=21, odd, impossible) without ever attempting a construction. This mirrors exactly the graphicality-by-Erdős–Gallai discipline from the start of the chapter: cheap necessary conditions (sum parity, then the k-tightest inequalities) are checked before anything else, and a single failed cheap check ends the question immediately. Carrying this "cheapest sufficient disqualifier first" habit forward is worth more, under real exam time pressure, than any single theorem in isolation — degree-sequence checks, edge-count bounds, and regularity-parity checks are all instances of the same underlying strategy: find the fastest arithmetic fact that a graph with the claimed structure would have to satisfy, and test that fact before attempting anything harder.
`
};
