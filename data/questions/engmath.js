window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['engmath'] = {
  subject: 'Engineering Mathematics',
  topics: [
    {
      id: 'engmath-discrete-logic',
      name: 'Propositional & First-Order Logic',
      theory: {
        intro: "Logic is the grammar of computer science: it underlies circuit design, program verification, databases and AI. GATE tests it every single year, typically for 2-4 marks, through tautology checking, logical equivalence, English-to-logic translation, and quantifier manipulation. The questions look easy but are engineered around precise definitions - one misread implication direction flips your answer. Propositional logic deals with statements that are simply true or false and connectives joining them; first-order logic (FOL) adds quantifiers and predicates so we can talk about objects and their properties. Master the standard equivalences and the exact meaning of implication and quantifier order, and this topic becomes the most reliable free marks on the paper. Almost every GATE logic question is solvable in under two minutes with truth tables, known laws, or a single counterexample - if you know exactly which tool to reach for.",
        core: "• Connectives: negation (~p), conjunction (p AND q), disjunction (p OR q), implication (p -> q), biconditional (p <-> q). p -> q is false ONLY when p is true and q is false; a false premise makes the implication vacuously true.\n\n• Key equivalences: p -> q == ~p OR q. Contrapositive: p -> q == ~q -> ~p (equivalent). Converse (q -> p) and inverse (~p -> ~q) are NOT equivalent to p -> q, but converse and inverse are equivalent to each other. Biconditional: p <-> q == (p -> q) AND (q -> p) == (p AND q) OR (~p AND ~q).\n\n• Laws: De Morgan: ~(p AND q) == ~p OR ~q; ~(p OR q) == ~p AND ~q. Distribution, absorption (p OR (p AND q) == p), double negation. Exportation: (p AND q) -> r == p -> (q -> r).\n\n• Classification: a tautology is true under every assignment; a contradiction is false under every assignment; a contingency is sometimes true, sometimes false. Satisfiable means true under at least one assignment (every tautology is satisfiable, but not conversely).\n\n• Valid argument forms: Modus ponens ((p -> q) AND p) => q. Modus tollens ((p -> q) AND ~q) => ~p. Hypothetical syllogism ((p -> q) AND (q -> r)) => (p -> r). Fallacies GATE loves: affirming the consequent ((p -> q) AND q => p is INVALID) and denying the antecedent ((p -> q) AND ~p => ~q is INVALID).\n\n• Functional completeness: a set of connectives is functionally complete if every boolean function can be expressed with it. {AND, NOT}, {OR, NOT}, {NAND}, {NOR}, {->, NOT} are complete; {AND, OR} is not (cannot express negation - every formula built from them is monotone).\n\n• FOL: forall x P(x) means P holds for every object in the domain; exists x P(x) means P holds for at least one. Negations: ~forall x P(x) == exists x ~P(x); ~exists x P(x) == forall x ~P(x).\n\n• Quantifier order matters: exists y forall x P(x,y) implies forall x exists y P(x,y), but the converse fails. (Everyone has a mother does not mean there is one common mother of all.)\n\n• Translation conventions: universal statements pair with implication - forall x (Student(x) -> Passes(x)); existential statements pair with conjunction - exists x (Student(x) AND Passes(x)). Mixing these up is the single most tested trap.\n\n• Distribution over quantifiers: forall x (P(x) AND Q(x)) == (forall x P(x)) AND (forall x Q(x)); exists x (P(x) OR Q(x)) == (exists x P(x)) OR (exists x Q(x)). But forall does NOT distribute over OR, and exists does NOT distribute over AND (only one-directional implications hold).\n\n• Validity in FOL means true in every interpretation (every domain, every meaning of predicates). To show a formula is not valid, exhibit one interpretation where it fails. A famous valid formula: exists x (P(x) -> forall y P(y)) - the drinker principle.",
        strategy: "First move on any propositional question with at most 3 variables: build the truth table or, faster, hunt for a falsifying assignment. To check whether X -> Y is a tautology, try to make Y false and X true; if you cannot, it is a tautology. This falsification method is usually 3x faster than a full table.\n\nFor equivalence questions, rewrite every implication as ~p OR q first, then push negations inward with De Morgan. Most GATE equivalence questions collapse in two rewriting steps.\n\nFor FOL, the domain is your weapon: to kill a claimed equivalence or validity, pick a tiny domain (two elements often suffice) and a concrete predicate like less-than on integers. Mini-example: is forall x exists y (y > x) equivalent to exists y forall x (y > x) over integers? The first says every integer has something bigger - true. The second says some integer beats all integers - false. Not equivalent, and you produced a rigorous counterexample in ten seconds.\n\nTraps to rehearse until immune: implication with false antecedent is true; only-if reverses direction (p only if q means p -> q); unless means if-not (p unless q == ~q -> p); universal quantifier pairs with ->, existential with AND. When an option says necessary condition, translate: q is necessary for p means p -> q. Score the easy 1-markers here in under a minute each and bank the time for numericals."
      },
      questions: [
        {
          id: 'engmath-discrete-logic-q1',
          q: 'Which of the following propositional formulas is a tautology?',
          options: ['(p AND (p -> q)) -> q', '(p -> q) -> p', 'p -> (p AND q)', '(p OR q) -> q'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Option A is modus ponens written as a single formula: if p is true and p -> q is true, q must be true. Try to falsify it: we would need q false and both p and p -> q true; but p true with q false makes p -> q false - contradiction, so no falsifying assignment exists. Option B fails when p is false (then p -> q is true but the conclusion p is false). Option C fails when p is true and q is false. Option D fails when p is true and q is false. The falsification test - assume the whole implication is false and derive a contradiction - is the fastest way to verify tautologies in the exam."
        },
        {
          id: 'engmath-discrete-logic-q2',
          q: 'The contrapositive of the statement "If it rains, then the match is cancelled" is:',
          options: ['If the match is cancelled, then it rains', 'If it does not rain, then the match is not cancelled', 'If the match is not cancelled, then it does not rain', 'The match is cancelled only if it rains'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "For p -> q (rain -> cancelled), the contrapositive is ~q -> ~p: if the match is not cancelled, it did not rain. This is the only listed statement logically equivalent to the original. Option A is the converse (q -> p) and option B is the inverse (~p -> ~q); both are classic distractors because they feel intuitively similar, but neither is equivalent to p -> q - they are equivalent to each other instead. Option D translates to cancelled -> rain, which is again the converse. Memorize: original == contrapositive; converse == inverse; the two pairs are independent."
        },
        {
          id: 'engmath-discrete-logic-q3',
          q: 'How many assignments of truth values to p, q, r satisfy the formula (p OR q) -> r?',
          options: ['3', '4', '5', '6'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Split by the antecedent. Case 1: p OR q is false, i.e. p = q = false. A false antecedent makes the implication true regardless of r, giving 2 satisfying assignments (r free). Case 2: p OR q is true - that is 3 choices of (p,q): (T,T), (T,F), (F,T). Now the implication forces r = true, giving 3 assignments. Total 2 + 3 = 5. The common error giving 6 is treating the implication as true whenever r is true AND forgetting to also count only the false-antecedent rows correctly; the error giving 4 comes from forgetting that (F,F) contributes two rows since r can be either value."
        },
        {
          id: 'engmath-discrete-logic-q4',
          q: 'Which implication between quantified formulas is always valid (true in every interpretation)?',
          options: ['forall x exists y P(x,y) implies exists y forall x P(x,y)', 'exists y forall x P(x,y) implies forall x exists y P(x,y)', 'exists x P(x) implies forall x P(x)', 'forall x (P(x) OR Q(x)) implies (forall x P(x)) OR (forall x Q(x))'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "If one single y0 works for every x (exists-forall), then certainly each x can find some y - namely that same y0 - so forall x exists y holds. The converse (option A) fails: over integers with P(x,y) meaning y > x, every x has a bigger y, but no single y exceeds all x. Option C fails on any domain where P holds for some but not all elements. Option D fails with domain {1,2}, P = {1}, Q = {2}: every element is in P or Q, yet neither P nor Q covers everything. Rule to remember: exists-forall is the stronger nesting; strengthening never follows from weakening."
        },
        {
          id: 'engmath-discrete-logic-q5',
          q: 'The negation of the statement forall x (P(x) -> Q(x)) is logically equivalent to:',
          options: ['exists x (P(x) -> ~Q(x))', 'exists x (P(x) AND ~Q(x))', 'forall x (~P(x) -> ~Q(x))', 'exists x (~P(x) AND Q(x))'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Push the negation inward step by step: ~forall x A(x) == exists x ~A(x). Then ~(P(x) -> Q(x)) == ~(~P(x) OR Q(x)) == P(x) AND ~Q(x). So the negation asserts a counterexample exists: some object with property P that lacks Q - exactly what it should mean to refute a universal claim. Option A is a trap: exists x (P(x) -> ~Q(x)) is satisfied by any object failing P (vacuous truth), so it is far too weak to be the negation. Options C and D negate the wrong parts. Always convert the implication to OR-form before applying De Morgan."
        },
        {
          id: 'engmath-discrete-logic-q6',
          q: 'Which of the following sets of connectives is NOT functionally complete?',
          options: ['{NAND}', '{NOR}', '{AND, OR}', '{NOT, AND}'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "{AND, OR} cannot express negation. Every formula built only from AND and OR is monotone: changing an input from false to true can never change the output from true to false. Since NOT is not monotone, it is inexpressible, so the set is incomplete. NAND alone is complete: NOT p = p NAND p, and p AND q = NOT(p NAND q); similarly NOR alone is complete - these two are the only single connectives among the standard binary ones that are complete by themselves. {NOT, AND} is complete because OR comes from De Morgan: p OR q = NOT(NOT p AND NOT q). GATE has repeatedly tested the monotonicity argument for why {AND, OR} fails."
        },
        {
          id: 'engmath-discrete-logic-q7',
          q: 'Consider the argument: "If the server is overloaded, response time is high. Response time is high. Therefore the server is overloaded." This argument is:',
          options: ['Valid, by modus ponens', 'Valid, by modus tollens', 'Invalid, it affirms the consequent', 'Invalid, it denies the antecedent'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "The premises are p -> q and q; the conclusion is p. This is the fallacy of affirming the consequent. Counterexample assignment: p false, q true makes both premises true (false antecedent gives a true implication) while the conclusion is false, so the argument form is invalid. Intuitively, high response time could have other causes (network congestion, slow disk). Modus ponens would need premise p, not q; modus tollens would need ~q and conclude ~p. Denying the antecedent is the different fallacy p -> q, ~p, therefore ~q. GATE frequently dresses these four forms in system or real-life language - always extract the bare form first."
        },
        {
          id: 'engmath-discrete-logic-q8',
          q: 'Let S(x) mean x is a student, H(x) mean x is hardworking, and Pa(x) mean x passes. The best FOL translation of "Every hardworking student passes" is:',
          options: ['forall x ((S(x) AND H(x)) -> Pa(x))', 'forall x (S(x) AND H(x) AND Pa(x))', 'forall x (S(x) -> (H(x) AND Pa(x)))', 'exists x ((S(x) AND H(x)) -> Pa(x))'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "The statement restricts attention to objects that are both students and hardworking, and asserts passing only for them - so the restriction goes in the antecedent of an implication under a universal quantifier. Option B absurdly claims every object in the universe is a hardworking, passing student. Option C says every student is hardworking and passes, which adds a claim (all students are hardworking) that the original never made. Option D with exists is almost vacuous: one lazy non-student makes the implication true. The recurring GATE rule: universal quantifier pairs with ->, and properties limiting the population being talked about belong on the left of that arrow, joined by AND."
        },
        {
          id: 'engmath-discrete-logic-q9',
          q: 'The formula (p -> q) AND (q -> p) is:',
          options: ['A tautology', 'A contradiction', 'A contingency that is satisfiable', 'Unsatisfiable but not a contradiction'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "The formula is exactly p <-> q. When p and q have the same truth value it is true (so it is satisfiable, e.g. p = q = true); when they differ it is false (so it is not a tautology). A formula that is true under some assignments and false under others is a contingency. Option D is self-contradictory terminology: unsatisfiable and contradiction mean the same thing - false under every assignment. The classification trio (tautology / contingency / contradiction) plus the notion of satisfiability is a staple 1-marker; remember that satisfiable only demands one good row of the truth table."
        },
        {
          id: 'engmath-discrete-logic-q10',
          q: 'How many distinct boolean functions of two variables exist?',
          options: ['4', '8', '16', '32'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "A boolean function of two variables is determined by its output on each of the 2^2 = 4 input rows of the truth table. Each row independently outputs true or false, giving 2^4 = 16 functions. The general formula is 2^(2^n) for n variables - a double exponential, which is why the number explodes: 256 functions for three variables. Option A counts the input rows, option B computes 2^3 as if there were three rows, and option D overcounts. This count is the foundation of the functional completeness idea: a complete connective set must generate all 16 two-variable functions (and all functions of any arity)."
        },
        {
          id: 'engmath-discrete-logic-q11',
          q: 'Consider F: exists x (P(x) -> forall y P(y)) over any non-empty domain. Which statement is correct?',
          options: ['F is valid (true in every interpretation)', 'F is satisfiable but not valid', 'F is unsatisfiable', 'F is true only when P holds for all elements'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "This is the famous drinker principle. Case 1: P holds for every element of the domain. Then forall y P(y) is true, so the implication is true for any witness x. Case 2: P fails for some element c. Choose x = c; then P(c) is false, and a false antecedent makes P(c) -> forall y P(y) true. Either way a witness exists, so F is true in every non-empty interpretation - valid. The result feels paradoxical (there is someone such that if they drink, everyone drinks) because natural language reads the implication causally; classical logic reads it truth-functionally. Option D describes only Case 1 and misses the vacuous-truth escape in Case 2."
        },
        {
          id: 'engmath-discrete-logic-q12',
          q: 'Which formula is logically equivalent to ~(p -> q)?',
          options: ['~p -> ~q', 'p AND ~q', '~p AND q', 'p OR ~q'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Rewrite p -> q as ~p OR q, then negate using De Morgan: ~(~p OR q) == p AND ~q. This matches the semantic definition: an implication is false in exactly one situation - true antecedent, false consequent - so its negation asserts precisely that situation. Option A is the inverse of the implication, not its negation (it is still an implication, true in three of four rows). Option C negates the wrong operand. Option D is the negation of ~p AND q, i.e. of a different formula. Knowing that the negation of an implication is a conjunction (never another implication) instantly eliminates options A and D in the exam."
        },
        {
          id: 'engmath-discrete-logic-q13',
          q: 'Over the domain of natural numbers N = {0, 1, 2, ...} with the usual order, which formula is TRUE?',
          options: ['exists y forall x (x <= y)', 'forall x exists y (y < x)', 'forall x exists y (x < y)', 'exists x forall y (y < x)'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Option C says every natural number has a strictly larger one - true, take y = x + 1; the naturals are unbounded above. Option A claims a maximum natural number exists - false, for any candidate y the number y + 1 exceeds it. Option B claims every natural number has a strictly smaller one - false at x = 0, which has nothing below it in N. Option D claims some x strictly exceeds every y including itself - impossible since x < x fails. The technique GATE expects: evaluate each quantified formula against the concrete structure, checking boundary elements (here 0) first, because boundary elements are where universal claims usually break."
        },
        {
          id: 'engmath-discrete-logic-q14',
          q: 'Which equivalence involving quantifiers is CORRECT?',
          options: ['forall x (P(x) OR Q(x)) == (forall x P(x)) OR (forall x Q(x))', 'exists x (P(x) AND Q(x)) == (exists x P(x)) AND (exists x Q(x))', 'forall x (P(x) AND Q(x)) == (forall x P(x)) AND (forall x Q(x))', 'exists x forall y R(x,y) == forall y exists x R(x,y)'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Universal quantification distributes over conjunction in both directions: everything has both properties if and only if everything has the first and everything has the second - option C is a genuine equivalence. Option A fails right to left is fine but left to right breaks: with P = even, Q = odd over integers, every number is even or odd, yet neither all-even nor all-odd holds. Option B fails left to right is fine but right to left breaks: someone is rich and someone is poor does not give one person who is both. Option D: the left side (one x works for all y) strictly implies the right, never the reverse. Remember the mnemonic: forall loves AND, exists loves OR; cross-pairings only give one-way implications."
        },
        {
          id: 'engmath-discrete-logic-q15',
          q: 'The statement "You can access the lab only if you are enrolled" translates to (A = access, E = enrolled):',
          options: ['E -> A', 'A -> E', 'A <-> E', '~A -> ~E'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "The phrase p only if q asserts that q is a necessary condition for p: whenever p happens, q must hold. So access only if enrolled means A -> E. Option A (E -> A) is the reading if enrolled then access - that would be the translation of you can access if you are enrolled, a sufficiency claim the sentence does not make (enrolled students might still be denied for other reasons). Option C claims both directions. Option D is the inverse of the correct answer, not equivalent to it (the contrapositive ~E -> ~A would be equivalent). The only-if construction is one of the most repeated GATE traps; drill it as: p only if q == p -> q == if not q then not p."
        },
        {
          id: 'engmath-discrete-logic-q16',
          q: 'How many of the following are tautologies? (i) p OR ~p, (ii) (p -> q) OR (q -> p), (iii) p -> (q -> p), (iv) (p AND q) -> (p OR q)',
          options: ['1', '2', '3', '4'],
          answer: 3,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "All four are tautologies. (i) is the law of excluded middle. (ii): try to falsify - both disjuncts false needs p true, q false (for the first) and q true, p false (for the second) simultaneously: impossible, so it is always true; this surprises many students since it holds even when p and q are unrelated. (iii): to falsify we need p true and q -> p false, i.e. q true and p false - contradicts p true; so it is a tautology (a form of the paradox of material implication). (iv): if p AND q is true then p is true, so p OR q is true; when the antecedent is false the implication is vacuously true. The exam-day skill here is systematic falsification, not full truth tables - each check takes about ten seconds."
        }
      ]
    },
    {
      id: 'engmath-sets-relations',
      name: 'Sets, Relations, Functions & Lattices',
      theory: {
        intro: "Sets, relations and functions are the vocabulary in which every other CS topic is written - databases are relations, hashing is a function question, program analysis lives on partial orders and lattices. GATE draws 2-4 marks a year from here, favouring counting questions (how many relations/functions of a given kind exist on an n-element set), property checking (is this relation an equivalence? a partial order?), and Hasse-diagram/lattice reasoning. The definitions are short but the questions punish fuzzy recall: reflexive vs irreflexive, symmetric vs antisymmetric (which are NOT opposites), and the exact requirements for a lattice. Almost every question type has appeared repeatedly across three decades of papers, so the pattern inventory is small and completely learnable. If you internalize the counting formulas and can draw a Hasse diagram in thirty seconds, this topic is a guaranteed scoring zone with essentially no surprises.",
        core: "• Sets: |P(A)| = 2^n for |A| = n; number of subsets of size k is C(n,k). Inclusion-exclusion: |A U B| = |A| + |B| - |A intersect B|. Cartesian product |A x B| = |A||B|.\n\n• A relation R on A is a subset of A x A. Number of relations on an n-set: 2^(n^2). Reflexive relations: 2^(n^2 - n) (diagonal forced in). Irreflexive: 2^(n^2 - n) (diagonal forced out). Symmetric: 2^(n(n+1)/2). Reflexive and symmetric: 2^(n(n-1)/2). Antisymmetric: 2^n * 3^(n(n-1)/2) (each diagonal pair free; each off-diagonal pair {(a,b),(b,a)} has 3 choices: neither, only one, only the other). Relations that are both symmetric and antisymmetric: subsets of the diagonal, 2^n of them.\n\n• Properties: reflexive (all (a,a) in R); symmetric ((a,b) in R implies (b,a) in R); antisymmetric ((a,b) and (b,a) in R implies a = b); transitive ((a,b),(b,c) in R implies (a,c) in R). Symmetric and antisymmetric can hold together (any subset of the diagonal) - they are not opposites.\n\n• Equivalence relation = reflexive + symmetric + transitive; it partitions A into equivalence classes, and conversely every partition defines an equivalence relation. Number of equivalence relations on an n-set = Bell number B(n): B(1)=1, B(2)=2, B(3)=5, B(4)=15, B(5)=52.\n\n• Partial order = reflexive + antisymmetric + transitive; the pair (A, <=) is a poset. Hasse diagram: drop loops and transitive edges, draw larger elements higher. Elements a,b are comparable if a <= b or b <= a; a chain is a set of pairwise comparable elements, an antichain pairwise incomparable. A total (linear) order has all pairs comparable. Maximal element: nothing above it; greatest element: above everything (unique if it exists). Minimal/least dually.\n\n• Lattice: a poset where EVERY pair has a least upper bound (join, a v b) and a greatest lower bound (meet, a ^ b). Standard examples: (P(S), subset) with union/intersection; (divisors of n, divides) with lcm/gcd; (N, <=). A poset fails to be a lattice when some pair has no upper bound at all or has two incomparable minimal upper bounds. Bounded lattice: has global least (0) and greatest (1). Distributive lattice: a ^ (b v c) = (a ^ b) v (a ^ c); a lattice is distributive iff it contains neither the diamond M3 nor the pentagon N5 as a sublattice. Complemented: every element has a complement (meet 0, join 1). Boolean algebra = complemented + distributive lattice, e.g. (P(S), subset).\n\n• Functions f: A -> B, |A| = m, |B| = n. Total functions: n^m. Injections (one-one): n!/(n-m)! = P(n,m), requires m <= n. Surjections (onto): sum over inclusion-exclusion = sum_{i=0}^{n} (-1)^i C(n,i) (n-i)^m; onto a 2-element set: 2^m - 2. Bijections on an n-set: n!. f has an inverse iff it is a bijection. Composition: (g o f)(x) = g(f(x)); composition of injections is injective, of surjections surjective.\n\n• Cardinality facts: N, Z, Q are countable; R and P(N) are uncountable (Cantor diagonalization); the set of all functions from N to {0,1} is uncountable, but the set of finite strings over a finite alphabet is countable.",
        strategy: "Counting questions dominate, so front-load the formula table: 2^(n^2) relations, 2^(n^2-n) reflexive, 2^(n(n+1)/2) symmetric, 2^n 3^(n(n-1)/2) antisymmetric, Bell numbers 1, 2, 5, 15, 52 for equivalence relations, n^m functions, 2^m - 2 onto a two-element codomain. Derive, do not memorize blindly: every formula comes from deciding each cell of the relation matrix independently - diagonal cells vs off-diagonal pairs. If a formula slips your mind in the hall, rebuild it from the matrix picture in twenty seconds.\n\nFor property-checking, test small: a claimed equivalence or order usually breaks on a specific pair - hunt for the counterexample instead of verifying all three properties abstractly. Remember transitivity is the property most often violated and least often checked by students.\n\nMini-example: is R = {(a,b) : a - b is an integer} on the reals an equivalence? Reflexive: a - a = 0, yes. Symmetric: if a - b is an integer so is b - a. Transitive: (a-b) + (b-c) = a - c, sum of integers. Yes - and its classes are the sets x + Z.\n\nFor lattice questions, draw the Hasse diagram immediately and check the suspicious pair - usually two incomparable elements near the top or bottom. Two incomparable upper bounds with neither below the other means no least upper bound, hence not a lattice. For distributivity, scan for M3 (diamond) or N5 (pentagon) sublattices rather than testing the identity on triples."
      },
      questions: [
        {
          id: 'engmath-sets-relations-q1',
          q: 'How many distinct binary relations can be defined on a set with 3 elements?',
          options: ['9', '64', '512', '81'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "A binary relation on A is any subset of A x A. With |A| = 3, the product A x A has 3 x 3 = 9 ordered pairs, and each pair is independently in or out of the relation, giving 2^9 = 512 relations. Option A counts the pairs themselves, not the subsets. Option B is 2^6, which would be the count of reflexive relations (2^(9-3) = 64) - a subtle trap since that formula is also standard. Option D is 3^4, a distractor with no meaning here. The picture to carry: a relation is a 3x3 boolean matrix, and you are counting matrices."
        },
        {
          id: 'engmath-sets-relations-q2',
          q: 'The number of reflexive relations on a set of size n is:',
          options: ['2^(n^2)', '2^(n^2 - n)', '2^(n(n+1)/2)', '2^(n(n-1))'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Reflexivity forces all n diagonal pairs (a,a) into the relation - no choice there. The remaining n^2 - n off-diagonal cells of the relation matrix are each freely in or out, giving 2^(n^2 - n). Option A counts all relations (no constraint). Option C is the count of symmetric relations, where you choose freely on the diagonal (n cells) and on each unordered off-diagonal pair (n(n-1)/2 of them), totalling 2^(n(n+1)/2). Option D undercounts. The unified method: identify which matrix cells are forced, which are free, and which are tied together, then raise 2 (or 3, for antisymmetric off-diagonal pairs) to the number of free choices."
        },
        {
          id: 'engmath-sets-relations-q3',
          q: 'How many equivalence relations exist on the set {1, 2, 3}?',
          options: ['3', '5', '8', '9'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Equivalence relations on a set correspond bijectively to partitions of that set. Partitions of {1,2,3}: one block {123}; three ways to split into a pair and a singleton ({12}{3}, {13}{2}, {23}{1}); and all singletons {1}{2}{3}. That is 1 + 3 + 1 = 5, the Bell number B(3). Option C (8) typically comes from counting subsets of something, and option D (9) from |A x A|. The partition correspondence is the key idea - never try to count reflexive-symmetric-transitive subsets directly. Worth memorizing: B(1) = 1, B(2) = 2, B(3) = 5, B(4) = 15, B(5) = 52, since GATE has asked the n = 4 version too."
        },
        {
          id: 'engmath-sets-relations-q4',
          q: 'A relation R on a set A is both symmetric and antisymmetric. Which of the following must be true?',
          options: ['R is empty', 'R is a subset of the diagonal {(a,a) : a in A}', 'R equals A x A', 'No such R exists'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Suppose (a,b) is in R with a != b. Symmetry forces (b,a) into R; antisymmetry applied to the pair (a,b), (b,a) forces a = b - contradiction. So R can contain only diagonal pairs (a,a), and any subset of the diagonal (including the empty relation and the full diagonal) does satisfy both properties vacuously. Hence exactly the 2^n subsets of the diagonal qualify. Option A is too strong (the diagonal itself works), option C fails antisymmetry for |A| > 1, and option D is the popular misconception that symmetric and antisymmetric are mutually exclusive opposites. They are independent properties; equality (the diagonal relation) famously has both."
        },
        {
          id: 'engmath-sets-relations-q5',
          q: 'Let f: A -> B with |A| = 4 and |B| = 3. The number of onto (surjective) functions from A to B is:',
          options: ['36', '81', '24', '60'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "By inclusion-exclusion on the missed elements of B: total functions 3^4 = 81; subtract those missing at least one target: C(3,1) * 2^4 = 48; add back those missing two: C(3,2) * 1^4 = 3. So 81 - 48 + 3 = 36. Option B forgets the correction entirely (that counts all functions). Option C is 4!, the bijection count for equal-size sets, which does not apply since |A| != |B|. Option D is a partial computation. Alternative check: choose which two of the four domain elements share an image (C(4,2) = 6 ways to pick the doubled pair... more precisely, partition 4 elements into 3 non-empty blocks: S(4,3) = 6, then assign blocks to B in 3! = 6 ways: 6 x 6 = 36). Two independent methods agreeing is your exam-hall verification."
        },
        {
          id: 'engmath-sets-relations-q6',
          q: 'Consider the poset ({1, 2, 3, 4, 6, 12}, divides). Which statement is TRUE?',
          options: ['It is a lattice with greatest element 12 and least element 1', 'It is not a lattice because 4 and 6 have no common upper bound', 'It has two maximal elements', 'It is a total order'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "These are exactly the divisors of 12 ordered by divisibility. For any two divisors of 12, gcd is the meet and lcm is the join, and both are again divisors of 12 - e.g. for 4 and 6: gcd = 2, lcm = 12, both present. So every pair has meet and join: it is a lattice. 1 divides everything (least element) and everything divides 12 (greatest element). Option B is false since lcm(4,6) = 12 lies in the set. Option C is false: 12 is the unique maximal (indeed greatest) element. Option D fails because 4 and 6 are incomparable (neither divides the other), as are 3 and 4. Divisor posets of a single number n are always lattices - remember this as a stock fact."
        },
        {
          id: 'engmath-sets-relations-q7',
          q: 'Consider the poset on {a, b, c, d} where a < c, a < d, b < c, b < d, and a,b are incomparable, c,d are incomparable. This poset is:',
          options: ['A lattice', 'Not a lattice, because {a, b} has no least upper bound', 'Not a lattice, because {c, d} has no lower bound', 'A total order'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "The upper bounds of the pair {a, b} are c and d (both are above both a and b). A least upper bound must be an upper bound below every other upper bound - but c and d are incomparable, so neither is least. Hence join(a,b) does not exist and the poset is not a lattice. Symmetrically, {c, d} has lower bounds a and b with no greatest one, so the meet fails too - but option C misstates this: {c,d} does have lower bounds, it lacks a GREATEST lower bound. Precision matters: the lub/glb must exist AND be unique-least/greatest; mere existence of upper/lower bounds is not enough. This four-element crown is the canonical smallest non-lattice and appears in GATE options frequently."
        },
        {
          id: 'engmath-sets-relations-q8',
          q: 'If |A| = m and |B| = n with m <= n, the number of one-to-one (injective) functions from A to B is:',
          options: ['n^m', 'm^n', 'n! / (n - m)!', 'C(n, m)'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Build the injection element by element: the first element of A has n choices of image, the second has n - 1 (images must be distinct), down to n - m + 1 for the last. The product n(n-1)...(n-m+1) = n!/(n-m)! = P(n,m). Option A counts all functions (repetition of images allowed). Option B reverses the roles of domain and codomain - a very common slip; anchor the rule as (codomain size)^(domain size) for all functions. Option D counts only the choice of the image SET, ignoring which element maps where; multiplying C(n,m) by m! recovers the right answer, which is a good sanity check of the formula."
        },
        {
          id: 'engmath-sets-relations-q9',
          q: 'How many relations on a set of size 3 are both reflexive and symmetric?',
          options: ['8', '64', '512', '32'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Reflexivity fixes the 3 diagonal cells to be present. Symmetry ties each off-diagonal cell (a,b) to its mirror (b,a), so the 6 off-diagonal cells collapse into 3 independent unordered pairs, each either fully in or fully out. Free choices: 3 pairs, giving 2^3 = 8. The general formula is 2^(n(n-1)/2). Option B (2^6) is reflexive-only counting; option C (2^9) is all relations; option D (2^5) miscounts the free cells. The method - partition the matrix cells into forced cells and independent choice-groups - solves every variant GATE throws: reflexive, irreflexive, symmetric, antisymmetric, and their combinations, without memorizing separate formulas."
        },
        {
          id: 'engmath-sets-relations-q10',
          q: 'Let R = {(1,2), (2,3)} on the set {1, 2, 3}. The minimum number of ordered pairs that must be added to make R an equivalence relation is:',
          options: ['5', '6', '7', '4'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Reflexivity needs (1,1), (2,2), (3,3): 3 pairs. Symmetry needs (2,1) and (3,2): 2 pairs. Transitivity: (1,2) and (2,3) force (1,3); then symmetry forces (3,1): 2 more pairs. Now check closure: with 1~2, 2~3, 1~3 and all reflexive/symmetric pairs, the relation is all of {1,2,3} x {1,2,3}, which has 9 pairs. We started with 2, so we added 9 - 2 = 7. The trap is stopping after the first round of additions - each new pair can trigger further transitive requirements, so you must iterate until closure. Here the single equivalence class swallows everything, which is typical when the initial pairs chain all elements together."
        },
        {
          id: 'engmath-sets-relations-q11',
          q: 'Which of the following is an uncountable set?',
          options: ['The set of all finite-length binary strings', 'The set of rational numbers', 'The set of all functions from N to {0, 1}', 'The set of all ordered pairs of natural numbers'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "A function from N to {0,1} is an infinite binary sequence, and the set of these corresponds to P(N), which Cantor's diagonal argument shows is uncountable: given any claimed enumeration f1, f2, ..., define g(n) = 1 - fn(n); g differs from every fi, so no enumeration is complete. Option A is countable: list strings by length, then lexicographically - crucially each string is FINITE (this is why the set of C programs, or of Turing machines, is countable). Option B: rationals are countable by the classic zigzag over p/q. Option D: N x N is countable via pairing (diagonal enumeration). The countable-programs versus uncountable-functions contrast is exactly why non-computable functions exist - a favourite GATE angle."
        },
        {
          id: 'engmath-sets-relations-q12',
          q: 'In a lattice (L, <=), which identity is ALWAYS true (for all elements a, b)?',
          options: ['a v (b ^ c) = (a v b) ^ (a v c)', 'a ^ (a v b) = a', 'Every element has a complement', 'a v b = a implies a <= b'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Option B is the absorption law, which holds in every lattice: a v b is above a, and the meet of a with anything above it is a itself. Absorption (together with its dual a v (a ^ b) = a) is part of the algebraic definition of a lattice. Option A is distributivity, which fails in general - the diamond M3 and pentagon N5 are lattices violating it. Option C requires a complemented lattice, an extra assumption (needs bounds 0 and 1 first, and even bounded lattices may lack complements, e.g. a chain of 3 elements). Option D reverses the order: a v b = a means b <= a, since the join equals the larger element. Keep the hierarchy straight: lattice, then bounded, then distributive/complemented, then Boolean algebra - each adds axioms."
        },
        {
          id: 'engmath-sets-relations-q13',
          q: 'The number of functions from a set of size 5 onto a set of size 2 is:',
          options: ['32', '30', '25', '10'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "Total functions from a 5-set to a 2-set: 2^5 = 32. A function fails to be onto exactly when it misses one of the two targets, i.e. it is constant - and there are exactly 2 constant functions (all-to-first, all-to-second). So onto functions number 32 - 2 = 30. The general shortcut: onto a 2-element codomain is always 2^m - 2. Option A forgets to remove the constants; option C is 5^2, the reversed-exponent error; option D is C(5,2), which counts subsets, not functions. For codomains of size 3 or more you need full inclusion-exclusion, but the size-2 case is worth knowing cold because it doubles as the count of ways to split a set into two labelled non-empty parts."
        },
        {
          id: 'engmath-sets-relations-q14',
          q: 'A partial order relation must be:',
          options: ['Reflexive, symmetric, transitive', 'Reflexive, antisymmetric, transitive', 'Irreflexive, antisymmetric, transitive', 'Reflexive, antisymmetric, not transitive'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "A partial order abstracts relations like <=, divides, and subset-of: every element relates to itself (reflexive), no two distinct elements relate both ways (antisymmetric), and chains compose (transitive). Option A defines an equivalence relation - the other pillar triple, used for partitioning rather than ordering; symmetry is exactly what an order must NOT generally have. Option C describes a STRICT partial order (like <), a valid related concept but not what partial order means by default in GATE. Option D is nonsense - transitivity is essential. A crisp way to keep the two triples separate: equivalence groups things as equal (symmetric), order ranks things (antisymmetric); both share reflexive and transitive."
        },
        {
          id: 'engmath-sets-relations-q15',
          q: 'Consider the poset (P({a, b, c}), subset-of). How many elements does its longest chain contain?',
          options: ['3', '4', '8', '6'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "A chain is a set of pairwise comparable elements - here, a sequence of subsets each contained in the next. The longest possible starts at the empty set and adds one element at a time: {} subset {a} subset {a,b} subset {a,b,c}. That is 4 subsets (sizes 0, 1, 2, 3), so the longest chain has 4 elements. In general, P(S) with |S| = n has longest chains of n + 1 elements. Option A counts only the proper steps (edges of the chain) or forgets the empty set - the classic off-by-one. Option C is the total number of subsets, and option D is unrelated. Companion fact worth knowing: the largest ANTICHAIN in P({a,b,c}) has C(3,1) = 3 elements (all singletons or all pairs), by Sperner's theorem - GATE has touched both chain and antichain versions."
        },
        {
          id: 'engmath-sets-relations-q16',
          q: 'Let f(x) = x^2 from Z (integers) to Z. Which of the following is TRUE?',
          options: ['f is injective but not surjective', 'f is surjective but not injective', 'f is a bijection', 'f is neither injective nor surjective'],
          answer: 3,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Injective fails: f(2) = f(-2) = 4, two distinct inputs with the same output. Surjective fails: negative integers such as -1 are never hit (squares are non-negative), and even 2 or 3 are missed since they are not perfect squares. So f is neither. The lesson GATE tests here is that injectivity and surjectivity depend on the declared domain and codomain, not just the formula: the same rule x^2 from non-negative reals to non-negative reals is a bijection, and from Z to non-negative integers it becomes surjective onto squares only if the codomain is exactly the set of perfect squares. Always ask: what is the domain, what is the codomain, before classifying."
        }
      ]
    }
,
    {
      id: 'engmath-groups',
      name: 'Monoids & Groups',
      theory: {
        intro: "Group theory formalizes symmetry and reversible operations - the mathematics behind modular arithmetic, cryptography (RSA, Diffie-Hellman), error-correcting codes and hashing. In GATE it is a compact, low-syllabus topic worth 1-2 marks in most years: you are tested on checking whether a structure is a group, orders of elements and subgroups (Lagrange's theorem), cyclic groups and their generators, and small classification facts like the smallest non-abelian group. Because the syllabus stops at groups (rings and fields are excluded), the question pool is narrow and highly repetitive across decades of papers. Students lose marks here only through definitional fuzziness - forgetting that a monoid needs no inverses, or that closure must be checked before anything else. An afternoon of focused practice makes this the best marks-per-hour topic in the entire mathematics section.",
        core: "• Binary operation * on S: a function S x S -> S. Closure is built into this definition - always verify it first.\n\n• Hierarchy of structures: Semigroup = closure + associativity. Monoid = semigroup + identity element e (a*e = e*a = a). Group = monoid + every element has an inverse (a*a' = a'*a = e). Abelian group = group + commutativity.\n\n• Examples to know cold: (Z, +) group; (N, +) monoid, not group (no negatives); (Z, x) monoid, not group (no inverse for 2); (R - {0}, x) abelian group; (Zn, + mod n) group; (set of n x n invertible matrices, x) non-abelian group; strings under concatenation form a monoid with identity = empty string.\n\n• Uniqueness facts: identity is unique; inverses are unique; cancellation holds in groups (a*b = a*c implies b = c); each row and column of a group's Cayley table is a permutation of the elements (Latin square property).\n\n• Shoe-sock rule: (a*b)^(-1) = b^(-1) * a^(-1). Also (a^(-1))^(-1) = a.\n\n• Order of a group |G| = number of elements. Order of an element a = smallest positive k with a^k = e. The order of every element divides |G|.\n\n• Lagrange's theorem: the order of any subgroup H of a finite group G divides |G|. Consequences: a group of prime order p has no proper non-trivial subgroups, is cyclic, and is abelian - generated by any non-identity element. The converse of Lagrange is FALSE in general (a divisor of |G| need not correspond to a subgroup), though it holds for cyclic groups.\n\n• Subgroup test: non-empty H is a subgroup iff for all a, b in H, a*b^(-1) is in H. For finite H, closure alone suffices.\n\n• Cyclic groups: G = <a> generated by one element. Every cyclic group is abelian (but not conversely - the Klein four-group is abelian, not cyclic). (Zn, +) is cyclic; its generators are exactly the k with gcd(k, n) = 1, so it has phi(n) generators (Euler totient). Every subgroup of a cyclic group is cyclic, and a cyclic group of order n has exactly one subgroup of each order dividing n.\n\n• Special results GATE reuses: an element with a*a = a (idempotent) in a group must be the identity. If every element satisfies a^2 = e, the group is abelian. The smallest non-abelian group is S3 (the six permutations of three objects), of order 6; every group of order at most 5 is abelian. The number of elements of order 2 in Zn under addition: exactly one (namely n/2) when n is even, none when n is odd.\n\n• Order of element k in (Zn, +) is n / gcd(n, k) - a formula that turns many 2-mark questions into ten-second lookups.",
        strategy: "Structure-checking questions have a fixed drill order: closure first, then associativity, then hunt for the identity, then inverses. Most fake groups die at closure or at some element with no inverse - check the suspicious element the question is built around (0 for multiplication, 1 for operations like a + b - ab). Mini-example: a*b = a + b - ab on R. Identity: a*e = a gives e - ae = 0, so e = 0. Inverse of a: a + b - ab = 0 gives b = a/(a - 1), undefined at a = 1 - so R fails but R - {1} works. That single problematic element is the whole question.\n\nFor order and subgroup questions, reach for Lagrange immediately: element orders and subgroup orders must divide |G|, which usually eliminates two options instantly. For (Zn, +), use order of k = n/gcd(n,k) and generators = phi(n) rather than brute-force cycling.\n\nKnow the tiny-group landscape: orders 1, 2, 3, 5 (primes) force cyclic; order 4 gives Z4 or Klein four (both abelian); order 6 is the first chance for non-abelian (S3). Any question asking for the smallest non-abelian group, or whether a group of prime order can be non-cyclic, is answered from this map with zero computation.\n\nTrap list: converse of Lagrange is false; abelian does not imply cyclic; a monoid question answered with group axioms; and (a*b)^(-1) expanded in the wrong order - always reverse."
      },
      questions: [
        {
          id: 'engmath-groups-q1',
          q: 'Which of the following algebraic structures is a group?',
          options: ['(N, +) where N includes 0', '(Z, x)', '(Z, +)', '(R, x)'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "(Z, +) satisfies all four axioms: closed under addition, associative, identity 0, and every integer n has inverse -n. (N, +) is only a monoid: it has identity 0 but no element other than 0 has an inverse (there is no natural number x with 3 + x = 0). (Z, x) is also just a monoid: identity 1 exists, but 2 has no integer multiplicative inverse. (R, x) fails because of the single element 0, which has no inverse; removing it gives the group (R - {0}, x). The exam pattern: the offending structure almost always fails on exactly one element - find it rather than testing axioms abstractly."
        },
        {
          id: 'engmath-groups-q2',
          q: 'The number of generators of the cyclic group (Z12, + mod 12) is:',
          options: ['2', '4', '6', '12'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "An element k generates (Zn, +) exactly when gcd(k, n) = 1, so the generator count is Euler's totient phi(n). Here phi(12) = phi(4)phi(3) = 2 x 2 = 4, the generators being 1, 5, 7, 11. Check one: successive multiples of 5 mod 12 are 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 0 - all twelve elements. Why not 2 or 3? gcd(2,12) = 2, so 2 only reaches the even residues (a subgroup of order 6). Option C (6) is the count of units some students misremember, and option D assumes every non-zero element generates, which is true only when n is prime. Formula to keep: order of k in Zn is n/gcd(n,k); k is a generator iff that order is n."
        },
        {
          id: 'engmath-groups-q3',
          q: 'Let G be a finite group with |G| = 12. Which of the following CANNOT be the order of a subgroup of G?',
          options: ['1', '6', '8', '12'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Lagrange's theorem states the order of any subgroup must divide the order of the group. Divisors of 12 are 1, 2, 3, 4, 6, 12; since 8 does not divide 12, no subgroup of order 8 can exist - full stop, regardless of what G actually is. Order 1 (trivial subgroup) and order 12 (G itself) always exist. Order 6 is permitted by Lagrange, though whether it actually occurs depends on the specific group - which highlights the subtlety GATE loves: Lagrange forbids non-divisors but does not guarantee subgroups for every divisor (its converse is false in general, with the classic counterexample A4 of order 12 having no subgroup of order 6)."
        },
        {
          id: 'engmath-groups-q4',
          q: 'The order of the element 4 in the group (Z6, + mod 6) is:',
          options: ['2', '3', '4', '6'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "The order of a is the smallest positive k with k copies of a summing to the identity 0. Compute: 4; 4+4 = 8 mod 6 = 2; 4+4+4 = 12 mod 6 = 0. So the order is 3. The shortcut formula: order of k in Zn equals n/gcd(n, k) = 6/gcd(6,4) = 6/2 = 3, confirming the direct computation. Note the consistency check with Lagrange: 3 divides 6, as every element order must. Option A would be the order of 3 (since 3+3 = 6 = 0), and option D would require gcd(4,6) = 1, i.e. 4 being a generator, which it is not. When n is small, compute directly; when n is large, the gcd formula is the only sane route."
        },
        {
          id: 'engmath-groups-q5',
          q: 'In a group (G, *), an element a satisfies a * a = a. Then:',
          options: ['a must be the identity element', 'a must be its own inverse', 'G must be abelian', 'Such an element cannot exist in any group'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Multiply both sides of a*a = a on the left by a^(-1): a^(-1)*a*a = a^(-1)*a, giving e*a = e, so a = e. This is the cancellation property in action - the defining power of groups that monoids lack (in a monoid, other idempotents can exist, e.g. any projection matrix under multiplication, or 0 in (Z, x)). Option B describes elements with a*a = e, a different equation whose solutions include the identity and possibly others. Option C draws a global conclusion from a local fact - unjustified. Option D is wrong because the identity itself always satisfies e*e = e. The takeaway: in a group the ONLY idempotent is e, and the one-line cancellation proof is itself exam material."
        },
        {
          id: 'engmath-groups-q6',
          q: 'Define a * b = a + b - ab on a subset of the real numbers. For this operation to form a group, which element must be EXCLUDED from R?',
          options: ['0', '1', '-1', 'No exclusion is needed'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "First find the identity: a * e = a + e - ae = a forces e(1 - a) = 0 for all a, so e = 0. Now solve for the inverse b of a: a + b - ab = 0 gives b(1 - a) = -a, so b = a/(a - 1) - undefined exactly when a = 1. Moreover 1 * b = 1 + b - b = 1 for every b, so 1 can never reach the identity 0: it genuinely has no inverse. Removing 1 fixes everything, and closure survives because a * b = 1 would require (1-a)(1-b) = 0, impossible when both a, b differ from 1. Option A wrongly excludes the identity itself. This operation (and its twin a + b + ab, which excludes -1) is a recurring GATE construction; the method - identity first, then the inverse formula, then the value that breaks it - transfers to every variant."
        },
        {
          id: 'engmath-groups-q7',
          q: 'The smallest order for which a non-abelian group exists is:',
          options: ['4', '5', '6', '8'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Groups of order 1, 2, 3, 5 are cyclic (prime order forces a single generator) hence abelian. Order 4 gives exactly two groups - Z4 and the Klein four-group - both abelian (the Klein group shows abelian does not imply cyclic). At order 6 the symmetric group S3, all permutations of three objects, is non-abelian: swapping elements 1,2 then rotating differs from rotating then swapping. So 6 is the smallest possible order, realized by S3 (equivalently the dihedral group of the triangle). Option D is tempting because the quaternion and dihedral groups of order 8 are famous non-abelian examples, but S3 beats them. This small-order classification is pure recall and appears repeatedly - memorize: everything below 6 is abelian."
        },
        {
          id: 'engmath-groups-q8',
          q: 'In any group, (a * b)^(-1) equals:',
          options: ['a^(-1) * b^(-1)', 'b^(-1) * a^(-1)', 'a * b', 'b * a'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Verify by direct multiplication: (a*b) * (b^(-1)*a^(-1)) = a * (b*b^(-1)) * a^(-1) = a * e * a^(-1) = e, and similarly on the left. Since inverses are unique, b^(-1)*a^(-1) is THE inverse. The mnemonic is the shoe-sock rule: you put on socks then shoes, but remove shoes then socks - undoing reverses order. Option A is correct only in abelian groups, and GATE deliberately offers it to catch students who assume commutativity; in a general group a^(-1)*b^(-1) is the inverse of b*a instead. Options C and D would make every product self-inverse, which fails in any group with an element of order greater than 2."
        },
        {
          id: 'engmath-groups-q9',
          q: 'If every element a of a group G satisfies a * a = e (identity), then G is:',
          options: ['Necessarily cyclic', 'Necessarily abelian', 'Necessarily of prime order', 'Necessarily infinite'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Every element is its own inverse: a^(-1) = a. For any a, b: a*b = (a*b)^(-1) = b^(-1)*a^(-1) = b*a. Hence G is abelian - a classic three-step proof worth reproducing from memory. Option A fails: the Klein four-group {e, a, b, ab} has every element self-inverse but is not cyclic (no element of order 4). Option C fails for the same example (order 4 is not prime). Option D fails since finite examples abound. Such groups are exactly the vector spaces over the field of two elements, so their orders are powers of 2 - a bonus fact occasionally probed. The chain used here - rewrite a product as an inverse, expand with the shoe-sock rule - is the standard trick for order-2 conditions."
        },
        {
          id: 'engmath-groups-q10',
          q: 'Which of the following is a subgroup of (Z, +)?',
          options: ['The set of odd integers', 'The set of non-negative integers', 'The set of multiples of 5', 'The set {-1, 0, 1}'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Multiples of 5 (written 5Z) pass the subgroup test: the difference of two multiples of 5 is a multiple of 5, the identity 0 = 5x0 belongs, and the inverse -5k is a multiple of 5. In fact EVERY subgroup of (Z, +) has the form nZ for some n - a structural fact worth knowing. Odd integers fail immediately: 1 + 1 = 2 is even (no closure) and 0 is missing (no identity). Non-negative integers contain 0 and are closed, but 3 has no inverse inside - this is a submonoid, not a subgroup. The set {-1, 0, 1} is not closed: 1 + 1 = 2 escapes. Each wrong option fails a different axiom, which is exactly how GATE builds this question type."
        },
        {
          id: 'engmath-groups-q11',
          q: 'How many elements of (Z10, + mod 10) have order exactly 2?',
          options: ['0', '1', '2', '5'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "An element x has order 2 when x + x = 0 mod 10 with x itself non-zero, i.e. 2x is a multiple of 10, i.e. x = 5 (x = 0 has order 1). So exactly one element, namely 5. Alternatively use the formula: order of k is 10/gcd(10, k) = 2 requires gcd(10, k) = 5, and the only k in 1..9 with gcd 5 is k = 5. General principle: a cyclic group of order n has exactly one subgroup of each order d dividing n, and the number of elements of order d is phi(d); here phi(2) = 1. Option D (5) miscounts by including all odd residues, and option A forgets that even-order cyclic groups always contain one involution - the half-way element n/2."
        },
        {
          id: 'engmath-groups-q12',
          q: 'The set of all strings over {a, b} (including the empty string) under concatenation forms:',
          options: ['A group', 'A monoid but not a group', 'A semigroup but not a monoid', 'Neither a semigroup nor a monoid'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Concatenation is closed (joining two strings gives a string) and associative ((xy)z = x(yz) as strings), and the empty string acts as a two-sided identity - so we have a monoid. It is not a group: a non-empty string has no inverse, since concatenating anything to it only makes it longer, never empty. This free monoid is the algebraic backbone of formal language theory, which is why GATE likes the question. Option C would apply if the empty string were excluded from the set - a variant the exam has also used, so read whether the empty string is included. Length is the invariant that kills inverses: |xy| = |x| + |y| can never drop back to 0."
        },
        {
          id: 'engmath-groups-q13',
          q: 'G is a group of prime order p. Which statement is FALSE?',
          options: ['G is cyclic', 'G is abelian', 'Every non-identity element of G is a generator', 'G has exactly p subgroups'],
          answer: 3,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "By Lagrange, any subgroup's order divides p, so it is 1 or p: G has exactly TWO subgroups - the trivial one and G itself - not p of them, making option D false. The other three are true and interlinked: take any non-identity element a; the cyclic subgroup <a> has order dividing p and exceeding 1, hence order p, so <a> = G. That simultaneously shows G is cyclic, every non-identity element generates (so there are p - 1 generators, matching phi(p) = p - 1), and cyclic implies abelian. Prime-order groups are thus completely rigid: up to renaming, the only one is (Zp, +). GATE phrases this fact many ways; recognizing the underlying Lagrange argument answers all of them."
        },
        {
          id: 'engmath-groups-q14',
          q: 'In a finite group, the Cayley (operation) table has the property that:',
          options: ['It is always symmetric about the main diagonal', 'Every row and every column contains each group element exactly once', 'The identity appears only on the main diagonal', 'All diagonal entries are the identity'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Fix a row labelled a: its entries are a*x as x ranges over G, and the map x -> a*x is a bijection (its inverse is left-multiplication by a^(-1)), so the row is a permutation of G - the Latin square property; columns work the same via right multiplication. This is really cancellation: a*x = a*y forces x = y, so no repeats fit in a row. Option A holds only for abelian groups (symmetry of the table IS commutativity - a useful reading skill). Option C fails whenever some a has a distinct inverse b, putting e at the off-diagonal cell (a,b). Option D would demand every element be self-inverse, true only in special groups like Klein's. The Latin square property is the fastest way to spot a fake group table in the exam."
        }
      ]
    },
    {
      id: 'engmath-graph-theory',
      name: 'Graph Theory',
      theory: {
        intro: "Graphs model every network CS touches - the internet, social graphs, dependency DAGs, register interference - and GATE mines the topic for 3-5 marks yearly. The recurring themes are strikingly stable across 1990-2025: the handshaking lemma and degree-sequence feasibility, Euler and Hamiltonian conditions, chromatic number, bipartiteness, planarity bounds, connectivity inequalities, trees, matchings, and counting questions (edges of Kn, spanning trees, labelled graphs). Questions reward knowing exact theorem statements - which conditions are necessary, which sufficient, which both. A student who confuses Euler (degree-based, clean characterization) with Hamiltonian (NP-hard, only sufficient conditions known) will donate marks; one who keeps the theorem inventory straight collects them in seconds. Nearly every hard question is a small counting argument or a counterexample hunt on a graph with at most six vertices, so practicing tiny examples pays enormously.",
        core: "• Handshaking lemma: sum of all degrees = 2|E|. Corollary: the number of odd-degree vertices is even. Any question giving a degree list starts here.\n\n• Complete graph Kn: n(n-1)/2 edges. Number of simple labelled graphs on n vertices: 2^(n(n-1)/2). A simple graph on n >= 2 vertices always has two vertices of equal degree (pigeonhole on possible degrees).\n\n• Trees: connected + acyclic; equivalent characterizations: connected with n-1 edges; acyclic with n-1 edges; unique path between every pair. Every tree with n >= 2 has at least two leaves. A forest with n vertices and k components has n - k edges. Cayley: Kn has n^(n-2) labelled spanning trees.\n\n• Euler: a connected graph has an Euler CIRCUIT iff every vertex has even degree; an Euler PATH (not circuit) iff exactly two vertices have odd degree. These are exact characterizations - checkable in linear time.\n\n• Hamiltonian: cycle visiting every vertex once. No known clean characterization (the decision problem is NP-complete). Sufficient conditions: Dirac (every degree >= n/2, n >= 3) and Ore (deg u + deg v >= n for every non-adjacent pair). These are NOT necessary - the cycle Cn is Hamiltonian with all degrees 2.\n\n• Bipartite graphs: 2-colorable iff no odd cycle. Km,n has mn edges; it is Hamiltonian iff m = n; complete bipartite Kn,n has n! perfect matchings. Any bipartite graph with parts of unequal size has no Hamiltonian cycle and no perfect matching.\n\n• Matching: a set of edges with no shared endpoint. Perfect matching covers all vertices (needs even n). Hall's theorem: a bipartite graph with parts X, Y has a matching saturating X iff every subset S of X has |N(S)| >= |S|. Konig: in bipartite graphs, max matching size = min vertex cover size.\n\n• Coloring: chromatic number chi(G) = minimum colors for a proper vertex coloring. chi(Kn) = n; chi of an even cycle = 2, odd cycle = 3; chi(G) >= clique number; chi(G) <= max degree + 1 always (greedy), and by Brooks theorem chi <= max degree except for complete graphs and odd cycles. Four-color theorem: planar graphs need at most 4. A graph is 2-colorable iff bipartite.\n\n• Planarity: Euler formula for connected planar graphs: n - e + f = 2. Bounds: e <= 3n - 6 (n >= 3); triangle-free planar: e <= 2n - 4. K5 (10 edges > 9) and K3,3 (9 edges > 8 by the bipartite bound) are non-planar; Kuratowski: a graph is planar iff it has no subdivision of K5 or K3,3. Every planar graph has a vertex of degree <= 5.\n\n• Connectivity: vertex connectivity kappa(G) <= edge connectivity lambda(G) <= minimum degree delta(G). A cut vertex disconnects on removal; a bridge is an edge whose removal disconnects. A connected graph with n vertices needs at least n - 1 edges; a simple graph with more than C(n-1, 2) edges is forced connected.\n\n• Complement: G and its complement partition the C(n,2) pairs; deg_G(v) + deg_comp(v) = n - 1. Self-complementary graphs (isomorphic to their complement) require n(n-1)/4 edges to be an integer, i.e. n congruent to 0 or 1 mod 4 (e.g. P4, C5).\n\n• Isomorphism invariants: vertex count, edge count, degree sequence, cycle lengths - equal degree sequences do NOT guarantee isomorphism.",
        strategy: "Open every degree-based question with the handshaking lemma: sum the degrees; if the sum is odd, the graph is impossible - an instant elimination that GATE builds whole questions around. For is-this-degree-sequence-graphical, run Havel-Hakimi: sort descending, delete the top value d, subtract 1 from the next d values, repeat; any negative means not graphical. Mini-example: (3,3,3,1) - delete 3, subtract from the next three: (2,2,0); delete 2, subtract from next two: (1,-1) - negative, so no simple graph exists.\n\nKeep the theorem-strength table in your head: Euler conditions are if-and-only-if (so you may conclude in both directions); Dirac and Ore are sufficient only (never conclude non-Hamiltonian from their failure); bipartite iff no odd cycle is again exact. Half of all trap options exploit exactly this asymmetry.\n\nFor planarity numericals, do not draw - compute: check e <= 3n - 6 first, and for triangle-free or bipartite graphs use e <= 2n - 4 (this stronger bound is what convicts K3,3). If the bound passes, the graph may still be non-planar - the bounds only prove NON-planarity.\n\nFor chromatic number, sandwich it: a clique of size k forces chi >= k, and an explicit coloring shows chi <= k; produce both and you are done. Remember odd cycles force 3.\n\nCounting favourites to pre-load: Kn has n(n-1)/2 edges, n^(n-2) spanning trees; 2^(C(n,2)) labelled graphs; Kn,n has n! perfect matchings. When stuck on an existence question, test the claim on C5, K4, K3,3 and the path P4 - these four graphs break most false statements."
      },
      questions: [
        {
          id: 'engmath-graph-theory-q1',
          q: 'A simple graph has degree sequence 1, 2, 2, 3, 4. How many edges does it have?',
          options: ['5', '6', '12', 'Cannot be determined'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "The handshaking lemma says the degrees sum to twice the edge count, because each edge contributes exactly 1 to the degree of each of its two endpoints. Sum = 1 + 2 + 2 + 3 + 4 = 12, so |E| = 12/2 = 6. Option C forgets to halve. Option D is a distractor: while several non-isomorphic graphs can share this degree sequence, they all necessarily have the same edge count - the lemma depends only on the sequence. Sanity check built into the lemma: the degree sum must always be even, equivalently the number of odd-degree vertices must be even (here 1 and 3 - two odd vertices, consistent). Any degree list with odd sum describes no graph at all."
        },
        {
          id: 'engmath-graph-theory-q2',
          q: 'The number of edges in the complete graph K8 is:',
          options: ['28', '56', '64', '36'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "Every pair of distinct vertices contributes exactly one edge, so |E| = C(8,2) = 8 x 7 / 2 = 28. Equivalently by handshaking: each of the 8 vertices has degree 7, and 8 x 7 / 2 = 28. Option B (56) is the classic forget-to-halve error - it counts ordered pairs, i.e. directed edges. Option C is 8^2, which would count ordered pairs including self-loops. Option D is C(9,2), an off-by-one slip. The formula n(n-1)/2 is used silently inside dozens of harder GATE problems (planarity bounds, complement arguments, labelled-graph counts), so it must be reflexive."
        },
        {
          id: 'engmath-graph-theory-q3',
          q: 'A connected graph G has an Euler circuit if and only if:',
          options: ['G has exactly two vertices of odd degree', 'Every vertex of G has even degree', 'G is Hamiltonian', 'G has an even number of edges'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Euler's theorem: a connected graph has a closed walk using every edge exactly once iff every vertex degree is even - each visit to a vertex consumes one entering and one leaving edge, so degrees must pair up. Option A is the condition for an Euler PATH that is not a circuit (start and end at the two odd vertices) - the most common confusion. Option C mixes up the two famous cycle notions: Hamiltonian concerns visiting every VERTEX once and has no known clean characterization; neither property implies the other (K4 is Hamiltonian but has all degrees 3, hence odd, so it is not Eulerian; two triangles sharing a single vertex form a graph with all even degrees that is Eulerian yet not Hamiltonian, since a Hamiltonian cycle would have to pass through the shared cut vertex twice). Option D is irrelevant: C5 has 5 edges, all degrees even, and is Eulerian."
        },
        {
          id: 'engmath-graph-theory-q4',
          q: 'The chromatic number of a cycle with 7 vertices (C7) is:',
          options: ['2', '3', '4', '7'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Try 2 colors around the cycle: alternating colors works only if the cycle length is even; with 7 vertices, the alternation returns to the start with a conflict - the last vertex neighbours two vertices of different colors only if... walk it: v1=A, v2=B, ..., v6=B, v7=A, but v7 is adjacent to v1=A. Clash. So 2 is impossible - in fact a graph is 2-colorable iff bipartite iff it has no odd cycle, and C7 is itself an odd cycle. Three colors suffice: alternate A, B around the cycle and give the last vertex C. Hence chi = 3. General rule to memorize: even cycles have chromatic number 2, odd cycles 3, and Kn needs n. Option D confuses chromatic number with vertex count."
        },
        {
          id: 'engmath-graph-theory-q5',
          q: 'Which degree sequence CANNOT be realized by any simple graph?',
          options: ['(2, 2, 2, 2)', '(3, 3, 2, 2, 2)', '(3, 3, 3, 1)', '(1, 1, 1, 1)'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Apply Havel-Hakimi to (3,3,3,1): remove the first 3 and subtract 1 from the next three entries: (2, 2, 0). Remove 2, subtract from the next two: (1, -1). A negative value means impossible. Direct argument: the two degree-3 vertices in a 4-vertex graph must each connect to all others, including the degree-1 vertex - but then that vertex already has degree 2. Contradiction. Option A is realized by C4, option D by two disjoint edges, and option B by a 5-vertex graph (sum 12, even; Havel-Hakimi: (2,1,1,2)->sort(2,2,1,1)->(1,0,1)->sort(1,1,0)->(0,0) - valid). Note the parity check alone does not settle this question: (3,3,3,1) has even sum 10, so you must run the full reduction."
        },
        {
          id: 'engmath-graph-theory-q6',
          q: 'For a simple connected planar graph with n = 10 vertices, the maximum possible number of edges is:',
          options: ['45', '24', '30', '20'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "For any simple connected planar graph with n >= 3, Euler's formula n - e + f = 2 combined with each face needing at least 3 edge-sides (and each edge bounding at most 2 faces, so 3f <= 2e) yields e <= 3n - 6. With n = 10: e <= 30 - 6 = 24, and this is achieved by planar triangulations, so 24 is exact. Option A (45) is the unrestricted maximum C(10,2) for any simple graph - ignoring planarity. Option D (2n) is close to the triangle-free bound 2n - 4 = 16... not matching either; it is a filler distractor. Remember the companion bound: if the graph is additionally triangle-free (e.g. bipartite), the tighter e <= 2n - 4 applies - that distinction is exactly how K3,3 (9 edges, bound 8) is proven non-planar while passing 3n - 6."
        },
        {
          id: 'engmath-graph-theory-q7',
          q: 'Which of the following statements about K3,3 and K5 is TRUE?',
          options: ['K5 is planar but K3,3 is not', 'K3,3 is planar but K5 is not', 'Both are planar', 'Both are non-planar, and every non-planar graph contains a subdivision of one of them'],
          answer: 3,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "K5 has n = 5, e = 10, violating e <= 3n - 6 = 9, so it is non-planar. K3,3 has n = 6, e = 9, which passes 3n - 6 = 12, but being bipartite it is triangle-free, so the stronger bound e <= 2n - 4 = 8 applies and 9 > 8 convicts it. Kuratowski's theorem then says these two are the ONLY obstructions: a graph is planar iff it contains no subgraph that is a subdivision of K5 or K3,3 - making option D the full true statement. The instructive part is why two different bounds are needed: K3,3 slips past the general planarity bound and is caught only by the triangle-free refinement. GATE has asked both the bounds and the Kuratowski statement repeatedly."
        },
        {
          id: 'engmath-graph-theory-q8',
          q: 'The number of labelled spanning trees of the complete graph K4 is:',
          options: ['4', '8', '16', '64'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Cayley's formula: Kn has n^(n-2) labelled spanning trees, so K4 has 4^2 = 16. Verify by direct classification: trees on 4 labelled vertices are either paths or stars. Stars: 4 (choose the center). Paths: 4!/2 = 12 (each of the 24 vertex orderings gives a path, but each path is counted twice, once per direction). Total 4 + 12 = 16 - the formula checks out. Option D (64) is 4^3, a misremembered exponent; the exponent is n - 2, not n - 1. Option B might come from counting only paths incorrectly. Cayley's formula is pure recall, but the path-plus-star verification is worth knowing because GATE sometimes asks directly for the number of distinct trees on 4 or 5 labelled vertices."
        },
        {
          id: 'engmath-graph-theory-q9',
          q: 'Let kappa(G), lambda(G), delta(G) denote vertex connectivity, edge connectivity and minimum degree of a connected graph G. Which chain of inequalities always holds?',
          options: ['kappa <= lambda <= delta', 'lambda <= kappa <= delta', 'delta <= lambda <= kappa', 'kappa = lambda = delta always'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Whitney's inequality: kappa(G) <= lambda(G) <= delta(G). The right half is easy: deleting all edges at a minimum-degree vertex disconnects it, so lambda <= delta. The left half (kappa <= lambda) is subtler but standard: from a minimum edge cut one can select at most that many vertices whose removal disconnects the graph. Both inequalities can be strict simultaneously: the classic example is two K4 blocks sharing a single vertex - kappa = 1 (the shared cut vertex), lambda = ... take two triangles joined by one edge: kappa = 1, lambda = 1, delta = 2. For strictness everywhere GATE cites graphs with kappa=1, lambda=2, delta=3 (two K4s joined by two edges arranged suitably). Option D holds for complete graphs (all equal n-1) but not generally - equality is the exception, not the rule."
        },
        {
          id: 'engmath-graph-theory-q10',
          q: 'A simple graph G on n vertices satisfies: every vertex has degree at least n/2 (n >= 3). By Dirac\'s theorem, G is necessarily:',
          options: ['Eulerian', 'Hamiltonian', 'Bipartite', 'Planar'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Dirac's theorem: if n >= 3 and every vertex has degree >= n/2, the graph has a Hamiltonian cycle. Intuition: such high degrees leave no room for bottlenecks - any partial cycle can always be extended or rerouted. Crucially this is a SUFFICIENT condition only: cycles Cn are Hamiltonian with degree 2, far below n/2, so failing Dirac proves nothing. Eulerian (option A) depends on degree PARITY, not size - K4 satisfies Dirac (degrees 3 >= 2) yet has all odd degrees, so it is not Eulerian. High degree pushes AGAINST bipartite and planar: Kn itself satisfies Dirac and is neither (for n >= 5 and n >= 3 respectively). Companion result: Ore's theorem relaxes Dirac to deg u + deg v >= n for non-adjacent pairs."
        },
        {
          id: 'engmath-graph-theory-q11',
          q: 'The number of perfect matchings in the complete bipartite graph K3,3 is:',
          options: ['3', '6', '9', '12'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Label the parts {x1, x2, x3} and {y1, y2, y3}. A perfect matching pairs each xi with a distinct yj, so it is exactly a bijection between the parts: 3! = 6 matchings. In general Kn,n has n! perfect matchings - matchings ARE permutations, which is also why the permanent of the all-ones matrix counts them. Option C (9) is the number of edges, a frequent mix-up. Option A might come from thinking each vertex contributes one choice. For contrast, the complete graph K6 has 5 x 3 x 1 = 15 perfect matchings (pair the first vertex 5 ways, the next unpaired vertex 3 ways, last pair forced) - the (n-1)(n-3)...1 double-factorial pattern. GATE has asked both the bipartite and complete versions; keep the two formulas separate."
        },
        {
          id: 'engmath-graph-theory-q12',
          q: 'How many simple undirected graphs (labelled, no self-loops, no multi-edges) exist on 4 vertices?',
          options: ['16', '32', '64', '4096'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "A simple labelled graph is determined by deciding, for each unordered pair of vertices, whether the edge is present. With 4 vertices there are C(4,2) = 6 pairs, each independently in or out: 2^6 = 64 graphs. Option A (2^4) raises 2 to the vertex count; option D (2^12) uses ordered pairs, which would count directed graphs (4 x 3 = 12 ordered pairs, 2^12 = 4096 - itself a valid answer to the DIRECTED version, which GATE also asks; with self-loops allowed it becomes 2^16). The discipline this question trains: identify the independent binary choices precisely - unordered pairs for undirected, ordered for directed, include the diagonal only when loops are allowed."
        },
        {
          id: 'engmath-graph-theory-q13',
          q: 'A tree has 2 vertices of degree 3, 1 vertex of degree 2 and all remaining vertices are leaves (degree 1). The total number of vertices in the tree is:',
          options: ['7', '8', '9', '10'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Let L be the number of leaves, so n = 3 + L vertices. Two facts combine: a tree on n vertices has exactly n - 1 edges, and the handshaking lemma makes the degree sum equal 2(n - 1). Degree sum: 2 x 3 + 1 x 2 + L x 1 = 8 + L. Edge count: n - 1 = 2 + L, so the degree sum must be 2(2 + L) = 4 + 2L. Equating: 8 + L = 4 + 2L gives L = 4, hence n = 7. Verify: 7 vertices, 6 edges, degree sum 6 + 2 + 4 = 12 = 2 x 6 - consistent. Such a tree exists: a path of the two degree-3 vertices and the degree-2 vertex, with leaves attached appropriately. This tree-plus-handshake template solves an entire family of recurring GATE questions (e.g. counting leaves in trees with given internal degrees); the wrong options come from forgetting that a tree has n - 1 edges, not n."
        },
        {
          id: 'engmath-graph-theory-q14',
          q: 'Which statement about bipartite graphs is FALSE?',
          options: ['A graph is bipartite if and only if it contains no odd-length cycle', 'Every tree is bipartite', 'The complete bipartite graph Km,n has m + n edges', 'A bipartite graph with parts of sizes m != n has no Hamiltonian cycle'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Km,n joins every vertex of one part to every vertex of the other, giving m x n edges, not m + n - option C is false (m + n is the VERTEX count). The others are true. Option A is the fundamental characterization: odd cycles are exactly the obstruction to 2-coloring. Option B follows immediately - trees have no cycles at all, hence no odd ones; concretely, 2-color a tree by depth parity from any root. Option D: a Hamiltonian cycle in a bipartite graph must alternate between the two parts, so it visits them equally often, forcing m = n; unequal parts make it impossible (the same alternation argument shows any cycle in a bipartite graph has even length, closing the loop back to option A)."
        },
        {
          id: 'engmath-graph-theory-q15',
          q: 'For which values of n can a self-complementary simple graph on n vertices exist?',
          options: ['Only even n', 'n congruent to 0 or 1 (mod 4)', 'Only prime n', 'All n >= 4'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "A graph isomorphic to its own complement must contain exactly half of all possible edges: e = C(n,2)/2 = n(n-1)/4, which must be an integer. Among consecutive integers n and n-1, exactly one is even; for divisibility by 4 we need n or n - 1 divisible by 4, i.e. n = 0 or 1 (mod 4). This necessary condition is also sufficient - constructions exist for every such n: the path P4 (n = 4) and the cycle C5 (n = 5) are the smallest examples, both worth verifying once by hand. Option A fails: n = 6 gives 15/2 edges, impossible, even though 6 is even; n = 5 works though odd. This edge-halving argument - complement pairs partition C(n,2) edges - also answers related GATE questions like: G or its complement must be connected."
        },
        {
          id: 'engmath-graph-theory-q16',
          q: 'The chromatic number of the graph obtained by deleting a single edge from the complete graph K6 is:',
          options: ['4', '5', '6', '3'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Let the removed edge join u and v. Lower bound: the other four vertices together with u form a K5 (all those edges survive), so chi >= 5. Upper bound: color the four fully-connected vertices with colors 1-4, give u color 5, and reuse color 5 for v - legal precisely because u and v are now non-adjacent. So chi = 5 exactly. The general principle: removing one edge from Kn drops the chromatic number from n to exactly n - 1 - the two now non-adjacent endpoints share one color, while the remaining n - 2 vertices form a clique with both of them and need n - 2 distinct further colors. Option C ignores the removal; option A over-discounts. The sandwich method - clique for the lower bound, explicit coloring for the upper - is the universal GATE technique for exact chromatic numbers."
        }
      ]
    }
,
    {
      id: 'engmath-combinatorics',
      name: 'Combinatorics',
      theory: {
        intro: "Combinatorics is the art of counting without listing, and GATE treats it as a core skill worth 2-4 marks a year - both directly and hidden inside probability, algorithms analysis and automata questions. The syllabus names counting, recurrence relations, generating functions and the pigeonhole principle, and the paper rotates through a stable set of patterns: permutations with repeated letters, stars and bars, inclusion-exclusion, derangements, Catalan-style structures, strings avoiding a pattern, and solving linear recurrences. Errors here are rarely conceptual gaps; they are modelling slips - counting ordered when the problem is unordered, forgetting the empty case, or double counting. The habit that separates top scorers is verifying every count a second way: a formula answer re-derived by a small-case check or a complementary count. Every technique below has appeared in some GATE paper at least three times since 1990, several of them a dozen times.",
        core: "• Product and sum rules: independent sequential choices multiply; disjoint alternatives add. Permutations of n distinct objects: n!. Arrangements of r from n: P(n, r) = n!/(n-r)!. Selections: C(n, r) = n!/(r!(n-r)!).\n\n• Permutations with repetition: arrangements of a word with letter multiplicities n1, n2, ... : n!/(n1! n2! ...). Circular arrangements of n people: (n-1)!; if reflections are considered identical (a necklace), divide by 2.\n\n• Stars and bars: number of non-negative integer solutions of x1 + ... + xk = n is C(n + k - 1, k - 1). Positive solutions (each xi >= 1): C(n - 1, k - 1). Equivalent form: ways to drop n identical balls into k distinct boxes.\n\n• Binomial identities: sum of C(n, r) over r = 2^n; C(n, r) = C(n-1, r-1) + C(n-1, r) (Pascal); sum of squares C(n, r)^2 = C(2n, n) (Vandermonde); number of even-size subsets = number of odd-size subsets = 2^(n-1).\n\n• Inclusion-exclusion: |A U B U C| = sum singles - sum pairs + triple. Standard uses: integers in a range divisible by at least one of several numbers; onto functions; derangements.\n\n• Derangements (no element in its original place): D(n) = n! (1 - 1/1! + 1/2! - ... + (-1)^n/n!); D(1) = 0, D(2) = 1, D(3) = 2, D(4) = 9, D(5) = 44. Also D(n) = (n - 1)(D(n-1) + D(n-2)), and D(n) is the nearest integer to n!/e.\n\n• Pigeonhole principle: with n + 1 pigeons in n holes, some hole has 2. Generalized: with n pigeons in k holes, some hole has at least ceil(n/k). To GUARANTEE m + 1 objects in one of k classes you need km + 1 objects. Classic uses: equal remainders, equal degrees in a graph, points in a subdivided square.\n\n• Recurrences: for a linear homogeneous recurrence a_n = c1 a_{n-1} + c2 a_{n-2}, solve the characteristic equation x^2 = c1 x + c2. Distinct roots r, s: a_n = A r^n + B s^n. Repeated root r: a_n = (A + Bn) r^n. Fit A, B from initial values. Non-homogeneous: particular solution + homogeneous; for a_n = c a_{n-1} + d (constant), the closed form telescopes to a geometric sum, e.g. Tower of Hanoi a_n = 2a_{n-1} + 1, a_0 = 0 gives a_n = 2^n - 1.\n\n• Famous counting recurrences: binary strings of length n with no two consecutive 1s satisfy a_n = a_{n-1} + a_{n-2} with a_1 = 2, a_2 = 3 (Fibonacci-shifted). Catalan numbers C_n = C(2n, n)/(n + 1) = 1, 1, 2, 5, 14, 42, ... count balanced parenthesis strings with n pairs, binary trees with n nodes, stack-realizable permutations, and monotone lattice paths not crossing the diagonal.\n\n• Generating functions: encode a_n as coefficients of x^n. Key expansions: 1/(1 - x) = sum x^n; 1/(1 - x)^k = sum C(n + k - 1, k - 1) x^n; (1 + x)^n = sum C(n, r) x^r. Multiplying generating functions convolves sequences - which is why (1 + x + x^2 + ...)^k solves stars and bars. Extracting a coefficient answers a counting question without enumeration.",
        strategy: "Start every counting problem by classifying it on two axes: ordered vs unordered, and repetition allowed vs not. That single classification chooses among n^r (ordered, repetition), P(n, r) (ordered, no repetition), C(n, r) (unordered, no repetition), and C(n + r - 1, r) (unordered, repetition) - and eliminates the most common GATE error, which is answering the wrong quadrant.\n\nWhen a condition says at least or none, flip to the complement: strings with at least one 0 = all strings minus strings with no 0. Complement counting plus inclusion-exclusion handles nearly every constrained count in the exam. Mini-example: strings of length 4 over {a, b, c} using all three letters at least once? Total 3^4 = 81, minus those missing a letter: 3 x 2^4 = 48, plus those missing two: 3 x 1 = 3, giving 81 - 48 + 3 = 36.\n\nFor recurrences, resist unrolling ten terms by hand; write the characteristic equation immediately and fit constants from the two initial values - two minutes, no arithmetic swamp. But DO compute the first three terms from both your closed form and the recurrence as a correctness check; GATE answer options are engineered to catch sign and constant errors.\n\nFor pigeonhole guarantee questions, the answer is always (classes) x (allowed per class) + 1; identify the classes first (12 months, 7 remainders, n - 1 possible degrees). If a question smells like balanced structures - parentheses, stack pushes and pops, binary trees - reach straight for Catalan numbers and memorize 1, 2, 5, 14, 42, 132.\n\nFinally, verify small: any formula you derive should reproduce the n = 1 and n = 2 cases you can enumerate by hand in seconds."
      },
      questions: [
        {
          id: 'engmath-combinatorics-q1',
          q: 'The number of non-negative integer solutions of x1 + x2 + x3 = 10 is:',
          options: ['66', '36', '55', '120'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "This is stars and bars: arrange 10 identical stars and 2 bars in a row; the bars split the stars into three ordered groups whose sizes are x1, x2, x3. The count is the number of ways to place the 2 bars among 12 positions: C(12, 2) = 66. General formula: C(n + k - 1, k - 1) for x1 + ... + xk = n. Option C (55 = C(11, 2)... rather C(11,2) = 55) is what you get with an off-by-one in the formula, and option B (36 = C(9, 2)) is the count of POSITIVE solutions (each xi >= 1), obtained by first giving each variable 1 star - a distinct question GATE also asks, so read the constraint carefully. Option D is 10 x 12, a filler."
        },
        {
          id: 'engmath-combinatorics-q2',
          q: 'What is the minimum number of people needed to guarantee that at least 3 of them were born in the same month?',
          options: ['25', '24', '13', '36'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Use the generalized pigeonhole guarantee: to force m + 1 objects into one of k classes you need km + 1 objects. Here k = 12 months and we want 3 = 2 + 1 in some month, so 12 x 2 + 1 = 25. The worst case makes this vivid: 24 people could split exactly 2 per month, avoiding any triple; the 25th person must join some month as its third. Option B (24) is exactly that worst case - it does not GUARANTEE a triple. Option C (13) guarantees only a pair (12 x 1 + 1). Option D over-counts. The template - identify the classes, multiply by one less than the target, add 1 - answers every guarantee-style pigeonhole question in the exam."
        },
        {
          id: 'engmath-combinatorics-q3',
          q: 'The number of distinct arrangements of the letters of the word MISSISSIPPI is:',
          options: ['39916800', '34650', '11550', '69300'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "MISSISSIPPI has 11 letters: M once, I four times, S four times, P twice. Arrangements of a multiset divide out the internal orderings of identical letters: 11! / (4! x 4! x 2! x 1!) = 39916800 / (24 x 24 x 2) = 39916800 / 1152 = 34650. Option A is the unadjusted 11!, the error of treating identical letters as distinct. Option D is exactly double the answer (forgetting the 2! for the two P letters), and option C is a further mis-division. The intuition: any true arrangement corresponds to 4! x 4! x 2! = 1152 permutations of labelled letters, so we divide once by that redundancy. Checking your divisor by multiplying the factorials back is a ten-second insurance policy."
        },
        {
          id: 'engmath-combinatorics-q4',
          q: 'How many binary strings of length 8 contain no two consecutive 1s?',
          options: ['34', '55', '89', '64'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Let a_n count such strings of length n. A valid string either ends in 0 (preceded by any valid string of length n - 1) or ends in 01 (preceded by any valid string of length n - 2); ending in 11 is forbidden. So a_n = a_{n-1} + a_{n-2}, with a_1 = 2 (strings 0, 1) and a_2 = 3 (00, 01, 10). Iterate: 2, 3, 5, 8, 13, 21, 34, 55 - so a_8 = 55. The sequence is Fibonacci shifted: a_n = F(n + 2) in the convention F(1) = F(2) = 1. Option A stops one term early (a_7), the classic off-by-one, and option C goes one too far. Option D is 2^6, from a faulty direct-counting attempt. Deriving the recurrence by conditioning on the last character is the reusable skill - the same argument handles no-substring-00, ternary variants, and tiling problems."
        },
        {
          id: 'engmath-combinatorics-q5',
          q: 'Four letters are placed into four addressed envelopes at random, one per envelope. The number of ways in which NO letter goes into its correct envelope is:',
          options: ['6', '9', '12', '23'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "This asks for the derangement number D(4). By inclusion-exclusion on the set of letters placed correctly: D(4) = 4! (1 - 1/1! + 1/2! - 1/3! + 1/4!) = 24 (1 - 1 + 0.5 - 0.1667 + 0.0417) = 24 x 0.375 = 9. Cross-check with the recurrence D(n) = (n - 1)(D(n-1) + D(n-2)): D(3) = 2, D(2) = 1, so D(4) = 3 x (2 + 1) = 9. Also memorize that D(n) is the nearest integer to n!/e = 24/2.718 = 8.83 - rounds to 9. Option D (23) is 4! - 1, the error of subtracting only the identity permutation; many permutations fix SOME letters without fixing all. The derangement sequence 0, 1, 2, 9, 44 for n = 1..5 is compulsory memory for GATE."
        },
        {
          id: 'engmath-combinatorics-q6',
          q: 'The recurrence a_n = 3a_{n-1} - 2a_{n-2} with a_0 = 2 and a_1 = 3 has the closed form solution:',
          options: ['a_n = 2^n + 1', 'a_n = 2^(n+1) - n', 'a_n = 3^n - 1', 'a_n = n^2 + 2'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Characteristic equation: x^2 = 3x - 2, i.e. x^2 - 3x + 2 = 0, factoring as (x - 1)(x - 2) = 0 with roots 1 and 2. General solution: a_n = A(1)^n + B(2)^n = A + B 2^n. Fit initial values: n = 0 gives A + B = 2; n = 1 gives A + 2B = 3. Subtracting, B = 1 and A = 1, so a_n = 2^n + 1. Verify against the recurrence: a_2 should be 3(3) - 2(2) = 5, and the formula gives 4 + 1 = 5 - confirmed. The verification step matters: options B and C also satisfy some of the initial data (option B gives a_0 = 2 but a_1 = 3... check: 4 - 1 = 3, it matches both initial values yet fails a_2 = 8 - 2 = 6 != 5), so testing one term beyond the initial conditions is the only safe elimination."
        },
        {
          id: 'engmath-combinatorics-q7',
          q: 'How many integers between 1 and 100 (inclusive) are divisible by 2, 3, or 5?',
          options: ['70', '74', '78', '80'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Inclusion-exclusion with floor counts. Singles: |2| = 50, |3| = 33, |5| = 20; sum 103. Pairs (divisible by both = by the lcm): |6| = 16, |10| = 10, |15| = 6; sum 32. Triple: |30| = 3. Total = 103 - 32 + 3 = 74. The alternating pattern corrects the double counting: a number like 30 is initially counted three times, removed three times, then restored once - net once, as required. Option A subtracts the pairs but forgets to add the triple back; option C misses one of the pairwise terms. Discipline points: always use floor(100/k), and always intersect via lcm (which equals the product only for coprime divisors - it is, here, but stating lcm keeps you safe when GATE uses 4 and 6)."
        },
        {
          id: 'engmath-combinatorics-q8',
          q: 'The coefficient of x^5 in the power series expansion of 1/(1 - x)^3 is:',
          options: ['15', '10', '21', '35'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "The standard expansion is 1/(1 - x)^k = sum over n of C(n + k - 1, k - 1) x^n. With k = 3 and n = 5: C(5 + 2, 2) = C(7, 2) = 21. Combinatorial meaning makes it memorable: 1/(1-x)^3 = (1 + x + x^2 + ...)^3, and the coefficient of x^5 counts ways to write 5 = x1 + x2 + x3 with non-negative integers - stars and bars again, C(7, 2) = 21. So generating functions and stars-and-bars are the same fact in two costumes, which is exactly the connection GATE probes. Option A is C(6, 2), an off-by-one in n + k - 1; option B is C(5, 2)... C(5,2) = 10, the error of ignoring the shift entirely; option D is C(7, 3), the wrong lower index."
        },
        {
          id: 'engmath-combinatorics-q9',
          q: 'The number of ways to distribute 8 identical balls into 3 distinct boxes such that no box is empty is:',
          options: ['45', '21', '28', '56'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Each box needs at least one ball, so pre-place one ball in each box, consuming 3 and leaving 5 to distribute freely: C(5 + 3 - 1, 3 - 1) = C(7, 2) = 21. Equivalently use the positive-solutions formula for x1 + x2 + x3 = 8 with each xi >= 1: C(8 - 1, 3 - 1) = C(7, 2) = 21. The bars picture: place 2 bars in the 7 gaps between 8 stars in a row - gaps, not positions, because empty boxes are banned. Option A (C(10, 2) = 45) answers the unrestricted version where empty boxes are allowed - the single most common mix-up in stars-and-bars questions. If the balls were DISTINCT instead of identical, the answer would be onto functions 3^8 minus corrections - a completely different computation; always classify the objects first."
        },
        {
          id: 'engmath-combinatorics-q10',
          q: 'The number of well-formed (balanced) strings of 4 pairs of parentheses is:',
          options: ['12', '14', '16', '20'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Balanced strings with n pairs are counted by the Catalan number C_n = C(2n, n)/(n + 1). For n = 4: C(8, 4)/5 = 70/5 = 14. The division by n + 1 corrects the raw path count for the prefix condition (never more closers than openers) - via the reflection principle, C(2n, n) - C(2n, n - 1) = 70 - 56 = 14 gives the same value, a good cross-check. Memorize the sequence 1, 1, 2, 5, 14, 42, 132: it also counts binary trees with n nodes, orderings a stack can output, triangulations of an (n+2)-gon, and monotone lattice paths below the diagonal - GATE has dressed the SAME number in each of these costumes across different years. Option C (16 = 2^4) is the naive guess; option D is C(6, 3), the n = 3 raw central coefficient."
        },
        {
          id: 'engmath-combinatorics-q11',
          q: 'The solution of the recurrence T(n) = 2T(n-1) + 1 with T(0) = 0 (the Tower of Hanoi recurrence) is:',
          options: ['T(n) = 2^n', 'T(n) = 2^n - 1', 'T(n) = 2^(n-1) + 1', 'T(n) = n^2'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "Unroll once or twice to see the pattern: T(1) = 1, T(2) = 3, T(3) = 7 - each one less than a power of 2. Formally, add 1 to both sides: T(n) + 1 = 2(T(n-1) + 1), so the sequence T(n) + 1 is geometric with ratio 2 starting at T(0) + 1 = 1, giving T(n) + 1 = 2^n, i.e. T(n) = 2^n - 1. The substitution trick (shift by a constant to make a non-homogeneous recurrence homogeneous) is broadly reusable: for a_n = c a_{n-1} + d, shift by d/(c - 1). Option A fails the initial condition T(0) = 0; option C fails T(1); option D grows polynomially while the true solution is exponential - a useful smell test, since multiplying by 2 each step can never stay polynomial."
        },
        {
          id: 'engmath-combinatorics-q12',
          q: 'How many subsets of a 10-element set have even cardinality (including the empty set)?',
          options: ['1024', '512', '511', '256'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Of the 2^10 = 1024 subsets, exactly half have even size: 2^9 = 512. Slick proof: fix one element t; pairing each subset S with its toggle (S with t added or removed) matches every even subset with a unique odd subset, so the two classes are equinumerous. Alternatively, expand (1 + 1)^10 and (1 - 1)^10 with the binomial theorem: their sum is twice the even-binomial sum, giving even subsets = (1024 + 0)/2 = 512. Option C (511) wrongly excludes the empty set - but the empty set has size 0, which is even, and the question includes it. Option D is 2^8. The even-odd split being exactly half holds for every non-empty finite set, a fact GATE has tested both directly and inside probability questions."
        },
        {
          id: 'engmath-combinatorics-q13',
          q: 'In how many distinct ways can 6 people be seated around a circular table, where two seatings are the same if one is a rotation of the other?',
          options: ['720', '120', '60', '36'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "Fix one person's seat to kill the rotational symmetry; the remaining 5 people can then be arranged in the other seats in 5! = 120 ways. Equivalently, each circular arrangement corresponds to exactly 6 linear arrangements (one per rotation), so 6!/6 = 120. Option A (720) counts linear arrangements, ignoring the rotational identification. Option C (60) additionally quotients by reflections - the correct answer only when the problem says arrangements that are mirror images are identical (a necklace or garland problem), which this one does not. Read the symmetry statement precisely: rotations-only gives (n-1)!, rotations plus reflections gives (n-1)!/2. GATE uses both variants, and the factor-of-2 distinction is the entire question."
        },
        {
          id: 'engmath-combinatorics-q14',
          q: 'What is the minimum number of integers that must be selected (arbitrarily) to guarantee that some two of them leave the same remainder when divided by 7?',
          options: ['7', '8', '14', '49'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Division by 7 sorts every integer into one of exactly 7 remainder classes (0 through 6). With 8 integers and only 7 classes, the pigeonhole principle forces two into the same class - and two numbers with equal remainders differ by a multiple of 7, which is how this fact usually gets used downstream. Seven integers do NOT suffice: the set {0, 1, 2, 3, 4, 5, 6} hits each class exactly once with no collision, so option A fails the guarantee. Options C and D inflate the count needlessly. The two-step skill: first identify the pigeonholes (remainder classes - not the numbers themselves), then apply holes + 1. Most exam variants only change the modulus or ask for triples (then it is 2 x 7 + 1 = 15)."
        },
        {
          id: 'engmath-combinatorics-q15',
          q: 'A password consists of 4 characters from the set {a, b, c, d, e} with repetition allowed, and must contain the character a at least once. How many such passwords exist?',
          options: ['625', '369', '256', '500'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Complement counting: total passwords 5^4 = 625; passwords with NO a use only the other 4 characters: 4^4 = 256. Passwords with at least one a: 625 - 256 = 369. The direct approach - summing over exactly one, two, three, four occurrences of a - gives C(4,1)4^3 + C(4,2)4^2 + C(4,3)4 + 1 = 256 + 96 + 16 + 1 = 369, confirming the answer but taking four times as long; at-least-one problems should reflexively trigger the complement. A tempting wrong method is 4 x 5^3 = 500 (option D): place an a somewhere, fill the rest freely - this double counts passwords with multiple occurrences of a (the string aaab is counted three times). Recognizing that overcounting pattern is the real lesson of this recurring GATE trap."
        }
      ]
    },
    {
      id: 'engmath-linear-algebra',
      name: 'Linear Algebra',
      theory: {
        intro: "Linear algebra is the highest-yield mathematics topic in GATE CS - reliably 3-5 marks - because it powers graphics, machine learning, PageRank and scientific computing, and because it generates clean numerical answers perfect for NAT questions. The paper concentrates on a remarkably fixed menu: rank and its relation to solutions of linear systems, determinant properties and evaluation, eigenvalues via trace and determinant shortcuts, eigenvalues of matrix powers and polynomials, special matrices (triangular, idempotent, orthogonal, rank-one), and occasionally LU decomposition. Very few questions require long row reduction; nearly all yield to a property or shortcut in under a minute if you know it, and consume five error-prone minutes if you do not. The trace-determinant eigenvalue trick alone has settled a dozen GATE questions. This is the topic where memorized structure most directly converts to marks.",
        core: "• Rank: the number of linearly independent rows (= independent columns = order of the largest non-vanishing minor = number of non-zero rows after row reduction). Row operations preserve rank. For an m x n matrix, rank <= min(m, n). rank(AB) <= min(rank A, rank B).\n\n• Linear system Ax = b with n unknowns, augmented matrix [A|b]: no solution iff rank(A) < rank([A|b]); unique solution iff rank(A) = rank([A|b]) = n; infinitely many iff rank(A) = rank([A|b]) < n, with n - rank free parameters. The homogeneous system Ax = 0 always has the trivial solution, and non-trivial solutions exist iff rank(A) < n (for square A: iff det A = 0). Rank-nullity: rank + nullity = n (number of columns).\n\n• Determinants: det(AB) = det A det B; det(A^T) = det A; det(kA) = k^n det A for an n x n matrix; det(A^(-1)) = 1/det A. Swapping two rows negates det; a scalar multiple of one row added to another leaves det unchanged; multiplying one row by k multiplies det by k. Triangular (and diagonal) matrices: det = product of diagonal entries. Two equal or proportional rows force det = 0. A is invertible iff det A != 0.\n\n• Eigenvalues: solutions of det(A - tI) = 0. For every square A: sum of eigenvalues = trace(A), product of eigenvalues = det(A). These two facts solve most 2x2 and many 3x3 GATE questions without forming the characteristic polynomial: for 2x2, the eigenvalues satisfy t^2 - (trace)t + det = 0.\n\n• Eigenvalue transforms: if Av = tv then A^k v = t^k v (eigenvalues of powers are powers), (A + cI) has eigenvalues t + c, A^(-1) has 1/t, and any polynomial p(A) has p(t) - all with the SAME eigenvectors. Triangular matrices display their eigenvalues on the diagonal.\n\n• Special structure: real symmetric matrices have real eigenvalues and orthogonal eigenvectors for distinct eigenvalues. Idempotent (A^2 = A): eigenvalues only 0 or 1, and rank = trace. Nilpotent (A^k = 0): all eigenvalues 0. Orthogonal (A^T A = I): eigenvalue magnitudes 1, det = +1 or -1, columns orthonormal. Skew-symmetric of odd order: det = 0. A rank-one matrix uv^T has one possibly non-zero eigenvalue equal to v^T u (the dot product), and 0 repeated n - 1 times.\n\n• Similarity: B = P^(-1) A P shares eigenvalues, determinant, trace and rank with A (but generally NOT eigenvectors). A matrix with n distinct eigenvalues is diagonalizable; eigenvectors for distinct eigenvalues are linearly independent. A defective matrix (repeated eigenvalue with too few independent eigenvectors) is not diagonalizable.\n\n• Cayley-Hamilton: every matrix satisfies its own characteristic equation. For 2x2: A^2 - (trace)A + (det)I = 0, which lets you express high powers and even A^(-1) as low-degree polynomials in A: A^(-1) = (trace x I - A)/det.\n\n• LU decomposition: A = LU with L unit lower triangular, U upper triangular, exists without row exchanges iff all leading principal minors are non-zero (in particular a11 != 0); with partial pivoting, PA = LU always exists. Solving Ax = b then costs two triangular solves (forward, then back substitution). Gaussian elimination on an n x n system takes about n^3/3 multiplications; each extra right-hand side costs only O(n^2).",
        strategy: "Before any computation, scan the matrix for structure - triangular, symmetric, proportional rows, rank one, idempotent. Structure recognition is the topic: a triangular matrix hands you eigenvalues and determinant instantly; proportional rows scream det = 0 and rank collapse; a matrix that is obviously uv^T (every row a multiple of one vector) has eigenvalues v.u and zeros.\n\nFor 2x2 eigenvalues, never expand the characteristic polynomial blindly: write t^2 - (trace)t + det = 0 and factor. Mini-example: A = [[2, 1], [1, 2]] has trace 4, det 3, so t^2 - 4t + 3 = (t - 1)(t - 3) - eigenvalues 1 and 3, ten seconds flat. Then answer any follow-up: det(A^3) = (1^3)(3^3) = 27, trace(A^2) = 1 + 9 = 10, eigenvalues of A + 2I are 3 and 5.\n\nFor system-of-equations questions, compare rank(A) with rank([A|b]) and with n - the three-way comparison IS the answer, and usually only one row reduction step is needed to expose a dependency. When a parameter appears (for what value of k does the system have infinitely many solutions), set det = 0 first, then check consistency for that k.\n\nUse verification loops constantly: eigenvalues must sum to the trace and multiply to the determinant - check both before moving on; a claimed eigenvector v is verified by one multiplication Av. These checks cost seconds and catch the majority of slips.\n\nTrap list: det(kA) = k^n det A, not k det A; rank(AB) can be less than both ranks; eigenvalues of A + B are NOT generally eigenvalue sums; similar matrices share eigenvalues but not eigenvectors; and a zero eigenvalue exactly means the matrix is singular - an equivalence GATE tests in disguise repeatedly."
      },
      questions: [
        {
          id: 'engmath-linear-algebra-q1',
          q: 'A 2x2 real matrix A has trace 5 and determinant 6. Its eigenvalues are:',
          options: ['1 and 6', '2 and 3', '-2 and -3', '5 and 6'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "For any 2x2 matrix the characteristic polynomial is t^2 - (trace)t + det = t^2 - 5t + 6 = (t - 2)(t - 3), so the eigenvalues are 2 and 3. The two anchor identities - eigenvalues sum to the trace and multiply to the determinant - make this instant: we need two numbers summing to 5 with product 6. Option A has the right product but sum 7; option C has product 6 and sum -5, matching a matrix with trace -5; option D ignores both identities. This sum-product pattern is the single most reused eigenvalue shortcut in GATE history, and it composes: once you hold 2 and 3, you can immediately answer about A^2 (eigenvalues 4, 9), A^(-1) (1/2, 1/3), or A + I (3, 4)."
        },
        {
          id: 'engmath-linear-algebra-q2',
          q: 'The eigenvalues of the matrix [[3, 5, 7], [0, 4, 8], [0, 0, 9]] are:',
          options: ['3, 4, 9', '3, 5, 7', '5, 8, 9', 'Cannot be found without solving a cubic'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "The matrix is upper triangular, and for any triangular matrix det(A - tI) is the product of the diagonal entries of A - tI, namely (3 - t)(4 - t)(9 - t). The roots - the eigenvalues - are exactly the diagonal entries 3, 4, 9. No cubic solving needed, which is why option D is wrong despite sounding cautious. Option B reads the first row instead of the diagonal, a surprisingly common slip under time pressure. Verify with the invariants: trace = 3 + 4 + 9 = 16 equals the eigenvalue sum, and det = 3 x 4 x 9 = 108 equals the product - both consistent. Note the off-diagonal entries influence eigenVECTORS but not eigenvalues for triangular matrices; GATE exploits students who feel the 5, 7, 8 must matter."
        },
        {
          id: 'engmath-linear-algebra-q3',
          q: 'The rank of the matrix [[1, 2, 3], [2, 4, 6], [3, 6, 9]] is:',
          options: ['0', '1', '2', '3'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "Row 2 is exactly 2 x row 1 and row 3 is 3 x row 1: every row is a multiple of (1, 2, 3), so the row space is one-dimensional and the rank is 1. Row reduction confirms it - subtracting the right multiples of row 1 zeroes out rows 2 and 3, leaving a single non-zero row. Rank 0 (option A) happens only for the zero matrix. Rank 3 would require det != 0, but proportional rows force det = 0 immediately. This matrix is in fact the outer product (1,2,3)^T (1,2,3), and every rank-one matrix has this all-rows-proportional shape - recognizing it also tells you the eigenvalues: the dot product 1 + 4 + 9 = 14, and 0 twice (which again matches trace 1 + 4 + 9 = 14). Structure recognition beats mechanical elimination."
        },
        {
          id: 'engmath-linear-algebra-q4',
          q: 'The system Ax = b with n unknowns has infinitely many solutions if and only if:',
          options: ['rank(A) = rank([A|b]) = n', 'rank(A) = rank([A|b]) < n', 'rank(A) < rank([A|b])', 'det(A) != 0'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Consistency requires rank(A) = rank([A|b]): if appending b raises the rank, then b lies outside the column space of A and no solution exists (option C is the no-solution condition). Given consistency, the solution set is a translate of the null space, whose dimension is n - rank(A) by rank-nullity; solutions are infinite precisely when this exceeds 0, i.e. rank < n, with n - rank free parameters. Option A pins down the unique-solution case (zero free parameters). Option D implies a unique solution for square systems - the opposite of what is asked. The three-way decision tree (compare the two ranks, then compare with n) answers every existence-uniqueness question GATE poses, including the parameterized for-what-k variants."
        },
        {
          id: 'engmath-linear-algebra-q5',
          q: 'If A is a 3x3 matrix with det(A) = 4, then det(2A) equals:',
          options: ['8', '32', '12', '4'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "Multiplying a SINGLE row by 2 doubles the determinant; the matrix 2A has ALL THREE rows doubled, so the determinant picks up a factor of 2 per row: det(2A) = 2^3 det(A) = 8 x 4 = 32. The general rule is det(kA) = k^n det(A) for an n x n matrix. Option A (8) applies the tempting but wrong linear rule det(kA) = k det(A) - the most frequent determinant error in GATE, because determinants are multilinear in rows separately, not linear in the whole matrix. Option C would be 3 x 4, another linearity confusion. Related identities to bundle in memory: det(AB) = det A det B, det(A^T) = det A, det(A^(-1)) = 1/det A - all standard 1-mark fodder."
        },
        {
          id: 'engmath-linear-algebra-q6',
          q: 'A real square matrix A satisfies A^2 = A (A is idempotent) and A is not the identity and not the zero matrix. Which statement must be TRUE?',
          options: ['A is invertible', 'All eigenvalues of A are either 0 or 1, and rank(A) = trace(A)', 'A is symmetric', 'det(A) = 1'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "If Av = tv with v != 0, then A^2 v = t^2 v; but A^2 = A gives t^2 v = t v, so t^2 = t and t is 0 or 1. An idempotent matrix is diagonalizable, its trace equals the sum of eigenvalues = number of eigenvalues equal to 1 = rank. Option A fails: a non-identity idempotent must have 0 as an eigenvalue (otherwise all eigenvalues are 1 and the diagonalizable matrix would BE the identity), hence det = 0 and A is singular - which simultaneously kills option D. Option C fails: [[1, 1], [0, 0]] squares to itself but is not symmetric (idempotent matrices are projections, but not necessarily orthogonal projections). The eigenvalue-via-polynomial-equation technique - substitute Av = tv into the matrix identity - also handles involutory (A^2 = I gives t = +1 or -1) and nilpotent (all t = 0) matrices in GATE."
        },
        {
          id: 'engmath-linear-algebra-q7',
          q: 'The eigenvalues of a 3x3 matrix A are 1, 2, and 3. The determinant of A^2 is:',
          options: ['6', '36', '12', '14'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Two routes agree. Route 1: det(A) = product of eigenvalues = 1 x 2 x 3 = 6, and det(A^2) = det(A)^2 = 36. Route 2: A^2 has eigenvalues 1^2, 2^2, 3^2 = 1, 4, 9, whose product is 36. Having both routes is the real lesson - eigenvalues of matrix powers are powers of eigenvalues (with the same eigenvectors), and determinants multiply over products. Option A is det(A) itself, option D is trace(A^2) = 1 + 4 + 9 = 14 (a correct value for a different question - GATE loves swapping trace and determinant in options), and option C is 2 x 6, a guess. When the exam asks about A^k, A^(-1), A + cI or a polynomial in A, transform the eigenvalues first and only then apply sum-for-trace or product-for-determinant."
        },
        {
          id: 'engmath-linear-algebra-q8',
          q: 'The determinant of [[1, 2, 3], [4, 5, 6], [7, 8, 10]] is:',
          options: ['0', '-3', '3', '-1'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Expand along the first row: 1 x det[[5, 6], [8, 10]] - 2 x det[[4, 6], [7, 10]] + 3 x det[[4, 5], [7, 8]] = 1(50 - 48) - 2(40 - 42) + 3(32 - 35) = 2 + 4 - 9 = -3. Option A is the trap by design: the similar-looking matrix with bottom-right entry 9 (rows in arithmetic progression) IS singular, and pattern-matching students answer 0 without computing; the change from 9 to 10 breaks the dependency (row1 + row3 = 2 x row2 fails: 1+7=8=2x4 ok, 2+8=10=2x5 ok, 3+10=13 != 12). The efficient exam habit: first test for obvious row dependencies, and if the near-dependency fails, commit to the 30-second cofactor expansion. Sign errors in the alternating pattern (+, -, +) produce option C; keep the checkerboard firmly in mind."
        },
        {
          id: 'engmath-linear-algebra-q9',
          q: 'For the matrix A = [[2, 1], [1, 2]], which vector is an eigenvector corresponding to the eigenvalue 3?',
          options: ['(1, -1)', '(1, 1)', '(1, 0)', '(2, 1)'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Verify directly: A(1, 1) = (2 + 1, 1 + 2) = (3, 3) = 3 x (1, 1) - so (1, 1) is an eigenvector for eigenvalue 3. The eigenvalues come from trace 4 and det 3: t^2 - 4t + 3 = (t - 1)(t - 3). Option A, (1, -1), is also an eigenvector but for the OTHER eigenvalue: A(1, -1) = (2 - 1, 1 - 2) = (1, -1) = 1 x (1, -1) - the standard distractor pairing. Options C and D are not eigenvectors at all: A(1, 0) = (2, 1), not a multiple of (1, 0). Note the structure lesson: symmetric matrices have orthogonal eigenvectors for distinct eigenvalues, and indeed (1, 1).(1, -1) = 0. The one-multiplication verification Av = tv is always faster and safer than solving (A - tI)v = 0 in the exam."
        },
        {
          id: 'engmath-linear-algebra-q10',
          q: 'Let u = (1, 2, 2)^T and A = u u^T (a 3x3 matrix). The eigenvalues of A are:',
          options: ['1, 2, 2', '9, 0, 0', '3, 3, 3', '1, 4, 4'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "A = u u^T has rank 1 (every column is a multiple of u), so 0 is an eigenvalue with multiplicity at least 2 (nullity = 3 - rank = 2). The remaining eigenvalue comes from the eigenvector u itself: A u = u (u^T u) = (u^T u) u, so the eigenvalue is u^T u = 1 + 4 + 4 = 9. Eigenvalues: 9, 0, 0. Sanity checks: trace(A) = sum of squares of entries of u along the diagonal = 1 + 4 + 4 = 9 = eigenvalue sum; det = 0 as expected for rank 1. Option D lists squared entries as if the matrix were diagonal, and option A just recycles u. The general fact - uv^T has eigenvalues v^T u and n-1 zeros - converts several past GATE questions (all-ones matrices, outer products) into arithmetic; the all-ones n x n matrix, being (1...1)^T(1...1), has eigenvalues n, 0, ..., 0."
        },
        {
          id: 'engmath-linear-algebra-q11',
          q: 'If B = P^(-1) A P for some invertible matrix P, which property is NOT necessarily shared by A and B?',
          options: ['Eigenvalues', 'Determinant', 'Trace', 'Eigenvectors'],
          answer: 3,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Similar matrices represent the same linear map in different bases, so all basis-independent quantities coincide: characteristic polynomial, hence eigenvalues, determinant (product of eigenvalues), trace (sum), and also rank. Eigenvectors, however, are basis-DEPENDENT objects: if Av = tv, then B(P^(-1)v) = P^(-1)APP^(-1)v = tP^(-1)v, so B's eigenvector is the transformed vector P^(-1)v, generally different from v. Concrete check: A = [[1, 0], [0, 2]] has eigenvector (1, 0); conjugating by a rotation gives a matrix with rotated eigenvectors but the same eigenvalues 1, 2. GATE phrases this as which of the following is preserved under similarity - remember the slogan: similarity preserves the spectrum and every scalar invariant, but relabels all the vectors."
        },
        {
          id: 'engmath-linear-algebra-q12',
          q: 'The homogeneous system Ax = 0, where A is a 3x3 matrix with rank 2, has:',
          options: ['Only the trivial solution', 'Infinitely many solutions forming a line through the origin', 'Exactly two solutions', 'No solution'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "A homogeneous system is always consistent - x = 0 works - so option D is impossible by definition. By rank-nullity, nullity = 3 - 2 = 1: the solution set is a one-dimensional subspace, i.e. all scalar multiples of a single non-zero vector - a line through the origin, which is infinitely many solutions. Option A would need full rank 3 (equivalently det != 0). Option C is impossible for ANY linear system over the reals: solution sets are empty, a single point, or infinite (an affine subspace), never a finite number greater than one - if x1 and x2 are solutions of a homogeneous system, so is every combination ax1 + bx2. This trichotomy of solution-set shapes is itself a repeated GATE question."
        },
        {
          id: 'engmath-linear-algebra-q13',
          q: 'A 2x2 matrix A has characteristic equation t^2 - 5t + 6 = 0. Using the Cayley-Hamilton theorem, A^(-1) equals:',
          options: ['(5I - A)/6', '(A - 5I)/6', '(6I - A)/5', '5A - 6I'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Cayley-Hamilton says A satisfies its own characteristic equation: A^2 - 5A + 6I = 0. Rearrange to isolate the identity: 6I = 5A - A^2 = A(5I - A). Multiply both sides by A^(-1) (which exists since det = 6 != 0): 6A^(-1) = 5I - A, so A^(-1) = (5I - A)/6. Verify on a concrete instance: A = [[2, 0], [0, 3]] gives (5I - A)/6 = [[3, 0], [0, 2]]/6 = [[1/2, 0], [0, 1/3]] - indeed A^(-1). Option B has the sign flipped; option C swaps the roles of trace and determinant. The general 2x2 formula worth memorizing: A^(-1) = (trace x I - A)/det. Cayley-Hamilton similarly reduces any high power A^n to a linear combination of A and I - the other standard GATE use."
        },
        {
          id: 'engmath-linear-algebra-q14',
          q: 'Gaussian elimination WITHOUT row interchanges (yielding A = LU) is guaranteed to work when:',
          options: ['A is any invertible matrix', 'All leading principal minors of A are non-zero', 'A has non-zero determinant and a11 = 0', 'A is any square matrix'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Elimination without swaps requires every pivot encountered to be non-zero, and the k-th pivot is non-zero for all k exactly when every leading principal minor (the determinant of the top-left k x k block) is non-zero - that is the classical LU existence condition. Option A fails: [[0, 1], [1, 0]] is invertible, yet its first pivot is 0 and plain elimination stalls immediately - a permutation (partial pivoting, PA = LU) is needed; this example is the standard GATE counterexample. Option C directly contradicts the requirement a11 != 0 (the 1x1 leading minor). Practical addendum the exam also tests: with the factorization in hand, each system Ax = b costs only two triangular solves - forward substitution for Ly = b, back substitution for Ux = y - so multiple right-hand sides amortize the expensive O(n^3) factorization."
        },
        {
          id: 'engmath-linear-algebra-q15',
          q: 'For what value of k does the system x + 2y = 3, 2x + 4y = k have infinitely many solutions?',
          options: ['k = 3', 'k = 6', 'Any value of k', 'No value of k'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "The coefficient matrix [[1, 2], [2, 4]] has proportional rows (rank 1, det = 0), so a unique solution is impossible for every k; the choice is between no solution and infinitely many. Consistency demands the augmented matrix also have rank 1, i.e. the second equation must be exactly twice the first: 2(x + 2y) = 2 x 3 requires k = 6. Then the two equations coincide and the solution set is the whole line x + 2y = 3. For any k != 6 the equations describe parallel, disjoint lines - rank of the augmented matrix jumps to 2 and there is no solution. This parameter-hunting pattern (singular coefficient matrix first, then match the right-hand side for consistency) is among the most repeated 2-mark templates in GATE linear algebra."
        },
        {
          id: 'engmath-linear-algebra-q16',
          q: 'If Q is an orthogonal matrix (Q^T Q = I), which of the following is NOT necessarily true?',
          options: ['det(Q) = +1 or -1', 'Q preserves vector lengths: ||Qx|| = ||x||', 'All eigenvalues of Q have absolute value 1', 'All entries of Q are 0, 1, or -1'],
          answer: 3,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Rotation matrices are the counterexample to option D: [[cos t, -sin t], [sin t, cos t]] is orthogonal for every angle, with entries like 0.6 and 0.8 (take the 3-4-5 rotation) - orthogonality constrains columns to be unit length and mutually perpendicular, not to contain special values. The rest are theorems. det: Q^T Q = I gives det(Q)^2 = 1. Lengths: ||Qx||^2 = (Qx)^T(Qx) = x^T Q^T Q x = x^T x = ||x||^2 - this is the defining geometric property (rigid motions). Eigenvalues: from Qv = tv, taking norms gives ||v|| = ||Qv|| = |t| ||v||, so |t| = 1 (complex eigenvalues like e^(it) occur for rotations). Permutation matrices - a GATE favourite - are the special orthogonal matrices that DO have only 0/1 entries."
        }
      ]
    }
]};

window.GATE_DATA.questions['engmath'].topics.push({
  id: 'engmath-calculus',
  name: 'Calculus',
  theory: {
    intro: "Calculus contributes some of the most predictable marks on the GATE CS&IT paper: a limit (often needing L'Hopital or a standard series expansion), a continuity/differentiability check on a piecewise function, a maxima-minima or Rolle/Mean-Value-Theorem application, and a definite integral. Unlike discrete math, these questions reward mechanical fluency - once you recognize the pattern (0/0 form, corner in a graph, critical point), the algebra is short. The recurring theme is behaviour at a point or on an interval: does a limit exist, does a function stay smooth, where does it peak, how much area lies under it. GATE rarely asks for a proof; it asks you to compute a number or classify a statement, so speed with standard limits, derivative rules and basic integrals matters more than theoretical depth. Treat this topic as high-yield practice of a small, fixed toolkit rather than open-ended problem solving.",
    core: "• Standard limits to memorize cold: lim_{x->0} sin x / x = 1, lim_{x->0} tan x / x = 1, lim_{x->0} (1-cos x)/x^2 = 1/2, lim_{x->0} (e^x - 1)/x = 1, lim_{x->0} ln(1+x)/x = 1, lim_{n->infinity} (1+1/n)^n = e, and more generally lim_{n->infinity} (1+k/n)^n = e^k. Recognizing these instantly (rather than re-deriving them) is the single biggest speed gain in this topic.\n\n• L'Hopital's rule applies only to 0/0 or infinity/infinity forms: lim f(x)/g(x) = lim f'(x)/g'(x) provided the right-hand limit exists. Other indeterminate forms - 0*infinity, infinity-infinity, 1^infinity, 0^0, infinity^0 - must first be algebraically converted to 0/0 or infinity/infinity (e.g. rewrite x ln x as ln x / (1/x); for 1^infinity forms take logarithms first: y = f(x)^{g(x)} => ln y = g(x) ln f(x), find the limit of ln y, then exponentiate). A very common GATE trap is applying L'Hopital to a limit that is not actually indeterminate - always verify the 0/0 or infinity/infinity form before differentiating.\n\n• Continuity at a point a requires three things to match: f(a) is defined, lim_{x->a} f(x) exists, and lim_{x->a} f(x) = f(a). For piecewise functions this means the left-hand limit, right-hand limit and the defined value at the junction must all agree; GATE frequently asks you to solve for an unknown parameter that forces this match.\n\n• Differentiability at a point requires the left-hand derivative and right-hand derivative to be equal and finite; differentiability implies continuity, but not conversely - |x| is continuous but not differentiable at 0 because the left derivative is -1 and the right derivative is +1. A subtler trap: a function can be differentiable everywhere (derivative exists at every point, including via the limit definition at a special point) yet have a derivative that is itself discontinuous there - this happens with functions built from x^2 sin(1/x)-type terms.\n\n• Rolle's Theorem: if f is continuous on [a,b], differentiable on (a,b), and f(a) = f(b), then there exists c in (a,b) with f'(c) = 0. All three hypotheses are essential - GATE loves testing functions that fail exactly one hypothesis (e.g. |x| on [-1,1] fails differentiability at 0, so Rolle's conclusion need not hold).\n\n• Mean Value Theorem (MVT) generalizes Rolle's: if f is continuous on [a,b] and differentiable on (a,b), there exists c in (a,b) with f'(c) = (f(b) - f(a))/(b - a). Geometrically, some tangent is parallel to the chord joining the endpoints.\n\n• Maxima and minima: at an interior critical point (f'(x) = 0 or f' undefined), the second derivative test classifies it - f''(x) < 0 gives a local maximum, f''(x) > 0 gives a local minimum, f''(x) = 0 is inconclusive (check higher derivatives or sign change of f'). For a function on a closed interval [a,b], the global maximum and minimum occur either at a critical point inside (a,b) or at one of the endpoints a, b - always check all candidates.\n\n• Definite integration: the Fundamental Theorem of Calculus gives integral_a^b f(x) dx = F(b) - F(a) where F' = f. Useful properties: integral_a^b f(x) dx = -integral_b^a f(x) dx; if f is odd, integral_{-a}^{a} f(x) dx = 0; if f is even, integral_{-a}^{a} f(x) dx = 2*integral_0^{a} f(x) dx; integration by parts, integral u dv = uv - integral v du, handles products like x*e^x or x*sin x. Area between two curves y = f(x) and y = g(x) (with f >= g on [a,b]) is integral_a^b (f(x) - g(x)) dx.",
    strategy: "Limits: first check the form by direct substitution. If you get a finite number, you are done - do not blindly reach for L'Hopital. If you get 0/0 or infinity/infinity, apply L'Hopital or a Taylor/Maclaurin expansion (often faster: e^x ~ 1+x+x^2/2, cos x ~ 1-x^2/2, ln(1+x) ~ x-x^2/2). For 1^infinity forms, always take logs first. Mini worked example: lim_{x->0} (cos x)^{1/x^2}. Take ln: L = ln(cos x)/x^2. Using cos x ~ 1 - x^2/2, ln(cos x) ~ -x^2/2, so L -> -1/2, and the original limit is e^{-1/2} = 1/sqrt(e).\n\nContinuity/differentiability on piecewise functions: write the left piece and right piece, set them equal at the junction point for continuity, and set their derivatives equal at the junction for differentiability - this typically gives one or two linear equations in the unknown constants. A classic trap function is f(x) = x^2 sin(1/x) for x != 0, f(0) = 0: using the definition of the derivative directly shows f'(0) = 0 exists, even though f'(x) for x != 0 oscillates and has no limit as x -> 0 - so f is differentiable at 0 but f' is not continuous there.\n\nRolle's/MVT questions on GATE are usually 'does this function satisfy the hypotheses' or 'find c' computations - always verify continuity and differentiability explicitly before invoking the conclusion, and compute f'(c) = slope of chord directly. Maxima-minima questions reduce to solving f'(x) = 0 and classifying with f''; for closed-interval global extrema, never forget to evaluate the endpoints. For integrals, spot symmetry (odd/even) before grinding through algebra - it can turn a page of work into 'the answer is 0' instantly."
  },
  questions: [
    {
      id: 'engmath-calculus-q1',
      q: 'What is lim_{x->0} sin(3x)/x ?',
      options: ['3', '1/3', '0', 'The limit does not exist'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "Write sin(3x)/x = 3 * sin(3x)/(3x). As x -> 0, 3x -> 0 too, and the standard limit lim_{u->0} sin u / u = 1 applies with u = 3x, giving sin(3x)/(3x) -> 1. Hence the whole expression tends to 3 * 1 = 3. In general, lim_{x->0} sin(kx)/x = k for any constant k - this scaling trick (multiply and divide by the coefficient inside the sine) is the fastest way to handle any variant of the basic sin x / x limit without invoking L'Hopital."
    },
    {
      id: 'engmath-calculus-q2',
      q: 'What is lim_{n->infinity} (1 + 3/n)^n ?',
      options: ['e^3', 'e^(1/3)', '3e', 'It diverges to infinity'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "This is the standard exponential limit lim_{n->infinity} (1 + k/n)^n = e^k, obtained by taking logarithms: ln[(1+k/n)^n] = n*ln(1+k/n) ~ n*(k/n) = k as n -> infinity (using ln(1+u) ~ u for small u), so the expression tends to e^k. Here k = 3, so the limit is e^3. This family of limits is a favourite GATE 1-mark question precisely because it looks like it should diverge (base slightly bigger than 1, raised to an infinite power) but actually converges to a finite, specific constant."
    },
    {
      id: 'engmath-calculus-q3',
      q: 'Evaluate lim_{x->0} (e^x - 1 - x) / x^2.',
      options: ['1/2', '1', '0', '2'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "Direct substitution gives 0/0, so L'Hopital applies: differentiate numerator and denominator to get (e^x - 1)/(2x), which is again 0/0 at x = 0. Apply L'Hopital once more: e^x / 2, which at x = 0 equals 1/2. Alternatively, use the Maclaurin series e^x = 1 + x + x^2/2 + x^3/6 + ...; then e^x - 1 - x = x^2/2 + x^3/6 + ..., and dividing by x^2 gives 1/2 + x/6 + ... which tends to 1/2 as x -> 0. The series method is faster once you have memorized e^x's expansion and avoids differentiating twice."
    },
    {
      id: 'engmath-calculus-q4',
      q: 'Evaluate lim_{x->0} (1 - cos x) / x^2.',
      options: ['1', '1/2', '0', '2'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "This is one of the standard limits worth memorizing directly. Using the half-angle identity 1 - cos x = 2 sin^2(x/2), the expression becomes 2 sin^2(x/2) / x^2 = (1/2) * [sin(x/2)/(x/2)]^2. As x -> 0, sin(x/2)/(x/2) -> 1, so the whole limit is (1/2)*1^2 = 1/2. Equivalently, L'Hopital twice on the 0/0 form gives sin x / (2x) -> cos x / 2 -> 1/2. Confusing this with lim sin x/x = 1 (forgetting the extra factor of 1/2 from the squared sine) is the most common slip."
    },
    {
      id: 'engmath-calculus-q5',
      q: 'What is lim_{x->0+} x ln x ?',
      options: ['0', '-infinity', '1', 'The limit does not exist'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "This is a 0*(-infinity) indeterminate form, so first rewrite it as a quotient: x ln x = ln x / (1/x), which as x -> 0+ is (-infinity)/(infinity), a valid form for L'Hopital. Differentiating: (ln x)' / (1/x)' = (1/x) / (-1/x^2) = -x. As x -> 0+, -x -> 0. So the limit is 0, meaning x ln x approaches 0 even though ln x itself plunges to -infinity - the x factor shrinks faster than ln x grows in magnitude. This result (x ln x -> 0 near the origin) is also the reason x ln x is often defined to be 0 at x = 0 in entropy-type formulas."
    },
    {
      id: 'engmath-calculus-q6',
      q: 'Which statement about f(x) = |x| at x = 0 is correct?',
      options: ['f is neither continuous nor differentiable at 0', 'f is continuous at 0 but not differentiable at 0', 'f is differentiable at 0 but not continuous at 0', 'f is both continuous and differentiable at 0'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "f(x) = |x| is continuous everywhere, including at 0, since lim_{x->0} |x| = 0 = f(0) from both sides. However, the left-hand derivative at 0 is lim_{h->0-} (|h|-0)/h = lim_{h->0-} (-h)/h = -1, while the right-hand derivative is lim_{h->0+} h/h = 1. Since these one-sided derivatives disagree (-1 != 1), f is not differentiable at 0 - the graph has a sharp corner there. This is the textbook example showing continuity does not imply differentiability, though the converse (differentiability implies continuity) always holds."
    },
    {
      id: 'engmath-calculus-q7',
      q: 'Let f(x) = x^2 sin(1/x) for x != 0 and f(0) = 0. Which statement is true?',
      options: ['f is not differentiable at 0 because f oscillates near 0', 'f is differentiable at 0 with f\'(0) = 0, but f\' is discontinuous at 0', 'f is discontinuous at 0', 'f is differentiable at 0 and f\' is also continuous at 0'],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'concept',
      explanation: "Using the definition of the derivative at 0: f'(0) = lim_{h->0} [f(h)-f(0)]/h = lim_{h->0} h^2 sin(1/h)/h = lim_{h->0} h sin(1/h) = 0, since sin(1/h) is bounded between -1 and 1 and h -> 0 (squeeze theorem). So f is differentiable at 0 with f'(0) = 0. But for x != 0, the product rule gives f'(x) = 2x sin(1/x) - cos(1/x); as x -> 0, the term -cos(1/x) oscillates forever between -1 and 1 with no limit, so f'(x) does not tend to f'(0) = 0 - f' exists everywhere but is discontinuous at 0. This is the classic GATE-style counterexample showing differentiability does not imply continuity of the derivative."
    },
    {
      id: 'engmath-calculus-q8',
      q: 'For f(x) = kx + 1 when x <= 2 and f(x) = 3x - 5 when x > 2 to be continuous at x = 2, k must equal:',
      options: ['0', '1', '-1', '2'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "Continuity at x = 2 requires the value from the left piece to match the limit from the right piece: left value is f(2) = k(2) + 1 = 2k + 1 (using the x <= 2 branch, which includes 2). The right-hand limit is lim_{x->2+} (3x-5) = 3(2) - 5 = 1. Setting them equal: 2k + 1 = 1, so 2k = 0 and k = 0. With k = 0, the left piece becomes the constant 1 near x = 2, matching the right piece's limit of 1 exactly, confirming continuity."
    },
    {
      id: 'engmath-calculus-q9',
      q: 'On the interval [-1, 1], consider f(x) = |x|. Which of the following correctly describes Rolle\'s theorem here?',
      options: ['Rolle\'s theorem guarantees a c in (-1,1) with f\'(c) = 0, and c = 0 works', 'Rolle\'s theorem does not apply because f is not differentiable at every point of (-1,1)', 'Rolle\'s theorem does not apply because f(-1) != f(1)', 'Rolle\'s theorem applies and guarantees infinitely many such c'],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'concept',
      explanation: "f(x) = |x| is continuous on [-1,1] and f(-1) = f(1) = 1, so two of Rolle's three hypotheses hold. But f is not differentiable at x = 0 (an interior point), so the differentiability-on-(a,b) hypothesis fails, and Rolle's theorem simply does not apply - it makes no guarantee either way. Indeed f'(x) is -1 for x<0 and +1 for x>0, and it is never 0 anywhere on (-1,1), confirming that the conclusion actually fails here. This illustrates why every hypothesis of Rolle's theorem must be checked before using its conclusion; GATE frequently builds distractor functions that fail exactly one hypothesis."
    },
    {
      id: 'engmath-calculus-q10',
      q: 'For f(x) = x^3 - 3x on [0, 2], the Mean Value Theorem guarantees some c in (0,2) with f\'(c) equal to the average rate of change. What is the value of c?',
      options: ['2/sqrt(3)', 'sqrt(3)', '1', '4/3'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "f is a polynomial, hence continuous and differentiable everywhere, so MVT applies. Average rate of change = [f(2)-f(0)]/(2-0) = [(8-6) - 0]/2 = 2/2 = 1. Now f'(x) = 3x^2 - 3, so set 3c^2 - 3 = 1, giving c^2 = 4/3 and c = 2/sqrt(3) (taking the positive root since c must lie in (0,2); note 2/sqrt(3) ~ 1.1547, which indeed lies in (0,2)). The negative root -2/sqrt(3) is rejected as it falls outside the interval."
    },
    {
      id: 'engmath-calculus-q11',
      q: 'For f(x) = x^3 - 3x^2, the local maximum occurs at x =',
      options: ['0', '2', '1', '-2'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'numerical',
      explanation: "f'(x) = 3x^2 - 6x = 3x(x-2), so critical points are x = 0 and x = 2. The second derivative is f''(x) = 6x - 6. At x = 0: f''(0) = -6 < 0, so this is a local maximum. At x = 2: f''(2) = 6 > 0, so this is a local minimum. Hence the local maximum is at x = 0 (with value f(0) = 0), and the local minimum is at x = 2 (with value f(2) = 8 - 12 = -4). This second-derivative classification is the standard, fast way to identify maxima and minima once critical points are found."
    },
    {
      id: 'engmath-calculus-q12',
      q: 'The absolute maximum value of f(x) = x^3 - 6x^2 + 9x + 1 on the closed interval [0, 5] is:',
      options: ['21', '5', '1', '9'],
      answer: 0,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x-1)(x-3), giving interior critical points x = 1 and x = 3, both inside [0,5]. Evaluate f at the critical points and both endpoints: f(0) = 1, f(1) = 1-6+9+1 = 5, f(3) = 27-54+27+1 = 1, and f(5) = 125-150+45+1 = 21. Comparing all four candidate values {1, 5, 1, 21}, the largest is 21, occurring at the right endpoint x = 5. This illustrates why global extrema on a closed interval must always be checked at the endpoints, not just at interior critical points - here the true maximum is not at a critical point at all."
    },
    {
      id: 'engmath-calculus-q13',
      q: 'Evaluate integral_0^{pi/2} sin^3(x) dx.',
      options: ['2/3', '1', 'pi/4', '1/3'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "Write sin^3 x = sin x * sin^2 x = sin x * (1 - cos^2 x). Substitute u = cos x, du = -sin x dx; when x=0, u=1, and when x=pi/2, u=0. The integral becomes integral_1^0 (1-u^2)*(-du) = integral_0^1 (1-u^2) du = [u - u^3/3]_0^1 = 1 - 1/3 = 2/3. This matches the Wallis-type reduction formula for odd powers of sine over [0, pi/2], which gives 2/3 for the cube - a result worth recognizing directly to skip the substitution in a timed exam."
    },
    {
      id: 'engmath-calculus-q14',
      q: 'What is integral_{-2}^{2} (x^3 + x*cos(x)) dx ?',
      options: ['0', '4', '16', 'Cannot be determined without more information'],
      answer: 0,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: "Check the parity of the integrand over the symmetric interval [-2,2]. x^3 is odd (replacing x by -x negates it). For x*cos(x): x is odd and cos(x) is even, and odd*even = odd, so x*cos(x) is also odd. The sum of two odd functions is odd. For any odd function g, integral_{-a}^{a} g(x) dx = 0, because the positive and negative halves of the interval contribute exactly cancelling areas. So the whole integral is 0 without any actual integration - recognizing odd/even symmetry instantly resolves definite integrals over symmetric limits like this one."
    },
    {
      id: 'engmath-calculus-q15',
      q: 'Evaluate integral_0^1 x*e^x dx.',
      options: ['1', 'e', 'e - 1', '0'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "Use integration by parts with u = x, dv = e^x dx, so du = dx and v = e^x: integral x e^x dx = x e^x - integral e^x dx = x e^x - e^x + C = e^x(x-1) + C. Evaluate from 0 to 1: at x=1, e^1*(1-1) = e*0 = 0; at x=0, e^0*(0-1) = 1*(-1) = -1. So the definite integral is 0 - (-1) = 1. This x*e^x pattern (polynomial times exponential) is one of the most frequently tested integration-by-parts setups on GATE."
    },
    {
      id: 'engmath-calculus-q16',
      q: 'What is the area of the region enclosed between the curves y = x and y = x^2, for 0 <= x <= 1?',
      options: ['1/6', '1/2', '1/3', '1'],
      answer: 0,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "First find where the curves cross on [0,1]: x = x^2 gives x(1-x) = 0, so x = 0 and x = 1, meaning the two curves bound a single region over the whole interval. On (0,1), x > x^2 (e.g. at x = 0.5, 0.5 > 0.25), so the line lies above the parabola there. The area is integral_0^1 (x - x^2) dx = [x^2/2 - x^3/3]_0^1 = (1/2 - 1/3) - 0 = 1/6. A common error is integrating x^2 - x instead (getting a negative area) by not first checking which curve is on top over the interval."
    },
    {
      id: 'engmath-calculus-q17',
      q: 'What is lim_{x->0} (cos x)^{1/x^2} ?',
      options: ['1/sqrt(e)', 'sqrt(e)', '1', '0'],
      answer: 0,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "This is a 1^infinity indeterminate form, so take logarithms first. Let y = (cos x)^{1/x^2}; then ln y = ln(cos x) / x^2. Using the small-angle expansion cos x ~ 1 - x^2/2 for x near 0, ln(cos x) ~ ln(1 - x^2/2) ~ -x^2/2 (using ln(1+u) ~ u for small u). So ln y ~ (-x^2/2)/x^2 = -1/2, meaning lim_{x->0} ln y = -1/2. Exponentiating, the original limit is e^{-1/2} = 1/sqrt(e). Whenever you see base -> 1 and exponent -> infinity (a 1^infinity form), converting to logs before applying series expansions or L'Hopital is the reliable, systematic approach."
    }
  ]
});

window.GATE_DATA.questions['engmath'].topics.push({
  id: 'engmath-probability',
  name: 'Probability',
  theory: {
    intro: "Probability is one of the two or three highest-yield engineering-mathematics topics on GATE CS&IT, appearing almost every year as both 1-mark concept checks and 2-mark numericals. It underlies randomized algorithms, machine learning, queueing and reliability analysis, so examiners test it heavily. The core skill set is small but must be automatic: the basic axioms and set-style manipulations (union, complement), conditional probability and Bayes' theorem (especially the classic disease-test and multi-box setups), independence, the standard named random variables (binomial, Poisson, uniform, exponential, normal) with their means and variances, and the linearity properties of expectation and variance. GATE questions rarely require deep probability theory; they require recognizing which of these five or six formulas applies and plugging in numbers cleanly and quickly, without arithmetic slips - so fluency with the formulas matters far more than derivations.",
    core: "• Axioms: for any event A, 0 <= P(A) <= 1, P(sample space) = 1, and for mutually exclusive events P(A union B) = P(A) + P(B). The complement rule P(A') = 1 - P(A) is used constantly to compute 'at least one' probabilities. The general addition rule for any two events is P(A union B) = P(A) + P(B) - P(A intersect B), subtracting the double-counted overlap.\n\n• Conditional probability: P(A|B) = P(A intersect B) / P(B), defined whenever P(B) > 0; it is the probability of A restricted to the world where B is known to have happened. Rearranging gives the multiplication rule P(A intersect B) = P(A|B) * P(B) = P(B|A) * P(A), useful for building up joint probabilities from a sequence of conditional steps (as in a tree diagram).\n\n• Law of total probability: if B1, B2, ..., Bn partition the sample space (mutually exclusive, exhaustive), then P(A) = sum over i of P(A|Bi) * P(Bi). This is the standard way to compute an overall probability when the world splits into distinct cases (e.g. drawing from one of several boxes, or a population split into diseased/healthy).\n\n• Bayes' theorem: P(Bi|A) = P(A|Bi) * P(Bi) / P(A), where the denominator P(A) is expanded via the law of total probability. GATE's favourite dressing for this is the medical-test problem: given a disease prevalence P(D), a test sensitivity P(positive|D), and a false-positive rate P(positive|not D), find P(D|positive) - the answer is often surprisingly small even for an accurate-sounding test, because a rare disease means most positives come from the much larger healthy population.\n\n• Independence: events A and B are independent iff P(A intersect B) = P(A) * P(B), equivalently P(A|B) = P(A). Independence must be verified (or given), never assumed from the problem's phrasing alone; a common trap is disjoint (mutually exclusive) events being mistaken for independent ones - in fact, two events with nonzero probability that are mutually exclusive are always dependent, since knowing one occurred makes the other impossible.\n\n• Random variables and standard distributions. Discrete: Bernoulli(p) has mean p and variance p(1-p). Binomial(n,p) counts successes in n independent Bernoulli trials: P(X=k) = C(n,k) p^k (1-p)^{n-k}, mean np, variance np(1-p). Geometric(p) counts trials to the first success: P(X=k) = (1-p)^{k-1} p, mean 1/p. Poisson(lambda) models rare events in a fixed interval: P(X=k) = e^{-lambda} lambda^k / k!, with the special property mean = variance = lambda.\n\n• Continuous: Uniform(a,b) has constant density 1/(b-a) on [a,b], mean (a+b)/2, variance (b-a)^2/12. Exponential(lambda) has density lambda*e^{-lambda x} for x>=0, mean 1/lambda, variance 1/lambda^2, and the defining memoryless property P(X > s+t | X > s) = P(X > t). Normal(mu, sigma^2) is the bell curve with mean mu and variance sigma^2; roughly 68% of its mass lies within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3 (the empirical or '68-95-99.7' rule); the standard normal has mu=0, sigma=1.\n\n• Expectation and variance: E[X] = sum x*P(X=x) (or integral x*f(x) dx for continuous X). Linearity always holds, independence or not: E[aX+bY+c] = a*E[X] + b*E[Y] + c. Variance: Var(X) = E[X^2] - (E[X])^2, and Var(aX+b) = a^2 * Var(X) (adding a constant shifts the mean but never changes spread). For independent X and Y, Var(X+Y) = Var(X) + Var(Y) and E[XY] = E[X]*E[Y]; neither identity holds in general when X and Y are dependent.\n\n• Mean, median, mode: the mean is the arithmetic average, the median is the middle value (50th percentile), and the mode is the most frequent value. For a symmetric unimodal distribution (like the normal), all three coincide. For a right-skewed (long right tail) distribution, mean > median > mode; for a left-skewed distribution, the inequalities reverse: mean < median < mode.",
    strategy: "The exam's most heavily tested pattern is Bayes' theorem in a disease-test or box/urn disguise. Always build the calculation in three explicit lines: (1) the prior probabilities of each case, (2) the conditional probability of the observed evidence under each case, (3) combine via the law of total probability for the denominator, then divide. Mini worked example: a factory's machine A produces 60% of items with a 2% defect rate, machine B produces 40% with a 5% defect rate; given a random item is defective, P(from A) = P(defective|A)*P(A) / [P(defective|A)*P(A) + P(defective|B)*P(B)] = (0.02*0.6)/(0.02*0.6 + 0.05*0.4) = 0.012/0.032 = 0.375. Writing out numerator and denominator separately (never trying to do it in your head) avoids the arithmetic slip that costs most Bayes questions.\n\nFor expectation-of-waiting-time questions (expected number of coin tosses until an event), set up a state-based recursion: let E be the expected additional trials from the 'no progress' state; each state's equation is 1 (for the trial just taken) plus a weighted average of where you land next. This handles 'first head' (mean 1/p) and the harder 'first HH' (mean 6 for a fair coin) equally well, and generalizes beyond memorized formulas.\n\nFor distribution questions, first identify which of the five named distributions fits the story (counting successes in fixed trials => binomial; counting rare events over an interval => Poisson; time until an event under memorylessness => exponential; equally likely over a range => uniform), then simply plug into its known mean/variance formula - do not re-derive from the definition under time pressure. For linearity-of-expectation questions, remember it needs no independence assumption at all, which is what makes it such a powerful shortcut for sums of possibly-dependent indicator variables (a technique widely used in randomized algorithm analysis)."
  },
  questions: [
    {
      id: 'engmath-probability-q1',
      q: 'If P(A) = 0.4, P(B) = 0.5 and P(A intersect B) = 0.1, what is P(A union B)?',
      options: ['0.8', '0.9', '0.5', '1.0'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'numerical',
      explanation: "The general addition rule states P(A union B) = P(A) + P(B) - P(A intersect B), where the last term corrects for the overlap being counted twice when you simply add P(A) and P(B). Substituting: 0.4 + 0.5 - 0.1 = 0.8. If A and B were mutually exclusive (P(A intersect B) = 0), you could add directly, but here the events overlap, so the subtraction is essential - forgetting it and adding 0.4+0.5=0.9 is the most common error on this exact question type."
    },
    {
      id: 'engmath-probability-q2',
      q: 'If P(A intersect B) = 0.2 and P(B) = 0.4, what is P(A|B)?',
      options: ['0.5', '0.8', '0.2', '0.08'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "By definition, conditional probability is P(A|B) = P(A intersect B)/P(B) = 0.2/0.4 = 0.5. This says that among the outcomes where B has occurred, half of them also have A occurring. A frequent confusion is dividing the wrong way (computing P(B)/P(A intersect B) or P(B|A) instead) - always divide the joint probability by the probability of the event you are conditioning ON (the one after the vertical bar)."
    },
    {
      id: 'engmath-probability-q3',
      q: 'Events A and B satisfy P(A) = 0.5, P(B) = 0.4, and P(A intersect B) = 0.2. Which statement is correct?',
      options: ['A and B are independent', 'A and B are mutually exclusive', 'A and B are neither independent nor mutually exclusive', 'Not enough information to decide'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'concept',
      explanation: "Independence requires P(A intersect B) = P(A)*P(B). Here P(A)*P(B) = 0.5*0.4 = 0.2, which exactly equals the given P(A intersect B) = 0.2, so A and B are independent. They are clearly not mutually exclusive, since mutually exclusive events would require P(A intersect B) = 0, but it is 0.2 here. This question tests the precise definitional check for independence rather than an intuitive guess - always compute P(A)*P(B) and compare it numerically to the given joint probability."
    },
    {
      id: 'engmath-probability-q4',
      q: 'A disease affects 1% of a population. A screening test has 99% sensitivity (correctly detects the disease when present) and 95% specificity (correctly gives a negative result when the disease is absent). If a random person tests positive, what is the probability they actually have the disease?',
      options: ['Approximately 16.7%', 'Approximately 99%', 'Approximately 95%', 'Approximately 50%'],
      answer: 0,
      marks: 2,
      difficulty: 'hard',
      type: 'pyq-style',
      explanation: "Let D = has disease, Pos = tests positive. P(D)=0.01, P(Pos|D)=0.99, and since specificity is 95%, the false-positive rate is P(Pos|not D)=0.05, with P(not D)=0.99. By the law of total probability, P(Pos) = P(Pos|D)P(D) + P(Pos|not D)P(not D) = 0.99*0.01 + 0.05*0.99 = 0.0099 + 0.0495 = 0.0594. By Bayes' theorem, P(D|Pos) = P(Pos|D)P(D)/P(Pos) = 0.0099/0.0594 = 1/6 ~ 0.1667, i.e. about 16.7%. This is the single most important intuition-check in probability: even a seemingly accurate 99%/95% test gives a mostly-false alarm when the underlying condition is rare, because the large healthy population still contributes many false positives in absolute terms."
    },
    {
      id: 'engmath-probability-q5',
      q: 'Box 1 contains 3 red and 2 blue balls; Box 2 contains 1 red and 4 blue balls. A box is chosen at random (equal chance) and a ball is drawn, which turns out to be red. What is the probability the ball came from Box 1?',
      options: ['0.75', '0.6', '0.5', '0.4'],
      answer: 0,
      marks: 2,
      difficulty: 'hard',
      type: 'pyq-style',
      explanation: "P(Box1)=P(Box2)=0.5. P(Red|Box1)=3/5=0.6, P(Red|Box2)=1/5=0.2. By the law of total probability, P(Red) = 0.5*0.6 + 0.5*0.2 = 0.3 + 0.1 = 0.4. By Bayes' theorem, P(Box1|Red) = P(Red|Box1)*P(Box1)/P(Red) = (0.6*0.5)/0.4 = 0.3/0.4 = 0.75. The key structure to notice is that Box 1 both has the higher chance of producing red AND is equally likely to have been chosen, so observing red should shift belief substantially toward Box 1 - which the 0.75 answer confirms (up from the 0.5 prior)."
    },
    {
      id: 'engmath-probability-q6',
      q: 'A fair coin is tossed repeatedly until the first head appears. What is the expected number of tosses?',
      options: ['2', '1', '0.5', '4'],
      answer: 0,
      marks: 1,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "The number of tosses until the first head follows a geometric distribution with success probability p = 0.5, whose mean is 1/p. Here that gives 1/0.5 = 2. This can also be derived from a simple recursion: let E be the expected number of tosses; with probability 0.5 the first toss is heads (done in 1 toss), and with probability 0.5 it is tails, costing 1 toss and restarting the same problem, giving E = 1 + 0.5*0 + 0.5*E, so 0.5E = 1 and E = 2. This 1/p formula for 'trials until first success' is one of the most reusable results in GATE probability."
    },
    {
      id: 'engmath-probability-q7',
      q: 'A fair coin is tossed repeatedly until two consecutive heads (HH) appear for the first time. What is the expected number of tosses?',
      options: ['6', '4', '3', '2'],
      answer: 0,
      marks: 2,
      difficulty: 'hard',
      type: 'pyq-style',
      explanation: "Define state S0 (no useful progress: start, or last toss was T) and state S1 (last toss was H, one more H needed). Let E0, E1 be the expected further tosses from each state. From S0: E0 = 1 + 0.5*E1 + 0.5*E0, which simplifies to E0 = 2 + E1. From S1: E1 = 1 + 0.5*0 + 0.5*E0 (a head finishes; a tail sends you back to S0), i.e. E1 = 1 + 0.5*E0. Substituting: E0 = 2 + 1 + 0.5*E0 = 3 + 0.5*E0, so 0.5*E0 = 3 and E0 = 6. This state-recursion technique is essential whenever the stopping condition depends on a run or pattern rather than a single event, and 6 is the well-known answer for expected tosses to first HH with a fair coin."
    },
    {
      id: 'engmath-probability-q8',
      q: 'X follows a Binomial distribution with n = 10 trials and success probability p = 0.3. What is E[X]?',
      options: ['3', '7', '0.3', '2.1'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "For a Binomial(n,p) random variable, the mean is simply E[X] = n*p, since X is the sum of n independent Bernoulli(p) trials and expectation is linear (E[sum] = sum of E[each], each contributing p). Here E[X] = 10*0.3 = 3. The variance, by contrast, is n*p*(1-p) = 10*0.3*0.7 = 2.1 - note that 2.1 is the variance, not the mean, and is a common distractor for students who confuse the two formulas."
    },
    {
      id: 'engmath-probability-q9',
      q: 'A fair coin is tossed 4 times. What is the probability of getting exactly 2 heads?',
      options: ['0.375', '0.25', '0.5', '0.0625'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "This is Binomial(n=4, p=0.5). P(X=2) = C(4,2) * (0.5)^2 * (0.5)^2 = 6 * 0.25 * 0.25 = 6/16 = 0.375. The combinatorial factor C(4,2)=6 counts the number of ways to choose which 2 of the 4 tosses are heads (e.g. HHTT, HTHT, HTTH, THHT, THTH, TTHH), and each specific sequence of 2 heads and 2 tails has probability (0.5)^4 = 1/16, so the total is 6/16. A common slip is forgetting the combinatorial factor and just computing (0.5)^4 = 0.0625, which is the probability of one specific sequence, not 'exactly 2 heads' overall."
    },
    {
      id: 'engmath-probability-q10',
      q: 'A random variable X follows a Poisson distribution with mean 4. What is Var(X)?',
      options: ['4', '2', '16', '0.25'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "The Poisson distribution has the distinctive property that its mean and variance are always equal to the same parameter, lambda. Since the mean is given as 4, lambda = 4, and therefore Var(X) = lambda = 4 as well. This mean-equals-variance property is unique among the commonly tested distributions and is frequently used directly as a 1-mark identification question - if a problem states both the mean and variance of a distribution are equal, it is very likely describing a Poisson random variable."
    },
    {
      id: 'engmath-probability-q11',
      q: 'The number of typos on a page follows a Poisson distribution with mean 2 per page. What is the probability that a randomly chosen page has zero typos?',
      options: ['e^{-2} (approximately 0.135)', 'e^{-2}/2', '1 - e^{-2}', '0.5'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "For Poisson(lambda), P(X=k) = e^{-lambda} * lambda^k / k!. With lambda = 2 and k = 0: P(X=0) = e^{-2} * 2^0 / 0! = e^{-2} * 1 / 1 = e^{-2}, which numerically is about 0.1353. Note 0! = 1 and 2^0 = 1, so the formula collapses cleanly for k=0 - a useful shortcut to remember is that P(X=0) for any Poisson(lambda) is always just e^{-lambda}, with no other terms to compute."
    },
    {
      id: 'engmath-probability-q12',
      q: 'X is uniformly distributed on the interval [2, 10]. What is E[X]?',
      options: ['6', '5', '8', '4'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "For a Uniform(a,b) random variable, the density is constant across the interval, so by symmetry the mean is simply the midpoint: E[X] = (a+b)/2. Here (2+10)/2 = 12/2 = 6. This midpoint rule works because the uniform density is symmetric about the center of the interval, so the average value of X is exactly that center point, with no integration needed for a quick 1-mark question."
    },
    {
      id: 'engmath-probability-q13',
      q: 'X is uniformly distributed on the interval [0, 6]. What is Var(X)?',
      options: ['3', '6', '1', '9'],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "For a Uniform(a,b) random variable, the variance formula is Var(X) = (b-a)^2 / 12. Here b - a = 6 - 0 = 6, so Var(X) = 6^2/12 = 36/12 = 3. This formula is worth memorizing directly, since deriving it from Var(X) = E[X^2] - (E[X])^2 by integration under time pressure is slower and more error-prone than simply substituting into (b-a)^2/12."
    },
    {
      id: 'engmath-probability-q14',
      q: 'The lifetime of a component follows an exponential distribution with mean 5 years. What is the probability that the component lasts more than 10 years?',
      options: ['e^{-2} (approximately 0.135)', 'e^{-0.5}', '0.5', '1 - e^{-2}'],
      answer: 0,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "For Exponential(lambda), the mean is 1/lambda, so a mean of 5 gives lambda = 1/5 = 0.2. The survival probability is P(X > t) = e^{-lambda*t}. Here P(X > 10) = e^{-0.2*10} = e^{-2}, approximately 0.135. A related and equally testable fact is the memoryless property: given the component has already survived s years, the probability it survives t more years is still e^{-lambda*t}, exactly as if it were brand new - so P(X > 15 | X > 5) would also equal e^{-0.2*10} = e^{-2}, the same value as this unconditional computation."
    },
    {
      id: 'engmath-probability-q15',
      q: 'For a Normal (Gaussian) distribution, approximately what percentage of the data lies within 2 standard deviations of the mean?',
      options: ['95%', '68%', '99.7%', '50%'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "This is the empirical rule (also called the 68-95-99.7 rule) for normal distributions: about 68% of the data lies within 1 standard deviation of the mean, about 95% within 2 standard deviations, and about 99.7% within 3 standard deviations. These approximate percentages come from integrating the normal density over the corresponding z-ranges and are worth memorizing as quick reference points, since GATE often tests recognition of these figures directly rather than requiring a z-table lookup."
    },
    {
      id: 'engmath-probability-q16',
      q: 'If Var(X) = 4, what is Var(3X + 5)?',
      options: ['36', '17', '9', '4'],
      answer: 0,
      marks: 1,
      difficulty: 'hard',
      type: 'concept',
      explanation: "Variance is unaffected by adding a constant (shifting the distribution does not change its spread) but scales by the square of a multiplicative constant: Var(aX + b) = a^2 * Var(X). Here a = 3 and b = 5, so Var(3X+5) = 3^2 * Var(X) = 9 * 4 = 36. A common error is forgetting to square the coefficient (giving 3*4=12, not an option here but a frequent mistake elsewhere) or incorrectly including the additive constant 5 in the variance calculation - constants shift the mean E[3X+5] = 3E[X]+5 but never affect the variance."
    },
    {
      id: 'engmath-probability-q17',
      q: 'X and Y are independent random variables with E[X] = 3 and E[Y] = 5. What is E[XY]?',
      options: ['15', '8', '3', '5'],
      answer: 0,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: "For independent random variables, E[XY] = E[X] * E[Y], since independence means the joint distribution factors as the product of the marginals, and the expectation of a product of independent variables is the product of their expectations. Here E[XY] = 3 * 5 = 15. It is important to note this identity generally FAILS when X and Y are dependent (in that case E[XY] can differ from E[X]E[Y] by an amount related to their covariance); the independence assumption given in the problem is what licenses this shortcut, in contrast to linearity of expectation E[X+Y]=E[X]+E[Y], which holds unconditionally regardless of independence."
    },
    {
      id: 'engmath-probability-q18',
      q: 'A distribution has a long tail extending to the right (right-skewed), such as typical income data. Which ordering of its mean, median and mode is expected?',
      options: ['mean > median > mode', 'mean < median < mode', 'mean = median = mode', 'mode > mean > median'],
      answer: 0,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: "In a right-skewed distribution, a small number of unusually large values pull the mean upward more strongly than they affect the median (which only depends on the middle-ranked value, not on how extreme the tail values are), while the mode stays at the most frequent (typically lower) value. This produces the ordering mean > median > mode. For a symmetric distribution like the normal, all three coincide (mean = median = mode); for a left-skewed distribution, the inequalities reverse to mean < median < mode. Income distributions are the standard real-world example of right skew, since a few very high earners pull the average above the typical (median) income."
    }
  ]
});

window.GATE_DATA.questions['engmath'].topics.find(function(t){return t.id==='engmath-discrete-logic';}).theory.deep = 'DEFINITIONS\n\n• Proposition: a declarative sentence that is unambiguously true or false. Atomic propositions p, q, r,... combine via connectives: negation ~p, conjunction p AND q, disjunction p OR q, XOR (exclusive or), implication p -> q, biconditional p <-> q.\n\n• Truth table of implication p -> q: TRUE except when p=T, q=F. This is the single most misapplied rule; a false hypothesis makes ANY implication vacuously true.\n\n• Well-formed formula (wff): built recursively from atoms and connectives following precedence ~ > AND > OR > -> > <->. Parentheses override.\n\n• Predicate logic adds: predicates P(x), quantifiers forall (universal) and exists (existential), a domain of discourse, free vs bound variables.\n\nKEY EQUIVALENCES (memorize as identities)\n\n• p -> q == ~p OR q\n• Contrapositive: p -> q == ~q -> ~p (LOGICALLY EQUIVALENT)\n• Converse: q -> p; Inverse: ~p -> ~q. Converse == Inverse to each other, but NEITHER is equivalent to the original.\n• p <-> q == (p -> q) AND (q -> p) == (p AND q) OR (~p AND ~q)\n• De Morgan: ~(p AND q) == ~p OR ~q; ~(p OR q) == ~p AND ~q\n• Distributive: p AND (q OR r) == (p AND q) OR (p AND r); p OR (q AND r) == (p OR q) AND (p OR r)\n• Absorption: p OR (p AND q) == p; p AND (p OR q) == p\n• Idempotent: p AND p == p; p OR p == p\n• Exportation: (p AND q) -> r == p -> (q -> r)\n• Double negation: ~~p == p\n\nKEY THEOREMS / VALID ARGUMENT FORMS\n\n• Modus Ponens: (p -> q), p |= q\n• Modus Tollens: (p -> q), ~q |= ~p\n• Hypothetical Syllogism: (p -> q), (q -> r) |= p -> r\n• Disjunctive Syllogism: (p OR q), ~p |= q\n• INVALID (common traps): Affirming the consequent - (p -> q), q |/= p. Denying the antecedent - (p -> q), ~p |/= q.\n\nCLASSIFICATION: tautology (true in every row), contradiction (false in every row), contingency (mixed). Satisfiable = true in at least one row. Every tautology is satisfiable; a satisfiable formula need not be a tautology.\n\nFUNCTIONAL COMPLETENESS\n\nA connective set is functionally complete if it expresses every Boolean function. Complete: {AND, NOT}, {OR, NOT}, {NAND} alone, {NOR} alone, {->, NOT}. NOT complete: {AND, OR} (monotone, cannot express NOT), {XOR, AND} without NOT is affine-only style limits in some framings, but the standard GATE fact is {AND, OR} and {XOR, AND, OR} without a constant/NOT cannot express negation-based functions requiring it - the safest memorized fact is: {AND,OR} alone is NOT complete; NAND alone and NOR alone ARE each complete.\n\nFIRST-ORDER LOGIC RULES\n\n• Negating quantifiers: ~forall x P(x) == exists x ~P(x); ~exists x P(x) == forall x ~P(x)\n• Quantifier order is NOT interchangeable: exists y forall x P(x,y) => forall x exists y P(x,y) is a valid implication, but the converse FAILS. Classic reading: \"there exists a common mother for everyone\" is stronger than \"everyone has (possibly different) a mother\".\n• Distribution: forall x (P(x) AND Q(x)) == (forall x P(x)) AND (forall x Q(x)). exists x (P(x) OR Q(x)) == (exists x P(x)) OR (exists x Q(x)). forall does NOT distribute over OR (only forall x P(x) OR forall x Q(x) => forall x (P(x) OR Q(x)), one direction). exists does NOT distribute over AND (only the reverse one-directional implication holds).\n• Translation convention (heavily tested): universal statements use ->; existential statements use AND. \"All students pass\": forall x (Student(x) -> Pass(x)). WRONG: forall x (Student(x) AND Pass(x)) - this wrongly asserts everyone in the domain is a passing student. \"Some student passes\": exists x (Student(x) AND Pass(x)). WRONG: exists x (Student(x) -> Pass(x)) - this is trivially satisfiable by any non-student.\n• Validity in FOL = true under every interpretation/domain. To disprove validity or an equivalence claim, exhibit ONE interpretation (often domain = {two integers}, predicate = \"less than\") where it fails.\n\nWORKED EXAMPLE 1\n\nCheck if ((p -> q) AND (q -> r)) -> (p -> r) is a tautology.\nFalsification approach: assume the whole formula is false, i.e. antecedent true and consequent false.\nConsequent false means p -> r is false, so p = T, r = F.\nAntecedent true means (p->q) = T and (q->r) = T. With p = T, p->q = T forces q = T. With q = T and r = F, q->r = F. This contradicts (q->r) = T required above.\nNo satisfying assignment for falsity exists, so the formula is a TAUTOLOGY (this is Hypothetical Syllogism).\n\nWORKED EXAMPLE 2\n\nHow many satisfying assignments does (p OR q) -> r have over p, q, r (2^3 = 8 total rows)?\n(p OR q) -> r is false only when (p OR q) = T and r = F. p OR q is true in 3 of 4 (p,q) combinations (all except p=F,q=F), so false rows = 3 (all with r=F). True rows = 8 - 3 = 5.\nAnswer: 5 satisfying assignments.\n\nTRAP FACTS GATE LOVES\n\n• A false hypothesis makes an implication vacuously TRUE - many students wrongly mark such rows as false.\n• Converse and inverse are equivalent to EACH OTHER, not to the original conditional.\n• \"p only if q\" translates to p -> q (not q -> p) - a very common reversal error.\n• \"p unless q\" translates to ~q -> p (equivalently p OR q).\n• \"q is necessary for p\" means p -> q; \"q is sufficient for p\" means q -> p.\n• Quantifier order swap (exists-forall vs forall-exists) changes meaning; only one direction of implication holds between them.\n• {AND, OR} alone cannot express negation - it is NOT functionally complete despite feeling like \"basic\" logic.\n• A tautology is always satisfiable, but a satisfiable formula (true in even just one row) need NOT be a tautology - do not conflate the two.\n• Exportation lets you rewrite (p AND q) -> r as p -> (q -> r); students often forget this valid rewriting shortcut and waste time on truth tables.';

window.GATE_DATA.questions['engmath'].topics.find(function(t){return t.id==='engmath-sets-relations';}).theory.deep = 'DEFINITIONS\n\n• Set: unordered collection of distinct elements. |A| denotes cardinality. Power set P(A) = set of all subsets, |P(A)| = 2^|A|.\n• Cartesian product A x B = {(a,b) : a in A, b in B}, |A x B| = |A|*|B|.\n• Relation R from A to B is a subset of A x B. A relation on A is a subset of A x A.\n• Function f: A -> B assigns exactly one element of B to each element of A. Injective (one-one): distinct inputs map to distinct outputs. Surjective (onto): every element of B is hit. Bijective: both (a one-to-one correspondence, invertible).\n\nSET IDENTITIES\n\n• De Morgan: (A union B)^c = A^c intersect B^c; (A intersect B)^c = A^c union B^c\n• Distributive: A intersect (B union C) = (A intersect B) union (A intersect C); A union (B intersect C) = (A union B) intersect (A union C)\n• Inclusion-Exclusion (2 sets): |A union B| = |A| + |B| - |A intersect B|\n• Inclusion-Exclusion (3 sets): |A union B union C| = |A|+|B|+|C| - |A intersect B| - |B intersect C| - |A intersect C| + |A intersect B intersect C|\n• A - B = A intersect B^c. Symmetric difference A XOR B = (A-B) union (B-A) = (A union B) - (A intersect B).\n\nPROPERTIES OF RELATIONS ON A SET A\n\n• Reflexive: for all a in A, (a,a) in R.\n• Irreflexive: for all a in A, (a,a) NOT in R.\n• Symmetric: (a,b) in R => (b,a) in R.\n• Antisymmetric: (a,b) in R AND (b,a) in R => a = b. (Note: antisymmetric does NOT forbid (a,a) pairs, and a relation CAN be both symmetric and antisymmetric simultaneously - this happens exactly when R is a subset of the identity relation.)\n• Transitive: (a,b) in R AND (b,c) in R => (a,c) in R.\n• Equivalence relation: reflexive + symmetric + transitive. Partitions A into disjoint equivalence classes [a] = {x : xRa}; the classes cover A exactly (every element in exactly one class).\n• Partial order (poset): reflexive + antisymmetric + transitive. Elements may be incomparable. Total/linear order: partial order where every pair is comparable.\n• Hasse diagram: drawn for posets, omits reflexive loops and transitive edges, shows only covering relations, edges go upward.\n\nKEY THEOREMS\n\n• Number of relations on a set of size n = 2^(n^2) (subsets of A x A which has n^2 elements).\n• Number of reflexive relations on size n = 2^(n^2 - n) (diagonal n pairs forced in, remaining n^2-n free).\n• Number of symmetric relations on size n = 2^(n(n+1)/2) (n diagonal pairs free, and off-diagonal pairs come in n(n-1)/2 mirrored pairs, each pair chosen together).\n• Number of equivalence relations on a set of size n = Bell number B(n). B(1)=1, B(2)=2, B(3)=5, B(4)=15, B(5)=52. Equivalently, number of ways to partition a set of size n; equals sum over k of Stirling numbers of the second kind S(n,k).\n• Pigeonhole principle: if n items are placed into k boxes with n > k, some box has at least 2 items. Generalized: some box has at least ceil(n/k) items.\n• A function has an inverse iff it is bijective.\n• Composition of bijections is a bijection; composition of injections is injective; composition of surjections is surjective.\n• Cantor: |P(A)| > |A| always (strict), even for infinite sets - so there is no largest infinite set.\n• Schroder-Bernstein: if there is an injection A->B and an injection B->A, then there is a bijection A<->B (used to prove |Q| = |N|, i.e. rationals are countable).\n\nCOMPARISON TABLE: relation properties quick reference\nProperty        | Diagonal (a,a) required? | Off-diagonal condition\nReflexive       | YES (all present)         | none\nIrreflexive     | NO (all absent)           | none\nSymmetric       | no requirement            | (a,b) in R iff (b,a) in R\nAntisymmetric   | no requirement            | cannot have both (a,b),(b,a) unless a=b\nTransitive      | no requirement            | chains must close\n\nWORKED EXAMPLE 1\n\nLet A = {1,2,3}. How many equivalence relations exist on A?\nThis equals the number of partitions of a 3-element set = Bell number B(3) = 5.\nList them: {1}{2}{3} (all singleton); {1,2}{3}; {1,3}{2}; {2,3}{1}; {1,2,3} (all together). That is 5 partitions, confirming B(3) = 5.\n\nWORKED EXAMPLE 2\n\nIn a class of 30 students, 18 play cricket, 15 play football, and 8 play both. How many play neither?\n|C union F| = |C| + |F| - |C intersect F| = 18 + 15 - 8 = 25.\nNeither = Total - |C union F| = 30 - 25 = 5 students play neither sport.\n\nTRAP FACTS GATE LOVES\n\n• A relation CAN be simultaneously symmetric and antisymmetric (e.g., the identity relation, or any subset of it) - many students think these are mutually exclusive.\n• A relation that is symmetric and transitive is NOT automatically reflexive unless every element appears in some related pair (a classic \"broken proof\" GATE tests: the argument xRy, yRx (symmetric) then xRx (transitive) fails if x has no y with xRy at all).\n• Number of equivalence relations grows fast and non-obviously: B(4) = 15, not a small guessable number - memorize 1,2,5,15,52 for n=1..5.\n• |P(A)| = 2^|A| includes the empty set and A itself - both are always counted as subsets.\n• Countable infinite sets (like Q, Z) have the SAME cardinality as N, even though Z and Q look \"bigger\" - but R (reals) is strictly larger cardinality (uncountable), proved by Cantor diagonalization.\n• Antisymmetric is not the negation of symmetric - a relation can be neither symmetric nor antisymmetric at all.\n• A partial order need not be total: incomparable elements are allowed and are exactly what Hasse diagrams reveal as unconnected (except via a common ancestor) nodes.';


window.GATE_DATA.questions['engmath'].topics.find(function(t){return t.id==='engmath-groups';}).theory.deep = 'DEFINITIONS\n\n• Algebraic structure (S, *): a set S with a binary operation * : SxS -> S.\n• Semigroup: (S,*) with * associative: (a*b)*c = a*(b*c) for all a,b,c.\n• Monoid: semigroup with an identity element e such that a*e = e*a = a for all a.\n• Group: monoid where every element has an inverse: for all a, exists a^-1 with a*a^-1 = a^-1*a = e.\n• Abelian (commutative) group: a group where a*b = b*a for all a,b.\n• Subgroup: a subset H of group G that is itself a group under the same operation (closure, identity, inverses within H).\n• Order of a group |G| = number of elements. Order of an element a = smallest positive integer k with a^k = e; if no such k exists, order is infinite.\n• Cyclic group: generated by a single element g, i.e. G = {g^0, g^1, g^2, ...}. Every cyclic group is abelian.\n• Ring: (R,+,*) where (R,+) is an abelian group, * is associative, and * distributes over +. A ring need not have multiplicative identity or inverses.\n• Field: a commutative ring with unity where every nonzero element has a multiplicative inverse (e.g. Q, R, C, Z_p for prime p).\n\nCOMPARISON TABLE (closure and associativity are baseline for all)\nStructure    | Identity | Inverses | Commutative\nSemigroup    | No       | No       | No (not required)\nMonoid       | YES      | No       | No (not required)\nGroup        | YES      | YES      | No (not required)\nAbelian Grp  | YES      | YES      | YES\n\nKEY THEOREMS\n\n• Uniqueness: identity element is unique; inverse of each element is unique.\n• Cancellation law holds in groups: a*b = a*c implies b = c (and b*a = c*a implies b=c). This does NOT hold in general monoids or semigroups without inverses.\n• Lagrange Theorem: if G is a finite group and H is a subgroup of G, then |H| divides |G|. Consequence: the order of every element divides |G|.\n• Every cyclic group is abelian (converse is false - abelian groups need not be cyclic, e.g. the Klein four-group V4 = Z2 x Z2 is abelian but not cyclic).\n• A group of prime order p is always cyclic, since the only divisors of p are 1 and p, so every non-identity element generates the whole group.\n• (Z_n, +) is a cyclic group of order n under addition mod n, always abelian.\n• (Z_n*, x) = {a in Z_n : gcd(a,n)=1} forms a group under multiplication mod n, of order phi(n) (Euler totient). NOT all of Z_n forms a group under multiplication - 0 has no inverse, and non-coprime elements have no inverse either.\n• Z_n is a field if and only if n is prime (then every nonzero element is coprime to n and has an inverse).\n• The identity of a group is always its own inverse; other elements can also be self-inverse (involutions), satisfying a^2 = e.\n• A finite group where every non-identity element has order 2 is abelian (proof: (ab)^2=e means ab=(ab)^-1=b^-1a^-1=ba).\n• Isomorphism: a bijective homomorphism f: G -> H with f(a*b) = f(a)#f(b); isomorphic groups share identical structure (same order, same element orders, same subgroup lattice).\n\nWORKED EXAMPLE 1\n\nIs ({0,1,2,3,4,5}, +6) [addition mod 6] a group? Closure holds (sum mod 6 stays in set). Associativity of mod-addition holds. Identity is 0. Inverses: 0 pairs with 0, 1 pairs with 5 (1+5=6=0 mod 6), 2 pairs with 4, 3 pairs with itself (3+3=6=0), 5 pairs with 1. Every element has an inverse, so this is an abelian group of order 6, and in fact cyclic, generated by 1, since repeatedly adding 1 cycles through 1,2,3,4,5,0.\n\nWORKED EXAMPLE 2\n\nFind the order of element 2 in the group (Z_5*, x5) = ({1,2,3,4}, multiplication mod 5).\nCompute powers of 2 mod 5: 2^1=2, 2^2=4, 2^3=8 mod5=3, 2^4=16 mod5=1. So the order of 2 is 4, and since |Z_5*| = phi(5) = 4, element 2 generates the whole group - Z_5* is cyclic of order 4 with 2 as a generator. Check Lagrange: order of element (4) divides group order (4). Consistent.\n\nTRAP FACTS GATE LOVES\n\n• Cancellation law works ONLY when inverses exist (i.e., in groups) - do not apply it in a general monoid or semigroup (e.g., matrix multiplication with singular matrices fails cancellation).\n• Every cyclic group is abelian, but NOT every abelian group is cyclic - the Klein four-group is the standard counterexample GATE uses.\n• Lagrange theorem is a ONE-WAY statement: |H| divides |G| does not mean every divisor of |G| corresponds to an actual subgroup (the converse of Lagrange fails in general, though it holds for cyclic groups).\n• Z_n under multiplication is a group only on the coprime-to-n residues {a : gcd(a,n)=1}, of size phi(n) - NOT on all of {0,...,n-1}, which fails because 0 and non-coprime elements lack inverses.\n• A group of prime order has no nontrivial proper subgroups (only {e} and itself), since any subgroup order must divide the prime.\n• (S,*) can be a monoid without being a group even if S is finite and looks nice - always explicitly check that EVERY element has an inverse, not just some.\n• Self-inverse (involution) elements satisfy a = a^-1, i.e., a^2 = e; the identity is always self-inverse, but non-identity elements can be too (e.g., 3 in Z_6 above).\n• Z_n is a field only when n is PRIME; for composite n, Z_n has zero divisors (e.g., in Z_6, 2 times 3 equals 0 mod 6 even though neither factor is 0), so it cannot be a field.';

window.GATE_DATA.questions['engmath'].topics.find(function(t){return t.id==='engmath-graph-theory';}).theory.deep = 'DEFINITIONS\n\n• Graph G = (V,E): V is the vertex set, E is the edge set. Simple graph: no self-loops, no multi-edges. Directed graph (digraph): edges are ordered pairs.\n• Degree of a vertex (undirected): number of edges incident to it (a self-loop contributes 2). In a digraph: in-degree and out-degree counted separately.\n• Path: sequence of distinct vertices connected by edges. Cycle: a path that returns to its start with no repeated vertices/edges except the endpoints. Simple graph with no cycles at all is a forest; a connected forest is a tree.\n• Complete graph K_n: every pair of the n vertices is connected; number of edges = n(n-1)/2.\n• Bipartite graph: vertices split into two sets with all edges going between the sets, none within. Complete bipartite K_(m,n) has m*n edges.\n• Connected graph: a path exists between every pair of vertices. Strongly connected (digraph): a directed path exists in both directions between every pair.\n• Tree: connected, acyclic graph. A tree on n vertices has exactly n-1 edges. Spanning tree of G: a subgraph that is a tree and includes all vertices of G.\n• Planar graph: can be drawn in the plane with no edge crossings.\n• Graph coloring: assigning colors to vertices so adjacent vertices differ; chromatic number chi(G) is the minimum colors needed.\n• Isomorphism: a bijection between vertex sets preserving adjacency exactly.\n\nKEY THEOREMS AND FORMULAS\n\n• Handshaking Lemma: sum of all vertex degrees = 2|E|. Consequence: the number of odd-degree vertices in any graph is always EVEN.\n• A simple graph on n vertices has at most n(n-1)/2 edges (achieved by K_n).\n• A tree on n vertices has exactly n-1 edges and exactly one path between any two vertices; adding any single edge to a tree creates exactly one cycle.\n• A connected graph on n vertices has at least n-1 edges; if it has exactly n-1 it is a tree.\n• A graph is bipartite if and only if it contains no odd-length cycle.\n• Euler circuit (uses every edge exactly once, returns to start): exists if and only if the graph is connected and every vertex has EVEN degree. Euler path (not necessarily closed): exists if and only if the graph is connected and exactly 0 or 2 vertices have odd degree.\n• Hamiltonian cycle: visits every VERTEX exactly once and returns to start - no simple necessary-and-sufficient condition is known in general (NP-complete to decide); contrast sharply with Euler circuits which have a clean degree criterion.\n• Kuratowski Theorem: a graph is planar iff it contains no subgraph that is a subdivision of K5 or K(3,3).\n• Euler Formula for connected planar graphs: V - E + F = 2, where F counts faces including the outer (unbounded) face.\n• Four Color Theorem: every planar graph is properly colorable with at most 4 colors (chi(G) <= 4 for planar G).\n• Chromatic number of K_n is n; of any bipartite graph (with at least one edge) is 2; of an odd cycle C_(2k+1) is 3; of an even cycle is 2.\n• Cayley Formula: the number of distinct labeled trees on n vertices is n^(n-2).\n• Number of spanning trees can be computed via Kirchhoff Matrix-Tree theorem (determinant of any cofactor of the Laplacian matrix), but GATE usually tests small cases directly or K_n via Cayley n^(n-2).\n\nCOMPARISON TABLE\nProperty                | Euler circuit/path       | Hamiltonian cycle\nWhat it traverses      | every EDGE once          | every VERTEX once\nExistence criterion    | simple degree test       | no known simple test (NP-complete)\nRequires connectivity  | yes                      | yes\n\nWORKED EXAMPLE 1\n\nA connected graph has 7 vertices with degree sequence 2,2,2,2,2,2,2 (a 7-cycle, C7). Does it have an Euler circuit? Sum of degrees = 14 = 2|E|, so |E|=7, consistent with a cycle. All degrees are even (2), and the graph is connected, so YES, an Euler circuit exists (trace the whole cycle once). Chromatic number: since 7 is odd, C7 is an odd cycle, so chi(C7) = 3 (cannot 2-color an odd cycle - adjacent vertices around an odd loop force a conflict with only 2 colors).\n\nWORKED EXAMPLE 2\n\nHow many edges does the complete bipartite graph K(3,4) have, and is it planar? Edges = 3*4 = 12. K(3,4) contains K(3,3) as a subgraph (any 3 vertices from the 4-side plus the 3-side reproduce K(3,3)), and K(3,3) is one of the two forbidden Kuratowski graphs, so K(3,4) is NOT planar (for m,n >= 3, K(m,n) is planar only when min(m,n) <= 2).\n\nTRAP FACTS GATE LOVES\n\n• The number of odd-degree vertices is ALWAYS even (Handshaking corollary) - a claimed degree sequence with an odd count of odd numbers is automatically impossible, a favorite \"which sequence is NOT graphical\" trap.\n• Euler circuit needs ALL even degrees; Euler PATH (not circuit) needs exactly 0 or 2 odd-degree vertices - mixing these up (e.g. saying a graph with 2 odd vertices has an Euler circuit) is a classic error; it has only an Euler path, not a circuit.\n• Having an Euler circuit says nothing about Hamiltonian cycles and vice versa - these are independent properties with no implication either way in general.\n• A tree has EXACTLY n-1 edges and is the unique connected graph on n vertices with the minimum number of edges; removing ANY edge disconnects it, and adding ANY edge creates exactly one cycle.\n• Bipartite-ness is exactly equivalent to having no odd cycle - a graph can have even cycles and still be bipartite (e.g., a simple square/4-cycle is bipartite).\n• Planarity is NOT about vertex or edge count alone - K5 (5 vertices, 10 edges) is nonplanar despite being small; a graph can be nonplanar even with few vertices if it embeds K5 or K(3,3) as a subdivision.\n• Four Color Theorem bounds ALL planar graphs at chi <= 4, regardless of how large or complex - it is not merely a rule of thumb, it is a proven theorem (with no simple pen-and-paper proof, but the result is definitive).\n• Cayley formula n^(n-2) counts LABELED trees - for n=4 that gives 4^2=16 distinct labeled trees, which surprises students who intuitively expect fewer, since there are only 2 tree SHAPES on 4 vertices (path and star) but many labelings of each.';

window.GATE_DATA.questions['engmath'].topics.find(function(t){return t.id==="engmath-combinatorics";}).theory.deep = "DEFINITIONS AND CORE FORMULAS\n\n\u2022 Permutation P(n,r) = n!/(n-r)! : number of ways to arrange r distinct items chosen from n, order matters.\n\n\u2022 Combination C(n,r) = n!/(r!(n-r)!) : number of ways to choose r items from n, order does not matter. C(n,r) = C(n,n-r).\n\n\u2022 Permutations with repetition (arranging n items where item types repeat with multiplicities n1,n2,...,nk, sum ni=n): n!/(n1! n2! ... nk!).\n\n\u2022 Circular permutations of n distinct items: (n-1)! (fix one item to remove rotational symmetry). If reflections are also considered identical (as in a necklace): (n-1)!/2.\n\n\u2022 Distributing n identical items into r distinct boxes, empty boxes allowed = C(n+r-1, r-1) (stars and bars). If no box may be empty (n>=r): C(n-1, r-1).\n\nBINOMIAL THEOREM\n\n(x+y)^n = sum_{k=0}^{n} C(n,k) x^(n-k) y^k. Key identities: sum_{k=0}^{n} C(n,k) = 2^n (total subsets of an n-set). sum_{k=0}^{n} (-1)^k C(n,k) = 0 for n>=1. Pascal recursion: C(n,k) = C(n,k-1)*(n-k+1)/k. Pascal identity: C(n,k) = C(n-1,k-1) + C(n-1,k). Vandermonde identity: sum_{k=0}^{r} C(m,k)*C(n,r-k) = C(m+n,r).\n\nINCLUSION-EXCLUSION PRINCIPLE\n\nFor sets A1..An: the size of their union = sum of individual sizes, minus sum of pairwise intersections, plus sum of triple intersections, minus quadruple, alternating, ending with (-1)^(n+1) times the full n-way intersection.\n\nDerangements: permutations of n items with no item in its original position. D(n) = n! * sum_{k=0}^{n} (-1)^k / k!. Recurrence: D(n) = (n-1)*(D(n-1)+D(n-2)), with D(0)=1, D(1)=0. Values: D(1)=0, D(2)=1, D(3)=2, D(4)=9, D(5)=44.\n\nPIGEONHOLE PRINCIPLE\n\nIf n items are placed into k boxes and n > k, at least one box holds 2 or more items. Generalized pigeonhole: at least one box holds at least ceil(n/k) items. GATE frequently disguises this inside graph, coloring, or sequence problems.\n\nRECURRENCE RELATIONS\n\nLinear homogeneous recurrences with constant coefficients are solved via the characteristic equation. Example: Fibonacci F(n) = F(n-1) + F(n-2) has characteristic equation x^2 - x - 1 = 0, with roots (1+sqrt(5))/2 and (1-sqrt(5))/2 (the golden ratio and its conjugate); the general solution is a linear combination of these roots raised to the n-th power, fitted using initial conditions F(0), F(1).\n\nCatalan numbers: C_n = C(2n,n)/(n+1) = (2n)! / (n! * (n+1)!). They count balanced parenthesizations, binary trees with n internal nodes, monotonic lattice paths that do not cross a diagonal, and valid stack push-pop sequences of n items. Values: C0=1, C1=1, C2=2, C3=5, C4=14, C5=42.\n\nStirling numbers of the second kind S(n,k): the number of ways to partition n distinct objects into k nonempty unlabeled subsets. Summing S(n,k) over all k gives the Bell number B(n) (total number of partitions of an n-set, also equal to the number of equivalence relations on it).\n\nWORKED EXAMPLE 1\n\nIn how many ways can the letters of the word MISSISSIPPI be arranged?\nLetter counts: M appears 1 time, I appears 4 times, S appears 4 times, P appears 2 times; total letters n = 11.\nNumber of distinct arrangements = 11! / (1! * 4! * 4! * 2!) = 39916800 / (1*24*24*2) = 39916800 / 1152 = 34650.\n\nWORKED EXAMPLE 2\n\nHow many ways can 5 identical balls be distributed into 3 distinct boxes such that no box is left empty?\nUsing the no-empty-box stars-and-bars formula: C(n-1, r-1) = C(5-1, 3-1) = C(4,2) = 6.\nVerification by direct enumeration of positive partitions of 5 into 3 ordered parts: partitions of shape (3,1,1) contribute 3 orderings (which box gets the 3), and shape (2,2,1) contributes 3 orderings (which box gets the 1); total 3+3 = 6, matching the formula.\n\nTRAP FACTS GATE LOVES\n\n\u2022 P(n,r) counts ORDERED selections while C(n,r) counts UNORDERED selections; misreading \"arrange\" versus \"choose\" or \"select\" in the question stem is the single most common error source in this topic.\n\n\u2022 Circular permutations use (n-1)!, not n! - a very commonly forgotten adjustment. The extra division by 2 for reflections applies only when the problem explicitly treats clockwise and counterclockwise arrangements as identical (such as a necklace of beads), not for ordinary seating around a table.\n\n\u2022 Stars-and-bars WITH empty boxes allowed uses C(n+r-1, r-1); the version WITHOUT empty boxes (every box gets at least one item) uses C(n-1, r-1) instead - swapping which formula fits the problem's constraint is a frequent mistake.\n\n\u2022 The derangement count D(n) is NOT simply n!/e rounded casually; it is exactly the nearest integer to n!/e for n >= 1, but the exam expects the exact inclusion-exclusion formula or recurrence for small n rather than an approximation.\n\n\u2022 Inclusion-exclusion signs strictly alternate starting with a plus sign for single sets; forgetting the higher-order intersection terms (triple or quadruple overlaps) when three or more sets are involved causes systematic overcounting errors.\n\n\u2022 The symmetry identity C(n,r) = C(n,n-r) is often the fastest simplification for GATE numericals, e.g. C(20,18) reduces instantly to C(20,2) = 190, avoiding large factorial arithmetic.\n\n\u2022 Catalan numbers appear disguised as \"ways to correctly match parentheses,\" \"number of distinct binary search trees on n keys,\" or \"monotonic lattice paths that never cross the diagonal\" - recognizing the Catalan pattern immediately saves derivation time versus building a recurrence from scratch.\n\n\u2022 The generalized pigeonhole guarantee uses ceil(n/k), never floor(n/k) - always round UP to get the guaranteed minimum count in the most-loaded box.\n\n\u2022 Permutations with repeated items divide by the factorial of EACH repeated group's count, not by the total repeat count alone - a formula like 11!/8! (dividing only by total repeats) is a wrong shortcut students sometimes apply to MISSISSIPPI-style problems.\n";

window.GATE_DATA.questions['engmath'].topics.find(function(t){return t.id==="engmath-linear-algebra";}).theory.deep = "DEFINITIONS\n\n\u2022 Matrix operations: addition/subtraction (same dimensions, elementwise), scalar multiplication, matrix multiplication (A is m x n, B is n x p, product AB is m x p; matrix multiplication is associative and distributes over addition, but is NOT commutative in general: AB is not generally equal to BA).\n\n\u2022 Transpose A^T: rows become columns. (AB)^T = B^T A^T (order reverses). Symmetric matrix: A = A^T. Skew-symmetric: A^T = -A (diagonal entries must be 0).\n\n\u2022 Determinant det(A): defined for square matrices. For 2x2 [[a,b],[c,d]], det = ad - bc. For 3x3, expand along any row/column with cofactors. Properties: det(AB) = det(A)*det(B). det(A^T) = det(A). det(kA) for n x n matrix = k^n * det(A). Swapping two rows flips the sign of the determinant. If any row/column is a scalar multiple of another (linear dependence), det = 0.\n\n\u2022 Inverse A^-1 exists iff det(A) is nonzero (A is then called nonsingular or invertible). A^-1 = adj(A)/det(A), where adj(A) is the transpose of the cofactor matrix. (AB)^-1 = B^-1 A^-1 (order reverses, same pattern as transpose).\n\n\u2022 Rank of a matrix: the number of linearly independent rows (equivalently columns); computed via row-reduction to echelon form and counting nonzero rows, or as the size of the largest nonzero minor (determinant of a square submatrix).\n\n\u2022 System of linear equations Ax = b: consistent (has at least one solution) iff rank(A) = rank([A|b]) (the augmented matrix). If rank(A) = rank([A|b]) = n (number of unknowns), unique solution. If rank(A) = rank([A|b]) < n, infinitely many solutions (with n - rank free parameters). If rank(A) < rank([A|b]), no solution (inconsistent).\n\n\u2022 Homogeneous system Ax = 0: always consistent (x=0 is the trivial solution). Has a NONtrivial solution if and only if rank(A) < n (equivalently det(A) = 0 for a square coefficient matrix).\n\nEIGENVALUES AND EIGENVECTORS\n\n\u2022 Eigenvalue equation: Av = lambda*v for nonzero vector v (eigenvector) and scalar lambda (eigenvalue). Found by solving the characteristic equation det(A - lambda*I) = 0.\n\n\u2022 Trace-determinant facts: sum of eigenvalues = trace(A) (sum of diagonal entries). Product of eigenvalues = det(A).\n\n\u2022 Eigenvalues of a triangular matrix (upper or lower) are exactly its diagonal entries.\n\n\u2022 If A is symmetric (real entries), all eigenvalues are REAL, and eigenvectors corresponding to distinct eigenvalues are orthogonal.\n\n\u2022 Eigenvalues of A^k are (eigenvalues of A)^k. Eigenvalues of A^-1 are 1/(eigenvalues of A), provided A is invertible (0 is not an eigenvalue). Eigenvalues of (A + cI) are (eigenvalues of A) + c, for scalar c and identity I.\n\n\u2022 A is singular (non-invertible) if and only if 0 is an eigenvalue of A, equivalently det(A) = 0.\n\n\u2022 Cayley-Hamilton theorem: every square matrix satisfies its own characteristic equation - substituting A itself for lambda in the characteristic polynomial gives the zero matrix. Used to compute high matrix powers or inverses efficiently in terms of lower powers.\n\n\u2022 Diagonalizable matrix: A = PDP^-1 where D is diagonal (eigenvalues) and P's columns are the corresponding eigenvectors. A is diagonalizable iff it has n linearly independent eigenvectors (guaranteed if all n eigenvalues are distinct; repeated eigenvalues may or may not yield enough independent eigenvectors - check geometric multiplicity).\n\nMATRIX TYPES AND THEIR PROPERTIES\n\nType              | Definition                    | Key fact\nSymmetric         | A = A^T                       | real eigenvalues, orthogonal eigenvectors\nSkew-symmetric    | A^T = -A                      | eigenvalues are 0 or purely imaginary; diagonal is 0\nOrthogonal        | A^T A = I (A^-1 = A^T)        | preserves lengths/angles; det(A) = +-1\nIdempotent        | A^2 = A                       | eigenvalues are only 0 or 1\nNilpotent         | A^k = 0 for some positive k   | all eigenvalues are 0\nIdentity I        | diagonal of 1s                | eigenvalues all 1, det = 1\n\nVECTOR SPACES\n\n\u2022 A set of vectors is linearly independent if the only solution to c1*v1 + c2*v2 + ... + cn*vn = 0 is all ci = 0. Otherwise they are linearly dependent (at least one vector is a combination of the others).\n\n\u2022 Basis: a linearly independent set that spans the vector space. Every basis of a given finite-dimensional vector space has the same number of elements, called the dimension.\n\n\u2022 Rank-Nullity Theorem: for a matrix A that is m x n, rank(A) + nullity(A) = n, where nullity is the dimension of the null space (solution space of Ax = 0).\n\nWORKED EXAMPLE 1\n\nFind the eigenvalues of A = [[4,1],[2,3]].\nCharacteristic equation: det(A - lambda*I) = (4-lambda)(3-lambda) - (1)(2) = 0.\nExpand: 12 - 4*lambda - 3*lambda + lambda^2 - 2 = 0, i.e. lambda^2 - 7*lambda + 10 = 0.\nFactor: (lambda-5)(lambda-2) = 0, so lambda = 5 or lambda = 2.\nCheck: sum of eigenvalues = 5+2 = 7 = trace(A) = 4+3 = 7. Correct. Product = 5*2 = 10 = det(A) = 4*3 - 1*2 = 12-2 = 10. Correct.\n\nWORKED EXAMPLE 2\n\nDetermine for what value(s) of k the system x + y = 3, 2x + k*y = 6 has infinitely many solutions.\nCoefficient matrix A = [[1,1],[2,k]], augmented [A|b] = [[1,1,3],[2,k,6]].\nFor infinitely many solutions we need rank(A) = rank([A|b]) < 2 (i.e., the two equations become dependent/proportional).\nThe rows are proportional when 2/1 = k/1 = 6/3, i.e. k = 2 and the ratio 6/3=2 matches 2/1=2. So at k = 2, the second equation becomes 2x+2y=6, i.e. x+y=3, identical to the first equation - infinitely many solutions. For any other k, rank(A) = 2 = number of unknowns, giving a unique solution instead.\n\nTRAP FACTS GATE LOVES\n\n\u2022 Matrix multiplication is NOT commutative in general (AB != BA), even though addition and scalar multiplication behave like ordinary numbers - a very frequently tested distinction.\n\n\u2022 A homogeneous system Ax=0 ALWAYS has the trivial solution x=0; the real question GATE asks is whether a NONtrivial solution exists, which happens exactly when det(A) = 0 for a square A (rank(A) < n in general).\n\n\u2022 Sum of eigenvalues = trace, product of eigenvalues = determinant - these shortcuts let you skip solving the full characteristic polynomial for many GATE questions asking only for a sum, product, or a single missing eigenvalue.\n\n\u2022 Eigenvalues of a triangular matrix are just its diagonal entries - no computation needed at all, a frequent quick-marks trap.\n\n\u2022 A skew-symmetric matrix of ODD order always has determinant 0 (since det(A) = det(A^T) = det(-A) = (-1)^n det(A); for odd n this forces det(A) = -det(A), so det(A)=0). For even order this argument does not force zero.\n\n\u2022 Orthogonal matrices have determinant exactly +1 or -1, never any other value, because A^T A = I forces det(A)^2 = 1.\n\n\u2022 Rank of a matrix is NOT changed by elementary row operations, but IS generally different from the number of rows or columns - do not assume rank equals min(rows, columns) without verifying no rows/columns are dependent.\n\n\u2022 Repeated eigenvalues do not guarantee a diagonalizable matrix - always check whether the geometric multiplicity (dimension of the eigenspace) matches the algebraic multiplicity (multiplicity as a root of the characteristic polynomial); if it falls short, the matrix is defective and not diagonalizable.\n\n\u2022 (AB)^-1 = B^-1 A^-1 and (AB)^T = B^T A^T both reverse order - a very commonly misapplied pair of identities when students instead write A^-1 B^-1 or A^T B^T.\n";

window.GATE_DATA.questions['engmath'].topics.find(function(t){return t.id==="engmath-calculus";}).theory.deep = "LIMITS AND CONTINUITY\n\n\u2022 A function f is continuous at x=a if lim_{x->a} f(x) exists and equals f(a) (left limit = right limit = function value).\n\n\u2022 Standard limits: lim_{x->0} sin(x)/x = 1. lim_{x->0} (1-cos(x))/x^2 = 1/2. lim_{x->0} (e^x - 1)/x = 1. lim_{x->0} ln(1+x)/x = 1. lim_{x->infinity} (1+1/x)^x = e. lim_{x->0} (a^x - 1)/x = ln(a).\n\n\u2022 L'Hopital's Rule: for indeterminate forms 0/0 or infinity/infinity, lim f(x)/g(x) = lim f'(x)/g'(x), provided the latter limit exists; can be applied repeatedly if the new ratio is still indeterminate.\n\nDIFFERENTIATION\n\n\u2022 Basic derivative rules: d/dx(x^n) = n*x^(n-1). d/dx(sin x) = cos x. d/dx(cos x) = -sin x. d/dx(tan x) = sec^2(x). d/dx(e^x) = e^x. d/dx(ln x) = 1/x. d/dx(a^x) = a^x * ln(a).\n\n\u2022 Product rule: (fg)' = f'g + fg'. Quotient rule: (f/g)' = (f'g - fg')/g^2. Chain rule: d/dx f(g(x)) = f'(g(x)) * g'(x).\n\n\u2022 Mean Value Theorem (MVT / Lagrange): if f is continuous on [a,b] and differentiable on (a,b), there exists c in (a,b) such that f'(c) = (f(b)-f(a))/(b-a).\n\n\u2022 Rolle's Theorem: special case of MVT where f(a) = f(b); guarantees a point c in (a,b) with f'(c) = 0.\n\n\u2022 Maxima/minima via first derivative test: f'(x) = 0 at critical points; sign change of f' from + to - indicates a local maximum, - to + indicates a local minimum. Second derivative test: if f'(c)=0 and f''(c) < 0, local maximum; if f''(c) > 0, local minimum; if f''(c) = 0, test is inconclusive (check higher derivatives or the first-derivative sign change directly).\n\n\u2022 Point of inflection: where f''(x) changes sign (concavity switches from concave-up to concave-down or vice versa); a necessary condition is f''(x) = 0 there, but this alone is not sufficient without a sign change.\n\nINTEGRATION\n\n\u2022 Fundamental Theorem of Calculus: if F is an antiderivative of f, then integral_a^b f(x) dx = F(b) - F(a).\n\n\u2022 Standard integrals: integral x^n dx = x^(n+1)/(n+1) + C (n != -1). integral 1/x dx = ln|x| + C. integral e^x dx = e^x + C. integral sin(x) dx = -cos(x) + C. integral cos(x) dx = sin(x) + C. integral sec^2(x) dx = tan(x) + C.\n\n\u2022 Integration by parts: integral u dv = uv - integral v du. Choice order mnemonic ILATE (Inverse trig, Logarithmic, Algebraic, Trigonometric, Exponential) suggests which factor to pick as u first.\n\n\u2022 Definite integral properties: integral_a^b f(x) dx = -integral_b^a f(x) dx. integral_a^a f(x) dx = 0. If f is even, integral_{-a}^{a} f(x) dx = 2*integral_0^a f(x) dx. If f is odd, integral_{-a}^{a} f(x) dx = 0.\n\n\u2022 Reduction/special results: integral_0^{pi/2} sin^n(x) dx = integral_0^{pi/2} cos^n(x) dx (Wallis-type symmetry, both equal the same value for a given n).\n\nMULTIVARIABLE CALCULUS\n\n\u2022 Partial derivative: differentiate with respect to one variable, holding the others constant, denoted partial f/partial x.\n\n\u2022 For a function of two variables z=f(x,y), a critical point requires partial f/partial x = 0 and partial f/partial y = 0 simultaneously.\n\n\u2022 Second derivative test for two variables using the Hessian: let D = f_xx * f_yy - (f_xy)^2 at the critical point. If D > 0 and f_xx > 0: local minimum. If D > 0 and f_xx < 0: local maximum. If D < 0: saddle point (neither max nor min). If D = 0: test is inconclusive.\n\n\u2022 Total derivative / chain rule for multivariable functions: if z = f(x,y), x = x(t), y = y(t), then dz/dt = (partial f/partial x)(dx/dt) + (partial f/partial y)(dy/dt).\n\n\u2022 Euler's theorem on homogeneous functions: if f(x,y) is homogeneous of degree n (meaning f(tx,ty) = t^n * f(x,y)), then x*(partial f/partial x) + y*(partial f/partial y) = n*f(x,y).\n\nTAYLOR AND MACLAURIN SERIES\n\n\u2022 Taylor series of f about x=a: f(x) = f(a) + f'(a)(x-a) + f''(a)(x-a)^2/2! + f'''(a)(x-a)^3/3! + ...\n\n\u2022 Maclaurin series (a=0), memorize these: e^x = 1 + x + x^2/2! + x^3/3! + ... sin(x) = x - x^3/3! + x^5/5! - ... cos(x) = 1 - x^2/2! + x^4/4! - ... ln(1+x) = x - x^2/2 + x^3/3 - ... (valid for -1 < x <= 1). (1+x)^n = 1 + nx + n(n-1)x^2/2! + ... (binomial series, valid for |x|<1 when n is not a nonnegative integer).\n\nCOMPARISON: Rolle's vs Mean Value Theorem\nAspect                | Rolle's Theorem              | Mean Value Theorem\nExtra condition       | f(a) = f(b) required         | no such requirement\nConclusion            | exists c with f'(c) = 0      | exists c with f'(c) = slope of secant\nRelationship          | special case of MVT          | general form; reduces to Rolle when f(a)=f(b)\n\nWORKED EXAMPLE 1\n\nEvaluate lim_{x->0} (e^x - 1 - x) / x^2.\nDirect substitution gives 0/0, so apply L'Hopital: differentiate numerator and denominator: (e^x - 1)/(2x), still 0/0 at x=0. Apply L'Hopital again: e^x / 2, which at x=0 gives 1/2.\nCross-check via Maclaurin series: e^x = 1 + x + x^2/2 + x^3/6 + ..., so e^x - 1 - x = x^2/2 + x^3/6 + ...; dividing by x^2 gives 1/2 + x/6 + ..., which tends to 1/2 as x->0. Confirmed: the limit is 1/2.\n\nWORKED EXAMPLE 2\n\nFind the critical points of f(x,y) = x^2 + y^2 - 4x - 6y + 13 and classify them.\nPartial derivatives: f_x = 2x - 4, f_y = 2y - 6. Setting both to zero: x = 2, y = 3. So the critical point is (2,3).\nHessian entries: f_xx = 2, f_yy = 2, f_xy = 0. D = f_xx*f_yy - (f_xy)^2 = 2*2 - 0 = 4 > 0, and f_xx = 2 > 0, so (2,3) is a local minimum.\nValue at the minimum: f(2,3) = 4 + 9 - 8 - 18 + 13 = 0. So the global minimum value of this paraboloid-shaped function is 0, attained at (2,3).\n\nTRAP FACTS GATE LOVES\n\n\u2022 L'Hopital's Rule applies ONLY to indeterminate forms (0/0 or infinity/infinity) - applying it directly to a limit that is not indeterminate gives a WRONG answer; always verify the form first by direct substitution.\n\n\u2022 The second derivative test is inconclusive when f''(c) = 0 - many students wrongly conclude \"no extremum\" or default to a guess; the correct next step is the first-derivative sign-change test or examining higher-order derivatives.\n\n\u2022 Rolle's theorem REQUIRES f(a) = f(b); without this, only the more general Mean Value Theorem applies, guaranteeing a point matching the AVERAGE (secant) slope, not necessarily zero slope.\n\n\u2022 Odd functions integrate to exactly ZERO over symmetric limits [-a,a] regardless of how complicated the function looks internally, and even functions let you double the integral over [0,a] instead - both are fast simplifications GATE numericals are built around; missed symmetry costs significant computation time.\n\n\u2022 The Hessian test's saddle-point case (D<0) is a commonly overlooked category - students often stop after computing f_xx and f_yy without checking the cross term f_xy, missing that a point can fail to be either a max or min entirely.\n\n\u2022 A function can have f'(c) = 0 without c being a local extremum at all (e.g., f(x)=x^3 at x=0 is an inflection point, not a max or min) - f'=0 alone is only a necessary, not sufficient, condition for an extremum.\n\n\u2022 Maclaurin series for ln(1+x) is valid only for -1 < x <= 1 (note x=1 IS included but x=-1 is NOT) - a boundary detail GATE occasionally tests directly.\n\n\u2022 Integration by parts choice of u (via ILATE) is a heuristic, not a rigid law - blindly following it without checking which factor simplifies upon differentiation can lead to an infinitely recurring integral in edge cases; sanity-check that the chosen dv is actually integrable.\n";

window.GATE_DATA.questions['engmath'].topics.find(function(t){return t.id==="engmath-probability";}).theory.deep = "DEFINITIONS\n\n\u2022 Sample space S: set of all possible outcomes. Event: any subset of S. P(E) = (favorable outcomes)/(total outcomes) for equally likely outcomes, always satisfying 0 <= P(E) <= 1, P(S) = 1, P(empty set) = 0.\n\n\u2022 Addition rule: P(A union B) = P(A) + P(B) - P(A intersect B). For mutually exclusive events (cannot occur together), P(A intersect B) = 0, so P(A union B) = P(A) + P(B).\n\n\u2022 Conditional probability: P(A|B) = P(A intersect B) / P(B), defined only when P(B) > 0. Multiplication rule: P(A intersect B) = P(A|B)*P(B) = P(B|A)*P(A).\n\n\u2022 Independence: A and B are independent iff P(A intersect B) = P(A)*P(B), equivalently P(A|B) = P(A). Independence and mutual exclusivity are DIFFERENT and generally incompatible for events with nonzero probability (two mutually exclusive events with positive probability cannot be independent, since P(A intersect B)=0 but P(A)*P(B)>0).\n\n\u2022 Bayes' Theorem: P(A|B) = P(B|A)*P(A) / P(B), where P(B) = sum over all Ai of P(B|Ai)*P(Ai) (law of total probability) for a partition {Ai} of the sample space.\n\nRANDOM VARIABLES\n\n\u2022 Discrete random variable: takes countable values, described by a probability mass function (PMF) p(x) = P(X=x), with sum of p(x) over all x = 1.\n\n\u2022 Continuous random variable: described by a probability density function (PDF) f(x) with integral over all x of f(x) dx = 1, and P(a <= X <= b) = integral_a^b f(x) dx. For continuous variables, P(X = any single point) = 0.\n\n\u2022 Expectation (mean): discrete E[X] = sum x*p(x). Continuous E[X] = integral x*f(x) dx. Linearity of expectation ALWAYS holds: E[aX+bY] = a*E[X] + b*E[Y], regardless of whether X and Y are independent.\n\n\u2022 Variance: Var(X) = E[X^2] - (E[X])^2, always >= 0. Standard deviation = sqrt(Var(X)). Var(aX+b) = a^2 * Var(X) (adding a constant b does not change variance, since it only shifts the distribution).\n\n\u2022 For independent X, Y: Var(X+Y) = Var(X) + Var(Y). This additivity FAILS for dependent variables in general - the correct general formula is Var(X+Y) = Var(X) + Var(Y) + 2*Cov(X,Y).\n\n\u2022 E[XY] = E[X]*E[Y] ONLY when X and Y are independent; in general E[XY] = E[X]*E[Y] + Cov(X,Y).\n\n\u2022 Covariance: Cov(X,Y) = E[XY] - E[X]E[Y]. Correlation coefficient rho = Cov(X,Y) / (sigma_X * sigma_Y), always between -1 and 1.\n\nSTANDARD DISTRIBUTIONS\n\nDistribution     | PMF/PDF                                  | Mean        | Variance\nBernoulli(p)     | P(X=1)=p, P(X=0)=1-p                     | p           | p(1-p)\nBinomial(n,p)    | P(X=k) = C(n,k) p^k (1-p)^(n-k)           | np          | np(1-p)\nPoisson(lambda)  | P(X=k) = e^(-lambda) lambda^k / k!        | lambda      | lambda\nGeometric(p)     | P(X=k) = (1-p)^(k-1) p, k=1,2,...         | 1/p         | (1-p)/p^2\nUniform(a,b)     | f(x) = 1/(b-a) on [a,b]                   | (a+b)/2     | (b-a)^2/12\nExponential(lam) | f(x) = lambda*e^(-lambda x), x>=0         | 1/lambda    | 1/lambda^2\nNormal(mu,sig^2) | f(x) = (1/(sig*sqrt(2*pi))) e^(-(x-mu)^2/(2*sig^2)) | mu | sig^2\n\n\u2022 Poisson approximates Binomial when n is large, p is small, and np = lambda stays moderate (rare-event approximation).\n\n\u2022 Memorylessness: the Exponential and Geometric distributions are the unique memoryless distributions (continuous and discrete respectively): P(X > s+t | X > s) = P(X > t), meaning past waiting time gives no information about future waiting time.\n\n\u2022 Normal distribution is symmetric about mu; the empirical rule states about 68% of probability lies within 1 standard deviation of the mean, about 95% within 2, about 99.7% within 3.\n\n\u2022 Central Limit Theorem: the sum (or average) of a large number of independent, identically distributed random variables with finite mean and variance tends toward a Normal distribution, regardless of the shape of the original distribution.\n\nMEAN, MEDIAN, MODE RELATIONSHIP\n\n\u2022 Symmetric distribution (e.g., Normal): mean = median = mode.\n\n\u2022 Right-skewed (long tail to the right, e.g. income data): mean > median > mode (a few very large values pull the mean up more than the median).\n\n\u2022 Left-skewed (long tail to the left): mean < median < mode.\n\nWORKED EXAMPLE 1\n\nA fair die is rolled twice. What is the probability that the sum of the two rolls is at least 9?\nTotal outcomes = 36 (6x6, equally likely). Sums >= 9: sum=9 has 4 ways (3+6,4+5,5+4,6+3), sum=10 has 3 ways (4+6,5+5,6+4), sum=11 has 2 ways (5+6,6+5), sum=12 has 1 way (6+6). Total favorable = 4+3+2+1 = 10.\nProbability = 10/36 = 5/18.\n\nWORKED EXAMPLE 2\n\nA factory has two machines: Machine A produces 60% of items with a 2% defect rate; Machine B produces 40% of items with a 5% defect rate. An item is picked at random and found defective. What is the probability it came from Machine B?\nLet event D = defective. P(A) = 0.6, P(B) = 0.4, P(D|A) = 0.02, P(D|B) = 0.05.\nTotal probability: P(D) = P(D|A)*P(A) + P(D|B)*P(B) = 0.02*0.6 + 0.05*0.4 = 0.012 + 0.020 = 0.032.\nBy Bayes: P(B|D) = P(D|B)*P(B) / P(D) = (0.05*0.4) / 0.032 = 0.020/0.032 = 0.625.\nSo there is a 62.5% chance the defective item came from Machine B, even though Machine B produces fewer items overall - because its defect rate is much higher.\n\nTRAP FACTS GATE LOVES\n\n\u2022 Mutually exclusive and independent are NOT the same thing, and for events with positive probability they cannot both hold simultaneously - a very frequently tested conceptual trap.\n\n\u2022 Linearity of expectation E[X+Y] = E[X]+E[Y] holds UNCONDITIONALLY, even when X and Y are dependent; but E[XY] = E[X]*E[Y] holds ONLY under independence - do not apply the product shortcut without checking independence explicitly.\n\n\u2022 Var(X+Y) = Var(X)+Var(Y) requires INDEPENDENCE (or at least zero covariance); for dependent variables the cross term 2*Cov(X,Y) must be included, and this term can be positive or negative.\n\n\u2022 Adding a constant to a random variable shifts the mean but leaves the variance UNCHANGED (Var(X+b)=Var(X)); scaling by a constant a multiplies the variance by a^2, not by a (Var(aX) = a^2*Var(X)).\n\n\u2022 For continuous distributions, the probability of any single exact point is always 0 - so P(X = a) = 0 but P(X <= a) can still be meaningfully nonzero; students sometimes incorrectly treat P(X<a) and P(X<=a) as different for continuous variables when they are actually EQUAL (unlike for discrete variables where they can differ).\n\n\u2022 Poisson's mean and variance are always EQUAL to lambda - a distinguishing signature; if a problem states mean and variance are different for a \"Poisson-like\" scenario, something is inconsistent.\n\n\u2022 Right-skewed data has mean > median (not less than) - a commonly reversed inequality; visualize the long tail pulling the mean toward it.\n\n\u2022 Bayes' theorem answers \"given the evidence, what caused it\" and often produces a counterintuitive result when the prior probabilities are very different, as in Example 2 above where the less common source (Machine B) turns out more likely to be the true cause once the higher defect rate is properly weighted - never skip the law of total probability denominator.\n\n\u2022 Exponential and Geometric distributions are the ONLY memoryless distributions; assuming memorylessness for other distributions (like Normal or Uniform) leads to wrong conditional probability calculations.\n";

window.GATE_DATA.questions['engmath'].topics.find(function(t){return t.id==='engmath-discrete-logic';}).questions.push(
{
  id: 'engmath-discrete-logic-x1',
  q: 'Consider the argument: "All interpreters are slow. Some slow programs are unreliable. Therefore some interpreters are unreliable." This argument is:',
  options: ['Valid, it follows by hypothetical syllogism', 'Invalid, the middle term is not properly distributed to license the conclusion', 'Valid, since both premises are universally true in practice', 'Invalid, because the conclusion negates a premise'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Symbolize with predicates: forall x (I(x) -> S(x)) and exists x (S(x) AND U(x)). We cannot conclude exists x (I(x) AND U(x)). The witness satisfying S(x) AND U(x) need not be one of the interpreters - it could be any slow program, such as a poorly written script that is not an interpreter at all. A valid syllogism needs the shared (middle) term to connect the two premises about the SAME individuals, but here the existential premise's witness is unconstrained relative to the universal premise's subject class. Counterexample: interpreters = {A}, slow = {A, B}, unreliable = {B}; both premises hold (A is slow, B is slow and unreliable) but no interpreter is unreliable. This is a classic invalid categorical form despite looking like hypothetical syllogism."
},
{
  id: 'engmath-discrete-logic-x2',
  q: 'The negation of the statement "exists x forall y (P(x,y) -> Q(x,y))" is logically equivalent to:',
  options: ['forall x exists y (P(x,y) AND ~Q(x,y))', 'exists x forall y (~P(x,y) OR ~Q(x,y))', 'forall x exists y (~P(x,y) -> Q(x,y))', 'exists x exists y (P(x,y) -> ~Q(x,y))'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Push the negation through each quantifier in order: ~exists x A(x) == forall x ~A(x), then ~forall y B(y) == exists y ~B(y). So ~exists x forall y (P->Q) becomes forall x exists y ~(P(x,y)->Q(x,y)). Converting the inner implication to OR-form first, ~(P->Q) == ~(~P OR Q) == P AND ~Q. Substituting gives forall x exists y (P(x,y) AND ~Q(x,y)), which is option A. Each quantifier flips (exists becomes forall and vice versa) exactly once as the negation passes through it, and the innermost connective flips from implication-negated to an AND of the antecedent with the negated consequent - a two-stage process students often abbreviate incorrectly by only flipping quantifiers and forgetting to convert the inner implication."
},
{
  id: 'engmath-discrete-logic-x3',
  q: 'How many of the 8 possible truth assignments to p, q, r satisfy the formula (p <-> q) OR (q <-> r)?',
  options: ['4', '6', '7', '8'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "The formula is false only when BOTH biconditionals fail simultaneously, i.e. p != q AND q != r. Fix q: if q=T, we need p=F and r=F, giving the single failing row (F,T,F). If q=F, we need p=T and r=T, giving the single failing row (T,F,T). So there are exactly 2 falsifying assignments out of the 8 total. Verify row (F,T,F): (F<->T)=F, (T<->F)=F, so OR of two falses is false - confirmed a failing row. Every other row has p=q or q=r (or both), making at least one biconditional true and hence the whole OR true. Satisfying count = 8 - 2 = 6, matching option B. This kind of complementary-counting trick (count failures, subtract from the total) is much faster than building the full 8-row table."
},
{
  id: 'engmath-discrete-logic-x4',
  q: 'A propositional formula phi over 4 variables is satisfiable but not a tautology, and exactly 5 of the 16 assignments make it true. How many assignments make ~phi true?',
  options: ['5', '10', '11', '16'],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "Every one of the 16 total assignments makes exactly one of phi or ~phi true (they are complementary - never both true, never both false, for a given assignment). Since phi is true on exactly 5 assignments, ~phi is true on the remaining 16 - 5 = 11 assignments. This directly uses the fact that negation swaps the truth value at every single row of the truth table, so the satisfying set of ~phi is precisely the complement (within all 16 rows) of the satisfying set of phi. The conditions that phi is satisfiable (at least one true row, ruling out 0) and not a tautology (at least one false row, ruling out 16) are just consistency checks confirming 5 is a valid count, not needed for the arithmetic itself."
},
{
  id: 'engmath-discrete-logic-x5',
  q: 'Which statement about the connective set {IMPLIES, FALSE} (implication together with the constant false) is correct regarding functional completeness?',
  options: ['It is functionally complete, since NOT p can be built as p IMPLIES FALSE, and OR, AND follow from NOT and IMPLIES', 'It is not complete because FALSE is a constant, not a connective', 'It is not complete because IMPLIES alone cannot express AND', 'It is complete only when combined with TRUE as well'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "NOT p is definable as p -> FALSE (if p is true, this forces the whole expression false only when FALSE really is false, matching NOT p's truth table exactly: true when p is false, false when p is true). Once NOT is available alongside IMPLIES, OR follows via p OR q == ~p -> q, and AND follows via De Morgan using NOT and OR (or directly AND(p,q) = NOT(p -> NOT q)). Since {NOT, IMPLIES} is already known to be functionally complete (implication plus negation can express every connective), and we've shown NOT is derivable from {IMPLIES, FALSE}, this pair is complete too. Constants are legitimately allowed as building blocks in completeness arguments - option B's objection is not a real restriction in standard treatments of functional completeness."
}
);
