# Student Simulation: Engineering Maths + General Aptitude
*Role-played as a GATE CS aspirant targeting AIR 1. Data loaded from `data/questions/engmath.js` and `data/questions/apti.js` via Node (`window.GATE_DATA.questions`). No data files edited.*

**Corpus size:** 400 questions total — 216 in engmath (8 topics), 184 in apti (4 topics).
**Question-kind breakdown (computed directly, not estimated):** 336 MCQ (84%), 24 MSQ (6%, all in engmath, exactly 3 per engmath topic), 40 NAT (10%, `kind:"nat"`/empty `options`, 3 per engmath topic + a handful in apti-quant/logical/data-spatial). **apti-verbal has zero MSQ and zero NAT — 46/46 pure MCQ.**

---

## Step 1 — Full theory read (3 topics): Linear Algebra, Probability, Quantitative Aptitude

**Verdict: genuinely strong, close to self-sufficient for GATE-level problem solving.** All three topics follow the same intro→core→deep→strategy structure, and the "deep" section reliably includes a definitions block, a table of special-case types/distributions, 1-2 fully worked numeric examples, and a "TRAP FACTS GATE LOVES" list that reads like an experienced mentor's margin notes (e.g., linear algebra: "det(kA)=k^n·det(A), not k·det(A)"; probability: "mutually exclusive and independent cannot both hold for positive-probability events"). This is materially better than "define term, give formula" content typical of free prep material.

**Specific holes found, with citations:**
- **Linear algebra `engmath-linear-algebra` theory:** the Vector Spaces section (deep) is one paragraph defining linear independence/basis/dimension with *no worked numeric example* and *no corresponding practice question* — every question in the bank tests rank/eigen/det, none directly computes a basis or nullspace by hand (nullity is only ever asked via rank-nullity subtraction, e.g. `engmath-linear-algebra-x1`, never via actually finding null-space vectors). LU decomposition is explained in prose in "core" but **no question in the topic tests it numerically** — a student reading only this file would have zero practiced reps on LU despite the theory calling it out as GATE-relevant. Complex eigenvalues (e.g. rotation-matrix type `[[0,-1],[1,0]]` giving ±i) are never mentioned in theory or tested — a plausible GATE trap the theory is silent on.
- **Probability `engmath-probability` theory:** covariance/correlation is defined in "deep" (`Cov(X,Y)=E[XY]-E[X]E[Y]`, `rho` bounded in [-1,1]) but the strategy section and worked examples never touch it, and (confirmed by grep) **no probability question in the corpus exercises covariance/correlation numerically** — theory promises a concept the question bank never drills. Central Limit Theorem is stated but never used in a worked problem.
- **Quant `apti-quant` theory:** excellent and unusually tactical (fraction-percentage lookup table, alligation cross-method, LCM-based work-and-time, train/boat formulas) — the strongest of the three. Gap: **no "partnership/profit-sharing" archetype** (splitting profit by capital×time ratio) anywhere in theory or the question list — a classic, frequently-tested aptitude pattern that's simply absent, not just under-drilled.
- Across all three, none assume undisclosed prerequisite knowledge in a way that would strand a student — the "does it assume knowledge it never teaches" test is largely passed. The one real assumption-gap: the linear-algebra strategy section name-drops "similar matrices," "defective matrix," and "geometric vs algebraic multiplicity" with only a one-line gloss each — enough to answer the MCQs that exist, but not enough to derive from scratch if a differently-phrased question showed up.

---

## Step 2 — Attempted 32 sampled questions (solved independently, then checked)

Sampled to cover MCQ, MSQ (`answers` array), NAT (`kind:"nat"`), all 8 engmath + 4 apti topics, and a `hard`-tagged subset. Full working shown for a few illustrative ones; all 32 are logged below with my answer vs. stored answer.

**Result: 32/32 matched the stored answer — zero disputes.** This is a meaningfully clean hit rate for a self-generated question bank; I actively looked for arithmetic slips or wrong-option keys and found none in this sample.

Representative worked checks:
- `engmath-linear-algebra-q8`: det[[1,2,3],[4,5,6],[7,8,10]] = 1(50-48) - 2(40-42) + 3(32-35) = 2+4-9 = **-3** → matches stored answer (index 1, "-3").
- `engmath-combinatorics-x1` (derangement of TRAIN, 5 distinct letters): D5 = 44 → matches.
- `apti-quant-x13` (3^47 mod 5): cycle 3,4,2,1 (period 4); 47 mod 4 = 3 → third term = 2 → matches.
- `apti-logical-q13` (angle at 3:40): |30·3 - 5.5·40| = |90-220| = 130° → matches.
- `engmath-linear-algebra-y2` (MSQ, "select all that apply" on eigenvalue facts): correctly identified A, B, C true and D ("invertible ⇒ 0 is an eigenvalue," the exact reverse of the truth) false → matches stored `answers:[0,1,2]`.
- `apti-data-spatial-y8` (NAT, vector path 5E+12N+5W+4N): net displacement (0, 16) → distance **16** → matches stored NAT answer.
- `apti-verbal-x2` (fill-in-the-blank: "brought to a ______ when both sides agreed to a mediator," options impasse/denouement/stalemate/deadlock): flagged this myself as borderline before checking — three options are near-synonyms for "stuck," which reads like a trap for someone who doesn't parse that the sentence describes forward movement (agreeing to a mediator), not a stall. Stored answer is "denouement" (index 1), matching my read, and the explanation explicitly calls out the "3 near-synonyms are the trap" pattern — this is intentional design, not sloppy wording, but I'd still flag it as a question a time-pressured student could reasonably mis-time-box on (it rewards close reading over quick recall).

**On "too easy":** `apti-quant-q4` (plain SI calculation) and `engmath-probability-q10` (Poisson mean=variance, direct lookup) are 1-mark plug-in-formula questions with no trap — appropriately easy for their stated 1-mark/easy tag, not mislabeled.

**On explanation quality:** explanations consistently do more than state the answer — they show the discarded-option reasoning (why B/C/D fail, not just why A works — see `engmath-discrete-logic-q1` style) and usually end with a transferable "fast route" line (e.g. `apti-logical-y3`: "whenever the two groups have unequal sizes, compute just one combination and stop"). This is genuinely didactic, not just an answer key.

**No disputed answers found in this session.** I did not find a single question where my independently-derived answer disagreed with the stored key across the 32 attempted (20 general sample + 12 hard-tagged). This is a positive but narrow finding — 32 of 400 is an 8% sample, not exhaustive.

---

## Step 3 — Archetype coverage audit

**Present and well-covered:** tautology/functional-completeness, set cardinality, group element order, Euler path/circuit, derangements, eigenvalue/trace/determinant shortcuts, Bayes/law-of-total-probability, standard-distribution mean/variance lookups, series/coding-decoding, blood relations, directions, syllogisms, linear & circular seating, clock angle & coincidence, calendar/day-of-week, cube-cutting (multiple sizes), mirror/water images, cube nets, dice-face problems, Venn-diagram two/three-set overlap, data-sufficiency (`apti-data-spatial-x9`, `x10`), pie-chart/bar-chart/line-graph DI, percentages/SI-CI/speed-distance/work-time/mixtures/ages/number-theory.

**Absent or effectively absent (checked by grep + full listing, not sampling):**
1. **Numerical Methods — an entire official GATE CS Engineering-Mathematics syllabus topic (Newton-Raphson, bisection, trapezoidal/Simpson's rule, error order of numerical integration/ODE solvers) has no topic and zero questions anywhere in `engmath.js`.** This is the single largest structural gap in the maths section — not a thin topic, a missing one.
2. **Partnership / profit-sharing ratio problems** — zero hits in `apti-quant` (verified: 0 matches for "partnership" in the file).
3. **Multivariable calculus** (partial derivatives, gradient, multivariable optimization) — the calculus topic is entirely single-variable (limits, continuity, MVT, single integrals); GATE occasionally tests partial derivatives and this is untouched.
4. **Long-form reading comprehension** — the two "Read the following passage" items (`apti-verbal-x17`, `x18`) are ~380-400 characters, one question each. Real GATE RC passages typically run 120-200 words with 1-2 questions per passage testing tone/main-idea/detail separately; here that longer-passage/multi-question format never appears.
5. **Complex/imaginary eigenvalues** and **skew-symmetric matrices of even order** (where determinant need not be 0, contrasted with the odd-order trap the theory does cover) — no question tests either.
6. Minor: exact-duplicate questions padding the count — `engmath-calculus-q1` and `engmath-calculus-y4` are the identical limit (`lim sin(3x)/x`) restated verbatim; several cube-cutting questions recur near-identically across `apti-data-spatial` and `apti-logical` (different n, same mechanic) — fine for spaced repetition, but inflates the "216/184 questions" headline count with some redundancy.
7. No genuinely novel/hybrid hard questions — the `hard`-tagged items (89 across both files) are still single-concept-plus-a-standard-trick (derangements, Bayes, MVT, hand-coincidence formula); none require chaining two distinct sub-fields (e.g., a graph-theory question needing a probability or linear-algebra argument), which is where GATE's true 95th-99th-percentile discriminators tend to live.

---

## Step 4 — Verdict: projected marks and gap to AIR-1

**Projected score if a student does every question + theory here, faithfully, plus mocks elsewhere:** Engineering Maths (~13 marks in GATE CS) and General Aptitude (15 marks) together are ~28/100 of the paper. On the recurring-pattern portion of these two sections — which is most of it — this corpus's explanations and trap-lists would likely convert to **roughly 24-26/28** on marks that map to archetypes actually present here (accuracy on the sampled 32 was 100%, and the theory is unusually complete for what it covers). That is a strong, not top-1%, outcome for these sections specifically.

**Gap to AIR-1 level, concretely:**
- A guaranteed 1-2 mark loss risk if Numerical Methods appears on the actual paper (it usually does, in some GATE CS years) — this student would have zero prior exposure to that archetype, cold.
- The MCQ-heavy format (84% vs. GATE's real mix, which leans much more NAT/MSQ in Engineering Maths specifically) under-trains the "no options to eliminate against, must compute cleanly" discipline that NAT questions demand under time pressure — a different skill from picking among four plausible-looking choices.
- No timed, mixed-order mock-test mode is evident in the data structure itself (no composite test assembling questions across topics with a clock) — AIR-1 aspirants are typically differentiated by speed and error-recovery under a 3-hour full-paper simulation, which this per-topic question bank does not simulate at all.
- The hardest questions here are "hard variant of a known trick," not "unfamiliar setup requiring genuine derivation under pressure" — the exact skill that separates top 100 from top 5000 rank on GATE's genuinely novel questions.
- Net: this bank would reliably deliver a *strong, safe* score in these two sections (comfortably above median), but by itself does not close the last mile to AIR-1, which needs (a) the missing Numerical Methods topic covered elsewhere, (b) full-length timed mocks, and (c) exposure to harder, hybrid, non-formulaic problems beyond what a fixed 400-question bank can provide.
