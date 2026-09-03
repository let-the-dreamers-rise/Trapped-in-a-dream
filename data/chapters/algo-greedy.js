// Textbook chapter: Greedy Algorithms.
//
// Full teaching text, written to be learned from directly. Format is the plain-text
// convention renderTheory() understands: ALL-CAPS lines are section headings, "• "
// starts a bullet, "1. " a numbered step, "KEY:" and "GATE TRAP:" make callout
// cards, a lone equation becomes a formula block, and [[FIG:id]] places a figure —
// two are already defined on this topic in data/questions/algo.js (activity-selection,
// huffman-build) and are referenced here without redefinition; two new ones are
// added below.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['algo-greedy'] = {
  figs: [
    {
      id: 'edf-vs-sjf',
      caption: 'Same three jobs, two schedules. SJF minimises average completion time; EDF minimises maximum lateness. Neither rule optimises the objective of the other.',
      svg: '<svg viewBox="0 0 380 150" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" fill="currentColor"><text x="10" y="16">SJF (by burst length)</text><text x="10" y="88">EDF (by deadline)</text></g><g stroke="currentColor" stroke-width="1.4" fill="none"><rect x="10" y="24" width="40" height="24"/><rect x="50" y="24" width="80" height="24"/><rect x="130" y="24" width="160" height="24"/><rect x="10" y="96" width="160" height="24"/><rect x="170" y="96" width="80" height="24"/><rect x="250" y="96" width="40" height="24"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="30" y="40">J1</text><text x="90" y="40">J2</text><text x="210" y="40">J3</text><text x="90" y="112">J3</text><text x="210" y="112">J2</text><text x="270" y="112">J1</text><text x="30" y="60" font-size="9">C=40</text><text x="90" y="60" font-size="9">C=120</text><text x="210" y="60" font-size="9">C=280</text></g><line x1="10" y1="132" x2="290" y2="132" stroke="currentColor" stroke-width="1" marker-end="url(#ah-efs)"/><defs><marker id="ah-efs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><text x="150" y="146" font-size="10" text-anchor="middle" fill="currentColor">time</text></svg>'
    },
    {
      id: 'optimal-merge-tree',
      caption: 'Optimal merge of four sorted files of lengths 20, 30, 10, 5 — merging two smallest each time is Huffman on the file sizes.',
      svg: '<svg viewBox="0 0 300 172" width="100%" style="max-width:400px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" text-anchor="middle" fill="currentColor"><circle cx="150" cy="18" r="17" fill="none" stroke="currentColor"/><text x="150" y="22">65</text><line x1="140" y1="32" x2="95" y2="58" stroke="currentColor"/><line x1="160" y1="32" x2="205" y2="58" stroke="currentColor"/><circle cx="95" cy="66" r="15" fill="none" stroke="currentColor"/><text x="95" y="70">35</text><circle cx="205" cy="66" r="15" fill="none" stroke="currentColor"/><text x="205" y="70">30</text><line x1="86" y1="78" x2="60" y2="108" stroke="currentColor"/><line x1="104" y1="78" x2="130" y2="108" stroke="currentColor"/><circle cx="60" cy="116" r="13" fill="none" stroke="currentColor"/><text x="60" y="120" font-size="10">15</text><circle cx="130" cy="116" r="13" fill="none" stroke="currentColor"/><text x="130" y="120" font-size="10">20</text><line x1="52" y1="127" x2="35" y2="150" stroke="currentColor"/><line x1="68" y1="127" x2="85" y2="150" stroke="currentColor"/><circle cx="35" cy="157" r="12" fill="none" stroke="currentColor"/><text x="35" y="161" font-size="10">5</text><circle cx="85" cy="157" r="12" fill="none" stroke="currentColor"/><text x="85" y="161" font-size="10">10</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

Divide-and-conquer split a problem into independent pieces and combined their answers. Dynamic programming solved every distinct subproblem once and remembered the answer, because subproblems overlapped. This chapter is about a third strategy, and it is the simplest of the three to run and the hardest to trust: at each step, make whichever choice looks best right now, commit to it, and never look back.

That is a greedy algorithm. It never reconsiders a choice, it never explores alternatives, it never backtracks. When a problem happens to have the right structure, this reckless-looking strategy produces a solution that is not just good but provably optimal, and it usually runs in the time it takes to sort the input. When the problem does not have that structure, greedy produces a solution that can be arbitrarily far from optimal, with nothing about the algorithm's behaviour warning you that it has gone wrong.

The entire chapter is organised around one question: how do you know, before running a greedy algorithm, whether it is correct? We will build two properties that answer this, a proof template that uses them, and then apply the template to every classical greedy algorithm on the GATE syllabus — activity selection, fractional knapsack, Huffman coding, job sequencing, interval partitioning, minimum-completion-time and minimum-lateness scheduling, and optimal merging — before turning the same lens on MST and shortest-path algorithms, which you have already met as graph algorithms and will here recognise as instances of the same idea. We finish by cataloguing exactly how and why greedy fails, because knowing the failure pattern is what lets you tell, on sight, whether a new problem is a greedy problem at all.

THE GREEDY PARADIGM, STATED PRECISELY

A greedy algorithm builds a solution incrementally. At each step it has a set of choices available, and it picks the one that is locally best according to some simple rule — largest ratio, earliest deadline, smallest weight, whatever the problem calls for. Once made, that choice is fixed for the rest of the algorithm: no step ever revisits an earlier decision to see if a different one would have done better.

Contrast this with the other two strategies you know. Brute force would try every possible combination of choices and keep the best. Dynamic programming would consider both taking and not taking a choice, solve both resulting subproblems, and combine — but critically, it solves the SAME subproblem many times across different branches, which is why it memoises. Greedy solves exactly one subproblem after each choice: having chosen, there is only one way forward, not several branches to weigh.

KEY: A greedy algorithm makes one irrevocable local choice per step and solves exactly one resulting subproblem — never several, never revisited. That is what makes it fast; it is also exactly what makes it risky.

Because there is no revisiting, a greedy algorithm either gets the global optimum on the first (and only) try, or it gets something worse with no way to know from inside the algorithm. The entire burden of correctness sits outside the algorithm, in a proof that the local rule cannot lead astray. That proof is the real content of every "greedy algorithm" — the loop that implements it is usually five lines.

WHY LOCAL OPTIMALITY IS NOT ENOUGH ON ITS OWN

Here is the concern in its rawest form. Suppose you must pick a sequence of choices C1, C2, C3, ... to maximise some total. At step 1, several choices are available; you pick the one that looks best right now — call it g1. Is it possible that a *worse-looking* first choice leads, two or three steps later, to a better total than g1 ever permits?

In general, yes. Consider choosing a path down a small triangle of numbers where you may only step to an adjacent number in the row below, trying to maximise the sum:

3
7 4
2 4 6

Greedy-by-largest-next-step takes 3, then 7 (bigger than 4), then must go to 2 or 4 below 7 — say 4: total 3 + 7 + 4 = 14. But the path 3, 4, 6 gives 3 + 4 + 6 = 13, and 3, 7, 2 gives 12 — so the greedy path of 14 does happen to win here, but change the bottom row to 2, 1, 6 and greedy is forced from 7 into 2 or 1 (total 3+7+2=12 at best), while 3, 4, 6 gives 13. The locally larger first step (7 over 4) foreclosed the better global path. This is exactly the failure this chapter is built to help you predict.

So the question is never "does greedy sound reasonable" — it always sounds reasonable. The question is whether THIS problem has the special structure that makes local optimality accumulate into global optimality without ever needing to look ahead. Two properties, defined next, are exactly that structure.

THE GREEDY-CHOICE PROPERTY

A problem has the greedy-choice property if there exists some globally optimal solution that begins with the greedy algorithm's first choice. Read that carefully: it does not say every optimal solution uses the greedy choice, only that at least one does — so making that choice never rules out reaching the optimum, even if it means abandoning some other, equally optimal solutions that did not start that way.

Why does this matter operationally? Because it licenses the single most important simplification in this chapter: once you know some optimal solution starts with the greedy choice, you may lock that choice in and search only among solutions that agree with it. You have replaced "find the best solution" with "find the best solution GIVEN this first step" — a strictly smaller search — without losing anything, because the true optimum is still reachable inside that smaller search.

Example where the property holds: activity selection (defined fully below). Among all optimal (maximum-size) sets of non-overlapping activities, at least one contains the activity that finishes earliest of all — because that activity, finishing before every other, can always be swapped into the earliest slot of any optimal schedule without bumping anything out. We prove this properly later; for now, take it as the shape of the claim.

Example where the property fails: 0/1 knapsack with capacity 10 and items (weight 6, value 60), (weight 5, value 50), (weight 5, value 50). The greedy-by-ratio choice is the first item (ratio 10, versus 10 for the others — tie, but suppose it wins the tie): weight 6, value 60, capacity used up, nothing else fits. Total 60. But NO optimal solution contains that item: the optimum is the two weight-5 items together, value 100, and item 1 cannot appear in any solution alongside enough of the others to beat 100. The greedy choice is not just risky here — it is provably absent from every optimal solution. That is greedy-choice-property failure in its cleanest form.

KEY: The greedy-choice property does not claim the greedy pick is "good" in some vague sense — it makes an exact, checkable claim: some optimal solution starts with it. To disprove it for a problem, you need only exhibit one instance where the greedy pick is absent from every optimum, as above.

OPTIMAL SUBSTRUCTURE

The second requirement is one you already know from dynamic programming, but greedy needs a sharper version of it. A problem has optimal substructure if, once you fix an optimal first choice, the OPTIMAL solution to what remains — the residual problem, with that choice's effects removed — combines with the choice to give a global optimum.

In DP this residual problem could still be large and could recur in many overlapping forms, which is why DP explores many first choices and memoises. In a correctly-greedy problem, the residual problem, after the greedy choice is fixed, is simply a smaller instance of the SAME problem: same type of input, one fewer element, no branching needed, because the greedy-choice property has already told us this branch contains an optimum.

Example where it holds: after activity selection picks the earliest-finishing activity a1, the remaining problem — select a maximum set of activities from those starting at or after a1's finish — is again an activity-selection problem, just on a smaller set. Solve it the same way (greedily) and glue a1 to the front.

Example where it is more subtle: 0/1 knapsack DOES have optimal substructure in the ordinary DP sense (the optimal solution restricted to items 2..n, given whatever decision was made on item 1, is optimal for the reduced problem) — its failure is purely in the greedy-choice property, not here. This is worth sitting with: optimal substructure is necessary for greedy but does not by itself make greedy correct. Both properties are required together.

KEY: Optimal substructure alone justifies dynamic programming (many candidate first choices, each leaving an optimal-substructure residual, best combined by trying all and remembering). Greedy-choice property PLUS optimal substructure together justify never branching at all — you only ever need to solve the one residual problem left by the single greedy choice.

THE EXCHANGE ARGUMENT: A PROOF TEMPLATE

Both properties above are things you must prove for each new problem — they are not free. The standard proof technique is the exchange argument, and it is worth learning as a fixed four-step template you can run on any candidate greedy rule.

1. Assume, for contradiction, that some optimal solution OPT differs from the greedy solution G.
2. Find the first point where OPT and G disagree — the first choice OPT makes that is not the greedy choice.
3. Show that swapping OPT's choice at that point for the greedy choice keeps the solution FEASIBLE (still a legal solution to the problem) and does not DECREASE its objective value (still at least as good).
4. Repeat on the modified solution, which now agrees with G one step further than before. After finitely many swaps (at most n, the size of the instance), OPT has been transformed into exactly G, with its value never having decreased — so G's value is at least OPT's value, and since OPT was optimal, G is optimal too.

Two things make an exchange argument valid, and a broken greedy rule always breaks one of them. Feasibility: the swap must not violate whatever constraint defines a legal solution (capacity, non-overlap, deadline). Non-decrease: the swap must not lower the objective. In every failing greedy algorithm you will meet later in this chapter — 0/1 knapsack, general coin systems, negative-weight Dijkstra — you can point to exactly which of these two the swap breaks.

GATE TRAP: A question sometimes gives you a purported exchange-argument proof for a false greedy rule and asks which step is invalid. It is always step 3 — the swap either breaks feasibility (you can no longer fit the remaining items, the schedule now conflicts) or it lowers the value (the total drops). Steps 1, 2 and 4 are just bookkeeping and are never the flawed step.

REMEMBER: Exchange arguments always move OPT toward G, never the reverse. You are showing "any optimum can be edited, without loss, until it becomes what greedy built" — not "greedy can be edited into something else."

With the tools built, we now apply them one problem at a time. Each one follows the same script: state the problem, state the rule, show two or three rules that look equally plausible and fail, run the correct rule on a full example with the state shown after every step, then give the exchange-argument proof.

ACTIVITY SELECTION

You are given n activities, each with a start time and a finish time, all sharing one resource (one lecture hall, one machine). Two activities are compatible if their intervals do not overlap (touching at an endpoint is allowed — one can start exactly when the other finishes). The problem: select the LARGEST possible set of mutually compatible activities. Note precisely what is being maximised — the COUNT of activities selected, not the total duration they cover and not anything about idle time.

[[FIG:activity-selection]]

THE RULE, AND WHY THREE OTHER RULES FAIL FIRST

The correct rule is: sort activities by finish time, and greedily take each activity, in that order, whose start time is not before the finish time of the last activity taken. Before proving this, see why the obviously-tempting alternatives are all wrong — each has a small counterexample worth memorising by shape, not just by number.

Earliest start time first. Counterexample: activity X = (0, 10) starts first of all but occupies the entire day, blocking five other activities that could each fit in a 2-hour slot elsewhere. Picking X first (because it starts earliest) yields a set of size 1; earliest-finish would instead pick the short activities and get 5 or more.

Shortest duration first. Counterexample: activities (0, 1), (0.5, 2), (1, 2). The shortest is neither of the two compatible ones — take (2,3) duration 1 vs a pair like (2,3) and (3,4) each duration 1 that together beat a single long one, or concretely: A=(1,4) duration 3, B=(0,2) duration 2, C=(2,5) duration 3. Shortest-first picks B (duration 2), which is compatible with C — giving {B, C}, size 2, actually matching earliest-finish here; the standard breaking case is a short activity that straddles the gap between two other compatible activities, e.g. A=(0,5), B=(4,6) short duration 2 sitting across the middle, C=(5,10): shortest is B (duration 2), chosen first, and it conflicts with C's start at 5 only if B's finish exceeds 5 — set B=(3,6): now B conflicts with both A and C, and picking B first (shortest) leaves the set {B}, size 1, while earliest-finish picks A=(0,5) first (finishes at 5, tied or earlier), then C=(5,10), giving size 2.

Fewest conflicts first. Counting how many other activities each one overlaps and taking the least-conflicted one first also fails: an activity can have few conflicts simply because few other activities exist in that region, while still being a poor structural choice compared to the one that frees the earliest time. Constructing a clean numeric counterexample takes a slightly larger instance (five or more activities clustered so that a low-conflict activity in a sparse region blocks a high-value cluster elsewhere), but the principle is the same as the other two failures: none of these rules directly optimises "leave the most room for what comes after," which is precisely what earliest-finish does.

GATE TRAP: All three wrong rules "sound greedy" and a rushed reader accepts whichever one the question states as if it were the standard algorithm. The only rule with a proof is earliest finish time. If a question states a different sorting key and asks whether the resulting algorithm is correct, the answer is no unless it can be shown equivalent to finish-time ordering on that instance.

THE EXCHANGE-ARGUMENT PROOF FOR EARLIEST-FINISH

Let activities be sorted by finish time f1 <= f2 <= ... <= fn. Let G be the greedy solution (built by the rule above) and let OPT be any optimal solution. Order OPT's activities by finish time too, as o1, o2, ..., ok.

1. Claim: f(g1) <= f(o1), i.e. greedy's first pick finishes no later than OPT's first pick. This holds because g1 is DEFINED as the activity with the smallest finish time among ALL n activities, and o1 is some activity among those n — so g1's finish time can only be less than or equal to o1's.
2. Because g1 finishes no later than o1, and o1 is compatible with the rest of OPT (o2, ..., ok, all starting at or after o1's finish, hence at or after g1's finish too), g1 is also compatible with o2, ..., ok. So the set {g1, o2, o3, ..., ok} is feasible and has the same size k as OPT — the swap in step 3 of the template neither breaks feasibility nor loses value (size is unchanged, and size is the whole objective here).
3. Repeat this argument on the residual problem: among activities starting at or after g1's finish, g2 is by construction the earliest-finishing one, and by the same reasoning it finishes no later than o2 finishes, so it can replace o2 without breaking compatibility with o3, ..., ok.
4. After k such swaps, OPT has become exactly {g1, g2, ..., gk}, with size unchanged throughout. So greedy's solution has size at least k = |OPT|. Since OPT was optimal, greedy's size cannot exceed k either — greedy achieves exactly the optimum.

FULL TRACE ON TEN ACTIVITIES

Activities, given as (start, finish): A(1,4), B(3,5), C(0,6), D(5,7), E(3,9), F(5,9), G(6,10), H(8,11), I(8,12), J(2,14).

1. Sort by finish time: A(1,4), B(3,5), C(0,6), D(5,7), E(3,9), F(5,9), G(6,10), H(8,11), I(8,12), J(2,14).
2. Take A(1,4) unconditionally — it is first in sorted order. Last finish time so far = 4. Selected = {A}.
3. B(3,5): start 3 < 4 — conflicts with A. Reject. Selected = {A}.
4. C(0,6): start 0 < 4 — conflicts. Reject. Selected = {A}.
5. D(5,7): start 5 >= 4 — compatible. Take it. Last finish time = 7. Selected = {A, D}.
6. E(3,9): start 3 < 7 — conflicts. Reject. Selected = {A, D}.
7. F(5,9): start 5 < 7 — conflicts. Reject. Selected = {A, D}.
8. G(6,10): start 6 < 7 — conflicts. Reject. Selected = {A, D}.
9. H(8,11): start 8 >= 7 — compatible. Take it. Last finish time = 11. Selected = {A, D, H}.
10. I(8,12): start 8 < 11 — conflicts. Reject.
11. J(2,14): start 2 < 11 — conflicts. Reject.

Final selection: {A, D, H} = {(1,4), (5,7), (8,11)}, size 3. Every other activity conflicts with one of these three at the moment it is considered, and the proof above guarantees no schedule of size 4 exists for this instance (the intervals are packed too tightly between 0 and 14 to fit four mutually disjoint ones once A, D, H have claimed [1,4], [5,7], [8,11] — the only gaps left, [4,5] and [7,8], are too narrow for any listed activity).

Sorting costs Theta(n log n); the single left-to-right scan that follows costs Theta(n), each activity examined once and compared against one stored value (the last finish time). Total:

T(n) = Theta(n log n)

FRACTIONAL KNAPSACK

You have a knapsack of capacity W and n items, item i with weight w_i and value v_i. Unlike 0/1 knapsack, you may take any fraction 0 <= x_i <= 1 of an item, gaining x_i * v_i for x_i * w_i weight. Maximise total value subject to total weight <= W.

WHY RATIO ORDER IS THE RIGHT RULE

Define the ratio r_i = v_i / w_i — value per unit weight. The greedy rule: sort items by decreasing ratio, and fill capacity by taking as much as possible of each in that order — all of the highest-ratio item, then all of the next, and so on, until the remaining capacity is less than the next item's full weight, at which point take exactly that fraction of it and stop.

Why ratio and not raw value or raw weight? Because the objective is value gained per unit of the scarce resource (capacity), and ratio is exactly that quantity. Filling with the highest ratio first means every unit of capacity spent buys the most value it possibly can at that moment — and because fractions are allowed, there is no packing difficulty (no risk of "almost fitting" and wasting space) to trade off against this.

THE EXCHANGE-ARGUMENT PROOF

1. Suppose OPT does not take items in strictly decreasing ratio order — meaning some optimal solution has x_i < 1 for an item i (partially or not taken) while a lower-ratio item j has x_j > 0 (some of it taken), with r_i > r_j.
2. Take a small amount d <= min(x_i's unused capacity contribution, x_j's used amount) and swap: increase x_i's fraction by weight d, decrease x_j's fraction by weight d. Total weight used is unchanged (feasible — capacity constraint still met).
3. Value change = d * r_i - d * r_j = d * (r_i - r_j) > 0, since r_i > r_j. Value strictly increases.
4. This contradicts OPT being optimal (a better feasible solution existed). So no optimal solution can leave a higher-ratio item unfinished while spending capacity on a lower-ratio one — which is exactly the ratio-greedy order.

Notice how directly this proof uses fractionality: step 2's swap requires being able to move an arbitrary amount d of weight between two items, which is only possible because items are divisible. This is precisely the step that breaks for 0/1 knapsack, covered next.

FULL TRACE

Capacity W = 40. Items: I1 (weight 10, value 100), I2 (weight 20, value 120), I3 (weight 30, value 120).

1. Compute ratios: I1 = 100/10 = 10 per kg. I2 = 120/20 = 6 per kg. I3 = 120/30 = 4 per kg.
2. Sort by decreasing ratio: I1 (10), I2 (6), I3 (4).
3. Take all of I1: weight used 10, remaining capacity 40 - 10 = 30, value so far 100.
4. Take all of I2: weight used 10 + 20 = 30, remaining capacity 40 - 30 = 10, value so far 100 + 120 = 220.
5. I3 needs 30 kg but only 10 kg of capacity remains. Take the fraction 10/30 = 1/3 of I3: adds (1/3) * 120 = 40 value. Weight used = 40 (capacity exhausted exactly).
6. Total value = 100 + 120 + 40 = 260.

value(fractional knapsack) = 260

Sorting the n items by ratio costs Theta(n log n); the single pass that fills capacity costs Theta(n). Total Theta(n log n).

THE 0/1 COUNTEREXAMPLE — WHY THE SAME RULE FAILS WHEN ITEMS ARE INDIVISIBLE

This is the trap GATE returns to most often in this topic, so work it fully. Same items, same capacity 40, but now each item must be taken whole or not at all.

Ratio-greedy still proposes I1, I2 in ratio order: take I1 (weight 10, value 100), take I2 (weight 20, value 120) — total weight 30, value 220, remaining capacity 10. I3 needs weight 30 and cannot be split, so it is skipped entirely (10 kg of capacity is wasted). Greedy total = 220.

Is 220 optimal for 0/1? Check the alternatives directly: {I1, I3} needs weight 10+30 = 40, fits exactly, value 100+120 = 220 — ties greedy. {I2, I3} needs weight 20+30 = 50 > 40, infeasible. {I3} alone: value 120, worse. So on THIS instance greedy happens to match the optimum (220) — but that is a coincidence of these numbers, not a guarantee, and the standard counterexample shows the guarantee does not exist.

Standard counterexample: capacity 10, items (weight 6, value 60), (weight 5, value 50), (weight 5, value 50). Ratios: 60/6 = 10, 50/5 = 10, 50/5 = 10 — all tied, but suppose ties break toward the first-listed item, so greedy takes the weight-6 item (value 60), leaving 4 kg of capacity — too little for either weight-5 item. Greedy total = 60. The optimal 0/1 solution takes the two weight-5 items together: weight 10 exactly, value 100. Greedy misses it because indivisibility means it cannot "trade back" 1 kg of the first item once taken — the exchange-argument swap of the fractional proof (moving an arbitrary small weight d between two items) is impossible when items are atomic.

GATE TRAP: A very common wrong answer is to assume the ratio rule "still helps" for 0/1 knapsack, perhaps as a heuristic or upper bound. It IS a valid upper bound (the fractional optimum is never less than the 0/1 optimum, since 0/1 is a restriction of the fractional problem) but it is NOT a correct algorithm for 0/1 — the exchange argument that makes it correct for the fractional version depends on divisibility, which 0/1 does not have. The 0/1 problem needs dynamic programming, O(nW) time (pseudo-polynomial, since W appears as a magnitude not a bit-length), and is NP-hard in general when weights are unrestricted.

HUFFMAN CODING

Now a different flavour of greedy problem: not selecting a subset, but building a whole tree structure through repeated merges. The task: given n characters with frequencies (or probabilities) f(c), build a binary code — an assignment of a bit string to each character — that minimises the total encoded length of a message using those frequencies, subject to the code being uniquely decodable.

PREFIX CODES AND WHY THEY ARE UNIQUELY DECODABLE

A fixed-length code (every character gets the same number of bits, like ASCII) is trivially decodable — just read off bits in fixed chunks — but wastes space when frequencies are uneven. A variable-length code can do better IF no codeword is a prefix of another codeword: this is a prefix code (or prefix-free code). If codeword for 'a' is 01, no other character's code may start with 01.

Why does the prefix property guarantee unique decodability? Because a decoder reading bits left to right can stop and emit a character the MOMENT it matches some codeword — it never needs to look ahead to check whether a longer codeword starting the same way might also match, since the prefix property forbids that. Without it, a stream like 0110 could be ambiguous between reading '01' then '10' or '011' then '0', if both '01' and '011' were codewords.

Every prefix code corresponds to a binary tree: each leaf is a character, and the path from root to leaf, reading left-branch-as-0 and right-branch-as-1, gives the codeword. No codeword can be a prefix of another precisely because no leaf can lie on the path from the root to another leaf — leaves are exactly the nodes with no children, so one leaf is never an ancestor of another.

KEY: A prefix code is precisely a binary tree with characters at the leaves. Unique decodability follows directly from no leaf being an ancestor of another leaf. Building an optimal prefix code is therefore a tree-construction problem.

THE COST FUNCTION

If character c has frequency f(c) and its codeword has length depth(c) — its depth in the tree — then encoding a message uses depth(c) bits for every occurrence of c. The total length of an encoded message, or equivalently the expected number of bits per character weighted by frequency, is

cost(T) = sum over all characters c of f(c) * depth(c)

This is exactly what Huffman coding minimises. Deeper leaves are more expensive per occurrence, so frequent characters should sit shallow (short codewords) and rare characters can afford to sit deep (long codewords) — the total is a weighted average, and putting more weight where depth is smaller is the entire optimisation.

THE ALGORITHM

Repeatedly take the two nodes with the smallest frequency currently in the pool (initially, the n characters themselves as leaves), remove both, create a new internal node whose frequency is their sum and whose two children are the removed nodes, and insert this new node back into the pool. Stop when one node remains — the root.

With a min-heap holding all current nodes by frequency, each round is: extract-min twice, sum, insert once. This happens n - 1 times (each round reduces the pool size by one, from n down to 1).

[[FIG:huffman-build]]

FULL TRACE ON SIX SYMBOLS

Symbols with frequencies: a=5, b=9, c=12, d=13, e=16, f=45. (Total 100.)

1. Initial min-heap: [5(a), 9(b), 12(c), 13(d), 16(e), 45(f)].
2. Extract two smallest: 5(a) and 9(b). Merge into node N1 = 14, children a and b. Insert N1. Heap: [12(c), 13(d), 14(N1), 16(e), 45(f)].
3. Extract two smallest: 12(c) and 13(d). Merge into node N2 = 25, children c and d. Insert N2. Heap: [14(N1), 16(e), 25(N2), 45(f)].
4. Extract two smallest: 14(N1) and 16(e). Merge into node N3 = 30, children N1 and e. Insert N3. Heap: [25(N2), 30(N3), 45(f)].
5. Extract two smallest: 25(N2) and 30(N3). Merge into node N4 = 55, children N2 and N3. Insert N4. Heap: [45(f), 55(N4)].
6. Extract two smallest: 45(f) and 55(N4). Merge into root N5 = 100, children f and N4. Heap: [100(N5)]. One node remains — stop.

Reading the tree from the root (N5, children f and N4): f is a direct child of the root, depth 1. N4's children are N2 and N3, both at depth 2. N2's children are c and d, both at depth 3. N3's children are N1 and e — e at depth 3, N1 at depth 3. N1's children are a and b, both at depth 4.

Depths: f=1, c=3, d=3, e=3, a=4, b=4. Codewords (0 = left child, 1 = right child, root children f then N4): f=0, and everything under N4 starts with 1 — N2 (c,d) is N4's left child (10-prefix), N3 (N1,e) is N4's right child (11-prefix). Under N2: c=100, d=101. Under N3: N1 and e — say N1 left, e right: e=111, and under N1: a=1100, b=1101.

Total bits = sum of f(c) * depth(c) = 5*4 + 9*4 + 12*3 + 13*3 + 16*3 + 45*1
= 20 + 36 + 36 + 39 + 48 + 45 = 224 bits.

Cross-check with the internal-node shortcut: the total cost also equals the sum of the frequencies of every internal (merge) node created, because each merge's combined frequency is "charged" once for every future merge that includes it, which exactly counts each leaf's frequency once per level of depth it sits at. Sum of merge nodes: 14 + 25 + 30 + 55 + 100 = 224. Matches.

total bits = sum of frequency * depth = sum of all internal-node weights

THE SIBLING LEMMA

Lemma: in some optimal Huffman tree, the two least-frequent symbols are siblings, and they sit at the maximum depth of the tree.

Proof by exchange. Let x and y be the two smallest frequencies. Take any optimal tree T. Let p and q be two siblings at the deepest level of T (a full binary tree — every internal node has exactly two children, since a node with one child could have that child promoted to save a level and reduce cost, so an optimal tree is always full — always has two nodes at its deepest level that are siblings; take any such pair).

1. If {p, q} already equals {x, y}, done.
2. Otherwise, at least one of p, q has frequency >= at least one of x, y (since x, y are the two smallest overall, and p, q are just SOME pair of leaves, not necessarily the smallest). Swap x into p's position and p into x's old position (and symmetrically for y and q if needed).
3. This swap can only decrease or maintain total cost: moving a smaller frequency (x) to a deeper position (p's, which was already the deepest) and a larger or equal frequency (p) to a shallower position (x's old spot) trades (depth_p - depth_x) * (f(p) - f(x)) in cost, and since depth_p >= depth_x (p was at maximum depth) and f(p) >= f(x) (x is globally smallest), this product is >= 0, meaning cost after the swap is <= cost before.
4. Since T was optimal and cost did not increase, the swapped tree is also optimal, and now has x and y at the deepest sibling positions.

This lemma is exactly what licenses the algorithm: always merging the two current smallest frequencies is always a safe first step, because some optimal tree has them as deepest siblings, and merging them is equivalent to fixing that part of the tree and recursing on the smaller problem (n-1 items, with the merged pair replaced by one item of their combined frequency) — which is optimal substructure for this problem: the optimal tree on n items equals the optimal tree on n-1 items (with x,y replaced by a combined leaf of frequency f(x)+f(y)) with that combined leaf split back into x and y one level deeper. Induction on n then gives optimality of the whole algorithm: base case n=2 is a single merge, trivially optimal; the inductive step is exactly the sibling lemma plus this substructure fact.

KEY: The two smallest frequencies being merged first is not a heuristic — it is forced by the sibling lemma, which is itself a small exchange argument. This is the same proof shape as every other algorithm in this chapter, just applied to tree cost instead of a sum of selected values.

TIES: MULTIPLE VALID HUFFMAN TREES

When two nodes in the pool have equal frequency, either may be picked first, and different tie-breaks can produce structurally different trees — different individual codeword lengths — while the TOTAL cost stays the same. Example: frequencies 2, 2, 2, 2. Merging (2,2) then the other (2,2), then combining the two 4s gives every leaf at depth 2, cost 4*2*2=16. There is no other shape possible here since all merges are forced to be symmetric, but with frequencies like 1,1,1,1,4 different pairings among the four 1s can give different-looking trees with the same total, because the sum-of-internal-nodes identity depends only on which frequencies get merged at which "level" of accumulated weight, and symmetric substitutions can preserve that.

GATE TRAP: A question may show two different-looking Huffman trees for the same frequency set and ask which is "the" optimal one. If both are full binary trees with correct leaf frequencies and both give the same total cost, both ARE valid optimal Huffman trees — optimality is about minimum total cost, not about a unique tree. Only reject a proposed tree if its cost is not minimum, or if it is not a valid prefix tree at all (not full, or leaves not matching the frequency multiset).

QUESTION TYPES THIS SUPPORTS

Three families of questions recur. Expected code length: cost(T) / (total frequency), i.e. cost(T) if frequencies are already probabilities summing to 1 — a weighted-average number of bits per character. Total bits to encode a whole message: cost(T) directly, or cost(T) scaled if frequencies are given as counts in one copy of the message but the message repeats. Which codeword-length vector is valid: check the Kraft equality, sum over codewords of 2^(-length) = 1 for a FULL binary tree — anything less than 1 wastes tree structure (not optimal, though still a valid prefix code with padding) and anything more than 1 is impossible for any prefix code, Huffman or not, because it would require more than the tree's leaf capacity at those depths.

Kraft equality for a full binary code tree: sum of 2^(-depth(c)) over all c = 1

WHY THE COST FUNCTION IMPROVES ON FIXED-LENGTH CODING

With 6 symbols, fixed-length coding needs ceil(log2 6) = 3 bits per character regardless of frequency, so encoding the same 100 total occurrences from the earlier trace would cost 100 * 3 = 300 bits. Huffman's 224 bits is a saving of about 25%, entirely because the algorithm gives frequent characters (f=45, only 1 bit) much shorter codes than rare ones (a=5, b=9, at 4 bits) — exactly the trade fixed-length coding cannot make.

JOB SEQUENCING WITH DEADLINES

Each of n jobs takes exactly one unit of time, has a deadline d_i (the job must be scheduled in some slot numbered 1..d_i), and a profit p_i earned only if it is scheduled by its deadline. At most one job runs per time slot. Maximise total profit.

THE RULE: PROFIT DESCENDING, LATEST FEASIBLE SLOT

Sort jobs by decreasing profit. Process them in that order; for each job, scan its deadline slot backward (deadline, deadline-1, ..., 1) and place it in the LATEST free slot at or before its deadline; if no such slot is free, discard the job (it can never be scheduled — every slot up to its deadline is already occupied by a higher-profit job).

Why latest free slot and not earliest? Placing a job as LATE as possible leaves every EARLIER slot open for jobs with tighter deadlines that have not been processed yet (since we go in decreasing-profit order, not increasing-deadline order, a later job in our processing sequence might have a very early deadline and need one of those slots). Placing greedily in the earliest free slot instead can waste an early slot on a job that did not need it, starving a later, tighter-deadlined job of the only slot it could have used.

FULL TRACE

Jobs (deadline, profit): J1(2,60), J2(1,100), J3(3,20), J4(2,40), J5(1,20).

1. Sort by decreasing profit: J2(100, d=1), J1(60, d=2), J4(40, d=2), J3(20, d=3), J5(20, d=1).
2. Slots available: 1, 2, 3 (max deadline is 3). All free initially.
3. J2, deadline 1: scan from slot 1 down to 1 — slot 1 is free. Place J2 in slot 1. Slots: [J2, _, _].
4. J1, deadline 2: scan from slot 2 down to 1 — slot 2 is free. Place J1 in slot 2. Slots: [J2, J1, _].
5. J4, deadline 2: scan from slot 2 down to 1 — slot 2 taken (J1), slot 1 taken (J2). No free slot. Discard J4.
6. J3, deadline 3: scan from slot 3 down to 1 — slot 3 is free. Place J3 in slot 3. Slots: [J2, J1, J3].
7. J5, deadline 1: scan from slot 1 down to 1 — slot 1 taken. No free slot. Discard J5.

Final schedule: slot1=J2, slot2=J1, slot3=J3. Total profit = 100 + 60 + 20 = 180.

max profit = 180

A direct implementation scans up to d_i slots for each of n jobs, giving O(n^2) in the worst case (when deadlines are large); using a union-find structure to jump straight to the nearest free slot at or before a given deadline brings this down to nearly O(n log n) (the log factor from sorting by profit, plus near-constant-amortised union-find operations).

WHEN LATEST-SLOT MATTERS: A CLOSE CALL

Consider two remaining jobs with one free slot each at times 1 and 2: X(deadline 1, profit 50), Y(deadline 2, profit 50), processed in some tie order — say Y first. Latest-free-slot places Y in slot 2 (its only option, since it scans from 2 down and 2 is free), leaving slot 1 free for X, which then also gets placed — total profit 100. If instead an earliest-free-slot rule were used, Y would be scanned from slot 1 upward, land in slot 1 (the first free slot it meets), and then X (deadline 1) finds slot 1 taken and no slot before it — X is lost, total profit only 50. This is exactly why the standard algorithm scans DOWN from the deadline, not up from slot 1.

COIN CHANGE: WHEN GREEDY WORKS AND WHEN IT DOES NOT

Given a target amount and a set of coin denominations (unlimited supply of each), find the minimum number of coins summing to the amount. The greedy rule: repeatedly take the largest denomination not exceeding the remaining amount.

For a canonical system — one where this greedy rule is provably optimal, such as the common currency denominations {1, 2, 5, 10} or {1, 5, 10, 25} — greedy is correct and fast: each step is O(number of denominations), and there are at most O(amount) steps, though in practice far fewer since large coins shrink the remainder quickly.

THE FAILURE: DENOMINATIONS {1, 3, 4}, AMOUNT 6

1. Remaining = 6. Largest coin <= 6 is 4. Take it. Remaining = 2. Coins used: {4}.
2. Remaining = 2. Largest coin <= 2 is 1 (3 and 4 are too big). Take it. Remaining = 1. Coins used: {4, 1}.
3. Remaining = 1. Largest coin <= 1 is 1. Take it. Remaining = 0. Coins used: {4, 1, 1}.

Greedy uses 3 coins (4+1+1). But 3+3=6 uses only 2 coins, and 3 is a legal denomination. Greedy is strictly suboptimal here.

Why does the exchange argument that worked for activity selection and fractional knapsack not rescue coin change? Because taking the largest coin first can leave a remainder that is AWKWARD for the available denominations — there is no guarantee, for an arbitrary denomination set, that "spend as much value as possible right now" leaves a residual problem that is still solvable optimally by more of the same rule. There is no proof to attempt here, because the greedy-choice property genuinely fails: no optimal solution to amount 6 with these coins contains a 4.

GATE TRAP: A very common error is assuming greedy coin change is a general algorithm that "usually works." It works only for denomination sets with a specific structural property (informally, each denomination is at least as good a building block as any combination of smaller ones below the next tier) — real currencies are typically designed this way on purpose. Whenever a question gives an unusual coin set, check for a failure by hand rather than trusting the largest-first instinct. The always-correct general method is dynamic programming:

minCoins(v) = 1 + min over coins c <= v of minCoins(v - c)

For amount 6 with {1,3,4}: minCoins(0)=0, minCoins(1)=1, minCoins(2)=2, minCoins(3)=1, minCoins(4)=1, minCoins(5)=min(1+minCoins(4), 1+minCoins(2))=min(2,3)=2, minCoins(6)=min(1+minCoins(5), 1+minCoins(3), 1+minCoins(2))=min(3,2,3)=2. Confirms the optimum is 2 coins (3+3), matching the direct check above.

MINIMUM NUMBER OF PLATFORMS / INTERVAL PARTITIONING

A related but distinct problem: instead of selecting a maximum subset of non-overlapping activities (throwing the rest away), schedule ALL n activities, using as few resources (platforms, rooms, machines) running in parallel as possible, such that no two activities sharing a resource overlap.

THE SWEEP ALGORITHM

Separate all start times and all finish times into two sorted lists. Sweep through time: at each event, if it is a start, increment a counter of platforms currently in use (and update the running maximum); if it is a finish, decrement it. The maximum value the counter ever reaches is the minimum number of platforms needed.

Trace: activities with (start, finish): (9,10), (9,12), (10,11), (14,15), (15,17). Sorted starts: 9,9,10,14,15. Sorted finishes: 10,11,12,15,17.

1. Merge-sweep both sorted lists by time, finishes processed before starts at equal times (an activity finishing at t frees the platform in time for one starting at t): events in order 9(start),9(start),10(finish),10(start),11(finish),12(finish),14(start),15(finish),15(start),17(finish).
2. Running count: start@9 -> 1; start@9 -> 2; finish@10 -> 1; start@10 -> 2; finish@11 -> 1; finish@12 -> 0; start@14 -> 1; finish@15 -> 0; start@15 -> 1; finish@17 -> 0.
3. Maximum value reached = 2.

min platforms = maximum number of activities overlapping at any single instant

This is a genuine lower bound, not just a heuristic count: if k activities all contain some common instant, they pairwise overlap and therefore truly need k distinct platforms — no algorithm could do better. The sweep both computes this maximum overlap AND constructs a valid assignment achieving it (assign each starting activity to any platform that just freed up, or a new one if none has), so the lower bound is tight. Sorting costs Theta(n log n); the sweep itself is Theta(n). Total Theta(n log n).

MINIMISING TOTAL COMPLETION TIME: SHORTEST JOB FIRST

Given n jobs (no deadlines here, all available at time 0) each with a processing time, and a single machine, schedule them one at a time (non-preemptively) to minimise the SUM of completion times over all jobs (equivalently, the average completion time, since dividing by n does not change which order is best).

The rule: process jobs in increasing order of processing time — shortest job first (SJF).

Exchange-argument proof. Suppose an optimal schedule has some job with a LONGER processing time immediately before a job with a SHORTER one (an "inversion" relative to SJF order). Swapping these two adjacent jobs: every OTHER job's completion time is unaffected (the same total time is used before and after this pair, in total). Within the pair, let the long job have time L and the short job have time S, with L > S, both starting at the same moment t before the swap. Before the swap: long-then-short gives the long job completing at t+L, the short job completing at t+L+S. After the swap: short-then-long gives the short job completing at t+S, the long job completing at t+S+L. Sum before = (t+L)+(t+L+S) = 2t+2L+S. Sum after = (t+S)+(t+S+L) = 2t+2S+L. Difference (before - after) = (2L+S)-(2S+L) = L - S > 0, since L > S. So swapping strictly decreases the total. Any schedule with an inversion can be strictly improved, so an optimal schedule has no inversions — it is exactly SJF order.

FULL TRACE

Jobs with processing times: J1=6, J2=2, J3=8, J4=3.

1. Sort by increasing processing time: J2(2), J4(3), J1(6), J3(8).
2. J2 runs [0,2], completion time 2.
3. J4 runs [2,5], completion time 5.
4. J1 runs [5,11], completion time 11.
5. J3 runs [11,19], completion time 19.

Sum of completion times = 2 + 5 + 11 + 19 = 37. Average completion time = 37/4 = 9.25.

MINIMISING MAXIMUM LATENESS: EARLIEST DEADLINE FIRST, AND WHY SJF IS WRONG HERE

A different objective, same kind of setup but now each job also has a deadline d_i. Lateness of a job is L_i = max(0, completion_i - d_i) — how far past its own deadline it finished, or 0 if it finished on time. The objective: minimise the MAXIMUM lateness over all jobs.

The rule: process jobs in increasing order of DEADLINE — earliest deadline first (EDF) — regardless of processing time. This is a different rule from SJF, and the two coincide only by coincidence on some instances.

[[FIG:edf-vs-sjf]]

Exchange-argument proof (sketch, same shape as SJF's). Suppose an optimal schedule has an inversion — a job with a later deadline scheduled immediately before a job with an earlier deadline. Swapping them cannot increase the maximum lateness: the job now finishing earlier (the one with the earlier deadline) can only have its lateness decrease or stay the same (it finishes sooner than before), and the job now finishing later (the one with the later deadline) finishes at the same time the OTHER job used to finish at — no later than the point at which, before the swap, the pair as a whole was already accounted for, so its lateness against its own (later) deadline is no worse than the other job's lateness against the earlier deadline was, because deadline_now >= deadline_before-swap-partner. Repeated swapping removes every inversion without increasing the maximum lateness anywhere, showing an EDF-ordered schedule attains the minimum possible maximum lateness.

FULL TRACE, SAME THREE JOBS, DIFFERENT OBJECTIVE

Jobs with (processing time, deadline): J1(6, 8), J2(2, 4), J3(8, 20).

1. SJF order (by processing time): J2(2), J1(6), J3(8). Completions: J2 at 2, J1 at 8, J3 at 16.
2. Lateness under SJF: J2: max(0, 2-4) = 0. J1: max(0, 8-8) = 0. J3: max(0, 16-20) = 0. Maximum lateness = 0 here — SJF happens not to violate any deadline on these numbers, so this instance alone would not expose the difference.
3. Change J1's deadline to 5 instead of 8 to see SJF fail: EDF order (by deadline): J2(d=4), J1(d=5), J3(d=20). Completions: J2 at 2, J1 at 8, J3 at 16. Lateness: J2: max(0,2-4)=0. J1: max(0,8-5)=3. J3: max(0,16-20)=0. Maximum lateness under EDF = 3.
4. SJF order is unchanged (still by processing time: J2=2, J1=6, J3=8), giving the SAME schedule and same completions as step 3's EDF here since deadlines don't reorder these particular processing times — so construct the genuine separation directly: jobs (proc, deadline) A(1, 100), B(10, 10). SJF (shortest first) runs A then B: A completes at 1 (lateness max(0,1-100)=0), B completes at 11 (lateness max(0,11-10)=1). Maximum lateness under SJF = 1.
5. EDF (earliest deadline first) runs B then A (deadline 10 before deadline 100): B completes at 10 (lateness max(0,10-10)=0), A completes at 11 (lateness max(0,11-100)=0). Maximum lateness under EDF = 0.

EDF achieves the true minimum (0) on this instance; SJF, which ignores deadlines entirely, achieves 1. SJF optimises a different quantity (sum of completions) and has no reason to respect deadlines at all — the two rules answer two different questions, and using one where the other is needed is a direct GATE trap.

GATE TRAP: SJF minimises total/average completion time. EDF minimises maximum lateness. They are not interchangeable, and a job with a short processing time can legitimately be scheduled LATE under EDF if its deadline is far away, even though SJF would have run it early. Confusing the two objectives is the single most common error in this pair of algorithms.

OPTIMAL MERGE PATTERN

Given n sorted files of given lengths, merge them all into one sorted file using repeated 2-way merges (merging two files of length a and b costs a+b comparisons/moves). Minimise total merge cost.

The rule is identical in shape to Huffman: repeatedly merge the two SMALLEST files, replace them with one file of their combined length, and repeat until one file remains. This is literally Huffman coding run on file lengths instead of character frequencies — the "cost" of a file is its length times the number of times it participates in a merge (its depth in the merge tree), and total cost is minimised the same way, for the same sibling-lemma reason.

[[FIG:optimal-merge-tree]]

FULL TRACE

Four sorted files of lengths 20, 30, 10, 5.

1. Pool: [5, 10, 20, 30]. Merge two smallest: 5 and 10, cost 15. New pool: [15, 20, 30]. Running total cost = 15.
2. Merge two smallest: 15 and 20, cost 35. New pool: [30, 35]. Running total cost = 15 + 35 = 50.
3. Merge two smallest: 30 and 35, cost 65. New pool: [65]. Running total cost = 50 + 65 = 115.

Total merge cost = 115. As with Huffman, this also equals the sum of file lengths weighted by their depth in the merge tree: file 5 and file 10 are each merged three times (depth 3: they are inside the 15, which is inside the 65 — wait, check directly: 5 is part of merges at steps 1, 2, 3, so contributes 5*... — actually the internal-node identity applies directly: sum of merge costs = 15 + 35 + 65 = 115, matching.

total merge cost = sum of the combined sizes at every merge step

Building the pool as a min-heap makes this Theta(n log n), identical to Huffman: n-1 merges, each an extract-min pair plus one insert, each O(log n).

MST, KRUSKAL, PRIM AND DIJKSTRA AS GREEDY

You met these three algorithms in the graph-algorithms topic; here the point is only to see them as members of THIS family, sharing one exchange argument, so you recognise the pattern rather than re-deriving them.

Kruskal's algorithm for minimum spanning tree makes the greedy choice "take the globally cheapest edge that does not create a cycle." Prim's algorithm makes the greedy choice "take the cheapest edge crossing the boundary of the tree built so far." Both are justified by the same fact, called the cut property: for any partition of the vertices into two non-empty sets, the minimum-weight edge crossing that partition belongs to SOME minimum spanning tree. This is the greedy-choice property for MST, and it plays the identical role that "earliest-finish activity is in some optimal schedule" played for activity selection — it is what licenses locking in the cheapest crossing edge without ever needing to reconsider.

Dijkstra's algorithm for single-source shortest paths makes the greedy choice "finalise the currently-closest unfinalised vertex; its tentative distance is already its true shortest distance." This is safe exactly when all edge weights are non-negative, because then no future edge, however it is used, can ever DECREASE a distance already found to be smallest among the unfinalised set — every alternative path to that vertex must pass through an unfinalised vertex whose distance is already at least as large, and adding a non-negative edge from there can only add more distance, never subtract.

GATE TRAP: With a negative edge weight, this argument breaks at exactly the point just described: a path through a currently-farther unfinalised vertex, followed by a large negative edge, CAN beat the tentative shortest distance to a vertex Dijkstra has already finalised — but Dijkstra never revisits finalised vertices, so it produces a wrong answer with no warning. This is precisely a greedy-choice-property failure, in the same technical sense as 0/1 knapsack's: the greedy pick (finalise the closest vertex) is no longer guaranteed to be part of the true shortest-path tree once negative edges are allowed.

REMEMBER: Every one of these three algorithms proves its correctness with an exchange argument of the same shape used throughout this chapter — assume an optimum differs from the greedy choice, exhibit a swap (an edge swap for MST, a path-splice for Dijkstra) that does not lose value, repeat. Learning that shape once, here, is more valuable than re-deriving each algorithm from scratch.

WHEN GREEDY FAILS: THE GENERAL PATTERN

Every failure in this chapter has the same shape: a choice that looks best according to the local rule blocks a BETTER COMBINATION that would only become visible by looking further ahead — and greedy, by construction, never looks further ahead. Four standard examples to keep as a checklist:

• 0/1 knapsack: taking the highest-ratio item can use up capacity that two lower-ratio items together would have filled more profitably; indivisibility prevents the fractional exchange argument's "trade back a small amount" step.

• Non-canonical coin systems: taking the largest coin can leave a remainder that no combination of remaining coins clears as efficiently as a different, smaller first coin would have.

• Longest simple path in a graph: no greedy edge-extension rule works at all, because a path that looks locally promising can dead-end far from the true longest path, and there is no efficient way to detect this in advance (the problem is NP-hard in general).

• Travelling salesman via nearest-neighbour: always moving to the nearest unvisited city can strand a few far-away cities for the end, forcing very expensive final edges that a globally-planned tour would have avoided; nearest-neighbour has no optimality guarantee and can be made arbitrarily bad relative to the true optimal tour.

KEY: Whenever a problem's objective can be improved by a trade that greedy's local rule can never see coming — because the trade only pays off several steps later, or because indivisibility blocks the small adjusting swap an exchange argument needs — greedy is the wrong tool, and the fix is dynamic programming (when optimal substructure alone holds, as in 0/1 knapsack) or a different algorithm class entirely (as in general TSP).

THE MATROID VIEW, IN BRIEF

There is a unifying algebraic structure, the matroid, under which a large family of these greedy successes (MST is the cleanest example) can be recognised automatically: a matroid is a pair (a ground set of elements, a collection of "independent" subsets closed under taking subsets, satisfying an exchange property that any smaller independent set can be extended by an element of any larger one) such that maximising a weight function over independent sets is always solved correctly by sorting elements by weight and greedily adding each one that keeps the current set independent. MST fits this framework directly (independent sets are the forests; the matroid exchange property is exactly the cut property in disguise). Not every correct greedy algorithm in this chapter is naturally a matroid problem — activity selection and Huffman coding are provably greedy-optimal by their own direct exchange arguments without being framed as matroids — but recognising a matroid structure, when one is visible, is a fast way to know a greedy rule will work without constructing the exchange argument from scratch.

COMPLEXITY SUMMARY, DERIVED NOT MEMORISED

Every algorithm in this chapter costs either "sort the input" or "build and maintain a heap," and nothing more, because the greedy loop itself is a single linear pass making one O(1)-or-O(log n) decision per element. Activity selection: Theta(n log n) sort + Theta(n) scan = Theta(n log n). Fractional knapsack: Theta(n log n) sort by ratio + Theta(n) fill = Theta(n log n). Huffman and optimal merge: Theta(n) heap-build + (n-1) rounds of O(log n) heap operations = Theta(n log n) — or Theta(n) with the two-queue trick if input is pre-sorted, since each round then only compares two queue fronts in O(1). Job sequencing: O(n^2) naive (each of n jobs scans up to its deadline) or near O(n log n) with union-find for fast "nearest free slot" queries. Interval partitioning: Theta(n log n) to sort the 2n endpoints + Theta(n) sweep. SJF and EDF scheduling: Theta(n log n) sort by the relevant key, no further work needed since the sorted order IS the schedule.

WORKED PROBLEMS

1. Activity selection. Activities (start, finish): A(1,3), B(2,5), C(4,7), D(1,8), E(5,9), F(8,10), G(9,11), H(6,10), I(2,4), J(11,12). Find the maximum set and its size.
   Sort by finish: A(1,3), I(2,4), B(2,5), C(4,7), H(6,10), E(5,9), F(8,10), G(9,11), D(1,8), J(11,12) — reorder strictly by finish value: A(3), I(4), B(5), C(7), E(9), H(10), F(10), G(11), D(8) needs reinsertion by finish=8 between C(7) and E(9), so full order: A(1,3), I(2,4), B(2,5), C(4,7), D(1,8), E(5,9), H(6,10), F(8,10), G(9,11), J(11,12).
   Take A (finish 3). Last=3. I starts 2 < 3, reject. B starts 2 < 3, reject. C starts 4 >= 3, take C, last=7. D starts 1 < 7, reject. E starts 5 < 7, reject. H starts 6 < 7, reject. F starts 8 >= 7, take F, last=10. G starts 9 < 10, reject. J starts 11 >= 10, take J, last=12.
   Selected: {A, C, F, J}, size 4.

2. Fractional knapsack. Capacity 50. Items: P(weight 10, value 60), Q(weight 20, value 100), R(weight 30, value 120).
   Ratios: P = 6, Q = 5, R = 4. Order: P, Q, R. Take all P: weight 10, value 60, remaining capacity 40. Take all Q: weight 30, value 160, remaining capacity 20. R needs 30 but only 20 remains: take 20/30 = 2/3 of R, value (2/3)*120 = 80. Total = 60 + 100 + 80 = 240.
   0/1 counterexample check on this data: taking P and Q whole uses weight 30, value 160; adding any part of R is impossible in 0/1, so 0/1 optimum here is at most max(160, or R+P: weight 40 value 180, or R+Q: weight 50 value 220, or R alone 120) = 220 (R+Q), which is less than the fractional 240 — confirming fractional value is always an upper bound on 0/1 value, never below it.

3. Huffman coding. Frequencies: w=32, x=25, y=20, z=15, v=8.
   Merge v(8)+z(15)=23. Pool: [20(y), 23, 25(x), 32(w)]. Merge y(20)+23=43. Pool: [25(x), 32(w), 43]. Merge x(25)+32(w)=57. Pool: [43, 57]. Merge 43+57=100.
   Depths: w and x are children of the 57-node (depth 2). y and the (v,z) node are children of the 43-node (depth 2 for y; the (v,z) node is at depth 2, so v and z are at depth 3 each).
   Total bits = 32*2 + 25*2 + 20*2 + 15*3 + 8*3 = 64+50+40+45+24 = 223.
   Check via internal nodes: 23 + 43 + 57 + 100 = 223. Matches.

4. EDF vs SJF. Jobs (processing time, deadline): P(3, 6), Q(2, 2), R(5, 15).
   SJF order (by processing time): Q(2), P(3), R(5). Completions: Q at 2, P at 5, R at 10. Sum of completions = 2+5+10 = 17.
   EDF order (by deadline): Q(d=2), P(d=6), R(d=15). Completions: Q at 2, P at 5, R at 10 — same schedule here since both orders coincide on this instance. Lateness: Q: max(0,2-2)=0. P: max(0,5-6)=0. R: max(0,10-15)=0. Maximum lateness = 0, and this is optimal since no job is late at all.
   To see genuine divergence, change R's processing time to 1 and deadline to 4: SJF now orders R(1), Q(2), P(3): completions R=1, Q=3, P=6; lateness R=max(0,1-4)=0, Q=max(0,3-2)=1, P=max(0,6-6)=0; maximum lateness under SJF = 1. EDF orders by deadline: Q(d=2), R(d=4), P(d=6): completions Q=2, R=3, P=6; lateness Q=0, R=max(0,3-4)=0, P=0; maximum lateness under EDF = 0. EDF strictly beats SJF's maximum lateness on this instance.

5. Coin change failure. Denominations {1, 5, 6, 8}, amount 10.
   Greedy: largest <= 10 is 8. Remaining 2. Largest <= 2 is 1. Remaining 1. Largest <= 1 is 1. Remaining 0. Coins used: 8+1+1 = 3 coins.
   Check optimum by enumeration: 5+5=10 uses 2 coins. Greedy (3 coins) is suboptimal; true optimum is 2.

6. Optimal merge pattern. Five sorted files of lengths 4, 8, 6, 12, 5.
   Pool: [4,5,6,8,12]. Merge 4+5=9, cost 9. Pool: [6,8,9,12]. Merge 6+8=14, cost 14. Pool: [9,12,14]. Merge 9+12=21, cost 21. Pool: [14,21]. Merge 14+21=35, cost 35.
   Total cost = 9+14+21+35 = 79.

7. Job sequencing with deadlines. Jobs (deadline, profit): A(3,50), B(1,10), C(2,15), D(2,30), E(1,20).
   Sort by decreasing profit: A(50,d=3), D(30,d=2), E(20,d=1), C(15,d=2), B(10,d=1).
   Slots 1,2,3, all free. A: scan from 3, slot 3 free, place A. Slots: [_,_,A].
   D: scan from 2, slot 2 free, place D. Slots: [_,D,A].
   E: scan from 1, slot 1 free, place E. Slots: [E,D,A].
   C: scan from 2, slot 2 taken, slot 1 taken. No slot. Discard C.
   B: scan from 1, slot 1 taken. No slot. Discard B.
   Total profit = 50+30+20 = 100.

8. Exchange-argument proof, written out in full, for minimising total completion time (SJF). Given jobs with processing times t1, ..., tn on one machine, all released at time 0, show that sequencing in increasing order of t_i minimises the sum of completion times.
   Take any optimal sequence OPT. If OPT has two adjacent jobs i (before) then j (after) with t_i > t_j — an inversion — let both start at the same time s in OPT (job i starts at s, job j starts right after i finishes at s+t_i). Swap their order: j now starts at s, i starts at s+t_j. Every job outside this pair keeps the same start and completion time, since the pair together still occupies exactly [s, s+t_i+t_j] before and after the swap. Completion of i before swap = s+t_i; completion of j before swap = s+t_i+t_j. Completion of j after swap = s+t_j; completion of i after swap = s+t_j+t_i. Sum before = (s+t_i)+(s+t_i+t_j) = 2s+2t_i+t_j. Sum after = (s+t_j)+(s+t_j+t_i) = 2s+2t_j+t_i. Sum before minus sum after = 2t_i+t_j - 2t_j-t_i = t_i - t_j > 0 since t_i > t_j. So the swap strictly reduces the total, contradicting OPT's optimality unless no inversion exists. Hence an optimal sequence has no inversions relative to increasing processing time — it IS the SJF order. Since this holds for any optimal OPT, and SJF order achieves this bound, SJF is optimal.

WHAT TO CARRY INTO THE NEXT TOPIC

Greedy algorithms are fast because they refuse to look back — and correct only on problems where refusing to look back costs nothing, a fact that must be proven with an exchange argument, never assumed from how reasonable the rule sounds. Dynamic programming, which you have already met, is what greedy problems turn into the moment the greedy-choice property fails but optimal substructure survives: 0/1 knapsack is the standing example, and every DP table you build from here on is best understood as "the branching that greedy was not allowed to do." Graph algorithms — MST, shortest paths, and the flow and matching problems beyond them — are where the greedy-choice property, the cut property, and their exact failure conditions (negative weights, indivisible flow) reappear at scale, so the exchange-argument habit built in this chapter is what makes those correctness proofs readable rather than mysterious.
`
};
