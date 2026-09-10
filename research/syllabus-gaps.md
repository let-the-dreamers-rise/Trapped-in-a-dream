# GATE CS&IT Syllabus Coverage Audit

**App audited:** `/home/user/Trapped-in-a-dream/data/questions/*.js` (11 banks, `window.GATE_DATA.questions[key] = { subject, topics: [{ id, name, questions: [...] }] }`)

**Method:** Extracted every `topics[].id/name` plus the full text (`q` + options + explanation) of all 2,146 questions across the 11 banks into per-subject text dumps, then grepped for the keyword(s) that signal real coverage of each official syllabus line item (e.g. `lattice`, `generating function`, `Booth`, `segmentation`, `RAID`, `ER model`, `CIDR`, `public key`). A line item is marked **MISSING** only when no topic name and no question/explanation text anywhere in the 11 banks contains a relevant keyword.

**Official syllabus source (GATE 2026 CS&IT, IIT Guwahati):** summarized from
[GeeksforGeeks — GATE CSE Syllabus](https://www.geeksforgeeks.org/gate/gate-cse-syllabus/) (aggregating the official gate2026.iitg.ac.in syllabus PDF); section list cross-checked against
[Vedprep — GATE CSE Syllabus 2026](https://www.vedprep.com/exams/gate/gate-cse-syllabus/) and
[Careers360 — GATE CSE Syllabus 2026](https://engineering.careers360.com/articles/gate-syllabus-for-computer-science-and-information-technology).

Total banks: algo, apti, cn, coa, compiler, dbms, digital, engmath, os, pds, toc — 56 topics, 2,146 questions.

---

## 1. Engineering Mathematics

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| Propositional and First-Order Logic | engmath-discrete-logic | engmath-discrete-logic-y6 (boolean connectives, truth-functional completeness); topic name is exact match |
| Sets, Relations, Functions, Partial Orders and Lattices | engmath-sets-relations | engmath-sets-relations-q6 (poset, Hasse-style divisibility lattice, GLB/LUB) |
| Monoids and Groups | engmath-groups | engmath-groups-q1, -q2 (cyclic group generators), -q5 (idempotent element) |
| Graphs: connectivity, matching, coloring | engmath-graph-theory | engmath-graph-theory-q4/q16 (chromatic number), -q11 (perfect matchings in K3,3), -q9 (vertex/edge connectivity vs min degree) |
| Combinatorics: counting, recurrence relations, generating functions | engmath-combinatorics, algo-asymptotic | engmath-combinatorics-q8/x5 (coefficient via generating-function expansion of 1/(1-x)^3); algo-asymptotic-y5 (recurrence evaluation) |
| Linear Algebra: matrices, determinants, systems of linear equations, eigenvalues/eigenvectors | engmath-linear-algebra | engmath-linear-algebra-q1/q2 (eigenvalues), -q3 (rank/determinant), -q12 (homogeneous system solutions) |
| Linear Algebra: LU decomposition | engmath-linear-algebra | THEORY ONLY (partial) — engmath-linear-algebra-q14 references "Gaussian elimination ... yielding A = LU" but no question drills LU factorization steps directly |
| Calculus: limits, continuity, differentiability, maxima/minima, mean value theorem, integration | engmath-calculus | engmath-calculus-q10 (Mean Value Theorem), -q11 (local maxima), -y3 (Riemann integrability / FTC) |
| Probability: random variables, uniform/normal/exponential/Poisson/binomial distributions | engmath-probability | engmath-probability-q8 (binomial), -q10/q11 (Poisson), -q14 (exponential), -q15 (normal/Gaussian), -y3 (uniform, mixed) |
| Probability: mean/median/mode/standard deviation | engmath-probability | engmath-probability-q8, -q10 (E[X], Var(X)) — median/mode specifically: MISSING (no question computes median or mode directly) |
| Probability: conditional probability, Bayes' theorem | engmath-probability | engmath-probability-q4 (screening test, Bayes), -q5 (two-box conditional draw) |

## 2. Digital Logic and Design

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| Boolean Algebra and Minimization (algebraic, K-map, tabular) | digital-boolean | digital-boolean-q3/q4 (4-variable K-map minimization) |
| Combinational Circuits | digital-combinational | topic name direct match; large question set (34) |
| Sequential Circuits (flip-flops, latches) | digital-sequential | 30 flip-flop/latch hits across digital.txt |
| Number Representations (fixed/floating point) | digital-number-systems, digital-arithmetic | digital-number-systems-q13 (binary fraction representation); digital.txt has floating-point questions under digital-arithmetic |
| Computer Arithmetic incl. IEEE 754 | digital-arithmetic | topic name explicitly "Computer Arithmetic & IEEE 754"; floating-point keyword present in digital.txt |

## 3. Computer Organization and Architecture

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| Instruction Set and Addressing Modes | coa-instructions | topic name direct match |
| Design of ALU | coa-datapath | topic name "ALU, Datapath & Control Unit"; coa-datapath-y2/y5 (Booth's algorithm multiplication) |
| Design of Control Unit — Hardwired and Microprogrammed | coa-datapath, coa-instructions | coa-instructions-x10 ("why ... rely on a microprogrammed control unit rather than hardwired control") |
| I/O Interface (Interrupt and DMA mode) | coa-io | coa-io-q1/q2 (DMA vs interrupt-driven I/O, cycle-stealing DMA) |
| Instruction Pipelining and hazards | coa-pipelining | coa-pipelining-q1 (speedup), -q2 (data hazard) — note: literal phrase "instruction pipelining" not present verbatim, but topic + hazard/speedup questions cover it |
| RAID / secondary storage redundancy (adjacent to I/O topic, sometimes drawn on) | coa-io | **MISSING** — no question or explanation anywhere in the 11 banks mentions RAID or "redundant array" |

## 4. Programming and Data Structures

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| Programming in C | pds-c-basics | topic name direct match, 24 questions |
| Recursion | pds-recursion | topic name direct match |
| Arrays, Stacks, Queues | pds-pointers, pds-stacks-queues | topic names direct match |
| Linked Lists | pds-linked-lists | topic name direct match |
| Trees, Binary Search Trees | pds-trees | topic name direct match |
| Binary Heaps | pds-heaps | topic name direct match |
| Graphs (representation/traversal) | pds-graphs-rep | topic name direct match |
| Hashing (as a PDS topic, distinct from Algorithms' hashing) | pds-hashing | topic name direct match |

## 5. Algorithms

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| Searching, Sorting, Hashing | algo-sorting-searching | topic name direct match |
| Asymptotic worst-case time/space complexity | algo-asymptotic | algo-asymptotic-q1, -q7 (Theta/Omega/O reasoning) |
| Algorithm design: Greedy | algo-greedy | algo-greedy-q7 (fractional knapsack vs 0/1), -x8 (Kruskal tie-breaking) |
| Algorithm design: Dynamic Programming | algo-dp | algo-dp-q6 (0/1 knapsack Theta(nW), explicitly notes NP-hardness) |
| Algorithm design: Divide-and-Conquer | algo-divide-conquer | algo-divide-conquer-q3 (quicksort worst case), -q9 (max-min recurrence) |
| Graph traversals, MST, shortest paths | algo-graph | algo-graph-q5 (Dijkstra), algo-graph-q8 (SCC); algo-greedy-x8 (Kruskal MST) |
| NP-completeness / NP-hardness (as reasoning context, not a standalone syllabus line but drawn on in DPP-adjacent questions) | algo-dp, algo-greedy | 1x "NP-complete", 4x "NP-hard" hits, e.g. algo-dp-q6 |

## 6. Theory of Computation

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| Regular Expressions and Finite Automata (DFA/NFA) | toc-regular | 55 DFA/NFA hits; toc-regular-q2/q9 |
| Context-Free Grammar and Pushdown Automata | toc-cfl | toc-cfl-q5/q8; 5 "pushdown automata" hits |
| Regular and Context-Free Languages | toc-regular, toc-cfl, toc-hierarchy | topic set covers both classes plus toc-hierarchy for Chomsky classification |
| Pumping Lemma | toc-regular, toc-cfl | toc-regular-q9 (pumping lemma for regular languages) — 26 "pumping lemma" hits in toc.txt |
| Turing Machines and Undecidability | toc-turing, toc-decidability | toc-turing-q8 (NTM vs DTM); 33 "recursively enumerable" hits; halting-problem coverage present |

## 7. Compiler Design

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| Lexical Analysis | compiler-lexical | compiler-lexical-q2/q3 (lexeme, regex-based tokenization) |
| Parsing | compiler-parsing | topic name direct match, 36 questions |
| Syntax-Directed Translation | compiler-sdt | topic name direct match |
| Runtime Environments | compiler-runtime | topic name direct match |
| Intermediate Code Generation | compiler-icg | compiler-icg-q5/q8 (three-address code, DAG vs syntax tree) |
| Local Optimization | compiler-optimization | compiler-optimization-q3/q4 (constant folding/propagation) |
| Data-flow analysis: constant propagation, liveness analysis, common-subexpression elimination | compiler-optimization, compiler-icg | compiler-optimization-q3/q4 (constant propagation), -q6 (dead code, adjacent to liveness) — **liveness analysis explicitly named: THEORY ONLY / weak** (only dead-code-elimination question found, no question names "liveness analysis" or builds a live-variable data-flow equation); common subexpression elimination surfaces via DAG-IR question (compiler-icg-q8) but no dedicated CSE-transformation question found |

## 8. Operating System

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| System Calls, Processes, Threads | os-processes | os-processes-q7/q8 (threading models) |
| IPC, Concurrency and Synchronization | os-sync | os-sync-q5 (binary vs counting semaphore); os-processes-x2 (thread-shared memory, IPC-adjacent) |
| Deadlock | os-deadlock | topic name direct match |
| CPU and I/O Scheduling | os-scheduling | topic name direct match |
| Memory Management and Virtual Memory | os-memory, os-virtual-memory | os-memory-q3/q8 (fragmentation, paging vs segmentation) |
| File Systems | os-file-disk | topic name "File Systems & Disk Scheduling" |
| RAID (often bundled with OS storage/file-systems topics) | os-file-disk | **MISSING** — no RAID keyword anywhere in os.txt either |

## 9. Databases

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| ER-Model | dbms-er | dbms-er-q2 (weak entity set) |
| Relational model: relational algebra, tuple calculus, SQL | dbms-ra-sql | dbms-ra-sql-q14 (safe/unsafe tuple relational calculus) |
| Integrity constraints, normal forms | dbms-er, dbms-normalization | dbms-er-q3/q4 (entity integrity, foreign keys); dbms-normalization-x3 (FD-based normal form) |
| File organization, indexing (B/B+-trees) | dbms-indexing | dbms-indexing-q3/q5 (B+-tree vs B-tree fanout) |
| Transactions and Concurrency Control | dbms-transactions | dbms-transactions-q1 (ACID), -q10 (recoverability/2PL-adjacent schedule classification) |

## 10. Computer Networks

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| Layering: OSI and TCP/IP stacks | cn-basics | cn-basics-q10 (OSI presentation layer) |
| Basics of Switching (circuit, packet, virtual circuit) | cn-basics | cn-basics-q3/x9 (circuit vs packet switching setup delay) |
| Data Link Layer (error detection, MAC, Ethernet) | cn-datalink | cn-datalink-q1 (Ethernet collision/broadcast domains), -q2 (CRC generator polynomial), -q10 (CSMA/CD), -x14 (Hamming code) |
| Routing (distance vector, link state) | cn-network | cn-network-q12/x7 (distance-vector vs link-state) |
| IPv4: Fragmentation, CIDR, NAT | cn-network | cn-network-q8/q9 (CIDR subnetting), -q16 (NAT) |
| Transport Layer (flow control, congestion control, TCP, socket API) | cn-transport | cn-transport-q1/q2 (UDP vs TCP, flow control window); cn-transport-x12 ("listening on TCP port 80", socket-adjacent) — **explicit socket API calls (`socket()`,`bind()`,`listen()`): MISSING**, coverage is conceptual only |
| Application Layer (DNS, HTTP) | cn-application | cn-application-q3/q4 (HTTP persistent vs non-persistent); DNS covered via cn-network ARP/DNS-adjacent questions — direct DNS-resolution question present in cn.txt |

## 11. General Aptitude

| Syllabus line item | Covered by topic | Evidence |
|---|---|---|
| Verbal Aptitude (grammar, vocabulary, reading comprehension) | apti-verbal | topic name direct match, 46 questions |
| Quantitative Aptitude (data interpretation, ratios, percentages, P&C, mensuration, stats, probability) | apti-quant, apti-data-spatial | topic names direct match |
| Analytical Aptitude (logical deduction/induction, analogy) | apti-logical | apti-logical-q10 (syllogism: "All pens are books...") |
| Spatial Aptitude (rotation, folding, 2D/3D patterns) | apti-data-spatial | topic name "Data Interpretation & Spatial Reasoning" — bundled with DI rather than a standalone spatial topic, but present |

---

## TOP GAPS TO FILL (prioritized)

1. **RAID (RAID levels / redundant array of disks)** — genuinely MISSING. No question or explanation across all 11 banks (checked coa-io, os-file-disk, dbms) mentions RAID. This is a recurring GATE topic under OS file-systems / storage and should get its own set of questions (e.g. under `os-file-disk` or `coa-io`).
2. **Explicit Socket API mechanics** (`socket()`, `bind()`, `listen()`, `connect()`, `accept()` — the "socket API" clause of the Transport Layer syllabus line) — currently only implied conceptually via "listening on TCP port 80"; no question drills the actual API/sequence.
3. **Liveness analysis / live-variable data-flow equations** (Compiler Design → Local/Data-flow Optimization) — only dead-code-elimination is tested; no dedicated liveness/data-flow-equation question.
4. **LU decomposition as its own procedure** (Engineering Mathematics → Linear Algebra) — only touched in passing inside a Gaussian-elimination question; add a direct LU-factorization computation question.
5. **Probability: median/mode of a distribution** — mean and variance are well tested (Poisson, Binomial, Exponential, Normal) but no question asks for median or mode directly.
6. **Common subexpression elimination as an explicit optimization** (Compiler Design) — DAG-based IR touches on it, but no question directly transforms code by eliminating a common subexpression.

**Items checked:** 46 (11 syllabus sections' line items, see tables above) | **Fully MISSING:** 1 (RAID) | **Partial/theory-thin gaps flagged:** 5 (socket API mechanics, liveness analysis, LU decomposition, probability median/mode, CSE optimization)
