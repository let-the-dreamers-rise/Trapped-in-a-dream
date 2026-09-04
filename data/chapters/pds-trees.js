// Textbook chapter: Trees and Binary Search Trees.
//
// Full teaching text — written to be learned from directly, with every claim
// derived or demonstrated. Format matches renderTheory(): ALL-CAPS lines are
// headings, "• " a bullet, "1. " a numbered step, "KEY:" / "REMEMBER:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block,
// and [[FIG:id]] places a figure — either from figs below or from this
// topic's own theory.figs in data/questions/pds.js.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['pds-trees'] = {
  figs: [
    {
      id: 'avl-rotation-shapes',
      caption: 'The four AVL imbalance shapes. Each is named after the two edges you follow from the unbalanced node down to the newly inserted key.',
      svg: '<svg viewBox="0 0 400 150" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.4" fill="none"><circle cx="40" cy="18" r="10"/><circle cx="24" cy="55" r="10"/><circle cx="8" cy="92" r="10"/><line x1="40" y1="28" x2="24" y2="45"/><line x1="24" y1="65" x2="8" y2="82"/><circle cx="150" cy="18" r="10"/><circle cx="166" cy="55" r="10"/><circle cx="182" cy="92" r="10"/><line x1="150" y1="28" x2="166" y2="45"/><line x1="166" y1="65" x2="182" y2="82"/><circle cx="260" cy="18" r="10"/><circle cx="244" cy="55" r="10"/><circle cx="260" cy="92" r="10"/><line x1="260" y1="28" x2="244" y2="45"/><line x1="244" y1="65" x2="260" y2="82"/><circle cx="360" cy="18" r="10"/><circle cx="376" cy="55" r="10"/><circle cx="360" cy="92" r="10"/><line x1="360" y1="28" x2="376" y2="45"/><line x1="376" y1="65" x2="360" y2="82"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="24" y="125">LL</text><text x="166" y="125">RR</text><text x="252" y="125">LR</text><text x="368" y="125">RL</text></g><g font-size="10" fill="currentColor" text-anchor="middle" opacity=".75"><text x="24" y="140">single right</text><text x="166" y="140">single left</text><text x="252" y="140">left then right</text><text x="368" y="140">right then left</text></g></svg>'
    },
    {
      id: 'lcrs-general-tree',
      caption: 'A general tree with a 3-way branch, and the same tree in left-child right-sibling binary form. Every general tree becomes exactly one binary tree this way.',
      svg: '<svg viewBox="0 0 360 170" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" fill="currentColor"><text x="70" y="14" text-anchor="middle">general tree</text><text x="260" y="14" text-anchor="middle">left-child / right-sibling</text></g><g stroke="currentColor" stroke-width="1.4" fill="none"><circle cx="70" cy="35" r="12"/><circle cx="30" cy="90" r="12"/><circle cx="70" cy="90" r="12"/><circle cx="110" cy="90" r="12"/><line x1="70" y1="46" x2="30" y2="79"/><line x1="70" y1="46" x2="70" y2="79"/><line x1="70" y1="46" x2="110" y2="79"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="70" y="39">A</text><text x="30" y="94">B</text><text x="70" y="94">C</text><text x="110" y="94">D</text></g><g stroke="currentColor" stroke-width="1.4" fill="none"><circle cx="230" cy="35" r="12"/><circle cx="230" cy="90" r="12"/><circle cx="280" cy="90" r="12"/><circle cx="330" cy="90" r="12"/><line x1="230" y1="47" x2="230" y2="78"/><line x1="242" y1="90" x2="268" y2="90"/><line x1="292" y1="90" x2="318" y2="90"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="230" y="39">A</text><text x="230" y="94">B</text><text x="280" y="94">C</text><text x="330" y="94">D</text></g><g font-size="10" fill="currentColor" text-anchor="middle" opacity=".8"><text x="230" y="112">left = first child</text><text x="280" y="112">right = next sibling</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

Every data structure so far in this course has been linear: an array, a stack, a queue, a linked list — one thing after another. A tree is the first structure that is genuinely hierarchical, and it exists because a lot of real data is hierarchical too — a file system, an organisation chart, the way a compiler breaks an expression into sub-expressions, the way a decision unfolds into cases. Linear structures cannot represent "this thing has several parts, and each part has several parts of its own" without a lot of awkward bookkeeping. Trees represent it directly.

The special case that dominates this chapter is the binary search tree — a tree with an ordering rule strong enough to make searching, inserting and deleting run in time proportional to the tree's height rather than its size, the way a sorted array supports binary search but without the cost of shifting elements to insert. We will build up to it carefully: what a tree is made of, how to count things in it, the shapes it can take, how to walk it, how to rebuild it from a record of a walk, and only then the search-tree property itself, its operations, and what happens when it degenerates. The chapter ends with a preview of AVL and red-black trees, which exist purely to stop that degeneration from happening. Everything after this — heaps, hashing, graphs — either specialises a tree or borrows its vocabulary, so the definitions below are worth getting exactly right.

WHAT A TREE IS

A tree is a collection of nodes connected by edges such that there is exactly one node with no incoming edge (the root), and every other node has exactly one edge coming into it, from exactly one other node. Follow edges backward from any node and you always reach the root by a unique path — there are no cycles, and there is no way to reach a node by two different routes.

That "exactly one path to any node" property is what makes a tree a tree and not just any connected graph. It also gives the vocabulary its shape: since the path to a node is unique, you can talk unambiguously about the node just before it on that path, and the nodes just after it.

• The parent of a node is the node immediately above it on the unique path to the root — the one node with an edge pointing down to it.
• The children of a node are the nodes it has an edge pointing down to. A node can have zero, one, two, or more children depending on the kind of tree.
• Two nodes with the same parent are siblings.
• A node with no children is a leaf (also called an external node).
• A node with at least one child is an internal node.
• An edge is the connection between a parent and a child — the thing you draw as a line.
• A path is a sequence of nodes connected by edges, each one the parent of the next.
• The ancestors of a node are every node on the path from it up to the root (its parent, its parent's parent, and so on, including the root, but usually not counting the node itself). The descendants of a node are every node reachable by going down from it — its children, their children, and so on.
• The subtree rooted at a node is that node together with all of its descendants, considered as a tree in its own right, with that node as the new root.
• The degree of a node is its number of children. The degree of a tree is the maximum degree among all its nodes — a binary tree, by definition, is a tree of degree at most 2.

KEY: Ancestor and descendant are relative terms, not absolute ones — a node is an ancestor of everything below it and a descendant of everything above it. The root is an ancestor of every other node in the tree; every other node is a descendant of the root.

DEPTH, LEVEL AND HEIGHT — AND WHERE THEY DISAGREE

Three more measurements matter, and this is where students lose marks, because different books number them differently. We will fix one convention, use it throughout, and name the alternative explicitly so a question phrased the other way does not surprise you.

The depth of a node is the number of edges on the path from the root down to that node. The root itself has depth 0, because there are no edges between it and itself. A child of the root has depth 1. A grandchild has depth 2.

The level of a node is usually just another name for its depth plus one — root at level 1, its children at level 2, and so on — though some texts use "level" as a direct synonym for depth, with the root at level 0. Whichever a question uses, it will say so or make it obvious from an example; the formulas in this chapter are all written in terms of depth to avoid the ambiguity.

The height of a node is the number of edges on the longest downward path from that node to a leaf in its subtree. A leaf therefore has height 0 — the longest path from a leaf to a leaf below it has zero edges, because there is nothing below it. The height of the tree is the height of its root: the length of the longest root-to-leaf path anywhere in the tree.

GATE TRAP: The GATE convention — and the one this chapter uses — is that a single-node tree has height 0, matching "height = edges on the longest downward path". Some other textbooks instead define height as the number of NODES on the longest downward path, which makes a single-node tree have height 1 and shifts every height-based formula by one. If a question's numbers don't match a formula you've memorised, check which convention it is using before assuming you made an arithmetic error.

REMEMBER: Depth counts edges from the root DOWN to a node; height counts edges from a node DOWN to its deepest leaf. A leaf has height 0 always. The root's depth is always 0. The two measurements move in opposite directions along the same tree.

HOW MANY EDGES DOES A TREE WITH n NODES HAVE?

Before touching binary trees specifically, one fact is worth deriving because it is used constantly afterward: a tree with n nodes has exactly n − 1 edges.

Why must this be true? Every node except the root has exactly one edge coming into it, from its parent — that is what makes it a tree rather than some more general connected graph. So the number of edges equals the number of nodes that HAVE a parent, and every node has a parent except the root itself.

1. Base case: a tree with 1 node (just the root) has 0 edges. n − 1 = 1 − 1 = 0. Holds.

2. Inductive step: suppose every tree with k nodes has k − 1 edges. Take a tree with k + 1 nodes. Remove any leaf (a tree with more than one node always has at least one leaf, since following any downward path must eventually stop). What remains is a valid tree with k nodes, which by the inductive hypothesis has k − 1 edges. Adding the removed leaf back adds exactly one node and exactly one edge — the single edge connecting it to its parent — giving k nodes + 1 = k + 1 nodes and k − 1 edges + 1 = k edges. That matches (k + 1) − 1 = k. Holds.

By induction, every tree with n nodes has n − 1 edges, for every n ≥ 1.

n − 1 = number of edges in a tree with n nodes

This single identity is the engine behind the leaf-counting formula in the next section, so make sure the reasoning — not just the formula — is solid before moving on.

THE LEAF-COUNT IDENTITY: n0 = n2 + 1

Split the nodes of a binary tree into three groups by how many children they have: n0 is the count of nodes with zero children (leaves), n1 the count with exactly one child, and n2 the count with exactly two children. GATE's favourite identity relating them is:

n0 = n2 + 1

This is usually introduced only for FULL binary trees (every node has 0 or 2 children, so n1 = 0), but it is worth deriving in general, because the general derivation is what makes it obviously true rather than a memorised trick — and it turns out to hold for every binary tree, whether or not any node has exactly one child.

1. Total nodes: n = n0 + n1 + n2.

2. Total edges, counted top-down: every node contributes exactly as many edges as it has children, so summing degrees over all nodes gives total edges = 0·n0 + 1·n1 + 2·n2 = n1 + 2n2.

3. Total edges, counted the other way: by the n − 1 identity just derived, total edges = n − 1.

4. Set the two edge counts equal: n1 + 2n2 = n − 1 = (n0 + n1 + n2) − 1.

5. Cancel n1 from both sides: 2n2 = n0 + n2 − 1.

6. Rearrange: n2 = n0 − 1, which is exactly n0 = n2 + 1.

KEY: n0 = n2 + 1 holds for every binary tree, regardless of how many one-child nodes it has, because the n1 terms cancel out of the edge-counting argument entirely. For a FULL binary tree specifically (n1 = 0), this also means every internal node has exactly two children, so "leaves = internal nodes + 1" and "leaves = two-children nodes + 1" say the same thing.

Two corollaries follow immediately and are worth having ready as formulas, since they turn a two-step derivation into a one-line lookup on exam day.

For a full binary tree with n0 leaves: total nodes = n0 + n2 = n0 + (n0 − 1) = 2n0 − 1.

total nodes = 2 × (leaves) − 1   (full binary tree)

GATE TRAP: "Full" and "strict" are used interchangeably by most sources for "every node has 0 or 2 children" — but a minority of books instead use "full binary tree" to mean every LEVEL is completely filled (what this chapter calls perfect, below), reserving "strict binary tree" for the 0-or-2 definition. If a question's answer only makes sense under one reading, check which one it intends; this chapter always says "0 or 2 children" explicitly to sidestep the naming clash.

HOW MANY NODES CAN FIT: LEVEL, HEIGHT AND MINIMUM-HEIGHT BOUNDS

A binary tree's shape puts a hard ceiling on how many nodes can exist at a given depth, and therefore on how many can exist within a given height. Both bounds are worth deriving rather than memorising, because the same reasoning also gives the FLOOR on height for a given node count — the fact that makes balanced trees valuable in the first place.

1. At depth 0 there is at most 1 node — the root, and there can only be one.

2. Each node at depth d has at most 2 children, so depth d + 1 has at most twice as many nodes as depth d can have.

3. By induction, depth d has at most 2^d nodes: true at d = 0 (2^0 = 1), and if depth d has at most 2^d, depth d + 1 has at most 2 × 2^d = 2^(d+1).

maximum nodes at depth d = 2^d

4. Summing over every depth from 0 up to the tree's height h gives the maximum total node count: 2^0 + 2^1 + ... + 2^h. This is a geometric series with ratio 2, which sums to 2^(h+1) − 1.

maximum nodes in a tree of height h = 2^(h+1) − 1

This maximum is achieved exactly when every level from 0 to h is completely full — the shape this chapter calls a perfect binary tree, defined precisely in the next section.

5. Turning the bound around gives the MINIMUM possible height for a tree with n nodes. Since n nodes can never exceed the maximum for height h, we need 2^(h+1) − 1 ≥ n, i.e. 2^(h+1) ≥ n + 1, i.e. h + 1 ≥ log2(n + 1), i.e. h ≥ log2(n + 1) − 1. Since h must be a whole number, the smallest height that can actually hold n nodes is the ceiling of that bound:

minimum height for n nodes = ceil(log2(n + 1)) − 1

Check it against a small case: n = 7 nodes. log2(8) = 3 exactly, so minimum height = 3 − 1 = 2 — the perfect 3-level tree (1 root, 2, then 4 nodes) achieves exactly this, confirming the bound is tight when n itself is one less than a power of two.

REMEMBER: 2^d bounds a single LEVEL; 2^(h+1) − 1 bounds the WHOLE TREE up to height h; ceil(log2(n+1)) − 1 is that second formula solved backwards for the minimum height a given n can be squeezed into. All three come from the same doubling argument.

THE DIAMETER OF A TREE

One more measurement, built directly on height, appears often enough to earn its own section: the diameter of a tree is the number of edges on the longest path between ANY two nodes — not necessarily through the root.

The key realisation is that the longest path through a particular node N equals the height of N's left subtree, plus the height of N's right subtree, plus 2 (the two edges connecting N itself to the deepest node on each side). The diameter of the whole tree is the maximum of this quantity over every node, since the longest path overall must pass through some highest common node on its route.

To make the empty-subtree case work cleanly, define height(empty subtree) = −1. Then a leaf, with two empty subtrees, gets height = 1 + max(−1, −1) = 0, matching the height convention already fixed above.

Trace it on a small tree: root A, left child B, right child C; B's left child D, right child E; D's left child F (every other pointer null).

1. height(F) = 0 (leaf).
2. height(D) = 1 + max(height(F), height(empty)) = 1 + max(0, −1) = 1.
3. height(E) = 0 (leaf).
4. height(B) = 1 + max(height(D), height(E)) = 1 + max(1, 0) = 2.
5. height(C) = 0 (leaf).
6. height(A) = 1 + max(height(B), height(C)) = 1 + max(2, 0) = 3.
7. Diameter candidate at each node = leftHeight + rightHeight + 2. At F: −1 + −1 + 2 = 0. At D: 0 + −1 + 2 = 1. At B: 1 + 0 + 2 = 3. At C: −1 + −1 + 2 = 0. At A: 2 + 0 + 2 = 4.
8. The maximum over all nodes is 4, at A — the path F–D–B–A–C, which does pass through the root here, but need not in general.

GATE TRAP: The diameter is NOT simply twice the depth of the deepest leaf. That mistake would give 2 × 3 = 6 here, counting a path that goes down to F and back up the SAME way, which visits F twice and is not a simple path between two distinct nodes. The correct path runs from one deep leaf, up through the point where the two branches meet, and back down a DIFFERENT branch — it only passes through the root if the two overall deepest branches happen to be on opposite sides of the root, which is not guaranteed for an arbitrary tree.

The same reasoning generalises past binary trees: for a general tree, the diameter contribution at a node is its two LARGEST child-subtree heights added together plus 2, maximised over every node — swap "left and right height" for "two biggest of however many children a node has" and the formula still works.

TYPES OF BINARY TREE

With the vocabulary and the counting identities in hand, here are the shapes that recur constantly, each defined precisely because they are easy to blur together.

[[FIG:complete-full]]

A full (or strict) binary tree: every node has either 0 or 2 children — never exactly 1. This is the shape the n0 = n2 + 1 and 2n0 − 1 identities above describe most cleanly, since n1 = 0 for them.

A complete binary tree: every level is completely filled EXCEPT possibly the last one, and the last level's nodes are filled strictly left to right, with no gaps. A complete tree need not be full — its last level can end mid-way, leaving some node with only a left child and no right child, provided nothing to its right at that level is filled either.

A perfect binary tree: every leaf is at the same depth, and consequently every internal node has exactly two children. A perfect tree of height h has exactly the maximum possible node count for that height: 2^(h+1) − 1, with all n0 = n2 + 1 slack used up in the leaves at the bottom row. Every perfect tree is complete (trivially — there is no partial last level) and full (every internal node has two children); the converse is not true of either.

A degenerate (or skewed) binary tree: every node has at most one child, so the tree is really a linked list wearing a tree's clothes. Its height for n nodes is the worst possible, n − 1, since each node adds exactly one more level.

A balanced binary tree: informally, one whose height stays close to the logarithmic minimum rather than growing linearly with n — made precise later in this chapter by AVL's balance-factor rule, but the general idea (height is O(log n), not O(n)) is what every self-balancing scheme is trying to guarantee.

GATE TRAP: Complete and perfect are not the same thing, and this is tested constantly. A complete tree with 6 nodes (levels 0 and 1 full, level 2 has 2 of its possible 4 nodes, filled left to right) is NOT perfect, because its leaves sit at two different depths (the 2 nodes on the partial last level are at depth 2; whichever level-1 node has no children of its own would have its lone remaining slot as a leaf at depth 1 — check any concrete 6-node complete tree and you will find leaves at both depth 1 and depth 2). A perfect tree, by contrast, is always complete AND full simultaneously, because its shape is the single most constrained of the three.

REPRESENTING A BINARY TREE IN MEMORY

There are two standard ways to store a binary tree, and the choice between them is a genuine engineering trade-off, not just a syntax difference.

The linked representation gives each node a small record: its data, plus a pointer to its left child and a pointer to its right child (each null when that child is absent).

struct Node {
    int data;
    struct Node *left;
    struct Node *right;
};

This is the general-purpose representation — it wastes no space on absent children beyond a null pointer, and it works for any shape, including badly skewed ones.

The array representation instead stores the tree's nodes in a single array, positions chosen so that a node's array index alone determines where its children live — no pointers needed at all. Fix the root at index 1 (1-indexed). If a node is at index i, put its left child at index 2i and its right child at index 2i + 1.

Why does this work? Because it mirrors the level-by-level doubling from the level-count derivation above: level 0 occupies index 1 (one slot, 2^0), level 1 occupies indices 2 and 3 (two slots, 2^1), level 2 occupies indices 4 through 7 (four slots, 2^2), and so on — each level's block of indices is exactly twice as wide as the one before, which is precisely what "left child at 2i, right child at 2i+1" produces when applied recursively from the root.

Inverting the formula gives the parent of node i: divide i by 2 and discard the remainder, i.e. parent(i) = floor(i / 2). Check it: node 15's parent is floor(15/2) = 7, and node 7's children are indeed 2×7 = 14 and 2×7+1 = 15.

If you would rather start indexing from 0 (as most array-based languages do internally), shift every formula down by one: root at index 0, node i has children at 2i + 1 and 2i + 2, and parent(i) = floor((i − 1) / 2). Both conventions describe the same layout; only the starting offset differs.

array (1-indexed): left = 2i, right = 2i + 1, parent = floor(i / 2)
array (0-indexed): left = 2i + 1, right = 2i + 2, parent = floor((i − 1) / 2)

The array representation is compact and pointer-free, and it is the standard choice for a COMPLETE binary tree specifically — a heap, for instance, always uses it — because a complete tree's nodes fill the array with no gaps at all, from index 1 (or 0) straight through to n.

GATE TRAP: The array representation is a poor choice for a general or skewed tree, precisely because the index a node occupies is fixed by ITS POSITION IN A PERFECT TREE OF THAT HEIGHT, not by how many nodes actually exist. A left-skewed chain of n nodes, each one only a left child of the previous, lands at 1-indexed positions 1, 2, 4, 8, 16, ..., 2^(n−1) — the array must be sized at least 2^(n−1) to hold the last node, which is exponential in n for a tree that only has n nodes in it. This is exactly why array representation is reserved for complete trees: only there does the index range stay proportional to n.

TRAVERSALS: VISITING EVERY NODE IN A DEFINITE ORDER

A traversal visits every node in a tree exactly once, in an order fixed by a rule. Three depth-first orders differ only in WHEN the current node itself is visited relative to its two subtrees; a fourth, breadth-first order, ignores subtrees entirely and works level by level. All three depth-first orders recurse identically — visit left subtree, visit right subtree, visit the node — just in a different sequence.

Preorder (root, left, right): visit the node itself first, then recurse on the left subtree, then the right.

void preorder(Node *n) {
    if (n == NULL) return;
    visit(n);
    preorder(n->left);
    preorder(n->right);
}

Inorder (left, root, right): recurse left first, visit the node in between, then recurse right.

void inorder(Node *n) {
    if (n == NULL) return;
    inorder(n->left);
    visit(n);
    inorder(n->right);
}

Postorder (left, right, root): recurse both subtrees fully before visiting the node itself.

void postorder(Node *n) {
    if (n == NULL) return;
    postorder(n->left);
    postorder(n->right);
    visit(n);
}

Trace all three on one small tree: root 1, left child 2, right child 3; 2's left child is 4, 2's right child is 5 (3 is a leaf).

[[FIG:traversal-orders]]

Preorder: visit 1, recurse left into 2's subtree (visit 2, recurse left into 4 — leaf, visit 4 — recurse right into 5 — leaf, visit 5), then recurse right into 3 — leaf, visit 3. Output: 1 2 4 5 3.

Inorder: recurse left into 2's subtree first (recurse left into 4 — leaf, visit 4 — visit 2 — recurse right into 5 — leaf, visit 5), then visit 1, then recurse right into 3 — visit 3. Output: 4 2 5 1 3.

Postorder: recurse left into 2's subtree fully (recurse into 4 — visit 4 — recurse into 5 — visit 5 — visit 2), then recurse right into 3 fully (visit 3), then visit 1 last. Output: 4 5 2 3 1.

REMEMBER: The three orders are named after WHERE the root falls relative to its two subtrees in the output: preorder puts it first, inorder puts it in the middle (between the left and right subtree's own outputs), postorder puts it last. This single fact is exactly what makes tree reconstruction from a traversal pair possible, below.

LEVEL-ORDER TRAVERSAL

Level-order (or breadth-first) traversal visits the root, then all nodes at depth 1, then all at depth 2, and so on — level by level, left to right within each level. None of the three depth-first orders can produce this directly, because recursion naturally dives all the way down one branch before coming back; level-order needs a queue instead.

The algorithm: enqueue the root. Then repeatedly dequeue a node, visit it, and enqueue its children (left first, then right) if they exist. Stop when the queue is empty.

Trace it on the same tree (root 1, left 2, right 3; 2's children 4 and 5):

1. Enqueue 1. Queue: [1].
2. Dequeue 1, visit it, enqueue its children 2 and 3. Queue: [2, 3]. Output so far: 1.
3. Dequeue 2, visit it, enqueue its children 4 and 5. Queue: [3, 4, 5]. Output so far: 1 2.
4. Dequeue 3, visit it; 3 has no children, nothing enqueued. Queue: [4, 5]. Output so far: 1 2 3.
5. Dequeue 4, visit it; no children. Queue: [5]. Output so far: 1 2 3 4.
6. Dequeue 5, visit it; no children. Queue: []. Output so far: 1 2 3 4 5.
7. Queue is empty — stop.

Level-order output: 1 2 3 4 5.

GATE TRAP: Level-order and inorder can look deceptively similar on a small tree, but they encode completely different information — level-order groups nodes by DISTANCE FROM THE ROOT, inorder groups them by POSITION LEFT-TO-RIGHT within the tree's structure. On a genuinely skewed tree the two outputs diverge sharply, and a bare level-order sequence (with no markers for missing children) cannot in general be inverted back into a unique tree shape, unlike a preorder-inorder pair — many different shapes can share the same level-order value list once children start being absent at irregular positions.

ITERATIVE INORDER WITH AN EXPLICIT STACK

The recursive definitions above are the clearest way to state a traversal, but recursion is just an implicit stack managed by the call mechanism. Making that stack explicit lets you traverse iteratively — useful when recursion depth is a concern, and a common thing GATE asks you to trace by hand.

The idea: to visit a node in inorder, you must first exhaust everything in its left subtree. So walk left from the current node, pushing every node you pass onto a stack, until you hit a null pointer. Then pop the stack (that popped node has no more unvisited left descendants, so it's next in inorder order), visit it, and move to ITS right child — repeating the same "walk left, pushing everything" process from there.

Trace it on the same tree (root 1, left 2 with children 4 and 5, right 3):

1. current = 1. Push 1. Stack: [1]. current = 1.left = 2.
2. Push 2. Stack: [1, 2]. current = 2.left = 4.
3. Push 4. Stack: [1, 2, 4]. current = 4.left = null — stop walking left.
4. Pop 4, visit it. Output: 4. current = 4.right = null.
5. Nothing to push (current is null). Pop 2, visit it. Output: 4 2. current = 2.right = 5.
6. Push 5. Stack: [1, 5]. current = 5.left = null — stop walking left.
7. Pop 5, visit it. Output: 4 2 5. current = 5.right = null.
8. Nothing to push. Pop 1, visit it. Output: 4 2 5 1. current = 1.right = 3.
9. Push 3. Stack: [3]. current = 3.left = null — stop walking left.
10. Pop 3, visit it. Output: 4 2 5 1 3. current = 3.right = null. Stack is empty and current is null — done.

Final output: 4 2 5 1 3 — matching the recursive inorder trace exactly, as it must.

RECONSTRUCTING A TREE FROM ITS TRAVERSALS

Given only a written record of a traversal, can you draw back the exact tree that produced it? The answer depends entirely on WHICH pair of traversals you are given, and the reasoning is a direct application of "preorder puts the root first, inorder puts the root in the middle, postorder puts the root last."

Preorder + inorder is always sufficient, for any binary tree with distinct keys. Preorder's first element is the tree's root. Find that value inside the inorder sequence: everything to its LEFT in the inorder list is exactly the set of keys in the root's left subtree, and everything to its RIGHT is exactly the right subtree's keys — because inorder visits the whole left subtree, then the root, then the whole right subtree. Knowing the SIZE of the left subtree (how many keys sit to the left of the root in inorder) tells you how to split the REST of preorder too: the next that-many entries of preorder (after the root) are the left subtree's own preorder, and everything after that is the right subtree's preorder. Recurse on each half.

Trace it: preorder = 1 2 4 5 3, inorder = 4 2 5 1 3 (the same tree traversed above).

1. Preorder's first element, 1, is the root.
2. Find 1 in the inorder list 4 2 5 1 3: it splits into left-inorder = [4, 2, 5] (3 keys) and right-inorder = [3] (1 key).
3. The left subtree has 3 keys, so the next 3 elements of preorder after the root — 2, 4, 5 — are the left subtree's preorder. What remains, [3], is the right subtree's preorder.
4. Recurse left: preorder [2, 4, 5], inorder [4, 2, 5]. Root of this subtree is 2 (first of its preorder). In its inorder, 2 splits into left = [4], right = [5]. Left preorder = [4] (root, leaf). Right preorder = [5] (root, leaf). So node 2 has left child 4 and right child 5.
5. Recurse right: preorder [3], inorder [3]. A single node — 3 is a leaf, attached as the root's right child.
6. Assemble: root 1, left child 2 (itself with left child 4, right child 5), right child 3. This is exactly the original tree.

Postorder + inorder works by the mirror-image rule — postorder's LAST element is the root instead of the first — and the same splitting-and-recursing argument applies, so it is equally always sufficient.

Preorder + postorder is NOT always sufficient, and the reason is specific: this pair cannot tell whether a node with only ONE child has that child on its left or its right. Take the smallest possible example — two nodes, a root R with a single child X. If X is R's LEFT child: preorder = R X, postorder = X R. If X is R's RIGHT child: preorder = R X, postorder = X R — identical in both cases. Two different trees, same preorder and same postorder. This ambiguity can only arise at a node with exactly one child; it disappears if the tree is guaranteed FULL (every node has 0 or 2 children), because then there is never a single child to be ambiguous about — in a full tree, preorder + postorder together ARE always sufficient.

KEY: Preorder+inorder and postorder+inorder always determine a unique tree. Preorder+postorder only does so when the tree is additionally known to be full. Level-order alone, or level-order paired with anything but inorder, is generally NOT sufficient without explicit null markers for missing children.

GATE TRAP: A question that gives preorder and postorder without saying the tree is full is usually asking you to COUNT how many distinct trees are consistent with both sequences, not to reconstruct "the" tree — because in general there is more than one. Each node along the path that has only one child in every consistent tree contributes a factor of 2 (that child could be placed left or right), and the total count is 2 raised to the number of such ambiguous nodes.

COUNTING SHAPES: HOW MANY BINARY TREES ARE THERE ON n NODES?

Fix a number of nodes n, but ask only about the SHAPE — ignore what values are stored where. How many structurally distinct binary trees exist with exactly n nodes?

Build the count recursively, the same way you would build a tree: pick some node to be the root, then decide, independently, on a shape for its left subtree and a shape for its right subtree. If the root's left subtree has k nodes, the right subtree has the remaining n − 1 − k nodes (the root itself is the "−1"). Let T(n) denote the number of distinct shapes with n nodes; then for a fixed left-subtree size k, the number of trees is T(k) × T(n − 1 − k) — every left shape can be paired with every right shape independently. Summing over every possible k from 0 to n − 1:

T(n) = sum over k = 0 to n−1 of T(k) × T(n − 1 − k),   T(0) = 1

This is exactly the defining recurrence of the Catalan numbers, usually written C(n), with the closed form:

C(n) = (2n)! / (n! × (n+1)!) = C(2n, n) / (n + 1)

Build the table from the recurrence directly, since it is faster and less error-prone than the factorial formula for small n:

C(0) = 1 (the empty tree — exactly one way to have zero nodes)
C(1) = C(0)C(0) = 1
C(2) = C(0)C(1) + C(1)C(0) = 1 + 1 = 2
C(3) = C(0)C(2) + C(1)C(1) + C(2)C(0) = 2 + 1 + 2 = 5
C(4) = C(0)C(3) + C(1)C(2) + C(2)C(1) + C(3)C(0) = 5 + 2 + 2 + 5 = 14
C(5) = C(0)C(4) + C(1)C(3) + C(2)C(2) + C(3)C(1) + C(4)C(0) = 14 + 5 + 4 + 5 + 14 = 42

number of distinct binary tree shapes on n nodes = C(n), the nth Catalan number

Draw out all C(3) = 5 shapes on 3 unlabeled nodes explicitly, since seeing the full set is what makes the recurrence's "split by left-subtree size" logic concrete. Grouping by left-subtree size k (0, 1, or 2):

k = 0 (empty left, 2-node right subtree — 2 shapes, since C(2) = 2):

  root
    (no left)
    right
      (no left)
      right

  root
    (no left)
    right
      left
      (no right)

k = 1 (1-node left, 1-node right — C(1)×C(1) = 1 shape):

  root
    left
    right

k = 2 (2-node left, empty right — 2 shapes, since C(2) = 2):

  root
    left
      (no left)
      right
    (no right)

  root
    left
      left
      (no right)
    (no right)

That is 2 + 1 + 2 = 5 shapes in total, matching C(3) = 5 exactly.

Now the connection to BSTs. Given n DISTINCT keys, how many different binary search trees can hold them? Fix any one of the C(n) shapes: is there more than one way to place the n distinct keys into it while satisfying the BST ordering rule? No — exactly one. The BST property forces the inorder traversal to be the sorted order of the keys (proved in the next section), and a tree's SHAPE together with a required inorder sequence determines a unique labelling: walk the shape in inorder and hand out the sorted keys in order as you go. So every shape corresponds to exactly one valid BST, and:

number of distinct BSTs storable on n distinct keys = C(n), the same Catalan number

If instead you drop the BST ordering requirement and ask how many LABELLED binary trees exist on n distinct keys — any of the C(n) shapes, with the n keys assigned to its n positions in ANY of the n! possible ways, since nothing constrains the assignment — the multiplication principle gives:

number of distinct labelled binary trees on n distinct keys = n! × C(n)

For n = 3: 3! × C(3) = 6 × 5 = 30. Compare the three counts for n = 3 side by side: 5 distinct shapes, 5 distinct BSTs (one per shape, forced), 30 distinct labelled trees (6 key-arrangements per shape). The BST count matching the shape count, while the unconstrained-labelling count is six times larger, is exactly why this triple of numbers is worth holding in mind together rather than memorising in isolation.

GATE TRAP: A very common wrong answer to "how many BSTs on n keys" is n! (mistaking it for the number of ways to permute the keys) or n! × C(n) (mistaking it for the unconstrained-labelling count above). The BST-specific answer is C(n) alone, precisely because the ordering rule removes the freedom that labelling would otherwise add.

EXPRESSION TREES

An expression tree encodes an arithmetic expression: every leaf holds an operand (a number or variable), and every internal node holds an operator, with its two subtrees holding the operator's two operand expressions.

Take (A + B) × C. Its expression tree has root × (the outermost operation), with a right child C (a leaf) and a left child + (an internal node), whose own two children are the leaves A and B.

Each traversal recovers a different standard notation for the same expression:

• Inorder (left, root, right) recovers infix notation — the form you write by hand — provided you add parentheses around every operator's output to preserve the original grouping: inorder gives A + B × C token by token, and reinserting the parentheses that the tree's structure implies gives (A + B) × C.
• Preorder (root, left, right) recovers prefix (Polish) notation directly, with no parentheses needed, because the operator always precedes its own operands: × + A B C.
• Postorder (left, right, root) recovers postfix (reverse Polish) notation, again parenthesis-free, because the operator always follows its own operands: A B + C ×.

This is precisely why postfix expressions are convenient for evaluation with a stack: scanning left to right, an operand is pushed, and an operator pops its two most recent operands, applies itself, and pushes the result back — the postorder-visits-root-last property guarantees both operands are already on the stack by the time their operator is reached.

THE BINARY SEARCH TREE PROPERTY

Every idea so far applies to any binary tree. A binary search tree (BST) adds exactly one rule, applied at every single node:

For every node N, every key in N's left subtree is strictly less than N's key, and every key in N's right subtree is strictly greater than N's key.

Crucially, this must hold RECURSIVELY, for every node, not just for the root and its immediate children. A tree where the root's left child is smaller and right child is larger, but some grandchild deep in the left subtree happens to be larger than the root, is NOT a valid BST — that grandchild violates the rule at the root even though it satisfies it at its own immediate parent.

KEY: The BST property is a statement about every node's ENTIRE subtree on each side, not just its direct children. Checking only "left child < node < right child" at each node locally is not enough to certify a valid BST; a node several levels down could still be out of range relative to a distant ancestor.

SEARCHING A BST

Because every node splits its subtree into "smaller" and "larger" halves, searching for a key needs to look at only ONE path from the root, never branching to explore both sides.

1. Start at the root. If the tree is empty, the key is not present — stop.
2. Compare the target key to the current node's key. If equal, found — stop.
3. If the target is smaller, recurse into the left subtree (repeat from step 2 there); if larger, recurse into the right subtree.
4. If a recursion reaches an empty subtree without finding a match, the key is not present.

Every step discards one entire subtree from consideration, exactly the way binary search on a sorted array discards half the remaining array each time — the search touches at most one node per level, so its cost is bounded by the tree's height.

INSERTING INTO A BST

Insertion is search that fails, followed by attaching a new leaf at the exact point the search fell off the tree. Search for the key as above; when you reach an empty subtree (a null pointer) instead of finding the key, put the new node there.

Trace inserting the sequence 5, 3, 8, 1, 4, 7, 9, one key at a time, into an initially empty tree:

1. Insert 5: tree is empty, 5 becomes the root.
2. Insert 3: 3 < 5, go left of 5; that spot is empty, so 3 becomes 5's left child.
3. Insert 8: 8 > 5, go right of 5; empty, so 8 becomes 5's right child.
4. Insert 1: 1 < 5, go left to 3; 1 < 3, go left of 3; empty, so 1 becomes 3's left child.
5. Insert 4: 4 < 5, go left to 3; 4 > 3, go right of 3; empty, so 4 becomes 3's right child.
6. Insert 7: 7 > 5, go right to 8; 7 < 8, go left of 8; empty, so 7 becomes 8's left child.
7. Insert 9: 9 > 5, go right to 8; 9 > 8, go right of 8; empty, so 9 becomes 8's right child.

[[FIG:bst-insert]]

Final tree: root 5; left child 3 (children 1 and 4); right child 8 (children 7 and 9). Every leaf (1, 4, 7, 9) sits at depth 2, so the height of this tree is 2.

THE SHAPE OF A BST DEPENDS ON INSERTION ORDER

The same SET of keys, inserted in a different ORDER, can produce a completely different tree — the BST property constrains the relative left/right position of keys once they're placed, but says nothing about the order they arrive in, and that order is what decides the shape.

Insert the same seven keys — but now in already-sorted order: 1, 3, 4, 5, 7, 8, 9.

1. Insert 1: root.
2. Insert 3: 3 > 1, becomes 1's right child (there is no smaller key yet to send it left).
3. Insert 4: 4 > 1, go right to 3; 4 > 3, becomes 3's right child.
4. Insert 5: greater than every key already present, so it walks all the way right and becomes 4's right child.
5. Insert 7: same reasoning, becomes 5's right child.
6. Insert 8: becomes 7's right child.
7. Insert 9: becomes 8's right child.

Every key after the first becomes the right child of the previously-inserted node, because each new key is larger than everything already in the tree. The result is a single rightward chain — a degenerate tree — of height 6, compared to height 2 for the same 7 keys inserted in the earlier, alternating order.

height with sorted insertion order = n − 1  (fully degenerate)
height with the earlier order = 2  (much closer to the minimum, ceil(log2 8) − 1 = 2)

GATE TRAP: "If n is fixed, the BST's height is determined" is false — height depends on insertion ORDER, not just on which keys are present. A question giving you a sequence of insertions is asking about THAT specific order's resulting shape, and a different permutation of the same keys would generally give a different height.

WHY INORDER TRAVERSAL OF A BST IS ALWAYS SORTED

This is the single most-tested BST fact, and it follows directly from the definitions of inorder and of the BST property, with no extra machinery needed.

Inorder visits, recursively: the entire left subtree, then the node itself, then the entire right subtree. The BST property guarantees every key in the left subtree is smaller than the node, and every key in the right subtree is larger. So inorder visits "everything smaller than N" (in some order, decided recursively the same way), then N, then "everything larger than N" (likewise). Applying this same guarantee at every node, all the way down, means at every single step of the traversal, the next value visited is guaranteed to be no smaller than everything visited so far — which is exactly the definition of visiting keys in non-decreasing (here, since keys are distinct, strictly increasing) order.

KEY: Inorder-gives-sorted-order is a consequence of pairing a specific traversal order with a specific structural invariant — it is not a property of binary trees in general (preorder and postorder never sort anything, on any tree), and it is not automatic for any random ordering rule — it works because "left is smaller, right is larger" recursively matches "visit left, then self, then right" exactly.

MINIMUM, MAXIMUM, SUCCESSOR AND PREDECESSOR

Two more BST operations follow immediately from the ordering property and are the building blocks of deletion, covered next.

The minimum key in a BST (or in any subtree of it) is found by starting at that subtree's root and walking LEFT repeatedly until there is no left child left to follow — the node you land on is the minimum, because the BST property guarantees nothing smaller exists anywhere to its right or above the path you walked. The maximum is found the mirror way, walking RIGHT repeatedly.

The inorder successor of a node is the next key that would be visited immediately after it in an inorder traversal — the smallest key strictly greater than it. Two cases:

• If the node has a right child, the successor is the MINIMUM of that right subtree (walk right once, then left as far as possible) — everything in the right subtree is already known to be larger than the node, and its minimum is the smallest of those, hence the smallest value greater than the node overall.
• If the node has no right child, the successor must be found by walking UP instead: it is the nearest ancestor for which the node lies in that ancestor's LEFT subtree. Everything in that ancestor's left subtree (including the node itself) is smaller than the ancestor, making the ancestor the smallest value that is still larger than the node.

Trace the no-right-child case on the BST containing {2, 5, 9, 12, 18, 21, 30}, arranged so that 18 has no right child, and find 18's successor without parent pointers, walking down from the root:

1. Compare the target 18 against the root as you descend, and record every node at which the search branches LEFT (target smaller than the current node) — these are exactly the ancestors for which the target lies in their left subtree.
2. The LAST such recorded node — the one closest to 18 on the path — is the successor, because it is the smallest ancestor with 18 in its left subtree, hence the smallest value known to exceed 18.
3. If the search never branches left on the way down (the target is the maximum key in the tree), there is no successor.

GATE TRAP: When a node has no right child, the instinct to "search its own left subtree" for the successor is exactly backwards — the left subtree only contains keys SMALLER than the node, which is where the PREDECESSOR-related reasoning lives, not the successor. The successor of a right-child-less node can only be found by looking upward, toward an ancestor, never downward into the node's own subtree.

The inorder predecessor is defined symmetrically: if the node has a left child, the predecessor is the MAXIMUM of that left subtree; if not, walk up to the nearest ancestor for which the node lies in that ancestor's RIGHT subtree.

DELETING FROM A BST

Deletion is the operation with the most cases, because removing a node must not break the ordering property for anything left behind. There are exactly three shapes a node-to-delete can have, and each needs a different fix.

Case 1 — the node is a leaf. Simply remove it; nothing else in the tree references it, and no other node's ordering depended on it having children.

Case 2 — the node has exactly one child. Splice it out: connect the node's PARENT directly to the node's single CHILD, skipping the deleted node entirely. This preserves the ordering, because that child's entire subtree already sat correctly relative to everything above the deleted node — the deleted node contributed nothing to the ordering beyond passing that relationship through.

Trace case 2 on a small tree: insert 50, 30, 70, 60 (60 becomes 70's left child, since 60 < 70). Now delete 70, which has exactly one child, 60. Splice: 60 takes 70's place directly as 50's right child. Resulting tree: root 50, left child 30, right child 60. The ordering still holds — 60 is still correctly greater than 50 and there is no longer a 70 to be greater than.

Case 3 — the node has two children. Now there is no single child to promote without losing the other subtree, so instead REPLACE the node's key with its inorder successor (the minimum of its right subtree) or, symmetrically, its inorder predecessor (the maximum of its left subtree) — either choice preserves the ordering, since both are guaranteed to sit correctly between the node's original left and right subtrees. Then delete the ORIGINAL node that held that successor (or predecessor) value from its old position — which, being a minimum-of-a-right-subtree (or maximum-of-a-left-subtree), can itself have at most one child (a right child, in the successor case, since it has no left child by definition of being the minimum), so this second deletion always reduces to case 1 or case 2, never back to case 3.

Trace it on the BST built by inserting 50, 30, 70, 20, 40, 60, 80, 35, 45, 65 in order (giving 30 a left child 20 and a right child 40, and giving 40 in turn a left child 35 and a right child 45). Delete 30, using the inorder SUCCESSOR:

1. 30 has two children (20 and 40) — case 3 applies.
2. Find 30's inorder successor: go right once, to 40, then left as far as possible. 40 has a left child, 35; 35 has no left child of its own. So 35 is the successor.
3. Copy 35's key into the node that held 30. That position now holds the key 35, still with 20 as its left child and 40 (unchanged) as its right child.
4. Delete the ORIGINAL node that held 35 from its old position (as 40's left child). That node is a leaf (it has no children), so this is a plain case-1 removal: 40's left-child pointer is simply set to null.
5. Result: the position once holding 30 now holds 35, with left child 20 and right child 40; 40 now has only a right child, 45 (its old left child, the original 35, is gone).

The same deletion using the inorder PREDECESSOR instead, for contrast: the predecessor of 30 is the maximum of its LEFT subtree — walk left once to 20, then right as far as possible. 20 has no right child, so 20 IS already the maximum, hence the predecessor. Copy 20 into 30's old position, then delete the original leaf node 20. Result: the position once holding 30 now holds 20, still with (a now-empty) left side and right child 40 unchanged.

Either replacement is a valid answer to "delete this two-children node" — a question specifies which one it wants, since they generally produce different resulting trees, as this example shows (35 versus 20 ending up in 30's old spot).

GATE TRAP: The classic bug in this procedure is copying the successor's VALUE up but forgetting to actually remove the ORIGINAL node that held it — leaving that value duplicated in the tree and one node too many. Another common error is using the predecessor's value while the question specifically asked for the successor (or vice versa); they are equally valid choices in general, but a question that names one is checking that exact one.

BST OPERATION COMPLEXITY

Search, insertion, deletion, finding the minimum or maximum, and finding a successor or predecessor all share the same cost structure: every one of them follows a single downward (or, for successor/predecessor without a right/left child, a single remembered upward) path, touching at most one node per level. So each of these operations costs O(h), where h is the tree's height — not O(n), and not O(log n) unconditionally.

That distinction matters because h itself is not fixed by n alone, as the insertion-order example above demonstrated directly:

ceil(log2(n + 1)) − 1  ≤  h  ≤  n − 1

The lower bound is the minimum-height formula derived earlier, achieved when the tree happens to be as balanced as a binary tree of that size can be. The upper bound, n − 1, is the fully degenerate chain, achieved by inserting n keys in already-sorted order — exactly the worst case traced above. A plain (unbalanced) BST offers NO guarantee of landing anywhere near the lower bound; it depends entirely on the order the keys arrived in.

This is precisely the gap that AVL and red-black trees, covered below, exist to close: they add rebalancing rules so that h is GUARANTEED to stay O(log n) regardless of insertion order, rather than merely being O(log n) in the best case. Even without any rebalancing at all, if the n keys happen to arrive in a uniformly random order rather than an adversarial one, the EXPECTED height of the resulting BST is still only O(log n) (a known result puts it at roughly 2.99 log2 n) — worse than a balanced tree's guarantee, but far better than the worst case, and it explains why plain BSTs perform acceptably in practice on typical, non-adversarial data.

CHECKING WHETHER A SEQUENCE COULD BE A BST'S PREORDER

A frequently tested question shape: given a sequence of distinct numbers, could it be the preorder traversal of SOME valid BST? This can be checked in a single left-to-right pass using a stack and a running lower bound, without building any tree at all.

Maintain a stack (initially empty) and a lower bound (initially −infinity). For each value v in the sequence, in order:

1. If v is less than the current lower bound, the sequence is INVALID — stop.
2. While the stack is non-empty and its top element is less than v, pop it, and update the lower bound to the value just popped.
3. Push v onto the stack.

Why does this work? In a BST's preorder, once the traversal has moved from a node into its RIGHT subtree, every key from then on must be greater than that node (since it's now confined to a subtree lying entirely to that node's right) — popping the stack and raising the lower bound each time is exactly detecting "we've moved into someone's right subtree, so anything smaller than the node we just left behind is now out of bounds."

Trace it on 3, 1, 2, 5, 4:

1. v = 3. Lower bound is −infinity, so 3 passes. Stack is empty, nothing to pop. Push 3. Stack: [3]. Bound: −infinity.
2. v = 1. 1 ≥ bound, passes. Stack top is 3, and 3 is not less than 1, so no popping. Push 1. Stack: [3, 1]. Bound: −infinity.
3. v = 2. 2 ≥ bound, passes. Stack top is 1, and 1 < 2, so pop 1 and set bound = 1. New top is 3, and 3 is not less than 2, so stop popping. Push 2. Stack: [3, 2]. Bound: 1.
4. v = 5. 5 ≥ bound (1), passes. Pop 2 (2 < 5, bound becomes 2); pop 3 (3 < 5, bound becomes 3); stack now empty, stop popping. Push 5. Stack: [5]. Bound: 3.
5. v = 4. 4 ≥ bound (3), passes. Stack top is 5, not less than 4, no popping. Push 4. Stack: [5, 4]. Bound: 3.
6. End of sequence, no violation was ever triggered — VALID. (It corresponds to the tree: root 3, left child 1 with right child 2, right child 5 with left child 4.)

Now trace an invalid case, 3, 2, 4, 1, 5:

1. v = 3. Passes (bound −infinity). Push. Stack: [3].
2. v = 2. Passes. Top 3 is not less than 2, no pop. Push. Stack: [3, 2].
3. v = 4. Passes (bound still −infinity). Pop 2 (2 < 4, bound = 2); pop 3 (3 < 4, bound = 3); stack empty. Push 4. Stack: [4]. Bound: 3.
4. v = 1. Check against the bound: 1 < 3 — INVALID, stop.

This correctly flags the sequence as impossible: once the traversal passed 4 having already left both 3 and 2 behind (moved into what would have to be 3's right subtree), no value smaller than 3 can legally appear again, but 1 does.

REMEMBER: This stack-and-bound method replaces "try to build the tree and see if it breaks" with a single linear pass — it is the standard, fast way to answer "is this a valid BST preorder" questions, and it generalises directly to checking postorder by running the same idea from right to left.

AVL TREES: FORCING THE HEIGHT TO STAY LOGARITHMIC

An AVL tree is a BST with one extra invariant enforced at every single node: the balance factor of a node — defined as height(left subtree) − height(right subtree) — must always be −1, 0, or +1. If an insertion or deletion would push any node's balance factor outside that range, the tree is restructured immediately, before the operation is considered complete.

Because every node stays within one level of balance between its two sides, the height of an n-node AVL tree is guaranteed to stay O(log n) — specifically bounded by roughly 1.44 × log2(n), derived below — no matter what order the keys were inserted in. This is the guarantee a plain BST cannot offer.

[[FIG:avl-rotation-shapes]]

An insertion can only unbalance a node along the path from the new leaf back up to the root, and when it does, exactly one of four shapes describes the imbalance, named by the two edges followed from the unbalanced node down toward the newly inserted key:

• LL (left-left): the imbalance is caused by a node in the left subtree of the left child. Fix with a single RIGHT rotation at the unbalanced node.
• RR (right-right): mirror image — the right subtree of the right child. Fix with a single LEFT rotation.
• LR (left-right): the new node is in the RIGHT subtree of the LEFT child — a "zigzag." Fix with a LEFT rotation at the left child, followed by a RIGHT rotation at the original unbalanced node.
• RL (right-left): mirror image — a right rotation at the right child, followed by a left rotation at the original node.

Trace LL concretely: insert 30, then 20, then 10, into an empty AVL tree.

1. Insert 30: becomes the root, trivially balanced.
2. Insert 20: 20 < 30, becomes 30's left child. Balance factor of 30 is now 1 − 0 = 1, still within [−1, 1] — no rotation.
3. Insert 10: 10 < 30, then 10 < 20, becomes 20's left child. Now 30's left subtree (rooted at 20) has height 1, its right subtree is empty (height −1), so 30's balance factor is 1 − (−1) = 2 — a violation. The new node, 10, sits in the LEFT subtree of 30's LEFT child (20) — an LL case.
4. Fix with a single RIGHT rotation at 30: 20 rises to become the new root; 30 becomes 20's right child; 10 remains 20's left child.
5. Final tree: root 20, left child 10, right child 30 — every balance factor is now 0.

Trace LR concretely, since it is the case most often botched: insert 30, then 10, then 20.

1. Insert 30: root.
2. Insert 10: 10 < 30, becomes 30's left child. Balance factor of 30 is 1, fine.
3. Insert 20: 20 < 30 but 20 > 10, so it becomes 10's RIGHT child. Now 30's left subtree (rooted at 10) has height 1, right subtree is empty, balance factor of 30 is 1 − (−1) = 2 — a violation. The new node, 20, sits in the RIGHT subtree of 30's LEFT child (10) — this is the "inner", zigzag LR case, not the "outer" LL case, because the path from 30 down to 20 goes left then right, not left then left.
4. Fix with a LEFT rotation at the LEFT CHILD (10) first: this makes 20 rise to be 10's parent locally, with 10 becoming 20's left child. Now the subtree under 30 looks like: 30 → left child 20 → left child 10 (a plain LL shape now).
5. Then a RIGHT rotation at the original unbalanced node, 30: 20 rises to become the new root; 30 becomes 20's right child; 10 remains 20's left child.
6. Final tree: root 20, left child 10, right child 30 — balanced.

REMEMBER: The rule for telling LL/RR (single rotation) apart from LR/RL (double rotation) is whether the new node lies on the OUTER side of both edges from the unbalanced node (both left, or both right — single rotation) or the INNER side (left then right, or right then left — double rotation, rotating the middle child first).

The minimum number of nodes an AVL tree of height h can have, N(h), follows a Fibonacci-like recurrence: the sparsest possible AVL tree of height h has a root whose two subtrees are the sparsest possible trees of height h − 1 and h − 2 (using the balance factor's full allowance of a 1-level gap), plus the root itself:

N(h) = N(h − 1) + N(h − 2) + 1,   N(0) = 1, N(−1) = 0

Tabulating up to h = 5:

N(0) = 1
N(1) = N(0) + N(−1) + 1 = 1 + 0 + 1 = 2
N(2) = N(1) + N(0) + 1 = 2 + 1 + 1 = 4
N(3) = N(2) + N(1) + 1 = 4 + 2 + 1 = 7
N(4) = N(3) + N(2) + 1 = 7 + 4 + 1 = 12
N(5) = N(4) + N(3) + 1 = 12 + 7 + 1 = 20

Since N(h) grows at roughly the same rate as the Fibonacci sequence, which grows like φ^h (φ ≈ 1.618), inverting this relationship for a tree of n nodes gives the height bound h ≈ 1.44 × log2(n) (more precisely, h ≤ 1.44 × log2(n + 2) − 0.328) — still O(log n), just with a slightly larger constant than the absolute-minimum-height bound of a perfectly complete tree, because AVL trades a little extra height for the ability to rebalance cheaply.

AVL deletion follows the same idea as insertion — remove the node using the ordinary BST deletion rules above, then check balance factors along the path from the deleted node's original position back up to the root, rotating wherever a violation appears. The difference from insertion is that a single rotation can fix an insertion-caused imbalance once and for all, but a deletion can require rebalancing at MULTIPLE ancestors on the way back up, since removing a node can shrink a subtree's height in a way that cascades upward rather than stopping at the first fix.

RED-BLACK TREES, IN BRIEF

A red-black tree is another self-balancing BST, looser than AVL but still logarithmic, defined by colouring every node red or black and enforcing four rules: the root is black; every leaf (treated as a null "sentinel" node) is black; a red node never has a red child (no two reds in a row on any path); and every path from a given node down to any of its descendant null leaves passes through the same number of black nodes (its black-height). These rules together bound the height at at most 2 × log2(n + 1) — looser than AVL's roughly 1.44 log2(n), meaning red-black trees can be somewhat taller, but they need at most a constant number of rotations to rebalance after any single insertion or deletion, compared to AVL's potential cascade on deletion — which is why red-black trees are the more common choice inside language libraries and operating-system kernels, trading slightly slower lookups for cheaper updates.

B-TREES

B-trees generalise the balanced-tree idea to nodes that hold many keys and many children at once, specifically so that each node maps to one disk block — that is a database and file-system concern, and it belongs to, and is covered in full in, the DBMS chapter on indexing.

THREADED BINARY TREES

Ordinary traversal needs either recursion or an explicit stack, both of which cost extra memory proportional to the tree's height, purely to remember "where to go next" once the current subtree is exhausted. A threaded binary tree avoids this by reusing the otherwise-wasted NULL pointers: in a right-threaded tree, any node with no right child has its right pointer field repurposed to point directly at that node's inorder SUCCESSOR instead of storing null, with a boolean tag distinguishing a genuine child pointer from a thread; a left-threaded tree does the same for missing left pointers, threading them to the inorder PREDECESSOR; a fully-threaded tree does both. This lets an inorder walk move to the next node in O(1) by simply following a thread when the tag says so, with no stack and no recursion at all — the cost is the extra tag bit (or a sentinel-node convention) needed at every node to tell a real child from a thread.

GENERAL (n-ARY) TREES AND THE LEFT-CHILD RIGHT-SIBLING REPRESENTATION

Nothing about the vocabulary built at the start of this chapter — parent, child, sibling, leaf, depth, height, subtree — was specific to binary trees; it applies to a general tree, where a node may have any number of children, exactly the same way. The m-ary tree identities used earlier for counting binary-tree nodes generalise directly: if every internal node of a general tree has exactly m children (a "full m-ary tree") and there are i internal nodes, the same edge-counting argument used for n0 = n2 + 1 gives total edges = m·i (each internal node contributes exactly m edges), and since total edges = n − 1:

n = m·i + 1   and   leaves = n − i = (m − 1)i + 1

A general tree is awkward to store directly, since the number of child pointers a node needs varies from node to node. The left-child right-sibling (LCRS) representation fixes this by giving every node exactly two pointers, regardless of how many children it has in the original tree: a "left" pointer to its FIRST child, and a "right" pointer to its NEXT SIBLING (the next child of the SAME parent). Every other child is then reached by following a chain of "next sibling" pointers from the first child.

[[FIG:lcrs-general-tree]]

This turns any general tree into an ordinary binary tree with no loss of information — the "left" pointers trace out the parent-child relationships, and the "right" pointers trace out sibling order — which is exactly why algorithms and identities developed for binary trees (traversal, height, the counting identities above) can be reused for general trees once they are put into this form, rather than needing an entirely separate theory.

WORKED PROBLEMS

Each problem is solved in full below; follow the working, not just the final number.

1. A full binary tree (every node has 0 or 2 children) has exactly 100 leaves. How many internal nodes and how many total nodes does it have?
   By n0 = n2 + 1 (with n1 = 0 since the tree is full, so n2 counts every internal node), internal nodes = leaves − 1 = 100 − 1 = 99. Total nodes = leaves + internal = 100 + 99 = 199. Cross-check with total = 2 × leaves − 1 = 2(100) − 1 = 199. Matches.

2. A binary tree has preorder traversal G, D, B, A, C, F, E, I, H and inorder traversal A, B, C, D, E, F, G, H, I. Reconstruct the tree and give its structure.
   Preorder's first element, G, is the root. Locate G in the inorder list: A, B, C, D, E, F, G, H, I splits into left-inorder = [A, B, C, D, E, F] (6 keys) and right-inorder = [H, I] (2 keys). The next 6 elements of preorder after G — D, B, A, C, F, E — are the left subtree's preorder; the final 2 — I, H — are the right subtree's preorder.
   Recurse left: preorder [D, B, A, C, F, E], inorder [A, B, C, D, E, F]. Root D; in its inorder, D splits into left = [A, B, C] (3 keys), right = [E, F] (2 keys). Left preorder = next 3 of [B, A, C, F, E], i.e. [B, A, C]; right preorder = remaining [F, E].
     Recurse into [B, A, C] / [A, B, C]: root B; inorder splits into left [A], right [C]. So B has left child A (leaf) and right child C (leaf).
     Recurse into [F, E] / [E, F]: root F; inorder splits into left [E], right [] (empty). So F has left child E (leaf) and no right child.
   So D has left child B (with children A, C) and right child F (with child E, no right child).
   Recurse right (of G): preorder [I, H], inorder [H, I]. Root I; inorder splits into left [H], right [] (empty). So I has left child H (leaf), no right child.
   Full tree: root G; left child D (left child B with children A and C; right child F with left child E only); right child I (left child H only). This matches the tree the traversals were generated from.

3. Keys 40, 20, 60, 10, 30, 50, 70, 5, 15 are inserted, in that order, into an initially empty BST. State the height of the resulting tree.
   40 → root. 20 < 40 → left of 40. 60 > 40 → right of 40. 10 < 40, < 20 → left of 20. 30 < 40, > 20 → right of 20. 50 > 40, < 60 → left of 60. 70 > 40, > 60 → right of 60. 5 < 40, < 20, < 10 → left of 10. 15 < 40, < 20, > 10 → right of 10.
   Resulting shape: root 40; left child 20 (children 10 and 30), right child 60 (children 50 and 70); 10 has children 5 and 15. Deepest nodes are 5 and 15, reached by 40 → 20 → 10 → 5 (or 15) — 3 edges. No path is longer. Height = 3.

4. Using the BST from inserting 50, 30, 70, 20, 40, 60, 80, 35, 45, 65 in order (30 has left child 20, right child 40; 40 has left child 35, right child 45), delete the node holding 30 using the inorder-successor rule. Give the resulting preorder traversal.
   Original preorder: 50, 30, 20, 40, 35, 45, 70, 60, 65, 80.
   30 has two children (20 and 40) — the two-children case. Successor: go right once to 40, then left as far as possible; 40's left child is 35, which itself has no left child, so 35 is the successor.
   Copy 35 into 30's position; that node keeps left child 20 and right child 40. Delete the original leaf node 35 from 40's left-child slot (a plain leaf removal), leaving 40 with only its right child, 45.
   New preorder, reading root-left-right from the top: 50, then the left subtree rooted at (now) 35 — 35, 20, 40, 45 — then the right subtree rooted at 70 — 70, 60, 65, 80. Full sequence: 50, 35, 20, 40, 45, 70, 60, 65, 80.

5. Insert 30, then 10, then 20 into an empty AVL tree. Identify the imbalance case and the resulting tree.
   Insert 30: root. Insert 10: left child of 30, balance factor of 30 = 1, fine. Insert 20: 20 > 10 so it becomes 10's RIGHT child — this places the new node in the right subtree of 30's left child, an LR (left-right) case, since 30's balance factor is now 1 − (−1) = 2.
   Fix: left-rotate at 10 first (20 rises above 10, with 10 becoming 20's left child), giving 30 → left child 20 → left child 10 (now a plain LL shape); then right-rotate at 30 (20 rises to root, 30 becomes 20's right child, 10 remains 20's left child).
   Final tree: root 20, left child 10, right child 30 — a single LR (double) rotation.

6. How many structurally distinct BSTs can be formed from 5 distinct keys?
   The count is the 5th Catalan number, built from the recurrence C(n) = sum over k=0..n-1 of C(k)·C(n-1-k), with C(0)=1: C(1) = 1, C(2) = C(0)C(1)+C(1)C(0) = 2, C(3) = C(0)C(2)+C(1)C(1)+C(2)C(0) = 2+1+2 = 5, C(4) = C(0)C(3)+C(1)C(2)+C(2)C(1)+C(3)C(0) = 5+2+2+5 = 14, C(5) = C(0)C(4)+C(1)C(3)+C(2)C(2)+C(3)C(1)+C(4)C(0) = 14+5+4+5+14 = 42. So 42 distinct BSTs are possible, one for each of the 42 distinct tree shapes on 5 nodes, since a shape plus 5 distinct sorted keys determines a unique valid labelling.

7. Which of these sequences could be the preorder traversal of some BST on the keys {1,2,3,4,5}? (a) 3, 1, 2, 5, 4  (b) 3, 2, 4, 1, 5
   Use the stack-and-bound method (bound starts at −infinity).
   (a) 3: push, stack [3], bound −inf. 1: passes bound; top 3 not < 1; push; stack [3,1]. 2: passes bound; pop 1 (1<2, bound=1); top 3 not <2; push; stack [3,2]. 5: passes bound(1); pop 2(bound=2), pop 3(bound=3); stack empty; push; stack [5]. 4: passes bound(3); top 5 not <4; push; stack [5,4]. No violation — VALID.
   (b) 3: push, stack [3]. 2: passes; top 3 not <2; push; stack [3,2]. 4: passes; pop 2(bound=2), pop 3(bound=3); stack empty; push 4; stack [4]. 1: check against bound 3 — 1 < 3 — INVALID. Sequence (b) cannot be a BST preorder on these keys.

8. A full 3-ary tree (every internal node has exactly 3 children) has 10 internal nodes. How many total nodes and how many leaves does it have?
   Using n = m·i + 1 with m = 3, i = 10: total nodes = 3(10) + 1 = 31. Leaves = (m − 1)i + 1 = (2)(10) + 1 = 21. Check: leaves + internal = 21 + 10 = 31, matching the total exactly.

9. A binary tree has root A; A's left child is B and right child is C; B's left child is D and right child is E; D's left child is F (every other pointer is null). Find the diameter of the tree, in edges.
   Using height(empty) = −1: height(F) = 0 (leaf). height(D) = 1 + max(height(F), −1) = 1 + max(0,−1) = 1. height(E) = 0. height(B) = 1 + max(1, 0) = 2. height(C) = 0. height(A) = 1 + max(2, 0) = 3.
   Diameter candidate at each node = leftHeight + rightHeight + 2: at F, −1−1+2=0; at D, 0−1+2=1; at B, 1+0+2=3; at C, −1−1+2=0; at A, 2+0+2=4. Maximum is 4, achieved along the path F–D–B–A–C.

WHAT TO CARRY INTO THE NEXT CHAPTER

A heap, the next structure in this course, is a binary tree too — specifically always a complete binary tree, which is exactly why it can be stored in the array representation derived in this chapter without wasting a single slot. It gives up the general BST ordering rule (left < node < right everywhere) for a weaker one (parent is always ≥, or always ≤, both children) in exchange for O(1) access to the minimum or maximum instead of O(h) search anywhere. Every counting identity here — n0 = n2 + 1, the 2^(h+1) − 1 bound, the height formulas — carries straight over, because a heap is still, first and foremost, a binary tree.
`
};
