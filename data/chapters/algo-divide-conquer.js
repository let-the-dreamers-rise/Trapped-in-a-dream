// Textbook chapter: Divide and Conquer.
//
// Full teaching text for the topic, written to be read by someone who has never
// met the subject, in the order a good book (CLRS ch. 2, 4, 7, 9, 33.4) would
// teach it, with every claim derived or demonstrated rather than stated. The
// short summaries in data/questions/algo.js remain as reference cards; this is
// the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — mergesort-tree and quicksort-partition already
// exist on this topic's figure list (data/questions/algo.js), so they are placed
// by id here without being redefined.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['algo-divide-conquer'] = {
  figs: [],
  text: `
WHAT THIS CHAPTER IS FOR

You already know, from the asymptotic-analysis chapter, how to describe how fast an algorithm is once you have one. This chapter is about a way of *building* algorithms: take a problem, cut it into smaller copies of the same problem, solve the small copies, and stitch the answers back together. That is all divide and conquer is. It sounds almost too simple to be a method, but merge sort, quicksort, binary search, Strassen's matrix multiplication and a dozen other cornerstone algorithms are all instances of exactly this one idea, differing only in how they cut and how they stitch.

The reason this deserves a whole chapter is that "cut and stitch" turns directly into a recurrence relation, and the recurrence is where the running time comes from. If you can identify how a problem of size n is cut into pieces and how those pieces are stitched back, you can write down the recurrence without having to time the program. This chapter builds that skill on the algorithms GATE actually asks about, and it is also the natural bridge into the next major idea: when the pieces you cut a problem into are not independent — when they overlap — divide and conquer stops working well, and dynamic programming, the next topic, is what replaces it.

THE DIVIDE AND CONQUER PARADIGM

Every divide-and-conquer algorithm has exactly three steps, done in this order.

1. DIVIDE. Split the problem instance of size n into a number of smaller instances of the *same* problem — typically a of them, each roughly n/b in size.

2. CONQUER. Solve each smaller instance, recursively, by the same algorithm. This is the recursive call. It stops when the instance is small enough to solve directly — the base case.

3. COMBINE. Take the solutions to the pieces and merge them into a solution for the original instance of size n.

Nothing here is specific to sorting or to arrays. It works whenever a problem has the property that a solution to the whole can be assembled from solutions to independent parts of the same kind. "Independent" is the load-bearing word, and we will come back to it at the end of the chapter, because it is exactly the property that fails when divide and conquer stops being the right tool.

KEY: Divide and conquer is not "recursion". Recursion is any function that calls itself. Divide and conquer is the specific *pattern* of splitting into independent same-type subproblems, solving each recursively, and combining — a design strategy that recursion happens to implement.

WRITING DOWN THE RECURRENCE

Because the conquer step calls the same algorithm on smaller inputs, the running time T(n) is defined in terms of itself at smaller sizes — a recurrence. The general shape, for every algorithm in this chapter, is

T(n) = a T(n/b) + f(n)

Read the three symbols as answers to three questions about the divide and combine steps. a is: how many subproblems does the divide step create? b is: by what factor does each subproblem shrink (a subproblem of size n/b)? f(n) is: how much work do the divide and combine steps themselves cost, at this level, ignoring the recursive calls — extracting the pieces, and stitching the sub-answers together.

Get comfortable reading an algorithm and answering those three questions, because it is the single skill this whole topic rests on. Look at merge sort: it splits one array into 2 halves (a = 2), each half has size n/2 (b = 2), and the merge step that stitches two sorted halves back together costs Theta(n) (f(n) = n). So T(n) = 2T(n/2) + Theta(n). Binary search: it produces exactly 1 subproblem (a = 1) of size n/2 (b = 2), and deciding which half to keep costs Theta(1) (f(n) = 1) — one comparison. So T(n) = T(n/2) + Theta(1). Every algorithm below gets the same treatment: identify a, b, f(n), then either recognise the recurrence's shape from the asymptotic-analysis chapter's Master theorem or, when the pieces are unequal, unroll a recursion tree by hand.

REMEMBER: a is "how many calls", b is "how much smaller each call's input is", f(n) is "the cost of everything in this call except the recursive calls themselves". Misreading any one of the three gives the wrong recurrence even when the algorithm is understood correctly.

BINARY SEARCH: THE SIMPLEST CASE

Binary search is the smallest possible divide-and-conquer algorithm, and it is worth starting here because every idea in the chapter — the recurrence, the invariant that makes the algorithm correct, the exact worst-case count, the argument that nothing comparison-based can beat it — shows up in miniature and without the clutter of a full sort.

The setup: a sorted array A[0..n-1] and a target key. Look at the middle element. If it equals the key, you are done. If the key is smaller, the entire right half — including the middle element — can be discarded, because the array is sorted and everything from the middle onward is at least as large as the middle. If the key is larger, discard the left half symmetrically. Either way, one comparison eliminates about half the array, and you recurse on what remains.

THE LOOP INVARIANT AND THE OFF-BY-ONE TRAPS

State the algorithm precisely, because binary search is exactly where off-by-one mistakes live.

low = 0, high = n - 1
while low <= high:
    mid = low + (high - low) / 2
    if A[mid] == target: return mid
    else if A[mid] < target: low = mid + 1
    else: high = mid - 1
return "not found"

The loop invariant — the fact that stays true every time the while condition is checked — is: if the target is present in the array at all, it lies within A[low..high]. It is true at the start (low=0, high=n-1 is the whole array). Each iteration either finds the target or narrows [low, high] while preserving the property that the target, if present, is still inside — because the half that gets discarded is exactly the half that has been proven, by the comparison, not to contain it. When low > high, the invariant says the target cannot be present anywhere, because [low, high] is empty — that is precisely why "not found" is correct at that point, not a guess.

Three specific mistakes come from getting these mechanics wrong.

Mid computation. mid = (low + high) / 2 is the formula you'll see in most textbooks, and it is correct in ordinary use, but low + high can, in a language with fixed-width integers and a huge array, overflow before the division happens. mid = low + (high - low) / 2 computes the identical value without ever adding two numbers that could individually be near the maximum representable value. GATE occasionally asks which form is safe against overflow; the answer is the second, and the reason is that it never forms the sum low + high at all.

Loop condition: low <= high, not low < high. If you use low < high, the case low == high — exactly one candidate element remaining — never gets examined, and a target sitting at that final position is reported "not found" even though it is there. Trace it: array [5], target 5, low=0, high=0. With low < high the loop body never runs, and you return "not found" for an element that is sitting right there.

Update rule: after a "too small" or "too large" verdict, the update must strictly exclude mid — low = mid + 1 or high = mid - 1, never low = mid or high = mid. If you write low = mid after A[mid] < target, and low and high are ever equal to mid at the same time (which happens once the range narrows to two elements with mid computed as the lower of the two), the range never shrinks and the loop runs forever.

GATE TRAP: A binary search question that traces code line by line is testing exactly these three things — the mid formula, the loop condition, and the update rule — not your understanding of the algorithm's idea. Read the exact code given, do not substitute the version you have memorised; a single < where the code has <= changes the answer.

HOW GOOD IS BINARY SEARCH? THE DECISION-TREE ARGUMENT

Binary search's recurrence is T(n) = T(n/2) + Theta(1). Each call does one comparison and recurses into a range about half the size, so if you count exactly, the number of comparisons in the worst case, W(n), satisfies W(n) = W(floor(n/2)) + 1 with W(0) = 0 (empty range, no more comparisons possible) and W(1) = 1 (one comparison decides it).

Unroll this by hand for a concrete size before trusting the formula. n = 10: W(10) = W(5) + 1. W(5) = W(2) + 1. W(2) = W(1) + 1 = 1 + 1 = 2. So W(5) = 2 + 1 = 3, and W(10) = 3 + 1 = 4. Check this against a trace of the array [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]: searching for 72 (0-indexed, mid = floor((low+high)/2)) goes mid=4 (value 16, too small, low=5), mid=7 (value 45, too small, low=8), mid=8 (value 56, too small, low=9), mid=9 (value 72, found) — exactly 4 comparisons, matching W(10) = 4.

The closed form is

W(n) = floor(log_2 n) + 1

Verify it against the same n = 10: log_2 10 is about 3.32, floor gives 3, plus 1 is 4 — matches the trace. The intuition for the formula: after k comparisons the range that could still contain the target has shrunk to at most ceil(n / 2^k) elements, and the search terminates (with success or the honest conclusion "absent") once that shrinks to a single element or below, which first happens at k = floor(log_2 n) + 1.

Is this the best any comparison-based search can do? Yes, and the argument is worth seeing because it is a template used elsewhere in the syllabus (sorting lower bounds use the identical idea). Any algorithm that decides "found at position i" or "absent" purely by comparing the target against array elements can be drawn as a binary decision tree: each internal node is one comparison, each of its two children is what happens for the two outcomes, and each leaf is a final answer. A sorted array of n distinct elements has n possible "found" answers plus at least 1 "absent" outcome, so the tree needs at least n + 1 leaves. A binary tree with depth d has at most 2^d leaves, so 2^d >= n + 1, giving d >= log_2(n + 1). Since d must be a whole number of comparisons, the worst case needs at least ceil(log_2(n+1)) comparisons — and floor(log_2 n) + 1 is exactly that value written the other way. Binary search achieves this bound exactly, so no comparison-based search on a sorted array can beat it asymptotically, and in fact none can beat it even by a constant on the worst case.

KEY: Binary search is not merely "fast" — it is provably optimal among comparison-based searches, because any such search corresponds to a binary decision tree, and a tree that must distinguish n + 1 outcomes needs at least log_2(n+1) levels no matter how cleverly the comparisons are chosen.

MERGE SORT

Binary search recurses into one half and throws the other away. Merge sort is the natural next algorithm: recurse into *both* halves, and instead of throwing work away, combine the two sorted answers into one.

Divide: split the array into two halves, roughly n/2 elements each (an exact index split; for odd n one half gets one more element than the other). Conquer: sort each half recursively, by the same algorithm — the base case is an array of 0 or 1 elements, which is trivially already sorted. Combine: merge the two now-sorted halves into a single sorted array.

[[FIG:mergesort-tree]]

Because the split is always exactly in half, *regardless of what the data actually looks like*, a = 2 and b = 2 no matter the input. The combine step — merging — is the only place data-dependent behaviour can enter, and even there, as the next section shows, the running *time* stays Theta(n) for the merge itself; only the *comparison count* varies with the data.

THE MERGE PROCEDURE, EXACTLY

Merging two already-sorted arrays L (size m) and R (size n) into one sorted array of size m + n: keep two pointers, one into each array, both starting at the front. Repeatedly compare the two elements currently pointed to, copy the smaller one into the output, and advance that array's pointer. When one array runs out, copy the remainder of the other array directly — no more comparisons are needed once one side is exhausted, because everything left in the surviving array is already known to be larger than everything already output.

Every comparison outputs exactly one element, so the number of comparisons is at most the number of elements output before one side empties. This gives two exact bounds, and it is worth deriving both rather than memorising them.

Worst case: m + n - 1. This happens when the two arrays interleave all the way to the very end — element from L, then R, then L, then R, and so on — so that comparisons keep firing until only the single last element (from whichever array is one step behind) remains, and that final element is copied with no comparison at all. Trace merging (1, 3, 5) with (2, 4, 6): compare 1,2 → take 1; compare 3,2 → take 2; compare 3,4 → take 3; compare 5,4 → take 4; compare 5,6 → take 5; then 6 remains alone and is copied — 5 comparisons, and 5 = 3 + 3 - 1.

Best case: min(m, n). This happens when one entire array precedes the other in value — every element of the shorter array is smaller than the first element of the longer one. Then each comparison in turn confirms "yes, take from the shorter array", the shorter array empties after exactly min(m,n) comparisons, and the rest of the longer array is appended with zero further comparisons.

merge comparisons: min(m, n)  <=  actual  <=  m + n - 1

GATE TRAP: "Merge sort's worst case is Theta(n^2)" is quicksort's fact leaking into the wrong algorithm. Merge sort's running time is Theta(n log n) in the best, average, *and* worst case, because the split is always exactly in half no matter what the data is. What genuinely varies with the data is the *comparison count within a merge step* (between min(m,n) and m+n-1), not the asymptotic running time of the sort as a whole — copying elements still costs Theta(n) per merge even on the cheap end.

THE RECURSION TREE, SUMMED

To get the overall running time, draw the recursion tree for T(n) = 2T(n/2) + Theta(n) and sum level by level, because this is the derivation the Master theorem is shorthand for.

1. At the top (level 0), there is 1 problem of size n, doing Theta(n) merge work. Call this cost n (absorbing the constant).

2. At level 1, there are 2 subproblems, each of size n/2, each doing Theta(n/2) work at its own combine step: total 2 * (n/2) = n.

3. At level 2, there are 4 subproblems of size n/4, each costing n/4: total 4 * (n/4) = n.

4. In general, level k has 2^k subproblems of size n/2^k, each costing n/2^k: total 2^k * (n / 2^k) = n, for every level.

5. The recursion bottoms out when the subproblem size reaches 1, i.e. when n / 2^k = 1, i.e. k = log_2 n. So there are log_2 n + 1 levels (level 0 through level log_2 n), and every one of them costs exactly n.

6. Total cost = n * (log_2 n + 1) = Theta(n log n).

Every level costing exactly n is the special feature of a perfectly-balanced split with linear combine cost, and it is why this recurrence is so clean: the depth is log_2 n and each level's total work is independent of the level. This is Master theorem Case 2 (a = 2, b = 2 gives the watershed n^(log_2 2) = n^1, which matches f(n) = Theta(n) exactly, contributing the extra log n factor).

STABILITY, SPACE, AND THE BOTTOM-UP VERSION

Merge sort is stable — two equal elements keep their original relative order — provided the merge step, on a tie, always takes from the left half first. Since the left half consists of elements that were, in the original array, entirely to the left of the right half's elements, always breaking ties in the left half's favour means an element never hops over an equal element that was originally ahead of it. Change that one rule (take from the right half on a tie) and stability is lost, even though the sort is still correct.

Merge sort is not in-place. Merging two sorted arrays into one sorted array, using only the comparison-and-copy procedure above, needs a separate output buffer of size m + n, because you cannot safely overwrite either input array mid-merge without risking clobbering an element you have not yet read. Standard merge sort therefore uses Theta(n) auxiliary space for the buffer, plus Theta(log n) for the recursion stack (the maximum recursion depth, since each level halves the size). In-place merging algorithms exist but are significantly slower in practice and are not what "merge sort" means by default.

The recursive description above is top-down: split first, sort, then merge on the way back up. An equivalent bottom-up (iterative) version skips the recursion entirely. Start by treating the array as n runs of size 1 (each single element is trivially sorted). Merge adjacent runs of size 1 into sorted runs of size 2. Then merge adjacent runs of size 2 into runs of size 4. Continue doubling the run size until it reaches or exceeds n. This needs no recursion stack at all — just a loop over run-size (1, 2, 4, 8, ...) and, inside it, a loop merging adjacent pairs of runs — and does exactly the same total work as the recursive version, because it performs the identical set of merges, just built from the bottom instead of unwound from the top.

KEY: Merge sort's Theta(n log n) comes from two independent facts working together: the split is always exactly balanced (so there are exactly log n levels), and the combine (merge) step is linear (so every level costs exactly n). Change either fact — an unbalanced split, or a combine step costlier than linear — and the total changes.

COUNTING INVERSIONS WITH MERGE SORT

An inversion in an array is a pair of positions i < j with A[i] > A[j] — a pair that is "out of order" relative to each other. Inversions measure how far an array is from sorted: a sorted array has zero, and a reverse-sorted array of n elements has the maximum possible, n(n-1)/2, since every one of the n choose 2 pairs is out of order.

Counting inversions by brute force — check every pair — costs Theta(n^2). Merge sort counts them in Theta(n log n) with a small addition to the merge step: whenever the algorithm takes an element from the *right* half while elements still remain in the *left* half, that one right-half element forms an inversion with *every* element still waiting in the left half (since everything left in the left half is, by the recursive sorting, smaller than everything in the left half already output but is being compared now against a smaller right-half element that is jumping ahead of all of them). So each such "take from right" step adds (number of elements still remaining in the left half) to a running inversion count, and inversions entirely within one half are, in turn, counted by that half's own recursive call.

Trace this fully on A = [8, 3, 5, 1, 9, 2, 7, 4].

1. Merge [8] and [3]: taking 3 while 8 remains in the left → +1 inversion.
2. Merge [5] and [1]: taking 1 while 5 remains → +1 inversion.
3. Merge [9] and [2]: taking 2 while 9 remains → +1 inversion.
4. Merge [7] and [4]: taking 4 while 7 remains → +1 inversion.
   Subtotal after level 1: 4. Sorted runs so far: [3,8], [1,5], [2,9], [4,7].
5. Merge [3,8] with [1,5]: take 1 (right, left still has 3,8 waiting) → +2; take 3 (left); take 5 (right, left still has 8 waiting) → +1; take 8 (left, right now empty). Subtotal: 3.
6. Merge [2,9] with [4,7]: take 2 (left); take 4 (right, left still has 9 waiting) → +1; take 7 (right, left still has 9 waiting) → +1; take 9 (left). Subtotal: 2.
   Running total after level 2: 4 + 3 + 2 = 9. Sorted runs: [1,3,5,8], [2,4,7,9].
7. Merge [1,3,5,8] with [2,4,7,9]: take 1 (left); take 2 (right, left still has 3,5,8 waiting) → +3; take 3 (left); take 4 (right, left still has 5,8 waiting) → +2; take 5 (left); take 7 (right, left still has 8 waiting) → +1; take 8 (left); take 9 (right, left now empty) → +0. Subtotal: 6.

Grand total: 4 + 3 + 2 + 6 = 15 inversions. GATE TRAP: a single "take from the right" step can retire *several* inversions at once (one for every element still waiting in the left half) — the trap is counting only 1 inversion per merge step rather than the actual number of left elements still pending, which is exactly what makes the algorithm faster than pairwise checking: it charges a whole batch of inversions to one comparison.

MERGING K SORTED LISTS

A natural generalisation: instead of two sorted lists, you have k of them, holding n elements in total, and you want one sorted output. Two strategies, with different costs.

Pairwise merging: merge list 1 and list 2 into one list, then merge that result with list 3, then with list 4, and so on. If the lists are roughly equal size (n/k each), the first merge costs about 2n/k, the second about 3n/k, the third about 4n/k, and the last about kn/k = n. Summing, the total is roughly n/k * (2 + 3 + ... + k) = Theta(nk) in the worst case — quadratic in k for fixed total size n, because the accumulated result keeps getting re-scanned in full at every step.

Balanced (tournament) pairwise merging fixes this: merge the k lists in pairs first (k/2 merges, each of two size-n/k lists), then merge *those* results in pairs (k/4 merges of size 2n/k), and so on — exactly the merge-sort recursion tree, but starting from k sorted runs instead of k single elements. There are log_2 k levels, and every level does a total of Theta(n) work (the same "every level costs n" argument as ordinary merge sort), giving Theta(n log k) overall.

A heap-based k-way merge achieves the same bound directly: keep a min-heap of size k holding the current front element of each of the k lists (tagged with which list it came from). Repeatedly extract the minimum (Theta(log k)), output it, and insert the next element from that same list (Theta(log k)) to refill the heap. Every one of the n total elements is extracted once and inserted once, at Theta(log k) each, giving Theta(n log k) — matching the balanced pairwise approach, because both are really doing the same amount of comparison work, just organised differently (an explicit binary merge tree versus an implicit one inside the heap).

k-way merge of n total elements: Theta(nk) naive pairwise, Theta(n log k) balanced or heap-based

QUICKSORT

Merge sort does its hard work in the combine step and needs almost no cleverness in how it divides — split exactly in half and be done. Quicksort inverts this: all of the cleverness is in the divide step, and the combine step is free.

Pick an element of the (sub)array, called the pivot. Rearrange (partition) the array so every element less than the pivot ends up to its left and every element greater ends up to its right — the pivot itself lands at its final sorted position. Recurse on the left part and the right part separately. There is no combine step at all: once both sides are individually sorted, the whole array is sorted, because everything on the left is already known to be <= the pivot and everything on the right >= it.

[[FIG:quicksort-partition]]

Partitioning an n-element (sub)array takes Theta(n) time and, crucially, is done in place — it only swaps elements within the given bounds, using O(1) extra space per call. Two classic partition schemes are asked about, and they behave differently enough to be worth tracing separately.

THE LOMUTO PARTITION, TRACED

Lomuto partition fixes the pivot as the *last* element of the range. It scans the rest of the array once with a single index j, maintaining a second index i marking the boundary of "elements confirmed <= pivot seen so far"; whenever A[j] <= pivot, i is advanced and A[i] is swapped with A[j]. At the end, the pivot is swapped into position i+1, which is its correct final index.

low = -1... use i = low - 1
for j = low to high - 1:
    if A[j] <= pivot: i = i + 1; swap(A[i], A[j])
swap(A[i+1], A[high]); return i+1

Trace it on A = [8, 3, 5, 1, 9, 2, 7, 4], indices 0..7, pivot = A[7] = 4, i starts at -1.

1. j=0, A[0]=8: 8 <= 4? No.
2. j=1, A[1]=3: yes. i=0. Swap(A[0],A[1]): [3, 8, 5, 1, 9, 2, 7, 4].
3. j=2, A[2]=5: No.
4. j=3, A[3]=1: yes. i=1. Swap(A[1],A[3]): [3, 1, 5, 8, 9, 2, 7, 4].
5. j=4, A[4]=9: No.
6. j=5, A[5]=2: yes. i=2. Swap(A[2],A[5]): [3, 1, 2, 8, 9, 5, 7, 4].
7. j=6, A[6]=7: No.
8. Loop ends (7 comparisons made — j ran from 0 to 6, which is n-1 = 7 comparisons, exactly as many as there are non-pivot elements). Final placement: swap(A[3], A[7]): [3, 1, 2, 4, 9, 5, 7, 8].

The pivot 4 now sits at index 3, its correct final position: everything to its left (3, 1, 2) is <= 4, everything to its right (9, 5, 7, 8) is > 4. Neither side is internally sorted yet — that is what the recursive calls on [3,1,2] and [9,5,7,8] are for. Four swaps happened in total (three inside the loop plus the final placement swap).

KEY: Lomuto's comparison count is *always* exactly n - 1 for an n-element range, regardless of the data — every element except the pivot is compared to it exactly once. What the *data* controls is not how many comparisons happen, but how many swaps happen and, far more importantly, where the pivot ends up — which determines how balanced the two recursive calls are.

THE HOARE PARTITION, TRACED AND CONTRASTED

Hoare's original scheme uses the *first* element as pivot and two pointers that start at the two ends and walk toward each other: i moves right until it finds an element >= pivot, j moves left until it finds an element <= pivot, and if i is still left of j, those two elements are swapped (each is on the wrong side) and the scan resumes; once i and j meet or cross, the partition is done and j is returned as the split point.

Trace it on the same array A = [8, 3, 5, 1, 9, 2, 7, 4], pivot = A[0] = 8, i = -1, j = 8 initially (before the first increment/decrement).

1. Scan i rightward from -1: A[0]=8 >= 8 — stop immediately at i=0 (1 comparison).
   Scan j leftward from 8: A[7]=4 <= 8 — stop immediately at j=7 (1 comparison).
   i=0 < j=7: swap(A[0],A[7]): [4, 3, 5, 1, 9, 2, 7, 8].
2. Scan i from 1: A[1]=3 (no), A[2]=5 (no), A[3]=1 (no), A[4]=9 (yes) — stop at i=4 (4 comparisons).
   Scan j from 6: A[6]=7 <= 8 (yes) — stop at j=6 (1 comparison).
   i=4 < j=6: swap(A[4],A[6]): [4, 3, 5, 1, 7, 2, 9, 8].
3. Scan i from 5: A[5]=2 (no), A[6]=9 (yes) — stop at i=6 (2 comparisons).
   Scan j from 5: A[5]=2 <= 8 (yes) — stop at j=5 (1 comparison).
   Now i=6 >= j=5: stop, no swap, return j=5.

Final array: [4, 3, 5, 1, 7, 2, 9, 8], split point 5. Left range (indices 0..5): [4,3,5,1,7,2]. Right range (indices 6..7): [9,8]. Total comparisons: (1+1) + (4+1) + (2+1) = 10. Total swaps: 2.

Contrast the two directly on the same array. Lomuto used 7 comparisons and 4 swaps and placed the pivot (4) at its exact final sorted index. Hoare used 10 comparisons and only 2 swaps, and the original pivot value (8) does *not* land at any particular sorted position — it merely ends up somewhere in the right range. Hoare typically does about a third as many swaps as Lomuto on random data, because it only swaps a pair when *both* elements are strictly on the wrong side, whereas Lomuto swaps every single time it finds one more element on the correct side, including many swaps of an element with itself in effect. The trade is more bookkeeping comparisons for far less data movement — valuable when swaps (large records) are expensive relative to comparisons.

GATE TRAP: "Hoare partition places the pivot at its final sorted position" is a Lomuto fact wrongly attached to Hoare. Only Lomuto guarantees this. Hoare returns a split index, and elements equal to the pivot's original value may end up on either side of it.

QUICKSORT'S RECURRENCE: BEST, WORST, AVERAGE

Once a partition places the pivot at some index, the two recursive calls have sizes determined entirely by that index, so the recurrence depends on how balanced the split turns out to be.

Best case: every partition splits its range into two equal halves. T(n) = 2T(n/2) + Theta(n), identical in shape to merge sort's recurrence, and by the same recursion-tree summation (log n levels, each costing Theta(n)) this gives Theta(n log n).

Worst case: every partition is maximally unbalanced — the pivot always lands at one end, splitting n elements into sizes 0 and n-1. T(n) = T(n-1) + Theta(n). Unrolling: T(n) = Theta(n) + Theta(n-1) + Theta(n-2) + ... + Theta(1) = Theta(n + (n-1) + ... + 1) = Theta(n^2), an arithmetic series. This is triggered, with a fixed first-element or last-element pivot, by an already-sorted array (the pivot is always the extreme value of whatever remains), by a reverse-sorted array, and — for Lomuto specifically — by an array of all-equal elements, where every comparison A[j] <= pivot is true and the "less than" side swallows everything, giving the same lopsided 0-and-(n-1) split at every level.

Average case: over a random ordering of distinct elements (equivalently, with a uniformly random pivot choice at every step), the expected number of comparisons can be derived exactly, and the derivation is worth following because it explains *why* Theta(n log n) survives even though Theta(n^2) is always possible.

Label the elements by their sorted rank, z_1 < z_2 < ... < z_n. Any two elements z_i and z_j (i < j) are compared at most once in the whole run of quicksort — once one of them is chosen as a pivot, they are either compared to each other right then, or one of them ends up strictly separated from the other by some intervening pivot value and they are *never* compared again. So z_i and z_j are compared exactly when one of them is the *first*, among the set {z_i, z_i+1, ..., z_j} of j - i + 1 elements, to be chosen as a pivot. With every element in that set equally likely to be first, the probability is 2 / (j - i + 1) (there are 2 "good" elements — z_i and z_j themselves — out of j-i+1 candidates). The expected total comparisons is therefore the sum of this probability over every pair:

E[comparisons] = Sigma over all pairs i<j of  2 / (j - i + 1)

Grouping by the gap k = j - i (which ranges from 1 to n-1, and for each gap there are about n - k pairs), this sum is approximately 2n times the harmonic sum 1 + 1/2 + 1/3 + ... + 1/n, which is 2n ln n. Since ln n = log_2(n) * ln 2, and ln 2 is about 0.693,

E[comparisons] ~ 2n ln n ~ 1.39 n log_2 n

So the average case is Theta(n log n) with a constant close to but slightly worse than merge sort's exact-comparison figure — a genuinely derived number, not a guess, coming directly from "each pair is compared with probability 2/(gap+1)".

REMEMBER: Best case Theta(n log n) via balanced splits, worst case Theta(n^2) via maximally lopsided splits (sorted/reverse-sorted input with an endpoint pivot, or all-equal input with Lomuto), average case Theta(n log n) with constant about 1.39, derived from the probability that any two elements are ever compared at all.

TAMING THE WORST CASE: RANDOMIZATION, MEDIAN-OF-THREE, THREE-WAY PARTITION

The worst case above is triggered by specific, predictable inputs relative to a *fixed* pivot rule (always first, always last). Randomised quicksort picks the pivot uniformly at random (or, equivalently, shuffles the array once before sorting) at every partition step. This does not remove the Theta(n^2) worst case in an absolute sense — it is still theoretically possible for every random choice to happen to be unlucky — but it removes the *dependency on the input*. No fixed array can force bad behaviour anymore, because the bad behaviour would have to come from an astronomically unlikely sequence of random pivot choices, not from how the input was arranged. The expected running time becomes Theta(n log n) for every input, adversary included, which is a strictly stronger guarantee than "average case over random inputs with a fixed pivot rule".

Median-of-three picks the pivot as the median of the first, middle and last elements of the current range, rather than a fixed position. This is cheap (2-3 comparisons) and specifically defeats the classic sorted/reverse-sorted worst case for a fixed-endpoint pivot, because on sorted data the median of three well-spread positions is a much more central value than either endpoint — though an adversary who knows the rule can still construct a bad input for it, which randomisation, by not committing to any fixed rule at all, avoids.

Three-way (Dutch national flag) partitioning handles the specific weakness of Lomuto on many duplicate keys. Standard two-way partitioning treats "equal to pivot" as belonging to one side (typically the "not less than" side), so an array of all-equal elements degenerates to the 0-and-(n-1) worst case at every level. Three-way partitioning instead splits the range into three zones in one pass — elements less than the pivot, elements equal to it, and elements greater — using three pointers (lt, i, gt): elements equal to the pivot are placed in the middle and *excluded from both recursive calls*. On an array of all-equal elements, this makes the "equal" zone the entire array and both recursive calls operate on empty ranges — Theta(n) total, not Theta(n^2).

WHY QUICKSORT IS NOT STABLE, AND WHY IT NEEDS ONLY O(log n) STACK

Quicksort is not stable. Partitioning routinely swaps an element past one or more equal elements to get it to the correct side — Lomuto's own trace above swapped elements around freely with no regard to which of two equal keys came first in the input — so two equal elements can and do end up in the opposite relative order from where they started. This is a structural fact about swapping elements across a distance, not a fixable implementation detail without abandoning in-place partitioning.

Quicksort's recursion depth, if you always recurse on both sides in the natural way, can be as bad as Theta(n) in the worst case — an unbalanced split at every level means one recursive call always covers almost the entire remaining array, and the call stack grows one frame per level, n levels deep. The fix is a simple discipline: after partitioning, explicitly recurse only into the *smaller* of the two sides, and handle the larger side with a loop (a tail call, updating the same stack frame's bounds instead of pushing a new one) rather than a second recursive call. Because the recursed-into side is, by construction, at most half of whatever remained, the stack depth is bounded by the number of times something can be halved — O(log n) — no matter how unbalanced the partitions themselves are. This is a bookkeeping trick with zero effect on the number of comparisons or the asymptotic time; it only bounds the *memory* the recursion itself consumes.

Quicksort's in-place property follows from the partition step needing no auxiliary array (only O(1) extra variables per call, swaps happening within the given bounds) — the only extra space is the recursion stack, which the tail-recursion trick above bounds to O(log n).

THE NUMBER OF COMPARISONS QUICKSORT MAKES ON A SPECIFIC ARRAY

Two worked traces, because this is the question type GATE asks most often about quicksort, and the method is to sum (subarray size - 1) over every partition call actually made — not to plug into an asymptotic formula.

Array A = [5, 3, 8, 4, 1, 9, 7] (n = 7), Lomuto partition, pivot = last element of each range.

1. Partition [5,3,8,4,1,9,7], pivot=7: compare 5,3,8,4,1,9 against 7 — 6 comparisons (n-1=6). Result: pivot lands at index 4, giving [5,3,4,1,7,9,8]. Left range [5,3,4,1] (size 4), right range [9,8] (size 2).
2. Partition [5,3,4,1], pivot=1: compare 5,3,4 against 1 — 3 comparisons. None is <= 1, so the pivot swaps to the front: [1,3,4,5]. Left range empty, right range [3,4,5] (size 3).
3. Partition [3,4,5], pivot=5: compare 3,4 against 5 — 2 comparisons, both <=5. Result unchanged: [3,4,5]. Left range [3,4] (size 2), right range empty.
4. Partition [3,4], pivot=4: compare 3 against 4 — 1 comparison. Left range [3] (size 1, base case), right range empty.
5. Partition [9,8], pivot=8: compare 9 against 8 — 1 comparison. 9 is not <= 8, so pivot swaps to front: [8,9]. Both sides empty or size 1.

Total comparisons: 6 + 3 + 2 + 1 + 1 = 13. Final array [1,3,4,5,7,8,9] — correctly sorted.

Second trace: the worst case made concrete. Array A = [1, 2, 3, 4, 5, 6, 7] (already sorted, n = 7), pivot = *first* element of each range (a deliberately bad rule on this deliberately bad input).

Partitioning [1,2,3,4,5,6,7] with pivot 1: every other element (2..7) is compared against 1 and found greater, so the "less than" side is empty and the pivot sits alone at the front — 6 comparisons, recurse into [2,3,4,5,6,7] (size 6). The same happens at every level: partitioning a range of size m with the smallest element as pivot costs m - 1 comparisons and leaves a range of size m - 1. Comparisons: 6 + 5 + 4 + 3 + 2 + 1 = 21 = 7*6/2, matching n(n-1)/2 for n = 7 exactly — the Theta(n^2) worst case realised on the smallest instructive size.

MEDIAN-OF-MEDIANS RECURRENCE JUSTIFICATION

SELECTION: FINDING THE K-TH SMALLEST

A related problem: given an unsorted array, find just the k-th smallest element, without fully sorting. Sorting and then indexing would cost Theta(n log n); selection can do better.

Quickselect reuses quicksort's partition step. Partition the array around a pivot exactly as in quicksort, getting a split index p. If p equals the target rank k, the pivot itself is the answer. If k < p, the answer lies in the left part, so recurse *only* into the left part — the right part is discarded entirely, unlike quicksort, which must process both sides. If k > p, recurse only into the right part (adjusting k accordingly).

Because only one side is ever recursed into, the recurrence has a single term instead of two: with a random pivot, the expected subproblem size shrinks by a constant fraction at each level (informally, about 3/4 of the array remains on average after discarding a random amount from one end), giving T(n) = T(3n/4) + Theta(n) in expectation. Summing this as a geometric series — n + 3n/4 + (3/4)^2 n + ... — the terms shrink geometrically and the whole sum is bounded by a constant multiple of n, giving expected Theta(n): quickselect finds any rank in linear time on average, without fully sorting.

The worst case mirrors quicksort's exactly, for the same reason: a consistently bad pivot (always the current minimum or maximum) makes each partition discard only one element, giving T(n) = T(n-1) + Theta(n) = Theta(n^2).

MEDIAN OF MEDIANS: A GUARANTEED LINEAR-TIME PIVOT

Randomised quickselect is fast in expectation but still has a bad worst case. A pivot rule that provably avoids very unbalanced splits, *every* time, removes the Theta(n^2) worst case entirely — at the cost of a larger constant factor. This is median-of-medians selection.

1. Split the n elements into groups of 5 (the last group may have fewer).
2. Find the median of each group directly (sorting 5 elements is O(1) work per group, so this step is Theta(n) total across all n/5 groups).
3. Recursively find the median of these n/5 group-medians — call it the pivot.
4. Partition the whole array around this pivot, exactly as in quickselect, and recurse into whichever side contains the target rank.

The reason this pivot is guaranteed to be reasonably central: consider the n/5 groups, each internally sorted by having found its median. At least half of the n/5 group-medians are, by definition of "median of medians", <= the pivot. For each such group, being *fully sorted* internally (5 elements), the group's median and the two elements below it in that group are also <= the pivot — 3 elements per such group. So at least 3 * (1/2) * (n/5) = 3n/10 elements of the whole array are guaranteed <= the pivot (a small constant correction applies for the partial last group and rounding, which does not change the asymptotics). By the mirror argument, at least 3n/10 elements are guaranteed >= the pivot. So neither recursive call after partitioning can exceed n - 3n/10 = 7n/10 elements.

This gives the recurrence

T(n) <= T(n/5) + T(7n/10) + O(n)

the T(n/5) for finding the median of medians (step 3) and the T(7n/10) for the worst-case recursive call after partitioning (step 4), plus O(n) for computing all the group medians and doing the partition itself. This does *not* fit the single-term a T(n/b) + f(n) Master theorem shape, because it has two different-sized recursive terms — it needs the recursion-tree / geometric-series argument instead. The key fact making it work: 1/5 + 7/10 = 2/10 + 7/10 = 9/10, which is strictly less than 1. Guess T(n) <= cn for a suitable constant c and verify: T(n) <= c(n/5) + c(7n/10) + O(n) = c(9n/10) + O(n). For this to be <= cn, the O(n) term (call it dn) must satisfy dn <= cn - 9cn/10 = cn/10, i.e. c >= 10d — always satisfiable by choosing c large enough. So T(n) = O(n), and since the algorithm must at least look at every element once, T(n) = Theta(n): guaranteed linear time, in the worst case, for every input.

Why does the identical scheme fail with groups of 3? Splitting into n/3 groups of 3, at least half of the n/3 group-medians are <= the pivot, and for a group of 3 elements, only the median and the *one* smaller element are guaranteed <= the pivot — 2 elements per such group, not 3. So the guaranteed count is 2 * (1/2) * (n/3) = n/3 elements <= the pivot, leaving a worst-case recursive call of size n - n/3 = 2n/3. The recurrence becomes T(n) <= T(n/3) + T(2n/3) + O(n), and now 1/3 + 2/3 = 1 exactly — not strictly less than 1. With the fractions summing to exactly 1, every level of the recursion tree still costs Theta(n) in total (nothing shrinks the per-level work geometrically), and the depth is still Theta(log n) (since each recursive call does shrink, just not fast enough relative to the other), giving Theta(n log n) overall — no better than sorting, and no better than ordinary balanced quicksort. Groups of 5 are the smallest odd group size for which the fractions genuinely sum below 1; the "5" is not an arbitrary textbook constant, it is the smallest choice that makes the recurrence actually linear.

GATE TRAP: Applying the Master theorem directly to T(n) = T(n/5) + T(7n/10) + O(n) is a category error — the theorem requires a single recursive term a T(n/b). This recurrence has two different-sized recursive calls and must be solved by the substitution/recursion-tree method shown above, checking that the fractional coefficients (here 1/5 + 7/10 = 9/10) sum to strictly less than 1.

FINDING MINIMUM AND MAXIMUM TOGETHER

A different flavour of problem: not sorting or searching, but finding two specific values — the minimum and the maximum of an unsorted array — as cheaply as possible in comparisons.

The naive approach scans once for the maximum (n - 1 comparisons, comparing each new element to the running max) and then scans again for the minimum (n - 1 more), for 2n - 2 total; or, tracking both in a single pass, up to 2 comparisons per remaining element after initialising from the first (one check against the running max, one against the running min), which is also up to 2(n-1) in the worst case.

Divide and conquer does better by comparing elements *against each other in pairs* before ever comparing against the running min or max. Process the array in pairs: compare the two elements of each pair against each other once (this single comparison tells you, for that pair, which is the bigger and which is the smaller). Then compare the "winner" (bigger) of each pair only against the running maximum, and the "loser" (smaller) of each pair only against the running minimum — never against both.

Concretely on A = [8, 3, 5, 1, 9, 2, 7, 4] (n = 8, four pairs):

1. Pair (8,3): 1 comparison, 8 is the bigger, 3 the smaller.
2. Pair (5,1): 1 comparison, 5 bigger, 1 smaller.
3. Pair (9,2): 1 comparison, 9 bigger, 2 smaller.
4. Pair (7,4): 1 comparison, 7 bigger, 4 smaller.
   Subtotal: 4 comparisons. Candidates for max: {8,5,9,7}. Candidates for min: {3,1,2,4}.
5. Find the max of {8,5,9,7}: 8 vs 5 → 8; 8 vs 9 → 9; 9 vs 7 → 9. 3 comparisons. Overall max = 9.
6. Find the min of {3,1,2,4}: 3 vs 1 → 1; 1 vs 2 → 1; 1 vs 4 → 1. 3 comparisons. Overall min = 1.

Total: 4 + 3 + 3 = 10 comparisons, against the naive method's 2*8 - 2 = 14. This is not a coincidence for this array; it is the general formula. As a recurrence for n a power of 2: pairing costs n/2 comparisons, and the two "find the extreme among the winners/losers" calls are each themselves the same problem (finding one extreme value, which costs (size - 1) comparisons for a linear scan, or can itself be built recursively) — giving T(n) = 2T(n/2) + 2, T(2) = 1, where the "+2" is one comparison to combine the two sub-maxima and one to combine the two sub-minima.

Solve by induction, guessing T(n) = (3n/2) - 2. Base case: T(2) = 3 - 2 = 1, matches (a single comparison orders a pair into (min, max)). Inductive step: T(n) = 2T(n/2) + 2 = 2((3(n/2)/2) - 2) + 2 = 2((3n/4) - 2) + 2 = (3n/2) - 4 + 2 = (3n/2) - 2, confirming the guess. For n = 8: (3*8/2) - 2 = 12 - 2 = 10, matching the hand trace exactly. For n = 100 (even though 100 is not a power of 2, the same pairing method applies with ceiling adjustments): ceil(3*100/2) - 2 = 150 - 2 = 148.

minimum-and-maximum comparisons (n a power of 2) = (3n/2) - 2

This bound is optimal: an information-theoretic argument (each element must be compared at least once to be ruled out as either the max or the min, and elements that are neither the max nor the min must, in the worst case, be "eliminated" from both races) shows no comparison-based algorithm can guarantee fewer than ceil(3n/2) - 2 comparisons for this problem.

THE SECOND-LARGEST ELEMENT, CHEAPLY

A similar comparison-minimisation puzzle: find the largest *and* second-largest element together. Run a single-elimination tournament: pair up all n elements, compare each pair, keep the winners; pair up the winners, compare, keep those winners; repeat until one champion remains. Every comparison eliminates exactly one element (the loser), and finding one overall champion requires eliminating n - 1 elements, so this tournament always costs exactly n - 1 comparisons regardless of the data.

The key structural fact: the second-largest element overall *must* be one of the elements that lost a match directly to the eventual champion at some round — it cannot be an element that never faced the champion. If some element x never played the champion but is nonetheless the true second-largest, then every element x beat on its own path is smaller than x, and x itself was eliminated by someone other than the champion at some point — call that someone y. Since y beat x and the champion beat y (directly or via further rounds), the champion must be provably bigger than x through some chain, but x being second-largest and never meeting the champion directly is only possible if the chain of eliminations still bottoms out at a match the champion was in — which contradicts x never facing the champion. So the second-largest is always among the champion's own direct victims.

How many direct victims does the champion have? Exactly one per round it plays, and the tournament has ceil(log_2 n) rounds (each round halves the field), so there are ceil(log_2 n) candidates. Finding the maximum among these few candidates costs (number of candidates - 1) more comparisons.

Trace on A = [8, 3, 5, 1, 9, 2, 7, 4] (n = 8, so ceil(log_2 8) = 3 rounds):

1. Round 1 (4 matches): 8 vs 3 → 8 wins; 5 vs 1 → 5 wins; 9 vs 2 → 9 wins; 7 vs 4 → 7 wins. (4 comparisons.)
2. Round 2 (2 matches): 8 vs 5 → 8 wins; 9 vs 7 → 9 wins. (2 comparisons.)
3. Round 3 (final): 8 vs 9 → 9 is champion. (1 comparison.)

Total so far: 4 + 2 + 1 = 7 = n - 1, as expected. The champion 9's direct victims, one per round it played: round 1 it beat 2, round 2 it beat 7, round 3 it beat 8. Candidates for second-largest: {2, 7, 8}. Find their maximum: 2 vs 7 → 7; 7 vs 8 → 8. Two more comparisons. Overall total: 7 + 2 = 9.

Check against the actual sorted order of the array (1,2,3,4,5,7,8,9): the true second-largest is 8, matching the tournament's answer, using 9 comparisons total — the closed form n + ceil(log_2 n) - 2 = 8 + 3 - 2 = 9. This, like the min-max bound, is provably optimal: it matches the information-theoretic lower bound for this problem exactly, for the identical reason the min-max bound is optimal — every comparison can eliminate at most one candidate from contention for either title, and the tournament structure is the most efficient way to generate "who lost directly to the eventual winner" as a byproduct of finding the winner at all.

second-largest comparisons = n + ceil(log_2 n) - 2

THE MAXIMUM SUBARRAY PROBLEM

Given an array of numbers, possibly negative, find the contiguous subarray whose sum is largest. A divide-and-conquer solution: split the array into two halves. The best subarray overall is either entirely in the left half, entirely in the right half, or it *crosses* the midpoint. The first two cases are solved by the identical recursive call on each half; the crossing case needs its own linear scan, because a subarray crossing the midpoint is not a subproblem of either half alone.

To find the best crossing subarray: scan leftward from the midpoint, tracking the best (largest) sum of a suffix of the left half; scan rightward from the midpoint, tracking the best sum of a prefix of the right half; add the two best sums together. Both scans are single linear passes, so the crossing step costs Theta(n).

This gives T(n) = 2T(n/2) + Theta(n) — the identical recurrence, and therefore the identical Theta(n log n) running time, as merge sort. It is a real algorithm, correct and asymptotically better than the Theta(n^2) or Theta(n^3) brute-force approaches that check every pair or triple of indices directly.

It is, however, beaten by Kadane's algorithm, a single-pass dynamic-programming method that tracks, at each position, the best sum of a subarray *ending exactly there* (either extend the previous best-ending-here subarray by one element, or start fresh at the current element, whichever gives a larger sum), updating a running overall best as it goes — Theta(n), with a smaller constant and no recursion at all. The divide-and-conquer version is the natural first idea and a genuine Theta(n log n) algorithm; Kadane's is what you use once you notice the problem does not actually need cutting the array at all, since a subarray's best-ending-here value only depends on the immediately preceding position, not on an entire independent half.

STRASSEN'S MATRIX MULTIPLICATION

Multiplying two n x n matrices the ordinary way — each of the n^2 output entries is a dot product of a length-n row and column, needing n multiplications each — costs Theta(n^3) multiplications. Can dividing the matrices into blocks and recursing do better?

Split each n x n matrix into four (n/2) x (n/2) blocks: A = [[A11,A12],[A21,A22]], B similarly. The ordinary block formula for each quadrant of the product C needs 2 multiplications and 1 addition (e.g. C11 = A11*B11 + A12*B21), and there are 4 quadrants, so naively this needs 8 recursive multiplications of half-size blocks plus Theta(n^2) additions: T(n) = 8T(n/2) + Theta(n^2). Since 8 = 2^3, the watershed exponent log_2 8 = 3 matches the naive cost exactly, and by Master theorem Case 1 (n^2 is polynomially smaller than n^3) this gives T(n) = Theta(n^3) — no improvement at all over the straightforward method, just a recursive way of arriving at the same cubic cost.

Strassen's insight was to compute the same four output quadrants using only 7 matrix multiplications instead of 8, by combining the blocks cleverly first (into 7 specific sums and differences) and multiplying those, at the cost of more additions:

M1 = (A11+A22)(B11+B22)
M2 = (A21+A22) B11
M3 = A11 (B12-B22)
M4 = A22 (B21-B11)
M5 = (A11+A12) B22
M6 = (A21-A11)(B11+B12)
M7 = (A12-A22)(B21+B22)

and the four output quadrants are recovered as C11 = M1+M4-M5+M7, C12 = M3+M5, C21 = M2+M4, C22 = M1-M2+M3+M6 — a fixed set of about 18 Theta((n/2)^2) additions/subtractions, still Theta(n^2) total, combining just 7 recursive multiplications rather than 8.

T(n) = 7 T(n/2) + Theta(n^2)

Here a = 7, b = 2, watershed exponent log_2 7, which is about 2.807. Since f(n) = Theta(n^2) is polynomially smaller than n^2.807 (a genuine gap of about 0.807), Master theorem Case 1 applies: T(n) = Theta(n^(log_2 7)) = Theta(n^2.807), strictly better than the naive Theta(n^3), because reducing the *branching factor* from 8 to 7 — not the per-level combine cost, which stayed Theta(n^2) in both versions — is what lowered the exponent.

Make this concrete on 8x8 matrices, where the recursion goes 8 -> 4 -> 2 -> 1, a depth of log_2 8 = 3 levels. Strassen's scheme performs 7 recursive multiplications at each level, so the total number of base-level scalar multiplications is 7^3 = 343. The naive algorithm performs exactly 8^3 = 512 scalar multiplications (n^3 directly). 343 is about 33% fewer than 512 — a genuine, exactly computable saving for this size, matching the general asymptotic gap between n^2.807 and n^3 at a concrete value of n.

KARATSUBA'S INTEGER MULTIPLICATION

Multiplying two n-digit numbers by the schoolbook method — every digit of one against every digit of the other — costs Theta(n^2). Split each number in half: a number x of n digits is written as x = a * 10^(n/2) + b, where a is the top half and b the bottom half; similarly y = c * 10^(n/2) + d. Then

x * y = a*c * 10^n + (a*d + b*c) * 10^(n/2) + b*d

which needs 4 recursive multiplications of n/2-digit numbers (ac, ad, bc, bd) plus Theta(n) additions and shifts — T(n) = 4T(n/2) + Theta(n), and since log_2 4 = 2 matches Case 1 against f(n)=n, this is Theta(n^2): no better than schoolbook, because 4 recursive calls at half size is exactly the same branching as doing all the digit-by-digit products directly.

Karatsuba's trick reduces the middle term to a *single* recursive multiplication using algebra instead of a direct product: compute p = (a+b)(c+d) once; this equals ac + ad + bc + bd, so subtracting the two products you already need anyway, ac and bd, recovers exactly the ad + bc term: ad + bc = p - ac - bd. So only 3 recursive multiplications are needed — ac, bd, and (a+b)(c+d) — plus Theta(n) additions and subtractions to assemble the pieces.

T(n) = 3 T(n/2) + Theta(n)

Here a = 3, b = 2, watershed n^(log_2 3), and log_2 3 is about 1.585, polynomially bigger than f(n) = n, so Case 1 gives T(n) = Theta(n^1.585) — asymptotically faster than schoolbook Theta(n^2), purely from cutting one recursive multiplication out of four using algebraic substitution, the identical idea (fewer recursive multiplications, more cheap additions) behind Strassen's 7-instead-of-8.

Trace the algebra on a tiny concrete case: multiply 34 * 12. Split 34 = a*10 + b with a=3, b=4; split 12 = c*10 + d with c=1, d=2. Compute ac = 3*1 = 3, bd = 4*2 = 8, and (a+b)(c+d) = 7*3 = 21. The middle term is 21 - 3 - 8 = 10. Assemble: 34*12 = ac*100 + middle*10 + bd = 300 + 100 + 8 = 408. Direct check: 34*12 = 408. The three products used were 3*1, 4*2, and 7*3 — three multiplications, not the four (3*1, 3*2, 4*1, 4*2) that a direct expansion would need.

THE CLOSEST PAIR OF POINTS

Given n points in the plane, find the two that are closest together. Checking every pair directly costs Theta(n^2). Divide and conquer brings this to Theta(n log n).

Sort the points by x-coordinate once (Theta(n log n), paid up front) and split by a vertical line into a left half and a right half of n/2 points each. Recursively find the closest pair within the left half and within the right half; let d be the smaller of the two resulting distances. The overall closest pair is either one of these two within-half pairs, or a pair straddling the dividing line that beats d — and finding out whether such a pair exists is the entire job of the combine step.

A straddling pair that beats d cannot have either point more than d away from the dividing line horizontally (otherwise it couldn't be closer than d), so only points inside a vertical strip of width 2d around the line need checking. Sort this strip's points by y-coordinate (maintained incrementally as the recursion returns, so this does not cost an extra full sort). The bound that makes this step fast rather than another Theta(n^2) all-pairs check within the strip: since every point on the *same side* of the dividing line is already known to be at least d away from every other point on its own side (that is exactly what d means), at most a small constant number of strip points (a packing argument bounds it to at most 7 or 8) can fit inside any d-by-2d rectangle without violating that "at least d apart within a side" fact. So each strip point only needs to be checked against its next few neighbours in the y-sorted order — O(1) work per point — giving Theta(n) for the entire strip step.

T(n) = 2T(n/2) + Theta(n), Master Case 2, gives T(n) = Theta(n log n) for the recursive part (with the one-time Theta(n log n) initial sort not affecting the overall bound, since it happens only once, not at every level).

EXPONENTIATION BY SQUARING

Computing a^n by multiplying a by itself n-1 times costs Theta(n) multiplications. Divide and conquer does it in Theta(log n): if n is even, compute a^(n/2) once (recursively) and square that single result; if n is odd, compute a^(n-1) (which is now even) and multiply by one more factor of a.

T(n) = T(n/2) + Theta(1) for the even case — a single recursive call on half the exponent, Theta(1) extra work (one squaring) — giving, by the same shape as binary search's recurrence, T(n) = Theta(log n). The odd case adds at most one extra Theta(1) step before the next halving, and since subtracting 1 from an odd number always produces an even number, two odd (decrement) steps can never happen back-to-back — every decrement is immediately followed by a halving. So the total number of steps stays bounded by about 2 log_2 n, still Theta(log n) overall, not Theta(n). Computing 2^20 this way takes about 5 squarings (20 -> 10 -> 5 -> 4 -> 2 -> 1) plus one extra multiplication for the one odd step at 5, rather than 20 separate multiplications.

THE EXPONENT TABLE: READING A RECURRENCE AT A GLANCE

Every algorithm in this chapter reduces to T(n) = a T(n/b) + f(n) (or, for the unbalanced-split cases, a small variant of it), and the pattern across all of them is the same: fixing a and b fixes a "watershed" exponent, n^(log_b a), which is what the pure branching structure alone would cost if the combine step were free; the actual combine cost f(n), compared against that watershed, decides which Master theorem case applies and hence the true running time.

• a=1, b=2, f=O(1): watershed n^0 = 1, f matches it (case 2) — T(n) = Theta(log n). Binary search, exponentiation by squaring.
• a=2, b=2, f=Theta(n): watershed n^1 = n, f matches it (case 2, one extra log factor) — T(n) = Theta(n log n). Merge sort, D&C maximum subarray, closest pair.
• a=1, b~4/3 (a single shrinking term with linear work, e.g. quickselect's expected case): the recursive geometric-series argument, not the Master theorem directly, gives T(n) = Theta(n).
• a=3, b=2, f=Theta(n): watershed n^(log_2 3) = n^1.585 dominates f=n (case 1) — T(n) = Theta(n^1.585). Karatsuba.
• a=7, b=2, f=Theta(n^2): watershed n^(log_2 7) = n^2.807 dominates f=n^2 (case 1) — T(n) = Theta(n^2.807). Strassen.
• a=8, b=2, f=Theta(n^2): watershed n^3 dominates f=n^2 (case 1) — T(n) = Theta(n^3). Naive D&C matrix multiplication — no better than the non-recursive method.

Reading this table, the pattern is: shrinking the branching factor a while holding f(n) fixed always lowers the watershed exponent log_b a, and hence lowers the final running time whenever Case 1 applies (f(n) polynomially below the watershed) — this is the entire content of both Strassen's and Karatsuba's contributions, phrased as "one fewer recursive multiplication, some extra cheap additions". When f(n) instead grows to match or exceed the watershed, the combine step itself becomes the bottleneck (cases 2 and 3), and shrinking a no longer helps in the same way.

WHEN DIVIDE AND CONQUER FAILS

The paradigm relies on one assumption stated at the very start of the chapter: the subproblems are independent. When they are not — when the natural way of cutting a problem in half produces subproblems that overlap, so that solving them independently means solving the *same* smaller subproblem many times over — divide and conquer stops being efficient, even though it is still technically correct.

The textbook example is the naive recursive Fibonacci computation, or naive recursive computation of binomial coefficients: fib(n) = fib(n-1) + fib(n-2) looks exactly like a divide-and-conquer recurrence, T(n) = T(n-1) + T(n-2) + Theta(1), but fib(n-1) and fib(n-2) are *not* independent subproblems — computing fib(n-1) recursively recomputes fib(n-2) all over again inside it, and fib(n-3) gets recomputed many times over across both branches. The recursion tree, instead of doing Theta(n) total work per level as in merge sort, actually *doubles* in size at every level (an exponential number of leaves), giving Theta(2^n) work for what is fundamentally an O(n)-large space of distinct subproblems. The fix — remembering each distinct subproblem's answer the first time it is computed, so it is never recomputed — is dynamic programming, the next topic, and it exists precisely to repair this failure mode of the divide-and-conquer idea.

A second failure mode is a combine step that is too expensive relative to what dividing bought you. If splitting a problem in half but then needing Theta(n^2) work (or worse) to stitch the halves back together, the recurrence T(n) = 2T(n/2) + Theta(n^2) lands in Master Case 3, giving T(n) = Theta(n^2) — the recursive splitting contributed nothing at all, because the combine step alone already costs as much as solving the problem directly would. Divide and conquer is worth using only when *both* halves of the trade hold: the subproblems must be genuinely independent, and the combine step must be cheap enough not to swallow the savings the splitting was supposed to buy.

GATE TRAP: A recurrence "looks like" divide and conquer (a term calling itself at a smaller size) does not certify that dividing helps, or even that the subproblems are legitimate divide-and-conquer subproblems at all. Check independence first — if the recursive calls are solving overlapping instances of the same smaller problem, the honest fix is memoisation or a bottom-up table, not a Master theorem calculation on a recurrence that does not reflect the real work being repeated.

WORKED PROBLEMS

1. Trace the Lomuto partition of A = [6, 2, 4, 8, 1] with pivot = last element, and give the final partitioned array.
   Pivot = 1 (index 4). i = -1. j=0: A[0]=6, 6<=1? No. j=1: A[1]=2, 2<=1? No. j=2: A[2]=4, 4<=1? No. j=3: A[3]=8, 8<=1? No. Loop ends with i still -1 (4 comparisons made, none succeeded). Final swap(A[i+1], A[4]) = swap(A[0], A[4]): [1, 2, 4, 8, 6]. Pivot 1 lands at index 0 — correct, since 1 is the smallest element and everything else stays to its right, unsorted among themselves.

2. Merge sort is run on A = [8, 3, 5, 1, 9, 2, 7, 4]. Give the exact total number of comparisons across all merge steps.
   Level 1 (four size-1 merges): [8],[3]->1; [5],[1]->1; [9],[2]->1; [7],[4]->1. Subtotal 4, giving runs [3,8],[1,5],[2,9],[4,7]. Level 2: merging [3,8] with [1,5] — compare 3v1(take1), 3v5(take3), 8v5(take5), then 8 remains — 3 comparisons, giving [1,3,5,8]. Merging [2,9] with [4,7] — compare 2v4(take2), 9v4(take4), 9v7(take7), then 9 remains — 3 comparisons, giving [2,4,7,9]. Subtotal 6. Level 3: merging [1,3,5,8] with [2,4,7,9] — 1v2(take1), 3v2(take2), 3v4(take3), 5v4(take4), 5v7(take5), 8v7(take7), then 9 remains — 7 comparisons. Grand total: 4+6+7 = 17.

3. Using quicksort with the *first* element as pivot on A = [1, 2, 3, 4, 5, 6, 7], how many total comparisons does full quicksort make?
   Sorted input with first-element pivot is the classic worst case: partitioning a range of size m against its own smallest element costs m-1 comparisons and produces one empty side and a remaining range of size m-1. Comparisons: 6+5+4+3+2+1 = 21, matching n(n-1)/2 = 7*6/2 = 21 for n=7.

4. A median-of-medians selection algorithm groups elements into 5s. Justify why the recurrence T(n) <= T(n/5) + T(7n/10) + O(n) gives Theta(n), and explain why groups of 3 give T(n) <= T(n/3) + T(2n/3) + O(n) instead, and why that fails to be linear.
   With groups of 5, at least half of the n/5 group-medians are <= the pivot, and each such fully-sorted group of 5 contributes 3 elements (the median and the 2 below it) known to be <= the pivot, guaranteeing at least 3n/10 elements <= pivot and, symmetrically, at least 3n/10 >= pivot; so no recursive call after partitioning exceeds n - 3n/10 = 7n/10 elements, giving T(n) <= T(n/5) + T(7n/10) + O(n). Since 1/5 + 7/10 = 9/10 < 1, guessing T(n) <= cn and substituting gives c(9n/10) + O(n) <= cn for c large enough — Theta(n). With groups of 3, each group only guarantees 2 elements (the median and the 1 below it) <= the pivot, giving only n/3 guaranteed elements on each side and a worst-case recursive call of 2n/3, so T(n) <= T(n/3) + T(2n/3) + O(n). Now 1/3 + 2/3 = 1 exactly — every level of the recursion tree still costs Theta(n) with no geometric shrinkage in the per-level total, so the recurrence solves to Theta(n log n), not Theta(n): groups of 3 fail to buy linear time.

5. Derive the exact number of comparisons to find both the minimum and maximum of n = 100 elements using the pairwise divide-and-conquer method, and compare it to the naive 2n-2 approach.
   The pairwise method costs ceil(3n/2) - 2 comparisons: pair the 100 elements into 50 pairs (50 comparisons), then find the maximum of the 50 pair-winners (49 comparisons) and the minimum of the 50 pair-losers (49 comparisons). Total = 50 + 49 + 49 = 148, matching ceil(3*100/2) - 2 = 150 - 2 = 148. The naive approach (99 comparisons for the max, then 98 more for the min among the rest) costs 197; tracking both in one linear pass with up to 2 comparisons per remaining element costs up to 2*99 = 198 in the worst case. Either naive method does substantially more work than the provably optimal 148.

6. Derive T(n) for Strassen's algorithm from its recurrence, and compute the exact scalar multiplication count for 8x8 matrices, contrasted with the naive count.
   T(n) = 7T(n/2) + Theta(n^2). Watershed exponent log_2 7 is about 2.807; since f(n) = Theta(n^2) is polynomially smaller than n^2.807, Master theorem Case 1 gives T(n) = Theta(n^2.807), strictly better than naive Theta(n^3). For n=8 = 2^3, the recursion has depth 3, and Strassen performs 7 multiplications at each level, giving 7^3 = 343 total scalar multiplications, versus the naive 8^3 = 512 — a reduction of (512-343)/512, about 33%.

7. What is the exact worst-case number of comparisons for binary search on a sorted array of n = 200 elements?
   The formula is floor(log_2 n) + 1. Since 2^7 = 128 <= 200 < 256 = 2^8, floor(log_2 200) = 7, giving a worst case of 7 + 1 = 8 comparisons. Verify by halving: 200 -> 100 -> 50 -> 25 -> 12 -> 6 -> 3 -> 1, which is 7 halvings, plus one final comparison on the last candidate — 8 total.

8. Using the standard merge-sort-based inversion-counting method, how many inversions does A = [8, 3, 5, 1, 9, 2, 7, 4] have?
   Tracing the same merges as problem 2 but counting a "left-elements-still-waiting" bonus every time a right-half element is taken early: level 1 gives 1+1+1+1 = 4 inversions (each singleton pair is itself one inversion or none — here each pair is inverted, contributing 1 each). Merging [3,8] with [1,5]: take 1 (left has 3,8 waiting, +2), take 3, take 5 (left has 8 waiting, +1), take 8 — subtotal 3. Merging [2,9] with [4,7]: take 2, take 4 (left has 9 waiting, +1), take 7 (left has 9 waiting, +1), take 9 — subtotal 2. Final merge of [1,3,5,8] with [2,4,7,9]: take 1, take 2 (left has 3,5,8 waiting, +3), take 3, take 4 (left has 5,8 waiting, +2), take 5, take 7 (left has 8 waiting, +1), take 8, take 9 (+0) — subtotal 6. Grand total: 4 + 3 + 2 + 6 = 15 inversions.

WHAT TO CARRY INTO THE NEXT CHAPTER

The one idea to keep from this entire chapter is the checklist: identify how a problem is divided (a and b), identify what the combine step costs (f(n)), and the running time follows. That checklist stops working the moment the subproblems a division produces are not independent — the Fibonacci example at the end of this chapter is not a curiosity, it is the doorway into the next topic. Dynamic programming is what you reach for exactly when divide and conquer's recursion tree would revisit the same subproblem again and again: instead of recomputing, you solve each distinct subproblem once, store the answer, and reuse it. Everything you now know about writing down a recurrence carries over directly; what changes is what you do when two branches of that recurrence turn out to ask the same question.
`
};
