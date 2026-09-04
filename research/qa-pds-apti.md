# QA Audit: pds.js and apti.js

Method: loaded both files via Node (`window.GATE_DATA.questions['pds'|'apti']`). For every
C-output question below, the snippet was translated into a standalone `.c` file and compiled/run
with `gcc` (see `/tmp/.../scratchpad/ctest/*.c` during the session). Heap and hash-table questions
were verified with `node -e` simulations of the actual algorithm (heap sift-down/extract-max,
min-heap validity check, linear/quadratic probing traces). Aptitude numeric answers were
recomputed independently with `node -e`. MSQ (`answers` array) questions in both files were
checked for in-range indices.

## PDS — 20 questions audited (gcc-compiled C snippets + heap/hash simulations)

| # | ID | Topic | Method | Verdict |
|---|----|-------|--------|---------|
| 1 | pds-c-basics-q2 | C basics | gcc: `a/b*b+a%b` → 5 | CORRECT |
| 2 | pds-c-basics-q4 | C basics | gcc: static local → "1 2 3" | CORRECT |
| 3 | pds-c-basics-q6 | C basics | gcc: short-circuit `&&` → "1 1 0" | CORRECT |
| 4 | pds-c-basics-q7 | C basics | gcc: switch fallthrough → "BC" | CORRECT |
| 5 | pds-c-basics-q8 | C basics | gcc: empty-body for-loop → 5 | CORRECT |
| 6 | pds-c-basics-q10 | C basics | gcc: do-while → prints "X" once | CORRECT |
| 7 | pds-c-basics-q11 | C basics | gcc: `a+++b` maximal munch → "3 2" | CORRECT (explanation's last sentence is a bit garbled in wording, but not factually wrong — no edit needed) |
| 8 | pds-c-basics-q12 | C basics | gcc: unsigned underflow → 4294967295 | CORRECT |
| 9 | pds-c-basics-x1 | C basics | gcc: comma operator → "2 3 5" | CORRECT |
| 10 | pds-c-basics-x3 | C basics | gcc: `||` short-circuit → b stays 0 | CORRECT |
| 11 | pds-c-basics-x4 | C basics | gcc: do-while + break → "01" (2 digits) | CORRECT |
| 12 | pds-c-basics-x5 | C basics | gcc: switch with `default` first → "BC" | CORRECT |
| 13 | pds-c-basics-x6 | C basics | gcc: unparenthesized macro `SQUARE` → 14 | CORRECT |
| 14 | pds-c-basics-y3 | C basics | gcc: sum of odd 1..5 via `continue` → 9 | CORRECT |
| 15 | pds-c-basics-y5 | C basics | gcc: `for(i=0;i<10;i+=3)` → 4 stars | CORRECT |
| 16 | pds-pointers-q1 | Pointers | gcc: `*p=20` mutates `a` → 20 | CORRECT |
| 17 | pds-pointers-q3 | Pointers | gcc: `sizeof(a)` on `int a[10]` → 40 | CORRECT |
| 18 | pds-pointers-q4 | Pointers | gcc: `s[2]` of "GATE" → 'T' | CORRECT |
| 19 | pds-pointers-q5 | Pointers | gcc: `*p+2` vs `*(p+2)` → "12 30" | CORRECT |
| 20 | pds-heaps-q4 | Heaps | node sim: extract-max on `[50,40,45,20,30,42,10]` → `[45,40,42,20,30,10]` | CORRECT |

### Additional spot-checks performed beyond the required 20 (found 1 bug)

While tracing the hashing topic for the heap/hash simulation requirement, a broader sweep of
`pds-heaps-q1..q6` and `pds-hashing-q1..q13` was also run through `node -e` simulations
(min-heap validity checker, parent-index formula, leaf-range formula, linear-probing insert
trace with probe counting, chaining load-factor formula). All were correct **except one**:

| ID | Topic | Method | Verdict |
|----|-------|--------|---------|
| pds-hashing-q1, q2, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13 | Hashing | node sim / formula check | CORRECT |
| pds-heaps-q1, q2, q3, q5, q6 | Heaps | node sim / formula check | CORRECT |
| **pds-hashing-q3** | Hashing | node sim: linear probing insert of 3,10,17,6 into m=7 table, `h(k)=k mod 7` | **WRONG (fixed)** |

**pds-hashing-q3 detail.** Question: "Table size m = 7 (0 to 6), h(k) = k mod 7, LINEAR
PROBING. Keys 3, 10, 17, 6 are inserted in that order. In which slot does the key 6 end up?"
Options: `['Slot 2', 'Slot 6', 'Slot 3', 'Slot 0']`. Stored `answer: 0` ("Slot 2"). The
question's own explanation text correctly traces the insertion and concludes "place 6 directly
at slot 6" — and the node simulation confirms slot 6 (option index **1**), not slot 2. The
`answer` field pointed at the wrong option index while the explanation was already correct.

Fix applied: `/home/user/Trapped-in-a-dream/data/questions/pds.js`, line 193 —
changed `answer: 0` to `answer: 1` for `pds-hashing-q3` (explanation text was already correct
and needed no change). Verified with `node --check data/questions/pds.js` after the edit.

### MSQ index-range check (pds.js)

All 18 MSQ questions (`pds-*-y1` / `pds-*-y2` across every topic) have every index in their
`answers` array within `[0, options.length)`. No out-of-range indices found.
`pds-c-basics-y1`, `y2`, `pds-pointers-y1`, `y2` were also read in full and their
option-by-option TRUE/FALSE reasoning checked manually — all correct.

## APTI — 15 questions audited (all numeric answers recomputed with `node -e`)

| # | ID | Topic | Recomputed | Stated | Verdict |
|---|----|-------|-----------|--------|---------|
| 1 | apti-quant-q1 | Quant | 1440×5/8 = 900 | Rs. 900 | CORRECT |
| 2 | apti-quant-q2 | Quant | 1.25×0.80 = 1.00 (no change) | No net change | CORRECT |
| 3 | apti-quant-q3 | Quant | 72/480×100 = 15% | 15% | CORRECT |
| 4 | apti-quant-q4 | Quant | 8000×7.5×2/100 = 1200 | Rs. 1200 | CORRECT |
| 5 | apti-quant-q5 | Quant | 200/(90×5/18) = 8 s | 8 s | CORRECT |
| 6 | apti-quant-q6 | Quant | 36/(1/12+1/18) = 7.2 days | 7.2 days | CORRECT |
| 7 | apti-quant-q7 | Quant | solved (5x+6)/(3x+6)=7/5 → x=3, elder=15 | 15 years | CORRECT |
| 8 | apti-quant-q8 | Quant | 12000×0.1² = 120 | Rs. 120 | CORRECT |
| 9 | apti-quant-q9 | Quant | (2/3×30)−10 = 10 L | 10 L | CORRECT |
| 10 | apti-quant-q10 | Quant | 400/((54+90)×5/18) = 10 s | 10 s | CORRECT |
| 11 | apti-quant-q12 | Quant | floor(9999/88)×88 = 9944 | 9944 | CORRECT |
| 12 | apti-quant-q13 | Quant | 7²³ mod 5 (bigint modexp) = 3 | 3 | CORRECT |
| 13 | apti-quant-q15 | Quant | C(5,2)/C(8,2) = 5/14 | 5/14 | CORRECT |
| 14 | apti-logical-q9 | Logical | 40−17+1 = 24th | 24th | CORRECT |
| 15 | apti-logical-q13 | Logical | \|30×3−5.5×40\| = 130° | 130° | CORRECT |

Also cross-checked without formal table rows (all correct): apti-quant-q11 (18 days),
apti-quant-q14 (C(6,3)×C(5,2)=200), apti-quant-q16 (1.40×0.85=1.19→19%),
apti-quant-q17 (36/12+36/8=7.5h), apti-quant-q18 (LCM trace → 12 days),
apti-logical-q1 (series →127), apti-logical-q5 (3-4-5 triangle →5km),
apti-logical-q12 (leap-year weekday shift → Wednesday),
apti-logical-q17 (clock coincidence → 21 9/11 min), apti-logical-q14/q15 (series →42, 169),
apti-logical-q16 (code intersection → "na"), apti-logical-q18 (ordering chain → R).
apti.js has no MSQ (`answers`) questions, so no index-range check was needed there.

## Summary

- Audited: 35 questions (20 from pds, 15 from apti), plus an additional 17 pds spot-checks
  (heaps/hashing) performed in support of the heap/hash-simulation requirement.
- Wrong: 1 (`pds-hashing-q3` — answer index pointed to the wrong option; explanation was already correct).
- Fixed: 1 (`pds-hashing-q3`, `answer: 0` → `answer: 1`; verified with `node --check`).
- No AMBIGUOUS verdicts encountered; all other questions checked out CORRECT under
  gcc compilation, node simulation, or independent recomputation.
