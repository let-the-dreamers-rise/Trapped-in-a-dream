# Forensic Audit: `pyqYear` Attribution Tags in the GATE Question Banks

**Scope:** all 11 files in `data/questions/*.js` (algo, apti, cn, coa, compiler, dbms, digital,
engmath, os, pds, toc). 3,001 total questions, 804 carry a `pyqYear` field that the UI renders
to the student as a "GATE `<year>`" badge.

**Verdict up front:** the tags are not attributions. They are a filler pattern. See Section 4
for the evidence and Section 6 for the recommendation.

---

## 1. Method

1. Loaded all 11 banks in Node against a stub `window` global and walked every
   `topics[].questions[]` array, tallying `pyqYear` per topic.
2. Compared the shape of that distribution against how real GATE CS papers are constructed
   (~55 scored questions/year across ~10 subjects ⇒ any single *topic* should show 0–2 hits
   in a given year, and most years should show *zero* for most topics — real PYQ coverage is
   lumpy, not a lattice).
3. Cross-referenced the auto-generated question `id` fields against the `pyqYear` values.
4. Spot-checked 25 individually tagged questions (spread across all 11 subjects and most
   years 2015–2026) against my own knowledge of what GATE CS actually asked in each cited
   year.

## 2. The distribution

Every tagged topic in every one of the 11 subjects has `pyqYear` coverage spanning **the
exact same 12 consecutive years: 2015–2026**, with no gaps and no exceptions. Overall year
totals:

| Year | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Count | 67 | 77 | 70 | 66 | 70 | 73 | 67 | 69 | 66 | 67 | 56 | 56 |

Per-topic breakdown (all 34 tagged topics across the 11 subjects; each row is one topic):

- **algo** (6 topics, e.g. asymptotic, divide-conquer, greedy, DP, graph, sorting): every
  topic tagged **exactly 1 question per year, for all 12 years** (2015→2026). 12/12 = 100% one-per-year.
- **compiler** (6 topics): identical — exactly 1/year × 12 years, every topic.
- **engmath** (8 topics: logic, sets, groups, graph theory, combinatorics, linear algebra,
  calculus, probability): identical — exactly 1/year × 12 years, every topic.
- **os** (6 topics): 5 of 6 exactly 1/year × 12 years; `os-deadlock` stops at 2025 (11 years,
  still exactly 1/year); `os-virtual-memory` has one year (2018) doubled to 2, otherwise 1/year.
- **pds** (9 topics): exactly 1/year, but truncated at different lengths per topic
  (8–12 years) — e.g. `pds-recursion` only runs 2015–2022 (8 years), others run 2015–2024 (10) or
  2015–2026 (12). Still strictly monotonic, 1 per year, no repeats, no gaps.
- **apti, cn, coa, dbms, digital, toc** (23 topics total): full 2015–2026 span in every topic,
  but with a handful of years bumped to 2 questions instead of 1 (to hit each topic's target
  question count) — e.g. `cn-transport`: 2015:1, 2016:2, 2017:1, 2018:1, 2019:2, 2020:1, …
  2026:1. Every one of these topics still has **zero years with zero questions** — full,
  unbroken 12-year coverage, subject-wide.

**Evenness analysis:** In real GATE CS papers, a given topic (e.g. "Sequential Circuits" or
"Chomsky Hierarchy") is examined in *some* years and skipped entirely in others — GATE does
not test every micro-topic every year; the ~55 scored questions/year have to cover ~10
subjects × 4–9 topics each, so most (topic, year) cells should be empty and a few should have
2–3. What we find instead is the opposite of that: **every (topic, year) cell for 2015–2026
is populated**, overwhelmingly with exactly 1. That is not a plausible PYQ frequency profile;
it is the signature of a script iterating `for year in 2015..2026: emit one question tagged
year`.

### Smoking gun: the IDs are just a year-indexed counter

The question `id` fields make the mechanism explicit. Within a topic, the tagged questions are
literally numbered `-pyq1, -pyq2, -pyq3, ...` or `-p1, -p2, -p3, ...`, and in most files that
counter maps straight onto the year sequence 2015, 2016, 2017, … in order:

```
algo-asymptotic-pyq1:2015 | -pyq2:2016 | -pyq3:2017 | -pyq4:2018 | -pyq5:2019 | -pyq6:2020
 | -pyq7:2021 | -pyq8:2022 | -pyq9:2023 | -pyq10:2024 | -pyq11:2025 | -pyq12:2026

os-processes-p1:2015 | -p2:2016 | -p3:2017 | -p4:2018 | -p5:2019 | -p6:2020 | -p7:2021
 | -p8:2022 | -p9:2023 | -p10:2024 | -p11:2025 | -p12:2026
```

In `engmath` the counter-to-year mapping is shuffled (pyq1→2019, pyq2→2015, pyq3→2016, …)
but it is still a bijection onto exactly the same 12-slot {2015..2026} set — i.e. someone
(or some generator) filled a fixed 12-year quota per topic and then either kept or shuffled
the assignment order. Neither behavior is consistent with citing real exam papers; a genuine
PYQ set would never produce a perfect year lattice like this across 34 independent topics in
11 independently-authored files.

One more tell: **`pyqYear: 2026`** appears 56 times. GATE 2026 was held in February 2026 and
its actual paper is a small, specific, publicly-checkable set of ~55 questions — yet this bank
attributes GATE-2026-pattern questions to nearly every topic in every subject, at the same
density as every other year. That is not consistent with one real paper being mined for
citations; it is consistent with the year simply being the next number in a loop.

## 3. Spot-check: 25 tagged questions vs. reality

| # | Subject/Topic | Claimed Year | Question pattern (summarized) | Verdict | Reasoning |
|---|---|---|---|---|---|
| 1 | algo / asymptotic | 2015 | Compare n^3, 2^n, n!, n log n via O-notation | GENERIC | Classic function-growth comparison; this exact wording is not a specific paper I can confirm for 2015 — it's a textbook staple recyclable to any year. |
| 2 | algo / DP | 2018 | Matrix-chain multiplication, specific 6-matrix dimension vector, numeric answer | IMPLAUSIBLE | MCM as a GATE PYQ is associated with earlier papers (pre-2015 era); I have no record of this exact dimension set in the 2018 CS paper. The specific numbers look invented for the site, not lifted from a real paper. |
| 3 | algo / graph | 2021 | Count topological orderings of a small hand-built DAG | GENERIC | Fits the "combinatorics-on-a-small-graph" GATE style broadly but isn't tied to any 2021-specific question I recognize. |
| 4 | os / scheduling | 2016 | SRTF with 4 given (arrival, burst) pairs, compute avg turnaround | GENERIC | Standard SRTF-numeric template; GATE has run near-identical templates in several different years, so this instance can't be pinned to 2016 specifically. |
| 5 | os / deadlock | 2019 | Banker's-algorithm safe-state / "who runs first" | GENERIC | Banker's-algorithm questions are a recurring GATE archetype (multiple real years), but this exact allocation/max matrix is not one I can verify for 2019. |
| 6 | os / virtual memory | 2022 | TLB hit-ratio EMAT calculation (80%, 20ns, 100ns) | GENERIC | Extremely common EMAT template reused across many real GATE years (and countless prep books); not distinctively 2022. |
| 7 | dbms / normalization | 2017 | R(A,B,C,D), FDs A→B, A→C, C→D, find highest NF | GENERIC | Standard normalization drill; the specific FD set doesn't match a 2017 paper I can confirm. |
| 8 | dbms / transactions | 2020 | Classify a schedule as recoverable/cascadeless | GENERIC | Bog-standard schedule-classification exercise, not year-specific. |
| 9 | cn / transport | 2015 | TCP seq/ack arithmetic across two segments | PLAUSIBLE | GATE CS 2015 did include a TCP sequence-and-acknowledgement-number numerical in this style; the pattern is genuinely characteristic of that era's CN section, even though I can't certify these exact byte counts. |
| 10 | cn / network | 2023 | Conceptual: split-horizon + poison-reverse guarantees | GENERIC | Reasonable CN theory item, but not traceable to a specific 2023 question. |
| 11 | coa / pipelining | 2018 | Branch resolved at stage 4, compute branch penalty | GENERIC | Formulaic branch-penalty template, reused across many real years. |
| 12 | coa / memory | 2022 | Fully-associative cache trace, count compulsory misses | GENERIC | Textbook cold-miss counting exercise; not 2022-specific. |
| 13 | digital / sequential | 2016 | Convert JK-FF to T-FF, verify characteristic equation | GENERIC | One of the most recycled digital-logic drills in existence (appears across decades of exams); can't be pinned to 2016. |
| 14 | toc / turing | 2020 | Conceptual: what PCP is used to prove undecidable | GENERIC | Textbook-conceptual, not year-specific. |
| 15 | toc / decidability | 2025 | Conceptual: what a reduction from A_TM shows | GENERIC | Standard reducibility-proof-technique question; unverifiable as 2025-specific. |
| 16 | compiler / parsing | 2017 | Count LR(0) states for grammar S→aS\|b | IMPLAUSIBLE | This grammar is right-linear and trivially small; real GATE LR(0)/canonical-collection questions use denser grammars (e.g. S→aSb\|ab or similar) because a 3–4-state automaton doesn't discriminate well at exam difficulty. Reads as an invented simplified example, not a real paper item. |
| 17 | compiler / optimization | 2022 | Count basic blocks from 7-line TAC via leaders | GENERIC | Standard leader-based basic-block exercise; not tied to 2022. |
| 18 | engmath / probability | 2015 | Bayes' theorem, disease test (1% prevalence, 99%/2%) | GENERIC | Bayes-theorem disease-test problems are a genuine recurring GATE archetype (a similar one exists in the real 2015-era pool), but these specific numbers (1%/99%/2%) don't match the specific published question closely enough to certify — could be any year's version of the same template. |
| 19 | engmath / graph theory | 2021 | Cayley's formula, labeled trees on 4 vertices | GENERIC | Direct formula plug-in, textbook-trivial, not year-specific. |
| 20 | pds / recursion | 2018 | Trace recursive call count for gcd(48,18) | GENERIC | Generic code-tracing question, endlessly reusable. |
| 21 | pds / hashing | 2020 | Expected time for unsuccessful search, chaining, O(1+α) | GENERIC | Direct CLRS textbook fact, not an exam-specific item. |
| 22 | apti / quant | 2016 | +10%/-10% successive percentage change | GENERIC | One of the most common aptitude filler questions across every exam and every year; meaningless as a year attribution. |
| 23 | apti / logical | 2023 | Letter series B,D,G,K,P,? (gaps +2,+3,+4,...) | GENERIC | Generic reasoning puzzle, not GATE-specific at all, let alone 2023-specific. |
| 24 | toc / regular | 2026 | Minimum DFA states for language containing "11" | IMPLAUSIBLE | This is one of the single most reproduced textbook automata examples in existence (predates GATE by decades) and is tagged to GATE 2026 — a paper held only months before this audit — with no way the "11-substring minimal DFA" pattern could be a *distinctive marker* of that specific paper. Tagging a decades-old generic example to the newest possible year is the clearest kind of quota-filling artifact. |
| 25 | os / sync | 2021 | Producer-consumer deadlock from swapped wait(mutex)/wait(empty) order | GENERIC | Classic Silberschatz-style semaphore-ordering bug, reused across many textbooks/years; not distinctively 2021. |

### Spot-check tally
- **PLAUSIBLE: 1/25 (4%)** — pattern genuinely characteristic of the claimed year/era (CN TCP seq/ack, 2015).
- **GENERIC: 21/25 (84%)** — standard, endlessly-recyclable textbook items; the year label is unverifiable and adds no real information.
- **IMPLAUSIBLE: 3/25 (12%)** — the specific year attribution actively conflicts with what's plausible (an over-simplified LR(0) grammar unlikely to appear as-is on a real paper; specific MCM dimensions with no matching 2018 record; a decades-old generic DFA example freshly tagged to the newest year, 2026).

## 4. Putting the two analyses together

- The **shape** of the tagging (Section 2) is on its own close to dispositive: 34 independent
  topics across 11 independently written files all reproduce the same impossible property —
  full, gapless, ~1-per-year coverage of *exactly* 2015–2026 — and the underlying question IDs
  are literally a sequential counter that maps onto the year list. That is a generation
  artifact, not a citation record.
- The **content** spot-check (Section 3) reinforces it: only 1 of 25 tagged questions matches
  something recognizable as characteristic of its claimed year; the rest are generic,
  reusable-in-any-year textbook items, and a few are actively implausible for their claimed
  year (including a 2026 tag on a pre-GATE-era generic example).

Both lines of evidence point the same direction: `pyqYear` was populated to satisfy a "give
every topic a PYQ example from every year" quota, not by pulling from actual GATE papers.

## 5. Proportion genuine vs. quota-filled

Best estimate: **on the order of 0–5% of the 804 `pyqYear` tags reflect a real, verifiable
year-specific attribution; the remaining ~95%+ are unverifiable-at-best templated fills**, and
a further single-digit percentage are actively wrong (year conflicts with the pattern's
known era, e.g. the 2026 tag in item #24). None of the per-topic distributions is consistent
with genuine archival sourcing — the lattice pattern alone would require every one of the 34
topics to have been examined in every one of 12 straight years, which does not happen in the
real exam.

## 6. Bottom line and recommendation

**The "GATE `<year>`" badge as currently shown cannot be presented to a student as a factual
claim that this exact question pattern appeared on that year's paper.** It is not — the
tagging is a uniform fill pattern with sequential IDs mapped onto a fixed year list, and only
about 1 in 25 spot-checked instances holds up as plausibly tied to its claimed year, while
several are outright implausible for that year.

**Recommend removing or relabelling every `pyqYear` display, not fixing it question-by-question**, because the underlying data has no reliable "which year" signal to recover:

- Replace the "GATE `<year>`" chip with a non-attributive label such as **"PYQ-style"**,
  **"Exam pattern"**, or **"Frequently tested format"** — i.e. describe the question as
  *characteristic of GATE's style/difficulty for this topic*, not as a specific year's paper
  item.
- If year-like structure is wanted for spaced-repetition/variety purposes only, keep the field
  internally but stop rendering it as a truth claim to the student (e.g. relabel the visible
  tag to **"Practice Set N"** using the existing `-pyqN`/`-pN` ordinal instead of the invented
  calendar year).
- Do **not** keep shipping `pyqYear` as a year badge without an audit trail (real GATE year +
  paper set + question number) behind each tag; absent that provenance, the honest label is
  "GATE-style question," not "GATE 2019."

No question files were modified as part of this audit.
