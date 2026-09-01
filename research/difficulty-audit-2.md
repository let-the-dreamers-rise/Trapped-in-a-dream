# GATE CS Question Bank — Difficulty Audit #2

**Scope:** `data/questions/{os,coa,cn,dbms}.js`, Node-loaded via `window.GATE_DATA.questions`.
**Population:** OS 288 Q / COA 267 Q / CN 264 Q / DBMS 257 Q = **1076 questions total**.
Bank-wide labelled distribution: OS (easy 74/med 143/hard 71), COA (72/137/58), CN (76/133/55), DBMS (59/114/84).

**Sample:** 40 questions, stratified 15 hard / 15 medium / 10 easy, spread across all four subjects,
including 6 PYQ-tagged items (2015/2016/2019) and 2 multi-select (MSQ) items. No true NAT type exists in
the schema — "numerical" questions still carry MCQ `options`; NAT-style free-entry only shows up in the
`pyq-style` items that ask "enter your numerical answer" (still graded against a fixed `answer`).

Rating scale used: **BELOW-GATE** (recall / one substitution) · **GATE-1-MARK** (one concept, 1–2 steps) ·
**GATE-2-MARK** (multi-step, combines two mechanisms, or a genuine trap) · **ABOVE-GATE**.

## Sample table

| # | id | labelled | my rating | note |
|---|----|----------|-----------|------|
| 1 | os-processes-p5 (PYQ'19) | hard | GATE-2-MARK | 4 nested forks, real multi-branch trace. Match. |
| 2 | coa-memory-q9 | hard | GATE-1-MARK | Single offset→index formula, one mod. Too easy for "hard". |
| 3 | cn-basics-q14 | hard | GATE-1-MARK | Plain BDP plug-in, one formula. Mismatch. |
| 4 | dbms-er-y4 | hard | GATE-2-MARK | Inclusion-exclusion over two candidate-key superset counts. Match. |
| 5 | os-virtual-memory-q8 | hard | BELOW-GATE | EAT **formula is handed to you** in the question text; pure substitution. Real GATE never gives you the formula. Clear mismatch. |
| 6 | coa-io-q15 | hard | GATE-1-MARK | max-rate = 1/overhead, one division. Mismatch. |
| 7 | cn-application-p1 (PYQ'15) | hard | GATE-2-MARK | DNS + base page + 5 serial-TCP objects, 3-term sum, needs the non-persistent-HTTP mechanism understood. Match. |
| 8 | dbms-indexing-x4 | hard | GATE-2-MARK (near ABOVE) | Full B+-tree insert trace with cascading root split. Best question in the sample. Match. |
| 9 | os-scheduling-p2 (PYQ'16) | hard | GATE-2-MARK | 4-process SRTF trace, real preemption bookkeeping. Match. |
| 10 | coa-io-x7 | hard | GATE-1-MARK | seek+latency+transfer = three numbers added once. No real trap beyond "don't multiply per-sector". Mismatch. |
| 11 | cn-transport-q12 | hard | GATE-1-MARK | Count doublings of cwnd to 32. One mechanism, no combination. Mismatch. |
| 12 | dbms-ra-sql-q14 | hard | GATE-1-MARK | Tuple-calculus safety, single-rule application across 4 options. Mismatch. |
| 13 | os-processes-q6 | hard | GATE-2-MARK | fork()-in-if trap (forgetting C2 also executes the tail fork). Genuine trap. Match. |
| 14 | coa-pipelining-x14 | hard | GATE-1-MARK | Solve CPI formula backward for p — algebra, but single mechanism/single equation. Mismatch (borderline). |
| 15 | cn-network-x7 | hard | GATE-1-MARK | Bellman-Ford: min of 3 sums. One mechanism, one step. Mismatch. |
| 16 | cn-datalink-z1 | medium | BELOW-GATE | CRC facts, MSQ format, zero computation (no polynomial division actually done). |
| 17 | cn-network-z2 | medium | BELOW-GATE | DV-vs-LS fact recall, MSQ format, zero computation. |
| 18 | cn-network-x1 | medium | GATE-1-MARK | CIDR aggregation via shared-prefix bits across 4 values. Reasonable match. |
| 19 | dbms-indexing-f1 | medium | GATE-1-MARK | Single B+-tree leaf split. Match. |
| 20 | os-processes-y2 | medium | BELOW-GATE | one-to-one threading facts, pure recall dressed as MSQ. |
| 21 | coa-instructions-p2 (PYQ'16) | medium | **GATE-2-MARK** | Expanding-opcode reallocation — genuinely tricky two-step reasoning. **Under-labelled** (should be "hard"). |
| 22 | cn-network-x13 | medium | BELOW-GATE | /27 usable hosts, subtract-2 rule, one step. |
| 23 | dbms-er-x14 | medium | BELOW-GATE | Aggregation definition, pure recall. |
| 24 | os-sync-p5 (PYQ'19) | medium | GATE-1-MARK | Semaphore value after 4 sequential ops, straight bookkeeping. |
| 25 | coa-instructions-q14 | medium | GATE-1-MARK | Bit-width subtraction + signed-range formula. |
| 26 | cn-application-q12 | medium | GATE-1-MARK | Digital-signature mechanism, single concept explained. |
| 27 | dbms-er-x6 | medium | GATE-1-MARK | EER single-table NULL reasoning, one concept. |
| 28 | os-deadlock-q7 | medium | BELOW-GATE | Resource-ordering → eliminates circular wait, standard fact. |
| 29 | coa-memory-y2 | medium | GATE-1-MARK | Write-through/back facts, MSQ, but option 3 is a genuine reversed-logic trap. |
| 30 | cn-application-q5 | medium | GATE-1-MARK | HTTP-pipelining RTT count, 3-term sum, same template as #7 but simpler. |
| 31 | os-memory-q10 | easy | BELOW-GATE | TLB purpose, definition. Match. |
| 32 | coa-io-x13 | easy | GATE-1-MARK | Why device registers aren't cached — light reasoning, slightly above "easy". |
| 33 | cn-transport-q14 | easy | BELOW-GATE | UDP vs TCP use-case, recall. Match. |
| 34 | dbms-ra-sql-x8 | easy | BELOW-GATE | EXCEPT/INTERSECT cardinality, one step. Match. |
| 35 | os-file-disk-q4 | easy | BELOW-GATE | Free-space bitmap, recall. Match. |
| 36 | coa-io-p1 (PYQ'15) | easy | GATE-1-MARK | Cycle-stealing %, one division. |
| 37 | cn-application-q7 | easy | BELOW-GATE | IMAP vs POP3, recall. Match. |
| 38 | dbms-er-x12 | easy | BELOW-GATE | Descriptive-attribute placement, recall/application. Match. |
| 39 | os-virtual-memory-q15 | easy | BELOW-GATE | Page-fault handling order, recall. Match. |
| 40 | coa-io-q2 | easy | BELOW-GATE | Cycle-stealing definition, recall. Match. |

## Sample-wide rating distribution

| Rating | Count | Share |
|---|---|---|
| BELOW-GATE | 15 | 37.5% |
| GATE-1-MARK | 18 | 45.0% |
| GATE-2-MARK | 7 | 17.5% |
| ABOVE-GATE | 0 | 0% |

By labelled bucket: hard → {2-mark 6, 1-mark 8, below 1}; medium → {2-mark 1, 1-mark 8, below 6}; easy → {1-mark 2, below 8}.

## Answers

**1. What fraction of 'hard'-labelled questions are genuinely GATE-2-mark or above?**
**6 / 15 = 40%.** The other 9 (60%) are single-formula, single-mechanism plug-ins that happen to have bigger
numbers or more nesting steps, not genuine 2-mark synthesis — `os-virtual-memory-q8` is the starkest case:
the EAT *formula is stated in the question itself*, so it's really a below-1-mark arithmetic exercise wearing
a "hard" tag. `cn-transport-q12`, `cn-network-x7`, `coa-memory-q9`, `cn-basics-q14`, `dbms-ra-sql-q14` are
all one-formula/one-step items mislabelled hard.

**2. Is the bank skewed easy? Give the observed distribution.**
Yes, clearly. 82.5% of the sample (33/40) sits at BELOW-GATE or GATE-1-MARK; only 17.5% reaches genuine
GATE-2-mark synthesis, and **nothing in the sample exceeds GATE-2-mark**. A real GATE CS paper's 2-mark
half is roughly 50% of the marks and leans heavily on combined-mechanism problems (TLB+page-fault, cache
AMAT across levels, pipeline hazards + branch prediction, B+-tree cascades, multi-hop DV convergence,
congestion-control state machines). This bank's "hard" tier reaches that bar well under half the time, and
its "medium" tier is overwhelmingly 1-mark-or-below (14/15) — the label inflation runs through the whole
bank, not just at the hard tier. One item (`coa-instructions-p2`, expanding opcodes) was actually
under-labelled — genuinely 2-mark difficulty tagged "medium" — showing the mislabelling isn't systematically
directional, just noisy, with the net effect skewing the bank soft.

**3. Are the numericals as gnarly as real GATE, or sanitised?**
Sanitised, with a few strong exceptions. The standouts — `dbms-indexing-x4` (B+-tree cascading split),
`os-scheduling-p2` (4-process SRTF trace), `os-processes-p5`/`os-processes-q6` (nested fork trees with a real
trap), `cn-application-p1` (multi-term RTT sum) — are genuinely GATE-caliber multi-step numericals. But the
median numerical in this sample is a single clean formula applied once: BDP with round powers of ten
(10^9 bps, 20ms, 1000B), cwnd doubling to a tidy 32, /27 subnet math, cache line = address >> offset mod
lines. Real GATE numericals routinely (a) mix units awkwardly within one problem (KB vs Kb, μs vs ns,
non-power-of-two frame counts forcing floor/ceiling judgment calls), and (b) chain two distinct
subsystems in one question (TLB hit ratio feeding into an AMAT calc, seek-time distribution combined with
queueing, pipeline stalls combined with branch misprediction cost). Only `coa-pipelining-x14` (solving CPI
backward, giving 0.1/0.6 = 0.1667) shows that kind of "awkward number, don't round early" trap; it's the
exception, not the norm. No sampled item combines two GATE mechanisms in one numerical the way the task
brief's own examples (TLB+cache, pipeline+hazards, scheduling+context-switch, B+-tree cascade) suggest a
truly hard bank should.

**4. Would a student scoring 90%+ here be ready for a real GATE paper, or blindsided?**
Blindsided, bluntly. A 90%+ scorer on this bank has proven they can (a) recall definitions fluently, and (b)
correctly substitute into a formula they're often handed outright. That is real, useful groundwork, but it is
exactly the *first* mark of GATE's two-mark questions, not the second. The second mark — combining two
mechanisms, tracing multi-stage state, catching a deliberately awkward number or unit — is under-represented:
only 7 of 40 sampled questions test it, and zero exceed it. An AIR-1 aspirant training almost entirely on
this bank would walk into GATE fluent on plug-and-chug and under-trained on synthesis, which is precisely
where GATE separates top scorers from the pack. The owner's fear (false confidence) is justified.

## Prioritised topics needing harder questions

1. **OS – Virtual Memory / Memory Management.** The flagship "hard" item hands the student the formula
   (`os-virtual-memory-q8`). Needs: EAT/AMAT problems that combine TLB hit ratio *and* page-fault rate *and*
   multi-level page tables in one chain, with the formula never stated outright.
2. **COA – Memory/Cache.** Cache-line and cache-mapping questions stop at "decode the address"; needs
   multi-level cache AMAT, hit/miss determination combined with tag comparison, and write-policy traffic
   calculations under a concrete access sequence (not just fact MSQs).
3. **CN – Transport & Network layers.** BDP, slow-start cwnd counting, and single-hop Bellman-Ford are all
   one-step. Needs multi-RTT TCP timelines with a loss event (fast retransmit + congestion-avoidance
   recovery), multi-router iterative DV convergence to steady state, and CRC/checksum problems that require
   actually performing the polynomial division rather than reciting facts about it.
4. **DBMS – Relational Algebra/Calculus and Indexing.** Calculus-safety and B+-tree-split questions are
   solid individually but mostly single-instance; needs algebra-to-SQL equivalence with cost estimation, and
   B+-tree deletion (borrow/merge) cascades to pair with the existing insertion cascade.
5. **Bank-wide MSQ items.** Every multi-select sampled (`cn-datalink-z1`, `cn-network-z2`, `os-processes-y2`,
   `coa-memory-y2`) is pure fact-recall with zero computation — MSQ format is being used to make recall
   *feel* harder (4 things to know instead of 1) rather than to test genuine combined reasoning. Convert at
   least half of these into MSQs built around an actual computed scenario.
6. **Label calibration.** Several "hard" items should be relabelled 1-mark-medium (`coa-memory-q9`,
   `cn-basics-q14`, `coa-io-q15`, `cn-transport-q12`, `cn-network-x7`, `dbms-ra-sql-q14`), and at least one
   "medium" item (`coa-instructions-p2`) should move up to "hard" — the difficulty labels are noisy enough
   that a student filtering by "hard" cannot currently trust it means GATE-2-mark.
