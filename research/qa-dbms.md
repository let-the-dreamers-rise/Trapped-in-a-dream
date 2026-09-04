# QA Audit — `data/questions/dbms.js`

**Method:** Loaded `window.GATE_DATA.questions['dbms']` in Node (5 topics: `dbms-er`, `dbms-ra-sql`, `dbms-normalization`, `dbms-indexing`, `dbms-transactions`; 178 questions total). Sampled 33 questions across all 5 topics, weighted toward candidate-key/closure counting, SQL/relational-algebra result counting, serializability/precedence-graph analysis, and B+-tree capacity math. Every numerical/logic claim was **re-derived from scratch** with standalone Node scripts (closure/candidate-key enumeration via brute-force attribute-subset search, SQL/RA re-execution on the literal stated rows honoring three-valued NULL logic, precedence-graph construction + cycle detection + topological-sort counting, B+-tree order/leaf-capacity inequalities solved and floor-checked). Options and `answer`/`answers` index fields were checked against the recomputed value, and for MSQ items every option's in/out-of-`answers` membership was independently justified.

**Result: 33/33 CORRECT.** No wrong or ambiguous items found in this sample; no edits were made.

## Audit table

| # | ID | Topic | Type | Check performed | Recomputed result | Stated answer | Verdict |
|---|----|-------|------|------------------|--------------------|----------------|---------|
| 1 | dbms-er-q7 | ER | numerical | superkeys, 1 CK {A1}, n=6 | 2^5=32 | "32" | CORRECT |
| 2 | dbms-er-q8 | ER | numerical | superkeys, 2 singleton CKs, n=5, incl-excl | 16+16-8=24 | "24" | CORRECT |
| 3 | dbms-er-q9 | ER | numerical | 1:1, F total/E partial → min tables + FK side | 2 tables, FK on total side (F) | "2" | CORRECT |
| 4 | dbms-er-x8 | ER | numerical | superkeys, CKs {A,B},{C}, n=5, incl-excl | 8+16-4=20 | "20" | CORRECT |
| 5 | dbms-er-x9 | ER | numerical | natural join row count + result key | Dept unique in DeptInfo ⇒ no fan-out, 50 rows, Eid stays key | 50 rows, Eid | CORRECT |
| 6 | dbms-er-y4 | ER | nat | superkeys, CKs {A},{B,C}, n=4, incl-excl | 8+4-2=10 | 10 | CORRECT |
| 7 | dbms-er-y1 | ER | MSQ | 4-option membership check, only CK {A,B}, n=4 | in:{A,B,C} superkey✓, {A,B} only CK✓(given), 4 superkeys✓(2^2); out:{A} CK✗ | answers=[0,1,3] | CORRECT |
| 8 | dbms-ra-sql-q6 | RA/SQL | numerical | natural join R(A,B)⋈S(B,C), literal rows | re-executed in Node: 5 tuples | "5" | CORRECT |
| 9 | dbms-ra-sql-q7 | RA/SQL | numerical | LEFT OUTER JOIN row count | re-executed: 5 rows | "5" | CORRECT |
| 10 | dbms-ra-sql-q8 | RA/SQL | numerical | GROUP BY + HAVING COUNT(*)>1 | re-executed: 2 rows (D1,D3 survive) | "2" | CORRECT |
| 11 | dbms-ra-sql-q9 | RA/SQL | numerical | `NOT IN` with NULL in subquery, 3-valued logic | re-executed with UNKNOWN semantics: 0 rows | "0" | CORRECT |
| 12 | dbms-ra-sql-q13 | RA/SQL | numerical | self-join `e1.sal > e2.sal` | re-executed all 16 pairs: 5 | "5" | CORRECT |
| 13 | dbms-ra-sql-q16 | RA/SQL | numerical | GROUP BY with NULL grouping key + COUNT(B) NULL-skipping | re-executed: 3 groups, NULL-group COUNT(B)=1 | "3 rows; count 1" | CORRECT |
| 14 | dbms-ra-sql-y6 | RA/SQL | nat | relational division R÷T | re-executed: {A=1} only | 1 | CORRECT |
| 15 | dbms-normalization-q6 | Normalization | numerical | candidate keys, FDs AB→C, C→D, D→A | brute-force closure search: {AB,BC,BD} → 3 keys | "3" | CORRECT |
| 16 | dbms-normalization-q7 | Normalization | numerical | which option is NOT a CK | brute-force: CKs={A,BC,CD,E}; BD⁺={B,D} only | "BD" | CORRECT |
| 17 | dbms-normalization-x1 | Normalization | numerical | candidate keys, cyclic FDs A→B→C→D→A | brute-force: {A},{B},{C},{D} → 4 keys | "4" | CORRECT |
| 18 | dbms-normalization-x2 | Normalization | numerical | candidate keys, AB→C,C→D,D→E,E→A | brute-force: {AB,BC,BD,BE} → 4 keys | "4" | CORRECT |
| 19 | dbms-normalization-y4 | Normalization | nat | candidate keys, AB→C,AB→D,C→A | brute-force: {AB,BC} → 2 keys | 2 | CORRECT |
| 20 | dbms-normalization-y5 | Normalization | nat | candidate keys, cyclic A→B→C→A | brute-force: {A},{B},{C} → 3 keys | 3 | CORRECT |
| 21 | dbms-normalization-y1 | Normalization | MSQ | 4-option TRUE/FALSE on normal-form hierarchy | A(BCNF⊊3NF)✓, B(single-attr CK⇒no partial dep)✓, C(3NF⇒BCNF)✗, D(BCNF can still violate 4NF)✓ | answers=[0,1,3] | CORRECT |
| 22 | dbms-indexing-q6 | Indexing | numerical | max order p: 8p+8(p−1)≤512 | p≤32.5 → floor 32; 33 overflows (520>512) | "32" | CORRECT |
| 23 | dbms-indexing-q7 | Indexing | numerical | max leaf keys: 18k+8≤1024 | k≤56.44 → floor 56; 57 overflows | "56" | CORRECT |
| 24 | dbms-indexing-q8 | Indexing | numerical | max order p: 8p+12(p−1)≤4096 | p≤205.4 → floor 205; 206 overflows (4108>4096) | "205" | CORRECT |
| 25 | dbms-indexing-x1 | Indexing | numerical | order-4, 3-level tree, max/min record count | max=4×4×3=48; min=2×2×2=8 | "Maximum 48, minimum 8" | CORRECT |
| 26 | dbms-indexing-x3 | Indexing | numerical | order-3 B+-tree, insert 5,10,15,20,25, count splits | step-by-step simulation: 2 leaf splits, no root split | "2" | CORRECT |
| 27 | dbms-indexing-y6 | Indexing | nat | min leaves for 100 records, leaf cap 4 | ceil(100/4)=25 | 25 | CORRECT |
| 28 | dbms-transactions-q6 | Transactions | concept | conflict-serializability via precedence graph | built graph programmatically on item A alone: T1→T2 and T2→T1 → 2-cycle | "No, cycle" | CORRECT |
| 29 | dbms-transactions-x3 | Transactions | numerical | 3-txn precedence graph, cycle check | programmatic graph: edges T1→T2, T2→T3, T3→T1 (+T2→T1) → cycle confirmed | "cycle T1→T2→T3→T1" | CORRECT |
| 30 | dbms-transactions-x4 | Transactions | numerical | 3-txn precedence graph, serial order | programmatic graph: T1→T2, T2→T3, T1→T3, DAG, unique topo order | "T1, T2, T3" | CORRECT |
| 31 | dbms-transactions-x12 | Transactions | numerical | count topological sorts of given graph | programmatic count: 2 ((T1,T2,T3) and (T1,T3,T2)) | "2" | CORRECT |
| 32 | dbms-transactions-y2 | Transactions | MSQ | 4-option TRUE/FALSE on 2PL/Strict-2PL | A(strict releases at commit)✓, B(2PL⇒serializable, not deadlock-free)✓, C(new lock after a release under 2PL)✗, D(strict 2PL prevents cascading aborts)✓ | answers=[0,1,3] | CORRECT |
| 33 | dbms-transactions-y6 | Transactions | nat | build precedence graph, count consistent total orderings | programmatic graph: T1→T2, T1→T3, no T2/T3 edge → 2 valid orderings | 2 | CORRECT |

## Fixes applied

None — every sampled question's stated answer and explanation matched independent re-derivation. No edits made; `node --check` was not needed since the source file was not modified.

## Notes

- This is a strong sample skewed toward the highest-risk question types (superkey inclusion-exclusion, NULL-sensitive SQL semantics, precedence-graph cycles, B+-tree floor/ceiling arithmetic) — categories most prone to off-by-one or sign errors in generated content. All held up under independent recomputation.
- All 3 sampled MSQ items had every option's inclusion/exclusion in `answers` independently justified against the stated fact pattern, with no false-positive or false-negative flags.
- This audit covers 33 of 178 questions (~18.5%); the remaining ~145 questions (particularly ER-to-table mapping edge cases, minimal-cover derivations, and hashing/multilevel-index arithmetic not in this sample) were not individually re-executed and could be sampled in a follow-up pass if broader coverage is desired.
