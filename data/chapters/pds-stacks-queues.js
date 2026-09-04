// Textbook chapter: Stacks and Queues.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/pds.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — either from the figs list below or from this
// topic's own figure set in data/questions/pds.js (stack-push-pop, circular-queue).

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['pds-stacks-queues'] = {
  figs: [
    {
      id: 'activation-record-stack',
      caption: 'Calling factorial(3) pushes a frame per call. The most recent call sits on top; returning pops it.',
      svg: '<svg viewBox="0 0 300 260" width="100%" style="max-width:360px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-sq-act" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.5" fill="none"><rect x="40" y="190" width="220" height="50"/><rect x="40" y="130" width="220" height="50"/><rect x="40" y="70" width="220" height="50"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><text x="150" y="212">factorial(1): n=1, return to factorial(2)</text><text x="150" y="152">factorial(2): n=2, return to factorial(3)</text><text x="150" y="92">factorial(3): n=3, return to caller</text></g><g font-size="10" fill="currentColor"><text x="40" y="255">bottom — oldest call</text><text x="40" y="55">top — most recent call</text></g><line x1="150" y1="240" x2="150" y2="65" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#ah-sq-act)"/></svg>'
    },
    {
      id: 'expr-tree',
      caption: 'The expression tree for a + b * c. Operators are the internal nodes, operands the leaves; postfix and prefix are just two orders of visiting it.',
      svg: '<svg viewBox="0 0 260 200" width="100%" style="max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.4" fill="none"><line x1="130" y1="30" x2="60" y2="100"/><line x1="130" y1="30" x2="190" y2="100"/><line x1="190" y1="100" x2="150" y2="170"/><line x1="190" y1="100" x2="230" y2="170"/><circle cx="130" cy="30" r="16"/><circle cx="60" cy="100" r="16"/><circle cx="190" cy="100" r="16"/><circle cx="150" cy="170" r="16"/><circle cx="230" cy="170" r="16"/></g><g font-size="13" fill="currentColor" text-anchor="middle"><text x="130" y="35">+</text><text x="60" y="105">a</text><text x="190" y="105">*</text><text x="150" y="175">b</text><text x="230" y="175">c</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

Every data structure so far in this course — an array, a variable, a struct — lets you touch any element whenever you like. Stacks and queues are the opposite idea: they are deliberately restrictive. A stack will only ever hand you the element you inserted most recently. A queue will only ever hand you the element you inserted longest ago. That restriction sounds like a limitation, but it is exactly the right shape for an enormous range of real problems: a chain of function calls, a browser's back button, a printer's job list, an editor's undo history, a breadth-first search. This chapter builds both structures from nothing, works through their classic algorithms by hand, and then asks the puzzle questions GATE builds around them.

What comes next in the course — trees, hashing, graphs — will use a stack or a queue as scaffolding: tree traversal without recursion uses an explicit stack, breadth-first search uses a queue, and the heap you will meet later is itself a specialised priority queue. Getting the two structures solid here means those chapters can just say "push it" or "enqueue it" without re-deriving what that means.

THE ABSTRACT DATA TYPE: WHAT YOU CAN DO, NOT HOW IT IS BUILT

Before building anything, separate two questions that are easy to blur together: what operations does a structure support, and how are those operations carried out in memory. The first question defines an abstract data type, or ADT — a list of operations and what each one is guaranteed to do, with no commitment to arrays, linked lists, or anything else. The second question is the implementation, and a single ADT can have several correct implementations that differ only in their cost.

A stack, as an ADT, is defined purely by push (add an item), pop (remove and return the most recently added item still present), peek or top (look at that item without removing it), and isEmpty (report whether anything remains). Nothing in that list mentions arrays or pointers. You could build a stack out of an array, a linked list, or even two queues (a puzzle worked out later in this chapter) — a program written against the stack ADT does not need to know or care which.

KEY: An ADT is a contract of operations and guarantees, not a memory layout. "Stack" names a discipline — last in, first out — and any structure obeying that discipline, however built, is a valid stack. The same holds for "queue" and first in, first out.

This distinction matters for exam questions that describe an unfamiliar structure by its operations rather than its name: if a question says "insertions and deletions both happen at one end only, and the last thing inserted is the first thing removed," that is a stack, whatever the question calls it.

THE STACK: LAST IN, FIRST OUT

A stack keeps its elements in a single ordered sequence, but exposes only one end of it, called the top. Every insertion and every removal happens at the top, and nowhere else. Because the element removed is always the one most recently added, this discipline is called LIFO — last in, first out.

Picture a stack of plates. You place a new plate on top of the pile, and you take a plate off the top of the pile. You cannot pull a plate from the middle without first removing everything above it. That constraint — top only — is the entire definition of a stack; everything else in this section is consequence.

• push(x) — place x on top. The new x becomes the element that any subsequent pop will return, until something is pushed after it.
• pop() — remove and return the top element. If the stack is empty, this is an error (underflow), because there is nothing to remove.
• peek() (also called top()) — return the top element without removing it. Useful when you need to look before deciding whether to pop.
• isEmpty() — true iff the stack currently holds no elements.

[[FIG:stack-push-pop]]

Push values 1, 2, 3 onto an empty stack, in that order. The stack, bottom to top, is now 1, 2, 3, with 3 on top — 3 was pushed last. A pop returns 3, the most recent arrival, leaving 1, 2 with 2 now on top. A second pop returns 2, leaving 1 alone. Pop a third time and 1 is returned, and the stack is empty. The order out — 3, 2, 1 — is the exact reverse of the order in — 1, 2, 3. That reversal is the single fact you should associate with LIFO before anything else.

KEY: A stack always reverses the order of arrival among the elements it releases in one unbroken run of pops. This is why a stack is the natural tool whenever a problem needs "undo the most recent thing first" or "process in reverse of arrival."

THE STACK AS AN ARRAY

The most direct way to build a stack is an array of some fixed capacity, MAX_SIZE, together with a single integer, top, that records the array index of the current top element. There is no need to move any other element when you push or pop — only top changes, and one array cell is written or read.

Before anything is pushed, the stack is empty and there is no top element, so top is initialised to −1 — an index that points at nothing, one below the first valid slot. This choice is not arbitrary: it makes both the empty test and the push/pop bookkeeping a single clean comparison, as the trace below shows.

push(x): first check top == MAX_SIZE − 1. If so, every slot is already used and there is nowhere to put x — this is overflow, and the operation must fail rather than write past the array. Otherwise, increment top, then store x at array[top].

pop(): first check top == −1. If so, the stack is empty and there is nothing to remove — this is underflow. Otherwise, read array[top], decrement top, and return the value read.

top == MAX_SIZE − 1  is overflow
top == −1  is underflow

Trace this on an array of capacity MAX_SIZE = 4 (valid indices 0 to 3), starting empty.

1. top = −1. Stack is empty.
2. push(10): top ≠ 3, so no overflow. top becomes 0. array[0] = 10. Stack (bottom→top): 10.
3. push(20): top becomes 1. array[1] = 20. Stack: 10, 20.
4. push(30): top becomes 2. array[2] = 30. Stack: 10, 20, 30.
5. push(40): top becomes 3. array[3] = 40. Stack: 10, 20, 30, 40. Now top == MAX_SIZE − 1 == 3 — the array is full.
6. push(50): checked first — top == 3 == MAX_SIZE − 1, so this is overflow. Nothing is written; 50 is rejected.
7. pop(): top ≠ −1, so no underflow. Read array[3] = 40, return it, top becomes 2. Stack: 10, 20, 30.
8. pop(), pop(): return 30 then 20, top falls to 0. Stack: 10.
9. pop(): return 10, top becomes −1. Stack is empty again.
10. pop(): checked first — top == −1, so this is underflow. Nothing is returned; the call fails.

GATE TRAP: The overflow check is top == MAX_SIZE − 1, not top == MAX_SIZE. top is an index (0-based), so the last usable index is MAX_SIZE − 1; once top sits there, the array holds MAX_SIZE elements and is genuinely full. Writing the check as top == MAX_SIZE would let one more push through and corrupt memory past the array, or (going the other way) declare overflow one slot too early. Similarly, some texts initialise top to 0 with the first slot pre-filled as a sentinel; if a question states a different initial value for top, redo the two conditions from that statement rather than reusing −1 and MAX_SIZE − 1 by habit.

THE STACK AS A LINKED LIST

An array stack has one structural weakness: its capacity is fixed at MAX_SIZE when the array is created. If the program needs more than that, the array must be reallocated and copied — expensive, and impossible if the environment simply has no more contiguous memory of that size available. A linked stack sidesteps the size question entirely: each element is a separately allocated node with a value and a pointer to the next node, and the "top" is just a pointer to the first node in the chain, called head.

push(x): allocate a new node, set its next pointer to the current head, then set head to point at the new node. This is two pointer assignments, done in a fixed order — the new node's next must be set to the old head before head itself is overwritten, or the rest of the chain is lost. No traversal of the list is needed.

pop(): read the value stored in the node head points to, set head to head→next, and free the old head node. Again, no traversal — the operation touches only the first node.

Both operations are O(1): a constant number of pointer reads and writes, regardless of how many elements the stack holds, because both only ever touch the front of the list.

Why must a linked stack push and pop at the head, and not the tail? Removing from the tail of a singly linked list requires finding the second-to-last node, so its next pointer can be set to null — and finding that node means walking the whole list from head to just before the tail, an O(n) traversal. Insertion at the tail has the same problem in reverse: you must first reach the current tail to attach the new node after it. The head is the only end of a singly linked list that is reachable in O(1) without a traversal, which is exactly why it is the end a linked stack uses.

REMEMBER: push and pop on a linked stack both operate at the head, not the tail, and both are O(1) for that reason alone. If a question describes a linked-list stack that inserts and removes at the tail with only a head pointer maintained, its operations are O(n), not O(1) — check which end before quoting the complexity.

ARRAY OR LINKED LIST: WHICH ONE

Neither implementation is better in every situation; they trade different costs.

An array stack needs no per-element overhead (no pointer field), is stored contiguously so it is cache-friendly, and its push/pop are a handful of machine instructions with no allocation call. Its cost is the fixed capacity: you must know, or guess, an upper bound in advance, and a bound set too low causes overflow while one set too high wastes memory that sits unused.

A linked stack has no fixed capacity — it grows and shrinks by exactly one node per operation, limited only by the memory available to the whole program — at the cost of one pointer's worth of memory per element and a memory allocation or deallocation call on every push and pop, which is slower in practice than an array write even though both are O(1) asymptotically.

GATE TRAP: "Linked list implementations avoid overflow entirely" is only true up to the limits of available memory — a linked stack can still fail to allocate a new node if memory is exhausted. The distinction tested is not "can never overflow" versus "can overflow," but "capacity fixed at creation time" (array) versus "capacity limited only by total free memory" (linked list).

STACKS AT WORK: FUNCTION CALLS AND RECURSION

The first and most important stack application is one you already depend on every time a program runs, whether or not the program itself ever mentions a stack: the call stack that every procedural language maintains to manage function calls.

When a function is called, the CPU must remember where to resume once that function returns, what its parameters and local variables are, and — if it calls another function — where in its own execution to come back to. That bundle of information is called an activation record, or stack frame, and it is pushed onto the call stack at the moment the call is made. When the function returns, its frame is popped, and execution resumes exactly where the popped frame said to.

[[FIG:activation-record-stack]]

Recursion is nothing more than a function whose activation records happen to stack up because it calls itself. Trace factorial(3), where factorial(n) returns 1 if n ≤ 1, else n * factorial(n − 1):

1. factorial(3) is called. A frame for n = 3 is pushed. It needs factorial(2) before it can multiply.
2. factorial(2) is called from inside factorial(3). A frame for n = 2 is pushed on top. It needs factorial(1).
3. factorial(1) is called. A frame for n = 1 is pushed on top. Since n ≤ 1, it returns 1 immediately — no further recursive call.
4. factorial(1)'s frame is popped. Control returns to factorial(2), which computes 2 * 1 = 2 and returns it.
5. factorial(2)'s frame is popped. Control returns to factorial(3), which computes 3 * 2 = 6 and returns it.
6. factorial(3)'s frame is popped. The original caller receives 6.

Three frames existed on the stack at once, at the deepest point (step 3) — the recursion depth. This is exactly why unbounded recursion is dangerous: each call adds a frame, and if the recursion never reaches its base case, frames accumulate until the stack's memory region is exhausted, a stack overflow in the very literal sense of the array-stack overflow condition met earlier, just with the CPU's own call stack as the array.

KEY: Recursion is not a separate mechanism from the stack — it is what the stack looks like when a function is its own caller. Every recursive call pushes a frame; every return pops one. A recursion's maximum depth is the maximum number of frames ever on the stack at once, and that number is what a "how much stack does this recursion need" question is really asking.

GATE TRAP: A question describing a hand-simulated recursive trace is really asking you to draw the call stack. If asked "how many activation records exist when the base case is reached," count the pushed-and-not-yet-popped calls at that instant — for factorial(3) that is 3 (n=3, n=2, n=1), not the total number of calls made over the whole computation, and not the depth minus one.

STACKS AT WORK: CHECKING BALANCED PARENTHESES

A common practical question about a string is whether its brackets are properly nested: every opening bracket has a matching closing bracket of the same type, and no closing bracket appears before its match has been opened. A stack answers this in one linear pass.

The algorithm: scan the string left to right. On an opening bracket ( ( [ { ), push it. On a closing bracket ) ] } , pop the stack; if the stack was empty (nothing to pop) or the popped symbol is not the matching opening type, the string is unbalanced — stop immediately. If the scan finishes and the stack is empty, the string is balanced; if the scan finishes with symbols still on the stack, some opening bracket was never closed, so it is unbalanced.

Trace a passing case, "{[()]}" :

1. { : push. Stack: {
2. [ : push. Stack: {, [
3. ( : push. Stack: {, [, (
4. ) : pop. Popped ( matches ) — fine. Stack: {, [
5. ] : pop. Popped [ matches ] — fine. Stack: {
6. } : pop. Popped { matches } — fine. Stack: empty.
7. End of string, stack empty. Balanced.

Now trace a failing case, "{([)]}", where the middle bracket types are interleaved rather than properly nested:

1. { : push. Stack: {
2. ( : push. Stack: {, (
3. [ : push. Stack: {, (, [
4. ) : pop. The popped symbol is [, but ) needs a matching (. Mismatch — report unbalanced immediately, without reading the remaining "]" and "}".

Two further edge cases must also be checked, because they are exactly where a naive "just count brackets" approach fails where the stack method does not. A string like "(()" has more opens than closes: the scan finishes with ( left on the stack — unbalanced, correctly caught by "stack non-empty at the end." A string like "())" has a stray extra close: after "()" the stack is already empty, and the second ")" tries to pop an empty stack — unbalanced, correctly caught by "pop on empty stack." A count of opening brackets equal to closing brackets is necessary but not sufficient; "()]" has equal counts of one kind but is still unbalanced by type-matching, and "([)]" (the failing trace above) has equal counts of both kinds yet is still wrongly nested.

GATE TRAP: Balance-checking needs the stack for the ordering, not merely a count. A solution that keeps three separate counters, one per bracket type, and declares the string balanced when all three counters return to zero, will wrongly accept "([)]" as balanced — the counts do return to zero, but the nesting is interleaved rather than well-formed. Only the stack, which remembers the order brackets opened in, catches that.

THREE NOTATIONS FOR AN EXPRESSION

The expression a + b * c is written with the operators between their operands — this is infix, the notation you read and write normally, and it is ambiguous without extra rules: does the + or the * apply first? Infix needs precedence rules and, when those still are not enough, parentheses, to fix the meaning.

Postfix notation (also called Reverse Polish Notation) writes each operator immediately after its two operands: a b c * + means "multiply b and c, then add a to the result" — exactly a + b*c, but now unambiguous without a single parenthesis or precedence rule, because the position of each operator relative to its operands fixes the order of evaluation completely.

Prefix notation writes each operator immediately before its two operands: + a * b c, read as "add a to (the result of multiplying b and c)" — the same expression again, equally unambiguous.

[[FIG:expr-tree]]

All three notations describe the same expression tree: an internal node for each operator, with its two operands as children. Infix visits a node's left child, then the node, then its right child; prefix visits the node, then its left child, then its right; postfix visits the left child, then the right child, then the node. (This tree view is a preview — building and traversing expression trees properly is a topic in the trees chapter — but seeing that postfix and prefix are just tree traversals explains why both are perfectly unambiguous while infix, read left to right with no tree in hand, is not.)

Why do computers prefer postfix or prefix over infix? Because evaluating either needs only a single stack and a single left-to-right (or right-to-left) scan, with no need to ever look ahead for a matching parenthesis or compare precedences mid-evaluation — every decision at each token is local. Compilers convert the infix expressions programmers write into postfix (or an equivalent tree) internally for exactly this reason.

PRECEDENCE AND ASSOCIATIVITY, MADE PRECISE

Converting infix into postfix or prefix mechanically requires two rules to be stated exactly, because "the usual maths rules" is not precise enough for an algorithm.

Precedence ranks operators: ^ (exponentiation) highest, then * and / equal to each other, then + and − equal to each other, lowest. A higher-precedence operator binds its operands more tightly — it is evaluated first when two operators compete for the same operand.

Associativity resolves ties between operators of equal precedence, sitting next to each other with no parentheses to arbitrate. * , / , + and − are left-associative: a − b + c means (a − b) + c, evaluated left to right. ^ is the standard exception: it is right-associative, so a ^ b ^ c means a ^ (b ^ c), grouped right to left — 2 ^ 3 ^ 2 is 2 ^ (3^2) = 2^9 = 512, not (2^3)^2 = 64.

Why does right-associativity exist for ^ at all? Mathematical convention defines it that way — repeated exponentiation is overwhelmingly used to mean a tower built from the top, and defining it left-associative would make it behave identically to repeated multiplication in grouping, which is not how it is used. The algorithm below simply has to honour whichever associativity a given operator has.

GATE TRAP: The single most common infix-to-postfix error is treating every operator as left-associative, including ^. Under that mistake, a ^ b ^ c would wrongly become (a^b)^c. Whenever ^ appears more than once in a row, check the question is using the right-associative convention (it always is in GATE, matching mathematics) before converting.

CONVERTING INFIX TO POSTFIX

The algorithm needs one stack, used to hold operators temporarily, and builds the postfix result left to right as it scans the infix input token by token.

1. If the token is an operand, append it directly to the output.
2. If the token is (, push it — parentheses always go straight onto the stack.
3. If the token is ), pop and append operators to the output until a ( is popped; discard that ( without appending it.
4. If the token is an operator op, first pop and append to the output every operator currently on top of the stack whose precedence is greater than op's, or equal to op's provided op is left-associative — stopping if a ( is reached on top of the stack. Then push op.
5. When the input is exhausted, pop every remaining operator off the stack and append it to the output, in the order popped.

The rule in step 4 is the entire content of associativity: for a left-associative operator, an equal-precedence operator already on the stack must come out first (so it is applied before the new one, giving left-to-right grouping); for a right-associative operator like ^, an equal-precedence operator already on the stack is left where it is, so the new ^ ends up applied first when the stack unwinds, giving right-to-left grouping.

Trace the full algorithm on A + B * C ^ D ^ E − (F + G) * H, an expression chosen to exercise precedence, both associativities, and parentheses together.

1. A — operand, output: A
2. + — stack empty, push. Stack: +
3. B — output: A B
4. * — top of stack is + (lower precedence than *), nothing to pop; push *. Stack: +, *
5. C — output: A B C
6. ^ — top is * (lower precedence than ^), nothing to pop; push ^. Stack: +, *, ^
7. D — output: A B C D
8. ^ — top is ^, equal precedence — but ^ is right-associative, so an equal-precedence operator already stacked is NOT popped; push the new ^ anyway. Stack: +, *, ^, ^
9. E — output: A B C D E
10. − — compare against the stack from the top: pop ^ (higher precedence than −, append) → A B C D E ^ ; pop the other ^ (still higher, append) → A B C D E ^ ^ ; pop * (higher, append) → A B C D E ^ ^ * ; now the top is + (equal precedence to −, and − is left-associative, so pop it too, append) → A B C D E ^ ^ * + ; stack is now empty, so push −. Stack: −
11. ( — push. Stack: −, (
12. F — output: A B C D E ^ ^ * + F
13. + — top of stack is (, which blocks any popping; push +. Stack: −, (, +
14. G — output: A B C D E ^ ^ * + F G
15. ) — pop and append until ( is popped: pop + (append) → …F G + ; pop ( (discard, do not append). Stack: −
16. * — top is − (lower precedence than *), nothing to pop; push *. Stack: −, *
17. H — output: A B C D E ^ ^ * + F G + H
18. End of input — pop everything remaining: pop * (append) → …H * ; pop − (append) → …H * −.

Final postfix: A B C D E ^ ^ * + F G + H * −

Check the grouping this implies against the original expression, which by precedence and associativity means (A + (B * (C ^ (D ^ E)))) − ((F + G) * H): reading the postfix result confirms it matches exactly — the innermost D^E is computed first, then C raised to that, then multiplied by B, then added to A, while separately F+G is computed and multiplied by H, and the two halves are finally subtracted. The trace and the intended meaning agree.

GATE TRAP: When popping at step 10, students often stop after popping the two ^ symbols and the *, forgetting that + (equal precedence to the incoming −, and left-associative) must also come off the stack before − is pushed. Skipping that pop leaves + buried under a later −, changing the grouping. Always run the "equal precedence, left-associative → pop it too" check explicitly, one stack entry at a time, rather than eyeballing it.

EVALUATING A POSTFIX EXPRESSION

Once an expression is in postfix, evaluating it needs no precedence rules at all — every operator already sits exactly where it must be applied. One stack of operand values suffices.

1. Scan the postfix expression left to right.
2. On an operand, push its value.
3. On an operator, pop the top two values. Call the value popped first b (it was pushed most recently, so it is the right-hand operand) and the value popped second a (it is the left-hand operand). Compute a op b, and push the result.
4. When the scan ends, exactly one value remains on the stack — the answer.

Trace 5 3 2 * + 4 − :

1. 5 — push. Stack: 5
2. 3 — push. Stack: 5, 3
3. 2 — push. Stack: 5, 3, 2
4. * — pop 2 (b, right operand) and 3 (a, left operand). Compute 3 * 2 = 6. Push. Stack: 5, 6
5. + — pop 6 (b) and 5 (a). Compute 5 + 6 = 11. Push. Stack: 11
6. 4 — push. Stack: 11, 4
7. − — pop 4 (b, right operand) and 11 (a, left operand). Compute 11 − 4 = 7. Push. Stack: 7
8. End of input — one value remains: 7.

The equivalent infix is (5 + 3*2) − 4 = (5+6) − 4 = 7, confirming the trace. The order of the pops matters only for the non-commutative operators, − and /: had the trace popped 11 first and 4 second at step 7, it would have computed 4 − 11 = −7, the wrong answer and a distractor an exam will offer. The rule to hold onto is mechanical, not intuitive — first popped is always the right operand — precisely because "which one feels like it should go first" is not a reliable guide under time pressure.

GATE TRAP: For + and *, popping in the wrong order gives the same numeric answer, because those operators are commutative, and this hides the error on easy questions. The moment a − or / appears, popping in the wrong order silently produces a different, wrong number. Apply the "first popped is the right operand" rule unconditionally, every time, rather than only when you remember it matters.

HOW MANY STACK SLOTS DOES AN EVALUATION NEED

A separate question asks not for the final value but for the largest number of items the operand stack ever holds at once during an evaluation — the peak stack height. This matters because it tells you the minimum array size an array-based implementation would need to evaluate that expression without overflowing.

Trace 1 2 3 4 5 * + * + , tracking the stack's height (its size, not its contents) after each token:

1. 1 — push. Height 1.
2. 2 — push. Height 2.
3. 3 — push. Height 3.
4. 4 — push. Height 4.
5. 5 — push. Height 5. (All five operands appear before any operator — the height has nowhere to go but up so far.)
6. * — pop 5 and 4, push 20. Height 4.
7. + — pop 20 and 3, push 23. Height 3.
8. * — pop 23 and 2, push 46. Height 2.
9. + — pop 46 and 1, push 47. Height 1.

The height rose to 5 at step 5 and never exceeded that afterwards, so the peak is 5 — reached at the exact moment the run of operands is longest before any operator reduces it. The final value, 47, tells you nothing about the peak; a question asking for the maximum stack size requires walking the full trace, not just computing the answer.

REMEMBER: The peak operand-stack height during postfix evaluation equals the length of the longest run of consecutive operands the scan ever encounters before an operator arrives to start shrinking the stack back down. Find that run by eye first, then confirm it by tracing the heights.

CONVERTING INFIX TO PREFIX

Prefix conversion reuses the postfix machinery with a trick: reverse the input (swapping every ( for a ) and every ) for a ( as you do), run a slightly modified version of the infix-to-postfix algorithm on the reversed string, then reverse the result.

The modification: because the scan direction has been flipped, left-associativity and right-associativity must swap roles too. So in this reversed pass, pop an equal-precedence operator off the stack only when the operator being scanned is genuinely of strictly higher precedence than the one on top would demand as a left-associative case, in effect: pop the stack on strictly greater precedence, and do NOT pop on equal precedence, treating every operator as if it associated the opposite way for this pass only. (^, which is truly right-associative, needs no change in this reversed pass — it already behaves the way this rule wants.)

Convert a + b * c :

1. Reverse the token order: c * b + a. (No parentheses here, so nothing to swap.)
2. Run the modified postfix algorithm on c * b + a :
   • c — output: c
   • * — stack empty, push. Stack: *
   • b — output: c b
   • + — compare with stack top *: strictly higher precedence than +, so pop it, append → c b * ; stack now empty, push +. Stack: +
   • a — output: c b * a
   • End of input — pop remaining: pop + → c b * a +.
3. Reverse the result token order: + a * b c.

Final prefix: + a * b c — read it back: + applies to a and to the result of * b c, i.e. a + (b*c), matching the original.

Now a case with parentheses, (a + b) * (c − d), to see the paren-swap step earn its keep:

1. Reverse the tokens and swap parenthesis direction. Original: ( a + b ) * ( c − d ). Reversed token order: ) d − c ( * ) b + a (. Swap every ( for ) and vice versa: ( d − c ) * ( b + a ).
2. Run the modified postfix algorithm on ( d − c ) * ( b + a ) :
   • ( — push. Stack: (
   • d — output: d
   • − — top is (, which blocks popping regardless; push. Stack: (, −
   • c — output: d c
   • ) — pop until ( is popped: pop − (append) → d c − ; discard (. Stack: empty
   • * — stack empty, push. Stack: *
   • ( — push. Stack: *, (
   • b — output: d c − b
   • + — top is (, push. Stack: *, (, +
   • a — output: d c − b a
   • ) — pop until ( is popped: pop + (append) → d c − b a + ; discard (. Stack: *
   • End of input — pop remaining: pop * → d c − b a + *.
3. Reverse the result: * + a b − c d.

Final prefix: * + a b − c d — read it back: * applies to (+ a b) and (− c d), i.e. (a+b) * (c−d), matching the original.

KEY: Prefix conversion is postfix conversion run backwards, with parenthesis direction swapped and the associativity check flipped — it is not a separate algorithm to memorise from scratch, and remembering it as "reverse, modified-postfix, reverse" avoids inventing a shakier rule under exam pressure.

EVALUATING A PREFIX EXPRESSION

Prefix is evaluated the mirror image of postfix: scan right to left instead of left to right, and swap which popped value is the left operand.

1. Scan the prefix expression right to left.
2. On an operand, push its value.
3. On an operator, pop the top two values. The value popped first is now the LEFT operand (call it a); the value popped second is the RIGHT operand (call it b). Compute a op b, and push the result.
4. When the scan ends, one value remains — the answer.

Trace * + 2 3 − 6 4 , which should equal (2+3) * (6−4) = 5 * 2 = 10 :

1. Scan right to left: 4, 6, −, 3, 2, +, *.
2. 4 — push. Stack: 4
3. 6 — push. Stack: 4, 6
4. − — pop 6 first (a, left operand), pop 4 second (b, right operand). Compute 6 − 4 = 2. Push. Stack: 2
5. 3 — push. Stack: 2, 3
6. 2 — push. Stack: 2, 3, 2
7. + — pop 2 first (a), pop 3 second (b). Compute 2 + 3 = 5. Push. Stack: 2, 5
8. * — pop 5 first (a), pop 2 second (b). Compute 5 * 2 = 10. Push. Stack: 10
9. End of input — one value remains: 10, matching the check above.

GATE TRAP: The "first popped is the left operand" rule for prefix is the exact reverse of postfix's "first popped is the right operand" rule. The two are frequently swapped by students who memorised one without noticing evaluation direction changed too — postfix scans left to right and pops right-operand-first; prefix scans right to left and pops left-operand-first. Say the scan direction out loud before applying either rule.

MORE USES OF A STACK: UNDO, BACKTRACKING, AND A PREVIEW OF EXPRESSION TREES

Beyond parsing and evaluating expressions, a stack is the natural structure whenever "undo the most recent thing" is the operation you need.

An editor's undo feature keeps a stack of past actions. Every edit pushes a description of itself (what changed, and how to reverse it) onto the stack. Pressing undo pops the most recent action and reverses exactly that one change — never an older one, until every action after it has also been undone. This is LIFO by necessity: you cannot sensibly undo an edit from an hour ago while leaving everything typed since it in place.

Backtracking algorithms — searching a maze, placing queens on a chessboard so none attacks another, exploring a decision tree — use a stack (often the implicit call stack of a recursive function, sometimes an explicit one) to remember the path taken so far. When a choice leads to a dead end, the algorithm pops back to the most recent decision point and tries a different option there. The stack is what makes "go back to where I last had a choice" possible without recomputing the whole path from the start.

Expression trees, met briefly above as the structure both postfix and prefix are really describing, are built from a postfix scan using a stack of tree nodes rather than values: push a leaf node for every operand; on an operator, pop two subtrees, make them the left and right children of a new node labelled with that operator, and push the new node. When the scan ends, the single node left on the stack is the root of the whole tree. This construction, and the traversals that recover infix, prefix and postfix from a built tree, belong properly to the trees chapter — the point to take now is that the stack-based evaluation algorithm already learned above generalises directly, with "compute a value" replaced by "build a subtree."

WHICH OUTPUT ORDERS ARE POSSIBLE: STACK PERMUTATIONS

Here is a question with a genuinely surprising answer. Suppose the values 1, 2, …, n are pushed onto an empty stack strictly in that order, but pops may be interleaved with the pushes however you like. Not every rearrangement of 1..n can come out — a stack's discipline rules some orders out entirely, and this section works out exactly which.

The key structural fact is this: because the values are pushed in strictly increasing order, at any moment the elements currently sitting on the stack, read from bottom to top, are in increasing order. This must be true because each new push is a larger value than every value pushed before it, and popping never disturbs the relative order of what remains beneath the popped element.

One consequence follows immediately: any run of consecutive pops — pops with no push in between — must come out in decreasing order, because each pop removes the current top, which is the largest value currently on the stack.

KEY: A stack fed 1, 2, …, n in that fixed push order always holds an increasing sequence bottom-to-top at every instant. So any unbroken run of pops must emerge in decreasing order. This single fact decides every "is this output sequence achievable" question in this section — check it directly rather than guessing.

Now test whether 3, 1, 2 can be an output sequence for n = 3. To output 3 first, 3 must be on top, which means 1 and 2 were pushed and never popped beforehand — the stack (bottom to top) holds 1, 2 at that point. After 3 is popped, nothing remains to push (all of 1, 2, 3 are already used), so the required next two outputs, 1 then 2, must come from an unbroken run of pops on a stack holding 1, 2 (bottom to top). By the fact above, that run must emerge in decreasing order — 2 then 1 — never 1 then 2. So 3, 1, 2 is impossible: the required tail "1 then 2" can never follow the required head "3".

Check the other five permutations of {1,2,3} the same way. 1, 2, 3: push 1, pop (1), push 2, pop (2), push 3, pop (3) — achievable. 1, 3, 2: push 1, pop (1), push 2, push 3, pop (3), pop (2) — achievable. 2, 1, 3: push 1, push 2, pop (2), pop (1), push 3, pop (3) — achievable. 2, 3, 1: push 1, push 2, pop (2), push 3, pop (3), pop (1) — achievable. 3, 2, 1: push all three, then pop three times — achievable (this is always achievable for any n, since popping straight through reverses the whole push order).

So five of the six permutations of {1,2,3} are achievable, and 3, 1, 2 alone is not. Notice the shape of the impossible one: a value comes out, and afterwards a smaller value comes out before an even smaller one still buried beneath it — a "high, then low, then middle" pattern among some three positions in the output. This is often called avoiding the pattern 312: an output sequence is achievable exactly when no three of its positions, read in output order, show a large value, then a smaller value, then a value that is smaller than the first but larger than the second. Any occurrence of that shape forces exactly the contradiction worked out above.

HOW MANY DISTINCT ACHIEVABLE SEQUENCES ARE THERE

Counting how many output sequences are achievable for n pushed items, rather than checking one sequence at a time, is a standard result: the count is the n-th Catalan number.

C_n = (2n)! / ((n+1)! · n!)

For n = 3: C_3 = 6! / (4! · 3!) = 720 / (24 · 6) = 720 / 144 = 5 — matching the direct enumeration above exactly (five achievable sequences out of the 3! = 6 total permutations, with 3,1,2 the sole exception).

The small Catalan numbers, worth having on hand rather than recomputing every time, are C_1 = 1, C_2 = 2, C_3 = 5, C_4 = 14, C_5 = 42. For n = 4, pushing 1,2,3,4 in order, 14 of the 4! = 24 permutations are achievable and the other 10 (such as 3,1,2,4, which contains the same "high, low, middle" shape found above) are not.

GATE TRAP: The number of achievable output sequences is the Catalan number, not n! (all permutations) and not 2^n (a count that appears in other stack-related counting problems, such as the number of distinct sequences of n pushes and n pops considered as strings of P/O symbols before checking which correspond to valid, non-underflowing execution — that count is actually the same Catalan number too, C_n, for a different reason: it is exactly the count of balanced-parenthesis-shaped P/O strings). Confusing "every permutation is reachable" with "every push/pop interleaving is valid" are two different, both wrong, shortcuts around actually applying the invariant.

HOW BIG MUST THE STACK BE FOR A GIVEN SEQUENCE

A related but distinct question gives you an actual sequence of push and pop operations — not a permutation to check, but the operations themselves, already interleaved in a stated order — and asks for the minimum array capacity needed to run it without overflow. This is answered exactly the way the postfix "peak stack height" question was answered earlier: track the running height, treating each push as +1 and each pop as −1, and take the maximum value the height ever reaches.

Trace the sequence PUSH, PUSH, POP, PUSH, PUSH, PUSH, POP, POP, PUSH, POP, POP, starting from height 0:

1. PUSH: height 1.
2. PUSH: height 2.
3. POP: height 1.
4. PUSH: height 2.
5. PUSH: height 3.
6. PUSH: height 4.
7. POP: height 3.
8. POP: height 2.
9. PUSH: height 3.
10. POP: height 2.
11. POP: height 1.

The height reaches 4 at step 6 and never exceeds that afterwards, so the minimum array capacity that can execute this exact sequence without overflow is 4. A capacity of 3 would overflow at step 6; any capacity of 4 or more succeeds.

REMEMBER: Minimum required stack size for a stated sequence of pushes and pops is always the peak of the running height, found by walking the sequence once and tracking +1 per push, −1 per pop. It is never the total number of pushes in the sequence, unless every push happens to occur before any pop at all.

THE QUEUE: FIRST IN, FIRST OUT

A queue is the other basic restricted-access structure, and it is built on the opposite discipline from a stack: the element removed is always the one that has been waiting longest, not the one that arrived most recently. This is FIFO — first in, first out — the discipline of any queue of people: whoever joined first is served first, and newcomers join at the back.

A queue exposes two ends rather than one: the front, where removal happens, and the rear, where insertion happens.

• enqueue(x) — insert x at the rear.
• dequeue() — remove and return the element at the front. Error (underflow) if the queue is empty.
• front() (or peek()) — return the front element without removing it.
• isEmpty() — true iff no elements remain.

Enqueue 1, 2, 3 onto an empty queue, in that order. The queue, front to rear, is now 1, 2, 3 — 1 arrived first and sits at the front. A dequeue returns 1, the earliest arrival, leaving 2, 3 with 2 now at the front. A second dequeue returns 2. The order out — 1, 2, 3 — is identical to the order in, unlike a stack, which would have reversed it.

KEY: A queue preserves arrival order among the elements it releases; a stack reverses it. Whenever a problem needs "process things in exactly the order they showed up" — scheduling, buffering, breadth-first exploration — that is a queue signature; "undo the most recent first" is a stack signature.

THE QUEUE AS AN ARRAY, AND WHY IT DRIFTS

The obvious array implementation keeps two indices, front and rear, both starting so as to represent an empty queue (say front = 0, rear = −1, meaning no elements yet). enqueue(x) does rear = rear + 1, then array[rear] = x. dequeue() reads array[front], then does front = front + 1.

This works, but it has a serious flaw: front only ever increases, never decreases, and the array slots below the current front are never reused, even though the values there have already been removed and are logically free. Take an array of size 5: enqueue five elements fills indices 0 through 4, with rear now at 4, the last valid index. Dequeue three of them — front moves to 3 — and the queue now logically holds only two elements, at indices 3 and 4. But rear is already at 4, the end of the array, so the next enqueue has nowhere to go, even though indices 0, 1, and 2 are sitting empty and unused. The queue reports itself full while three-fifths of its array is wasted. This is the drift problem: front drifts rightward forever and never comes back, permanently shrinking the usable window even as elements are removed.

THE CIRCULAR QUEUE

The fix is to stop treating the array as a straight line and instead treat it as a circle: when an index would run off the end, wrap it back to 0. For an array of size N, both indices advance with the modulo operation.

rear = (rear + 1) % N
front = (front + 1) % N

Now a slot that was dequeued from becomes available for reuse the moment the indices wrap back around to it, and the drift problem is gone — the array is used as a genuine ring, not a strip that only ever moves forward.

[[FIG:circular-queue]]

But wrapping introduces a new problem that the straight-line version never had: front and rear can become equal in two completely different situations, and nothing about the value of front == rear on its own says which one you are in. If the queue is empty (nothing ever inserted, or everything dequeued back out), front == rear. But if the queue is completely full — N elements stored, and rear has wrapped all the way around to land back on front — that also gives front == rear. The same index equality means opposite things, and an implementation that only tracks front and rear cannot tell full from empty by that test alone.

Three standard resolutions exist, each adding exactly one extra piece of information to break the tie.

• Waste one slot. Never let the array actually hold all N elements — enforce it as a rule. Declare the queue full when (rear + 1) % N == front, i.e. the very next enqueue would make rear catch up to front. Declare it empty when front == rear. Because one slot is always kept unfilled to keep the two conditions distinct, the maximum number of elements ever stored is N − 1, not N.

Capacity under the waste-one-slot convention = N − 1

• Keep a count. Maintain an explicit integer, incremented on every enqueue and decremented on every dequeue. The queue is empty iff count == 0, and full iff count == N — using every slot, at the cost of maintaining one more variable that both operations must update.

• Keep a boolean flag. Maintain isFull, set to true whenever an enqueue causes rear to advance onto front (i.e., the array has just become genuinely full), and set to false by any dequeue (since a dequeue always frees at least one slot). Now front == rear together with isFull true means full, and front == rear together with isFull false means empty — again using all N slots, at the cost of one boolean rather than a whole counter.

KEY: front == rear is ambiguous by itself; it means "empty" under one condition and "full" under another, and a circular queue implementation must resolve that ambiguity with one of three extra devices — sacrifice a slot (capacity N − 1, no extra variable), keep a count (capacity N, one extra integer), or keep a flag (capacity N, one extra boolean). A question that gives you only front and rear, with no count or flag mentioned, is using the waste-one-slot convention by default.

Trace the waste-one-slot convention on an array of size N = 5 (indices 0–4), starting empty with front = rear = 0, to see the wraparound in action.

1. enqueue(10): array[rear=0] = 10; rear = (0+1)%5 = 1. front=0, rear=1. Stored: 10.
2. enqueue(20): array[1] = 20; rear = 2. Stored: 10, 20.
3. enqueue(30): array[2] = 30; rear = 3. Stored: 10, 20, 30.
4. enqueue(40): array[3] = 40; rear = 4. Stored: 10, 20, 30, 40. Check full: (rear+1)%5 = 0 == front (0) — yes, full. A fifth enqueue would be rejected right now, confirming the N − 1 = 4 capacity.
5. dequeue(): returns array[front=0] = 10; front = (0+1)%5 = 1. Stored (indices 1,2,3): 20, 30, 40. No longer full.
6. dequeue(): returns array[1] = 20; front = 2. Stored (indices 2,3): 30, 40.
7. enqueue(50): array[rear=4] = 50; rear = (4+1)%5 = 0 — rear WRAPS from 4 back to 0. Stored (indices 2,3,4): 30, 40, 50.
8. enqueue(60): array[rear=0] = 60, overwriting the stale 10 left over from before it was dequeued (safe, since it was already removed); rear = (0+1)%5 = 1. Stored (indices 2,3,4,0): 30, 40, 50, 60. Check full: (rear+1)%5 = 2 == front (2) — yes, full again, exactly 4 elements.

Final state after step 8: front = 2, rear = 1, count = 4. rear has visited 1, 2, 3, 4, 0, 1 — the wraparound at step 7 is the moment rear passes the physical end of the array and reappears at index 0, and the queue's logical contents (30, 40, 50, 60) are genuinely split across the "end" and the "start" of the underlying array.

THE QUEUE AS A LINKED LIST

A linked queue avoids the fixed-capacity question the same way a linked stack does, using a node per element with a value and a next pointer — but a queue needs two external pointers, not one: front, pointing at the node to dequeue next, and rear, pointing at the last node, where the next enqueue must attach.

Why both? enqueue must attach a new node after the current last node, and finding "the last node" without a rear pointer means walking the entire list from front every time — O(n) per enqueue. Keeping rear as a standing pointer makes enqueue O(1): attach the new node after the node rear currently points to, then move rear to the new node. dequeue only ever needs front — read its value, advance front to front→next, free the old front node — and stays O(1) regardless.

One case needs explicit handling: dequeuing the last remaining element leaves the list empty, and rear is now a dangling pointer to a freed node unless the code explicitly sets rear to null (alongside front becoming null) at that moment. Symmetrically, enqueuing into an empty queue must set both front and rear to point at the new single node, not just rear — front does not yet point anywhere valid, and skipping this step leaves the very next dequeue reading from an uninitialised front. Both operations must check "is the queue currently empty?" as a special case for exactly this reason.

GATE TRAP: A linked queue that maintains only a front pointer, deriving "rear" by walking to the end whenever it is needed, has an O(1) dequeue but an O(n) enqueue — the opposite of what "a linked list gives O(1) queue operations" usually assumes. The O(1) guarantee for both ends specifically requires both front and rear to be maintained as standing pointers, updated on every operation, not derived by search.

THE DEQUE: BOTH ENDS OPEN

A deque (double-ended queue, pronounced "deck") generalises the queue by allowing insertion and deletion at both ends: insertFront, insertRear, deleteFront, and deleteRear, each in O(1) with a suitable implementation (a doubly linked list with head and tail pointers, or a circular array with both ends tracked). A plain queue is a deque restricted to insert-rear and delete-front only; a plain stack is a deque restricted to one end only.

Trace insertRear(1); insertRear(2); insertFront(3); deleteRear(); insertFront(4), starting from an empty deque, listing contents front to rear at each step:

1. insertRear(1): [1]
2. insertRear(2): [1, 2]
3. insertFront(3): 3 joins at the front. [3, 1, 2]
4. deleteRear(): removes the rear element, 2. [3, 1]
5. insertFront(4): 4 joins at the front. [4, 3, 1]

Final deque, front to rear: 4, 3, 1.

GATE TRAP: The most common tracing error with a deque is applying an operation to the wrong end — treating insertFront as if it were insertRear, or vice versa — because a deque question deliberately mixes both ends in one sequence to test exactly this. Read each operation's name literally and update only the named end.

THE PRIORITY QUEUE

A priority queue is an ADT, not an implementation: it supports insert (add an element with an associated priority) and extractMax (or extractMin) — remove and return the element with the highest (or lowest) priority currently present, regardless of when it was inserted. Insertion order plays no role at all; only priority does. This makes a priority queue neither a stack nor a queue in behaviour, despite the name — "queue" here refers only to the insert/remove interface shape, not to FIFO order.

A priority queue can be built several ways, with very different costs. An unsorted array gives O(1) insert (just append) but O(n) extractMax (scan for the largest). A sorted array gives O(n) insert (shift to keep order) but O(1) extractMax (it is always at one end). The structure that gets both operations down to O(log n) is the binary heap, which is substantial enough to earn its own chapter later in this course — for now, the point to take is only that "priority queue" names the operations, and the heap is the efficient way to provide them, not the only way.

BUILDING ONE STRUCTURE OUT OF ANOTHER: THE CLASSIC PUZZLES

A recurring GATE question style asks you to build a queue using only stacks, or a stack using only queues, as operations on the underlying structure. These puzzles are worth working through in full, because the same "make one operation costly so the other stays cheap" idea appears in both directions, and because the exact operation counts are what gets asked numerically.

QUEUE USING TWO STACKS

Let S1 and S2 be two stacks, both empty initially. Two designs exist, and they trade which operation is cheap.

Costly-dequeue design: enqueue always pushes directly onto S1 — O(1), every single time, no exceptions. dequeue checks S2 first: if S2 is non-empty, just pop it directly — O(1). If S2 is empty, first transfer every element from S1 onto S2 (pop from S1, push onto S2, repeating until S1 is empty), which reverses their order so the oldest element (pushed first, so buried deepest in S1) ends up on top of S2; only then pop S2's top and return it.

Trace enqueue(1), enqueue(2), dequeue(), enqueue(3), dequeue(), enqueue(4), enqueue(5), dequeue() :

1. enqueue(1): S1 = [1]. S2 = [].
2. enqueue(2): S1 = [1, 2]. S2 = [].
3. dequeue(): S2 is empty, so transfer: pop 2 from S1, push onto S2 (S2 = [2]); pop 1 from S1, push onto S2 (S2 = [2, 1], with 1 now on top). S1 = []. Pop S2's top: returns 1. S2 = [2].
4. enqueue(3): S1 = [3].
5. dequeue(): S2 = [2] is non-empty — pop directly, no transfer. Returns 2. S2 = [].
6. enqueue(4): S1 = [3, 4].
7. enqueue(5): S1 = [3, 4, 5].
8. dequeue(): S2 is empty, transfer S1 (pop 5→push S2, pop 4→push S2, pop 3→push S2; S2 = [5,4,3] bottom to top, i.e. 3 on top). S1 = []. Pop S2's top: returns 3.

Dequeue results, in order: 1, 2, 3 — the same order the elements were enqueued, confirming correct FIFO behaviour despite two LIFO stacks underneath: the transfer reverses the arrival order once, and popping S2 (itself LIFO) reverses it back a second time, restoring the original order.

Cost: any single dequeue that triggers a transfer of k elements does 2k pop/push operations for the transfer plus 1 final pop, so 2k + 1 operations for that call. That can be as large as O(n) for one unlucky call. But over any sequence of n enqueue and dequeue operations, each element is pushed onto S1 exactly once (at enqueue), moved from S1 to S2 at most once (popped from S1, pushed onto S2), and popped from S2 exactly once — at most three stack operations across its entire lifetime. Summing that over n elements gives O(n) total work for the whole sequence, so the amortised cost per operation is O(1), even though individual dequeue calls can spike to O(n).

Costly-enqueue design: the mirror image. Keep S1 always arranged with the front of the queue on top, so dequeue is always O(1) — just pop S1. To enqueue x: pop everything from S1 into S2 (reversing it), push x onto S2 (it is now at the very bottom of S2, meaning it will end up at the back once restored), then pop everything from S2 back onto S1 (reversing again, restoring the original relative order with x now correctly at the bottom of S1, i.e. the back of the queue). If S1 held k elements before the enqueue, this costs 2k pops-and-pushes to move them out and 2k more to move them back, plus the one push of x — 4k + 1 operations, O(n), on every single enqueue, with no cheap case at all.

KEY: Between a queue's two operations, exactly one can be made O(1) worst-case with a two-stack implementation, and the other absorbs the cost — cheaply on average (amortised O(1)) if you make dequeue the costly one and transfer lazily, or expensively on every call if you make enqueue the costly one and re-sort on every insertion. The lazy-transfer (costly-dequeue) design is the one worth defaulting to, precisely because its worst case is rare and its amortised behaviour is as good as a "real" queue's.

STACK USING TWO QUEUES

The same idea runs in reverse: build a stack — LIFO — out of two queues, Q1 and Q2, both FIFO. Again two designs, trading which stack operation is cheap.

Costly-push design: to push x, first enqueue x into (empty) Q2. Then move every element currently in Q1 into Q2 (dequeue from Q1, enqueue into Q2), one at a time. Because x was enqueued into Q2 first, it now sits at the front of Q2 once the transfer finishes, ahead of everything that was already in the stack. Finally, treat Q2 as the new Q1 (swap the two references). Now the most recently pushed element is always at the front of the "main" queue, so pop is simply dequeue — O(1).

If the stack held k elements before this push, the transfer moves all k of them (a dequeue and an enqueue for each, 2k operations) plus the 1 enqueue of x itself: 2k + 1 operations for that push, O(n).

Costly-pop design: the mirror image. push is always just enqueue x into Q1 — O(1), unconditionally. To pop, the most-recently-pushed element is the one at the back of Q1 (since pushes have only ever enqueued, arrival order in Q1 is exactly push order, oldest at the front). Dequeue every element from Q1 except the very last one, enqueuing each into Q2 as it comes off (this is k − 1 elements, if Q1 holds k, costing 2(k−1) operations); then dequeue the one element left in Q1 — that is the top of the stack — and return it (1 more operation); finally swap Q1 and Q2 so future pushes go to the now-repopulated queue. Total operations for this pop: 2(k−1) + 1 = 2k − 1, O(n).

GATE TRAP: "Stack from two queues" and "queue from two stacks" are mirror puzzles, but the direction of the costly operation does not automatically transfer between them — check which operation (push/pop or enqueue/dequeue) the question makes expensive in the specific variant it describes, rather than assuming it matches a puzzle you have seen before with the labels swapped.

STACK USING ONE QUEUE (ROTATION)

A stack can also be built from a single queue, using rotation instead of a second container. push(x): enqueue x (it lands at the back); then rotate the queue by dequeuing and immediately re-enqueuing the front element, repeated (current size − 1) times. This walks every element that was already in the queue around to the back, one at a time, until x — now the only element that has not been rotated — ends up at the front.

Trace push(1), push(2), push(3) on an initially empty queue:

1. push(1): enqueue 1. Queue: [1]. Size was 0 before, so 0 rotations. Front: 1.
2. push(2): enqueue 2. Queue: [1, 2]. Size was 1 before, so 1 rotation: dequeue 1, enqueue 1. Queue: [2, 1]. Front: 2 — the most recently pushed.
3. push(3): enqueue 3. Queue: [2, 1, 3]. Size was 2 before, so 2 rotations: dequeue 2, enqueue 2 → [1, 3, 2]; dequeue 1, enqueue 1 → [3, 2, 1]. Front: 3 — again the most recently pushed.

pop() is then simply dequeue — O(1), always returning the front, which the rotation scheme keeps equal to the most recently pushed element. push costs O(n) (the rotation touches every existing element once, two queue operations each), the opposite trade-off from the costly-pop two-queue design above, achieved with half the storage.

REVERSING A QUEUE WITH A STACK

To reverse a queue's contents using one auxiliary stack: dequeue every element and push it onto the stack (this uses the stack's LIFO nature to flip the order once), then pop every element off the stack and enqueue it back into the (now empty) queue (restoring it to queue form, but in the reversed order the stack delivered).

1. While the queue is non-empty: dequeue an element, push it onto the stack. (n dequeues, n pushes.)
2. While the stack is non-empty: pop an element, enqueue it into the queue. (n pops, n enqueues.)

Total work: 4n primitive operations for a queue of n elements — O(n) time, using O(n) extra space for the stack. The single pass through a LIFO structure is what accomplishes the reversal; a second queue could not do this on its own, because moving elements queue-to-queue preserves order rather than flipping it.

REVERSING A STACK WITH RECURSION

Reversing a stack using another explicit stack is easy — pop everything off the original into a second stack, and the second stack now holds the elements in reverse order, in one O(n) pass, the same idea as the queue reversal above. The harder, and more commonly asked, version forbids any extra stack, queue, or array: reverse a stack using only recursion, so that the only extra storage is the call stack itself, one local variable per pending call.

Two mutually recursive procedures do this. reverseStack(S) empties S recursively, remembering each popped value in its own stack frame, and once S is completely empty, re-inserts those values one at a time — but at the bottom of S, not the top, using a helper.

reverseStack(S): if S is empty, return. Otherwise pop the top element into a local variable x, recursively call reverseStack(S) on what remains, and only then call insertAtBottom(S, x).

insertAtBottom(S, x): if S is empty, just push x (there is nothing below to get past) and return. Otherwise pop the top element into a local variable y, recursively call insertAtBottom(S, x) on what remains, and only then push y back.

Trace reverseStack on a 3-element stack, bottom to top, 1, 2, 3 (3 on top):

1. reverseStack is called with S = [1,2,3]. Pop 3 into x. Recurse on S = [1,2].
2. reverseStack is called with S = [1,2]. Pop 2 into x. Recurse on S = [1].
3. reverseStack is called with S = [1]. Pop 1 into x. Recurse on S = [] (empty).
4. reverseStack is called with S = [] — base case, returns immediately.
5. Back in step 3's call (x = 1, S = []): call insertAtBottom(S, 1) on the empty stack. Base case of insertAtBottom: S is empty, so just push 1. S = [1].
6. Back in step 2's call (x = 2, S = [1]): call insertAtBottom(S, 2). S is not empty: pop 1 into y, recurse insertAtBottom on S = [] with x still 2 — that pushes 2 (base case), giving S = [2] — then push y (=1) back on top. S = [2, 1].
7. Back in step 1's call (x = 3, S = [2,1]): call insertAtBottom(S, 3). Pop 1 into y, recurse insertAtBottom(S=[2], x=3): pop 2 into y', recurse insertAtBottom(S=[], x=3): base case pushes 3, S=[3]; then push y' (=2) back, S=[3,2]. Back one level: push y (=1) back, S=[3,2,1].

Final stack, bottom to top: 3, 2, 1 — the original 1, 2, 3 (bottom to top) reversed, using no structure but the recursion's own call stack. This costs noticeably more than the two-stack method: insertAtBottom, called once per element popped by reverseStack, itself does work proportional to how deep the stack currently is, giving O(n²) total operations rather than the O(n) of the explicit-second-stack method. The recursive version is a space-constrained puzzle — it trades time for using no visible auxiliary structure at all — not a faster way to reverse a stack in general.

WHAT QUEUES ARE USED FOR

A queue's FIFO guarantee is exactly the right model for several recurring problems, worth naming so their queue-shape is recognisable on sight.

Breadth-first search on a graph, met properly in the graphs chapter, explores a vertex, then enqueues all of its unvisited neighbours, then dequeues the next vertex to explore — the FIFO order is precisely what makes BFS visit vertices in order of increasing distance from the start, level by level, rather than plunging deep down one path first as a stack-based (depth-first) search would.

Operating-system scheduling, met in an earlier chapter, keeps processes that are ready to run in a ready queue; a round-robin scheduler is, at its core, dequeue a process, let it run for a time slice, enqueue it again at the back if it is not finished. Buffering — a keyboard's input buffer, a print spooler, a network socket's incoming data — is a queue for the same reason: data must come out in the order it went in, and the producer and the consumer generally run at different speeds, so a queue (very often the circular-array queue built above) absorbs the difference. The producer–consumer bounded buffer from the processes chapter is exactly a circular queue with the full/empty ambiguity resolved by the waste-one-slot convention.

Sliding-window problems — find the maximum element in every contiguous window of size k as the window slides across an array — are solved efficiently with a deque used as a monotonic structure. Keep the deque holding indices of the current window's elements, maintained in decreasing order of value from front to rear: before inserting a new index at the rear, remove (from the rear) every index whose value is smaller than the new element's, since a smaller, older element can never be the window's maximum again once a larger one has joined it. The front of the deque is always the current window's maximum; when the window slides past the index at the front, remove it from the front. Each index is inserted once and removed at most once, so the whole scan is O(n) despite recomputing a maximum for every window position.

THE COMPLEXITY TABLE, ALL IN ONE PLACE

Every implementation above is gathered here for reference, having been derived rather than asserted.

• Stack, array-based: push O(1), pop O(1), peek O(1), isEmpty O(1). Search for an arbitrary element: O(n).
• Stack, linked-list-based (push/pop at head): push O(1), pop O(1), peek O(1), isEmpty O(1).
• Queue, naive array (front/rear only increase): enqueue O(1), dequeue O(1) but wastes array slots permanently (the drift problem) — capacity effectively shrinks over the array's lifetime.
• Queue, circular array: enqueue O(1), dequeue O(1), front O(1), isEmpty O(1). Capacity is N (count or flag convention) or N − 1 (waste-one-slot convention).
• Queue, linked list with front and rear pointers: enqueue O(1), dequeue O(1).
• Deque, doubly linked list or circular array with both ends tracked: insertFront, insertRear, deleteFront, deleteRear all O(1).
• Priority queue, unsorted array: insert O(1), extractMax O(n). Sorted array: insert O(n), extractMax O(1). Binary heap (next chapter): both O(log n).
• Queue from two stacks, costly-dequeue design: enqueue O(1) worst case; dequeue O(1) amortised, up to O(n) on any single call that triggers a transfer.
• Queue from two stacks, costly-enqueue design: enqueue O(n) every call; dequeue O(1) worst case.
• Stack from two queues, costly-push design: push O(n) every call; pop O(1) worst case.
• Stack from two queues, costly-pop design: push O(1) worst case; pop O(n) every call.
• Stack from one queue, rotation design: push O(n) every call (rotation); pop O(1) worst case.
• Reversing a queue with a stack: O(n) time, O(n) extra space.
• Reversing a stack with recursion only: O(n²) time, O(n) extra space (implicit, the call stack), no explicit auxiliary structure.

REMEMBER: Whenever a structure's operation is described as "O(1) worst case," check what is being pushed under the rug — a two-stack queue's cheap dequeue is only O(1) amortised, not worst-case, and the difference (a single call spiking to O(n)) is exactly what a well-made question will ask you to notice.

WORKED PROBLEMS

Each of these is a pattern that appears in the paper. Follow the working, not just the answer.

1. Convert A + B * C − D / E to postfix.
   Precedence groups this as ((A + (B*C)) − (D/E)). Scan: A → output A. + → stack empty, push. B → output A B. * → higher precedence than stacked +, push. C → output A B C. − → pop * (higher, append) → A B C * ; pop + (equal precedence, left-associative, append) → A B C * + ; stack empty, push −. D → output A B C * + D. / → higher precedence than stacked −, push. E → output A B C * + D E. End: pop / → …E / ; pop − → …E / −. Final postfix: A B C * + D E / −.

2. Evaluate the postfix expression 6 3 2 4 + − * .
   Push 6, 3, 2, 4 (stack: 6,3,2,4). Token +: pop 4 (right) and 2 (left), compute 2+4=6, push (stack: 6,3,6). Token −: pop 6 (right) and 3 (left), compute 3−6=−3, push (stack: 6,−3). Token *: pop −3 (right) and 6 (left), compute 6×(−3)=−18, push (stack: −18). Result: −18.

3. Items 1, 2, 3, 4, 5 are pushed onto a stack strictly in that order, pops interleaved arbitrarily. Is 4, 3, 5, 1, 2 an achievable pop sequence?
   Simulate: to output 4 first, push 1,2,3,4 and pop 4 (stack now 1,2,3, top 3). Next required output is 3 — pop it directly (stack now 1,2). Next required output is 5 — 5 has not been pushed yet, so push 5, then pop it (stack unaffected: 1,2). Next required output is 1 — but the stack top is 2, not 1, and nothing remains to push (all of 1..5 are used), so the run of remaining pops must come out in decreasing order (2, then 1), never 1 before 2. The sequence demands 1 before 2, which is impossible. Not achievable.

4. A circular queue, array size 5 (indices 0–4), rear = (rear+1)%5 on enqueue then store, front = (front+1)%5 on dequeue then read, both starting at −1 (sentinel for empty). Perform enqueue(1), enqueue(2), enqueue(3), enqueue(4), dequeue(), dequeue(), enqueue(5), enqueue(6), enqueue(7). Give the final array and what front points to.
   enqueue(1): rear=(−1+1)%5=0, arr[0]=1; front set to 0 (first element). enqueue(2): rear=1, arr[1]=2. enqueue(3): rear=2, arr[2]=3. enqueue(4): rear=3, arr[3]=4. Array so far: [1,2,3,4,_]. dequeue(): returns 1, front=1. dequeue(): returns 2, front=2. Logical contents now {3,4} at indices 2,3. enqueue(5): rear=(3+1)%5=4, arr[4]=5 → [1,2,3,4,5]. enqueue(6): rear=(4+1)%5=0, arr[0]=6 (overwrites stale 1) → [6,2,3,4,5]. enqueue(7): rear=(0+1)%5=1, arr[1]=7 (overwrites stale 2) → [6,7,3,4,5]. Final array: [6,7,3,4,5]; front = 2, pointing at value 3.

5. A queue is built from two stacks S1 (enqueue target) and S2 (dequeue source, refilled from S1 when empty). S1 currently holds 5 elements, S2 is empty. Count every individual push and pop performed by one dequeue() call.
   S2 is empty, so the transfer runs first: pop all 5 from S1 (5 pops) and push each onto S2 (5 pushes) — 10 operations. Then pop S2's new top to return it — 1 more operation. Total: 10 + 1 = 11 stack operations.

6. How many distinct pop sequences are achievable by pushing 1, 2, 3, 4 in that order onto an empty stack, with pops interleaved arbitrarily?
   The count is the 4th Catalan number: C_4 = 8! / (5! · 4!) = 40320 / (120 × 24) = 40320 / 2880 = 14. Fourteen of the 4! = 24 total permutations of {1,2,3,4} are achievable; the other 10, such as 3,1,2,4 (which contains the "high, low, middle" 312 shape in its first three positions), are not.

7. A sequence of stack operations is PUSH, PUSH, PUSH, POP, PUSH, POP, POP, POP, PUSH, PUSH. What is the minimum array capacity needed to run this sequence without overflow?
   Track height from 0: PUSH→1, PUSH→2, PUSH→3, POP→2, PUSH→3, POP→2, POP→1, POP→0, PUSH→1, PUSH→2. The peak height reached is 3 (twice, at the 3rd and 5th operations). Minimum capacity: 3.

8. A binary max-heap holding n elements has extractMax called k times in succession (k ≤ n). What is the total time complexity?
   Each extractMax removes the root, moves the last element into its place, and sifts it down, costing O(log h) where h is the heap's size at that moment. Since the heap only shrinks over the k extractions, every one of them costs at most O(log n) (using the size just before that extraction, which never exceeds n, as a valid upper bound for each). Summing k such extractions gives O(k log n) total.

WHAT THE NEXT CHAPTER BUILDS ON

Linked lists, met throughout this chapter as one implementation choice among several, are worth their own close look at how insertion, deletion and traversal work when there is no array underneath at all — that is the very next chapter. Trees will reuse the expression-tree idea sketched here in full, including how a stack drives traversal without recursion. Graphs will use a queue for breadth-first search exactly as previewed above, and a stack (or the recursive call stack) for depth-first search. And the priority queue ADT deferred here becomes concrete the moment the heap chapter derives sift-up and sift-down and shows why both take O(log n) — the two operations this chapter has already told you to expect.
`
};
