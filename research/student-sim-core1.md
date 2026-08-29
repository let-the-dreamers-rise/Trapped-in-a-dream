# Student Simulation — Core Set 1 (PDS · Algorithms · TOC · Compiler Design)

Role-played as a serious GATE CS aspirant (AIR-1 target) doing a faithful study session on this app.
Scope: `data/questions/{pds,algo,toc,compiler}.js`, Node-loaded, read-only (no data files touched).

Inventory: PDS 9 topics / 394 lines of source but 220 questions; Algo 6 topics / 189 Q; TOC 5 topics / 177 Q; Compiler 6 topics / 218 Q. Question `kind` is `mcq` (default), `nat` (via `kind:"nat"`, empty `options`, numeric `answer`), or `msq` (detected by the app as `Array.isArray(qq.answers)` — a *different field name*, `answers` not `answer`). Confirmed counts: PDS mcq165/msq18/nat27, Algo mcq141/msq18/nat30, TOC mcq150/msq20/nat7, Compiler mcq163/msq16/nat26. So all three GATE 2026 formats are genuinely present and correctly wired in `js/app.js` (`qKind`, `msqMatches`, `natMatches`) — my first pass under-counted MSQ because I only grepped the singular `answer` key; worth flagging as a schema quirk (a content author extending a topic who copies an MCQ object and forgets to rename `answer`→`answers` would silently produce a broken MSQ, or vice versa) even though today's data is internally consistent.

## 1. Theory read (4 topics, one per subject)

Read `theory.{intro,core,strategy,deep}` in full for **pds-recursion**, **algo-dp**, **toc-turing**, **compiler-parsing**.

- **pds-recursion**: Genuinely exam-sufficient. Covers print-order tracing (before/after call), value recurrences with worked unrolling, call-count vs. max-stack-depth (explicitly flagged as the classic confusion), tail-recursion identification with the honest caveat that C does **not** guarantee TCO ("assume O(n) space unless told otherwise" — this is a real, often-missed nuance most prep material glosses over). Hole: no McCarthy 91-style nested-call trace (`f(f(n+11))`) is actually *worked*, despite the strategy section naming it as a pattern to expect — theory promises a technique it doesn't demonstrate end-to-end.
- **algo-dp**: Excellent and exam-sufficient — LCS/knapsack/MCM/edit-distance/LIS recurrences with exact indices, the knapsack loop-direction trap (decreasing order to keep 0/1 vs increasing for unbounded) spelled out precisely, pseudo-polynomiality explained correctly (bit-length vs value). Hole: no explicit Bellman-Ford-as-DP framing, no DP-on-trees (a recurring GATE flavor, e.g. max independent set on a tree), no bitmask-DP (TSP), though these are arguably algo-graph's turf and not raised there either (see §3).
- **toc-turing**: Strong — the RE/REC dichotomy, the dovetailing proof that RE ∧ co-RE ⇒ REC, closure tables, and the countability argument are all present and correctly stated, including the double-edged trap about TM-variant equivalence being about *power* not *time*. Sufficient to solve GATE-level TOC-decidability questions built on top of it (confirmed against toc-decidability-x8 below).
- **compiler-parsing**: The strongest of the four — full FIRST/FOLLOW algorithm with the nullable-tail rule spelled out as a checklist, full LR item/closure/goto construction, and — notably — it names the exact canonical "L=R" grammar (`S→L=R|R, L→*R|id, R→L`) as the SLR-vs-LALR witness *and* gives a second grammar witnessing LALR-vs-CLR, which is precisely the kind of concrete worked distinction most prep sources only gesture at. Sufficient to solve GATE parsing problems including PYQ-style ones. Minor hole: operator-precedence parsing and attribute-grammar evaluation order are covered but with no worked numeric example (unlike everything else in this file, which has one).

**Verdict on theory**: for these four topics, yes — a student who reads only this file could solve the corresponding GATE questions. The `deep` sections consistently anticipate the exact trap that shows up in the matched practice questions (see cross-references below), which is unusually well-integrated for a "note-taking app."

## 2. 24 sampled questions — solved independently, then compared

Solved on paper first; only then read the stored answer/explanation. All 24 stored answers matched my own working — **no numeric/logical errors found in this sample.** Full list with IDs:

| # | ID | My answer | Stored | Match | Note |
|---|----|-----------|--------|-------|------|
|1|pds-pointers-q11|5|5|✓|Function-pointer call, textbook-clean|
|2|pds-hashing-x3|slot 7|7|✓|Double hashing, i=0,1,2 → 5,6,7|
|3|pds-trees-q6|n-1|n-1|✓|Sorted-order BST insertion, degenerate chain|
|4|pds-heaps-y1 (MSQ)|{A,C,D}|{0,2,3}|✓|Build-heap O(n), 2nd-largest is root's child — all correctly argued|
|5|pds-graphs-rep-y3 (NAT)|36|36|✓|Trivial V²|
|6|pds-stacks-queues-q13|5 (Catalan C₃)|5|✓|Correctly excludes 3-1-2|
|7|algo-asymptotic-q4|Θ(log log n)|Θ(log log n)|✓|n=2^m substitution, textbook-correct|
|8|algo-dp-q11|Θ(n³)/Θ(n²)|same|✓|MCM complexity|
|9|algo-greedy-x6|8+1+1 vs opt 5+5|same|✓|Second, independent greedy-coin counterexample beyond the standard {1,3,4} one|
|10|algo-graph-y2 (MSQ)|{A,B,C}|{0,1,2}|✓|Dijkstra fails on negative weights, BF is O(VE), Dijkstra can't detect neg cycles|
|11|algo-sorting-searching-q16|coefficient-sum<1 argument|same|✓|Median-of-medians Θ(n) justification is rigorous, not hand-waved|
|12|algo-divide-conquer-x4|Θ(n^log₃5)≈n^1.465|same|✓|Toom-3-style recurrence, correctly beats Karatsuba's n^1.585|
|13|toc-regular-q11|3 states|3|✓|Correctly counts the dead state (the standard "forgot 2" trap is called out)|
|14|toc-cfl-x6|De Morgan / closed-under-∩ contradiction|same|✓|Correct proof strategy, correctly rejects 3 plausible-sounding distractors|
|15|toc-turing-x2|complementation is the false claim|same|✓||
|16|toc-decidability-x8|Rice's theorem, undecidable|same|✓|Correctly identifies the property as nontrivial+semantic|
|17|toc-hierarchy-x1|aⁿbⁿcⁿ|same|✓||
|18|toc-regular-y1 (MSQ)|{A,B,D}|{0,1,3}|✓|Correctly separates aⁿbⁿ (non-regular) from the three regular ones|
|19|compiler-lexical-q11|6 tokens|6|✓|Maximal-munch trace on `x>>=y>>2;` — I hand-traced it independently and it is correct (`>>=`, then `>>`, not `>>` `=` or `>>=` split further)|
|20|compiler-parsing-x6|LALR(1) not SLR(1)|same|✓|The canonical Dragon-Book grammar, correctly identified|
|21|compiler-sdt-q11|cyclic dependency graph|same|✓||
|22|compiler-icg-x2|3 TAC instructions|3|✓|DAG CSE correctly modeled|
|23|compiler-runtime-q11|3 access links|3|✓|depth 5→2|
|24|compiler-optimization-x2|copy propagation|same|✓||

**Disputes found: none substantive.** Two soft observations, not errors:
- **algo-divide-conquer-x4** calls the 5-multiplication/n-3-split scheme "a modified Toom-3-style scheme" — this is real (Toom-Cook-3 does split into thirds and use 5 evaluation points), but the explanation doesn't mention that real Toom-3 needs *interpolation* overhead beyond Θ(n) in a naive implementation for large coefficients; a strong student might get confused if they've read that Toom-Cook's practical constant is much worse than Karatsuba's despite the better exponent. Not wrong, just a corner the explanation smooths over.
- **algo-greedy-x6**'s framing ("a second, independent counterexample") assumes the student has already seen a first one (implying {1,3,4}) elsewhere in the same topic — fine within the app but would read as a dangling reference if this question were seen in isolation (e.g., via spaced repetition surfacing it alone weeks later).

No ambiguous wording and no "assert not teach" explanations were found in this sample — every explanation showed the actual derivation/proof sketch, not just a bald assertion of the answer. This is above the median quality I'd expect from a self-made prep tool.

## 3. Classic GATE archetypes checked for absence (keyword + spot-check search across all 4 files, 781 questions)

Present and well-represented (hit counts from question+explanation text): NFA/subset-construction (17/7), pumping lemma (20), PDA (53), CYK (5), Kruskal/Prim/Dijkstra/Floyd (10/18/10/5), topological sort (9), Master theorem (18), AVL/red-black/splay (4/2/2), amortized analysis as standalone problems — binary counter, dynamic-array doubling, aggregate stack ops (3, algo-asymptotic-z8/algo-graph-z8/algo-sorting-searching-z8), LALR/SLR conflict grammars (the canonical L=R example, plus a second LR(1)-vs-LALR(1) witness grammar in the theory), quickselect (4).

**Confirmed absent / thin** (checked by targeted grep + manual spot-check, not just a raw hit count):
1. **Union-Find / Disjoint-Set as a data structure** — zero questions on path compression, union-by-rank, or the α(n) amortized bound, even though Kruskal's algorithm appears in 5 questions and *implicitly* needs it. GATE has tested union-find complexity directly; students who only use this app will correctly run Kruskal by hand but have never been asked to reason about its cycle-detection substrate.
2. **String matching (KMP / Rabin-Karp / Z-algorithm)** — zero hits anywhere in algo or pds. This is a recurring (if not annual) GATE topic and is entirely missing as its own archetype, not just under-weighted — no failure-function trace, no worst-case-shift-distance numerical.
3. **B-Trees / B+-Trees** — zero hits. Usually a DBMS-adjacent topic but GATE PDS/Algo has asked about B-tree height/order arithmetic; entirely absent here (it may live in dbms.js, which is out of this simulation's scope, but as pure DS content it's a gap in "PDS").
4. **NFA→DFA explicit worked subset-construction with a specific automaton and a request for the exact number of reachable DFA states** (a very common GATE numerical) — "subset construction" appears 7 times but on inspection several are conceptual/definitional rather than "here is this specific 4-state NFA, count DFA states" numericals; I did not find a NAT-style subset-construction state-count question analogous to the double-hashing NAT I solved above.
5. **Dynamic-memory C archetypes** (malloc/free/dangling pointer/memory leak/struct-with-self-pointer recursion combined with pointer arithmetic) — zero hits in pds-pointers or pds-linked-lists text despite 25 pointer questions; the pointer set is otherwise strong (2D arrays, triple pointers, function pointers, struct padding/alignment) but skips the malloc/free/dangling-pointer flavor GATE occasionally uses.
6. **Register allocation via graph coloring, and live-variable/data-flow analysis as a worked dataflow-equation problem** — "register allocation" appears once, "graph coloring" zero times, "dataflow"/"live variable" appear only in passing (3-4 hits, likely theory prose) with no worked in/out-set numerical in compiler-optimization.
7. **Branch-and-bound** — zero hits (backtracking gets 5 hits, but its harder sibling doesn't appear at all).

## 4. Verdict

**Faithful completion of these four topics' theory + the full question banks (PDS/Algo/TOC/Compiler) would likely translate to strong marks in those sections** — the theory is derivation-first (not just definitions), the explanations in the 24-question sample were uniformly correct and taught the reasoning rather than asserting the answer, and all three GATE question formats (MCQ/MSQ/NAT) are genuinely implemented and exercised. This is materially better than a "flashcard app with wrong answers" bar — the actual content risk in this sample is close to zero.

**The gap to AIR-1 is not question-accuracy, it's archetype coverage and calibration against real difficulty.** Missing union-find, string matching, B-trees, and register-allocation/dataflow numericals means a student who only trusts this app will be under-prepared for roughly one guaranteed question per GATE CS paper drawn from exactly these archetypes — each is a near-certain 1-2 marks lost from blind spots the app never surfaces, not from wrong content it teaches. A second gap: with only 4-6 topics per subject and no cross-topic PYQ-style composite question (e.g., an LR-parsing problem that also demands a FIRST/FOLLOW computation as a sub-step, or a DP problem stated as a graph problem), the practice set trains topic-isolated recall more than the exam's habit of stitching two topics into one question — the actual AIR-1 differentiator.

---
*Author: ashwinthebest8@gmail.com's prep session. Data files were only read (Node `require`), never edited.*
