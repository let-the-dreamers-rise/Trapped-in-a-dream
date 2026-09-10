// Textbook chapter: Boolean Algebra and Logic Minimization.
// Written directly (no subagent) to match the depth and voice of the other
// chapters in data/chapters/.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['digital-boolean'] = {
  figs: [
    {
      id: 'kmap-4var-groups',
      caption: 'A 4-variable K-map for f = ΣmΔ(0,1,2,5,7,8,9,10,13,15), with the four essential prime implicant groups drawn: B′C′ (top-left corners), C′D, BD, and B′D′. Gray-code row/column order keeps every physically adjacent pair one bit apart.',
      svg: '<svg viewBox="0 0 260 220" width="100%" style="max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1" fill="none"><rect x="60" y="40" width="200" height="160"/><line x1="110" y1="40" x2="110" y2="200"/><line x1="160" y1="40" x2="160" y2="200"/><line x1="210" y1="40" x2="210" y2="200"/><line x1="60" y1="80" x2="260" y2="80"/><line x1="60" y1="120" x2="260" y2="120"/><line x1="60" y1="160" x2="260" y2="160"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="85" y="30">00</text><text x="135" y="30">01</text><text x="185" y="30">11</text><text x="235" y="30">10</text><text x="45" y="65">00</text><text x="45" y="105">01</text><text x="45" y="145">11</text><text x="45" y="185">10</text><text x="160" y="18">CD</text><text x="20" y="120">AB</text><text x="85" y="65">1</text><text x="135" y="65">1</text><text x="185" y="65">0</text><text x="235" y="65">1</text><text x="85" y="105">0</text><text x="135" y="105">1</text><text x="185" y="105">1</text><text x="235" y="105">0</text><text x="85" y="145">0</text><text x="135" y="145">1</text><text x="185" y="145">1</text><text x="235" y="145">0</text><text x="85" y="185">1</text><text x="135" y="185">1</text><text x="185" y="185">0</text><text x="235" y="185">1</text></g></svg>'
    },
    {
      id: 'gray-code-adjacency',
      caption: 'Gray code sequence 00, 01, 11, 10 across 2 bits: each consecutive pair (including the wrap from the last back to the first) differs in exactly one bit — exactly the adjacency property a K-map relies on.',
      svg: '<svg viewBox="0 0 300 90" width="100%" style="max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.2" fill="none" marker-end="url(#gcarrow)"><line x1="40" y1="40" x2="100" y2="40"/><line x1="140" y1="40" x2="200" y2="40"/><line x1="240" y1="40" x2="270" y2="40"/><path d="M270,40 Q270,80 40,70 Q10,68 20,50" /></g><defs><marker id="gcarrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/></marker></defs><g font-size="12" fill="currentColor" text-anchor="middle" font-family="monospace"><text x="25" y="45">00</text><text x="120" y="45">01</text><text x="220" y="45">11</text><text x="285" y="45">10</text></g></svg>'
    }
  ],
  text: `
WHY BOOLEAN ALGEBRA, AND THE TWO PROBLEMS IT SOLVES

Every digital circuit is, underneath its physical gates and wires, a Boolean function — an assignment of 0 or 1 to every combination of input bits. This chapter's job is answering two closely related questions about such functions: how to PROVE that two different-looking Boolean expressions are actually the same function (using a fixed toolbox of algebraic laws), and how to find the SIMPLEST possible expression for a given function (using canonical forms and Karnaugh maps). The second question carries the greater practical weight, but it depends entirely on the first — every K-map grouping is really an application of one specific algebraic law (the combining/adjacency law x·y + x·y′ = x below) done visually rather than symbolically, and recognising this connection is what makes K-map minimization feel like applying algebra rather than following an unexplained visual trick.

THE COMPLETE LAW REFERENCE

Every law below is stated in its DUAL PAIR (one with +/AND, one with ·/OR, obtained from the other by swapping + and · and swapping 0 and 1) — this pairing is not a coincidence; it is a direct instance of the DUALITY PRINCIPLE covered fully below.

IDENTITY LAWS: x+0=x, x·1=x — combining with the "do nothing" element of each operation leaves x unchanged.

NULL (DOMINATION) LAWS: x+1=1, x·0=0 — combining with the "absorbing" element of each operation forces that fixed result, regardless of x.

IDEMPOTENT LAWS: x+x=x, x·x=x — combining a value with itself changes nothing, since Boolean values (unlike ordinary numbers) have no notion of "accumulating" beyond true/false.

COMPLEMENT LAWS: x+x′=1, x·x′=0 — a value and its own negation together cover every possibility (OR gives certain truth) and share nothing in common (AND gives certain falsehood).

COMMUTATIVE LAWS: x+y=y+x, x·y=y·x. ASSOCIATIVE LAWS: (x+y)+z=x+(y+z), (x·y)·z=x·(y·z) — both operations can be reordered and regrouped freely, exactly as with ordinary addition and multiplication.

DISTRIBUTIVE LAWS: x(y+z)=xy+xz (the familiar form, identical in shape to ordinary arithmetic) AND its DUAL x+yz=(x+y)(x+z) — this second form has NO ordinary-arithmetic counterpart (ordinary addition does not distribute over multiplication) and is consequently the one most often forgotten, despite being just as valid and just as useful, particularly when manipulating a POS (product-of-sums) expression.

ABSORPTION LAWS: x+xy=x, x(x+y)=x — the term xy (or x+y) is entirely "absorbed" into x, since x alone already determines the result regardless of y.

1. Proving x+xy=x by pure algebra, using only the laws already stated: x+xy = x·1+x·y (identity law, x=x·1) = x(1+y) (distributive law, factoring x out) = x·1 (null law, 1+y=1) = x (identity law again). Every step invokes a NAMED law explicitly, confirming absorption is not a separate fundamental fact but a derived consequence of the more basic laws.

REDUNDANCY (ELIMINATION) LAW: x+x′y=x+y, and its dual x(x′+y)=xy.

1. Proving x+x′y=x+y: x+x′y = (x+x′)(x+y) (distributive law in its DUAL form, x+ab=(x+a)(x+b) with a=x′,b=y) = 1·(x+y) (complement law, x+x′=1) = x+y (identity law). This is exactly the "combining" step underlying every K-map group, discussed fully below.

INVOLUTION (DOUBLE COMPLEMENT): (x′)′=x — negating twice returns the original value.

DE MORGAN'S LAWS: (x+y)′=x′y′, (xy)′=x′+y′ — complementing a sum turns it into a product of the individual complements, and complementing a product turns it into a sum of the individual complements; the operation SWAPS under complementation. This GENERALISES directly to any number of terms: complementing a sum of n terms gives a product of n complemented terms, and vice versa — this generalised form is what justifies converting an arbitrarily long NAND/NOR expression into its AND/OR/NOT equivalent in one mechanical pass.

CONSENSUS THEOREM: xy+x′z+yz = xy+x′z (the third term, yz, called the CONSENSUS term, is entirely REDUNDANT and can be dropped without changing the function) — dual form: (x+y)(x′+z)(y+z) = (x+y)(x′+z).

1. Why the consensus term is redundant: wherever yz=1 (both y=1 and z=1), consider the two cases for x. If x=1, xy=y=1 already covers this input (making the whole expression 1 regardless of the consensus term). If x=0, x′z=z=1 already covers it. Either way, whenever yz=1, at least one of the other two terms is ALREADY 1 — the consensus term never contributes a "new" 1 that the other two terms did not already supply, confirming it can be dropped with no change to the function.
2. This theorem is a major K-map-avoidance shortcut on any hand-worked simplification: spotting the xy+x′z+yz pattern (or its dual) directly in an expression allows dropping a whole term in one step, without ever needing to build out a full K-map to discover the same simplification visually.

DUALITY PRINCIPLE: replacing every + with ·, every · with +, every 0 with 1, and every 1 with 0 throughout a VALID Boolean identity produces another valid identity — this is why every law above was stated in matched pairs, and it means proving HALF the laws in this chapter automatically proves the other half for free, via the substitution.

GATE TRAP: the DUAL of an expression is emphatically NOT the same as its COMPLEMENT — a frequently tested distinction. dual(x+y) = x·y (swap the OPERATOR only, leave the VARIABLES unchanged), while the complement (x+y)′ = x′y′ (by De Morgan, which ALSO complements each variable). The dual and the complement happen to coincide only for a SELF-DUAL function under complementation of variables — in general they are different expressions entirely, and confusing "take the dual" with "take the complement" (or vice versa) in a question is one of the most reliable ways to lose easy marks in this topic.

SHANNON'S EXPANSION

SHANNON'S EXPANSION: f(x₁,...,xₙ) = x₁·f(1,x₂,...,xₙ) + x₁′·f(0,x₂,...,xₙ) — any Boolean function can be split into two smaller functions (each with one fewer variable, since x₁ has been fixed to a specific value in each), combined by selecting between them based on x₁ itself.

1. This is not an arbitrary algebraic identity; it directly describes how a 2-to-1 MULTIPLEXER implements ANY function of x₁: feed f(0,x₂,...,xₙ) into the mux's "0" input, f(1,x₂,...,xₙ) into its "1" input, and use x₁ as the SELECT line — the multiplexer's own behaviour (output the selected input) IS exactly Shannon's expansion computed in hardware.
2. Applying Shannon's expansion repeatedly, one variable at a time, is precisely how a function can be built entirely out of 2-to-1 multiplexers, a standard construction question, with each successive expansion peeling off one more variable into its own layer of select lines.

CANONICAL FORMS: MINTERMS AND MAXTERMS

A MINTERM is a product (AND) term containing every variable exactly once, either true or complemented, and it is 1 for EXACTLY ONE input combination — the specific combination matching its own pattern of true/complemented variables. Minterms are NUMBERED by treating the true/complemented pattern as a binary number (with variables listed in a fixed, agreed order, e.g. A,B,C): minterm A′BC′ (A=0,B=1,C=0) is numbered 010 in binary, i.e. minterm 2.

A MAXTERM is a sum (OR) term containing every variable exactly once, and it is 0 for EXACTLY ONE input combination. Maxterm i is exactly the complement of minterm i (a direct De Morgan consequence: complementing the product-of-true-variables minterm pattern gives the sum-of-complemented-variables maxterm pattern).

f = Σm(list) means f is 1 exactly on the listed minterms (0 everywhere else). f = ΠM(list) means f is 0 exactly on the listed maxterms (1 everywhere else).

KEY: THE COMPLEMENT RULE connects the two canonical forms directly — if f = Σm(S) over n variables (so the universe of all possible minterm indices is U={0,1,...,2ⁿ−1}), then f′ = Σm(U−S) (f′ is 1 on exactly the minterms f is NOT 1 on), and EQUIVALENTLY f = ΠM(U−S) (f itself, expressed as a product of maxterms, uses exactly the indices f′'s minterm form uses) — this single rule lets a function be converted between Σm and ΠM form, or complemented, without redoing any truth-table work from scratch, purely by taking the set-complement of the index list within U.

K-MAP RULES AND THE GRAY-CODE FOUNDATION

[[FIG:gray-code-adjacency]]

A K-MAP places minterms in a grid such that any two PHYSICALLY ADJACENT cells (including WRAP-AROUND adjacency — the leftmost and rightmost columns are adjacent, and the topmost and bottommost rows are adjacent, as if the map were drawn on a torus) differ in EXACTLY ONE variable. This adjacency is achieved by ordering rows and columns in GRAY CODE (00, 01, 11, 10 — note this is NOT plain binary counting order, which would be 00, 01, 10, 11), since consecutive Gray-code values differ in exactly one bit by construction, and the WRAP from the last value back to the first also differs in only one bit (10→00 flips only the first bit), which plain binary order does not guarantee.

1. WHY this adjacency matters directly: two adjacent minterms differing in exactly one variable — say minterm xy′z and minterm xyz (differing only in y) — can be COMBINED via the redundancy law exactly: xy′z+xyz = xz(y′+y) = xz·1 = xz (distributive law then complement law then identity law) — the two minterms merge into a SINGLE, SHORTER term with one fewer literal. This is EXACTLY the redundancy law x+x′y=x+y applied in reverse (factoring rather than combining), confirming that a K-map "adjacent-cell grouping" is nothing more than this specific algebraic law performed visually rather than symbolically.

[[FIG:kmap-4var-groups]]

VALID GROUP SIZES are powers of two only: 1, 2, 4, 8, 16 cells (never 3, 5, 6, or any non-power-of-two count) — a group of 2ᵏ cells removes k variables from the resulting term (the k variables that DIFFER somewhere across the group's cells), leaving (n−k) literals in the surviving term.

GATE TRAP: after grouping, a group of size 2ᵏ has EXACTLY (n−k) literals, NOT k literals — a group of 4 cells (k=2) in a 4-variable map (n=4) has 4−2=2 literals, and miscounting this as "2 cells removed means the term has 2 literals" (confusing k with n−k directly) is a common arithmetic slip when reading a term off a K-map group quickly.

THE FOUR CORNER CELLS of a 4-variable K-map are MUTUALLY ADJACENT (via the wrap-around rule applied in both the row and column directions simultaneously) and form a LEGAL group of 4 — a fact easy to overlook when scanning a map only for "obviously touching" rectangular blocks, since the four corners appear maximally separated on the drawn page despite being genuinely adjacent under the wrap-around convention.

PRIME IMPLICANTS, ESSENTIAL PRIME IMPLICANTS, AND MINIMAL COVERS

An IMPLICANT is any product term whose 1s form a SUBSET of f's ON-set — a valid, but not necessarily MAXIMAL, grouping (a single minterm, by itself, is always a trivially valid implicant).

A PRIME IMPLICANT (PI) is an implicant that cannot be enlarged any further (cannot be merged with a neighbouring group to drop one more literal) without covering a cell that is actually 0 — found in practice by identifying every MAXIMAL rectangle of 1s (and usable don't-cares) on the map.

An ESSENTIAL PRIME IMPLICANT (EPI) is a PI that is the only PI covering some particular minterm — every minimal SOP expression must include every EPI, since no other term available can cover that minterm instead.

THE SELECTION PROCEDURE FOR A MINIMAL SOP, as a fixed sequence of steps:

1. Find ALL prime implicants (every maximal rectangle of 1s/don't-cares on the map).
2. Build a PI CHART: minterms as columns, PIs as rows, marking an X wherever a PI covers a minterm.
3. Identify ESSENTIAL PIs — any column (minterm) with EXACTLY ONE X in it forces that row's PI to be essential. Include every essential PI in the final answer, and remove every minterm it covers from further consideration (they are now accounted for).
4. For any minterms STILL uncovered after step 3, choose the FEWEST remaining PIs (preferring cheaper PIs — fewer literals, or covering more of the remaining minterms per PI chosen) that together cover everything left — this residual step is genuinely a SET-COVER problem, and may require trial-and-error comparison of a few candidate combinations; PETRICK'S METHOD gives an exact, systematic algebraic way to find the true minimum when trial-and-error becomes error-prone on a larger chart.

DON'T CARES (denoted d or X on a map) may be treated as either 1 or 0, whichever choice helps ENLARGE a group covering an actual required minterm. A minimal cover is never forced to include a term built entirely from don't-cares as essential, since such a term (by definition) covers no minterm that actually needs to be 1 — there is nothing genuinely required for it to be essential FOR.

Worked trace — full K-map minimization: f(A,B,C,D) = Σm(0,1,2,5,7,8,9,10,13,15).

1. Minterm listing in ABCD binary: 0=0000, 1=0001, 2=0010, 5=0101, 7=0111, 8=1000, 9=1001, 10=1010, 13=1101, 15=1111.
2. Laying these out on the K-map (rows AB in Gray order 00,01,11,10; columns CD in Gray order 00,01,11,10) and identifying maximal groups: {0,1,8,9} (all four have B=0,C=0, D varies) simplifies to B′C′. {1,5,9,13} (all four have C=0,D=1, A,B vary) simplifies to C′D. {5,7,13,15} (all four have B=1,D=1) simplifies to BD. {0,2,8,10} (all four have B=0,D=0) simplifies to B′D′.
3. Checking that EVERY listed minterm is covered by at least one group: m0,m8 by both B′C′ and B′D′; m1,m9 by both B′C′ and C′D; m2,m10 by B′D′ only; m5,m13 by both C′D and BD; m7,m15 by BD only.
4. Checking essentiality: m2 and m10 are covered ONLY by B′D′ (no other group reaches them), so B′D′ is essential. m7 and m15 are covered ONLY by BD, so BD is essential. These two essential groups together already cover {0,2,5,7,8,10,13,15}, leaving only m1 and m9 still uncovered from the original ten. Checking m1 and m9 against the two REMAINING candidate groups: both B′C′ (which covers {0,1,8,9}) and C′D (which covers {1,5,9,13}) already cover BOTH m1 and m9 on their own — neither m1 nor m9 forces one specific group over the other, so B′C′ and C′D are NOT both essential; only ONE of the two is actually needed to finish the cover, and either choice works equally well.
5. Minimal SOP: picking B′C′ (C′D would work just as well instead) gives f = B′D′ + BD + B′C′ — 3 terms, 6 literals total, and this is genuinely minimal: B′D′ and BD are essential (each is the ONLY group reaching some minterm), and exactly one of {B′C′, C′D} is required to cover the two minterms (m1, m9) that remain once the essential groups are accounted for — including BOTH B′C′ and C′D, as a first pass might be tempted to do, would add a redundant fourth term that no minterm actually requires.

Worked trace — prime implicant counting with don't-cares: f(A,B,C) = Σm(1,3,5) + d(6,7).

1. On the 3-variable K-map (rows AB in Gray order, column C in order 0,1): the ON-set cells are m1 (A=0,B=0,C=1), m3 (A=0,B=1,C=1), m5 (A=1,B=0,C=1); don't-cares are m6 (A=1,B=1,C=0) and m7 (A=1,B=1,C=1).
2. Since m1, m3, m5, and the don't-care m7 ALL share C=1, and treating d7 as a usable 1 lets these four cells form ONE maximal group spanning the entire C=1 column (all combinations of A,B, with C fixed at 1): this group simplifies to the single literal C.
3. Checking essentiality: m1, m3, and m5 (the three REQUIRED minterms) are each covered ONLY by this single group C — no smaller or alternative PI covers them, since C is already the LARGEST possible group reaching them, so C is essential.
4. Minimal SOP: f = C exactly — a single literal answer, using the don't-care m7 to enlarge the group maximally (the OTHER don't-care, m6, ends up assigned the value 1 as a side effect of this choice of C, which is entirely acceptable since d6 permits either value and was never required to be anything specific).

GATE TRAP: it is tempting to treat a don't-care cell as automatically "free" and therefore always beneficial to use — but a don't-care should be folded into a group ONLY when doing so genuinely enlarges an implicant covering a REQUIRED minterm (as m7 did above); a group built ENTIRELY out of don't-cares, covering no required minterm at all, contributes nothing to a minimal cover and should never be included as if it were essential.

THE QUINE-McCLUSKEY TABULAR METHOD

A K-map is convenient up to about 4-5 variables, but its visual grouping becomes impractical to draw and scan reliably beyond that. The QUINE-McCLUSKEY METHOD achieves exactly the same result — finding all prime implicants systematically — using a TABULAR procedure that scales to any number of variables and is easy to perform mechanically, one bit-comparison at a time, without needing to visualise adjacency at all.

1. GROUP minterms by the NUMBER OF 1s in their binary representation (their "weight") — two minterms can only potentially combine (differ in exactly one bit) if their weights differ by EXACTLY 1, so grouping by weight first dramatically cuts down which pairs even need to be checked.
2. COMPARE every minterm in one weight-group against every minterm in the ADJACENT weight-group (one weight higher), checking whether they differ in EXACTLY one bit position. If so, COMBINE them into a new term with a dash (−) in that differing position (marking the eliminated variable), and flag BOTH original minterms as "used" (they are no longer prime implicants themselves, since they have been successfully combined into something larger).
3. REPEAT this comparison process on the newly formed terms (now differing by one dash-marked position each), continuing to combine terms that differ in exactly one REMAINING bit position, until no further combinations are possible.
4. Any term (at any stage) that was NEVER successfully combined with another remains UNUSED — every such unused term is a PRIME IMPLICANT, since by definition it could not be enlarged any further.
5. Build the PI CHART exactly as in the K-map method (PIs as rows, minterms as columns), and apply the SAME essential-PI-then-set-cover procedure described above to extract the minimal SOP.

Worked trace: find the prime implicants of f = Σm(1,2,3,7) over 3 variables (A,B,C), using Quine-McCluskey instead of a K-map. Binary forms: 1=001, 2=010, 3=011, 7=111. Weight groups: weight 1: {001, 010}. weight 2: {011}. weight 3: {111}.

1. Compare weight-1 to weight-2: 001 vs 011 differ in exactly the middle bit → combine to 0−1 (representing A′C, covering minterms 1,3). 010 vs 011 differ in exactly the last bit → combine to 01− (representing A′B, covering minterms 2,3).
2. Compare weight-2 to weight-3: 011 vs 111 differ in exactly the first bit → combine to −11 (representing BC, covering minterms 3,7).
3. No further combinations are possible among {0−1, 01−, −11} (checking pairwise: 0−1 vs 01− differ in more than the dash position already used; 0−1 vs −11 likewise), so these three are the FINAL prime implicants: 0−1 (A′C), 01− (A′B), −11 (BC).
4. PI chart: A′C covers {1,3}; A′B covers {2,3}; BC covers {3,7}. Minterm 1 is covered ONLY by A′C (essential). Minterm 2 is covered ONLY by A′B (essential). Minterm 7 is covered ONLY by BC (essential). All three PIs turn out essential, and together they already cover every minterm (1,2,3,7), so the minimal SOP is f = A′C+A′B+BC — matching exactly what a direct K-map on the same function would have produced, confirming the two methods agree.

KEY: Quine-McCluskey is not a DIFFERENT simplification technique from K-map grouping — it is the IDENTICAL underlying operation (combine two terms differing in exactly one bit, dropping that one differing variable) performed as a systematic bit-string comparison rather than a visual adjacency check; recognising this equivalence means a K-map answer can always be cross-checked against a quick Quine-McCluskey pass (or vice versa) whenever there is doubt about whether a K-map grouping was read correctly, since both methods must always agree on the minimal SOP for a given function.

NAND/NOR-ONLY IMPLEMENTATIONS AND BUBBLE PUSHING

Since {NAND} alone and {NOR} alone are each functionally complete, any Boolean function expressed in ordinary AND/OR/NOT form can be redrawn using ONLY NAND gates (or only NOR gates) — a very frequently tested circuit-conversion skill, most efficiently performed using a technique called BUBBLE PUSHING rather than by re-deriving the algebraic NAND constructions from scratch for every gate.

1. A NAND gate is equivalent to an AND gate followed by a bubble (inversion) on its output; a NOR gate is equivalent to an OR gate followed by an output bubble. BUBBLE PUSHING exploits the fact that a bubble can be "slid" along a wire, changing which gate shape it attaches to, using De Morgan's laws as the underlying justification: an OR gate with bubbles on ALL its inputs AND its output behaves identically to a plain AND gate (this is exactly De Morgan's law (x′+y′)′=xy, redrawn as gate shapes rather than written algebraically).
2. PRACTICAL TWO-LEVEL SOP-TO-NAND-ONLY CONVERSION PROCEDURE: for a standard two-level SOP circuit (a layer of AND gates feeding into one OR gate), replace EVERY gate with a NAND gate of the same number of inputs, with NO other changes needed at all — the bubbles introduced by the first-level NAND gates (which the original AND gates did not have) are exactly cancelled by an EXTRA pair of bubbles effectively introduced at the second-level NAND gate's inputs (a NAND is an OR-with-all-input-bubbles-and-output-bubble by the identity above, and the two sets of bubbles at that junction cancel each other out algebraically), leaving the overall function UNCHANGED.
3. This two-level "just swap every gate for a NAND, no other changes" result is a genuine and highly useful shortcut, but it is a SPECIAL PROPERTY of exactly the two-level (SOP-shaped) case — it does NOT generalise automatically to a three-or-more-level circuit, where naively swapping every gate for a NAND WITHOUT correctly tracking which bubbles cancel and which do not will change the function; a full multi-level conversion genuinely requires pushing bubbles level by level, following De Morgan's law explicitly at each junction, rather than relying on the two-level shortcut.

GATE TRAP: applying the "just swap every gate for NAND" shortcut to a MULTI-LEVEL circuit (more than the standard two AND-then-OR layers) without separately verifying the bubble-cancellation at every internal junction is a common and serious error — the shortcut's validity depends entirely on the SPECIFIC two-level SOP structure, and a circuit with three or more gate layers needs the bubbles pushed and checked explicitly, layer by layer, rather than assumed to cancel automatically the way they conveniently do in the simpler two-level case.

FUNCTIONAL COMPLETENESS

A gate set is FUNCTIONALLY COMPLETE if AND, OR, and NOT can all be constructed from gates in that set alone — equivalently (since {AND,OR,NOT} can already build every possible Boolean function, via the canonical SOP/POS forms above), a functionally complete set can build every possible Boolean function.

{AND, OR, NOT} is complete by definition (this is exactly the toolkit SOP/POS forms are built from). {AND, NOT} is complete: OR is recovered via De Morgan, x+y=(x′y′)′. {OR, NOT} is complete by the dual construction, xy=(x′+y′)′.

{NAND} alone is complete — a single gate type suffices for everything: NOT(x) = NAND(x,x) (feeding the same signal to both inputs). AND(x,y) = NOT(NAND(x,y)) = NAND(NAND(x,y), NAND(x,y)) (negating a NAND recovers AND). OR(x,y) = NAND(NOT(x), NOT(y)) = NAND(NAND(x,x), NAND(y,y)) (De Morgan, built entirely from NAND gates). {NOR} alone is complete by the exactly dual set of constructions.

{AND, OR} is NOT complete — every function built purely from AND and OR is MONOTONIC (increasing any input from 0 to 1 can never DECREASE the output), and NOT is not monotonic (increasing x from 0 to 1 decreases x′ from 1 to 0), so NOT can never be constructed from {AND,OR} alone, however many gates are used.

{XOR, AND} TOGETHER WITH THE CONSTANT 1 is complete (this specific combination is called the ALGEBRAIC NORMAL FORM or Zhegalkin basis), but {XOR} alone is NOT complete — every function built purely from XOR gates is AFFINE (expressible as a linear combination of inputs plus a constant, over the two-element field), and AND is not affine (AND(x,y)=xy is a genuinely non-linear, degree-2 function of x and y), so AND can never be constructed from XOR gates alone.

GATE TRAP: it is tempting to assume {XOR} is complete because XOR "feels universal" (it can express NOT via XOR(x,1)=x′, and it can express quite a lot with enough gates) — but {XOR} is only AFFINE-complete, never fully complete, and this specific misconception (assuming XOR alone can build AND, hence build everything) is one of the most commonly tested functional-completeness traps.

PROOF SKETCH FOR INCOMPLETENESS, GENERALISED: to prove ANY gate set is INCOMPLETE, identify a PRESERVED PROPERTY that every function built from that gate set must retain, no matter how the gates are combined or how many are used (monotonicity for {AND,OR}; affinity for {XOR}). Since some target function (NOT, or AND) VIOLATES that preserved property, and every function buildable from the gate set must satisfy it, the target function cannot possibly be built — this "identify an invariant every construction must preserve, then find a target that breaks it" strategy is the general method underlying POST'S LATTICE, the full classification of every Boolean clone (closed function set) by which of five key preserved properties (T0: preserves 0, T1: preserves 1, monotone, self-dual, affine) it retains.

SELF-DUAL FUNCTIONS

A Boolean function f is SELF-DUAL if f equals its own dual: f(x₁,...,xₙ) = f_dual(x₁,...,xₙ), where f_dual is obtained by swapping + with · throughout f's expression (per the duality principle above). Equivalently, and more usefully as a direct TEST without needing to compute the dual expression algebraically at all: f is self-dual if and only if f(x₁′,...,xₙ′) = f(x₁,...,xₙ)′ for every input — complementing every input variable always produces exactly the complemented output.

1. A simple worked example: the majority function MAJ(x,y,z) = xy+yz+xz (true when at least two of the three inputs are true) is self-dual. Checking the complementation test directly: MAJ(x′,y′,z′) = x′y′+y′z′+x′z′. By De Morgan, MAJ(x,y,z)′ = (xy+yz+xz)′ = (xy)′(yz)′(xz)′ = (x′+y′)(y′+z′)(x′+z′), which, after full expansion using the distributive laws, reduces to exactly x′y′+y′z′+x′z′ — matching MAJ(x′,y′,z′) precisely, confirming self-duality.
2. Self-duality is one of the five defining properties in POST'S LATTICE mentioned above (alongside T0, T1, monotone, and affine) — a gate set built ENTIRELY from self-dual functions can never produce a non-self-dual function, exactly the same style of "preserved property" argument used to prove {AND,OR} incomplete via monotonicity, or {XOR} incomplete via affinity.

KEY: recognising a function's membership in one of Post's five preserved-property classes (does it output 0 on all-0 inputs — T0; does it output 1 on all-1 inputs — T1; is it monotonic; is it self-dual; is it affine) is the SINGLE fastest way to settle a functional-completeness question without brute-force checking every possible function buildable from a proposed set — a set is functionally complete if and only if it is NOT entirely contained within any one of these five preserved classes, a theorem (Post's completeness criterion) that turns an open-ended "can this set build everything" question into five quick, mechanical class-membership checks.

MULTI-LEVEL LOGIC: FACTORING FOR FEWER LITERALS

A two-level SOP or POS expression is not always the most ECONOMICAL way to realise a function in actual circuitry — sometimes FACTORING an expression into more than two levels (nested parentheses, effectively) trades a small increase in the number of levels a signal must pass through for a meaningfully smaller total literal (and hence component) count.

1. Worked trace: f = AC+AD+BC+BD, a 4-term, 8-literal two-level SOP. Factoring directly: f = A(C+D)+B(C+D) = (A+B)(C+D) — a fully equivalent expression using only 4 literals total (down from 8), verified by re-expanding: (A+B)(C+D) = AC+AD+BC+BD, matching the original exactly.
2. The trade-off: the factored form (A+B)(C+D) requires signals to pass through MORE sequential levels of combining logic than the flat two-level SOP form did, which can matter when the SPEED of a circuit (how long a signal takes to propagate through it) is the binding constraint rather than component count — a genuinely two-sided design trade-off between fewer components (favouring more levels, more factoring) and faster propagation (favouring fewer levels, the flat two-level SOP/POS form), rather than one form being unconditionally "better" than the other.
3. This same AC+AD+BC+BD example is exactly the kind of factoring the distributive law (in both its ordinary and dual forms, both stated at the start of this chapter) exists to perform systematically — recognising a COMMON FACTOR shared across multiple terms (here, C+D appearing in both A(C+D) and B(C+D)) and pulling it out is the multi-level analogue of spotting a consensus term or an absorption pattern: an algebraic shortcut that produces a smaller final expression without needing any tabular or map-based method at all.

CONVERTING BETWEEN SOP AND POS: WHEN EACH FORM IS PREFERABLE

Any Boolean function can be expressed either as a sum of products (SOP, built from minterms) or a product of sums (POS, built from maxterms) — the two forms always describe the identical function, and the CHOICE between them is purely a question of which one turns out more economical (fewer literals) for a given function's specific ON-set shape.

1. A function is naturally CHEAPER in SOP form when its ON-set (the 1s) is SMALL relative to its OFF-set (the 0s) — fewer minterms to combine into product terms generally means fewer, shorter SOP terms overall.
2. Conversely, a function is naturally CHEAPER in POS form when its OFF-set is SMALL relative to its ON-set — since POS construction works from the 0-cells (maxterms) rather than the 1-cells, a function with few 0s produces a correspondingly compact POS expression, even though its SOP form (built from its many 1s) might be considerably longer.
3. CONVERTING an SOP expression into POS (or vice versa) does not require starting entirely from scratch: minimizing the COMPLEMENT of a function (f′) via a K-map or Quine-McCluskey produces a minimal SOP for f′, and then applying De Morgan's law to that minimal SOP directly yields a minimal POS for f itself — since (f′)′=f, and negating a sum-of-products turns it, by the generalised De Morgan law above, into a product-of-sums.

Worked trace: f(A,B,C) has ON-set {0,1,2,3,4} (5 minterms out of 8 total) — a SOP built from 5 minterms is likely to be somewhat long. Instead, minimize f′ = Σm(5,6,7) (only 3 minterms, the complementary OFF-set) — a shorter starting point. Grouping {5,7} gives AC (both have A=1,C=1) and {6,7} gives AB (both have A=1,B=1); combined, f′ = AC+AB = A(B+C) after factoring. Applying De Morgan to convert this minimal SOP for f′ into a minimal POS for f: f = (A(B+C))′... more directly, f = A′+(B+C)′ is INCORRECT as a direct complement of the factored form without care — the clean route is f = (f′)′ = (AC+AB)′ = (AC)′(AB)′ = (A′+C′)(A′+B′), a valid POS form for f with only 4 literals, considerably shorter than working from all 5 ON-set minterms directly would likely have produced.

KEY: whenever a function's ON-set and OFF-set sizes are noticeably LOPSIDED (one is much smaller than the other), minimizing whichever SET IS SMALLER — the ON-set directly for a minimal SOP, or the OFF-set (via f′) for a minimal POS — is a reliable shortcut for finding the more economical of the two final forms without needing to fully build out both a complete SOP and a complete POS from scratch and comparing their literal counts afterward.

LITERAL COUNT AND GATE-INPUT COUNT AS COST METRICS

Two closely related, but genuinely different, cost metrics are used to compare implementations of the same function: LITERAL COUNT (the total number of variable-appearances, complemented or not, across an entire expression) and INPUT COUNT (the total number of inputs across every combining element actually used to build the circuit, including the number of inputs feeding the FINAL combining stage).

1. For a straightforward two-level SOP expression, literal count and input count typically COINCIDE closely: each product term's literals become that term's own combining inputs, and the number of PRODUCT TERMS becomes the number of inputs feeding the final combining stage.
2. Once FACTORING (multi-level logic, covered above) is introduced, the two metrics can DIVERGE — factoring reduces literal count (as the AC+AD+BC+BD example showed, dropping from 8 literals to 4), but it does so by introducing MORE combining stages arranged in sequence, and the total input count across all those stages, added up, does not always shrink by the same proportion the literal count did.
3. Depending on which resource is actually scarce or expensive in a given design context (component count overall, versus the number of inputs any single combining element can physically support, called its FAN-IN), one metric or the other may be the more relevant one to optimise for — there is no single universally "correct" cost metric, and a well-posed circuit-minimization question should specify which one is actually being asked about.

WORKED PROBLEMS

1. LAW-BY-LAW SIMPLIFICATION. Simplify x(x′+y) using the named laws explicitly. x(x′+y) = xx′+xy (distributive law) = 0+xy (complement law) = xy (identity law) — three named steps, no K-map needed.

2. CONSENSUS THEOREM SPOTTING. Simplify f = AB+A′C+BC by recognising the consensus pattern directly. Matching xy+x′z+yz with x=A,y=B,z=C: the third term BC is exactly the consensus term and can be dropped immediately. f = AB+A′C.

3. DUAL VS COMPLEMENT. For f = A(B+C), find both the dual and the complement, and confirm they differ. Dual: swap + and · only, leaving variables untouched: dual(f) = A+BC. Complement: apply De Morgan fully, negating both operators AND variables: f′ = (A(B+C))′ = A′+(B+C)′ = A′+B′C′. Since A+BC ≠ A′+B′C′ in general (checking A=1,B=0,C=0: dual gives 1+0=1, complement gives 0+1=1 — coincidentally equal here, but checking A=1,B=1,C=0: dual gives 1+0=1, complement gives 0+0=0 — genuinely different), confirming dual and complement are NOT the same operation.

4. CANONICAL FORM CONVERSION. If f = Σm(0,2,4,6) over 3 variables (universe 0-7), find f′ in Σm form and f in ΠM form. U−S = {1,3,5,7}. f′ = Σm(1,3,5,7). f = ΠM(1,3,5,7) (using the same index set, since f = ΠM(U−S) by the complement rule).

5. K-MAP GROUP LITERAL COUNT. In a 5-variable K-map, a group of 8 cells is found. How many literals does the resulting term have? A group of 2ᵏ=8 cells has k=3 (since 2³=8), so the term has n−k = 5−3 = 2 literals.

6. FUNCTIONAL COMPLETENESS CHECK. Is {NOR, AND} functionally complete? NOR alone is already complete (it can build NOT, AND, and OR entirely on its own, by the dual NAND construction), so adding AND on top of an already-complete set changes nothing about completeness — {NOR, AND} is complete, trivially, since the NOR subset alone already suffices.

7. SHANNON'S EXPANSION. Expand f(A,B,C) = AB+A′C using Shannon's expansion on A. f(1,B,C) = 1·B+0·C = B (substituting A=1). f(0,B,C) = 0·B+1·C = C (substituting A=0). By Shannon's expansion: f = A·f(1,B,C)+A′·f(0,B,C) = AB+A′C — recovering the original expression exactly, confirming the expansion (as it always will, being an identity) and showing directly how a 2-to-1 mux with select line A, "0" input C, and "1" input B implements this exact function.

8. AFFINE INCOMPLETENESS CHECK. Confirm algebraically that AND(x,y)=xy cannot be written as an XOR-only (affine) function a·x⊕b·y⊕c for any constants a,b,c∈{0,1}. Testing all 4 input pairs against every candidate affine form of this shape shows no choice of a,b,c reproduces the AND truth table (0,0,0,1) exactly — for instance a=b=1,c=0 gives x⊕y, matching (0,0,0,1) needed only at input (1,1) where x⊕y gives 0 rather than the required 1; every other choice of a,b,c similarly fails at least one of the 4 rows, since AND has ODD symmetry under negating one input at only ONE of its two inputs' negation-patterns among the four (a genuinely non-linear signature no affine function of two bits can reproduce), confirming AND is not affine and hence not buildable from XOR alone.

9. QUINE-McCLUSKEY. Find the prime implicants of f = Σm(0,1,2,3) over 2 variables (A,B), using Quine-McCluskey. Binary: 0=00,1=01,2=10,3=11. Weight groups: weight 0: {00}. weight 1: {01,10}. weight 2: {11}. Combining weight 0 with weight 1: 00 vs 01 differ in last bit → 0− (A′, covering 0,1). 00 vs 10 differ in first bit → −0 (B′, covering 0,2). Combining weight 1 with weight 2: 01 vs 11 differ in first bit → −1 (B, covering 1,3). 10 vs 11 differ in last bit → 1− (A, covering 2,3). This is NOT the final round, though — 0− and 1− share the SAME dash position (the last bit) and differ in only their one remaining bit (0 vs 1), so QM's own combination rule applies to THEM too, merging into −− (covering {0,1}∪{2,3}={0,1,2,3}, with BOTH variables now eliminated); −0 and −1 combine the exact same way, also into −− covering all four minterms. Since −− cannot be combined any further (no bits remain to compare), it is the single genuine prime implicant here — the constant term "1" (0 literals), covering every minterm at once. The four first-round terms (A′, B′, B, A) were NOT actually prime implicants at all, since every one of them combined further into something larger; recognising that a first-round term whose dash position matches another first-round term's dash position must be checked for further combination, rather than assumed final, is exactly the step this specific example is designed to test. Final answer: f = 1 (the constant-true function), consistent with Σm(0,1,2,3) covering literally every possible input combination of a 2-variable function.

10. SELF-DUAL TEST. Is f(x,y)=xy self-dual? f_dual = x+y (swap operator only). Since xy ≠ x+y in general (checking x=1,y=0: xy=0 but x+y=1), f is NOT self-dual.

11. MULTI-LEVEL FACTORING. Factor f=WX+WY+ZX+ZY into a smaller-literal multi-level form, and verify. f = W(X+Y)+Z(X+Y) = (W+Z)(X+Y) — 4 literals instead of the original 8. Verify by re-expanding: (W+Z)(X+Y)=WX+WY+ZX+ZY, matching exactly.

12. SOP-VS-POS ECONOMY CHOICE. A function f(A,B,C,D) over 4 variables has exactly 2 minterms in its ON-set. Which form (SOP or POS) is likely more economical, and why? Since the ON-set is tiny (2 out of 16 possible minterms) compared to the OFF-set (14), an SOP built directly from the 2 ON-set minterms will almost certainly be far shorter than a POS built from the 14-maxterm OFF-set — SOP is the clear choice here without needing to construct the POS at all to confirm it.

13. NAND-ONLY CONVERSION. Convert the two-level SOP circuit for f=AB+CD into an all-NAND circuit, and verify the result. By the two-level shortcut, replace both AND gates and the OR gate with NAND gates of the same input count, with no other change: this gives NAND(A,B) NAND'd with NAND(C,D), i.e. f = [NAND(A,B) NAND NAND(C,D)]. Expanding algebraically to verify: NAND(A,B)=(AB)′, NAND(C,D)=(CD)′, and NAND of these two results is [(AB)′(CD)′]′ = ((AB)′)′+((CD)′)′ (De Morgan) = AB+CD — exactly the original function, confirming the two-level all-NAND shortcut reproduces f correctly.

14. PRESERVED-PROPERTY COMPLETENESS CHECK. Using Post's completeness criterion, determine whether {AND, XOR} is functionally complete. Check each of the five preserved classes: T0 (preserves 0)? AND(0,0)=0 and XOR(0,0)=0, so BOTH preserve 0 — the set stays entirely INSIDE T0, meaning every function built purely from AND and XOR of the input variables must ALSO map (0,0,...,0) to 0. That single fact is already enough to settle the question: Post's criterion (already stated earlier in this chapter) requires escaping ALL FIVE classes, and being confined to even ONE — T0 here — is a complete, immediate disqualification, regardless of how the set behaves with respect to the other four. There is no need to check monotonicity, affinity, self-duality, or T1 at all once T0-confinement is confirmed. By Post's criterion, {AND, XOR} is NOT functionally complete — this is exactly the same Zhegalkin/affine-normal-form basis this chapter flagged earlier as needing an explicit CONSTANT alongside {AND,XOR} (giving {AND,XOR,1}) to become complete; without that constant available as a genuine third input, NOT(x) cannot actually be built, since the natural-looking construction "NOT(x)=XOR(x,1)" illegally assumes a constant-1 signal that {AND,XOR} alone has no way to produce (any all-0 input to any AND/XOR-only circuit built purely from x and y always outputs 0, by the very T0-confinement just established, so no fixed "1" wire is ever available to feed into that XOR).

15. LITERAL-COUNT VS INPUT-COUNT CONTRAST. For f=AC+AD+BC+BD (8 literals in flat SOP) versus its factored form (A+B)(C+D) (4 literals), compare the total combining-input count in each realisation. The flat SOP needs four 2-input AND stages (2 inputs each, 8 total) feeding one 4-input OR stage (4 more inputs), totalling 12 inputs. The factored form needs one 2-input OR stage for (A+B), one 2-input OR stage for (C+D), and one 2-input AND stage combining those two results, totalling just 6 inputs — here BOTH literal count and input count favour the factored form, though as the earlier discussion noted, this favourable alignment of both metrics pointing the same way is not guaranteed to happen together for every function considered, and a genuinely careful comparison should check both counts explicitly, term by term, rather than assuming one metric always tracks the other automatically across every possible factoring choice available for a given target function under consideration at the exact time any such comparison is actually being made by hand, carefully and fully each time.

CARRYING THIS FORWARD

The single most valuable habit this chapter builds is recognising that a K-map grouping and an algebraic law application are THE SAME operation performed two different ways — every adjacent-cell merge is exactly the redundancy law x+x′y=x+y (or its generalised multi-variable form) applied visually, and every consensus-theorem spotting opportunity is a K-map simplification that can be skipped entirely by recognising the algebraic pattern directly on the page. Given a choice between building a full K-map from scratch and scanning an expression for a directly recognisable law (absorption, redundancy, consensus, De Morgan), the algebraic route is almost always faster to write out by hand, and the K-map is best reserved for functions with enough terms that the relevant pattern is not immediately obvious by inspection. The chapter's other recurring theme — precisely which properties are PRESERVED by a given combining-element set (monotonicity for AND/OR, affinity for XOR, self-duality as a third example) — is the same style of reasoning used to prove functional completeness or incompleteness for any newly proposed set, and it generalises directly to Post's lattice, the complete classification underlying every such question this topic can pose.

A second habit worth carrying forward, tying together the chapter's later sections, is treating a minimization question as an OPTIMISATION problem with more than one possible objective, rather than assuming "simplify this function" always means the same single thing. Sometimes the objective is minimum literal count (favouring factored, multi-level expressions); sometimes it is minimum propagation depth (favouring flat, two-level SOP or POS forms, even at the cost of more literals); sometimes it is working from whichever of the ON-set or OFF-set happens to be smaller (choosing SOP or POS accordingly, without needing to build both forms out fully to compare). None of these objectives is the single "correct" way to minimize a function in every circumstance — the correct approach depends entirely on which resource (component count, propagation delay, or a specific device's own input-count limit) the actual design problem cares about, and a well-posed question should always specify this before an answer can be judged complete.

A third, more subtle habit this chapter has repeatedly modelled is VERIFYING a claimed simplification by working BACKWARD from the proposed answer to the original expression, rather than only trusting the forward simplification steps taken to reach it. Every worked trace in this chapter that produced a factored or minimized form (the AC+AD+BC+BD factoring, the SOP-to-POS conversion via a function's complement, the NAND-only two-level conversion) was followed immediately by re-expanding the claimed answer and checking it reproduced the same original truth table exactly — a habit directly analogous to the independent-verification discipline used throughout the Engineering Mathematics chapters' worked problems, and just as valuable here: a single misapplied law partway through a multi-step simplification is easy to miss when only reading the forward derivation, but nearly impossible to miss once the claimed final answer is expanded back out and compared, term by term, against the function it was supposed to simplify.

KEY: three genuinely distinct simplification OBJECTIVES recur throughout this chapter and are worth keeping explicitly separated rather than treated as interchangeable synonyms for "simplify" — minimum LITERAL count (favouring factored multi-level forms), minimum PROPAGATION DEPTH (favouring flat two-level forms even when they cost more literals), and choosing SOP versus POS based on which of a function's ON-set or OFF-set is smaller (avoiding unnecessary work building out the larger, less economical form in full); a minimization answer that is correct for one of these objectives can be actively wrong for another, so identifying which objective a specific question is actually asking about is a prerequisite step, not an afterthought, before any simplification work begins.

Finally, it is worth stepping back and noticing how the chapter's opening claim — that a K-map grouping is nothing more than the redundancy law applied visually — extends cleanly across every technique introduced afterward. The Quine-McCluskey tabular method is the same combining operation performed as a bit-string comparison instead of a spatial adjacency check. Bubble pushing across levels of a multi-level circuit is repeated application of De Morgan's law, one junction at a time, rather than a single global algebraic rewrite. Even Post's lattice, which sounds like an entirely separate and more abstract classification result, reduces to the same underlying question this chapter opened with: which laws, and which preserved structural properties, survive being combined together, and which target behaviours (NOT, AND, self-duality-breaking) require stepping outside a given closed set of building blocks to reach. Seeing every technique in this chapter as a variation on this single theme — algebraic laws, applied either symbolically or via some equivalent visual or tabular shortcut, always describing the exact same underlying transformations on the exact same underlying functions — is what turns a long list of named methods (K-maps, Quine-McCluskey, bubble pushing, Post's lattice) into one coherent, internally consistent body of technique rather than a disconnected catalogue of unrelated tricks to be memorised independently of one another.
`
};
