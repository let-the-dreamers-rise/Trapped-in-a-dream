// Textbook chapter: Process Synchronisation.
//
// Full teaching text, written to be learned from directly. Format is the plain-text
// convention renderTheory() understands: ALL-CAPS lines are section headings, "• "
// starts a bullet, "1. " a numbered step, "KEY:" and "GATE TRAP:" make callout
// cards, a lone equation becomes a formula block, and [[FIG:id]] places a figure.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['os-sync'] = {
  figs: [
    {
      id: 'counter-race',
      caption: 'count++ is three machine steps. Interleaved with a concurrent count--, the last store wins and one update is lost.',
      svg: '<svg viewBox="0 0 400 210" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" fill="currentColor"><text x="10" y="16">producer: count++</text><text x="210" y="16">consumer: count--</text></g><g stroke="currentColor" stroke-width="1.4" fill="none"><rect x="10" y="24" width="170" height="24"/><rect x="10" y="52" width="170" height="24"/><rect x="10" y="108" width="170" height="24"/><rect x="210" y="80" width="170" height="24"/><rect x="210" y="136" width="170" height="24"/><rect x="210" y="164" width="170" height="24"/></g><g font-size="10" fill="currentColor"><text x="95" y="40" text-anchor="middle">reg1 = count   (5)</text><text x="95" y="68" text-anchor="middle">reg1 = reg1+1  (6)</text><text x="95" y="124" text-anchor="middle">count = reg1   -&gt; 6</text><text x="295" y="96" text-anchor="middle">reg2 = count   (5)</text><text x="295" y="152" text-anchor="middle">reg2 = reg2-1  (4)</text><text x="295" y="180" text-anchor="middle">count = reg2   -&gt; 4</text></g><g stroke="currentColor" stroke-width="1" stroke-dasharray="3,3"><line x1="180" y1="36" x2="210" y2="92"/><line x1="180" y1="120" x2="210" y2="148"/></g><text x="10" y="200" font-size="10" fill="currentColor">order shown: T0-T5 by row; final count = 4 (the ++ is lost)</text></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

The previous chapter built the process and the thread: independent units of execution, each with its own program counter and stack, that the scheduler moves between Ready and Running. The moment two of them share anything — a variable, a buffer, a file, a counter of how many items are left — the scheduler's freedom to interleave their instructions in any order becomes dangerous. This chapter is about what goes wrong when they share data, and the tools that make sharing safe again.

Everything here rests on one fact: the CPU executes one instruction at a time, but a "line of code" is usually several instructions, and the scheduler can switch between processes at any instruction boundary, not just between lines. Once you take that seriously, races, mutual exclusion, semaphores and monitors all follow as necessary responses to it. The next chapter, deadlock, is what happens when the very tools built here — locks — are used carelessly enough to freeze the system solid, so getting this chapter exactly right is what makes that one make sense.

THE RACE CONDITION

Suppose two threads of the same process share a single global variable, count, currently holding 5. One thread is a producer that has just added an item and runs count++. The other is a consumer that has just removed an item and runs count--. If these ran one after the other, in either order, the net effect is one increment and one decrement, so count should end at 5.

Neither count++ nor count-- is a single indivisible action for the CPU. Neither variable lives in a register permanently; the CPU must load it from memory, change it, and store it back. So count++ becomes:

1. reg1 = count       (read count into a register)
2. reg1 = reg1 + 1    (do the increment in the register)
3. count = reg1       (write the register back to memory)

And count-- becomes the same three steps with a subtraction in the middle:

1. reg2 = count
2. reg2 = reg2 - 1
3. count = reg2

Two different registers are used because these are two different threads, each with its own CPU registers — this is exactly the "private to each thread" list from the previous chapter. count itself is the one thing they share.

If the scheduler runs all three producer steps, then all three consumer steps, the result is correct: count goes 5 → 6 → 5. Run them in the other order and it is also correct: 5 → 4 → 5. The problem is any interleaving in between. Trace one concretely, instruction by instruction, count starting at 5:

[[FIG:counter-race]]

1. T0 — consumer: reg2 = count. reg2 = 5.
2. T1 — producer: reg1 = count. reg1 = 5. (Both registers now hold the same stale 5.)
3. T2 — consumer: reg2 = reg2 - 1. reg2 = 4.
4. T3 — consumer: count = reg2. count is now 4.
5. T4 — producer: reg1 = reg1 + 1. reg1 = 6. (Computed from the stale 5 it read at T1, oblivious to the consumer's write.)
6. T5 — producer: count = reg1. count is now 6.

Final value: 6. The consumer's decrement genuinely happened — count was 4 for an instant — but the producer's later store overwrote it with a value computed before that decrement existed, so the decrement's effect vanished. Swap which one finishes last and you lose the increment instead: run producer's three steps first (reg1=5, reg1=6, count=6), then let the consumer's reg2=count have read the stale 5 before that write — arrange T0 as producer's read, T1 as producer's compute, T2 as consumer's read (still sees 5, before producer's store), T3 producer's store (count=6), T4 consumer's compute (reg2=4), T5 consumer's store (count=4). Final value: 4.

So the same code, the same starting value, the same two operations, can legally end at 4, 5, or 6 depending purely on an interleaving the programmer does not control and the scheduler does not report. This is a race condition: the outcome depends on the relative timing of accesses to shared data. Running the program a thousand times might produce 5 every time and then, once, silently produce 4 — the bug is real on every run, it just is not always triggered.

KEY: A race condition is not "the program is sometimes slow" or "the program sometimes crashes." It is the final value of shared data depending on execution order. The code has no visible error; the danger is entirely in the interleaving.

GATE TRAP: A question may say "count++ executes atomically" as a wrong option to catch you, or ask you to identify which single line is "the problem." There is no single problem line — count++ is not one operation at the hardware level, and the question is really testing whether you know it decomposes into a load, a modify, and a store, any of which can be interrupted by another process's load, modify, or store to the same variable.

THE CRITICAL SECTION AND WHERE THE DANGER LIVES

Call the piece of code that touches shared data the critical section. In the example above, each of "reg = count; reg = reg ± 1; count = reg" is a critical section. The danger is confined to exactly this code — nothing about the rest of the process's code is at risk, because the rest of the process's code does not touch data anyone else can see.

Every process that has a critical section is understood to have the same four-part structure, repeated in a loop:

• Entry section — code that requests permission to enter the critical section. This is where the process announces "I want in" and, if necessary, waits.
• Critical section — the code that touches the shared data.
• Exit section — code that announces "I am done," releasing whatever the entry section acquired.
• Remainder section — everything else the process does, which touches no shared data and is therefore never a hazard.

do {
  entry section
  critical section
  exit section
  remainder section
} while (true);

The whole of process synchronisation is about designing the entry and exit sections so that, no matter how the scheduler interleaves everything, at most one process is ever inside its critical section at once, and so that this scheme does not itself introduce new ways to get stuck.

THE THREE REQUIREMENTS OF A CORRECT SOLUTION

"Works" needs a precise meaning, or you cannot tell a correct entry/exit design from a subtly broken one — and every algorithm in this chapter will be tested against exactly the following three conditions, so understand each one before seeing a single line of entry-section code.

Mutual exclusion. If process Pi is executing in its critical section, then no other process can be executing in its critical section. This is the property everything is ultimately for — it is what makes the race condition traced above impossible: if only one process can be inside the load-modify-store block at a time, the block behaves as if it were a single atomic operation, and the interleavings that produced 4 and 6 above cannot occur.

Progress. If no process is currently executing in its critical section, and some processes wish to enter theirs, then the selection of which one enters next cannot be postponed indefinitely, and — critically — only the processes that are actually trying to enter may take part in that decision. A process sitting in its remainder section, not wanting in at all, must have no say in who goes next. This second half of the definition is easy to skip past and is exactly where the strict-alternation algorithm below fails.

Bounded waiting. There exists a bound, N, on the number of times other processes are allowed to enter their critical sections after a process has requested entry and before that request is granted. Without this, a process could ask to enter and then watch every other process cut in ahead of it forever — technically no single rule was broken, mutual exclusion held throughout, but that process starves. Bounded waiting is what rules out starvation by fiat: the wait must be finite and boundable in advance, not merely "eventually."

REMEMBER: Mutual exclusion is about safety — nothing bad ever happens simultaneously. Progress and bounded waiting are about liveness — something good eventually happens, and happens to everyone, not just to whoever the scheduler favours. A solution can satisfy mutual exclusion perfectly and still be useless if it fails the other two.

Two further assumptions are built into this analysis and worth naming once: each process runs at a nonzero speed but no assumption is made about relative speeds (the algorithm must work whether Pi is a thousand times faster than Pj or vice versa), and only one process is assumed to update any given shared variable at a value-granularity — meaning a write to a single word does not tear.

ATTEMPT ONE: STRICT ALTERNATION BY TURN

The simplest possible idea: keep a shared variable turn, and let a process enter only when it is its turn.

// shared: int turn = 0;
Pi (i is 0 or 1, j is the other):
do {
  while (turn != i) ;     // entry section: busy-wait for your turn
  // critical section
  turn = j;                // exit section: hand the turn to the other
  // remainder section
} while (true);

Mutual exclusion holds: turn can only equal one value at a time, so only one of {while(turn != 0), while(turn != 1)} can ever be false simultaneously — exactly one process's condition can be satisfied at once, so exactly one can be in the critical section.

Bounded waiting also holds, in fact trivially: turn strictly alternates 0, 1, 0, 1, …, so after Pi requests entry, Pj can enter at most once before turn comes back around to i.

Now check progress, and it fails — trace exactly how.

1. turn = 0. P0 enters its critical section (its condition turn != 0 is false).
2. P0 finishes, sets turn = 1 in its exit section, and moves into its remainder section — it does not want to enter again for a while.
3. P1 is deep in a long remainder section of its own — busy with something that has nothing to do with the critical section — and has not reached its entry section yet.
4. P0 finishes its remainder section quickly and wants to enter the critical section again. It checks while (turn != 0) — turn is 1, so this is true, and P0 must wait.
5. P0 keeps waiting, doing nothing useful, for as long as P1's remainder section takes — even though the critical section is completely free and P0 is the only process that wants it.

P0 is blocked by P1, but P1 is not competing for the critical section at all. The decision of who enters next is being controlled by a process that has no interest in entering — precisely what progress forbids. Mutual exclusion and bounded waiting are both intact; the algorithm is simply too rigid, because it hard-codes an alternation that assumes both processes always want to enter equally often, and real processes do not.

GATE TRAP: A very common wrong answer says strict alternation "fails bounded waiting because P0 might starve." It does not starve — the wait above is finite (bounded by P1's remainder section, and once P1 does eventually enter and exit, turn comes straight back to 0). What is violated is progress: a non-competing process gets to dictate the outcome. Get this exactly right; examiners plant this confusion deliberately.

ATTEMPT TWO: FLAG BEFORE CHECK

Turn-based alternation's flaw is that it does not let a process go twice in a row even when the other genuinely doesn't want in. Fix that by tracking desire directly instead of a rigid turn:

// shared: boolean flag[2] = {false, false};
Pi:
do {
  flag[i] = true;        // announce interest
  while (flag[j]) ;       // wait while the other wants in
  // critical section
  flag[i] = false;        // withdraw interest
  // remainder section
} while (true);

This looks more flexible — a process only waits if the other actually wants in. But trace the case where both want in at nearly the same time.

1. T0 — P0 executes flag[0] = true.
2. T1 — P1 executes flag[1] = true, before P0 has had a chance to check anything.
3. T2 — P0 checks while (flag[1]) — flag[1] is true, so P0 enters the loop and busy-waits.
4. T3 — P1 checks while (flag[0]) — flag[0] is true, so P1 also enters the loop and busy-waits.

Both are now spinning on a condition that only the other can clear, and neither will ever clear it — clearing flag[i] happens only after finishing the critical section, which neither can reach. This is a deadlock: both wait forever, and no external event will change it. Mutual exclusion is (vacuously) never violated, since neither ever enters — but that is a cure worse than the disease. This is an even more severe failure of progress than strict alternation's: at least there, one process did eventually get in.

GATE TRAP: Students sometimes call this attempt "almost correct, just needs a small fix." The fix is not small — it needs the write to the shared turn-breaker to happen in a way that resolves exactly this kind of simultaneous-interest tie, which is precisely what Peterson's algorithm adds next.

PETERSON'S ALGORITHM

Combine both ideas: keep each process's flag (its declared interest, which lets a disinterested process step aside instantly, fixing attempt one's flaw) and keep a turn variable, but use turn only as a tie-breaker for the case where both flags are true at once, rather than as the sole gatekeeper.

// shared: boolean flag[2] = {false, false}; int turn;
Pi (j is the other process):
do {
  flag[i] = true;
  turn = j;                          // "after you" — offer the turn to the other
  while (flag[j] && turn == j) ;      // wait only if the other wants in AND it is genuinely its turn
  // critical section
  flag[i] = false;
  // remainder section
} while (true);

Read the entry section as: "I want in. I'll be polite and let you go first if you also want in — but only if you actually are trying." If Pj is not interested (flag[j] is false), Pi's condition is false immediately regardless of turn, and Pi proceeds without waiting at all — this recovers attempt one's flexibility. If both are interested, turn breaks the tie.

Why does turn reliably break the tie? Because both processes write it, but only the LAST write survives — turn is a single shared variable, and whichever assignment executes second overwrites the first. Trace it: suppose P0's turn = 1 executes, then P1's turn = 0 executes afterward, overwriting it. turn now equals 0. P0's condition, while (flag[1] && turn == 1), has turn == 1 false (turn is 0), so P0's condition is false and P0 proceeds immediately. P1's condition, while (flag[0] && turn == 0), has both parts true, so P1 waits. The process whose write to turn survives ends up testing its own most recent write in its own condition and is the one that waits; the process whose write got overwritten finds turn no longer where it left it, and goes straight through.

Now the three properties, proved rather than asserted, because this is the algorithm GATE traces most carefully.

Mutual exclusion. Suppose, for contradiction, that both P0 and P1 are simultaneously inside their critical sections. For each of them to have gotten there, its while condition must have been false at the moment it checked. P0's condition is false only if flag[1] is false or turn != 1; P1's is false only if flag[0] is false or turn != 0. But if both are actually in their critical sections, both must have set their own flag to true (that happens unconditionally, before the while loop) — so flag[0] = flag[1] = true at this point, ruling out the "flag is false" escape for both. So P0 must have escaped via turn != 1, meaning turn = 0, and P1 must have escaped via turn != 0, meaning turn = 1. turn cannot equal both 0 and 1 at once — contradiction. So both cannot be in their critical sections simultaneously. Mutual exclusion holds.

Progress. If Pj is not interested (flag[j] = false, meaning it is in its remainder section or has not yet reached the entry section), Pi's condition is false immediately and Pi proceeds — no non-competing process can block a competing one, unlike strict alternation. If both are competing, turn has a single, determinate value the instant both writes have happened (whichever wrote last), and exactly one process's condition is false — that process enters without needing any further decision or external arbitration. The system never needs to "wait and see"; the outcome is fixed as soon as both entry sections have executed their two assignments.

Bounded waiting. Suppose Pi is waiting (its condition is true: flag[j] is true and turn == j). Pi will get in as soon as either flag[j] becomes false or turn changes away from j. Pj will make flag[j] false when it exits its critical section — freeing Pi immediately if Pj does not immediately try to re-enter. If Pj does try to re-enter right away, its entry section runs turn = i again (Pj always offers the turn to the other process, i), which instantly falsifies Pi's stuck condition (turn == j becomes false). So the moment Pj tries to re-enter, Pi is released — and now Pj's own condition, while (flag[i] && turn == i), is true (flag[i] is still true, since Pi has not withdrawn; turn is i, just written) so Pj must wait for Pi. Pj cannot cut in front of Pi a second time. So Pi waits through at most one more entry by Pj before getting in — a bound of exactly 1.

KEY: Peterson's algorithm satisfies mutual exclusion, progress, and bounded waiting for exactly two processes, with nothing but ordinary loads and stores to two shared variables — no special hardware instruction. This is the single most exam-tested algorithm in the whole topic; know the proof, not just the code.

There is one caveat that the proof above quietly assumes: it assumes memory operations happen in the order the program text shows, and that a write by one process becomes visible to the other before that process proceeds — this is called program order and it is exactly what a uniprocessor executing one instruction stream naively provides. Modern compilers and modern multicore CPUs are allowed to reorder independent-looking memory operations for performance (a compiler may hoist a load above a store it thinks is unrelated; a CPU may let a later write become visible to other cores before an earlier one does), and Peterson's algorithm's correctness proof breaks the instant flag[i] = true and turn = j can be reordered, or the other process's read of flag[i] can be reordered ahead of its own write to turn. On real modern hardware, Peterson's algorithm needs an explicit memory barrier (fence) between those writes, or must be written with the language's atomic/volatile primitives that forbid such reordering, to actually deliver the guarantees just proved. This is why real systems do not use Peterson's algorithm for production locking and instead use the hardware primitives in the next section, which are defined to be atomic and ordered by the hardware itself.

GATE TRAP: "Peterson's algorithm works for any number of processes with the obvious generalisation" is false — the proof above depends on there being exactly one other process j, so that flag[j] and turn == j pin down a single opponent. Extending it to N processes needs a different construction (the bakery algorithm), not a straightforward loop over Peterson's two-process version.

HARDWARE SUPPORT: ATOMIC INSTRUCTIONS

Software-only solutions like Peterson's rely on ordinary reads and writes never being interrupted mid-instruction, and, as just shown, that assumption gets shakier on real modern hardware. The alternative is to ask the hardware itself to provide one instruction that reads and writes a memory location as a single indivisible step no other CPU can interleave with — an atomic instruction. Two are standard.

test_and_set(target) atomically does this (shown as pseudocode; the point is that the whole function executes without any other processor's access to *target interleaving inside it):

boolean test_and_set(boolean *target) {
  boolean rv = *target;
  *target = true;
  return rv;
}

Build a lock directly from it. Shared lock starts false.

acquire: while (test_and_set(&lock)) ;   // spins if it got back "true" (already locked)
... critical section ...
release: lock = false;

Mutual exclusion holds because test_and_set is atomic: whichever process's call happens to execute first sees the old value (false), flips lock to true, and gets back false — so its while condition is false and it proceeds. Every process that calls test_and_set after that sees lock already true, gets back true, and spins. Only one process can ever be the one that made the false-to-true transition at a time, because the read-and-set happens as one hardware step.

But this simple TAS lock fails bounded waiting. When the lock is released (lock = false), every process currently spinning in its while loop is racing to call test_and_set again, and which one the hardware happens to schedule next is entirely up to the scheduler — there is nothing in the algorithm that gives priority to whoever has been waiting longest. In principle the scheduler could always pick the most recently arrived spinner, and a process that has been waiting since the very first release could be passed over indefinitely. No bound exists on how many times other processes cut in ahead of it. This is exactly the gap bounded waiting exists to close, and the simple TAS lock does not close it.

compare_and_swap(value, expected, new_val) is the second standard primitive, atomically:

int compare_and_swap(int *value, int expected, int new_val) {
  int temp = *value;
  if (*value == expected) *value = new_val;
  return temp;
}

A lock from CAS looks like: while (compare_and_swap(&lock, 0, 1) != 0) ; to acquire, lock = 0; to release. It has exactly the same bounded-waiting gap as the TAS lock, for the same reason: the hardware guarantees atomicity of each single call, not fairness across many competing calls.

THE WAITING-ARRAY FIX FOR BOUNDED WAITING

The fix is to stop letting the released lock go up for grabs and instead hand it explicitly to a specific next process, in a fixed order, so that no one can be skipped more than once around. Shared state: a boolean waiting[n], all initially false, and lock, initially false.

// process i, out of n processes numbered 0..n-1
do {
  waiting[i] = true;
  key = true;
  while (waiting[i] && key)
    key = test_and_set(&lock);
  waiting[i] = false;
  // critical section
  j = (i + 1) % n;
  while (j != i && !waiting[j])
    j = (j + 1) % n;
  if (j == i)
    lock = false;
  else
    waiting[j] = false;
  // remainder section
} while (true);

Read the exit section: on leaving the critical section, process i scans the other processes in a fixed round-robin order starting just after itself, looking for the first one that is currently marked waiting. If it finds one, it does not release the lock at all — it directly clears that process's waiting flag, which is exactly what lets that process's while (waiting[j] && key) loop terminate (waiting[j] is now false). If nobody is waiting, it genuinely frees the lock for the next arrival. Because the scan always starts at i+1 and goes around in the same fixed order, a process can be skipped by every other waiting process at most once before the scan reaches it — giving a bound of n − 1, satisfying bounded waiting.

KEY: test_and_set and compare_and_swap solve mutual exclusion trivially, by hardware fiat. They do not solve bounded waiting by themselves — that needs the extra bookkeeping of the waiting array, which turns "whoever grabs it next" into "the next one in line."

MUTEX LOCKS, SPINLOCKS AND WHEN SPINNING IS ACCEPTABLE

The simplest usable synchronisation tool built from any of the above is a mutex lock: acquire() and release(), used to bracket a critical section, with the guarantee that acquire() does not return until the lock is free and taken. A lock whose acquire() busy-waits (spins in a loop re-testing the lock, exactly like the TAS lock above) is called a spinlock.

Busy waiting wastes CPU cycles — the spinning process is scheduled and running, consuming a core, while doing no useful work. On a single-CPU system, this is close to indefensible for anything but the briefest of waits: the process holding the lock cannot even run to release it while the spinning process monopolises the one CPU, unless the spinner is preempted. On a multiprocessor system the calculation changes: the lock holder is very likely running right now on a different core, actively making progress toward releasing the lock, so a short spin can finish faster than the alternative of blocking (which costs two context switches — one to put the waiter to sleep, one to wake it later — each substantially more expensive than a few spins).

REMEMBER: Spinning is a reasonable choice exactly when the expected wait is shorter than the cost of two context switches and the system has enough CPUs that the lock holder is actually running elsewhere. It is a bad choice when critical sections are long or the system is a single CPU with many contenders — there, blocking (removing the waiter from the CPU entirely until woken) wastes far less.

SEMAPHORES

A semaphore generalises the lock idea into an integer variable, S, manipulated only by two operations that must themselves be atomic — no process may see S mid-update.

wait(S)   { S--; if (S < 0) { block; } }
signal(S) { S++; if (S <= 0) { wake one blocked process; } }

(wait is also written P() or down(); signal is also written V() or up().) Writing wait as "decrement, then check" rather than "check, then decrement" matters: the whole function body must execute as one atomic unit (via a hardware instruction or by disabling interrupts briefly), otherwise two processes could both see S positive, both decide to proceed, and mutual exclusion breaks exactly the way count++ did at the start of the chapter. The atomicity requirement is on wait and signal themselves, not on what happens inside the critical section they guard.

A binary semaphore can only ever hold the values 0 and 1, and is used exactly like a mutex: 1 means free, 0 means held, and at most one wait() can succeed before a matching signal(). A counting semaphore can range more widely and is used either to track how many identical instances of a resource remain (initial value = number of instances) or to enforce an ordering between processes (initial value 0, so a wait() blocks until some other process signals that the awaited event has happened).

What does a negative value of S mean? Track it through the decrement rule: wait() always decrements first. If S is currently 0 (meaning "no spare instances, but nobody is queued") and a process calls wait(), S becomes −1, and since that is negative, the caller blocks. A second caller pushes S to −2 and also blocks. The magnitude of a negative S is precisely the number of processes currently blocked on it — a useful cross-check on any semaphore trace: if you compute S = −3, exactly 3 processes should be sitting on that semaphore's queue, no more, no fewer.

Why does the initial value matter so much? Because it is the only free parameter — get it wrong and the semaphore either lets in too many processes (unsafe) or blocks the very first legitimate caller (deadlock from the first instruction). A binary mutex semaphore always starts at 1: the resource — permission to be in the critical section — has exactly one "instance" available at the start, nobody holding it yet. A counting semaphore guarding k identical resource instances starts at k, so exactly the first k callers proceed without blocking, matching the k instances physically available. A semaphore used purely to sequence two events (force B to happen only after A) starts at 0, because at the beginning A has not happened yet, so anyone waiting for it must block until the first signal.

THE BLOCK/WAKEUP IMPLEMENTATION AND ITS QUEUE

The wait/signal pseudocode above described the behaviour but glossed over "block" and "wake." Underneath, an OS-level semaphore is a small structure:

typedef struct {
  int value;
  struct process *list;   // the queue of PCBs blocked on this semaphore
} semaphore;

wait(semaphore *S) {
  S->value--;
  if (S->value < 0) {
    add this process's PCB to S->list;
    block();               // remove this process from Running, park it
  }
}

signal(semaphore *S) {
  S->value++;
  if (S->value <= 0) {
    remove a process P from S->list;
    wakeup(P);              // move P to the Ready queue
  }
}

block() and wakeup() are the exact Running → Waiting and Waiting → Ready transitions from the previous chapter's process-state diagram — a blocked process is not spinning, it consumes no CPU at all until woken. This is the alternative to busy-waiting, and it is what real operating-system semaphores use for anything but the shortest waits: the cost is the two context switches noted above, paid only when a wait actually blocks, rather than continuous CPU burn while waiting.

[[FIG:critical-section-turns]]

Trace a short worked sequence to fix all of this. Binary semaphore S starts at 1. P1 calls wait(S): S becomes 0 (not negative), P1 proceeds into its critical section. P2 calls wait(S): S becomes −1 (negative), P2 blocks and is added to S's queue. P1 finishes and calls signal(S): S becomes 0; since the pre-increment value (−1) was negative, one process — P2 — is removed from the queue and woken. P2 now runs its critical section. Final state: S = 0, P2 released and running, queue empty.

GATE TRAP: A frequent wrong step in these traces is to stop decrementing once you think a process "should" block, or to increment signal() by more than 1. Every wait() decrements by exactly 1, unconditionally — whether the caller ends up blocking or not — and every signal() increments by exactly 1, waking at most one process. Trace every single call in order; do not shortcut by assuming the sequence balances.

THE BOUNDED-BUFFER (PRODUCER-CONSUMER) PROBLEM

This is the same producer/consumer relationship from the counter example, now made fully concurrency-safe with semaphores, and it is the problem that shows why one mutex alone is not enough.

A shared circular buffer holds up to N items. Guarding it with a single mutex would stop two processes touching the buffer array simultaneously, but it does nothing to stop a producer inserting into an already-full buffer, or a consumer removing from an already-empty one — mutex only knows about "is anyone else inside," not "is there room" or "is there anything to take." Two more semaphores are needed to track those counts:

• mutex (binary, initial 1) — guards the buffer during a single insert or remove.
• empty (counting, initial N) — counts free slots; every insertion must first claim one.
• full (counting, initial 0) — counts filled slots; every removal must first claim one.

semaphore mutex = 1, empty = N, full = 0;

producer:                          consumer:
do {                                do {
  ... produce an item ...             wait(full);
  wait(empty);                        wait(mutex);
  wait(mutex);                        ... remove an item from buffer ...
  ... add item to buffer ...          signal(mutex);
  signal(mutex);                      signal(empty);
  signal(full);                       ... consume the item ...
} while (true);                     } while (true);

[[FIG:producer-consumer]]

Trace it starting empty = 5, full = 0, mutex = 1 (capacity 5). Three insertions happen, each doing wait(empty) then wait(mutex)...signal(mutex) then signal(full): after three, empty = 5 − 3 = 2 and full = 0 + 3 = 3 (mutex returns to 1 after each, since each insertion's signal(mutex) always follows its own wait(mutex)). One removal then runs wait(full)...signal(empty): full = 3 − 1 = 2, empty = 2 + 1 = 3. Final: empty = 3, full = 2. Check: empty + full = 5 = capacity, which must always hold whenever no operation is mid-flight — a standing sanity check on any bounded-buffer trace.

Why must the resource semaphore's wait() come before the mutex's wait() in each participant, and not the other way round? Trace the reversed order to see the failure directly. Suppose a producer instead did wait(mutex) then wait(empty). Start with the buffer completely full: empty = 0, full = N, mutex = 1.

1. Producer1 calls wait(mutex): mutex goes 1 → 0, Producer1 acquires it.
2. Producer1 calls wait(empty): empty is 0, so it goes to −1, and Producer1 blocks — while still holding mutex, because it never got to signal(mutex); that comes later in its code.
3. A consumer arrives to remove an item (which would eventually signal(empty) and free Producer1). It calls wait(full): full is N, so it proceeds. It then calls wait(mutex): mutex is 0 (held by the blocked producer), so it goes to −1 and the consumer blocks too.
4. Now Producer1 is waiting for empty, which only a consumer's signal(empty) — issued after that consumer removes an item — can provide. But the consumer cannot even reach its removal code: it is blocked on mutex, which only Producer1's eventual signal(mutex) can release. Neither can proceed. This is a deadlock, caused entirely by swapping the order of two wait() calls.

GATE TRAP: "Spot the synchronisation bug" questions on the bounded buffer overwhelmingly plant exactly this swap — wait(mutex) before wait(empty), or wait(mutex) before wait(full) — because it looks harmless (both semaphores get waited on eventually) but produces exactly the circular wait traced above. Always check: does the resource-counting semaphore get waited on strictly before the mutex, in every participant?

THE READERS-WRITERS PROBLEM

A different sharing pattern: some processes only read shared data (many readers can safely do this at once — reading never corrupts anything) while others write it (a writer needs the data entirely to itself, with no reader and no other writer present, since a read overlapping with an in-progress write can see a half-updated value exactly like the counter race at the start of the chapter).

The first readers-writers problem states the requirement as: no reader should be made to wait unless a writer has already obtained access. This effectively gives readers priority — readers do not defer to a writer that is merely waiting, only to one already inside.

semaphore mutex = 1;   // protects readcount only
semaphore wrt = 1;      // the actual reader/writer exclusive lock
int readcount = 0;

writer:                              reader:
do {                                  do {
  wait(wrt);                            wait(mutex);
  ... write ...                         readcount++;
  signal(wrt);                          if (readcount == 1) wait(wrt);
} while (true);                         signal(mutex);
                                        ... read ...
                                        wait(mutex);
                                        readcount--;
                                        if (readcount == 0) signal(wrt);
                                        signal(mutex);
                                      } while (true);

The first reader to arrive (readcount goes 0 → 1) locks out writers by acquiring wrt on everyone's behalf; later readers just increment readcount and proceed, since wrt is already held. The last reader to leave (readcount goes 1 → 0) releases wrt. readcount itself is shared data read and written by every reader, so it needs its own mutex — this is exactly the "does the reader-count variable have its own protecting mutex" check flagged for these problems.

Trace why a writer can starve here. R1 arrives: readcount 0→1, acquires wrt. R2 arrives while R1 is still reading: readcount 1→2, no need to touch wrt (already held). A writer now arrives and calls wait(wrt) — blocks, since wrt is held. R1 finishes: readcount 2→1; wrt stays held since readcount is not 0. Before R1 or R2 leave entirely, R3 arrives and starts reading: readcount stays above 0. As long as some reader is present, or a new one keeps arriving before the count reaches zero, wrt is never released to the waiting writer — the writer can be postponed indefinitely by a continuous stream of readers, none of which individually did anything wrong.

The second readers-writers problem fixes this by giving writers priority instead: once a writer is waiting, no new reader may start, though readers already in progress may finish. Add a gate semaphore that a writer grabs first:

semaphore mutex = 1, wrt = 1, readTry = 1;
int readcount = 0;

writer:                              reader:
do {                                  do {
  wait(readTry);                        wait(readTry);
  wait(wrt);                             wait(mutex);
  ... write ...                          readcount++;
  signal(wrt);                           if (readcount == 1) wait(wrt);
  signal(readTry);                       signal(mutex);
} while (true);                          signal(readTry);
                                         ... read ...
                                         wait(mutex);
                                         readcount--;
                                         if (readcount == 0) signal(wrt);
                                         signal(mutex);
                                       } while (true);

A writer grabs readTry before even trying for wrt, so any reader that arrives after that point blocks on wait(readTry) and cannot start — it must wait until the writer has released readTry, which happens right after the writer gets and releases wrt. Readers who got past readTry before the writer arrived can still finish normally. This solves writer starvation but reopens the opposite risk: if writers keep arriving back-to-back, a waiting reader can now be perpetually pushed behind them — readers can starve instead.

KEY: Neither readers-writers solution is starvation-free for everyone; each simply chooses who is allowed to starve. "First" problem favours readers (writer may starve); "second" favours writers (readers may starve). A question asking "which process can starve" is asking you to identify which variant is in front of you.

THE DINING PHILOSOPHERS PROBLEM

Five philosophers sit at a circular table with one fork between each adjacent pair (five forks total). Each philosopher alternately thinks and eats; to eat, a philosopher needs both forks adjacent to them — left and right — and must put both down before thinking again. This models any situation where a process needs several shared resources simultaneously and each resource is shared with only some of the other processes, not all of them.

Each fork is a binary semaphore (1 = available, 0 = in use). The naive symmetric solution has every philosopher pick up the left fork, then the right:

semaphore fork[5] = {1,1,1,1,1};
philosopher i:
do {
  wait(fork[i]);            // pick up left fork
  wait(fork[(i+1) % 5]);     // pick up right fork
  ... eat ...
  signal(fork[i]);
  signal(fork[(i+1) % 5]);
  ... think ...
} while (true);

[[FIG:dining-philosophers]]

Trace the deadlock. Suppose the scheduler interleaves all five philosophers' first wait() calls before any of their second: philosopher 0 executes wait(fork[0]), then philosopher 1 executes wait(fork[1]), then philosopher 2 executes wait(fork[2]), and so on through philosopher 4 executing wait(fork[4]). Every fork is now held — by exactly the philosopher to its own left. Each philosopher now tries wait(fork[(i+1) % 5]) for their right fork, which is fork number i+1 — precisely the fork that philosopher i+1 is holding as their own left fork. Every single philosopher blocks on this second wait, and none of them can ever reach the signal() calls that would release a fork, because the code never reaches past the second wait. This is a full circular wait: philosopher 0 waits on the fork held by philosopher 1, who waits on the fork held by philosopher 2, …, who waits on the fork held by philosopher 0. Every one of the five must be holding exactly one fork for this to lock the whole table — if even one philosopher had not yet picked up any fork, they could simply pick up both (if free) and eat, breaking the cycle, or they are simply not part of the circular wait at all.

GATE TRAP: A question describing only 3 of 5 philosophers holding a fork and asking "has this system deadlocked" should be answered no — a subset holding forks proves nothing by itself; deadlock requires every philosopher in the whole cycle to be stuck, which for the standard symmetric arrangement means all N holding one fork and waiting on the next.

Three standard fixes, each breaking the circular-wait condition a different way:

1. Allow at most N − 1 philosophers to sit down at the table simultaneously. With only 4 of 5 seats occupied, at least one fork is never claimed as anyone's "left," so the philosopher next to that free fork can always get both of theirs — the cycle cannot close all the way round.

2. Break the symmetry: have one specific philosopher (say, the last one) pick up forks in the opposite order — right fork first, then left — while everyone else still does left-then-right. Now that one philosopher competes for the SAME fork first that their neighbour also wants first, rather than every philosopher's "first fork" being a different fork around the circle, so the neat everyone-holds-one-and-waits-for-the-next pattern cannot form uniformly.

3. Impose a global ordering on the forks (number them, and require every philosopher to always pick up the lower-numbered fork of their two before the higher-numbered one) or use a single controlling mutex that a philosopher must hold to attempt picking up either fork at all, effectively serialising the act of acquiring both forks so no one can be left holding one while waiting on another.

MONITORS AND CONDITION VARIABLES

Semaphores are powerful but unforgiving: a single misplaced wait() or signal(), or one omitted entirely, silently breaks the whole scheme, and the compiler cannot help because a semaphore is just an integer with no idea what it is meant to protect. A monitor is a higher-level construct — a module (an abstract data type) whose procedures are automatically mutually exclusive: at most one process can be executing any procedure of a given monitor at a time, enforced by the language or runtime itself, not hand-written by the programmer.

Mutual exclusion alone is not enough — sometimes a process inside the monitor discovers it cannot proceed yet (the buffer is empty, say) and needs to wait for another process to change something, without holding up everyone else forever. Monitors provide condition variables for exactly this: for a condition variable x, x.wait() suspends the calling process and, critically, temporarily gives up the monitor's mutual exclusion so someone else can get in and change things; x.signal() resumes one process waiting on x, if any (and does nothing if none are waiting — unlike a semaphore's signal(), it does not "remember" the signal for a later waiter).

What happens at the instant x.signal() is called, when both the signaller and the just-woken process want to be inside the same mutually-exclusive monitor? Two disciplines answer this differently.

Hoare monitors use signal-and-wait: the signalling process immediately suspends and hands control straight to the just-woken process, which runs immediately and is guaranteed the condition it waited for is still exactly as the signaller left it, since nothing else could have run in between. This lets code check the condition with a plain if before waiting, because a fresh check is guaranteed valid on waking.

Mesa monitors use signal-and-continue: the signalling process keeps running and finishes its own turn in the monitor first; the just-woken process is merely moved back to being eligible to re-acquire the monitor, and must compete for entry like anyone else once the signaller (and possibly other processes that got in first) are done. By the time it actually gets back in, some other process may already have run and changed the very condition it was told was true — the buffer that had a free slot when signalled may be full again by the time this process resumes.

REMEMBER: Because Mesa-style semantics do not guarantee the condition still holds by the time a woken process resumes, every wait must be inside a while loop that re-checks the condition, never inside a plain if: while (!condition) x.wait();. Most real systems — Java's wait()/notify(), POSIX pthread condition variables — use Mesa semantics, which is exactly why idiomatic code in both always wraps a condition wait in a while loop, not an if. Writing if instead of while is a correctness bug waiting for the specific interleaving that exposes it, and that interleaving might not show up for a very long time.

PRIORITY INVERSION AND PRIORITY INHERITANCE

Locks interact with priority scheduling in a way that can look paradoxical: a high-priority process can be blocked by a low-priority one even though the scheduler is supposed to always prefer the high-priority process. Suppose a low-priority process L holds a lock a high-priority process H needs. H blocks, waiting for L to finish and release it. So far this is unavoidable and not itself a bug — H simply has to wait for the lock. The problem appears if a third, medium-priority process M, which needs no lock at all, becomes ready while L holds it: the scheduler, following ordinary priority rules, preempts L in favour of M, since M outranks L. Now H — the highest-priority process of the three — is stuck waiting, not for the process that actually holds the resource it needs, but indirectly for an unrelated medium-priority process that has nothing to do with the lock. This is priority inversion: a high-priority process is effectively blocked by a lower-priority one that has no direct claim on it at all, for as long as M keeps running.

The standard fix is priority inheritance: while L holds a lock that H is waiting for, L is temporarily given H's priority, so M can no longer preempt it. L finishes quickly (at H's elevated priority), releases the lock, reverts to its own priority, and H proceeds. The inversion is bounded to however long L's critical section actually takes, rather than however long M feels like running.

NASA's Mars Pathfinder rover suffered exactly this bug in 1997: a low-priority meteorological task held a mutex that a high-priority bus-management task needed, a medium-priority task kept preempting the low-priority one, and the resulting delay tripped a watchdog timer that reset the whole spacecraft. The fix, uplinked to Mars after the fact, was to enable priority inheritance on that mutex.

DEADLOCK VERSUS STARVATION

Two words this chapter has used carefully and that are easy to blur together, so state the difference precisely once both have appeared in worked examples. Deadlock is a set of two or more processes each waiting for a resource held by another process in the same set, forming a cycle, such that none of them can ever proceed without outside intervention — the dining philosophers trace above and the reversed bounded-buffer wait() order both produced genuine deadlocks: every process involved is permanently stuck, and nothing that happens elsewhere in the system will free them. Starvation (indefinite postponement) is different: a process is repeatedly denied a resource that does, in principle, become available — there is no cycle, and the resource genuinely gets freed and reassigned, just never to this particular process, because a scheduling policy (or plain bad luck) keeps favouring others. The starving writer in the first readers-writers problem is never part of a cycle — readers keep finishing and the lock keeps becoming free — it is simply never this writer's turn, because the policy always lets the next arriving reader in first. Deadlock is a structural, permanent dead end; starvation is a live system that is simply unfair to one participant. The next chapter is entirely about deadlock: the four conditions that must hold simultaneously for it to be possible, and the three families of strategies — prevention, avoidance, detection-and-recovery — for dealing with it.

ANALYSING A SEMAPHORE PROGRAM

Given an unfamiliar snippet of semaphore code, four questions recur, and each has a mechanical way to answer it. Ask them in this order.

1. What values can each semaphore take? Start from its initial value and walk every wait() (−1) and signal() (+1) that can execute on it, in the orders the problem allows; the reachable range tells you everything else.

2. What is the maximum number of processes ever inside the critical section at once? For a properly guarded section, this is bounded by how far a mutex-like semaphore can be driven down before something blocks — a mutex correctly initialised to 1 permits at most 1; a semaphore mischievously initialised to 2 protecting a critical section permits up to 2 to be inside simultaneously, because two wait() calls can both succeed (2 → 1 → 0) before either signals.

3. Can it violate mutual exclusion? Directly follows from question 2: if more than one process can simultaneously hold the "permission" semaphore below the threshold that should exclude others, mutual exclusion is violated. A mutex initialised to 2 instead of 1, guarding a section meant for only one process at a time, violates mutual exclusion even though every wait/signal pair is individually correct — the bug is purely in the initial value.

4. Can it deadlock? Look for a cycle: does any process hold semaphore A (via a completed wait(A) with no matching signal(A) yet) while blocked on wait(B), and does some other process hold B while blocked on wait(A)? The reversed-order bounded-buffer trace earlier in this chapter is the canonical instance — a producer holding mutex while blocked on empty, and a consumer holding full's slot but blocked on that same mutex.

Apply all four to the mutex-initialised-to-2 example directly: values mutex can take, starting at 2, are 2, 1, 0, and then negative for each additional blocked caller beyond the second — so 2, 1, 0, −1, −2, …. Maximum concurrently inside the critical section is 2, since two wait(mutex) calls succeed (2→1, then 1→0) before a third would block. It does violate mutual exclusion, precisely because it permits 2 rather than 1. It does not deadlock on its own — every process that gets in still eventually calls signal(mutex) and moves on — the bug is a safety violation (mutual exclusion), not a liveness one (deadlock).

WORKED PROBLEMS

1. Shared int count starts at 5. A producer thread runs count++ (load, increment, store) and a consumer thread runs count-- (load, decrement, store) concurrently, with no synchronisation. List every value count could hold after both have finished.
   If the operations do not interleave (either completes fully before the other starts), the net effect is +1 and −1 applied in sequence, giving 5 in either order. If they interleave so that one thread's store overwrites the other's stale-based store, the overwritten operation's effect is lost: tracing the schedule where the consumer's store happens first and the producer's later store is based on a read taken before the consumer's write gives a final value of 6 (the decrement is lost); tracing the mirror schedule gives 4 (the increment is lost). No other value is reachable, because each thread performs exactly one net change and the only failure mode is one of the two changes being silently discarded. Answer: {4, 5, 6}.

2. A two-process algorithm uses a single shared variable turn and the entry section while (turn != i); with the exit section setting turn = j. Check it against all three critical-section requirements.
   Mutual exclusion: holds — turn has one value at a time, so at most one process's while condition can be false at once. Progress: fails — trace P0 entering and exiting (setting turn = 1) while P1 is in a long remainder section not wanting to enter; P0 finishes its remainder quickly and wants back in, but while (turn != 0) is true (turn is 1) and stays true until P1, who has no interest in entering, eventually does so — a non-competing process is controlling a competing one's access. Bounded waiting: holds — turn strictly alternates, so P0 waits through at most one entry by P1.

3. A binary semaphore S starts at 1. In order: P1 calls wait(S); P2 calls wait(S); P3 calls wait(S); P1 calls signal(S); P2's status?
   S: 1 → 0 (P1 proceeds) → −1 (P2 blocks) → −2 (P3 blocks) → −1 (P1's signal releases one blocked process — by FIFO convention, whichever was queued first, P2). After this sequence S = −1 (one process, P3, still blocked) and P2 has been woken and is proceeding; P3 remains blocked until another signal(S).

4. A bounded buffer has capacity 8. Semaphores start empty = 8, full = 0, mutex = 1. Five producer insertions occur, then two consumer removals. Give the final values of empty and full.
   Each insertion: empty−1, full+1. After 5: empty = 8 − 5 = 3, full = 0 + 5 = 5. Each removal: full−1, empty+1. After 2: full = 5 − 2 = 3, empty = 3 + 2 = 5. Final: empty = 5, full = 3. Check: 5 + 3 = 8 = capacity. Correct.

5. In the first readers-writers problem (reader priority), a writer has been waiting for wrt since before any of the current readers arrived. Readers keep arriving one after another, each starting to read before the previous one finishes. Does the writer ever get in, and why?
   Not while this pattern continues. wrt is released only when readcount returns to 0 (the last reader leaves), but a new reader keeps arriving and incrementing readcount before it reaches 0, so the count never actually hits zero. The writer is not part of any cycle — the lock does become notionally available in principle — it is simply starved by an unbroken chain of readers, which is exactly the reader-priority behaviour this variant is defined to have.

6. Five dining philosophers use the naive symmetric fork-acquisition algorithm. At a given instant, philosophers 0, 1, and 2 each hold their left fork and are blocked waiting for their right fork; philosophers 3 and 4 have not yet attempted to pick up any fork. Has the system deadlocked?
   No. Deadlock in this arrangement requires every one of the five to be stuck holding one fork and waiting on the next, forming a complete circular wait. Philosopher 2 is blocked waiting for fork 3 — its right fork, indexed (2+1) % 5 — and fork 3 is philosopher 3's left fork. Since philosopher 3 has not attempted to pick up anything yet, fork 3 is still free, so philosopher 2 can take it right now and eat. The chain is not closed: philosophers 3 and 4, who have not joined the wait at all, leave at least one fork uncontested, and that is enough to let the process ahead of them proceed. A strict subset holding forks is never sufficient to prove deadlock — you must check whether every fork anyone is waiting on is actually held by someone else who is, in turn, also stuck.

7. A lock is implemented purely with test_and_set as: while (test_and_set(&lock)) ; to acquire, lock = false to release, with no waiting array. Four processes are spinning when the lock is released. Can bounded waiting be guaranteed?
   No. The instant lock becomes false, all four spinning processes' next test_and_set call race to be the one that flips it back to true; the hardware and scheduler decide who wins with no reference to how long anyone has already waited. In the worst case, the same process could lose that race every single time the lock is released, with no upper bound on how many times the other three collectively cut in front of it — bounded waiting requires an explicit mechanism such as the waiting-array construction to hand the lock to a specific next process rather than leaving it open to whoever calls test_and_set fastest.

8. A monitor's producer-consumer implementation uses condition variables notFull and notEmpty, and the consumer's wait is written as: if (count == 0) wait(notEmpty); rather than a while loop. The monitor uses Mesa (signal-and-continue) semantics. Explain the bug this creates, if any.
   This is a bug under Mesa semantics. Because signal-and-continue does not hand control immediately to the woken process, some other process may run and change count back to 0 between the signal and this consumer actually resuming — for instance, another consumer that also woke up (or entered fresh) could drain the one item first. The if only checks the condition once, before waiting; on waking it proceeds straight into removing an item without rechecking, and can attempt to remove from an empty buffer. Under Hoare (signal-and-wait) semantics this would be safe, since the signaller suspends immediately and nothing can intervene — but it is not safe here. The fix is while (count == 0) wait(notEmpty);, rechecking the condition every time control returns.

9. A critical section is guarded by a semaphore mutex initialised to 3 by mistake (intended to be 1). What is the maximum number of processes that can simultaneously be inside the critical section, and does this violate mutual exclusion?
   Three successive wait(mutex) calls succeed without blocking (3 → 2 → 1 → 0), so up to 3 processes can be inside the critical section at the same time before a fourth would block. Yes, this violates mutual exclusion — the requirement is that at most one process is ever inside — and the violation stems entirely from the wrong initial value, not from any error in where the wait/signal calls are placed.

WHAT TO CARRY INTO THE NEXT CHAPTER

Locks solve races by making processes wait for each other, and waiting is exactly the ingredient a new failure mode needs: if the waiting itself forms a cycle, mutual exclusion is preserved perfectly and nothing ever gets corrupted — but nothing ever finishes either. The next chapter is about deadlock: the four conditions that must all hold at once for a cycle of this kind to be possible, how to design a system so at least one of them can never arise, how to detect a cycle that has already formed, and how to recover from it. Everything you now know about wait(), signal(), and holding one resource while asking for another is the raw material that chapter reasons about formally.
`
};
