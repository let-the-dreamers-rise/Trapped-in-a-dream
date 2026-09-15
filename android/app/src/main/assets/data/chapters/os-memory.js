// Textbook chapter: Memory Management.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/os.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — addr-translation and paging-vs-segmentation are
// already registered on this topic in data/questions/os.js, so they are placed
// here by id without being redefined; two new figures are added below.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['os-memory'] = {
  figs: [
    {
      id: 'hole-list-trace',
      caption: 'The same hole list, allocated by first fit, best fit and worst fit. Each strategy scans and leaves a different shape of leftover.',
      svg: '<svg viewBox="0 0 420 220" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-hole" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g font-size="10" fill="currentColor"><text x="10" y="14">holes, in address order: 100K 500K 200K 300K 600K</text><text x="10" y="40">first fit: scan from the front, take the first hole ≥ request</text><text x="10" y="80">best fit: sort by size, take the smallest hole ≥ request</text><text x="10" y="120">worst fit: sort by size, take the largest hole</text></g><g stroke="currentColor" stroke-width="1.4" fill="none"><rect x="10" y="150" width="20" height="18"/><rect x="30" y="150" width="60" height="18"/><rect x="90" y="150" width="30" height="18"/><rect x="120" y="150" width="40" height="18"/><rect x="160" y="150" width="70" height="18"/></g><g font-size="9" fill="currentColor"><text x="20" y="163" text-anchor="middle">100</text><text x="60" y="163" text-anchor="middle">500</text><text x="105" y="163" text-anchor="middle">200</text><text x="140" y="163" text-anchor="middle">300</text><text x="195" y="163" text-anchor="middle">600</text><text x="10" y="188">requests arrive in this order: 212K, 417K, 112K, 426K</text><text x="10" y="206">only best fit places all four — see the worked problem</text></g></svg>'
    },
    {
      id: 'twolevel-pagetable',
      caption: 'Two-level paging: the outer index picks a page of the outer table, which points at an inner page table, which finally holds the frame number.',
      svg: '<svg viewBox="0 0 420 210" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-2lv" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.4" fill="none"><rect x="10" y="10" width="140" height="24"/><rect x="30" y="60" width="70" height="90"/><rect x="230" y="90" width="70" height="60"/><rect x="330" y="60" width="70" height="90"/></g><g font-size="10" fill="currentColor"><text x="80" y="26" text-anchor="middle">p1 | p2 | offset</text><line x1="50" y1="34" x2="50" y2="58" stroke="currentColor" marker-end="url(#ah-2lv)"/><line x1="110" y1="34" x2="260" y2="88" stroke="currentColor" marker-end="url(#ah-2lv)"/><text x="65" y="80" text-anchor="middle" font-size="9">outer table</text><text x="65" y="95" text-anchor="middle" font-size="9">indexed by p1</text><rect x="35" y="100" width="60" height="14" fill="none" stroke="currentColor"/><line x1="95" y1="107" x2="228" y2="118" stroke="currentColor" marker-end="url(#ah-2lv)"/><text x="265" y="108" text-anchor="middle" font-size="9">entry: base of</text><text x="265" y="122" text-anchor="middle" font-size="9">an inner table</text><line x1="300" y1="118" x2="328" y2="90" stroke="currentColor" marker-end="url(#ah-2lv)"/><text x="365" y="80" text-anchor="middle" font-size="9">inner table</text><text x="365" y="95" text-anchor="middle" font-size="9">indexed by p2</text><rect x="335" y="105" width="60" height="14" fill="none" stroke="currentColor"/><text x="365" y="185" text-anchor="middle" font-size="9">entry: frame number → combine with offset</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

A CPU can only execute an instruction if that instruction's address is in memory right now — memory is the one resource every running process needs a share of. Managing it means deciding where each process's code and data sit, keeping processes from reading or overwriting one another's memory, and making the arrangement work even though physical memory is far smaller than everything programmers would like to run at once.

The previous chapter followed one process through its life; this one asks what "in memory" actually means for that process, and how the hardware and OS cooperate to make several processes coexist safely and efficiently. The ideas here — the split between a logical and a physical address, fixed-size frames instead of one contiguous block, a table that translates one to the other — are exactly the machinery the next chapter (virtual memory) reuses to let a process run without all of it being resident at once. Nothing here is optional background for that chapter; it is the same hardware, examined first with everything present.

WHY MEMORY NEEDS MANAGING AT ALL

Start from what would go wrong with no management at all: every process simply told "here is all of RAM, use it."

Two processes running at once would step on each other. Process A's stray pointer write could land inside process B's data, corrupting it with no error raised anywhere. There is no notion of "this part of memory is not yours" — so the very first job of memory management is protection: giving each process a region it owns and stopping every reference outside that region.

Second, a program cannot generally be written to run only if it happens to load at one specific physical address. If process A occupies addresses 0–50000 today, and tomorrow, after other processes have come and gone, the same program is loaded starting at 80000, its instructions and data references must still work. That need — letting a program's addresses be reinterpreted depending on where it actually landed — is relocation, and it is the reason "logical address" and "physical address" have to be different things at all.

Third, several processes running the same program (ten instances of a text editor, or every process linking the C library) should not need ten independent copies of code that is identical and read-only. Letting them share one physical copy needs a mechanism, and that mechanism has to be able to say "these two different processes' logical addresses point at the same physical memory" without breaking protection for their private data.

KEY: Memory management exists to give each process protection (no other process can touch it), relocation (its addresses do not have to match where it physically landed), and — where useful — sharing (several processes can safely see the same physical memory). Every scheme in this chapter is answering one or more of those three needs.

LOGICAL VERSUS PHYSICAL ADDRESSES, AND THE MMU

Once protection and relocation are the goal, the CPU cannot be allowed to use the addresses in a program's machine code directly as physical memory addresses — those addresses were fixed by the compiler or linker long before anyone knew where in RAM the process would end up, and letting them go straight to the memory bus gives a process no fence at all.

So a distinction is drawn. A logical address (also called a virtual address) is the address the CPU generates while a program runs — what appears in its instructions. A physical address is the address that actually goes out on the memory bus to RAM. The set of all logical addresses a process can generate is its logical address space; the set of physical addresses it actually occupies is its physical address space.

Something has to convert one into the other, on every single memory reference, fast enough not to cripple performance and strictly enough that a process cannot forge its way outside its own region. That piece of hardware is the memory management unit, the MMU. Everything else in this chapter — base/limit registers, paging, segmentation — is a specific design for the MMU: a specific rule for turning a logical address into a physical one, plus a specific way of checking that the reference was legal.

KEY: Logical addresses are what the program sees and generates; physical addresses are what the memory hardware sees. The MMU sits between them on every reference, translating and checking. A user-mode program never gets to see or set the real physical address directly — only the OS can.

BASE AND LIMIT REGISTERS: THE SIMPLEST POSSIBLE MMU

Before building anything as elaborate as paging, look at the smallest MMU that gives both protection and relocation, because every later scheme is a refinement of the same two-register idea.

Give each running process two hardware registers, loaded by the OS (in kernel mode only) at the moment that process starts running: a base register holding the physical address where this process's memory begins, and a limit register holding the size of that process's region.

Every logical address L the CPU generates is checked and translated by the hardware in one step:

1. Check 0 ≤ L < limit. If this fails, the reference is outside the process's allotted memory: the hardware raises a trap (an addressing error) to the OS, which normally kills the process. This is the protection half.
2. If the check passes, compute the physical address as physical = base + L. This is the relocation half — the same logical address 0 always means "the start of my region," wherever that region actually is.

Notice both needs from the previous section are answered by exactly two registers and one comparison plus one addition, done by hardware on every reference so it costs no extra memory access.

physical address = base + logical address, valid only if 0 ≤ logical address < limit

Example. A process has base = 100000 and limit = 5000. Logical address 2000 is valid (0 ≤ 2000 < 5000) and maps to physical address 102000. Logical address 6000 fails the check (6000 is not < 5000) and traps — even though physical address 106000 might well be free RAM, this process has no right to it.

GATE TRAP: The bounds check compares the logical address (or offset) against the limit — never against base + limit and never against the physical address. Students who "simplify" by checking the physical address against base + limit get the arithmetic to work by coincidence on easy numbers and then fail the moment the numbers do not; always check the logical value first, before adding base.

The weakness of base-and-limit is exactly its simplicity: one contiguous region per process. That single register pair cannot express "share this part but not that part," or "this process's memory is scattered across several disjoint chunks of RAM." Paging and segmentation are both answers to that weakness — a more expressive MMU, at the cost of a more expensive translation. Keep the base/limit idea in mind, though: paging's translation is a base-and-limit check performed per page instead of once per process.

ADDRESS BINDING: WHEN DOES A LOGICAL ADDRESS BECOME A PHYSICAL ONE?

Base-and-limit relocation is only useful if the process's addresses genuinely stay "logical" — expressed relative to a base — right up until the moment they are actually needed. Whether that is true, and when the binding to a real address happens, can be fixed at three different points, and the choice has real consequences.

Compile time. If the compiler already knows exactly which physical address the process will occupy, it can emit absolute physical addresses directly — no translation needed at run time at all. This is only possible if you can guarantee, in advance, no other process will ever want that exact address range, which is unrealistic for general-purpose multiprogramming; it survives today mainly in small embedded systems with one fixed program. If the load address ever needs to change, the entire program must be recompiled.

Load time. If the physical address is not known at compile time but is fixed once and for all when the program is loaded into memory, the compiler generates relocatable addresses — offsets from an unknown base — and the loader binds them to real addresses at load time. Once loaded, the process cannot be moved without redoing the binding, but the compiler no longer needs to know the destination in advance.

Execution time (dynamic binding). If a process must be allowed to move in physical memory even after it starts running — because the OS wants to swap it out and back to a different location, for instance — binding has to be deferred all the way to each individual memory reference, checked and translated afresh every single time. This needs hardware support: exactly the base-and-limit MMU (or paging, or segmentation) described above, where the OS can change the base register (or the page table) whenever it relocates the process, and every subsequent reference is automatically translated relative to the new location. This is what virtually every general-purpose OS uses, because it is the only one of the three that tolerates a process moving during its lifetime.

KEY: Compile-time and load-time binding fix a process's physical location once; execution-time binding re-derives the physical address on every reference through hardware (base/limit, or a page/segment table), which is the only option that lets the OS relocate a running process. Paging and segmentation are execution-time binding schemes.

DYNAMIC LOADING AND DYNAMIC LINKING

Two techniques that look similar — both "defer something until it is actually needed" — but defer different things, and confusing them is one of the most common mix-ups in this material.

Dynamic loading defers when a routine is brought into memory. A program's error-handling code, say, might run in fewer than one execution in a hundred. If the whole program including all such rarely used routines must be loaded before anything runs, memory is wasted holding code that most runs never touch. With dynamic loading, a routine stays on disk until the first call to it; the call goes through a small stub that loads the routine into memory, updates the process's own address table to record where it now is, and jumps to it. Every later call to the same routine goes straight there — no wasted memory for routines never actually called, and no OS involvement is strictly required, since this can be implemented entirely by how the program and its loader are structured.

Dynamic linking defers when a routine is bound to the calling program at all — specifically, when shared library code (like the C standard library) is combined with the program. Static linking copies the library's code into every executable that uses it; if a hundred programs statically link the same library, there are a hundred copies of it, one inside each executable, and fixing a bug in it means relinking every one of those hundred programs. Dynamic linking instead leaves a small stub in the executable in place of the library call. The first time that stub runs, it locates the shared library's code already resident in memory (or loads it if this is the first process on the system to need it), replaces itself with the real address, and jumps there. Every process using the library shares one physical copy of its code — this is precisely the sharing need from the opening section, and it is why shared libraries are sometimes called dynamic-link libraries.

The direct payoff of dynamic linking: a bug fix or performance improvement to the shared library, as long as the interface (the routines' names and calling conventions) does not change, updates every program that uses it the next time each one runs — none of them need to be relinked, because none of them contain a copy of the library's code to begin with. Versioning is needed so a program compiled against an old interface can still find a compatible version if the library is later updated in an incompatible way.

GATE TRAP: Dynamic loading is about a routine within one program not being loaded until called; it needs no special OS support. Dynamic linking is about a library shared across programs not being copied into each executable, being resolved to one shared physical copy at run time; it typically does need OS support (to locate and map the shared library into each process). They are answers to different problems and one does not imply the other.

SWAPPING

Even with relocation solved, physical memory can still be smaller than the total memory demanded by every process that currently exists on the system. Swapping is the technique of temporarily moving an entire process out of main memory to a backing store (typically part of disk) and back in later, so that memory currently held by an idle process can be given to one that is ready to run.

The simplest picture: a process p1 is running; the scheduler decides p2, currently on the swap area, should get a turn; p1 is swapped out to disk (a swap out), and p2 is swapped in to the space it vacates (a swap in). Because the process may not be swapped back to the same physical location it left, its address binding must be execution-time (dynamic) — exactly the requirement discussed above.

Swapping an entire process is expensive: the transfer time is proportional to the amount of memory being moved, and while it is in flight neither copy of the process can usefully run. A process with 100 MB resident takes far longer to swap than one with 1 MB, and that time is pure overhead added on top of the context switch. This cost is precisely what motivates swapping only *parts* of a process — its individual pages — instead of the whole thing at once, which is exactly the machinery the virtual memory chapter builds on top of paging.

KEY: Swapping trades memory for time — moving an idle process's whole footprint to disk frees that memory for someone else, at the cost of a transfer proportional to its size. Later chapters replace "swap the whole process" with "page out only what is not currently needed," using the same disk-backing idea at a much finer grain.

CONTIGUOUS ALLOCATION

The most direct way to satisfy a process's memory request is contiguous allocation: give the process one single unbroken block of physical memory large enough for the whole thing. It is the natural starting point, and its failure modes are what drive the rest of the chapter.

Fixed partitioning divides memory in advance into a small number of partitions of fixed size (possibly all equal, possibly a mix of sizes chosen up front) and never changes those boundaries while the system runs. A process is loaded into any free partition big enough for it. This is simple and the bookkeeping is trivial — a partition is either free or holds exactly one process — but it has an immediate flaw: if a process is smaller than the partition it is placed in, the unused remainder of that partition is wasted, because no other process can use it while this one occupies the partition. That wasted space, inside an allocated unit, is internal fragmentation, defined properly a few sections on. Fixed partitioning also caps the number of processes that can ever run at once at the number of partitions, however small each process is.

Variable partitioning removes that fixed grid: memory starts as one large block of free space, and each process, on arrival, is given a partition exactly the size it asked for, carved out of whichever free block the allocator chooses. No space is wasted inside a partition — a process gets exactly what it needs. But as processes come and go, memory breaks up into an interleaved pattern of occupied blocks and free holes of assorted sizes. A new request must now be matched against this list of holes, and a hole that is technically "free" may simply be the wrong size for what just arrived. That is external fragmentation, and it is unavoidable in pure variable partitioning no matter how cleverly the allocator chooses which hole to use — it can only be made better or worse, not eliminated. Making the choice of which hole to use is exactly the allocation-strategy problem taken up next.

THE ALLOCATION STRATEGIES: FIRST FIT, BEST FIT, WORST FIT, NEXT FIT

Given a list of free holes and an incoming request, which hole should be chosen? Four standard policies answer this differently, and GATE traces them by hand, so this section runs the same starting hole list through all four and compares the leftovers.

Take memory with holes, listed in address order: 100K, 500K, 200K, 300K, 600K. Requests arrive in this order: 212K, 417K, 112K, 426K. Each strategy below starts fresh from this same original list — one strategy's choices must never leak into another's trace.

First fit scans the holes in address order and allocates the first one large enough for the request, stopping the search the instant it finds one.

1. 212K: scan from the start — 100K too small, 500K fits. Allocate; the 500K hole becomes an occupied 212K block plus a leftover hole of 500 − 212 = 288K.
2. 417K: scan from the start — 100K too small, the 288K leftover too small, 200K too small, 300K too small, 600K fits. Allocate; leftover 600 − 417 = 183K.
3. 112K: scan from the start — 100K too small, 288K fits. Allocate; leftover 288 − 112 = 176K.
4. 426K: scan the remaining holes — 100K, 176K, 200K, 300K, 183K — none reach 426K. This request fails.

Best fit sorts the holes by size and allocates the smallest hole that is still large enough, so the leftover from this particular allocation is as small as possible.

5. 212K: candidates ≥ 212K are 500, 300, 600, 200(too small — 200 < 212). Smallest that fits is 300K. Allocate; leftover 300 − 212 = 88K.
6. 417K: candidates ≥ 417K are 500K and 600K. Smallest is 500K. Allocate; leftover 500 − 417 = 83K.
7. 112K: candidates ≥ 112K are 200K, 600K, 88K(too small), 83K(too small). Smallest is 200K. Allocate; leftover 200 − 112 = 88K.
8. 426K: only 600K is ≥ 426K. Allocate; leftover 600 − 426 = 174K. All four requests succeed.

Worst fit sorts by size the other way and always allocates the largest available hole, on the reasoning that a large leftover is more likely to still be useful later.

9. 212K: largest hole is 600K. Allocate; leftover 600 − 212 = 388K.
10. 417K: largest remaining is 500K. Allocate; leftover 500 − 417 = 83K.
11. 112K: largest remaining is 388K. Allocate; leftover 388 − 112 = 276K.
12. 426K: remaining holes are 100K, 83K, 200K, 300K, 276K — none reach 426K. This request fails, exactly like first fit.

Next fit behaves like first fit — take the first hole encountered that is large enough — except the search resumes each time from wherever the previous allocation left off, instead of restarting at the front of the list, wrapping around to the start once it passes the end.

13. 212K: pointer starts at 100K (too small), moves to 500K (fits). Allocate; leftover 288K. Pointer now sits at this hole.
14. 417K: resume from there — 288K too small, 200K too small, 300K too small, 600K fits. Allocate; leftover 183K. Pointer now here.
15. 112K: resume from there — 183K fits. Allocate; leftover 71K.
16. 426K: resume from there — 71K too small; wrap around — 100K, 288K, 200K, 300K, none reach 426K. Fails, same outcome as first fit here.

[[FIG:hole-list-trace]]

Only best fit places every request on this particular sequence, leaving final holes of 100K, 88K, 83K, 88K, 174K — five small, scattered pieces totalling 533K, none individually anywhere near as large as the 426K that would still fit a fresh large request. That total shows external fragmentation directly: 533K of memory is free, more than enough in aggregate for many further requests, and yet no single leftover piece is big.

REMEMBER: Simulate first fit, best fit and worst fit as three independent traces starting from the same original hole list. First fit always scans from the front and stops early; best/worst fit re-scan every hole every time because they must find an extreme (smallest or largest), which is also why first fit is the fastest of the three for a single allocation — it can terminate its search immediately, while best and worst fit have no shortcut and must examine the whole list.

GATE TRAP: "Best fit minimises waste" sounds like it should always win, but it is exactly best fit's tight fits that tend to leave many small, useless slivers behind (88K, 83K, 88K above) — worst fit's large leftovers are individually more useful, yet worst fit is empirically the poorest performer of the three over many allocations, because it also rapidly destroys the large holes a future big request would need. Do not reason from the name to the outcome; trace it.

INTERNAL AND EXTERNAL FRAGMENTATION, THE 50-PERCENT RULE, AND COMPACTION

The word "fragmentation" covers two genuinely different phenomena, and every question about it turns on telling them apart.

Internal fragmentation is memory wasted inside an allocated unit, because the allocator hands out memory in chunks coarser than what was actually requested. A fixed 1MB partition given to a process that only needs 600KB wastes 400KB that partition holds but cannot give to anyone else, since it belongs to this process even though this process will never touch it. A process needing 4097 bytes under 4KB pages is handed two full pages (8192 bytes) and wastes 4095 of them — nearly an entire extra page — because the page is the smallest unit the allocator can give out.

External fragmentation is memory wasted between allocated units: memory that is free, in total more than enough for a pending request, but scattered across holes each individually too small. The best-fit trace above ended with 533K free and yet could not satisfy a 426K request drawn from a single hole — that is external fragmentation exhibited directly.

GATE TRAP: These are not "the same wasted-memory idea named differently." Internal fragmentation is waste *inside* a block already given to a process; external fragmentation is waste *between* blocks, in memory nobody currently owns. Paging (fixed-size units) trades away external fragmentation but keeps a small amount of internal fragmentation in the last page of each process; pure segmentation and variable partitioning trade away internal fragmentation (segments/partitions are sized exactly to what is requested) but keep external fragmentation. Neither scheme eliminates fragmentation outright — each simply chooses which kind it is willing to live with.

The 50-percent rule is a long-standing statistical result (from analysis under first-fit allocation with certain assumptions about the distribution of block sizes and request patterns) stating that, once a system has settled into steady state, for every N blocks currently allocated, roughly an additional 0.5N blocks' worth of space is lost to fragmentation — meaning that for every two blocks of usable memory handed out, memory equivalent to about one more block has effectively become unusable due to scattering. It is a rule of thumb, not a guarantee for any specific input (the worked trace above is a small, specific case, not the statistical average), but it is the standard argument for why even careful contiguous allocation strategies waste a real, predictable fraction of memory over time.

50-percent rule: with N allocated blocks under first fit, about 0.5N blocks' worth of memory is typically lost to fragmentation

External fragmentation, once it exists, can be attacked directly by compaction: shuffle the occupied blocks in physical memory so that all the free space is combined into one large contiguous block, exactly as a disk defragmenter combines scattered free clusters. Compaction is only possible when addresses are bound at execution time (relocation registers can simply be updated to the process's new location after the move); it cannot be done with compile-time or load-time binding, since those addresses are fixed and moving the process would break every reference inside it. The cost of compaction is the time to physically copy the data — proportional to how much memory must be moved — so it is not free, and a system typically compacts only occasionally rather than after every allocation, or moves only as much as is needed to free one hole large enough for the pending request (rather than always fully consolidating everything).

Internal fragmentation, by contrast, cannot be fixed by compaction or any other rearrangement, because the wasted space is inside a block that already belongs entirely to one process — there is nothing "between" blocks to consolidate. The only ways to reduce it are to shrink the allocation granularity (a smaller page size wastes less in the last page, at the cost of a larger page table, discussed shortly) or to avoid fixed-size units altogether, which is exactly what segmentation does, at the cost of bringing external fragmentation back.

PAGING, FROM SCRATCH

Contiguous allocation's problem, in one sentence: a process's memory must be one unbroken block, and unbroken blocks of the right size are exactly what a busy system runs out of. Paging removes the "unbroken" requirement altogether.

Divide a process's logical address space into equal-size chunks called pages. Divide physical memory into chunks of the exact same size called frames. Now allocation means: for every page a process needs, find any free frame anywhere in physical memory and put that page there. The frames used by one process need not be adjacent to each other at all — page 3 might sit in frame 917 and page 4 in frame 12, with unrelated processes' pages in between.

Why does this remove external fragmentation? External fragmentation exists because a request needs a single hole of a particular size and none of the scattered free holes happens to be that size. Under paging, a request is never for "one region of size S" — it is always for "enough individual frames to hold this many pages," and any free frame, wherever it sits, can serve any page. There is no such thing as "a hole too small to use," because the unit being allocated (one frame) is the same size as every other free unit. The free-space bookkeeping becomes trivial: a bitmap or free list of frame numbers, with no concept of hole sizes at all.

KEY: Fixed-size frames eliminate external fragmentation because allocation no longer needs one contiguous region — every frame is interchangeable, so any free frame anywhere satisfies any page. The price is internal fragmentation in the process's last page, addressed below, which is a far smaller cost than the external fragmentation it replaces.

THE PAGE NUMBER AND OFFSET SPLIT

If pages and frames are the unit of allocation, a logical address needs to say two things: which page this byte is in, and how far into that page it is. Paging derives both fields directly from the page size, and this derivation is worth doing slowly because every page-table-size question depends on getting it exactly right.

Suppose the page size is 2^d bytes. Every byte inside one page needs a distinct offset value, from 0 up to (page size − 1), and the number of bit patterns needed to distinguish page size = 2^d values is exactly d bits. So the offset field is the low-order d bits of the logical address — always, with no exception, because it is defined directly from the page size, not from anything about the process.

d = page-offset bits = log2(page size)

Whatever bits of the logical address are left above the offset field name the page: if the whole logical address is L bits wide, the page-number field is the remaining L − d high-order bits, and the number of distinct pages a logical address space can express is 2^(L − d).

Worked check: a 32-bit logical address (L = 32) with a 4KB page (page size = 2^12, so d = 12). Offset = 12 bits. Page number = 32 − 12 = 20 bits, so there are 2^20 pages — about a million — each of 4KB, and 2^20 × 2^12 = 2^32 bytes checks out against the original 4GB address space.

Translation, given this split, is mechanical:

1. Take the logical address; split off its low d bits as the offset, and its remaining high bits as the page number p.
2. Use p to index the page table (one entry per page, kept in memory, one per process) and read out the frame number f stored there.
3. Physical address = f × (page size) + offset — the frame number gives which frame in physical memory, scaled up to a byte address, and the same offset that located the byte within the logical page locates it within the physical frame, because both are the same size.

physical address = (frame number × page size) + offset

Worked example. Page size 1KB (1024 bytes, so d = 10). A process's page table says logical page 3 maps to physical frame 7. What physical address does logical address 3172 correspond to?

4. Split 3172 by the page size: page number = ⌊3172 / 1024⌋ = 3, offset = 3172 − 3×1024 = 3172 − 3072 = 100. (Dividing by the page size and taking the remainder is arithmetically the same operation as splitting off the low d bits — it is just easier to see written as division when the page size is not a clean power-of-two-in-your-head number.)
5. Look up page 3 in the page table: frame 7.
6. Physical address = 7 × 1024 + 100 = 7168 + 100 = 7268.

[[FIG:addr-translation]]

GATE TRAP: The frame number must be scaled by the page size before the offset is added — physical address is frame × page size + offset, never frame concatenated with offset by writing the digits together, and never frame + offset without the multiplication. Skipping the multiplication is the single most common numerical slip in this topic.

PAGE TABLE SIZE — WORKED VARIANTS

Every page needs an entry in the page table recording its frame number (plus a few status bits, discussed below), so the page table's total size is simply the number of pages times the size of one entry — but "number of pages" already depends on the page-number field width just derived, so the two results chain directly.

page table size = (number of pages) × (size of one page table entry)

Variant 1 — the standard 32-bit case. 32-bit logical address, 4KB (2^12) pages, 4-byte page table entries. Offset = 12 bits (from the page size), page number = 32 − 12 = 20 bits, so there are 2^20 pages. Page table size = 2^20 × 4 bytes = 2^20 × 2^2 = 2^22 bytes. Since 2^20 bytes = 1MB, 2^22 bytes = 4 × 2^20 = 4MB.

Variant 2 — same address space, smaller page. Keep the 32-bit address but shrink pages to 1KB (2^10). Offset = 10 bits, page number = 32 − 10 = 22 bits, so 2^22 pages. Page table size = 2^22 × 4 = 2^24 bytes = 16MB. Smaller pages mean more of them, so the table itself grows — smaller pages reduce internal fragmentation (a smaller last-page waste) but cost more page-table memory, and this is a genuine trade-off, not a free improvement.

Variant 3 — the 64-bit case that breaks a flat table. A single-level table scales with the number of pages, and the number of pages grows exponentially with the address width. Take a 52-bit page-number field (a 64-bit address with a 12-bit, 4KB-page offset gives exactly 64 − 12 = 52) and an 8-byte entry. Page table size = 2^52 × 8 = 2^52 × 2^3 = 2^55 bytes. That is 2^55 / 2^30 = 2^25 GB — over 33 million gigabytes, per process, just for the page table — utterly impossible to hold in memory, let alone contiguously. A flat, single-level page table simply cannot scale to a wide address space; something has to be done about the table's own size, which is exactly the motivation for hierarchical paging, taken up next.

REMEMBER: Page table size always follows the same two-step chain — first get the page-number bit width from (total address bits − log2(page size)), then multiply 2^(that width) by the entry size. Skipping straight to a memorised "4MB" answer fails the instant the page size, address width, or entry size changes.

INTERNAL FRAGMENTATION IN PAGING

A process's memory need rarely divides evenly into whole pages. If a process needs, say, 4097 bytes and the page size is 4096 bytes, it is given two whole pages (8192 bytes), because a page is the smallest unit the system can hand out, and the second page is used for just 1 byte — 4095 bytes of that page are allocated to this process and unusable by anyone else. This is internal fragmentation, and it occurs only in the last page of each process (every earlier page is filled completely, by construction, since the process's data is laid out page by page from the start).

On average, across many processes with memory needs that fall randomly between whole multiples of the page size, the wasted space in that last page runs uniformly from 0 (the process's need happens to end exactly on a page boundary) up to just under one full page (the need is one byte more than a whole number of pages). The average of a value spread evenly across that range is half of it.

average internal fragmentation per process ≈ (page size) / 2

This is the quantitative reason page size cannot simply be shrunk to zero to eliminate all fragmentation: halving the page size halves this average waste, but — as Variant 2 above showed — it doubles the number of pages and therefore roughly doubles the page table's own memory cost. Real systems pick a page size (commonly 4KB, sometimes offering larger "huge pages" for specific workloads) balancing these two costs against each other.

PAGE-TABLE HARDWARE: THE TWO-MEMORY-ACCESS PROBLEM

The translation walked through above needs the page table itself to be read on every single memory reference the CPU makes — and the page table lives in main memory, just like everything else. So a naive implementation of paging costs two full memory accesses for every reference the program makes: one to read the page table entry and find the frame number, and a second to actually fetch the instruction or data at the translated physical address. That doubles effective memory access time before the program has done any real work, on every access, forever — clearly unacceptable if left unaddressed.

The OS keeps track of where each process's page table lives in physical memory using a dedicated hardware register, the page table base register (PTBR), which is switched, along with everything else, on every context switch — this is exactly analogous to the base register introduced earlier, except now it points at a table rather than at the process's memory directly.

The fix for the doubled cost is a hardware cache, exactly as caches solve the analogous problem for ordinary memory access: keep the handful of most recently used page-number-to-frame-number translations in a small, very fast piece of associative hardware, so that most of the time the page table in memory need not be consulted at all. That cache is the translation lookaside buffer, the TLB.

THE TLB AND EFFECTIVE ACCESS TIME

The TLB is searched associatively — given a page number, it checks all its entries simultaneously and returns the matching frame number (or a signal that there is no match) far faster than an ordinary memory access, because it is small, specialised hardware, not a location in RAM.

On a TLB hit, the page number's frame is already in the TLB: no page-table access in memory is needed at all, and the reference proceeds straight to the one memory access for the actual data, after the TLB lookup itself.

On a TLB miss, the frame number is not cached; the hardware (or, on some architectures, OS software) must fall back to the full page-table walk in memory to find the frame number, then proceed to the memory access for the actual data — the TLB is then updated with this new translation so a repeat reference to the same page will hit.

The fraction of references that hit the TLB is its hit ratio, h (a number between 0 and 1, often expressed as a percentage). Since most programs reuse a small number of pages heavily over short stretches (locality of reference — the same idea that makes ordinary caches work), h is typically high, often well above 90%.

Let t be the TLB lookup time and m be one main-memory access time. Derive the average — the effective access time, EAT — as the probability-weighted sum of the two cases:

1. Hit case cost: the TLB lookup, t, plus the one memory access to fetch the actual data, m. Total t + m.
2. Miss case cost: the TLB lookup that misses, t, plus the memory access to read the page table entry, m, plus the memory access to fetch the actual data, m. Total t + 2m.
3. Weight each by how often it happens and add: EAT = h(t + m) + (1 − h)(t + 2m).
4. Expand: EAT = h·t + h·m + (1−h)·t + (1−h)·2m = t + h·m + (1−h)·2m = t + m + (1−h)·m.

EAT = h(t + m) + (1 − h)(t + 2m) = t + m + (1 − h)m

Worked example. TLB hit ratio 90% (h = 0.9), TLB lookup t = 10 ns, memory access m = 100 ns. Hit cost = 10 + 100 = 110 ns. Miss cost = 10 + 100 + 100 = 210 ns. EAT = 0.9 × 110 + 0.1 × 210 = 99 + 21 = 120 ns. Checking against the compact form: t + m + (1−h)m = 10 + 100 + 0.1×100 = 120 ns — matches.

Some questions instead present a setup where the TLB check happens in parallel with (overlapped with, effectively free alongside) the first memory reference rather than strictly before it — meaning a hit costs just one memory access, m, with the TLB lookup adding no separate time, and a miss costs two memory accesses, 2m, again with no separate TLB-time term. In that variant:

EAT (parallel TLB lookup) = h·m + (1 − h)·2m = m(2 − h)

Same numbers under this variant: EAT = 100 × (2 − 0.9) = 100 × 1.1 = 110 ns — a different number from the sequential case's 120 ns, because the 10 ns TLB-lookup term has been absorbed rather than added on top.

GATE TRAP: These are two different problem setups, not two ways of writing the same formula. If the question gives a separate TLB access time to be added on both the hit and miss branches, use EAT = h(t+m) + (1−h)(t+2m). If the question says the TLB lookup overlaps with or is included in the memory access (or omits a TLB time entirely), use EAT = h·m + (1−h)·2m. Read which case is being described before writing the formula down — plugging numbers into the wrong one gives a wrong but plausible-looking answer.

Because the TLB caches translations belonging to a specific process's page table, switching to a different process on a context switch makes every cached entry potentially wrong — process A's page 5 and process B's page 5 almost certainly map to different frames. The simplest fix is to flush the entire TLB on every context switch, but that throws away every cached translation and forces the new process to pay TLB misses (the expensive t+2m path above) until its own translations are re-learned — a real cost added to every context switch. Many architectures instead tag each TLB entry with an address-space identifier (ASID), a small process identifier stored alongside the translation; the hardware only treats an entry as a hit if both the page number and the ASID match the currently running process. Different processes' translations can then coexist in the TLB simultaneously without flushing, and a context switch costs nothing extra in the TLB — the old process's entries simply stop matching until it is scheduled again, at which point they are often still there.

PROTECTION AND SHARED PAGES

Beyond just a frame number, each page table entry carries a few status bits earning their place directly from what could otherwise go wrong.

A valid–invalid bit marks whether the entry corresponds to a page the process is actually allowed to use. A process's logical address space is usually smaller than what the page-number field could technically address (recall Variant 3's 2^52 possible pages — no real process needs anywhere near that many), so most entries are simply marked invalid; a reference translating through an invalid entry traps immediately, exactly like the base/limit check earlier, without ever needing to check a separate limit register per page. This is paging's own version of the protection check base-and-limit did with one comparison — done per page instead of once.

Read/write/execute permission bits let the same mechanism enforce finer protection than "in bounds or not": a page holding program text can be marked read-and-execute but not write, so a bug that tries to modify code traps instead of silently corrupting it; a page holding the stack is writable but typically not executable, which is a real defense against certain attacks that try to inject and run code on the stack.

A page marked shared can have the identical frame number appear in more than one process's page table simultaneously — this is exactly the mechanism dynamic linking's "one physical copy of the library" promise from earlier depends on, and it is why read-only sharing (of program text, of shared libraries) is safe: many page table entries point at one frame, all marked read-only, so no process can corrupt what another is reading, and none needs its own private copy.

STRUCTURING LARGE PAGE TABLES: HIERARCHICAL PAGING

Variant 3 above showed a flat, single-level page table becoming unworkable once the address space is wide — 2^55 bytes for one process's table is not a table anyone can keep in memory, contiguous or not. Two further problems compound this: most of that table's entries would be marked invalid anyway (most processes use only a sliver of their address space), so most of the memory a flat table would need is wasted holding invalid entries; and a table that large cannot even be allocated as one contiguous block, which is the exact external-fragmentation problem paging was invented to avoid, now recurring one level up.

Hierarchical (multilevel) paging fixes both by splitting the page-number field itself into two or more index fields, each indexing into its own level of table, so that only the specific inner-level tables actually in use by this process need to exist in memory at all — unused branches of the hierarchy simply are not allocated.

[[FIG:twolevel-pagetable]]

The standard way to choose how wide each level's index field should be is to require that a single page table at any level fit exactly inside one page frame — this keeps every level's tables the same convenient, allocatable size as everything else in the system. If a page table entry is s bytes and the frame size is 2^d bytes, one full table of entries fits in 2^d / s entries, and indexing among that many entries needs log2(2^d / s) bits.

7. Take a 32-bit logical address, 4KB (2^12) pages, 4-byte page table entries, two levels, each level's table required to fit in one frame. Offset = 12 bits, fixed by the page size.
8. Entries per table at either level = 4096 / 4 = 1024 = 2^10, so each index field needs 10 bits.
9. Check: outer index (10) + inner index (10) + offset (12) = 32 bits, exactly matching the given address width — confirming the split is correct, since any mismatch here means an arithmetic slip.

This is precisely the two-level scheme most 32-bit systems historically used: a 10-bit outer index selects one of 1024 second-level tables (only the ones this process actually uses need to be allocated), a 10-bit inner index selects one of 1024 entries within that table, and the 12-bit offset locates the byte within the chosen frame.

How many levels does a wider address need? The same "fit one frame" rule determines it — keep splitting the page-number field into index fields of that fixed width per level until the whole field is used up, and however many levels that takes is however many the hierarchy needs.

10. Take a 48-bit logical address (the portion of a 64-bit address space actually used by current 64-bit CPUs), 4KB (2^12) pages, 8-byte entries. Offset = 12 bits, so the page-number field is 48 − 12 = 36 bits.
11. Entries per table = 4096 / 8 = 512 = 2^9, so each level's index field is 9 bits.
12. Levels needed = 36 / 9 = 4 exactly — four levels of 9 bits each, plus the 12-bit offset, totals 4×9 + 12 = 48 bits, matching. (This is exactly the four-level page table structure real 64-bit x86 hardware uses.)

If the division does not come out exact, round up — a level cannot be partially used, so any remainder still needs one more full level to cover it. A 46-bit page-number field split into 9-bit levels needs ⌈46/9⌉ = 6 levels (five levels of 9 bits cover only 45 bits; a sixth level, mostly unused, covers the remaining 1 bit), even though the sixth level's tables would mostly sit empty.

number of levels = ⌈(page-number field width) / (index bits per level)⌉

GATE TRAP: The "index bits per level" number comes from the frame-fits-one-table constraint (log2(frame size / entry size)), not from arbitrarily splitting the page-number field in half or into round numbers. Always compute entries-per-table first, then take its log2, then divide the total page-number width by that per-level width (rounding up) to get the level count — and always sanity-check by adding every field's width back up to the given total address width.

The cost of extra levels is extra memory references: each additional level of the hierarchy is one more page-table lookup in memory before the actual data can be fetched, so a four-level table on a TLB miss costs four page-table accesses plus the final data access — five total. This is precisely why the TLB matters more, not less, as address spaces and hierarchy depth grow: a TLB hit skips every one of those levels in one step, while a miss on a deep hierarchy is proportionally more expensive than a miss on a flat one.

HASHED AND INVERTED PAGE TABLES

Hierarchical paging shrinks the table but keeps a per-process, per-virtual-page structure — the wider the address space, the taller the hierarchy has to grow, as just shown. Two other structures trade that away for different costs.

A hashed page table treats the page number as a key into a hash table rather than as a direct index. Each bucket holds a chain of entries, each recording a page number and its frame, so entries exist only for pages actually in use — nothing is allocated for the vast unused stretches of a sparse address space, and the size of the table depends on how many pages are actually mapped, not on how wide the address space technically is. The cost is a hash computation and, on a collision, walking a short chain, instead of the direct-indexing hierarchy walk.

An inverted page table takes the most direct approach to "do not scale with the size of the virtual address space": instead of one entry per virtual page (of which there can be enormously many, mostly unused), keep one entry per physical frame (of which there are only as many as physical memory actually has), recording which process and which of that process's pages currently occupies this frame. The table's total size is fixed by physical memory size, completely independent of how large or how many processes' virtual address spaces are — a genuine structural advantage over every scheme above, whose size depends on the virtual address width.

The cost is in the lookup direction: translation needs "which frame holds page p of process i," but the table is organized by frame, not by (process, page) — a naive lookup means searching the entire table linearly for a matching entry, which is far slower than the direct index a per-process table gives. Systems using inverted tables typically add a hash structure on top specifically to speed this search back up, trading back some of the memory saving for lookup speed — the same hash-based idea as above, now layered onto the inverted table rather than replacing a hierarchical one.

REMEMBER: Hierarchical paging keeps one entry per virtual page but shrinks what must be resident at once; hashed tables keep entries only for pages actually mapped; inverted tables keep one entry per physical frame, capping total size at the size of physical memory regardless of virtual address width. Each is answering "the table is too big" with a different idea of what to make the table's size depend on instead.

SEGMENTATION

Every scheme so far still divides a process into pieces whose size is dictated by the hardware, not by the program's own structure — a 4KB page has no relationship to where one function's code ends and another begins, or where the stack stops and the heap starts. Segmentation instead exposes that structure directly to the memory management scheme.

A segment is a logically meaningful, variable-length unit of a program: the code segment, the global-data segment, the stack, the heap, or an individual large data structure, each segment sized to exactly what it contains. A logical address under segmentation is a pair (segment number, offset), rather than the single flat number paging assumes.

A segment table holds one entry per segment, each recording a base (where this segment currently sits in physical memory) and a limit (its length) — this is exactly the base-and-limit register idea from the very start of the chapter, generalized from "one per process" to "one per segment," which is precisely why segmentation can express things base-and-limit alone could not: different parts of one process can be protected, relocated and shared independently of each other.

Translation and the bounds check both fall directly out of that:

1. Given (segment number s, offset d), use s to index the segment table and read out that segment's base and limit.
2. Check 0 ≤ d < limit. If this fails, the offset falls outside what was allocated to this segment — exactly the same failure mode as the base/limit check earlier, now scoped to one segment rather than the whole process — and the hardware raises a protection trap (a segmentation fault).
3. If the check passes, physical address = base + d.

physical address = base + offset, valid only if 0 ≤ offset < limit (checked per segment)

Worked example. Segment table entry for segment 1: base = 2000, limit = 300. Logical address (segment 1, offset 150): 150 < 300, valid; physical address = 2000 + 150 = 2150. Logical address (segment 1, offset 350): 350 is not less than 300 — the check fails, and the hardware raises a segmentation fault, regardless of whether physical address 2350 happens to be free memory or not. The violation is about exceeding this segment's declared bounds, not about whether the target memory is actually in use by anyone.

Because segments are sized exactly to what they hold, there is no internal fragmentation — unlike a page, a segment never has "wasted space at the end" by construction. But because segments vary in size and are placed as contiguous physical blocks (each segment must itself be contiguous, even though different segments need not be adjacent to each other), external fragmentation is back: this is precisely the variable-partitioning problem from earlier, now applied per segment instead of per process, and it needs the same first-fit/best-fit/worst-fit machinery to manage.

Sharing and protection are natural at the segment level in a way paging's uniform frames obscure: a code segment can be marked shared and read-only and given to every process running that program, with its own separate data and stack segments kept private — the same outcome dynamic linking's shared-library pages achieved, but expressed here as "this whole logically meaningful unit is shared," rather than as scattered individually shared pages.

GATE TRAP: The limit check compares the offset to the limit, never the segment number to anything and never the physical address to the limit — the same trap as the base/limit check earlier, now easy to miss because there are two numbers (segment number and offset) in play instead of one. Identify which of the pair is the offset before applying the check.

[[FIG:paging-vs-segmentation]]

SEGMENTATION WITH PAGING

Segmentation's external fragmentation and paging's internal fragmentation are opposite costs, which raises the obvious question of combining the two schemes to get sharing and protection at the logical, program-meaningful granularity of segmentation, while getting paging's freedom from external fragmentation for how each segment is actually laid out in physical memory.

The combined scheme, used by 32-bit Intel x86 processors, treats each segment not as one contiguous physical block but as its own paged region: a logical address is still (segment number, offset), the segment table entry still gives a base and a limit, but that base now points not directly into physical memory but at the start of a page table specific to that segment. The offset within the segment is itself further split into a page number and a page offset, translated exactly as ordinary paging does, before finally reaching a physical address.

The result: within a segment, allocation is done in pages, so any free frame anywhere serves any page of any segment — no external fragmentation at the physical-memory level. Between segments, the program still sees logically meaningful, independently protectable, independently shareable units — code, stack, data — exactly as pure segmentation intended. The only remaining fragmentation is paging's own small internal fragmentation in each segment's last page, the smallest of the costs seen in this chapter.

PAGING VERSUS SEGMENTATION

Bringing the comparison together directly, since it is tested as its own question as often as either scheme is tested alone.

• Unit size: paging uses fixed-size pages/frames, invisible to the programmer and chosen by the hardware; segmentation uses variable-size segments that correspond to the program's own logical structure (code, stack, data).
• Fragmentation: paging has none externally, but internal fragmentation averaging half a page in each process's last page; segmentation has no internal fragmentation, since a segment is sized exactly to its content, but external fragmentation returns because segments are variable-size contiguous blocks.
• Address form: paging uses one flat logical address, split by the hardware into page number and offset; segmentation uses a two-part (segment number, offset) address supplied by the compiler/programmer's own structuring of the program.
• Protection and sharing: both support per-unit protection bits and sharing of a unit between processes; segmentation's units are more natural to reason about for this (share exactly "the code segment"), while paging's units are hardware-sized and any sharing has to be expressed page by page.
• Table growth: a page table's size depends only on the address space width and page size, needing hierarchical structuring for wide address spaces as shown above; a segment table's size depends on how many segments the program actually has, typically far fewer entries, but each entry needs both a base and a variable limit rather than just a frame number.
• Combined scheme: segmentation with paging (Intel-style) gets both — logical, protectable, shareable segments, each internally paged to avoid external fragmentation.

WORKED PROBLEMS

Each of these is a pattern that appears in the paper. Follow the working, not just the answer.

1. A system has a 32-bit logical address space and a page size of 4KB. Each page table entry is 4 bytes. Find the page table size for one process using its full address space.
   Offset bits = log2(4KB) = log2(2^12) = 12. Page-number bits = 32 − 12 = 20, so there are 2^20 pages. Page table size = 2^20 × 4 bytes = 2^22 bytes = 4MB.

2. A system uses two-level paging with a 32-bit logical address, 4KB pages, and 4-byte page table entries, with each page table required to fit exactly in one frame. Find the width of the outer index, inner index, and offset fields.
   Offset = log2(4KB) = 12 bits. Entries per table = 4096 / 4 = 1024 = 2^10, so each index field is 10 bits. Check: 10 + 10 + 12 = 32, matching the given address width. Outer index = 10 bits, inner index = 10 bits, offset = 12 bits.

3. A 48-bit logical address space uses 4KB pages and 8-byte page table entries, with each level's page table required to fit exactly in one frame. How many levels of paging are needed?
   Offset = 12 bits, so the page-number field is 48 − 12 = 36 bits. Entries per table = 4096 / 8 = 512 = 2^9, so each level's index is 9 bits. Levels needed = 36 / 9 = 4 exactly. Four levels, 9 bits each, plus the 12-bit offset, sums to 48 bits — confirmed.

4. A system has a TLB with hit ratio 90%, TLB lookup time 10 ns, and main memory access time 100 ns, using a single-level page table with no page faults. Find the effective access time, first assuming the TLB lookup time is added on both branches, then assuming the TLB lookup happens in parallel with (adds no separate time to) memory access.
   Sequential case: hit cost = t + m = 10 + 100 = 110 ns; miss cost = t + 2m = 10 + 200 = 210 ns. EAT = 0.9×110 + 0.1×210 = 99 + 21 = 120 ns.
   Parallel case: hit cost = m = 100 ns; miss cost = 2m = 200 ns. EAT = 0.9×100 + 0.1×200 = 90 + 20 = 110 ns. The two setups give genuinely different numbers because the parallel case never adds t at all.

5. A system uses paging with a page size of 1KB. A process's page table maps logical page 3 to physical frame 7. Find the physical address corresponding to logical address 3172.
   Page number = ⌊3172 / 1024⌋ = 3, offset = 3172 − 3×1024 = 100. Page 3 maps to frame 7. Physical address = 7×1024 + 100 = 7168 + 100 = 7268.

6. Memory has holes, in address order, of sizes 100K, 500K, 200K, 300K, 600K. Requests arrive in this order: 212K, 417K, 112K, 426K. Trace first fit, best fit and worst fit on this same original list and state which strategy(ies) satisfy all four requests, with the final holes remaining.
   First fit: 212K→500K (leftover 288K); 417K→600K (leftover 183K); 112K→288K (leftover 176K); 426K finds no hole among 100K,176K,200K,300K,183K — fails.
   Worst fit: 212K→600K (leftover 388K); 417K→500K (leftover 83K); 112K→388K (leftover 276K); 426K finds no hole among 100K,83K,200K,300K,276K — fails.
   Best fit: 212K→300K (leftover 88K); 417K→500K (leftover 83K); 112K→200K (leftover 88K); 426K→600K (leftover 174K) — all four succeed. Final holes: 100K, 88K, 83K, 88K, 174K, totalling 533K of external fragmentation with no single leftover able to satisfy a request over 174K. Only best fit satisfies every request on this sequence.

7. A segment table has: segment 1, base = 2000, limit = 300. Find the outcome for logical addresses (segment 1, offset 150) and (segment 1, offset 350).
   Offset 150: 150 < 300, valid. Physical address = 2000 + 150 = 2150.
   Offset 350: 350 is not less than 300 — the bounds check fails, and the hardware raises a segmentation fault (protection trap), regardless of what physical memory happens to sit at address 2350.

8. A process needs 4097 bytes of memory and the system uses 4KB (4096-byte) pages. How many pages are allocated, and how much internal fragmentation results?
   ⌈4097 / 4096⌉ = 2 pages are allocated (8192 bytes total), since a partial page still requires a whole page. Internal fragmentation = 8192 − 4097 = 4095 bytes, all of it in the second (last) page — almost an entire wasted page for a request only one byte over a page boundary.

WHAT TO CARRY INTO THE NEXT CHAPTER

Every scheme in this chapter assumed a process's whole logical address space — every page, every segment — is resident in physical memory before it runs. That assumption is generous: most programs use only a fraction of their allocated memory at any given moment, and demanding all of it be resident wastes memory that could run other processes and limits how many processes can coexist at all. Virtual memory removes that assumption, using exactly the page table, the valid–invalid bit, and the TLB built here — a page simply marked invalid because it is not currently resident, rather than because it is out of bounds, becomes the trigger for a page fault, and the algorithm for choosing which resident page to evict when a new one must be brought in is the next chapter's central problem.
`
};
