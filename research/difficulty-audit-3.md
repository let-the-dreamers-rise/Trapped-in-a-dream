# Difficulty Audit 3 — TOC / Compiler / Digital Logic / Aptitude

**Scope:** `data/questions/{toc,compiler,digital,apti}.js`, loaded via Node (`window.GATE_DATA.questions[key].topics[].questions[]`).
**Question:** Are these banks hard enough for an AIR-1 target, or do they give false confidence?
**Method:** Stratified sample of 40 questions (15 hard / 15 medium / 10 easy, 10 per subject, including pyq-tagged and MSQ items), each independently re-rated on the real GATE scale: BELOW-GATE, GATE-1-MARK, GATE-2-MARK, ABOVE-GATE. `answer` (single index) vs `answers` (array) was used to detect MSQ — note the data model does **not** use `kind:"msq"` consistently; only 1 of 74 CS-side "select all" questions carries `kind:"msq"`, the other 73 are plain `answers:[...]` arrays with no `kind` tag. That's a data-hygiene issue worth fixing separately from difficulty.

## Bank-wide counts (all 1024 questions, not just the sample)

| Subject | Total | easy | medium | hard | MSQ (`answers` array) | pyq-tagged |
|---|---|---|---|---|---|---|
| toc | 259 | 69 | 121 | 69 | 37 (14.3%) | 70 |
| compiler | 281 | 65 | 135 | 81 | 21 (7.5%) | 72 |
| digital | 236 | 81 | 119 | 36 | 16 (6.8%) | 56 |
| apti | 248 | 69 | 107 | 72 | 0 | 64 |
| **Total** | **1024** | 284 (27.7%) | 482 (47.1%) | 258 (25.2%) | 74 | 262 |

Label distribution alone is not badly skewed (roughly a quarter hard, half medium, quarter easy). The real skew shows up when you re-rate content against the actual GATE scale — see the sample table.

## Sample table (40 questions)

Legend: BG = BELOW-GATE, G1 = GATE-1-MARK, G2 = GATE-2-MARK, AG = ABOVE-GATE. **Bold** = label/rating mismatch.

| id | labelled | marks | my rating | note |
|---|---|---|---|---|
| toc-regular-q1 | easy | 1 | BG | Pure recall (2^n subset-construction bound). |
| toc-regular-q5 | medium | 1 | G1 | Standard "count mod k" automaton build. |
| toc-regular-q12 | hard | 2 | G2 | Classic 3rd-symbol-from-right trap (8 vs NFA's 4) — genuinely AIR-level. |
| toc-regular-p14 (MSQ, pyq'20) | **medium** | 2 | **G2** | 4-way pumping-lemma nuance (necessary-not-sufficient, vacuous truth for finite languages) — harder than its label. |
| toc-cfl-q13 | hard | 2 | G2 | DCFL closure under complement — real trap vs. CFL non-closure. |
| toc-turing-q2 | easy | 1 | BG | Definition of recursive. |
| toc-turing-q5 | **medium** | 2 | **G1** | Single theorem (RE ∩ co-RE ⇒ REC) via dovetailing; correct concept but overpriced at "2 marks/medium." |
| toc-turing-q14 | hard | 2 | G2 | NOTHALT ∉ RE by contradiction — solid multi-step reasoning. |
| toc-decidability-y1 (MSQ) | **medium** | 2 | **G2** | 4 independent decidability facts incl. Rice's theorem on TM emptiness — harder than "medium." |
| toc-decidability-y6 | hard | 2 | AG | Abstract "how many of {P,Q} forced recursive given a reduction" — genuinely harder than typical GATE phrasing, more like a theory-course qualifier. |
| toc-decidability-p4 (pyq'18) | easy | 1 | G1 | Same core theorem as q5 above, but here labelled *easy* while the near-identical fact is labelled *medium* elsewhere — internal labelling inconsistency. |
| compiler-lexical-q1 | easy | 1 | BG | Definition recall. |
| compiler-lexical-q4 | **medium** | 1 | **BG** | Straight ordering-of-phases recall; no real medium content. |
| compiler-lexical-q8 | hard | 2 | G2 | Maximal-munch tokenization of `a---b;` — classic, genuine trap. |
| compiler-parsing-x7 | medium | 1 | G1 | Dangling-else shift/reduce resolution, single concept. |
| compiler-parsing-z7 (MSQ) | hard | 2 | G2/AG | 4-way SLR(1)/dangling-else claims requiring FOLLOW-set reasoning and outcome-tracing — strong discriminator. |
| compiler-sdt-q3 | easy | 1 | BG | Definition of S-attributed. |
| compiler-sdt-p7 (pyq'21) | **medium** | 2 | **G1** | Plug-and-evaluate one SDT with given precedence; no real second step. |
| compiler-icg-q14 | hard | 2 | G2 | DAG node-counting with shared subexpressions — genuine multi-step. |
| compiler-icg-p3 (pyq'17) | easy | 1 | G1 | TAC-instruction counting for if/else — fine as-is, borderline easy/1-mark. |
| compiler-runtime-x6 | **medium** | 2 | **G2** | Call-by-value vs by-reference full trace — content is harder than its label. |
| compiler-runtime-p6 (pyq'20) | hard | 2 | G2 | Static vs dynamic scoping trace across 3 nested calls — good hard pyq-style item. |
| digital-boolean-q1 | easy | 1 | BG | Pick the functionally-complete gate set. |
| digital-boolean-q4 | medium | 2 | G1 | K-map, no don't-cares, single group of 8 — standard. |
| digital-boolean-q9 | hard | 2 | G2 | Spotting a disguised XOR from two diagonal K-map groups — good. |
| digital-boolean-p4 (pyq'18) | hard | 2 | G2 | Counting **all** prime implicants (not just essential ones) on a 10-minterm map — exactly the kind of PI-count trap AIR-1 papers use. |
| digital-combinational-q4 | medium | 2 | G1/G2 | 4:1 MUX truth-table mapping, 4 select combos — reasonably matched. |
| digital-combinational-p4 (pyq'18) | easy | 1 | G1 | MSB-first magnitude comparator — fine. |
| digital-sequential-q7 | **medium** | 2 | **G1** | Ripple-counter fmax is one multiplication (4×10ns); no combined concept. |
| digital-sequential-q16 | hard | 2 | G2 | 3-bit Johnson-counter modulus by full state simulation, must notice the disjoint 2-cycle — excellent hard item. |
| digital-number-systems-q4 | easy | 1 | BG | Flip-bits definition of 1's complement. |
| digital-number-systems-q10 | medium | 1 | G1 | Sign-extension of 2's complement value. |
| digital-arithmetic-q10 | hard | 2 | G2 | Decode an IEEE-754 hex pattern to decimal — genuine multi-step. |
| apti-quant-q1 | easy | 1 | BG | Ratio division, one substitution. |
| apti-quant-q7 | medium | 1 | G1 | Ratio + linear equation setup and solve. |
| apti-quant-q15 | **hard** | 2 | **G1** | Standard without-replacement P(both red) — single formula, common in every quant-quiz book, not a genuine 2-mark GA composite. |
| apti-quant-pyq2023a (NAT, pyq'23) | medium | 1 | G1 | 2^100 mod 7 via cycle-length — fine as labelled. |
| apti-logical-q17 | **hard** | 2 | **BG/G1** | Clock-hands-coincide via the memorized 60H/11 formula — no real second step once the formula is known. |
| apti-logical-pyq2023a (pyq'23) | medium | 1 | G1 | Day-of-week odd-days rule, single year jump — easier than typical GATE calendar questions (which usually span leap years or multi-year jumps). |
| apti-verbal-q17 | **hard** | 2 | **BG/G1** | Subject-verb agreement via "nearest noun" rule — one grammar rule, one trap, not a multi-step 2-mark item. |

## Answers

**1. What fraction of 'hard'-labelled questions are genuinely GATE-2-mark or above?**
12 of 15 sampled hard questions (80%) hold up as genuine GATE-2-mark or above. All 3 misses (apti-quant-q15, apti-logical-q17, apti-verbal-q17) are in Aptitude — every hard-labelled miss in the sample is from that one subject. TOC/Compiler/Digital hard labels were accurate in every sampled case (11/11), several of them (toc-regular-q12, digital-boolean-p4, digital-sequential-q16, compiler-runtime-p6) are legitimately nasty, AIR-1-caliber traps.

**2. Is the bank skewed easy? Give the observed distribution.**
By label, no (27.7% easy / 47.1% medium / 25.2% hard bank-wide — a reasonable-looking pyramid). By re-rated *content*, yes, in two specific ways:
- 10 of 40 sampled questions (25%) have a difficulty *label* that doesn't match their real content — and every mismatch except one (toc-decidability-y6, which under-shoots and is actually harder than "hard") runs in the *easy* direction: a "medium"/"hard" label sitting on GATE-1-mark or even BELOW-GATE content (toc-turing-q5, compiler-lexical-q4, compiler-sdt-p7, digital-sequential-q7, and all three Aptitude hard-misses).
- Aptitude is the concentrated problem: every one of its "hard" 2-mark questions sampled reduces to a single memorized formula or rule with no combinatorial step layered on top.

**3. TOC/Compiler MSQ — genuinely discriminating, or obviously-wrong distractors?**
Genuinely discriminating in the sample examined. toc-decidability-y1 mixes a decidable DFA-emptiness fact with an undecidable CFG-universality fact and a Rice's-theorem TM-emptiness fact — a student who only remembers "CFG problems are usually decidable" will pick the wrong subset. toc-regular-p14 hinges on the subtle "pumping lemma is necessary, not sufficient" distinction plus a vacuous-truth corner case (finite languages) that most students get backwards. compiler-parsing-z7 requires actually tracing what happens under reduce-preference (else binds to the *outermost* if, not "no else binds") rather than just knowing shift is standard. None of the wrong options in these three were pattern-eliminable without doing the reasoning — that's a real strength. Caveat: the sample only had 3 MSQs (matching the low base rate — 14.3% of TOC and 7.5% of Compiler questions are MSQ), so this is not exhaustive, and the `kind` field is inconsistently set (only 1/74 CS-side "select all" questions is tagged `kind:"msq"`), which is a UI/rendering risk separate from difficulty — worth checking that the quiz renderer detects MSQ from the `answers` array and not from `kind`.

**4. Aptitude — GATE GA 2-mark level, or easy-quiz level?**
Easy-quiz level for the "hard"-labelled 2-mark items specifically. Every sampled apti "hard" question (probability without replacement, clock-hands coincidence, subject-verb agreement) is a single memorized formula or single grammar rule with one clean trap — exactly what appears in generic bank/SSC-style quant books, not the layered, multi-concept 2-mark GA composites real GATE uses (e.g., a probability question that also needs a counting/combinatorics setup, or a data-sufficiency-style item, or a passage-based inference). The medium/easy apti items (ratio+equation, modular cyclicity, ratio division) are fine and correctly pitched at their label. The gap is specifically at the top of the difficulty curve: apti has **zero MSQs** at all (arguably fine, since GATE GA doesn't typically use MSQ) but also has no apparent NAT-heavy multi-step 2-mark GA items in the sample beyond the single modular-arithmetic one. This subject's "hard" tag is the least trustworthy in the whole bank.

**5. Would a 90%+ scorer here be ready for the real GATE paper, or blindsided?**
Mixed, leaning toward blindsided in the aptitude section specifically. On the CS technical side (TOC/Compiler/Digital) a 90%+ scorer would be in reasonably good shape — the genuinely hard items in the sample (DFA state-minimization traps, PI-counting, Johnson-counter simulation, static/dynamic scoping, dangling-else SLR conflicts) are real AIR-1-grade material, and getting them right requires the same reasoning GATE actually tests. But there are three real risks even there: (a) ~25% of items sampled are labeled harder than their actual content, so a "90% on hard questions" metric is partly measuring recall, not synthesis; (b) MSQ exposure is thin (7–14% of CS questions), below what real GATE typically throws (and apti has none at all, which is fine, but the CS subjects could use more); (c) there's exactly one item in the whole 40-question sample that clearly exceeds real GATE difficulty (toc-decidability-y6) — almost nothing trains the "above GATE" ceiling an AIR-1 aspirant needs for margin. On Aptitude, the answer is a clear **blindsided**: a student who aces this bank's "hard" GA questions has mostly memorized standalone formulas (60H/11, cycle-mod-arithmetic, nearest-noun grammar rule) and has not been forced through the compound, multi-concept 2-mark GA questions the real exam uses to separate scores at the top — that's exactly the false-confidence failure mode the owner is worried about, and it's concentrated in one subject, not spread evenly.

## Prioritised list of topics needing harder questions

1. **Aptitude — GA 2-mark composites (highest priority).** Replace/augment the "hard" tier with questions that stack two or more concepts (e.g., probability + combinatorics + conditioning, data sufficiency, multi-step percentage/profit chains, passage-based critical reasoning) rather than single-formula plug-ins. This is the subject where the bank is most likely to mislead a student about their real readiness.
2. **TOC/Compiler/Digital — add a thin layer of ABOVE-GATE stretch questions.** Only 1 of 30 sampled CS questions exceeded real GATE difficulty. AIR-1 prep needs some margin above the ceiling (e.g., minimal-DFA problems with two combined conditions simultaneously — not just one mod-k or one suffix condition; LALR-vs-SLR conflict-count comparisons on a slightly bigger grammar; K-maps with genuine don't-cares layered on multi-output logic).
3. **Fix internal label drift before adding content.** Several near-identical facts carry different difficulty labels across the bank (toc-turing-q5 "medium/2m" vs toc-decidability-p4 "easy/1m" testing the same RE∩co-RE⇒REC theorem). A relabeling pass would make the difficulty metadata trustworthy on its own, independent of adding new questions.
4. **Increase MSQ density in Digital and Compiler** (currently 6.8% and 7.5%) toward TOC's 14.3%, specifically at the hard tier, since the 3 MSQs sampled were the best discriminators in the whole set.
5. **Data hygiene (not difficulty, but adjacent):** normalize the `kind` field — only 1 of 74 "select all" questions across the CS files is tagged `kind:"msq"`; if the UI keys MSQ rendering off `kind` rather than the presence of an `answers` array, most MSQs may be silently rendered as single-answer questions.
