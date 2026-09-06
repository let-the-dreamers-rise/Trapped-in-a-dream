// Textbook chapter: Propositional & First-Order Logic.
// Written directly (no subagent) to match the depth and voice of the other
// chapters in data/chapters/. This is Day 1 of the 90-day plan — the reader
// has met nothing else in the syllabus yet, so nothing is assumed.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['engmath-discrete-logic'] = {
  figs: [
    {
      id: 'truth-table-tree',
      caption: 'Building a 3-variable truth table: each variable doubles the number of rows needed, because each new variable can independently be true or false alongside every combination that already exists.',
      svg: '<svg viewBox="0 0 380 190" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3" fill="none"><line x1="190" y1="15" x2="90" y2="55"/><line x1="190" y1="15" x2="290" y2="55"/><line x1="90" y1="55" x2="45" y2="95"/><line x1="90" y1="55" x2="135" y2="95"/><line x1="290" y1="55" x2="245" y2="95"/><line x1="290" y1="55" x2="335" y2="95"/><line x1="45" y1="95" x2="22" y2="135"/><line x1="45" y1="95" x2="68" y2="135"/><line x1="135" y1="95" x2="112" y2="135"/><line x1="135" y1="95" x2="158" y2="135"/><line x1="245" y1="95" x2="222" y2="135"/><line x1="245" y1="95" x2="268" y2="135"/><line x1="335" y1="95" x2="312" y2="135"/><line x1="335" y1="95" x2="358" y2="135"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="190" y="10">p</text><text x="90" y="50">T</text><text x="290" y="50">F</text><text x="45" y="90">T</text><text x="135" y="90">F</text><text x="245" y="90">T</text><text x="335" y="90">F</text><text x="22" y="150">TTT</text><text x="68" y="150">TTF</text><text x="112" y="150">TFT</text><text x="158" y="150">TFF</text><text x="222" y="150">FTT</text><text x="268" y="150">FTF</text><text x="312" y="150">FFT</text><text x="358" y="150">FFF</text></g><text x="190" y="175" font-size="10" fill="currentColor" text-anchor="middle" opacity=".75">2 branches per level × 3 levels = 8 rows</text></svg>'
    },
    {
      id: 'quantifier-nesting',
      caption: 'Why order matters: "for every x there is a y" lets y depend on x (each dot can pick its own partner); "there is one y for every x" demands a single y that works for all of them at once.',
      svg: '<svg viewBox="0 0 380 170" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" fill="currentColor" text-anchor="middle"><text x="95" y="16">∀x∃y P(x,y)</text><text x="285" y="16">∃y∀x P(x,y)</text></g><g stroke="currentColor" stroke-width="1.3"><circle cx="40" cy="55" r="4" fill="currentColor"/><circle cx="40" cy="90" r="4" fill="currentColor"/><circle cx="40" cy="125" r="4" fill="currentColor"/><circle cx="150" cy="55" r="4" fill="currentColor"/><circle cx="150" cy="90" r="4" fill="currentColor"/><circle cx="150" cy="125" r="4" fill="currentColor"/><line x1="44" y1="55" x2="146" y2="55"/><line x1="44" y1="90" x2="146" y2="125"/><line x1="44" y1="125" x2="146" y2="90"/><circle cx="230" cy="55" r="4" fill="currentColor"/><circle cx="230" cy="90" r="4" fill="currentColor"/><circle cx="230" cy="125" r="4" fill="currentColor"/><circle cx="340" cy="90" r="4" fill="currentColor"/><line x1="234" y1="55" x2="336" y2="90"/><line x1="234" y1="90" x2="336" y2="90"/><line x1="234" y1="125" x2="336" y2="90"/></g><g font-size="9" fill="currentColor" opacity=".8" text-anchor="middle"><text x="95" y="150">each x picks its own y</text><text x="285" y="150">one y serves every x</text></g></svg>'
    }
  ],
  text: `
WHY LOGIC COMES FIRST

Every other subject in this syllabus eventually asks you to decide whether a claim is true, whether an argument is valid, or whether two descriptions of the same thing actually say the same thing. Database queries are built from AND, OR and NOT. A loop's correctness rests on an invariant that is either true or it isn't. A specification for a piece of hardware is a compound statement about its inputs and outputs. Logic is the machinery for handling all of that precisely, and GATE tests it constantly — sometimes as its own question, more often folded invisibly into a question about something else, so that a shaky grip on logic quietly costs marks all over the paper.

This chapter builds that machinery from nothing. You do not need to have seen a truth table before. Everything here is either defined outright or derived from a definition already given — nothing is asserted "because that's the rule."

PROPOSITIONS

A proposition is a declarative sentence that has a definite truth value: it is either true or it is false, never both, and never "sort of." "7 is a prime number" is a proposition (true). "Paris is the capital of Germany" is a proposition (false). "Please close the door" is not a proposition — it is a command, and commands are neither true nor false. "x + 1 = 5" is not a proposition on its own, because its truth depends on what x is; it becomes a proposition only once x is fixed to a specific value, or is captured by a quantifier (covered later in this chapter).

We write propositions with lowercase letters — p, q, r — the way algebra writes unknown numbers with x, y, z. Each letter stands for one specific declarative sentence with a fixed truth value.

COMPOUND PROPOSITIONS AND THE FIVE CONNECTIVES

New propositions are built out of old ones with connectives. Each connective is defined completely by its truth table — a table listing every possible combination of truth values for the inputs, and the resulting truth value of the compound statement for each one. Because a proposition has only two possible values, a table with n propositions needs 2ⁿ rows to cover every combination.

[[FIG:truth-table-tree]]

Negation, ¬p ("not p"), is true exactly when p is false:

p | ¬p
T | F
F | T

Conjunction, p ∧ q ("p and q"), is true only when both p and q are true — this matches ordinary language exactly, and it is the strictest connective: any single false part makes the whole thing false.

p | q | p∧q
T | T | T
T | F | F
F | T | F
F | F | F

Disjunction, p ∨ q ("p or q"), is true when at least one of p, q is true — false only when both are false. This is the INCLUSIVE or: "either or both," matching how OR is used in mathematics and computing, even though everyday English "or" is sometimes exclusive ("you can have soup or salad" usually means not both).

p | q | p∨q
T | T | T
T | F | T
F | T | T
F | F | F

Exclusive or, p ⊕ q, is true exactly when p and q differ — true when exactly one of them is true, false when they agree (both true or both false). It is the XOR you will meet again in digital logic.

p | q | p⊕q
T | T | F
T | F | T
F | T | T
F | F | F

The conditional, p → q ("if p then q"), is the connective people misjudge most often, so it deserves the most care. Its table is:

p | q | p→q
T | T | T
T | F | F
F | T | T
F | F | T

Only one row is false: p true and q false. Every other row is true — including both rows where p is false. Why should "if p then q" be counted as true whenever p is false, regardless of q? Think of p → q as a promise: "if you pay me (p), I will deliver the goods (q)." The promise is broken only if you paid and nothing was delivered — that is the T,F row, and it is the only way to catch the promise-maker lying. If you never paid (p is false), the promise was never tested — it cannot have been broken, whatever happens with the goods, so it counts as (vacuously) kept. This is exactly why F → anything is always true: an untested promise cannot be a broken promise.

KEY: p → q is false in exactly ONE of its four rows — p true, q false — and true in the other three. The two most commonly forgotten true rows are the ones where p is false: an untested promise is never a broken one, whatever q turns out to be. When you're unsure whether a conditional is true in some row, check only whether that one failing pattern (antecedent true, consequent false) occurs; if it doesn't, the conditional is true.

p → q has several equivalent English readings that all mean the identical thing, and confusing them is the single most common logic error on this exam:

• "if p then q"
• "p implies q"
• "q if p"
• "p only if q"
• "p is sufficient for q"
• "q is necessary for p"

"p only if q" is the one that trips people up, because it sounds like it should point the other way. Read it as: p can be true ONLY IF q is also true — that is, p being true forces q to be true, which is exactly p → q, not q → p. Check it against the table: if q were false while p were true, the statement "p only if q" would be violated — matching row 2 (F) of p → q exactly.

"Unless" is the other common trap. "p unless q" means p is guaranteed UNLESS q happens — that is, p holds whenever q does not, which is ¬q → p. Because ¬q → p is logically equivalent to q ∨ p (shown later in this chapter), "p unless q" translates most simply as q ∨ p.

GATE TRAP: Do not translate "p only if q" as p ∧ q, and do not translate "if p then q" backwards as q → p. Both are extremely common wrong answers. The safest check, always available: build both candidate truth tables and see which one actually matches the row-by-row meaning of the English sentence.

The biconditional, p ↔ q ("p if and only if q," often written "p iff q"), is true exactly when p and q have the same truth value:

p | q | p↔q
T | T | T
T | F | F
F | T | F
F | F | T

p ↔ q is true precisely when p → q AND q → p are both true — "iff" packages two conditionals, one in each direction, into a single connective. This will be used repeatedly: to prove two statements are logically equivalent is exactly to prove their biconditional is always true.

CONVERSE, INVERSE, CONTRAPOSITIVE

Given a conditional p → q, three related statements are built from it by flipping and/or negating its parts:

• the CONVERSE is q → p (swap the two parts)
• the INVERSE is ¬p → ¬q (negate both parts, keep the order)
• the CONTRAPOSITIVE is ¬q → ¬p (swap AND negate)

Build all four truth tables side by side to see exactly which pairs agree and which do not:

p | q | p→q | q→p (converse) | ¬p→¬q (inverse) | ¬q→¬p (contrapositive)
T | T |  T  |       T        |        T         |          T
T | F |  F  |       T        |        T         |          F
F | T |  T  |       F        |        F         |          T
F | F |  T  |       T        |        T         |          T

Read down each column: the original and the contrapositive have identical columns (T,F,T,T) — they are logically equivalent, always. The converse and the inverse also have identical columns to each other (T,T,F,T) — they are equivalent to each other, but NOT to the original. This is the crucial fact: proving p → q is exactly as good as proving its contrapositive ¬q → ¬p (this technique, proof by contraposition, appears again later in this chapter), but proving the converse or the inverse proves nothing at all about the original statement.

GATE TRAP: "All prime numbers greater than 2 are odd" (true) has converse "all odd numbers greater than 2 are prime" (false — 9 is odd, not prime). The original being true says nothing about the converse. This is exactly the trap the table above formalises: original and converse are independent statements.

BUILDING AND USING TRUTH TABLES

A compound proposition built from n distinct propositional variables needs a truth table with 2ⁿ rows — every variable can independently be T or F, so the count of combinations multiplies by 2 for each new variable, exactly as the figure shows for 3 variables giving 2³ = 8 rows.

To evaluate a compound formula, work from the innermost parentheses outward, exactly like evaluating an arithmetic expression, respecting precedence: ¬ binds tightest, then ∧, then ∨, then →, then ↔ binds loosest. So p ∨ q ∧ ¬r means p ∨ (q ∧ (¬r)), and p → q ∨ r means p → (q ∨ r). When in doubt, or in any answer you write, use parentheses explicitly rather than relying on the reader (or yourself, later) to recall the precedence order correctly.

Work through (p ∧ q) → (p ∨ r) completely.

1. List all combinations of p, q, r — there are 2³ = 8 rows.
2. Compute the inner term p ∧ q for each row.
3. Compute the inner term p ∨ r for each row.
4. Compute the final column by applying → to the two inner columns from steps 2 and 3.

p | q | r | p∧q | p∨r | (p∧q)→(p∨r)
T | T | T |  T  |  T  |     T
T | T | F |  T  |  T  |     T
T | F | T |  F  |  T  |     T
T | F | F |  F  |  T  |     T
F | T | T |  F  |  T  |     T
F | T | F |  F  |  F  |     T
F | F | T |  F  |  T  |     T
F | F | F |  F  |  F  |     T

Every row of the final column is T. A compound proposition that is true in every possible row, regardless of the truth values of its variables, is a TAUTOLOGY. This particular tautology has a name and a use: it says that whenever p and q are both true, at least one of p or r must be true too (obviously — p alone guarantees it) — trivial here, but the same pattern of "build every row, read the final column" is exactly how every equivalence and every argument-validity check in this chapter is settled when you are unsure of a shortcut.

TAUTOLOGY, CONTRADICTION, CONTINGENCY, SATISFIABILITY

A TAUTOLOGY is a compound proposition that is true in every row of its truth table — true no matter what truth values its variables take. p ∨ ¬p is the simplest example: whatever p is, one of the two disjuncts must be true (this is the LAW OF EXCLUDED MIDDLE, met again in the law table below).

A CONTRADICTION is the opposite: false in every row. p ∧ ¬p is the simplest example — p and its own negation can never both be true.

A CONTINGENCY is a compound proposition that is neither — true in some rows and false in others, so its truth genuinely depends on the truth values of its variables. p ∧ q is a contingency: true only when both are true, false otherwise.

A proposition is SATISFIABLE if there exists at least one row of its truth table where it comes out true — at least one assignment of truth values to its variables that makes it true. Every tautology is trivially satisfiable (every row works). A contradiction is the only kind of proposition that is NOT satisfiable (no row works). A contingency is satisfiable (by definition it has at least one true row) but is not a tautology (it also has at least one false row).

KEY: Tautology ⊂ Satisfiable. Every tautology is satisfiable, but a satisfiable proposition need not be a tautology — it only needs ONE true row, not all of them. Only a contradiction is unsatisfiable. When a GATE question asks "how many satisfying assignments does this formula have," it is asking you to count the true rows of its truth table — for a contradiction the answer is 0, for a tautology the answer is the full 2ⁿ.

LOGICAL EQUIVALENCE

Two compound propositions P and Q are LOGICALLY EQUIVALENT, written P ≡ Q, if they have identical truth tables — the same truth value in every row, for every combination of their shared variables. Equivalently (and this is the definition actually used to prove equivalences without building two full tables side by side): P ≡ Q exactly when P ↔ Q is a tautology, because P ↔ Q is true in a row precisely when P and Q agree in that row, and being true in EVERY row is exactly having identical values everywhere.

De Morgan's laws are the most-used equivalences in the whole syllabus, so prove one properly rather than just stating it. Claim: ¬(p ∧ q) ≡ ¬p ∨ ¬q.

p | q | p∧q | ¬(p∧q) | ¬p | ¬q | ¬p∨¬q
T | T |  T  |   F    | F  | F  |   F
T | F |  F  |   T    | F  | T  |   T
F | T |  F  |   T    | T  | F  |   T
F | F |  F  |   T    | T  | T  |   T

The fourth and seventh columns are identical in every row: F,T,T,T against F,T,T,T. That is a complete proof that ¬(p ∧ q) ≡ ¬p ∨ ¬q. The second law, ¬(p ∨ q) ≡ ¬p ∧ ¬q, is proved the same way (do it yourself as practice — negate a disjunction on one side, conjoin two negations on the other, and check the columns match).

Read De Morgan in words to see why it is intuitive, not just mechanically true: "it is not the case that both p and q hold" is the same as saying "at least one of them fails" — ¬p ∨ ¬q. And "it is not the case that at least one holds" is the same as "both fail" — ¬p ∧ ¬q. The connective flips (∧ becomes ∨ and vice versa) exactly because negating "both" gives "at least one is missing," and negating "at least one" gives "all are missing."

THE FULL LAW TABLE

Every law below is provable by the truth-table method just demonstrated (build the table, check the columns match). Rather than proving all of them individually, memorise the table as a toolkit — you will use these constantly to simplify a formula algebraically, replacing a subformula with an equivalent one, law by law, the way you would simplify an algebraic expression.

• IDENTITY LAWS: p ∧ T ≡ p, and p ∨ F ≡ p. (T and F act like the multiplicative and additive identities of ordinary arithmetic.)
• DOMINATION LAWS: p ∨ T ≡ T, and p ∧ F ≡ F. (One absorbing value forces the whole expression to that value.)
• IDEMPOTENT LAWS: p ∨ p ≡ p, and p ∧ p ≡ p.
• DOUBLE NEGATION: ¬¬p ≡ p.
• COMMUTATIVE LAWS: p ∨ q ≡ q ∨ p, and p ∧ q ≡ q ∧ p.
• ASSOCIATIVE LAWS: (p ∨ q) ∨ r ≡ p ∨ (q ∨ r), and (p ∧ q) ∧ r ≡ p ∧ (q ∧ r).
• DISTRIBUTIVE LAWS: p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r), and p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r). (Exactly like multiplication distributing over addition — but here BOTH directions distribute, which ordinary arithmetic does not allow: you cannot distribute + over ×.)
• DE MORGAN'S LAWS: ¬(p ∧ q) ≡ ¬p ∨ ¬q, and ¬(p ∨ q) ≡ ¬p ∧ ¬q — proved above.
• ABSORPTION LAWS: p ∨ (p ∧ q) ≡ p, and p ∧ (p ∨ q) ≡ p. Proof of the first by table: if p is T, both sides are T regardless of q; if p is F, the left side is F ∨ (F ∧ q) = F ∨ F = F, matching the right side F. Both rows check out.
• NEGATION LAWS: p ∨ ¬p ≡ T (excluded middle — proved trivially: whichever value p takes, one disjunct is T), and p ∧ ¬p ≡ F (proved trivially the same way).

Two further equivalences involving → and ↔ are used so often they are worth their own names:

p → q ≡ ¬p ∨ q

This is the single most useful rewriting rule in the whole chapter — it turns every conditional into a disjunction, which lets you apply De Morgan and the distributive laws to conditionals directly. Proof by table: p→q has rows T,F,T,T; ¬p∨q has rows (F∨T),(F∨F),(T∨T),(T∨T) = T,F,T,T. Identical.

¬(p → q) ≡ p ∧ ¬q

This follows immediately from the previous line by De Morgan: ¬(p → q) ≡ ¬(¬p ∨ q) ≡ ¬¬p ∧ ¬q ≡ p ∧ ¬q. (Notice the chain of reasoning: rewrite → as ¬p∨q, apply De Morgan, apply double negation. This chaining of named laws, one at a time, is exactly how an algebraic equivalence proof is written up — shown in full in the worked problems.)

p ↔ q ≡ (p → q) ∧ (q → p) ≡ (p ∧ q) ∨ (¬p ∧ ¬q)

The first form is the definition given earlier (iff means both directions hold); the second form says directly "p and q agree" — either both true, or both false. Both are used depending on which is more convenient to manipulate.

(p ∧ q) → r ≡ p → (q → r)     [EXPORTATION]

"If p and q together give r" is the same claim as "if p, then (if q, then r)" — moving a conjoined premise into a nested conditional. This is used to restructure multi-premise implications.

p → q ≡ ¬q → ¬p     [CONTRAPOSITION]

Already established in the converse/inverse/contrapositive discussion above — restated here because it belongs in the toolkit of equivalences used for algebraic simplification, not only for proof strategy.

FUNCTIONAL COMPLETENESS

A set of connectives is FUNCTIONALLY COMPLETE if every possible truth-table (every Boolean function of any number of variables) can be built using only connectives from that set. This matters immediately: hardware gates come in limited varieties, and knowing which small sets suffice to build anything at all is the difference between "this circuit family can implement any logic function" and "it cannot."

{∧, ¬} is functionally complete. To see why, note that ∨ can be rebuilt from these two: p ∨ q ≡ ¬(¬p ∧ ¬q) (De Morgan again, run in reverse). Since ∧ and ¬ are already in the set, and ∨ can be derived from them, and every propositional formula can be written using only ∧, ∨, ¬ (this is a standard fact — any truth table can be expressed as a disjunction of the rows where it is true, each row a conjunction of the variables or their negations, which only needs ∧, ∨, ¬), the set {∧, ¬} can express anything {∧, ∨, ¬} can, which is everything.

{∨, ¬} is functionally complete by the mirror argument: p ∧ q ≡ ¬(¬p ∨ ¬q).

{→, ¬} is functionally complete: ∨ is rebuilt as p ∨ q ≡ ¬p → q (check: if p is T, ¬p is F, and F→q is T regardless of q — matching p∨q's T row; if p is F, ¬p is T, and T→q equals q — matching p∨q's remaining behavior exactly).

NAND alone is functionally complete. Define p ↑ q ("p NAND q") as ¬(p ∧ q) — true unless both are true. First build ¬ from NAND alone: p ↑ p = ¬(p ∧ p) = ¬p (using idempotence p∧p≡p). Now build ∧ from NAND and the ¬ just built: (p ↑ q) ↑ (p ↑ q) = ¬(p ↑ q) = ¬¬(p∧q) = p∧q. Since {∧, ¬} is already known complete and both are now built from NAND alone, NAND alone is complete.

NOR alone is functionally complete by the mirror construction: p ↓ q ("p NOR q") = ¬(p ∨ q); p ↓ p = ¬p; (p↓q)↓(p↓q) = ¬(p↓q) = p∨q; with ¬ and ∨ both built from NOR alone, and {∨,¬} already known complete, NOR alone is complete.

{∧, ∨} is NOT functionally complete — it is missing negation and cannot be patched. The proof is a genuine impossibility argument, not just "we haven't found a way yet": every formula built using only ∧ and ∨ is MONOTONE, meaning if you take any row where the formula is true and flip some input from F to T, the formula stays true (never flips to false) — because ∧ and ∨ can each only turn a value from false to true by adding a true input, never the reverse. Check the base case: a lone variable p is monotone (flipping it F→T can only make p itself go F→T, never T→F). Check the inductive step: if A and B are both monotone, so are A∧B and A∨B (flipping an input F→T can only keep A's value the same or raise it, and likewise for B, so their conjunction or disjunction can only stay the same or rise, never fall). By induction every ∧,∨-formula is monotone. But ¬p is NOT monotone — flipping p from F to T flips ¬p from T to F, which is exactly a forbidden fall. Since ¬p cannot be built from a set of connectives that only ever produces monotone formulas, {∧,∨} cannot express ¬, and so cannot be functionally complete.

GATE TRAP: The standard incomplete set to recognise instantly is {∧, ∨} (missing negation, proved not patchable by the monotonicity argument above). The standard single-connective complete sets are NAND alone and NOR alone — these two facts (one incomplete pair, two complete singletons) are asked directly and often.

There are exactly 2^(2ⁿ) distinct Boolean functions of n variables. Derive this by counting: a Boolean function of n variables is fully specified by its truth table, which has 2ⁿ rows; each row's output is independently either T or F, so there are 2 choices per row, and 2ⁿ rows, giving 2 × 2 × ... × 2 (2ⁿ times) = 2^(2ⁿ) total distinct functions. For n=1 this gives 2²=4 (the four one-variable functions: constant-false, identity, negation, constant-true); for n=2 it gives 2⁴=16; for n=3 it gives 2⁸=256.

KEY: The exponent-of-an-exponent shape 2^(2ⁿ) is easy to misremember as 2^(n²) or (2ⁿ)² under time pressure — anchor it by rebuilding it from the truth table every time: n variables give 2ⁿ ROWS, and each row independently gets 1 of 2 possible outputs, so the count of functions is 2 raised to the power of (the number of rows), i.e. 2^(2ⁿ). Checking n=2 gives 16 (not 8, which is 2ⁿ for n=3, an easy digit to confuse) is a fast sanity check.

NORMAL FORMS: DNF AND CNF

Any truth table can be read directly into a formula using only ∧, ∨, ¬, in one of two standard shapes.

DISJUNCTIVE NORMAL FORM (DNF) is built from the rows where the function is TRUE. For each such row, write a MINTERM: the conjunction of all variables, each one taken as itself if it is T in that row and negated if it is F in that row. The DNF is the disjunction (OR) of all these minterms — it is literally "row 1's condition, OR row 2's condition, OR ..." for every true row.

Take the truth table of p ↔ q (true in rows TT and FF). The minterm for row TT is p ∧ q. The minterm for row FF is ¬p ∧ ¬q. So the DNF is (p ∧ q) ∨ (¬p ∧ ¬q) — matching exactly the second biconditional form already stated above, confirming the method works.

CONJUNCTIVE NORMAL FORM (CNF) is the mirror construction, built from the rows where the function is FALSE. For each such row, write a MAXTERM: the disjunction of all variables, each one taken as itself if it is F in that row and negated if it is T in that row (note: opposite polarity convention from minterms). The CNF is the conjunction (AND) of all these maxterms.

For p ↔ q, the false rows are TF and FT. The maxterm for row TF (p is T, q is F) is ¬p ∨ q (negate the variable that was T, keep the one that was F). The maxterm for row FT is p ∨ ¬q. So the CNF is (¬p ∨ q) ∧ (p ∨ ¬q) — and this can be checked against the DNF by expanding one into the other with the distributive law, though the direct row-by-row construction above is faster and is what you should use under time pressure.

A formula in the form we started with is neither automatically DNF nor CNF; converting an arbitrary formula to CNF algebraically (rather than by rebuilding the whole truth table) uses exactly the law toolkit above: rewrite every → using p→q≡¬p∨q, push every ¬ inward to the variables using De Morgan and double negation, then apply the distributive law p∨(q∧r)≡(p∨q)∧(p∨r) repeatedly until every ∨ is inside and every ∧ is outside.

PREDICATES AND QUANTIFIERS

Propositional logic cannot express "every prime number greater than 2 is odd" as a single manageable unit — it would need one propositional variable per prime number, infinitely many of them, with no way to say "and this pattern holds for all of them." PREDICATE LOGIC fixes this by introducing predicates and quantifiers.

A PREDICATE is a statement containing one or more variables, which becomes an ordinary proposition (a definite true/false statement) once each variable is given a specific value from an agreed DOMAIN (also called the universe of discourse). Write P(x) for "x is prime": P(x) is not itself true or false until x is fixed — P(7) is true, P(8) is false.

The UNIVERSAL QUANTIFIER, ∀x P(x) ("for all x, P(x)"), asserts that P(x) is true for every single x in the domain. If the domain is finite, say {a, b, c}, then ∀x P(x) is defined to mean exactly P(a) ∧ P(b) ∧ P(c) — a giant conjunction over the whole domain. This definition is what makes every later rule about ∀ obvious rather than mysterious: ∀ behaves like ∧ because it literally IS a (possibly infinite) ∧.

The EXISTENTIAL QUANTIFIER, ∃x P(x) ("there exists an x such that P(x)"), asserts that P(x) is true for at least one x in the domain. Over the same finite domain {a, b, c}, ∃x P(x) means exactly P(a) ∨ P(b) ∨ P(c) — a disjunction over the domain. ∃ behaves like ∨ because it IS a (possibly infinite) ∨.

A statement with a quantifier binding every variable in it (as opposed to a bare predicate like P(x) with x unbound) has a definite truth value, exactly like a proposition — it can be evaluated as true or false once the domain and the predicate's meaning are fixed.

TRANSLATING "ALL" AND "SOME" — THE MOST IMPORTANT TRAP IN THIS CHAPTER

"All humans are mortal," with H(x): x is human, and M(x): x is mortal, translates as:

∀x (H(x) → M(x))

NOT as ∀x (H(x) ∧ M(x)). This is worth deriving carefully rather than memorising as a rule, because the derivation is what prevents the mistake under exam pressure. Expand ∀x (H(x) ∧ M(x)) over a domain containing a mix of humans and non-humans, say {Alice(human), Rex(a dog)}: it means H(Alice) ∧ M(Alice) ∧ H(Rex) ∧ M(Rex). But H(Rex) is false — Rex is not human — so this whole conjunction is FALSE, no matter how mortal Rex might be. The ∧ version claims literally everything in the domain is both human and mortal, which is a wildly stronger (and false) claim, not what "all humans are mortal" means at all. The correct version, ∀x (H(x) → M(x)), expands to (H(Alice)→M(Alice)) ∧ (H(Rex)→M(Rex)); the second conjunct has a false antecedent, so it is vacuously true regardless of Rex's mortality — exactly capturing "the statement makes no claim about non-humans," which is what "all humans are mortal" actually means.

"Some students are lazy," with S(x): x is a student, L(x): x is lazy, translates as:

∃x (S(x) ∧ L(x))

NOT as ∃x (S(x) → L(x)). Again, derive why the → version is wrong rather than just avoiding it by rule: if the domain contains even one non-student, say a Rock, then S(Rock) is false, so S(Rock)→L(Rock) is TRUE regardless of anything about laziness (false antecedent, vacuously true conditional) — meaning ∃x(S(x)→L(x)) would be satisfied by the mere existence of a non-student, saying nothing whatsoever about students or laziness. That is obviously not what "some students are lazy" claims. The correct version, ∃x(S(x)∧L(x)), directly demands an actual student who is actually lazy.

KEY: The pattern to memorise, now that both derivations are visible: universal quantification pairs with → (∀x(A(x)→B(x))), existential quantification pairs with ∧ (∃x(A(x)∧B(x))). Swapping the connective in either case produces a statement that is either far too strong (the ∀...∧ mistake) or vacuously satisfiable by irrelevant elements (the ∃...→ mistake).

FREE AND BOUND VARIABLES, SCOPE

A variable inside a quantifier's reach is BOUND by that quantifier; a variable with no enclosing quantifier is FREE. In ∀x (P(x) ∧ Q(x, y)), x is bound by ∀x, but y has no quantifier binding it and is free — the whole expression is not a genuine proposition until y is also given a value or bound by its own quantifier, because its truth still depends on what y is. The portion of the formula that a quantifier reaches is its SCOPE — normally delimited by parentheses, exactly like the scope of a variable declared inside a block of code (a comparison worth keeping, since the two ideas are genuinely the same concept in different clothing).

NEGATING A QUANTIFIED STATEMENT

Because ∀ is a (possibly infinite) ∧ and ∃ is a (possibly infinite) ∨, De Morgan's laws for quantifiers follow immediately from ordinary De Morgan by substitution:

¬∀x P(x) ≡ ∃x ¬P(x)
¬∃x P(x) ≡ ∀x ¬P(x)

Read the first in words to confirm it makes sense: "it is not the case that everything satisfies P" is the same as "something fails to satisfy P" — exactly matching ¬(P(a)∧P(b)∧...) ≡ ¬P(a)∨¬P(b)∨... which is ordinary De Morgan applied to the (infinite) conjunction, giving an (infinite) disjunction — i.e. an existential.

Pushing a negation through a nested statement is done one quantifier at a time, from the outside in, applying the appropriate law and simplifying the innermost part with propositional De Morgan once all quantifiers are past. Push the negation fully inward through ¬∀x∃y (P(x,y) → Q(x,y)):

1. Apply ¬∀x(...) ≡ ∃x¬(...): becomes ∃x ¬∃y (P(x,y) → Q(x,y)).
2. Apply ¬∃y(...) ≡ ∀y¬(...) to the inner part: becomes ∃x ∀y ¬(P(x,y) → Q(x,y)).
3. Apply the propositional identity ¬(A→B) ≡ A∧¬B to the innermost part: becomes ∃x ∀y (P(x,y) ∧ ¬Q(x,y)).

Notice the pattern that always occurs: every ∀ becomes ∃ and every ∃ becomes ∀ as the negation passes through, and only once the negation reaches the innermost propositional connective does it get absorbed using ordinary propositional laws.

DISTRIBUTING QUANTIFIERS OVER CONNECTIVES

∀ distributes over ∧: ∀x(P(x) ∧ Q(x)) ≡ ∀x P(x) ∧ ∀x Q(x). This is true because "everything satisfies both P and Q" is exactly the same claim as "everything satisfies P, and (separately) everything satisfies Q" — no information is lost either direction.

∃ distributes over ∨: ∃x(P(x) ∨ Q(x)) ≡ ∃x P(x) ∨ ∃x Q(x), by the mirror reasoning: "something satisfies P or Q" is the same as "something satisfies P, or something satisfies Q" (possibly different somethings, but that doesn't matter — either way at least one element does at least one of the two).

GATE TRAP: ∀ does NOT distribute over ∨, and ∃ does NOT distribute over ∧ — these look tempting but are false in general, and a concrete countermodel proves it decisively. Let the domain be {1, 2}, let P(x) mean "x is even," and Q(x) mean "x is odd." Then ∀x(P(x) ∨ Q(x)) is TRUE (every number is even or odd). But ∀xP(x) ∨ ∀xQ(x) is FALSE ∨ FALSE = FALSE (not everything is even, and not everything is odd). The left side is true and the right side is false, so they are not equivalent — disproven by one counterexample, which is all a claimed equivalence ever needs to be broken. The dual failure (∃ over ∧) is disproven the same way: ∃x(P(x)∧Q(x)) can be false (no single number is both even and odd) while ∃xP(x)∧∃xQ(x) is true (some number is even, and separately some number is odd) — again a mismatch.

NESTED QUANTIFIERS

When a statement has more than one quantifier, their relative order matters enormously — except when the two adjacent quantifiers are the SAME kind, in which case they commute freely: ∀x∀y P(x,y) ≡ ∀y∀x P(x,y), and ∃x∃y P(x,y) ≡ ∃y∃x P(x,y) (both are just re-orderings of the same giant conjunction or disjunction, and ∧ and ∨ are themselves commutative and associative, so the order of listing the variables makes no difference).

Mixed quantifiers do NOT commute. Let L(x,y) mean "x loves y," over a domain of people.

∀x∃y L(x,y) means "for every person x, there exists someone y whom x loves" — i.e., "everyone loves someone" (possibly a different someone for each person).

∃y∀x L(x,y) means "there exists someone y such that, for every person x, x loves y" — i.e., "there is one specific person loved by absolutely everyone."

[[FIG:quantifier-nesting]]

These are drastically different claims, and the second is much stronger. In fact ∃y∀x L(x,y) → ∀x∃y L(x,y) is always valid (a genuine logical implication, provable): if there really is one universally-loved person y₀, then trivially every x has someone to love, namely that same y₀ — so the ∃∀ form guarantees the ∀∃ form. Prove the converse FAILS with a countermodel: domain {Alice, Bob}, and suppose Alice loves Bob but not herself, and Bob loves Alice but not himself. Then ∀x∃y L(x,y) is true (Alice has Bob, Bob has Alice — everyone has someone). But ∃y∀x L(x,y) is false: is there one person loved by both? Bob is loved only by Alice (not by Bob himself), and Alice is loved only by Bob (not by Alice herself) — no single y works for both x's. So ∀∃ is true while ∃∀ is false in this model, proving the implication cannot run in that direction in general.

KEY: ∃y∀x P(x,y) → ∀x∃y P(x,y) is always a valid one-way implication (a single element working for everyone certainly lets everyone find an element). The reverse never holds in general — swapping ∀ and ∃ in a nested statement can only weaken the claim (moving from ∃∀ to ∀∃), never strengthen it, and a countermodel like the one above is how you disprove the false direction on demand rather than trying to recall it.

RULES OF INFERENCE

An ARGUMENT is a sequence of propositions called PREMISES, followed by a proposition called the CONCLUSION, with the claim that the conclusion follows from the premises. An argument is VALID exactly when the conditional (premise₁ ∧ premise₂ ∧ ... ∧ premiseₙ) → conclusion is a tautology — that is, in every row where ALL the premises happen to be true, the conclusion is also true. Validity says nothing about whether the premises themselves are actually true in the real world; it only says the reasoning from them to the conclusion is airtight.

Each rule of inference below is a short valid argument form, provable by checking that (premises)→(conclusion) is a tautology, and each is given with a plain-English instance.

MODUS PONENS: from p→q and p, conclude q.
Proof it is valid: check ((p→q)∧p)→q is a tautology. The only row where the premise (p→q)∧p is true is p=T,q=T (since p is asserted true, and p→q true with p true forces q true) — and in that row the conclusion q is indeed true. Every other row has a false premise, so the conditional is vacuously true there too.
Instance: "If it rains, the ground gets wet. It is raining. Therefore, the ground is wet."

MODUS TOLLENS: from p→q and ¬q, conclude ¬p.
This is really an application of the contrapositive: p→q ≡ ¬q→¬p, and once rewritten that way, asserting ¬q and concluding ¬p is exactly modus ponens applied to ¬q→¬p.
Instance: "If it rains, the ground gets wet. The ground is not wet. Therefore, it did not rain."

HYPOTHETICAL SYLLOGISM: from p→q and q→r, conclude p→r.
Instance: "If I study, I pass. If I pass, I graduate. Therefore, if I study, I graduate."

DISJUNCTIVE SYLLOGISM: from p∨q and ¬p, conclude q.
Instance: "It is either Monday or Tuesday. It is not Monday. Therefore, it is Tuesday."

ADDITION: from p, conclude p∨q (for any q at all).
This looks strange until you check the table: if p is true, p∨q is true regardless of q's value — the rule is simply using the definition of ∨ directly.

SIMPLIFICATION: from p∧q, conclude p (or, symmetrically, conclude q).

CONJUNCTION: from p and q (asserted separately), conclude p∧q.

RESOLUTION: from p∨q and ¬p∨r, conclude q∨r.
This is the rule underlying automated theorem provers and Prolog-style logic programming. Reasoning: if p is true, ¬p is false, so from ¬p∨r, r must be true, giving q∨r. If p is false, then from p∨q, q must be true, again giving q∨r. Either way q∨r holds.

TWO NAMED FALLACIES

AFFIRMING THE CONSEQUENT: from p→q and q, WRONGLY concluding p. This is invalid — a genuine logical error, not a rule. Counter-instance: "If it rains, the ground gets wet [true]. The ground is wet [true — perhaps from a sprinkler]. Therefore it rained" does not follow; the ground could be wet for an unrelated reason. Checking the table confirms it: rows where q is true include both p=T,q=T and p=F,q=T (with p→q true in the second since F→T is T) — so q being true does not pin down p.

DENYING THE ANTECEDENT: from p→q and ¬p, WRONGLY concluding ¬q. Counter-instance: "If it rains, the ground gets wet [true]. It is not raining [true]. Therefore the ground is not wet" does not follow — again, a sprinkler could have wet the ground with no rain at all. In the table, p=F,q=T also satisfies p→q, so ¬p does not force ¬q.

GATE TRAP: Every valid rule above pairs a conditional with either its antecedent (modus ponens) or the negation of its consequent (modus tollens) — never the negation of the antecedent or the bare consequent. If a proposed argument does either of those two things, it is one of the two fallacies above, not a valid inference, however plausible it may sound.

RULES OF INFERENCE FOR QUANTIFIED STATEMENTS

UNIVERSAL INSTANTIATION: from ∀x P(x), conclude P(a) for any specific element a in the domain. (If everything satisfies P, then certainly this particular thing does.)

UNIVERSAL GENERALIZATION: from P(a) proved for an ARBITRARY a (not a specific, cherry-picked one — the proof must work no matter which element a is), conclude ∀x P(x).

EXISTENTIAL INSTANTIATION: from ∃x P(x), conclude P(c) for SOME new element c that you introduce and give a name to (you may not assume c is any particular pre-existing element — only that at least one such element exists, and you're naming it for convenience in the rest of the proof).

EXISTENTIAL GENERALIZATION: from P(a) for a specific a, conclude ∃x P(x). (If this specific thing satisfies P, then certainly something does.)

UNIVERSAL MODUS PONENS combines universal instantiation with ordinary modus ponens, and is the pattern behind almost every syllogism: from ∀x(P(x)→Q(x)) and P(a), conclude Q(a). Work the classic instance in full: premises "All men are mortal" (∀x(M(x)→R(x)), with M: is a man, R: is mortal) and "Socrates is a man" (M(Socrates)). Step 1: instantiate the universal at x=Socrates using universal instantiation, giving M(Socrates)→R(Socrates). Step 2: apply modus ponens to that conditional and the given premise M(Socrates), concluding R(Socrates) — "Socrates is mortal."

A harder instance: given "All GATE toppers study daily" (∀x(T(x)→S(x))) and "Ravi studies daily" (S(Ravi)), can we conclude T(Ravi) ("Ravi is a topper")? No — instantiating the universal at Ravi gives T(Ravi)→S(Ravi), and we are given S(Ravi), which is the CONSEQUENT, not the antecedent. Concluding T(Ravi) from this would be affirming the consequent, the fallacy identified above. Nothing valid can be concluded about T(Ravi) from these two premises alone.

PROOF METHODS

A DIRECT PROOF of p→q assumes p is true and derives q through a chain of valid steps. Example: prove "if n is an even integer, then n² is even." Assume n is even, so n=2k for some integer k (this is the definition of even). Then n² = (2k)² = 4k² = 2(2k²), which is 2 times an integer, so n² is even by definition. Done — a direct chain from the assumption to the conclusion.

PROOF BY CONTRAPOSITION proves p→q by instead proving the logically equivalent ¬q→¬p (justified by the contraposition law established earlier). Use it when assuming ¬q gives you something easier to work with than assuming p does. Example: prove "if n² is even, then n is even," by proving the contrapositive "if n is NOT even (i.e., n is odd), then n² is NOT even (i.e., n² is odd)" — assume n=2k+1 (odd), then n²=4k²+4k+1=2(2k²+2k)+1, which is 2 times an integer plus 1, so n² is odd. This is far easier than trying to reason directly from "n² is even" toward "n is even."

PROOF BY CONTRADICTION assumes the NEGATION of what you want to prove, alongside all the given premises, and derives a contradiction (something of the form r ∧ ¬r) — since a contradiction is never true, the assumption that started the chain must be false, so the original statement must be true. This is the canonical GATE example, done in full: prove √2 is irrational.

1. Assume for contradiction that √2 IS rational.
2. Then √2 = a/b for some integers a, b with no common factor (every rational number can be written in lowest terms — this is the setup, not yet the contradiction).
3. Squaring both sides: 2 = a²/b², so a² = 2b².
4. This means a² is even (it equals 2 times an integer). By the contrapositive result proved just above (n² even implies n even), a itself must be even. So write a = 2c for some integer c.
5. Substitute back: (2c)² = 2b², giving 4c² = 2b², so b² = 2c².
6. By the same reasoning as step 4, b² even implies b is even.
7. But now both a and b are even — they share the common factor 2, directly contradicting step 2, which assumed a and b had NO common factor.
8. This is the contradiction: step 2 said "no common factor" and step 7 derives "both share factor 2." Since assuming √2 is rational leads to a genuine contradiction, the assumption must be false — √2 is irrational.

VACUOUS PROOF establishes p→q by showing p is simply false, which by the definition of → makes the whole conditional automatically true regardless of q. TRIVIAL PROOF establishes p→q by showing q is true on its own, again making the conditional automatically true regardless of p.

PROOF BY CASES splits the domain into an exhaustive set of cases, and proves the claim separately within each case — valid because if the cases genuinely cover every possibility, and the conclusion holds in each one individually, it holds everywhere. Example: prove n² ≥ n for every integer n, by cases: if n ≤ 0, then n² ≥ 0 ≥ n trivially (n² is never negative, and n itself is ≤0). If n ≥ 1, then multiplying both sides of n ≥ 1 by n (positive, so the inequality direction is preserved) gives n² ≥ n directly. These two cases (n≤0 and n≥1) cover every integer, so the claim holds everywhere.

An EXISTENCE PROOF establishes ∃x P(x). A CONSTRUCTIVE existence proof exhibits an actual x and verifies P(x) holds for it. A NON-CONSTRUCTIVE existence proof establishes that such an x must exist without ever producing one explicitly — often via proof by contradiction (assume none exists, derive an absurdity). A UNIQUENESS PROOF, needed when a claim says "there is exactly one x with property P," requires proving BOTH existence (some x works) AND uniqueness (if x and y both work, then x = y) as two separate parts.

A single COUNTEREXAMPLE is enough to disprove a universally-quantified claim ∀x P(x): since the claim asserts P(a) for every a, exhibiting one specific a with P(a) false is a direct and complete refutation — no further argument is needed. This is exactly the technique used twice already in this chapter (against ∀-over-∨ distribution, and against the ∀∃/∃∀ converse) and is often the fastest way to eliminate a wrong option on the exam.

A KNIGHTS AND KNAVES PUZZLE

On an island, every inhabitant is either a KNIGHT (who always tells the truth) or a KNAVE (who always lies) — never both, never neither. Person A says: "I am a knave, or B is a knight." Determine what A and B are.

Let a = "A is a knight" and b = "B is a knight" (each is either true or false, standing in for knight/knave). A's statement, in symbols, is ¬a ∨ b (A is a knave, i.e. ¬a, OR B is a knight, i.e. b).

Case a = TRUE (A is a knight): then A's statement must be TRUE (knights only tell the truth), so ¬a∨b must be true; since a is true, ¬a is false, forcing b to be true to make the disjunction true. Check consistency: a=T is consistent with the requirement that a knight's statement be true, and it forces b=T. Consistent case found: A is a knight, B is a knight.

Case a = FALSE (A is a knave): then A's statement must be FALSE (knaves only lie), so ¬a∨b must be false. A disjunction is false only when BOTH disjuncts are false: ¬a false means a is true — but this case assumed a is false. Contradiction. This case is impossible.

Only the first case survives: A is a knight, and B is a knight.

WORKED PROBLEMS

1. ALGEBRAIC EQUIVALENCE PROOF WITH LAWS NAMED. Show (p → q) ∧ (p → ¬q) ≡ ¬p, naming the law used at each step.
   (p→q) ∧ (p→¬q)
   ≡ (¬p∨q) ∧ (¬p∨¬q)      [rewrite both conditionals: p→q≡¬p∨q]
   ≡ ¬p ∨ (q∧¬q)            [distributive law, factoring ¬p out]
   ≡ ¬p ∨ F                  [negation law: q∧¬q≡F]
   ≡ ¬p                      [identity law: p∨F≡p]
   So a proposition that implies both q and ¬q under the same hypothesis p forces p itself to be false — exactly the mechanism behind proof by contradiction.

2. DNF AND CNF FROM A TRUTH TABLE. Given the truth table of p ⊕ q (true in rows TF and FT, false in rows TT and FF), find both normal forms.
   DNF (from the true rows): minterm for TF is p∧¬q; minterm for FT is ¬p∧q. DNF = (p∧¬q) ∨ (¬p∧q).
   CNF (from the false rows): maxterm for TT (both variables were T, so both negated) is ¬p∨¬q; maxterm for FF (both variables were F, so both kept as-is) is p∨q. CNF = (¬p∨¬q) ∧ (p∨q).

3. FUNCTIONAL COMPLETENESS CONSTRUCTION. Using only NOR (p↓q ≡ ¬(p∨q)), build ¬p, then p∧q.
   ¬p: p↓p = ¬(p∨p) = ¬p (using idempotence p∨p≡p).
   p∧q: by De Morgan, p∧q ≡ ¬(¬p∨¬q) ≡ (¬p)↓(¬q). Substitute the NOR-only expression for ¬p and ¬q found above: (p↓p) ↓ (q↓q). This uses NOR three times and produces p∧q exactly.

4. TRANSLATION WITH THE ∀/→ AND ∃/∧ TRAPS. Translate: (a) "Every student who studies passes"; (b) "Some birds cannot fly"; (c) "No cats are dogs." Domain of discourse: all creatures/people as relevant, with S(x): x is a student, T(x): x studies, P(x): x passes, B(x): x is a bird, F(x): x can fly, C(x): x is a cat, D(x): x is a dog.
   (a) ∀x((S(x)∧T(x)) → P(x)) — "every [student who studies]" is a universal over a conjunction-of-conditions subject, still paired with → for the "every."
   (b) ∃x(B(x) ∧ ¬F(x)) — "some" pairs with ∧, and "cannot fly" is ¬F(x).
   (c) ∀x(C(x) → ¬D(x)) — "no cats are dogs" restates as "every cat is a non-dog," a universal claim, so it pairs with →, not with ∧.

5. NESTED QUANTIFIER NEGATION PUSHED FULLY INWARD. Negate ∀x(P(x) → ∃y Q(x,y)) completely.
   ¬∀x(P(x)→∃y Q(x,y))
   ≡ ∃x ¬(P(x)→∃y Q(x,y))              [¬∀ becomes ∃¬]
   ≡ ∃x (P(x) ∧ ¬∃y Q(x,y))            [¬(A→B)≡A∧¬B]
   ≡ ∃x (P(x) ∧ ∀y ¬Q(x,y))            [¬∃ becomes ∀¬, applied to the inner part]
   Final form: ∃x(P(x) ∧ ∀y ¬Q(x,y)) — every ∀ became ∃ and vice versa, and the innermost connective was handled last, exactly as the general method describes.

6. VALIDITY CHECK BY INFERENCE RULES. Given premises "If the exam is hard, few will pass" (H→F), "If few pass, the average is low" (F→L), and "The average is not low" (¬L), what follows, and by which rules?
   From H→F and F→L, hypothetical syllogism gives H→L. Combined with the given ¬L, modus tollens gives ¬H: "the exam is not hard." The argument is valid, using hypothetical syllogism followed by modus tollens.

7. SATISFYING-ASSIGNMENT COUNT. How many of the 8 rows of (p∨q) → r are true?
   (p∨q) is false only when p=F,q=F (1 combination), and true in the other 3 combinations of p,q. When (p∨q) is false, F→r is true regardless of r (2 rows: r=T and r=F both work) — that's 2 satisfying rows from this branch. When (p∨q) is true (3 combinations of p,q), T→r is true only when r=T — that's 3 more satisfying rows (one for each of the 3 p,q combinations, with r fixed to T), and 3 failing rows (same p,q combinations with r=F). Total satisfying rows: 2 + 3 = 5 out of 8.

8. KNIGHTS AND KNAVES. B says: "A and I are of different types." What can be determined about A and B?
   Let a="A is a knight", b="B is a knight". B's statement in symbols is a⊕b (different types means their knight/knave statuses differ, i.e. XOR).
   Case b=TRUE (B is a knight, statement must be true): a⊕b=T with b=T requires a=F. So a=F, b=T is consistent (a knight, B, truthfully says they're different, and indeed A is a knave while B is a knight).
   Case b=FALSE (B is a knave, statement must be false): a⊕b=F with b=F requires a=F. Check: a=F, b=F means both are knaves — but then B's statement "we are different" is indeed false (matching the requirement that a knave's statement is false, since they're actually the same, both knaves) — so a=F,b=F is ALSO internally consistent.
   Two consistent solutions survive: either (A is a knave, B is a knight) or (A is a knave, B is a knave) — in both, A is unavoidably a knave, but B's type cannot be determined from this single statement alone. This is worth noting as its own lesson: not every knights-and-knaves puzzle pins down every person: some genuinely leave one person's type undetermined, and correctly recognising that ("B could be either") is the right answer, not a sign of an error in the working.

CARRYING THIS FORWARD

Every later topic in this syllabus leans on this chapter without saying so. Set theory's element-of and subset-of relations are predicates; a subset proof is a direct proof of a universally-quantified conditional (∀x(x∈A → x∈B)), using exactly the proof method taught here. Digital logic's Boolean algebra is propositional logic wearing different notation (0/1 instead of F/T, · and + instead of ∧ and ∨), and its De Morgan's laws for gates are the identical laws proved here. Algorithm correctness proofs are proof by induction and proof by contradiction, both introduced here in miniature. Database query languages express "every row where..." and "some row such that..." with the same ∀/→ and ∃/∧ pairing drilled in this chapter. Whenever a later chapter says "this follows immediately" about a logical step, this is the chapter that step is following from.
`
};
