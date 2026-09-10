// Textbook chapter: Sets, Relations, Functions and Lattices.
//
// Full teaching text — written to be learned from directly, in book order, with
// every claim derived or demonstrated. Format is the plain-text convention
// renderTheory() understands: ALL-CAPS lines are section headings, "• " starts a
// bullet, "1. " a numbered step, "KEY:" and "GATE TRAP:" make callout cards, a
// lone equation becomes a formula block, and [[FIG:id]] places a figure.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['engmath-sets-relations'] = {
  figs: [
    {
      id: 'venn-3set',
      caption: 'Three overlapping sets with all eight regions. Inclusion–exclusion is just adding every region the right number of times.',
      svg: '<svg viewBox="0 0 360 260" width="100%" style="max-width:400px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.4" fill="none" opacity=".9"><circle cx="150" cy="110" r="80"/><circle cx="230" cy="110" r="80"/><circle cx="190" cy="180" r="80"/></g><g font-size="12" fill="currentColor"><text x="95" y="70">A</text><text x="270" y="70">B</text><text x="190" y="245" text-anchor="middle">C</text><text x="115" y="105">only A</text><text x="245" y="105">only B</text><text x="180" y="205">only C</text><text x="180" y="70" text-anchor="middle">A∩B</text><text x="130" y="165">A∩C</text><text x="235" y="165">B∩C</text><text x="188" y="130" text-anchor="middle" font-size="10">A∩B∩C</text></g></svg>'
    },
    {
      id: 'matrix-digraph',
      caption: 'The same relation drawn as a digraph and as a 0/1 matrix. A loop is a diagonal 1; an edge each way is a symmetric pair of 1s.',
      svg: '<svg viewBox="0 0 400 200" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-md1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.4" fill="none"><circle cx="50" cy="40" r="14"/><circle cx="150" cy="40" r="14"/><circle cx="100" cy="130" r="14"/><path d="M62,34 A20,20 0 1 1 62,46" marker-end="url(#ah-md1)"/><line x1="64" y1="40" x2="136" y2="40" marker-end="url(#ah-md1)"/><line x1="140" y1="52" x2="110" y2="118" marker-end="url(#ah-md1)"/><line x1="90" y1="118" x2="60" y2="52" marker-end="url(#ah-md1)"/></g><g font-size="11" fill="currentColor"><text x="46" y="44">1</text><text x="146" y="44">2</text><text x="96" y="134">3</text></g><g font-size="11" fill="currentColor"><text x="230" y="30">R</text><text x="260" y="45">1</text><text x="290" y="45">2</text><text x="320" y="45">3</text><text x="215" y="65">1</text><text x="215" y="90">2</text><text x="215" y="115">3</text></g><g stroke="currentColor" stroke-width="1" fill="none"><rect x="245" y="52" width="90" height="75"/><line x1="245" y1="77" x2="335" y2="77"/><line x1="245" y1="102" x2="335" y2="102"/><line x1="275" y1="52" x2="275" y2="127"/><line x1="305" y1="52" x2="305" y2="127"/></g><g font-size="11" fill="currentColor"><text x="256" y="70">1</text><text x="286" y="70">1</text><text x="316" y="70">0</text><text x="256" y="95">0</text><text x="286" y="95">0</text><text x="316" y="95">1</text><text x="256" y="120">1</text><text x="286" y="120">0</text><text x="316" y="120">0</text></g></svg>'
    },
    {
      id: 'm3-n5',
      caption: 'The diamond M3 (left) and the pentagon N5 (right) — the two forbidden sublattices of a distributive lattice.',
      svg: '<svg viewBox="0 0 380 210" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.4" fill="none"><circle cx="80" cy="20" r="10"/><circle cx="30" cy="100" r="10"/><circle cx="80" cy="100" r="10"/><circle cx="130" cy="100" r="10"/><circle cx="80" cy="180" r="10"/><line x1="80" y1="30" x2="35" y2="90"/><line x1="80" y1="30" x2="80" y2="90"/><line x1="80" y1="30" x2="125" y2="90"/><line x1="30" y1="110" x2="75" y2="170"/><line x1="80" y1="110" x2="80" y2="170"/><line x1="130" y1="110" x2="85" y2="170"/></g><g font-size="11" fill="currentColor"><text x="74" y="10">1</text><text x="16" y="95">a</text><text x="74" y="95">b</text><text x="136" y="95">c</text><text x="74" y="200">0</text><text x="30" y="205" font-size="12" font-weight="bold">M3</text></g><g stroke="currentColor" stroke-width="1.4" fill="none"><circle cx="290" cy="20" r="10"/><circle cx="250" cy="80" r="10"/><circle cx="330" cy="80" r="10"/><circle cx="330" cy="140" r="10"/><circle cx="290" cy="180" r="10"/><line x1="290" y1="30" x2="255" y2="70"/><line x1="290" y1="30" x2="330" y2="70"/><line x1="250" y1="90" x2="285" y2="172"/><line x1="330" y1="90" x2="330" y2="130"/><line x1="330" y1="150" x2="295" y2="172"/></g><g font-size="11" fill="currentColor"><text x="284" y="10">1</text><text x="234" y="75">a</text><text x="336" y="75">b</text><text x="336" y="135">c</text><text x="284" y="200">0</text><text x="290" y="205" font-size="12" font-weight="bold">N5</text></g></svg>'
    },
    {
      id: 'warshall-trace',
      caption: "Warshall's algorithm: the matrix after allowing intermediate vertex k, for k = 1..4, on a 4-vertex relation.",
      svg: '<svg viewBox="0 0 400 130" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" fill="currentColor"><text x="10" y="20">start</text><text x="110" y="20">k=1</text><text x="210" y="20">k=2</text><text x="310" y="20">k=3,4</text></g><g stroke="currentColor" stroke-width="1" fill="none"><rect x="5" y="30" width="72" height="72"/><rect x="105" y="30" width="72" height="72"/><rect x="205" y="30" width="72" height="72"/><rect x="305" y="30" width="72" height="72"/></g><g font-size="9" fill="currentColor" opacity=".8"><text x="15" y="115">only direct edges</text><text x="105" y="115">via vertex 1 added</text><text x="205" y="115">via vertex 2 added</text><text x="305" y="115">fully closed</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

Every other topic in discrete mathematics — counting, graphs, logic, algebra — talks about collections of objects and the ways those objects relate to each other. Sets give the language for "a collection of objects". Relations give the language for "these two objects are connected". Functions are the special, disciplined kind of relation that most of mathematics and all of computing is built from. Lattices are what happens when the relation is an ordering with enough structure that "combine these two" makes sense.

This chapter builds all four from scratch: what a set is and what you can prove about it with nothing but its definition, what a relation is and which of its properties matter, what a function is and how to count the functions with a given property, and what a lattice is and how to tell a real one from an impostor. Nothing here needs any earlier topic; almost everything later — counting arguments, graph theory, group theory, digital logic — needs this one.

SETS: WHAT THEY ARE, AND THE ONE TRAP EVERYONE FALLS INTO

A set is an unordered collection of distinct objects, called its elements. {1, 2, 3} and {3, 1, 2} are the same set; {1, 1, 2} is just {1, 2}, because a set does not count repeats. Two sets are equal exactly when they have the same elements — order and repetition carry no information.

Write x ∈ A to say x is an element of A, and A ⊆ B to say every element of A is also an element of B (A is a subset of B). These two symbols look similar and mean structurally different things: ∈ relates an element to a set; ⊆ relates a set to a set. Confusing them is the single most common set-theory error, so fix it now with a concrete case.

Let A = {∅}. This is a set containing exactly one element, and that element happens to be the empty set. Now: is ∅ ∈ A? Yes — ∅ is literally the one element A contains. Is ∅ ⊆ A? Also yes, but for a completely different reason (below, every set has ∅ as a subset). Is {∅} ⊆ A? Yes, since {∅} equals A and every set is a subset of itself. Is {∅} ∈ A? No — A's one element is ∅, not {∅} ∈ A would require {∅} itself to be sitting inside A as a member, and it is not.

GATE TRAP: {∅} is not the same object as ∅. ∅ is the empty set — it has zero elements. {∅} is a set with one element, and that element is the empty set — so |∅| = 0 but |{∅}| = 1. A question that asks "is ∅ ∈ {∅, {∅}}" is testing exactly this: yes, because ∅ is literally listed as a member.

THE EMPTY SET AND WHY IT IS A SUBSET OF EVERYTHING

∅, the set with no elements, has one property that looks like a trick the first time you see it: ∅ ⊆ A for every set A, including A = ∅ itself.

To see why, go back to the definition: A ⊆ B means "for every x, if x ∈ A then x ∈ B." Take A = ∅ and ask whether this holds. The claim "if x ∈ ∅ then x ∈ B" has to be checked for every x — but there is no x with x ∈ ∅, because ∅ has no elements at all. A conditional statement with a false hypothesis is true no matter what the conclusion says (there is no counterexample to produce, because there is no case to check). So the claim holds for every x vacuously, and ∅ ⊆ B is true for every set B.

KEY: ∅ ⊆ A always, and the proof is vacuous — not because ∅ "contains only harmless things" but because there is no element of ∅ that could ever violate the subset condition. This is the standard shape of a vacuous proof: "for all x in the empty set, P(x)" is automatically true.

THE POWER SET

Given a set A, the power set P(A) is the set of all subsets of A — including ∅ and A itself. If A = {a, b}, its subsets are ∅, {a}, {b}, {a, b}, so P(A) = {∅, {a}, {b}, {a,b}}, a set with 4 elements.

Why does |A| = n give |P(A)| = 2^n? Build a subset by deciding, independently for each of the n elements, whether it is in or out. That is n independent binary choices, so the number of subsets is 2 × 2 × ... × 2 (n times).

|P(A)| = 2^|A|

Two edge cases are worth working by hand because they are exactly what a question checks. P(∅): the only subset of ∅ is ∅ itself, so P(∅) = {∅}, a set with 2^0 = 1 element. P({∅}): the set {∅} has one element (namely ∅), so its subsets are ∅ and {∅} itself, giving P({∅}) = {∅, {∅}}, a set with 2^1 = 2 elements. Notice P(∅) has 1 element and P({∅}) has 2 — do not confuse the two.

GATE TRAP: |P(A)| = 2^|A| counts subsets, not elements-plus-something. A common error is writing |P(A)| = n^2 or 2n. Check it on a tiny case: |A| = 2 gives 4 subsets, and 2^2 = 4, not 2×2² or 2×2.

CARTESIAN PRODUCT

The Cartesian product A × B is the set of all ordered pairs (a, b) with a ∈ A and b ∈ B. Order matters here — (a, b) and (b, a) are different pairs unless a = b — which is the opposite of how sets themselves behave, and is exactly what lets A × B encode a relationship between two specific positions.

Counting A × B is direct: each of the |A| choices for the first coordinate can be paired with each of the |B| choices for the second, independently, so

|A × B| = |A| · |B|

For A = {1,2,3}, B = {a,b,c,d}: |A × B| = 3 × 4 = 12. Every one of the 2^12 = 4096 subsets of A × B is a valid relation from A to B — a fact used heavily once relations arrive below.

SET OPERATIONS AND VENN DIAGRAMS

Given sets A and B (both drawn from some universal set U), four operations build new sets from old: union A ∪ B (elements in A or B or both), intersection A ∩ B (elements in both), difference A − B (elements in A but not B), and complement A′ = U − A (elements not in A). The symmetric difference A ⊕ B = (A − B) ∪ (B − A) is the elements in exactly one of the two — equivalently (A ∪ B) − (A ∩ B).

[[FIG:venn-3set]]

A Venn diagram makes these operations visible as regions, and it also makes their identities provable by inspection — an element is in the region on the left of an equation exactly when it is in the region on the right. That "membership check" method is how every set identity below is actually proved, not just illustrated.

DE MORGAN'S LAWS FOR SETS

(A ∪ B)′ = A′ ∩ B′
(A ∩ B)′ = A′ ∪ B′

Prove the first by showing each side is a subset of the other (double inclusion), which is the standard way to prove two sets equal when a direct membership chain works both ways.

1. Take x ∈ (A ∪ B)′. Then x ∉ A ∪ B, meaning x is not in A and not in B (if it were in either, it would be in the union). So x ∈ A′ and x ∈ B′, giving x ∈ A′ ∩ B′. This shows (A ∪ B)′ ⊆ A′ ∩ B′.
2. Take x ∈ A′ ∩ B′. Then x ∉ A and x ∉ B, so x is in neither, so x ∉ A ∪ B, so x ∈ (A ∪ B)′. This shows A′ ∩ B′ ⊆ (A ∪ B)′.
3. Both inclusions hold, so the two sets are equal.

The second law follows the identical pattern with ∪ and ∩ swapped, or by applying the first law to A′ and B′ and complementing both sides. In words: the complement of a union is the intersection of the complements, and vice versa — "not (A or B)" is "not A and not B", which is also just De Morgan's law for logical OR/AND wearing set notation.

DISTRIBUTIVE AND ABSORPTION LAWS FOR SETS

A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)
A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)

Prove the first by membership. x is in the left side iff x ∈ A or (x ∈ B and x ∈ C). x is in the right side iff (x ∈ A or x ∈ B) and (x ∈ A or x ∈ C). If x ∈ A, both sides hold trivially. If x ∉ A, the left side needs x ∈ B and x ∈ C, and the right side needs x ∈ B (from the first bracket, since A failed) and x ∈ C (from the second) — the same condition. So the two sides agree in both cases, and the sets are equal.

The absorption laws are shorter: A ∪ (A ∩ B) = A and A ∩ (A ∪ B) = A. For the first: A ∩ B ⊆ A always, so unioning A with something already inside A changes nothing. For the second: A ⊆ A ∪ B always, so intersecting A with something that already contains A leaves A unchanged. These reappear unchanged as lattice laws later in this chapter — a lattice is exactly a structure where absorption is guaranteed to hold.

KEY: Every set identity above is proved the same way — either "an element is on the left iff it is on the right" (a membership table with a few cases) or "each side is a subset of the other" (double inclusion). There is no other method needed for this whole family of laws.

THE PRINCIPLE OF INCLUSION–EXCLUSION

|A ∪ B| is not simply |A| + |B|, because any element in both sets gets counted twice by that sum. Correcting for the double-count:

|A ∪ B| = |A| + |B| − |A ∩ B|

For three sets the same overcounting happens at two levels: pairwise intersections are subtracted once each (having been added twice, in |A|+|B|+|C|, they need removing once to be counted once), but the triple intersection A∩B∩C was added three times (once in each single-set term), then subtracted three times (once in each pairwise term, since it sits inside all three pairwise intersections), netting to zero — so it must be added back once more to be counted the single time it deserves.

|A ∪ B ∪ C| = |A| + |B| + |C| − |A∩B| − |A∩C| − |B∩C| + |A∩B∩C|

Work a concrete count. Among 100 students, 40 study French, 35 study German, 20 study both. How many study French or German? |F ∪ G| = 40 + 35 − 20 = 55. How many study neither? 100 − 55 = 45.

Three-set version: 60 people like tea, 50 like coffee, 40 like juice; 25 like tea and coffee, 20 like coffee and juice, 15 like tea and juice, 10 like all three. |T∪C∪J| = 60+50+40 −25−20−15 +10 = 100. This same alternating-sign pattern, extended to counting functions that miss targets, is exactly the tool used later in this chapter to count onto functions.

COUNTING SUBSETS WITH CONSTRAINTS

The 2^n subset count from the power set generalizes whenever a constraint fixes some elements and frees the rest. Example: how many subsets of a 6-element set contain a specific element x? x's status is fixed ("in"), and the other 5 elements are each free, giving 2^5 = 32. How many subsets have even size? Half of all 2^n subsets, by a pairing argument (toggle any one fixed element to pair each even-size subset with an odd-size one) — 2^(n−1), when n ≥ 1.

REMEMBER: whenever a counting problem fixes some elements and leaves the rest free, the count is 2^(number of free elements) — this single idea derives the power set count, the reflexive-relation count, and several function counts below.

RELATIONS: SUBSETS OF A CARTESIAN PRODUCT

A relation R from A to B is simply a subset of A × B: it says which pairs are "related". When A = B, R is a relation on A. Writing a R b means (a,b) ∈ R.

Since a relation on A is any subset of A × A, and |A × A| = n² when |A| = n, the number of relations on an n-element set is

|relations on A| = 2^(n²)

For n = 3: 2^9 = 512 relations total, matching the count directly from the definition — no properties assumed yet, just "any subset of the 9 pairs."

A relation can be drawn as a digraph — one node per element, an arrow from a to b whenever a R b, including a self-loop when a R a — or written as a 0/1 matrix M where M[i][j] = 1 iff (i,j) ∈ R. The two pictures carry exactly the same information; digraphs are easier to read for structure, matrices are easier to compute with.

[[FIG:matrix-digraph]]

PROPERTIES OF RELATIONS

A handful of properties recur constantly, and each is checked directly on the matrix or the digraph.

• Reflexive: a R a for every a ∈ A. On the matrix, every diagonal entry is 1. On the digraph, every node has a self-loop.
• Irreflexive: a R a for no a ∈ A. Every diagonal entry is 0; no self-loops at all.
• Symmetric: a R b implies b R a. The matrix equals its own transpose. On the digraph, every edge is paired with its reverse.
• Antisymmetric: a R b and b R a together force a = b. Off the diagonal, the matrix can never have both M[i][j] = 1 and M[j][i] = 1 for i ≠ j — at most one direction is present for any distinct pair.
• Asymmetric: a R b implies b R a does NOT hold, for every pair (equivalently: never both directions, and never a loop either). Asymmetric is strictly stronger than antisymmetric — it also forbids the diagonal.
• Transitive: a R b and b R c together force a R c. On the digraph, every 2-step path has its shortcut edge already present.

Reflexive and irreflexive are not opposites of each other in the sense of "one must hold" — a relation can fail both, e.g. R = {(1,1)} on {1,2}: (1,1) ∈ R so it is not irreflexive, but (2,2) ∉ R so it is not reflexive either. The diagonal must be either all-1 (reflexive) or all-0 (irreflexive) to earn either label; a mixed diagonal earns neither.

GATE TRAP: symmetric and antisymmetric are NOT opposites — a relation can be both at once, or neither. The equality relation {(a,a) : a ∈ A} is both: symmetric trivially (a=a gives b=a), and antisymmetric trivially (a R b and b R a both say a=b, which is already the conclusion needed). A relation with R = {(1,2)} on {1,2} is neither: not symmetric (missing (2,1)), and (vacuously — there's no pair (a,b),(b,a) both present with a≠b) actually IS antisymmetric here; but take R = {(1,2),(2,1),(1,3)} on {1,2,3}: it fails symmetric (missing (3,1)) and fails antisymmetric (both (1,2) and (2,1) present with 1≠2). So all four combinations of symmetric/not and antisymmetric/not are possible.

Verify on the earlier concrete example: R = {(1,1),(2,2),(3,3),(1,2),(2,1)} on {1,2,3}. Reflexive — yes, all three diagonal pairs present. Symmetric — yes, (1,2) and (2,1) are both present, and there is no other off-diagonal pair to check. Transitive — check every chain through the pairs present: (1,2)&(2,1)→ need (1,1), present; (2,1)&(1,2)→ need (2,2), present; (1,1)&(1,2)→ need (1,2), present; (1,2)&(2,2)→ need (1,2), present — every required shortcut is already there, so it is transitive. Antisymmetric — no, since (1,2) and (2,1) are both present with 1≠2.

COUNTING RELATIONS WITH GIVEN PROPERTIES

Every count below comes from the same method: identify which cells of the n×n matrix are forced, and which are free, then 2^(free cells) — using the pairing trick from the subset-counting section for cells whose value is tied to another cell rather than fully free.

1. Total relations: all n² cells free. Count = 2^(n²).
2. Reflexive: the n diagonal cells are forced to 1. The remaining n² − n off-diagonal cells are free. Count = 2^(n² − n).
3. Irreflexive: the n diagonal cells are forced to 0. The same n² − n off-diagonal cells are free. Count = 2^(n² − n) — the same number as reflexive, because in both cases the diagonal is fully determined and only the off-diagonal is free.
4. Symmetric: the n diagonal cells are each free on their own (1 bit each), but the n² − n off-diagonal cells pair up as {(i,j),(j,i)} for i<j — there are (n²−n)/2 = n(n−1)/2 such pairs, and each pair is set together (both 1 or both 0), one free bit per pair. Total free bits = n (diagonal) + n(n−1)/2 (pairs) = n(n+1)/2. Count = 2^(n(n+1)/2).
5. Antisymmetric: the diagonal cells are free (antisymmetry says nothing about the diagonal) — n free bits, 2 choices each, contributing 2^n. Each off-diagonal unordered pair {i,j} has three legal patterns — (0,0), (1,0), (0,1) — but not (1,1), since that would force i=j. That is 3 choices per pair, and there are n(n−1)/2 pairs, contributing 3^(n(n−1)/2). Count = 2^n · 3^(n(n−1)/2).
6. Asymmetric: same off-diagonal pairs as antisymmetric (3 choices each, since (1,1) is still forbidden), but now the diagonal is also forced to 0 (asymmetric forbids loops), so 0 free diagonal bits. Count = 3^(n(n−1)/2).
7. Reflexive and symmetric together: diagonal forced to 1 (no freedom, 0 bits), and off-diagonal pairs free as in case 4, contributing n(n−1)/2 free bits. Count = 2^(n(n−1)/2).

Check case 7 on n = 3: 2^(3·2/2) = 2^3 = 8 — matching a direct hand count: the 3 diagonal pairs are forced in, and the 3 unordered off-diagonal pairs {1,2},{1,3},{2,3} are each independently in-both or out-both, giving 2^3 = 8 relations, one of which is the bare equality relation and one of which is all of A×A.

Check case 5 on n = 4: 2^4 · 3^(4·3/2) = 16 · 3^6 = 16 · 729 = 11664 antisymmetric relations on a 4-element set.

REMEMBER: to count relations with any combination of these properties, redraw the n×n matrix, mark which cells are forced (and to what), which cells are tied together in pairs, and which are fully free — then multiply out 2^(free singles) · 3^(free pairs with 3 legal patterns) · 2^(free pairs with 2 legal patterns), as needed. Every formula above is just this counted out.

COMPOSITION OF RELATIONS

If R is a relation from A to B and S is a relation from B to C, the composition S∘R is a relation from A to C: (a,c) ∈ S∘R iff there exists some b ∈ B with (a,b) ∈ R and (b,c) ∈ S. Read it right to left, like function composition — R is applied first, S second, matching the name S∘R.

Work an example. R = {(1,2),(2,3)} and S = {(2,1),(3,4)} on {1,2,3}∪{4}. For (1,2) ∈ R, take b = 2; is there (2,c) ∈ S? Yes, (2,1), so c = 1, giving (1,1) ∈ S∘R. For (2,3) ∈ R, take b = 3; (3,c) ∈ S is (3,4), giving c = 4, so (2,4) ∈ S∘R. No other pairs of R produce a chain, so S∘R = {(1,1),(2,4)}.

When R and S are on the same set A and represented by 0/1 matrices M_R and M_S, the matrix of S∘R is the Boolean product M_S ⊛ M_R, computed exactly like ordinary matrix multiplication except + is replaced by OR and × by AND: entry (i,k) is 1 iff there is some j with M_R[i][j] = 1 AND M_S[j][k] = 1 — precisely the composition definition, applied cell by cell.

R composed with itself n times, written R^n, captures paths of exactly n steps: (a,b) ∈ R^n iff there is a chain a = x_0 R x_1 R x_2 ... R x_n = b of length exactly n. R^1 = R, and R^(k+1) = R∘R^k.

CLOSURES: THE SMALLEST FIX THAT RESTORES A PROPERTY

A given relation R often fails to be reflexive, symmetric, or transitive, and the closure of R under a property is the smallest relation containing R that does have it — add exactly what is missing, nothing more.

The reflexive closure is R ∪ {(a,a) : a ∈ A} — union with the identity relation, adding only the missing diagonal pairs. Example: R = {(1,2),(2,3),(3,4),(2,2)} on {1,2,3,4}. The diagonal needs (1,1),(3,3),(4,4) added — (2,2) is already present. Reflexive closure has 4 + 3 = 7 pairs.

The symmetric closure is R ∪ R^(-1), where R^(-1) = {(b,a) : (a,b) ∈ R} — add the reverse of every pair not already reversible.

The transitive closure is the smallest transitive relation containing R — the union R ∪ R² ∪ R³ ∪ ... ∪ Rⁿ (on an n-element set, no new pairs can appear past Rⁿ, since any chain longer than n must repeat a vertex and can be shortened). Equivalently, (a,b) is in the transitive closure iff there is a path of any length ≥ 1 from a to b in the digraph of R.

Example: R = {(1,2),(2,3),(3,1)} on {1,2,3} — a directed 3-cycle. From vertex 1: 1→2 (length 1, pair (1,2)), 1→2→3 (length 2, pair (1,3)), 1→2→3→1 (length 3, pair (1,1)) — beyond length 3 it only repeats these targets since the cycle has period 3. By the cycle's symmetry every vertex reaches every vertex (including itself, via the full loop), so the transitive closure is all 9 pairs of {1,2,3}×{1,2,3}.

WARSHALL'S ALGORITHM

Testing every path length separately to build a transitive closure is wasteful. Warshall's algorithm computes it in one pass over the vertices, using each vertex once as a permitted "waypoint".

Start from the matrix of R. For k = 1 to n, update the matrix by allowing vertex k as an intermediate stop: for every i, j, set M[i][j] = M[i][j] OR (M[i][k] AND M[k][j]) — "i can already reach j, or i can reach k and k can reach j." After processing all n vertices as waypoints, M[i][j] = 1 iff there is a path from i to j using any subset of the vertices as intermediate stops — which is any path at all, so M is exactly the transitive closure.

[[FIG:warshall-trace]]

Trace it on a 4-element relation R = {(1,2),(2,3),(3,4),(4,1)} — a 4-cycle — on {1,2,3,4}.

1. Start: M has 1s exactly at (1,2),(2,3),(3,4),(4,1). Nothing else.
2. k=1: for which (i,j) does i→1 and 1→j both hold, adding a new (i,j)? Only 4→1 reaches vertex 1 (M[4][1]=1), and 1→2 leaves it (M[1][2]=1), so add M[4][2] = 1. New pair: (4,2).
3. k=2: who reaches 2? Now rows 1 and 4 (M[1][2]=1, M[4][2]=1 from step 2). Vertex 2 goes to 3 (M[2][3]=1). So add M[1][3] = 1 and M[4][3] = 1 (already partly implied, confirm it's set). New pairs: (1,3), (4,3).
4. k=3: who reaches 3? Rows 2, 1, 4 (M[2][3], M[1][3], M[4][3] all 1 now). Vertex 3 goes to 4 (M[3][4]=1). Add M[2][4]=1, M[1][4]=1, M[4][4]=1 (4 reaches 3 reaches 4 — a self-loop appears). New pairs: (2,4), (1,4), (4,4).
5. k=4: who reaches 4? Rows 3,2,1,4 (all now have M[·][4]=1). Vertex 4 goes to 1 (M[4][1]=1, already known) and now also to 2,3,4 (from steps above). Add M[3][1]=1, M[2][1]=1, M[1][1]=1, M[2][2]=1, M[3][2]=1 (newly set here, via vertex 3 reaching 4 and 4 reaching 2), M[3][3]=1, and complete the closure of the cycle: every vertex reaches every vertex.

Since the underlying digraph is a single 4-cycle, every vertex can reach every other by going around, so the finished transitive closure is indeed the full 16-pair relation {1,2,3,4}×{1,2,3,4} — matching the earlier 3-cycle example's pattern, generalized. A relation whose digraph is a single cycle through all n vertices always closes to the complete relation on those n vertices.

KEY: Warshall's algorithm does exactly one thing per waypoint k: "does allowing a detour through k connect anything that wasn't connected before?" — updating the whole matrix in O(n²) per waypoint, O(n³) total, versus recomputing R, R², R³, ... separately.

EQUIVALENCE RELATIONS

A relation that is reflexive, symmetric, and transitive is an equivalence relation. It is the abstract shape of "these two things count as the same for some purpose" — same remainder, same size, same colour — without literally being identical.

For a ∈ A, the equivalence class of a, written [a], is {x ∈ A : x ~ a} — everything equivalent to a. Two classes [a] and [b] are either identical or completely disjoint: if some z is in both, then z ~ a and z ~ b, so a ~ z (symmetry) and z ~ b give a ~ b (transitivity), and then any w ~ a gives w ~ b too (transitivity again) — so [a] = [b] whenever they share even one element.

THEOREM: the equivalence classes of ~ partition A — they are pairwise disjoint (just proved) and their union is all of A (every a ∈ A is in its own class [a], since a ~ a by reflexivity). Conversely, given any partition of A into disjoint nonempty blocks that cover A, defining a ~ b iff a and b lie in the same block produces an equivalence relation whose classes are exactly those blocks (reflexive: a shares its own block; symmetric and transitive: "same block as" is manifestly both). This is a genuine bijection: equivalence relations on A correspond exactly to partitions of A, each one determining the other uniquely.

[[FIG:equiv-partition]]

The canonical example is congruence mod m on the integers: a ≡ b (mod m) iff m divides a − b. Reflexive: a − a = 0, divisible by everything. Symmetric: if m | (a−b), then a−b = mk, so b−a = m(−k), also divisible by m. Transitive: if m | (a−b) and m | (b−c), then (a−b)+(b−c) = a−c is a sum of two multiples of m, hence a multiple of m. The equivalence classes are the m residue classes {..., r, r+m, r+2m, ...} for r = 0, 1, ..., m−1 — exactly the remainders mod m.

GATE TRAP: symmetric and transitive together do NOT imply reflexive. R = {(1,1)} on A = {1,2}: symmetric (the only pair reverses to itself) and transitive (the only chain closes on itself), but (2,2) ∉ R, so R is not reflexive on A. The tempting wrong argument is "a~b and b~a give a~a by transitivity" — but that requires b~a to already be known, i.e. requires some pair actually touching a in the first place; an element with no relation to anything at all is never forced to relate to itself.

Drill this on the example from earlier: R = {(1,1),(2,2),(3,3),(1,2),(2,1),(2,3)} on {1,2,3}. Reflexive — yes. Symmetric — (1,2) has its reverse (2,1) present, but (2,3) is present and its reverse (3,2) is NOT — so R fails symmetry. Since it already fails symmetric, it cannot be an equivalence relation regardless of transitivity.

COUNTING EQUIVALENCE RELATIONS: BELL NUMBERS

Since equivalence relations on A correspond exactly to partitions of A, counting equivalence relations means counting partitions — and this count is the Bell number B(n), built up by hand for small n.

B(1) = 1: {1} has only the partition {{1}}.

B(2) = 2: {1,2} has partitions {{1,2}} (one block) and {{1},{2}} (two singleton blocks).

B(3) = 5: one block {123}; a pair-and-singleton in three ways ({12}{3}, {13}{2}, {23}{1}, since there are C(3,2)=3 ways to choose the pair); all singletons {1}{2}{3}. Total 1 + 3 + 1 = 5.

B(4) = 15: organize by block-size pattern (the partition "shape"). One block of 4: 1 way. One block of 3 and one of 1: choose the 3-block, C(4,3) = 4 ways. Two blocks of 2: choose 2 elements for the first block and the rest form the second, but the two blocks are unordered, so C(4,2)/2 = 6/2 = 3 ways. One block of 2 and two singletons: choose the pair, C(4,2) = 6 ways. Four singletons: 1 way. Total 1 + 4 + 3 + 6 + 1 = 15.

B(5) = 52: shapes are 5; 4+1; 3+2; 3+1+1; 2+2+1; 2+1+1+1; 1+1+1+1+1. Counts: 5→1; 4+1→C(5,4)=5; 3+2→C(5,3)=10 (choosing the 3-block determines the 2-block); 3+1+1→C(5,3)=10 (the remaining pair of singles is automatic, unordered); 2+2+1→ choose the singleton in C(5,1)=5 ways, then split the remaining 4 into two unordered pairs in 3 ways (as in B(4)), giving 5×3=15; 2+1+1+1→ choose the pair, C(5,2)=10; 1+1+1+1+1→1. Total 1+5+10+10+15+10+1 = 52.

n : 1, 2, 3, 4, 5 → B(n) : 1, 2, 5, 15, 52

REMEMBER: to count partitions of size n by hand, list every way n can be written as a sum of block sizes (a "shape"), and for each shape count the ways to assign elements to blocks of those sizes, dividing by the factorial of the number of blocks that share the same size (since those blocks are unordered among themselves).

Apply this to a non-trivial equivalence directly: on {1,...,40}, a ~ b iff a ≡ b (mod 4) AND a ≡ b (mod 5). Since gcd(4,5) = 1, agreeing mod 4 and mod 5 simultaneously is (by the Chinese Remainder Theorem) exactly the same as agreeing mod lcm(4,5) = mod 20. So the equivalence classes are the 20 residue classes mod 20, each containing 40/20 = 2 elements of {1,...,40}. Answer: 20 classes.

PARTIAL ORDERS AND POSETS

A relation that is reflexive, antisymmetric, and transitive is a partial order, and a set with a partial order is a poset, written (A, ≤). "≤" here is a generic symbol for the order, not necessarily numeric ≤ — divisibility and subset-of are partial orders too.

GATE TRAP: equivalence relations use reflexive+symmetric+transitive; partial orders use reflexive+antisymmetric+transitive. They share two of three properties and differ in exactly the third — symmetric ("related both ways is fine") versus antisymmetric ("related both ways forces equal"). This single swap is the difference between "same as" and "no bigger than".

Two elements a, b are comparable if a ≤ b or b ≤ a; otherwise they are incomparable. A poset in which every pair is comparable is a total order (or linear order, or chain) — ordinary ≤ on numbers is total, but divisibility is not (5 and 7 are both divisors-poset elements but neither divides the other).

THE HASSE DIAGRAM

Drawing every pair related by ≤, including every pair implied by transitivity, clutters the picture with redundant edges. A Hasse diagram keeps only the information a reader actually needs, built by three simplifications applied to the full relation's digraph:

1. Drop every loop (a,a) — reflexivity is assumed and never drawn.
2. Drop every edge (a,c) that is implied by transitivity through some other element — that is, drop (a,c) whenever there is a b with a < b < c, since a < b and b < c already force a < c.
3. Orient every remaining edge upward and drop the arrowheads — "higher on the page" now means "greater", so direction is shown by position, not by an arrow.

What survives is the covering relation: a is drawn directly below b with an edge iff a < b and there is no element strictly between them.

Trace this on divisors of 12 under divisibility, A = {1,2,3,4,6,12}. Full relation pairs (a,b) with a|b, a≠b: (1,2),(1,3),(1,4),(1,6),(1,12),(2,4),(2,6),(2,12),(3,6),(3,12),(4,12),(6,12) — 12 edges before any trimming. Apply step 2: (1,4) is dropped because 1|2|4 already forces it; (1,6) dropped because 1|2|6 (or 1|3|6); (1,12) dropped (via 1|2|4|12, several routes); (2,12) dropped because 2|4|12 or 2|6|12; (3,12) dropped because 3|6|12. What remains: (1,2),(1,3),(2,4),(2,6),(3,6),(4,12),(6,12) — 7 covering edges. Draw 1 at the bottom, 2 and 3 above it, 4 and 6 above those, 12 at the top.

[[FIG:hasse-diagram]]

MAXIMAL, MINIMAL, GREATEST, LEAST

An element m is maximal if nothing in the poset is strictly greater than m (m has no edges going up from it in the Hasse diagram) — there can be several maximal elements if some of them are incomparable to each other. An element g is the greatest element if g is greater than or equal to every other element — there can be at most one, and if it exists it is automatically the unique maximal element. Minimal and least are defined symmetrically at the bottom.

On the divisors-of-12 poset: 12 is the unique maximal element and also the greatest (every divisor of 12 divides 12), and 1 is the unique minimal and least element (1 divides everything).

Contrast this with a poset that has maximal elements but no greatest one: A = {a,b,c,d} with a<c, a<d, b<c, b<d, and a,b incomparable, c,d incomparable (a "bowtie" shape, two elements below two elements). Here c and d are both maximal — nothing is above either — but neither is greatest, since c is not ≥ d and d is not ≥ c. There is no unique top.

GATE TRAP: a poset can have several maximal elements and no greatest element at once — "maximal" only means "nothing above me", not "above everything else". Greatest is the much stronger claim and, when it exists, is unique by antisymmetry: if g and g′ were both greatest, g ≤ g′ and g′ ≤ g would force g = g′.

UPPER BOUNDS, LOWER BOUNDS, LUB AND GLB

For a subset S of a poset, u is an upper bound of S if u ≥ s for every s ∈ S — u need not be in S. The least upper bound (lub, or join, a ∨ b for a two-element set) is an upper bound that is ≤ every other upper bound. Lower bound and greatest lower bound (glb, or meet, a ∧ b) are defined by flipping every inequality.

The lub, when it exists, is unique: if u and u′ are both least upper bounds of S, each is an upper bound so each is ≥ every element of S, and each being "least" among upper bounds means u ≤ u′ and u′ ≤ u, forcing u = u′ by antisymmetry — the same uniqueness argument as for the greatest element, because "least upper bound" is just "greatest element of the set of upper bounds".

On the divisors-of-12 poset, join(4,6): common upper bounds of 4 and 6 within {1,2,3,4,6,12} are multiples-in-the-set of both, i.e. numbers both 4 and 6 divide — only 12 qualifies, so join(4,6) = 12 = lcm(4,6). Meet(4,6): common lower bounds are divisors of both 4 and 6 — 1 and 2 both qualify, and 2 ≥ 1 in the divisibility order, so the greatest of them is 2 = gcd(4,6). In any divisibility poset, join = lcm and meet = gcd, whenever those values are themselves elements of the poset.

GATE TRAP: in a divisibility poset, join(a,b) is NOT simply "the larger of the two" — that shortcut only works when one divides the other. Join(4,6) is 12, not 6, because neither 4 nor 6 divides the other, so their least common upper bound has to be a genuinely new element (or absent, if the set does not contain lcm(a,b)).

CHAINS, ANTICHAINS, AND DILWORTH

A chain is a subset in which every pair is comparable — a totally ordered subset, like {1,2,4,12} in the divisors-of-12 poset (1|2|4|12). An antichain is a subset in which no two distinct elements are comparable — {4,6} or {2,3} in the same poset.

The longest chain in (P({a,b,c}), ⊆) runs ∅ ⊂ {a} ⊂ {a,b} ⊂ {a,b,c}, adding one element at a time — 4 sets, one for each size from 0 to 3 (a chain in the subset order can grow by at most one element per step, since it must stay nested, so the longest possible chain in P(A) for |A|=n has exactly n+1 elements).

Dilworth's theorem connects the two: the minimum number of chains needed to cover a poset entirely equals the size of its largest antichain. Intuitively, a large antichain forces many separate chains (no chain can contain more than one antichain element, since a chain's elements are all comparable and an antichain's are all incomparable), and the theorem says this obvious lower bound is always exactly achievable.

TOPOLOGICAL SORTING

A topological sort of a poset is a listing of all its elements in a sequence that respects the order: if a < b, then a appears before b in the list. It always exists for a finite poset (build it by repeatedly picking off any minimal element of what remains — a minimal element always exists in a nonempty finite poset, since an infinite strictly-descending chain would be needed for one not to, and no finite poset has room for that). For divisors of 12, one valid topological sort is 1, 2, 3, 4, 6, 12; another is 1, 3, 2, 6, 4, 12 — both respect every divisibility constraint, and neither is more "correct" than the other, since a poset generally has many valid topological sorts unless it is already a total order.

The number of partial orders on small sets grows fast because so many relations qualify: 1 on a 1-element set, 3 on a 2-element set, 19 on a 3-element set, 219 on a 4-element set — these are not derived from a simple closed formula (no such formula is known in general) and are typically just quoted or found by careful enumeration for small n.

LATTICES: WHEN EVERY PAIR HAS A JOIN AND A MEET

A lattice is a poset in which every pair of elements has both a join (lub) and a meet (glb) — not just some pairs, every pair. Divisors of 12 is a lattice (checked above: every pair among {1,2,3,4,6,12} has both). Divisors of any n under divisibility are always a lattice, since gcd and lcm always exist for any two positive integers and both automatically divide n whenever the two inputs do.

Not every poset is a lattice. Take the bowtie poset from earlier — a,b below c,d, with a,b incomparable and c,d incomparable. Join(a,b): the upper bounds of {a,b} are c and d, but c and d are themselves incomparable, so neither is ≤ the other — there is no least one among them. Join(a,b) does not exist, so this poset fails to be a lattice, and the failing pair is exactly {a,b} (symmetrically, meet(c,d) also fails to exist, for the mirror reason).

GATE TRAP: a poset fails to be a lattice if even ONE pair lacks a join or a meet — it is not enough for most pairs to behave. Always name the specific failing pair when asked why a poset is not a lattice, and show its upper (or lower) bounds are incomparable — that incomparability is the actual reason the least one doesn't exist.

Another failure shape: a single bottom element 0 with three pairwise-incomparable elements a, b, c directly above it and nothing above any of them. Meet(a,b) = 0 works (0 is a common lower bound and nothing else is below both). But join(a,b) needs a common upper bound of a and b somewhere in the poset — and there is none, since nothing sits above a or b at all. This poset is not a lattice, failing on every pair among {a,b,c}.

LATTICES AS ALGEBRAIC STRUCTURES

A lattice can equally be defined algebraically, forgetting the order and keeping only the two operations ∨ (join) and ∧ (meet), governed by four laws that must hold for all elements a, b, c:

• Idempotent: a ∨ a = a, a ∧ a = a.
• Commutative: a ∨ b = b ∨ a, a ∧ b = b ∧ a.
• Associative: (a∨b)∨c = a∨(b∨c), (a∧b)∧c = a∧(b∧c).
• Absorption: a ∨ (a∧b) = a, a ∧ (a∨b) = a.

These are the same absorption laws proved for set union and intersection earlier — P(A) under ∪ and ∩ is itself a lattice, ordered by ⊆, with join = union and meet = intersection, so the earlier set-theory proof already established absorption for that specific lattice. The order can always be recovered from the operations: define a ≤ b to mean a ∧ b = a (equivalently a ∨ b = b), and the four laws above guarantee this recovered relation is a genuine partial order for which ∨ and ∧ are indeed the join and meet.

The order-based definition and the algebraic definition describe exactly the same objects — pick whichever is more convenient for the problem at hand: order language for checking a Hasse diagram, algebraic language for checking an identity.

BOUNDED AND COMPLEMENTED LATTICES

A lattice is bounded if it has a greatest element, called 1 (or ⊤), and a least element, called 0 (or ⊥) — every finite lattice is automatically bounded, since the join of all elements is a greatest element and the meet of all elements is a least one.

In a bounded lattice, a complement of a is an element a′ with a ∨ a′ = 1 and a ∧ a′ = 0 — together, a and a′ span the whole lattice from bottom to top with nothing left over and no overlap. A lattice is complemented if every element has at least one complement. In P(A) under ⊆, the complement of a subset S is exactly its set-complement A − S: S ∪ (A−S) = A (the top) and S ∩ (A−S) = ∅ (the bottom) — matching the algebraic definition of complement precisely.

DISTRIBUTIVE LATTICES AND THE TWO FORBIDDEN SHAPES

A lattice is distributive if a∨(b∧c) = (a∨b)∧(a∧c)... more precisely a∨(b∧c) = (a∨b)∧(a∨c) holds for all a,b,c (equivalently the dual law with ∨ and ∧ swapped — the two are equivalent in any lattice). P(A) is distributive, since this is exactly the set-distributive law proved earlier by membership.

Not every lattice is distributive, and there are exactly two minimal shapes whose presence (as a sublattice) always breaks it: M3, the diamond (a top 1, a bottom 0, and three pairwise-incomparable elements a,b,c strictly between), and N5, the pentagon (a chain 0 < a < 1 alongside a separate chain 0 < b < c < 1, with a incomparable to both b and c).

[[FIG:m3-n5]]

Check distributivity on M3 concretely, with the standard triple a,b,c. Compute a∨(b∧c): b and c are incomparable in M3, so their only common lower bound is 0, giving b∧c = 0, so a∨(b∧c) = a∨0 = a. Now compute (a∨b)∧(a∨c): a and b are incomparable, so their only common upper bound is 1, giving a∨b = 1; likewise a∨c = 1; so (a∨b)∧(a∨c) = 1∧1 = 1. Left side is a, right side is 1, and a ≠ 1 — the distributive law fails. This single triple is enough to disqualify all of M3 (and any lattice containing it as a sublattice) from being distributive.

Check N5 similarly, using a (the short branch) and b, c (the long branch, with b < c). The failing computation is a∧(b∨c) against (a∧b)∨(a∧c). Left side: b∨c = c (since b < c), so a∧(b∨c) = a∧c. Now a and c: a sits on the short branch, c sits at the top of the long branch just below 1, and the two are incomparable, so their only common lower bound is 0 — giving a∧c = 0, hence the whole left side is 0. Right side: a∧b — a and b are also incomparable (the two branches only meet at 0 and 1) so a∧b = 0; and a∧c = 0 as just computed. So the right side is 0∨0 = 0 as well. Try the other distributive pairing instead: a∨(b∧c). Since b < c, b∧c = b, so a∨(b∧c) = a∨b. a and b are incomparable, so their only common upper bound is 1, giving a∨b = 1, so the left side is 1. Now (a∨b)∧(a∨c): a∨b = 1 (just found) and a∨c = 1 (a and c incomparable, only common upper bound 1), so the right side is 1∧1 = 1 too — still matching. The pairing that actually breaks is c∧(a∨b) against (c∧a)∨(c∧b): left side is c∧1 = c (using a∨b = 1); right side is (c∧a)∨(c∧b) = 0∨b = b (c∧a = 0 as shown, and c∧b = b since b < c). Left side is c, right side is b, and b ≠ c — distributivity fails.

KEY: a lattice is distributive iff it contains neither M3 nor N5 as a sublattice (this is a genuine theorem — verifying it requires checking all sublattices, but for the two named shapes themselves the failure is direct: M3 fails a∨(b∧c) vs (a∨b)∧(a∨c) with any labelling of its three middle elements, and N5 fails c∧(a∨b) vs (c∧a)∨(c∧b) on its specific chain-plus-branch shape).

UNIQUENESS OF COMPLEMENTS IN A DISTRIBUTIVE LATTICE

THEOREM: in a distributive lattice, complements are unique when they exist. Suppose a′ and a″ are both complements of a: a∨a′=1, a∧a′=0, a∨a″=1, a∧a″=0. Then a′ = a′∧1 = a′∧(a∨a″) = (a′∧a)∨(a′∧a″) [distributing] = 0∨(a′∧a″) = a′∧a″. By the same steps with the roles of a′ and a″ swapped, a″ = a′∧a″ too. So a′ = a′∧a″ = a″.

This uses distributivity essentially — in a non-distributive (but still complemented) lattice, an element can have more than one complement, which is part of why M3 is the standard example of non-uniqueness: each of a, b, c in the diamond is a complement of each of the other two.

BOOLEAN LATTICES

A lattice that is both complemented and distributive is a Boolean lattice (or Boolean algebra, viewed algebraically). By the theorem just proved, every element of a Boolean lattice has a unique complement, matching the familiar behaviour of set-complement and logical NOT.

The canonical example is the power-set lattice (P(A), ⊆) for any set A: it is distributive (proved earlier by membership) and complemented (complement = set-complement, checked earlier), so it is Boolean for every A.

D_n, the divisor lattice of n under divisibility, is Boolean exactly when n is square-free (no prime divides n more than once). For n = 30 = 2·3·5, every divisor is a distinct subset of the prime factors {2,3,5}, and D_30 is literally isomorphic to P({2,3,5}) via "divisor ↔ its set of prime factors" — Boolean. For n = 12 = 2²·3, the exponent of 2 can be 0,1,2 — a 3-valued choice, not a 2-valued in/out choice — so D_12 is a lattice (checked earlier) but not Boolean: element 2 has no complement, since a complement of 2 would need meet 1 and join 12 with 2, and checking all divisors, no single divisor achieves both.

SUBLATTICES AND LATTICE HOMOMORPHISMS

A sublattice is a subset of a lattice that is itself a lattice under the same order and, crucially, is closed under the original ∨ and ∧ — the join and meet of any two of its elements, computed in the big lattice, must land back inside the subset. A subset that happens to form a lattice on its own using different bounds does not count if its ∨ and ∧ disagree with the ambient ones.

A lattice homomorphism is a function f : L → M between two lattices that preserves both operations: f(a∨b) = f(a)∨f(b) and f(a∧b) = f(a)∧f(b) for all a,b. An isomorphism is a bijective homomorphism — exactly the relationship exhibited above between D_30 and P({2,3,5}).

FUNCTIONS

A function f : A → B assigns to every element of A exactly one element of B. Both halves of that sentence are load-bearing: "every element" rules out a partial assignment that skips some inputs, and "exactly one" rules out an assignment sending one input to two different outputs. A is the domain, B is the codomain, and the range (or image) is {f(a) : a ∈ A} ⊆ B — the outputs actually hit, which can be a proper subset of the codomain.

On a graph, the "every element gets exactly one image" requirement is the vertical line test: every vertical line through the domain's axis meets the graph exactly once. A curve that a vertical line crosses twice is not a function of that variable — it assigns two outputs to one input, violating "exactly one".

INJECTIVE, SURJECTIVE, BIJECTIVE

A function is injective (one-to-one) if distinct inputs always give distinct outputs: f(a)=f(a′) implies a=a′. Graphically, this is the horizontal line test — no horizontal line meets the graph more than once.

A function is surjective (onto) if every element of the codomain is hit by some input: for every b ∈ B, there is some a with f(a)=b — the range equals the whole codomain, not just a subset of it.

A function that is both injective and surjective is bijective — a perfect pairing between A and B, invertible in a way made precise below.

Test f(x) = x² from ℤ to ℤ. Injective? f(2)=f(−2)=4, two distinct inputs, same output — fails. Surjective? Negative numbers like −1 are never hit (squares are non-negative), and even some non-negative integers like 2 or 3 are missed (not perfect squares) — fails. So f is neither injective nor surjective; the two properties are logically independent and this single function fails both at once for different reasons.

COUNTING FUNCTIONS

The number of functions A → B, with |A|=n and |B|=m, is |B|^|A|: each of the n domain elements independently chooses one of m images.

|functions A→B| = m^n

Injections require |A| ≤ |B| (a strict shortage of targets makes distinctness impossible — this is the pigeonhole principle, below). When |A|=n ≤ m=|B|, build an injection element by element: the first domain element has m choices of image, the second has m−1 (must avoid the first's image), down to the n-th having m−n+1 choices left.

|injections A→B| = m(m−1)(m−2)···(m−n+1) = P(m,n) = m!/(m−n)!

For |A|=|B|=n, injections and bijections coincide (an injection between equal finite sets is automatically onto, since no target can be left unhit once all n distinct outputs are assigned to n inputs and there are exactly n targets) and the count is P(n,n) = n!.

|bijections between two n-element sets| = n!

COUNTING ONTO FUNCTIONS

Surjections are harder because "onto" is a global condition, not a local one — use inclusion–exclusion, counting the complement (functions that miss at least one target) and subtracting.

Let |A|=n, |B|=m. Total functions: mⁿ. A function fails to be onto iff it misses at least one of the m targets. By inclusion–exclusion on "which targets are missed": functions missing a specific set of k targets are exactly the functions into the remaining m−k targets, numbering (m−k)ⁿ, and there are C(m,k) ways to choose which k targets are missed.

|onto functions A→B| = Σ_{k=0}^{m} (−1)^k C(m,k) (m−k)^n

Work n=4, m=2 (functions from a 4-set onto a 2-set). Σ: k=0 term C(2,0)·2⁴=16; k=1 term −C(2,1)·1⁴=−2·1=−2; k=2 term +C(2,2)·0⁴=1·0=0. Total 16−2+0 = 14. Cross-check by the direct shortcut for a 2-element codomain: only the two constant functions (all→first, all→second) fail to be onto, so onto count = 2⁴ − 2 = 16−2 = 14 — matches.

Work n=3, m=2: total 2³=8, minus the 2 constant functions, gives 6 onto functions — matching the inclusion–exclusion sum C(2,0)2³ − C(2,1)1³ + C(2,2)0³ = 8 − 2 + 0 = 6.

Work n=4, m=3 (used earlier for a specific question): Σ: k=0: C(3,0)·3⁴=81; k=1: −C(3,1)·2⁴=−3·16=−48; k=2: +C(3,2)·1⁴=3·1=3; k=3: −C(3,3)·0⁴=0. Total 81−48+3−0 = 36.

REMEMBER: onto-function counting is inclusion–exclusion applied to "missing at least one target" — the same alternating-sign machinery used for |A∪B∪C|, just with "(m−k)ⁿ" standing in for "the size of the surviving region" at each stage.

THE PIGEONHOLE PRINCIPLE

If n items are placed into k boxes and n > k, some box holds at least 2 items — because if every box held at most 1, the total placed could be at most k, contradicting n > k. This trivial-sounding fact is a genuine proof technique because it applies to any n items and any k boxes, however they are described.

The generalized form: if n items go into k boxes, some box holds at least ⌈n/k⌉ items — if every box held at most ⌈n/k⌉ − 1, the total would be at most k(⌈n/k⌉ − 1) < n, a contradiction (since ⌈n/k⌉−1 is strictly less than n/k).

⌈n/k⌉ is a guaranteed minimum for the fullest box

Application 1: among any 13 people, two share a birth month (12 months = 12 boxes, 13 > 12 people = pigeons).

Application 2: among any 5 points chosen inside a unit square, two are within distance √2/2 of each other — split the square into 4 quarter-squares (each a box of side ½), 5 points into 4 boxes forces two into the same quarter-square, and the farthest two points inside a ½×½ square are its diagonal corners, at distance √(½²+½²) = √(0.5) = √2/2 apart.

Application 3: a drawer has 10 red socks and 10 blue socks; how many socks must you pull, blindly, to guarantee a matching pair? Two boxes (colours), and you need ⌈n/2⌉ ≥ 2, i.e. n ≥ 3 — pulling 3 socks forces at least 2 of the same colour by pigeonhole, since 2 colours can each absorb at most 1 of the first 2 socks without a repeat, and the 3rd must repeat one.

COMPOSITION AND INVERSES

Given f : A→B and g : B→C, the composition g∘f : A→C is (g∘f)(a) = g(f(a)) — apply f first, then g, matching the relation-composition convention used earlier.

If f and g are both injective, g∘f is injective: (g∘f)(a) = (g∘f)(a′) means g(f(a)) = g(f(a′)); g injective gives f(a) = f(a′); f injective gives a = a′. If f and g are both surjective, g∘f is surjective: for any c ∈ C, g surjective gives some b with g(b)=c, and f surjective gives some a with f(a)=b, so g(f(a)) = c. Combining both, the composition of two bijections is a bijection.

The converses fail in useful, checkable ways. If g∘f is injective, f must be injective (if f(a)=f(a′) then g(f(a))=g(f(a′)) forces a=a′ by injectivity of the composite) — but g itself need not be injective on all of B, only on the part hit by f. If g∘f is surjective, g must be surjective (every c is g(f(a)) for some a, so certainly g hits c) — but f need not be surjective onto B.

A function has an inverse function f⁻¹ : B→A (with f⁻¹(f(a))=a and f(f⁻¹(b))=b) if and only if f is a bijection. Injectivity is needed so f⁻¹(b) is unambiguous (only one a maps to each b that has a preimage); surjectivity is needed so every b ∈ B has some preimage to assign at all. The identity function id_A(a) = a is always a bijection and is its own inverse.

FLOOR AND CEILING

⌊x⌋, the floor of x, is the greatest integer ≤ x; ⌈x⌉, the ceiling, is the least integer ≥ x. For integer x both equal x; otherwise ⌈x⌉ = ⌊x⌋ + 1.

For any integer n, ⌊x+n⌋ = ⌊x⌋+n — shifting by a whole integer shifts the floor by exactly that integer, since adding an integer to x does not change which integers lie below it relative to its fractional part.

⌊x+n⌋ = ⌊x⌋ + n, for integer n

⌊−x⌋ = −⌈x⌉ — reflecting through the origin swaps "round down" for "round up" on the other side. Check on x = 2.3: ⌊−2.3⌋ = −3, and −⌈2.3⌉ = −3 — matches. Check on x = 2 (an integer): ⌊−2⌋ = −2, and −⌈2⌉ = −2 — matches, since the identity holds without exception, not just for non-integers.

⌊x⌋ + ⌊y⌋ ≤ ⌊x+y⌋ — the two separate roundings-down can only lose fractional parts that, added together, might push the sum over the next integer, which the right side then correctly rounds down but the left side already discarded twice. Check on x=y=1.6: ⌊1.6⌋+⌊1.6⌋ = 1+1 = 2, while ⌊3.2⌋ = 3 — indeed 2 ≤ 3, and the inequality is strict here because the two fractional parts (0.6 each) sum past 1.

⌊x⌋ + ⌊y⌋ ≤ ⌊x + y⌋

GATE TRAP: ⌊x⌋+⌊y⌋ = ⌊x+y⌋ is FALSE in general — it is only ≤, with equality exactly when the fractional parts of x and y sum to less than 1. Do not assume floor distributes over addition; check the fractional parts before claiming equality.

COUNTABILITY

A set is countable if it can be placed in bijection with a subset of ℕ (finite sets and "countably infinite" sets — those in bijection with ℕ itself — are both called countable). ℕ, ℤ, and ℚ are all countably infinite: ℤ can be listed 0, 1, −1, 2, −2, 3, −3, ... (a bijection with ℕ by alternating sign); ℚ can be listed by a diagonal sweep through the grid of numerator/denominator pairs, skipping repeats, so every rational eventually appears at a finite position in the list.

ℝ is not countable — Cantor's diagonal argument shows this directly. Suppose, for contradiction, that all real numbers in (0,1) could be listed as r₁, r₂, r₃, .... Write each as an infinite decimal and build a new number d by choosing its n-th digit to differ from the n-th digit of r_n (e.g. add 1 mod 10, avoiding 9↔0 ambiguity). Then d differs from every r_n in at least the n-th digit, so d is not on the list — but d is a real number in (0,1), contradicting the assumption that the list was complete. So no such list can exist, and ℝ is uncountable.

This is exactly why the set of all functions from ℕ to {0,1} — infinite binary sequences — is uncountable: it corresponds to P(ℕ) (each sequence is the indicator of a subset), and the same diagonal argument (build a sequence differing from the n-th listed one at position n) shows no enumeration of it can be complete.

WORKED PROBLEMS

1. How many relations on a 3-element set are both reflexive and symmetric?
   n=3. Reflexive forces the 3 diagonal cells to 1 (0 free bits there). Symmetric ties the (9−3)/2 = 3 off-diagonal unordered pairs together, 1 free bit each. Free bits = 3, count = 2³ = 8.

2. How many binary relations on a 4-element set are reflexive but NOT symmetric?
   Total reflexive relations: 2^(16−4) = 2¹² = 4096. Reflexive-and-symmetric: 2^(4·3/2) = 2⁶ = 64. Reflexive-but-not-symmetric = 4096 − 64 = 4032.

3. Compute the transitive closure of R = {(1,2),(2,3),(3,4),(4,1)} on {1,2,3,4} and state its size.
   As traced step by step in the Warshall section above: the underlying digraph is a single 4-cycle, so every vertex reaches every vertex by going around, giving the full relation of 16 pairs on the 4-element set.

4. List the equivalence classes of a~b iff a≡b (mod 3) on {1,...,9}, and confirm the count matches counting via blocks.
   Residue 1: {1,4,7}. Residue 2: {2,5,8}. Residue 0: {3,6,9}. Three classes of size 3 each, covering all 9 elements disjointly — 3+3+3=9, confirmed a partition. (This uses congruence directly, not a Bell-number count, since the relation — not an arbitrary partition — is fixed in advance.)

5. How many equivalence relations exist on a 4-element set? Derive by listing partition shapes.
   Shapes of 4: 4 → 1 way. 3+1 → C(4,3)=4. 2+2 → C(4,2)/2 = 3. 2+1+1 → C(4,2)=6. 1+1+1+1 → 1. Total 1+4+3+6+1 = 15 = B(4).

6. For the poset ({1,2,3,4,6,12}, |), draw the Hasse diagram and identify the maximal and greatest elements.
   From the earlier trace, covering edges are (1,2),(1,3),(2,4),(2,6),(3,6),(4,12),(6,12), giving levels 1 at bottom, {2,3} next, {4,6} next, 12 at top. 12 is above every other element (1|12, 2|12, 3|12, 4|12, 6|12), so it is both the unique maximal element and the greatest element.

7. Is the poset with a single bottom 0 below three pairwise-incomparable a,b,c (nothing above a,b,c) a lattice?
   Meet(a,b) = 0 exists (common lower bound, and nothing else is below both). Join(a,b) needs a common upper bound of a and b, but nothing in the poset sits above either — no candidate exists at all. So join(a,b) fails to exist, and this poset is NOT a lattice; the failing pair is {a,b} (equally {a,c} or {b,c}).

8. In the diamond M3 (0, a, b, c, 1 with a,b,c pairwise incomparable between the bounds), check distributivity for a∨(b∧c) versus (a∨b)∧(a∨c).
   b∧c: b,c incomparable, only common lower bound is 0, so b∧c=0, and a∨(b∧c) = a∨0 = a. (a∨b): a,b incomparable, only common upper bound is 1, so a∨b=1; likewise a∨c=1; so (a∨b)∧(a∨c) = 1∧1 = 1. Left side a, right side 1, a≠1: distributivity fails, confirming M3 is not distributive.

9. How many functions from a 4-element set onto a 2-element set are there?
   By inclusion–exclusion: Σ(−1)^k C(2,k)(2−k)⁴ = C(2,0)2⁴ − C(2,1)1⁴ + C(2,2)0⁴ = 16 − 2 + 0 = 14. Cross-check: total functions 2⁴=16, minus the 2 constant (non-onto) functions, gives 16−2=14.

10. Among any 5 integers chosen from {1,...,8}, must two of them sum to 9? Use pigeonhole, and separately verify the floor identity ⌊x⌋+⌊y⌋ ≤ ⌊x+y⌋ for x=1.7, y=2.6.
    Pair up {1,...,8} into 4 pairs summing to 9: {1,8},{2,7},{3,6},{4,5}. These are the 4 "boxes." Choosing 5 numbers (pigeons) into 4 boxes forces two numbers to land in the same box by pigeonhole, and two numbers from the same box sum to exactly 9. So yes, some two of the five must sum to 9.
    Floor check: ⌊1.7⌋+⌊2.6⌋ = 1+2 = 3. ⌊1.7+2.6⌋ = ⌊4.3⌋ = 4. Indeed 3 ≤ 4, strict because the fractional parts 0.7+0.6=1.3 exceed 1, causing the extra carry that only the right-hand side captures.

WHAT THE NEXT TOPIC BUILDS ON

Groups, rings and fields — the next topic — are sets equipped with an operation, and the very first thing checked about that operation is whether it is well defined as a function from pairs of elements to elements, exactly the function machinery built here. Partial orders and lattices reappear directly in digital logic, where a Boolean lattice is precisely the algebra of AND/OR/NOT gates, and in graph theory, where a DAG's reachability relation is a partial order whose topological sort is the scheduling order for its tasks. Counting relations, functions and equivalence classes by identifying free choices is also exactly the method combinatorics generalizes next, so the "free cells of a matrix" idea here is a rehearsal for permutations and combinations with constraints.
`
};
