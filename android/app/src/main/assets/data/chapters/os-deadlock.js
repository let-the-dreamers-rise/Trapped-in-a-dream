// Textbook chapter: Deadlocks.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/os.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure. rag-cycle, bankers-safety and min-resources are
// already defined on this topic's theory.figs in data/questions/os.js; one more
// figure (the safe/unsafe/deadlocked state picture) is defined below.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['os-deadlock'] = {
  figs: [
    {
      id: 'deadlock-states',
      caption: 'Every state the system can be in is either safe or unsafe. Deadlocked states are a small part of unsafe — most unsafe states never actually deadlock.',
      svg: '<svg viewBox="0 0 380 200" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.5" fill="none"><rect x="10" y="24" width="160" height="156" rx="8"/><rect x="190" y="24" width="180" height="156" rx="8"/><circle cx="320" cy="100" r="40"/></g><g font-size="11" fill="currentColor"><text x="190" y="14" text-anchor="middle" font-size="10" opacity=".8">the set of all states the system can be in</text><text x="90" y="44" text-anchor="middle">SAFE</text><text x="90" y="108" text-anchor="middle" font-size="9" opacity=".8">a safe sequence exists —</text><text x="90" y="122" text-anchor="middle" font-size="9" opacity=".8">every process can finish</text><text x="240" y="44" text-anchor="middle">UNSAFE</text><text x="320" y="98" text-anchor="middle" font-size="9">deadlocked</text><text x="320" y="112" text-anchor="middle" font-size="8" opacity=".8">no process can proceed</text><text x="240" y="158" text-anchor="middle" font-size="9" opacity=".8">most unsafe states are here:</text><text x="240" y="171" text-anchor="middle" font-size="9" opacity=".8">may still avoid deadlock</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

Two chapters ago you saw processes competing for the CPU; the synchronisation chapter showed them competing for shared data, protected by locks. Both situations have the same shape underneath: a process asks the operating system for something it does not yet have, and waits if it cannot get it. This chapter asks the question those two left open — what if the waiting never ends?

A deadlock is what happens when a set of processes get stuck waiting on each other in a closed loop, permanently. It is the sharpest possible failure of resource sharing: not slow, not unfair, but frozen forever. We will build the exact conditions under which this can happen, the graph that lets you see it, and three different engineering answers to the problem — stopping it before it starts, steering around it at run time, and letting it happen but catching it. The next chapter, memory management, will reuse the same idea of "resources held and requested" in a narrower setting, so getting the vocabulary solid here pays off immediately.

THE SYSTEM MODEL: RESOURCES, REQUESTS, AND RELEASES

Before defining deadlock precisely, fix the model it is defined over. The system has a fixed collection of resource types: CPU cycles, memory, printers, tape drives, files, semaphores, database locks. Each resource type has some number of identical instances — one CPU, say, or three printers, or five identical tape drives. A process does not care which instance of a type it gets, only that it gets one.

A process interacts with a resource type through exactly three operations, always in this order:

• Request — the process asks the OS for an instance of the resource type. If none is free, the request blocks the process: it is moved off the CPU and out of contention until the resource becomes available.

• Use — the process operates on the resource it was given. It can print, write to the tape, hold the lock, occupy the memory — whatever the resource is for.

• Release — the process gives the instance back. The OS is now free to hand it to some other waiting process.

This request-use-release cycle is completely general — it describes a process printing a file exactly as well as it describes two threads acquiring semaphores in the producer–consumer problem. The system's state at any instant is fully described by which instances are currently allocated to which processes, and which processes are currently blocked waiting for which resource types. Deadlock is a property of that state.

WHAT A DEADLOCK ACTUALLY IS

A deadlock is a state in which every process in some set is waiting for an event that only another process in that same set can cause — and since every one of them is waiting rather than running, none of them can ever cause that event. The set as a whole is stuck, permanently, with no external intervention.

The canonical picture: process P1 holds resource A and requests resource B; process P2 holds resource B and requests resource A. P1 cannot proceed until it gets B, which P2 holds; P2 cannot proceed until it gets A, which P1 holds. Neither will ever release what it holds, because releasing happens only after the process finishes using the resource, and neither can finish — each is blocked mid-request. The waiting is circular and total.

The defining feature is permanence with no possible resolution from inside the system. Ordinary waiting resolves itself: a process waiting for I/O is woken when the I/O completes; a process waiting on a lock is woken when the holder releases it. In deadlock, the event every waiter needs is "some other waiter releases," and that event structurally cannot occur, because every candidate releaser is itself blocked. No amount of time passing helps. No scheduling decision helps. The set is stuck until something from outside the request-use-release model — an operator killing a process, a timeout, a reboot — breaks it.

KEY: A deadlock is not "waiting a long time." It is waiting for an event that can never occur, because every process that could cause it is itself waiting on the deadlocked set. Nothing internal to normal execution can ever end it.

DEADLOCK VERSUS STARVATION VERSUS LIVELOCK

Three words describe processes failing to make progress, and they describe three different mechanisms. Confusing them is the single most common conceptual slip in this topic.

Starvation is a process being denied a resource indefinitely even though the resource periodically becomes available — the denial is due to how it is being allocated, not to a structural deadlock. The classic case is a priority scheduler that always prefers higher-priority processes: a low-priority process can wait forever even though the CPU is free and busy all the time, simply because someone higher priority keeps arriving first. No cycle of mutual waiting exists; the resource is being used, just never by this process. Starvation is a fairness failure.

Deadlock, by contrast, requires the resource to never become available to anyone in the waiting set — the processes involved are mutually blocking each other, not being out-competed by a third party. A deadlocked process is not unlucky; it is caught in a structural loop that no scheduling policy can break, because the scheduler cannot run a process that is blocked on a resource nobody will ever release.

Livelock is different again: the processes are not blocked at all — they are actively executing, continuously changing state — but the state changes never add up to progress. The standard example is two processes each politely trying to avoid a conflict: each detects the other is about to use a shared resource, and each backs off and retries, and if their retry timing keeps lining up, they back off forever, like two people in a corridor who each step aside in the same direction and keep blocking each other. CPU cycles are being burned the entire time; nothing is stuck, and nothing is achieved either.

GATE TRAP: A question that describes processes "repeatedly changing state in response to each other" but never actually finishing is testing livelock, not deadlock — the giveaway is that the processes are active. A question describing processes that are simply blocked, forever, with no state change, is deadlock. Starvation is neither of these; it is testing whether you spotted that only some processes are denied, and that the resource itself is not idle.

THE FOUR COFFMAN CONDITIONS

Given the picture of P1 and P2 stuck in a circle, what exactly has to be true about the system for that circle to be able to form? Four separate conditions turn out to be required, first stated together by Coffman, Elphick and Shoshani, and every one of them is necessary — remove any single one and the circular-wait scenario becomes structurally impossible to construct.

• Mutual exclusion. At least one resource involved must be usable by only one process at a time — non-shareable. A tape drive is like this: two processes writing to the same drive simultaneously would corrupt the tape, so the OS gives it to one process and makes the other wait. A read-only file, by contrast, can be given to many processes at once with no conflict, so it cannot participate in a deadlock as the contested resource.

• Hold and wait. A process is holding at least one resource already while it requests another. This is what makes the waiting circular rather than a simple queue: P1 is not merely waiting for B, it is sitting on A while it waits, which is precisely what stops P2 from ever getting A and finishing.

• No preemption. A resource cannot be forcibly taken from the process holding it; it can only be given up voluntarily, after the holder is done. If the OS could simply seize A from P1 and hand it to P2, the circle would break immediately — P2 would get what it needs, finish, and release B, and P1 could then proceed.

• Circular wait. There exists a chain of processes P0, P1, ..., Pn where each one is waiting for a resource held by the next, and Pn is waiting for a resource held by P0 — closing the loop back to the start. With two processes this is the simple picture above; with more, it can be a long ring, but the structure is the same: following the "waiting for" arrow from any process in the chain eventually leads back to that same process.

Why must all four hold, simultaneously, for deadlock to occur? Because removing any one of them gives a way out that the deadlock definition rules out. Without mutual exclusion, the contested resource could simply be shared, and there would be nothing to wait for. Without hold-and-wait, a waiting process holds nothing, so it is not itself blocking anyone else. Without no-preemption, the OS breaks any circular wait by force. Without circular wait, the waiting graph is not a closed loop, so somewhere a process is waiting on a resource held by a process that is NOT itself waiting — that process will finish and release, and the chain unblocks from that end. Each condition removes deadlock through a different mechanism, which is exactly why all four are independently necessary.

KEY: All four Coffman conditions are individually necessary for deadlock — deadlock cannot occur if any single one is absent. This is the entire logical basis of deadlock prevention: engineer the system so that one specific condition can never hold, and deadlock becomes structurally impossible, regardless of what the processes do.

WHY THE FOUR CONDITIONS ARE NOT ALWAYS SUFFICIENT

Necessary is not the same as sufficient, and this is where a lot of people overreach. With a single instance of each resource type, all four conditions holding does guarantee deadlock — there is genuinely no way out. But once a resource type has more than one instance, all four conditions can hold and the system can still be perfectly fine.

Here is why. Circular wait says P1 is waiting for a resource type held by P2, and P2 is waiting for a resource type held by P1. If each of those resource types has only one instance, "held by P2" means all of it is with P2, so P1 truly has nowhere else to get it — waiting is unconditional. But if the resource type has, say, three instances, and P2 holds one of them while a second instance sits completely free and unrequested, then P1's "wait" for that resource type can be satisfied immediately from the free instance, without P2 ever releasing anything. The chain looks circular on paper, but it is not actually blocking, because there is slack in the system that the simple description of the four conditions does not capture.

So the four Coffman conditions describe the necessary shape of a deadlock, but with multiple instances per type you additionally need every resource type along the cycle to be fully committed, with no spare instance anywhere that could satisfy one of the pending requests and unravel the chain. This extra fact is exactly what the resource-allocation graph is built to show, and it is the subject of the next two sections.

THE RESOURCE-ALLOCATION GRAPH

A resource-allocation graph, or RAG, is a directed graph that makes the state of request-use-release visible. It has two kinds of nodes: processes, drawn as circles, and resource types, drawn as rectangles. Inside a resource-type rectangle, one dot is drawn per instance of that type — a rectangle with three dots is a resource type with three interchangeable units.

Two kinds of edges connect them. A request edge, drawn Pi → Rj, means process Pi has asked for an instance of resource type Rj and is currently waiting because none was free at the time. An assignment edge, drawn Rj → Pi (specifically, from one particular dot inside Rj to Pi), means one instance of Rj is currently allocated to Pi.

Every request edge, if satisfied, converts into an assignment edge: the moment Pi is given the instance it asked for, the arrow "flips" from pointing at the resource to pointing at the process, and it now originates from a specific dot rather than from the rectangle in general. Every assignment edge, when the process releases the resource, simply disappears, and the freed dot becomes available for the next request edge pointing at that rectangle.

This graph is a complete, exact picture of who is holding what and who is waiting for what, at one instant. It does not show timing or history — only the current snapshot. That snapshot turns out to be exactly what is needed to answer the deadlock question, as the next section shows.

THE CYCLE THEOREM

Claim: if the resource-allocation graph contains no cycle, the system is not deadlocked. Proof sketch — a cycle-free directed graph has at least one node with no outgoing edge that is part of any cycle; trace this through to a process with no pending request, or a resource with a free instance feeding a waiting process, and progress is always possible somewhere, which propagates: that process finishes, releases its resources, satisfies the next process's request, and so on. No cycle means the "waiting for" relationship terminates somewhere. So absence of a cycle is a clean guarantee of no deadlock — this direction holds regardless of instance counts.

The other direction depends on how many instances each resource type has.

If every resource type in the graph has exactly one instance, a cycle is both necessary AND sufficient for deadlock. Necessity is immediate: deadlock requires circular wait, and circular wait drawn as a graph is a cycle. Sufficiency follows because with one instance per type, "the resource this process is waiting for is held by the next process in the cycle" is unconditional — there is no other dot the request could be satisfied from, since there is only one dot total, and it is already accounted for by the cycle itself. So every process on a single-instance cycle really is stuck forever.

[[FIG:rag-cycle]]

If some resource type on the cycle has multiple instances, a cycle is still necessary (deadlock always shows as a cycle) but no longer automatically sufficient. There might be a free instance of that resource type sitting unrequested, able to satisfy one of the pending requests immediately and break the whole chain — exactly the slack described in the previous section.

Work through the standard example. Resource types R1 and R2 each have two instances. R1's two instances are held one each by P1 and P2. Of R2's two instances, one is held by P2, and one is completely free. P1 has a pending request for R2; P2 has a pending request for R1. Read off the graph: P1 → R2 → P2 → R1 → P1 — a genuine cycle.

Is this deadlocked? No. R2 has a free instance, and P1's pending request is specifically for R2. The OS can hand that free instance straight to P1 with no need for P2 to release anything. P1 then finishes, releases both the R1 instance and the R2 instance it now holds, and P2's request for R1 is satisfied by the instance P1 just freed. The whole cycle unwinds. The graph had a cycle; the system was never actually stuck.

GATE TRAP: "A cycle in the resource-allocation graph always means deadlock" is true only when every resource type on the cycle has a single instance. The moment any resource type has more than one instance, you must check whether every instance along the cycle is committed with none free — only then does the cycle guarantee deadlock. A cycle with a free instance anywhere on it is necessary-but-not-sufficient, exactly the case above.

KEY: Single instance per type: cycle ⇔ deadlock, no further check needed. Multiple instances: cycle is required for deadlock but you must additionally verify no free instance exists anywhere on the cycle that could satisfy a pending request.

FOUR WAYS TO HANDLE DEADLOCK

Given that deadlock can happen, an operating system has to pick a policy. There are three genuine engineering strategies, plus one that is not really a strategy at all but is worth naming because real systems use it.

Prevention designs the system so that at least one Coffman condition can never arise, structurally, no matter what the processes do. It is a static, design-time guarantee: correct by construction, at some cost in flexibility or resource utilisation.

Avoidance lets all four conditions potentially exist, but the OS is told in advance the maximum resources each process could ever want, and it checks every single request at run time against that information before granting it, refusing any request that would leave the system in a state from which deadlock becomes unavoidable.

Detection and recovery lets deadlocks happen. The OS periodically runs an algorithm to find out whether one has occurred, and if it has, takes deliberate action — killing a process or forcibly taking back a resource — to break it.

The ostrich algorithm is doing nothing: ignoring the problem, on the reasoning that deadlocks are rare enough in practice, and the cost of preventing, avoiding, or detecting them (in complexity, and in constraints on how processes may use resources) is not worth paying for an event that might occur once a year and be fixed by a reboot. This is, bluntly, what most general-purpose operating systems actually do for most resources — UNIX and Windows do not run the Banker's algorithm on your open file handles. Only genuinely safety-critical or resource-starved systems pay the ongoing cost of avoidance.

PREVENTION: BREAKING EACH CONDITION

Since all four conditions are necessary, disabling any single one is enough. Each has a standard technique, and each has a real cost that explains why prevention is not simply "always the best option."

Breaking mutual exclusion. If a resource can be made shareable, there is nothing to contest. This genuinely works for some resources: a printer's physical print head is not shareable, but the printer's use CAN be made shareable by spooling — every process's output is written to a disk queue instead of to the device directly, and a single dedicated spooler process actually talks to the printer, feeding it one job at a time from the queue. Every requesting process gets an "instance" (a slot in the queue) immediately, with no waiting and no exclusion at the level the processes see. This does not generalise, though: a database row lock, or a critical section protecting shared memory, is non-shareable by its very meaning — allowing two processes to "share" it would produce wrong answers, not just contention. Mutual exclusion cannot be removed for a resource whose whole purpose is exclusivity.

Breaking hold-and-wait. Require a process to request every resource it will ever need in one atomic step before it starts running (or, alternatively, forbid it from holding anything while it makes a new request — it must release what it has first). Either way, a process is never simultaneously "holding something" and "waiting for something else," so hold-and-wait cannot arise. The cost is resource utilisation: a process might hold a resource for a long time before it actually gets around to using it, starving other processes of something sitting idle. A process also cannot know its full future resource needs in some programs (interactive ones, especially), making the all-at-once request awkward or impossible to state correctly in advance.

Breaking no-preemption. Let the OS forcibly take a resource from a waiting process — save its state, hand the resource to whoever needs it next, and restore the preempted process later. This directly negates the condition, since "cannot be taken away" is no longer true. It only works well for resources whose state is cheap and correct to save and restore: CPU registers, memory pages. It is a poor fit for a half-finished print job or a lock held mid-update to shared data, where forcing preemption mid-operation can corrupt work rather than merely delay it.

Breaking circular wait. Assign every resource type a fixed rank — a total order — and require every process to request resources only in strictly increasing rank order. If P1 already holds a resource ranked 5, it may only request resources ranked above 5 from then on. A cycle would need some process later in the chain to be waiting on a lower-ranked resource already held earlier in the chain, which directly violates the ordering rule — so no cycle can ever form. The cost is that a process needing resources out of their natural order of use must acquire the higher-ranked one earlier than it actually needs it (holding it idle in the meantime), and designing one consistent global order across independently written parts of a large system is itself real engineering work.

GATE TRAP: A question describing "spooling to a printer" is testing removal of mutual exclusion, not hold-and-wait — the giveaway is that the mechanism is about making a resource shareable, not about bundling requests. A question describing "acquire locks only in ascending address order" is circular wait, not no-preemption — the giveaway is the word ordering. Match the mechanism to the condition it structurally disables, not to surface vocabulary like "resource."

AVOIDANCE: SAFE, UNSAFE, AND DEADLOCKED STATES

Prevention is blunt: it rules out an entire condition for every process, all the time, whether or not that particular combination of requests would ever actually deadlock. Avoidance is more surgical — it looks at each request individually, at the moment it is made, and only refuses the ones that would actually create danger.

To do this it needs one extra piece of information beyond what prevention needs: each process's maximum possible claim on each resource type, declared in advance. This does not mean requesting everything up front (that would be hold-and-wait prevention again) — it only means the OS knows the ceiling each process might eventually reach, without knowing exactly when.

Call a state safe if there exists at least one order in which all currently-existing processes could be run to completion, one at a time, such that each process's remaining maximum need can always be met by what is currently free plus what earlier-finishing processes release. Call a state unsafe if no such order exists. Call a state deadlocked if some set of processes is already genuinely, permanently stuck.

[[FIG:deadlock-states]]

Every deadlocked state is unsafe — if processes are already stuck, plainly no order lets everyone finish. But the reverse is not true: an unsafe state is not necessarily deadlocked. Unsafe only means no order is GUARANTEED to let everyone finish, for every possible pattern of future requests. It is entirely possible that, in an unsafe state, the processes happen to request resources in a lucky order and everyone finishes anyway with no deadlock ever occurring. Unsafe is a risk, not a certainty.

KEY: Unsafe does not mean deadlocked. It means the OS cannot GUARANTEE deadlock will be avoided if it keeps granting requests freely from here — it might still turn out fine depending on what gets requested next, but the OS is no longer able to promise it will. Deadlock avoidance works by never entering an unsafe state in the first place, which is a strictly stronger guarantee than merely avoiding a deadlocked one.

GATE TRAP: "The system is in an unsafe state, so it must be heading for deadlock" is false and is a favourite wrong option. Unsafe only means the OS has lost its ability to guarantee safety against every possible future request pattern; whether deadlock actually happens still depends on what gets requested next. Safe is a guarantee; unsafe is merely the absence of one.

THE RESOURCE-ALLOCATION-GRAPH ALGORITHM

For the special case where every resource type has a single instance, avoidance can be done directly on the resource-allocation graph, using one new kind of edge: a claim edge, drawn as a dashed Pi ⇢ Rj, meaning Pi might request Rj at some point in the future, though it has not yet done so. Claim edges are declared in advance, exactly like the maximum-claim information the Banker's algorithm needs, just expressed graphically instead of numerically.

The rule: when a process's claim edge becomes an actual request (solid Pi → Rj) and the resource is currently free, do NOT simply grant it. Instead, check what the graph would look like if it were granted — that is, temporarily treat the edge as if it were already converted to an assignment edge Rj → Pi — and see whether the resulting graph, together with every remaining claim edge (treated as if it might also convert), contains a cycle. Grant the request only if no such cycle appears; otherwise, make Pi wait even though the resource is physically free right now.

Work through a concrete case. Two processes, P1 and P2; two single-instance resources, R1 and R2. Currently R1 is assigned to P1 (an assignment edge R1 → P1). R2 is currently free. There are two standing claim edges: P1 ⇢ R2 (P1 may need R2 later) and P2 ⇢ R1 (P2 may need R1 later).

Now P2 actually requests R2 — a solid edge P2 → R2 appears. R2 is free, so the naive answer would be "grant it immediately." Apply the algorithm instead:

1. Hypothetically convert P2 → R2 into an assignment edge R2 → P2, as if the request had been granted.

2. List every edge now present or still pending: the real assignment R1 → P1, the new hypothetical assignment R2 → P2, and the two claim edges P1 ⇢ R2 and P2 ⇢ R1, which have not converted yet but represent requests that could arrive at any time.

3. Trace whether following "holds, and might next want" leads back to where it started. P1 holds R1 and might claim R2; R2 would be held by P2, who might claim R1; R1 is held by P1. That closes a loop: P1 → (claim) R2 → P2 → (claim) R1 → P1.

4. Because this hypothetical graph contains a cycle, the algorithm denies the request. P2 must wait for R2, even though R2 is unallocated at this exact moment — granting it now would put the system one future request away from an unbreakable cycle, and the algorithm refuses to take that risk.

This is deliberately conservative: no deadlock is actually happening yet, and it is possible P1 never actually converts its claim into a real request, in which case R2 sat idle for nothing. That conservatism is the price of the single-instance graph algorithm being simple and cheap to run; for the general multiple-instance case, the finer-grained Banker's algorithm is needed instead, which is the rest of this chapter.

THE BANKER'S ALGORITHM: THE DATA IT NEEDS

The Banker's algorithm is the general-purpose avoidance algorithm, named for its resemblance to a bank deciding whether it can safely extend a loan without running out of cash if every borrower asked for their full credit limit at once. It works with resource types that have multiple instances, and it needs exactly four pieces of information, each a natural consequence of what "checking safety" requires.

Available is a vector with one entry per resource type, giving how many instances of that type are currently free — not allocated to anyone. This is the raw material the OS has on hand to satisfy new requests.

Max is a matrix: Max[i][j] is the maximum number of instances of resource type j that process i could EVER request over its whole lifetime, declared when the process starts. This is the extra information avoidance requires beyond what prevention needs — the ceiling on demand.

Allocation is a matrix: Allocation[i][j] is how many instances of resource type j process i currently holds right now. This changes every time a request is granted or a resource is released; Available and Allocation always move in exactly opposite directions for the same amount, since a resource is either free or held by someone.

Need is derived, not given directly: it is how much MORE process i could still ask for, over and above what it already holds.

Need[i][j] = Max[i][j] − Allocation[i][j]

This subtraction is the single most important line in the whole algorithm, because every subsequent step compares Need against Available, never Max or Allocation directly against Available — comparing the wrong pair is the most common computational mistake on this topic. Need is what a process might still come and ask for; Max already includes what it holds, so comparing Max to Available would wrongly ignore the fact that some of that demand has already been satisfied.

GATE TRAP: The safety check compares Need to Available, never Max to Available and never Allocation to Available on its own. Max counts resources the process ALREADY has as well as what it might still want; comparing Max directly against what is free double-counts the process's own holdings and gives the wrong answer.

KEY: Need = Max − Allocation. Compute this row for every process before doing anything else in a Banker's problem. Almost every arithmetic error in this topic comes from skipping this step and comparing the wrong matrix against Available.

THE SAFETY ALGORITHM, STEP BY STEP

The safety algorithm answers exactly one question: given the current Available, Allocation and Need, does at least one order exist in which every process can finish? It works by simulation — repeatedly pretending to run whichever process can be satisfied right now, and checking whether that pretend-run eventually gets everyone through.

[[FIG:bankers-safety]]

The mechanics: keep a working copy of Available, called Work, and a Finish flag for each process, initially all false.

1. Set Work = Available. Mark every process as not finished.

2. Look for any unfinished process i whose entire Need row is component-wise less than or equal to Work. If no such process exists, stop: the state is unsafe.

3. Having found one, pretend it runs to completion: it uses its Need, then releases everything it holds — both what it already had (Allocation[i]) and what it just used and gave back. Add Allocation[i] back into Work, and mark process i finished.

4. Repeat from step 2, scanning the still-unfinished processes against the new, larger Work.

5. If every process eventually gets marked finished, the state is safe, and the order in which processes were marked finished is a safe sequence — a genuine, guaranteed-workable order for everyone to complete.

Trace this on the standard example: five processes P0–P4, three resource types A, B, C, with total system instances (10, 5, 7).

Allocation: P0 = (0,1,0), P1 = (2,0,0), P2 = (3,0,2), P3 = (2,1,1), P4 = (0,0,2).
Max: P0 = (7,5,3), P1 = (3,2,2), P2 = (9,0,2), P3 = (2,2,2), P4 = (4,3,3).

First, derive Need = Max − Allocation for every process, since nothing else can be checked correctly without it:

Need P0 = (7−0, 5−1, 3−0) = (7,4,3)
Need P1 = (3−2, 2−0, 2−0) = (1,2,2)
Need P2 = (9−3, 0−0, 2−2) = (6,0,0)
Need P3 = (2−2, 2−1, 2−1) = (0,1,1)
Need P4 = (4−0, 3−0, 3−2) = (4,3,1)

Available is what remains after subtracting total Allocation, (7,2,5), from the total (10,5,7): Available = (3,3,2).

6. Work = (3,3,2). Scan for a process whose Need fits. P0's Need (7,4,3) fails immediately on A. P1's Need (1,2,2) fits: 1≤3, 2≤3, 2≤2. Run P1, add its Allocation (2,0,0): Work = (5,3,2).

7. Scan again. P3's Need (0,1,1) fits (5,3,2). Run P3, add (2,1,1): Work = (7,4,3).

8. Scan again. P4's Need (4,3,1) fits (7,4,3). Run P4, add (0,0,2): Work = (7,4,5).

9. Scan again. P0's Need (7,4,3) now fits (7,4,5) exactly on A. Run P0, add (0,1,0): Work = (7,5,5).

10. Scan again. P2's Need (6,0,0) fits (7,5,5). Run P2, add (3,0,2): Work = (10,5,7).

All five processes finished. The state is safe, and <P1, P3, P4, P0, P2> is one valid safe sequence.

THE RESOURCE-REQUEST ALGORITHM

The safety check above tells you whether the CURRENT state is safe. What you actually need, moment to moment, is to decide whether to grant a NEW request without breaking that safety. The resource-request algorithm wraps the safety check in two cheap filters first.

For a request vector Request from process i:

1. Check Request ≤ Need[i]. If any component exceeds what the process declared it might still want, the request is simply invalid — a process cannot ask for more than its own declared maximum allows, so this is an error, not something to evaluate further.

2. Check Request ≤ Available. If any component exceeds what is currently free, the process must wait regardless of safety — there is nothing to grant.

3. If both checks pass, tentatively apply the request as if it were granted: subtract Request from Available, add it to Allocation[i], and subtract it from Need[i].

4. Run the full safety algorithm on this new hypothetical state.

5. If the hypothetical state is safe, make the grant permanent. If it is unsafe, undo the tentative change and make the process wait — even though both cheap filters passed.

Granted example. Continuing the system above, P1 requests (1,0,2). Check against Need P1 = (1,2,2): 1≤1, 0≤2, 2≤2 — fits. Check against Available (3,3,2): 1≤3, 0≤3, 2≤2 — fits. Tentatively grant: Available becomes (2,3,0); P1's Allocation becomes (3,0,2); P1's new Need becomes (0,2,0).

Re-run safety on this hypothetical state. Work = (2,3,0). P1's new Need (0,2,0) fits: run P1, add (3,0,2), Work = (5,3,2). P3's Need (0,1,1) fits: run P3, add (2,1,1), Work = (7,4,3). P0's Need (7,4,3) fits exactly: run P0, add (0,1,0), Work = (7,5,3). P2's Need (6,0,0) fits: run P2, add (3,0,2), Work = (10,5,5). P4's Need (4,3,1) fits: run P4. Every process finishes — safe sequence <P1, P3, P0, P2, P4>. The request is granted.

Denied example. From the ORIGINAL state (before P1's request above), suppose P4 requests (3,3,0) instead. Check against Need P4 = (4,3,1): 3≤4, 3≤3, 0≤1 — fits. Check against Available (3,3,2): 3≤3, 3≤3, 0≤2 — fits. Both cheap filters pass, so it looks fine so far — but do not stop here.

Tentatively grant: Available becomes (0,0,2); P4's Allocation becomes (3,3,2); P4's new Need becomes (1,0,1). Run safety on this hypothetical state. Work = (0,0,2). Check every unfinished process: P0 Need (7,4,3) fails on A. P1 Need (1,2,2) fails on A (1 > 0). P2 Need (6,0,0) fails on A. P3 Need (0,1,1) fails on B (1 > 0). P4's own new Need (1,0,1) fails on A (1 > 0). No process's Need fits Work — the scan finds nobody.

The hypothetical state is unsafe. Even though P4's request passed both quick filters, granting it would leave the system with no guaranteed way for every process to finish, so the resource-request algorithm denies it. P4 must wait, and its Allocation and the real Available are left unchanged, exactly as they were before the request was even considered.

GATE TRAP: Passing the Request ≤ Need and Request ≤ Available checks is necessary but not sufficient to grant a request. Both can pass and the full safety check can still fail, as in the P4 example above — the quick filters only rule out requests that are obviously wrong; they cannot rule out ones that are merely dangerous.

WHY SAFE SEQUENCES ARE NOT UNIQUE

The safety algorithm's step 2 says "look for ANY unfinished process whose Need fits" — if more than one qualifies at some point, any of them may be picked, and different valid choices can produce different, equally correct safe sequences. In the original trace above, after P1 and P3 finish, both P4 and — once P4 also finishes — P2 become eligible in more than one workable order.

Check it directly: instead of running P4 next after P1 and P3 (Work = (7,4,3)), try P2 first. Need P2 = (6,0,0) fits (7,4,3): run P2, add (3,0,2), Work = (10,4,5). Now P4's Need (4,3,1) fits: run P4, add (0,0,2), Work = (10,4,7). Now P0's Need (7,4,3) fits: run P0. Every process finishes again — <P1, P3, P2, P4, P0> is a second, equally valid safe sequence for exactly the same starting state.

REMEMBER: A safe sequence is a proof that a safe order exists, not the unique order that will actually happen. If an exam option shows a different valid order from the one you found first, do not assume it is wrong — check it independently against the same Need and Available values, because more than one sequence can genuinely be correct.

DEADLOCK DETECTION: THE WAIT-FOR GRAPH

Avoidance pays an ongoing cost: every process must declare its maximum need up front, and every single request runs a full safety check before being granted. Detection takes the opposite bet — let requests be granted freely, with no advance declarations and no per-request safety check, and instead periodically ask "has a deadlock actually happened?"

For the special case of resources with a single instance each, this question has a clean graphical answer: strip the resource-allocation graph down to just the processes, drawing an edge Pi → Pj whenever Pi is waiting for a resource currently held by Pj — collapsing "waits for a resource that Pj holds" into a direct process-to-process edge. This is the wait-for graph. Exactly as with the single-instance resource-allocation graph, a cycle in the wait-for graph is both necessary and sufficient for deadlock, because single-instance holding is unconditional — if Pj holds the only instance and does not finish, Pi genuinely never gets it. Finding a deadlock reduces to a standard cycle-detection pass over this graph.

DEADLOCK DETECTION WITH MULTIPLE INSTANCES

When resource types have multiple instances, the wait-for graph's simple cycle check is not enough, for the same reason a resource-allocation-graph cycle was not enough earlier: a resource on the cycle might have a free instance elsewhere. The detection algorithm for this case is, in fact, essentially the Banker's safety algorithm run with one crucial difference: it uses each process's currently OUTSTANDING request instead of its Need, because there is no advance Max declaration to compute Need from at all.

Available, Allocation and Request (what each process is asking for right now, not its lifetime maximum) are the three inputs. The algorithm:

1. Set Work = Available. Mark a process finished immediately if its current Allocation is entirely zero (it holds nothing, so it cannot be part of a wait, and does not need a request check).

2. Look for an unfinished process i whose Request row is component-wise ≤ Work. If none exists, stop.

3. Pretend it finishes: add its Allocation to Work, mark it finished.

4. Repeat from step 2.

5. When no more processes can be marked finished, every process still unfinished is part of a deadlocked set — genuinely, provably stuck, since no order exists in which it could ever be satisfied from the resources this simulation shows becoming available.

Trace the classic example. Five processes P0–P4, three resource types with total instances (7,2,6), currently fully allocated, so Available = (0,0,0).

Allocation: P0 = (0,1,0), P1 = (2,0,0), P2 = (3,0,3), P3 = (2,1,1), P4 = (0,0,2).
Request: P0 = (0,0,0), P1 = (2,0,2), P2 = (0,0,1), P3 = (1,0,0), P4 = (0,0,2).

11. Work = (0,0,0). No process holds nothing, so no one is finished automatically. Scan requests: P0's Request (0,0,0) is ≤ (0,0,0) — trivially satisfied (it is asking for nothing more). Run P0, add its Allocation (0,1,0): Work = (0,1,0).

12. Scan the remaining processes. P1's Request (2,0,2) fails on A (2 > 0). P2's Request (0,0,1) fails on C (1 > 0). P3's Request (1,0,0) fails on A (1 > 0). P4's Request (0,0,2) fails on C (2 > 0). Nobody's request fits Work = (0,1,0).

13. No further process can be marked finished. Stop.

P0 is not deadlocked — it finished. But P1, P2, P3 and P4 are all part of a deadlocked set: each is waiting for resources that only the other three (equally stuck) processes can release, and the simulation shows no order in which any of them can ever be satisfied from what P0's completion made available.

WHEN TO RUN THE DETECTION ALGORITHM

Running the detection algorithm has a real cost — proportional to the number of processes and resource types — so an OS does not run it after every single request. Two natural triggers are used instead.

Run it whenever a request cannot be immediately granted, since that is exactly when a new circular wait could be forming — checking right at the moment of suspicion catches deadlocks as early as possible, at the cost of running the check often if requests are frequently denied.

Run it on a fixed schedule instead — every N minutes, or whenever CPU utilisation drops below some threshold for a sustained period, on the reasoning that idle CPUs with runnable-looking processes stuck in the ready state are a symptom worth investigating. This trades detection speed for a much lower overhead, appropriate when deadlocks are believed to be rare.

RECOVERY: PROCESS TERMINATION

Once a deadlocked set is found, it has to be broken from outside the model, since nothing inside normal execution can do it. Two families of recovery exist, and process termination is the blunter one.

Terminating all deadlocked processes at once is simple and certain — it definitely breaks the deadlock, since every process holding a contested resource is gone and everything it held is released. The cost is that all of that work is lost, including any of it that had nothing to do with the actual circular wait.

Terminating one process at a time is more careful: kill one member of the deadlocked set, re-run the detection algorithm, and stop as soon as it reports no deadlock — often a single well-chosen victim frees enough resources to unravel the whole chain, since the other waiters can then proceed and release their own holdings. This does more detection-algorithm runs but destroys less work.

Choosing the victim in the one-at-a-time approach is itself a small optimisation problem, typically weighing: how much CPU time the process has already invested (less invested is a cheaper loss), how many resources it holds and of what types (a process holding a lot that others need is a better candidate to remove), how much more it needs to finish, whether it is interactive or batch (killing something a user is staring at is more visible and disruptive), and how many times it has already been picked as a victim before (repeatedly picking the same process risks starving it — a process could keep almost finishing, get killed every time to resolve a deadlock, and never actually complete).

RECOVERY: RESOURCE PREEMPTION

The second recovery family avoids destroying entire processes: instead, forcibly take a resource back from one process in the deadlocked set and give it to another, exactly as in the no-preemption prevention technique, but applied reactively after detection rather than as a blanket policy.

Three practical problems come with this. Selecting a victim needs the same kind of cost-based reasoning as choosing which process to kill. Rollback: the preempted process cannot simply continue from where it was, because it no longer has a resource it was mid-use of — it typically must be rolled back to some earlier safe point (commonly, all the way back to its start, since tracking exactly how far a partial rollback needs to go is itself hard) and restarted from there once the resource is available again. Starvation: if the cost-based victim selection keeps picking the same low-cost process every time, that process can be preempted over and over and never make forward progress, so a practical scheme must also guarantee a process is eventually left alone — for instance, by including "number of times already rolled back" as a factor.

HOW MANY RESOURCES GUARANTEE SAFETY

A different, purely numerical question follows naturally from everything above: given how many processes exist and how much each might maximally need, how many total instances of a resource type must the system provide so that deadlock is IMPOSSIBLE regardless of how requests happen to be timed — no avoidance algorithm required at all, just enough raw supply?

Consider n processes, each with a maximum need of k instances of one resource type. Deadlock via this resource requires every process to be simultaneously holding something while waiting for more — the hold-and-wait shape. The absolute worst case the resource pool has to survive is every process holding as much as it possibly can WHILE STILL NOT BEING DONE — that is, k−1 instances each (holding all k would mean the process is already finished and needs nothing more, which cannot cause a wait).

[[FIG:min-resources]]

14. If every one of the n processes holds exactly k−1 instances, the total committed is n(k−1).

15. If the total supply is EXACTLY n(k−1), every instance is accounted for, and every process still needs exactly one more to finish. No instance is free anywhere. Every process is stuck waiting on a resource that only another equally-stuck process could release — an unavoidable circular wait, a genuine deadlock, entirely independent of scheduling.

16. Add one more instance, making the total n(k−1)+1. Now the same worst case — every process holding k−1 — cannot fully use up the supply; at least one instance is left over. That leftover instance can be given to whichever process asks for it next, letting that process reach its maximum, finish, and release everything it held, which frees up enough for the next process, and so on. Deadlock is now structurally impossible, not merely unlikely.

R (minimum instances for guaranteed safety) = n(k − 1) + 1

Work the example matching the figure above: 3 processes, each with a maximum need of 4 units of one resource type. Minimum safe total = 3(4−1)+1 = 3(3)+1 = 10. With only 9, all three processes could hold 3 units each (using all 9), each still needing 1 more — a genuine, unavoidable deadlock. With 10, at least one process can always reach its maximum of 4 and finish.

GATE TRAP: The formula is n(k−1)+1, not nk or n(k−1). The "−1" is the whole content of the derivation — it comes from the worst case where every process holds one LESS than its maximum, since holding exactly the maximum would mean that process is already finished. Forgetting the −1, or forgetting the trailing +1 that guarantees at least one spare instance, gives a number that looks plausible but is wrong.

THE INVERSE QUESTION AND UNEQUAL NEEDS

The same relationship runs the other way: given a fixed total supply R and a fixed per-process maximum k, what is the LARGEST number of processes n that can be guaranteed never to deadlock? Since safety requires R ≥ n(k−1)+1, rearranging for n gives n ≤ (R−1)/(k−1), and since n must be a whole number, take the floor.

n(max, guaranteed safe) = floor[ (R − 1) / (k − 1) ]

For example, with R = 10 total instances and each process needing at most k = 3: n ≤ (10−1)/(3−1) = 9/2 = 4.5, so n = 4 is the largest guaranteed-safe number of processes. Check it: 4 processes at n(k−1)+1 = 4(2)+1 = 9 ≤ 10, safe. Try n = 5: 5(2)+1 = 11 > 10 — not guaranteed, so 5 processes could deadlock in the worst case. The floor is doing real work here: it is the point where the formula first fails to fit inside the available supply.

The formula also generalises to processes with DIFFERENT maximum needs, since the derivation never actually required them to be equal — it only required each process's worst-case holding to be one less than ITS OWN maximum. For processes with maxima Max_1, Max_2, ..., Max_n of the same resource type, the worst case is each process holding (Max_i − 1), and the same argument gives:

R (minimum, unequal needs) = (Max_1 − 1) + (Max_2 − 1) + ... + (Max_n − 1) + 1

Work an example: four processes with maximum needs 3, 4, 5 and 2 units of the same resource type. Sum of (Max_i − 1) = (3−1)+(4−1)+(5−1)+(2−1) = 2+3+4+1 = 10. Minimum safe total = 10+1 = 11. With only 10, the worst case has every process holding exactly one less than its maximum — 2, 3, 4 and 1 units respectively, summing to exactly 10, using up the entire supply — with every process still needing exactly one more unit, and nothing free anywhere: an unavoidable deadlock. With 11, at least one process can always reach its own maximum and complete, freeing enough for the rest to follow.

WORKED PROBLEMS

Each of these follows the same running patterns the questions use. Work through the arithmetic, not just the final answer.

1. A system has 3 processes and 2 resource types, R1 and R2, with 7 total instances of R1 and 6 of R2. Allocation is P0=(2,1), P1=(1,3), P2=(1,1). Max is P0=(5,2), P1=(2,4), P2=(4,3). Is the state safe, and if so, what is a safe sequence?
   Need = Max − Allocation: P0 = (5−2, 2−1) = (3,1). P1 = (2−1, 4−3) = (1,1). P2 = (4−1, 3−1) = (3,2). Total Allocation = (2+1+1, 1+3+1) = (4,5); Available = (7,6) − (4,5) = (3,1). Scan: P0's Need (3,1) ≤ (3,1) — fits exactly. Run P0, add (2,1): Work = (5,2). Scan again: P1's Need (1,1) ≤ (5,2), fits. Run P1, add (1,3): Work = (6,5). Scan again: P2's Need (3,2) ≤ (6,5), fits. Run P2. All finish — safe, with sequence <P0, P1, P2>.

2. Using the same system, could P2 have gone first instead of P0?
   P2's Need is (3,2); the initial Available is (3,1). Check component-wise: 3≤3 on R1, but 2≤1 is false on R2. P2's Need does not fit the initial Available, so P2 cannot be the first process to finish in any safe sequence for this state — it must wait for R2 to be freed by someone else first. (P1 first also works, by the same kind of check: Need (1,1) ≤ (3,1) fits, giving the second valid sequence <P1, P0, P2>.)

3. Using the system from problem 1, suppose P2 requests (0, 3) additional units. Should this be granted?
   Check against P2's Need (3,2): the R2 component of the request, 3, exceeds Need's R2 component of 2. The request already exceeds what P2 declared it might ever need, so it is invalid and must be refused immediately — no safety check is even required, since a process cannot legitimately ask for more than its own declared maximum allows.

4. Five processes, three resource types, Available = (3,3,2). Need: P0=(7,4,3), P1=(1,2,2), P2=(6,0,0), P3=(0,1,1), P4=(4,3,1); Allocation: P0=(0,1,0), P1=(2,0,0), P2=(3,0,2), P3=(2,1,1), P4=(0,0,2). Process P4 requests (3,3,0). Should it be granted?
   Check against Need P4 = (4,3,1): 3≤4, 3≤3, 0≤1 — fits. Check against Available (3,3,2): 3≤3, 3≤3, 0≤2 — fits. Both quick filters pass, so tentatively grant: Available becomes (0,0,2), P4's new Need becomes (1,0,1). Run safety on Work=(0,0,2): P0 Need (7,4,3) fails on A; P1 Need (1,2,2) fails on A; P2 Need (6,0,0) fails on A; P3 Need (0,1,1) fails on B; P4's new Need (1,0,1) fails on A. No process fits — the hypothetical state is unsafe. The request must be denied, even though it passed both cheap filters.

5. Four processes each have a maximum requirement of 6 units of a single resource type. What is the minimum total number of instances that guarantees the system can never deadlock, and what is the largest number of such processes that 20 instances could safely support?
   Minimum for 4 processes at k=6: n(k−1)+1 = 4(5)+1 = 21. For the second part, with R=20 and k=6: n ≤ (R−1)/(k−1) = 19/5 = 3.8, so the largest guaranteed-safe n is 3. Check: 3 processes at 3(5)+1 = 16 ≤ 20, safe with 4 to spare; 4 processes would need 21, which 20 cannot guarantee.

6. Six processes have maximum requirements of 2, 3, 5, 4, 2 and 6 units respectively of the same resource type. What is the minimum total number of instances needed to guarantee no deadlock?
   Sum of (Max_i − 1): (2−1)+(3−1)+(5−1)+(4−1)+(2−1)+(6−1) = 1+2+4+3+1+5 = 16. Minimum safe total = 16+1 = 17. With only 16, every process could hold one less than its maximum (1,2,4,3,1,5, summing to exactly 16), each still needing one more, with nothing free anywhere — an unavoidable deadlock.

7. Two single-instance resource types, R1 and R2, each with 2 instances (so 4 units total across both types). R1's two instances are held one each by P1 and P2. R2's instances: one is held by P2, one is free. P1 has a pending request for R2; P2 has a pending request for R1. Analyse whether this is deadlocked.
   The graph shows a cycle P1 → R2 → P2 → R1 → P1, but R2 still has a free instance. Since P1's pending request is specifically for R2, the OS can grant that free instance to P1 directly, with no need for P2 to release anything. P1 then finishes and releases both of its holdings, which satisfies P2's request for R1. The cycle exists on paper but the system is not actually deadlocked, since the free instance provides a way out.

8. A print spooler writes every process's output to a disk queue rather than letting processes write to the printer device directly; a single spooler process then feeds the queue to the physical printer one job at a time. Which Coffman condition does this scheme break, and which condition would remain unaffected if the OS instead let the spooler forcibly cancel and restart a print job partway through?
   Spooling turns the printer, as seen by requesting processes, into a shareable resource — every process gets a queue slot immediately with no waiting and no exclusive hold on the physical device from the process's point of view. This breaks mutual exclusion. Forcibly cancelling a job partway through would instead be an attempt to break no-preemption — but this is a poor fit here, since a half-printed job cannot simply be resumed from where it stopped without corrupting the printed output, illustrating why preemption prevention only suits resources whose state is cheap and correct to save and restore.

9. Five processes, three resource types, with total instances (7,2,6), currently Available = (0,0,0). Allocation: P0=(0,1,0), P1=(2,0,0), P2=(3,0,3), P3=(2,1,1), P4=(0,0,2). Current outstanding requests: P0=(0,0,0), P1=(2,0,2), P2=(0,0,1), P3=(1,0,0), P4=(0,0,2). Run the detection algorithm and identify any deadlocked processes.
   Work = (0,0,0). P0's Request (0,0,0) is trivially satisfied; run P0, add its Allocation (0,1,0): Work = (0,1,0). Scan the rest: P1's Request (2,0,2) fails on A; P2's Request (0,0,1) fails on C; P3's Request (1,0,0) fails on A; P4's Request (0,0,2) fails on C. None fit Work = (0,1,0), and no further process can be marked finished. P1, P2, P3 and P4 form a deadlocked set; P0 is not part of it, since it was able to finish.

WHAT TO CARRY INTO THE NEXT CHAPTER

Every idea in this chapter was really about one question: what happens when several things share a limited resource pool over time, and how far ahead does the OS need to plan to keep that sharing from freezing solid. Memory management, next, asks a version of the same question about the single most contested resource of all — physical memory — where the "instances" are page frames, the "requests" are page faults, and the discipline needed to avoid disaster is, once again, deciding in advance how much you can safely promise before you promise it.
`
};
