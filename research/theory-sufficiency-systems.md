# Theory Sufficiency Audit — OS / COA / CN / DBMS

**Scope:** `data/questions/{os,coa,cn,dbms}.js`. Sample of 32 questions drawn across the four
subjects, weighted toward `difficulty:'hard'` and `type:'numerical'` (8 per subject, spread
across distinct topics so no single topic dominates the sample). For each question the full
`theory` object (`intro + core + deep + strategy`) of its owning topic was read in full and
checked against every formula/rule/step the official `explanation` relies on.

Method note: because the dataset is overwhelmingly `hard`+`numerical` in these four subjects
(408 hard / 500 numerical out of 1216 total questions), the weighted sample was easy to fill
entirely from that pool — every one of the 32 sampled questions below is both `hard` and
`numerical`, i.e. the highest-risk cell the brief asked to stress-test.

## Per-question table

| # | Question ID | Topic | Verdict | Missing item (if not fully covered) |
|---|---|---|---|---|
| 1 | os-processes-q6 | os-processes | FULLY-COVERED | — (theory's Worked Example 2 is this exact `if(fork()==0){fork();}fork();` pattern) |
| 2 | os-scheduling-q6 | os-scheduling | FULLY-COVERED | — (SRTF re-evaluation-at-every-arrival rule stated + worked) |
| 3 | os-sync-q3 | os-sync | FULLY-COVERED | — ("whichever process's write to turn happens last blocks itself" stated verbatim in core/strategy) |
| 4 | os-deadlock-q4 | os-deadlock | FULLY-COVERED | — (Banker's safety-algorithm procedure fully specified) |
| 5 | os-memory-q2 | os-memory | FULLY-COVERED | — (strategy explicitly instructs simulating first/best/worst fit as three separate traces) |
| 6 | os-virtual-memory-q5 | os-virtual-memory | FULLY-COVERED | — (deep section's Worked Example 1 is the identical reference string, 3 vs 4 frames, 9 vs 10 faults) |
| 7 | os-file-disk-q2 | os-file-disk | FULLY-COVERED | — (formula + worked example showing triple-indirect dominance) |
| 8 | os-processes-q13 | os-processes | FULLY-COVERED | — (derivable from the stated "trace child/parent separately under conditional fork" rule) |
| 9 | coa-instructions-q10 | coa-instructions | FULLY-COVERED | — (deep section's expanding-opcode recipe is a 3-level worked example of the identical shape) |
| 10 | coa-datapath-q9 | coa-datapath | FULLY-COVERED | — (CPI-weighted average + "always compare total time, never CPI/clock alone" both stated) |
| 11 | coa-pipelining-q6 | coa-pipelining | FULLY-COVERED | — (core explicitly gives "2 stall cycles in a 5-stage pipe with split-phase access, without forwarding") |
| 12 | coa-memory-q7 | coa-memory | FULLY-COVERED | — (tag-bits formula + worked example of the same partition) |
| 13 | coa-io-q6 | coa-io | FULLY-COVERED | — (track-capacity/revolution-time relation explicit, incl. the inverse direction used here) |
| 14 | coa-instructions-q12 | coa-instructions | **PARTIAL** | No worked example ever counts instructions for a two-independent-subexpression sum (`A*B + C*D`) on a single-accumulator machine. Core/deep only say accumulator machines "typically need one LOAD/STORE pair around most operators" — this is too generic to make the *mandatory spill-to-T between the two products* obvious; a student has to independently reason out why 6 instructions (no spill) is impossible. |
| 15 | coa-datapath-q12 | coa-datapath | **PARTIAL** | Overflow (V) is defined precisely ("carry into sign bit differs from carry out of it"), but the **Carry flag (C) is never defined** anywhere in the topic's theory — no statement that C = carry-out of the MSB in unsigned addition. A student can compute V correctly but has no theory-taught way to justify C=0. |
| 16 | coa-pipelining-q9 | coa-pipelining | FULLY-COVERED | — ("penalty × branch fraction × misprediction rate" given as a named reusable expression) |
| 17 | cn-basics-q11 | cn-basics | FULLY-COVERED | — (Tt + Tp formula, with the exact "don't double propagation" trap called out) |
| 18 | cn-datalink-q9 | cn-datalink | FULLY-COVERED | — (U = W/(1+2a) formula given directly, with W < 1+2a case covered) |
| 19 | cn-network-q11 | cn-network | FULLY-COVERED | — (supernetting alignment rule: "first block address divisible by aggregate block size") |
| 20 | cn-transport-q7 | cn-transport | FULLY-COVERED | — (congestion-avoidance +1 MSS/RTT rule, with a nearly identical worked cwnd trace) |
| 21 | cn-application-q11 | cn-application | FULLY-COVERED | — (RSA key-generation steps + a full worked d-finding example) |
| 22 | cn-basics-q12 | cn-basics | FULLY-COVERED | — (Shannon formula + explicit dB→linear conversion trap) |
| 23 | cn-datalink-q11 | cn-datalink | FULLY-COVERED | — (Lmin = 2·Tp·R given explicitly as invertible "solve for any one of frame size/distance/bandwidth") |
| 24 | cn-network-q13 | cn-network | FULLY-COVERED | — (Bellman-Ford relaxation rule stated with the exact "add own link cost" trap) |
| 25 | dbms-er-q12 | dbms-er | FULLY-COVERED | — (weak-entity table rule + mandatory M:N junction-table rule both explicit) |
| 26 | dbms-ra-sql-q13 | dbms-ra-sql | FULLY-COVERED | — (strategy explicitly tells you to tabulate join counts row by row, ties included) |
| 27 | dbms-normalization-q13 | dbms-normalization | FULLY-COVERED | — (2NF partial-dependency test + candidate-key-finding recipe both explicit) |
| 28 | dbms-indexing-q13 | dbms-indexing | FULLY-COVERED | — (fan-out × fan-out × leaf-capacity multiplication is a direct application of the stated node-structure rules) |
| 29 | dbms-transactions-q15 | dbms-transactions | FULLY-COVERED | — (basic TO write rule stated verbatim, including the Thomas-write-rule contrast used as a distractor) |
| 30 | dbms-er-q13 | dbms-er | FULLY-COVERED | — (ternary-relationship-needs-its-own-table rule stated explicitly) |
| 31 | dbms-ra-sql-q15 | dbms-ra-sql | FULLY-COVERED | — (division formula + a fully worked division example) |
| 32 | dbms-normalization-q14 | dbms-normalization | FULLY-COVERED | — (3NF synthesis algorithm, incl. "add a key relation if no component contains a candidate key," stated in both core and deep) |

## A. Percentage fully covered

**30 / 32 = 93.75% (≈ 94%) FULLY-COVERED.** 2 questions (6.25%) were PARTIAL. **0 questions were
NOT-COVERED** — no sampled question required a formula, rule or technique entirely absent from
its topic's theory.

## B. Missing items, grouped by topic, ordered by how many questions they block

Only two gaps surfaced in the entire 32-question sample, each blocking exactly one question:

1. **coa-datapath (blocks 1 question: coa-datapath-q12)** — The Carry flag (C) is never
   explicitly defined. The theory defines the Overflow flag (V) precisely via the
   carry-into-vs-carry-out-of-sign-bit rule, but nowhere states "C = carry-out of the MSB in
   unsigned addition," so a student who nails V has no theory-given basis for C.
2. **coa-instructions (blocks 1 question: coa-instructions-q12)** — No worked example walks
   through minimum-instruction-count reasoning for a **multi-term expression on a
   single-accumulator machine** (e.g. `Y = A*B + C*D`). The theory's one relevant sentence
   ("typically need one LOAD/STORE pair around most operators... only one operand can be in
   the AC at a time") doesn't make explicit *why* a STORE-to-temporary between two independent
   products is unavoidable — the closest worked material is for 3-/2-address and stack
   machines, not accumulator machines.

No other topic in the sample (os-processes, os-scheduling, os-sync, os-deadlock, os-memory,
os-virtual-memory, os-file-disk, coa-pipelining, coa-memory, coa-io, all five cn-* topics, and
all five dbms-* topics) produced a gap.

## C. Weakest theory-to-question coverage

By this sample, **coa (Computer Organization & Architecture)** is the only subject that
produced any gap at all, and both gaps sit in the "ALU / datapath / instruction-set" cluster
(`coa-datapath`, `coa-instructions`) rather than in pipelining, memory hierarchy, or I/O, which
were airtight. OS, CN and DBMS theory were fully sufficient for every hard numerical sampled —
CN in particular is unusually strong: even a question testing an inverted/uncommon direction of
a formula (e.g. deriving *distance* from a CSMA/CD minimum-frame-size constraint, or deriving
the *supernet* from four /24s) had that exact inversion anticipated in the theory's strategy
section. If forced to rank, the order from weakest to strongest coverage in this sample is:
**COA (2 partials) > OS = CN = DBMS (0 gaps each)**.

## D. Does the DEEP section add real solving power, or just restate CORE?

**It adds real, load-bearing solving power in this dataset — it is not filler.** Concretely,
across all 22 topics touched by the sample, `deep` consistently contributed things `core` does
not:
- **Fully worked numeric examples** that match (sometimes almost verbatim) the exact scenario
  later asked in a question — e.g. the Belady's-anomaly trace in os-virtual-memory (identical
  reference string, identical frame counts, identical fault counts, 9 vs 10), the expanding-opcode
  three-level trace in coa-instructions, the RSA key-generation walkthrough in cn-application,
  the timestamp-ordering write-rule (including the Thomas-write-rule variant) in
  dbms-transactions, and the FD-closure/candidate-key worked examples in dbms-normalization.
- **Extra named rules/variants absent from core**, e.g. Wait-Die/Wound-Wait deadlock-prevention
  (dbms-transactions), the EAT-with-page-faults extended formula (os-memory), local-vs-global
  L2 miss-rate distinction (coa-memory), and the minimal-cover three-step algorithm
  (dbms-normalization).
- **A denser, more specific GATE-trap catalogue** than core's paragraph-level warnings — these
  traps are frequently exactly the wrong-answer distractor the question bank builds in.

Where `deep` is genuinely closer to restating `core` (e.g. the OSI/TCP-IP layer table in
cn-basics, the ACID definitions in dbms-transactions) it still adds structured
tables/comparisons that speed recall even if it adds no new fact. So on balance: **yes, deep is
doing real work**, and the two gaps found (§B) are gaps in *both* core and deep simultaneously —
not cases where core was thin but deep compensated.

## THEORY ADDITIONS NEEDED (prioritised)

1. **`coa-datapath` — add an explicit Carry-flag definition next to the existing Overflow
   definition.** Insert into `core` (and mirror briefly in `deep`), immediately after the
   existing overflow sentence:
   > "The Carry flag (C) is set to the carry OUT of the most significant bit (bit width − 1)
   > of the result, treating the operands as unsigned — it is a separate flag from Overflow
   > (V), which uses the same carry-out but XORed against the carry INTO the sign bit. For
   > two 8-bit operands, C = 1 means the unsigned sum exceeded 255 (a genuine unsigned
   > overflow/wrap), regardless of what V says about the signed interpretation. A single
   > addition can set C alone, V alone, both, or neither — always compute both independently
   > from the same bit-by-bit carry chain rather than assuming one implies the other."

2. **`coa-instructions` — add a short worked example of a multi-operator expression on a
   single-accumulator (one-address) machine.** Insert into `deep`, alongside the existing
   n-address expression-evaluation rule:
   > "WORKED EXAMPLE (accumulator-machine expression evaluation): compute Y = A*B + C*D on a
   > one-address machine with LOAD X / STORE X / ADD X / SUB X / MUL X (each combines memory
   > operand X with the accumulator). Because there is only one accumulator, the two
   > multiplications cannot both be 'in progress' at once: LOAD A; MUL B leaves A*B in the
   > accumulator, but computing C*D next requires loading C into the very same accumulator,
   > destroying A*B. The first product MUST therefore be spilled to a temporary memory
   > location (STORE T) before starting the second: LOAD A; MUL B; STORE T; LOAD C; MUL D;
   > ADD T; STORE Y — 7 instructions. General rule: on a single-accumulator machine, every
   > independent sub-expression computed after the first one forces exactly one extra
   > STORE/LOAD spill pair (here just one STORE, since the value is immediately reused by
   > ADD) — count spills, not just operators, when asked for the minimum instruction count."

No other additions are indicated by this sample — OS, CN, and all remaining DBMS/COA topics
checked had every formula, edge case, and procedure the official explanations relied on already
stated somewhere in their theory (most often in both `core` and `deep`, with `deep` supplying
the numeric worked-example version).
