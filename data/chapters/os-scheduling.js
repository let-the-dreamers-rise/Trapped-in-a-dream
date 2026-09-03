// Textbook chapter: CPU Scheduling.
//
// Full teaching text, in the format renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — either one defined below or one already attached
// to this topic in data/questions/os.js (gantt-fcfs-sjf, rr-quantum).

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['os-scheduling'] = {
  figs: [
    {
      id: 'srtf-gantt',
      caption: 'SRTF trace of P1(0,5), P2(1,3), P3(2,8), P4(3,6). P1 is preempted at t=1 by the shorter P2, and resumes at t=4 once nothing shorter remains ready.',
      svg: '<svg viewBox="0 0 300 110" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SRTF Gantt chart"><g stroke="currentColor" stroke-width="1.4" fill="none"><rect x="20" y="20" width="8" height="24"/><rect x="28" y="20" width="24" height="24"/><rect x="52" y="20" width="32" height="24"/><rect x="84" y="20" width="48" height="24"/><rect x="132" y="20" width="64" height="24"/></g><g font-size="8" fill="currentColor" text-anchor="middle"><text x="24" y="60">P1</text><text x="40" y="60">P2</text><text x="68" y="60">P1</text><text x="108" y="60">P4</text><text x="164" y="60">P3</text></g><g stroke="currentColor" stroke-width="1" fill="none"><line x1="20" y1="44" x2="20" y2="50"/><line x1="28" y1="44" x2="28" y2="50"/><line x1="52" y1="44" x2="52" y2="50"/><line x1="84" y1="44" x2="84" y2="50"/><line x1="132" y1="44" x2="132" y2="50"/><line x1="196" y1="44" x2="196" y2="50"/></g><g font-size="9" fill="currentColor" text-anchor="middle"><text x="20" y="78">0</text><text x="28" y="78">1</text><text x="52" y="78">4</text><text x="84" y="78">8</text><text x="132" y="78">14</text><text x="196" y="78">22</text></g><text x="20" y="98" font-size="9" fill="currentColor">preempt at t=1, resume P1 at t=4 once P2 finishes</text></svg>'
    },
    {
      id: 'mlfq-ladder',
      caption: 'A three-level MLFQ. A process falls one level every time it uses its whole quantum without finishing; the bottom level runs FCFS to completion.',
      svg: '<svg viewBox="0 0 360 210" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Multilevel feedback queue ladder"><defs><marker id="ah-mlfq" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.4" fill="none"><rect x="20" y="10" width="320" height="36"/><rect x="20" y="86" width="320" height="36"/><rect x="20" y="162" width="320" height="36"/><line x1="180" y1="46" x2="180" y2="82" marker-end="url(#ah-mlfq)"/><line x1="180" y1="122" x2="180" y2="158" marker-end="url(#ah-mlfq)"/></g><g font-size="11" fill="currentColor"><text x="30" y="32">Q0 — quantum 4 (highest priority)</text><text x="30" y="108">Q1 — quantum 8</text><text x="30" y="184">Q2 — FCFS, runs to completion</text></g><g font-size="9" fill="currentColor" text-anchor="middle"><text x="230" y="66">quantum used up, work remains → demote</text><text x="230" y="142">quantum used up, work remains → demote</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

The last chapter established that a process spends most of its life sitting in the ready queue, wanting a CPU it does not have. This chapter is about the module that decides, at every instant, which of the waiting processes gets it: the CPU scheduler. Everything here follows from one fact — there are more processes wanting the CPU than there are CPUs — and the algorithms are different answers to the question "given several processes ready to run, and only one (or a few) processors, in what order do we run them?"

Get this right and the rest of the operating system feels purposeful: interactive systems stay responsive, batch systems finish more work per hour, and no process is starved forever. Get it wrong and you can build a system where the CPU is idle half the time despite a full ready queue, or where a single process hogs the machine while ten others wait. Once scheduling is solid, the next chapter's problem — processes and threads that share data safely while all of this reordering is happening underneath them — has a floor to stand on.

THE CPU–I/O BURST CYCLE

Before asking how to schedule processes, ask what a process's demand for the CPU actually looks like over time, because every scheduling algorithm is built around this shape.

Trace any process's execution and it alternates between two kinds of activity. It computes for a while — adds numbers, moves data, evaluates a condition — using only the CPU. This is a CPU burst. Then it needs something from outside itself: it reads a file, waits for a keystroke, sends a network packet. It cannot proceed until that finishes, so it gives up the CPU and enters an I/O burst. When the I/O completes, it goes back to computing: another CPU burst. A process's life, from the scheduler's point of view, is just this sequence — CPU burst, I/O burst, CPU burst, I/O burst — ending in a final CPU burst and termination.

Measure the lengths of these CPU bursts across many programs and a consistent pattern shows up: there are a huge number of short bursts and a small number of long ones. A text editor waiting on your next keystroke has CPU bursts of a few milliseconds between each character; a scientific simulation crunching a matrix has bursts of seconds. Plot burst length against frequency and you get a curve that falls off fast — many short, few long. This single empirical fact is the reason several scheduling ideas below work: favouring short bursts (as SJF and Round Robin's small quantum both do, in different ways) helps the overwhelming majority of bursts without much hurting the rare long one.

This also gives the vocabulary for classifying processes. An I/O-bound process has many short CPU bursts separated by I/O waits — it spends most of its life waiting, not computing. A CPU-bound process has few, long CPU bursts — it spends most of its life computing. A good process mix, which the long-term scheduler from the last chapter is responsible for, keeps both the CPU and the I/O devices busy: all I/O-bound processes and the CPU sits idle waiting for disks; all CPU-bound and the disks sit idle waiting for the CPU.

KEY: A process's demand on the CPU is a sequence of CPU bursts separated by I/O bursts. CPU-scheduling algorithms decide which process's next CPU burst runs, and they exist because CPU bursts are short far more often than they are long.

WHEN DOES THE SCHEDULER GET TO DECIDE

A scheduling decision is not something that can happen at any arbitrary moment — the CPU is busy running instructions, and choosing a different process to run requires an event that makes the current arrangement need reconsidering. There are exactly four such events, and naming them precisely is what separates preemptive scheduling from non-preemptive scheduling.

1. A process switches from running to waiting — it calls a blocking system call, such as reading from disk, and must give up the CPU because it has nothing more it can do right now.

2. A process switches from running to ready — its time slice expired, or a process with higher priority just became ready, and the operating system takes the CPU away from it even though it was able to keep running.

3. A process switches from waiting to ready — an I/O operation it was waiting on has completed, so it is now able to run again, and the scheduler could choose to run it immediately instead of whatever is currently running.

4. A process terminates — it calls exit(), and the CPU is now free for someone else.

Decision points 1 and 4 are unavoidable: a scheduling decision must happen there under any algorithm whatsoever, because the CPU is genuinely free with nothing forcing a particular successor. These two alone define non-preemptive (or cooperative) scheduling: once a process is given the CPU, it keeps it until it voluntarily blocks or exits. The scheduler never takes the CPU away from a process that still wants it and is able to use it.

Decision points 2 and 3 are optional, and choosing to act on them is what preemptive scheduling means. Under a preemptive algorithm, the scheduler can interrupt a running process before it asks to give up the CPU — because its quantum ran out (point 2), because a higher-priority process was just made ready by an arrival or an I/O completion (point 2 or 3), or because a newly ready process has a smaller remaining burst than the one currently running, as in SRTF (point 3).

REMEMBER: Non-preemptive scheduling only makes decisions at points 1 and 4 — a running process keeps the CPU until it blocks or exits, by its own choice. Preemptive scheduling additionally acts at points 2 and 3 — the OS can take the CPU back from a process that is still ready and able to run.

Preemption is what makes multitasking on a single CPU feel simultaneous rather than making everyone wait their turn to completion. It is also what makes scheduling algorithms harder to trace: a non-preemptive scheduler decides once per CPU-free event, but a preemptive one must re-evaluate its choice at every arrival, not only when a process finishes.

GATE TRAP: FCFS and non-preemptive SJF and non-preemptive priority scheduling only ever make decisions at points 1 and 4, so a running process is never interrupted by an arrival, however short or high-priority the newcomer is — it simply joins the ready queue and waits. Students routinely "preempt" a running FCFS or non-preemptive-SJF process the moment a shorter job arrives; that behaviour belongs to SRTF, not to their non-preemptive cousins.

THE DISPATCHER AND DISPATCH LATENCY

The CPU scheduler — the algorithm — only chooses which process should run next. A separate, much simpler module actually makes it happen: the dispatcher. The dispatcher performs the context switch described in the last chapter, switches the CPU into user mode, and jumps to the correct location in the chosen process's code to resume it.

The dispatcher runs on every single scheduling decision, so — exactly like the short-term scheduler whose choice it carries out — it must be as fast as possible. The time it takes from stopping one process to starting the next is called dispatch latency. It is pure overhead: no process makes progress while the dispatcher runs, so every microsecond of dispatch latency is a microsecond the CPU could have spent on useful work. A scheduling algorithm that switches processes very often (a tiny Round Robin quantum, for instance) pays this cost far more frequently, which is exactly the tension the quantum-size discussion further down makes precise.

GATE TRAP: The scheduler decides who runs next; the dispatcher makes it actually run. A question about "the module that performs the context switch, sets up the CPU registers, and switches to user mode" is describing the dispatcher, not the scheduler — allocating memory and handling page faults belong to entirely different parts of the kernel and are never the dispatcher's job.

THE CRITERIA A SCHEDULER IS JUDGED BY

Different scheduling algorithms exist because there is no single number a scheduler could maximise that would automatically make it good for every purpose. Instead there are several measurable criteria, and they can conflict — an algorithm that is excellent by one can be poor by another. Every criterion is defined precisely below because the exam turns entirely on getting these definitions exactly right, not approximately right.

CPU utilisation is the fraction of time the CPU is doing useful work rather than sitting idle. Higher is better; the theoretical maximum is 100%, and a heavily loaded real system typically runs in the 40%–90% range because the CPU is occasionally idle waiting for something (memory, I/O, or simply no ready process existing at that instant).

Throughput is the number of processes completed per unit time. It measures how much work the system is getting through, not how any one process experiences the system. A scheduler could have excellent throughput while making some individual processes wait a long time, if it always favours the type of process that finishes fastest.

Turnaround time (TAT) is defined per process, and it measures the total time that process spent in the system, from the moment it arrived to the moment it finished:

TAT = Completion time (CT) − Arrival time (AT)

This includes everything: time spent waiting in the ready queue, time actually running on the CPU (possibly split across several separate runs, if the algorithm is preemptive), and any time it spent doing I/O in between if the model tracks that. It is the number a batch-processing user cares about — "how long from submission to finished output."

Waiting time (WT) isolates just the part of turnaround spent doing nothing but waiting for a CPU. In the single-CPU-burst models this chapter uses (each process characterised by one arrival time and one total burst time, with no intervening I/O), a process's entire life from arrival to completion consists of exactly two kinds of time: time spent waiting in the ready queue, and time spent actually running. So

TAT = WT + Burst time (BT)

Rearranging gives the waiting-time formula directly, rather than as a fact to memorise separately:

WT = TAT − BT

Response time (RT) is different again: it is not about when a process finishes, but about how quickly it first gets attention.

RT = (time of first CPU allocation) − AT

Response time matters for interactive systems and is the metric Round Robin is specifically designed around: a process may need several separate runs to finish (each one further reduces its remaining burst), but response time only cares about the delay before the very first one. Under a non-preemptive algorithm, where a process runs from start to finish in one uninterrupted stretch, response time and waiting time are always equal — the first (and only) CPU allocation is also the moment the wait ends. Under a preemptive algorithm they can differ sharply: a process might get a very fast first response but still accumulate a large total waiting time across its later interruptions.

KEY: Completion time is a measured fact; turnaround, waiting, and response time are all derived from it and the arrival time. Compute CT first, always — TAT = CT − AT, then WT = TAT − BT, and separately RT = (first run) − AT. Trying to remember WT or RT as independent formulas, without pinning down CT first, is the most common source of arithmetic mistakes in this topic.

Of these, CPU utilisation and throughput are maximised — more useful work, more processes finished. Turnaround time, waiting time, and response time are minimised — less time spent by any process not making progress. A scheduler is also judged on the variance (predictability) of these times: for an interactive system, a consistently moderate response time is often preferred over one that is usually very fast but occasionally very slow, even if the average is the same. GATE questions ask for averages, but a real scheduler designer also cares about the spread.

FIRST-COME, FIRST-SERVED (FCFS)

The simplest possible rule: maintain the ready queue as an ordinary FIFO, and always run whichever process has been waiting longest. When a process arrives, it joins the back of the queue; when the CPU is free, whoever is at the front runs, and runs to completion (FCFS is non-preemptive — it only makes decisions at points 1 and 4 above).

Trace it on a concrete set of processes:

P1 arrives at 0, burst 5. P2 arrives at 1, burst 3. P3 arrives at 2, burst 8. P4 arrives at 3, burst 6.

[[FIG:gantt-fcfs-sjf]]

1. At t=0, only P1 has arrived, so P1 runs, occupying 0 to 5.
2. At t=5, P1 finishes. The ready queue, in arrival order, holds P2, P3, P4 (all have arrived by t=3). P2 runs next, from 5 to 8.
3. At t=8, P2 finishes. P3 is next in arrival order, running from 8 to 16.
4. At t=16, P3 finishes. P4 runs last, from 16 to 22.

Completion times: P1=5, P2=8, P3=16, P4=22. Turnaround (CT−AT): P1=5, P2=7, P3=14, P4=19. Waiting (TAT−BT): P1=0, P2=4, P3=6, P4=13. The average waiting time is (0+4+6+13)/4 = 23/4 = 5.75.

Notice what happened to P4. It arrived at t=3 needing only 6 units, and by rights could have been done by t=9 if it ran right after P2. Instead it sat behind P3's 8-unit burst and did not even start until t=16. This is the convoy effect, and it is worth deriving in general rather than just naming, because the derivation shows exactly why it is bad.

Suppose one process P0 with a large burst B arrives first, immediately followed by n short processes, each with a small burst b. Under FCFS, P0 runs from 0 to B. Then the short processes run back-to-back: the i-th of them completes at B + i·b. Its waiting time is (B + i·b) − b (its own burst) = B + (i−1)·b. Averaging over i = 1 to n:

average WT = B + b·(n−1)/2

Every one of the n short processes pays the entire delay B before it even gets a turn, on top of whatever small additional delay comes from the other short processes ahead of it. As B grows, the average waiting time is dominated by B no matter how small b is or how many short processes there are — a long process at the head of the queue drags down everyone behind it, purely because of ordering, with no algorithm actually favouring the long process on purpose. That is the convoy effect: many short processes queued up behind one long one.

GATE TRAP: The convoy effect is not about the long process being treated specially — FCFS treats every process identically, running whoever arrived first. The damage comes purely from bad luck in arrival order combined with strict non-preemption: once the long process has the CPU, nothing, however urgent, can interrupt it. Any question describing "many short processes stuck behind one long process, despite the scheduler being perfectly fair in its rule" is pointing at FCFS specifically, not at any form of unfairness.

SHORTEST JOB FIRST AND WHY IT IS OPTIMAL

FCFS's convoy effect suggests an obvious fix: instead of running whoever arrived first, run whoever needs the least CPU time next. That is Shortest Job First (SJF), non-preemptive: whenever the CPU becomes free, look at every process currently in the ready queue and run the one with the smallest burst time, letting it run to completion before choosing again.

Trace it on the same four processes:

1. At t=0, only P1 has arrived (burst 5), so it must run — there is no alternative yet. P1 runs 0 to 5.
2. At t=5, everyone else has arrived: P2 (burst 3), P3 (burst 8), P4 (burst 6). The shortest is P2, so it runs 5 to 8.
3. At t=8, P3 (burst 8) and P4 (burst 6) remain. P4 is shorter, so it runs 8 to 14.
4. At t=14, only P3 is left. It runs 14 to 22.

Completion times: P1=5, P2=8, P4=14, P3=22. Turnaround: P1=5, P2=7, P4=11, P3=20. Waiting: P1=0, P2=4, P4=5, P3=12. Average waiting time = (0+4+5+12)/4 = 21/4 = 5.25 — better than FCFS's 5.75 on the identical process set, because P4 (burst 6) was let through before the much larger P3 (burst 8), even though P3 had been waiting since t=2.

This is not a coincidence of this particular example. SJF is provably optimal: among every possible non-preemptive ordering of a fixed batch of processes (all their burst times known in advance), running shortest-burst-first minimises the average waiting time. The proof is worth deriving, not just quoting, because it is a short, clean argument by contradiction that GATE occasionally asks for directly.

Consider processes all arriving at time 0 (arrival time then contributes nothing and can be set aside; the argument extends to processes arriving at different times by the same reasoning applied at each point the CPU frees up). Suppose some schedule is optimal — it achieves the minimum possible total completion time — but it is not sorted by burst time: somewhere in the sequence, a job of burst x runs immediately before a job of burst y, with x > y.

1. Let t be the total time already used by every job before this pair; the pair starts running at time t regardless of order.
2. In the given order (x then y), job x completes at t+x, and job y completes at t+x+y. Their contribution to the total completion time is (t+x) + (t+x+y) = 2t + 2x + y.
3. Swap them: run y first, then x. Job y now completes at t+y, and job x completes at t+y+x — the same t+x+y as before, since the total work done by the end of the pair is unchanged. Their contribution is now (t+y) + (t+y+x) = 2t + x + 2y.
4. Every other job's completion time is untouched by this swap — each of them starts and finishes based only on the total processing time completed before it, and that total, at every point outside the pair, is exactly the same as before.
5. Compare the two contributions: before minus after = (2t+2x+y) − (2t+x+2y) = x − y, which is strictly positive because x > y.

So swapping a longer job to run after a shorter one strictly decreases the total completion time — contradicting the assumption that the original order was optimal. No schedule containing a "longer immediately before shorter" adjacent pair can be optimal; therefore an optimal schedule must have every adjacent pair in non-decreasing burst order, which means the whole schedule is sorted by burst time. That is exactly SJF.

Since Σ WT = Σ CT − Σ AT − Σ BT, and (for a fixed batch) Σ AT and Σ BT are constants independent of ordering, minimising Σ CT and minimising Σ WT — and therefore the average of each — are the same problem. SJF minimises both simultaneously.

KEY: SJF is optimal for average waiting time among non-preemptive algorithms because of a pairwise exchange argument: swapping a longer job to run after a shorter adjacent one always reduces total completion time. Any non-sorted order can be improved by such a swap, so only the fully sorted order — shortest first — can be optimal.

SJF has one serious drawback that FCFS, ironically, does not have: starvation. A process with a genuinely long burst can be repeatedly bypassed if shorter jobs keep arriving — each new short job looks more attractive to the scheduler than letting the long one proceed, and in the worst case the long process waits indefinitely, never quite becoming the shortest thing in the queue. FCFS's simple ordering, whatever else is wrong with it, guarantees every process eventually gets its turn.

The other practical problem is more basic: SJF, as described, requires knowing each process's burst time in advance, and in a real system the OS cannot see the future. This is resolved by prediction, covered below — the OS estimates the next burst from the process's own recent history and treats the estimate as if it were the true burst length for scheduling purposes.

SHORTEST REMAINING TIME FIRST (PREEMPTIVE SJF)

SJF, as defined above, only compares processes when the CPU frees up — it never interrupts a running process no matter what arrives. Its natural preemptive extension asks: what if a newly arriving process would finish sooner than the time still left on the one currently running? Shortest Remaining Time First (SRTF) says: whenever a process arrives, compare its burst time to the remaining time of whatever is currently running, and run whichever is smaller.

This means SRTF makes a scheduling decision not just when the CPU frees up, but at every single arrival (decision point 3 from earlier) — the ready queue must be re-examined every time, not only between completions. Trace it carefully on the same four processes, tracking the remaining burst of whichever process is running:

1. At t=0, only P1 (burst 5) exists. It starts running, remaining time counting down from 5.
2. At t=1, P2 arrives (burst 3). P1 has been running 1 unit, so its remaining time is 4. Compare: P2's 3 is smaller than P1's remaining 4, so P1 is preempted and P2 starts running.
3. At t=2, P3 arrives (burst 8). P2 has run for 1 unit since it started at t=1, so its remaining time is 2. Compare: P2's remaining 2 is still smaller than P3's 8, so P2 continues.
4. At t=3, P4 arrives (burst 6). P2 has now run for 2 units total, remaining 1. Still smaller than P4's 6, so P2 continues.
5. At t=4, P2 finishes exactly (it needed 3 units, ran from t=1 to t=4). P2 completes at t=4.
6. With P2 gone and no new arrivals, compare what remains: P1 has 4 units left (it ran only 1 of its 5 before being preempted), P3 has all 8, P4 has all 6. P1 is smallest, so P1 resumes, running uninterrupted from t=4 to t=8, where it completes.
7. At t=8, P3 (8 remaining) and P4 (6 remaining) are the only processes left, and no more arrivals are coming, so from here SRTF behaves exactly like plain SJF: the smaller remaining time, P4, runs next, from 8 to 14.
8. At t=14, only P3 is left. It runs 14 to 22.

[[FIG:srtf-gantt]]

Completion times: P2=4, P1=8, P4=14, P3=22. Turnaround: P2=3, P1=8, P4=11, P3=20. Waiting: P2=0, P1=3, P4=5, P3=12. Average waiting time = (0+3+5+12)/4 = 20/4 = 5.0 — better even than non-preemptive SJF's 5.25 on this same process set, because SRTF could react to P2's short burst the instant it arrived, rather than having to wait for P1 to finish first.

GATE TRAP: The single most common SRTF tracing error is forgetting that a preempted process must later resume with only its remaining time, not its original burst. P1 above does not run 5 straight units somewhere in the schedule; it runs 1 unit (0 to 1), is set aside with 4 units left, and only later gets those 4 units back. Track remaining time explicitly at every arrival, not the original burst.

SRTF is provably optimal for average waiting time among all algorithms — preemptive or not — for a fixed set of processes with known burst times, by essentially the same exchange logic as SJF extended to allow mid-burst switching: at any instant, running whichever ready process has the least work left to do can never be beaten by running anything else at that instant. This is why the hierarchy on this example is exactly what the optimality results predict: FCFS (5.75) worse than non-preemptive SJF (5.25) worse than SRTF (5.0). SRTF inherits SJF's starvation risk in an even sharper form, since a long process can be preempted repeatedly, not merely delayed once.

PREDICTING THE NEXT BURST

SJF and SRTF both need to know a process's CPU burst length before it has run — information the operating system cannot actually have, since a process's next burst depends on what it is about to compute, not on anything already recorded. The practical fix is to predict the next burst from the process's own history of past bursts, and use the prediction exactly as SJF or SRTF would use a true burst length.

The standard predictor is exponential averaging. Let t(n) be the actual length of the process's n-th CPU burst (measured after it happens), and let τ(n) be the predicted length of that same n-th burst (computed before it happens, from history up to burst n−1). The prediction for the next burst is:

τ(n+1) = α · t(n) + (1 − α) · τ(n)

where α is a constant between 0 and 1 chosen in advance. In words: the new prediction is a weighted average of the most recent actual burst and the previous prediction. Why this particular combination, rather than, say, a plain average of all past bursts? Because expanding the recursion shows what it actually computes:

1. τ(n+1) = α·t(n) + (1−α)·τ(n).
2. Substitute the same formula for τ(n): τ(n) = α·t(n−1) + (1−α)·τ(n−1). So τ(n+1) = α·t(n) + (1−α)[α·t(n−1) + (1−α)·τ(n−1)] = α·t(n) + α(1−α)·t(n−1) + (1−α)²·τ(n−1).
3. Repeating this substitution all the way back to the very first prediction τ(0) gives τ(n+1) = α·t(n) + α(1−α)·t(n−1) + α(1−α)²·t(n−2) + … + (1−α)^(n+1)·τ(0).

Every past actual burst contributes to the current prediction, but with a weight that shrinks geometrically the further back it is — the most recent burst gets weight α, the one before it α(1−α), the one before that α(1−α)², and so on. This is exactly what "exponential" refers to: recent history counts for more, and how much more is controlled by α, without ever having to store the whole history — the single number τ(n) already summarises it.

The two extreme values of α make the behaviour obvious. If α = 0, then τ(n+1) = τ(n) for every n: the actual bursts are never looked at, and the prediction stays frozen forever at whatever the initial guess τ(0) was — recent history is completely ignored. If α = 1, then τ(n+1) = t(n): the prediction is simply the most recently observed burst, with no memory of anything before it — it reacts instantly to a change in behaviour but is just as sensitive to a single unusual burst as to a genuine trend.

Work a concrete example. Suppose α = 0.5, the initial guess τ(1) = 10, and the process's first three actual bursts turn out to be t(1) = 6, t(2) = 4, t(3) = 8.

1. τ(2) = 0.5·t(1) + 0.5·τ(1) = 0.5·6 + 0.5·10 = 3 + 5 = 8.
2. τ(3) = 0.5·t(2) + 0.5·τ(2) = 0.5·4 + 0.5·8 = 2 + 4 = 6.
3. τ(4) = 0.5·t(3) + 0.5·τ(3) = 0.5·8 + 0.5·6 = 4 + 3 = 7.

τ(4) = 7 is the OS's prediction for the process's fourth CPU burst, computed purely from its first three actual bursts and the initial guess. A scheduler running SJF or SRTF would use this 7 exactly as if it were a known, true burst length.

KEY: Exponential averaging predicts the next CPU burst as τ(n+1) = α·t(n) + (1−α)·τ(n) — a weighted average that expands into a geometrically-decaying weighted sum of all past bursts. α = 0 ignores every observation and never updates; α = 1 ignores all history and just repeats the last burst. A value strictly between the two, typically 0.5, balances responsiveness to change against smoothing out noise.

PRIORITY SCHEDULING, STARVATION AND AGING

Sometimes the order processes should run in has nothing to do with how long they will take — a system process keeping the machine alive should run before a user's background job regardless of either one's burst length. Priority scheduling assigns every process a priority number and always runs the highest-priority process that is ready. By GATE's convention (and most real systems'), a lower number means higher priority — priority 1 beats priority 5. Like FCFS versus SRTF, priority scheduling can be non-preemptive (a running process keeps the CPU until it blocks or exits, even if something higher-priority arrives) or preemptive (a newly-ready higher-priority process interrupts immediately). Note that SJF and SRTF are themselves special cases of priority scheduling, where the priority of a process is simply the inverse of its (remaining) burst time.

Trace non-preemptive priority scheduling on three processes that all arrive together at t=0: P1 (burst 10, priority 3), P2 (burst 1, priority 1), P3 (burst 2, priority 2), lower number meaning higher priority.

1. All three are ready at t=0. The highest priority present is P2 (priority 1), so it runs first, from 0 to 1.
2. At t=1, P3 (priority 2) is next highest among what remains, running from 1 to 3.
3. At t=3, only P1 is left, running from 3 to 13.

Since every arrival time is 0, completion time and turnaround time coincide: P2=1, P3=3, P1=13. Waiting times (TAT−BT): P2=0, P3=1, P1=3. Average = (0+1+3)/3 = 4/3 ≈ 1.33.

Priority scheduling has exactly the same disease as SJF, for the same structural reason: whatever a process's priority is, a continuous stream of newer arrivals with better priority can keep bypassing it forever. A low-priority batch job in a system that keeps launching higher-priority interactive tasks may simply never run. This is starvation, also called indefinite postponement — a process is ready, able to run, and correctly following every rule of the system, yet it never gets the CPU because something else always looks more urgent to the scheduler.

The fix is aging: the operating system periodically raises the priority of any process that has been waiting a long time — literally decreasing its priority number (increasing its actual priority) the longer it sits in the ready queue. However fast new high-priority arrivals keep coming, an aged process's priority number eventually drops below theirs, and it must be scheduled. Aging does not change how priority scheduling makes its instant-by-instant decision — still "run the highest priority" — it only changes what counts as high priority over time, folding waiting time itself into the priority calculation.

GATE TRAP: Aging is the general cure for starvation in any priority-driven scheme (which includes SJF and SRTF viewed as priority-by-burst-length), not a Round-Robin concept and not something achieved by shrinking a time quantum. A question naming "starvation" and asking for the standard remedy is asking specifically for aging; "switch to FCFS" or "give every process equal burst time" both dodge the actual mechanism rather than fixing it.

ROUND ROBIN AND THE TIME QUANTUM

FCFS is unfair to short jobs behind a long one; SJF and priority scheduling can starve a process indefinitely. Round Robin (RR) is designed to guarantee that neither can happen, at the cost of giving up SJF's optimal average waiting time. It is the standard scheduler for time-sharing systems, where every process deserves a turn on a human-perceptible timescale.

The rule: the ready queue is a circular FIFO, and every process gets the CPU for at most one time quantum (a fixed length, typically 10–100 ms in real systems). If the process finishes or blocks before the quantum expires, the CPU is freed normally (decision points 1 or 4). If the quantum runs out first, the process is preempted, moved to the back of the ready queue, and the next process in line runs — this is decision point 2, so RR is inherently preemptive.

A convention has to be fixed for what happens when a process arrives at exactly the instant another is being preempted: does the newcomer join the queue before or after the process just kicked off the CPU? The standard convention, and the one used throughout this chapter, is that a process arriving exactly at a preemption instant is enqueued before the just-preempted process is re-inserted — the newcomer, having just shown up, is treated as "ahead" of the process that has already had its turn.

Trace RR with quantum 2 on P1 (arrival 0, burst 4), P2 (arrival 1, burst 5), P3 (arrival 2, burst 2):

1. t=0: only P1 is ready. It runs 0 to 2 (a full quantum), remaining burst now 4−2=2. During this run, P2 arrives at t=1 and joins the queue.
2. At t=2, P1's quantum expires with 2 units of work still left. P3 also arrives exactly at t=2. By the convention above, P3 is enqueued before P1 is put back: queue is now [P2, P3, P1].
3. P2 runs next (front of queue), from 2 to 4 (a full quantum), remaining 5−2=3. No arrivals during this run. Queue after preemption: [P3, P1, P2].
4. P3 runs from 4 to 6. Its burst is only 2, so it finishes exactly as its quantum would have expired — no preemption needed, it simply completes at t=6. Queue: [P1, P2].
5. P1 runs from 6 to 8, using its remaining 2 units exactly — it completes at t=8. Queue: [P2].
6. P2 (remaining 3) is now alone in the queue. It runs a full quantum, 8 to 10, remaining 3−2=1, and since nothing else is ready it is immediately re-queued behind nobody and runs again.
7. P2 runs its last unit, 10 to 11, and completes.

[[FIG:rr-quantum]]

Completion times: P3=6, P1=8, P2=11. Turnaround: P3=4, P1=8, P2=10. Waiting (TAT−BT): P3=2, P1=4, P2=5. Average waiting time = (2+4+5)/3 = 11/3 ≈ 3.67.

Response time is easy to read straight off the same trace: it only asks when a process first ran, regardless of how many times it is later preempted and resumed. P1 first ran at t=0 (its arrival), response time 0. P3 first ran at t=4, arrival 2, response time 2. P2 first ran at t=2, arrival 1, response time 2−1=1 — even though P2's burst of 5 forces it through three separate runs (2–4, 8–10, 10–11) before it finally completes at t=11, its response time only cares about that very first allocation at t=2.

GATE TRAP: Response time and waiting time are not the same thing under a preemptive algorithm. P2 above has response time 1 but waiting time 5 — it was attended to quickly the first time, but its total time spent not running, summed across all three interruptions, adds up to much more. Reading off "the time it first got the CPU" when the question asks for waiting time (or vice versa) is a very common slip specifically on Round Robin questions, since RR is the algorithm where the two routinely differ.

The size of the time quantum controls everything about how RR behaves, and it cuts both ways.

If the quantum is very large — larger than every process's burst time — no process is ever preempted before it naturally finishes. Each one simply runs to completion in the order it was dispatched, which is exactly First-Come-First-Served. Round Robin with an enormous quantum degenerates to FCFS, convoy effect and all.

If the quantum is very small, every process gets attention almost instantly and response time improves — but the CPU now spends a much larger fraction of its time context-switching rather than computing. Recall from the last chapter that a context switch is pure overhead: no process makes progress during it. If a quantum of length q is always followed by a context switch costing s, then in any repeating cycle of "run for q, then switch for s," the fraction of time wasted is

fraction of time lost to switching = s / (q + s)

Work this with real numbers. Five processes, each with a burst of 20 ms, are run under Round Robin with quantum 4 ms, and each context switch costs 1 ms. Each process needs 20/4 = 5 quantum-length runs to finish, so there are 5 × 5 = 25 runs of useful work in total, each followed by a switch: 25 × 4 = 100 ms of actual computing, and 25 × 1 = 25 ms of switching overhead, for a total elapsed time of 125 ms. The overhead fraction is 25/125 = 1/5 = 20%, matching s/(q+s) = 1/(4+1) = 1/5 exactly. If the quantum were instead 40 ms (larger than every burst), each process would finish in a single run with no preemption at all — a total of 5 switches (one after each process) at most, and the overhead fraction would shrink to a small fraction of a percent.

There is a widely used rule of thumb for choosing a quantum well in practice: pick it so that around 80% of CPU bursts complete within a single quantum — that is, most processes finish (or reach their next I/O wait) before being preempted, and only the unusually long minority ever get cut off. Given the burst-length distribution from earlier in this chapter — many short bursts, few long ones — a quantum around the middle-to-upper range of typical burst lengths achieves this: it is large enough that the common short burst never even notices the quantum exists, but still small enough to bound how long any single burst can monopolise the CPU before an unusually long process is forced to yield.

KEY: Round Robin's quantum size is a direct trade-off between responsiveness and throughput. Too large and it collapses to FCFS with all of FCFS's problems; too small and context-switch overhead — s/(q+s) of all CPU time — eats into throughput. Good practice sizes the quantum so most CPU bursts (around 80%) finish within it.

TIE-BREAKING CONVENTIONS

Every trace above depended on a convention for resolving ties, and it is worth stating the standard ones explicitly, because a Gantt chart built on the wrong convention gives a wrong (but plausible-looking) answer.

• When two processes are ready at the same instant with equal claim under the algorithm's rule (equal burst under SJF/SRTF, equal priority, equal arrival under FCFS), the tie is broken by arrival order — whichever arrived first goes first — and if arrivals are also equal, by the lower process index or PID (P1 before P2, and so on), unless the question states a different rule explicitly.

• The specific Round Robin tie covered above — a new arrival and a quantum expiry happening at exactly the same instant — is resolved by enqueuing the newly arrived process before re-inserting the process that was just preempted. This is worth remembering as its own rule because it is easy to get backwards, and getting it backwards changes every completion time from that point on.

• In SRTF, if the remaining time of the currently running process exactly equals that of a newly arriving process, the convention (used unless a question states otherwise) is that the running process is allowed to continue rather than being preempted purely for a tie — preemption happens only for a strictly smaller remaining time.

GATE TRAP: A question that gives a tie-breaking rule explicitly overrides every default convention above. Always check the wording — "assume newly arrived processes are placed ahead of a just-preempted one" or "on equal priority, favour the lower process number" — before building the trace, and state which convention you used if the question does not.

MULTILEVEL QUEUE SCHEDULING

Real systems rarely have just one kind of process. A system process, an interactive foreground process, and a long batch job have genuinely different scheduling needs, and forcing all three through one ready queue with one algorithm serves none of them well. Multilevel queue scheduling partitions the ready queue into several separate queues, grouped by some fixed process property — commonly foreground (interactive) versus background (batch) — and assigns each queue its own scheduling algorithm: perhaps Round Robin with a short quantum for the interactive queue, where responsiveness matters, and FCFS for the batch queue, where throughput matters more than any individual process's wait.

Because there are now several queues, the system also needs a rule for scheduling between them. Two are standard. Fixed-priority preemptive scheduling always runs the higher queue if it has anything ready at all — the batch queue only gets the CPU when the interactive queue is completely empty, and a new interactive arrival immediately preempts whatever the batch queue was running. Time-slice scheduling instead gives each queue a guaranteed percentage of CPU time — say 80% to the foreground queue and 20% to the background — regardless of how full either is, so the background queue is guaranteed some progress even under heavy interactive load.

A process's queue assignment in this basic scheme is permanent — decided once, typically by process type, and never revisited. This is exactly its weakness: a process wrongly classified, or one whose behaviour changes over its lifetime (starts CPU-bound, becomes interactive), is stuck in the wrong queue forever, with no mechanism to correct it. That gap is what multilevel feedback queue scheduling exists to close.

MULTILEVEL FEEDBACK QUEUE SCHEDULING

A multilevel feedback queue (MLFQ) keeps the same idea of several queues with different priorities, but adds the one thing plain multilevel queues lack: a process can move between queues based on its observed behaviour, rather than being assigned once and stuck there. The scheduler does not need to know in advance whether a process is CPU-bound or I/O-bound — it infers this from how the process actually behaves and adjusts its treatment accordingly.

The standard design uses several queues arranged from highest to lowest priority, with the quantum growing larger at each lower level, and the lowest level often running plain FCFS with no quantum at all. A process always starts at the top queue. If it finishes, or blocks for I/O, before its quantum expires, it stays at its current level (or is even promoted, in some designs, to reward it for not hogging the CPU) — this is how a genuinely short, interactive burst is recognised and kept fast. If it instead uses its entire quantum without finishing, that is evidence it is more CPU-bound than the queue assumed, and it is demoted one level, where it gets a longer quantum but lower priority.

Trace this on a three-level MLFQ — Q0 with quantum 4 (highest priority), Q1 with quantum 8, and Q2 running plain FCFS to completion — with two processes, both arriving at t=0: P1 with burst 30, and P2 with burst 4.

[[FIG:mlfq-ladder]]

1. Both start in Q0. By the standard tie-break (lower process index first, since both arrived together), P1 runs first, from t=0 to t=4 — a full quantum used up, with 30−4=26 units still remaining. Because it did not finish, it is demoted to Q1.
2. P2 now runs in Q0, from t=4. Its burst is exactly 4, matching the quantum, so it completes precisely at t=8 — it never touches its quantum's edge in a way that forces a demotion; it simply finishes.
3. With P2 gone, P1 (now in Q1, quantum 8) runs from t=8 to t=16, using the entire quantum. Remaining burst: 26−8=18, still not zero, so it is demoted again, to Q2.
4. In Q2 (FCFS, run to completion), P1 is the only process left. It runs its remaining 18 units straight through, from t=16 to t=34, and completes.

Completion times: P2=8, P1=34. Turnaround: P2=8, P1=34. Waiting: P2=8−4=4, P1=34−30=4.

The design goal is visible directly in this trace. P2, the short process, was recognised as short within a single quantum and finished almost immediately, exactly as SJF would have preferred, without the scheduler ever being told in advance which process was shorter. P1, the long process, was gradually pushed down to the low-priority, high-quantum, low-overhead background queue where it belongs, rather than being allowed to repeatedly delay short newcomers the way it would under FCFS.

Because a process demoted to a low queue could in principle sit there a very long time if the higher queues stay busy, MLFQ has the same starvation risk as any priority scheme, and the same cure: aging. Many MLFQ implementations periodically promote a process that has waited too long back up toward the top queue, guaranteeing it eventually competes on equal terms again.

KEY: MLFQ needs no advance knowledge of which processes are CPU-bound and which are I/O-bound — it discovers this from behaviour. Using the whole quantum without finishing is treated as evidence of being CPU-bound and causes demotion to a lower, higher-quantum queue; finishing or blocking early keeps a process at a high, responsive queue. An MLFQ is fully specified only once you state the number of queues, each one's quantum, the scheduling algorithm within each queue, the demotion rule, and any promotion/aging rule — all five, since GATE questions on MLFQ often hinge on exactly one of these being different from what you assumed.

MULTIPROCESSOR SCHEDULING

Everything so far assumed a single CPU. With several processors available, scheduling gains a whole new dimension — not just which process runs next, but which processor it runs on.

The simplest approach is asymmetric multiprocessing: one processor, the master, makes every scheduling decision, handles all I/O, and runs the kernel; the other processors run only user code assigned to them by the master. This avoids the need for the scheduling data structures themselves to be shared and protected across processors, at the cost of the master becoming a bottleneck and the other processors being unable to do any kernel-level work of their own.

The alternative, used by essentially every modern multi-core system, is symmetric multiprocessing (SMP): every processor is self-scheduling, examining a shared ready queue (or its own per-processor ready queue) and picking its own next process to run, with the kernel's data structures protected by locks so that two processors never grab the same ready process at once.

Once several processors are in play, where a process last ran starts to matter. A processor's cache holds data the process was recently using; if a process runs on the same processor again, that data may still be there — a warm cache, meaning less time spent re-fetching data from main memory. Moving the process to a different processor means starting with a cold cache on the new one, even though it does not change anything about correctness. Processor affinity is the practice of trying to keep a process on the same processor it last ran on for exactly this reason. Soft affinity means the scheduler tries to honour this but will move a process if load balancing genuinely requires it; hard affinity means a process is explicitly pinned to specific processors and is never moved, whatever the load looks like elsewhere.

Affinity, however, works against keeping every processor equally busy: if processes only ever run on the processor they started on, one processor can become overloaded while another sits idle, simply because of where processes happened to begin. Load balancing addresses this by moving processes between processors' queues to even out the load, and it comes in two directions. Push migration has a dedicated task periodically check the load on every processor and push processes from an overloaded one to an idle or lightly-loaded one. Pull migration instead has an idle processor notice it has nothing to do and pull a waiting process off a busy processor's queue itself. Both achieve the same goal from opposite directions, and both work directly against affinity — every migration invalidates the cache benefit affinity was trying to preserve, which is why real systems tune how aggressively they load-balance rather than doing it on every possible opportunity.

GATE TRAP: Load balancing and processor affinity are not the same idea, and they are not simply compatible — they actively pull in opposite directions. Affinity by itself would leave load permanently wherever it started; load balancing by itself would migrate processes freely and destroy every cache advantage. A real scheduler is a compromise between the two, not a system with only one of them.

REAL-TIME SCHEDULING

Some systems have deadlines, not just preferences. A hard real-time system is one where missing a deadline is a system failure — an anti-lock braking controller that computes a wheel-speed correction one millisecond too late has not merely degraded service, it has failed. A soft real-time system tolerates occasional missed deadlines with reduced quality rather than outright failure — a video player that occasionally drops a frame is unpleasant, not dangerous. Scheduling for hard real-time systems needs guarantees, not just good averages, which is why the algorithms differ from everything above.

Consider a set of periodic tasks, each repeating forever with a fixed period p (how often it must run) and a fixed execution time e (how long each instance takes), and each instance's deadline equal to the end of its period. Rate-Monotonic (RM) scheduling assigns a fixed, static priority to each task based purely on its period: shorter period means higher priority, permanently. It is the optimal static-priority algorithm — no other fixed-priority assignment can schedule a task set that RM cannot.

Earliest Deadline First (EDF) instead assigns priority dynamically: at every instant, whichever ready task's next deadline is soonest gets the CPU, and this ranking is recomputed every time a task becomes ready or finishes. EDF is optimal among all scheduling algorithms, static or dynamic: a task set is schedulable by some algorithm if and only if it is schedulable by EDF, and EDF can achieve up to 100% CPU utilisation, whereas RM's fixed-priority guarantee is more conservative.

Compare them directly on the same task set: T1 with execution 2 and period 4 (so it must complete 2 units of work every 4 units, deadline = release + 4), and T2 with execution 3 and period 6 (deadline = release + 6). Total utilisation is U = e1/p1 + e2/p2 = 2/4 + 3/6 = 0.5 + 0.5 = 1.0 — the CPU is, in principle, exactly fully booked.

Under RM, T1 has the shorter period so it always has higher priority.

1. At t=0, both are released. T1, higher priority, runs first: 0 to 2, finishing its first instance (deadline was 4 — met comfortably).
2. At t=2, T1 is done for now, so T2 runs, starting at t=2.
3. At t=4, T1's second instance is released (deadline 8). Since T1 always has higher priority, it preempts T2 immediately. T2 has run from 2 to 4 — 2 of its 3 units — leaving 1 unit still to do.
4. T1 runs 4 to 6, completing its second instance well inside its deadline of 8.
5. At t=6, T2 resumes with its last 1 unit, running 6 to 7. But T2's deadline was 6 (its first instance was released at 0, period 6) — it needed to be done by t=6 and only finished at t=7. Deadline missed.

RM fails this task set, even though nothing was implemented wrong — it is simply a consequence of always favouring the shorter-period task even when doing so pushes the longer-period task past its own deadline.

Now run EDF on the identical task set.

1. At t=0, both are ready with deadlines T1=4 and T2=6. T1's deadline is nearer, so it runs first, 0 to 2, finishing.
2. At t=2, T2 runs (it is the only ready task), starting its 3 units of work.
3. At t=4, T1's second instance is released, with deadline 4+4=8. Compare deadlines: T2, already running, has deadline 6; the new T1 instance has deadline 8. T2's deadline is nearer, so — unlike RM, which would preempt automatically — EDF lets T2 continue.
4. T2 finishes its remaining work at t=5 (it started at t=2 and needed 3 units total), meeting its deadline of 6 with a unit to spare.
5. T1's waiting second instance (deadline 8) now runs, from t=5 to t=7, comfortably inside its deadline.

Every deadline is met under EDF, on the same task set where RM failed, because EDF was willing to let the nearer deadline keep running instead of always favouring the shorter period. This is the concrete content behind "EDF is optimal": at U=1.0, exactly full utilisation, EDF can still succeed while a fixed-priority scheme is no longer guaranteed to.

For fixed-priority algorithms like RM, a widely used sufficient (not necessary) schedulability test is the Liu–Layland utilisation bound: a task set of n tasks is guaranteed schedulable under RM if

U ≤ n·(2^(1/n) − 1)

For n=2, this bound is 2·(2^0.5 − 1) = 2·(1.41421 − 1) = 2·0.41421 ≈ 0.828. The task set above has U = 1.0, which exceeds 0.828 — the bound correctly warns that RM is not guaranteed to work, and indeed it failed. EDF's schedulability test is simpler and exact rather than merely sufficient: a task set is schedulable under EDF if and only if U ≤ 1, with no further conditions.

GATE TRAP: The Liu–Layland bound is sufficient, not necessary, for RM — a task set with utilisation above the bound might still happen to be schedulable under RM in a particular case (RM is more conservative than it needs to be), but a task set with utilisation at or below the bound is always guaranteed schedulable. Never read "exceeds the bound" as "definitely fails" for RM in general; read "at or below the bound" as "definitely succeeds," and treat anything above it as needing an actual trace, exactly as done above.

LINUX'S COMPLETELY FAIR SCHEDULER

Real production systems rarely implement any of the textbook algorithms exactly as described; Linux's default scheduler, the Completely Fair Scheduler (CFS), is a good illustration of how the ideas above get adapted into something that scales to real workloads. Instead of fixed time quanta and explicit queues, CFS tracks a virtual runtime (vruntime) for every runnable task — roughly, how much CPU time it has received so far, scaled by its weight (derived from its nice value, the traditional UNIX priority knob) — and keeps every runnable task in a red-black tree ordered by vruntime. The scheduler always picks the task with the smallest vruntime — the one that, relative to its assigned share, has run the least so far — which continuously approximates giving every task an equal (weighted) share of the CPU without ever needing a fixed quantum to enforce it. A task's actual time slice is computed dynamically from a target scheduling latency divided among the currently runnable tasks according to their weights, so the number of runnable tasks and their relative priorities directly determine how long each individual slice is, rather than every process getting the same fixed quantum regardless of how many others are competing for the CPU.

WORKED PROBLEMS

Each of the following is solved with every step shown — no answer is stated without the trace or derivation that produces it.

1. Trace SRTF on P1 (arrival 0, burst 8), P2 (arrival 1, burst 4), P3 (arrival 2, burst 9), P4 (arrival 3, burst 5), and find the average waiting time.
   At t=0, only P1 exists (remaining 8), so it runs. At t=1, P2 arrives (burst 4); P1's remaining time is 7, larger than P2's 4, so P1 is preempted and P2 runs. At t=2, P3 arrives (burst 9); P2's remaining time is 4−1=3, smaller than P3's 9, so P2 continues. At t=3, P4 arrives (burst 5); P2's remaining time is now 4−2=2, still smaller, so P2 continues. At t=5, P2 finishes (it ran from t=1 to t=5, its full 4 units), completing at t=5. Now compare what remains: P1 has 7 (it ran only 1 unit before being preempted), P3 has 9, P4 has 5. P4 is smallest, so P4 runs next, uninterrupted (no more arrivals), from t=5 to t=10. At t=10, P1 (7) and P3 (9) remain; P1 is smaller, running 10 to 17. Finally P3 runs 17 to 26.
   Completion times: P2=5, P4=10, P1=17, P3=26. Turnaround: P2=4, P4=7, P1=17, P3=24. Waiting: P2=0, P4=2, P1=9, P3=15. Average = (0+2+9+15)/4 = 26/4 = 6.5.

2. Trace Round Robin, quantum 3, on P1 (arrival 0, burst 6), P2 (arrival 2, burst 4), P3 (arrival 3, burst 3), using the convention that a process arriving exactly at a preemption instant is enqueued before the just-preempted process. Find the response time of P3.
   P1 runs first (only process ready at t=0), from 0 to 3, remaining 3. During this run, P2 arrives at t=2 and queues. At t=3, P1's quantum expires with 3 units left; P3 also arrives exactly at t=3, so it is enqueued ahead of the re-inserted P1: queue becomes [P2, P3, P1]. P2 runs 3 to 6 (its full burst, completing exactly as its quantum would expire). Queue: [P3, P1]. P3 runs 6 to 9, completing (burst exactly 3). Queue: [P1]. P1 runs its remaining 3 units, 9 to 12, completing.
   P3 first (and only) ran at t=6; its arrival was t=3; response time = 6−3 = 3.

3. Which scheduling algorithm minimises average waiting time on P1 (arrival 0, burst 5), P2 (arrival 1, burst 3), P3 (arrival 2, burst 8), P4 (arrival 3, burst 6) — compare FCFS, non-preemptive SJF, and SRTF directly.
   FCFS runs strictly in arrival order: P1(0–5), P2(5–8), P3(8–16), P4(16–22); waiting times 0,4,6,13; average 23/4 = 5.75. Non-preemptive SJF, choosing the shortest available job whenever the CPU frees: P1(0–5) [nothing else has arrived], then P2(5–8) [shortest of P2,P3,P4], then P4(8–14) [shorter than P3], then P3(14–22); waiting times 0,4,5,12; average 21/4 = 5.25. SRTF, re-comparing at every arrival: P1 runs 0–1, is preempted by P2 (shorter remaining time) which runs 1–4, then P1 resumes 4–8 (smallest remaining once P2 finishes and no more arrivals are coming), then P4 (smaller remaining than P3) runs 8–14, then P3 runs 14–22; waiting times 3,0,12,5 (P1,P2,P3,P4 respectively); average 20/4 = 5.0. SRTF gives the lowest average waiting time (5.0), followed by non-preemptive SJF (5.25), followed by FCFS (5.75) — exactly the order predicted by the optimality results: SRTF is optimal among all algorithms, non-preemptive SJF is optimal among non-preemptive ones, and FCFS has no optimality guarantee at all.

4. A process's CPU bursts are predicted using exponential averaging with α = 0.4 and an initial guess τ(1) = 12. Its first three actual bursts are t(1) = 8, t(2) = 14, t(3) = 6. Compute the prediction for its fourth burst.
   τ(2) = 0.4·8 + 0.6·12 = 3.2 + 7.2 = 10.4. τ(3) = 0.4·14 + 0.6·10.4 = 5.6 + 6.24 = 11.84. τ(4) = 0.4·6 + 0.6·11.84 = 2.4 + 7.104 = 9.504. The prediction for the fourth burst is 9.504.

5. A Round Robin scheduler uses a quantum of 6 ms, and every context switch costs 1.5 ms. Ten CPU-bound processes each need exactly 18 ms of CPU time and nothing else is running. What fraction of total elapsed time is lost to context-switch overhead, and how long does the whole batch take to finish?
   Each process needs 18/6 = 3 full quantum-runs, so there are 10 × 3 = 30 runs of useful work in total, each followed by one context switch. Useful work: 30 × 6 = 180 ms. Overhead: 30 × 1.5 = 45 ms. Total elapsed time = 225 ms. Overhead fraction = 45/225 = 1/5 = 20%, matching s/(q+s) = 1.5/(6+1.5) = 1.5/7.5 = 0.2 exactly.

6. Trace a three-level MLFQ — Q0 (quantum 3, highest priority), Q1 (quantum 6), Q2 (FCFS to completion) — on two processes both arriving at t=0: P1 (burst 15) and P2 (burst 3), with P1 given priority for ties (lower index first).
   Both start in Q0. P1 runs first, 0 to 3 (full quantum used, 15−3=12 remaining, not finished) — demoted to Q1. P2 then runs in Q0 from t=3; its burst is exactly 3, so it completes precisely at t=6 with no demotion. P1 (in Q1, quantum 6) then runs from t=6 to t=12, using the full quantum; remaining 12−6=6, still not finished — demoted to Q2. In Q2 (FCFS), P1 is alone and runs its last 6 units straight through, from t=12 to t=18, completing.
   Completion times: P2=6, P1=18. Turnaround: P2=6, P1=18. Waiting: P2=6−3=3, P1=18−15=3.

7. Three processes arrive together at t=0 under non-preemptive priority scheduling: P1 (burst 6, priority 2), P2 (burst 2, priority 1), P3 (burst 4, priority 3), lower number meaning higher priority. Find the average turnaround time.
   Priority order (highest first): P2 (priority 1), then P1 (priority 2), then P3 (priority 3). P2 runs 0–2, P1 runs 2–8, P3 runs 8–12. Since all arrival times are 0, turnaround equals completion time: P2=2, P1=8, P3=12. Average turnaround = (2+8+12)/3 = 22/3 ≈ 7.33.

8. Two periodic real-time tasks: T1 (execution 1, period 4) and T2 (execution 2, period 8). Check whether Rate-Monotonic scheduling guarantees this task set is schedulable using the Liu–Layland bound, and separately check whether it is schedulable under EDF.
   Utilisation U = 1/4 + 2/8 = 0.25 + 0.25 = 0.5. The Liu–Layland bound for n=2 tasks is 2·(2^0.5 − 1) ≈ 0.828. Since U = 0.5 ≤ 0.828, RM is guaranteed to schedule this task set successfully — no trace is even needed once the bound is satisfied. For EDF, the exact condition is simply U ≤ 1; since 0.5 ≤ 1, EDF schedules it as well. Both algorithms succeed here because the total demand is comfortably below full utilisation, unlike the U = 1.0 example in the chapter body where RM failed and only EDF succeeded.

WHAT TO CARRY INTO THE NEXT CHAPTER

Every algorithm in this chapter assumed processes act independently, each simply running its own burst without touching anything another process depends on. Real processes do not stay that independent — they share files, shared memory regions, counters, and the very ready-queue and scheduling data structures this chapter has been building. The instant two processes can read and write the same data while the scheduler is free to interleave them in any of the orders traced above, a new class of bug becomes possible that has nothing to do with which algorithm is running: two processes updating the same value can lose an update, or see each other's data half-written. That is the process synchronisation problem, and it is what the next chapter builds directly on top of the scheduling machinery developed here.
`
};
