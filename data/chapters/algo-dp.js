// Textbook chapter: Dynamic Programming.
//
// Full teaching text for the topic, written to be learned from directly. Format
// is the plain-text convention renderTheory() understands: ALL-CAPS lines are
// section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — either from the figs list below or from the
// topic's own theory.figs (lcs-table, knapsack-table already exist there).

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['algo-dp'] = {
  figs: [
    {
      id: 'fib-tree',
      caption: 'The recursion tree of naive fib(5). The thick circles are all calls to F(2) — the same subproblem, solved from scratch three separate times.',
      svg: '<svg viewBox="0 0 360 240" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3" fill="none"><line x1="180" y1="30" x2="105" y2="72"/><line x1="180" y1="30" x2="258" y2="72"/><line x1="97" y1="88" x2="62" y2="132"/><line x1="97" y1="88" x2="138" y2="132"/><line x1="258" y1="88" x2="222" y2="132"/><line x1="258" y1="88" x2="298" y2="132"/><line x1="62" y1="148" x2="32" y2="192"/><line x1="62" y1="148" x2="90" y2="192"/></g><g fill="none" stroke="currentColor"><circle cx="180" cy="20" r="16"/><circle cx="97" cy="80" r="16"/><circle cx="258" cy="80" r="16"/><circle cx="62" cy="140" r="16"/><circle cx="138" cy="140" r="16" stroke-width="3"/><circle cx="222" cy="140" r="16" stroke-width="3"/><circle cx="298" cy="140" r="16"/><circle cx="32" cy="200" r="14" stroke-width="3"/><circle cx="90" cy="200" r="14"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="180" y="24">F(5)</text><text x="97" y="84">F(4)</text><text x="258" y="84">F(3)</text><text x="62" y="144">F(3)</text><text x="138" y="144">F(2)</text><text x="222" y="144">F(2)</text><text x="298" y="144">F(1)</text><text x="32" y="204">F(2)</text><text x="90" y="204">F(1)</text></g><text x="180" y="232" font-size="10" text-anchor="middle">thick circles = F(2), recomputed from scratch 3 times</text></svg>'
    },
    {
      id: 'mcm-fill',
      caption: 'The matrix-chain table m[i,j] is filled diagonal by diagonal — every cell needs only shorter chains, all of which sit on an earlier diagonal.',
      svg: '<svg viewBox="0 0 280 190" width="100%" style="max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="9" fill="currentColor" text-anchor="middle"><text x="80" y="14">j=1</text><text x="124" y="14">j=2</text><text x="168" y="14">j=3</text><text x="212" y="14">j=4</text></g><g stroke="currentColor" fill="none"><rect x="60" y="20" width="40" height="28" opacity="1"/><rect x="104" y="20" width="40" height="28" opacity="0.75"/><rect x="148" y="20" width="40" height="28" opacity="0.5"/><rect x="192" y="20" width="40" height="28" opacity="0.3"/><rect x="104" y="52" width="40" height="28" opacity="1"/><rect x="148" y="52" width="40" height="28" opacity="0.75"/><rect x="192" y="52" width="40" height="28" opacity="0.5"/><rect x="148" y="84" width="40" height="28" opacity="1"/><rect x="192" y="84" width="40" height="28" opacity="0.75"/><rect x="192" y="116" width="40" height="28" opacity="1"/></g><g font-size="9" fill="currentColor" text-anchor="middle"><text x="80" y="38">m1,1</text><text x="124" y="38">m1,2</text><text x="168" y="38">m1,3</text><text x="212" y="38">m1,4</text><text x="124" y="70">m2,2</text><text x="168" y="70">m2,3</text><text x="212" y="70">m2,4</text><text x="168" y="102">m3,3</text><text x="212" y="102">m3,4</text><text x="212" y="134">m4,4</text></g><text x="10" y="165" font-size="10" text-anchor="start">darkest = filled first (chain length 1, all zero)</text><text x="10" y="180" font-size="10" text-anchor="start">then length 2, then 3, then 4 — each needs the shorter ones</text></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

You already know two ways to build an algorithm out of subproblems. Divide and conquer splits a problem into pieces, solves each piece, and combines the answers — merge sort, quicksort. Greedy algorithms make one irrevocable choice at each step and never look back — activity selection, Huffman coding, minimum spanning trees. Dynamic programming is the third way, and it exists because some problems break both of the other two: the pieces divide and conquer would create are not independent, and no single greedy choice at each step is safe.

Dynamic programming is what you reach for when a problem's subproblems overlap — the same smaller instance is needed again and again along different paths — and when committing early to one choice can throw away the eventual optimum. It looks expensive at first glance, because it seems to require trying every choice. The entire craft of the subject is showing that "every choice" is actually a small, structured set of subproblems, computed once each and reused.

This chapter builds the idea from the simplest possible example — a recursive formula everyone already knows, Fibonacci — up through every classic problem GATE draws its questions from: rod cutting, coin change, knapsack, longest common subsequence, longest increasing subsequence, edit distance, matrix-chain multiplication, and a handful of others. Every one of them is solved by the same four-step method, so once you have done it three times you can do it for a problem you have never seen. The next chapter, on graph algorithms, will reuse this machinery directly — shortest paths on a DAG, Floyd–Warshall, and Bellman–Ford are all dynamic programs wearing graph clothing.

WHERE THE NEED COMES FROM — NAIVE FIBONACCI

Take the simplest recursive definition there is. The n-th Fibonacci number is defined by fib(0) = 0, fib(1) = 1, and for n ≥ 2,

fib(n) = fib(n-1) + fib(n-2)

Translate this directly into a recursive function and it works — it returns the right answer for every n. But run it for, say, n = 40, and it takes a noticeably long time even on a fast machine. Something is wrong with a formula this simple taking that long. To see what, look at what the recursion actually does when it computes fib(5): it calls fib(4) and fib(3). fib(4) itself calls fib(3) and fib(2). fib(3) — the one inside fib(4) — calls fib(2) and fib(1). And separately, fib(5)'s other child, fib(3), also calls fib(2) and fib(1).

[[FIG:fib-tree]]

Look at how many times fib(2) gets computed inside this one call to fib(5): once as a child of fib(4), once as a child of the fib(3) that is itself a child of fib(4), and once as a child of the other fib(3). Three separate, from-scratch computations of the identical subproblem fib(2), each one re-deriving fib(1) and fib(0) all over again. This is not a quirk of n = 5; it gets worse as n grows, because fib(n-2) is needed both directly (as fib(n)'s second child) and again inside the subtree for fib(n-1).

1. Let T(n) be the number of calls the naive recursion makes to compute fib(n).
2. Every call other than a base case makes exactly two further calls, one for fib(n-1) and one for fib(n-2), plus itself: T(n) = T(n-1) + T(n-2) + Θ(1).
3. This is the same recurrence shape as Fibonacci itself, so T(n) grows like the Fibonacci numbers do — as φⁿ, where φ = (1+√5)/2 ≈ 1.618.
4. Θ(φⁿ) is exponential. Doubling n does not double the work; it roughly squares it.

The two things happening here have names, and dynamic programming is defined by needing both of them.

KEY: A problem has OVERLAPPING SUBPROBLEMS if a recursive solution calls the same subproblem instance more than once along different branches — as fib(2) is called three separate times inside fib(5). This is the specific defect dynamic programming exists to fix. A problem has OPTIMAL SUBSTRUCTURE if an optimal solution to it is built out of optimal solutions to its own subproblems — every DP recurrence you will see in this chapter is a statement of optimal substructure.

Fibonacci trivially has optimal substructure too — fib(n) is exactly fib(n-1) + fib(n-2), no approximation, no "close enough" — but that alone would not explain the exponential blow-up. Merge sort also has optimal substructure (a sorted whole is built from two sorted halves) and takes only Θ(n log n). The difference is that merge sort's two halves never overlap — they partition the array — so nothing is ever recomputed. Overlapping subproblems is what turns optimal substructure into an efficiency problem, and it is the piece naive Fibonacci demonstrates.

FIXING IT: MEMOIZATION

The most direct fix keeps the recursive function exactly as it is, but adds a cache. Before computing fib(n), check whether it has already been computed and stored; if so, return the stored value immediately; if not, compute it recursively as before and store the result before returning.

5. First call to fib(5): not cached, so recurse into fib(4) and fib(3).
6. Inside that, fib(4) recurses into fib(3) — again not cached the first time — and fib(2).
7. When the second, independent call to fib(3) is reached (fib(5)'s direct child), the cache already holds fib(3) from step 6, so it returns instantly with no further recursion.

Every distinct value fib(0) through fib(n) is computed exactly once; every repeat visit is a cache hit costing Θ(1). This is called memoization: top-down, because you still call fib(n) and let the recursion unwind naturally, but "memoized" so no subproblem is solved twice. Total work drops from Θ(φⁿ) to Θ(n).

FIXING IT AGAIN: TABULATION

The other standard fix throws away the recursion entirely and computes the values in the order they are needed: fib(0), then fib(1), then fib(2), and so on up to fib(n), storing each one in a table (an array) as it is computed. By the time you need fib(k) for the recurrence, fib(k-1) and fib(k-2) are already sitting in the table.

8. Initialize table[0] = 0, table[1] = 1.
9. For k = 2 up to n, set table[k] = table[k-1] + table[k-2].
10. Return table[n].

This is called tabulation: bottom-up, because it starts from the base cases and builds upward, with no recursion and no call stack at all. It also does Θ(n) work, but note what else it buys you here: since table[k] only ever needs the last two entries, you do not need to keep the whole array — two variables suffice, giving Θ(1) space instead of Θ(n). Memoization cannot get this space reduction for free, because it does not know in advance which cached values it is finished with; the recursion could, in principle, ask for any of them again.

KEY: Memoization and tabulation compute the exact same set of subproblem values, in the same amount of asymptotic time, from the same recurrence — they only differ in the order of evaluation (demand-driven recursion versus a fixed, precomputed order) and in what that order lets you do with memory. Neither is "the" correct implementation of a DP; they are two ways to execute one recurrence.

WHEN EACH ONE WINS

Tabulation avoids recursion overhead (function calls, stack frames) and gives you full control over the fill order, which is exactly what lets you compress a whole previous row or array down to Θ(1) or Θ(row-size) space, as you will see repeatedly below. It is usually the faster, more memory-efficient choice once you know how to write the iteration order correctly.

Memoization is easier to get right when the dependency structure is not a clean nested loop — some DPs branch in ways that are awkward to linearize into nested for-loops but fall straight out of the recursive definition. It also has one genuine edge: if, for a particular input, only a fraction of the full table of subproblems is ever actually reached by the recursion, memoization computes only those, while naive tabulation fills every cell of the table regardless of whether the final answer needs it. When every subproblem is reachable — true for essentially every problem in this chapter — the two cost the same.

GATE TRAP: "Tabulation is always asymptotically faster than memoization" is false. Both do Θ(states × work-per-state) in the worst case; memoization's only overhead is a constant-factor cost per call (the recursion and the cache lookup), not an extra asymptotic term. Do not confuse "avoids recursion overhead" (a constant-factor statement) with "asymptotically faster" (a false one).

OPTIMAL SUBSTRUCTURE, MADE PRECISE

Optimal substructure was defined above as: an optimal solution to the problem can be constructed from optimal solutions to its subproblems. This sounds almost too obvious to be useful, so it is worth seeing a case where it visibly holds and a case where it visibly fails, because the failing case is exactly what makes some problems NP-hard while their close cousins are easy.

It holds for shortest paths. Suppose the shortest path from u to v in a graph passes through some vertex w. Then the portion of that path from u to w must itself be a shortest u-to-w path, and the portion from w to v must be a shortest w-to-v path. Why must this be true? If the u-to-w portion were not shortest, you could splice in a shorter u-to-w path and get a shorter overall u-to-v path — contradicting the assumption that you started with the shortest one. So the whole is genuinely built from optimal pieces, and this is exactly what lets shortest-path algorithms (Dijkstra, Bellman–Ford, Floyd–Warshall, and DAG shortest paths) be written as dynamic programs.

It fails for the longest SIMPLE path — a path that is not allowed to repeat any vertex. Take a longest simple path from u to w and a longest simple path from w to v, and glue them together at w. The result might not even be a valid simple path any more, because a vertex could appear in both pieces and now appears twice in the glued path. The two subproblems were each solved optimally in isolation, but their optimal solutions do not compose into an optimal — or even valid — solution to the whole. This single missing property is why the general longest-simple-path problem is NP-hard, while shortest path is solvable in polynomial time, and why plain (non-simple) longest path on a DAG — where no vertex can repeat anyway, since a DAG has no cycles — is solvable by exactly the same style of DP as shortest path.

GATE TRAP: "Optimal substructure fails for longest paths in general" is over-broad and wrong as stated for DAGs. It fails specifically for longest SIMPLE paths in graphs that can contain cycles, because that is where the repeated-vertex problem can arise. On a DAG, longest path (simple by construction, since there is no way to revisit a vertex without a cycle) has optimal substructure and is solved by a DP with the very same recurrence shape as shortest path, just replacing min with max.

THE FOUR-STEP METHOD

Every dynamic program in this chapter — and, honestly, nearly every dynamic program you will meet in the syllabus — is built the same way. Memorizing the four steps is far less useful than practicing them, but naming them gives you a checklist for any DP problem you have not seen before.

1. Characterize the structure of an optimal solution. Ask: if I already had an optimal solution, what would the last decision in it look like, and what smaller subproblem(s) would remain after that decision? (Last cut of a rod, last item considered in a knapsack, last character compared in two strings, last split point in a chain of matrices.)
2. Define the recurrence. Write the value of an optimal solution to a problem of size n in terms of optimal solutions to strictly smaller subproblems, plus base cases for the smallest instances.
3. Compute the value bottom-up (or top-down with memoization), filling every subproblem needed exactly once, in an order where every subproblem's dependencies are already filled when it is reached.
4. Reconstruct an actual optimal solution, not just its value, by retracing which choice was taken at each step — usually by keeping a second table of "which choice achieved the minimum/maximum here" alongside the value table, or by re-deriving the choice from the filled table directly.

Every worked problem from here on follows these four steps in order, and it is worth noticing that step 1 is the only one requiring insight — steps 2 through 4 are close to mechanical once step 1 is right.

DYNAMIC PROGRAMMING VERSUS DIVIDE AND CONQUER

Both paradigms rest on optimal substructure: both build a solution to a problem out of solutions to its subproblems. The distinguishing fact is whether those subproblems overlap.

Merge sort's subproblems are the left half and the right half of the array — disjoint index ranges that share no element. Nothing computed for the left half is ever needed again while sorting the right half, so there is nothing to cache; each subproblem genuinely is solved exactly once, automatically, with no special bookkeeping. Divide and conquer is, in a sense, the special case of the same idea where the "overlap" that DP is built to handle simply does not occur.

Dynamic programming's subproblems overlap by design — the same (i, j) pair, the same remaining capacity, the same prefix pair, recurs across many different branches of the recursion, which is exactly the situation Fibonacci demonstrated. The moment you notice a divide-and-conquer-style recursion revisiting the same arguments, the fix is not a cleverer split; it is a table.

DYNAMIC PROGRAMMING VERSUS GREEDY

Greedy algorithms and DP both solve optimization problems with optimal substructure, but they differ in how much of the search space they actually examine. A greedy algorithm makes one choice at each step — the one that looks best right now — and never revisits it. This is only correct when the problem has the much stronger greedy-choice property: some locally best choice is guaranteed to be part of some globally optimal solution, so committing to it early never rules out the true optimum.

Dynamic programming makes no such gamble. At each subproblem it considers every choice available, evaluates the best achievable outcome under each one using already-computed smaller subproblems, and only then commits — via a max or min over all the choices — to the one that turns out best.

The 0/1 knapsack problem is the cleanest place to see greedy actually fail. Capacity 5, items (weight, value) = (2, 3), (3, 4), (4, 5), (5, 6). The value-per-weight ratios are 1.5, 1.33, 1.25, 1.2, so the greedy-by-ratio strategy takes the item with ratio 1.5 first (weight 2, value 3), then the next best that still fits — weight 3, value 4 — filling the capacity exactly and stopping at value 7. In this particular instance, it happens to land on the true optimum. But nothing about the greedy rule guarantees that: change any of the weights slightly and greedy-by-ratio can pick a set that leaves capacity wasted while a different combination it never gets back to would have used it better. The fractional knapsack — where you are allowed to take part of an item — genuinely is solved correctly by the same greedy-by-ratio rule, because a fraction can always mop up whatever capacity is left over; it is exactly the "all-or-nothing" constraint of 0/1 knapsack that breaks the greedy argument and forces you to keep every option open, which is what the DP table below does.

KEY: Greedy commits to one choice and never reconsiders it; DP evaluates every choice and takes the best. Greedy is only valid when a proof of the greedy-choice property exists for that specific problem. When no such proof exists — as in 0/1 knapsack — DP is not "the safer version of greedy"; it is the only correct one.

MEASURING THE COST OF A DYNAMIC PROGRAM

Every complexity claim in this chapter is produced the same way, and it is worth stating the method once so you can reproduce it on a recurrence you have never seen.

time = (number of distinct subproblems) × (time to compute one subproblem from its already-solved dependencies)

Count the subproblems from the table's index ranges (a table indexed by two prefix lengths 0..m and 0..n has (m+1)(n+1) entries; a table indexed by an interval [i, j] with 1 ≤ i ≤ j ≤ n has Θ(n²) entries). Count the work per entry from how many other entries its recurrence looks at (a constant number of neighbors is Θ(1) per entry; a scan over all split points k is Θ(n) per entry). Multiply. This is the entire method — no further cleverness is needed, and it is exactly what every complexity answer below is doing.

ROD CUTTING

A rod of length n can be cut into pieces of any integer lengths that sum to n (or sold whole), and a given piece of length i sells for a fixed price price[i]. The problem: choose a way of cutting the rod (possibly not cutting it at all) that maximizes total revenue.

Step 1 — structure of an optimal solution. Look at the leftmost piece of an optimal cutting, of some length i (1 ≤ i ≤ n). Whatever remains, a rod of length n − i, must itself be cut optimally — if it were not, you could improve just that portion and increase total revenue, contradicting optimality of the whole.

Step 2 — the recurrence. Let dp[n] be the maximum revenue from a rod of length n. Trying every possible length of that first piece and taking the best:

dp[n] = max( price[i] + dp[n-i] )  for i = 1..n

with dp[0] = 0 (nothing to cut, nothing to earn).

Step 3 — compute bottom-up. Take price = [1, 5, 8, 9, 10, 17, 17, 20] for lengths 1 through 8 (the classic instance), and fill dp[0] through dp[8] in increasing order of length, since dp[n] needs only dp[0..n-1].

dp[0] = 0
dp[1] = price[1]+dp[0] = 1
dp[2] = max(price[1]+dp[1], price[2]+dp[0]) = max(1+1, 5+0) = 5
dp[3] = max(1+5, 5+1, 8+0) = 8
dp[4] = max(1+8, 5+5, 8+1, 9+0) = 10
dp[5] = max(1+10, 5+8, 8+5, 9+1, 10+0) = 13
dp[6] = max(1+13, 5+10, 8+8, 9+5, 10+1, 17+0) = 17
dp[7] = max(1+17, 5+13, 8+10, 9+8, 10+5, 17+1, 17+0) = 18
dp[8] = max(1+18, 5+17, 8+13, 9+10, 10+8, 17+5, 17+1, 20+0) = 22

The table: dp = [0, 1, 5, 8, 10, 13, 17, 18, 22] for lengths 0 through 8. So the best revenue from length 8 is 22 — not the 20 you would get selling the rod whole, and, notice, not the 20 you would get from four pieces of length 2 either (4 × 5 = 20), even though length-2 pieces have the best price-per-unit-length (5/2 = 2.5). The optimum, 22, comes from price[2] + dp[6] = 5 + 17 = 22: a piece of length 2 and a piece of length 6.

Step 4 — reconstruct. Keep, alongside dp, a table first[n] recording which first-piece length i achieved the maximum. first[8] = 2 (from price[2]+dp[6] = 22): cut off a length-2 piece, leaving a length-6 subproblem. first[6] = 6 (price[6]+dp[0] = 17 is the best option for length 6 — do not cut it further). So the optimal cutting of the length-8 rod is two pieces: one of length 2, one of length 6.

GATE TRAP: The naive per-unit-price argument — "always cut off the piece with the best price/length ratio" — is a greedy strategy, and rod cutting is exactly the kind of problem where it is not guaranteed correct, for the same reason 0/1 knapsack is not: the pieces are all-or-nothing, and locking in the best single ratio first can leave an awkward remainder that no combination handles as well as a different first cut would have.

COIN CHANGE — TWO DIFFERENT RECURRENCES

"Coin change" is actually two different problems that share a table shape and get confused constantly, because they use the same recurrence skeleton with one crucial difference in loop order.

Minimum number of coins. Given denominations and a target amount, find the fewest coins that sum to exactly the amount. Structure: the optimal way to make amount a uses some last coin c, and the remaining a − c must be made optimally with the fewest coins.

dp[a] = 1 + min( dp[a-c] )  over every denomination c ≤ a

with dp[0] = 0 and dp[a] = ∞ if no combination reaches a. This dp is symmetric in the coins — order of consideration does not matter, because you are asking a pure minimum over all denominations at every amount.

Work this for denominations {1, 2, 5}, target 11:

dp[0]=0, dp[1]=1, dp[2]=1, dp[3]=2, dp[4]=2, dp[5]=1, dp[6]=2, dp[7]=2, dp[8]=3, dp[9]=3, dp[10]=2, dp[11]=3

dp[11] = 3, achieved by 5 + 5 + 1. Check: no pair of these coins sums to 11 (5+5=10, 5+2=7, 5+1=6, 2+2=4, and so on, all short of 11), so 3 is genuinely minimal, not merely what greedy-by-largest-coin happens to find (which, for {1,2,5}, agrees here, but need not for every coin system).

Number of ways to make change (combinations, order irrelevant). Here you are not minimizing anything — you are counting how many distinct multisets of coins sum to the amount, where {2,2,1} and {1,2,2} are the same multiset and must be counted once, not three times.

The trick is the loop order: iterate over coin denominations in the OUTER loop, and amounts in the INNER loop, updating dp[a] += dp[a-c] for each coin c in turn. Processing coin c fully before moving to the next coin means a coin already "used" in the outer loop can never be reintroduced as if it were a different, later first choice — which is exactly what prevents permutations of the same multiset from being counted separately.

For {1, 2, 5}, target 5: initialize dp = [1, 0, 0, 0, 0, 0] (dp[0]=1: the empty combination).
After processing coin 1 (dp[a] += dp[a-1] for a=1..5): dp = [1, 1, 1, 1, 1, 1].
After processing coin 2 (dp[a] += dp[a-2] for a=2..5): dp[2]=1+1=2, dp[3]=1+1=2, dp[4]=1+2=3, dp[5]=1+2=3 → dp = [1, 1, 2, 2, 3, 3].
After processing coin 5 (dp[5] += dp[0]): dp[5] = 3+1 = 4 → dp = [1, 1, 2, 2, 3, 4].

dp[5] = 4: the combinations are {5}, {2,2,1}, {2,1,1,1}, {1,1,1,1,1}.

GATE TRAP: Swap the loop order — amount in the outer loop, coins in the inner loop, updating dp[a] as the sum over every coin of dp[a-c] — and you count ORDERED sequences (permutations) instead: for target 4 with steps {1, 2}, this gives dp[a] = dp[a-1] + dp[a-2], the Fibonacci recurrence itself, producing dp[4] = 5 (the sequences [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2]) rather than the 3 unordered combinations {1,1,1,1}, {1,1,2}, {2,2}. A GATE question that says "how many ways" without specifying combination or permutation is testing whether you notice which one the described loop order actually computes — read the loop order, not the word "ways".

0/1 KNAPSACK

n items, each with a weight and a value; a knapsack of capacity W; each item may be taken at most once (hence "0/1" — take it or don't). Maximize total value without exceeding W.

Step 1 — structure. Consider item n, the last one, in an optimal solution. Either it is excluded — in which case the rest of the solution is an optimal solution to the same problem using only items 1..n-1 and the full capacity W — or it is included, in which case the rest is an optimal solution using items 1..n-1 and the reduced capacity W − weight(n), plus value(n) for the item itself.

Step 2 — the recurrence. Let K[i][w] be the best value achievable using only the first i items with capacity w.

K[i][w] = max( K[i-1][w], v_i + K[i-1][w - w_i] )  if w_i ≤ w, else K[i][w] = K[i-1][w]

with K[0][w] = 0 for all w (no items, no value) and K[i][0] = 0 for all i (no room).

[[FIG:knapsack-table]]

Step 3 — fill the table. Items (weight, value) = (1,1), (3,4), (4,5), (5,7), capacity W = 7. Fill row by row, item by item, capacity 0 to 7 left to right within each row — every cell only needs the row above, so this order is always safe.

Row i=0 (no items): [0, 0, 0, 0, 0, 0, 0, 0]

Row i=1 (item weight 1, value 1): for every w ≥ 1, K[1][w] = max(0, 1+K[0][w-1]) = 1.
Row 1: [0, 1, 1, 1, 1, 1, 1, 1]

Row i=2 (item weight 3, value 4): K[2][w] = max(row1[w], 4+row1[w-3]) for w ≥ 3.
w=3: max(1, 4+row1[0]=4) = 4
w=4: max(1, 4+row1[1]=5) = 5
w=5: max(1, 4+row1[2]=5) = 5
w=6: max(1, 4+row1[3]=5) = 5
w=7: max(1, 4+row1[4]=5) = 5
Row 2: [0, 1, 1, 4, 5, 5, 5, 5]

Row i=3 (item weight 4, value 5): K[3][w] = max(row2[w], 5+row2[w-4]) for w ≥ 4.
w=4: max(5, 5+row2[0]=5) = 5
w=5: max(5, 5+row2[1]=6) = 6
w=6: max(5, 5+row2[2]=6) = 6
w=7: max(5, 5+row2[3]=9) = 9
Row 3: [0, 1, 1, 4, 5, 6, 6, 9]

Row i=4 (item weight 5, value 7): K[4][w] = max(row3[w], 7+row3[w-5]) for w ≥ 5.
w=5: max(6, 7+row3[0]=7) = 7
w=6: max(6, 7+row3[1]=8) = 8
w=7: max(9, 7+row3[2]=8) = 9
Row 4: [0, 1, 1, 4, 5, 7, 8, 9]

K[4][7] = 9 is the answer.

Step 4 — reconstruct which items. Start at K[4][7]=9. Compare to K[3][7]=9: equal, so item 4 was NOT taken — move up to (3,7). Compare K[3][7]=9 to K[2][7]=5: different, so item 3 WAS taken (value 5); subtract its weight, move to (2, 7-4=3). Compare K[2][3]=4 to K[1][3]=1: different, so item 2 WAS taken (value 4); subtract its weight, move to (1, 3-3=0). K[1][0]=0 equals K[0][0]=0, so item 1 was not taken. Total: items 2 and 3 — weights 3+4=7, values 4+5=9. Matches.

KEY: The recurrence's "include item i" branch, v_i + K[i-1][w-w_i], does not mean "value of item i alone" — K[i-1][w-w_i] can itself already contain other earlier items packed into the remaining capacity. Reconstructing correctly means tracing the whole chain of decisions, not reading off one branch in isolation.

WHY WEIGHTS MUST BE INTEGERS, AND WHAT "PSEUDO-POLYNOMIAL" MEANS

The table above is indexed by capacity w running through every integer from 0 to W. This only makes sense — and only produces a table of manageable size — because weights are integers: every reachable remaining capacity is itself an integer between 0 and W, so there are exactly W+1 distinct capacities to ever ask about. If weights could be arbitrary real numbers, the set of capacities that could ever arise as w − w_i for some sequence of items would be uncountable, and there would be no finite table to fill at all — you would be back to trying every subset directly.

time = (number of distinct subproblems) × (time to compute one subproblem)

The table has (n+1)(W+1) entries and each takes Θ(1) time to fill, giving total time Θ(nW). This looks polynomial — but only in the numeric VALUE of W, not in the size of its encoding. A computer stores W in binary using only b = ⌈log₂ W⌉ bits, so W = 2ᵇ, and Θ(nW) is really Θ(n·2ᵇ) — exponential in b, the actual input size. An algorithm whose running time is polynomial in the numeric value of its input but exponential in the number of bits used to write that input down is called pseudo-polynomial. This is exactly why 0/1 knapsack and subset sum can be NP-hard (their decision versions have no known polynomial-in-bits algorithm) while still having a DP that runs fast whenever W happens to be small relative to n — the DP is efficient precisely when the numbers involved are polynomially bounded, and slow again the moment W is exponentially large (say, W = 2ⁿ).

GATE TRAP: "Pseudo-polynomial" does not mean "uses randomization," "only works for small n," or "an approximation." It has one specific meaning: polynomial in the value of a numeric input, exponential in that input's bit-length. Confusing this with "approximate" or "probabilistic" is a wrong answer every time it appears as a distractor.

SPACE REDUCTION TO O(W), AND WHY DIRECTION MATTERS

Look again at the recurrence: row i only ever reads from row i-1. Nothing in row i is ever needed once row i+1 has been computed. So instead of keeping n+1 full rows, keep a single array of size W+1, representing "the row so far," and update it in place for each item.

The direction of the inner loop over w is now critical. Process w from W down to w_i (descending): when you compute dp[w] = max(dp[w], v_i + dp[w-w_i]), the value dp[w-w_i] you read has index strictly smaller than w, and — because you are moving downward — that smaller index has not yet been touched in this item's pass, so it still holds last item's (row i-1's) value. Correct.

Process w upward instead (ascending, from w_i to W) and dp[w-w_i] may already have been overwritten earlier in this same pass, meaning it can reflect item i already being used once — so adding v_i on top effectively lets item i be counted a second time. Trace it on items (1,1),(3,4),(4,5),(5,6) starting from dp after item 1 = [0,1,1,1,1,1,1,1], processing item 2 (weight 3, value 4) ascending: dp[3] = max(1, 4+dp[0]=4) = 4; dp[4] = max(1, 4+dp[1]=5) = 5; dp[5] = max(1, 4+dp[2]=5) = 5; dp[6] = max(1, 4+dp[3]=4+4=8) = 8. Compare to the correct descending result for the same step, which gave dp[6] = 5 (row 2, capacity 6, above). The ascending pass's dp[6] = 8 corresponds to taking item 2 TWICE (weight 3+3=6, value 4+4=8) — silently computing the unbounded knapsack instead of the 0/1 knapsack, without any error message.

GATE TRAP: "The iteration direction for the 1-D knapsack array does not matter" is one of the most common wrong statements on this topic. It matters precisely because descending order guarantees you read the previous row's value, and ascending order does not.

THE UNBOUNDED KNAPSACK

That accidental bug is, in fact, the correct recurrence for a different, legitimate problem: the unbounded knapsack, where each item may be used any number of times (think: making change with unlimited coins of each denomination, or cutting a rod into unlimited pieces of stock lengths). Change the include-term's index from K[i-1][w-w_i] to K[i][w-w_i] — deliberately allowing item i to still be available after taking it once — and the recurrence

U[w] = max over items i of ( v_i + U[w - w_i] )

correctly allows repetition, needing only a single one-dimensional array indexed by capacity, filled with capacity increasing (ascending is now correct, because reuse is exactly what you want). This one-index difference between "0/1" and "unbounded" is a favorite way GATE tests whether you actually understand the recurrence rather than having memorized its shape.

LONGEST COMMON SUBSEQUENCE

Given two strings X (length m) and Y (length n), a common subsequence is a sequence of characters that appears, in order but not necessarily contiguously, in both strings. The problem: find the length of the longest one (and, often, the subsequence itself).

Step 1 — structure. Compare the last character of X (call it X[m]) with the last character of Y (Y[n]). If they are equal, then some longest common subsequence of X and Y must end in that shared character — you can always extend the LCS of the two prefixes X[1..m-1] and Y[1..n-1] by this matching character, and no LCS can do better than that, since dropping either final character from consideration in this case can only lose information. If X[m] ≠ Y[n], the LCS cannot use both of these final characters together, so it is the better of two options: the LCS ignoring X's last character, or the LCS ignoring Y's last character.

Step 2 — the recurrence. Let L[i][j] be the LCS length of the first i characters of X and the first j characters of Y.

L[i][j] = L[i-1][j-1] + 1        if X[i] = Y[j]
L[i][j] = max(L[i-1][j], L[i][j-1])   if X[i] ≠ Y[j]

with L[i][0] = 0 and L[0][j] = 0 for all i, j (an empty string shares nothing with anything).

[[FIG:lcs-table]]

Step 3 — fill the table. X = "CATGA" (m=5), Y = "ACGTA" (n=5). Rows are i = 0..5 (prefixes of X), columns j = 0..5 (prefixes of Y), filled row by row, left to right — every cell needs only the cell above, to the left, or diagonally above-left, all of which are already filled in this order.

Row 0 (base): 0 0 0 0 0 0
Row 1 (X[1]=C): j=1 Y=A mismatch max(0,0)=0; j=2 Y=C match 0+1=1; j=3 Y=G mismatch max(0,1)=1; j=4 Y=T mismatch max(0,1)=1; j=5 Y=A mismatch max(0,1)=1.
Row 1: 0 0 1 1 1 1
Row 2 (X[2]=A): j=1 Y=A match 0+1=1; j=2 Y=C mismatch max(1,1)=1; j=3 Y=G mismatch max(1,1)=1; j=4 Y=T mismatch max(1,1)=1; j=5 Y=A match 1+1=2.
Row 2: 0 1 1 1 1 2
Row 3 (X[3]=T): j=1 mismatch max(1,0)=1; j=2 mismatch max(1,1)=1; j=3 mismatch max(1,1)=1; j=4 Y=T match 1+1=2; j=5 mismatch max(2,2)=2.
Row 3: 0 1 1 1 2 2
Row 4 (X[4]=G): j=1 mismatch max(1,0)=1; j=2 mismatch max(1,1)=1; j=3 Y=G match 1+1=2; j=4 mismatch max(2,2)=2; j=5 mismatch max(2,2)=2.
Row 4: 0 1 1 2 2 2
Row 5 (X[5]=A): j=1 Y=A match 0+1=1; j=2 mismatch max(1,1)=1; j=3 mismatch max(2,1)=2; j=4 mismatch max(2,2)=2; j=5 Y=A match 2+1=3.
Row 5: 0 1 1 2 2 3

L[5][5] = 3.

Step 4 — reconstruct by tracing back from (5,5). X[5]=A, Y[5]=A match → take 'A', move diagonally to (4,4). X[4]=G, Y[4]=T mismatch; L[3][4]=2 and L[4][3]=2 tie — take the "up" move, to (3,4). X[3]=T, Y[4]=T match → take 'T', move to (2,3). X[2]=A, Y[3]=G mismatch; L[1][3]=1 and L[2][2]=1 tie — take "left," to (2,2). X[2]=A, Y[2]=C mismatch; L[1][2]=1 and L[2][1]=1 tie — take "up," to (1,2). X[1]=C, Y[2]=C match → take 'C', move to (0,1), where a base row stops the trace. Characters collected, in the reverse order they were found: A, T, C — reverse them to read forward: "CTA", a valid length-3 common subsequence of "CATGA" and "ACGTA".

Step complexity: (m+1)(n+1) entries, Θ(1) work each — Θ(mn) time overall, Θ(mn) space for the full table (or Θ(min(m,n)) if only the length, not the reconstruction, is needed, since each row only needs the one before it).

GATE TRAP: The number of table entries is (m+1)(n+1), not m·n — the zero row and zero column for the empty-prefix base cases are real entries that must be counted. A question asking "how many subproblems does LCS solve" that offers m·n as an option is testing exactly this omission.

LONGEST INCREASING SUBSEQUENCE

Given an array, find the length of the longest strictly increasing subsequence (again, not necessarily contiguous).

Step 1 — structure. For a subsequence ending exactly at index i, its second-to-last element must be some earlier index j with a[j] < a[i], and the subsequence up to j must itself be the longest increasing subsequence ending at j — otherwise you could improve the prefix and lengthen the whole thing.

Step 2 — the recurrence. Let dp[i] be the length of the longest increasing subsequence ending exactly at index i.

dp[i] = 1 + max( dp[j] : j < i and a[j] < a[i] ),  or dp[i] = 1 if no such j exists

The answer to the whole problem is max over all i of dp[i] — the best subsequence can end anywhere.

Step 3 — trace on a = [10, 9, 2, 5, 3, 7, 101, 18].

dp[0]=1 (10, alone)
dp[1]=1 (9: nothing smaller before it — 10 is not less than 9)
dp[2]=1 (2: nothing smaller before it)
dp[3]=2 (5: only 2 is smaller before it, dp[2]=1, so 1+1=2)
dp[4]=2 (3: only 2 is smaller before it, dp[2]=1, so 1+1=2)
dp[5]=3 (7: smaller-before are 2(dp1), 5(dp2), 3(dp2) — best is 2, so 2+1=3)
dp[6]=4 (101: everything before it is smaller — best dp among indices 0..5 is dp[5]=3, so 3+1=4)
dp[7]=4 (18: smaller-before excludes 101 — best among {10,9,2,5,3,7} is dp[5]=3 for the element 7, so 3+1=4)

dp = [1, 1, 1, 2, 2, 3, 4, 4]. Maximum is 4, achieved by 10, 22... here specifically by 10, 5→ no — read off an actual witness: index2(2, dp1)→index3(5,dp2)→index5(7,dp3)→index6(101,dp4): the subsequence 2, 5, 7, 101 has length 4.

Step complexity: n subproblems, each scanning up to n earlier entries, giving Θ(n²) total.

GATE TRAP: dp[i] must scan every earlier index j with a[j] < a[i], not just the immediately preceding element. On array [3,1,4,1,5,9,2,6], the element 2 at index 6 has 9 sitting right before it at index 5, but 9 is not less than 2, so it contributes nothing to dp[6] — only the two earlier 1's (both dp=1) qualify, giving dp[6] = 1+1 = 2, not something influenced by the much larger dp[5]=4. Checking only the immediate predecessor instead of every valid earlier index is a frequent tracing error.

THE FASTER LIS: PATIENCE SORTING

The Θ(n²) DP above tries every earlier index for every position. A faster method maintains an array tails, where tails[k] is the smallest possible value that any increasing subsequence of length k+1 can end on seen so far. For each new element, binary-search tails for the first entry that is ≥ the new element and overwrite it (or append, if the element is larger than everything in tails); the final length of tails is the LIS length.

Run it on the same array [10, 9, 2, 5, 3, 7, 101, 18]:
10 → tails=[10]. 9 → 9<10, replace: tails=[9]. 2 → replace: tails=[2]. 5 → 5>2, append: tails=[2,5]. 3 → find first ≥3, that is 5 at index1, replace: tails=[2,3]. 7 → 7>3, append: tails=[2,3,7]. 101 → append: tails=[2,3,7,101]. 18 → find first ≥18, that is 101 at index3, replace: tails=[2,3,7,18].

Final length of tails is 4 — the same answer, reached without ever storing an n×n dependency, because each new element does one binary search (Θ(log n)) instead of one linear scan (Θ(n)). Total time Θ(n log n).

KEY: The tails array is not a real subsequence of the input — its entries get overwritten as better (smaller) tail values are found, so at no point can you read tails off the screen and call it "an increasing subsequence of this length." Only its final LENGTH is meaningful. If a question asks for the actual subsequence, not just its length, patience sorting needs extra parent-pointer bookkeeping on top of the array; the Θ(n²) DP above hands you the actual subsequence directly by walking back through dp[].

EDIT DISTANCE

Given two strings X (length m) and Y (length n), find the minimum number of single-character insertions, deletions, and substitutions needed to transform X into Y.

Step 1 — structure. Look at the last characters, X[i] and Y[j]. If they match, no operation is spent on them, and the answer for prefixes of length i, j reduces to the answer for i-1, j-1. If they do not match, the last operation applied — going backward — must be one of exactly three things: substitute X[i] for Y[j] (leaving the problem for i-1, j-1), delete X[i] (leaving i-1, j), or insert Y[j] (leaving i, j-1). Each costs 1, plus whatever the resulting smaller subproblem costs; take the cheapest of the three.

Step 2 — the recurrence. Let D[i][j] be the edit distance between the first i characters of X and the first j characters of Y.

D[i][j] = D[i-1][j-1]                                  if X[i] = Y[j]
D[i][j] = 1 + min( D[i-1][j-1], D[i-1][j], D[i][j-1] )       if X[i] ≠ Y[j]

with D[i][0] = i (delete all of X's remaining prefix) and D[0][j] = j (insert all of Y's remaining prefix).

Step 3 — fill the table for X = "SUNDAY" (m=6) and Y = "SATURDAY" (n=8). Row 0 and column 0 are the base cases; every other cell is filled left to right, top to bottom.

Row 0: 0 1 2 3 4 5 6 7 8
Row 1 (S): 1 0 1 2 3 4 5 6 7
Row 2 (U): 2 1 1 2 2 3 4 5 6
Row 3 (N): 3 2 2 2 3 3 4 5 6
Row 4 (D): 4 3 3 3 3 4 3 4 5
Row 5 (A): 5 4 3 4 4 4 4 3 4
Row 6 (Y): 6 5 4 4 5 5 5 4 3

Reading a couple of cells to confirm the recurrence is really being applied: D[2][4] compares "SU" to "SATU"; last characters U and U match, so D[2][4] = D[1][3] = 2 — matches the table. D[6][8], the final answer, compares full "SUNDAY" to full "SATURDAY"; last characters Y and Y match, so D[6][8] = D[5][7] = 3.

D[6][8] = 3. Since "SATURDAY" is two characters longer than "SUNDAY," at least 2 insertions are unavoidable no matter what alignment is chosen, and "SUNDAY" contains an N that "SATURDAY" does not, forcing at least one more operation — so 2 is impossible and 3 is optimal. A witness sequence: SUNDAY → SATUNDAY (insert A after S) → SATURNDAY... — the DP guarantees the count is minimal (3) regardless of which specific 3 edits realize it; one valid alignment inserts 'A' and 'T' and substitutes 'N' for 'R'.

Step complexity: (m+1)(n+1) entries, Θ(1) each, giving Θ(mn) time and space — exactly the same accounting as LCS, because it is built on the same kind of two-prefix table.

GATE TRAP: LCS's mismatch case takes a max over only TWO neighbors (up, left) and never looks diagonally. Edit distance's mismatch case takes 1 + a min over THREE neighbors (up, left, AND diagonal). Mixing these two recurrences up — using LCS's rule for edit distance or vice versa — is one of the most common exam errors on this pair of problems, precisely because the tables look identical at a glance.

HOW EDIT DISTANCE RELATES TO LCS

If only insertions and deletions were allowed (no substitution), the minimum number of operations to turn X into Y would be exactly (m − L) + (n − L), where L is the LCS length: delete every character of X not in the LCS, insert every character of Y not in the LCS. Substitution is what makes plain edit distance sometimes cheaper than that — a mismatched pair of characters can be fixed with one substitution instead of one deletion plus one insertion — which is why edit distance with substitution can be strictly smaller than the LCS-derived insert/delete-only count, and why the two problems, despite nearly identical tables, are not the same problem.

MATRIX-CHAIN MULTIPLICATION

Multiplying a p×q matrix by a q×r matrix takes p·q·r scalar multiplications and produces a p×r result. Multiplying a chain of matrices A₁A₂...Aₙ, matrix multiplication is associative — the final product is the same no matter how you parenthesize it — but the total number of scalar multiplications needed to get there is not the same, because different parenthesizations produce different-sized intermediate matrices.

Take three matrices: A (10×20), B (20×30), C (30×40). Parenthesizing as (AB)C: computing AB costs 10·20·30 = 6000 and yields a 10×30 matrix; multiplying that by C costs 10·30·40 = 12000; total 18000. Parenthesizing as A(BC): computing BC costs 20·30·40 = 24000 and yields a 20×40 matrix; multiplying A by that costs 10·20·40 = 8000; total 32000. Same final matrix, same mathematical result — 18000 versus 32000 scalar multiplications, nearly a factor of two, purely from the order of grouping.

Step 1 — structure. Consider the outermost multiplication in an optimal parenthesization of the chain Aᵢ...Aⱼ: it splits the chain after some position k, computing (Aᵢ...Aₖ) and (Aₖ₊₁...Aⱼ) separately and multiplying the two results. Both of those sub-chains must themselves be optimally parenthesized — an optimal whole cannot contain a suboptimal piece, by the usual exchange argument.

Step 2 — the recurrence. Let matrix Aₖ have dimensions p[k-1] × p[k] for k = 1..n, and let m[i][j] be the minimum scalar-multiplication cost to compute the product Aᵢ...Aⱼ.

m[i][j] = min over k (i ≤ k < j) of ( m[i][k] + m[k+1][j] + p[i-1]·p[k]·p[j] )

with m[i][i] = 0 (a single matrix needs no multiplication).

Step 3 — fill the table by increasing chain length. Take four matrices with p = [30, 35, 15, 5, 10] — A1: 30×35, A2: 35×15, A3: 15×5, A4: 5×10.

[[FIG:mcm-fill]]

Chain length 1 (base case): m[1][1]=m[2][2]=m[3][3]=m[4][4]=0.

Chain length 2:
m[1][2] = p0·p1·p2 = 30·35·15 = 15750
m[2][3] = p1·p2·p3 = 35·15·5 = 2625
m[3][4] = p2·p3·p4 = 15·5·10 = 750

Chain length 3:
m[1][3]: k=1: m[1][1]+m[2][3]+p0·p1·p3 = 0+2625+30·35·5 = 2625+5250 = 7875. k=2: m[1][2]+m[3][3]+p0·p2·p3 = 15750+0+30·15·5 = 15750+2250 = 18000. Minimum 7875 at k=1.
m[2][4]: k=2: m[2][2]+m[3][4]+p1·p2·p4 = 0+750+35·15·10 = 750+5250 = 6000. k=3: m[2][3]+m[4][4]+p1·p3·p4 = 2625+0+35·5·10 = 2625+1750 = 4375. Minimum 4375 at k=3.

Chain length 4:
m[1][4]: k=1: m[1][1]+m[2][4]+p0·p1·p4 = 0+4375+30·35·10 = 4375+10500 = 14875. k=2: m[1][2]+m[3][4]+p0·p2·p4 = 15750+750+30·15·10 = 15750+750+4500 = 21000. k=3: m[1][3]+m[4][4]+p0·p3·p4 = 7875+0+30·5·10 = 7875+1500 = 9375. Minimum 9375 at k=3.

m[1][4] = 9375. The full table, laid out with rows i and columns j:

m[1][1]=0  m[1][2]=15750  m[1][3]=7875  m[1][4]=9375
            m[2][2]=0      m[2][3]=2625  m[2][4]=4375
                            m[3][3]=0     m[3][4]=750
                                          m[4][4]=0

The s-table (best split point, filled alongside): s[1][2]=1, s[2][3]=2, s[3][4]=3, s[1][3]=1, s[2][4]=3, s[1][4]=3.

Step 4 — reconstruct the parenthesization from the s-table. s[1][4]=3 splits the full chain into (A1A2A3)(A4). Within (A1..A3), s[1][3]=1 splits it into (A1)(A2A3). So the optimal parenthesization is ((A1(A2A3))A4).

Step complexity: m[i][j] is defined for 1 ≤ i ≤ j ≤ n, giving Θ(n²) entries; each entry minimizes over up to n-1 split points, Θ(n) work. Total: Θ(n²)·Θ(n) = Θ(n³) time, Θ(n²) space for m (and another Θ(n²) for s).

m[i,j] = min over k of ( m[i,k] + m[k+1,j] + p[i-1]·p[k]·p[j] )

THE COUNT OF PARENTHESIZATIONS

How many distinct ways are there to parenthesize a chain of n matrices in the first place? Let P(n) be that count. The outermost split happens after some position k (1 ≤ k ≤ n-1), splitting the chain into a length-k piece and a length-(n-k) piece, each parenthesized independently:

P(n) = Σ P(k)·P(n-k)  over k = 1..n-1,  with P(1) = 1

This is exactly the Catalan number recurrence. P(n) = C(n-1), the (n-1)-th Catalan number, equal to (1/n)·C(2n-2, n-1). Small values: P(2)=1, P(3)=2, P(4)=5, P(5)=14. Catalan numbers grow as Θ(4ⁿ/n^1.5) — exponential — which is exactly why brute-force enumeration of every parenthesization is hopeless for even moderately long chains, and why the Θ(n³) DP above (which never enumerates parenthesizations directly, only split points within each interval) is the only practical approach. The same Catalan sequence also counts the number of distinct binary trees with n leaves — the two counting problems are the same problem in different clothing, since a parenthesization of a chain corresponds exactly to a binary tree shape with the matrices as leaves.

P(n) = C(n-1) = (1/n) · C(2n-2, n-1)

OPTIMAL BINARY SEARCH TREE

A related interval-DP problem: given n keys with known search probabilities, arrange them into a binary search tree that minimizes the expected number of comparisons per search. The structure is the same as matrix-chain: an optimal tree over keys i..j has some root r, and the left and right subtrees (over keys i..r-1 and r+1..j) must themselves be optimal, giving a recurrence

e[i][j] = min over r of ( e[i][r-1] + e[r+1][j] + w(i,j) )

where w(i,j) is the sum of probabilities of keys i..j (accounting for every key in the subtree being one comparison deeper once it is not the root). The table is filled by increasing interval length exactly as matrix-chain's is, giving the same Θ(n³) naive complexity (a more advanced technique, exploiting a monotonicity in the optimal root, brings this down to Θ(n²), a refinement beyond what is needed here). The point to take away is recognition: any time a problem's optimal structure is "pick a splitting element inside an interval, and both resulting sub-intervals must themselves be optimal," it is being solved by the same interval-DP recurrence shape as matrix-chain multiplication.

LONGEST PALINDROMIC SUBSEQUENCE

Find the length of the longest subsequence of a string that reads the same forwards and backwards.

Step 1 — structure. If the first and last characters of the current interval match, they can both be included in the palindrome, contributing 2, with the rest of the palindrome built from the interval strictly between them. If they do not match, the best palindrome in this interval must drop one end or the other.

Step 2 — the recurrence. Let L[i][j] be the LPS length of the substring from index i to index j.

L[i][j] = L[i+1][j-1] + 2      if s[i] = s[j]
L[i][j] = max(L[i+1][j], L[i][j-1])   if s[i] ≠ s[j]

with L[i][i] = 1 (a single character is a palindrome of length 1).

Step 3 — trace on s = "ABCA" (positions 1-4). Base: L[1][1]=L[2][2]=L[3][3]=L[4][4]=1. Length-2 intervals all mismatch (A≠B, B≠C, C≠A), giving L[1][2]=max(1,1)=1, L[2][3]=max(1,1)=1, L[3][4]=max(1,1)=1. Length-3: L[1][3] ("ABC"), s[1]=A≠s[3]=C, max(L[2][3],L[1][2])=max(1,1)=1; L[2][4] ("BCA"), s[2]=B≠s[4]=A, max(L[3][4],L[2][3])=max(1,1)=1. Length-4: L[1][4] ("ABCA"), s[1]=A=s[4]=A, match, so L[2][3]+2 = 1+2 = 3.

L[1][4] = 3 — the longest palindromic subsequence of "ABCA" has length 3 (for example, "ACA" or "ABA," both valid palindromic subsequences preserving order). Filling this table is identical in shape to the LCS table, and in fact LPS can equivalently be computed as the LCS of a string with its own reverse — a useful cross-check, and a common way GATE frames the same problem to test whether you spot the connection.

SUBSET SUM AND PARTITION — KNAPSACK VARIANTS

Subset sum asks: given n positive integers and a target S, does some subset sum to exactly S? Structure: a subset of the first i numbers sums to s either by not using the i-th number (so some subset of the first i-1 does) or by using it (so some subset of the first i-1 sums to s minus that number).

B[i][s] = B[i-1][s]  OR  B[i-1][s - a_i]      (the second term only when a_i ≤ s)

with B[0][0] = true and B[0][s] = false for s > 0. The table has (n+1)(S+1) boolean entries, each Θ(1), for Θ(nS) time — pseudo-polynomial in exactly the same sense as knapsack, and consistent with subset sum being NP-complete: the DP is fast only when S is polynomially bounded. Space reduces to Θ(S) with the same one-row trick as knapsack, iterating s downward for the same reason (to read the previous row's value, not one already overwritten this pass).

The partition problem — can a set of numbers be split into two subsets with equal sums? — is a direct application: compute the total sum, and if it is odd, no equal partition can exist at all (an odd total can never split into two equal integer halves); if it is even, ask subset sum with target S = total/2. Finding such a subset is sufficient, because whatever is left over automatically also sums to total/2. This is subset sum wearing a different name, not a new algorithm.

COUNTING GRID PATHS WITH OBSTACLES

A traveler starts at the top-left cell of a grid and may move only right or down, ending at the bottom-right cell; certain cells are blocked. Count the number of distinct paths. (The assembly-line scheduling problem from the classic DP canon has this same two-choices-per-step shape — at each station, continue on the same line or pay to switch — and is solved by an identical recurrence over two parallel "lines" instead of a grid's two directions.)

Step 1 — structure. A path reaches cell (i, j) either from the cell directly above, (i-1, j), or from the cell directly to the left, (i, j-1) — those are the only two ways to have just moved right or down into (i, j).

Step 2 — the recurrence. Let dp[i][j] be the number of paths from the start to (i, j).

dp[i][j] = dp[i-1][j] + dp[i][j-1],   forced to 0 if (i,j) is blocked or out of bounds

with dp[0][0] = 1 (one way to be at the start: stay there).

Step 3 — a 4×4 grid, start (0,0), destination (3,3), obstacles at (1,1) and (2,3). Fill row by row, each row left to right.

Row 0: 1 1 1 1
Row 1: dp[1][0]=1 (from above); dp[1][1]=0 (OBSTACLE — forced to zero regardless of what dp[0][1]+dp[1][0]=1+1=2 would otherwise give); dp[1][2]=dp[0][2]+dp[1][1]=1+0=1; dp[1][3]=dp[0][3]+dp[1][2]=1+1=2.
Row 1: 1 0 1 2
Row 2: dp[2][0]=1; dp[2][1]=dp[1][1]+dp[2][0]=0+1=1; dp[2][2]=dp[1][2]+dp[2][1]=1+1=2; dp[2][3]=0 (OBSTACLE — forced to zero, ignoring dp[1][3]+dp[2][2]=2+2=4).
Row 2: 1 1 2 0
Row 3: dp[3][0]=1; dp[3][1]=dp[2][1]+dp[3][0]=1+1=2; dp[3][2]=dp[2][2]+dp[3][1]=2+2=4; dp[3][3]=dp[2][3]+dp[3][2]=0+4=4.
Row 3: 1 2 4 4

dp[3][3] = 4 distinct paths.

GATE TRAP: An obstacle cell must be forced to exactly 0 regardless of what its incoming sum would otherwise compute — a common tracing slip is to zero out only the first obstacle encountered and forget to re-apply the same rule to every subsequent obstacle cell, letting "phantom" paths pass straight through a later blocked cell.

MAXIMUM SUBARRAY SUM — KADANE'S ALGORITHM AS A DP

Find the contiguous subarray with the largest sum. This is phrased as a scanning trick, but it is a one-dimensional DP once you see the subproblem.

Step 1 — structure. For each position i, consider the best sum of a subarray that ends exactly at i. Either that subarray is just the single element a[i] on its own, or it extends the best subarray ending at i-1 by adding a[i] to it. Whichever of those two is larger is the best subarray ending at i.

Step 2 — the recurrence.

dp[i] = max( a[i], dp[i-1] + a[i] )

with the overall answer being max over all i of dp[i], since the best subarray overall can end anywhere.

Step 3 — trace on [-2, 1, -3, 4, -1, 2, 1, -5, 4]. dp = [-2, 1, -2, 4, 3, 5, 6, 1, 5]: dp[0]=-2; dp[1]=max(1,-2+1)=1; dp[2]=max(-3,1-3)=-2; dp[3]=max(4,-2+4)=4; dp[4]=max(-1,4-1)=3; dp[5]=max(2,3+2)=5; dp[6]=max(1,5+1)=6; dp[7]=max(-5,6-5)=1; dp[8]=max(4,1+4)=5. The maximum over dp is 6, achieved at index 6 — the subarray [4, -1, 2, 1]. One pass, Θ(n) time, and — because dp[i] only ever needs dp[i-1] — Θ(1) space, keeping only a running "best ending here" value and a running overall best.

DYNAMIC PROGRAMMING ON GRAPHS — A PREVIEW

Two of the standard shortest-path algorithms, covered fully in the graph algorithms chapter, are dynamic programs by exactly the same four-step method used throughout this chapter, and it is worth naming them here so the connection is not missed later.

Floyd–Warshall computes all-pairs shortest paths by defining d^(k)[i][j] as the shortest path from i to j using only intermediate vertices numbered 1 through k. Its recurrence — either the path does not need vertex k at all, or it does, splitting into an i-to-k piece and a k-to-j piece, both restricted to intermediates 1..k-1 — is

d^(k)[i][j] = min( d^(k-1)[i][j], d^(k-1)[i][k] + d^(k-1)[k][j] )

filled for k = 1 to V, giving Θ(V³) time: exactly the subproblems-times-work-per-subproblem accounting from earlier (V² pairs (i,j), V layers of k, Θ(1) work per cell).

Bellman–Ford computes single-source shortest paths by defining the subproblem "shortest path from the source using at most k edges," relaxing every edge once per round and repeating V-1 rounds — enough rounds because any shortest path in a graph with no negative cycle uses at most V-1 edges. Its DP structure is what also lets it detect negative cycles: if a V-th round still finds an improvement, no legitimate shortest path explains it, and a negative cycle must exist.

Neither algorithm is developed further here — both belong to, and are developed in full in, the graph chapter — but recognizing "these are dynamic programs on a table indexed by (vertex pair, number of allowed intermediates or edges)" is itself a piece of understanding this chapter is responsible for.

TRAVELING SALESMAN — DP ON SUBSETS

Some problems have optimal substructure but a state space that is itself exponential, and dynamic programming still helps — just not enough to make the problem polynomial. The Traveling Salesman Problem (visit every city exactly once and return to the start, minimizing total cost) can be solved with the state dp[mask][j]: the minimum cost to have visited exactly the set of cities in the bitmask mask, currently standing at city j.

dp[mask][j] = min over every city k in mask (k ≠ j) of ( dp[mask without j][k] + cost(k, j) )

The number of distinct states is 2ⁿ masks times n possible current cities, and each state's transition tries up to n previous cities, giving time Θ(n²·2ⁿ) — the Held–Karp bound. This is a dramatic improvement over brute-force enumeration of all (n-1)! Hamiltonian cycles, but it is still exponential in n, which is expected and correct: TSP is NP-hard, and no known reformulation — DP included — makes the number of distinct subproblems themselves polynomial. This is the general lesson optimal substructure alone does not guarantee a fast algorithm; the count of distinct subproblems must also be polynomially bounded, and here it provably is not (every subset of cities is potentially a distinct state).

READING A RECURRENCE YOU HAVE NEVER SEEN

Every worked problem above started from a named, familiar problem. GATE sometimes instead simply hands you a recurrence with no name attached and a partially filled table, and asks you to continue filling it or to state what quantity it computes. The skill is identical to everything above — find the base cases, find what each cell depends on, and fill in dependency order — it is only unfamiliar because there is no story to hang it on.

Take T(n) = T(⌊n/3⌋) + T(⌊2n/3⌋) + n for n ≥ 2, with T(0) = 0 and T(1) = 1. Fill it bottom-up up to T(9), tracking the floor divisions carefully at each step.

T(0)=0, T(1)=1
T(2) = T(⌊2/3⌋)+T(⌊4/3⌋)+2 = T(0)+T(1)+2 = 0+1+2 = 3
T(3) = T(⌊3/3⌋)+T(⌊6/3⌋)+3 = T(1)+T(2)+3 = 1+3+3 = 7
T(4) = T(⌊4/3⌋)+T(⌊8/3⌋)+4 = T(1)+T(2)+4 = 1+3+4 = 8
T(5) = T(⌊5/3⌋)+T(⌊10/3⌋)+5 = T(1)+T(3)+5 = 1+7+5 = 13
T(6) = T(⌊6/3⌋)+T(⌊12/3⌋)+6 = T(2)+T(4)+6 = 3+8+6 = 17
T(7) = T(⌊7/3⌋)+T(⌊14/3⌋)+7 = T(2)+T(4)+7 = 3+8+7 = 18
T(8) = T(⌊8/3⌋)+T(⌊16/3⌋)+8 = T(2)+T(5)+8 = 3+13+8 = 24
T(9) = T(⌊9/3⌋)+T(⌊18/3⌋)+9 = T(3)+T(6)+9 = 7+17+9 = 33

T(9) = 33. Notice the only genuine difficulty here is bookkeeping — computing each floor division correctly and reading the already-filled table at the right index — exactly the two things the four-step method trains you to be careful about.

A second one: a "tribonacci" recurrence, f(n) = f(n-1) + f(n-2) + f(n-3), f(0)=0, f(1)=0, f(2)=1. This has a constant lookback — every value needs only the three before it — so it can be tabulated keeping just three running variables instead of a full array: f(3)=f(2)+f(1)+f(0)=1+0+0=1, f(4)=f(3)+f(2)+f(1)=1+1+0=2, f(5)=f(4)+f(3)+f(2)=2+1+1=4, f(6)=f(5)+f(4)+f(3)=4+2+1=7. Computing f(n) this way costs Θ(n) time and Θ(1) space — the same space-reduction idea as plain Fibonacci, generalizing to any recurrence whose dependency reaches back only a fixed constant number of previous states. Contrast this with LCS or knapsack, whose recurrences need an entire previous row, not a fixed handful of scalars, and so cannot be reduced below Θ(row size) space by this same trick.

GATE TRAP: Space reducibility to O(1) depends entirely on how far back a recurrence's dependencies reach, not on how "simple" the recurrence looks. A recurrence needing an entire previous row (LCS, knapsack, edit distance) needs Θ(row) space at minimum; one needing only a fixed number of previous scalar values (Fibonacci, tribonacci) needs only Θ(1). Do not generalize a Θ(1)-space result from one recurrence shape to another that does not share it.

WHERE THE BOUNDARY IS: PSEUDO-POLYNOMIAL VERSUS NP-HARD

It can look paradoxical that 0/1 knapsack and subset sum are officially classified as NP-hard while this chapter just solved both of them with a table and a couple of nested loops. The resolution is the pseudo-polynomial distinction from earlier: Θ(nW) and Θ(nS) are fast only because W and S, as numbers, were kept small relative to n in every example worked above. Complexity theory measures against the number of BITS needed to write the input down, and W or S written in binary can be exponentially large relative to n while still being "one number" — at which point Θ(nW) becomes exponential in the true input size, and no contradiction with NP-hardness remains. This is also why the Traveling Salesman DP above, at Θ(n²·2ⁿ), is not pseudo-polynomial in the same rescuing way: its exponential factor comes from the number of subsets of cities, a quantity with no numeric magnitude to bound independently of n — there is no analogous "keep W small" escape hatch for it. The practical takeaway: a DP with a numeric parameter in its complexity (weight, sum, capacity) is worth checking for pseudo-polynomiality before calling it efficient in general; a DP whose complexity already involves 2ⁿ is telling you plainly that the underlying problem has no known polynomial algorithm at all.

WORKED PROBLEMS

1. What is the length of the LCS of X = "AGCAT" and Y = "GAC," and does the string "GAC" itself appear as that LCS?
   Write X = A(1) G(2) C(3) A(4) T(5) and Y = G(1) A(2) C(3). Check whether "GAC" is a genuine subsequence of X first: it needs increasing indices in X for G, then A, then C. The only G in X is at index 2; the only A after index 2 is at index 4; but C must then appear after index 4, and the only C in X is at index 3 — before 4, not after. So "GAC" is NOT a subsequence of X at all, and cannot be the LCS. Filling the DP table for X (rows) against Y (columns) row by row: after processing all of X, dp[5][3] = 2, with "GA" (X's G at index 2, A at index 4, matching Y's G and A in order) as a valid witness. LCS length is 2, achieved by "GA" — not 3, despite "GAC" tempting you to assume the full string Y is a subsequence of X.

2. Coin denominations {1, 2, 5}. Using the standard DP (not greedy), find (a) the minimum number of coins for amount 11, and (b) the number of distinct combinations (order irrelevant) for amount 5.
   (a) dp[a] = 1 + min(dp[a-c]) over coins c ≤ a, dp[0]=0: dp = [0,1,1,2,2,1,2,2,3,3,2,3] for a=0..11. dp[11]=3, via 5+5+1 — no pair of these coins reaches 11 (largest pair sum is 5+5=10), confirming 3 is minimal.
   (b) With coin in the outer loop, amount in the inner loop: after coin 1, dp=[1,1,1,1,1,1]; after coin 2, dp=[1,1,2,2,3,3]; after coin 5, dp[5] becomes 3+dp[0]=4. dp[5]=4, the combinations being {5}, {2,2,1}, {2,1,1,1}, {1,1,1,1,1}.

3. Items (weight, value) = (1,1), (3,4), (4,5), (5,7), capacity W = 7. Find the maximum value and the chosen items using the 0/1 knapsack DP.
   Filling row by row (items 1..4, capacities 0..7) gives final row [0,1,1,4,5,7,8,9], so the maximum value is 9. Tracing back: K[4][7]=9 equals K[3][7]=9, so item 4 is excluded. K[3][7]=9 differs from K[2][7]=5, so item 3 (weight 4, value 5) is included, dropping to capacity 3. K[2][3]=4 differs from K[1][3]=1, so item 2 (weight 3, value 4) is included, dropping to capacity 0. Chosen items: (3,4) and (4,5), total weight 7, total value 9.

4. Matrices A1 (30×35), A2 (35×15), A3 (15×5), A4 (5×10). Find the minimum scalar-multiplication cost and the optimal parenthesization.
   Filling by chain length: m[1][2]=15750, m[2][3]=2625, m[3][4]=750; m[1][3]=7875 (k=1), m[2][4]=4375 (k=3); m[1][4]=9375 (k=3, beating k=1's 14875 and k=2's 21000). Minimum cost is 9375. From s[1][4]=3: split into (A1A2A3) and (A4); from s[1][3]=1: split (A1A2A3) into (A1) and (A2A3). Optimal parenthesization: ((A1(A2A3))A4).

5. Array [10, 9, 2, 5, 3, 7, 101, 18]. Find the LIS length using the O(n²) DP, and separately using the tails-array method.
   O(n²): dp = [1,1,1,2,2,3,4,4], maximum 4 (witness 2,5,7,101). Tails-array: 10→[10]; 9→[9]; 2→[2]; 5→[2,5]; 3→[2,3]; 7→[2,3,7]; 101→[2,3,7,101]; 18→[2,3,7,18]. Final tails length 4. Both methods agree: LIS length 4.

6. Compute the edit distance between "SUNDAY" and "SATURDAY," and identify the single last operation that determines D[3][5] (comparing "SUN" to "SATUR").
   The full table gives D[6][8] = 3. D[3][5] compares "SUN" (last character N) to "SATUR" (last character U); since N ≠ U, D[3][5] = 1 + min(D[2][4], D[2][5], D[3][4]) = 1 + min(2, 3, 3) = 3, and the minimum is achieved uniquely by the diagonal term D[2][4] — meaning the determining operation is a SUBSTITUTION (replacing N with U), not an insertion or deletion.

7. A DP algorithm has a two-dimensional state space of size n×m, computed once by top-down memoization and once by bottom-up tabulation. Compare their time and space complexity, and state the one situation in which they can differ.
   Both compute every reachable state exactly once (memoization via its cache check, tabulation via its fixed fill order), so both run in Θ(nm) time and use Θ(nm) space for the table or cache, identically in the worst case. The one situation where they can differ: if, for a specific input, the recursion never actually reaches some subset of the n×m states, memoization computes only the states genuinely needed, while a naive tabulation that fills the whole table regardless of reachability does strictly more work. When every state is reachable — the normal case for every problem in this chapter — the two are equal.

8. A 4×4 grid has obstacles at (1,1) and (2,3) (0-indexed), start (0,0), destination (3,3), moves right or down only. How many distinct paths are there?
   Row 0: [1,1,1,1]. Row 1: dp[1][1] forced to 0 (obstacle) despite dp[0][1]+dp[1][0]=2; row becomes [1,0,1,2]. Row 2: dp[2][3] forced to 0 (obstacle) despite dp[1][3]+dp[2][2]=2+2=4; row becomes [1,1,2,0]. Row 3: dp[3][3]=dp[2][3]+dp[3][2]=0+4=4. Answer: 4 distinct paths.

9. A recurrence is given as T(n) = T(⌊n/3⌋) + T(⌊2n/3⌋) + n for n ≥ 2, T(0)=0, T(1)=1. What is T(9)?
   Filling bottom-up with the floor divisions tracked at each step: T(2)=3, T(3)=7, T(4)=8, T(5)=13, T(6)=17, T(7)=18, T(8)=24, T(9)=T(3)+T(6)+9=7+17+9=33. T(9) = 33.

WHAT TO CARRY INTO THE NEXT CHAPTER

Dynamic programming is a way of paying for a table once so you never pay for the same subproblem twice; every problem in this chapter reduced to finding the right table, the right recurrence over its cells, and the right order to fill it. Graph algorithms take this exact machinery and apply it to graphs directly: Floyd–Warshall's table is indexed by a pair of vertices and a bound on which intermediates are allowed, Bellman–Ford's by a vertex and a bound on the number of edges used, and shortest-path-on-a-DAG is a direct instance of the optimal-substructure argument made here for shortest paths in general. Recognize the same four-step method inside each of them, and that chapter will feel like an application of this one rather than a fresh subject.
`
};
