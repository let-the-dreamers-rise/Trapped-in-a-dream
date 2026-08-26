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
