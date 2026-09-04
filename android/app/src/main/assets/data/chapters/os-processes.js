// Textbook chapter: Processes & Threads.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/os.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure from the figs list below.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['os-processes'] = {
  figs: [
    {
      id: 'mem-layout',
      caption: 'The four regions of a process in memory. The stack and the heap grow toward each other into the free gap between them.',
      svg: '<svg viewBox="0 0 360 300" width="100%" style="max-width:360px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-ml" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.5" fill="none"><rect x="90" y="20" width="180" height="40"/><rect x="90" y="60" width="180" height="70"/><rect x="90" y="130" width="180" height="50"/><rect x="90" y="180" width="180" height="50"/><rect x="90" y="230" width="180" height="40"/></g><g font-size="12" fill="currentColor"><text x="180" y="45" text-anchor="middle">stack  (locals, return addresses)</text><text x="180" y="99" text-anchor="middle" font-size="11" opacity=".7">free — both regions grow into this</text><text x="180" y="160" text-anchor="middle">heap  (malloc / new)</text><text x="180" y="210" text-anchor="middle">data  (globals, statics)</text><text x="180" y="255" text-anchor="middle">text  (the program code)</text><text x="24" y="26">high</text><text x="24" y="270">low</text><text x="290" y="26" font-size="11">max</text><text x="290" y="270" font-size="11">0</text></g><g stroke="currentColor" stroke-width="1.5" fill="none"><line x1="180" y1="62" x2="180" y2="82" marker-end="url(#ah-ml)"/><line x1="180" y1="128" x2="180" y2="108" marker-end="url(#ah-ml)"/></g></svg>'
    },
    {
      id: 'thread-models',
      caption: 'The three ways user threads can be mapped onto kernel threads. Only the kernel threads can be scheduled onto CPUs.',
      svg: '<svg viewBox="0 0 420 210" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" fill="currentColor"><text x="70" y="16" text-anchor="middle">many-to-one</text><text x="210" y="16" text-anchor="middle">one-to-one</text><text x="350" y="16" text-anchor="middle">many-to-many</text><text x="10" y="60" font-size="10">user</text><text x="10" y="150" font-size="10">kernel</text></g><g stroke="currentColor" stroke-width="1.4" fill="none"><line x1="0" y1="105" x2="420" y2="105" stroke-dasharray="4,4" opacity=".5"/><circle cx="40" cy="55" r="9"/><circle cx="70" cy="55" r="9"/><circle cx="100" cy="55" r="9"/><circle cx="70" cy="150" r="9"/><line x1="40" y1="64" x2="70" y2="141"/><line x1="70" y1="64" x2="70" y2="141"/><line x1="100" y1="64" x2="70" y2="141"/><circle cx="180" cy="55" r="9"/><circle cx="210" cy="55" r="9"/><circle cx="240" cy="55" r="9"/><circle cx="180" cy="150" r="9"/><circle cx="210" cy="150" r="9"/><circle cx="240" cy="150" r="9"/><line x1="180" y1="64" x2="180" y2="141"/><line x1="210" y1="64" x2="210" y2="141"/><line x1="240" y1="64" x2="240" y2="141"/><circle cx="310" cy="55" r="9"/><circle cx="340" cy="55" r="9"/><circle cx="370" cy="55" r="9"/><circle cx="400" cy="55" r="9"/><circle cx="335" cy="150" r="9"/><circle cx="375" cy="150" r="9"/><line x1="310" y1="64" x2="335" y2="141"/><line x1="340" y1="64" x2="335" y2="141"/><line x1="370" y1="64" x2="375" y2="141"/><line x1="400" y1="64" x2="375" y2="141"/></g><g font-size="10" fill="currentColor" opacity=".8"><text x="70" y="190" text-anchor="middle">one blocks → all block</text><text x="210" y="190" text-anchor="middle">true parallelism, costly</text><text x="350" y="190" text-anchor="middle">best of both</text></g></svg>'
    },
    {
      id: 'syscall-trap',
      caption: 'A system call is a controlled switch from user mode to kernel mode and back. The mode bit is the only thing standing between a program and the hardware.',
      svg: '<svg viewBox="0 0 420 170" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-sc" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.5" fill="none"><rect x="10" y="30" width="400" height="45"/><rect x="10" y="100" width="400" height="45"/><line x1="140" y1="75" x2="140" y2="98" marker-end="url(#ah-sc)"/><line x1="290" y1="100" x2="290" y2="77" marker-end="url(#ah-sc)"/></g><g font-size="11" fill="currentColor"><text x="20" y="20">USER MODE  (mode bit = 1)</text><text x="20" y="165">KERNEL MODE  (mode bit = 0)</text><text x="60" y="57">read(fd, buf, n)  … resume here</text><text x="150" y="90" font-size="10">trap: set mode 0, jump to handler</text><text x="60" y="127">dispatch on call number → do the I/O → set mode 1 → return</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

An operating system's whole job is to run many programs on one machine and keep them out of each other's way. The process is the unit it does that with. Everything in the rest of the OS syllabus — scheduling, synchronisation, deadlock, memory management — is about processes: choosing between them, letting them cooperate safely, sharing memory among them. So if this chapter is solid, the rest of the subject has something to stand on. If it is shaky, every later topic feels arbitrary.

We will build the idea from the ground up: what a process is made of, what states it moves through, what the kernel keeps about it, how one is created and destroyed, how two of them talk to each other, and finally how threads let a single process do several things at once. Every claim is either derived or demonstrated. Where GATE has a favourite way of testing a point, that is said at the point itself — but the aim is to understand the machine, and the exam questions then answer themselves.

PROGRAM VERSUS PROCESS

Start with the distinction everything else depends on.

A program is a file on disk. It is a passive thing: a sequence of machine instructions and some initial data, sitting in bytes, doing nothing. You can copy it, delete it, print it. It does not run.

A process is a program in execution. When you launch a program, the operating system creates a process for it: it loads the instructions into memory, sets aside memory for the program's variables, creates a stack for it, points the CPU at its first instruction, and starts keeping records about it. The process is active — it has a current instruction, values in registers, a stack that is growing and shrinking, files it has opened.

The difference matters because one program can be many processes. Open a text editor twice and you have two processes running the same program. They share the same instructions, but each has its own variables, its own stack, its own position in the code. Kill one and the other does not notice. The program is the recipe; the process is a cook following it, with their own bowls and their own place in the steps.

KEY: A process is a program plus the state of running it — the current instruction, the registers, the stack, the memory it owns, the files it has open. Two processes can run the same program and be completely independent.

WHAT A PROCESS LOOKS LIKE IN MEMORY

A process owns a region of memory, called its address space, and that region is divided into four parts. You need to know all four, what lives in each, and which way each grows, because GATE asks about them directly and because the layout explains a great deal of later behaviour — stack overflows, memory leaks, why recursion has a depth limit.

[[FIG:mem-layout]]

The text section holds the program's machine instructions. It is loaded from the executable file and, in a normal process, never changes while the program runs. Because it never changes, the OS can mark it read-only, and — this is why the layout matters — it can share one copy of the text among every process running the same program. Ten copies of the editor need ten stacks and ten data sections but only one copy of the code.

The data section holds global variables and static variables: things that exist for the whole life of the process and whose size is known when the program is compiled. If you write int counter = 0; outside any function, counter lives here. Its size is fixed at load time.

The heap is memory the program asks for while it runs — malloc in C, new in C++ or Java. The program cannot know in advance how much it will need, so the heap grows and shrinks as the program allocates and frees. It grows upward, toward higher addresses.

The stack holds everything to do with function calls: each time a function is called, a new frame is pushed containing that function's local variables, its parameters, and the return address — where to go back to when the function finishes. When the function returns, its frame is popped. The stack grows downward, toward lower addresses.

Why do the stack and heap grow toward each other? Because neither's final size is known in advance. Putting them at opposite ends of the free region and letting each grow into the middle means neither has to be given a fixed limit up front. The gap between them is the process's spare room. When they meet, the process is out of memory. A recursion that never terminates pushes stack frames until the stack runs into the heap — a stack overflow. A program that mallocs forever and never frees grows the heap until it runs into the stack — a memory leak that eventually exhausts memory.

GATE TRAP: Local variables live on the stack, not the heap, even if they are arrays. int a[1000]; inside a function is 4000 bytes of stack. Only memory obtained through malloc/new is on the heap. And a static local — static int calls = 0; inside a function — lives in the data section, not the stack, which is exactly why it keeps its value between calls.

THE FIVE STATES OF A PROCESS

At any instant a process is doing exactly one of a small number of things, and the OS records which. These are the process states. There are five in the standard model, and the transitions between them are the single most tested piece of this chapter, so we will build the whole picture and then check every arrow.

[[FIG:process-states]]

• New — the process is being created. The OS is setting up its records and allocating its memory but has not yet made it eligible to run.

• Ready — the process has everything it needs to run except a CPU. It is sitting in a queue waiting to be picked.

• Running — the process's instructions are currently executing on a CPU. On a machine with one CPU, exactly one process can be in this state at any moment. On a machine with four CPUs, at most four.

• Waiting (also called Blocked) — the process cannot continue until some event happens: a disk read finishes, a key is pressed, a message arrives, a timer expires. It is not asking for the CPU; giving it the CPU would be pointless because it has nothing it can do.

• Terminated — the process has finished. Its memory is being reclaimed and its records are about to be deleted.

Now the transitions. Each one is caused by something specific, and knowing the cause is what lets you answer questions about them.

1. New → Ready. Admission. The OS has finished setting up the process and adds it to the ready queue. On a batch system a long-term scheduler decides when to admit; on a desktop system it is immediate.

2. Ready → Running. Dispatch. The scheduler picks this process from the ready queue and loads its saved state into the CPU. This is the only way into Running.

3. Running → Ready. Preemption. The process was running fine but the OS took the CPU away — because its time slice expired (a timer interrupt fired), or because a higher-priority process became ready. The process did nothing to cause this; it is still perfectly able to run, so it goes back to Ready, not Waiting.

4. Running → Waiting. The process itself asked for something it must wait for: it issued a read() and the data is on disk, it called wait() for a child to finish, it tried to acquire a lock that is held. It cannot proceed, so it leaves the CPU voluntarily.

5. Waiting → Ready. The event happened. The disk interrupt fired saying the data is in memory; the child exited; the lock was released. The process is now able to run again — but it does not get the CPU immediately. It goes to the ready queue and waits its turn like everyone else.

6. Running → Terminated. The process called exit(), or returned from main, or was killed.

Now the arrows that do NOT exist, and why. These are where the marks are.

There is no Waiting → Running. A process whose I/O just finished has become able to run, but able to run is exactly what Ready means. It must go through the ready queue and be dispatched. If the scheduler happens to pick it instantly, that is still two transitions, Waiting → Ready → Running, not one.

There is no Ready → Waiting. To wait for something, a process has to ask for it, and asking means executing an instruction, and executing instructions means being in Running. A process sitting in the ready queue is not executing anything, so it cannot issue the request that would make it wait.

There is no Ready → Terminated in the normal model, for the same reason — exit() is an instruction. (A process can be killed by another process from any state, but the standard state diagram is about what the process does to itself.)

GATE TRAP: "A process moves from Waiting to Running when its I/O completes" is false, and it is the single most common wrong answer in this area. I/O completion moves it to Ready. Only the dispatcher moves anything to Running.

REMEMBER: Into Running there is exactly one arrow (from Ready, by dispatch). Out of Running there are three: back to Ready (preempted — the OS's decision), to Waiting (blocked — the process's request), or to Terminated (finished).

A sixth and seventh state exist on systems that swap processes out of memory entirely to relieve pressure: Ready-Suspended and Waiting-Suspended. A suspended process has been written to disk; it must be swapped back in before it can do anything. The medium-term scheduler, described below, manages these. They are asked about occasionally; the important point is that a Waiting-Suspended process whose I/O completes becomes Ready-Suspended — still on disk, but now only waiting for memory rather than for the event.

THE PROCESS CONTROL BLOCK

The operating system must remember everything about every process, so that it can stop one, run another, and later resume the first exactly where it left off. The record it keeps is the process control block, or PCB — one per process. When you hear "the OS keeps track of a process", the PCB is what does the tracking.

What has to be in it? Think about what would be lost if the process were stopped mid-instruction and its CPU given to someone else, and you will derive the contents.

• Process state — which of the five states it is in. Without this the scheduler cannot know which processes are eligible to run.

• Process number (PID) — a unique identifier, so the process can be named in system calls like kill and wait.

• Program counter — the address of the next instruction this process will execute. If this were lost, the process could not be resumed at the right place.

• CPU registers — the contents of every register (accumulators, index registers, stack pointer, condition codes) at the moment the process was stopped. The next process will overwrite all of them, so they must be saved here and restored later.

• CPU-scheduling information — the process's priority, pointers to the scheduling queues it is on, any other parameters the scheduler uses.

• Memory-management information — the base and limit registers, or the page table or segment table, that describe which memory this process owns. This is how the OS enforces that a process touches only its own memory.

• Accounting information — CPU time used, wall-clock time elapsed, time limits, account number. Used for billing on shared systems and for scheduling decisions.

• I/O status information — the list of open files, the devices allocated to the process, pending I/O requests.

KEY: The PCB is the process, as far as the kernel is concerned. Everything the kernel does to a process — schedule it, suspend it, kill it, account for it — it does by reading and writing that process's PCB. The process's own memory holds its data; the PCB holds the kernel's data about it.

THE CONTEXT SWITCH

Now we can say precisely what happens when the CPU is taken from one process and given to another. This is a context switch, and understanding it mechanically is what makes the cost arguments and the scheduling trade-offs in the next chapter make sense.

Suppose process P0 is running and an interrupt arrives — say the timer, ending P0's time slice — and the scheduler decides P1 should run next.

1. The hardware saves the program counter and jumps to the kernel's interrupt handler. The CPU is now executing kernel code, in kernel mode.

2. The kernel saves the rest of P0's CPU state — every register — into P0's PCB. P0's program counter, already saved by the hardware, is also recorded there. P0's state field is set to Ready (it was preempted) and it is placed on the ready queue.

3. The scheduler chooses P1.

4. The kernel loads P1's saved registers from P1's PCB into the CPU, switches the memory-management registers so that the CPU is now translating addresses through P1's page table rather than P0's, and sets P1's state to Running.

5. The kernel executes a return-from-interrupt, which loads P1's saved program counter. P1 resumes at exactly the instruction it was about to execute when it was last stopped. P1 does not know it was ever paused.

Several things follow from this sequence.

The context switch is pure overhead. During it the CPU is doing kernel bookkeeping; no user process is making progress. Its cost — typically a few microseconds — depends on the hardware: how many registers must be saved, whether the memory-management hardware must be flushed. The more often you switch, the larger the fraction of time lost to switching. This is precisely why very small time slices are bad in round-robin scheduling, a point the next chapter leans on heavily.

The kernel's own code is not switched. There is one kernel, and both P0 and P1 run through it. What is switched is the user context — registers, stack pointer, memory map. Some hardware offers several register sets so a switch can be done by changing a pointer rather than copying; that makes it faster but does not change what is happening.

Address-space switching is the expensive part on modern hardware, because the translation lookaside buffer (the cache of recent address translations, met in the memory chapter) must be flushed — its entries were for P0's addresses and would be wrong for P1. This is the reason switching between threads of the same process is cheaper than switching between processes: threads share an address space, so the memory map does not change and the TLB stays valid.

GATE TRAP: A context switch happens on a switch of process, which is not the same as every interrupt. An interrupt that is handled and then returns to the same process — a disk interrupt that just marks another process Ready — involves a mode switch (user to kernel and back) but no context switch. Mode switch is cheap; context switch is the expensive one.

SCHEDULING QUEUES AND THE THREE SCHEDULERS

Processes waiting for things are kept in queues, and the OS has schedulers that move them between the queues. Get the names straight, because they are tested as vocabulary and because the long-term versus short-term distinction explains what "degree of multiprogramming" means.

• The job queue holds every process in the system.

• The ready queue holds the processes in the Ready state — in memory, wanting a CPU. It is usually a linked list of PCBs; the head is the next candidate, the tail is where preempted or newly readied processes are appended (in FCFS) or wherever priority dictates.

• Each I/O device has a device queue of the processes waiting for that device. A process that issues a disk read is moved from Running to the disk's device queue; when its read completes it moves from the device queue to the ready queue.

A process cycles through these: dispatched from the ready queue, runs, either issues I/O (into a device queue, then back to ready when done), or is preempted (straight back to ready), or exits. Most of a process's life is spent in queues.

Three schedulers make the decisions.

The long-term scheduler, or job scheduler, decides which programs on disk are admitted into memory to become processes. It runs rarely — seconds or minutes between decisions — so it can afford to be slow and careful. It controls the degree of multiprogramming: the number of processes in memory. Its most important job is choosing a good mix of I/O-bound processes, which spend most of their time waiting on devices and use little CPU, and CPU-bound processes, which compute steadily. All I/O-bound and the CPU idles while everyone waits for disks; all CPU-bound and the devices idle while everyone waits for the CPU. Desktop operating systems like Linux and Windows essentially have no long-term scheduler — every program you launch is admitted immediately and the degree of multiprogramming is whatever the user makes it.

The short-term scheduler, or CPU scheduler, picks the next process from the ready queue and dispatches it. It runs constantly — every time a process blocks, exits, or is preempted, which can be every few milliseconds. Because it runs so often, it must be fast: if it took 1 ms to decide and ran every 10 ms, a tenth of the CPU would be spent scheduling. The whole of the next chapter is about the algorithms this scheduler uses.

The medium-term scheduler handles swapping. When memory is oversubscribed, it removes a process from memory entirely — writing its pages to disk — reducing the degree of multiprogramming. Later, it swaps the process back in and it resumes. This is where the suspended states come from. It also lets the OS fix a bad process mix chosen by the long-term scheduler.

REMEMBER: Long-term — how many, and which mix, rarely. Short-term — which one gets the CPU next, constantly, must be fast. Medium-term — swap out to relieve memory, swap back in later.

A process's behaviour is described as a sequence of CPU bursts and I/O bursts: it computes for a while (a CPU burst), then waits for I/O (an I/O burst), then computes, and so on. An I/O-bound process has many short CPU bursts; a CPU-bound process has few long ones. The scheduling chapter's algorithms are all ways of deciding whose CPU burst runs next, and the burst-length distribution — many short, few long — is why several of them work as they do.

CREATING A PROCESS: FORK

Processes are created by other processes. The creating process is the parent, the new one is the child, and since a child can create children of its own, the processes form a tree. On UNIX the root of the tree is init (or systemd), process 1, from which every other process is ultimately descended.

The system call that creates a process on UNIX is fork(), and it is the most heavily tested single system call in the GATE OS syllabus, so we will take it apart completely.

What fork() does: it creates a new process that is an exact copy of the calling process. The child gets a copy of the parent's memory — text, data, heap and stack — a copy of its open file descriptors, its program counter, its registers. At the instant after fork() returns, parent and child are executing the same program, at the same instruction, with the same variable values. They differ in one thing only: the value fork() returned.

In the parent, fork() returns the PID of the new child — a positive integer.
In the child, fork() returns 0.
If the fork fails (out of memory, process limit reached), it returns -1 in the parent and no child is created.

This is the famous "one call, two returns". fork() is called once, but because there are now two processes both executing the instruction after the call, it returns twice — once in each. The return value is how a program tells which process it is:

pid_t pid = fork();
if (pid < 0) { /* fork failed */ }
else if (pid == 0) { /* I am the child */ }
else { /* I am the parent; pid is my child's PID */ }

Both branches are in the same program, and both processes have the whole program. The if simply steers each process into the part meant for it.

Why 0 for the child and the child's PID for the parent? A parent may have many children and needs to know which one it just made, so it gets the PID. The child has exactly one parent and can find its PID any time with getppid(), so it does not need it from fork(); 0 is a value no real PID can have, making it an unambiguous flag for "you are the child".

After a fork, the two processes are independent. If the child changes a variable, the parent's copy is unaffected, and vice versa. They have separate copies of everything.

KEY: After fork(), two identical processes exist, both continuing from the instruction after the fork. They can be told apart only by fork's return value: 0 in the child, the child's PID in the parent. Their memories are separate copies — a change in one is invisible to the other.

Copying a whole address space is expensive, and usually wasteful, because the most common thing a child does next is exec() a different program, throwing the copy away. Modern systems therefore use copy-on-write: after fork, parent and child share the same physical pages, all marked read-only. Only when one of them writes to a page does the kernel copy that single page and give the writer its own version. Pages nobody writes are never copied. The semantics — separate copies — are exactly as described above; copy-on-write is an implementation trick that avoids paying for copies until they are actually needed.

COUNTING PROCESSES: THE FORK ARITHMETIC

GATE's favourite fork question is: given this code, how many processes exist? The method is mechanical once you see why it works.

Each fork() call doubles the number of processes executing the code that follows it, because every process that reaches the fork becomes two. So n fork() calls in straight-line sequence, all executed by every process, produce 2^n processes in total — the original plus 2^n − 1 children.

fork(); fork(); fork();

1. Start: 1 process.
2. After the first fork: 2 processes. Both continue to the second fork.
3. After the second fork: each of the 2 forks, giving 4. All 4 continue to the third.
4. After the third fork: each of the 4 forks, giving 8.

Total processes = 2^3 = 8. Child processes created = 8 − 1 = 7.

Total processes after n sequential forks = 2^n
Children created = 2^n − 1

The same reasoning handles a loop: for (i = 0; i < n; i++) fork(); is n sequential forks, so 2^n processes.

Now the variations that turn the question from trivial to two marks.

fork() inside a condition. In if (fork() == 0) fork(); the first fork makes 2 processes. Only the child (return 0) enters the if and forks again. Total: 3 processes. Trace it: 1 → 2 (parent P, child C) → C forks giving C and C's child → P, C, C' = 3.

Short-circuit operators. In fork() && fork(); the && evaluates its right side only if the left side is true (nonzero). The first fork returns the child's PID (nonzero, true) in the parent and 0 (false) in the child. So the parent evaluates the second fork; the child does not. Total: parent P, its first child C1, and P's second child C2 = 3 processes. With fork() || fork(); it is the reverse: || evaluates the right side only if the left is false (zero), so only the child forks again — again 3, but a different tree shape (P, C, and C's child).

Printing after forks. If a printf follows n forks, it executes once per process: 2^n times. If the printf is between forks, count how many processes exist at that point. In fork(); printf("A"); fork(); the printf runs in 2 processes, so "A" is printed twice, and there end up being 4 processes.

GATE TRAP: The output-buffering trap. printf writes into a buffer in the process's memory, and that buffer is flushed to the terminal only when it fills, when a newline is printed (if stdout is a terminal), or when the process exits. If a process prints something WITHOUT a newline and then forks, the unflushed text is in the buffer — and the buffer is part of the memory that gets copied. Both parent and child now have "A" sitting in their buffers, and both flush it at exit. So printf("A"); fork(); with no newline prints "A" TWICE, even though the printf executed once. With printf("A\\n"); on a terminal the newline forces a flush before the fork, and "A" prints once. When output is redirected to a file, stdout is fully buffered and even the newline does not flush, so it prints twice again. Questions that say "the output is redirected to a file" are pointing at exactly this.

Tree shape versus count. Questions may ask how many children the ORIGINAL process has, rather than how many processes exist. After fork(); fork(); fork(); there are 8 processes, but the original parent made only 3 fork calls itself, so it has 3 direct children. The other 4 are grandchildren and great-grandchildren. Draw the tree if the question asks about relationships rather than totals.

[[FIG:fork-tree]]

REPLACING THE PROGRAM: EXEC

A child that is a clone of its parent is not usually what you want; you want the child to run a different program. That is exec(). The exec family of calls (execl, execv, execvp, and so on) replaces the calling process's entire memory image — text, data, heap, stack — with a fresh one loaded from the named executable file, and starts it from its beginning.

The crucial properties:

• exec() does not create a new process. The PID does not change. It is the same process, now running a different program. This is why "fork then exec" is how a shell runs a command: fork makes a new process, exec makes it run the command.

• A successful exec() never returns. The code after the exec call is gone — it was part of the old image, which has been replaced. If you see code after an exec and wonder when it runs, the answer is: only if the exec FAILED (the file did not exist, permission denied), in which case exec returns −1 and the old program continues.

• Open file descriptors survive exec by default. This is how a shell implements redirection: it opens the file, arranges for it to be descriptor 1 (stdout), then execs the command, which inherits that descriptor and writes to the file without knowing.

The shell's loop is therefore: read a command; fork(); in the child, exec() the command; in the parent, wait() for the child to finish; repeat. Every command you type runs in a fresh process that is a child of the shell.

GATE TRAP: fork() creates a process and returns twice. exec() creates nothing, changes what the current process runs, and on success returns never. A question that says "after exec, the child prints…" is describing an exec that failed.

WAITING, EXITING, ZOMBIES AND ORPHANS

A process ends by calling exit(status) — or by returning from main, which calls exit for it — or by being killed. exit releases the process's resources: its memory, its open files. But it does not immediately delete the process's PCB, and the reason produces two named oddities you must be able to identify.

The parent may want to know how its child finished — the exit status. It gets it by calling wait(), which blocks until some child terminates and then returns that child's PID and status. (waitpid() waits for a specific child.) For the status to be available when the parent eventually asks, the kernel must keep it somewhere after the child has died. It keeps it in the child's PCB.

So a process that has exited but whose parent has not yet called wait() is in a peculiar condition: it has no memory, no open files, it is not running and never will again — but it still has a PCB, still occupies a slot in the process table, still has a PID. This is a zombie. It is dead but not yet reaped. The parent's wait() reaps it: reads the status, and only then does the kernel free the PCB.

A zombie costs almost nothing — just a process-table entry — but a parent that forks many children and never waits accumulates zombies until the process table fills and fork() starts failing system-wide. That is why every fork should be matched by a wait.

The mirror case: what if the parent dies first, while the child is still running? The child is now an orphan — a live process whose parent no longer exists. It cannot be left without a parent, because someone must eventually wait() for it or it will become a permanent zombie. So the kernel re-parents it: the orphan is adopted by init (PID 1), which periodically calls wait() to reap any adopted children that exit. On UNIX, an orphan's getppid() returns 1.

Zombie — child finished, parent alive but has not called wait(). Dead process, PCB still present.
Orphan — parent finished, child still alive. Adopted by init.

GATE TRAP: These are opposites, and questions rely on you confusing them. "A process whose parent has terminated" is an orphan. "A process that has terminated but whose entry remains in the process table" is a zombie. A zombie is removed by its parent calling wait(); killing a zombie does nothing, because it is already dead — you kill its parent, so init adopts and reaps it.

Some systems perform cascading termination: if a parent exits, the OS kills all its descendants rather than orphaning them. UNIX does not do this by default; it re-parents.

USER MODE, KERNEL MODE AND SYSTEM CALLS

Everything above involved the kernel doing things on a process's behalf — creating it, switching it, reaping it. How does control get from a user program to the kernel, and why can a user program not simply do these things itself?

The CPU has (at least) two modes of operation, selected by a mode bit. In kernel mode every instruction is available, including privileged instructions: setting the memory-management registers, enabling and disabling interrupts, issuing I/O commands to devices, halting the CPU, changing the mode bit itself. In user mode privileged instructions are forbidden — attempting one causes a trap into the kernel, which typically kills the offending program.

User programs run in user mode. The kernel runs in kernel mode. This is what makes protection possible: a user program cannot write to another process's memory, because doing so would require changing the memory-management registers, which is privileged. It cannot monopolise the CPU by disabling the timer interrupt, because that is privileged. It cannot read the disk directly, because I/O instructions are privileged. The only way a user program gets any of these things done is by asking the kernel.

Asking the kernel is a system call. Mechanically:

[[FIG:syscall-trap]]

1. The program puts the system-call number (which service it wants) and the arguments in agreed registers or on the stack.

2. It executes a special trap instruction (syscall, int 0x80, svc — the name varies). The trap sets the mode bit to kernel and jumps to a fixed address in the kernel: the system-call handler.

3. The handler looks up the call number in the system-call table, checks the arguments (does this process own that buffer? is that file descriptor open?), and runs the corresponding kernel routine.

4. The routine does the work — in kernel mode, with full privileges — and puts the result in a register.

5. The kernel sets the mode bit back to user and returns to the instruction after the trap. The program continues, now holding the result.

The program never chose where in the kernel to jump; the trap instruction always goes to the same handler, and the handler decides based on the call number. That is what makes it safe: the kernel checks every request. Library functions like printf and fopen are wrappers that eventually make a system call (write, open) this way; the wrapper is ordinary user code, the system call is the crossing.

A system call is one kind of trap, a software-generated interrupt. Hardware interrupts (timer, disk, keyboard) enter the kernel the same way but are caused by devices rather than by an instruction. In both cases the mode switches to kernel; the difference is who asked.

KEY: The mode bit is the foundation of protection. Privileged instructions run only in kernel mode; user programs enter kernel mode only through a trap to a fixed handler that validates what they ask for. Everything the kernel does — create a process, do I/O, allocate memory — is reached this way.

REMEMBER: A mode switch is not a context switch. A system call switches user → kernel → user within the same process. A context switch changes which process is running. Every context switch involves mode switches; most mode switches involve no context switch.

INTERPROCESS COMMUNICATION

Processes have separate memories, which is what keeps them safe from each other. But cooperating processes need to exchange data — a shell piping one command's output into another, a browser with one process per tab reporting back to the main window. There are two fundamental mechanisms, and their trade-offs recur throughout the synchronisation chapter.

Shared memory. Two processes ask the kernel to map the same region of physical memory into both their address spaces. After that, communication needs no kernel involvement at all: one process writes into the region, the other reads it, at ordinary memory speed. That is the advantage — it is the fastest possible IPC. The cost is that the processes must now synchronise themselves: if one is writing while the other reads, the reader may see half-updated data. The kernel set up the region but takes no part in what happens in it. The producer–consumer problem below is the canonical shared-memory example, and the whole of the synchronisation chapter is about doing this safely.

Message passing. The processes never share memory. One calls send(message), the other calls receive(message), and the kernel copies the data from one to the other. Every message costs a system call, so it is slower than shared memory. In return the kernel handles the synchronisation — a receive on an empty mailbox simply waits — and it works between processes on different machines, which shared memory cannot. Message passing is the natural fit for small amounts of data and for distributed systems; shared memory for large volumes on one machine.

Within message passing, several design choices are tested as vocabulary:

• Direct communication names the other process: send(P, msg), receive(Q, msg). A link exists between exactly two processes. Indirect communication goes through a mailbox (or port): send(A, msg), receive(A, msg). Many processes can share a mailbox, and a process can use several.

• Synchronous (blocking) send waits until the message is received; asynchronous (non-blocking) send deposits the message and continues. Blocking receive waits until a message arrives; non-blocking receive returns immediately with either a message or nothing. When both send and receive block, the two processes meet at the exchange — a rendezvous.

• Buffering: zero capacity (no queue; sender must block until receiver takes the message — a rendezvous is forced), bounded capacity (a queue of n messages; sender blocks only when it is full), unbounded capacity (sender never blocks).

Pipes are the UNIX face of message passing. An ordinary pipe is a one-way byte stream between a parent and child: the parent creates it, forks, and one process writes while the other reads. It exists only while those processes do. A named pipe (FIFO) has a name in the file system, can be used by unrelated processes, and persists after they exit.

THE PRODUCER–CONSUMER PROBLEM WITH A BOUNDED BUFFER

This is the first appearance of a problem that runs through the rest of the course, and its shared-memory version contains a detail GATE asks about.

A producer generates items; a consumer uses them. They share a buffer of SIZE slots, used as a circular array, with two indices: in, where the producer will put the next item, and out, where the consumer will take the next one from. Both advance modulo SIZE.

The producer, before inserting, checks whether the buffer is full. The consumer, before removing, checks whether it is empty. With only in and out available, how do you tell full from empty? Both conditions look like "in == out" if you let the buffer fill completely — after SIZE insertions and no removals, in has wrapped all the way round and equals out again, exactly as when the buffer was empty.

The standard solution sacrifices one slot: the buffer is declared full when (in + 1) % SIZE == out, that is, when the producer is one slot behind the consumer. It is empty when in == out. Full and empty are now distinguishable, at the cost that the buffer can hold at most SIZE − 1 items.

Maximum items in the buffer = SIZE − 1

That SIZE − 1 is the tested fact: a bounded buffer of n slots implemented this way holds n − 1 items. If a question wants all n slots usable, a separate counter of items must be added — and that counter, being shared and updated by both processes, is precisely the kind of thing that needs the synchronisation tools of the next chapter but one.

THREADS: DOING SEVERAL THINGS AT ONCE INSIDE ONE PROCESS

A process, as described so far, has one program counter and one stack: it is doing exactly one thing at a time. A word processor that is displaying text, checking spelling and saving a backup all at once would need three processes — three address spaces, three copies of the document, and heavyweight IPC between them. Threads are the answer.

A thread is a unit of CPU execution inside a process. It has its own thread ID, its own program counter, its own register set and its own stack. Everything else it shares with the other threads of the same process: the text (code), the data section, the heap, the open files, the signal handlers. A traditional process is a process with one thread; a multithreaded process has several, all running the same program in the same memory, each at its own point in the code with its own local variables.

Why must each thread have its own stack? Because a stack records where a thread is in its chain of function calls — which function it is in, with what locals, and where to return to. Two threads in different functions cannot share that record. Why must they have their own program counters and registers? Same reason: they are at different instructions. Why CAN they share the heap and the data? Because those hold the process's data, and the whole point is that the threads are working on the same data.

Shared among threads of a process: code, data section, heap, open files, signals, address space.
Private to each thread: thread ID, program counter, registers, stack.

GATE TRAP: A global variable is visible to every thread of the process — one thread writing it is immediately seen by the others, which is both the power and the danger of threads. A local variable is private to the thread that declared it, because it lives on that thread's own stack. A question asking "which of these is shared between threads" is asking you to sort the list into the two lines above.

Why threads rather than processes? Four benefits are standard.

• Responsiveness. An interactive program can keep responding to the user in one thread while another does a long computation. A single-threaded program freezes.

• Resource sharing. Threads share memory automatically; processes must set up shared memory or message passing to do the same.

• Economy. Creating a thread means allocating a stack and a small control block; creating a process means a new address space, page tables, a full PCB. On Solaris, process creation was measured at about 30 times the cost of thread creation, and process context switching about 5 times the cost of thread switching — the latter because, as noted earlier, switching threads within a process does not change the memory map.

• Scalability. On a multicore machine, the threads of one process can run truly in parallel on different cores. A single-threaded process can use only one core no matter how many exist.

CONCURRENCY, PARALLELISM AND AMDAHL'S LAW

Two words that are used loosely and must be kept apart. Concurrency means more than one task is in progress — they take turns, interleaved, and on a single CPU that is all that ever happens: only one instruction executes at a time, but the CPU switches between tasks fast enough that all appear to advance. Parallelism means more than one task is actually executing at the same instant, which requires more than one CPU or core. Parallelism implies concurrency; concurrency does not imply parallelism. A single-core system can be concurrent but never parallel.

How much does adding cores help? Not as much as you might hope, and Amdahl's law says exactly how much. Suppose a fraction S of a program's work is inherently serial — it cannot be split across cores — and the remaining 1 − S can be spread perfectly over N cores. The serial part still takes time S; the parallel part now takes (1 − S)/N. So

speedup ≤ 1 / (S + (1 − S)/N)

Work an example. A program is 75% parallelisable, so S = 0.25. On 2 cores: 1 / (0.25 + 0.75/2) = 1 / (0.25 + 0.375) = 1 / 0.625 = 1.6. On 4 cores: 1 / (0.25 + 0.1875) = 1 / 0.4375 ≈ 2.29. On 16 cores: 1 / (0.25 + 0.047) ≈ 3.37. And as N → ∞, the parallel term vanishes and speedup → 1/S = 4. No number of cores will ever make this program more than 4 times faster, because a quarter of it runs on one core no matter what.

Maximum possible speedup as N → ∞ = 1 / S

REMEMBER: The serial fraction is the ceiling. Halving the serial fraction doubles the maximum achievable speedup; doubling the cores may barely move it. GATE's version of this question gives S and N and asks for the speedup, or gives a speedup and N and asks for S — rearrange the formula.

Parallelism itself comes in two kinds. Data parallelism splits the data across cores, each core running the same operation on its share — summing an array by giving each core a quarter of it. Task parallelism splits the work into different operations, each core running a different one on the same or different data. Real programs mix both.

USER THREADS AND KERNEL THREADS

Here is the distinction on which most thread questions turn. Threads can be supported at two levels.

User-level threads are managed entirely by a library in the process's own address space, with no help from the kernel. The library keeps the thread control blocks, does the scheduling, and performs the switches — all in user mode, with no system calls. The kernel does not know these threads exist; it sees one process.

Kernel-level threads are created and managed by the kernel through system calls. The kernel keeps a control block for each one and schedules them individually. Every modern general-purpose OS — Linux, Windows, macOS — supports kernel threads.

The consequences follow directly from who knows about the threads.

Speed. User-thread operations (create, switch, synchronise) are fast because they are just library calls — no mode switch, no kernel involvement. Kernel-thread operations require system calls and are slower, though still far cheaper than process operations.

Blocking. This is the decisive one. If a user-level thread makes a blocking system call — reads from a slow file, say — the kernel does not know that only one thread wanted to wait. It sees the process making a blocking call, so it blocks the process. Every user thread in it stops, including ones that had plenty of work to do. With kernel threads, the kernel knows which thread blocked and simply runs another thread of the same process.

Multiprocessing. The kernel schedules kernel threads onto CPUs. If a process has only user-level threads, the kernel sees one schedulable thing and runs it on one core. Its user threads can never run in parallel, however many cores the machine has. Kernel threads of one process can be spread across cores.

Scheduling control. A user-level library can implement any scheduling policy it likes for its threads, without kernel changes. Kernel threads get whatever the kernel's scheduler does.

MULTITHREADING MODELS

Since user threads must ultimately run on the CPU, and only the kernel can put things on the CPU, user threads have to be mapped onto kernel threads somehow. There are three models.

[[FIG:thread-models]]

Many-to-one. All the user threads of a process are mapped onto a single kernel thread. This is the pure user-level threading described above: efficient management in user space, but one blocking call blocks everything, and only one thread can be on a CPU at a time. Early Java green threads and Solaris green threads worked this way. It is rarely used now precisely because it cannot exploit multicore.

One-to-one. Each user thread is a kernel thread. A blocking call blocks only that thread; threads run in parallel on multiple cores. The cost is that creating a user thread means creating a kernel thread, and kernel threads consume kernel resources, so the number of threads is usually limited. Linux and Windows use this model.

Many-to-many. The process's user threads are multiplexed onto a smaller or equal number of kernel threads. The library can create as many user threads as it likes, cheaply; the kernel threads run them in parallel up to the number of cores; and if one user thread blocks its kernel thread, the library moves the others to a different kernel thread. It has the flexibility of many-to-one and the parallelism of one-to-one, at the price of complexity. The two-level model is many-to-many plus the ability to bind a particular user thread permanently to a kernel thread.

GATE TRAP: In the many-to-one model, if any thread makes a blocking system call, the whole process blocks — because the kernel has one thread for the process and that thread is now waiting. In one-to-one and many-to-many, only the blocking thread stops. This is asked in some form nearly every year.

Implementing many-to-many well needs the kernel and the library to talk. Scheduler activations do this: the kernel gives the process a set of lightweight processes (LWPs), each backed by a kernel thread, and issues an upcall to the library when something relevant happens — a thread is about to block, so here is a new LWP to run something else on. The library then reschedules its user threads across the LWPs it has.

THREADING ISSUES YOU MUST KNOW

A few consequences of mixing threads with the process operations described earlier are tested directly.

fork() in a multithreaded process. If one thread calls fork(), should the child have all the parent's threads or only the one that called fork? Both are defensible. Some systems provide two versions of fork. The usual rule: if the child is going to exec() immediately, duplicating only the calling thread is right — the other threads' copies would be thrown away by the exec anyway. If the child will continue running the same program, duplicating all threads is right. exec() itself always replaces the entire process, all threads included, with the new program.

Signal handling. A signal (an asynchronous notification — a keyboard interrupt, a segmentation fault, a timer) is delivered to a process. With threads, the question is which thread. Synchronous signals, caused by the thread's own action — dividing by zero, touching invalid memory — go to the thread that caused them. Asynchronous signals — Ctrl-C, kill — may go to every thread, to a designated thread, or to the first thread that is not blocking that signal, depending on the system.

Thread cancellation. Terminating a thread before it finishes. Asynchronous cancellation kills it immediately, which is dangerous — it may be holding a lock or half-way through updating shared data. Deferred cancellation sets a flag; the target thread checks the flag at cancellation points it chooses and exits cleanly when it sees it. Deferred is the default in Pthreads for exactly this reason.

Thread-local storage. Sometimes a thread needs a variable that is global in scope — visible across functions — but private to that thread rather than shared. That is thread-local storage: a global whose value is per-thread. It is different from a local variable (which disappears when the function returns) and from an ordinary global (which every thread shares).

Thread pools. Creating a thread for every incoming request has a cost and no upper bound. A thread pool creates a fixed number of threads at start-up; requests are handed to an idle thread, and if all are busy the request waits. It bounds the number of threads and eliminates per-request creation cost. This is implicit threading — the programmer submits tasks, the runtime manages threads.

Linux does not, at the kernel level, distinguish processes from threads; both are tasks. The clone() system call creates a task and takes flags saying what it shares with its parent — address space, open files, signal handlers. Share everything and you have created a thread; share nothing and clone() behaves like fork() and you have created a process.

WORKED PROBLEMS

Each of these is a pattern that appears in the paper. Follow the working, not just the answer.

1. How many child processes does the following create?
   fork(); fork(); if (fork() == 0) fork();
   Three unconditional forks give 2^3 = 8 processes. The third fork's return is 0 in exactly the 4 processes that are children of that fork (half of the 8). Each of those 4 executes the fourth fork, creating 4 more. Total 12 processes; children created = 11.

2. printf("Hi"); fork(); fork(); — how many times is "Hi" printed, if stdout is a terminal?
   printf executes once, but "Hi" has no newline, so it sits in the buffer. The buffer is copied by each fork. After two forks there are 4 processes, each with "Hi" in its buffer, each flushing at exit. Printed 4 times. With printf("Hi\\n") the newline flushes before the fork and it prints once. With output redirected to a file, no newline flushes, so 4 times either way.

3. A parent forks a child, then the parent exits immediately while the child sleeps for a minute. What is the child's parent PID during that minute? What is the child called?
   The parent is gone, so the child is an orphan. It is adopted by init, so getppid() returns 1.

4. A parent forks a child; the child exits immediately; the parent then loops forever without calling wait(). Describe the child.
   The child has exited but has not been reaped: it is a zombie. Its memory is freed but its PCB and PID remain. It stays a zombie until the parent calls wait() — or until the parent dies, at which point init adopts and reaps it.

5. A program is 90% parallelisable. What is its speedup on 8 cores, and what is the most it can ever achieve?
   S = 0.10. Speedup on 8 cores = 1 / (0.10 + 0.90/8) = 1 / (0.10 + 0.1125) = 1 / 0.2125 ≈ 4.71. Maximum as N → ∞ = 1/S = 10.

6. A process has 5 user-level threads under the many-to-one model on a 4-core machine. One thread issues a blocking read. How many of the process's threads can be executing while the read is outstanding?
   None. The single kernel thread backing the process is blocked in the read, so no user thread can run. The 4 cores are irrelevant to this process — even before the read, at most one of its threads could execute at a time.

7. A context switch takes 5 μs. A round-robin scheduler with a 20 μs time slice runs CPU-bound processes. What fraction of CPU time is overhead?
   Each 20 μs of useful work is followed by a 5 μs switch, so overhead = 5 / (20 + 5) = 20%. With a 200 μs slice it would be 5/205 ≈ 2.4%. This is the quantitative reason time slices are not made tiny — the next chapter builds on it.

WHAT TO CARRY INTO THE NEXT CHAPTER

The scheduler picks from the ready queue; that is where scheduling algorithms live. A process's life is CPU bursts alternating with I/O bursts, and the burst-length distribution shapes the algorithms. A context switch has a real cost, which bounds how small a time slice can sensibly be. And processes — or threads — that share memory must coordinate their access to it, which is the synchronisation chapter. Every one of those follows directly from what a process is.
`
};
