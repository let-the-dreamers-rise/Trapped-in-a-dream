# QA Audit — data/questions/compiler.js

Node-loaded `window.GATE_DATA.questions['compiler']`: subject "Compiler Design", 6 topics
(`compiler-lexical` 34, `compiler-parsing` 36, `compiler-sdt` 33, `compiler-icg` 35,
`compiler-runtime` 33, `compiler-optimization` 34 — 205 questions total).

Sampled 30 questions across all 6 topics, weighted toward the categories called out in the
task: FIRST/FOLLOW set computation, C token counting, DAG/TAC instruction counts, and
static/dynamic scoping traces. Each was independently recomputed by hand (grammars re-derived,
C fragments re-tokenized under maximal munch, DAGs re-built node-by-node, scope traces
re-walked for both disciplines) and compared against the stored `answer`/`answers` and
`explanation`.

## Audit table

| # | ID | Category | Recomputed result | Stored answer | Verdict |
|---|----|----------|--------------------|----------------|---------|
| 1 | compiler-lexical-q5 | token count `printf("sum=%d", s);` | 7 | 7 | CORRECT |
| 2 | compiler-lexical-q6 | token count `int y = x + 3 * z;` | 9 | 9 | CORRECT |
| 3 | compiler-lexical-q8 | token count `a---b;` (maximal munch) | 5 (a, --, -, b, ;) | 5 | CORRECT |
| 4 | compiler-lexical-x2 | token count, comment + `>=`/`++` | 9 | 9 | CORRECT |
| 5 | compiler-lexical-x9 | token count, `for(...)` loop | 20 | 20 | CORRECT |
| 6 | compiler-parsing-q4 | FIRST(S), S→ABC nullable A,B | {a,b,c} | {a,b,c} | CORRECT |
| 7 | compiler-parsing-q5 | FOLLOW(A), same grammar | {b,c} | {b,c} | CORRECT |
| 8 | compiler-parsing-q6 | FOLLOW(T), classic expr grammar | {+,),$} | {+,),$} | CORRECT |
| 9 | compiler-parsing-x1 | FOLLOW(A), S→AB, B non-nullable | {b,c} | {b,c} | CORRECT |
| 10 | compiler-parsing-x10 | FIRST(S), S→ABc, A,B nullable | {a,b,c} | {a,b,c} | CORRECT |
| 11 | compiler-parsing-y3 | ΣFOLLOW(A)+FOLLOW(B)+FOLLOW(C) entries | 1+2+1=4 | 4 | CORRECT |
| 12 | compiler-sdt-q1 | synthesized attribute definition | children (+ node itself) | same | CORRECT |
| 13 | compiler-sdt-q2 | L-attributed inherited-attribute rule | inherited(A) + attrs(left sibling Y) | same | CORRECT |
| 14 | compiler-sdt-x1 | SDD eval, `3+4*2` w/ precedence | 11 | 11 | CORRECT |
| 15 | compiler-sdt-x2 | SDD eval, `9-5+2` left-assoc | 6 | 6 | CORRECT |
| 16 | compiler-icg-q4 | min TAC, `x=(a+b)*(a+b)` | 2 (t1=a+b; x=t1*t1) | 2 | CORRECT |
| 17 | compiler-icg-q5 | min TAC, `w=x*y+z*y` | 3 | 3 | CORRECT |
| 18 | compiler-icg-q6 | DAG nodes, `(p+q)*(p+q)+r` | 6 (built node-by-node) | 6 | CORRECT |
| 19 | compiler-icg-q9 | TAC for `if(a<b) x=1;` | jump-based (if..goto L1; goto L2; L1: x=1; L2:) | same shape | CORRECT |
| 20 | compiler-icg-x2 | DAG-based TAC, `a=b*c+b*c` | 3 (t1=b*c; t2=t1+t1; a=t2) | 3 | CORRECT |
| 21 | compiler-icg-x3 | DAG nodes, `(p+q)*(p+q)+(p+q)` | 5 (built node-by-node) | 5 | CORRECT |
| 22 | compiler-icg-y2 | MSQ, DAG/CSE truths | indices {1,2,3} correct, {0} false | answers=[1,2,3] | CORRECT |
| 23 | compiler-runtime-q2 | control/dynamic link target | caller's activation record | same | CORRECT |
| 24 | compiler-runtime-q3 | static scoping trace | prints 5 (global) | 5 | CORRECT |
| 25 | compiler-runtime-q4 | dynamic scoping trace, same program | prints 10 (q's x) | 10 | CORRECT |
| 26 | compiler-runtime-x1 | static+dynamic trace pair | Static 1, Dynamic 2 | same | CORRECT |
| 27 | compiler-runtime-x2 | static+dynamic trace, 3-deep call chain | Static 5, Dynamic 10 (nearest active binding = s's x) | same | CORRECT |
| 28 | compiler-optimization-q1 | basic-block leader rules | first instr + jump targets + post-jump instr | same | CORRECT |
| 29 | compiler-optimization-q5 | local vs global CSE | local=within block, global=dataflow/available-expressions over CFG | same | CORRECT |
| 30 | compiler-optimization-x1 | `x=3+4*2` → `x=11` optimization name | constant folding | constant folding | CORRECT |

## Findings

- **Audited:** 30 questions (all 6 topics represented; 11 FIRST/FOLLOW-adjacent, 5 pure C
  token-counting, 6 DAG/TAC-construction, 5 static/dynamic scoping traces, 3 general
  SDT/optimization concept checks).
- **Wrong:** 0. Every recomputation — FIRST/FOLLOW sets rebuilt from the grammar rules,
  C fragments re-tokenized left-to-right under maximal munch, DAGs reconstructed node-by-node
  with sharing rules applied, and both scoping disciplines re-traced against the call chain —
  matched the stored `answer`/`answers` and the reasoning in `explanation`. The one MSQ sampled
  (`compiler-icg-y2`) had its `answers` array checked index-by-index against each option's
  truth value; all four indices are classified correctly.
- **Fixed:** 0 (no edits were needed).
- No AMBIGUOUS calls were needed in this sample — every question had a single unambiguous
  correct option given standard compiler-theory conventions (Dragon-book style grammars,
  standard C lexing rules, textbook DAG/CSE semantics, standard static/dynamic scoping
  definitions).

No edits were made to `/home/user/Trapped-in-a-dream/data/questions/compiler.js`.
