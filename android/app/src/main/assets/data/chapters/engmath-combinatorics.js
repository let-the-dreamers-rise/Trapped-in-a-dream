// Textbook chapter: Combinatorics.
// Written directly (no subagent) to match the depth and voice of the other
// chapters in data/chapters/.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['engmath-combinatorics'] = {
  figs: [
    {
      id: 'pascal-triangle',
      caption: 'The first six rows of Pascal\'s triangle. Every interior entry is the sum of the two entries diagonally above it — the Pascal identity C(n,k) = C(n-1,k-1) + C(n-1,k) made visible.',
      svg: '<svg viewBox="0 0 360 170" width="100%" style="max-width:360px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="12" fill="currentColor" text-anchor="middle" font-family="monospace"><text x="180" y="20">1</text><text x="160" y="45">1</text><text x="200" y="45">1</text><text x="140" y="70">1</text><text x="180" y="70">2</text><text x="220" y="70">1</text><text x="120" y="95">1</text><text x="160" y="95">3</text><text x="200" y="95">3</text><text x="240" y="95">1</text><text x="100" y="120">1</text><text x="140" y="120">4</text><text x="180" y="120">6</text><text x="220" y="120">4</text><text x="260" y="120">1</text><text x="80" y="145">1</text><text x="120" y="145">5</text><text x="160" y="145">10</text><text x="200" y="145">10</text><text x="240" y="145">5</text><text x="280" y="145">1</text></g><g stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"><line x1="140" y1="80" x2="160" y2="105"/><line x1="180" y1="80" x2="160" y2="105"/></g></svg>'
    },
    {
      id: 'stars-and-bars',
      caption: 'Stars and bars: distributing 5 identical stars into 3 boxes is the same as arranging 5 stars and 2 dividing bars in a row — here showing one specific arrangement: 2 | 0 | 3.',
      svg: '<svg viewBox="0 0 340 90" width="100%" style="max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="20" fill="currentColor" text-anchor="middle" font-family="monospace"><text x="30" y="35">*</text><text x="55" y="35">*</text><text x="90" y="35">|</text><text x="130" y="35">|</text><text x="165" y="35">*</text><text x="190" y="35">*</text><text x="215" y="35">*</text></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="42" y="55">box 1: 2</text><text x="110" y="55">box 2: 0</text><text x="195" y="55">box 3: 3</text></g><g stroke="currentColor" stroke-width="1" fill="none"><rect x="10" y="15" width="70" height="30"/><rect x="90" y="15" width="40" height="30"/><rect x="140" y="15" width="90" height="30"/></g></svg>'
    }
  ],
  text: `
WHY COMBINATORICS, AND WHAT KIND OF QUESTION IT ANSWERS

Combinatorics answers exactly one kind of question, asked in a thousand different costumes: "how many ways?" How many ways to arrange letters, choose a committee, distribute identical items into distinct boxes, colour a sequence, or avoid some forbidden pattern. The entire subject is a small toolbox of counting techniques — permutations, combinations, stars-and-bars, inclusion-exclusion, pigeonhole, and a handful of named sequences (Catalan, derangement, Stirling) that recur so often they earn their own name — plus, more importantly, the SKILL of recognising which tool a given word problem is secretly asking for. Exam questions rarely say "use permutations" outright; they say "in how many ways can five distinct books be arranged on a shelf" and expect the reader to translate "arranged" into "ordered" into "permutation" without being told. This chapter builds that translation skill explicitly, alongside the formulas themselves, since misreading the word problem — not forgetting a formula — is the single most common source of errors in this topic.

THE MULTIPLICATION PRINCIPLE AND THE ADDITION PRINCIPLE

Every other formula in this chapter is built from exactly two elementary principles, and it is worth having both stated with total precision before anything else.

THE MULTIPLICATION (PRODUCT) PRINCIPLE: if a task consists of a SEQUENCE of independent stages, and stage 1 can be done in n₁ ways, stage 2 in n₂ ways (regardless of how stage 1 came out), ..., stage k in n_k ways, then the whole task can be done in n₁ × n₂ × ... × n_k ways. The key word is independent — each stage's count must not depend on which choice was made at a previous stage. A rule of thumb: if the problem describes filling in a sequence of "slots," one after another, and later slots' options do not depend on which specific choice was made earlier (only possibly on HOW MANY choices remain), the multiplication principle applies directly.

THE ADDITION (SUM) PRINCIPLE: if a task can be accomplished by exactly one of several MUTUALLY EXCLUSIVE cases (a car trip is either by the northern route OR the southern route, never both at once, and never some hybrid), and case i can happen in n_i ways, then the total number of ways is n₁ + n₂ + ... + n_k. The key word here is MUTUALLY EXCLUSIVE — the addition principle overcounts badly the moment two "cases" can happen simultaneously, which is precisely the failure mode that inclusion-exclusion is built later in this chapter to repair.

KEY: The single fastest way to decide whether a word problem wants multiplication or addition is to ask: "am I making a SEQUENCE of independent choices that together build ONE outcome" (multiplication), or "am I choosing exactly ONE path out of several alternative, non-overlapping routes to the outcome" (addition)? Confusing the two — multiplying when the cases actually overlap, or adding when the choices are actually sequential and independent — is a common, entirely avoidable error.

PERMUTATIONS: ORDERED SELECTIONS

A PERMUTATION of r items chosen from a set of n distinct items is an ORDERED arrangement — the identity of which item goes first, second, and so on, matters. The count is derived directly from the multiplication principle: there are n choices for the first position, n−1 remaining choices for the second (one item has been used), n−2 for the third, and so on down to n−r+1 choices for the r-th position (r items have already been placed). Multiplying these together:

1. P(n,r) = n × (n−1) × (n−2) × ... × (n−r+1)
2. This product has exactly r factors, running from n down to n−r+1.
3. Multiplying and dividing by (n−r)! (the product of the REMAINING factors from n−r down to 1) leaves the product unchanged but expresses it compactly: P(n,r) = n! / (n−r)!.
4. As a sanity check, P(n,n) = n!/(0!) = n!/1 = n! — arranging all n items in every possible order, matching the ordinary factorial count directly.

Worked trace: P(5,3) — arranging 3 books, in order, chosen from a shelf of 5 distinct books. Directly: 5 × 4 × 3 = 60. Via the formula: 5!/(5−3)! = 120/2 = 60. Both agree.

COMBINATIONS: UNORDERED SELECTIONS

A COMBINATION of r items chosen from n distinct items is an UNORDERED selection — only WHICH r items are chosen matters, not the order they are listed in. Since every unordered group of r items corresponds to exactly r! different ordered arrangements (permute the same r items among themselves in r! ways), the number of unordered selections is the number of ordered selections divided by r!:

1. Start from P(n,r) = n!/(n−r)!, the count of ORDERED r-selections.
2. Each unordered group of r items has been counted r! times within P(n,r) — once for every possible internal ordering of that same group.
3. Dividing removes this overcounting exactly: C(n,r) = P(n,r)/r! = n! / (r!(n−r)!).
4. C(n,r) is also written "n choose r" and read that way; it is always a whole number despite the factorials, since it counts an actual finite set of subsets.

SYMMETRY IDENTITY: C(n,r) = C(n,n−r). This follows immediately from a bijection: choosing which r items to INCLUDE is equivalent to choosing which n−r items to EXCLUDE — every selection of r items uniquely determines its complementary selection of n−r items, and vice versa, so the two counts must be equal. This identity is a major speed tool on numerical questions: C(20,18) looks intimidating to compute directly (it involves 18! in both numerator and denominator), but C(20,18)=C(20,2)=20×19/2=190 is nearly instant.

GATE TRAP: the single most common error in this entire chapter is choosing P(n,r) when the problem actually wants C(n,r), or vice versa — triggered by misreading "arrange," "order," "sequence," "rank" (all signal PERMUTATION, order matters) versus "choose," "select," "form a committee," "pick a subset" (all signal COMBINATION, order does not matter). A committee of 3 people chosen from 10 is C(10,3), not P(10,3), since a committee is just a SET of 3 people with no internal ranking — but if the problem instead asks for a president, secretary, and treasurer chosen from the same 10 people, that IS ordered (the three roles are distinguishable), so it becomes P(10,3), a completely different number from C(10,3) despite starting from the identical group of 10 candidates.

PERMUTATIONS WITH REPEATED ITEMS

If n items are to be arranged in a row, but some of them are identical to each other (not merely equal in value, but genuinely indistinguishable — two identical red balls, or repeated letters in a word), the ordinary n! overcounts, since swapping two identical items produces an arrangement that LOOKS the same but was counted as a separate permutation in the n! total. If the n items fall into groups of sizes n₁, n₂, ..., n_k (with n₁+n₂+...+n_k = n, one group per distinct "type" of item), the correct count divides out the internal rearrangements within each group:

1. Start from n!, the count if every item were treated as distinguishable.
2. Within the first group of n₁ identical items, any of their n₁! internal rearrangements produces an arrangement indistinguishable from any other — so divide by n₁! to remove this overcounting for that one group.
3. Repeat independently for every other group: divide by n₂!, by n₃!, and so on.
4. Final formula: n! / (n₁! × n₂! × ... × n_k!).

Worked trace: how many distinct arrangements of the letters of MISSISSIPPI? Letter counts: M appears 1 time, I appears 4 times, S appears 4 times, P appears 2 times, total n=11. Arrangements = 11!/(1!×4!×4!×2!) = 39916800/(1×24×24×2) = 39916800/1152 = 34650.

GATE TRAP: a frequent wrong shortcut is dividing by the factorial of the TOTAL number of repeated letters combined (here 4+4+2=10, giving the wrong 11!/10!), rather than dividing by the factorial of EACH repeated group SEPARATELY (4!, then 4!, then 2!, multiplied together in the denominator). These give very different answers, and only the separate-factorials version is correct — it corresponds to removing the internal shuffles WITHIN each letter's own group of copies, one group at a time, never combining groups before dividing.

CIRCULAR PERMUTATIONS

Arranging n distinct items in a STRAIGHT LINE gives n! orderings. Arranging the same n items around a CIRCLE is different, because a circular arrangement has no fixed "starting point" — rotating everyone one seat to the right produces an arrangement that is, for seating-around-a-table purposes, THE SAME arrangement (everyone still has the same left and right neighbours), yet the linear count n! treats all n rotations of one circular arrangement as n different linear arrangements.

1. Take any one circular seating and list it starting from each of the n seats in turn — this produces exactly n different linear listings (one per starting point) that all represent the SAME circular arrangement.
2. Since ordinary n! counts every linear listing separately, it counts each distinct circular arrangement exactly n times over.
3. Dividing by n removes this: circular permutations of n distinct items = n!/n = (n−1)!.
4. Equivalently: fix one specific item's seat as the reference point (breaking the rotational symmetry by convention), then arrange the remaining n−1 items in the remaining n−1 seats in the usual (n−1)! ways.

If the arrangement is further considered identical under REFLECTION (flipping the whole circle over, as with a necklace of beads that can be turned over, unlike people seated at a table who cannot be "flipped"), each circular arrangement and its mirror image are now the same arrangement too, halving the count again: (n−1)!/2.

GATE TRAP: applying the reflection-adjustment (dividing by an extra 2) to an ordinary seating-around-a-table problem is a common error — people seated at a round table are NOT considered identical to their own mirror-image seating (person A to the left of B is a genuinely different seating from person A to the right of B, since real people do not physically flip), so the plain (n−1)! applies. The extra division by 2 is reserved specifically for objects that are physically symmetric under flipping, like a necklace or a bracelet, stated explicitly in the problem.

DISTRIBUTING IDENTICAL ITEMS INTO DISTINCT BOXES: STARS AND BARS

A recurring scenario: distribute n identical items into r DISTINCT (labelled, distinguishable) boxes. Since the items are identical, only HOW MANY end up in each box matters, not WHICH specific item — this is fundamentally different from ordinary permutations or combinations of distinct items, and needs its own technique.

[[FIG:stars-and-bars]]

The STARS AND BARS technique: represent the n identical items as n "stars" (•) in a row, and represent the r−1 DIVIDERS needed to split them into r groups as "bars" (|) inserted among the stars. A row containing n stars and r−1 bars, in some order, corresponds exactly to one way of splitting the n items into r ordered (labelled) groups — the count of stars before the first bar goes to box 1, the count between the first and second bar goes to box 2, and so on, with the count after the last bar going to box r.

1. The total row has n stars plus r−1 bars, for n+r−1 symbols total.
2. Choosing which n+r−1 positions (out of the total row) hold stars (equivalently, which hold bars) completely determines the arrangement — this is an ordinary combination count.
3. If EMPTY boxes are allowed (a box may legitimately receive zero items — two bars can sit adjacent with no stars between them), the count is C(n+r−1, r−1) — equivalently C(n+r−1, n), by the symmetry identity, since choosing the r−1 bar-positions among n+r−1 slots is the same count as choosing the n star-positions.
4. If NO box may be empty (every one of the r boxes must receive at least one item, requiring n≥r), first place one item in each box to guarantee the "at least one" requirement, leaving n−r items to distribute freely (empty boxes now allowed in this remaining sub-problem) among the same r boxes: C((n−r)+r−1, r−1) = C(n−1, r−1).

Worked trace, empty boxes allowed: distribute 5 identical balls into 3 distinct boxes, empty boxes allowed. C(5+3−1, 3−1) = C(7,2) = 21.

Worked trace, no empty boxes: the same 5 balls into 3 distinct boxes, no box may be empty. C(5−1,3−1) = C(4,2) = 6. Verification by direct enumeration of the positive integer solutions to a+b+c=5 with a,b,c≥1: the underlying partitions of 5 into exactly 3 positive parts are 3+1+1 and 2+2+1; the shape (3,1,1) has 3 distinct orderings across the 3 labelled boxes (which box gets the 3), and the shape (2,2,1) also has 3 distinct orderings (which box gets the 1); total 3+3=6, matching the formula exactly.

GATE TRAP: swapping which of the two stars-and-bars formulas applies — using C(n+r−1,r−1) when the problem actually forbids empty boxes, or using C(n−1,r−1) when empty boxes are actually allowed — is the most common error here, and the single word to watch for in the problem statement is whether it says "no box may be empty," "each box gets at least one," or leaves box-emptiness unrestricted.

THE BINOMIAL THEOREM

(x+y)ⁿ = Σ_{k=0}^{n} C(n,k) xⁿ⁻ᵏ yᵏ. This identity is itself a counting statement in disguise: expanding (x+y)ⁿ = (x+y)(x+y)...(x+y) (n factors) by picking either "x" or "y" from each of the n factors and multiplying the choices together, the coefficient of the term xⁿ⁻ᵏyᵏ counts exactly the number of ways to choose which k (out of the n factors) contribute a "y" (and the rest contribute "x") — precisely C(n,k) ways, since the choice of WHICH k factors give "y" is an unordered selection of k items from n.

[[FIG:pascal-triangle]]

PASCAL'S TRIANGLE arranges the binomial coefficients C(n,k) in a triangular grid, one row per value of n, with C(n,k) as the (k+1)-th entry of row n. Two structural facts make the triangle easy to build without computing any factorial directly:

1. PASCAL'S IDENTITY: C(n,k) = C(n−1,k−1) + C(n−1,k) — every interior entry is the sum of the two entries diagonally above it. This has a direct combinatorial proof (not just an algebraic one): fix one specific element, call it "the special item," among the n items being chosen from. Any k-subset either INCLUDES the special item (then the remaining k−1 members are chosen freely from the other n−1 items: C(n−1,k−1) ways) or EXCLUDES it (then all k members are chosen from the other n−1 items: C(n−1,k) ways) — these two cases are mutually exclusive and cover every possibility, so by the addition principle their counts sum to the total C(n,k).
2. PASCAL'S RECURSION (a computational shortcut, useful for building one row from the previous entry rather than from scratch): C(n,k) = C(n,k−1) × (n−k+1)/k.

KEY: two identities worth having memorised outright, both derivable by substituting specific values of x and y into the binomial theorem: setting x=y=1 gives Σ_{k=0}^{n} C(n,k) = 2ⁿ — the total number of subsets of an n-element set (each subset corresponds to choosing, independently, whether each of the n elements is "in" or "out," matching the 2ⁿ count directly by the multiplication principle, and confirming the sum-of-a-row-of-Pascal's-triangle identity). Setting x=1, y=−1 gives Σ_{k=0}^{n} (−1)ᵏ C(n,k) = 0 for n≥1 — the alternating sum of any row of Pascal's triangle (beyond row 0) is exactly zero, a fact that underlies the sign structure of inclusion-exclusion later in this chapter.

VANDERMONDE'S IDENTITY: Σ_{k=0}^{r} C(m,k)×C(n,r−k) = C(m+n,r). A combinatorial proof: imagine choosing r items from a combined pool of m+n items, split into a group of m "red" items and a group of n "blue" items. Any such selection of r items contains some number k of red items (0≤k≤r) and the remaining r−k blue items; summing over every possible split k of how many are red counts every valid selection exactly once, giving the left side, while the right side C(m+n,r) counts the identical selections directly from the combined pool without splitting by colour — both sides count the same set of selections, so they must be equal.

THE MULTINOMIAL THEOREM

The binomial theorem generalises directly from two variables to any number of variables. The MULTINOMIAL THEOREM expands (x₁+x₂+...+x_m)ⁿ as a sum, over every way of choosing non-negative integers k₁,k₂,...,k_m with k₁+k₂+...+k_m=n, of the term [n!/(k₁!k₂!...k_m!)] × x₁^{k₁} x₂^{k₂} ... x_m^{k_m}. The coefficient n!/(k₁!...k_m!) is called a MULTINOMIAL COEFFICIENT, and it is exactly the same expression already met in the permutations-with-repeated-items formula earlier in this chapter — both count the number of ways to split n labelled "slots" (here, the n factors of the product being expanded) into m labelled groups of sizes k₁,...,k_m (here, which factors contribute x₁, which contribute x₂, and so on).

1. Expanding (x+y+z)ⁿ by picking one of x, y, or z from each of the n factors and multiplying the choices together, the coefficient of x^a y^b z^c (with a+b+c=n) counts exactly the number of ways to choose which a of the n factors contribute x, which b contribute y, and which c contribute z.
2. This is precisely the permutations-with-repeated-items count for arranging a copies of "x," b copies of "y," and c copies of "z" in a row of length n: n!/(a!b!c!).
3. The binomial theorem is the special case m=2: n!/(k₁!k₂!) with k₁+k₂=n reduces to n!/(k!(n−k)!) = C(n,k), exactly the ordinary binomial coefficient.
4. As a sanity check, summing every multinomial coefficient over all valid (k₁,...,k_m) gives mⁿ (setting every xᵢ=1 in the theorem) — matching the direct count of sequences of length n where each position independently picks one of m symbols.

Worked trace: the coefficient of x²y³z in the expansion of (x+y+z)⁶ (checking a+b+c=2+3+1=6, matching n=6). Coefficient = 6!/(2!3!1!) = 720/(2×6×1) = 720/12 = 60.

COUNTING FUNCTIONS: TOTAL, INJECTIVE, AND SURJECTIVE

A recurring scenario asks directly for the number of FUNCTIONS of a certain kind from a set of size n (the domain) to a set of size k (the codomain). Three distinct counts, each answering a different question, are worth keeping cleanly separated:

1. TOTAL FUNCTIONS (no restriction at all): each of the n domain elements independently maps to any of the k codomain elements, with repeats and unused codomain elements both allowed. By the multiplication principle, the count is kⁿ.
2. INJECTIVE (one-to-one) FUNCTIONS: no two domain elements may map to the same codomain element. The first domain element has k choices, the second has k−1 remaining choices (it may not repeat the first element's image), the third has k−2, and so on — this is exactly P(k,n) = k!/(k−n)!, requiring n≤k (an injective function cannot exist if the domain is larger than the codomain, since the pigeonhole principle would then force a repeat).
3. SURJECTIVE (onto) FUNCTIONS: every codomain element must be hit by AT LEAST ONE domain element. This is the hardest of the three to count directly, and it is solved with inclusion-exclusion, exactly analogous to the derangement derivation above.

DERIVING THE ONTO-FUNCTION COUNT: let Aᵢ (for i=1,...,k) be the set of total functions from the n-element domain that MISS codomain element i entirely (i.e. element i is never hit — the "bad" event to exclude for each i). The number of surjections is kⁿ minus the number of functions lying in at least one Aᵢ.

1. |Aᵢ| = (k−1)ⁿ for a single fixed i (every domain element maps to one of the remaining k−1 codomain elements, avoiding i).
2. The intersection of any j of the Aᵢ (j specific codomain elements all missed simultaneously) has size (k−j)ⁿ, and there are C(k,j) ways to choose which j codomain elements are the missed ones.
3. Applying inclusion-exclusion: number of surjections = Σ_{j=0}^{k} (−1)ʲ C(k,j) (k−j)ⁿ — the j=0 term alone gives kⁿ, and each subsequent term corrects for functions missing at least j specific elements, alternating sign exactly as in every other inclusion-exclusion application in this chapter.

Worked trace: the number of surjective (onto) functions from a 4-element domain to a 3-element codomain. Using the formula with k=3, n=4: Σ_{j=0}^{3} (−1)ʲ C(3,j)(3−j)⁴ = C(3,0)(3)⁴ − C(3,1)(2)⁴ + C(3,2)(1)⁴ − C(3,3)(0)⁴ = 1(81) − 3(16) + 3(1) − 1(0) = 81 − 48 + 3 − 0 = 36.

KEY: the three function-counting formulas are easy to blur together under time pressure, so it is worth anchoring them by their DEFINING QUESTION rather than by the formula shape alone: "how many ways can each of n domain elements independently pick a codomain element, with no restriction" is kⁿ (total); "how many ways can n domain elements pick DISTINCT codomain elements, order-sensitive since each domain element is a distinguishable 'slot'" is P(k,n) (injective, needs n≤k); "how many ways can every codomain element be guaranteed to be hit at least once" needs the full inclusion-exclusion sum (surjective, needs n≥k for any surjection to be possible at all, exactly the pigeonhole-flavoured mirror image of the injective case's n≤k requirement).

GATE TRAP: a very common wrong shortcut for counting onto functions is to simply subtract the "obviously bad" cases (functions missing exactly one element) without also correcting for functions missing two or more elements simultaneously — precisely the missing-higher-order-term error flagged earlier for general inclusion-exclusion, and it always produces an UNDERCOUNT of the true number of surjections (since functions missing multiple elements get subtracted multiple times in the crude first pass and are never added back).

A NON-HOMOGENEOUS RECURRENCE, WORKED IN FULL

Not every recurrence relation is homogeneous. A LINEAR NON-HOMOGENEOUS RECURRENCE has an extra "forcing" term that does not fit the a_n=c₁a_{n−1}+... pattern exactly — for example, a_n = 2a_{n−1} + 3, with a₀=1. Solving this type requires finding a PARTICULAR SOLUTION (any single sequence that satisfies the full non-homogeneous recurrence, forcing term included) and adding it to the GENERAL SOLUTION of the associated homogeneous recurrence (dropping the forcing term).

1. Homogeneous part: a_n = 2a_{n−1} has characteristic equation x=2, giving the homogeneous general solution A·2ⁿ for an arbitrary constant A.
2. Particular solution: since the forcing term is a plain constant (3), guess a constant particular solution a_n=p for all n. Substituting: p = 2p+3, giving p=−3.
3. General solution to the full recurrence: a_n = A·2ⁿ + (−3) = A·2ⁿ − 3.
4. Fit the constant A using the given initial condition a₀=1: 1 = A·2⁰−3 = A−3, so A=4.
5. Final closed form: a_n = 4·2ⁿ − 3 = 2ⁿ⁺²−3. Checking against the recurrence directly: a₁ should be 2a₀+3=2(1)+3=5; the closed form gives 2¹⁺²−3=8−3=5, matching.

INCLUSION-EXCLUSION PRINCIPLE

The addition principle above requires the cases being summed to be mutually exclusive — but many real counting problems involve OVERLAPPING sets, where simply adding sizes double-counts elements that belong to more than one set. The INCLUSION-EXCLUSION PRINCIPLE (also called the sieve principle) corrects this systematically for any number of sets.

For two sets: |A∪B| = |A| + |B| − |A∩B|. Adding |A|+|B| counts every element of A∩B exactly TWICE (once as a member of A, once as a member of B); subtracting |A∩B| once brings each such element back down to being counted exactly once, matching the true size of the union.

For three sets: |A∪B∪C| = |A|+|B|+|C| − |A∩B|−|A∩C|−|B∩C| + |A∩B∩C|. Tracing why the final term is ADDED BACK: an element lying in ALL THREE sets is counted 3 times in the first sum (once per set), then subtracted 3 times in the pairwise-intersection sum (once per pair, and it belongs to every pair since it is in all three sets) — net count so far is 3−3=0, incorrectly erasing it entirely — so the final +|A∩B∩C| term restores it to being counted exactly once, matching its true single membership in the union.

For n sets in general, the pattern continues: sum all single-set sizes, subtract all pairwise-intersection sizes, add all triple-intersection sizes, subtract all quadruple-intersection sizes, alternating sign, ending with (−1)^(n+1) times the size of the full n-way intersection.

GATE TRAP: for three or more sets, forgetting the higher-order intersection terms (the triple-intersection term when three sets are involved, or higher when more are involved) is the single most common inclusion-exclusion mistake, and it always causes systematic UNDERCOUNTING of elements that belong to many sets at once (since each additional set membership flips one more sign, and stopping early leaves the alternating correction incomplete).

Worked trace: how many integers from 1 to 100 are divisible by 2, 3, or 5? Let A = multiples of 2 (|A|=50), B = multiples of 3 (|B|=33, since ⌊100/3⌋=33), C = multiples of 5 (|C|=20). Pairwise: A∩B = multiples of 6 (|A∩B|=16, since ⌊100/6⌋=16), A∩C = multiples of 10 (|A∩C|=10), B∩C = multiples of 15 (|B∩C|=6, since ⌊100/15⌋=6). Triple: A∩B∩C = multiples of 30 (|A∩B∩C|=3, since ⌊100/30⌋=3). |A∪B∪C| = 50+33+20 − 16−10−6 + 3 = 103 − 32 + 3 = 74.

DERANGEMENTS: A NAMED APPLICATION OF INCLUSION-EXCLUSION

A DERANGEMENT of n items is a permutation in which NO item ends up in its original position — every single item is displaced. This is the classic "hat-check problem": n people check n distinct hats, and the clerk returns them completely at random; a derangement is exactly an outcome where nobody, without exception, gets their own hat back.

1. Let Aᵢ be the set of permutations where item i DOES end up in its original position (the "bad" event to be excluded for every i). The count of derangements is n! minus the number of permutations lying in AT LEAST ONE Aᵢ (i.e. AT LEAST one item is in its own place) — this is exactly a job for inclusion-exclusion on the sets A₁,...,Aₙ.
2. |Aᵢ| = (n−1)! for each single i (fix item i in place, permute the remaining n−1 freely). There are C(n,1) such single sets, contributing C(n,1)(n−1)! to the first inclusion-exclusion term.
3. Generally, the intersection of any k of the Aᵢ (k specific items all fixed in place) has size (n−k)!, and there are C(n,k) ways to choose which k items are the fixed ones, contributing C(n,k)(n−k)! to the k-th inclusion-exclusion term.
4. Applying inclusion-exclusion and simplifying C(n,k)(n−k)! = n!/k! term by term gives the closed form: D(n) = n! × Σ_{k=0}^{n} (−1)ᵏ/k!.

A useful RECURRENCE, easier to compute by hand than the summation form: D(n) = (n−1) × (D(n−1) + D(n−2)), with base cases D(0)=1 (the empty permutation trivially "derranges" nothing, vacuously) and D(1)=0 (a single item can never be displaced from its own only position). Building up: D(2)=1×(D(1)+D(0))=1×(0+1)=1; D(3)=2×(D(2)+D(1))=2×(1+0)=2; D(4)=3×(D(3)+D(2))=3×(2+1)=9; D(5)=4×(D(4)+D(3))=4×(9+2)=44.

GATE TRAP: D(n) is NOT simply n!/e rounded off — while D(n) is indeed the nearest integer to n!/e for every n≥1 (a genuine mathematical fact, since the alternating series Σ(−1)ᵏ/k! converges rapidly to 1/e), GATE problems expect the EXACT value from the recurrence or the inclusion-exclusion formula for the specific small n given, not an approximation — and computing an approximate n!/e by hand risks a rounding error that the exact recurrence never has.

THE PIGEONHOLE PRINCIPLE

THE PIGEONHOLE PRINCIPLE: if n items are placed into k boxes and n>k, then at least one box must contain 2 or more items. This sounds almost too simple to be useful, but it is frequently disguised inside graph theory, sequence, or colouring problems where the "boxes" are not literally boxes at all.

THE GENERALIZED PIGEONHOLE PRINCIPLE: if n items are placed into k boxes, at least one box must contain AT least ⌈n/k⌉ items (the ceiling of n/k, rounded UP, not down) — this follows because if every box held strictly fewer than ⌈n/k⌉ items, the total across all k boxes would be strictly less than k×⌈n/k⌉, which is always ≥ n, contradicting that all n items were actually placed somewhere.

GATE TRAP: the generalized pigeonhole guarantee always uses the CEILING ⌈n/k⌉, never the floor ⌊n/k⌋ — using floor understates the guaranteed minimum and is a common computational slip, especially when n/k is not already a whole number (e.g. distributing 17 items into 5 boxes guarantees some box has at least ⌈17/5⌉=⌈3.4⌉=4 items, not 3).

Worked trace, a disguised pigeonhole question: in any group of 13 people, must at least two share a birth MONTH? There are 12 possible months (the "boxes") and 13 people (the "items"), and 13>12, so yes — by the plain pigeonhole principle, at least one month must contain 2 or more of the 13 people's birthdays.

RECURRENCE RELATIONS

A RECURRENCE RELATION defines a sequence by expressing each term using earlier terms, together with base cases to anchor the recursion. A LINEAR HOMOGENEOUS RECURRENCE WITH CONSTANT COEFFICIENTS — a very common and frequently tested form — has the shape a_n = c₁a_{n−1} + c₂a_{n−2} + ... + c_k a_{n−k}, with fixed constants c₁,...,c_k. These are solved via the CHARACTERISTIC EQUATION: guess a solution of the form a_n = xⁿ, substitute into the recurrence, and divide through by the lowest power of x, producing a polynomial equation in x whose roots determine the general solution.

Worked derivation — the Fibonacci recurrence F(n) = F(n−1) + F(n−2): substituting F(n)=xⁿ gives xⁿ = xⁿ⁻¹ + xⁿ⁻², and dividing through by xⁿ⁻² gives the characteristic equation x² = x + 1, i.e. x²−x−1=0. By the quadratic formula, the roots are x = (1±√5)/2 — the golden ratio φ=(1+√5)/2 and its conjugate ψ=(1−√5)/2. The general solution is a LINEAR COMBINATION of these roots raised to the n-th power: F(n) = Aφⁿ + Bψⁿ, with the constants A and B fitted using the specific initial conditions F(0) and F(1) given for the problem at hand.

REPEATED ROOTS IN THE CHARACTERISTIC EQUATION

The Fibonacci example above had two DISTINCT roots, and the general solution was simply a linear combination of the two root-powers. When the characteristic equation instead has a REPEATED root, the naive guess Aφⁿ+Bφⁿ = (A+B)φⁿ collapses to a single free constant instead of two, which is not enough freedom to fit two independent initial conditions — an extra, independent solution is needed, and it turns out to be n·φⁿ rather than another plain φⁿ.

1. Take the recurrence a_n = 4a_{n−1} − 4a_{n−2}, with a₀=1, a₁=4. Substituting a_n=xⁿ and dividing by xⁿ⁻² gives x² = 4x − 4, i.e. x²−4x+4=0.
2. Factoring: (x−2)² = 0, giving a single REPEATED root x=2 (multiplicity two).
3. For a repeated root r with multiplicity two, the general solution takes the form a_n = (A + Bn)·rⁿ — the extra factor of n supplies the second independent solution the repeated root alone cannot provide. (This mirrors exactly how a repeated root in an ordinary linear differential equation with constant coefficients requires an extra factor of the independent variable multiplying the repeated exponential solution.)
4. Substituting the general form into the initial conditions: a₀ = (A+B·0)·2⁰ = A = 1, so A=1. a₁ = (A+B·1)·2¹ = (1+B)·2 = 4, so 1+B=2, giving B=1.
5. Final closed form: a_n = (1+n)·2ⁿ. Checking against the recurrence directly for n=2: the closed form gives (1+2)·2²=3·4=12; the recurrence gives 4a₁−4a₀=4(4)−4(1)=16−4=12, matching.

KEY: the number of independent constants a linear homogeneous recurrence's general solution needs always equals the DEGREE of the characteristic equation (equivalently, the number of prior terms the recurrence looks back on), and a root of multiplicity m contributes exactly m independent solutions — rⁿ, n·rⁿ, n²·rⁿ, ..., n^(m−1)·rⁿ — rather than the same solution rⁿ counted m separate times; missing this and writing only a single rⁿ term for a repeated root is the standard error, since it leaves too few free constants to fit all the given initial conditions.

CATALAN NUMBERS

The CATALAN NUMBERS, C_n = C(2n,n)/(n+1) = (2n)!/(n!(n+1)!), count an unusually wide range of seemingly unrelated combinatorial structures, all of which turn out to be secretly the same counting problem in different costumes:

• The number of ways to correctly balance n pairs of parentheses (every closing bracket has a matching, not-yet-closed opening bracket to its left at every prefix of the string).
• The number of distinct (unlabelled shape) binary trees with exactly n internal nodes (equivalently, n+1 leaves).
• The number of monotonic lattice paths from (0,0) to (n,n) that use only unit right-steps and unit up-steps and never cross above the main diagonal.
• The number of valid sequences of n stack-push and n stack-pop operations (in some order) on an initially empty stack, such that the stack is never asked to pop when empty.

Values: C₀=1, C₁=1, C₂=2, C₃=5, C₄=14, C₅=42.

KEY: recognising a Catalan-shaped question by its WORDING, rather than deriving the recurrence from scratch under exam time pressure, is the single biggest speed gain in this section — "in how many ways can these n pairs of brackets be validly matched," "how many distinct binary search trees can be built on n given keys," and "how many lattice paths stay below the diagonal" are all, immediately, the SAME question with answer C_n, despite reading as three unrelated scenarios on first glance.

STIRLING NUMBERS AND BELL NUMBERS

STIRLING NUMBERS OF THE SECOND KIND, written S(n,k), count the number of ways to partition a set of n DISTINCT objects into exactly k NONEMPTY, UNLABELLED subsets — "unlabelled" meaning the k groups themselves have no names or order (unlike stars-and-bars, where the boxes were distinct and labelled). Summing S(n,k) over every possible k (from k=1 up to k=n) gives the BELL NUMBER B(n), the total number of ways to partition an n-element set into any number of nonempty unlabelled groups at all — equivalently (since a partition of a set is exactly the same structure as an equivalence relation on that set, with each equivalence class being one part of the partition), B(n) is also the total number of distinct equivalence relations definable on an n-element set.

GATE TRAP: the distinction between Stirling numbers of the second kind (unlabelled destination groups, as in "partition these n people into k indistinguishable teams") and stars-and-bars or ordinary combinations (labelled destination boxes, as in "assign these n people to k NAMED teams: Team A, Team B, ...") is easy to blur under time pressure, but the two give very different counts — assigning to k LABELLED teams (where every person independently picks one of k teams, empty teams allowed) gives kⁿ by the multiplication principle, while partitioning into k UNLABELLED nonempty groups gives the smaller S(n,k), since many of the kⁿ labelled assignments become identical once the team NAMES are erased and only the grouping structure is kept.

GENERATING FUNCTIONS: A DIFFERENT LENS ON THE SAME COUNTING PROBLEMS

An ORDINARY GENERATING FUNCTION encodes an entire sequence a₀,a₁,a₂,... as the coefficients of a single formal power series G(x) = a₀ + a₁x + a₂x² + a₃x³ + .... The point of doing this is not algebraic decoration — it turns certain counting problems (especially "in how many ways" questions involving combining several independent choices) into ordinary polynomial or power-series MULTIPLICATION, letting the multiplication principle be applied at the level of whole generating functions rather than case by case.

1. The generating function for "choose 0 or 1 copies of a single item" is (1+x) — the coefficient of x⁰ is 1 (one way to choose zero copies) and the coefficient of x¹ is 1 (one way to choose one copy).
2. The generating function for "choose any non-negative number of copies of an unlimited identical item" is 1+x+x²+x³+... = 1/(1−x) (a standard geometric series identity), since the coefficient of xᵏ is exactly 1 for every k≥0 — there is exactly one way to "choose k copies" of a single unlimited resource.
3. Combining INDEPENDENT choices by MULTIPLYING their generating functions works because of exactly the same reasoning as the ordinary multiplication principle: the coefficient of xⁿ in a product of generating functions sums, over every way of splitting n = n₁+n₂+... among the factors, the product of the individual ways to achieve each nᵢ — precisely mirroring how Vandermonde's identity was proved above by splitting a combined selection by colour.
4. Stars-and-bars is recovered directly as a generating-function coefficient-extraction problem: distributing n identical items into r distinct boxes, each box unlimited, corresponds to the generating function [1/(1−x)]ʳ, and the coefficient of xⁿ in this expansion is exactly C(n+r−1,r−1) — matching the stars-and-bars formula derived earlier from first principles, now recovered as a special case of a more general machine.

Worked trace connecting the two views: distributing 5 identical balls into 3 distinct boxes, empty allowed (worked problem 5's set-up). The generating function is [1/(1−x)]³, and by the general binomial-series expansion 1/(1−x)ʳ = Σ_{n≥0} C(n+r−1,r−1) xⁿ, the coefficient of x⁵ with r=3 is C(5+3−1,3−1) = C(7,2) = 21 — exactly matching the stars-and-bars answer computed directly earlier, confirming the two methods agree.

KEY: generating functions are not usually the FASTEST tool for a GATE numerical answered just as quickly by stars-and-bars or a direct formula — their real value is as a unifying framework that explains WHY several seemingly different formulas (stars-and-bars, the binomial theorem, Vandermonde's identity) are all instances of one underlying "multiply the choice-encodings" idea, and recognising a problem as a generating-function coefficient-extraction question is occasionally the cleanest way to handle an unusual constraint (such as "each box holds between 2 and 4 items," which restricts the exponents in that box's own factor to the range x²+x³+x⁴, a constraint that direct stars-and-bars does not handle nearly as cleanly).

REVISITING THE ADDITION PRINCIPLE: WHY OVERLAPPING CASES NEED MORE CARE

It is worth returning, at this point in the chapter, to the addition principle stated at the very start, now that inclusion-exclusion has shown exactly what goes wrong when its "mutually exclusive" requirement is silently dropped. A frequent trap dresses up an inclusion-exclusion problem to LOOK like a plain addition-principle problem by asking a question such as "a number from 1 to 100 is chosen at random; find the count divisible by 2 or 5" — a careless reader sees the word "or" and reaches immediately for the addition principle, computing 50+20=70, when the correct count first requires checking whether the two cases (divisible by 2, divisible by 5) actually overlap. Since numbers divisible by both 2 and 5 (that is, by 10) exist — there are 10 such numbers from 1 to 100 — the correct count is 50+20−10=60 by two-set inclusion-exclusion, not the naive 70.

1. The single diagnostic question that separates a genuine addition-principle problem from a disguised inclusion-exclusion problem is: "can an outcome satisfy more than one of the listed cases AT THE SAME TIME?" If yes (as with "divisible by 2" and "divisible by 5," both satisfied at once by any multiple of 10), inclusion-exclusion is required. If no (as with "the die shows an even number" versus "the die shows an odd number" — genuinely impossible simultaneously), plain addition is correct and sufficient.
2. This diagnostic generalises the earlier KEY card about multiplication-versus-addition: that card distinguished sequential-independent-choices from mutually-exclusive-alternative-paths; this one refines the "mutually exclusive" half of that distinction by giving a concrete test (do the described conditions actually forbid co-occurrence, or merely happen not to mention it) for confirming exclusivity before applying the addition principle at all.
3. The same overlap-checking discipline extends naturally to three or more listed cases: whenever a problem describes several conditions joined by "or" and does not explicitly guarantee they are mutually exclusive, the safe default is to check for pairwise (and, if relevant, higher) overlaps before adding raw counts, exactly the discipline the worked inclusion-exclusion examples above were built to train.

WORKED PROBLEMS

1. PERMUTATION VS COMBINATION RECOGNITION. In how many ways can a president, a vice-president, and a secretary be chosen from a group of 8 candidates, no person holding two roles? The three roles are distinguishable, so order (which specific role each chosen person gets) matters: this is P(8,3) = 8×7×6 = 336, NOT C(8,3).

2. STRAIGHTFORWARD COMBINATION. A quiz team of 4 students is to be chosen from a class of 12, with no distinct roles within the team. C(12,4) = 12!/(4!8!) = (12×11×10×9)/(4×3×2×1) = 11880/24 = 495.

3. REPEATED-LETTER ARRANGEMENT. How many distinct arrangements of the letters of the word "BALLOON" are there? Letters: B(1), A(1), L(2), O(2), N(1), total n=7. Arrangements = 7!/(1!×1!×2!×2!×1!) = 5040/4 = 1260.

4. CIRCULAR SEATING. In how many ways can 6 distinct people be seated around a circular table, with rotations considered identical but reflections considered DIFFERENT (an ordinary table, not a flippable necklace)? (6−1)! = 5! = 120.

5. STARS AND BARS, EMPTY ALLOWED. In how many ways can 8 identical sweets be distributed among 4 distinct children, some children possibly receiving none? C(8+4−1, 4−1) = C(11,3) = 165.

6. STARS AND BARS, NONE EMPTY. Repeat the previous problem, but every child must receive at least one sweet. C(8−1, 4−1) = C(7,3) = 35.

7. INCLUSION-EXCLUSION ON THREE SETS. Among 200 students, 80 study French, 60 study German, 50 study Spanish, 20 study both French and German, 15 study both French and Spanish, 10 study both German and Spanish, and 5 study all three. How many study at least one of the three languages? |F∪G∪S| = 80+60+50 − 20−15−10 + 5 = 190 − 45 + 5 = 150.

8. PIGEONHOLE, DISGUISED. A drawer contains socks of 4 different colours, mixed together in the dark. What is the minimum number of socks that must be pulled out to GUARANTEE a matching pair? By the pigeonhole principle with 4 "boxes" (colours), pulling 4 socks could give one of EACH colour with no match yet (the worst case); pulling one more (5 total) forces at least ⌈5/4⌉=2 socks into some one colour, guaranteeing a match. Answer: 5.

9. DERANGEMENT COUNT. In how many ways can 4 letters be placed into 4 addressed envelopes such that NO letter goes into its correctly addressed envelope? This is exactly D(4). Using the recurrence D(4)=3×(D(3)+D(2))=3×(2+1)=9.

10. MULTINOMIAL COEFFICIENT. Find the coefficient of x³y²z² in the expansion of (x+y+z)⁷. Checking degrees: 3+2+2=7, matching n=7. Coefficient = 7!/(3!2!2!) = 5040/(6×2×2) = 5040/24 = 210.

11. ONTO FUNCTION COUNT. How many onto (surjective) functions are there from a 5-element set to a 2-element set? Using the inclusion-exclusion formula with k=2, n=5: Σ_{j=0}^{2}(−1)ʲC(2,j)(2−j)⁵ = C(2,0)(2⁵) − C(2,1)(1⁵) + C(2,2)(0⁵) = 32 − 2(1) + 1(0) = 32−2 = 30. (A quicker cross-check for k=2 specifically: total functions 2⁵=32, minus the 2 constant functions that miss one of the two codomain elements entirely, gives 32−2=30 directly, matching.)

12. REPEATED-ROOT RECURRENCE. Solve a_n = 6a_{n−1} − 9a_{n−2}, with a₀=2, a₁=3, and find a₃. Characteristic equation: x²−6x+9=0, factoring as (x−3)²=0, a repeated root r=3. General solution: a_n=(A+Bn)3ⁿ. From a₀: A=2. From a₁: (2+B)(3)=3, so 2+B=1, B=−1. Closed form: a_n=(2−n)3ⁿ. Then a₃=(2−3)3³=(−1)(27)=−27. Cross-checking directly via the recurrence: a₂=6a₁−9a₀=6(3)−9(2)=18−18=0 (and the closed form gives a₂=(2−2)3²=0, matching); a₃=6a₂−9a₁=6(0)−9(3)=−27, matching the closed form exactly.

CARRYING THIS FORWARD

The recurring discipline across every technique in this chapter is the same one flagged at the very start: identify what KIND of counting question a word problem is secretly asking (ordered or unordered, exclusive cases or overlapping sets, labelled boxes or unlabelled groups, all-must-be-filled or empty-allowed) before reaching for any formula, since every named error in this chapter — permutation-versus-combination, the two stars-and-bars variants, floor-versus-ceiling in pigeonhole, missing an inclusion-exclusion term, exact-versus-approximate derangements, a single solution term where a repeated root needs two — is a translation error, not an arithmetic one. The formulas themselves are short and easy to state; correctly recognising which one a sentence is asking for is the actual skill this chapter is meant to build, and it is worth re-reading each worked problem above specifically for the WORDING that signalled which technique applied, not just for the arithmetic that followed once the technique was chosen.

It is also worth noticing how tightly the techniques in this chapter connect to one another rather than sitting as a list of unrelated tricks. The binomial theorem's coefficients are the entries of Pascal's triangle, which in turn are a special case (m=2) of the multinomial coefficients, which are themselves a repackaging of the same permutations-with-repeated-items formula met at the very start of the chapter — one underlying counting idea (splitting n labelled slots into groups of fixed sizes) surfaces four separate times under four different names. Similarly, derangements and onto-function counts are both direct applications of the identical inclusion-exclusion machinery, differing only in what the "bad" sets Aᵢ are defined to mean (an item in its original place, versus a codomain element never hit) — recognising this shared skeleton means a fifth or sixth inclusion-exclusion variant, dressed up in an unfamiliar wording, is not actually a new technique to learn but a new instance of one already mastered. Generating functions, in turn, were shown to recover the stars-and-bars formula exactly as a coefficient-extraction exercise, tying the whole chapter's toolbox together as different lenses on the same small set of underlying combinatorial ideas: choose, arrange, split, or exclude, applied to a set of distinguishable or indistinguishable items under a handful of possible constraints. Internalising these connections — rather than memorising ten formulas as ten separate facts — is what makes an unfamiliar-looking word problem tractable on first read, since the unfamiliar wording almost always turns out to be one of this small number of underlying ideas wearing a new costume, and spotting which one applies is usually far faster, and far more reliable under time pressure, than re-deriving any single formula from scratch every time it is needed.
`
};
