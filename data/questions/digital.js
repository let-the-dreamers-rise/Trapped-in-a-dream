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
