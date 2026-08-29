window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['toc'] = {
  subject: 'Theory of Computation',
  topics: [
    {
      id: 'toc-regular',
      name: 'Regular Languages & Finite Automata',
      theory: {
        intro: "Regular languages are the smallest class in the Chomsky hierarchy and the workhorse of GATE TOC scoring. They are exactly the languages accepted by finite automata (deterministic or nondeterministic) and exactly those described by regular expressions. The defining limitation is memory: a finite automaton can remember only which of finitely many states it is in, never an unbounded count. GATE tests this topic through minimal DFA state counting, DFA/NFA conversions, regular expression identities, closure properties, and proofs of non-regularity via the pumping lemma or Myhill-Nerode reasoning. Almost every year has at least one question asking for the number of states in a minimal DFA for a language defined by a modulo condition, a substring condition, or a suffix condition. Mastering the small toolbox here - state counting by tracking necessary information, product constructions, and distinguishing-string arguments - converts this topic into reliable marks.",
        core: "A DFA is a 5-tuple (Q, Sigma, delta, q0, F) with exactly one transition per state per symbol. An NFA may have multiple choices and epsilon moves, and accepts if some computation path reaches a final state. Every NFA can be converted to a DFA by the subset construction: an NFA with n states yields a DFA with at most 2^n states, and this exponential blow-up is sometimes unavoidable (the classic witness is the language whose k-th symbol from the right is a fixed letter, which has an NFA with k+1 states but needs a DFA with 2^k states). So NFAs and DFAs are equal in power but can differ exponentially in size.\n\nRegular expressions built from union, concatenation, and Kleene star describe exactly the regular languages (Kleene's theorem). Useful identities: (r*)* = r*, (r + s)* = (r*s*)*, and emptyset* = epsilon.\n\n• Minimal DFA and state counting. The minimal DFA is unique up to renaming of states. To count its states, ask: what information about the prefix read so far is both necessary and sufficient to decide the future? For 'number of 1s congruent to r mod k' you need the count mod k: k states. For 'contains substring s' you track the longest prefix of s matched so far: |s| + 1 states. For 'ends with s' you similarly track suffix progress, often |s| + 1 states or fewer after merging. For a conjunction of independent conditions, take the product automaton and then check reachability and distinguishability - often all product states survive, e.g. (number of a's even) AND (number of b's divisible by 3) needs 2 x 3 = 6 states.\n\n• Myhill-Nerode theorem. Define x and y equivalent with respect to L when for every string z, xz is in L exactly when yz is in L. L is regular if and only if this relation has finitely many equivalence classes, and the number of classes equals the number of states of the minimal DFA. This gives both a minimality proof technique (exhibit k pairwise distinguishable strings to force at least k states) and a non-regularity technique (exhibit infinitely many pairwise distinguishable strings, e.g. a, aa, aaa, ... for {a^n b^n}, distinguished by suffixes b^n).\n\n• Pumping lemma. If L is regular there is a constant p such that every w in L with |w| >= p splits as xyz with |xy| <= p, y nonempty, and xy^i z in L for all i >= 0. The lemma is a necessary condition only: it can prove non-regularity but can never prove regularity, since some non-regular languages still satisfy the pumping property.\n\n• Closure properties. Regular languages are closed under union, intersection, complement, difference, concatenation, Kleene star, reversal, homomorphism, and inverse homomorphism. Complementation is trivial on a DFA (swap final and non-final states) but is NOT valid on an NFA. Also remember: every finite language is regular; a subset of a regular language need not be regular ({a^n b^n} is a subset of a*b*); and if L is regular then so is its complement with a minimal DFA of exactly the same size.",
        strategy: "GATE patterns to expect: (1) 'Minimum number of states in the DFA for L' where L mixes a mod condition with a substring or suffix condition - build the product machine, then prune unreachable states and merge indistinguishable ones before answering. (2) 'Which of the following is regular' - scan each option for an unbounded comparison between two counts; any language forcing you to remember an unbounded number is suspect, but check for finiteness first, because {a^n b^n : n <= 100} is finite and therefore regular. (3) True/false combos on closure - remember NFA complementation by swapping final states is a trap, and 'satisfies pumping lemma implies regular' is always false.\n\nWorked mini-example: minimum DFA states for binary strings that end in 01. Track the useful suffix of what has been read: nothing useful, ends in 0, ends in 01. From 'ends in 01' reading 0 goes back to 'ends in 0', reading 1 goes to 'nothing useful'. All three states are pairwise distinguishable (test suffixes epsilon, 1, and 01), so the answer is 3.\n\nTime traps: do not hand-simulate subset construction fully when only the count is asked - reachable subsets are usually far fewer than 2^n. In Myhill-Nerode questions, counting equivalence classes is usually faster and safer than drawing the machine. When two conditions are dependent (e.g. length mod 2 and ends in a fixed symbol), the product bound is not tight - always verify distinguishability."
      },
      questions: [
        {
          id: 'toc-regular-q1',
          q: 'An NFA has n states. In the worst case, how many states can the equivalent minimal DFA obtained via subset construction require?',
          options: ['n', 'n^2', '2^n', 'n!'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "The subset construction makes each DFA state correspond to a set of NFA states, and there are 2^n subsets of an n-element set, so the DFA has at most 2^n states. This bound is actually achieved: for the language of strings whose n-th symbol from the right is 1, an NFA with n+1 states exists, but any DFA must remember the last n symbols read, forcing 2^n states (any two distinct n-length windows are distinguishable by an appropriate suffix). So the answer is 2^n, and the key takeaway is that NFAs add no expressive power but can be exponentially more succinct."
        },
        {
          id: 'toc-regular-q2',
          q: 'Which of the following languages over {a, b} is regular?',
          options: ['{ a^n b^n : n >= 0 }', '{ w w^R : w in {a,b}* }', '{ a^n b^m : n >= 0, m >= 0 }', '{ a^p : p is prime }'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Test each option for whether a machine with finite memory suffices. {a^n b^m} with independent n and m is just 'some a's followed by some b's', described by the regular expression a*b*, so it is regular - no comparison between the two counts is required. {a^n b^n} requires matching an unbounded count of a's against b's; the strings a, aa, aaa, ... are pairwise distinguishable (append b^n), so by Myhill-Nerode it is not regular. {w w^R}, the even palindromes, similarly needs unbounded memory of the first half. {a^p : p prime} fails the pumping lemma: pumping changes length arithmetically and must eventually land on a composite length. Hence option C."
        },
        {
          id: 'toc-regular-q3',
          q: 'The regular expression (0 + 1)* 0 (0 + 1)* over {0,1} denotes the set of all strings that',
          options: ['end with 0', 'begin with 0', 'contain at least one 0', 'contain exactly one 0'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Read the expression structurally: (0+1)* matches any string including the empty string, then a mandatory single 0, then again any string. So a string matches exactly when it can be split as (anything) 0 (anything), which means it has at least one occurrence of 0 somewhere. It need not end or begin with 0 because the surrounding (0+1)* parts absorb arbitrary prefixes and suffixes, and it can contain many 0s since the flanking parts may themselves contain 0s. This decomposition method - identify the mandatory core and what the starred parts absorb - is the standard way to read GATE regular expressions."
        },
        {
          id: 'toc-regular-q4',
          q: 'Which of the following statements about closure of regular languages is FALSE?',
          options: ['Regular languages are closed under complementation', 'Regular languages are closed under intersection', 'Every subset of a regular language is regular', 'Regular languages are closed under reversal'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Closure under complement holds: take a DFA (must be deterministic and complete) and swap final and non-final states. Closure under intersection follows from union and complement via De Morgan, or directly by the product construction. Reversal holds by reversing all transitions and swapping start/final roles (using an NFA). But 'every subset of a regular language is regular' confuses closure under an operation with closure under containment: a*b* is regular, yet its subset {a^n b^n : n >= 0} is not. In fact every language over {a,b} is a subset of the regular language (a+b)*, so if subsets were regular, all languages would be. Option C is false."
        },
        {
          id: 'toc-regular-q5',
          q: 'What is the number of states in the minimal DFA accepting the set of all strings over {0,1} in which the number of 1s is congruent to 2 modulo 3?',
          options: ['2', '3', '4', '6'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "The only information the machine needs about the prefix read so far is the count of 1s modulo 3, which takes values 0, 1, 2. Build states q0, q1, q2 for these residues: each 1 advances the residue cyclically, each 0 is a self-loop, start at q0, accept at q2. All three states are needed because they are pairwise distinguishable: from residue r the shortest accepted suffix is 1^((2-r) mod 3), which differs for each r, so no two states can be merged. Hence the minimal DFA has exactly 3 states. General rule: a 'count mod k' condition needs exactly k states, independent of which residue is accepting."
        },
        {
          id: 'toc-regular-q6',
          q: 'The minimum number of states in a DFA accepting all strings over {a,b} that contain the substring abb is',
          options: ['3', '4', '5', '8'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "For a 'contains substring s' language, the DFA tracks the longest prefix of s that is a suffix of the input read so far, giving |s| + 1 states. Here s = abb, so states are: matched nothing, matched a, matched ab, matched abb (accepting sink, since once the substring appears it stays present). Transitions handle fallback: from 'ab', reading a returns to 'a' (not to nothing), reading b completes abb. Distinguishability: the shortest accepting suffixes from the four states are abb, bb, b, epsilon respectively - all different lengths, so no merging is possible. Answer: 4 states."
        },
        {
          id: 'toc-regular-q7',
          q: 'The minimum number of states in a DFA that accepts exactly the set of binary strings ending in 01 is',
          options: ['2', '3', '4', '5'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Track the longest suffix of the input that is a prefix of 01: state A (no useful suffix), state B (ends in 0), state C (ends in 01, accepting). Transitions: A on 0 goes to B, on 1 stays at A; B on 0 stays at B, on 1 goes to C; C on 0 goes to B (that 0 may start a new 01), on 1 goes to A. Check minimality by distinguishing suffixes: epsilon accepts only from C, the suffix 1 accepts only from B, so A, B, C are pairwise distinguishable. Therefore 3 states suffice and are necessary. Note the contrast with 'contains 01', which also needs 3 states but with an accepting sink."
        },
        {
          id: 'toc-regular-q8',
          q: 'Let L = { w in {a,b}* : w has an equal number of a and b }. Using Myhill-Nerode reasoning, which statement is correct?',
          options: ['L is regular because each class of the equivalence relation is finite', 'L is not regular because the strings a, aa, aaa, ... are pairwise distinguishable', 'L is regular with a minimal DFA of 2 states', 'L is not regular because it fails to be closed under reversal'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Myhill-Nerode says L is regular iff the relation 'x equivalent to y when xz in L exactly matches yz in L for all z' has finitely many classes. Consider a^i and a^j with i < j: the suffix b^i puts a^i b^i in L but a^j b^i has more a's than b's, so it is not in L. Thus every pair a^i, a^j is distinguished, giving infinitely many equivalence classes, so no finite automaton can exist - each class would need its own state. Option B states exactly this argument. Option D is irrelevant (L actually equals its own reversal class-wise, and reversal closure is a property of the regular family, not a test for one language)."
        },
        {
          id: 'toc-regular-q9',
          q: 'Which of the following statements about the pumping lemma for regular languages is TRUE?',
          options: ['Every language satisfying the pumping condition is regular', 'The pumping lemma can be used to prove that a language is regular', 'If a language violates the pumping condition, it is not regular', 'The pumping lemma applies only to infinite regular languages'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "The pumping lemma has the form: L regular implies L satisfies the pumping condition. The contrapositive - violating the condition implies not regular - is the only valid use, which is option C. The converse fails: there exist non-regular languages that nevertheless satisfy the pumping condition, so satisfying it proves nothing (options A and B are false). Option D is false too: the lemma holds vacuously or trivially for finite languages (choose p longer than the longest string). Exam tip: any option claiming the pumping lemma establishes regularity, or that it is a sufficient condition, is automatically wrong; it is necessary, not sufficient."
        },
        {
          id: 'toc-regular-q10',
          q: 'L1 is regular and L2 is not regular. Which of the following is necessarily TRUE about L1 intersect L2?',
          options: ['It is always regular', 'It is never regular', 'It may be regular or non-regular depending on the languages', 'It is always context-free but never regular'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Closure properties only constrain operations within a class; mixing classes gives no guarantee either way, so test with examples. Take L1 = empty set (regular): the intersection is empty, which is regular. Take L1 = a*b* (regular) and L2 = {a^n b^n}: the intersection is {a^n b^n} itself, not regular. Both outcomes occur, so the correct answer is 'may be either'. Option D also fails: the intersection can even be non-context-free if L2 is (e.g. L1 = Sigma* and L2 = {a^n b^n c^n}). The general exam rule: 'regular op non-regular' questions almost always resolve to 'cannot be determined', verified by one example each way."
        },
        {
          id: 'toc-regular-q11',
          q: 'Consider L = set of strings over {0,1} in which every 0 is immediately followed by a 1. The number of states in the minimal (complete) DFA for L is',
          options: ['2', '3', '4', '5'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Design by tracking obligations. State A (accepting): no pending obligation; on 1 stay at A, on 0 move to B because that 0 now owes an immediate 1. State B (non-accepting): on 1 the obligation is met, return to A; on 0 the previous 0 was followed by another 0, which violates the condition permanently, so go to dead state D. D loops to itself on both symbols. Minimality: A accepts epsilon, B accepts 1 but not epsilon, D accepts nothing - all pairwise distinguishable. A complete DFA therefore needs exactly 3 states. Note the dead state must be counted; forgetting it and answering 2 is the classic error."
        },
        {
          id: 'toc-regular-q12',
          q: 'The minimum number of states in a DFA accepting the set of binary strings whose third symbol from the right end is 1 is',
          options: ['4', '6', '8', '16'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "A DFA reads left to right and cannot know where the string ends, so at every moment it must be ready to answer using only stored information. Acceptance depends on the last three symbols, so the DFA must remember the last three symbols exactly: 2^3 = 8 possibilities. To see none can be merged, take two distinct 3-symbol windows u and v; they differ in some position i from the right, and appending i-1 further symbols shifts that differing bit into the third-from-right position, so some suffix distinguishes u from v. (Short prefixes of length under 3 also map into these 8 states consistently by padding with 0s.) Contrast with the NFA, which needs only 4 states by guessing where the final three symbols begin. Answer: 8."
        },
        {
          id: 'toc-regular-q13',
          q: 'What is the number of states in the minimal DFA for the language of strings over {a,b} in which the number of a is even AND the number of b is divisible by 3?',
          options: ['3', '5', '6', '8'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Use the product construction: one component tracks the a-count mod 2 (2 states), the other tracks the b-count mod 3 (3 states), giving at most 2 x 3 = 6 product states, with (0,0) as the sole accepting state. Now verify no reduction is possible. Every pair (i, j) is reachable: read a^i b^j. Any two distinct pairs are distinguishable: if the a-parities differ, some suffix a^x b^y is accepted from one but not the other; similarly for differing b-residues, because the accepting condition constrains both coordinates independently. Since the two conditions are on disjoint symbols they are truly independent, so the product bound is tight: 6 states. When conditions share symbols (e.g. length mod 2 and ends in a), always re-check - the product is only an upper bound."
        },
        {
          id: 'toc-regular-q14',
          q: 'Which of the following languages over {a,b} IS regular?',
          options: ['{ a^n b^n : n >= 0 }', '{ a^n b^n : 0 <= n <= 100 }', '{ w w : w in {a,b}* }', '{ a^m b^n : m and n differ by exactly 1 }'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "The trap is pattern-matching on the shape a^n b^n without reading the bound. Option B is a finite language - it contains exactly 101 strings - and every finite language is regular (union of finitely many singletons). Option A is the classic non-regular language: unbounded matching of counts. Option D, strings where the counts differ by exactly 1, still requires comparing two unbounded counts; the strings a, aa, aaa, ... are pairwise distinguishable via suffixes b^(n+1), so it is not regular. Option C, {ww}, is not even context-free. Rule of thumb: any bounded/finite restriction rescues regularity; any unbounded numeric relation between counts destroys it."
        },
        {
          id: 'toc-regular-q15',
          q: 'The minimal DFA for a regular language L has exactly n states. The minimal DFA for the complement of L (over the same alphabet) has',
          options: ['exactly n states', 'at most n - 1 states', 'exactly n + 1 states', 'possibly exponentially many states'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Take the minimal (hence complete and deterministic) DFA for L and swap final and non-final states; the result accepts exactly the complement, so the complement needs at most n states. Could it need fewer? No: two states are distinguishable for L exactly when they are distinguishable for the complement (a suffix separating membership separates non-membership identically), so the swapped machine is still minimal. Hence exactly n. The exponential-blow-up intuition belongs to NFA complementation: complementing via an NFA first requires determinization, which can cost 2^n. For DFAs the operation is free. This distinction - complement is trivial on DFAs, expensive from NFAs - is a frequent GATE true/false target."
        }
      ]
    },
    {
      id: 'toc-cfl',
      name: 'Context-Free Languages & Pushdown Automata',
      theory: {
        intro: "Context-free languages (CFLs) add one crucial capability beyond regular languages: a single unbounded stack. This lets a machine match nested, one-to-one correspondences - equal counts of a's and b's, balanced parentheses, palindromes - but not two independent correspondences at once. CFLs are generated by context-free grammars (CFGs) and accepted by pushdown automata (PDAs). GATE questions probe grammar design and ambiguity, normal forms (especially Chomsky Normal Form), the strict gap between deterministic CFLs (DCFLs) and general CFLs, the pumping lemma for CFLs, and above all closure properties - where CFLs behave very differently from regular languages: closed under union but not under intersection or complement. The single most-tested fact cluster is: {a^n b^n} is a DCFL, {w w^R} is a CFL but not a DCFL, and {a^n b^n c^n} is not a CFL at all. Keep those three anchors and most classification questions fall quickly.",
        core: "A CFG has productions A -> alpha where A is a single nonterminal and alpha is any string of terminals and nonterminals. The language is everything derivable from the start symbol. A grammar is ambiguous if some string has two distinct leftmost derivations (equivalently, two parse trees). Ambiguity is a property of a grammar; a language is inherently ambiguous when every grammar for it is ambiguous - the standard example is { a^i b^j c^k : i = j or j = k }. Deciding whether a given CFG is ambiguous is undecidable.\n\n• Chomsky Normal Form (CNF): every production is A -> BC or A -> a (with S -> epsilon allowed only if epsilon is in L and S not on any right side). Every CFL has a CNF grammar. In CNF, deriving a string of length n takes exactly 2n - 1 production applications (n - 1 binary steps building structure and n terminal steps), a favorite numerical question. Greibach Normal Form (A -> a alpha) is the other named form.\n\n• PDAs. A PDA is a finite automaton plus one stack. Nondeterministic PDAs accept exactly the CFLs (by final state or by empty stack - equivalent for NPDAs). Deterministic PDAs accept the strictly smaller class DCFL. Examples: {a^n b^n} is DCFL (push a's, pop on b's). {w c w^R} is DCFL (the center marker c tells the machine when to switch from pushing to popping). {w w^R} without a marker is CFL but NOT DCFL - the machine must guess the midpoint. Every regular language is a DCFL, so Regular is strictly inside DCFL is strictly inside CFL.\n\n• Pumping lemma for CFLs: for a CFL L there is p such that any w in L with |w| >= p splits as uvxyz with |vxy| <= p, vy nonempty, and u v^i x y^i z in L for all i >= 0. Two portions pump in lockstep. This kills {a^n b^n c^n} (pumping cannot grow all three blocks), {a^i b^j c^k : i < j < k}, {ww}, and {a^(n^2)}. As with the regular case, it is necessary, not sufficient.\n\n• Closure properties - the heart of GATE scoring here. CFLs ARE closed under: union, concatenation, Kleene star, reversal, homomorphism, inverse homomorphism, substitution, and intersection with a regular language. CFLs are NOT closed under: intersection or complement. The standard witness: L1 = {a^n b^n c^m} and L2 = {a^m b^n c^n} are both CFLs, but L1 intersect L2 = {a^n b^n c^n} is not. Non-closure under complement then follows from De Morgan (closure under union plus complement would force closure under intersection). DCFLs behave almost oppositely: closed under complement, and under intersection with regular languages, but NOT closed under union, intersection, concatenation, Kleene star, or reversal.\n\n• Decidability interface: membership (CYK algorithm, O(n^3) with CNF), emptiness, and finiteness are decidable for CFGs; equivalence, universality (L(G) = Sigma*), ambiguity, and whether a CFL is inherently ambiguous are undecidable.",
        strategy: "GATE patterns: (1) Classification chains - given four languages, mark each as regular / DCFL / CFL-not-DCFL / not-CFL. Anchor on the canonical examples: one matching relation with a clear trigger to switch phases means DCFL; a needed guess (midpoint, or an 'or' of two conditions) pushes to CFL-not-DCFL; two overlapping relations (three equal blocks, ww, i<j<k) mean not CFL. (2) Closure true/false combos - memorize the asymmetric table: CFL loses intersection and complement; DCFL keeps complement but loses union. A statement like 'complement of a CFL is never a CFL' is false: complements of DCFLs like {a^n b^n} are DCFLs, hence CFLs; non-closure only means it can fail sometimes. (3) CNF numericals - derivation of a length-n string uses 2n - 1 steps.\n\nWorked mini-example: is L = {a^i b^j : i differs from j} a DCFL? Yes: it is the complement (within a*b* handling) intuition - directly, a DPDA pushes a's, pops on b's, and accepts if the stack is nonempty at the end or b's arrive after the stack empties; no guessing needed. Contrast with {a^i b^j c^k : i = j or j = k}, where the machine must guess which equality to verify before seeing the c's - that one is inherently ambiguous and not deterministic.\n\nTraps: 'CFL intersect regular' is always a CFL (run PDA and DFA in parallel) - do not confuse it with CFL intersect CFL. And undecidability of grammar ambiguity does not make ambiguity questions unanswerable for a specific small grammar - exhibit two parse trees."
      },
      questions: [
        {
          id: 'toc-cfl-q1',
          q: 'Which machine model accepts exactly the class of context-free languages?',
          options: ['Deterministic pushdown automaton', 'Nondeterministic pushdown automaton', 'Linear bounded automaton', 'Finite automaton with two stacks'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Nondeterministic PDAs characterize CFLs exactly: every CFG can be converted to an NPDA that simulates leftmost derivations on its stack, and conversely. Deterministic PDAs accept only the strictly smaller DCFL class - {w w^R} is a CFL no DPDA accepts, because the midpoint must be guessed. A linear bounded automaton accepts context-sensitive languages, a strictly larger class. A finite automaton with two stacks can simulate a Turing machine tape (one stack holds what is left of the head, the other what is right), so it accepts all recursively enumerable languages - far too powerful. Hence option B."
        },
        {
          id: 'toc-cfl-q2',
          q: 'The language L = { a^n b^n : n >= 0 } is',
          options: ['regular', 'deterministic context-free but not regular', 'context-free but not deterministic context-free', 'not context-free'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "L is not regular: by Myhill-Nerode, a, aa, aaa, ... are pairwise distinguishable (a^i is completed to a member only by b^i). L is context-free via the grammar S -> a S b | epsilon. Moreover it is deterministic: a DPDA pushes a marker for each a, then on the first b switches phase and pops one marker per b, accepting when input and stack finish together - every move is forced by the current input symbol, no guessing. So L sits exactly in DCFL minus Regular, option B. This language is the standard anchor separating regular from deterministic context-free, worth memorizing alongside {w w^R} (CFL not DCFL) and {a^n b^n c^n} (not CFL)."
        },
        {
          id: 'toc-cfl-q3',
          q: 'In a grammar in Chomsky Normal Form, every production has the form',
          options: ['A -> BC or A -> a', 'A -> aB or A -> a', 'A -> a alpha where alpha is any string of variables', 'A -> BC or A -> aB'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "CNF permits exactly two production shapes: a nonterminal producing two nonterminals (A -> BC) or a nonterminal producing a single terminal (A -> a), with the special allowance S -> epsilon when the language contains the empty string. Option B (A -> aB or A -> a) describes a right-linear regular grammar, and option C (A -> a alpha) describes Greibach Normal Form - both classic distractors. CNF matters because it makes parse trees binary, which powers the CYK membership algorithm and the counting fact that a string of length n needs exactly 2n - 1 derivation steps: n - 1 applications of A -> BC to create n leaves, then n applications of A -> a."
        },
        {
          id: 'toc-cfl-q4',
          q: 'Context-free languages are closed under which of the following operations?',
          options: ['Intersection', 'Complementation', 'Union', 'Set difference'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Union is easy for grammars: given grammars with start symbols S1 and S2 (renamed apart), add S -> S1 | S2. Intersection fails: {a^n b^n c^m} and {a^m b^n c^n} are both CFLs but intersect to {a^n b^n c^n}, which is not context-free. Complement then must also fail, by De Morgan: if CFLs were closed under complement, then union plus complement would give intersection, contradiction. Set difference fails too, since Sigma* minus L is exactly the complement. So the only survivor among the options is union. Memorize the pattern: CFLs keep the 'regular-expression operations' (union, concatenation, star) plus reversal and homomorphisms, and lose the Boolean ones (intersection, complement, difference)."
        },
        {
          id: 'toc-cfl-q5',
          q: 'The language { a^n b^n c^n : n >= 0 } is',
          options: ['context-free but not regular', 'deterministic context-free', 'context-sensitive but not context-free', 'not recursively enumerable'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "A stack can verify one matching relation, but here two must hold simultaneously: count(a) = count(b) and count(b) = count(c). After popping the stack to match b's against a's, the count is gone and c's cannot be checked. Formally, the CFL pumping lemma kills it: in a long word a^p b^p c^p, the pumped window vxy spans at most two of the three blocks, so pumping unbalances the third. The language is easily context-sensitive (a linear bounded automaton can cross off one a, one b, one c per pass within the input space), and certainly recursive, hence RE. So it is context-sensitive but not context-free - the canonical inhabitant of that gap."
        },
        {
          id: 'toc-cfl-q6',
          q: 'Which of the following is TRUE about deterministic context-free languages (DCFLs)?',
          options: ['DCFLs are closed under union', 'DCFLs are closed under complementation', 'DCFLs are closed under intersection', 'DCFLs are closed under reversal'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Complementation is the signature closure of DCFLs: a DPDA can be normalized to always read its whole input and halt, and then its accepting condition can be inverted (the construction is delicate but standard). Union fails: {a^i b^j c^k : i = j} and {a^i b^j c^k : j = k} are DCFLs whose union is the inherently ambiguous language {i = j or j = k}, which no DPDA accepts. Intersection fails with the usual witness intersecting down to {a^n b^n c^n}. Reversal fails as well: a language can be deterministic reading left-to-right but require guessing when read reversed. Note the striking asymmetry with general CFLs, which keep union and reversal but lose complement - a favorite GATE contrast."
        },
        {
          id: 'toc-cfl-q7',
          q: 'Consider L1 = { w c w^R : w in {a,b}* } and L2 = { w w^R : w in {a,b}* }, where c is a distinct symbol. Which is correct?',
          options: ['Both are deterministic context-free', 'L1 is DCFL; L2 is CFL but not DCFL', 'L1 is CFL but not DCFL; L2 is DCFL', 'Neither is context-free'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Both are palindrome-style languages, so both are CFLs (push the first half, pop while matching the second half). The difference is whether the switch point is visible. In L1 the center marker c is explicit: a DPDA pushes symbols until it reads c, then deterministically pops and matches - every move forced, so L1 is DCFL. In L2 there is no marker; the machine must guess where the midpoint is, and different guesses matter for different inputs. It can be proven no DPDA accepts L2, making it the canonical CFL that is not deterministic. This 'marker makes it deterministic' principle resolves many GATE classification questions instantly."
        },
        {
          id: 'toc-cfl-q8',
          q: 'L1 = { a^n b^n c^m : n, m >= 0 } and L2 = { a^m b^n c^n : n, m >= 0 } are both context-free. The fact that L1 intersect L2 = { a^n b^n c^n } demonstrates that',
          options: ['CFLs are not closed under union', 'CFLs are not closed under intersection', 'CFLs are not closed under concatenation', 'the pumping lemma fails for CFLs'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Work out the intersection: a string in both languages must have its a-count equal to its b-count (from L1) and its b-count equal to its c-count (from L2), giving exactly {a^n b^n c^n}, which the CFL pumping lemma shows is not context-free. So we have two CFLs whose intersection leaves the class - precisely a counterexample to closure under intersection. It says nothing about union (CFLs are closed under union) or concatenation (also closed). This construction is worth internalizing because it is reused everywhere: it also proves non-closure under complement via De Morgan, and it is the template for building undecidability results about CFG intersection emptiness."
        },
        {
          id: 'toc-cfl-q9',
          q: 'Which of the following statements about ambiguity is TRUE?',
          options: ['If a grammar is ambiguous, the language it generates is inherently ambiguous', 'An inherently ambiguous CFL has no unambiguous CFG generating it', 'Ambiguity of a CFG can always be removed algorithmically', 'A language generated by an unambiguous grammar may still be inherently ambiguous'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Keep the grammar/language distinction sharp. Ambiguity is defined on grammars: some string has two parse trees. Inherent ambiguity is defined on languages: every grammar for the language is ambiguous - that is exactly option B. Option A is false because an ambiguous grammar may generate a language that some other, unambiguous grammar also generates (e.g. S -> S S | a is ambiguous, but a a* has unambiguous grammars). Option D contradicts the definition outright: exhibiting one unambiguous grammar certifies the language is not inherently ambiguous. Option C is false because deciding whether a CFG is ambiguous is undecidable, so no general removal algorithm can exist. Standard inherently ambiguous example: { a^i b^j c^k : i = j or j = k }."
        },
        {
          id: 'toc-cfl-q10',
          q: 'Which of the following languages is NOT context-free?',
          options: ['{ a^i b^j : i differs from j }', '{ a^n b^n : n >= 0 }', '{ w w^R : w in {a,b}* }', '{ a^i b^j c^k : i < j < k }'],
          answer: 3,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Options A, B, C each need only one stack-checkable relation. For A, a PDA matches a's against b's and accepts precisely when they fail to cancel exactly. B and C are the standard stack languages. Option D requires maintaining two strict inequalities i < j and j < k simultaneously - two independent comparisons through the shared middle count j. Pumping confirms it: take a^p b^(p+1) c^(p+2); the window vxy touches at most two adjacent blocks. If it avoids the c-block, pump up to push i or j past the c-count; if it avoids the a-block, pump down to drag j or k down to the a-count. Every case breaks an inequality, so D is not a CFL."
        },
        {
          id: 'toc-cfl-q11',
          q: 'Which of the following statements is TRUE?',
          options: ['Every regular language is a DCFL', 'Every CFL is a DCFL', 'A DPDA accepting by empty stack accepts all DCFLs', 'DCFLs are not closed under intersection with regular languages'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "A DFA is a DPDA that simply ignores its stack, so every regular language is deterministic context-free: option A. Option B collapses a strict hierarchy: {w w^R} is CFL but not DCFL. Option C is a subtle classic: for deterministic PDAs, empty-stack acceptance is strictly weaker than final-state acceptance - an empty-stack DPDA can only accept prefix-free languages (once the stack empties it must stop, so no accepted string can be a proper prefix of another). Since DCFLs like a* are not prefix-free, C fails. Option D is false: running a DPDA and a DFA in parallel stays deterministic, so DCFL intersect regular is DCFL. Answer: A."
        },
        {
          id: 'toc-cfl-q12',
          q: 'Consider L = { a^i b^j c^k : i = j or j = k }. Which of the following is TRUE?',
          options: ['L is a DCFL', 'L is context-free and inherently ambiguous', 'L is not context-free', 'L is regular'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "L is a union of two CFLs - {i = j} with free k, and {j = k} with free i - and CFLs are closed under union, so L is context-free (option C is out; regularity is absurd since even {a^n b^n} inside it is not regular). But the union is troublesome: strings a^n b^n c^n satisfy both conditions, and it can be proven (Parikh/Ogden-style arguments) that any grammar must generate these strings through both 'branches', forcing two parse trees - L is the textbook inherently ambiguous language. It is also not deterministic: a DPDA would have to commit to checking i = j or j = k before seeing the c's. Hence option B, and this one example simultaneously witnesses DCFL non-closure under union."
        },
        {
          id: 'toc-cfl-q13',
          q: 'If L is a deterministic context-free language, then the complement of L is necessarily',
          options: ['regular', 'a deterministic context-free language', 'context-free but possibly not deterministic', 'possibly not context-free'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "DCFLs are closed under complement: normalize the DPDA so it never gets stuck or loops forever on epsilon-moves (always consumes the entire input), then invert acceptance carefully at end-of-input. So the complement is again a DCFL - the strongest true statement, option B. Option C is true-but-weaker and therefore not the best answer under 'necessarily... strongest classification' - and more importantly it suggests determinism might be lost, which the closure theorem rules out. Option A is false: complement of {a^n b^n} is not regular (regular languages are closed under complement, so a regular complement would force L regular). This closure is precisely how one proves some CFLs are not DCFLs: if L were DCFL, its complement would be a CFL - contradiction when it is not."
        },
        {
          id: 'toc-cfl-q14',
          q: 'Let L = { w w : w in {a,b}* }. Which of the following is TRUE?',
          options: ['L is context-free and its complement is not', 'Neither L nor its complement is context-free', 'L is not context-free but its complement is context-free', 'Both L and its complement are context-free'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "L = {ww} is not context-free: intersecting it with the regular set a*b*a*b* gives {a^i b^j a^i b^j}, which pumping destroys (a CFL intersected with a regular set must stay a CFL, so L cannot be one). Surprisingly, the complement IS context-free. Odd-length strings are all in the complement (easy). An even-length string x y with |x| = |y| differs from every ww exactly when some position i has x_i unequal to y_i; a nondeterministic PDA can guess i, use its stack to measure matching distances, and verify the mismatch. This 'ww versus its complement' inversion is a beloved GATE trap: the intuitive guess (D or A) is wrong in both directions."
        },
        {
          id: 'toc-cfl-q15',
          q: 'Under which of the following operations are context-free languages NOT closed?',
          options: ['Reversal', 'Homomorphism', 'Intersection with a regular language', 'Intersection with another context-free language'],
          answer: 3,
          marks: 1,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Reversal: reverse every production body in the grammar; the language reverses. Homomorphism: substitute h(a) for each terminal a in the productions. Intersection with a regular language: run the PDA and the DFA as a product machine - one stack still suffices because the DFA needs none, so the result is a CFL (this is a heavily used lemma). But intersection of two CFLs can fail: {a^n b^n c^m} intersect {a^m b^n c^n} = {a^n b^n c^n}, not context-free - each PDA needs its own stack and two stacks equal Turing power. So the answer is D. Exam heuristic: 'with regular' is safe for both CFL and DCFL; 'with another CFL' is the standard failure."
        }
      ]
    },
    {
      id: 'toc-turing',
      name: 'Turing Machines, Recursive & Recursively Enumerable Languages',
      theory: {
        intro: "The Turing machine (TM) is the maximal model of effective computation: a finite control with an unbounded tape it can read, write, and traverse in both directions. Two language classes arise from it and dominate GATE questions. A language is recursive (REC, decidable) if some TM accepts every string in it and rejects every string outside it - halting on all inputs. A language is recursively enumerable (RE, semi-decidable) if some TM accepts exactly its members but may loop forever on non-members. Every recursive language is RE, and the containment is strict: the halting problem's language is RE but not recursive. GATE tests the robustness of the model (variants add no power), the complementation asymmetry between REC and RE, closure-property combos, the enumerator characterizations, and counting arguments showing most languages are not RE at all. These facts also feed directly into decidability questions, so this topic is foundational for the next.",
        core: "TM variants and robustness. Multi-tape TMs, two-way infinite tape TMs, nondeterministic TMs, and TMs with multiple heads all accept exactly the same class of languages as the basic one-tape deterministic TM - constructions simulate each in the basic model (a multi-tape TM is simulated with quadratic slowdown; an NTM by breadth-first search over computation trees, with possibly exponential slowdown). Power is unchanged; only efficiency differs. In contrast, restricting the tape changes everything: read-only input gives finite automata, a single stack gives PDAs, tape bounded by input length gives linear bounded automata.\n\n• Recursive versus RE, precisely. L is recursive iff some TM halts on every input, answering yes/no correctly - an algorithm. L is RE iff some TM halts-and-accepts exactly on members; on non-members it may reject or loop. Equivalent characterization by enumerators: L is RE iff some TM can enumerate (print) all members of L in some order, possibly with repetition; L is recursive iff some enumerator prints L in nondecreasing length (canonical) order - because then to decide w you wait until w appears or a longer string appears.\n\n• The fundamental complement theorem. If L and its complement are both RE, then L is recursive: run the two semi-deciders in parallel (dovetailing); exactly one must eventually accept, giving a total decision procedure. Contrapositive forms are exam gold: if L is RE but not recursive, then complement of L is not RE; if L is undecidable but RE, its complement cannot even be enumerated.\n\n• Closure properties. REC is closed under: union, intersection, complement, concatenation, Kleene star, reversal, set difference. RE is closed under: union, intersection, concatenation, Kleene star, reversal, homomorphism - but NOT complement and NOT set difference (Sigma* minus L is the complement). The complement gap is the single most-tested line in this topic. For mixed cases reason from definitions: REC intersect RE is RE (intersection of two RE sets is RE) but need not be recursive (take L RE-not-REC intersected with Sigma*).\n\n• Countability and encodings. Every TM can be encoded as a finite binary string, so the set of all TMs is countably infinite, and so is the set of RE languages. But the set of ALL languages over {0,1} is uncountable (power set of a countable set, by diagonalization). Therefore languages exist that are not RE - in fact 'almost all' languages are not RE. This counting argument requires no specific construction and appears regularly as a conceptual question.\n\n• Canonical examples for placement: A_TM = { (M, w) : M accepts w } and HALT = { (M, w) : M halts on w } are RE but not recursive. Their complements are not RE. The set of encodings of TMs that are total (halt on all inputs) is not even RE. Every CFL and every CSL is recursive; containments Regular subset CFL subset CSL subset REC subset RE are all strict.",
        strategy: "GATE patterns: (1) True/false batteries on closure - the fastest correct method is to recall the two rows (REC: all Boolean operations; RE: everything except complement/difference) and derive mixed statements from the complement theorem rather than memorizing them separately. (2) 'L is RE, complement of L is RE; what is L?' - answer recursive, by dovetailing. (3) Enumerator phrasing - 'listed by some procedure' means RE; 'listed in increasing/canonical order' means recursive. (4) Counting - TMs are countable, languages are not, so non-RE languages exist; any option claiming every language is RE or every undecidable language is still RE is false (witness: complement of the halting set).\n\nWorked mini-example: L1 is recursive, L2 is RE but not recursive. Classify L1 intersect L2. Both are RE and RE is closed under intersection, so the result is RE. Must it be recursive? No - choose L1 = Sigma*: the intersection is L2 itself, not recursive. Can it be recursive? Yes - choose L1 = empty set. So the strongest guaranteed classification is 'RE, not necessarily recursive'. GATE loves this 'strongest guarantee' framing; always test both extremes (empty set and Sigma*) as the regular-language slot.\n\nTraps: nondeterminism never adds language power to TMs (only speed); 'TM that may loop' describes a recognizer, not a decider; and a subset of a recursive language need not be recursive - subset relations preserve nothing here, exactly as with regular languages."
      },
      questions: [
        {
          id: 'toc-turing-q1',
          q: 'Which of the following Turing machine variants accepts a class of languages strictly larger than the standard single-tape deterministic TM?',
          options: ['Multi-tape deterministic TM', 'Nondeterministic TM', 'TM with a two-way infinite tape', 'None of these'],
          answer: 3,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "All the listed variants are equivalent in language-accepting power to the basic model; this robustness is exactly why the Turing machine is taken as the definition of computability (Church-Turing thesis). A multi-tape TM is simulated on one tape by storing all tapes in interleaved tracks with marked head positions (quadratic slowdown). A two-way infinite tape folds into a one-way tape with two tracks. A nondeterministic TM is simulated by breadth-first search through the tree of configurations - possibly exponentially slower, but every accepted string is still found. Variants change efficiency, never the class of languages. So the answer is 'none of these'."
        },
        {
          id: 'toc-turing-q2',
          q: 'A language L is recursive if and only if',
          options: ['some TM accepts every string in L and loops on strings not in L', 'some TM halts on every input, accepting exactly the strings of L', 'every TM that accepts L halts on all inputs', 'some TM accepts L and L is countable'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Recursive means decidable: there exists a single TM that is total - it halts on every input - and answers correctly, accepting members and rejecting non-members. Option A describes only recognition with possible looping, which is the weaker RE property. Option C quantifies the wrong way: a recursive language always has some non-halting TMs accepting it too (add a gratuitous loop); the definition needs one good machine to exist, not all machines to behave. Option D is vacuous since every language over a finite alphabet is countable. The 'exists a total TM' phrasing in option B is the definition to lock in, because GATE options routinely swap the quantifiers."
        },
        {
          id: 'toc-turing-q3',
          q: 'A language is recursively enumerable if and only if',
          options: ['it is accepted by some TM that may fail to halt on strings outside the language', 'it is accepted by some TM that halts on all inputs', 'its complement is recursive', 'it is finite or countably infinite'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "RE (semi-decidable) is defined by one-sided guarantees: a TM exists that halts and accepts on every member, while on non-members it may reject or run forever. That is option A. Option B is the definition of recursive - the stronger class. Option C is wrong in both directions: if the complement were recursive then L itself would be recursive (complement again), which is more than RE demands; and RE languages like the halting set have non-RE complements. Option D is a property of every language over a finite alphabet, so it distinguishes nothing. Equivalent characterization worth remembering: L is RE iff some enumerator prints exactly the strings of L, in any order, possibly with repetitions."
        },
        {
          id: 'toc-turing-q4',
          q: 'Which of the following statements is TRUE?',
          options: ['Every recursively enumerable language is recursive', 'Every recursive language is recursively enumerable', 'Every language is recursively enumerable', 'No recursive language has a recursive complement'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "A decider is in particular a recognizer - a TM halting on all inputs certainly halts and accepts on members - so REC is a subset of RE: option B. The reverse (option A) fails: the halting set {(M, w) : M halts on w} is RE (simulate and accept if the simulation halts) but not recursive, by the classic diagonal argument. Option C fails by counting: TMs are countable, languages uncountable, so most languages have no recognizer at all. Option D is backwards: REC is closed under complement (swap the accept/reject answers of a total machine), so every recursive language has a recursive complement."
        },
        {
          id: 'toc-turing-q5',
          q: 'If a language L and its complement are both recursively enumerable, then',
          options: ['L must be regular', 'L must be recursive', 'L must be RE but possibly not recursive', 'no conclusion can be drawn'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Run the recognizer for L and the recognizer for its complement in parallel on input w (dovetail: alternate one step of each). Every string belongs to exactly one of the two sets, so exactly one recognizer eventually halts and accepts. When it does, answer accordingly. This combined procedure halts on every input and answers correctly, so it decides L: L is recursive - option B. This is a cornerstone theorem: it converts complementation facts into decidability facts. Its contrapositive is used constantly: since the halting set is RE but not recursive, its complement cannot be RE. Option A over-reaches (recursive languages are far beyond regular), and options C and D understate what the dovetailing construction proves."
        },
        {
          id: 'toc-turing-q6',
          q: 'Which of the following closure claims is FALSE?',
          options: ['Recursive languages are closed under complementation', 'Recursive languages are closed under intersection', 'RE languages are closed under union', 'RE languages are closed under complementation'],
          answer: 3,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "For recursive languages, a total TM's answer can simply be inverted (complement) or two total TMs run in sequence (intersection) - both stay total, so A and B are true. For RE union, dovetail the two recognizers and accept if either accepts - true. RE complementation fails, and the proof is the previous theorem in reverse: if RE were closed under complement, then for any RE language both it and its complement would be RE, forcing every RE language to be recursive - contradicting the existence of the halting set, which is RE but undecidable. So D is the false claim. The complement line is the sharpest dividing wall between REC and RE and the most frequently examined."
        },
        {
          id: 'toc-turing-q7',
          q: 'L1 and L2 are recursively enumerable. Which of the following is necessarily recursively enumerable?',
          options: ['L1 intersect L2', 'complement of L1', 'L1 minus L2', 'complement of (L1 union L2)'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Intersection: run both recognizers on the input (dovetailed) and accept only when both have accepted; members of the intersection make both halt-accept eventually, so this recognizes L1 intersect L2 - RE, option A. Complement of an RE language need not be RE (halting set). L1 minus L2 equals L1 intersect complement(L2), and since complement(L2) may fail to be RE, the difference may too - concretely, Sigma* minus HALT is the non-RE complement of the halting set. Option D is the complement of an RE language (union of RE sets is RE), so it fails the same way. Reduce every set expression to unions/intersections/complements and apply the two closure rows - that is the reliable method."
        },
        {
          id: 'toc-turing-q8',
          q: 'Regarding nondeterministic Turing machines (NTMs), which statement is TRUE?',
          options: ['NTMs accept some languages that no deterministic TM accepts', 'Every NTM can be simulated by a deterministic TM, so both accept exactly the RE languages', 'NTMs are equivalent to PDAs in power', 'An NTM can decide the halting problem'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "A deterministic TM simulates an NTM by exploring the tree of possible computations breadth-first (depth-first risks descending an infinite branch and missing an accepting one elsewhere). If any branch accepts, the simulation finds it at some finite depth. Hence NTMs accept exactly the RE languages - no new power, option B. Option A confuses TMs with weaker models: nondeterminism strictly helps PDAs (CFL versus DCFL) and helps NFA succinctness, but never TM expressiveness. Option C is far off - PDAs cannot even accept {a^n b^n c^n}. Option D is false because the halting problem is undecidable for every model equivalent to TMs; nondeterminism does not breach undecidability (that is a semantic barrier, not a resource barrier)."
        },
        {
          id: 'toc-turing-q9',
          q: 'L is recursively enumerable and its complement is NOT recursively enumerable. Then L is',
          options: ['recursive', 'RE but not recursive', 'not RE', 'regular'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "We are told L is RE, so options C is immediately out, and 'regular' would trivially make the complement regular hence RE - contradiction, killing D. Could L be recursive? If it were, its complement would also be recursive (REC closed under complement) and every recursive language is RE - but the complement is given as not RE. Contradiction. So L is RE but not recursive: option B. This is exactly the situation of the halting set. The reasoning template - push the assumption through closure properties until it collides with a given fact - solves most 'classify L given facts about its complement' questions, and it always pivots on the theorem that RE plus co-RE equals recursive."
        },
        {
          id: 'toc-turing-q10',
          q: 'Let HALT = { (M, w) : TM M halts on input w }. Which of the following is TRUE?',
          options: ['HALT is recursive', 'HALT is RE and its complement is also RE', 'HALT is RE but its complement is not RE', 'HALT is not RE'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "HALT is RE: a universal TM simulates M on w and accepts the moment the simulation halts; for pairs where M runs forever, the simulation runs forever too - acceptable for a recognizer. HALT is not recursive: assuming a decider H exists, build D that on input (M) runs H on (M, M) and does the opposite (loops if H says halts, halts if H says loops); feeding D its own description yields a contradiction. Finally, since HALT is RE but not recursive, its complement cannot be RE - otherwise the parallel-recognizers theorem would make HALT recursive. So option C captures all three facts. This triple (RE, undecidable, co-set not RE) is the archetype for classification questions."
        },
        {
          id: 'toc-turing-q11',
          q: 'The set of all Turing machines is countable, while the set of all languages over {0,1} is uncountable. The correct conclusion is',
          options: ['every language is accepted by some TM, possibly non-halting', 'there exist languages that are not recursively enumerable', 'every undecidable language is recursively enumerable', 'the set of RE languages is uncountable'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Each TM has a finite description, so TMs can be listed - countably many. Each TM accepts exactly one language, so there are at most countably many RE languages (making option D false). But languages over {0,1} form the power set of the countable set of all strings, which Cantor's diagonal argument shows is uncountable. A countable collection cannot cover an uncountable one, so some language - indeed, all but countably many - has no accepting TM at all: not RE. That is option B, and it directly refutes option A. Option C is separately false by example: the complement of the halting set is undecidable yet not RE. The elegance here is that pure counting proves existence without constructing any specific language."
        },
        {
          id: 'toc-turing-q12',
          q: 'L1 is recursive and L2 is recursively enumerable but not recursive. The strongest claim that must hold for L1 intersect L2 is that it is',
          options: ['recursive', 'recursively enumerable', 'context-sensitive', 'not recursively enumerable'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Since every recursive language is RE and RE is closed under intersection, L1 intersect L2 is RE - that much is guaranteed. Now test whether anything stronger survives all choices. Take L1 = Sigma*: the intersection is L2, which is not recursive, so 'recursive' fails as a guarantee (and 'context-sensitive' fails with it, since CSLs are all recursive). Take L1 = empty set: the intersection is empty, which IS recursive - so option D ('not RE') is also wrong; the intersection can even be trivial. The strongest always-true classification is therefore RE, option B. Method: prove the upper bound by closure, then attack every stronger claim with the extreme choices Sigma* and empty set."
        },
        {
          id: 'toc-turing-q13',
          q: 'Which of the following characterizations is CORRECT?',
          options: ['L is recursive iff some enumerator prints L in canonical (length-then-lexicographic) order', 'L is recursive iff some enumerator prints L in some arbitrary order', 'L is RE iff some enumerator prints L without ever repeating a string', 'L is RE iff L can be printed in canonical order'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Enumeration in arbitrary order (repetitions allowed) characterizes RE: dovetail the recognizer over all strings and print each accepted one - and conversely, to recognize w, watch the enumeration for w. So option B claims too much (that is RE, not recursive) and option D too little (canonical order is stronger than RE). Canonical order characterizes recursive: to decide w, run the ordered enumerator until either w appears (accept) or some string beyond w in the ordering appears (reject - w can no longer show up). One subtlety: for infinite L this is exact; the standard theorem statement is option A. Non-repetition (option C) is a red herring - repetitions can always be filtered out and change nothing."
        },
        {
          id: 'toc-turing-q14',
          q: 'Let NOTHALT = { (M, w) : TM M does not halt on input w }. This language is',
          options: ['recursive', 'RE but not recursive', 'not RE', 'RE and its complement is recursive'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "NOTHALT is the complement of HALT (over well-formed pairs). Suppose NOTHALT were RE. HALT is known to be RE. A language and its complement both RE forces the language to be recursive by parallel simulation - but HALT is provably undecidable. Contradiction. Therefore NOTHALT is not RE: option C. Intuition supports the algebra: to confirm non-halting you would need to observe infinitely many steps, and no finite computation certifies 'runs forever'; there is no finite witness, which is the hallmark of non-RE sets. Options A and B are eliminated because both imply RE. This makes NOTHALT the standard example of a language strictly outside RE, one level beyond mere undecidability."
        }
      ]
    },
    {
      id: 'toc-decidability',
      name: 'Decidability, Undecidability & Reductions',
      theory: {
        intro: "Decidability asks the sharpest question in computer science: which problems admit an algorithm that always halts with the correct answer? A problem (encoded as a language) is decidable if such a total algorithm exists, semi-decidable (RE) if a procedure can confirm yes-instances but may loop on no-instances, and undecidable otherwise. GATE tests three skills here: (1) recall of the standard catalogue - which questions about DFAs, CFGs, and TMs are decidable; (2) correct application of Rice's theorem, which wholesale condemns non-trivial semantic properties of TM languages; and (3) reduction logic - the direction of implication when problem A reduces to problem B. Most lost marks come from reversed reduction arrows and from applying Rice's theorem to syntactic properties where it does not apply. A small, precisely memorized catalogue plus two inference rules covers nearly every question this topic produces.",
        core: "The catalogue, by machine class. For DFAs/regular languages, essentially everything is decidable: membership, emptiness, finiteness, universality (L = Sigma*), equivalence of two DFAs, and inclusion - all via reachability and product constructions on finite state graphs. For CFGs: membership (CYK), emptiness (mark generating symbols), and finiteness are decidable; but universality (L(G) = Sigma*), equivalence of two CFGs, inclusion, ambiguity of a grammar, inherent ambiguity, and whether the intersection of two CFLs is empty are all undecidable. Whether a CFG generates a regular language is also undecidable. For TMs, nearly everything semantic is undecidable: membership (A_TM), halting, emptiness of L(M), finiteness, regularity of L(M), equivalence of two TMs, and L(M) = Sigma*.\n\n• Rice's theorem. Every non-trivial property of the RE languages is undecidable. Unpacking: a 'property' here is a set of RE languages; a TM M 'has the property' when L(M) belongs to that set; 'non-trivial' means at least one RE language has it and at least one does not. So 'L(M) is empty', 'L(M) is finite', 'L(M) is regular', 'M accepts the string 101', 'L(M) contains at most 10 strings' - all undecidable. Rice's theorem says NOTHING about syntactic or behavioral properties of the machine itself: 'M has 15 states', 'M ever writes symbol 1', 'M halts within 100 steps on input w' (simulate 100 steps), 'M ever moves left on w within n steps' - such questions must be analyzed directly and are often decidable. The two-step test: (a) is it a property of the language L(M) only, invariant across machines with equal languages? (b) is it non-trivial? Both yes: undecidable by Rice.\n\n• Reductions. A many-one reduction from A to B (written A <=m B) is a computable total function f with: w in A iff f(w) in B. It transfers hardness FORWARD and easiness BACKWARD: if A <=m B and B is decidable, then A is decidable; contrapositive - if A is undecidable, then B is undecidable. The reverse inferences are invalid: A <=m B with A decidable says nothing about B, and B undecidable says nothing about A. Also: A <=m B implies complement(A) <=m complement(B) (the same f works), and A <=m B with B in RE puts A in RE. To prove a new problem P undecidable, reduce a known-undecidable problem (A_TM or HALT) TO P - never the other direction; reducing P to HALT only shows P is no harder than HALT.\n\n• Semi-decidability placements. A_TM and HALT are RE (semi-decidable) but undecidable; their complements are not RE. Emptiness E_TM = {M : L(M) = empty} is not RE, but its complement (L(M) nonempty) is RE: dovetail M over all strings and accept upon any acceptance - a finite witness exists. Totality (M halts on all inputs) and equivalence of TMs are neither RE nor co-RE. The pattern: a problem is RE exactly when a yes-answer has a finite checkable witness.",
        strategy: "GATE patterns: (1) 'Which of the following is decidable?' with a CFG mix - the safe anchors are membership, emptiness, finiteness (decidable) versus universality, equivalence, ambiguity, intersection-emptiness (undecidable). (2) Rice-based options dressed in different words - rephrase each option as a statement about L(M); if it depends only on the language and is non-trivial, mark undecidable without further thought. If it mentions states, steps, tape symbols, or a bounded simulation window, Rice does not apply and it is usually decidable by direct simulation. (3) Reduction-direction MCQs - draw the arrow: hardness flows along A <=m B from A to B; decidability flows against it.\n\nWorked mini-example: is 'TM M halts on input w within 2^|w| steps' decidable? Yes: simulate exactly 2^|w| steps - a finite, computable bound - and report. The exponential cost is irrelevant; decidability ignores efficiency. Contrast 'M halts on w' with no bound: no simulation length suffices to conclude 'no', and it is undecidable.\n\nTraps: 'undecidable' does not mean 'not RE' - A_TM is undecidable yet RE; keep three levels (decidable / RE-but-undecidable / not-RE) distinct. 'Non-trivial' in Rice refers to the property having both an RE example and a non-example, not to the question feeling difficult. And a reduction FROM an undecidable problem proves undecidability; a reduction TO one proves nothing about hardness - the single most-tested logical trap in this topic."
      },
      questions: [
        {
          id: 'toc-decidability-q1',
          q: 'Given a DFA D and a string w, the problem of deciding whether D accepts w is',
          options: ['decidable', 'undecidable but semi-decidable', 'not even semi-decidable', 'decidable only when D has fewer than 100 states'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Membership for a DFA is the easiest question in the catalogue: simulate D on w, one transition per symbol; after exactly |w| steps the machine is in a definite state, and acceptance is read off from whether that state is final. The simulation always terminates in linear time, so the problem is decidable outright - no size restrictions needed (option D invents one). In fact all the standard questions about DFAs - membership, emptiness (is a final state reachable?), universality, finiteness, and equivalence of two DFAs - are decidable, because a DFA is a finite graph and every question reduces to graph reachability or product-machine reachability. Undecidability phenomena only begin with more powerful machine models."
        },
        {
          id: 'toc-decidability-q2',
          q: 'The halting problem - given a TM M and input w, does M halt on w? - is',
          options: ['decidable by a sufficiently powerful modern computer', 'undecidable, but semi-decidable', 'neither decidable nor semi-decidable', 'decidable for TMs with a single tape'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "The halting problem is the canonical undecidable problem: assuming a total decider H(M, w) exists, construct D that on input (M) asks H whether M halts on its own description and then does the opposite; running D on (D) contradicts either answer. No hardware power changes this - undecidability is a logical barrier, not a resource one (option A), and single-tape TMs are equivalent to all variants (option D). Yet the problem is semi-decidable: a universal TM simulates M on w and accepts if the simulation ever halts; yes-instances are confirmed in finite time, only no-instances loop. So it sits precisely at 'RE but not recursive': option B. Its complement, by contrast, is not even semi-decidable."
        },
        {
          id: 'toc-decidability-q3',
          q: 'Which of the following problems about two given DFAs D1 and D2 is decidable?',
          options: ['Only whether L(D1) is empty', 'Only whether L(D1) = L(D2)', 'Both emptiness and equivalence', 'Neither emptiness nor equivalence'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Emptiness of a DFA is graph reachability: L(D1) is nonempty iff some final state is reachable from the start state - checkable by BFS/DFS in finite time. Equivalence reduces to emptiness: build product automata for the symmetric difference (strings accepted by exactly one of D1, D2), which is again a DFA, and test it for emptiness; alternatively minimize both DFAs and compare, since the minimal DFA is unique up to isomorphism. Both procedures always terminate, so both problems are decidable - option C. This is worth contrasting with CFGs, where emptiness stays decidable but equivalence becomes undecidable, and with TMs, where even emptiness is undecidable. The dividing lines between the three levels form a standard GATE table."
        }
]},
    {
      id: 'toc-hierarchy',
      name: 'Chomsky Hierarchy & Language Classification',
      theory: {
        intro: "The Chomsky hierarchy arranges the four grammar-defined language families - regular, context-free, context-sensitive, and recursively enumerable - into a strict containment chain, and adds recursive languages as an important intermediate class between context-sensitive and RE. GATE questions in this topic rarely ask you to derive a grammar from scratch; instead they hand you a language description or a set-builder definition and ask you to place it as precisely as possible in the hierarchy, or they hand you a closure-property claim and ask whether it holds for a named class. The whole topic reduces to knowing the containment chain cold, knowing what distinguishes each grammar type structurally, and knowing which classes are closed under which operations. Because the classes nest, 'is L context-free' and 'is L NOT regular' are often two separate true facts about the same language, and exam options are built to test whether you confuse tightest classification with any true classification.",
        core: "Chomsky's four types are defined by restrictions on production rules alpha -> beta. Type 0 (unrestricted, recognized by Turing machines / RE languages): alpha can be any string containing at least one non-terminal, beta anything - no restriction at all. Type 1 (context-sensitive, recognized by linear-bounded automata): every production has |alpha| <= |beta| (non-contracting), with productions written as x A y -> x gamma y where gamma is nonempty (A is rewritten to something at least as long, only in the context x _ y); S -> epsilon is allowed if S never appears on a right-hand side. Type 2 (context-free, recognized by pushdown automata): every production has a single non-terminal on the left, A -> beta, with beta any string - the rewriting does not depend on surrounding context. Type 3 (regular, recognized by finite automata): every production is A -> aB, A -> a, or A -> epsilon (right-linear), or symmetrically all left-linear - each step consumes exactly one terminal and carries at most one non-terminal.\n\n• The containment chain. Regular is a strict subset of context-free (a^n b^n is CFL but not regular). Context-free is a strict subset of context-sensitive (a^n b^n c^n is CSL but not CFL - no PDA can check three counts with only one stack). Context-sensitive is a strict subset of recursive: every CSL is decided by an LBA which always halts (bounded tape forces termination), and there exist decidable languages that need unbounded working space and hence no LBA - so REC properly contains CSL. Recursive is a strict subset of recursively enumerable: the halting-adjacent languages (like A_TM) are RE but not recursive. Inside CFL there is also the strict chain deterministic CFL (DCFL, accepted by a deterministic PDA) is a strict subset of CFL, witnessed by languages like { a^n b^n } union { a^n b^2n } which is CFL but not deterministic (a DPDA cannot decide, without lookahead beyond the a-block, which count to match). So the full chain is: regular subset-of DCFL subset-of CFL subset-of CSL subset-of REC subset-of RE, each inclusion strict, and RE itself is a strict subset of all languages (which is uncountable while RE is only countable).\n\n• Classic classification anchors to memorize. { a^n b^n : n >= 0 } is CFL, not regular (one unbounded count, needs a stack). { a^n b^n c^n : n >= 0 } is CSL, not CFL (two independent unbounded counts). { a^n b^m c^n d^m : n,m >= 0 } is CFL (a stack can match a-d as outer nesting and hold b-c pairs is a common trap - actually this needs care: it IS context-free via a PDA that pushes a's, then on b's does nothing extra, matches d's against pushed a's - the b,c-matching separately needs its own bookkeeping; the safe GATE fact is that languages requiring exactly two independent unbounded equalities like a^n b^n c^n are CSL, while a single equality or two equalities in properly nested/separable positions are often still CFL - always test with a candidate PDA or the pumping lemma for CFLs rather than pattern-matching by symbol count). { ww : w in {a,b}* } is CSL, not CFL (matching two copies of an unbounded string defeats a single stack, provable by the CFL pumping lemma). { a^i b^j : i != j } is CFL (union/complement tricks on a^n b^n within a regular universe). { a^p : p prime } is neither regular nor context-free but is recursive (primality is decidable). L = { <M> : M is a TM that halts on empty input } is RE but not recursive. The complement of A_TM is not even RE.\n\n• Closure properties across classes (the standard comparison table). Union: closed for regular, CFL, CSL, REC, RE. Intersection: closed for regular, CSL, REC, RE, but CFL is NOT closed under intersection (two CFLs can intersect to a non-CFL, e.g. { a^n b^n c^m } intersect { a^m b^n c^n } = { a^n b^n c^n }). Complement: closed for regular, CSL, REC, but NOT for CFL, and NOT for RE (RE closed under complement would force RE = REC). Concatenation and Kleene star: closed for regular, CFL, CSL, REC, RE. Intersection with a regular language: CFL IS closed here (this is the one intersection closure CFLs keep - it powers many undecidability and non-regularity arguments). Since CFL is closed under union but not intersection or complement, by De Morgan's laws it cannot be closed under both intersection and complement simultaneously - a fact often tested as a single combined statement.",
        strategy: "GATE patterns: (1) 'Which grammar type generates L' or 'L is best classified as' - always find the TIGHTEST true class, since a CFL is technically also CSL, REC, and RE, but exam answers want the smallest class containing it unless the question explicitly asks 'which of the following is true' with multiple non-exclusive options. (2) Containment true/false batteries - memorize the six-link chain regular subset DCFL subset CFL subset CSL subset REC subset RE and answer each link independently; a common trap flips CSL and REC's relationship or claims DCFL = CFL. (3) Closure-property tables presented as four statements about CFL (or another class) with exactly one false - the CFL non-closure trio to remember instantly is intersection, complement, and difference (complement of a CFL need not be CFL; if a CFL were closed under both intersection and complement it would be closed under the other by De Morgan, contradicting known counterexamples). (4) Set-builder classification questions - test candidates against three tools in order: can a DFA/regular expression describe it (bounded memory)? If not, can a single stack (one unbounded counter or matched nesting) describe it - try building a PDA or apply the CFL pumping lemma to rule it out? If not, is it still decidable (a Turing machine that always halts) even though no PDA suffices - that lands it in CSL or REC depending on whether a bounded-tape LBA suffices; GATE rarely forces you to distinguish CSL from REC precisely, so 'not CFL but still decidable' is often an acceptable landing spot.\n\nWorked mini-example: classify L = { a^n b^n c^n : n >= 0 }. Is it regular? No - Myhill-Nerode distinguishes a^n for all n via matching b^n c^n. Is it context-free? Apply the CFL pumping lemma: for any p, take w = a^p b^p c^p; any split uvxyz with |vxy| <= p and vy nonempty has vxy confined to at most two of the three symbol blocks (since |vxy| <= p means it cannot span from the a-block into the c-block), so pumping up breaks the equal-count balance among a, b, c - contradiction, hence not CFL. Is it decidable? Yes: a TM can scan and cross off one a, one b, one c repeatedly, accepting when all are exhausted simultaneously - this uses only space proportional to the input (in fact it can be done within the input's own tape in a context-sensitive-style bounded manner), so it is CSL and hence also REC. Final classification: CSL (and everything the chain implies above it), not CFL, not regular.\n\nTraps: 'not regular' does not mean 'not CFL' - always check both boundaries. Never assume closure results transfer from CFL to CSL or REC without separate justification; REC and CSL are closed under complement precisely because they can decide membership and simply flip the accept/reject verdict, which RE cannot do since RE machines may only loop on rejection."
      },
      questions: [
        {
          id: 'toc-hierarchy-q1',
          q: 'Which of the following correctly orders the classes from smallest to largest, with every inclusion strict?',
          options: [
            'regular subset CFL subset CSL subset recursive subset RE',
            'regular subset CSL subset CFL subset recursive subset RE',
            'CFL subset regular subset recursive subset CSL subset RE',
            'regular subset CFL subset recursive subset CSL subset RE'
          ],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "The standard Chomsky containment chain, from most restrictive grammar to least, is regular (Type 3) inside context-free (Type 2) inside context-sensitive (Type 1) inside recursive (decidable) inside recursively enumerable (Type 0), with every inclusion known to be strict via a witness language at each step: a^n b^n separates regular from CFL, a^n b^n c^n separates CFL from CSL, a decidable-but-not-context-sensitive language (one needing more than linear space) separates CSL from recursive, and A_TM separates recursive from RE. Option A states exactly this chain. Option B swaps CFL and CSL, option C is scrambled and even places CFL below regular, and option D swaps recursive and CSL - CSL is properly inside recursive, not the reverse, since every CSL is decided by an always-halting LBA."
        },
        {
          id: 'toc-hierarchy-q2',
          q: 'A grammar in which every production has the form x A y -> x gamma y, with A a single non-terminal and gamma a nonempty string (so |left side| <= |right side|), generates languages of which type?',
          options: ['Type 3, regular', 'Type 2, context-free', 'Type 1, context-sensitive', 'Type 0, unrestricted'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "This is precisely the context-sensitive (Type 1) production format: a single non-terminal A is rewritten to a nonempty string gamma, but only in the context of x on the left and y on the right, and the rule is non-contracting since gamma is required to be nonempty, meaning the right-hand side is at least as long as the left. Context-free (Type 2) productions drop the surrounding context requirement (A -> beta unconditionally). Regular (Type 3) productions further restrict beta to a single terminal optionally followed by one non-terminal. Type 0 productions allow the left side itself to be an arbitrary string containing a non-terminal, with no length restriction at all. So the length-preserving, context-dependent rule described is the definition of Type 1: option C."
        },
        {
          id: 'toc-hierarchy-q3',
          q: 'L = { a^n b^n c^n : n >= 0 } is',
          options: ['regular', 'context-free but not regular', 'context-sensitive but not context-free', 'not recursively enumerable'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "L fails the CFL pumping lemma: for any pumping length p, the string a^p b^p c^p has every valid decomposition uvxyz confined (since |vxy| <= p) to span at most two of the three symbol blocks, so pumping v and y up or down unbalances the equal counts of a, b, and c - hence L is not context-free. It is also clearly not regular, since it is not even context-free and regular is a subset of context-free. However, L is decidable: a linear-bounded automaton (or an ordinary TM using only linearly bounded space) can repeatedly cross off one a, one b, and one c and accept exactly when all three run out together, using space proportional to input length - which places it in the context-sensitive class. So the tightest correct classification is context-sensitive but not context-free: option C."
        },
        {
          id: 'toc-hierarchy-q4',
          q: 'Which of the following is the standard example of a language that is context-free but NOT regular?',
          options: ['{ a^n : n is a perfect square }', '{ a^n b^n : n >= 0 }', '{ a^n b^n c^n : n >= 0 }', '{ ww : w in {a,b}* }'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "{ a^n b^n } is generated by the simple grammar S -> aSb | epsilon, so it is context-free, and it fails the regular pumping lemma (pumping the a-block in a string a^p b^p unbalances the counts), so it is not regular - the canonical CFL-not-regular witness, option B. Option A ({ a^n : n a perfect square }) is not even context-free - a unary language is regular if and only if it is eventually periodic, and perfect squares grow too irregularly, but proving it needs a unary pumping argument, and this is a distractor language many students misclassify as CFL when it is actually not CFL at all. Option C needs two independent counts and is CSL, not CFL, as shown above. Option D ({ ww }) requires matching two unbounded copies of an arbitrary string, which defeats a single stack and is also not context-free, only CSL."
        },
        {
          id: 'toc-hierarchy-q5',
          q: 'L = { ww : w in {a, b}* } is best classified as',
          options: ['regular', 'context-free but not regular', 'not context-free, but context-sensitive', 'not recursively enumerable'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "L is not regular (Myhill-Nerode: for a fixed length, distinct prefixes of length n are pairwise distinguishable using an appropriate matching suffix). It is also not context-free: a PDA's single stack can verify a palindrome-style relationship (compare from both ends) but cannot verify that a string is literally two adjacent identical halves, since by the time the second half begins, the stack has already been used to remember the first half in reverse and comparing in the same order needed for ww (not the reversed order needed for ww^R) is precisely what a single LIFO stack cannot do - a rigorous CFL pumping lemma argument on a^p b^p a^p b^p confirms this. Yet L is decidable: a TM (or LBA, since it needs only linear space to hold and compare the two halves of the input) can split the string in half and compare position by position. So L sits in CSL, not CFL - option C. This is the standard example distinguishing 'requires matching an unbounded string against a later unbounded copy' (needs more than a stack) from 'requires matching an unbounded string against its own reverse' (a stack suffices, e.g. ww^R is a well-known CFL)."
        },
        {
          id: 'toc-hierarchy-q6',
          q: 'Which class of languages is NOT closed under intersection?',
          options: ['Regular languages', 'Context-free languages', 'Recursive languages', 'Recursively enumerable languages'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Regular languages are closed under intersection (product automaton construction), recursive languages are closed under intersection (run both deciders, accept if both accept, this always halts), and RE languages are closed under intersection (dovetail both recognizers, accept if both eventually accept). Context-free languages, however, are famously NOT closed under intersection: L1 = { a^n b^n c^m : n, m >= 0 } and L2 = { a^m b^n c^n : n, m >= 0 } are each context-free (single stack suffices for each individually, since only one pair of blocks needs matching in each), but their intersection is { a^n b^n c^n : n >= 0 }, which was already shown to not even be context-free. This single counterexample is the standard proof and the standard exam fact: option B."
        },
        {
          id: 'toc-hierarchy-q7',
          q: 'Consider the following two statements about context-free languages. S1: CFLs are closed under intersection with a regular language. S2: CFLs are closed under complementation. Which is correct?',
          options: ['Both S1 and S2 are true', 'S1 is true, S2 is false', 'S1 is false, S2 is true', 'Both S1 and S2 are false'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "S1 is true: given a CFL L accepted by a PDA P and a regular language R accepted by a DFA D, build a product PDA that runs P and D in lockstep on the same input, using P's stack and accepting when both P and D would accept - this recognizes L intersect R, so CFLs ARE closed under intersection with a regular set (this is a genuinely useful closure, unlike general CFL-CFL intersection). S2 is false: if CFLs were closed under complement, then since they are already closed under union, De Morgan's law (L1 intersect L2 = complement(complement(L1) union complement(L2))) would make CFLs closed under general intersection too - but the previous question's counterexample shows they are not. So S1 true, S2 false: option B. This De Morgan argument - deriving non-closure under one operation from known non-closure under another plus known closure under a third - is a recurring proof pattern."
        },
        {
          id: 'toc-hierarchy-q8',
          q: 'Every context-sensitive language is accepted by some Turing machine that always halts (i.e., every CSL is recursive), but the converse fails. Which of the following best explains why some recursive languages are NOT context-sensitive?',
          options: [
            'Recursive languages allow productions that shrink the length of the derived string, which CSL grammars forbid',
            'Some decidable languages provably require more than linear working space on every deciding Turing machine, exceeding what a linear-bounded automaton can use',
            'Recursive languages are not required to be generated by any grammar at all',
            'Context-sensitive languages must be finite, while recursive languages can be infinite'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "A CSL is exactly a language accepted by some linear-bounded automaton (LBA), a TM restricted to the tape space occupied by the input (times a constant). By the space hierarchy theorem, there exist decidable languages whose deciders provably need more than linear space (for instance, some language requiring space n log n or n^2 to decide by any algorithm) - such a language is recursive (some TM, using that much space, always halts and decides it) but cannot be squeezed into any LBA's linear tape bound, so it is not context-sensitive. This is exactly why the inclusion CSL subset recursive is strict: option B captures the real reason, a genuine space-complexity separation. Option A is false (CSL productions are explicitly non-contracting, they never shrink); option C is false (every recursive language IS generated by some unrestricted Type-0 grammar, and generally not by any Type-1 grammar as just discussed, but grammars for it do exist at the RE level); option D is false, since both recursive and context-sensitive languages can certainly be infinite."
        },
        {
          id: 'toc-hierarchy-q9',
          q: 'L = { a^i b^j c^k : i = j or j = k, i,j,k >= 0 } is',
          options: ['regular', 'context-free but not regular', 'context-sensitive but not context-free', 'not decidable'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Write L as the union of L1 = { a^i b^j c^k : i = j } and L2 = { a^i b^j c^k : j = k }. Each is context-free individually: a PDA for L1 pushes a's, pops one per b (ignoring the b/c boundary the trailing c's freely), then reads any number of c's unconstrained; symmetrically a PDA for L2 reads any a's freely, then pushes b's and pops one per c. CFLs are closed under union, so L1 union L2 = L is context-free. L is not regular: fixing j = k and letting i vary independently shows unbounded counting is needed (Myhill-Nerode distinguishes a^i for all i via a fixed suffix b^n c^n). The trap this question sets is assuming any language that 'looks like' the a^n b^n c^n pattern with three blocks must be context-sensitive-but-not-CFL; but here the two equality constraints are alternatives (OR), not simultaneous (AND), and it is exactly this OR-versus-AND distinction that keeps it inside CFL via closure under union - option B."
        },
        {
          id: 'toc-hierarchy-q10',
          q: 'Which of the following statements about the language classes is FALSE?',
          options: [
            'Every deterministic context-free language is context-free',
            'Every regular language is a deterministic context-free language',
            'Every context-free language is deterministic context-free',
            'Every recursive language is recursively enumerable'
          ],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "DCFL (languages accepted by some deterministic PDA) is a strict subset of CFL - a standard witness is L = { a^n b^n } union { a^n b^2n : n >= 0 }, which is context-free (union of two simple CFLs, each with its own PDA, combined nondeterministically by guessing which disjunct applies) but not deterministic: a DPDA reading the a-block cannot commit, without unbounded lookahead, to whether it should later expect n or 2n b's, so no single deterministic machine handles both cases with one pass. This makes option C false, since not every CFL is DCFL. Option A is trivially true (DCFL is defined as a subset of CFL). Option B is true: every DFA is already a trivial DPDA that ignores its stack. Option D is the standard recursive-subset-of-RE fact and is true. The false statement is C."
        },
        {
          id: 'toc-hierarchy-q11',
          q: 'L = { a^p : p is a prime number } is',
          options: [
            'regular',
            'context-free but not regular',
            'not context-free, but recursive',
            'not recursively enumerable'
          ],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "L is unary, and a fundamental theorem states a unary language is regular if and only if it is eventually periodic (ultimately a finite union of arithmetic-progression-like residue classes). The primes have gaps that grow without any periodic bound (by the prime number theorem, gaps between consecutive primes are unbounded), so L is not regular; the same argument, refined, also rules out context-freeness for unary languages via the CFL pumping lemma applied to a sufficiently large prime exponent - pumping by a bounded amount from a prime length p (for p larger than the pumping length) always lands on a non-prime length for some choice of pump count, but a careful argument shows no valid split can keep every pumped length prime, so L is not context-free either. However, primality is decidable (trial division, or any of several polynomial-time primality tests) so a TM can decide membership in finite time for every input - L is recursive. Not RE is wrong since recursive implies RE. The tightest classification is 'not context-free, but recursive': option C."
        },
        {
          id: 'toc-hierarchy-q12',
          q: 'Which of the following is true about the relationship between recursive (REC) and recursively enumerable (RE) languages?',
          options: [
            'REC = RE for all languages',
            'A language L is recursive if and only if both L and its complement are recursively enumerable',
            'Every RE language has an RE complement',
            'A language whose complement is not RE must itself be recursive'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "This is the key theorem linking the two classes: if both L and complement(L) are RE, run their two recognizers in parallel on the same input - exactly one of them is guaranteed to eventually accept (since every string is in exactly one of L, complement(L)), giving a total decision procedure, so L is recursive; conversely if L is recursive, simply running the decider and flipping the answer decides complement(L), so complement(L) is RE too (and indeed recursive). This is option B, the standard 'RE and co-RE implies recursive' characterization. Option A is false - A_TM is RE but not recursive, a strict inclusion. Option C is false - A_TM's complement is provably not RE. Option D reverses the direction of the theorem: a complement failing to be RE tells you nothing extra beyond confirming L itself is not recursive (since recursive would force the complement to be RE too), it does not force L to BE recursive - if anything it is evidence against it."
        },
        {
          id: 'toc-hierarchy-q13',
          q: 'A language L over a single-letter alphabet {a} is regular if and only if',
          options: [
            'L is finite',
            'L is context-free',
            'the set of lengths of strings in L is eventually periodic',
            'L is decidable'
          ],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "For unary languages there is a clean characterization: L (viewed as a set of lengths, since the alphabet has only one letter) is regular if and only if that set of lengths is eventually periodic - meaning there exist thresholds N and a period k such that for all n >= N, n is in the length-set exactly when n + k is. This follows from the pumping lemma structure of a unary DFA, which after entering a cycle of length k repeats membership with period k forever. Option A is too strong - infinite unary languages like { a^2n : n >= 0 } (even lengths) are still regular, just not finite. Option B is unrelated context-freeness. Option D is far too weak: many decidable unary languages (like the primes example) are not eventually periodic and hence not regular, even though they are decidable. Option C, eventual periodicity, is the precise iff condition."
        },
        {
          id: 'toc-hierarchy-q14',
          q: 'Given that L1 is context-free and L2 is regular, which of the following is guaranteed to be context-free?',
          options: ['L1 intersect L2', 'complement of L1', 'L1 intersect complement(L1)', 'L2 minus L1'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "CFLs are closed under intersection with a regular language (build a product of L1's PDA and L2's DFA, running in lockstep and accepting on mutual acceptance) - this is one of the few intersection-type closures CFLs actually enjoy, so L1 intersect L2 is guaranteed context-free: option A. Complement of L1 (option B) is not guaranteed CFL, since CFLs are not closed under complement in general. L1 intersect complement(L1) (option C) is simply the empty set, which happens to be regular/CFL/everything trivially, but this is a degenerate coincidence, not a guarantee derivable from the stated closure properties, and the question intends the general, non-degenerate guarantee. L2 minus L1 equals L2 intersect complement(L1); since complement(L1) need not be CFL, this difference is not guaranteed to be CFL by any standard closure rule. The clean, always-applicable guarantee is option A."
        },
        {
          id: 'toc-hierarchy-q15',
          q: 'Which single fact correctly explains why the set of all languages over {0, 1} is NOT equal to the set of recursively enumerable languages?',
          options: [
            'Some RE languages are not recursive',
            'The set of all TMs is countably infinite, but the set of all languages over {0,1} is uncountable',
            'RE languages are not closed under complement',
            'Every RE language is generated by a Type-0 grammar'
          ],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Every RE language is the language of some Turing machine, and Turing machines have finite string descriptions, so they can be enumerated - there are only countably many TMs and hence only countably many RE languages. But the collection of all languages over {0,1} is the power set of the (countably infinite) set of all binary strings, which Cantor's diagonal argument proves is uncountable. A countable set cannot equal an uncountable one, so RE languages are a proper (indeed vanishingly small) subset of all possible languages - option B is the direct cardinality reason. Option A is true but explains a different fact (REC subset RE strictly), not why RE is not everything. Option C is true but is a closure-property fact, not a cardinality argument, and does not by itself imply RE is a proper subset of all languages. Option D is simply the definition of RE and explains nothing about the size comparison."
        }
      ]
    }
]};

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-regular';}).theory.deep = "FORMAL DEFINITIONS\n\n• DFA: M = (Q, Σ, δ, q0, F) where δ: Q × Σ → Q is a TOTAL function (exactly one transition per symbol per state). Language accepted L(M) = {w : δ*(q0, w) ∈ F}.\n• NFA: M = (Q, Σ, δ, q0, F) where δ: Q × Σ → 2^Q (may be empty, may have multiple targets). w accepted if SOME path ends in F.\n• ε-NFA: adds δ: Q × {ε} → 2^Q, transitions on empty string with no input consumed. ECLOSE(q) = set of states reachable from q via ε-moves only.\n• Equivalence: DFA = NFA = ε-NFA in expressive power (all define exactly the regular languages), proved by subset construction (NFA→DFA) and ε-elimination (ε-NFA→NFA).\n\nSUBSET CONSTRUCTION AND STATE-COUNT BOUNDS\n\n• Given NFA with n states, the equivalent DFA has states = subsets of Q, so at most 2^n states (power set), but only the REACHABLE subsets from {q0} (or ECLOSE(q0) for ε-NFA) need be built — often far fewer are reachable.\n• Tight bound: 2^n is achievable (not just an upper bound) — there exist n-state NFAs whose minimal equivalent DFA genuinely needs 2^n states. Classic witness: language of strings over {0,1} whose n-th symbol from the end is 1 needs an n-state NFA but 2^n states in any DFA.\n• Practical exam rule: DFA states ≤ 2^(NFA states); NFA states ≤ DFA states (trivially, DFA is already an NFA).\n\nREGEX IDENTITIES (memorize for simplification questions)\n\n• ∅* = ε ; ε* = ε ; (r*)* = r*\n• r + r = r ; r∅ = ∅r = ∅ ; rε = εr = r\n• (r + s)* = (r*s*)* = (r* + s*)*\n• r*r* = r* ; r(sr)* = (rs)*r\n• (r + s) t = rt + st (distributive over concatenation, right and left)\n• Empty language ∅ vs empty string ε are DIFFERENT: ∅ matches nothing, ε matches only the empty string.\n\nMINIMAL DFA STATE-COUNTING RECIPES (high-yield for GATE numericals)\n\n• MOD-k COUNTER (accept strings where, e.g., number of 1's ≡ 0 mod k): exactly k states, one per residue class 0..k-1, cycling on the counted symbol and looping on the other symbol.\n• \"CONTAINS SUBSTRING w\" (|w| = m): minimal DFA needs exactly m+1 states — one state per length of the longest prefix of w matched so far (0 through m), with the m-th (final) state a sink that also loops on itself once found. Built via KMP-style failure links for the fallback transitions.\n• \"ENDS WITH w\" (|w| = m): also needs exactly m+1 states by the same prefix-matching construction, EXCEPT the final state is not a sink — it must still track ongoing suffix matches (transition out of the accepting state based on overlap of w with itself), since a later mismatch could break a currently-accepted suffix.\n• \"k-TH SYMBOL FROM THE END IS 1\" (|w| ≥ k, check symbol at position n-k): trivial (k+1)-state NFA (nondeterministically guess \"this is the k-th-from-last symbol\", then count k-1 more symbols to confirm end-of-string) but the EQUIVALENT MINIMAL DFA needs 2^k states — the DFA must remember the last k symbols seen as a sliding window (2^k possible windows), giving the canonical exponential NFA-to-DFA blowup example.\n• \"FIRST SYMBOL IS 1\" needs only 2 states (trivial, no blowup) — the asymmetry between first-symbol and last-symbol conditions is a classic GATE trap.\n\nMYHILL-NERODE THEOREM AS A COUNTING TOOL\n\n• Statement: define x ≡_L y iff for all z, xz ∈ L ⟺ yz ∈ L (x and y are \"Myhill-Nerode equivalent\" w.r.t. L). L is regular iff ≡_L has FINITELY many equivalence classes, and the number of classes EQUALS the number of states in the minimal DFA for L.\n• Worked example: L = {0^n 1^n : n ≥ 0} over {0,1}. Take strings 0^i for i = 0,1,2,.... Claim 0^i and 0^j (i ≠ j) are inequivalent: pick z = 1^i; then 0^i 1^i ∈ L but 0^j 1^i ∉ L (since j ≠ i). So {0^i : i ≥ 0} gives infinitely many pairwise-inequivalent strings ⇒ infinitely many equivalence classes ⇒ L is NOT regular. This IS the standard alternative to the pumping lemma for proving non-regularity, and is often faster/cleaner for GATE.\n• Worked example 2 (counting states): L = strings over {0,1} with an even number of 1's. Equivalence classes: [ε] (even count so far) and [1] (odd count so far) — exactly 2 classes ⇒ minimal DFA has exactly 2 states. This matches the direct construction.\n\nPUMPING LEMMA FOR REGULAR LANGUAGES\n\n• Statement: If L is regular, there exists a constant p (pumping length, ≥ number of states in DFA) such that every string w ∈ L with |w| ≥ p can be split w = xyz where (1) |xy| ≤ p, (2) |y| ≥ 1, (3) for all i ≥ 0, xy^i z ∈ L.\n• CORRECT usage template to prove L is NOT regular (proof by contradiction): (a) Assume L is regular, let p be its pumping length. (b) CHOOSE a specific string w ∈ L with |w| ≥ p (choose it cleverly, often depending on p, e.g. w = 0^p 1^p). (c) The adversary (not you) chooses ANY split w = xyz satisfying |xy| ≤ p and |y| ≥ 1 — you must handle ALL such splits. (d) Show that for SOME i ≥ 0 (usually i = 0 or i = 2), xy^i z ∉ L, for every possible split. (e) Contradiction ⇒ L is not regular.\n• GATE TRAP: pumping lemma only gives a NECESSARY condition for regularity — satisfying the pumping property does NOT prove a language IS regular (some non-regular languages still satisfy it, e.g. {0^i 1^j 0^k : i+k ≥ j... } style crafted counterexamples). It can only be used to prove non-regularity, never regularity.\n\nFULL CLOSURE PROPERTIES OF REGULAR LANGUAGES\n\n• Regular languages ARE closed under: union, intersection, complement, difference (set minus), concatenation, Kleene star, Kleene plus, reversal, homomorphism, inverse homomorphism, and quotient with any language.\n• This is the richest closure list among the Chomsky classes — regular languages are closed under EVERY common operation, which is itself an exam fact (contrast with CFL, which fails intersection and complement).\n\nWORKED EXAMPLES\n\n1. Build minimal DFA for \"strings over {a,b} containing 'ab' as substring\": states q0 (start, no progress), q1 (last char seen was 'a'), q2 (found 'ab', accepting sink). δ(q0,a)=q1, δ(q0,b)=q0, δ(q1,a)=q1, δ(q1,b)=q2, δ(q2,a)=q2, δ(q2,b)=q2. Exactly |ab|+1 = 3 states, matching the recipe.\n2. Prove L = {ww : w ∈ {0,1}*} is not regular via pumping lemma: let p be the pumping length, choose w = 0^p 1 0^p 1 (length 2p+2, and w ∈ L since it's of form uu with u = 0^p1). Any split with |xy| ≤ p forces xy to lie entirely within the first 0^p block, so y = 0^k for some k ≥ 1. Pumping down (i=0) removes k zeros from the first block only, giving 0^(p-k) 1 0^p 1, which is no longer of the form uu (block lengths mismatch) — contradiction, so L is not regular.\n\nGATE TRAPS\n\n• Confusing \"contains substring w\" (m+1 states, sink accepting state) with \"ends with substring w\" (m+1 states, NON-sink, must keep checking overlaps) — a very common numerical trap.\n• Believing pumping lemma proves regularity when satisfied — it only proves non-regularity when violated; passing it proves nothing.\n• Forgetting DFA transition function must be TOTAL (every state needs a transition for every input symbol) — NFAs are allowed partial/multiple transitions, this difference is frequently tested directly.\n• Assuming subset construction always blows up to 2^n states — it is only an upper bound; many NFAs convert to far fewer DFA states (e.g., an NFA that's already deterministic converts 1:1).\n• Mixing up ∅* (= {ε}, one string) with ∅ (empty set, no strings) in regex simplification questions.\n• Thinking Myhill-Nerode classes count is an upper bound on DFA size — it is EXACT (equals minimal DFA states), which is often more useful than the pumping lemma for a fast informal regularity check.";

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-cfl';}).theory.deep = "FORMAL DEFINITIONS\n\n• Context-Free Grammar (CFG): G = (V, Σ, R, S) where V is nonterminals, Σ is terminals, R is a finite set of productions of the form A → α with A ∈ V (single nonterminal on left) and α ∈ (V ∪ Σ)*, S is the start symbol. L(G) = {w ∈ Σ* : S ⇒* w}.\n• Pushdown Automaton (PDA): M = (Q, Σ, Γ, δ, q0, Z0, F) where Γ is the stack alphabet, Z0 the initial stack symbol, δ: Q × (Σ ∪ {ε}) × Γ → finite subsets of Q × Γ*. Acceptance can be by FINAL STATE or by EMPTY STACK — these two acceptance modes are PROVABLY EQUIVALENT for PDAs (any PDA accepting by one mode can be converted to accept the same language by the other).\n• CFG ≡ PDA (nondeterministic): every CFL has an equivalent PDA and vice versa (via standard construction: each grammar derivation step simulated by stack replace). This equivalence is exactly analogous to CFG defining context-free languages the way regex/DFA/NFA define regular languages.\n\nAMBIGUITY AND INHERENT AMBIGUITY\n\n• A CFG is AMBIGUOUS if some string in L(G) has two or more distinct parse trees (equivalently, two distinct leftmost derivations).\n• A CFL is INHERENTLY AMBIGUOUS if EVERY grammar generating it is ambiguous — no unambiguous grammar exists for it at all. Classic example: L = {a^i b^j c^k : i=j or j=k} is inherently ambiguous (strings with i=j=k can be parsed via either the \"i=j\" rule-branch or the \"j=k\" rule-branch).\n• GATE TRAP: ambiguity is a property of a GRAMMAR, inherent ambiguity is a property of a LANGUAGE. \"This grammar is ambiguous\" does NOT mean the language is inherently ambiguous — an equivalent unambiguous grammar may still exist (e.g., the classic dangling-else / expression grammars can usually be rewritten unambiguously using precedence layers).\n\nCHOMSKY NORMAL FORM (CNF) AND GREIBACH NORMAL FORM (GNF) CONVERSION\n\n• CNF: every production is either A → BC (two nonterminals) or A → a (single terminal), plus possibly S → ε if ε ∈ L(G) (only the start symbol may derive ε, and only if S does not appear on any RHS).\n• CNF conversion steps (in strict order): (1) add new start symbol S0 → S to remove S from any RHS. (2) Eliminate ε-productions (compute nullable nonterminals, add all productions with nullable symbols removed in every combination). (3) Eliminate unit productions (A → B), by transitively copying B's productions to A. (4) Eliminate/replace terminals inside longer RHS with fresh nonterminals (X_a → a). (5) Break RHS with >2 symbols into a chain of binary productions using fresh nonterminals.\n• GNF: every production is A → aα where a is a single terminal and α ∈ V* (terminal first, followed by zero or more nonterminals). GNF conversion typically goes CFG → CNF → GNF, using the substitution technique to eliminate left recursion and reorder productions by nonterminal index so each production starts with a terminal (uses the standard \"left-recursion elimination + back-substitution\" algorithm, related to the matrix/Greibach lemma).\n• Every derivation in GNF form of a string of length n takes EXACTLY n derivation steps (one terminal produced per step) — this is a useful GATE numerical fact (a string of length n derived via a GNF grammar needs precisely n steps).\n\nCFL PUMPING LEMMA (WORKED NON-CFL PROOF)\n\n• Statement: If L is a CFL, there exists p such that every z ∈ L with |z| ≥ p can be written z = uvwxy where (1) |vwx| ≤ p, (2) |vx| ≥ 1 (v and x not both empty), (3) for all i ≥ 0, u v^i w x^i y ∈ L. (Note: v and x are pumped TOGETHER, in tandem, unlike the single y of the regular pumping lemma.)\n• Worked example proving L = {a^n b^n c^n : n ≥ 0} is NOT context-free: let p be the pumping length, choose z = a^p b^p c^p (length 3p, z ∈ L). Any decomposition uvwxy with |vwx| ≤ p means vwx cannot simultaneously touch all three of a, b, c blocks (since |vwx| ≤ p < block-spanning distance) — so vwx contains symbols from AT MOST TWO of the three types. Consider pumping up (i=2): u v^2 w x^2 y increases the count of at most two symbol types while leaving the third type's count unchanged, which breaks the required equal-count invariant a^n b^n c^n — the pumped string is no longer in L. Since this holds for EVERY valid decomposition, contradiction — L is not context-free.\n\nDCFL VS CFL DIFFERENCES\n\n• DCFL (Deterministic CFL) = languages accepted by a DETERMINISTIC PDA (DPDA): at most one applicable transition per configuration, and typically requires acceptance by final state (empty-stack acceptance and final-state acceptance are NOT equivalent for DPDAs, unlike for general PDAs).\n• DCFL ⊊ CFL strictly: every DCFL is a CFL, but not conversely. Classic witness: L = {ww^R : w ∈ {0,1}*} (even palindromes) is a CFL but NOT a DCFL, because a DPDA cannot deterministically guess the midpoint of the string without lookahead.\n• Every DCFL is unambiguous (has an unambiguous grammar) but not every unambiguous CFL is deterministic — being unambiguous is a WEAKER property than being deterministic.\n\nCLOSURE PROPERTY TABLE (memorize exactly — get every cell right)\n\n• CFL IS closed under: union, concatenation, Kleene star (and plus), reversal, homomorphism, and INTERSECTION WITH A REGULAR LANGUAGE (build product of the CFL's PDA with the regular language's DFA, running them in lockstep).\n• CFL is NOT closed under: intersection (of two general CFLs), complement, and (as a direct consequence, since if it were closed under complement and union it would be closed under intersection by De Morgan) set difference in general.\n• DCFL IS closed under: complement (flip accept/non-accept states of the DPDA — this works specifically because determinism guarantees a unique run per string).\n• DCFL is NOT closed under: union, intersection, concatenation, Kleene star, or reversal (in general) — this asymmetry (closed under complement but not union) is one of the most frequently tested GATE facts in this whole topic, precisely because it is counterintuitive (normally complement-closure plus union-closure would give intersection-closure, but DCFL is NOT closed under union, so no contradiction arises).\n\nWORKED EXAMPLES\n\n1. Convert G: S → AB, A → aA | ε, B → bB | ε to CNF. Step: eliminate ε-productions for A and B (nullable), producing S → AB | A | B | ε (if S nullable, add S0 → S | ε separately). Then eliminate remaining unit productions and replace terminals as needed, yielding a fully binary/terminal CNF grammar equivalent to {a^i b^j : i,j ≥ 0}.\n2. Show L1 ∩ L2 can fail to be a CFL: let L1 = {a^n b^n c^m : n,m ≥ 0} (CFL, via matching a's and b's, c's unconstrained) and L2 = {a^m b^n c^n : n,m ≥ 0} (CFL, via matching b's and c's). Then L1 ∩ L2 = {a^n b^n c^n : n ≥ 0}, which was proved above to be non-context-free — demonstrating CFL is not closed under intersection using two perfectly ordinary CFLs.\n\nGATE TRAPS\n\n• Assuming CFL is closed under intersection like regular languages are — it is NOT; only intersection WITH A REGULAR language is guaranteed to stay context-free.\n• Forgetting DCFL is closed under complement — a fact that feels backward since CFL itself is not closed under complement.\n• Confusing \"ambiguous grammar\" with \"inherently ambiguous language\" — a language having one ambiguous grammar does not make it inherently ambiguous.\n• Misapplying the CFL pumping lemma by pumping v and x independently — they MUST be pumped together (both raised to the same power i) in every iteration, unlike regular pumping lemma's single substring.\n• Believing final-state and empty-stack acceptance are equivalent for DETERMINISTIC PDAs — this equivalence holds for general (nondeterministic) PDAs but breaks for DPDAs, which is exactly why DCFL is defined using final-state acceptance by convention.\n• Thinking every unambiguous CFL is deterministic — unambiguous is strictly weaker than deterministic (DCFL ⊊ unambiguous CFL ⊊ CFL).\n• Miscounting GNF derivation steps — a string of length n from a GNF grammar takes exactly n steps, a fact often used to compute derivation-count numericals.\n</content>";

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-turing';}).theory.deep = "FORMAL DEFINITION OF A TURING MACHINE\n\n• TM: M = (Q, Σ, Γ, δ, q0, q_accept, q_reject) where Σ is the input alphabet, Γ ⊇ Σ ∪ {␣} is the tape alphabet (includes the blank symbol), and δ: Q × Γ → Q × Γ × {L, R} is the (partial, for deterministic TMs) transition function reading/writing a symbol and moving the head Left or Right on a single infinite tape.\n• A TM computation on input w either (a) HALTS AND ACCEPTS (reaches q_accept), (b) HALTS AND REJECTS (reaches q_reject or gets stuck with no valid move), or (c) LOOPS FOREVER (never halts) — this three-way outcome (as opposed to a DFA/PDA's guaranteed halting) is the entire source of undecidability in the theory.\n\nVARIANTS AND THEIR EQUIVALENCE\n\n• Multi-tape TM, nondeterministic TM (NTM), TM with a 2-way infinite tape, TM with a stay-put option, multi-track TM — ALL are equivalent in POWER to the standard single-tape deterministic TM (same class of languages, Turing-recognizable/decidable sets are identical). This is the Church-Turing \"robustness\" fact.\n• They are NOT equivalent in EFFICIENCY: a k-tape TM can be simulated by a 1-tape TM with at most QUADRATIC (O(t^2)) time slowdown; an NTM with running time t can be simulated by a deterministic TM in time 2^O(t) (exponential blowup, believed necessary — this is exactly the P vs NP question in disguise for TM time classes).\n• GATE TRAP: \"equivalent power\" (same languages decidable/recognizable) is a completely different claim from \"equivalent time complexity\" — do not conflate the two when a question asks about efficiency vs decidability.\n\nREC (DECIDABLE) VS RE (RECOGNIZABLE) — DEFINITIONS\n\n• A language L is RECURSIVELY ENUMERABLE (RE), a.k.a. Turing-recognizable, if there exists a TM M such that M accepts every w ∈ L (halts in q_accept) and for w ∉ L, M either rejects OR loops forever (no guarantee of halting on non-members).\n• A language L is RECURSIVE (REC), a.k.a. Turing-decidable, if there exists a TM M that HALTS ON EVERY INPUT, accepting w ∈ L and rejecting w ∉ L. Decidable is strictly stronger — it demands halting on ALL inputs, not just members.\n• REC ⊊ RE strictly: every decidable language is recognizable (trivially, use the same TM), but the Halting Problem is the classic witness of an RE language that is not REC.\n• co-RE = {L : complement(L) is RE}.\n\nCLOSURE PROPERTIES OF REC AND RE\n\n• REC is closed under: union, intersection, complement, concatenation, Kleene star, and (crucially) COMPLEMENT — since you can just swap accept/reject in the halting decider.\n• RE is closed under: union (run both TMs in parallel/dovetail, accept if either accepts), intersection (run both TMs in parallel, accept if both accept — both must halt-accept, which for the intersection case both eventually will if the string is in both), concatenation, Kleene star, homomorphism.\n• RE is NOT closed under complement in general (else Halting Problem's complement would also be RE, and RE ∩ co-RE would give REC for everything, collapsing the hierarchy — contradiction, since Halting Problem is not decidable).\n\nTHE CENTRAL THEOREM: L RE AND COMPLEMENT(L) RE ⟹ L IS REC\n\n• Statement: If a language L is RE and its complement is also RE, then L is RECURSIVE (decidable).\n• Proof idea: Let M1 recognize L (halts-accepts iff w ∈ L) and M2 recognize complement(L) (halts-accepts iff w ∉ L). Build M: on input w, run M1 and M2 in parallel (dovetailing steps of each). Since w is EITHER in L or in complement(L) (never neither, by definition of complement), exactly one of M1, M2 is guaranteed to eventually halt-accept. Whichever halts first tells you the answer (accept if M1 halts first, reject if M2 halts first) — M always halts on every input, so L is decidable.\n• Corollary (used constantly in decidability proofs): if L is RE but NOT REC, then complement(L) is guaranteed NOT RE (else the theorem would make L recursive, a contradiction). This is exactly how one shows, e.g., that the complement of the Halting Problem is not RE.\n\nWORKED EXAMPLES\n\n1. Prove the Halting Problem HALT_TM = {⟨M,w⟩ : M halts on w} is RE but not REC: RE because a universal TM U can simulate M on w and accept exactly when M halts (if M loops, U loops too — fine, RE only requires correct behavior on YES instances). Not REC by the classic diagonalization argument (assume a decider H exists for HALT_TM, construct D that runs H on ⟨D,D⟩ and does the opposite of what H predicts — contradiction either way). Since HALT_TM is RE but not REC, by the central theorem above, complement(HALT_TM) is NOT RE either — so HALT_TM sits properly inside RE, outside REC, with its complement outside RE too (this triple fact is a favorite GATE question).\n2. Show REC is closed under intersection: given deciders M1 for L1 and M2 for L2 (both always halt), construct M3 that on input w runs M1(w) then M2(w) sequentially (both terminate, since each is a decider) and accepts iff both accept. M3 always halts (finite sum of two halting computations) so L1 ∩ L2 is decidable — this simple \"run deciders in sequence\" trick is the standard closure proof template for REC (contrast with RE closure proofs, which require dovetailing/parallel simulation since RE machines might not halt on all inputs).\n\nGATE TRAPS\n\n• Confusing \"RE\" (recognizable, one-sided halting guarantee) with \"REC/decidable\" (halts on all inputs, two-sided guarantee) — nearly every decidability MCQ hinges on this distinction.\n• Believing RE is closed under complement — it is not, and this is precisely why the Halting Problem's complement is not RE, a fact tested constantly.\n• Applying the \"run in parallel/dovetail\" closure proof to REC problems where the simpler sequential-run proof suffices, or vice versa applying \"run sequentially\" where machines might not halt (only valid for REC, not for RE, since an RE machine may loop before ever reaching the second check).\n• Forgetting that equivalence of TM variants (multi-tape, nondeterministic, etc.) is about LANGUAGE CLASS only, not running time — nondeterministic TMs can decide the same languages as deterministic ones but potentially with exponential time overhead when simulated deterministically.\n• Misremembering the central RE+co-RE⟹REC theorem's direction — it does NOT say \"REC implies RE and co-RE are both nonempty-interesting\"; it specifically says having BOTH L and its complement RE is what forces decidability, and this is the single most reliable tool for classifying a language's exact position in the RE/REC/co-RE landscape.\n• Assuming an NTM's nondeterministic \"accept if some branch accepts\" rule changes the recognizable/decidable class — it does not; NTMs are equivalent in power (not efficiency) to DTMs for both RE and REC.\n</content>";

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-decidability';}).theory.deep = "FULL DECIDABILITY CATALOGUE (verify every cell carefully — this is the highest-stakes table in the whole subject)\n\nFOR DFA / REGULAR LANGUAGES (all DECIDABLE):\n• MEMBERSHIP (does DFA M accept w?): DECIDABLE — simulate M on w, DFA always halts after |w| steps.\n• EMPTINESS (is L(M) = ∅?): DECIDABLE — reachability check: is any accepting state reachable from q0 in the state graph?\n• FINITENESS (is L(M) finite?): DECIDABLE — check whether the reachable-and-co-reachable part of the state graph has a cycle; finite iff no such cycle exists.\n• EQUIVALENCE (do two DFAs accept the same language?): DECIDABLE — build the symmetric difference automaton (via product construction) and test its emptiness.\n• UNIVERSALITY (is L(M) = Σ*?): DECIDABLE — complement M (DFAs are closed under complement) and test emptiness of the complement.\n• ALL of these decidability results EXTEND to NFAs as well, since NFA→DFA conversion is always effective/computable (subset construction always terminates).\n\nFOR CFG / CONTEXT-FREE LANGUAGES (mixed — memorize which is which):\n• MEMBERSHIP (does CFG G generate w?): DECIDABLE — CYK algorithm (via CNF conversion) decides this in O(n^3) time.\n• EMPTINESS (is L(G) = ∅?): DECIDABLE — a simple \"generating nonterminal\" reachability/productivity check on the grammar.\n• FINITENESS (is L(G) finite?): DECIDABLE — check the grammar's dependency graph for a nonterminal that can derive itself via a nonempty terminal-containing path (a \"self-embedding\" cycle); finite iff no such cycle exists among useful/reachable nonterminals.\n• EQUIVALENCE (do two CFGs generate the same language?): UNDECIDABLE — this is a landmark undecidable problem, reduced from Post's Correspondence Problem (PCP).\n• UNIVERSALITY (is L(G) = Σ*?): UNDECIDABLE — reduces from PCP as well; note this immediately implies equivalence is undecidable too (universality is equivalence-to-Σ* as a special case), and this also implies CFG-COMPLEMENT and CFG-INTERSECTION-EMPTINESS type questions are frequently undecidable since CFLs are not closed under those operations.\n• AMBIGUITY (is a given CFG ambiguous?): UNDECIDABLE.\n• INHERENT AMBIGUITY (is L(G) inherently ambiguous?): UNDECIDABLE.\n• REGULARITY (is L(G) regular?): UNDECIDABLE.\n\nFOR TM (all UNDECIDABLE except membership-with-halting-guarantee is meaningless; be precise about wording):\n• MEMBERSHIP / ACCEPTANCE (does TM M accept w? — the \"Acceptance Problem\" A_TM): UNDECIDABLE (but RE — you can simulate M on w and accept if it halts-accepts; you just can't detect non-acceptance reliably).\n• EMPTINESS (is L(M) = ∅?): UNDECIDABLE — reduces from A_TM (E_TM).\n• FINITENESS (is L(M) finite?): UNDECIDABLE.\n• EQUIVALENCE (do two TMs accept the same language?): UNDECIDABLE (EQ_TM) — in fact EQ_TM is not even RE or co-RE in general (it sits outside both, one of the \"hardest\" classical undecidable problems, decidable by neither a \"yes\"-recognizer nor a \"no\"-recognizer).\n• UNIVERSALITY (is L(M) = Σ*?): UNDECIDABLE.\n• HALTING (does M halt on w?): UNDECIDABLE — the original Halting Problem, RE but not REC.\n• The ONLY \"decidable-flavored\" TM question that is actually decidable is a BOUNDED/RESOURCE-LIMITED version, e.g. \"does M halt on w within k steps?\" — DECIDABLE (just simulate k steps; this is a common trick option in MCQs to test whether students blindly mark \"undecidable\" for anything mentioning a TM).\n\nRICE'S THEOREM\n\n• Statement: Let P be any property of the LANGUAGE recognized by a TM (i.e., P is a property of RE languages, not of the machine's syntax/structure) that is NONTRIVIAL (some RE languages have property P, and some RE languages don't). Then the problem \"given a TM M, does L(M) have property P?\" is UNDECIDABLE.\n• Applicability test (3-step check before invoking Rice's): (1) Is the property about the LANGUAGE the machine recognizes (semantic), not about the machine's states/transitions/code (syntactic)? Must be semantic. (2) Is the property NONTRIVIAL — does at least one RE language have it and at least one RE language lack it? If either \"all languages have it\" or \"no language has it,\" Rice's does not apply (the problem is trivially decidable — just always answer yes or always answer no). (3) If both checks pass, the problem is undecidable, full stop — no further argument needed.\n• Examples where Rice's APPLIES (undecidable): \"is L(M) empty?\", \"is L(M) regular?\", \"is L(M) finite?\", \"does L(M) contain the string 'ab'?\", \"is L(M) = Σ*?\", \"is L(M) decidable/recursive?\" — all are nontrivial semantic properties.\n• NON-EXAMPLES where Rice's does NOT apply (these look similar but are NOT covered, and often ARE decidable): \"does M have exactly 5 states?\" (syntactic, about the machine's description, not its language — decidable, just count states). \"does M halt on a GIVEN input w within k steps?\" (a property of a specific computation, not of the language as a whole, and it's a bounded/simulatable check — decidable). \"is L(M) empty OR non-empty?\" (this is the trivial property — ALWAYS true — so it's decidable trivially, not covered by Rice's since it fails the nontriviality check). GATE loves to disguise a syntactic or trivial property to bait a false \"Rice's applies, so undecidable\" answer.\n\nREDUCTION DIRECTION LOGIC (the core technique, get the arrows right)\n\n• To prove a problem B is UNDECIDABLE, reduce a KNOWN undecidable problem A to B (write A ≤ B, \"A reduces to B\"), meaning: if you HAD a decider for B, you could BUILD a decider for A using it. Since A is known undecidable, B cannot be decidable either (else A would become decidable via the reduction — contradiction).\n• Template: \"Suppose (for contradiction) B is decidable via decider D_B. Construct decider D_A for A as follows: on input x for A, transform x into an appropriate instance f(x) of B (this transformation must be COMPUTABLE), run D_B on f(x), and return D_B's answer directly (or its negation, depending on direction) as the answer for x. Since A is undecidable, no such D_A can exist, so D_B cannot exist either — B is undecidable.\"\n• Direction discipline: you reduce FROM the already-known-undecidable problem TO the new problem you want to classify — never the reverse (reducing a decidable problem to an unknown one proves nothing about the unknown one).\n• To prove a problem is DECIDABLE, you do NOT reduce from an undecidable problem — instead you give a direct algorithm/decider, or reduce the new problem TO an already-known-decidable problem (in the opposite role: show the new problem can be SOLVED USING a decider for a known-decidable one).\n\nWORKED EXAMPLES\n\n1. Prove E_TM = {⟨M⟩ : L(M) = ∅} is undecidable via reduction from A_TM = {⟨M,w⟩ : M accepts w}. Assume decider D for E_TM exists. Build decider D' for A_TM: on input ⟨M,w⟩, construct a new machine M' that on any input x, first erases x, then simulates M on w (ignoring its own input), accepting iff M accepts w. Run D on ⟨M'⟩: if D says L(M') = ∅ then M does NOT accept w (reject); if D says L(M') ≠ ∅ then M does accept w (since M' would accept everything or nothing based purely on whether M accepts w) — accept. This computable transformation gives a decider for A_TM, contradicting A_TM's known undecidability, so E_TM is undecidable.\n2. Apply Rice's theorem test to \"is L(M) infinite?\": (1) semantic — yes, purely about the language, not the machine's code. (2) nontrivial — yes, some RE languages are infinite (e.g. Σ*) and some are finite (e.g. {a}). Both checks pass ⇒ undecidable, immediately, no need for a custom reduction.\n\nGATE TRAPS\n\n• Marking CFG-EQUIVALENCE or CFG-UNIVERSALITY as decidable by wrongly assuming CFL closure properties mirror regular languages' — they are UNDECIDABLE, unlike the DFA versions which ARE decidable.\n• Marking CFG-EMPTINESS or CFG-FINITENESS as undecidable — these ARE decidable (grammar reachability/productivity and self-embedding checks respectively); do not blanket-apply \"CFG problems are usually undecidable.\"\n• Applying Rice's theorem to a SYNTACTIC property (state count, number of transitions, specific machine structure) — Rice's theorem covers only semantic (language-based) properties.\n• Applying Rice's theorem to a TRIVIAL property (true for all RE languages or false for all) — must check nontriviality first.\n• Getting reduction direction backwards — reducing a decidable problem to an unclassified one proves nothing; you must reduce a KNOWN undecidable problem INTO the target to show the target is undecidable.\n• Forgetting that EQ_TM (TM equivalence) is not just undecidable but not even RE/co-RE — a step above problems like A_TM (which is at least RE).\n• Confusing \"undecidable\" with \"not RE\" — the Acceptance Problem A_TM is undecidable but IS RE; being undecidable does not mean a problem lacks any algorithmic handle at all (a semi-decider may still exist).\n</content>";

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-hierarchy';}).theory.deep = "FULL CHOMSKY HIERARCHY TABLE\n\n• TYPE 0 — Unrestricted / Recursively Enumerable grammars: production form α → β with α ∈ (V∪Σ)* V (V∪Σ)* (at least one nonterminal on the left, otherwise no restriction) and β ∈ (V∪Σ)* (any string). Machine: TURING MACHINE (full power, may loop forever). Languages: RECURSIVELY ENUMERABLE (RE) languages.\n• TYPE 1 — Context-Sensitive grammars: production form αAβ → αγβ where γ ≠ ε (length-non-decreasing overall: |LHS| ≤ |RHS| for every production, except S → ε is allowed if S never appears on any RHS). Machine: LINEAR BOUNDED AUTOMATON (LBA — a TM whose tape is restricted to exactly the length of the input, i.e., a TM with a finite, input-proportional amount of tape). Languages: CONTEXT-SENSITIVE LANGUAGES (CSL).\n• TYPE 2 — Context-Free grammars: production form A → α, single nonterminal on the left, α ∈ (V∪Σ)* unrestricted on the right. Machine: PUSHDOWN AUTOMATON (PDA, nondeterministic version — note NPDA is strictly more powerful than DPDA, unlike the regular/TM cases where determinism doesn't cost power). Languages: CONTEXT-FREE LANGUAGES (CFL).\n• TYPE 3 — Regular grammars: RIGHT-LINEAR form A → aB or A → a (or LEFT-LINEAR form A → Ba or A → a, but not mixed within one grammar) — at most one nonterminal, and it must be at the same end (right or left) throughout. Machine: FINITE AUTOMATON (DFA/NFA, equal power). Languages: REGULAR LANGUAGES.\n\nSTRICT CONTAINMENTS AND WITNESS LANGUAGES PER GAP\n\n• REGULAR ⊊ CFL (strict): witness L = {0^n 1^n : n ≥ 0} is context-free (S → 0S1 | ε) but not regular (proved via pumping lemma or Myhill-Nerode, infinitely many equivalence classes).\n• CFL ⊊ CSL (strict): witness L = {a^n b^n c^n : n ≥ 0} is context-sensitive (a context-sensitive grammar can enforce three-way equal counts using a linear-bounded \"marking and checking\" construction with productions like the classical CS grammar for a^nb^nc^n) but is NOT context-free (proved via the CFL pumping lemma, shown above cannot simultaneously balance three blocks).\n• CSL ⊊ RE (strict): witness is any UNDECIDABLE-but-RE language, e.g., the Acceptance Problem's encoded language A_TM = {⟨M,w⟩ : M accepts w}. Every CSL is DECIDABLE (an LBA has only finitely many distinct configurations — bounded by tape length × states × alphabet-size^tape-length — so a deciding LBA can detect non-halting via configuration-repetition and reject, meaning CSL ⊆ REC), but A_TM is RE and NOT decidable, so it cannot be context-sensitive — proving the containment strict.\n• REC (decidable languages) sits STRICTLY between CSL and RE: CSL ⊊ REC ⊊ RE. This extra \"REC\" layer is not one of the 4 classical Chomsky types but is essential to know: every CSL is decidable (LBA halting is guaranteed by the configuration-counting argument above), every decidable language is RE (trivial), and both containments are strict (CSL ⊊ REC witnessed by a decidable-but-not-context-sensitive-provable language such as certain languages requiring super-linear space; REC ⊊ RE witnessed by the Halting Problem).\n• Overall chain: REGULAR ⊊ CFL ⊊ CSL ⊊ REC ⊊ RE ⊊ (all languages over Σ*, uncountably many, by Cantor's diagonal argument since RE is only countable).\n\nADDITIONAL STRUCTURAL FACTS PER LEVEL\n\n• DCFL (deterministic CFL, machine = DPDA) sits strictly between Regular and CFL: REGULAR ⊊ DCFL ⊊ CFL, witnessed by {ww^R} (CFL, not DCFL, shown in the CFL topic) and {0^n1^n} (both DCFL and CFL, but not regular).\n• Every regular language is trivially context-free (right-linear grammars are already valid context-free grammars, since A → aB and A → a fit the \"single nonterminal on LHS\" restriction).\n• Every context-free language is trivially context-sensitive PROVIDED it doesn't require S → ε special handling issues — technically CFLs-with-ε need the same \"S never on RHS\" caveat as CSLs, but modulo that technicality, CFG productions A → α already satisfy the non-length-decreasing property whenever |α| ≥ 1 (if α = ε it needs the special S-only exception, matching CSL's own exception).\n• Every context-sensitive language is decidable specifically BECAUSE the LBA's tape is bounded by the input length — this gives a FINITE configuration space (bounded number of tape contents × head positions × states), so a simulating decider can track visited configurations and reject if any configuration repeats (guaranteeing termination, since an infinite computation on finite configurations must eventually repeat one).\n\nWORKED EXAMPLES\n\n1. Classify L = {a^n b^n : n ≥ 0} ∪ {a^n b^2n : n ≥ 0} at the tightest hierarchy level: this is context-free (CFL is closed under union, and each piece is individually a simple CFL via S1 → aS1b | ε and S2 → aS2bb | ε, so S → S1 | S2 generates the union) but it is NOT regular (apply pumping lemma or Myhill-Nerode on the first piece's structure, standard 0^n1^n-style argument extends). Tightest classification: CFL, strictly above regular.\n2. Show CSL ⊊ RE using the strictness argument concretely: A_TM is RE (a universal TM simulates M on w and accepts iff M halts-accepts — always representable by a Type-0 grammar since Type-0 = RE exactly). If A_TM were context-sensitive, it would be decidable by an LBA (since CSL ⊆ REC, via the configuration-bound argument above). But A_TM is a landmark UNDECIDABLE problem. Contradiction ⇒ A_TM is not context-sensitive, proving CSL is a proper (strict) subset of RE, with A_TM as the concrete separating witness.\n\nGATE TRAPS\n\n• Assuming NPDA and DPDA are equally powerful (as NFA/DFA are for regular languages) — they are NOT; NPDA (defining CFL) is strictly more powerful than DPDA (defining DCFL), a key asymmetry versus the regular-language case.\n• Forgetting the extra REC layer between CSL and RE — many students only recite \"Regular ⊊ CFL ⊊ CSL ⊊ RE\" and skip decidable languages, which is an important intermediate class frequently tested (e.g., \"is CSL decidable\" — yes; \"is CSL = REC\" — no, strict subset).\n• Believing every CFG production A → α with |α| ≥ 1 is automatically context-sensitive-compliant without checking the special ε-production exception rules that both CFG and CSL share.\n• Confusing LBA (bounded, input-length tape, decides CSL, always halts) with a full unrestricted TM (unbounded tape, decides/recognizes RE, may loop forever) — the tape-boundedness is exactly what forces CSL ⊆ decidable.\n• Mixing up right-linear and left-linear regular grammars WITHIN one grammar (e.g., some productions A → aB and others A → Ba in the same grammar) — a grammar mixing both forms may define a language OUTSIDE the regular class (loses the regularity guarantee); each individual production set must stick to one direction consistently.\n• Misclassifying an inherently ambiguous or intersection-derived language (like a^n b^n c^n) as \"still CFL because it looks like a small tweak on a CFL\" — always re-verify via the CFL pumping lemma; such languages are classic CSL-not-CFL witnesses.\n</content>";

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-regular';}).questions.push(
{
  id: 'toc-regular-x1',
  q: 'The minimum number of states in a DFA over {a,b} accepting all strings whose total length is congruent to 0 modulo 4 is',
  options: ['2', '3', '4', '5'],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "Length modulo 4 is a mod-k counter where every input symbol, regardless of whether it is a or b, advances the count by one. Build states q0, q1, q2, q3 for the four residues, with both a and b moving q_i to q_(i+1) mod 4, start and accept at q0. Each state is reachable (read that many symbols) and pairwise distinguishable, since the shortest accepting suffix from q_i has length (4-i) mod 4, which differs for each i. This is the same reasoning as a mod-k count of a single symbol; here the 'symbol being counted' is simply 'any symbol', so the answer is exactly k = 4 states, independent of the alphabet size."
},
{
  id: 'toc-regular-x2',
  q: 'For the language over {0,1} in which the 4th symbol from the right end is 1 (defined only for strings of length at least 4), an NFA can be built with 5 states by guessing the start of the last four symbols. How many states does the minimal DFA require?',
  options: ['5', '8', '16', '32'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: "A DFA reading left to right never knows how many symbols remain, so to decide the condition it must remember the last 4 symbols it has seen, since any of them could turn out to be the 4th-from-last once the string ends. There are 2^4 = 16 possible 4-symbol windows, and each is reachable. Two different windows are always distinguishable: they differ in some position, and padding with exactly enough symbols to push that differing bit into the 4th-from-end slot yields a suffix accepted from one window but not the other. So the minimal DFA needs exactly 16 states, while the NFA needs only 5 - the standard exponential blow-up witness for 'k-th symbol from the end' style languages, with 2^k always the tight DFA bound."
},
{
  id: 'toc-regular-x3',
  q: 'Which of the following regular expressions denotes the same language as (a* b*)* over {a,b}?',
  options: ['a*b*', '(a+b)*', 'a*+b*', '(ab)*'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "a*b* generates strings that are a block of a's followed by a block of b's, and it always contains the empty string. Starring a language that already contains epsilon and can be concatenated with itself lets you produce any interleaving: to get a string like 'aba', take the pieces 'a', 'b', 'a' - wait, each piece must itself match a*b*, and a single 'b' or single 'a' matches a*b* trivially, so concatenating one-symbol pieces reproduces any string over {a,b}. Hence (a*b*)* equals (a+b)*, all strings. This is a standard regex-identity trap: starring a 'restricted shape' language that contains epsilon and is closed under the alphabet symbols individually collapses it to the universal language."
},
{
  id: 'toc-regular-x4',
  q: 'Let L be a regular language over Sigma, and define L/a = { x in Sigma* : xa is in L } for a fixed symbol a in Sigma (the right quotient of L by the string "a"). Which statement is correct?',
  options: ['L/a is always regular', 'L/a is regular only if L is finite', 'L/a is context-free but generally not regular', 'L/a is regular only if a does not appear in L'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Given a DFA M = (Q, Sigma, delta, q0, F) for L, build a DFA for L/a with the same states and transitions but a new final-state set F' = { q in Q : delta(q, a) is in F }. Then M' accepts x exactly when delta(q0, x) is a state from which reading a lands in F, i.e. exactly when xa is in L. This construction works for every regular L and every fixed string (quotient by a longer fixed string just chains the same idea), so regular languages are closed under quotient by any fixed string, with no dependence on finiteness of L or on whether a occurs in strings of L. Hence option A."
},
{
  id: 'toc-regular-x5',
  q: 'Let L be regular with a minimal DFA of n states. What is the tightest general upper bound on the number of states in the minimal DFA for L^R (the reversal of L), and is this bound achievable?',
  options: ['n states, always achievable exactly', 'n+1 states, always achievable exactly', '2^n states, and this bound is achievable for some L', '2^n states, but no regular language ever needs this many'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "To build a machine for L^R, reverse every transition of the minimal DFA for L and swap the roles of the start state and the final states; this yields an NFA (not necessarily deterministic, since multiple states may now have edges into a common target reversed, and there may be multiple start states) with exactly n states. Determinizing this NFA via subset construction can cost up to 2^n states in the worst case, and there are known regular languages for which the minimal DFA of the reversal genuinely needs exponentially many states relative to n. So the correct bound is 2^n, and unlike the abstract subset-construction bound, this specific reversal blow-up is known to be tight for suitably constructed witness languages, ruling out option D."
},
{
  id: 'toc-regular-x6',
  q: 'Let h be a homomorphism from {a,b}* to {0,1}* with h(a) = 01 and h(b) = 1. If L over {a,b} is regular, which statement about h(L) = { h(w) : w in L } is TRUE?',
  options: ['h(L) is always regular', 'h(L) is regular only if h is length-preserving', 'h(L) may fail to be regular even though L is regular', 'h(L) is regular only if L is finite'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Regular languages are closed under homomorphism. Given an NFA for L, replace every transition labeled by a symbol x with a chain of transitions spelling out h(x) (introducing intermediate states for multi-symbol images such as h(a) = 01), keeping the same start and final states. The resulting NFA accepts exactly h(L). This works for any homomorphism, regardless of whether it is length-preserving or the source language is finite, so options B and D impose unnecessary conditions and option C contradicts the closure theorem. (Note the companion fact: regular languages are also closed under inverse homomorphism, via a different product-style construction on the DFA side.)"
},
{
  id: 'toc-regular-x7',
  q: 'The minimum number of states in a (complete) DFA over {a,b} accepting exactly the strings that begin with the prefix ab is',
  options: ['2', '3', '4', '5'],
  answer: 2,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Track progress against the fixed prefix 'ab': state q0 (start, nothing read), q1 (first symbol was a, prefix still possible), qAcc (prefix ab confirmed, accepting sink since nothing later can undo it), and qDead (prefix already violated, permanent reject sink). From q0, reading b goes straight to qDead since the first symbol must be a; from q1, reading a (instead of the required b) also goes to qDead. All four states are pairwise distinguishable: their shortest accepting suffixes are epsilon (qAcc), 'b' (q1), 'ab' (q0), and never (qDead). Unlike a 'contains' condition, a prefix condition never needs fallback transitions, since one mismatch kills the string forever - hence a clean |prefix|+1 = 4 states."
},
{
  id: 'toc-regular-x8',
  q: 'The minimum number of states in a DFA over {a,b} accepting all strings that contain "bab" as a substring is',
  options: ['3', '4', '5', '8'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Track the longest prefix of 'bab' that is a suffix of the input read so far: state 0 (none), 1 (matched 'b'), 2 (matched 'ba'), 3 (matched 'bab', accepting sink). The only subtlety is the fallback transitions: from state 1, reading another b keeps you at state 1 (the new b could still start a fresh match, since 'b' is both a prefix and this new b is itself a length-1 match); from state 2, reading a fails the pattern but the trailing 'a' matches nothing of 'bab' as a prefix, so it falls back to state 0. These fallback edges are exactly what the Knuth-Morris-Pratt failure function computes. All four states have distinct shortest accepting suffixes (bab, ab, b, epsilon), so 4 states is minimal, matching the general |pattern|+1 rule."
},
{
  id: 'toc-regular-x9',
  q: 'What is the minimum number of states in a DFA over {a,b} accepting the language { w : (number of a in w) - (number of b in w) is congruent to 0 modulo 3 }?',
  options: ['2', '3', '6', '9'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: "Only the value of (count of a - count of b) mod 3 matters, which lives in Z_3 = {0,1,2}. Reading an a adds 1 mod 3, reading a b subtracts 1 (i.e. adds 2 mod 3); this is a walk on a 3-cycle. Build states q0, q1, q2 for the three residues, start and accept at q0. All three are reachable (q0 by epsilon, q1 by 'a', q2 by 'aa' or 'b'), and pairwise distinguishable because the shortest suffix that returns residue i to 0 has different length for each i (0, 2, or 1 extra a's respectively, or symmetric b combinations) - concretely the suffix a^(3-i) mod 3 accepts from exactly one of the three. So exactly 3 states, illustrating that a difference-of-counts-mod-k condition needs only k states, same as a single-symbol mod-k counter, because the automaton only ever needs the running residue, never the actual counts."
},
{
  id: 'toc-regular-x10',
  q: 'What is the minimum number of states in a complete DFA over {0,1} for the language of strings of length at least 5 whose 5th symbol from the LEFT is 1?',
  options: ['5', '6', '7', '32'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Unlike conditions on the k-th symbol from the RIGHT end, a condition on a fixed position from the START never causes exponential blow-up, because the DFA can simply count symbols read so far up to the trigger position - it need not remember their values. Use counting states s0, s1, s2, s3, s4 for 'exactly 0, 1, 2, 3, 4 symbols read', none of which need branch on symbol value yet since positions 1 through 4 are irrelevant to the answer. From s4 (four symbols read, the 5th is about to arrive), reading 1 goes to an accepting sink A and reading 0 goes to a permanent reject sink R, since once the 5th symbol is fixed no later symbol can change the verdict; A and R self-loop afterward. That gives s0, s1, s2, s3, s4, A, R = 7 states, and all are pairwise distinguishable since their shortest accepting suffixes have strictly decreasing lengths 5, 4, 3, 2, 1, 0 for s0 through A, with R never accepting. Answer: 7, matching the general pattern of k counting states plus 2 sinks for a condition on the k-th symbol from the start."
},
{
  id: 'toc-regular-x11',
  q: 'Consider languages of the form { a^n b^m : n, m >= 0 and R(n, m) } for a relation R. Which choice of R makes the language regular?',
  options: ['R: n = m', 'R: n < m', 'R: n = 5 (m arbitrary)', 'R: n and m differ by exactly 1'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A relation that pins one of the two counts to a fixed constant removes the need to compare two unbounded quantities: 'n = 5' describes exactly the strings matching a^5 b*, a plain regular expression, so a DFA just counts up to 5 a's (rejecting if it sees a 6th) and then accepts freely on b's. The other three options all force an unbounded comparison between n and m: 'n = m' is the classical {a^n b^n}; 'n < m' and 'the counts differ by exactly 1' both require tracking an unbounded running difference to verify at the b*'s end, and in each case the strings a, aa, aaa, ... are pairwise distinguishable by an appropriate suffix of b's, giving infinitely many Myhill-Nerode classes. Only fixing one count to a constant (or to a bounded range) preserves regularity."
},
{
  id: 'toc-regular-x12',
  q: 'Is the language L = { a^n b^m : n >= 0, m >= 0, n is congruent to m modulo 2 } regular?',
  options: ['Yes, because parity of each count is trackable with finite memory', 'No, because it compares two unbounded counts', 'Yes, but only because the alphabet has just two symbols', 'No, because it fails the pumping lemma for every choice of pumping length'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "This is the key trap that separates 'comparing two unbounded counts' from 'comparing two unbounded counts modulo a fixed k'. The automaton does not need n and m themselves, only their parities, and each parity only ever takes two values regardless of how large n or m grows. Build a DFA with states tracking (parity of a's seen so far) while reading a's, then (parity of b's seen so far) while reading b's, accepting when the two parities match once the string ends; this needs only a handful of states (essentially 2 for tracking a-parity plus 2 for tracking b-parity, reachable and distinguishable by short suffixes). Since finite memory suffices, L is regular - contrast sharply with n = m exactly, which is not regular. The pumping lemma does not rule this out, since pumping any block only flips or preserves parity in a way the language tolerates."
},
{
  id: 'toc-regular-x13',
  q: 'Is the language L = { a^n b^m : n, m >= 0, n is not equal to m } regular?',
  options: ['Yes, since it is the complement within a*b* of a non-regular set', 'No, it is not regular', 'Yes, with a minimal DFA of 2 states', 'Cannot be determined without knowing the alphabet size'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Apply Myhill-Nerode directly. Take strings a^i for i = 0, 1, 2, .... For i not equal to j, the suffix z = b^i puts a^i z = a^i b^i outside L (since n = m there), while a^j z = a^j b^i lies inside L (since j is not equal to i). So every pair a^i, a^j is distinguished by some suffix, giving infinitely many equivalence classes, which forces non-regularity by Myhill-Nerode. Intuitively, deciding 'not equal' still requires knowing the exact counts well enough to detect equality, so it carries the same unbounded-memory burden as {a^n b^n} itself; complementing within a restricted universe does not rescue regularity, since a*b* minus a non-regular set is generally still non-regular (regularity is not closed under 'complement relative to a smaller universe' in this naive sense)."
},
{
  id: 'toc-regular-x14',
  q: 'Which statement about the subset construction (NFA to DFA conversion) is TRUE?',
  options: ['The resulting DFA always has exactly 2^n states for an n-state NFA', 'The resulting DFA has at most 2^n states, but only reachable subsets need be constructed, often giving far fewer states', 'The resulting DFA is nondeterministic unless the original NFA had no epsilon-transitions', 'The subset construction fails whenever the NFA has more than one accepting state'],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "The 2^n bound counts all possible subsets of the n NFA states, but a DFA state is only created for subsets actually reachable from the start subset (or its epsilon-closure) via some input string; many NFAs reach only a small fraction of the power set. For example, an NFA that already happens to be deterministic converts one-to-one, needing only n states, not 2^n. The bound 2^n is an upper bound, tight only for specially constructed languages such as the k-th-symbol-from-the-end family. The subset construction always produces a genuine DFA (deterministic by design, since each state is a fixed set and transitions are computed as unions), regardless of epsilon-transitions or the number of accepting states in the original NFA - both misconceptions in options C and D."
},
{
  id: 'toc-regular-x15',
  q: 'What is the minimum number of states in a DFA over {a,b} accepting strings that contain at least one a AND have even length?',
  options: ['2', '3', '4', '6'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "This is a product of two independent finite-memory conditions: 'has an a appeared yet' (2 states: not-yet, and yes-seen which becomes a sink for that component since seeing one a is permanent) and 'current length is even or odd' (2 states, toggling on every symbol regardless of its identity). The product has at most 2 x 2 = 4 states, and here all four survive: every combination (seen-a?, parity) is reachable (e.g. read a to get seen-a with odd parity, then b to fix parity to even), and each combination is distinguishable from the others because the two coordinates affect acceptance independently - a suffix can adjust parity without introducing an a, and a single a flips only the first coordinate. So the tight product bound of 4 states holds, exactly as with the earlier mod-2/mod-3 product example, since the two conditions here are also on independent aspects of the string."
}
);

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-cfl';}).questions.push(
{
  id: 'toc-cfl-x1',
  q: 'Consider the grammar S -> aSb | SS | epsilon. Which of the following is TRUE about the string "abab"?',
  options: ['It has a unique parse tree, so the grammar is unambiguous', 'It has at least two distinct leftmost derivations, showing the grammar is ambiguous', 'It cannot be derived by this grammar at all', 'It can only be derived using the production S -> aSb'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The string 'abab' equals 'ab' concatenated with 'ab', and each 'ab' comes from S -> aSb with the inner S -> epsilon. Using S -> SS, this concatenation can be built with two different parse-tree shapes. Flat split: S -> SS where the left S directly derives 'ab' and the right S directly derives 'ab' - two sibling leaves. Nested split: S -> SS where the left S derives epsilon (the empty string) and the right S itself expands via S -> SS into 'ab' followed by 'ab' - a deeper, right-leaning tree producing the same string 'abab'. These are genuinely different parse trees (different bracketing of the same concatenation), so 'abab' has at least two distinct leftmost derivations. This left/right-associativity ambiguity is exactly the same phenomenon as the classic minimal example S -> SS | a being ambiguous for strings like 'aaa'. Hence option B: the grammar is ambiguous."
},
{
  id: 'toc-cfl-x2',
  q: 'A grammar has productions S -> aS | aSbS | epsilon. The language it generates is best described as',
  options: ['{ a^n b^n : n >= 0 }', 'strings where every prefix has at least as many a as b, and total a-count exceeds total b-count except when both are zero', 'all strings over {a,b}', 'strings with equal numbers of a and b'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Read the productions as a recipe: S -> aS appends an 'a' with no matching 'b' yet required; S -> aSbS inserts one 'a', then some S-generated block, then a mandatory 'b', then another S-generated block - this is the classic template for strings where a's must stay ahead of b's when scanned left to right (like a run of unmatched open brackets counted as a, closed as b, requiring a surplus of opens). Every derivation starts by producing at least one more a than the b's it commits to at that level, so no prefix can ever have more b's than a's, and the string cannot be all b's or balanced overall from empty productions alone. This is a strictly larger language than {a^n b^n} (it also includes 'aab', 'aaabb', etc. with a-surplus) and is not simply 'equal counts' or 'everything'. Option B captures the surplus-of-a's-in-every-prefix structural invariant."
},
{
  id: 'toc-cfl-x3',
  q: 'Classify each language: L1 = { a^n b^n : n >= 0 }, L2 = { w w^R : w in {a,b}* }, L3 = { a^n b^n c^n : n >= 0 }, L4 = { a^i b^j c^k : i, j, k >= 0 }. Which classification is correct?',
  options: ['L1: DCFL, L2: CFL not DCFL, L3: not CFL, L4: regular', 'L1: regular, L2: DCFL, L3: CFL, L4: not CFL', 'L1: CFL not DCFL, L2: DCFL, L3: regular, L4: CFL', 'All four are DCFL'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "L1 is the anchor DCFL: push a's, pop deterministically on b's, no guessing needed. L2 is the anchor CFL-but-not-DCFL: matching a string against its own reverse needs a midpoint guess since there is no marker, so no DPDA suffices, though an NPDA works by nondeterministically choosing when to switch from pushing to popping. L3 needs two simultaneous matching relations (a-count to b-count and b-count to c-count) which a single stack cannot maintain, and the CFL pumping lemma confirms it is not context-free at all. L4 has no relation between the counts whatsoever - it is simply a*b*c*, describable by a straightforward regular expression, hence regular (and every regular language is trivially a DCFL too, but the option specifically separates it as regular). Only option A assigns all four correctly."
},
{
  id: 'toc-cfl-x4',
  q: 'Which of the following pairs of PDA acceptance modes are equivalent in the power of the languages they define?',
  options: ['Nondeterministic PDA by final state and nondeterministic PDA by empty stack accept exactly the same class of languages', 'Deterministic PDA by final state and deterministic PDA by empty stack accept exactly the same class of languages', 'Only deterministic PDAs can accept by empty stack', 'Empty-stack acceptance is strictly more powerful than final-state acceptance for any PDA'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "For general (nondeterministic) PDAs, final-state acceptance and empty-stack acceptance are interchangeable: given a PDA accepting by final state, add a new bottom-of-stack marker and epsilon-transitions from every final state that pop everything to achieve empty-stack acceptance without accidentally accepting other strings, and the converse conversion (empty-stack to final-state) similarly adds a marker and a new final state detecting when only the marker remains. This equivalence is exactly why 'PDA accepts exactly the CFLs' can be stated without specifying acceptance mode. The equivalence breaks specifically for DETERMINISTIC PDAs: empty-stack DPDAs can only accept prefix-free languages (since the machine must halt when the stack empties, a string cannot be a proper prefix of another accepted string), while final-state DPDAs define the full DCFL class, which includes non-prefix-free languages like a*. So option A is correct and option B is the classic false companion."
},
{
  id: 'toc-cfl-x5',
  q: 'Convert the grammar S -> AB, A -> aA | a, B -> bB | b to Chomsky Normal Form. How many terminal-producing productions (of the form X -> a single terminal) appear in a correct CNF version?',
  options: ['1', '2', '3', '4'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "In CNF, every terminal must be introduced by its own dedicated production of the form X -> a, and there are exactly two distinct terminals used in this grammar, a and b. Introduce Xa -> a and Xb -> b, then rewrite every production so terminals appear only via these single-symbol substitutions: A -> aA becomes A -> Xa A (using Xa in place of the raw terminal), A -> a becomes A -> Xa (already terminal-only, kept as is since a single terminal on the right is already legal CNF), similarly B -> bB becomes B -> Xb B and B -> b stays B -> Xb, and S -> AB is already binary. Counting the productions whose right-hand side is a single terminal: Xa -> a and Xb -> b - exactly 2, regardless of how many other productions reference Xa or Xb as a nonterminal on other right-hand sides. This illustrates that CNF conversion introduces exactly one terminal-production per distinct terminal symbol used in the original grammar."
},
{
  id: 'toc-cfl-x6',
  q: 'Which of the following is a correct example demonstrating that context-free languages are NOT closed under complementation?',
  options: ['{a^n b^n c^n} is not context-free, so its complement proves non-closure', 'There exist CFLs L1, L2 with L1 union L2 not context-free', 'If CFLs were closed under complement, then closure under union would give closure under intersection via De Morgan, contradicting the known counterexample for intersection', 'Every DCFL complement fails to be context-free'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The cleanest proof of non-closure under complement is indirect, via De Morgan's law: L1 intersect L2 = complement(complement(L1) union complement(L2)). CFLs are known to be closed under union. If CFLs were also closed under complement, the right-hand side would always be a CFL, forcing L1 intersect L2 to always be a CFL whenever L1, L2 are - but the standard witness {a^n b^n c^m} intersect {a^m b^n c^n} = {a^n b^n c^n} shows intersection can leave the class. This contradiction is exactly option C's reasoning. Option A is false framing (that specific language being non-CFL says nothing directly about complementation of CFLs). Option B is false as stated (union of CFLs is always context-free). Option D is false: DCFLs are actually closed under complement, and every DCFL is also a CFL, so complementing a DCFL yields another CFL, not a counterexample."
},
{
  id: 'toc-cfl-x7',
  q: 'A pushdown automaton P accepts by final state and never empties its stack to zero symbols except possibly at acceptance. Which class of languages can P define?',
  options: ['Only regular languages', 'Exactly the deterministic or nondeterministic context-free languages, matching whether P is deterministic', 'Only languages accepted by empty-stack PDAs', 'Only finite languages'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Final-state acceptance is one of the two standard PDA acceptance conventions, and it does not restrict expressive power: nondeterministic PDAs accepting by final state define exactly the context-free languages, the same class as empty-stack nondeterministic PDAs (the two conventions are interconvertible for nondeterministic machines). If P happens to be deterministic, final-state acceptance defines exactly the DCFL class, which is the standard and more expressive convention for determinism (recall empty-stack DPDAs are restricted to prefix-free languages, a strictly weaker guarantee). So the class P defines depends only on whether P is deterministic or nondeterministic, giving either DCFL or CFL respectively - option B. There is no forced restriction to regular or finite languages, and the empty-stack requirement in option C is not what final-state acceptance means."
},
{
  id: 'toc-cfl-x8',
  q: 'Which of the following languages is context-free?',
  options: ['{ a^n b^n c^n d^n : n >= 0 }', '{ a^i b^j c^k d^l : i = k and j = l }', '{ a^n b^n c^n : n >= 0 }', '{ w in {a,b,c}* : w has equal numbers of a, b, and c }'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A single stack can enforce one matching relation across a string as long as the two related blocks are not interleaved with an unrelated third comparison. Here i = k relates the a-block to the c-block, and j = l relates the b-block to the d-block, but these are two SEPARATE and non-interacting comparisons - a PDA can push a's, then on seeing b's switch to pushing those on a second conceptual track (simulated via combined stack symbols or two synchronized passes using the grammar S -> a S c | T, no - more directly, a grammar S -> A B with A -> aAc | epsilon enforcing i=k independently of B -> bBd | epsilon enforcing j=l) generates exactly this language, since the two equalities never need to be checked against each other. Options A, C, and D all require comparing three or more counts simultaneously (or, for D, effectively two independent equalities PLUS everything interleaved so no clean stack separation exists), and all three fail the CFL pumping lemma. Hence option B is the CFL."
},
{
  id: 'toc-cfl-x9',
  q: 'Which of the following statements about deciding properties of a given CFG G is TRUE?',
  options: ['Testing whether L(G) is empty is undecidable', 'Testing whether a specific string w is in L(G) is undecidable', 'Testing whether L(G) is finite is decidable', 'Testing whether G is ambiguous is decidable'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "CFG emptiness is decidable via a simple bottom-up productivity check: mark which nonterminals can derive at least one terminal string, and L(G) is empty exactly when the start symbol is never marked. Membership is decidable by the CYK algorithm (after converting to CNF) in time O(n^3), so it is very much a solvable, practical algorithm, not undecidable. Finiteness is decidable by checking the grammar's nonterminal dependency graph for a cycle that can produce a nonempty terminal string on a path from a nonterminal back to itself (self-embedding); no such cycle among useful nonterminals means only finitely many derivations, hence a finite language. Ambiguity, in contrast, is undecidable in general - there is no algorithm that takes an arbitrary CFG and correctly determines ambiguity for all cases. So the only true statement is option C."
},
{
  id: 'toc-cfl-x10',
  q: 'L1 = { a^i b^j : i = j } and L2 = { b^i c^j : i = j } are both DCFLs. What can be said about L1 . L2 (concatenation) and L1 union L2?',
  options: ['Both are guaranteed to be DCFL', 'The union is guaranteed CFL but not guaranteed DCFL; the concatenation is guaranteed CFL but not guaranteed DCFL', 'Both are guaranteed to be regular', 'Neither is even guaranteed to be context-free'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "DCFLs are always CFLs, and CFLs are closed under both concatenation and union, so L1 . L2 and L1 union L2 are certainly context-free. But DCFL itself is NOT closed under concatenation or union in general: to accept the union deterministically, a DPDA reading a string of a's would need to know in advance whether it is looking at an L1-style or L2-style string, which for a run of leading a's followed by b's is fine, but the combined recognition can require lookahead a DPDA cannot always get without knowing where the string ends; the standard counterexample pattern (like the earlier {i=j or j=k} case) shows a DPDA construction can fail even when each piece alone is deterministic. So the safe, provable statement is CFL-guaranteed but not DCFL-guaranteed for both operations, matching option B; options claiming regularity or non-context-freeness are simply wrong given each L1, L2 individually is already a CFL analog of a^n b^n."
},
{
  id: 'toc-cfl-x11',
  q: 'How many steps (production applications) does it take to derive a string of length 7 from a grammar in Chomsky Normal Form (with no epsilon productions)?',
  options: ['7', '13', '14', '15'],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "In CNF every internal parse-tree node is binary (from A -> BC rules) and every leaf comes from a unary terminal rule (A -> a). For a string of length n, the parse tree has exactly n leaves, and a binary tree with n leaves has exactly n - 1 internal (branching) nodes. Each internal node corresponds to one application of a binary rule, and each leaf corresponds to one application of a terminal rule, so the total number of production applications is (n - 1) + n = 2n - 1. For n = 7, this gives 2(7) - 1 = 13. This 2n - 1 count is a frequently tested CNF numerical fact, contrasting with Greibach Normal Form, where each derivation step produces exactly one terminal, so a length-n string needs exactly n steps there instead."
},
{
  id: 'toc-cfl-x12',
  q: 'Which of the following correctly completes the sentence: "A deterministic PDA that accepts by empty stack can only accept a language that is..."',
  options: ['finite', 'prefix-free (no accepted string is a proper prefix of another accepted string)', 'regular', 'closed under Kleene star'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Empty-stack acceptance forces the machine to halt exactly when its stack becomes empty - there is no way to continue reading input afterward, since the stack (together with the state) determines all future behavior and an empty stack signals termination of the run. If a string w is accepted (stack empties right after reading w) and w is a proper prefix of some longer string w', then the stack was already empty after w, so the deterministic machine cannot process the remaining suffix of w' at all - w' could never be accepted by continuing that same run. Hence every accepted string must be prefix-free with respect to every other accepted string. This is not a claim about finiteness or regularity (many infinite, non-regular languages like {a^n b^n} are still prefix-free and accepted by empty-stack DPDAs), and it says nothing about Kleene-star closure. It exactly explains why final-state acceptance is the standard, more general convention used to define DCFL."
},
{
  id: 'toc-cfl-x13',
  q: 'Consider the CFG S -> aSa | bSb | a | b | epsilon. The language generated is',
  options: ['{ a^n b^n : n >= 0 }', 'all palindromes over {a,b}', 'strings with equal numbers of a and b', '{ w w^R : w in {a,b}* }, the even-length palindromes only'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Each application of S -> aSa or S -> bSb wraps a matching symbol on both the left and right ends of whatever S eventually generates in the middle, building a palindrome outside-in. The base cases S -> a and S -> b supply the exact middle symbol needed for an ODD-length palindrome, while S -> epsilon supplies the middle for an EVEN-length palindrome. So this grammar generates every string that reads the same forwards and backwards over {a,b}, both even and odd length - the full palindrome language, not just the even-length subset (which would drop the S -> a | b base cases) and not the unrelated {a^n b^n} or equal-count languages, which have no palindromic symmetry requirement at all. Answer: option B, all palindromes."
},
{
  id: 'toc-cfl-x14',
  q: 'Which of the following statements correctly distinguishes CFL closure properties from DCFL closure properties?',
  options: ['CFL is closed under intersection but DCFL is not', 'CFL is closed under complement but DCFL is not', 'DCFL is closed under complement but CFL is not, while CFL is closed under union but DCFL is not (in general)', 'Both classes are closed under exactly the same set of operations'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: "The two classes have almost opposite closure signatures, which is precisely what makes this topic a favorite for GATE true/false batteries. General CFLs keep the 'grammar-friendly' operations - union (combine start symbols), concatenation, Kleene star, reversal, homomorphism - but lose the Boolean operations intersection and complement (witnessed by {a^n b^n c^m} intersect {a^m b^n c^n} = {a^n b^n c^n}, and complement failing by De Morgan from that). DCFLs behave oppositely: a DPDA's behavior on a string is a single deterministic run that can be complemented by careful accept/reject inversion, giving closure under complement, but DCFLs are NOT closed under union (or intersection, concatenation, Kleene star, reversal) since combining two deterministic recognitions can reintroduce the need to guess which sub-language a string belongs to. So the accurate pairing is option C; options claiming CFL keeps intersection or complement, or that the two classes match exactly, invert or erase this asymmetry."
},
{
  id: 'toc-cfl-x15',
  q: 'Let L be an inherently ambiguous context-free language. Which of the following must be TRUE?',
  options: ['Every CFG generating L is ambiguous', 'L is not context-free', 'L has no PDA accepting it', 'L must involve three or more symbols in its alphabet'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Inherent ambiguity is defined precisely as: L is a CFL (so it is context-free and some PDA does accept it - ruling out options B and C), but EVERY grammar that generates L, no matter how cleverly designed, has at least one string with two distinct parse trees. This is a strictly stronger and rarer condition than a single grammar happening to be ambiguous, since for most CFLs an equivalent unambiguous grammar can always be found even if some particular grammar for it is ambiguous. There is no requirement on alphabet size; the classic example { a^i b^j c^k : i = j or j = k } uses only three symbols but that is incidental to the definition, not a general requirement. So the only statement that must hold by definition is option A."
}
);

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-turing';}).questions.push(
{
  id: 'toc-turing-x1',
  q: 'If L is recursively enumerable (RE) but NOT recursive, which of the following statements about complement(L) must be TRUE?',
  options: ['complement(L) is RE', 'complement(L) is recursive', 'complement(L) is not RE', 'complement(L) is finite'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Use the central theorem: if L and complement(L) were both RE, then L would be recursive (run recognizers for both in parallel; exactly one halts, telling you the answer, and this always terminates). We are given L is RE but NOT recursive, so complement(L) cannot also be RE - if it were, the theorem would force L to be recursive, contradicting the hypothesis. So complement(L) is definitely not RE. It is also therefore not recursive (recursive implies RE), ruling out option B. Nothing about finiteness follows from this argument, ruling out option D. This is exactly the reasoning used to show complement(Halting Problem) is not RE, since the Halting Problem itself is the standard example of RE-but-not-recursive."
},
{
  id: 'toc-turing-x2',
  q: 'Which of the following statements about closure of the class RE (recursively enumerable languages) is FALSE?',
  options: ['RE is closed under union', 'RE is closed under intersection', 'RE is closed under complementation', 'RE is closed under concatenation'],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Union: run recognizers for L1 and L2 by dovetailing their steps; accept as soon as either halts and accepts, which happens whenever the input is in L1 union L2. Intersection: run both recognizers to completion (dovetailed), accept only once both have halted and accepted, which happens exactly for L1 intersect L2 (if the input is not in the intersection, at least one recognizer may never halt, but that only means the combined machine loops on non-members, which is exactly allowed for RE). Concatenation and Kleene star also have standard RE-preserving constructions. Complementation fails: if RE were closed under complement, then together with closure under intersection it would give closure under complement of intersection etc., eventually forcing every RE language's complement to be RE too, making every RE-but-not-recursive language impossible by the central RE+co-RE=REC theorem - contradicting the Halting Problem's known status. So complementation, option C, is the false closure claim."
},
{
  id: 'toc-turing-x3',
  q: 'Which of the following is a correct characterization of a "Turing enumerator" (an enumeration machine that prints out members of a language one by one, possibly with repeats, on a separate output tape)?',
  options: ['A language has an enumerator if and only if it is recursive', 'A language has an enumerator if and only if it is recursively enumerable', 'Every language, decidable or not, has an enumerator', 'An enumerator can only print finite languages'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The standard theorem states: a language L is recursively enumerable exactly when some enumerator machine prints exactly the strings of L (in some order, possibly with repetition, running forever if L is infinite). Direction one: given an enumerator E, build a recognizer for L that on input w runs E and accepts if w ever gets printed - this halts and accepts precisely on members of L (and may loop forever on non-members, which is the RE contract). Direction two: given a recognizer M for L, build an enumerator that dovetails M's execution on all strings in some systematic order (e.g. by length then lexicographic), printing w whenever the simulated run of M on w halts and accepts. This equivalence is with RE, not specifically with the strictly smaller recursive class (a recursive language trivially has an enumerator too, since recursive implies RE, but the equivalence names the larger class exactly). Options C and D misstate the scope and behavior of enumerators."
},
{
  id: 'toc-turing-x4',
  q: 'Which of the following sets is countably infinite?',
  options: ['The set of all languages over {0,1}', 'The set of all Turing machines (over a fixed finite description alphabet)', 'The power set of the set of all binary strings', 'The set of all functions from binary strings to {0,1}'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Every Turing machine has a finite string description (its states, transition table, and so on encoded over a fixed finite alphabet), so the set of all such descriptions can be listed in order of increasing length (and lexicographically within each length), giving a bijection with the natural numbers - the set of TMs is countably infinite. In contrast, the set of all languages over {0,1} is the power set of the countably infinite set of all binary strings, and Cantor's diagonal argument proves any power set of an infinite set is strictly larger (uncountable) than the original set. The set of all functions from binary strings to {0,1} is exactly the same size as this power set (each function corresponds to its characteristic set), so it too is uncountable. This size mismatch - countably many machines versus uncountably many languages - is precisely why most languages have no Turing machine at all, let alone a decider."
},
{
  id: 'toc-turing-x5',
  q: 'Given that the set of Turing machines is countable and the set of languages over {0,1} is uncountable, which conclusion correctly follows?',
  options: ['Every recursively enumerable language has infinitely many equivalent Turing machines', 'There exist languages over {0,1} that are not recursively enumerable, in fact "almost all" languages are not RE', 'Every Turing machine recognizes a unique language not recognized by any other machine', 'The Halting Problem is the only non-recursive language'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "Since RE languages are exactly the languages of some Turing machine, and there are only countably many machines, there are at most countably many RE languages. But the collection of ALL languages over {0,1} is uncountable (the power set of a countably infinite set of strings). A countable set can never exhaust an uncountable one, so there must exist languages with no recognizing Turing machine at all - they are not RE, let alone recursive. In fact, in the precise cardinality sense, the RE languages form a 'measure zero' sliver: countably many RE languages versus uncountably many possible languages overall. Option A is true incidentally (infinitely many machines can recognize the same language, e.g. by adding useless states) but is not the conclusion that follows from the cardinality mismatch. Option D is false - there are uncountably many non-recursive languages, the Halting Problem is just one famous example."
},
{
  id: 'toc-turing-x6',
  q: 'Suppose A ≤ B (A reduces to B) using a computable, always-terminating reduction function, and A is known to be RE but not recursive. Which conclusion about B is correct?',
  options: ['B must also be RE but not recursive', 'B cannot be recursive, but B might or might not be RE', 'B must be recursive', 'No conclusion about B follows from this information'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A reduction A <= B where a decider for B would yield a decider for A (the standard mapping/many-one reduction used in undecidability proofs) means: if B were recursive, then A would be recursive too (compose the reduction with B's decider). Since A is NOT recursive, B cannot be recursive either - that direction is solid. However, the reduction does not by itself guarantee B is RE: reductions used to prove undecidability only transfer the 'not decidable' property, not full RE-ness, unless the reduction is specifically constructed to also preserve RE membership (which many standard reductions do, but not automatically merely from 'A reduces to B' in the abstract). So the safe, always-correct conclusion is that B is not recursive, while B's own RE status needs separate verification - option B. Claiming B must be RE (option A) overreaches beyond what a generic reduction guarantees."
},
{
  id: 'toc-turing-x7',
  q: 'Which of the following is TRUE about REC (the class of recursive/decidable languages) in relation to RE?',
  options: ['REC = RE', 'REC is a strict subset of RE, and RE minus REC is nonempty', 'RE is a strict subset of REC', 'REC and RE are incomparable classes, neither contains the other'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Every recursive language trivially has a recognizer (the same decider, since halting on every input certainly halts and accepts on members), so REC is a subset of RE. The containment is strict: the Halting Problem is a well-known language that is RE (a universal machine can simulate and accept whenever the simulated machine halts and accepts) but not recursive (no machine can decide it for all inputs, by the standard diagonalization argument). So RE minus REC is nonempty, witnessed at least by the Halting Problem, confirming option B and ruling out the other three options, which either equate the classes or reverse/scramble the containment direction."
},
{
  id: 'toc-turing-x8',
  q: 'Let L1 and L2 both be recursive (decidable) languages over the same alphabet. Which of the following is guaranteed to be recursive?',
  options: ['L1 intersect L2 only', 'L1 union L2 only', 'complement(L1) only', 'L1 intersect L2, L1 union L2, and complement(L1), all three'],
  answer: 3,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "REC is closed under all the standard Boolean operations, unlike RE which loses complementation. Given deciders M1 for L1 and M2 for L2 (both guaranteed to halt on every input), build a decider for the intersection by running M1 then M2 in sequence and accepting only if both accept - this always halts since each component always halts. The union is similar, accepting if either accepts. The complement of L1 is decided by simply running M1 and flipping its accept/reject verdict, since M1 already halts on everything. All three constructions rely critically on the fact that recursive machines are guaranteed to halt, which is exactly why REC (unlike RE) is closed under complement - the sequential 'run to completion, then decide' technique works cleanly. So all three listed operations stay recursive: option D."
},
{
  id: 'toc-turing-x9',
  q: 'A "linear bounded automaton" (LBA) is a Turing machine whose tape usage is restricted to the length of the input (plus perhaps a small constant). Which statement about LBAs and decidability is TRUE?',
  options: ['Every language accepted by an LBA is undecidable', 'The halting problem for LBAs (does an LBA halt on a given input) is decidable, because the LBA has only finitely many distinct configurations', 'LBAs can simulate any Turing machine without restriction', 'LBA emptiness is undecidable, just like general TM emptiness'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Because an LBA's tape is bounded by the input length, the total number of distinct configurations (combination of state, head position, and tape contents) is finite - bounded by (number of states) x (input length) x (alphabet size ^ input length). If the LBA runs longer than this finite bound without halting, it must have repeated a configuration, and from that point on it would loop forever, so a decider can simulate the LBA up to that bound and safely declare non-halting (equivalently reject) if the bound is exceeded without halting. This makes the LBA halting problem decidable, in sharp contrast to the undecidable general Turing machine halting problem where the tape is unbounded and configurations are infinite in number. This configuration-counting argument is also exactly why every context-sensitive language (accepted by an LBA) is decidable. Options A, C, and D all contradict this: LBAs accept plenty of decidable languages, cannot simulate unbounded-tape TMs in general, and LBA emptiness is in fact decidable by exhaustive bounded search."
},
{
  id: 'toc-turing-x10',
  q: 'Which statement correctly relates nondeterministic Turing machines (NTMs) to deterministic Turing machines (DTMs) regarding decidability and recognizability?',
  options: ['NTMs can decide/recognize strictly more languages than DTMs', 'NTMs and DTMs decide and recognize exactly the same classes of languages, but NTMs may run exponentially faster in the worst case', 'NTMs cannot be simulated by any DTM', 'NTMs are equivalent to DTMs in running time but not in language class'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Any NTM can be simulated by a DTM that performs a breadth-first (dovetailed) exploration of all of the NTM's nondeterministic branches; the simulating DTM accepts if it ever finds an accepting branch, and this simulation preserves both the recursive and the recursively enumerable status of the language exactly. So NTMs add no language-class power over DTMs - the equivalence is exact for both RE and REC. What NTMs can do is solve problems asymptotically faster: a nondeterministic computation running in time t can require up to time 2^O(t) for the deterministic simulation to explore all branches (this exponential gap is the heart of the P versus NP question, phrased in complexity-class rather than decidability terms). So option B correctly separates the 'same power, different possible speed' relationship, while the other options incorrectly claim a difference in what is computable at all."
},
{
  id: 'toc-turing-x11',
  q: 'Which of the following is an example of a set that is RE but for which no algorithm is known (or provably possible) to also recognize its complement?',
  options: ['The set of syntactically valid C programs', 'The Halting Problem HALT_TM = { <M, w> : M halts on w }', 'The set of even-length binary strings', 'The set of binary strings representing prime numbers'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "HALT_TM is RE: a universal machine can simulate M on w and accept the moment M halts (looping forever if M never halts is acceptable behavior for an RE recognizer). Its complement, 'M does not halt on w', is provably NOT RE: if it were, then together with HALT_TM's own RE recognizer, the central theorem would make HALT_TM recursive, contradicting the classical diagonalization proof that no algorithm decides halting for all machine-input pairs. So this is not merely 'no known algorithm' but a proven impossibility - a genuine example where complement-RE fails. The other three options are all straightforwardly decidable (checking C syntax, string length parity, and primality of a given binary number can all be done by ordinary terminating algorithms), so their complements are recursive too, making them poor examples of this asymmetry."
},
{
  id: 'toc-turing-x12',
  q: 'True or False batch: (i) If L is recursive, then L is also RE. (ii) If L is RE, then L is also recursive. (iii) If both L and complement(L) are RE, then L is recursive. (iv) If L is not RE, then complement(L) must be RE. Which combination is correct?',
  options: ['(i) True, (ii) False, (iii) True, (iv) False', '(i) True, (ii) True, (iii) True, (iv) True', '(i) False, (ii) True, (iii) False, (iv) True', '(i) True, (ii) False, (iii) False, (iv) True'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: "(i) is true by definition: a decider is in particular a recognizer, since halting-and-accepting on members is all RE requires, and deciders also halt on non-members which is extra, not a violation. (ii) is false: the Halting Problem is the standard counterexample, RE but not recursive. (iii) is the central theorem of this topic and is true: dovetail recognizers for L and its complement, exactly one is guaranteed to halt first since every string is in exactly one of the two sets, giving a decider. (iv) is false: 'not RE' says nothing that forces the complement to be RE - in fact, EQ_TM (Turing machine equivalence) is a well-known language that is neither RE nor co-RE, so both it and its complement fail to be RE simultaneously, directly refuting (iv). So the correct combination is option A."
},
{
  id: 'toc-turing-x13',
  q: 'Which of the following correctly describes the relationship between "L is recognized by some Turing machine" and "L is generated by some Type-0 (unrestricted) grammar"?',
  options: ['These are two independent, unrelated notions', 'They characterize exactly the same class of languages: the recursively enumerable languages', 'Type-0 grammars generate a strictly larger class than Turing machines can recognize', 'Turing machines recognize a strictly larger class than Type-0 grammars can generate'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "This is one of the foundational equivalence theorems bridging grammars and machines: given any Type-0 grammar, a Turing machine can be built that nondeterministically guesses a derivation sequence and checks whether it produces the input string, accepting exactly when some derivation matches, which recognizes precisely the language generated by the grammar. Conversely, given any Turing machine, a Type-0 grammar can be constructed that simulates the machine's computation history as a rewriting process, generating exactly the strings the machine accepts. Both directions are effective and exact, so 'recursively enumerable' is simultaneously defined as 'has a Turing machine recognizer' and 'is generated by some unrestricted grammar' - these are not competing definitions but two equivalent characterizations of the very same language class, ruling out any claim that one class is strictly larger than the other."
},
{
  id: 'toc-turing-x14',
  q: 'Which of the following statements is a correct application of the fact that RE is closed under intersection but not under complementation?',
  options: ['If L1 and L2 are RE, then L1 intersect L2 is guaranteed RE, but complement(L1) is not guaranteed RE even if L1 is', 'If L1 is RE, then complement(L1) intersect L1 must be RE', 'RE closure under intersection implies RE closure under complementation by De Morgan', 'Since RE is closed under intersection, RE must also be closed under union of complements'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Closure under intersection for RE holds via the parallel-simulation construction (run both recognizers, accept only when both eventually halt-accept). This is a genuinely independent fact from complementation, and there is no valid De Morgan-style shortcut here the way there is for regular or recursive languages, precisely because De Morgan's law (A intersect B = complement(complement(A) union complement(B))) requires closure under BOTH complement and union to connect intersection and union; RE has union and intersection but is missing complement, breaking the chain that would otherwise force complement-closure. So option A correctly states the two facts as independent: intersection stays RE, but complementation of a single RE language is not generally RE (e.g. HALT_TM intersect HALT_TM = HALT_TM stays RE, but complement(HALT_TM) is famously not RE). Options C and D wrongly assume the De Morgan chain completes without the missing complement-closure link, and option B's expression complement(L1) intersect L1 is simply the empty set, always trivially RE for uninteresting reasons unrelated to the closure question."
},
{
  id: 'toc-turing-x15',
  q: 'Consider the diagonalization argument showing the set of all languages over {0,1} is uncountable. Which of the following best describes the technique used?',
  options: ['List all Turing machines and show two of them accept the same language', 'Assume a bijection exists between binary strings and languages over {0,1}, then construct a language differing from the n-th listed language on the n-th string, giving a contradiction', 'Show that every language can be described by a finite regular expression', 'Count the number of DFA states needed for each language and show it grows without bound'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "This is Cantor's classic diagonal argument adapted to languages: identify each language over {0,1} with its characteristic function (or, since binary strings can be enumerated w1, w2, w3, ..., identify a language with an infinite binary sequence of membership bits). Suppose for contradiction that all languages could be listed L1, L2, L3, .... Construct a new language D by flipping the membership of the n-th string relative to L_n: w_n is in D exactly when w_n is NOT in L_n. Then D differs from every L_n in the list (specifically at string w_n), so D cannot appear anywhere in the supposedly complete list - contradicting the assumption that the list was exhaustive. This proves no such enumeration of all languages exists, i.e. the set of languages over {0,1} is uncountable, which is exactly the cardinality gap that forces most languages to have no Turing machine at all (since TMs are only countably many)."
}
);

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-decidability';}).questions.push(
{
  id: 'toc-decidability-x1',
  q: 'Which of the following properties of a given DFA M is DECIDABLE?',
  options: ['Whether L(M) = Sigma* (M accepts every string)', 'Whether L(M) is context-free', 'Whether M has an equivalent PDA with fewer states', 'None of the above; all DFA properties are undecidable'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Universality for DFAs is decidable: complement M by swapping final and non-final states (DFAs are closed under complement), then test the complement for emptiness using a simple reachability check for an accepting state - M is universal exactly when its complement is empty. Every regular language is trivially context-free, so 'is L(M) context-free' is a trivial YES for every DFA, technically decidable but a strange/trick question (still decidable, just not the intended distractor purpose here); the more interesting and directly useful decidable fact is universality, singled out in option A. Comparing to 'an equivalent PDA with fewer states' invokes a state-minimization question across different machine models that is not a standard decidable question in this form. In general, essentially every natural DFA/NFA property (emptiness, finiteness, universality, equivalence) is decidable, unlike the analogous TM properties."
},
{
  id: 'toc-decidability-x2',
  q: 'Which of the following properties of a given CFG G is UNDECIDABLE?',
  options: ['Whether L(G) is empty', 'Whether a specific string w is in L(G)', 'Whether L(G) is regular', 'Whether L(G) is finite'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Emptiness is decidable via a productivity/reachability sweep over the grammar's nonterminals. Membership is decidable via the CYK algorithm after CNF conversion. Finiteness is decidable via a self-embedding cycle check in the nonterminal dependency graph. But testing whether L(G) is REGULAR is undecidable - there is no algorithm that, given an arbitrary CFG, always correctly determines whether the language it generates happens to also be regular. This sits alongside CFG equivalence, universality, and ambiguity as one of the well-known undecidable CFG properties, all typically established via a reduction from Post's Correspondence Problem. The key exam skill here is not lumping every CFG question into 'probably undecidable' - emptiness and finiteness are genuine, useful, decidable algorithms taught explicitly, while regularity, equivalence, universality, and ambiguity are the undecidable side of the table."
},
{
  id: 'toc-decidability-x3',
  q: 'Which of the following properties of a given Turing machine M is DECIDABLE?',
  options: ['Whether M halts on the empty input within a specified number of k steps', 'Whether M halts on the empty input (with no step bound)', 'Whether L(M) is empty', 'Whether L(M) = Sigma*'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "A bounded simulation is always decidable: simulate M on the empty input for exactly k steps and check whether it has reached an accepting (or halting) configuration within that budget - this simulation itself always terminates after at most k steps, regardless of what M does afterward, so the answer is always computable. Removing the step bound turns this into the classical Halting Problem restricted to a fixed input, which is undecidable (a straightforward corollary of the general Halting Problem). Emptiness and universality of L(M) are both undecidable by Rice's theorem, since 'the language is empty' and 'the language is everything' are both nontrivial semantic properties. This question is designed to catch the common exam trap of reflexively marking every TM-related question as undecidable - adding an explicit step bound is exactly what makes option A the decidable one."
},
{
  id: 'toc-decidability-x4',
  q: 'Which of the following properties is NOT covered by Rice\'s theorem (i.e., Rice\'s theorem does not apply to determine its decidability status)?',
  options: ['Whether L(M) contains at least one string of length 5', 'Whether L(M) is empty', 'Whether M has more than 100 states in its transition table', 'Whether L(M) is finite'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Rice's theorem applies only to properties of the LANGUAGE a machine recognizes (semantic properties), and only when the property is nontrivial (true for some RE languages and false for others). 'L(M) contains a string of length 5', 'L(M) is empty', and 'L(M) is finite' are all genuinely about the language, and each is nontrivial (some languages have length-5 strings, some don't; some are empty, some aren't; some are finite, some aren't) - Rice's theorem correctly declares all three undecidable. But 'M has more than 100 states' is a SYNTACTIC property of the machine's own description/code, not a property of the language it recognizes - two completely different-looking machines with different state counts can recognize the exact same language. Rice's theorem simply does not speak to this kind of question, and in fact it is trivially decidable: just count the states listed in M's description."
},
{
  id: 'toc-decidability-x5',
  q: 'Which of the following is TRUE regarding the reduction A ≤ B (A reduces to B via a computable transformation), used to prove undecidability?',
  options: ['If A is undecidable and A ≤ B, then B is undecidable', 'If B is decidable and A ≤ B, then A is decidable', 'If A ≤ B and B is undecidable, then A must also be undecidable', 'Both option A and option B are correct consequences of A ≤ B'],
  answer: 3,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A <= B means a decider for B could be used (via the computable transformation) to build a decider for A. Two valid consequences follow from this single implication: (1) contrapositive-forward - if A is undecidable, B cannot be decidable either, since decidable B would make A decidable, a contradiction; this is option A, the standard way reductions PROVE new problems undecidable. (2) direct - if B actually is decidable, then A is decidable too, by literally running the construction; this is option B, the standard way reductions transfer decidability downward. Option C reverses the valid direction: A <= B and B undecidable tells you NOTHING about A (A might still be perfectly decidable; the reduction only promises that solving B would help solve A, not the other way). Since both A and B (the options) are individually valid and neither contradicts the other, the fully correct answer is option D, both valid consequences together, while option C is the classic backwards-reduction trap."
},
{
  id: 'toc-decidability-x6',
  q: 'Consider the property P(M): "the string 0110 appears somewhere in the transition table description of M written in a fixed encoding." Is the problem "given M, does P(M) hold" decidable?',
  options: ['Undecidable by Rice\'s theorem since it is a nontrivial property', 'Decidable, because it is a syntactic property of M\'s description, not a semantic property of L(M)', 'Undecidable because it depends on the encoding scheme used', 'Decidable only if M is guaranteed to halt on all inputs'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Rice's theorem is strictly about properties of the RECOGNIZED LANGUAGE, and explicitly does not apply to properties of the machine's own textual description or code. Whether the specific bit pattern 0110 literally occurs in M's encoded transition table is a purely syntactic, mechanical, string-matching question about a finite string (the encoding of M) - you can just scan the finite description for the substring 0110 directly, which always halts and gives a correct yes/no answer. This is decidable regardless of what language M happens to recognize, and regardless of whether M halts on any particular input, since the question never runs M at all - it only reads M's static description. This is exactly the kind of question designed to test whether a student over-applies Rice's theorem to any statement merely because it mentions a Turing machine; the correct habit is to first ask 'is this about the language, or about the code?'."
},
{
  id: 'toc-decidability-x7',
  q: 'Which of the following statements about EQ_TM = { <M1, M2> : L(M1) = L(M2) } is TRUE?',
  options: ['EQ_TM is decidable', 'EQ_TM is RE but not decidable', 'EQ_TM is undecidable, and in fact not even RE or co-RE', 'EQ_TM is decidable exactly when both M1 and M2 always halt'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "EQ_TM is one of the strongest undecidability results in the standard syllabus. It is certainly undecidable by Rice's theorem, since 'the two machines recognize the same language' is a nontrivial semantic property when phrased via a fixed reference machine. But it is even worse than problems like the Acceptance Problem: EQ_TM is not RE (there is no algorithm that merely confirms 'yes, equal' whenever it is true, since confirming equality of two possibly-infinite languages cannot be done by any finite positive certificate scheme in general), and it is also not co-RE (no algorithm merely confirms 'no, not equal' either, since witnessing an actual difference could require unbounded search when both languages are complex). This puts EQ_TM in neither RE nor co-RE, a class strictly harder than problems like the Halting Problem, which is at least RE. Option D is a nonsensical restriction with no basis in the actual result."
},
{
  id: 'toc-decidability-x8',
  q: 'Which of the following statements about the property "L(M) is decidable (recursive)", as a property of a Turing machine M, is TRUE?',
  options: ['This property is trivial, so it is automatically decidable to test', 'This property is nontrivial and semantic, so by Rice\'s theorem the problem "given M, is L(M) recursive?" is undecidable', 'This property can never apply since L(M) is always RE by definition of M being a Turing machine', 'This property is decidable specifically because recursive languages have deciders'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Check the Rice's theorem conditions carefully. The property is about the LANGUAGE L(M), so it is semantic, not about M's code - condition one holds. Is it nontrivial? Yes: some Turing machines recognize recursive languages (e.g. a machine that always halts, recognizing a trivially decidable language), and other Turing machines recognize RE-but-not-recursive languages (e.g. a machine that simulates the universal machine to recognize the Halting Problem) - both possibilities genuinely occur among RE languages, so the property is neither always true nor always false. Both Rice's theorem conditions are satisfied, so the problem 'given an arbitrary M, is L(M) recursive?' is undecidable. This is a subtle and commonly missed case, since it feels like it should be answerable by 'just check if M always halts' - but that check itself (does M halt on every input) is exactly as undecidable, by an equivalent Rice's theorem argument, ruling out options A, C, and D."
},
{
  id: 'toc-decidability-x9',
  q: 'Which of the following statements is TRUE about reductions used to prove decidability (as opposed to undecidability)?',
  options: ['To prove a problem B is decidable, reduce a known undecidable problem to B', 'To prove a problem B is decidable, exhibit a direct algorithm, or reduce B to a problem already known to be decidable, in that direction', 'Decidability can only be proven by reducing FROM B to the halting problem', 'Every problem that reduces to an undecidable problem is itself undecidable'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Proving decidability requires either giving an explicit terminating algorithm, or showing B can be solved USING a decider for some already-known-decidable problem C (i.e. reduce B to C, the opposite direction from the standard undecidability-proof template). Option A describes exactly the undecidability-proof pattern, not decidability - reducing a known-undecidable problem TO B shows B is at least as hard as that problem, hence undecidable, the opposite conclusion. Option C is a fabricated, overly narrow restriction with no basis in the actual proof technique (there is no requirement to specifically target the halting problem). Option D is false and is precisely the classic 'backwards reduction' fallacy: a problem reducing INTO an undecidable problem tells you nothing, since B <= (some undecidable problem) says solving the undecidable problem would help solve B, which is no information at all about B's own difficulty - B could easily still be decidable on its own."
},
{
  id: 'toc-decidability-x10',
  q: 'Consider two questions about a Turing machine M with a designated state q5. (i) Given M and a specific input w, does M\'s computation on w ever enter state q5? (ii) Given only M\'s transition table, with no reference to any input, is q5 reachable from q0 by following some sequence of transitions in the state-transition diagram (treated as a plain directed graph)? Which combination correctly states their decidability?',
  options: ['(i) decidable, (ii) decidable', '(i) undecidable, (ii) decidable', '(i) decidable, (ii) undecidable', '(i) undecidable, (ii) undecidable'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: "Question (i) requires actually simulating M on w to see whether q5 ever comes up during a computation that may run forever; it is undecidable, by a direct reduction from the acceptance problem A_TM - build M' from M so that M' enters q5 exactly when the original M would accept w, then a decider for (i) applied to M' and w would decide A_TM, which is impossible. Question (ii), in contrast, never mentions running M on anything - it only asks about the static transition diagram, treating states as graph nodes and transitions as edges regardless of tape symbols or input. This is answered by an ordinary reachability search (BFS or DFS) from q0 in a finite graph, which always terminates and is fully decidable. The contrast is exactly the syntactic-versus-semantic distinction: (ii) is a question about M's fixed, finite code structure, while (i) is a question about an unbounded, possibly nonterminating computation."
},
{
  id: 'toc-decidability-x11',
  q: 'Which of the following is the correct decidability status of "given TM M and string w, does M loop forever on w (never halts)"?',
  options: ['Decidable, by simulating M on w and checking if it halts within a computed bound', 'Undecidable, since it is the complement of the halting problem restricted to this instance, and complement(HALT_TM) is not RE', 'Decidable, because looping forever is the negation of a decidable property', 'Undecidable, but it is at least RE'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Whether M halts on w (HALT_TM) is RE but not recursive. Its complement - 'M does NOT halt on w', exactly the looping question here - is therefore not RE (by the central theorem: if it were RE alongside HALT_TM's own RE recognizer, HALT_TM would become recursive, a contradiction). Not being RE means there isn't even a one-sided semi-algorithm that correctly confirms 'yes, it loops' whenever that is true; you cannot get partial credit for this problem the way you can for HALT_TM itself. So it is undecidable and NOT RE, worse than being merely undecidable-but-RE, ruling out option D. There is no computable universal bound to simulate up to (that is exactly what makes the original halting problem hard), so no simulation-based decision procedure exists, ruling out options A and C."
},
{
  id: 'toc-decidability-x12',
  q: 'Which of the following statements correctly applies the fact "if A ≤ B and A is undecidable, then B is undecidable" to conclude that the problem E_TM = { <M> : L(M) = empty set } is undecidable?',
  options: ['Reduce E_TM to A_TM (the acceptance problem) to show A_TM is undecidable', 'Reduce A_TM to E_TM: build M\' that ignores its input and simulates M on w, so L(M\') is empty exactly when M does not accept w; a decider for E_TM would then decide A_TM', 'Show that E_TM and A_TM are the same problem under renaming', 'Reduce the regular-language emptiness problem to E_TM'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The correct reduction direction is FROM the already-known-undecidable problem A_TM TO the target problem E_TM. Construct M' that, on any input x, ignores x entirely and instead simulates M on the fixed string w; M' accepts x if and only if M accepts w. Then L(M') is either empty set (if M does not accept w) or all of Sigma* (if M does accept w) - either way, testing 'is L(M') empty?' via a hypothetical decider for E_TM directly answers 'does M accept w?', which is exactly A_TM. Since A_TM is known undecidable, this shows E_TM cannot be decidable either (option B). Option A reduces in the useless backwards direction. Option C is false, they are genuinely different problems even though related by this construction. Option D reduces a decidable problem (regular emptiness) to E_TM, which establishes nothing about E_TM's difficulty, since a decidable-to-anything reduction is uninformative."
},
{
  id: 'toc-decidability-x13',
  q: 'Given a CFG G and a DFA R for a regular language over the same alphabet, which of the following correctly states the decidability of the two questions "is L(G) a subset of L(R)?" and "is L(G) = L(R)?"',
  options: ['Subset is decidable; equality is undecidable in general', 'Both are decidable', 'Both are undecidable', 'Subset is undecidable; equality is decidable'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "L(G) is a subset of L(R) exactly when L(G) intersect complement(L(R)) is empty. Complementing the DFA for R is free (swap final states), so complement(L(R)) is regular, and CFL intersected with a regular language is again context-free (run the PDA for G and the DFA for complement(R) in lockstep). CFG emptiness is decidable, so this subset question is decidable. Equality is a different matter: taking R to be the specific DFA accepting Sigma* itself, 'L(G) = L(R)' becomes exactly 'L(G) = Sigma*', the CFG universality problem, which is a landmark UNDECIDABLE problem (reduces from Post's Correspondence Problem). Since general CFG-versus-regular equality would in particular have to solve this special case, equality testing cannot be decidable in general, even though the one-directional subset test is. This subset-versus-equality asymmetry is a subtle and easily-missed distinction."
},
{
  id: 'toc-decidability-x14',
  q: 'A problem X is known to be RE but not recursive. Which of the following CANNOT be concluded about X directly from this information alone?',
  options: ['X is undecidable', 'X has a semi-decider (a machine halting-and-accepting on every yes-instance)', 'complement(X) is RE', 'X is not recursive'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "By definition, RE-but-not-recursive already directly gives: X is undecidable (options A, D restate 'not recursive' in different words, both correctly following) and X has a semi-decider (that is exactly what RE means - a recognizer halting-and-accepting on every member, though it need not halt on non-members). But complement(X) being RE does NOT follow - in fact, by the central RE+co-RE=REC theorem, if complement(X) were also RE, X would have to be recursive, directly contradicting the given hypothesis that X is not recursive. So complement(X) being RE is not just unconfirmed but actually impossible given the stated facts, making option C the one that cannot (indeed must not) be concluded. This question tests precise handling of what a hypothesis does and does not entail, a common source of GATE errors when students assume unrelated closure facts transfer automatically."
},
{
  id: 'toc-decidability-x15',
  q: 'Which of the following is the correct decidability status of the problem: "given two DFAs M1 and M2, is L(M1) intersect L(M2) infinite?"',
  options: ['Undecidable, since it requires reasoning about an infinite intersection', 'Decidable: build the product DFA for the intersection, then check the product automaton\'s reachable-and-co-reachable graph for a cycle', 'Decidable only when both M1 and M2 are acyclic', 'Undecidable, by Rice\'s theorem'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Regular languages are closed under intersection via the standard product construction, so L(M1) intersect L(M2) is itself regular, recognized by a product DFA whose states are pairs of states from M1 and M2. Finiteness of a regular language is decidable: a regular language is infinite exactly when its minimal (or any) accepting automaton has a cycle that lies on some path from the start state to an accepting state (a state that is both reachable from the start and can reach an accepting state). This is a straightforward graph algorithm on the product automaton, giving a fully decidable procedure - option B. Rice's theorem (option D) applies only to Turing machine language properties, not to finite-automaton properties, which is a common category confusion; DFA-based questions are essentially always decidable, in sharp contrast to their Turing-machine analogues."
}
);

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-hierarchy';}).questions.push(
{
  id: 'toc-hierarchy-x1',
  q: 'Which of the following is a valid example of a context-sensitive language that is NOT context-free?',
  options: ['{ a^n b^n c^n : n >= 0 }', '{ a^n b^n : n >= 0 }', '{ a^n b^m : n, m >= 0 }', '{ w in {a,b}* : w is a palindrome }'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "{ a^n b^n c^n } is the standard textbook witness of the CFL-to-CSL gap: a context-sensitive grammar can enforce all three counts being equal using a linear-bounded, mark-and-check strategy (cross off one a, one b, one c per sweep of the tape, which never exceeds the input's length), so the language is context-sensitive, but the CFL pumping lemma proves no single stack can maintain two independent matching relations at once, ruling out context-freeness. The other three options are all comfortably context-free: {a^n b^n} and palindromes each need only one stack-checkable relation, and {a^n b^m} with independent n, m is simply a*b*, which is even regular. So option A is the only genuine CSL-not-CFL example among the four."
},
{
  id: 'toc-hierarchy-x2',
  q: 'Which of the following statements about context-sensitive languages (CSL) is TRUE?',
  options: ['CSL is closed under union, intersection, and complement', 'CSL is closed under union and intersection but not complement', 'Whether a given CSL grammar generates the empty language is decidable in general', 'Every context-sensitive language is regular'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "CSLs are closed under union, intersection, AND complementation - complementation closure for CSLs is a genuinely deep result (the Immerman-Szelepcsenyi theorem, originally proved in the complexity-theory setting for nondeterministic space classes, which context-sensitive languages coincide with via linear bounded automata). This makes CSL closure properties richer than CFL's (which loses both intersection and complement) even though CSL sits above CFL in the hierarchy - closure properties do not simply get worse as a class grows. Emptiness for CSGs is actually UNDECIDABLE (unlike CFG emptiness), since a CSG can simulate enough of a Turing machine's bounded behavior to encode the acceptance problem restricted to linear space, making option C false. CSLs are certainly not all regular; {a^n b^n c^n} itself is a non-regular CSL, ruling out option D."
},
{
  id: 'toc-hierarchy-x3',
  q: 'For which of the following classes in the Chomsky hierarchy is the MEMBERSHIP problem ("does this string belong to the language generated/accepted by this description?") DECIDABLE?',
  options: ['Regular (DFA/regex) only', 'Regular and context-free only', 'Regular, context-free, and context-sensitive, but not unrestricted (Type-0)', 'All four classes, including Type-0'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Membership is decidable for regular languages (simulate the DFA, which always halts after reading the input), for context-free languages (the CYK algorithm runs in O(n^3) after CNF conversion, always terminating), and for context-sensitive languages (simulate the linear bounded automaton, which has only finitely many configurations bounded by the input length, so either it halts within that bound or it must be looping and can be safely rejected). For unrestricted Type-0 grammars, however, membership is exactly the Turing machine acceptance problem, and there is no length bound on the tape or the number of derivation steps, so membership is undecidable in general (though it remains recursively enumerable - you can always semi-decide by search). This progression - decidable for the first three, only semi-decidable for the last - is a key structural fact distinguishing bounded-resource models (finite automaton, PDA, LBA) from the unbounded Turing machine."
},
{
  id: 'toc-hierarchy-x4',
  q: 'Which grammar production shape correctly identifies a Type-1 (context-sensitive) grammar, distinguishing it from Type-0?',
  options: ['Every production has the form alpha A beta -> alpha gamma beta, with gamma nonempty (length never decreases, except possibly S -> epsilon with S not on any right side)', 'Every production has exactly one nonterminal on the left and any string on the right', 'Every production is of the form A -> BC or A -> a', 'Every production has a single terminal at the start of the right-hand side'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Type-1 productions have the noncontracting form alpha A beta -> alpha gamma beta, where A is rewritten to a nonempty string gamma only in the context surrounded by alpha and beta (hence 'context-sensitive'), and crucially |gamma| >= 1 ensures the right-hand side is never shorter than the left-hand side - the only allowed exception is S -> epsilon, permitted solely when S never appears on the right side of any other production. This length-nondecreasing property is exactly what a linear bounded automaton exploits: since no derivation step ever shrinks the string, generating a string of length n requires the working tape never to exceed length n. Option B describes Type-2 (context-free, single nonterminal on the left, but the right side is unrestricted so it can shrink or grow freely), option C describes CNF specifically (a normal form of Type-2), and option D describes Greibach Normal Form, not a hierarchy level at all."
},
{
  id: 'toc-hierarchy-x5',
  q: 'Which of the following correctly places recursive (decidable) languages, REC, in the standard hierarchy?',
  options: ['REC is one of the four classical Chomsky types, sitting between Type-1 and Type-2', 'REC is not one of the four classical Chomsky types, but it sits strictly between CSL and RE: CSL is a proper subset of REC, which is a proper subset of RE', 'REC is identical to CSL', 'REC is identical to RE'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The four classical Chomsky types are exactly Regular, Context-Free, Context-Sensitive, and Type-0 (RE); REC (decidable languages) is not one of the original four grammar-defined types, but it is an essential extra layer that sits strictly between CSL and RE. Every CSL is decidable, because a linear bounded automaton has only finitely many configurations bounded by input length, so a decider can detect non-halting via configuration repetition; but there exist decidable languages that are not context-sensitive (since some decidable languages require more than linear space to recognize, by direct diagonalization over space-bounded machines), so CSL is a strict subset of REC. And REC is a strict subset of RE, witnessed classically by the Halting Problem, which is RE but not decidable. So the correct full chain is Regular subset CFL subset CSL subset REC subset RE, with REC as an added, non-grammar-type layer - option B."
},
{
  id: 'toc-hierarchy-x6',
  q: 'Which of the following is the standard witness demonstrating that CSL is a strict (proper) subset of RE?',
  options: ['{ a^n b^n c^n : n >= 0 }, since it is not regular', 'The Acceptance Problem A_TM, since it is RE but provably not decidable, hence not context-sensitive (as every CSL is decidable)', 'The empty language, since it is trivially in every class', '{ w w^R : w in {a,b}* }, since it is not a DCFL'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "To prove CSL is a PROPER subset of RE, you need a language that IS in RE but demonstrably is NOT in CSL. A_TM (or the Halting Problem) fits perfectly: it is RE (a universal machine can simulate and accept whenever the simulated machine halts-accepts), but it is provably undecidable by diagonalization. Since every context-sensitive language is decidable (via the linear-bounded-automaton configuration-counting argument - finitely many configurations bounded by input length means a decider can detect and reject non-terminating simulation loops), and A_TM is not decidable, A_TM cannot be context-sensitive. This is exactly the separation needed. The other options either separate the wrong pair of classes ({a^n b^n c^n} separates CFL from CSL, not CSL from RE) or are trivial/irrelevant to a strictness argument (the empty language belongs to every level, proving nothing about separation)."
},
{
  id: 'toc-hierarchy-x7',
  q: 'Which of the following grammars is a valid regular (Type-3) grammar in strict right-linear form?',
  options: ['S -> aA | b, A -> aS | b', 'S -> aA | Ab, A -> b', 'S -> AB, A -> a, B -> b', 'S -> aSa | b'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Strict right-linear form requires every production to be A -> aB (a single terminal followed by at most one nonterminal, appearing at the RIGHT end) or A -> a (or A -> epsilon for the start symbol). Option A fits perfectly: every right-hand side has the nonterminal, if present, in the rightmost position after a leading terminal, consistently throughout the whole grammar. Option B mixes forms within a single grammar: S -> aA is right-linear (nonterminal on the right) but S -> Ab is left-linear (nonterminal on the left) - mixing the two forms in one grammar can define non-regular languages, which is exactly why the definition insists on choosing one direction consistently for the entire grammar. Option C has two nonterminals on one right-hand side (A -> BC shape), which is Type-2 (context-free), not Type-3. Option D, S -> aSa | b, wraps a terminal on BOTH sides of the nonterminal, which is neither strictly right- nor left-linear - it actually generates {a^n b a^n}, a non-regular language, confirming it falls outside Type-3."
},
{
  id: 'toc-hierarchy-x8',
  q: 'Which of the following correctly identifies the grammar type (Chomsky classification) for the production set S -> aSBC, S -> abc, CB -> BC, bB -> bb, bC -> bc, cC -> cc?',
  options: ['Type-3 (regular), since the alphabet is small', 'Type-2 (context-free), because every left-hand side is a single nonterminal', 'Type-1 (context-sensitive), because productions like CB -> BC and bB -> bb are noncontracting but not single-nonterminal-on-the-left', 'Type-0, because no restriction can classify this grammar at all'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Scan every production for its shape. S -> aSBC and S -> abc have a single nonterminal on the left, fitting Type-2's requirement alone, but the remaining productions - CB -> BC, bB -> bb, bC -> bc, cC -> cc - all have MULTIPLE symbols on the left-hand side (two symbols each), which immediately disqualifies the grammar from Type-2 (context-free requires strictly one nonterminal on the left in EVERY production). Check the Type-1 requirement instead: is every production noncontracting (right-hand side length >= left-hand side length)? CB -> BC has length 2 -> 2 (equal, fine), bB -> bb has length 2 -> 2 (fine), bC -> bc and cC -> cc are similarly length-preserving, and S -> aSBC grows the string. Since no production ever shrinks the string, the whole grammar is noncontracting, exactly the defining property of Type-1 (context-sensitive) grammars - and in fact this specific grammar is the classical CSG that generates { a^n b^n c^n : n >= 1 } using the CB -> BC commutation trick to reorder markers before converting them to terminals in the correct count."
},
{
  id: 'toc-hierarchy-x9',
  q: 'Which of the following statements about the STRICTNESS of the containment CFL subset CSL is correctly justified?',
  options: ['It follows immediately because CFL is closed under intersection while CSL is not', 'It is witnessed by { a^n b^n c^n : n >= 0 }, which is context-sensitive (generable by a noncontracting grammar / accepted by an LBA) but fails the CFL pumping lemma so cannot be context-free', 'It cannot be proven; the two classes are conjectured but not known to be different', 'It follows because every CSL grammar has strictly more productions than any CFG'],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Strictness proofs need a concrete witness language belonging to the larger class but demonstrably excluded from the smaller one. {a^n b^n c^n} is exactly such a witness for CFL versus CSL: it has a noncontracting (Type-1) grammar and is decidable by a linear bounded automaton within input-length space, so it is context-sensitive; but it fails the context-free pumping lemma (any candidate split uvwxy with |vwx| bounded can touch at most two of the three blocks, so pumping unbalances the third), ruling out context-freeness entirely. Option A misapplies a closure-property fact (which does hold, CFL lacks intersection-closure that CSL enjoys via Immerman-Szelepcsenyi-style results) as if it were itself a direct strictness proof, when a genuine separating witness language is the actual standard method. This hierarchy gap is thoroughly established, not merely conjectured, ruling out option C; option D is simply not a meaningful or valid separation criterion between grammar classes."
},
{
  id: 'toc-hierarchy-x10',
  q: 'Which of the following is TRUE regarding deciding "is a given language in class X regular" for various X in the Chomsky hierarchy?',
  options: ['Given a DFA, deciding if the language is regular is trivially always yes; given a CFG, deciding if L(G) is regular is undecidable', 'Given a CFG, deciding if L(G) is regular is decidable using the pumping lemma directly', 'Given a DFA, deciding if the language is regular is undecidable', 'Regularity testing is undecidable for every input representation, including DFAs'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "A DFA already IS a finite automaton, so the language it accepts is regular by definition - there is nothing to test, the answer is trivially always 'yes' (a slightly degenerate but correct decidable fact, since a constant-yes function is a valid, terminating decision procedure). But given an arbitrary CFG, deciding whether L(G) happens to also be regular is a genuinely undecidable problem, sitting alongside CFG equivalence, universality, and ambiguity as one of the classical undecidable CFG properties. The pumping lemma alone (option B) cannot decide this in general - it can sometimes show a specific language is NOT regular by exhibiting a violation, but it cannot be turned into a general algorithm that correctly answers the regularity question for every possible CFG, since satisfying the pumping property is only necessary, never sufficient, for regularity, and there is no algorithmic way to check 'does this CFG's language satisfy the pumping property for all sufficiently long strings' in finite time for every case."
},
{
  id: 'toc-hierarchy-x11',
  q: 'Which of the following is the correct machine model / grammar type correspondence?',
  options: ['Type-0 grammars correspond to Turing machines; Type-1 to linear bounded automata; Type-2 to pushdown automata; Type-3 to finite automata', 'Type-0 grammars correspond to pushdown automata; Type-1 to Turing machines; Type-2 to linear bounded automata; Type-3 to finite automata', 'All four types correspond to Turing machines, differing only in their allowed running time', 'Type-3 grammars correspond to pushdown automata, and Type-2 to finite automata'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "This is the foundational Chomsky-Schutzenberger correspondence to memorize cold: Type-0 (unrestricted) grammars generate exactly the languages recognized by (unbounded-tape) Turing machines - the RE languages. Type-1 (context-sensitive, noncontracting) grammars correspond exactly to linear bounded automata, Turing machines restricted to tape length proportional to the input. Type-2 (context-free) grammars correspond exactly to (nondeterministic) pushdown automata. Type-3 (regular, right- or left-linear) grammars correspond exactly to finite automata (DFA/NFA, equal power). Each level's machine model is progressively more restricted in its memory resource (unbounded tape, linear tape, a single stack, no auxiliary memory at all beyond finite states), which is precisely why each level's language class is progressively smaller, giving the strict containment chain Regular subset CFL subset CSL subset RE."
},
{
  id: 'toc-hierarchy-x12',
  q: 'Consider the language L = { a^n b^n : n >= 0 } union { a^n b^(2n) : n >= 0 }. What is the tightest level of the Chomsky hierarchy that correctly classifies L?',
  options: ['Regular', 'Context-free but not regular', 'Context-sensitive but not context-free', 'Recursively enumerable but not context-sensitive'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Each piece is individually a simple, standard CFL: {a^n b^n} via S1 -> aS1b | epsilon, and {a^n b^(2n)} via S2 -> aS2bb | epsilon. CFLs are closed under union, so combining them with S -> S1 | S2 gives a valid CFG for the whole union, confirming L is context-free. It is not regular: apply Myhill-Nerode directly to L using the strings a^i for i = 0, 1, 2, .... For i not equal to j, the suffix z = b^i puts a^i z = a^i b^i into L (via the first piece), while a^j z = a^j b^i is neither of the form a^n b^n (since j is not equal to i) nor of the form a^n b^(2n) (since i is not equal to 2j in general) - so a^j z falls outside L. This distinguishes every pair a^i, a^j, giving infinitely many equivalence classes, so L needs unbounded memory and is not regular. A single stack (via the union grammar) suffices for generation, giving the tightest classification: context-free but not regular, option B."
},
{
  id: 'toc-hierarchy-x13',
  q: 'True/False: (i) The class of context-sensitive languages is closed under complementation. (ii) The class of context-sensitive languages is closed under Kleene star. (iii) Every context-sensitive language is decidable. (iv) Every decidable language is context-sensitive. Which combination is correct?',
  options: ['(i) True, (ii) True, (iii) True, (iv) False', '(i) False, (ii) True, (iii) True, (iv) True', '(i) True, (ii) False, (iii) False, (iv) True', '(i) False, (ii) False, (iii) False, (iv) False'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: "(i) is true, and famously nontrivial: CSL closure under complement is the Immerman-Szelepcsenyi theorem, proved via nondeterministic space-bounded computation techniques rather than a simple direct construction. (ii) is also true: CSLs are closed under concatenation and Kleene star using standard grammar-combination techniques adapted to keep productions noncontracting. (iii) is true, and is the key fact linking CSL to the wider hierarchy: an LBA has only finitely many configurations bounded by input length, so a decider can detect looping via configuration repetition and safely reject, guaranteeing every CSL is decidable. (iv) is FALSE: there exist decidable languages that require more than linear space to even write down a certificate or run a natural decision procedure, so REC is a strictly larger class than CSL (CSL is a proper subset of REC, not equal to it) - a decidable language need not be recognizable within input-bounded tape. So the correct combination is option A."
},
{
  id: 'toc-hierarchy-x14',
  q: 'Which of the following grammars correctly has productions that would be classified as Type-2 (context-free) but NOT Type-3 (regular)?',
  options: ['S -> aA, A -> bB, B -> c', 'S -> aSb | epsilon', 'S -> aA | b, A -> a', 'S -> a | b'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "S -> aSb | epsilon has a nonterminal S appearing in the MIDDLE of the right-hand side, sandwiched between two terminals (a on the left, b on the right) - this shape (A -> alpha B beta with both alpha, beta possibly nonempty and containing terminals on both sides of the nonterminal) is not expressible as either strict right-linear (A -> aB) or strict left-linear (A -> Ba) form, yet it is perfectly valid as a general context-free production (a single nonterminal on the left, anything on the right). Indeed this specific grammar generates {a^n b^n : n >= 0}, the canonical non-regular CFL. The other three options are all straightforward right-linear regular grammars (nonterminal only ever appears as the rightmost symbol, if at all), generating regular languages, so they fail to be examples of 'CFL but not regular' grammar shapes."
},
{
  id: 'toc-hierarchy-x15',
  q: 'Which of the following correctly ranks the four classical language classes together with REC, from smallest to largest?',
  options: ['Regular ⊆ CFL ⊆ CSL ⊆ REC ⊆ RE', 'Regular ⊆ CSL ⊆ CFL ⊆ REC ⊆ RE', 'REC ⊆ Regular ⊆ CFL ⊆ CSL ⊆ RE', 'Regular ⊆ CFL ⊆ REC ⊆ CSL ⊆ RE'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "The chain, from most restricted machine model (and smallest language class) to least restricted, runs: Regular (finite memory only) is a subset of Context-Free (finite memory plus one unbounded stack) is a subset of Context-Sensitive (memory bounded linearly in the input length) is a subset of Recursive/decidable (any amount of memory, but the computation is guaranteed to halt) is a subset of Recursively Enumerable (any amount of memory, computation may run forever on non-members). Each containment is strict, with standard witnesses: {a^n b^n} separates Regular from CFL, {a^n b^n c^n} separates CFL from CSL, a super-linear-space-requiring decidable language separates CSL from REC, and the Halting Problem separates REC from RE. Option A states this chain in the correct order; the other three options scramble the CFL/CSL order or misplace REC relative to CSL."
}
);

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-regular';}).questions.push(
{
  id: 'toc-regular-y1',
  q: 'Which of the following languages over {a, b} are regular? (Select ALL that apply)',
  options: ['{ w : w has an even number of a\'s and an even number of b\'s }', '{ w : |w| is a multiple of 3 }', '{ a^n b^n : n >= 0 }', '{ w : w contains the substring aab }'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Option A is regular: a 4-state product DFA tracking (parity of a's, parity of b's) suffices, since both counts only ever need to be tracked mod 2 - finite memory, no unbounded comparison. Option B is regular: a 3-state counter tracking length mod 3 decides this with no reference to symbol identity at all. Option D is regular: it is a standard 'contains substring aab' language, needing a 4-state DFA that tracks the longest matched prefix of aab, exactly like the abb example in the theory. Option C is the classic non-regular language: by Myhill-Nerode the strings a^0, a^1, a^2, ... are pairwise distinguishable (append b^i to separate a^i from a^j), giving infinitely many equivalence classes, so no finite automaton can accept it. Hence A, B, D are regular and C is not."
},
{
  id: 'toc-regular-y2',
  q: 'Which of the following statements about NFAs and DFAs are TRUE? (Select ALL that apply)',
  options: ['Every NFA can be converted to an equivalent DFA', 'An NFA can have more than one transition out of a state on the same input symbol', 'The minimal DFA for a regular language is unique up to renaming of states', 'NFA complementation is achieved simply by swapping accepting and non-accepting states'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A is true: the subset construction converts any NFA into an equivalent DFA (possibly with exponentially more states), which is exactly Kleene/Rabin-Scott's theorem of NFA-DFA equivalence. B is true by definition of nondeterminism - an NFA's transition function maps to a SET of states, so multiple outgoing edges on the same symbol are allowed (this is precisely what distinguishes it from a DFA). C is true: Myhill-Nerode guarantees the minimal DFA is unique up to a renaming/isomorphism of its states, since the states correspond exactly to the equivalence classes of the indistinguishability relation, and this partition is uniquely determined by the language. D is FALSE and is the classic trap: swapping final/non-final states only gives the complement when the machine is deterministic and complete (every state has an outgoing transition on every symbol); on an NFA a string can fail to reach any final state through some paths and reach one through others, and swapping states does not correctly flip acceptance, so NFA complementation instead requires first converting to a DFA."
},
{
  id: 'toc-regular-y3',
  q: 'Let L1 and L2 be regular languages. Which of the following languages are guaranteed to be regular? (Select ALL that apply)',
  options: ['L1 union L2', 'L1 intersection L2', 'L1 - L2 (set difference)', 'L1^R (reversal of L1)'],
  answers: [0, 1, 2, 3],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Regular languages form a Boolean algebra together with closure under reversal, concatenation, and Kleene star, so ALL four operations listed preserve regularity. Union: build a DFA on the product of states of DFAs for L1 and L2, accepting when either component is accepting. Intersection: same product construction, accepting only when both components are accepting. Set difference L1 - L2 equals L1 intersect (complement of L2), and since regular languages are closed under both complement (swap final states on a complete DFA) and intersection, the difference is regular too. Reversal: reverse every transition of an NFA for L1 and swap the roles of the start and final states (making the old final states the new start states via a fresh epsilon-start, and the old start state the new sole final state), which is again a valid NFA construction. So all four options are correct - this question tests exhaustive closure, unlike questions that hunt for a single false closure claim."
},
{
  id: 'toc-regular-y4',
  q: 'Consider the language L = { w in {0,1}* : w does NOT contain 000 as a substring }. Which of the following statements about L are TRUE? (Select ALL that apply)',
  options: ['L is regular', 'The minimal DFA for L has 4 states (including a dead/reject state)', 'The complement of L is also regular', 'L is a finite language'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "L is regular (A true): 'avoiding a fixed substring' is always regular because it can be checked by tracking, at each point, the longest suffix of input read so far that is a prefix of 000, with a single dead state entered once three consecutive 0's appear. Concretely the DFA has states for 'last run of 0's has length 0', 'length 1', 'length 2' (all accepting, since 000 hasn't appeared yet), plus a dead non-accepting state for '000 has appeared' (a sink, since once absent-000 fails it fails forever) - that is exactly 4 states, and none can be merged since exiting distinguishing suffixes exist (e.g. the dead state accepts nothing while the others still can), so B is true. Regular languages are closed under complement (C true) - complementing swaps the accepting labels on this same DFA to get 'contains 000'. L is NOT finite (D false): plenty of long strings like (01)^k avoid 000 for arbitrarily large k, so L is infinite."
},
{
  id: 'toc-regular-y5',
  q: 'A DFA over {0,1} accepts a string if and only if the number of 0s in it is congruent to 1 mod 2 AND the number of 1s in it is congruent to 0 mod 3. What is the minimum number of states in this DFA? Enter your numerical answer.',
  options: [],
  answer: 6,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "The two conditions are independent: parity of the count of 0's (2 possibilities: even, odd) and residue of the count of 1's mod 3 (3 possibilities: 0, 1, 2). Since 0's and 1's are counted independently by disjoint symbol classes, no interaction between the two trackers is possible, so build the product automaton with state space {even, odd} x {0, 1, 2}, giving 2 x 3 = 6 states. Reachability: starting at (even, 0), every combination of parity and residue is reachable by choosing an appropriate mix of 0's and 1's, so all 6 states are reachable. Distinguishability: for any two distinct pairs (p1, r1) != (p2, r2), one can always append a suffix that makes exactly one of them reach the accepting condition (odd, 0) while the other does not, e.g. differing parities are distinguished by an odd vs even number of further 0's while 1's are held at a multiple of 3, and differing residues are distinguished symmetrically. So no states can be merged, confirming the minimum is 6."
},
{
  id: 'toc-regular-y6',
  q: 'Consider the NFA with states {q0, q1, q2}, start state q0, accepting state q2, alphabet {a, b}, and transitions: delta(q0, a) = {q0, q1}, delta(q0, b) = {q0}, delta(q1, b) = {q2}, and all other transitions empty. Using subset construction, how many DISTINCT reachable states does the equivalent DFA have (including any dead/trap state, if reachable)? Enter your numerical answer.',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Run subset construction starting from S0 = {q0}. On a: q0 contributes {q0,q1}, so S0 -a-> S1 = {q0,q1}. On b: q0 contributes {q0}, so S0 -b-> S0. From S1 = {q0,q1}: on a, q0 contributes {q0,q1} and q1 contributes nothing (delta(q1,a) is undefined/empty), so the union is {q0,q1} = S1 (self-loop). On b, q0 contributes {q0} and q1 contributes {q2}, so the union is {q0,q2} = S2, a new state. From S2 = {q0,q2}: on a, q0 contributes {q0,q1} and q2 contributes nothing (q2 has no outgoing transitions at all), so the result is {q0,q1} = S1. On b, q0 contributes {q0} and q2 contributes nothing, so the result is {q0} = S0. No new subsets appear from S2, so the closure is complete. The reachable DFA states are exactly S0={q0}, S1={q0,q1}, S2={q0,q2} - three states. The empty-set trap state is never reached because q0 is present in every reachable subset and always has an outgoing transition on both a and b, so no combination of NFA states ever maps to the empty set. Hence the answer is 3, illustrating that the 2^n upper bound (here 2^3 = 8) is frequently far from tight - only reachable subsets matter."
}
);

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-cfl';}).questions.push(
{
  id: 'toc-cfl-y1',
  q: 'Which of the following languages are context-free? (Select ALL that apply)',
  options: ['{ a^n b^n c^m : n, m >= 0 }', '{ a^n b^n c^n : n >= 0 }', '{ w w^R : w in {a,b}* }', '{ a^i b^j : i, j >= 0 } (all strings of a\'s followed by b\'s)'],
  answers: [0, 2, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A is context-free (in fact only one relation, n = count of leading a's = count of following b's, needs checking; m is completely free), via S -> A C, A -> aAb | epsilon, C -> cC | epsilon. C is the classic CFL palindrome language, matched by pushing the first half and popping while comparing the second half; it is CFL (though not DCFL, since the midpoint must be guessed). D is actually regular (hence automatically also context-free, since Regular is a subset of CFL) via a*b* - a trap for students who only think 'CFL' and forget regular languages qualify too. B is the only non-context-free option: it requires two simultaneous matching relations (a-count = b-count AND b-count = c-count), which the CFL pumping lemma rules out, since any pumped window can only stretch two of the three blocks in lockstep. So A, C, D are context-free; B is not."
},
{
  id: 'toc-cfl-y2',
  q: 'Which of the following statements about closure properties of CFLs and DCFLs are TRUE? (Select ALL that apply)',
  options: ['CFLs are closed under union', 'CFLs are closed under intersection with a regular language', 'DCFLs are closed under complementation', 'DCFLs are closed under union'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A is true: combine two grammars under a fresh start symbol S -> S1 | S2. B is true: run a PDA for the CFL and a DFA for the regular language in parallel as a product machine; only one stack is used (the DFA contributes no stack), so the result stays a CFL - this is a heavily-tested lemma distinct from CFL-intersect-CFL, which fails. C is true and is the signature DCFL closure: a normalized DPDA (always consuming its whole input, never looping on epsilon-moves) can have its accept/reject decision inverted at end of input. D is FALSE: the union of the two DCFLs {a^i b^j c^k : i=j} and {a^i b^j c^k : j=k} is the inherently ambiguous, non-deterministic language {i=j or j=k}, so DCFLs lose closure under union even though general CFLs keep it - this asymmetry (DCFL keeps complement, loses union; CFL keeps union, loses complement) is a favorite GATE trap."
},
{
  id: 'toc-cfl-y3',
  q: 'Which of the following are TRUE statements about Chomsky Normal Form (CNF) and pushdown automata? (Select ALL that apply)',
  options: ['Every context-free language (possibly including epsilon) has an equivalent CNF grammar', 'In a CNF grammar with no epsilon-production, deriving a string of length n requires exactly 2n - 1 production applications', 'Nondeterministic PDAs and CFGs are equivalent in expressive power', 'Every deterministic PDA can be converted to an equivalent CFG that is unambiguous'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is true (with the standard caveat that if epsilon is in L, a separate rule S -> epsilon is added and S is barred from any right-hand side) - every CFL has a CNF grammar. B is true: a CNF derivation tree for a length-n string is a binary tree with n leaves (each leaf a terminal-producing rule) and n-1 internal binary-branching nodes, giving n + (n-1) = 2n-1 total production applications - a frequently tested numerical fact. C is true, this is the fundamental CFG-PDA equivalence theorem (via simulating leftmost derivations on a stack, and conversely). D is FALSE and is a subtle trap: converting a DPDA to a CFG certainly gives a CFG for the same DCFL, but that CFG need not be unambiguous in general conversions, though it is a separate (true) fact that every DCFL DOES have SOME unambiguous grammar - the claim as stated (that the specific conversion procedure yields an unambiguous grammar) overstates what the standard construction guarantees, so this option is not a safe blanket truth to select."
},
{
  id: 'toc-cfl-y4',
  q: 'Which of the following statements correctly distinguish CFL from DCFL? (Select ALL that apply)',
  options: ['Every regular language is a DCFL', 'Every DCFL is closed under complementation, but not every CFL is', 'The language { w c w^R } is DCFL, but { w w^R } is CFL but not DCFL', 'Every CFL can be accepted by some deterministic PDA'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A is true: a DFA is trivially a DPDA that ignores its stack. B is true and is the headline asymmetry: DCFLs close under complement (normalize the DPDA to always finish reading input, then invert its decision) while general CFLs do not (the standard witness intersects two CFLs to get {a^n b^n c^n}, and non-closure under complement then follows by De Morgan from closure under union). C is true: the explicit center marker c in {w c w^R} lets a DPDA know exactly when to switch from pushing to popping (deterministic), whereas {w w^R} with no marker forces the machine to guess the midpoint, and it is a proven theorem that no DPDA can accept it, even though an NPDA (which may guess) accepts it fine. D is FALSE: this is exactly the statement that CFL equals DCFL, which is false precisely because of examples like {w w^R} - DCFL is a strict subset of CFL."
},
{
  id: 'toc-cfl-y5',
  q: 'A context-free grammar in Chomsky Normal Form is used to derive a string of length 15 (no epsilon-productions are used). How many total production (rule) applications does the derivation use? Enter your numerical answer.',
  options: [],
  answer: 29,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "In CNF (excluding the S -> epsilon special case), every production is either A -> BC (binary branching, builds internal tree structure) or A -> a (terminal-producing, creates exactly one leaf). A derivation tree for a string of length n has exactly n leaves, one per terminal symbol produced by an A -> a rule, so there are n applications of terminal rules. Since every internal node of a binary tree with n leaves has exactly n - 1 internal (branching) nodes, there are n - 1 applications of A -> BC rules. Total production applications = n (terminal rules) + (n - 1) (binary rules) = 2n - 1. For n = 15: 2(15) - 1 = 30 - 1 = 29."
},
{
  id: 'toc-cfl-y6',
  q: 'Let L1 = { a^n b^n c^m d^m : n, m >= 0 } and L2 = { a^n b^m c^m d^n : n, m >= 0 }, both over the alphabet {a,b,c,d}. Consider L1 intersect L2. What is the minimum number of pairwise DISTINCT independent counting constraints (equalities among the four block lengths, i.e. count of a = count of b, etc.) that must simultaneously hold for a string to belong to L1 intersect L2? Enter your numerical answer.',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "A string of the form a^p b^q c^r d^s lies in L1 exactly when p = q and r = s (two constraints). It lies in L2 exactly when p = s and q = r (two more constraints). For the string to lie in the intersection, ALL of p=q, r=s, p=s, q=r must hold simultaneously. But these four are not independent: from p=q and p=s we get q=s, and combined with r=s we get q=r automatically, and similarly all four counts collapse to being equal to one single value, i.e. p=q=r=s. The independent constraints needed to force p=q=r=s from four free variables are exactly 3 (e.g. p=q, q=r, r=s pin down all four to a common value; any fourth equation among them is then redundant, being implied by the other three via transitivity). So although 4 named equalities are listed across the two grammars, only 3 independent constraints are needed, and the intersection is exactly {a^n b^n c^n d^n : n >= 0} - not context-free, illustrating again how intersecting two CFLs can force an arbitrarily large number of simultaneous matching relations that a single stack cannot track."
}
);

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-turing';}).questions.push(
{
  id: 'toc-turing-y1',
  q: 'Which of the following statements about recursive (REC) and recursively enumerable (RE) languages are TRUE? (Select ALL that apply)',
  options: ['Every recursive language is recursively enumerable', 'REC is closed under complementation', 'RE is closed under complementation', 'If L and its complement are both RE, then L is recursive'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A is true: a total TM (decider) is in particular a recognizer, since halting-and-accepting on members while halting-and-rejecting on non-members certainly satisfies the weaker RE requirement of halting-and-accepting on members. B is true: given a total TM for L, swap its accept/reject verdicts to get a total TM for the complement, so REC is closed under complement. D is true and is the cornerstone dovetailing theorem: run recognizers for L and its complement in parallel, and since every string is in exactly one of the two, one of them halts and accepts, yielding a decider for L. C is FALSE: if RE were closed under complement, then combined with the fact that RE is already closed under intersection, every RE language would automatically have both itself and its complement RE, forcing it recursive by the theorem in D - but the halting set A_TM is a known counterexample (RE but not recursive), so RE cannot be closed under complement."
},
{
  id: 'toc-turing-y2',
  q: 'Which of the following statements about Turing machine variants and their power are TRUE? (Select ALL that apply)',
  options: ['A multi-tape TM accepts exactly the same class of languages as a single-tape TM', 'A nondeterministic TM accepts exactly the same class of languages as a deterministic TM', 'A TM with a two-way infinite tape accepts a strictly larger class of languages than a one-way infinite tape TM', 'Every language accepted by some TM variant can be accepted by a standard single-tape deterministic TM, possibly with a slowdown'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A is true: a multi-tape TM is simulated by a single-tape TM using interleaved tracks to represent all tapes and marked head positions, at the cost of a quadratic slowdown - the class of languages accepted is identical. B is true: nondeterminism is eliminated by breadth-first simulation over the tree of possible computations on a deterministic TM, at the cost of possibly exponential slowdown - again, same language class (this contrasts sharply with PDAs, where nondeterminism DOES add power). D is true and is the general robustness statement summarizing the whole family of equivalences - this is precisely why the Church-Turing thesis treats 'Turing machine' as a single robust notion of computability regardless of variant. C is FALSE: a two-way infinite tape can be simulated on a one-way infinite tape by folding it into two tracks (representing the left and right halves), so it too accepts exactly the same class - no variant in this list adds power, only the efficiency of computation differs."
},
{
  id: 'toc-turing-y3',
  q: 'Let A_TM = { (M, w) : TM M accepts w }. Which of the following statements about A_TM are TRUE? (Select ALL that apply)',
  options: ['A_TM is recursively enumerable', 'A_TM is recursive', 'The complement of A_TM is recursively enumerable', 'A_TM can be reduced to the halting problem HALT via a computable total function'],
  answers: [0, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is true: a universal TM U simulates M on w and accepts if and only if the simulation accepts, so A_TM is recognized (though U may loop forever if M loops on w, which is acceptable for RE). D is true: define f(M, w) = (M', w) where M' behaves like M but, upon reaching any reject state, enters an infinite loop instead - then M accepts w iff M' halts on w, and f is computable and total, giving A_TM <=m HALT. B is FALSE: A_TM is the canonical undecidable problem, proved by a diagonalization argument (assume a decider H for A_TM exists, build D that runs H on (D, D) and does the opposite of what H reports, yielding a contradiction when D is run on itself). C is FALSE: since A_TM is RE but not recursive, if its complement were also RE, the dovetailing theorem would force A_TM to be recursive - contradiction. So the complement of A_TM is not RE."
},
{
  id: 'toc-turing-y4',
  q: 'L1 is recursively enumerable but not recursive, and L2 is recursive. Which of the following statements are ALWAYS TRUE regardless of the specific choice of L1 and L2? (Select ALL that apply)',
  options: ['L1 union L2 is recursively enumerable', 'L1 intersect L2 is recursively enumerable', 'The complement of L2 is recursive', 'L1 union L2 is always recursive'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is true: RE is closed under union (dovetail both recognizers, accept if either halts and accepts), and since L1 is RE and L2 is recursive (hence also RE), their union is RE regardless of which specific such L1, L2 are chosen. B is true similarly: RE is closed under intersection (dovetail both, accept only when both halt and accept), and recursive implies RE, so the intersection of an RE set and a recursive set is always RE. C is true unconditionally: REC is closed under complementation (invert the total decider's accept/reject verdicts), so the complement of ANY recursive language is recursive - this has nothing to do with L1 at all. D is FALSE as an ALWAYS-true claim: taking L2 = Sigma* forces L1 union L2 = Sigate*, which is recursive, but taking L2 = empty set forces L1 union L2 = L1, which is RE but NOT recursive by hypothesis - so recursiveness of the union is not guaranteed across all choices, only RE-ness is (as captured correctly by option A)."
},
{
  id: 'toc-turing-y5',
  q: 'Consider a Turing machine M with exactly 3 states {q0, q1, q2} (q0 the start state) and tape alphabet {0, 1, blank}. Counting only the (current state, tape symbol) combinations for which a transition must be specified to make M a fully-defined (total transition function) TM, how many distinct (state, symbol) pairs require a transition entry? Enter your numerical answer.',
  options: [],
  answer: 9,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "A Turing machine's transition function delta maps (state, tape symbol) pairs to (state, tape symbol, direction) triples. To be fully defined (total) over all states, a transition entry is needed for every combination of one of the 3 states and one of the 3 tape alphabet symbols (0, 1, blank). This is a simple counting problem: number of pairs = (number of states) x (number of tape symbols) = 3 x 3 = 9. Note this counts transition table entries only, independent of whether some states are designated accepting/halting (a halting state typically needs no outgoing transitions listed, but the question asks for the pairs required to make the function fully defined over all non-halting states, so the direct product count of 9 is what full-table completeness requires here)."
},
{
  id: 'toc-turing-y6',
  q: 'A single-tape deterministic Turing machine simulates a k-tape deterministic Turing machine using the standard interleaved-tracks construction. If the k-tape machine runs for n steps on some input, the single-tape simulation takes O(n^c) steps, where c is a constant independent of k (for the standard construction). What is the value of c? Enter your numerical answer.',
  options: [],
  answer: 2,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "In the standard simulation, the single tape stores all k tapes as interleaved tracks, with special markers recording each tape's head position. To simulate one step of the k-tape machine, the single-tape machine must sweep across the entire used portion of the tape once to read all k virtual head positions and determine the move, then sweep again to update all k tracks accordingly. After n steps of the k-tape machine, the used tape length is at most O(n) (each step moves at most one cell), so each simulated step costs O(n) real steps on the single tape. Simulating all n steps therefore costs O(n) times O(n) = O(n^2) total steps. Hence c = 2: a quadratic slowdown, independent of k. This is the standard robustness result showing multi-tape and single-tape TMs are polynomially equivalent, and it is why the two models are considered equally powerful for the purposes of decidability (only efficiency, not computability, differs)."
}
);

window.GATE_DATA.questions['toc'].topics.find(function(t){return t.id==='toc-decidability';}).questions.push(
{
  id: 'toc-decidability-y1',
  q: 'Which of the following problems are DECIDABLE? (Select ALL that apply)',
  options: ['Given a DFA D, is L(D) empty?', 'Given a CFG G, is L(G) empty?', 'Given a CFG G, is L(G) = Sigma*?', 'Given a TM M, is L(M) empty?'],
  answers: [0, 1],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Emptiness for a DFA is decidable by simple reachability: check whether any final state can be reached from the start state via a finite graph search. Emptiness for a CFG is also decidable: mark all 'generating' nonterminals (those that can derive some terminal string) bottom-up in finite time, and L(G) is empty iff the start symbol is never marked generating - the standard algorithm always terminates. But universality of a CFG - whether L(G) = Sigma* - is undecidable (it can encode the Post Correspondence Problem), so option C is out. Emptiness for a TM is also undecidable (E_TM is a classic Rice's-theorem casualty: 'L(M) is empty' is a non-trivial property of the language, since some RE languages are empty and some are not), so option D is out too. So only A and B are decidable."
},
{
  id: 'toc-decidability-y2',
  q: 'By Rice\'s theorem, which of the following properties of a Turing machine M (referring to L(M), the language it accepts) are UNDECIDABLE? (Select ALL that apply)',
  options: ['L(M) is empty', 'L(M) is a finite language', 'M has exactly 10 states', 'L(M) contains the string 0101'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Rice's theorem states every non-trivial property of the language accepted by a TM (as opposed to a property of the machine's syntax/behavior) is undecidable. 'L(M) is empty' is non-trivial (some TMs accept the empty language, some do not) and depends only on L(M), so it is undecidable - option A. 'L(M) is finite' is similarly non-trivial and language-only, so undecidable - option B. 'L(M) contains the string 0101' is non-trivial (some accepted languages contain it, some do not) and depends only on L(M) - undecidable, option D. Option C, 'M has exactly 10 states', is NOT covered by Rice's theorem at all: it is a syntactic property of the machine's description, not of the language it accepts (two machines with different state counts can accept the very same language), and it is trivially decidable - just count the states listed in M's description. This distinction (property of L(M) vs. property of M's structure) is the key to correctly applying Rice's theorem."
},
{
  id: 'toc-decidability-y3',
  q: 'Suppose problem A many-one reduces to problem B (A <=m B). Which of the following inferences are VALID? (Select ALL that apply)',
  options: ['If B is decidable, then A is decidable', 'If A is undecidable, then B is undecidable', 'If A is decidable, then B is decidable', 'If B is undecidable, then A is undecidable'],
  answers: [0, 1],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A <=m B means there is a computable total function f such that w is in A iff f(w) is in B - so deciding A can be done by computing f(w) and then deciding B. If B is decidable (option A valid): compose the computable f with B's decider to get a decider for A - this is exactly how reductions transfer easiness backward. If A is undecidable (option B valid, and it is just the contrapositive of the first rule): were B decidable, A would be too by the same composition, contradiction - so B must be undecidable. This is the standard tool for proving new problems undecidable: reduce a KNOWN undecidable problem TO the new one. Options C and D are the classic reversed-direction traps: A being decidable says nothing about B (B might still be harder, since the reduction only shows A is NO HARDER than B, not that B is no harder than A), and B being undecidable says nothing about A (A could be trivially decidable, e.g., always reducing to a fixed 'yes' instance of B). Only the forward-hardness / backward-easiness directions are valid."
},
{
  id: 'toc-decidability-y4',
  q: 'Which of the following statements correctly apply the RE / not-RE / decidable trichotomy? (Select ALL that apply)',
  options: ['A_TM (does M accept w?) is RE but not decidable', 'The complement of A_TM is not RE', 'E_TM (is L(M) empty?) is not RE, but its complement (is L(M) nonempty?) is RE', 'Every undecidable language is also not RE'],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A_TM is RE (a universal machine can simulate and confirm acceptance) but undecidable (the classic diagonalization argument), so option A is correct. Since A_TM is RE but not decidable, its complement cannot be RE either - otherwise the dovetailing/parallel-simulation theorem would make A_TM decidable, contradiction - so option B is correct. E_TM (emptiness of L(M)) is not RE: confirming emptiness would require verifying NO input is ever accepted, which has no finite positive witness; but its complement, 'L(M) is nonempty', IS RE, because a finite witness exists - dovetail M over all possible inputs and accept as soon as any single one is accepted, giving option C. Option D is FALSE and is an important distinction to keep straight: 'undecidable' only means 'no total decider exists' - it does NOT imply 'not RE'. A_TM itself is the standard counterexample: it is undecidable YET still RE. The three-level hierarchy (decidable, properly RE, not RE at all) must be kept distinct."
},
{
  id: 'toc-decidability-y5',
  q: 'Consider the following four problems about a given CFG G: (1) Is L(G) empty? (2) Is a given string w in L(G)? (3) Is L(G) finite? (4) Is L(G) = Sigma*? How many of these four problems are DECIDABLE? Enter your numerical answer.',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Go through each: (1) Emptiness of a CFG is decidable via the generating-symbols marking algorithm (mark nonterminals that can derive some terminal string, bottom-up; L(G) is empty iff the start symbol is never marked) - decidable. (2) Membership of a specific string w in L(G) is decidable via the CYK algorithm (assuming G is converted to Chomsky Normal Form first), running in O(n^3) time for |w| = n - decidable. (3) Finiteness of L(G) is decidable: convert G to CNF and check whether the resulting grammar's dependency graph among nonterminals contains a cycle reachable from and co-reachable to a generating, reachable nonterminal - a standard, terminating graph algorithm - decidable. (4) Universality, L(G) = Sigma*, is UNDECIDABLE: it can be shown equivalent in difficulty to the Post Correspondence Problem, which has no algorithm. So exactly 3 of the 4 listed problems (emptiness, membership, finiteness) are decidable, and only universality is not - matching the standard GATE catalogue for CFGs."
},
{
  id: 'toc-decidability-y6',
  q: 'Problem P is known to be RE. Problem Q is known to be RE. It is also known that Q <=m complement(P) (Q many-one reduces to the complement of P). Using only the standard closure and reduction rules, how many of the two problems {P, Q} can be forced to be RECURSIVE (decidable) by this information? Enter your numerical answer.',
  options: [],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Trace the reasoning carefully. We know Q <=m complement(P). This reduction rule tells us: if complement(P) is decidable, then Q is decidable; and if Q is undecidable, then complement(P) is undecidable (hence P is undecidable too, since REC is closed under complement, so P decidable would force complement(P) decidable). But we are NOT given that Q is undecidable, nor that complement(P) is decidable - we only know both P and Q are RE. Being RE alone does not force decidability (the halting set A_TM is the standard counterexample: RE but not recursive). The reduction Q <=m complement(P) does not, by itself, pin down complement(P)'s status either, since it only transfers a KNOWN undecidability or a KNOWN decidability, and neither is given here for either P or Q directly. So from the given information alone, NEITHER P nor Q can be forced to be recursive - both could simultaneously be genuinely non-recursive RE languages (e.g., P = A_TM and a suitably constructed Q), consistent with every stated fact. Hence the answer is 0: no language is forced to be recursive by this information alone."
}
);
