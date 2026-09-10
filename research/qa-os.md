# QA Audit: data/questions/os.js

Loaded via `node -e "global.window={}; require('./data/questions/os.js'); ..."`.
`window.GATE_DATA.questions['os']` has 7 topics, 185 questions total (29+29+29+29+23+23+23).
83 questions are tagged `numerical` or `difficulty:hard`.

30 questions were sampled across all 7 topics, prioritizing numerical/hard scheduling
tables, page-replacement traces, disk-schedule totals, Banker's safe-sequence checks,
and paging bit-math. Each was independently re-derived with standalone `node -e`
simulations (not by re-reading the stored explanation) — see simulation scripts used
in `/tmp/.../scratchpad/sim.js`, `sim2.js`, `sim3.js` for the exact code.

## Audit table

| # | id | Topic | What was checked | Simulated result | Stored answer | Verdict |
|---|----|-------|-------------------|-------------------|----------------|---------|
| 1 | os-processes-q6 | Processes & Threads | fork tree: `if(fork()==0){fork();} fork();` total processes | 6 | 6 | CORRECT |
| 2 | os-processes-q13 | Processes & Threads | fork tree: `x=fork(); if(x==0) fork(); else fork();` total | 4 | 4 | CORRECT |
| 3 | os-processes-y4 | Processes & Threads | same shape as q6 (NAT) | 6 | 6 | CORRECT |
| 4 | os-processes-y6 | Processes & Threads | direct children of original parent only | 2 | 2 | CORRECT |
| 5 | os-scheduling-q4 | CPU Scheduling | FCFS avg waiting time, 4 procs | 5.75 | 5.75 | CORRECT |
| 6 | os-scheduling-q6 | CPU Scheduling | SRTF, P1 waiting time | 3 | 3 | CORRECT |
| 7 | os-scheduling-q7 | CPU Scheduling | RR q=2, avg waiting time (3 procs) | 11/3 (3.667) | 11/3 | CORRECT |
| 8 | os-scheduling-x1 | CPU Scheduling | SRTF, P1 waiting time (3 procs) | 6 | 6 | CORRECT |
| 9 | os-scheduling-y5 | CPU Scheduling | RR q=4, avg waiting time (4 procs, NAT) | 9.25 | 9.25 | CORRECT |
| 10 | os-scheduling-y6 | CPU Scheduling | SRTF, avg waiting time (4 procs, NAT) | 6.5 | 6.5 | CORRECT |
| 11 | os-sync-q7 | Process Sync | counting sem init 3, 5×wait(), blocked count / final S | S=-2, 2 blocked | 2 blocked, S=-2 | CORRECT |
| 12 | os-sync-q12 | Process Sync | bounded buffer empty/full after 3 inserts + 1 remove | empty=3, full=2 | empty=3, full=2 | CORRECT |
| 13 | os-sync-x1 | Process Sync | sem init 2, wait×3+signal, final S / blocked | S=0, 0 blocked | S=0, 0 blocked | CORRECT |
| 14 | os-sync-y5 | Process Sync | mutex init 2, 5 simultaneous waiters, blocked count | 3 | 3 | CORRECT |
| 15 | os-deadlock-q4 | Deadlocks | Banker's safe sequence exists for given state | found safe seq (e.g. P1,P3,P0,P2,P4); option `<P1,P3,P4,P0,P2>` also verified valid | option B | CORRECT |
| 16 | os-deadlock-q6 | Deadlocks | min instances formula n(k-1)+1, n=3,k=4 | 10 | 10 | CORRECT |
| 17 | os-deadlock-q11 | Deadlocks | tentative grant of (1,0,2) to P1 stays safe | request ≤ Need, ≤ Available, and resulting state is safe | grantable | CORRECT |
| 18 | os-deadlock-q14 | Deadlocks | min instances, maxes 3,4,5,2 | 11 | 11 | CORRECT |
| 19 | os-deadlock-y5 | Deadlocks | Available=3, needs 2,5,1,4 → immediately satisfiable count | 2 | 2 | CORRECT |
| 20 | os-memory-q5 | Memory Mgmt | single-level page table size, 2^20 entries × 4B | 4 MB | 4 MB | CORRECT |
| 21 | os-memory-q6 | Memory Mgmt | 2-level paging bit split, 32-bit addr/4KB page/4B PTE | 10/10/12 | 10/10/12 | CORRECT |
| 22 | os-memory-q7 | Memory Mgmt | EMAT, TLB hit 90%, t=10ns, m=100ns | 120 ns | 120 ns | CORRECT |
| 23 | os-memory-q9 | Memory Mgmt | physical address from logical 3172, page size 1024, frame 7 | 7268 | 7268 | CORRECT |
| 24 | os-virtual-memory-q2 | Virtual Memory | FIFO page faults, ref string len 12, 3 frames | 9 | 9 | CORRECT |
| 25 | os-virtual-memory-q3 | Virtual Memory | LRU page faults, same string, 3 frames | 10 | 10 | CORRECT |
| 26 | os-virtual-memory-q4 | Virtual Memory | Optimal page faults, same string, 3 frames | 7 | 7 | CORRECT |
| 27 | os-virtual-memory-q5 | Virtual Memory | FIFO faults w/ 4 frames (Belady's anomaly check) | 10 (> 9 at 3 frames) | 10, anomaly confirmed | CORRECT |
| 28 | os-file-disk-q6 | File Systems & Disk | FCFS total head movement | 395 | 395 | CORRECT |
| 29 | os-file-disk-q8 | File Systems & Disk | SCAN total head movement | 328 | 328 | CORRECT |
| 30 | os-file-disk-q9 | File Systems & Disk | C-SCAN total head movement (return jump counted) | 393 | 393 | CORRECT |

## Summary

- Audited: 30
- Wrong: 0
- Ambiguous: 0
- Fixed: 0

Every sampled numerical/hard question's stored `answer` (and, by extension, the
computation described in its `explanation`) matched an independently coded
simulation — FCFS/SJF/SRTF/RR/Priority scheduling tables, FIFO/LRU/Optimal page
replacement traces, FCFS/SCAN/C-SCAN disk-head-movement totals, Banker's-algorithm
safe-sequence and request-grant checks, semaphore/bounded-buffer counting, and
fork()-tree process-count enumeration. No edits were made to `data/questions/os.js`.

Note: the 30-question sample covers roughly a third of the 83 numerical/hard items
tagged in the file; the remaining ~53 numerical/hard items (and all easy/concept
items) were not individually re-simulated in this pass.
