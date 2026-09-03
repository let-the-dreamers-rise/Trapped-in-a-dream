# Theory Sufficiency Audit — GATE Prep App

**Scope:** `data/questions/{toc,compiler,digital,apti}.js`. Node-loaded `window.GATE_DATA.questions`.
**Method:** Sampled 32 questions across the four subjects, all weighted to `difficulty: 'hard'` (the app has no MSQ/multi-select format — every question is single-answer MCQ, so the "MSQ" weighting instruction could not be applied; noted as a format gap, not a theory gap). For each: read the full topic `theory` (intro+core+deep+strategy) and the official `explanation`, and checked whether every rule/table/algorithm the explanation relies on is actually stated in the theory.

Total corpus: 1,141 questions across 20 topics in 4 files (toc: 5 topics/294q, compiler: 6 topics/323q, digital: 5 topics/236q, apti: 4 topics/288q). Difficulty split: easy 284, medium 482, hard 375.

## Per-question table

| # | Question ID | Topic | Verdict | Missing item |
|---|---|---|---|---|
| 1 | toc-regular-q12 | toc-regular | FULLY-COVERED | — (exact "last-k-symbols → 2^k states" recipe is stated) |
| 2 | toc-regular-q13 | toc-regular | FULLY-COVERED | — (product-construction recipe + independence check stated) |
| 3 | toc-cfl-q12 | toc-cfl | FULLY-COVERED | — (inherently-ambiguous i=j-or-j=k example given verbatim) |
| 4 | toc-cfl-q13 | toc-cfl | FULLY-COVERED | — (DCFL closed-under-complement theorem + proof idea stated) |
| 5 | toc-turing-q11 | toc-turing | FULLY-COVERED | — (countability/diagonalization argument stated) |
| 6 | toc-turing-q12 | toc-turing | FULLY-COVERED | — (worked mini-example is the same L1∩L2 scenario) |
| 7 | toc-decidability-x5 | toc-decidability | FULLY-COVERED | — (reduction direction logic gives both forward/backward consequences) |
| 8 | toc-hierarchy-q5 | toc-hierarchy | FULLY-COVERED | — (ww classified as CSL-not-CFL with proof sketch) |
| 9 | compiler-lexical-q8 | compiler-lexical | FULLY-COVERED | — (maximal munch + exact "a---b → 5 tokens" example given) |
| 10 | compiler-lexical-q11 | compiler-lexical | FULLY-COVERED | — (maximal munch rule + compound-operator list covers `>>=`) |
| 11 | compiler-parsing-q8 | compiler-parsing | FULLY-COVERED | — (FIRST-set computation + LL(1) disjointness rule) |
| 12 | compiler-parsing-q11 | compiler-parsing | FULLY-COVERED | — (LALR merge → only new reduce-reduce conflicts, stated as a bolded fact) |
| 13 | compiler-sdt-q7 | compiler-sdt | FULLY-COVERED | — (worked mini-example uses the identical swapped-precedence grammar) |
| 14 | compiler-icg-q6 | compiler-icg | FULLY-COVERED | — (worked example is the identical expression `(p+q)*(p+q)+r`) |
| 15 | compiler-runtime-q7 | compiler-runtime | FULLY-COVERED | — (call-by-name/thunk re-evaluation explained with Jensen's-device caveat) |
| 16 | compiler-optimization-q9 | compiler-optimization | FULLY-COVERED | — (worked mini-example is the identical 4-line liveness program) |
| 17 | digital-boolean-q9 | digital-boolean | FULLY-COVERED | — (XOR/XNOR K-map recognition rule stated) |
| 18 | digital-boolean-q10 | digital-boolean | FULLY-COVERED | — (grouping + literal-count rule stated) |
| 19 | digital-combinational-q11 | digital-combinational | FULLY-COVERED | — (worked example computes the identical 4-unit CLA delay) |
| 20 | digital-combinational-q15 | digital-combinational | FULLY-COVERED | — (mux residue method + D-vs-D' sign trap explicitly flagged) |
| 21 | digital-sequential-q13 | digital-sequential | FULLY-COVERED | — (T-FF up-counter equations T0=1,T1=Q0,T2=Q1Q0 given directly in CORE) |
| 22 | digital-sequential-q14 | digital-sequential | FULLY-COVERED | — (Mealy vs Moore state-count rule, L vs L+1, stated) |
| 23 | digital-number-systems-q9 | digital-number-systems | FULLY-COVERED | — (same-sign-in/opposite-sign-out overflow rule + worked example) |
| 24 | digital-arithmetic-q5 | digital-arithmetic | FULLY-COVERED | — (Booth's run-of-1s = one subtract + one add, stated explicitly) |
| 25 | apti-quant-q15 | apti-quant | FULLY-COVERED | — (sequential/combinatorial without-replacement method taught, general) |
| 26 | apti-quant-q16 | apti-quant | FULLY-COVERED | — (worked mini-example uses the identical 40%/15%/19% numbers) |
| 27 | apti-logical-q15 | apti-logical | FULLY-COVERED | — ("squares of primes (4,9,25,49...)" listed verbatim as a series family) |
| 28 | apti-logical-q16 | apti-logical | FULLY-COVERED | — (sentence-intersection coding method stated) |
| 29 | apti-verbal-q15 | apti-verbal | FULLY-COVERED (minor gap) | The specific valid syllogism pattern used here — universal-negative + particular ⇒ particular-negative ("No A is B, some B is C ⇒ some C is not A") — is not listed as one of the *named* valid/invalid patterns (only "chain through middle term" and "All A are B + All C are B ⇒ nothing" are named). The general Venn-diagram method taught is sufficient to derive it, but a student pattern-matching against the named list alone would not find this one pre-worked. |
| 30 | apti-verbal-q16 | apti-verbal | FULLY-COVERED | — (opener + pronoun-chain method stated, matches question exactly) |
| 31 | apti-data-spatial-q15 | apti-data-spatial | FULLY-COVERED | — (weighted-average formula + worked example) |
| 32 | apti-data-spatial-q16 | apti-data-spatial | FULLY-COVERED | — (pie-chart degree-to-percent anchors, incl. 90°=1/4, listed) |

## A. Percentage FULLY-COVERED

**32/32 = 100%** of the sampled hard questions are fully answerable from the topic's own theory alone (31 cleanly, 1 — apti-verbal-q15 — via the taught general method rather than a pre-listed named rule).

This is a stronger result than a typical audit turns up. The reason is structural: many topics' `strategy.worked mini-example` fields use the *exact same numbers/grammar/expression* as one or more `questions[]` entries (e.g. compiler-icg's DAG example is `(p+q)*(p+q)+r`, identical to the sampled question; compiler-optimization's liveness mini-example is the identical 4-line program; digital-combinational's CLA example computes the same 4-unit delay; apti-quant's markup example uses 40%/15%/19%, identical to the sampled question). The theory content appears to have been authored question-aware.

## B. Missing items, grouped by topic (none block more than 1 question in this sample)

Given the 100% coverage result, there is no missing item that blocks more than one sampled question. The single soft gap found:

- **apti-verbal** (blocks 1 of 8 sampled apti-verbal-adjacent questions): the syllogism section names only two valid/invalid inference patterns explicitly ("chain through shared middle term" and "All-All-same-predicate ⇒ no relation"). It does not name the particular-conclusion-from-mixed-quantifier patterns (No+Some⇒Some-not; Some+All⇒Some) as a checklist, even though one of these two *is* actually given ("Some A are B, All B are C gives Some A are C is valid"). The No+Some case is absent from the named list. Because the section also teaches the fully general Venn-diagram construction method ("draw the extreme case and the loosest case; if the conclusion survives both, it's definite"), a student following the method — not just pattern-matching a memorized list — can still solve it correctly. Recommended fix (see Section F) is to add the missing named pattern for completeness/speed, not because the method is absent.

No other topic in the 32-question sample produced a genuine gap.

## C. Weakest topics for coverage

Ranked by how close each topic came to leaving a gap (not by any question actually missed):

1. **apti-verbal** — the only topic with even a soft/partial finding, due to an incomplete *named-pattern* checklist for syllogisms (the general method itself is complete).
2. **toc-decidability** — theory is extremely dense (Rice's theorem, full CFG/TM decidability catalogue, reduction-direction logic) and technically correct, but it is the topic where a rushed reading is most likely to misfire, since the catalogue has ~15 individually memorized decidable/undecidable verdicts. Not a content gap, but a density/retention risk worth flagging.
3. **compiler-parsing** — LALR/CLR/SLR distinctions are covered in full with two witness grammars, but this is the single most mechanically demanding topic (FIRST/FOLLOW, item-set construction) and the theory, while complete, requires the most practice-to-fluency of any topic sampled.

All other topics (toc-regular, toc-cfl, toc-turing, toc-hierarchy, compiler-lexical, compiler-sdt, compiler-icg, compiler-runtime, compiler-optimization, all 5 digital topics, apti-quant, apti-logical, apti-data-spatial) showed no weakness in this sample — theory fully anchors every hard question tested, frequently via matching worked examples.

## D. Is the DEEP section adding real solving power, or restating CORE?

**Adding real solving power**, consistently, across all four subjects. Pattern observed everywhere:

- CORE gives the compact rule/definition a student needs to recognize the concept and get most one-mark questions right (e.g. CORE states "product construction gives ≤ states" for regular languages).
- DEEP adds precisely the machinery that hard/numerical GATE questions actually require: exact tie-breaking recipes (e.g. "contains substring" vs "ends with substring" state-count formulas, digital-boolean's "checkerboard = XOR, no simplification" recognition rule, compiler-parsing's two concrete LALR-vs-SLR / LALR-vs-CLR witness grammars, digital-sequential's full excitation tables), worked numeric examples with the arithmetic carried all the way through (not just described), and a "GATE TRAPS" list of specific wrong-answer patterns tied to that exact machinery.
- In several topics DEEP literally contains the full worked solution to a question in the sampled question bank (compiler-icg DAG example, compiler-optimization liveness example, digital-combinational CLA delay example, apti-quant markup example) — i.e. DEEP is not generic elaboration, it is targeted, exam-shaped derivation practice.

DEEP is not redundant restatement anywhere in the sample; it is where the actually-testable mechanics (tables, formulas, step-by-step algorithms) live, while CORE is the conceptual map and STRATEGY is the meta-layer (time management, pattern recognition, trap-avoidance).

## E. Digital and Aptitude: does theory support the HARD questions, or stop at basics?

**No, it does not stop at basics — for either subject, and this was the most notable finding.**

- **Digital**: The hard sampled questions required non-trivial multi-step reasoning — CLA critical-path delay tracing (digital-combinational-q11), mux residue-method sign discipline testing D vs D' (digital-combinational-q15), T-flip-flop counter equation derivation (digital-sequential-q13), Mealy-vs-Moore state-count subtlety (digital-sequential-q14), the carry-in/carry-out overflow test rather than the naive discarded-carry test (digital-number-systems-q9), and Booth's algorithm's run-length insight rather than naive shift-add (digital-arithmetic-q5). Every one of these has its full mechanism — not just the vocabulary — spelled out in DEEP, usually with a matching worked numeric example. IEEE 754 (rounding modes, denormals, bias, machine epsilon) is covered to double-precision depth with encode/decode worked examples, well beyond "basics."
- **Aptitude**: Hard questions required combinatorics without replacement, chained percentage factors (not additive), prime-square series recognition, syllogism Venn reasoning, weighted (not arithmetic-mean) averaging, and pie-chart degree arithmetic. All of these are supported by DEEP sections with fast/slow worked-example pairs and an explicit "TIME TRAPS" list naming the exact wrong-answer shortcut GATE plants (e.g. "never add successive percentages," "average speed is harmonic mean, not arithmetic mean," "profit % is on cost price by default").

Both subjects' theory goes well past a "basics" ceiling; the DEEP sections were written with the hard end of the question bank specifically in mind.

## F. THEORY ADDITIONS NEEDED (prioritized)

Only one addition is actually indicated by this audit — everything else held up. Given the 100% hit rate on a hard/adversarially-weighted sample, no broad rewrite is warranted; this is a narrow, low-effort patch.

1. **apti-verbal (`apti-verbal` topic, `theory.core` or `theory.deep`, Syllogism section)** — add the missing named valid-inference pattern for mixed quantifiers. Exact text to add (insert alongside the existing "Some A are B, All B are C gives Some A are C (valid)" line):

   > "No A are B, Some B are C" gives "Some C are not A" (valid): the C's that overlap with B cannot be A (since no B is A), so those C's are definitely outside A. Do not strengthen this to "No C is A" — C's outside the B-overlap are free to be A.

   This closes the one soft gap found (apti-verbal-q15) by giving the exact pattern a name and a "do not overstrengthen" caveat, matching the style of every other rule in that section.

No other additions are needed based on this sample. If a broader/lower-effort audit is wanted later, the highest-value next step would be sampling more of `toc-decidability` and `compiler-parsing` specifically (flagged in Section C for density/mechanical-load, not for missing content) to confirm the catalogue-style theory holds up across its full breadth, not just the two hard items sampled here.

---

### Methodology notes / caveats
- The task asked for MSQ-weighted sampling; this app has **zero MSQ items** (`Array.isArray(q.answer)` returned 0/1141) — every question is single-best-answer MCQ. Sampling was weighted to `difficulty: 'hard'` only; all 32 sampled questions were confirmed hard.
- `theory.core`/`theory.deep` contain `[[FIG:name]]` placeholders (e.g. `[[FIG:dfa-nfa]]`) presumably rendered as diagrams elsewhere in the live app; this audit evaluated only the text content actually present in the data files, which was self-contained even where a figure placeholder appears (the surrounding prose fully describes what the figure would show).
- Sample was stratified: toc 8/294 (2,2,2,1,1 across 5 topics), compiler 8/323 (2,2,1,1,1,1 across 6 topics), digital 8/236 (2,2,2,1,1 across 5 topics), apti 8/288 (2,2,2,2 across 4 topics) — every topic in all four files got at least one hard question checked.
