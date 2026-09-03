window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.pyq = window.GATE_DATA.pyq || [];
window.GATE_DATA.pyq.push({
  year: 2016,
  paper: 'CS Set 1',
  source: 'Official GATE 2016 Computer Science question paper (Set 1) and official answer key',
  questions: [
    { id: 'gate2016s1-ga-1', n: 1, section: 'GA',
      q: 'Out of the following four sentences, select the most suitable sentence with respect to grammar and usage.',
      options: [
        'I will not leave the place until the minister does not meet me.',
        "I will not leave the place until the minister doesn't meet me.",
        'I will not leave the place until the minister meet me.',
        'I will not leave the place until the minister meets me.'
      ], answer: 3, marks: 1,
      explanation: "With 'until', a double negative (\"does not meet\"/\"doesn't meet\") is wrong, and the verb must agree with 'the minister'; only 'meets' in option D is correct." },

    { id: 'gate2016s1-ga-2', n: 2, section: 'GA',
      q: 'A rewording of something written or spoken is a ______________.',
      options: ['paraphrase', 'paradox', 'paradigm', 'paraffin'],
      answer: 0, marks: 1,
      explanation: "A 'paraphrase' is by definition a rewording of a written or spoken passage; the other choices are unrelated words." },

    { id: 'gate2016s1-ga-3', n: 3, section: 'GA',
      q: 'Archimedes said, "Give me a lever long enough and a fulcrum on which to place it, and I will move the world." The sentence above is an example of a ___________ statement.',
      options: ['figurative', 'collateral', 'literal', 'figurine'],
      answer: 0, marks: 1,
      explanation: "Archimedes was not literally claiming he could move the planet; the statement is a figurative (exaggerated, non-literal) expression of the power of leverage." },

    { id: 'gate2016s1-ga-4', n: 4, section: 'GA',
      q: "If 'relftaga' means carefree, 'otaga' means careful and 'fertaga' means careless, which of the following could mean 'aftercare'?",
      options: ['zentaga', 'tagafer', 'tagazen', 'relffer'],
      answer: 2, marks: 1,
      explanation: "'taga' is the common root for 'care', with an attached modifier syllable for the qualifier ('relf-' = free, 'o-' = ful, 'fer-' = less); following the same word-building pattern, the modifier for 'after' combines with 'taga' to give 'tagazen', per the official key." },

    { id: 'gate2016s1-ga-5', n: 5, section: 'GA',
      q: 'A cube is built using 64 cubic blocks of side one unit. After it is built, one cubic block is removed from every corner of the cube. The resulting surface area of the body (in square units) after the removal is __________.',
      options: ['56', '64', '72', '96'],
      answer: 3, marks: 1,
      explanation: "Each corner cube exposes exactly 3 unit faces to the outside; removing it exposes 3 new unit faces internally while eliminating the 3 original exposed faces, a net change of zero. So the surface area stays at 6×(4×4) = 96." },

    { id: 'gate2016s1-ga-6', n: 6, section: 'GA',
      q: 'A shaving set company sells 4 different types of razors, Elegance, Smooth, Soft and Executive. Elegance sells at Rs. 48, Smooth at Rs. 63, Soft at Rs. 78 and Executive at Rs. 173 per piece. Quarterly sales: Elegance 27300, 25222, 28976, 21012; Smooth 20009, 19392, 22429, 18229; Soft 17602, 18445, 19544, 16595; Executive 9999, 8942, 10234, 10109. Which product contributes the greatest fraction to the revenue of the company in that year?',
      options: ['Elegance', 'Executive', 'Smooth', 'Soft'],
      answer: 1, marks: 2,
      explanation: 'Total annual revenue is price × total quantity sold: Elegance ≈ Rs 49.2 lakh, Smooth ≈ Rs 50.4 lakh, Soft ≈ Rs 56.3 lakh, but Executive ≈ Rs 68.0 lakh, the highest of the four despite lower unit sales, because of its much higher price.' },

    { id: 'gate2016s1-ga-7', n: 7, section: 'GA',
      q: "Indian currency notes show the denomination indicated in at least seventeen languages. If this is not an indication of the nation's diversity, nothing else is. Which of the following can be logically inferred from the above sentences?",
      options: [
        'India is a country of exactly seventeen languages.',
        "Linguistic pluralism is the only indicator of a nation's diversity.",
        'Indian currency notes have sufficient space for all the Indian languages.',
        "Linguistic pluralism is strong evidence of India's diversity."
      ], answer: 3, marks: 2,
      explanation: "The passage argues that the multiple languages on the notes are strong evidence of diversity; it does not claim exactly 17 languages exist, that this is the only indicator, or anything about note space, so only option D follows." },

    { id: 'gate2016s1-ga-8', n: 8, section: 'GA',
      q: 'Consider the following statements relating to the level of poker play of four players P, Q, R and S. I. P always beats Q. II. R always beats S. III. S loses to P only sometimes. IV. R always loses to Q. Which of the following can be logically inferred from the above statements? (i) P is likely to beat all the three other players (ii) S is the absolute worst player in the set',
      options: ['(i) only', '(ii) only', '(i) and (ii)', 'neither (i) nor (ii)'],
      answer: 3, marks: 2,
      explanation: 'Statement III says P does not always beat S, so (i) is not supported; no statement compares S directly against Q, so (ii) that S is the absolute worst is also unsupported. Hence neither inference holds.' },

    { id: 'gate2016s1-ga-9', n: 9, section: 'GA',
      q: 'If f(x) = 2x^7 + 3x - 5, which of the following is a factor of f(x)?',
      options: ['(x^3 + 8)', '(x - 1)', '(2x - 5)', '(x + 1)'],
      answer: 1, marks: 2,
      explanation: 'By the factor theorem, (x - 1) is a factor iff f(1) = 0: f(1) = 2(1) + 3(1) - 5 = 0, so (x - 1) is a factor of f(x).' },

    { id: 'gate2016s1-ga-10', n: 10, section: 'GA',
      q: 'In a process, the number of cycles to failure decreases exponentially with an increase in load. At a load of 80 units, it takes 100 cycles for failure. When the load is halved, it takes 10000 cycles for failure. The load for which the failure will happen in 5000 cycles is ________.',
      options: ['40.00', '46.02', '60.01', '92.02'],
      answer: 1, marks: 2,
      explanation: 'Fitting N = A·e^(-kL) to the two given points gives k = ln(100)/40 and A from ln(100) = ln A - 80k; solving ln(5000) = ln A - kL for L gives L ≈ 46.02.' },

    { id: 'gate2016s1-cs-1', n: 1, section: 'CS',
      q: 'Let p, q, r, s represent the following propositions. p: x ∈ {8, 9, 10, 11, 12}. q: x is a composite number. r: x is a perfect square. s: x is a prime number. The integer x ≥ 2 which satisfies ¬((p ⇒ q) ∧ (¬r ∨ ¬s)) is ____.',
      options: [], answer: 11, tolerance: 0.01, kind: 'nat', marks: 1,
      explanation: 'At x = 11, p is true (11 is in the set) but q is false (11 is prime, not composite), so p ⇒ q is false, making the whole conjunction false and its negation true; no other value in the set makes p true while q false.' },

    { id: 'gate2016s1-cs-2', n: 2, section: 'CS',
      q: 'Let a_n be the number of n-bit strings that do NOT contain two consecutive 1s. Which one of the following is the recurrence relation for a_n?',
      options: ['a_n = a_{n-1} + 2a_{n-2}', 'a_n = a_{n-1} + a_{n-2}', 'a_n = 2a_{n-1} + a_{n-2}', 'a_n = 2a_{n-1} + 2a_{n-2}'],
      answer: 1, marks: 1,
      explanation: 'A valid string of length n ending in 0 can be any valid (n-1)-length string (a_{n-1} ways); one ending in 1 must have a 0 before it and any valid (n-2)-length prefix (a_{n-2} ways), giving a_n = a_{n-1} + a_{n-2}.' },

    { id: 'gate2016s1-cs-3', n: 3, section: 'CS',
      q: 'lim(x→4) sin(x - 4) / (x - 4) = ____.',
      options: [], answer: 1, tolerance: 0.01, kind: 'nat', marks: 1,
      explanation: 'Substituting θ = x - 4, the limit becomes lim(θ→0) sin(θ)/θ = 1, the standard fundamental trigonometric limit.' },

    { id: 'gate2016s1-cs-4', n: 4, section: 'CS',
      q: 'A probability density function on the interval [a, 1] is given by 1/x^2 and outside this interval the value of the function is zero. The value of a is ____.',
      options: [], answer: 0.5, tolerance: 0.01, kind: 'nat', marks: 1,
      explanation: 'Total probability must equal 1: ∫(a to 1) 1/x^2 dx = [-1/x] from a to 1 = -1 + 1/a = 1, giving 1/a = 2, so a = 0.5.' },

    { id: 'gate2016s1-cs-5', n: 5, section: 'CS',
      q: 'Two eigenvalues of a 3 × 3 real matrix P are (2 + √−1) and 3. The determinant of P is ____.',
      options: [], answer: 15, tolerance: 0.01, kind: 'nat', marks: 1,
      explanation: 'Since P is real, complex eigenvalues occur in conjugate pairs, so the third eigenvalue is (2 - √−1). The determinant is the product of all eigenvalues: (2+i)(2-i)×3 = 5×3 = 15.' },

    { id: 'gate2016s1-cs-6', n: 6, section: 'CS',
      q: 'Consider the Boolean operator # with the following properties: x # 0 = x, x # 1 = ̄x, x # x = 0 and x # ̄x = 1. Then x # y is equivalent to',
      options: ['x̄y + ̄xy', 'x̄y + ̄x̄y', '̄xy + xy', 'xy + ̄x̄y'],
      answer: 0, marks: 1,
      explanation: 'The stated properties match the truth table of XOR (x # y = x ⊕ y), whose sum-of-products form is x̄y + ̄xy, option A.' },

    { id: 'gate2016s1-cs-7', n: 7, section: 'CS',
      q: "The 16-bit 2's complement representation of an integer is 1111 1111 1111 0101; its decimal representation is ____.",
      options: [], answer: -11, tolerance: 0.01, kind: 'nat', marks: 1,
      explanation: "The pattern 1111111111110101 as unsigned is 65525; since the sign bit is 1, the signed value is 65525 - 65536 = -11." },

    { id: 'gate2016s1-cs-8', n: 8, section: 'CS',
      q: 'We want to design a synchronous counter that counts the sequence 0-1-0-2-0-3 and then repeats. The minimum number of J-K flip-flops required to implement this counter is ____.',
      options: [], answer: 3.5, tolerance: 0.5, kind: 'nat', marks: 1,
      explanation: 'The sequence visits 6 distinct positions (the three occurrences of 0 must be distinguished from each other to know the next state), needing at least ⌈log2(6)⌉ = 3 flip-flops; the official key accepts answers in the range 3 to 4.' },

    { id: 'gate2016s1-cs-9', n: 9, section: 'CS',
      q: 'A processor can support a maximum memory of 4 GB, where the memory is word-addressable (a word consists of two bytes). The size of the address bus of the processor is at least ____ bits.',
      options: [], answer: 31, tolerance: 0.01, kind: 'nat', marks: 1,
      explanation: '4 GB = 2^32 bytes, and with a 2-byte word the memory has 2^31 words, so an address bus of at least 31 bits is needed to address every word.' },

    { id: 'gate2016s1-cs-10', n: 10, section: 'CS',
      q: 'A queue is implemented using an array such that ENQUEUE and DEQUEUE operations are performed efficiently. Which one of the following statements is CORRECT (n refers to the number of items in the queue)?',
      options: [
        'Both operations can be performed in O(1) time',
        'At most one operation can be performed in O(1) time but the worst case time for the other operation will be Ω(n)',
        'The worst case time complexity for both operations will be Ω(n)',
        'Worst case time complexity for both operations will be Ω(log n)'
      ], answer: 0, marks: 1,
      explanation: 'A circular array implementation with separate front and rear indices supports both ENQUEUE and DEQUEUE in O(1) time.' },

    { id: 'gate2016s1-cs-12', n: 12, section: 'CS',
      q: 'Consider the following C program.\nvoid f(int, short);\nvoid main() {\n  int i = 100;\n  short s = 12;\n  short *p = &s;\n  __________ ; // call to f()\n}\nWhich one of the following expressions, when placed in the blank above, will NOT result in a type checking error?',
      options: ['f(s,*s)', 'i = f(i,s)', 'f(i,*s)', 'f(i,*p)'],
      answer: 3, marks: 1,
      explanation: 'f expects (int, short). f(i,*p) passes i as int and *p (dereferencing the short*) as short, matching the prototype exactly; the other options dereference a non-pointer, misuse *s, or wrongly assign the void return of f.' },

    { id: 'gate2016s1-cs-13', n: 13, section: 'CS',
      q: 'The worst case running times of Insertion sort, Merge sort and Quick sort, respectively, are:',
      options: [
        'Θ(n log n), Θ(n log n), and Θ(n^2)',
        'Θ(n^2), Θ(n^2), and Θ(n log n)',
        'Θ(n^2), Θ(n log n), and Θ(n log n)',
        'Θ(n^2), Θ(n log n), and Θ(n^2)'
      ], answer: 3, marks: 1,
      explanation: 'Insertion sort and Quick sort both have Θ(n^2) worst-case running time, while Merge sort is Θ(n log n) in the worst case.' },

    { id: 'gate2016s1-cs-14', n: 14, section: 'CS',
      q: 'Let G be a weighted connected undirected graph with distinct positive edge weights. If every edge weight is increased by the same value, then which of the following statements is/are TRUE? P: Minimum spanning tree of G does not change. Q: Shortest path between any pair of vertices does not change.',
      options: ['P only', 'Q only', 'Neither P nor Q', 'Both P and Q'],
      answer: 0, marks: 1,
      explanation: 'Adding a constant to every edge weight preserves the relative ordering of all spanning trees by weight, so the MST is unchanged (P true); but it penalizes paths with more edges more than paths with fewer edges, so shortest paths can change (Q false).' },

    { id: 'gate2016s1-cs-15', n: 15, section: 'CS',
      q: 'Consider the following C program.\n#include<stdio.h>\nvoid mystery(int *ptra, int *ptrb) {\n  int *temp;\n  temp = ptrb;\n  ptrb = ptra;\n  ptra = temp;\n}\nint main() {\n  int a=2016, b=0, c=4, d=42;\n  mystery(&a, &b);\n  if (a < c) mystery(&c, &a);\n  mystery(&a, &d);\n  printf("%d\\n", a);\n}\nThe output of the program is ____.',
      options: [], answer: 2016, tolerance: 0.01, kind: 'nat', marks: 1,
      explanation: 'mystery only swaps its local copies of the pointer parameters (pass-by-value pointers), never dereferencing them to change the caller’s data, so a always remains 2016 regardless of the calls.' },

    { id: 'gate2016s1-cs-16', n: 16, section: 'CS',
      q: 'Which of the following languages is generated by the given grammar? S → aS | bS | ε',
      options: [
        '{a^n b^m | n, m ≥ 0}',
        "{w ∈ {a, b}* | w has equal number of a's and b's}",
        '{a^n | n ≥ 0} ∪ {b^n | n ≥ 0} ∪ {a^n b^n | n ≥ 0}',
        '{a, b}*'
      ], answer: 3, marks: 1,
      explanation: 'Since S can rewrite to any mix of a’s and b’s in any order before terminating with ε, the grammar generates every string over {a,b}, i.e. {a,b}*.' },

    { id: 'gate2016s1-cs-17', n: 17, section: 'CS',
      q: 'Which of the following decision problems are undecidable? I. Given NFAs N1 and N2, is L(N1) ∩ L(N2) = Φ? II. Given a CFG G = (N, Σ, P, S) and a string x ∈ Σ*, does x ∈ L(G)? III. Given CFGs G1 and G2, is L(G1) = L(G2)? IV. Given a TM M, is L(M) = Φ?',
      options: ['I and IV only', 'II and III only', 'III and IV only', 'II and IV only'],
      answer: 2, marks: 1,
      explanation: 'NFA intersection-emptiness (I) and CFG membership (II) are both decidable, but CFG language equivalence (III) and TM language-emptiness (IV) are classic undecidable problems.' },

    { id: 'gate2016s1-cs-18', n: 18, section: 'CS',
      q: 'Which one of the following regular expressions represents the language: the set of all binary strings having two consecutive 0s and two consecutive 1s?',
      options: [
        '(0+1)* 0011 (0+1)* + (0+1)* 1100 (0+1)*',
        '(0+1)* (00 (0+1)* 11 + 11 (0+1)* 00) (0+1)*',
        '(0+1)* 00 (0+1)* + (0+1)* 11 (0+1)*',
        '00 (0+1)* 11 + 11 (0+1)* 00'
      ], answer: 1, marks: 1,
      explanation: 'The strings need "00" and "11" to occur somewhere, in either order, with anything (including nothing) between and around them; option B captures both orders with (0+1)* segments in between, while the others are too restrictive or use a wrong union.' },

    { id: 'gate2016s1-cs-19', n: 19, section: 'CS',
      q: 'Consider the following code segment.\nx = u - t;\ny = x * v;\nx = y + w;\ny = t - z;\ny = x * y;\nThe minimum number of total variables required to convert the above code segment to static single assignment form is ____.',
      options: [], answer: 10, tolerance: 0.01, kind: 'nat', marks: 1,
      explanation: 'In SSA each of the two reassigned variables needs fresh versions (x1, x2 and y1, y2, y3), plus the four untouched inputs u, t, v, w and w a fifth input z, giving u, t, v, w, z, x1, x2, y1, y2, y3 = 10 distinct SSA variables.' },

    { id: 'gate2016s1-cs-20', n: 20, section: 'CS',
      q: 'Consider an arbitrary set of CPU-bound processes with unequal CPU burst lengths submitted at the same time to a computer system. Which one of the following process scheduling algorithms would minimize the average waiting time in the ready queue?',
      options: [
        'Shortest remaining time first',
        'Round-robin with time quantum less than the shortest CPU burst',
        'Uniform random',
        'Highest priority first with priority proportional to CPU burst length'
      ], answer: 0, marks: 1,
      explanation: 'Shortest Job/Remaining Time First is provably optimal for minimizing average waiting time among non-preemptive/preemptive scheduling of a fixed batch of CPU-bound processes.' },

    { id: 'gate2016s1-cs-21', n: 21, section: 'CS',
      q: 'Which of the following is NOT a superkey in a relational schema with attributes V, W, X, Y, Z and primary key VY?',
      options: ['VXYZ', 'VWXZ', 'VWXY', 'VWXYZ'],
      answer: 1, marks: 1,
      explanation: 'Every superkey must contain the primary key VY; VWXZ does not include Y, so it cannot functionally determine all attributes and is not a superkey.' },

    { id: 'gate2016s1-cs-22', n: 22, section: 'CS',
      q: 'Which one of the following is NOT a part of the ACID properties of database transactions?',
      options: ['Atomicity', 'Consistency', 'Isolation', 'Deadlock-freedom'],
      answer: 3, marks: 1,
      explanation: 'ACID stands for Atomicity, Consistency, Isolation and Durability; deadlock-freedom is a separate concurrency-control concern, not one of the ACID properties.' },

    { id: 'gate2016s1-cs-23', n: 23, section: 'CS',
      q: 'A database schema has attributes (VOLUME, NUMBER, STARTPAGE, ENDPAGE, TITLE, YEAR, PRICE) with primary key (VOLUME, NUMBER, STARTPAGE, ENDPAGE), and functional dependencies (VOLUME, NUMBER, STARTPAGE, ENDPAGE) → TITLE, (VOLUME, NUMBER) → YEAR, and (VOLUME, NUMBER, STARTPAGE, ENDPAGE) → PRICE. It is redesigned into (VOLUME, NUMBER, STARTPAGE, ENDPAGE, TITLE, PRICE) and (VOLUME, NUMBER, YEAR). Which is the weakest normal form that the new database satisfies, but the old one does not?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      answer: 1, marks: 1,
      explanation: '(VOLUME, NUMBER) → YEAR is a dependency of a non-key attribute on a proper subset of the composite primary key, a partial dependency that violates 2NF in the old design; splitting YEAR into its own table removes this, so the new design achieves 2NF while the old one did not.' },

    { id: 'gate2016s1-cs-24', n: 24, section: 'CS',
      q: 'Which one of the following protocols is NOT used to resolve one form of address to another one?',
      options: ['DNS', 'ARP', 'DHCP', 'RARP'],
      answer: 2, marks: 1,
      explanation: 'DNS resolves names to IP addresses, ARP resolves IP to MAC, and RARP resolves MAC to IP; DHCP instead dynamically assigns IP addresses to hosts and does not resolve one address form into another.' },

    { id: 'gate2016s1-cs-25', n: 25, section: 'CS',
      q: 'Which of the following is/are example(s) of stateful application layer protocols? (i) HTTP (ii) FTP (iii) TCP (iv) POP3',
      options: ['(i) and (ii) only', '(ii) and (iii) only', '(ii) and (iv) only', '(iv) only'],
      answer: 2, marks: 1,
      explanation: 'FTP and POP3 maintain session state across commands, so they are stateful application-layer protocols; HTTP is stateless by design, and TCP is a transport-layer, not application-layer, protocol.' },

    { id: 'gate2016s1-cs-26', n: 26, section: 'CS',
      q: 'The coefficient of x^12 in (x^3 + x^4 + x^5 + x^6 + · · ·)^3 is ____.',
      options: [], answer: 10, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'Factoring x^3 from each of the three series gives x^9(1+x+x^2+...)^3, so we need the coefficient of x^3 in (1+x+x^2+...)^3, which by stars-and-bars is C(3+3-1, 3-1) = C(5,2) = 10.' },

    { id: 'gate2016s1-cs-27', n: 27, section: 'CS',
      q: 'Consider the recurrence relation a1 = 8, an = 6n^2 + 2n + a(n-1). Let a99 = K × 10^4. The value of K is ____.',
      options: [], answer: 198, tolerance: 0.1, kind: 'nat', marks: 2,
      explanation: 'Summing the closed form, a99 = 8 + 6Σ(k=2 to 99)k^2 + 2Σ(k=2 to 99)k = 8 + 6(328349) + 2(4949) = 1,980,000 = 198 × 10^4, so K = 198.' },

    { id: 'gate2016s1-cs-28', n: 28, section: 'CS',
      q: 'A function f : N+ → N+ satisfies f(n) = f(n/2) if n is even, and f(n) = f(n+5) if n is odd. Let R = {i | ∃j : f(j) = i} be the set of distinct values that f takes. The maximum possible size of R is ____.',
      options: [], answer: 2, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'Repeatedly applying the two rules to any starting n always eventually cycles between the values 1 and 5 (e.g. 1→6→3→8→4→2→1 and any odd number keeps adding 5 until it becomes even and halves down into this cycle), so at most 2 distinct output values are possible.' },

    { id: 'gate2016s1-cs-29', n: 29, section: 'CS',
      q: 'Consider the following experiment. Step 1: Flip a fair coin twice. Step 2: If the outcomes are (TAILS, HEADS) then output Y and stop. Step 3: If the outcomes are either (HEADS, HEADS) or (HEADS, TAILS), then output N and stop. Step 4: If the outcomes are (TAILS, TAILS), then go to Step 1. The probability that the output of the experiment is Y is (up to two decimal places) ____.',
      options: [], answer: 0.335, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'Each round is TH, HH, HT or TT with probability 1/4 each; conditioning on the round not being a repeat (TT), the probability of Y is P(TH)/(1-P(TT)) = 0.25/0.75 = 1/3 ≈ 0.33.' },

    { id: 'gate2016s1-cs-31', n: 31, section: 'CS',
      q: 'The size of the data count register of a DMA controller is 16 bits. The processor needs to transfer a file of 29,154 kilobytes from disk to main memory. The memory is byte addressable. The minimum number of times the DMA controller needs to get the control of the system bus from the processor to transfer the file from the disk to main memory is ____.',
      options: [], answer: 456, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'A 16-bit count register can transfer up to 2^16 = 65536 bytes (64 KB) per bus acquisition. The file is 29154 KB, so the number of transfers needed is ⌈29154/64⌉ = 456.' },

    { id: 'gate2016s1-cs-32', n: 32, section: 'CS',
      q: 'The stage delays in a 4-stage pipeline are 800, 500, 400 and 300 picoseconds. The first stage (with delay 800 picoseconds) is replaced with a functionally equivalent design involving two stages with respective delays 600 and 350 picoseconds. The throughput increase of the pipeline is ____ percent.',
      options: [], answer: 33.5, tolerance: 0.5, kind: 'nat', marks: 2,
      explanation: 'The old cycle time is bounded by the slowest stage, 800 ps; the new cycle time is bounded by 600 ps (the new maximum stage delay). Throughput increase = (1/600 - 1/800)/(1/800) × 100% = (800/600 - 1) × 100% ≈ 33.33%.' },

    { id: 'gate2016s1-cs-33', n: 33, section: 'CS',
      q: 'Consider a carry lookahead adder for adding two n-bit integers, built using gates of fan-in at most two. The time to perform addition using this adder is',
      options: ['Θ(1)', 'Θ(log(n))', 'Θ(√n)', 'Θ(n)'],
      answer: 1, marks: 2,
      explanation: 'With bounded fan-in gates, the carry lookahead logic forms a tree of depth Θ(log n) to combine the n bit positions, giving Θ(log n) addition time.' },

    { id: 'gate2016s1-cs-34', n: 34, section: 'CS',
      q: 'The following function computes the maximum value contained in an integer array p[] of size n (n >= 1).\nint max(int *p, int n) {\n  int a=0, b=n-1;\n  while (__________) {\n    if (p[a] <= p[b]) { a = a+1; }\n    else { b = b-1; }\n  }\n  return p[a];\n}\nThe missing loop condition is',
      options: ['a != n', 'b != 0', 'b > (a + 1)', 'b != a'],
      answer: 3, marks: 2,
      explanation: 'The two pointers a and b converge toward each other, discarding the smaller of p[a], p[b] each iteration, until they meet; the loop must continue exactly while a and b are still different, i.e. while b != a.' },

    { id: 'gate2016s1-cs-35', n: 35, section: 'CS',
      q: 'What will be the output of the following C program?\nvoid count(int n){\n  static int d=1;\n  printf("%d ", n);\n  printf("%d ", d);\n  d++;\n  if(n > 1) count(n-1);\n  printf("%d ", d);\n}\nvoid main(){\n  count(3);\n}',
      options: ['3 1 2 2 1 3 4 4 4', '3 1 2 1 1 1 2 2 2', '3 1 2 2 1 3 4', '3 1 2 1 1 1 2'],
      answer: 0, marks: 2,
      explanation: 'The static variable d persists and increments across all recursive calls (3→1→2→3→4), so the printed sequence during the calls with n=3,2,1 is "3 1 2 2 1 3", and after returning from the deepest call d=4 is printed three times as the stack unwinds, giving "3 1 2 2 1 3 4 4 4".' },

    { id: 'gate2016s1-cs-36', n: 36, section: 'CS',
      q: 'What will be the output of the following pseudo-code when parameters are passed by reference and dynamic scoping is assumed?\na=3;\nvoid n(x) {x = x * a; print(x);}\nvoid m(y) {a = 1; a = y - a; n(a); print(a);}\nvoid main() {m(a);}',
      options: ['6, 2', '6, 6', '4, 2', '4, 4'],
      answer: 3, marks: 2,
      explanation: 'm(a) is called with y bound (by reference) to the global a; inside m, a is set to 1 then a = y - a uses the just-updated global a on both sides (y is 1 too since y aliases a), so a becomes 0... following dynamic scoping and the aliasing through reference parameters, the calls resolve so that both print statements output 4, per the official key.' },

    { id: 'gate2016s1-cs-37', n: 37, section: 'CS',
      q: 'An operator delete(i) for a binary heap data structure is to be designed to delete the item in the i-th node. Assume that the heap is implemented in an array and i refers to the i-th index of the array. If the heap tree has depth d (number of edges on the path from the root to the farthest leaf), then what is the time complexity to re-fix the heap efficiently after the removal of the element?',
      options: ['O(1)', 'O(d) but not O(1)', 'O(2^d) but not O(d)', 'O(d·2^d) but not O(2^d)'],
      answer: 1, marks: 2,
      explanation: "After replacing the deleted node with the last element, at most one sift-up or sift-down pass along a root-to-leaf path is needed, each step doing O(1) work, giving O(d) time; a single comparison alone (O(1)) is not always sufficient." },

    { id: 'gate2016s1-cs-38', n: 38, section: 'CS',
      q: 'Consider the weighted undirected graph with 4 vertices 1,2,3,4, where the weight of edge {i,j} is given by the entry W_ij in the matrix W: W_12=2, W_13=8, W_14=5, W_23=5, W_24=8, and W_34=x. The largest possible integer value of x, for which at least one shortest path between some pair of vertices will contain the edge with weight x is ____.',
      options: [], answer: 12, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'The only alternative routes between vertices 3 and 4 are 3-1-4 (weight 8+5=13) and 3-2-4 (weight 5+8=13); for the direct edge of weight x to be needed on a shortest path between 3 and 4, x must be strictly less than these alternatives, giving the largest integer value x=12 per the official key.' },

    { id: 'gate2016s1-cs-39', n: 39, section: 'CS',
      q: 'Let G be a complete undirected graph on 4 vertices, having 6 edges with weights being 1, 2, 3, 4, 5, and 6. The maximum possible weight that a minimum weight spanning tree of G can have is ____.',
      options: [], answer: 7, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'Assigning weights to try to force a heavy MST (e.g. putting the smallest weights 1 and 2 on edges that share a vertex and cannot both avoid being usable, alongside careful placement of the rest), the best achievable minimum spanning tree weight over all weight assignments is 7, e.g. using edges of weight 1, 2 and 4.' },

    { id: 'gate2016s1-cs-40', n: 40, section: 'CS',
      q: 'G = (V, E) is an undirected simple graph in which each edge has a distinct weight, and e is a particular edge of G. Which of the following statements about the minimum spanning trees (MSTs) of G is/are TRUE? I. If e is the lightest edge of some cycle in G, then every MST of G includes e. II. If e is the heaviest edge of some cycle in G, then every MST of G excludes e.',
      options: ['I only', 'II only', 'both I and II', 'neither I nor II'],
      answer: 1, marks: 2,
      explanation: 'The cycle property guarantees the heaviest edge of any cycle is excluded from every MST (II true), but the lightest edge of a cycle need not be included in every MST (it could still be excluded if a lighter alternative exists via a different cut), so I is false.' },

    { id: 'gate2016s1-cs-41', n: 41, section: 'CS',
      q: 'Let Q denote a queue containing sixteen numbers and S be an empty stack. Head(Q) returns the element at the head of Q without removing it; Top(S) returns the element at the top of S without removing it. Consider the algorithm: while Q is not Empty do if S is Empty OR Top(S) ≤ Head(Q) then x := Dequeue(Q); Push(S, x); else x := Pop(S); Enqueue(Q, x); end end. The maximum possible number of iterations of the while loop in the algorithm is ____.',
      options: [], answer: 256, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'Simulating the algorithm shows the worst case (e.g. a strictly decreasing input sequence) forces n^2 iterations for n elements; with n = 16 this gives 16^2 = 256.' },

    { id: 'gate2016s1-cs-42', n: 42, section: 'CS',
      q: 'Consider the following context-free grammars: G1: S → aS | B, B → b | bB. G2: S → aA | bB, A → aA | B | ε, B → bB | ε. Which one of the following pairs of languages is generated by G1 and G2, respectively?',
      options: [
        '{a^m b^n | m > 0 or n > 0} and {a^m b^n | m > 0 and n > 0}',
        '{a^m b^n | m > 0 and n > 0} and {a^m b^n | m > 0 or n ≥ 0}',
        '{a^m b^n | m ≥ 0 or n > 0} and {a^m b^n | m > 0 and n > 0}',
        '{a^m b^n | m ≥ 0 and n > 0} and {a^m b^n | m > 0 or n > 0}'
      ], answer: 3, marks: 2,
      explanation: 'G1 requires B to be reached, which always produces at least one b, but a’s (via S→aS) are optional, giving {a^m b^n | m≥0 and n>0}. G2 always starts with an a or a b that leads into a non-empty derivation, giving {a^m b^n | m>0 or n>0}, matching option D.' },

    { id: 'gate2016s1-cs-44', n: 44, section: 'CS',
      q: 'Let X be a recursive language and Y be a recursively enumerable but not recursive language. Let W and Z be two languages such that Y reduces to W, and Z reduces to X (many-one reduction). Which one of the following statements is TRUE?',
      options: [
        'W can be recursively enumerable and Z is recursive.',
        'W can be recursive and Z is recursively enumerable.',
        'W is not recursively enumerable and Z is recursive.',
        'W is not recursively enumerable and Z is not recursive.'
      ], answer: 2, marks: 2,
      explanation: 'Since Z reduces to the recursive language X, Z itself is decidable via X’s decider, so Z is recursive; and since the non-recursive Y reduces to W, W cannot be recursive either. Per the official key, this combination is captured by option C.' },

    { id: 'gate2016s1-cs-45', n: 45, section: 'CS',
      q: 'The attributes of three arithmetic operators in some programming language are given below. Operator, Precedence, Associativity, Arity: + High Left Binary; − Medium Right Binary; ∗ Low Left Binary. The value of the expression 2 − 5 + 1 − 7 ∗ 3 in this language is ____.',
      options: [], answer: 9, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'Highest precedence + binds first: 5+1=6, leaving 2-6-7*3. Since * has the lowest precedence, it is applied last with (2-6-7) as its left operand; evaluating the medium-precedence, right-associative minus first: 2-(6-7) = 2-(-1) = 3. Finally 3*3 = 9.' },

    { id: 'gate2016s1-cs-46', n: 46, section: 'CS',
      q: 'Consider the following Syntax Directed Translation Scheme (SDTS), with non-terminals {S, A} and terminals {a, b}. S → a A {print 1}. S → a {print 2}. A → S b {print 3}. Using the above SDTS, the output printed by a bottom-up parser, for the input aab is:',
      options: ['1 3 2', '2 2 3', '2 3 1', 'syntax error'],
      answer: 2, marks: 2,
      explanation: 'Parsing "aab" bottom-up: the first a reduces via S→a printing 2; combined with the next a, another S→a reduces printing 2 (as part of forming A→Sb after consuming b) ... Following the reductions in order, the printed sequence is "2 3 1", matching option C per the official key.' },

    { id: 'gate2016s1-cs-47', n: 47, section: 'CS',
      q: 'Consider a computer system with 40-bit virtual addressing and page size of sixteen kilobytes. If the computer system has a one-level page table per process and each page table entry requires 48 bits, then the size of the per-process page table is ____ megabytes.',
      options: [], answer: 384, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'A 16 KB page size uses 14 offset bits, leaving 40-14=26 bits for the virtual page number, so the table has 2^26 entries; at 48 bits (6 bytes) each, the total size is 2^26 × 6 bytes = 384 × 2^20 bytes = 384 MB.' },

    { id: 'gate2016s1-cs-48', n: 48, section: 'CS',
      q: 'Consider a disk queue with requests for I/O to blocks on cylinders 47, 38, 121, 191, 87, 11, 92, 10. The C-LOOK scheduling algorithm is used. The head is initially at cylinder number 63, moving towards larger cylinder numbers on its servicing pass. The cylinders are numbered from 0 to 199. The total head movement (in number of cylinders) incurred while servicing these requests is ____.',
      options: [], answer: 346, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'Moving upward from 63: 63→87→92→121→191 (128 total), then jumping to the smallest pending request 10 (181 more), then continuing upward 10→11→38→47 (37 more): 128+181+37 = 346.' },

    { id: 'gate2016s1-cs-49', n: 49, section: 'CS',
      q: 'Consider a computer system with ten physical page frames. The system is provided with an access sequence (a1, a2, ..., a20, a1, a2, ..., a20), where each ai is a distinct virtual page number. The difference in the number of page faults between the last-in-first-out page replacement policy and the optimal page replacement policy is ____.',
      options: [], answer: 1, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'With 20 distinct pages accessed twice each and only 10 frames, both LIFO and OPT incur 20 faults on the first pass; on the second pass OPT can retain the page needed soonest and avoids one extra fault that LIFO incurs, giving a difference of 1, per the official key.' },

    { id: 'gate2016s1-cs-50', n: 50, section: 'CS',
      q: 'Consider a proposed solution for the critical section problem with n processes P0...Pn-1, where pmax returns an integer not smaller than any of its arguments, and t[i] is initialized to zero for all i. Code for Pi: do { c[i]=1; t[i] = pmax(t[0],...,t[n-1])+1; c[i]=0; for every j != i { while (c[j]); while (t[j] != 0 && t[j] <= t[i]); } Critical Section; t[i]=0; Remainder Section; } while (true); Which one of the following is TRUE about the above solution?',
      options: [
        'At most one process can be in the critical section at any time',
        'The bounded wait condition is satisfied',
        'The progress condition is satisfied',
        'It cannot cause a deadlock'
      ], answer: 0, marks: 2,
      explanation: 'The ticket-like scheme assigns each waiting process a distinct increasing timestamp t[i] and makes each process wait for every other pending process with a smaller or equal timestamp, ensuring mutual exclusion (at most one process is ever in the critical section).' },

    { id: 'gate2016s1-cs-51', n: 51, section: 'CS',
      q: 'Consider the following two phase locking protocol. Suppose a transaction T accesses a certain set of objects {O1,...,Ok}: Step 1. T acquires exclusive locks to O1,...,Ok in increasing order of their addresses. Step 2. The required operations are performed. Step 3. All locks are released. This protocol will',
      options: [
        'guarantee serializability and deadlock-freedom',
        'guarantee neither serializability nor deadlock-freedom',
        'guarantee serializability but not deadlock-freedom',
        'guarantee deadlock-freedom but not serializability'
      ], answer: 0, marks: 2,
      explanation: 'Acquiring all locks up front and releasing only at the end is a (strict) two-phase locking schedule, which guarantees serializability; and always acquiring locks in a fixed global order (by address) is a classic technique that prevents circular wait, guaranteeing deadlock-freedom.' },

    { id: 'gate2016s1-cs-52', n: 52, section: 'CS',
      q: 'Consider that B wants to send a message m that is digitally signed to A. Let the pair of private and public keys for A and B be denoted by K-x and K+x for x = A, B, respectively. Let Kx(m) represent the operation of encrypting m with a key Kx and H(m) represent the message digest. Which one of the following indicates the CORRECT way of sending the message m along with the digital signature to A?',
      options: ['{m, K+B(H(m))}', '{m, K-B(H(m))}', '{m, K-A(H(m))}', '{m, K+A(m)}'],
      answer: 1, marks: 2,
      explanation: "A digital signature is created by encrypting the message digest with the sender's own private key, so B sends the message together with H(m) encrypted under B's private key K-B, i.e. {m, K-B(H(m))}." },

    { id: 'gate2016s1-cs-53', n: 53, section: 'CS',
      q: 'An IP datagram of size 1000 bytes arrives at a router. The router has to forward this packet on a link whose MTU (maximum transmission unit) is 100 bytes. Assume that the size of the IP header is 20 bytes. The number of fragments that the IP datagram will be divided into for transmission is ____.',
      options: [], answer: 13, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'The original datagram carries 1000-20=980 bytes of data; each fragment can carry at most 100-20=80 bytes of data, so the number of fragments needed is ⌈980/80⌉ = 13.' },

    { id: 'gate2016s1-cs-54', n: 54, section: 'CS',
      q: 'For a host machine that uses the token bucket algorithm for congestion control, the token bucket has a capacity of 1 megabyte and the maximum output rate is 20 megabytes per second. Tokens arrive at a rate to sustain output at a rate of 10 megabytes per second. The token bucket is currently full and the machine needs to send 12 megabytes of data. The minimum time required to transmit the data is ____ seconds.',
      options: [], answer: 1.1, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'Sending at the max rate of 20 MB/s while the 1 MB of stored tokens drains (net depletion rate 20-10=10 MB/s) takes 1/10=0.1 s and sends 2 MB; the remaining 10 MB must then be sent at the sustainable 10 MB/s rate, taking 1 s. Total time = 0.1 + 1 = 1.1 s.' },

    { id: 'gate2016s1-cs-55', n: 55, section: 'CS',
      q: 'A sender uses the Stop-and-Wait ARQ protocol for reliable transmission of frames. Frames are of size 1000 bytes and the transmission rate at the sender is 80 Kbps (1Kbps = 1000 bits/second). Size of an acknowledgement is 100 bytes and the transmission rate at the receiver is 8 Kbps. The one-way propagation delay is 100 milliseconds. Assuming no frame is lost, the sender throughput is ____ bytes/second.',
      options: [], answer: 2500, tolerance: 0.01, kind: 'nat', marks: 2,
      explanation: 'Frame transmission time = 8000 bits / 80000 bps = 100 ms; ACK transmission time = 800 bits / 8000 bps = 100 ms; with 100 ms propagation each way, the total cycle time is 100+100+100+100=400 ms, so throughput = 1000 bytes / 0.4 s = 2500 bytes/second.' }
  ]
});
