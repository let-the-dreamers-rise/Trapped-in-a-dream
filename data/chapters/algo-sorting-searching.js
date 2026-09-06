// Textbook chapter: Sorting and Searching.
// Written directly (no subagent) to match the depth and voice of the other
// chapters in data/chapters/. Merge sort and quicksort's internal mechanics
// and recurrences are derived in algo-divide-conquer; this chapter recaps
// each briefly and focuses on comparative properties, the elementary sorts,
// linear-time sorts, the comparison lower bound, and searching.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['algo-sorting-searching'] = {
  figs: [
    {
      id: 'decision-tree-sort',
      caption: 'The decision tree for sorting 3 elements. Every leaf is one of the 3! = 6 possible orderings, so the tree needs at least 6 leaves, and a binary tree with 6 leaves must have height at least ⌈log2 6⌉ = 3.',
      svg: '<svg viewBox="0 0 380 190" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3" fill="none"><line x1="190" y1="15" x2="90" y2="60"/><line x1="190" y1="15" x2="290" y2="60"/><line x1="90" y1="60" x2="45" y2="105"/><line x1="90" y1="60" x2="135" y2="105"/><line x1="290" y1="60" x2="245" y2="105"/><line x1="290" y1="60" x2="335" y2="105"/><line x1="45" y1="105" x2="25" y2="150"/><line x1="45" y1="105" x2="65" y2="150"/><line x1="245" y1="105" x2="225" y2="150"/><line x1="245" y1="105" x2="265" y2="150"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="190" y="10">a&lt;b?</text><text x="90" y="55">b&lt;c?</text><text x="290" y="55">a&lt;c?</text><text x="135" y="100">a&lt;c?</text><text x="245" y="100">b&lt;c?</text><text x="25" y="165">abc</text><text x="65" y="165">acb</text><text x="112" y="120">cab</text><text x="158" y="120">bac</text><text x="225" y="165">bca</text><text x="265" y="165">cba</text><text x="335" y="120">(pruned)</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER ADDS TO SORTING

The divide-and-conquer chapter derived merge sort and quicksort from first principles, with their recurrences solved and their partition and merge steps traced in full — that mechanical detail is not repeated here. This chapter asks a different set of questions: what PROPERTIES distinguish one sorting algorithm from another beyond raw speed (stability, whether it needs extra memory, whether it exploits existing order); how the simple, quadratic-time sorts actually behave, exactly, not just asymptotically; whether n log n is truly the best any comparison-based sort can do, and why; how to beat n log n entirely when you know something extra about the data; and, once a collection is sorted, how to search it — and what to do when you don't even have a sorted array to search.

THE PROPERTIES THAT DISTINGUISH SORTING ALGORITHMS

STABILITY. A sort is STABLE if two elements that compare as equal keep their original relative order in the output. This matters whenever the "equal" elements are not actually identical — they merely tie on the key you sorted by, but carry other data that distinguishes them. Sort a list of students by grade; if two students share a grade, a stable sort keeps whichever one appeared first in the original list still ahead of the other in the output, while an unstable sort makes no such promise and might swap them. Any sort can be made artificially stable by attaching each element's original index as a secondary tiebreaker key — compare primarily by the real key, and only when that ties, compare by original index — turning "equal" elements into elements that are never actually equal, so no correct sort can reorder them.

KEY: Stability is a property of a SPECIFIC ALGORITHM's implementation, not of the abstract idea of "sorting" — two different implementations of the same underlying method can differ in stability depending on fine details like scan direction (seen below in counting sort) or which side a partition step favours on a tie. Never answer "is X stable" from the algorithm's name alone without checking what its tie-breaking behaviour actually does.

GATE TRAP: A sort applied to an array with NO duplicate keys is trivially "stable" in the sense that there are no ties to preserve or violate — this makes stability an untestable, meaningless question on such an input. Any exam question genuinely testing stability MUST use an array with at least one repeated key (or, as in the worked problems below, an explicit subscript marking which of two equal-valued elements is "first"), and a claim about a sort's stability demonstrated only on distinct-key data proves nothing.

IN-PLACE. A sort is IN-PLACE if it uses O(1) extra memory beyond the input array itself (a handful of index variables, not a second array or a recursion stack that grows with n). By this precise standard, straightforward recursive quicksort is NOT strictly in-place — its recursion stack can grow to O(n) in the worst case (though tail-call optimisation on the larger partition, covered in the divide-and-conquer chapter, bounds it to O(log n), which is still not O(1) but is usually accepted as "in-place enough" in casual usage). Merge sort's standard array implementation needs O(n) auxiliary space for merging and is NOT in-place under any reading. Heapsort achieves true O(1) extra space and is genuinely in-place.

ADAPTIVE. A sort is ADAPTIVE if it runs faster on input that is already partially sorted, with its running time actually improving as a function of how close to sorted the input already is (usually measured by the number of INVERSIONS, defined and used below). Insertion sort is strongly adaptive. Standard merge sort and quicksort are not adaptive in their basic form — they do the same amount of work regardless of existing order.

GATE TRAP: "Adaptive" and "best-case is fast" are not automatically the same claim, though they usually coincide. An algorithm is properly called adaptive only if its cost genuinely scales with the DEGREE of existing order (few inversions → proportionally less work, many inversions → proportionally more), not merely if it happens to have one single best-case input (fully sorted) that is fast. Insertion sort passes this stronger test because its cost is Θ(n + inversions) for ANY amount of partial order, not just the two extremes of "fully sorted" and "fully reversed."

COMPARISON-BASED VS NOT. A COMPARISON-BASED sort decides everything by comparing pairs of elements with <, ≤, or = and never inspects their internal representation any other way. Counting sort, radix sort and bucket sort, covered later in this chapter, are NOT comparison-based — they use the actual numeric value of the keys directly (as an array index, or a digit) rather than only comparing pairs, which is exactly what lets them beat the comparison lower bound proved below.

THE THREE ELEMENTARY SORTS

Each is worked on the same array, [5, 2, 8, 1, 9, 3], so the three can be compared directly pass by pass.

BUBBLE SORT repeatedly scans the array left to right, swapping any adjacent pair that is out of order, so that after each full pass the largest remaining unsorted element has "bubbled" to its correct position at the end.

Pass 1 on [5, 2, 8, 1, 9, 3]: compare (5,2)→swap→[2,5,8,1,9,3]; compare (5,8)→no swap; compare (8,1)→swap→[2,5,1,8,9,3]; compare (8,9)→no swap; compare (9,3)→swap→[2,5,1,8,3,9]. After pass 1: [2,5,1,8,3,9] — 9 (the maximum) is correctly at the end.

Pass 2 on [2,5,1,8,3,9] (last element already placed, so only scan the first 5): compare (2,5)→no swap; compare (5,1)→swap→[2,1,5,8,3,9]; compare (5,8)→no swap; compare (8,3)→swap→[2,1,5,3,8,9]; (last position already fixed, skip). After pass 2: [2,1,5,3,8,9] — 8 now correctly placed second from the end.

Pass 3 (scan first 4): (2,1)→swap→[1,2,5,3,8,9]; (2,5)→no swap; (5,3)→swap→[1,2,3,5,8,9]. After pass 3: [1,2,3,5,8,9] — already fully sorted, though a naive implementation without an early-exit check would still run passes 4 and 5 uselessly.

A bubble sort with an EARLY-EXIT FLAG (a boolean set whenever any swap occurs in a pass, checked at the end of the pass — if no swap occurred, the array is already sorted and the algorithm can stop) achieves its BEST CASE of O(n) comparisons on an already-sorted array: a single pass finds no swaps, sets the flag to "no swap happened," and exits immediately, having made only n−1 comparisons and zero swaps. Without the flag, even an already-sorted array forces all n−1 passes to run to completion, each uselessly scanning to confirm no swaps are needed — an easy trap in a "what is the best-case complexity" question, since the answer depends entirely on whether the described implementation includes the flag.

WORST CASE (reverse-sorted input): every possible adjacent pair is out of order at every single comparison opportunity across all passes, giving exactly n(n−1)/2 comparisons AND n(n−1)/2 swaps — the maximum possible number of both, since n(n−1)/2 is exactly the number of pairs in an n-element array (derived: pass k, for k=1 to n−1, compares n−k adjacent pairs, and Σ(n−k) for k=1 to n−1 is (n−1)+(n−2)+...+1 = n(n−1)/2, the standard arithmetic sum). Bubble sort is stable (an adjacent swap only occurs when the left element is STRICTLY greater than the right, so two equal elements are never swapped past each other) and in-place (O(1) extra space, just a temp variable for swapping).

SELECTION SORT repeatedly scans the UNSORTED portion of the array to find its minimum element, then swaps that minimum into the front of the unsorted portion (extending the sorted portion by one).

Pass 1 on [5, 2, 8, 1, 9, 3]: scan the whole array, minimum is 1 at index 3; swap index 0 and index 3: [1, 2, 8, 5, 9, 3].
Pass 2 (scan indices 1–5): minimum of [2,8,5,9,3] is 2, already at index 1 — no swap needed (or a "swap with itself," depending on implementation, still counted as a swap opportunity even though nothing visibly moves): [1, 2, 8, 5, 9, 3].
Pass 3 (scan indices 2–5): minimum of [8,5,9,3] is 3 at index 5; swap index 2 and index 5: [1, 2, 3, 5, 9, 8].
Pass 4 (scan indices 3–5): minimum of [5,9,8] is 5, already at index 3 — no swap: [1, 2, 3, 5, 9, 8].
Pass 5 (scan indices 4–5): minimum of [9,8] is 8 at index 5; swap index 4 and index 5: [1, 2, 3, 5, 8, 9].
Fully sorted after n−1 = 5 passes.

Selection sort's comparison count is ALWAYS exactly n(n−1)/2 in best, worst and average case alike — every pass must scan its entire remaining unsorted portion to find the minimum, regardless of the input's existing order, so there is no early exit and no case-dependent variation. This is worth contrasting directly with bubble sort, whose comparison count DOES depend on input order (best case O(n) with the flag). Selection sort makes AT MOST n−1 swaps total — exactly one swap per pass (or zero, if the minimum happens to already be in place, as in passes 2 and 4 above) — making it the sort with the FEWEST swaps of any of the elementary sorts, which matters when a swap is expensive (for instance, swapping large records rather than small keys). Selection sort is NOT stable: swapping the found minimum into place can leapfrog it over an equal element that was originally ahead of it, reordering their relative positions.

INSERTION SORT builds the sorted portion incrementally by taking each next element from the unsorted portion and inserting it into its correct position among the already-sorted elements before it, shifting larger sorted elements one position to the right to make room.

Pass 1 (insert index 1's value, 2, into the sorted prefix [5]): 2<5, shift 5 right, place 2 at index 0: [2, 5, 8, 1, 9, 3].
Pass 2 (insert 8 into sorted prefix [2,5]): 8>5, no shift needed, 8 stays at index 2: [2, 5, 8, 1, 9, 3].
Pass 3 (insert 1 into sorted prefix [2,5,8]): 1<8 shift 8 right; 1<5 shift 5 right; 1<2 shift 2 right; place 1 at index 0: [1, 2, 5, 8, 9, 3].
Pass 4 (insert 9 into sorted prefix [1,2,5,8]): 9>8, no shift: [1, 2, 5, 8, 9, 3].
Pass 5 (insert 3 into sorted prefix [1,2,5,8,9]): 3<9 shift; 3<8 shift; 3<5 shift; 3>2 stop, place 3 at index 2: [1, 2, 3, 5, 8, 9].
Fully sorted.

Insertion sort's BEST CASE, on an already-sorted array, is n−1 comparisons total: each new element is compared exactly once against its immediate predecessor, finds it is already ≥ (no shift needed), and moves on — this is the strongest best-case behaviour of the three elementary sorts and is exactly why insertion sort is the standard choice for nearly-sorted or small input. The WORST CASE, on a reverse-sorted array, forces every new element to shift all the way to the front, giving the same n(n−1)/2 total comparisons as the other two elementary sorts in their worst cases.

The AVERAGE CASE is best understood through the INVERSION COUNT. An INVERSION in an array is a pair of positions (i, j) with i<j but a[i]>a[j] — a pair that is "out of order" relative to each other, regardless of where else they sit in the array. The maximum possible number of inversions in an n-element array is n(n−1)/2 (achieved by a fully reverse-sorted array, where every single pair is inverted), and the minimum is 0 (achieved only by an already-sorted array).

KEY: The number of swaps insertion sort performs is EXACTLY equal to the number of inversions in the original array — no more, no fewer. Each single-position shift during an insertion corrects exactly one inversion (the newly-shifted element and the element being inserted were out of order, and the shift fixes precisely that one pair), and insertion sort continues shifting only as long as an inversion remains to be corrected for that element. This gives a second way to compute insertion sort's cost on any given input: count its inversions directly, rather than tracing every pass.

Since a uniformly random permutation of n elements has, on average, half the maximum possible number of inversions — n(n−1)/2 / 2 = n(n−1)/4 ≈ n²/4 — insertion sort's average-case comparison and swap count is Θ(n²/4), which simplifies to the same Θ(n²) order as its worst case, but with a smaller constant, and this Θ(n²/4) figure is itself a frequently asked exact quantity, not just an order of growth. Insertion sort is stable (an element is only shifted past a STRICTLY smaller element, never past one it is equal to — the loop condition compares with strict inequality and stops shifting at the first equal-or-smaller predecessor) and in-place.

COUNTING INVERSIONS IN O(n log n)

Counting inversions by checking every pair directly costs Θ(n²) — the same order as insertion sort itself, defeating the purpose of finding them quickly. A faster method piggybacks on merge sort's own merge step: whenever the merge step takes an element from the RIGHT half instead of the left half (because the current right element is smaller than the current left element), every remaining element still sitting in the left half forms an inversion with that right element (since the left half is itself already sorted, and this particular right-half element is smaller than the current left element AND, because the left half is sorted, smaller than every element still remaining after it in the left half too) — so add (number of elements remaining in the left half) to the inversion count at that moment, and continue the merge exactly as usual. This adds only O(1) extra work per element moved during the merge, so the total time remains O(n log n), the same as merge sort itself.

Trace it on [2, 4, 1, 3, 5]: split into [2,4] and [1,3,5]. Recursively, [2,4] has 0 inversions (already sorted internally) and [1,3,5] has 0 inversions (already sorted internally). Now merge the two sorted halves [2,4] and [1,3,5], counting cross-inversions: compare 2 and 1 → 1 is smaller, take from right (1); 1 elements remain in the left half [2,4], so add 2 to the inversion count (both 2 and 4 are inverted with respect to 1, since both sit to 1's left in the original array but are larger than it). Running total: 2. Compare 2 and 3 → 2 is smaller, take from left (2); no addition (taking from the left never creates a new inversion — it means the current left element was correctly smaller than everything remaining on the right). Compare 4 and 3 → 3 is smaller, take from right (3); 1 element remains in the left half ([4] alone), so add 1. Running total: 3. Compare 4 and 5 → 4 is smaller, take from left (4); no addition. Only 5 remains on the right; append it, no addition. Total cross-inversions from this merge: 3. Since both halves individually had 0 inversions, the grand total for the whole array is 0+0+3 = 3.

Verify by brute force on the original array [2,4,1,3,5]: the inverted pairs are (2,1) at positions (0,2), (4,1) at positions (1,2), and (4,3) at positions (1,3) — exactly 3 pairs, confirming the merge-based count.

MERGE SORT AND QUICKSORT, RECAPPED

MERGE SORT: always Θ(n log n) in best, worst and average case alike (derived in the divide-and-conquer chapter from the recursion tree — every level does Θ(n) total merge work, and there are Θ(log n) levels). Stable (the merge step, when the two candidate elements are equal, is implemented to always take from the left half first, preserving original order). NOT in-place — needs Θ(n) auxiliary array space for merging. Excellent for linked lists specifically, since linked-list merging needs no extra array at all (just relinking pointers), removing merge sort's usual space disadvantage in that one setting. NOT naturally adaptive in its basic recursive form (it always fully recurses regardless of existing order), though a bottom-up variant with a "already merged, skip" check can add limited adaptivity.

QUICKSORT: average case Θ(n log n) (derived via the expected-comparisons sum in the divide-and-conquer chapter), worst case Θ(n²) on adversarial input (already-sorted or reverse-sorted input with a first-or-last-element pivot choice). NOT stable in general (a partition step can swap two equal elements across the pivot boundary, reordering their relative positions — this is implementation-dependent but true of the standard Lomuto and Hoare schemes). In-place in the loose sense described above (O(log n) stack depth with tail-call optimisation on the larger side, though not the strict O(1) definition). Usually the fastest sort in practice on random data despite the same Θ(n log n) average order as merge sort and heapsort, because its inner loop has very low constant-factor overhead and excellent cache locality (it works within contiguous array regions, unlike merge sort's separate auxiliary array).

HEAPSORT: always Θ(n log n) regardless of input (build the heap in Θ(n), then extract the maximum n times at Θ(log n) each, giving Θ(n) + Θ(n log n) = Θ(n log n) overall — full derivation and the heap mechanics themselves belong to the heaps chapter). In-place with true O(1) extra space (the heap is built directly inside the input array, and extraction swaps the max to the now-vacant end position). NOT stable (sifting elements through the heap has no mechanism to preserve original order among equal keys — an element can be relocated arbitrarily far from its original neighbours). The standard choice whenever guaranteed Θ(n log n) AND in-place are both required simultaneously (merge sort gives the guarantee but not in-place; quicksort gives neither guarantee, though average-case fast).

THE COMPARISON-SORT LOWER BOUND

Can any comparison-based sorting algorithm beat Θ(n log n) in the worst case? No — and this is provable, not just an empirical observation, using the DECISION-TREE argument.

Model any comparison-based sorting algorithm as a binary tree: each internal node represents one comparison the algorithm makes (say, "is a[i] < a[j]?"), with the left child taken if the answer is "yes" and the right child if "no." Each LEAF of this tree corresponds to one final, fully-determined ordering of the input that the algorithm would output, having narrowed down to it through the sequence of comparison answers leading from the root to that leaf.

[[FIG:decision-tree-sort]]

The lower-bound argument runs in four steps.

1. For the algorithm to correctly sort EVERY possible input permutation, the tree must have at least one distinct leaf for every one of the n! possible orderings of n elements — if two different orderings led to the SAME leaf, the algorithm would be unable to distinguish which one it was actually given, and could not correctly sort both. So the tree needs at least n! leaves.

2. A binary tree of height h has at most 2^h leaves (each level at most doubles the leaf count of the level above it — proved earlier in the trees chapter by the same doubling argument used there). So if the tree needs at least n! leaves, and has at most 2^h leaves at height h, then 2^h ≥ n!, giving h ≥ log2(n!).

3. Approximate log2(n!) using Stirling's approximation, n! ≈ √(2πn) (n/e)ⁿ, so log2(n!) ≈ n log2 n − n log2 e + O(log n), which is Θ(n log n) — the lower-order terms vanish into the Θ notation, leaving the dominant term n log2 n.

4. The height of the decision tree is a lower bound on the WORST-CASE number of comparisons the algorithm can possibly make: the worst case corresponds to the longest root-to-leaf path actually reachable, and the tree's height is the length of its longest path, so h ≥ Ω(n log n) means the worst case is Ω(n log n) for EVERY comparison-based algorithm, with no exceptions.

KEY: The whole argument rests on one counting fact — a tree needs at least as many leaves as there are distinct answers it must be able to produce, and a binary tree's leaf count cannot exceed 2^height. Whenever you meet a lower-bound question phrased as "at least how many comparisons/questions are needed to distinguish among N possible outcomes," the answer is always ⌈log2 N⌉, derived from exactly this leaf-counting logic, whether or not the word "sorting" appears anywhere in the question.

No comparison sort can therefore have a worst-case running time better than Ω(n log n). Merge sort and heapsort, both Θ(n log n) always, are therefore asymptotically OPTIMAL among comparison-based sorts — they cannot be beaten in the worst case by any algorithm that only compares pairs of elements.

GATE TRAP: The Ω(n log n) lower bound applies ONLY to comparison-based sorts, and only to their WORST case (an average-case version of the same argument exists too, using the fact that the AVERAGE depth of a leaf in a tree with n! leaves is also Ω(n log n), by a similar counting argument, so even average-case comparison sorting cannot beat n log n). It says nothing whatsoever about algorithms that are not comparison-based — counting sort, radix sort and bucket sort below all achieve better than Θ(n log n) in favourable cases precisely because they never ask "is a[i] < a[j]?" at all; they use the actual numeric value of each key directly. And the lower bound says nothing about any SPECIFIC input — an already-sorted array can still be sorted in O(n) by an adaptive comparison sort like insertion sort or a flagged bubble sort, because the Ω(n log n) bound is about the worst case over ALL inputs, not a guarantee for every individual input.

THE LINEAR-TIME SORTS

These beat the Θ(n log n) comparison barrier by exploiting extra structure in the keys — specifically, that the keys are integers within a bounded range — and by never comparing two keys against each other at all.

COUNTING SORT assumes every key is an integer in a small known range [0, k]. It proceeds in four numbered stages:

1. Build an array COUNT of size k+1, initialised to zero.
2. Scan the input once, incrementing COUNT[value] for each element's value. Now COUNT[v] holds the number of elements equal to v.
3. Convert COUNT into a PREFIX SUM array (each entry becomes the sum of itself and all entries before it), so that COUNT[v] now holds the number of elements ≤ v — meaning COUNT[v] tells you the position, in the sorted output, where the LAST occurrence of value v should be placed.
4. Scan the input a second time, this time from RIGHT TO LEFT: for each element with value v, place it at output position COUNT[v]−1, then decrement COUNT[v] (so the next occurrence of the same value, encountered earlier in this right-to-left scan, gets the next slot down).

GATE TRAP: Scanning the placement step left-to-right instead of right-to-left still produces a CORRECTLY SORTED array (the values end up in the right order either way) but silently breaks STABILITY — ties get reversed instead of preserved. A question that asks "is this implementation of counting sort stable" is testing exactly this one directional detail, not whether the sort works at all.

Scanning right-to-left during the placement step, rather than left-to-right, is exactly what makes counting sort STABLE: it guarantees that among several elements sharing the same value, the one that appeared EARLIEST in the original input gets placed into the LOWEST of the slots reserved for that value, preserving original relative order. (Convince yourself: the rightmost occurrence of a repeated value is processed FIRST in a right-to-left scan, and gets the HIGHEST available slot for that value, since COUNT[v] hasn't been decremented yet; each subsequent occurrence moving leftward gets progressively lower slots — so the original leftmost occurrence ends up in the lowest slot, i.e. first among the ties, in the final sorted output.)

Counting sort runs in Θ(n+k) time: Θ(n) for the two scans of the input, and Θ(k) for building and prefix-summing the count array. This is better than any comparison sort's Θ(n log n) ONLY when k = O(n) — if k were, say, n², the Θ(n+k) cost would actually be Θ(n²), worse than comparison sorting. Counting sort is the right tool specifically when the key range is small relative to the number of elements — sorting exam scores from 0 to 100, or single-digit values, not sorting arbitrary 32-bit integers.

RADIX SORT extends counting sort to larger integers by sorting DIGIT BY DIGIT rather than by the whole value at once, using the LEAST-SIGNIFICANT-DIGIT-FIRST (LSD) convention: sort the whole array by its least significant digit first (using counting sort as the per-digit subroutine, since digits form a small, bounded range 0–9 for base 10, or 0 to (base−1) for any other base), then by the next digit, and so on up to the most significant digit.

KEY: Radix sort's per-digit sorting step MUST be stable, and this is not an optional nicety — it is the entire correctness argument. After sorting by digit position i, the array is correctly ordered with respect to digits i and below (all lower positions), considered together as a group. When the NEXT pass sorts by digit position i+1, any two elements that TIE on digit i+1 must keep the relative order they already had from the previous pass (which reflects their correct ordering on the lower digits) — and that is exactly what a stable sort guarantees. An unstable per-digit sort would scramble that already-correct lower-digit ordering among ties, breaking the whole algorithm.

Trace 3-digit LSD radix sort on [329, 457, 657, 839, 436, 720, 355]. Pass 1 (sort by ones digit, using each element's last digit: 9,7,7,9,6,0,5): grouping stably by ones digit in order 0,1,...,9 gives [720, 355, 436, 457, 657, 329, 839] (720 has ones-digit 0; 355 has 5; 436 has 6; 457 and 657 both have 7, and 457 appeared before 657 in the original array so it stays first; 329 and 839 both have 9, and 329 appeared before 839 originally so it stays first). Pass 2 (sort the pass-1 result by tens digit: 2,5,3,5,5,2,3 respectively for 720,355,436,457,657,329,839): stably grouping by tens digit 0..9 gives [720, 329, 436, 839, 355, 457, 657] (tens digit 2: 720 then 329, in that order since 720 preceded 329 after pass 1; tens digit 3: 436 then 839; tens digit 5: 355, 457, 657, in that relative order since that was their order after pass 1). Pass 3 (sort by hundreds digit: 7,3,4,8,3,4,6): stably grouping by hundreds digit gives [329, 436, 355, 457, 657, 720, 839] (hundreds digit 3: 329 then 355 — wait, checking order after pass 2, 329 appeared before 355, correctly preserved; hundreds digit 4: 436 then 457, in the order they appeared after pass 2). Final result: [329, 355, 436, 457, 657, 720, 839] — fully sorted, confirmed by inspection.

Radix sort's running time is Θ(d(n+k)), where d is the number of digits and k is the base (the range of each individual digit, so k=10 for decimal, k=2 for binary). This is compared against comparison sorting's Θ(n log n): if the keys fit in d digits base k, and d is small (say, a constant, like sorting 3-digit numbers, or 32-bit integers treated in a handful of byte-sized chunks), then Θ(d(n+k)) is effectively Θ(n), beating Θ(n log n) outright. The trade-off is choosing the base k: a larger base means fewer digits (smaller d) but a bigger per-digit counting-sort range (bigger k) — for 32-bit integers, splitting into 4 bytes (base 256, so k=256 and d=4) is a common practical choice, balancing the two costs against each other rather than using base 10 or base 2 directly.

BUCKET SORT assumes the input is drawn roughly UNIFORMLY over a known range (commonly [0,1) for real numbers, though it generalises). Create n empty buckets, each covering an equal-sized sub-interval of the range; scan the input once, placing each element into its corresponding bucket by which sub-interval it falls into (an O(1) computation per element, just scaling the value into a bucket index); sort each bucket individually (typically with insertion sort, since buckets are expected to be small); concatenate the sorted buckets in order.

Under the UNIFORM-distribution assumption, each bucket receives O(1) elements on average, so each bucket's individual sort costs O(1) on average too (insertion sort on a constant-expected-size list), and the whole algorithm runs in EXPECTED Θ(n) time. The WORST CASE, however, is Θ(n²): if the input distribution is badly skewed (say, every single element happens to fall into the very same bucket, however unlikely under a truly uniform assumption but always POSSIBLE for an adversarial or simply unlucky input), that one bucket must be sorted with n elements in it, costing Θ(n²) by itself. Bucket sort's performance is a direct bet on the input's actual distribution matching the uniform assumption; it should not be used when that assumption is not actually justified by the problem.

THE MASTER COMPARISON TABLE

Algorithm       | Best        | Worst       | Average     | Space  | Stable | In-place | Adaptive
Bubble (flagged)| Θ(n)        | Θ(n²)       | Θ(n²)       | O(1)   | Yes    | Yes      | Yes
Selection       | Θ(n²)       | Θ(n²)       | Θ(n²)       | O(1)   | No     | Yes      | No
Insertion       | Θ(n)        | Θ(n²)       | Θ(n²/4)     | O(1)   | Yes    | Yes      | Yes (strongly)
Merge sort      | Θ(n log n)  | Θ(n log n)  | Θ(n log n)  | Θ(n)   | Yes    | No       | No (basic form)
Quicksort       | Θ(n log n)  | Θ(n²)       | Θ(n log n)  | O(log n)| No    | ~Yes     | No
Heapsort        | Θ(n log n)  | Θ(n log n)  | Θ(n log n)  | O(1)   | No     | Yes      | No
Counting sort   | Θ(n+k)      | Θ(n+k)      | Θ(n+k)      | Θ(n+k) | Yes    | No       | N/A
Radix sort      | Θ(d(n+k))   | Θ(d(n+k))   | Θ(d(n+k))   | Θ(n+k) | Yes    | No       | N/A
Bucket sort     | Θ(n)        | Θ(n²)       | Θ(n)        | Θ(n)   | Yes*   | No       | N/A

(*Bucket sort's stability depends on using a stable sort within each bucket and preserving bucket-to-bucket order during concatenation — both are standard but not automatic.)

CHOOSING A SORT FOR A SITUATION

Nearly-sorted input with few inversions → insertion sort, exploiting its Θ(n + inversions) actual behaviour rather than paying for a full Θ(n log n) sort that ignores existing order.
Guaranteed Θ(n log n) needed AND stability matters (e.g., sorting database records by one field while preserving order on another) → merge sort.
Guaranteed Θ(n log n) needed AND memory is tight (embedded systems, huge arrays where doubling memory usage is unacceptable) → heapsort.
Fastest average case in practice, memory not a hard constraint, stability not required → quicksort (with randomised pivot selection or median-of-three to defend against its worst case on adversarial or already-sorted input).
Keys are small integers in a known bounded range (grades, ages, single-byte values) → counting sort.
Keys are larger integers or fixed-length strings, comparison sort's n log n barrier is the bottleneck → radix sort.
Sorting a linked list specifically → merge sort, since linked-list merging needs no auxiliary array (just relinking next-pointers), removing merge sort's usual space penalty entirely, while quicksort's usual partitioning scheme depends on random access that a linked list cannot provide efficiently.
Data far too large to fit in memory (external sorting, sorting a file on disk) → external merge sort, covered next.

EXTERNAL SORTING

When the data to be sorted is too large to fit entirely in main memory (a large file on disk, sorted in chunks that must repeatedly be read from and written back to disk), the standard technique is EXTERNAL MERGE SORT: split the data into chunks that DO fit in memory (each of size M, the available memory), sort each chunk in memory using any ordinary in-memory sort, write each sorted chunk back to disk as a "run," and then repeatedly K-WAY MERGE groups of K runs at a time into progressively larger sorted runs, until only one run — the fully sorted output — remains.

If the total data size is N and the available memory is M, the initial split produces N/M sorted runs. Each merge PASS combines K runs at a time, reducing the run count by a factor of K, so the number of passes needed to go from N/M runs down to 1 is ⌈log_K(N/M)⌉ — derived exactly as any base-K logarithm is derived: each pass divides the remaining run count by K, so the number of passes to reach 1 is the number of times K must be applied, which is log base K of the starting count.

This ⌈log_K(N/M)⌉ figure is the number of passes over the ENTIRE dataset that need to be made from disk, and since disk I/O (not CPU computation) is the dominant cost in external sorting by a wide margin, minimising the number of passes — by making K as large as the available memory for merge buffers allows — is the actual optimisation target, distinct from minimising CPU comparisons the way in-memory sorting does.

THE "AFTER k PASSES" QUESTION TYPE

Given an array and a stated number of completed passes of a named algorithm, state the array's contents. This tests whether you actually understand each algorithm's per-pass behaviour rather than just its overall complexity.

On [6, 3, 9, 2, 7], after 2 passes of BUBBLE SORT (with the largest elements bubbling to the end each pass): Pass 1: (6,3)swap→[3,6,9,2,7]; (6,9)no swap; (9,2)swap→[3,6,2,9,7]; (9,7)swap→[3,6,2,7,9]. After pass 1: [3,6,2,7,9]. Pass 2 (last position fixed, scan first 4): (3,6)no swap; (6,2)swap→[3,2,6,7,9]; (6,7)no swap. After pass 2: [3,2,6,7,9].

On the same original array, after 2 passes of SELECTION SORT: Pass 1: minimum of [6,3,9,2,7] is 2 at index 3; swap with index 0: [2,3,9,6,7]. Pass 2: minimum of remaining [3,9,6,7] (indices 1–4) is 3, already at index 1, no visible change: [2,3,9,6,7].

On the same original array, after 2 passes of INSERTION SORT: Pass 1 (insert index 1's value 3 into sorted prefix [6]): 3<6, shift, place 3 first: [3,6,9,2,7]. Pass 2 (insert index 2's value 9 into sorted prefix [3,6]): 9>6, no shift, stays put: [3,6,9,2,7].

Notice all three algorithms started from the same array and, after the same number of passes (2), reached three genuinely different intermediate states — [3,2,6,7,9], [2,3,9,6,7], and [3,6,9,2,7] respectively — which is exactly the kind of distinction a "which algorithm produced this state" reverse question is testing: given only an intermediate array and told it came from 2 passes of ONE of these three algorithms, you must reason backward from the specific shape of the partial ordering (is the tail sorted? is the head sorted? are there large-scale swaps or only local adjacent ones?) to identify which.

MINIMUM-COMPARISON FAMILY

FINDING THE MAXIMUM of n elements needs exactly n−1 comparisons, and no fewer — this is provably optimal by a simple ADVERSARY argument: every element except the eventual winner must LOSE at least one comparison directly (be found smaller than something) for the algorithm to be certain it is not the maximum; since there are n−1 non-winning elements, at least n−1 "losing" comparisons must occur, and a tournament-style algorithm achieves exactly this many (each comparison eliminates exactly one candidate from being the maximum).

FINDING BOTH MIN AND MAX simultaneously needs only ⌈3n/2⌉−2 comparisons, not the naive 2(n−1) you'd get from finding each separately, achieved by processing elements in PAIRS:

1. Compare each pair against each other first: ⌈n/2⌉ comparisons total for all pairs, producing a "winner" and a "loser" from each pair.
2. Compare only the WINNERS of each pair against the running maximum: ⌈n/2⌉−1 comparisons.
3. Compare only the LOSERS of each pair against the running minimum: ⌈n/2⌉−1 comparisons.

A winner can never be the overall minimum (it already beat something) and a loser can never be the overall maximum (it already lost to something), so each element only needs to be checked against ONE of the two running extremes, not both. Total: ⌈n/2⌉ + (⌈n/2⌉−1) + (⌈n/2⌉−1) = 3⌈n/2⌉ − 2, which simplifies to ⌈3n/2⌉−2 for the comparison count.

FINDING THE SECOND LARGEST needs n + ⌈log2 n⌉ − 2 comparisons, achieved via a TOURNAMENT.

1. Run a standard knockout tournament to find the maximum, using n−1 comparisons (as derived above) arranged in a binary tree of ⌈log2 n⌉ rounds.
2. Observe that the SECOND largest element must have lost DIRECTLY to the eventual overall maximum at some point in the tournament — it cannot have lost to anyone else, because if it had lost to some element X≠maximum, then X would have beaten both the second-largest AND, eventually, lost to the maximum itself, meaning X sits strictly between the second-largest and the maximum in value, contradicting "second-largest" being the second-largest overall.
3. The second-largest element is therefore guaranteed to be found among the AT MOST ⌈log2 n⌉ elements the eventual maximum directly defeated during its climb through the bracket (one per round it played). Find the largest of this much smaller candidate set: ⌈log2 n⌉−1 more comparisons.
4. Total: (n−1) + (⌈log2 n⌉−1) = n + ⌈log2 n⌉ − 2.

KEY: All three of the minimum-comparison results in this section (max alone, min-and-max together, second-largest) share one method: identify which comparisons are FORCED (every non-winner must lose at least once) versus which information can be gotten "for free" as a byproduct of comparisons already made for another purpose (a tournament run to find the max simultaneously reveals a small candidate pool for the second-largest, at no extra comparisons). Recognising what a comparison already tells you, beyond its immediate yes/no answer, is the recurring trick in this whole family of questions.

MERGING two already-sorted arrays of sizes m and n takes at most m+n−1 comparisons in the worst case (derived in the divide-and-conquer chapter's merge-sort analysis: every comparison during a merge consumes at least one element from one of the two arrays, and the merge is complete once m+n−1 elements have been consumed this way, since the very last remaining element needs no further comparison — it is simply appended).

CHECKING IF AN ARRAY IS ALREADY SORTED needs n−1 comparisons in the worst case (and this many are also NECESSARY, not just sufficient — an adversary can always arrange for the very LAST comparison checked to be the one that reveals a violation, or for all n−1 to pass and confirm the array actually is sorted, so no algorithm can do this check in fewer than n−1 comparisons in the worst case): simply compare each adjacent pair a[i] and a[i+1] for i=0 to n−2, and report "not sorted" the moment any pair is found out of order (an early exit, exactly like the bubble-sort flag, that gives a best case of just 1 comparison if the very first pair happens to already be out of order).

LINEAR SEARCH

Scan an unsorted (or sorted — linear search does not require sortedness) array from the beginning, comparing each element against the target key, until either the target is found or the array is exhausted. Worst case n comparisons (target is the last element, or absent entirely). For a key that IS present, and assuming it is equally likely to be at any position, the AVERAGE number of comparisons is (n+1)/2 — derived directly: if the target is at position i (1-indexed, so i ranges 1 to n), finding it takes exactly i comparisons, and averaging i over all n equally-likely positions gives (1+2+...+n)/n = (n(n+1)/2)/n = (n+1)/2.

BINARY SEARCH, RECAPPED

[[FIG:binary-search-halving]]

Requires a SORTED array. Repeatedly compare the target against the middle element of the current search range; if equal, done; if the target is smaller, recurse into the left half; if larger, recurse into the right half — halving the search range with every comparison. Worst-case comparison count is exactly ⌊log2 n⌋ + 1 (derived in the divide-and-conquer chapter from the recurrence T(n) = T(n/2) + 1), and this is provably optimal among comparison-based searches of a sorted array by the identical decision-tree argument used above for sorting: an n-element array has n possible "positions" a target key could occupy (plus one more outcome for "not present"), so the search's decision tree needs at least n+1 leaves, giving a height of at least ⌈log2(n+1)⌉ — matching binary search's actual performance essentially exactly (up to the ⌊⌋ vs ⌈⌉ rounding convention), confirming no comparison-based search of a sorted array can reliably do better.

Trace binary search for the target 23 in the sorted array [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91], indices 0–10.

1. low=0, high=10, mid=⌊(0+10)/2⌋=5. a[5]=23. Target found immediately — comparison count 1. (Deliberately chosen so the first trace is trivial; retrace with a harder target to see the halving in action.)

Retrace for target 45, same array.
1. low=0, high=10, mid=5. a[5]=23. 45>23, so discard the left half entirely; set low=6, high=10.
2. low=6, high=10, mid=⌊(6+10)/2⌋=8. a[8]=56. 45<56, discard the right half; set low=6, high=7.
3. low=6, high=7, mid=⌊(6+7)/2⌋=6. a[6]=38. 45>38, discard the left half; set low=7, high=7.
4. low=7, high=7, mid=7. a[7]=45. Found — total 4 comparisons, matching ⌊log2 11⌋+1 = 3+1 = 4 exactly.

GATE TRAP: The two most common implementation bugs both come from the boundary update after a comparison. Using "mid" itself (rather than "mid−1" or "mid+1") as the new low or high after a non-matching comparison creates an infinite loop whenever the search range narrows to exactly two elements straddling mid — always discard mid itself once it has been checked and found not equal. And computing mid as (low+high)/2 in a language or context with fixed-width integers can silently overflow if low+high exceeds the integer range even when the true midpoint is perfectly valid; the safe form is low + (high−low)/2, which never lets the intermediate sum exceed high itself.

INTERPOLATION SEARCH improves on binary search when the data is not just sorted but also roughly UNIFORMLY distributed in value: instead of always probing the exact MIDDLE of the range, it probes at a position ESTIMATED by linear interpolation — proportionally where the target value "should" sit between the range's current low and high values, the same way a person flipping through a phone book jumps toward the back for a name starting with "S" rather than starting at the middle. On uniformly-distributed data this achieves an expected O(log log n) comparisons — asymptotically faster than binary search's O(log n) — but its WORST CASE, on badly skewed data (say, values clustered at one end with one wild outlier), degrades all the way to O(n), no better than linear search, because a bad interpolation guess can land far from any useful midpoint and barely shrink the search range at all.

EXPONENTIAL (GALLOPING) SEARCH is used when the array's size is unknown or effectively unbounded (searching within an infinite or unterminated stream): starting from position 1, repeatedly DOUBLE the probe position (1, 2, 4, 8, 16, ...) until either the target is found directly or a probed value is found to EXCEED the target, at which point the target (if present) must lie within the most recent doubling interval, and an ordinary binary search is run within just that bounded interval. This finds the correct doubling interval in O(log p) steps, where p is the actual position of the target, and the follow-up binary search within that interval of size O(p) costs a further O(log p), giving total O(log p) — which can be dramatically better than a binary search over the whole (potentially far larger, or entirely unknown) array size when the target happens to sit near the front.

JUMP SEARCH divides a sorted array into BLOCKS of a fixed size s, first jumping block by block (checking only the last element of each block) until a block is found whose last element is ≥ the target, then performing an ordinary LINEAR scan within just that one block. The optimal block size, derived by balancing the two costs against each other, is s = √n: the number of block-jumps needed is at most n/s, and the subsequent linear scan within one block costs at most s, giving total cost n/s + s; minimising this sum over s (by calculus, or by the AM-GM inequality, which says a sum of two positive terms with a fixed product is minimised when the two terms are EQUAL) occurs exactly when n/s = s, i.e. s = √n, giving a total worst-case cost of √n + √n = 2√n = Θ(√n).

TERNARY SEARCH splits the current search range into THREE parts at each step (using two probe points instead of binary search's one) rather than two. Despite sounding like it should be faster for dividing the range into more pieces per step, it actually makes MORE comparisons overall than binary search: ternary search needs roughly 2 log3 n comparisons (two comparisons per step, and log3 n steps to shrink the range by a factor of 3 each time down to size 1), while binary search needs only log2 n (one comparison per step). Numerically, 2 log3 n ≈ 2 × 0.631 × log2 n ≈ 1.26 log2 n — MORE than binary search's plain log2 n, despite ternary search doing 3-way division instead of 2-way, because it pays for two comparisons per step rather than binary search's one, and that extra per-step cost outweighs the benefit of the faster-shrinking range.

SEARCHING A ROTATED SORTED ARRAY (an array that was sorted and then cyclically shifted by some unknown amount, e.g. [4,5,6,7,0,1,2], originally [0,1,2,4,5,6,7] rotated left by 4) can still be searched in O(log n) with a modified binary search: at each step, after computing mid, at least ONE of the two halves (left of mid, or right of mid) is guaranteed to still be entirely, ordinarily sorted (the rotation point can only fall within one of the two halves, never split evenly across both in a way that corrupts both simultaneously) — determine WHICH half is the properly-sorted one by comparing the endpoints of each half, then check whether the target falls within that sorted half's known value range; if it does, recurse into that half normally, and if it does not, the target (if present at all) must be in the other, still-rotated half, so recurse there instead, applying the same "identify the sorted half" logic again at the next level.

SELECTION, RECAPPED. Finding the k-th smallest element of an unsorted array (the SELECTION problem) can be solved in EXPECTED O(n) time via QUICKSELECT (partition once, as in quicksort, and recurse into only the ONE side that must contain the k-th element, discarding the other side entirely rather than recursing into both as full quicksort would) — full derivation of the expected-O(n) result via the geometric-series argument is in the divide-and-conquer chapter. A DETERMINISTIC O(n) worst-case algorithm also exists (MEDIAN-OF-MEDIANS, selecting a guaranteed-good pivot in groups of 5, likewise fully derived in the divide-and-conquer chapter) — the two are not the same algorithm and the deterministic version has a larger constant factor, which is exactly why quickselect (expected-case) is generally preferred in practice despite its worse theoretical worst case.

HASHING AS THE O(1) ALTERNATIVE

None of the search methods above beat O(log n) for a static, comparison-accessible structure — but HASHING achieves expected O(1) lookup by abandoning comparison and ordering entirely, mapping each key directly to a table slot via a hash function. This trades away the ability to efficiently answer range or "next largest" queries (which searching a sorted array or a balanced tree handles naturally) in exchange for near-constant-time exact lookup. The full mechanics — hash functions, collision resolution by chaining and by open addressing, load factor, and the expected-cost derivations — are covered in their own chapter.

WORKED PROBLEMS

1. ARRAY AFTER TWO PASSES OF THREE ALGORITHMS. Given [6, 3, 9, 2, 7], the traces above give: bubble sort after 2 passes → [3, 2, 6, 7, 9]; selection sort after 2 passes → [2, 3, 9, 6, 7]; insertion sort after 2 passes → [3, 6, 9, 2, 7]. All three differ, confirming that per-pass behaviour, not just eventual output, distinguishes the algorithms.

2. INVERSION COUNT. Count the inversions in [3, 1, 4, 1, 5, 9, 2, 6] directly (with ties — equal values — never counted as inversions, since an inversion requires a strict a[i]>a[j]). Checking every pair systematically by left index: from index 0 (value 3): (3,1) at (0,1) inverted; (3,1) at (0,3) inverted; (3,2) at (0,6) inverted. From index 2 (value 4): (4,1) at (2,3) inverted; (4,2) at (2,6) inverted. From index 4 (value 5): (5,2) at (4,6) inverted. From index 5 (value 9): (9,2) at (5,6) inverted; (9,6) at (5,7) inverted. (Indices 1 and 3 both hold value 1, an equal pair, not an inversion.) That is 8 inversions total — a deliberately included reminder that a systematic index-by-index sweep, checking every element against every later one, is safer than an ad hoc scan, which is exactly the kind of pass that drops a pair like (0,3) above by eye.

3. COUNTING SORT TRACE. Sort [4, 2, 2, 8, 3, 3, 1] with counting sort, range [0,8]. Build COUNT: index 0:0, 1:1, 2:2, 3:2, 4:1, 5:0, 6:0, 7:0, 8:1. Prefix-sum COUNT: 0,1,3,5,6,6,6,6,7 (each entry is the running total, so COUNT[v] after prefix-summing tells you how many elements are ≤ v). Scan the input RIGHT TO LEFT for stable placement: rightmost element is 1 (original index 6); COUNT[1]=1, place at output index 0, decrement COUNT[1] to 0. Next (index 5) is 3; COUNT[3]=5, place at output index 4, decrement to 4. Next (index 4) is 3; COUNT[3]=4, place at output index 3, decrement to 3. Next (index 3) is 8; COUNT[8]=7, place at output index 6, decrement to 6. Next (index 2) is 2; COUNT[2]=3, place at output index 2, decrement to 2. Next (index 1) is 2; COUNT[2]=2, place at output index 1, decrement to 1. Next (index 0) is 4; COUNT[4]=6, place at output index 5, decrement to 5. Final output array, reading placed positions 0 through 6: [1, 2, 2, 3, 3, 4, 8] — correctly sorted.

4. RADIX SORT OVER THREE DIGITS. Already fully traced above on [329, 457, 657, 839, 436, 720, 355], reaching the sorted result [329, 355, 436, 457, 657, 720, 839] after three LSD passes.

5. STABLE-VS-UNSTABLE IDENTIFICATION. Original array (by key, with a subscript marking two records that share key 5): [5ₐ, 3, 5_b, 1]. After one sorting operation the array reads [1, 3, 5ₐ, 5_b]. Is this consistent with a stable sort having been used? Yes — 5ₐ still precedes 5_b, matching their original relative order, which is exactly what stability guarantees and is consistent with (though not exclusive proof of) a stable algorithm. If instead the result had read [1, 3, 5_b, 5ₐ] (order of the tied pair reversed), that result could ONLY have come from an unstable algorithm, since no stable sort can ever produce it from this input.

6. DECISION-TREE LOWER BOUND FOR n=4. Compute the minimum possible worst-case comparisons for sorting 4 elements. n! = 4! = 24 possible orderings, so the decision tree needs at least 24 leaves; height h must satisfy 2^h ≥ 24, and since 2⁴=16 < 24 ≤ 32=2⁵, the minimum height is h=5 — so NO comparison sort can guarantee sorting 4 elements correctly in fewer than 5 comparisons in the worst case, even though ⌈log2 24⌉=5 might look close to "4 elements, 4ish comparisons" at a glance; the true bound (5) is one more than that naive guess, and this rounding-up step (checking 2⁴ vs 24 vs 2⁵ explicitly, not just computing a fractional log and rounding) is exactly where a careless answer goes wrong.

7. MINIMUM-COMPARISONS QUESTION. Find both the maximum AND the minimum of 12 elements using the pairing method. ⌈3n/2⌉−2 with n=12: ⌈36/2⌉−2 = 18−2 = 16 comparisons. Verify against the method directly: pair up 12 elements into 6 pairs, 6 comparisons to find each pair's winner and loser; then 5 more comparisons among the 6 winners to find the overall maximum (5 = 6−1, a simple linear scan for the max of 6 candidates); then 5 more comparisons among the 6 losers to find the overall minimum. Total: 6+5+5=16, matching the formula exactly.

8. CHOOSING AN ALGORITHM FOR A SCENARIO. A system receives a mostly-sorted log file every hour, with only a handful of new entries needing to be inserted near the correct position among millions of already-sorted existing entries; which sort, and why? Insertion sort — not because it has a good worst-case order (it does not, Θ(n²) in general), but because this specific workload is exactly its strongest case: the array is already almost entirely sorted, so the number of inversions is tiny (bounded by the small number of newly-added, out-of-place entries), and insertion sort's actual cost is Θ(n + inversions), which collapses to nearly Θ(n) here — dramatically cheaper than paying for a full Θ(n log n) merge sort or quicksort that would re-examine and re-shuffle the entire array regardless of how little of it actually needed to move, ignoring the existing order that insertion sort exploits directly.
`
};
