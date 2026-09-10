# QA Audit — engmath.js

Date: 2026-08-29
Scope: `data/questions/engmath.js` → `window.GATE_DATA.questions['engmath']` (8 topics, 216 questions total).

Method: Node-loaded the data file. Sampled 32 questions spread across all 8 topics,
prioritizing `type: 'numerical'` with `difficulty: 'hard'` (falling back to medium
numerical, then other types, when a topic had few hard numerical items). For every
question the stated answer was independently re-derived — brute-force truth tables
for propositional logic, closed-form counting (Bell numbers, Euler's totient,
derangements, Cayley's formula, stars-and-bars, Poisson/Binomial/Exponential/Geometric
formulas), and direct arithmetic (matrix determinant, eigenvalues, cofactor expansion)
via `node -e` scripts — then compared against the stored `answer` index/value and
its explanation.

## Result: 32 audited, 0 wrong, 0 fixed

Every sampled question's stored answer matched an independent re-derivation exactly.
No edits were made to the source file.

| id | topic | type / difficulty | independent result | stored answer | verdict |
|---|---|---|---|---|---|
| engmath-discrete-logic-q16 | Propositional & FOL | numerical / hard | all 4 are tautologies (brute-force truth table) | "4" | CORRECT |
| engmath-discrete-logic-y6 | Propositional & FOL | numerical / hard (NAT) | AND/OR closure of {p,q} = 4 distinct functions (BFS enumeration) | 4 | CORRECT |
| engmath-discrete-logic-q3 | Propositional & FOL | numerical / medium | 5 satisfying rows (8-row brute force) | "5" | CORRECT |
| engmath-discrete-logic-x3 | Propositional & FOL | numerical / medium | 6 satisfying rows (8-row brute force) | "6" | CORRECT |
| engmath-sets-relations-y5 | Sets/Relations/Functions | numerical / hard (NAT) | Bell(4) = 1+4+3+6+1 = 15 | 15 | CORRECT |
| engmath-sets-relations-q3 | Sets/Relations/Functions | numerical / medium | Bell(3) = 5 | "5" | CORRECT |
| engmath-sets-relations-q5 | Sets/Relations/Functions | numerical / medium | onto(4→3) = 3^4 - C(3,1)2^4 + C(3,2)1^4 = 36 | "36" | CORRECT |
| engmath-sets-relations-q9 | Sets/Relations/Functions | numerical / medium | reflexive+symmetric on 3 elts = 2^3 = 8 | "8" | CORRECT |
| engmath-groups-q6 | Monoids & Groups | numerical / hard | identity e=0; a=1 has no inverse → exclude 1 | "1" | CORRECT |
| engmath-groups-q2 | Monoids & Groups | numerical / medium | φ(12) = 4 | "4" | CORRECT |
| engmath-groups-q11 | Monoids & Groups | numerical / medium | order-2 elements in Z10: only {5} → 1 | "1" | CORRECT |
| engmath-groups-x2 | Monoids & Groups | numerical / medium | φ(12) = 4 | "4" | CORRECT |
| engmath-graph-theory-q8 | Graph Theory | numerical / hard | Cayley: 4^(4-2) = 16 (cross-checked path+star count) | "16" | CORRECT |
| engmath-graph-theory-q13 | Graph Theory | numerical / hard | handshake/edge-count algebra → n = 7 | "7" | CORRECT |
| engmath-graph-theory-q6 | Graph Theory | numerical / medium | planar bound 3n-6 = 24 for n=10 | "24" | CORRECT |
| engmath-graph-theory-q11 | Graph Theory | numerical / medium | perfect matchings K3,3 = 3! = 6 | "6" | CORRECT |
| engmath-combinatorics-q8 | Combinatorics | numerical / hard | [x^5] 1/(1-x)^3 = C(7,2) = 21 | "21" | CORRECT |
| engmath-combinatorics-x5 | Combinatorics | numerical / hard | same identity → C(7,2) | "C(7,2)" | CORRECT |
| engmath-combinatorics-q4 | Combinatorics | numerical / medium | Fibonacci recurrence a8 = 55 | "55" | CORRECT |
| engmath-combinatorics-q5 | Combinatorics | numerical / medium | D(4) = 24(1-1+.5-1/6+1/24) = 9 | "9" | CORRECT |
| engmath-linear-algebra-q10 | Linear Algebra | numerical / hard | eig(uu^T) = {u^Tu, 0, 0} = {9,0,0} | "9, 0, 0" | CORRECT |
| engmath-linear-algebra-q13 | Linear Algebra | numerical / hard | Cayley-Hamilton → A^-1 = (5I-A)/6 | "(5I - A)/6" | CORRECT |
| engmath-linear-algebra-q7 | Linear Algebra | numerical / medium | det(A)=6 → det(A^2)=36 | "36" | CORRECT |
| engmath-linear-algebra-q8 | Linear Algebra | numerical / medium | cofactor expansion det = -3 (computed exactly) | "-3" | CORRECT |
| engmath-calculus-q12 | Calculus | numerical / hard | critical pts + endpoints → max f(5)=21 | "21" | CORRECT |
| engmath-calculus-q16 | Calculus | numerical / hard | ∫(x-x^2)dx on [0,1] = 1/6 | "1/6" | CORRECT |
| engmath-calculus-q17 | Calculus | numerical / hard | 1^∞ form via log/series → e^(-1/2) = 1/√e | "1/sqrt(e)" | CORRECT |
| engmath-calculus-q3 | Calculus | numerical / medium | L'Hopital ×2 / series → 1/2 | "1/2" | CORRECT |
| engmath-probability-q14 | Probability | numerical / hard | Exp(λ=1/5), P(X>10)=e^-2 | "e^{-2} (approx 0.135)" | CORRECT |
| engmath-probability-q6 | Probability | numerical / medium | Geometric(p=.5) mean = 1/p = 2 | "2" | CORRECT |
| engmath-probability-q9 | Probability | numerical / medium | Binomial(4,.5) P(X=2)=6/16=0.375 | "0.375" | CORRECT |
| engmath-probability-q11 | Probability | numerical / medium | Poisson(λ=2) P(X=0)=e^-2 | "e^{-2} (approx 0.135)" | CORRECT |

## Fixes applied

None. No WRONG or AMBIGUOUS verdicts were reached; the file was not edited.

## Notes

- Sampling covered all 8 topics: Propositional & First-Order Logic, Sets/Relations/Functions & Lattices,
  Monoids & Groups, Graph Theory, Combinatorics, Linear Algebra, Calculus, Probability.
- Independent verification used `node -e` scripts for: exhaustive truth-table checks (3 logic
  questions), BFS closure enumeration (1 logic question), Bell-number partition counts,
  Euler's totient, inclusion-exclusion (onto functions, derangements), Cayley's formula,
  planar-graph edge bound, bipartite perfect-matching count, generating-function/stars-and-bars
  coefficient, Fibonacci-style recurrence, exact 3x3 cofactor-expansion determinant, eigenvalue
  facts for rank-1 outer products and Cayley-Hamilton inversion, calculus extrema/area/limit
  derivations, and standard Exponential/Poisson/Binomial/Geometric probability formulas.
- Given the conservative "only fix when certain" mandate and a 100% match rate across this
  sample, no changes were warranted this round.
