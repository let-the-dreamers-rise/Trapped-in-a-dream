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
