# Source material for the real past-year-paper section

These are plain-text extractions of the **official GATE Computer Science question
papers and official answer keys**, pulled from the public index at
<https://gatecse.in/previous-year-gate-papers-and-official-keys/> (Google Drive
mirrors of the IIT-published PDFs). Text was extracted with `pdfjs-dist`.

They are kept in the repo only because the build container is ephemeral —
re-downloading and re-extracting costs an hour. They are working notes, not
app content. Nothing here ships in the app; only `data/pyq/*.js`, transcribed
from these files, does.

## What is here

| Paper | Question text | Official key |
|---|---|---|
| 2014 Set 1 | `gate2014-s1.txt` | `key2014-s1.txt` |
| 2014 Set 2 | `gate2014-s2.txt` | `key2014-s2.txt` |
| 2014 Set 3 | `gate2014-s3.txt` | `key2014-s3.txt` |
| 2016 Set 1 | `gate2016-s1.txt` | `key2016-s1.txt` |
| 2016 Set 2 | `gate2016-s2.txt` | `key2016-s2.txt` |
| 2018 | `gate2018.txt` | `key2018.txt` |
| 2019 | `gate2019.txt` | `key2019.txt` |
| 2022 | `gate2022.txt` | `key2022.txt` |
| 2023 | `gate2023.txt` | *no key found yet* |
| 2024 Set 1 | `gate2024-s1.txt` | `key2024-s1.txt` |
| 2024 Set 2 | `gate2024-s2.txt` | `key2024-s2.txt` |
| 2025 Set 1 | `gate2025-s1.txt` | `key2025-s1.txt` |
| 2025 Set 2 | `gate2025-s2.txt` | `key2025-s2.txt` |

Twelve papers are fully attributable — question text *and* an official key.
2023 has clean question text but its key is not linked from the index above,
so it must not be transcribed until a key is found.

## Key formats — they differ by year, and getting this wrong silently corrupts answers

**2014** uses a two-column interleaved layout with no header repetition. The
tokens run `SECTION NUMBER KEY MARKS` but left- and right-column records
alternate, so they are *not* in ascending order:

    GA 1 B 1   CS 24 C 1   GA 2 C 1   CS 25 A 1   CS 26 28 to 30 2

Parse into a lookup keyed by `(section, number)` and verify GA covers 1–10 and
CS covers 1–55 exactly once each. Negative NAT values use a Unicode non-hyphen
minus (`‐`), e.g. `‐ 2 to ‐ 2` means −2.

**2016** uses `Q.No Type Section Key Marks` with NAT ranges separated by a colon:

    1 NAT CS-2 4.0 : 4.0 1      17 MCQ CS-2 C 1

**2018–2025** use `Q. No. | Session | Question Type | Section | Key/Range | Mark`
with question numbers running 1–65 continuously (1–10 General Aptitude, 11–65
Computer Science). MSQ keys list several letters separated by `;` or `,`:

    22 5 MSQ CS-1 A;C 1

## Papers deliberately excluded

**2012 and 2013** — their official keys are published per ORS booklet code
(A/B/C/D), each code having a different option order, and the archived question
paper PDF does not record which code it is. There is no way to attach an answer
to a question without guessing, so these are excluded rather than shipped wrong.

**2011, 2015, 2017, 2020, 2021** — the archived PDFs are image scans. Text
extraction returns almost nothing (0–10k characters against 22–38k for a clean
paper). They need OCR before they are usable, and no OCR tooling is installed
here.

## Transcription rule

Answers come **only** from the official key file, never from a model's own
judgement. Any question whose text did not survive extraction legibly — garbled
maths, matrices, layout-dependent code, anything referring to a figure — is
skipped, not reconstructed. A skipped question is fine; a wrong one teaches the
wrong thing.
