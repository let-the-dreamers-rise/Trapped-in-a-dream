// Textbook chapter: Asymptotic Analysis and Recurrences.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/algo.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure. This chapter reuses two figures already defined on
// the topic itself (growth-curves, recursion-tree-nlogn) in data/questions/algo.js.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['algo-asymptotic'] = {
  figs: [],
  text: `
WHAT THIS CHAPTER IS FOR

Every algorithm you will ever study — sorting, searching, graph traversal, dynamic programming — needs a way to say how its cost grows as the input grows. Without that language, "fast" and "slow" are just opinions about one run on one machine. This chapter builds that language from the ground up: how to count an algorithm's work honestly, how to compare growth rates once you have counted it, and how to solve the recurrences that recursive algorithms produce.

Nothing about sorting, searching or graphs is assumed. What is built here — the five notations, the growth hierarchy, the techniques for solving recurrences — is the toolkit every later algorithms topic reaches for without re-deriving it. If a later chapter says "this is Theta(n log n) by the Master theorem", it is relying on everything below being solid.

WHY WE COUNT OPERATIONS, NOT SECONDS

Suppose you time two sorting programs on your laptop. Program A takes 2 seconds, program B takes 5. Is A the better algorithm? Not necessarily — B might be written in a slower language, running on a machine with less cache, or competing with fifty browser tabs for the CPU. Wall-clock time measures the algorithm, the compiler, the hardware and the operating system all tangled together.

What we actually want to know is a property of the algorithm alone: how does its amount of work grow as the input grows? If you double the input size, does the work double, quadruple, or explode? That question has an answer independent of which machine you ask it on, provided you count something machine-independent: the number of basic operations the algorithm performs, as a function of the input size n.

This is why every complexity statement in this course is a statement about a count of operations, not a number of seconds. A count of "roughly n^2 comparisons" translates to different numbers of seconds on different hardware, but the shape — quadratic growth — is the same everywhere. Constant factors from hardware differences wash out; what survives is the growth rate, and growth rate is exactly what asymptotic notation is built to describe.

THE RAM MODEL

To count operations we need a precise, agreed model of what one operation costs. The model used throughout algorithm analysis is the Random Access Machine, or RAM model.

In the RAM model, memory is an array of words, and any word can be read or written in one unit of time regardless of its address — there is no cost difference between accessing element 3 and element three million, unlike a real machine with caches and paging. Each of the following also costs exactly one unit of time: an arithmetic operation (add, subtract, multiply), a comparison, an assignment, and a control-flow decision (a branch).

Two assumptions make this work. First, we assume each word is large enough to hold any value the algorithm actually uses — an index into the input, a count up to n — typically taken as O(log n) bits, since that many bits are needed just to write down a number up to n. Second, we do not model pipelining, caching, or any of the real hardware effects that make some O(1) operations faster than others in practice. The RAM model is a simplification, and it is the right one: it is detailed enough to rank algorithms correctly almost always, and simple enough that you can actually count.

KEY: The RAM model says: one arithmetic operation, one comparison, one memory access, one assignment — each costs exactly 1 unit, regardless of the values involved. Counting how many such units an algorithm performs, as a function of n, is what "analyzing an algorithm" means.

BEST CASE, WORST CASE AND AVERAGE CASE

An algorithm's operation count is not usually a single number for a given n — it depends on which input of size n you feed it. Linear search is the cleanest example, and every other algorithm's case analysis follows the same pattern.

Linear search scans an array of n elements from the front, comparing each element to a target key, and stops when it finds a match or reaches the end.

The best case is the input that makes the algorithm do the least work. For linear search, that is the key sitting in the first position: one comparison, done. Best-case cost is Theta(1) — it does not grow with n at all.

The worst case is the input that makes the algorithm do the most work. For linear search, that is the key sitting in the last position, or not present at all: n comparisons are needed either way. Worst-case cost is Theta(n).

The average case needs more than "the input in between" — it needs a probability distribution over inputs, because "average" is meaningless without one. The standard assumption for linear search: the key is present, and it is equally likely to be at any of the n positions, each with probability 1/n.

1. If the key is at position i, the algorithm performs exactly i comparisons.
2. The expected number of comparisons is the sum over all positions, each weighted by its probability: E[comparisons] = sum from i=1 to n of i times (1/n).
3. Factor out 1/n: E[comparisons] = (1/n) times sum from i=1 to n of i.
4. The inner sum is n(n+1)/2 (derived in the sums section below), so E[comparisons] = (1/n) times n(n+1)/2 = (n+1)/2.

average-case comparisons = (n + 1) / 2

So the average case for linear search is Theta(n) — about half the array, on average — strictly better than the worst case's n but the same growth rate. Notice average case is not "halfway between best and worst" as a rule; it is whatever the probability-weighted sum works out to. Here it happens to land near the midpoint because the distribution is uniform; a skewed distribution (key usually near the front) would give a different, smaller average.

Because worst case gives a guarantee — "this algorithm never does more than this many operations, on any input" — it is the case most often analyzed and quoted by default. Unless a question specifies average case, assume worst case.

GATE TRAP: "Best case" does not mean "the smallest input" and "worst case" does not mean "the largest input" — both refer to fixed input SIZE n, varying which arrangement of n elements is given. A worst-case analysis of linear search on an array of size 100 considers all possible arrangements of size 100 and picks the costliest, not an array of size 1000.

THE NEED FOR A GROWTH-RATE LANGUAGE

Suppose two algorithms have exact operation counts 5n^2 + 3n + 2 and 100n + 40. For small n the second constant, 40, might make the second algorithm look worse for tiny inputs — at n=1 it costs 140 against the first's 10. But as n grows, the n^2 term in the first expression eventually dwarfs everything else, and the first algorithm becomes far worse no matter how small its leading constant is.

This is the pattern that motivates asymptotic notation: for large enough n, only the growth rate — the highest-order term — matters, and constant factors and lower-order terms stop mattering. We need notation that captures exactly this idea of "eventually, up to a constant factor" and ignores the noise below it.

BIG-O: UPPER BOUNDS

Big-O describes a ceiling on growth: f(n) is O(g(n)) if, from some point onward, f never exceeds a constant multiple of g.

f(n) = O(g(n)) if there exist positive constants c and n0 such that f(n) <= c * g(n) for all n >= n0.

Read this literally: you have to be able to name a specific c and a specific n0 that make the inequality true for every single n from n0 onward. It is not enough that it looks true — you must exhibit the constants.

Work an example from the definition: show that 3n^2 + 5n = O(n^2).

1. We need c and n0 such that 3n^2 + 5n <= c * n^2 for all n >= n0.
2. Divide both sides by n^2 (valid since n > 0): 3 + 5/n <= c.
3. The left side is largest when n is smallest, and it decreases as n grows, since 5/n shrinks. So pick any n0, and check the value of 5/n0.
4. Take n0 = 1: then 5/n = 5 at worst, giving 3 + 5 = 8. So c = 8, n0 = 1 works: 3n^2 + 5n <= 8n^2 for all n >= 1.
5. A tighter pair also works: take n0 = 5, so 5/n <= 1, giving 3 + 1 = 4. So c = 4, n0 = 5 also satisfies the definition — there is no unique (c, n0) pair, only a requirement that some pair exists.

Now show 3n^2 + 5n is NOT O(n): suppose, for contradiction, that some c and n0 existed with 3n^2 + 5n <= c*n for all n >= n0. Dividing by n gives 3n + 5 <= c for all n >= n0. But the left side grows without bound as n increases, while c is a fixed constant — so the inequality must eventually fail, for n larger than (c-5)/3. No constant c can work for all large n. Contradiction, so 3n^2 + 5n is not O(n).

GATE TRAP: A Big-O proof must produce ONE fixed pair (c, n0) that works for every n from n0 onward — not a c that changes with n. "As n grows, c can grow too" is not a valid Big-O argument; it describes no upper bound at all.

BIG-OMEGA: LOWER BOUNDS

Where O is a ceiling, Omega is a floor: f(n) is Omega(g(n)) if, from some point onward, f never falls below a constant multiple of g.

f(n) = Omega(g(n)) if there exist positive constants c and n0 such that f(n) >= c * g(n) for all n >= n0.

Prove 3n^2 + 5n = Omega(n^2): since 5n >= 0 for all n >= 0, we have 3n^2 + 5n >= 3n^2 for every n >= 0. So c = 3, n0 = 0 satisfies the definition directly — no algebra needed beyond dropping a non-negative term.

THETA: TIGHT BOUNDS

Theta says the function is sandwiched between two constant multiples of g — both a ceiling and a floor of the same shape.

f(n) = Theta(g(n)) if f(n) = O(g(n)) AND f(n) = Omega(g(n)).

Equivalently: there exist positive constants c1, c2, n0 such that c1 * g(n) <= f(n) <= c2 * g(n) for all n >= n0.

Combine the two proofs above: 3n^2 + 5n = O(n^2) with c=4 (n0=5), and 3n^2 + 5n = Omega(n^2) with c=3 (n0=0). Taking n0 = 5 (the larger of the two), both hold simultaneously: 3n^2 <= 3n^2 + 5n <= 4n^2 for all n >= 5. So 3n^2 + 5n = Theta(n^2).

KEY: To prove f = Theta(g) from the definition, do the O proof and the Omega proof separately, then take the larger of the two n0 values so both inequalities hold together. Theta is strictly the strongest of the three — it pins the growth rate exactly, not just above or below.

LITTLE-O AND LITTLE-OMEGA: STRICT BOUNDS

O and Omega allow f and g to have the same growth rate (n = O(n) is true). Little-o and little-omega are their strict versions, ruling that out.

f(n) = o(g(n)) if for EVERY positive constant c, there exists n0 such that f(n) < c * g(n) for all n >= n0.

The difference from Big-O is the quantifier on c: Big-O says "some c works"; little-o says "every c works, however small". That is only possible if f becomes vanishingly small relative to g, i.e. the ratio f(n)/g(n) tends to 0.

f(n) = o(g(n)) if and only if the limit of f(n)/g(n) as n tends to infinity is 0 (when the limit exists).

This limit form is usually far easier to check than the quantifier form, and it is what you should reach for in practice. Little-omega is the mirror image: f = omega(g) iff the limit of f(n)/g(n) is infinity, i.e. g = o(f).

KEY: O is like <=, Omega is like >=, Theta is like =. Little-o is like the strict <, little-omega is like the strict >. Just as n <= n is true but n < n is false, n = O(n) is true but n is NOT o(n).

HOW THE NOTATIONS RELATE TO ONE ANOTHER

Several facts tie the five notations together, and each is asked about directly.

Theta iff both O and Omega. This is the definition of Theta restated, but it is also a proof technique: whenever you are asked to establish a Theta bound, split it into an O proof and an Omega proof.

f = O(g) if and only if g = Omega(f). This is called transpose symmetry. Proof: if f(n) <= c*g(n) for all n >= n0 (the O statement), divide by c to get g(n) >= (1/c)*f(n) for all n >= n0 — this is exactly the Omega statement for g in terms of f, with constant 1/c. The argument reverses cleanly, so the "if and only if" holds both ways.

f = Theta(g) if and only if g = Theta(f). Symmetry holds for Theta, and ONLY for Theta among the three non-strict notations. Proof: Theta's definition (c1*g <= f <= c2*g) is symmetric in f and g up to relabelling the constants (divide through by c1 and c2 to get bounds on g in terms of f), so it goes both ways.

GATE TRAP: Symmetry does NOT hold for O or Omega individually. n = O(n^2) is true, but n^2 = O(n) is false (shown above by contradiction). So "f = O(g)" tells you nothing about whether "g = O(f)" — only Theta gives you the statement back in reverse.

If f = o(g), then f is NOT Omega(g). Little-o means the ratio f/g tends to 0, which is incompatible with the ratio staying bounded below by a positive constant (what Omega requires). So the strict and non-strict lower-bound relations exclude each other, exactly like x < y ruling out x >= y.

PROPERTIES: TRANSITIVITY AND REFLEXIVITY

Two structural properties make asymptotic notation behave like an ordering relation, which is why chaining comparisons (f < g < h implies f < h) is always valid.

Reflexivity. f = O(f), f = Omega(f), and f = Theta(f), all trivially: take c = 1, n0 = 0 (or 1), and f(n) <= 1*f(n) certainly holds. Reflexivity fails for the strict notations: f is never o(f) or omega(f), because that would need the ratio f/f = 1 to tend to 0 or infinity, and it does neither.

Transitivity. If f = O(g) and g = O(h), then f = O(h). Proof: f(n) <= c1*g(n) for n >= n1, and g(n) <= c2*h(n) for n >= n2. For n >= max(n1, n2), chain them: f(n) <= c1*g(n) <= c1*c2*h(n). So f = O(h) with constant c1*c2 and threshold max(n1, n2). The identical argument, with the inequalities reversed, gives transitivity for Omega; combining both directions gives it for Theta; and the same style of argument (using "every c" instead of "some c") gives it for o and omega too.

REMEMBER: O behaves like <=, Omega like >=, Theta like =, o like <, omega like >. Every property you would expect an ordering relation to have — reflexivity for the non-strict ones, transitivity for all five, symmetry only for equality (Theta) — holds because the definitions were built to make it hold.

THE ABUSE OF NOTATION

Writing "f(n) = O(g(n))" uses an equals sign, but O(g(n)) is really a SET of functions — every function that satisfies the defining inequality — and the statement actually means f(n) is a MEMBER of that set: f(n) in O(g(n)). Writing it with "=" instead of "in" is a universally used shorthand, called an abuse of notation, and you should understand it as membership even though everyone writes it as equality.

This shows up when you see an expression like O(g) + O(h) inside a larger formula. It does not mean "the sum of two specific sets" — it means "some function that is O(g), plus some function that is O(h)", and the whole expression is itself a member of O(max(g, h)), or equivalently O(g + h) (the two are the same order, since one of g, h eventually dominates or they are comparable).

A statement like n = O(n^2) is TRUE — n does satisfy the defining inequality against n^2 — but it is a weak, nearly useless statement, because it throws away information: it does not tell you n is much smaller than n^2, only that it is not asymptotically bigger. Whenever a tight bound is known or askable, prefer stating Theta; reach for bare O only when you genuinely only know (or only need) an upper bound.

GATE TRAP: A true O statement being weak is not the same as it being wrong. "The algorithm's running time is O(n^3)" is a perfectly true statement about an algorithm that actually runs in Theta(n log n) time — it just is not the tightest true statement. Questions that ask "which of these is FALSE" are testing whether you notice a statement is technically true despite being loose, not whether it happens to be the tightest one.

THE GROWTH HIERARCHY

Collecting the growth rates you will meet constantly, from slowest to fastest:

1 < log log n < log n < log^k n (any constant k > 1) < n^eps (any constant 0 < eps < 1) < n < n log n < n^2 < n^k (any constant k > 2) < 2^n < n! < n^n

[[FIG:growth-curves]]

Each "<" above means strictly slower-growing, i.e. little-o of the next one, and it can be checked mechanically with the limit test: f is o(g) if lim (as n to infinity) of f(n)/g(n) equals 0. Work through the adjacent pairs.

1 versus log log n: the ratio 1 / log log n tends to 0 since the denominator grows without bound (however slowly). So the constant function is o(log log n).

log log n versus log n: substitute x = log n, so log log n = log x. The ratio (log x)/x tends to 0 as x tends to infinity — this is the standard "log grows slower than the variable itself" fact, provable by L'Hopital's rule: differentiate top and bottom with respect to x, giving (1/x)/1 = 1/x, which tends to 0. So log log n = o(log n).

log n versus log^k n (k > 1): the ratio log n / log^k n = 1 / log^(k-1) n, which tends to 0 since log n tends to infinity and k-1 > 0. So log n = o(log^k n).

log^k n versus n^eps: this is the polylog-versus-polynomial comparison, the single most useful limit in this hierarchy. Substitute n = e^x, so log n = x and n^eps = e^(eps*x). The ratio is x^k / e^(eps*x). Apply L'Hopital's rule k times: each differentiation reduces the power of x by one and brings down a constant, while the denominator keeps reproducing e^(eps*x) up to a constant factor. After k applications the numerator is a constant and the denominator still tends to infinity, so the limit is 0. Hence any polylogarithm is o(any positive power of n), however small that power is.

n^eps versus n (eps < 1): ratio n^eps / n = n^(eps - 1) = 1/n^(1-eps), which tends to 0 since 1 - eps > 0. So n^eps = o(n).

n versus n log n: ratio n / (n log n) = 1/log n, tends to 0. So n = o(n log n).

n log n versus n^2: ratio (n log n)/n^2 = (log n)/n, tends to 0 by the polylog-vs-polynomial fact above (k=1, eps=1). So n log n = o(n^2).

n^2 versus n^k (k > 2): ratio n^2/n^k = 1/n^(k-2), tends to 0. So n^2 = o(n^k).

n^k versus 2^n: this is the polynomial-versus-exponential comparison, equally fundamental. Write n^k = 2^(k log n) (taking log base 2). Comparing exponents, 2^n / 2^(k log n) = 2^(n - k log n). Since n grows faster than k log n (shown two steps above, with n in place of n^2), the exponent n - k log n tends to infinity, so the whole ratio 2^n / n^k tends to infinity. Hence n^k = o(2^n) for every constant k.

2^n versus n!: by Stirling's approximation (stated precisely below), n! is asymptotically sqrt(2*pi*n) * (n/e)^n. The ratio n!/2^n then behaves like (n/(2e))^n times a slowly-growing square-root factor. Once n exceeds 2e (about 5.44), the base n/(2e) exceeds 1 and is growing, so (n/(2e))^n grows without bound. Hence 2^n = o(n!).

n! versus n^n: since n! = n * (n-1) * (n-2) * ... * 1 and n^n = n * n * n * ... * n (n factors each), term by term every factor in n! is at most as large as the corresponding factor n in n^n, and most are strictly smaller. Formally, n!/n^n = product from i=1 to n of (i/n), and (using Stirling again) this product behaves like e^(-n) times a polynomial factor, tending to 0. So n! = o(n^n).

KEY: The two comparisons worth memorizing as facts, because they recur constantly and are proved the same way every time: any polylogarithm loses to any positive power of n (log^k n = o(n^eps)), and any polynomial loses to any exponential with base greater than 1 (n^k = o(c^n) for c > 1). Both are proved by taking logs or by repeated L'Hopital, and both generalize the specific pairs above.

STANDARD IDENTITIES

A handful of algebraic identities involving logs and exponents get used constantly when simplifying expressions before comparing them. Each is proved once here so it never has to be taken on faith.

log(n!) = Theta(n log n). Write log(n!) = sum from i=1 to n of log(i) (since log of a product is the sum of logs). For the upper bound: every term log(i) <= log(n), and there are n terms, so the sum <= n log n — giving log(n!) = O(n log n). For the lower bound: keep only the top half of the terms, i from n/2+1 to n: there are n/2 such terms, and each is at least log(n/2). So the sum is at least (n/2) * log(n/2) = (n/2)*(log n - 1), which is Theta(n log n) once n log n dominates the additive n/2 term. Sandwiching both bounds gives log(n!) = Theta(n log n). (Stirling's approximation, n! ~ sqrt(2*pi*n)*(n/e)^n, gives the same order with a precise constant, but the sandwich above is enough to establish the Theta bound from scratch.)

log_a n = Theta(log_b n) for any constant bases a, b > 1. Using the change-of-base formula, log_a n = (ln n)/(ln a) and log_b n = (ln n)/(ln b). Their ratio is (ln b)/(ln a), a fixed constant independent of n. Since the ratio is a positive constant, the two are Theta of each other with that exact constant on both sides (c1 = c2 = (ln b)/(ln a)). This is why, inside a Theta or O statement, the base of a logarithm is never written — it only changes the constant factor, which Theta already absorbs.

2^(log_2 n) = n. This is not an asymptotic fact but an exact algebraic identity, true for every n, following directly from the definition of log base 2 as the inverse of the function 2^x.

n^(log_b b) = n^1 = n, since log_b b = 1 by definition for any base b — raising anything to the log (base b) of b always just returns that thing to the power 1. It is a useful sanity check when an expression seems to have a log of the same base as its own argument sitting in an exponent: it always collapses to the first power.

a^(log_b n) = n^(log_b a), for any positive constants a, b. Proof: take log base b of both sides. The left side becomes log_b(a^(log_b n)) = (log_b n)*(log_b a), using the power rule for logs. The right side becomes log_b(n^(log_b a)) = (log_b a)*(log_b n). These are the same product in a different order, so the two sides are equal, and since log_b is one-to-one, the original expressions were equal too. Example: 3^(log_2 n) = n^(log_2 3), which is n raised to about the 1.585th power — useful whenever you meet a constant raised to a log of n and want it in a directly comparable polynomial form.

2^(2n) is NOT Theta(2^n). Write 2^(2n) = (2^n)^2 = 2^n * 2^n. The ratio 2^(2n) / 2^n = 2^n, which tends to infinity rather than staying bounded — so the two are not even Theta of each other, let alone equal up to a constant. Doubling the EXPONENT does not double the value; it SQUARES it. This is one of the most common silent errors in comparing exponential expressions.

GATE TRAP: Treating exponents the way you would treat coefficients is the standard trap here. c*2^n (a constant times an exponential) IS Theta(2^n) — constants multiplying the whole expression are absorbed as usual. But 2^(c*n) for c != 1 is NOT Theta(2^n) — a constant multiplying the EXPONENT changes the base of effective growth (2^(2n) = 4^n, a genuinely faster-growing function than 2^n).

(log n)^k versus n^eps. Already covered in the growth hierarchy above: for any constants k and eps > 0, (log n)^k = o(n^eps). This identity is really just a restatement of the polylog-versus-polynomial limit, singled out because it is the single most-invoked simplification when a Theta bound has a polylog factor that needs to be shown negligible next to a polynomial one.

COMPARING TRICKY PAIRS: THE TAKE-LOGS METHOD

Some pairs of functions are not directly comparable by the growth hierarchy above because both sides have a variable sitting in an exponent. The general technique is to take the logarithm of both functions — since log is a strictly increasing function, it preserves every "less than", "equal to" or "greater than" relationship — and then compare the (usually much simpler) results.

Compare f(n) = n^(log log n) and g(n) = (log n)^(log n). Take log base 2 of both, and let x stand for log_2 n to keep the algebra clean, so log log n = log x.

log(f(n)) = log(n^(log log n)) = (log log n)*(log n) = (log x)*x.

log(g(n)) = log((log n)^(log n)) = (log n)*(log(log n)) = x*(log x).

These are the identical expression, x*(log x), written in a different order. So log(f(n)) = log(g(n)) EXACTLY, for every n — meaning f(n) and g(n) are not just comparable, they are actually equal (n^(log log n) = (log n)^(log n) as functions, given consistent bases throughout). Taking logs revealed an equality that was not at all obvious from the original forms.

Compare f(n) = 2^n and g(n) = n^(log n) (again log base 2 throughout). Take logs: log(f(n)) = n. log(g(n)) = (log n)*(log n) = (log n)^2. Now compare n against (log n)^2 using the polylog-versus-polynomial fact (with eps = 1, k = 2): n grows faster than (log n)^2. So log(f(n)) eventually exceeds log(g(n)) by an unbounded margin, which means f(n) = 2^n eventually exceeds g(n) = n^(log n) by an ever-widening multiplicative gap: n^(log n) = o(2^n).

Compare n! and 2^n directly by taking logs, as an alternative to the Stirling argument given earlier. log(n!) = Theta(n log n) (proved above), while log(2^n) = n. Since n log n grows strictly faster than n (their ratio is log n, tending to infinity), log(n!) eventually exceeds log(2^n), so n! eventually exceeds 2^n by an unbounded multiplicative factor: 2^n = o(n!). This matches the Stirling-based argument given in the growth hierarchy, reached by a different, often quicker route.

KEY: Whenever a variable sits inside an exponent on both sides of a comparison, take logs first. It turns exponent arithmetic into ordinary polynomial/polylog arithmetic, which the growth hierarchy already knows how to rank, and it is valid because log is strictly increasing — it never flips an inequality.

SUMS THAT SHOW UP EVERYWHERE

Loop and recursion analysis constantly reduces to evaluating one of five standard sums. Each is derived here so none of them need to be memorized as an unexplained formula.

The arithmetic sum: sum from i=1 to n of i. Pair the first term with the last, the second with the second-last, and so on: 1+n, 2+(n-1), 3+(n-2), each pair adding up to n+1, and there are n/2 such pairs. So the total is (n/2)*(n+1).

sum(i, i=1..n) = n(n+1)/2 = Theta(n^2)

The geometric sum: sum from i=0 to n-1 of r^i, for a constant ratio r != 1. Multiply the sum S by r: rS = sum from i=1 to n of r^i. Subtracting, S - rS = r^0 - r^n = 1 - r^n (every middle term cancels). So S(1-r) = 1 - r^n, giving S = (1 - r^n)/(1 - r), or equivalently (r^n - 1)/(r - 1).

sum(r^i, i=0..n-1) = (r^n - 1) / (r - 1)

Two cases behave very differently. If r < 1 (e.g. r = 1/2), r^n tends to 0 as n grows, so the sum tends to the constant 1/(1-r) — the FIRST term (or rather the limiting total) dominates, and the whole sum is Theta(1), independent of n. If r > 1 (e.g. r = 2), r^n dominates the "-1", so the sum is Theta(r^n) — the LAST term dominates, since it alone is already almost as big as the whole sum (the last term is r^(n-1), and the sum is at most r/(r-1) times that).

The harmonic sum: H_n = sum from i=1 to n of 1/i. This is Theta(log n), shown by grouping terms into blocks whose sizes double: (1) + (1/2) + (1/3 + 1/4) + (1/5+1/6+1/7+1/8) + ... Each block from 1/2^k+1 up to 1/2^(k+1) has 2^k terms, each at least 1/2^(k+1) and at most 1/2^k. So each block sums to between 1/2 and 1. There are log_2 n such blocks up to n, so the total is between (1/2)*log_2 n and log_2 n — sandwiched, giving H_n = Theta(log n).

H_n = sum(1/i, i=1..n) = Theta(log n)

sum of logs: sum from i=1 to n of log(i) = log(n!) = Theta(n log n), already derived above by the same sandwich technique used for the harmonic sum.

sum of powers: sum from i=1 to n of i^k, for a constant k >= 0, is Theta(n^(k+1)). This is provable by comparing the sum to the integral of x^k, which bounds it above and below (the sum of a monotonically increasing function over 1..n is sandwiched between the integral from 0 to n and the integral from 1 to n+1). The integral of x^k is x^(k+1)/(k+1), so both bounds are Theta(n^(k+1)), pinning the sum to the same order.

sum(i^k, i=1..n) = Theta(n^(k+1))

REMEMBER: Arithmetic sum is quadratic, geometric sum with ratio > 1 is dominated by its last term, geometric sum with ratio < 1 collapses to a constant, harmonic sum is logarithmic, and a sum of the k-th powers of 1..n is one power higher than the terms being summed. These five facts underlie almost every loop-counting problem below.

NESTED LOOPS BECOME SUMS

A nested loop's total iteration count is exactly the sum, over each value the outer variable takes, of how many times the inner loop runs for that value. Three loop shapes cover almost every pattern that shows up.

Shape one: triangular bounds, inner loop from 1 (or 0) to i. For (i = 1 to n) { for (j = 1 to i) { ... } } runs the inner body sum from i=1 to n of i times — the arithmetic sum, Theta(n^2). The same shape with j from i to n (rather than 1 to i) gives the complementary triangle, sum from i=1 to n of (n - i + 1), which is also Theta(n^2) by the same formula run in reverse.

Shape two: the outer variable doubles. For (i = 1; i <= n; i = i*2) runs only log_2 n + 1 times regardless of what the inner loop does, because i takes the values 1, 2, 4, 8, ..., up to the largest power of 2 not exceeding n. If the inner loop's own count also depends on i (for instance, running up to i itself), the total becomes a sum over these O(log n) values of i rather than over all n values — usually collapsing an apparent Theta(n log n) count down to something smaller, or in the specific case of the inner loop running up to i, a geometric sum dominated by the last term, giving Theta(n) (worked out fully in the snippets section below).

Shape three: the inner step depends on the outer variable — for (i = 1 to n) { for (j = i; j <= n; j += i) { ... } }. For each fixed i, the inner loop runs roughly n/i times (it starts at i and steps by i, so it visits about n/i multiples of i up to n). The total count is sum from i=1 to n of n/i = n * sum from i=1 to n of 1/i = n * H_n = Theta(n log n), using the harmonic sum derived above. This is the classic pattern behind sieve-like algorithms and behind several of the exact-count questions worked later in this chapter.

ANALYZING ITERATIVE CODE: EIGHT SNIPPETS

Loop counting always follows the same method: identify what changes each iteration, express the number of iterations as a function of n (or as a sum for nested loops), then find its growth rate using the facts above. Work through eight representative patterns.

(a) while (i < n) { i = i * 2; } — i starts at some positive constant and doubles each time. After k iterations i equals (initial value) * 2^k, and the loop stops once this exceeds n. Solving 2^k = Theta(n) for k gives k = Theta(log n). The loop runs Theta(log n) times.

(b) for (i = 1; i*i <= n; i++) { ... } — the loop continues while i^2 <= n, i.e. while i <= sqrt(n). Since i increases by 1 each time starting from 1, the loop runs Theta(sqrt(n)) times.

(c) for (i = 1; i <= n; i++) { for (j = 1; j <= i; j++) { ... } } — triangular nested loop, shape one above: Theta(n^2), the arithmetic sum sum from i=1 to n of i.

(d) i = 1; while (i < n) { i = i + i/2; } — this is i = i * 1.5 each time (integer division aside), a geometric progression with ratio 1.5 rather than 2. The same doubling argument applies with base 1.5 instead of base 2: after k steps i is Theta(1.5^k), and the loop stops once this reaches n, giving k = log base 1.5 of n, which is Theta(log n) — a different constant factor than pattern (a), but the identical growth rate, since all log bases differ only by a constant (the identity proved earlier).

(e) for (i = 2; i <= n; i = i*i) { ... } — i takes the values 2, 4, 16, 256, ..., i.e. i = 2^(2^k) after k iterations. The loop stops once 2^(2^k) > n, i.e. 2^k > log_2 n, i.e. k > log_2(log_2 n). So the loop runs Theta(log log n) times — one exponent lower than pattern (a), because squaring i is a far more aggressive way to grow than doubling it.

(f) for (i = 1; i <= n; i = 2*i) { for (j = 0; j < i; j++) { count++; } } — the outer variable takes the O(log n) values 1, 2, 4, ..., up to the largest power of 2 not exceeding n, and for EACH such value the inner loop contributes exactly that value to count. So count = 1 + 2 + 4 + ... + 2^k where 2^k <= n < 2^(k+1). This is a geometric sum with ratio 2 > 1, so it is dominated by its last term: the sum equals 2^(k+1) - 1, and since 2^k = Theta(n), the total is Theta(n) — a linear count, even though there is a doubling loop inside a loop, because the geometric sum collapses to be comparable to its single largest term.

(g) for (i = 1; i <= n; i++) { for (j = 1; j <= i; j = j*2) { count++; } } — for each fixed i, the inner loop doubles j starting from 1 while j <= i, running floor(log_2 i) + 1 times (pattern (a) applied with n replaced by i). The total count is sum from i=1 to n of (floor(log_2 i) + 1), which is Theta(n log n): each term is Theta(log i), and summing Theta(log i) for i from 1 to n gives the same order as summing log(i) itself, which was shown above to be Theta(n log n).

(h) for (i = 1; i <= n; i++) { for (j = i; j <= n; j += i) { count++; } } — the harmonic pattern, shape three above: count = sum from i=1 to n of (roughly n/i) = Theta(n log n).

GATE TRAP: An outer loop that itself only runs O(log n) times, like (a), (e) and the outer part of (f), can still hide an inner loop whose count depends on the CURRENT value of the loop variable rather than on n. Always express the inner count as a function of the current outer value first, then sum over the (possibly few) values the outer variable actually takes — do not assume "few outer iterations" automatically means "small total".

WRITING A RECURRENCE FROM RECURSIVE CODE

A recursive algorithm's running time is described by a recurrence: an equation for T(n) — the cost on an input of size n — in terms of T evaluated at smaller sizes, plus the cost of everything the function does besides recursing.

The rule for reading a recurrence off code is mechanical: each recursive call contributes a term T(size of that call's input); every line of non-recursive work — comparisons, loops, the work of combining results — contributes to a function f(n) added on top; and there is always a base case, T(constant) = constant, for the smallest inputs where recursion stops.

Binary search calls itself once, on half the array, after O(1) work to compute the midpoint and compare: T(n) = T(n/2) + O(1). Merge sort calls itself twice, on two halves, then does O(n) work to merge the results back together: T(n) = 2T(n/2) + O(n). A recursive function with two calls each on the whole array minus one element, plus O(1) extra work — the naive way to compute Fibonacci is close to this shape — gives T(n) = 2T(n-1) + O(1). Reading off a recurrence is always this same exercise: count the calls, note their argument sizes, and add up everything that is not a recursive call.

SOLVING BY SUBSTITUTION: GUESS AND VERIFY

The substitution method guesses the form of the answer, then proves the guess correct by mathematical induction on n. It is the most rigorous method and the one that generalizes to recurrences no formula covers.

Solve T(n) = 2T(n/2) + n, T(1) = 1, by guessing T(n) <= c*n*log(n) for some constant c, for n above some threshold, and verifying by induction.

1. Inductive hypothesis: assume T(k) <= c*k*log(k) holds for all k < n (strong induction).
2. Substitute into the recurrence: T(n) = 2T(n/2) + n <= 2*(c*(n/2)*log(n/2)) + n, using the hypothesis on the smaller value n/2.
3. Simplify: 2*c*(n/2)*log(n/2) = c*n*log(n/2) = c*n*(log(n) - 1) = c*n*log(n) - c*n.
4. So T(n) <= c*n*log(n) - c*n + n = c*n*log(n) - (c-1)*n.
5. For this to be <= c*n*log(n) as the guess requires, we need -(c-1)*n <= 0, i.e. c >= 1. Choosing c = 1 (or any c >= 1) closes the induction, so T(n) = O(n log n) is proved. A mirror argument with the inequality reversed proves T(n) = Omega(n log n), giving T(n) = Theta(n log n).

Sometimes the natural first guess is off by exactly a lower-order term, and the fix is subtle: subtracting a smaller quantity from the guess, rather than changing its leading behavior, makes the induction go through. Consider T(n) = T(floor(n/2)) + T(ceil(n/2)) + 1, T(1) = 1 — guess T(n) <= c*n and try to verify it.

Substituting: T(n) <= c*floor(n/2) + c*ceil(n/2) + 1 = c*n + 1 (since floor(n/2) + ceil(n/2) = n exactly). This gives T(n) <= c*n + 1, which is NOT <= c*n — the guess fails by exactly the "+1" left over, however large c is made, because c*n + 1 is always bigger than c*n.

The fix is to guess a form with a lower-order term subtracted off: T(n) <= c*n - b for a constant b > 0. Substituting: T(n) <= (c*floor(n/2) - b) + (c*ceil(n/2) - b) + 1 = c*n - 2b + 1. This IS <= c*n - b provided -2b + 1 <= -b, i.e. b >= 1. So the guess T(n) <= c*n - 1 (taking b = 1, any c large enough to cover the base case) succeeds where T(n) <= c*n failed — the "-1" absorbs exactly the "+1" that kept reappearing.

GATE TRAP: If a straightforward guess overshoots by a fixed additive amount at every step of the induction, the standard fix is to SUBTRACT a lower-order term from the guess, not to change its leading order. Concluding "the guess was wrong, try a bigger exponent" from this kind of failure is the common wrong move — the leading order (n here) was correct all along.

SOLVING BY ITERATION: UNROLLING THE RECURRENCE

Iteration (also called unrolling) repeatedly substitutes the recurrence into itself, watching the pattern emerge across levels, until a closed form for the total appears. It is especially useful exactly when the Master theorem (below) does not apply cleanly.

Apply it to T(n) = 2T(n/2) + n*log(n), T(1) = 1 — a recurrence that, as the Master theorem section will show, falls in a genuine gap the basic three cases cannot resolve.

1. Unroll one level: T(n) = 2*[2*T(n/4) + (n/2)*log(n/2)] + n*log(n) = 4*T(n/4) + 2*(n/2)*log(n/2) + n*log(n) = 4T(n/4) + n*log(n/2) + n*log(n).
2. Unroll again: at depth i, there are 2^i subproblems, each of size n/2^i, and each contributes (n/2^i)*log(n/2^i) of non-recursive work at ITS level. The total work contributed AT level i (summed over all 2^i subproblems at that level) is 2^i * (n/2^i) * log(n/2^i) = n * log(n/2^i).
3. The recursion bottoms out (size 1) after i = log_2(n) levels, since n/2^i = 1 when i = log_2 n. So there are Theta(log n) levels, indexed i = 0, 1, ..., log(n) - 1.
4. Total cost = sum from i=0 to log(n)-1 of n*log(n/2^i) = n * sum from i=0 to log(n)-1 of (log(n) - i), since log(n/2^i) = log(n) - i.
5. The inner sum, sum from i=0 to log(n)-1 of (log(n) - i), is just the arithmetic sum 1 + 2 + ... + log(n) (reading the terms in reverse order), which equals log(n)*(log(n)+1)/2 = Theta(log^2 n).
6. So total cost = n * Theta(log^2 n) = Theta(n * log^2 n).

T(n) = 2T(n/2) + n*log(n)  solves to  Theta(n * log^2 n)

This is exactly one extra factor of log n beyond plain merge sort's Theta(n log n) — an extra log factor in the per-level cost turns into an extra log factor in the total, because there are Theta(log n) levels each now contributing not quite the same amount, and summing those slightly-varying contributions produces the second power of log n.

SOLVING BY RECURSION TREE

A recursion tree draws the unrolling above as an actual tree: the root is the original call of size n, its children are the recursive calls it makes, their children are the next level's calls, and so on down to the base case. Each node is labeled with the non-recursive work done at that call; summing every node's label at one depth gives that level's total, and summing over all levels gives the whole cost.

[[FIG:recursion-tree-nlogn]]

For T(n) = 2T(n/2) + n: the root does n work and has 2 children, each of size n/2, each doing n/2 work — level 1 totals 2*(n/2) = n. Level 2 has 4 nodes of size n/4, each doing n/4 work, totaling 4*(n/4) = n. Every level, by the same pattern, totals exactly n, because doubling the number of nodes exactly compensates for halving each node's individual work. The tree has depth log_2(n) (halving n that many times reaches the base case 1), so there are Theta(log n) levels, each contributing n, giving total Theta(n log n) — matching the substitution-method answer derived earlier by a different route.

Now the harder case: T(n) = T(n/3) + T(2n/3) + n, T(1) = 1. Here the two children of each node are DIFFERENT sizes — one branch shrinks to a third of its parent, the other to two-thirds — so the tree is unbalanced, and it is not obvious the "each level sums to n" pattern still holds. Check it directly: a node of size m does m work and splits into children of size m/3 and 2m/3. Those children's sizes add up to m/3 + 2m/3 = m exactly — none of the "problem size" is lost or duplicated in the split. Since every node's work equals its own size, and children's sizes always sum to the parent's size, EVERY level of the tree — however unevenly divided among its nodes — sums to exactly n, the same total as the root.

What differs from the balanced case is the depth. The tree is not uniform: some root-to-leaf paths are short, some are long.

The shortest path always takes the n/3 branch, shrinking fastest: it reaches the base case after log_3(n) steps (dividing by 3 each time).
The longest path always takes the 2n/3 branch, shrinking slowest: it reaches the base case after log base (3/2) of n steps (dividing by 3/2 each time — the factor by which 2n/3 is smaller than n).

Both log_3(n) and log base (3/2) of n are Theta(log n) — they differ only by the constant factor 1/log(3) versus 1/log(3/2) (the change-of-base identity proved earlier), and a constant multiple of log n is still Theta(log n). So even though the tree is genuinely unbalanced — leaves appear at different depths — its depth is bounded above and below by Theta(log n) quantities. Every level sums to n, and there are Theta(log n) levels (some levels near the bottom are incomplete, containing only the paths that have not yet hit their base case, but each incomplete level still contributes at most n, so it does not change the order). Total cost:

T(n) = T(n/3) + T(2n/3) + n solves to Theta(n log n)

— identical to the balanced case, illustrating that a Master-theorem-style result can survive substantial imbalance in how a problem splits, as long as every level's total work is conserved.

THE MASTER THEOREM

The Master theorem is a direct formula for recurrences of the specific shape T(n) = a*T(n/b) + f(n), where a >= 1 is the number of subproblems, b > 1 is the constant factor each subproblem shrinks by, and f(n) is the non-recursive work at the top level. It packages the recursion-tree reasoning above into three cases, compared against the quantity n^(log_b a) — which is precisely how large a single level's total would be if f(n) were exactly this size (it is the count of leaves the tree would have, since the tree has log_b n levels and multiplies by a each level, giving a^(log_b n) = n^(log_b a) leaves, using the identity proved earlier).

Case 1 — the recursive work dominates. If f(n) = O(n^(log_b a - eps)) for some constant eps > 0 (f is POLYNOMIALLY smaller than n^(log_b a), not just smaller by any margin), then T(n) = Theta(n^(log_b a)).

Case 2 — the two are balanced. If f(n) = Theta(n^(log_b a) * log^k n) for some constant k >= 0 (f matches n^(log_b a) exactly, times an optional non-negative integer power of log n), then T(n) = Theta(n^(log_b a) * log^(k+1) n). Taking k = 0 recovers the textbook-standard "f(n) = Theta(n^(log_b a))" case with no log factor, giving T(n) = Theta(n^(log_b a) * log n).

Case 3 — the top-level work dominates. If f(n) = Omega(n^(log_b a + eps)) for some constant eps > 0 (f is POLYNOMIALLY larger), AND the regularity condition a*f(n/b) <= c*f(n) holds for some constant c < 1 and all sufficiently large n, then T(n) = Theta(f(n)).

The "polynomially larger/smaller" requirement in cases 1 and 3 is doing real work: it is not enough for f to merely be asymptotically bigger or smaller than n^(log_b a) — it must be bigger or smaller by at least a factor of n^eps for some fixed eps > 0. A function that is bigger only by a log factor, or smaller only by a log factor, is NOT polynomially bigger or smaller — it sits in the gap between cases 1/2 and 2/3, which the theorem (in its basic k=0 form) does not cover, though the extended case 2 above (with k >= 1) does cover the specific sub-case of an extra INTEGER power of log n.

The regularity condition in case 3 is easy to overlook: it says the recursive calls' contribution to f, scaled up by a, must not exceed a constant fraction of f(n) itself. It holds automatically for essentially every polynomial f(n) met in practice, but it must still be checked, not assumed.

Apply the theorem to enough recurrences to see all three cases fire, plus the places it fails.

1. T(n) = 2T(n/2) + n (merge sort). a=2, b=2, n^(log_2 2) = n^1 = n. f(n) = n = Theta(n^1 * log^0 n) — Case 2 with k=0. T(n) = Theta(n log n).

2. T(n) = T(n/2) + 1 (binary search). a=1, b=2, n^(log_2 1) = n^0 = 1. f(n) = 1 = Theta(1) — Case 2 with k=0. T(n) = Theta(log n).

3. T(n) = 8T(n/2) + n^2. a=8, b=2, n^(log_2 8) = n^3. f(n) = n^2 = O(n^(3-1)), polynomially smaller (eps=1) — Case 1. T(n) = Theta(n^3).

4. T(n) = 4T(n/2) + n^2. a=4, b=2, n^(log_2 4) = n^2. f(n) = n^2 = Theta(n^2 * log^0 n) — Case 2 with k=0. T(n) = Theta(n^2 log n).

5. T(n) = 3T(n/2) + n^2. a=3, b=2, n^(log_2 3) = n^1.585 approximately. f(n) = n^2 is polynomially larger (2 > 1.585, so eps = 2 - 1.585 = 0.415 works) — check regularity: a*f(n/b) = 3*(n/2)^2 = (3/4)*n^2 = (3/4)*f(n) <= c*f(n) with c = 3/4 < 1, holds. Case 3. T(n) = Theta(n^2).

6. T(n) = 7T(n/2) + n^2 (Strassen's matrix multiplication). a=7, b=2, n^(log_2 7) is n^2.807 approximately. f(n) = n^2 is polynomially SMALLER than n^2.807 (eps = 0.807 works) — Case 1. T(n) = Theta(n^(log_2 7)), about Theta(n^2.807) — this is exactly why Strassen's algorithm beats the naive Theta(n^3) matrix multiplication.

7. T(n) = 3T(n/2) + n (Karatsuba multiplication). a=3, b=2, n^(log_2 3) is n^1.585 approximately. f(n) = n is polynomially smaller (eps = 0.585 works) — Case 1. T(n) = Theta(n^(log_2 3)), about Theta(n^1.585).

8. T(n) = 3T(n/4) + n*log(n). a=3, b=4, n^(log_4 3) is n^0.7925 approximately. f(n) = n*log(n) is polynomially larger than n^0.7925 (since even n alone already beats n^0.7925 polynomially, with eps = 0.2 or more, and the extra log n factor only helps) — check regularity: a*f(n/b) = 3*(n/4)*log(n/4) = (3/4)*n*(log n - 2) <= (3/4)*n*log(n) = (3/4)*f(n) for large n, so c = 3/4 < 1 works — Case 3. T(n) = Theta(n log n).

9. T(n) = 2T(n/2) + n*log(n). a=2, b=2, n^(log_2 2) = n. f(n) = n*log(n) = Theta(n^1 * log^1 n) — this is the EXTENDED Case 2 with k=1 (not the basic k=0 textbook case). T(n) = Theta(n * log^2 n) — matching exactly the unrolling derivation worked out in full above.

10. T(n) = T(n-1) + n (selection sort's comparison count). This is NOT of the form a*T(n/b) + f(n) at all — the subproblem is n-1, not a division of n by a constant — so the Master theorem does not apply in any form here; it must be solved by direct summation (done in the "classic recurrences" section below), giving Theta(n^2).

11. T(n) = T(sqrt(n)) + 1. The subproblem size is sqrt(n), which is not n/b for any constant b — the Master theorem's premise fails before any case can even be checked. This needs a change of variables instead (worked below), giving Theta(log log n).

GATE TRAP: Before applying any case, check ALL of its conditions — the exact form of f(n) against n^(log_b a), the strict polynomial gap (not just any gap) for cases 1 and 3, and the regularity condition for case 3. A recurrence that "looks like" case 1 or case 3 because f(n) is smaller or bigger, WITHOUT the gap being polynomial, is not covered by the basic theorem at all — it needs unrolling or a recursion tree, not a forced case.

WHERE THE MASTER THEOREM GENUINELY RUNS OUT: n / log n

T(n) = 2T(n/2) + n/log(n), T(1) = 1, sits in a deeper gap than the n*log(n) case above. Compare f(n) = n/log(n) to n^(log_2 2) = n: it is smaller than n, but only by a factor of log(n) — not by any n^eps factor, so Case 1 fails. It is also not of the extended Case 2 form n^1 * log^k(n) for a non-negative INTEGER k, because n/log(n) = n^1 * log^(-1)(n) has a NEGATIVE exponent on the log factor. None of the theorem's cases, basic or extended, apply.

A recursion tree resolves it directly. At depth i there are 2^i subproblems, each of size n/2^i, each contributing (n/2^i) / log(n/2^i) work. The total at level i is 2^i * (n/2^i) / log(n/2^i) = n / log(n/2^i) = n / (log(n) - i). Summing over i = 0 up to log(n) - 1 (the tree's depth):

total = n * sum from i=0 to log(n)-1 of 1/(log(n) - i) = n * sum from k=1 to log(n) of 1/k = n * H_(log n)

where the substitution k = log(n) - i turns the sum into the harmonic sum up to log(n) rather than up to n. Since H_m = Theta(log m), here H_(log n) = Theta(log(log n)). So:

T(n) = 2T(n/2) + n/log(n) solves to Theta(n * log log n)

— smaller than n log n (because the divide-by-log(n) work is lighter than plain linear work at every level) but bigger than plain n (because it still sums over Theta(log n) levels, each contributing a shrinking but non-negligible share).

THE EXTENDED MASTER THEOREM: AKRA–BAZZI

The Akra–Bazzi method generalizes the Master theorem to recurrences with several differently-weighted subproblems, T(n) = sum over i of (a_i * T(n/b_i)) + f(n), including cases the basic theorem cannot phrase at all (different a_i and b_i for each term). Find the unique real number p solving sum over i of (a_i / b_i^p) = 1; then T(n) = Theta(n^p * (1 + integral from 1 to n of f(u)/u^(p+1) du)). For a single term a*T(n/b) + f(n), this reduces to a/b^p = 1, i.e. p = log_b(a), recovering n^(log_b a) as the base rate exactly as in the Master theorem, with the integral playing the role the three cases play by hand.

Apply it to the n*log(n) gap recurrence as a check against the unrolling answer: a=2, b=2, solve 2/2^p = 1, giving p = 1. Then T(n) = Theta(n * (1 + integral from 1 to n of (u*log(u))/u^2 du)) = Theta(n * (1 + integral from 1 to n of log(u)/u du)). The integral of log(u)/u du is (log(u))^2 / 2, so evaluating from 1 to n gives (log n)^2 / 2. So T(n) = Theta(n * (1 + (log n)^2 / 2)) = Theta(n * log^2 n) — exactly the answer the unrolling method produced by hand, confirming it through an entirely different mechanism.

CHANGE OF VARIABLES

Some recurrences are not in a*T(n/b)+f(n) form at all because the subproblem size shrinks in a way that is not a constant division — a square root, most commonly. The fix is to substitute a new variable that turns the square root into a division, solve the transformed recurrence (often now a plain Master-theorem case), then substitute back.

Solve T(n) = 2*T(sqrt(n)) + log(n). Let n = 2^m, so m = log_2(n), and define S(m) = T(2^m) = T(n).

1. Rewrite T(sqrt(n)): sqrt(n) = sqrt(2^m) = 2^(m/2), so T(sqrt(n)) = T(2^(m/2)) = S(m/2).
2. Rewrite log(n): since n = 2^m, log_2(n) = m.
3. Substitute both into the original recurrence: T(n) = 2*T(sqrt(n)) + log(n) becomes S(m) = 2*S(m/2) + m.
4. This is now a plain Master-theorem recurrence in m: a=2, b=2, m^(log_2 2) = m, f(m) = m = Theta(m^1 * log^0 m) — Case 2 with k=0. So S(m) = Theta(m log m).
5. Substitute back m = log_2(n): T(n) = S(log_2 n) = Theta((log n) * log(log n)).

T(n) = 2T(sqrt(n)) + log(n) solves to Theta(log(n) * log(log(n)))

The same technique, applied to T(n) = T(sqrt(n)) + 1 with T(2) = 1, gives S(m) = S(m/2) + 1 (a=1, b=2, f(m)=1=Theta(m^0), Case 2 with k=0), so S(m) = Theta(log m), and substituting back, T(n) = Theta(log(log_2 n)) = Theta(log log n). A direct numerical check confirms it: T(n) for n = 16, 256, 65536, 2^32 needs exactly 2, 3, 4, 5 recursive square-roots to reach the base case 2 — matching log_2(log_2(n)) at each of those values (log_2(log_2(16))=2, and so on).

KEY: Whenever the recursive argument is sqrt(n), or more generally n^(1/c) for a constant c, substitute n = 2^m (or n = c'^m for whatever base is convenient) so that repeated square-rooting becomes repeated halving of the exponent m. Solve the resulting recurrence in m by whatever method fits, then translate the answer back through m = log(n).

CLASSIC RECURRENCES AND THE ALGORITHMS THEY MODEL

Several recurrences recur so often, attached to named algorithms, that recognizing the shape on sight is worth building deliberately, now that every one of them has been derived above or is about to be.

• Binary search: T(n) = T(n/2) + O(1), solves to Theta(log n).
• Merge sort: T(n) = 2T(n/2) + O(n), solves to Theta(n log n).
• Karatsuba multiplication: T(n) = 3T(n/2) + O(n), solves to Theta(n^(log_2 3)), about Theta(n^1.585).
• Strassen's matrix multiplication: T(n) = 7T(n/2) + O(n^2), solves to Theta(n^(log_2 7)), about Theta(n^2.807).
• Selection sort (or insertion sort's comparison count): T(n) = T(n-1) + O(n), solves to Theta(n^2) — derived next.
• Towers of Hanoi: T(n) = 2T(n-1) + O(1), solves to Theta(2^n) — derived next.
• A "geometrically decaying" recursive split, T(n) = T(n/2) + T(n/4) + T(n/8) + ... + O(n), solves to Theta(n) — derived next.

T(n) = T(n-1) + n, T(1) = 1 is not of Master-theorem form (the subproblem is n-1, not n/b), so it is solved by direct summation: unrolling once gives T(n) = T(n-2) + (n-1) + n, and continuing down to the base case gives T(n) = T(1) + 2 + 3 + ... + n = 1 + (sum from i=2 to n of i) = sum from i=1 to n of i = n(n+1)/2 = Theta(n^2). This is exactly the arithmetic sum derived earlier, and it is why selection sort — which does a full linear scan on a shrinking-by-one remainder each pass — costs Theta(n^2) comparisons.

T(n) = 2T(n-1) + 1, T(1) = 1 (Towers of Hanoi: moving n disks means moving n-1 disks aside, moving the largest, then moving the n-1 disks back). Unroll: T(n) = 2*(2*T(n-2)+1) + 1 = 4*T(n-2) + 2 + 1. After k unrollings, T(n) = 2^k * T(n-k) + (2^(k-1) + 2^(k-2) + ... + 1) = 2^k*T(n-k) + (2^k - 1). At k = n-1, T(n) = 2^(n-1)*T(1) + (2^(n-1) - 1) = 2^(n-1) + 2^(n-1) - 1 = 2^n - 1.

T(n) = 2T(n-1) + 1 solves EXACTLY to T(n) = 2^n - 1, so Theta(2^n)

For the geometrically-decaying split T(n) = T(n/2) + T(n/4) + T(n/8) + ... + n (continuing with ever-smaller fractions of n, say halving the remaining fraction each term): build a recursion tree exactly as before. The root does n work. Its children have sizes n/2, n/4, n/8, ... — but crucially, these sizes ADD UP TO LESS THAN n (specifically 1/2 + 1/4 + 1/8 + ... = 1, but if the split is, say, n/2 + n/4 + n/8 only (three terms, summing to 7n/8 < n), work strictly shrinks by a constant factor every level. So the total work at level i is at most (7/8)^i * n, a geometric sum with ratio less than 1 — dominated by its FIRST term. Total cost across all levels is Theta(n): the geometric decay means almost all the work happens at the very top of the tree, and everything below contributes only a bounded extra constant factor.

SPACE COMPLEXITY AND RECURSION DEPTH

Time is not the only resource an algorithm uses — it also uses space, both for explicit data structures and, for a recursive algorithm, for the call stack itself. Every active recursive call has a stack frame holding its local variables and return address (the same stack mechanics that underlie function calls generally); the space these frames occupy is the recursion depth times the size of one frame.

Recursion depth means the maximum number of calls simultaneously waiting on the stack at once — NOT the total number of calls made over the algorithm's whole run. Merge sort makes many recursive calls in total (one per node of its recursion tree, Theta(n) of them), but at any single moment only one root-to-current-leaf path of calls is on the stack, and that path has length equal to the tree's depth, Theta(log n) for a balanced split. So merge sort's auxiliary stack space is Theta(log n), even though it makes far more than log n calls in total — the calls that have already returned are off the stack.

Quicksort's worst case (a pivot that always produces a size-1/size-(n-1) split) has recursion depth Theta(n), since one branch barely shrinks each call — giving O(n) stack space in the worst case, in contrast to its Theta(log n) depth on a balanced split. A standard fix — recursing on the smaller partition first and looping (tail-call style) on the larger one — bounds the depth to O(log n) regardless of pivot luck, because the smaller partition is guaranteed to be at most half the current size.

GATE TRAP: "How much space does this recursive algorithm use" is frequently answered by counting only explicit arrays and forgetting the call stack. Merge sort's O(n) auxiliary array for merging is often quoted as "the" space cost, but the O(log n) stack space from recursion depth is a real, separately-asked-about cost, and for algorithms with deeper recursion (like unbalanced quicksort) the stack cost can dominate entirely.

AMORTIZED ANALYSIS

Some data structures have one kind of operation that is usually cheap but occasionally very expensive — and the worst-case cost of that one operation, quoted alone, badly overstates how expensive a long SEQUENCE of such operations actually is on average. Amortized analysis answers: what is the average cost per operation, over any sequence of n operations, guaranteed (not merely expected, and with no probability involved at all)? There are three standard techniques.

The aggregate method bounds the TOTAL cost of any sequence of n operations directly, then divides by n to get the amortized cost per operation. It requires finding a global argument for why the total cannot be too large, even though individual operations can be expensive.

The dynamic array doubling problem is the canonical example. An array starts at some small capacity and, whenever a push exceeds its current capacity, the whole array is doubled in size (a new array of twice the capacity is allocated and every existing element is copied over) before the new element is inserted. A single doubling push, on an array of current size n, costs Theta(n) to copy everything — looks expensive. But consider n pushes starting from an empty array: doublings happen when the array holds 1, 2, 4, 8, ..., elements — Theta(log n) doublings — and the copying costs at each are 1, 2, 4, ..., roughly n/2 (each doubling copies the array's current size). Summing these copying costs is a geometric series with ratio 2, dominated by its last term: 1+2+4+...+n/2 < n. Adding the n ordinary O(1) pushes themselves, the total cost of n pushes is O(n) + O(n) = O(n), so the amortized cost per push is O(n)/n = O(1) — constant, even though any single push can individually cost Theta(n).

The accounting method assigns each operation an AMORTIZED CHARGE that may be more than its actual cost; the surplus is banked as credit on the specific elements involved, to be spent later covering an expensive operation, and the method is valid as long as the credit balance never goes negative. For dynamic array doubling, charge each push 3 units (rather than its true cost of 1, for an ordinary push): 1 unit pays for the push itself, and 2 units are saved as credit on the newly-inserted element. When the array later doubles, every element that has been in the array since the last doubling has 2 units of credit banked, and there are enough such elements (at least half the current array, since the array at least doubled since they were last moved) to pay for all the copying that doubling requires — so the expensive step is paid for entirely out of previously-banked credit, never out of a fresh charge.

The potential method defines a single number — the potential function Phi, computed from the data structure's current state — that captures "stored-up energy" available to pay for future expensive operations. The amortized cost of an operation is defined as its actual cost plus the CHANGE in potential it causes: amortized cost = actual cost + Phi(after) - Phi(before). For dynamic array doubling, a natural potential is Phi = 2*(number of elements) - (current capacity), which is 0 right after a doubling and grows back up to (capacity) just before the next one. An ordinary push increases the element count by 1 (raising Phi by 2) at an actual cost of 1, giving amortized cost 1 + 2 = 3. A doubling push has actual cost Theta(current size) for copying, but it also resets Phi from a large value back down near 0, and that big DROP in potential exactly cancels the copying cost in the amortized-cost formula, leaving an O(1) amortized cost again — matching both other methods.

The binary counter is the second classic amortized example. Incrementing a binary counter by 1 flips some trailing sequence of 1-bits to 0 and then flips the next 0-bit to 1 — potentially many bit-flips for one increment (incrementing 0111 to 1000 flips all 4 bits). But summed over a sequence of n increments starting from 0, bit 0 flips on EVERY increment (n times), bit 1 flips on every SECOND increment (n/2 times), bit i flips once every 2^i increments (n/2^i times). Total flips = sum from i=0 upward of n/2^i, a geometric series with ratio 1/2, bounded above by 2n. So n increments cost O(n) total bit-flips, an amortized O(1) flips per increment — exactly mirroring the dynamic array's argument, with "bit i flipping" playing the role of "an element being copied".

KEY: Amortized analysis is a guarantee about a SEQUENCE, not about any one operation. A single multipop or a single array doubling or a single carry-cascading increment can cost Theta(n) in isolation — that is still its true worst-case cost as one operation — but no sequence of n such operations can cost more than O(n) TOTAL, so the amortized cost per operation, over any sequence, is O(1). "Worst case per operation" and "amortized cost per operation" answer different questions and can have different answers for the same data structure.

GATE TRAP: Amortized analysis is not average-case analysis. Average case needs a probability distribution over inputs and can be violated by an unlucky specific input. An amortized bound holds for EVERY possible sequence of operations, with no randomness or assumption about input distribution at all — it is a guarantee, not an expectation.

WORKED PROBLEMS

1. Find constants c and n0 proving f(n) = 5n^2 + 3n + 2 = O(n^2), and show f(n) is NOT O(n).
For the O(n^2) proof: divide by n^2 to get 5 + 3/n + 2/n^2 <= c. At n0 = 1, 3/n <= 3 and 2/n^2 <= 2, giving 5+3+2 = 10, so c = 10, n0 = 1 works: 5n^2+3n+2 <= 10n^2 for all n >= 1. (A tighter pair: at n0=5, 3/n<=0.6 and 2/n^2<=0.08, giving c just above 5.68, so c=6, n0=5 also works.)
For NOT O(n): suppose 5n^2+3n+2 <= c*n for all n >= n0. Dividing by n gives 5n + 3 + 2/n <= c. The left side grows without bound as n increases (the 5n term alone diverges), so no fixed c can bound it for all large n — contradiction. Hence f(n) is not O(n).

2. Order the eight functions n^(log_2 3), n^1.5, 2^(sqrt(log n)), n log n, log(n!), 2^n, n!, (log n)^(log n) from slowest to fastest growing, log base 2 throughout, and justify each step.
log(n!) = Theta(n log n) (Stirling / the sandwich proof above), so these two are tied and adjacent in the order. 2^(sqrt(log n)): its exponent sqrt(log n) grows slower than log n itself, so this beats every function whose log grows at rate log n or faster but loses to any actual polynomial — its own log is sqrt(log n)*log(2), growing slower than any power of log n, let alone any power of n, making it the slowest of the eight. n log n and log(n!) sit together next: n log n = o(n^1.5) since dividing gives log(n)/n^0.5, tending to 0 (polylog vs polynomial). n^1.5 next: compare to n^(log_2 3) = n^1.585 approximately — since 1.5 < 1.585, n^1.5 = o(n^(log_2 3)). n^(log_2 3) next: compare to (log n)^(log n) — take logs: log(n^(log_2 3)) = (log_2 3)*log(n), growing linearly in log n, while log((log n)^(log n)) = log(n)*log(log(n)), growing faster than linearly in log(n) once log(log n) exceeds the constant log_2 3 — so (log n)^(log n) eventually dominates n^(log_2 3). (log n)^(log n) next: compare to 2^n — shown earlier that n^(log n) = (log n)^(log n) exactly and that 2^n dominates n^(log n) (since n beats (log n)^2), so 2^n is bigger. 2^n next: compare to n! — shown earlier n! dominates 2^n via Stirling. n! is largest.
Order: 2^(sqrt(log n)) < n log n = Theta(log(n!)) < n^1.5 < n^(log_2 3) < (log n)^(log n) < 2^n < n!.

3. Solve T(n) = 8T(n/2) + n^2 by the Master theorem, stating the case used.
a=8, b=2, n^(log_2 8)=n^3. f(n)=n^2=O(n^(3-1)), polynomially smaller with eps=1 — Case 1 applies (no regularity check needed for Case 1). T(n) = Theta(n^3).

4. Solve T(n) = 4T(n/2) + n^2 log(n) by the Master theorem, stating the case used.
a=4, b=2, n^(log_2 4)=n^2. f(n)=n^2*log(n)=Theta(n^2 * log^1 n) — extended Case 2 with k=1. T(n) = Theta(n^2 * log^2 n).

5. Solve T(n) = 5T(n/2) + n^2 by the Master theorem, verifying the regularity condition explicitly.
a=5, b=2, n^(log_2 5) is n^2.322 approximately. f(n)=n^2 is polynomially SMALLER (2 < 2.322, eps ~= 0.322) — this is Case 1, not Case 3 (n^2 does not dominate n^(log_2 5); n^(log_2 5) dominates n^2), so no regularity check is even required here — Case 1 needs only the polynomial-smaller condition. T(n) = Theta(n^(log_2 5)), about Theta(n^2.322).

6. Solve T(n) = 2T(n/2) + n^2 by the Master theorem.
a=2, b=2, n^(log_2 2)=n. f(n)=n^2 is polynomially larger than n (eps=1). Regularity: a*f(n/b) = 2*(n/2)^2 = n^2/2 = 0.5*f(n) <= c*f(n) with c=0.5<1, holds. Case 3. T(n) = Theta(n^2).

7. Solve T(n) = 2T(n/2) + n*log(n) by unrolling, showing every step (the genuine Master-theorem gap recurrence).
Fully derived above: unrolling gives level-i total n*log(n/2^i), summed over i=0 to log(n)-1 gives n times the arithmetic sum 1+2+...+log(n) = n*Theta(log^2 n) = Theta(n*log^2 n).
T(n) = Theta(n * log^2(n)).

8. Solve T(n) = 3T(n/9) + sqrt(n) by the Master theorem.
a=3, b=9, n^(log_9 3) = n^(1/2) = sqrt(n) (since log_9 3 = 1/2, as 9^(1/2)=3). f(n) = sqrt(n) = Theta(n^0.5 * log^0 n), matching n^(log_9 a) exactly — Case 2 with k=0. T(n) = Theta(sqrt(n) * log(n)).

9. Solve T(n) = 2T(sqrt(n)) + 1, T(2) = 1, by a change of variables.
Let n = 2^m, S(m) = T(2^m). T(sqrt(n)) = T(2^(m/2)) = S(m/2). The recurrence becomes S(m) = 2*S(m/2) + 1. Master theorem on S: a=2, b=2, m^(log_2 2)=m. f(m)=1=O(m^(1-eps)) — Case 1. S(m) = Theta(m). Substitute back: T(n) = S(log_2 n) = Theta(log n).
(Contrast this with T(n) = T(sqrt(n)) + 1, only ONE recursive call rather than two, which instead gives Theta(log log n) as derived earlier — the extra recursive call here changes Case behaviour entirely, from Case 2/log-log to a plain Case 1/log answer.)

10. For n = 6, trace count = 0; for (i=1; i<=n; i++) for (j=1; j<=i; j=j*2) count++; and give the exact value, then state its asymptotic order.
i=1: j=1 only (1<=1, next j=2>1 stops) — 1 iteration.
i=2: j=1,2 (next j=4>2 stops) — 2 iterations.
i=3: j=1,2 (next j=4>3 stops) — 2 iterations.
i=4: j=1,2,4 (next j=8>4 stops) — 3 iterations.
i=5: j=1,2,4 (next j=8>5 stops) — 3 iterations.
i=6: j=1,2,4 (next j=8>6 stops) — 3 iterations.
Total: 1+2+2+3+3+3 = 14. This matches the general pattern (g) derived earlier, sum of floor(log_2 i)+1 for i=1..n, which is Theta(n log n) — 14 is the small, exact value at n=6, not to be confused with the asymptotic shape.

11. A stack starts empty and undergoes n operations, each either a push or a multipop(k) (which pops min(k, current size) elements). Using the aggregate method, find the tight amortized cost per operation.
Every element can be popped at most once for each time it was pushed, so across the entire sequence, the total number of pop operations performed by ALL multipops combined is at most the total number of pushes, which is at most n. So total work (pushes plus all pops, across the whole sequence) is at most n (pushes) + n (pops) = O(n), even though a single multipop can individually cost Theta(n) by popping the whole stack at once. Dividing total O(n) work by n operations gives an amortized cost of O(1) per operation.

12. A binary counter starts at 0 and is incremented 8 times, reaching binary 1000 (decimal 8). Count the total number of bit flips across all 8 increments.
Simulate: 0000->0001 (1 flip), 0001->0010 (2), 0010->0011 (1), 0011->0100 (3), 0100->0101 (1), 0101->0110 (2), 0110->0111 (1), 0111->1000 (4). Total = 1+2+1+3+1+2+1+4 = 15.
Check against the general formula (total flips incrementing from 0 to n is 2n minus the number of 1-bits in n): 2*8 - popcount(8) = 16 - 1 = 15, confirming the trace. Amortized flips per increment = 15/8, consistent with the O(1)-amortized bound derived above (which only claims a constant bound, not this exact fraction, for large n).

WHAT TO CARRY INTO THE NEXT TOPIC

Every divide-and-conquer algorithm from here on — merge sort, quicksort, binary search variants, Strassen's and Karatsuba's multiplication, the closest-pair and median-finding algorithms — will be analyzed by writing down its recurrence and reaching for exactly the tools built here: the Master theorem when it applies cleanly, a recursion tree or unrolling when the recursive calls are unbalanced or the extra work has a stray log factor, and a change of variables when the subproblem size is not a constant fraction of n. Sorting algorithms will be compared using the growth hierarchy directly — why Theta(n log n) comparison sorts cannot be beaten by any comparison-based method is itself a lower-bound argument built on the same notation. And every later data structure that claims an "O(1) amortized" operation is leaning on exactly the aggregate, accounting or potential arguments introduced here.
`
};
