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
    },
    {
      id: 'os-deadlock',
      name: 'Deadlocks',
      theory: {
        intro: 'A deadlock is a state where a set of processes are each waiting for a resource held by another process in the same set, so none of them can ever proceed. GATE tests this topic through two very different lenses: conceptual questions on the four necessary Coffman conditions and the three broad handling strategies (prevention, avoidance, detection), and computation-heavy questions built around the Banker\\u2019s algorithm, where you must compute a Need matrix, trace a safety algorithm to find a safe sequence, or decide whether a new resource request can be granted without risking deadlock. A third recurring numerical pattern asks for the minimum number of resource instances that guarantees deadlock can never occur, given how many processes exist and their maximum resource claims. Resource-allocation graphs (RAGs) round out the topic, especially the subtlety that a cycle in a RAG is necessary but not always sufficient for deadlock once resource types have multiple instances.',
        core: 'A deadlock can occur only if all four Coffman conditions hold simultaneously:\n• Mutual exclusion: at least one resource must be held in a non-shareable mode.\n• Hold and wait: a process holding at least one resource is waiting to acquire additional resources currently held by other processes.\n• No preemption: resources cannot be forcibly taken away from a process; they must be released voluntarily.\n• Circular wait: there exists a set of waiting processes {P0, P1, ..., Pn} such that P0 waits for a resource held by P1, P1 waits for one held by P2, and so on, until Pn waits for one held by P0.\n\nA resource-allocation graph (RAG) represents processes and resource types as nodes, with a request edge (process to resource) and an assignment edge (resource to process). For resource types with a single instance, a cycle in the RAG is both necessary AND sufficient for deadlock. For resource types with multiple instances, a cycle is necessary but not sufficient -- the cycle only guarantees deadlock if every resource type involved in the cycle has all of its instances already allocated with no free instance available to break the wait.\n\nDeadlock handling falls into three strategies. Prevention works by ensuring at least one of the four Coffman conditions can never hold: hold-and-wait is prevented by requiring a process to request all its resources at once before starting (or to hold none while requesting more); no-preemption is negated by allowing the OS to forcibly preempt resources from a waiting process; and circular wait is prevented by imposing a total (linear) ordering on resource types and requiring every process to request resources only in strictly increasing order. Mutual exclusion cannot generally be removed for genuinely non-shareable resources, so prevention schemes usually target the other three. Avoidance takes a more dynamic approach: the OS is told each process\\u2019s maximum possible claim in advance, and before granting any request it checks whether the resulting state would still be safe (i.e., some ordering of processes exists in which every process can eventually finish); the Banker\\u2019s algorithm is the canonical avoidance algorithm. Detection allows deadlocks to occur but periodically runs an algorithm (similar to Banker\\u2019s safety check, but without needing maximum-claim information in advance) to identify a deadlocked set, followed by recovery via process termination or resource preemption.\n\nBanker\\u2019s algorithm safety check, given Available (a vector of currently free instances per resource type), Allocation (a matrix of currently held instances per process per resource type), and Max (a matrix of each process\\u2019s maximum possible demand), first computes Need = Max - Allocation for every process. The safety algorithm then repeatedly looks for a process whose Need is entirely <= the current Available vector; if found, it pretends that process runs to completion and releases all its resources, adding its Allocation back into Available, and marks it finished; this repeats until either all processes are marked finished (the state is safe, and the order in which processes were picked is a safe sequence) or no remaining process\\u2019s Need fits the current Available (the state is unsafe). A new resource request from a process is granted only if it does not exceed that process\\u2019s Need, does not exceed current Available, and the resulting hypothetical state (after tentatively granting it) still passes the full safety check; otherwise the process must wait.\n\nMinimum resources to guarantee deadlock avoidance: for n processes each with a maximum need of at most k instances of a single resource type, the system is guaranteed deadlock-free if the total number of instances is at least n(k-1) + 1 -- one short of this, every process could simultaneously hold (k-1) instances and request one more, creating a genuine circular wait with zero instances free. More generally, when different processes have different maximum needs Max_1, ..., Max_n for the same resource type, the analogous safe threshold is (Max_1 - 1) + (Max_2 - 1) + ... + (Max_n - 1) + 1.',
        strategy: 'For any Banker\\u2019s algorithm question, first write out the Need matrix (Max - Allocation) before doing anything else -- most computation errors come from trying to compare Max or Allocation directly against Available instead of Need. Then run the safety algorithm mechanically: at each step, scan every unfinished process and pick any one whose full Need row is <= the current Available vector (component-wise); if several qualify, any one may be chosen, and different valid choices can produce different, equally correct safe sequences, so an exam option showing a different order from the one you found first is not automatically wrong -- verify it independently rather than assuming your first found order is the only one. When asked whether a request can be granted, first check Request <= Need and Request <= Available as a quick filter (if either fails, the request is simply invalid or must wait, no safety check even needed) -- only if both pass do you tentatively apply the request and re-run the full safety check on the resulting hypothetical state. For minimum-resource-instance formulas, remember the "-1" per process before the final "+1": it comes from the worst-case scenario where every process holds one less than its maximum need, since holding exactly its maximum would mean the process is already finished and does not need to wait. For RAG questions, always check whether a resource type is single-instance or multi-instance before concluding deadlock from a visible cycle -- multi-instance cycles need every implicated resource type to be fully allocated with no free instance anywhere along the cycle. Worked mini-example: 3 processes, single resource type, each with a maximum need of 4 units. Minimum instances to guarantee safety = 3(4-1)+1 = 10; with only 9 instances, all three processes could simultaneously hold 3 units each (using all 9) and each still need 1 more, producing an unavoidable circular wait.'
      },
      questions: [
        {
          id: 'os-deadlock-q1',
          q: 'Which of the following is NOT one of the four necessary Coffman conditions for deadlock?',
          options: ['Mutual exclusion, hold and wait, no preemption, circular wait', 'Mutual exclusion, hold and wait, no preemption, resource starvation', 'These are all valid: mutual exclusion, hold and wait, no preemption, circular wait', 'None of the other options -- all four standard conditions are listed correctly in option A'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The four Coffman conditions that must ALL hold simultaneously for a deadlock to be possible are: mutual exclusion (a resource is held non-shareably), hold and wait (a process holds resources while waiting for more), no preemption (resources cannot be forcibly taken back), and circular wait (a cycle of processes each waiting on the next). "Resource starvation" is not one of the four formal Coffman conditions -- starvation is a related but distinct phenomenon (a process being perpetually denied a resource, which can happen even without a full circular-wait deadlock, for instance under unfair priority scheduling). Option B is therefore the one that incorrectly substitutes starvation for circular wait, making it the correct choice for "NOT" one of the four conditions.'
        },
        {
          id: 'os-deadlock-q2',
          q: 'In a resource-allocation graph where every resource type has exactly one instance, the presence of a cycle means:',
          options: ['The system is definitely deadlocked -- a cycle is both necessary and sufficient for deadlock in this case', 'The system might or might not be deadlocked -- a cycle is necessary but not sufficient', 'The system is definitely safe -- cycles never indicate deadlock', 'It indicates starvation but never deadlock'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'When every resource type in the graph has only a single instance, a cycle in the resource-allocation graph is both a necessary and a sufficient condition for deadlock: since each resource can be assigned to only one process at a time, every process along the cycle is genuinely blocked forever waiting on the very next resource in the cycle, with no possibility of any free instance existing elsewhere to break the chain. This is precisely why single-instance RAGs make deadlock detection trivial -- just search for a cycle. The "necessary but not sufficient" caveat only applies once resource types can have multiple instances, where a cycle can exist yet still leave a free instance available somewhere to unblock the chain, which is not possible in the pure single-instance case.'
        },
        {
          id: 'os-deadlock-q3',
          q: 'What is the fundamental difference between deadlock prevention and deadlock avoidance?',
          options: ['Prevention structurally ensures at least one Coffman condition can never hold; avoidance dynamically checks each resource request against future safety using advance knowledge of maximum claims', 'Prevention runs only after a deadlock has already occurred; avoidance runs only before any process starts', 'Prevention requires the Banker\\u2019s algorithm; avoidance never uses any algorithm', 'There is no real difference -- the two terms are interchangeable'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Deadlock prevention takes a static, structural approach: it redesigns the system so that at least one of the four Coffman conditions can never arise at all (e.g., forcing all resource requests upfront removes hold-and-wait, or imposing a resource ordering removes circular wait), guaranteeing deadlock cannot occur regardless of runtime behaviour, though often at the cost of resource utilisation or concurrency. Deadlock avoidance instead allows all four conditions to potentially exist, but dynamically evaluates every single resource request at runtime, using advance knowledge of each process\\u2019s maximum possible resource claim (via the Banker\\u2019s algorithm), and only grants requests that keep the system in a provably safe state. Prevention is a design-time guarantee; avoidance is a runtime, request-by-request decision, so the other three options mischaracterise both concepts.'
        },
        {
          id: 'os-deadlock-q4',
          q: 'A system has 5 processes (P0-P4) and 3 resource types A, B, C. Available = (3, 3, 2). The Need matrix (Max - Allocation) works out to: P0=(7,4,3), P1=(1,2,2), P2=(6,0,0), P3=(0,1,1), P4=(4,3,1), and the corresponding Allocation rows are P0=(0,1,0), P1=(2,0,0), P2=(3,0,2), P3=(2,1,1), P4=(0,0,2). Which of the following is a valid safe sequence?',
          options: ['<P0, P1, P2, P3, P4>', '<P1, P3, P4, P0, P2>', '<P2, P1, P3, P0, P4>', '<P4, P0, P1, P2, P3>'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Starting Available = (3,3,2). Check P1: Need (1,2,2) <= (3,3,2), yes; run P1, add its Allocation (2,0,0) back: Available becomes (5,3,2). Check P3: Need (0,1,1) <= (5,3,2), yes; run P3, add (2,1,1): Available becomes (7,4,3). Check P4: Need (4,3,1) <= (7,4,3), yes; run P4, add (0,0,2): Available becomes (7,4,5). Check P0: Need (7,4,3) <= (7,4,5), yes; run P0, add (0,1,0): Available becomes (7,5,5). Check P2: Need (6,0,0) <= (7,5,5), yes; run P2. All five processes finish, so <P1, P3, P4, P0, P2> is a valid safe sequence. Option A fails immediately since P0\\u2019s Need (7,4,3) exceeds Available (3,3,2) in the A component.'
        },
        {
          id: 'os-deadlock-q5',
          q: 'Using the same system as above, process P2 has Allocation = (3, 0, 2) and Max = (9, 0, 2). What is P2\\u2019s Need vector?',
          options: ['(6, 0, 0)', '(9, 0, 2)', '(12, 0, 4)', '(3, 0, 0)'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The Need vector for any process is defined as Need = Max - Allocation, computed component-wise across each resource type. For P2, Max = (9, 0, 2) and Allocation = (3, 0, 2), so Need = (9-3, 0-0, 2-2) = (6, 0, 0). This means P2 might still request up to 6 more units of resource type A in the future (since its declared maximum for A is 9 and it already holds 3), but it needs zero additional units of B or C since it has already been allocated its full maximum for those two resource types. This Need vector is exactly what the Banker\\u2019s safety algorithm compares against the Available vector at each step of the safety check.'
        },
        {
          id: 'os-deadlock-q6',
          q: 'Three processes each have a maximum requirement of 4 units of a single resource type. What is the minimum total number of resource instances that guarantees the system can never deadlock?',
          options: ['10', '9', '12', '7'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'The standard safe-threshold formula for n processes each with maximum need k of a single resource type is n(k-1) + 1. Here n = 3 and k = 4, so the minimum safe total is 3(4-1) + 1 = 3(3) + 1 = 9 + 1 = 10. To see why 9 is insufficient, consider the worst case: each of the 3 processes could simultaneously be allocated exactly 3 units (one less than its maximum of 4), consuming all 9 available instances, with every process still needing 1 more unit to reach its maximum -- since no instance is free anywhere, this is an unavoidable circular wait, a genuine deadlock. With 10 instances, at least one process can always be allocated its full maximum of 4 and thus complete and release its resources, guaranteeing safety.'
        },
        {
          id: 'os-deadlock-q7',
          q: 'Imposing a strict, total ordering on all resource types, and requiring every process to request resources only in strictly increasing order of this ranking, is a deadlock prevention technique that specifically eliminates which Coffman condition?',
          options: ['Circular wait', 'Mutual exclusion', 'Hold and wait', 'No preemption'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'If every resource type is assigned a fixed rank, and every process is required to request resources only in strictly increasing rank order, then it becomes structurally impossible to form a circular chain of waiting processes: a cycle would require some process further along the chain to be waiting on a lower-ranked resource already held by a process earlier in the chain, which directly violates the increasing-order requirement. This removes the circular-wait condition entirely, regardless of process behaviour otherwise. It does not affect mutual exclusion (resources can still be non-shareable), hold-and-wait (a process can still hold some resources while requesting the next-ranked one), or preemptability, so those conditions could still, in principle, hold -- but without circular wait, deadlock cannot occur since all four conditions are required simultaneously.'
        },
        {
          id: 'os-deadlock-q8',
          q: 'Requiring every process to request and be allocated ALL of the resources it will ever need in a single atomic step, before it begins execution, is a deadlock prevention technique targeting which Coffman condition?',
          options: ['Hold and wait', 'Circular wait', 'Mutual exclusion', 'No preemption'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The hold-and-wait condition specifically describes a process that already holds some resources while it waits to acquire additional ones held by other processes. If a process is instead forced to request every resource it will ever need in one single atomic request before starting (or, alternatively, must hold zero resources whenever it makes a new request), it can never simultaneously be "holding something" and "waiting for something else" -- so hold-and-wait can never arise. This technique tends to lower resource utilisation, since processes may sit idle holding resources they will not need until much later in their execution, but it structurally guarantees this particular condition is eliminated, which is sufficient (combined with the other three still possibly holding) to make deadlock impossible.'
        },
        {
          id: 'os-deadlock-q9',
          q: 'A system uses deadlock detection rather than avoidance. How does its detection algorithm differ from the Banker\\u2019s algorithm used for avoidance?',
          options: ['Detection does not require processes to declare a maximum resource claim in advance; it works only with current Allocation and Request/pending information', 'Detection requires more advance information than avoidance, including future scheduling decisions', 'Detection and the Banker\\u2019s algorithm are mathematically identical with no differences at all', 'Detection can only be run once, at system startup, never periodically'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The Banker\\u2019s algorithm (avoidance) requires every process to declare its maximum possible resource claim in advance so the OS can proactively check, before granting any request, whether the resulting state remains safe. A deadlock detection algorithm is structurally similar in spirit -- it also compares an Available vector against processes\\u2019 outstanding needs to see which processes can still finish -- but it does not require any advance maximum-claim declaration; it works purely with the current Allocation matrix and the currently outstanding Request matrix, checking periodically (or when triggered, e.g., by low resource utilisation or a suspected hang) whether any subset of processes is stuck in a genuine circular wait with no possible progress, and if so, initiating recovery.'
        },
        {
          id: 'os-deadlock-q10',
          q: 'Consider a resource-allocation graph with two resource types, R1 and R2, each having 2 instances. R1\\u2019s two instances are allocated one each to P1 and P2. R2\\u2019s two instances: one is allocated to P2, and one instance of R2 is currently free (unallocated). P1 has a pending request for R2, and P2 has a pending request for R1. This graph contains a cycle P1 -> R2 -> P2 -> R1 -> P1. Is the system deadlocked?',
          options: ['No -- since R2 has a free instance, P1\\u2019s request for R2 can be granted immediately, breaking the cycle in practice', 'Yes -- any cycle in a resource-allocation graph always implies deadlock', 'Yes, but only P1 is deadlocked, not P2', 'Cannot be determined without knowing the scheduling algorithm in use'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'This scenario illustrates precisely why a cycle is necessary but not sufficient for deadlock once resource types have multiple instances. Although the graph shows a cycle P1 -> R2 -> P2 -> R1 -> P1, resource type R2 still has one free, unallocated instance available. Since P1\\u2019s pending request is specifically for R2, and a free instance of R2 exists, the OS can immediately grant that instance to P1 without needing P2 to release anything first -- P1 can then finish, release both its R1 and R2 holdings, and P2\\u2019s request for R1 can subsequently be satisfied too. So despite the visible cycle, no process is actually stuck forever, and the system is not deadlocked. This is the key exception that makes multi-instance RAG analysis harder than the single-instance case.'
        },
        {
          id: 'os-deadlock-q11',
          q: 'Using the system from question 4 (Available = (3,3,2); Needs P0=(7,4,3), P1=(1,2,2), P2=(6,0,0), P3=(0,1,1), P4=(4,3,1)), suppose process P1 now issues a new request of (1, 0, 2). Can this request be safely granted immediately?',
          options: ['Yes -- after tentatively granting it, the resulting state still passes the safety check (e.g., safe sequence <P1, P3, P0, P2, P4>)', 'No -- the request exceeds P1\\u2019s Need vector', 'No -- the request exceeds the current Available vector', 'No -- granting it would leave every process permanently blocked'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'First check the request against P1\\u2019s Need (1,2,2): the request (1,0,2) satisfies 1<=1, 0<=2, 2<=2, so it does not exceed Need. Next check it against Available (3,3,2): 1<=3, 0<=3, 2<=2, so it also fits. Tentatively grant it: Available becomes (3-1, 3-0, 2-2) = (2,3,0), P1\\u2019s Allocation becomes (3,0,2) and its new Need becomes (0,2,0). Re-running the safety algorithm on this hypothetical state: P1 (Need (0,2,0) <= (2,3,0)) can finish, returning (5,3,2); then P3, then P0, then P2, then P4 can each finish in turn exactly as in question 4\\u2019s trace, just starting from a slightly different Available. Since a complete safe sequence still exists, the request can indeed be granted immediately.'
        },
        {
          id: 'os-deadlock-q12',
          q: 'How does "livelock" differ from "deadlock"?',
          options: ['In livelock, processes keep changing state in response to each other but make no actual progress; in deadlock, processes are simply blocked and their state never changes at all', 'Livelock only affects single-threaded programs, while deadlock only affects multi-threaded ones', 'Livelock is always resolved automatically by the OS; deadlock never is', 'There is no difference -- livelock is simply another name for deadlock'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'In a deadlock, every process in the affected set is completely blocked, permanently waiting on a resource, and none of their states change at all until external intervention (such as forced termination or resource preemption) occurs. In a livelock, processes are not blocked in the traditional sense -- they remain actively executing and continuously changing their state (for example, repeatedly backing off and retrying an operation in response to detecting a potential conflict with another process), yet this constant activity never actually results in any real progress toward completion, similar to two people repeatedly stepping aside for each other in a hallway and blocking each other again each time. Both are undesirable, but deadlock is static/frozen while livelock is dynamic/busy-but-stuck.'
        },
        {
          id: 'os-deadlock-q13',
          q: 'Allowing the operating system to forcibly take a resource away from a process holding it (and give that resource to another waiting process, later restoring or restarting the preempted process) is a deadlock prevention technique aimed at removing which Coffman condition?',
          options: ['No preemption', 'Circular wait', 'Hold and wait', 'Mutual exclusion'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The "no preemption" condition specifically states that resources cannot be forcibly taken away from a process; they can only be released voluntarily once the process has finished using them. If the OS instead implements a mechanism to forcibly preempt a resource from a process that is currently waiting for additional resources (for instance, saving that process\\u2019s state, taking back the resource, and giving it to a process that can make progress, later restoring the preempted process), this directly negates the no-preemption condition, since resources can now indeed be taken away without voluntary release. This is practical mainly for resources whose state can be easily saved and restored (like CPU registers or certain memory regions), and far less practical for resources like a printer mid-job.'
        },
        {
          id: 'os-deadlock-q14',
          q: 'Four processes have maximum requirements of 3, 4, 5, and 2 units respectively of a single shared resource type. What is the minimum total number of instances of this resource type needed to guarantee the system never deadlocks?',
          options: ['11', '14', '10', '15'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'For processes with differing maximum needs Max_1, Max_2, ..., Max_n of the same resource type, the general safe-threshold formula is (Max_1 - 1) + (Max_2 - 1) + ... + (Max_n - 1) + 1. Here the maximums are 3, 4, 5, and 2, so the sum of (Max_i - 1) is (3-1) + (4-1) + (5-1) + (2-1) = 2 + 3 + 4 + 1 = 10, and adding 1 gives a minimum of 11 total instances. With only 10 instances, the worst case has every process holding exactly one less than its maximum (2, 3, 4, and 1 units respectively, summing to exactly 10, using up everything), with each process still needing exactly one more unit to finish -- since nothing is free anywhere, this is an unavoidable circular wait. With 11, at least one process can always reach its maximum and complete.'
        },
        {
          id: 'os-deadlock-q15',
          q: 'What is true about interpreting cycles in a resource-allocation graph, comparing single-instance versus multi-instance resource types?',
          options: ['For single-instance resource types, a cycle is necessary and sufficient for deadlock; for multi-instance types, a cycle is necessary but not always sufficient', 'For single-instance types, a cycle is neither necessary nor sufficient; for multi-instance types, it is always both', 'Cycles are irrelevant to deadlock detection in both cases; only the Available vector matters', 'For multi-instance types, a cycle is sufficient but not necessary for deadlock'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'When every resource type involved has only one instance, any cycle in the resource-allocation graph guarantees deadlock (necessary and sufficient), since each resource can satisfy at most one requester and every process along the cycle is genuinely, permanently blocked. Once resource types can have multiple instances, a cycle remains a necessary condition for deadlock (no cycle definitely means no deadlock), but it is no longer sufficient by itself, because a resource type inside the cycle might still have a free, unallocated instance elsewhere that can satisfy one of the pending requests and unravel the whole chain, as demonstrated in question 10\\u2019s scenario. This distinction is exactly why deadlock detection for multi-instance systems needs the fuller Banker\\u2019s-style algorithm rather than a simple graph-cycle check.'
        }
      ]
    },
    {
      id: 'os-memory',
      name: 'Memory Management',
      theory: {
        intro: 'Memory management covers how the OS maps a process\\u2019s logical address space onto physical RAM, and it is one of the most numerically dense topics in GATE OS: expect direct bit-arithmetic on page numbers and offsets, page-table-size computations, multilevel page-table splits, TLB-based effective memory access time (EMAT), and classic dynamic-partition allocation (first fit, best fit, worst fit) tracing. Contiguous allocation questions test whether you can track fragmentation and predict which strategy can satisfy a sequence of allocation requests. Paging questions test whether you can convert bit counts into page-table sizes and vice versa. Segmentation questions test base-and-limit validity checks. This topic rewards careful, disciplined arithmetic far more than memorised formulas -- get one bit-width wrong and every downstream number in a multilevel paging question collapses.',
        core: 'Contiguous memory allocation gives each process one single contiguous block of physical memory. As processes are loaded and removed, memory develops holes of varying sizes -- external fragmentation -- even though the total free space may be more than sufficient, because no single hole is big enough for a given request. Three classic strategies decide which hole to use for an incoming request: first fit scans holes from the start and picks the first one large enough (fast, but tends to leave many small unusable fragments near the front); best fit scans all holes and picks the smallest one that is still large enough (tightest fit, minimising wasted space per allocation, but leaves many very small, often-useless leftover slivers, and is slower since it must scan everything); worst fit picks the largest available hole (leaves the biggest possible leftover fragment, hoping it stays usable later, but empirically performs worst overall and is also a full-scan algorithm). A well-known statistical result, the 50-percent rule, states that under first-fit allocation, given N allocated blocks, roughly 0.5N additional blocks worth of space are lost to fragmentation on average.\n\nInternal fragmentation is wasted space INSIDE an allocated block/page/frame because the allocation granularity is coarser than what the process actually needs (e.g., a process needing 4097 bytes with 4KB pages wastes almost an entire extra page). External fragmentation is wasted space BETWEEN allocated blocks -- free memory exists in total, but is too fragmented into small, non-contiguous pieces to satisfy a request. Paging trades external fragmentation for a small amount of internal fragmentation (in the last page of each process); pure segmentation trades internal fragmentation for external fragmentation, since segments are logically sized to match program units (code, stack, data) rather than fixed hardware-friendly sizes.\n\nPaging divides both logical address space (into pages) and physical memory (into frames) of the same fixed size, so any page can be placed in any free frame with no external fragmentation. A logical address is split into a page number and a page offset: if the page size is 2^d bytes, the low-order d bits of the logical address form the offset, and the remaining high-order bits form the page number, which indexes into the page table to find the corresponding frame number; the physical address is then (frame number x page size) + offset. Page table size = (number of pages) x (size of one page-table entry, PTE); the number of pages equals 2 raised to (total logical-address bits minus offset bits).\n\nWhen the logical address space is large, a single flat page table itself becomes too big to keep entirely in memory (or even to allocate contiguously), so multilevel (hierarchical) paging splits the page-number field itself into two or more index fields, each indexing into a separate level of page tables, so that any given process only needs to keep in memory the specific inner-level page-table pages it is actually using. A common GATE constraint is: choose each level\\u2019s index width so that one page table at that level fits exactly within a single page frame; if the PTE size is s bytes and the page/frame size is 2^d bytes, then each such page table holds 2^d / s entries, requiring log2(2^d / s) index bits per level.\n\nThe Translation Lookaside Buffer (TLB) is a small, fast, associative hardware cache of recent page-number-to-frame-number translations, avoiding a memory access to the page table on every single reference. Effective Memory Access Time (EMAT) combines the TLB hit and miss cases: on a TLB hit, translation costs only the TLB lookup time before the actual memory access; on a TLB miss, the CPU must additionally access the page table in memory (one extra memory access) before it can access the actual data. If TLB lookup time is t, memory access time is m, and TLB hit ratio is h, then EMAT = h(t + m) + (1 - h)(t + m + m) = t + m + (1 - h)m, assuming a single-level page table and no page faults.\n\nSegmentation represents a program as a collection of logically meaningful, variable-length segments (code, stack, heap, individual data structures), each described by a segment table entry holding a base address and a limit (length). A logical address is a pair (segment number, offset); the hardware checks offset < limit (bounds check) before computing physical address = base + offset; if the offset is not less than the limit, a segmentation fault (protection trap) is raised, since the reference falls outside that segment\\u2019s allocated bounds.',
        strategy: 'For bit-arithmetic paging questions, always start from the offset field: offset bits = log2(page size), and page-number bits = total address bits - offset bits; number of pages/frames = 2^(those bits). Page table size = number of page-table entries x PTE size -- do not forget to convert the final answer into the unit (KB/MB) the options use. For multilevel paging splits, remember the standard GATE trick: each level\\u2019s page table is deliberately sized to fit inside exactly one frame, so entries-per-level-table = frame size / PTE size, and the number of index bits for that level is log2 of that quantity; verify your split by adding all the index-field bit widths plus the offset bits and confirming the total equals the given address width exactly -- a mismatch means you have made an arithmetic slip somewhere. For EMAT questions, identify every access the hardware must actually perform on a hit versus a miss before writing the formula down; a single-level TLB+page-table system costs (t + m) on a hit and (t + 2m) on a miss, giving EMAT = h(t+m) + (1-h)(t+2m); do not conflate this with page-fault EMAT formulas from demand paging, which add a page-fault service time instead of a second memory access. For contiguous-allocation questions, simulate first fit, best fit, and worst fit as three completely separate, parallel traces on the same original hole list -- do not let one strategy\\u2019s allocation choices influence another\\u2019s, and always re-sort or re-scan holes exactly as each strategy requires (first fit in original order, best/worst fit by size). Worked mini-example: page size 4KB (2^12), logical address space 4GB (2^32), so offset = 12 bits, page number = 32 - 12 = 20 bits, giving 2^20 pages; with a 4-byte PTE, page table size = 2^20 x 4 = 2^22 bytes = 4MB -- exactly the kind of chained computation GATE expects you to carry through without rounding errors at any step.'
      },
      questions: [
        {
          id: 'os-memory-q1',
          q: 'What is the main drawback of pure contiguous memory allocation, where each process must occupy one single unbroken block of physical memory?',
          options: ['External fragmentation: free memory becomes scattered into holes too small individually to satisfy new requests, even if their total is sufficient', 'Internal fragmentation only, never external fragmentation', 'It requires every process to be exactly the same size', 'It cannot support more than one process in memory at a time'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'As processes of varying sizes are loaded into and removed from a contiguously allocated memory space, the free memory gradually breaks up into multiple non-contiguous holes of different sizes. Even if the sum of all free holes is more than enough to satisfy a new process\\u2019s memory request, no SINGLE hole may be large enough on its own, since contiguous allocation demands one unbroken block -- this wasted, scattered free space is called external fragmentation, and it is the defining weakness of pure contiguous allocation schemes. This is a different phenomenon from internal fragmentation, which involves wasted space within an allocated block rather than free space scattered between blocks; contiguous allocation can in principle support multiple processes simultaneously (each in its own contiguous region), so option D is also false.'
        },
        {
          id: 'os-memory-q2',
          q: 'Memory has holes, in order, of sizes 100K, 500K, 200K, 300K, 600K. Requests arrive in this order: 212K, 417K, 112K, 426K. Which allocation strategy can successfully satisfy ALL four requests?',
          options: ['Best fit only', 'First fit only', 'Worst fit only', 'All three strategies succeed equally'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'First fit: 212K goes into the 500K hole (leaves 288K); 417K goes into the 600K hole (leaves 183K); 112K goes into the 288K leftover (leaves 176K); now remaining holes are 100K, 176K, 200K, 300K, 183K -- none reach 426K, so the last request FAILS. Worst fit: 212K goes into the largest hole, 600K (leaves 388K); 417K goes into the next largest, 500K (leaves 83K); 112K goes into the largest remaining, 388K (leaves 276K); remaining holes are 100K, 83K, 200K, 300K, 276K -- again none reach 426K, so it FAILS too. Best fit: 212K goes into the tightest fitting hole, 300K (leaves 88K); 417K goes into 500K (leaves 83K); 112K goes into 200K (leaves 88K); 426K goes into 600K (leaves 174K) -- every request is satisfied. Hence only best fit succeeds here.'
        },
        {
          id: 'os-memory-q3',
          q: 'What is the key distinction between internal fragmentation and external fragmentation?',
          options: ['Internal fragmentation is wasted space inside an allocated unit; external fragmentation is wasted space scattered between allocated units', 'Internal fragmentation only occurs in segmentation; external fragmentation only occurs in paging', 'Internal fragmentation can never be reduced, while external fragmentation always can be eliminated with compaction', 'There is no meaningful difference between the two terms'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Internal fragmentation refers to memory wasted INSIDE a block, page, or frame that has already been allocated to a process, arising because the allocation granularity (e.g., a fixed page size) is coarser than the process\\u2019s actual requirement -- for example, a process needing just 1 byte more than a whole number of pages still gets allocated an entire extra page, wasting almost all of it. External fragmentation refers to memory that is technically free, but scattered as many small, non-contiguous holes BETWEEN allocated blocks, none individually large enough for a new request. Paging typically causes only internal fragmentation (in the last page of a process), while pure contiguous or segmented allocation causes external fragmentation; compaction can address external fragmentation but internal fragmentation cannot be compacted away, so option C reverses the truth.'
        },
        {
          id: 'os-memory-q4',
          q: 'A system has a 4 GB (2^32 byte) logical address space and a page size of 4 KB (2^12 bytes). How many bits of the logical address are used for the page number?',
          options: ['20 bits', '12 bits', '32 bits', '22 bits'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The page offset field always uses exactly log2(page size) bits, since the offset must be able to address every byte within a single page. Here the page size is 2^12 bytes, so the offset uses 12 bits. The remaining bits of the total 32-bit logical address are used for the page number: 32 - 12 = 20 bits. This means there are 2^20 (about 1 million) distinct pages in the logical address space, each of which the page table must be able to map to a physical frame number. A common error is to instead compute page count using the wrong total (e.g., dividing address space by page size incorrectly) rather than simply subtracting the offset-bit count from the total address-bit count.'
        },
        {
          id: 'os-memory-q5',
          q: 'Continuing from the previous question (20-bit page number, so 2^20 pages), if each page table entry (PTE) occupies 4 bytes, what is the total size of a single-level page table for one process using the full address space?',
          options: ['4 MB', '1 MB', '2 MB', '20 MB'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The total page-table size equals the number of page-table entries multiplied by the size of each entry. There are 2^20 pages, requiring 2^20 page-table entries, and each entry is 4 bytes (2^2 bytes), so the total page-table size is 2^20 x 2^2 = 2^22 bytes. Since 2^20 bytes is defined as 1 MB, 2^22 bytes equals 4 MB. This is exactly the kind of computation that motivates multilevel page tables in real systems: a full-address-space single-level page table per process, at 4 MB each, becomes wasteful when most processes only actually use a small fraction of their address space, since a flat table must still reserve entries for every possible page whether used or not.'
        },
        {
          id: 'os-memory-q6',
          q: 'A system uses two-level paging with a 32-bit logical address, a page size of 4 KB, and a page table entry size of 4 bytes, with each page-table page (at either level) required to fit exactly within one page frame. What are the bit-widths of the outer index, inner index, and offset fields respectively?',
          options: ['10 bits, 10 bits, 12 bits', '12 bits, 10 bits, 10 bits', '11 bits, 11 bits, 10 bits', '9 bits, 11 bits, 12 bits'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'The offset field is fixed by the page size: 4 KB = 2^12 bytes, so offset = 12 bits. Since each page-table page must itself fit within one 4 KB frame and each entry is 4 bytes, each page table can hold 4096 / 4 = 1024 = 2^10 entries, so each index field (both the outer index into the top-level table, and the inner index into a second-level table) needs 10 bits to address all 1024 possible entries. Adding these up: 10 (outer) + 10 (inner) + 12 (offset) = 32 bits, exactly matching the given logical address width -- this cross-check confirms the split is correct. This clean "fit exactly in one frame" constraint is the standard way GATE forces the index-width computation rather than giving it directly.'
        },
        {
          id: 'os-memory-q7',
          q: 'A system uses a TLB with a hit ratio of 90%. TLB lookup takes 10 ns, and a main memory access takes 100 ns. Assuming a single-level page table with no page faults, what is the effective memory access time (EMAT)?',
          options: ['120 ns', '110 ns', '100 ns', '210 ns'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'On a TLB hit (probability 0.9), the access cost is TLB lookup plus the one memory access to fetch the actual data: 10 + 100 = 110 ns. On a TLB miss (probability 0.1), the CPU must first do the TLB lookup (which misses, 10 ns), then access the page table in memory to get the frame number (100 ns), then access the actual data in memory (another 100 ns), totalling 10 + 100 + 100 = 210 ns. EMAT is the probability-weighted average: EMAT = 0.9 x 110 + 0.1 x 210 = 99 + 21 = 120 ns. A common mistake is forgetting the page-table memory access on a miss and only counting one extra memory reference instead of the TLB lookup plus two full memory accesses.'
        },
        {
          id: 'os-memory-q8',
          q: 'What is the key structural difference between paging and pure segmentation as memory management schemes?',
          options: ['Paging uses fixed-size units transparent to the programmer (avoiding external fragmentation but risking internal fragmentation); segmentation uses variable-size, logically meaningful units matching program structure (avoiding internal fragmentation but risking external fragmentation)', 'Paging always requires more physical memory than segmentation for the same process', 'Segmentation cannot support memory protection, while paging always does', 'Paging and segmentation are mathematically identical schemes with different names'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Paging divides both logical and physical memory into fixed-size units (pages and frames) that are invisible to the programmer -- since any page can go into any free frame, external fragmentation is eliminated, though the very last page of a process typically is not fully used, causing internal fragmentation. Segmentation instead divides a program\\u2019s logical address space into variable-length segments that correspond to natural, logically meaningful units of the program (such as the code segment, the stack, or a particular data structure); since each segment is sized exactly to its content, there is no internal fragmentation, but variable-sized segments scattered through physical memory can still leave unusable external gaps. Both schemes support memory protection via bounds checking (limit registers), so option C is false, and the two are structurally quite different, so option D is false.'
        },
        {
          id: 'os-memory-q9',
          q: 'A system uses paging with a page size of 1 KB (1024 bytes). A process\\u2019s page table maps logical page number 3 to physical frame number 7. What is the physical address corresponding to logical address 3172?',
          options: ['7268', '7172', '3172', '7072'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'With a page size of 1024 bytes, the logical address 3172 splits into a page number and offset by dividing by the page size: 3172 / 1024 = 3 with a remainder of 3172 - (3 x 1024) = 3172 - 3072 = 100. So the page number is 3 and the offset within that page is 100. The page table says logical page 3 maps to physical frame 7. The physical address is then computed as (frame number x page size) + offset = (7 x 1024) + 100 = 7168 + 100 = 7268. A common error is forgetting to first convert the frame number into a byte address (by multiplying by the page size) before adding the offset, which would incorrectly give something like frame number 7 concatenated arithmetically with the offset rather than properly scaled.'
        },
        {
          id: 'os-memory-q10',
          q: 'What is the primary purpose of a Translation Lookaside Buffer (TLB) in a paged memory system?',
          options: ['To cache recent page-number-to-frame-number translations in fast associative hardware, avoiding a memory access to the page table on every reference', 'To store the entire contents of every page currently in physical memory', 'To replace the page table entirely so the OS never needs one', 'To detect and resolve deadlocks between competing processes'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Without a TLB, every single memory reference made by a process would require at least two actual memory accesses: one to read the relevant page table entry (to find the frame number), and a second to actually access the desired data or instruction at the translated physical address. A TLB is a small, fast, associative (content-addressable) hardware cache that stores a limited number of recently used page-number-to-frame-number mappings; on a TLB hit, the translation is available immediately without needing to touch the page table in memory at all, cutting the effective access time roughly in half on average. It supplements, rather than replaces, the page table (which must still exist as the authoritative full mapping), and it has nothing to do with deadlock detection.'
        },
        {
          id: 'os-memory-q11',
          q: 'A system uses two-level paging with a 35-bit virtual address space, a page size of 8 KB, and a page table entry size of 4 bytes, with each page-table page required to fit exactly within one page frame. What are the bit-widths of the offset field and each of the two page-table index fields?',
          options: ['Offset = 13 bits, each index = 11 bits', 'Offset = 12 bits, each index = 12 bits', 'Offset = 13 bits, outer index = 12 bits, inner index = 10 bits', 'Offset = 14 bits, each index = 10 bits'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Page size is 8 KB = 2^13 bytes, so the offset field is 13 bits. Each page-table page must fit inside one 8 KB frame, and each PTE is 4 bytes, so each page table holds 8192 / 4 = 2048 = 2^11 entries, meaning each index field (outer and inner) needs 11 bits to index all 2048 entries. Checking the total: 11 (outer) + 11 (inner) + 13 (offset) = 35 bits, which exactly matches the given 35-bit virtual address width, confirming this split is correct. This question is deliberately built so that both index fields come out equal and the totals check out exactly, which is the standard sanity check GATE numericals of this type are designed to reward.'
        },
        {
          id: 'os-memory-q12',
          q: 'Which statement correctly compares best-fit and worst-fit dynamic memory allocation strategies?',
          options: ['Best fit tends to leave many very small, often-unusable leftover holes; worst fit deliberately leaves the largest possible leftover hole, hoping it remains usable, but this strategy performs worst overall in practice', 'Best fit always runs faster than worst fit because it stops at the first suitable hole', 'Worst fit guarantees zero external fragmentation, unlike best fit', 'Best fit and worst fit produce identical allocations for any input'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Best fit scans every free hole and selects the smallest one that is still large enough for the request, minimising the leftover space for that particular allocation; however, this tight fit often leaves behind slivers of free space too small to be useful for most future requests, accumulating many small, wasted fragments over time. Worst fit instead deliberately selects the largest available hole, on the theory that the resulting leftover fragment (also large) is more likely to remain useful later; despite this reasoning, extensive simulation studies have found worst fit tends to perform worse overall than both first fit and best fit. Both strategies require scanning the entire hole list to find the smallest or largest respectively, so best fit is not inherently faster (first fit is the one that can stop early), and neither strategy eliminates external fragmentation entirely.'
        },
        {
          id: 'os-memory-q13',
          q: 'A segment table has: Segment 1, base = 2000, limit = 300. A process presents logical address (segment = 1, offset = 350). What happens?',
          options: ['A segmentation fault (protection trap) occurs, because the offset 350 is not less than the limit 300', 'The physical address 2350 is generated successfully', 'The physical address 2000 is generated, ignoring the offset', 'The offset wraps around to 50 and address 2050 is generated'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Segmentation hardware always performs a bounds check before computing the physical address: it verifies that the given offset is strictly less than the segment\\u2019s limit (its declared length). Here the limit for segment 1 is 300, but the offset presented is 350, which is NOT less than 300 -- this means the process is trying to access memory beyond what was allocated to this segment. Rather than silently computing an out-of-bounds physical address (which would be a serious protection violation), the hardware raises a segmentation fault, trapping to the operating system, typically resulting in the process being terminated or signalled. There is no wraparound behaviour in standard segmentation hardware; the check is a strict less-than comparison, and any violation is treated as an addressing error, not silently corrected.'
        },
        {
          id: 'os-memory-q14',
          q: 'The "50-percent rule" for dynamic storage allocation under first-fit (and best-fit) states that, given N currently allocated memory blocks, approximately how much additional memory (measured in equivalent block units) is typically lost to fragmentation?',
          options: ['About 0.5N blocks worth of space', 'Exactly N blocks worth of space', 'No space at all is ever lost under first fit', 'About 2N blocks worth of space'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The 50-percent rule is a well-known statistical result (derived under certain probabilistic assumptions about block sizes and request patterns) stating that, for dynamic storage allocation using first-fit or best-fit strategies, if there are currently N allocated blocks of memory, roughly an additional 0.5N blocks\\u2019 worth of memory space will typically be lost to fragmentation -- meaning for every two blocks successfully allocated, roughly one further block\\u2019s worth of capacity becomes unusable due to scattered small holes. This rule of thumb is used to argue that even seemingly efficient dynamic allocation strategies waste a significant, predictable fraction of memory to fragmentation over time, motivating the move to paging (which sidesteps external fragmentation entirely) in most modern operating systems.'
        },
        {
          id: 'os-memory-q15',
          q: 'Among first fit, best fit, and worst fit, which one is typically the fastest to execute for a single allocation request, and why?',
          options: ['First fit, because it can stop scanning as soon as it finds the first hole large enough, without needing to examine every hole', 'Best fit, because it always finds the correct hole on its very first comparison', 'Worst fit, because the largest hole is always stored first in memory', 'All three strategies always take exactly the same amount of time'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'First fit scans the list of free holes in order and immediately allocates the very first one it encounters that is large enough for the request, without needing to look at any of the remaining holes -- this makes it the fastest strategy on average, since it can terminate its search early. Best fit and worst fit, by contrast, both fundamentally require examining every single free hole in the entire list before they can be certain they have found the smallest (best fit) or largest (worst fit) one respectively, making them inherently full-scan algorithms regardless of how the holes happen to be ordered in memory. Neither best fit nor worst fit has any guaranteed shortcut to avoid this exhaustive comparison, so both are generally slower than first fit for a single allocation decision.'
        }
      ]
    },
    {
      id: 'os-virtual-memory',
      name: 'Virtual Memory',
      theory: {
        intro: 'Virtual memory lets a process run with only part of its address space actually resident in physical memory, loading the rest on demand and evicting pages when memory is full. GATE\\u2019s favourite exercise here is a page-replacement trace: given a reference string and a fixed number of frames, count the page faults produced by FIFO, LRU, and Optimal replacement, and sometimes deliberately expose Belady\\u2019s anomaly, where FIFO produces MORE faults with MORE frames -- a genuinely counter-intuitive result unique to non-stack algorithms. Beyond tracing, expect conceptual questions on thrashing (when the system spends more time paging than executing) and the working-set model that tries to prevent it, plus effective-access-time numericals that fold in a page-fault rate and page-fault service time. Precision in tie-breaking and look-ahead is essential -- a single wrong eviction choice cascades into a wrong fault count for the rest of the trace.',
        core: 'Demand paging loads a page into physical memory only when it is actually referenced for the first time (or after being evicted), rather than loading a process\\u2019s entire address space upfront. Every memory reference to a page not currently resident triggers a page fault: the OS traps, finds a free frame (or selects a victim page to evict if memory is full), reads the required page in from secondary storage, updates the page table, and restarts the instruction that faulted.\n\nPage replacement algorithms decide which resident page to evict when a page fault occurs and no free frame exists. First-In-First-Out (FIFO) evicts the page that has been resident the longest, tracked via a simple queue ordered by load time; it is simple to implement but ignores how recently or frequently a page has actually been used, sometimes evicting a heavily used page purely because it happened to be loaded early. Least Recently Used (LRU) evicts the page that has not been referenced for the longest time, approximating the idea that recent access patterns predict near-future access; it generally performs well but requires either a hardware access-time stack/counter or an approximation (e.g., a reference-bit-based "clock"/second-chance algorithm) since exact LRU bookkeeping on every reference is expensive. Optimal (also called MIN or Belady\\u2019s optimal algorithm) evicts whichever resident page will not be referenced for the longest time in the future (or never again); it is provably the algorithm that minimises page faults for any given reference string, but it requires knowing the future reference sequence in advance, so it is used only as a theoretical lower bound for comparison, never in a real system.\n\nBelady\\u2019s anomaly is the surprising phenomenon where, for certain reference strings, increasing the number of available frames actually INCREASES the number of page faults under FIFO replacement -- intuitively one would always expect more frames to help or at worst not hurt, but FIFO is not a "stack algorithm" (its set of resident pages with m frames is not always a subset of its resident-page set with m+1 frames), which is precisely the property that allows this anomaly. LRU and Optimal are both stack algorithms and are mathematically guaranteed to never exhibit Belady\\u2019s anomaly -- adding frames under LRU or Optimal can never increase the fault count.\n\nThrashing occurs when the degree of multiprogramming is pushed so high, or a process is allocated so few frames, that the CPU spends most of its time servicing page faults and swapping pages in and out, rather than executing useful instructions -- system-wide CPU utilisation actually collapses even though the CPU scheduler, seeing low utilisation, may respond by admitting even more processes, worsening the problem in a vicious feedback loop. The working set model, introduced by Denning, is a leading defence against thrashing: the working set W(t, Delta) of a process at time t, with window size Delta, is defined as the set of distinct pages referenced in the most recent Delta references; a process is allocated (at least) as many frames as the size of its working set, and the OS can use the total working-set size across all active processes as an admission-control signal -- if the sum of all working sets exceeds the total number of available frames, the OS should suspend (swap out) some process entirely rather than let every process starve for frames simultaneously.\n\nEffective Access Time (EAT) under demand paging, given a page-fault rate p, a memory access time ma, and a page-fault service time pf (dominated by the disk I/O needed to bring in the missing page), is computed as EAT = (1 - p) x ma + p x pf, since with probability (1-p) the reference is a plain memory access, and with probability p it additionally (or instead, in the simplified model commonly used) incurs the full page-fault service time, which is usually many orders of magnitude larger than a normal memory access, so even a very small page-fault rate can dominate EAT completely.',
        strategy: 'For every replacement-algorithm trace, build a table with one row per reference and explicitly write the frame contents after each step -- do not try to track faults only mentally, since GATE reference strings are deliberately long enough that mental tracking causes errors. For FIFO, maintain a simple queue of load order and never let a hit reorder it. For LRU, maintain a recency list and move a page to the "most recently used" end on every hit, not just after a fault -- forgetting to update recency on a hit is the single most common LRU tracing error. For Optimal, at each fault, look strictly forward from the current position in the reference string and evict whichever currently resident page is used furthest in the future, treating a page with no remaining future reference as an immediate, automatic eviction candidate over any page that will be used again. Belady\\u2019s anomaly only ever shows up in FIFO-style questions asking you to compare fault counts across two different frame counts on the SAME reference string -- if a question asks this explicitly, expect the "more frames, more faults" trap and verify by tracing both frame counts fully rather than assuming monotonic improvement. For EAT-with-page-faults numericals, always check whether the given formula in the question intends p x pf alone or p x (pf + ma) -- state your assumption if the question does not fully specify, since page-fault service time so heavily dominates memory access time that both conventions usually round to a very similar final answer regardless. For working-set questions, carefully count exactly Delta references back from time t (inclusive of the reference at t itself, per the standard definition) and take the count of DISTINCT page numbers in that window, not the count of references. Worked mini-example: reference string 1,2,3,4,1,2,5,1,2,3,4,5 with 3 frames under FIFO gives 9 faults, while the identical string with 4 frames gives 10 faults -- the textbook demonstration of Belady\\u2019s anomaly; the same string under Optimal replacement with 3 frames gives only 7 faults, the provable minimum for that string.'
      },
      questions: [
        {
          id: 'os-virtual-memory-q1',
          q: 'What is "demand paging"?',
          options: ['Loading a page into physical memory only when it is actually referenced, rather than loading the entire process upfront', 'Loading every page of a process into memory before it starts executing', 'A scheme where physical memory is divided into variable-sized segments', 'Preemptively evicting pages before they are ever referenced'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Demand paging is a lazy-loading strategy: instead of bringing a process\\u2019s entire address space into physical memory before it can begin executing (which would waste memory on pages that may never even be touched, and delay startup), the OS loads each page only at the moment it is actually referenced for the first time. If a referenced page is not currently resident, a page fault is triggered, causing the OS to fetch that specific page from secondary storage into a free frame. This allows a process whose total virtual address space is much larger than physical memory to still run correctly, and it is the foundation on which virtual memory systems are built; it has nothing to do with segmentation, which is an unrelated way of structuring the logical address space itself.'
        },
        {
          id: 'os-virtual-memory-q2',
          q: 'For the reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 with 3 available frames (all initially empty), how many page faults occur under FIFO page replacement?',
          options: ['9', '7', '10', '12'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Tracing FIFO with a queue (front = oldest loaded): references 1,2,3,4 each fault as frames fill and then the oldest (1) is evicted for 4 -- queue becomes [2,3,4] (4 faults so far). Reference 1 faults, evicting 2 -- queue [3,4,1] (5 faults). Reference 2 faults, evicting 3 -- queue [4,1,2] (6 faults). Reference 5 faults, evicting 4 -- queue [1,2,5] (7 faults). References 1 and 2 are now both hits (no faults) since they are in {1,2,5}. Reference 3 faults, evicting the oldest (1) -- queue [2,5,3] (8 faults). Reference 4 faults, evicting the oldest (2) -- queue [5,3,4] (9 faults). Reference 5 is now a HIT since 5 is still resident in {5,3,4}. Total: 9 page faults.'
        },
        {
          id: 'os-virtual-memory-q3',
          q: 'For the same reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 with 3 available frames, how many page faults occur under LRU page replacement?',
          options: ['10', '9', '7', '8'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The first 7 references (1,2,3,4,1,2,5) fault identically to FIFO, evicting the least-recently-used page at each step, ending with resident set {1,2,5} and recency order updated to [4-evicted...,1,2,5] most-recent-last. The next two references, 1 and 2, are hits, and crucially LRU updates recency on every hit: after these two hits the recency order becomes [5,1,2] (5 is now least recently used, having not been touched since it was loaded). Reference 3 faults and evicts the LRU page, which is now 5 (not 1, unlike FIFO) -- resident set becomes {1,2,3}. Reference 4 faults, evicting LRU page 1 -- resident set {2,3,4}. Reference 5 faults again, since 5 was evicted earlier and is not in {2,3,4}. This gives 7 + 3 = 10 total faults -- one MORE than FIFO produced on this exact string, illustrating that LRU is not universally better than FIFO for every specific reference string, even though it usually performs at least as well on average.'
        },
        {
          id: 'os-virtual-memory-q4',
          q: 'For the same reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 with 3 available frames, how many page faults occur under Optimal (MIN) page replacement?',
          options: ['7', '9', '10', '6'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'References 1,2,3 fault to fill the 3 frames. Reference 4 faults; looking ahead, among {1,2,3}, page 1 is next needed soonest, page 2 next, and page 3 is not needed until much later -- so Optimal evicts 3, giving {1,2,4}. References 1 and 2 are hits. Reference 5 faults; among {1,2,4}, page 4 is not needed again until the very end while 1 and 2 are needed sooner, so Optimal evicts 4, giving {1,2,5} (5th fault). References 1 and 2 are hits again. Reference 3 faults; among {1,2,5}, neither 1 nor 2 is ever referenced again in the remaining string, so Optimal evicts one of them (say 1), giving {2,5,3} (6th fault). Reference 4 faults; among {2,5,3}, 5 is needed again (at the very last position) while 2 and 3 are not, so Optimal evicts one of the unneeded ones, giving {5,3,4} or {5,2,4} (7th fault). Reference 5 is now a hit since 5 was kept. Total: 7 faults -- the provable minimum for this string, and indeed fewer than both FIFO (9) and LRU (10) on it.'
        },
        {
          id: 'os-virtual-memory-q5',
          q: 'The reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 produces 9 page faults under FIFO replacement with 3 frames. What happens to the number of FIFO page faults on this SAME string if the number of frames is increased to 4?',
          options: ['It increases to 10 faults -- an example of Belady\\u2019s anomaly', 'It decreases to 6 faults, as expected with more memory', 'It stays exactly at 9 faults, unaffected by the extra frame', 'It becomes 0 faults since 4 frames can hold the entire working set'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Tracing FIFO with 4 frames: references 1,2,3,4 all fault, filling all 4 frames (4 faults). References 1 and 2 are hits (already resident). Reference 5 faults, evicting the oldest, 1 -- frames {2,3,4,5} (5 faults). Reference 1 faults, evicting oldest 2 -- {3,4,5,1} (6 faults). Reference 2 faults, evicting oldest 3 -- {4,5,1,2} (7 faults). Reference 3 faults, evicting oldest 4 -- {5,1,2,3} (8 faults). Reference 4 faults, evicting oldest 5 -- {1,2,3,4} (9 faults). Reference 5 faults again, evicting oldest 1 -- {2,3,4,5} (10 faults). This gives 10 total faults with 4 frames, MORE than the 9 faults with only 3 frames -- the textbook demonstration of Belady\\u2019s anomaly, which is possible specifically because FIFO is not a stack algorithm.'
        },
        {
          id: 'os-virtual-memory-q6',
          q: 'What is "thrashing" in the context of virtual memory?',
          options: ['A state where the system spends most of its time servicing page faults and swapping pages, rather than executing useful instructions, causing CPU utilisation to collapse', 'A technique for compressing rarely-used pages to save memory', 'The process of converting a logical address into a physical address', 'A hardware fault that permanently corrupts the page table'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Thrashing describes a pathological state in a virtual memory system where processes have been allocated too few frames relative to their actual memory needs (often because the degree of multiprogramming has been pushed too high), causing them to fault almost continuously as pages are evicted only to be immediately needed again shortly afterward. The system ends up spending nearly all of its time on the overhead of servicing page faults -- reading pages in from and writing pages out to secondary storage -- leaving very little actual CPU time for useful computation, so overall system throughput and CPU utilisation collapse dramatically even though the system appears extremely "busy". This is distinct from address translation (option C) and has nothing to do with page compression or hardware corruption.'
        },
        {
          id: 'os-virtual-memory-q7',
          q: 'What does the "working set" of a process at time t, with window size Delta, represent?',
          options: ['The set of distinct pages referenced in the most recent Delta memory references made by the process', 'The complete set of all pages the process will ever reference during its entire lifetime', 'The set of frames currently marked as free in physical memory', 'The set of pages that have never yet been referenced by the process'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The working set W(t, Delta) of a process, as defined by Denning, is the set of DISTINCT page numbers that appear among the most recent Delta memory references made by that process, up to and including the reference at time t. Its size gives a practical, dynamically changing estimate of how many frames the process currently needs to run without excessive faulting, based on the principle that recent access locality is a good predictor of near-future access needs. It is not the process\\u2019s entire lifetime reference set (which would be static and often far too large to be a useful allocation target), nor is it related to which physical frames happen to be free -- it is purely a property of one process\\u2019s own recent reference pattern.'
        },
        {
          id: 'os-virtual-memory-q8',
          q: 'A system has a memory access time of 100 ns and a page-fault service time of 8 ms. If the page-fault rate is 0.001 (0.1%), what is the effective access time (EAT), using EAT = (1 - p) x ma + p x (page-fault service time)?',
          options: ['Approximately 8099.9 ns (about 8.1 microseconds)', 'Approximately 100 ns', 'Approximately 8000 ns exactly', 'Approximately 4050 ns'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'First convert everything to the same unit: page-fault service time = 8 ms = 8,000,000 ns. Applying the formula: EAT = (1 - 0.001) x 100 + 0.001 x 8,000,000 = 0.999 x 100 + 0.001 x 8,000,000 = 99.9 + 8000 = 8099.9 ns, or roughly 8.1 microseconds. Notice how a page-fault rate of just 0.1% still causes the effective access time to balloon to about 81 times the plain memory access time of 100 ns -- this dramatic sensitivity is precisely because the page-fault service time (dominated by mechanical or flash-storage I/O latency) is many orders of magnitude larger than a memory access, so even rare page faults dominate the average heavily. This is exactly why keeping the page-fault rate extremely low is critical for acceptable system performance.'
        },
        {
          id: 'os-virtual-memory-q9',
          q: 'Why is exact LRU (Least Recently Used) page replacement rarely implemented precisely in real operating systems, being approximated instead (e.g., via a reference-bit-based clock/second-chance algorithm)?',
          options: ['Exact LRU requires either a hardware time-stamp counter or a doubly linked list updated on every single memory reference, which is prohibitively expensive in time and hardware', 'LRU is mathematically impossible to implement correctly on any hardware', 'LRU always performs worse than FIFO, so implementing it exactly is pointless', 'LRU requires knowledge of the future reference string, exactly like Optimal replacement'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Implementing LRU exactly would require the hardware to record, and continuously update, an extremely precise ordering of "how recently was this page referenced" for every page on literally every single memory access -- either via a hardware clock/counter updated and stored per page-table entry on every reference, or via maintaining an exact doubly linked list reordered on every access. Both approaches impose overhead on the fast path of every memory reference, which is unacceptable for performance. Real systems instead approximate recency using a much cheaper mechanism: a single reference bit per page, periodically cleared, combined with a circular "clock hand" that gives a page a second chance if its reference bit is set (the clock/second-chance algorithm), trading some accuracy for far lower overhead. LRU is not impossible, does not always underperform FIFO (question 3 notwithstanding), and unlike Optimal it needs no knowledge of the future.'
        },
        {
          id: 'os-virtual-memory-q10',
          q: 'Which of the following page-replacement algorithms is mathematically guaranteed to NEVER exhibit Belady\\u2019s anomaly, for any reference string, because it is a "stack algorithm"?',
          options: ['Both LRU and Optimal', 'Only FIFO', 'Both FIFO and Optimal', 'None of the algorithms have this guarantee'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A stack algorithm is one where the set of pages that would be resident with m frames is always a subset of the set of pages that would be resident with m+1 frames, for any reference string. Both LRU and Optimal satisfy this stack property, which mathematically guarantees that increasing the number of available frames can never increase (and can only decrease or leave unchanged) their page-fault count -- so neither can ever exhibit Belady\\u2019s anomaly. FIFO, by contrast, is famously NOT a stack algorithm, which is exactly why certain reference strings (such as the classic example in this topic) can cause FIFO to produce more faults with more frames, the defining signature of Belady\\u2019s anomaly. So it is FIFO, not LRU or Optimal, that is the algorithm actually susceptible to this counter-intuitive behaviour.'
        },
        {
          id: 'os-virtual-memory-q11',
          q: 'A process generates the page-reference sequence, in order: 2, 6, 1, 5, 7, 7, 7, 7, 5, 1 (positions 1 through 10). Using a working-set window of Delta = 4 (the current reference plus the previous 3), what is the working set W(t=10, Delta=4)?',
          options: ['{7, 5, 1} (size 3)', '{2, 6, 1, 5} (size 4)', '{7} (size 1)', '{5, 1, 7, 7} (size 4, counting duplicates)'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'A window of Delta = 4 at time t = 10 covers the 4 most recent references, which are positions 7, 8, 9, and 10 in the sequence: those references are 7, 7, 5, and 1 respectively. The working set is defined as the set of DISTINCT pages within this window, so duplicates collapse: {7, 7, 5, 1} becomes the distinct set {7, 5, 1}, giving a working-set size of 3. Note that this is different from simply looking at the first 4 references in the whole sequence (which would incorrectly give {2,6,1,5}) -- the window must always be measured backward from the current time t, not forward from the start of the reference string, and duplicate page numbers within the window must be counted only once.'
        },
        {
          id: 'os-virtual-memory-q12',
          q: 'What is the typical underlying cause that pushes a system into thrashing?',
          options: ['The degree of multiprogramming is increased so much that the frames allocated per process fall below what each process actually needs, triggering a vicious cycle of increasing faults and CPU idling', 'The disk used for swapping is replaced with a faster SSD', 'A single process is given far more frames than its working set requires', 'The page size is increased to match the working set size exactly'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Thrashing typically begins when the OS, observing low CPU utilisation, responds by admitting more processes to increase multiprogramming and thereby (it hopes) keep the CPU busier. However, since total physical memory is fixed, each additional process further shrinks the number of frames available per process. Once a process\\u2019s allocation drops below its actual working-set size, it starts faulting very frequently; the resulting flood of page-fault I/O keeps the CPU idle waiting on disk, which the scheduler misreads as low utilisation, prompting it to admit still MORE processes -- a destructive feedback loop that is the classic signature of thrashing. Giving processes MORE frames than needed (option C) or using faster swap hardware (option B) generally reduces the risk rather than causing it.'
        },
        {
          id: 'os-virtual-memory-q13',
          q: 'How does the working-set model help the OS prevent thrashing at a system-wide level?',
          options: ['By summing the working-set sizes of all currently active processes and suspending (swapping out) some process entirely if that sum exceeds the total number of available frames', 'By permanently fixing every process to exactly one frame regardless of its needs', 'By disabling paging entirely once thrashing is detected', 'By always allocating every process the maximum possible number of frames simultaneously'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The working-set model is used as an admission-control and load-control mechanism: the OS tracks each active process\\u2019s current working-set size (an estimate of how many frames it actually needs right now to avoid excessive faulting) and sums these across all resident processes. If this total working-set demand exceeds the number of physical frames actually available, the OS proactively reduces the degree of multiprogramming by suspending one or more entire processes (swapping them out completely) rather than letting every process limp along with insufficient frames and fault constantly. This deliberately trades a temporarily lower degree of multiprogramming for a system that continues to make real forward progress, which is precisely the opposite of what happens during uncontrolled thrashing.'
        },
        {
          id: 'os-virtual-memory-q14',
          q: 'A system has 62 total frames to distribute between two processes using proportional allocation based on their sizes: process P1 has size 10 (in some page-count unit) and process P2 has size 127. Using the standard proportional allocation formula (frames_i = (size_i / total_size) x total_frames, rounded down), how many frames does each process receive?',
          options: ['P1 receives 4 frames, P2 receives 57 frames', 'P1 receives 10 frames, P2 receives 52 frames', 'P1 receives 31 frames, P2 receives 31 frames', 'P1 receives 5 frames, P2 receives 57 frames'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Total size = 10 + 127 = 137. Proportional allocation gives each process a share of the total frames proportional to its own size relative to the combined size. For P1: (10 / 137) x 62 = 620 / 137 ~= 4.53, which rounds down to 4 frames. For P2: (127 / 137) x 62 = 7874 / 137 ~= 57.47, which rounds down to 57 frames. Note that 4 + 57 = 61, one frame short of the full 62 -- this leftover frame due to rounding is typically held in a free-frame pool or given to whichever process has the larger fractional remainder, but the core proportional calculation itself yields 4 and 57 as the two allocations, which is the standard textbook result for exactly these two input sizes.'
        },
        {
          id: 'os-virtual-memory-q15',
          q: 'When a page fault occurs, which of the following correctly orders the OS\\u2019s response?',
          options: ['Trap to the OS, locate the required page on secondary storage, find or evict a free frame, load the page into that frame and update the page table, then restart the faulting instruction', 'Terminate the faulting process immediately, then log the error', 'Restart the faulting instruction first, then check afterward whether the required page is now present', 'Ignore the fault and return a default value of zero to the faulting instruction'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A page fault triggers a well-defined recovery sequence: the hardware traps into the operating system (switching to kernel mode), the OS determines which page was being referenced and locates it on secondary storage (or determines the reference was actually invalid, in which case the process is terminated instead), finds a free frame or selects and evicts a victim page if none is free, reads the required page into that frame from disk, updates the page table entry to reflect the new mapping, and finally restarts the very instruction that originally caused the fault (which now succeeds, since the required page is present). Terminating the process immediately, restarting before the page is actually loaded, or silently returning a default value would all produce an incorrect or crashing program, since the instruction genuinely needs that page\\u2019s actual data to proceed.'
        }
      ]
    },
    {
      id: 'os-file-disk',
      name: 'File Systems & Disk Scheduling',
      theory: {
        intro: 'This topic covers how files are physically laid out on disk and how the OS decides the order in which pending disk I/O requests are serviced. GATE\\u2019s file-allocation questions revolve around computing the maximum possible file size supported by an inode-style indexed allocation scheme (direct, single-, double-, and triple-indirect blocks) and understanding free-space-management structures like bitmaps, whose own size must sometimes be computed from the disk and block size. Disk-scheduling questions are pure computation: given a queue of cylinder requests and a starting head position, compute the total head movement (in cylinders) under FCFS, SSTF, SCAN, C-SCAN, and LOOK, and compare the results. These numericals are extremely mechanical once the algorithm\\u2019s rule is clear, and they show up almost every year in some form, often worth two marks each since a full trace is required.',
        core: 'File allocation methods decide how a file\\u2019s data blocks are physically arranged on disk. Contiguous allocation stores a file as one unbounded run of consecutive blocks -- fast sequential AND direct access, but suffers external fragmentation and requires knowing the file\\u2019s final size in advance (or costly relocation to grow it). Linked allocation stores a file as a chain of blocks, each holding a pointer to the next; there is no external fragmentation and files can grow easily, but random/direct access is slow (must traverse the chain from the start) and reliability suffers if any single pointer is corrupted, breaking the entire chain from that point onward, and each block wastes a few bytes on the pointer itself. Indexed allocation gives each file one (or more) index block containing pointers to all of the file\\u2019s data blocks, supporting fast direct access without contiguous placement; the classic Unix inode extends this using direct pointers for small files plus single-, double-, and triple-indirect pointers to scale up to very large files without wasting a huge index block on small files.\n\nMaximum file size under an inode scheme: if a block holds B bytes and each pointer occupies P bytes, then one block can hold B/P pointers. With d direct pointers, one single-indirect pointer, one double-indirect pointer, and one triple-indirect pointer, the maximum file size is d x B (direct) + (B/P) x B (single indirect) + (B/P)^2 x B (double indirect) + (B/P)^3 x B (triple indirect). Because (B/P) is typically a large number (often 1024 for common block/pointer sizes), each successive indirection level scales the addressable space by roughly another factor of 1000, so the triple-indirect term dominates the total maximum file size overwhelmingly, while the direct blocks primarily exist to make small-file access fast (no indirection needed at all).\n\nThe FAT (File Allocation Table) method is a variant of linked allocation where the "next block" pointers for every file are collected into one single table (the FAT) kept in a reserved area of the disk, rather than scattered a few bytes inside each individual data block; this lets the OS traverse or cache the whole allocation chain in memory without repeatedly reading scattered blocks on disk, somewhat improving random-access performance over pure linked allocation while retaining the no-external-fragmentation benefit.\n\nFree space on disk must itself be tracked; common structures include: a bitmap (one bit per block, 1 = allocated / 0 = free -- compact and fast to scan for contiguous runs, but its own size scales with total disk capacity: total blocks / 8 bytes); a linked list of free blocks (no wasted space proportional to disk size beyond the list itself, but slow to find a contiguous run and consumes a pointer per free block); grouping (the first free block stores addresses of several other free blocks, forming a chain of chunks, speeding up finding many free blocks at once); and counting (since blocks are often freed and allocated in contiguous groups, store a starting block address plus a count of contiguous free blocks, compactly representing a whole run).\n\nDisk scheduling decides the ORDER in which a queue of pending cylinder requests is serviced, aiming to minimise total head movement (seek time is usually the dominant cost). FCFS services requests strictly in arrival order -- simple and fair but can produce long, erratic head movements. SSTF (Shortest Seek Time First) always services whichever pending request is closest to the current head position -- much better average movement than FCFS, but can cause starvation of far-away requests if closer requests keep arriving. SCAN moves the head in one direction, servicing every request it passes, all the way to the physical end of the disk (even if no request lies exactly there), then reverses direction and sweeps back. C-SCAN (Circular SCAN) also sweeps in one direction servicing requests, but upon reaching the end, it does NOT reverse and service on the way back; instead, it jumps immediately back to the opposite end of the disk and starts a fresh sweep in the same original direction, giving more uniform wait times since every cylinder is revisited via the same one-directional pattern. LOOK is a practical refinement of SCAN: instead of travelling all the way to the physical end of the disk, it reverses direction as soon as it has serviced the LAST request in the current direction, saving the wasted movement to and from the disk boundary that plain SCAN incurs.',
        strategy: 'For file-allocation-size numericals, first compute B/P (pointers per block), since every subsequent term in the formula is a power of this same number -- get this one ratio right and the rest of the computation is just repeated multiplication. Recognise immediately that the triple-indirect term dominates the total by many orders of magnitude, so if a question only asks for an approximate maximum size, you can often ignore the direct and single-indirect contributions entirely and just compute (B/P)^3 x B. For disk-scheduling numericals, always begin by writing the request queue sorted by cylinder number as well as in original arrival order -- FCFS needs the arrival order, while SSTF, SCAN, C-SCAN, and LOOK are all easier to trace correctly once you can see the sorted layout relative to the current head position. For SCAN and C-SCAN, explicitly decide (or note the direction stated in the question) whether the head is moving toward increasing or decreasing cylinder numbers first, and remember that SCAN/C-SCAN travel all the way to the disk\\u2019s physical boundary (0 or the maximum cylinder) even if no pending request sits exactly there, while LOOK stops exactly at the last request in that direction. For C-SCAN specifically, be explicit about whether the return jump back to the starting boundary is counted in total head movement or treated as free (different textbooks/questions vary this convention) -- state the assumption you are using if the question does not make it explicit, since the final numeric answer depends entirely on this choice. Worked mini-example: head at 50, disk 0-199, pending requests 20, 45, 60, 90, 150, 175, moving up first. LOOK services 60, 90, 150, 175 (total movement so far 125), then reverses down through 45, 20 (another 155), for a total of 280 -- noticeably less than SCAN\\u2019s 328 for the identical queue, precisely because LOOK skips the unnecessary trip all the way out to cylinder 199 and back to 0.'
      },
      questions: [
        {
          id: 'os-file-disk-q1',
          q: 'Which file allocation method allows the fastest direct (random) access to any block of a file while avoiding the requirement that the file occupy strictly consecutive disk blocks?',
          options: ['Indexed allocation, using an index block of pointers to the file\\u2019s data blocks', 'Linked allocation, using a pointer stored in every data block', 'Contiguous allocation only', 'None of these methods support direct access'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Indexed allocation dedicates a separate index block to each file, holding the disk addresses (pointers) of every one of the file\\u2019s actual data blocks. To access any block of the file directly, the OS simply reads the index block once and then jumps straight to the correct data block using the appropriate pointer -- no traversal of a chain is needed, and the data blocks themselves need not be contiguous. Linked allocation, by contrast, requires walking the chain of pointers from the very first block to reach any later block, making random access slow. Contiguous allocation does support fast direct access too, but only because it forces the file into consecutive blocks, which is the very constraint the question asks to avoid, so indexed allocation is the better match.'
        },
        {
          id: 'os-file-disk-q2',
          q: 'A Unix-style inode has 10 direct block pointers, one single-indirect pointer, one double-indirect pointer, and one triple-indirect pointer. The block size is 4 KB and each pointer occupies 4 bytes, so exactly 1024 pointers fit in one block. Which component contributes the overwhelming majority of the maximum supported file size, and roughly how large is that maximum?',
          options: ['The triple-indirect block, giving a maximum file size on the order of 4 TB', 'The direct blocks, giving a maximum file size on the order of 40 KB', 'The single-indirect block, giving a maximum file size on the order of 4 MB', 'The double-indirect block, giving a maximum file size on the order of 4 GB'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Direct blocks contribute 10 x 4 KB = 40 KB. The single-indirect block contributes 1024 x 4 KB = 4 MB (1024 pointers, each pointing to a 4 KB block). The double-indirect block contributes 1024 x 4 MB = 4 GB (1024 single-indirect blocks worth). The triple-indirect block contributes 1024 x 4 GB = 4 TB (1024 double-indirect blocks worth). Summing all four gives approximately 4 TB + 4 GB + 4 MB + 40 KB, but since each level is roughly 1024 times larger than the one before it, the triple-indirect term of about 4 TB utterly dwarfs all the other contributions combined -- so the maximum file size is dominated overwhelmingly by the triple-indirect block, and the direct blocks exist mainly to make small-file access fast without any indirection overhead, not to contribute meaningfully to the maximum size.'
        },
        {
          id: 'os-file-disk-q3',
          q: 'What is the defining characteristic of the FAT (File Allocation Table) file-allocation method compared to plain linked allocation?',
          options: ['The "next block" pointers for all files are collected into one central table stored in a reserved disk area, rather than embedded a few bytes inside each individual data block', 'FAT allocates every file as one strictly contiguous run of blocks', 'FAT requires every file to declare its final size in advance, like contiguous allocation', 'FAT eliminates the need for any free-space management structure'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'FAT is fundamentally a variant of linked allocation: it still represents each file as a chain of blocks. The key difference is where the "next block" pointer information is stored -- instead of embedding a pointer inside each individual data block (as in classic linked allocation, wasting a few bytes per block and requiring a disk read of the data block itself just to find the next pointer), FAT collects every file\\u2019s complete chain of next-block pointers into one single, centralized table located in a reserved area of the disk. This table can be read into memory and cached, letting the OS traverse or even randomly jump through a file\\u2019s block chain without needing to read each data block on disk one at a time purely to discover the next pointer, somewhat improving performance while retaining linked allocation\\u2019s freedom from external fragmentation.'
        },
        {
          id: 'os-file-disk-q4',
          q: 'Which of the following is a standard technique for tracking free (unallocated) disk blocks?',
          options: ['A bitmap with one bit per block (1 = allocated, 0 = free)', 'Storing the entire file system permanently in RAM to avoid needing free-space tracking', 'Recompiling the operating system whenever disk space changes', 'Using the file\\u2019s inode number as the only indicator of free space'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A bitmap (or bit vector) is one of the most common free-space-management structures: it dedicates exactly one bit to every block on the disk, with the bit set to 1 if that block is currently allocated and 0 if it is free. This representation is compact, and it is particularly convenient for quickly finding several contiguous free blocks by scanning for a run of consecutive 0 bits. Other standard techniques include a linked list of free blocks, a grouping scheme (where one free block stores the addresses of several other free blocks), and a counting scheme (storing a starting address plus a count of contiguous free blocks). Keeping the entire file system in RAM or tying free-space tracking to inode numbers are not real or standard techniques used by any actual file system.'
        },
        {
          id: 'os-file-disk-q5',
          q: 'A disk has a total capacity of 1 TB (2^40 bytes) and a block size of 4 KB (2^12 bytes). Using a bitmap with one bit per block, what is the total size of the bitmap needed to track free space on this entire disk?',
          options: ['32 MB', '128 MB', '1 MB', '8 MB'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The number of blocks on the disk is total capacity divided by block size: 2^40 / 2^12 = 2^28 blocks (about 268.4 million blocks). Since the bitmap uses exactly one bit per block, it needs 2^28 bits in total. Converting bits to bytes (dividing by 8, since 1 byte = 8 bits = 2^3 bits): 2^28 / 2^3 = 2^25 bytes. Since 2^20 bytes is defined as 1 MB, 2^25 bytes = 2^5 x 2^20 = 32 x 1 MB = 32 MB. So a 1 TB disk with 4 KB blocks requires a 32 MB bitmap purely to track which of its blocks are free or allocated -- illustrating why bitmap size itself becomes a real, non-negligible design consideration as disk capacities grow into the terabyte range.'
        },
        {
          id: 'os-file-disk-q6',
          q: 'A disk with cylinders numbered 0 to 199 has its head currently at cylinder 50. Pending requests arrive, and must be serviced strictly in this arrival order: 45, 90, 150, 60, 20, 175. Using FCFS disk scheduling, what is the total head movement (in cylinders)?',
          options: ['395', '355', '410', '325'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'FCFS services requests strictly in the order they arrive, regardless of physical distance. Starting at 50: to 45 is |45-50| = 5; to 90 is |90-45| = 45; to 150 is |150-90| = 60; to 60 is |60-150| = 90; to 20 is |20-60| = 40; to 175 is |175-20| = 155. Summing these individual movements: 5 + 45 + 60 + 90 + 40 + 155 = 395 total cylinders of head movement. Notice how the erratic order (jumping from 150 down to 60, then further down to 20, then all the way up to 175) produces substantial wasted back-and-forth movement -- this inefficiency purely due to arrival order, regardless of physical proximity, is exactly the weakness that motivates smarter algorithms like SSTF, SCAN, and LOOK.'
        },
        {
          id: 'os-file-disk-q7',
          q: 'Using the same setup -- disk cylinders 0-199, head starting at 50, pending requests 45, 90, 150, 60, 20, 175 -- what is the total head movement under SSTF (Shortest Seek Time First) scheduling?',
          options: ['290', '270', '310', '250'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'SSTF always picks whichever pending request is currently closest to the head. From 50, the closest is 45 (distance 5); move there. From 45, the closest remaining is 60 (distance 15); move there. From 60, the closest remaining is 90 (distance 30); move there. From 90, the closest remaining is 150 (distance 60); move there. From 150, the closest remaining is 175 (distance 25); move there. Finally, only 20 remains, at distance |175-20| = 155. Total movement: 5 + 15 + 30 + 60 + 25 + 155 = 290. Notice SSTF greedily grabs nearby requests first, leaving the lone far-away request (20) stranded until the very end, producing one large final jump -- this is exactly the mechanism by which SSTF can starve distant requests if new nearby requests kept arriving instead.'
        },
        {
          id: 'os-file-disk-q8',
          q: 'Using the same setup -- disk cylinders 0-199, head at 50, requests 45, 90, 150, 60, 20, 175 -- and assuming the head moves toward INCREASING cylinder numbers first, what is the total head movement under SCAN scheduling?',
          options: ['328', '298', '348', '280'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Moving upward from 50, SCAN services every request it passes in increasing order (60, 90, 150, 175), then continues all the way to the physical end of the disk at cylinder 199, even though no request sits exactly there. This upward leg covers 199 - 50 = 149 cylinders. SCAN then reverses direction and sweeps all the way down, servicing the remaining requests below the starting point (45, then 20) along the way, continuing conceptually to cylinder 0 as SCAN\\u2019s definition requires reaching the boundary -- but here the relevant movement is simply the distance from 199 down to the lowest request, 20, without needing to continue further since no requests exist below 20. This downward leg covers 199 - 20 = 179 cylinders. Total: 149 + 179 = 328 cylinders.'
        },
        {
          id: 'os-file-disk-q9',
          q: 'Using the same setup -- disk cylinders 0-199, head at 50, requests 45, 90, 150, 60, 20, 175 -- and assuming the head moves toward INCREASING cylinder numbers first, with the return jump distance counted as part of head movement, what is the total head movement under C-SCAN scheduling?',
          options: ['393', '373', '413', '349'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Moving upward from 50, C-SCAN services 60, 90, 150, and 175 along the way, then continues to the physical end of the disk at cylinder 199 -- this leg covers 199 - 50 = 149 cylinders. Unlike SCAN, C-SCAN does not reverse and service on the way back; instead, it jumps immediately back to the opposite end of the disk, cylinder 0, without servicing anything during this jump -- this repositioning covers the full disk width, 199 cylinders (counting this return jump as part of total head movement, per this question\\u2019s stated convention). From cylinder 0, C-SCAN then resumes moving in its original (increasing) direction, servicing the two remaining lower requests, 20 and then 45, along the way -- this final leg covers 45 - 0 = 45 cylinders. Total: 149 + 199 + 45 = 393 cylinders.'
        },
        {
          id: 'os-file-disk-q10',
          q: 'Using the same setup -- disk cylinders 0-199, head at 50, requests 45, 90, 150, 60, 20, 175 -- and assuming the head moves toward INCREASING cylinder numbers first, what is the total head movement under LOOK scheduling?',
          options: ['280', '328', '260', '300'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'LOOK behaves exactly like SCAN except that it reverses direction as soon as it services the LAST pending request in the current direction, rather than continuing all the way to the disk\\u2019s physical boundary. Moving upward from 50, LOOK services 60, 90, 150, and finally 175 -- the last request in the upward direction -- covering 175 - 50 = 125 cylinders, and then immediately reverses (no need to continue up to 199, since there are no pending requests beyond 175). Moving downward from 175, LOOK services 45 and then 20 -- the last request in the downward direction -- covering 175 - 20 = 155 cylinders. Total: 125 + 155 = 280 cylinders, noticeably less than SCAN\\u2019s 328 for this identical request queue, precisely because LOOK avoids the wasted trips out to cylinders 199 and 0 that plain SCAN would make.'
        },
        {
          id: 'os-file-disk-q11',
          q: 'What is the main practical drawback of SSTF (Shortest Seek Time First) disk scheduling, despite its generally low average head movement?',
          options: ['It can cause starvation of requests that are physically far from the current head position, if closer requests keep arriving continuously', 'It always produces strictly higher total head movement than FCFS', 'It requires the disk head to always start at cylinder 0', 'It cannot be implemented in software, only in disk-controller hardware'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'SSTF greedily always chooses whichever pending request is currently nearest to the head, which minimises the seek distance for each individual step and generally yields a good average total head movement. However, if requests keep arriving in a cluster near the current head position, SSTF will keep servicing those nearby requests indefinitely, continually postponing any request that happens to be located far away -- in the worst case, such a far-away request could be delayed for an extremely long time or effectively "starved". This is precisely why algorithms like SCAN, C-SCAN, and LOOK, which sweep methodically across the whole disk in a bounded pattern, are often preferred in systems needing more predictable, bounded worst-case wait times, even though they may have slightly higher average movement than SSTF.'
        },
        {
          id: 'os-file-disk-q12',
          q: 'What is the key behavioural difference between SCAN and C-SCAN (Circular SCAN) disk scheduling?',
          options: ['SCAN reverses direction and services requests on the way back after reaching the disk\\u2019s end; C-SCAN instead jumps back to the starting boundary without servicing anything during the jump, then sweeps again in the same original direction', 'SCAN only services requests below the current head position; C-SCAN only services requests above it', 'C-SCAN never reaches the physical end of the disk, unlike SCAN', 'SCAN and C-SCAN are identical algorithms with different names'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'SCAN sweeps the head in one direction, servicing every request encountered along the way, all the way to the disk\\u2019s physical boundary, and then reverses course, sweeping back in the opposite direction and servicing requests it missed on the first pass. C-SCAN also sweeps in one direction servicing requests up to the boundary, but instead of reversing and servicing on the way back, it treats the disk as circular: it jumps immediately (without servicing any request during this jump) back to the opposite boundary, and then begins a fresh sweep in the SAME original direction as before. This circular, one-directional pattern gives C-SCAN much more uniform waiting times across all cylinders, since a request just missed by the head always waits roughly one full sweep, rather than sometimes waiting almost two full sweeps as can happen under plain SCAN.'
        },
        {
          id: 'os-file-disk-q13',
          q: 'How does LOOK differ from SCAN?',
          options: ['LOOK reverses direction as soon as it services the last pending request in the current direction, without travelling all the way to the disk\\u2019s physical boundary; SCAN always travels all the way to the boundary regardless of where the last request lies', 'LOOK always travels further than SCAN for the same request queue', 'LOOK can only move in one fixed direction and never reverses', 'LOOK and SCAN differ only in which resource (CPU vs disk) they schedule'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'SCAN sweeps the head all the way out to the disk\\u2019s physical boundary in its CURRENT direction of travel before reversing, even if the last pending request in that direction was serviced well before the boundary -- that trailing run to the edge is wasted movement. LOOK is the practical optimisation: it "looks ahead" at the request queue and reverses as soon as the LAST pending request in the current direction is serviced, never touching the boundary unless a request actually sits there. Convention note for numericals (the one used by Galvin and standard GATE answer keys, and by question 8 here): total head movement is counted until the final request is serviced, so the boundary is touched on each full sweep in progress, but the simulation stops at the last serviced request -- SCAN does not tack on a final run to the far boundary after all requests are done. With that convention, LOOK\\u2019s total movement is always less than or equal to SCAN\\u2019s (328 for SCAN versus 280 for LOOK on the identical queue in questions 8 and 10).'
        },
        {
          id: 'os-file-disk-q14',
          q: 'Based on the computations in questions 7 and 10 above -- for the identical request queue (disk 0-199, head at 50, requests 45, 90, 150, 60, 20, 175) -- how does LOOK\\u2019s total head movement compare with SSTF\\u2019s total head movement?',
          options: ['LOOK (280) is slightly less than SSTF (290) for this particular request queue', 'LOOK is always exactly equal to SSTF for any request queue', 'SSTF is always strictly better than LOOK for any request queue', 'LOOK is always worse than SSTF because it must reach the disk boundary'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'From the earlier traces, SSTF produces a total head movement of 290 cylinders on this request queue, greedily grabbing nearby requests but leaving cylinder 20 stranded for one large final jump of 155 cylinders. LOOK, sweeping methodically up to the last request in each direction (175, then 20) without any wasted detour to the disk boundary, produces a total of 280 cylinders. So for this SPECIFIC queue, LOOK slightly outperforms SSTF. This is not a general law, however -- there is no algorithm among SSTF, SCAN, C-SCAN, and LOOK that is universally best for every possible request queue and head position; each algorithm\\u2019s relative performance depends entirely on the specific spatial distribution of pending requests, which is exactly why GATE numericals require a full trace rather than relying on a memorised ranking.'
        },
        {
          id: 'os-file-disk-q15',
          q: 'What is a significant drawback of linked file allocation, where each data block stores a pointer to the next block of the file?',
          options: ['Direct (random) access to a specific block requires sequentially traversing the chain from the very first block, and a single corrupted pointer breaks the chain for every block after it', 'It always causes severe external fragmentation, just like contiguous allocation', 'It cannot support files larger than one single disk block', 'It requires the entire file to be loaded into memory before any block can be read'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'In linked allocation, to reach any particular block of a file -- say, the 100th block -- the OS must start at the first block and follow the chain of "next block" pointers one at a time, reading 99 blocks purely to find the pointers before it can even access the desired 100th block; this makes direct/random access very slow compared to indexed or contiguous allocation. Additionally, because each block\\u2019s only link to the rest of the file is its single pointer to the next block, if that pointer becomes corrupted or unreadable due to a disk error, every block after that point in the chain becomes permanently unreachable, since there is no independent way to know which block should logically follow. Linked allocation actually AVOIDS external fragmentation (any free block can be used, since the file need not be contiguous), and it fully supports files spanning arbitrarily many blocks, so options B and C are incorrect, and option D describes no real file-allocation scheme.'
        }
      ]
    }
  ]
};

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-processes';}).theory.deep = 'PROCESS CONCEPT AND PCB\n\nA process is a program in execution, consisting of the text (code) segment, data segment, heap, stack, and the current values of the program counter, registers, and stack pointer. The Process Control Block (PCB) is the kernel data structure that captures a process\'s entire execution context so it can be suspended and resumed transparently. PCB fields:\n• Process ID (PID), parent PID (PPID)\n• Process state (New, Ready, Running, Waiting, Terminated)\n• Program counter and CPU register contents\n• CPU scheduling info: priority, scheduling queue pointers\n• Memory management info: base/limit registers, page table or segment table pointers\n• Accounting info: CPU time consumed, time limits, account numbers\n• I/O status info: list of open files, allocated I/O devices\n\nPROCESS STATE DIAGRAM\n\nNew -> Ready (admitted by long-term scheduler)\nReady -> Running (dispatched by short-term scheduler)\nRunning -> Ready (preempted, e.g. timer interrupt expires)\nRunning -> Waiting (process requests I/O or waits on an event)\nWaiting -> Ready (I/O completion or event occurs -- NEVER Waiting -> Running directly)\nRunning -> Terminated (process finishes or is killed)\n\nThe Waiting -> Running transition does not exist because the CPU may be busy with another process when the awaited event completes; the OS can only move the process to Ready, and the scheduler later decides when it actually runs.\n\nCONTEXT SWITCH\n\nA context switch saves the PCB (registers, PC, stack pointer, memory-map info) of the currently running process into its PCB slot, and loads the PCB of the newly selected process. It is pure overhead: no user instruction of either process executes during the switch itself. Its cost depends on the number of registers, whether TLB/cache must be flushed, and hardware support (e.g. multiple register sets). Switching between two threads of the SAME process is cheaper than between two different processes because the address space (page table, base/limit registers) does not need to change, so the TLB does not need to be flushed.\n\nPROCESS VS THREAD\n\nA process owns its own independent address space (code, data, heap, stack) and resources (open files, signal handlers); processes are isolated from each other unless they use explicit IPC. A thread is a unit of CPU scheduling within a process: threads of the same process share the code segment, global/static data, heap, and open files, but each thread keeps its own stack, register set, program counter, and thread-local storage. Because threads share memory, creating a thread and switching between threads of one process is far cheaper than creating a process (fork) or switching between processes, since no new address space or page table needs to be built and no TLB flush is required.\n\nTHREADING MODELS\n\n• Many-to-one: many user-level threads map onto a single kernel thread. Thread management is done entirely in user space (fast create/switch), but if one thread makes a blocking system call the entire process blocks, and no true parallelism across cores is possible since the kernel only sees one schedulable entity.\n• One-to-one: each user thread maps to its own kernel thread. Allows true parallelism on multicore systems and one thread blocking does not stall others, but thread creation is costlier since each requires a kernel-level thread to be created (a system call).\n• Many-to-many: m user threads multiplex onto n kernel threads (n <= m), giving the OS flexibility to balance parallelism against overhead; this is the most general and complex model.\n\nSYSTEM CALLS AND fork()\n\nA system call is the only sanctioned way a user-mode process requests kernel services (I/O, process management, memory allocation). It executes a trap instruction that switches the CPU from user mode to kernel mode, runs the requested kernel routine, and then returns control to user mode -- unlike an ordinary function call, which never changes privilege level.\n\nfork() creates a new process (the child) that is a near-exact duplicate of the calling process (the parent): same code, a copy of the data/heap/stack (traditionally copy-on-write in modern OSes), and execution resumes for BOTH processes at the statement immediately following the fork() call -- not from main(). fork() returns twice: it returns the child\'s PID (a positive integer) to the parent, and it returns 0 to the child; it returns a negative value only if process creation failed.\n\nFORK-COUNTING RULES\n\n• n sequential, unconditional fork() calls (one after another, not in a conditional) result in 2^n total processes, because every process alive at each fork point (both the original lineage and every child already created) executes that same next fork() line too.\n• A loop for(i=0;i<n;i++) fork(); produces 2^n total processes after the loop completes (2^n - 1 new children created), since each successive iteration is executed by every process that survived the previous iteration -- the population doubles on each pass.\n• When fork() appears inside an if that branches on its OWN return value (e.g. if(fork()==0){...}), the simple doubling rule breaks: only the branch matching each process\'s return value executes, so you must trace child (0) and parent (nonzero) separately from that point on.\n• A common question style asks how many times a printf/print statement executes, not how many processes exist. A print statement placed AFTER all fork() calls executes once per surviving process at that point. A print BEFORE an early fork() call executes once in the parent before any split occurs, so it should be counted only once for that lineage, not doubled.\n\nWORKED EXAMPLE 1: sequential forks\nCode: fork(); fork(); fork();\nThere are 3 sequential unconditional fork() calls, so total processes = 2^3 = 8. New child processes created = 8 - 1 = 7.\n\nWORKED EXAMPLE 2: conditional fork trace\nCode: if(fork()==0){ fork(); } fork();\nStep 1: original process P0 calls fork(); this creates child C1. P0 gets nonzero (skips the if body); C1 gets 0 (enters the if body).\nStep 2: C1 executes fork() inside the if body, creating C2. Now three processes exist: P0, C1, C2.\nStep 3: all three processes (P0, C1, C2) reach the final unconditional fork() statement, since it lies outside the if. Each of the three forks once, creating three more children.\nTotal processes = 3 (before final fork) + 3 (new children from final fork) = 6.\nThe single most common mistake is forgetting that C2 (created inside the if) also survives to execute the final, unconditional fork() call -- students often only track P0 and C1 through the last line and undercount.\n\nGATE TRAPS\n• Assuming Waiting can transition directly to Running -- it cannot; it must pass through Ready.\n• Miscounting fork() inside conditionals as if it obeyed the plain 2^n rule -- conditional forks require a manual trace, not the formula.\n• Confusing "number of processes created" with "total number of processes existing," or with "number of times a given printf executes" -- these three quantities are often all different for the same code and are frequently asked as separate parts.\n• Believing user-level threads give true parallelism on multiple cores -- they do not, since the kernel schedules only the single underlying kernel thread.\n• Thinking a context switch between threads of the same process is exactly as expensive as between two different processes -- it is cheaper because no address-space/page-table switch or TLB flush is needed.\n• Assuming fork() copies file descriptors as entirely independent objects -- child and parent share the same underlying open file table entries (and hence the same file offset) immediately after fork, though each has its own descriptor table entry pointing to it.\n• Forgetting that a compiler symbol table is NOT part of the PCB -- the PCB holds runtime execution state, not static compile-time metadata.\n';

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-scheduling';}).theory.deep = 'SCHEDULING CRITERIA AND KEY DEFINITIONS\n\n• Arrival Time (AT): the instant a process enters the ready queue.\n• Burst Time (BT): total CPU time the process needs.\n• Completion Time (CT): instant the process finishes execution.\n• Turnaround Time (TAT) = CT - AT (total time from arrival to completion).\n• Waiting Time (WT) = TAT - BT (time spent in ready queue, not running).\n• Response Time (RT) = (time of first CPU allocation) - AT (relevant mainly for RR/interactive scheduling).\nScheduling goals: maximise CPU utilisation and throughput; minimise average waiting time, turnaround time, and response time; ensure fairness and avoid starvation.\n\nFCFS (First Come First Served)\n\nNon-preemptive; processes run strictly in arrival order via a FIFO ready queue. Simple to implement but suffers from the CONVOY EFFECT: a long process arriving early forces every subsequent short process to wait, inflating average waiting time. FCFS can never be preempted once a process starts, even if a much shorter job arrives moments later.\n\nSJF / SRTF (Shortest Job First / Shortest Remaining Time First)\n\nNon-preemptive SJF always picks, among ready processes, the one with the smallest total burst time to run next once the CPU is free; it is PROVABLY OPTIMAL for minimising average waiting time among non-preemptive algorithms, given all burst times are known in advance. SRTF is the preemptive version: whenever a new process arrives, if its burst time is shorter than the REMAINING time of the currently running process, the CPU is preempted immediately and given to the new arrival. SRTF is optimal for minimising average waiting time even considering preemption, but both variants risk STARVATION of long processes if short processes keep arriving.\n\nPriority Scheduling\n\nEach process is assigned a priority number (by convention, lower number is often higher priority, but a question may define it either way -- always check). CPU goes to the highest-priority ready process; can be preemptive or non-preemptive. Its major drawback is INDEFINITE BLOCKING / STARVATION of low-priority processes if high-priority processes keep arriving. The standard fix is AGING: periodically increase the priority of processes that have waited a long time, guaranteeing every process eventually runs.\n\nRound Robin (RR)\n\nPreemptive; each process gets a fixed TIME QUANTUM (time slice) in a cyclic order; if it does not finish within the quantum, it is preempted and placed at the back of the ready queue. RR is designed for time-sharing systems -- it gives good response time and treats processes fairly. The time quantum choice is critical: too large a quantum makes RR degenerate toward FCFS (worse response time); too small a quantum causes excessive context-switch overhead, which can dominate actual useful execution time and hurt throughput. GATE frequently asks for the total number of context switches in an RR trace and the effect of quantum size on average waiting/turnaround time.\n\nMultilevel Queue and Multilevel Feedback Queue\n\nMultilevel queue scheduling partitions the ready queue into several separate queues (e.g., foreground/interactive vs background/batch), each with its own scheduling algorithm, and a fixed scheduling policy governs which queue gets CPU time (e.g., strict priority between queues, or time-slicing between queues). Processes are permanently assigned to one queue. Multilevel FEEDBACK queue improves on this by allowing processes to MOVE between queues based on their observed behaviour and history: a process using too much CPU time is demoted to a lower-priority queue, while one that waits too long can be promoted -- this adapts to whether a process is CPU-bound or I/O-bound without knowing burst times in advance, and it is the most general and flexible scheduling scheme, since it can be configured to emulate any of the other algorithms.\n\nCOMPARISON TABLE (qualitative)\n\nAlgorithm   Preemptive   Starvation-prone   Optimal-for-avg-wait   Typical use\nFCFS        No           Yes (convoy)       No                     Batch, simple\nSJF         No           Yes (long jobs)    Yes (non-preemptive)   Batch, known burst\nSRTF        Yes          Yes (long jobs)    Yes (preemptive)       Batch, known burst\nPriority    Either       Yes (low prio)     No                     Real-time-ish\nRound Robin Yes          No                 No                     Time-sharing\nMLFQ        Yes          No (tunable)       No                     General purpose\n\nWORKED EXAMPLE 1: FCFS and SJF averages\nProcesses (AT, BT): P1(0,5), P2(1,3), P3(2,8), P4(3,6).\nFCFS order (by arrival): P1,P2,P3,P4.\nCT: P1=5, P2=8, P3=16, P4=22.\nTAT = CT-AT: P1=5, P2=7, P3=14, P4=19. Average TAT = 45/4 = 11.25.\nWT = TAT-BT: P1=0, P2=4, P3=6, P4=13. Average WT = 23/4 = 5.75.\n\nNon-preemptive SJF (pick shortest available burst when CPU frees, considering only arrived processes):\nAt t=0 only P1 has arrived, so P1 runs 0-5.\nAt t=5, P2(BT3) and P3(BT8) and P4(BT6) have all arrived (all arrived by t=3); shortest is P2 -> runs 5-8.\nAt t=8, remaining P3(8), P4(6); shortest is P4 -> runs 8-14.\nThen P3 runs 14-22.\nCT: P1=5, P2=8, P4=14, P3=22.\nTAT: P1=5, P2=7, P4=11, P3=20. Average TAT = 43/4 = 10.75 (better than FCFS\'s 11.25).\nWT: P1=0, P2=4, P4=5, P3=12. Average WT = 21/4 = 5.25.\n\nWORKED EXAMPLE 2: Round Robin trace\nProcesses (AT, BT): P1(0,4), P2(1,5), P3(2,2), quantum = 2. Convention: at a tie, a newly arriving process is enqueued before the process just preempted at that same instant.\nt=0-2: only P1 has arrived, so P1 runs (remaining 4-2=2). During this slice, P2 arrives at t=1 -> queue after arrival: [P2]. At t=2, P3 arrives (enqueued first) then P1 is preempted and enqueued last -> queue: [P2, P3, P1(2)].\nt=2-4: P2 runs its quantum (remaining 5-2=3); no new arrivals; P2 preempted and re-queued -> queue: [P3, P1(2), P2(3)].\nt=4-6: P3 runs its full remaining burst of 2 and FINISHES at t=6 (needs no further quantum). Queue: [P1(2), P2(3)].\nt=6-8: P1 runs its remaining 2 and FINISHES at t=8. Queue: [P2(3)].\nt=8-11: P2 runs its remaining 3 and FINISHES at t=11.\nCompletion times: P3=6, P1=8, P2=11.\nTAT = CT-AT: P3=6-2=4, P1=8-0=8, P2=11-1=10. Average TAT = 22/3 = 7.33.\nWT = TAT-BT: P3=4-2=2, P1=8-4=4, P2=10-5=5. Average WT = 11/3 = 3.67.\n\nGATE TRAPS\n• Forgetting that SJF/SRTF must only consider processes that have ALREADY ARRIVED at the moment the CPU becomes free -- picking the globally shortest burst regardless of arrival time is a common but wrong shortcut.\n• In Round Robin traces, mishandling the tie when a process is preempted at the exact same instant a new process arrives -- convention is the newly arriving process is enqueued before the preempted process is placed back in the queue.\n• Assuming Round Robin minimises average waiting time -- it does not; it is designed for fairness and response time, and typically has a WORSE average waiting time than SJF/SRTF for the same workload.\n• Believing priority scheduling and MLFQ cannot starve processes -- plain priority scheduling absolutely can (fixed by aging), and MLFQ starves only if it is NOT properly tuned with promotion rules.\n• Confusing turnaround time and waiting time -- TAT includes burst time, WT excludes it; many numericals ask for one when students compute the other.\n• Assuming a smaller Round Robin quantum is always better for performance -- an excessively small quantum increases the NUMBER of context switches, and each switch has a real overhead cost, which can dominate and reduce throughput despite improving fairness.\n• Treating "optimal for average waiting time" as a universal property across preemptive and non-preemptive classes -- SJF is optimal only among non-preemptive algorithms; SRTF is optimal only when preemption is allowed; neither is optimal in an absolute cross-class sense if arrival patterns are adversarial or burst estimates are wrong in practice (real systems only ESTIMATE burst times).\n';

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-sync';}).theory.deep = 'CRITICAL SECTION PROBLEM\n\nA race condition occurs when multiple processes/threads access and manipulate shared data concurrently, and the final outcome depends on the particular order in which the accesses happen to interleave. The CRITICAL SECTION is the segment of code where a process accesses shared resources; a correct solution to the critical-section problem must satisfy three requirements:\n• MUTUAL EXCLUSION: no two processes may execute in their critical sections at the same time.\n• PROGRESS: if no process is in its critical section, and some processes wish to enter, only those not in their remainder section can participate in deciding who enters next, and this decision cannot be postponed indefinitely.\n• BOUNDED WAITING: there is a limit on how many times other processes may enter their critical section after a process has requested entry and before that request is granted (prevents starvation of any single requester).\n\nPETERSON\'S SOLUTION (two-process, software-only)\n\nUses two shared variables: turn (whose turn it is) and flag[2] (intent to enter). Process i executes: flag[i]=true; turn=j; while(flag[j] && turn==j); <critical section>; flag[i]=false;. This satisfies all three properties for exactly two processes assuming atomic loads/stores, but it is not guaranteed to work on modern multiprocessors without memory barriers, since instruction reordering can break the intended interleaving.\n\nHARDWARE SUPPORT: TEST-AND-SET AND COMPARE-AND-SWAP\n\nTestAndSet(lock) atomically reads the old value of lock, sets lock to true, and returns the old value -- a process spins (busy-waits) while TestAndSet keeps returning true. CompareAndSwap(mem, expected, new) atomically compares mem to expected and, if equal, replaces it with new, returning the old value; it forms the basis of many modern lock-free algorithms. Both are indivisible hardware instructions that solve mutual exclusion but result in BUSY WAITING (spinlocks), wasting CPU cycles while a process merely waits its turn -- appropriate on multiprocessors for very short critical sections, wasteful for long ones.\n\nSEMAPHORES\n\nA semaphore S is an integer variable accessed only via two atomic operations:\n• wait(S) [also called P or down]: while(S<=0); S--; -- decrements S, blocking (or spinning) the calling process if S is not positive.\n• signal(S) [also called V or up]: S++; -- increments S, potentially waking a blocked process.\nA BINARY semaphore takes only values 0 and 1, and functions like a mutex lock. A COUNTING semaphore can take any non-negative value and is used to control access to a resource with multiple identical instances (initial value = number of available instances). In a correct blocking implementation, wait() and signal() must be executed atomically (the underlying decrement/check or increment must not itself be interrupted), commonly enforced by disabling interrupts briefly or via a hardware atomic instruction internally, so that two processes can never both proceed past a wait() when only one unit is available. Semaphores by themselves do not prevent DEADLOCK or STARVATION if used incorrectly (e.g., wrong wait/signal ordering can deadlock two processes on two semaphores).\n\nCLASSICAL PROBLEMS\n\n• Producer-Consumer (bounded buffer of size N): uses semaphores empty (init N), full (init 0), and mutex (init 1). Producer: wait(empty); wait(mutex); insert item; signal(mutex); signal(full);. Consumer: wait(full); wait(mutex); remove item; signal(mutex); signal(empty);. The ORDER matters: wait(mutex) must never be acquired before wait(empty)/wait(full) in this pattern, else a producer holding mutex while buffer is full (waiting on empty) would permanently block a consumer that needs mutex to free space -- a classic deadlock trap.\n• Readers-Writers: multiple readers may read concurrently, but a writer needs exclusive access (no other reader or writer). The standard first solution uses mutex (protects readcount) and a semaphore wrt (writer lock, taken by the first reader and released by the last reader, and taken/released directly by each writer); this favours readers and can starve writers.\n• Dining Philosophers: 5 philosophers, 5 forks (one between each pair), each philosopher needs both adjacent forks to eat. Naive solution (each picks up left fork then right fork) can DEADLOCK if all 5 pick up their left fork simultaneously, since each now waits forever for a right fork already held by a neighbour. Standard fixes: allow at most 4 philosophers to sit simultaneously, require one specific philosopher to pick up forks in the opposite order (right then left, breaking the circular wait), or use an arbitrator/monitor granting fork access.\n\nMONITORS\n\nA monitor is a higher-level synchronisation construct: a module encapsulating shared data plus the procedures that operate on it, where the monitor\'s own mutual exclusion is AUTOMATIC -- only one process/thread can be actively executing inside the monitor at any time, enforced by the compiler/runtime rather than manually via explicit wait/signal calls on a mutex. Monitors additionally provide CONDITION VARIABLES with exactly two operations: wait() (suspends the calling process, releasing the monitor lock so others may enter) and signal() (wakes one waiting process, if any -- signal() has no effect and is not remembered if no process is waiting, unlike semaphore signal() which always increments a persistent counter). This is a key structural difference: a semaphore\'s state persists across signal() calls with no waiter (the count simply goes up, to be consumed later), whereas a monitor condition-variable signal() with no waiter is simply lost. Because of automatic mutual exclusion and lost-if-no-waiter semantics, monitors are generally considered EASIER to use correctly than raw semaphores, which require the programmer to manually pair every wait/signal and get every ordering right.\n\nMUTEX LOCK VS SEMAPHORE\n\nA mutex lock is a simple binary construct (locked/unlocked) intended to be acquired and released by the SAME thread that acquired it, purely for mutual exclusion. A (counting) semaphore can be signalled by a DIFFERENT process than the one that waited on it, making it suitable for signalling/synchronisation between processes (e.g., one process producing, a different one consuming), not just mutual exclusion.\n\nWORKED EXAMPLE 1: semaphore value trace\nA binary semaphore mutex is initialised to 1. Sequence: P1 wait(mutex); P2 wait(mutex) [blocks, since mutex is now 0]; P1 signal(mutex) [wakes P2, mutex conceptually stays 0 as P2 immediately proceeds, or briefly goes to 1 then P2\'s wait consumes it to 0 depending on implementation -- for a counting-semaphore MODEL, value after P1\'s wait = 0, after P2\'s wait (blocks, does not decrement below what is tracked as pending) = -1 in the "processes waiting" convention, and after P1\'s signal = 0 with P2 now proceeding]. Using the SIMPLER convention taught for GATE (semaphore value = available count, can go negative to represent the queue length of blocked processes): start at 1. wait(mutex) by P1: value = 0 (P1 proceeds). wait(mutex) by P2: value = -1 (P2 blocks). signal(mutex) by P1: value = 0 (P2 is woken and proceeds). Final semaphore value = 0, with zero processes currently blocked and one process (P2) inside the critical section.\n\nWORKED EXAMPLE 2: counting semaphore for resources\nA counting semaphore S is initialised to 3, representing 3 identical printer instances. Four processes call wait(S) in sequence: P1, P2, P3 each successfully decrement S to 2, 1, 0 respectively and proceed to use a printer. P4 then calls wait(S): since S is now 0, P4 blocks, and the semaphore\'s internal value becomes -1 (one process waiting). When P2 finishes and calls signal(S), the value goes from -1 to 0, and P4 is woken and now uses the printer. Note that the semaphore value directly reflects (positive) how many instances are free, or (negative, in the blocked-count convention) how many processes are queued waiting -- it is never used as a simple boolean once its initial value exceeds 1.\n\nGATE TRAPS\n• Assuming semaphore wait/signal operations are automatically atomic just because we write them as pseudocode -- the ATOMICITY of the internal decrement/check must be separately guaranteed by the underlying implementation (disabling interrupts or hardware instructions); this is often tested as a conceptual pitfall.\n• Reversing the wait(mutex) and wait(empty)/wait(full) order in producer-consumer solutions, which silently introduces a deadlock even though the code "looks" correct at a glance.\n• Confusing monitor signal() (lost if no one is waiting) with semaphore signal() (always increments, never lost) -- a very frequent conceptual trap in comparison-style questions.\n• Believing busy-waiting (spinlock) solutions like TestAndSet never make sense -- they are appropriate specifically when critical sections are very short and/or on multiprocessors where the alternative (context switch to block) costs more than the brief spin.\n• Assuming Peterson\'s solution generalises easily to more than two processes with the same simple structure -- it does not; it is specifically a two-process algorithm (n-process generalisations like the bakery algorithm are structurally different).\n• Missing that in the naive dining-philosophers solution, deadlock requires ALL philosophers to pick up their left fork essentially simultaneously -- a question may ask for the exact condition under which deadlock occurs, not just "it can deadlock."\n• Treating mutex and binary semaphore as always interchangeable -- ownership semantics differ (a mutex is meant to be released by its own acquirer; a semaphore can legitimately be signalled by a different process/thread).\n';

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-deadlock';}).theory.deep = 'FOUR NECESSARY CONDITIONS FOR DEADLOCK\n\nAll four must hold SIMULTANEOUSLY for a deadlock to be possible:\n• MUTUAL EXCLUSION: at least one resource is held in a non-shareable mode (only one process can use it at a time).\n• HOLD AND WAIT: a process holds at least one resource while simultaneously waiting to acquire additional resources currently held by other processes.\n• NO PREEMPTION: a resource can only be released voluntarily by the process holding it, never forcibly taken away.\n• CIRCULAR WAIT: a set of processes {P0, P1, ..., Pn} exists such that P0 waits for a resource held by P1, P1 waits for one held by P2, ..., and Pn waits for one held by P0.\nBreaking ANY ONE of these four conditions is sufficient to PREVENT deadlock -- this is the basis of deadlock prevention schemes.\n\nRESOURCE ALLOCATION GRAPH (RAG)\n\nNodes are processes (circles) and resource types (rectangles, containing one dot per instance). A REQUEST EDGE (process -> resource) means the process has requested that resource type. An ASSIGNMENT EDGE (resource instance -> process) means that instance is currently allocated to the process.\n• If every resource type in the graph has only a SINGLE instance, then a cycle in the RAG is both NECESSARY AND SUFFICIENT for deadlock -- a cycle guarantees deadlock, and deadlock guarantees a cycle.\n• If some resource types have MULTIPLE instances, a cycle is NECESSARY but NOT SUFFICIENT for deadlock -- a cycle may exist yet the system may still be able to satisfy all requests eventually via a different allocation order (no deadlock), because a process later in the cycle might release a needed instance without ever getting the one it\'s shown waiting for in a way that frees up the cycle. Only if no such escape sequence exists is it an actual deadlock.\n\nDEADLOCK PREVENTION (attacks one of the four conditions structurally)\n\n• Attack Mutual Exclusion: make resources shareable where possible (rarely fully avoidable, e.g. printers cannot be shared).\n• Attack Hold-and-Wait: require a process to request all resources it will ever need at once, before execution begins (low resource utilisation, possible starvation of processes needing many resources); or require it to release all currently held resources before requesting new ones.\n• Attack No-Preemption: if a process holding resources requests another that is unavailable, forcibly preempt (take away) its currently held resources; only practical for resources whose state can be easily saved and restored (e.g. CPU registers, memory), not for things like printers mid-job.\n• Attack Circular Wait: impose a strict TOTAL ORDERING on all resource types, and require every process to request resources only in strictly increasing order of this numbering -- this makes a circular wait structurally impossible, since a cycle would require some process to request a lower-numbered resource while holding a higher-numbered one.\n\nDEADLOCK AVOIDANCE: SAFE STATE AND BANKER\'S ALGORITHM\n\nA state is SAFE if there exists at least one ordering (a "safe sequence") of all processes such that each process\'s remaining maximum need can be satisfied using currently available resources plus resources held by processes earlier in the sequence (which will eventually release them). A safe state guarantees no deadlock can occur, REGARDLESS of the order requests actually happen to arrive in future, provided the system always keeps to a safe state.\n\nBanker\'s Algorithm data structures (n processes, m resource types):\n• Available[m]: vector of currently free instances of each resource type.\n• Max[n][m]: maximum demand of each process for each resource type.\n• Allocation[n][m]: currently allocated instances to each process.\n• Need[n][m] = Max[n][m] - Allocation[n][m]: remaining resources each process may still request.\n\nSAFETY ALGORITHM (full procedure):\n1. Initialise Work = Available (a working copy); initialise Finish[i] = false for all i.\n2. Find an index i such that Finish[i]==false AND Need[i] <= Work (component-wise, for every resource type). If no such i exists, go to step 4.\n3. Set Work = Work + Allocation[i] (simulate process i finishing and releasing its resources); set Finish[i] = true; go back to step 2.\n4. If Finish[i]==true for ALL i, the system is in a SAFE STATE and the order in which processes were marked finished is a valid safe sequence. Otherwise, the system is UNSAFE.\n\nRESOURCE-REQUEST ALGORITHM (using safety check): when process Pi requests a vector Request[m]:\n1. If Request <= Need[i], continue; else raise error (process exceeded its declared maximum claim).\n2. If Request <= Available, continue; else Pi must wait (not enough free resources right now).\n3. Provisionally pretend to allocate: Available -= Request; Allocation[i] += Request; Need[i] -= Request.\n4. Run the safety algorithm on this new hypothetical state. If SAFE, the allocation is finalised for real. If UNSAFE, roll back all three updates from step 3 and make Pi wait.\n\nMINIMUM RESOURCES TO GUARANTEE NO DEADLOCK (single resource type)\n\nFor n processes each with a maximum need of at most k instances of a single resource type, the minimum total number of instances that GUARANTEES the system can never deadlock is:\nMinimum instances required = n * (k - 1) + 1\nReasoning: if each of the n processes could hold up to (k-1) instances simultaneously without being satisfied, the system could reach a state where every process holds (k-1) and none can proceed (all are stuck one instance short of their max need) -- this is the worst case just short of deadlock. Adding just ONE more instance beyond n*(k-1) guarantees at least one process can obtain its full need of k and finish, then release all its instances, breaking the impasse for the rest. This formula appears very frequently as a direct GATE numerical.\n\nDETECTION AND RECOVERY (when prevention/avoidance are not used)\n\nIf neither prevention nor avoidance is enforced, deadlocks may occur, so the system needs: (a) a DETECTION algorithm, essentially the same as the Banker\'s safety algorithm but using actual current Allocation/Request instead of Max/Need (run periodically or when resource utilisation drops, or a process has waited unusually long), and (b) a RECOVERY method -- either process termination (abort all deadlocked processes at once, simple but wasteful; or abort one at a time until the cycle breaks, requiring re-running detection after each abort) or resource preemption (selectively roll back a victim process\'s resource holdings, watching to avoid repeatedly choosing the same victim, which itself risks starving that process).\n\nWORKED EXAMPLE 1: Banker\'s safety check\nn=3 processes, 1 resource type. Available=3. Max = [P0:7, P1:4, P2:9]. Allocation = [P0:3, P1:2, P2:2]. Need = Max-Allocation = [P0:4, P1:2, P2:7].\nStep: Work=3, Finish=[F,F,F].\nCheck P0: Need=4 > Work=3, skip. Check P1: Need=2 <= Work=3, YES -> Work = 3+2=5 (release P1\'s allocation), Finish[P1]=true.\nRecheck P0: Need=4 <= Work=5, YES -> Work = 5+3=8, Finish[P0]=true.\nRecheck P2: Need=7 <= Work=8, YES -> Work = 8+2=10, Finish[P2]=true.\nAll finished -> SAFE, safe sequence <P1, P0, P2>.\n\nWORKED EXAMPLE 2: minimum resources formula\n3 processes, each with a maximum need of 4 instances of the single resource type (n=3, k=4).\nMinimum instances to guarantee no deadlock = n*(k-1)+1 = 3*(4-1)+1 = 3*3+1 = 10.\nWith only 9 instances, all three processes could each simultaneously hold 3 (totalling 9, none left over) while each still needs 1 more to finish -- a genuine potential deadlock. With 10 instances, at least one process can always obtain its full requirement of 4 and complete, guaranteeing eventual progress for all.\n\nGATE TRAPS\n• Applying the single-instance "cycle = deadlock" rule to a multi-instance RAG -- with multiple instances per resource type, a cycle is necessary but NOT sufficient, and the question expects you to check whether an escape sequence exists.\n• Forgetting that ALL FOUR conditions (mutual exclusion, hold-and-wait, no preemption, circular wait) must hold together for deadlock -- breaking even one is enough for prevention, a fact often tested by asking which single condition a given scheme attacks.\n• In the Banker\'s safety algorithm, comparing Max instead of Need against Work -- the check must use the REMAINING need (Max - Allocation), not the full maximum claim.\n• Misapplying the minimum-resources formula by forgetting the "+1" or using k instead of (k-1) -- the correct formula is n*(k-1)+1, not n*k or n*(k-1).\n• Assuming a system in an UNSAFE state is automatically deadlocked -- unsafe only means deadlock is POSSIBLE depending on future request order; the system may still avoid it if requests happen to arrive favourably. Deadlock avoidance simply refuses to ever enter an unsafe state in the first place, which is a stronger, more conservative guarantee.\n• Confusing deadlock AVOIDANCE (Banker\'s algorithm, requires advance knowledge of Max claims) with deadlock PREVENTION (structural constraints on how requests can be made, no advance knowledge needed) and with deadlock DETECTION (allows deadlock to occur, then finds and recovers from it).\n• Forgetting that the resource-request algorithm must ROLL BACK the provisional allocation if the resulting state is unsafe -- the request is not simply denied in the abstract, the tentative changes to Available/Allocation/Need must be undone before the process is made to wait.\n';

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-memory';}).theory.deep = 'CONTIGUOUS ALLOCATION AND FRAGMENTATION\n\nIn contiguous memory allocation, each process occupies one single contiguous block of physical memory. Over time, as processes load and terminate, free memory becomes broken into many small non-contiguous holes -- this is EXTERNAL FRAGMENTATION: total free memory may be more than enough for a new request, but no single hole is large enough. INTERNAL FRAGMENTATION occurs when memory is allocated in fixed-size chunks (e.g. fixed partitions or paging frames) and the allocated block is slightly larger than what was actually requested, wasting the leftover space inside the allocated unit itself. Compaction (shuffling processes to merge holes into one large block) fixes external fragmentation but is costly in CPU time and requires all processes to be relocatable (position-independent, typically via base-register relocation).\n\nDYNAMIC PARTITION ALLOCATION STRATEGIES\n\n• First Fit: scan the free-hole list from the beginning and allocate the FIRST hole large enough for the request; fast because it can stop scanning early, but tends to leave several small unusable fragments near the start of memory over time.\n• Best Fit: scan ALL holes and allocate the SMALLEST hole that is still large enough for the request; minimises leftover space per individual allocation, but this tight fit often leaves behind slivers of free space too small to be useful for most future requests, accumulating many tiny wasted fragments.\n• Worst Fit: scan ALL holes and allocate the LARGEST available hole, reasoning that the leftover fragment (also large) is more likely to remain usable; extensive simulation studies show worst fit tends to perform WORSE overall than both first fit and best fit in practice.\nBoth best fit and worst fit require scanning the ENTIRE free list (unless it is kept sorted), so neither is inherently faster than first fit; first fit is typically the fastest since it can stop as soon as a suitable hole is found.\n\nPAGING\n\nPaging eliminates external fragmentation entirely by dividing physical memory into fixed-size FRAMES and logical (virtual) memory into equal-size PAGES, and mapping pages to frames via a PAGE TABLE -- pages need not be contiguous in physical memory at all. Internal fragmentation can still occur, up to almost one full frame\'s worth of waste per process (specifically, on average, half a page per process, and up to one page minus one byte in the worst case), if the process\'s total size is not an exact multiple of the page size.\n\nGiven a logical address space with page size P (2^p bytes) and a logical address of L bits total, the LOGICAL ADDRESS splits into a page number (the high-order L-p bits) and a page offset (the low-order p bits, which directly indexes into the frame -- the offset itself never changes during translation). Similarly a PHYSICAL ADDRESS splits into a frame number and the same page offset.\n\nSEGMENTATION\n\nSegmentation divides a program into logically meaningful, VARIABLE-SIZED units (segments: code, stack, heap, data, etc.), each with its own base and limit, matching the programmer\'s/compiler\'s logical view of the program. Unlike paging, segments can vary in size, so segmentation CAN suffer external fragmentation (like plain contiguous allocation), while paging (uniform fixed frame size) cannot. Combined paging-segmentation schemes page each segment individually to get the benefits of both.\n\nTLB (TRANSLATION LOOKASIDE BUFFER) AND EFFECTIVE MEMORY ACCESS TIME (EMAT)\n\nThe TLB is a small, fast, associative (parallel-search) hardware cache of recent page-table entries, avoiding a full page-table memory lookup on every reference. Let TLB access time = t (time to search TLB, assumed to overlap or precede the potential memory access), main memory access time = m, and TLB hit ratio = h (fraction of references found in the TLB).\n\nEMAT FORMULA WITHOUT PAGE FAULTS (basic form, single-level page table, TLB hit time t assumed to be paid on every access, memory access time m):\nEMAT = h * (t + m) + (1 - h) * (t + m + m)\n     = t + m + (1 - h) * m\nOn a TLB HIT: pay t (TLB lookup) + m (one memory access to fetch the actual data using the frame number from TLB).\nOn a TLB MISS: pay t (TLB lookup, which fails) + m (one memory access to read the page table entry from memory) + m (one more memory access to fetch the actual data).\n\nEMAT FORMULA WITH PAGE FAULTS (extended form): let p = page fault rate, and let page fault service time = s (time to handle a fault: read from disk, update tables, etc., typically far larger than m or t, often expressed in milliseconds versus nanoseconds for m). Extending the miss branch to also account for the possibility of a page fault on that access:\nEMAT = h*(t+m) + (1-h) * [ t + (1-p)*(m+m) + p*s ]\nOn a TLB miss, with probability (1-p) the page is resident (just not TLB-cached), costing (m+m) as before; with probability p a page fault occurs, costing the far larger fault-service time s (assumed to include bringing in the page and completing the reference). Some textbooks add one more m after s for the post-fault access; always follow the exact convention the question states.\n\nMULTI-LEVEL PAGE TABLES\n\nIf a single page table itself would be too large to fit contiguously, it is split into multiple levels (a page table for the page table). For a k-level scheme, ADDRESS TRANSLATION without a TLB requires k memory accesses to walk each level of the table plus one final access to fetch the actual data, i.e. (k+1) total memory accesses in the worst case (TLB miss). This is exactly why TLBs matter more as the number of page-table levels grows -- each extra level adds one more mandatory memory access on every miss.\n\nPAGE REPLACEMENT AND BELADY\'S ANOMALY\n\nWhen a page fault occurs and no free frame exists, a REPLACEMENT algorithm chooses a victim page to evict. FIFO replaces the oldest-loaded page regardless of usage recency, and is famous for exhibiting BELADY\'S ANOMALY -- increasing the number of available frames can, counter-intuitively, INCREASE the number of page faults for FIFO on certain reference strings (this does not happen for LRU or Optimal). Optimal (Belady\'s) replacement evicts the page that will not be used for the LONGEST time in the future -- it is provably the best possible algorithm for minimising faults but is unimplementable in practice since it requires future knowledge; it serves only as a theoretical lower bound for comparison. LRU (Least Recently Used) evicts the page that has gone unused for the LONGEST time in the PAST, approximating optimal behaviour using only historical information; LRU never exhibits Belady\'s anomaly (it belongs to the class of "stack algorithms").\n\nWORKED EXAMPLE 1: EMAT without page faults\nTLB access time t = 20 ns, main memory access time m = 100 ns, TLB hit ratio h = 0.8.\nEMAT = t + m + (1-h)*m = 20 + 100 + 0.2*100 = 20 + 100 + 20 = 140 ns.\nCross-check: Hit (0.8): 120 ns. Miss (0.2): 220 ns. EMAT = 0.8*120+0.2*220 = 96+44 = 140 ns. Matches.\n\nWORKED EXAMPLE 2: EMAT with page faults\nt = 10 ns, m = 100 ns, h = 0.9, page fault rate p = 0.01 (applies only on a TLB miss), page fault service time s = 10,000,000 ns (10 ms).\nTLB hit (0.9): cost = t+m = 110 ns. TLB miss (0.1): with prob 0.99, cost = t+2m = 210 ns; with prob 0.01, cost = t+s = 10,000,010 ns (s already includes the final access).\nMiss branch expected cost = 0.99*210 + 0.01*10,000,010 = 207.9 + 100,000.1 = 100,208 ns.\nEMAT = 0.9*110 + 0.1*100,208 = 99 + 10,020.8 = 10,119.8 ns -- a small fault rate dominates EMAT since fault service time (ms) dwarfs memory/TLB times (ns) by six orders of magnitude.\n\nGATE TRAPS\n• Using the no-page-fault EMAT formula when the question explicitly gives a page fault rate and service time -- always check whether p and s are given; if so, the extended formula MUST be used.\n• Forgetting that a TLB HIT still requires an actual main-memory access to fetch the data itself (t+m), not just t alone -- the TLB only supplies the frame number instantly, the data still must be read from memory.\n• Assuming best fit is always more memory-efficient than first fit in practice -- best fit minimises leftover space per single allocation but tends to accumulate many small unusable fragments over the long run.\n• Believing paging eliminates ALL fragmentation -- it eliminates EXTERNAL fragmentation but still permits INTERNAL fragmentation (up to almost one page per process).\n• Believing segmentation eliminates fragmentation the way paging does -- segmentation, having variable-sized units, is exactly as prone to EXTERNAL fragmentation as plain contiguous/dynamic partition allocation.\n• Assuming more frames always reduces page faults -- true for LRU and Optimal, but FALSE in general for FIFO due to Belady\'s Anomaly, which is a favourite conceptual GATE question.\n• Confusing the number of memory accesses for a k-level page table walk -- it is (k+1) on a TLB miss (k table-level accesses plus 1 data access), not k, and not k+2.\n';

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-virtual-memory';}).theory.deep = 'DEMAND PAGING AND PAGE FAULTS\n\nVirtual memory lets a process execute even when only PART of it is resident in physical memory, by loading pages on demand rather than all at once at load time. Each page-table entry carries a VALID/INVALID (or present/absent) bit. A PAGE FAULT occurs when the CPU tries to access a page marked invalid (not currently in a frame). On a page fault, the OS: (1) traps to the kernel, (2) checks whether the reference was actually a legal address for this process (if not, the process is terminated with a segmentation violation), (3) finds a free frame, or selects and evicts a victim page if memory is full, (4) schedules a disk read to bring the required page into that frame, (5) updates the page table to mark the page valid and point to the new frame, and (6) restarts the instruction that caused the fault from the beginning (not from the middle) -- this restart requirement means some instructions (e.g. those that can touch multiple operands, like a block-move instruction spanning a page boundary) must be carefully designed to be restartable.\n\nDIRTY BIT AND REFERENCE BIT\n\nThe DIRTY (modified) bit is set whenever a page is written to; on eviction, a page whose dirty bit is 0 need NOT be written back to disk at all (a clean copy already exists there), saving an I/O, whereas a dirty page MUST be written back before its frame can be reused. The REFERENCE bit records whether a page has been accessed recently; the CLOCK (second-chance) algorithm uses it to approximate LRU cheaply: pages are arranged in a circular list, and a page\'s reference bit is checked at eviction time -- if 1, it is cleared and the page gets a "second chance" (pointer advances, skipping it); if 0, it is evicted.\n\nPAGE REPLACEMENT ALGORITHMS (full comparison)\n\nAlgorithm    Idea                                  Implementable?  Belady\'s Anomaly?  Notes\nFIFO         Evict oldest-loaded page              Yes (simple)    YES                Simple queue; can perform poorly\nOptimal      Evict page used farthest in future     No (needs future) NO               Theoretical lower bound only\nLRU          Evict page unused longest in the past  Yes (costly)    NO                 Stack algorithm; approximates Optimal\nClock/2nd-chance  Approximate LRU via reference bit  Yes (cheap)    NO (approx.)        Practical compromise\n\nLRU IMPLEMENTATION COSTS\n\nExact LRU can be implemented via a COUNTER (timestamp every reference; eviction scans for minimum timestamp -- O(n) per eviction, and the counter/timestamp field itself must be updated on every single memory reference, high overhead) or a STACK (a doubly linked list of page numbers, moved to the top on every reference; the bottom of the stack is always the LRU page -- O(1) eviction but still requires pointer updates on every reference). Because true LRU needs hardware support that is expensive to provide for every memory access at full speed, most real systems only APPROXIMATE it (e.g., via the clock algorithm using a single reference bit per page, which is far cheaper to maintain), trading exactness for practicality.\n\nTHRASHING AND THE WORKING SET MODEL\n\nTHRASHING occurs when a process (or the whole system) spends more time servicing page faults (paging pages in and out) than doing actual useful computation, typically because too many processes are running relative to available physical frames, so each has too few frames to hold its actively used pages. Symptoms: CPU utilisation drops sharply even as the degree of multiprogramming increases (counter-intuitively, adding MORE processes when memory is already oversubscribed makes things worse, not better, because each existing process now gets even fewer frames and faults even more). The WORKING SET MODEL addresses this: the working set of a process at time t, WS(t, Delta), is the set of distinct pages referenced in the most recent Delta memory references (Delta is the working-set window). If the sum of all processes\' working-set sizes exceeds total available frames, the OS should suspend (swap out) one or more processes rather than let all of them thrash simultaneously. PAGE FAULT FREQUENCY (PFF) is a related, simpler control scheme: monitor each process\'s fault rate directly, and give it more frames if the rate is too high, or take frames away if the rate is very low, keeping every process within an acceptable fault-rate band.\n\nFRAME ALLOCATION POLICIES\n\n• Equal allocation: divide all frames equally among all processes.\n• Proportional allocation: allocate frames to each process in proportion to its size relative to total virtual memory demand.\n• Global replacement: a process may select a victim frame from ANY process in the system, not just its own -- one process\'s behaviour can affect another\'s fault rate, but overall throughput is often higher.\n• Local replacement: a process may only select a victim frame from among its OWN currently allocated frames -- more predictable and isolates processes from each other\'s paging behaviour, but a process stuck with too few frames cannot "borrow" free frames sitting idle elsewhere.\n\nCOPY-ON-WRITE (COW)\n\nWhen fork() creates a child process, rather than immediately copying the entire address space, modern OSes mark the parent\'s and child\'s pages as SHARED and READ-ONLY. Both processes initially point to the SAME physical frames. Only when either process attempts to WRITE to a shared page does a protection fault occur, at which point the kernel makes a private copy of just that one page for the writer and updates its page table entry -- all other untouched pages remain shared indefinitely. This dramatically reduces the cost of fork(), especially in the extremely common case where the child immediately calls exec() and discards its entire copied address space without ever touching most of it.\n\nWORKED EXAMPLE 1: FIFO with Belady\'s Anomaly\nReference string: 1,2,3,4,1,2,5,1,2,3,4,5.\nWith 3 frames (FIFO queue, oldest evicted first): 1 fault[1], 2 fault[1,2], 3 fault[1,2,3], 4 fault evicts 1[2,3,4], 1 fault evicts 2[3,4,1], 2 fault evicts 3[4,1,2], 5 fault evicts 4[1,2,5], 1 HIT, 2 HIT, 3 fault evicts 1[2,5,3], 4 fault evicts 2[5,3,4], 5 HIT. Total = 9 faults.\nWith 4 frames (FIFO), tracing the same string: 1,2,3,4 fault [1,2,3,4], 1 HIT, 2 HIT, 5 fault evicts 1[2,3,4,5], 1 fault evicts 2[3,4,5,1], 2 fault evicts 3[4,5,1,2], 3 fault evicts 4[5,1,2,3], 4 fault evicts 5[1,2,3,4], 5 fault evicts 1[2,3,4,5]. Total = 10 faults -- MORE than with 3 frames, on the identical reference string. This counter-intuitive increase when frames increase is exactly Belady\'s Anomaly, a hallmark FIFO-specific property that never occurs for LRU or Optimal on any reference string.\n\nWORKED EXAMPLE 2: LRU trace\nReference string: 7,0,1,2,0,3,0,4,2,3,0,3,2, with 3 frames, using LRU (recency order shown as [MRU...LRU] after each step):\n7 fault [7]; 0 fault [0,7]; 1 fault [1,0,7]; 2 fault evicts LRU=7 [2,1,0]; 0 HIT, reorder [0,2,1]; 3 fault evicts LRU=1 [3,0,2]; 0 HIT, reorder [0,3,2]; 4 fault evicts LRU=2 [4,0,3]; 2 fault evicts LRU=3 [2,4,0]; 3 fault evicts LRU=0 [3,2,4]; 0 fault evicts LRU=4 [0,3,2]; 3 HIT, reorder [3,0,2]; 2 HIT, reorder [2,3,0].\nTotal faults = 9 out of 13 references (4 hits), a standard textbook trace often used to compare LRU against FIFO and Optimal on the identical string.\n\nGATE TRAPS\n• Assuming increasing the number of frames always reduces (or at least never increases) page faults -- true for LRU and Optimal but demonstrably FALSE for FIFO (Belady\'s Anomaly), and GATE frequently sets up exactly this scenario as a trap.\n• Believing exact LRU is cheap to implement in real hardware at full memory speed -- it is NOT; true LRU needs either per-reference timestamp updates or stack maintenance on every single memory access, which is why real systems use cheap approximations like the clock/second-chance algorithm instead.\n• Confusing the working-set model\'s PURPOSE -- it exists to detect and prevent thrashing by ensuring total working-set demand does not exceed available frames, not to choose an eviction VICTIM within one process.\n• Assuming more multiprogramming always improves CPU utilisation -- past a certain point (when memory is oversubscribed), MORE processes causes MORE thrashing and LOWER CPU utilisation, the opposite of the usual assumption for CPU-bound scheduling.\n• Forgetting that Copy-on-Write duplicates a page only lazily, on the FIRST write to that specific page, not the entire address space at fork() time -- treating fork() as always immediately copying all memory is a common misconception this trap corrects.\n• Not restarting a faulted instruction correctly -- a page-faulted instruction must be restarted completely from its own beginning, and instructions capable of touching several pages need special hardware/architectural support to be safely restartable at all.\n• Mixing up dirty bit and reference bit roles -- the dirty bit decides whether the evicted page must be WRITTEN BACK to disk; the reference bit decides whether the page was RECENTLY USED (feeding replacement decisions like clock) -- they answer two entirely different questions.\n';

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-file-disk';}).theory.deep = 'FILE ALLOCATION METHODS\n\n• Contiguous allocation: each file occupies a single contiguous run of disk blocks, recorded as (start block, length). Supports fast sequential AND direct/random access (block k is simply start+k), but suffers external fragmentation and requires knowing the file\'s final size in advance to avoid needing later relocation.\n• Linked allocation: each block stores a pointer to the next block of the file; the directory entry holds only the first (and often last) block. No external fragmentation, since any free block anywhere can be used, and files can grow dynamically. But direct access is very slow (block k requires traversing k pointers from the start), and a single corrupted pointer breaks the chain for every subsequent block. FAT (File Allocation Table) is a variant that keeps all the "next pointer" information together in one table in a reserved disk area, improving reliability and enabling somewhat faster access without scattering pointers inside data blocks.\n• Indexed allocation: each file has a dedicated INDEX BLOCK holding pointers to all of that file\'s data blocks, giving true direct access (look up entry k in the index) without the chaining problem of linked allocation, and without requiring contiguous space. The cost is the extra index block(s) themselves, and a scheme is needed for files too large for one index block (see inode below).\n\nINODE STRUCTURE: DIRECT AND INDIRECT BLOCKS\n\nA typical Unix-style inode contains a fixed number of DIRECT block pointers (say Nd of them), pointing straight to data blocks, plus pointers to one SINGLE INDIRECT block, one DOUBLE INDIRECT block, and one TRIPLE INDIRECT block, extending the addressable file size hugely while keeping the inode itself small and fixed-size. Let block size = B bytes, and let each block pointer occupy P bytes, so the number of pointers that fit in one block is p = B / P.\n\nMAXIMUM FILE SIZE FORMULA:\nMax file size (in blocks) = Nd + p + p^2 + p^3\nwhere Nd direct blocks contribute Nd data blocks directly; the single indirect block contributes p data blocks (it holds p pointers, each pointing straight to one data block); the double indirect block contributes p^2 data blocks (it holds p pointers, each pointing to a single-indirect block, each of which holds p pointers to data blocks, giving p*p = p^2); the triple indirect block contributes p^3 data blocks by the same logic one level deeper (p pointers -> each to a double-indirect structure of p^2 -> p*p^2 = p^3).\nMax file size (in bytes) = (Nd + p + p^2 + p^3) * B\n\nDISK SCHEDULING ALGORITHMS (full set)\n\nLet the disk have cylinders numbered 0 to (MAX-1), the head currently at position H, and a queue of pending cylinder requests.\n• FCFS: service requests strictly in the order they arrived, regardless of position -- simplest, fairest in arrival order, but can produce a very large, erratic total head movement (no attempt at optimisation).\n• SSTF (Shortest Seek Time First): always service whichever PENDING request is nearest to the current head position. Minimises movement for each individual step and gives good average total movement, but can cause STARVATION of requests far from the current cluster of activity if nearby requests keep arriving.\n• SCAN (elevator algorithm): the head sweeps in one direction, servicing every request encountered, all the way to the disk\'s physical end (0 or MAX-1), then reverses and sweeps back, again servicing every request along the way. Bounded worst-case wait (no true starvation), but the very last request just missed before a reversal must wait almost a full sweep.\n• C-SCAN (Circular SCAN): the head sweeps in one direction servicing requests up to the physical boundary, then, WITHOUT servicing anything, jumps directly back to the opposite boundary and begins a fresh sweep in the SAME original direction. This treats the disk as circular and gives much more UNIFORM wait times across all cylinders than plain SCAN.\n• LOOK: like SCAN, but the head reverses direction as soon as it has serviced the LAST pending request in the current direction, without needlessly travelling all the way to the physical boundary if no request lies there.\n• C-LOOK: the circular analogue of LOOK -- sweeps to the last request in one direction, then jumps directly back to the position of the FIRST pending request in the other direction (not all the way to the physical boundary), then resumes sweeping in the original direction.\n\nDISK SCHEDULING COMPARISON TABLE (qualitative)\n\nAlgorithm   Direction changes  Starvation risk   Extra boundary travel   Wait uniformity\nFCFS        None (arrival order) No               N/A                    Poor (erratic)\nSSTF        Frequent             YES (far requests) N/A                  Good on average, poor worst-case\nSCAN        Reverses at boundary  No               YES (goes to boundary) Moderate\nC-SCAN      One direction only    No               YES (both ends)        Very uniform\nLOOK        Reverses at last req  No               NO                     Moderate, less travel than SCAN\nC-LOOK      One direction only    No               NO (jumps to first req)Very uniform, least travel\n\nSSD RELEVANCE: for solid-state drives (no mechanical head, no seek time in the classical sense), traditional seek-minimising algorithms like SCAN/C-SCAN/SSTF are largely IRRELEVANT, since random and sequential access costs are far closer to each other than on a spinning HDD; SSD scheduling instead focuses on issues like WEAR LEVELLING (spreading writes evenly across flash cells to avoid prematurely wearing out frequently written blocks) and minimising write amplification, which have no HDD analogue.\n\nFILE SYSTEM RELIABILITY: JOURNALING\n\nA JOURNALING file system maintains a separate log (the journal) of intended metadata (and sometimes data) changes BEFORE actually committing them to their final on-disk locations. If the system crashes mid-update, recovery simply REPLAYS (or discards incomplete) journal entries on reboot, restoring the file system to a consistent state far faster than a full disk scan (as older file systems like traditional FFS/ext2 required via fsck). This trades a small write-performance overhead (every change is logged, then applied) for vastly quicker and more reliable crash recovery, and is the basis of modern journaling file systems (e.g. ext3/ext4, NTFS).\n\nWORKED EXAMPLE 1: SCAN vs LOOK head movement\nDisk cylinders 0-199, head currently at 50, moving toward higher cylinder numbers, pending requests: 45, 90, 150, 60, 20, 175.\nSCAN (toward 199 first): sorted requests above 50 in increasing order: 60,90,150,175; head goes 50->60->90->150->175->199 (sweeps to boundary) = (199-50)=149, then reverses: 199->45->20 (only remaining requests below 50, in decreasing order:45,20) = (199-20)=179. Total = 149+179 = 328.\nLOOK (toward 199 first): head goes 50->60->90->150->175 (stops at last request, no travel to 199) = 125, then reverses: 175->45->20 = 155. Total = 125+155 = 280.\nLOOK saves the wasted 199-175=24 trip to the boundary and back, exactly accounting for the 328-280=48 difference (24 there, 24 back).\n\nWORKED EXAMPLE 2: inode maximum file size\nBlock size B = 4096 bytes (4 KB), block pointer size P = 4 bytes, so p = B/P = 1024 pointers per block. Suppose the inode has Nd = 12 direct pointers, plus one single, one double, and one triple indirect pointer.\nMax file size in blocks = 12 + 1024 + 1024^2 + 1024^3 = 12 + 1024 + 1,048,576 + 1,073,741,824 = 1,074,791,436 blocks.\nMax file size in bytes = 1,074,791,436 * 4096 bytes ~ 4.4 * 10^12 bytes (~4 TB) -- illustrating why triple indirection is rarely the binding constraint for ordinary files; in practice other limits (partition size, filesystem design limits) usually apply first.\n\nGATE TRAPS\n• Forgetting that the single-indirect block itself must also be READ before its data pointers can be followed, adding one extra disk access per level of indirection beyond what direct blocks need -- a related access-COUNT question (not just capacity) requires counting these extra reads.\n• Using p instead of p^2 or p^3 for double/triple indirect capacity -- double indirect contributes p*p = p^2 data blocks, triple contributes p*p*p = p^3, not simply p each.\n• Assuming SCAN and LOOK always produce identical total head movement -- they differ exactly by the wasted round-trip travel to a boundary where no request actually lies, as shown in Worked Example 1.\n• Believing C-SCAN is simply "SCAN but circular in both directions" -- C-SCAN moves in only ONE direction for servicing; the return jump services nothing, whereas SCAN services requests in BOTH directions of its sweep.\n• Assuming SSTF is always the best choice for minimising total head movement -- while often good on average, it can starve distant requests indefinitely and is not universally superior to SCAN-family algorithms across all workloads.\n• Applying classical seek-time-minimising disk scheduling logic (SCAN/SSTF/etc.) to SSDs -- these algorithms target mechanical seek delay, which barely exists on SSDs; SSD-specific concerns (wear levelling, write amplification) are a completely different, frequently separately tested topic.\n• Confusing linked allocation\'s weakness (slow direct access, fragile pointer chain) with contiguous allocation\'s weakness (external fragmentation, needing advance size knowledge) -- these are two DIFFERENT allocation schemes with two DIFFERENT sets of drawbacks, often mixed up in "which is a disadvantage of X" style questions.\n';

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-processes';}).questions.push(
{
  id: 'os-processes-x1',
  q: 'Consider the code: printf("A"); fork(); printf("B"); -- assuming stdout is fully line-buffered and no newline is printed, how many times does "B" get printed in total across parent and child, and does "A" ever get duplicated due to buffering?',
  options: ['"B" prints twice (once per process after the fork); "A" is NOT duplicated because it was flushed/executed before the fork happened', '"B" prints once; "A" is duplicated because it stays in the buffer at fork time and gets flushed by both processes', '"A" is duplicated and "B" prints twice, because fork() duplicates the buffered output along with the buffer contents, and each process later flushes its own copy', 'Neither "A" nor "B" is affected because fork() always flushes all buffers automatically before duplicating the process'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'fork() duplicates the ENTIRE process image, including any unflushed contents sitting in the stdio user-space buffer -- it does not automatically flush buffers first. Here, printf("A") with no trailing newline and full/line buffering to a non-terminal or even a terminal without a newline typically leaves "A" sitting in the buffer, unflushed, at the moment fork() executes. Both the parent and the child therefore inherit a copy of that same buffered "A". Each process later flushes its own copy independently (e.g. at normal program exit), so "A" is printed twice -- once by each process. Then printf("B") executes independently in each process after the fork, appending "B" to each one\'s own now-separate buffer, so "B" is also printed once by each process, twice total. This buffering interaction is a classic real-world gotcha distinguishing fork()-with-buffered-I/O behavior from naive fork()-counting exercises that ignore I/O buffering entirely.'
},
{
  id: 'os-processes-x2',
  q: 'Two threads T1 and T2 belong to the SAME process. Which of the following is shared between T1 and T2, and which is NOT?',
  options: ['Heap memory and global variables are shared; each thread has its own private stack and own register/program-counter values', 'Everything including the stack is shared between threads of the same process', 'Nothing is shared between threads of the same process; each behaves like a completely separate process', 'Only the program counter is shared; the heap and global variables are private to each thread'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'Threads of the same process share the process\'s address space: the code (text) segment, global/static data segment, heap, and open file descriptors -- this is exactly what makes inter-thread communication cheap, since threads can read and write shared variables directly without any IPC mechanism. However, each thread must maintain its OWN execution context to run independently: its own stack (for local variables and function call frames), its own set of CPU register values, and its own program counter/instruction pointer, since two threads can be at completely different points in the code at any instant. If threads shared a single stack, their independent function calls and local variables would corrupt each other immediately.'
},
{
  id: 'os-processes-x3',
  q: 'Which statement about copy-on-write (COW) fork() is correct?',
  options: ['Immediately after fork(), parent and child share the same physical pages read-only; a private copy of a page is made only when either process attempts to write to it', 'COW immediately copies the entire address space of the parent into new physical frames for the child before fork() returns', 'COW only applies to the stack segment and never to heap or data pages', 'COW eliminates the need for a page table entry in the child process entirely'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Copy-on-write is an optimisation applied to fork(): instead of eagerly duplicating every page of the parent\'s address space (which would be wasteful, especially since many child processes immediately call exec() and discard the copy entirely), the kernel marks the shared pages as read-only in both the parent\'s and child\'s page tables and lets both processes point to the SAME physical frames. Only when one of the processes attempts to WRITE to such a page does a protection fault occur, triggering the kernel to allocate a genuinely private physical frame, copy the page\'s contents into it, and update that one process\'s page table entry -- all other untouched pages remain shared. This applies uniformly to any page (heap, data, or otherwise), and the child absolutely still needs its own page table (a full set of entries, initially pointing at the same frames as the parent\'s).'
},
{
  id: 'os-processes-x4',
  q: 'A process has been moved to the Waiting state after issuing a disk read request. The disk completes the transfer and raises an interrupt. What is the immediately correct next state for this process?',
  options: ['Ready, because only the scheduler decides which ready process actually gets the CPU next', 'Running, because the completed I/O directly resumes the process on the CPU', 'New, because the process must be reinitialised after I/O completion', 'Terminated, since blocking I/O calls end the process by convention'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'When an awaited I/O event (here, disk transfer completion) occurs, the OS moves the corresponding process from Waiting directly to Ready -- never straight to Running. This is because the CPU might currently be busy executing some other process, and even if it happens to be idle, the decision of WHICH ready process actually gets dispatched next is exclusively the short-term scheduler\'s job, based on the chosen scheduling policy (priority, remaining burst, etc.) and the states of all other ready processes at that moment. Only the dispatcher, acting on the scheduler\'s decision, can move a process into Running.'
},
{
  id: 'os-processes-x5',
  q: 'Which of the following BEST explains why creating a new kernel-level thread is generally more expensive than creating a new user-level thread?',
  options: ['Creating a kernel-level thread requires a system call and kernel-side bookkeeping (its own kernel stack, scheduling structures), whereas a user-level thread is created and managed entirely by a user-space library with no kernel involvement', 'Kernel-level threads always require allocating an entirely new, independent virtual address space, exactly like a new process', 'User-level threads cannot be scheduled at all, so their "creation" is instantaneous by definition', 'Kernel-level threads must always be created before the process itself starts running, unlike user-level threads'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'A user-level thread is entirely a construct of a user-space threading library: creating one just means allocating a small user-space data structure and stack, with no system call and no kernel awareness at all -- extremely cheap. A kernel-level thread, by contrast, requires the kernel itself to create and track a schedulable entity: allocating kernel-level bookkeeping structures (its own kernel stack, entry in the kernel\'s scheduling data structures) via a system call, which involves the usual mode-switch overhead into the kernel. Neither type of thread creation duplicates the address space the way fork() does -- threads of one process always share that one process\'s existing address space, so option B is simply wrong. User-level threads absolutely are scheduled (by the user-space library itself), just not by the kernel directly.'
},
{
  id: 'os-processes-x6',
  q: 'Consider: for(i=0;i<2;i++){ fork(); } -- how many TOTAL processes exist immediately after this loop finishes (including the original process)?',
  options: ['4', '2', '3', '8'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'This is an unconditional fork() executed inside a loop that runs exactly n=2 iterations, and crucially, every process that exists at the start of each iteration (the original process plus any children already created by earlier iterations) also executes that same loop body, including the fork() call, on every subsequent iteration. This gives the standard doubling result: total processes after the loop = 2^n = 2^2 = 4 (one original plus three newly created children). Tracing explicitly: before loop, 1 process (P0). After iteration 1 (i=0), P0 forks C1: 2 processes total. After iteration 2 (i=1), both P0 and C1 independently execute fork() again, each producing one more child: 2 processes become 4 processes total.'
},
{
  id: 'os-processes-x7',
  q: 'Which of the following is true regarding the many-to-one user-thread-to-kernel-thread mapping model?',
  options: ['If one user thread makes a blocking system call, the entire process (all its user threads) blocks, and no true parallelism across multiple CPU cores is possible', 'It provides true parallel execution of threads on separate cores, since each user thread is independently visible to the kernel scheduler', 'It requires a system call for every single thread creation, making thread creation costly', 'It is identical in behaviour and performance characteristics to the one-to-one model'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'In the many-to-one model, many user-level threads are multiplexed onto a SINGLE underlying kernel thread; the kernel is aware of only that one kernel thread and schedules it as one unit, with no visibility into the individual user threads inside it. Consequently, if any one of those user threads issues a blocking system call, the single kernel thread (and hence the entire process) blocks, stalling every other user thread in that process even though they might otherwise be ready to run. Similarly, since the kernel only ever sees one schedulable entity for the whole process, it can never run two of that process\'s threads simultaneously on two different cores -- true parallelism is impossible under this model, unlike the one-to-one model. Thread creation in this model is cheap precisely BECAUSE it happens entirely in user space without any system call.'
},
{
  id: 'os-processes-x8',
  q: 'A parent process calls fork() and then immediately calls wait() to block until the child terminates, while the child calls exec() to load a completely different program image. Which statement is correct?',
  options: ['exec() replaces the calling process\'s entire address space (code, data, stack) with a new program while keeping the same process ID; it does not create a new process', 'exec() creates a brand-new child process distinct from the one on which it was called', 'fork() and exec() together are redundant since exec() alone can both create and load a new process', 'wait() causes the child process to terminate immediately regardless of what the child is doing'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'exec() does NOT create a new process -- it operates on the ALREADY EXISTING calling process (here, the child created moments earlier by fork()), completely replacing that process\'s code, data, heap, and stack with the code and data of a new program, while the process ID (PID) stays exactly the same as before the exec() call. This is precisely why fork()+exec() is the standard Unix idiom for launching a new program: fork() creates a new, independent process (initially a duplicate of the parent), and exec() then transforms that child into the desired new program. The parent\'s wait() call simply blocks the parent until the child eventually terminates (whenever the exec()\'d program finishes), it does not itself cause termination.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-scheduling';}).questions.push(
{
  id: 'os-scheduling-x1',
  q: 'Processes P1(AT=0,BT=8), P2(AT=1,BT=4), P3(AT=2,BT=2) are scheduled using SRTF (preemptive shortest remaining time first). What is P1\'s waiting time?',
  options: ['6', '0', '8', '4'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Trace: t=0, only P1 present, P1 runs (remaining 8). At t=1, P2(BT4) arrives; P2\'s remaining(4) < P1\'s remaining(7), so P1 is PREEMPTED and P2 runs. At t=2, P3(BT2) arrives; P3\'s remaining(2) < P2\'s remaining(3), so P2 is preempted and P3 runs. P3 has the shortest job and no further arrivals beat it, so P3 runs to completion: 2 to 4. At t=4, compare remaining bursts: P2 has 3 left, P1 has 7 left; P2 runs 4 to 7 (completes). Then P1 runs its remaining 7, from 7 to 14. P1\'s completion time = 14, turnaround = 14-0=14, waiting time = turnaround - burst = 14-8 = 6. P1 experienced two preemptions and had to wait for both P2 and P3 to fully finish before resuming.'
},
{
  id: 'os-scheduling-x2',
  q: 'In an SRTF trace, a running process is preempted at the exact instant a new process arrives with remaining burst time EQUAL to (not less than) the running process\'s remaining time. What is the standard convention?',
  options: ['No preemption occurs, since SRTF only preempts on a STRICTLY smaller remaining time; the currently running process continues', 'The new process always preempts on a tie, by convention', 'Both processes are considered to run simultaneously', 'The process with the higher arrival time is always preempted regardless of remaining time'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'SRTF preempts the currently running process only when a newly arrived (or newly ready) process has a STRICTLY SMALLER remaining burst time than the process currently on the CPU. On an exact tie, there is no compelling reason to switch (switching would only add unnecessary context-switch overhead without reducing anyone\'s remaining work), so the standard convention -- and the one GATE numericals assume unless stated otherwise -- is that the currently running process CONTINUES uninterrupted. This subtlety matters because it changes which process accumulates waiting time in a tie scenario, and is a common source of off-by-one errors in preemptive scheduling traces.'
},
{
  id: 'os-scheduling-x3',
  q: 'A binary semaphore is used purely for mutual exclusion, while a monitor with a condition variable is used to solve the same producer-consumer problem. Which statement correctly distinguishes them for THIS specific comparison?',
  options: ['The monitor automatically enforces mutual exclusion for all code inside it, and its condition-variable signal() is lost if no thread is currently waiting, whereas a semaphore\'s signal() always increments its counter regardless of whether anyone is waiting', 'A monitor cannot be used to solve producer-consumer at all, only semaphores can', 'A semaphore automatically provides mutual exclusion for an entire block of code without any explicit wait/signal calls, exactly like a monitor', 'Condition variables in a monitor behave identically to counting semaphores in every respect, including remembering signals sent with no waiter'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'A monitor bundles shared data and its operations into one module where the compiler/runtime automatically ensures only one thread executes inside the monitor at a time -- no explicit wait(mutex)/signal(mutex) pairing is needed by the programmer. Its condition variables are used only for scheduling constraints (e.g., "buffer not full"): calling signal() on a condition variable wakes ONE waiting thread if one exists, but if no thread happens to be waiting at that moment, the signal has no lasting effect and is simply lost -- it is NOT remembered for a future wait() call. A semaphore behaves completely differently: signal() always increments its internal counter, persisting that "credit" even if no process is currently blocked, to be consumed later by whichever process next calls wait(). This is why care must be taken translating a semaphore-based solution into a monitor-based one -- the "memory" of a missed signal simply does not exist for condition variables.'
},
{
  id: 'os-scheduling-x4',
  q: 'Four processes P1,P2,P3,P4 arrive at t=0 with burst times 6,8,7,3 respectively and are scheduled by non-preemptive SJF. What is the average waiting time?',
  options: ['7', '9', '12', '3'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Since all four processes arrive simultaneously at t=0, non-preemptive SJF simply runs them in increasing order of burst time: P4(3), P1(6), P3(7), P2(8). Completion times: P4=3, P1=3+6=9, P3=9+7=16, P2=16+8=24. Since every process arrived at t=0, turnaround time equals completion time here, so waiting time = completion time - burst time: P4=3-3=0, P1=9-6=3, P3=16-7=9, P2=24-8=16. Sum of waiting times = 0+3+9+16 = 28; average = 28/4 = 7. This confirms that always scheduling the shortest job first among simultaneously ready processes is provably optimal for minimising average waiting time in the non-preemptive, all-arrive-together case.'
},
{
  id: 'os-scheduling-x5',
  q: 'In Round Robin scheduling with a very large time quantum (larger than the longest burst time of any process), the resulting schedule behaves most like which other algorithm?',
  options: ['FCFS (First Come First Served)', 'SRTF (Shortest Remaining Time First)', 'Non-preemptive priority scheduling', 'Multilevel feedback queue with three levels'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'If the Round Robin time quantum exceeds the burst time of every process in the system, then no process is ever actually preempted mid-execution -- each process, once dispatched, simply runs to completion within its allotted quantum before the timer would even trigger. This means processes are serviced in exactly the same order the ready queue presents them, which (assuming a plain FIFO ready-queue insertion order matching arrival order) is identical to plain FCFS scheduling. This is precisely why quantum size is described as tuning RR "between" fine-grained fairness (small quantum) and FCFS-like batch behaviour (very large quantum).'
},
{
  id: 'os-scheduling-x6',
  q: 'Which of the following is a valid GATE-style reason multilevel feedback queue (MLFQ) scheduling is considered more general than plain multilevel queue scheduling?',
  options: ['MLFQ allows a process to move between queues based on its observed behaviour (e.g., CPU-bound vs I/O-bound), whereas plain multilevel queue permanently fixes each process to one queue', 'MLFQ uses only a single ready queue, unlike multilevel queue which uses several', 'MLFQ cannot be configured to behave like FCFS or Round Robin, unlike multilevel queue', 'MLFQ never allows preemption, while plain multilevel queue always does'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'In plain multilevel queue scheduling, each process is assigned PERMANENTLY to exactly one queue (e.g., based on process type) for its entire lifetime, and a fixed policy governs CPU allocation between queues. Multilevel feedback queue relaxes this rigidity: a process can be DEMOTED to a lower-priority (usually longer-quantum) queue if it consumes a lot of CPU time (behaving as CPU-bound), or PROMOTED to a higher-priority queue if it frequently gives up the CPU early (behaving as I/O-bound), all without the scheduler needing to know burst times in advance. Because its parameters (number of queues, quantum per queue, promotion/demotion rules) are fully configurable, MLFQ can be tuned to emulate FCFS, Round Robin, or a plain multilevel queue as special cases, making it the most general scheduling framework among the classical algorithms.'
},
{
  id: 'os-scheduling-x7',
  q: 'Consider Round Robin with quantum=3 and processes P1(AT=0,BT=5), P2(AT=2,BT=4). What is the total number of context switches that occur (counting only switches BETWEEN different processes, not counting the very first dispatch)?',
  options: ['2', '1', '3', '0'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Trace: t=0-3, P1 runs (only P1 has arrived), remaining becomes 5-3=2. At t=2, P2 arrives and joins the queue: queue=[P2]. At t=3, P1\'s quantum expires and it is preempted (SWITCH 1: P1 to P2), re-queued: queue=[P2, P1(2)]. t=3-6, P2 runs its full quantum (remaining 4-3=1), then is preempted (SWITCH 2: P2 to P1), re-queued: queue=[P1(2), P2(1)]. t=6-8, P1 runs its remaining 2 and FINISHES exactly at the quantum boundary, so control passes on to P2 without needing to re-queue P1 -- this handoff to run the next process is not counted as a preemption-switch since P1 completed rather than being cut off. t=8-9, P2 runs its remaining 1 and finishes. Total context switches between distinct processes (P1 to P2, then P2 to P1) = 2.'
},
{
  id: 'os-scheduling-x8',
  q: 'Under priority scheduling without aging, which scenario below correctly illustrates starvation?',
  options: ['A continuous stream of high-priority processes keeps arriving, so a waiting low-priority process never gets scheduled even though it is ready and has been waiting a very long time', 'A single low-priority process is the only ready process in the system and runs immediately', 'The scheduler runs out of memory to store the ready queue', 'Two processes of identical priority alternate on the CPU indefinitely, sharing time equally'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'Starvation (indefinite blocking) under priority scheduling specifically means a ready process is repeatedly passed over for the CPU because other, higher-priority processes keep arriving and always outrank it -- the low-priority process is never fundamentally denied resources it needs, it simply keeps losing the priority comparison every time the scheduler picks the next process to run, potentially forever if high-priority arrivals never stop. This is exactly why AGING is introduced as the standard fix: it gradually increases the priority of any process that has waited long enough, guaranteeing it eventually becomes the highest-priority ready process and gets scheduled. The other options describe either normal scheduling behaviour or an unrelated resource issue, not starvation.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-sync';}).questions.push(
{
  id: 'os-sync-x1',
  q: 'A counting semaphore S is initialised to 2. The following calls happen in this exact order: wait(S), wait(S), wait(S), signal(S). Using the convention where the semaphore value can go negative to represent the count of blocked processes, what is the value of S after this sequence, and how many processes are currently blocked?',
  options: ['S = -1, with 1 process blocked', 'S = 0, with 0 processes blocked', 'S = 1, with 0 processes blocked', 'S = -1, with 2 processes blocked'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Under this convention, wait(S) unconditionally decrements S, and the calling process blocks only if the resulting value is negative; signal(S) unconditionally increments S. Start S=2. wait #1: S=2-1=1 (result non-negative, process proceeds). wait #2: S=1-1=0 (still non-negative, proceeds -- all instances are now in use but no one is blocked yet). wait #3: S=0-1=-1 (result negative, so this process BLOCKS; the magnitude of a negative S counts how many processes are waiting). signal(S): S=-1+1=0, and this signal wakes the one blocked process, which now proceeds. Final S=0, with 0 processes blocked after the signal resolves the earlier block.'
},
{
  id: 'os-sync-x2',
  q: 'In the standard bounded-buffer producer-consumer solution using semaphores empty (init N), full (init 0), and mutex (init 1), what deadlock risk arises if a producer\'s code is accidentally written as: wait(mutex); wait(empty); ... insert item ...; signal(mutex); signal(full);  (i.e., wait(mutex) BEFORE wait(empty))?',
  options: ['If the buffer is completely full, the producer blocks on wait(empty) while STILL HOLDING mutex, permanently preventing any consumer from acquiring mutex to remove an item and free up space -- a deadlock', 'There is no risk at all; the order of wait(mutex) and wait(empty) never matters', 'The consumer would immediately crash upon trying to call wait(full)', 'This ordering actually improves performance with no downside compared to the standard order'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'The standard, correct order is to wait on the resource-counting semaphore (empty, for a producer) BEFORE acquiring the mutual-exclusion semaphore (mutex), specifically so that a producer never holds mutex while it might have to block waiting for space. If the order is swapped, and the buffer happens to be full, the producer will call wait(mutex) first (successfully acquiring exclusive access), and then call wait(empty), which blocks because there is no free slot. Crucially, the producer is now BLOCKED while STILL HOLDING mutex. Any consumer that wants to remove an item (which would call signal(empty) and free a slot) first needs to acquire mutex itself -- but mutex is held by the blocked producer and will never be released. Neither process can make progress: a classic deadlock caused purely by acquiring the wrong semaphore first.'
},
{
  id: 'os-sync-x3',
  q: 'Which of the following resource-allocation-graph (RAG) situations GUARANTEES deadlock, versus merely making it POSSIBLE?',
  options: ['A cycle exists in a RAG where every resource type involved in the cycle has exactly one instance -- this guarantees deadlock; a cycle involving a resource type with multiple instances only makes deadlock possible, not certain', 'Any cycle in any RAG, regardless of instance counts, always guarantees deadlock', 'A RAG can never contain a cycle if the system is deadlock-free', 'A cycle only matters if it involves at least three distinct processes'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'When every resource type appearing in a resource allocation graph has a SINGLE instance, a cycle is both a necessary and a SUFFICIENT condition for deadlock: if such a cycle exists, every process in it is permanently stuck waiting on the next, with no possible escape, since there is no spare instance of any resource in the cycle that could free things up. However, if some resource types in the cycle have MULTIPLE instances, a cycle only shows that deadlock is POSSIBLE, not certain -- it may still be that a process elsewhere in the graph, not itself blocked, eventually releases an instance of a resource needed by a process in the cycle, breaking the impasse before deadlock actually occurs. Determining whether a multi-instance cyclic RAG is truly deadlocked requires checking for any valid completion (escape) sequence, essentially running a Banker\'s-style safety check on the current allocation.'
},
{
  id: 'os-sync-x4',
  q: 'Two threads increment a shared global counter with the non-atomic sequence: load counter into a register, add 1, store register back to counter. Both threads execute this with no synchronisation, starting from counter=5, and each executes it once. Which final value of counter is possible due to a race condition, in addition to the expected 7?',
  options: ['6', '5', '8', '9'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'If the two threads interleave so that BOTH read counter as 5 before either writes back its result, then thread A computes 5+1=6 and stores 6, and thread B (having also read 5 earlier) also computes 5+1=6 and stores 6 -- overwriting thread A\'s update rather than building on it. The final value is 6, not the expected 7, because one increment was effectively lost: this is a textbook race condition arising from the read-modify-write sequence not being executed as a single atomic (indivisible) operation. A value like 8 or 9 is impossible here since only two increments totalling at most +2 ever occur; 5 is impossible since at least one thread\'s write of 6 must land after the initial read of 5.'
},
{
  id: 'os-sync-x5',
  q: 'Under Peterson\'s solution for two processes P0 and P1, using shared variables flag[2] and turn, which property is specifically guaranteed by the turn variable rather than by flag[]?',
  options: ['Progress and bounded waiting -- turn resolves which process enters when BOTH have simultaneously declared interest via flag[], preventing both mutual deadlock and indefinite postponement of either process', 'Mutual exclusion alone -- flag[] plays no role in preventing simultaneous entry', 'Turn ensures the two processes never both terminate, which flag[] cannot do', 'Turn is only used for debugging and has no effect on correctness'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'In Peterson\'s solution, flag[i]=true signals that process i WANTS to enter its critical section, and mutual exclusion is enforced by the combined check while(flag[j] && turn==j) -- a process cannot enter while the other wants in AND it is the other\'s turn. The flag array alone cannot resolve the case where both processes simultaneously set flag[true] and both are checking each other -- without turn, this could either let both in (violating mutual exclusion) or leave both stuck out (violating progress). Setting turn=j (giving priority to the OTHER process) right before checking guarantees that whichever process\'s turn is NOT current will proceed, resolving the standoff deterministically and ensuring the waiting process is not postponed indefinitely once its rival exits, satisfying both progress and bounded waiting.'
},
{
  id: 'os-sync-x6',
  q: 'A dining-philosophers table has 5 philosophers and 5 forks arranged in a circle. To PREVENT deadlock while still allowing maximum concurrency, which of the following modifications is a standard, correct fix?',
  options: ['Make exactly one philosopher pick up forks in the opposite order (right fork then left fork) while all others pick up left then right -- this breaks the possibility of a circular wait', 'Give every philosopher three forks each instead of two', 'Allow all 5 philosophers to pick up their left fork and then immediately their right fork with no restriction, which never causes a problem', 'Remove the concept of forks entirely and let philosophers eat without any coordination'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'The naive symmetric solution (every philosopher picks up their left fork, then their right fork) can deadlock if all 5 pick up their left fork at the same time -- each then waits forever for a right fork that is a neighbour\'s already-held left fork, forming a circular wait among all 5. A standard, minimal fix is to break this symmetry: have exactly one philosopher (say philosopher 4) pick up the RIGHT fork first, then the left, while everyone else keeps the original left-then-right order. This asymmetry makes it impossible for all 5 to simultaneously hold one fork each while waiting for the next, since the odd-one-out philosopher will either get both their forks immediately or free up a fork that lets a neighbour proceed, structurally eliminating the circular-wait condition without reducing table capacity to fewer than 5 diners.'
},
{
  id: 'os-sync-x7',
  q: 'A monitor-based bounded-buffer solution uses condition variables notFull and notEmpty. A producer thread calls wait(notFull) when the buffer is full, then is eventually signalled. Which statement about what happens immediately after being signalled is correct for the standard (Hoare-style or Mesa-style, as commonly taught) semantics used in most textbook treatments?',
  options: ['In the commonly taught (Mesa-style) semantics, a signalled thread does not run immediately -- it becomes ready but must re-acquire the monitor lock and should RE-CHECK the condition (e.g. in a while loop) before proceeding, since the state may have changed again before it actually resumes', 'The signalled thread is guaranteed to resume immediately, mid-instruction, before the signalling thread proceeds any further', 'Signalling a condition variable always terminates the monitor invocation of the signalling thread instantly', 'Condition variables can be signalled only once per program execution'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'Most operating-systems courses teach the Mesa-style monitor semantics (as opposed to the stricter, less commonly implemented Hoare-style): calling signal() on a condition variable simply moves ONE waiting thread from blocked to ready -- it does NOT immediately transfer control to that thread, and the signalling thread continues running until it itself exits the monitor or waits again. Because some other thread might run first and change the shared state again before the newly-readied thread actually gets the CPU and re-acquires the monitor lock, the woken thread MUST re-check its waiting condition (typically via a while loop, e.g. while(buffer is full) wait(notFull);, rather than an if) before proceeding, rather than assuming the condition that justified waking it still holds.'
},
{
  id: 'os-sync-x8',
  q: 'Which of the following is a valid GATE-style trap regarding the Readers-Writers problem\'s classic first (reader-preference) solution using a mutex and a semaphore wrt?',
  options: ['This solution can lead to writer STARVATION, because as long as at least one reader is always present or new readers keep arriving, a waiting writer may never get exclusive access', 'This solution guarantees writers always get priority over readers', 'This solution eliminates the need for any mutual exclusion among readers themselves', 'This solution allows two writers to write simultaneously as long as no readers are active'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'In the classic first readers-writers solution, the semaphore wrt is acquired by the FIRST reader to arrive (locking out writers) and released only by the LAST reader to leave; any number of readers may enter and read concurrently in between, incrementing/decrementing a readcount variable (protected by mutex) to track this. Because a new reader arriving while other readers are already active does not need to wait for wrt at all (it only needs mutex briefly to update readcount), a continuous stream of overlapping readers can keep wrt permanently held on the readers\' side, indefinitely preventing any waiting writer from ever acquiring it -- writer starvation. This solution never allows two writers concurrently, since only one entity (a lone writer, or the collective group of readers) can hold wrt at any time.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-deadlock';}).questions.push(
{
  id: 'os-deadlock-x1',
  q: 'A resource allocation graph has resource types R1 and R2, each with a SINGLE instance. Process P1 holds R1 and requests R2; process P2 holds R2 and requests R1. Is the system deadlocked, and why?',
  options: ['Yes -- this forms a cycle (P1->R2->P2->R1->P1) among single-instance resources, which is both necessary and sufficient for deadlock', 'No -- a cycle only matters if there are at least three processes involved', 'No -- deadlock is impossible with only two processes regardless of the resource graph', 'Cannot be determined without knowing the total number of resource instances of some OTHER resource type not mentioned'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'The described allocation and request edges form a cycle: P1 holds R1 and requests R2 (edge P1->R2), while P2 holds R2 and requests R1 (edge P2->R1), with assignment edges R1->P1 and R2->P2 closing the loop. Since BOTH R1 and R2 have exactly one instance each, a cycle in this single-instance resource allocation graph is both a NECESSARY and SUFFICIENT condition for deadlock: neither P1 nor P2 can ever proceed, since each is waiting for a resource permanently held by the other, and neither can release what it holds until it gets what it is waiting for. A two-process cycle is the smallest possible deadlock and is entirely valid.'
},
{
  id: 'os-deadlock-x2',
  q: 'In a system using the Banker\'s algorithm with 4 resource types, a process Pi has Max=[6,4,7,3] and current Allocation=[2,1,3,1]. What is Pi\'s Need vector?',
  options: ['[4,3,4,2]', '[8,5,10,4]', '[6,4,7,3]', '[2,1,3,1]'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'The Need vector is defined component-wise as Need[i] = Max[i] - Allocation[i], representing the additional resources of each type the process may still legitimately request before reaching its declared maximum claim. Computing component-wise: 6-2=4, 4-1=3, 7-3=4, 3-1=2, giving Need = [4,3,4,2]. This vector is exactly what the Banker\'s safety algorithm compares against the working "Work" vector at each step to decide whether a process can be safely allowed to finish with currently available resources. Getting this subtraction wrong (e.g., accidentally comparing Max or Allocation directly against Work instead of Need) is one of the most common arithmetic slips made when tracing a Banker\'s algorithm question by hand under exam time pressure, so always double-check which of the three vectors -- Max, Allocation, or Need -- a given step of the algorithm actually requires.'
},
{
  id: 'os-deadlock-x3',
  q: 'A system has a single resource type with a total of 12 instances and 4 processes, each with a declared maximum need of 4 instances. Using the formula for guaranteeing no deadlock (minimum instances = n*(k-1)+1), is a total of 12 instances sufficient to GUARANTEE the system can never deadlock?',
  options: ['No -- the formula requires n*(k-1)+1 = 4*(4-1)+1 = 13 instances to guarantee no deadlock, so 12 is one short and deadlock remains possible', 'Yes -- 12 instances is always enough once it reaches or exceeds n*(k-1) = 12, with no extra instance needed', 'Yes -- since 12 equals n*k - 4, it comfortably exceeds the safe threshold', 'No -- the system needs at least n*k = 16 instances regardless of the formula'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'The guaranteed-safe minimum is n*(k-1)+1 = 4*(4-1)+1 = 4*3+1 = 13 instances. With only 12 instances available, it IS possible for all 4 processes to simultaneously hold 3 instances each (4*3=12, using up every instance) while each still needs exactly 1 more instance to reach its maximum of 4 -- at this point no process can proceed and no process can release anything voluntarily (each still needs more, not less), which is a genuine deadlock. With 13 instances, this exact stuck configuration becomes impossible, since after 4 processes hold 3 each (using 12), 1 instance would remain free, which is enough for at least one process to obtain its full need of 4 and finish, releasing its holdings for the others.'
},
{
  id: 'os-deadlock-x4',
  q: 'Which single condition is DIRECTLY attacked by requiring every process to acquire ALL the resources it will ever need for its entire execution in one single request, before it starts running (and to hold nothing otherwise)?',
  options: ['Hold and wait', 'Mutual exclusion', 'No preemption', 'Circular wait'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'The hold-and-wait condition specifically requires that a process holds at least one resource WHILE simultaneously waiting for additional resources held by others. If a process is instead forced to request and receive absolutely everything it will ever need in one atomic, all-or-nothing request before beginning execution (and never requests anything more afterward), it can never be in the state of holding something while also waiting for something else -- it either has everything up front, or it has nothing and is simply waiting to be granted everything. This directly and completely eliminates the possibility of hold-and-wait, though at the cost of potentially poor resource utilisation (resources sit idle in a process\'s possession long before they are actually used).'
},
{
  id: 'os-deadlock-x5',
  q: 'Applying the Banker\'s safety algorithm: Available=[3,3,2]. Need for P0=[7,4,3], P1=[1,2,2], P2=[6,0,0], P3=[0,1,1]. Allocation for P0=[0,1,0], P1=[2,0,0], P2=[3,0,2], P3=[2,1,1]. Which process can be scheduled FIRST in a safe sequence?',
  options: ['P1, since Need[P1]=[1,2,2] <= Available=[3,3,2] component-wise, while none of the other processes\' Need vectors are fully covered by the current Available', 'P0, because it appears first in process order', 'P2, because it holds the most resources already', 'No process can run first; the system is immediately in an unsafe state'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'The safety algorithm looks for a process whose ENTIRE Need vector is component-wise less than or equal to the current Work (initialised to Available=[3,3,2]). Checking each: P0 needs [7,4,3] -- 7>3, fails. P1 needs [1,2,2] -- 1<=3, 2<=3, 2<=2, all satisfied, so P1 CAN be granted its remaining need right now. P2 needs [6,0,0] -- 6>3, fails. P3 needs [0,1,1] -- all satisfied too, actually, but P1 is checked first in process order and succeeds, so it is scheduled first in this pass (the algorithm may find P3 also eligible on the same or a later pass, but P1 is a valid, correct first choice since its need vector already fits). After P1 finishes, Work becomes Available + Allocation[P1] = [3+2,3+0,2+0] = [5,3,2], and the algorithm continues checking remaining processes against this larger Work.'
},
{
  id: 'os-deadlock-x6',
  q: 'A system detects a deadlock among processes P1, P2, and P3. The OS decides to recover by aborting processes ONE AT A TIME (rather than all simultaneously) until the deadlock is broken. What must the OS do after aborting each single process?',
  options: ['Re-run the deadlock detection algorithm to check whether the deadlock still exists before deciding whether to abort another process', 'Immediately abort all remaining processes regardless of whether the deadlock is resolved', 'Restart the entire operating system to clear the deadlock state', 'Do nothing further -- aborting exactly one process always resolves any deadlock completely'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'When recovering by aborting processes one at a time, the OS cannot know in advance whether killing a single process is enough to break the entire cycle of circular waiting -- it depends on exactly which resources that process was holding and whether those specific resources are what the remaining deadlocked processes were waiting for. Therefore, after each individual abort, the detection algorithm (essentially a Banker\'s-style safety/cycle check using actual current allocations) must be RE-RUN to determine whether the deadlock has actually been resolved; if processes are still deadlocked, another victim is selected and aborted, and the cycle repeats. This incremental approach minimises unnecessary process termination compared to aborting all deadlocked processes at once, but costs more overhead from repeated detection runs.'
},
{
  id: 'os-deadlock-x7',
  q: 'Which of the following is the most accurate statement about the relationship between an UNSAFE state and an actual DEADLOCK, as used in the Banker\'s algorithm framework?',
  options: ['An unsafe state means deadlock is POSSIBLE depending on the order future requests happen to arrive in, but the system might still avoid deadlock if it gets lucky; a genuine deadlock is a stronger, already-realised condition where no process can proceed no matter what', 'An unsafe state and a deadlock are exactly the same thing and always occur together', 'A safe state can still be a deadlock if enough processes request resources simultaneously', 'An unsafe state guarantees deadlock will occur within a fixed, bounded number of future requests'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'A SAFE state guarantees that SOME sequence of resource grants exists that lets every process eventually complete, regardless of how future requests happen to be ordered -- this is a strong guarantee. An UNSAFE state simply means the Banker\'s safety algorithm could NOT find such a guaranteed-safe completion sequence for at least one possible future; it does NOT mean deadlock has actually happened, or even that it definitely will -- it only means the system can no longer PROVE deadlock is impossible, and depending on which specific requests actually arrive next, the system might still manage to avoid deadlock by chance. A true deadlock is the concrete, realised situation where a set of processes are ALREADY stuck waiting on each other with zero possibility of proceeding. Deadlock avoidance (Banker\'s algorithm) is conservative precisely because it refuses to ever enter an unsafe state at all, even though not every unsafe state actually leads to deadlock.'
},
{
  id: 'os-deadlock-x8',
  q: 'Which of the following best distinguishes deadlock PREVENTION from deadlock AVOIDANCE?',
  options: ['Prevention imposes structural constraints on HOW resources may be requested (e.g. total ordering, request-all-at-once) without needing advance knowledge of future claims; avoidance (e.g. Banker\'s algorithm) requires each process to declare its maximum resource claim in advance and checks safety before every grant', 'Prevention and avoidance are two different names for exactly the same technique', 'Avoidance always uses less memory bookkeeping than prevention', 'Prevention only works for systems with a single resource type, while avoidance works for any number of resource types'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Deadlock PREVENTION works by structurally ensuring at least one of the four necessary conditions (mutual exclusion, hold-and-wait, no preemption, circular wait) can NEVER hold, via rules imposed on how and when resources may be requested (e.g., a strict total ordering on resource types, or requiring all-at-once requests) -- crucially, this requires NO advance knowledge of what a process will eventually need. Deadlock AVOIDANCE, exemplified by the Banker\'s algorithm, takes a different approach: it requires each process to declare its MAXIMUM possible future claim on each resource type in advance, and then, before granting any individual request, dynamically checks (via the safety algorithm) whether granting it would leave the system in a safe state; only safe-state-preserving requests are granted immediately, others must wait. Avoidance is generally considered more flexible and permits higher resource utilisation than prevention, but requires that advance-knowledge assumption that prevention does not.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-memory';}).questions.push(
{
  id: 'os-memory-x1',
  q: 'A system uses paging with a 32-bit logical address and a page size of 4 KB (2^12 bytes). How many bits are used for the page NUMBER portion of the logical address?',
  options: ['20 bits', '12 bits', '16 bits', '32 bits'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'A page size of 4 KB = 2^12 bytes means the page OFFSET (the low-order bits that index directly within a page/frame) requires exactly 12 bits, since 2^12 distinct byte offsets exist within one page. The logical address is 32 bits total, so the remaining high-order bits form the page number: 32 - 12 = 20 bits. This means the page table could have up to 2^20 (about a million) entries in the worst case, which is exactly the kind of large page-table-size concern that motivates multi-level or inverted page tables in real systems with wide address spaces.'
},
{
  id: 'os-memory-x2',
  q: 'A TLB has an access time of 10 ns, and main memory access time is 90 ns. If the TLB hit ratio is 0.6 (a relatively low value), what is the effective memory access time (EMAT), using the standard formula EMAT = t + m + (1-h)*m?',
  options: ['136 ns', '100 ns', '190 ns', '60 ns'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Using EMAT = t + m + (1-h)*m with t=10, m=90, h=0.6: EMAT = 10 + 90 + (1-0.6)*90 = 100 + 0.4*90 = 100 + 36 = 136 ns. Cross-checking via the hit/miss branches directly: on a hit (probability 0.6), cost = t+m = 100 ns; on a miss (probability 0.4), cost = t+m+m = 190 ns. EMAT = 0.6*100 + 0.4*190 = 60 + 76 = 136 ns, confirming the same result. This example specifically illustrates that even a fairly LOW hit ratio like 0.6 still keeps EMAT well below the full miss cost of 190 ns, though clearly worse than a high hit ratio would give.'
},
{
  id: 'os-memory-x3',
  q: 'Which of the following is true regarding INTERNAL fragmentation under pure paging (no segmentation involved)?',
  options: ['It can occur, up to almost one full page/frame of wasted space per process, whenever a process\'s total size is not an exact multiple of the page size', 'It can never occur under paging, since paging is specifically designed to eliminate all forms of fragmentation', 'It always equals exactly half a page for every single process without exception', 'It only occurs if the process requests more memory than physically exists in the system'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'Paging allocates memory in whole-page (whole-frame) units. If a process\'s actual memory requirement is not an exact multiple of the page size, its LAST allocated page will only be partially used, with the remaining space in that frame wasted -- this is internal fragmentation, and in the worst case it can approach almost one entire page size (if just 1 byte spills into a new page, nearly the whole of that new page is wasted). On AVERAGE across many processes with essentially random final-page usage, the expected waste per process is about half a page, but for any SPECIFIC individual process it can range from 0 (exact multiple) up to just under one full page -- so "always exactly half a page" is not correct as a per-process guarantee, only as a long-run average.'
},
{
  id: 'os-memory-x4',
  q: 'Which of the following best explains why SEGMENTATION (unlike pure paging) can suffer from EXTERNAL fragmentation?',
  options: ['Segments are variable-sized logical units, so as segments of different sizes are allocated and freed over time, physical memory can end up broken into scattered holes too small individually to satisfy a new segment request, even though the total free space may be sufficient', 'Segmentation always allocates memory in fixed 4 KB chunks, exactly like paging, so this statement about segmentation is not actually true', 'External fragmentation in segmentation occurs only when the segment table itself runs out of space', 'Segmentation eliminates external fragmentation entirely by definition, since segments map directly to a program\'s logical structure'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Unlike paging, where every allocatable unit (a frame) is exactly the same fixed size, segmentation allocates memory in VARIABLE-sized chunks matching each segment\'s actual logical size (code segment, stack segment, heap segment, etc.), placed contiguously in physical memory. As segments of differing sizes are loaded and later freed throughout a system\'s uptime, the freed spaces can end up as scattered holes of assorted sizes -- exactly the same external-fragmentation problem that plain contiguous (variable-partition) memory allocation experiences, and for exactly the same underlying reason: variable-sized allocation units. This is a key structural difference from paging, whose uniform fixed-size frames make external fragmentation structurally impossible (though internal fragmentation remains possible).'
},
{
  id: 'os-memory-x5',
  q: 'A dynamic memory allocator maintains free holes of sizes 100 KB, 500 KB, 200 KB, and 300 KB (in that order in the free list). A request for 212 KB arrives. Which hole does BEST FIT allocate from, and what is the resulting leftover fragment?',
  options: ['The 300 KB hole is used, leaving a 88 KB fragment', 'The 500 KB hole is used, leaving a 288 KB fragment', 'The 200 KB hole is used, since it is close enough, even though it is technically too small', 'The 100 KB hole is used, leaving a -112 KB deficit'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Best fit must scan every hole in the free list and select the SMALLEST one that is still large enough to satisfy the request. Checking each hole against the 212 KB request: 100 KB is too small (rejected). 500 KB fits but is far larger than necessary. 200 KB is too small (200 < 212, rejected). 300 KB fits and is the smallest hole among {500, 300} that is still big enough. So best fit selects the 300 KB hole, using 212 KB of it and leaving a leftover fragment of 300-212 = 88 KB. This small leftover fragment is exactly the kind of sliver that, over many such allocations, tends to accumulate into many small, hard-to-reuse gaps -- a well-known drawback of best fit despite its per-allocation optimality.'
},
{
  id: 'os-memory-x6',
  q: 'Compaction is used to eliminate external fragmentation by shuffling processes together in physical memory to merge all free holes into one large contiguous block. Which precondition is REQUIRED for compaction to be possible?',
  options: ['Processes must be relocatable at run time, typically via hardware base-register relocation, since compaction physically moves a process to a different memory address', 'Compaction requires that every process be exactly the same fixed size', 'Compaction can only be performed once, at system boot, and never again afterward', 'Compaction eliminates the need for any relocation hardware whatsoever'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Compaction works by physically relocating running processes\' contents within physical memory to consolidate scattered free holes into one large contiguous free region. For this to be safe, every address a relocated process uses (instruction fetches, data references) must still resolve correctly after the process\'s physical location changes -- this requires RUN-TIME relocation support, most commonly a hardware base (relocation) register that is simply updated to the process\'s new starting address, with every logical address transparently offset by this register at run time. Without such relocation hardware, a process\'s hardcoded or previously-bound physical addresses would become invalid the instant it was moved, making compaction impossible or requiring far more invasive software fix-ups. Compaction can be run repeatedly, whenever fragmentation becomes problematic again, not just once at boot.'
},
{
  id: 'os-memory-x7',
  q: 'Which statement correctly compares first fit and worst fit memory allocation strategies?',
  options: ['First fit can stop scanning as soon as it finds any sufficiently large hole, making it typically faster; worst fit must scan the entire free list to find the largest hole, and empirical studies show it tends to perform worse overall than first fit', 'Worst fit is always faster than first fit because it only checks one hole', 'First fit and worst fit always produce identical allocation results for any given request sequence', 'Worst fit guarantees zero external fragmentation over time, unlike first fit'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'First fit scans the free-hole list from the start and immediately allocates from the FIRST hole encountered that is large enough, so it can terminate its scan early -- typically the fastest of the classical strategies. Worst fit, by contrast, must examine EVERY hole in the free list to determine which one is truly the LARGEST, since it deliberately always picks the biggest available hole (reasoning that the leftover fragment will also be large and hence more useful later). Despite this reasoning, extensive simulation studies in the classical OS literature have found that worst fit tends to perform WORSE overall (in terms of both speed and long-run fragmentation) than both first fit and best fit, making it the least favoured of the three strategies in practice.'
},
{
  id: 'os-memory-x8',
  q: 'A process\'s logical address space is divided into 4 segments: code (size 4 KB), data (size 6 KB), stack (size 2 KB), and heap (size 3 KB). If segmentation is used WITHOUT paging, what determines whether a given logical address (segment number s, offset d) is valid?',
  options: ['The offset d must be less than the LIMIT (size) recorded for segment s in the segment table; if d exceeds that segment\'s limit, a segmentation fault (protection violation) occurs', 'The offset d must always be exactly equal to the segment\'s base address', 'Validity depends only on the total combined size of all four segments together, not on any individual segment', 'Segmentation never performs any bounds checking; all offsets are considered valid'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'In pure segmentation, each segment table entry records a BASE (the starting physical address of that segment) and a LIMIT (the size/length of that segment). A logical address is given as (segment number, offset); to translate it, the hardware looks up the segment\'s base and limit, and CHECKS that the offset is strictly less than the limit -- if the offset is within bounds, the physical address is base+offset; if the offset equals or exceeds the limit, a protection violation (segmentation fault) is raised, since the reference falls outside that segment\'s legitimately allocated space. This per-segment bounds checking is one of segmentation\'s natural advantages: it maps directly onto a program\'s logical divisions and can enforce access protection independently for each one (e.g., marking code segments read-only).'
},
{
  id: 'os-memory-y1',
  q: 'Which of the following statements about paging and segmentation are TRUE? (Select ALL that apply)',
  options: ['Paging can suffer from internal fragmentation (wasted space in the last allocated page) but not from external fragmentation', 'Segmentation can suffer from external fragmentation since segments have varying sizes and physical memory can become chopped into unusable gaps', 'Paging requires the physical frames allocated to a process to be contiguous in physical memory', 'Choosing a page size that is a power of 2 simplifies address translation, since the logical address can be split into page number and offset by simple bit extraction rather than division'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: since a process is allocated whole pages, the last page it uses is rarely filled exactly, wasting the unused remainder inside that page (internal fragmentation) -- but because any free frame anywhere in physical memory can be used for any page, paging does not suffer external fragmentation. Option B is TRUE: segments are variable-sized, so as segments are allocated and freed over time, physical memory can end up with scattered free holes too small individually to satisfy a new segment request, which is external fragmentation. Option C is FALSE: this is exactly the opposite of paging\'s key benefit -- a process\'s pages can be scattered across ANY available frames anywhere in physical memory, with the page table recording the mapping for each page independently; no contiguity is required. Option D is TRUE: with a power-of-2 page size, the low-order bits of the logical address directly form the offset and the remaining high-order bits directly form the page number, needing no division or modulo operation in hardware -- this is precisely why page sizes are always chosen as powers of 2 in practice.'
},
{
  id: 'os-memory-y2',
  q: 'Which of the following statements about dynamic memory partitioning strategies (first-fit, best-fit, worst-fit) are TRUE? (Select ALL that apply)',
  options: ['Best-fit searches the entire free-block list to find the smallest hole that is still large enough for the request, which can leave many tiny, unusable leftover fragments scattered across memory', 'Worst-fit deliberately allocates from the largest available hole, leaving a bigger leftover fragment that is statistically more likely to be usable for a future request', 'First-fit allocates from the first hole encountered that is large enough, scanning the free list from the beginning (or from where the last search left off) each time', 'Best-fit is always the fastest of the three strategies to execute, since it only ever needs to examine the first hole it encounters'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: best-fit\'s defining behaviour is scanning every free hole to find the smallest one that still satisfies the request, which minimises leftover space per allocation but tends to generate a large number of extremely small, practically useless leftover fragments over time. Option B is TRUE: worst-fit intentionally picks the LARGEST hole and carves the request out of it, on the reasoning that the remaining leftover piece is itself still large enough to be useful later, rather than shrinking into a sliver. Option C is TRUE: first-fit simply takes the earliest hole in the list that fits, which is why it is generally the fastest of the three to execute despite not always producing the least wasted space. Option D is FALSE: this describes first-fit\'s behaviour, not best-fit\'s -- best-fit must examine every hole in the free list (or at least continue scanning to confirm no smaller sufficient hole exists) before deciding, making it the slowest of the three to execute, not the fastest.'
},
{
  id: 'os-memory-y3',
  q: 'A system uses paging with a 32-bit logical address space and a page size of 4 KB. How many bits of the logical address are used to represent the page number? (Enter your numerical answer.)',
  options: [],
  answer: 20,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'The page OFFSET field must be large enough to address every byte within a single page: since the page size is 4 KB = 2^12 bytes, the offset requires 12 bits. Since the total logical address is 32 bits, the remaining bits form the page number field: 32 - 12 = 20 bits. This means the logical address space contains 2^20 (about 1 million) pages, each addressed by a distinct 20-bit page number, with the low-order 12 bits selecting the exact byte within whichever page is referenced.'
},
{
  id: 'os-memory-y4',
  q: 'A process has a logical address space of 2^22 bytes. The page size is 2^12 bytes, and each page table entry occupies 4 bytes. Assuming a single-level page table with one entry per page, what is the total size of this process\'s page table, in bytes? (Enter your numerical answer.)',
  options: [],
  answer: 4096,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'The number of pages in the process\'s address space equals the address space size divided by the page size: 2^22 / 2^12 = 2^10 = 1024 pages. Since a single-level page table needs exactly one entry per page, and each entry occupies 4 bytes, the total page table size = number of pages x entry size = 1024 x 4 = 4096 bytes (i.e., exactly one page\'s worth, 4 KB, of page-table storage in this particular case).'
},
{
  id: 'os-memory-y5',
  q: 'A process of size 6500 bytes is allocated memory using paging with a page size of 2048 bytes. What is the internal fragmentation, in bytes, wasted in the last (partially filled) page allocated to this process? (Enter your numerical answer.)',
  options: [],
  answer: 1692,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Number of pages needed = ceil(6500 / 2048) = ceil(3.174) = 4 pages, so the process is allocated 4 x 2048 = 8192 bytes total. The first 3 pages are completely filled, consuming 3 x 2048 = 6144 bytes; the 4th (last) page holds only the remaining 6500 - 6144 = 356 bytes of actual process data. Internal fragmentation is the wasted, unused space within that last allocated page: 2048 - 356 = 1692 bytes, which is memory reserved for the process but never actually used, characteristic of any paging scheme whenever a process size is not an exact multiple of the page size.'
},
{
  id: 'os-memory-y6',
  q: 'A computer has a physical memory of 512 MB, divided into frames of size 4 KB each. How many bits are required to represent the frame number in a physical address? (Enter your numerical answer.)',
  options: [],
  answer: 17,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Total number of frames = physical memory size / frame size = 512 MB / 4 KB = 2^29 bytes / 2^12 bytes = 2^17 frames. Since there are 2^17 distinct frames that must each be uniquely addressable, the frame number field of a physical address requires exactly 17 bits (2^17 = 131,072 distinct frame numbers), with the remaining 12 bits of the physical address forming the offset within whichever frame is selected.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-virtual-memory';}).questions.push(
{
  id: 'os-virtual-memory-x1',
  q: 'Which best explains why an INVERTED PAGE TABLE, which keeps only one entry per PHYSICAL FRAME rather than one entry per virtual page, typically needs a hash table to perform translation efficiently?',
  options: ['Given a virtual address, the OS must SEARCH for which single global entry matches this process\'s (PID, virtual page number) pair, since the table is indexed by physical frame, not by virtual page; hashing that pair to a likely entry avoids a slow linear scan of every frame', 'Inverted page tables do not need any translation at all once created', 'The hash table is used only to save disk space, not to speed up address translation', 'Inverted page tables have one entry per virtual page just like conventional page tables, so no special lookup mechanism is required'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'A conventional per-process page table is naturally indexed by virtual page number, so translation is a direct lookup. An inverted page table flips this: it keeps exactly ONE system-wide table with one entry per PHYSICAL FRAME, recording which (process, virtual page) currently occupies each frame -- this saves huge amounts of memory when virtual address spaces are large but physical memory is comparatively small. The cost is that translation now runs backwards: given a virtual address, the OS must find which frame entry (if any) matches the requesting process\'s (PID, virtual page number), which is fundamentally a search problem rather than a direct index. Scanning every physical frame entry linearly on every memory reference would be prohibitively slow, so a hash table mapping (PID, virtual page number) to a candidate frame-table entry is used to bring this lookup close to constant time.'
},
{
  id: 'os-virtual-memory-x2',
  q: 'A system uses a TWO-LEVEL page table with TLB hit ratio 0.9, TLB access time 4 ns, and main memory access time 100 ns. On a TLB miss, the walk requires 2 memory accesses (one per level) plus 1 final access for the data. What is the EMAT?',
  options: ['124 ns', '104 ns', '304 ns', '100 ns'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'On a TLB hit (probability 0.9): cost = TLB access + 1 data access = 4 + 100 = 104 ns. On a TLB miss (probability 0.1): cost = TLB access (failed) + 2 page-table-level accesses + 1 data access = 4 + 100 + 100 + 100 = 304 ns. EMAT = 0.9*104 + 0.1*304 = 93.6 + 30.4 = 124 ns. This is the general pattern for a k-level page table: EMAT = h*(t+m) + (1-h)*(t + k*m + m), where each additional page-table level adds exactly one more mandatory memory access to the miss-branch cost, making the hit ratio increasingly important as page-table depth grows.'
},
{
  id: 'os-virtual-memory-x3',
  q: 'A page-replacement scheme implements EXACT LRU using a counter/timestamp updated on every memory reference. What is the main practical drawback of this approach compared to an approximate scheme like the clock (second-chance) algorithm?',
  options: ['Every single memory reference must update a timestamp field, and eviction requires scanning for the minimum timestamp -- this per-reference overhead is far more costly in hardware/time than simply checking and occasionally clearing one reference bit per page as the clock algorithm does', 'Exact LRU using counters can only track a maximum of 2 pages at a time', 'The counter-based method requires no additional memory at all, unlike the clock algorithm', 'Exact LRU always produces MORE page faults than FIFO, making it strictly worse'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Implementing true LRU via a timestamp/counter requires updating that timestamp on literally EVERY memory reference (not just page faults), which is an enormous overhead if done for every single memory access at full processor speed, and finding the eviction victim (minimum timestamp) still requires an O(n) scan unless a more complex stack-based structure is maintained. The clock (second-chance) algorithm approximates LRU far more cheaply: it only requires a single REFERENCE BIT per page, set by hardware on access and periodically inspected/cleared by the replacement algorithm at eviction time -- vastly less overhead than maintaining exact per-reference timestamps. This is precisely why virtually no real system implements exact LRU in hardware for every access; approximations like clock are used instead. LRU\'s fault COUNT is provably never worse than FIFO\'s in the sense of never suffering Belady\'s anomaly, so option D is also incorrect.'
},
{
  id: 'os-virtual-memory-x4',
  q: 'Which statement correctly explains the role of COPY-ON-WRITE in reducing the cost of fork() specifically when the child process immediately calls exec()?',
  options: ['Since COW defers actually copying any page until a write occurs, and the child\'s call to exec() replaces its entire address space before it ever writes to most of the copied pages, those pages are never actually duplicated at all, saving the cost of copying memory that would have been immediately discarded', 'COW has no benefit in this scenario since exec() forces an immediate full copy regardless', 'COW only helps if the child process never calls exec() at all', 'COW duplicates all pages immediately regardless of whether exec() is subsequently called'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Without copy-on-write, fork() would need to eagerly duplicate the ENTIRE parent address space into new physical frames for the child, even though a hugely common pattern is for the child to immediately call exec() to load an entirely different program, discarding essentially all of that freshly copied memory almost instantly. With COW, fork() instead marks pages shared and read-only between parent and child, deferring any actual physical copy until a WRITE occurs. Since the child in this common fork-then-exec pattern typically never writes to most of its inherited pages before exec() wipes the address space clean and replaces it with the new program\'s image, those pages are never duplicated at all -- the potential copy is entirely avoided, not merely delayed, making fork()+exec() dramatically cheaper in practice than a naive eager-copy fork() would be.'
},
{
  id: 'os-virtual-memory-x5',
  q: 'Reference string: 2,3,2,1,5,2,4,5,3,2,5,2 with exactly 3 frames, using OPTIMAL (Belady\'s) replacement. When the 5th reference (value 5) causes a page fault with frames currently holding {2,3,1}, which page should optimal replacement evict?',
  options: ['Page 1, since among {2,3,1} it is never referenced again anywhere later in the string, while 2 is used again almost immediately and 3 is used again later but still within the string', 'Page 2, because it was the very first page loaded', 'Page 3, because it is numerically the largest of the three held pages', 'All three pages simultaneously, to make room for future requests'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Optimal replacement evicts the page that will NOT be used for the LONGEST time into the future, including pages never used again at all. Looking ahead in the remaining reference string (2,4,5,3,2,5,2) for each currently-held page: page 2 is used again almost immediately (right after this fault); page 3 is used again later, near the end of the string; page 1 is NEVER referenced again for the rest of the string. Since page 1 has no future reference whatsoever, it is unambiguously the correct victim under optimal replacement, which always prefers evicting a page with no future use over one merely needed later. This demonstrates why optimal replacement, though unimplementable in practice (it needs knowledge of the future), is the correct theoretical benchmark against which LRU, FIFO, and clock are all compared.'
},
{
  id: 'os-virtual-memory-x6',
  q: 'A process is thrashing badly under the current degree of multiprogramming. According to the working-set model, what is the recommended corrective action?',
  options: ['Reduce the degree of multiprogramming -- suspend one or more processes so the remaining processes can each be allocated enough frames to hold their working sets', 'Increase the degree of multiprogramming further, since more processes always improve CPU utilisation', 'Switch every process to FCFS CPU scheduling, since thrashing is a CPU-scheduling problem, not a memory problem', 'Disable the CPU scheduler entirely until thrashing stops on its own'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Thrashing occurs when the combined memory demand (sum of working-set sizes) of all currently running processes exceeds the total number of physical frames available, forcing constant page faulting as processes repeatedly steal frames from each other faster than they can make productive use of them. The working-set model\'s prescribed fix is to REDUCE the degree of multiprogramming: temporarily suspend (swap out) one or more processes entirely, freeing up their frames so the remaining processes each get enough frames to comfortably hold their working sets and stop faulting constantly. Counter-intuitively, INCREASING multiprogramming when memory is already oversubscribed makes thrashing worse, not better, since it only shrinks each process\'s frame allocation further -- CPU scheduling policy changes do not address the underlying memory-pressure cause of thrashing at all.'
},
{
  id: 'os-virtual-memory-x7',
  q: 'Which of the following correctly states why the CLOCK (second-chance) page replacement algorithm can be viewed as an approximation of LRU rather than an approximation of FIFO?',
  options: ['Clock gives a recently-referenced page a "second chance" (skipping it and clearing its reference bit) rather than evicting it purely because it is old, which specifically tries to avoid evicting recently-USED pages -- the defining goal of LRU, not merely oldest-loaded-first as in FIFO', 'Clock always evicts strictly in load order with no exceptions, exactly like FIFO', 'Clock requires a full timestamp per page just like exact LRU, with no reduction in overhead', 'Clock and FIFO are mathematically proven to always produce identical eviction sequences'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Plain FIFO evicts strictly based on LOAD order, regardless of whether a page has been used recently -- a heavily-used page loaded long ago is just as likely to be evicted as an unused one. Clock (second-chance) modifies this: it still circulates through pages in a roughly FIFO-like order, but before evicting a candidate page, it checks that page\'s REFERENCE bit; if the bit is set (meaning the page was accessed recently), the algorithm gives it a "second chance" by clearing the bit and moving on to check the next page instead of evicting it immediately. This behaviour specifically protects RECENTLY USED pages from eviction, which is precisely the goal LRU pursues (evict the page unused for the longest time) -- making clock a cheap approximation of LRU\'s intent, using only one bit per page rather than full timestamps, unlike plain FIFO which ignores usage recency entirely.'
},
{
  id: 'os-virtual-memory-x8',
  q: 'A page table entry (PTE) contains, among other fields, a valid/invalid bit, a dirty (modified) bit, and a reference bit. If a page\'s dirty bit is 0 at the moment it is chosen as an eviction victim, what does this allow the OS to skip?',
  options: ['The OS can skip writing the page\'s contents back to disk before reusing its frame, since a clean (unmodified) copy already exists on disk (or was never modified since being loaded), saving a costly disk write', 'The OS can skip updating the page table entry for the evicted page', 'The OS can skip checking whether the page is currently valid', 'The OS can skip loading the new page into the freed frame'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'The dirty (modified) bit is set by hardware automatically whenever a page is WRITTEN to after being loaded into memory. If a page\'s dirty bit is still 0 at eviction time, this means the in-memory copy is identical to whatever is already stored on disk (either the page was never modified since loading, or it was loaded fresh and read-only so far), so the OS can safely discard the in-memory copy WITHOUT writing it back to disk first -- saving a potentially expensive disk I/O operation. If the dirty bit were 1, the modified contents would need to be written back to disk before the frame could be safely reused for something else, or those changes would be permanently lost. The page table entry for the evicted page must still be updated (marked invalid) regardless of the dirty bit\'s value, so option B is not something that can be skipped.'
},
{
  id: 'os-virtual-memory-y1',
  q: 'Which of the following statements about demand paging and thrashing are TRUE? (Select ALL that apply)',
  options: ['A page fault occurs on every single memory reference made by a process under demand paging', 'Increasing the degree of multiprogramming beyond the point where physical memory can supply each process with enough frames for its working set can cause thrashing', 'The working-set model attempts to keep in memory exactly the set of pages a process has referenced within the most recent time window, to reduce page faults', 'Belady\'s anomaly refers to the phenomenon (occurring only for certain replacement algorithms, such as FIFO) where increasing the number of allocated frames can, counter-intuitively, increase the number of page faults'],
  answers: [1, 2, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is FALSE: a page fault occurs only when a referenced page is NOT currently resident in physical memory; the entire point of demand paging is that most references, after the working set has been loaded, are satisfied directly from memory without faulting at all. Option B is TRUE: as more processes compete for a fixed pool of frames, each process\'s allocation can shrink below what its working set actually needs, causing constant page faulting and swapping that leaves little CPU time for real progress -- this is thrashing. Option C is TRUE: the working-set model explicitly defines a process\'s working set as the pages referenced in the last Delta references (a sliding window), and tries to keep exactly that set resident to minimise fault frequency. Option D is TRUE: Belady\'s anomaly is the specific, counter-intuitive result that for some replacement algorithms (famously FIFO), adding MORE frames can INCREASE the total page fault count on certain reference strings -- it does not occur for stack algorithms like LRU or Optimal, which are proven to never exhibit it.'
},
{
  id: 'os-virtual-memory-y2',
  q: 'Which of the following statements about the Translation Lookaside Buffer (TLB) are TRUE? (Select ALL that apply)',
  options: ['A TLB miss always necessarily means that a page fault will also occur for that reference', 'The TLB acts as a small, fast hardware cache holding only a subset of the full page table\'s (virtual page number -> frame number) mappings, to speed up the common case of address translation', 'On a process context switch, TLB entries belonging to the previous process may need to be flushed (or distinguished via an address-space identifier, ASID) to prevent one process from incorrectly reusing another process\'s stale translations', 'The TLB hit ratio has no measurable effect on a system\'s effective memory access time'],
  answers: [1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is FALSE: a TLB miss only means the translation was not cached in the TLB, forcing a page-table walk in memory -- but the page itself may well still be present in physical memory, in which case the walk succeeds and no page fault occurs at all (a page fault only happens if the PAGE ITSELF is absent from memory, which is a separate, rarer event than a mere TLB miss). Option B is TRUE: exactly this is the TLB\'s purpose -- a small associative hardware cache of the most recently/frequently used page-table entries, avoiding a full memory-resident page-table walk on every reference. Option C is TRUE: without some mechanism, translations cached from one process\'s address space could be wrongly applied to another process after a context switch; systems either flush the TLB entirely on switch or tag entries with an ASID so multiple processes\' entries can coexist safely and only the correct process\'s entries are matched. Option D is FALSE: the TLB hit ratio directly and heavily determines effective memory access time, since a hit costs only a fast TLB lookup plus one memory access while a miss costs the TLB lookup plus a full (possibly multi-level) page-table walk plus the data access -- a lower hit ratio directly increases EMAT.'
},
{
  id: 'os-virtual-memory-y3',
  q: 'A system has TLB hit ratio 0.8, TLB access time 20 ns, and main memory access time 100 ns. The system uses a single-level page table, so a TLB miss requires 1 memory access for the page-table lookup followed by 1 more memory access for the actual data. What is the Effective Memory Access Time (EMAT), in ns? (Enter your numerical answer.)',
  options: [],
  answer: 140,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'On a TLB hit (probability 0.8): cost = TLB access + 1 data access = 20 + 100 = 120 ns. On a TLB miss (probability 0.2): cost = TLB access (failed) + 1 page-table access + 1 data access = 20 + 100 + 100 = 220 ns. EMAT = 0.8 x 120 + 0.2 x 220 = 96 + 44 = 140 ns. As with any TLB-based EMAT computation, the miss branch must always include the failed TLB lookup time itself (20 ns) in addition to the extra memory accesses needed to complete translation and then fetch the data.'
},
{
  id: 'os-virtual-memory-y4',
  q: 'For the page reference string 1,2,3,4,1,2,5,1,2,3,4,5 with exactly 3 frames (all initially empty), using FIFO page replacement, how many total page faults occur? (Enter your numerical answer.)',
  options: [],
  answer: 9,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Trace with a FIFO queue of capacity 3 (fault count in brackets): ref 1 -> fault, frames{1} [1]. ref 2 -> fault, frames{1,2} [2]. ref 3 -> fault, frames{1,2,3} [3]. ref 4 -> fault, evict oldest (1), frames{2,3,4} [4]. ref 1 -> fault, evict oldest (2), frames{3,4,1} [5]. ref 2 -> fault, evict oldest (3), frames{4,1,2} [6]. ref 5 -> fault, evict oldest (4), frames{1,2,5} [7]. ref 1 -> HIT (1 present). ref 2 -> HIT (2 present). ref 3 -> fault, evict oldest (1), frames{2,5,3} [8]. ref 4 -> fault, evict oldest (2), frames{5,3,4} [9]. ref 5 -> HIT (5 present). Total page faults = 9.'
},
{
  id: 'os-virtual-memory-y5',
  q: 'For the same page reference string 1,2,3,4,1,2,5,1,2,3,4,5 with exactly 3 frames (all initially empty), using LRU (Least Recently Used) page replacement, how many total page faults occur? (Enter your numerical answer.)',
  options: [],
  answer: 10,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Trace with recency tracked (most-recent-first; fault count in brackets): ref1->fault,{1},recency[1][1]. ref2->fault,{1,2},recency[2,1][2]. ref3->fault,{1,2,3},recency[3,2,1][3]. ref4->fault, evict LRU=1, {2,3,4}, recency[4,3,2][4]. ref1->fault, evict LRU=2, {3,4,1}, recency[1,4,3][5]. ref2->fault, evict LRU=3, {4,1,2}, recency[2,1,4][6]. ref5->fault, evict LRU=4, {1,2,5}, recency[5,2,1][7]. ref1->HIT, recency becomes[1,5,2]. ref2->HIT, recency becomes[2,1,5]. ref3->fault, evict LRU=5, {1,2,3}, recency[3,2,1][8]. ref4->fault, evict LRU=1, {2,3,4}, recency[4,3,2][9]. ref5->fault, evict LRU=2, {3,4,5}, recency[5,4,3][10]. Total LRU page faults = 10 -- notably worse than FIFO\'s 9 faults on this particular string, illustrating that LRU is not universally better than FIFO fault-for-fault on every individual reference string, even though it is never worse in Belady\'s-anomaly-proof stack-algorithm sense across increasing frame counts.'
},
{
  id: 'os-virtual-memory-y6',
  q: 'For the same page reference string 1,2,3,4,1,2,5,1,2,3,4,5 with exactly 3 frames (all initially empty), using OPTIMAL (Belady\'s) page replacement, how many total page faults occur? (Enter your numerical answer.)',
  options: [],
  answer: 7,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Trace, always evicting the resident page used furthest in the future (or never again) (fault count in brackets): ref1->fault,{1}[1]. ref2->fault,{1,2}[2]. ref3->fault,{1,2,3}[3]. ref4->fault: among {1,2,3}, next uses are 1@pos5, 2@pos6, 3@pos10 -- evict 3 (farthest), {1,2,4}[4]. ref1(pos5)->HIT. ref2(pos6)->HIT. ref5(pos7)->fault: among {1,2,4}, next uses are 1@pos8, 2@pos9, 4=none (no future use) -- evict 4, {1,2,5}[5]. ref1(pos8)->HIT. ref2(pos9)->HIT. ref3(pos10)->fault: among {1,2,5}, 1 and 2 have no future use at all while 5 is used again at pos12 -- evict 1 (no future use), {2,5,3}[6]. ref4(pos11)->fault: among {2,5,3}, 2 and 3 have no future use while 5 is used at pos12 -- evict 2, {5,3,4}[7]. ref5(pos12)->HIT (5 still resident). Total optimal page faults = 7, confirming Optimal is provably the best possible (fewest faults) among all three algorithms compared on this string: FIFO=9, LRU=10, Optimal=7.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-file-disk';}).questions.push(
{
  id: 'os-file-disk-x1',
  q: 'Which statement correctly compares classical seek-minimising disk scheduling algorithms (SCAN, C-SCAN, SSTF) on an HDD versus their relevance on an SSD?',
  options: ['These algorithms exist specifically to reduce mechanical seek time on a spinning-platter HDD; since SSDs have no moving read/write head and roughly comparable random and sequential access costs, such algorithms provide little to no benefit there', 'These algorithms are equally essential on SSDs because SSDs also have a mechanical head that must physically move', 'SSDs require SCAN and C-SCAN even more than HDDs because SSD seek times are much larger', 'C-SCAN cannot be implemented in software at all and requires special SSD hardware support'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'SCAN, C-SCAN, LOOK, and SSTF are all designed around the fact that a mechanical disk head takes real, significant time to physically move between cylinders, so servicing pending requests in a sensible spatial order meaningfully reduces total seek time. SSDs have no moving parts at all -- there is no read/write head to position -- so random access and sequential access latencies are far closer to each other than on an HDD, and reordering requests by "cylinder" position (which does not meaningfully exist for flash memory) provides little to no measurable benefit. SSD performance is instead governed by entirely different concerns such as wear levelling and write amplification, which have no counterpart in classical mechanical-disk scheduling theory.'
},
{
  id: 'os-file-disk-x2',
  q: 'Which of the following is the primary benefit a JOURNALING file system provides over a traditional non-journaling file system after an unexpected crash or power loss?',
  options: ['Recovery only needs to replay or discard the log of recently intended changes, instead of scanning the ENTIRE disk for inconsistencies, making crash recovery vastly faster', 'Journaling makes it physically impossible for any disk write to ever fail', 'Journaling removes the need to ever flush data to persistent storage', 'Journaling doubles the total usable storage capacity of the disk'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'A journaling file system records intended metadata changes (and sometimes data changes) into a dedicated log BEFORE committing them to their final on-disk locations. If a crash interrupts an in-progress update, the OS does not need to perform a slow, exhaustive scan of the ENTIRE file system (as older non-journaling systems required via utilities like fsck) to detect and repair inconsistencies. Instead, on reboot it simply consults the journal: completed transactions are replayed to guarantee they took full effect, and incomplete ones are safely discarded, restoring a consistent state almost instantly. This comes at the cost of a modest write-performance overhead (every change effectively gets written twice), but the dramatic improvement in recovery time and reliability is why virtually all modern general-purpose file systems use some form of journaling.'
},
{
  id: 'os-file-disk-x3',
  q: 'An inode uses 10 direct block pointers, 1 single indirect pointer, and 1 double indirect pointer (no triple indirect). Block size is 1 KB, and each block pointer is 4 bytes. What is the maximum file size (in blocks) this inode structure can address?',
  options: ['65,802 blocks', '10 blocks', '256 blocks', '65,536 blocks'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Pointers per block p = block size / pointer size = 1024/4 = 256. Direct blocks contribute 10 blocks directly. The single indirect block contributes p = 256 data blocks (256 pointers, each pointing straight to one data block). The double indirect block contributes p^2 = 256*256 = 65,536 data blocks (256 pointers to single-indirect blocks, each of which holds 256 pointers to data blocks). Total maximum file size = 10 + 256 + 65,536 = 65,802 blocks. This demonstrates how quickly capacity grows with each additional level of indirection -- moving from single to double indirection multiplies the indirect contribution by a full factor of p (256x in this case).'
},
{
  id: 'os-file-disk-x4',
  q: 'A disk has cylinders 0-99, and the head is currently at cylinder 40, having just serviced a request there while moving in the direction of DECREASING cylinder numbers. Pending requests are at cylinders 10, 25, 60, 70, 90. Using SCAN (continuing toward 0 first, then reversing), what is the total head movement?',
  options: ['130', '80', '190', '99'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'SCAN continues in its current direction (toward 0) first, servicing every request along the way, before reversing. From 40 moving down: 40->25->10->0 (SCAN travels all the way to the disk boundary at 0, even though the last actual request in this direction is 10) = a movement of 40-0=40 cylinders. Then it reverses and sweeps upward, servicing 60, 70, 90 in increasing order: 0->60->70->90 = a movement of 90-0=90 cylinders. Total head movement = 40 + 90 = 130 cylinders. Note that the trip from 10 down to the boundary at 0, and later from 0 back up past 10, 25 again on the reversal, is pure overhead that LOOK would have avoided by turning around immediately after servicing the last request (10) instead of continuing to the physical boundary.'
},
{
  id: 'os-file-disk-x5',
  q: 'In indexed file allocation, what is the primary advantage over linked allocation for supporting DIRECT (random) access to a specific block of a file?',
  options: ['The index block holds pointers to every data block, so accessing block k is a single lookup into entry k of the index, without following any chain of intermediate blocks', 'Indexed allocation requires every file to be stored contiguously, guaranteeing fast access automatically', 'Indexed allocation eliminates the need for a directory entry for the file', 'Indexed allocation is only usable for files smaller than one disk block'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'In linked allocation, reaching the k-th data block of a file requires starting at the first block and following "next block" pointers one at a time through k blocks, making random access slow and proportional to k. Indexed allocation instead collects pointers to ALL of a file\'s data blocks into one (or more, for very large files) dedicated index block; to access block k, the OS simply reads entry k directly from the index block -- a single lookup, independent of how far into the file that block lies. This gives indexed allocation genuinely fast, direct/random access comparable to contiguous allocation, while still avoiding the requirement that a file\'s data occupy physically contiguous disk space, unlike contiguous allocation.'
},
{
  id: 'os-file-disk-x6',
  q: 'A request queue for C-LOOK scheduling (disk cylinders 0-199, head at 100, moving toward increasing cylinder numbers) contains requests at 30, 50, 120, 160, 180. What is the correct servicing order under C-LOOK?',
  options: ['120, 160, 180, 30, 50', '120, 160, 180, 199, 0, 30, 50', '30, 50, 120, 160, 180', '180, 160, 120, 50, 30'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'C-LOOK sweeps in the current direction (increasing, from 100) servicing every pending request up to the LAST one in that direction -- here 120, then 160, then 180 -- without needlessly continuing all the way to the physical boundary at 199, since no request lies there. Having serviced the last request in the increasing direction (180), C-LOOK then jumps DIRECTLY to the position of the FIRST pending request in the other direction (the smallest remaining cylinder, 30) without servicing anything during that jump, and resumes sweeping in the SAME original (increasing) direction from there, servicing 30 then 50. This avoids both the wasted trip to the disk boundary (unlike C-SCAN) and the wasted return sweep back through the already-serviced region (unlike LOOK), giving the order: 120, 160, 180, 30, 50.'
},
{
  id: 'os-file-disk-x7',
  q: 'Which of the following is a genuine drawback of FAT (File Allocation Table) as compared to fully independent linked allocation with pointers stored inside each individual data block?',
  options: ['If the FAT itself becomes corrupted or is lost, the OS can lose track of every file\'s block chain system-wide, since all "next block" information is concentrated in one table rather than distributed across the files\' own blocks', 'FAT cannot support files larger than one block under any circumstances', 'FAT always causes worse external fragmentation than contiguous allocation', 'FAT requires every file to be a fixed, identical size'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'FAT centralises all the "next block" chaining information for every file into one single table stored in a reserved area of the disk, rather than scattering "next pointer" fields inside each individual data block as plain linked allocation does. This centralisation actually helps random access somewhat (the whole table, or a cached portion, can be read without touching data blocks) and improves resilience against a single bad pointer breaking one file\'s chain irrecoverably. However, it also concentrates risk: if the FAT itself is corrupted or becomes unreadable, the block-chain information for POTENTIALLY EVERY FILE on the volume can be lost at once, which is why systems using FAT typically keep a backup/duplicate copy of the table. FAT is not limited to single-block files, and its fragmentation behaviour is a property of the underlying free-block management, not something intrinsically worse than contiguous allocation.'
},
{
  id: 'os-file-disk-x8',
  q: 'For solid-state drives, "wear levelling" refers to which of the following concerns?',
  options: ['Spreading write and erase operations evenly across all flash memory cells, since each cell can endure only a limited number of write/erase cycles before it wears out and becomes unreliable', 'Physically balancing the drive\'s weight to prevent mechanical vibration', 'Levelling the read speed and write speed of the drive to be exactly equal', 'Reducing the physical size of the drive\'s casing to fit more storage'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'Flash memory cells used in SSDs have a finite endurance: each cell can only tolerate a limited number of write/erase cycles before it starts to degrade and eventually fails to reliably retain data. If writes were always directed to the same physical cells (e.g., always overwriting the "same" logical block in place), those specific cells would wear out far faster than the rest of the drive, leading to premature failure of just that region even while most of the drive remains lightly used. Wear levelling is the SSD firmware\'s strategy of spreading write and erase operations evenly across ALL available cells over time (often by remapping logical block addresses to different physical locations on each write), maximising the drive\'s overall usable lifespan. This concern has no equivalent in classical HDD theory, since magnetic platters do not wear out from repeated writes in the same way.'
},
{
  id: 'os-file-disk-y1',
  q: 'Which of the following statements about disk-scheduling algorithms are TRUE? (Select ALL that apply)',
  options: ['SSTF (Shortest Seek Time First) can cause starvation of requests that are physically far from the current head position, if a steady stream of closer requests keeps arriving', 'The SCAN algorithm services pending requests in one direction until it reaches the end of the disk, then reverses direction and services requests on the way back', 'C-SCAN tends to give more uniform waiting times across all cylinders than plain SCAN, because it always sweeps in one direction and treats the disk as a circular list, jumping back to the start without servicing on the return', 'FCFS (First-Come-First-Served) disk scheduling always produces the minimum possible total head movement for any given request sequence'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: SSTF always jumps to whichever pending request is currently closest to the head, so a request sitting far away can be repeatedly passed over indefinitely as long as closer requests keep arriving nearer the head -- this is SSTF\'s well-known starvation risk, favouring average seek time over fairness. Option B is TRUE: this is the definition of SCAN (the "elevator algorithm") -- it sweeps fully across the disk in one direction, servicing every request along the way, then reverses at the boundary and sweeps back. Option C is TRUE: because C-SCAN always services requests only while moving in a single fixed direction and then returns to the beginning without servicing on that return trip, cylinders near either end of the disk experience much more consistent gaps between services than under SCAN, where cylinders near the reversal points get serviced twice in quick succession. Option D is FALSE: FCFS services requests strictly in arrival order regardless of their physical position, which can produce wildly erratic head movement (repeatedly darting back and forth across the disk) -- it provides no seek-time optimisation at all and is essentially never the minimum-movement schedule except by coincidence.'
},
{
  id: 'os-file-disk-y2',
  q: 'Which of the following statements about file allocation methods are TRUE? (Select ALL that apply)',
  options: ['Contiguous allocation supports fast sequential AND direct (random) access, but suffers from external fragmentation as files are created and deleted over time', 'Linked allocation eliminates external fragmentation entirely, but does not support efficient direct (random) access to an arbitrary block', 'Indexed allocation requires the overhead of maintaining a separate index block (holding pointers to all of a file\'s data blocks) for every file', 'A FAT-based file system stores each file\'s "next block" pointer physically inside that file\'s own data blocks, exactly the same way plain linked allocation does'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: because a contiguously-allocated file occupies one unbroken run of blocks, both sequential access (just keep reading the next physical block) and direct access (block k is simply start-block + k) are fast -- but as files of varying sizes are created and removed, the free space fragments into scattered holes, none of which may be large enough for a new file (external fragmentation), even though total free space may be ample. Option B is TRUE: linked allocation\'s blocks can be scattered absolutely anywhere, so there is no notion of needing a large contiguous run and hence no external fragmentation -- but reaching block k requires following k "next" pointers one at a time starting from the first block, making direct access slow and proportional to k. Option C is TRUE: indexed allocation\'s entire benefit (fast direct access without contiguity) comes precisely from maintaining a dedicated index block per file that lists pointers to every one of that file\'s data blocks, which is itself extra storage overhead not needed by contiguous or plain linked allocation. Option D is FALSE: this is the key structural difference between FAT and plain linked allocation -- FAT centralises ALL files\' "next block" chaining information into one single system-wide table (the File Allocation Table) kept separately from the data blocks, rather than embedding a pointer inside each individual data block as linked allocation does.'
},
{
  id: 'os-file-disk-y3',
  q: 'A disk has cylinders numbered 0-199. The head is currently at cylinder 50. Pending requests are at cylinders 10, 70, 90, 130, 20. Using SSTF (Shortest Seek Time First) scheduling, what is the total head movement (in cylinders) needed to service all requests? (Enter your numerical answer.)',
  options: [],
  answer: 200,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'SSTF always services whichever pending request is currently nearest to the head. From 50: distances are 10(40), 70(20), 90(40), 130(80), 20(30) -- nearest is 70, move there (movement so far = 20). From 70, remaining {10,90,130,20}: distances 10(60),90(20),130(60),20(50) -- nearest is 90, move there (movement = 20+20 = 40). From 90, remaining {10,130,20}: distances 10(80),130(40),20(70) -- nearest is 130, move there (movement = 40+40 = 80). From 130, remaining {10,20}: distances 10(120),20(110) -- nearest is 20, move there (movement = 80+110 = 190). From 20, remaining {10}: distance 10(10), move there (movement = 190+10 = 200). Total head movement = 200 cylinders.'
},
{
  id: 'os-file-disk-y4',
  q: 'Using the same setup (cylinders 0-199, head at 50, pending requests at 10, 70, 90, 130, 20), but now using the SCAN algorithm with the head initially moving toward INCREASING cylinder numbers (continuing to the disk boundary at cylinder 199 before reversing), what is the total head movement (in cylinders)? (Enter your numerical answer.)',
  options: [],
  answer: 338,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'SCAN continues in its current direction (increasing) all the way to the disk\'s boundary before reversing, servicing every pending request encountered along the way. Moving up from 50, it services 70, 90, 130 in order, then continues to the physical end of the disk at cylinder 199 (even though no request lies exactly there): movement for this leg = 199 - 50 = 149. It then reverses direction and sweeps all the way down to service the remaining requests 20 and then 10: movement for this leg = 199 - 10 = 189. Total head movement = 149 + 189 = 338 cylinders. (Note this is substantially more than SSTF\'s 200 for the same request set, since SCAN\'s mandatory trip to the far boundary at 199 -- where no request actually waits -- is pure overhead that a seek-time-greedy algorithm like SSTF or LOOK would avoid.)'
},
{
  id: 'os-file-disk-y5',
  q: 'A file system uses a fixed block size of 512 bytes. A file has a total size of 5000 bytes. Assuming whole blocks must be allocated (no sub-block allocation), how many disk blocks are allocated to store this file? (Enter your numerical answer.)',
  options: [],
  answer: 10,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'The number of blocks needed is ceil(file size / block size) = ceil(5000 / 512) = ceil(9.765625) = 10 blocks. Since a file system can only allocate whole blocks (it cannot allocate a fractional block), any file whose size is not an exact multiple of the block size still consumes one full extra block to hold the remainder -- here 10 blocks total (10 x 512 = 5120 bytes of space reserved), with the last block holding only 5000 - 9x512 = 392 bytes of actual file data and the remaining 120 bytes of that final block wasted as internal fragmentation.'
},
{
  id: 'os-file-disk-y6',
  q: 'An inode has 8 direct block pointers and 1 single indirect pointer (no double or triple indirect pointer). Block size is 2 KB, and each block pointer occupies 4 bytes. What is the maximum file size (in number of blocks) that this inode structure can address? (Enter your numerical answer.)',
  options: [],
  answer: 520,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Pointers per block = block size / pointer size = 2048 / 4 = 512. The 8 direct pointers directly contribute 8 data blocks. The single indirect pointer points to one block that itself holds 512 pointers, each pointing to one data block, contributing 512 data blocks. Total maximum file size = direct blocks + single-indirect blocks = 8 + 512 = 520 blocks. Since there is no double or triple indirect pointer in this inode, 520 blocks is the absolute maximum file size addressable, regardless of how much larger the underlying disk itself might be.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-processes';}).questions.push(
{
  id: 'os-processes-y1',
  q: 'Which of the following statements about the fork() system call are TRUE? (Select ALL that apply)',
  options: ['fork() returns 0 in the child process and the child\'s PID (a positive value) in the parent process', 'The child process begins execution from the statement immediately following the fork() call, not from the beginning of main()', 'fork() guarantees that the parent process always finishes executing before the child process starts', 'A negative return value from fork() indicates that process creation failed'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: fork() returns twice -- 0 in the newly created child, and the child\'s actual PID (a positive integer) in the parent -- this is exactly how calling code distinguishes which process it is running in. Option B is TRUE: the child is a near-identical duplicate of the parent\'s address space at the moment of the call, so it resumes execution at the instruction right after fork(), never restarting main() from scratch. Option C is FALSE: fork() makes no guarantee whatsoever about execution order between parent and child afterward -- the OS scheduler may run either one first, interleave them, or run them on separate cores simultaneously; code that assumes a fixed order without explicit synchronization (e.g. wait()) is buggy. Option D is TRUE: a negative return value (typically -1) signals that fork() failed (e.g., due to resource limits), and in that case no child process was created at all.'
},
{
  id: 'os-processes-y2',
  q: 'A process is currently multithreaded using the one-to-one threading model. Which of the following statements are TRUE? (Select ALL that apply)',
  options: ['Each user thread is mapped to a distinct kernel thread, so the kernel scheduler is directly aware of every thread', 'True parallel execution of the process\'s threads on multiple CPU cores is possible', 'If one thread makes a blocking system call, every other thread of the same process is also blocked', 'Creating a new thread under this model requires a system call, making it more expensive than creating a user-level-only thread'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: in the one-to-one model, every user thread has its own corresponding kernel thread, so the kernel scheduler sees and manages each one individually, unlike many-to-one. Option B is TRUE: because each thread is independently visible to the kernel, the OS can schedule several of a process\'s threads simultaneously on separate cores, giving genuine parallelism. Option C is FALSE: this is precisely the many-to-one problem -- under one-to-one, if one thread blocks on a system call, only that thread\'s kernel thread blocks; the other kernel threads (and hence other user threads) remain independently schedulable and keep running. Option D is TRUE: since each thread needs kernel-side bookkeeping (its own kernel stack and scheduler entry), creating it requires a system call and kernel involvement, unlike a purely user-space thread under many-to-one, making one-to-one thread creation costlier.'
},
{
  id: 'os-processes-y3',
  q: 'Consider the code: fork(); fork(); fork(); (three sequential, unconditional fork() calls, none inside any if/loop). How many TOTAL processes exist after all three calls complete, including the original process? (Enter your numerical answer.)',
  options: [],
  answer: 8,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Each of the three fork() calls is unconditional and sequential, meaning every process alive at that point in the code (the original plus all children created so far) executes that same line and forks again. This is the standard doubling rule: n sequential unconditional fork() calls yield 2^n total processes. Tracing step by step: start with 1 process (P0). After fork() #1: P0 forks C1, giving 2 processes. After fork() #2: both P0 and C1 independently fork, giving 4 processes. After fork() #3: all 4 processes (P0, C1, and the two children created in step 2) independently fork again, giving 8 processes. So total = 2^3 = 8.'
},
{
  id: 'os-processes-y4',
  q: 'Consider the code: if(fork()==0){ fork(); } fork(); How many TOTAL processes exist after this code finishes executing, including the original process? (Enter your numerical answer.)',
  options: [],
  answer: 6,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Trace it process by process. Start: P0 (the original process). Line 1, fork(): P0 forks C1. P0 sees a nonzero return (C1\'s PID), so the if-condition is false for P0 and it skips the inner fork(). C1 sees 0 returned, so the if-condition is TRUE for C1, and C1 executes the inner fork(), creating C2. After the if-block: the surviving processes are {P0, C1, C2} -- three processes. All three of these then reach the final unconditional fork() (outside the if), and since it is unconditional, each of the three independently forks one more child: P0 forks C3, C1 forks C4, C2 forks C5. Final total = original 3 processes (P0, C1, C2) + 3 new children (C3, C4, C5) = 6 processes.'
},
{
  id: 'os-processes-y5',
  q: 'A system uses the many-to-many threading model to map 6 user-level threads belonging to one process onto kernel threads, with the constraint that at most 4 kernel threads may be active for this process at any time. What is the MAXIMUM number of this process\'s threads that could be running in true parallel on separate CPU cores at a single instant (assuming at least 4 cores are available)? (Enter your numerical answer.)',
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'In the many-to-many model, m user threads are multiplexed onto n <= m kernel threads, and the kernel can only ever schedule as many threads of a process onto distinct cores simultaneously as there are DISTINCT kernel threads backing them -- the kernel has no visibility into user threads that share a single kernel thread and cannot run two user threads sharing one kernel thread on two different cores at once. Here there are 6 user threads but only 4 kernel threads available for this process, so no matter how many cores are physically free, at most 4 of the process\'s user threads can be genuinely running in parallel at any one instant (one per available kernel thread); the remaining 2 user threads must be waiting their turn to be multiplexed onto a kernel thread.'
},
{
  id: 'os-processes-y6',
  q: 'A parent process executes: pid_t p1 = fork(); if (p1 == 0) { fork(); exit(0); } fork(); wait(NULL); How many child processes does the ORIGINAL parent process directly wait for using this single wait(NULL) call (i.e., how many of its own direct children does the parent create in total)? (Enter your numerical answer.)',
  options: [],
  answer: 2,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Count only the DIRECT children of the original parent process P0, not grandchildren. Line 1, fork() (p1 = fork()): P0 creates its first direct child, call it C1 (p1==0 inside C1, p1==C1\'s PID inside P0). Inside the if-block, only C1 (where p1==0) executes: C1 calls fork() again, creating C2 -- but C2 is a child OF C1, not a direct child of P0, so it does not count toward P0\'s direct-child count. C1 then calls exit(0) and terminates, never reaching the line below the if-block. Meanwhile P0 (where p1 != 0) skips the if-block entirely and proceeds to the final unconditional fork(), creating its SECOND direct child, C3. So P0 has exactly 2 direct children: C1 and C3. A single wait(NULL) call only reaps one terminated child at a time, but the question asks how many direct children exist in total (which determines how many wait() calls would eventually be needed) -- that count is 2.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-scheduling';}).questions.push(
{
  id: 'os-scheduling-y1',
  q: 'Which of the following statements about CPU scheduling algorithms are TRUE? (Select ALL that apply)',
  options: ['Non-preemptive SJF minimizes the average waiting time among all non-preemptive scheduling algorithms, provided all processes are available at time 0', 'Round Robin scheduling with a time quantum larger than every process\'s burst time degenerates into essentially FCFS behavior', 'Priority scheduling is immune to starvation regardless of whether aging is used', 'In preemptive priority scheduling, a running process can be preempted the instant a higher-priority process arrives'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: it is a proven result that, given a fixed set of processes all available at time 0, non-preemptive SJF produces the minimum possible average waiting time among non-preemptive algorithms, since running the shortest job first minimizes the cumulative time other jobs spend waiting behind long jobs. Option B is TRUE: if the quantum exceeds every process\'s total burst time, every process finishes in its very first (and only) allotted slice before the quantum expires, so processes run to completion in arrival/queue order exactly like FCFS -- no process is ever preempted mid-burst. Option C is FALSE: plain priority scheduling (without aging) can starve low-priority processes indefinitely if a continuous stream of higher-priority processes keeps arriving; aging is specifically the fix introduced to prevent this by gradually raising a waiting process\'s priority over time. Option D is TRUE: this is the defining feature of PREEMPTIVE priority scheduling -- unlike the non-preemptive variant, the scheduler immediately preempts the currently running process the moment a higher-priority process enters the ready queue.'
},
{
  id: 'os-scheduling-y2',
  q: 'Which of the following statements about the time quantum in Round Robin scheduling are TRUE? (Select ALL that apply)',
  options: ['Decreasing the time quantum always decreases the total number of context switches', 'If the time quantum is made very small, context-switching overhead can become significant relative to useful CPU execution time', 'The choice of time quantum affects only turnaround time and never the number of context switches', 'A time quantum that is too large can make Round Robin behave more like FCFS, increasing the waiting time experienced by short processes stuck behind long ones'],
  answers: [1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is FALSE: it has the relationship backwards -- a SMALLER time quantum means each process gets preempted after less work, so the same total burst work requires MORE round-trips through the ready queue, INCREASING the number of context switches, not decreasing it. Option B is TRUE: this is the classic quantum-too-small pitfall -- if the quantum approaches the fixed context-switch cost, the CPU spends a large fraction of its time performing switches rather than executing process instructions, hurting overall throughput even though responsiveness improves. Option C is FALSE: the quantum size directly determines how often processes are preempted and re-queued, so it clearly affects the number of context switches as well as turnaround time -- these are not independent. Option D is TRUE: as the quantum grows large enough that most processes finish within one slice, Round Robin\'s behavior converges toward FCFS, meaning a short process queued behind a long one must wait almost the long process\'s entire burst, worsening its individual waiting time.'
},
{
  id: 'os-scheduling-y3',
  q: 'Four processes arrive as follows and are scheduled using FCFS (First-Come-First-Served): P1 (arrival 0, burst 5), P2 (arrival 1, burst 3), P3 (arrival 2, burst 8), P4 (arrival 3, burst 6). What is the average waiting time across all four processes? (Enter your numerical answer.)',
  options: [],
  answer: 5.75,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'FCFS services processes strictly in arrival order, back to back, with no preemption. Gantt chart: P1 runs 0 to 5 (waiting = start - arrival = 0 - 0 = 0). P2 must wait until P1 finishes at 5 even though it arrived at 1, running 5 to 8 (waiting = 5 - 1 = 4). P3 arrived at 2 but waits until 8, running 8 to 16 (waiting = 8 - 2 = 6). P4 arrived at 3 but waits until 16, running 16 to 22 (waiting = 16 - 3 = 13). Sum of waiting times = 0 + 4 + 6 + 13 = 23. Average waiting time = 23 / 4 = 5.75. (Tolerance allowed for this decimal average.)'
},
{
  id: 'os-scheduling-y4',
  q: 'Four processes all arrive at time 0 with burst times P1=6, P2=8, P3=7, P4=3, and are scheduled using non-preemptive SJF (Shortest Job First). What is the average waiting time across all four processes? (Enter your numerical answer.)',
  options: [],
  answer: 7,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Since all processes arrive simultaneously at time 0, non-preemptive SJF simply runs them in increasing order of burst time: P4 (3), P1 (6), P3 (7), P2 (8). Gantt chart: P4 runs 0 to 3 (waiting = 0). P1 runs 3 to 9 (waiting = 3, the time it sat idle before P4 finished). P3 runs 9 to 16 (waiting = 9). P2 runs 16 to 24 (waiting = 16). Sum of waiting times = 0 + 3 + 9 + 16 = 28. Average waiting time = 28 / 4 = 7.'
},
{
  id: 'os-scheduling-y5',
  q: 'Four processes P1, P2, P3, P4 all arrive at time 0 with burst times 5, 4, 8, 2 respectively, and are scheduled using Round Robin with time quantum = 4 (ready queue order: P1, P2, P3, P4, and newly arriving/re-queued processes are always appended to the back of the queue). What is the average waiting time across all four processes? (Enter your numerical answer.)',
  options: [],
  answer: 9.25,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Trace the queue with remaining bursts P1=5, P2=4, P3=8, P4=2. t=0: run P1 for its full quantum of 4 (remaining becomes 1), queue is now [P2, P3, P4, P1(1)], clock at t=4. t=4: run P2 for its remaining 4 units, P2 finishes exactly at t=8 (completion=8), queue [P3, P4, P1(1)]. t=8: run P3 for a full quantum of 4 (remaining becomes 4), queue [P4, P1(1), P3(4)], clock at t=12. t=12: run P4 for its remaining 2 units (less than the quantum), P4 finishes at t=14 (completion=14), queue [P1(1), P3(4)]. t=14: run P1 for its remaining 1 unit, P1 finishes at t=15 (completion=15), queue [P3(4)]. t=15: run P3 for its remaining 4 units, P3 finishes at t=19 (completion=19). Completion times: P1=15, P2=8, P3=19, P4=14. Since all arrived at 0, turnaround = completion time for each: P1=15, P2=8, P3=19, P4=14. Waiting = turnaround - burst: P1 = 15-5=10, P2 = 8-4=4, P3 = 19-8=11, P4 = 14-2=12. Sum = 10+4+11+12 = 37. Average waiting time = 37/4 = 9.25.'
},
{
  id: 'os-scheduling-y6',
  q: 'Four processes arrive as follows and are scheduled using preemptive SJF (SRTF -- Shortest Remaining Time First): P1 (arrival 0, burst 8), P2 (arrival 1, burst 4), P3 (arrival 2, burst 9), P4 (arrival 3, burst 5). What is the average waiting time across all four processes? (Enter your numerical answer.)',
  options: [],
  answer: 6.5,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Trace remaining times at each arrival/decision point. t=0: only P1 (remaining 8) present, it runs. t=1: P2 arrives (burst 4); since P2\'s 4 < P1\'s remaining 7, preempt P1 and run P2. t=2: P3 arrives (burst 9); P2\'s remaining is 4-1=3, which is less than 9, so P2 continues. t=3: P4 arrives (burst 5); P2\'s remaining is 4-2=2, still less than 5, so P2 continues and finishes its remaining 2 units, completing at t=5. At t=5, remaining times are P1=7, P3=9, P4=5; shortest is P4, so run P4; no new arrivals occur, and P4 runs to completion at t=10 (since 7 and 9 both exceed P4\'s burst throughout). At t=10, remaining times are P1=7, P3=9; shortest is P1, runs to completion at t=17. Finally P3 runs alone from t=17 to t=26. Completion times: P1=17, P2=5, P3=26, P4=10. Turnaround = completion - arrival: P1=17-0=17, P2=5-1=4, P3=26-2=24, P4=10-3=7. Waiting = turnaround - burst: P1=17-8=9, P2=4-4=0, P3=24-9=15, P4=7-5=2. Sum = 9+0+15+2 = 26. Average waiting time = 26/4 = 6.5. This is a well-known GATE-style SRTF example.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-sync';}).questions.push(
{
  id: 'os-sync-y1',
  q: 'Which of the following statements about semaphores are TRUE? (Select ALL that apply)',
  options: ['A binary semaphore can take only the values 0 and 1', 'A counting semaphore\'s value, when negative, indicates the number of processes currently blocked waiting on it (under the convention where wait() always decrements the value)', 'The wait() and signal() operations do not need to be atomic for a semaphore to correctly provide mutual exclusion', 'Spinlocks (busy-waiting) can be preferable to blocking on multiprocessor systems when the expected wait is shorter than the cost of a context switch'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: a binary semaphore is restricted by definition to exactly two values, 0 and 1, functioning like a simple lock, unlike a counting semaphore which can range over any integer. Option B is TRUE: under the common convention where wait() unconditionally decrements the semaphore\'s value (even below zero) and signal() unconditionally increments it, a negative value\'s magnitude directly equals the number of processes currently blocked waiting for a signal(). Option C is FALSE: if wait() and signal() were not executed atomically, two processes could interleave their read-modify-write of the semaphore value and both could see it as available, completely breaking the mutual exclusion guarantee -- atomicity of these operations (typically enforced via hardware instructions or disabling interrupts) is essential and non-negotiable. Option D is TRUE: on a multiprocessor, if a lock is expected to be held only briefly, spinning (busy-waiting) on another core can be cheaper than the overhead of a full context switch to put the waiting process to sleep and later resume it -- this is exactly why spinlocks are used inside real operating system kernels for short critical sections.'
},
{
  id: 'os-sync-y2',
  q: 'Which of the following statements about monitors are TRUE? (Select ALL that apply)',
  options: ['A monitor automatically guarantees mutual exclusion among all its procedures, without the programmer explicitly coding separate wait/signal calls for that exclusion', 'A condition variable holds an integer value on which arithmetic operations like increment and decrement can be performed, just like a counting semaphore', 'Calling signal() on a condition variable with no process currently waiting on it has no effect, unlike signal() on a semaphore, which always increments its counter regardless', 'Monitors can be implemented using semaphores, but semaphores can never be implemented using monitors'],
  answers: [0, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: a monitor is a high-level synchronization construct in which the compiler/runtime automatically ensures that only one process at a time can be executing any of the monitor\'s procedures -- the programmer never has to write explicit wait(mutex)/signal(mutex) pairs for this basic mutual exclusion, unlike raw semaphore-based code. Option B is FALSE: a condition variable has no integer value of its own and supports only wait() and signal() (sometimes named differently) to block on, and wake, a condition -- it cannot be incremented, decremented, or tested for a numeric value the way a counting semaphore can. Option C is TRUE: a condition-variable signal() that finds no process waiting is simply lost/has no effect, whereas a semaphore\'s signal() unconditionally increments its counter even if no process is currently waiting, so a later wait() can consume that increment immediately -- this is a key semantic difference between the two mechanisms. Option D is FALSE in its second half: both directions are possible -- monitors can be built from semaphores, and conversely a semaphore\'s wait/signal behavior can also be implemented using a monitor with an internal counter and a condition variable, a standard textbook construction.'
},
{
  id: 'os-sync-y3',
  q: 'A counting semaphore S is initialized to 5. During a program\'s execution, wait(S) is called 9 times in total and signal(S) is called 4 times in total (in some interleaved order). What is the final value of S? (Enter your numerical answer.)',
  options: [],
  answer: 0,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Regardless of the actual interleaving order of the calls, the final value of a counting semaphore depends only on the total counts of wait() and signal() calls, since each wait() decrements the value by exactly 1 and each signal() increments it by exactly 1: final value = initial value - (number of wait calls) + (number of signal calls) = 5 - 9 + 4 = 0.'
},
{
  id: 'os-sync-y4',
  q: 'A counting semaphore S used for producer-consumer signaling is initialized to 0. The producer calls signal(S) a total of 6 times, and the consumer calls wait(S) a total of 4 times. What is the final value of S? (Enter your numerical answer.)',
  options: [],
  answer: 2,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Final value = initial value + (number of signal calls) - (number of wait calls) = 0 + 6 - 4 = 2. This positive value of 2 correctly represents that the producer has made 2 more "items available" signals than the consumer has yet consumed, so 2 units remain available for the consumer to immediately wait() on without blocking.'
},
{
  id: 'os-sync-y5',
  q: 'A counting semaphore mutex is initialized to 2, allowing up to 2 processes into a critical section concurrently. Exactly 5 processes call wait(mutex) at essentially the same time, before any of them has called signal(mutex). How many of these 5 processes end up BLOCKED, waiting for the semaphore? (Enter your numerical answer.)',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'The semaphore starts at 2, meaning exactly 2 of the 5 requesting processes can successfully decrement it to 0 and proceed into the critical section without blocking (the value goes 2 -> 1 -> 0 for these first two successful wait() calls). Every subsequent wait() call by the remaining processes finds the semaphore already at or below 0 and must block. Number blocked = total requesting processes - initial semaphore value = 5 - 2 = 3.'
},
{
  id: 'os-sync-y6',
  q: 'What is the minimum initial value that a counting semaphore mutex must be given so that AT MOST 4 processes can be inside the critical section it guards at any single instant, assuming no process calls signal(mutex) before entering? (Enter your numerical answer.)',
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'A counting semaphore used to bound concurrent access allows exactly as many processes to successfully complete wait() (decrementing without blocking) as its initial value, before the value reaches 0 and all further wait() calls block. To allow at most 4 processes into the critical section simultaneously (and no more), the semaphore must be initialized to exactly 4 -- any smaller initial value would restrict access to fewer than 4 processes, and any larger value would incorrectly permit more than 4 processes in at once.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-deadlock';}).questions.push(
{
  id: 'os-deadlock-y1',
  q: 'Which of the following correctly describe one of the four necessary (Coffman) conditions for deadlock to occur? (Select ALL that apply)',
  options: ['Mutual exclusion: at least one resource involved must be held in a non-shareable mode', 'Hold and wait: a process must be holding at least one resource while simultaneously waiting to acquire additional resources currently held by other processes', 'No preemption: a resource cannot be forcibly taken away from the process holding it; it can only be released voluntarily by that process', 'Circular wait: at least two processes must each be requesting a resource held by the other, without necessarily forming a complete closed chain'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: mutual exclusion requires that at least one of the contested resources be non-shareable, so that only one process can hold it at a time -- if every resource involved were freely shareable, no process would ever need to wait for it. Option B is TRUE: hold and wait means a process already holds one or more resources while it blocks waiting to acquire further resources, which is precisely the situation that lets resources accumulate in the hands of blocked processes. Option C is TRUE: no preemption means the OS cannot yank a resource away from its current holder to give it to another process; the holder must release it voluntarily after finishing, which is exactly what allows a resource to remain locked up indefinitely by a stuck process. Option D is FALSE as stated: genuine circular wait requires a full CLOSED chain of two or more processes, P1 waiting on a resource held by P2, P2 waiting on a resource held by P3, ..., and finally some process waiting on a resource held by P1, closing the loop -- merely having two processes each want something the other holds without the chain actually closing is not sufficient; a proper cycle must exist.'
},
{
  id: 'os-deadlock-y2',
  q: 'Which of the following statements about deadlock handling strategies are TRUE? (Select ALL that apply)',
  options: ['Deadlock prevention works by ensuring that at least one of the four necessary conditions for deadlock can never hold in the system', 'The Banker\'s algorithm is a deadlock AVOIDANCE algorithm that requires each process to declare its maximum possible resource need in advance', 'Deadlock detection algorithms are meant to be combined with deadlock prevention, since prevention alone never guarantees efficient resource usage', 'In a resource-allocation graph where every resource type has only a single instance, the presence of a cycle is both necessary and sufficient to conclude that a deadlock exists'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: since ALL four Coffman conditions must hold simultaneously for a deadlock to be possible, prevention strategies work by structurally eliminating (or making impossible) at least one condition -- for instance, requiring processes to request all resources upfront eliminates hold-and-wait. Option B is TRUE: the Banker\'s algorithm grants a resource request only if the resulting state remains "safe" (some sequence exists in which every process can still eventually finish), and this safety check fundamentally requires knowing each process\'s maximum possible future need in advance. Option C is FALSE: detection-and-recovery is typically used as an ALTERNATIVE to prevention/avoidance in systems that choose to allow deadlocks to occur occasionally and instead periodically check for and break them, precisely because prevention and avoidance schemes tend to under-utilize resources or add significant runtime overhead -- combining full prevention with detection is largely redundant. Option D is TRUE: this is a special-case theorem -- for resource-allocation graphs where every resource type has exactly one instance, a cycle in the graph is both a necessary and a sufficient condition for deadlock (this equivalence does NOT hold when resource types have multiple instances, where a cycle is necessary but not sufficient).'
},
{
  id: 'os-deadlock-y3',
  q: 'A system has 4 processes, each of which may request a maximum of 3 instances of a single resource type. What is the minimum total number of resource instances that must be available in the system to guarantee that deadlock can NEVER occur? (Enter your numerical answer.)',
  options: [],
  answer: 9,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'The standard sufficient condition to guarantee deadlock-freedom for a single resource type is: total instances >= sum over all processes of (max need of that process - 1), plus 1 more instance. With n processes each having identical maximum need m, this simplifies to R = n(m-1) + 1. Here n=4 and m=3, so R = 4 x (3-1) + 1 = 4 x 2 + 1 = 9. Intuitively, with 9 instances, even in the worst case where every process holds one less than its maximum (i.e., each holds 2, totaling 8 instances allocated), at least 1 instance remains free -- guaranteeing that at least one process can obtain its full remaining need and complete, releasing its resources and allowing all others to eventually finish too.'
},
{
  id: 'os-deadlock-y4',
  q: 'A system has 3 processes P1, P2, P3 with maximum resource needs of 4, 5, and 6 instances respectively, of a single resource type. What is the minimum total number of resource instances that must be available to guarantee deadlock can NEVER occur? (Enter your numerical answer.)',
  options: [],
  answer: 13,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'For processes with DIFFERENT maximum needs, the general sufficient condition is: R = sum over all processes of (max_i - 1) + 1. Here: (P1: 4-1=3) + (P2: 5-1=4) + (P3: 6-1=5) = 3+4+5 = 12, then add 1 more instance: R = 12 + 1 = 13. With 13 instances, the absolute worst case has each process holding exactly one less than its maximum (3+4+5=12 instances allocated in total), leaving at least 1 instance free -- guaranteeing that at least one process (whichever one still needs only that 1 more instance to reach its maximum) can complete, then release its resources so the remaining processes can proceed in turn.'
},
{
  id: 'os-deadlock-y5',
  q: 'A system has a single resource type with 3 instances currently AVAILABLE. Four processes have remaining (Need = Max - Allocation) values of P1=2, P2=5, P3=1, P4=4. Using the first step of the Banker\'s algorithm safety check, how many of these 4 processes could have their ENTIRE remaining need satisfied immediately using only the currently available instances (i.e., Need <= Available), without waiting for any other process to release resources first? (Enter your numerical answer.)',
  options: [],
  answer: 2,
  kind: 'nat',
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'The Banker\'s algorithm safety check repeatedly looks for a process whose remaining Need is less than or equal to the currently Available instances. Compare each process\'s Need against Available=3: P1 needs 2 <= 3, satisfiable immediately. P2 needs 5 > 3, NOT satisfiable immediately (must wait for a release). P3 needs 1 <= 3, satisfiable immediately. P4 needs 4 > 3, NOT satisfiable immediately. So exactly 2 processes (P1 and P3) could have their full remaining need met right now using only the currently available instances, without any process first having to finish and release resources back into the pool.'
},
{
  id: 'os-deadlock-y6',
  q: 'A resource-allocation graph has 3 processes (P1, P2, P3) and 3 resource types (R1, R2, R3), each resource type having exactly ONE instance. The graph contains the edges: P1 requests R1 (held by P2), P2 requests R2 (held by P3), and P3 requests R3 (held by P1), forming a closed cycle P1-R1-P2-R2-P3-R3-P1. How many processes are involved in this deadlock? (Enter your numerical answer.)',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Since every resource type here has exactly a single instance, the presence of a cycle in the resource-allocation graph is both a necessary and a sufficient condition for deadlock (this equivalence holds only in the single-instance-per-resource-type case). The cycle traced is P1 -> R1 -> P2 -> R2 -> P3 -> R3 -> P1, which passes through all three processes P1, P2, and P3 before closing back on itself -- each one is simultaneously holding a resource that the next process in the cycle needs, and each is blocked waiting for the process ahead of it, so all 3 processes are deadlocked together.'
}
);
window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-file-disk';}).questions.push(
{
  id: 'os-file-disk-g1',
  q: 'A RAID 5 array is built from 5 disks, each with a capacity of 1 TB, using block-level striping with distributed parity. What is the total usable storage capacity available to the user, in TB? (Enter your numerical answer.)',
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'RAID 5 distributes both data and parity information across all N disks in the array rather than dedicating a whole disk to parity, but the TOTAL amount of space consumed by parity across the array is exactly equivalent to the capacity of one disk, since each stripe contains exactly one parity block spread somewhere among the N disks. So out of N disks of capacity C each, the usable (data) capacity is (N-1) x C. Here N = 5 disks and C = 1 TB, giving usable capacity = (5-1) x 1 = 4 TB. The remaining 1 TB worth of space (spread across all disks) is consumed by parity information, which is what allows the array to reconstruct the contents of any single failed disk.'
},
{
  id: 'os-file-disk-g2',
  q: 'Which statement correctly distinguishes disk striping (as used in RAID 0) from disk mirroring (as used in RAID 1)?',
  options: ['Striping distributes data across multiple disks purely to improve read/write performance and provides no redundancy, whereas mirroring duplicates the same data on two or more disks to provide fault tolerance at the cost of usable capacity', 'Striping duplicates the same data on every disk for redundancy, while mirroring splits data blocks across disks purely for speed with no fault tolerance', 'Both striping and mirroring provide identical fault tolerance because both techniques use more than one physical disk', 'Mirroring always requires a minimum of 3 disks while striping requires only 2 disks'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'Striping (RAID 0) breaks data into blocks and spreads consecutive blocks across multiple disks so that reads and writes can happen in parallel, giving a significant performance boost, but it stores each piece of data on only ONE disk, so the failure of any single disk in the array destroys data with no way to recover it -- RAID 0 therefore provides zero fault tolerance despite using multiple disks. Mirroring (RAID 1), in contrast, writes an identical, complete copy of the data onto two or more separate disks; if one disk fails, the other mirrored copy still holds all the data intact, giving full fault tolerance against a single-disk failure. The tradeoff is capacity: with mirroring, only half (for 2-way mirroring) of the total raw disk space is usable, since every byte is duplicated, whereas striping wastes none of the raw capacity on redundancy. This exactly matches option 1: striping favors performance with no redundancy, mirroring favors redundancy at a capacity cost.'
},
{
  id: 'os-file-disk-g3',
  q: 'A RAID 5 array stores three data blocks on three separate disks with the bit patterns 10110011, 11001010, and 01010101, plus a parity block computed as the bitwise XOR of these three data blocks stored on a fourth disk. The disk holding the SECOND data block (11001010) then fails. The RAID controller reconstructs the missing block by XORing the parity block together with the two surviving data blocks. What is the DECIMAL value of the reconstructed block? (Enter your numerical answer.)',
  options: [],
  answer: 202,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'First compute the parity block P = d1 XOR d2 XOR d3, where d1 = 10110011, d2 = 11001010, d3 = 01010101. d1 XOR d2 = 01111001, then XORing with d3 gives P = 01111001 XOR 01010101 = 00101100. When d2 fails, RAID 5 reconstructs it as d2 = P XOR d1 XOR d3 (XOR is its own inverse and commutative/associative, so removing d1 and d3 from the parity recovers exactly the missing operand). Computing this: P XOR d1 = 00101100 XOR 10110011 = 10011111, then XOR d3 = 10011111 XOR 01010101 = 11001010. This recovers exactly the original bit pattern of d2, 11001010, which converted to decimal is 128+64+8+2 = 202. This illustrates the core RAID 5 recovery mechanism: parity is simply the XOR checksum of all data blocks in a stripe, so any single missing block can always be recovered by XORing the parity with all the surviving blocks.'
},
{
  id: 'os-file-disk-g4',
  q: 'What is the minimum number of physical disks required to implement RAID 0, RAID 1, and RAID 5 respectively, and which of these levels can survive the failure of at least one disk without losing data?',
  options: ['RAID 0 needs a minimum of 2 disks (no fault tolerance), RAID 1 needs a minimum of 2 disks (tolerates 1 disk failure), and RAID 5 needs a minimum of 3 disks (tolerates 1 disk failure)', 'RAID 0 needs a minimum of 3 disks, RAID 1 needs a minimum of 4 disks, and RAID 5 needs only 2 disks, with only RAID 0 tolerating a failure', 'All three RAID levels require a minimum of 4 disks and all three tolerate exactly 2 simultaneous disk failures', 'RAID 0 and RAID 5 both tolerate 2 disk failures while RAID 1 tolerates none at all'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'RAID 0 (pure striping) needs at least 2 disks to spread data across, but since it stores no redundant information whatsoever, the loss of even a single disk destroys data, so it tolerates 0 failures. RAID 1 (mirroring) needs at least 2 disks, since it must keep a full duplicate copy, and it can survive the loss of 1 disk because the mirrored copy still contains all the data. RAID 5 (block-level striping with distributed parity) needs at least 3 disks, because it requires at least 2 disks worth of data plus 1 disk worth of parity information spread across the array to be able to reconstruct any single missing block via XOR; with only 2 disks there would be no way to distribute both data and parity meaningfully, so 3 is the practical minimum. RAID 5 tolerates exactly 1 disk failure (a second simultaneous failure loses data, since the parity XOR scheme can only recover one unknown value per stripe). This matches option 1 precisely.'
}
);


window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-sync';}).questions.push(
{
  id: 'os-sync-v1',
  q: 'Three tasks share a preemptive priority-based scheduler: L (low priority), M (medium priority), and H (high priority), with H able to preempt M and L, and M able to preempt L. At time t0, L starts running and immediately acquires a shared lock/resource. At time t1 (while L still holds the lock), H becomes ready and tries to acquire the same lock, but must block because L holds it. At time t2 (while H is still blocked and L would otherwise resume), M becomes ready, and M does NOT need the shared resource at all. With no special protocol in place (plain fixed-priority preemptive scheduling), which task actually executes on the CPU during the interval right after t2, until L eventually gets to run again?',
  options: ['H, since it has the highest priority overall', 'L, since it already holds the CPU and the lock', 'M, since among all currently READY (non-blocked) tasks it has the highest priority -- H is not ready, it is blocked waiting on the lock', 'No task runs; the CPU is forced idle until the deadlock is detected'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'A fixed-priority preemptive scheduler always picks the highest-priority task among those that are currently READY to run -- being blocked (waiting on I/O, a lock, or any event) removes a task from consideration entirely, regardless of how high its priority is. At time t2, H is blocked on the lock held by L, so H is not a candidate at all. Between the two remaining tasks, M has higher priority than L, and M is ready with no blocking dependency, so the scheduler preempts L and runs M. This is the mechanical heart of priority inversion: L, which is holding the very resource that the highest-priority task H is waiting for, cannot make progress and release that resource because a merely medium-priority task M -- one that H does not even care about -- keeps grabbing the CPU ahead of it. The result is that H effectively waits behind M, a task with strictly lower priority than itself, which is exactly the inversion of the intended priority order. If M\'s execution is long or if more medium-priority tasks keep arriving, this inversion is UNBOUNDED, since nothing in the plain scheduler forces L to run and release the lock.'
},
{
  id: 'os-sync-v2',
  q: 'For the same three tasks L, M, H and the same scenario (L holds a lock, H blocks waiting for that lock, then M preempts L), the priority inheritance protocol is applied as the fix. Under priority inheritance, what happens at the moment H blocks on the lock held by L, and what is the resulting execution order of the three tasks?',
  options: [
    'H\'s priority is permanently given to L for the rest of L\'s lifetime; execution order becomes L, then H, then M',
    'L temporarily inherits H\'s (higher) priority for as long as it holds the contested lock, so M can no longer preempt it; L finishes its critical section and releases the lock, L\'s priority drops back to normal, and then H runs, followed by M',
    'M is blocked from running entirely until H finishes, regardless of the lock; execution order becomes H, then L, then M',
    'Priority inheritance has no effect on execution order, only on bookkeeping; the order is unchanged: M, then L, then H'
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'The priority inheritance protocol directly targets the mechanism that caused the inversion: the moment a higher-priority task (H) blocks waiting for a resource held by a lower-priority task (L), L\'s priority is temporarily and dynamically raised to match H\'s priority for as long as L continues to hold that resource. With L now effectively running at H\'s (high) priority, the medium-priority task M can no longer preempt it -- M\'s priority is lower than L\'s temporarily inherited priority, so the scheduler keeps L running. L completes its critical section quickly, releases the lock, and its priority immediately reverts to its original (low) level. At that point H, now unblocked, is the highest-priority ready task and runs immediately, and only afterward does M get a chance to run. The resulting order L (boosted), then H, then M bounds the duration of the priority inversion to, at worst, the length of L\'s critical section -- it cannot be extended indefinitely by an arbitrary number of unrelated medium-priority tasks the way the unprotected scenario could, which is precisely why this protocol was adopted (famously fixing the Mars Pathfinder priority-inversion bug in 1997).'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-scheduling';}).questions.push(
{
  id: 'os-scheduling-f1',
  q: 'Four processes P1, P2, P3, P4 all arrive at time t=0 and are scheduled using First-Come-First-Served (FCFS). The resulting Gantt chart is shown below. What is the AVERAGE WAITING TIME across all 4 processes? (Enter your numerical answer.)',
  figure: '<svg viewBox="-46 0 312 110" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><text x="110" y="15" fill="currentColor" font-size="11" text-anchor="middle">FCFS Gantt Chart (all processes arrive at t=0)</text><rect x="20" y="30" width="60" height="40" fill="none" stroke="currentColor"/><text x="50" y="55" fill="currentColor" font-size="12" text-anchor="middle">P1</text><rect x="80" y="30" width="45" height="40" fill="none" stroke="currentColor"/><text x="102" y="55" fill="currentColor" font-size="12" text-anchor="middle">P2</text><rect x="125" y="30" width="15" height="40" fill="none" stroke="currentColor"/><text x="132" y="55" fill="currentColor" font-size="10" text-anchor="middle">P3</text><rect x="140" y="30" width="60" height="40" fill="none" stroke="currentColor"/><text x="170" y="55" fill="currentColor" font-size="12" text-anchor="middle">P4</text><line x1="20" y1="70" x2="20" y2="78" stroke="currentColor"/><line x1="80" y1="70" x2="80" y2="78" stroke="currentColor"/><line x1="125" y1="70" x2="125" y2="78" stroke="currentColor"/><line x1="140" y1="70" x2="140" y2="78" stroke="currentColor"/><line x1="200" y1="70" x2="200" y2="78" stroke="currentColor"/><text x="20" y="92" fill="currentColor" font-size="10" text-anchor="middle">0</text><text x="80" y="92" fill="currentColor" font-size="10" text-anchor="middle">4</text><text x="125" y="92" fill="currentColor" font-size="10" text-anchor="middle">7</text><text x="140" y="92" fill="currentColor" font-size="10" text-anchor="middle">8</text><text x="200" y="92" fill="currentColor" font-size="10" text-anchor="middle">12</text></svg>',
  options: [],
  answer: 4.75,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'From the Gantt chart, the burst times can be read directly from the block widths and the time-axis ticks: P1 runs 0-4 (burst 4), P2 runs 4-7 (burst 3), P3 runs 7-8 (burst 1), P4 runs 8-12 (burst 4). Since all processes arrive at t=0 under non-preemptive FCFS, each process\'s waiting time equals its start time in the chart (the time it sat in the ready queue before its block began): P1 waits 0, P2 waits 4 (the time P1 occupied the CPU), P3 waits 7 (time P1+P2 occupied the CPU), and P4 waits 8 (time P1+P2+P3 occupied the CPU). Summing: 0+4+7+8 = 19. Dividing by the 4 processes gives an average waiting time of 19/4 = 4.75. This is the classic FCFS weakness illustrated visually: because P3 has a tiny burst of only 1 but is scheduled third, it is forced to wait behind two much longer jobs, inflating the overall average wait -- this is exactly the convoy effect FCFS is known for.'
},
{
  id: 'os-scheduling-f2',
  q: 'Four processes with the given arrivals and CPU bursts -- P1 (arrival 0, burst 6), P2 (arrival 1, burst 2), P3 (arrival 2, burst 4), P4 (arrival 3, burst 1) -- are scheduled by some algorithm, producing the Gantt chart shown (note that P1 is split into two separate slices). Which scheduling policy could have produced exactly this schedule?',
  figure: '<svg viewBox="0 0 200 120" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><text x="100" y="12" fill="currentColor" font-size="9" text-anchor="middle">Arrivals: P1@0 P2@1 P3@2 P4@3</text><text x="100" y="24" fill="currentColor" font-size="9" text-anchor="middle">Bursts: P1=6 P2=2 P3=4 P4=1</text><rect x="20" y="35" width="12" height="35" fill="none" stroke="currentColor"/><text x="26" y="55" fill="currentColor" font-size="9" text-anchor="middle">P1</text><rect x="32" y="35" width="24" height="35" fill="none" stroke="currentColor"/><text x="44" y="55" fill="currentColor" font-size="10" text-anchor="middle">P2</text><rect x="56" y="35" width="12" height="35" fill="none" stroke="currentColor"/><text x="62" y="55" fill="currentColor" font-size="9" text-anchor="middle">P4</text><rect x="68" y="35" width="48" height="35" fill="none" stroke="currentColor"/><text x="92" y="55" fill="currentColor" font-size="10" text-anchor="middle">P3</text><rect x="116" y="35" width="60" height="35" fill="none" stroke="currentColor"/><text x="146" y="55" fill="currentColor" font-size="10" text-anchor="middle">P1</text><line x1="20" y1="70" x2="20" y2="78" stroke="currentColor"/><line x1="32" y1="70" x2="32" y2="78" stroke="currentColor"/><line x1="56" y1="70" x2="56" y2="78" stroke="currentColor"/><line x1="68" y1="70" x2="68" y2="78" stroke="currentColor"/><line x1="116" y1="70" x2="116" y2="78" stroke="currentColor"/><line x1="176" y1="70" x2="176" y2="78" stroke="currentColor"/><text x="20" y="92" fill="currentColor" font-size="8" text-anchor="middle">0</text><text x="32" y="92" fill="currentColor" font-size="8" text-anchor="middle">1</text><text x="56" y="92" fill="currentColor" font-size="8" text-anchor="middle">3</text><text x="68" y="92" fill="currentColor" font-size="8" text-anchor="middle">4</text><text x="116" y="92" fill="currentColor" font-size="8" text-anchor="middle">8</text><text x="176" y="92" fill="currentColor" font-size="8" text-anchor="middle">13</text></svg>',
  options: ['FCFS (First-Come-First-Served)', 'Non-preemptive SJF (Shortest Job First)', 'SRTF (Shortest Remaining Time First, preemptive)', 'Round Robin with a fixed time quantum of 2'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'The key clue in the chart is that P1 is split into two non-adjacent slices (0-1 and 8-13), which immediately rules out any NON-preemptive policy (FCFS and non-preemptive SJF always run a chosen process to completion in one unbroken slice) and also rules out Round Robin with quantum 2, since RR would cut every process into fixed 2-unit slices, not an irregular 1-then-5 split. Simulating SRTF confirms the chart: at t=0 only P1 (remaining 6) runs. At t=1, P2 arrives with remaining 2, which is less than P1\'s remaining 5, so P2 preempts P1 -- explaining the break in P1\'s block right at t=1. P2 runs until t=3 (P3, arriving at t=2 with remaining 4, is not shorter than P2\'s remaining 1 at that point, so no further preemption happens). At t=3, P4 arrives with the shortest remaining time of all (1), so it preempts and runs 3-4. At t=4, comparing P1 (remaining 5) and P3 (remaining 4), P3 is shorter and runs 4-8. Finally, only P1 remains, so it resumes and runs 8-13. This exactly matches the given chart, so the answer is SRTF.'
},
{
  id: 'os-scheduling-f3',
  q: 'Three processes P1 (burst 5), P2 (burst 3), and P3 (burst 1) all arrive at t=0 and are scheduled with Round Robin using a time quantum of 2, producing the Gantt chart shown. What is the TURNAROUND TIME of process P2? (Enter your numerical answer.)',
  figure: '<svg viewBox="-86 0 372 100" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><text x="100" y="10" fill="currentColor" font-size="9" text-anchor="middle">Round Robin, quantum=2 (P1=5,P2=3,P3=1, all arrive t=0)</text><rect x="20" y="20" width="36" height="30" fill="none" stroke="currentColor"/><text x="38" y="40" fill="currentColor" font-size="10" text-anchor="middle">P1</text><rect x="56" y="20" width="36" height="30" fill="none" stroke="currentColor"/><text x="74" y="40" fill="currentColor" font-size="10" text-anchor="middle">P2</text><rect x="92" y="20" width="18" height="30" fill="none" stroke="currentColor"/><text x="101" y="40" fill="currentColor" font-size="9" text-anchor="middle">P3</text><rect x="110" y="20" width="36" height="30" fill="none" stroke="currentColor"/><text x="128" y="40" fill="currentColor" font-size="10" text-anchor="middle">P1</text><rect x="146" y="20" width="18" height="30" fill="none" stroke="currentColor"/><text x="155" y="40" fill="currentColor" font-size="9" text-anchor="middle">P2</text><rect x="164" y="20" width="18" height="30" fill="none" stroke="currentColor"/><text x="173" y="40" fill="currentColor" font-size="9" text-anchor="middle">P1</text><line x1="20" y1="50" x2="20" y2="58" stroke="currentColor"/><line x1="56" y1="50" x2="56" y2="58" stroke="currentColor"/><line x1="92" y1="50" x2="92" y2="58" stroke="currentColor"/><line x1="110" y1="50" x2="110" y2="58" stroke="currentColor"/><line x1="146" y1="50" x2="146" y2="58" stroke="currentColor"/><line x1="164" y1="50" x2="164" y2="58" stroke="currentColor"/><line x1="182" y1="50" x2="182" y2="58" stroke="currentColor"/><text x="20" y="70" fill="currentColor" font-size="8" text-anchor="middle">0</text><text x="56" y="70" fill="currentColor" font-size="8" text-anchor="middle">2</text><text x="92" y="70" fill="currentColor" font-size="8" text-anchor="middle">4</text><text x="110" y="70" fill="currentColor" font-size="8" text-anchor="middle">5</text><text x="146" y="70" fill="currentColor" font-size="8" text-anchor="middle">7</text><text x="164" y="70" fill="currentColor" font-size="8" text-anchor="middle">8</text><text x="182" y="70" fill="currentColor" font-size="8" text-anchor="middle">9</text></svg>',
  options: [],
  answer: 8,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Reading the Gantt chart, P2 (burst 3) is scheduled twice: first from t=2 to t=4 (using its first quantum of 2, leaving 1 unit remaining), and then again from t=7 to t=8 (using its final 1 unit and completing). So P2\'s completion time is 8. Since P2 arrived at t=0, its turnaround time is simply completion time minus arrival time = 8 - 0 = 8. This can be cross-checked against the full simulation: the ready queue order is P1,P2,P3 initially; after P1 uses its first quantum (0-2, 3 remaining) it is re-queued behind P2 and P3; P2 runs 2-4 (1 remaining, re-queued behind P3 and P1); P3 runs 4-5 and finishes (burst was only 1); P1 runs 5-7 (using its second quantum, 1 remaining); P2 runs 7-8 and finishes (its last 1 unit); finally P1 runs 8-9 and finishes. This confirms P2 completes at t=8, giving a turnaround time of 8.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-deadlock';}).questions.push(
{
  id: 'os-deadlock-f1',
  q: 'The resource-allocation graph below shows resource type R1 (with 2 instances) and R2 (with 1 instance), and processes P1 and P2. Solid dots represent instances currently allocated; hollow dots represent free instances. The graph contains a cycle P1 -> R2 -> P2 -> R1 -> P1. Does this system configuration represent a deadlock?',
  figure: '<svg viewBox="-86 0 392 160" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs><rect x="20" y="20" width="50" height="30" fill="none" stroke="currentColor"/><text x="45" y="15" fill="currentColor" font-size="10" text-anchor="middle">R1 (2 inst)</text><circle cx="30" cy="35" r="3" fill="currentColor"/><circle cx="45" cy="35" r="3" fill="none" stroke="currentColor"/><circle cx="45" cy="110" r="16" fill="none" stroke="currentColor"/><text x="45" y="114" fill="currentColor" font-size="11" text-anchor="middle">P1</text><rect x="150" y="20" width="50" height="30" fill="none" stroke="currentColor"/><text x="175" y="15" fill="currentColor" font-size="10" text-anchor="middle">R2 (1 inst)</text><circle cx="175" cy="35" r="3" fill="currentColor"/><circle cx="175" cy="110" r="16" fill="none" stroke="currentColor"/><text x="175" y="114" fill="currentColor" font-size="11" text-anchor="middle">P2</text><line x1="30" y1="50" x2="42" y2="96" stroke="currentColor" marker-end="url(#ah1)"/><line x1="58" y1="106" x2="158" y2="42" stroke="currentColor" marker-end="url(#ah1)"/><line x1="175" y1="50" x2="175" y2="94" stroke="currentColor" marker-end="url(#ah1)"/><line x1="163" y1="102" x2="63" y2="42" stroke="currentColor" marker-end="url(#ah1)"/><text x="110" y="140" fill="currentColor" font-size="9" text-anchor="middle">Solid dot = allocated instance; hollow dot = free instance</text></svg>',
  options: ['Yes, deadlock exists because the graph contains the cycle P1-R2-P2-R1-P1', 'No, because R1 has a free (hollow) instance, so P2\'s pending request for R1 can be granted immediately, letting P2 finish and release R2 for P1', 'Yes, because both P1 and P2 are simultaneously requesting and holding resources', 'It cannot be determined without knowing the total number of instances of R2'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'For resource types with a SINGLE instance each, a cycle in the resource-allocation graph is both necessary and sufficient for deadlock. However, once any resource type in the cycle has MORE than one instance, a cycle is only necessary, not sufficient -- it must be checked further. Here R1 has 2 instances: one is allocated to P1 (solid dot) and one is free (hollow dot). P2\'s pending request edge to R1 can therefore be satisfied immediately from the free instance, without waiting for P1 to release anything. Once P2 gets that free instance of R1, it can proceed to completion and will then release both its allocated R2 and the R1 instance it just acquired, which lets P1\'s pending request for R2 also be satisfied. So despite the visible cycle, every process can eventually complete -- there is no deadlock. This is the classic GATE trap: students see a cycle and immediately answer "deadlock" without checking whether the resource types involved have spare instances that break the circular wait.'
},
{
  id: 'os-deadlock-f2',
  q: 'The resource-allocation graph below shows three single-instance resources (R1, R2, R3) and three processes (P1, P2, P3). Solid dots mean the instance is held; a hollow dot on R3 means its single instance is currently free. Which process(es) are actually deadlocked in this graph?',
  figure: '<svg viewBox="-49 0 358 160" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs><rect x="20" y="15" width="40" height="26" fill="none" stroke="currentColor"/><text x="40" y="10" fill="currentColor" font-size="10" text-anchor="middle">R1</text><circle cx="40" cy="28" r="3" fill="currentColor"/><rect x="110" y="15" width="40" height="26" fill="none" stroke="currentColor"/><text x="130" y="10" fill="currentColor" font-size="10" text-anchor="middle">R2</text><circle cx="130" cy="28" r="3" fill="currentColor"/><rect x="200" y="15" width="40" height="26" fill="none" stroke="currentColor"/><text x="220" y="10" fill="currentColor" font-size="10" text-anchor="middle">R3</text><circle cx="220" cy="28" r="3" fill="none" stroke="currentColor"/><circle cx="40" cy="120" r="16" fill="none" stroke="currentColor"/><text x="40" y="124" fill="currentColor" font-size="11" text-anchor="middle">P1</text><circle cx="130" cy="120" r="16" fill="none" stroke="currentColor"/><text x="130" y="124" fill="currentColor" font-size="11" text-anchor="middle">P2</text><circle cx="220" cy="120" r="16" fill="none" stroke="currentColor"/><text x="220" y="124" fill="currentColor" font-size="11" text-anchor="middle">P3</text><line x1="35" y1="41" x2="38" y2="104" stroke="currentColor" marker-end="url(#ah2)"/><line x1="55" y1="112" x2="115" y2="35" stroke="currentColor" marker-end="url(#ah2)"/><line x1="125" y1="41" x2="128" y2="104" stroke="currentColor" marker-end="url(#ah2)"/><line x1="115" y1="108" x2="55" y2="35" stroke="currentColor" marker-end="url(#ah2)"/><line x1="220" y1="104" x2="220" y2="41" stroke="currentColor" marker-end="url(#ah2)"/><text x="130" y="150" fill="currentColor" font-size="9" text-anchor="middle">Solid dot = held instance; hollow dot = free instance</text></svg>',
  options: ['Only P1 and P2 are deadlocked; P3 is not', 'All three of P1, P2, and P3 are deadlocked', 'Only P3 is deadlocked; P1 and P2 are not', 'None of the processes are deadlocked'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Since R1 and R2 each have only a single instance, the graph edges R1->P1 (held), P1->R2 (request), R2->P2 (held), P2->R1 (request) form a closed cycle entirely among single-instance resources -- this is both necessary and sufficient for deadlock, so P1 and P2 are genuinely deadlocked: each holds the resource the other needs and neither can proceed. P3, in contrast, only has an outgoing request edge to R3, and R3\'s single instance is shown as a hollow (free) dot -- meaning nobody currently holds R3. Since the resource P3 is waiting for is immediately available, P3\'s request can be granted right away with no blocking at all, so P3 is not part of any cycle and is not deadlocked. This illustrates that deadlock analysis must be done per connected component of the graph: unrelated processes waiting on resources outside any cycle are unaffected even when a deadlock exists elsewhere in the same system.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-memory';}).questions.push(
{
  id: 'os-memory-f1',
  q: 'A system uses 32-bit virtual addresses with a page size of 4 KB, split into a Page Number field and an Offset field as shown. Given that the offset field is 12 bits (since page size = 4 KB = 2^12 bytes), how many bits are used for the Page Number field?',
  figure: '<svg viewBox="-6 0 272 80" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><text x="130" y="12" fill="currentColor" font-size="10" text-anchor="middle">32-bit Virtual Address, Page Size = 4 KB</text><rect x="20" y="20" width="150" height="30" fill="none" stroke="currentColor"/><text x="95" y="39" fill="currentColor" font-size="11" text-anchor="middle">Page Number</text><rect x="170" y="20" width="90" height="30" fill="none" stroke="currentColor"/><text x="215" y="39" fill="currentColor" font-size="11" text-anchor="middle">Offset</text><text x="95" y="65" fill="currentColor" font-size="10" text-anchor="middle">? bits</text><text x="215" y="65" fill="currentColor" font-size="10" text-anchor="middle">12 bits</text><line x1="20" y1="52" x2="20" y2="58" stroke="currentColor"/><line x1="260" y1="52" x2="260" y2="58" stroke="currentColor"/><line x1="170" y1="52" x2="170" y2="58" stroke="currentColor"/></svg>',
  options: [],
  answer: 20,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'The virtual address is split into two disjoint bit fields whose widths must add up to the total address width. The offset field width is determined purely by the page size: since the page size is 4 KB = 2^12 bytes, exactly 12 bits are needed to address every byte within a single page, which matches the "12 bits" label shown under the Offset box. The remaining bits of the 32-bit address form the Page Number field, which selects WHICH page (out of the total virtual address space) a reference falls into. Since the total address is 32 bits and the offset consumes 12 of them, the page number field must consume the remaining 32 - 12 = 20 bits. This also means the process\'s virtual address space contains 2^20 = 1,048,576 distinct pages, and the page table for this process would need up to 2^20 entries (one per possible page number) in a simple single-level scheme.'
}
);

window.GATE_DATA.questions['os'].topics.find(function(t){return t.id==='os-virtual-memory';}).questions.push(
{
  id: 'os-virtual-memory-f1',
  q: 'A process references pages in the order shown in the timeline below: 7, 0, 1, 2, 0, 3, 0, 4. The system has exactly 3 page frames, all initially empty, and uses the FIFO page replacement algorithm. How many page faults occur in total over this reference sequence? (Enter your numerical answer.)',
  figure: '<svg viewBox="-6 0 272 70" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><text x="130" y="10" fill="currentColor" font-size="10" text-anchor="middle">Page Reference Timeline (3 frames, FIFO)</text><rect x="10" y="18" width="28" height="24" fill="none" stroke="currentColor"/><text x="24" y="35" fill="currentColor" font-size="11" text-anchor="middle">7</text><rect x="38" y="18" width="28" height="24" fill="none" stroke="currentColor"/><text x="52" y="35" fill="currentColor" font-size="11" text-anchor="middle">0</text><rect x="66" y="18" width="28" height="24" fill="none" stroke="currentColor"/><text x="80" y="35" fill="currentColor" font-size="11" text-anchor="middle">1</text><rect x="94" y="18" width="28" height="24" fill="none" stroke="currentColor"/><text x="108" y="35" fill="currentColor" font-size="11" text-anchor="middle">2</text><rect x="122" y="18" width="28" height="24" fill="none" stroke="currentColor"/><text x="136" y="35" fill="currentColor" font-size="11" text-anchor="middle">0</text><rect x="150" y="18" width="28" height="24" fill="none" stroke="currentColor"/><text x="164" y="35" fill="currentColor" font-size="11" text-anchor="middle">3</text><rect x="178" y="18" width="28" height="24" fill="none" stroke="currentColor"/><text x="192" y="35" fill="currentColor" font-size="11" text-anchor="middle">0</text><rect x="206" y="18" width="28" height="24" fill="none" stroke="currentColor"/><text x="220" y="35" fill="currentColor" font-size="11" text-anchor="middle">4</text><text x="24" y="55" fill="currentColor" font-size="8" text-anchor="middle">t1</text><text x="52" y="55" fill="currentColor" font-size="8" text-anchor="middle">t2</text><text x="80" y="55" fill="currentColor" font-size="8" text-anchor="middle">t3</text><text x="108" y="55" fill="currentColor" font-size="8" text-anchor="middle">t4</text><text x="136" y="55" fill="currentColor" font-size="8" text-anchor="middle">t5</text><text x="164" y="55" fill="currentColor" font-size="8" text-anchor="middle">t6</text><text x="192" y="55" fill="currentColor" font-size="8" text-anchor="middle">t7</text><text x="220" y="55" fill="currentColor" font-size="8" text-anchor="middle">t8</text></svg>',
  options: [],
  answer: 7,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Simulate FIFO with 3 empty frames, tracking insertion order (the front of the queue is evicted first). t1: reference 7 -> fault, frames={7}. t2: reference 0 -> fault, frames={7,0}. t3: reference 1 -> fault, frames={7,0,1} (now full). t4: reference 2 -> fault, evict oldest (7), frames={0,1,2}. t5: reference 0 -> HIT (0 is already present; FIFO does not reorder on a hit, so the queue order 0,1,2 is unchanged). t6: reference 3 -> fault, evict oldest (0), frames={1,2,3}. t7: reference 0 -> fault (0 was just evicted), evict oldest (1), frames={2,3,0}. t8: reference 4 -> fault, evict oldest (2), frames={3,0,4}. Counting: faults occur at t1,t2,t3,t4,t6,t7,t8 -- that is 7 faults out of 8 references, with the only hit at t5. This specific reference string with 3 frames is the classic example used to demonstrate Belady\'s Anomaly, since adding a 4th frame to the same string actually reduces the fault count rather than only ever helping monotonically as intuition might suggest for other algorithms like LRU.'
}
);
