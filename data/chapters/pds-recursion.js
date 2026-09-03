// Textbook chapter: Recursion.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/pds.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure from the figs list below.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['pds-recursion'] = {
  figs: [
    {
      id: 'fib-call-tree',
      caption: 'The call tree for naive fib(4). Nine calls in total; the two shaded nodes are one of the two independent computations of fib(2) — the redundancy naive recursion pays for.',
      svg: '<svg viewBox="0 0 340 210" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3" fill="none"><line x1="170" y1="20" x2="90" y2="70"/><line x1="170" y1="20" x2="250" y2="70"/><line x1="90" y1="70" x2="50" y2="120"/><line x1="90" y1="70" x2="130" y2="120"/><line x1="250" y1="70" x2="210" y2="120" opacity=".5"/><line x1="250" y1="70" x2="290" y2="120" opacity=".5"/><line x1="50" y1="120" x2="30" y2="170"/><line x1="50" y1="120" x2="70" y2="170"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><circle cx="170" cy="20" r="13" fill="none" stroke="currentColor"/><text x="170" y="24">f4</text><circle cx="90" cy="70" r="13" fill="none" stroke="currentColor"/><text x="90" y="74">f3</text><circle cx="250" cy="70" r="13" fill="none" stroke="currentColor" opacity=".5"/><text x="250" y="74" opacity=".5">f2</text><circle cx="50" cy="120" r="13" fill="none" stroke="currentColor"/><text x="50" y="124">f2</text><circle cx="130" cy="120" r="13" fill="none" stroke="currentColor"/><text x="130" y="124">f1</text><circle cx="210" cy="120" r="13" fill="none" stroke="currentColor" opacity=".5"/><text x="210" y="124" opacity=".5">f1</text><circle cx="290" cy="120" r="13" fill="none" stroke="currentColor" opacity=".5"/><text x="290" y="124" opacity=".5">f0</text><circle cx="30" cy="170" r="13" fill="none" stroke="currentColor"/><text x="30" y="174">f1</text><circle cx="70" cy="170" r="13" fill="none" stroke="currentColor"/><text x="70" y="174">f0</text></g><text x="170" y="200" font-size="10" fill="currentColor" text-anchor="middle">9 nodes = 9 calls = C(4)</text></svg>'
    },
    {
      id: 'stack-depth',
      caption: 'The run-time stack at the deepest point of factorial(4). Five frames are alive at once — one per activation from f(4) down to the base case f(0).',
      svg: '<svg viewBox="0 0 300 230" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-rec-stack" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.4" fill="none"><rect x="50" y="20" width="160" height="32"/><rect x="50" y="54" width="160" height="32"/><rect x="50" y="88" width="160" height="32"/><rect x="50" y="122" width="160" height="32"/><rect x="50" y="156" width="160" height="32" opacity=".6"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><text x="130" y="40">f(4) waiting, ×4 pending</text><text x="130" y="74">f(3) waiting, ×3 pending</text><text x="130" y="108">f(2) waiting, ×2 pending</text><text x="130" y="142">f(1) waiting, ×1 pending</text><text x="130" y="176" opacity=".8">f(0) base, returns 1</text></g><path d="M225 172 L225 36" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah-rec-stack)"/><text x="255" y="105" font-size="10" fill="currentColor" transform="rotate(-90 255 105)">unwind: multiply going up</text><text x="20" y="14" font-size="11" fill="currentColor">depth = n+1 = 5 frames</text></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

Every recursive function is a small machine that calls a copy of itself. That sounds circular, and in a sense it is — but it is a controlled circularity, one that always narrows toward a case it can answer directly. This chapter is about learning to see that machine precisely: not just what a recursive function computes, but exactly what the computer does, line by line, call by call, to compute it.

Recursion sits on top of the function-call mechanism you already know from ordinary programming — parameters, local variables, a return address — and on the run-time stack that stores activations while they wait. Nothing new is added at the hardware level; recursion is simply a function whose activation record can contain another activation record of the same function, nested as deep as the problem requires. Once that stacking is visible to you, tracing any recursive program becomes a mechanical exercise rather than a guess. Later chapters — sorting by divide-and-conquer, tree and graph traversal, dynamic programming — are all built out of exactly this mechanism, so the discipline of tracing built here is used everywhere else in the course.

WHAT MAKES A DEFINITION RECURSIVE

Consider factorial. You could define it by listing: 0! = 1, 1! = 1, 2! = 2, 3! = 6, 4! = 24, and so on forever — but that list never ends and never helps you compute 100!. The useful definition instead says: n! is n times (n − 1)!, and 0! is 1 by convention.

This is a recursive definition: it defines the value of n! in terms of the value of the same function at a smaller argument, n − 1, plus one case, n = 0, that is answered directly with no reference to the function itself. That directly-answered case is the base case. Every other case is the recursive case, and it always refers to an instance of the problem that is strictly smaller — closer to the base case — than the one you started with.

Why does this actually compute anything, rather than just being a circular restatement of the problem? Because "smaller" is not vague — for factorial it is a non-negative integer that decreases by exactly 1 each time. A strictly decreasing sequence of non-negative integers cannot go on forever; it must eventually hit 0. So the chain 4! → 3! → 2! → 1! → 0! is guaranteed to reach the base case in a bounded number of steps, and once it does, every pending multiplication can be carried out and the answer assembled going back up the chain.

KEY: A recursive definition needs exactly two ingredients: a base case answered without recursion, and a recursive case that reduces the problem to a smaller instance of itself. "Smaller" must be measured on something that is bounded below and strictly decreases every call — an integer counting down to 0, an array shrinking by one index, a search range that halves — or the chain of calls never reaches the base case.

This is precisely the shape of a proof by mathematical induction: prove the base case directly, then show that if the statement holds for n − 1 it holds for n. A recursive function is that same argument turned into a computation — instead of proving a property holds for all n, it computes a value for a given n by relying on the value already known to be correct for something smaller.

THE THREE QUESTIONS EVERY RECURSIVE FUNCTION MUST ANSWER

Before trusting or writing any recursive function, ask exactly three questions of it. Almost every bug and almost every tracing mistake traces back to getting one of these wrong.

1. Is there a base case, and can every legal input actually reach it? Not "does a base case exist somewhere in the code" but "starting from this specific argument, does the sequence of recursive calls land on it exactly, or step over it?"

2. Does every recursive call move strictly closer to the base case? "Closer" on whatever quantity you are decreasing — n itself, an index, a range size — never staying the same and never moving away.

3. Assuming every smaller call already returns the correct answer for its smaller input, does the current call combine those answers correctly into the answer for its own input? This is the recursive leap of faith: you do not re-derive how f(n − 1) works, you trust that it is correct (by induction) and check only that f(n) uses that result properly.

Question 3 is where most logic errors live. A student writing factorial who returns n + f(n − 1) instead of n * f(n − 1) has a perfectly well-formed recursion — base case fine, always gets closer — but combines correctly-computed smaller answers the wrong way, computing a sum instead of a product. GATE distractor options are frequently built by breaking exactly this third question while leaving the first two intact, so tracing carefully beats spotting the "shape" of the correct answer.

WHAT A FUNCTION CALL ACTUALLY DOES: THE ACTIVATION RECORD

To trace recursion exactly, you need to know precisely what a function call does to the machine, because recursion is just this same mechanism used repeatedly on the same function.

Every time any function is called — recursive or not — the run-time system pushes a new block of memory onto the call stack called an activation record (also called a stack frame). It exists to hold everything that call needs and everything that must be restored when the call finishes:

• The function's parameters — the values (or references) passed in for this specific call. If f(3) is called, this activation's copy of n is 3, independent of any other activation's copy.

• The function's local variables — anything declared inside the function body. Each activation gets its own fresh copies, initialised anew.

• The return address — the exact instruction, back in the caller, to resume at once this call finishes. Without this, control would have nowhere to go back to.

• Saved registers — the values that were sitting in the CPU's registers for the calling activation, saved so the callee can use those same registers freely and the caller can pick up exactly where it left off.

When the call finishes — reaches a return statement, or falls off the end of the function — its activation record is popped off the stack, its memory is reclaimed, control jumps to the saved return address, and (if there is a return value) that value is handed back to the specific point in the caller's code that made the call.

KEY: The stack grows by one activation record per call and shrinks by one per return. Because it is a stack — last in, first out — the most recently made call is always the first one to finish and be popped. This LIFO discipline is the entire reason recursion works: an outer call can stay frozen, mid-statement, while an arbitrarily deep chain of inner calls runs and finishes underneath it, and it is guaranteed to resume exactly where it paused.

Two calls to the same function, at the same moment, are two entirely separate activation records. f(3)'s copy of n, its locals, its return address are not shared with f(2)'s copy of the same variables, even though both activations are running the same code. This is why recursion needs no special hardware or language feature beyond ordinary function calls: it is ordinary function calls, just made by a function to a call site that happens to name itself.

TRACING FACTORIAL(4) BOX BY BOX

Take int fact(int n) { if (n == 0) return 1; return n * fact(n - 1); } and call fact(4). Trace it as a stack of boxes, one per activation, drawn as they are pushed and annotated as they are popped.

1. fact(4) is called. Push a box: n = 4. It evaluates the condition n == 0 (false), so it must evaluate n * fact(n - 1). To do that it first needs fact(3) — the multiplication by 4 is pending, waiting for that result. fact(4)'s box stays on the stack, frozen mid-statement.

2. fact(3) is called. Push a box: n = 3. Same situation: n == 0 is false, so fact(2) is needed before the pending multiplication by 3 can happen. fact(3)'s box freezes.

3. fact(2) is called. Push: n = 2. Needs fact(1); multiplication by 2 pending. Freeze.

4. fact(1) is called. Push: n = 1. Needs fact(0); multiplication by 1 pending. Freeze.

5. fact(0) is called. Push: n = 0. Now n == 0 is true — the base case. It returns 1 immediately, with nothing pending. Its box is popped.

[[FIG:stack-depth]]

At this instant the stack held five boxes at once — fact(4), fact(3), fact(2), fact(1), fact(0) — the deepest point of the whole computation. Now unwind, popping one box per step and completing the multiplication each was waiting on.

6. Control returns to fact(1)'s frozen statement with fact(0)'s result, 1, in hand. fact(1) computes 1 * 1 = 1, returns 1, and its box is popped.

7. Control returns to fact(2), which now has fact(1)'s result, 1. It computes 2 * 1 = 2, returns 2, popped.

8. Control returns to fact(3), which has fact(2)'s result, 2. It computes 3 * 2 = 6, returns 6, popped.

9. Control returns to fact(4), which has fact(3)'s result, 6. It computes 4 * 6 = 24, returns 24, popped. The stack is now empty and fact(4) has returned 24 to whoever called it.

Two things to notice. First, nothing was actually multiplied until the base case was reached — every activation from fact(4) down to fact(1) only set up a pending multiplication, and all five multiplications happen during the unwind, in exactly the reverse order the calls were made. Second, the maximum stack depth for fact(n) is n + 1 boxes: one activation for every integer from n down to 0, inclusive — the base-case frame counts too.

GATE TRAP: A question asking "how many activation records are on the stack at the deepest point of fact(5)" wants 6, not 5 — the base case fact(0) is itself a frame that must be pushed and is present (briefly) alongside all five waiting callers before it returns. Confusing "activation records" (frames, including the base) with "recursive calls made" (5 calls with argument 5,4,3,2,1 before hitting the base) is the single most common off-by-one in this topic.

THE CALL TREE VERSUS THE CALL STACK

Factorial makes exactly one recursive call per activation, so its calls form a simple chain — a straight line from fact(4) down to fact(0). Many recursive functions make more than one call per activation, and for those you need two different pictures, and you must not confuse them.

The call tree is the complete record of every call that is ever made, drawn with the initial call as the root and each call's recursive calls as its children. It exists even after the whole computation is finished — it is a static description of the work that was done. Its size, the total number of nodes, is the total number of calls made over the entire run.

The call stack is the set of activations that are alive — pushed but not yet returned — at one specific instant during execution. It changes constantly as the program runs: it grows on every call, shrinks on every return, and at any given moment it corresponds to exactly one root-to-node path in the call tree — the path from the initial call down to whichever call is currently executing or about to be dispatched.

KEY: The call tree tells you the total amount of work (how many calls, in total, does this computation make). The call stack tells you the memory in use at one moment (how many of those calls are still waiting for something, right now). For factorial, the tree is a straight line, so the tree's size and the stack's maximum depth are the same number, n + 1 — which is exactly why a first look at factorial can make people think "total calls" and "maximum depth" are always the same thing. They are not, and functions with more than one recursive call per activation are where the difference shows up.

Take void f(int n) { if (n <= 0) return; printf("%d ", n); f(n - 1); f(n - 1); } called as f(3). Every activation with n > 0 makes two further calls, so the call tree is a full binary tree: the root f(3) has two children f(2), each f(2) has two children f(1), each f(1) has two children f(0). Counting nodes level by level — 1 at the root, 2, 4, 8 — the tree has 1 + 2 + 4 + 8 = 15 total calls. But the call stack never holds more than 4 activations at once — f(3), f(2), f(1), f(0) along one path — because the two recursive calls in any activation run one after the other, not simultaneously; the first f(n − 1) must fully return, popping its entire sub-stack, before the second f(n − 1) is even called.

REMEMBER: Total calls (call-tree size) and maximum depth (call-stack size) are different questions with different answers whenever a function makes more than one recursive call per activation. For a single-branch recursion like factorial they coincide; for a double-branch recursion like the one above they do not — 15 total calls, but only 4 deep at any instant.

WHEN RECURSION GOES WRONG: INFINITE RECURSION AND STACK OVERFLOW

Section "What Makes a Definition Recursive" required that the recursive case always move closer to a reachable base case. What actually happens, mechanically, if that requirement is violated?

Each call still does exactly what section "What a Function Call Actually Does" described: push an activation record — parameters, locals, return address, saved registers — onto the stack. If the base case is never reached, calls keep being made and frames keep being pushed, with none of them ever returning to free their memory. The stack is a fixed region of memory (recall the process's address space from earlier in the course: the stack grows into a bounded area). Eventually there is no room left for another frame, and the next call fails outright — this is a stack overflow, and on nearly every system it crashes the program immediately (a segmentation fault, or an explicit "stack overflow" error), because the attempt to push past the end of the stack region touches memory the process does not own.

How many frames fit before that happens? If the stack region has S bytes of usable space and each activation record occupies F bytes, then approximately

max depth ≈ S / F

frames can be pushed before overflow. This is why a function with large local arrays overflows at a much shallower recursion depth than one with only a few integer locals — F is bigger, so S / F is smaller for the same S. It is also why some systems let you raise the stack size limit to permit deeper recursion, and why converting deep recursion to iteration (covered later in this chapter) removes the limit entirely, since iteration uses a fixed, small amount of stack regardless of how many times the loop body runs.

GATE TRAP: "The compiler detects a missing base case and reports an error" is false. Whether a given call eventually reaches a base case is, in general, undecidable at compile time (it is equivalent to the halting problem), so no compiler check can catch every case. C, and most languages, impose no automatic recursion-depth limit either — the only limit is the physical size of the stack, and running past it is a run-time crash, not a compile-time or a graceful run-time error.

A subtler version of the same bug: a base case exists in the code but is never reached for a particular input. int f(int n) { if (n == 0) return 1; return f(n - 2); } has a perfectly good base case at n == 0 — but called as f(5), the argument goes 5, 3, 1, −1, −3, … and never equals 0. It recurses forever (in principle) for every odd starting value, while working correctly for every even one. Always check reachability for the specific input, not just presence of a base case in the source.

PRINTING BEFORE VERSUS AFTER: THE ORDER-REVERSAL PATTERN

Now that the mechanism is precise, the most heavily tested recursion pattern falls out immediately: where a statement sits relative to the recursive call determines whether it executes on the way down or on the way back up.

Take void fun(int n) { if (n > 0) { printf("%d ", n); fun(n - 1); } } called as fun(3). The print statement comes before the recursive call, so it executes during the descent, before the deeper call is even made.

• fun(3): prints 3, then calls fun(2).
• fun(2): prints 2, then calls fun(1).
• fun(1): prints 1, then calls fun(0).
• fun(0): n > 0 is false, does nothing, returns.

Nothing happens on the way back up — there is no statement after the recursive call. Printed output: 3 2 1.

Now swap the order: void fun(int n) { if (n > 0) { fun(n - 1); printf("%d ", n); } }. The print now comes after the recursive call, so on the way down nothing is printed at all — every activation immediately dives to fun(n − 1) before doing anything else.

• fun(3) calls fun(2) immediately.
• fun(2) calls fun(1) immediately.
• fun(1) calls fun(0) immediately.
• fun(0): base case, returns immediately, printing nothing.

Only now, unwinding, does anything print — and it prints in the reverse order the calls were made, because unwinding is LIFO: the most recently frozen activation resumes first.

• fun(1) resumes (its call just returned), prints 1, returns.
• fun(2) resumes, prints 2, returns.
• fun(3) resumes, prints 3, returns.

Printed output: 1 2 3 — the exact reverse of the print-before version, from the identical recursive structure.

KEY: A statement placed after the recursive call is not skipped — it is suspended, frozen in that activation's frame, and it runs later, during the unwind, in the reverse order its activations were created. This single fact explains every "before vs after" tracing question: find where the print sits, decide whether output happens on the way down (matches call order) or on the way back up (reversed), then read the arguments off in that order.

The same idea governs functions that transform their argument before recursing. Take void f(int n) { if (n > 0) { printf("%d ", n % 2); f(n / 2); } } called as f(11). Trace the calls in order, printing before each recursive step: f(11) prints 11 % 2 = 1, recurses on 5; f(5) prints 5 % 2 = 1, recurses on 2; f(2) prints 2 % 2 = 0, recurses on 1; f(1) prints 1 % 2 = 1, recurses on 0; f(0) is the base case, stops. Printed sequence: 1 1 0 1.

Those are the binary digits of 11 (which is 1011 in binary) but produced least-significant bit first, because dividing by 2 peels off the low bit first — so printing before the call gives the digits in reverse. Moving the same printf to after the recursive call would make it print during the unwind instead, in the reverse order of discovery — which is the correct, most-significant-bit-first order, 1 0 1 1. This before/after placement, applied to a value-transforming recursion like this one, is exactly the same idea as the plain counting-down example, just dressed up with arithmetic.

GATE TRAP: It is tempting to think a recursive call "uses up" the statements around it in the order they are written, left to right, regardless of position. They are not used up in source order — they are used up in a down-then-up order dictated by the stack. Read every recursive trace as two passes: a descent (statements before the call, in call order) and an ascent (statements after the call, in reverse call order).

TWO CALLS PER LEVEL: FIBONACCI AND THE COST OF NAIVE RECURSION

Fibonacci is defined recursively in the most natural possible way: fib(0) = 0, fib(1) = 1, and for n ≥ 2, fib(n) = fib(n − 1) + fib(n − 2). Written directly as code — int fib(int n) { if (n <= 1) return n; return fib(n - 1) + fib(n - 2); } — this satisfies all three questions from earlier (base case present and reached, each call strictly smaller, combination correct), and it computes the right values: fib(2) = 1, fib(3) = 2, fib(4) = 3, fib(5) = 5.

But look at what it costs. Computing fib(4) needs fib(3) and fib(2). Computing fib(3) needs fib(2) and fib(1) — a second, entirely independent computation of fib(2), from scratch, sharing nothing with the fib(2) computed directly for fib(4). Every call to fib(n) for n ≥ 2 spawns two more calls, and those overlap heavily.

[[FIG:fib-call-tree]]

To count the calls exactly, let C(n) be the total number of activations of fib made while computing fib(n), counting the call itself. A base-case call (n = 0 or n = 1) makes no further calls, so it counts as exactly 1. A call with n ≥ 2 counts as itself, plus everything inside its two recursive calls:

C(n) = C(n − 1) + C(n − 2) + 1, with C(0) = C(1) = 1

Unroll this exactly as you would fib itself, from the base upward:

1. C(0) = 1, C(1) = 1 (given).
2. C(2) = C(1) + C(0) + 1 = 1 + 1 + 1 = 3.
3. C(3) = C(2) + C(1) + 1 = 3 + 1 + 1 = 5.
4. C(4) = C(3) + C(2) + 1 = 5 + 3 + 1 = 9.
5. C(5) = C(4) + C(3) + 1 = 9 + 5 + 1 = 15.

So computing fib(5) makes 15 separate calls to compute a value that a single running total could produce in 5 additions. The pattern C(n) = 2·fib(n + 1) − 1 holds throughout (check: 2·fib(6) − 1 = 2·8 − 1 = 15; 2·fib(5) − 1 = 2·5 − 1 = 9, matching C(4)) — the call count grows exponentially with n because every level roughly doubles the branching, exactly like the pure binary-call example in the previous section, except Fibonacci's tree is slightly lopsided (one branch is always one level shallower than the other) rather than perfectly full.

KEY: The value fib(n) is easy to state and grows only moderately, but the naive recursive call count grows exponentially, because the same smaller subproblems — fib(2), fib(3), and so on — are recomputed from scratch every time they are needed rather than computed once and reused. This gap between "the answer is simple" and "computing it this way is expensive" is the entire motivation for memoisation, which stores each fib(k) the first time it is computed and reuses the stored value instead of recursing again — turning the exponential call tree into a linear chain of n calls, each doing O(1) new work.

An iterative version sidesteps recursion altogether: keep two running variables, a = fib(0) and b = fib(1), and repeatedly set (a, b) = (b, a + b) for n steps. This computes fib(n) in a single loop, O(n) time, O(1) extra space — no call stack at all, because there is no recursive call to make. Naive recursive fib, memoised fib, and iterative fib all compute the identical value; they differ only in how much work and how much stack space that computation costs.

COUNTING CALLS EXACTLY: BINARY SPLITS, LOOPS, AND HALVING

The Fibonacci count generalises to a broader method: whenever you must count total calls, write a recurrence for "number of calls made starting from argument n", with a base case, and unroll it exactly as you would unroll a value recurrence — the machinery is identical, only the thing being computed (a count, not a value) differs.

For a function that always makes two calls on n − 1 (a full binary call tree of depth n, like void f(int n) { if (n <= 0) return; f(n - 1); f(n - 1); }), the count recurrence is T(n) = 2T(n − 1) + 1 with T(0) = 1 (the base case is itself one call). Unrolling: T(0) = 1, T(1) = 2·1 + 1 = 3, T(2) = 2·3 + 1 = 7, T(3) = 2·7 + 1 = 15. In general this doubling-plus-one pattern gives T(n) = 2^(n+1) − 1 — the count of nodes in a full binary tree with n + 1 levels (levels 0 through n), since level k has exactly 2^k calls and

sum from k=0 to n of 2^k = 2^(n+1) − 1

A related but different shape: a function that calls itself twice on half the input, f(n/2) computed independently both times, such as int f(int n) { if (n <= 1) return 1; return f(n / 2) + f(n / 2); }. The value here is easy — f doubles each time you double n, so for n a power of two, f(n) = n — but the call count is not free just because the value is simple. Writing C(n) for the number of calls: C(n) = 2C(n/2) + 1, C(1) = 1. Assuming n = 2^k and unrolling by powers of two:

1. C(1) = 1.
2. C(2) = 2C(1) + 1 = 3.
3. C(4) = 2C(2) + 1 = 7.
4. C(8) = 2C(4) + 1 = 15.

The pattern is C(n) = 2n − 1 for n a power of two — linear in n, not the O(log n) you would get if the code computed f(n/2) once, stored it, and doubled the stored value instead of calling f(n/2) a second time. The lesson is exactly the Fibonacci lesson in miniature: calling the same subproblem twice instead of once turns a cheap computation into an expensive one, even when the final answer is simple to state.

A third shape puts the recursive call inside a loop rather than making a fixed number of calls: void f(int n) { if (n == 0) return; for (int i = 0; i < n; i++) f(n - 1); }. Every activation with argument n makes n separate calls with argument n − 1. Writing T(n) for total calls: T(n) = n · T(n − 1), with T(0) = 1 (the base case is one call, no further ones). Unrolling:

T(0) = 1
T(1) = 1 · T(0) = 1
T(2) = 2 · T(1) = 2
T(3) = 3 · T(2) = 6
T(4) = 4 · T(3) = 24

This is exactly n! — a loop of size n wrapped around a recursive call multiplies the call count by n at every level, and multiplying by n, n − 1, n − 2, … down to 1 is precisely the factorial product. A single recursive call inside a loop can therefore be far more expensive than a fixed number of recursive calls, and the width of the loop at each level is what to look for when a question adds a for-loop around a recursive call.

REMEMBER: To count calls, write a recurrence for the count exactly as you would for the value, with its own base case, and unroll it from the base upward using a small table — one row per argument value, computed strictly in order from smallest to largest. Never try to do more than two or three levels of a call-counting recurrence in your head; a five-row table is faster and never gets the algebra wrong.

STATIC AND GLOBAL VARIABLES ACROSS RECURSIVE CALLS

Every activation record has its own private copies of parameters and ordinary local variables — that was central to the whole mechanism described earlier. A static local variable (in C, one declared with the static keyword inside the function) and a global variable are different: they live in the program's data section, not on the stack, so there is exactly one copy, and every activation of the function — no matter how deep — reads and writes that same single copy.

Take int f(int n) { static int c = 0; c++; if (n <= 1) return c; return f(n / 2); } called exactly once, as f(16). Trace the argument values first, since the recursion halves n each time: 16, 8, 4, 2, 1 — five calls before the base case n ≤ 1 fires (on n = 1). Because c is static, every one of those five activations increments the same counter.

1. f(16): c becomes 1. n = 16 > 1, so it calls f(8).
2. f(8): c becomes 2. n = 8 > 1, calls f(4).
3. f(4): c becomes 3. n = 4 > 1, calls f(2).
4. f(2): c becomes 4. n = 2 > 1, calls f(1).
5. f(1): c becomes 5. n = 1 ≤ 1 — base case — returns the current value of c, which is 5.

That returned value, 5, is then passed straight back up: f(2)'s statement was return f(n / 2), so f(2) returns exactly what f(1) returned, namely 5, without modifying it. The same is true all the way up — f(4), f(8), f(16) each just relay the value they got back. So f(16) returns 5, which equals the number of times f was called (⌊log2 16⌋ + 1 = 4 + 1 = 5), because the static counter is nothing more or less than a shared tally of total activations.

GATE TRAP: If c were declared as an ordinary local variable — int c = 0; without static — each of the five activations would get its own fresh copy initialised to 0, increment its own copy to 1, and f(1) would return 1, not 5. Confusing "each activation has its own copy" (true for ordinary locals) with "there is one shared copy across all activations" (true for statics and globals) is the whole trap. Read the declaration before trusting any intuition about what a variable "should" do across calls.

KEY: A static or global variable is the one deliberate hole in the "each call gets its own private state" rule. It is exactly how a recursive function can accumulate a running total, a call count, or a shared flag across its own activations without threading an extra parameter through every call — but it also means the value seen by one activation can have been changed by a completely different one, which is precisely the source of subtle recursion bugs discussed later in this chapter.

RECURSION ON ARRAYS: INDEX AS THE MOVING PART

Recursion on an array almost always uses an integer index as the quantity that gets closer to the base case, since arrays themselves do not shrink the way a number does. The two disciplines from earlier — base case reachable, each call strictly closer — apply exactly the same way to an index as they did to n.

Summing an array recursively: int sum(int a[], int i, int n) { if (i == n) return 0; return a[i] + sum(a, i + 1, n); }. For a = [10, 20, 30], n = 3, called as sum(a, 0, 3): the recursive step's addition is pending work, exactly like factorial's multiplication, so this only starts adding on the unwind. sum(a,0,3) needs sum(a,1,3); sum(a,1,3) needs sum(a,2,3); sum(a,2,3) needs sum(a,3,3); sum(a,3,3) hits i == n and returns 0. Unwinding: sum(a,2,3) = a[2] + 0 = 30; sum(a,1,3) = a[1] + 30 = 50; sum(a,0,3) = a[0] + 50 = 60.

Printing an array in reverse recursively demonstrates the before/after rule from earlier applied to array traversal: void printRev(int a[], int i, int n) { if (i == n) return; printRev(a, i + 1, n); printf("%d ", a[i]); }. The print sits after the recursive call, so it fires on the unwind. For a = [10, 20, 30], the calls descend all the way to i = 3 (base case, prints nothing), then unwind: the i = 2 activation resumes and prints a[2] = 30; the i = 1 activation prints a[1] = 20; the i = 0 activation prints a[0] = 10. Output: 30 20 10 — the array in reverse, produced simply by putting the print after the call and letting the natural unwind order do the reversing.

String reversal in place uses two indices closing in from both ends: void reverse(char s[], int i, int j) { if (i >= j) return; swap(s[i], s[j]); reverse(s, i + 1, j - 1); }. On "abcd" (indices 0..3): reverse(s,0,3) swaps s[0] and s[3], giving "dbca", then calls reverse(s,1,2); that swaps s[1] and s[2], giving "dcba", then calls reverse(s,2,1); now i ≥ j (2 ≥ 1), base case, stop. Final string: "dcba".

A palindrome check reuses the identical two-index shrinking, but compares instead of swapping: int isPalin(char s[], int i, int j) { if (i >= j) return 1; if (s[i] != s[j]) return 0; return isPalin(s, i + 1, j - 1); }. On "abba" (indices 0..3): s[0] = 'a' equals s[3] = 'a', so it calls isPalin(s,1,2); s[1] = 'b' equals s[2] = 'b', so it calls isPalin(s,2,1); now i ≥ j, base case, returns 1. That 1 flows back up through both waiting calls unchanged, so isPalin returns 1 — "abba" is confirmed a palindrome. Had any comparison failed, that activation would return 0 immediately, and every waiting caller above it would relay that 0 straight up without checking anything further, since the recursive step returns the inner call's result directly.

Binary search recursively narrows an index range rather than growing or shrinking a single index: int bsearch(int a[], int lo, int hi, int key) { if (lo > hi) return -1; int mid = (lo + hi) / 2; if (a[mid] == key) return mid; if (a[mid] < key) return bsearch(a, mid + 1, hi, key); return bsearch(a, lo, mid - 1, key); }. On the sorted array [2, 4, 6, 8, 10, 12, 14] (indices 0..6) searching for 10: first call has lo = 0, hi = 6, mid = 3, a[3] = 8 < 10, so it recurses on lo = 4, hi = 6; second call has mid = 5, a[5] = 12 > 10, so it recurses on lo = 4, hi = 4; third call has mid = 4, a[4] = 10 — found, return 4. Three calls to search seven elements, matching the O(log n) behaviour derived formally later in this chapter.

MUTUAL RECURSION

A function does not need to call itself directly to be recursive — two functions that call each other, forming a cycle, are mutually recursive, and the same stack mechanism applies exactly, with activations simply alternating between the two functions instead of piling up copies of one.

bool isEven(int n) { if (n == 0) return true; return isOdd(n - 1); }
bool isOdd(int n) { if (n == 0) return false; return isEven(n - 1); }

Trace isEven(4): it calls isOdd(3), which calls isEven(2), which calls isOdd(1), which calls isEven(0). isEven(0) is a base case, returns true directly. That true flows back up unchanged through every waiting call: isOdd(1) returns isEven(0)'s result, true; isEven(2) returns isOdd(1)'s result, true; isOdd(3) returns isEven(2)'s result, true; isEven(4) returns isOdd(3)'s result, true. Four is indeed even, so the answer is correct, and the stack at its deepest point held one activation of each function alternating: isEven(4), isOdd(3), isEven(2), isOdd(1), isEven(0) — five frames, alternating between the two functions but forming a single, ordinary LIFO stack exactly as before.

KEY: Mutual recursion is not a different mechanism from ordinary recursion — it is the same activation-record stack, just populated by activations of more than one function. The base case can live in either function (here it is in both, for n = 0), and the same three questions — base case reachable, each call closer, combination correct — apply to the pair of functions together.

RETURN VALUES: HOW A RESULT FLOWS BACK UP

Tracing a return value is the mirror image of tracing printed output: instead of asking what happens on the way down, you ask what value each activation hands back to the one waiting above it, and you compute those values strictly from the base case upward, since no activation can know its own return value until the call it is waiting on has returned.

Take int f(int n) { if (n == 0) return 1; return 2 * f(n - 1) + 1; } and find f(4). This is a two-branch-per-call situation only in the sense that each call does work both before descending (nothing here) and after the inner call returns (the doubling and adding 1) — the "combination" step from the three-questions checklist is exactly this pending arithmetic. Build the table strictly upward from the base:

1. f(0) = 1 (base case, given directly).
2. f(1) = 2 · f(0) + 1 = 2 · 1 + 1 = 3.
3. f(2) = 2 · f(1) + 1 = 2 · 3 + 1 = 7.
4. f(3) = 2 · f(2) + 1 = 2 · 7 + 1 = 15.
5. f(4) = 2 · f(3) + 1 = 2 · 15 + 1 = 31.

f(4) returns 31. Each value in this table was needed to compute the next, and none of it could be computed top-down — you cannot evaluate 2 · f(3) + 1 without already knowing f(3), which is exactly why the calls must descend to the base case before any arithmetic can happen, and why the table is built from row 1 upward, in the same direction the unwind actually proceeds. The closed form here is f(n) = 2^(n+1) − 1 (check: 2^5 − 1 = 31), the identical shape derived for the binary-call-count recurrence earlier in this chapter — the same recurrence pattern shows up whether it is counting calls or computing a returned value.

GATE TRAP: A very common distractor is the value one row short — here, 15 instead of 31 — produced by stopping the unroll at f(3) instead of continuing to f(4), or by miscounting how many levels separate the requested argument from the base case. Always write out every row explicitly from f(0), including the base case itself as row zero; do not try to jump straight to the requested argument.

A composed, self-referential version of return-value tracing is worth seeing once because it looks intimidating but is solved the same way — patiently, innermost first. The McCarthy function is int f(int n) { if (n > 100) return n - 10; return f(f(n + 11)); }. To evaluate f(95), you must evaluate the inner f(95 + 11) = f(106) first, since it is an argument to the outer f. f(106): 106 > 100, so it returns 106 − 10 = 96 directly — no further recursion. Now evaluate f(96), which is f(f(107)): f(107) returns 97 directly (107 > 100); then f(97) needs f(f(108)) = f(98); f(98) needs f(f(109)) = f(99); f(99) needs f(f(110)) = f(100); f(100) needs f(f(111)); f(111) returns 101 directly; f(101) returns 91 directly (101 > 100, so 101 − 10 = 91). That 91 propagates back: f(100) = f(101) = 91; f(99) = f(100) = 91; f(98) = f(99) = 91; f(97) = f(98) = 91; f(96) = f(97) = 91; and finally f(95) = f(96) = 91. Every argument at most 100 funnels to 91 through this chain — the only discipline needed to trace it is never guessing an inner value, always computing the innermost, fully-parenthesised call first.

TAIL RECURSION AND THE JUMP TO ITERATION

Look again at factorial's recursive step: return n * f(n - 1);. After f(n - 1) returns, there is still work left to do in this activation — multiply by n — before this activation itself can return. That pending work is exactly why the activation record has to stay on the stack: it is remembering "multiply the eventual result by n" until the inner call comes back.

A tail call is a recursive call with no such pending work: the call is the very last action the activation performs, and whatever it returns is returned by the caller completely unchanged. int fact(int n, int acc) { if (n == 0) return acc; return fact(n - 1, n * acc); } is tail recursive — the multiplication n * acc happens before the call, as part of building the argument, and the call's result is returned as-is, with nothing left pending afterward.

KEY: To tell whether a call is a tail call, ask: after this call returns, does the current activation still have to do anything with the result before it can return? If yes — multiply it, add to it, compare it, print something after it — the call is not a tail call, however the arithmetic is arranged (return f(n-1) * n and return n * f(n-1) are equally non-tail, since operand order does not matter). If no — the value comes straight back out — it is a tail call.

Why does this distinction matter? Because a tail call's activation has nothing left to contribute once it makes the call. If the caller's frame is not needed for anything after the call, the run-time does not need to keep it around waiting — it can be reused for the callee's frame instead of stacking a fresh one on top. This is exactly how a tail-recursive function can be executed with a fixed, constant amount of stack space no matter how many calls deep the logic goes, rather than one frame per call.

Converting a tail-recursive function into an explicit loop makes this concrete, because it is exactly what reusing the frame amounts to: replace the accumulator parameter with a local variable, and replace "call with new arguments" with "reassign the loop variables and go around again."

int fact(int n) {
  int acc = 1;
  while (n > 0) {
    acc = n * acc;
    n = n - 1;
  }
  return acc;
}

Every tail-recursive function converts to a loop this way: the parameters become variables updated in place, the recursive call becomes "update the variables and loop back to the top," and the base case becomes the loop's exit condition. This is not a coincidence — a tail call is already, structurally, nothing but a jump back to the top of the function with new argument values, which is precisely what a loop iteration is.

REMEMBER: Recursion is the natural tool when a problem is naturally self-similar and its combination step genuinely needs the results of more than one smaller call, or needs to hold state open across a call (tree and graph traversal, divide-and-conquer, backtracking over choices). Iteration is natural, and preferable, when the work is a simple linear repetition with no pending combination step — and any tail recursion is exactly that in disguise, so it should generally be written as a loop rather than left as recursion, both for clarity and to avoid depending on a compiler actually performing the frame-reuse optimisation, which not every compiler does for every case.

A non-tail recursion cannot be turned into a plain loop this easily, because the pending work (the multiplication, the addition) genuinely needs somewhere to be remembered while deeper calls run. It can still be converted to an explicit iterative form, but only by maintaining an explicit stack of your own that holds exactly what the run-time stack was holding — which is no saving in memory, just a manual version of the same mechanism. This is why the space cost of recursion is stated as

space cost = O(maximum stack depth)

for any recursion whose calls are not eliminated by tail-call reuse: one activation record per unfinished call, alive for as long as that call has pending work, and freed only once it returns.

THE STANDARD RECURSIVE ALGORITHMS

The rest of this chapter's ideas — base case reachability, the stack, before/after ordering, counting calls, tail recursion — are the tools. This section applies them to the recursive algorithms that recur (so to speak) throughout the rest of the syllabus.

FACTORIAL AND THE THREE FIBONACCIS were traced in full above: factorial is the canonical single-branch, non-tail recursion (and its accumulator form the canonical tail recursion); naive Fibonacci is the canonical double-branch recursion whose exponential call count motivates both memoisation (store each fib(k) the first time it is computed, reuse it instead of recomputing — turns C(n) from exponential to O(n)) and the plain iterative two-variable version (O(n) time, O(1) space, no stack at all).

GCD BY EUCLID'S ALGORITHM. int gcd(int a, int b) { if (b == 0) return a; return gcd(b, a % b); } is tail recursive (the call's result is returned unchanged) and each call strictly shrinks the second argument, since a % b is always smaller than b. Trace gcd(48, 18): gcd(48,18) calls gcd(18, 48%18=12); that calls gcd(12, 18%12=6); that calls gcd(6, 12%6=0); that hits b == 0 and returns 6 directly. Four calls in total, three of them recursive steps, and the base-case value 6 is passed straight back up unchanged through all three waiting frames. The number of steps Euclid's algorithm needs depends on how quickly the remainder shrinks; it is smallest when one argument is a multiple of the other (one step) and largest — for a given size of input — when the two arguments are consecutive Fibonacci numbers, which is the slowest-shrinking case the modulus operation can produce.

POWER BY REPEATED SQUARING computes x^n using far fewer multiplications than n − 1 repeated multiplications by x. int power(int x, int n) { if (n == 0) return 1; int half = power(x, n / 2); if (n % 2 == 0) return half * half; return x * half * half; }. Trace power(2, 13): 13 is odd, so it needs power(2, 6); 6 is even, needs power(2, 3); 3 is odd, needs power(2, 1); 1 is odd, needs power(2, 0); 0 is the base case, returns 1. Unwinding: power(2,1) = 2 * 1 * 1 = 2; power(2,3) = 2 * 2 * 2 = 8 (n/2 = 1, half = power(2,1) = 2, n odd so x*half*half = 2*2*2 = 8); power(2,6) = half * half where half = power(2,3) = 8, giving 64; power(2,13) = x * half * half where half = power(2,6) = 64, giving 2 * 64 * 64 = 8192 = 2^13. Correct. Because an odd n always becomes even after one subtraction-by-one (folded here into the x * half * half branch) and an even n always halves, two calls can never both leave n odd in a row, so the number of calls is bounded by roughly 2·log2(n) — power by repeated squaring makes O(log n) calls where naive repeated multiplication would make n − 1.

TOWER OF HANOI moves n disks from a source peg to a destination peg, using a third peg as auxiliary, never placing a larger disk on a smaller one. The recursive idea: to move n disks from source to destination, first move the top n − 1 disks out of the way onto the auxiliary peg (using destination as their own temporary auxiliary), then move the single largest disk directly from source to destination, then move the n − 1 disks from the auxiliary peg onto the destination peg (using source as their temporary auxiliary).

void hanoi(int n, char src, char aux, char dst) {
  if (n == 0) return;
  hanoi(n - 1, src, dst, aux);
  printf("move disk %d: %c -> %c\\n", n, src, dst);
  hanoi(n - 1, aux, src, dst);
}

Let M(n) be the number of moves this makes. Each call with n > 0 makes exactly one move itself and delegates the rest to two recursive calls on n − 1 disks each: M(n) = 2M(n − 1) + 1, with M(0) = 0 (no disks, no moves). Unroll: M(0) = 0, M(1) = 2·0 + 1 = 1, M(2) = 2·1 + 1 = 3, M(3) = 2·3 + 1 = 7 — and in general

M(n) = 2^n − 1

Trace hanoi(3, A, B, C) — source A, auxiliary B, destination C — move by move, in the order they are actually printed:

1. hanoi(3,A,B,C) needs hanoi(2,A,C,B) first (move 2 disks out of the way, using C as their temporary auxiliary).
2. hanoi(2,A,C,B) needs hanoi(1,A,B,C) first.
3. hanoi(1,A,B,C) needs hanoi(0,A,C,B), which does nothing (base case).
4. hanoi(1,A,B,C) then moves disk 1: A → C.
5. hanoi(1,A,B,C) then calls hanoi(0,B,A,C), which does nothing.
6. Back in hanoi(2,A,C,B): it moves disk 2: A → B.
7. hanoi(2,A,C,B) then calls hanoi(1,C,A,B), which does hanoi(0,C,B,A) (nothing), moves disk 1: C → B, then hanoi(0,A,C,B) (nothing).
8. Back in hanoi(3,A,B,C): it moves disk 3: A → C.
9. hanoi(3,A,B,C) then calls hanoi(2,B,A,C), which by the same pattern moves disk 1: B → A, disk 2: B → C, disk 1: A → C.

The full sequence of moves, in order: disk 1 A→C, disk 2 A→B, disk 1 C→B, disk 3 A→C, disk 1 B→A, disk 2 B→C, disk 1 A→C. Seven moves, matching M(3) = 2^3 − 1 = 7, and every disk 1 move alternates with the moves of the larger disks exactly as the recursive structure dictates — disk 1 moves on every odd-numbered move.

REMEMBER: Hanoi's M(n) = 2T(n − 1) + 1 shape is one of the standard recurrence forms — the same algebra as the binary-call-count recurrence derived earlier — and appears whenever a problem is split into two equal recursive subproblems plus a fixed amount of work in between them.

ACKERMANN'S FUNCTION exists in this course purely to demonstrate how deep and how fast recursion can grow even from an innocent-looking definition, not because it computes anything used elsewhere. It is defined by

A(m, n) = n + 1, if m = 0
A(m, n) = A(m − 1, 1), if m > 0 and n = 0
A(m, n) = A(m − 1, A(m, n − 1)), otherwise

Fix m = 1 and unroll: A(1, 0) = A(0, 1) = 2, and for n > 0, A(1, n) = A(0, A(1, n − 1)) = A(1, n − 1) + 1 — each step just adds 1 to the previous one, so A(1, n) = A(1, 0) + n = n + 2, a perfectly ordinary linear function. Now fix m = 2: A(2, 0) = A(1, 1) = 1 + 2 = 3, and A(2, n) = A(1, A(2, n − 1)) = A(2, n − 1) + 2 (using the just-derived A(1, k) = k + 2), so A(2, n) = 3 + 2n — still ordinary and linear, just steeper.

The pattern breaks badly at m = 3. Its recurrence is A(3, n) = A(2, A(3, n − 1)) = 3 + 2·A(3, n − 1), with A(3, 0) = A(2, 1) = 3 + 2 = 5. Unrolling this linear recurrence: A(3, n) = 2^n · A(3,0) + 3·(2^(n−1) + 2^(n−2) + … + 1) = 5·2^n + 3(2^n − 1) = 8·2^n − 3 = 2^(n+3) − 3, already exponential. By m = 4 the growth is a tower of exponents — A(4, 2) has been computed and has thousands of digits — and no primitive recursive function (a function built only from ordinary bounded loops, without this kind of function calling into its own result as an argument, as A does with A(m, A(m+1, n-1))-style composition) can grow this fast. Ackermann's purpose here is exactly this demonstration: a handful of lines of recursive definition, following every rule this chapter has laid out, can still be computationally explosive, and the depth of nested calls needed to evaluate even A(2, 3) — verify it yourself by unrolling — is already far more than the innocent two-line definition suggests.

PERMUTATIONS generate every ordering of a set, and the standard recursive approach fixes one more position at a time. void permute(char a[], int l, int r) { if (l == r) { print(a); return; } for (int i = l; i <= r; i++) { swap(a[l], a[i]); permute(a, l + 1, r); swap(a[l], a[i]); } } — swap the candidate into position l, recurse on the rest, then swap back (undo the choice) before trying the next candidate. This undo-after-recursing is called backtracking, and it is what lets the same array be reused for every branch of the recursion tree without allocating a fresh copy each time.

Tracing permute on "ABC" (l = 0, r = 2), in the exact order output is produced: fixing A first and permuting "BC" gives ABC then ACB; swapping back and fixing B first gives BAC then BCA; swapping back and fixing C first gives CBA then CAB. Output order: ABC, ACB, BAC, BCA, CBA, CAB — six permutations, matching 3! = 6, in the order the nested for-loops and swaps naturally produce them, not alphabetical order.

SUBSETS enumerate every way of including or excluding each element, and the standard recursive approach decides one element at a time: void subsets(char a[], int i, int n, list cur) { if (i == n) { print(cur); return; } cur.push(a[i]); subsets(a, i + 1, n, cur); cur.pop(); subsets(a, i + 1, n, cur); }. Every activation branches in two — include a[i], recurse; then exclude a[i], recurse — so this is exactly the full-binary-call-tree shape from earlier, and the total number of base-case calls (complete subsets printed) is 2^n.

Tracing subsets on {a, b, c} (n = 3), always trying "include" before "exclude" at each step, in the exact order printed: {a,b,c}, {a,b}, {a,c}, {a}, {b,c}, {b}, {c}, {} — eight subsets, 2^3, produced as a depth-first walk of the include/exclude tree, always descending into "include" first at every level before backtracking to try "exclude".

FLOOD FILL AND DEPTH-FIRST SEARCH share one recursive shape: from the current cell (or vertex), recurse into every unvisited neighbour, marking each as visited immediately upon arrival so it is never processed twice. void fill(grid, r, c, target, replacement) { if (out of bounds or grid[r][c] != target) return; grid[r][c] = replacement; fill(grid, r+1, c, ...); fill(grid, r-1, c, ...); fill(grid, r, c+1, ...); fill(grid, r, c-1, ...); }. The base case is "out of bounds, already the wrong colour, or already filled" — marking a cell before recursing into its neighbours is exactly what keeps this from recursing forever bouncing between two cells, since a cell marked visited (or recoloured) fails the base-case test the next time it is reached from a different direction. This is the same pattern as depth-first search on a graph: visit, mark visited, recurse on every unvisited neighbour, and the marking-before-recursing step is what turns a graph that may contain cycles into a recursion that is still guaranteed to terminate.

RECURRENCE RELATIONS: FROM CODE TO CLOSED FORM

Every recursive algorithm's running time satisfies a recurrence built directly from its code: the time for input size n equals however many recursive calls it makes, each on however much smaller an input, plus however much non-recursive work is done at that level. Writing this recurrence and solving it by unrolling — exactly the technique used throughout this chapter for values and call counts — is how you get a closed-form running time for recursive code without having to trace every single call by hand.

The method is always the same: write T(n) in terms of T of something smaller, unroll two or three levels to see the pattern, express the pattern after k unrollings, then substitute the value of k that reaches the base case.

T(n) = T(n − 1) + 1, T(0) = 0 — a function that does O(1) work and makes one recursive call on n − 1 (for example, recursively finding the length of a linked list, or scanning to the end of an array). Unrolling: T(n) = T(n−1) + 1 = (T(n−2) + 1) + 1 = T(n−2) + 2 = T(n−3) + 3 = … = T(n−k) + k. Reaching the base case needs n − k = 0, i.e. k = n, giving T(n) = T(0) + n = n.

T(n) = n

T(n) = T(n − 1) + n, T(0) = 0 — a function that does O(n) work at the top level (a loop over the whole current input) before making one recursive call on n − 1 (for example, recursive selection sort, which scans for the maximum among n elements, then recurses on the remaining n − 1). Unrolling: T(n) = T(n−1) + n = (T(n−2) + (n−1)) + n = T(n−2) + (n−1) + n = … = T(0) + (1 + 2 + … + n).

T(n) = n(n + 1) / 2

T(n) = 2T(n/2) + n, T(1) = 1 — two recursive calls, each on half the input, plus O(n) work combining them (this is merge sort: two halves sorted recursively, then merged in O(n)). Unrolling by levels, assuming n is a power of two: at the top level the work is n; that level's two calls each contribute T(n/2) = 2T(n/4) + n/2, so level 2 contributes n/2 + n/2 = n of combining work again; in general every one of the log2(n) levels contributes exactly n total combining work, and there are log2(n) + 1 levels down to the base case T(1) = 1, which itself contributes n · T(1)/n = 1 unit per leaf, n leaves total = n.

T(n) = n · log2(n) + n

T(n) = T(n/2) + 1, T(1) = 1 — one recursive call on half the input, O(1) work otherwise (binary search). Unrolling: T(n) = T(n/2) + 1 = T(n/4) + 2 = T(n/8) + 3 = … = T(n / 2^k) + k. The base case is reached when n / 2^k = 1, i.e. 2^k = n, i.e. k = log2(n), giving T(n) = T(1) + log2(n) = 1 + log2(n).

T(n) = log2(n) + 1

T(n) = 2T(n − 1) + 1, T(0) = 0 — two recursive calls each on n − 1, plus O(1) work (Tower of Hanoi, already solved above by direct unrolling of the move count, using exactly this recurrence). Restating the method generally: T(n) = 2T(n−1) + 1 = 2(2T(n−2) + 1) + 1 = 4T(n−2) + 2 + 1 = 4T(n−2) + 3 = 8T(n−3) + 4 + 3 = 8T(n−3) + 7 = … = 2^k T(n−k) + (2^k − 1). Reaching the base case needs k = n, giving T(n) = 2^n T(0) + (2^n − 1) = 2^n − 1, matching the Hanoi move count exactly.

T(n) = 2^n − 1

KEY: Unrolling always follows the same three moves — substitute the recurrence into itself one more level, collect the pattern in terms of how many levels (k) have been unrolled, and solve for the k that reaches the base case (n − k = 0 for a "minus one" recursion, n / 2^k = 1 for a "halving" recursion). Do this for two or three levels by hand before trusting a guessed pattern; the guessed pattern must then be checked against the base case, exactly as every closed form above was checked by substituting back in.

COMMON BUGS IN RECURSIVE CODE

Four mistakes account for most recursion bugs, and each one is a direct violation of something derived earlier in this chapter.

Missing the base case entirely. A function with no condition that stops the recursion always overflows the stack for every input, since there is nothing capable of returning without making another call. This is the most obvious version of failing question 1 of the three-questions checklist.

A base case that exists but is never reached for some legal input — covered above with f(n − 2) called on odd n. The fix is to check reachability for every input the function is supposed to accept, not just to confirm a base case is present somewhere in the code; a base case at n == 0 does nothing for an input that only ever produces odd values.

GATE TRAP: Modifying a parameter passed by value and expecting the caller to see the change. void f(int n) { n = n + 1; ...} changes only this activation's private copy of n — parameters are copied into each activation record, exactly as described in the section on activation records — so the caller's variable is completely unaffected, no matter how deep the recursion goes or what the function returns. To hand a modified value back to the caller, the function must either return it explicitly, or the parameter must be passed by reference (a pointer, or a reference parameter), which shares the actual storage location rather than copying its current value.

Relying on a global or static variable across recursive calls without accounting for the fact that every activation shares the same copy. The static-counter example earlier in this chapter showed the correct, deliberate use of this sharing; the bug version is code that assumes a variable resets between calls (as ordinary locals do) when it is in fact declared static or global and does not — or, in the other direction, code that assumes a value set by one recursive branch is still whatever it was before a sibling branch ran, when the sibling may have changed the shared variable in between. Any time a global or static variable is read inside a recursive function, ask explicitly which of the function's own earlier or later activations could have written to it first.

WORKED PROBLEMS

Each problem below is solved with every intermediate step shown, in the style used throughout this chapter — no answer is asserted without the trace or unrolling that produces it.

1. What does the following print, called as fun(4)?
   void fun(int n) { if (n > 0) { printf("%d ", n); fun(n - 1); printf("%d ", n); } }
   The print before the call fires on the way down, in call order; the print after the call fires on the way up, in reverse call order — and here both prints exist in the same activation. Descent prints: fun(4) prints 4, fun(3) prints 3, fun(2) prints 2, fun(1) prints 1, fun(0) is the base case and prints nothing (n > 0 fails). Ascent, in reverse of the order calls were made: fun(1) resumes and prints 1, fun(2) prints 2, fun(3) prints 3, fun(4) prints 4. Full output: 4 3 2 1 1 2 3 4 — a palindrome sequence, because the descent and ascent are mirror images of each other by construction.

2. How many total calls does computing fib(6) make with the naive two-call recursion, and what is fib(6) itself?
   Using C(n) = C(n − 1) + C(n − 2) + 1 with C(0) = C(1) = 1: C(2) = 3, C(3) = 5, C(4) = 9, C(5) = 15, C(6) = C(5) + C(4) + 1 = 15 + 9 + 1 = 25. Using fib(0)=0, fib(1)=1: fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8. So fib(6) = 8, computed at a cost of 25 calls — three times the value itself, and the gap widens further for every larger n.

3. Trace what f(20) returns.
   int f(int n) { static int c = 100; c = c - 1; if (n == 0) return c; return f(n / 2); }
   Argument sequence from 20, halving with integer division: 20, 10, 5, 2, 1, 0 — six calls before n == 0. static c starts at 100 and is decremented once per call, shared across all activations: after call 1 (n=20), c = 99; after call 2 (n=10), c = 98; after call 3 (n=5), c = 97; after call 4 (n=2), c = 96; after call 5 (n=1), c = 95; after call 6 (n=0), c = 94, and n == 0 is now true, so this call returns c = 94 directly. Every enclosing call's statement is return f(n / 2), so 94 is relayed unchanged all the way back up. f(20) returns 94.

4. How many moves does Tower of Hanoi need for 5 disks, and what is the first move?
   Using M(n) = 2M(n − 1) + 1, M(0) = 0: M(1) = 1, M(2) = 3, M(3) = 7, M(4) = 15, M(5) = 2·15 + 1 = 31 — matching the closed form M(5) = 2^5 − 1 = 31. The very first move made is always the smallest disk, moved from the source peg directly to the destination peg, because hanoi(5, src, aux, dst) first recurses all the way down through hanoi(4,...), hanoi(3,...), hanoi(2,...), hanoi(1,...) — each of those, before doing anything else, recurses one level deeper on the same source and (shifting) auxiliary pegs — until hanoi(1, src, ?, dst) is reached, whose very first action after its own trivial base case is to move disk 1 from src to dst.

5. What is the maximum call-stack depth, and the total number of calls, for void f(int n) { if (n <= 0) return; f(n - 1); f(n - 1); } called as f(4)?
   Total calls (call-tree size): using T(n) = 2T(n − 1) + 1, T(0) = 1: T(1) = 3, T(2) = 7, T(3) = 15, T(4) = 2·15 + 1 = 31, matching 2^(n+1) − 1 = 2^5 − 1 = 31. Maximum stack depth: the two recursive calls in any activation run strictly one after the other, so at any instant only one root-to-leaf path is alive, giving a depth of n + 1 = 5 — the same "count nodes for total, count one path for depth" distinction drawn earlier in the call-tree-versus-call-stack section.

6. Write the recurrence for, and solve, the running time of this function, called on an array of size n:
   void f(int a[], int n) { if (n <= 1) return; process(a, n); f(a, n - 1); } where process does O(n) work.
   Each call does O(n) work (the call to process) and makes one recursive call on n − 1, so T(n) = T(n − 1) + n, with T(1) = O(1) (call it 0 for the base, since a size-1 array needs no processing). This is exactly the second standard form derived earlier: unrolling T(n) = T(n−1) + n = T(n−2) + (n−1) + n = … = T(0) + (1 + 2 + … + n) gives the closed form T(n) = n(n + 1)/2, so the algorithm runs in O(n^2) time — quadratic, because it repeats a linear scan once for every one of the n levels of recursion.

7. Is int f(int n, int total) { if (n == 0) return total; return f(n - 1, total + n); } tail recursive, and what does it compute for f(4, 0)?
   The recursive call's result, f(n - 1, total + n), is returned exactly as received, with nothing computed afterward in this activation — the addition total + n happens before the call, building the new argument, not after it returns. This is tail recursive, convertible directly to a while loop identical in shape to the accumulator factorial shown earlier. Tracing the value: f(4,0) calls f(3,4); f(3,4) calls f(2,7); f(2,7) calls f(1,9); f(1,9) calls f(0,10); f(0,10) hits n == 0 and returns 10 directly, which is relayed unchanged all the way back up. f(4, 0) returns 10 — the sum 4+3+2+1 accumulated as the argument builds, rather than as pending work after each call returns.

WHAT TO CARRY INTO THE NEXT CHAPTER

Every technique in this chapter — the activation-record stack, tracing the descent and the ascent, counting calls by writing and unrolling a recurrence, distinguishing the call tree from the call stack — is exactly the machinery the next chapters reuse without re-explaining it. Stacks and queues, covered next, are the explicit, programmer-visible version of the same LIFO discipline the run-time stack has been doing for you invisibly throughout this chapter; and later, when divide-and-conquer sorting algorithms are analysed for time complexity, the recurrence-unrolling method practised here on T(n) = 2T(n/2) + n is the entire technique, just applied to merge sort and quicksort by name.
`
};
