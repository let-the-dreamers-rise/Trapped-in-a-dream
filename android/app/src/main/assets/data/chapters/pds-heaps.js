// Textbook chapter: Heaps and Priority Queues.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/pds.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — either one defined below or one already attached
// to this topic's theory card (heap-array-idx, sift-up).

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['pds-heaps'] = {
  figs: [
    {
      id: 'complete-vs-incomplete',
      caption: 'Left: a complete tree — every level full except the last, which fills left to right with no gap. Right: not complete — a node has two children while a node to its left, at the same level, has none.',
      svg: '<svg viewBox="0 0 420 195" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3" fill="none"><line x1="80" y1="20" x2="50" y2="70"/><line x1="80" y1="20" x2="110" y2="70"/><line x1="50" y1="70" x2="30" y2="120"/><line x1="50" y1="70" x2="65" y2="120"/><line x1="110" y1="70" x2="100" y2="120"/><line x1="300" y1="20" x2="270" y2="70"/><line x1="300" y1="20" x2="330" y2="70"/><line x1="330" y1="70" x2="310" y2="120"/><line x1="330" y1="70" x2="345" y2="120"/></g><g stroke="currentColor" stroke-width="1.3" fill="none"><circle cx="80" cy="20" r="12"/><circle cx="50" cy="70" r="12"/><circle cx="110" cy="70" r="12"/><circle cx="30" cy="120" r="12"/><circle cx="65" cy="120" r="12"/><circle cx="100" cy="120" r="12"/><circle cx="300" cy="20" r="12"/><circle cx="270" cy="70" r="12"/><circle cx="330" cy="70" r="12"/><circle cx="310" cy="120" r="12"/><circle cx="345" cy="120" r="12"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><text x="80" y="160">COMPLETE</text><text x="300" y="160">NOT COMPLETE</text><text x="70" y="178" font-size="9">last level fills left-to-right</text><text x="300" y="178" font-size="9">a left slot was skipped</text></g></svg>'
    },
    {
      id: 'build-heap-cost',
      caption: 'Why build-heap is O(n): most nodes are near the leaves, where sift-down does almost no work, and the count of nodes halves at every level while the possible work grows only by one.',
      svg: '<svg viewBox="0 0 400 170" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="120" y="8" width="160" height="16"/><rect x="120" y="44" width="80" height="16"/><rect x="120" y="80" width="40" height="16"/><rect x="120" y="116" width="20" height="16"/></g><g font-size="10" fill="currentColor"><text x="115" y="20" text-anchor="end">h=0</text><text x="115" y="56" text-anchor="end">h=1</text><text x="115" y="92" text-anchor="end">h=2</text><text x="115" y="128" text-anchor="end">h=3</text><text x="286" y="20">~n/2 nodes, &#8804;0 swaps</text><text x="206" y="56">~n/4 nodes, &#8804;1 swap</text><text x="166" y="92">~n/8 nodes, &#8804;2 swaps</text><text x="146" y="128">~n/16, &#8804;3 swaps</text></g><text x="10" y="155" font-size="10" fill="currentColor">total work &#8776; &#931;&#8462; (n/2^(h+1))&#183;h = O(n)</text></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

The trees chapter gave you a structure — the binary search tree — whose whole point is a total order: for any two keys, inorder traversal tells you which is smaller. That is more than most problems need. A great many problems only ever ask one question, over and over: "of everything I currently have, give me the most urgent one, and then let me add more." A hospital triage desk, a job scheduler, Dijkstra's shortest-path algorithm picking the next closest vertex — none of them need a full sorted order at every instant, they need repeated access to one extreme.

A structure built for exactly that question is a priority queue, and the standard way to build one is a heap. A heap is a tree, so it inherits the trees chapter's vocabulary — root, parent, child, height, complete — but it enforces a far weaker rule than a BST, and that weakness is precisely what makes it fast to build and cheap to maintain. This chapter derives that rule, the array trick that stores the tree without pointers, and the two operations — insert and extract — that do all the work.

THE QUESTION A PRIORITY QUEUE ANSWERS

Define the job before the structure. A priority queue holds a changing set of items, each with a priority (a key), and supports three operations: insert a new item; find the item with the best priority (call it max for now — "best" could mean smallest, it is a choice of convention); and delete that best item, so the next call to find-max sees the next-best one. Nothing else is promised. You cannot ask a priority queue "give me the 5th-best item" cheaply, and you cannot ask it to list everything in order without dismantling it one extraction at a time.

Contrast this with a plain FIFO queue, which is blind to priority and only respects arrival order, and with a fully sorted structure, which answers far more than is asked and pays for that extra power on every insertion.

WHY A SORTED ARRAY DOES NOT WORK

The obvious first attempt: keep the items in a sorted array, best element at one end. find-max is then O(1) — just read the end. delete-max is O(1) too, if it is the end you read, since removing the last element leaves the rest sorted.

The problem is insertion. A new item must be placed at the correct position to keep the array sorted, and that means shifting every element past that position by one slot to make room. In the worst case — inserting the new smallest element into a max-sorted array kept ascending, or symmetric variants — that is O(n) work per insertion. A workload that inserts n items and extracts them all costs O(n^2): every insertion pays the shifting cost that the sorted order promised to save you on extraction.

WHY AN UNSORTED ARRAY DOES NOT WORK EITHER

Go to the other extreme: keep the items in an array in no particular order. Now insertion is O(1) — just append. But find-max and delete-max both require scanning every element to find the best one, which is O(n). You have only moved the cost from insertion to extraction; the total for n inserts and n extracts is still O(n^2).

WHY A PLAIN BST IS NOT THE ANSWER

A balanced BST looks tempting: insert is O(log n), and the maximum is the rightmost node, reachable in O(log n) by always going right. Delete-max removes that rightmost node, also O(log n). On paper this matches what a heap achieves.

Two things make it the wrong tool anyway. First, an unbalanced BST — and nothing stops one from becoming unbalanced under an adversarial or already-sorted insertion sequence, as the trees chapter showed — degrades to O(n) per operation, and keeping it balanced (AVL, red-black) means carrying rotation logic that a priority queue never actually needs, because a priority queue never asks for the middle of the order, only the extreme. Second, a BST needs pointers — left, right, and often parent — tripling the memory per node and scattering nodes across the heap (the memory heap, not this chapter's heap) rather than packing them together.

KEY: A priority queue only ever needs the best element, never the whole order. Paying for a full order — as a sorted array or a BST both do — buys guarantees nobody asked for and nobody needs. A structure that only maintains "each item is at least as good as its immediate subordinates" is enough, and enforcing only that weaker rule is what makes it cheap.

THE HEAP: A COMPLETE TREE WITH A LOCAL RULE

A binary heap is a binary tree with two properties, one about shape and one about order.

The shape property is completeness: every level of the tree is completely filled, except possibly the last, and the last level is filled strictly left to right with no gaps. This is exactly the completeness the trees chapter defined; a heap is not a new shape, it is an old shape put to a new use.

[[FIG:complete-vs-incomplete]]

The order property, called the heap property, comes in two flavours. In a max-heap, every node's key is greater than or equal to both its children's keys. In a min-heap, every node's key is less than or equal to both its children's keys. Read that again: the rule compares a node only to its own two children — not to its grandchildren, not to its sibling's subtree, not to the tree as a whole. That locality is the entire design.

Because the rule is local and recursive (if every node obeys it relative to its children, and its children obey it relative to theirs, the whole tree obeys it), the maximum in a max-heap is forced to sit at the root: the root is ≥ both its children, each of which is ≥ its own children, and so on down every path — so by transitivity the root is ≥ every node in the tree. That single guaranteed fact — the best element is always at the root — is the whole point of the structure.

WHY COMPLETENESS BUYS YOU THE ARRAY

A BST needs pointers because its shape is arbitrary — any node might or might not have a left child, any might or might not have a right child, and there is no way to predict which slot in memory a child lives in without storing its address explicitly.

Completeness removes that unpredictability. Number the nodes of a complete tree in level order — root first, then left to right across each level — and there are no gaps: node number k+1 always exists as long as node number k does not exceed n, because the last level fills left to right with nothing skipped. That numbering is exactly the numbering of array positions. Store node i's key at array position i, and every complete tree of n nodes uses array positions 0..n-1 (or 1..n) with nothing left empty and nothing overflowing past n. No pointers are stored at all — a node's children live at positions computed by arithmetic on its own position, derived next.

KEY: Completeness is not a cosmetic requirement — it is the reason a heap needs no pointers. Any binary tree obeying the heap order property but NOT complete would need explicit child pointers, because you could not predict which array slots hold real nodes and which are gaps. It is completeness, not the order property, that makes the array free of charge.

FINDING PARENTS AND CHILDREN: THE 1-INDEXED CASE

Take the array 1-indexed, root at position 1, and derive the child positions from the level-order numbering, not by memorising them.

1. Write each position's number in binary. Position 1 is the binary numeral 1. Its left child, being the first node of level 1, is the binary numeral 10 (decimal 2). Its right child, the second node of level 1, is the binary numeral 11 (decimal 3).

2. Every subsequent level is reached the same way: appending a 0 bit to a node's binary position means "the first child slot of the next level directly under this node", and appending a 1 bit means "the second child slot" — because level-order numbering, level by level, assigns consecutive numbers to consecutive positions, and a node with two children contributes exactly two consecutive numbers to the next level, in the same left-to-right order as its own position among its siblings.

3. So if a node's 1-indexed position is i, appending a 0 bit gives left child position 2i (shifting all bits left by one place, i.e. multiplying by 2, then setting the new low bit to 0), and appending a 1 bit gives right child position 2i + 1.

left child = 2i,  right child = 2i + 1  (1-indexed)

4. To go the other way — from a child back to its parent — drop the last bit, which is integer division by 2:

parent = floor(i / 2)  (1-indexed)

Check it against the array from the figure: position 2's parent is floor(2/2) = 1, the root, correct; position 3's parent is floor(3/2) = 1, also the root, correct — both children map to the same parent, as they must.

[[FIG:heap-array-idx]]

THE ZERO-INDEXED VERSION

Most real code — arrays that start at 0 — needs the same formulas shifted by one. Let i0 be the 0-indexed position and i1 = i0 + 1 the corresponding 1-indexed position of the same node.

1. Left child, 1-indexed: 2·i1 = 2(i0 + 1) = 2i0 + 2. Converting back to 0-indexed by subtracting 1: left child (0-indexed) = 2i0 + 2 − 1 = 2i0 + 1.

2. Right child, 1-indexed: 2·i1 + 1 = 2i0 + 3. In 0-indexed terms: 2i0 + 3 − 1 = 2i0 + 2.

3. Parent, 1-indexed: floor(i1 / 2) = floor((i0 + 1)/2). In 0-indexed terms, subtract 1: parent (0-indexed) = floor((i0 + 1)/2) − 1, which simplifies to floor((i0 − 1)/2) — check i0 = 4: floor((4+1)/2) − 1 = 2 − 1 = 1, and floor((4−1)/2) = floor(1.5) = 1, the two forms agree.

left child = 2i + 1,  right child = 2i + 2,  parent = floor((i - 1)/2)  (0-indexed)

GATE TRAP: These two conventions are both common in exam questions, and they are NOT interchangeable — using the 0-indexed formula on a 1-indexed array (or vice versa) silently computes the wrong node. Before doing any index arithmetic, find one worked child-parent pair the question gives you and check which formula it satisfies. If the question shows the root at array position 1, you are 1-indexed; if at position 0, you are 0-indexed.

HOW TALL IS A HEAP

Level ℓ of a complete tree (root at level 0) can hold at most 2^ℓ nodes, because each node at level ℓ−1 contributes at most two children to level ℓ, and there are at most 2^(ℓ−1) nodes at level ℓ−1.

A perfect tree with levels 0 through h all completely full has 2^0 + 2^1 + ... + 2^h = 2^(h+1) − 1 nodes (the standard geometric sum from the trees chapter). A heap of n nodes has height h exactly when it has fully filled every level up to h−1 and has at least one node on level h — that is, when

2^h ≤ n ≤ 2^(h+1) − 1

Taking log2 throughout: h ≤ log2 n < h + 1, which is precisely the definition of the floor function applied to log2 n.

height of a heap of n nodes = floor(log2 n)

This single fact is what makes insert and extract O(log n): both operations walk a single root-to-leaf path, and no such path is ever longer than the height.

WHAT A HEAP DOES NOT PROMISE YOU

Everything past this point in the chapter depends on being precise about what the heap property does and does not guarantee, so pin it down before going further.

It does NOT order siblings against each other. The rule only ever compares a node to its own children — never one child to the other. Take the three-node max-heap with root 10 and children 7 and 8: the array [10, 7, 8] satisfies the heap property (7 ≤ 10 and 8 ≤ 10) and so does [10, 8, 7] (8 ≤ 10 and 7 ≤ 10). Two different arrangements of the same keys, both valid heaps, disagreeing on which sibling is bigger. Nothing about the heap property picks between them.

It does NOT make an inorder traversal sorted. Take that same max-heap [10, 7, 8] as a tree: root 10, left child 7, right child 8. Inorder visits left, root, right: 7, 10, 8 — not ascending, not descending, not sorted at all. Compare this to a BST, where inorder is always sorted by construction. A heap is not a BST wearing a different name; it is a strictly weaker structure that happens to also be a binary tree.

GATE TRAP: "The second-to-last element of a max-heap array is the second-largest key" is false, and it is the most common wrong inference on this whole topic. The only guaranteed fact is that the second-largest key is one of the ROOT'S TWO CHILDREN (positions 2 and 3 in a 1-indexed array, or 1 and 2 in 0-indexed) — because everything else in the tree is dominated by one of those two, being a descendant of one or the other. Where it sits inside the array beyond "one of those two positions" depends on the specific heap and is not fixed by the property alone.

KEY: A heap guarantees a chain of local comparisons from root to leaf, nothing more. Do not import BST intuition — "left is smaller", "inorder is sorted", "one position always holds the kth value" — into a heap without re-deriving it from the local rule. Most of it does not survive the derivation.

WHERE DOES THE MINIMUM HIDE IN A MAX-HEAP

A useful test of "what is actually guaranteed": in a max-heap, where can the SMALLEST key be?

It cannot be an internal node. Suppose, for contradiction, some internal node x held the global minimum. x has at least one child c, and the max-heap property forces value(x) ≥ value(c). But x holds the minimum of the entire heap, so also value(x) ≤ value(c). Both together force value(x) = value(c) — impossible with distinct keys, since c is a different key from x. So no internal node can hold the minimum; it must be at a leaf.

Leaves, in a 0-indexed array of n elements, are exactly the positions with no children — positions i where the left-child formula 2i+1 already exceeds the last valid index n−1. Solving 2i + 1 ≥ n gives i ≥ floor(n/2), so:

leaf indices (0-indexed) = floor(n/2) .. n-1     leaf indices (1-indexed) = floor(n/2)+1 .. n

Finding the actual minimum, then, means scanning every one of those leaves — roughly n/2 of them, since a complete tree's last full internal level has about as many nodes as the deepest level — and comparing them all, because nothing distinguishes one leaf from another; the heap property says nothing about leaf-to-leaf order.

finding the minimum of a max-heap costs O(n)

GATE TRAP: This is routinely tested as "what is the time to find the minimum element of a max-heap of n elements", with O(log n) offered as a tempting wrong answer because every other heap operation in this chapter is O(log n). Finding the minimum is the one operation a max-heap does NOT do quickly — it is exactly as slow as finding the minimum of an unsorted array, because the max-heap property gives you no information at all about relative order among the leaves.

INSERTING A NEW ELEMENT: SIFT-UP

To insert while keeping both heap properties intact, do the shape-preserving thing first and repair the order property second.

Placing the new element anywhere except the next free array slot would either break completeness (leaving a gap) or overwrite an existing element, so the new element goes at position n (0-indexed, if the heap currently has n elements) — the one and only place that keeps the tree complete.

That position, though, may violate the order property: the new element may be bigger than its new parent (in a max-heap). The repair, called sift-up or bubble-up, is: compare the new element with its parent; if it violates the order (is bigger, for a max-heap), swap them, and repeat the comparison one level higher, using the new position. Stop when the element reaches the root or when it no longer violates order with its (possibly new) parent.

Trace it concretely. Start from this valid 9-element max-heap, 0-indexed:

[90, 80, 85, 40, 70, 82, 60, 20, 35]

Check it is valid first: index 0 (90) ≥ its children at 1,2 (80, 85); index 1 (80) ≥ children at 3,4 (40, 70); index 2 (85) ≥ children at 5,6 (82, 60); index 3 (40) ≥ children at 7,8 (20, 35). All satisfied.

Insert 95 — deliberately the new overall maximum, so it climbs the whole way and every step is forced.

1. Place 95 at the next free slot, index 9: [90, 80, 85, 40, 70, 82, 60, 20, 35, 95]. Its parent is at floor((9−1)/2) = 4, holding 70. Compare: 95 > 70, violates order — swap.

2. Array is now [90, 80, 85, 40, 95, 82, 60, 20, 35, 70]. The moved element is now at index 4. Its parent is floor((4−1)/2) = 1, holding 80. Compare: 95 > 80, violates order — swap.

3. Array is now [90, 95, 85, 40, 80, 82, 60, 20, 35, 70]. The moved element is now at index 1. Its parent is floor((1−1)/2) = 0, the root, holding 90. Compare: 95 > 90, violates order — swap.

4. Array is now [95, 90, 85, 40, 80, 82, 60, 20, 35, 70]. The moved element is at index 0, the root. There is no parent left to compare against, so sift-up stops.

[[FIG:sift-up]]

Three swaps were needed, and the heap now has 10 elements with height floor(log2 10) = 3 — the new element climbed exactly as many levels as the tree is tall, because it happened to be the new global maximum and so was forced to displace every ancestor on its path. That is the worst case, and it bounds the whole operation:

insertion (sift-up) costs at most O(log n) swaps, one per level

REMEMBER: Sift-up always starts by placing the element at the next array slot (shape first), then only ever compares upward along a single path to the root (order second). It never touches any node outside that one path, which is exactly why the cost is bounded by the height and nothing worse.

EXTRACTING THE BEST ELEMENT: SIFT-DOWN

Removing the root is the whole reason the heap exists, so the operation has to both hand back the maximum and leave a valid heap behind, in O(log n).

The maximum is easy to read — it is the root. The hard part is what replaces it, because deleting the root outright would break completeness at the top of the tree, and any of the interior nodes stepping up to fill it would leave a gap somewhere else. The trick: move the LAST element in the array into the root's position, and shrink the array by one. This costs O(1) and keeps the tree complete, because removing the last slot of a complete tree is always safe — it is precisely the slot completeness says must be filled last, so it is also safe to remove last.

That moved element is very likely now violating the order property with its new children — it came from a leaf, where anything can be small. The repair, sift-down or bubble-down, is: compare it with BOTH children, find the larger of the two (in a max-heap), and if the moved element is smaller than that larger child, swap with that specific child (not the other one) and repeat one level down. Stop at a leaf or when the moved element is no longer smaller than either child.

GATE TRAP: Sift-down must compare against the LARGER of the two children, never just "the left child" or an arbitrary one. Swapping with the smaller child when the larger child also violates order fails to fix the violation at that position — the larger child would still be bigger than the newly placed parent. Always identify the larger child first, then compare once against it.

Trace extract-max on the 10-element heap just built: [95, 90, 85, 40, 80, 82, 60, 20, 35, 70].

1. Save the root, 95, as the answer. Move the last element, 70, into the root, and shrink to 9 elements: [70, 90, 85, 40, 80, 82, 60, 20, 35].

2. At index 0 (value 70), children are at indices 1 (90) and 2 (85). The larger child is 90. Compare: 70 < 90, violates order — swap.

3. Array is now [90, 70, 85, 40, 80, 82, 60, 20, 35]. The moved element (70) is at index 1. Its children are at indices 3 (40) and 4 (80). The larger child is 80. Compare: 70 < 80, violates order — swap.

4. Array is now [90, 80, 85, 40, 70, 82, 60, 20, 35]. The moved element (70) is now at index 4. Its would-be children are at indices 9 and 10, both past the last valid index (8, since the heap now has 9 elements) — index 4 is a leaf. Sift-down stops.

Extract-max returned 95, and the array is a valid 9-element max-heap: [90, 80, 85, 40, 70, 82, 60, 20, 35].

extract-max (sift-down) costs at most O(log n) swaps, one per level

INCREASE-KEY AND DECREASE-KEY

A priority sometimes needs to change while the element stays in the heap — a task's priority is raised, or a shortest-path estimate is lowered when a better route is found (exactly the operation Dijkstra's algorithm calls after relaxing an edge). Given the array index of the element to change, which direction do you repair?

Reason from what changed. Increasing a key in a max-heap can only break the relationship with that node's CHILDREN — the node just got bigger, so it is now even more clearly ≥ its children than before, that relation cannot break. But it might now exceed its parent, which used to be safely bigger. So: increase-key in a max-heap calls sift-up.

Decreasing a key in a max-heap is the mirror image: the node's relationship with its parent can only improve (parent was already ≥ the old, larger value, so it is still ≥ the new, smaller one). But the node might now be smaller than one of its own children, who were previously safely dominated. So: decrease-key in a max-heap calls sift-down.

increase-key (max-heap) → sift-up.   decrease-key (max-heap) → sift-down.
The rules invert for a min-heap: decrease-key → sift-up, increase-key → sift-down.

GATE TRAP: The direction depends on BOTH which way the key moved and which kind of heap it is — four combinations, and swapping any one of them silently repairs the wrong side of the tree, leaving a heap that looks fixed locally but is broken somewhere else. Derive it fresh each time from "what relationship could this change have broken" rather than trying to memorise the four cases as a table.

DELETING AN ARBITRARY ELEMENT

Deleting the root is extract-max; deleting an arbitrary element at index i (not necessarily the root) is the same idea generalised. Move the last element of the array into position i, shrink the array by one, and then repair — but this time you do not know in advance which direction the repair needs to go, because the replacement value could be bigger OR smaller than the value it replaced.

The fix: try both. Compare the moved element against its parent; if it violates order there, sift-up. Otherwise compare it against its children; if it violates order there, sift-down. At most one of the two directions will actually be needed (a single node cannot simultaneously be too big for its parent and too small for its children in a way that needs both repairs at once), and whichever repair runs costs O(log n), since each repair only ever walks a single root-to-leaf or leaf-to-root path.

deleting an arbitrary element, given its index = O(log n)

BUILDING A HEAP FROM AN ARBITRARY ARRAY: TWO WAYS

Every operation so far assumed a valid heap already existed. Given a completely unordered array of n keys, how do you turn it into a heap in the first place?

The naive method: start with an empty heap and insert the n keys one at a time, using ordinary sift-up insertion. Each insertion costs at most O(log n) (the height of the heap at that point, which only grows as more elements are added), so n insertions cost at most O(n log n) total.

naive build (n sequential insertions) = O(n log n)

A cleverer method, due to Floyd, does much better by working from the bottom up instead of the top down. Treat the whole unordered array as already having the correct shape (it does — any array of n elements is trivially a complete tree of n nodes, just not yet heap-ordered), and repair the order property node by node, starting from the LAST INTERNAL NODE and working backward to the root, calling sift-down at each one.

Why start there? Every leaf (indices floor(n/2) through n−1, 0-indexed, derived earlier) is trivially a valid one-node heap all by itself — nothing to repair, since a leaf has no children to violate order with. The last internal node, index floor(n/2) − 1, is the first node for which sift-down actually has work to do, and by the time you reach it, moving backward, every node below it (its whole subtree) has already been fixed into a valid heap, so sift-down at that node only needs to worry about repairing its own position, not re-checking work already done.

Trace it in full on the 8-element array [4, 10, 3, 5, 1, 15, 9, 2] (0-indexed, n = 8). Last internal node index = floor(8/2) − 1 = 3.

1. Sift-down at index 3 (value 5). Its only child within range is index 7 (2·3+2 = 8 is out of range for n=8, so only left child index 7 = 2 exists). Compare: 5 ≥ 2, order already satisfied — no swap.

2. Sift-down at index 2 (value 3). Children at indices 5 (15) and 6 (9); larger child is 15. Compare: 3 < 15, violates order — swap. Array becomes [4, 10, 15, 5, 1, 3, 9, 2]. The moved value 3 is now at index 5, which is a leaf (children would be at 11, 12, both out of range) — stop.

3. Sift-down at index 1 (value 10). Children at indices 3 (5) and 4 (1); larger child is 5. Compare: 10 ≥ 5, order already satisfied — no swap.

4. Sift-down at index 0 (value 4). Children at indices 1 (10) and 2 (15); larger child is 15. Compare: 4 < 15, violates order — swap. Array becomes [15, 10, 4, 5, 1, 3, 9, 2]. The moved value 4 is now at index 2; its children are at indices 5 (3) and 6 (9); larger child is 9. Compare: 4 < 9, violates order — swap again. Array becomes [15, 10, 9, 5, 1, 3, 4, 2]. The moved value 4 is now at index 6, whose children would be at 13, 14 — out of range. Stop.

Final heap, built entirely bottom-up: [15, 10, 9, 5, 1, 3, 4, 2]. Verify: index 0 (15) ≥ children 10, 9; index 1 (10) ≥ children 5, 1; index 2 (9) ≥ children 3, 4. Every internal node checks out — a valid max-heap, reached in 4 sift-down calls (indices 3, 2, 1, 0) rather than 8 sift-up insertions.

WHY BUILD-HEAP IS O(n), NOT O(n log n)

Each individual sift-down in Floyd's method can, in the worst case, cost as much as the height of the subtree it is called on — up to O(log n) if called at the root. So a naive bound on the whole build is (number of nodes) × (max cost per node) = O(n log n), the same as the insertion method. That bound is not tight, and finding the tight one is the actual argument, not a fact to accept on faith.

[[FIG:build-heap-cost]]

1. Group the nodes by their height in the tree — height 0 for leaves, height 1 for nodes whose children are leaves, and so on up to height h = floor(log2 n) at the root. A node's sift-down can cost at most (its height) swaps, because sift-down cannot travel further down than the bottom of its own subtree.

2. Count how many nodes sit at each height. In a complete tree, roughly half the nodes are leaves (height 0), roughly a quarter are at height 1, roughly an eighth at height 2 — in general, about n / 2^(k+1) nodes sit at height k, because each level up halves the population, exactly as in the trees chapter's node-counting identities.

3. The total work Floyd's method could possibly do, summing worst-case cost over every node, is therefore

total work ≤ Σ (from k=0 to h) [ n / 2^(k+1) ] · k

4. Pull the constant n out and evaluate the sum Σ k / 2^(k+1) for k = 0 to ∞ (extending the sum to infinity only makes it bigger, which is fine for an upper bound). This is a standard arithmetico-geometric series; it converges to a constant (the infinite sum Σ k·x^k for x = 1/2 evaluates to x/(1−x)^2 = (1/2)/(1/4) = 2, and dividing by the extra factor of 2 from 2^(k+1) rather than 2^k gives a finite constant close to 1).

5. Since that sum is a constant independent of n, the total work is n times a constant:

Σ (n / 2^(k+1)) · k = O(n)      ⇒      Floyd's build-heap = O(n)

REMEMBER: The reason build-heap beats n insertions is not that any individual sift-down is cheaper than any individual sift-up in isolation — a sift-down at the root can still take O(log n) steps. It is that almost none of the nodes are near the root. Most of the n sift-down calls are on nodes near the leaves, where there is barely any tree left below them to sift down through, and the geometric decay in population as height grows is steep enough to swamp the linear growth in per-node cost.

HEAPSORT

Once you can build a heap in O(n) and extract its maximum in O(log n), a sorting algorithm falls out for free: build a max-heap of the whole array, then repeatedly extract the maximum and place it at the end of the still-unsorted portion, shrinking the heap by one each time. Because each extraction always removes the current largest remaining element and appends it just before the previous extraction, the array fills up sorted from the back forward.

Concretely, extract-max already does most of this: it moves the last element of the (shrinking) heap to the root and sifts down. Heapsort reuses exactly that swap — swap the root with the last element of the CURRENT heap region, but instead of discarding that last slot, leave the old root sitting there, now correctly placed in final sorted position, and shrink the heap boundary to exclude it.

Trace the first three extractions on the max-heap built two sections ago: [15, 10, 9, 5, 1, 3, 4, 2] (n = 8, heap occupies indices 0–7).

1. Swap index 0 (15) with index 7 (2), the last index of the current heap: [2, 10, 9, 5, 1, 3, 4, 15]. Shrink the heap to indices 0–6 (size 7); index 7 (15) is now permanently sorted. Sift-down from index 0 (value 2): children at 1 (10), 2 (9), larger is 10 — swap: [10, 2, 9, 5, 1, 3, 4, 15]. Value 2 now at index 1: children at 3 (5), 4 (1), larger is 5 — swap: [10, 5, 9, 2, 1, 3, 4, 15]. Value 2 now at index 3: its children would be at 7, 8, both outside the size-7 heap — stop. Array: [10, 5, 9, 2, 1, 3, 4 | 15].

2. Swap index 0 (10) with index 6 (4), the last index of the size-7 heap: [4, 5, 9, 2, 1, 3, 10, 15]. Shrink to indices 0–5 (size 6). Sift-down from index 0 (value 4): children at 1 (5), 2 (9), larger is 9 — swap: [9, 5, 4, 2, 1, 3, 10, 15]. Value 4 now at index 2: its only child in range is index 5 (3) (index 6 is outside the size-6 heap) — compare 4 ≥ 3, order already satisfied — stop. Array: [9, 5, 4, 2, 1, 3 | 10, 15].

3. Swap index 0 (9) with index 5 (3), the last index of the size-6 heap: [3, 5, 4, 2, 1, 9, 10, 15]. Shrink to indices 0–4 (size 5). Sift-down from index 0 (value 3): children at 1 (5), 2 (4), larger is 5 — swap: [5, 3, 4, 2, 1, 9, 10, 15]. Value 3 now at index 1: children at 3 (2), 4 (1), larger is 2 — compare 3 ≥ 2, order already satisfied — stop. Array: [5, 3, 4, 2, 1 | 9, 10, 15].

After three extractions the sorted suffix 9, 10, 15 is exactly right, and the remaining heap [5, 3, 4, 2, 1] is a valid 5-element max-heap ready for the same treatment. Continuing this five more times finishes the sort.

n extractions, each O(log k) for a heap of current size k, sum to O(n log n) overall — the same bound as the O(n) build, since the extraction phase dominates. Heapsort is in-place: the sorted suffix and the shrinking heap share the same array, with no auxiliary array needed, unlike merge sort. It is NOT stable: two equal keys can swap past each other during a sift-down, because the comparisons only ever look at values, never at original input position, so their relative order after sorting is not guaranteed to match their relative order before.

heapsort = O(n) build + n × O(log n) extractions = O(n log n) total, in-place, not stable

GATE TRAP: "Heapsort takes extra O(n) space like merge sort" is false — it sorts within the original array, using the shrinking-heap trick above, with only O(1) extra space for temporary variables during a swap. The space-versus-stability trade-off (heapsort: in-place but unstable; merge sort: stable but O(n) extra space) is a standard point of comparison and is asked directly.

FINDING THE KTH LARGEST OR SMALLEST

A heap is the standard tool whenever a problem asks for an extreme value repeatedly, or for the kth extreme rather than the single best.

Method one: build a min-heap of all n elements in O(n), then call extract-min k times. Each extraction costs O(log m) where m is the current heap size, and m only decreases as extractions proceed, so each of the k extractions is bounded above by O(log n). Total:

kth smallest via full heap + k extractions = O(n + k log n)

This beats sorting the whole array (O(n log n)) whenever k is small — for instance, k = O(1) or k = O(log n) — because the O(n) build and the O(k log n) extraction phase are both individually cheaper than a full sort, and their sum stays cheaper as long as k does not grow to be comparable to n.

Method two, better when n is large or arrives as an unbounded stream and only k matters: maintain a max-heap of size AT MOST k to track the k smallest elements seen so far (or a min-heap of size k to track the k largest — the heap type is the opposite of what you are hunting for, because you want fast access to the WORST of your current top-k, to know instantly whether a new element is good enough to replace it). For each incoming element: if the heap has fewer than k elements, insert it (O(log k)); otherwise compare it against the heap's root — if it improves on the root, replace the root with it and sift-down (O(log k)), otherwise discard it with a single comparison. Total cost across n elements:

kth extreme via a size-k auxiliary heap = O(n log k)

which is better than method one whenever k is much smaller than n, since log k beats log n, and the memory used is only O(k) rather than O(n).

MERGING K SORTED LISTS

A closely related use: k sorted lists must be merged into one sorted output. Maintain a min-heap of size k, holding the current front element of each list (tagged with which list it came from). Repeatedly extract the minimum (O(log k)), append it to the output, and insert the next element from the same list the extracted element came from (O(log k)). If the total number of elements across all k lists is N, this performs N extract-and-insert pairs, each O(log k):

merging k sorted lists via a heap = O(N log k)

This is the standard building block for external merge sort (merging many sorted runs that do not fit in memory) and for combining several already-sorted streams, and it strictly beats concatenating everything and re-sorting from scratch, which would cost O(N log N).

RECOGNISING A VALID HEAP

Given an array, checking whether it is a valid heap means checking the order property at every internal node — nothing more, nothing less, and nothing about global sortedness.

Take [50, 42, 45, 30, 38, 40, 20] (1-indexed, n = 7). Internal nodes are positions 1 through floor(7/2) = 3. Position 1 (50): children at 2 (42), 3 (45) — both ≤ 50, fine. Position 2 (42): children at 4 (30), 5 (38) — both ≤ 42, fine. Position 3 (45): children at 6 (40), 7 (20) — both ≤ 45, fine. Every internal node passes — this is a valid max-heap, even though the array as a whole is not sorted (38 comes before 40, out of descending order, but they are not in a parent-child relationship, so that is irrelevant).

Now change one entry: [50, 42, 45, 30, 38, 55, 20]. Position 3 (45) has a child at position 6 (55), and 55 > 45 — the order property is violated at that one pair. A single violation anywhere disqualifies the whole array, no matter how many other pairs are fine.

GATE TRAP: Do not check the array "does it look roughly descending" — check every internal-node-to-child pair explicitly. An array can look completely disordered by eye and still be a perfectly valid heap (values far apart in the array can be unrelated cousins in the tree), and an array can look almost sorted and still fail at one specific pair, as just shown.

COUNTING HOW MANY DISTINCT HEAPS CAN BE BUILT

A different kind of question: given n distinct keys, how many different arrays are valid max-heaps of those keys? This is not asking for one heap — it is asking how much freedom the heap property actually leaves once the shape of the complete tree is fixed.

Start from what is forced. The largest of the n keys must be the root — no other arrangement is possible, since the root must be ≥ everything else. Beyond that, the tree splits into a left subtree of some fixed size L and a right subtree of some fixed size R (L + R = n − 1, both sizes determined purely by the shape of a complete tree of n nodes, nothing to do with which keys go where).

1. Choose WHICH of the remaining n − 1 keys go into the left subtree (the rest automatically go right): C(n−1, L) ways.

2. Whichever L keys land in the left subtree, they must themselves form a valid max-heap of that subtree's shape — recursively, in h(L) ways, where h(·) is the very count being defined.

3. Independently, the R keys on the right form a valid heap in h(R) ways.

4. These three choices are independent of one another, so multiply: h(n) = C(n−1, L) · h(L) · h(R), with the base case h(0) = h(1) = 1 (an empty subtree, or a single node, has exactly one "arrangement").

Work the small cases, using the actual shape of a complete tree at each size. For n = 2, the tree is a root with one left child only: L = 1, R = 0, so h(2) = C(1,1)·h(1)·h(0) = 1·1·1 = 1.

For n = 3, the tree is a root with both children present, L = 1, R = 1:

h(3) = C(2,1) · h(1) · h(1) = 2 · 1 · 1 = 2

Check it by hand with keys {1, 2, 3}: the root must be 3, and the remaining {1, 2} can go into the two leaf slots in either order — [3,1,2] or [3,2,1] — both valid, since siblings are never compared. Two heaps, matching the formula exactly.

For n = 4, the complete tree's left subtree has 2 nodes (a root and its own left child) and the right subtree has 1 node: L = 2, R = 1:

h(4) = C(3,2) · h(2) · h(1) = 3 · 1 · 1 = 3

Check with keys {1, 2, 3, 4}: root is 4. Choose 2 of the remaining {1,2,3} for the left subtree (which must itself have its larger member as the top of the pair, since h(2)=1 forces exactly one valid arrangement per pair): choosing {2,3} for the left gives array [4,3,1,2]; choosing {1,3} gives [4,3,2,1]; choosing {1,2} gives [4,2,3,1]. Three heaps, matching.

For n = 5, the complete tree's left subtree has 3 nodes (a root plus its own two children, since the fifth node fills the leftmost open slot of level 2 under the left child) and the right subtree has 1 node: L = 3, R = 1:

h(5) = C(4,3) · h(3) · h(1) = 4 · 2 · 1 = 8

n = 3 → 2 heaps.   n = 4 → 3 heaps.   n = 5 → 8 heaps.

GATE TRAP: It is tempting to think the count grows smoothly or predictably with n (doubling, say). It does neither — it depends on exactly how the complete tree splits into left and right subtree sizes at that particular n, which changes irregularly as n crosses powers of two. Always re-derive L and R for the specific n asked about; do not extrapolate from a different n.

HOW MANY COMPARISONS DOES ONE INSERTION COST

Pin down the best and worst case precisely, using height rather than vague "log n" language, since GATE asks for exact bounds.

Suppose inserting a new element results in a heap whose height (after the insertion) is h. The new element is placed at the deepest occupied level, depth h from the root (that is where the "next free slot" always lands — either the current deepest level, if it is not yet full, or a brand new level one deeper, if the previous deepest level had just become full; either way the new element sits at depth h of the resulting tree).

Sift-up compares the element against its parent once per level it climbs. In the best case, that first comparison already shows the new element does not violate order — the element stays exactly where it landed, having made exactly 1 comparison and 0 swaps. In the worst case, the element is smaller (or larger, for a min-heap) than every single one of its h ancestors, forcing it to climb all the way to the root, making one comparison at each of the h levels.

minimum comparisons to insert = 1        maximum comparisons to insert = h  (h = height of the heap after insertion)

Worked check: a max-heap has 20 elements before an insertion; after inserting the 21st, n = 21 and height = floor(log2 21) = 4 (since 2^4 = 16 ≤ 21 < 31 = 2^5 − 1). So this insertion makes at most 4 comparisons and at least 1 — matching exactly the earlier trace, where inserting the new maximum into a 9-element heap (giving 10 elements, height floor(log2 10) = 3) took exactly 3 swaps, the maximum possible for that size.

WHICH POSITIONS CAN HOLD THE KTH SMALLEST

One more question type turns entirely on the derivation already done for "where does the minimum hide": how deep in a min-heap can the kth smallest element possibly be?

Every node at depth d has exactly d ancestors on the path back to the root (one per level climbed), and by the heap property, each of those ancestors is ≤ the node itself, and by transitivity all d of them are ≤ it. So a node at depth d has at least d elements in the whole heap that are no larger than it — meaning it cannot be smaller than the (d+1)th smallest overall; its rank, counting from the smallest, is at least d + 1.

Turning that around: for a node to BE the kth smallest, its depth d must satisfy d + 1 ≤ k, i.e. d ≤ k − 1. The kth smallest element of a min-heap can only be found within the top k levels of the tree — depths 0 through k−1 — regardless of how large the heap is beyond that.

the kth smallest element of a min-heap lives at depth ≤ k - 1 (never deeper)

Worked example: a min-heap has 20 elements. Where could the 4th smallest possibly be? Depths 0 through 3 (k−1 = 3), which in a 1-indexed array is positions 1 through 2^4 − 1 = 15. It is guaranteed to NOT be among positions 16 through 20 (depth 4), no matter what the specific keys are, because any node that deep already has 4 ancestors smaller than it, making it at best the 5th smallest.

REMEMBER: This is the same transitive-chain argument used to show the minimum of a max-heap must be a leaf, just generalised from "the very last rank" to "the kth rank". Both facts come from counting how many guaranteed-smaller ancestors sit between a node and the root.

ALL THE OPERATIONS, ONE TABLE

Collect every complexity derived in this chapter in one place, because exam questions frequently mix several of these into one option list and expect you to have all of them at hand together, not scattered across separate derivations.

• Find max (or min) — O(1): it is always the root, no search needed.
• Insert — O(log n): sift-up, at most one comparison per level of height.
• Extract-max/min — O(log n): sift-down after moving the last element to the root.
• Build-heap from n arbitrary keys (Floyd's method) — O(n): summing sift-down costs weighted by the exponentially shrinking population at each height.
• Search for an arbitrary key (not the max) — O(n): the heap property gives no information to prune a search, so every element may need checking.
• Delete an arbitrary element, given its array index — O(log n): move the last element into the gap, then sift in whichever single direction is needed.
• Increase-key / decrease-key, given the index — O(log n): sift-up or sift-down depending on which relationship the change could have broken.
• Merge two same-size binary heaps into one — O(n): a binary array heap has no cheap merge; the practical fix is to concatenate the two arrays and re-run build-heap from scratch, which costs O(n) but is not O(log n) as the other operations are — this single weakness is exactly what the specialised heaps below exist to fix.

KEY: Every operation on a binary heap costs O(1) or O(log n), except two: searching for an arbitrary (non-maximum) key, and merging two heaps — both O(n), for the same underlying reason, that the heap property carries no information beyond "each node beats its own children", which is not enough to prune a search or to splice two trees together cheaply.

HEAPS BEYOND THE BINARY ARRAY

The O(n) merge cost above is the binary heap's one real weakness, and several other heap variants exist specifically to fix it, at the cost of needing actual pointers again instead of a flat array. You do not need to implement these, only to recognise them and know what each buys.

A binomial heap is a collection of binomial trees — a binomial tree of order k has exactly 2^k nodes and is built by attaching one order-(k−1) binomial tree as a child of the root of another order-(k−1) tree — with at most one tree of each order present, mirroring the binary representation of n (a set bit at position k means one order-k tree is present). This structure supports insert, extract-min, and decrease-key all in O(log n), matching a binary heap, but its key advantage is merging two binomial heaps in O(log n) — treat it like binary addition of the two trees' size representations, combining trees of matching order pairwise — a dramatic improvement over the binary heap's O(n) merge.

A Fibonacci heap goes further: it is a looser collection of trees with almost no shape restriction, kept efficient through lazy consolidation — merges and decrease-keys are done cheaply by just linking trees together or cutting a node out and leaving the mess to be tidied up only when extract-min is next called. The payoff is an AMORTISED O(1) cost for insert, for merge, and — critically — for decrease-key, with extract-min remaining O(log n) amortised. Since Dijkstra's algorithm calls decrease-key once per edge relaxation and there can be far more edges than vertices, replacing a binary heap's O(log n) decrease-key with a Fibonacci heap's amortised O(1) improves Dijkstra's overall bound from O(E log V) to O(E + V log V) — the reason Fibonacci heaps are the textbook answer whenever a question asks how to make Dijkstra or Prim asymptotically faster on dense graphs.

Leftist heaps and skew heaps are two more mergeable heap structures worth knowing by name: a leftist heap keeps a "null path length" invariant biasing the tree to be shallow on its right spine specifically so that merging can always recurse down that short spine, giving O(log n) merge; a skew heap achieves the same O(log n) amortised merge without maintaining that invariant explicitly, simply by always swapping a node's children during every merge step. Both trade the binary heap's flat array for a pointer-based tree in exchange for a cheap merge — the same trade binomial and Fibonacci heaps make, at different points on the simplicity-versus-performance line.

KEY: Every specialised heap in this section exists to answer one question: "binary heaps are O(log n) for almost everything, but O(n) to merge — can we do better?" Binomial heaps answer yes, in O(log n), with a structure close enough to a binary heap to still be simple. Fibonacci heaps push insert, merge, and decrease-key down to amortised O(1) at the cost of a more delicate implementation, and that specific improvement is what shortest-path algorithms are built to exploit.

BACK TO THE TREES CHAPTER: THE SAME COUNTING IDENTITIES

None of this chapter's arithmetic is new mathematics — it is the trees chapter's counting identities for complete and full binary trees, applied to a specific use.

The height formula floor(log2 n) is the same relation derived there from the geometric sum 2^0 + 2^1 + ... + 2^h = 2^(h+1) − 1 for a full tree, just solved for h given n instead of the other way round. The leaf-range formula (floor(n/2) to n−1, 0-indexed) is the same "half the nodes are leaves" fact used there to argue that a complete tree's node count splits roughly evenly between its last level and everything above it. And the build-heap O(n) proof leaned directly on "about n/2^(k+1) nodes sit at height k" — precisely the population-per-level count that chapter established for reasoning about a tree's shape.

If any of those identities felt unfamiliar while reading this chapter, that is a sign to revisit the trees chapter's derivation of them rather than to re-memorise them here as a fresh, unconnected fact — they are the same statement both times.

WORKED PROBLEMS

Each of these mirrors a shape this topic is tested in. Follow every step; do not skip to the answer.

1. Trace sift-up: insert 95 into the max-heap [90, 80, 85, 40, 70, 82, 60, 20, 35] (0-indexed, 9 elements).
   Place 95 at index 9. Parent at floor(8/2)=4 is 70; 95>70, swap → [90,80,85,40,95,82,60,20,35,70]. New position 4, parent floor(3/2)=1 is 80; 95>80, swap → [90,95,85,40,80,82,60,20,35,70]. New position 1, parent floor(0/2)=0 is 90; 95>90, swap → [95,90,85,40,80,82,60,20,35,70]. Position 0 is the root; stop. Three swaps, matching height floor(log2 10) = 3.

2. Trace extract-max on [95, 90, 85, 40, 80, 82, 60, 20, 35, 70] (10 elements).
   Save 95. Move last element 70 to root, shrink to 9: [70,90,85,40,80,82,60,20,35]. At index 0, larger child is 90 (index 1); 70<90, swap → [90,70,85,40,80,82,60,20,35]. At index 1, larger child is 80 (index 4); 70<80, swap → [90,80,85,40,70,82,60,20,35]. At index 4, no children exist (heap size 9, indices 9,10 invalid) — leaf, stop. Result: max was 95; heap is [90,80,85,40,70,82,60,20,35].

3. Build a max-heap from [4, 10, 3, 5, 1, 15, 9, 2] using Floyd's method; show the array after every sift-down.
   n=8, last internal index = 3. Sift-down(3): value 5, only child index 7 (2); 5≥2, no swap. Sift-down(2): value 3, children 15,9, larger 15; swap → [4,10,15,5,1,3,9,2]; new leaf position, stop. Sift-down(1): value 10, children 5,1, larger 5; 10≥5, no swap. Sift-down(0): value 4, children 10,15, larger 15; swap → [15,10,4,5,1,3,9,2]; now at index 2, children 3,9, larger 9; swap → [15,10,9,5,1,3,4,2]; now at index 6, no children, stop. Final heap: [15,10,9,5,1,3,4,2].

4. Using the heap from problem 3, perform the first three heapsort extractions and show the array (heap portion and sorted portion) after each.
   Start [15,10,9,5,1,3,4,2]. Swap 0↔7: [2,10,9,5,1,3,4,15]; sift-down 0 (children 10,9, swap with 10) → [10,2,9,5,1,3,4,15]; then (children 5,1, swap with 5) → [10,5,9,2,1,3,4,15]; leaf, stop. State: [10,5,9,2,1,3,4 | 15]. Swap 0↔6: [4,5,9,2,1,3,10,15]; sift-down 0 (children 5,9, swap with 9) → [9,5,4,2,1,3,10,15]; only child (index5=3) in range, 4≥3, stop. State: [9,5,4,2,1,3 | 10,15]. Swap 0↔5: [3,5,4,2,1,9,10,15]; sift-down 0 (children 5,4, swap with 5) → [5,3,4,2,1,9,10,15]; children 2,1, larger 2, 3≥2, stop. State: [5,3,4,2,1 | 9,10,15].

5. Is [50, 42, 45, 30, 38, 40, 20] a valid max-heap (1-indexed)? What about [50, 42, 45, 30, 38, 55, 20]?
   First array: position1(50)≥42,45; position2(42)≥30,38; position3(45)≥40,20 — every internal node satisfied, valid max-heap. Second array: position3(45) has child at position6=55, and 55>45 — violates order at that one pair, so it is NOT a valid max-heap, regardless of every other position being fine.

6. How many distinct max-heaps can be built from 4 distinct keys, and how many from 5?
   For n=4, the complete tree splits into a left subtree of 2 nodes and a right subtree of 1 node. h(4) = C(3,2)·h(2)·h(1) = 3·1·1 = 3. For n=5, the split is a left subtree of 3 nodes and a right subtree of 1 node. h(5) = C(4,3)·h(3)·h(1) = 4·2·1 = 8, using h(3)=2 derived the same way from h(3)=C(2,1)·h(1)·h(1)=2.

7. A max-heap has 50 elements. What is its height, and what is the minimum and maximum number of comparisons to insert a 51st element?
   Height after insertion: n=51, floor(log2 51) = 5 (since 2^5=32 ≤ 51 < 63=2^6−1). Minimum comparisons = 1 (the new element already satisfies order with its parent). Maximum comparisons = 5 (it climbs every one of the 5 levels to the root).

8. In a min-heap of 30 elements, at which depths (and, in a 1-indexed array, which positions) could the 3rd smallest element be found?
   By the kth-smallest rule, depth ≤ k−1 = 2, i.e. depths 0, 1, 2 — 1-indexed positions 1 through 2^3−1 = 7. It cannot be at any position 8 or beyond, since a node that deep already has 3 ancestors guaranteed smaller than it.

WHAT COMES NEXT

Hashing, the next topic, throws away ordering altogether: it does not care which element is biggest or smallest, only whether a given key is present, and it buys average O(1) for that question by giving up everything a heap or a BST can answer about relative order. Where this chapter showed that giving up a little order (BST's total order down to a heap's local order) buys speed, hashing is the same trade taken to its limit — no order at all, in exchange for constant time on the one question that matters for a hash table. Graph algorithms later in the course, especially Dijkstra's and Prim's, come back to reuse the heap directly: a priority queue keyed on "current best known distance" or "current best known edge weight" is exactly the engine both algorithms run on, and the decrease-key operation derived in this chapter is the specific call they make on every edge they examine.
`
};
