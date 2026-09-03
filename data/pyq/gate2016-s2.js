window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.pyq = window.GATE_DATA.pyq || [];
window.GATE_DATA.pyq.push({
  "year": 2016,
  "paper": "CS Set 2",
  "source": "Official GATE 2016 Computer Science question paper (Set 2) and official answer key",
  "questions": [
    {
      "id": "gate2016s2-ga-1",
      "n": 1,
      "section": "GA",
      "q": "The man who is now Municipal Commissioner worked as ____________________ .",
      "options": [
        "the security guard at a university",
        "a security guard at the university",
        "a security guard at university",
        "the security guard at the university"
      ],
      "answer": 1,
      "marks": 1,
      "explanation": "The indefinite article 'a' correctly introduces the profession (security guard) while the definite article 'the' correctly specifies the particular, already-known university."
    },
    {
      "id": "gate2016s2-ga-2",
      "n": 2,
      "section": "GA",
      "q": "Nobody knows how the Indian cricket team is going to cope with the difficult and seamer-friendly wickets in Australia. Which of the given options is closest in meaning to the underlined phrase 'cope with' in the above sentence?",
      "options": [
        "put up with",
        "put in with",
        "put down to",
        "put up against"
      ],
      "answer": 0,
      "marks": 1,
      "explanation": "'Cope with' means to deal with or endure a difficult situation, which is closest in meaning to 'put up with'."
    },
    {
      "id": "gate2016s2-ga-3",
      "n": 3,
      "section": "GA",
      "q": "Find the odd one in the following group of words: mock, deride, praise, jeer",
      "options": [
        "mock",
        "deride",
        "praise",
        "jeer"
      ],
      "answer": 2,
      "marks": 1,
      "explanation": "'Mock', 'deride', and 'jeer' all mean to ridicule someone, while 'praise' means the opposite -- to commend."
    },
    {
      "id": "gate2016s2-ga-4",
      "n": 4,
      "section": "GA",
      "q": "Pick the odd one from the following options.",
      "options": [
        "CADBE",
        "JHKIL",
        "XVYWZ",
        "ONPMQ"
      ],
      "answer": 3,
      "marks": 1,
      "explanation": "CADBE, JHKIL, and XVYWZ are each a fixed rearrangement pattern of five consecutive alphabet letters; ONPMQ does not follow the same consecutive-letter pattern, making it the odd one."
    },
    {
      "id": "gate2016s2-ga-6",
      "n": 6,
      "section": "GA",
      "q": "Among 150 faculty members in an institute, 55 are connected with each other through Facebook and 85 are connected through WhatsApp. 30 faculty members do not have Facebook or WhatsApp accounts. The number of faculty members connected only through Facebook accounts is ______________.",
      "options": [
        "35",
        "45",
        "65",
        "90"
      ],
      "answer": 0,
      "marks": 2,
      "explanation": "150 - 30 = 120 use at least one platform. |F union W| = |F| + |W| - |F intersect W| gives 120 = 55 + 85 - |F intersect W|, so |F intersect W| = 20. Only-Facebook count = 55 - 20 = 35."
    },
    {
      "id": "gate2016s2-ga-7",
      "n": 7,
      "section": "GA",
      "q": "Computers were invented for performing only high-end useful computations. However, it is no understatement that they have taken over our world today. The internet, for example, is ubiquitous. Many believe that the internet itself is an unintended consequence of the original invention. With the advent of mobile computing on our phones, a whole new dimension is now enabled. One is left wondering if all these developments are good or, more importantly, required. Which of the statement(s) below is/are logically valid and can be inferred from the above paragraph? (i) The author believes that computers are not good for us. (ii) Mobile computers and the internet are both intended inventions.",
      "options": [
        "(i) only",
        "(ii) only",
        "both (i) and (ii)",
        "neither (i) nor (ii)"
      ],
      "answer": 3,
      "marks": 2,
      "explanation": "The passage only wonders whether the developments are good, without asserting they are bad, so (i) is not supported; it explicitly calls the internet an unintended consequence, so (ii) is also not supported. Neither statement is validly inferred."
    },
    {
      "id": "gate2016s2-ga-8",
      "n": 8,
      "section": "GA",
      "q": "All hill-stations have a lake. Ooty has two lakes. Which of the statement(s) below is/are logically valid and can be inferred from the above sentences? (i) Ooty is not a hill-station. (ii) No hill-station can have more than one lake.",
      "options": [
        "(i) only",
        "(ii) only",
        "both (i) and (ii)",
        "neither (i) nor (ii)"
      ],
      "answer": 3,
      "marks": 2,
      "explanation": "'All hill-stations have a lake' only requires at least one lake, so Ooty having two lakes does not contradict it being a hill-station, and the statement says nothing about an upper limit on lakes. Neither inference is valid."
    },
    {
      "id": "gate2016s2-ga-9",
      "n": 9,
      "section": "GA",
      "q": "In a 2 x 4 rectangular grid, each cell is a rectangle. How many rectangles can be observed in the grid?",
      "options": [
        "21",
        "27",
        "30",
        "36"
      ],
      "answer": 2,
      "marks": 2,
      "explanation": "The number of rectangles in an m x n grid is C(m+1,2) x C(n+1,2). For 2 x 4, this is C(3,2) x C(5,2) = 3 x 10 = 30."
    },
    {
      "id": "gate2016s2-cs-1",
      "n": 1,
      "section": "CS",
      "q": "Consider the following expressions: (i) false (ii) Q (iii) true (iv) P v Q (v) not-Q v P. The number of expressions given above that are logically implied by P and (P implies Q) is ______.",
      "options": [],
      "answer": 4.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "P and (P implies Q) forces both P and Q to be true. (i) false is not implied; (ii) Q is implied; (iii) true is always implied; (iv) P v Q is implied since Q holds; (v) not-Q v P is implied since P holds. That gives 4 implied expressions."
    },
    {
      "id": "gate2016s2-cs-2",
      "n": 2,
      "section": "CS",
      "q": "Let f(x) be a polynomial and g(x) = f'(x) be its derivative. If the degree of (f(x) + f(-x)) is 10, then the degree of (g(x) - g(-x)) is ______.",
      "options": [],
      "answer": 9.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "f(x) + f(-x) retains only the even-degree terms of f, so f must have a nonzero x^10 term. Its derivative contributes a degree-9 (odd) term to g(x), and g(x) - g(-x) retains only odd-degree terms, keeping that degree-9 term."
    },
    {
      "id": "gate2016s2-cs-3",
      "n": 3,
      "section": "CS",
      "q": "The minimum number of colours that is sufficient to vertex-colour any planar graph is ______.",
      "options": [],
      "answer": 4.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "By the Four Colour Theorem, every planar graph can be vertex-coloured with at most 4 colours, and some planar graphs (e.g. K4) genuinely need 4."
    },
    {
      "id": "gate2016s2-cs-4",
      "n": 4,
      "section": "CS",
      "q": "Consider the systems, each consisting of m linear equations in n variables. I. If m < n, then all such systems have a solution. II. If m > n, then none of these systems has a solution. III. If m = n, then there exists a system which has a solution. Which one of the following is CORRECT?",
      "options": [
        "I, II and III are true",
        "Only II and III are true",
        "Only III is true",
        "None of them is true"
      ],
      "answer": 2,
      "marks": 1,
      "explanation": "I and II are false in general -- a system with fewer equations than variables can still be inconsistent, and one with more equations than variables can still be consistent. III is true, since when m = n a consistent system (e.g. the identity system) always exists."
    },
    {
      "id": "gate2016s2-cs-5",
      "n": 5,
      "section": "CS",
      "q": "Suppose that a shop has an equal number of LED bulbs of two different types. The probability of an LED bulb lasting more than 100 hours given that it is of Type 1 is 0.7, and given that it is of Type 2 is 0.4. The probability that an LED bulb chosen uniformly at random lasts more than 100 hours is ______.",
      "options": [],
      "answer": 0.55,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "By total probability with equal priors, P(lasts > 100h) = 0.5(0.7) + 0.5(0.4) = 0.55."
    },
    {
      "id": "gate2016s2-cs-6",
      "n": 6,
      "section": "CS",
      "q": "Suppose that the eigenvalues of matrix A are 1, 2, 4. The determinant of (A^-1)^T is ______.",
      "options": [],
      "answer": 0.125,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "det(A) = 1 x 2 x 4 = 8, so det(A^-1) = 1/8 = 0.125, and transposing a matrix does not change its determinant."
    },
    {
      "id": "gate2016s2-cs-7",
      "n": 7,
      "section": "CS",
      "q": "Consider an eight-bit ripple-carry adder for computing the sum of A and B, where A and B are integers represented in 2's complement form. If the decimal value of A is one, the decimal value of B that leads to the longest latency for the sum to stabilize is ______.",
      "options": [],
      "answer": -1.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "With A = 00000001, a carry is generated at bit 0 only if B's bit 0 is 1, and this carry keeps propagating (rather than being absorbed or killed) through every higher bit only if all remaining bits of B are also 1. This requires B = 11111111, i.e. B = -1, which produces the longest possible carry chain."
    },
    {
      "id": "gate2016s2-cs-8",
      "n": 8,
      "section": "CS",
      "q": "Let x1 XOR x2 XOR x3 XOR x4 = 0 where x1, x2, x3, x4 are Boolean variables, and XOR is the exclusive-or operator. Which one of the following must always be TRUE?",
      "options": [
        "x1 x2 x3 x4 = 0",
        "x1 x3 + x2 = 0",
        "not-x1 XOR not-x3 = not-x2 XOR not-x4",
        "x1 + x2 + x3 + x4 = 0"
      ],
      "answer": 2,
      "marks": 1,
      "explanation": "Complementing both operands of an XOR leaves the result unchanged, so not-x1 XOR not-x3 = x1 XOR x3. From x1 XOR x2 XOR x3 XOR x4 = 0 we get x1 XOR x2 = x3 XOR x4, which rearranges to x1 XOR x3 = x2 XOR x4 -- exactly the given identity, so it always holds."
    },
    {
      "id": "gate2016s2-cs-9",
      "n": 9,
      "section": "CS",
      "q": "Let X be the number of distinct 16-bit integers in 2's complement representation. Let Y be the number of distinct 16-bit integers in sign magnitude representation. Then X - Y is ______.",
      "options": [],
      "answer": 1.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "2's complement represents 2^16 distinct integers with a unique zero. Sign-magnitude also has 2^16 bit patterns, but +0 and -0 represent the same integer, giving only 2^16 - 1 distinct integers. So X - Y = 1."
    },
    {
      "id": "gate2016s2-cs-10",
      "n": 10,
      "section": "CS",
      "q": "A processor has 40 distinct instructions and 24 general purpose registers. A 32-bit instruction word has an opcode, two register operands and an immediate operand. The number of bits available for the immediate operand field is ______.",
      "options": [],
      "answer": 16.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "The opcode needs ceil(log2 40) = 6 bits, and each of the two register operands needs ceil(log2 24) = 5 bits, totalling 6 + 2*5 = 16 bits. That leaves 32 - 16 = 16 bits for the immediate field."
    },
    {
      "id": "gate2016s2-cs-11",
      "n": 11,
      "section": "CS",
      "q": "Breadth First Search (BFS) is started on a binary tree beginning from the root vertex. There is a vertex t at a distance four from the root. If t is the n-th vertex in this BFS traversal, then the maximum possible value of n is ______.",
      "options": [],
      "answer": 31.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "BFS visits level by level. Levels 0-3 of a binary tree can together contain at most 1+2+4+8 = 15 vertices, and level 4 can contain up to 16 vertices. If t is the last vertex visited at level 4, n = 15 + 16 = 31."
    },
    {
      "id": "gate2016s2-cs-12",
      "n": 12,
      "section": "CS",
      "q": "The value printed by the following program is ______.\nvoid f(int* p, int m){\n  m = m + 5;\n  *p = *p + m;\n  return;\n}\nvoid main(){\n  int i=5, j=10;\n  f(&i, j);\n  printf(\"%d\", i+j);\n}",
      "options": [],
      "answer": 30.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "j is passed by value into m; inside f, m becomes 15 and *p (i.e. i) becomes 5+15=20. Back in main, i+j = 20+10 = 30."
    },
    {
      "id": "gate2016s2-cs-13",
      "n": 13,
      "section": "CS",
      "q": "Assume that the algorithms considered here sort the input sequences in ascending order. If the input is already in ascending order, which of the following are TRUE? I. Quicksort runs in Theta(n^2) time II. Bubble sort runs in Theta(n^2) time III. Merge sort runs in Theta(n) time IV. Insertion sort runs in Theta(n) time",
      "options": [
        "I and II only",
        "I and III only",
        "II and IV only",
        "I and IV only"
      ],
      "answer": 3,
      "marks": 1,
      "explanation": "With a fixed (e.g. last-element) pivot, quicksort degrades to Theta(n^2) on an already-sorted array, and insertion sort makes only one comparison per element to confirm order, giving Theta(n). Merge sort always takes Theta(n log n) regardless of input order, so III is false, and bubble sort with an early-exit flag runs in Theta(n) on sorted input, so II is false. Only I and IV are true."
    },
    {
      "id": "gate2016s2-cs-14",
      "n": 14,
      "section": "CS",
      "q": "The Floyd-Warshall algorithm for all-pair shortest paths computation is based on",
      "options": [
        "Greedy paradigm.",
        "Divide-and-Conquer paradigm.",
        "Dynamic Programming paradigm.",
        "neither Greedy nor Divide-and-Conquer nor Dynamic Programming paradigm."
      ],
      "answer": 2,
      "marks": 1,
      "explanation": "Floyd-Warshall builds up shortest paths by incrementally allowing more intermediate vertices, reusing previously computed optimal sub-solutions -- the hallmark of dynamic programming."
    },
    {
      "id": "gate2016s2-cs-15",
      "n": 15,
      "section": "CS",
      "q": "N items are stored in a sorted doubly linked list. For a delete operation, a pointer is provided to the record to be deleted. For a decrease-key operation, a pointer is provided to the record on which the operation is to be performed. An algorithm performs the following operations on the list in this order: Theta(N) delete, O(log N) insert, O(log N) find, and Theta(N) decrease-key. What is the time complexity of all these operations put together?",
      "options": [
        "O(log^2 N)",
        "O(N)",
        "O(N^2)",
        "Theta(N^2 log N)"
      ],
      "answer": 2,
      "marks": 1,
      "explanation": "Per the official key, the combined cost is O(N^2): the Theta(N) decrease-key operations can each require up to O(N) traversal of the sorted linked list to reposition a record after its key changes, and this Theta(N) x O(N) term dominates the cost of the delete, insert, and find operations."
    },
    {
      "id": "gate2016s2-cs-16",
      "n": 16,
      "section": "CS",
      "q": "The number of states in the minimum sized DFA that accepts the language defined by the regular expression (0+1)*(0+1)(0+1)* is ______.",
      "options": [],
      "answer": 2.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 1,
      "explanation": "The regular expression describes all nonempty binary strings. The minimal DFA needs one non-accepting start state (for the empty string) and one accepting state that every 0/1 transition leads into and stays in, so 2 states suffice."
    },
    {
      "id": "gate2016s2-cs-17",
      "n": 17,
      "section": "CS",
      "q": "Language L1 is defined by the grammar: S1 -> aS1b | epsilon. Language L2 is defined by the grammar: S2 -> abS2 | epsilon. Consider the following statements: P: L1 is regular Q: L2 is regular. Which one of the following is TRUE?",
      "options": [
        "Both P and Q are true",
        "P is true and Q is false",
        "P is false and Q is true",
        "Both P and Q are false"
      ],
      "answer": 2,
      "marks": 1,
      "explanation": "L1 = {a^n b^n} is the classic non-regular language, so P is false. L2 = (ab)*, generated purely by right recursion with no dependency between counts, is regular, so Q is true."
    },
    {
      "id": "gate2016s2-cs-18",
      "n": 18,
      "section": "CS",
      "q": "Consider the following types of languages: L1: Regular, L2: Context-free, L3: Recursive, L4: Recursively enumerable. Which of the following is/are TRUE? I. L3 union L4 is recursively enumerable II. L2 union L3 is recursive III. L1* intersect L2 is context-free IV. L1 union L2 is context-free",
      "options": [
        "I only",
        "I and III only",
        "I and IV only",
        "I, II and III only"
      ],
      "answer": 3,
      "marks": 1,
      "explanation": "L3 is a subset of L4, so L3 union L4 = L4, which is recursively enumerable (I true). Recursive languages are closed under union with context-free languages, so L2 union L3 is recursive (II true). Regular languages are closed under Kleene star, and context-free languages are closed under intersection with a regular language, so L1* intersect L2 is context-free (III true). Per the official key, IV is excluded from the correct set."
    },
    {
      "id": "gate2016s2-cs-19",
      "n": 19,
      "section": "CS",
      "q": "Match the following: (P) Lexical analysis (Q) Top down parsing (R) Semantic analysis (S) Runtime environments -- (i) Leftmost derivation (ii) Type checking (iii) Regular expressions (iv) Activation records",
      "options": [
        "P<->i, Q<->ii, R<->iv, S<->iii",
        "P<->iii, Q<->i, R<->ii, S<->iv",
        "P<->ii, Q<->iii, R<->i, S<->iv",
        "P<->iv, Q<->i, R<->ii, S<->iii"
      ],
      "answer": 1,
      "marks": 1,
      "explanation": "Lexical analysis uses regular expressions, top-down parsing corresponds to leftmost derivation, semantic analysis performs type checking, and runtime environments use activation records."
    },
    {
      "id": "gate2016s2-cs-20",
      "n": 20,
      "section": "CS",
      "q": "In which one of the following page replacement algorithms it is possible for the page fault rate to increase even when the number of allocated frames increases?",
      "options": [
        "LRU (Least Recently Used)",
        "OPT (Optimal Page Replacement)",
        "MRU (Most Recently Used)",
        "FIFO (First In First Out)"
      ],
      "answer": 3,
      "marks": 1,
      "explanation": "FIFO page replacement can exhibit Belady's anomaly, where increasing the number of allocated frames can paradoxically increase the number of page faults."
    },
    {
      "id": "gate2016s2-cs-21",
      "n": 21,
      "section": "CS",
      "q": "B+ Trees are considered BALANCED because",
      "options": [
        "the lengths of the paths from the root to all leaf nodes are all equal.",
        "the lengths of the paths from the root to all leaf nodes differ from each other by at most 1.",
        "the number of children of any two non-leaf sibling nodes differ by at most 1.",
        "the number of records in any two leaf nodes differ by at most 1."
      ],
      "answer": 0,
      "marks": 1,
      "explanation": "In a B+ tree, all leaf nodes are maintained at exactly the same depth, so every root-to-leaf path has exactly the same length."
    },
    {
      "id": "gate2016s2-cs-22",
      "n": 22,
      "section": "CS",
      "q": "Suppose a database schedule S involves transactions T1, ..., Tn. Construct the precedence graph of S with vertices representing the transactions and edges representing the conflicts. If S is serializable, which one of the following orderings of the vertices of the precedence graph is guaranteed to yield a serial schedule?",
      "options": [
        "Topological order",
        "Depth-first order",
        "Breadth-first order",
        "Ascending order of transaction indices"
      ],
      "answer": 0,
      "marks": 1,
      "explanation": "A schedule is conflict-serializable exactly when its precedence graph is acyclic, and any topological ordering of that acyclic graph gives an equivalent serial schedule."
    },
    {
      "id": "gate2016s2-cs-23",
      "n": 23,
      "section": "CS",
      "q": "Anarkali digitally signs a message and sends it to Salim. Verification of the signature by Salim requires",
      "options": [
        "Anarkali's public key.",
        "Salim's public key.",
        "Salim's private key.",
        "Anarkali's private key."
      ],
      "answer": 0,
      "marks": 1,
      "explanation": "A digital signature is created with the signer's private key and verified with the signer's corresponding public key, so Salim needs Anarkali's public key."
    },
    {
      "id": "gate2016s2-cs-24",
      "n": 24,
      "section": "CS",
      "q": "In an Ethernet local area network, which one of the following statements is TRUE?",
      "options": [
        "A station stops to sense the channel once it starts transmitting a frame.",
        "The purpose of the jamming signal is to pad the frames that are smaller than the minimum frame size.",
        "A station continues to transmit the packet even after the collision is detected.",
        "The exponential backoff mechanism reduces the probability of collision on retransmissions."
      ],
      "answer": 3,
      "marks": 1,
      "explanation": "After a collision, Ethernet stations wait for a random backoff interval chosen from an exponentially growing range before retransmitting, which reduces the chance of repeated collisions."
    },
    {
      "id": "gate2016s2-cs-25",
      "n": 25,
      "section": "CS",
      "q": "Identify the correct sequence in which the following packets are transmitted on the network by a host when a browser requests a webpage from a remote server, assuming that the host has just been restarted.",
      "options": [
        "HTTP GET request, DNS query, TCP SYN",
        "DNS query, HTTP GET request, TCP SYN",
        "DNS query, TCP SYN, HTTP GET request",
        "TCP SYN, DNS query, HTTP GET request"
      ],
      "answer": 2,
      "marks": 1,
      "explanation": "The host must first resolve the server's domain name with a DNS query, then establish a TCP connection with a SYN, and only then send the HTTP GET request over that connection."
    },
    {
      "id": "gate2016s2-cs-26",
      "n": 26,
      "section": "CS",
      "q": "A binary relation R on N x N is defined as follows: (a, b) R (c, d) if a <= c or b <= d. Consider the following propositions: P: R is reflexive Q: R is transitive. Which one of the following statements is TRUE?",
      "options": [
        "Both P and Q are true.",
        "P is true and Q is false.",
        "P is false and Q is true.",
        "Both P and Q are false."
      ],
      "answer": 1,
      "marks": 2,
      "explanation": "R is reflexive since a <= a always holds for (a,b)R(a,b). R is not transitive: for instance (1,5)R(5,1) and (5,1)R(1,5) both hold since the 'or' condition is easily satisfied, but such relations do not compose transitively in general -- a counterexample to transitivity exists."
    },
    {
      "id": "gate2016s2-cs-27",
      "n": 27,
      "section": "CS",
      "q": "Which one of the following well-formed formulae in predicate calculus is NOT valid?",
      "options": [
        "(forall x p(x) implies forall x q(x)) implies (exists x not-p(x) or forall x q(x))",
        "(exists x p(x) or exists x q(x)) implies exists x (p(x) or q(x))",
        "exists x (p(x) and q(x)) implies (exists x p(x) and exists x q(x))",
        "forall x (p(x) or q(x)) implies (forall x p(x) or forall x q(x))"
      ],
      "answer": 3,
      "marks": 2,
      "explanation": "Option D is invalid: it is possible for every x to satisfy p(x) or q(x) (alternating between elements) without either p or q holding for all x -- a standard two-element counterexample."
    },
    {
      "id": "gate2016s2-cs-28",
      "n": 28,
      "section": "CS",
      "q": "Consider a set U of 23 different compounds in a Chemistry lab. There is a subset S of U of 9 compounds, each of which reacts with exactly 3 compounds of U. Consider the following statements: I. Each compound in U minus S reacts with an odd number of compounds. II. At least one compound in U minus S reacts with an odd number of compounds. III. Each compound in U minus S reacts with an even number of compounds. Which one of the above statements is ALWAYS TRUE?",
      "options": [
        "Only I",
        "Only II",
        "Only III",
        "None"
      ],
      "answer": 1,
      "marks": 2,
      "explanation": "Reactions form an undirected graph, so the sum of degrees over all 23 compounds must be even. The 9 compounds in S contribute 9*3=27 (odd) to this sum, so the remaining compounds in U minus S must together contribute an odd sum of degrees, which forces at least one of them to have odd degree."
    },
    {
      "id": "gate2016s2-cs-29",
      "n": 29,
      "section": "CS",
      "q": "The value of the expression 13^99 (mod 17), in the range 0 to 16, is ______.",
      "options": [],
      "answer": 4.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "By Fermat's little theorem, 13^16 = 1 (mod 17). Since 99 mod 16 = 3, 13^99 = 13^3 (mod 17). 13^2 = 169 = 16 (mod 17), so 13^3 = 13*16 = 208 = 4 (mod 17)."
    },
    {
      "id": "gate2016s2-cs-30",
      "n": 30,
      "section": "CS",
      "q": "Suppose the functions F and G can be computed in 5 and 3 nanoseconds by functional units UF and UG, respectively. Given two instances of UF and two instances of UG, it is required to implement the computation F(G(Xi)) for 1 <= i <= 10. Ignoring all other delays, the minimum time required to complete this computation is ______ nanoseconds.",
      "options": [],
      "answer": 28.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "Scheduling the 10 computations optimally across the two 3ns G-units and two 5ns F-units, so that F-units are kept continuously busy once fed, gives a minimum completion time of 28 nanoseconds."
    },
    {
      "id": "gate2016s2-cs-31",
      "n": 31,
      "section": "CS",
      "q": "Consider a processor with 64 registers and an instruction set of size twelve. Each instruction has five distinct fields, namely, opcode, two source register identifiers, one destination register identifier, and a twelve-bit immediate value. Each instruction must be stored in memory in a byte-aligned fashion. If a program has 100 instructions, the amount of memory (in bytes) consumed by the program text is ______.",
      "options": [],
      "answer": 500.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "The opcode needs ceil(log2 12)=4 bits, and the three register fields each need ceil(log2 64)=6 bits (18 bits total), plus the given 12-bit immediate, totalling 4+18+12=34 bits, rounded up to 40 bits (5 bytes) for byte alignment. 100 instructions x 5 bytes = 500 bytes."
    },
    {
      "id": "gate2016s2-cs-33",
      "n": 33,
      "section": "CS",
      "q": "Consider a 3 GHz (gigahertz) processor with a three-stage pipeline and stage latencies tau1, tau2, and tau3 such that tau1 = 3*tau2/4 = 2*tau3. If the longest pipeline stage is split into two pipeline stages of equal latency, the new frequency is ______ GHz, ignoring delays in the pipeline registers.",
      "options": [],
      "answer": 4.0,
      "tolerance": 0.09999999999999987,
      "kind": "nat",
      "marks": 2,
      "explanation": "The original cycle time 1/3 ns equals the longest stage, tau2, so tau2 = 1/3 ns, giving tau1 = 0.25 ns and tau3 = 0.125 ns. Splitting tau2 into two equal 1/6 ns stages makes tau1 = 0.25 ns the new longest stage, giving a new frequency of 1/0.25 ns = 4 GHz."
    },
    {
      "id": "gate2016s2-cs-34",
      "n": 34,
      "section": "CS",
      "q": "A complete binary min-heap is made by including each integer in [1, 1023] exactly once. The depth of a node in the heap is the length of the path from the root of the heap to that node. Thus, the root is at depth 0. The maximum depth at which integer 9 can appear is ______.",
      "options": [],
      "answer": 8.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "In a min-heap, every ancestor of a node must hold a smaller value. To push 9 as deep as possible, its 8 ancestors on the root path can hold the 8 smallest values 1 through 8, placing 9 at depth 8."
    },
    {
      "id": "gate2016s2-cs-35",
      "n": 35,
      "section": "CS",
      "q": "The following function computes X^Y for positive integers X and Y. int exp(int X, int Y) { int res = 1, a = X, b = Y; while (b != 0){ if (b%2 == 0) { a = a*a; b = b/2; } else { res = res*a; b = b-1; } } return res; } Which one of the following conditions is TRUE before every iteration of the loop?",
      "options": [
        "X^Y = a^b",
        "(res * a)^Y = (res * X)^b",
        "X^Y = res * a^b",
        "X^Y = (res * a)^b"
      ],
      "answer": 2,
      "marks": 2,
      "explanation": "Initially res=1, a=X, b=Y so X^Y = res*a^b trivially. If b is even, halving b and squaring a preserves a^b, so res*a^b is unchanged. If b is odd, res*a^b before the update equals (res*a)*a^(b-1), which equals the new res times the new a^b after the update. So the invariant X^Y = res*a^b is preserved throughout."
    },
    {
      "id": "gate2016s2-cs-36",
      "n": 36,
      "section": "CS",
      "q": "Consider the following New-order strategy for traversing a binary tree: Visit the root; Visit the right subtree using New-order; Visit the left subtree using New-order. The New-order traversal of the expression tree corresponding to the reverse polish expression 3 4 * 5 - 2 ^ 6 7 * 1 + - is given by:",
      "options": [
        "+ - 1 6 7 * 2 ^ 5 - 3 4 *",
        "- + 1 * 6 7 ^ 2 - 5 * 3 4",
        "- + 1 * 7 6 ^ 2 - 5 * 4 3",
        "1 7 6 * + 2 5 4 3 * - ^ -"
      ],
      "answer": 2,
      "marks": 2,
      "explanation": "Building the expression tree from the postfix string gives root '-' with left subtree ((3*4)-5)^2 and right subtree (6*7)+1. Applying root-right-left recursively to both subtrees yields - + 1 * 7 6 ^ 2 - 5 * 4 3, matching option C."
    },
    {
      "id": "gate2016s2-cs-37",
      "n": 37,
      "section": "CS",
      "q": "Consider the following program: int f(int *p, int n) { if (n <= 1) return 0; else return max(f(p+1,n-1),p[0]-p[1]); } int main() { int a[] = {3,5,2,6,4}; printf(\"%d\", f(a,5)); } Note: max(x,y) returns the maximum of x and y. The value printed by this program is ______.",
      "options": [],
      "answer": 3.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "The recursion returns the maximum over all consecutive differences a[i]-a[i+1]: (3-5), (5-2), (2-6), (6-4) = -2, 3, -4, 2. The maximum of these is 3."
    },
    {
      "id": "gate2016s2-cs-38",
      "n": 38,
      "section": "CS",
      "q": "Let A1, A2, A3, and A4 be four matrices of dimensions 10 x 5, 5 x 20, 20 x 10, and 10 x 5, respectively. The minimum number of scalar multiplications required to find the product A1 A2 A3 A4 using the basic matrix multiplication method is ______.",
      "options": [],
      "answer": 1500.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "Applying the standard matrix-chain-multiplication dynamic programming recurrence to dimensions 10,5,20,10,5 gives a minimum of 1500 scalar multiplications, achieved by an optimal parenthesization such as ((A1 A2) A3) A4."
    },
    {
      "id": "gate2016s2-cs-40",
      "n": 40,
      "section": "CS",
      "q": "The number of ways in which the numbers 1, 2, 3, 4, 5, 6, 7 can be inserted in an empty binary search tree, such that the resulting tree has height 6, is ______. Note: The height of a tree with a single node is 0.",
      "options": [],
      "answer": 64.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "A height-6 BST on 7 distinct keys must be a single skewed path. Each key inserted after the first must extend the path by being either the current minimum or the current maximum of the remaining unused values, giving 2 choices at each of the last 6 insertions: 2^6 = 64 valid insertion orders."
    },
    {
      "id": "gate2016s2-cs-41",
      "n": 41,
      "section": "CS",
      "q": "In an adjacency list representation of an undirected simple graph G = (V, E), each edge (u, v) has two adjacency list entries: [v] in the adjacency list of u, and [u] in the adjacency list of v. These are called twins of each other. A twin pointer is a pointer from an adjacency list entry to its twin. If |E| = m and |V| = n, and the memory size is not a constraint, what is the time complexity of the most efficient algorithm to set the twin pointer in each entry in each adjacency list?",
      "options": [
        "Theta(n^2)",
        "Theta(n + m)",
        "Theta(m^2)",
        "Theta(n^4)"
      ],
      "answer": 1,
      "marks": 2,
      "explanation": "Using auxiliary storage indexed by vertex to record, for each vertex, a pointer to its most recently seen unmatched adjacency-list entry, each of the 2m entries can be matched to its twin in O(1) amortized time, for a total of Theta(n + m)."
    },
    {
      "id": "gate2016s2-cs-42",
      "n": 42,
      "section": "CS",
      "q": "Consider the following two statements: I. If all states of an NFA are accepting states then the language accepted by the NFA is Sigma*. II. There exists a regular language A such that for all languages B, A intersect B is regular. Which one of the following is CORRECT?",
      "options": [
        "Only I is true",
        "Only II is true",
        "Both I and II are true",
        "Both I and II are false"
      ],
      "answer": 1,
      "marks": 2,
      "explanation": "Statement I is false: an NFA can reject a string simply by having no valid transition defined for it, even if every state is accepting. Statement II is true: taking A to be the empty language, A intersect B is always empty, hence regular, for every B."
    },
    {
      "id": "gate2016s2-cs-43",
      "n": 43,
      "section": "CS",
      "q": "Consider the following languages: L1 = {a^n b^m c^(n+m) : m, n >= 1} L2 = {a^n b^n c^(2n) : n >= 1}. Which one of the following is TRUE?",
      "options": [
        "Both L1 and L2 are context-free.",
        "L1 is context-free while L2 is not context-free.",
        "L2 is context-free while L1 is not context-free.",
        "Neither L1 nor L2 is context-free."
      ],
      "answer": 1,
      "marks": 2,
      "explanation": "L1 can be recognized by a pushdown automaton that pushes while reading a's and b's together and pops while reading c's, so it is context-free. L2 requires simultaneously matching three related counts (n a's, n b's, 2n c's), which a single stack cannot enforce, so it is not context-free."
    },
    {
      "id": "gate2016s2-cs-44",
      "n": 44,
      "section": "CS",
      "q": "Consider the following languages. L1 = {<M> | M takes at least 2016 steps on some input}, L2 = {<M> | M takes at least 2016 steps on all inputs} and L3 = {<M> | M accepts the empty string}, where for each Turing machine M, <M> denotes a specific encoding of M. Which one of the following is TRUE?",
      "options": [
        "L1 is recursive and L2, L3 are not recursive",
        "L2 is recursive and L1, L3 are not recursive",
        "L1, L2 are recursive and L3 is not recursive",
        "L1, L2, L3 are recursive"
      ],
      "answer": 2,
      "marks": 2,
      "explanation": "Whether M takes at least 2016 steps on some or all inputs can be decided by simulating M for a bounded (2016-step) number of steps, so L1 and L2 are recursive. Whether M accepts the empty string, L3, is undecidable, being an instance of the general Turing machine acceptance problem."
    },
    {
      "id": "gate2016s2-cs-45",
      "n": 45,
      "section": "CS",
      "q": "Which one of the following grammars is free from left recursion?",
      "options": [
        "S -> AB, A -> Aa | b, B -> c",
        "S -> Ab | Bb | c, A -> Bd | epsilon, B -> e",
        "S -> Aa | B, A -> Bb | Sc | epsilon, B -> d",
        "S -> Aa | Bb | c, A -> Bd | epsilon, B -> Ae | epsilon"
      ],
      "answer": 1,
      "marks": 2,
      "explanation": "Option A has direct left recursion (A -> Aa). Option C has indirect left recursion, since S -> Aa and A -> Sc allow S to derive a string beginning with S again. Option D has indirect left recursion via A -> Bd and B -> Ae. Option B has no such cycle back to any nonterminal through a leftmost derivation, so it is free of left recursion."
    },
    {
      "id": "gate2016s2-cs-46",
      "n": 46,
      "section": "CS",
      "q": "A student wrote two context-free grammars G1 and G2 for generating a single C-like array declaration, whose dimension is at least one, e.g. int a[10][3];. The grammars use D as the start symbol and six terminal symbols int, id, [, ], num. Grammar G1: D -> int L ; ; L -> id [ E ; E -> num ] ; E -> num ] [ E. Grammar G2: D -> int L ; ; L -> id E ; E -> [ num ] ; E -> E [ num ]. Which of the grammars correctly generate the declaration mentioned above?",
      "options": [
        "Both G1 and G2",
        "Only G1",
        "Only G2",
        "Neither G1 nor G2"
      ],
      "answer": 0,
      "marks": 2,
      "explanation": "This question tests whether each grammar's production rules correctly derive an array declaration with one or more bracketed dimensions, such as int a[10][3];. Per the official key, both G1 and G2 correctly generate this declaration."
    },
    {
      "id": "gate2016s2-cs-47",
      "n": 47,
      "section": "CS",
      "q": "Consider the following processes, with the arrival time and the length of the CPU burst given in milliseconds. The scheduling algorithm used is preemptive shortest remaining-time first. P1: arrival 0, burst 10. P2: arrival 3, burst 6. P3: arrival 7, burst 1. P4: arrival 8, burst 3. The average turn around time of these processes is ______ milliseconds.",
      "options": [],
      "answer": 8.25,
      "tolerance": 0.05000000000000071,
      "kind": "nat",
      "marks": 2,
      "explanation": "Simulating SRTF: P1 runs 0-3, P2 runs 3-7 (preempted by P3), P3 runs 7-8 (finishes), P2 resumes 8-10 (finishes), P4 runs 10-13 (finishes, since its remaining 3 is less than P1's remaining 7), P1 resumes 13-20 (finishes). Completion times are P1=20, P2=10, P3=8, P4=13, giving turnaround times 20, 7, 1, 5, whose average is 33/4 = 8.25."
    },
    {
      "id": "gate2016s2-cs-48",
      "n": 48,
      "section": "CS",
      "q": "Consider the following two-process synchronization solution. Process 0: Entry: loop while (turn == 1); (critical section) Exit: turn = 1; Process 1: Entry: loop while (turn == 0); (critical section) Exit: turn = 0; The shared variable turn is initialized to zero. Which one of the following is TRUE?",
      "options": [
        "This is a correct two-process synchronization solution.",
        "This solution violates mutual exclusion requirement.",
        "This solution violates progress requirement.",
        "This solution violates bounded wait requirement."
      ],
      "answer": 2,
      "marks": 2,
      "explanation": "This strict-alternation scheme forces the two processes to take turns even if one process does not want to enter its critical section, so a process wanting to re-enter can be blocked unnecessarily while the other is not interested -- a violation of the progress requirement."
    },
    {
      "id": "gate2016s2-cs-49",
      "n": 49,
      "section": "CS",
      "q": "Consider a non-negative counting semaphore S. The operation P(S) decrements S, and V(S) increments S. During an execution, 20 P(S) operations and 12 V(S) operations are issued in some order. The largest initial value of S for which at least one P(S) operation will remain blocked is ______.",
      "options": [],
      "answer": 7.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "With 20 P and only 12 V operations, S must net decrease by 8 overall. If the initial value is 7, an ordering that issues all P operations before any V operation exhausts S after 7 successful P operations and blocks the 8th, so 7 is the largest initial value for which blocking can still occur."
    },
    {
      "id": "gate2016s2-cs-51",
      "n": 51,
      "section": "CS",
      "q": "Consider the following database schedule with two transactions, T1 and T2. S = r2(X); r1(X); r2(Y); w1(X); r1(Y); w2(X); a1; a2 where ri(Z) denotes a read operation by transaction Ti on a variable Z, wi(Z) denotes a write operation by Ti on a variable Z and ai denotes an abort by transaction Ti. Which one of the following statements about the above schedule is TRUE?",
      "options": [
        "S is non-recoverable",
        "S is recoverable, but has a cascading abort",
        "S does not have a cascading abort",
        "S is strict"
      ],
      "answer": 2,
      "marks": 2,
      "explanation": "Neither transaction ever reads a value written by the other transaction before that other transaction commits or aborts (T2's reads of X and Y both occur before T1's write, and T1's read of Y is of an original value), so no cascading abort can occur. It is not strict, however, since w2(X) overwrites X after T1's uncommitted write to X."
    },
    {
      "id": "gate2016s2-cs-52",
      "n": 52,
      "section": "CS",
      "q": "Consider the following database table named water_schemes with columns (scheme_no, district_name, capacity) and rows: (1,Ajmer,20), (1,Bikaner,10), (2,Bikaner,10), (3,Bikaner,20), (1,Churu,10), (2,Churu,20), (1,Dungargarh,10). The number of tuples returned by the following SQL query is ______. WITH total(name, capacity) AS (SELECT district_name, SUM(capacity) FROM water_schemes GROUP BY district_name), total_avg(capacity) AS (SELECT AVG(capacity) FROM total) SELECT name FROM total, total_avg WHERE total.capacity >= total_avg.capacity",
      "options": [],
      "answer": 2.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "Per-district totals are Ajmer=20, Bikaner=40, Churu=30, Dungargarh=10, with an overall average of (20+40+30+10)/4=25. Only Bikaner (40) and Churu (30) meet or exceed 25, so the query returns 2 tuples."
    },
    {
      "id": "gate2016s2-cs-53",
      "n": 53,
      "section": "CS",
      "q": "A network has a data transmission bandwidth of 20 x 10^6 bits per second. It uses CSMA/CD in the MAC layer. The maximum signal propagation time from one node to another node is 40 microseconds. The minimum size of a frame in the network is ______ bytes.",
      "options": [],
      "answer": 200.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "The minimum frame size must take at least one round-trip propagation time to transmit: size = 2 x bandwidth x propagation delay = 2 x 20x10^6 x 40x10^-6 = 1600 bits = 200 bytes."
    },
    {
      "id": "gate2016s2-cs-54",
      "n": 54,
      "section": "CS",
      "q": "For the IEEE 802.11 MAC protocol for wireless communication, which of the following statements is/are TRUE? I. At least three non-overlapping channels are available for transmissions. II. The RTS-CTS mechanism is used for collision detection. III. Unicast frames are ACKed.",
      "options": [
        "All I, II, and III",
        "I and III only",
        "II and III only",
        "II only"
      ],
      "answer": 1,
      "marks": 2,
      "explanation": "IEEE 802.11 (2.4 GHz) provides at least three non-overlapping channels (I true), and unicast frames are acknowledged since collisions cannot be detected on a wireless medium (III true). RTS-CTS is used for collision avoidance, not detection (II false)."
    },
    {
      "id": "gate2016s2-cs-55",
      "n": 55,
      "section": "CS",
      "q": "Consider a 128 x 10^3 bits/second satellite communication link with one way propagation delay of 150 milliseconds. Selective retransmission (repeat) protocol is used on this link to send data with a frame size of 1 kilobyte. Neglect the transmission time of acknowledgement. The minimum number of bits required for the sequence number field to achieve 100% utilization is ______.",
      "options": [],
      "answer": 4.0,
      "tolerance": 0.01,
      "kind": "nat",
      "marks": 2,
      "explanation": "Frame transmission time Tt = 8192 bits / 128000 bps = 64 ms. For 100% utilization the window size must satisfy N >= 1 + 2*Tp/Tt = 1 + 300/64, approximately 5.69, so N >= 6. Selective repeat needs a window of at most 2^(k-1), so 2^(k-1) >= 6 requires k >= 4 sequence number bits."
    }
  ]
});
