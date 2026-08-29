# Student Simulation Report — OS / DBMS / CN / COA / Digital Logic
### Role: GATE CS aspirant targeting AIR 1 — brutally honest audit
### Source: `data/questions/{os,dbms,cn,coa,digital}.js`, loaded via Node, no files edited.

Corpus size: **918 questions** across 27 topics (OS 7, DBMS 5, CN 5, COA 5, Digital 5).
Question-type mix confirmed programmatically: `concept`, `numerical`, `pyq-style`, `multi-select` (MSQ, stored as an `answers` array), and 94 NAT-style items (no `options` field). No separate `NAT` type tag exists but the shape is present.

---

## 1. Theory read — 4 topics, full text (intro+core+strategy+deep)

Read in full: **os-deadlock**, **dbms-indexing**, **cn-transport**, **coa-memory**. These are dense, well-written (deep sections run 7.5–11.3k chars), each ending in worked numeric examples and a "GATE traps" list — genuinely exam-caliber prose, not filler.

**Is it enough to solve real GATE problems? Mostly yes, with specific holes:**

- **os-deadlock**: Full Coffman conditions, RAG single/multi-instance subtlety, all three strategies, Banker's algorithm, and the `n(k-1)+1` formula are all present and correctly derived. **Hole**: the only fully worked Banker's example uses a *single* resource type. There is no worked example with 2+ resource-type columns (Need/Allocation/Available as full matrices), even though the question bank itself tests multi-resource Banker's (e.g. `os-deadlock-q5`, `os-sync-x3`). A student relying only on the theory page would face the harder multi-column trace under-prepared.
- **dbms-indexing**: B+-tree order derivation, dense/sparse/primary/clustering/secondary distinctions, insertion split mechanics (copy-up vs push-up) are excellent and precise. **Hole**: hashing file organization is mentioned in one sentence ("Hashing gives near-constant lookup...") and extendible hashing (global/local depth, directory doubling) is **never explained in the theory at all**, yet it is directly tested (`dbms-indexing-y3`, concept MSQ). A student who only reads the theory would have zero framework for that question.
- **cn-transport**: TCP/UDP headers, handshake, cwnd slow-start/AIMD, Reno's fast-recovery convention, RTO/EWMA — all solid and numerically worked. **Holes**: (a) no mention of sequence-number **wraparound** (mod 2³²) even as a caution; (b) no mention of Nagle's algorithm, delayed ACK, or the persist timer beyond one line; (c) bandwidth-delay product / pipelining efficiency (a very standard GATE numeric) is not discussed here at all — it turns out to live entirely under `cn-datalink` instead, which is a reasonable split but not signposted.
- **coa-memory**: Address partitioning for all three mapping schemes, AMAT (local vs global miss rate, both serial/parallel wording), write-through/write-back traffic, replacement policies — all correct and well-drilled. **Hole**: no mention of cache coherence (MESI/snooping) at all — reasonable for a single-core-focused syllabus subset, but it's a topic GATE has asked (rarely, but it exists), and no signpost that it's out of scope.

**Verdict on theory sufficiency**: strong enough to clear 70–80% of a real GATE-level paper section in these topics, but a topper-track (AIR 1) student cannot stop at the theory pages alone — extendible hashing internals, multi-resource Banker's tracing, and TCP wraparound arithmetic need outside supplementation.

---

## 2. Attempted 25 sampled questions — solved independently first, then compared

Spread: OS (deadlock ×2, virtual-memory ×2, scheduling ×1, disk ×1), DBMS (indexing ×2, transactions ×1, ra-sql ×1, normalization ×1), CN (transport ×3 incl. 1 MSQ, datalink ×1, network ×1), COA (pipelining ×2, memory ×2, io ×1), Digital (arithmetic ×2, sequential ×1, number-systems ×1). Included hard-difficulty, numerical, and one MSQ.

**24/25 confirmed correct** after independent computation:
- `os-deadlock-q6` (10 via n(k-1)+1=3·3+1), `os-deadlock-q10` (multi-instance cycle ≠ deadlock, free R2 instance) ✓
- `os-virtual-memory-q8` (EAT=8099.9ns), `os-virtual-memory-q11` (working set {7,5,1}) ✓
- `os-scheduling-q7` — traced the full RR queue myself (P1 0-2, P2 2-4, P3 4-6, P1 6-8, P2 8-11); avg wait = 11/3 ✓ matches
- `dbms-indexing-q14` (p=57, leaf=46, re-derived both inequalities and boundary-checked p=58/47 overflow) ✓
- `dbms-indexing-q15` (3 block accesses: 2 index levels + 1 data) ✓
- `dbms-transactions-x5` — manually enumerated all 6 interleavings of R1W1/R2W2 and checked precedence-graph cycles per pair; exactly schedules (1) and (6) are acyclic → 2/6 ✓
- `dbms-ra-sql-q15` (division quotient {a1,a3}=2 tuples) ✓
- `dbms-normalization-q14` (3NF synthesis needs added key relation R3(A,C)) ✓
- `cn-transport-q12` (500ms, 5 RTT doublings) ✓
- `cn-transport-x6` (fast-recovery cwnd=8, ssthresh=8 per the app's own stated simplified convention) ✓
- `cn-datalink-q11` (5120m from inverted CSMA/CD Lmin formula) ✓
- `cn-network-q13` (distance-vector: 6 via Q) ✓
- `coa-pipelining-q9` (CPI=1.15) ✓
- `coa-pipelining-q11` (speedup=1.375, bottleneck shifts to the 8ns stage) ✓
- `coa-memory-q9` (line 35, verified via two independent methods — shift/mod and binary truncation) ✓
- `coa-memory-q14` (110ns burst-fill) ✓
- `coa-io-q9` (0.0375% CPU overhead) ✓
- `digital-arithmetic-q10` (0.15625, full IEEE-754 bit decode) ✓
- `digital-arithmetic-q14` (2⁻¹²⁶ smallest normalized, correctly distinguishes from smallest denormal 2⁻¹⁴⁹) ✓
- `digital-sequential-q15` (100MHz, correctly ignores hold-time distractor) ✓
- `digital-number-systems-q9` (10100000 = −96, overflow via sign-flip / carry-in≠carry-out rule, hand-added the two 8-bit patterns) ✓
- `cn-transport-z1` (MSQ: options 0,1,3 true, option 2 false) ✓

### Dispute — `os-file-disk-q8` (SCAN total head movement)

**This is a real, citable inconsistency**, not a nitpick. Setup: cylinders 0–199, head at 50, requests {45,90,150,60,20,175}, moving toward increasing cylinders first.

- The stored answer is **328** (upward leg 50→199 = 149; downward leg 199→20 = 179, i.e. reversing but stopping at the *last request*, not the disk boundary).
- But the app's own `os-file-disk-q13` explicitly defines SCAN as: *"SCAN always travels all the way to the boundary regardless of where the last request lies"* — for **both** directions. Applied consistently, the downward leg should go all the way to cylinder 0 (199 cylinders), giving total = 149 + 199 = **348** — which is listed in q8's own options as a "distractor."
- Meanwhile `os-file-disk-q10` computes **true LOOK** (stop at last request in both directions) for the identical queue and correctly gets **280**.
- So q8's "328" is neither pure SCAN (348, by the app's own q13 definition) nor pure LOOK (280, per q10) — it's an internally inconsistent hybrid (boundary-touch on the initial leg only). This convention does appear in some Indian coaching-material solutions, so it isn't indefensible, but it **contradicts the app's own stated SCAN definition two questions later** in the same topic file, and a rigorous student cross-checking q8 against q13 would legitimately flag it as wrong or at least ambiguous. Cite: `os-file-disk-q8` vs `os-file-disk-q13`/`os-file-disk-q10`.

No other disputes found in the 25 sampled after independent hand computation.

---

## 3. Classic GATE archetypes checked for presence/absence (full-corpus grep, not just the 4 read topics)

**Present and well-covered** (verified via keyword+content search across all 918 Qs):
- Combined TLB+page-table EMAT numerics (`os-memory-q7`, `os-memory-x2`, `os-virtual-memory-x2`, `os-virtual-memory-y3`)
- B+-tree insertion with node splits, copy-up/push-up mechanics (`dbms-indexing-x3` — hand-verified: 2 splits, correct; `dbms-indexing-x4`)
- Extendible hashing directory-doubling (concept only — `dbms-indexing-y3`)
- Booth's multiplication trace (`coa-datapath-y5`, numeric step trace; `coa-datapath-y2`, `digital-arithmetic-q4`, concept)
- RAG single vs multi-instance cycle subtlety (`os-deadlock-q10`, `os-deadlock-q2`, `os-deadlock-q15`)
- Go-Back-N / Selective-Repeat window sizing, ALOHA utilization, bandwidth-delay product, Hamming code, CRC (`cn-datalink-*`)
- Dijkstra / distance-vector routing trace, subnetting/VLSM, ARP, DNS, NAT (`cn-network-*`)
- IEEE-754 single precision encode/decode, denormals, restoring/non-restoring division, carry-lookahead adder (`digital-arithmetic-*`, `digital-combinational-*`)
- 2PL/strict-2PL, timestamp ordering, ARIES-style checkpointing/recovery (`dbms-transactions-*`)
- Belady's anomaly, thrashing, reader-writer, dining philosophers (`os-virtual-memory-*`, `os-sync-*`)

**Confirmed ABSENT (zero hits across the entire 918-question corpus)**:
1. **TCP sequence-number wraparound / modulo-2³² arithmetic** — every sequence-number question (`cn-transport-q3/q4/x2/x3/x14`) uses small, non-wrapping numbers; no question forces the 32-bit modulus.
2. **Amdahl's Law** (fraction-enhanced speedup formula) — absent from `coa-pipelining`/`coa-datapath` entirely; only bare pipeline-speedup and CPI questions exist.
3. **RAID levels** (0/1/5/6 numerics — parity overhead, effective capacity, reliability) — zero mentions anywhere, including `coa-io` and `os-file-disk`.
4. **Cache coherence (MESI / snooping / directory-based)** — zero mentions in `coa-memory`, despite being an established (if less frequent) GATE topic.
5. **Priority inheritance / priority inversion** (the classic Mars-Pathfinder-style real-time scheduling question) — absent from `os-scheduling`/`os-sync`.
6. **Linear hashing** — absent (only extendible hashing appears, and only as one conceptual MSQ, no numeric directory-size/split trace).
7. **B+-tree/B-tree deletion with underflow, merge, and key redistribution** — insertion is well covered (with splits); deletion is not tested at all.

A combined "TLB hit/miss × cache hit/miss" **numerical** EMAT question (four-branch weighted average of translation and data-access latency together) is also missing — two conceptual questions touch virtually-indexed/physically-tagged cache design (`coa-memory-x10/x11`) but no numeric problem combines both hit-rate axes in one formula, which is a well-known GATE hard-question archetype.

---

## 4. Verdict

**Faithful completion of this content would likely secure strong-but-not-perfect marks in these five sections** — I'd estimate 80–90% of the numerical questions correctly, on par with the theory's own accuracy (24/25 = 96% verified correct in my sample; the one dispute is a genuine internal inconsistency, not a computation slip on my part). The theory pages are unusually rigorous for a prep app — derivations, not just rules, with "trap" call-outs that mirror actual GATE distractor design.

**Gap to AIR 1**: the content plateaus at strong-topper level (roughly the 90th–97th percentile band) but has real, identifiable holes that would cost marks on a paper that specifically targets them: no wraparound arithmetic on TCP sequence numbers, no Amdahl's Law, no RAID, no cache coherence, no priority inversion, no B+-tree deletion, and no numeric extendible-hashing/linear-hashing trace. None of these is individually fatal (each is worth at most 1-2 marks historically), but collectively across five subjects they represent a small, correlated blind spot in "combine-two-mechanisms" and "less-common-but-real" archetypes — exactly the kind of question that separates AIR 1 from AIR 200. The one internal inconsistency found (`os-file-disk-q8` SCAN convention contradicting the app's own `os-file-disk-q13`) should be fixed since a sharp student would notice and lose confidence in the answer key.
