# Difficulty Audit #1 — engmath / algo / pds question banks

**Scope:** `data/questions/{engmath,algo,pds}.js` (901 questions total: 257 easy / 435 medium / 209 hard).
**Method:** Node-loaded `window.GATE_DATA.questions`, stratified random sample of 40 questions (15 hard, 15 medium, 10 easy, weighted so ~35% of each tier carries a `pyqYear` tag), each graded independently against the real GATE 2-mark bar, blind to the bank's own label until after rating.

**Scale used**
- **BELOW-GATE** — pure recall/definition or one-step substitution; wouldn't survive as a real GATE question at all.
- **GATE-1-MARK** — single concept, one or two mechanical steps.
- **GATE-2-MARK** — multi-step, or combines two concepts, or contains a genuine trap that a plausible wrong path falls into.
- **ABOVE-GATE** — harder than GATE typically asks.

## Sample table

| # | id | labelled | rating | note |
|---|----|----------|--------|------|
| 1 | algo-sorting-searching-pyq4 | hard | GATE-2 | build-heap→extract-max, two chained sift-downs, real trace |
| 2 | pds-stacks-queues-q13 | hard | GATE-2 | stack-permutation Catalan count, non-obvious constraint |
| 3 | algo-sorting-searching-pyq2 | hard | GATE-2 | full merge-sort comparison count across 3 merge levels |
| 4 | pds-graphs-rep-p3 | hard | GATE-2 | DFS edge classification (tree/back/forward/cross), needs gray/black timing |
| 5 | pds-linked-lists-y2 | hard | **GATE-1 (mismatch)** | MSQ of linked-list facts; mostly recall, one decent trap (fake O(1) delete), no computation |
| 6 | algo-asymptotic-z7 | hard | **GATE-1/BELOW (mismatch)** | plug numbers into a given recurrence bottom-up; zero conceptual load |
| 7 | pds-trees-q10 | hard | GATE-2 | inorder-successor-without-parent-pointer logic, real conceptual trap vs. predecessor |
| 8 | pds-pointers-q13 | hard | **GATE-1 (mismatch)** | one-line C pointer trace, single offset trick |
| 9 | engmath-probability-q4 | hard | GATE-2 | Bayes/false-positive paradox, law of total probability + Bayes chained |
| 10 | algo-dp-pyq2 | hard | GATE-2 | edit distance, full DP table implied |
| 11 | algo-graph-y3 | hard | GATE-2 | MST uniqueness MSQ, bridge-exception trap is genuinely subtle |
| 12 | algo-graph-z8 | hard | GATE-2 | amortized dynamic-array doubling, trace over 10 pushes |
| 13 | engmath-discrete-logic-x2 | hard | **GATE-1 (mismatch)** | negate one quantified implication; standard, no second concept |
| 14 | algo-graph-pyq3 | hard | GATE-2 (borders ABOVE) | Bellman-Ford with a negative edge, 5-vertex full relaxation trace |
| 15 | pds-graphs-rep-p4 | hard | GATE-2 | topo-sort via DFS finish order on a DAG, full trace required |
| 16 | engmath-probability-pyq11 | medium | **GATE-1 (under)** | just doubles a given probability via symmetry — no real 2nd step |
| 17 | pds-pointers-q9 | medium | GATE-1 | double-pointer deref + `+=`, single mechanical step |
| 18 | engmath-sets-relations-pyq7 | medium | GATE-2 (exceeds) | onto-function count via inclusion–exclusion, real technique |
| 19 | algo-divide-conquer-pyq3 | medium | GATE-1 | plain Master-theorem Case-1 substitution |
| 20 | engmath-calculus-q15 | medium | **GATE-1/BELOW (under)** | routine integration-by-parts, no trap, no second concept |
| 21 | engmath-groups-y3 | medium | GATE-1 | homomorphism-properties MSQ, pure theorem recall |
| 22 | algo-dp-f2 | medium | **GATE-1/BELOW (under)** | count F(2) calls in a given, already-drawn recursion tree |
| 23 | algo-dp-x3 | medium | GATE-2 (exceeds) | ordered vs. unordered step-counting, real permutation/combination trap |
| 24 | engmath-graph-theory-q7 | medium | GATE-2 (exceeds) | K5/K3,3 planarity, needs both the general and bipartite edge bounds |
| 25 | algo-graph-pyq5 | medium | GATE-2 (exceeds) | Kruskal trace + uniqueness argument on 5 vertices |
| 26 | pds-heaps-y5 | medium | GATE-1 | plug n=50 into complete-binary-tree height formula |
| 27 | algo-asymptotic-q9 | medium | GATE-1 (good fit) | i=i*i loop → Θ(log log n), genuine single-concept trap |
| 28 | pds-heaps-q5 | medium | GATE-1 | build-heap + k extracts, one composition step |
| 29 | algo-greedy-pyq4 | medium | GATE-2 (exceeds) | greedy vs. optimal coin-change counterexample, real trap |
| 30 | pds-stacks-queues-p6 | medium | GATE-1 | postfix→infix mechanical stack trace, no trap |
| 31 | algo-sorting-searching-y5 | easy | GATE-1 | inversion count on a decreasing array |
| 32 | engmath-linear-algebra-pyq11 | easy | GATE-1 | rank–nullity substitution (minor row/column trap) |
| 33 | pds-heaps-q9 | easy | BELOW-GATE | pure recall: heapsort complexity + stability |
| 34 | pds-stacks-queues-q4 | easy | BELOW-GATE | pure recall: circular-queue capacity is n−1 |
| 35 | engmath-probability-y6 | easy | BELOW-GATE | E[X]=np, one substitution |
| 36 | pds-graphs-rep-q9 | easy | BELOW-GATE | pure definition: traversal count = component count |
| 37 | algo-dp-pyq9 | easy | GATE-1 | knapsack DP complexity recall, pseudo-poly nuance adds a little |
| 38 | engmath-combinatorics-q2 | easy | GATE-1 | pigeonhole guarantee, one formula application |
| 39 | engmath-groups-pyq12 | easy | GATE-1 | shoe-sock rule, recall + one-line proof |
| 40 | pds-trees-p8 | easy | BELOW-GATE | pure recall: threaded-tree left-thread → predecessor |

**Rating tally (n=40):** BELOW-GATE 5 (12.5%) · GATE-1-MARK 19 (47.5%) · GATE-2-MARK-or-above 16 (40%) · ABOVE-GATE 0.

## Answers

**1. What fraction of 'hard'-labelled questions are genuinely GATE-2-mark or above?**
11 of 15 sampled hard questions (≈73%) are genuine GATE-2-mark or harder (#1,2,3,4,7,9,10,11,12,14,15). The other 4 (≈27%) are mislabelled — single-step or recall items wearing a "hard" tag: `pds-linked-lists-y2`, `algo-asymptotic-z7`, `pds-pointers-q13`, `engmath-discrete-logic-x2`. The hard tier is the bank's best tier — most of it holds up — but roughly one in four "hard" questions would not survive contact with a real GATE-2-mark bar, and a student trusting the hard label there is training on false difficulty signal.

**2. Is the overall bank skewed easy? Give the distribution observed.**
Yes, and it's worse than the raw label distribution (easy 28.5% / medium 48.3% / hard 23.2%) suggests, because "medium" is where the mislabeling really lives. In the sample, medium items hit genuine GATE-2 difficulty only 5/15 times (33%) — the remaining 10 (67%) are GATE-1-mark or below (`engmath-probability-pyq11`, `pds-pointers-q9`, `algo-divide-conquer-pyq3`, `engmath-calculus-q15`, `engmath-groups-y3`, `algo-dp-f2`, `pds-heaps-y5`, `pds-heaps-q5`, `pds-stacks-queues-p6`, plus one borderline). Since medium is 48% of the entire 901-question bank — the single largest bucket — that means roughly a third of the whole bank (medium's 67%-mislabelled share ≈ 32% of all 901 questions) is 1-mark-or-recall difficulty dressed as "medium." Combine that with the fact that half of the sampled "easy" tier (5/10) is pure BELOW-GATE recall with no computation or trap at all, and the picture is: only ~40% of the audited content (concentrated in the hard tier and a handful of strong medium items) is real 2-mark synthesis; the other ~60% sits at or below a GATE 1-mark bar. The bank is skewed easy.

**3. Which topics have the weakest (too-easy) question sets?**
- **pds-heaps** — both sampled items (`pds-heaps-q9` easy, `pds-heaps-y5` and `pds-heaps-q5` medium) are single-fact or single-substitution; no item combined heap mechanics with a second concept (e.g., heap + selection algorithms, heap + amortized analysis).
- **pds-stacks-queues (easy/medium tier only)** — `pds-stacks-queues-q4` (easy) is pure recall and `pds-stacks-queues-p6` (medium) is mechanical stack tracing with no trap; the topic's hard-tier item (`q13`, Catalan count) shows the topic *can* be hard, it just isn't consistently.
- **engmath-groups (Monoids & Groups)** — both sampled items (`y3` medium, `pyq12` easy) are theorem-recall MSQs; nothing forces combining group theory with counting, coding, or another topic the way GATE often does.
- **engmath-calculus** — `engmath-calculus-q15` is a bare integration-by-parts exercise with no trap and no second concept; calculus items in this bank read like a calc-2 homework set, not GATE prep.
- **pds-trees (easy tier only)** and **pds-graphs-rep (easy tier only)** — both sampled easy items are pure definitional recall (threading convention, traversal-count-implies-components); the hard-tier items from the same topics (`pds-trees-q10`, `pds-graphs-rep-p3`/`p4`) are genuinely good, so the fix is filling out medium/easy with harder synthesis rather than rewriting the topic.
- **algo-dp (medium tier specifically)** — `algo-dp-f2` (counting recomputation in a pre-drawn tree) is closer to reading a diagram than doing DP; contrast with the topic's own `algo-dp-pyq2` and `algo-dp-x3`, which show the topic knows how to be hard when it tries.

**4. Would a 90%+ scorer on this bank be prepared for a real GATE paper, or blindsided?**
Blunt answer: **partially prepared, and likely to be blindsided on paper-fraction of marks.** A student can bank 90%+ largely by cruising through the medium and easy tiers — which together are 77% of the bank's volume and, per this audit, are dominated by single-step substitution and outright recall — without ever being forced through genuine two-concept synthesis except in the smaller hard bucket (23% of the bank, and even there ~27% is soft). On the real GATE CS paper, 2-mark questions (which reward exactly the multi-step/combined-concept/trap pattern seen in this bank's *good* hard items) carry the majority of the marks weight, and the paper doesn't announce which questions are "medium" vs. "hard" — a student trained to recognize difficulty by label rather than by structure will not know a real 2-marker is coming until they're two steps into it and out of runway. The specific gap: this student would handle Bayes/MST/Bellman-Ford/DFS-classification-style questions fine (the bank does drill those well), but would be under-prepared for medium-weighted real-exam questions that quietly require the second step the bank's "medium" tier mostly skips — e.g., a calculus question that combines the integral with a probability density, or a group-theory question nested inside a counting problem. For AIR-1-level prep specifically, the fix is not tone (the theory write-ups are strong) but volume of genuine 2-mark, two-concept, trap-laden items in the medium tier, and cleanup of the ~27% over-labelled "hard" items so difficulty labels can be trusted for pacing practice.

## Prioritized list of topics needing harder items

1. **engmath — Monoids & Groups**: add items that combine group theory with counting/combinatorics or coding (not just theorem-recall MSQs).
2. **engmath — Calculus**: add items pairing integration/differentiation with probability, optimization, or a second calculus concept (currently reads as calc-2 homework).
3. **pds — Heaps**: add items combining heap operations with amortized analysis, k-way merge, or median-maintenance-style two-heap tricks — currently every sampled item is single-formula plug-in.
4. **pds — Stacks & Queues (medium/easy tiers)**: the hard tier proves the topic can be genuinely tricky (Catalan-number item); replicate that trap density downward instead of leaving medium/easy as mechanical tracing.
5. **algo — Divide & Conquer / medium tier generally**: `algo-divide-conquer-pyq3` is bare Master-theorem substitution; add cases requiring the student to notice which Master-theorem case applies (not just plug in), or recurrences requiring the substitution/recursion-tree method where Master theorem doesn't directly apply.
6. **Hard-label cleanup (cross-topic)**: re-review and either re-tag or strengthen `pds-linked-lists-y2`, `algo-asymptotic-z7`, `pds-pointers-q13`, `engmath-discrete-logic-x2` — sampled as "hard" but graded GATE-1-mark or below; labels like this erode trust in the difficulty tagging itself.
7. **pds — Trees & BSTs / Graph Representations (easy tier only)**: replace pure-recall easy items (threading convention, "3 traversals = 3 components") with easy items that at least require one small trace, since the hard-tier items in these same topics are already strong.

**Note on data hygiene (not a difficulty finding):** two sampled PYQ tags carry future years relative to a typical archive — `engmath-linear-algebra-pyq11` and `engmath-probability-pyq11` tagged `2026`, `engmath-groups-pyq12` tagged `2025`. Worth a separate pass to confirm these `pyqYear` values are accurate, since a mistagged year undermines the "this is a real past GATE question" signal the tag is meant to give.
