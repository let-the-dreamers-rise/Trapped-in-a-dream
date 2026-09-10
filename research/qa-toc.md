# QA Audit: toc.js (Theory of Computation)

Node-loaded `data/questions/toc.js` (`window.GATE_DATA.questions['toc']`), 5 topics, 177 total questions:

- Regular Languages & Finite Automata (38)
- Context-Free Languages & Pushdown Automata (38)
- Turing Machines, Recursive & Recursively Enumerable Languages (37)
- Decidability, Undecidability & Reductions (26)
- Chomsky Hierarchy & Language Classification (38)

Sampled 30 questions across all 5 topics, weighted toward language-classification (closure/decidability/Chomsky-hierarchy) and state-count/numerical questions, per instructions. Each was re-derived independently (constructing the automaton/grammar/argument, or checking against the standard decidability table) rather than trusting the stored explanation.

## Audit table

| # | id | Topic | Type | Claim checked | Verdict |
|---|----|----|----|----|----|
| 1 | toc-regular-q1 | Regular | concept | NFA→DFA subset construction worst case = 2^n states | CORRECT |
| 2 | toc-regular-q6 | Regular | numerical | Min DFA states for "contains abb" = 4 | CORRECT |
| 3 | toc-regular-q12 | Regular | numerical | Min DFA states, "3rd symbol from right is 1" = 8 | CORRECT |
| 4 | toc-regular-x2 | Regular | pyq-style | Min DFA states, "4th symbol from right is 1" = 16 | CORRECT |
| 5 | toc-regular-y1 | Regular | MSQ | Regular ⊆ {even a's&b's, len%3, aⁿbⁿ, contains aab} → {A,B,D} | CORRECT |
| 6 | toc-regular-x5 | Regular | concept | Reversal of n-state DFA: minimal DFA bound = 2^n, achievable | CORRECT |
| 7 | toc-cfl-x5 | CFL | numerical | CNF of S→AB,A→aA\|a,B→bB\|b: # terminal-producing productions | **WRONG → FIXED** (2 → 4) |
| 8 | toc-cfl-y1 | CFL | MSQ | CFL ⊆ {aⁿbⁿcᵐ, aⁿbⁿcⁿ, wwᴿ, a*b*} → {A,C,D} | CORRECT |
| 9 | toc-cfl-y2 | CFL | MSQ | CFL/DCFL closure: union✓, ∩-regular✓, DCFL-complement✓, DCFL-union✗ | CORRECT |
| 10 | toc-cfl-y4 | CFL | MSQ | CFL vs DCFL distinguishing statements → {A,B,C} true, D false | CORRECT |
| 11 | toc-cfl-q8 | CFL | concept | {aⁿbⁿcᵐ}∩{aᵐbⁿcⁿ}={aⁿbⁿcⁿ} shows CFL not closed under ∩ | CORRECT |
| 12 | toc-cfl-x11 | CFL | numerical | CNF derivation steps for length-7 string = 2n−1 = 13 | CORRECT |
| 13 | toc-turing-q3 | TM | concept | Definition of RE (one-sided halting acceptor) | CORRECT |
| 14 | toc-turing-x1 | TM | concept | L is RE-not-recursive ⇒ complement(L) is not RE | CORRECT |
| 15 | toc-turing-x12 | TM | pyq-style | T/F batch on REC/RE/co-RE implications: (T,F,T,F) | CORRECT |
| 16 | toc-turing-y5 | TM | numerical (NAT) | 3 states × 3 tape symbols = 9 transition-table entries | CORRECT |
| 17 | toc-turing-x7 | TM | concept | REC ⊊ RE, RE\REC nonempty (Halting Problem witness) | CORRECT |
| 18 | toc-turing-q7 | TM | concept | L1,L2 RE ⇒ only L1∩L2 guaranteed RE (not complement/difference/co-union) | CORRECT |
| 19 | toc-decidability-x1 | Decidability | concept | DFA universality (L(M)=Σ*) is decidable | CORRECT |
| 20 | toc-decidability-y1 | Decidability | MSQ | Decidable: DFA-empty✓, CFG-empty✓; undecidable: CFG-universal✗, TM-empty✗ | CORRECT |
| 21 | toc-decidability-y2 | Decidability | MSQ | Rice's theorem: {L(M) empty, L(M) finite, contains 0101} undecidable; "M has 10 states" (syntactic) decidable | CORRECT |
| 22 | toc-decidability-y5 | Decidability | numerical (NAT) | CFG: emptiness/membership/finiteness decidable, universality not → 3 of 4 | CORRECT |
| 23 | toc-decidability-z8 | Decidability | concept | Correct reduction direction proving HALT_ALL undecidable (HALT_TM ≤m HALT_ALL) | CORRECT |
| 24 | toc-decidability-x6 | Decidability | concept | "0110 appears in M's encoding" is syntactic, not a language property ⇒ decidable, Rice's theorem doesn't apply | CORRECT |
| 25 | toc-hierarchy-q6 | Chomsky | concept | CFL is the class NOT closed under intersection | CORRECT |
| 26 | toc-hierarchy-q13 | Chomsky | concept | Unary language regular iff length-set eventually periodic | CORRECT |
| 27 | toc-hierarchy-x3 | Chomsky | concept | Membership decidable for regular/CFL/CSL, undecidable (only RE) for Type-0 | CORRECT |
| 28 | toc-hierarchy-x6 | Chomsky | concept | A_TM is the standard witness that CSL ⊊ RE | CORRECT |
| 29 | toc-hierarchy-y5 | Chomsky | numerical (NAT) | Unary CFL is always regular (Parikh) ⇒ fails 0 of {regular,DCFL,CFL} | CORRECT |
| 30 | toc-hierarchy-q12 | Chomsky | concept | L recursive iff L and complement(L) both RE | CORRECT |

## Fix applied

**`toc-cfl-x5`** (Context-Free Languages topic, `data/questions/toc.js`):

- Question: convert `S -> AB, A -> aA | a, B -> bB | b` to CNF and count terminal-producing productions (`X -> single terminal`).
- Stored answer: index `1` = "2". Stored explanation only counted the two newly-introduced helper productions `Xa -> a`, `Xb -> b`, silently dropping the two *original* single-terminal productions `A -> a` and `B -> b`, which are already legal CNF and must be left in the grammar unchanged (rewriting them to `A -> Xa` would create an illegal CNF unit production).
- Correct CNF grammar: `S -> AB`, `A -> Xa A`, `A -> a`, `B -> Xb B`, `B -> b`, `Xa -> a`, `Xb -> b`. Terminal-producing productions: `A -> a`, `B -> b`, `Xa -> a`, `Xb -> b` = **4**.
- Fix: `answer` changed from `1` to `3` (selecting option `"4"`); `explanation` rewritten to walk through the full CNF construction and explicitly flag the common undercount mistake.
- Verified with `node --check data/questions/toc.js` after editing (passes).

No other WRONG or AMBIGUOUS verdicts were found in the sampled 30; all other MSQ `answers` arrays were checked index-by-index against closure/decidability theorems and each unlisted index was refutable by a standard counterexample or theorem.
