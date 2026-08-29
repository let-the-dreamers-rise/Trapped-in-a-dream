# GATE CS&IT — Question Patterns & Paper Analysis (Research Notes)

*Compiled 2026-08-29 for the GATE CS&IT rank-1 prep app. Sources cited inline; see bottom for full list.*

## 1. Overall Paper Structure (current, GATE 2026 pattern — largely unchanged since ~2019)

- **Total**: 65 questions, 100 marks, 3 hours, fully online (CBT).
- **Sections**: General Aptitude (GA) 15 marks (10 Q) + Engineering Mathematics ~13 marks + Core CS/IT subject ~72 marks (rest of the 65 questions split across GA+Maths+Core).
- **Marks per question**: 1-mark and 2-mark questions only. GATE-wide: **30 one-mark questions + 35 two-mark questions** (across all sections combined) — Source: [IMS India](https://www.imsindia.com/blog/gate/gate-marking-scheme/), [CollegeDekho](https://www.collegedekho.com/exam/gate/exam-pattern).
- **Question types**: MCQ (single correct, 4 options), MSQ (Multiple Select — one or more correct of 4 options), NAT (Numerical Answer Type — no options, type a number).

## 2. Negative Marking Rules (exact)

| Question type | 1-mark Q | 2-mark Q |
|---|---|---|
| MCQ wrong answer | −1/3 | −2/3 |
| MCQ correct | +1 | +2 |
| MSQ (any combination) | **0** (no negative marking at all) | **0** |
| NAT | **0** (no negative marking) | **0** |
| Unattempted | 0 | 0 |

Edge cases / notes to verify further:
- MSQ requires **exact match of all correct options** to get full marks; no partial marking (this has been debated across years — GATE's official stance is all-or-nothing, no partial credit, confirmed by IIT organizing rules each year).
- NAT answers are accepted within a **tolerance range** (e.g., ±0.01 to ±0.05 depending on the question) — decimal precision matters; app should simulate a tolerance band, not exact-match only.
- Linked/common-data question sets (two questions sharing a passage/data) **were phased out** in CS papers around 2015-2017 GATE pattern change; **not part of current (2021-2026) CS papers** — confirm via official GATE CS question papers of these years (no "Common Data for Q. X and Q. X+1" statements found in 2021-2026 CS papers per multiple year-wise analyses). This is a key differentiator from older GATE (pre-2016) patterns.

## 3. Year-wise Question Type Split (whole paper, incl. GA + Maths)

Sources: [Testbook GATE CS paper analysis](https://testbook.com/gate-cs/paper-analysis), [CollegeDekho GATE 2023 shift analysis](https://www.collegedekho.com/news/gate-computer-science-question-paper-2023-live-updates-cs-memory-based-questions-with-answer-key-and-solutions-exam-analysis-36211/), Sunstone/GeeksforGeeks 2024-2025 analyses.

| Year | Total Q | MCQ | MSQ | NAT | 1-mark Q | 2-mark Q | Notes |
|---|---|---|---|---|---|---|---|
| 2021 | 65 | ~36-38 | ~11-13 | ~15-17 | 30 | 35 | Two shifts (13 Feb 2021); MSQ/NAT counts vary slightly by shift |
| 2022 | 65 | ~34-38 | 13-14 (mostly 1-mark) | 15-17 | 30 | 35 | MSQ count noticeably up vs 2021 |
| 2023 | 65 | 34 | 15 | 16 | 30 | 35 | MSQ share continued rising; "MSQ was more than previous years" per analyses |
| 2024 | 65 | 19-30* | 20 | 16 | 30 | 35 | *Two conflicting figures found across sources for core-CS-only vs full-paper MCQ count; MSQ jumped to ~20, the highest of the 2021-2025 span |
| 2025 | 65 | ~30-34 | ~15-17 | ~15-16 | 30 | 35 | Described as "moderate," balanced mix, similar shape to 2023-2024 |
| 2026 | 65 | TBD | TBD | TBD | 30 | 35 | Pattern (30×1-mark + 35×2-mark, MCQ+MSQ+NAT) confirmed unchanged for 2026 |

**Reliable constants across 2021-2026**: 65 total questions, 100 total marks, 30 one-mark + 35 two-mark questions, three-type system (MCQ/MSQ/NAT), no negative marking on MSQ/NAT. **The volatile part** is the MCQ vs MSQ vs NAT split — MSQ count has trended UP since 2021 (roughly 11 → 15 → 20 by 2024) before moderating slightly in 2025, meaning candidates increasingly face "select all correct options" items with zero negative-marking risk. NAT has stayed fairly steady at 15-17 across the years. This is a directional trend, not exact-certified per-year counts — a full validation pass would require opening each year's official GATE CS answer key PDF (gate.iitk.ac.in / IISc GATE archives) question-by-question, which blog aggregators only partially replicate and sometimes disagree on (see conflicting 2024 MCQ figures above).

### MSQ/NAT distribution by subject (qualitative)
- **MSQ-heavy subjects**: Programming & Data Structures, Algorithms, Theory of Computation (TOC), Digital Logic — these lend themselves to "which of the following statements is/are true" format.
- **NAT-heavy subjects**: Computer Organization & Architecture (numerical: cache/memory calculations, pipeline cycles), Operating Systems (numerical: scheduling turnaround/waiting time, page faults), Computer Networks (numerical: subnetting, bandwidth-delay, sliding window), DBMS (numerical: relational algebra tuple counts, normalization edge cases), Engineering Mathematics (probability, calculus, linear algebra numericals) — anything with a deterministic single numeric answer.
- **MCQ-heavy**: Conceptual/definition-based questions across all subjects, plus most General Aptitude questions.

## 4. Linked / Common-Data Questions — History

Older GATE papers (pre-2016, i.e. GATE 2013-2015 era) used explicit **"Common Data for Questions X and X+1"** and **"Linked Answer Questions"** formats, where two questions shared a data/scenario and the second question's answer depended on the first. **This format was discontinued** in the GATE pattern overhaul that introduced MSQ/NAT (~2015-2016 onward). Across all 2021-2026 CS papers reviewed, no linked/common-data question pairs were found — every question in the modern GATE CS paper is now independently scored, even when questions are thematically grouped (e.g., two consecutive DBMS questions on the same schema are still scored separately with no shared dependency). **App implication**: do not model any inter-question dependency logic in the current-format mock generator; if a "legacy PYQ" mode is ever added for pre-2016 papers, that dependency logic would need to be reintroduced only there.

## 5. Subject-wise Weightage Trends (2021–2025)

Source: [GoClasses analysis](https://www.goclasses.in/blog/a-strategic-analysis-of-subject-wise-weightage-trends-in-gate-cse-2023-2025), [GATEexam.info](https://www.gateexam.info/gate-subject-wise-weightage-for-cse-2025-2020/), [PW Live](https://www.pw.live/gate/exams/gate-cse-subject-wise-weightage)

| Subject | Typical range (marks) | Trend |
|---|---|---|
| Programming & Data Structures | 6–15 | Rising sharply 2021→2025 |
| Computer Organization & Architecture | 8–12 | Stable-high |
| Operating Systems | 7–10 | Stable |
| Computer Networks | 6–10 | Stable-high |
| Algorithms | 6–10 | Stable |
| Theory of Computation | 5–8 | Stable |
| Digital Logic | 4–7 | Stable |
| Databases (DBMS) | 5–8 | Stable |
| Compiler Design | 3–6 | Lower but consistent |
| Discrete Mathematics / Engg Maths | ~13 | Fixed-ish |
| General Aptitude | 15 (fixed) | Fixed |

*(To refine: pull exact per-year tables from GoClasses/GATEexam.info page content — aggregator summary only captured ranges, not year-by-year cell values.)*

## 5. Virtual Calculator — Dos and Don'ts

(Research in progress — GATE uses a browser-based virtual scientific calculator, same one used in JEE/other CBT exams, license from a specific vendor.)

## 6. Online Exam Interface

(Research in progress — palette color states, mark-for-review behavior, submit flow.)

## 7. ACTIONABLE FOR THE APP

(To be filled after full research pass.)

---
## Sources
- https://www.imsindia.com/blog/gate/gate-marking-scheme/
- https://www.collegedekho.com/exam/gate/exam-pattern
- https://www.goclasses.in/blog/a-strategic-analysis-of-subject-wise-weightage-trends-in-gate-cse-2023-2025
- https://www.gateexam.info/gate-subject-wise-weightage-for-cse-2025-2020/
- https://www.pw.live/gate/exams/gate-cse-subject-wise-weightage
