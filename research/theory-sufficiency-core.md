# Theory Sufficiency Audit — Core GATE Prep App

**Scope:** 32 questions sampled from `data/questions/{engmath,pds,algo}.js` (1,045 questions total across 23 topics), weighted toward `difficulty:"hard"` and `type:"numerical"`. For each, the question, its official `explanation`, and the FULL theory (`intro`+`core`+`deep`+`strategy`) of its topic were read and cross-checked: every formula/theorem/technique the explanation relies on was hunted for in the theory text.

Sampling pool: 353 hard, 355 numerical, 148 hard+numerical, out of 1,045 total.

## Per-question table

| # | Question ID | Topic | Verdict | Missing item (if not fully covered) |
|---|---|---|---|---|
| 1 | pds-heaps-h4 | pds-heaps | **NOT-COVERED** | d-ary (generalized branching-factor) heap child-index formula and internal-node counting never taught; theory only gives binary-heap indices (2i+1, 2i+2 / parent (i-1)/2). |
| 2 | algo-divide-conquer-x6 | algo-divide-conquer | FULLY-COVERED | — (subtractive recurrence T(n)=aT(n-1)+c telescoping is taught in algo-asymptotic via the Tower-of-Hanoi example T(n)=2T(n-1)+1→Θ(2^n); the a=4 case is a direct generalization) |
| 3 | engmath-linear-algebra-h7 | engmath-linear-algebra | FULLY-COVERED | — |
| 4 | algo-sorting-searching-u2 | algo-sorting-searching | **NOT-COVERED** | KMP failure function / prefix function algorithm is never introduced anywhere in the app — no topic mentions KMP, "prefix function," "failure function," or string pattern matching at all. |
| 5 | engmath-linear-algebra-q13 | engmath-linear-algebra | FULLY-COVERED | — |
| 6 | engmath-combinatorics-h2 | engmath-combinatorics | PARTIAL | Bounded-variable stars-and-bars via inclusion–exclusion (subtracting the "xi ≥ upper+1" bad events) is never worked as a combined technique; stars-and-bars and inclusion–exclusion are each taught, but never fused into this specific pattern. |
| 7 | engmath-sets-relations-h5 | engmath-sets-relations | FULLY-COVERED | — |
| 8 | pds-pointers-y4 | pds-pointers | FULLY-COVERED | — (direct instance of the stated general rule "p−q gives element count = byte diff / sizeof(T)", T=char ⇒ byte count) |
| 9 | pds-trees-h4 | pds-trees | **NOT-COVERED** | Tree diameter (longest path between any two nodes, not necessarily through the root) is never defined or taught; no mention of the "two largest child-subtree heights + 2, maximized over all nodes" algorithm. Theory covers traversals, Catalan counting, BST ops, height bounds — but not diameter. |
| 10 | engmath-graph-theory-h2 | engmath-graph-theory | PARTIAL | "Wheel graph" is never named or defined, and the odd/even-rim parity rule for its chromatic number (χ=3 for even rim, χ=4 for odd rim) is never stated. A student could reconstruct it by combining separately-taught facts (odd cycle ⇒ χ=3; universal vertex needs a color distinct from all rim colors) but the named pattern and its trap are absent. |
| 11 | engmath-discrete-logic-h6 | engmath-discrete-logic | FULLY-COVERED | — |
| 12 | algo-asymptotic-x6 | algo-asymptotic | FULLY-COVERED | — |
| 13 | algo-dp-z7 | algo-dp | FULLY-COVERED | — |
| 14 | engmath-combinatorics-q8 | engmath-combinatorics | FULLY-COVERED | — |
| 15 | engmath-linear-algebra-h1 | engmath-linear-algebra | FULLY-COVERED | — |
| 16 | algo-asymptotic-h2 | algo-asymptotic | FULLY-COVERED | — |
| 17 | engmath-combinatorics-h5 | engmath-combinatorics | PARTIAL | Coin-change case-enumeration technique (fix the count of the largest denomination used, then count remaining via `floor(remaining/2)+1`) is never worked; only pure generating-function coefficient extraction is shown for this problem class, and it's never connected to hand-countable case splitting. |
| 18 | pds-recursion-x3 | pds-recursion | FULLY-COVERED | — |
| 19 | engmath-discrete-logic-x2 | engmath-discrete-logic | FULLY-COVERED | — |
| 20 | algo-sorting-searching-x3 | algo-sorting-searching | **NOT-COVERED** | Interpolation search — the probe formula, its Θ(log log n) average case under uniform distribution, and its Θ(n) worst-case degradation under non-uniform/clustered data — is never introduced anywhere in the theory. |
| 21 | engmath-discrete-logic-x5 | engmath-discrete-logic | PARTIAL | Deriving NOT from a constant (p → FALSE ≡ ¬p) as a functional-completeness-building technique is never demonstrated; theory states "{→, NOT} is complete" as a bare fact but never shows how to bootstrap NOT out of implication plus a constant. |
| 22 | pds-heaps-p7 | pds-heaps | FULLY-COVERED | — (leaf count ceil(n/2) and height floor(log2 n) both derivable/stated) |
| 23 | pds-c-basics-x5 | pds-c-basics | FULLY-COVERED | — |
| 24 | engmath-combinatorics-pyq6 | engmath-combinatorics | FULLY-COVERED | — |
| 25 | pds-recursion-q12 | pds-recursion | FULLY-COVERED | — |
| 26 | pds-stacks-queues-h2 | pds-stacks-queues | FULLY-COVERED | — |
| 27 | pds-stacks-queues-y5 | pds-stacks-queues | PARTIAL | Theory's core section states the circular-queue element-count formula as `(rear − front + n) mod n` (the "rear = next free slot" convention), but this question (and its own official explanation) uses the "rear = index of last inserted element, inclusive" convention, which needs `(rear − front + n) mod n + 1`. The two circular-queue conventions are distinguished for full/empty tests in the deep section, but the count formula itself is only given once, for the wrong-for-this-question convention. |
| 28 | engmath-linear-algebra-q9 | engmath-linear-algebra | FULLY-COVERED | — |
| 29 | engmath-combinatorics-q1 | engmath-combinatorics | FULLY-COVERED | — |
| 30 | pds-c-basics-y3 | pds-c-basics | **NOT-COVERED** | The `continue` statement (skip the rest of the loop body, proceed to next iteration) is never introduced anywhere in the C fundamentals theory — `break`, `switch` fall-through, and loop constructs are covered, `continue` is not. |
| 31 | engmath-groups-y5 | engmath-groups | FULLY-COVERED | — |
| 32 | algo-asymptotic-x5 | algo-asymptotic | FULLY-COVERED | — |

## A. Percentage fully covered

**22 / 32 = 68.75% (≈ 69%) FULLY-COVERED.** 5 NOT-COVERED (15.6%), 5 PARTIAL (15.6%).

This likely *overstates* real-exam coverage, since the sample draws from only 16 of 23 topics and is a single pass; the corpus-wide grep below shows the specific NOT-COVERED gaps recur across multiple questions, not just the one sampled each.

## B. Missing items, grouped by topic, ordered by how many corpus questions they block

(Blocked-question counts were obtained by grepping the full `explanation`/`q` text of **all 1,045 questions**, not just the 32-question sample, for the telltale term.)

**pds-trees** (blocks ≥4 questions in-corpus)
- Tree diameter (definition + "two largest child-subtree heights + 2" algorithm) — never taught.

**algo-sorting-searching** (blocks ≥3 questions)
- KMP failure/prefix function algorithm — never introduced anywhere.

**pds-heaps** (blocks ≥3 questions)
- Generalized d-ary heap index arithmetic and internal/leaf counting (theory is binary-heap-only).

**engmath-graph-theory** (blocks ≥1 sampled, likely more)
- "Wheel graph" as a named structure, and its odd/even-rim chromatic-number parity rule.

**engmath-combinatorics** (blocks ≥2 sampled patterns)
- Bounded stars-and-bars via inclusion–exclusion (upper-bound case) never worked as a combined technique.
- Coin-change case-enumeration technique (`floor(remaining/2)+1` per fixed count of largest coin) never worked.

**algo-sorting-searching** (second gap, same topic as KMP above)
- Interpolation search (formula, Θ(log log n) average, Θ(n) worst-case degradation) — never introduced.

**pds-c-basics** (blocks ≥1 in-corpus, high real-exam frequency expected)
- The `continue` statement — never introduced.

**engmath-discrete-logic**
- Deriving NOT from a constant (p → FALSE) as a completeness-building technique — never demonstrated, only the end fact stated.

**pds-stacks-queues**
- Circular-queue element-count formula given only for the "rear = next free slot" convention; the "rear = last-inserted, inclusive" convention used by some of the app's own questions needs the `+1` variant, which is absent — an internal theory/question inconsistency, not just an omission.

## C. Weakest topics for theory-to-question coverage

1. **pds-trees** — diameter is a standard, frequently-tested tree algorithm with zero theory backing; this is a real hole for a "hard" question type.
2. **algo-sorting-searching** — two entirely separate NOT-COVERED algorithms turned up in one 6-question sample from this topic (KMP, interpolation search); the theory file focuses heavily on comparison-sort classification and the decision-tree lower bound but has no string-matching content and no interpolation search at all, despite both being named, examinable techniques.
3. **pds-heaps** — solid on binary heaps but silently assumes the student can generalize to d-ary heaps, which the app's own question bank (3+ questions) explicitly tests.
4. **pds-c-basics** — comprehensive on operator precedence, storage classes, and switch/fall-through, but omits `continue` entirely — a basic, universally-tested C keyword.
5. **engmath-combinatorics** — otherwise the strongest topic sampled (derangements, generating functions, unbounded stars-and-bars all letter-perfect), but its two hardest question patterns (bounded stars-and-bars, coin-change case splitting) both require combining two separately-taught tools in a specific way that is never modeled, so a discovery step is left to the student under exam pressure.

## D. Is the DEEP section adding real solving power, or just restating core?

**Mostly real solving power, with a genuine minority of restatement.** Across every topic read for this audit, `deep` consistently did at least one of:
- Supply the **derivation/proof** behind a `core` claim the student would otherwise have to trust blindly (e.g. the O(n) build-heap amortized argument via per-height node counts in pds-heaps; the decision-tree Ω(n log n) proof in algo-sorting-searching; the L=I+1 induction for full binary trees in pds-trees; the Cayley-Hamilton/eigenvalue derivations in engmath-linear-algebra).
- Add a **second worked example** at higher difficulty than `strategy`'s worked example (e.g. pds-hashing's two full numeric load-factor examples; pds-stacks-queues' full infix→postfix trace with a 12-token expression).
- Introduce **named edge cases and conventions that `core` glosses over** (e.g. pds-pointers' three decay exceptions for arrays; algo-dp's knapsack 1D-array iteration-direction trap; pds-recursion's stack-depth-vs-call-count distinction).
- Give a **GATE TRAPS** list that is genuinely new content (specific wrong-answer patterns), not a repeat of `strategy`'s traps.

Where `deep` is weaker is exactly where this audit found gaps: it tends to enumerate the standard menu of sub-cases exhaustively (binary heap in every indexing convention, every sorting algorithm's full stability/space table, every DP recurrence with worked numbers) but does **not** reliably extend that menu to adjacent, GATE-legitimate variants the question bank itself tests (d-ary heaps, tree diameter, interpolation search, KMP). In other words, `deep` deepens what `core` already names, but it doesn't widen the topic's boundary — so any question whose required technique falls just outside `core`'s named menu is also outside `deep`'s, and the gap is total rather than partial.

## THEORY ADDITIONS NEEDED (prioritized, with exact text to add)

**1. pds-trees — add a "Tree diameter" subsection to `core` or `deep`:**
> "Diameter of a tree = the maximum number of edges on the path between ANY two nodes (the path need not pass through the root). Compute it with a single post-order pass: for every node, let h1 and h2 be the two largest heights among its children's subtrees (0 if fewer than two children); the diameter candidate at that node is h1 + h2 + 2 (edges: 1 up into each of the two subtrees, plus the edge crossing the node); track the maximum candidate over all nodes. Do NOT assume diameter = 2 × (depth of the deepest leaf) — the true longest path is often NOT through the root."

**2. algo-sorting-searching — add "String Pattern Matching: KMP":**
> "KMP failure function (prefix function) pi[i] for pattern P: the length of the longest proper prefix of P[0..i] that is also a suffix of P[0..i]. Computed with a pointer k starting at 0: for i=1..m-1, while k>0 and P[k]!=P[i], set k=pi[k-1]; if P[k]==P[i], k++; set pi[i]=k. Used to skip re-comparisons during search, giving Theta(n+m) matching time versus naive Theta(nm)."

**3. algo-sorting-searching — add "Interpolation Search":**
> "Interpolation search estimates the probe position via pos = low + (target-arr[low])*(high-low)/(arr[high]-arr[low]) instead of the binary-search midpoint. Under a UNIFORM key distribution, average case is Theta(log log n) — better than binary search's Theta(log n). Under a skewed/clustered/non-uniform distribution, the estimate is unreliable and worst case degrades to Theta(n), no better than linear search."

**4. pds-heaps — add "Generalized d-ary heaps" to `core`:**
> "In a d-ary heap (each node has up to d children), 0-indexed: node i's children occupy indices d*i+1 through d*i+d; parent = floor((i-1)/d). A node at index i is internal iff its first child index d*i+1 is a valid array index (<= n-1); solve d*i+1<=n-1 for the largest such i to count internal nodes exactly — do not approximate as n/d or reuse the binary-heap n/2 rule."

**5. pds-c-basics — add "The continue statement":**
> "continue immediately skips the REMAINDER of the current loop iteration's body and proceeds to the next iteration's condition check (re-evaluating the update expression in a for-loop first) — it does not exit the loop, unlike break."

**6. engmath-combinatorics — add "Bounded stars-and-bars" worked pattern:**
> "For x1+...+xk=n with each 0<=xi<=U, start from the unbounded count C(n+k-1,k-1), then subtract, for each variable, the count with that variable forced >= U+1 (substitute xi'=xi-(U+1), reducing the target by U+1), using inclusion-exclusion: alternately add back double-violations, etc. Always check whether the double-violation term is possible (target - 2(U+1) >= 0) before assuming it's zero."

**7. engmath-combinatorics — add "Coin-change by case split":**
> "To count ways to make amount N from unlimited coins of a few fixed denominations, fix the count of the LARGEST denomination (the variable with fewest possible values) and, for each fixed count, count solutions to the remaining two-denomination sub-equation directly as floor(remaining / smaller-denom) + 1. Sum over all valid counts of the largest denomination."

**8. engmath-discrete-logic — add a worked completeness derivation:**
> "To show {IMPLIES, FALSE} is functionally complete: derive NOT p as (p -> FALSE) — true exactly when p is false, matching NOT's table. With NOT and IMPLIES both available, the pair is complete because {NOT, IMPLIES} is already known complete."

**9. engmath-graph-theory — add "Wheel graphs":**
> "Wheel graph W_n = an n-cycle rim plus one hub connected to every rim vertex. chi(W_n) = 4 when n is ODD (odd rim needs 3 colors, hub needs a 4th distinct from all three); chi(W_n) = 3 when n is EVEN (even rim 2-colors, hub needs a 3rd). Always check the rim's parity before answering — do not apply one wheel rule universally."

**10. pds-stacks-queues — fix/clarify the circular-queue count formula:**
> "Element count depends on which convention rear uses. If rear = index of the NEXT FREE slot: count = (rear - front + n) mod n. If rear = index of the LAST INSERTED element (inclusive): count = (rear - front + n) mod n + 1. Confirm from the question's own wording which convention rear follows before applying either formula."
