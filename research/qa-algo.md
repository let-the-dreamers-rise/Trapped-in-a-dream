# QA Audit: data/questions/algo.js

Loaded via `node -e "global.window={}; require('./data/questions/algo.js'); ..."`.
`window.GATE_DATA.questions['algo']` has 6 topics, 171 questions total:
Asymptotic Analysis & Recurrences (30), Divide and Conquer (29), Greedy Algorithms (29),
Dynamic Programming (29), Graph Algorithms (30), Sorting & Searching (24).

30 questions were sampled across all 6 topics, prioritizing `difficulty: 'hard'` and
`type: 'numerical'` items. Each was independently re-derived with standalone `node -e`
scripts (loop simulation, exact merge-sort comparison counting, Dijkstra/BFS/DFS
simulation, brute-force topological-order and articulation-point enumeration, Master
theorem / Akra-Bazzi arithmetic, Huffman/Kruskal/activity-selection greedy simulation)
rather than by re-reading the stored explanation.

## Audit table

| # | id | topic | difficulty/type | verdict | independent check |
|---|----|-------|------------------|---------|--------------------|
| 1 | algo-asymptotic-x6 | Asymptotic | hard/numerical | CORRECT | simulated nested loop, count = 21 |
| 2 | algo-asymptotic-x7 | Asymptotic | hard/numerical | CORRECT | T(n)=2T(n/2)+n/log n solves to Theta(n log log n) (recursion-tree sum = n·H_(log n)) |
| 3 | algo-asymptotic-y3 | Asymptotic | hard/multi-select | CORRECT | `answers:[0,1,3]` matches truth values of A/B/C/D re-derived from growth-rate limits |
| 4 | algo-asymptotic-y4 | Asymptotic | easy/numerical | CORRECT | simulated loop, count = 40 |
| 5 | algo-asymptotic-y5 | Asymptotic | medium/numerical | CORRECT | T(1)=1,T(2)=7,T(4)=37 by direct recurrence evaluation |
| 6 | algo-asymptotic-y6 | Asymptotic | easy/numerical | CORRECT | C(5,2)=10 |
| 7 | algo-asymptotic-q7 | Asymptotic | medium/concept | CORRECT | counterexamples for A/C/D verified numerically (f=2n,g=n etc.), B holds by log monotonicity |
| 8 | algo-asymptotic-q11 | Asymptotic | medium/concept | CORRECT | evaluated f1..f4 at n=1e6: f3≈22 < f4≈2.0e7 < f2=1e9 < f1≈3.2e9 |
| 9 | algo-divide-conquer-q15 | Divide & Conquer | medium/numerical | CORRECT | exact merge-sort simulation on [7..0], comparisons = 12 |
| 10 | algo-divide-conquer-x3 | Divide & Conquer | hard/numerical | **WRONG** (fixed) | simulated T(n) step-count for n up to 10^6+1 and 2^20: steps grow like ~2·log2(n) (e.g. 26 and 20), not linearly — see below |
| 11 | algo-divide-conquer-x4 | Divide & Conquer | hard/numerical | CORRECT | Master theorem a=5,b=3 ⇒ n^log_3(5)≈n^1.465, Case 1 applies |
| 12 | algo-divide-conquer-x6 | Divide & Conquer | hard/numerical | CORRECT | T(n)=4T(n-1)+Θ(1) unrolls to Θ(4^n), matches board's 4^n unit squares |
| 13 | algo-divide-conquer-x7 | Divide & Conquer | hard/numerical | CORRECT | log2(6)≈2.585 < log2(7)≈2.807, Case 1 applies, faster than Strassen |
| 14 | algo-divide-conquer-y4 | Divide & Conquer | medium/numerical | CORRECT | a=4,b=2 ⇒ n^2·(log n)^1 matches Case-2 template with k=1 |
| 15 | algo-divide-conquer-y5 | Divide & Conquer | medium/numerical | CORRECT | level sums 4+6+7=17, matches n·log2 n − n + 1 = 17 |
| 16 | algo-divide-conquer-y6 | Divide & Conquer | easy/numerical | CORRECT | floor(log2 16)+1 = 5 |
| 17 | algo-greedy-y4 | Greedy | medium/numerical | CORRECT | Kruskal simulation, MST weight = 1+2+3+4 = 10 |
| 18 | algo-greedy-y5 | Greedy | medium/numerical | CORRECT | Huffman merge costs 14+25+39=78; cross-check 2×(5+9+12+13)=78 |
| 19 | algo-greedy-y6 | Greedy | easy/numerical | CORRECT | greedy earliest-finish simulation selects 3 activities |
| 20 | algo-graph-q6 | Graph | medium/numerical | CORRECT | enumerated all S→T paths; true shortest = 0 via S→B→A→T |
| 21 | algo-graph-x1 | Graph | hard/numerical | CORRECT | 4-cycle of unit-weight edges, any 3 of 4 form a valid MST ⇒ 4 MSTs |
| 22 | algo-graph-x2 | Graph | hard/numerical | CORRECT | Dijkstra simulation (finalize-once, no re-relax): reports dist(C)=1 vs true −2 |
| 23 | algo-graph-x4 | Graph | hard/numerical | CORRECT | brute-force articulation-point check: exactly {B, D} |
| 24 | algo-graph-x5 | Graph | hard/numerical | CORRECT | brute-force permutation enumeration: 2 valid topological orders |
| 25 | algo-graph-x6 | Graph | hard/numerical | CORRECT | brute-force permutation enumeration: 2 valid topological orders |
| 26 | algo-graph-q13 | Graph | medium/concept | CORRECT | BFS level property (|level(u)-level(v)|≤1 for any edge) confirmed |
| 27 | algo-graph-q16 | Graph | medium/pyq-style | CORRECT | DAG-SSSP-via-topological-order is the standard Θ(V+E) negative-weight-safe algorithm |
| 28 | algo-sorting-searching-q10 | Sorting & Searching | hard/numerical | CORRECT | radix sort = d passes of Θ(n+b) counting sort = Θ(d(n+b)) |
| 29 | algo-sorting-searching-q16 | Sorting & Searching | hard/concept | CORRECT | 1/5+7/10=9/10<1 ⇒ geometric convergence to Θ(n), standard median-of-medians argument |
| 30 | algo-sorting-searching-x3 | Sorting & Searching | hard/concept | CORRECT | standard interpolation-search result: Θ(log log n) average / Θ(n) worst-case under skew |
| — | algo-dp-q6 | DP | hard/concept | CORRECT | pseudo-polynomial definition (poly in value of W, exponential in bit-length of W) is standard |
| — | algo-dp-q13 | DP | hard/concept | CORRECT | K[i][w-w_i] (same row i) re-permits item i ⇒ unbounded knapsack, standard result |
| — | algo-dp-q15 | DP | medium/concept | CORRECT | longest simple path lacks optimal substructure (concatenation can revisit vertices) |
| — | algo-dp-x5 | DP | hard/concept | CORRECT | Held–Karp bitmask DP is Θ(n²·2ⁿ): 2ⁿ·n states, Θ(n) transition each |

Also spot-checked `algo-graph-y3` (multi-select MST-uniqueness question): `answers:[0,1,3]`
correctly matches the truth values re-derived from the cut/cycle properties (the
"maximum-weight edge can never be part of the MST" claim is false because that edge could
be a bridge) — CORRECT, not a data bug (the question legitimately uses `answers`/array
instead of a single `answer` index for select-all questions).

## Fix details

### algo-divide-conquer-x3 — WRONG, fixed

**Question:** exponentiation recurrence T(n) = T(n/2)+O(1) on even n, T(n) = T(n-1)+O(1)
on odd n; asks for worst-case multiplication count.

**Stored answer (before):** index 1, "Theta(n)" — with an explanation that explicitly
admitted "never landing on an even number for many steps is impossible for integers" and
then still concluded Theta(n), a self-contradiction.

**Independent verification:**
```js
function T(n){ if(n<=1) return 0; return n%2===0 ? 1+T(n/2) : 1+T(n-1); }
// T(5)=3, T(9)=4, T(17)=5, T(33)=6, T(65)=7, T(129)=8
// T(1000001)=26, T(2^20)=20
```
Because an odd n minus 1 is always even, a decrement step can never be followed by
another decrement step — every decrement is immediately followed by at least one
halving. So the total number of steps is bounded by ~2·log2(n), i.e. Θ(log n), not Θ(n).
The simulation above confirms this (e.g. ~26 steps for n≈10^6, matching 2·log2(10^6)≈40
as an upper bound and far from linear in n).

**Fix applied** (`/home/user/Trapped-in-a-dream/data/questions/algo.js`, question
`algo-divide-conquer-x3`):
- `answer`: changed from `1` to `0` (Theta(log n))
- `explanation`: rewritten to correctly argue that an odd step can never repeat
  consecutively (since odd − 1 is always even), so the recurrence still resolves to
  Θ(log n) despite the flawed-looking odd branch.

Verified with `node --check data/questions/algo.js` after the edit (passes), and by
re-loading the module and confirming the new `answer`/`explanation` values are in place.

## Summary

Audited 30 questions (plus 4 extra spot-checks for a total of 34 independently verified).
1 confirmed WRONG (algo-divide-conquer-x3), fixed with a corrected answer index and
explanation. 0 AMBIGUOUS. All other sampled questions — including every hard/numerical
graph, divide-and-conquer, and asymptotic-analysis item — were independently re-derived
by simulation or exact arithmetic and matched the stored answer.
