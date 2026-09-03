// Textbook chapter: Virtual Memory.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/os.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure from the figs list below (this chapter also uses the
// topic's own page-fault-sequence and lru-fifo-timeline figures already defined
// in data/questions/os.js — both resolve automatically through the same [[FIG:id]]
// mechanism, since figure lists from both sources are merged before rendering).

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['os-virtual-memory'] = {
  figs: [
    {
      id: 'valid-invalid-bit',
      caption: 'A page table with the valid–invalid bit. Entries marked i point at nothing in memory; touching one traps to the OS.',
      svg: '<svg viewBox="0 0 380 260" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-vib" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g font-size="11" fill="currentColor"><text x="70" y="14" text-anchor="middle">page table</text><text x="300" y="14" text-anchor="middle">memory</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="20" y="24" width="100" height="28"/><rect x="20" y="52" width="100" height="28"/><rect x="20" y="80" width="100" height="28"/><rect x="20" y="108" width="100" height="28"/></g><g font-size="11" fill="currentColor"><text x="70" y="42" text-anchor="middle">0: v, fr 3</text><text x="70" y="70" text-anchor="middle">1: i</text><text x="70" y="98" text-anchor="middle">2: v, fr 1</text><text x="70" y="126" text-anchor="middle">3: i</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="260" y="30" width="80" height="26"/><rect x="260" y="60" width="80" height="26"/></g><g font-size="10" fill="currentColor"><text x="300" y="47" text-anchor="middle">frame 1</text><text x="300" y="77" text-anchor="middle">frame 3</text></g><path d="M120,94 C180,90 220,60 258,50" stroke="currentColor" stroke-width="1.3" fill="none" marker-end="url(#ah-vib)"/><path d="M120,38 C190,34 220,45 258,40" stroke="currentColor" stroke-width="1.3" fill="none" marker-end="url(#ah-vib)"/><path d="M70,66 C70,150 200,190 260,205" stroke="currentColor" stroke-width="1.3" stroke-dasharray="4,3" fill="none" marker-end="url(#ah-vib)"/><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="260" y="196" width="90" height="28"/></g><text x="305" y="214" text-anchor="middle" font-size="10" fill="currentColor">disk (page not resident)</text><text x="20" y="150" font-size="10" fill="currentColor">touching page 1 or 3 traps -- that is a page fault</text></svg>'
    },
    {
      id: 'second-chance-clock',
      caption: 'The clock (second-chance) algorithm. The hand only evicts a page whose reference bit is already 0, clearing 1s to 0 as it passes over them.',
      svg: '<svg viewBox="0 0 300 300" width="100%" style="max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-clk" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.2" fill="none"><rect x="120" y="14" width="60" height="34"/><rect x="230" y="132" width="60" height="34"/><rect x="120" y="250" width="60" height="34"/><rect x="10" y="132" width="60" height="34"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="150" y="35">A  ref=1</text><text x="260" y="153">B  ref=0</text><text x="150" y="271">C  ref=1</text><text x="40" y="153">D  ref=0</text></g><line x1="150" y1="150" x2="150" y2="52" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah-clk)"/><text x="158" y="100" font-size="10" fill="currentColor">hand</text><text x="10" y="298" font-size="10" fill="currentColor">hand sees A(1) -&gt; clears to 0, moves on; sees B(0) -&gt; evicts B</text></svg>'
    },
    {
      id: 'buddy-system',
      caption: 'Buddy-system splitting. A free block halves on demand; on release it recombines with its buddy only if the buddy is also free.',
      svg: '<svg viewBox="0 0 380 200" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.2" fill="none"><rect x="10" y="10" width="360" height="30"/><rect x="10" y="50" width="180" height="30"/><rect x="190" y="50" width="180" height="30"/><rect x="10" y="90" width="90" height="30"/><rect x="100" y="90" width="90" height="30"/><rect x="10" y="130" width="45" height="30"/><rect x="55" y="130" width="45" height="30"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="190" y="29">1024K free</text><text x="100" y="69">512K free</text><text x="280" y="69">512K free (buddy)</text><text x="55" y="109">256K free</text><text x="145" y="109">256K free (buddy)</text><text x="32" y="149">128K</text><text x="77" y="149">128K</text></g><text x="10" y="180" font-size="10" fill="currentColor">a 100 KB request needs the smallest power of two &gt;= it: 128K</text></svg>'
    },
    {
      id: 'working-set-window',
      caption: 'The working set is the set of distinct pages inside a sliding window of the last Δ references.',
      svg: '<svg viewBox="0 0 400 140" width="100%" style="max-width:400px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.2" fill="none"><rect x="10" y="40" width="34" height="30"/><rect x="46" y="40" width="34" height="30"/><rect x="82" y="40" width="34" height="30"/><rect x="118" y="40" width="34" height="30"/><rect x="154" y="40" width="34" height="30"/><rect x="190" y="40" width="34" height="30"/><rect x="226" y="40" width="34" height="30"/><rect x="262" y="40" width="34" height="30"/><rect x="298" y="40" width="34" height="30"/><rect x="334" y="40" width="34" height="30"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="27" y="60">2</text><text x="63" y="60">6</text><text x="99" y="60">1</text><text x="135" y="60">5</text><text x="171" y="60">7</text><text x="207" y="60">7</text><text x="243" y="60">7</text><text x="279" y="60">7</text><text x="315" y="60">5</text><text x="351" y="60">1</text></g><path d="M226,30 L226,20 L368,20 L368,30" stroke="currentColor" stroke-width="1.2" fill="none"/><text x="297" y="14" font-size="10" text-anchor="middle" fill="currentColor">window Δ=4 at t=10</text><text x="10" y="100" font-size="10" fill="currentColor">last 4 references: 7,7,5,1 -- distinct pages {7,5,1} -- working-set size 3</text></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

The memory-management chapter before this one gave every process its own address space through paging: a logical address is a page number and an offset, and a page table translates the page number to a physical frame. That chapter quietly assumed something expensive — that every page of every running process is sitting in physical memory, all the time. Real machines cannot afford that assumption. Virtual memory is what you get when you stop making it.

This chapter takes that one assumption away and rebuilds the consequences from scratch: what it means to run a process most of whose pages are not in memory, what happens the instant it touches one that is not, how the OS decides which resident page to throw out to make room, and what goes wrong — thrashing — when there simply is not enough room to go around. Everything here sits directly on top of paging, and the next chapter (file systems) leans on the disk machinery this one introduces.

WHY VIRTUAL MEMORY

Start from the assumption we are about to drop. If a process must be entirely resident to run, three things follow, and all three are bad.

First, a program cannot be larger than physical memory. A process needing 4 GB simply cannot run on a machine with 2 GB of RAM, no matter how little of that 4 GB it touches on any given run. Many real programs have large pieces — error-handling paths, rarely used menu options, huge arrays that are mostly zero — that are compiled in but rarely executed.

Second, physical memory is divided up among however many processes are resident, so full-residency capping each process at "whatever fits" also caps how many processes fit at once. Fewer resident processes means fewer candidates for the CPU scheduler to pick from when the running one blocks on I/O — worse CPU utilisation, not better.

Third, loading is expensive. Reading an entire program off disk before it can execute even one instruction is disk I/O that may never pay off, because most programs do not touch most of their code on most runs — error paths, and options the user never selects, sit in memory unused.

Virtual memory removes the assumption directly: separate what a process is logically allowed to address (its virtual address space, which can be far bigger than physical memory) from what is actually resident (a subset of its pages, only the ones currently needed). The mechanism that makes this possible is demand paging.

DEMAND PAGING AND THE VALID-INVALID BIT

Ordinary paging already splits a process into fixed-size pages, and gives it a page table mapping page numbers to frame numbers. Demand paging changes exactly one thing: instead of loading every page at process-start, it loads a page into a frame only the first time that page is actually referenced. Everything else about paging is unchanged.

For this to work, the page table needs a way to say "this page is a legal part of the process's address space, but it is not in memory right now." That is the valid-invalid bit, one extra bit per page-table entry.

• v (valid) — the page is in memory. The entry's frame number is meaningful; the hardware can translate the address directly.
• i (invalid) — either the page is a legal page of this process but is not currently resident (it is on disk, waiting to be brought in), or the address is entirely outside the process's address space and there is no page there at all.

[[FIG:valid-invalid-bit]]

When the process starts, every entry is marked invalid — nothing has been loaded yet. The instruction pointer is set to the process's first instruction; as soon as the CPU tries to fetch it, that page is referenced for the first time, and because its entry says invalid, the hardware traps to the operating system.

KEY: Demand paging is not a separate scheme bolted onto paging — it is paging with one extra bit, exploited so that the very first touch of a page is what causes it to be brought in. Nothing is preloaded.

GATE TRAP: An invalid bit does not by itself mean "illegal access." It means "not resident right now," which is usually completely normal — every page starts invalid and becomes valid on its first fault. Whether an invalid reference is legitimate (a page the process is allowed to touch, just not loaded yet) or illegitimate (an address outside the process's space entirely, such as a null-pointer dereference) is something the OS has to check separately, using the process's actual bounds, when it handles the trap.

THE PAGE FAULT SEQUENCE

The trap caused by touching an invalid page is called a page fault. It is not an error in the everyday sense — under demand paging, the first reference to almost every page is, by design, a page fault. What matters is that the OS has a fixed sequence of steps for handling it, and every step exists because skipping it would break something.

[[FIG:page-fault-sequence]]

1. The CPU generates a memory reference to a page whose page-table entry is marked invalid. The hardware, not the OS, detects this — it is built into the address-translation logic that runs on every single memory access — and traps into the operating system, saving enough state (the program counter, the registers) to resume later.

2. The OS checks an internal table (kept per-process, separate from the page table) to determine whether this reference was legal. If the page number is outside the process's declared address space, the reference is not a case of demand paging at all — it is an illegal access, and the process is terminated (typically with a segmentation fault). This check exists precisely so that "invalid because not loaded yet" and "invalid because it should never be dereferenced" are not confused with each other.

3. If the reference is legal, the OS looks for a free frame. If a physical frame is currently unused, it is grabbed immediately. If none is free, the OS must run a page-replacement algorithm to choose a currently resident page to evict, freeing its frame — this is exactly the problem the rest of this chapter is about.

4. The OS schedules a disk operation to read the needed page into the chosen frame. This is by far the slowest step — a disk read takes on the order of milliseconds, roughly five orders of magnitude slower than a memory access — so the OS switches the CPU to another ready process while the read is in progress rather than spinning.

5. When the disk read completes (signalled by an interrupt), the page table is updated: the faulting page's entry is marked valid and given the frame number that now holds it.

6. The instruction that originally caused the fault is restarted from the beginning. The hardware refetches or re-executes it; this time the page-table lookup succeeds, because step 5 just made it succeed, and the instruction runs to completion.

KEY: A page fault is fully transparent to the faulting process. It never sees the trap, never sees the wait for disk, never sees the page table change — it only ever appears to have executed the instruction once, slowly.

THE RESTART-INSTRUCTION PROBLEM

Step 6 sounds trivial — "just run the instruction again" — but it hides a real design problem for one class of instruction: those that touch several bytes of memory in one go, such as a block-move instruction that copies N bytes from one memory region to another, or an instruction with two memory operands.

Suppose a block-move instruction is midway through copying 200 bytes when it faults on byte 150 because that byte's page is not resident. Bytes 0–149 have already been written to the destination. If the instruction is blindly "restarted from scratch," does it re-copy bytes 0–149 as well? That would be safe only if doing so is harmless — and it usually is, since re-copying the same bytes to the same place changes nothing. But if source and destination overlap, blindly restarting from the beginning can corrupt data that the first partial pass already overwrote.

Real architectures solve this in one of two ways. Some CPUs guarantee the instruction is idempotent regardless of overlap, by defining the copy direction so that no byte is ever overwritten before it has been read. Others provide enough saved state (how far the instruction had progressed) for the OS to resume the instruction exactly where it left off rather than from the start. Either way, the guarantee GATE cares about is: the hardware and instruction set are designed so that restart-after-page-fault is always well defined, even for multi-operand and block instructions — it is never left as an unsolved edge case.

GATE TRAP: Do not treat "restart the instruction" as free. It is only safe because the architecture was specifically designed to make it safe. A naive re-execution of a partially completed, overlapping block-move would be a genuine bug, which is exactly why real instruction sets that support such instructions build in idempotence or restartability guarantees.

LOCALITY OF REFERENCE — WHY DEMAND PAGING ACTUALLY WORKS

Demand paging is a bet: that at any moment, a process only needs a small fraction of its pages, so loading pages one at a time on first touch will not fault constantly. The bet pays off because real programs exhibit locality of reference — references cluster, both in space and in time.

Spatial locality: if a program just referenced address x, it is likely to reference addresses near x soon — the next few instructions in a straight-line code sequence, the next few elements of an array being scanned. Temporal locality: if a program just referenced address x, it is likely to reference x again soon — a loop counter, a variable inside a tight loop.

Because references cluster, once the handful of pages a process is currently working with are resident, the vast majority of subsequent references hit those same pages and cause no fault at all. This is pure demand paging: nothing is ever brought in before it is referenced, and locality is what keeps the resulting fault rate low rather than crippling.

REMEMBER: Locality of reference is not a side observation about how programs happen to behave — it is the load-bearing assumption underneath the entire justification for demand paging. Without it, demand paging's fault rate would be too high to be usable, and the whole chapter's central technique would not be worth building.

EFFECTIVE ACCESS TIME

Because a page fault is so much slower than a normal memory access, even a small fraction of references faulting can dominate a process's actual running speed. To reason about this precisely, define the effective access time (EAT): the average time a memory reference takes, averaged over both the fast case (no fault) and the slow case (fault).

Let ma be the time for an ordinary memory access, p be the probability that a given reference causes a page fault (the page-fault rate), and let the time to service a fault — trap overhead, finding/evicting a frame, the disk read, the page-table update, and the restart — be the page-fault service time. A reference either does not fault, with probability (1 − p), costing ma; or it does fault, with probability p, costing the full fault-service time on top of eventually completing the access. Weighting each outcome by its probability and adding gives the average:

EAT = (1 − p) × ma + p × page fault time

Work this with real numbers to see why p has to be tiny. Take the classic figures: memory access time ma = 200 ns, page-fault service time = 8 ms = 8,000,000 ns. Suppose the page-fault rate is p = 1/1000 = 0.001 — one reference in a thousand faults, which sounds rare.

EAT = (1 − 0.001) × 200 + 0.001 × 8,000,000 = 0.999 × 200 + 8,000 = 199.8 + 8000 = 8199.8 ns

That is over 40 times slower than the 200 ns of a plain memory access — from a fault rate of just one in a thousand. The page-fault service time is roughly 40,000 times larger than ma (8,000,000 ÷ 200), so it takes only a tiny probability of hitting it to dominate the average completely.

KEY: Because a page fault is many orders of magnitude slower than a memory access, EAT is extremely sensitive to p near p = 0. Keeping the fault rate low is not a nice-to-have for virtual-memory performance — it is the entire performance story.

SOLVING FOR A TARGET SLOWDOWN

The EAT formula also runs in reverse: given how much slowdown is tolerable, solve for the page-fault rate that must not be exceeded. This is the standard GATE-style inversion of the same formula.

Suppose ma = 200 ns and the page-fault service time is again 8 ms = 8,000,000 ns, and the requirement is that virtual memory must not degrade performance by more than 10% — that is, EAT must be at most 1.10 × ma = 220 ns.

1. Write the EAT equation with the target value substituted: 220 = (1 − p) × 200 + p × 8,000,000.
2. Expand the right-hand side: 220 = 200 − 200p + 8,000,000p.
3. Combine the p terms: 220 = 200 + 7,999,800p.
4. Isolate p: 7,999,800p = 20, so p = 20 / 7,999,800.
5. Simplify: p ≈ 0.0000025, i.e. p must be at most roughly 2.5 × 10⁻⁶ — one fault in every 400,000 references — to keep the slowdown under 10%.

This single computation is why every later section of this chapter — replacement algorithms, frame allocation, the working-set model, thrashing control — exists: they are all mechanisms for keeping the realised page-fault rate down near numbers like 2.5 × 10⁻⁶, because the EAT formula shows that anything looser is unacceptable.

COPY-ON-WRITE AND FORK

fork() creates a child process that is logically a full copy of the parent's address space. The naive implementation — physically copying every page of the parent into a fresh set of frames for the child — is wasteful, because a very common pattern is fork() immediately followed by exec(), which discards the child's copied address space entirely and loads a different program. All that copying would have been for nothing.

Copy-on-write (COW) fixes this by not copying anything at fork time. Instead, the child's page table is set up to point at the exact same physical frames as the parent's page table — the two processes share every page. Both page tables mark these shared pages read-only, regardless of what protection the pages actually had before the fork.

As long as neither process writes to a shared page, sharing is perfectly correct: both are only reading, and reading a page does not need two copies. The moment either process attempts to write, the read-only protection triggers a trap — a protection fault, not a page fault, but handled the same way by the OS. The OS now makes an actual copy of just that one page, gives the writer its own private writable copy, and lets the write proceed. The other process keeps using the original.

This means copying happens lazily, one page at a time, and only for pages that are actually modified after the fork — which, for a fork() immediately followed by exec(), is often no pages at all, since exec() replaces the address space before either process has written anything.

GATE TRAP: Copy-on-write is triggered by a write, not by a fork(). The fork() call itself does zero copying under COW; it only sets up sharing. Students who answer "fork() copies all pages immediately" are describing the pre-COW naive implementation, which real systems no longer use.

WHY PAGE REPLACEMENT IS NEEDED

Demand paging works fine while there are free frames to hand out. Eventually, with enough processes each holding some resident pages, physical memory fills up completely. Now a fault occurs and there is no free frame to put the incoming page into.

The OS must pick some currently resident page — belonging to any process, not necessarily the faulting one — evict it from memory, and reuse its frame for the incoming page. Choosing which page to evict is page replacement, and which page is chosen has a direct, measurable effect on how often faults recur: evict a page that will be needed again in five instructions, and you have merely traded one fault now for another fault very soon.

Before eviction can happen safely, the OS must handle one detail: has the victim page been modified since it was loaded? This is tracked with a dirty bit (also called a modify bit), one extra bit per page-table entry alongside the valid-invalid bit.

• If the dirty bit is 0, the page is unmodified — the copy already sitting on disk is still identical to what is in the frame. The frame can simply be reused; there is nothing to write back.
• If the dirty bit is 1, the page has been written to since it was loaded, so the on-disk copy is stale. The page must be written back to disk before its frame is reused, or the modification is lost.

This halves the disk I/O that eviction costs, on average, for pages that are never written (code pages, read-only data): they can be discarded and, if referenced again later, simply re-read from their original location on disk — no write-back needed because nothing changed. Contrast this with a scheme that always writes every evicted page back "to be safe" — that is one disk operation (read the incoming page) versus two (write the outgoing page, then read the incoming page) for every single fault, regardless of whether the outgoing page was ever touched.

KEY: The dirty bit is what makes eviction of a clean page cost one disk operation instead of two. It is set by hardware automatically on every write and cleared by the OS when a page is loaded or written back.

There is one more constraint page replacement must respect: frame allocation. A process has some number of frames currently assigned to it, decided by the frame-allocation policy (covered later in this chapter), and replacement must decide not just which page to evict, but whose frame it is allowed to take — a decision called global versus local replacement, which we will return to once the algorithms themselves are established.

REFERENCE STRINGS: THE COMMON LANGUAGE FOR COMPARING ALGORITHMS

To compare replacement algorithms fairly, strip a program's execution down to just the sequence of page numbers it references, in order — its reference string — and ask how many faults a given algorithm produces on that string with a given number of frames. Everything that follows uses one running example so the algorithms can be compared head to head:

reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5   (12 references, 3 frames, all initially empty)

FIFO PAGE REPLACEMENT

First-In-First-Out replacement evicts whichever resident page has been in memory the longest, regardless of how recently or how often it has been used since. Implement it with a plain queue: a page is pushed onto the back when it is loaded, and on a fault with no free frame, the page at the front (the oldest) is popped and evicted.

Trace it on the reference string above, one row per reference, writing the frame contents (in load order) after each step:

1. Ref 1 — fault (frames empty). Frames: [1]. Queue: 1.
2. Ref 2 — fault. Frames: [1,2].
3. Ref 3 — fault. Frames: [1,2,3]. All 3 frames now full.
4. Ref 4 — fault, no free frame: evict the oldest, 1. Frames: [2,3,4].
5. Ref 1 — fault (1 was just evicted): evict oldest, 2. Frames: [3,4,1].
6. Ref 2 — fault: evict oldest, 3. Frames: [4,1,2].
7. Ref 5 — fault: evict oldest, 4. Frames: [1,2,5].
8. Ref 1 — hit (1 is resident).
9. Ref 2 — hit.
10. Ref 3 — fault: evict oldest, 1. Frames: [2,5,3].
11. Ref 4 — fault: evict oldest, 2. Frames: [5,3,4].
12. Ref 5 — hit (5 is still resident).

Faults occurred at steps 1,2,3,4,5,6,7,10,11 — nine faults total, out of twelve references.

REMEMBER: FIFO never reorders its queue on a hit. Only loading a new page changes the queue. This is the single fact that distinguishes tracing FIFO from tracing LRU, where a hit does change the bookkeeping.

OPTIMAL (MIN) REPLACEMENT

Optimal replacement — also called MIN, or Belady's optimal algorithm — evicts whichever resident page will not be used again for the longest time into the future, looking as far ahead in the reference string as necessary. A page never referenced again for the rest of the string is the first candidate for eviction, ahead of any page that will be used again no matter how far off.

This requires knowing the future reference sequence, which no real system has while it is running — Optimal cannot be implemented online. Its value is as a lower bound: no algorithm, however clever, can ever produce fewer faults than Optimal does on a given reference string and frame count, so Optimal is the yardstick every practical algorithm is measured against.

Trace it on the same string:

1. Ref 1 — fault. Frames: {1}.
2. Ref 2 — fault. Frames: {1,2}.
3. Ref 3 — fault. Frames: {1,2,3}. Full.
4. Ref 4 — fault. Look ahead from position 5 onward (1,2,5,1,2,3,4,5): 1 is needed at position 5, 2 at position 6, 3 not until position 10 — the farthest away. Evict 3. Frames: {1,2,4}.
5. Ref 1 — hit.
6. Ref 2 — hit.
7. Ref 5 — fault. Look ahead from position 8 (1,2,3,4,5): 1 needed at 8, 2 at 9, 4 not until position 11 — farthest. Evict 4. Frames: {1,2,5}.
8. Ref 1 — hit.
9. Ref 2 — hit.
10. Ref 3 — fault. Look ahead from position 11 (4,5): neither 1 nor 2 is referenced again anywhere in the rest of the string — both have "no future use," which beats any page that will be used again. Evict 1 (either tied candidate works; take the lower-numbered by convention). Frames: {2,5,3}.
11. Ref 4 — fault. Look ahead from position 12 (5): 5 will be used again; 2 and 3 will not. Evict 2 (tie-broken the same way). Frames: {5,3,4}.
12. Ref 5 — hit (5 was kept).

Faults at steps 1,2,3,4,7,10,11 — seven faults, the minimum possible for this string with 3 frames, strictly fewer than FIFO's nine.

GATE TRAP: "Look ahead" means from the position right after the fault, not from the start of the string, and a page with no remaining occurrence at all is always the correct choice to evict — never treat "never used again" as a special case to hand-wave; it is simply the farthest possible future use (infinitely far), which Optimal's rule already handles correctly.

LRU REPLACEMENT

Least Recently Used replacement evicts whichever resident page was referenced least recently — the one that has gone the longest without being touched. It cannot see the future the way Optimal can, but it uses the past as a proxy, on the strength of temporal locality: pages used recently are likely to be used again soon, so a page unused for a long time is a good bet to be genuinely done.

The bookkeeping difference from FIFO is exactly this: LRU must update its recency ordering on every reference, hit or fault, moving the just-touched page to the "most recently used" end. FIFO's queue only changes when a page is loaded.

1. Ref 1 — fault. Frames: {1}. Recency (old→new): [1].
2. Ref 2 — fault. Frames: {1,2}. Recency: [1,2].
3. Ref 3 — fault. Frames: {1,2,3}. Recency: [1,2,3]. Full.
4. Ref 4 — fault: evict LRU = 1 (oldest in recency order). Frames: {2,3,4}. Recency: [2,3,4].
5. Ref 1 — fault (1 not resident): evict LRU = 2. Frames: {3,4,1}. Recency: [3,4,1].
6. Ref 2 — fault: evict LRU = 3. Frames: {4,1,2}. Recency: [4,1,2].
7. Ref 5 — fault: evict LRU = 4. Frames: {1,2,5}. Recency: [1,2,5].
8. Ref 1 — hit. Update recency: move 1 to newest end → [2,5,1].
9. Ref 2 — hit. Update recency: move 2 to newest end → [5,1,2].
10. Ref 3 — fault: evict LRU = 5 (least recently used now, per the updated order). Frames: {1,2,3}. Recency: [1,2,3].
11. Ref 4 — fault: evict LRU = 1. Frames: {2,3,4}. Recency: [2,3,4].
12. Ref 5 — fault (5 was evicted at step 10, not resident): evict LRU = 2. Frames: {3,4,5}.

Faults at steps 1,2,3,4,5,6,7,10,11,12 — ten faults. Notice this is one more than FIFO's nine on this exact string: LRU is not universally better than FIFO, it is better on average across typical reference patterns, and this string happens to be a case where FIFO's ignorance of recency accidentally works in its favour.

[[FIG:lru-fifo-timeline]]

GATE TRAP: Forgetting to update recency on a hit is the single most common LRU tracing mistake. If you only reorder on a fault, you have silently turned LRU back into something closer to FIFO, and every eviction choice after the first hit will be wrong.

TWO WAYS TO IMPLEMENT LRU

Tracing LRU by hand with a recency list is easy; building hardware or software that maintains exact recency on every single memory reference, cheaply, is not. Two implementations achieve exact LRU, and both have a real cost that explains why approximations exist.

Counter implementation: give every page-table entry a logical clock field, and give the CPU a counter that increments on every memory reference. Every time a page is referenced, copy the current counter value into that page's field. To find the LRU page, scan all resident pages and pick the one with the smallest counter value. The cost: a memory write on every single reference (to update the counter field) and a full scan on every eviction.

Stack implementation: keep a stack (conceptually a doubly linked list) of page numbers. On every reference, remove that page number from wherever it currently sits in the stack and push it to the top. The bottom of the stack is always exactly the least recently used page — no scan needed to find it. The cost: every reference, even a hit, requires updating pointers in the linked list, which needs six pointer updates in the worst case (removing a node from the middle and re-inserting it at the top).

Both implementations require special work on every memory reference, not just on faults — that per-reference overhead is what makes exact LRU too expensive to run on ordinary hardware without dedicated support, which motivates the approximations in the next section.

BELADY'S ANOMALY AND STACK ALGORITHMS

Intuition says more frames can only help: with strictly more room to keep pages resident, a replacement algorithm should never fault more often than it did with fewer frames. FIFO breaks this intuition. Trace the same reference string with 4 frames instead of 3:

1. Refs 1,2,3,4 — all fault, filling all four frames. Frames: [1,2,3,4].
2. Ref 1 — hit. Ref 2 — hit.
3. Ref 5 — fault: evict oldest, 1. Frames: [2,3,4,5].
4. Ref 1 — fault: evict oldest, 2. Frames: [3,4,5,1].
5. Ref 2 — fault: evict oldest, 3. Frames: [4,5,1,2].
6. Ref 3 — fault: evict oldest, 4. Frames: [5,1,2,3].
7. Ref 4 — fault: evict oldest, 5. Frames: [1,2,3,4].
8. Ref 5 — fault: evict oldest, 1. Frames: [2,3,4,5].

Count the faults: the four initial loads, then 5,1,2,3,4,5 all fault — that is 4 + 6 = 10 faults with 4 frames, one more than the 9 faults FIFO produced with only 3 frames on the identical string. This is Belady's anomaly: for FIFO, more frames produced more faults.

Why can this happen? The explanation is the stack property. Call an algorithm a stack algorithm if, for every reference string, the set of pages resident with m frames is always a subset of the set of pages resident with m+1 frames, at every point in the execution. Both LRU and Optimal are stack algorithms — you can prove this from how each chooses its victim, since a page evicted with fewer frames available would also have been evicted with more, never the reverse. FIFO is not: which pages are resident with 3 frames is not guaranteed to be a subset of which pages are resident with 4 frames, because FIFO's eviction choice depends only on load order, not on any monotonic property tied to frame count. This is precisely what allows FIFO to occasionally do worse with more room.

KEY: Belady's anomaly is not a general property of page replacement — it is specific to non-stack algorithms, and FIFO is the standard example. LRU and Optimal are mathematically immune: adding frames can never increase their fault count, only decrease it or leave it unchanged.

GATE TRAP: A question that shows FIFO fault counts for two different frame counts on the same string, and asks "what do you notice," is testing exactly this anomaly — always verify by tracing both fully rather than assuming "more frames, fewer or equal faults," which is the safe assumption for LRU and Optimal but not for FIFO.

APPROXIMATING LRU: REFERENCE BITS AND THE CLOCK

Since exact LRU costs too much per reference, real systems approximate it using a single reference bit per page, set by hardware to 1 whenever the page is accessed, and periodically cleared by the OS. A page whose reference bit is still 0 has not been touched since the last clear — a coarse, cheap proxy for "not used recently."

The second-chance (clock) algorithm turns this bit into a practical, low-overhead algorithm. Arrange all resident pages conceptually in a circle, with a single "clock hand" pointing at one of them. To evict a page:

1. Look at the page under the hand. If its reference bit is 0, evict it — this page has not been referenced since it was last checked, so it is a reasonable LRU proxy.
2. If its reference bit is 1, do not evict it. Instead, clear the bit to 0 (give it a "second chance") and advance the hand to the next page, repeating from step 1.

Because the hand only advances past pages with a 1, and clears each 1 it passes, in the worst case every page gets one full pass with its bit cleared before the second pass finds a genuine 0 to evict — so the algorithm always terminates, and it never needs the exact recency ordering that full LRU does.

[[FIG:second-chance-clock]]

Trace a small example: four pages A, B, C, D are resident with reference bits 1, 0, 1, 0 respectively, and the hand currently points at A. A new page E must be brought in.

1. Hand at A, ref bit = 1: clear A's bit to 0, advance the hand to B.
2. Hand at B, ref bit = 0: evict B. E takes B's frame; hand advances to C for the next eviction.

Enhanced second chance sharpens this further by using two bits per page — the reference bit and the dirty (modify) bit — giving four classes, ordered from most to least preferred as an eviction target:

• (0,0) — not referenced, not modified: the best victim. Evicting it costs nothing beyond overwriting the frame.
• (0,1) — not referenced, but modified: a worse victim, since it must be written back to disk before its frame is reused.
• (1,0) — referenced, not modified: a page in active use, but at least eviction would be cheap if it must happen.
• (1,1) — referenced and modified: the worst victim — actively used and expensive to evict.

The clock hand scans for the lowest class present, doing at most a small, fixed number of passes (clearing reference bits as it goes, exactly as in plain second chance) rather than the single-bit version's single class distinction. This is strictly more informed than plain second chance because it also accounts for the cost of eviction (via the dirty bit), not just recency.

COUNTING ALGORITHMS: LFU AND MFU

A different family of approximations keeps a count of how many times each page has been referenced, rather than tracking recency at all.

Least Frequently Used (LFU) evicts the page with the smallest reference count, on the reasoning that a page referenced rarely is probably not important right now. Its flaw: a page that was referenced heavily early in a process's life (building up a large count) but is no longer needed can sit resident indefinitely, since its historical count keeps it looking "important" long after it has stopped being touched — unless counts are periodically aged or decayed.

Most Frequently Used (MFU) evicts the page with the largest reference count, on the opposite reasoning: a page referenced very often has probably already been fully used and, statistically, is the one least likely to be needed again soon, while a page with a low count is probably still being worked through.

Both are rarely used in practice — their fault-rate behaviour is generally worse than LRU or its approximations — but they appear on GATE as items to correctly distinguish from LRU/MRU and from each other: LFU evicts the least-used page, MFU evicts the most-used page, and neither one is "recency" based the way LRU is.

FRAME ALLOCATION

Every algorithm above assumed a fixed number of frames were available to work with. Deciding that number — for each process, out of the total frames physical memory offers — is frame allocation, and it happens before any replacement algorithm ever runs.

There is a hard lower bound on how few frames a process can be given: the minimum is fixed by the instruction set, not chosen freely by the OS. A single instruction may need several pages resident simultaneously just to execute once. Consider an instruction with two memory operands (say, an add from one memory location into another): the instruction itself occupies memory and, if it straddles a page boundary, needs two pages just to be fetched. Each of its two operands can likewise straddle a page boundary, needing two pages each. In the worst case that is 2 (instruction) + 2 + 2 (operands) = 6 frames needed at once, purely to complete one instruction, on an architecture that allows this kind of addressing. Give a process fewer frames than this minimum and it cannot make progress at all — it would fault on some part of the very instruction it is trying to execute, no matter what is evicted.

Above that minimum, how should frames be divided among competing processes? Two policies:

Equal allocation splits the total frames evenly: with m frames and n processes, each gets m/n. This ignores the fact that processes differ wildly in size — a 10-page process and a 500-page process would get the same number of frames, wasting frames on the small one while starving the large one.

Proportional allocation instead gives each process a share proportional to its size. If process i has size sᵢ and the total size across all n processes is S = Σsᵢ, and m total frames are available, process i's allocation aᵢ is:

aᵢ = (sᵢ / S) × m

The reasoning: sᵢ/S is process i's fraction of the total demand for memory, and multiplying by the total supply m gives that same fraction of the total frames — a direct, proportional split of a shared resource.

Worked example: two processes, P1 of size 10 and P2 of size 127, sharing 62 total frames.
1. Total size S = 10 + 127 = 137.
2. P1's allocation = (10/137) × 62 = 620/137 ≈ 4.526, which rounds down to 4 frames.
3. P2's allocation = (127/137) × 62 = 7874/137 ≈ 57.47, which rounds down to 57 frames.
4. Check: 4 + 57 = 61, one frame short of 62 — the rounding-down of two fractional shares leaves a small remainder, typically parked in a free-frame pool or given to whichever process had the larger fractional part.

GATE TRAP: Proportional allocation almost never divides evenly. Always compute both shares and check whether they sum to the total — a leftover of one or two frames from rounding is normal and expected, not a sign of an arithmetic mistake.

GLOBAL VERSUS LOCAL REPLACEMENT

Frame allocation decides how many frames each process gets; it does not, by itself, decide whose frame gets taken when a particular process faults. That is a separate choice, called the replacement scope.

Local replacement restricts a faulting process to evicting only its own currently resident pages. Its allocation therefore stays fixed — the process trades one of its own pages for another, but never touches another process's frames. This makes each process's performance predictable and isolated from what other processes are doing, but it also means a process stuck with too few frames for its own good will keep faulting no matter how much idle memory other processes are holding.

Global replacement lets a faulting process evict any resident page in the system, belonging to any process. This lets frames flow toward processes that currently need them and away from processes that do not, generally improving overall system throughput — but it makes one process's performance depend on the behaviour of every other process, since a process minding its own business can find its pages evicted by an unrelated process's fault. This unpredictability is the direct trade-off against local replacement's isolation.

REMEMBER: "Which algorithm evicts?" (FIFO, LRU, Optimal, clock, ...) and "whose frame can be taken?" (global vs. local) are two independent questions. A system can run LRU with either scope — the algorithm decides which page among the eligible candidates to pick; the scope decides which pages are eligible in the first place.

THRASHING

Now put frame allocation and the CPU scheduler together and watch what happens when allocation goes wrong system-wide, not just for one process.

Suppose the degree of multiprogramming — the number of resident processes — is pushed up, because the OS sees the CPU sitting idle and, reasonably, tries to fix that by admitting more work. But total physical memory is fixed. Adding processes without adding memory means each process's frame allocation shrinks.

Once a process's allocation drops below what it actually needs to run without constant faulting, it starts faulting on nearly every reference — pages it needs are evicted moments after being loaded, because there is no room to keep them resident. The CPU spends its time waiting on disk reads to service these faults rather than executing instructions, so CPU utilisation actually falls, even though the "busy-ness" of the disk subsystem goes up. This is thrashing: the system is doing enormous amounts of paging work and very little useful computation.

Here is the trap that makes thrashing self-reinforcing: the scheduler, monitoring CPU utilisation and seeing it drop, interprets low utilisation as "not enough processes competing for the CPU" — its usual signal to admit more processes. So it admits more, shrinking per-process allocations further, causing more faulting, driving utilisation down further, prompting the scheduler to admit still more. This is a vicious feedback loop, and left unchecked it drives CPU utilisation toward zero while the machine appears to be working furiously.

KEY: Thrashing is defined by falling CPU utilisation despite (or because of) rising multiprogramming — the opposite of what more processes are normally supposed to buy you. The moment naive "utilisation is low, so admit more work" logic is applied without checking whether the fall is caused by thrashing, it makes the problem worse, not better.

Two real defences exist, and both work by making a process's actual memory need visible to the OS, so allocation can be based on need rather than on an arbitrary equal split.

THE WORKING SET MODEL

Denning's working set model defines, for each process, its working set at time t with window size Δ, written W(t, Δ): the set of distinct pages referenced in the most recent Δ memory references made by that process, counting the reference at time t itself.

[[FIG:working-set-window]]

Worked example: a process's reference sequence, in order, is 2, 6, 1, 5, 7, 7, 7, 7, 5, 1 (positions 1 through 10). Compute the working set at t = 10 with Δ = 4.

1. The window covers the most recent 4 references ending at t = 10 — that is positions 7, 8, 9, 10.
2. The references at those positions are 7, 7, 5, 1.
3. Collapse duplicates to get the distinct pages: {7, 5, 1}.
4. Working-set size |W(10, 4)| = 3.

GATE TRAP: Count distinct pages, not references. The window here holds 4 references but only 3 distinct pages, because 7 repeats. And the window is measured backward from t, never forward from the start of the string — reading off the first 4 references (2, 6, 1, 5) instead of the last 4 is the standard mistake this question is designed to catch.

The working-set size WSSᵢ of process i is exactly this — |W(t, Δ)| for process i at the current time — and it tracks the process's actual current memory need far better than a static number ever could, because it moves as the process's own locality shifts (a process working through a tight loop has a small working set; one scanning a huge array has a larger one).

The OS uses this at the whole-system level. Sum the working-set sizes of every currently active process to get the total demand D:

D = Σ WSSᵢ

If D exceeds m, the total number of physical frames available, the system cannot give every process its actual working set — some process is guaranteed to thrash. The working-set model's prescription: rather than let all processes limp along under-allocated, suspend one or more processes entirely (swap them out, freeing all their frames at once) so that every process that remains resident can actually receive its full working set. This deliberately reduces the degree of multiprogramming — exactly the opposite of the naive "low utilisation, add more processes" instinct — and is precisely the discipline that prevents the thrashing feedback loop from starting.

REMEMBER: The working-set model's admission rule is D > m ⇒ thrash. Checking this sum before admitting a new process, rather than after utilisation has already collapsed, is what turns the working-set model into prevention rather than cure.

PAGE-FAULT FREQUENCY

A second, more direct defence skips computing working sets altogether and instead watches each process's actual page-fault rate, adjusting frame allocation as a control loop.

Set an upper bound and a lower bound on an acceptable fault rate. If a process's fault rate rises above the upper bound, it is a sign the process has too few frames for what it is currently doing — give it more frames (taken from elsewhere, or from a free-frame pool). If a process's fault rate falls below the lower bound, it has more frames than it currently needs — take some away and give them to a process that needs them more, or use them to admit another process.

If a process's fault rate remains above the upper bound and there are no free frames left to give it anywhere in the system, that process must be suspended (swapped out entirely) rather than left to fault indefinitely into a memory shortage that giving it one more frame at a time cannot fix. This is the same corrective action the working-set model reaches — reduce multiprogramming — arrived at from watching a rate directly instead of computing a working-set size.

MEMORY-MAPPED FILES

Ordinary file I/O goes through explicit read() and write() system calls, each one crossing into the kernel, copying data between a kernel buffer and the process's own memory. Memory-mapped files offer a different interface: map a file directly into a process's address space, so that a range of virtual addresses corresponds one-to-one with the bytes of the file.

Once mapped, reading the file is nothing more than reading memory at those addresses — no read() call, no explicit buffer. This is virtual memory doing double duty: the mapped pages are handled by exactly the demand-paging machinery already built in this chapter. The first time the process touches a mapped page, it is not resident, so it faults, and the OS's fault handler reads that page's worth of data in from the file (instead of from swap space) to satisfy the fault — same sequence, same page table, same valid-invalid bit, just a different source for the data being paged in.

Writes work the same way in reverse: writing to a mapped page sets its dirty bit, and the OS eventually writes that page back out to the file rather than to swap space. Two or more processes can map the same file, and if they map it to the same underlying frames, this becomes a way to share memory between them directly — a write by one process through the mapping is immediately visible to the other, because they are, physically, looking at the same page.

KEY: Memory-mapped files are not a new mechanism sitting alongside demand paging — they are demand paging with the backing store being a named file instead of anonymous swap space. Everything about the page-fault sequence carries over unchanged.

KERNEL MEMORY ALLOCATION

Everything so far has been about allocating pages to user processes. The kernel itself also needs memory, for data structures whose sizes vary widely — a process control block is a fixed small size, a network buffer might be almost any size — and kernel memory usually cannot be paged out the way user pages can, since kernel code (including the very code that would handle a page fault) must generally stay resident. Two allocators handle this.

The buddy system allocates memory in blocks whose size is always a power of two. To satisfy a request of size s, find the smallest power of two that is at least s, and produce a block of exactly that size by repeatedly splitting a larger free block in half until a block of the right size is reached. Each half produced by a split is the "buddy" of the other half — they were split from the same parent block, and they are the only pair that can ever be merged back into it.

[[FIG:buddy-system]]

Trace it: memory starts as one free block of 1024 KB, and a request for 100 KB arrives. The smallest power of two at least 100 is 128.

1. 1024 KB has no free block of size ≤ 512 to hand out directly, so split it: two buddies of 512 KB each, call them A and B. B stays free untouched.
2. A (512 KB) is still bigger than needed. Split A into two 256 KB buddies, A1 and A2. A2 stays free.
3. A1 (256 KB) is still bigger than needed. Split A1 into two 128 KB buddies, A1a and A1b. A1b stays free.
4. A1a is now exactly 128 KB, the target size — allocate it to the request.

Now suppose the request finishes and A1a is freed. Coalescing reverses the splits, but only where the buddy is also free:

5. A1a is freed. Check its buddy, A1b — free. Merge them back into the 256 KB block A1.
6. Check A1's buddy, A2 — free (it was never touched). Merge into the 512 KB block A.
7. Check A's buddy, B — free (never touched). Merge into the original 1024 KB block. Memory is fully reclaimed, exactly as it started.

The whole scheme's appeal is that finding a buddy to check is pure arithmetic on the block's address (buddies always differ in exactly one address bit, at the position corresponding to their size), so no search through free lists is needed to know whether coalescing is possible. Its cost is internal fragmentation: a 65 KB request still needs a 128 KB block, wasting 63 KB, because only power-of-two sizes exist.

Slab allocation targets exactly this waste for kernel objects that are allocated and freed constantly in large numbers — process descriptors, open-file structures, network packet buffers — all of a single fixed, non-power-of-two size. A slab is one or more physically contiguous pages holding some whole number of pre-initialised objects of one kind, laid out back to back with none of the power-of-two rounding buddy allocation forces.

When a kernel data structure of a given type is needed, the slab allocator hands out one already-initialised object from that type's cache instead of allocating raw memory and running the object's constructor from scratch; when the object is freed, it goes back into the cache in its initialised state, ready to be handed out again without re-initialisation. This eliminates both the internal fragmentation the buddy system would create for oddly sized kernel objects and the repeated initialisation cost of constructing the same kind of structure over and over.

GATE TRAP: Buddy and slab solve different problems and are not competing general-purpose allocators for the same job. Buddy handles allocation of blocks whose size is not known in advance, at the cost of power-of-two rounding; slab handles a fixed, known-in-advance size that recurs constantly, eliminating that rounding entirely for exactly that size.

OTHER CONSIDERATIONS IN VIRTUAL MEMORY SYSTEM DESIGN

A handful of further design choices round out the picture, each trading one cost against another.

Prepaging: pure demand paging brings in one page at a time, each after its own fault, which for a process just starting or just resuming from a full swap-out means a burst of faults in quick succession as its working set is rebuilt one costly disk read at a time. Prepaging bets against pure demand paging on purpose: bring in several pages the process is expected to need — for instance, its entire previous working set, recorded when it was last swapped out — in one batch, before any of them are individually faulted on. It pays off only if most of the prepaged pages are actually used; prepaging pages that turn out unneeded wastes exactly the I/O demand paging was designed to avoid.

Page size is a single number with several dependents pulling in opposite directions. A smaller page size means less internal fragmentation (less wasted space in the last, partially-used page of each region) and a working set that maps more precisely onto actual locality, but it means a larger page table (more entries needed to cover the same address space) and less efficient disk I/O (transferring many small pages costs more in per-transfer overhead than transferring fewer larger ones covering the same bytes). A larger page size flips every one of these trade-offs the other way. There is no page size that wins on every axis at once — real systems pick a size, and increasingly offer a few sizes (regular and "huge" pages), based on which trade-off matters most for the workload.

TLB reach is the total amount of memory that can be addressed without a TLB miss — the product of the number of TLB entries and the page size:

TLB reach = (number of TLB entries) × (page size)

Since the number of hardware TLB entries is limited by chip cost and cannot grow arbitrarily, increasing page size is the practical lever for increasing TLB reach without redesigning the TLB itself — another reason larger pages are attractive for workloads with large, sparse working sets, offsetting page size's fragmentation cost against a real reduction in TLB miss rate.

Program structure affects fault rate directly, because the order a program touches memory in determines how well it aligns with page boundaries and hence with locality. Consider a 128 × 128 array of integers, stored in row-major order, where each row of 128 integers exactly fills one page, and suppose (worst case) only a single frame is available for the array's data.

Traversing it in row-major order — the outer loop over rows, the inner loop over columns, matching how the array is actually laid out — touches all 128 elements of one row consecutively before moving to the next row's page. That is one fault per row, 128 faults total for the whole array, since a row stays resident for all 128 of its own accesses before the next row's fault evicts it.

Traversing the identical array in column-major order — outer loop over columns, inner loop over rows — touches one element from each of 128 different rows before returning to the first row for its second column. With only one frame, every single access is now to a page different from the one just evicted: 128 × 128 = 16,384 faults, one for essentially every element, because the access pattern keeps jumping to a page that was just discarded to make room for the previous access.

Same data, same total number of elements touched, over a hundred-fold difference in fault count, purely from loop order. This is why languages and compilers that guarantee row-major storage make it a real, measurable mistake to write the inner loop over the wrong index for a large array under memory pressure.

I/O interlock: while a page is in the middle of being read from or written to disk, it must not be touched or evicted by anything else — not paged out from under an in-progress read, and not handed to a different process while a DMA transfer is writing into it. Pages actively involved in I/O are pinned (locked in memory, ineligible for eviction) for the duration of the transfer specifically to prevent this kind of corruption; only once the I/O completes are they unpinned and returned to the ordinary pool of pages a replacement algorithm may consider.

WORKED PROBLEMS

Each of these is a shape GATE uses directly. Work through the steps, not just the final number.

1. Reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 with 3 frames — find the FIFO, LRU, and Optimal fault counts.
   FIFO faults at references 1,2,3,4,1,2,5,3,4 (nine total; the walk-through above shows the queue after every step). LRU faults at 1,2,3,4,1,2,5,3,4,5 (ten total — one worse than FIFO here because the two hits on 1 and 2 push 5 to least-recently-used just before 3 arrives, unlike FIFO which evicted 1 at that point). Optimal faults at 1,2,3,4,5,3,4 (seven total, the provable minimum, obtained by always evicting whichever resident page is used furthest in the future). Ranking: Optimal (7) < FIFO (9) < LRU (10) on this specific string.

2. Using the same reference string, what happens to FIFO's fault count if the frame count is raised from 3 to 4?
   Tracing FIFO with 4 frames (shown in full above) gives 4 initial faults to fill the frames, then faults on 5,1,2,3,4,5 — ten faults total, one more than the nine faults FIFO produced with only 3 frames. This is Belady's anomaly: FIFO got worse with more memory, which is possible only because FIFO is not a stack algorithm. Running the same comparison for LRU or Optimal would never show an increase — both are stack algorithms, immune to the anomaly by construction.

3. A system has memory access time ma = 100 ns and page-fault service time = 8 ms. The measured page-fault rate is p = 0.001. Find the effective access time.
   Convert 8 ms to 8,000,000 ns. EAT = (1 − p) × ma + p × (page-fault service time) = 0.999 × 100 + 0.001 × 8,000,000 = 99.9 + 8000 = 8099.9 ns, about 8.1 microseconds — roughly 81 times slower than a plain 100 ns access, from a fault rate of just one in a thousand.

4. With ma = 200 ns and page-fault service time = 8 ms, what is the largest page-fault rate p that keeps EAT within 10% of ma (that is, EAT ≤ 220 ns)?
   Set 220 = (1 − p)(200) + p(8,000,000). Expand: 220 = 200 − 200p + 8,000,000p = 200 + 7,999,800p. So 7,999,800p = 20, giving p = 20/7,999,800 ≈ 2.5 × 10⁻⁶ — one fault in roughly 400,000 references. Anything looser than this and the 10% budget is blown.

5. A process's reference sequence is 2, 6, 1, 5, 7, 7, 7, 7, 5, 1 (positions 1–10). Compute the working set W(t = 10, Δ = 4).
   The window of the 4 most recent references ending at t = 10 is positions 7–10: values 7, 7, 5, 1. Collapsing duplicates gives the distinct set {7, 5, 1}, so |W(10, 4)| = 3 — not 4, because 7 repeats within the window, and not {2,6,1,5}, because the window is measured backward from t, not forward from the start.

6. 62 total frames are to be split between P1 (size 10) and P2 (size 127) by proportional allocation. Find each process's share.
   Total size S = 137. P1 gets floor((10/137) × 62) = floor(4.526...) = 4 frames. P2 gets floor((127/137) × 62) = floor(57.47...) = 57 frames. These sum to 61, one short of 62 — the leftover frame is the standard, expected result of rounding two fractional shares down independently, and is ordinarily parked in a free-frame pool rather than assigned to either process by the formula itself. The formula's job is only to fix the proportional split (4 and 57); what happens to a single leftover frame is a separate, implementation-specific detail.

7. Four resident pages A, B, C, D have reference bits 1, 0, 1, 0 in that order around the clock, with the hand currently on A. A new page must be brought in. Which page does second-chance evict, and where does the hand end up?
   The hand checks A first: reference bit is 1, so it is given a second chance — cleared to 0, and the hand advances to B. At B, the reference bit is already 0, so B is evicted immediately. The hand advances to C for the next eviction. Note that A's bit is now 0 (cleared during this pass), so a future eviction pass could take A next if nothing touches it again in the meantime.
`
};
