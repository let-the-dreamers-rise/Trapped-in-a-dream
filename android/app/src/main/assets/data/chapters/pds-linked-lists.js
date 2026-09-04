// Textbook chapter: Linked Lists.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/pds.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — either from this chapter's figs list or from the
// topic's own figs (list-layouts, delete-rewire, reversal-pointers already exist
// in data/questions/pds.js for this topic).

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['pds-linked-lists'] = {
  figs: [
    {
      id: 'floyd-meet',
      caption: 'Floyd\'s tortoise and hare: both pointers enter the cycle and the faster one laps the slower one, so they must meet inside the loop.',
      svg: '<svg viewBox="0 0 380 190" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-fm" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.4" fill="none"><line x1="20" y1="150" x2="90" y2="150" marker-end="url(#ah-fm)"/><line x1="90" y1="150" x2="150" y2="150" marker-end="url(#ah-fm)"/><circle cx="230" cy="150" r="70"/><line x1="150" y1="150" x2="200" y2="97" marker-end="url(#ah-fm)"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><text x="20" y="170">head</text><text x="90" y="170">tail nodes</text><text x="150" y="170">entry (join)</text><text x="230" y="80">cycle</text></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="230" y="150">meet point</text></g><circle cx="150" cy="150" r="4" fill="currentColor"/><circle cx="230" cy="150" r="4" fill="currentColor"/></svg>'
    },
    {
      id: 'dll-insert',
      caption: 'Inserting node N between A and B in a doubly linked list: the order of the four pointer writes matters.',
      svg: '<svg viewBox="0 0 340 170" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-dll" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="currentColor"/></marker></defs><g font-size="11" text-anchor="middle" fill="currentColor"><text x="20" y="16" text-anchor="start">before:</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="50" y="4" width="55" height="24"/><rect x="180" y="4" width="55" height="24"/><path d="M105 12 L178 12" marker-end="url(#ah-dll)"/><path d="M180 20 L107 20" marker-end="url(#ah-dll)"/></g><g font-size="10" text-anchor="middle" fill="currentColor"><text x="77" y="20">A</text><text x="207" y="20">B</text></g><g font-size="11" fill="currentColor"><text x="20" y="70" text-anchor="start">after (insert N between A, B):</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="50" y="90" width="45" height="24"/><rect x="145" y="90" width="45" height="24"/><rect x="240" y="90" width="45" height="24"/></g><g font-size="10" text-anchor="middle" fill="currentColor"><text x="72" y="106">A</text><text x="167" y="106">N</text><text x="262" y="106">B</text></g><g font-size="10" fill="currentColor"><text x="20" y="140" text-anchor="start">order: 1 N-&gt;next=B  2 N-&gt;prev=A  3 A-&gt;next=N  4 B-&gt;prev=N</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

You already have one way to store a sequence of things: the array. This chapter exists because arrays have two specific limitations, and the linked list is the data structure built to remove them, at a specific cost. Everything below — the node, the pointer, every operation — follows from that trade, so we start there rather than with a definition to memorise.

Linked lists matter beyond themselves. Stacks and queues can be built on them, trees and graphs are collections of nodes linked by pointers in the same spirit, and hash tables often resolve collisions with a linked list per bucket. The pointer discipline you build here — draw the boxes, draw the arrows, update them in the right order — is the discipline the rest of the pointer-based syllabus uses. Get it solid now and later structures stop looking like magic.

WHY LINKED LISTS EXIST: WHAT ARRAYS CANNOT DO CHEAPLY

An array stores its elements in consecutive memory cells. That single fact is the source of everything an array is good at and everything it is bad at, so look at it directly.

Because the elements are consecutive, the address of element i is computable by arithmetic: address(i) = base + i * size. No searching is needed to reach element i — you compute where it is and read it. That is why array access is O(1): one multiplication, one addition, one memory read, regardless of how large the array is or which index you want.

That same consecutiveness is the problem the moment you want to change the array's shape. Two costs follow directly from it.

First, the size is fixed at creation. An array of 100 integers occupies 100 consecutive slots; there is no guarantee the slot right after it is free, so the array cannot simply grow into it. To hold a 101st element you must allocate a new, larger block and copy every existing element into it — an O(n) operation just to add one more thing. (Dynamic arrays such as C++'s vector hide this by over-allocating and doubling capacity when full, which makes the operation "amortised O(1)" — cheap on average across many insertions — but any single insertion that triggers a resize is still O(n), and the underlying array is still a fixed-size block at every instant.)

Second, inserting or deleting in the middle costs O(n) even when there is spare room, because "consecutive" must be maintained. To insert a new element at position k in an array of n elements, every element from position k onward must be shifted one slot to the right to open a gap — that is n − k moves in the worst case, and n moves on average for a random position. Deletion is symmetric: removing element k requires shifting everything after it one slot left to close the gap.

KEY: An array trades flexibility for speed of access. Because location is computed by arithmetic, access is O(1) — but that arithmetic only works if elements stay consecutive, which is exactly what insertion and deletion in the middle destroy, forcing an O(n) shift.

Now ask: what if elements did not need to be consecutive? Suppose each element, instead of sitting at a fixed offset from its neighbours, carried the address of the next element explicitly. Then inserting a new element between two existing ones needs no shifting at all — you just change which address the previous element carries, and set the new element's own address field to point to what used to come next. Nothing else in memory has to move. This is the entire idea of a linked list; everything else in this chapter is working out the mechanics of that one idea.

The cost of giving up consecutiveness is that you lose the arithmetic shortcut. If element i's address is not computable from i, the only way to reach it is to start at the beginning and follow the chain of addresses i times. So access to an arbitrary position becomes O(k) for position k, where it was O(1) in an array.

ARRAYS VERSUS LINKED LISTS: THE TRADE-OFF TABLE

• Access element at position k — array O(1); linked list O(k), i.e. O(n) worst case.
• Insertion/deletion at a KNOWN node (pointer in hand) — array O(n) (shifting); linked list O(1) (pointer rewiring only).
• Insertion/deletion at position k, position given as an index (list must still be walked to reach it) — array O(n); linked list O(k) to reach it, then O(1) to do it, so O(k) overall — still no shifting, but still a walk.
• Memory used per element — array: just the element. Linked list: the element plus one pointer (two pointers for a doubly linked list) — genuine per-node overhead.
• Memory locality — array: excellent, consecutive addresses are cache-friendly. Linked list: poor, nodes can be scattered anywhere the allocator put them, so traversal causes a cache miss almost every step.
• Size — array: fixed (or resized at O(n) cost); linked list: grows and shrinks one node at a time with no resizing step at all.
• Random access pattern (binary search, sorting by index) — array: supported directly; linked list: not supported at all without simulating array access at O(n) per lookup, which is why binary search on a plain linked list is pointless.

GATE TRAP: "Linked lists are always better for insertion and deletion" is only half true. They are better when you already hold a pointer to the relevant node. If the operation is specified by an index or a value that must first be searched for, reaching that node costs O(n) in a singly linked list — the same order as an array shift. The saving is real only once you are already there.

REMEMBER: The single sentence that explains every entry in that table: an array computes location, a linked list stores it. Computed location is fast to use but expensive to maintain under change; stored location is free to change but must be followed one hop at a time to use.

THE NODE: WHAT A POINTER FIELD ACTUALLY IS

A linked list is a chain of nodes, where each node bundles some data with the address of the next node. In C:

struct node {
    int data;
    struct node *next;
};

Read this literally. Every node in memory is a small block holding two things side by side: an int (4 bytes on a typical system) and a pointer (commonly 8 bytes on a 64-bit machine, 4 on a 32-bit one). The pointer field, next, does not hold another node's data — it holds that node's address, a number that is the location in memory where the next struct node begins. Following next means reading that number and treating it as an address: dereferencing it with p->next (equivalently (*p).next) fetches the struct stored there.

Why struct node *next rather than struct node next? Because a node cannot contain another node by value — struct node would then need to contain a struct node inside it, which needs to contain a struct node inside that, forever; the compiler cannot compute a finite size for such a type. A pointer is always the same fixed size (an address), regardless of what it points to, so a node's size is fixed and computable no matter how long the list eventually grows. This is the same reason a tree node holds pointers to its children rather than the children themselves.

Nodes for a linked list are typically allocated one at a time, on the heap, with malloc(sizeof(struct node)) in C. Because the heap allocator can place each block anywhere it finds room, consecutive nodes in the list are almost never at consecutive addresses — node 1 might be at address 5000, node 2 at address 9000, node 3 at address 3000. The chain is only a chain because of the pointer fields, not because of physical layout. Draw it as boxes connected by arrows, never as a row of adjacent cells — that picture is precisely what an array looks like and precisely what a linked list is not.

[[FIG:list-layouts]]

KEY: A pointer field stores an address, not a value. p->next is "the address stored in p's next field"; *p->next or p->next->data is "the thing living at that address". Confusing "the pointer" with "the node it points to" is the single most common source of pointer bugs, in this course and in real C code.

THE HEAD POINTER AND THE EMPTY LIST

A single node is not a list; you need a way to find the first one. That is the job of the head pointer: a variable, struct node *head;, that holds the address of the first node in the chain. The list itself is defined entirely by this one pointer — everything reachable by following next repeatedly from head, until a next field holds NULL.

NULL (0 in most implementations) is not the address of a real node; it is a reserved value meaning "there is nothing here". The last node's next field is set to NULL specifically so that a traversal has a way to recognise it has run out of nodes, rather than reading garbage and crashing or looping into whatever bytes happen to sit at the address the garbage suggests.

An empty list — zero nodes — is represented by head == NULL. There is no node to point to, so the head pointer itself holds the "no node" value. This single fact is the source of a large share of linked-list bugs, because an empty list changes the shape of almost every operation: insertion into an empty list has no existing node to attach to, deletion from an empty list has nothing to delete, and a search on an empty list must check head before it dereferences it, or it crashes immediately.

GATE TRAP: A list of one node is NOT the same as an empty list, and code has to tell them apart. head == NULL is empty. head != NULL && head->next == NULL is exactly one node. Deleting the only node in a one-node list must set head = NULL afterward — if you free the node but leave head pointing at the now-freed memory, you have a dangling pointer, and the next access is undefined behaviour, not a safe "empty" state.

TRAVERSAL: WALKING THE CHAIN, AND WHERE THE OFF-BY-ONE LIVES

Reading every node once, in order, is the basis of nearly every other operation, so get its idiom exact.

struct node *p = head;
while (p != NULL) {
    printf("%d ", p->data);
    p = p->next;
}

Trace this on 1 -> 2 -> 3 -> NULL. p starts at node 1: test p != NULL (true, p is node 1), print 1, advance p to node 2. Test again (true), print 2, advance to node 3. Test again (true), print 3, advance to node 3's next, which is NULL. Test again: p is NULL, the loop stops. Output "1 2 3", no crash, because the pointer is tested BEFORE it is dereferenced on every single pass, including the last one where it turns out to be NULL.

Now the trap. A very similar-looking loop tests the pointer's next field instead of the pointer itself:

struct node *p = head;
while (p->next != NULL)
    p = p->next;
return p;

This does not visit every node; it stops one node early — at the last node, not past it — because it is asking "does the CURRENT node have a successor?" rather than "am I currently on a real node?". Trace it on 1 -> 2 -> 3 -> NULL. p starts at node 1: is 1's next (node 2) non-NULL? Yes, advance to node 2. Is 2's next (node 3) non-NULL? Yes, advance to node 3. Is 3's next (NULL) non-NULL? No — stop. p ends at node 3, the LAST node, and the function returns a pointer to it, never NULL.

This is not a bug in general — walking to the last node this way is exactly how you find the tail when you have no tail pointer, and it is correct precisely because it stops one node before you would dereference NULL. The bug appears only when someone uses this idiom where the first one was needed, expecting to print or process every node and silently missing the last one, or uses the first idiom (testing p) expecting to land ON the last node and instead landing one step past it, on NULL.

GATE TRAP: while (p != NULL) visits every node and finishes with p == NULL. while (p->next != NULL) visits every node except stops WITH p ON the last node, never becoming NULL, and it CRASHES on an empty list, because p is NULL from the start and p->next dereferences NULL immediately. Any question mixing these two conditions is testing whether you notice which one is being asked. Always ask: "am I testing the pointer, or the pointer's field?"

Both idioms cost O(n): each visits every node once, doing O(1) work per node.

INSERTION AT THE HEAD

Adding a new first node is the cheapest possible list modification, and it is worth seeing exactly why.

struct node *insertAtHead(struct node *head, int val) {
    struct node *n = malloc(sizeof(struct node));
    n->data = val;
    n->next = head;
    return n;
}

Trace on the list 10 -> 20 -> 30 with head pointing at node 10, inserting 5. Step 1: allocate a new node n, holding garbage until we set its fields. Step 2: n->data = 5. Step 3: n->next = head — n's next field is set to whatever head currently holds, which is the address of node 10. Now n points at 10, so the chain reads n(5) -> 10 -> 20 -> 30, but nothing outside this function has been told about n yet; head, the caller's variable, is unchanged. Step 4: the function returns n, and the caller must assign it — head = insertAtHead(head, 5); — so the caller's own head pointer is updated to n's address.

Why exactly two pointer operations? Because inserting at the front means only one relationship changes: "what is first" moves from the old node to the new one, and the new one must still lead to everything that used to be first. n->next = head captures the second half (n now leads into the old list); the reassignment of head captures the first half (the world now finds the list starting at n). Neither step depends on the list's length — this is the O(1) operation the trade-off table promised, and it is O(1) precisely because no other node's pointer has to change and nothing needs to be found by walking.

GATE TRAP: The order of the two assignments inside the function does NOT matter here (n->next = head then return n is equivalent to computing n first) but the order relative to the CALLER's update absolutely does. If you wrote head = n; before setting n->next = head;, you would set n->next to n's own address (since head now already equals n), corrupting the list into a one-node self-loop. Always finish wiring the new node's own pointers using the OLD value of whatever you are about to overwrite.

INSERTION AT THE TAIL

Appending at the end is where "how much do you know already" starts to matter, because the cost depends on whether you keep a tail pointer.

Without a tail pointer, you only have head, so you must walk to the last node first:

struct node *insertAtTail(struct node *head, int val) {
    struct node *n = malloc(sizeof(struct node));
    n->data = val; n->next = NULL;
    if (head == NULL) return n;
    struct node *p = head;
    while (p->next != NULL) p = p->next;
    p->next = n;
    return head;
}

Two things to notice. The empty-list case is handled separately and first — if head is NULL there is no node to walk to, and the new node simply becomes the whole list. Otherwise the walk uses exactly the "stop at the last node" idiom from the previous section, landing p on the last real node, and then p->next = n attaches the new node after it. The walk is O(n), so tail insertion without a tail pointer is O(n) overall, even though the actual attaching step is one pointer write.

With a tail pointer — a second variable, struct node *tail;, always kept pointing at the current last node — the walk disappears entirely:

void insertAtTailFast(int val) {
    struct node *n = malloc(sizeof(struct node));
    n->data = val; n->next = NULL;
    if (head == NULL) { head = tail = n; return; }
    tail->next = n;
    tail = n;
}

Now insertion is O(1): attach the new node after the current tail (tail->next = n), then move tail to point at the new node. The empty-list branch sets both head and tail to the new node, since it is simultaneously the first and last node of a one-element list.

KEY: A tail pointer turns tail insertion from O(n) to O(1) by remembering, rather than rediscovering, where the list ends. The price is that every OTHER operation which changes what the last node is — deleting the last node, for instance — must now remember to update tail too, or it goes stale and points at a node that is no longer last (or that has been freed).

INSERTION AFTER A GIVEN NODE, AND AT POSITION K

Inserting after a specific node p (you already hold a pointer to it) is O(1), and it is the same two-write pattern as insertion at the head, just performed one node further in:

void insertAfter(struct node *p, int val) {
    struct node *n = malloc(sizeof(struct node));
    n->data = val;
    n->next = p->next;
    p->next = n;
}

Order matters here exactly as it did at the head. n->next = p->next must happen BEFORE p->next = n, because the second assignment overwrites the very value the first assignment needs to read. If you swapped them, p->next = n would run first, so by the time n->next = p->next executed, p->next would already equal n, and n->next would be set to n itself — the new node pointing at itself, and everything originally after p permanently lost.

1. Save what p currently points to next, into n's own next field: n->next = p->next.
2. Only now overwrite p's next field to point at n: p->next = n.

REMEMBER: Whenever you rewire a pointer, ask "does anything downstream still need the OLD value of this pointer?" If yes, copy that old value out first. Every ordering trap in linked-list code — insertion, deletion, reversal — is a version of this one question.

Inserting at position k (0-indexed, so k = 0 means the new head) combines a walk with the above: walk to the node currently at position k − 1 (or handle k = 0 as insertion at head separately), then insertAfter that node. The walk costs O(k); the insertion itself is O(1); overall O(k), which is O(n) in the worst case (inserting near the end without a tail pointer).

DELETING THE HEAD

Removing the first node is the deletion mirror of insertion at the head:

struct node *deleteHead(struct node *head) {
    if (head == NULL) return NULL;
    struct node *toFree = head;
    head = head->next;
    free(toFree);
    return head;
}

The order here is forced by a different concern than before: you must read head->next and save it (into the new head, via the assignment) BEFORE calling free on the old head node, because free does not erase the memory instantly in a way you can rely on, but treating a freed block as still valid is undefined behaviour — you must not touch toFree->next after it is freed. Saving the old pointer in toFree, THEN advancing head, THEN freeing toFree is the safe order: read everything you need from the old node before releasing it.

The empty-list check first is not optional: deleteHead on an empty list, without it, would dereference head->next where head is NULL, crashing.

DELETING A GIVEN NODE: THE PREVIOUS-NODE PROBLEM

Deleting the head was easy because the thing that needs to change — head — is a variable you already have direct access to. Deleting an arbitrary node p from the middle of a singly linked list is different in kind, and this difference is the most important structural fact in this whole chapter.

To remove p from the chain, some other node's next field must stop pointing at p and instead point at whatever p pointed to — p->next. But p's own next field tells you what comes AFTER p; nothing about p tells you what comes BEFORE it. A singly linked list only has forward pointers. So to delete p, you need the node whose next field currently equals p — call it prev — and you find prev only by starting at head and walking forward until you reach the node just before p. There is no shortcut; a singly linked list gives you no way to go backward.

struct node *deleteNode(struct node *head, struct node *target) {
    if (head == target) {
        head = head->next;
        free(target);
        return head;
    }
    struct node *prev = head;
    while (prev != NULL && prev->next != target) prev = prev->next;
    if (prev == NULL) return head;      /* target not found */
    prev->next = target->next;
    free(target);
    return head;
}

Trace deleting node C from A -> B -> C -> D. head is A, not C, so we enter the walk. prev starts at A: is A->next (B) equal to target (C)? No, advance prev to B. Is B->next (C) equal to target? Yes — stop. prev is now B, the node immediately before C. prev->next = target->next rewires B's next field to D (skipping C), and target (C) is freed. Result: A -> B -> D.

[[FIG:delete-rewire]]

This walk to find prev is O(n) — in the worst case you scan almost the entire list just to find who points at the node you already have a pointer to. That single fact is why "deletion given a node pointer" is O(1) in an array-of-pointers-with-explicit-prev structure (a doubly linked list, met later in this chapter) but O(n) in a plain singly linked list: the asymmetry is entirely about whether backward information exists anywhere.

THE COPY-TRICK: DELETING A NODE WHEN YOU ARE GIVEN ONLY ITS OWN POINTER

A related but distinct puzzle: suppose a function is given ONLY a pointer to the node to delete — not the head, not the previous node, nothing else — and is still asked to delete it, in a singly linked list. You cannot find prev at all, because you have no way to start a walk from head (you were not given head). Is this possible?

Yes, with a trick that sidesteps needing prev entirely, provided the target is NOT the last node. Instead of removing the target node itself, copy the data from its successor into it, then delete the successor instead:

void deleteGivenOnlyNode(struct node *target) {
    struct node *nxt = target->next;
    target->data = nxt->data;
    target->next = nxt->next;
    free(nxt);
}

Trace on B in A -> B -> C -> D, given only the pointer to B (not A). nxt = B->next = C. Copy C's data into B: now the node physically located where B was contains C's value. Set B->next = C->next = D. Free the old C node. The list, viewed from A, now reads A -> (B's old memory, now holding C's value) -> D — logically identical to having deleted B, because the node that "disappeared" (by value) is B's original value, even though the memory block that got freed was physically C's.

GATE TRAP: This trick works only because a node's identity, from the rest of the list's point of view, is its position and its data — not which specific memory address holds it. It CANNOT be used on the last node, because the last node has no successor to copy from; nxt->data would dereference NULL. A question that asks "can this node always be deleted given only its own pointer" is testing exactly this exception. In a doubly linked list the trick is never needed, because target->prev exists directly.

DELETING THE TAIL, DELETION BY VALUE, SEARCH, LENGTH

Deleting the last node is the previous-node problem in its purest form: even with a tail pointer telling you WHERE the last node is, you must still walk from head to find the SECOND-to-last node, because that is whose next field must become NULL.

struct node *deleteTail(struct node *head) {
    if (head == NULL) return NULL;
    if (head->next == NULL) { free(head); return NULL; }
    struct node *p = head;
    while (p->next->next != NULL) p = p->next;
    free(p->next);
    p->next = NULL;
    return head;
}

The loop condition p->next->next != NULL stops p at the second-to-last node (the one whose next's next is NULL, i.e. whose next IS the last node) — one node earlier than the "walk to the last node" idiom seen already. Deleting the tail is O(n) even if you maintain a tail pointer, unless the list is doubly linked (where tail->prev gives the second-to-last node directly, in O(1)) — this exact asymmetry is q12 of this topic's question bank, phrased as "which pair of operations can both be O(1) with only a last-node pointer", and the answer excludes tail deletion for precisely this reason.

Deletion by value combines search with the previous-node deletion pattern: walk with a prev/curr pair until curr->data == key, then unlink curr using prev exactly as in deleteNode above. If the value occurs multiple times, decide up front whether to delete the first occurrence only or all of them (the latter needs the loop to continue after each deletion rather than returning).

Search is the plainest traversal: walk with while (p != NULL), compare p->data to the target, return p (or its position) on a match, return NULL (or -1) if the loop exits without matching. O(n), because in the worst case (the value is absent, or is the last node) every node is visited.

Length is the same traversal with a counter: int len = 0; for (p = head; p != NULL; p = p->next) len++; — O(n), and, notice, there is no shortcut: unlike an array, a linked list does not know its own size unless something explicitly counted and cached it (many real implementations keep a size field in a header structure for exactly this reason, updated on every insert and delete so that length becomes O(1) again).

THE HEAD-POINTER-UPDATE PROBLEM

Look back at insertAtHead and deleteHead: both need to change WHICH node the caller's head variable points to, and both handled this by returning the new head and having the caller reassign it — head = insertAtHead(head, 5);. This pattern is not incidental; it is forced by how C passes arguments, and understanding why is worth doing carefully, because this is one of the most heavily tested ideas in the whole topic.

In C, every argument is passed BY VALUE — the function receives a COPY of the caller's pointer, not the caller's actual variable. So if insertAtHead took struct node *head as a parameter and, inside the function, wrote head = n;, that assignment would change only the function's local copy of the pointer. The caller's own head variable — a completely separate piece of memory holding a separate copy of the same address — would be untouched. The function would build a correct new list, but the caller would have no way to find it, because the caller's head still points at the old first node (or, for an initially empty list, still holds NULL, silently discarding the entire insertion).

void brokenInsert(struct node *head, int val) {
    struct node *n = malloc(sizeof(struct node));
    n->data = val;
    n->next = head;
    head = n;              /* only the LOCAL copy of head changes */
}

Call brokenInsert(head, 5) on an empty list (head == NULL). Inside the function, n->next = NULL is correct, and head = n makes the function's local head point at n — but the caller's head variable, back in main, is never touched. After the call returns, the caller's head is still NULL, and the newly built one-node list is leaked (no pointer anywhere refers to it any more). This is exactly the trap that operations touching the head must avoid, and there are three standard fixes.

1. Return the new head, and require the caller to reassign: head = insertAtHead(head, 5);. This is what every function in this chapter has done so far. It is simple and safe, but every call site must remember to capture the return value — forgetting the assignment reproduces the exact bug above.

2. Pass a pointer TO the head pointer: struct node **headRef. Now the function receives the ADDRESS of the caller's head variable, not a copy of its value, so it can reach through that address and modify the caller's actual variable directly.

void insertAtHeadPP(struct node **headRef, int val) {
    struct node *n = malloc(sizeof(struct node));
    n->data = val;
    n->next = *headRef;
    *headRef = n;
}

Called as insertAtHeadPP(&head, 5);. Inside, *headRef dereferences the double pointer to reach the caller's actual head variable; *headRef = n writes directly into it. No return value is needed, and it is impossible to forget to use the result, because there is no separate result to forget — the caller's variable is modified in place. This is the pattern used whenever a function must modify a pointer variable that belongs to its caller, and it generalises: modifying a tail pointer from inside a helper function needs the same struct node ** treatment for the identical reason.

3. Use a dummy header (sentinel) node — a permanent, extra node that always sits before the real first node and is never itself deleted. head then always points at this dummy node, and the "real" first data node is dummy->next. Because head itself never needs to change (it always points at the same dummy node, for the lifetime of the list), insertion and deletion at the front stop being special cases at all: inserting at the front is just insertAfter(dummy, val), the exact same code path used for inserting anywhere else in the list. This is explored fully in its own section below, because it does more than solve the head-update problem — it removes an entire category of special-case code.

GATE TRAP: A function that takes struct node *head (single pointer, by value) and tries to permanently change what the list's head is CANNOT do so through that parameter, no matter what it assigns to the local head variable inside — the change is invisible outside. If a question shows such a function reassigning head and then asks "what is head after this call", the trick answer is "unchanged" unless the function explicitly returns the new value and the question's context shows the caller using that return value.

REMEMBER: Three fixes to the head-update problem, in increasing order of how much special-casing they remove: return the new head (caller must reassign); pass struct node ** (function writes directly into the caller's variable); use a dummy header node (there is no head variable that ever needs updating in the first place).

REVERSING A LINKED LIST — ITERATIVE

Reversal is the single most tested operation on linked lists, because it forces you to touch every pointer in the list while keeping track of three things at once, and it is worth deriving the algorithm from what has to be true, not just memorising the code.

To reverse 1 -> 2 -> 3 -> 4 into 4 -> 3 -> 2 -> 1, every node's next pointer must flip direction: node 1, which used to point to node 2, must end up pointing to NULL (it is now last); node 2 must end up pointing to node 1; node 3 to node 2; node 4 to node 3, and node 4 becomes the new head.

The obstacle: the moment you set node 1's next to NULL (its new, correct value), you have destroyed the only way to reach node 2 — the rest of the original list is gone unless you saved a pointer to it FIRST. So the algorithm needs, at every step, a pointer to the node currently being flipped (curr), a pointer to what it should now point to — the previously flipped node (prev) — and a pointer to what curr used to point to, saved before you overwrite it (next), so the walk can continue.

struct node *reverse(struct node *head) {
    struct node *prev = NULL, *curr = head, *next;
    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

[[FIG:reversal-pointers]]

Trace this in full on 10 -> 20 -> 30 -> 40 -> NULL. Initial state: prev = NULL, curr = node 10.

1. next = curr->next: next = node 20 (saved, so we do not lose the rest of the list).
2. curr->next = prev: node 10's next becomes NULL. Node 10 is now correctly pointing nowhere — it will be the new tail.
3. prev = curr: prev becomes node 10.
4. curr = next: curr becomes node 20. State after iteration 1: reversed portion so far is just 10 -> NULL, headed by prev; the untouched remainder is 20 -> 30 -> 40, headed by curr.
5. Iteration 2. next = curr->next = node 30.
6. curr->next = prev: node 20's next becomes node 10. Reversed portion is now 20 -> 10.
7. prev = curr = node 20.
8. curr = next = node 30. State: reversed 20 -> 10, headed by prev; remaining 30 -> 40, headed by curr.
9. Iteration 3. next = curr->next = node 40.
10. curr->next = prev: node 30's next becomes node 20. Reversed portion: 30 -> 20 -> 10.
11. prev = curr = node 30.
12. curr = next = node 40. State: reversed 30 -> 20 -> 10; remaining just 40, headed by curr.
13. Iteration 4. next = curr->next = NULL (node 40 was last).
14. curr->next = prev: node 40's next becomes node 30. Reversed portion: 40 -> 30 -> 20 -> 10.
15. prev = curr = node 40.
16. curr = next = NULL. The loop condition curr != NULL now fails; the loop ends.

The function returns prev, which is node 40 — exactly the new head of the reversed list 40 -> 30 -> 20 -> 10 -> NULL. Every node's next pointer now points backward relative to the original list, and the very last thing the loop did was set the original head's (node 10's) next field to NULL, which is correct because node 10 is now the last node.

speedup: (not applicable here — but the cost is) time = O(n), space = O(1)

REMEMBER: The loop invariant that makes this algorithm provably correct: at the top of every iteration, prev heads the fully-reversed chain of all nodes processed so far, and curr heads the untouched suffix of the original list, and these two pieces never overlap and together account for every node. When curr becomes NULL, the untouched suffix is empty, so prev heads the entire reversed list. This is exactly what q13 of this topic's question bank probes by asking for the state after exactly two iterations.

GATE TRAP: The order of the three body statements is not arbitrary. next = curr->next MUST come first, because it is the only place the original next-pointer value is ever read — the very next line overwrites curr->next. If you reordered to curr->next = prev before saving next, the rest of the list is permanently lost the first time through the loop, and only the first node survives.

REVERSING A LINKED LIST — RECURSIVE

The recursive version reverses everything after the first node, then attaches the first node to the end of that already-reversed remainder.

struct node *reverseRec(struct node *head) {
    if (head == NULL || head->next == NULL) return head;
    struct node *newHead = reverseRec(head->next);
    head->next->next = head;
    head->next = NULL;
    return newHead;
}

The base case is a list of zero or one node: nothing to reverse, return it as is. This base case is essential — without the head->next == NULL arm, a one-node list would recurse into reverseRec(NULL), which the head == NULL arm catches, but tracing the RETURN VALUE flow needs both cases understood together.

Trace on 1 -> 2 -> 3 -> NULL. Call reverseRec(1). head is node 1, not NULL, and head->next (node 2) is not NULL, so we recurse: newHead = reverseRec(2).

That call: head is node 2, head->next is node 3, not NULL, so recurse again: newHead = reverseRec(3).

That call: head is node 3, head->next is NULL — base case — return head, i.e. return node 3. This return value becomes newHead inside the reverseRec(2) frame.

Back in reverseRec(2): newHead = node 3. Now head->next->next = head means "node 2's next's next" — node 2's next is node 3, so this sets node 3's next to node 2: 3 -> 2. Then head->next = NULL sets node 2's own next to NULL (it will not stay pointing at 3, since 3 now points back at 2 — this cuts the old forward link before it becomes a cycle). Return newHead (still node 3) up to reverseRec(1).

Back in reverseRec(1): newHead = node 3 (passed all the way up unchanged from the deepest call — it never changes once found, because it IS the final answer, the new head, decided the moment the base case is hit). Now head->next->next = head: node 1's next is node 2, so this sets node 2's next to node 1: 2 -> 1. Then head->next = NULL: node 1's own next becomes NULL. Return newHead = node 3.

Final structure, read from newHead: 3 -> 2 -> 1 -> NULL. Correct.

KEY: In the recursive reversal, the value that eventually becomes the answer (the new head — always the ORIGINAL LAST node) is discovered first, at the deepest recursive call, and is then passed back up through every return UNCHANGED. What changes on the way back up, at each level, is the pointer surgery on the CURRENT head->next pair — attaching each node to its predecessor in reverse order as the recursion unwinds. This return-value-passes-through-unchanged pattern is worth recognising on sight; several list algorithms (finding the tail, computing recursively) share it.

GATE TRAP: head->next->next = head must run BEFORE head->next = NULL, for the same "read the old value before you overwrite it" reason seen everywhere else in this chapter — head->next->next needs to still equal the ORIGINAL next node's next field target computed from head->next, which requires head->next to still be valid (in this case it is a different field being changed, but the sequencing habit is the same: do the operation that depends on the current link before the operation that destroys it). Recursive reversal costs O(n) time like the iterative version, but O(n) space for the call stack, not O(1) — this space difference is a standard exam distinction between the two versions.

FINDING THE MIDDLE: SLOW AND FAST POINTERS

A recurring need — for merge sort on a list, for palindrome checking, for many others — is finding the middle node without knowing the length in advance (walking once to count, then again to the n/2 point, works but costs two passes; slow/fast pointers do it in one).

struct node *slow = head, *fast = head;
while (fast != NULL && fast->next != NULL) {
    slow = slow->next;
    fast = fast->next->next;
}
return slow;

The idea: slow advances one node per iteration, fast advances two. Every iteration, the gap between them grows by one node. When fast has covered the whole list, slow has covered exactly half of it — because it has taken exactly half as many steps.

Trace on the six-node list 1 -> 2 -> 3 -> 4 -> 5 -> 6. Start: slow = fast = node 1. Check the guard: fast (node 1) is non-NULL and fast->next (node 2) is non-NULL — enter the loop. slow = node 2, fast = node 3 (node 1's next->next). Check: fast (3) and fast->next (4) both non-NULL — continue. slow = node 3, fast = node 5. Check: fast (5) and fast->next (6) both non-NULL — continue. slow = node 4, fast = node 6's next, which is NULL (fast->next->next with fast = node 5 means node 5's next (6) then its next, which is NULL). Check the guard again: fast is NULL, so the loop stops. slow rests on node 4.

For a list of 6 (even length, 2k with k = 3), this guard delivers node 4 — the SECOND of the two middle nodes (positions 3 and 4 are the two middles of a 6-node list; this convention lands on position k+1). For an odd-length list, say 5 nodes, trace similarly: slow ends exactly on the true middle, position 3 of 5, with no ambiguity, because fast exhausts the list with fast->next becoming NULL rather than fast itself.

GATE TRAP: The exact guard condition determines which of the two middle nodes an even-length list yields, and GATE varies it. The guard fast != NULL && fast->next != NULL (used above) yields the SECOND middle for even length. The guard fast->next != NULL && fast->next->next != NULL yields the FIRST middle instead, because it stops one iteration earlier. There is no substitute for tracing the specific guard given in a question rather than recalling "the answer is always node n/2".

NTH NODE FROM THE END

Finding the k-th node from the end without knowing the list's length in advance (or without a second pass) uses two pointers held a fixed distance apart.

struct node *nthFromEnd(struct node *head, int k) {
    struct node *first = head, *second = head;
    for (int i = 0; i < k; i++) {
        if (first == NULL) return NULL;  /* list shorter than k */
        first = first->next;
    }
    while (first != NULL) {
        first = first->next;
        second = second->next;
    }
    return second;
}

The first pointer is advanced k steps alone, opening a gap of exactly k nodes between first and second. Then both advance together, one step at a time; the gap stays exactly k throughout. When first falls off the end (becomes NULL), second is exactly k nodes behind where first just was — which is exactly k nodes from the end of the list.

Trace finding the 2nd-from-end node of 1 -> 2 -> 3 -> 4 -> 5. Advance first alone by k = 2: first moves to node 2, then node 3 (second untouched, still node 1). Now advance both together: first -> 4, second -> 2; first -> 5, second -> 3; first -> NULL, second -> 4. Loop ends (first is NULL). Return second = node 4, which is indeed the 2nd node from the end of a 5-node list (order from the end: 5 is 1st, 4 is 2nd). Correct, in a single pass, O(n) time, O(1) space.

DETECTING A CYCLE: FLOYD'S TORTOISE AND HARE

A linked list is supposed to end in NULL. If some node's next pointer, instead, points back to an earlier node in the chain, the list contains a cycle: a plain forward traversal following while (p != NULL) never terminates, because p is never NULL — it just keeps going around the loop forever.

You cannot detect this by counting nodes as you go and comparing to "the length", because you do not know the length of a list you have not finished traversing, and a cyclic list has no well-defined length by node-count. One correct but costly method: keep a hash set of every node address visited, and if you ever see an address twice, there is a cycle. This works, but costs O(n) EXTRA SPACE, on top of the O(n) time to walk the visited nodes.

Floyd's algorithm — the tortoise and hare — achieves the same O(n) time with only O(1) extra space, using the same two-speed idea as the middle-finding pointers, but for a different purpose: detecting whether the fast pointer ever catches up to the slow one from behind, rather than measuring the gap between them.

struct node *slow = head, *fast = head;
while (fast != NULL && fast->next != NULL) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return slow;   /* cycle detected, meeting point */
}
return NULL;                          /* fast reached NULL: no cycle */

If there is no cycle, fast reaches NULL (or fast->next does) within at most n/2 iterations, since it moves twice as fast as a plain traversal that would take n steps, and the loop correctly reports no cycle. The interesting case is when a cycle exists.

[[FIG:floyd-meet]]

WHY THEY MUST MEET. Once both pointers have entered the cycle (which happens within a finite number of steps, since the non-cyclic "tail" leading into the cycle has finite length), think of the distance between fast and slow, measured going FORWARD around the cycle from slow to fast. Every iteration, slow advances by 1 and fast by 2, so fast's lead over slow, modulo the cycle's length C, increases by exactly 1 each iteration (fast gains one full step on slow, per iteration, once both are looping). A quantity that increases by 1 each step, modulo C, must eventually hit every residue including 0 — meaning fast's lead over slow becomes 0, i.e. they are at the same node. This must happen within at most C iterations once both are inside the cycle, so the two pointers are guaranteed to meet, and the total time is still O(n): O(n) to reach the cycle (if far), plus O(C) to meet inside it, and C ≤ n.

FINDING WHERE THE CYCLE STARTS. Once slow and fast have met somewhere inside the cycle, a second phase locates the exact node where the cycle begins (the first repeated node). Let L be the length of the tail before the cycle (number of nodes from head to the cycle's entry point), and C the cycle's length. By the time they meet, it can be shown that the meeting point is exactly L nodes (mod C) into the cycle from its entry point. The classical result: if you now move ONE of the two pointers back to head, and from that point advance BOTH pointers one step at a time (both now moving at the same, single speed), they meet again — and this second meeting point is exactly the cycle's entry node.

1. Detect the cycle: run slow/fast until they meet (as above), or conclude no cycle if fast reaches NULL.
2. Reset one pointer (say slow) to head; leave the other (fast) at the meeting point.
3. Advance both one step at a time, in lockstep, until they meet again.
4. The node where they meet the second time is the first node of the cycle.

CYCLE LENGTH. Once you know a meeting point inside the cycle (from step 1, before doing the reset), you can measure C directly: hold one pointer fixed at the meeting point, advance a second pointer one step at a time from there, counting steps, until it returns to the same node. The count is the cycle's length C.

GATE TRAP: The pointer speeds — slow moves 1, fast moves 2 — are what make the "gains one step per iteration" argument work, and they are what makes space O(1): the entire algorithm needs only two extra pointer variables, never a data structure whose size depends on n. A question asserting Floyd's algorithm "needs O(n) extra space" or "only works if the cycle includes the head node" is testing whether you actually understand the proof above rather than having memorised that "there's a fast and slow pointer".

MERGING TWO SORTED LISTS

Given two lists, each already sorted in increasing order, produce one sorted list containing all their nodes, without allocating any new nodes — only rewiring existing ones. This is the linked-list analogue of the merge step in merge sort, and it is worth doing both iteratively and recursively because the two versions teach different things.

Iterative, using a dummy node to avoid special-casing which list starts smaller:

struct node *mergeIter(struct node *a, struct node *b) {
    struct node dummy; dummy.next = NULL;
    struct node *tail = &dummy;
    while (a != NULL && b != NULL) {
        if (a->data <= b->data) { tail->next = a; a = a->next; }
        else                    { tail->next = b; b = b->next; }
        tail = tail->next;
    }
    tail->next = (a != NULL) ? a : b;   /* attach whichever list still has nodes left */
    return dummy.next;
}

Trace merging 1 -> 3 -> 5 with 2 -> 4. tail starts at dummy. Compare 1 and 2: 1 is smaller, tail->next = node 1 (a's head), advance a to node 3, advance tail to node 1. Compare 3 and 2: 2 is smaller, tail->next = node 2, advance b to node 4, tail to node 2. Compare 3 and 4: 3 is smaller, tail->next = node 3, advance a to node 5, tail to node 3. Compare 5 and 4: 4 is smaller, tail->next = node 4, advance b to NULL, tail to node 4. Loop condition fails (b is NULL). tail->next = a (node 5, since a is not NULL). Result, read from dummy.next: 1 -> 2 -> 3 -> 4 -> 5. O(n + m) time, O(1) extra space (the dummy is a single stack-allocated node; every other node is one of the input nodes, just rewired).

Recursive:

struct node *mergeRec(struct node *a, struct node *b) {
    if (a == NULL) return b;
    if (b == NULL) return a;
    if (a->data <= b->data) { a->next = mergeRec(a->next, b); return a; }
    else                    { b->next = mergeRec(a, b->next); return b; }
}

The base cases say: merging anything with an empty list is just that anything. Otherwise, whichever of a and b has the smaller head must come first in the result, and what follows it is the merge of ITS remainder with the other list unchanged — a smaller version of the same problem, which is exactly what makes it a valid recursion (the argument to mergeRec strictly shrinks each call, so it terminates). O(n + m) time, but O(n + m) space for the call stack, versus O(1) for the iterative version — the same trade seen between iterative and recursive reversal.

SPLITTING A LIST

The reverse operation of merging — dividing one list into two — is needed for merge sort on a linked list, and the standard method uses the slow/fast middle-finding technique already derived: find the middle with slow/fast pointers, then cut the link there.

void split(struct node *head, struct node **frontRef, struct node **backRef) {
    struct node *slow = head, *fast = head->next;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *frontRef = head;
    *backRef = slow->next;
    slow->next = NULL;
}

Notice fast starts one node ahead of slow here (fast = head->next), a deliberate shift from the earlier middle-finding code, chosen so that on an even-length list slow lands on the FIRST middle, giving two equal halves rather than the front half being one shorter. The struct node ** parameters are used because this function must update the CALLER's two pointer variables (front and back), exactly the head-pointer-update problem solved earlier — a plain struct node * parameter could not report the split back to the caller.

REMOVING DUPLICATES: SORTED AND UNSORTED

In a SORTED list, every duplicate of a value is adjacent to it, so a single pass comparing each node to its immediate successor suffices:

void removeDupsSorted(struct node *head) {
    struct node *curr = head;
    while (curr != NULL && curr->next != NULL) {
        if (curr->data == curr->next->data) {
            struct node *dup = curr->next;
            curr->next = curr->next->next;
            free(dup);
        } else {
            curr = curr->next;
        }
    }
}

The subtlety: curr only advances when NO duplicate was removed. If a duplicate is found and skipped, curr must stay put, because curr's NEW next (what used to be next->next) might ALSO equal curr->data — three or more copies of the same value in a row must all be removed by repeatedly rechecking the same curr, not by unconditionally moving on. O(n) time, O(1) space.

In an UNSORTED list, duplicates can be anywhere, so each node must be compared against every node before it. Without extra memory, this is the O(n²) approach: for each node, scan all earlier nodes for a match, delete on a hit. With an auxiliary hash set (O(n) extra space), each node's value is checked against the set — O(1) expected lookup — and inserted if new, giving O(n) time overall. This space-for-time trade — O(n²)/O(1) versus O(n)/O(n) — is a standard pattern the topic tests directly: know both, and know which resource (time or space) each buys back.

CHECKING FOR A PALINDROME

A list is a palindrome if it reads the same forwards and backwards: 1 -> 2 -> 3 -> 2 -> 1. Checking this needs to compare the front half against the reversed back half, which combines three techniques already built in this chapter.

1. Find the middle using slow/fast pointers.
2. Reverse the second half (from the middle onward), using the iterative reversal already derived.
3. Walk from head and from the reversed second half's new head simultaneously, comparing data at each step; any mismatch means not a palindrome.
4. (Optional, to leave the list undamaged) reverse the second half back, restoring the original list.

This costs O(n) time and O(1) extra space — no array copy of the values is needed, because the reversal is done in place on the list's own nodes. An O(n) space alternative — copy every value into an array and check the array as a palindrome, or push the first half onto a stack while walking, then pop and compare against the second half — is simpler to write but trades away the O(1) space property that makes the pointer-based method worth knowing.

INTERSECTION POINT OF TWO LISTS

Two singly linked lists that eventually merge into a shared tail (common in problems modelling shared resources) — for instance list A: 1 -> 2 -> 3 -> 6 -> 7 -> 8, list B: 4 -> 5 -> 6 -> 7 -> 8, sharing the tail 6 -> 7 -> 8 — have an intersection point: the first node that belongs to both. Since the lists are singly linked, once they merge they stay merged (a node cannot have two different next pointers), so the intersection is a single node onward, not an interleaving.

The lengths may differ, and the trick is to neutralise that difference without needing extra memory. First, measure both lengths (two O(n) walks). Let d be the difference in length. Advance the pointer into the LONGER list by d nodes first. Now both pointers are the same distance from the end. Advance both together, one step at a time, comparing pointers (not data — two different-valued nodes could coincidentally match by value; comparing addresses is the only safe test) for equality; the first node where they coincide is the intersection point, and if they both reach NULL without ever coinciding, the lists do not intersect.

Trace on the example above. Length of A = 6, length of B = 5, d = 1. Advance A's pointer by 1 node: it now sits at node 2, with 5 nodes remaining to the end of A (2,3,6,7,8), matching B's 5 nodes exactly. Advance both together: A at 2, B at 4 — no match. A at 3, B at 5 — no match. A at 6, B at 6 — same node (by address): this is the intersection. Total O(n + m) time, O(1) space.

DOUBLY LINKED LISTS

Everything so far has paid a fixed price for singly linked structure: you can move forward, never backward, so the previous-node problem recurs constantly — for deletion, for reversing walks, for finding the second-to-last node. A doubly linked list removes this cost by giving every node a second pointer.

struct dnode {
    int data;
    struct dnode *prev;
    struct dnode *next;
};

Now every node knows both its neighbours directly. The first node's prev is NULL (nothing before it); the last node's next is NULL (nothing after it) — the empty-list and end-of-list conventions carry over unchanged, just doubled.

The benefit is immediate and it is the main reason a DLL is chosen over a singly linked list: DELETING A NODE GIVEN ONLY A POINTER TO IT is now O(1), with no walk required at all, because the node itself carries a pointer to its predecessor.

void deleteDNode(struct dnode *p) {
    if (p->prev != NULL) p->prev->next = p->next;
    if (p->next != NULL) p->next->prev = p->prev;
    free(p);
}

Trace deleting node B from A <-> B <-> C. p->prev (A) is not NULL, so A->next = p->next = C — A now points forward to C. p->next (C) is not NULL, so C->prev = p->prev = A — C now points backward to A. Free B. Result: A <-> C, correctly linked in both directions, found without walking anywhere, because both neighbours were already directly reachable from p.

Insertion between two nodes, though, needs care with ORDER, because now there are four pointer fields to set (compare: two for singly linked insertion), and getting the order wrong loses information the same way it did earlier in the chapter.

[[FIG:dll-insert]]

void insertBetween(struct dnode *a, struct dnode *b, int val) {
    struct dnode *n = malloc(sizeof(struct dnode));
    n->data = val;
    n->next = b;
    n->prev = a;
    a->next = n;
    b->prev = n;
}

1. n->next = b — set the new node's forward pointer to b, using b directly (not through a, so order relative to step 4 does not matter yet).
2. n->prev = a — set the new node's backward pointer to a.
3. a->next = n — NOW overwrite a's forward pointer, which used to point at b, to point at n instead. This must come AFTER step 1 only in the sense that step 1 did not need a->next's old value at all (it read b directly) — but it matters relative to step 4: had you done a->next = n before also fixing b->prev, no information would yet be lost, since b itself is still directly known. The genuinely unsafe reordering is doing step 4 before capturing b's IDENTITY anywhere — but since b is a parameter, not reached only via a stale pointer, this particular insertion is more forgiving than singly linked insertion. The safe, standard order is nonetheless as numbered: wire the new node completely first, then splice it in.
4. b->prev = n — overwrite b's backward pointer, which used to point at a, to point at n instead.

After all four writes: a -> n -> b forward, and b -> n -> a backward. Both directions are consistent, and neither a nor b lost the ability to reach n.

GATE TRAP: A DLL's extra pointer is not free. Every node costs one additional pointer's worth of memory (commonly 8 bytes more, on a 64-bit system, per node), and every insertion and deletion touches TWO pointer fields on each of up to two neighbouring nodes rather than one — roughly double the pointer writes of the singly linked equivalent. The O(1) given-node deletion is bought with this constant memory and constant-factor time overhead, paid on every node whether or not that particular node is ever deleted via this shortcut.

KEY: The entire value of a doubly linked list boils down to one sentence: a node knows its own predecessor, so any operation that a singly linked list could only do by first finding the predecessor (deletion given a node, walking backward, finding the second-to-last node) becomes O(1) instead of O(n).

CIRCULAR LINKED LISTS

A circular list closes the chain: instead of the last node's next (or, in a doubly linked circular list, also the first node's prev) being NULL, it points back to the first node. There is no NULL anywhere in a non-empty circular list, which is the fact that changes the traversal idiom completely.

Because while (p != NULL) would never become false — the pointer just keeps cycling around the ring — traversal must instead test against a REMEMBERED starting point, using a do-while so the first node is visited before the test is checked (a plain while (p != start) would never execute at all if p starts equal to start):

struct node *p = start;
do {
    printf("%d ", p->data);
    p = p->next;
} while (p != start);

This visits every node exactly once and stops after a full lap, because p returns to start only once it has gone all the way around.

GATE TRAP: Using while (p != NULL) on a circular list is an infinite loop, not a crash — a very different failure mode from the singly linked traps seen earlier, and a common code-reading question is simply "what happens when this ordinary-looking traversal is run on a circular list instead of a linear one".

The practical reason circular lists are used: keeping a single pointer to the LAST node (rather than the first) gives O(1) access to BOTH ends, because last->next is the first node, reachable in one hop.

struct node *insertFrontCirc(struct node *last, int val) {
    struct node *n = malloc(sizeof(struct node));
    n->data = val;
    if (last == NULL) { n->next = n; return n; }   /* first node: circular onto itself */
    n->next = last->next;   /* n now points at the old first node */
    last->next = n;         /* the last node now points at n */
    return last;             /* last is unchanged: n became the new FIRST node, not last */
}

struct node *insertRearCirc(struct node *last, int val) {
    struct node *n = malloc(sizeof(struct node));
    n->data = val;
    if (last == NULL) { n->next = n; return n; }
    n->next = last->next;
    last->next = n;
    return n;                /* n becomes the new LAST node: caller must update its last pointer */
}

Both insertions do the SAME two pointer writes (n->next = last->next; last->next = n;) — the only difference between "insert at front" and "insert at rear" of a last-node-anchored circular list is which node the caller subsequently treats as last. This is exactly why, with a last pointer, both front and rear insertion are O(1): there is no walk in either case, only a decision about which pointer variable to update afterward.

GATE TRAP: Deleting the LAST node of a circular list anchored by a last pointer is still O(n), because — exactly as with a plain singly linked list's tail deletion — you must find the SECOND-to-last node (whose next must become the new last->next, wrapping to first) by walking almost the entire circle; last->next alone does not give you the node before last. This is precisely the asymmetry tested in q12 of this topic's question bank: three operations are O(1) with a last-node pointer (front insert, rear insert, front delete), one is not (rear delete).

Circular lists model two classic use cases directly. ROUND ROBIN scheduling (met properly in the OS syllabus) keeps every ready process in a circular list and repeatedly serves the process at the "current" pointer, then advances the pointer — the circularity means "after the last process, go back to the first" requires no special-case code at all, it falls out of the traversal itself. The JOSEPHUS PROBLEM — n people in a circle, every k-th person eliminated in turn until one remains — is naturally modelled by a circular list: maintain a pointer, step k − 1 nodes forward, delete the k-th (using the given-node deletion pattern from earlier, adapted so the walk simply continues past the deleted node's old successor), and repeat until only one node's next points to itself.

A doubly linked list can also be made circular: the last node's next points to the first, AND the first node's prev points to the last, closing the loop in both directions. This combines the benefits of both extensions — O(1) deletion given any node's pointer (from being doubly linked), and O(1) access to both ends from a single anchor with no NULL to trip over (from being circular).

THE HEADER (SENTINEL) NODE IDIOM

Return to the head-update problem and look at it from a different angle: much of the special-casing throughout this chapter — "if the list is empty, do X, otherwise do Y", "if this is the first node, update head instead of a previous node's next" — exists because the FIRST real node has no predecessor to hold a pointer to it except the head variable itself, and an empty list has no nodes at all to operate on.

A sentinel (or dummy header) node removes this asymmetry by ensuring there is ALWAYS at least one node before any real data node, even when the list is logically empty. The head pointer is set ONCE, at initialisation, to this sentinel, and is never reassigned again for the rest of the program's life — insertion and deletion at the "front" of the list become ordinary insertAfter(sentinel, val) and deleteNode-style operations on the node after the sentinel, using the exact same code path as insertion or deletion anywhere else in the list.

struct node sentinel;
sentinel.next = NULL;     /* logically-empty list: sentinel.next is the "real" list */

void insertFrontS(int val) { insertAfter(&sentinel, val); }
int isEmptyS(void) { return sentinel.next == NULL; }

Every function that used to special-case "is this the first node?" or "is the list empty?" now simply operates uniformly starting from &sentinel, because &sentinel plays the role of "the node before the first real node" even when there is no first real node yet (sentinel.next == NULL). The mergeIter function earlier in this chapter already used exactly this trick (the local dummy variable) to avoid writing separate code for "which input list's head is smaller".

KEY: A sentinel node's entire purpose is to convert edge cases into ordinary cases. It costs one extra node's worth of memory, permanently, in exchange for deleting an entire category of if (head == NULL) / if (p == head) branches from every operation. This is a standard technique, not specific to linked lists — many tree and graph implementations use an analogous sentinel for the same reason.

SKIP LISTS, IN BRIEF

A skip list layers several linked lists on top of a base sorted linked list: the base level contains every element, and each level above it contains a randomly chosen subset of the level below (typically each element is promoted to the next level up with probability 1/2), forming "express lanes" that let a search skip over many base-level nodes at once — start at the top level, move forward while the next node's value is still less than the target, then drop down a level and repeat, converging on the target in expected O(log n) time rather than the O(n) a plain linked list requires, while still supporting O(1) insertion and deletion once the right position is found, because it remains a linked structure rather than a fixed array. It is the linked-list world's answer to "can we get logarithmic search without giving up cheap insertion", used in practice inside structures like Redis's sorted sets.

COMPLEXITY ACROSS ALL THE VARIANTS

Pulling every result derived above into one table, for a list of n nodes:

• Singly linked, head only — access k-th: O(k). Insert at head: O(1). Insert at tail: O(n) (walk required). Delete head: O(1). Delete tail: O(n) (walk to second-to-last). Delete given node pointer: O(n) (walk to find predecessor, or use the copy-trick in O(1) if not the last node). Search/length: O(n).
• Singly linked, head AND tail pointer — insert at tail becomes O(1); everything else in the row above is unchanged, because tail helps only with reaching the END for INSERTION, not with finding a PREDECESSOR for deletion.
• Doubly linked, head only — delete tail: O(1) (tail found by walking? no — actually still needs a tail pointer or a walk; a DLL with only head still needs O(n) to reach the last node without a tail pointer). Delete GIVEN node pointer: O(1) (the headline benefit of the extra prev pointer). Insert/delete at head: O(1).
• Doubly linked, head AND tail — every one of insert-front, insert-rear, delete-front, delete-rear, delete-given-node becomes O(1). Only access-by-position and search remain O(n), because reaching an arbitrary position still requires a walk regardless of how many pointers a node carries.
• Circular singly linked, anchored by a LAST pointer — insert-front: O(1). Insert-rear: O(1). Delete-front: O(1). Delete-rear: O(n) (predecessor of last still needs a walk). Access/search: O(n).
• Circular doubly linked, anchored by any single node pointer — insert/delete at both ends: O(1), including delete-rear, because the doubly linked structure supplies the predecessor of any node (including the anchor) directly. This is the most operation-rich of all the variants, at the highest per-node memory cost.

GATE TRAP: "Doubly linked" and "has a tail pointer" are independent upgrades that solve DIFFERENT problems — doubly linked buys O(1) deletion given a node's pointer (backward information), a tail pointer buys O(1) insertion at the end (forward reach without a walk). A question describing a structure with only one of the two must not be answered as if it had both; check exactly which pointers the question grants before answering an operation-cost question.

POLYNOMIAL REPRESENTATION AND ADDITION

A classic application: represent a polynomial like 5x^3 + 3x^1 + 2x^0 as a linked list of nodes, each holding a coefficient, an exponent, and a next pointer, with nodes kept in strictly decreasing order of exponent and any zero-coefficient term simply omitted (never stored).

struct term {
    int coeff;
    int exp;
    struct term *next;
};

Adding two such polynomials, represented as lists A and B both sorted by decreasing exponent, mirrors the merge of two sorted lists seen earlier, with one extra case: when two terms share the same exponent, their coefficients are summed into a single term (and the term is dropped entirely if the sum is zero); when the exponents differ, the term with the larger exponent is copied into the result first, since the result must also stay sorted by decreasing exponent, and only the list with the larger-exponent term advances.

1. Compare the leading (first) terms of A and B by exponent.
2. If A's exponent is larger, copy A's term to the result and advance A alone.
3. If B's exponent is larger, copy B's term to the result and advance B alone.
4. If the exponents are equal, add the coefficients; if the sum is nonzero, append one term with that sum and this exponent; either way, advance BOTH A and B.
5. Repeat until one list is exhausted, then copy the remainder of the other list unchanged.

Trace adding 5x^3 + 4x^1 + 2x^0 to 3x^3 + 6x^2 + 1x^0. Compare exponents 3 and 3: equal, add coefficients 5 + 3 = 8, append 8x^3, advance both. Compare 1 and 2: B's exponent (2) is larger, append 6x^2, advance B alone. Compare A's 1 and B's 0: A's exponent (1) is larger, append 4x^1, advance A alone. Compare A's 0 and B's 0: equal, add 2 + 1 = 3, append 3x^0, advance both — both lists now exhausted. Result: 8x^3 + 6x^2 + 4x^1 + 3x^0. This is O(n + m) time, exactly like sorted-list merging, because each step advances at least one of the two input pointers by one term and does O(1) work.

READING SOMEONE ELSE'S POINTER CODE

A large share of exam questions on this topic give a short C function operating on struct node and ask what it does, what it prints, or whether it is safe — without naming the operation in advance. The method is always the same: pick a small concrete list, trace the code statement by statement exactly as done throughout this chapter, and read off the answer from the final state, rather than trying to recognise the function by its shape from memory.

Three recurring shapes are worth knowing by their SIGNATURE, because recognising the shape narrows down what to check for. A function returning int and doing nothing but advancing a pointer while incrementing a counter is computing length or a count of nodes matching some condition (as in q10 of this topic's bank, which counts nodes via recursion). A function taking a single struct node * and rewiring next fields inside a loop or via recursion, without ever calling malloc, is almost certainly a reversal or a rewiring-in-place operation like "delete alternate nodes" (q8's one-liner, extended into a loop) — check whether it changes DATA (a swap, like q11) or POINTERS (a structural change, like reversal) by looking at which fields the assignments touch. A function with two differently-paced pointers (one advancing by one step, one by two) is a slow/fast application: middle-finding if there is no equality check inside the loop, cycle detection if there is.

GATE TRAP: "Does this function leak memory?" and "does this function crash?" are different questions, and both are asked. A function that sets a node's incoming pointer to skip over it (p->next = p->next->next;) WITHOUT calling free on the skipped node does not crash — the list is perfectly well-formed afterward — but it DOES leak: that node's memory is no longer reachable from any pointer the program holds, and in C it is never automatically reclaimed. Conversely, a function that calls free(p) and then later dereferences p (a "use after free") does not necessarily leak, but it invokes undefined behaviour, which may crash immediately, may silently corrupt data, or may appear to work by chance — "it worked when I ran it" is not evidence that such code is correct.

WORKED PROBLEMS

Each of these is a pattern that appears in the paper. Follow the working, not just the answer.

1. Trace the iterative reversal function on 10 -> 20 -> 30 -> 40 -> NULL and give the complete state (prev, curr, next, and the list so far) after each of the four iterations.
   Start: prev = NULL, curr = 10, list unchanged.
   Iteration 1: next = 20; 10->next = NULL; prev = 10; curr = 20. Reversed so far: 10 -> NULL. Remaining: 20 -> 30 -> 40.
   Iteration 2: next = 30; 20->next = 10; prev = 20; curr = 30. Reversed so far: 20 -> 10. Remaining: 30 -> 40.
   Iteration 3: next = 40; 30->next = 20; prev = 30; curr = 40. Reversed so far: 30 -> 20 -> 10. Remaining: 40.
   Iteration 4: next = NULL; 40->next = 30; prev = 40; curr = NULL. Reversed so far: 40 -> 30 -> 20 -> 10. Loop ends (curr == NULL). Return prev = 40. Final list: 40 -> 30 -> 20 -> 10 -> NULL.

2. What does the following function do, and what does it print on 1 -> 2 -> 3 -> 4 -> 5 -> NULL?

   int f(node *p) {
       if (p == NULL) return 0;
       if (p->data % 2 == 0) return 1 + f(p->next);
       return f(p->next);
   }

   Each call adds 1 exactly when the CURRENT node's data is even, and otherwise passes the count through unchanged; the base case contributes 0. So f computes the count of nodes with EVEN data. On 1,2,3,4,5: node 1 (odd) contributes 0 + f(rest); node 2 (even) contributes 1 + f(rest); node 3 (odd) contributes 0 + f(rest); node 4 (even) contributes 1 + f(rest); node 5 (odd) contributes 0 + f(NULL) = 0. Total = 1 (from node 2) + 1 (from node 4) = 2.

3. A list is A -> B -> C -> D -> E. Write the deletion of node C, given only the head pointer and C's value, and show the state of prev and curr at the moment of deletion.
   Walk with prev = NULL, curr = head = A. curr->data != C, so prev = A, curr = B. Still no match: prev = B, curr = C. Now curr->data matches: stop walking (do not advance further, or the predecessor is lost). At this point prev = B, curr = C. Delete: prev->next = curr->next, i.e. B->next = D. Free C. Result: A -> B -> D -> E. Note prev was needed and was tracked one step behind curr throughout, which is the general shape of every previous-node deletion in a singly linked list.

4. Run Floyd's algorithm on the list 1 -> 2 -> 3 -> 4 -> 5, where node 5's next points back to node 3 (a cycle of length 3: 3 -> 4 -> 5 -> 3). Trace until the pointers meet, then find the cycle's start.
   Start: slow = fast = 1. Step 1: slow = 2, fast = 3. Step 2: slow = 3, fast = 5 (3's next is 4, 4's next is 5). Step 3: slow = 4, fast = 4 (5's next is 3, 3's next is 4) — slow and fast are BOTH at node 4: they meet. Now reset slow to head (node 1); leave fast at node 4. Advance both one step at a time: slow = 2, fast = 5. Again: slow = 3, fast = 3 (5's next is 3) — they meet at node 3. Node 3 is the cycle's entry point, matching the list's actual construction (3 -> 4 -> 5 -> 3 is exactly the cycle described).

5. Insert a new node N with value 15 between nodes A (value 10) and B (value 20) in a doubly linked list, writing the four pointer assignments in a safe order, and state what breaks if the order is reversed.
   Safe order: n->next = B; n->prev = A; A->next = n; B->prev = n. After these four: A <-> N <-> B, both directions consistent. If instead A->next = n were done FIRST, followed by n->next = B — the assignment n->next = B still succeeds correctly here since B is passed in directly as a parameter and never derived through A, so this particular reordering happens not to lose information. The genuinely unsafe reordering is if n->prev and n->next were computed by reading them back off of A and B AFTER A and B had already been repointed at n (for instance, computing n->next as A->next after A->next had already been set to n) — that would set n->next to n itself, an immediate self-loop. The general rule stands: always finish setting the NEW node's own pointers using values that have not yet been overwritten, before splicing the new node into the existing chain.

6. Compare: a singly linked list has both head and tail pointers. A doubly linked list has only a head pointer. For each of (a) insert at front, (b) insert at rear, (c) delete the last node given only its value, state the time complexity for each structure.
   Singly linked with head+tail: (a) insert at front O(1) — two pointer writes at head, no walk. (b) insert at rear O(1) — tail pointer gives direct access, attach then move tail. (c) delete last node given its value O(n) — even knowing WHICH node to delete, its PREDECESSOR must still be found by walking from head, since a singly linked node holds no backward pointer, and a tail pointer does not help find the SECOND-to-last node.
   Doubly linked with only head: (a) insert at front O(1) — no walk needed at head regardless. (b) insert at rear O(n) — with no tail pointer, the last node must first be reached by walking from head, even though a doubly linked node WOULD support O(1) deletion once reached. (c) delete last node given its value O(n) to REACH it (search from head, since only head is kept) but O(1) to actually detach it once found, using node->prev directly — so the search dominates, giving O(n) overall, but for a different reason than the singly linked case: here the walk is to FIND the node, not to find its predecessor, since the node's own prev pointer supplies that. This question is testing whether "doubly linked" and "has a tail pointer" are correctly kept as two independent facts rather than assumed to always come together.

7. A polynomial 4x^5 + 3x^2 + 7 is added to 2x^5 + 6x^3 + 1x^2 + 4. Give the result as a linked list of (coeff, exp) terms, showing which comparison rule fires at each step.
   Compare exponents 5 and 5: equal, sum coefficients 4 + 2 = 6, append (6, 5), advance both. Compare 2 and 3 (first list's next term is exp 2, second's is exp 3): second's exponent (3) is larger, append (6, 3), advance the second list alone. Compare 2 and 2: equal, sum 3 + 1 = 4, append (4, 2), advance both. Compare 0 and 0 (the two constant terms, exponent 0): equal, sum 7 + 4 = 11, append (11, 0), advance both — both lists exhausted. Result: 6x^5 + 6x^3 + 4x^2 + 11.

WHAT TO CARRY INTO THE NEXT TOPIC

Every pointer-surgery habit built here — draw the boxes, name every pointer, write down the order you assign them in and check whether an assignment destroys a value a later line still needs — is exactly the discipline that trees and graphs need, just with more than one "next" field per node. A binary tree node's left and right pointers are rewired with the same rules; a graph's adjacency list is, node for node, the linked list built in this chapter, one list per vertex. The head-pointer-update problem reappears as "how does a recursive tree function tell its caller that the root changed" and is solved the same three ways. If reversal, the previous-node problem, and Floyd's algorithm are solid, the traversal and structural-change algorithms in the next topic will look like variations on a theme you already know, rather than new material.
`
};
