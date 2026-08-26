window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['os'] = {
  subject: 'Operating Systems',
  topics: [
    {
      id: 'os-processes',
      name: 'Processes & Threads',
      theory: {
        intro: 'A process is a program in execution -- it owns memory, CPU state, and OS resources, distinct from the static program sitting on disk. GATE tests this topic heavily through fork() system-call tracing (counting how many processes or print statements result), process state transitions, and the difference between processes and threads. Expect one to two questions almost every year, often a fork()-counting numerical that trips up students who forget that child processes also execute code after the fork point. Understanding the process control block (PCB), context-switch cost, and multithreading models (many-to-one, one-to-one, many-to-many) rounds out this area. This topic is foundational -- shaky understanding here costs marks later in scheduling and synchronization too, since both build directly on process and thread concepts.',
        core: 'A process moves through a well-defined set of states during its lifetime: New (being created), Ready (waiting for CPU), Running (executing on CPU), Waiting/Blocked (waiting for I/O or an event), and Terminated (finished). Transitions are controlled by the scheduler and dispatcher -- Ready to Running happens via dispatch, Running to Ready happens on preemption (e.g. timer interrupt), Running to Waiting happens on an I/O or wait call, and Waiting to Ready happens only once the awaited event completes. A process can never move directly from Waiting to Running -- it must pass through Ready first, since the scheduler still has to decide, among all ready processes, who actually gets the CPU next. This is a favourite GATE trap: options often claim a direct Waiting-to-Running arrow.\n\nEvery process is represented by a Process Control Block (PCB), a kernel structure holding everything needed to suspend and later resume the process exactly where it left off. Typical PCB fields include:\n• Process ID (PID) and parent PID\n• Process state\n• Program counter (address of next instruction)\n• CPU registers and stack pointer\n• CPU scheduling information (priority, queue pointers)\n• Memory management information (page or segment tables, base/limit registers)\n• Accounting information (CPU time used, limits)\n• I/O status information (open files, allocated devices)\n\nA context switch saves the PCB of the currently running process and loads the PCB of the next one. It is pure overhead -- no useful instruction of either process executes during the switch -- so schedulers try to minimise switching frequency when throughput matters, though responsiveness sometimes demands frequent switches (as in Round Robin). Context-switch time depends on hardware support (register count, cache/TLB flush cost) and GATE numericals sometimes fold a fixed switch cost into scheduling computations.\n\nThreads are the unit of CPU scheduling within a process. Threads of the same process share the code segment, data segment, heap, and open files, but each has its own stack, register set, and program counter. Thread creation and switching between threads of the same process is cheaper than between processes because no address-space (page table) switch is required, so the TLB need not be flushed. User-level threads are managed by a library with no kernel awareness -- fast to create and switch, but the whole process blocks if one thread makes a blocking system call, and the kernel cannot run its threads in true parallel on separate cores. Kernel-level threads are managed directly by the OS -- costlier per operation since each needs a system call, but they allow true parallelism and one thread blocking does not stall the others. Mapping models: many-to-one (many user threads onto one kernel thread -- no true parallelism), one-to-one (each user thread maps to its own kernel thread -- true parallelism, costlier creation), and many-to-many (multiplexes m user threads onto n <= m kernel threads, balancing both).\n\nA system call is the controlled mechanism by which a user process requests a kernel service (I/O, process creation, memory allocation). It triggers a trap that switches the CPU from user mode to kernel mode, executes the requested routine, then switches back -- unlike an ordinary function or library call, which never changes privilege mode. fork() is a system call that creates a near-identical copy of the calling process: the child gets a duplicate address space and continues execution from the very statement right after the fork() call, not from the start of main(). fork() returns twice -- the child\\u2019s PID (positive) in the parent, and 0 in the child (negative on failure). Because both parent and child independently execute every subsequent statement, code with multiple or looped fork() calls creates a number of processes that grows combinatorially, which is exactly why fork()-counting questions are a GATE staple: you must trace every branch of execution, not just count fork() calls.',
        strategy: 'For fork()-counting questions, draw a small tree: the root is the original process, and every fork() call adds one child edge to every process that reaches that line. The single most useful rule: n sequential (unconditional) fork() calls, each reached by every surviving process, produce 2^n total processes -- because every existing process at that point also executes the same line. For a loop for(i=0;i<n;i++) fork();, the classic result is 2^n total processes after the loop (2^n - 1 new ones), since each iteration doubles the surviving process count. Trace much more carefully when fork() sits inside an if based on its own return value -- only the selected branch (child sees 0, parent sees nonzero) continues, which breaks the simple doubling for that call and forces a manual process-by-process trace. A frequent trap: questions ask how many times a printf() executes rather than how many processes exist -- a printf() placed after all the forks executes once per surviving process, but one placed before an early fork() may already have run once in the parent before the split. Also remember: only one process can be Running per core at a time, though many can be Ready simultaneously, and a thread context switch skips the memory-map switch that a process context switch requires -- this single fact answers several conceptual questions about why threads are called lightweight. Worked mini-example: if(fork()==0){fork();} fork(); -- P0 forks C1; P0 (nonzero) skips the if, C1 (zero) forks C2; now {P0,C1,C2} all reach the final unconditional fork(), each producing one child, giving 6 processes total. Missing that C2 also survives to hit the final fork() is the single most common error on this pattern.'
      },
      questions: [
        {
          id: 'os-processes-q1',
          q: 'Which one of the following process-state transitions is NOT valid in a standard operating system?',
          options: ['Ready to Running', 'Running to Waiting', 'Waiting to Running', 'Running to Ready'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The scheduler moves a process from Ready to Running by dispatching it onto the CPU, and from Running back to Ready when it is preempted (e.g., by a timer interrupt) or voluntarily yields. When a process needs to wait for an event or I/O completion, it moves from Running to Waiting, and only once that event actually completes does it move to Ready again -- never directly to Running. This is because the scheduler must still decide, based on priority and the states of all other ready processes, which one gets the CPU next; a process cannot resume execution the instant its I/O completes if the CPU is busy with something else. Hence Waiting to Running directly is impossible, making that the invalid transition.'
        },
        {
          id: 'os-processes-q2',
          q: 'Which of the following is NOT typically stored in a process control block (PCB)?',
          options: ['Program counter value', 'Saved CPU register values', 'Compiler symbol table', 'List of open files'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The PCB holds everything the OS needs to suspend a process and resume it later exactly where it stopped: the program counter, saved CPU register values, process state, scheduling information, memory management data, accounting information, and the list of open files and allocated I/O devices. A compiler symbol table, in contrast, is a compile-time structure used by the compiler to resolve identifiers to types and addresses -- it plays no role in describing a live, running process\\u2019s execution context, and the OS never needs it to preserve or restore a process. That is why it is not part of the PCB, unlike the other three genuinely runtime-relevant items listed.'
        },
        {
          id: 'os-processes-q3',
          q: 'Why is a context switch generally considered pure overhead from the point of view of useful computation?',
          options: ['It always requires disk I/O to complete', 'No useful instruction of either process is executed while the switch itself happens', 'It always triggers a page fault', 'It takes a fixed amount of time regardless of hardware'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'During a context switch, the OS saves the complete execution context (PCB) of the currently running process and loads the saved context of the next process to run. No instruction belonging to either process actually executes while this bookkeeping happens -- the CPU spends that time purely on save and restore operations and possibly cache or TLB flushing, none of which advances either process\\u2019s computation. This is why context switching is classified as pure overhead: it must be paid to enable multiprogramming and fair CPU sharing, but contributes zero useful work by itself. Options claiming mandatory disk I/O, a guaranteed page fault, or a hardware-independent fixed cost are all false generalisations; the actual cost varies with hardware.'
        },
        {
          id: 'os-processes-q4',
          q: 'A single process executes: for (i = 0; i < 2; i++) fork(); with no other conditional logic. How many total processes exist after the loop finishes, including the original?',
          options: ['2', '3', '4', '8'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'After iteration i=0, the original process and its one child both exist (2 processes), and both continue on to i=1 in their own memory copy. In iteration i=1, both of those 2 processes call fork() again, each producing one more child, giving 2 + 2 = 4 processes total once the loop finishes. In general, n sequential unconditional fork() calls encountered by every surviving process produce 2^n total processes; here n = 2, so 2^2 = 4. This total includes the original process, so the number of newly created child processes alone would be 3, but the question asks for the grand total, which is 4.'
        },
        {
          id: 'os-processes-q5',
          q: 'A process executes: fork(); fork(); fork(); printf("hi");  How many times does "hi" get printed in total?',
          options: ['3', '6', '8', '9'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The three sequential, unconditional fork() calls are each executed by every process that reaches that line, so following the same doubling logic as three loop iterations, the total number of processes after all three calls is 2^3 = 8. The printf("hi") statement lies after all three fork() calls and is reached independently by each of these 8 processes, since each has its own copy of the program counter continuing right after the last fork(); so it executes once per process, giving 8 total prints. A common mistake is to add instead of multiply (getting 2x3=6), forgetting that each fork() doubles, rather than increments, the surviving process count.'
        },
        {
          id: 'os-processes-q6',
          q: 'A process executes: if (fork() == 0) { fork(); } fork();  How many total processes exist after this code finishes, including the original?',
          options: ['4', '5', '6', '8'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Trace step by step. P0 (original) calls fork(), producing C1; P0 sees a nonzero return so it skips the if-block, while C1 sees 0 and enters the if-block, calling fork() again to produce C2. At this point the live processes are {P0, C1, C2} -- 3 processes. Then the final, unconditional fork() statement executes in all three, since it lies outside the if and is reached by everyone: P0 to C3, C1 to C4, C2 to C5. This brings the total to 6 processes (P0, C1, C2, C3, C4, C5). The trap is forgetting that C2, itself created inside the conditional branch, also survives to execute the final fork(), which causes many students to undercount to 4 or 5.'
        },
        {
          id: 'os-processes-q7',
          q: 'Which of the following correctly describes a drawback of the pure many-to-one (user-level) threading model?',
          options: ['User-level thread switching requires a system call', 'If one user-level thread issues a blocking system call, the entire process blocks', 'Kernel-level threads cannot be scheduled on multiple cores', 'User-level threads allow true parallel execution on a multicore machine'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'User-level threads are implemented and scheduled entirely by a library in user space, invisible to the kernel scheduler; the kernel only sees and schedules the single underlying kernel thread for the whole process. Consequently, if any one user-level thread issues a blocking system call, the kernel blocks that entire process, stalling every other user-level thread within it too, since the kernel has no knowledge of the other threads to reschedule around the blocked one. This is the major drawback of the pure many-to-one model. Kernel-level threads, by contrast, are individually visible to the kernel and can be scheduled on separate cores for true parallelism, and switching them does require a kernel-mode trap, making option A the reverse of the truth.'
        },
        {
          id: 'os-processes-q8',
          q: 'Which threading model maps many user-level threads onto a single kernel-level thread?',
          options: ['One-to-one', 'Many-to-one', 'Many-to-many', 'One-to-many'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The many-to-one model multiplexes many user-level threads onto a single kernel-level thread, so the kernel scheduler ever sees only one schedulable entity for the whole process. Thread management (creation, switching, synchronisation) happens entirely in user space via a thread library, making it very fast, but it sacrifices true parallelism -- only one thread of that process can ever run at a time, even on a multicore machine, and any blocking system call by one thread blocks all of them. This contrasts with one-to-one (each user thread has its own kernel thread, enabling parallelism but costlier creation) and many-to-many (a hybrid multiplexing m user threads onto n <= m kernel threads).'
        },
        {
          id: 'os-processes-q9',
          q: 'Why is creating a new thread within an existing process generally cheaper than creating a new process with fork()?',
          options: ['Threads do not need any register state saved', 'Threads share the address space, so no new page table needs to be set up', 'Threads always execute purely in kernel mode', 'Threads never require a context switch'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Creating a new process with fork() requires the OS to duplicate the parent\\u2019s entire address space, or at least set up fresh copy-on-write page-table structures referencing it. Creating a new thread within the same process requires no such step: all threads of a process share the same code, data, and heap, and hence the same page table, so a new thread only needs its own stack and its own register and program-counter state allocated. This is precisely why thread creation, and later thread-to-thread context switches, are cheaper -- no address-space (page table) switch is needed, so the TLB does not need to be flushed either, unlike a full process context switch. Threads still have registers and can be context-switched, so options A, C, and D are all false.'
        },
        {
          id: 'os-processes-q10',
          q: 'What is the key mechanism that distinguishes a system call from an ordinary user-space function call?',
          options: ['It executes a trap instruction that switches the CPU from user mode to kernel mode and back', 'It must be written entirely in assembly language', 'It never returns a value to the caller', 'It can only be invoked from within the operating system kernel itself'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'A regular function call transfers control within the same program and privilege level, using a simple call and return via the stack -- no mode change occurs. A system call, by contrast, is the mechanism a user process uses to request a kernel service such as I/O or process creation; it executes a special trap instruction that switches the CPU from user mode to kernel (supervisor) mode so the OS can safely perform privileged operations, and then switches back to user mode before returning control to the caller. This user-to-kernel-to-user transition, absent in ordinary calls, is the defining feature, making the other listed options -- language restriction, no return value, kernel-only invocation -- all false.'
        },
        {
          id: 'os-processes-q11',
          q: 'A process is called a "zombie" when:',
          options: ['It is currently running with the highest scheduling priority', 'It has terminated but its exit status has not yet been collected by the parent via wait()', 'It has no parent process at all', 'It is blocked waiting for an I/O operation indefinitely'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A process that has finished executing (called exit()) but whose parent has not yet called wait() to collect its exit status is called a zombie. The OS keeps a minimal entry, mainly the PID and exit status, in the process table for such a process until the parent reaps it, precisely so that exit status remains available; the process itself holds essentially no other resources at this point. If the parent never calls wait() while it is still alive itself, the zombie entry lingers, potentially exhausting process-table slots in extreme cases. This differs from a process merely waiting for I/O (still fully alive and blocked) or one with no parent at all, which is called an orphan rather than a zombie.'
        },
        {
          id: 'os-processes-q12',
          q: 'An "orphan" process is one whose:',
          options: ['Parent has terminated while the child is still running, so the child gets re-parented (e.g., to init)', 'Child process terminated before the parent did', 'Process control block has been deleted while it was still running', 'Memory pages have all been swapped out to disk'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'An orphan process is a child whose parent process terminates, or otherwise exits, while the child is still running. Since every process in a Unix-like system needs a parent to eventually call wait() on it to avoid it becoming a permanent zombie, the OS re-parents orphaned processes to a special ancestor, traditionally the init process or a designated subreaper, which periodically reaps terminated children. This ensures orphans are not left unmanaged forever. Note that orphan status is about the parent-child relationship being broken from the parent\\u2019s side, unlike a zombie, which is about a terminated child\\u2019s status not yet being collected by a still-living parent.'
        },
        {
          id: 'os-processes-q13',
          q: 'A process executes: pid_t x = fork(); if (x == 0) fork(); else fork();  How many total processes exist after this code finishes, including the original?',
          options: ['3', '4', '5', '6'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Trace carefully: the original process P0 executes x = fork(), producing child C1; in P0, x holds C1\\u2019s nonzero PID, so P0 takes the else branch and calls fork() once, producing C2. In C1, x is 0, so C1 takes the if branch and calls fork() once, producing C3. No other fork() calls occur, since the if/else is mutually exclusive within each process. So the complete set of processes is {P0, C1, C2, C3} -- 4 processes total including the original. The common error is assuming both branches somehow execute in every process, giving 5 or 6, forgetting that an if/else on fork()\\u2019s return value strictly separates parent and child execution paths, each taking exactly one branch and hence exactly one extra fork() call each.'
        },
        {
          id: 'os-processes-q14',
          q: 'Which of the following is private to each thread rather than shared among all threads of the same process?',
          options: ['The code (text) segment', 'Global and static data', 'Register set and stack', 'Open file descriptors'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Threads belonging to the same process share the process\\u2019s code segment, its global and static data, the heap, and its open file descriptors, since these all live in the single shared address space and per-process resource table. What is NOT shared, and must be private per thread, is each thread\\u2019s own execution context: its register set, including the program counter, and its own stack, because each thread follows an independent flow of control and needs its own local variables and return-address chain. If threads shared a single stack, concurrent function calls from different threads would corrupt each other\\u2019s local variables and call chains, so per-thread stacks and register sets are mandatory.'
        },
        {
          id: 'os-processes-q15',
          q: 'What is the primary responsibility of the dispatcher, as distinct from the scheduler?',
          options: ['Deciding the scheduling policy and the order in which ready processes should run', 'Carrying out the actual context switch that hands the CPU to the selected process', 'Allocating physical memory frames to a newly created process', 'Handling page faults raised by a running process'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The scheduler, specifically the short-term or CPU scheduler, is the module that selects which ready process should run next based on a scheduling policy such as FCFS or priority. The dispatcher is a separate, simpler module that actually carries out that decision: it performs the context switch, sets up the CPU registers, restores the selected process\\u2019s memory map, and switches the CPU into user mode at the correct point to start executing the chosen process. The time this hand-off takes is called dispatch latency. Memory allocation and page-fault handling are the jobs of the memory manager and the page-fault handler respectively, not the dispatcher, which deals purely with handing off the CPU.'
        }
      ]
    },
    {
      id: 'os-scheduling',
      name: 'CPU Scheduling',
      theory: {
        intro: 'CPU scheduling decides which ready process gets the processor next, and GATE turns this into some of its most reliable marks: draw a Gantt chart for FCFS, SJF, SRTF, Round Robin, or Priority scheduling, then compute completion, turnaround, waiting, and response times. Almost every year brings at least one two-mark numerical built around a small process table with arrival and burst times, sometimes mixed with a preemptive algorithm that forces you to re-evaluate the ready queue at every arrival. Alongside the arithmetic sit conceptual questions on the convoy effect (FCFS), starvation and its cure aging (SJF/Priority), and how the Round Robin time quantum trades responsiveness against context-switch overhead. Master the definitions completion = finish time, turnaround = completion - arrival, waiting = turnaround - burst, response = first-CPU-time - arrival, and this entire topic becomes mechanical rather than mysterious.',
        core: 'First-Come-First-Served (FCFS) runs processes strictly in arrival order, non-preemptively, using a single FIFO ready queue. It is simple and fair in ordering but suffers from the convoy effect: if a long process is at the head of the queue, every shorter process behind it must wait for the entire long burst to finish, dragging down average waiting time even though no algorithmic unfairness occurred.\n\nShortest Job First (SJF), non-preemptive, always picks the ready process with the smallest CPU-burst time next, once the CPU is free. Among non-preemptive algorithms, SJF is provably optimal -- it minimises average waiting time for a given set of processes, provided all burst times are known in advance. Its drawback is starvation: a process with a long burst can be repeatedly bypassed by a stream of newly arriving short jobs and may wait indefinitely.\n\nShortest Remaining Time First (SRTF) is the preemptive version of SJF: whenever a new process arrives, its burst time is compared with the remaining time of the currently running process, and the one with the smaller remaining time runs (or continues running). This requires re-evaluating the ready queue at every arrival event, not just when the CPU frees up, which is exactly why SRTF Gantt charts are more work to trace than SJF ones.\n\nRound Robin (RR) is designed for time-sharing systems: each ready process gets the CPU for at most one time quantum, after which, if unfinished, it is preempted and placed at the back of the ready queue (newly arrived processes that arrived during the quantum are conventionally added to the queue before the preempted process is re-inserted). RR guarantees bounded response time and fairness. The size of the time quantum is critical:\n• A very large quantum makes RR degenerate towards FCFS (a process rarely gets preempted before finishing).\n• A very small quantum increases fairness and responsiveness but multiplies the number of context switches, so the overhead of switching can dominate and throughput drops.\n\nPriority scheduling assigns each process a priority number (by convention, GATE usually treats a lower number as higher priority) and always runs the highest-priority ready process; it can be implemented preemptively or non-preemptively. Its central weakness, like SJF, is starvation of low-priority processes if high-priority ones keep arriving. The standard fix is aging: the OS gradually increases the priority of a process the longer it waits in the ready queue, guaranteeing it will eventually become the highest-priority ready process and run.\n\nKey time metrics, always defined relative to a specific process:\n• Completion time (CT): the instant the process finishes execution.\n• Turnaround time (TAT) = CT - Arrival time (AT): total time spent in the system.\n• Waiting time (WT) = TAT - Burst time (BT): time spent only waiting in the ready queue (not running, not on I/O in these single-CPU-burst models).\n• Response time (RT) = (time of first CPU allocation) - AT: relevant mainly for interactive systems and Round Robin, where a process may run in several separate bursts.\n\nWhen multiple processes have equal priority/burst/arrival at a tie-breaking point, GATE questions typically resolve ties by arrival order or explicit process index given in the question -- always check the question statement for its tie-breaking convention before finalising a Gantt chart.',
        strategy: 'The exam-day workflow for every scheduling numerical is the same: list arrival and burst times in a table, decide whether the algorithm is preemptive, then build the Gantt chart minute by minute (or event by event) rather than trying to shortcut it mentally -- most errors come from skipping the trace. For preemptive algorithms (SRTF, preemptive priority, RR), re-check the ready queue at every arrival time, not only when a process finishes; a process that arrives with a shorter remaining time than the one currently running must immediately preempt it in SRTF. For RR, fix the convention before you start: at a preemption instant, add any process that arrived exactly then to the queue before re-inserting the preempted process, since GATE problems often hinge on this exact ordering at tie instants. Always compute completion time first for every process, then derive turnaround (CT - AT) and waiting (TAT - BT) -- deriving waiting time directly from a half-remembered formula, without first pinning down completion time, is the single most common source of arithmetic slips. Watch for these giveaway signal words: "convoy effect" always points to FCFS, "optimal average waiting time" always points to SJF (among non-preemptive algorithms) or SRTF (among preemptive), and "starvation cured by aging" always points to priority or SJF scheduling. Worked mini-example: P1(AT=0,BT=4), P2(AT=1,BT=3). Under FCFS: P1 runs 0-4, P2 runs 4-7; waiting times are 0 and 3, average 1.5. Under SRTF: P1 starts at 0; at t=1, P2 (BT=3) has less remaining time than P1 (remaining 3, tied -- by convention the running process continues on a tie), so P1 continues to completion at 4, then P2 runs 4-7 -- identical schedule here since the tie favoured the incumbent. Always state which tie-breaking rule you used.'
      },
      questions: [
        {
          id: 'os-scheduling-q1',
          q: 'For a process in a scheduling problem, the turnaround time is correctly defined as:',
          options: ['Completion time minus arrival time', 'Completion time minus burst time', 'Start time minus arrival time', 'Completion time minus start time'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Turnaround time (TAT) measures the total time a process spends in the system from the moment it arrives until it finishes execution, so it is defined as Completion time minus Arrival time (CT - AT). It includes every phase the process goes through: time spent waiting in the ready queue, time spent actually executing (possibly across several separate bursts under preemptive scheduling), and any time recorded for context-switch overhead attributed to it. "Completion time minus burst time" would incorrectly ignore the arrival time and does not correspond to any standard metric. "Start time minus arrival time" is actually the definition of response time, not turnaround time, and "Completion time minus start time" only captures the time since the process first got the CPU, missing the initial wait before that first start.'
        },
        {
          id: 'os-scheduling-q2',
          q: 'The waiting time of a process in a scheduling problem is computed as:',
          options: ['Turnaround time minus burst time', 'Completion time minus burst time', 'Start time minus arrival time', 'Arrival time minus start time'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Waiting time (WT) is the portion of the turnaround time during which the process was ready but not actually executing on the CPU, so it is computed as Turnaround time minus Burst time (TAT - BT), since turnaround time already accounts for the full span from arrival to completion and burst time is the only part of that span spent actually running. "Completion time minus burst time" coincides with waiting time only in the special case where arrival time is zero, and is not the general formula, since turnaround time already folds in arrival time while this option does not. The remaining two options describe response-time-style quantities involving start time, not waiting time.'
        },
        {
          id: 'os-scheduling-q3',
          q: 'In the context of CPU scheduling metrics, response time is defined as:',
          options: ['Time at which the process first gets the CPU, minus its arrival time', 'Completion time minus arrival time', 'Time at which the process first gets the CPU, minus its completion time', 'Burst time minus waiting time'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Response time is the delay between a process arriving in the system and the first instant it actually gets allocated the CPU, so it equals (time of first CPU allocation) minus (arrival time). It is a particularly important metric for interactive and time-sharing systems, and for Round Robin, since a process may be preempted and resumed multiple times -- response time only cares about the very first allocation, not subsequent ones or the final completion. "Completion time minus arrival time" is the definition of turnaround time, not response time. The third option produces a negative, meaningless quantity since completion always occurs after the first CPU allocation, and the fourth option does not correspond to any standard scheduling metric.'
        },
        {
          id: 'os-scheduling-q4',
          q: 'Four processes arrive as follows: P1 (arrival 0, burst 5), P2 (arrival 1, burst 3), P3 (arrival 2, burst 8), P4 (arrival 3, burst 6). Using FCFS scheduling, what is the average waiting time?',
          options: ['5.75', '6.25', '4.75', '7.25'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'FCFS runs processes strictly in arrival order: P1 (0-5), P2 (5-8), P3 (8-16), P4 (16-22). Completion times are 5, 8, 16, and 22. Turnaround time (CT - AT) is P1 = 5, P2 = 7, P3 = 14, P4 = 19. Waiting time (TAT - BT) is P1 = 5-5 = 0, P2 = 7-3 = 4, P3 = 14-8 = 6, P4 = 19-6 = 13. Summing gives 0+4+6+13 = 23, and dividing by 4 processes gives an average waiting time of 5.75. This is the classic convoy-effect setup: because P3 has a large burst but happens to be scheduled early relative to P4 in arrival order, later processes accumulate substantial waiting time even though the algorithm is perfectly fair in ordering.'
        },
        {
          id: 'os-scheduling-q5',
          q: 'Using the same four processes as above -- P1 (arrival 0, burst 5), P2 (arrival 1, burst 3), P3 (arrival 2, burst 8), P4 (arrival 3, burst 6) -- what is the average waiting time under non-preemptive SJF scheduling?',
          options: ['5.25', '5.75', '4.25', '6.25'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'At t=0 only P1 has arrived, so it must run first: P1 runs 0-5. At t=5, P2 (burst 3), P3 (burst 8), and P4 (burst 6) have all already arrived, so SJF picks the shortest, P2, running it 5-8. At t=8, P3 (8) and P4 (6) remain, so P4 runs next, 8-14, then P3 runs 14-22. Completion times: P1=5, P2=8, P4=14, P3=22. Turnaround times: P1=5, P2=7, P4=11, P3=20. Waiting times (TAT-BT): P1=0, P2=4, P4=5, P3=12, summing to 21, giving an average of 21/4 = 5.25. This beats FCFS\\u2019s 5.75 average here precisely because SJF lets the medium-length P4 run before the very long P3, illustrating why SJF is optimal for average waiting time among non-preemptive algorithms.'
        },
        {
          id: 'os-scheduling-q6',
          q: 'Using the same four processes -- P1 (arrival 0, burst 5), P2 (arrival 1, burst 3), P3 (arrival 2, burst 8), P4 (arrival 3, burst 6) -- scheduled with preemptive SRTF (Shortest Remaining Time First), what is the waiting time of P1?',
          options: ['3', '4', '5', '8'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'P1 starts running at t=0 (remaining 5). At t=1, P2 arrives with burst 3, less than P1\\u2019s remaining 4, so P1 is preempted and P2 runs. At t=2, P3 arrives (burst 8); P2\\u2019s remaining time is 2, still the smallest, so P2 continues. At t=3, P4 arrives (burst 6); P2\\u2019s remaining time is now 1, still smallest, so P2 continues and completes at t=4. At t=4, remaining times are P1=4, P3=8, P4=6 (all now present, no new arrivals) -- P1 is smallest, so P1 runs uninterrupted from 4 to 8, completing at 8. P1\\u2019s completion time is 8, arrival is 0, so turnaround = 8, and waiting time = turnaround - burst = 8 - 5 = 3. The trap in this trace is forgetting that P1 was preempted early and must be resumed later rather than assumed to run straight through from t=0.'
        },
        {
          id: 'os-scheduling-q7',
          q: 'Three processes P1 (arrival 0, burst 4), P2 (arrival 1, burst 5), P3 (arrival 2, burst 2) are scheduled with Round Robin, time quantum = 2 (newly arrived processes are enqueued before the just-preempted process is re-enqueued). What is the average waiting time?',
          options: ['11/3 (approximately 3.67)', '10/3 (approximately 3.33)', '4', '3'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Trace the ready queue: P1 runs 0-2 (remaining 2); P2 arrives at 1. At t=2, queue order is [P2, P3, P1] since P3 arrives exactly at t=2 and is enqueued before re-inserting preempted P1. P2 runs 2-4 (remaining 3). At t=4, queue is [P3, P1, P2]. P3 runs 4-6, completing (burst 2 exhausted) at t=6. Queue is [P1, P2]. P1 runs 6-8, completing (remaining 2 exhausted) at t=8. Queue is [P2]. P2 (remaining 3) runs 8-10 (remaining 1), then alone again runs 10-11, completing at t=11. Completion times: P1=8, P2=11, P3=6. Turnaround: P1=8, P2=10, P3=4. Waiting (TAT-BT): P1=4, P2=5, P3=2, total 11, average 11/3 ~= 3.67.'
        },
        {
          id: 'os-scheduling-q8',
          q: 'The "convoy effect", where many short processes get stuck behind one long process, is a well-known drawback most closely associated with which scheduling algorithm?',
          options: ['First-Come-First-Served (FCFS)', 'Shortest Job First (SJF)', 'Round Robin (RR)', 'Priority scheduling with aging'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The convoy effect specifically describes FCFS behaviour: because FCFS is strictly non-preemptive and ordered only by arrival, if a CPU-bound process with a very large burst happens to be at the head of the ready queue, every other process behind it, even ones needing only a tiny burst, must wait for that entire long burst to finish before getting any CPU time at all. This can severely inflate average waiting time despite FCFS being procedurally fair. SJF specifically avoids this by always picking the shortest job available; Round Robin bounds any process\\u2019s monopoly of the CPU to one time quantum; and priority scheduling with aging is designed to prevent indefinite postponement of low-priority work, not long-burst-induced queuing.'
        },
        {
          id: 'os-scheduling-q9',
          q: 'A process that is repeatedly overtaken by newer, higher-priority arrivals under priority scheduling and may never get the CPU is suffering from starvation. What is the standard technique used to prevent this?',
          options: ['Aging: gradually increase the priority of a process the longer it waits', 'Switching permanently to FCFS scheduling for all processes', 'Reducing the time quantum to zero', 'Assigning every process the same fixed burst time'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Starvation (also called indefinite postponement) occurs in priority-based scheduling when a low-priority process keeps losing the CPU to a continuous stream of newer, higher-priority arrivals. The standard remedy is aging: the operating system periodically raises the priority value of any process that has been waiting in the ready queue for a long time, so that no matter how many high-priority processes keep arriving, the aged process\\u2019s priority will eventually exceed theirs and it will be scheduled. Switching to FCFS abandons priority scheduling altogether rather than fixing it; reducing the quantum to zero is a Round-Robin-specific and nonsensical notion here; and forcing identical burst times does not address priority-based starvation at all.'
        },
        {
          id: 'os-scheduling-q10',
          q: 'Among non-preemptive CPU scheduling algorithms, which one is provably optimal in the sense that it minimises the average waiting time for a given fixed set of processes with known burst times?',
          options: ['Shortest Job First (SJF)', 'First-Come-First-Served (FCFS)', 'Round Robin with a large quantum', 'Priority scheduling with random priorities'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Non-preemptive Shortest Job First is a classical result in scheduling theory: for a fixed set of processes whose burst times are known in advance, always running the process with the smallest remaining burst next, without preemption, yields the minimum possible average waiting time among all non-preemptive scheduling disciplines. Intuitively, running shorter jobs first lets more processes finish sooner, reducing the total accumulated waiting across all processes, whereas running a long job early (as FCFS may do purely by arrival order) forces every subsequent process to wait through that entire long burst. Round Robin trades optimal waiting time for fairness and responsiveness, and priority scheduling with arbitrary (non-burst-based) priorities has no such optimality guarantee.'
        },
        {
          id: 'os-scheduling-q11',
          q: 'Three processes all arrive at time 0: P1 (burst 10, priority 3), P2 (burst 1, priority 1), P3 (burst 2, priority 2), where a lower priority number means higher priority. Using non-preemptive priority scheduling, what is the average waiting time?',
          options: ['4/3 (approximately 1.33)', '2', '1', '5/3 (approximately 1.67)'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Since all three arrive together at t=0, the scheduler simply runs them in order of priority number: P2 (priority 1) first, then P3 (priority 2), then P1 (priority 3). Gantt chart: P2 runs 0-1, P3 runs 1-3, P1 runs 3-13. Since all arrival times are 0, completion time equals turnaround time here: P2=1, P3=3, P1=13. Waiting time (turnaround - burst): P2 = 1-1 = 0, P3 = 3-2 = 1, P1 = 13-10 = 3. Total waiting = 0+1+3 = 4, and average = 4/3 ~= 1.33. The trap is forgetting that with equal arrival times, priority order alone fixes the entire schedule -- no re-evaluation of the ready queue is needed mid-execution since nothing new ever arrives.'
        },
        {
          id: 'os-scheduling-q12',
          q: 'If the time quantum in Round Robin scheduling is chosen to be extremely large (larger than every process\\u2019s burst time), the scheduling behaviour effectively reduces to which algorithm, and what happens if the quantum is instead made extremely small?',
          options: ['It reduces to FCFS; an extremely small quantum causes context-switch overhead to dominate, hurting throughput', 'It reduces to SJF; an extremely small quantum improves throughput with no downside', 'It reduces to SRTF; an extremely small quantum has no effect on performance', 'It reduces to priority scheduling; an extremely small quantum eliminates all overhead'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'If the Round Robin time quantum exceeds the burst time of every process, no process is ever preempted before it naturally finishes, so each process simply runs to completion in the order it is dispatched -- which is exactly First-Come-First-Served behaviour. At the opposite extreme, an extremely small quantum forces very frequent preemption and context switching; since each context switch is pure overhead that does no useful work, the fraction of CPU time spent switching rather than executing grows large, so throughput and overall efficiency degrade even though responsiveness improves. Neither SJF, SRTF, nor priority scheduling emerges from quantum-size limits, since Round Robin\\u2019s ordering is purely queue-position-based, not burst- or priority-based.'
        },
        {
          id: 'os-scheduling-q13',
          q: 'Reconsider Round Robin with P1 (arrival 0, burst 4), P2 (arrival 1, burst 5), P3 (arrival 2, burst 2), quantum = 2, using the same enqueue convention as before (new arrivals enqueued before the preempted process). What is the response time of P2?',
          options: ['1', '2', '3', '0'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'From the full Round Robin trace: P1 runs first from 0-2, then at t=2 the queue is [P2, P3, P1] since P2 arrived at t=1 and P3 arrived exactly at t=2 (enqueued ahead of the preempted P1). P2 therefore gets the CPU for the first time at t=2. Response time is defined as (time of first CPU allocation) minus (arrival time), so for P2 this is 2 - 1 = 1. It does not matter that P2\\u2019s burst of 5 requires it to be preempted and resumed multiple times later in the schedule -- response time only cares about the very first CPU allocation, unlike turnaround time, which would need the final completion time instead.'
        },
        {
          id: 'os-scheduling-q14',
          q: 'A scheduling algorithm that always favours processes with shorter CPU bursts (SJF or SRTF) runs the risk of causing starvation for which kind of process?',
          options: ['A process with a very long CPU burst, if short jobs keep arriving continuously', 'A process that arrived first, regardless of its burst length', 'A process with the highest priority number', 'Every process eventually starves under SJF, regardless of burst length'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Because SJF and SRTF always prefer whichever ready process currently has the smallest (remaining) burst time, a process with a genuinely long burst can be repeatedly bypassed if a continuous stream of newly arriving short jobs keeps appearing in the ready queue -- each new short job looks more attractive to the scheduler than letting the long job proceed, so the long job\\u2019s wait can, in the worst case, grow without bound. This is the classic starvation risk of burst-time-based scheduling, mirroring the low-priority starvation risk in priority scheduling. Arrival order alone does not determine starvation risk under SJF/SRTF, and it is false that every process starves -- only unusually long-burst processes are at risk, and only when short arrivals persist indefinitely.'
        },
        {
          id: 'os-scheduling-q15',
          q: 'Which of the following CPU scheduling algorithms is inherently non-preemptive, meaning a running process can never be forcibly interrupted before it voluntarily gives up the CPU?',
          options: ['First-Come-First-Served (FCFS)', 'Shortest Remaining Time First (SRTF)', 'Round Robin (RR)', 'Preemptive priority scheduling'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'FCFS dispatches processes strictly in arrival order and, once a process is given the CPU, lets it run to completion (or until it voluntarily blocks for I/O); it never forcibly preempts a running process to give the CPU to another ready process. SRTF, by definition, preempts the currently running process the moment a ready process with a smaller remaining burst becomes available. Round Robin forcibly preempts a running process once its time quantum expires. Preemptive priority scheduling, by its very name, forcibly preempts a running process whenever a higher-priority process becomes ready. Hence FCFS is the odd one out as purely non-preemptive.'
        }
      ]
    },
    {
      id: 'os-sync',
      name: 'Process Synchronization',
      theory: {
        intro: 'Whenever multiple processes or threads share data, uncoordinated concurrent access can corrupt that data -- this is a race condition, and preventing it is the job of process synchronization. GATE builds a large fraction of its OS marks around this topic: the three formal requirements of a critical-section solution (mutual exclusion, progress, bounded waiting), Peterson\\u2019s two-process software algorithm traced instruction by instruction, and semaphores used both conceptually and numerically, where you must trace a sequence of wait() and signal() calls to find the semaphore\\u2019s value or determine which processes are blocked. Classical problems -- producer-consumer with a bounded buffer, readers-writers, and dining philosophers -- recur constantly, testing whether you can write or read a semaphore-based skeleton solution and reason about deadlock or starvation within it. Precision matters enormously here: a single misplaced wait() or signal() changes correctness entirely.',
        core: 'A race condition occurs when two or more processes or threads access and manipulate shared data concurrently, and the final outcome depends on the particular, unpredictable order in which their instructions are interleaved by the scheduler. The region of code where shared data is accessed is called the critical section. Any correct solution to the critical-section problem must satisfy three requirements:\n• Mutual exclusion: no two processes may be executing in their critical sections at the same time.\n• Progress: if no process is in its critical section, and some processes wish to enter, only those not executing in their remainder section can participate in deciding who enters next, and this decision cannot be postponed indefinitely.\n• Bounded waiting: there exists a bound on the number of times other processes may enter their critical sections after a process has requested entry and before that request is granted, preventing indefinite postponement (starvation).\n\nPeterson\\u2019s algorithm is a classical software-only solution for two processes, using two shared variables: an array flag[2], where flag[i] indicates process i wants to enter its critical section, and an integer turn, indicating whose turn it is when both want to enter. Process i\\u2019s entry section sets flag[i] = true, then turn = j (the other process), then busy-waits while (flag[j] && turn == j). Because turn is a single shared variable, whichever process\\u2019s write to turn happens last is the one whose own busy-wait condition becomes true, so it waits, while the other process, seeing turn now pointing away from itself, proceeds immediately. Peterson\\u2019s algorithm provably satisfies all three critical-section requirements for two processes on architectures that preserve the program order of these memory operations, but it relies purely on busy waiting (wasting CPU cycles while blocked) and does not scale cleanly beyond two processes.\n\nSemaphores are integer variables accessed only through two atomic operations: wait() (also written P() or down()), which decrements the semaphore and blocks the calling process if the result would be negative, and signal() (also written V() or up()), which increments the semaphore and wakes one waiting process if any are blocked. A binary semaphore can only take the values 0 and 1 and is used exactly like a mutex lock for mutual exclusion. A counting semaphore can take a larger range of values and is used to manage a resource with multiple identical instances, or to enforce ordering constraints between processes (e.g., signalling that an item has become available). When a semaphore\\u2019s value is tracked including negative territory, a negative value\\u2019s magnitude conventionally equals the number of processes currently blocked waiting on it.\n\nThe classical producer-consumer (bounded-buffer) problem uses three semaphores: mutex (binary, initialised to 1) to protect the shared buffer during insertion or removal, empty (counting, initialised to the buffer capacity N) counting free slots, and full (counting, initialised to 0) counting occupied slots. A producer does wait(empty), wait(mutex), inserts an item, signal(mutex), signal(full); a consumer does wait(full), wait(mutex), removes an item, signal(mutex), signal(empty). The order of the two wait() calls in each (resource-counting semaphore before mutex) is essential to avoid deadlock.\n\nThe readers-writers problem allows multiple readers to access shared data simultaneously (since reading does not conflict with reading) but requires a writer to have exclusive access. The first readers-writers problem gives priority to readers (a writer may starve if readers keep arriving); the second gives priority to writers (readers may starve once a writer is waiting). The dining philosophers problem models N philosophers around a table with N forks, each philosopher needing both adjacent forks to eat; the naive solution where everyone picks up their left fork first and then reaches for the right can deadlock if every philosopher simultaneously holds their left fork and waits forever for their right, forming a circular wait among all N. Standard fixes include allowing at most N-1 philosophers to sit down at once, having one specific philosopher pick up forks in the opposite order, or acquiring forks only via a global ordering or a single controlling mutex.',
        strategy: 'For semaphore-tracing questions, keep a running numeric value and, for each wait() and signal() in the given order, apply the rule directly: wait() decrements (and blocks if the result goes negative), signal() increments (and releases one blocked process if any are waiting). Do not shortcut by assuming an even balance of wait/signal calls; trace every single call in the exact sequence given, since GATE loves sequences where several waits happen consecutively before any signal, forcing several processes to queue up. For classical-problem skeletons (producer-consumer, readers-writers, dining philosophers), check three things fast: (1) is the resource-counting semaphore\\u2019s wait() always issued before the mutex\\u2019s wait() in each participant -- reversing this order is the single most common deadlock-inducing bug GATE plants in "spot the error" questions; (2) are mutex wait/signal pairs correctly balanced around the shared-data access only, not around the entire function; (3) for readers-writers, is a reader-count variable itself protected by its own mutex before it touches the shared writer-lock semaphore. For Peterson\\u2019s algorithm questions, always identify which process\\u2019s write to the shared turn variable happens last in the interleaving described -- that process is the one that ends up busy-waiting, while the other proceeds first; this one fact resolves almost every ordering question asked about it. For dining philosophers, remember the deadlock condition needs every one of the N philosophers to be holding exactly one fork with nobody able to get a second -- a partial subset holding forks cannot deadlock the whole table, since anyone lacking their left fork simply has not started yet. Worked mini-example: semaphore S starts at 1; P1 calls wait(S) (S becomes 0, P1 proceeds); P2 calls wait(S) (S becomes -1, P2 blocks); P1 calls signal(S) (S becomes 0, P2 is released and proceeds). Track the sign of S at each step rather than just its final number, since intermediate negativity is what the question is often really testing.'
      },
      questions: [
        {
          id: 'os-sync-q1',
          q: 'A "race condition" in operating systems most precisely refers to a situation where:',
          options: ['The final outcome of concurrently accessing shared data depends on the particular timing/order of execution', 'A process is scheduled using Round Robin instead of FCFS', 'A process is waiting indefinitely for a resource it will never receive', 'Two processes have identical priority values'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A race condition arises specifically when two or more processes or threads access and manipulate the same shared data concurrently, and the outcome of that access -- the final value left in the shared data, or which process reads a particular value -- depends on the precise, non-deterministic interleaving of their instructions chosen by the scheduler. Running the exact same program twice could produce different results purely due to timing differences, which is what makes race conditions notoriously hard to debug. This has nothing to do with the specific scheduling algorithm in use (option B), which describes CPU scheduling, not data races; indefinite waiting (option C) describes starvation, a different phenomenon; and equal priorities (option D) is just one possible contributing scenario, not the definition itself.'
        },
        {
          id: 'os-sync-q2',
          q: 'Which THREE conditions must a correct solution to the critical-section problem satisfy?',
          options: ['Mutual exclusion, progress, and bounded waiting', 'Mutual exclusion, priority inheritance, and deadlock detection', 'Progress, fairness, and highest throughput', 'Bounded waiting, highest priority first, and preemption'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The three formally required properties of any critical-section solution are: mutual exclusion (no two processes execute in their critical sections simultaneously), progress (the decision of who enters next cannot be postponed indefinitely if some process wants to enter and none currently is inside), and bounded waiting (there is a finite bound on how many times other processes can enter before a waiting process\\u2019s turn is guaranteed, preventing starvation). Priority inheritance and deadlock detection are separate mechanisms used elsewhere in synchronization and resource management, not part of this specific three-condition definition; "fairness" and "highest throughput" are informal goals, not the precisely defined formal requirements that GATE tests.'
        },
        {
          id: 'os-sync-q3',
          q: 'In Peterson\\u2019s algorithm for two processes P0 and P1, both attempt to enter their critical sections at nearly the same time. In the resulting interleaving, P0 executes turn = 1 first, and then P1\\u2019s assignment turn = 0 executes afterward (overwriting it), before either checks its busy-wait condition. Which process enters the critical section first?',
          options: ['P0', 'P1', 'Both enter simultaneously', 'Neither enters -- deadlock occurs'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Since turn is a single shared variable, only the last write to it survives; here P1\\u2019s write (turn = 0) happens after P0\\u2019s (turn = 1), so turn ends up equal to 0. P0\\u2019s busy-wait condition is while (flag[1] && turn == 1); since turn is now 0, this condition is false immediately, so P0 proceeds straight into its critical section without waiting. P1\\u2019s busy-wait condition is while (flag[0] && turn == 0); both flag[0] (P0 wants to enter) and turn == 0 are true, so P1 must wait. The general rule: whichever process\\u2019s write to turn happens LAST ends up referencing itself in its own wait condition and is the one that blocks, letting the other process go first -- this is what guarantees mutual exclusion without a tie.'
        },
        {
          id: 'os-sync-q4',
          q: 'Which of the following statements about Peterson\\u2019s algorithm is correct?',
          options: ['It satisfies mutual exclusion, progress, and bounded waiting for exactly two processes, using only busy waiting', 'It uses a hardware test-and-set instruction to guarantee atomicity', 'It works correctly for an arbitrary number of processes without modification', 'It avoids busy waiting entirely by blocking processes in a wait queue'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Peterson\\u2019s algorithm is a purely software-based solution designed specifically for exactly two competing processes, using only two shared variables (flag[2] and turn) and ordinary loads and stores -- no special hardware instruction is required, which is precisely what makes it a classical software solution rather than a hardware-assisted one. It is proven to satisfy all three critical-section requirements (mutual exclusion, progress, bounded waiting) for the two-process case, assuming memory operations execute in program order. It does not generalise directly to more than two processes without a different construction (such as the bakery algorithm), and it relies on active busy-waiting in its while loop rather than blocking the process and putting it to sleep, so options B, C, and D are all incorrect.'
        },
        {
          id: 'os-sync-q5',
          q: 'What is the key difference between a binary semaphore and a counting semaphore?',
          options: ['A binary semaphore can only take values 0 or 1, while a counting semaphore can take a wider range of integer values to track multiple resource instances', 'A binary semaphore can be signalled by multiple processes, while a counting semaphore cannot', 'A counting semaphore only works in single-processor systems', 'A binary semaphore uses busy waiting, while a counting semaphore never does'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A binary semaphore is restricted to the two values 0 and 1, functioning essentially like a mutex lock to guard mutual exclusion for a single shared resource or critical section. A counting semaphore can take a broader range of non-negative integer values (or go negative in implementations that track blocked-process counts), making it suitable for controlling access to a resource that has multiple identical instances (its initial value equals the number of instances) or for signalling and ordering between processes, as in the producer-consumer problem\\u2019s empty and full semaphores. Both kinds can be signalled by any process holding a reference to them, both can be implemented with or without busy waiting depending on the OS, and neither is restricted to single-processor systems, so the other options are false.'
        },
        {
          id: 'os-sync-q6',
          q: 'A binary semaphore S is initialised to 1. The following operations occur strictly in this order: P1 calls wait(S); P2 calls wait(S); P1 calls signal(S). What is the value of S immediately after this sequence, and what is P2\\u2019s status?',
          options: ['S = 0, and P2 has been released and is now executing', 'S = 0, and P2 is still blocked', 'S = 1, and P2 has been released and is now executing', 'S = -1, and P2 is still blocked'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Starting at S = 1: P1\\u2019s wait(S) decrements S to 0, and since the result is not negative, P1 proceeds without blocking. P2\\u2019s wait(S) decrements S to -1; since this is negative, P2 blocks and joins the semaphore\\u2019s waiting list. P1\\u2019s signal(S) increments S from -1 to 0, and because the pre-increment value was negative (meaning at least one process was waiting), this signal also releases exactly one blocked process -- P2 -- allowing it to proceed. So after this full sequence, S = 0 and P2 is no longer blocked; it has been woken up and is now free to enter its critical section.'
        },
        {
          id: 'os-sync-q7',
          q: 'A counting semaphore S is initialised to 3. Five processes P1 through P5 call wait(S) one after another, strictly in that order, with no signal() calls occurring in between. How many of these five processes end up blocked, and what is the final value of S?',
          options: ['2 processes blocked (P4 and P5); S = -2', '3 processes blocked; S = -3', '2 processes blocked; S = 0', '0 processes blocked; S = -2'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Each wait(S) call decrements S by 1 regardless of whether the caller ends up blocked. Starting at S = 3: after P1, S = 2 (proceeds); after P2, S = 1 (proceeds); after P3, S = 0 (proceeds, since 0 is not negative); after P4, S = -1 (blocks, since the result is negative); after P5, S = -2 (blocks). So P1, P2, and P3 all successfully proceed (three instances of the resource were available), while P4 and P5, arriving after the resource was exhausted, are blocked. The final value of S is -2, and by convention its magnitude directly equals the number of currently blocked processes, which is 2 -- a useful cross-check on any semaphore trace answer.'
        },
        {
          id: 'os-sync-q8',
          q: 'In the standard bounded-buffer producer-consumer solution using three semaphores mutex, empty, and full for a buffer of capacity N, what are the correct initial values of these three semaphores?',
          options: ['mutex = 1, empty = N, full = 0', 'mutex = 0, empty = 0, full = N', 'mutex = 1, empty = 0, full = N', 'mutex = N, empty = N, full = N'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'mutex is a binary semaphore protecting the shared buffer during any single insertion or removal, so it must start at 1 (unlocked, available). empty counts the number of currently free slots in the buffer, and since the buffer starts completely empty, all N slots are free, so empty must start at N. full counts the number of slots currently holding a produced item waiting to be consumed, and since nothing has been produced yet, full must start at 0. Any other combination breaks the intended semantics: for instance, starting full at N would incorrectly claim the buffer is already completely full of unconsumed items before any production has occurred.'
        },
        {
          id: 'os-sync-q9',
          q: 'In the classical dining philosophers problem with N philosophers around a circular table and N forks (one between each adjacent pair), using the naive symmetric algorithm where every philosopher picks up their left fork and then attempts to pick up their right fork, what is the minimum number of philosophers that must simultaneously be holding exactly one fork (their left) to guarantee the entire system deadlocks?',
          options: ['All N philosophers', 'N - 1 philosophers', 'Exactly half of N', 'Any 2 adjacent philosophers'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Deadlock in the naive dining-philosophers algorithm requires a complete circular wait: every single philosopher must be holding their left fork and be stuck waiting for their right fork, which is always someone else\\u2019s left fork. If even one philosopher has not yet picked up a fork, that philosopher can either successfully acquire both forks and eat (breaking the cycle), or is simply not part of the wait cycle at all, so the deadlock cannot be total. Only when the count reaches all N philosophers simultaneously holding one fork each does every fork become unavailable to its neighbour, and every philosopher is stuck -- so the answer is N, not N-1 or any smaller subset, which would always leave at least one philosopher free to proceed and eventually release forks.'
        },
        {
          id: 'os-sync-q10',
          q: 'What is the key difference between the "first" and "second" readers-writers problems?',
          options: ['The first gives priority to readers (a writer may starve); the second gives priority to writers (readers may starve)', 'The first uses semaphores; the second uses only mutex locks', 'The first allows only one reader at a time; the second allows unlimited readers and writers together', 'There is no meaningful difference -- both give equal priority to readers and writers'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'In the first readers-writers problem, no reader should be kept waiting unless a writer has already obtained permission to use the shared object, which effectively gives readers priority: as long as readers keep arriving before a writer starts, a writer can be indefinitely postponed (starved). In the second readers-writers problem, once a writer is ready, it should perform its write as soon as possible, giving writers priority: newly arriving readers must wait behind an already-waiting writer, which can starve readers if writers keep arriving. Both variants are typically implemented with semaphores and reader-count variables, so option B is false, and neither variant permits a reader and a writer to access the shared data simultaneously, so option C is also false.'
        },
        {
          id: 'os-sync-q11',
          q: 'How does a mutex lock differ from a general counting semaphore, even though a binary semaphore is sometimes used to implement mutual exclusion in the same way?',
          options: ['A mutex has an ownership concept -- typically only the thread that locked it may unlock it -- while a semaphore can be signalled by any process regardless of who called wait', 'A mutex can be incremented above the value 1, while a semaphore cannot', 'A mutex works only across multiple machines, while a semaphore works only within one process', 'A mutex requires no atomic operations, while a semaphore does'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'A mutex (mutual exclusion lock) is specifically designed with an ownership discipline: the thread that successfully locks the mutex is expected to be the same one that unlocks it, and many implementations actively enforce or assume this. A semaphore has no such ownership notion -- any process or thread that has access to the semaphore variable may call signal() on it, even if it never called wait(), which makes semaphores more general and flexible but also more error-prone for pure mutual-exclusion use cases. A mutex is conceptually restricted to two states (locked/unlocked), the opposite of option B; both constructs require atomic underlying operations to be implemented correctly, contradicting option D; and neither is inherently limited to single-process or multi-machine scope as option C claims.'
        },
        {
          id: 'os-sync-q12',
          q: 'A bounded buffer has capacity 5, with semaphores initialised as empty = 5, full = 0, mutex = 1. Three producer insertions happen first (each doing wait(empty), insert, signal(full)), and then one consumer removal happens (doing wait(full), remove, signal(empty)). What are the final values of empty and full?',
          options: ['empty = 3, full = 2', 'empty = 2, full = 3', 'empty = 4, full = 1', 'empty = 5, full = 0'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Each producer insertion decrements empty by 1 and increments full by 1. After three insertions: empty = 5 - 3 = 2, and full = 0 + 3 = 3. Then one consumer removal decrements full by 1 and increments empty by 1: full = 3 - 1 = 2, and empty = 2 + 1 = 3. So the final values are empty = 3 and full = 2. As a sanity check, empty + full must always equal the buffer capacity (5) as long as no process is currently mid-operation, and indeed 3 + 2 = 5, confirming the trace is consistent. The mutex semaphore is not touched by this particular question since it always returns to 1 after each individual insert or remove completes.'
        },
        {
          id: 'os-sync-q13',
          q: 'What is "busy waiting" (also called a spinlock) in the context of process synchronization?',
          options: ['A process repeatedly checks a condition in a tight loop, continuously consuming CPU cycles while waiting for it to become true', 'A process is moved to the waiting queue and put to sleep until explicitly woken by another process', 'A process waits only for a fixed, bounded amount of time before giving up', 'A process is terminated automatically if it waits too long for a resource'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Busy waiting means a process, instead of yielding the CPU or being put to sleep by the OS, keeps executing a loop that repeatedly re-checks some condition (such as Peterson\\u2019s while loop, or a spinlock\\u2019s check on a lock variable) until that condition finally becomes favourable, all the while occupying the CPU and doing no other useful work. This is efficient only when the expected wait is very short, since it avoids the overhead of a context switch, but wastes CPU cycles if the wait is long. This is fundamentally different from a blocking implementation, where the OS instead removes the waiting process from the ready queue entirely (option B) until it is explicitly signalled, which is how most real semaphore implementations avoid wasting CPU time for longer waits.'
        },
        {
          id: 'os-sync-q14',
          q: 'Why is simply disabling interrupts on the current CPU an insufficient solution to the critical-section problem on a multiprocessor (multi-core) system?',
          options: ['Disabling interrupts only prevents preemption on that one CPU; other CPUs can still concurrently execute and access the shared variable', 'Disabling interrupts is impossible to implement in any operating system', 'Disabling interrupts always causes an immediate deadlock', 'Disabling interrupts only works for I/O-bound processes, never CPU-bound ones'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Disabling interrupts on a single CPU prevents that particular CPU from being preempted mid-critical-section by a timer or other interrupt, which is sufficient to guarantee mutual exclusion on a uniprocessor system, since only one process can ever be executing at any instant. On a multiprocessor system, however, disabling interrupts on the current core does nothing to stop a different core from simultaneously running another process that accesses the very same shared variable, since interrupts were never disabled on that other core. This is precisely why multiprocessor synchronization instead relies on hardware-provided atomic instructions, such as test-and-set or compare-and-swap, which are atomic across all cores via the memory bus/cache-coherence protocol, not just within a single core\\u2019s instruction stream.'
        },
        {
          id: 'os-sync-q15',
          q: 'For semaphore operations wait() and signal() to correctly enforce their intended mutual-exclusion and counting semantics, how must they themselves be implemented?',
          options: ['As atomic (indivisible) operations, so the semaphore\\u2019s own internal value cannot be corrupted by concurrent access', 'Purely as busy-waiting loops, with no other implementation permitted', 'As recursive function calls only', 'Exclusively inside user-space thread libraries, never inside the kernel'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The entire purpose of wait() and signal() is to safely coordinate access to shared data between competing processes, but this only works if the semaphore\\u2019s own internal integer value cannot itself be corrupted by a race condition when two processes call wait() or signal() at the same moment. This requires wait() and signal() to be implemented as atomic, indivisible operations -- typically by briefly disabling interrupts on a uniprocessor, or using a hardware atomic instruction, or a short internal spinlock on a multiprocessor -- so that the semaphore\\u2019s value update itself is never interleaved. Whether the blocked process then busy-waits or is put to sleep is a separate implementation choice (contradicting option B), and semaphores can be implemented in either the kernel or user-space libraries, contradicting option D.'
        }
      ]
    }
  ]
};
