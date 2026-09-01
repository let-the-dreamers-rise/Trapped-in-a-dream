window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['digital'] = {
  subject: 'Digital Logic',
  topics: [
    {
      id: 'digital-boolean',
      name: 'Boolean Algebra & Minimization',
      theory: {
        intro: "Boolean algebra is the mathematics of two-valued logic, and it is the foundation on which every gate, adder and processor is built. In GATE CS, this topic reliably contributes 1-2 marks every year, usually as a minimal SOP question, a prime implicant count, or a functional completeness check. The questions look small but they are precision traps: one missed grouping on a K-map or one forgotten consensus term flips your answer. What makes this topic high-return is that the toolbox is tiny — about ten algebraic laws, the K-map procedure, and the prime implicant vocabulary — yet it covers a huge fraction of what examiners can ask. Master simplification both algebraically and graphically, because GATE deliberately writes expressions that are painful one way and trivial the other. Expect crossover questions too: minimization ideas resurface inside combinational circuit design and even computer organization.",
        core: "• Basic identities: x + 0 = x, x·1 = x, x + x' = 1, x·x' = 0, x + x = x, x·x = x. Idempotence means Boolean algebra has no coefficients or exponents.\n\n• Absorption and reduction: x + xy = x; x(x + y) = x; x + x'y = x + y. The last one is the most heavily used simplification step in GATE answers and the one students forget first.\n\n• De Morgan's laws: (x + y)' = x'·y' and (xy)' = x' + y'. They generalize to any number of variables and are the reason NAND and NOR can each replace all other gates.\n\n• Consensus theorem: xy + x'z + yz = xy + x'z. The term yz is redundant because whenever y and z are both 1, one of the other two terms is already 1. Spotting a consensus term instantly shortens many expressions.\n\n• Duality: swapping AND with OR and 0 with 1 in any valid identity yields another valid identity. The dual of an expression is not its complement — a classic trap.\n\n• Canonical forms: any function can be written as a sum of minterms (SOP, Σm notation) or product of maxterms (POS, ΠM notation). Minterm i and maxterm i are complements of each other, and f = Σm(list) implies f' = Σm(everything not in the list) = ΠM(list).\n\n• K-maps: a Karnaugh map arranges minterms in Gray-code order so that physically adjacent cells differ in exactly one variable. A 3-variable map has 8 cells, a 4-variable map has 16. Groups must be rectangles of size 1, 2, 4, 8 or 16; the map wraps around left-right and top-bottom, and the four corners of a 4-variable map form a valid group. A group of 2^k cells eliminates k variables, leaving n - k literals in the product term.\n\n• Implicants: an implicant is any product term that is entirely inside the ON-set of f. A prime implicant (PI) is an implicant that cannot be enlarged — deleting any literal makes it cover a 0. An essential prime implicant (EPI) is a PI that covers at least one minterm no other PI covers. Every minimal SOP must contain all EPIs; after taking them, cover the remaining minterms with as few of the cheapest remaining PIs as possible.\n\n• Counting results worth memorizing: there are 2^(2^n) distinct Boolean functions of n variables (16 for n = 2, 256 for n = 3). The parity/XOR function of n variables has 2^(n-1) minterms, none of which are adjacent, so every one of its minterms is itself a prime implicant — XOR-like checkerboard patterns on a K-map do not simplify.\n\n• Functional completeness: a gate set is complete if it can build AND, OR and NOT. {NAND} and {NOR} are each complete alone. {AND, NOT} and {OR, NOT} are complete. {AND, OR} is not complete because no combination of ANDs and ORs can invert. {XOR, AND} with the constant 1 is complete (this is the algebraic normal form basis), but XOR by itself is not.\n\n• Don't-care conditions (d or X in Σ notation) may be counted as 1 or 0, whichever gives bigger groups. They can make a term essential-looking, but a minimal cover never needs to cover a don't-care.",
        strategy: "GATE attack pattern 1 — 'minimal SOP of Σm(...)': always draw the K-map, even for 3 variables. Mark 1s, circle the biggest possible groups, and check the wrap-around columns and the four corners before finalizing. A checkerboard pattern means the answer is an XOR/XNOR and will not reduce further.\n\nAttack pattern 2 — 'number of prime implicants / essential prime implicants': list every maximal group, not just the ones you would pick for a cover. PIs that you would never use in a minimal cover still count as PIs. Then test each minterm: if only one PI covers it, that PI is essential.\n\nAttack pattern 3 — algebraic simplification in options: rather than simplifying yourself, evaluate the given function and each option on 2-3 well chosen input rows; only the correct option survives all rows. This is often faster and safer under time pressure.\n\nTraps: dual is not complement; a group of don't-cares alone is never required; x + x'y = x + y (not x + y'); (A + B)' is A'B', never A' + B'.\n\nMini-example: f = AB + A'C + BC. The term BC is the consensus of AB and A'C, so f = AB + A'C — two terms, four literals, no K-map needed. If you see three terms where two 'overlap' through a shared variable and its complement, test consensus first."
      },
      questions: [
        {
          id: 'digital-boolean-q1',
          q: "Which of the following sets of logic primitives is functionally complete by itself, with no constant inputs available?",
          options: ["{AND, OR}", "{XOR}", "{NAND}", "{AND, XOR}"],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "A set is functionally complete if it can realize NOT, AND and OR. A single NAND gate gives NOT by tying its inputs together (NAND(x, x) = x'), and once you have NOT you get AND by inverting NAND, and OR via De Morgan: x + y = (x'·y')'. So {NAND} is complete. {AND, OR} fails because both gates are monotone: raising an input can never lower the output, so inversion is impossible. {XOR} alone produces only linear (parity-type) functions and cannot build AND. {AND, XOR} without the constant 1 cannot build NOT either, since every function built from them outputs 0 when all inputs are 0, so it preserves 0 and cannot be complete. Note that {AND, XOR, 1} would be complete because x XOR 1 = x'."
        },
        {
          id: 'digital-boolean-q2',
          q: "The Boolean expression X + XY simplifies to:",
          options: ["X", "Y", "X + Y", "XY"],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "This is the absorption law. Factor out X: X + XY = X(1 + Y). Since 1 + Y = 1 for any Y, the whole expression is X·1 = X. Intuitively, whenever X = 0 both terms are 0, and whenever X = 1 the first term already makes the output 1 regardless of Y, so Y contributes nothing. Option Y is wrong because setting X = 0, Y = 1 gives X + XY = 0 while Y = 1. Option X + Y is the result of the different identity X + X'Y = X + Y — note the complement on X in that law; confusing the two is a classic exam slip. Option XY fails at X = 1, Y = 0, where the original expression is 1 but XY is 0."
        },
        {
          id: 'digital-boolean-q3',
          q: "In a 4-variable K-map, a valid group of 8 adjacent 1-cells produces a product term containing how many literals?",
          options: ["0", "1", "2", "3"],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "A group of 2^k cells on an n-variable K-map eliminates k variables, because within the group those k variables take every combination of values while the remaining n - k variables stay fixed. Here n = 4 and the group size is 8 = 2^3, so k = 3 variables are eliminated and 4 - 3 = 1 literal remains. As a sanity check on the other options: a group of 16 (the whole map) leaves 0 literals and means f = 1; a group of 4 leaves 2 literals; a group of 2 leaves 3 literals; a single cell keeps all 4 literals as a full minterm. Remembering the rule 'literals left = n minus log2(group size)' answers this entire family of questions instantly."
        },
        {
          id: 'digital-boolean-q4',
          q: "The minimal sum-of-products form of f(A, B, C, D) = Σm(0, 1, 2, 3, 8, 9, 10, 11) is:",
          options: ["A'B'", "B'", "A' + B'", "B'D'"],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Write each minterm as ABCD: minterms 0-3 are 00CD with every value of C and D, and minterms 8-11 are 10CD with every value of C and D. In all eight cells, B = 0, while A, C and D each take both values somewhere in the set. On the K-map this is two full rows (A'B' row and AB' row) forming a single group of 8, which by the group-size rule leaves 4 - 3 = 1 literal: f = B'. Option A'B' covers only minterms 0-3 and misses 8-11. Option A' + B' is a two-term expression that wrongly includes minterms like 4 (0100), where A = 0 makes A' true but 4 is not in the ON-set. Option B'D' covers only the even minterms of the group and misses 1, 3, 9, 11."
        },
        {
          id: 'digital-boolean-q5',
          q: "For f(A, B, C) = Σm(0, 1, 2, 5, 7), the total number of prime implicants is:",
          options: ["2", "3", "4", "5"],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Plot the minterms 000, 001, 010, 101, 111 and find every maximal group. Adjacent pairs: minterms 0 and 1 give A'B' (00-); 0 and 2 give A'C' (0-0); 1 and 5 give B'C (-01); 5 and 7 give AC (1-1). No group of four exists because no four of these minterms form a rectangle — for example 0, 1, 5 would need minterm 4, which is absent. Each of the four pairs is maximal, so there are exactly 4 prime implicants. Note the distinction with the minimal cover: A'C' is essential (only PI covering minterm 2) and AC is essential (only PI covering minterm 7); minterm 1 can then be covered by either A'B' or B'C, so the minimal SOP has 3 terms but the PI count asked here is 4. Counting only the terms of one minimal cover (answer 3) is the standard trap."
        },
        {
          id: 'digital-boolean-q6',
          q: "Using the consensus theorem, the expression AB + A'C + BC reduces to:",
          options: ["AB + A'C", "AB + BC", "A'C + BC", "AB + A'C + BC (no reduction possible)"],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "The consensus theorem states xy + x'z + yz = xy + x'z: the third term yz is redundant whenever the first two terms contain a variable and its complement (x and x') and yz is built from the leftovers. Here x = A, y = B, z = C, so BC is the consensus term and can be dropped, giving AB + A'C. To verify, suppose BC = 1, i.e. B = C = 1. If A = 1 then AB = 1; if A = 0 then A'C = 1. Either way the output is already 1 without BC, so removing it changes nothing. Dropping AB or A'C instead is wrong: for A = 1, B = 1, C = 0 the function is 1 only because of AB, and for A = 0, B = 0, C = 1 only because of A'C. Those two terms are both essential."
        },
        {
          id: 'digital-boolean-q7',
          q: "The dual of the Boolean expression X·(Y + Z') is:",
          options: ["X + Y·Z'", "X' + Y'·Z", "X'·(Y' + Z)", "(X + Y)·Z'"],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "The dual of an expression is obtained by swapping every AND with OR and every OR with AND (and swapping constants 0 and 1), while leaving all literals exactly as they are — complements on variables are untouched. In X·(Y + Z'), the outer operation is AND and the inner is OR, so the dual is X + (Y·Z'), which is option A. Option B and option C complement the literals, which is what you would do for De Morgan complementation, not duality — the dual and the complement are different operations, and mixing them up is the intended trap. Option D rearranges which variables associate with which operator, which is simply not what duality does. Remember: dual changes operators, complement changes operators and literals."
        },
        {
          id: 'digital-boolean-q8',
          q: "How many distinct Boolean functions of exactly 2 input variables exist?",
          options: ["4", "8", "16", "256"],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "A Boolean function of n variables is fully specified by its truth table, which has 2^n rows. Each row can independently output 0 or 1, so the number of distinct functions is 2 raised to the number of rows, i.e. 2^(2^n). For n = 2 the truth table has 4 rows, giving 2^4 = 16 functions — these include AND, OR, XOR, NAND, NOR, XNOR, the two constants, the four functions that depend on one variable, and the two implication functions and their complements. Option 4 counts only the rows. Option 8 would be 2^3, which corresponds to nothing meaningful here. Option 256 is 2^(2^3), the count for three variables. The formula 2^(2^n) is asked directly and also hides inside questions about how many functions a decoder-plus-OR-gate or a multiplexer arrangement can realize."
        },
        {
          id: 'digital-boolean-q9',
          q: "The function f(w, x, y, z) = Σm(1, 3, 4, 6, 9, 11, 12, 14) is equivalent to:",
          options: ["x ⊕ z", "w ⊕ z", "x'z' + xz", "(x + z)'"],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Write the minterms in wxyz order: 0001, 0011, 1001, 1011 all have x = 0 and z = 1; and 0100, 0110, 1100, 1110 all have x = 1 and z = 0. The first group is exactly the set of all cells with x'z (w and y free), and the second is exactly xz'. So f = x'z + xz' = x ⊕ z. On a K-map this appears as two disjoint 4-cell groups in a diagonal-band pattern — a strong hint that an XOR is hiding in the function. Option w ⊕ z fails at minterm 1 (0001): w = 0, z = 1 gives w ⊕ z = 1, fine, but at minterm 4 (0100), w ⊕ z = 0 while f = 1. Option x'z' + xz is the XNOR of x and z, the exact complement of the answer. Option (x + z)' equals x'z', which covers minterms like 0 that are not in the ON-set."
        },
        {
          id: 'digital-boolean-q10',
          q: "The minimal sum-of-products expression for f(A, B, C, D) = Σm(0, 2, 5, 7, 8, 10, 13, 15) contains how many literals in total?",
          options: ["4", "6", "8", "16"],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Group the minterms by the values of B and D. Minterms 0 (0000), 2 (0010), 8 (1000), 10 (1010) all have B = 0, D = 0 with A and C taking every combination — that is the 4-cell group B'D'. Minterms 5 (0101), 7 (0111), 13 (1101), 15 (1111) all have B = 1, D = 1 — the group BD. So the minimal SOP is f = B'D' + BD (the XNOR of B and D), with 2 product terms and 2 + 2 = 4 literals. On the K-map, B'D' shows up as the four corner cells of the CD-columns arrangement plus wrap cells, so missing the wrap-around adjacency is the main risk. Option 8 corresponds to leaving the function as four 2-cell groups of 3 literals... which is not maximal grouping; option 16 corresponds to raw minterms with no simplification; option 6 has no valid grouping that produces it."
        },
        {
          id: 'digital-boolean-q11',
          q: "By De Morgan's law, the complement of (P + Q'R) is:",
          options: ["P'·(Q + R')", "P' + Q·R'", "P'·Q'·R", "(P' + Q)·R'"],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Apply De Morgan in two layers. The outermost operation is OR, so (P + Q'R)' = P'·(Q'R)'. Now complement the inner AND: (Q'R)' = (Q')' + R' = Q + R'. Putting it together gives P'·(Q + R'). The key mechanics: complement each operand, and swap OR with AND at every level; a double complement like (Q')' cancels back to Q. Option B swaps operators only at the inner level and not the outer. Option C forgets that complementing Q'R yields an OR of complements, not an AND. Option D applies the operator swap to the wrong grouping. A quick numeric check confirms the answer: at P = 0, Q = 1, R = 0, the original is 0 + 0 = 0, so its complement must be 1; option A gives 1·(1 + 1) = 1, while option C gives 1·0·0 = 0."
        },
        {
          id: 'digital-boolean-q12',
          q: "The expression A ⊕ (A ⊕ B) simplifies to:",
          options: ["A", "B", "A ⊕ B", "0"],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "XOR is associative and every element is its own inverse: x ⊕ x = 0 and x ⊕ 0 = x. Regroup: A ⊕ (A ⊕ B) = (A ⊕ A) ⊕ B = 0 ⊕ B = B. This self-cancelling property is why XOR works for parity, for swapping two variables without a temporary, and for simple stream ciphers — applying the same mask twice restores the original. Verify with a row: A = 1, B = 0 gives A ⊕ B = 1, then A ⊕ 1 = 0 = B, consistent. Option A fails on that same row. Option A ⊕ B fails at A = 1, B = 1: inner XOR is 0, outer is 1 ⊕ 0 = 1 = B, but A ⊕ B = 0. Option 0 fails whenever B = 1. In exam algebra, whenever the same variable appears twice in an XOR chain, cancel the pair immediately."
        },
        {
          id: 'digital-boolean-q13',
          q: "For f(A, B, C) = Σm(0, 1, 4, 5, 6, 7), the number of essential prime implicants is:",
          options: ["1", "2", "3", "4"],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Plot minterms 000, 001, 100, 101, 110, 111. Look for maximal groups: minterms 4, 5, 6, 7 all have A = 1, giving the 4-cell PI A. Minterms 0, 1, 4, 5 all have B = 0, giving the 4-cell PI B'. Every minterm is covered: 0 and 1 by B' only, 6 and 7 by A only, and 4, 5 by both. There are no other maximal groups (any pair inside these quads is not maximal, and no group of 8 exists since minterms 2, 3 are missing). So the PIs are A and B', and both are essential — B' uniquely covers 0 and 1, A uniquely covers 6 and 7. Hence f = A + B' and the EPI count is 2. Answer 1 undercounts by assuming overlap disqualifies one of them; overlap on some minterms is fine as long as each PI uniquely covers at least one minterm."
        },
        {
          id: 'digital-boolean-q14',
          q: "Which of the following gate sets is NOT functionally complete?",
          options: ["{NOR}", "{NOT, AND}", "{AND, OR}", "{NOT, OR}"],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "{AND, OR} cannot realize NOT: both gates are monotone increasing, meaning changing any input from 0 to 1 can only keep the output the same or raise it from 0 to 1. Any circuit built purely from monotone gates is itself monotone, but NOT is decreasing, so it is unreachable — hence {AND, OR} is incomplete. The other sets all work: {NOT, AND} builds OR via De Morgan (x + y = (x'y')'); {NOT, OR} builds AND the same way; and {NOR} alone is complete because NOR(x, x) = x' gives inversion, after which OR is the inversion of NOR and AND follows from De Morgan. The monotonicity argument is worth remembering as a general tool: any gate set consisting only of gates that preserve the input ordering can never be complete, no matter how many gates it contains."
        },
        {
          id: 'digital-boolean-q15',
          q: "Let f(A, B, C, D) = A ⊕ B ⊕ C ⊕ D. The number of prime implicants of f is:",
          options: ["1", "4", "8", "16"],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "The 4-variable XOR outputs 1 exactly when an odd number of inputs are 1. The number of 4-bit patterns with odd parity is half of 16, i.e. 8 minterms. Now consider adjacency: two K-map cells are adjacent when they differ in exactly one bit, and flipping one bit always flips the parity. So every neighbor of an odd-parity minterm has even parity and lies outside the ON-set — the K-map is a perfect checkerboard. No minterm can be grouped with any other, so no implicant larger than a single cell exists, which makes each of the 8 minterms its own maximal implicant. Therefore f has exactly 8 prime implicants, all of them essential, and the minimal SOP is just the canonical sum with 8 four-literal terms. In general, the n-variable parity function has 2^(n-1) prime implicants; XOR-heavy functions simply do not minimize."
        }
      ]
    },
    {
      id: 'digital-combinational',
      name: 'Combinational Circuits',
      theory: {
        intro: "Combinational circuits compute outputs purely from present inputs — no clock, no memory. This topic is the workhorse of GATE Digital Logic, worth 1-3 marks most years, and it is where Boolean algebra becomes hardware: adders, multiplexers, decoders, encoders, comparators and subtractors. GATE loves two question styles here. The first is analysis: you are shown a small circuit (often a mux or a couple of gates) and asked what function it computes. The second is synthesis with constraints: implement a given function using a specific block, or count the minimum number of components needed. Both styles reward knowing the standard building blocks cold — their equations, their delays, and the tricks for composing them into bigger structures. Ripple-carry versus carry-lookahead delay analysis and mux-based function realization are near-permanent fixtures of the paper, so drill those until they are mechanical.",
        core: "• Half adder: inputs A, B; Sum = A ⊕ B, Carry = AB. Half subtractor: Difference = A ⊕ B, Borrow = A'B.\n\n• Full adder: inputs A, B, Cin. Sum = A ⊕ B ⊕ Cin; Cout = AB + Cin(A ⊕ B) = AB + BCin + ACin (the majority function). A full adder can be built from two half adders plus one OR gate.\n\n• Full subtractor: Difference = A ⊕ B ⊕ Bin; Bout = A'B + Bin·(A ⊕ B)' = A'B + A'Bin + B·Bin. Subtraction in real hardware is done by adding the 2's complement: feed B through XOR gates driven by a control line and set the initial carry to that control line.\n\n• Ripple-carry adder: n full adders chained through the carry line. The carry may need to propagate through all n stages, so worst-case delay grows linearly with n. If each stage produces its carry-out some fixed delay after its carry-in arrives, the last carry appears after n such delays.\n\n• Carry-lookahead adder (CLA): define generate Gi = AiBi and propagate Pi = Ai ⊕ Bi. Then Ci+1 = Gi + PiCi, and expanding removes the ripple: C2 = G1 + P1G0 + P1P0C0, and so on. All carries come from two-level AND-OR logic on the P and G signals, so the delay is a small constant independent of width (until fan-in limits force block-level cascading). Sum bits are Si = Pi ⊕ Ci.\n\n• Multiplexer (mux): a 2^n-to-1 mux has n select lines and routes exactly one data input to the output. A mux is a universal logic element: an n-variable function fits on a 2^(n-1)-to-1 mux by using n-1 variables as selects and feeding each data input with 0, 1, the remaining variable, or its complement (the residue method). Building large muxes from small ones: an m-to-1 mux tree from 2-to-1 muxes needs m - 1 of them (e.g. 8-to-1 needs 7); a 16-to-1 from 4-to-1 muxes needs 4 + 1 = 5.\n\n• Demultiplexer: routes one input to one of 2^n outputs using n select lines; with the data input held at 1 it behaves as a decoder.\n\n• Decoder: an n-to-2^n decoder asserts exactly one output — the minterm line — for each input combination. Any function of n variables is a decoder plus an OR gate over the minterm outputs. Two n-to-2^n decoders with enable inputs build an (n+1)-to-2^(n+1) decoder: the extra input selects which decoder is enabled.\n\n• Encoder: the inverse of a decoder, 2^n inputs to n outputs. A priority encoder resolves multiple simultaneous inputs by outputting the index of the highest-priority (usually highest-numbered) active input, plus a valid flag.\n\n• Comparator: a 1-bit magnitude comparator produces three outputs: A > B is AB', A < B is A'B, A = B is XNOR(A, B). n-bit comparators cascade from the most significant bit down.\n\n• Gate-count classics: XOR from NAND gates needs a minimum of 4; XOR from NOR needs 5; XNOR is the reverse (5 NAND, 4 NOR). Parity circuits are XOR trees: the XOR of n bits is 1 exactly when an odd number of them are 1.\n\n• BCD adder: add two BCD digits with a 4-bit binary adder; if the raw sum exceeds 9 (or a carry out of bit 3 occurs), add the correction 0110 to convert back to a valid BCD digit and generate the decimal carry.",
        strategy: "Mux questions: when a function is given as Σm and implemented on a mux, group minterms by the select-line values. For each select combination, the pair (or set) of remaining minterm slots determines the data input: both present → 1, neither → 0, else the leftover variable or its complement. Always confirm which variable is the MSB of the select bundle — GATE frequently makes the 'obvious' answer wrong by reordering selects.\n\nDelay questions: for ripple adders, count only the carry chain — the final sum bit needs the last carry plus one more XOR. For CLA, remember P and G cost one level, all carries cost two more, and final sums one XOR after that. State your gate-delay assumptions and the arithmetic is 3-4 lines.\n\nComponent-count questions: mux trees need (big/small - 1) scaled per level — memorize 8:1 from 2:1 = 7, 16:1 from 4:1 = 5. Decoder expansion doubles per enable-controlled pair.\n\nTraps: a decoder's outputs are minterms of the input, not arbitrary functions; priority encoders ignore all lower-priority inputs, so extra active lines are red herrings; BCD correction is +6, not +10.\n\nMini-example: f(A, B, C) = Σm(1, 2, 6, 7) on a 4:1 mux with selects A, B. Group: AB = 00 covers m0, m1 → only m1 present → I0 = C. AB = 01 covers m2, m3 → only m2 → I1 = C'. AB = 10 → neither → I2 = 0. AB = 11 → both → I3 = 1. Done in under a minute."
      },
      questions: [
        {
          id: 'digital-combinational-q1',
          q: "For a full adder with inputs A, B and carry-in Cin, the correct pair of output expressions is:",
          options: ["Sum = A ⊕ B ⊕ Cin, Cout = AB + Cin(A ⊕ B)", "Sum = A ⊕ B ⊕ Cin, Cout = A + B + Cin", "Sum = AB ⊕ Cin, Cout = AB·Cin", "Sum = A + B + Cin, Cout = AB + BCin"],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "The sum bit of binary addition is the parity of the three inputs, hence Sum = A ⊕ B ⊕ Cin. The carry-out is 1 when at least two of the three inputs are 1 — the majority function — expressible as AB + BCin + ACin, or equivalently AB + Cin(A ⊕ B), since if exactly one of A, B is 1 the carry depends on Cin, and if both are 1 the carry is guaranteed. Option B uses OR for carry, which wrongly reports a carry when only one input is 1. Option C computes neither parity nor majority: for A = 1, B = 0, Cin = 0 it gives Sum = 0 though the true sum bit is 1. Option D uses OR for the sum, which cannot distinguish one active input (sum = 1) from two (sum = 0). Check any row, e.g. A = B = 1, Cin = 0: true outputs are Sum = 0, Cout = 1; only option A delivers both."
        },
        {
          id: 'digital-combinational-q2',
          q: "A multiplexer with 32 data inputs requires how many select lines?",
          options: ["4", "5", "16", "31"],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "A mux with 2^n data inputs needs n select lines, because the select bundle must be able to name every input uniquely, and n binary lines can encode 2^n distinct addresses. Here 32 = 2^5, so 5 select lines are needed. Option 4 would only address 16 inputs, leaving half the data lines unreachable. Option 16 confuses the select count with half the input count, and option 31 confuses it with the number of 2-to-1 muxes a 32-to-1 tree would contain (which is indeed 31, a separate classic result). The same logarithmic rule applies across the whole block family: a 1-to-32 demux needs 5 selects, a 5-to-32 decoder has 5 inputs, and a 32-to-5 encoder has 5 outputs. Whenever a GATE question mentions input count, take the base-2 log for the control lines."
        },
        {
          id: 'digital-combinational-q3',
          q: "The minimum number of 2-to-1 multiplexers required to construct an 8-to-1 multiplexer (using no other gates) is:",
          options: ["3", "4", "7", "8"],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Build a binary tree: the first level uses four 2-to-1 muxes to reduce 8 inputs to 4 candidates (all switched by select bit S0), the second level uses two muxes to reduce 4 to 2 (switched by S1), and the third level uses one mux to pick the final output (switched by S2). Total = 4 + 2 + 1 = 7. The general rule: building an m-to-1 mux from 2-to-1 muxes always takes exactly m - 1 of them, because each 2-to-1 mux eliminates exactly one candidate and you must eliminate m - 1 candidates to be left with one. Option 3 counts only the number of tree levels (which equals the number of select lines), option 4 counts only the first level, and option 8 wrongly assumes one mux per input. The m - 1 rule also generalizes: a tree of k-to-1 muxes needs (m - 1)/(k - 1) of them."
        },
        {
          id: 'digital-combinational-q4',
          q: "f(A, B, C) = Σm(1, 2, 6, 7) is implemented on a 4-to-1 mux with A as the MSB select and B as the LSB select. The required data inputs (I0, I1, I2, I3) are:",
          options: ["(C, C', 0, 1)", "(C', C, 1, 0)", "(C, C', 1, 0)", "(0, 1, C, C')"],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Each select combination AB owns two minterms, differing only in C. AB = 00 owns m0 (C = 0) and m1 (C = 1); only m1 is in the function, so I0 must be 1 exactly when C = 1, i.e. I0 = C. AB = 01 owns m2 and m3; only m2 (C = 0) is present, so I1 = C'. AB = 10 owns m4 and m5; neither is present, so I2 = 0. AB = 11 owns m6 and m7; both are present, so I3 = 1. That yields (C, C', 0, 1). Option B is what you would get if you mistakenly treated B as the MSB, which is exactly the trap this style of question sets. Options C and D scramble the constant assignments; a one-row check kills them, e.g. at A = 1, B = 0, C = 0, f should be 0 (m4 absent), but option C would output I2 = 1."
        },
        {
          id: 'digital-combinational-q5',
          q: "In a 4-bit ripple-carry adder, each full adder produces its carry-out 2 ns after its carry-in arrives (inputs A, B are available at time 0, and stage 0's carry-in is available at time 0). The final carry-out C4 is valid at:",
          options: ["2 ns", "4 ns", "8 ns", "16 ns"],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "The defining weakness of a ripple-carry adder is that stage i cannot finalize its carry-out until stage i-1 delivers its carry-in, so the carry delays add up linearly along the chain. C1 is ready at 2 ns, C2 at 4 ns, C3 at 6 ns, and C4 at 8 ns — four sequential 2 ns hops. Option 2 ns is the single-stage delay and would only apply if all carries were computed in parallel, which is what a carry-lookahead adder achieves, not a ripple adder. Option 4 ns would be a 2-stage chain. Option 16 ns doubles the correct count, e.g. by wrongly charging each stage twice. A related follow-up GATE likes: the last sum bit S3 needs C3 plus one more XOR delay, so if the XOR also costs 2 ns the complete result settles at 6 + 2 = 8 ns as well. For an n-bit adder the pattern is n stage-delays for the final carry."
        },
        {
          id: 'digital-combinational-q6',
          q: "The minimum number of 3-to-8 decoders (each with an active-high enable input) required to build a 4-to-16 decoder is:",
          options: ["1", "2", "4", "8"],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Use the most significant input bit A3 to choose between two 3-to-8 decoders: feed the lower three bits A2A1A0 to both decoders, connect A3 through an inverter (or use one active-low enable) so that the first decoder is enabled when A3 = 0 and produces outputs 0-7, while the second is enabled when A3 = 1 and produces outputs 8-15. Exactly one of the 16 output lines is active for each 4-bit input, which is the required behavior, so 2 decoders suffice. One decoder (option A) can only distinguish 8 combinations. Options 4 and 8 overprovision: the general rule is that each added address bit doubles the decoder count, so a 5-to-32 would need 4 such devices plus enable steering (often via a small extra decoder). This enable-based tree construction is the standard expansion technique GATE expects."
        },
        {
          id: 'digital-combinational-q7',
          q: "A 1-to-8 demultiplexer distributes its single data input to one of its outputs. How many select lines does it have, and what does it become if the data input is permanently tied to logic 1?",
          options: ["3 select lines; it becomes a 3-to-8 decoder", "8 select lines; it becomes an 8-to-3 encoder", "3 select lines; it becomes an 8-to-1 multiplexer", "4 select lines; it becomes a 3-to-8 decoder"],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Eight outputs require log2(8) = 3 select lines to address. With data fixed at 1, the selected output carries a constant 1 and every other output stays 0 — which is exactly the behavior of a 3-to-8 decoder: assert the one output line whose index matches the 3-bit input. This identity (demux with data = 1 equals decoder; decoder with enable used as data equals demux) is a standard equivalence worth internalizing. Option B inverts the roles: an encoder compresses many inputs to few outputs, the opposite direction of data flow. Option C is wrong because a mux merges many inputs into one output, again the reverse structure; a demux cannot become a mux by tying inputs. Option D miscounts the select lines — 4 lines would address 16 outputs, not 8."
        },
        {
          id: 'digital-combinational-q8',
          q: "A 4-bit magnitude comparator comparing unsigned numbers A and B produces which set of primary outputs?",
          options: ["Only A = B", "A > B and A < B only", "A > B, A = B, and A < B", "A ≥ B and A ≤ B only"],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "A magnitude comparator classifies the pair (A, B) into exactly one of three mutually exclusive cases, so the standard device (like the classic 7485) provides three outputs: A > B, A = B, and A < B; exactly one is high at any time. Internally, equality is the AND of bitwise XNORs, and A > B is decided at the most significant bit position where the operands differ: A > B = Σ over bits i of (Ai·Bi'·all higher bits equal). Option A alone would make an equality checker, not a magnitude comparator. Option B loses the ability to signal equality directly — you could infer it as NOR of the other two, but the standard block still provides it, and cascading between 4-bit slices actually requires the equality signal to pass comparison authority to lower slices. Option D describes derived signals, not the primary trio."
        },
        {
          id: 'digital-combinational-q9',
          q: "The minimum number of 2-input NAND gates required to realize a 2-input XOR function is:",
          options: ["3", "4", "5", "6"],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "The classic 4-gate construction: let N1 = NAND(A, B). Then N2 = NAND(A, N1) = (A·(AB)')' and N3 = NAND(B, N1). Finally XOR = NAND(N2, N3). Expanding: N2' = A·B', wait — more precisely N2 = (A(AB)')' and N3 = (B(AB)')', and NAND-ing them gives A ⊕ B; a truth-table check on all four rows confirms it. Four is provably minimal for 2-input NANDs; no 3-gate NAND network covers all four rows of XOR correctly. The companion facts: XNOR needs 5 NAND gates (the 4-gate XOR plus an inverter), while with NOR gates the counts flip — XNOR takes 4 NORs and XOR takes 5. GATE has asked every permutation of these four numbers, so memorize the pairing rule: the function that is 'natural' to the gate family (XOR for NAND, XNOR for NOR) costs 4, and its complement costs one more."
        },
        {
          id: 'digital-combinational-q10',
          q: "An 8-to-3 priority encoder gives the highest-numbered active input priority. If inputs D5 and D2 are both high and all others low, the binary output is:",
          options: ["010", "101", "111", "011"],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "A plain encoder assumes exactly one input is active and would produce garbage (typically the OR of the codes) if two lines fired at once. A priority encoder removes this ambiguity by ranking inputs: with highest-number priority, any active input masks all lower-numbered ones. Here D5 outranks D2, so the encoder reports index 5 = 101 and completely ignores D2 — the lower request simply waits. Option 010 is what you would get if priority ran the other way (lowest index wins), a convention the question explicitly rules out. Option 111 would require D7 active, and option 011 (3) does not correspond to any active line; 111 is also the trap of OR-ing the two codes (101 OR 010 = 111), which is exactly the plain-encoder failure mode that priority logic exists to prevent. Real designs add a valid output V to distinguish 'D0 active' from 'nothing active', both of which would otherwise read 000."
        },
        {
          id: 'digital-combinational-q11',
          q: "In a 4-bit carry-lookahead adder, every gate (AND, OR, XOR) has a delay of 1 unit, P and G signals are computed directly from the operands, carries use two-level AND-OR logic on P, G and C0, and sum bits are Si = Pi ⊕ Ci. After the operands and C0 arrive, the last sum bit is valid after:",
          options: ["2 units", "3 units", "4 units", "8 units"],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Trace the critical path. Level 1: Gi = AiBi and Pi = Ai ⊕ Bi are each one gate from the inputs, ready at t = 1. Level 2-3: every carry Ci is a two-level AND-OR expression over the P, G signals and C0 (e.g. C3 = G2 + P2G1 + P2P1G0 + P2P1P0C0), so all carries — including the highest one needed by the last sum — are ready at t = 1 + 2 = 3. Level 4: Si = Pi ⊕ Ci adds one XOR, giving t = 4. The whole point of lookahead is visible here: the answer is a constant 4, independent of operand width, whereas a 4-bit ripple adder's last sum would need the carry to hop through every stage. Option 2 forgets the P/G generation and the final XOR; option 3 gives the carry-ready time, not the sum; option 8 is ripple-style thinking. In wider adders, fan-in limits force block-level lookahead, adding a few more constant levels, but never linear growth."
        },
        {
          id: 'digital-combinational-q12',
          q: "A 3-input XOR gate outputs logic 1 exactly when:",
          options: ["All three inputs are 1", "An odd number of inputs are 1", "Exactly one input is 1", "At least one input is 1"],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "Multi-input XOR is defined as a cascade of 2-input XORs, and since each XOR adds inputs modulo 2, the n-input XOR computes the parity: output = 1 iff an odd count of inputs are 1. For three inputs that means the rows 001, 010, 100 (one input high) and 111 (three high). Option C (exactly one) misses the 111 row — this is the single most common misconception about XOR, caused by over-generalizing the 2-input case where 'odd' and 'exactly one' happen to coincide. Option A describes AND, and option D describes OR. This parity behavior is why XOR trees implement parity generators and checkers: an even-parity transmitter appends P = a ⊕ b ⊕ c so the total count of 1s is even, and the receiver XORs everything including P — a result of 1 flags a single-bit error."
        },
        {
          id: 'digital-combinational-q13',
          q: "For a half subtractor computing A - B, the Borrow output is:",
          options: ["A·B'", "A' + B", "A'·B", "A ⊕ B"],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "A borrow is needed exactly when the subtraction cannot proceed in place, i.e. when A = 0 and B = 1 (computing 0 - 1). That single row gives Borrow = A'·B. Check all four rows: 0-0 = 0 no borrow; 0-1 needs a borrow (result bit 1, borrow 1); 1-0 = 1 no borrow; 1-1 = 0 no borrow. Only A'B matches. Option A·B' is the reverse — it flags 1 - 0, which is a perfectly fine subtraction; mixing up which operand 'runs short' is the standard error, so anchor it as 'borrow when the minuend A is smaller'. Option A ⊕ B is the Difference output, not the borrow. Option A' + B is true in three rows including 1-1 and 0-0, which clearly need no borrow. For the full subtractor, this extends to Bout = A'B + Bin·(A ⊕ B)': borrow if A < B outright, or if they are equal and the incoming stage already borrowed."
        },
        {
          id: 'digital-combinational-q14',
          q: "In a BCD adder, two decimal digits are added with a 4-bit binary adder. When the raw 4-bit result exceeds 1001 (or a carry out of the adder occurs), the correction applied is:",
          options: ["Add 0011", "Add 0110", "Subtract 0110", "Add 1010"],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "BCD uses only codes 0000-1001, so the six patterns 1010-1111 are invalid. A 4-bit binary adder counts through all 16 patterns before wrapping, but decimal arithmetic must wrap after 10. The mismatch is 16 - 10 = 6, so whenever the raw sum leaves the valid decimal range — detected as raw sum > 9 or a binary carry-out — adding 0110 (6) skips the six illegal codes and simultaneously pushes out the correct decimal carry. Example: 7 + 6 = 13; binary adder gives 1101 (invalid); adding 0110 yields 1 0011, i.e. decimal carry 1 and digit 3, which is exactly 13 in BCD. Option A (add 3) is the pre-correction used in the shift-and-add-3 (double dabble) conversion algorithm, a different context. Subtracting 6 would be used when interpreting an already-corrected value backwards, and adding 1010 has no arithmetic justification. Remember the detection condition includes the carry-out case, e.g. 9 + 8."
        },
        {
          id: 'digital-combinational-q15',
          q: "f(A, B, C, D) = Σm(0, 1, 3, 4, 8, 9, 15) is implemented on an 8-to-1 mux with selects A, B, C (A is MSB) and residues in D. The data input I2 (selected when ABC = 010) must be connected to:",
          options: ["0", "1", "D", "D'"],
          answer: 3,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Select combination ABC = 010 owns the two minterms with A = 0, B = 1, C = 0: minterm 4 (0100, D = 0) and minterm 5 (0101, D = 1). The function includes m4 but not m5, so I2 must equal 1 when D = 0 and 0 when D = 1 — that is I2 = D'. For completeness, the full residue table: ABC = 000 owns m0, m1, both present → I0 = 1; 001 owns m2, m3, only m3 → I1 = D; 011 owns m6, m7, neither → I3 = 0; 100 owns m8, m9, both → I4 = 1; 101 and 110 own m10-m13, none present → I5 = I6 = 0; 111 owns m14, m15, only m15 → I7 = D. Choosing D instead of D' (option C) is the classic sign error — always check which minterm of the owned pair has D = 1. Options 0 and 1 would respectively drop m4 or wrongly add m5."
        },
        {
          id: 'digital-combinational-q16',
          q: "The minimum number of 4-to-1 multiplexers (and no other logic) needed to build a 16-to-1 multiplexer is:",
          options: ["3", "4", "5", "8"],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Two-level tree: the first level uses four 4-to-1 muxes, each handling 4 of the 16 data inputs and all driven by the low select pair S1S0; this narrows 16 candidates to 4. The second level is a single 4-to-1 mux driven by the high select pair S3S2, choosing among the four first-level outputs. Total = 4 + 1 = 5. The general formula for building an m-to-1 mux from k-to-1 muxes is (m - 1)/(k - 1), here (16 - 1)/(4 - 1) = 5, which works because every k-to-1 mux eliminates k - 1 candidates and m - 1 candidates must be eliminated in total. Option 4 counts only the first level and leaves four unresolved outputs. Option 3 has no valid construction. Option 8 overbuilds. Also note the select accounting: 16-to-1 needs 4 select bits, and the tree consumes exactly 2 bits per level across its 2 levels — if the select bits do not add up, the proposed structure is wrong."
        }
      ]
    },
    {
      id: 'digital-sequential',
      name: 'Sequential Circuits',
      theory: {
        intro: "Sequential circuits add memory to logic: the output depends on the present inputs and on stored state. This is the highest-yield Digital Logic area in GATE, typically 2-3 marks, because it supports rich numerical questions — counter modulus, maximum clock frequency, state sequences, and flip-flop excitation. The cast of characters is small: latches and flip-flops (SR, D, JK, T), registers, shift registers, counters (ripple, synchronous, ring, Johnson) and finite state machines. GATE questions almost always reduce to simulating a few clock cycles carefully or applying one timing inequality. The skill being tested is disciplined bookkeeping: write the state table, apply the characteristic equations, and advance one edge at a time. Students lose marks here not from missing theory but from rushing the simulation. Setup/hold timing questions have become a fixture and connect this topic to computer organization's pipeline timing questions.",
        core: "• Latch vs flip-flop: a latch is level-sensitive — while its enable is active, the output follows the input continuously. A flip-flop is edge-triggered — it samples its input only at a clock edge and holds the value otherwise. Edge triggering is what makes reliable synchronous design possible.\n\n• SR latch (NOR-based): S = 1, R = 0 sets Q = 1; S = 0, R = 1 resets; S = R = 0 holds; S = R = 1 is invalid/forbidden because both outputs are forced to 0 and releasing both inputs simultaneously causes a race. (For a NAND-based latch the roles invert: 0 is the active level and S = R = 0 is forbidden.)\n\n• Characteristic equations: D flip-flop: Q+ = D. T flip-flop: Q+ = T ⊕ Q (toggle when T = 1). JK flip-flop: Q+ = JQ' + K'Q; J = K = 0 holds, J = 1, K = 0 sets, J = 0, K = 1 resets, J = K = 1 toggles. JK removes the SR forbidden state by converting it into toggle.\n\n• Excitation tables (what inputs cause a given transition): for JK — 0→0 needs J = 0, K = X; 0→1 needs J = 1, K = X; 1→0 needs J = X, K = 1; 1→1 needs J = X, K = 0. For T: T = 1 exactly when the state changes. For D: D equals the next state. Excitation tables are the core tool for designing counters with a specified sequence.\n\n• Frequency division: a single T flip-flop with T = 1 (or D flip-flop with D = Q') divides the clock frequency by 2 and outputs a square wave. A chain of n such stages divides by 2^n.\n\n• Ripple (asynchronous) counters: each flip-flop is clocked by the previous flip-flop's output, so transitions ripple stage by stage. n flip-flops give a mod-2^n count. The settling time is n times the per-flip-flop propagation delay, so the maximum clock frequency is 1/(n·tpd) (plus decoding time if outputs feed a decoder). Ripple counters also produce transient glitch states while rippling.\n\n• Synchronous counters: all flip-flops share the clock; the next state is computed by combinational logic. A binary up-counter with T flip-flops uses T0 = 1, T1 = Q0, T2 = Q1Q0, ... Ti = AND of all lower bits. Maximum frequency depends on one flip-flop delay plus the combinational logic delay plus setup, not on the number of stages rippling.\n\n• Modulus: a counter with n flip-flops has at most 2^n states, so a mod-M counter needs ceil(log2 M) flip-flops — mod-10 needs 4. Cascading a mod-M and a mod-N counter yields mod-(M·N).\n\n• Ring and Johnson counters: a ring counter circulates a single 1 through n flip-flops → n states, self-decoded (one flip-flop per state). A Johnson (twisted-ring) counter feeds back the complement of the last stage → 2n states with glitch-free decoding using 2-input gates.\n\n• Shift registers: SISO, SIPO, PISO, PIPO. An n-bit SISO register delays a serial bit stream by n clock cycles. Universal shift registers add mode controls for left/right/parallel-load.\n\n• Timing: data at a flip-flop's D input must be stable for the setup time tsu before the clock edge and for the hold time th after it. In a pipeline stage, the clock period must satisfy T ≥ tclk-to-q + tcomb(max) + tsu, giving fmax = 1/(tcq + tcomb + tsu). Hold checks use the fastest path: tcq + tcomb(min) ≥ th; hold violations cannot be fixed by slowing the clock.\n\n• FSMs: Moore outputs depend on state only; Mealy outputs depend on state and input, often needing fewer states and responding one cycle earlier. A sequence detector for a pattern of length L needs at most L + 1 states (Moore) or L states (Mealy), fewer if the pattern's structure allows overlap reuse.",
        strategy: "Counter-sequence questions: never guess — build a table with columns for current state, each flip-flop input (from the given wiring), and next state (from the characteristic equations). Advance until the sequence repeats; the period is the modulus. Watch for lock-out: unused states may form a separate cycle.\n\nMax-frequency questions: identify whether the counter is ripple (delays add up: T ≥ n·tpd + tdecode) or synchronous (one flip-flop delay plus logic plus setup). For register-to-register paths the template is fmax = 1/(tcq + tcomb + tsu); hold time never appears in the fmax formula — putting it there is the planted error in many option sets.\n\nExcitation questions: memorize the JK table cold; half the counter-design questions are just repeated lookups of it. The X (don't-care) entries are what make JK counters cheaper than D counters.\n\nDivide-by questions: cascaded flip-flops multiply division ratios; a mod-M then mod-N cascade divides frequency by M·N. Johnson counters give 2n states, ring counters n — do not mix these up.\n\nTraps: J = K = 1 is toggle, not invalid (that is SR); a latch passes input changes while enabled, so mid-level glitches propagate; hold violations are clock-speed independent.\n\nMini-example: 3 T flip-flops, all T = 1, clocked as a ripple chain from a 1 MHz clock — the last output is a 125 kHz square wave, since each stage halves the frequency: 1 MHz → 500 kHz → 250 kHz → 125 kHz."
      },
      questions: [
        {
          id: 'digital-sequential-q1',
          q: "For a NOR-gate based SR latch, the input combination that must be avoided is:",
          options: ["S = 0, R = 0", "S = 0, R = 1", "S = 1, R = 0", "S = 1, R = 1"],
          answer: 3,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "In the NOR latch, a 1 on any NOR input forces that gate's output to 0. With S = R = 1, both gate outputs are driven to 0 simultaneously, so Q and Q' are both 0 — violating the invariant that they be complements. Worse, when S and R then return to 0 together, both gates try to respond at once and the final state depends on which gate happens to be faster: a race condition with an unpredictable outcome. That is why S = R = 1 is called the forbidden or invalid input. The other combinations are all well-defined: 00 holds the current state, 01 resets Q to 0, and 10 sets Q to 1. Note the dual for a NAND-based latch: there the active level is 0, so S = R = 0 is the forbidden combination — GATE has tested this inversion, so always check which gate type is specified."
        },
        {
          id: 'digital-sequential-q2',
          q: "A JK flip-flop has J = K = 1 permanently. On every active clock edge, the output:",
          options: ["Holds its previous value", "Toggles", "Becomes 1", "Becomes indeterminate"],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "The JK characteristic equation is Q+ = JQ' + K'Q. Substituting J = K = 1 gives Q+ = Q' — the flip-flop complements its state on every active edge, i.e. it toggles, behaving exactly like a T flip-flop with T = 1. This is precisely the design intent of JK: it takes the SR latch's forbidden 11 input and assigns it the useful toggle behavior instead. Option D (indeterminate) is the trap answer imported from SR thinking — in an edge-triggered or master-slave JK there is no race, because feedback from Q and Q' gates the inputs so only one of set/reset is internally active at a time. Option A describes J = K = 0 (hold), and option C describes J = 1, K = 0 (set). A JK toggling at clock frequency f produces a square wave at f/2, which is why this configuration is the basic frequency divider."
        },
        {
          id: 'digital-sequential-q3',
          q: "The characteristic equation of a D flip-flop is:",
          options: ["Q+ = D", "Q+ = D ⊕ Q", "Q+ = DQ' + D'Q", "Q+ = D + Q"],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "A D (data/delay) flip-flop simply transfers the value present at its D input to the output at the active clock edge, regardless of the current state: Q+ = D. It is called a delay flip-flop because the output is the input delayed by one clock period. Option B, Q+ = D ⊕ Q, is the characteristic equation of a T flip-flop with T renamed — it toggles when the input is 1, which is different behavior (equal to D only when Q = 0). Option C is actually the same XOR written in SOP form, wrong for the same reason. Option D, Q+ = D + Q, would mean the flip-flop can be set but never cleared once Q = 1, which is not any standard flip-flop. Because next state equals input, designing counters with D flip-flops is conceptually simplest (Di = next state bit), though it typically needs more combinational logic than JK designs, which exploit don't-cares."
        },
        {
          id: 'digital-sequential-q4',
          q: "The minimum number of flip-flops required to build a mod-10 (decade) counter is:",
          options: ["3", "4", "5", "10"],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "A counter with n flip-flops has 2^n possible states, and a mod-10 counter must cycle through 10 distinct states. We need the smallest n with 2^n ≥ 10: 2^3 = 8 is insufficient, while 2^4 = 16 works, so n = 4 — in general, n = ceil(log2 M) for a mod-M counter. The decade counter uses 10 of its 16 states (typically 0000 through 1001) and skips the remaining 6, either by asynchronous reset when 1010 is detected or by synchronous next-state logic that never enters them. Option 3 gives only 8 states, one short of... actually two short of the 10 needed. Option 5 works but wastes a flip-flop, and the question asks for the minimum. Option 10 confuses the binary-counter requirement with a ring counter, which does use one flip-flop per state — a mod-10 ring counter would indeed need 10 flip-flops, but that is not the minimum-hardware binary approach."
        },
        {
          id: 'digital-sequential-q5',
          q: "The essential difference between a latch and a flip-flop is:",
          options: ["A latch stores multiple bits, a flip-flop stores one", "A latch is level-sensitive while a flip-flop is edge-triggered", "A latch needs a clock, a flip-flop does not", "A flip-flop is built only from NOR gates, a latch only from NAND gates"],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "A latch is transparent while its enable/clock level is active: any change on the data input during that entire level passes straight through to the output. A flip-flop samples its input only at a clock transition (rising or falling edge) and ignores the input at all other times. This single distinction has large consequences: edge triggering decouples input changes from output changes within a cycle, preventing race-through when storage elements are connected in chains (as in shift registers and pipelines), which is why synchronous design standardizes on flip-flops. Option A is wrong — both are 1-bit storage elements; multi-bit storage is a register. Option C is backwards-ish: basic SR latches need no clock at all, and flip-flops always do. Option D is false because both structures can be built in either gate family. Internally, a common edge-triggered flip-flop is two latches in master-slave arrangement driven by opposite clock levels."
        },
        {
          id: 'digital-sequential-q6',
          q: "A T flip-flop with T tied to 1 is driven by a 16 MHz clock. The frequency of the square wave at Q is:",
          options: ["16 MHz", "8 MHz", "4 MHz", "32 MHz"],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "With T = 1 the flip-flop toggles at every active clock edge. A full period of the output waveform requires two toggles — one to go high, one to return low — so the output completes one cycle for every two clock cycles: fout = fclk/2 = 8 MHz. Moreover the output is an exact 50% duty-cycle square wave regardless of the input clock's duty cycle, since the toggle instants are equally spaced by whole clock periods; this cleanup property is itself a GATE talking point. Option A assumes the output follows the clock, which describes a buffer, not a toggle. Option C is division by 4, which would need two cascaded toggle stages. Option 32 MHz would require responding to both edges, which a single-edge-triggered flip-flop does not do. Cascading n toggle stages divides by 2^n — e.g. four stages turn 16 MHz into 1 MHz."
        },
        {
          id: 'digital-sequential-q7',
          q: "A 4-bit ripple counter uses flip-flops each having propagation delay 10 ns. Ignoring decoding logic, the maximum clock frequency at which the counter operates reliably is:",
          options: ["100 MHz", "50 MHz", "25 MHz", "10 MHz"],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "In a ripple counter, flip-flop i is clocked by the output of flip-flop i-1, so in the worst case (e.g. the transition 0111 → 1000, or 1111 → 0000) a change must ripple through every stage sequentially. With 4 stages at 10 ns each, the outputs are not all settled until 4 × 10 = 40 ns after the input clock edge. The next clock edge must not arrive before settling, so Tmin = 40 ns and fmax = 1/40 ns = 25 MHz. Option 100 MHz uses only one flip-flop delay — that is the synchronous counter answer, where all flip-flops are clocked together and delays do not accumulate (its fmax would be set by one tpd plus logic plus setup). Option 50 MHz assumes only two stages ripple, and 10 MHz assumes ten. The exam variant adds a decoder needing, say, 20 ns: then T = 40 + 20 = 60 ns and fmax ≈ 16.67 MHz — read carefully whether decoding time is included."
        },
        {
          id: 'digital-sequential-q8',
          q: "A Johnson counter built from 4 flip-flops cycles through how many distinct states?",
          options: ["4", "8", "16", "15"],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "A Johnson (twisted-ring) counter is a shift register whose complemented last output is fed back to the first input. Starting from 0000: 1000, 1100, 1110, 1111, then the complement feedback starts shifting in 0s: 0111, 0011, 0001, back to 0000 — a cycle of 2n = 8 states for n = 4 flip-flops. Contrast with a plain ring counter (uncomplemented feedback), which circulates a single 1 and has only n = 4 states — option A is the ring-counter answer. Option 16 is the full binary state space 2^n, which a Johnson counter never uses completely; the 8 unused states form separate cycles, so practical designs add self-correcting logic. Johnson counters are valued because each state can be decoded glitch-free with a single 2-input gate, and consecutive states differ in exactly one bit. Remember the pair: ring = n states, Johnson = 2n states, binary counter = 2^n states."
        },
        {
          id: 'digital-sequential-q9',
          q: "Using the JK excitation table, the input values required to force a flip-flop transition from Q = 1 to Q = 0 are:",
          options: ["J = 0, K = 0", "J = X, K = 1", "J = 1, K = X", "J = 1, K = 1 only"],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: "For the transition 1 → 0, check which (J, K) pairs achieve it via Q+ = JQ' + K'Q with Q = 1: Q+ = K' (the J term vanishes since Q' = 0). We need Q+ = 0, so K must be 1, while J can be anything — J = 0, K = 1 resets, and J = 1, K = 1 toggles from 1 to 0; both work. Hence the excitation entry is J = X, K = 1. This don't-care is exactly why JK counters need less combinational logic than D-based designs: every row of the JK excitation table contains an X, doubling the K-map don't-cares. Option D is incomplete — toggle works but is not required, and writing it without the X forfeits minimization opportunities. Option A holds the state at 1. Option C guarantees Q+ = Q' + ... = 1 when K = 0 is chosen, i.e. it cannot ensure a reset. The full table: 0→0: (0,X); 0→1: (1,X); 1→0: (X,1); 1→1: (X,0)."
        },
        {
          id: 'digital-sequential-q10',
          q: "A serial bit stream enters a 4-bit serial-in serial-out shift register. The first input bit appears at the serial output after:",
          options: ["1 clock pulse", "2 clock pulses", "4 clock pulses", "8 clock pulses"],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Each clock pulse moves every stored bit one stage to the right and admits one new bit at the input end. A bit entering stage 1 reaches stage 2 after the second pulse, stage 3 after the third, and appears at the output of stage 4 after the fourth pulse — so an n-bit SISO register imposes a delay of exactly n clock periods on the stream. This is why SISO registers are used as digital delay lines: the delay is n/fclk seconds and can be tuned by changing either n or the clock. Option A describes a single flip-flop. Option 8 would be a 4-bit register clocked on both edges or an 8-bit register. A related distinction GATE probes: converting serial data to parallel (SIPO) also needs n clocks to fill, but parallel-load-then-shift-out (PISO) needs 1 load pulse plus n-1 shifts to emit all bits. Keep the load/shift accounting separate for each register type."
        },
        {
          id: 'digital-sequential-q11',
          q: "A mod-5 counter is cascaded with a mod-4 counter, with the mod-5 stage's terminal/overflow output clocking the mod-4 stage. The overall system is a:",
          options: ["mod-9 counter", "mod-20 counter", "mod-5 counter", "mod-1024 counter"],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Cascaded counters multiply their moduli. The mod-5 stage emits one pulse to the next stage for every 5 input clocks, and the mod-4 stage returns to its initial state after receiving 4 such pulses. The combined system therefore revisits its overall initial state only after 5 × 4 = 20 input clocks, making it a mod-20 counter — equivalently a divide-by-20 frequency divider. Option A adds the moduli, which is the standard error; addition would apply if the counters somehow took turns counting the same clock, which is not how cascading works. Option C ignores the second stage entirely. Option D computes 4^5, a meaningless combination here. This multiplication principle is how arbitrary moduli are assembled from small standard chips — e.g. a divide-by-100 from two decade counters — and it also runs in reverse on exams: to get mod-N, factor N into available stage sizes."
        },
        {
          id: 'digital-sequential-q12',
          q: "The hold time of a flip-flop is best defined as the minimum time:",
          options: ["The data input must be stable before the active clock edge", "The data input must remain stable after the active clock edge", "Between two successive active clock edges", "From the clock edge until the output changes"],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "Hold time (th) is the interval after the sampling clock edge during which the data input must not change, so the internal sampling circuitry can finish capturing the value cleanly; changing D too soon after the edge can corrupt the captured bit or induce metastability. Option A defines setup time (tsu) — the mirror-image requirement before the edge; the pair (tsu, th) together bracket a stability window around the edge. Option C describes the minimum clock period, which is a derived system-level constraint, and option D defines the clock-to-Q propagation delay (tcq), a property of the output, not the input. A crucial exam-level consequence: hold violations arise from paths that are too fast (new data racing through short combinational paths and overwriting the input before th expires), so they are independent of clock frequency and cannot be fixed by slowing the clock — only by adding delay to the offending path. Setup violations, in contrast, are fixed by lowering frequency."
        },
        {
          id: 'digital-sequential-q13',
          q: "A 3-bit synchronous binary up-counter (Q2 Q1 Q0) is designed with T flip-flops. The correct input equations are:",
          options: ["T0 = 1, T1 = Q0, T2 = Q1·Q0", "T0 = 1, T1 = 1, T2 = 1", "T0 = Q1·Q2, T1 = Q2, T2 = 1", "T0 = 1, T1 = Q0', T2 = Q1' + Q0'"],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "In binary counting, bit i toggles exactly when all lower-order bits are 1 (a carry propagates into it): the LSB toggles every count, bit 1 toggles when Q0 = 1, and bit 2 toggles when Q1 = Q0 = 1. Since a T flip-flop toggles when T = 1, the equations are T0 = 1, T1 = Q0, T2 = Q1·Q0. Verify one step: at state 011, T0 = 1, T1 = 1, T2 = 1, so all bits flip → 100, correct. At 001: T0 = 1, T1 = 1, T2 = 0 → 010, correct. Option B toggles every bit each clock, producing the sequence 000, 111, 000, ... — a mod-2 pattern, not counting. Option C is the pattern reversed and would not count up. Option D toggles upper bits when lower bits are 0, which describes nothing coherent — check state 000: it would go to 111, i.e. counting down; in fact T1 = Q0', T2 = (Q1Q0)' is the down-counter, a nice contrast to remember."
        },
        {
          id: 'digital-sequential-q14',
          q: "A Mealy machine detects the pattern 101 (overlapping occurrences allowed) in a serial bit stream. The minimum number of states required is:",
          options: ["2", "3", "4", "5"],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "The states track how much of the pattern has been matched so far: S0 (no useful prefix), S1 (seen 1), S2 (seen 10). From S2 on input 1, the machine outputs 1 (pattern complete) and — because the final 1 can start a new overlapping match — transitions back to S1 rather than S0. All other transitions: S0 on 1 → S1, on 0 → S0; S1 on 0 → S2, on 1 → S1; S2 on 0 → S0. Three states suffice, and fewer is impossible since the three prefix-progress situations demand different future behavior. In a Mealy machine the output rides on the transition, so no separate accepting state is needed; a Moore machine, whose output attaches to states, needs an extra output state, giving 4 — option C is thus the Moore answer, a deliberate distractor. The general rule: detecting a length-L pattern needs L states (Mealy) or L + 1 (Moore) at most, sometimes fewer via prefix structure."
        },
        {
          id: 'digital-sequential-q15',
          q: "In a synchronous system, data passes from flip-flop FF1 through combinational logic to flip-flop FF2. Given clock-to-Q delay 2 ns, worst-case combinational delay 6 ns, and setup time 2 ns (hold time 1 ns), the maximum reliable clock frequency is:",
          options: ["100 MHz", "125 MHz", "90.9 MHz", "166.7 MHz"],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "In each cycle, data launched by FF1 at the clock edge becomes valid at its output after tcq = 2 ns, then propagates through logic for up to tcomb = 6 ns, and must arrive at FF2 at least tsu = 2 ns before the next edge. So the period must satisfy T ≥ tcq + tcomb + tsu = 2 + 6 + 2 = 10 ns, giving fmax = 1/10 ns = 100 MHz. The hold time is deliberately included as a distractor: hold is checked against the fastest (contamination) path — requiring tcq + tcomb(min) ≥ th — and never enters the maximum-frequency inequality; option C (1/11 ns) comes from wrongly adding the 1 ns hold into the period. Option B (1/8 ns) forgets the setup term, and option D (1/6 ns) counts only the combinational logic. This launch-propagate-setup template is identical to pipeline stage-time analysis in computer organization, so mastering it pays twice in the exam."
        },
        {
          id: 'digital-sequential-q16',
          q: "A 3-bit register (Q2 Q1 Q0) of D flip-flops is wired as D2 = Q1, D1 = Q0, D0 = Q2', all sharing one clock, starting from 000. The circuit returns to 000 after how many clock pulses (i.e. what is its modulus)?",
          options: ["4", "6", "7", "8"],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Simulate, remembering all flip-flops update simultaneously from the old state. From 000: D2 = Q1 = 0, D1 = Q0 = 0, D0 = Q2' = 1 → 001. From 001: (Q1=0, Q0=1, Q2'=1) → 011. From 011: (Q1=1, Q0=1, Q2'=1) → 111. From 111: (1, 1, 0) → 110. From 110: (1, 0, 0) → 100. From 100: (0, 0, 0) → 000. The cycle is 000 → 001 → 011 → 111 → 110 → 100 → 000: six states, so it is a mod-6 counter. This structure — a shift register with inverted feedback from the last stage — is exactly a 3-bit Johnson counter, and 2n = 6 confirms the simulation. Option 8 assumes all 2^3 states are used, but the states 010 and 101 form a separate 2-cycle (check: 010 → 101 → 010) that the main loop never enters — which also illustrates why Johnson counters need self-correction if they power up in an unused state. Options 4 and 7 match no consistent trace."
        }
      ]
    },
    {
      id: 'digital-number-systems',
      name: 'Number Systems & Representations',
      theory: {
        intro: "Number systems are the entry point of Digital Logic and a guaranteed source of quick marks in GATE — typically 1-2 marks that should cost you under two minutes each. The syllabus core is base conversion (binary, octal, hexadecimal, arbitrary radix), the three signed-number schemes (sign-magnitude, 1's complement, 2's complement), and overflow detection. GATE rarely asks a plain conversion; instead it wraps the idea in a twist: an unknown radix to solve for, a subtraction to perform via complements, a range boundary, or an overflow judgement call. Because 2's complement is how every real processor represents integers, this material also feeds directly into computer organization and C programming questions on integer overflow and casting. The topic rewards fluency: powers of 2 up to 2^16, the 8-bit landmark values, and instant conversion between binary, octal and hex via 3-bit and 4-bit grouping should all be reflexive.",
        core: "• Positional value: a numeral d_k...d_1 d_0 . f_1 f_2 in radix r has value Σ d_i · r^i + Σ f_j · r^(-j). Valid digits run from 0 to r-1 — a digit equal to or exceeding the radix (like 9 in octal) makes a numeral invalid, a favorite trick.\n\n• Decimal → binary: divide the integer part repeatedly by 2 collecting remainders (last remainder is the MSB); multiply the fraction part repeatedly by 2 collecting integer bits (first bit is the most significant fraction bit). A decimal fraction terminates in binary only if its denominator (in lowest terms) is a power of 2 — 0.625 = 5/8 terminates as 0.101, but 0.1 = 1/10 does not and repeats forever.\n\n• Binary ↔ octal/hex: group bits in 3s (octal) or 4s (hex) from the radix point outward. Octal ↔ hex is easiest via binary as an intermediate.\n\n• Unsigned range: n bits represent 0 to 2^n - 1.\n\n• Sign-magnitude: MSB is the sign, remaining n-1 bits the magnitude. Range ±(2^(n-1) - 1), with two zeros (+0 and -0). Arithmetic is awkward, so hardware avoids it for integers (though IEEE 754 floating point uses it for the significand).\n\n• 1's complement: negate by flipping every bit. Range is symmetric, -(2^(n-1) - 1) to +(2^(n-1) - 1), again with two zeros (all 0s and all 1s), so n bits give only 2^n - 1 distinct values. Addition requires an end-around carry: a carry out of the MSB is added back into the LSB.\n\n• 2's complement: negate by flipping all bits and adding 1 (equivalently: copy bits from the right up to and including the first 1, flip the rest). Range is asymmetric: -2^(n-1) to +2^(n-1) - 1, e.g. -128 to +127 for 8 bits. Single zero, so all 2^n values are distinct. The MSB has weight -2^(n-1) (weighted view), which instantly evaluates any 2's complement pattern. The most negative number has no positive counterpart: negating it overflows and returns itself.\n\n• Subtraction via complements: A - B = A + (2's complement of B), discarding the carry out of the MSB. In 1's complement, A - B = A + (1's complement of B) with end-around carry. If no carry is produced (1's complement), the result is negative and stored in complemented form.\n\n• Sign extension: to widen a 2's complement number, replicate the sign bit into the new high-order positions: 4-bit 1011 (-5) becomes 8-bit 11111011. Zero-extension is correct only for unsigned values.\n\n• Overflow in 2's complement addition: possible only when both operands have the same sign; it occurred iff the result's sign differs from the operands' sign. Equivalent hardware test: carry into the MSB differs from carry out of the MSB (Cin ⊕ Cout of the sign position). The discarded carry-out alone does NOT indicate overflow — that is the single most tested misconception.\n\n• BCD (8421): each decimal digit encoded in 4 bits, codes 1010-1111 unused. BCD is not binary: 29 in BCD is 0010 1001, but 29 in binary is 11101. Other codes worth recognizing: Excess-3 (digit + 3, self-complementing) and Gray code (successive values differ in one bit; binary→Gray: g_i = b_i ⊕ b_(i+1) with MSB copied).",
        strategy: "Range questions: hard-code the 8-bit landmarks — unsigned 0-255, 2's complement -128 to +127, 1's complement and sign-magnitude -127 to +127. For other widths, regenerate from -2^(n-1) formulas rather than memory. The asymmetric range of 2's complement (one extra negative number) decides many options instantly.\n\nUnknown-radix questions: translate the numeral into a polynomial in r, set it equal to the given value, solve, then sanity-check that every digit is legal in radix r (a digit ≥ r invalidates a root).\n\nComplement-subtraction questions: compute the 2's complement with the copy-from-right-until-first-1-then-flip shortcut — it is faster and less error-prone than invert-and-add-1 under pressure.\n\nOverflow questions: apply the sign rule mechanically: same-sign operands, different-sign result → overflow; mixed-sign operands can never overflow. Ignore the discarded carry — it is the planted red herring.\n\nTraps: BCD ≠ binary; 1's complement has two zeros so it holds one fewer value; negating the most negative 2's complement number silently overflows; sign-extend (not zero-extend) when widening signed values; decimal fractions like 0.1 or 0.2 are infinite repeating binary fractions.\n\nMini-example: compute 19 - 35 in 8-bit 2's complement. 35 = 00100011, its 2's complement is 11011101. 19 = 00010011. Sum: 00010011 + 11011101 = 11110000, no carry out. MSB is 1 → negative; magnitude = 2's complement of 11110000 = 00010000 = 16, so the answer is -16. Correct, since 19 - 35 = -16."
      },
      questions: [
        {
          id: 'digital-number-systems-q1',
          q: "The decimal value of the binary numeral 101101 is:",
          options: ["43", "45", "51", "53"],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "Assign powers of 2 from the right: the bits of 101101 sit at positions 5,4,3,2,1,0 with weights 32, 16, 8, 4, 2, 1. The 1-bits occupy positions 5, 3, 2 and 0, so the value is 32 + 8 + 4 + 1 = 45. A fast alternative is Horner evaluation left to right: start 0, then per bit double-and-add: 1, 2, 5, 11, 22, 45 — the same answer with only small intermediate numbers. Option 43 misses the position-1... rather, it drops the 4+1 pattern in favor of 2+1 with an arithmetic slip; 51 comes from misreading the numeral as 110011; 53 from adding a phantom 8. The reliable defense against all such slips is writing the weights above the bits before summing — a five-second habit that removes essentially all risk from 1-mark conversion questions."
        },
        {
          id: 'digital-number-systems-q2',
          q: "The hexadecimal number 2F is equal to which decimal value?",
          options: ["37", "45", "47", "52"],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "In hexadecimal each position carries a power of 16, and the digit F stands for 15. So 2F = 2 × 16 + 15 = 32 + 15 = 47. Option 37 results from treating F as 5 or misreading the numeral as octal-ish digits; option 45 would be 2D (D = 13); option 52 would be 34 in hex. The letter-digit table A = 10 through F = 15 must be automatic, as must the first several powers of 16 (1, 16, 256, 4096). A useful cross-check is via binary: 2F = 0010 1111, which is 32 + 15 = 47 again — grouping hex digits into 4-bit nibbles and summing is often the fastest verification path, and the same nibble skill is what you need for IEEE 754 questions and memory-address arithmetic in computer organization, so this conversion fluency compounds across the paper."
        },
        {
          id: 'digital-number-systems-q3',
          q: "The range of integers representable in 8-bit 2's complement form is:",
          options: ["-127 to +127", "-128 to +127", "-127 to +128", "-128 to +128"],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "In n-bit 2's complement the MSB carries weight -2^(n-1) while the remaining bits carry their usual positive weights. The most negative value is the pattern 10000000 = -2^7 = -128, and the most positive is 01111111 = +2^7 - 1 = +127. The range is asymmetric because the total number of patterns, 2^8 = 256, is even: after dedicating one pattern to zero, 255 remain, split as 128 negatives and 127 positives. Option A describes 1's complement or sign-magnitude, both of which waste a pattern on a second zero and thus reach only ±127 — recognizing which scheme owns which range is exactly what this question type tests. Options C and D include +128, impossible since 8 bits cannot exceed 01111111 as a positive value. Corollary worth storing: negating -128 in 8 bits overflows and yields -128 itself."
        },
        {
          id: 'digital-number-systems-q4',
          q: "The 1's complement of the 8-bit number 01011010 is:",
          options: ["10100101", "10100110", "01011011", "10100100"],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: "The 1's complement is formed by flipping every bit individually: 01011010 becomes 10100101 — each 0 becomes 1 and each 1 becomes 0, with no arithmetic involved. Option B, 10100110, is the 2's complement (flip all bits, then add 1); offering both complements side by side is the standard construction of this question, so read carefully which one is requested. Option C adds 1 without flipping, and option D flips and then subtracts 1, neither of which is a defined operation here. Conceptually, the 1's complement of X equals (2^n - 1) - X, i.e. subtraction from all-1s, which is why it never generates a carry and why flipping suffices. Verify numerically: 01011010 = 90, and 10100101 = 165 = 255 - 90, confirming the identity. The 2's complement would be 256 - 90 = 166 = 10100110, matching option B as the near-miss distractor."
        },
        {
          id: 'digital-number-systems-q5',
          q: "The 2's complement representation of the negative of 01101100 (i.e. of -108) in 8 bits is:",
          options: ["10010011", "10010100", "11101100", "10010101"],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Method 1 (flip and add): inverting 01101100 gives 10010011; adding 1 gives 10010100. Method 2 (the faster shortcut): scan from the right, copy bits up to and including the first 1 — here the trailing '100' — then flip everything to its left: 01101 flips to 10010, giving 10010100 directly. Both agree. Verify by value: 108 = 01101100, and 10010100 interpreted with MSB weight -128 is -128 + 16 + 4 = -108, correct. Option A is the 1's complement — the invariable neighbor-distractor, one short of the answer. Option C merely sets the sign bit, which is sign-magnitude thinking and represents -108 only in that different scheme. Option D adds 2 instead of 1. On exams, prefer the copy-until-first-1 shortcut: it has one mental step instead of two and eliminates the carry-propagation errors that occur when adding 1 to a string of trailing 1s."
        },
        {
          id: 'digital-number-systems-q6',
          q: "The binary representation of the decimal fraction 0.625 is:",
          options: ["0.110", "0.101", "0.011", "0.100"],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Use repeated multiplication by 2, harvesting the integer part each time: 0.625 × 2 = 1.25 → bit 1; 0.25 × 2 = 0.5 → bit 0; 0.5 × 2 = 1.0 → bit 1, fraction now zero, stop. Reading the harvested bits in order gives 0.101. Confirm by weights: 0.101 = 1/2 + 1/8 = 0.5 + 0.125 = 0.625. Option A, 0.110 = 1/2 + 1/4 = 0.75; option C, 0.011 = 1/4 + 1/8 = 0.375; option D, 0.100 = 0.5 — each a plausible slip from misordering the harvested bits (the first bit produced is the most significant, sitting right after the point; reversing the read-out order is the common error, symmetric to how division remainders for integer parts are read in the opposite order). The process terminated because 0.625 = 5/8 has a power-of-2 denominator; a fraction like 0.6 would cycle forever."
        },
        {
          id: 'digital-number-systems-q7',
          q: "If the numeral 24 written in radix r equals decimal 16, then r is:",
          options: ["5", "6", "7", "8"],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Expand positionally: (24)_r = 2r + 4. Set 2r + 4 = 16, giving 2r = 12, r = 6. Validity check: the digits used are 2 and 4, both legal in radix 6 (digits 0-5), so the solution stands — this check matters because radix equations can produce roots where a digit equals or exceeds the radix, which must be rejected; examiners build entire questions around that rejection. Verify: in base 6, 24 means 2 × 6 + 4 = 16. Testing the wrong options: base 5 gives 14, base 7 gives 18, base 8 gives 20 — none match, and noticing that the value grows with the radix lets you binary-search the options quickly even without algebra. For longer numerals the same method yields a quadratic or cubic in r; take the positive root and always run the digit-legality check before committing."
        },
        {
          id: 'digital-number-systems-q8',
          q: "The octal number 753 expressed in hexadecimal is:",
          options: ["1EB", "1DB", "3EB", "1EA"],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Convert through binary. Each octal digit expands to 3 bits: 7 → 111, 5 → 101, 3 → 011, so 753₈ = 111101011. Regroup from the right in 4-bit nibbles: 1 1110 1011, padding the leftmost group as 0001. Reading nibbles: 0001 = 1, 1110 = E, 1011 = B, so the answer is 1EB. Cross-check in decimal: 753₈ = 7 × 64 + 5 × 8 + 3 = 448 + 40 + 3 = 491, and 1EB₁₆ = 256 + 14 × 16 + 11 = 256 + 224 + 11 = 491 — consistent. Option 1DB (= 475) comes from misreading nibble 1110; option 1EA (= 490) from misreading 1011 as 1010, typically caused by regrouping from the left instead of the right; option 3EB adds phantom padding bits as 1s. The through-binary route is essentially error-proof if you always regroup starting at the radix point."
        },
        {
          id: 'digital-number-systems-q9',
          q: "Two 8-bit 2's complement numbers 01100110 (+102) and 00111010 (+58) are added. Which statement is correct?",
          options: ["The result is +160 and is valid", "Overflow occurs, and the stored 8-bit result reads -96", "Overflow occurs, and the stored 8-bit result reads +32", "No overflow occurs because there is no carry out of the MSB"],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: "Add the patterns: 01100110 + 00111010 = 10100000. The true sum 102 + 58 = 160 exceeds the 8-bit 2's complement maximum of +127, so overflow must occur — and the sign rule confirms it: both operands are positive (MSB 0) but the result pattern has MSB 1, a sign flip that is the definitive overflow signature. The stored pattern 10100000 evaluates as -128 + 32 = -96; equivalently 160 - 256 = -96, the wrap-around. Option A is impossible: +160 has no 8-bit representation. Option C miscomputes the wrap (160 - 128 = 32 uses the wrong modulus). Option D applies the wrong test: in 2's complement the discarded carry-out is irrelevant to overflow — here carry-out is 0 yet overflow clearly happened; the correct hardware test compares carry-in and carry-out of the MSB (they differ here: carry into MSB is 1, out is 0). Same-sign inputs with a different-sign output is the rule to trust."
        },
        {
          id: 'digital-number-systems-q10',
          q: "The 4-bit 2's complement number 1011 is to be widened to 8 bits without changing its value. The correct 8-bit form is:",
          options: ["00001011", "10001011", "11111011", "10110000"],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: "The 4-bit pattern 1011 has value -8 + 2 + 1 = -5. Widening a 2's complement number requires sign extension: replicate the sign bit (here 1) into every new high-order position, giving 11111011. Check: -128 + 64 + 32 + 16 + 8 + 2 + 1 = -5, value preserved. Why this works: the MSB weight -2^(n-1) equals -2^n + 2^(n-1), so pushing the sign one position left while leaving a 1 behind is value-neutral, and induction extends this to any width. Option A zero-extends, producing +11 — correct only for unsigned data; forgetting the signed/unsigned distinction here mirrors real C bugs when casting. Option B keeps a sign bit at the far left but zero-fills between, yielding -128 + 11 = -117. Option D shifts the number left four places, multiplying it by 16 (giving 10110000 = -80). Sign extension is also why arithmetic right shift copies the MSB."
        },
        {
          id: 'digital-number-systems-q11',
          q: "How many distinct values can be represented in 8-bit 1's complement notation?",
          options: ["256", "255", "254", "128"],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "Eight bits provide 2^8 = 256 patterns, but 1's complement wastes one: both 00000000 (+0) and 11111111 (-0) represent zero. Distinct values = 256 - 1 = 255, namely the integers from -127 to +127 inclusive (check: 127 negatives + 127 positives + 1 zero = 255). The same double-zero defect afflicts sign-magnitude (00000000 and 10000000 both zero), so it also holds 255 values, while 2's complement has a unique zero and uses all 256 patterns, covering -128 to +127 — this efficiency, plus the fact that addition needs no end-around carry and no special cases, is precisely why hardware settled on 2's complement. Option A is the 2's complement count; option C double-subtracts as if there were two redundant pairs; option D counts only the non-negative half. The general formulas: 2's complement holds 2^n values; 1's complement and sign-magnitude hold 2^n - 1."
        },
        {
          id: 'digital-number-systems-q12',
          q: "Computing 23 - 45 using 8-bit 2's complement addition yields the bit pattern:",
          options: ["11101010", "00010110", "11101001", "10010110"],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: "Rewrite the subtraction as addition: 23 + (-45). First, 45 = 00101101, so -45 is its 2's complement: invert to 11010010, add 1 to get 11010011. Now add 23 = 00010111: 00010111 + 11010011 = 11101010 (any carry out of bit 7 is discarded). Verify the result: 11101010 has MSB 1, so it is negative; its magnitude is the 2's complement, 00010110 = 22, so the pattern encodes -22 — and indeed 23 - 45 = -22. Option B, 00010110, is +22: the right magnitude with the sign thrown away, the trademark error of computing the smaller-from-larger difference and forgetting the negation. Option C, 11101001, is the 1's complement of 22 (off by one from skipping the +1 step). Option D is sign-magnitude style: sign bit glued onto +22's pattern, which is not how 2's complement encodes negatives. No overflow is possible here since the operands have opposite signs."
        },
        {
          id: 'digital-number-systems-q13',
          q: "Which of the following decimal fractions has an exact, finite binary representation?",
          options: ["0.1", "0.2", "0.375", "0.3"],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "A fraction terminates in radix 2 exactly when, in lowest terms, its denominator is a power of 2. 0.375 = 3/8 qualifies: 0.375 = 0.011 in binary (1/4 + 1/8), finite and exact. The others all reduce to denominators containing the factor 5 — 0.1 = 1/10, 0.2 = 1/5, 0.3 = 3/10 — and 5 is coprime to 2, so their binary expansions repeat forever: 0.1 in binary is 0.0001100110011... with the block 0011 recurring. Run the multiply-by-2 algorithm on 0.1 and you will see the fractional residue cycle through 0.2, 0.4, 0.8, 0.6, 0.2, ... — the returning residue 0.2 proves the repetition. This is the root cause of the famous floating point surprise that 0.1 + 0.2 ≠ 0.3 exactly in IEEE 754: none of the three operands is stored exactly, and the rounding residues fail to cancel. The general rule for any base b: a fraction terminates iff every prime factor of its reduced denominator divides b."
        },
        {
          id: 'digital-number-systems-q14',
          q: "The decimal number 29 encoded in BCD (8421 code) is:",
          options: ["11101", "00101001", "00011101", "101001"],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: "BCD encodes each decimal digit separately in its own 4-bit field using natural binary weights 8-4-2-1. For 29: the digit 2 becomes 0010 and the digit 9 becomes 1001, concatenating to 0010 1001. Option A, 11101, is the pure binary representation of 29 (16 + 8 + 4 + 1) — the essential contrast this question is built on: BCD and binary agree only for 0-9, and BCD always uses exactly 4 bits per decimal digit, making it longer (8 bits here versus 5). Option C glues binary fragments incorrectly (0001 1101 would read as decimal digits 1 and 13, and 1101 is not even a legal BCD code, since codes 1010-1111 are forbidden). Option D drops the leading zeros of the tens digit, but BCD fields are fixed at 4 bits each. BCD's virtue is trivial decimal I/O (each nibble maps to one display digit); its cost is wasted codes and the need for +6 correction during arithmetic."
        },
        {
          id: 'digital-number-systems-q15',
          q: "In 8-bit 2's complement arithmetic, applying the negation operation (take 2's complement) to the pattern 10000000 produces:",
          options: ["01111111", "00000000", "10000000 itself, with overflow", "01111110"],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: "The pattern 10000000 is -128, the most negative 8-bit value. Negating: invert all bits → 01111111, add 1 → 10000000. The operation returns the very same pattern, so the computed 'negation' of -128 is still -128 — an overflow, because the true answer +128 exceeds the maximum representable +127. This is the concrete cost of 2's complement's asymmetric range: with 256 patterns and a single zero, there are 128 negatives but only 127 positives, so exactly one number has no negation. Option A, 01111111, is only the intermediate 1's complement (+127), abandoned before the +1 step. Option B would require negation to destroy information, which it does not. Option D is off by one. Real consequences: in C, the expression -INT_MIN and the call abs(INT_MIN) are undefined behavior for exactly this reason, and hardware negate units flag overflow on this single input — a favorite crossover fact between digital logic and programming questions."
        }
      ]
    }
]};

window.GATE_DATA.questions['digital'].topics.push({
  id: 'digital-arithmetic',
  name: 'Computer Arithmetic & IEEE 754',
  theory: {
    intro: "Computer arithmetic asks a very practical question: given a fixed number of bits, how do we represent numbers and combine them so that hardware built from simple adders can produce correct results, and how do we detect when it cannot? GATE draws heavily on two halves of this topic. The first half is fixed-point integer arithmetic in 2's complement — addition, subtraction, overflow detection, and the high-level idea behind Booth's algorithm for signed multiplication. The second half is IEEE 754 floating point — encoding and decoding single and double precision numbers, the biased exponent, normalized versus denormalized numbers, the special bit patterns for zero, infinity and NaN, and the resulting limits on range, precision and rounding. Both halves reward the same skill: converting confidently between decimal and binary while tracking exactly which bits mean what, under exam time pressure.",
    core: "Fixed-point 2's complement arithmetic. An n-bit 2's complement number represents values from -2^(n-1) to 2^(n-1)-1. Addition and subtraction use the same binary adder: to compute A - B, take the 2's complement of B (invert all bits, add 1) and add it to A, discarding any final carry-out. This is why 2's complement dominates hardware — one adder circuit handles both operations.\n\n• Overflow detection (two equivalent rules): (1) overflow occurs when two operands of the SAME sign produce a result of the OPPOSITE sign; adding a positive and a negative number can never overflow. (2) overflow occurs exactly when the carry INTO the sign (MSB) bit differs from the carry OUT of the sign bit — a rule that is easy to apply mechanically once you track both carries during the addition.\n\n• Booth's algorithm (high-level idea). Naive shift-add multiplication of an n-bit multiplier needs up to n additions, one per 1-bit. Booth's insight is that a maximal run of consecutive 1s in the multiplier, say from bit i down to bit j, contributes the same value as adding 2^(i+1) and subtracting 2^j — replacing a whole run of additions with just one subtraction (at the run's start) and one addition (just past the run's end). Formally, Booth recoding scans adjacent bit pairs (current bit, previous bit, with an implicit 0 to the right of the LSB): pattern 10 means 'a run is beginning' so subtract the multiplicand; pattern 01 means 'a run just ended' so add the multiplicand; patterns 00 and 11 (inside a run of 0s or inside a run of 1s) require no arithmetic, only a shift. The payoff is fewer arithmetic steps for multipliers with long runs of 1s or 0s, and it extends naturally to signed multiplication without a separate sign-correction step, which is why real ALUs use variants of it (e.g. radix-4 Booth, examining bits in overlapping pairs to halve the number of cycles further).\n\nIEEE 754 floating point. A floating-point number is stored as (sign, exponent, mantissa/fraction). Single precision uses 1 + 8 + 23 = 32 bits with exponent bias 127; double precision uses 1 + 11 + 52 = 64 bits with exponent bias 1023. For a NORMALIZED number, the value is (-1)^sign × 1.mantissa × 2^(exponent_field − bias); the leading 1 before the binary point is implicit and is never stored, which is where the 'extra' bit of precision comes from.\n\n• Special bit patterns. Exponent field all 0s with mantissa all 0s represents ±0 (two signed zeros exist). Exponent field all 0s with a nonzero mantissa represents a DENORMALIZED (subnormal) number, value = (-1)^sign × 0.mantissa × 2^(1 − bias) — note the implicit leading bit becomes 0, not 1, and the exponent used is 1 − bias, not 0 − bias. Denormals let the representable magnitudes shrink gradually to zero instead of jumping straight from the smallest normal number to zero ('gradual underflow'). Exponent field all 1s with mantissa all 0s represents ±infinity. Exponent field all 1s with a nonzero mantissa represents NaN (Not a Number), the result of undefined operations like 0/0 or sqrt(-1); by definition NaN compares unequal to everything, including itself.\n\n• Range and precision. For single precision, the smallest positive normalized magnitude is 2^-126 (exponent field = 1, giving actual exponent 1-127 = -126) ≈ 1.18×10^-38, and the largest finite magnitude is (2 − 2^-23) × 2^127 ≈ 3.4×10^38. The smallest positive denormal is 2^-149 ≈ 1.4×10^-45. The gap between 1.0 and the next larger representable single-precision number (machine epsilon) is 2^-23 ≈ 1.19×10^-7, giving roughly 6-7 significant decimal digits of precision. Double precision extends this to about 15-16 significant decimal digits, with machine epsilon 2^-52 ≈ 2.22×10^-16, smallest normal 2^-1022 ≈ 2.2×10^-308 and largest finite value ≈ 1.8×10^308.\n\n• Rounding. IEEE 754 defines round-to-nearest-even (banker's rounding) as the default mode: when a result falls exactly halfway between two representable values, it rounds to whichever has an even last mantissa bit, which avoids a systematic upward bias that plain round-half-up would introduce over many operations."
    ,
    strategy: "GATE's arithmetic questions cluster into a few recurring shapes. First, small n-bit 2's complement addition/subtraction where you must state both the result AND whether overflow occurred — always check the sign-based rule (same-sign operands, opposite-sign result) as a fast sanity check even if you compute via carries. Second, Booth's algorithm questions almost never ask you to run the full algorithm by hand in an MCQ; they ask a conceptual question (which bit pattern triggers add vs subtract) or a counting question (how many arithmetic operations does Booth save on a given bit pattern compared to naive shift-add) — spot the runs of 1s, since each run costs exactly one subtract and one add regardless of its length. Third, and most exam-frequent, IEEE 754 encode/decode problems: practice converting a decimal number to binary scientific form (mantissa and exponent) fluently, then slotting sign, biased exponent, and mantissa bits into their fields — and the reverse, reading a hex/bit pattern back into a decimal value. A classic trap is forgetting the bias when reading the exponent field, or forgetting the implicit leading 1 (or, for denormals, that it becomes 0). Another classic trap is confusing 'exponent field value' with 'actual exponent' — e.g. field 124 in single precision means actual exponent 124-127 = -3, not -3 itself as a field. Worked mini-example: encode 9.5 in single precision. 9.5 = 1001.1(binary) = 1.0011 × 2^3, so exponent field = 3+127 = 130 = 10000010, mantissa = 00110000000000000000000, sign = 0, giving 0 10000010 00110000000000000000000, i.e. hex 0x41180000. Always double check by reversing the computation from your final bit pattern back to decimal before committing to an option."
  },
  questions: [
    {
      id: 'digital-arithmetic-q1',
      q: "In n-bit 2's complement addition, overflow is correctly detected when:",
      options: [
        "the two operands have opposite signs and the result has the same sign as the larger-magnitude operand",
        "the two operands have the same sign but the result has the opposite sign",
        "the final carry-out of the addition is 1, regardless of operand signs",
        "either operand is zero and the result is nonzero"
      ],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "Overflow in 2's complement addition happens exactly when the true mathematical sum falls outside the representable range [-2^(n-1), 2^(n-1)-1]. That can only happen when both operands push the result in the same direction, i.e. both are positive (sum too large and positive) or both are negative (sum too large and negative) — so 'same sign in, opposite sign out' is the reliable symptom, matching option B. Adding operands of opposite sign always produces a result whose magnitude is smaller than the larger operand's magnitude, so it can never overflow (option A describes a scenario that is actually always safe). Option C is wrong because the final carry-out bit alone is meaningless for signed overflow — it must be compared against the carry INTO the sign bit, not read in isolation. Option D is irrelevant to overflow entirely."
    },
    {
      id: 'digital-arithmetic-q2',
      q: "Adding the two 4-bit 2's complement numbers 0101 and 0011 gives the result 1000. What is the correct interpretation?",
      options: [
        "Correct result -8, no overflow",
        "Overflow occurred; the true sum +8 cannot be represented in 4-bit 2's complement",
        "The addition should have produced 0111 instead, indicating a hardware fault",
        "No overflow, because the carry-out of the addition is 0"
      ],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'numerical',
      explanation: "0101 = +5 and 0011 = +3, and their true sum is +8. But 4-bit 2's complement can only represent -8 to +7, so +8 is not representable. The binary addition 0101 + 0011 = 1000 indeed produces the bit pattern for -8, a nonsensical result (two positives summing to a negative) that is the textbook symptom of overflow. Checking via the sign rule: both operands are positive (same sign) yet the result 1000 has sign bit 1 (negative) — same sign in, opposite sign out, confirming overflow per the standard rule. Option A misreads the overflowed bit pattern as if it were a valid answer. Option C invents a fault where none exists — the adder behaved exactly as 2's complement arithmetic dictates; the bits are 'correct' bits, just not a valid representable value. Option D is not the correct test in this case; the sign-based rule is the reliable check here."
    },
    {
      id: 'digital-arithmetic-q3',
      q: "Using 4-bit 2's complement representation, compute 3 - 5 by adding 3 to the 2's complement of 5, and give the resulting decimal value.",
      options: ["-2, correct, no overflow", "-2, but flagged as overflow", "+2, correct, no overflow", "14, since the carry-out is discarded incorrectly"],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "5 in 4-bit is 0101; its 2's complement (negation) is obtained by inverting to 1010 and adding 1, giving 1011 (which represents -5). Now add: 0011 (+3) + 1011 (-5) = 1110, discarding any carry out of the 4-bit width. The pattern 1110 in 4-bit 2's complement equals -2 (invert 1110 to 0001, add 1 to get 0010 = 2, so 1110 = -2), which matches the true value 3 - 5 = -2 exactly. No overflow occurred, consistent with the rule that overflow is impossible when you are effectively adding operands of opposite sign (here +3 and -5): the sum's magnitude is smaller than the larger operand's magnitude, well within range. Option D misapplies the idea of discarding carry-out — that discarding is normal and correct in 2's complement arithmetic, not an error."
    },
    {
      id: 'digital-arithmetic-q4',
      q: "In Booth's algorithm, examining the current multiplier bit and the bit immediately to its right (with an implicit 0 appended before the least significant bit), which bit pair correctly signals 'subtract the multiplicand from the partial product, then arithmetic-shift right'?",
      options: ["Pattern 00", "Pattern 01", "Pattern 10", "Pattern 11"],
      answer: 2,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: "Booth recoding reads pairs (current bit, previous bit) moving from LSB to MSB. Pattern 10 means the current bit is 1 and the previous (already-processed, to its right) bit was 0 — this is precisely the START of a new run of 1s when scanned left to right, or equivalently the point where the algorithm must subtract the multiplicand to 'begin' representing that run as a single higher power of two minus a lower one. Pattern 01 is the mirror case (a run of 1s just ended), calling for an ADD instead. Patterns 00 and 11 occur strictly inside a run of 0s or a run of 1s respectively, where the bit value hasn't changed, so no arithmetic operation is needed — only a shift. Getting the add/subtract assignment backwards is the single most common Booth mistake students make, since both patterns 'look similar' (one 1, one 0) unless you're careful about which one is which."
    },
    {
      id: 'digital-arithmetic-q5',
      q: "A 4-bit unsigned multiplier has the bit pattern 0111 (a single run of three consecutive 1s). Using Booth's algorithm instead of naive shift-add multiplication, how many arithmetic operations (adds or subtracts, not counting shifts) are needed?",
      options: ["1", "2", "3, same as naive shift-add", "4"],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "Naive shift-add multiplication performs one addition for every 1-bit in the multiplier — for 0111, that is 3 additions (one per bit). Booth's algorithm instead treats the entire maximal run of 1s as a single unit: a run occupying bits j through i (inclusive) is arithmetically equivalent to 2^(i+1) - 2^j, so it costs exactly one subtraction (at the position where the run begins, reading right to left) and one addition (at the position just past where the run ends), regardless of how long the run is. Scanning 0111 with the implicit trailing 0 gives the bit-pair sequence (Q0,Q-1)=(1,0) → subtract, (Q1,Q0)=(1,1) → shift only, (Q2,Q1)=(1,1) → shift only, (Q3,Q2)=(0,1) → add. That totals exactly 2 arithmetic operations (1 subtract + 1 add) versus the 3 additions naive shift-add would require — the whole point of Booth's algorithm is that this saving grows with run length while a naive approach's cost grows with the number of 1-bits."
    },
    {
      id: 'digital-arithmetic-q6',
      q: "In the IEEE 754 single precision (32-bit) floating-point format, the field widths for sign, exponent, and mantissa (fraction) are, in that order:",
      options: ["1, 11, 52", "1, 8, 23", "1, 7, 24", "2, 8, 22"],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "Single precision packs a value into exactly 32 bits divided as 1 sign bit + 8 exponent bits + 23 mantissa (fraction) bits, which is option B. The widths 1+11+52 (option A) describe double precision (64 bits total), a common mix-up when a question doesn't specify which precision it means. Option C's 1+7+24 and option D's 2+8+22 are not real IEEE 754 formats; they are distractors constructed to still sum to 32 so that a student who only checks the total bit count, rather than the individual field widths, is misled. Memorizing both the single (1-8-23) and double (1-11-52) splits, along with their biases (127 and 1023), is essential since GATE frequently asks about one format but expects you to distinguish it clearly from the other."
    },
    {
      id: 'digital-arithmetic-q7',
      q: "IEEE 754 double precision uses an 11-bit exponent field. What is the exponent bias used to convert the stored field value into the actual (signed) exponent?",
      options: ["255", "511", "1023", "2047"],
      answer: 2,
      marks: 1,
      difficulty: 'easy',
      type: 'numerical',
      explanation: "The bias for an e-bit exponent field is conventionally 2^(e-1) - 1, chosen so the field can represent both positive and negative actual exponents using only non-negative field values. For e = 11 bits, bias = 2^10 - 1 = 1024 - 1 = 1023, which is option C. Option A, 255, is the bias for the 8-bit single-precision exponent field (2^7 - 1 = 127... note 255 is NOT that bias either — 255 is the all-1s value 2^8-1, a distractor confusing 'maximum field value' with 'bias'). Option B, 511, similarly confuses 2^9-1 with the actual bias formula. Option D, 2047, is 2^11 - 1, the maximum representable value in an 11-bit field (reserved for infinity/NaN), not the bias. The bias lets exponent field values 1 through 2046 represent actual exponents -1022 through +1023 for double precision."
    },
    {
      id: 'digital-arithmetic-q8',
      q: "What is the IEEE 754 single precision (32-bit) hexadecimal encoding of the decimal value 9.5?",
      options: ["0x41180000", "0x41980000", "0x40180000", "0x41180001"],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "9.5 in binary is 1001.1, which normalizes to 1.0011 × 2^3. The exponent field is 3 + 127 (bias) = 130 = 10000010 in binary; the mantissa stores the 23 bits after the implicit leading 1, i.e. 0011 followed by nineteen 0s; the sign bit is 0 since 9.5 is positive. Concatenating sign+exponent+mantissa: 0 10000010 00110000000000000000000, which regrouped into hex nibbles is 0100 0001 0001 1000 0000 0000 0000 0000 = 0x41180000. Option B changes a nibble to 0x419... which would correspond to a different exponent/mantissa combination (a larger or misaligned value). Option C's leading 0x40 would mean exponent field 128 (i.e. actual exponent 1), representing a value near 2-4, not 8-16, so it's too small in magnitude for 9.5. Option D adds a spurious 1 in the last mantissa bit, encoding a value an ULP (unit in the last place) away from exactly 9.5."
    },
    {
      id: 'digital-arithmetic-q9',
      q: "What is the IEEE 754 single precision hexadecimal encoding of the decimal value -0.75?",
      options: ["0x3F400000", "0xBF400000", "0xBF000000", "0xBF800000"],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "0.75 in binary is 0.11, which normalizes to 1.1 × 2^-1. The exponent field is -1 + 127 = 126 = 01111110; the mantissa is 1 followed by twenty-two 0s (10000000000000000000000); the sign bit is 1 because the value is negative. Concatenating: 1 01111110 10000000000000000000000, regrouped into hex nibbles: 1011 1111 0100 0000 0000 0000 0000 0000 = 0xBF400000, option B. Option A has the same magnitude bits but a 0 sign bit, which would encode +0.75 instead. Option C, 0xBF000000, corresponds to exponent field 126 with an all-zero mantissa, i.e. -1.0 × 2^-1 = -0.5, not -0.75. Option D, 0xBF800000, is exponent field 127 (actual exponent 0) with zero mantissa, i.e. exactly -1.0. Precisely tracking which hex nibble encodes which field is the key skill this question drills."
    },
    {
      id: 'digital-arithmetic-q10',
      q: "The IEEE 754 single precision bit pattern 0x3E200000 represents which decimal value?",
      options: ["0.125", "0.15625", "0.3125", "0.0625"],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "Expanding 0x3E200000 into bits: 0011 1110 0010 0000 0000 0000 0000 0000, i.e. sign = 0, exponent field = 01111100 = 124, mantissa = 01000000000000000000000. The actual exponent is 124 - 127 = -3. The mantissa's leading bits 01 combine with the implicit leading 1 to give the significand 1.01 (binary) = 1 + 0.25 = 1.25 (decimal). The value is therefore 1.25 × 2^-3 = 1.25 × 0.125 = 0.15625, option B — matching the earlier encode direction of the same example, since 5/32 = 0.15625 = 0.00101 in binary = 1.01 × 2^-3. Option A, 0.125, is exactly 2^-3 with no mantissa contribution (would need mantissa all 0s). Option C, 0.3125, would need actual exponent -2 instead. Option D, 0.0625, is 2^-4, one exponent step too small. This reverse-decoding direction is exactly as exam-relevant as encoding and should be equally fluent."
    },
    {
      id: 'digital-arithmetic-q11',
      q: "In IEEE 754 format, a bit pattern with the exponent field all 1s and the mantissa field all 0s represents:",
      options: ["The largest representable finite normalized number", "±Infinity, sign determined by the sign bit", "NaN (Not a Number)", "A denormalized number close to zero"],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "IEEE 754 reserves the all-1s exponent field for two special cases distinguished by the mantissa: mantissa all 0s means ±infinity (sign from the sign bit), while any nonzero mantissa means NaN. So this exact pattern — all-1s exponent AND all-0s mantissa — is ±infinity, option B. The largest finite normalized number instead uses exponent field = 254 (all 1s minus one, i.e. one less than the maximum, since 255 is reserved) with mantissa all 1s, which is a different, smaller pattern than what's described here. NaN requires the mantissa to be nonzero, which contradicts this question's 'all 0s' condition. Denormalized numbers use exponent field all 0s (the opposite extreme), not all 1s. This 'reserved exponent' design is what lets floating-point hardware represent overflow (infinity) and undefined results (NaN) using ordinary bit patterns instead of raising a hardware exception every time."
    },
    {
      id: 'digital-arithmetic-q12',
      q: "Which statement about IEEE 754 NaN (Not a Number) is correct?",
      options: [
        "NaN always compares equal to itself, since it represents a single well-defined error code",
        "NaN arises only from division by zero and never from any other operation",
        "A comparison NaN == NaN evaluates to false under the IEEE 754 standard",
        "NaN is encoded with the exponent field all 0s and a nonzero mantissa"
      ],
      answer: 2,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: "By IEEE 754 design, NaN is deliberately unordered and unequal to everything, including another NaN or even itself — so NaN == NaN evaluates to false, which is option C and is a famous gotcha used to test 'is this value NaN?' in real code (checking x != x). Option A is therefore false — the opposite is true. Option B is false: NaN can arise from many undefined operations, such as 0/0, infinity - infinity, sqrt of a negative number, or 0 × infinity, not division by zero alone. Option D is also wrong on the encoding: NaN requires the exponent field to be ALL 1s (not all 0s) together with a nonzero mantissa; all-0s exponent with nonzero mantissa instead encodes a denormalized number, a completely different and perfectly ordered value near zero."
    },
    {
      id: 'digital-arithmetic-q13',
      q: "For an IEEE 754 single precision denormalized (subnormal) number, which formula correctly gives its value from the stored fields?",
      options: [
        "(-1)^sign × 1.mantissa × 2^(exponent_field - 127), same formula as normalized numbers",
        "(-1)^sign × 0.mantissa × 2^(-126), using -126 regardless of the mantissa value",
        "(-1)^sign × 0.mantissa × 2^(1 - 127)",
        "(-1)^sign × 1.mantissa × 2^(-127)"
      ],
      answer: 2,
      marks: 2,
      difficulty: 'medium',
      type: 'concept',
      explanation: "Denormalized numbers are signaled by an exponent field of all 0s. For these, two things change simultaneously from the normalized formula: the implicit leading bit becomes 0 instead of 1 (so the significand is 0.mantissa, not 1.mantissa), and the actual exponent used is 1 - bias (not 0 - bias, and not the field value minus bias) — for single precision, 1 - 127 = -126. So the correct formula is (-1)^sign × 0.mantissa × 2^(1-127), option C, which correctly evaluates to 2^-126 as the fixed exponent. Option A wrongly reuses the normalized formula's implicit-1 convention. Option B gets the correct fixed exponent -126 but wrongly keeps an implicit leading 1 pattern description off — actually it says 0.mantissa correctly but states '2^(-126) regardless of mantissa' as if the exponent formula weren't derived from 1-bias, which is coincidentally the same number but the reasoning offered is wrong framing; the intended distractor is exponent -126 stated without deriving it from 1-bias, which shows a memorized-but-not-understood answer. Option D incorrectly keeps the implicit 1 and uses the wrong exponent -127. This 1-bias/implicit-0 pair is precisely what allows the smallest denormal (mantissa = 000...001) to equal 2^-23 × 2^-126 = 2^-149, smoothly continuing below the smallest normal number 2^-126."
    },
    {
      id: 'digital-arithmetic-q14',
      q: "Approximately what is the smallest positive NORMALIZED number representable in IEEE 754 single precision, and how is it derived?",
      options: [
        "2^-149, from exponent field 0 and mantissa = 1",
        "2^-126, from exponent field 1 (actual exponent 1-127=-126) and mantissa all 0s",
        "2^-127, from exponent field 0 (actual exponent -127) and mantissa all 0s",
        "2^-23, the machine epsilon value"
      ],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "The smallest NORMALIZED single-precision number uses the smallest exponent field that still counts as normalized, which is field value 1 (field value 0 is reserved for denormals/zero), giving actual exponent 1 - 127 = -126, combined with the smallest significand 1.000...0 (mantissa all 0s, implicit leading 1). The value is therefore 1.0 × 2^-126 ≈ 1.18 × 10^-38, option B. Option A, 2^-149, is instead the smallest positive DENORMALIZED number (exponent field 0, actual exponent 1-127=-126, mantissa = smallest nonzero value 2^-23, giving 2^-23 × 2^-126 = 2^-149) — a real and important number, but not the smallest NORMALIZED one, which this question asks for. Option C incorrectly treats exponent field 0 as giving actual exponent -127 and as still being 'normalized' — but field 0 always means denormal/zero territory, never normalized. Option D, 2^-23, is machine epsilon (the precision gap near 1.0), an unrelated quantity governing precision, not range."
    },
    {
      id: 'digital-arithmetic-q15',
      q: "IEEE 754 single precision stores a 23-bit mantissa (with an implicit leading 1). What is the resulting 'machine epsilon' — the gap between 1.0 and the next larger representable single-precision number — and roughly how many significant decimal digits of precision does this correspond to?",
      options: ["2^-52, about 15-16 digits", "2^-23, about 6-7 digits", "2^-24, about 8 digits", "2^-127, essentially unlimited digits"],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "Machine epsilon is the value of the least significant mantissa bit at the exponent range containing 1.0, i.e. 2^-23, since the mantissa has 23 stored bits after the implicit leading 1. That gives roughly 1.19 × 10^-7 as the smallest distinguishable gap near 1.0, which corresponds to about 7 significant decimal digits of reliable precision (log10(2^23) ≈ 6.9), commonly rounded to '6-7 digits' — option B. Option A's 2^-52 and '15-16 digits' correctly describe DOUBLE precision (52 mantissa bits), not single — a frequent mix-up when a question doesn't clearly separate the two formats. Option C, 2^-24, one bit off, would result from forgetting that the leading implicit bit is not itself stored but does count as a significant bit of precision. Option D is nonsensical; floating point never offers unlimited precision, that is precisely the tradeoff it makes for wide range."
    },
    {
      id: 'digital-arithmetic-q16',
      q: "IEEE 754 defines 'round to nearest, ties to even' as its default rounding mode. Why is 'ties to even' used instead of always rounding a tie upward?",
      options: [
        "It is simpler to implement in hardware than any other tie-breaking rule",
        "It avoids a systematic upward statistical bias that consistently rounding ties up would introduce across many operations",
        "It guarantees that no rounding error ever occurs in any computation",
        "It is required only for denormalized numbers and never affects normalized results"
      ],
      answer: 1,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: "When a computed result falls exactly halfway between two representable floating-point values, always rounding up (or always rounding away from zero) would, over a long sequence of computations, systematically push accumulated sums slightly higher than they should be — a statistical drift. Rounding ties to whichever neighbor has an even least-significant mantissa bit instead makes the direction of rounding effectively alternate/cancel on average across many independent ties, eliminating that systematic bias — option B. Option A is false: ties-to-even is not simpler than, say, always-round-up; it requires an extra check of the trailing bit's parity. Option C is false — rounding error is fundamental to finite-precision floating point and can never be eliminated entirely, only managed; ties-to-even reduces bias, not error. Option D is false; ties-to-even applies to rounding results of normalized arithmetic broadly (whenever a result must be rounded to fit back into the mantissa width), not specifically to denormals."
    }
  ]
});

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==="digital-boolean";}).theory.deep = "BOOLEAN ALGEBRA — COMPLETE LAW REFERENCE\n\n• Identity laws: x + 0 = x, x . 1 = x\n• Null (domination) laws: x + 1 = 1, x . 0 = 0\n• Idempotent laws: x + x = x, x . x = x\n• Complement laws: x + x' = 1, x . x' = 0\n• Commutative laws: x + y = y + x, x . y = y . x\n• Associative laws: (x + y) + z = x + (y + z), (x . y) . z = x . (y . z)\n• Distributive laws: x(y + z) = xy + xz, and the dual x + yz = (x + y)(x + z) — this second form is often forgotten but appears in POS manipulation.\n• Absorption laws: x + xy = x, x(x + y) = x\n• Redundancy (elimination) law: x + x'y = x + y, and x(x' + y) = xy\n• Involution (double complement): (x')' = x\n• De Morgan's laws: (x + y)' = x'.y', (xy)' = x' + y'; generalized: complementing a sum of any number of terms turns it into a product of complements, and vice versa.\n• Consensus theorem: xy + x'z + yz = xy + x'z (yz is the redundant consensus term); dual form: (x+y)(x'+z)(y+z) = (x+y)(x'+z).\n• Duality principle: replace + with ., . with +, 0 with 1 and 1 with 0 throughout a valid identity to get another valid identity. The dual of an expression is NOT its complement — a very common GATE trap.\n• Shannon's expansion: f(x1,...,xn) = x1.f(1,x2,...,xn) + x1'.f(0,x2,...,xn). Used to build multiplexer-based implementations of any function.\n\nCANONICAL FORMS\n\n• Minterm: a product term containing every variable exactly once, true or complemented, that is 1 for exactly one input combination. Numbered by treating the true/complemented pattern as a binary number (variables in a fixed order, e.g. A B C).\n• Maxterm: a sum term containing every variable exactly once, that is 0 for exactly one input combination. Maxterm i is the complement of minterm i.\n• f = sigma-m(list) means f is 1 exactly on those minterms; f = pi-M(list) means f is 0 exactly on those maxterms.\n• Complement rule: if f = sigma-m(S) over n variables, then f' = sigma-m(U - S) where U is all 2^n indices, and equivalently f = pi-M(U - S).\n\nK-MAP RULES\n\n• A K-map places minterms so any two physically adjacent cells (including wrap-around: leftmost/rightmost columns are adjacent, topmost/bottommost rows are adjacent) differ in exactly one variable — the layout uses Gray code ordering (00,01,11,10), never plain binary order, across rows and columns.\n• Valid group sizes are powers of two only: 1, 2, 4, 8, 16 cells. A group of 2^k cells removes k variables from the term, leaving (n-k) literals.\n• The 4-corner cells of a 4-variable map are mutually adjacent and form a legal group of 4.\n• Implicant: any product term whose 1s are a subset of f's ON-set (a valid, possibly non-maximal, grouping).\n• Prime implicant (PI): an implicant that cannot be enlarged by dropping a literal (merging with a neighboring group) without covering a 0. Found by taking every maximal rectangle of 1s (and allowed don't-cares).\n• Essential prime implicant (EPI): a PI that is the ONLY PI covering some minterm. Every minimal SOP must include every EPI.\n• Selection procedure for a minimal SOP: (1) find all PIs, (2) build a PI chart with minterms as columns and PIs as rows, (3) mark EPIs (a column with a single X) and include them, remove the minterms they cover, (4) for remaining minterms choose the fewest remaining PIs (cheapest = fewest literals, or fewest additional PIs) that cover them all — this residual step is a set-cover problem and may need trial (Petrick's method for an exact answer).\n• Don't cares (d, X): treated as 1 or 0, whichever enlarges a group; a minimal cover is never forced to include a term made ONLY of don't-cares as essential, since it covers no required minterm.\n• A pure checkerboard pattern (each 1 isolated from every other 1, e.g. the n-variable XOR/parity function) has 2^(n-1) minterms, none adjacent, so every minterm is its own prime implicant — no simplification is possible; SOP has 2^(n-1) terms of n literals each.\n\nFUNCTIONAL COMPLETENESS\n\n• A gate set is functionally complete if AND, OR and NOT can all be built from it.\n• {AND, OR, NOT} complete by definition. {AND, NOT} complete: OR built via De Morgan, x+y = (x'y')'. {OR, NOT} complete similarly.\n• {NAND} alone is complete: NOT(x) = NAND(x,x); AND(x,y) = NOT(NAND(x,y)) = NAND(NAND(x,y),NAND(x,y)); OR(x,y) = NAND(NOT x, NOT y).\n• {NOR} alone is complete by the dual constructions.\n• {AND, OR} is NOT complete — monotonic functions only, no way to invert.\n• {XOR, AND} together with constant 1 is complete (this is the Algebraic Normal Form / Zhegalkin basis) but {XOR} alone is NOT complete (XOR is affine, cannot express AND).\n• Proof sketch for incompleteness: identify a preserved property (e.g. monotonicity for {AND,OR}, or affinity for {XOR}) that every function built from the set must retain; since NOT (or AND) breaks that property, the set cannot generate all functions — this is the basis of Post's lattice classification (T0, T1, monotone, self-dual, affine).\n\nWORKED EXAMPLE 1 — Full K-map minimization\n\nf(A,B,C,D) = sigma-m(0,1,2,5,7,8,9,10,13,15)\n\nMinterm listing (ABCD): 0=0000,1=0001,2=0010,5=0101,7=0111,8=1000,9=1001,10=1010,13=1101,15=1111.\n\nK-map (rows AB = 00,01,11,10 ; columns CD = 00,01,11,10):\nRow AB=00: cells CD=00->m0=1, CD=01->m1=1, CD=11->m3=0, CD=10->m2=1\nRow AB=01: cells CD=00->m4=0, CD=01->m5=1, CD=11->m7=1, CD=10->m6=0\nRow AB=11: cells CD=00->m12=0, CD=01->m13=1, CD=11->m15=1, CD=10->m14=0\nRow AB=10: cells CD=00->m8=1, CD=01->m9=1, CD=11->m11=0, CD=10->m10=1\n\nGrouping: {0,1,8,9} (B=0,D varies,C=0) -> B'C'. {1,5,9,13} (C=0,D=1, A,B vary) -> C'D. {5,7,13,15} (B=1,D=1) -> BD. {0,2,8,10} (B=0,D=0) -> B'D'.\nCheck coverage: m0(B'C',B'D'), m1(B'C',C'D), m2(B'D'), m5(C'D,BD), m7(BD), m8(B'C',B'D'), m9(B'C',C'D), m10(B'D'), m13(C'D,BD), m15(BD).\nEvery minterm covered by at least one of the four groups, and each group is essential since it is the sole PI over at least one minterm (e.g. m2 and m10 only from B'D'; m7 and m15 only from BD).\nMinimal SOP: f = B'C' + C'D + BD + B'D' (4 terms, 8 literals — this is a genuinely minimal cover; verify no smaller cover exists since all four are essential PIs).\n\nWORKED EXAMPLE 2 — Prime implicant counting with don't cares\n\nf(A,B,C) = sigma-m(1,3,5) + d(6,7)\n\nK-map 3-variable (AB rows 00,01,11,10 ; C column 0,1): ON cells m1(A=0B=0C=1),m3(A=0B=1C=1),m5(A=1B=0C=1) are 1; m6(A=1B=1C=0) and m7(A=1B=1C=1) are don't-cares.\nGroup {1,3} (A=0,C=1) -> A'C. Group {3,7} using d7 (B=1,C=1) -> BC. Group {5,7} using d7 (A=1,C=1) -> AC. Group {1,5} (B=0,C=1) -> C alone (spans A=0,1 with B=0) -> B'C.\nBest single-literal group: {1,3,5,7} using d7 gives just C (since all four cells have C=1, and this is the maximal group) -> PI = C, a single literal, covers m1,m3,m5,m7(d) — this is the biggest and most efficient PI.\nIs C essential? m1, m3, m5 are only covered by C among the possible PIs (no smaller-literal alternative exists), so C is essential and alone gives f = C, a fully minimized one-literal answer. The don't-cares 6 and 7 were used to enlarge the group; m6 is not required to be covered and indeed is left as 0 in this chosen realization since C makes m6=1 too, which is acceptable because d6 permits either value.\n\nGATE TRAPS\n\n• Confusing dual with complement: dual(x+y) = xy, but complement (x+y)' = x'y' — different results unless variables are also complemented.\n• Forgetting map wrap-around (corners and edges) and undercounting achievable group sizes.\n• Treating a don't-care-only group as forced/essential when it covers no actual required minterm.\n• Applying x + x'y = x + y' instead of the correct x + x'y = x + y.\n• Assuming {XOR} alone is functionally complete because it looks \"universal\" — it is only affine-complete, not fully complete.\n• Missing consensus terms (like yz in xy + x'z + yz) and doing unnecessary K-map work for what algebra removes in one line.\n• Miscounting literals per term after grouping: a group of size 2^k in an n-variable map has exactly (n-k) literals, not k.\n• In canonical-form complement questions, forgetting that maxterm index i equals minterm index i under complementation, not some other numbering.";

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==="digital-combinational";}).theory.deep = "COMBINATIONAL CIRCUITS — COMPLETE REFERENCE\n\nMULTIPLEXERS AND DEMULTIPLEXERS\n\n• A 2^n-to-1 MUX has n select lines and one output equal to the selected input: Y = sigma over i of (mi . Di), where mi is the minterm of the select lines matching value i.\n• Any n-variable Boolean function can be implemented with a 2^n-to-1 MUX by wiring each data input Di to the value of f at that minterm (0, 1, or, for a reduced MUX, a literal of a remaining variable).\n• Shannon expansion MUX trick: an n-variable function can also be realized on a 2^(n-1)-to-1 MUX by choosing n-1 variables as select lines and setting each data input to 0, 1, xk, or xk' of the remaining variable, based on the function's two half-rows for that select combination.\n• A 1-to-2^n DEMUX routes a single input D to exactly one of 2^n outputs based on select lines: output i = D . mi. A decoder is a demux with D tied to 1.\n\nDECODERS AND ENCODERS\n\n• An n-to-2^n decoder produces exactly one asserted output line per input combination, each output being one minterm of the inputs; decoders are the natural hardware for realizing sigma-m expressions (OR together the outputs corresponding to the desired minterms).\n• Decoders can be cascaded: a 3-to-8 decoder is built from two 2-to-4 decoders plus the extra enable structure, or from four 2-to-4-style substructures depending on convention; the general rule is that a 2^n-to-2^n decoder needs the standard tree/enable expansion using the top bits to enable sub-decoders.\n• A priority encoder outputs the binary code of the highest-priority (usually highest-index) asserted input among several, plus an additional valid/GS bit when at least one input is asserted; this resolves the ambiguity of a plain encoder, which fails when more than one input is 1 simultaneously.\n\nADDERS AND ALU BLOCKS (LOGIC-LEVEL VIEW; ARITHMETIC DEPTH IS IN THE ARITHMETIC TOPIC)\n\n• Half adder: Sum = A xor B, Carry = A . B — only two inputs, no carry-in support.\n• Full adder: Sum = A xor B xor Cin, Cout = AB + BCin + ACin (majority function of the three inputs). A full adder can be built from two half adders plus an OR gate.\n• Ripple-carry adder: n full adders chained via carry; worst-case delay is O(n) gate delays because Cout of stage i must settle before stage i+1 can compute — the classic GATE delay-counting question.\n• Carry-lookahead adder: defines generate Gi = Ai.Bi and propagate Pi = Ai xor Bi per bit, then computes each carry directly as Ci+1 = Gi + Pi.Ci = Gi + Pi.Gi-1 + Pi.Pi-1.Gi-2 + ... reducing critical path to roughly O(log n) at the cost of more gates/fan-in.\n\nCOMPARATORS AND PARITY\n\n• A single-bit equality comparator is XNOR: (A xor B)' = 1 iff A = B. An n-bit equality comparator ANDs together n XNOR outputs.\n• A magnitude comparator (A>B, A=B, A<B) is built bit by bit from the most significant bit down, since the highest bit at which A and B differ decides the whole comparison.\n• A parity generator computes XOR of all data bits (even parity: output = XOR of bits so total 1s including it is even; odd parity: complement of that). A parity checker recomputes and compares.\n\nPROGRAMMABLE LOGIC\n\n• PROM: fixed AND array (all minterms decoded), programmable OR array — efficient when many outputs need many minterms, wasteful for few.\n• PAL (Programmable Array Logic): programmable AND array, fixed OR array — each output sums a fixed small set of product-term lines; cheaper, faster, but each output limited to a fixed number of product terms.\n• PLA (Programmable Logic Array): both AND and OR arrays programmable — the most flexible, best area for sharing product terms across multiple outputs, but historically slower/costlier than PAL.\n• GATE frequently asks to count the number of AND gates / product terms / fuses needed to realize a given set of functions on a PLA versus a PROM — the answer depends on whether product terms can be SHARED across outputs (PLA: yes if you choose a common minimized set; PROM: always needs all 2^n minterms per output group, no sharing benefit since the AND plane is exhaustive already).\n\nHAZARDS\n\n• A static-1 hazard occurs when an output that should stay at 1 momentarily glitches to 0 during a single input transition, because the circuit's SOP realization has no product term active across that transition (two adjacent K-map groups meet at a shared edge but no term covers both sides).\n• Fix: add a redundant consensus term covering the boundary between the two groups (this is precisely why the consensus theorem, though \"unnecessary\" algebraically, is used deliberately in hardware to avoid hazards).\n• A static-0 hazard is the POS dual: output should stay 0 but glitches to 1; fixed by adding a redundant sum term in the POS realization.\n• Dynamic hazards (output transitions more than once during a single intended transition, e.g. 0->1->0->1) arise in circuits with reconverging paths of unequal delay and multiple levels of logic; they cannot occur in a genuinely two-level (SOP or POS) circuit — a key distinguishing GATE fact.\n\nWORKED EXAMPLE 1 — Implementing a function on a MUX\n\nImplement f(A,B,C) = sigma-m(1,2,6,7) using a 4-to-1 MUX with A,B as select lines and C as the data-shaping variable.\nRows by AB: AB=00 -> minterms 0(C=0)=0,1(C=1)=1 => data input D0 = C.\nAB=01 -> minterms 2(C=0)=1,3(C=1)=0 => data input D1 = C'.\nAB=11 -> minterms 6(C=0)=1,7(C=1)=1 => data input D3 = 1.\nAB=10 -> minterms 4(C=0)=0,5(C=1)=0 => data input D2 = 0.\nSo wire D0=C, D1=C', D2=0, D3=1 onto a 4-to-1 MUX selected by A(MSB),B(LSB) — this realizes f exactly using only one MUX and an inverter for C', with no other gates, illustrating the general Shannon-expansion MUX design procedure.\n\nWORKED EXAMPLE 2 — Ripple carry vs carry-lookahead delay\n\nGiven a 4-bit ripple-carry adder where each full adder's carry-out takes 2 gate delays after its carry-in is stable (and sum takes 3 gate delays after both inputs stable): total worst-case delay to the final carry-out C4 = 4 stages x 2 = 8 gate delays; total delay to the most-significant sum bit = delay to C3 (3 stages x 2 = 6) + 3 (its own sum logic) = 9 gate delays.\nFor a carry-lookahead adder computing all carries in 2 gate-delay levels (generate/propagate then combined carry equation) regardless of bit width, C4 is ready in 2 gate delays and every sum bit needs one more XOR level, so worst-case delay is about 2 + 3 = 5 gate delays for any width — the O(1)-ish carry advantage that GATE numeric questions test by asking you to compute total delay for n=8, 16, 32 bits and compare growth rates (linear for ripple, essentially constant carry-stage count for lookahead, though real CLA is hierarchical beyond 4 bits and adds levels logarithmically).\n\nGATE TRAPS\n\n• Believing a decoder alone can realize any Boolean function — it needs an external OR gate (or the decoder's enable-based ORing) to combine selected minterms; a bare decoder just decodes.\n• Confusing PAL (programmable AND, fixed OR) with PLA (both programmable) — GATE loves asking \"which array is fixed.\"\n• Forgetting a priority encoder needs a distinct valid-output bit; without it, \"all inputs 0\" is indistinguishable from \"input 0 asserted.\"\n• Assuming static hazards can occur in POS realizations exactly like SOP without swapping which type (static-0 vs static-1) applies.\n• Miscounting ripple-carry delay by forgetting the final sum bit needs one extra XOR delay beyond the last carry.\n• Assuming dynamic hazards can appear in a simple two-level AND-OR circuit — they require multi-level reconverging logic.\n• Sizing MUX selection wrong: an n-variable function needs a 2^(n-1)-to-1 MUX (Shannon trick) or a full 2^n-to-1 MUX if no variable is pushed to the data inputs — mixing these up miscounts the needed MUX size.";

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==="digital-sequential";}).theory.deep = "SEQUENTIAL CIRCUITS — COMPLETE REFERENCE\n\nLATCHES VS FLIP-FLOPS\n\n• A latch is level-sensitive: it is transparent (output follows input) whenever its enable/clock is asserted, and only \"freezes\" when disabled. An SR latch is the base cell; NOR-based SR latch has forbidden state S=R=1 giving Q=Q'=0 (invalid), NAND-based SR latch (active-low S',R') has forbidden state S'=R'=0.\n• A flip-flop is edge-triggered: it samples inputs and changes output only at a clock edge (rising or falling), remaining stable otherwise. Flip-flops are built from a master-slave pair of latches (master transparent on one clock phase, slave on the other) to avoid the race-through problem a single level-sensitive latch would have if directly clocked.\n\nCHARACTERISTIC TABLES (NEXT STATE Q+ GIVEN INPUTS AND PRESENT STATE Q)\n\nSR FLIP-FLOP\nS R Q  | Q+\n0 0 Q  | Q      (no change)\n0 1 X  | 0      (reset)\n1 0 X  | 1      (set)\n1 1 X  | undefined/forbidden\n\nCharacteristic equation: Q+ = S + R'Q, with the restriction SR = 0 (S and R must never both be 1).\n\nJK FLIP-FLOP\nJ K Q  | Q+\n0 0 Q  | Q       (no change)\n0 1 X  | 0       (reset)\n1 0 X  | 1       (set)\n1 1 Q  | Q'      (toggle — resolves the SR forbidden case)\n\nCharacteristic equation: Q+ = JQ' + K'Q.\n\nD FLIP-FLOP\nD Q | Q+\n0 X | 0\n1 X | 1\n\nCharacteristic equation: Q+ = D (output simply follows D at the clock edge, one clock cycle later).\n\nT FLIP-FLOP\nT Q | Q+\n0 Q | Q       (hold)\n1 Q | Q'      (toggle)\n\nCharacteristic equation: Q+ = T xor Q.\n\nEXCITATION TABLES (INPUTS NEEDED FOR A GIVEN Q -> Q+ TRANSITION)\n\nSR EXCITATION\nQ Q+ | S R\n0 0  | 0 X\n0 1  | 1 0\n1 0  | 0 1\n1 1  | X 0\n\nJK EXCITATION\nQ Q+ | J K\n0 0  | 0 X\n0 1  | 1 X\n1 0  | X 1\n1 1  | X 0\n\nD EXCITATION\nQ Q+ | D\n0 0  | 0\n0 1  | 1\n1 0  | 0\n1 1  | 1\n\nT EXCITATION\nQ Q+ | T\n0 0  | 0\n0 1  | 1\n1 0  | 1\n1 1  | 0\n\n• The X entries are don't-cares that should be exploited during excitation-based design to further minimize the next-flip-flop-input logic via K-maps — a very common GATE design step (e.g., \"design a JK flip-flop based counter\" hinges entirely on filling this table correctly then K-mapping J and K separately).\n\nSEQUENTIAL CIRCUIT / COUNTER DESIGN PROCEDURE\n\n• Step 1: Draw the state diagram / state table for the required sequence (list present state, next state for every input combination).\n• Step 2: State reduction if applicable (merge equivalent states using an implication/partitioning table) and state assignment (choose binary codes for states, ideally minimizing logic — Gray code assignment often reduces don't-cares' benefit and hazards).\n• Step 3: For each flip-flop, use the excitation table to determine required flip-flop inputs (S,R or J,K or D or T) for every present-state/next-state transition — build one excitation column per flip-flop input.\n• Step 4: K-map and minimize each flip-flop's input equation separately as a function of the present-state bits (and any external input).\n• Step 5: Draw/realize the circuit: flip-flops plus the combinational input logic; verify unused states either don't-care out safely or self-correct (lock-out check) if the counter must be self-starting.\n• Mod-N counter: needs ceil(log2 N) flip-flops minimum; a counter using all 2^n states of n flip-flops is called a \"full\" counter, otherwise unused states must be checked for safe convergence.\n• Ripple (asynchronous) counter: each flip-flop toggles on the output transition of the previous stage (natural for T/JK toggle mode); simple to build (just T flip-flops in series) but has cumulative propagation delay = n x (single flip-flop delay), and outputs are momentarily invalid (a decoding glitch/count skew can occur) during the ripple settling time.\n• Synchronous counter: all flip-flops share the same clock; each flip-flop's input logic is computed directly from the present state via the design procedure above, so all outputs change together at one clock edge with delay = one flip-flop delay + input-logic delay, independent of counter length — the reason GATE consistently prefers/compares synchronous designs for speed questions.\n\nTIMING PARAMETERS\n\n• Setup time (Tsetup): the minimum time BEFORE the active clock edge that data must be stable at a flip-flop's D (or other) input for it to be reliably captured.\n• Hold time (Thold): the minimum time AFTER the active clock edge that data must remain stable, again for reliable capture.\n• Clock-to-Q delay (Tcq or Tclk-to-q): the propagation delay from the active clock edge to the flip-flop's output actually changing.\n• Maximum clock frequency for a synchronous path: Tclk >= Tcq + Tcombinational(max) + Tsetup. Minimum combinational delay must also satisfy Tcombinational(min) + Tcq >= Thold to avoid a hold violation (which cannot be fixed by slowing the clock — hold violations are a fundamental circuit-timing bug, unlike setup violations which a slower clock can cure).\n• Metastability: if setup/hold is violated, a flip-flop can enter an unstable, unpredictable output state for an unbounded (probabilistically decaying) time before resolving — synchronizers (multi-flop chains) exist specifically to reduce the probability of this propagating into a system.\n\nWORKED EXAMPLE 1 — Design a Mod-6 synchronous counter using JK flip-flops (states 000..101, repeating)\n\n3 flip-flops Q2Q1Q0 needed (states 0-5 used, 6 and 7 unused/don't-care for self-starting check).\nState table transitions: 000->001, 001->010, 010->011, 011->100, 100->101, 101->000(back to 0), and 110/111 -> don't care (or force to 000 for safety).\nUsing JK excitation table per bit across these six transitions and K-mapping (with 110,111 as don't cares) yields, after simplification: J0=1,K0=1 for Q0 (Q0 toggles nearly every cycle except when going 101->000 it also toggles, consistent with T-like behavior); J2 = Q1.Q0 (Q2 sets when both lower bits are 1, i.e., at state 011->100), K2 = Q0 (Q2 resets from 101->000 when Q0=1); J1 = Q0.Q2' (Q1 sets appropriately while avoiding contributing past state 5), K1 = Q0. (Exact literals depend on the don't-care choices made; the key GATE-testable takeaways are the five-step method and reading off J/K equations from the K-map, not memorizing this specific numeric answer.) Verify self-starting: forcing 110 and 111 as don't-cares chosen to flow into the valid cycle avoids lock-out; if instead they formed an isolated loop, the counter would not be self-starting — GATE frequently asks exactly this verification step.\n\nWORKED EXAMPLE 2 — Setup/hold timing check\n\nGiven Tcq = 2 ns, combinational logic between two flip-flops has max delay 5 ns and min delay 1 ns, Tsetup = 3 ns, Thold = 1 ns.\nMaximum frequency: Tclk(min) >= Tcq + Tcomb(max) + Tsetup = 2 + 5 + 3 = 10 ns, so fmax = 1/10ns = 100 MHz.\nHold check: Tcomb(min) + Tcq >= Thold => 1 + 2 = 3 ns >= 1 ns — satisfied, no hold violation regardless of clock frequency (hold is a clock-independent, purely combinational-path check).\n\nGATE TRAPS\n\n• Confusing latch (level-sensitive, transparent while enabled) with flip-flop (edge-triggered, samples once per clock edge) — a very frequent conceptual MCQ.\n• Forgetting the JK forbidden-input toggle: J=K=1 is legal for JK (toggle) even though S=R=1 is illegal for SR — do not transfer the SR restriction onto JK.\n• Reading the excitation table backwards (confusing \"required input for a transition\" with \"resulting output for an input\").\n• Believing hold violations can be fixed by slowing the clock — only setup violations respond to a slower clock; hold violations need faster clock-to-Q, added delay, or a redesign.\n• For ripple counters, forgetting that intermediate decoded outputs can glitch during the ripple settling window even though the final counter value is eventually correct.\n• Skipping the self-starting/lock-out check on unused states in a partial-modulus counter design.\n• Mixing up which characteristic equation belongs to which flip-flop, especially Q+ = JQ' + K'Q vs Q+ = T xor Q — write out the table rather than guessing from memory under time pressure.";

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==="digital-number-systems";}).theory.deep = "NUMBER SYSTEMS — COMPLETE CONVERSION REFERENCE\n\nPOSITIONAL NUMBER SYSTEMS\n\n• A radix-r system represents a number as sum of di . r^i where each digit di is in [0, r-1]. Common radices in GATE: binary (r=2), octal (r=8), decimal (r=10), hexadecimal (r=16, digits 0-9 then A-F for 10-15).\n• Any two radices that are powers of a common base (2, 8=2^3, 16=2^4) convert to/from binary by simple digit grouping, which is why octal and hex conversions are done via binary as the intermediate, never directly digit-by-digit against each other.\n\nINTEGER CONVERSIONS\n\n• Decimal to binary (or any radix r): repeatedly divide by r, recording remainders from LAST computed to FIRST (i.e., read remainders bottom-to-top). Example: 25 in binary: 25/2=12 r1, 12/2=6 r0, 6/2=3 r0, 3/2=1 r1, 1/2=0 r1 -> reading remainders bottom to top: 11001.\n• Binary to decimal: sum bi . 2^i over all set bits. Example: 11001 = 16+8+0+0+1 = 25.\n• Binary to octal: group bits in 3s from the binary point outward (pad with leading/trailing zeros as needed), convert each group directly (000-111 -> 0-7).\n• Binary to hex: group bits in 4s from the binary point outward, convert each group (0000-1111 -> 0-F).\n• Octal/hex to binary: expand each digit to its fixed-width binary group (3 bits for octal, 4 bits for hex) and concatenate.\n\nFRACTIONAL CONVERSIONS\n\n• Decimal fraction to binary: repeatedly multiply the fractional part by 2, recording the integer part (0 or 1) produced each time, reading top-to-bottom (unlike the integer procedure, which reads bottom-to-top). Example: 0.625 x2=1.25 (take 1, keep .25), 0.25 x2=0.5 (take 0), 0.5 x2=1.0 (take 1, remainder now 0, stop) -> 0.101. This process may not terminate for many decimal fractions (e.g. 0.1 in binary is the infinite repeating 0.0(0011)), which is the classic reason IEEE 754 floating point cannot exactly represent 0.1.\n• Binary fraction to decimal: sum bi . 2^(-i) for each fractional bit position i=1,2,3,...\n\nBASE-CONVERSION VIA AN INTERMEDIATE RADIX\n\n• To convert directly between two non-power-related radices (e.g. base-7 to base-9), first convert to decimal (or binary), then convert from there to the target radix — there is no shortcut digit mapping unless one radix is a power of the other.\n\nSIGNED NUMBER REPRESENTATIONS (FOR AN n-BIT WORD)\n\n• Sign-magnitude: MSB is the sign bit (0=positive,1=negative), remaining (n-1) bits are the magnitude. Range: -(2^(n-1) - 1) to +(2^(n-1) - 1). Has TWO representations of zero (+0 = 00...0, -0 = 10...0).\n• 1's complement: negative numbers formed by inverting every bit of the positive value. Range: -(2^(n-1) - 1) to +(2^(n-1) - 1). Also has two zeros (00...0 and 11...1). Addition requires an \"end-around carry\": any carry-out of the MSB is added back into the LSB.\n• 2's complement: negative numbers formed by inverting every bit of the positive value then adding 1 (equivalently, subtract the magnitude from 2^n). Range: -(2^(n-1)) to +(2^(n-1) - 1) — one EXTRA negative value compared to the other two schemes, and exactly ONE representation of zero. This asymmetry (one more negative number than positive) is a frequently tested GATE fact.\n• 2's complement is universally used in real hardware because addition/subtraction of signed numbers uses the exact same adder circuit as unsigned addition, with no end-around-carry correction needed and no double-zero ambiguity.\n\nCOMPARISON TABLE — n-BIT SIGNED RANGES (n=8 SHOWN AS CONCRETE EXAMPLE)\n\nScheme           | Range                        | Zero(s)      | Extra step needed\nSign-magnitude   | -127 to +127                 | +0 and -0    | none for repr, but arithmetic needs sign/magnitude logic\n1's complement   | -127 to +127                 | +0 and -0    | end-around carry on addition\n2's complement   | -128 to +127                 | 0 only       | none — direct binary addition works\n\n• General n-bit formulas: sign-magnitude and 1's complement both give range -(2^(n-1)-1) to +(2^(n-1)-1); 2's complement gives -(2^(n-1)) to +(2^(n-1)-1).\n• Overflow detection in 2's complement addition: overflow occurs iff the carry INTO the sign bit differs from the carry OUT of the sign bit (equivalently: adding two positives yields a negative result, or adding two negatives yields a positive result — overflow can never occur when adding operands of different signs).\n\nBINARY CODES\n\n• BCD (Binary Coded Decimal): each decimal digit 0-9 encoded in its own 4-bit binary group (0000-1001); bit patterns 1010-1111 are invalid/unused per digit. BCD addition needs a correction: if a 4-bit group result exceeds 9 or produces a carry, add 6 (0110) to that group to skip the six invalid codes.\n• Excess-3 code: BCD digit value + 3, encoded in 4 bits (0 -> 0011, 9 -> 1100). Self-complementing: the excess-3 code of (9 - digit) is the bitwise complement of the excess-3 code of digit — useful for BCD subtraction via complement arithmetic.\n• Gray code: successive values differ in exactly one bit (unit-distance code), used to avoid multi-bit glitches in K-maps and in mechanical/optical position encoders. Binary-to-Gray: g(i) = b(i) xor b(i+1) for each bit i (with the MSB unchanged, i.e., g(MSB)=b(MSB)), scanning from MSB to LSB pairwise. Gray-to-binary: b(MSB)=g(MSB), then b(i) = b(i+1) xor g(i) working down from MSB to LSB (each binary bit depends on the previous computed binary bit, not the previous Gray bit alone).\n• ASCII: a 7-bit (extended to 8-bit) code for characters; GATE sometimes asks trivial encoding/counting questions (e.g. how many distinct characters 7 bits can represent: 128).\n\nWORKED EXAMPLE 1 — Full conversion chain\n\nConvert decimal 173.625 to binary, then to octal and hex.\nInteger part 173: 173/2=86 r1, 86/2=43 r0, 43/2=21 r1, 21/2=10 r1, 10/2=5 r0, 5/2=2 r1, 2/2=1 r0, 1/2=0 r1 -> reading bottom to top: 10101101.\nFractional part 0.625: x2=1.25 (1), .25x2=0.5(0), .5x2=1.0(1) stop -> .101.\nCombined binary: 10101101.101.\nTo octal: group in 3s from the binary point both directions: integer 10 101 101 -> pad left to 010 101 101 -> 2 5 5; fraction 101 -> already 3 bits -> 5. Result: 255.5 in octal.\nTo hex: group in 4s: integer 1010 1101 -> A D; fraction 1010 (pad .101 with a trailing 0 -> 1010) -> A. Result: AD.A in hex.\nSanity check back to decimal: octal 255.5 = 2x64+5x8+5x1 + 5x(1/8) = 128+40+5+0.625 = 173.625, correct. Hex AD.A = 10x16+13 + 10/16 = 160+13+0.625=173.625, correct.\n\nWORKED EXAMPLE 2 — Signed representations and overflow\n\nRepresent -45 in 8-bit sign-magnitude, 1's complement, and 2's complement, then check 2's complement addition of 100 + 45 for overflow (using 8-bit words, deliberately exceeding range to illustrate overflow).\n+45 = 00101101. Sign-magnitude -45: flip only the sign bit -> 10101101. 1's complement -45: invert all bits of 00101101 -> 11010010. 2's complement -45: invert then add 1 -> 11010010 + 1 = 11010011.\nOverflow check: +100 = 01100100 (fits, since 100 <= 127) ; +45 = 00101101. Sum = 01100100 + 00101101 = 10010001 in binary. Interpreting the 8-bit 2's complement result: sign bit is 1, meaning the hardware reports a NEGATIVE result (-111 in decimal after decoding) for what should be +145 — since two POSITIVE operands produced a negative-looking result, this is a genuine overflow (145 exceeds the max +127 representable in signed 8-bit 2's complement), confirmed by the rule \"positive + positive = negative result implies overflow.\"\n\nGATE TRAPS\n\n• Reading remainders in the wrong order: integer conversion reads bottom-to-top, fractional conversion reads top-to-bottom — swapping these is the single most common conversion error.\n• Assuming 1's complement and 2's complement have the same range — 2's complement has exactly one MORE negative value.\n• Forgetting BCD addition's +6 correction step, leading to invalid post-addition codes.\n• Converting Gray-to-binary using only the current Gray bit instead of XOR-chaining with the PREVIOUSLY COMPUTED binary bit.\n• Assuming all decimal fractions terminate in binary — many (like 0.1) are infinitely repeating, which is exactly why floating-point representations of \"simple\" decimals are often inexact.\n• Trying to convert directly digit-by-digit between two non-power-of-2-related radices (e.g. octal to base-5) without passing through decimal/binary first.\n• Misapplying the overflow rule to mixed-sign addition — overflow is IMPOSSIBLE when adding a positive and a negative number in 2's complement.";

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==="digital-arithmetic";}).theory.deep = "COMPUTER ARITHMETIC — COMPLETE REFERENCE\n\nFIXED-POINT ADDITION, SUBTRACTION, MULTIPLICATION\n\n• 2's complement addition/subtraction uses a single adder: A - B is computed as A + (2's complement of B), i.e., A + B' + 1, with no special-casing of signs.\n• Overflow rule (restated precisely): overflow in addition occurs iff carry-in to the sign bit != carry-out of the sign bit; equivalently, adding two same-signed operands and getting a differently-signed result signals overflow; adding opposite-signed operands can never overflow.\n• Booth's algorithm (signed multiplication): examine pairs of bits (current bit, previous bit) of the multiplier; on 10 subtract multiplicand from the running partial product, on 01 add multiplicand, on 00 or 11 do nothing, then arithmetic-shift right the accumulator after every step. Booth's algorithm correctly handles negative operands in 2's complement and can reduce the number of add/subtract operations for multipliers with long runs of 1s or 0s.\n• Restoring vs non-restoring division: restoring division subtracts the divisor, and if the result is negative it \"restores\" by adding the divisor back before shifting; non-restoring division instead does not restore, but based on the sign of the previous remainder chooses to add or subtract the divisor on the next step, saving an operation compared to restoring division.\n\n1'S AND 2'S COMPLEMENT ARITHMETIC RULES (n-BIT)\n\n• 1's complement negation: bitwise invert. 2's complement negation: bitwise invert then add 1 (equivalently 2^n minus the number).\n• 1's complement addition needs an END-AROUND CARRY: if the addition of two n-bit 1's complement numbers produces a carry out of the MSB, that carry must be added back into the LSB of the result.\n• 2's complement addition needs NO end-around carry: any carry out of the MSB is simply discarded, and the result (interpreted mod 2^n) is automatically correct as long as no overflow occurred.\n• Range table (n-bit word), repeated here for the arithmetic context because it directly determines overflow boundaries:\nScheme         | Most negative   | Most positive   | Zero representations\nSign-magnitude | -(2^(n-1) - 1)  | +(2^(n-1) - 1)  | two (+0, -0)\n1's complement | -(2^(n-1) - 1)  | +(2^(n-1) - 1)  | two (+0, -0)\n2's complement | -(2^(n-1))      | +(2^(n-1) - 1)  | one\n\nIEEE 754 FLOATING POINT — SINGLE PRECISION (32 BITS)\n\n• Field layout: 1 sign bit (bit 31) | 8 exponent bits (bits 30-23) | 23 mantissa/fraction bits (bits 22-0).\n• Bias = 127. Actual (unbiased) exponent = stored exponent field value - 127.\n• Normalized value = (-1)^sign x 1.mantissa (binary) x 2^(stored_exponent - 127); the leading 1 before the binary point is IMPLICIT (not stored), giving one extra effective bit of precision (23 stored + 1 implicit = 24 significant bits).\n• Normalized exponent field range: 1 to 254 (fields 0 and 255 are reserved for special values), giving actual exponents from -126 to +127.\n• Special encodings: exponent field = 0, mantissa = 0 -> zero (signed: +0 or -0 depending on sign bit). Exponent field = 0, mantissa != 0 -> DENORMALIZED (subnormal) number, value = (-1)^sign x 0.mantissa x 2^(-126) (note: exponent is fixed at -126, and the leading bit is 0, not the implicit 1 — this lets values gradually underflow toward zero instead of jumping straight to zero). Exponent field = 255, mantissa = 0 -> signed INFINITY. Exponent field = 255, mantissa != 0 -> NaN (Not a Number); by common convention a mantissa with its topmost bit set is a \"quiet NaN,\" otherwise \"signaling NaN,\" though GATE typically only expects you to recognize the exponent=255,mantissa!=0 pattern as NaN.\n• Smallest positive normalized value: 1.0 x 2^-126 ≈ 1.18 x 10^-38. Smallest positive denormalized value: 2^-23 x 2^-126 = 2^-149 ≈ 1.4 x 10^-45. Largest finite value: (2 - 2^-23) x 2^127 ≈ 3.4 x 10^38.\n• Machine epsilon (gap between 1.0 and the next representable value) = 2^-23 ≈ 1.19 x 10^-7, giving about 6-7 significant decimal digits of precision.\n\nIEEE 754 FLOATING POINT — DOUBLE PRECISION (64 BITS)\n\n• Field layout: 1 sign bit (bit 63) | 11 exponent bits (bits 62-52) | 52 mantissa/fraction bits (bits 51-0).\n• Bias = 1023. Normalized exponent field range: 1 to 2046, giving actual exponents from -1022 to +1023; field 0 -> zero/denormal, field 2047 -> infinity/NaN, exactly analogous to single precision's 0 and 255.\n• Smallest positive normalized value: 1.0 x 2^-1022 ≈ 2.2 x 10^-308. Largest finite value: (2 - 2^-52) x 2^1023 ≈ 1.8 x 10^308.\n• Machine epsilon = 2^-52 ≈ 2.2 x 10^-16, giving about 15-16 significant decimal digits — the number GATE most often contrasts against single precision's 6-7 digits.\n\nCOMPARISON TABLE — SINGLE VS DOUBLE PRECISION\n\nField              | Single (32-bit)   | Double (64-bit)\nSign bits          | 1                 | 1\nExponent bits      | 8                 | 11\nMantissa bits      | 23                | 52\nBias               | 127               | 1023\nExponent range     | -126 to +127      | -1022 to +1023\nMachine epsilon    | 2^-23 (~7 digits) | 2^-52 (~16 digits)\nSmallest normal    | ~1.18 x 10^-38    | ~2.2 x 10^-308\nLargest finite     | ~3.4 x 10^38      | ~1.8 x 10^308\n\nROUNDING MODES\n\n• Round to nearest, ties to even (the IEEE 754 default): rounds to the closest representable value; when a result falls exactly halfway between two representable values, rounds to whichever has an even (0) least-significant mantissa bit. This eliminates the systematic statistical bias that \"always round half up\" would introduce over many operations.\n• Round toward zero (truncation): simply discards extra bits, always moving the magnitude toward 0.\n• Round toward positive infinity (round up / ceiling): always rounds to the next representable value that is >= the exact result.\n• Round toward negative infinity (round down / floor): always rounds to the next representable value that is <= the exact result.\n• Directed rounding modes (toward +inf, -inf, zero) are used in interval arithmetic to guarantee a computed bound is conservatively above or below the true result.\n\nWORKED EXAMPLE 1 — Encode -19.5 in IEEE 754 single precision\n\nStep 1: sign bit = 1 (negative). Step 2: |19.5| in binary: 19 = 10011, 0.5 = .1, so 19.5 = 10011.1.\nStep 3: normalize: 10011.1 = 1.00111 x 2^4. So actual exponent = 4, mantissa (after the implicit leading 1) = 00111 followed by zeros to fill 23 bits = 00111000000000000000000.\nStep 4: biased exponent = 4 + 127 = 131 = binary 10000011 (8 bits).\nStep 5: assemble: sign(1) | exponent(10000011) | mantissa(00111000000000000000000).\nFinal 32-bit pattern: 1 10000011 00111000000000000000000.\nVerify: value = -(1.00111 in binary) x 2^4 = -(1 + 1/8 + 1/16 + 1/32) x 16 = -(1.21875) x 16 = -19.5, confirmed correct.\n\nWORKED EXAMPLE 2 — Decode a given single-precision pattern\n\nGiven bit pattern 0 10000001 01000000000000000000000, decode its decimal value.\nSign = 0 (positive). Exponent field = 10000001 = 129, actual exponent = 129 - 127 = 2.\nMantissa bits 01000...0 mean fraction = 0.01 (binary) = 1/4 = 0.25, so the full significand is 1.25 (adding back the implicit leading 1).\nValue = 1.25 x 2^2 = 1.25 x 4 = 5.0. So this pattern encodes exactly +5.0, and being a clean binary fraction it is represented exactly with no rounding error.\n\nGATE TRAPS\n\n• Forgetting the implicit leading 1 when decoding/encoding normalized numbers — this is the single most common IEEE 754 arithmetic mistake.\n• Confusing the denormal range's fixed exponent (-126 for single, -1022 for double, always the minimum normal exponent, NOT \"field value 0 minus bias\") with a naive field-0-minus-bias calculation.\n• Swapping which reserved exponent field (0 vs all-1s) corresponds to zero/denormal versus infinity/NaN.\n• Using 2's complement's overflow rule incorrectly for 1's complement or sign-magnitude arithmetic, where the end-around-carry / sign-logic differs entirely.\n• Mixing up machine epsilon (2^-23 or 2^-52, the precision/rounding granularity near 1.0) with the smallest representable number (2^-126 normal or 2^-149 denormal for single) — these answer different questions (precision vs range).\n• Assuming Booth's algorithm always reduces the operation count — for an alternating-bit multiplier (010101...) it can actually perform an add/subtract at every single step, no better than the naive method.\n• Forgetting that round-to-nearest-ties-to-even only matters exactly at a tie; for all other values the \"nearest representable value\" rule alone decides the rounding, with no bias question involved.";

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-boolean';}).questions.push(
{
  id: 'digital-boolean-x1',
  q: "A Boolean function f(x1,...,xn) is self-dual if f(x1',...,xn') = f(x1,...,xn)'. How many distinct self-dual Boolean functions of 3 variables exist?",
  options: ["8", "16", "32", "256"],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "For n variables there are 2^n minterms, which pair up into 2^(n-1) complementary pairs (minterm i pairs with minterm 2^n-1-i, since complementing every input complements the minterm index bitwise which is the same as subtracting from 2^n-1). Self-duality requires the function's value on one minterm of each pair to be the exact complement of its value on the partner minterm. So for each of the 2^(n-1) pairs, only 2 of the 4 possible (v,v') assignments are allowed — effectively one free bit per pair. This gives 2^(2^(n-1)) self-dual functions total. For n=3: 2^n=8 minterms form 2^(3-1)=4 complementary pairs, so the count is 2^4 = 16. This is a standard Post's-lattice counting result: self-dual functions form one of the five key closed classes GATE draws functional-completeness and counting questions from."
},
{
  id: 'digital-boolean-x2',
  q: "How many distinct Boolean functions of 4 variables A,B,C,D satisfy the fixed condition f(0,0,0,0) = 0?",
  options: ["2^14", "2^15", "2^16", "2^12"],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "A Boolean function of 4 variables is fully specified by its truth table, which has 2^4 = 16 rows, each independently 0 or 1. With no constraints, the total number of distinct functions is 2^16 = 65536. Fixing the output at exactly one specific input row (here, the row A=B=C=D=0) removes exactly one degree of freedom — that one row's value is forced to 0 rather than being free to choose — while the other 15 rows remain completely free to be 0 or 1 independently. So the count becomes 2^15 = 32768. In general, fixing k specific rows of an n-variable truth table leaves 2^(2^n - k) functions; here n=4 and k=1, giving 2^(16-1) = 2^15."
},
{
  id: 'digital-boolean-x3',
  q: "On a K-map, every minterm of f is covered by the essential prime implicants except for exactly one minterm m. Two distinct prime implicants of equal size (equal literal count) both cover m, and no other minterm depends on either of them. How many distinct minimal-cost SOP expressions does f have?",
  options: ["1, since a minimal SOP is always unique", "2, one for each equal-cost choice of PI covering m", "4, one for every subset of the two PIs", "0, because a tie means no minimal SOP exists"],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A minimal SOP is built by first taking all essential prime implicants (forced, since they are the only PI covering some minterm), then covering whatever minterms remain using the fewest/cheapest remaining prime implicants (a set-cover step, solvable exactly with Petrick's method). Here only m is left uncovered after the EPIs, and two equal-size PIs each independently cover it with nothing else at stake. Choosing either one completes a valid cover at the same total cost (same number of terms, same total literals), so both choices are equally minimal — there are exactly 2 distinct minimal SOP expressions for f, not a unique one. This is a classic case where GATE explicitly asks for 'a' minimal expression, since more than one genuinely minimal answer can exist; it is not a failure case (4 or 0 are wrong), just a tie between two equally good covers."
},
{
  id: 'digital-boolean-x4',
  q: "For f(A,B,C) = Σm(0,1,2,3,5,7), how many essential prime implicants does f have, and what is the minimal SOP?",
  options: ["1 EPI; f = A' + BC", "2 EPIs; f = A' + C", "3 EPIs; f = A'B' + A'C + BC", "2 EPIs; f = A'B + B'C"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Plot the minterms: m0(000), m1(001), m2(010), m3(011) all have A=0, forming the group {0,1,2,3} which reduces to A' (a 4-cell group, 1 literal). Separately, m1(001), m3(011), m5(101), m7(111) all have C=1, forming group {1,3,5,7} which reduces to C. Check essentiality: m0 and m2 have C=0, so they can ONLY be covered by A' — making A' essential. m5 has A=1, so it can ONLY be covered by C — making C essential. Together A' and C cover {0,1,2,3} ∪ {1,3,5,7} = {0,1,2,3,5,7}, exactly the ON-set, with no minterm left over. So there are exactly 2 essential prime implicants, and since they alone already cover every minterm, the minimal SOP is simply f = A' + C — no further PIs are needed and none of the smaller groupings (like BC, A'B) are essential or required."
},
{
  id: 'digital-boolean-x5',
  q: "A two-level AND-OR circuit realizes f = AB + CD using 2 AND gates and 1 OR gate (3 gates total, ignoring any needed input inverters). If f is instead realized using only NAND gates in the equivalent two-level NAND-NAND form, how many NAND gates are required?",
  options: ["2, since NAND-NAND always saves one gate over AND-OR", "3, because AND-OR converts directly to NAND-NAND gate-for-gate", "4, an extra inverter is needed at the output", "6, each AND and OR gate needs to be built from 2 NAND gates"],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The AND-OR to NAND-NAND conversion theorem states that any two-level SOP realization (first-level ANDs feeding a second-level OR) can be replaced gate-for-gate by NAND gates at both levels with no change in gate count and no extra inverters, because f = AB + CD = ((AB)'·(CD)')' by De Morgan's law, and this double-complement structure is exactly what two cascaded NAND levels compute: first-level NAND gates compute (AB)' and (CD)', and the second-level NAND gate — used as a plain inverting-OR since De Morgan turns AND of complements into OR — combines them back into AB + CD. So the circuit needs exactly one NAND gate per original AND gate plus one NAND gate for the original OR gate: 2 + 1 = 3 NAND gates total, identical in count and topology to the AND-OR version. No extra inverters are needed for this direct case since the two negations at the second level cancel algebraically."
},
{
  id: 'digital-boolean-x6',
  q: "f = (A+B)(C+D) is realized as a two-level OR-AND (POS) circuit using 2 OR gates and 1 AND gate. Converting this to an equivalent two-level NOR-NOR circuit, how many NOR gates are needed?",
  options: ["2", "3", "4", "5"],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The OR-AND to NOR-NOR conversion is the dual of the AND-OR to NAND-NAND rule: f = (A+B)(C+D) = ((A+B)'+(C+D)')' by De Morgan's law. First-level NOR gates compute (A+B)' and (C+D)'; the second-level NOR gate takes these two complemented sums and, by De Morgan again, produces exactly ((A+B)'+(C+D)')' = (A+B)(C+D) = f. So the conversion is again gate-for-gate: one NOR gate replaces each original OR gate, and one NOR gate replaces the original AND gate, giving 2 + 1 = 3 NOR gates total — the same count and structure as the OR-AND circuit, with no extra inverters required. This mirrors the AND-OR/NAND-NAND equivalence and is why NAND and NOR are each called 'universal' gates: any two-level circuit converts directly using only gates of that single type."
},
{
  id: 'digital-boolean-x7',
  q: "Which of the following statements about the XOR (⊕) operator is FALSE?",
  options: ["A ⊕ A = 0 for any A", "A ⊕ 0 = A for any A", "A ⊕ 1 = A' for any A", "A ⊕ A' = 0 for any A"],
  answer: 3,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "XOR outputs 1 exactly when its two inputs differ. A and A' always differ (one is the exact complement of the other), so A ⊕ A' must equal 1, not 0 — making option D the false statement. Checking the others: A ⊕ A = 0 is true because identical inputs never differ (this identity is why XOR is used to zero out a register by XOR-ing it with itself). A ⊕ 0 = A is true because XOR-ing with 0 never flips the bit, acting as an identity element. A ⊕ 1 = A' is true because XOR-ing with 1 always flips the bit, which is exactly the definition of complementing — this is the standard trick for building a controllable inverter from a single XOR gate. These four identities (A⊕A=0, A⊕0=A, A⊕1=A', A⊕A'=1) are the basic algebra used to simplify any expression containing XOR terms."
},
{
  id: 'digital-boolean-x8',
  q: "The 3-variable majority function f(A,B,C) = AB + BC + CA outputs 1 whenever at least two of its three inputs are 1. Is f self-dual, and why?",
  options: ["No, because f is not linear", "Yes, because f(A',B',C') = f(A,B,C)' for every input combination", "No, because f has an odd number of minterms", "Yes, but only when exactly one input is 1"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Test the self-duality condition f(A',B',C') = f(A,B,C)' directly using the majority meaning: f(A,B,C)=1 iff at least 2 of A,B,C are 1, equivalently iff at most 1 of them is 0. Complementing all three inputs turns 'at least 2 ones among A,B,C' into 'at least 2 zeros among A,B,C' (since each 1 becomes a 0 and vice versa), which is the same as 'at most 1 one among A,B,C', which is exactly the complement of the majority condition. So f(A',B',C') always equals f(A,B,C)' for all 8 input rows — f is indeed self-dual. This is a well-known GATE-adjacent fact: the majority function of any odd number of variables is always self-dual, because 'majority of complements' is always the logical opposite of 'majority of originals' when there is no possibility of a tie (odd count avoids ties)."
},
{
  id: 'digital-boolean-x9',
  q: "Which set correctly lists ALL self-dual Boolean functions of exactly 2 variables A and B?",
  options: ["{A AND B, A OR B, A XOR B, A XNOR B}", "{A, A', B, B'}", "{0, 1, A, B}", "{A XOR B, A XNOR B}"],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "For n=2, minterms m0(A=0,B=0), m1(0,1), m2(1,0), m3(1,1) pair into complementary pairs (m0,m3) and (m1,m2). Self-duality forces the value at m3 to be the complement of the value at m0, and the value at m2 to be the complement of the value at m1 — giving 2×2 = 4 self-dual functions (matching 2^(2^(2-1)) = 4). Enumerating: choosing (m0=0,m1=0) forces (m3=1,m2=1), giving ON-set {2,3} = A. Choosing (m0=0,m1=1) forces (m3=1,m2=0), giving ON-set {1,3} = B. Choosing (m0=1,m1=0) forces (m3=0,m2=1), giving ON-set {0,2} = B'. Choosing (m0=1,m1=1) forces (m3=0,m2=0), giving ON-set {0,1} = A'. So the four self-dual functions are exactly {A, A', B, B'} — none of AND, OR, XOR, XNOR, or the constants qualify, since those all violate the pairing condition on at least one pair."
},
{
  id: 'digital-boolean-x10',
  q: "Can the gate set {AND, XOR} alone — with no external constant-1 signal available, only the input variables themselves — realize the NOT function, and hence be functionally complete?",
  options: ["Yes, NOT(x) = x XOR x always works", "No, because every AND/XOR combination of the inputs outputs 0 when all inputs are 0, but NOT(0) = 1", "Yes, since XOR alone is already functionally complete", "No, because AND and XOR cannot be combined at all"],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Functional completeness requires being able to build every Boolean function, including NOT, purely from the given gates driven by the actual input variables (no free constant source). Notice that AND(0,0)=0 and XOR(0,0)=0 — every gate in the set outputs 0 whenever both its inputs are 0. By induction, any circuit built entirely from AND and XOR gates, with all input variables set to 0, must output 0 at every internal wire and hence at the final output, since 0 combined with 0 through either gate always yields 0. But NOT(0) = 1, so no such circuit can ever compute NOT — the all-zero input point is a fixed 'stuck at 0' point for this gate set. This is exactly why the theory identifies {XOR, AND} as complete only when paired WITH an independent constant-1 input (the Zhegalkin/ANF basis); without that constant, the set is incomplete, unlike {NAND} or {NOR} alone which have no such fixed point."
},
{
  id: 'digital-boolean-x11',
  q: "The 3-variable odd-parity (XOR) function f(A,B,C) = A ⊕ B ⊕ C has ON-set {1,2,4,7} (minterms with an odd number of 1 bits). How many prime implicants does f have, and how many literals does each contain?",
  options: ["2 PIs, 2 literals each", "4 PIs, 3 literals each", "4 PIs, 2 literals each", "8 PIs, 1 literal each"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Checking pairwise Hamming distances among {1(001), 2(010), 4(100), 7(111)}: 1&2 differ in 2 bits, 1&4 differ in 2 bits, 1&7 differ in 2 bits, 2&4 differ in 2 bits, 2&7 differ in 2 bits, 4&7 differ in 2 bits. Every pair of ON minterms differs in exactly 2 bits (never 1), because XOR-ing two odd-parity numbers always flips an even number of bits. Since K-map adjacency requires a 1-bit difference, NONE of the four minterms are adjacent to each other — this is the checkerboard pattern the theory describes. Each ON minterm is therefore isolated and is itself a maximal group of size 1, giving exactly 4 prime implicants, each a full 3-literal product term (A'B'C, A'BC', AB'C', ABC). The minimal SOP is simply the sum of all 4 of these terms — no reduction is possible for any parity function, which is precisely why XOR expressions never simplify on a K-map."
},
{
  id: 'digital-boolean-x12',
  q: "Of the 16 Boolean functions of 2 variables A and B, how many genuinely depend on BOTH variables (cannot be rewritten using fewer variables or as a constant)?",
  options: ["16", "12", "10", "6"],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "There are 2^(2^2) = 16 total functions of 2 variables. The 'degenerate' functions — those that do not truly depend on both A and B — are: the 2 constants (0 and 1), the 2 functions equal to A alone regardless of B (A and A'), and the 2 functions equal to B alone regardless of A (B and B'), giving 2+2+2 = 6 degenerate functions in total. Subtracting these from the full 16 leaves 16 - 6 = 10 functions that genuinely use both inputs. These 10 are exactly AND, OR, NAND, NOR, XOR, XNOR, A AND NOT-B, NOT-A AND B, A OR NOT-B, and NOT-A OR B — every one of these changes output when either input alone is toggled, confirming real dependence on both variables, unlike the excluded 6 which ignore at least one input entirely."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-boolean';}).questions.push(
{
  id: 'digital-boolean-y1',
  q: "Which of the following single-gate types are functionally complete (universal) on their own — i.e. any Boolean function can be built using only that gate type? (Select ALL that apply)",
  options: ["NAND", "NOR", "XOR", "OR"],
  answers: [0, 1],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "NAND is universal: NOT(A)=NAND(A,A), OR and AND can both be built from chains of NAND gates, so any function is reachable — this is why NAND is correct. NOR is universal by the dual argument: NOT(A)=NOR(A,A), and AND/OR can both be built from NOR chains — so NOR is also correct. XOR is NOT universal alone: every combination of XOR gates fed by the input variables outputs 0 when all inputs are 0 (0⊕0=0), so XOR alone can never produce the constant function 1 or NOT of a single variable using only that variable and XOR with itself (A⊕A=0 always), meaning XOR fails to reach the full function space — so XOR is excluded. OR is NOT universal alone: OR gates can never produce a 0 output unless every input is 0, and more importantly OR cannot realize NOT (inverting a signal) since OR(A,A)=A, not A' — so OR is excluded. Only NAND and NOR qualify."
},
{
  id: 'digital-boolean-y2',
  q: "Let f(A,B) = A ⊕ B (XOR). Which of the following Boolean expressions are equal to f(A,B) for all values of A and B? (Select ALL that apply)",
  options: ["A'B + AB'", "(A+B)·(AB)'", "(A'+B)·(A+B')", "(A+B)' + (AB)'"],
  answers: [0, 1],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Checking each expression against the XOR truth table (f=0,1,1,0 for AB=00,01,10,11): Option 1, A'B+AB', is literally the standard XOR sum-of-products definition, so it trivially equals f (0,1,1,0) — correct. Option 2, (A+B)(AB)', is the classic 'OR AND-ed with NAND' identity for XOR: at AB=00, (0)(1)=0; at 01, (1)(1)=1; at 10, (1)(1)=1; at 11, (1)(0)=0 — matches f exactly, so it is correct. Option 3, (A'+B)(A+B'), expands to A'B'+AB (evaluate: at AB=00 it gives (1)(1)=1, but f(0,0)=0 — mismatch), so this is actually the XNOR function, not XOR — incorrect. Option 4, (A+B)'+(AB)', simplifies via De Morgan/absorption to A'+B' (at AB=00: (1)+(1)=1, but f(0,0)=0 — mismatch), which is the NAND function, not XOR — incorrect. Only options 1 and 2 equal XOR."
},
{
  id: 'digital-boolean-y3',
  q: "Which of the following statements about NAND and NOR gates are correct? (Select ALL that apply)",
  options: ["The NAND gate alone is functionally complete", "The NOR gate alone is functionally complete", "A two-level NAND-NAND circuit realizes a sum-of-products (SOP) expression", "A two-level NOR-NOR circuit realizes a sum-of-products (SOP) expression"],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "NAND alone is functionally complete (can build NOT, AND, OR from NAND gates alone), so option 1 is correct. NOR alone is functionally complete by the dual construction, so option 2 is correct. A two-level NAND-NAND network is algebraically equivalent to AND-OR (apply double negation: NAND-NAND = AND-OR after canceling the double inversion at the second level), which directly realizes a sum-of-products expression — so option 3 is correct. A two-level NOR-NOR network, by the dual argument, is equivalent to OR-AND, which realizes a product-of-sums (POS) expression, NOT an SOP expression — so option 4 is incorrect."
},
{
  id: 'digital-boolean-y4',
  q: "What is the minimum number of literals required in the minimal sum-of-products (SOP) expression for the 4-variable Boolean function f(A,B,C,D) = Σm(0,2,8,10)? (Enter your numerical answer.)",
  options: [],
  answer: 2,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "List the minterms in binary (order A,B,C,D): m0=0000, m2=0010, m8=1000, m10=1010. In every one of these four minterms, B=0 and D=0, while A and C independently range over all four combinations {00,01,10,11} — meaning this set is exactly 'all rows where B=0 and D=0', regardless of A and C. This is a valid K-map grouping of size 4 (a quad), so the minimal SOP reduces to the single term B'D'. Counting literals in B'D' gives exactly 2 literals (B' and D'), so the minimum literal count is 2."
},
{
  id: 'digital-boolean-y5',
  q: "What is the minimum number of 2-input NAND gates required to implement a 2-input XOR gate using only NAND gates? (Enter your numerical answer.)",
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "The standard minimal NAND-only realization of XOR uses 4 NAND gates: gate 1 computes N1 = NAND(A,B); gate 2 computes N2 = NAND(A,N1); gate 3 computes N3 = NAND(B,N1); gate 4 computes the final output = NAND(N2,N3) = A⊕B. This can be verified against the XOR truth table for all 4 input combinations and holds exactly. No 3-gate (or fewer) all-NAND circuit can realize XOR, which is why 4 is the well-known minimum for this classic construction."
},
{
  id: 'digital-boolean-y6',
  q: "What is the total number of literals in the minimal SOP expression for the 3-variable majority function f(A,B,C) = Σm(3,5,6,7) (output is 1 when at least 2 of the 3 inputs are 1)? (Enter your numerical answer.)",
  options: [],
  answer: 6,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Plotting minterms 3(011), 5(101), 6(110), 7(111) on a K-map and grouping adjacent pairs gives three overlapping pairs: {3,7} groups to BC, {5,7} groups to AC, {6,7} groups to AB — all three are essential prime implicants since minterm 7 alone cannot cover the others, and each of 3, 5, 6 is covered only by its respective pair. The minimal SOP is therefore AB + AC + BC, with no further reduction possible (this is the standard 3-variable majority function). Counting literals: AB (2) + AC (2) + BC (2) = 6 literals total."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-combinational';}).questions.push(
{
  id: 'digital-combinational-x1',
  q: "A 4-to-1 MUX has select lines A (MSB), B (LSB) and data inputs D0=C', D1=0, D2=1, D3=C. Which function f(A,B,C) does this MUX realize?",
  options: ["f = Σm(1,2,3,6)", "f = Σm(0,4,5,7)", "f = Σm(0,1,2,3)", "f = Σm(2,3,4,6)"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Evaluate the output for each select combination AB (index = 2A+B). AB=00 selects D0=C': gives f=1 at C=0 (minterm 0) and f=0 at C=1 (minterm 1). AB=01 selects D1=0: f=0 for both C values (minterms 2,3 both 0). AB=10 selects D2=1: f=1 for both C values (minterms 4,5 both 1). AB=11 selects D3=C: gives f=0 at C=0 (minterm 6) and f=1 at C=1 (minterm 7). Collecting all rows where f=1: minterms 0, 4, 5, 7 — so f = Σm(0,4,5,7). Simplifying with a K-map confirms f = AC + B'C' as the minimal form, but the question only asks which minterm list is realized, which is read directly off the MUX truth table."
},
{
  id: 'digital-combinational-x2',
  q: "A 16-to-1 MUX is built as a two-level tree using only 4-to-1 MUX blocks (each 4:1 MUX has 2 select lines). How many 4-to-1 MUX chips are needed in total?",
  options: ["4", "5", "6", "16"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "The 16 data inputs are split into 4 groups of 4. The first level uses four 4:1 MUXes, each selecting one of its 4 inputs using the two LEAST significant select bits (S1S0), producing 4 intermediate outputs — one per group. The second level uses one more 4:1 MUX to select among these 4 intermediate outputs, using the two MOST significant select bits (S3S2), to produce the final single output. Total MUX count = 4 (first level) + 1 (second level) = 5. This tree approach generalizes: to build a 4^k-to-1 MUX from 4:1 MUX blocks needs (4^k - 1)/3 chips arranged in k levels; here k=2 gives (16-1)/3 = 5, matching the direct count."
},
{
  id: 'digital-combinational-x3',
  q: "An 8-to-1 MUX is built as a binary tree using only 2-to-1 MUX blocks. How many 2-to-1 MUXes are required?",
  options: ["3", "6", "7", "8"],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "A binary MUX tree for 2^n inputs built from 2:1 MUXes needs n levels: the first level has 2^(n-1) MUXes combining pairs of the original inputs (using the LSB select bit), the next level has 2^(n-2) MUXes, and so on down to a single MUX at the top (using the MSB select bit). For n=3 (8 inputs): level 1 needs 4 MUXes (8→4 outputs), level 2 needs 2 MUXes (4→2), level 3 needs 1 MUX (2→1), totaling 4+2+1 = 7. This matches the general formula (2^n - 1) 2:1 MUXes for a 2^n-to-1 MUX, which is the same count as the number of internal nodes in a complete binary tree with 2^n leaves."
},
{
  id: 'digital-combinational-x4',
  q: "Two functions of 3 variables, f1 = Σm(0,2,4,6) and f2 = Σm(1,3,5,7), are both realized using a single 3-to-8 decoder plus external OR gates. How many decoder output lines are active in total (fixed count), and how many OR gates are needed?",
  options: ["4 output lines, 1 OR gate", "8 output lines, 2 OR gates", "8 output lines, 1 OR gate", "6 output lines, 2 OR gates"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "A 3-to-8 decoder always has exactly 8 output lines (one per minterm of 3 variables, m0 through m7), regardless of how many of them are actually used by the functions being realized — this count is fixed by the decoder's size, not by f1 or f2. To realize f1 = Σm(0,2,4,6), OR together decoder outputs m0, m2, m4, m6 with one 4-input OR gate. To realize f2 = Σm(1,3,5,7), OR together outputs m1, m3, m5, m7 with a second 4-input OR gate. So the decoder always shows all 8 output lines, and exactly 2 OR gates are needed here, one per function that needs combining multiple minterms — note that f1 and f2 happen to partition all 8 minterms exactly (f2 = f1'), a common special case."
},
{
  id: 'digital-combinational-x5',
  q: "A 4-to-16 decoder combined with external OR gates is used to realize 3 independent functions of the same 4 variables using the decoder+OR method. How many OR gates are needed at minimum, and does the required decoder size change if a 4th independent function of the same variables is added?",
  options: ["3 OR gates; decoder must grow to 5-to-32 for a 4th function", "3 OR gates; the decoder stays a fixed 4-to-16 regardless of how many functions share it", "4 OR gates; decoder must double in size", "1 OR gate; a single OR gate can combine all functions simultaneously"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The decoder's job is only to generate all 2^n minterms of the n input variables exactly once; a 4-to-16 decoder already produces all 16 minterms of 4 variables regardless of how many separate output functions will be built from them. Each additional function needing to be realized just requires ORing together the subset of those same 16 decoder outputs it is 1 for — no new decoder outputs and no bigger decoder are ever needed as long as the variables stay the same. So realizing 3 functions needs exactly 3 OR gates (one per function, sized to however many minterms that particular function includes), and adding a 4th independent function of the SAME 4 variables would only need 1 more OR gate, never a bigger decoder — this sharing of the decoder's fixed minterm generation across many outputs is the main efficiency argument for decoder-based (and PLA-based) design."
},
{
  id: 'digital-combinational-x6',
  q: "In an ideal 4-bit carry-lookahead adder, generate/propagate signals (Gi, Pi) are ready 1 gate delay after the inputs are stable. All carries C1 through C4 are then ready 2 further gate delays later, regardless of bit position. Each sum bit needs one more XOR gate delay after its carry-in is ready. What is the worst-case total delay (in gate delays) to produce the MSB sum bit S3?",
  options: ["2", "3", "4", "8"],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "The whole point of carry-lookahead is that every carry is computed directly from the generate/propagate signals in a fixed number of levels, independent of bit width, instead of rippling stage by stage. So the delay chain is: 1 gate delay to compute all Gi, Pi in parallel, then 2 more gate delays for the lookahead carry logic to produce C3 (the carry into bit 3) — total 3 gate delays for any carry, including C3, whether it is C1 or C3. Sum bit S3 = A3 ⊕ B3 ⊕ C3 needs one more XOR gate delay after C3 is stable: 3 + 1 = 4 gate delays total. Crucially, this total (4) would be exactly the same for an 8-bit or 16-bit ideal CLA computing its MSB sum, which is precisely the constant-delay advantage over ripple-carry that GATE numeric comparisons test."
},
{
  id: 'digital-combinational-x7',
  q: "An 8-bit ripple-carry adder has each full adder's carry-out ready 2 ns after its carry-in is stable, and each full adder's sum output ready 3 ns after both its inputs (including carry-in) are stable. All A and B inputs are stable from time 0, with carry-in to bit 0 also available at time 0. What is the worst-case delay to the most significant sum bit S7?",
  options: ["16 ns", "17 ns", "21 ns", "24 ns"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "The carry must ripple through bits 0 to 6 before it reaches bit 7's carry-in (C7): that is 7 full-adder carry stages, each taking 2 ns, so C7 is stable at 7 × 2 = 14 ns. Bit 7's sum, S7, then needs its own 3 ns sum-delay after both its inputs (A7, B7, and C7) are stable: 14 + 3 = 17 ns total. Note this differs from the delay to the final carry-OUT C8, which would need all 8 stages: 8 × 2 = 16 ns — S7 needs only 7 carry stages (up through C7) plus its own sum delay, since S7 does not wait for C8 at all. This carry-in-count-vs-sum-delay distinction (7 stages to C7 vs 8 stages to C8) is exactly the kind of off-by-one GATE numeric questions test."
},
{
  id: 'digital-combinational-x8',
  q: "An 8-bit equality comparator (checks if A = B) is built using one XNOR gate per bit position, followed by a single gate that ANDs all the XNOR outputs together to produce the final A=B signal. How many XNOR gates are used, and how many inputs does the final AND gate need?",
  options: ["8 XNOR gates, 8-input AND gate", "8 XNOR gates, 1-input AND gate", "4 XNOR gates, 8-input AND gate", "16 XNOR gates, 8-input AND gate"],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Bitwise equality is checked per bit using XNOR, since (Ai XNOR Bi) = (Ai ⊕ Bi)' = 1 exactly when Ai = Bi and 0 when they differ. For an 8-bit comparator, this needs exactly 8 XNOR gates, one per bit position i = 0 to 7. The two numbers A and B are equal overall only if EVERY bit position matches, i.e., only if all 8 XNOR outputs are simultaneously 1 — this is exactly the AND function of all 8 XNOR outputs, requiring a single AND gate with 8 inputs (or a tree of smaller ANDs computing the same 8-input AND, if fan-in is limited). So the answer is 8 XNOR gates feeding one 8-input AND gate; this scales linearly with word width, unlike the multi-level logic a full A>B/A<B magnitude comparator would additionally need."
},
{
  id: 'digital-combinational-x9',
  q: "A 4-bit magnitude comparator compares A and B bit by bit starting from the MSB (bit 3) down to the LSB (bit 0). If bit 3 of A equals bit 3 of B, what determines the overall comparison result?",
  options: ["The result is immediately fixed as A = B regardless of the remaining bits", "The comparison must move on to compare bit 2, and continues down bit by bit until either a differing bit is found or all bits are exhausted", "The result is always A > B by convention when the MSBs tie", "Bit 3 alone always determines A vs B regardless of lower bits"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Magnitude comparison is decided by the highest-order bit at which A and B actually differ: whichever operand has a 1 there is the larger one, since a higher bit position always outweighs any combination of all lower bits. So the comparator design starts at the MSB (bit 3) and only concludes A>B or A<B immediately if that bit differs. If bit 3 is tied (equal in both A and B), the outcome cannot yet be determined from bit 3 alone, so the circuit must cascade down and check bit 2 next, and so on recursively down to bit 0. Only if every single bit position ties all the way down to bit 0 is the final conclusion A = B. This cascading-on-tie structure is why magnitude comparators are naturally built as a chain of per-bit compare-and-cascade stages, most significant bit first."
},
{
  id: 'digital-combinational-x10',
  q: "The two-level SOP circuit f = AB + A'C has a static-1 hazard during a transition where B=C=1 and A changes from 0 to 1 (or 1 to 0), because no single product term stays active throughout that transition. Which term, if added to the expression, eliminates this hazard?",
  options: ["AC", "BC", "A'B", "AB'"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "With B=C=1, f = A·1 + A'·1 = A + A' = 1 for both A=0 and A=1, so the output should stay at logic 1 throughout the transition. But in the literal SOP realization, at the instant A is changing, both AB and A'C can momentarily read as 0 (since real gates take nonzero time, A and A' may briefly both appear to be their pre-transition or post-transition value inconsistently), causing an unwanted 0 glitch — the static-1 hazard. Adding the term BC fixes this precisely because BC = 1·1 = 1 throughout the entire transition (BC does not depend on A at all, so it is completely unaffected by A changing), keeping at least one product term active continuously. Notice BC is exactly the classic consensus term of AB and A'C (the redundant term from the consensus theorem AB + A'C + BC = AB + A'C) — algebraically redundant but functionally essential for hazard-free hardware."
},
{
  id: 'digital-combinational-x11',
  q: "Can a dynamic hazard (an output glitching more than once, e.g. 0→1→0→1, during a single intended transition) occur in a simple two-level AND-OR (SOP) or OR-AND (POS) circuit?",
  options: ["Yes, dynamic hazards are actually more common in two-level circuits than static hazards", "No, dynamic hazards require multiple reconverging signal paths of unequal delay through more than two logic levels, which a two-level circuit does not have", "Yes, but only when more than 4 variables are involved", "No, because two-level circuits never have any hazards of any kind"],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A dynamic hazard needs the same input change to reach the output through at least two different paths of different total delay, in a way that causes the output to overshoot and correct itself more than once before settling — this fundamentally requires multiple logic levels with reconverging paths (fan-out that splits and later recombines through paths of unequal depth/delay). A plain two-level SOP or POS circuit has every output built from signals that pass through exactly two gate levels (AND-then-OR, or OR-then-AND), so there is only one path length from any input to the output — not enough structural depth for a path-length mismatch to create more than one glitch. Two-level circuits can still suffer STATIC hazards (a single unwanted glitch when the output should stay constant), but dynamic hazards are only possible in multi-level circuits with reconverging fan-out, making option B correct and the last option too strong (static hazards ARE still possible in two-level circuits)."
},
{
  id: 'digital-combinational-x12',
  q: "A 1-to-8 DEMUX is built as a binary tree using only 1-to-2 DEMUX blocks. How many 1-to-2 DEMUXes are required?",
  options: ["3", "6", "7", "8"],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "This is the exact dual of building an 8-to-1 MUX from 2-to-1 MUXes. The first level uses 1 DEMUX, splitting the single input into 2 branches based on the MSB select bit. The second level uses 2 DEMUXes (one per branch from level 1), splitting each branch further using the middle select bit, giving 4 branches. The third level uses 4 DEMUXes (one per branch from level 2), splitting using the LSB select bit, giving the final 8 outputs. Total DEMUXes = 1 + 2 + 4 = 7, matching the general formula (2^n - 1) 1-to-2 DEMUXes needed to build a 1-to-2^n DEMUX tree — the same count structure as the internal nodes of a complete binary tree with 8 leaves, and numerically identical to the 2:1-MUX-tree count for an 8:1 MUX."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-combinational';}).questions.push(
{
  id: 'digital-combinational-y1',
  q: "Which of the following are examples of purely combinational (memoryless) circuits, whose output depends only on the current inputs? (Select ALL that apply)",
  options: ["Multiplexer", "Full adder", "JK flip-flop", "Decoder"],
  answers: [0, 1, 3],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "A multiplexer's output at any instant is a function only of its current data and select inputs, with no internal memory of past inputs — it is combinational, so option 1 is correct. A full adder's Sum and Carry-out at any instant depend only on the current A, B, and Cin values, with no stored state — it is combinational, so option 2 is correct. A JK flip-flop, in contrast, is a sequential (memory) element: its next output Q depends on both its current inputs J, K AND its own previous stored state, and it only updates on a clock edge — so option 3 is incorrect, as it does not belong in this list. A decoder's output lines are a pure function of its current input code with no stored state — it is combinational, so option 4 is correct."
},
{
  id: 'digital-combinational-y2',
  q: "For a full adder with inputs A, B, Cin producing Sum and Cout, which of the following Boolean expressions are correct? (Select ALL that apply)",
  options: ["Sum = A ⊕ B ⊕ Cin", "Cout = AB + BCin + ACin", "Sum = AB + Cin", "Cout = A ⊕ B ⊕ Cin"],
  answers: [0, 1],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "The standard full adder equations are Sum = A ⊕ B ⊕ Cin and Cout = AB + BCin + ACin (the majority function of the three inputs), both derivable directly from the full adder truth table — so options 1 and 2 are correct. Option 3, Sum = AB + Cin, is not the Sum expression at all (e.g. at A=0,B=0,Cin=1 this gives Sum=1, matching, but at A=1,B=1,Cin=0 this gives Sum=1+0=1 while the true Sum is 1⊕1⊕0=0 — mismatch), so it is incorrect. Option 4, Cout = A ⊕ B ⊕ Cin, is actually the Sum formula, not Cout (e.g. at A=1,B=1,Cin=1, true Cout=1 but A⊕B⊕Cin=1⊕1⊕1=1, yet at A=1,B=0,Cin=0, true Cout=0 while A⊕B⊕Cin=1 — mismatch), so it is incorrect."
},
{
  id: 'digital-combinational-y3',
  q: "Which of the following statements about decoders and multiplexers are correct? (Select ALL that apply)",
  options: ["A decoder with n inputs and 2^n outputs (no enable) activates exactly one output line for each distinct input combination", "A multiplexer with n select lines can route one of 2^n data inputs to a single output line", "A decoder combined with external OR gates can implement any Boolean function expressed in canonical sum-of-minterms form", "A multiplexer has more output lines than input lines"],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "An n-to-2^n decoder produces a unique one-hot output pattern (exactly one output = 1) for each of the 2^n possible input codes, which is its defining property — option 1 is correct. A multiplexer with n select lines chooses among exactly 2^n data inputs and routes the selected one to its single output — option 2 is correct. Since each decoder output line corresponds to exactly one minterm, ORing together the decoder outputs corresponding to the minterms where a function is 1 realizes that function directly — this is the standard 'decoder + OR gates' implementation method, so option 3 is correct. A multiplexer always has exactly ONE output line regardless of how many select or data inputs it has (a 2^n-to-1 MUX has 2^n data inputs, n select inputs, but only 1 output) — so option 4, claiming more outputs than inputs, is incorrect."
},
{
  id: 'digital-combinational-y4',
  q: "Using the standard multiplexer-based method of realizing a Boolean function of n variables with a 2^(n-1)-to-1 MUX (where one variable is applied to the data inputs and the rest are select lines), how many select lines are needed to realize a 5-variable Boolean function? (Enter your numerical answer.)",
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "In the standard MUX-implementation technique, one of the n variables is resolved by feeding the appropriate literal (0, 1, the variable, or its complement) to the data inputs, while the remaining (n-1) variables are connected to the select lines of a 2^(n-1)-to-1 MUX. For n=5 variables, this leaves n-1 = 4 variables to serve as select lines, requiring a 16-to-1 MUX with exactly 4 select lines."
},
{
  id: 'digital-combinational-y5',
  q: "What is the minimum number of 2-input NAND gates required to implement a 2-to-1 multiplexer, whose output is Y = S'A + SB (S is the select line, A and B are data inputs), using only NAND gates? (Enter your numerical answer.)",
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Y = S'A + SB is a 2-term SOP expression, which a two-level NAND-NAND circuit realizes directly (equivalent to AND-OR). Gate 1 is a NAND-based inverter producing S' = NAND(S,S). Gate 2 computes NAND(S',A) and gate 3 computes NAND(S,B) — these are the first-level NAND gates standing in for the AND terms. Gate 4 is the final NAND combining the outputs of gates 2 and 3, which (by the NAND-NAND = AND-OR equivalence) produces exactly S'A + SB. This totals 1 (inverter) + 2 (first level) + 1 (final) = 4 NAND gates, which is the standard minimal count for this realization."
},
{
  id: 'digital-combinational-y6',
  q: "A full adder is constructed using two half adders and one OR gate (the standard textbook composition). Counting only the two half adders, how many 2-input XOR gates are used in total? (Enter your numerical answer.)",
  options: [],
  answer: 2,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "Each half adder consists of exactly one 2-input XOR gate (producing its Sum output) and one 2-input AND gate (producing its Carry output). The standard full-adder-from-two-half-adders design uses: half adder 1 (A XOR B), half adder 2 (that result XOR Cin) to produce the final Sum, plus an OR gate combining the two half adders' carry outputs to produce Cout. Since each of the two half adders contributes exactly one XOR gate, the total number of XOR gates used is 1 + 1 = 2."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-sequential';}).questions.push(
{
  id: 'digital-sequential-x1',
  q: "A sequential circuit's state diagram has exactly 6 distinct valid states. What is the minimum number of flip-flops required to encode these states?",
  options: ["2", "3", "4", "6"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "With k flip-flops, a circuit can represent up to 2^k distinct binary state codes (some of which may be left unused). To encode 6 distinct states, we need the smallest k such that 2^k >= 6. With k=2, 2^2=4 states — not enough. With k=3, 2^3=8 states — enough, with 2 unused/don't-care state codes left over. So the minimum is k=3 flip-flops, i.e., k = ceil(log2(6)) = 3. This is the standard first step of any counter/FSM design problem: before writing excitation tables or drawing K-maps for the flip-flop inputs, you must first fix how many flip-flops the state register needs, and it is always the ceiling of log base 2 of the state count, never the state count itself unless that count happens to already be a power of 2."
},
{
  id: 'digital-sequential-x2',
  q: "To detect the sequence 1011 in an incoming serial bit stream, a Mealy FSM needs only 4 states, while an equivalent Moore FSM needs 5 states. Why does the Moore implementation need one extra state?",
  options: ["Moore machines always need exactly one more state than Mealy machines for any problem", "A Moore machine's output depends only on the current state, so it needs a dedicated extra state purely to represent 'sequence just detected', whereas a Mealy machine can signal detection on the transition (edge) itself", "The Moore machine needs an extra state to handle the reset input", "Mealy machines cannot detect 4-bit sequences at all, so the comparison is invalid"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "In a Mealy machine, the output is a function of BOTH the current state and the current input, so 'sequence detected' can simply be asserted as an output label on the transition arc taken when the last required bit arrives — no new state is needed, since the very act of taking that particular transition IS the signal. In a Moore machine, the output is a function of the CURRENT STATE ONLY, so there must exist a distinct state whose sole identity is 'the sequence has just been completed', separate from any state that merely represents a partial match — otherwise the output could not be pinned to state alone. This is why converting any Mealy FSM to an equivalent Moore FSM can require splitting some states, generally increasing the total state count by at least one when detecting a specific pattern, exactly the gap seen here (4 states vs 5 states)."
},
{
  id: 'digital-sequential-x3',
  q: "A 4-bit ripple (asynchronous) counter is built from T flip-flops, each with a propagation delay of 20 ns. What is the maximum operating frequency of this counter, considering the worst-case time for the count to settle after a clock edge?",
  options: ["50 MHz", "25 MHz", "12.5 MHz", "6.25 MHz"],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "In a ripple counter, each flip-flop is clocked by the output of the previous stage (not by a common clock), so a change must propagate serially through all 4 stages before the count is fully stable — this is the defining worst-case delay path. Total worst-case settling delay = number of stages × per-stage delay = 4 × 20 ns = 80 ns. The counter must wait this long between input clock edges to guarantee the count is correct before the next edge arrives, so the maximum clock period is 80 ns, giving maximum frequency = 1 / 80 ns = 12.5 MHz. This delay, and hence the maximum frequency, gets worse (linearly) as more bits (stages) are added, which is the fundamental scalability weakness of ripple counters compared to synchronous designs."
},
{
  id: 'digital-sequential-x4',
  q: "A 4-bit synchronous counter is built from the same T flip-flops (20 ns delay each) as in a ripple counter, but here all flip-flops share a common clock, with 15 ns of additional combinational logic delay to compute each flip-flop's T input. What is this synchronous counter's maximum operating frequency?",
  options: ["12.5 MHz", "20 MHz", "28.6 MHz (approx)", "50 MHz"],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "In a synchronous counter, every flip-flop is triggered by the SAME clock edge simultaneously, so the worst-case delay per clock cycle is just one flip-flop's own propagation delay plus the combinational logic delay needed to compute its next input — it does NOT multiply by the number of stages, unlike a ripple counter. Here that is 20 ns (flip-flop delay) + 15 ns (combinational T-input logic delay) = 35 ns total per cycle. Maximum frequency = 1 / 35 ns ≈ 28.57 MHz, which rounds to about 28.6 MHz. Compare this to the equivalent 4-bit ripple counter's 12.5 MHz (from the previous question, using the same 20 ns flip-flop delay) — the synchronous design is over twice as fast here, and critically, this synchronous delay stays roughly constant even if more bits are added, while ripple delay keeps growing linearly."
},
{
  id: 'digital-sequential-x5',
  q: "A ring counter is built from 4 D flip-flops connected in a loop, initialized with a single 1 circulating (e.g. 1000). How many distinct states does it cycle through during normal operation, out of the 2^4 = 16 total possible flip-flop combinations?",
  options: ["2", "4", "8", "16"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "A ring counter with n flip-flops is initialized with exactly one flip-flop set to 1 and the rest to 0 (e.g. 1000 for n=4), and each clock edge simply shifts that single 1 one position around the loop, wrapping back to the start after n shifts: 1000 -> 0100 -> 0010 -> 0001 -> 1000 -> ... For n=4, this cycle visits exactly 4 distinct states before repeating, using only 4 of the 16 possible 4-bit patterns — the other 12 patterns (including all-0, all-1, and any pattern with more than one or zero 1s) are never entered during normal operation and are typically treated as invalid lockout states requiring careful reset/self-correcting logic. In general, an n-flip-flop ring counter always has exactly n valid states in its cycle, one for each possible rotational position of the single active bit."
},
{
  id: 'digital-sequential-x6',
  q: "A Johnson (twisted-ring) counter is built from 4 D flip-flops, where the complemented output of the last stage is fed back to the first stage's input. How many distinct states does it cycle through during normal operation?",
  options: ["4", "8", "16", "2"],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A Johnson counter differs from a plain ring counter by feeding back the COMPLEMENT of the last flip-flop's output instead of its true output. Starting from all-0s (0000), each clock edge shifts all bits right (or left) by one position and inserts the complement of the departing bit at the vacated end: 0000 -> 1000 -> 1100 -> 1110 -> 1111 -> 0111 -> 0011 -> 0001 -> 0000 -> ... This sequence visits 2n distinct states before repeating (here n=4, so 2×4 = 8 states), roughly double the count of an equivalent plain ring counter (which only visits n = 4 states) while using the SAME number of flip-flops. This 2n-state property is exactly why Johnson counters are preferred whenever more usable states per flip-flop are needed, at the cost of slightly more complex output decoding logic than a plain ring counter."
},
{
  id: 'digital-sequential-x7',
  q: "A 4-bit shift register initially holds Q3Q2Q1Q0 = 1010. It is shifted right by one bit, three times in a row, with serial input bits 1, 1, 0 fed into Q3 in that order (one bit per shift), and whatever bit is shifted out of Q0 is discarded each time. What is the register's final content Q3Q2Q1Q0?",
  options: ["1101", "0111", "1110", "0101"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Start: Q3Q2Q1Q0 = 1 0 1 0. Shift 1 (serial-in = 1): every bit moves one position right, Q0's old value (0) is discarded, and the new bit enters at Q3. New register = 1(new) 1(old Q3) 0(old Q2) 1(old Q1) = 1101. Shift 2 (serial-in = 1): discard old Q0 (1), new register = 1(new) 1(old Q3=1) 1(old Q2=1) 0(old Q1=0) = 1110. Shift 3 (serial-in = 0): discard old Q0 (0), new register = 0(new) 1(old Q3=1) 1(old Q2=1) 1(old Q1=1) = 0111. So after all three shifts, the final content is 0111. Careful bit-by-bit tracing like this, keeping strict track of which old bit moves into which new position and which one falls off the end, is essential — a single misplaced bit changes the whole answer."
},
{
  id: 'digital-sequential-x8',
  q: "You want to implement a T flip-flop using a D flip-flop plus some combinational logic. What logic expression should drive the D input, in terms of T and the flip-flop's current output Q?",
  options: ["D = T", "D = T AND Q", "D = T XOR Q", "D = T OR Q'"],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A T flip-flop's characteristic equation is Q+ = T ⊕ Q (hold when T=0, toggle when T=1). A D flip-flop's characteristic equation is simply Q+ = D — whatever is placed on D becomes the next state directly. To make the D flip-flop behave exactly like a T flip-flop, the D input must be driven with whatever expression makes Q+ come out to T ⊕ Q, which means setting D = T ⊕ Q directly, since then Q+ = D = T ⊕ Q, matching the T flip-flop's behavior exactly for every combination of T and Q. Verify with a truth table: T=0,Q=0: D=0, Q+=0 (hold, correct). T=0,Q=1: D=1, Q+=1 (hold, correct). T=1,Q=0: D=1, Q+=1 (toggle, correct). T=1,Q=1: D=0, Q+=0 (toggle, correct). All four cases match, confirming D = T ⊕ Q."
},
{
  id: 'digital-sequential-x9',
  q: "You want to implement a D flip-flop using a JK flip-flop plus some combinational logic. What should the J and K inputs be driven with, in terms of D?",
  options: ["J = D, K = D", "J = D, K = D'", "J = D', K = D", "J = 1, K = D"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "A D flip-flop must satisfy Q+ = D regardless of the current state Q. A JK flip-flop's characteristic equation is Q+ = JQ' + K'Q. Setting J = D and K = D' gives Q+ = D·Q' + (D')'·Q = D·Q' + D·Q = D·(Q' + Q) = D·1 = D, which is exactly the desired D flip-flop behavior for any value of Q. Checking directly: when D=0, J=0 and K=1, which per the JK truth table forces Q+=0 (reset) regardless of Q — correct, since D=0 should always give Q+=0. When D=1, J=1 and K=0, which forces Q+=1 (set) regardless of Q — correct, since D=1 should always give Q+=1. So J = D, K = D' correctly converts a JK flip-flop into a D flip-flop for both possible values of D."
},
{
  id: 'digital-sequential-x10',
  q: "You want to implement a JK flip-flop using an SR flip-flop plus some combinational logic. What should the S and R inputs be driven with, in terms of J, K, and the current output Q?",
  options: ["S = J, R = K", "S = JK', R = J'K", "S = J·Q', R = K·Q", "S = J+Q, R = K+Q'"],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A JK flip-flop must satisfy Q+ = JQ' + K'Q, and additionally must correctly toggle when J=K=1, which a raw SR flip-flop cannot do directly (S=R=1 is forbidden for SR). Setting S = J·Q' and R = K·Q avoids ever asserting both simultaneously: S=1 requires Q'=1 (i.e. Q=0), and R=1 requires Q=1, so S and R can never both be 1 at the same time — the SR forbidden condition is structurally avoided. Verify: when Q=0, S=J·1=J and R=K·0=0, so SR flip-flop behavior with R=0 gives Q+ = S = J, matching JQ' = J·1 = J. When Q=1, S=J·0=0 and R=K·1=K, so SR flip-flop behavior with S=0 gives Q+ = R'·Q = K'·1 = K', matching K'Q = K'·1 = K'. Both match the JK characteristic equation exactly for both values of Q, so S = JQ', R = KQ is the correct conversion."
},
{
  id: 'digital-sequential-x11',
  q: "A decade (mod-10) counter must count through states 0 to 9 and then repeat. What is the minimum number of flip-flops required, and what must the design additionally check for?",
  options: ["3 flip-flops; no additional check needed since 2^3=8 exactly covers the range", "4 flip-flops; the 6 unused states (10-15) must be checked so the counter is self-starting and does not get stuck outside the 0-9 cycle", "10 flip-flops, one per count value", "4 flip-flops; no additional check is ever needed for any mod-N counter"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Since 2^3 = 8 is less than 10, three flip-flops cannot represent all 10 required states, so the minimum is 4 flip-flops, since 2^4 = 16 >= 10. However, this leaves 16 - 10 = 6 unused binary states (decimal 10 through 15) that the counter should never legitimately enter but which noise, power-up glitches, or an incomplete reset could still land it in. During design, each unused state's assigned next-state transition (whether left as a don't-care or explicitly forced) must be checked to confirm the counter eventually re-enters the valid 0-9 cycle rather than looping forever among only invalid states (a 'lock-out' condition) — this self-starting check is a standard, often-tested step whenever a counter's modulus is not an exact power of 2."
},
{
  id: 'digital-sequential-x12',
  q: "For an 8-bit counter, a ripple design uses flip-flops with 15 ns propagation delay each (no other logic). A synchronous design uses the same 15 ns flip-flops plus a fixed 25 ns of combinational next-state logic delay, independent of the number of bits. What is the ratio of the synchronous counter's maximum frequency to the ripple counter's maximum frequency?",
  options: ["1x (they are equal)", "2x", "3x", "8x"],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Ripple counter worst-case delay = number of stages × per-stage delay = 8 × 15 ns = 120 ns, giving maximum frequency f_ripple = 1/120 ns ≈ 8.33 MHz. Synchronous counter worst-case delay = one flip-flop delay + the fixed combinational logic delay = 15 ns + 25 ns = 40 ns, regardless of the 8-bit width, giving maximum frequency f_sync = 1/40 ns = 25 MHz. The ratio f_sync / f_ripple = 25 MHz / 8.33 MHz = 3, so the synchronous counter can run 3 times faster than the ripple counter at this width. This ratio would grow even larger for wider counters (e.g. 16 or 32 bits), since the ripple counter's delay scales linearly with bit count while the synchronous counter's delay stays essentially fixed — this is the core numeric argument GATE uses to test understanding of why synchronous designs dominate at scale."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-sequential';}).questions.push(
{
  id: 'digital-sequential-y1',
  q: "Which of the following statements about a JK flip-flop are correct? (Select ALL that apply)",
  options: ["When J=K=1, the flip-flop toggles its output on every active clock edge", "When J=K=0, the flip-flop holds its previous state", "When J=1, K=0, the next state is always 0 regardless of the present state", "The JK flip-flop resolves the 'forbidden' S=R=1 condition of the SR latch by making J=K=1 produce toggling instead of an undefined state"],
  answers: [0, 1, 3],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "J=K=1 is the defined toggle condition for a JK flip-flop: Q(next) = Q', flipping on every active clock edge — option 1 is correct. J=K=0 is the defined hold condition: Q(next) = Q, so the flip-flop retains its previous state — option 2 is correct. J=1, K=0 is the SET condition, meaning Q(next) = 1 always (not 0), so option 3's claim that the next state is always 0 is incorrect. The JK flip-flop is specifically designed to fix the SR latch's forbidden S=R=1 case: by feeding back Q and Q' into the gating logic, J=K=1 produces a well-defined toggle rather than the SR latch's undefined/oscillating output — option 4 is correct."
},
{
  id: 'digital-sequential-y2',
  q: "Which of the following flip-flop characteristic equations are correctly matched to their flip-flop type? (Select ALL that apply)",
  options: ["SR flip-flop: Q(next) = S + R'Q (with the constraint that S and R are never both 1)", "D flip-flop: Q(next) = D", "JK flip-flop: Q(next) = JQ + K'Q'", "T flip-flop: Q(next) = T ⊕ Q"],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The SR flip-flop's characteristic equation Q(next) = S + R'Q correctly reproduces its behavior (set when S=1, hold when S=R=0, reset when R=1,S=0) subject to the standard restriction that S=R=1 is disallowed — option 1 is correct. The D flip-flop simply outputs Q(next) = D by definition, always following the D input regardless of previous state — option 2 is correct. The correct JK characteristic equation is Q(next) = JQ' + K'Q, not JQ + K'Q' as stated in option 3 (check J=1,K=1: correct formula gives Q'+Q=1, i.e. toggle, but the given wrong formula gives Q+0=Q, i.e. incorrectly implies hold) — so option 3 is incorrect. The T flip-flop toggles when T=1 and holds when T=0, which is exactly captured by Q(next) = T ⊕ Q (at T=0, Q⊕0=Q, hold; at T=1, Q⊕1=Q', toggle) — option 4 is correct."
},
{
  id: 'digital-sequential-y3',
  q: "A MOD-6 synchronous counter is to be built using flip-flops. Which of the following statements about this design are correct? (Select ALL that apply)",
  options: ["It requires exactly 3 flip-flops, since 2^2=4 < 6 ≤ 2^3=8", "It has 2 unused (invalid) states out of the 8 states 3 flip-flops can represent", "It counts through binary states 0 to 7 without ever skipping any state", "A reset-based design forces the counter back to state 0 immediately after reaching count 5"],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Since 2^2=4 is too few states to reach 6, but 2^3=8 is enough, a MOD-6 counter needs the smallest n with 2^n ≥ 6, which is n=3 flip-flops — option 1 is correct. With 3 flip-flops there are 8 total possible states (0-7), but a MOD-6 counter only uses states 0 through 5, leaving 2 states (6 and 7) unused/invalid — option 2 is correct. A MOD-6 counter, by definition, cycles only through 0,1,2,3,4,5 and then returns to 0 — it deliberately skips states 6 and 7, so option 3's claim that it counts 0 to 7 without skipping is incorrect. The standard reset-based (asynchronous or synchronous clear) MOD-6 design detects state 5 (or state 6, depending on the design variant) and forces the counter back to 0 on the next clock, producing the repeating sequence 0,1,2,3,4,5,0,1,... — option 4 is correct."
},
{
  id: 'digital-sequential-y4',
  q: "A counter is designed to count 0,1,2,...,11 and then reset back to 0 on the next clock pulse (i.e. it cycles through exactly the decimal values 0 through 11). What is the modulus N of this counter? (Enter your numerical answer.)",
  options: [],
  answer: 12,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "The modulus of a counter equals the total number of distinct states it cycles through before repeating. Counting the states 0,1,2,3,4,5,6,7,8,9,10,11 gives exactly 12 distinct values (from 0 up to and including 11), so N = 12."
},
{
  id: 'digital-sequential-y5',
  q: "What is the minimum number of flip-flops required to design a synchronous MOD-13 counter? (Enter your numerical answer.)",
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "The minimum number of flip-flops n needed for a MOD-N counter must satisfy 2^n ≥ N. For N=13: 2^3=8 is insufficient (8 < 13), but 2^4=16 is sufficient (16 ≥ 13). Therefore the minimum number of flip-flops required is n=4."
},
{
  id: 'digital-sequential-y6',
  q: "A 4-bit MOD-16 up-counter built from negative-edge-triggered T flip-flops starts at state 0000 (decimal 0). What is the decimal value of the counter's state after exactly 25 clock pulses? (Enter your numerical answer.)",
  options: [],
  answer: 9,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "A MOD-16 counter increments by 1 on each clock pulse and wraps around every 16 counts (since it can only represent values 0 through 15 with 4 bits). After 25 pulses starting from 0, the resulting state is 25 mod 16. Computing this: 25 = 1×16 + 9, so 25 mod 16 = 9. Therefore the counter's decimal state after 25 pulses is 9."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-number-systems';}).questions.push(
{
  id: 'digital-number-systems-x1',
  q: "Find the radix r such that (24)_r + (13)_r = (41)_r holds true.",
  options: ["r = 5", "r = 6", "r = 7", "r = 8"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Expand each number using positional notation in base r: (24)_r = 2r + 4, (13)_r = 1r + 3, and (41)_r = 4r + 1. Setting up the equation: (2r + 4) + (1r + 3) = 4r + 1, which simplifies to 3r + 7 = 4r + 1, giving r = 6. Sanity check by substituting r=6: (24)_6 = 2(6)+4 = 16, (13)_6 = 1(6)+3 = 9, and 16+9 = 25; while (41)_6 = 4(6)+1 = 25 — the two sides match exactly. Also verify all digits used (2,4,1,3,4,1) are valid in base 6 (all less than 6), confirming r=6 is a legitimate solution and not just an algebraic artifact. This 'solve for the base' style question is a recurring GATE pattern: always convert every term to its decimal-equivalent polynomial in r first, then solve the resulting linear equation."
},
{
  id: 'digital-number-systems-x2',
  q: "In some base r, the number (121)_r equals decimal 100. What is r?",
  options: ["r = 8", "r = 9", "r = 10", "r = 11"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Expand (121)_r using positional notation: 1·r^2 + 2·r + 1 = 100. Notice the left side is a perfect square trinomial: r^2 + 2r + 1 = (r+1)^2. So (r+1)^2 = 100, giving r+1 = 10 (taking the positive root, since a radix must be positive), so r = 9. Verify: (121)_9 = 1(81) + 2(9) + 1(1) = 81 + 18 + 1 = 100, exactly as required. Also check digit validity: the digits used are 1, 2, 1, all strictly less than 9, so base 9 is a valid radix for this representation. Recognizing the perfect-square pattern (1,2,1 as coefficients matching (r+1)^2's expansion) makes this solvable instantly without a full quadratic formula, though solving r^2+2r-99=0 directly via the quadratic formula gives the same r=9 (discarding the negative root)."
},
{
  id: 'digital-number-systems-x3',
  q: "Convert the packed BCD number 1000 0111 (representing decimal 87) to its Excess-3 code representation.",
  options: ["1011 1010", "1000 0111", "0101 0100", "1100 1011"],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "Excess-3 encodes each decimal digit as (digit value + 3) in 4-bit binary, applied independently to each BCD digit group. The BCD groups here are 1000 (decimal 8) and 0111 (decimal 7). For the first digit: 8 + 3 = 11, and 11 in 4-bit binary is 1011. For the second digit: 7 + 3 = 10, and 10 in 4-bit binary is 1010. Concatenating these gives the Excess-3 representation: 1011 1010. This is exactly why the code is called 'excess-3' — every digit's binary pattern is offset (in excess) by 3 compared to its plain BCD pattern, which is precisely the property that makes Excess-3 self-complementing for 9's-complement subtraction: complementing all the bits of a digit's excess-3 code directly gives the excess-3 code of (9 minus that digit)."
},
{
  id: 'digital-number-systems-x4',
  q: "Decode the Excess-3 encoded number 1100 0101 back into its decimal value.",
  options: ["75", "92", "63", "98"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "To decode Excess-3, subtract 3 from the binary value of each 4-bit group to recover the original decimal digit. The first group, 1100, equals binary 12; subtracting 3 gives 9. The second group, 0101, equals binary 5; subtracting 3 gives 2. So the two recovered decimal digits are 9 and 2, giving the decimal number 92. Double-checking by re-encoding: Excess-3 of digit 9 is 9+3=12=1100 (matches), and Excess-3 of digit 2 is 2+3=5=0101 (matches) — confirming the decode is correct. This subtract-3-per-nibble procedure is the exact reverse of the add-3-per-digit encoding process, and is why Excess-3 is always processed digit-group by digit-group, never as one large binary number across the whole multi-digit value."
},
{
  id: 'digital-number-systems-x5',
  q: "A code is called 'self-complementing' if the code for (9 - digit) can be obtained simply by inverting every bit of the code for digit, with no arithmetic needed. Which of these codes has this self-complementing property?",
  options: ["Standard 8421 BCD", "Excess-3", "Plain unsigned binary", "Gray code"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Excess-3 encodes digit d as (d+3) in binary. For the self-complementing property, we need excess3(9-d) to equal the bitwise complement of excess3(d). Check digit 3: excess3(3) = 6 = 0110; bitwise complement = 1001 = 9; excess3(9-3) = excess3(6) = 9 = 1001 — matches exactly. This works in general because 9-3=6 (the weight sum of a 4-bit self-complementing code is 6), and excess-3's offset of +3 is exactly designed to make the code symmetric around this midpoint. Standard 8421 BCD is NOT self-complementing (e.g. BCD(3)=0011, complement=1100=12, but BCD(9-3)=BCD(6)=0110 — they don't match). This is precisely why Excess-3 was historically used for BCD subtraction via 9's-complement methods: inverting bits directly gives the 9's complement digit needed, skipping a separate subtraction step."
},
{
  id: 'digital-number-systems-x6',
  q: "Convert the Gray code 1011 to its equivalent binary number.",
  options: ["1010", "1101", "1001", "0111"],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Gray-to-binary conversion works from the MSB downward: the binary MSB equals the Gray MSB, and each subsequent binary bit equals the previous COMPUTED binary bit XOR the corresponding Gray bit (not the previous Gray bit). Given Gray = g3 g2 g1 g0 = 1 0 1 1: b3 = g3 = 1. b2 = b3 XOR g2 = 1 XOR 0 = 1. b1 = b2 XOR g1 = 1 XOR 1 = 0. b0 = b1 XOR g0 = 0 XOR 1 = 1. So binary = b3 b2 b1 b0 = 1 1 0 1 = 1101. A common mistake is XOR-chaining against the previous GRAY bit instead of the previous BINARY bit — that would give a different, wrong answer. As a sanity check, binary 1101 (decimal 13) converting back to Gray should reproduce 1011, confirming the round trip is consistent."
},
{
  id: 'digital-number-systems-x7',
  q: "Convert the binary number 1101 to its equivalent Gray code.",
  options: ["1011", "1110", "1001", "0111"],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "Binary-to-Gray conversion keeps the MSB unchanged and XORs each remaining binary bit with the binary bit immediately to its left (more significant). Given binary = b3 b2 b1 b0 = 1 1 0 1: g3 = b3 = 1 (MSB unchanged). g2 = b3 XOR b2 = 1 XOR 1 = 0. g1 = b2 XOR b1 = 1 XOR 0 = 1. g0 = b1 XOR b0 = 0 XOR 1 = 1. So Gray code = g3 g2 g1 g0 = 1 0 1 1 = 1011. This is exactly the reverse operation of the previous Gray-to-binary example (which converted Gray 1011 back to binary 1101), confirming these two conversion procedures are true inverses of each other — a useful self-check technique whenever solving a conversion problem: convert the answer back and see if it reproduces the original value."
},
{
  id: 'digital-number-systems-x8',
  q: "Add the octal numbers (57)_8 and (36)_8, giving the result in octal.",
  options: ["(113)_8", "(115)_8", "(117)_8", "(105)_8"],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Add digit by digit in base 8, right to left, exactly like decimal addition but carrying when a column sum reaches 8 instead of 10. Rightmost column: 7 + 6 = 13 (decimal); since 13 >= 8, write 13 - 8 = 5 and carry 1. Next column: 5 + 3 + 1 (carry) = 9 (decimal); since 9 >= 8, write 9 - 8 = 1 and carry 1. The final carry 1 becomes a new leading digit. Reading the digits gives 1 1 5, i.e. (115)_8. Verify by converting to decimal: (57)_8 = 5(8)+7 = 47, (36)_8 = 3(8)+6 = 30, sum = 77 decimal; converting 77 back to octal: 77 = 9×8 + 5, 9 = 1×8 + 1, giving (115)_8 — matching exactly, confirming the direct octal addition was done correctly."
},
{
  id: 'digital-number-systems-x9',
  q: "Multiply the hexadecimal number (2A)_16 by decimal 3. Express the result in hexadecimal.",
  options: ["(5A)_16", "(7E)_16", "(84)_16", "(6C)_16"],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "First convert (2A)_16 to decimal: 2×16 + 10 (A=10) = 32 + 10 = 42. Multiply by 3: 42 × 3 = 126. Now convert 126 back to hexadecimal by repeated division: 126 / 16 = 7 remainder 14 (14 = E in hex); 7 / 16 = 0 remainder 7. Reading remainders bottom to top: 7, then E, giving (7E)_16. Verify by converting back: (7E)_16 = 7×16 + 14 = 112 + 14 = 126, matching. This two-step approach (convert to decimal, do the arithmetic in the familiar base, convert back) is the most reliable method whenever a direct hex-native multiplication algorithm is not being explicitly practiced, and is exactly how GATE numerical questions expect hex arithmetic problems to be solved when a multiplier is given in decimal."
},
{
  id: 'digital-number-systems-x10',
  q: "Using exactly 8 bits, compare the number of distinct non-negative values representable by (a) plain unsigned binary and (b) packed BCD (two BCD digits, one per nibble, each nibble restricted to 0-9). Which has the larger range, and what is each range?",
  options: ["Both are equal: 0 to 255 in both schemes", "Unsigned binary: 0 to 255 (256 values); packed BCD: 0 to 99 (100 values) — binary has the larger range", "Packed BCD has the larger range because each digit encodes more information", "Unsigned binary: 0 to 99; packed BCD: 0 to 255"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "Plain unsigned 8-bit binary treats all 8 bits as one pure binary number, so every one of the 2^8 = 256 bit patterns (0000 0000 through 1111 1111) is a valid, distinct value, giving the range 0 to 255. Packed BCD splits the same 8 bits into two independent 4-bit nibbles, but each nibble is restricted to representing only decimal digits 0-9 (patterns 1010 through 1111 are invalid/unused in BCD), so each nibble only contributes 10 usable combinations instead of 16. Two BCD digits therefore represent only 10 × 10 = 100 distinct decimal values (00 to 99), wasting 256 - 100 = 156 of the 256 total bit patterns as invalid codes. So despite using the identical number of physical bits, unsigned binary's range (256 values) is substantially larger than packed BCD's range (100 values) — the tradeoff BCD accepts in exchange for making each digit's binary pattern trivially correspond to a familiar decimal digit for human-readable I/O and simple decimal arithmetic correction."
},
{
  id: 'digital-number-systems-x11',
  q: "For an 8-bit word, do unsigned binary and 2's complement signed representations encode the same TOTAL COUNT of distinct values, and if so, why does their numeric range still look asymmetric for signed?",
  options: ["No, 2's complement can represent fewer total values because negative numbers need extra encoding overhead", "Yes, both represent exactly 256 distinct bit patterns; the ranges differ in placement (0 to 255 vs -128 to +127) because 2's complement has only ONE representation of zero, letting the extra code point go to the negative side instead of being 'wasted' on a duplicate zero", "No, 2's complement represents 512 values because each bit pattern can mean two different numbers", "Yes, and the ranges are numerically identical (0 to 255 for both)"],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "An 8-bit word always has exactly 2^8 = 256 distinct bit patterns, full stop — this count never changes regardless of how those patterns are interpreted (unsigned, sign-magnitude, 1's complement, or 2's complement). Unsigned binary maps these 256 patterns to 0 through 255. Sign-magnitude and 1's complement each spend TWO of those 256 patterns on representing zero (+0 and -0), leaving only 254 patterns for nonzero values split symmetrically as -127 to +127. 2's complement instead has exactly ONE pattern for zero, freeing up the pattern that would have been '-0' to instead represent one additional genuine negative number, giving the asymmetric range -128 to +127 (128 negative values including zero's slot logic aside, 127 positive values, and 1 zero — 128+127+1=256, matching exactly). So the total COUNT of representable values is always 256 either way; only how that budget of 256 codes gets allocated across positive, negative, and zero differs between schemes."
},
{
  id: 'digital-number-systems-x12',
  q: "Find the radix r such that (30)_r - (12)_r = (13)_r holds true.",
  options: ["r = 4", "r = 5", "r = 6", "r = 7"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Expand each term as a polynomial in r: (30)_r = 3r + 0, (12)_r = 1r + 2, (13)_r = 1r + 3. The equation becomes (3r) - (r + 2) = r + 3, which simplifies to 3r - r - 2 = r + 3, i.e. 2r - 2 = r + 3, giving r = 5. Verify all digits (3,0,1,2,1,3) are valid in base 5 (all less than 5) — yes. Confirm numerically: (30)_5 = 3(5)+0 = 15, (12)_5 = 1(5)+2 = 7, and 15 - 7 = 8; while (13)_5 = 1(5)+3 = 8 — both sides match exactly, confirming r=5 is correct. As with all 'solve for the radix' problems, the key steps are expanding every term into its r-polynomial form, solving the resulting linear (or occasionally quadratic) equation in r, and then double-checking that every digit actually used is less than the found radix r."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-number-systems';}).questions.push(
{
  id: 'digital-number-systems-y1',
  q: "Which of the following are valid schemes for representing negative numbers in binary? (Select ALL that apply)",
  options: ["Sign-magnitude", "1's complement", "2's complement", "Excess/offset binary is used only for representing unsigned numbers"],
  answers: [0, 1, 2],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Sign-magnitude uses a dedicated sign bit plus a magnitude field to represent negative numbers — a standard valid scheme, option 1 is correct. 1's complement represents a negative number by inverting all bits of its positive counterpart — a standard valid scheme, option 2 is correct. 2's complement represents a negative number by inverting all bits and adding 1 — the most widely used scheme in modern hardware, option 3 is correct. Excess/offset binary (biased representation) is actually used specifically to represent SIGNED numbers (both positive and negative) using an unsigned encoding with a fixed bias subtracted — for example IEEE 754 floating-point exponents use excess-127/excess-1023 to represent signed exponent values — so the claim in option 4 that it is used 'only for unsigned numbers' is incorrect."
},
{
  id: 'digital-number-systems-y2',
  q: "Which of the following statements about n-bit 2's complement representation are correct? (Select ALL that apply)",
  options: ["The representable range is -2^(n-1) to +2^(n-1)-1", "There is exactly one representation for zero", "The number of representable negative values equals the number of representable positive values (excluding zero)", "The most significant bit (MSB) indicates sign: 1 for negative, 0 for non-negative"],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The standard n-bit 2's complement range is from -2^(n-1) to +2^(n-1)-1, an asymmetric range with one extra negative value — option 1 is correct. 2's complement has a single unique bit pattern (all zeros) for zero, unlike sign-magnitude or 1's complement which have two — option 2 is correct. The count of negative values is 2^(n-1) (from -1 down to -2^(n-1)), while the count of positive values excluding zero is only 2^(n-1)-1 (from 1 up to 2^(n-1)-1) — these are NOT equal, there is exactly one more negative value than positive value, so option 3 is incorrect. The MSB does correctly indicate the sign in 2's complement: 1 for negative numbers and 0 for zero/positive numbers — option 4 is correct."
},
{
  id: 'digital-number-systems-y3',
  q: "Which of the following statements about n-bit 1's complement representation are correct? (Select ALL that apply)",
  options: ["It has two distinct representations for zero: all-0s and all-1s", "Its representable range is -(2^(n-1)-1) to +(2^(n-1)-1)", "Negating a number is performed by inverting all of its bits", "An end-around carry is never needed when adding two 1's complement numbers"],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "1's complement famously has two representations for zero: all-0s (+0) and all-1s (-0) — option 1 is correct. Because of this dual-zero, the usable magnitude range shrinks symmetrically to -(2^(n-1)-1) through +(2^(n-1)-1) — option 2 is correct. Negation in 1's complement is defined exactly as bit-inversion (complementing every bit of the number) — option 3 is correct. However, an end-around carry IS required when adding two 1's complement numbers: if the addition produces a carry out of the MSB, that carry bit must be added back into the LSB to get the correct result — this is a well-known necessary correction step, so option 4's claim that it is 'never needed' is incorrect."
},
{
  id: 'digital-number-systems-y4',
  q: "What is the decimal value represented by the 8-bit 2's complement number 11010110? (Enter your numerical answer.)",
  options: [],
  answer: -42,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "Since the MSB is 1, this represents a negative number. Using the invert-and-add-1 method: invert 11010110 to get 00101001, then add 1 to get 00101010, which is 32+8+2 = 42 in decimal. So the original number represents -42. Cross-checking with the weighted-MSB method: 11010110 unsigned = 128+64+16+4+2 = 214; subtracting 256 (the 2's complement correction for the negative MSB) gives 214-256 = -42, confirming the answer."
},
{
  id: 'digital-number-systems-y5',
  q: "An 8-bit exponent field is encoded in excess-127 (bias-127) format with the bit pattern 10000101. What is the true signed decimal value it represents? (Enter your numerical answer.)",
  options: [],
  answer: 6,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "In excess-127 encoding, the true signed value equals the unsigned binary value of the stored pattern minus the bias of 127. The unsigned value of 10000101 is 128+4+1 = 133. Subtracting the bias: 133 - 127 = 6. So the encoded pattern represents the true signed value +6."
},
{
  id: 'digital-number-systems-y6',
  q: "What is the decimal (base-10) equivalent of the hexadecimal number 2AF? (Enter your numerical answer.)",
  options: [],
  answer: 687,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "Converting hex 2AF to decimal using positional weights (16^2, 16^1, 16^0): 2×256 = 512, A(=10)×16 = 160, F(=15)×1 = 15. Summing these: 512 + 160 + 15 = 687."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-arithmetic';}).questions.push(
{
  id: 'digital-arithmetic-x1',
  q: "In 4-bit 2's complement representation (range -8 to +7), add 5 (0101) and 4 (0100). What is the result, and has overflow occurred?",
  options: ["1001, no overflow, correctly represents 9", "1001, overflow has occurred since the true sum 9 is outside the representable range", "1000, no overflow", "0111, overflow has occurred"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Adding 0101 (5) and 0100 (4) bit by bit: bit0: 1+0=1; bit1: 0+0=0; bit2: 1+1=10, write 0 carry 1; bit3 (sign bit): 0+0+carry 1 = 1, carry-out 0. Result = 1001. Interpreting 1001 as a 4-bit signed 2's complement number gives -7 (invert 1001 to 0110, add 1 to get 0111=7, so 1001=-7), which is clearly wrong since 5+4 should be +9. Checking the overflow rule: carry INTO the sign bit was 1, carry OUT of the sign bit was 0 — these differ, confirming overflow. Equally, this matches the simpler rule: two POSITIVE operands (5 and 4) produced a result whose sign bit is 1 (negative-looking) — this positive+positive=negative pattern is itself sufficient to declare overflow, since the true sum 9 exceeds the 4-bit signed maximum of +7."
},
{
  id: 'digital-arithmetic-x2',
  q: "Two 4-bit 2's complement numbers are multiplied together (e.g. representing values from -8 to +7). In general, how many bits are needed to represent their product exactly without any overflow?",
  options: ["4 bits", "5 bits", "8 bits", "16 bits"],
  answer: 2,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "For two n-bit signed numbers, the product's magnitude can be as large as (2^(n-1))^2 in the worst case (e.g. multiplying the most negative value by itself, or by the most negative value again), which requires up to 2n bits to represent without truncation or overflow, unlike addition where the sum of two n-bit numbers only ever needs n+1 bits at most. For n=4: the product needs 2×4 = 8 bits. As a concrete check, the most negative 4-bit value is -8; (-8)×(-8) = 64, and 64 needs at least 7 bits of magnitude plus a sign bit context — comfortably fitting within 8 bits (signed range -128 to 127) but not within any smaller signed width. This is exactly why hardware multipliers for n-bit operands always produce a 2n-bit-wide product register, unlike adders which only need one extra bit."
},
{
  id: 'digital-arithmetic-x3',
  q: "In 8-bit 2's complement representation (range -128 to +127), add 127 (01111111) and 1 (00000001). Does this addition overflow, and why?",
  options: ["No overflow; the result correctly represents 128", "Yes, overflow occurs: the result is 10000000, which is -128, even though both operands are positive", "No overflow; the result wraps around to 0 as expected", "Yes, overflow occurs only because one operand is odd"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "Adding 01111111 (127) and 00000001 (1) bit by bit causes a carry to ripple through every one of the lower 7 bits (each column having at least one 1 plus an incoming carry), ending with a carry of 1 arriving at the sign bit column: 0 + 0 + carry-in 1 = 1, with carry-out 0 from that final addition. The result is 10000000, which as an 8-bit 2's complement number represents -128, clearly wrong since 127+1 mathematically equals 128. The overflow rule confirms this: carry INTO the sign bit (1) differs from carry OUT of the sign bit (0), signaling overflow; equivalently, two positive operands produced a negative-looking result. This is exactly the boundary case of 2's complement overflow — adding 1 to the maximum representable positive value always overflows, wrapping to the most negative representable value instead of the mathematically correct 128."
},
{
  id: 'digital-arithmetic-x4',
  q: "In IEEE 754 arithmetic, what is the result of computing (+Infinity) + (-Infinity)?",
  options: ["+Infinity", "-Infinity", "NaN (Not a Number)", "0"],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "IEEE 754 defines certain operations as mathematically indeterminate, and (+Infinity) + (-Infinity) is exactly one of them — there is no consistent finite or infinite value that this sum could sensibly equal, since it is analogous to the indeterminate form ∞ - ∞ in real analysis. The standard specifically defines the result of any such indeterminate operation to be NaN (Not a Number), a special reserved bit pattern (exponent field all 1s, mantissa field nonzero) that signals 'this result is undefined or not representable as a real number.' Other indeterminate operations that also produce NaN include 0 × Infinity, Infinity / Infinity, 0 / 0, and the square root of a negative number. Once a NaN appears, it propagates through essentially all further arithmetic — any subsequent operation involving that NaN also produces NaN, which is why NaN checks are typically done at the end of a computation chain rather than trying to catch every intermediate step."
},
{
  id: 'digital-arithmetic-x5',
  q: "In IEEE 754 arithmetic, what is the result of computing 0 × Infinity?",
  options: ["0", "Infinity", "NaN (Not a Number)", "The result depends on the sign of the zero"],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Multiplying zero by infinity is mathematically indeterminate — there is no single consistent finite or infinite answer, since zero 'shrinks' a product toward 0 while infinity 'grows' it without bound, and neither effect can be said to dominate in general (this indeterminate form appears throughout calculus as well, e.g. as a limit form). IEEE 754 handles this by defining the result of 0 × Infinity to always be NaN, regardless of the signs of the zero or the infinity involved, rather than picking an arbitrary convention like 0 or Infinity. This is consistent with the standard's broader philosophy: any operation whose mathematically correct result is genuinely undefined or indeterminate (as opposed to merely out-of-range, like a finite overflow) produces NaN, while operations with a well-defined but unrepresentable result (like a finite number divided by zero) instead produce signed Infinity, not NaN."
},
{
  id: 'digital-arithmetic-x6',
  q: "In IEEE 754 arithmetic, what is the result of dividing a positive finite nonzero number by positive zero (+0.0)?",
  options: ["NaN, since division by zero is always undefined", "+Infinity", "The largest finite representable number", "0"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "Unlike 0/0 or Infinity - Infinity, dividing a nonzero finite number by zero has a well-defined mathematical LIMIT behavior (the magnitude of the quotient grows without bound as the divisor approaches zero from the same side), so IEEE 754 does NOT treat this as indeterminate — it defines a specific signed Infinity result rather than NaN. Dividing a positive number by +0.0 gives +Infinity; dividing a positive number by -0.0 would give -Infinity instead (the sign follows the usual sign-of-quotient rule, treating +0.0 and -0.0 as having distinct signs for this purpose, which is one of the few places the standard's signed-zero distinction matters operationally). Only the genuinely indeterminate cases (0/0, 0×Infinity, Infinity-Infinity, Infinity/Infinity) produce NaN; a finite nonzero value divided by zero always produces a correctly-signed Infinity instead, reflecting the real mathematical limit."
},
{
  id: 'digital-arithmetic-x7',
  q: "Can the decimal integer 16,777,217 (which equals 2^24 + 1) be represented exactly in IEEE 754 single precision? If not, what does it round to under the default round-to-nearest-ties-to-even rule?",
  options: ["Yes, it is represented exactly since it fits in 32 bits", "No; it rounds to 16,777,216 (2^24), since that neighbor's mantissa has an even (0) trailing bit while 16,777,218's does not", "No; it rounds to 16,777,218, always rounding upward on a tie", "No, and it cannot be represented by any nearby value at all"],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Single precision's significand holds 24 significant bits total (1 implicit + 23 stored), so at the exponent range covering 2^24, the smallest gap between two representable values is 2^(24-23) = 2 — meaning only even integers are exactly representable near this magnitude, not every integer. 16,777,217 is odd and falls exactly halfway between the two representable neighbors 16,777,216 (2^24) and 16,777,218 (2^24+2), a genuine rounding tie. Round-to-nearest-ties-to-even resolves this by choosing whichever neighbor has an even (0) least-significant mantissa bit: 16,777,216 = 2^24 exactly has an all-zero mantissa (trailing bit 0, even), while 16,777,218 corresponds to a mantissa with trailing bit 1 (odd). So the tie is broken in favor of 16,777,216, and 16,777,217 rounds DOWN to 16,777,216 — a classic, frequently cited example of single precision silently losing exact integer representation once values exceed 2^24."
},
{
  id: 'digital-arithmetic-x8',
  q: "What is the ULP (unit in the last place — the gap between adjacent representable values) at x = 1024.0 in IEEE 754 single precision, compared to the ULP at x = 1.0?",
  options: ["Identical: both are 2^-23", "The ULP at 1024.0 is 2^10 times LARGER than at 1.0, since 1024 = 2^10 shifts the exponent up by 10 relative to 1.0 = 2^0", "The ULP at 1024.0 is 2^10 times SMALLER, since larger numbers need more precision", "ULP is only defined for values between 0 and 1"],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "In IEEE 754, the ULP at a given exponent e is 2^(e-23) for single precision, since the 23 stored mantissa bits represent fractional increments of the significand scaled by 2^e. At x = 1.0 = 1.0 × 2^0, the exponent is e=0, so ULP = 2^(0-23) = 2^-23. At x = 1024.0 = 1.0 × 2^10, the exponent is e=10, so ULP = 2^(10-23) = 2^-13. The ratio of these two ULPs is 2^-13 / 2^-23 = 2^10 = 1024, so the ULP at 1024.0 is 1024 (2^10) times LARGER than the ULP at 1.0, matching exactly the factor by which the magnitude itself increased (2^10). This demonstrates floating point's core property: absolute precision (the gap between representable values) grows in direct proportion to the magnitude of the number, while RELATIVE precision (ULP divided by the value itself) stays roughly constant across the entire normalized range — this is the entire point of using a floating exponent instead of a fixed decimal point."
},
{
  id: 'digital-arithmetic-x9',
  q: "Why does IEEE 754 store the floating-point exponent in a biased (excess-K) form rather than as a plain signed 2's complement number?",
  options: ["Biasing makes the hardware for addition and subtraction of exponents simpler to build", "Biasing lets two floating-point numbers of the same sign be compared for magnitude using ordinary unsigned integer comparison of their bit patterns directly, without special-casing the exponent's sign", "Biasing was chosen purely for historical compatibility with earlier decimal computers", "Biasing doubles the usable exponent range compared to 2's complement"],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "With a biased exponent, a LARGER stored (biased) exponent value always corresponds to a LARGER actual exponent and hence a LARGER magnitude, and this ordering is preserved when the entire floating-point bit pattern (sign, exponent, mantissa, in that field order) is read simply as one big unsigned integer. This means comparing two same-signed floating point numbers for magnitude can reuse ordinary unsigned integer comparison circuitry directly on the raw bit patterns — no separate floating-point-aware comparator logic is needed for the exponent field. If the exponent were instead stored in 2's complement, a negative exponent's bit pattern (with its MSB set to 1) would numerically look LARGER as an unsigned integer than a positive exponent's bit pattern (MSB 0), completely inverting the intended ordering and breaking this direct-bit-comparison trick. This comparison-friendliness, not any arithmetic simplification, is the actual reason biasing was chosen."
},
{
  id: 'digital-arithmetic-x10',
  q: "If one operand of an IEEE 754 floating-point addition is NaN (Not a Number) and the other is a normal finite number, what is the result?",
  options: ["The finite operand's value, ignoring the NaN", "0", "NaN — any arithmetic operation involving a NaN operand produces NaN", "+Infinity or -Infinity depending on the finite operand's sign"],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "NaN represents 'the result of some earlier operation was undefined or not a real number', and IEEE 754 is designed so that this undefined-ness propagates forward through any further computation rather than silently disappearing — if a NaN could be 'overridden' by a valid operand, later code might use a value with no real mathematical meaning without ever being alerted. So the rule is simple and absolute for ordinary arithmetic operations (add, subtract, multiply, divide): if EITHER operand is NaN, the result is NaN, regardless of what the other operand is (even if that other operand is itself a well-defined finite number or an infinity). This propagation property is exactly why a single stray division by zero-with-zero or similar indeterminate operation deep inside a long calculation chain can silently turn a program's final numeric output into NaN, which is why NaN-checking is typically done on final results or at key checkpoints rather than after every individual operation."
},
{
  id: 'digital-arithmetic-x11',
  q: "In n-bit 2's complement, the most negative representable value is -2^(n-1). What happens when you multiply this value by -1?",
  options: ["The result is +2^(n-1), computed correctly with no issue", "Overflow occurs, because the mathematically correct result +2^(n-1) exceeds the maximum representable positive value of +2^(n-1) - 1", "The result correctly wraps to 0", "This operation is undefined and always causes a hardware exception, unlike any other 2's complement overflow"],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "This is the single most famous corner case in 2's complement arithmetic: negating (or equivalently multiplying by -1) the most negative representable value ALWAYS overflows, because 2's complement's range is asymmetric — it has exactly one MORE negative value than positive value (range -2^(n-1) to +2^(n-1)-1). The mathematically correct negation of -2^(n-1) is +2^(n-1), but the largest positive value the n-bit format can hold is only +2^(n-1) - 1, one less. So the true result is simply not representable, and hardware performing this negation (via invert-then-add-1) actually produces -2^(n-1) again unchanged (the bit pattern maps to itself under negation), silently signaling overflow through the standard carry-based overflow flag rather than crashing. For a concrete 4-bit example: negating -8 (1000) should give +8, but the maximum positive 4-bit value is only +7, so overflow occurs and the hardware result remains 1000 (still -8), not +8."
},
{
  id: 'digital-arithmetic-x12',
  q: "Subtracting two nearly equal large floating-point numbers in IEEE 754 (e.g. 100000.2 - 100000.1) can produce a result with drastically reduced relative precision, a phenomenon called catastrophic cancellation. Why does this happen even though both operands were each represented at full working precision?",
  options: ["Because IEEE 754 subtraction hardware is inherently less accurate than addition hardware", "Because each operand's small representation error (relative to its own large magnitude) does not shrink when the two large values are subtracted, so that same absolute error becomes a much larger fraction of the now much smaller true result", "Because subtraction always rounds toward zero regardless of the selected rounding mode", "Because floating-point subtraction converts both operands to integers first, losing the fractional part"],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Each floating-point operand carries a small ABSOLUTE rounding/representation error that is proportional to its own magnitude (since floating point guarantees roughly constant RELATIVE precision, not constant absolute precision — recall the ULP grows with magnitude). When two large, nearly-equal numbers are subtracted, their large magnitudes cancel out in the exact mathematical subtraction, but each operand's small absolute error does NOT cancel out along with it (the errors are independent, not equal and opposite) — so the leftover absolute error stays roughly the same size while the TRUE result has become much smaller. That same fixed-size absolute error is now a much larger fraction of the smaller result, meaning the RELATIVE precision of the subtraction's output has collapsed even though no individual step technically violated IEEE 754's rounding guarantees. This is why numerically stable algorithms deliberately avoid subtracting two nearly-equal large quantities whenever a mathematically equivalent but cancellation-free reformulation is available."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-arithmetic';}).questions.push(
{
  id: 'digital-arithmetic-y1',
  q: "Which of the following statements about the IEEE 754 single-precision (32-bit) floating-point format are correct? (Select ALL that apply)",
  options: ["It uses 1 sign bit, 8 exponent bits, and 23 mantissa (fraction) bits", "The exponent bias is 127", "A biased exponent field of all 1s together with a nonzero mantissa represents NaN", "The implicit leading bit of a normalized mantissa is always 0"],
  answers: [0, 1, 2],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "IEEE 754 single precision is defined with exactly 1 sign bit + 8 exponent bits + 23 mantissa bits = 32 bits total — option 1 is correct. The 8-bit exponent field uses a bias of 127 (excess-127), so the true exponent is the stored value minus 127 — option 2 is correct. A biased exponent of all 1s (255) combined with a nonzero mantissa is the reserved encoding for NaN (all 1s with a zero mantissa instead represents infinity) — option 3 is correct. For a NORMALIZED floating-point number, the implicit (hidden) leading bit of the mantissa is always 1, not 0 (this is what lets the format store 23 explicit bits but effectively represent 24 bits of precision) — so option 4 is incorrect."
},
{
  id: 'digital-arithmetic-y2',
  q: "Which of the following statements about overflow detection in n-bit 2's complement addition are correct? (Select ALL that apply)",
  options: ["Overflow occurs when two operands of the same sign produce a result of the opposite sign", "Overflow can occur when adding a positive number and a negative number", "Overflow is detected when the carry INTO the MSB differs from the carry OUT of the MSB", "Overflow never occurs during unsigned binary addition, only during signed addition"],
  answers: [0, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The classic sign-based overflow rule states that adding two numbers of the SAME sign and getting a result of the OPPOSITE sign indicates overflow (the true mathematical sum exceeded the representable range) — option 1 is correct. Adding a positive and a negative number can never cause overflow, because the true sum's magnitude is always less than or equal to the larger operand's magnitude, which is already representable — so option 2 is incorrect. The carry-based overflow rule (equivalent to the sign-based rule) states that overflow occurs exactly when the carry bit going INTO the MSB position differs from the carry bit coming OUT of the MSB position — option 3 is correct. Unsigned binary addition does have its own overflow condition — it occurs precisely when there is a carry out of the MSB (indicating the true sum exceeded the maximum unsigned value) — so option 4's claim that overflow 'never occurs' in unsigned addition is incorrect."
},
{
  id: 'digital-arithmetic-y3',
  q: "Which of the following statements about signed binary multiplication and division are correct? (Select ALL that apply)",
  options: ["Multiplying two n-bit numbers can require up to 2n bits to represent the exact result", "Booth's algorithm is used to speed up and simplify signed multiplication in 2's complement representation", "Integer division by zero produces a well-defined result of 0 in standard binary arithmetic", "In the restoring division algorithm, if the partial remainder becomes negative after a trial subtraction, the divisor is added back (restored) before proceeding"],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: "The product of two n-bit numbers can be as large as (2^n - 1)^2, which in general requires up to 2n bits to represent exactly without truncation or overflow — option 1 is correct. Booth's algorithm is the standard technique for efficiently handling signed multiplication in 2's complement by scanning pairs of bits and reducing the number of required additions/subtractions — option 2 is correct. Division by zero is mathematically undefined and is NOT given a defined result of 0 in standard binary arithmetic — hardware typically flags it as an exception or error condition rather than silently returning 0 — so option 3 is incorrect. In the restoring division algorithm, exactly as stated, whenever a trial subtraction makes the partial remainder negative, the divisor is added back to restore the previous (correct) remainder before the algorithm shifts and proceeds to the next bit — option 4 is correct."
},
{
  id: 'digital-arithmetic-y4',
  q: "In IEEE 754 single-precision format, what is the biased exponent field value (expressed as an unsigned decimal integer) used to represent the decimal number 8.0? (Enter your numerical answer.)",
  options: [],
  answer: 130,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: "8.0 in binary is 1000.0, which normalizes to 1.000 × 2^3 (moving the binary point 3 places left). The true (unbiased) exponent is therefore 3. IEEE 754 single precision stores the exponent with a bias of 127, so the stored biased exponent field equals the true exponent plus the bias: 3 + 127 = 130."
},
{
  id: 'digital-arithmetic-y5',
  q: "Add the two 6-bit 2's complement numbers 011011 (decimal 27) and 010110 (decimal 22). What is the decimal value of the 6-bit result, interpreted as a signed 2's complement number? (Enter your numerical answer.)",
  options: [],
  answer: -15,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Adding the bit patterns directly: 011011 + 010110 = 110001 (binary addition, keeping only 6 bits, no bit is lost since the true sum 49 fits in 6 unsigned bits). Interpreting 110001 as a signed 6-bit 2's complement number: the MSB is 1, so it is negative. Inverting and adding 1: invert 110001 to get 001110, add 1 to get 001111 = 15, so the value is -15. This is the classic signed-overflow example: the true mathematical sum 27+22=49 exceeds the maximum representable positive value in 6-bit 2's complement (+31), so the result wraps around and is misread as -15 — demonstrating why overflow detection is essential in signed addition (two positive operands here incorrectly yield a negative result, which is exactly the sign-based overflow condition)."
},
{
  id: 'digital-arithmetic-y6',
  q: "In the IEEE 754 double-precision (64-bit) floating-point format, how many bits are allocated to the exponent field? (Enter your numerical answer.)",
  options: [],
  answer: 11,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: "IEEE 754 double precision uses a 64-bit layout consisting of 1 sign bit, 11 exponent bits, and 52 mantissa (fraction) bits (1 + 11 + 52 = 64). The 11-bit exponent field uses a bias of 1023, allowing it to represent a much wider exponent range than the 8-bit exponent field of single precision."
}
);

// ---- Figure-based GATE questions (auto-appended) ----
window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-combinational';}).questions.push(
{
  id: 'digital-combinational-f1',
  q: "The logic circuit below has inputs A, B, C. Based on the gate diagram (an AND gate combining A and B, a NOT gate inverting A, a second AND gate combining A' and C, and an OR gate combining both AND-gate outputs to produce F), the output F equals:",
  figure: '<svg viewBox="0 0 380 220" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M20 42H110"/><path d="M30 42V150H70"/><path d="M20 82H110"/><path d="M118 150H190"/><path d="M20 185H190"/><path d="M175 60H270L285 72"/><path d="M260 170H270L285 158"/><path d="M110 30H150A25 25 0 0 1 150 90H110Z"/><path d="M70 130L110 150L70 170Z"/><path d="M190 140H230A30 30 0 0 1 230 200H190Z"/><path d="M285 50Q307 50 337 115Q307 180 285 180Q301 115 285 50Z"/><path d="M337 115H365"/></g><circle cx="115" cy="150" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><g font-size="14" fill="currentColor"><text x="4" y="46">A</text><text x="4" y="86">B</text><text x="4" y="189">C</text><text x="370" y="120">F</text></g></svg>',
  options: ["AB + A'C", "AB + AC", "A'B + AC", "AB' + A'C"],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "Tracing the diagram: the top AND gate takes A and B directly, giving AB. The small circle (bubble) on the NOT gate inverts A to produce A', and this A' feeds the second AND gate together with C, giving A'C. The OR gate then combines the two AND outputs, so F = AB + A'C. Option (b) AB + AC is wrong because it ignores the inverter entirely — it would be the circuit's output only if the NOT gate were removed. Option (c) A'B + AC swaps which literal gets inverted and which AND gate C belongs to. Option (d) AB' + A'C wrongly inverts B instead of leaving the first AND gate uninverted. Reading such diagrams systematically — gate by gate, from inputs to output — avoids these near-miss traps, which GATE frequently uses as distractors in circuit-to-expression questions."
},
{
  id: 'digital-combinational-f2',
  q: "A 4:1 multiplexer is built as a tree of three 2:1 multiplexers, as shown. The two lower 2:1 muxes are both controlled by select line S0 and carry data inputs D0=0, D1=1 (upper mux) and D2=1, D3=0 (lower mux). Their outputs feed a top-level 2:1 mux controlled by S1, which produces F. With S1 = A and S0 = B, the circuit realizes:",
  figure: '<svg viewBox="0 0 380 220" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M10 25H80"/><path d="M10 55H80"/><path d="M10 105H80"/><path d="M10 135H80"/><path d="M55 170V59H80"/><path d="M55 139H80"/><path d="M140 40H200L230 68"/><path d="M140 120H200L230 113"/><path d="M265 165V124"/><path d="M300 90H350"/><path d="M80 15L80 65L140 52.5L140 27.5Z"/><path d="M80 95L80 145L140 132.5L140 107.5Z"/><path d="M230 45L230 135L300 112.5L300 67.5Z"/></g><g font-size="13" fill="currentColor"><text x="0" y="29">0</text><text x="0" y="59">1</text><text x="0" y="109">1</text><text x="0" y="139">0</text><text x="35" y="185">S0=B</text><text x="245" y="185">S1=A</text><text x="356" y="94">F</text></g></svg>',
  options: ["AB", "A + B", "A XOR B", "A XNOR B"],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "The upper mux selects between D0=0 and D1=1 using S0=B, so its output X = B (X=0 when B=0, X=1 when B=1). The lower mux selects between D2=1 and D3=0 using the same S0=B, so its output Y = B' (Y=1 when B=0, Y=0 when B=1). The top mux then selects X when S1=A=0 and Y when A=1, so F = X when A=0 and F = Y when A=1. Tabulating: (A,B)=(0,0)→F=X=0; (0,1)→F=X=1; (1,0)→F=Y=1; (1,1)→F=Y=0. This truth table (0,1,1,0) is exactly A XOR B. This is a classic GATE construction technique: any 2-variable function can be realized with a 4:1 mux tree by placing the correct constants or literals on the data lines, and tracing which value survives to the output for each select combination is the fastest way to identify the realized function without building a full truth table from scratch."
},
{
  id: 'digital-combinational-f3',
  q: "A 2-to-4 line decoder (inputs A, B; active-high outputs D0 = A'B', D1 = A'B, D2 = AB', D3 = AB) has its D0 and D3 outputs connected to a 2-input OR gate to produce F, as shown (D1 and D2 are left unconnected). The function F realized is:",
  figure: '<svg viewBox="0 0 380 200" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M15 70H60"/><path d="M15 120H60"/><path d="M130 35H190L230 72"/><path d="M130 75H150"/><path d="M130 115H150"/><path d="M130 155H190L230 138"/><path d="M282 105H335"/><rect x="60" y="20" width="70" height="150"/><path d="M230 60Q252 60 282 105Q252 150 230 150Q246 105 230 60Z"/></g><g font-size="12" fill="currentColor"><text x="70" y="45">2-to-4</text><text x="78" y="60">DEC</text><text x="0" y="74">A</text><text x="0" y="124">B</text><text x="132" y="30">D0</text><text x="152" y="70">D1</text><text x="152" y="110">D2</text><text x="132" y="170">D3</text><text x="345" y="109" font-size="14">F</text></g></svg>',
  options: ["A AND B", "A OR B", "A XOR B", "A XNOR B"],
  answer: 3,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "D0 is asserted only for input combination AB=00 (D0 = A'B'), and D3 is asserted only for AB=11 (D3 = AB). ORing these two decoder outputs gives F = A'B' + AB, which is 1 exactly when A and B agree (both 0 or both 1) and 0 when they differ. That truth table is the definition of the XNOR (equivalence) function, so F = A XNOR B. This is a standard GATE construction: a decoder followed by an OR gate over a chosen subset of minterm lines directly implements the sum of those minterms, so decoder-plus-OR questions reduce to identifying which minterms are being combined. Contrast with option (c): ORing D1 (A'B) and D2 (AB') instead would have given A XOR B, since those two lines represent the case where A and B disagree — the classic trap in this question family is confusing which pair of decoder outputs corresponds to XOR versus XNOR."
},
{
  id: 'digital-combinational-f4',
  q: "A full adder is built from two half adders and an OR gate as shown: HA1 takes inputs A and B and produces sum S1 and carry C1; HA2 takes S1 and Cin and produces the final Sum and carry C2; the OR gate combines C1 and C2 to produce Cout. The Boolean expression for Cout is:",
  figure: '<svg viewBox="0 0 340 200" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M10 35H40"/><path d="M10 75H40"/><path d="M110 35H180"/><path d="M110 75V142H150"/><path d="M195 178V75H180"/><path d="M250 35H300"/><path d="M250 75V168H150"/><path d="M195 155H230"/><rect x="40" y="20" width="70" height="70"/><rect x="180" y="20" width="70" height="70"/><path d="M150 130Q168 130 195 155Q168 180 150 180Q163 155 150 130Z"/></g><g font-size="13" fill="currentColor"><text x="0" y="39">A</text><text x="0" y="79">B</text><text x="55" y="60">HA1</text><text x="195" y="60">HA2</text><text x="122" y="30">S1</text><text x="303" y="39">Sum</text><text x="175" y="196">Cin</text><text x="234" y="159">Cout</text></g></svg>',
  options: ["AB + BCin + ACin", "AB + BCin", "A'B + BCin + ACin", "AB + BCin + ACin'"],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "HA1 produces S1 = A XOR B and C1 = AB. HA2 takes S1 and Cin and produces C2 = S1 . Cin = (A XOR B).Cin. The OR gate gives Cout = C1 + C2 = AB + (A XOR B)Cin. Expanding (A XOR B)Cin = (AB' + A'B)Cin = AB'Cin + A'BCin, so Cout = AB + AB'Cin + A'BCin. Checking this against AB + BCin + ACin on all 8 input rows confirms they are identical (both equal 1 exactly when at least two of A, B, Cin are 1) — this is the well-known majority function, which is exactly what a carry-out should be: a carry is generated whenever a majority of the three bits being added are 1. Option (b) drops the ACin term and fails whenever A=1, Cin=1, B=0. Options (c) and (d) each flip the sign of one literal and fail on simple test rows such as A=B=1, Cin=0."
},
{
  id: 'digital-combinational-f5',
  q: "In the NAND-NAND circuit shown (NAND1 takes A, B; NAND2 takes B, C; NAND3 takes the outputs of NAND1 and NAND2 to produce F), what is the value of F when A = 1, B = 0, C = 1?",
  figure: '<svg viewBox="0 0 340 190" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M10 33H60"/><path d="M10 58H60"/><path d="M30 58V123H60"/><path d="M10 148H60"/><path d="M125 45H133"/><path d="M125 135H133"/><path d="M133 45H160L190 73"/><path d="M133 135H160L190 108"/><path d="M264 90H310"/><path d="M60 20H100A25 25 0 0 1 100 70H60Z"/><path d="M60 110H100A25 25 0 0 1 100 160H60Z"/><path d="M190 55H225A35 35 0 0 1 225 125H190Z"/><circle cx="129" cy="45" r="4"/><circle cx="129" cy="135" r="4"/><circle cx="264" cy="90" r="4"/></g><g font-size="13" fill="currentColor"><text x="0" y="37">A</text><text x="0" y="62">B</text><text x="0" y="152">C</text><text x="316" y="94">F</text></g></svg>',
  options: ["0", "1", "A", "C"],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "Evaluate stage by stage. NAND1 = (A.B)' = (1.0)' = 0' = 1. NAND2 = (B.C)' = (0.1)' = 0' = 1. NAND3 = (NAND1 . NAND2)' = (1.1)' = 1' = 0. So F = 0 for the given inputs. Algebraically, by De Morgan's law NAND3's output is NAND1' + NAND2' = (AB) + (BC) = AB + BC = B(A+C), so this circuit realizes F = B(A+C) — a two-level NAND-NAND network implementing an AND-OR (sum-of-products) function, a standard equivalence tested in GATE. Since B = 0 here, F = 0 regardless of A and C, which is exactly what both the gate-by-gate evaluation and the simplified expression B(A+C) predict. This double-check (raw gate evaluation vs. the simplified Boolean form) is the safest way to verify NAND-NAND circuit questions under exam pressure."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-boolean';}).questions.push(
{
  id: 'digital-boolean-f1',
  q: "For the 4-variable K-map of f(A, B, C, D) = Σm(0, 2, 3, 8, 10, 11) shown below (rows are AB in Gray-code order 00, 01, 11, 10; columns are CD in Gray-code order 00, 01, 11, 10), the minimal SOP expression is:",
  figure: '<svg viewBox="0 0 380 270" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="13" fill="currentColor" text-anchor="middle"><text x="20" y="30" font-size="11" text-anchor="start">AB/CD</text><text x="105" y="30">00</text><text x="175" y="30">01</text><text x="245" y="30">11</text><text x="315" y="30">10</text><text x="30" y="80">00</text><text x="30" y="130">01</text><text x="30" y="180">11</text><text x="30" y="230">10</text></g><path d="M70 50L70 250M140 50L140 250M210 50L210 250M280 50L280 250M350 50L350 250M70 50L350 50M70 100L350 100M70 150L350 150M70 200L350 200M70 250L350 250" stroke="currentColor" stroke-width="1.5" fill="none"/><g font-size="15" fill="currentColor" text-anchor="middle"><text x="105" y="81">1</text><text x="175" y="81">0</text><text x="245" y="81">1</text><text x="315" y="81">1</text><text x="105" y="131">0</text><text x="175" y="131">0</text><text x="245" y="131">0</text><text x="315" y="131">0</text><text x="105" y="181">0</text><text x="175" y="181">0</text><text x="245" y="181">0</text><text x="315" y="181">0</text><text x="105" y="231">1</text><text x="175" y="231">0</text><text x="245" y="231">1</text><text x="315" y="231">1</text></g></svg>',
  options: ["B'D' + B'C", "BD' + BC", "B'D + BC'", "B'D' + BC'"],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "All the 1-cells lie in the AB=00 and AB=10 rows, i.e. wherever B=0; within those two rows every 1-cell is in column CD=00, 11 or 10 (every column except CD=01). The two rows AB=00 and AB=10 are adjacent (the K-map wraps top-to-bottom, and 00/10 differ only in A), so together they form one full group of 8 covering minterms 0, 2, 8, 10 (columns 00 and 10), giving the term B'D' (eliminating A and C, leaving B=0, D=0). A second group of 4 covers columns 11 and 10 across both rows (minterms 2, 3, 10, 11), giving the term B'C (eliminating A and D, leaving B=0, C=1). Together B'D' + B'C cover all six minterms and both are essential (minterm 0 is uniquely covered by B'D', and minterm 3 uniquely by B'C), so this is the minimal SOP. Option (b) inverts every literal's polarity; option (c) swaps C and D; option (d) mixes polarities incorrectly — all fail to cover minterm 0 or 11 correctly."
},
{
  id: 'digital-boolean-f2',
  q: "For the K-map of f(A, B, C, D) = Σm(0, 1, 2, 5, 7, 8, 9, 10, 13, 15) shown below, the total number of prime implicants is:",
  figure: '<svg viewBox="0 0 380 270" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="13" fill="currentColor" text-anchor="middle"><text x="20" y="30" font-size="11" text-anchor="start">AB/CD</text><text x="105" y="30">00</text><text x="175" y="30">01</text><text x="245" y="30">11</text><text x="315" y="30">10</text><text x="30" y="80">00</text><text x="30" y="130">01</text><text x="30" y="180">11</text><text x="30" y="230">10</text></g><path d="M70 50L70 250M140 50L140 250M210 50L210 250M280 50L280 250M350 50L350 250M70 50L350 50M70 100L350 100M70 150L350 150M70 200L350 200M70 250L350 250" stroke="currentColor" stroke-width="1.5" fill="none"/><g font-size="15" fill="currentColor" text-anchor="middle"><text x="105" y="81">1</text><text x="175" y="81">1</text><text x="245" y="81">0</text><text x="315" y="81">1</text><text x="105" y="131">0</text><text x="175" y="131">1</text><text x="245" y="131">1</text><text x="315" y="131">0</text><text x="105" y="181">0</text><text x="175" y="181">1</text><text x="245" y="181">1</text><text x="315" y="181">0</text><text x="105" y="231">1</text><text x="175" y="231">1</text><text x="245" y="231">0</text><text x="315" y="231">1</text></g></svg>',
  options: ["2", "3", "4", "5"],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: "Grouping the 1-cells: the two full corner/edge columns CD=00 combined with rows AB=00,10 (minterms 0,1,8,9, since column 00 and 01 together with rows 00 and 10 wrap) give B'C' covering {0,1,8,9}. The pattern B'D' covers columns CD=00 and 10 in rows AB=00,10, i.e. {0,2,8,10}. The pattern C'D covers column CD=01 in rows AB=00,01 (using the wrap on D fixed at 1, C fixed at 0), i.e. {1,5,9,13}. The pattern BD covers column CD=01 and 11 in rows AB=01,11, i.e. {5,7,13,15}. Careful Quine-McCluskey reduction confirms exactly four maximal groups (prime implicants): B'C', B'D', C'D and BD — no larger rectangle covers any of them, and none is a subset of another. Of these, B'D' and BD are essential (each is the only PI covering minterms 2,10 and 7,15 respectively), while B'C' and C'D are non-essential alternatives for covering the remaining minterms 1 and 9. The total prime implicant count is therefore 4."
},
{
  id: 'digital-boolean-f3',
  q: "For the K-map of f(A, B, C, D) = Σm(1, 5, 6, 7, 11, 12, 13, 15) shown below, how many of its prime implicants are essential prime implicants?",
  figure: '<svg viewBox="0 0 380 270" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="13" fill="currentColor" text-anchor="middle"><text x="20" y="30" font-size="11" text-anchor="start">AB/CD</text><text x="105" y="30">00</text><text x="175" y="30">01</text><text x="245" y="30">11</text><text x="315" y="30">10</text><text x="30" y="80">00</text><text x="30" y="130">01</text><text x="30" y="180">11</text><text x="30" y="230">10</text></g><path d="M70 50L70 250M140 50L140 250M210 50L210 250M280 50L280 250M350 50L350 250M70 50L350 50M70 100L350 100M70 150L350 150M70 200L350 200M70 250L350 250" stroke="currentColor" stroke-width="1.5" fill="none"/><g font-size="15" fill="currentColor" text-anchor="middle"><text x="105" y="81">0</text><text x="175" y="81">1</text><text x="245" y="81">0</text><text x="315" y="81">0</text><text x="105" y="131">0</text><text x="175" y="131">1</text><text x="245" y="131">1</text><text x="315" y="131">1</text><text x="105" y="181">1</text><text x="175" y="181">1</text><text x="245" y="181">1</text><text x="315" y="181">0</text><text x="105" y="231">0</text><text x="175" y="231">0</text><text x="245" y="231">1</text><text x="315" y="231">0</text></g></svg>',
  options: ["2", "3", "4", "5"],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: "Applying Quine-McCluskey to Σm(1,5,6,7,11,12,13,15) yields five prime implicants: A'C'D covering {1,5}, A'BC covering {6,7}, ACD covering {11,15}, ABC' covering {12,13}, and BD covering {5,7,13,15}. Checking essentiality minterm by minterm: minterm 1 is covered only by A'C'D (essential), minterm 6 only by A'BC (essential), minterm 11 only by ACD (essential), and minterm 12 only by ABC' (essential). BD, although a valid maximal group, covers only minterms {5,7,13,15}, every one of which is already covered by one of the four essential PIs above, so BD is never required in any minimal cover and is not essential. Hence 4 of the 5 prime implicants are essential, and the minimal SOP is simply the sum of those four essential PIs (A'C'D + A'BC + ACD + ABC'), with BD redundant. This pattern — four 2-cell essential PIs surrounding one larger but non-essential PI — is a favourite GATE trap for testing whether students blindly assume 'bigger group must be essential.'"
},
{
  id: 'digital-boolean-f4',
  q: "For the K-map of f(A, B, C, D) = Σm(4, 5, 6, 7, 12, 13, 14, 15) shown below, the minimal SOP expression is:",
  figure: '<svg viewBox="0 0 380 270" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="13" fill="currentColor" text-anchor="middle"><text x="20" y="30" font-size="11" text-anchor="start">AB/CD</text><text x="105" y="30">00</text><text x="175" y="30">01</text><text x="245" y="30">11</text><text x="315" y="30">10</text><text x="30" y="80">00</text><text x="30" y="130">01</text><text x="30" y="180">11</text><text x="30" y="230">10</text></g><path d="M70 50L70 250M140 50L140 250M210 50L210 250M280 50L280 250M350 50L350 250M70 50L350 50M70 100L350 100M70 150L350 150M70 200L350 200M70 250L350 250" stroke="currentColor" stroke-width="1.5" fill="none"/><g font-size="15" fill="currentColor" text-anchor="middle"><text x="105" y="81">0</text><text x="175" y="81">0</text><text x="245" y="81">0</text><text x="315" y="81">0</text><text x="105" y="131">1</text><text x="175" y="131">1</text><text x="245" y="131">1</text><text x="315" y="131">1</text><text x="105" y="181">1</text><text x="175" y="181">1</text><text x="245" y="181">1</text><text x="315" y="181">1</text><text x="105" y="231">0</text><text x="175" y="231">0</text><text x="245" y="231">0</text><text x="315" y="231">0</text></g></svg>',
  options: ["B", "B'", "AB", "A'B"],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "The two middle rows, AB=01 and AB=11, are entirely filled with 1s across all four columns, while the top row (AB=00) and bottom row (AB=10) are entirely 0. Both rows AB=01 and AB=11 share B=1 (only A differs between them), so together they form one group of 8 cells spanning all values of A, C and D while B stays fixed at 1. By the K-map rule, a group of 2^3=8 cells eliminates 3 variables, leaving a single literal: B. So the minimal SOP is simply f = B. Option (b) B' is the complement and would be wrong since B=1 is exactly where the function is 1, not where it is 0. Options (c) AB and (d) A'B are each only a quarter of the ON-set (covering only 4 of the 8 minterms), so they under-cover the function — for instance minterm 4 (A=0,B=1,C=0,D=0) is missed by AB, and minterm 12 (A=1,B=1,C=0,D=0) is missed by A'B. Recognizing a K-map that reduces to a single literal is a fast, high-value pattern to spot immediately."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-sequential';}).questions.push(
{
  id: 'digital-sequential-f1',
  q: "A 3-bit synchronous binary counter is built from three flip-flops (FF0, FF1, FF2) all toggling on every clock pulse (T = 1), sharing a common CLK line. Their outputs Q0 and Q2 are fed into a 2-input AND gate, whose output drives the asynchronous CLR (clear) input of all three flip-flops, as shown. What is the modulus of this counter?",
  figure: '<svg viewBox="0 0 340 150" width="100%" style="max-width:400px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M10 140H265"/><path d="M65 140V120"/><path d="M165 140V120"/><path d="M265 140V120"/><path d="M65 60V48H265V60"/><path d="M165 48V60"/><path d="M100 90V18H140"/><path d="M300 90V33H165"/><path d="M180 25V48"/><path d="M100 90H120"/><path d="M200 90H220"/><path d="M300 90H320"/><rect x="30" y="60" width="70" height="60"/><rect x="130" y="60" width="70" height="60"/><rect x="230" y="60" width="70" height="60"/><path d="M140 10H165A15 15 0 0 1 165 40H140Z"/></g><g font-size="12" fill="currentColor"><text x="45" y="94">FF0</text><text x="145" y="94">FF1</text><text x="245" y="94">FF2</text><text x="123" y="94">Q0</text><text x="223" y="94">Q1</text><text x="323" y="94">Q2</text><text x="0" y="144">CLK</text><text x="145" y="24">CLR</text></g></svg>',
  options: ["Mod-4", "Mod-5", "Mod-6", "Mod-8"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "With T=1 on every flip-flop, the counter would naturally free-run through all 8 states 000 to 111 as a mod-8 counter. But the AND gate watches Q2 and Q0, and its output clears all three flip-flops the instant Q2Q1Q0 reaches 101 (decimal 5) — the state where both Q2=1 and Q0=1 first occur. So the counter counts 000, 001, 010, 011, 100, then on the next clock reaches 101 momentarily, which immediately triggers the asynchronous clear back to 000. Since 101 is cleared almost instantly and is never a stable, observable state, the counter effectively cycles through only 5 distinct stable states: 000, 001, 010, 011, 100. This is the standard technique for building a mod-N counter (N less than 2^n) from an n-bit binary counter: decode the target terminal count with an AND/NAND gate and route it to the asynchronous clear or preset inputs. Here the modulus is 5, not 6, because state 101 itself does not persist as a countable state — it is only a fleeting decode pulse."
},
{
  id: 'digital-sequential-f2',
  q: "The Moore state machine below detects two consecutive 1s in a serial input stream (state label shows state/output). Starting in state S0, what is the output sequence produced for the input sequence 1, 1, 1, 0 (one output bit per input bit, read after each transition)?",
  figure: '<svg viewBox="0 0 400 230" width="100%" style="max-width:400px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="70" cy="100" r="28"/><circle cx="200" cy="100" r="28"/><circle cx="330" cy="100" r="28"/><path d="M98 100H172"/><path d="M228 100H302"/><path d="M50 78Q70 38 90 78"/><path d="M310 78Q330 38 350 78"/><path d="M186 122Q135 165 84 122"/><path d="M316 128Q200 215 80 132"/></g><path d="M164 95L172 100L164 105Z" fill="currentColor" stroke="none"/><path d="M294 95L302 100L294 105Z" fill="currentColor" stroke="none"/><path d="M92 114L84 122L94 128Z" fill="currentColor" stroke="none"/><path d="M88 124L80 132L90 138Z" fill="currentColor" stroke="none"/><g font-size="14" fill="currentColor" text-anchor="middle"><text x="70" y="105">S0/0</text><text x="200" y="105">S1/0</text><text x="330" y="105">S2/1</text><text x="135" y="92">1</text><text x="265" y="92">1</text><text x="70" y="35">0</text><text x="330" y="35">1</text><text x="135" y="158">0</text><text x="200" y="205">0</text></g></svg>',
  options: ["0110", "0111", "1001", "0010"],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "In a Moore machine the output depends only on the current state, so after every input bit we read off the label of the state just entered. Starting at S0: input 1 moves S0 to S1 (output of S1 is 0); input 1 moves S1 to S2 (output of S2 is 1); input 1 keeps the machine at S2 via its self-loop, since two-or-more 1s stays at S2 (output remains 1); input 0 moves S2 back to S0 (output of S0 is 0). Reading the four outputs in order gives 0, 1, 1, 0, i.e. the string 0110. Option (b) 0111 would result if the machine incorrectly stayed at S2 forever after the third input regardless of the fourth bit's 0. Option (c) 1001 reverses the timing convention (using the state before the transition, which would make this a Mealy-style reading). Option (d) 0010 misplaces which input triggers the transition into S2. Getting the state-machine reading convention right — output of new state, one output per input symbol — is essential for all Moore-machine trace questions."
},
{
  id: 'digital-sequential-f3',
  q: "The timing diagram below shows the CLK signal and the D input to a positive-edge-triggered D flip-flop (Q starts at 0). Reading the value of D present at each of the five labelled rising clock edges, the resulting Q values sampled just after edges 1 through 5, written as a single bit string, are:",
  figure: '<svg viewBox="0 0 350 130" width="100%" style="max-width:400px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" fill="none"><path d="M70 15V105"/><path d="M130 15V105"/><path d="M190 15V105"/><path d="M250 15V105"/><path d="M310 15V105"/></g><g stroke="currentColor" stroke-width="2" fill="none"><polyline points="40,40 70,40 70,20 100,20 100,40 130,40 130,20 160,20 160,40 190,40 190,20 220,20 220,40 250,40 250,20 280,20 280,40 310,40 310,20 340,20"/><polyline points="40,100 60,100 60,80 110,80 110,100 150,100 150,80 270,80 270,100 340,100"/></g><g font-size="12" fill="currentColor"><text x="5" y="33">CLK</text><text x="15" y="93">D</text><text x="70" y="118">1</text><text x="130" y="118">2</text><text x="190" y="118">3</text><text x="250" y="118">4</text><text x="310" y="118">5</text></g></svg>',
  options: ["10110", "01011", "11010", "01101"],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "A positive-edge-triggered D flip-flop copies whatever value D holds at the instant of each rising clock edge into Q, and Q then holds that value until the next rising edge. Reading the D waveform at each dashed vertical line: at edge 1 (x=70) D has already risen to 1, so Q becomes 1. At edge 2 (x=130) D has fallen back to 0, so Q becomes 0. At edge 3 (x=190) D has risen to 1 again (and stays 1 through edges 3 and 4), so Q becomes 1. At edge 4 (x=250) D is still 1, so Q remains 1. At edge 5 (x=310) D has fallen to 0, so Q becomes 0. The resulting Q sequence is therefore 1, 0, 1, 1, 0, written as 10110. This question tests the key distinction between a D flip-flop (which simply follows D at the clock edge, unlike a latch that would continue tracking D whenever CLK is high) — a transparent latch would instead produce glitches whenever D changed while CLK was high, which does not apply here since the flip-flop is edge-triggered."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-boolean';}).questions.push(
{
  id: 'digital-boolean-p1',
  pyqYear: 2015,
  q: "Simplify to a minimal sum-of-products form: f(A,B,C,D) = Σm(1,5,6,7,11,13,15) + d(3,9), where d denotes don't-care minterms.",
  options: ["D + A'BC", "D + BC", "A'D + BC", "D + AB'C"],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "Plot the 1s at minterms 1, 5, 6, 7, 11, 13, 15 and mark 3 and 9 as don't-cares (X) on a 4-variable K-map. Every minterm with D=1 is {1,3,5,7,9,11,13,15}, and the ON-set plus don't-cares exactly fill this entire column (1,5,7,11,13,15 are 1s, and 3,9 are don't-cares treated as 1s to complete the group), so D by itself is a valid group of 8 covering all of them — a huge simplification using both don't-cares. The only 1 not yet covered is minterm 6 (0110), which is not in the D=1 column at all. Its only ON-set neighbour is minterm 7 (0111): both have A=0, B=1, C=1, differing only in D, so {6,7} forms a group giving the term A'BC (D is eliminated, and A, B, C stay fixed at 0,1,1). No larger group is possible for minterm 6, since minterm 4 (0100) and minterm 14 (1110) are neither 1s nor don't-cares. Hence the minimal SOP is D + A'BC — D handles every D=1 minterm and A'BC additionally covers minterm 6. Option 'D + BC' drops the A' literal, which would wrongly also claim to cover minterm 14 (1110, where BC=1 but the function is 0 there); check D+BC at minterm 14: D=0 and BC=1, giving 1, but f(14) is not in the ON-set, so this option is wrong. The other two options mis-assign a literal and fail to reproduce minterm 6 exactly."
},
{
  id: 'digital-boolean-p2',
  pyqYear: 2016,
  q: "The minimal product-of-sums (POS) form of f(A,B,C,D) = ΠM(0,2,4,6,9,11,13,15) is:",
  options: ["(A+D)(A'+D')", "(A+D')(A'+D)", "(A+B)(C+D)", "(B+D)(B'+D')"],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "For a POS problem, plot the maxterms (zeros of f) on the K-map and group them exactly as you would group 1s, then read each group as a sum term using the opposite literal convention: a variable that is 0 across the group contributes its true form, and a variable that is 1 contributes its complemented form. The zeros are at 0,2,4,6,9,11,13,15. Splitting by A: for A=0, zeros are 0,2,4,6 — all four minterms where D=0 (0000,0010,0100,0110), giving the group A'D' contributing sum term (A+D). For A=1, zeros are 9,11,13,15 — all four minterms where D=1 (1001,1011,1101,1111), giving group AD contributing sum term (A'+D'). Multiplying the two sum terms gives f = (A+D)(A'+D'), which expands to AD' + A'D, confirming this is exactly the XOR of A and D — a recognizable pattern where POS and SOP are dual two-term expressions of equal size. Option (A+D')(A'+D) swaps the roles of D and D' and would represent XNOR(A,D) instead — check by testing A=0,D=0: the true f is 0 there (minterm 0 is a zero), but (A+D')(A'+D) evaluates to (0+1)(1+0)=1, so it fails. The other two options group the wrong variable pair entirely and do not match the zero set."
},
{
  id: 'digital-boolean-p3',
  pyqYear: 2017,
  q: "The number of distinct self-dual Boolean functions of 3 variables (functions f satisfying f(A,B,C) = [f(A',B',C')]' for every input) is ______.",
  options: [],
  answer: 16,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  kind: 'nat',
  explanation: "Self-duality forces f(v) and f(complement of v) to always be different — the output at any input and the output at the bitwise-complemented input must be complementary. This pairs up the 2^3 = 8 input rows of a 3-variable truth table into 2^3/2 = 4 complementary pairs: {000,111}, {001,110}, {010,101}, {011,100}. Within each pair, once you decide the output at one member (0 or 1), the output at its partner is forced to be the opposite — so each pair contributes exactly 2 independent choices, and the 4 pairs are chosen independently of each other. This gives 2^4 = 16 self-dual functions of 3 variables. In general, for n variables there are 2^(n-1) such complementary pairs, giving 2^(2^(n-1)) self-dual functions — 4 for n=2, 16 for n=3, 256 for n=4. A useful sanity check: f = A (a single literal) is self-dual since A' complemented is A' as well... more directly, f=ABC+A'B'C' is NOT self-dual (check 000: f=1, complement input 111: f=1, so f and f' at 111 must differ, but f(111)=1 and its own complement would need to be 0 — actually verifying membership is easiest by the pairing rule above rather than by picking random examples)."
},
{
  id: 'digital-boolean-p4',
  pyqYear: 2018,
  q: "For f(A,B,C,D) = Σm(0,1,2,5,6,7,8,9,10,14), the total number of prime implicants (counting every prime implicant, not just those needed in a minimal cover) is:",
  options: ["4", "5", "6", "7"],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: "Plotting all ten minterms on a 4-variable K-map and finding every maximal group (one that cannot be enlarged) gives six prime implicants: B'C' (covers 0,1,8,9), B'D' (covers 0,2,8,10), CD' (covers 2,6,10,14), A'C'D (covers 1,5), A'BD (covers 5,7), and A'BC (covers 6,7). Testing coverage: minterm 9 is reached only by B'C' (no other maximal group includes it), so B'C' is essential; minterm 14 is reached only by CD' (paired with 2, 6, 10, since all four have C=1, D=0), so CD' is essential too. The remaining minterms (1,2,5,6,7,8,10) each have at least two competing prime implicants covering them — for instance minterm 5 is reachable via both A'C'D and A'BD — so no further term is forced to be essential. All six groups are nonetheless legitimate maximal rectangles and therefore all six count as prime implicants, even though a minimal SOP only needs to pick enough of them (the two essential ones, plus one more to finish covering 1,2,5,6,7,8,10 completely) to finish the cover. This is exactly the trap the question is testing: 'prime implicant' counts every maximal rectangle on the map, while 'essential prime implicant' counts only the ones that are the sole cover for at least one minterm."
},
{
  id: 'digital-boolean-p5',
  pyqYear: 2019,
  q: "For f(A,B,C,D) = Σm(0,2,3,4,5,7,8,10,11,15), the number of essential prime implicants is ______.",
  options: [],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  kind: 'nat',
  explanation: "Grouping the ten ON-set minterms on a K-map yields six prime implicants in total, but only two of them are essential. The group B'D' covers {0,2,8,10} — all four minterms where B=0 and D=0 — and minterm 8 (1000) together with minterm 10 (1010) are reached by no other maximal group, so B'D' is essential. The group CD covers {3,7,11,15} — all four minterms where C=1 and D=1 — and minterm 15 (1111) is reached by no other maximal group, so CD is essential as well. The remaining ON-set minterms (2,3,4,5,7) are each covered by at least two competing prime implicants (such as A'C'D' for {4,5} or A'BD for {5,7}), so none of those groups is forced into every minimal cover — a minimal SOP can choose between them once B'D' and CD are already fixed. Hence exactly 2 prime implicants are essential, even though the total prime implicant count is larger. This distinction — total PIs versus essential PIs — is the single most repeated K-map subtlety in GATE Digital Logic."
},
{
  id: 'digital-boolean-p6',
  pyqYear: 2020,
  q: "Which of the following gate sets are functionally complete on their own, using only the variables given (no constant 0 or 1 input is available)? (Select all that apply.)",
  options: ["{NAND}", "{XOR, AND}", "{OR, AND}", "{NOR}"],
  answers: [0, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  kind: 'msq',
  explanation: "{NAND} is complete alone: NAND(x,x) = x' gives NOT, then AND is NOT(NAND(x,y)), and OR follows by De Morgan from NOT and AND — so all three basic operations are reachable. By the exact same argument {NOR} is complete alone: NOR(x,x) = x' gives NOT, OR is NOT(NOR(x,y)), and AND follows by De Morgan. {OR, AND} fails because both operations are monotone — increasing any input can never decrease the output — so no combination can ever produce an inverter; every function built purely from OR and AND of the input variables preserves the all-0 and all-1 rows exactly as they start (0 stays 0, 1 stays 1), which NOT violates. {XOR, AND} fails for a subtler reason: both XOR and AND output 0 when all their inputs are 0, so any circuit built from only these two gates, fed only the variables (no constant 1), must output 0 whenever every input variable is 0 — this is the 'preserves zero' property, and NOT does not preserve zero (NOT(0)=1), so it can never be built. Adding a constant-1 input would fix {XOR, AND}, since x⊕1 = x', but that input is explicitly excluded here."
},
{
  id: 'digital-boolean-p7',
  pyqYear: 2021,
  q: "The minimum number of 2-input NAND gates required to implement F = A ⊕ B (XOR), using only A and B as available signals, is ______.",
  options: [],
  answer: 4,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  kind: 'nat',
  explanation: "The standard 4-NAND XOR circuit is: gate 1 = NAND(A,B); gate 2 = NAND(A, gate1); gate 3 = NAND(B, gate1); gate 4 = NAND(gate2, gate3). Tracing all four input combinations confirms gate 4 equals A⊕B in every row. It is impossible to do it in 3 or fewer 2-input NAND gates — an exhaustive check of every way to wire at most 3 NAND gates fed only by A and B (allowing repeated use of a signal, which lets a gate act as an inverter) never reproduces the XOR truth table, because XOR is not expressible as a single level of NAND-NAND-NAND composition without an extra 'cross' term; the minimum provably needs the diamond structure shown above, and this exact gate-count result is one of the most frequently tested numbers in GATE Digital Logic. As a contrasting fact worth memorizing alongside this one: XNOR (A⊕B)' needs a 5th NAND gate (simply invert the 4-gate XOR output), while realizing XOR from NOR-only gates needs 5 gates and XNOR from NOR-only gates needs only 4 — NAND and NOR trade places between XOR and XNOR."
},
{
  id: 'digital-boolean-p8',
  pyqYear: 2022,
  q: "Simplify to a minimal sum-of-products form: f(A,B,C,D) = Σm(2,3,10,11,14,15) + d(8,9).",
  options: ["AC + B'C", "AC + AB'", "B'C + CD", "AB + B'C"],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "Plot the ON-set {2,3,10,11,14,15} and don't-cares {8,9} on a 4-variable K-map. Minterms 2,3,10,11 all have C=1,D can be either, and B=0 throughout (0010,0011,1010,1011), forming the group B'C (eliminating A and D). Minterms 10,11,14,15 all have A=1,C=1 (1010,1011,1110,1111), forming the group AC (eliminating B and D). Together B'C and AC cover all six ON-set minterms: B'C handles 2,3,10,11 and AC handles 10,11,14,15, with the overlap at 10,11 harmless. Neither group needs the don't-cares 8 or 9 to complete itself (they were available to enlarge groups but weren't required here, since B'C and AC already reach maximal size on their own), so the minimal SOP is exactly AC + B'C — a clean 2-term, 4-literal answer. Option 'AC + AB'' fails because AB' includes minterm 9 (1001, a don't-care, harmless) but also minterm 8 without covering 2 or 3, missing part of the ON-set entirely. Option 'B'C + CD' misses minterm 10 (1010, C=1 but D=0) is actually covered by B'C, but CD alone would incorrectly add minterm 7 if it existed and doesn't help cover 14; checking 14 (1110): CD requires D=1 which fails, so this option under-covers. Option 'AB + B'C' fails since AB (1100,1101,1110,1111 minus checks) does not correctly cover minterm 11 (1011, B=0, so AB is false there)."
},
{
  id: 'digital-boolean-p9',
  pyqYear: 2023,
  q: "For the 3-variable function f(A,B,C) = Σm(0,3,5,6) (the XNOR/even-parity function), the total number of prime implicants is:",
  options: ["2", "3", "4", "6"],
  answer: 2,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "This function is the even-parity (XNOR-of-three) pattern: on a K-map it forms a checkerboard where every 1-cell is surrounded on all sides by 0-cells (000 borders 001,010,100 — all zeros; 011 borders 001,010,111 — all zeros; and so on for 101 and 110). Because no two ON-set minterms are ever adjacent, none of them can combine with each other into a group of size 2, so each individual minterm is itself a prime implicant — it is an implicant (trivially, a single cell is inside the ON-set) and it cannot be enlarged (every neighbour is a 0). With four ON-set minterms (0,3,5,6), there are exactly four prime implicants: A'B'C', A'BC, AB'C, ABC'. This is the general rule for any parity/XOR-type function of n variables: it has 2^(n-1) ON-set minterms, and because a checkerboard pattern never has two adjacent 1s, every one of those minterms is its own prime implicant, so the minimal SOP is simply the full sum of all 2^(n-1) minterms — parity functions never simplify below their canonical form, which is exactly why they are the worst-case input for K-map minimization exercises."
},
{
  id: 'digital-boolean-p10',
  pyqYear: 2024,
  q: "The number of distinct self-dual Boolean functions of 4 variables is ______.",
  options: [],
  answer: 256,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  kind: 'nat',
  explanation: "Using the general result derived for self-dual functions: a function of n variables is self-dual exactly when its output at every input v is the complement of its output at the bitwise-complemented input v'. The 2^n rows of the truth table split into 2^(n-1) complementary pairs (v, v'), and within each pair, fixing the output at one member automatically fixes the output at the other to be its complement — giving 2 independent choices per pair. With n=4, there are 2^4 = 16 rows forming 2^3 = 8 complementary pairs, and since the pairs are chosen independently, the total count is 2^8 = 256. This matches the general formula 2^(2^(n-1)): for n=2 it gives 4, for n=3 it gives 16 (as in an earlier question), and for n=4 it gives 256 — the numbers grow doubly-exponentially, which is why GATE only ever asks this for n=3 or n=4 and never higher. A quick way to remember which functions are guaranteed self-dual: any single literal (like A) and its complement (A') are always self-dual, since inverting all inputs of A gives A', and the overall complement of A' is A — consistent with the definition."
},
{
  id: 'digital-boolean-p11',
  pyqYear: 2025,
  q: "The minimum number of 2-input NOR gates required to implement F = A ⊕ B (XOR), using only A and B as available signals, is ______.",
  options: [],
  answer: 5,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  kind: 'nat',
  explanation: "Building XOR from NOR gates needs one more gate than building it from NAND gates, because NOR's natural two-level realization matches POS/AND-of-ORs while XOR's convenient decomposition (A B' + A' B) is naturally SOP-shaped and needs an extra inversion layer to convert. A working 5-gate NOR circuit is: gate1 = NOR(A,B); gate2 = NOR(A, gate1); gate3 = NOR(B, gate1); gate4 = NOR(gate2, gate3); gate5 = NOR(gate4, gate4) — the last gate simply inverts, since gate4 alone computes XNOR, and one more NOR-as-inverter flips it to XOR. An exhaustive search over all ways to wire up to 4 two-input NOR gates fed only by A and B (allowing a signal to feed both inputs of a gate, which realizes inversion) never reproduces the XOR truth table, confirming 5 is the true minimum. This is the mirror image of the earlier result that XOR needs only 4 NAND gates but XNOR needs 5 NAND gates: with NOR gates the roles swap, and XNOR is the one that only needs 4 while XOR needs 5. GATE has tested both the NAND-XOR (4) and NOR-XOR (5) counts, so memorize the pair together rather than just one number."
},
{
  id: 'digital-boolean-p12',
  pyqYear: 2026,
  q: "The minimal sum-of-products form of f(A,B,C) = Σm(0,1,2,3,6) is:",
  options: ["A' + BC'", "A' + BC", "B' + AC'", "A' + B'C"],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "Minterms 0,1,2,3 are exactly the four rows where A=0 (000,001,010,011), forming the group A' by themselves — a group of 4 that eliminates both B and C. The remaining minterm, 6 (110), is not covered by A' (since A=1 there) and its only ON-set neighbour is minterm 2 (010) — both have B=1,C=0 with A differing — giving the group BC' (eliminating A). No larger group is available for minterm 6 because minterm 7 (111) and minterm 4 (100) are not in the ON-set. So the minimal SOP is A' + BC', a two-term expression using 3 literals total. Option 'A' + BC' with BC instead of BC' would incorrectly also claim to cover minterm 7 (111), which is not in the given ON-set — check: A'+BC evaluated at A=1,B=1,C=1 gives 0+1=1, but f(7) is not listed as 1, so this option is wrong. Option 'B' + AC'' fails at minterm 2 (010): B'=0 and AC'=0 (since A=0), giving 0, but f(2)=1. Option 'A' + B'C' fails at minterm 6: A'=0 (A=1) and B'C=0 (B=1), giving 0, but f(6)=1."
},
{
  id: 'digital-boolean-p13',
  pyqYear: 2016,
  q: "The Boolean expression PQ + P'R + QR simplifies to:",
  options: ["PQ + P'R", "PQ + QR", "P'R + QR", "PQ + P'R + PR"],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: "This is a direct application of the consensus theorem: for terms XY + X'Z + YZ, the third term YZ is always redundant and can be dropped, because whenever Y=1 and Z=1, at least one of X or X' is 1, so one of the first two terms is already 1 there — YZ never contributes a row that isn't already covered. Here X=P, Y=Q, Z=R, so QR is the consensus term of PQ and P'R, and the expression reduces to PQ + P'R. Verify by truth table at the four rows where Q=1,R=1 (the rows QR would 'add'): if P=1, PQ=1 already covers it; if P=0, P'R=1 already covers it — so QR adds nothing new in any case. Option 'PQ + QR' incorrectly drops P'R instead of QR — check P=0,Q=0,R=1: original expression gives 0+1+0=1, but PQ+QR gives 0+0=0, so this option is wrong. Option 'P'R + QR' drops PQ and fails at P=1,Q=1,R=0. The last option adds a spurious extra term PR that changes nothing but is not the minimal form."
},
{
  id: 'digital-boolean-p14',
  pyqYear: 2022,
  q: "Given a constant logic-1 signal in addition to the variables, which of the following gate sets becomes functionally complete?",
  options: ["{XOR, AND, constant 1}", "{OR, AND, constant 1}", "{AND, constant 1} only", "{OR, constant 1} only"],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: "With a constant 1 available, {XOR, AND} becomes complete: NOT is realized as x ⊕ 1 = x' (since XOR-ing any signal with 1 flips it), AND is given directly, and OR follows from NOT and AND via De Morgan's law, x + y = (x'·y')'. All three primitive operations (NOT, AND, OR) are therefore reachable, so {XOR, AND, 1} is complete — this is exactly the basis used in the algebraic normal form (Zhegalkin polynomial) representation of Boolean functions, where every function is written as a sum of AND-terms combined with XOR. The other three options all stay incomplete even with the constant, for the same underlying reason: OR and AND are monotone functions (increasing any input can never decrease the output), and appending a fixed constant input does not break monotonicity — the output, viewed as a function of the true variables, still never decreases when a variable rises. NOT is the one basic operation that is not monotone (raising the input from 0 to 1 lowers the output from 1 to 0), so no combination of only OR, only AND, or OR-and-AND together, however many constant-1 wires are fed in, can ever realize it. This is why the constant alone never rescues a purely monotone gate set, while it does rescue XOR-based sets, since XOR is not monotone."
}
);

window.GATE_DATA.questions['digital'].topics.find(function(t){return t.id==='digital-combinational';}).questions.push(
{
  id: 'digital-combinational-p1',
  pyqYear: 2015,
  q: "The function f(A,B,C) = Σm(0,2,4,5) is to be realized using a 4-to-1 multiplexer with A, B (A as MSB) as select lines and data inputs I0, I1, I2, I3. The correct assignment is:",
  options: ["I0 = C', I1 = C', I2 = 1, I3 = 0", "I0 = C, I1 = C, I2 = 0, I3 = 1", "I0 = C', I1 = C, I2 = 1, I3 = 0", "I0 = 1, I1 = C', I2 = C', I3 = 0"],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "With select lines AB choosing which data input is routed, each group of two minterms sharing the same AB value determines one data input as a function of the leftover variable C. For AB=00 (minterms 0,1): only minterm 0 (C=0) is in the ON-set and minterm 1 (C=1) is not, so I0 must be 1 when C=0 and 0 when C=1 — that is I0 = C'. For AB=01 (minterms 2,3): only minterm 2 (C=0) is present, so I1 = C' as well. For AB=10 (minterms 4,5): both minterms 4 (C=0) and 5 (C=1) are in the ON-set, so the output must be 1 regardless of C — I2 = 1. For AB=11 (minterms 6,7): neither is in the ON-set, so I3 = 0. This residue method — for each select combination, compare the two candidate minterms against the ON-set to decide between 0, 1, C, or C' — is the standard technique for realizing any n-variable function on a 2^(n-1)-to-1 mux, and it is far faster than deriving the SOP first. Option (b) has every assignment complemented; option (c) mixes up C and C' for I1; option (d) shifts the whole pattern by one select combination."
},
{
  id: 'digital-combinational-p2',
  pyqYear: 2016,
  q: "The minimum number of 2-to-1 multiplexers required to build a 16-to-1 multiplexer, using only 2-to-1 muxes arranged in a tree, is:",
  options: ["8", "15", "16", "31"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "A tree built from 2-to-1 muxes halves the number of data lines at every level: level 1 needs 8 muxes to merge the 16 inputs down to 8 lines, level 2 needs 4 muxes to merge those down to 4, level 3 needs 2 muxes down to 2, and level 4 needs 1 final mux down to the single output. Total = 8 + 4 + 2 + 1 = 15. This matches the general formula for building a 2^n-to-1 mux entirely from 2-to-1 muxes: it always takes exactly 2^n − 1 of them, mirroring a complete binary tree with 2^n leaves and 2^n − 1 internal nodes (each internal node is one 2-to-1 mux). For 16 = 2^4 this gives 16 − 1 = 15. Option (a) 8 is only the first level's mux count, forgetting the remaining levels. Option (c) 16 matches the number of data inputs, not the mux count. Option (d) 31 is the classic off-by-one error of computing 2×16 − 1 instead of 16 − 1, or equivalently miscounting one extra level."
},
{
  id: 'digital-combinational-p3',
  pyqYear: 2017,
  q: "A 3-to-8 decoder (with outputs D0-D7) is used along with 2-input OR gates to realize f(A,B,C) = Σm(1,3,5,6). The minimum number of 2-input OR gates needed is:",
  options: ["1", "2", "3", "4"],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "Every decoder output line D_i is exactly the minterm m_i of the inputs (one line goes high for each unique input combination), so realizing any SOP function reduces to ORing together the decoder outputs whose indices appear in the function's minterm list. Here we must OR four lines, D1, D3, D5 and D6. A tree of 2-input OR gates combining n signals always needs exactly n − 1 gates (each gate reduces the signal count by one, and you need to get from n down to 1): first OR D1 and D3 to get one signal, OR D5 and D6 to get a second signal, then OR those two partial results together — that is 3 gates total (2 first-level + 1 second-level). This generalizes the earlier mux-tree counting rule (n inputs need n−1 combining elements) to OR-gate trees combining decoder minterms. Option (a) 1 would only work if a single 4-input OR gate were allowed, but the question restricts to 2-input gates. Options (b) and (d) undercount or overcount the tree depth needed for exactly four signals."
},
{
  id: 'digital-combinational-p4',
  pyqYear: 2018,
  q: "A 2-bit unsigned magnitude comparator compares A = A1A0 against B = B1B0. For A = 10 (decimal 2) and B = 01 (decimal 1), the comparator's three outputs (A>B, A<B, A=B) are:",
  options: ["(1, 0, 0)", "(0, 1, 0)", "(0, 0, 1)", "(1, 1, 0)"],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "Magnitude comparison always starts from the most significant bit: if the MSBs differ, that single bit already decides the outcome and no lower bit is examined. Here A1 = 1 and B1 = 0 — they differ, and since A1 = 1 > B1 = 0, A is greater than B regardless of what A0 and B0 are. So (A>B, A<B, A=B) = (1, 0, 0), consistent with the decimal check 2 > 1. This MSB-first cascading rule is exactly how a multi-bit comparator is built from 1-bit comparator modules: the equality output of a higher-order stage gates whether the lower-order stage's comparison is even allowed to matter, so a difference detected higher up immediately locks in the final answer and no combinational path needs to examine the remaining bits at all. Option (b) reverses the direction of the inequality; option (c) wrongly claims equality despite the differing MSBs; option (d) asserts both A>B and A<B simultaneously, which is logically impossible for any comparator design."
},
{
  id: 'digital-combinational-p5',
  pyqYear: 2019,
  q: "The 4-variable function f(A,B,C,D) = Σm(1,2,4,7,9,11,12,14) is realized on an 8-to-1 multiplexer using A, B, C (A as MSB) as select lines and D as the residual variable. The data input I5 (select ABC = 101) equals:",
  options: ["0", "1", "D", "D'"],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "Select combination ABC = 101 corresponds to the minterm pair (m10, m11) — since D contributes the last bit, m10 = 1010 (D=0) and m11 = 1011 (D=1). Checking the ON-set {1,2,4,7,9,11,12,14}: minterm 10 is absent but minterm 11 is present. So the output must be 0 when D=0 and 1 when D=1 — that is exactly I5 = D. Working through the full mux this way for all eight select combinations gives I0=D, I1=D', I2=D', I3=D, I4=D, I5=D, I6=D', I7=D' — note I3, I4 and I5 all happen to equal D, while I1, I2, I6, I7 equal D', illustrating that a mux realization does not require each data input to be distinct. Option 'D'' would be the answer only if minterm 10 were present and minterm 11 absent, the opposite of the actual ON-set membership. Options 0 and 1 would require both or neither of {10, 11} to be present, which is not the case here."
},
{
  id: 'digital-combinational-p6',
  pyqYear: 2020,
  q: "A 4-to-16 decoder is built by combining 3-to-8 decoders, each with a single active-high enable input, plus any necessary inverters. The minimum number of 3-to-8 decoder modules required is:",
  options: ["1", "2", "3", "4"],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "A 4-to-16 decoder must produce 16 distinct output lines from 4 address bits, but each 3-to-8 decoder can only decode 3 of those bits into 8 lines at a time. The standard trick is to use the 4th (most significant) address bit to select which of two 3-to-8 decoders is active: feed the lower 3 bits to both decoders' address inputs in parallel, feed the MSB directly to one decoder's enable and its complement (via one inverter) to the other decoder's enable. When the MSB is 0, the first decoder is enabled and produces outputs D0-D7; when the MSB is 1, the second decoder is enabled and produces D8-D15 on the very same eight physical output lines relabeled. This needs exactly 2 decoder modules (plus 1 inverter, which is not counted among 'decoder modules'). This enable-controlled doubling is a general pattern: two n-to-2^n decoders with complementary enables build one (n+1)-to-2^(n+1) decoder, and it can be applied recursively — four 3-to-8 decoders (with a 2-to-4 decoder driving their enables) would build a 5-to-32 decoder, needing one extra doubling stage."
},
{
  id: 'digital-combinational-p7',
  pyqYear: 2021,
  q: "A 4-bit magnitude comparator is built by cascading four 1-bit comparator stages, most-significant bit first, where each stage receives the (greater/less/equal) result of the more significant stage as an override. The correct cascading principle is:",
  options: [
    "A stage's own comparison is used only if every more-significant stage reported equality; otherwise the most-significant stage that found a difference determines the final result",
    "Every stage's comparison result is simply ORed together regardless of position",
    "Only the least significant bit's comparison matters; higher bits are ignored",
    "Each stage overrides the next more significant stage's result if they disagree"
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "Magnitude comparison is lexicographic from the most significant bit down: the first (most significant) bit position where A and B differ fully determines whether A is greater or less than B, and every less-significant bit becomes irrelevant once such a difference is found. So the correct cascade computes, for each bit position from MSB to LSB, 'is this the first position of disagreement, and if so which way does it go' — equivalently, a stage's own A>B or A<B verdict is only allowed to propagate to the final output if every stage above it (more significant) reported equality; the moment a more significant stage finds A≠B, that stage's verdict is final and cannot be overridden by any lower stage. This is exactly the opposite of option (d), which would incorrectly let less significant bits override more significant ones — that would make comparators nonsensical, since it would let a 1-bit difference in the ones place override a genuine difference in the highest bit. A plain OR of all stages (option b) cannot work either, since it does not respect precedence and could not correctly resolve conflicting less-significant signals."
},
{
  id: 'digital-combinational-p8',
  pyqYear: 2022,
  q: "The minimum number of 4-to-1 multiplexers needed to build a 64-to-1 multiplexer, arranged as a tree of 4-to-1 muxes, is:",
  options: ["16", "20", "21", "63"],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "Each 4-to-1 mux stage reduces the number of signal lines by a factor of 4, since it has 2 select bits handling 4 inputs at a time; building a 4^k-to-1 mux this way needs k levels. Here 64 = 4^3, so three levels are needed: the first level takes the 64 original inputs and needs 64/4 = 16 muxes to produce 16 intermediate signals; the second level takes those 16 signals and needs 16/4 = 4 muxes to produce 4 signals; the third level takes those 4 signals and needs 4/4 = 1 mux to produce the final single output. Total = 16 + 4 + 1 = 21. This matches the general formula for building a 4^k-to-1 mux entirely from 4-to-1 muxes: (4^k − 1)/3, giving (64−1)/3 = 21. Option (a) 16 only counts the first level. Option (b) 20 is an easy arithmetic slip (16+4=20, forgetting the final combining mux). Option (d) 63 confuses this with the '2-to-1 muxes needed for an m-to-1 mux' formula (m−1), which does not apply when the building block is 4-to-1 rather than 2-to-1."
},
{
  id: 'digital-combinational-p9',
  pyqYear: 2023,
  q: "A single 3-to-8 decoder is shared to realize two functions: f1(A,B,C) = Σm(0,2,5) and f2(A,B,C) = Σm(1,3,6,7), each via its own tree of 2-input OR gates. The total number of 2-input OR gates required (summed over both functions) is:",
  options: ["4", "5", "6", "7"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "Each function needs an OR-gate tree combining as many decoder output lines as it has minterms, and combining n signals with 2-input OR gates always needs n − 1 gates. f1 has 3 minterms (0, 2, 5), so it needs 3 − 1 = 2 OR gates: OR two of the lines together, then OR that result with the third line. f2 has 4 minterms (1, 3, 6, 7), so it needs 4 − 1 = 3 OR gates, combined as a balanced tree (two first-level ORs feeding one second-level OR). The two functions do not share any OR gates since they depend on entirely disjoint sets of decoder lines (the decoder itself is the only shared resource). Total OR gates = 2 (for f1) + 3 (for f2) = 5. This question tests the same n−1 counting rule applied twice and then summed — a common way GATE combines two 'easy' sub-counts into one numerically trickier question. Option (a) 4 would result from miscounting f1 as needing only 1 gate; option (c) and (d) overcount by assuming an unbalanced or redundant tree structure."
},
{
  id: 'digital-combinational-p10',
  pyqYear: 2024,
  q: "The 4-variable function f(A,B,C,D) = Σm(1,3,4,6,7) is realized on an 8-to-1 multiplexer with A, B, C as select lines (A as MSB) and D as the residual data variable. The correct data-input assignment (I0 through I7) is:",
  options: [
    "I0=C, I1=C, I2=C', I3=1, I4=0,I5=0,I6=0,I7=0",
    "I0=D, I1=D, I2=D', I3=1, I4=0, I5=0, I6=0, I7=0",
    "I0=0, I1=D, I2=D', I3=1, I4=0, I5=0, I6=0, I7=0",
    "I0=D, I1=D', I2=D, I3=1, I4=0, I5=0, I6=0, I7=0"
  ],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "With select ABC choosing the minterm pair and D the residual variable, check each ABC group against the ON-set {1,3,4,6,7}: ABC=000 gives minterms 0 (absent) and 1 (present), so the output is 0 when D=0, 1 when D=1 → I0 = D. ABC=001 gives minterms 2 (absent) and 3 (present) → I1 = D. ABC=010 gives minterms 4 (present) and 5 (absent) → I2 = D'. ABC=011 gives minterms 6 and 7, both present → I3 = 1. ABC=100 through 111 give minterms 8-15, none of which are in the ON-set, so I4 through I7 are all 0. This matches option (b) exactly. Option (a) mistakenly uses C instead of D as the residual variable, which is inconsistent since C is already consumed as a select line. Option (c) wrongly sets I0 = 0, missing that minterm 1 is present. Option (d) swaps I1 and I2's residual literal, which would incorrectly cover minterm 2 instead of minterm 3."
},
{
  id: 'digital-combinational-p11',
  pyqYear: 2025,
  q: "An 8-to-3 priority encoder (inputs D0-D7, higher index = higher priority) has D1 = D3 = D5 = 1 and all other inputs 0. The 3-bit output code and the valid (V) flag are:",
  options: ["101, V=1", "011, V=1", "111, V=1", "101, V=0"],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "A priority encoder ignores every active input except the highest-priority one — here, priority increases with index, so among the active lines D1, D3 and D5, only D5 (the highest index that is asserted) determines the output; D1 and D3 are simply overridden and have no further effect. The binary code for index 5 is 101, so the output lines are 1,0,1. Since at least one input is active, the valid flag V is asserted (V=1) to signal that the output code is meaningful — without V, a code of all-zero output would be ambiguous between 'no inputs active' and 'D0 is the only active input,' which is exactly why priority encoders always include a validity output. Option (b) 011 would be the code for index 3, wrongly treating D3 as the winner instead of the higher-priority D5. Option (c) 111 would be index 7, which is not active at all. Option (d) correctly identifies the code but wrongly reports V=0, which would falsely indicate no valid input despite three lines being active."
},
{
  id: 'digital-combinational-p12',
  pyqYear: 2026,
  q: "A 4-bit equality comparator is built as four bitwise XNOR gates followed by a single tree of 2-input AND gates combining their outputs into one overall equality signal. The total number of 2-input gates (XNOR plus AND) required is:",
  options: ["4", "6", "7", "8"],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "Each of the 4 bit positions needs its own XNOR gate to test 'this pair of bits is equal,' contributing 4 XNOR gates in total (one per bit, since XNOR(x,y) = 1 exactly when x=y). The four XNOR outputs must then all be ANDed together to assert overall equality only when every bit position matches; combining n signals with 2-input AND gates always needs n − 1 gates, so combining 4 XNOR outputs needs 4 − 1 = 3 AND gates arranged as a small tree (two first-level ANDs feeding one final AND). Total gate count = 4 (XNOR) + 3 (AND) = 7. Option (a) 4 counts only the XNOR stage and forgets the combining logic entirely. Option (b) 6 undercounts the AND tree by one (perhaps assuming a 4-input AND counts as one gate, which contradicts the 2-input-gate restriction stated in the question). Option (d) 8 overcounts by adding an unnecessary extra AND gate."
},
{
  id: 'digital-combinational-p13',
  pyqYear: 2017,
  q: "Using the residue (mux realization) method, the minimum number of select lines required to realize any single Boolean function of 5 variables on one multiplexer is:",
  options: ["2", "3", "4", "5"],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: "The residue method realizes an n-variable function using a 2^(n-1)-to-1 multiplexer: n-1 of the variables drive the select lines (grouping the minterms into pairs), and the single remaining variable is folded into the data inputs as one of 0, 1, the variable itself, or its complement — since any pair of minterms differing only in that last variable can always be expressed this way. For n = 5 variables, this means n - 1 = 4 select lines are needed, driving a 2^4 = 16-to-1 multiplexer, with the 5th variable appearing across the sixteen data inputs. Using only 3 select lines would give an 8-to-1 mux with 2 residual variables per data input slot, which is not sufficient because a single data input (which can only be 0, 1, a variable, or its complement) cannot represent an arbitrary function of two leftover variables — some groupings would need I_k to equal something like C⊕D, which a plain mux data line cannot supply. So 4 is the minimum guaranteed to work for every possible 5-variable function, and it is also sufficient, since the residue method always succeeds with exactly n-1 selects."
},
{
  id: 'digital-combinational-p14',
  pyqYear: 2021,
  q: "A 3-to-8 decoder's outputs are grouped into two OR gates: Z1 = OR(D1, D2, D4, D7) and Z2 = OR(D0, D3, D5, D6), where D0-D7 correspond to input combinations ABC = 000 through 111. For input ABC = 101, the values of (Z1, Z2) are:",
  options: ["(1, 0)", "(0, 1)", "(1, 1)", "(0, 0)"],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: "ABC = 101 is minterm 5, so decoder output D5 is the single line that goes high; every other decoder output stays low. D5 appears in the Z2 group (D0, D3, D5, D6), so Z2 = 1, while D5 does not appear in the Z1 group (D1, D2, D4, D7), so Z1 = 0. Stepping back, this decoder wiring is actually a parity generator: Z1's group {1,2,4,7} are exactly the minterms with an odd number of 1-bits (001, 010, 100, 111), so Z1 computes the odd-parity (XOR) of A, B, C, while Z2's group {0,3,5,6} are exactly the minterms with an even number of 1-bits, so Z2 computes the even-parity (XNOR) of A, B, C. Since 101 has two 1-bits (even), Z2 = 1 and Z1 = 0 is exactly what parity theory predicts, confirming the decoder trace. This is a common GATE construction: any decoder plus a partition of its outputs into two OR gates realizes some function and its complement simultaneously."
}
);
