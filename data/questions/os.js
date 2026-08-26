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
    }
  ]
};
