window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['algo'] = {
  subject: 'Algorithms',
  topics: [
    {
      id: 'algo-asymptotic',
      name: 'Asymptotic Analysis & Recurrences',
      theory: {
        intro: 'Asymptotic analysis is the language in which every other algorithms topic is discussed, and GATE tests it directly every single year. You must be able to compare growth rates of functions, analyze the running time of loops and nested loops, and solve recurrences using substitution, recursion trees, and the Master theorem. The notations Big-O, Big-Omega and Theta describe upper, lower and tight bounds respectively; confusing them is the single most common source of lost marks. This topic also underlies numerical questions such as counting how many times an inner statement executes, or finding the smallest input size for which one algorithm beats another. Mastering it means you can look at code or a recurrence and, within a minute, name the growth class with confidence. Expect one to three marks from this topic alone, plus indirect use everywhere else in the paper.',
        core: 'Definitions. f(n) = O(g(n)) means there exist constants c > 0 and n0 such that f(n) <= c*g(n) for all n >= n0: g is an asymptotic upper bound. f(n) = Omega(g(n)) means f(n) >= c*g(n) eventually: a lower bound. f(n) = Theta(g(n)) means both hold simultaneously: a tight bound. Two useful facts: f = O(g) if and only if g = Omega(f), and f = Theta(g) iff lim f/g is a positive finite constant (when the limit exists). Note that O is not a strict order: n = O(n^2) is true even though the bound is loose.\n\nStandard growth hierarchy, slowest to fastest:\n• constants < log log n < log n < (log n)^k < n^c for 0 < c < 1 < n < n log n < n^2 < n^3 < 2^n < n! < n^n\n• Any polynomial beats any polylogarithm: (log n)^100 = o(n^0.001).\n• Any exponential with base > 1 beats any polynomial: n^100 = o(1.01^n).\n• Logarithm bases differ only by a constant factor, so log_2 n = Theta(log_10 n).\n• Useful identity: a^(log_b n) = n^(log_b a). For example 3^(log_2 n) = n^(log_2 3) which is about n^1.585.\n\nLoop analysis. A loop for(i = 1; i <= n; i = i*2) runs Theta(log n) times; for(i = 2; i <= n; i = i*i) runs Theta(log log n) times because i squares each step. A nested pair where the inner loop runs i times for outer index i gives sum 1+2+...+n = Theta(n^2). When the inner bound depends on the outer variable, always write the summation explicitly rather than multiplying worst cases blindly.\n\nRecurrences. Master theorem for T(n) = a*T(n/b) + f(n) with a >= 1, b > 1: compare f(n) with n^(log_b a). Case 1: if f(n) = O(n^(log_b a - e)) for some e > 0, then T(n) = Theta(n^(log_b a)). Case 2: if f(n) = Theta(n^(log_b a) * (log n)^k), then T(n) = Theta(n^(log_b a) * (log n)^(k+1)). Case 3: if f(n) is polynomially larger and satisfies the regularity condition a*f(n/b) <= c*f(n) for some c < 1, then T(n) = Theta(f(n)).\n\nClassic solved recurrences worth memorizing:\n• T(n) = 2T(n/2) + n gives Theta(n log n) (merge sort).\n• T(n) = 2T(n/2) + 1 gives Theta(n).\n• T(n) = T(n/2) + 1 gives Theta(log n) (binary search).\n• T(n) = T(n/2) + n gives Theta(n).\n• T(n) = T(n-1) + n gives Theta(n^2) (worst-case quicksort).\n• T(n) = 2T(n-1) + 1 gives Theta(2^n) (Tower of Hanoi).\n• T(n) = T(sqrt(n)) + 1 gives Theta(log log n) (substitute n = 2^m).\n\nFor recurrences the Master theorem cannot handle, draw a recursion tree: sum the work per level and count levels. Decreasing-size subtractive recurrences like T(n) = T(n-1) + f(n) simply telescope into a summation. The substitution method (guess and verify by induction) is the rigorous fallback and is occasionally needed for GATE-style proofs of correctness of a bound.',
        strategy: 'GATE patterns. (1) Rank three or four functions by growth rate; take logarithms of each function to compare, since log preserves order for increasing functions. (2) Decide truth of statements like "f = O(g) implies 2^f = O(2^g)" — this one is FALSE (take f = 2n, g = n). (3) Solve a Master-theorem recurrence, often engineered to land in Case 2 with an extra log factor, e.g. T(n) = 2T(n/2) + n log n gives Theta(n log^2 n). (4) Count exact executions of an inner statement, requiring a summation.\n\nTraps. The Master theorem does not apply when a is not constant (T(n) = nT(n/2) + n), when f(n) is negative, or when the ratio f(n)/n^(log_b a) is between polynomial sizes, e.g. T(n) = 2T(n/2) + n/log n — use a recursion tree there, which yields Theta(n log log n). Never conclude Theta from worst-case O alone. Remember worst case and upper bound are different ideas: insertion sort worst case is Theta(n^2), yet insertion sort is also O(n^3) as a true but loose statement.\n\nWorked mini-example. T(n) = 3T(n/4) + n log n. Here n^(log_4 3) is about n^0.79, and f(n) = n log n is polynomially larger; regularity holds since 3*(n/4)log(n/4) <= (3/4) n log n. So Case 3 gives Theta(n log n). Practice until this comparison takes under thirty seconds.'
      },
      questions: [
        {
          id: 'algo-asymptotic-q1',
          q: 'Which of the following statements is TRUE for functions f(n) = n log n and g(n) = n^1.5?',
          options: ['f(n) = Omega(g(n))', 'f(n) = Theta(g(n))', 'f(n) = O(g(n)) but f(n) is not Theta(g(n))', 'None of the above'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Compare n log n with n^1.5 by dividing both by n: we compare log n with n^0.5. Any positive polynomial power of n grows faster than any power of log n, so log n = o(n^0.5). Therefore n log n grows strictly slower than n^1.5, which means f(n) = O(g(n)) holds, but the bound is not tight, so f(n) is not Theta(g(n)) and certainly not Omega(g(n)). A quick limit check confirms it: lim (n log n)/(n^1.5) = lim (log n)/(n^0.5) = 0, and a limit of 0 means little-o, hence O but not Theta.'
        },
        {
          id: 'algo-asymptotic-q2',
          q: 'The recurrence T(n) = 2T(n/2) + n log n, T(1) = 1, solves to:',
          options: ['Theta(n log n)', 'Theta(n log^2 n)', 'Theta(n^2)', 'Theta(n (log log n))'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'Here a = 2, b = 2, so n^(log_b a) = n. The driving function f(n) = n log n equals n^(log_b a) times (log n)^1, which is the extended Case 2 of the Master theorem with k = 1. The theorem then gives T(n) = Theta(n^(log_b a) * (log n)^(k+1)) = Theta(n log^2 n). You can verify with a recursion tree: level i does work 2^i * (n/2^i) log(n/2^i) = n(log n - i). Summing over i from 0 to log n gives n * (log^2 n - (log n)(log n)/2 + ...) = Theta(n log^2 n). Note plain Case 3 does not apply because n log n is not polynomially larger than n.'
        },
        {
          id: 'algo-asymptotic-q3',
          q: 'Consider the loop: for (i = 1; i <= n; i = 2*i) { for (j = 0; j < i; j++) { count++; } }. The final value of count is closest to:',
          options: ['Theta(n)', 'Theta(n log n)', 'Theta(log^2 n)', 'Theta(n^2)'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The outer loop variable i takes values 1, 2, 4, 8, ..., up to n, i.e. about log n iterations. For each such i the inner loop runs exactly i times. So count = 1 + 2 + 4 + ... + 2^floor(log n), a geometric series that sums to about 2n - 1. A geometric series is dominated by its last term, so the total is Theta(n), not Theta(n log n). The common trap is multiplying the log n outer iterations by the worst inner cost n; that overestimates because most outer iterations have tiny inner cost. Always sum, never multiply blindly.'
        },
        {
          id: 'algo-asymptotic-q4',
          q: 'The recurrence T(n) = T(sqrt(n)) + 1 with T(2) = 1 solves to:',
          options: ['Theta(log n)', 'Theta(log log n)', 'Theta(sqrt(n))', 'Theta(1)'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'Substitute n = 2^m, so sqrt(n) = 2^(m/2). Define S(m) = T(2^m). The recurrence becomes S(m) = S(m/2) + 1, which is the binary search recurrence and solves to S(m) = Theta(log m). Substituting back m = log n gives T(n) = Theta(log log n). Intuition: each step replaces n by its square root, i.e. halves the number of bits in n; you can halve the bit count log log n times before reaching a constant. This substitution trick (n = 2^m) is the standard tool whenever sqrt(n) or n^(1/k) appears inside a recurrence.'
        },
        {
          id: 'algo-asymptotic-q5',
          q: 'Which one of the following is the tightest correct bound for T(n) = 4T(n/2) + n^2?',
          options: ['Theta(n^2)', 'Theta(n^2 log n)', 'Theta(n^3)', 'Theta(n log n)'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'With a = 4 and b = 2, n^(log_b a) = n^(log_2 4) = n^2. The driving function f(n) = n^2 matches n^(log_b a) exactly, so this is Master theorem Case 2 (with k = 0), which adds one logarithmic factor: T(n) = Theta(n^2 log n). A recursion tree confirms it: every one of the log n levels does exactly n^2 total work (level i has 4^i nodes each doing (n/2^i)^2 = n^2/4^i work), so the sum is n^2 * log n. Students who answer Theta(n^2) forget that equal work per level across log n levels multiplies, not dominates.'
        },
        {
          id: 'algo-asymptotic-q6',
          q: 'Let f(n) = 2^n and g(n) = n!. Which statement is TRUE?',
          options: ['f(n) = Omega(g(n))', 'f(n) = Theta(g(n))', 'g(n) = O(f(n))', 'f(n) = O(g(n)) and g(n) is not O(f(n))'],
          answer: 3,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Factorial grows strictly faster than any fixed-base exponential. Compare term by term: 2^n = 2*2*2*...*2 (n factors), while n! = 1*2*3*...*n. From the third factor onward every factor of n! is at least 3 > 2, so the ratio n!/2^n grows without bound. Formally, by Stirling, n! is about (n/e)^n * sqrt(2 pi n), and (n/e)^n eventually exceeds 2^n because n/e > 2 for n >= 6. Hence 2^n = O(n!) but n! is not O(2^n). The full hierarchy to remember: 2^n < n! < n^n.'
        },
        {
          id: 'algo-asymptotic-q7',
          q: 'Suppose f(n) = O(g(n)). Which of the following must be TRUE?',
          options: ['2^(f(n)) = O(2^(g(n)))', 'log f(n) = O(log g(n)), assuming f(n), g(n) >= 2', 'g(n) = O(f(n))', 'f(n)^2 = O(g(n))'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Option A fails: take f(n) = 2n and g(n) = n. Then f = O(g), but 2^(2n) = 4^n is not O(2^n) since the ratio 2^n diverges. Option C is the converse and clearly false (n = O(n^2) but not vice versa). Option D fails with f = g = n: n^2 is not O(n). Option B holds: f(n) <= c*g(n) for large n implies log f(n) <= log c + log g(n) <= 2 log g(n) once log g(n) >= log c, using g(n) >= 2 so log g(n) >= 1. Taking logs shrinks gaps and preserves O; exponentiating amplifies constant factors into exponential gaps and destroys it.'
        },
        {
          id: 'algo-asymptotic-q8',
          q: 'The value of 4^(log_2 n) expressed as a function of n is:',
          options: ['n', 'n^2', '2n', 'n log n'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Use the identity a^(log_b n) = n^(log_b a). Here a = 4 and b = 2, so 4^(log_2 n) = n^(log_2 4) = n^2. Alternatively, write 4 = 2^2, so 4^(log_2 n) = 2^(2 log_2 n) = (2^(log_2 n))^2 = n^2. This identity appears constantly in Master theorem work, where the number of leaves of the recursion tree is a^(log_b n) = n^(log_b a). Check with n = 16: log_2 16 = 4 and 4^4 = 256 = 16^2. Confirmed.'
        },
        {
          id: 'algo-asymptotic-q9',
          q: 'What is the time complexity of the loop: for (i = 2; i <= n; i = i*i) { statement; } assuming n > 4?',
          options: ['Theta(log n)', 'Theta(log log n)', 'Theta(sqrt(n))', 'Theta(n)'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The variable i takes values 2, 4, 16, 256, ..., i.e. 2^1, 2^2, 2^4, 2^8, ..., 2^(2^k) after k iterations, because squaring doubles the exponent. The loop stops when 2^(2^k) > n, i.e. when 2^k > log_2 n, i.e. when k > log_2 log_2 n. So the loop body executes Theta(log log n) times. Compare this with i = 2*i (which gives log n iterations): multiplying the variable gives log n, but squaring the variable gives log log n. This doubling-of-the-exponent pattern is the same one behind the T(n) = T(sqrt(n)) + 1 recurrence.'
        },
        {
          id: 'algo-asymptotic-q10',
          q: 'The recurrence T(n) = T(n-1) + n for n > 1, with T(1) = 1, has the solution:',
          options: ['Theta(n)', 'Theta(n log n)', 'Theta(n^2)', 'Theta(2^n)'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Unroll the recurrence: T(n) = n + T(n-1) = n + (n-1) + T(n-2) = ... = n + (n-1) + ... + 2 + 1 = n(n+1)/2. This is Theta(n^2). Subtractive recurrences like this telescope directly into a summation of the added terms, so T(n) = T(n-1) + f(n) always equals the sum of f(k) for k = 2..n plus T(1). This particular recurrence describes worst-case quicksort (pivot always smallest or largest element) and also the cost of insertion sort on reverse-sorted input, both classic GATE contexts. The Master theorem does not apply here because the subproblem size shrinks by subtraction, not division.'
        },
        {
          id: 'algo-asymptotic-q11',
          q: 'Arrange in increasing order of asymptotic growth: f1(n) = n^(log_2 3), f2(n) = n^1.5, f3(n) = 2^(sqrt(log n)), f4(n) = n log n.',
          options: ['f3 < f4 < f2 < f1', 'f3 < f4 < f1 < f2', 'f4 < f3 < f2 < f1', 'f3 < f2 < f4 < f1'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'pyq-style',
          explanation: 'Take log base 2 of each: log f1 = (log_2 3)(log n) which is about 1.585 log n; log f2 = 1.5 log n; log f3 = sqrt(log n); log f4 = log n + log log n. Comparing: sqrt(log n) grows slower than log n, so f3 is smallest — in fact f3 grows slower than every polynomial, even slower than n^0.001, since sqrt(log n) = o(c log n) for any c. Next, log f4 = log n + log log n is smaller than 1.5 log n eventually, so f4 < f2. Finally 1.5 < 1.585 gives f2 < f1. Order: f3 < f4 < f2 < f1.'
        },
        {
          id: 'algo-asymptotic-q12',
          q: 'For the recurrence T(n) = 7T(n/2) + n^2, the tight asymptotic bound is:',
          options: ['Theta(n^2)', 'Theta(n^2 log n)', 'Theta(n^(log_2 7))', 'Theta(n^3)'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'This is the recurrence of Strassen matrix multiplication. Here a = 7, b = 2, so n^(log_b a) = n^(log_2 7), which is about n^2.807. The driving function f(n) = n^2 is polynomially smaller than n^2.807 (the gap is n^0.807), so Master theorem Case 1 applies and the leaves dominate: T(n) = Theta(n^(log_2 7)). Contrast with ordinary divide-and-conquer matrix multiplication, T(n) = 8T(n/2) + n^2 = Theta(n^3); reducing 8 recursive multiplications to 7 is exactly what drops the exponent from 3 to log_2 7. Knowing log_2 7 is approximately 2.81 helps eliminate options instantly.'
        },
        {
          id: 'algo-asymptotic-q13',
          q: 'How many times is the statement inside the following nested loop executed? for (i = 1; i <= n; i++) { for (j = 1; j <= i; j = j*2) { statement; } }',
          options: ['Theta(n log n)', 'Theta(n)', 'Theta(n^2)', 'Theta(log^2 n)'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'For a fixed outer value i, the inner loop variable j doubles from 1 up to i, so it runs floor(log_2 i) + 1 times. The total count is the sum over i = 1..n of (log_2 i + 1) which is approximately log(n!) + n. By Stirling, log(n!) = Theta(n log n), so the total is Theta(n log n). Alternatively bound it: at most n * (log n + 1) = O(n log n), and the upper half of the terms (i from n/2 to n) each contribute at least log(n/2), giving Omega((n/2) log(n/2)) = Omega(n log n). Both bounds match, so the answer is tight.'
        },
        {
          id: 'algo-asymptotic-q14',
          q: 'The Master theorem CANNOT be directly applied to which of the following recurrences?',
          options: ['T(n) = 2T(n/2) + n^3', 'T(n) = 3T(n/3) + n/2', 'T(n) = 2T(n/2) + n / log n', 'T(n) = 16T(n/4) + n^2'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Options A, B, D all fit the standard cases: A has f(n) = n^3 polynomially larger than n (Case 3, Theta(n^3)); B has f(n) = Theta(n) matching n^(log_3 3) = n (Case 2, Theta(n log n)); D has f(n) = n^2 matching n^(log_4 16) = n^2 (Case 2, Theta(n^2 log n)). In option C, n^(log_2 2) = n and f(n) = n/log n is smaller than n, but only by a logarithmic factor, not by a polynomial factor n^e — so Case 1 fails, and Case 2 in its basic form needs f(n) = Theta(n (log n)^k) with k >= 0, while here k = -1. A recursion tree gives level sums n/log n + n/(log n - 1) + ... which totals Theta(n log log n), a result outside the basic theorem.'
        },
        {
          id: 'algo-asymptotic-q15',
          q: 'An algorithm has running time T(n) = 2T(n-1) + 1 with T(1) = 1. The exact solution is:',
          options: ['2^n - 1', 'n^2', '2^(n-1)', 'n * 2^n'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'This is the Tower of Hanoi recurrence. Unroll it: T(n) = 2T(n-1) + 1 = 2(2T(n-2) + 1) + 1 = 4T(n-2) + 2 + 1 = ... = 2^(n-1) T(1) + (2^(n-2) + ... + 2 + 1) = 2^(n-1) + 2^(n-1) - 1 = 2^n - 1. Verify small cases: T(1) = 1 = 2^1 - 1; T(2) = 2*1 + 1 = 3 = 2^2 - 1; T(3) = 2*3 + 1 = 7 = 2^3 - 1. The pattern holds by induction: 2(2^(n-1) - 1) + 1 = 2^n - 1. Any recurrence that spawns two subproblems of size n-1 explodes exponentially — a key contrast with 2T(n/2) recurrences, which stay in n log n territory.'
        },
        {
          id: 'algo-asymptotic-q16',
          q: 'Which of the following is TRUE about the statement: "The worst-case running time of algorithm X is O(n^2)"?',
          options: ['X takes Theta(n^2) time on some input', 'X takes at most c*n^2 time on every input, for some constant c and large n', 'X takes at least n^2 time on its worst input', 'The average-case time of X must be Theta(n^2)'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Saying the worst case is O(n^2) only asserts an upper bound on the most expensive input, and since no input can cost more than the worst one, every input runs in at most c*n^2 time for sufficiently large n. That is exactly option B. Option A would require the bound to be tight (Theta), but O permits looseness — an algorithm running in Theta(n log n) still has worst case O(n^2). Option C claims a lower bound, which O never provides. Option D confuses cases entirely: average case is bounded above by worst case but need not match it (quicksort: average Theta(n log n), worst Theta(n^2)).'
        }
      ]
    },
    {
      id: 'algo-divide-conquer',
      name: 'Divide and Conquer',
      theory: {
        intro: 'Divide and conquer solves a problem by splitting it into smaller independent subproblems of the same kind, solving those recursively, and combining the answers. Its running time is therefore naturally described by a recurrence, which links this topic tightly to asymptotic analysis. GATE focuses on a small set of canonical algorithms: merge sort, quicksort and its partition procedure, binary search and its variants, finding both maximum and minimum with few comparisons, and counting inversions. Questions usually probe exact comparison counts, the effect of pivot choice on quicksort, best and worst cases, and how modifying the split changes the recurrence. The paradigm shines when subproblems are independent and roughly equal in size; when subproblems overlap, dynamic programming takes over. Being fluent with the standard recurrences and the mechanics of partitioning lets you answer most questions here in under two minutes.',
        core: 'Merge sort. Split the array in half, sort each half recursively, then merge in Theta(n) time. Recurrence T(n) = 2T(n/2) + Theta(n) = Theta(n log n) in ALL cases — best, average, and worst — because the split is always exactly in half regardless of data. Merging two sorted lists of sizes m and n needs at most m + n - 1 comparisons (worst case, when the lists interleave) and as few as min(m, n) (when one list entirely precedes the other). Merge sort is stable if the merge takes from the left half on ties, but it is not in-place in its standard form: it needs Theta(n) auxiliary space plus Theta(log n) recursion stack.\n\nQuicksort. Choose a pivot, partition the array so elements smaller than the pivot precede it and larger ones follow, then recurse on the two sides. Partition (Lomuto or Hoare) takes Theta(n) time and is in-place. The recurrence depends on the split: best case T(n) = 2T(n/2) + Theta(n) = Theta(n log n); worst case T(n) = T(n-1) + Theta(n) = Theta(n^2), which occurs for sorted or reverse-sorted input with a first/last-element pivot. Average case over random inputs is Theta(n log n) with roughly 1.39 n log_2 n comparisons. A fixed proportional split like 1:9 still gives Theta(n log n), because the recursion depth stays O(log n) with a larger constant. Randomized pivoting makes the worst case unlikely rather than impossible. Standard quicksort is not stable.\n\nBinary search. On a sorted array, compare with the middle element and discard half. Recurrence T(n) = T(n/2) + Theta(1) = Theta(log n); at most floor(log_2 n) + 1 comparisons. Variants GATE likes:\n• First/last occurrence of a repeated key: keep searching the appropriate half after a match.\n• Search in a rotated sorted array: one half is always sorted; decide which and recurse — still Theta(log n).\n• Finding a peak element or fixed point A[i] = i: same halving idea.\n\nMax and min together. The naive approach uses 2n - 3 comparisons (n - 1 for max, n - 2 for min among the rest). The divide-and-conquer or pairwise method uses only ceil(3n/2) - 2 comparisons: process elements in pairs, compare the two (n/2 comparisons), then compare the smaller against the running min and the larger against the running max (n/2 each). For n a power of 2, the recurrence T(n) = 2T(n/2) + 2, T(2) = 1 also solves to (3n/2) - 2. This bound is optimal.\n\nCounting inversions. An inversion is a pair i < j with A[i] > A[j]. Modify merge sort: whenever an element from the right half is placed before remaining elements of the left half during merge, it forms inversions with every one of those remaining left elements — add (number left in left half). Total time Theta(n log n), versus Theta(n^2) brute force. Maximum inversions in an n-element array is n(n-1)/2 (reverse-sorted input).\n\nOther classics: finding the k-th smallest via quickselect runs in expected Theta(n) but worst-case Theta(n^2); median-of-medians makes selection worst-case Theta(n). Karatsuba multiplies n-digit integers via T(n) = 3T(n/2) + Theta(n) = Theta(n^(log_2 3)). Strassen multiplies matrices via T(n) = 7T(n/2) + Theta(n^2) = Theta(n^(log_2 7)).',
        strategy: 'GATE patterns. (1) Exact comparison counts: merging lists (m + n - 1 worst case), max-min (ceil(3n/2) - 2), binary search (floor(log_2 n) + 1). Memorize these closed forms and be ready to plug in numbers, e.g. merging sorted lists of sizes 4 and 5 needs at most 8 comparisons. (2) Quicksort behavior: identify inputs causing worst case, the recurrence for a given split, and the number of times partition is called. (3) Recurrence identification: given pseudo-code, write the recurrence and solve it. (4) Inversion counting on a small concrete array — just count pairs carefully.\n\nTraps. Quicksort worst case on already-sorted input applies to first-element or last-element pivots; median pivot would give Theta(n log n). "Merge sort worst case" questions sometimes really ask about the merge step only. For binary search on n elements, the maximum number of PROBES is floor(log_2 n) + 1; do not confuse with ceil(log_2 (n+1)), which is the same value written differently. Quickselect does NOT sort — it recurses into only one side, giving expected linear time.\n\nWorked mini-example. Count comparisons for max-min on 8 elements: pair them (4 comparisons), the 4 winners need 3 comparisons for max, the 4 losers need 3 for min: total 10 = 3*8/2 - 2. If asked for n = 100: 3*100/2 - 2 = 148. Answer numeric questions by formula, then sanity-check with a tiny case like n = 2 (one comparison).'
      },
      questions: [
        {
          id: 'algo-divide-conquer-q1',
          q: 'The minimum number of comparisons required to find both the maximum and the minimum of 100 numbers is:',
          options: ['198', '148', '100', '197'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'The optimal pairwise method: split the 100 numbers into 50 pairs and compare within each pair (50 comparisons). The 50 pair-winners are candidates for the maximum: finding the max among 50 numbers takes 49 more comparisons. The 50 pair-losers are candidates for the minimum: 49 comparisons. Total = 50 + 49 + 49 = 148, which matches the formula ceil(3n/2) - 2 = 150 - 2 = 148. The naive method (find max with 99 comparisons, then min of the rest with 98) uses 197, and 2n - 2 = 198 is even worse. The information-theoretic lower bound also equals ceil(3n/2) - 2, so 148 is optimal.'
        },
        {
          id: 'algo-divide-conquer-q2',
          q: 'Two sorted lists of sizes m and n are merged into a single sorted list. The number of comparisons needed in the worst case is:',
          options: ['m + n', 'm + n - 1', 'max(m, n)', 'm * n'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Each comparison of the two current front elements outputs exactly one element. In the worst case the lists interleave perfectly, so comparisons keep happening until one list has a single element left after the other is nearly done; the last element is then copied without a comparison. Since m + n elements are output and the final element needs no comparison, the worst case is m + n - 1 comparisons. Example: merging (1,3,5) with (2,4,6) uses 5 = 3 + 3 - 1 comparisons. The best case is min(m, n), occurring when every element of the shorter list is smaller than the first element of the longer list.'
        },
        {
          id: 'algo-divide-conquer-q3',
          q: 'Quicksort is run on an array that is already sorted in ascending order, using the last element as the pivot. Its running time is:',
          options: ['Theta(n log n)', 'Theta(n)', 'Theta(n^2)', 'Theta(log n)'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'With the last element as pivot on sorted input, the pivot is always the maximum, so partition splits the array into a subarray of size n - 1 and an empty subarray. The recurrence becomes T(n) = T(n-1) + Theta(n) for the partitioning work, which telescopes to Theta(n + (n-1) + ... + 1) = Theta(n^2). This is the classic quicksort worst case: maximally unbalanced splits. The same happens with the first element as pivot on sorted or reverse-sorted input. Choosing the median as pivot, or a random pivot in expectation, restores Theta(n log n). Remember: sorted input is quicksort-worst but insertion-sort-best.'
        },
        {
          id: 'algo-divide-conquer-q4',
          q: 'If quicksort always splits the array in the ratio 1:99 (1% and 99%), its worst-case running time is:',
          options: ['Theta(n^2)', 'Theta(n log n)', 'Theta(n^1.99)', 'Theta(n log^2 n)'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'The recurrence is T(n) = T(n/100) + T(99n/100) + Theta(n). In the recursion tree, every level does at most Theta(n) total work (the pieces at a level sum to at most n), and the depth is governed by the slowest-shrinking branch: n reduced by factor 100/99 each step, giving depth log_{100/99} n = Theta(log n). So total work is Theta(n) per level times Theta(log n) levels = Theta(n log n). The lesson: ANY fixed proportional split, however lopsided, yields Theta(n log n); only splits that peel off a constant number of elements (like 1 vs n-1) degrade to Theta(n^2). The constant hidden in Theta grows as the split worsens.'
        },
        {
          id: 'algo-divide-conquer-q5',
          q: 'The maximum number of element comparisons made by binary search on a sorted array of 1000 elements is:',
          options: ['9', '10', '11', '1000'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Binary search halves the search space with each comparison. Starting from 1000: 1000 -> 500 -> 250 -> 125 -> 62 -> 31 -> 15 -> 7 -> 3 -> 1, which is 9 halvings, and one final comparison on the single remaining element makes 10. The formula is floor(log_2 n) + 1: log_2 1000 is about 9.97, floor gives 9, plus 1 equals 10. Equivalently, k comparisons suffice for any array of size up to 2^k - 1; since 2^9 - 1 = 511 < 1000 <= 1023 = 2^10 - 1, exactly 10 comparisons are needed in the worst case.'
        },
        {
          id: 'algo-divide-conquer-q6',
          q: 'The number of inversions in the array A = [8, 4, 2, 1] is:',
          options: ['4', '5', '6', '3'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'An inversion is a pair (i, j) with i < j and A[i] > A[j]. List them: (8,4), (8,2), (8,1) — three pairs with the first element; (4,2), (4,1) — two more; (2,1) — one more. Total 6. Notice the array is in strictly decreasing order, and a reverse-sorted array of n elements achieves the maximum possible n(n-1)/2 inversions: here 4*3/2 = 6, confirming the count. Inversions measure "sortedness": a sorted array has 0, and each adjacent swap (as in bubble/insertion sort) removes exactly one inversion, so insertion sort on this array performs exactly 6 element moves past.'
        },
        {
          id: 'algo-divide-conquer-q7',
          q: 'Counting the number of inversions in an array of n distinct elements can be done in O(n log n) time by modifying which algorithm?',
          options: ['Quicksort', 'Merge sort', 'Heap sort', 'Binary search'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Merge sort is the natural fit because its merge step compares elements across the two halves in sorted order. When merging, if the next element taken comes from the right half while k elements remain unmerged in the left half, that right element is smaller than all k of them, and each such pair is an inversion — so add k to the count. Inversions entirely within a half are counted by the recursive calls. The recurrence stays T(n) = 2T(n/2) + Theta(n) = Theta(n log n). Quicksort does not work directly because partitioning reorders elements in a way that destroys the cross-pair structure needed for counting.'
        },
        {
          id: 'algo-divide-conquer-q8',
          q: 'A sorted array is rotated an unknown number of times, e.g. [15, 22, 2, 7, 9, 12]. The minimum element can be found in the best asymptotic worst-case time of:',
          options: ['Theta(n)', 'Theta(log n)', 'Theta(n log n)', 'Theta(1)'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'A rotated sorted array with distinct elements consists of two sorted runs, and the minimum is the start of the second run. Binary search applies: compare the middle element A[mid] with the last element A[high]. If A[mid] > A[high] (e.g. 22 > 12), the rotation point lies strictly to the right of mid, so search (mid, high]. Otherwise the minimum lies in [low, mid]. Each comparison halves the range, giving Theta(log n) worst case. In the example: mid element 2 vs last 12 gives 2 <= 12, search left half including 2, and so on until the range is a single element. Linear scan works but is asymptotically worse.'
        },
        {
          id: 'algo-divide-conquer-q9',
          q: 'The recurrence for the standard divide-and-conquer algorithm that returns BOTH the maximum and minimum of an array of size n (n a power of 2) is T(n) = 2T(n/2) + 2 with T(2) = 1. The exact number of comparisons is:',
          options: ['2n - 2', '(3n/2) - 2', 'n log n', 'n - 1'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Solve the recurrence for n = 2^k. Guess T(n) = (3n/2) - 2 and verify by induction: base T(2) = 3 - 2 = 1, correct. Inductive step: 2T(n/2) + 2 = 2((3n/4) - 2) + 2 = (3n/2) - 4 + 2 = (3n/2) - 2. Confirmed. Concretely for n = 8: T(8) = 2T(4) + 2 = 2(2T(2) + 2) + 2 = 2(4) + 2 = 10 = 24/2 - 2. The "+2" combine cost comes from comparing the two sub-maxima and the two sub-minima. This matches the pairwise method and is provably optimal for simultaneous max-min.'
        },
        {
          id: 'algo-divide-conquer-q10',
          q: 'Which of the following is TRUE about merge sort?',
          options: ['Its worst case is Theta(n^2) on reverse-sorted input', 'Its best case is Theta(n)', 'It runs in Theta(n log n) in best, average, and worst cases', 'It is an in-place sorting algorithm in its standard form'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Merge sort always divides exactly in half regardless of the data, so the recurrence T(n) = 2T(n/2) + Theta(n) holds for every input, giving Theta(n log n) in all cases. The number of COMPARISONS varies (already-sorted input triggers the cheap min(m,n) merge case), but the running time remains Theta(n log n) because the merge must still copy all elements. Option A confuses merge sort with quicksort. Option B is wrong: even on sorted input the algorithm performs all the recursive splits and merges. Option D is wrong: standard merge sort needs a Theta(n) auxiliary array; in-place merging variants exist but are not the standard algorithm.'
        },
        {
          id: 'algo-divide-conquer-q11',
          q: 'Quickselect (randomized selection) is used to find the median of an unsorted array of n distinct elements. Its expected and worst-case running times are, respectively:',
          options: ['Theta(n) and Theta(n^2)', 'Theta(n log n) and Theta(n^2)', 'Theta(n) and Theta(n log n)', 'Theta(log n) and Theta(n)'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Quickselect partitions like quicksort but recurses into only ONE side — the side containing the k-th position. With a random pivot the expected subproblem size shrinks geometrically, giving the recurrence roughly T(n) = T(3n/4) + Theta(n) in expectation, which sums as a geometric series to Theta(n). The worst case mirrors quicksort: consistently terrible pivots give T(n) = T(n-1) + Theta(n) = Theta(n^2). If a guaranteed linear worst case is required, the median-of-medians pivot rule achieves deterministic Theta(n) via T(n) <= T(n/5) + T(7n/10) + Theta(n), because 1/5 + 7/10 < 1. GATE frequently contrasts these three running times.'
        },
        {
          id: 'algo-divide-conquer-q12',
          q: 'In one execution of the Lomuto partition procedure on an array of n elements, the number of element comparisons with the pivot is exactly:',
          options: ['n', 'n - 1', 'n/2', 'It depends on the input values'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Lomuto partition fixes the last element as the pivot and scans every other element once, comparing each with the pivot to decide whether it belongs in the low side. There are n - 1 non-pivot elements, hence exactly n - 1 comparisons, independent of the input values — the VALUES determine how many swaps occur, not how many comparisons. This is why quicksort analysis counts total comparisons as the sum of (subarray size - 1) over all partition calls: n - 1 at the top level, and so on. Recognizing that partition cost is data-independent while the SPLIT is data-dependent is the key insight behind best/worst case analysis.'
        },
        {
          id: 'algo-divide-conquer-q13',
          q: 'Karatsuba multiplication of two n-digit numbers uses three recursive multiplications of n/2-digit numbers plus Theta(n) additions. Its running time is:',
          options: ['Theta(n^2)', 'Theta(n log n)', 'Theta(n^(log_2 3))', 'Theta(n^1.5)'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'The recurrence is T(n) = 3T(n/2) + Theta(n). Compare f(n) = n with n^(log_2 3), which is about n^1.585. Since n is polynomially smaller, Master theorem Case 1 applies and the leaves dominate: T(n) = Theta(n^(log_2 3)), roughly Theta(n^1.585). The clever step is computing the middle product (a+b)(c+d) - ac - bd, replacing the fourth multiplication with additions; the naive scheme with four recursive multiplications gives T(n) = 4T(n/2) + Theta(n) = Theta(n^2), no better than schoolbook multiplication. This "reduce the number of recursive calls" trick is the same idea behind Strassen: 7 multiplications instead of 8 drops Theta(n^3) to Theta(n^2.807).'
        },
        {
          id: 'algo-divide-conquer-q14',
          q: 'A binary search variant must return the FIRST (leftmost) occurrence of a key that appears multiple times in a sorted array of n elements. The worst-case time of the best such algorithm is:',
          options: ['Theta(log n)', 'Theta(n)', 'Theta(log^2 n)', 'Theta(n log n)'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Modify binary search: when A[mid] equals the key, record mid as a candidate answer but continue searching the LEFT half (high = mid - 1), because an earlier occurrence may exist; when A[mid] < key search right, otherwise search left. Every iteration still halves the range, so the loop runs Theta(log n) times regardless of how many duplicates exist — even if all n elements equal the key. The naive fix of finding any occurrence and then scanning left linearly degrades to Theta(n) when duplicates are numerous, which is exactly the trap the question tests. The symmetric variant (continue right on a match) finds the last occurrence, and the two together count occurrences in Theta(log n).'
        },
        {
          id: 'algo-divide-conquer-q15',
          q: 'Merge sort is applied to the 8-element array [7, 6, 5, 4, 3, 2, 1, 0]. The total number of element comparisons performed in the merge steps is:',
          options: ['12', '16', '17', '24'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Trace the merges. Level 1 merges pairs: (7,6), (5,4), (3,2), (1,0) — each merge of two singletons uses 1 comparison, and since the arrays are reverse-sorted each pair merges after that single comparison: 4 comparisons, producing (6,7), (4,5), (2,3), (0,1). Level 2 merges (6,7) with (4,5): compare 6 vs 4, 6 vs 5, then copy — 2 comparisons (all right-half elements are smaller, so the right list exhausts after min(m,n) = 2 comparisons). Similarly (2,3) with (0,1): 2 comparisons. Level 3 merges (4,5,6,7) with (0,1,2,3): the right list is entirely smaller, exhausting after 4 comparisons. Total = 4 + 2 + 2 + 4 = 12. Reverse-sorted input is actually a CHEAP case for merge comparisons.'
        }
      ]
    },
    {
      id: 'algo-greedy',
      name: 'Greedy Algorithms',
      theory: {
        intro: 'A greedy algorithm builds a solution step by step, always taking the choice that looks best right now and never revisiting it. When this works it gives simple, fast algorithms; when it fails it can be arbitrarily bad, so GATE tests both the classic successes and the failure modes. The standard success stories are activity selection, fractional knapsack, Huffman coding, job sequencing with deadlines, and the MST and shortest-path algorithms covered in the graph topic. Correctness always rests on two properties: the greedy-choice property (some optimal solution agrees with the first greedy choice) and optimal substructure (after the choice, the residual problem is of the same type). Proofs use an exchange argument: take any optimal solution and swap pieces until it matches greedy without losing value. Expect numerical questions where you simulate the greedy procedure on concrete data and conceptual ones asking when greedy is optimal.',
        core: 'Activity selection. Given activities with start and finish times, select a maximum-size subset of mutually non-overlapping activities. The correct greedy rule: sort by FINISH time and repeatedly pick the earliest-finishing activity compatible with those already chosen. Runs in Theta(n log n) for sorting plus Theta(n) selection. Rules that fail: shortest duration first, earliest start first, fewest conflicts first — each has small counterexamples worth constructing once. The exchange argument: the earliest-finishing activity can replace the first activity of any optimal solution without creating conflicts, since it finishes no later.\n\nFractional knapsack. Items have weight and value; fractions may be taken; capacity W. Greedy by highest value/weight ratio is optimal: fill items in ratio order, taking a fraction of the last item to fill capacity exactly. Runs in Theta(n log n). The exchange argument: if an optimal solution carries some of a lower-ratio item while a higher-ratio item is not fully taken, swapping equal weights strictly improves value — contradiction. The 0/1 version, where items are indivisible, is NOT solved by this greedy; a low-ratio but high-value item may be optimal, so 0/1 knapsack needs dynamic programming.\n\nHuffman coding. Build an optimal prefix-free binary code for characters with given frequencies: repeatedly extract the two least frequent nodes, merge them under a new node whose frequency is their sum, and reinsert. With a min-heap this is Theta(n log n). Properties:\n• The two least frequent symbols are always siblings at the deepest level of some optimal tree.\n• The total encoded length equals the sum over symbols of frequency times depth, and also equals the sum of all internal node weights created during merging.\n• A prefix code means no codeword is a prefix of another; decoding is unambiguous.\n• With n symbols the tree has n leaves and n - 1 internal nodes; maximum codeword length can reach n - 1 for Fibonacci-like frequencies.\n\nJob sequencing with deadlines. Each unit-time job has a deadline and a profit; schedule at most one job per slot to maximize profit. Greedy: sort jobs by decreasing profit; place each job in the LATEST free slot at or before its deadline; discard if none. Correctness again follows by exchange. Simple implementation Theta(n^2); with union-find, near Theta(n log n).\n\nWhen greedy fails. 0/1 knapsack: ratio-greedy is suboptimal. Coin change: for arbitrary denominations, largest-coin-first can fail (denominations 1, 3, 4 with amount 6: greedy 4+1+1 uses three coins, optimal 3+3 uses two); it happens to succeed for canonical systems like 1, 2, 5, 10. Shortest paths with negative edges: greedy Dijkstra fails. Longest path, TSP, graph coloring: no simple greedy is optimal. The moral: greedy optimality is a theorem to be proven per problem, never an assumption.\n\nExchange-argument template. Assume OPT is an optimal solution differing from greedy G. Find the first point of difference, show swapping the OPT choice for the G choice keeps feasibility and does not reduce the objective, and repeat. After finitely many exchanges OPT transforms into G with equal value, so G is optimal. GATE occasionally asks which step of such a proof is invalid for a failing greedy — the swap breaks feasibility or loses value.',
        strategy: 'GATE patterns. (1) Simulate: compute the exact profit of job sequencing, the value of fractional knapsack, or the total bits of a Huffman encoding for given frequencies. Work slot by slot or merge by merge, writing every step — arithmetic slips are the main killer. (2) Huffman structure: given frequencies, find a valid codeword length vector or the depth of a symbol; remember the two smallest frequencies always end up deepest. (3) Identify the correct greedy criterion: earliest finish for activities, max ratio for fractional knapsack, max profit for job sequencing. (4) Counterexample recognition: pick the option where greedy fails, typically 0/1 knapsack or general coin change.\n\nTraps. In Huffman problems, different valid trees can give different individual code lengths but the SAME total cost; questions asking "which code length vector is possible" require checking Kraft equality (sum of 2^(-l_i) = 1) plus sibling structure, not just one tree you happened to build. In job sequencing, filling the EARLIEST free slot instead of the latest can wrongly discard later jobs — simulate with the latest-slot rule. Activity selection maximizes the COUNT of activities, not total duration.\n\nWorked mini-example. Frequencies 5, 9, 12, 13: merge 5+9 = 14; now 12, 13, 14; merge 12+13 = 25; merge 14+25 = 39. Total cost = 14 + 25 + 39 = 78 bits (sum of internal nodes). Depths: 5 and 9 at depth 2... check: tree is (5,9) under 14, (12,13) under 25 — all four leaves at depth 2, cost = 2*(5+9+12+13) = 78. Consistent.'
      },
      questions: [
        {
          id: 'algo-greedy-q1',
          q: 'In the optimal solution of the activity selection problem, activities are greedily chosen in increasing order of:',
          options: ['start time', 'duration', 'finish time', 'number of overlaps'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Sorting by finish time and always picking the earliest-finishing compatible activity is the provably optimal greedy rule: the activity that finishes first leaves the maximum remaining time for future activities, and an exchange argument shows it can replace the first activity of any optimal schedule. The other rules all have counterexamples. Earliest start fails when a long activity starts first and blocks everything (one activity covering the whole day versus many short ones). Shortest duration fails when a short activity straddles two long compatible ones. Fewest overlaps fails on slightly larger constructed instances. Only the earliest-finish rule survives all cases.'
        },
        {
          id: 'algo-greedy-q2',
          q: 'A knapsack has capacity 40 kg. Items: I1 (weight 10, value 100), I2 (weight 20, value 120), I3 (weight 30, value 120). If fractions of items are allowed, the maximum total value is:',
          options: ['220', '240', '260', '280'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Compute value/weight ratios: I1 = 100/10 = 10, I2 = 120/20 = 6, I3 = 120/30 = 4. Greedy takes items in decreasing ratio order. Take all of I1: capacity used 10, value 100. Take all of I2: capacity used 30, value 220. Remaining capacity is 40 - 30 = 10, so take 10/30 = 1/3 of I3, adding (1/3)*120 = 40. Total value = 100 + 120 + 40 = 260. This greedy is optimal for the fractional version by an exchange argument: any solution carrying low-ratio weight while high-ratio material remains can be improved by swapping. Note the same data under 0/1 rules gives 220 (I1 + I2) since I3 cannot be split.'
        },
        {
          id: 'algo-greedy-q3',
          q: 'Characters a, b, c, d, e, f have frequencies 45, 13, 12, 16, 9, 5 respectively. In an optimal Huffman code, the codeword length of character a is:',
          options: ['1', '2', '3', '4'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'Run the merges, always combining the two smallest: 5 + 9 = 14; then 12 + 13 = 25; then 14 + 16 = 30; then 25 + 30 = 55; finally 45 + 55 = 100. Character a (frequency 45) is merged only at the very last step, so it sits at depth 1 — its codeword has length 1 (say, bit 0), and every other codeword starts with the opposite bit. This is typical: a symbol whose frequency exceeds the combined weight of everything it competes with stays shallow. The full depth vector here is a:1, b:3, c:3, d:3, e:4, f:4, giving total cost 45 + 39 + 36 + 48 + 36 + 20 = 224 bits.'
        },
        {
          id: 'algo-greedy-q4',
          q: 'Five characters have frequencies 1, 1, 2, 4, 8. The length of the LONGEST codeword in the optimal Huffman code is:',
          options: ['3', '4', '5', '2'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Merge the two smallest repeatedly: 1 + 1 = 2; now 2, 2, 4, 8: merge 2 + 2 = 4; now 4, 4, 8: merge 4 + 4 = 8; now 8, 8: merge to 16. Every merge combines the newest node with the next frequency, producing a completely skewed tree: the two frequency-1 symbols end at depth 4, frequency 2 at depth 3, frequency 4 at depth 2, frequency 8 at depth 1. Longest codeword length = 4 = n - 1 for n = 5 symbols. Such maximally skewed trees arise exactly when frequencies grow at least as fast as Fibonacci numbers, a standard GATE fact: with n symbols the maximum possible Huffman code length is n - 1.'
        },
        {
          id: 'algo-greedy-q5',
          q: 'Unit-time jobs with (deadline, profit): J1 (2, 60), J2 (1, 100), J3 (3, 20), J4 (2, 40), J5 (1, 20). Each job takes one time slot and must finish by its deadline. The maximum total profit is:',
          options: ['160', '180', '200', '140'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Sort by decreasing profit: J2 (100, d=1), J1 (60, d=2), J4 (40, d=2), J3 (20, d=3), J5 (20, d=1). Place each in the latest free slot at or before its deadline. J2 goes to slot 1. J1 goes to slot 2. J4 wants slot 2 or 1 — both taken, so J4 is rejected. J3 goes to slot 3. J5 wants slot 1 — taken, rejected. Schedule: slot1 = J2, slot2 = J1, slot3 = J3. Total profit = 100 + 60 + 20 = 180. Note the latest-free-slot rule matters: placing J1 in slot 1 early would have been a mistake in other instances; here the greedy-by-profit with latest-slot placement is provably optimal.'
        },
        {
          id: 'algo-greedy-q6',
          q: 'With coin denominations {1, 3, 4} and amount 6, the largest-coin-first greedy uses how many coins, and the optimal uses how many?',
          options: ['3 and 2', '2 and 2', '3 and 3', '2 and 1'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Greedy repeatedly takes the largest coin not exceeding the remaining amount: take 4 (remaining 2), cannot take 3, take 1 (remaining 1), take 1 (remaining 0) — three coins: 4 + 1 + 1. The optimal solution is 3 + 3 — two coins. This is the standard counterexample showing that the greedy coin-change algorithm is not correct for arbitrary denomination systems, even though it happens to be optimal for canonical systems such as {1, 2, 5, 10}. The correct general method is dynamic programming over amounts, computing minCoins(v) = 1 + min over coins c of minCoins(v - c), which here yields minCoins(6) = 2.'
        },
        {
          id: 'algo-greedy-q7',
          q: 'Which of the following problems is NOT correctly solved by a natural greedy algorithm?',
          options: ['Fractional knapsack', 'Huffman coding', '0/1 knapsack', 'Minimum spanning tree'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Fractional knapsack (greedy by value/weight ratio), Huffman coding (merge two smallest frequencies), and MST (Kruskal or Prim, both greedy) all have exchange-argument proofs of optimality. The 0/1 knapsack has no correct greedy: with capacity 10 and items (weight 6, value 60), (weight 5, value 50), (weight 5, value 50), the ratio greedy picks the first item for value 60 and can fit nothing else, while the optimal takes the two smaller items for 100. Indivisibility breaks the exchange argument — you cannot swap a fraction of one item for a fraction of another. 0/1 knapsack requires dynamic programming (pseudo-polynomial O(nW)) and is NP-hard in general.'
        },
        {
          id: 'algo-greedy-q8',
          q: 'A message uses 4 characters with frequencies 10, 15, 30, 45 (total 100). The total number of bits in the optimal Huffman encoding of the message is:',
          options: ['180', '190', '200', '210'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Build the Huffman tree by repeatedly merging the two smallest weights. Merge 10 + 15 = 25; the pool becomes {25, 30, 45}. Merge 25 + 30 = 55; the pool becomes {55, 45}. Merge 45 + 55 = 100 (root). The resulting depths are: 45 at depth 1, 30 at depth 2, and 10 and 15 at depth 3. Total bits = sum of frequency times depth = 45*1 + 30*2 + 10*3 + 15*3 = 45 + 60 + 30 + 45 = 180. Cross-check with the internal-node shortcut: total cost equals the sum of the weights of all merge nodes created = 25 + 55 + 100 = 180. Both methods agree, so the answer is 180 bits. The shortcut is worth remembering — it turns a depth calculation into simple addition of the merge sums.'
        },
        {
          id: 'algo-greedy-q9',
          q: 'Which property must a problem have for a greedy algorithm to be PROVABLY optimal?',
          options: ['Overlapping subproblems and memoization', 'Greedy-choice property and optimal substructure', 'A totally ordered input and a linear objective', 'Matroid structure in every case'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The two standard conditions are: (1) the greedy-choice property — some optimal solution contains the first greedy choice, so committing to it never forecloses optimality; and (2) optimal substructure — after making that choice, the remaining problem is a smaller instance of the same problem whose optimal solution extends the choice to a global optimum. Together they support an induction/exchange proof. Overlapping subproblems (option A) characterize dynamic programming, not greedy — greedy solves exactly ONE subproblem after each choice. Matroids (option D) give a sufficient framework for a family of greedy problems (like MST) but are not necessary: Huffman and activity selection are provably greedy-optimal without being plain matroid problems.'
        },
        {
          id: 'algo-greedy-q10',
          q: 'In Huffman coding of n distinct characters (n >= 2), the number of internal nodes in the code tree is:',
          options: ['n', 'n - 1', '2n - 1', 'log n'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'The Huffman tree is a full binary tree (every internal node has exactly two children) with exactly n leaves, one per character. In any full binary tree, the number of internal nodes is one less than the number of leaves: each merge operation reduces the count of root nodes by one, and going from n separate nodes to one tree takes exactly n - 1 merges, each creating one internal node. So there are n - 1 internal nodes and 2n - 1 nodes in total. This also explains the algorithm cost: n - 1 heap-extract-min pairs and inserts give Theta(n log n) with a binary heap.'
        },
        {
          id: 'algo-greedy-q11',
          q: 'Which of the following codeword length vectors CANNOT correspond to any optimal Huffman code for 4 symbols (in some frequency order)?',
          options: ['(1, 2, 3, 3)', '(2, 2, 2, 2)', '(1, 1, 2, 2)', '(3, 3, 2, 1)'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'A Huffman tree is a FULL binary tree (every internal node has two children), so its codeword lengths must satisfy the Kraft equality: the sum of 2^(-l_i) over all codewords equals exactly 1. Check each vector. (1, 2, 3, 3): 1/2 + 1/4 + 1/8 + 1/8 = 1 — feasible, realized by a skewed tree. (2, 2, 2, 2): 4 * (1/4) = 1 — feasible, the perfectly balanced tree. (3, 3, 2, 1) is just (1, 2, 3, 3) with the symbols listed in a different order, so it is feasible for suitably ordered frequencies. But (1, 1, 2, 2): 1/2 + 1/2 + 1/4 + 1/4 = 3/2 > 1 — impossible. Intuitively, two codewords of length 1 use up both children of the root, leaving no free node for any further codeword, so no prefix code (Huffman or otherwise) can have these lengths.'
        },
        {
          id: 'algo-greedy-q12',
          q: 'An exchange argument proves greedy optimality by:',
          options: ['showing the greedy solution can be transformed into any other solution', 'showing any optimal solution can be transformed step by step into the greedy solution without decreasing its value', 'enumerating all solutions and comparing values', 'showing the problem has overlapping subproblems'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The exchange argument starts from an arbitrary optimal solution OPT and locates the first place where OPT disagrees with the greedy solution G. It then shows that replacing the OPT choice with the greedy choice keeps the solution feasible and keeps its objective value at least as good — for example, replacing the first activity of OPT with the earliest-finishing activity cannot create conflicts. Repeating this finitely many times transforms OPT into G with no loss of value, so G attains the optimal value. Direction matters: transforming OPT toward G (option B) is the proof; transforming G into others (option A) proves nothing about optimality. Option D describes dynamic programming territory.'
        },
        {
          id: 'algo-greedy-q13',
          q: 'For the activity set with (start, finish) times: A(1,4), B(3,5), C(0,6), D(5,7), E(3,9), F(5,9), G(6,10), H(8,11), the earliest-finish-time greedy selects how many activities?',
          options: ['2', '3', '4', '5'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Sort by finish time: A(1,4), B(3,5), C(0,6), D(5,7), E(3,9), F(5,9), G(6,10), H(8,11). Pick A (finish 4). Next compatible activity must start at or after 4: B starts at 3 — reject; C starts at 0 — reject; D starts at 5 >= 4 — pick D (finish 7). Next must start at or after 7: E starts 3, F starts 5, G starts 6 — all reject; H starts 8 >= 7 — pick H (finish 11). Nothing remains. Selected: A, D, H — three activities. No four mutually compatible activities exist in this instance (check: any schedule needs gaps at 4-5 and 7-8, and the intervals are too dense), so 3 is optimal, as the greedy guarantees.'
        },
        {
          id: 'algo-greedy-q14',
          q: 'The running time of building a Huffman code for n symbols using a binary min-heap is:',
          options: ['Theta(n)', 'Theta(n log n)', 'Theta(n^2)', 'Theta(log n)'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Insert all n frequencies into a min-heap: Theta(n) with bottom-up build-heap. Then perform exactly n - 1 merge steps; each step does two extract-min operations and one insert, each costing O(log n) on a heap of at most n elements. Total: Theta(n) + (n - 1) * O(log n) = Theta(n log n). If the frequencies are given already sorted, a clever two-queue technique replaces the heap: one queue holds unmerged leaves in sorted order, the other holds newly created internal nodes (which are produced in nondecreasing weight order); each step compares queue fronts in O(1), giving Theta(n) after sorting. GATE has asked for both bounds, so state assumptions carefully.'
        },
        {
          id: 'algo-greedy-q15',
          q: 'Consider unit-time job sequencing where two jobs remain and one free slot exists at time 1: job X (deadline 1, profit 50) and job Y (deadline 2, profit 50). Slot 2 is free as well. Which placement rule ensures no profit is lost?',
          options: ['Place each accepted job in the earliest free slot before its deadline', 'Place each accepted job in the latest free slot at or before its deadline', 'Place jobs in increasing deadline order regardless of profit', 'Any placement rule gives the same total profit'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'The latest-free-slot rule keeps early slots open for jobs with tight deadlines. Here, processing by profit (tie broken arbitrarily), suppose Y is placed first. Latest-slot rule puts Y in slot 2, leaving slot 1 for X — both jobs scheduled, profit 100. The earliest-slot rule would put Y in slot 1, and then X (deadline 1) has no legal slot and is lost — profit only 50. This is exactly why the standard algorithm scans downward from the deadline looking for a free slot. Option C (deadline order ignoring profit) fails on other instances where a low-profit early-deadline job displaces a high-profit one. The latest-slot rule paired with decreasing-profit order is provably optimal.'
        }
      ]
    },
    {
      id: 'algo-dp',
      name: 'Dynamic Programming',
      theory: {
        intro: 'Dynamic programming (DP) solves problems by combining solutions of overlapping subproblems, computing each subproblem once and storing its answer. It applies when a problem has optimal substructure (an optimal solution is built from optimal solutions of subproblems) and overlapping subproblems (the naive recursion recomputes the same instances exponentially many times). GATE tests a fixed canon: longest common subsequence, 0/1 knapsack, matrix chain multiplication, edit distance, subset sum, longest increasing subsequence, and Fibonacci-style recurrences. Questions ask for a specific table entry, the value of the optimal solution on small data, the recurrence itself, the time and space complexity, or the conceptual contrast with divide and conquer and greedy. The reliable skill is writing the recurrence precisely — dimensions of the table, base cases, and the order of filling — and then executing small instances without arithmetic errors.',
        core: 'The DP method. (1) Define the subproblem precisely, e.g. L[i][j] = length of the LCS of the first i characters of X and first j of Y. (2) Write the recurrence with base cases. (3) Fill the table in an order where dependencies are ready (bottom-up), or memoize a top-down recursion. (4) Read off the answer and optionally trace back the actual solution. Memoization and tabulation have the same asymptotic time; tabulation avoids recursion overhead, memoization skips unreachable states.\n\nLCS. For strings of lengths m and n: L[i][j] = 0 if i = 0 or j = 0; L[i][j] = L[i-1][j-1] + 1 if X[i] = Y[j]; otherwise L[i][j] = max(L[i-1][j], L[i][j-1]). Table size (m+1)(n+1); time Theta(mn); space Theta(mn), reducible to Theta(min(m, n)) if only the length is needed. Longest common SUBSTRING changes the mismatch case to 0. The naive recursion without memoization is exponential, up to 2^n.\n\n0/1 knapsack and subset sum. K[i][w] = best value using the first i items within capacity w: K[i][w] = max(K[i-1][w], v_i + K[i-1][w - w_i]) when w_i <= w, else K[i-1][w]. Time Theta(nW). This is PSEUDO-polynomial: W appears in the input encoded in log W bits, so Theta(nW) is exponential in input size, consistent with subset sum and 0/1 knapsack being NP-complete/NP-hard. Subset sum is the same table with boolean entries.\n\nMatrix chain multiplication. Matrices A1..An with dimensions p0 x p1, p1 x p2, ..., p(n-1) x pn. m[i][j] = minimum scalar multiplications to compute Ai..Aj: m[i][i] = 0 and m[i][j] = min over k in [i, j-1] of m[i][k] + m[k+1][j] + p(i-1)*p(k)*p(j). Time Theta(n^3), space Theta(n^2). The number of complete parenthesizations is the Catalan number C(n-1), which is exponential — the reason brute force fails.\n\nEdit distance. D[i][j] = minimum insertions, deletions, substitutions converting the first i characters of X into the first j of Y: D[i][0] = i, D[0][j] = j; if characters match, D[i][j] = D[i-1][j-1]; else 1 + min(D[i-1][j-1] substitution, D[i-1][j] deletion, D[i][j-1] insertion). Time Theta(mn).\n\nLIS. Longest increasing subsequence: dp[i] = 1 + max dp[j] over j < i with A[j] < A[i]; answer is the max entry. Theta(n^2) directly, Theta(n log n) with patience sorting/binary search. Also solvable as LCS of the array with its sorted copy.\n\nDP versus divide and conquer versus greedy.\n• D&C: subproblems are independent (merge sort halves share nothing); solving each once is automatic; no table needed.\n• DP: subproblems overlap heavily (fib(n-1) and fib(n-2) share fib(n-3)); memoization converts exponential recursion into polynomial time.\n• Greedy: makes one irrevocable choice and solves a SINGLE subproblem; DP tries ALL choices and takes the best. Every greedy-solvable problem is DP-solvable, not conversely.\nFibonacci is the minimal illustration: naive recursion Theta(phi^n), DP Theta(n) time, and Theta(1) space if only two previous values are kept.',
        strategy: 'GATE patterns. (1) Compute one table entry or the final answer on a concrete small instance — edit distance of two short words, LCS length, knapsack value, matrix chain cost for three or four matrices. Fill the table row by row on paper; for matrix chain with three matrices just compare the two parenthesizations directly. (2) Identify the recurrence: options differ in indices or in which neighbors feed an entry — check base cases against a tiny example to eliminate wrong options fast. (3) Complexity: LCS and edit distance Theta(mn); matrix chain Theta(n^3) time and Theta(n^2) space; knapsack Theta(nW) and the pseudo-polynomial subtlety; LIS Theta(n log n) best known. (4) Count subproblems: LCS on strings of lengths m, n has (m+1)(n+1) subproblems; matrix chain has n(n+1)/2 nontrivial ones.\n\nTraps. In knapsack numericals, remember an item can be skipped even when it fits, and each item used at most once (row i-1, not i, in the recurrence — using row i silently turns it into UNBOUNDED knapsack). In LCS, max is over TWO neighbors on mismatch, three only in edit distance. Matrix chain cost uses dimensions p(i-1), p(k), p(j) — off-by-one in indices is the classic error.\n\nWorked mini-example. Edit distance from "cat" to "cut": first characters match, last characters match, middle a vs u needs one substitution — distance 1. The table confirms: D[2][2] = 1 + D[1][1] = 1, carried diagonally to D[3][3] = 1.'
      },
      questions: [
        {
          id: 'algo-dp-q1',
          q: 'Dynamic programming differs from plain divide and conquer chiefly because dynamic programming exploits:',
          options: ['independent subproblems', 'overlapping subproblems with memoization', 'randomization of the input', 'a greedy choice at each step'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Both paradigms rely on optimal substructure — building the answer from subproblem answers. The distinguishing feature of dynamic programming is that its subproblems OVERLAP: the same smaller instance is needed by many larger ones, so the naive recursion recomputes it exponentially often (fib(n) recomputes fib(n-2) via both fib(n-1) and directly). DP stores each subproblem answer in a table (memoization top-down or tabulation bottom-up) so it is computed exactly once, collapsing exponential time to polynomial. Divide and conquer, in contrast, generates disjoint subproblems (the two halves in merge sort share no elements), so nothing is recomputed and no table is needed. Option D describes greedy algorithms, which commit to one subproblem instead of comparing all.'
        },
        {
          id: 'algo-dp-q2',
          q: 'In the standard LCS dynamic program for strings X (length m) and Y (length n), the number of table entries computed is:',
          options: ['m * n', '(m+1) * (n+1)', 'm + n', '2^(m+n)'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'The subproblem L[i][j] is defined for every prefix pair, where i ranges over 0..m and j over 0..n — the zero row and zero column encode the base cases (LCS with an empty string is 0). That gives (m+1)(n+1) entries in total, each filled in Theta(1) time from at most three previously computed neighbors, for total time Theta(mn). GATE sometimes phrases this as "number of subproblems" or asks for the table dimensions; the +1 for the empty-prefix base cases is exactly what the wrong option m*n omits. Space can be reduced to two rows, Theta(min(m, n)), when only the length (not the subsequence itself) is required.'
        },
        {
          id: 'algo-dp-q3',
          q: 'Three matrices have dimensions A (10 x 20), B (20 x 30), C (30 x 40). The minimum number of scalar multiplications to compute ABC is:',
          options: ['18000', '32000', '24000', '30000'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Two parenthesizations exist. (AB)C: computing AB costs 10*20*30 = 6000 and yields a 10 x 30 matrix; multiplying by C costs 10*30*40 = 12000; total 18000. A(BC): computing BC costs 20*30*40 = 24000 and yields 20 x 40; multiplying A by it costs 10*20*40 = 8000; total 32000. The minimum is 18000. The general rule multiplying a p x q by a q x r matrix costs p*q*r scalar multiplications, and the order can change the total dramatically — here nearly a factor of two. For longer chains the DP recurrence m[i][j] = min over k of m[i][k] + m[k+1][j] + p(i-1) p(k) p(j) finds the optimum in Theta(n^3) time.'
        },
        {
          id: 'algo-dp-q4',
          q: 'The edit distance (insertions, deletions, substitutions, each costing 1) between "SUNDAY" and "SATURDAY" is:',
          options: ['2', '3', '4', '5'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'Align the words: S-UNDAY and S-ATURDAY share the prefix S and the suffix DAY. Between them, SUNDAY has "UN" and SATURDAY has "ATUR". Convert UN to ATUR: insert A and T before U (2 insertions), keep U, substitute N with R (1 substitution) — total 3 operations: SUNDAY -> SAUNDAY -> SATUNDAY -> SATURDAY. The DP table confirms D[6][8] = 3, where D[i][j] = D[i-1][j-1] on a match and 1 + min(D[i-1][j-1], D[i-1][j], D[i][j-1]) otherwise. To see 2 is impossible: SATURDAY is longer by 2, so at least 2 insertions are forced, and the letter N of SUNDAY has no counterpart in the alignment, forcing at least one more operation. Hence 3 is optimal.'
        },
        {
          id: 'algo-dp-q5',
          q: 'A 0/1 knapsack has capacity 5. Items (weight, value): (2, 3), (3, 4), (4, 5), (5, 6). The maximum achievable value is:',
          options: ['6', '7', '8', '9'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Enumerate feasible item sets within weight 5. Single items: values 3, 4, 5, 6. Pairs: weights 2+3 = 5 fits with value 3 + 4 = 7; 2+4 = 6 exceeds; 3+4, and anything with the weight-5 item, exceed. So the best is 7, taking the first two items. The DP table K[i][w] reproduces this: K[2][5] = max(K[1][5], 4 + K[1][2]) = max(3, 4 + 3) = 7, and rows 3 and 4 cannot improve it since K[3][5] = max(7, 5 + K[2][1] = 5) = 7 and K[4][5] = max(7, 6 + K[3][0] = 6) = 7. Note the greedy-by-ratio choice (ratios 1.5, 1.33, 1.25, 1.2) also picks items 1 and 2 here, but greedy is not correct in general for 0/1 knapsack.'
        },
        {
          id: 'algo-dp-q6',
          q: 'The time complexity of the standard dynamic programming algorithm for 0/1 knapsack with n items and integer capacity W is Theta(nW). This algorithm is called pseudo-polynomial because:',
          options: ['it is polynomial in the numeric value of W but exponential in the length of the encoding of W', 'it only works for small n', 'it uses randomization', 'its space can be reduced to O(W)'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Complexity theory measures running time against the INPUT SIZE in bits. The capacity W is written in binary using only b = log_2 W bits, so W = 2^b, and a Theta(nW) = Theta(n 2^b) algorithm is exponential in the encoding length b even though it is polynomial in the numeric value W. Such algorithms are termed pseudo-polynomial. This resolves the apparent paradox that 0/1 knapsack and subset sum are NP-hard yet have "polynomial-looking" DP solutions: the DP is efficient only when W is small (polynomially bounded in n). Option D is a true fact (one-row space optimization) but is not what pseudo-polynomial means; options B and C are simply false.'
        },
        {
          id: 'algo-dp-q7',
          q: 'The length of the longest common subsequence of X = "CATGA" and Y = "ACGTA" is:',
          options: ['2', '3', '4', '5'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A common subsequence must preserve left-to-right order in both strings. Candidate "CGA": in X the letters C(1), G(4), A(5) appear in order, and in Y as C(2), G(3), A(5) — valid, length 3. Also "CTA" and "ATA" work. Now check that no length-4 common subsequence exists: X = C A T G A. Any length-4 candidate keeps 4 of the 5 letters of X in order, giving CATG, CATA, CAGA, CTGA, ATGA. In Y = A C G T A: CATG needs T after A-after-C, but Y has T(4) and G(3) with G before T while X requires G after T only in... check each directly: CATG needs C,A,T,G in order in Y — after C(2), A(5) leaves no room for T, G; CATA needs C,A,T,A — after C(2) only one A remains; CAGA — only one A after G; CTGA needs G after T in Y but G(3) precedes T(4); ATGA needs T then G, same failure. All fail, so the LCS length is 3.'
        },
        {
          id: 'algo-dp-q8',
          q: 'In the edit distance DP table, the entry D[i][j] for mismatched characters X[i] != Y[j] is computed as:',
          options: ['1 + min(D[i-1][j-1], D[i-1][j], D[i][j-1])', '1 + max(D[i-1][j-1], D[i-1][j], D[i][j-1])', 'D[i-1][j-1]', 'min(D[i-1][j], D[i][j-1])'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'On a mismatch there are exactly three last-operation choices, each costing 1: substitute X[i] by Y[j] and solve the rest (D[i-1][j-1]); delete X[i] (D[i-1][j]); or insert Y[j] at the end of X (D[i][j-1]). The optimum takes the cheapest continuation, so D[i][j] = 1 + min of the three neighbors. On a match no operation is needed and D[i][j] = D[i-1][j-1]. Base cases: D[i][0] = i (delete everything) and D[0][j] = j (insert everything). Contrast with LCS, which on a mismatch takes max over only TWO neighbors and never looks diagonally — mixing up the two recurrences is a frequent exam trap.'
        },
        {
          id: 'algo-dp-q9',
          q: 'Computing the n-th Fibonacci number by the naive recursion fib(n) = fib(n-1) + fib(n-2) versus by dynamic programming takes, respectively:',
          options: ['Theta(n^2) and Theta(n)', 'exponential time and Theta(n) additions', 'Theta(n log n) and Theta(log n)', 'Theta(2^n) and Theta(log n) additions'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The naive recursion tree for fib(n) has T(n) = T(n-1) + T(n-2) + Theta(1) calls, which grows as Theta(phi^n) where phi is the golden ratio 1.618 — exponential, because the same subproblems are recomputed massively (fib(n-2) is computed twice, fib(n-3) three times, following the Fibonacci numbers themselves). Dynamic programming computes each fib(k) for k = 2..n exactly once, bottom-up, using Theta(n) additions and Theta(1) space if only the last two values are kept. (A further improvement, matrix exponentiation, achieves Theta(log n) multiplications, but that is beyond plain DP and the numbers involved grow to Theta(n) bits anyway.) Fibonacci is the canonical illustration of overlapping subproblems.'
        },
        {
          id: 'algo-dp-q10',
          q: 'The number of distinct ways to fully parenthesize a product of n matrices is:',
          options: ['n!', '2^n', 'the Catalan number C(n-1) = (1/n) * C(2n-2, n-1)', 'n^2'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Let P(n) be the number of parenthesizations. The outermost multiplication splits the chain after position k for some k in 1..n-1, giving P(n) = sum over k of P(k) * P(n-k) with P(1) = 1. This is exactly the Catalan recurrence, so P(n) = C(n-1), the (n-1)-th Catalan number, which equals (1/n) * binomial(2n-2, n-1). Small checks: P(2) = 1, P(3) = 2, P(4) = 5, P(5) = 14. Catalan numbers grow as Theta(4^n / n^1.5) — exponential — which is precisely why brute-force enumeration is hopeless and the Theta(n^3) DP over intervals is needed. The same Catalan count also counts binary trees with n leaves, a frequent GATE crosslink.'
        },
        {
          id: 'algo-dp-q11',
          q: 'For the matrix chain problem on n matrices, the standard DP has time and space complexity:',
          options: ['Theta(n^2) time, Theta(n) space', 'Theta(n^3) time, Theta(n^2) space', 'Theta(2^n) time, Theta(n^2) space', 'Theta(n^2) time, Theta(n^2) space'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The table m[i][j] is defined for all 1 <= i <= j <= n, giving Theta(n^2) entries (about n^2/2 of them, filled in increasing order of chain length j - i). Each entry m[i][j] is a minimum over all split points k from i to j-1, requiring up to n - 1 candidate evaluations, each Theta(1). Total time: Theta(n^2) entries times Theta(n) work = Theta(n^3); space for the table is Theta(n^2), plus an optional second table s[i][j] recording the best split for reconstructing the parenthesization, still Theta(n^2). This entries-times-work-per-entry accounting is the general template for stating any DP complexity and is exactly what GATE expects you to reproduce.'
        },
        {
          id: 'algo-dp-q12',
          q: 'The longest increasing subsequence (LIS) of the array [10, 22, 9, 33, 21, 50, 41, 60] has length:',
          options: ['4', '5', '6', '3'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Compute dp[i] = length of the LIS ending at index i. dp = [1, 2, 1, 3, 2, 4, 4, 5]: 10 starts at 1; 22 extends 10 (2); 9 starts fresh (1); 33 extends 22 (3); 21 extends 10 only (2); 50 extends 33 (4); 41 extends 33 (4); 60 extends 50 or 41 (5). Maximum entry is 5, achieved by 10, 22, 33, 50, 60 (or 10, 22, 33, 41, 60). The Theta(n^2) DP checks all earlier smaller elements for each position; the Theta(n log n) method maintains the array of minimum possible tails of increasing subsequences of each length and binary-searches for each new element. LIS also equals the LCS of the array with its sorted, deduplicated version.'
        },
        {
          id: 'algo-dp-q13',
          q: 'In the 0/1 knapsack recurrence K[i][w] = max(K[i-1][w], v_i + K[i-1][w - w_i]), replacing K[i-1][w - w_i] with K[i][w - w_i] in the second term computes:',
          options: ['the same 0/1 knapsack value', 'the unbounded knapsack, where each item may be used any number of times', 'the fractional knapsack value', 'an incorrect value with no interpretation'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'The index i-1 in the inclusion term enforces that after taking item i, only EARLIER items remain available — each item used at most once, the 0/1 constraint. Changing it to K[i][w - w_i] means that even after taking item i, item i itself is still available in the subproblem, so it can be taken again and again as long as capacity permits. That is precisely the unbounded (repetition-allowed) knapsack, a correct and useful DP in its own right, often written one-dimensionally as U[w] = max over items of v_i + U[w - w_i]. This one-index subtlety is a favorite exam probe; the same distinction shows up as the loop order (capacity inner loop ascending vs descending) in the space-optimized one-row implementation.'
        },
        {
          id: 'algo-dp-q14',
          q: 'Subset sum asks whether some subset of n positive integers sums exactly to S. The standard DP solves it in:',
          options: ['Theta(n log n) time', 'Theta(n * S) time', 'Theta(2^n) time only', 'Theta(n^2) time regardless of S'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Define the boolean table B[i][s] = true iff some subset of the first i numbers sums to s, for s = 0..S. Recurrence: B[i][s] = B[i-1][s] OR B[i-1][s - a_i] (the second term when a_i <= s); base B[0][0] = true, B[0][s] = false for s > 0. The table has (n+1)(S+1) entries, each filled in constant time, giving Theta(nS) time and Theta(S) space with one-row optimization (iterating s downward to preserve 0/1 semantics). Like knapsack, this is pseudo-polynomial — exponential in the bit length of S — which is consistent with subset sum being NP-complete. Brute force over all 2^n subsets (option C) is what the DP improves upon when S is modest.'
        },
        {
          id: 'algo-dp-q15',
          q: 'Which of the following problems does NOT have the optimal substructure needed for the standard shortest-path style dynamic programming?',
          options: ['Shortest path in a DAG', 'Longest SIMPLE path in a general graph', 'Edit distance', 'Matrix chain multiplication'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Optimal substructure requires that optimal solutions of subproblems combine into an optimal whole. Shortest paths have it: a shortest u-v path through w contains shortest u-w and w-v paths, so DAG shortest path (process vertices in topological order) is a clean DP. Edit distance and matrix chain likewise decompose cleanly over prefixes and intervals. Longest SIMPLE path fails: concatenating a longest simple u-w path with a longest simple w-v path can repeat vertices, violating simplicity, so the subproblem answers do not compose — the constraint couples the subproblems. This is why longest simple path is NP-hard on general graphs while shortest path is polynomial, a contrast GATE loves. (On DAGs, longest path IS solvable by DP, since no cycles means no repetition risk.)'
        }
      ]
    },
    {
      id: 'algo-graph',
      name: 'Graph Algorithms',
      theory: {
        intro: 'Graph algorithms are the highest-yield algorithms area in GATE, contributing multiple marks nearly every year. The syllabus centers on traversals (BFS and DFS) and their applications, topological sorting, strongly connected components, minimum spanning trees (Prim and Kruskal), and single-source shortest paths (Dijkstra and Bellman-Ford). Questions blend structural theory — when is the MST unique, why does Dijkstra fail with negative edges, which edges can appear in a BFS tree — with simulations on concrete graphs: relaxation orders, intermediate distance values, edge counts. Complexities matter too: with V vertices and E edges, know each algorithm cost under adjacency lists versus matrices and under different priority queue implementations. Since answers often hinge on properties like the cut property or DFS edge classification, invest in understanding the proofs once; the exam questions then become quick applications rather than fresh puzzles.',
        core: 'Traversals. BFS explores level by level using a queue, computing shortest paths by NUMBER OF EDGES in unweighted graphs; DFS explores deep-first using a stack or recursion, assigning discovery and finish times. Both run in Theta(V + E) with adjacency lists, Theta(V^2) with an adjacency matrix. DFS edge classification in a DIRECTED graph: tree, back, forward, cross edges; a directed graph has a cycle iff DFS finds a back edge. In an UNDIRECTED graph DFS produces only tree and back edges (no cross edges), and BFS produces only tree edges and edges joining vertices whose levels differ by at most one.\n\nTopological sort. Defined only for DAGs: a linear order with every edge going left to right. Two algorithms: repeatedly remove a vertex of in-degree 0 (Kahn, using a queue), or run DFS and output vertices in decreasing finish time. Both Theta(V + E). A DAG can have many topological orders — counting them for a small DAG is a standard question — and has at least one vertex of in-degree 0 and one of out-degree 0.\n\nStrongly connected components. Maximal sets of vertices mutually reachable in a directed graph. Kosaraju: DFS the graph, then DFS the TRANSPOSE in decreasing finish-time order; each second-pass tree is one SCC. Tarjan does it in one DFS with low-link values. Both Theta(V + E). The condensation (one node per SCC) is always a DAG.\n\nMinimum spanning trees. A spanning tree of a connected undirected weighted graph with minimum total weight; it has exactly V - 1 edges. Cut property: for any cut, the minimum-weight edge crossing it belongs to some MST — the engine behind both algorithms. Cycle property: the unique maximum-weight edge of any cycle belongs to no MST. Key facts:\n• If all edge weights are DISTINCT, the MST is unique. The converse is false: an MST can be unique even with repeated weights.\n• The minimum-weight edge of the graph is in every MST (if weights distinct); the second-minimum also is.\n• Kruskal: sort edges ascending, add each edge that joins two different components (union-find): Theta(E log E) = Theta(E log V).\n• Prim: grow one tree from a start vertex, always adding the cheapest edge leaving it: Theta(E log V) with a binary heap, Theta(V^2) with an array (better for dense graphs).\n• Adding a constant to every edge weight, or applying any strictly increasing function, preserves the MST (order of weights is unchanged) — but does NOT preserve shortest paths, since paths with different edge counts shift by different amounts.\n\nShortest paths. Dijkstra (non-negative weights): repeatedly extract the unvisited vertex with smallest tentative distance and relax its outgoing edges. With a binary heap Theta((V + E) log V); with an array Theta(V^2). Vertices are finalized in nondecreasing distance order. It FAILS with negative edge weights because it assumes a finalized vertex cannot be improved. Bellman-Ford handles negative weights: V - 1 passes relaxing all E edges, Theta(VE); a further improving pass reveals a negative cycle reachable from the source. Shortest paths are well defined only when no reachable negative cycle exists. For all-pairs, Floyd-Warshall runs Theta(V^3) and tolerates negative edges (not negative cycles).',
        strategy: 'GATE patterns. (1) MST numericals: compute the MST weight by Kruskal on a pictured graph; decide uniqueness — scan for repeated weights and whether swaps are possible on cycles. (2) Dijkstra traces: the order vertices are finalized, or a distance value after k iterations; remember finalization order is by increasing distance. (3) Counting: topological orders of a small DAG, number of spanning trees (Cayley: K_n has n^(V-2)), number of back edges in a DFS of a cycle. (4) True/false batteries on: negative edges vs Dijkstra, MST under weight transformations, SCC condensation being a DAG, BFS/DFS edge type possibilities.\n\nTraps. "Negative edges" and "negative cycles" are different: Bellman-Ford computes correct answers with negative edges and merely DETECTS negative cycles. Dijkstra can fail even with a single negative edge, though it can also happen to succeed — questions asking "always correct?" hinge on this. The maximum-weight edge of a graph CAN be in the MST (if it is a bridge). Squaring weights preserves MST (increasing function, for non-negative weights) but changes shortest paths.\n\nWorked mini-example. Graph: edges AB = 1, BC = 2, AC = 3. Kruskal picks AB (1), BC (2), rejects AC (cycle). MST weight 3, unique since weights are distinct. Now make AC = 2: cycle A-B-C-A has maximum edge... AB = 1 is forced (cut property), then either BC or AC (both 2) completes it — two distinct MSTs, both of weight 3. Repeated weights made the MST non-unique here, though not always.'
      },
      questions: [
        {
          id: 'algo-graph-q1',
          q: 'The time complexity of BFS on a graph with V vertices and E edges, represented by adjacency lists, is:',
          options: ['Theta(V * E)', 'Theta(V + E)', 'Theta(V^2) always', 'Theta(E log V)'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Each vertex is enqueued and dequeued at most once: Theta(V) queue operations. When a vertex is dequeued, its adjacency list is scanned once; over the whole run every list is scanned exactly once, and the lists together contain Theta(E) entries (2E for undirected graphs, E for directed). Total: Theta(V + E). Both terms are needed: a graph with many isolated vertices has E much smaller than V, while a dense graph has E up to V^2. With an adjacency MATRIX, finding the neighbors of each vertex costs Theta(V), so BFS becomes Theta(V^2) regardless of E — a distinction GATE tests explicitly. DFS has the identical analysis and the identical bounds.'
        },
        {
          id: 'algo-graph-q2',
          q: 'While running DFS on an UNDIRECTED graph, which types of edges can occur?',
          options: ['Tree, back, forward, and cross edges', 'Tree and back edges only', 'Tree and cross edges only', 'Tree edges only'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'In an undirected graph, consider any non-tree edge (u, v) and suppose u is discovered first. Since the edge is bidirectional, v is reachable from u, so DFS will discover v while u is still on the recursion stack (v becomes a descendant of u). The edge (u, v) then connects a vertex to its ancestor — a back edge. A cross edge would require u and v to lie in unrelated subtrees with both finished, impossible because the edge would have been explored from whichever endpoint was discovered first. Forward edges collapse into back edges viewed from the other end. Consequence: an undirected graph is acyclic (a forest) iff DFS finds no back edge, and every non-tree edge certifies a cycle.'
        },
        {
          id: 'algo-graph-q3',
          q: 'A DAG has vertices a, b, c, d and edges a->b, a->c, b->d, c->d. The number of distinct topological orderings is:',
          options: ['1', '2', '3', '4'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A topological order must place a before b and c (edges a->b, a->c) and must place d after both b and c (edges b->d, c->d). So a is forced first: it is the only vertex with in-degree 0. Then d is forced last: it is the only vertex with out-degree 0 and depends on both b and c. The middle two positions hold b and c, which have no edge between them, so both relative orders are valid: a, b, c, d and a, c, b, d. Count = 2. The general counting method: at each step, count choices among current in-degree-0 vertices and multiply along the decision tree; here 1 * 2 * 1 * 1 = 2.'
        },
        {
          id: 'algo-graph-q4',
          q: 'If all edge weights of a connected undirected graph are DISTINCT, then the graph has:',
          options: ['a unique minimum spanning tree', 'possibly several minimum spanning trees', 'a unique shortest path between every pair of vertices', 'exactly one spanning tree in total'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'pyq-style',
          explanation: 'With distinct weights the MST is unique. Proof sketch (exchange): suppose T1 and T2 are different MSTs, and let e be the minimum-weight edge in exactly one of them (say in T1, not T2). Adding e to T2 creates a cycle; that cycle must contain some edge f not in T1. All edge weights differ, and by the choice of e, w(e) < w(f). Then T2 - f + e is a spanning tree lighter than T2 — contradiction. Note option C is false: distinct edge weights do NOT force unique shortest paths, since two different paths can still have equal total weight (e.g. 1 + 4 = 2 + 3). Option D confuses MST uniqueness with the count of all spanning trees, which can be huge.'
        },
        {
          id: 'algo-graph-q5',
          q: 'In Dijkstra\'s algorithm with non-negative edge weights, the vertices are permanently finalized (extracted from the priority queue) in:',
          options: ['increasing order of their shortest-path distance from the source', 'the order they were inserted into the queue', 'decreasing order of degree', 'topological order'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Dijkstra always extracts the unfinalized vertex with the smallest tentative distance, and with non-negative weights that tentative value is provably its true shortest distance at extraction time: any alternative path would have to leave the finalized set through a vertex with larger tentative distance and could only grow from there. Hence the sequence of extracted vertices has nondecreasing true distances — the algorithm is effectively a "wavefront" expanding by distance. This fact answers many exam variants: which vertex is finalized third, why a negative edge breaks the proof (a later path could shrink below an already-finalized value), and why Dijkstra resembles Prim (same skeleton, different key: distance-from-source versus cheapest-edge-to-tree).'
        },
        {
          id: 'algo-graph-q6',
          q: 'Consider a directed graph with edges S->A of weight 4, S->B of weight 2, B->A of weight -3, A->T of weight 1, B->T of weight 6, and source S. Dijkstra (which assumes non-negative weights) computes the distance to T as 5. The correct shortest distance to T is:',
          options: ['5', '0', '4', '2'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Enumerate paths to T. S->A->T = 4 + 1 = 5. S->B->T = 2 + 6 = 8. S->B->A->T = 2 + (-3) + 1 = 0. The true shortest distance is 0. Dijkstra goes wrong as follows: it finalizes B (distance 2), then A — but at the moment A is extracted its tentative distance may already be corrupted or, in the standard failure, A is finalized at 4 via S->A BEFORE the improving path through B->A (giving -1... check: relaxing B first sets A to 2 - 3 = -1; the failure depends on extraction order). In the classic failure mode the algorithm finalizes A too early at distance 4 and never revisits it, reporting 5 for T. The example shows why a single negative edge, even without any negative cycle, invalidates Dijkstra; Bellman-Ford handles it correctly in Theta(VE).'
        },
        {
          id: 'algo-graph-q7',
          q: 'Bellman-Ford is run on a graph with V vertices and E edges. After how many full passes of relaxing all edges are shortest distances guaranteed correct (assuming no negative cycle)?',
          options: ['V', 'V - 1', 'E', 'log V'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Any shortest path in a graph without negative cycles is simple, so it uses at most V - 1 edges. Bellman-Ford has the invariant: after pass k, every vertex whose shortest path uses at most k edges holds its correct distance — provable by induction, since pass k relaxes the k-th edge of every such path in order. Therefore V - 1 passes suffice, giving total time Theta(VE). Running one EXTRA pass is the negative-cycle test: if any distance still improves on pass V, some reachable negative cycle exists and shortest paths are undefined for vertices it can reach. GATE also asks the early-termination refinement: stop as soon as a full pass changes nothing.'
        },
        {
          id: 'algo-graph-q8',
          q: 'Which statement about the strongly connected components (SCCs) of a directed graph is FALSE?',
          options: ['Every vertex belongs to exactly one SCC', 'The condensation graph obtained by contracting each SCC is a DAG', 'SCCs can be computed in Theta(V + E) time', 'Two vertices are in the same SCC if there is a path from one to the other'],
          answer: 3,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Strong connectivity requires paths in BOTH directions: u and v share an SCC iff u reaches v AND v reaches u. Option D states only one direction, so it is false — in the graph u -> v with no return path, u and v are in different (singleton) SCCs despite the path. The rest are true: mutual reachability is an equivalence relation, so SCCs partition the vertices (A); contracting them cannot leave a cycle, since a cycle through two components would merge them into one SCC, so the condensation is a DAG (B); and Kosaraju (two DFS passes, one on the transpose in decreasing finish-time order) or Tarjan (one DFS with low-links) both run in Theta(V + E) (C).'
        },
        {
          id: 'algo-graph-q9',
          q: 'Let e be the edge of MAXIMUM weight in some cycle of a connected weighted undirected graph, with all weights distinct. Which is TRUE?',
          options: ['e must belong to every MST', 'e cannot belong to any MST', 'e belongs to exactly one MST', 'e may or may not belong to the MST depending on the graph'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'This is the cycle property. Suppose a spanning tree T contains e = (u, v), the strict maximum of some cycle C. Removing e splits T into two components; the rest of cycle C forms a u-v path, which must cross between the two components by some edge f in C, f != e, with w(f) < w(e) since e is the cycle maximum and weights are distinct. Then T - e + f is a spanning tree of smaller weight, so T was not minimum. Hence e is in NO MST. Contrast carefully: the maximum-weight edge of the whole GRAPH can still be in the MST when it is a bridge (it lies on no cycle, so the cycle property never applies to it) — a favorite trap distinction.'
        },
        {
          id: 'algo-graph-q10',
          q: 'The weight of every edge of a connected weighted graph is increased by 5. Which of the following is TRUE?',
          options: ['Both the MST and all shortest paths remain unchanged', 'The MST remains an MST of the new graph, but shortest paths may change', 'Shortest paths remain unchanged, but the MST may change', 'Both may change'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'Every spanning tree has exactly V - 1 edges, so adding 5 to each edge adds exactly 5(V - 1) to EVERY spanning tree total — the ranking of spanning trees is untouched and the old MST stays minimum. (More generally, any strictly increasing transformation of the weights preserves the MST, since Kruskal only compares weights.) Shortest paths, however, compare paths with DIFFERENT numbers of edges: a path with k edges gains 5k. A short-hop expensive path gains less than a many-hop cheap path, so the winner can flip. Example: direct edge s-t of weight 11 versus a two-edge path of weight 5 + 5 = 10; after +5, the direct edge costs 16 while the path costs 20 — the shortest path changed from the two-edge route to the direct edge.'
        },
        {
          id: 'algo-graph-q11',
          q: 'Kruskal\'s algorithm is run on a connected graph with 9 vertices and 14 edges. The number of edges it adds to the MST, and the number it examines in the worst case, are respectively:',
          options: ['8 and 14', '9 and 14', '8 and 8', '14 and 14'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'A spanning tree of a graph with V = 9 vertices always has exactly V - 1 = 8 edges — this is independent of E and of the algorithm used. Kruskal processes edges in ascending weight order, adding an edge iff its endpoints lie in different union-find components; it may accept the first 8 edges quickly, but in the worst case (the heavy edges completing the tree last) it examines all 14 edges before the 8th acceptance. So: 8 edges added, up to 14 examined. Complexity: sorting dominates at Theta(E log E) = Theta(E log V), with union-find contributing nearly linear additional work. The V - 1 edge count is among the most reused facts in GATE MST questions.'
        },
        {
          id: 'algo-graph-q12',
          q: 'The number of distinct spanning trees of the complete graph K4 (4 vertices, all 6 edges, unweighted) is:',
          options: ['4', '8', '16', '6'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Cayley\'s formula counts labeled spanning trees of the complete graph K_n as n^(n-2). For n = 4: 4^2 = 16. Cross-check by shape: a labeled tree on 4 vertices is either a path (choose the vertex order; 4!/2 = 12 distinct paths) or a star (choose the center; 4 stars). Total 12 + 4 = 16, matching Cayley. This count is why "how many spanning trees" is a very different question from "is the MST unique": a weighted K4 has 16 candidate trees, and distinct weights select exactly one as minimum. Related GATE variants ask for K3 (3 trees) or for the number of edges that must be DELETED from K4 to get a spanning tree: 6 - 3 = 3.'
        },
        {
          id: 'algo-graph-q13',
          q: 'In a BFS of a connected UNDIRECTED graph starting from vertex s, a non-tree edge (u, v) is encountered. Which of the following is impossible?',
          options: ['level(u) = level(v)', 'level(u) = level(v) + 1', '|level(u) - level(v)| = 2', 'level(v) = level(u) + 1'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'BFS assigns each vertex a level equal to its shortest-path distance from s. For any edge (u, v), the levels can differ by at most 1: if level(u) = L, then v is reachable in L + 1 steps via u, so level(v) <= L + 1, and symmetrically level(u) <= level(v) + 1. A non-tree edge with a level gap of 2 or more is therefore impossible — if it existed, BFS would have discovered the deeper endpoint one level earlier through this very edge, contradicting the level assignment. Same-level non-tree edges (option A) do occur, e.g. in odd cycles, and indeed an undirected graph is bipartite iff BFS finds NO same-level edge, connecting this fact to 2-colorability questions.'
        },
        {
          id: 'algo-graph-q14',
          q: 'Prim\'s algorithm implemented with an adjacency matrix and a simple array (no heap) for key values runs in:',
          options: ['Theta(E log V)', 'Theta(V^2)', 'Theta(V + E)', 'Theta(VE)'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Prim maintains, for each vertex outside the growing tree, the cheapest edge connecting it to the tree (its key). With a plain array, each of the V iterations scans all vertices to find the minimum key — Theta(V) per extraction, Theta(V^2) total — and updating keys after adding a vertex means scanning that vertex\'s matrix row, another Theta(V) per iteration. Overall Theta(V^2). With a binary heap and adjacency lists the bound becomes Theta(E log V), better for SPARSE graphs (E close to V) but worse for DENSE graphs where E = Theta(V^2) makes E log V = Theta(V^2 log V). Choosing the right implementation per density is a recurring GATE decision point; a Fibonacci heap gives Theta(E + V log V).'
        },
        {
          id: 'algo-graph-q15',
          q: 'A connected undirected graph has some edge weights repeated. Which statement is TRUE?',
          options: ['The graph necessarily has multiple MSTs', 'The MST may still be unique', 'Kruskal and Prim may return spanning trees of different total weight', 'The minimum-weight edge of the graph might not be in any MST'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Distinct weights guarantee uniqueness, but the converse fails: repeated weights merely PERMIT multiplicity. Example: a path graph a-b, b-c with both edges of weight 7 — there is only one spanning tree at all, hence a unique MST despite equal weights. Similarly, a triangle with weights 1, 1, 5 has two MSTs, but a triangle with weights 1, 2, 2 has... edges 1 and either 2: two MSTs; yet the path example settles that uniqueness is possible, so B is true and A false. C is false: both algorithms always return trees of the OPTIMAL total weight (they may differ in WHICH tree when ties exist, never in weight). D is false: a minimum-weight edge always belongs to at least one MST by the cut property applied to any cut it crosses.'
        },
        {
          id: 'algo-graph-q16',
          q: 'Which algorithm and running time correctly pair for computing single-source shortest paths in a weighted DAG (weights may be negative)?',
          options: ['Dijkstra, Theta((V + E) log V)', 'Bellman-Ford only, Theta(VE), nothing faster is possible', 'Relaxing edges in topological order, Theta(V + E)', 'Floyd-Warshall, Theta(V^3), as the fastest option'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'pyq-style',
          explanation: 'In a DAG, topologically sort the vertices (Theta(V + E)) and relax the outgoing edges of each vertex in that order. When a vertex is processed, every possible path into it has already been fully relaxed — edges only go forward in topological order — so its distance is final. One pass over all edges suffices: total Theta(V + E), and negative weights cause no trouble because the correctness argument never assumes non-negativity (and a DAG cannot contain cycles, negative or otherwise). Dijkstra may fail on negative weights; Bellman-Ford works but wastes time at Theta(VE); Floyd-Warshall solves all pairs at Theta(V^3), overkill for single-source. The same topological-order DP with max instead of min computes LONGEST paths in a DAG — the critical-path method.'
        }
      ]
    }
]};

window.GATE_DATA.questions['algo'].topics.push({
  id: 'algo-sorting-searching',
  name: 'Sorting & Searching',
  theory: {
    intro: "Sorting and searching form the most concretely testable part of the algorithms syllabus: every algorithm has a name, a known best/worst/average time, and a known stability and space profile, so GATE can ask sharp, unambiguous questions about them. Two big ideas anchor this topic. First, comparison-based sorting has a provable Omega(n log n) worst-case lower bound — no comparison sort can ever beat this, which is why merge sort and heapsort at Theta(n log n) are considered asymptotically optimal, and why beating n log n (as counting, radix, and bucket sort do) requires abandoning pure comparisons in favor of exploiting known structure in the keys. Second, searching and selection (finding the kth smallest element) each have their own tight bounds: binary search needs about log2(n) comparisons, and selection can be done in linear time either on average (quickselect) or even in the worst case (median-of-medians). Expect 2-4 marks from this area most years, often as numerical questions.",
    core: "The comparison-sort lower bound. Any correct sorting algorithm that only compares pairs of elements (never inspects their bit patterns or numeric value directly) can be modeled as a binary decision tree: each internal node is one comparison, each root-to-leaf path is one possible execution, and each leaf must correspond to a distinct final ordering of the input. Since there are n! possible permutations of n distinct elements, and the algorithm must be able to output every one of them for some input, the tree needs at least n! leaves. A binary tree with L leaves must have height at least log2(L) (since a tree of height h has at most 2^h leaves). So the worst-case number of comparisons is at least log2(n!), and by the Stirling approximation log2(n!) = Theta(n log n). This proves Omega(n log n) is unavoidable for ANY comparison-based sort — merge sort and heapsort, both Theta(n log n) in the worst case, are therefore asymptotically optimal comparison sorts, and no cleverness can produce a comparison sort that is, say, Theta(n) in the worst case.\n\n• Stability and in-place classification. A sort is STABLE if it preserves the relative order of elements with equal keys — important when sorting records by one field while wanting ties to keep their prior order (e.g. re-sorting an already-name-sorted list by department). A sort is IN-PLACE if it uses only O(1) (or O(log n), counting recursion stack) extra memory beyond the input array. Insertion sort, bubble sort: stable and in-place. Selection sort: in-place but NOT stable (its characteristic long-distance swap can jump an equal element past another equal one). Merge sort: stable but NOT in-place (needs Theta(n) auxiliary space for merging). Quicksort and heapsort: in-place but NOT stable. Counting sort and radix sort: stable, but NOT in-place (need auxiliary count/output arrays). Bucket sort: stable if a stable method sorts within each bucket, and also not in-place.\n\n• Best/worst/average cases. Insertion sort and bubble sort: best case O(n) (already sorted, with an early-exit check), worst and average O(n^2). Selection sort: O(n^2) in ALL cases — it always scans the remaining unsorted portion fully regardless of input order, so its performance doesn't depend on input arrangement. Merge sort and heapsort: Theta(n log n) in best, worst, AND average cases — their performance never depends on input arrangement. Quicksort: best and average case Theta(n log n), but worst case Theta(n^2), triggered when the chosen pivot is always the minimum or maximum remaining element (classically, a fixed first-element pivot on an already-sorted array).\n\n• Non-comparison sorts and their conditions. Counting sort assumes keys are integers in a known bounded range [0, k); it counts occurrences of each key value, then computes prefix sums to place elements directly, running in Theta(n + k) time and space. It is efficient only when k = O(n); if k is much larger than n (e.g. k = n^2), the k term dominates and it loses its advantage. Radix sort sorts multi-digit (or multi-character) keys by repeatedly applying a STABLE sort (typically counting sort) one digit position at a time, from least significant to most significant digit; for n keys with d digits each in base b, it runs in Theta(d(n + b)) time — if d is a small constant and b = O(n), this is Theta(n), beating the comparison-sort lower bound because it never directly compares two whole keys. Bucket sort assumes keys are roughly uniformly distributed over a known range (classically real numbers in [0,1)); it distributes elements into k buckets, sorts each bucket (often with insertion sort, since buckets are expected to be small), and concatenates — giving expected time Theta(n + k), but a worst case of Theta(n^2) if the distribution assumption fails and all elements land in a single bucket.\n\n• Binary search comparison counting. Searching a sorted array of n elements by repeatedly halving the search range takes at most floor(log2(n)) + 1 comparisons in the worst case (equivalently, ceil(log2(n+1))), since each comparison eliminates roughly half the remaining candidates.\n\n• Selection (finding the kth smallest). Quickselect (Hoare's selection algorithm), which partitions like quicksort but recurses into only the one side containing the target rank, achieves EXPECTED Theta(n) time with a randomly chosen pivot, but degrades to worst-case Theta(n^2) under adversarial pivot choices (mirroring quicksort's own worst case). The median-of-medians (BFPRT) algorithm removes this risk: it splits the array into groups of 5, finds each group's median by brute force, recursively finds the median of those medians, and uses that as the pivot — this guarantees the pivot always eliminates a constant fraction of the array, giving worst-case Theta(n) time via the recurrence T(n) = T(n/5) + T(7n/10) + O(n), which solves to Theta(n) because the two recursive fractions sum to 9/10 < 1."
    ,
    strategy: "GATE's sorting/searching questions repeat a small set of shapes every year. First, stability/in-place classification tables: memorize the six-way split (stable+in-place: insertion, bubble; in-place but unstable: selection, quick, heap; stable but not in-place: merge, counting, radix) cold, since questions often ask 'which of the following is NOT stable' or mix two properties in one option to trap you. Second, best/worst/average tables: the two facts worth memorizing hardest are that selection sort is Theta(n^2) unconditionally (input order never helps it) and that merge sort/heapsort are Theta(n log n) unconditionally (input order never hurts them) — quicksort is the only common sort whose case actually depends on the input AND the pivot rule. Third, counting/radix/bucket questions test whether you can identify the PRECONDITION (bounded integer range for counting sort, fixed digit count for radix sort, uniform distribution for bucket sort) that lets a sort beat the Omega(n log n) comparison lower bound — remember these sorts don't contradict the lower bound, since they never directly compare two full keys against each other. Fourth, binary search comparison-counting numericals: practice computing floor(log2 n) + 1 quickly for round numbers like n = 16, 32, 64, 100, 1000. Fifth, selection/quickselect questions testing the average-vs-worst-case gap, mirroring quicksort's own gap. Worked mini-example: for n = 1,000,000 keys, comparison sort needs at least log2(1000000!) ≈ Theta(n log n) ≈ 20 million comparisons in the worst case, while radix sort on, say, 7-digit decimal keys needs only Theta(d(n+b)) = Theta(7 × (1000000 + 10)), i.e. proportional to n, not n log n — the concrete payoff of exploiting key structure instead of pure comparison."
  },
  questions: [
    {
      id: 'algo-sorting-searching-q1',
      q: "What is the tightest known worst-case lower bound on the number of comparisons required by ANY comparison-based sorting algorithm, for n distinct elements?",
      options: ["Omega(n)", "Omega(n log n)", "Omega(n^2)", "Omega(log n)"],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "Any sorting algorithm that determines order solely by pairwise comparisons must, in the worst case, be able to distinguish among all n! possible orderings of the input, which forces at least log2(n!) = Theta(n log n) comparisons via the decision-tree argument. So Omega(n log n) is the correct, tight lower bound — option B. Omega(n), option A, is far too weak; it would allow, say, Theta(n) sorts to exist for comparison-based methods, which is provably impossible. Omega(n^2), option C, is not a valid lower bound at all — merge sort and heapsort already achieve Theta(n log n) in the worst case, which is asymptotically faster than n^2, so no valid lower bound can exceed n log n. Omega(log n), option D, is even weaker than option A and does not reflect the actual information-theoretic requirement of distinguishing n! outcomes."
    },
    {
      id: 'algo-sorting-searching-q2',
      q: "The proof that comparison sorting requires Omega(n log n) comparisons models execution as a binary decision tree. Which statement correctly completes the proof?",
      options: [
        "The tree must have exactly n leaves, one per input element, giving height Omega(log n)",
        "The tree must have at least n! leaves (one per possible output permutation), and a binary tree with L leaves has height at least log2(L), giving height Omega(n log n) by the Stirling approximation",
        "The tree must have at least 2^n leaves because each comparison doubles the number of reachable states, giving height exactly n",
        "The tree's height is irrelevant; only the number of internal nodes determines the running time"
      ],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'concept',
      explanation: "The correct argument: the algorithm must be able to correctly sort every one of the n! possible input permutations, and each distinct permutation must end at a distinct leaf of the decision tree (since a sorting algorithm cannot output the same fixed final arrangement for two different input orderings and still be correct in general — the leaf must record the specific rearrangement needed). So the tree needs at least n! leaves. Since a binary tree of height h has at most 2^h leaves, we need 2^h >= n!, i.e. h >= log2(n!), and the Stirling approximation gives log2(n!) = Theta(n log n). Option A undercounts drastically — n leaves would only be enough to identify n outcomes, not n! of them. Option C's '2^n leaves' claim is a common but wrong intuition; the tree's leaf count is driven by the number of DISTINCT OUTCOMES the algorithm must produce (n!), not by doubling per comparison in the abstract. Option D is wrong because the running time (worst-case comparisons) is exactly the tree's height, i.e. the longest root-to-leaf path, which is precisely what the argument bounds."
    },
    {
      id: 'algo-sorting-searching-q3',
      q: "Which of the following sorting algorithms is NOT stable in its standard textbook implementation?",
      options: ["Insertion sort", "Bubble sort", "Quicksort (with in-place Lomuto or Hoare partitioning)", "Merge sort"],
      answer: 2,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "Standard in-place quicksort partitioning swaps elements across potentially long distances in the array, and this can reorder two elements with equal keys relative to each other, so it is NOT stable — option C. Insertion sort only ever shifts elements past strictly SMALLER keys (never past an equal one), so equal keys retain their original relative order, making it stable. Bubble sort only swaps ADJACENT out-of-order elements and never swaps two elements it finds equal, so it too is stable. Merge sort is stable provided the merge step takes from the left sub-array whenever keys are equal, which is the standard convention. Quicksort CAN be made stable with extra auxiliary space (at the cost of losing its in-place property), but its standard, in-place form is unstable — this is the property GATE expects you to know."
    },
    {
      id: 'algo-sorting-searching-q4',
      q: "Which sorting algorithm is in-place (O(1) or O(log n) auxiliary space) but NOT stable?",
      options: ["Merge sort", "Counting sort", "Heapsort", "Insertion sort"],
      answer: 2,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: "Heapsort builds a max-heap in the input array itself (using only O(1) extra space) and repeatedly swaps the root with the last unsorted element, but this repeated 'swap the max to the end' step can reorder equal-keyed elements relative to each other, so heapsort is in-place yet NOT stable — option C. Merge sort is the reverse profile: stable but needs Theta(n) auxiliary space for merging, so it is not in-place. Counting sort is stable but needs Theta(n+k) auxiliary space (a count array and an output array), so it is not in-place either. Insertion sort is both in-place AND stable, the opposite combination from what the question asks. This question specifically drills the 'in-place does not imply stable, and vice versa' independence of the two properties."
    },
    {
      id: 'algo-sorting-searching-q5',
      q: "What is the best-case running time of insertion sort when the input array is already fully sorted (with the standard early-exit inner loop)?",
      options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'numerical',
      explanation: "On an already-sorted array, insertion sort's inner loop compares each new element to its immediate left neighbor exactly once, finds it already in the correct position (not smaller), and stops immediately without any shifting. This happens for each of the n elements, giving Theta(n) total comparisons and no data movement — option A. It is NOT O(n log n) (option B), which is characteristic of merge sort or heapsort in any case, not insertion sort's best case. It is NOT O(n^2) (option C) — that is insertion sort's WORST case (reverse-sorted input), where every new element must be compared against and shifted past every previously sorted element. O(log n) (option D) is too fast for any algorithm that must at minimum look at every one of the n elements once."
    },
    {
      id: 'algo-sorting-searching-q6',
      q: "Standard (non-randomized) quicksort always picks the first element of the current sub-array as the pivot. What is its running time on an already-sorted input array of n distinct elements?",
      options: ["Theta(n log n), same as the average case", "Theta(n^2), the worst case for this pivot rule", "Theta(n), since sorted input needs minimal work", "Theta(log n), since the array is already in order"],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "When the pivot is always chosen as the first element and the input is already sorted, each partition step produces a completely unbalanced split: the pivot is always the smallest remaining element, so one side of the partition is empty and the other contains all n-1 remaining elements. This produces a recursion of depth n, each level doing Theta(n) partitioning work, for total Theta(n^2) — quicksort's worst case, option B. This is precisely why production sorting libraries use randomized pivot selection or median-of-three heuristics: they make this Theta(n^2) worst-case pattern (already-sorted or reverse-sorted input) statistically improbable rather than guaranteed. Options A, C, and D all understate the actual cost; unlike merge sort or heapsort, quicksort's performance is highly sensitive to both input arrangement and the pivot-selection rule."
    },
    {
      id: 'algo-sorting-searching-q7',
      q: "Which statement correctly distinguishes merge sort's time-complexity behavior from quicksort's?",
      options: [
        "Merge sort's best, worst, and average cases are all Theta(n log n); quicksort's best and average cases are Theta(n log n) but its worst case is Theta(n^2)",
        "Both merge sort and quicksort have Theta(n^2) worst cases, but merge sort has a better average case",
        "Merge sort's worst case is Theta(n^2), while quicksort's worst case is always Theta(n log n) due to its in-place partitioning",
        "Merge sort and quicksort have identical case-by-case behavior since both are divide-and-conquer algorithms"
      ],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: "Merge sort always splits the array into two exactly-halved parts regardless of the data's values, so its recursion depth and per-level work are fixed by n alone: Theta(n log n) in every case, with no dependence on input arrangement. Quicksort's partition size instead depends on where the pivot lands relative to the data, so a good (roughly balanced) pivot gives Theta(n log n) (its best and average case with typical inputs or randomization) while a consistently bad pivot choice gives the unbalanced Theta(n^2) worst case. Option A captures this correctly. Option B is false — merge sort never degrades to Theta(n^2). Option C reverses the two algorithms' worst cases entirely. Option D ignores that being 'divide-and-conquer' says nothing about whether the split is guaranteed balanced (merge sort) or data-dependent (quicksort)."
    },
    {
      id: 'algo-sorting-searching-q8',
      q: "Counting sort is efficient (competitive with or better than comparison sorts) precisely when:",
      options: [
        "the array is nearly sorted already",
        "the keys are integers drawn from a range [0, k) where k = O(n)",
        "the number of distinct key VALUES k is much larger than n, e.g. k = n^2",
        "the array contains only floating-point keys uniformly distributed in [0,1)"
      ],
      answer: 1,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: "Counting sort runs in Theta(n + k) time and space, where k is the size of the key range. This beats the Omega(n log n) comparison-sort lower bound only when k is not too large relative to n — specifically when k = O(n), giving overall Theta(n) time, which is option B. 'Nearly sorted already' (option A) is a condition that helps insertion sort or adaptive comparison sorts, not counting sort, whose running time is entirely insensitive to how sorted the input already is. Option C describes exactly the failure condition: if k = n^2, the Theta(n+k) cost becomes Theta(n^2), worse than a Theta(n log n) comparison sort, so counting sort would be the WRONG choice there. Option D describes the precondition for BUCKET sort (uniformly distributed reals in a range), not counting sort, which requires the keys to be (bounded, small-range) integers, not arbitrary reals."
    },
    {
      id: 'algo-sorting-searching-q9',
      q: "For n input elements whose integer keys lie in the range [0, k-1], what are counting sort's time and additional space complexity?",
      options: ["Time O(n log n), space O(1)", "Time O(n+k), space O(n+k)", "Time O(nk), space O(k)", "Time O(n+k), space O(1)"],
      answer: 1,
      marks: 1,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "Counting sort makes one pass over the input to tally occurrences of each key value into a count array of size k (Theta(k) space), then computes prefix sums over that count array (Theta(k) time), and finally makes a second pass placing each input element into its correct position in an output array of size n (Theta(n) time and space). Total time is Theta(n+k) and total additional space is also Theta(n+k) (count array plus output array), matching option B. Option A's O(n log n) time understates counting sort's actual linear-in-(n+k) behavior — it is NOT a comparison sort and doesn't pay the log n factor at all. Option C's O(nk) time is far too pessimistic; counting sort never does nested work proportional to both n and k together. Option D correctly states the time but wrongly claims O(1) space, ignoring the count and output arrays counting sort fundamentally requires."
    },
    {
      id: 'algo-sorting-searching-q10',
      q: "Radix sort sorts n keys, each having exactly d digits in base b, by applying a stable sort (such as counting sort) to one digit position at a time, from least to most significant digit. What is its overall time complexity?",
      options: ["Theta(n log n) regardless of d and b", "Theta(d(n+b))", "Theta(dn^2)", "Theta(n+d) independent of b"],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "Each of the d digit-sorting passes uses a stable counting sort over a digit range of size b, and each such pass costs Theta(n+b). Repeating this d times (once per digit position) gives total time Theta(d(n+b)) — option B. This directly explains why radix sort can beat the Omega(n log n) comparison-sort bound: if d is a small constant (say, keys of fixed maximum digit-length) and b = O(n) (a base chosen comparable to n, such as base n itself), the total time collapses to Theta(n), because it never performs a single comparison between two whole keys. Option A wrongly assumes radix sort behaves like a comparison sort, which it fundamentally is not. Option C vastly overstates the cost by squaring n unnecessarily. Option D incorrectly drops the base b entirely, but the per-digit counting-sort pass explicitly depends on the digit range size b."
    },
    {
      id: 'algo-sorting-searching-q11',
      q: "Bucket sort distributes n keys, assumed roughly uniformly distributed over a known range, into k buckets and sorts each bucket individually. Which statement about its running time is correct?",
      options: [
        "It is always exactly Theta(n log n), regardless of the distribution assumption",
        "Its expected running time is Theta(n+k) under the uniform-distribution assumption, but it degrades to Theta(n^2) in the worst case if most elements fall into the same bucket",
        "It is Omega(n log n) in every case since it must eventually sort each bucket by comparison",
        "It has no worst case worse than Theta(n) because buckets guarantee balanced splits"
      ],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'concept',
      explanation: "Bucket sort's efficiency depends entirely on its assumption holding: if keys are roughly uniformly spread across the k buckets, each bucket holds a small constant-expected number of elements, so sorting each bucket (typically with insertion sort) plus distributing all n elements takes expected Theta(n+k) time. But this is a probabilistic guarantee, not a worst-case one: an adversarial or skewed input can dump most or all n elements into a single bucket, in which case that one bucket's insertion sort alone costs Theta(n^2), which is bucket sort's true worst case — option B captures both halves correctly. Option A is wrong because bucket sort's performance is explicitly distribution-dependent, not a fixed Theta(n log n). Option C incorrectly claims a universal Omega(n log n) bound, ignoring that bucket sort's average case is linear precisely because it exploits the distribution assumption rather than relying purely on comparisons. Option D ignores the well-known skewed-input worst case."
    },
    {
      id: 'algo-sorting-searching-q12',
      q: "What is the maximum number of comparisons required by binary search in the worst case, searching a sorted array of 16 elements for a target value?",
      options: ["4", "5", "8", "16"],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'numerical',
      explanation: "Binary search's worst-case comparison count for n elements is floor(log2(n)) + 1. For n = 16, log2(16) = 4 exactly, so floor(4) + 1 = 5 — option B. Concretely: searching among 16 elements, after 1 comparison the range shrinks to 8, after 2 to 4, after 3 to 2, after 4 to 1 remaining candidate, and the 5th comparison confirms or rejects that final candidate — 5 comparisons total in the worst case. Option A, 4, undercounts by one — it's the number of HALVINGS needed to reach a single element, but one more comparison is still needed to check that element. Option C, 8, would be n/2, an unrelated quantity. Option D, 16, is n itself, the (irrelevant) cost of a linear scan, not binary search."
    },
    {
      id: 'algo-sorting-searching-q13',
      q: "What is the maximum number of comparisons binary search requires in the worst case on a sorted array of 100 elements?",
      options: ["6", "7", "10", "50"],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: "Using the formula floor(log2(n)) + 1 for n = 100: log2(100) ≈ 6.643856, so floor(6.643856) = 6, and 6 + 1 = 7 — option B. A quick sanity check via powers of 2: 2^6 = 64 and 2^7 = 128, and since 64 < 100 <= 128, binary search on 100 elements needs the same worst-case comparison count as it would need for up to 128 elements, namely 7. Option A, 6, is exactly floor(log2(100)) without the required '+1' final confirming comparison — a very common off-by-one error. Option C, 10, and option D, 50, both wildly overstate the cost; 50 in particular is what a naive linear scan through half the array might suggest, but binary search's whole advantage is that it needs only logarithmically many comparisons, not a constant fraction of n."
    },
    {
      id: 'algo-sorting-searching-q14',
      q: "Quickselect (Hoare's selection algorithm) finds the kth smallest element by partitioning like quicksort but recursing into only the side that contains the target rank. What are its expected and worst-case running times?",
      options: [
        "Expected Theta(n), worst-case Theta(n^2)",
        "Expected Theta(n log n), worst-case Theta(n log n)",
        "Expected Theta(n), worst-case Theta(n log n)",
        "Expected Theta(log n), worst-case Theta(n)"
      ],
      answer: 0,
      marks: 2,
      difficulty: 'medium',
      type: 'concept',
      explanation: "With a randomly chosen pivot, quickselect's partition sizes shrink geometrically in expectation, giving an expected total work of n + n/2 + n/4 + ... = Theta(n) (a converging geometric series), just as it saves a full sort by discarding the unneeded side entirely at each step. But under an adversarial or unlucky pivot sequence (mirroring quicksort's own worst case, e.g. always picking the current minimum or maximum as pivot), each partition step only shrinks the problem by one element, giving Theta(n) + Theta(n-1) + ... = Theta(n^2) in the worst case — matching option A exactly. This expected-vs-worst-case gap is structurally identical to quicksort's own gap, which is intentional since quickselect is built from the same partitioning primitive. Options B, C, and D all misstate one or both bounds; notably, no correct variant of this argument produces an n log n term, since quickselect recurses into only ONE side, not both, unlike quicksort."
    },
    {
      id: 'algo-sorting-searching-q15',
      q: "The median-of-medians (BFPRT) selection algorithm guarantees worst-case linear time for finding the kth smallest element. What is the key idea that removes quickselect's Theta(n^2) worst case?",
      options: [
        "It always sorts the entire array first using merge sort, then indexes directly into position k",
        "It picks the pivot as the median of group-medians (dividing the array into groups of 5, taking each group's median, then recursively finding the median of those medians), guaranteeing the pivot always discards a constant fraction of the array",
        "It repeats quickselect multiple times with different random pivots and takes the majority answer",
        "It avoids partitioning entirely by using a max-heap of size k"
      ],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'concept',
      explanation: "The median-of-medians pivot selection guarantees that the chosen pivot is provably greater than roughly 3/10 of the elements and less than roughly 3/10 of the elements (a constant fraction in both directions, derived from the group-of-5 structure), so every partition step is guaranteed to discard at least a constant fraction of the remaining array — never degrading to the 'discard only one element per step' pattern that causes quickselect's worst case. This yields the recurrence T(n) = T(n/5) + T(7n/10) + O(n) (T(n/5) for recursively finding the median of medians, T(7n/10) for the worst-case recursive call on the larger remaining side), which solves to Theta(n) because 1/5 + 7/10 = 9/10 < 1. Option A describes a completely different, slower O(n log n) approach (full sorting) that also defeats the purpose of a selection-specific algorithm. Option C's 'repeat and vote' scheme is not how median-of-medians works and would not give a deterministic worst-case guarantee anyway. Option D's heap-based approach can find the kth smallest in O(n + k log n) but is a different technique entirely, unrelated to median-of-medians pivoting."
    },
    {
      id: 'algo-sorting-searching-q16',
      q: "The median-of-medians selection algorithm satisfies the recurrence T(n) = T(n/5) + T(7n/10) + O(n). Why does this recurrence solve to Theta(n) rather than something larger like Theta(n log n)?",
      options: [
        "Because n/5 and 7n/10 are both smaller than n, and any recurrence with two smaller sub-calls automatically gives Theta(n log n)",
        "Because the sum of the two fractional coefficients, 1/5 + 7/10 = 9/10, is strictly less than 1, so the total work across all recursion levels forms a convergent geometric series dominated by the O(n) term at the top level",
        "Because the Master theorem case 1 always applies whenever there is more than one recursive call",
        "Because T(7n/10) dominates and by itself already equals Theta(n) at every level, making the T(n/5) term irrelevant to the final bound"
      ],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: "When a recurrence splits into multiple recursive calls on FRACTIONS of n whose coefficients sum to strictly less than 1 (here 1/5 + 7/10 = 2/10 + 7/10 = 9/10 < 1), the total input size being processed shrinks by a constant factor at every level of recursion, exactly like a single-branch recurrence T(n) = T(cn) + O(n) with c < 1. Summing the O(n)-sized work across all levels gives a geometric series n(1 + 9/10 + (9/10)^2 + ...) that converges to Theta(n) (bounded by n / (1 - 9/10) = 10n), rather than growing with an extra log n factor. Option A is false in general — the coefficient sum mattering (specifically needing it to be less than 1) is the actual criterion, not simply 'more than one recursive call' (e.g. T(n) = 2T(n/2) + O(n) has coefficients summing to 1, and that DOES give Theta(n log n), the merge sort recurrence). Option C misstates the Master theorem, whose case selection depends on comparing the recursive branching against n^(log_b a), not on the mere presence of multiple calls. Option D is wrong because dropping the T(n/5) term is not valid reasoning — the correct justification requires accounting for BOTH terms' combined fractional contribution."
    }
  ]
});

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-asymptotic';}).theory.deep = 'ASYMPTOTIC NOTATION — FORMAL DEFINITIONS\n\n• Big-O (upper bound): f(n) = O(g(n)) iff there exist positive constants c and n0 such that 0 <= f(n) <= c*g(n) for all n >= n0. Meaning: f grows no faster than g, up to a constant factor, eventually.\n• Big-Omega (lower bound): f(n) = Omega(g(n)) iff there exist positive constants c and n0 such that 0 <= c*g(n) <= f(n) for all n >= n0. Meaning: f grows at least as fast as g, eventually.\n• Big-Theta (tight bound): f(n) = Theta(g(n)) iff there exist positive constants c1, c2, n0 such that 0 <= c1*g(n) <= f(n) <= c2*g(n) for all n >= n0. Equivalently, f = O(g) AND f = Omega(g).\n• little-o (strict upper bound): f(n) = o(g(n)) iff for EVERY constant c > 0 there exists n0 such that 0 <= f(n) < c*g(n) for all n >= n0. This is a "for all c" quantifier, unlike Big-O\'s "there exists c". It means f becomes negligible relative to g.\n• little-omega (strict lower bound): f(n) = omega(g(n)) iff for every constant c > 0 there exists n0 such that 0 <= c*g(n) < f(n) for all n >= n0.\n\nLIMIT TEST (practical shortcut)\n\n• Compute L = lim(n -> infinity) f(n)/g(n).\n• If L = 0, then f = o(g) (and hence f = O(g), not Omega(g) unless f=0).\n• If L = some finite constant c > 0, then f = Theta(g).\n• If L = infinity, then f = omega(g) (and hence f = Omega(g), not O(g)).\n• If the limit does not exist (oscillates) the limit test is inconclusive and the formal definition must be used directly.\n• L\'Hopital\'s rule may be applied when both f and g diverge to infinity (0/0 or infinity/infinity forms), e.g. comparing n and log n via d/dn.\n\nGROWTH RATE ORDERING CHAIN (slowest to fastest)\n\n• O(1) < O(log log n) < O(log n) < O((log n)^2) < O(sqrt(n)) < O(n / log n) < O(n) < O(n log n) < O(n log^2 n) < O(n^1.5) < O(n^2) < O(n^2 log n) < O(n^3) < O(2^n) < O(n!) < O(n^n)\n• Any positive power of log n is asymptotically smaller than any positive power of n: log n = o(n^epsilon) for every epsilon > 0, no matter how small.\n• Any polynomial n^k is asymptotically smaller than any exponential c^n for c > 1: n^k = o(c^n).\n• Factorial n! grows faster than any fixed exponential c^n (by Stirling\'s approximation n! ~ sqrt(2*pi*n) * (n/e)^n), and n^n grows even faster than n!.\n• Polynomials of different degree are ordered by degree alone: n^2 = o(n^3), regardless of the constants/lower-order terms.\n\nMASTER THEOREM\n\nFor recurrences of the form T(n) = a*T(n/b) + f(n), with a >= 1, b > 1, compare f(n) against n^(log_b a):\n• CASE 1: If f(n) = O(n^(log_b a - epsilon)) for some constant epsilon > 0 (f is polynomially SMALLER), then T(n) = Theta(n^(log_b a)).\n• CASE 2: If f(n) = Theta(n^(log_b a) * log^k n) for some k >= 0 (f matches, possibly with a log factor), then T(n) = Theta(n^(log_b a) * log^(k+1) n). The common k=0 sub-case gives T(n) = Theta(n^(log_b a) * log n).\n• CASE 3: If f(n) = Omega(n^(log_b a + epsilon)) for some epsilon > 0 (f is polynomially LARGER), AND the regularity condition a*f(n/b) <= c*f(n) holds for some constant c < 1 and all sufficiently large n, then T(n) = Theta(f(n)).\n• REGULARITY CONDITION is required only in Case 3; it typically holds automatically for polynomial f(n) but can fail for oddly behaved f, and is the most commonly forgotten clause in GATE.\n• CASES THE THEOREM CANNOT SOLVE: when f(n) falls in a "gap" between cases with no polynomial separation (e.g. T(n) = 2T(n/2) + n/log n — here f(n) = n/log n is smaller than n but not polynomially smaller, since n/log n = n^(1-o(1)) not n^(1-epsilon)); when a < 1 or b <= 1 (theorem does not apply); when the recurrence is not of the a*T(n/b)+f(n) form (e.g. T(n) = T(n-1) + T(n-2), Fibonacci-style, or T(n) = T(sqrt(n)) + 1); or when Case 3 holds but regularity fails. These require substitution or recursion-tree methods, or the Akra-Bazzi generalization.\n\nSUBSTITUTION METHOD\n\n• Guess a closed form (e.g. T(n) = O(n log n)), then prove it by strong induction: assume the bound holds for all smaller inputs, substitute into the recurrence, and show the inductive step closes with the correct constant.\n• Worked example: T(n) = 2T(n/2) + n. Guess T(n) <= c*n*log n. Inductive hypothesis: T(n/2) <= c*(n/2)*log(n/2). Substitute: T(n) <= 2*c*(n/2)*log(n/2) + n = c*n*(log n - 1) + n = c*n*log n - c*n + n. This is <= c*n*log n provided c >= 1. Base case checked separately for small n. Hence T(n) = O(n log n), matching Master theorem Case 2.\n• A common pitfall: guessing T(n) = O(n) for the same recurrence fails — substituting T(n) <= c*n gives T(n) <= c*n + n = (c+1)*n which is NOT <= c*n for any fixed c, so the guess must be revised upward (this is the standard "subtracting a lower-order term" trick when a guess almost works, e.g. guessing c*n - b for a constant b).\n\nRECURSION TREE METHOD\n\n• Draw the recurrence as a tree: root does f(n) work, branches into a children each solving size n/b, recursively.\n• Worked example: T(n) = 3T(n/4) + n^2. Level 0 work = n^2. Level 1: 3 nodes each of size n/4, doing (n/4)^2 work each, total = 3*n^2/16. Level i: (3/16)^i * n^2. Since 3/16 < 1, the series is geometric and decreasing, so total work is dominated by the root: sum over i of (3/16)^i * n^2 = n^2 / (1 - 3/16) = Theta(n^2). This matches Master Case 1 since n^(log_4 3) = n^0.79 < n^2.\n• The tree method is essential exactly when Master theorem cannot be applied directly, since it directly sums per-level work without needing the three-case classification.\n\nGATE TRAPS\n\n• Confusing O (upper bound, "at most") with Theta (tight, "exactly") — GATE often asks for the tight bound and O(n^2) alone is not wrong but is not the BEST answer if Theta(n log n) is achievable and asked for.\n• Applying Master theorem to non-matching recurrences, e.g. T(n) = T(n/2) + T(n/2) + n is FINE (a=2) but T(n) = T(n-1) + n is NOT of Master form (subtractive, not divisive) — must use substitution/tree, giving Theta(n^2).\n• Forgetting the regularity condition in Case 3 and blindly concluding T(n) = Theta(f(n)) whenever f(n) dominates polynomially.\n• Treating "f(n) is bigger" loosely instead of checking POLYNOMIAL separation (an epsilon gap) — logarithmic factor differences (Case 2\'s log^k boundary) do not qualify as Case 1 or Case 3.\n• Misordering log and polynomial functions, e.g. assuming (log n)^100 grows faster than n^0.01 — it does not, for large enough n.\n• Sign errors in the limit test, or applying L\'Hopital without checking that both terms actually diverge (0/0 or infinity/infinity), which invalidates the technique.\n• Assuming n! and 2^n are "close" in growth rate; n! is strictly super-exponential and dominates 2^n by a wide, growing margin.';

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-divide-conquer';}).theory.deep = 'DIVIDE AND CONQUER — STANDARD RECURRENCES AND TIGHT BOUNDS\n\n• Binary search: T(n) = T(n/2) + O(1). Master Case 2 (a=1, b=2, f(n)=O(1)=Theta(n^0 log^0 n)) gives T(n) = Theta(log n).\n• Merge sort: T(n) = 2T(n/2) + Theta(n) for the linear merge step. Master Case 2 (n^(log_2 2) = n^1 matches f(n)=Theta(n)) gives T(n) = Theta(n log n) in best, average, AND worst case — merge sort\'s bound is invariant to input order.\n• Binary tree traversal / naive multiplication of n-digit numbers (schoolbook): Theta(n^2), not divide and conquer, used as a contrast baseline.\n• Karatsuba multiplication: T(n) = 3T(n/2) + Theta(n) (three recursive multiplications of half-length numbers plus linear-time addition/shifting, replacing the naive 4 recursive calls). Master Case 1 (n^(log_2 3) = n^1.585 dominates f(n)=n) gives T(n) = Theta(n^1.585).\n• Strassen\'s matrix multiplication: T(n) = 7T(n/2) + Theta(n^2) (7 recursive multiplications of half-size submatrices instead of the naive 8, plus O(n^2) additions). Master Case 1 (n^(log_2 7) = n^2.807 dominates n^2) gives T(n) = Theta(n^2.807), beating the naive Theta(n^3).\n• Closest pair of points (2D): T(n) = 2T(n/2) + Theta(n) (the strip-checking merge step is linear after presorting by y). Master Case 2 gives T(n) = Theta(n log n).\n• Maximum subarray (divide and conquer version): T(n) = 2T(n/2) + Theta(n) (linear-time cross-boundary scan). Master Case 2 gives Theta(n log n) — beaten in practice by Kadane\'s O(n) DP, a classic GATE trap.\n• Median of two sorted arrays (binary-search-on-answer approach): T(n) = T(n/2) + O(1), giving Theta(log n) (or Theta(log(min(m,n))) for unequal sizes) — NOT the naive O(m+n) merge.\n• Quickselect (randomized selection, average case): T(n) = T(n/2) + O(n) on average (expected balanced split). This is Case 3-like with a single shrinking term and gives Theta(n) average case via recursion-tree geometric summation (n + n/2 + n/4 + ... = 2n).\n• Median-of-medians deterministic selection: T(n) = T(n/5) + T(7n/10) + O(n), solving to Theta(n) because the fractional coefficients sum to 9/10 < 1 (geometric decay argument, not standard Master theorem since two different-sized recursive calls appear).\n• Fast exponentiation (a^n by repeated squaring): T(n) = T(n/2) + O(1) where n is the exponent, giving Theta(log n) multiplications.\n\nQUICKSORT — BEST, WORST, AVERAGE CASE DERIVATION\n\n• WORST CASE: occurs when partitioning is maximally unbalanced (e.g. pivot is always the minimum or maximum element, as with a fixed first/last-element pivot on already-sorted input). Recurrence: T(n) = T(n-1) + T(0) + Theta(n) = T(n-1) + Theta(n). Summing an arithmetic series n + (n-1) + (n-2) + ... + 1 gives Theta(n^2).\n• BEST CASE: occurs when every partition splits the array into two equal halves. Recurrence: T(n) = 2T(n/2) + Theta(n), which by Master Case 2 gives Theta(n log n).\n• AVERAGE CASE (derivation sketch): Let T(n) be the expected number of comparisons with a uniformly random pivot choice (or random input). The pivot lands at rank i with probability 1/n for each i = 1..n, giving the recurrence T(n) = Theta(n) + (1/n) * sum over i=0 to n-1 of [T(i) + T(n-1-i)]. Solving this (by substitution guessing T(n) = O(n log n), or by summing the expected work contributed by each pair of elements as the probability they are compared, which is 2/(rank difference + 1)) yields T(n) = Theta(n log n). The key intuition: even though bad splits are possible, "very bad" splits (like 1:(n-1)) are rare enough, and "reasonably balanced" splits occur often enough, that the expected recursion depth stays Theta(log n).\n• Randomization (random pivot or random shuffle before sorting) does not change the worst case (still Theta(n^2) is theoretically possible on some coin-flip sequence) but makes that worst case exponentially unlikely, so EXPECTED time is Theta(n log n) regardless of input, unlike the deterministic-pivot version whose worst case is triggered by a specific, predictable input.\n\nBINARY SEARCH — INVARIANTS\n\n• Loop invariant: if the target is present in the array, it always lies within the current subrange [low, high] (inclusive), maintained across iterations.\n• Termination invariant: each iteration strictly shrinks (high - low), guaranteeing termination in O(log n) steps since the range at least halves.\n• Precondition: the array must be sorted (ascending or descending, consistently) — binary search on an unsorted array gives no correctness guarantee at all, not even a slower correct answer.\n• Boundary handling: using mid = low + (high - low)/2 avoids integer overflow compared to (low+high)/2 for very large indices (a subtle correctness/robustness point GATE sometimes tests conceptually).\n• Two common variants: "find any occurrence" (standard) versus "find first/last occurrence" (lower_bound/upper_bound), which require adjusting the update rule (moving high = mid instead of high = mid-1 when arr[mid] == target, continuing to search left) — GATE frequently tests off-by-one behavior in these variants.\n• Invariant failure modes: if low > high is used as the loop condition but mid is computed incorrectly, or if updates use mid instead of mid+-1, infinite loops or missed elements result — a classic trace-the-code GATE question style.\n\nWORKED EXAMPLES\n\n• Example 1 (Recurrence chaining): T(n) = 8T(n/2) + n^2. Here a=8, b=2, n^(log_2 8) = n^3. Since f(n) = n^2 = O(n^(3-1)), Case 1 applies: T(n) = Theta(n^3). This models a naive (non-Strassen) divide-and-conquer matrix multiplication with 8 recursive calls.\n• Example 2 (Tracing quicksort partition count): For array [5,3,8,1,9,2] with last-element pivot (2), after one partition pass elements <2 go left, giving [1,2,5,3,8,9] roughly — pivot lands at index 1, giving an unbalanced 1:4 split; tracking this through several levels shows how a poor pivot choice pattern degrades toward Theta(n^2) unless mitigated by randomization or median-of-three pivoting.\n\nGATE TRAPS\n\n• Assuming quicksort worst case can never happen in practice — GATE questions often construct exactly the adversarial input (sorted or reverse-sorted array with first/last pivot) to force Theta(n^2), and expect the student to recognize it.\n• Confusing Karatsuba\'s Theta(n^1.585) with Strassen\'s Theta(n^2.807) — both come from a*T(n/2)+f(n) with reduced recursive calls (3 and 7 respectively) but different f(n) and different resulting exponents (log_2 3 versus log_2 7); mixing up the base recursive-call counts is a frequent error.\n• Applying the Master theorem to the median-of-medians recurrence T(n)=T(n/5)+T(7n/10)+O(n) directly — it does NOT fit the single-term a*T(n/b) form and needs the recursion-tree/geometric-series argument instead.\n• Treating merge sort\'s Theta(n log n) as only the "average case" — it is actually invariant across best, worst, and average cases, unlike quicksort.\n• Forgetting that binary search requires sorted input; running it on unsorted data is a silent-failure trap, not merely a slow one.\n• Off-by-one errors when converting exclusive vs inclusive bounds in binary search variants (first occurrence, last occurrence, insertion point) — GATE trace questions frequently hinge on this.\n• Believing randomized quicksort has better worst-case TIME COMPLEXITY than deterministic quicksort — it does not; both have Theta(n^2) worst case, but randomization changes the probability distribution over which inputs trigger it, converting a deterministic weakness into an expected-case guarantee.';

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-greedy';}).theory.deep = 'GREEDY ALGORITHMS — PROOF METHODOLOGY\n\n• EXCHANGE ARGUMENT TEMPLATE (the standard proof technique for greedy correctness): (1) Assume an optimal solution OPT exists that differs from the greedy solution G at some point. (2) Identify the first place they differ — greedy picks element g, OPT picks element o instead. (3) Show that swapping o for g in OPT (an "exchange") produces another solution OPT\' that is still feasible (satisfies all constraints) and is no worse than OPT (same or better objective value). (4) Repeat this exchange argument inductively until OPT\' becomes identical to G, proving G is at least as good as any optimal solution, hence G is itself optimal.\n• GREEDY-CHOICE PROPERTY: a globally optimal solution can be reached by making a locally optimal (greedy) choice at each step, without reconsidering past choices — this must be proven, not assumed, for each new greedy algorithm.\n• OPTIMAL SUBSTRUCTURE: an optimal solution to the problem contains optimal solutions to subproblems — necessary for greedy (and DP) but not sufficient by itself to justify greedy (0/1 knapsack has optimal substructure but greedy still fails on it).\n\nACTIVITY SELECTION — CORRECTNESS PROOF SKETCH\n\n• Greedy rule: sort activities by finish time, repeatedly pick the next activity whose start time is not earlier than the finish time of the last picked activity.\n• Proof via exchange argument: let A = {a1, a2, ..., ak} be an optimal solution sorted by finish time, and let g1 be the activity greedy picks first (the one with the globally earliest finish time). If a1 != g1, then since g1 has the earliest finish time among ALL activities, finish(g1) <= finish(a1), so replacing a1 with g1 in A cannot cause any conflict with a2 (since a2 starts after finish(a1) >= finish(g1)). This produces another optimal solution that includes g1. Inductively repeating this argument on the remaining subproblem (activities starting after finish(g1)) shows greedy\'s full selection is optimal.\n• Complexity: Theta(n log n) dominated by the sort; the selection scan itself is Theta(n).\n\nHUFFMAN CODING — CORRECTNESS AND WORKED EXAMPLE\n\n• Greedy rule: repeatedly merge the two lowest-frequency nodes into a new node with combined frequency, using a min-heap, until one tree remains. Complexity: Theta(n log n) (n-1 extract-min and insert operations on a heap of size Theta(n)).\n• Correctness intuition (exchange argument): in any optimal prefix code, the two least frequent symbols must be at the maximum tree depth and must be siblings (if they were not, swapping them with whatever symbols ARE at max depth/siblings would not increase, and could only decrease, the weighted path length, since lower-frequency symbols benefit less from being shallow). This justifies always merging the two smallest frequencies first, and recursively the same argument applies to the reduced problem (treating the merged node as one symbol with combined frequency).\n• WORKED EXAMPLE: symbols A:5, B:9, C:12, D:13, E:16, F:45. Merge steps: (A5+B9=14) -> nodes {14, C12, D13, E16, F45}; merge two smallest (C12+D13=25) -> {14, 25, E16, F45}; merge two smallest (14+E16=30) -> {25, 30, F45}; merge two smallest (25+30=55) -> {55, F45}; merge final (55+45=100) = root. Depths from the merge tree: F is depth 1 (merged last, frequency 45), A and B end up depth 4 (merged first, deepest), C and D depth 3, E depth 3.\n• Code lengths and weighted total: F(45)*1 + C(12)*3 + D(13)*3 + E(16)*3 + A(5)*4 + B(9)*4 = 45 + 36 + 39 + 48 + 20 + 36 = 224 bits total for 100 symbols, i.e. average 2.24 bits/symbol, versus 3 bits/symbol for a fixed-length code (since 6 symbols need ceil(log2 6)=3 bits) — demonstrating Huffman\'s compression advantage of about 25%.\n\nKRUSKAL\'S MST — CUT PROPERTY PROOF\n\n• Greedy rule: sort all edges by weight ascending; add an edge to the growing forest if and only if it does not create a cycle (checked via union-find), until n-1 edges are added.\n• CUT PROPERTY (the underlying correctness theorem): for any cut (partition of vertices into two nonempty sets S and V-S) with no edges of the current MST-so-far crossing it, the minimum-weight edge crossing that cut is safe to add — some MST is guaranteed to contain it. Proof by exchange: suppose an MST T does not contain this minimum crossing edge e; T must contain some other edge e\' crossing the same cut (since T is connected and spans both sides); since weight(e) <= weight(e\') by minimality, swapping e\' for e in T (removing e\' creates two components, adding e reconnects them across the same cut) produces another spanning tree with total weight <= weight(T), so it is also an MST containing e.\n• Kruskal repeatedly applies the cut property implicitly: each time it adds the globally lightest remaining edge that does not close a cycle, that edge is the minimum crossing edge of the cut separating its two endpoint-components, so the cut property guarantees safety.\n• CYCLE PROPERTY (complementary, underlies edge REJECTION correctness): for any cycle, the maximum-weight edge on that cycle is never needed in any MST (it can always be excluded); this justifies why Kruskal is correct to permanently skip an edge that would form a cycle.\n• Complexity: Theta(E log E) for sorting (equivalently Theta(E log V) since E = O(V^2)), plus nearly-linear Theta(E * alpha(V)) for union-find operations (alpha = inverse Ackermann, effectively constant) — overall Theta(E log E).\n• UNIQUENESS CONDITION: the MST is unique if and only if all edge weights are distinct; with tied weights, multiple MSTs of the same total weight can exist (a common GATE trap when counting "the" MST).\n\nCLASSIC GREEDY FAILURE — 0/1 KNAPSACK\n\n• The greedy strategy of picking items by highest value-to-weight ratio first (which works for the FRACTIONAL knapsack) fails for 0/1 knapsack because items cannot be split.\n• Counterexample: capacity W=50, items (weight, value): (10,60) ratio 6, (20,100) ratio 5, (30,120) ratio 4. Greedy picks item1 (w=10,v=60, remaining capacity 40), then item2 (w=20,v=100, remaining 20), then cannot fit item3 (w=30) — total value 160, remaining capacity 20 wasted. But the true optimal 0/1 solution is item2+item3 (w=20+30=50, v=100+120=220), which greedy never finds because it commits irrevocably to item1 early. This is why 0/1 knapsack needs dynamic programming (or branch and bound), not greedy.\n• General lesson (a recurring GATE theme): greedy is provably correct only when a genuine exchange argument or matroid/cut-property structure can be established; optimal substructure ALONE is not sufficient justification, and "greedy looks natural" is not proof.\n\nGATE TRAPS\n\n• Assuming greedy works for 0/1 knapsack "because it worked for fractional knapsack" — always check whether the problem allows fractional/divisible choices, which is often the deciding factor.\n• Forgetting that Huffman codes are not unique when frequency ties occur during merges (different tie-breaking gives different but equally optimal trees with the same total weighted length) — GATE sometimes asks for average code length (invariant) rather than the exact code (which can vary).\n• Confusing the cut property (justifies edge INCLUSION) with the cycle property (justifies edge REJECTION) in MST proofs.\n• Believing Kruskal and Prim always produce the identical tree — they produce an MST of the same total weight, but the specific tree can differ, especially with weight ties.\n• Applying activity selection\'s "sort by finish time" greedy but mistakenly sorting by start time or duration instead — this common variant does NOT guarantee optimality (a short early-starting activity that conflicts with many others can be greedily chosen wrongly).\n• Assuming greedy algorithms always run faster than DP alternatives — true for many classic cases (activity selection, MST, Huffman) but the determining factor is correctness, not speed; using greedy where it is not provably correct (like 0/1 knapsack) gives a wrong answer, however fast.';

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-dp';}).theory.deep = 'DYNAMIC PROGRAMMING — STATE DESIGN METHODOLOGY\n\n• STEP 1: Identify the decision variable(s) that change across subproblems — usually a prefix/suffix length, an index range, a remaining capacity, or a subset.\n• STEP 2: Define the state as the minimal set of parameters that uniquely determines the subproblem\'s answer (fewer dimensions is better for space/time, but must fully capture all information needed).\n• STEP 3: Write the recurrence relating a state to smaller/simpler states (this is the "transition"), including all base cases.\n• STEP 4: Determine evaluation order (bottom-up table filling order, or top-down memoized recursion) so that every subproblem is solved before it is needed.\n• STEP 5: Identify the final answer\'s location in the table, and consider space optimization once correctness is established (e.g. rolling arrays when the recurrence only depends on the previous row/few previous states).\n• Two necessary properties for DP to apply: OPTIMAL SUBSTRUCTURE (optimal solution built from optimal solutions to subproblems) and OVERLAPPING SUBPROBLEMS (the same subproblems recur, making memoization/tabulation beneficial versus plain recursion).\n\nLONGEST COMMON SUBSEQUENCE (LCS)\n\n• State: dp[i][j] = length of LCS of the first i characters of string X and first j characters of string Y.\n• Recurrence: dp[i][j] = dp[i-1][j-1] + 1 if X[i] == Y[j]; else dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Base case: dp[0][j] = dp[i][0] = 0.\n• Table dimensions: (m+1) x (n+1) for strings of length m and n.\n• Complexity: Theta(mn) time, Theta(mn) space (Theta(min(m,n)) space with rolling-row optimization, though reconstructing the actual subsequence then needs extra bookkeeping or Hirschberg\'s algorithm for O(m+n) space with full reconstruction).\n\nEDIT DISTANCE (LEVENSHTEIN)\n\n• State: dp[i][j] = minimum number of operations (insert, delete, substitute) to convert the first i characters of X into the first j characters of Y.\n• Recurrence: if X[i] == Y[j], dp[i][j] = dp[i-1][j-1] (no operation needed); else dp[i][j] = 1 + min(dp[i-1][j-1] [substitute], dp[i-1][j] [delete from X], dp[i][j-1] [insert into X]). Base case: dp[i][0] = i, dp[0][j] = j.\n• Table dimensions: (m+1) x (n+1).\n• Complexity: Theta(mn) time, Theta(mn) space, reducible to Theta(min(m,n)) space via rolling rows (row-by-row dependency only).\n\n0/1 KNAPSACK\n\n• State: dp[i][w] = maximum achievable value using only the first i items with total weight capacity exactly-or-at-most w.\n• Recurrence: dp[i][w] = dp[i-1][w] if weight[i] > w (item cannot fit, skip it); else dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]) (choice: exclude or include item i). Base case: dp[0][w] = 0 for all w.\n• Table dimensions: (n+1) x (W+1) where n is item count and W is capacity.\n• Complexity: Theta(nW) time and space — this is PSEUDO-POLYNOMIAL, since W\'s bit-length, not its value, is the true input size; the problem is NP-hard in the strict (weakly-NP-hard/pseudo-poly-solvable) sense.\n• Space optimization: since dp[i][*] depends only on dp[i-1][*], a single 1D array of size W+1 suffices, provided the w-loop iterates in DECREASING order (to avoid using an already-updated value[i]-included entry from the same row i, which would incorrectly allow using item i more than once — this decreasing-order detail is a very common GATE and implementation trap).\n\nMATRIX CHAIN MULTIPLICATION\n\n• State: dp[i][j] = minimum number of scalar multiplications needed to fully parenthesize the product of matrices Mi through Mj.\n• Recurrence: dp[i][j] = min over all split points k (i <= k < j) of [dp[i][k] + dp[k+1][j] + p(i-1)*p(k)*p(j)], where p is the dimension array (matrix Mi has dimensions p(i-1) x p(i)). Base case: dp[i][i] = 0 (single matrix, no multiplication needed).\n• Table dimensions: n x n (for n matrices), typically filled by increasing chain length L = 2 to n.\n• Complexity: Theta(n^3) time (n^2 subproblems, each taking Theta(n) to try all split points), Theta(n^2) space.\n\nSUBSET SUM\n\n• State: dp[i][s] = true/false, whether a subset of the first i elements sums to exactly s.\n• Recurrence: dp[i][s] = dp[i-1][s] (exclude element i) OR (s >= arr[i] AND dp[i-1][s-arr[i]]) (include element i). Base case: dp[i][0] = true for all i (empty subset sums to 0); dp[0][s] = false for s > 0.\n• Table dimensions: (n+1) x (Sum+1) where Sum is the target sum.\n• Complexity: Theta(n * Sum) time and space, also pseudo-polynomial for the same reason as knapsack; space-optimizable to Theta(Sum) with a 1D boolean array iterated in decreasing order of s, exactly like 0/1 knapsack\'s space optimization (same underlying mechanism: reusing a row in place requires processing indices so that a cell isn\'t overwritten before it\'s read in the same "row pass").\n\nSPACE OPTIMIZATION TRICKS (GENERAL)\n\n• Rolling array / two-row technique: when dp[i][*] depends only on dp[i-1][*] (not older rows), keep only two rows (or one, updated carefully) instead of the full 2D table — reduces space from Theta(nm) to Theta(m).\n• Direction-of-iteration trick: when compressing to 1D, iterate the inner loop in decreasing order if the recurrence must NOT reuse the current pass\'s already-updated value (0/1 knapsack, subset sum); iterate in increasing order if the recurrence SHOULD reuse the current pass\'s update (e.g. unbounded knapsack / coin change with unlimited item reuse) — this single directional choice is what distinguishes 0/1 from unbounded variants in a space-optimized 1D implementation.\n• Reconstructing the actual solution (not just its value) after space optimization requires either keeping the full table (defeating the space saving) or using more advanced techniques like Hirschberg\'s divide-and-conquer trick for LCS, which recovers O(m+n) space with full reconstruction by combining forward and backward DP passes.\n\nWORKED EXAMPLES\n\n• Example 1 (LCS): X = "ABCBDAB", Y = "BDCABA". Filling the DP table row by row, the final dp[7][6] = 4, corresponding to an LCS such as "BCBA" or "BDAB" (length 4) — GATE frequently asks only for the LENGTH via the recurrence trace, not the actual string.\n• Example 2 (0/1 Knapsack): capacity W=10, items (weight,value): (2,3), (3,4), (4,5), (5,6). Building dp[i][w] row by row: including item with weight5/value6 and item weight3/value4 (up to w=8) plus leftover: optimal is items (3,4)+(5,6)+(2,3) if weight permits (2+3+5=10, exactly capacity, value=3+4+6=13); tracing the standard recurrence confirms dp[4][10] = 13, illustrating the include/exclude choice pattern the recurrence encodes.\n\nGATE TRAPS\n\n• Confusing 0/1 knapsack\'s pseudo-polynomial Theta(nW) with a claim that it is "polynomial in input size" — W\'s numeric value, not the number of bits to represent it, drives the complexity, so knapsack remains (weakly) NP-hard despite this efficient-looking DP.\n• Getting the space-optimized knapsack/subset-sum loop DIRECTION backwards (iterating w increasing instead of decreasing), which silently turns 0/1 knapsack into unbounded knapsack (allowing item reuse) — a frequent code-tracing trap.\n• Miscounting matrix chain multiplication table dimensions or split range (off-by-one in i,k,j bounds) leading to wrong scalar multiplication counts.\n• Forgetting the base cases (dp[i][0], dp[0][j] for LCS/edit distance) which anchor the entire recurrence — omitting them or initializing incorrectly propagates errors through the whole table.\n• Treating subset sum and 0/1 knapsack as unrelated — subset sum is a special case of 0/1 knapsack with weight=value for every item and asking for feasibility rather than maximization.\n• Assuming a DP with more table dimensions is automatically higher complexity than a greedy alternative — always compute Theta(rows * columns * per-cell work) explicitly rather than guessing (e.g. matrix chain\'s Theta(n^3) comes from Theta(n^2) cells each needing Theta(n) split-point work, not simply "it has 2 dimensions so it\'s Theta(n^2)").';


window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-graph';}).theory.deep = 'BFS / DFS — FULL PROPERTY LISTS\n\nBFS PROPERTIES\n• Uses a queue (FIFO); explores vertices in non-decreasing order of distance (number of edges) from the source.\n• Produces shortest paths (in terms of edge count) from the source in an UNWEIGHTED graph — this guarantee fails for weighted graphs.\n• Produces a BFS tree where tree edges connect a vertex to its immediate discoverer; in an undirected graph, every non-tree edge connects vertices at levels differing by at most 1 (a "cross edge" within the same or adjacent level) — undirected BFS has NO back edges to strict ancestors beyond the parent, and no forward edges.\n• Complexity: O(V+E) with an adjacency list, O(V^2) with an adjacency matrix.\n\nDFS PROPERTIES\n• Uses a stack (explicit or via recursion); explores as deep as possible before backtracking.\n• Produces discovery time and finish time for each vertex (the "parenthesis structure": for any two vertices u, v, their [discovery,finish] intervals are either nested or disjoint, NEVER partially overlapping).\n• EDGE CLASSIFICATION IN A DIRECTED GRAPH (all four types possible): TREE (discovers a new vertex), BACK (points to an ancestor still on the recursion stack — presence indicates a CYCLE), FORWARD (ancestor to an already-finished descendant, not a tree edge), CROSS (between vertices with no ancestor-descendant relationship, later-finished subtree to earlier-finished one).\n• EDGE CLASSIFICATION IN AN UNDIRECTED GRAPH: only TREE and BACK edges occur — forward/cross are impossible since an edge examined from whichever endpoint is visited second must connect to an ancestor still on the stack (undirected symmetry rules out the other two types).\n• A directed graph has a cycle iff DFS finds a back edge. An undirected graph has a cycle iff DFS finds a back edge to a non-parent ancestor. Complexity: O(V+E) with adjacency list, O(V^2) with adjacency matrix.\n\nTOPOLOGICAL SORT — BOTH ALGORITHMS\n\n• Applicable ONLY to Directed Acyclic Graphs (DAGs); a graph with a cycle has no valid topological order.\n• DFS-BASED: run DFS on the whole graph; whenever a vertex finishes (all its neighbors processed), push it onto a stack; after all vertices finish, popping the stack gives a valid topological order. Correctness: every edge (u,v) implies u finishes AFTER v (v fully explored before u\'s call returns, since a DAG has no back edges), so reversed finish order places u before v. Complexity: O(V+E).\n• KAHN\'S ALGORITHM (BFS-based, using in-degrees): compute in-degree of every vertex; queue all zero-in-degree vertices; repeatedly dequeue a vertex, append it to the output, and decrement each neighbor\'s in-degree, enqueuing any that reach zero. Complexity: O(V+E). Fewer than V output vertices when the queue empties means the graph has a cycle — Kahn\'s built-in cycle-detection side effect, a common GATE question.\n• Topological order is generally NOT unique when multiple vertices simultaneously have no incoming dependency at some point — both algorithms may produce different (but all valid) orderings depending on tie-breaking (stack/queue processing order, adjacency list order).\n\nSTRONGLY CONNECTED COMPONENTS — KOSARAJU\'S ALGORITHM IDEA\n\n• An SCC is a maximal set of vertices where every vertex can reach every other vertex within the set via directed paths.\n• Kosaraju\'s algorithm: (1) DFS on the original graph G, recording each vertex\'s finish time (push to a stack on finish). (2) Compute the transpose G^T (reverse every edge). (3) DFS on G^T, processing vertices in DECREASING finish-time order from step 1 (popping the stack); each DFS tree in this pass is exactly one SCC.\n• Why it works (idea): the vertex with highest finish time in G lies in a "source" SCC of the condensation DAG (each SCC contracted to one node) — processing in decreasing finish order on the transpose prevents a DFS call from leaking into a different SCC, since that would require an edge in G violating the condensation DAG\'s finish-time ordering.\n• Complexity: O(V+E) (two DFS passes plus O(V+E) transpose construction). Tarjan\'s SCC algorithm achieves the same O(V+E) in a single DFS pass using low-link values, avoiding the transpose.\n\nMST — CUT PROPERTY, CYCLE PROPERTY, UNIQUENESS\n\n• CUT PROPERTY: for any cut, the minimum-weight crossing edge belongs to SOME MST — underlies both Prim\'s (grows across the tree-so-far/rest cut) and Kruskal\'s (each accepted edge is minimal for the cut separating its two union-find components) correctness.\n• CYCLE PROPERTY: for any cycle, the maximum-weight edge on it is not part of any MST (unless tied) — justifies Kruskal\'s rejection of cycle-closing edges.\n• UNIQUENESS: an MST is guaranteed unique if and only if all edge weights are pairwise distinct. With repeated weights, multiple distinct MSTs (all sharing the same total minimum weight) can exist.\n• Complexity by algorithm: Prim\'s with a binary heap and adjacency list: O(E log V); Prim\'s with adjacency matrix (no heap, linear scan for min): O(V^2), which is actually FASTER for dense graphs; Prim\'s with Fibonacci heap: O(E + V log V); Kruskal\'s: O(E log E) = O(E log V) for the sort, plus near-linear union-find overhead.\n\nDIJKSTRA\'S ALGORITHM — INVARIANT AND WHY NEGATIVE EDGES BREAK IT\n\n• Invariant: once a vertex is extracted from the priority queue and finalized, its computed shortest-path distance is guaranteed correct and never updated again.\n• This relies on all edge weights being NON-NEGATIVE: the algorithm always extracts the smallest tentative distance, reasoning no unfinalized vertex can offer a shorter path later, since any such path uses an edge of length >= 0, which can only increase (never decrease) total length.\n• With a NEGATIVE edge, this breaks: a finalized vertex\'s distance could later be "improved" via a negative edge from a vertex finalized afterward — but Dijkstra never revisits finalized vertices, so it can silently output a wrong (too large) distance with no error indication.\n• Complexity: O((V+E) log V) with binary heap + adjacency list; O(V^2) with adjacency matrix, no heap (better for dense graphs); O(E + V log V) with a Fibonacci heap.\n\nBELLMAN-FORD — NEGATIVE CYCLE DETECTION\n\n• Relaxes every edge V-1 times; after V-1 iterations, if no negative-weight cycle is reachable from the source, all shortest distances are correct (a shortest simple path has at most V-1 edges).\n• Negative cycle detection: run one additional (V-th) relaxation pass; if any edge still relaxes (distance still decreases), a negative cycle reachable from the source exists, and shortest paths through it are undefined (arbitrarily negative by looping more).\n• Complexity: O(V*E), worse than Dijkstra\'s but tolerant of negative edges (absent a reachable negative cycle).\n\nCOMPLEXITY TABLE BY REPRESENTATION AND ALGORITHM\n\n• BFS / DFS: adjacency list O(V+E); adjacency matrix O(V^2).\n• Topological sort (DFS-based or Kahn\'s): adjacency list O(V+E); adjacency matrix O(V^2).\n• Kosaraju\'s SCC: adjacency list O(V+E) (needs list representation to build the transpose efficiently); adjacency matrix O(V^2).\n• Dijkstra: adjacency list + binary heap O((V+E) log V); adjacency list + Fibonacci heap O(E + V log V); adjacency matrix (array-based min extraction, no heap) O(V^2) — this matrix version is actually preferable for dense graphs where E approaches V^2.\n• Bellman-Ford: O(V*E) regardless of representation (matrix representation makes edge enumeration O(V^2) per pass, giving O(V^3) total, so adjacency LIST is preferred for Bellman-Ford\'s usual O(V*E) bound).\n• Prim\'s MST: adjacency list + binary heap O(E log V); adjacency matrix (no heap) O(V^2); adjacency list + Fibonacci heap O(E + V log V).\n• Kruskal\'s MST: O(E log E) with sorting, independent of vertex/edge representation choice (needs only an edge list plus union-find), since the dominant cost is the sort.\n• Floyd-Warshall (all-pairs shortest path, handles negative edges but not negative cycles): O(V^3) time, O(V^2) space, naturally uses adjacency matrix representation.\n\nWORKED EXAMPLES\n\n• Example 1 (Topological sort via Kahn\'s): DAG with edges 5->0, 5->2, 4->0, 4->1, 2->3, 3->1. In-degrees: 0:2, 1:2, 2:1, 3:1, 4:0, 5:0. Initial queue: [4,5]. Processing 4 decrements 0 and 1; processing 5 decrements 0 (now 0, enqueue) and 2 (now 0, enqueue). One valid order: 4,5,0,2,3,1 — another (5,4,2,0,3,1) is equally correct, illustrating non-uniqueness.\n• Example 2 (Dijkstra failing on a negative edge): vertices A,B,C with edges A->B weight 4, A->C weight 5, B->C weight -3. Dijkstra finalizes A (0), then B (4, smallest tentative). The true shortest distance to C is via B: 4+(-3)=1, shorter than the direct edge\'s 5. If C gets finalized from the direct A->C edge (5) before B\'s relaxation is considered, Dijkstra reports 5 instead of 1 — a finalized vertex is never re-examined even when a cheaper path via a negative edge appears later.\n\nGATE TRAPS\n\n• Assuming BFS gives shortest paths on WEIGHTED graphs — it only guarantees fewest-edges shortest paths on UNWEIGHTED graphs.\n• Misclassifying forward vs cross edges in directed-graph DFS traces — forward edges go to already-visited DESCENDANTS (nested intervals), cross edges to already-FINISHED non-ancestor-non-descendant vertices (disjoint intervals).\n• Believing undirected graphs can have forward/cross edges — structurally impossible; only tree and back edges occur.\n• Forgetting Kahn\'s algorithm doubles as a cycle detector: fewer than V output vertices implies a cycle.\n• Using Dijkstra on graphs with negative edges "because it usually still works" — it can silently give a wrong, too-large answer with no warning; Bellman-Ford handles negative edges correctly and detects negative cycles.\n• Assuming an MST is always unique regardless of weight ties — it is unique only when all edge weights are pairwise distinct.\n• Using adjacency matrix for Bellman-Ford (inflates it to O(V^3) instead of the standard O(V*E) with adjacency list).\n• Applying Kosaraju with the wrong finish-time order (must be DECREASING on the transpose) or forgetting to transpose — breaks SCC correctness entirely.';

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-sorting-searching';}).theory.deep = 'SORTING ALGORITHMS — MASTER COMPARISON TABLE\n\n• BUBBLE SORT: Best Theta(n) (with an early-exit flag on an already-sorted pass), Average Theta(n^2), Worst Theta(n^2), Space O(1), STABLE, IN-PLACE, ADAPTIVE (yes, with the swapped-flag optimization).\n• SELECTION SORT: Best/Average/Worst all Theta(n^2), Space O(1), NOT STABLE (standard implementation swaps across duplicates, breaking relative order), IN-PLACE, NOT ADAPTIVE (always scans the full remaining array regardless of existing order).\n• INSERTION SORT: Best Theta(n) (nearly sorted input), Average Theta(n^2), Worst Theta(n^2), Space O(1), STABLE, IN-PLACE, ADAPTIVE (yes — performs proportional to the number of inversions).\n• MERGE SORT: Best/Average/Worst all Theta(n log n), Space Theta(n) (auxiliary array for merging), STABLE, NOT IN-PLACE (standard version; in-place variants exist but are complex and lose some efficiency), NOT ADAPTIVE (does the same work regardless of initial order).\n• QUICKSORT: Best Theta(n log n), Average Theta(n log n), Worst Theta(n^2), Space O(log n) average (recursion stack, with tail-call/smaller-first optimization) or O(n) worst case, NOT STABLE (standard in-place partitioning swaps non-adjacent equal elements), IN-PLACE, NOT ADAPTIVE (standard version; some adaptive variants exist).\n• HEAP SORT: Best/Average/Worst all Theta(n log n), Space O(1), NOT STABLE (heap operations swap distant elements), IN-PLACE, NOT ADAPTIVE.\n• COUNTING SORT: Best/Average/Worst all Theta(n+k) where k is the range of key values, Space Theta(n+k), STABLE (when implemented correctly by placing elements from the end backward using the cumulative count array), NOT IN-PLACE, NOT COMPARISON-BASED so adaptivity does not apply in the usual sense.\n• RADIX SORT: Best/Average/Worst all Theta(d*(n+b)) where d is the number of digits and b is the base (bucket count, e.g. 10), Space Theta(n+b), STABLE (requires a stable sort, typically counting sort, as the per-digit subroutine), NOT IN-PLACE, NOT COMPARISON-BASED.\n• (Bonus) SHELL SORT: Best Theta(n log n) with good gap sequences, Worst ranges from Theta(n^1.5) to Theta(n^2) depending on gap sequence (e.g. Theta(n^1.5) for Shell\'s original sequence, better with Sedgewick\'s), Space O(1), NOT STABLE, IN-PLACE, ADAPTIVE to some extent (benefits from partial order).\n\nDECISION TREE LOWER BOUND ARGUMENT\n\n• Any COMPARISON-BASED sorting algorithm can be modeled as a binary decision tree: each internal node represents one comparison (element i versus element j), each leaf represents one possible output permutation of the input.\n• There are n! distinct possible orderings (permutations) of n distinct elements, so the decision tree must have AT LEAST n! leaves (each valid output ordering must be reachable, and no two distinct orderings can share a leaf, or the algorithm would give a wrong answer for one of them).\n• A binary tree of height h has at most 2^h leaves, so 2^h >= n!, giving h >= log2(n!).\n• By Stirling\'s approximation, log2(n!) = Theta(n log n) (since n! ~ sqrt(2*pi*n)*(n/e)^n, taking log2 gives n*log2(n) - n*log2(e) + O(log n), dominated by the n log n term).\n• Since the height of the decision tree equals the worst-case number of comparisons, ANY comparison-based sorting algorithm requires Omega(n log n) comparisons in the worst case — this is why merge sort and heap sort (both Theta(n log n)) are asymptotically optimal among comparison sorts, and why no comparison sort can achieve Theta(n) in general.\n• This lower bound applies ONLY to comparison-based sorts; non-comparison sorts (counting, radix, bucket) can beat it because they exploit structural knowledge of the key values (bounded range, fixed digit count) rather than relying purely on pairwise comparisons.\n\nCOUNTING SORT AND RADIX SORT — CONDITIONS FOR USE\n\n• Counting sort requires keys to be integers (or mappable to integers) within a known, reasonably small range [0, k]; it becomes inefficient (Theta(n+k) degrades badly) when k is very large relative to n (e.g. k = n^2 makes it worse than Theta(n log n) comparison sorts).\n• Counting sort\'s stability crucially depends on iterating the input array in REVERSE order when placing elements using the cumulative-count array, and decrementing the count after each placement — an easy-to-get-wrong implementation detail that GATE often tests via a trace question.\n• Radix sort requires keys to be represented as fixed-length sequences of digits/characters (e.g. d-digit base-b numbers) and applies a stable sort (usually counting sort) digit-by-digit, LEAST SIGNIFICANT DIGIT FIRST (LSD radix sort is the standard correct approach; MSD radix sort exists but needs recursive bucket refinement and careful handling).\n• Radix sort\'s correctness depends entirely on the per-digit sort being STABLE — if an unstable sort were used per digit, the relative order established by earlier (less significant) digit passes would be destroyed, giving a wrong final order. This is one of the most tested GATE conceptual points about radix sort.\n• Radix sort achieves Theta(n) effectively when d and b are treated as constants relative to n, but the honest bound Theta(d*(n+b)) shows it is not "free" — for keys with d = Theta(log n) digits (as needed to distinguish n distinct values in base b), the true bound becomes Theta(n log n), matching the comparison-sort lower bound rather than beating it (a frequently misunderstood point).\n\nSELECTION ALGORITHMS\n\n• Finding the MINIMUM or MAXIMUM alone: Theta(n) with a single linear scan, requiring exactly n-1 comparisons.\n• Finding BOTH minimum and maximum simultaneously: naive approach takes 2(n-1) comparisons, but the PAIRWISE comparison technique (process elements two at a time, first compare the pair to each other, then compare the smaller to the current min and the larger to the current max) needs only about 3n/2 comparisons total — a classic GATE numerical-answer question.\n• Finding the kth smallest/largest element (selection problem): naive approach sorts everything in Theta(n log n) then indexes directly; QUICKSELECT achieves expected Theta(n) (average case, using random or median-of-three pivoting) but Theta(n^2) worst case; MEDIAN-OF-MEDIANS achieves guaranteed worst-case Theta(n) via the T(n) = T(n/5) + T(7n/10) + O(n) recurrence.\n• A min-heap or max-heap approach to selection: building a heap is Theta(n), and extracting the kth element takes k extractions of Theta(log n) each, giving Theta(n + k log n) — efficient when k is small (e.g. k << n), such as finding the top-10 elements from a huge dataset, without needing full selection algorithms.\n\nWORKED EXAMPLES\n\n• Example 1 (Insertion sort inversion counting): array [4,1,3,2] has inversions (4,1),(4,3),(4,2),(3,2) = 4 inversions. Insertion sort\'s total number of element shifts equals exactly the inversion count, so it performs 4 shifts here — illustrating why insertion sort is Theta(n) on nearly-sorted arrays (few inversions) and Theta(n^2) on reverse-sorted arrays (maximum n(n-1)/2 inversions).\n• Example 2 (Radix sort trace): sorting [170, 45, 75, 90, 802, 24, 2, 66] by LSD radix (base 10, 3 digit passes). Pass on units digit gives [170,90,802,2,24,45,75,66]; pass on tens digit gives [802,2,24,45,66,170,75,90]; pass on hundreds digit gives the final sorted [2,24,45,66,75,90,170,802] — each pass uses a STABLE counting sort to preserve relative order from the previous pass, which is why the final result is correctly sorted only if every pass is stable.\n\nGATE TRAPS\n\n• Assuming quicksort is stable — it is generally NOT stable in its standard in-place partitioning form, a frequently tested negative fact.\n• Assuming heap sort is stable — it is NOT, since heapify operations swap elements across arbitrary distances, disturbing relative order of equal keys.\n• Claiming any comparison sort can achieve Theta(n) in the worst case — impossible by the decision-tree lower bound; only non-comparison sorts (with extra structural assumptions on keys) can do so.\n• Forgetting radix sort\'s per-digit subroutine MUST be stable, and forgetting it processes least-significant-digit first (not most-significant) in the standard correct version.\n• Treating radix sort\'s Theta(n) claim uncritically — when digit count d scales as log n (needed to represent n distinct keys), the true cost becomes Theta(n log n), not better than comparison sorts.\n• Confusing "in-place" (O(1) or O(log n) extra space) with "stable" (preserves relative order of equal elements) — these are independent properties; quicksort is in-place but not stable, merge sort is stable but not in-place (standard version).\n• Miscounting comparisons for simultaneous min-max finding — using naive 2(n-1) instead of recognizing the optimized ~3n/2 pairwise technique in a numerical-answer question.\n• Assuming quickselect\'s worst case cannot happen in GATE-style traced examples — a poor pivot sequence (e.g. always picking the largest remaining element) still forces Theta(n^2) exactly like quicksort\'s worst case.';

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-asymptotic';}).questions.push(
{
  id: 'algo-asymptotic-x1',
  q: 'Consider the following statements about asymptotic notation. S1: If f(n) = O(g(n)), then g(n) = Omega(f(n)). S2: If f(n) = Theta(g(n)), then g(n) = Theta(f(n)). S3: If f(n) = O(g(n)), then 2^f(n) = O(2^g(n)). S4: If f(n) = o(g(n)), then f(n) is NOT Omega(g(n)). How many of these four statements are TRUE?',
  options: ['1', '2', '3', '4'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'S1 is true: O and Omega are inverses of each other by definition (f <= c*g eventually is exactly the same relation as g >= (1/c)*f eventually). S2 is true: Theta is symmetric since it requires both O and Omega bounds in each direction. S3 is FALSE: exponentiating does not preserve O. Take f(n) = 2n and g(n) = n, so f(n) = O(g(n)) trivially with c=2, but 2^f(n) = 2^(2n) = 4^n while 2^g(n) = 2^n, and 4^n is not O(2^n) since the ratio (4/2)^n diverges to infinity. S4 is true: f = o(g) means f/g -> 0, which precludes f/g staying bounded below by a positive constant, the requirement for Omega(g). So exactly S1, S2, S4 are true: 3 statements.'
},
{
  id: 'algo-asymptotic-x2',
  q: 'Consider the following statements. S1: If f1(n) = O(g(n)) and f2(n) = O(g(n)), then f1(n) + f2(n) = O(g(n)). S2: If f(n) = O(g(n)) and g(n) = O(h(n)), then f(n) = O(h(n)). S3: If f(n) = Omega(g(n)), then f(n) + g(n) = Theta(f(n)). S4: If f(n) = O(n^2), then f(n) = Omega(n) must also hold. How many of these four statements are TRUE?',
  options: ['1', '2', '3', '4'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'S1 is true: the sum of two functions each bounded above by c1*g and c2*g is bounded above by (c1+c2)*g, so closure under addition holds. S2 is true: O is transitive by chaining the defining constants, f <= c1*g <= c1*c2*h. S3 is true: f = Omega(g) means f >= c*g eventually, which forces g = O(f) (namely g <= f/c), so f + g <= f + f/c = O(f), and trivially f + g >= f = Omega(f), giving Theta(f). S4 is FALSE: f(n) = O(n^2) only bounds f from above; f(n) could be a constant, or even f(n) = 0, neither of which is Omega(n). A concrete counterexample is f(n) = 1, which is O(n^2) but not Omega(n). So exactly S1, S2, S3 are true: 3 statements.'
},
{
  id: 'algo-asymptotic-x3',
  q: 'How do f(n) = n^(log n) and g(n) = 2^n compare asymptotically (log taken base 2 throughout)?',
  options: [
    'f(n) = O(g(n)) but f(n) is not Omega(g(n))',
    'f(n) = Omega(g(n)) but f(n) is not O(g(n))',
    'f(n) = Theta(g(n))',
    'Neither f(n) = O(g(n)) nor f(n) = Omega(g(n)) holds'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'Rewrite f(n) = n^(log n) using the identity n = 2^(log n): n^(log n) = (2^(log n))^(log n) = 2^((log n)^2). So comparing f(n) and g(n) reduces to comparing their exponents (log n)^2 and n. Since any polynomial power of n eventually dominates any polynomial power of log n, n grows faster than (log n)^2 for large enough n, meaning 2^n eventually exceeds 2^((log n)^2) by an ever-widening multiplicative gap. Hence f(n) = o(g(n)), which implies f(n) = O(g(n)) but rules out f(n) = Omega(g(n)) (and certainly Theta). Concretely at n = 1024, log n = 10, so f = n^10 while g = 2^1024, and g is already astronomically larger, confirming the asymptotic direction.'
},
{
  id: 'algo-asymptotic-x4',
  q: 'Which grows asymptotically faster: h(n) = (log n)^n or f(n) = n^(log n) (log base 2 throughout)?',
  options: [
    'h(n) grows faster, because n*log(log n) eventually dominates (log n)^2',
    'f(n) grows faster, because log n eventually dominates n',
    'They are Theta of each other',
    'Neither dominates; the ratio h(n)/f(n) oscillates forever without a limit'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'Compare by taking log base 2 of each function, since log is monotonic and preserves the comparison. log(h(n)) = n * log(log n). log(f(n)) = log n * log n = (log n)^2, using the same n^(log n) = 2^((log n)^2) identity as before. Now compare n*log(log n) against (log n)^2: substituting m = log n, this is 2^m * log(m) against m^2. Since 2^m is exponential in m while m^2 is only polynomial in m, 2^m*log(m) dominates m^2 for large m, i.e., n*log(log n) dominates (log n)^2 for large n. Therefore log(h(n)) eventually exceeds log(f(n)) by an unbounded margin, so h(n) = (log n)^n grows strictly faster than f(n) = n^(log n).'
},
{
  id: 'algo-asymptotic-x5',
  q: 'What is the exact value of count after executing: for (i = 1; i <= 6; i++) { for (j = 1; j <= floor(6/i); j++) { count++; } } starting from count = 0?',
  options: ['12', '14', '16', '18'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'The inner loop runs floor(6/i) times for each fixed i, so count = sum_{i=1}^{6} floor(6/i). Computing term by term: i=1 gives floor(6/1)=6; i=2 gives floor(6/2)=3; i=3 gives floor(6/3)=2; i=4 gives floor(6/4)=1; i=5 gives floor(6/5)=1; i=6 gives floor(6/6)=1. Summing: 6+3+2+1+1+1 = 14. In general, sum_{i=1}^{n} floor(n/i) is the classic divisor-counting sum that equals Theta(n log n) asymptotically (it is n times the nth harmonic number H_n, since H_n = Theta(log n)), but for this specific small n = 6 the exact hand-computed value is 14, matching option B and illustrating why the asymptotic Theta(n log n) shape should never be substituted for an exact numeric answer.'
},
{
  id: 'algo-asymptotic-x6',
  q: 'What is the exact value of count after executing: for (i = 1; i <= 8; i++) { for (j = 1; j <= i; j = j*2) { count++; } } starting from count = 0?',
  options: ['16', '21', '24', '28'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'For each outer i, the inner loop runs while j <= i, doubling j from 1 each time, so it executes floor(log2(i)) + 1 times. Computing per i from 1 to 8: i=1 -> j=1 only, 1 iteration; i=2 -> j=1,2, then 4>2 stops, 2 iterations; i=3 -> j=1,2, then 4>3 stops, 2 iterations; i=4 -> j=1,2,4, then 8>4 stops, 3 iterations; i=5 -> j=1,2,4, 3 iterations; i=6 -> j=1,2,4, 3 iterations; i=7 -> j=1,2,4, 3 iterations; i=8 -> j=1,2,4,8, then 16>8 stops, 4 iterations. Summing: 1+2+2+3+3+3+3+4 = 21. This matches the general Theta(n log n) bound for such dependent-log loops (sum of floor(log2 i)+1 over i=1..n), but the exact count for n=8 is 21, option B.'
},
{
  id: 'algo-asymptotic-x7',
  q: 'The recurrence T(n) = 2T(n/2) + n/log n (with a base case for small n) cannot be solved directly by the Master theorem because n/log n falls in the gap between Master theorem cases. Using a recursion tree, what is T(n)?',
  options: ['Theta(n)', 'Theta(n log log n)', 'Theta(n log n)', 'Theta(n (log n)^2)'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'The Master theorem needs f(n) to be polynomially smaller than, equal to (up to a log factor), or polynomially larger than n^(log_2 2) = n; here f(n) = n/log n is smaller than n but only by a log factor, not a polynomial factor, so no case applies directly. Build a recursion tree instead: at depth k there are 2^k subproblems each of size n/2^k, contributing total work 2^k * (n/2^k) / log(n/2^k) = n / (log n - k). Summing over k = 0 to log n - 1 gives n * sum_{k=0}^{log n - 1} 1/(log n - k) = n * sum_{m=1}^{log n} 1/m = n * H_(log n), where H denotes the harmonic number. Since H_(log n) = Theta(log(log n)), the total is T(n) = Theta(n log log n).'
},
{
  id: 'algo-asymptotic-x8',
  q: 'The recurrence T(n) = T(n-1) + n does not fit the Master theorem\'s divisive a*T(n/b)+f(n) form, so it must be solved by direct summation. Given T(0) = 5, what is the exact value of T(10)?',
  options: ['50', '55', '60', '65'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Unrolling the recurrence: T(n) = T(n-1) + n = T(n-2) + (n-1) + n = ... = T(0) + (1 + 2 + ... + n) = T(0) + n(n+1)/2. This telescoping is the correct method precisely because the recurrence is subtractive (n-1), not divisive, so the Master theorem simply does not apply here; the asymptotic answer is Theta(n^2), matching the well-known worst-case quicksort partitioning recurrence. Substituting n = 10 and T(0) = 5: T(10) = 5 + 10*11/2 = 5 + 55 = 60. Options A and D are plausible-looking arithmetic slips (forgetting to add the base case, or miscomputing the triangular number), while option C, 60, is the exact correct value obtained by careful direct summation rather than by misapplying any recurrence-solving shortcut.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-divide-conquer';}).questions.push(
{
  id: 'algo-divide-conquer-x1',
  q: 'Two sorted arrays of sizes m = 4 and n = 6 are merged using the standard two-pointer merge procedure (as in merge sort). What are the minimum and maximum possible numbers of comparisons performed?',
  options: ['Minimum 4, Maximum 9', 'Minimum 4, Maximum 10', 'Minimum 3, Maximum 9', 'Minimum 6, Maximum 10'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'In the standard merge, one comparison is made every time both pointers still have elements remaining, and the loop stops the instant one array is exhausted (the rest of the other array is appended with no further comparisons). The maximum number of comparisons is m+n-1: this occurs when the arrays interleave so that only after m+n-1 comparisons does one array run out (the very last remaining element never needs a comparison), giving 4+6-1 = 9. The minimum is m (the smaller size), achieved when every element of the smaller array is less than every element of the larger array: each of the 4 elements of the smaller array costs one comparison against the larger array\'s head, and once the smaller array is exhausted after 4 comparisons, the remaining 6 elements are copied with zero comparisons. So minimum 4, maximum 9.'
},
{
  id: 'algo-divide-conquer-x2',
  q: 'Quicksort is modified so that the pivot is always chosen as the exact median of the current subarray (found in linear time, e.g. via median-of-medians). What is the resulting worst-case time complexity, and why?',
  options: [
    'Theta(n log n), because every partition splits the subarray into two equal halves, giving T(n) = 2T(n/2) + Theta(n)',
    'Theta(n^2), because finding the median itself takes Theta(n^2) time in the worst case',
    'Theta(n log^2 n), because the median-finding step adds an extra log n factor at every level',
    'Theta(n), because no comparisons are needed once the median is known'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'If the pivot is guaranteed to be the exact median (achievable in worst-case linear time via median-of-medians selection), every partition splits the current subarray into two halves of size at most ceil(n/2) - 1 and floor(n/2), i.e., balanced within an additive constant. The partitioning step itself costs Theta(n), and the median-finding step also costs Theta(n) (median-of-medians is linear-time), so the total per-level work remains Theta(n). This gives the recurrence T(n) = 2T(n/2) + Theta(n), which by the Master theorem (Case 2, a=2,b=2, n^(log_2 2)=n matches f(n)=Theta(n)) solves to Theta(n log n) even in the WORST case, unlike standard quicksort whose worst case is Theta(n^2). This variant is mainly of theoretical interest since the median-of-medians constant factor makes it slower in practice than randomized quicksort\'s expected Theta(n log n).'
},
{
  id: 'algo-divide-conquer-x3',
  q: 'An algorithm computes a^n (integer exponentiation) using the recurrence: if n is even, compute a^(n/2) once and square it; if n is odd, compute a^(n-1) and multiply by a once more. What is T(n), the number of multiplications, in the worst case (e.g. n a power of 2 plus 1, forcing repeated odd steps)?',
  options: ['Theta(log n)', 'Theta(n)', 'Theta(sqrt(n))', 'Theta(n log n)'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Whenever n is odd, n-1 is necessarily EVEN (odd minus 1 is always even), so an odd step can never be immediately followed by another odd step -- every odd step is followed by at least one halving step. This means the sequence of n-values can contain at most one odd (decrement) step for every halving step, so at most 2*log2(n) steps are needed in total to reach the base case: T(n) = T(n-1) + O(1) on odd n, T(n) = T(n/2) + O(1) on even n, and unrolling shows the count of steps is bounded by roughly 2 log2(n). Concretely, for n = 2^k + 1 the trace is n -> n-1 = 2^k -> 2^(k-1) -> ... -> 1, taking k+1 = log2(n-1)+1 steps -- still Theta(log n), not Theta(n). So this recurrence, despite the odd branch only subtracting 1 instead of halving, still solves to Theta(log n): the decrement step can never repeat twice in a row, so it never accumulates into a linear number of steps. Option B (Theta(n)) would require many CONSECUTIVE decrement-by-1 steps, which is impossible here since decrementing an odd number always produces an even number, guaranteeing a halving step immediately after.'
},
{
  id: 'algo-divide-conquer-x4',
  q: 'The Karatsuba algorithm multiplies two n-digit numbers using 3 recursive multiplications of n/2-digit numbers plus Theta(n) additions/shifts, giving T(n) = 3T(n/2) + Theta(n) = Theta(n^1.585). A modified "Toom-3"-style scheme instead uses 5 recursive multiplications of n/3-digit numbers plus Theta(n) combining work. What is its time complexity?',
  options: ['Theta(n^(log_3 5)) which is approximately Theta(n^1.465)', 'Theta(n^1.585), same as Karatsuba', 'Theta(n log n)', 'Theta(n^2)'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'The recurrence is T(n) = 5T(n/3) + Theta(n). Applying the Master theorem with a=5, b=3: n^(log_3 5). Since log_3 5 = ln5/ln3 ≈ 1.6094/1.0986 ≈ 1.465, and f(n) = Theta(n) is polynomially smaller than n^1.465 (the gap 1.465 - 1 = 0.465 > 0 is a genuine polynomial separation), Master theorem Case 1 applies, giving T(n) = Theta(n^(log_3 5)) ≈ Theta(n^1.465). This is asymptotically FASTER than Karatsuba\'s Theta(n^1.585) = Theta(n^(log_2 3)), illustrating the general pattern in fast-multiplication research: using more, smaller-fraction recursive subproblems (5 calls at 1/3 size instead of 3 calls at 1/2 size) can reduce the exponent further, at the cost of a larger combining-work constant, which is exactly the real-world trade-off Toom-Cook-style algorithms exploit before eventually reaching Schonhage-Strassen/FFT-based methods.'
},
{
  id: 'algo-divide-conquer-x5',
  q: 'Merging two sorted arrays of sizes m = 3 and n = 3 (using the standard two-pointer merge). Given that the arrays interleave in strictly alternating fashion (values go small, large, small, large, small, large across the two arrays so that every comparison examines one element from each array until the very last), how many comparisons are performed?',
  options: ['3', '4', '5', '6'],
  answer: 2,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'With perfectly alternating interleaving, comparisons continue as long as BOTH arrays still have unconsumed elements. With m=n=3, there are 6 total elements; the merge consumes exactly one element per comparison for as long as both arrays remain non-empty. After 5 comparisons, 5 elements have been placed and each array can have at most 3 taken from it combined summing to 5, meaning one array is now exhausted (since 5 elements split between two arrays of capacity 3 each forces at least one to reach 3). At that point the loop stops comparing and copies the final remaining element directly. This matches the general maximum-comparisons formula m+n-1 = 3+3-1 = 5, achieved precisely under alternating interleaving, confirming option C.'
},
{
  id: 'algo-divide-conquer-x6',
  q: 'The "tromino tiling" recurrence for tiling a 2^n x 2^n deficient board (one square missing) with L-trominoes divides the board into four 2^(n-1) x 2^(n-1) quadrants, places one tromino at the center to convert three of the quadrants into deficient boards matching the original missing quadrant, and recurses on all four quadrants. What is the recurrence and its solution?',
  options: [
    'T(n) = 4T(n-1) + Theta(1), solving to Theta(4^n)',
    'T(n) = 4T(n/2) + Theta(1), solving to Theta(n^2)',
    'T(n) = T(n-1) + Theta(1), solving to Theta(n)',
    'T(n) = 4T(n-1) + Theta(n), solving to Theta(4^n * n)'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Here n indexes the board size 2^n x 2^n, and each recursive call handles a quadrant of side 2^(n-1), i.e. one level "smaller" in this n-indexing (note this is a SUBTRACTIVE recurrence in n, T(n-1), not T(n/2), even though the physical board side length halves each time, because n itself represents the exponent/depth). Placing the central tromino is Theta(1) work, and there are 4 recursive calls, giving T(n) = 4T(n-1) + Theta(1). Unrolling: T(n) = 4T(n-1) + c = 4(4T(n-2)+c) + c = 4^2 T(n-2) + 4c + c = ... = 4^n T(0) + c(4^n - 1)/3 = Theta(4^n). Since the board has (2^n)^2 = 4^n unit squares, Theta(4^n) trominoes is exactly the expected Theta(number of squares) result, confirming the recurrence solves correctly to Theta(4^n), matching option A.'
},
{
  id: 'algo-divide-conquer-x7',
  q: 'Strassen\'s algorithm multiplies two n x n matrices using 7 recursive multiplications of n/2 x n/2 submatrices plus Theta(n^2) additions, giving T(n) = 7T(n/2) + Theta(n^2). If someone instead found a scheme using 6 recursive multiplications of n/2 x n/2 submatrices plus Theta(n^2) combining work, what would the resulting complexity be, and would it beat Strassen?',
  options: [
    'Theta(n^(log_2 6)) approximately Theta(n^2.585), which is FASTER than Strassen\'s Theta(n^2.807)',
    'Theta(n^(log_2 6)) approximately Theta(n^2.585), which is SLOWER than Strassen\'s Theta(n^2.807)',
    'Theta(n^3), no better than the naive algorithm',
    'Theta(n^2), matching the combining work exactly'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'With a = 6 recursive calls and b = 2, the Master theorem compares f(n) = Theta(n^2) against n^(log_2 6). Since log_2 6 = ln6/ln2 ≈ 1.7918/0.6931 ≈ 2.585, and f(n) = n^2 is polynomially smaller than n^2.585 (gap of about 0.585 > 0), Case 1 applies, giving T(n) = Theta(n^2.585). Comparing exponents directly, 2.585 < 2.807 = log_2 7 (Strassen\'s exponent), so a hypothetical 6-multiplication scheme would indeed be asymptotically FASTER than Strassen\'s, which is precisely why matrix-multiplication research has continued searching for algorithms using fewer than 7 recursive multiplications per halving (real advances, like the Coppersmith-Winograd family, push the exponent even lower than 2.585 using more elaborate non-recursive-halving techniques, but the same fewer-multiplications-is-better principle under the Master theorem applies).'
},
{
  id: 'algo-divide-conquer-x8',
  q: 'The "closest pair of points" divide-and-conquer algorithm splits n points by a vertical line into two halves of n/2 points, recursively finds the closest pair in each half, and then checks a "strip" of points within distance d of the dividing line to catch cross-boundary pairs. The strip-checking step is often mistakenly analyzed as taking Theta(n^2) time per level (checking every pair in the strip), but a bounded-neighbor argument shows it is actually Theta(n) per level. What is the key geometric fact that bounds the strip work to Theta(n)?',
  options: [
    'For any point in the strip, only a constant number of other strip points (at most 7, when points are pre-sorted by y-coordinate) can be within distance d of it, because more points than that could not all be pairwise at least d apart within a d x 2d rectangle',
    'The strip always contains at most O(log n) points, so any pairwise check is automatically cheap',
    'Points in the strip are always already sorted by x-coordinate, making distance checks unnecessary',
    'The strip-checking step is skipped entirely once the two halves are individually solved, since cross-boundary pairs cannot be closest by the triangle inequality'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'After recursively solving both halves, d is the smaller of the two halves\' closest-pair distances, so ANY pair within the same half is already known to be at least d apart, meaning within the strip, any two points that are candidates for beating d must be within a d x 2d rectangle of each other (d horizontally since they are in the strip, at most 2d vertically to possibly be closer than d apart accounting for both halves). Because all points on the same side of the dividing line are at least d apart from each other (by the half-recursion invariant), at most a small constant number of such points (a standard packing argument bounds it to at most 7 or 8) can fit inside that d x 2d rectangle without violating the d-apart-within-a-half constraint. So checking each strip point against only its next few neighbors in sorted-by-y order suffices, an O(1) amount of work per point, giving Theta(n) total for the strip step and preserving the overall Theta(n log n) recurrence T(n) = 2T(n/2) + Theta(n).'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-greedy';}).questions.push(
{
  id: 'algo-greedy-x1',
  q: 'Four sorted files of lengths 20, 30, 10, 5 (records) are to be merged pairwise into one file using the optimal merge pattern (always merge the two currently-smallest files; each merge of sizes a and b costs a+b comparisons/moves). What is the minimum total cost?',
  options: ['105', '110', '115', '120'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Sort the lengths: 5, 10, 20, 30. Greedily merge the two smallest each time (this is exactly a Huffman-style merge, provably optimal by an exchange argument identical to Huffman coding\'s). Step 1: merge 5 and 10 -> cost 15, producing a file of size 15; remaining files: 15, 20, 30. Step 2: merge the two smallest of {15, 20, 30}, i.e. 15 and 20 -> cost 35, producing size 35; remaining files: 35, 30. Step 3: merge 30 and 35 -> cost 65. Total cost = 15 + 35 + 65 = 115. A quick cross-check uses the weighted-path-length formula: each file contributes length times the number of merges it participates in (its depth in the merge tree) — 5 and 10 each participate in 3 merges, 20 participates in 2, and 30 participates in 1, giving 5*3 + 10*3 + 20*2 + 30*1 = 15+30+40+30 = 115, confirming option C.'
},
{
  id: 'algo-greedy-x2',
  q: 'A Huffman tree is built for symbols with frequencies A:2, B:3, C:4, D:5. After building the optimal Huffman tree (always merging the two smallest current weights), what is the total weighted path length (sum of frequency times code-length over all symbols)?',
  options: ['26', '28', '30', '32'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Sort frequencies: A:2, B:3, C:4, D:5. Merge the two smallest, A(2) and B(3), into a node AB of weight 5; remaining nodes: {C:4, AB:5, D:5}. Merge the two smallest among these, C:4 and AB:5, into a node CAB of weight 9; remaining: {CAB:9, D:5}. Merge CAB:9 and D:5 into the root of weight 14. Reading depths from the merge tree: A and B were merged first and then merged again twice more before reaching the root, so both sit at depth 3; C was merged once after AB, so it sits at depth 2; D was merged directly with the near-final node into the root, so it sits at depth 1. Weighted path length = A(2)*3 + B(3)*3 + C(4)*2 + D(5)*1 = 6 + 9 + 8 + 5 = 28. This matches the standard shortcut of summing all internal (merged) node weights: 5 (AB) + 9 (CAB) + 14 (root) = 28, confirming option B.'
},
{
  id: 'algo-greedy-x3',
  q: 'Activities with (start, finish) times: A(1,4), B(3,5), C(0,6), D(5,7), E(3,9), F(5,9), G(6,10), H(8,11), I(8,12), J(2,14), K(12,16). Using the standard greedy activity-selection algorithm (sort by finish time, pick each activity whose start is not before the last picked activity\'s finish), how many activities are selected?',
  options: ['3', '4', '5', '6'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Sort by finish time: A(1,4), B(3,5), C(0,6), D(5,7), E(3,9), F(5,9), G(6,10), H(8,11), I(8,12), J(2,14), K(12,16). Greedily scan: pick A(1,4) first (earliest finish overall). Next, skip B(3,5) since 3 < 4 (start before A finishes); skip C(0,6) similarly (0<4). Pick D(5,7) since 5 >= 4. Next skip E(3,9) and F(5,9) since both start before 7 (3<7, 5<7). Pick G(6,10)? 6 < 7, so G is skipped too, not picked. Continue: H(8,11) has start 8 >= 7, pick H. Next I(8,12) starts at 8 < 11 (H\'s finish), skip. J(2,14) starts at 2 < 11, skip. K(12,16) starts at 12 >= 11, pick K. Total picked: A, D, H, K = 4 activities, matching this classic textbook (CLRS) example whose known optimal answer is indeed 4.'
},
{
  id: 'algo-greedy-x4',
  q: 'A greedy variant for activity selection sorts activities by DURATION (finish - start) ascending instead of by finish time, and picks each activity (shortest first) that does not conflict with any already-picked activity. Consider activities A(1,2) [duration 1], B(0,10) [duration 10], C(3,4) [duration 1], D(2,3) [duration 1]. What does this duration-greedy select, and does it match the true optimum?',
  options: [
    'Duration-greedy picks A, D, C (3 activities), matching the true optimum of 3',
    'Duration-greedy picks only B (1 activity), while the true optimum is 3 (A, D, C), so duration-greedy is suboptimal here',
    'Duration-greedy picks A, B (2 activities), matching the true optimum of 2',
    'Duration-greedy and finish-time-greedy always agree, both giving 3 here'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Sorting by duration ascending: A(1,2) dur 1, C(3,4) dur 1, D(2,3) dur 1 (all tied at duration 1), then B(0,10) dur 10. Processing shortest-first (with ties broken arbitrarily, say by start time: A, D, C): pick A(1,2). Next D(2,3): start 2 >= A\'s finish 2, no conflict, pick D. Next C(3,4): start 3 >= D\'s finish 3, no conflict, pick C. B(0,10) conflicts with all three already picked (0 < 4), so B is rejected. Result: {A, D, C}, 3 activities, which happens to match the true optimum here (the standard finish-time-greedy would also select A, D, C by an identical construction since ties happen to align nicely in this instance). This example is chosen so duration-sorting greedy accidentally succeeds; it is well known that duration-sorting greedy can fail on other instances (e.g. many short activities clustered against one that would otherwise unblock a longer chain), which is precisely why finish-time-greedy, not duration-greedy, is the ONLY provably correct rule.'
},
{
  id: 'algo-greedy-x5',
  q: 'A denomination coin system has coins of value {1, 3, 4}. To make change for the amount 6, the greedy algorithm (always pick the largest coin value not exceeding the remaining amount) is used. What does greedy produce, and is it optimal?',
  options: [
    'Greedy gives 4+1+1 (3 coins); the true optimum is 3+3 (2 coins), so greedy is suboptimal',
    'Greedy gives 4+1+1 (3 coins), which is also optimal since no 2-coin combination sums to 6',
    'Greedy gives 3+3 (2 coins), which matches the optimum',
    'Greedy gives 4+3 which sums to 7, an invalid overshoot, so greedy fails to terminate correctly'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Greedy picks the largest coin <= remaining amount each time: for amount 6, pick 4 (largest <= 6), leaving 2; then pick 1 (largest <= 2 among {1,3,4} is 1, since 3 and 4 exceed 2), leaving 1; then pick 1 again, leaving 0. Total: 4+1+1 = 3 coins. But 3+3 = 6 uses only 2 coins and is a valid combination since 3 is a valid denomination, so the true optimum is 2 coins, strictly better than greedy\'s 3. This is the standard textbook counterexample showing the greedy coin-change algorithm is NOT optimal for arbitrary denomination sets (it IS optimal for "canonical" systems like standard currency {1,5,10,25,...}, but {1,3,4} is a classic non-canonical system engineered to break greedy), requiring dynamic programming for a guaranteed-optimal solution instead.'
},
{
  id: 'algo-greedy-x6',
  q: 'For the coin system {1, 5, 6, 8}, making change for amount 10 using the greedy algorithm (always pick the largest coin not exceeding the remainder), what result does greedy produce, and is it optimal?',
  options: [
    'Greedy gives 8+1+1 (3 coins); the optimum is 5+5 (2 coins), so greedy fails here too',
    'Greedy gives 8+1+1 (3 coins), which is optimal since 5+5 is not achievable with these denominations',
    'Greedy gives 6+ 1+1+1+1 (5 coins), clearly worse than any alternative',
    'Greedy correctly gives 5+5 (2 coins), matching the optimum'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Greedy for amount 10 with denominations {1,5,6,8}: pick 8 (largest <= 10), remainder 2; pick 1 (largest <= 2), remainder 1; pick 1 again, remainder 0. Total: 8+1+1 = 3 coins. But 5+5 = 10 is a valid combination using only 2 coins (5 is a valid denomination and can be used twice), which is strictly better than greedy\'s 3-coin solution. This is a second, independent counterexample (distinct from the {1,3,4} case) demonstrating that greedy coin selection fails whenever the denomination set is not "canonical" — the failure mode here specifically arises because after taking the single largest coin (8), the remainder (2) cannot be paid efficiently, whereas avoiding the largest coin entirely and using two mid-sized coins (5+5) pays the whole amount more efficiently, something a purely local largest-coin-first greedy rule can never discover since it never reconsiders an earlier choice.'
},
{
  id: 'algo-greedy-x7',
  q: 'Consider the fractional knapsack problem with capacity W = 15 and items (weight, value): P(6,30) ratio 5, Q(5,25) ratio 5, R(4,16) ratio 4, S(3,9) ratio 3. Using the greedy value-to-weight-ratio rule (take highest ratio first, taking a fraction of an item if it does not fully fit), what is the maximum achievable value?',
  options: ['66', '70', '71', '75'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Sort by ratio descending: P and Q are tied at ratio 5, then R at ratio 4, then S at ratio 3. Take P fully: weight used 6, value 30, remaining capacity 15-6=9. Take Q fully: weight used 5 (running total 11), value +25=55, remaining capacity 9-5=4. Take R next: R\'s weight is exactly 4, which exactly matches the remaining capacity of 4, so R is taken fully with no fraction needed (running total weight 15, exactly filling the knapsack), value +16=71. Since the capacity is now exactly exhausted, S is left untaken. Total value = 30+25+16 = 71, confirming option C. Note that this instance was constructed so R fits exactly, avoiding the more typical fractional-item case, but the greedy ratio-ordering procedure is identical either way.'
},
{
  id: 'algo-greedy-x8',
  q: 'In Kruskal\'s algorithm applied to a graph where two different edges e1 and e2 have the EXACT SAME weight, and both are candidates that would each individually complete the spanning tree without forming a cycle at the point they are considered, does the choice between e1 and e2 affect the total MST weight?',
  options: [
    'No, both choices lead to a valid MST with the identical total weight, though the specific set of edges in the tree may differ',
    'Yes, the total weight can differ because Kruskal must always break ties by choosing the lexicographically smaller edge',
    'No valid MST exists when two edges tie in weight; the algorithm must abort',
    'Yes, choosing the "wrong" tied edge can create a cycle even though both were verified individually as cycle-free at that point'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'When multiple edges share the same weight and each is independently a valid (cycle-free) addition at the point Kruskal\'s algorithm considers it, the cut property guarantees that including EITHER one still yields a minimum spanning tree, because both are minimum-weight crossing edges for the cut separating their two endpoint components at that moment — the cut property only requires the edge to be A minimum-weight crossing edge, and ties mean multiple edges qualify simultaneously. This is exactly why MSTs are not unique in the presence of weight ties: the specific tree structure (which edges appear) can vary across valid tie-breaking choices, but the SUM of all edge weights in the resulting spanning tree is provably invariant across all such choices, since every valid MST has the same total weight by definition of "minimum." Option B is wrong because no fixed tie-breaking rule is REQUIRED for correctness (any consistent rule works), and option D is wrong because a genuinely cycle-free edge at the time it is checked can never later retroactively create a cycle.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-dp';}).questions.push(
{
  id: 'algo-dp-x1',
  q: 'For the sequence [3, 10, 2, 1, 20], what is the length of the Longest Increasing Subsequence (LIS)?',
  options: ['2', '3', '4', '5'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Using the standard LIS DP where dp[i] = length of the longest increasing subsequence ending exactly at index i: dp[0]=1 (just [3]); dp[1]=2 (since 10>3, extend [3] to [3,10]); dp[2]=1 (2 is not greater than 3 or 10, so it starts fresh as [2]); dp[3]=1 (1 is smaller than everything before it, starts fresh as [1]); dp[4]=3 (20 is greater than 3, 10, 2, and 1, so it extends the best prior subsequence, dp[1]=2, giving [3,10,20] of length 3). The maximum over all dp[i] is max(1,2,1,1,3) = 3, achieved by the subsequence [3, 10, 20]. Note [2,20] or [1,20] give only length 2, so the true LIS length is 3, not the tempting-looking 4 or 5.'
},
{
  id: 'algo-dp-x2',
  q: 'How many ways are there to make change for the amount 5 using coins {1, 2, 5}, where the order of coins does NOT matter (this is a combination-counting DP, dp[amt] built by iterating coins in the OUTER loop)?',
  options: ['3', '4', '6', '9'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Enumerate all unordered multisets of {1,2,5} summing to 5: {5}, {2,2,1}, {2,1,1,1}, {1,1,1,1,1}. That is exactly 4 distinct combinations. This matches the "combination counting" DP where the coin denomination is the OUTER loop and the amount is the INNER loop, ensuring each multiset of coins is counted exactly once regardless of the order coins are added, since a coin already processed in an earlier outer iteration is never revisited as a "new first coin" in a different order. Contrast this with the PERMUTATION-counting variant (amount in the outer loop, coins in the inner loop), which would count {2,2,1}, {2,1,2}, and {1,2,2} as three separate sequences, inflating the count well above 4 — always identify whether a GATE question asks for combinations (order irrelevant) or permutations (order relevant, e.g. counting sequences of dice-roll-like steps) before choosing the loop order.'
},
{
  id: 'algo-dp-x3',
  q: 'How many ORDERED sequences (permutations, where order matters, e.g. counting distinct sequences of moves) are there to make a sum of exactly 4 using steps of size {1, 2}?',
  options: ['3', '5', '6', '8'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'This is the permutation-counting variant: dp[s] = number of ordered sequences of steps from {1,2} summing to s, with dp[s] = dp[s-1] + dp[s-2] (amount in the outer loop, both step sizes tried at each amount), dp[0]=1, dp[negative]=0. Compute: dp[1] = dp[0] + dp[-1] = 1+0 = 1. dp[2] = dp[1]+dp[0] = 1+1 = 2. dp[3] = dp[2]+dp[1] = 2+1 = 3. dp[4] = dp[3]+dp[2] = 3+2 = 5. Enumerating directly confirms: [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2] — exactly 5 ordered sequences. This is structurally the Fibonacci recurrence, illustrating that permutation-counting coin/step problems with a fixed small step set often reduce to a Fibonacci-like recurrence, unlike the combination-counting variant which would treat [1,1,2], [1,2,1], and [2,1,1] as the SAME combination {1,1,2} and count it only once.'
},
{
  id: 'algo-dp-x4',
  q: 'A robot starts at the top-left cell of a 3x3 grid and can move only RIGHT or DOWN, ending at the bottom-right cell. Cell (2,1) (row 2, column 1, 0-indexed) is BLOCKED and cannot be entered. How many distinct paths are there from (0,0) to (2,2)?',
  options: ['2', '3', '4', '6'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Use dp[i][j] = number of paths to reach (i,j), with dp[i][j] = dp[i-1][j] + dp[i][j-1] (from above or from the left), dp[0][0] = 1, and dp[i][j] = 0 for any blocked cell or out-of-bounds cell. Row 0: dp[0][0]=1, dp[0][1]=1, dp[0][2]=1 (only one way along the top row). Row 1: dp[1][0]=dp[0][0]=1, dp[1][1]=dp[0][1]+dp[1][0]=1+1=2, dp[1][2]=dp[0][2]+dp[1][1]=1+2=3. Row 2: dp[2][0]=dp[1][0]=1 (not blocked, reached only from above), dp[2][1]=0 (BLOCKED, forced to 0 regardless of incoming paths), dp[2][2]=dp[1][2]+dp[2][1]=3+0=3. The blocked cell at (2,1) removes all paths that would have passed through it, leaving exactly 3 valid paths, all of which pass through (1,2) then step down to (2,2).'
},
{
  id: 'algo-dp-x5',
  q: 'For the Traveling Salesman Problem solved via bitmask DP with state dp[mask][j] = minimum cost to visit exactly the set of cities in "mask", ending at city j, what is the time complexity for n cities, and why?',
  options: [
    'Theta(n^2 * 2^n), because there are 2^n masks times n possible ending cities, and each state transition considers up to n previous cities',
    'Theta(n * 2^n), because there are 2^n masks times n ending cities, with O(1) transition work each',
    'Theta(2^n), independent of n since the mask alone determines the state',
    'Theta(n!), because bitmask DP still enumerates all permutations of cities explicitly'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'The state space has 2^n possible masks (subsets of the n cities) times n possible "currently at city j" values, giving Theta(n * 2^n) distinct states. For each state dp[mask][j], the transition considers every possible PREVIOUS city k that could have been visited just before j (i.e., k is in mask, k != j, and dp[mask without j][k] + cost(k,j) is a candidate), which requires trying up to n choices of k. So the total work is (number of states) * (transition cost per state) = Theta(n * 2^n) * Theta(n) = Theta(n^2 * 2^n). This is a dramatic improvement over the naive Theta(n!) brute-force enumeration of all Hamiltonian cycles, though it remains exponential in n (as expected, since TSP is NP-hard), and the Theta(n^2 * 2^n) bound is the standard, well-known Held-Karp complexity result.'
},
{
  id: 'algo-dp-x6',
  q: 'A top-down memoized recursive solution and a bottom-up tabulated (iterative) solution both solve the same DP problem with a two-dimensional state space of size n x m. Which of the following statements about their time and space complexity is CORRECT?',
  options: [
    'Both have identical Theta(nm) time complexity in the worst case (every state computed once), but memoization can sometimes use less time in practice if not all states are reachable from the initial call, while tabulation always computes every state',
    'Tabulation is always asymptotically faster than memoization because it avoids recursive function-call overhead entirely',
    'Memoization always uses less memory than tabulation because it never allocates a full table',
    'Memoization cannot be used for problems with more than one state variable, only tabulation can'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Both approaches, in the worst case, compute and store a result for every one of the Theta(nm) reachable states exactly once (memoization\'s cache check ensures no state is recomputed, matching tabulation\'s guarantee that every table cell is filled once), so their asymptotic TIME complexity is identical, Theta(nm) (each with Theta(1) or Theta(k) work per state depending on the transition, applied identically to both approaches). The one genuine advantage memoization can have is when the recursive call structure never actually reaches some subset of the n x m state space for a particular input (e.g. certain states are unreachable given the specific starting parameters), in which case memoization only computes the states actually needed, potentially doing less work than tabulation, which typically fills the entire table regardless of reachability. Memoization does carry extra constant-factor overhead from recursive calls and hashing/lookup, and both typically need Theta(nm) space for the table/cache (independent of this reachability nuance), so options B, C, and D are each incorrect generalizations.'
},
{
  id: 'algo-dp-x7',
  q: 'The 0/1 knapsack DP with capacity W and n items normally uses a 2D table of size (n+1) x (W+1). If the recurrence dp[i][w] depends only on row i-1 (never on row i or earlier rows), what is the minimum space (in terms of number of DP cells stored, ignoring the input arrays) needed to compute just the final answer dp[n][W], and what critical implementation detail must be preserved?',
  options: [
    'Theta(W) cells suffice using a single 1D array, PROVIDED the inner loop over w iterates in DECREASING order so that dp[w - weight[i]] still refers to the previous row\'s value, not an already-updated current-row value',
    'Theta(W) cells suffice using a single 1D array, and the iteration direction (increasing or decreasing w) does not matter for correctness',
    'Theta(n) cells suffice by keeping only one column at a time, iterating w in the outer loop',
    'The full Theta(nW) table is unavoidable because 0/1 knapsack cannot be space-optimized, unlike unbounded knapsack'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'Since dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]) only ever reads from row i-1, a single 1D array of size W+1 can represent "the previous row," updated in place to become "the current row." The critical subtlety is iteration DIRECTION: if w is iterated in INCREASING order, then by the time dp[w - weight[i]] is read, it may have ALREADY been overwritten with the CURRENT row i\'s value (since w - weight[i] < w was processed earlier in this same pass), which would incorrectly allow item i to be used more than once, silently turning the computation into UNBOUNDED knapsack. Iterating w in DECREASING order guarantees that dp[w - weight[i]] (a smaller index, processed LATER in a decreasing pass) still holds row i-1\'s value when read, preserving the correct 0/1 (single-use) semantics. This decreasing-order requirement is one of the most frequently tested GATE code-tracing traps in space-optimized DP.'
},
{
  id: 'algo-dp-x8',
  q: 'For the Longest Common Subsequence of X = "AGCAT" and Y = "GAC", what is the length of the LCS, and which of the following is a valid LCS string?',
  options: [
    'Length 2, and a valid LCS is "GA" (G at X-index 2 followed by A at X-index 4, matching G then A of Y in order)',
    'Length 3, and a valid LCS is "GAC", appearing as a subsequence of both strings in order',
    'Length 2, and a valid LCS is "CT" (matching a common tail of both strings)',
    'Length 1, since the strings share only isolated single-character matches'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Write X = A(1) G(2) C(3) A(4) T(5) and Y = G(1) A(2) C(3), with positions shown in parentheses. First check whether "GAC" (length 3) is genuinely a subsequence of X: this needs increasing indices i<j<k in X with X[i]=G, X[j]=A, X[k]=C. The only G in X is at index 2, so i=2. The only A in X after index 2 is at index 4, so j=4. Now C must appear in X at some index k>4, but the only C in X is at index 3, which is before 4, not after, so no valid k exists, meaning "GAC" is NOT actually a subsequence of X, ruling out option B. Filling the standard LCS DP table dp[i][j] for X versus Y row by row confirms dp[5][3] = 2, with "GA" (X indices 2 and 4, matching Y indices 1 and 2) as one valid witness; "CT" is not even a subsequence of Y, since Y has no T at all, ruling out option C. So the verified correct LCS length is 2, achieved by "GA" (option A).'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-graph';}).questions.push(
{
  id: 'algo-graph-x1',
  q: 'A graph has 4 vertices {A,B,C,D} and edges: A-B (weight 1), B-C (weight 1), C-D (weight 1), A-D (weight 1), A-C (weight 2). How many DISTINCT minimum spanning trees does this graph have?',
  options: ['1', '2', '4', '6'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'The four weight-1 edges (A-B, B-C, C-D, A-D) form a 4-cycle; the weight-2 edge A-C is strictly heavier and can never appear in any MST here since a lighter alternative always exists to connect any cut it crosses. An MST needs exactly 3 edges (n-1 for n=4) with minimum total weight; since all four weight-1 edges are equal and any 3 of them already connect all 4 vertices without forming a cycle (removing exactly one edge from the 4-cycle A-B-C-D-A always leaves a spanning tree), every one of the C(4,3)=4 ways to choose 3 out of the 4 weight-1 edges yields a valid spanning tree of total weight 3, the minimum possible. So there are exactly 4 distinct MSTs, each obtained by excluding a different one of the four unit-weight cycle edges, confirming option C.'
},
{
  id: 'algo-graph-x2',
  q: 'A directed graph has edges: S->C (weight 1), S->A (weight 2), A->B (weight 1), B->C (weight -5). Running standard Dijkstra\'s algorithm from source S (always extracting and finalizing the unfinalized vertex with smallest tentative distance, and never revisiting a finalized vertex), what distance does Dijkstra report for vertex C, and is it correct?',
  options: [
    'Dijkstra reports 1 for C (finalizing C via the direct edge before the longer path through A and B is ever explored), which is WRONG since the true shortest distance is 2+1+(-5) = -2 via S->A->B->C',
    'Dijkstra reports -2 for C, which is correct',
    'Dijkstra reports 2 for C, which is correct',
    'Dijkstra reports 1 for C, which is correct since the direct edge is always shortest by definition'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Dijkstra initializes dist(S)=0 and relaxes S\'s edges, setting dist(C)=1 and dist(A)=2. Among all unfinalized vertices the smallest tentative distance is C at 1, so C is extracted and FINALIZED first, before A or B are even touched. Processing continues: extract A (distance 2), relax A->B giving dist(B)=3; extract B (distance 3), relax B->C giving a candidate distance of 3+(-5) = -2 for C — but C was already finalized in an earlier step, and standard Dijkstra never revisits or updates a finalized vertex, so this strictly better candidate is silently discarded. Dijkstra therefore reports dist(C)=1, the value from its very first (direct) edge. The true shortest path is S->A->B->C with total weight 2+1+(-5) = -2, far smaller than 1. This is the canonical failure pattern: a vertex reachable cheaply via a direct edge gets finalized too early, before a longer path carrying a large negative edge has a chance to be discovered, and Dijkstra\'s non-revisiting invariant then permanently locks in the wrong answer.'
},
{
  id: 'algo-graph-x3',
  q: 'For an undirected, connected graph with n vertices, which of the following statements about BFS trees and DFS trees (both rooted at the same source vertex) is always TRUE?',
  options: [
    'The height of the BFS tree is always less than or equal to the height of the DFS tree rooted at the same vertex',
    'The height of the DFS tree is always less than or equal to the height of the BFS tree rooted at the same vertex',
    'BFS and DFS trees always have exactly the same height',
    'The BFS tree always has more edges than the DFS tree'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'BFS explores vertices in strictly non-decreasing order of their true shortest-path distance (in edges) from the source, so the BFS tree height equals the graph\'s eccentricity from that source, i.e., the length of the longest SHORTEST path from the root — this is provably the SMALLEST possible height any spanning tree rooted at that vertex can have, since no spanning tree can place a vertex closer to the root than its true graph distance. DFS, by contrast, can plunge deep along a single path before backtracking, potentially reaching a height equal to n-1 (visiting all vertices in one long chain) even when the graph\'s actual diameter/eccentricity is much smaller, e.g. a star graph has BFS height 1 from the center but a DFS tree from a leaf can have height n-1. Since BFS height is the true graph-distance-based minimum and DFS height can only be equal or larger (never smaller, since no spanning tree can beat the true shortest-path bound), option A is always true; both trees have exactly n-1 edges regardless (ruling out D), and BFS/DFS heights are equal only in specific graphs like simple paths, not always (ruling out C).'
},
{
  id: 'algo-graph-x4',
  q: 'In the undirected graph with vertices {A,B,C,D,E} and edges A-B, B-C, C-D, D-E, B-D (forming a path A-B-C-D-E plus one extra edge B-D creating a cycle B-C-D-B), how many articulation points does this graph have?',
  options: ['0', '1', '2', '3'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'An articulation point is a vertex whose removal increases the number of connected components. A degree-1 vertex (a leaf, like A or E here) can never be an articulation point, since removing it only deletes a single pendant edge and cannot disconnect anything else, so A and E are immediately ruled out. Removing B leaves the remaining edges C-D and D-E, and since A\'s only connection was the now-gone edge A-B, vertex A becomes isolated — so B is an articulation point. Removing C leaves edges A-B, B-D, D-E, which still connect all remaining vertices (B and D are directly linked by the B-D edge, bypassing C entirely), so C is NOT an articulation point. Removing D leaves edges A-B, B-C, and since E\'s only connection was the now-gone edge D-E, vertex E becomes isolated — so D is an articulation point. In total, exactly B and D are articulation points, giving a count of 2.'
},
{
  id: 'algo-graph-x5',
  q: 'A DAG has vertices {1,2,3,4} and edges 1->2, 1->3, 2->4, 3->4. By direct enumeration, how many distinct valid topological orderings does this DAG have?',
  options: ['1', '2', '3', '4'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Vertex 1 has in-degree 0 and must come first in any valid ordering (both 2 and 3 depend on it, and nothing points to 1). Vertex 4 has in-degree 2 (from both 2 and 3) and must come last (nothing depends on 4, and it depends on both others). Vertices 2 and 3 have no edge between them directly (2 does not point to 3 or vice versa), so they are mutually unconstrained and can appear in either relative order, as long as both come after 1 and before 4. This gives exactly two valid orderings: [1,2,3,4] and [1,3,2,4]. Enumerating directly confirms both satisfy every edge constraint (1 before 2, 1 before 3, 2 before 4, 3 before 4) and no other ordering of {1,2,3,4} can satisfy all constraints (e.g. any ordering placing 4 before 2 or 3 immediately violates an edge). So the total count is 2, matching option B.'
},
{
  id: 'algo-graph-x6',
  q: 'A DAG has vertices {1,2,3,4,5} and edges 1->2, 1->3, 2->4, 3->4, 4->5. How many distinct valid topological orderings does this DAG have?',
  options: ['1', '2', '3', '4'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Vertex 1 (in-degree 0) must be first, since both 2 and 3 depend on it. Vertex 4 depends on both 2 and 3 (in-degree 2) and must come after both. Vertex 5 depends only on 4 (in-degree 1) and must come last, after 4. Vertices 2 and 3 are mutually unconstrained (no edge between them), so they can appear in either relative order as long as both fall between 1 and 4. This gives exactly two valid full orderings: [1,2,3,4,5] and [1,3,2,4,5]. Any other arrangement violates some edge constraint: for instance placing 4 before 2 or 3 violates 2->4 or 3->4, and placing 5 anywhere except last violates 4->5. Direct enumeration confirms only these 2 orderings are valid, matching option B, and illustrating that adding a "funnel" vertex (4) followed by a single chained successor (5) does not change the count of ways to order the parallel branch (2 and 3) — it only appends a fixed suffix.'
},
{
  id: 'algo-graph-x7',
  q: 'Consider running Kahn\'s algorithm (BFS-based topological sort using in-degrees) on a directed graph with vertices {1,2,3} and edges 1->2, 2->3, 3->1 (forming a directed cycle). What happens?',
  options: [
    'The algorithm outputs the valid order [1,2,3] since it follows the edges directly',
    'The initial queue of zero-in-degree vertices is empty (every vertex has in-degree 1 due to the cycle), so the algorithm immediately terminates having output 0 vertices, correctly signaling that no topological order exists',
    'The algorithm enters an infinite loop, never terminating',
    'The algorithm outputs a partial order [1,2] and stops, incorrectly claiming success'
  ],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'Compute in-degrees: vertex 1 receives an edge from 3 (in-degree 1), vertex 2 receives an edge from 1 (in-degree 1), vertex 3 receives an edge from 2 (in-degree 1). Every vertex has in-degree exactly 1, so the initial queue (populated with all zero-in-degree vertices) is empty from the very start. Kahn\'s algorithm then immediately exits its main loop (nothing to dequeue), having output zero vertices total. Since the algorithm\'s well-known cycle-detection guarantee is "output count less than V implies a cycle exists," outputting 0 vertices (which is less than V=3) correctly and immediately signals that this graph contains a cycle and has no valid topological order — the algorithm terminates cleanly rather than looping infinitely or producing an incorrect partial answer, which is precisely why Kahn\'s algorithm is a standard, well-behaved way to combine topological sorting with cycle detection in one pass.'
},
{
  id: 'algo-graph-x8',
  q: 'A weighted undirected graph has vertices {A,B,C} and edges A-B (weight 5), B-C (weight 5), A-C (weight 5), i.e., a triangle with all edges of EQUAL weight 5. How many distinct minimum spanning trees does this graph have, and what is the MST weight?',
  options: [
    '1 distinct MST, weight 10',
    '3 distinct MSTs, weight 10 each',
    '3 distinct MSTs, weight 15 each',
    '1 distinct MST, weight 15'
  ],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'A spanning tree on 3 vertices needs exactly 2 edges (n-1 = 3-1 = 2). Since all three edges have the identical weight 5, any 2 of the 3 edges form a valid spanning tree (the triangle has no smaller subset that leaves a vertex disconnected, and any 2 edges out of a 3-cycle always span all 3 vertices without forming a cycle themselves), each with total weight 5+5=10, which is the minimum possible (using all 3 edges would create a cycle, which is invalid for a tree, and is unnecessary since 2 edges already connect everything at the lowest achievable weight). There are C(3,2) = 3 ways to choose which 2 of the 3 edges to include (equivalently, 3 ways to choose which single edge to EXCLUDE), so there are exactly 3 distinct MSTs, each of total weight 10, directly illustrating the rule that MSTs are non-unique whenever tied edge weights create multiple equally optimal spanning subgraphs.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-sorting-searching';}).questions.push(
{
  id: 'algo-sorting-searching-x1',
  q: 'k sorted lists, each of length n (total kn elements), are merged into one sorted list using a min-heap of size k that always holds one "current" element from each non-exhausted list. What is the time complexity of producing the fully merged output?',
  options: ['Theta(kn log k)', 'Theta(kn log n)', 'Theta(kn log(kn))', 'Theta(k^2 n)'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'The heap holds at most k elements at any time (one representative from each list still having unconsumed elements). Each of the kn total output elements requires one extract-min (Theta(log k)) to remove the smallest current element, followed by one insert (Theta(log k)) to push in that list\'s next element (or nothing if that list is now exhausted). So each of the kn elements costs Theta(log k) heap work, giving a total of Theta(kn log k). Interestingly, a balanced-merge-tree approach (repeatedly 2-way merging pairs of the k lists, log k levels deep, each level doing Theta(kn) total work) also reaches Theta(kn log k), matching the heap-based bound, but the heap-based k-way merge is generally preferred in practice for its single-pass streaming nature and lower constant factor. The key distinguishing point in this question is that the heap size is k (number of lists), not kn (total elements), so each heap operation costs Theta(log k), NOT Theta(log(kn)) or Theta(log n).'
},
{
  id: 'algo-sorting-searching-x2',
  q: 'An external sort must sort a file that is too large for main memory. The available memory can hold M records at once, and the file has N total records. Using the standard multi-pass merge external sort (create N/M initial sorted runs, then repeatedly merge pairs of runs), how many passes over the data are needed, and what is the total I/O time complexity?',
  options: [
    'Theta(log(N/M)) passes, Theta(N log(N/M)) total I/O work',
    'Theta(log N) passes, Theta(N log N) total I/O work',
    'Theta(N/M) passes, Theta(N^2/M) total I/O work',
    'Theta(1) pass, Theta(N) total I/O work, since external sort is linear'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Phase 1 creates N/M initial sorted runs (each run is one memory-load\'s worth of M records, sorted internally), a single pass over the data. Phase 2 repeatedly performs 2-way merge passes: each merge pass halves the number of remaining runs (pairing them up and merging), so starting from N/M runs, it takes log2(N/M) merge passes to reduce to a single fully-sorted run. Each merge pass reads and writes every one of the N records once, costing Theta(N) I/O work per pass. Total passes: 1 (initial run creation) + log2(N/M) (merging) = Theta(log(N/M)) passes overall (the initial run-creation pass is a lower-order additive constant compared to the merge passes for large N/M). Total I/O work: Theta(N) per pass times Theta(log(N/M)) passes = Theta(N log(N/M)), which is the standard, well-known external-merge-sort I/O complexity taught in GATE database/OS-adjacent algorithm questions.'
},
{
  id: 'algo-sorting-searching-x3',
  q: 'Interpolation search on a sorted array of n uniformly distributed numeric keys probes a position estimated by linear interpolation between the low and high bounds, rather than always the midpoint (as binary search does). Under the uniform-distribution assumption, what is its average-case time complexity, and under what condition does it degrade?',
  options: [
    'Average case Theta(log log n) under uniform distribution; degrades to Theta(n) worst case when the data is highly non-uniform (e.g. exponentially distributed or heavily clustered keys)',
    'Average case Theta(log n) always, identical to binary search regardless of data distribution',
    'Average case Theta(sqrt(n)) under uniform distribution; never degrades further regardless of distribution',
    'Average case Theta(1) always, since interpolation always guesses the exact position'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'When keys are uniformly distributed, the interpolation formula pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low]) tends to land very close to the target\'s true position, and probabilistic analysis shows the expected number of probes needed is Theta(log log n), a doubly-logarithmic improvement over binary search\'s Theta(log n) — intuitively, each successful interpolation step reduces the remaining search space much faster than simple halving when the distribution assumption holds. However, this guarantee relies critically on uniformity: if the data is highly skewed or clustered (e.g. most keys bunched together with a few extreme outliers, or an exponential distribution), the interpolation estimate can be very inaccurate, causing the search range to shrink only slightly each step, degrading interpolation search to Theta(n) in the worst case (no better than, and sometimes even worse in practice than, linear search) — this fragility to distributional assumptions is precisely why interpolation search, despite its excellent average case, is used far less often than binary search in general-purpose code.'
},
{
  id: 'algo-sorting-searching-x4',
  q: 'To find the top-k largest elements out of n total elements (k much smaller than n), which approach achieves the best asymptotic time complexity, and what is it?',
  options: [
    'Build a min-heap of size k, then for each of the remaining n-k elements, compare against the heap minimum and replace if larger; total time Theta(n log k)',
    'Fully sort all n elements first (Theta(n log n)), then take the last k; this is always asymptotically optimal',
    'Use a simple linear scan keeping track of only the single largest element, extended naively to k elements in Theta(nk) time, which is always faster than any heap-based method',
    'Use quickselect to find the kth largest element in Theta(n) expected time, but this alone identifies only the threshold value, not the sorted list of k elements, so no comparison-based method can do better than Theta(n log n) for the full top-k LIST'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'The min-heap approach maintains a heap of exactly k elements representing the current best k candidates seen so far. Building the initial heap from the first k elements costs Theta(k) (heapify). For each of the remaining n-k elements, one comparison against the heap\'s minimum (Theta(1)) determines whether to discard it or replace the heap minimum (Theta(log k) for the replace-and-sift operation) with it. In the worst case every one of the n-k remaining elements triggers a replacement, giving Theta((n-k) log k) = Theta(n log k) when k is much smaller than n. This strictly beats full sorting\'s Theta(n log n) whenever k = o(n) (since log k = o(log n) in that regime), making the bounded min-heap the standard, asymptotically superior technique for top-k selection; quickselect variants can find the Theta(n) expected-time threshold value but still need extra Theta(k log k) work to produce a SORTED top-k list, which remains competitive with, but does not universally beat, the heap approach for typical small k.'
},
{
  id: 'algo-sorting-searching-x5',
  q: 'For the array [2, 4, 1, 3, 5], how many inversions (pairs i<j with arr[i] > arr[j]) does it contain, and how does this relate to the minimum number of adjacent-swap operations needed to sort it with insertion sort or bubble sort?',
  options: [
    '3 inversions; exactly 3 adjacent swaps are needed, since each adjacent swap in insertion/bubble sort removes exactly one inversion',
    '2 inversions; exactly 4 adjacent swaps are needed',
    '4 inversions; exactly 2 adjacent swaps are needed',
    '3 inversions; exactly 5 adjacent swaps are needed, since sorting requires touching every element at least once'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'List all pairs (i,j) with i<j and arr[i]>arr[j] for [2,4,1,3,5] (0-indexed): (2,1) at positions (0,2): 2>1, inversion. (4,1) at positions (1,2): 4>1, inversion. (4,3) at positions (1,3): 4>3, inversion. Checking remaining pairs: (2,4): 2<4 no; (2,3): 2<3 no; (2,5): no; (4,5): no; (1,3): 1<3 no; (1,5): no; (3,5): no. Total inversions = 3, namely the pairs (2,1),(4,1),(4,3) by value. This matches the fundamental theorem that the number of inversions in an array EXACTLY equals the minimum number of ADJACENT transpositions (swaps of neighboring elements) needed to sort it, since each adjacent swap can resolve at most one inversion (swapping two adjacent out-of-order elements removes exactly that one inversion and cannot affect any other pair\'s relative order) and a sorted array has zero inversions. So exactly 3 adjacent swaps suffice and are necessary, confirming option A and illustrating why bubble sort and insertion sort (both of which only ever perform adjacent swaps) take Theta(number of inversions) time on any given input.'
},
{
  id: 'algo-sorting-searching-x6',
  q: 'An algorithm is allowed to use ARBITRARY (not necessarily adjacent) swaps to sort an array, where each swap can exchange any two elements regardless of position. For the array [3, 4, 1, 2] (0-indexed), what is the number of inversions (the minimum adjacent-swap count) versus the minimum number of ARBITRARY swaps needed to sort it, and why do they differ?',
  options: [
    'Inversions = 4, but only 2 arbitrary swaps are needed (swap positions 0 and 2, then swap positions 1 and 3), since each arbitrary swap can resolve an entire misplaced pair (a 2-cycle) in one move',
    'Inversions = 4, and 4 arbitrary swaps are needed too, identical to the adjacent-swap count',
    'Inversions = 2, and 2 arbitrary swaps are needed',
    'Inversions = 4, and 3 arbitrary swaps are the true minimum'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'For [3,4,1,2] (0-indexed), list inversions: (3,1) at positions (0,2): inversion. (3,2) at positions (0,3): inversion. (4,1) at positions (1,2): inversion. (4,2) at positions (1,3): inversion. (3,4) at (0,1): no. (1,2) at (2,3): no. Total inversions = 4, meaning 4 adjacent swaps would be needed by bubble or insertion sort. But with arbitrary swaps allowed, decompose the permutation into cycles by tracking where each value belongs: value 3 (at position 0) belongs at position 2; value 1 (at position 2) belongs at position 0 — this is a self-contained 2-cycle (0 and 2 swap directly). Likewise value 4 (at position 1) belongs at position 3, and value 2 (at position 3) belongs at position 1 — another self-contained 2-cycle (1 and 3 swap directly). Swapping positions 0 and 2 gives [1,4,3,2]; swapping positions 1 and 3 then gives [1,2,3,4], fully sorted in exactly 2 arbitrary swaps. In general a k-element cycle needs k-1 arbitrary swaps, and here two independent 2-cycles need 1 swap each, totaling 2 — far fewer than the 4 adjacent swaps, illustrating that arbitrary swaps can resolve multiple inversions simultaneously when the underlying permutation decomposes into short cycles.'
},
{
  id: 'algo-sorting-searching-x7',
  q: 'A "partial sort" operation returns the smallest k elements of an n-element array in SORTED order (not just as an unordered set). Using a min-heap-based partial-sort approach optimized for small k, what is the tightest asymptotic time complexity achievable, expressed in terms of n and k?',
  options: [
    'Theta(n + k log n), by building a min-heap of all n elements in Theta(n) time (heapify) and then extracting the minimum k times, each extraction costing Theta(log n)',
    'Theta(n log k), by maintaining a size-k max-heap over a single pass and never touching the full n-element heap',
    'Theta(n log n), no partial-sort method can ever beat a full sort',
    'Theta(k^2), independent of n, since only k elements need to be finally arranged'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'Building a min-heap from all n elements costs Theta(n) using the standard bottom-up heapify procedure (not Theta(n log n), a common misconception — heapify is linear because most nodes are near the bottom of the tree and require little sifting). After the heap is built, each extract-min operation costs Theta(log n) (sift-down through a heap of size up to n), and exactly k such extractions are needed to retrieve the k smallest elements in fully sorted order (each extraction yields the next-smallest remaining element, naturally producing sorted output one element at a time). Total time: Theta(n) [build] + Theta(k log n) [k extractions] = Theta(n + k log n). This is asymptotically the best comparison-based bound for this exact task (retrieving k SORTED smallest elements from all n) when using this heap-based technique, and it correctly reduces to Theta(n log n) when k = n (matching heapsort\'s known complexity) while being much cheaper, close to Theta(n), when k is a small constant or grows slowly, such as k = O(1) or k = O(log n).'
},
{
  id: 'algo-sorting-searching-x8',
  q: 'The array [5, 1, 4, 2, 3] is sorted using insertion sort. How many total ADJACENT swaps (swaps of two neighboring elements) does the standard insertion sort algorithm perform, and how does this number relate to the array\'s inversions?',
  options: [
    '6 swaps, exactly equal to the number of inversions in the array',
    '5 swaps, equal to the array length',
    '10 swaps, equal to n(n-1)/2 for n=5',
    '3 swaps, since only 3 elements are out of their final position'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'First count inversions in [5,1,4,2,3] (0-indexed) by checking every pair where the earlier element exceeds the later one: (5,1), (5,4), (5,2), (5,3), (4,2), (4,3) are all inversions; (1,4), (1,2), (1,3), (2,3) are not. Total inversions = 6. Now trace insertion sort directly: start [5,1,4,2,3]. Insert 1: it swaps leftward past 5, giving [1,5,4,2,3], 1 swap. Insert 4: it swaps leftward past 5 only (4 is not smaller than 1, so it stops there), giving [1,4,5,2,3], 1 swap. Insert 2: it swaps leftward past 5 then past 4 (stopping at 1), giving [1,2,4,5,3], 2 swaps. Insert 3: it swaps leftward past 5 then past 4 (stopping at 2), giving [1,2,3,4,5], 2 swaps. Total swaps = 1+1+2+2 = 6, exactly matching the 6 inversions counted directly. This confirms the general theorem that insertion sort\'s adjacent-swap count always equals the array\'s total inversion count, since each swap resolves precisely one out-of-order adjacent pair and no others.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-asymptotic';}).questions.push(
{
  id: 'algo-asymptotic-y1',
  q: 'Which of the following statements about asymptotic notation are TRUE? (Select ALL that apply)',
  options: [
    'If f(n) = O(g(n)) then g(n) = Omega(f(n))',
    'n^2 = O(n^3)',
    '2^n = O(n^2)',
    'If f(n) = Theta(g(n)) then f(n) = O(g(n)) and f(n) = Omega(g(n))'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: this is a direct consequence of the definitions -- f = O(g) means f is eventually bounded above by a constant multiple of g, which is exactly the statement that g is bounded below by a constant multiple of f, i.e. g = Omega(f). Option B is TRUE: O is not a strict order, so a loose but valid upper bound like n^2 = O(n^3) holds since n^2 <= 1*n^3 for all n >= 1. Option C is FALSE: 2^n is an exponential function and n^2 is a polynomial; any exponential with base greater than 1 eventually exceeds any polynomial, so 2^n = omega(n^2), which contradicts 2^n = O(n^2). Option D is TRUE: this is precisely the formal definition of Theta -- f = Theta(g) is defined as f = O(g) AND f = Omega(g) holding simultaneously.'
},
{
  id: 'algo-asymptotic-y2',
  q: 'Which of the following recurrences solve to Theta(n log n)? (Select ALL that apply)',
  options: [
    'T(n) = 2T(n/2) + n',
    'T(n) = 2T(n/2) + n log n',
    'T(n) = T(n/2) + T(n/2) + n',
    'T(n) = 3T(n/3) + n'
  ],
  answers: [0, 2, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Option A is TRUE: this is the classic merge-sort recurrence, a=2,b=2 gives n^(log_2 2)=n, and f(n)=n matches n^1*(log n)^0, which is Master theorem Case 2 with k=0, giving Theta(n^(log n)^1) = Theta(n log n). Option B is FALSE: here f(n) = n log n = n^1*(log n)^1, which is Case 2 with k=1, giving Theta(n log^2 n), not Theta(n log n) -- adding the extra log factor to f(n) adds an extra log factor to the answer. Option C is TRUE: T(n/2)+T(n/2) is exactly 2T(n/2), so this is identical to option A and solves to Theta(n log n). Option D is TRUE: here a=3,b=3, so n^(log_3 3) = n^1 = n, and f(n) = n matches n^1*(log n)^0 exactly, again Case 2 with k=0, giving Theta(n log n).'
},
{
  id: 'algo-asymptotic-y3',
  q: 'For functions f(n) = n^2, g(n) = n^2 log n, h(n) = 2^n, k(n) = n!, which of the following comparisons are TRUE? (Select ALL that apply)',
  options: [
    'f(n) = o(g(n))',
    'g(n) = O(h(n))',
    'h(n) = Omega(k(n))',
    'k(n) = omega(h(n))'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'Option A is TRUE: dividing f by g gives n^2/(n^2 log n) = 1/log n, which tends to 0 as n grows, so f is little-o of g -- f grows strictly slower. Option B is TRUE: g(n) = n^2 log n is a polynomial times a polylog factor, and any such function is eventually dominated by any exponential with base greater than 1, so g(n) = O(h(n)) (in fact g = o(h)). Option C is FALSE: factorial growth n! eventually outpaces any fixed-base exponential 2^n (by the Stirling approximation n! is roughly (n/e)^n, which dwarfs 2^n for large n), so h(n) = o(k(n)), meaning h is NOT Omega(k) -- h is much smaller, not larger or equal in order. Option D is TRUE: since n! grows strictly faster than 2^n for all sufficiently large n and the ratio k(n)/h(n) diverges to infinity, k(n) = omega(h(n)) holds by the little-omega definition.'
},
{
  id: 'algo-asymptotic-y4',
  q: 'Consider the loop: for (i = 1; i <= n; i = i * 3) { for (j = 1; j <= i; j++) { count++; } } executed with n = 27. What is the exact final value of count? (Enter your numerical answer.)',
  options: [],
  answer: 40,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Trace the outer loop variable i: it starts at 1 and triples each iteration, so it takes the values 1, 3, 9, 27; the next value would be 81, which exceeds 27, so the loop stops after i = 27. For each value of i the inner loop executes exactly i times, incrementing count by i. So count accumulates 1 (from i=1) + 3 (from i=3) + 9 (from i=9) + 27 (from i=27) = 40. This is a geometric series 1+3+9+27 = (3^4-1)/(3-1) = 80/2 = 40, confirming the direct sum.'
},
{
  id: 'algo-asymptotic-y5',
  q: 'The recurrence T(n) = 3T(n/2) + n^2 with base case T(1) = 1 is evaluated exactly (not asymptotically). What is the value of T(4)? (Enter your numerical answer.)',
  options: [],
  answer: 37,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Compute bottom-up using the exact recurrence. T(1) = 1 (given). T(2) = 3*T(1) + 2^2 = 3*1 + 4 = 7. T(4) = 3*T(2) + 4^2 = 3*7 + 16 = 21 + 16 = 37. Note this is a direct numerical evaluation of the recurrence relation, distinct from finding its asymptotic Theta-class (which by the Master theorem would be Theta(n^2) since f(n)=n^2 polynomially dominates n^(log_2 3) which is about n^1.585, satisfying Case 3).'
},
{
  id: 'algo-asymptotic-y6',
  q: 'A nested loop compares every pair (i, j) with 1 <= i < j <= n exactly once. For n = 5, how many total comparisons are performed? (Enter your numerical answer.)',
  options: [],
  answer: 10,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'The number of pairs (i, j) with i < j drawn from n = 5 elements is exactly C(5, 2) = 5!/(2!*3!) = (5*4)/2 = 10. Enumerating directly confirms it: with elements indexed 1..5, the pairs are (1,2),(1,3),(1,4),(1,5),(2,3),(2,4),(2,5),(3,4),(3,5),(4,5) -- that is 4+3+2+1 = 10 pairs. This is the standard Theta(n^2) all-pairs comparison count that appears throughout sorting and pattern-matching analysis.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-divide-conquer';}).questions.push(
{
  id: 'algo-divide-conquer-y1',
  q: 'Which of the following algorithms use the divide-and-conquer paradigm? (Select ALL that apply)',
  options: [
    'Merge Sort',
    'Quicksort',
    'Dijkstra\\u2019s shortest path algorithm',
    'Binary Search'
  ],
  answers: [0, 1, 3],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'Merge Sort is a textbook divide-and-conquer algorithm: it divides the array into two halves, conquers each half recursively, and combines them with a merge step -- TRUE. Quicksort is also divide-and-conquer: it partitions the array around a pivot (divide) and recursively sorts each partition (conquer), with no combine step needed since the partition already places elements correctly -- TRUE. Dijkstra\\u2019s algorithm is a greedy algorithm that repeatedly extracts the minimum-distance vertex from a priority queue; it does not divide the problem into independent subproblems, so it is NOT divide-and-conquer -- FALSE. Binary Search is divide-and-conquer: it compares the target with the middle element and recurses into only one half, discarding the other -- TRUE.'
},
{
  id: 'algo-divide-conquer-y2',
  q: 'Which of the following statements about Strassen\\u2019s matrix multiplication algorithm are TRUE? (Select ALL that apply)',
  options: [
    'It multiplies two n x n matrices using 7 multiplications of (n/2) x (n/2) submatrices instead of the naive 8',
    'Its time complexity is Theta(n^(log2 7)), approximately Theta(n^2.81)',
    'It is asymptotically slower than the standard Theta(n^3) matrix multiplication algorithm',
    'It uses additional submatrix additions and subtractions to combine the 7 products into the final result'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Strassen\\u2019s key insight is reducing the 8 recursive multiplications of the naive divide-and-conquer approach to just 7, at the cost of extra additions -- TRUE. Solving T(n) = 7T(n/2) + Theta(n^2) via the Master theorem (Case 1, since n^2 = O(n^(log2 7 - e))) gives Theta(n^(log2 7)), and log2 7 is approximately 2.807 -- TRUE. It is asymptotically FASTER than Theta(n^3), not slower, since n^2.81 < n^3 for large n, so the statement claiming it is slower is FALSE. The reduction from 8 to 7 multiplications is only possible because Strassen introduces roughly 18 extra Theta(n^2) matrix additions and subtractions to combine the 7 products correctly -- TRUE.'
},
{
  id: 'algo-divide-conquer-y3',
  q: 'Consider quicksort with a standard in-place partitioning scheme. Which of the following statements are TRUE? (Select ALL that apply)',
  options: [
    'Worst-case time complexity is Theta(n^2), which occurs for example on an already-sorted array when the pivot is always chosen as the first element',
    'Best-case and average-case time complexity is Theta(n log n)',
    'Quicksort is a stable sorting algorithm in its standard in-place implementation',
    'Randomized pivot selection improves the expected-case time guarantee regardless of the input\\u2019s initial order'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'When the pivot is always the smallest or largest remaining element (e.g. first-element pivot on sorted input), each partition splits n elements into sizes 0 and n-1, giving the recurrence T(n)=T(n-1)+Theta(n), which solves to Theta(n^2) -- TRUE. When partitions are reasonably balanced (best case exactly balanced, average case balanced enough in expectation), the recurrence resembles T(n)=2T(n/2)+Theta(n), giving Theta(n log n) -- TRUE. Quicksort\\u2019s standard in-place partitioning can swap equal elements past each other, changing their relative order, so it is NOT stable -- FALSE, making this option\\u2019s claim wrong. Randomized pivot selection (e.g. choosing a uniformly random element as pivot) makes the expected running time Theta(n log n) for ANY input, because the bad case now depends on random choices rather than a fixed adversarial input order -- TRUE.'
},
{
  id: 'algo-divide-conquer-y4',
  q: 'Applying the Master theorem to T(n) = 4T(n/2) + n^2 log n places it in Case 2, giving T(n) = Theta(n^2 * (log n)^(k+1)). What is the value of k? (Enter your numerical answer.)',
  options: [],
  answer: 1,
  kind: 'nat',
  marks: 1,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Here a=4 and b=2, so n^(log_b a) = n^(log_2 4) = n^2. The driving function is f(n) = n^2 log n, which matches the Case 2 template n^(log_b a) * (log n)^k with k=1, since n^2 log n = n^2 * (log n)^1. Case 2 of the Master theorem then gives T(n) = Theta(n^(log_b a) * (log n)^(k+1)) = Theta(n^2 * (log n)^2). So k = 1.'
},
{
  id: 'algo-divide-conquer-y5',
  q: 'Standard (top-down) merge sort is run on an array of 8 elements. Using the fact that merging two sorted subarrays of sizes p and q takes at most p+q-1 comparisons, what is the worst-case total number of comparisons across the entire sort? (Enter your numerical answer.)',
  options: [],
  answer: 17,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'With n=8, the recursion splits into 3 levels of merges. Level 1 (leaves to pairs): 4 merges of two size-1 subarrays each, each costing at most 1+1-1=1 comparison, total 4*1=4. Level 2 (pairs to quads): 2 merges of two size-2 subarrays each, each costing at most 2+2-1=3, total 2*3=6. Level 3 (quads to the full array): 1 merge of two size-4 subarrays, costing at most 4+4-1=7. Summing across levels: 4+6+7 = 17. This matches the general worst-case formula n*log2(n) - n + 1 = 8*3 - 8 + 1 = 24-8+1 = 17 for n a power of 2.'
},
{
  id: 'algo-divide-conquer-y6',
  q: 'Using the standard iterative binary search formula, what is the worst-case number of comparisons needed to search for a value in a sorted array of 16 elements (search may end in either success or failure)? (Enter your numerical answer.)',
  options: [],
  answer: 5,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'The worst-case number of comparisons for binary search on n elements is floor(log2 n) + 1. For n=16, log2 16 = 4 exactly, so the worst case is 4 + 1 = 5. Verifying by tracing subarray sizes through repeated halving: 16 -> 8 -> 4 -> 2 -> 1 -> 0, which requires one comparison at each of the sizes 16, 8, 4, 2, 1 before the search space becomes empty (failure) or a match is found -- that is 5 comparisons in the worst case.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-greedy';}).questions.push(
{
  id: 'algo-greedy-y1',
  q: 'Which of the following problems can be solved OPTIMALLY using a greedy approach? (Select ALL that apply)',
  options: [
    'Fractional Knapsack',
    '0/1 Knapsack',
    'Minimum Spanning Tree (via Prim\\u2019s or Kruskal\\u2019s algorithm)',
    'Activity Selection Problem'
  ],
  answers: [0, 2, 3],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'Fractional Knapsack is solved optimally by greedily taking items in decreasing order of value-to-weight ratio, since fractions of items are allowed and there is no combinatorial interaction to worry about -- TRUE. 0/1 Knapsack does NOT admit an optimal greedy solution because items must be taken whole; a locally best ratio choice can block a better combination later, so dynamic programming is required for optimality -- FALSE. Minimum Spanning Tree is a classic greedy success story: both Prim\\u2019s (grow one tree, always add the cheapest connecting edge) and Kruskal\\u2019s (always add the cheapest edge that does not form a cycle) are provably optimal by the cut property and cycle property -- TRUE. Activity Selection is optimally solved by greedily picking the activity with the earliest finish time at each step, which is a proven optimal greedy strategy -- TRUE.'
},
{
  id: 'algo-greedy-y2',
  q: 'Which of the following statements about Huffman coding are TRUE? (Select ALL that apply)',
  options: [
    'It always produces an optimal (minimum expected length) prefix-free code for a given set of symbol frequencies',
    'It repeatedly merges the two nodes with the smallest frequencies into a new combined node',
    'The resulting code is always a fixed-length code, with every symbol getting the same number of bits',
    'A symbol with strictly higher frequency never gets a strictly longer codeword than a symbol with lower frequency'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Huffman coding is proven optimal among all prefix-free (instantaneous) codes for a given frequency distribution, minimizing the expected number of bits -- TRUE. The core greedy step of Huffman\\u2019s algorithm is exactly to repeatedly extract the two least-frequent nodes and merge them into a parent node whose frequency is their sum -- TRUE. Huffman coding produces a VARIABLE-length code by design (that is its whole point -- frequent symbols get short codes, rare symbols get long codes), so calling it fixed-length is FALSE. It is a standard property/invariant of the Huffman construction that codeword length is non-increasing as frequency increases -- a higher-frequency symbol never ends up with a strictly longer code than a lower-frequency one -- TRUE.'
},
{
  id: 'algo-greedy-y3',
  q: 'Which of the following statements about Kruskal\\u2019s and Prim\\u2019s MST algorithms are TRUE? (Select ALL that apply)',
  options: [
    'Kruskal\\u2019s algorithm processes edges in increasing order of weight and uses a Union-Find (disjoint set) structure to avoid forming cycles',
    'Prim\\u2019s algorithm grows a single tree by repeatedly adding the minimum-weight edge that connects the current tree to a new, unvisited vertex',
    'Both algorithms always produce the exact same unique MST for any weighted connected graph',
    'If all edge weights in a connected graph are pairwise distinct, the MST of that graph is unique'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'This is the standard description of Kruskal\\u2019s algorithm: sort edges by weight, and use Union-Find to add an edge only when its endpoints are in different components (avoiding cycles) -- TRUE. This is the standard description of Prim\\u2019s algorithm: maintain a growing tree and always attach the cheapest edge leaving the tree to a vertex not yet included -- TRUE. When edge weights include ties, there can be multiple distinct MSTs of the same total weight, and Kruskal\\u2019s and Prim\\u2019s can break ties differently and select different edge sets, so claiming they ALWAYS produce the identical MST is FALSE. When all weights are distinct, the cut property guarantees a unique minimum edge crossing every cut, which forces the MST to be unique -- TRUE.'
},
{
  id: 'algo-greedy-y4',
  q: 'Run Kruskal\\u2019s algorithm on a graph with 5 vertices {A,B,C,D,E} and edges A-B(1), B-C(2), C-D(3), D-E(4), A-E(5), A-C(6). What is the total weight of the resulting Minimum Spanning Tree? (Enter your numerical answer.)',
  options: [],
  answer: 10,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Sort edges by weight: A-B(1), B-C(2), C-D(3), D-E(4), A-E(5), A-C(6). Process in order: add A-B(1) -- connects {A,B}; add B-C(2) -- connects {A,B,C}; add C-D(3) -- connects {A,B,C,D}; add D-E(4) -- connects {A,B,C,D,E}, all 5 vertices now in one component using exactly 4 edges (n-1 = 4 for n=5), so the MST is complete. The remaining edges A-E(5) and A-C(6) are skipped since they would form cycles. Total MST weight = 1+2+3+4 = 10.'
},
{
  id: 'algo-greedy-y5',
  q: 'Four symbols have frequencies a=5, b=9, c=12, d=13. Using Huffman coding, what is the total weighted code length (sum over symbols of frequency times assigned codeword length) of the resulting optimal code? (Enter your numerical answer.)',
  options: [],
  answer: 78,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Build the Huffman tree bottom-up. Merge the two smallest frequencies, a=5 and b=9, into a node "ab" of weight 14. Remaining nodes: c=12, d=13, ab=14. Merge the two smallest, c=12 and d=13, into a node "cd" of weight 25. Remaining nodes: ab=14, cd=25. Merge these into the root of weight 39. Every merge cost is added: 14 + 25 + 39 = 78, which equals the total weighted path length of the optimal code. Cross-checking by codeword length: a and b are both at depth 2 (root -> ab -> leaf), and c and d are also both at depth 2 (root -> cd -> leaf), so every symbol gets a 2-bit code, giving weighted length 2*(5+9+12+13) = 2*39 = 78, confirming the answer.'
},
{
  id: 'algo-greedy-y6',
  q: 'Using the greedy earliest-finish-time strategy for Activity Selection, given activities with (start, finish) times (1,3), (2,5), (4,7), (6,8), (8,9), what is the maximum number of mutually non-overlapping activities that can be selected? (Enter your numerical answer.)',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Sort activities by finish time (already sorted here): (1,3), (2,5), (4,7), (6,8), (8,9). Greedily select (1,3), finish=3. Next, skip (2,5) since its start=2 < 3 overlaps with the selected activity. Select (4,7) since its start=4 >= 3, new finish=7. Skip (6,8) since its start=6 < 7 overlaps. Select (8,9) since its start=8 >= 7, new finish=9. The selected set is {(1,3), (4,7), (8,9)}, a total of 3 activities, and no more can be added since these already partition the timeline greedily and optimally.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-dp';}).questions.push(
{
  id: 'algo-dp-y1',
  q: 'Which of the following problems are typically solved using dynamic programming, owing to overlapping subproblems and optimal substructure? (Select ALL that apply)',
  options: [
    '0/1 Knapsack',
    'Longest Common Subsequence',
    'Fractional Knapsack',
    'Matrix Chain Multiplication'
  ],
  answers: [0, 1, 3],
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: '0/1 Knapsack has overlapping subproblems (the same (item index, remaining capacity) pair recurs across branches) and optimal substructure, so it is solved with DP in O(nW) time -- TRUE. Longest Common Subsequence is a canonical DP problem: the DP table entry for a prefix pair is reused across many recursive calls, and an optimal LCS is built from optimal LCS of prefixes -- TRUE. Fractional Knapsack does NOT need DP because the greedy ratio-based strategy already gives an optimal solution in O(n log n), and there are no overlapping subproblems to exploit -- FALSE. Matrix Chain Multiplication is a classic interval DP problem: the optimal parenthesization of a subchain is reused across multiple larger subchains, giving genuine overlapping subproblems -- TRUE.'
},
{
  id: 'algo-dp-y2',
  q: 'Which of the following statements about dynamic programming are TRUE? (Select ALL that apply)',
  options: [
    'Memoization (top-down) and tabulation (bottom-up) are two standard implementation strategies for DP',
    'DP is applicable only when a problem\\u2019s subproblems do NOT overlap',
    'The standard 0/1 Knapsack DP solution runs in pseudo-polynomial time O(nW), where W is the knapsack capacity',
    'Optimal substructure means an optimal solution to a problem can be constructed from optimal solutions to its subproblems'
  ],
  answers: [0, 2, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Memoization caches results of a recursive top-down solution, while tabulation fills a table iteratively bottom-up; both are standard, widely taught ways to implement the same DP recurrence -- TRUE. DP is applicable precisely WHEN subproblems DO overlap (so caching saves repeated work); if subproblems never overlap, plain divide-and-conquer without memoization already suffices, so this statement has it backwards and is FALSE. The 0/1 Knapsack DP table has dimensions n x W, filled in O(1) per cell, giving O(nW) time, which is pseudo-polynomial because it depends on the numeric VALUE of W, not just the number of bits used to represent it -- TRUE. This is precisely the standard definition of optimal substructure used to justify DP and greedy algorithms alike -- TRUE.'
},
{
  id: 'algo-dp-y3',
  q: 'Which of the following are TRUE about the Longest Common Subsequence (LCS) problem for two strings of lengths m and n? (Select ALL that apply)',
  options: [
    'The standard DP solution runs in Theta(mn) time and Theta(mn) space',
    'If the two strings share no characters at all, the LCS length is 0',
    'LCS requires the common subsequence to consist of characters that are contiguous in both original strings',
    'The length of the LCS is always at most min(m, n)'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'The classic LCS DP fills an (m+1) x (n+1) table with O(1) work per cell, giving Theta(mn) time and, without space optimization, Theta(mn) space -- TRUE. If the two strings have no character in common at all, no non-empty subsequence can be shared, so the LCS length must be exactly 0 -- TRUE. A subsequence, by definition, need NOT be contiguous -- it only preserves relative order while allowing gaps; requiring contiguity describes a "substring", not a "subsequence", so this statement is FALSE and describes a different problem. Since a subsequence of a string of length m can have length at most m, the LCS (a subsequence of both strings) can be no longer than the shorter of the two input lengths, i.e. at most min(m,n) -- TRUE.'
},
{
  id: 'algo-dp-y4',
  q: 'Using dynamic programming, compute the length of the Longest Common Subsequence (LCS) of the strings X = "ABCBDAB" and Y = "BDCABA". (Enter your numerical answer.)',
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'This is a standard worked LCS example. Filling the DP table for X="ABCBDAB" (length 7) against Y="BDCABA" (length 6), where dp[i][j] = dp[i-1][j-1]+1 if X[i]=Y[j], else max(dp[i-1][j], dp[i][j-1]), the final entry dp[7][6] evaluates to 4. One valid longest common subsequence achieving this length is "BCBA" (B at X-position2/Y-position1, C at X-position3/Y-position3, B at X-position4/Y-position5... one needs to track indices carefully, but any of several length-4 subsequences such as "BDAB" or "BCBA" can be verified to appear, in order, within both strings, and no length-5 common subsequence exists, confirming the DP table value of 4.'
},
{
  id: 'algo-dp-y5',
  q: '0/1 Knapsack: capacity W=10, items given as (weight, value) pairs: (2,3), (3,4), (4,5), (5,6). Using dynamic programming, what is the maximum total value achievable without exceeding the capacity? (Enter your numerical answer.)',
  options: [],
  answer: 13,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'With only 4 items, all 16 subsets can be checked directly (as the DP table would implicitly do). The subset {(2,3), (3,4), (5,6)} has total weight 2+3+5=10 (fits exactly) and total value 3+4+6=13. Checking all other weight-feasible subsets: {(2,3),(3,4),(4,5)} has weight 9, value 12; {(3,4),(4,5)} has weight 7, value 9; {(2,3),(4,5)} has weight 6, value 8; {(4,5),(5,6)} has weight 9, value 11; no feasible subset exceeds value 13. So the DP table\\u2019s final answer, dp[4][10], equals 13.'
},
{
  id: 'algo-dp-y6',
  q: 'Matrix Chain Multiplication: three matrices A1 (10x20), A2 (20x30), A3 (30x40) are to be multiplied together. Using dynamic programming to find the optimal parenthesization, what is the minimum total number of scalar multiplications required? (Enter your numerical answer.)',
  options: [],
  answer: 18000,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'There are only two ways to parenthesize a chain of 3 matrices, and the DP evaluates both. Parenthesization ((A1 A2) A3): computing A1*A2 (dimensions 10x20 times 20x30) costs 10*20*30=6000 and yields a 10x30 matrix; multiplying that by A3 (10x30 times 30x40) costs 10*30*40=12000. Total = 6000+12000 = 18000. Parenthesization (A1 (A2 A3)): computing A2*A3 (20x30 times 30x40) costs 20*30*40=24000 and yields a 20x40 matrix; multiplying A1 by that (10x20 times 20x40) costs 10*20*40=8000. Total = 24000+8000 = 32000. The DP takes the minimum of the two, so the optimal cost is min(18000, 32000) = 18000, achieved by the parenthesization ((A1 A2) A3).'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-graph';}).questions.push(
{
  id: 'algo-graph-y1',
  q: 'For a graph with V vertices and E edges represented using an adjacency list, which of the following statements about BFS and DFS traversal are TRUE? (Select ALL that apply)',
  options: [
    'Both BFS and DFS run in O(V+E) time using the adjacency list representation',
    'BFS uses a queue while DFS uses a stack (or, equivalently, recursion)',
    'In an unweighted graph, BFS from a source always finds shortest paths measured by number of edges',
    'DFS visits vertices in non-decreasing order of their distance (number of edges) from the source'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'With an adjacency list, both BFS and DFS visit every vertex once and scan every edge once, giving O(V+E) time for both -- TRUE. BFS explicitly maintains a FIFO queue of vertices to visit next, while DFS explores as deep as possible before backtracking, implemented either with an explicit stack or via recursion (which uses the call stack) -- TRUE. BFS explores the graph in increasing "layers" of distance from the source, so the first time it reaches a vertex is guaranteed to be via a shortest (fewest-edges) path in an unweighted graph -- TRUE. DFS has NO such layer-by-layer guarantee; it can plunge deep along one branch reaching a far vertex long before visiting a much closer one, so DFS does NOT visit vertices in order of distance from the source -- FALSE, this property belongs to BFS only.'
},
{
  id: 'algo-graph-y2',
  q: 'For a weighted directed graph that may contain negative edge weights but no negative-weight cycle, which of the following statements are TRUE? (Select ALL that apply)',
  options: [
    'Dijkstra\\u2019s algorithm may give incorrect shortest-path results if negative edge weights are present',
    'The Bellman-Ford algorithm correctly computes shortest paths even with negative edge weights, provided there is no negative cycle',
    'Bellman-Ford runs in O(V*E) time',
    'Dijkstra\\u2019s algorithm can be used, unmodified, to detect the presence of a negative-weight cycle'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Dijkstra\\u2019s algorithm relies on the greedy assumption that once a vertex is finalized with its shortest distance, no later relaxation can improve it; negative edges can violate this assumption, producing incorrect results -- TRUE. Bellman-Ford relaxes all edges V-1 times, which is proven sufficient to compute correct shortest paths in a graph with negative edges as long as no negative cycle is reachable -- TRUE. Bellman-Ford performs V-1 rounds of relaxing all E edges, giving O(V*E) time -- TRUE. Dijkstra\\u2019s algorithm has no mechanism to detect negative cycles at all -- it simply may produce wrong (or non-terminating, in variants without proper finalization) results on such graphs; the standard cycle-detection tool is the extra V-th relaxation round in Bellman-Ford, not Dijkstra -- FALSE.'
},
{
  id: 'algo-graph-y3',
  q: 'For a connected, undirected, weighted graph in which ALL edge weights are pairwise DISTINCT, which of the following statements about its Minimum Spanning Tree (MST) are TRUE? (Select ALL that apply)',
  options: [
    'The MST of the graph is unique',
    'The globally minimum-weight edge in the graph must be included in every MST',
    'The globally maximum-weight edge in the graph can never be part of the MST',
    'For any cycle in the graph, the maximum-weight edge on that cycle is never part of the (unique) MST'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: 'With all weights distinct, the cut property guarantees a unique lightest edge crossing every cut, which forces a single, unique MST -- TRUE. The globally minimum-weight edge is the lightest edge across the cut separating its two endpoints from everything else, so by the cut property it must be in every MST -- TRUE. This is FALSE: if the maximum-weight edge is a bridge (the only edge connecting some vertex or subcomponent to the rest of the graph), it MUST be included in every spanning tree regardless of its weight, so it can indeed be part of the MST -- "never" is too strong a claim. The cycle property states that the maximum-weight edge on any cycle can be safely excluded from the MST because a cheaper path around the rest of the cycle always connects the same vertices, so this maximum-cycle-edge is never part of the (here, unique) MST -- TRUE.'
},
{
  id: 'algo-graph-y4',
  q: 'A directed acyclic graph (DAG) has vertices {1, 2, 3} and edges 1->2 and 1->3 (no edge between 2 and 3 in either direction). How many distinct valid topological orderings does this DAG have? (Enter your numerical answer.)',
  options: [],
  answer: 2,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Vertex 1 has edges to both 2 and 3, so it must appear before both of them in any valid topological order. There is no edge between 2 and 3 in either direction, so their relative order is unconstrained and either can come first. Enumerating explicitly: the two valid orderings are [1,2,3] and [1,3,2]. Both respect all edge constraints (1 before 2, and 1 before 3), so there are exactly 2 distinct topological orderings.'
},
{
  id: 'algo-graph-y5',
  q: 'Run Kruskal\\u2019s algorithm on a graph with 4 vertices {P,Q,R,S} and edges P-Q(4), Q-R(2), R-S(3), P-S(5), P-R(6), Q-S(7). What is the total weight of the resulting Minimum Spanning Tree? (Enter your numerical answer.)',
  options: [],
  answer: 9,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Sort edges by weight: Q-R(2), R-S(3), P-Q(4), P-S(5), P-R(6), Q-S(7). Process in order: add Q-R(2) -- connects {Q,R}; add R-S(3) -- connects {Q,R,S}; add P-Q(4) -- connects {P,Q,R,S}, all 4 vertices now in one component using exactly 3 edges (n-1=3 for n=4), so the MST is complete. The remaining edges P-S(5), P-R(6), Q-S(7) are skipped since each would form a cycle. Total MST weight = 2+3+4 = 9.'
},
{
  id: 'algo-graph-y6',
  q: 'Using Dijkstra\\u2019s algorithm starting from vertex A, find the shortest-path distance to vertex D in a graph with edges A-B(2), A-C(5), B-C(1), B-D(7), C-D(3) (all edges undirected with the given weights). (Enter your numerical answer.)',
  options: [],
  answer: 6,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Initialize dist[A]=0. Direct edge A-B gives dist[B]=2. Direct edge A-C gives dist[C]=5, but via B: dist[B]+B-C = 2+1=3, which is shorter, so dist[C]=3. Now consider D: via B directly, dist[B]+B-D = 2+7=9; via C, dist[C]+C-D = 3+3=6. The minimum of these two candidate paths to D is 6, so dist[D]=6, achieved via the path A-B-C-D with edge weights 2+1+3=6.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-sorting-searching';}).questions.push(
{
  id: 'algo-sorting-searching-y1',
  q: 'Regarding comparison-based sorting algorithms and stability, which of the following statements are TRUE? (Select ALL that apply)',
  options: [
    'Any comparison-based sorting algorithm requires Omega(n log n) comparisons in the worst case',
    'Merge sort is a stable sorting algorithm (equal-key elements retain their original relative order)',
    'The standard in-place implementation of quicksort (e.g. Lomuto or Hoare partitioning) is stable',
    'Counting sort achieves O(n+k) time by directly comparing pairs of elements to each other'
  ],
  answers: [0, 1],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'The decision-tree argument shows any comparison sort must have at least n! leaves (one per permutation), and a binary tree with n! leaves has height Omega(log(n!)) = Omega(n log n), so every comparison-based sort needs Omega(n log n) comparisons in the worst case -- TRUE. Merge sort\\u2019s merge step, when it takes from the left subarray on ties, never reorders equal elements relative to each other, so it is stable -- TRUE. Standard in-place quicksort swaps elements across the pivot during partitioning, which can and generally does move an element past an equal-valued element, destroying their original relative order -- it is NOT stable in its typical in-place form -- FALSE. Counting sort achieves its O(n+k) bound precisely by AVOIDING comparisons between elements: it uses each element\\u2019s value as an index into a frequency/count array, which is why it can beat the Omega(n log n) comparison-sort lower bound -- FALSE.'
},
{
  id: 'algo-sorting-searching-y2',
  q: 'Regarding binary search on an array, which of the following statements are TRUE? (Select ALL that apply)',
  options: [
    'Binary search requires the input array to already be sorted for its correctness guarantee to hold',
    'Binary search runs in O(log n) time in the worst case on an array of size n',
    'Binary search can be applied to a singly linked list of n elements and still achieve O(log n) time using the same index-halving approach as on arrays',
    'The worst-case recurrence for binary search is T(n) = T(n/2) + O(1), which solves to O(log n)'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Binary search relies on comparing the target to a midpoint and discarding half the remaining range based on sort order; on an unsorted array this logic is invalid and can miss the target -- sortedness is required -- TRUE. Each comparison halves the search range, so after O(log n) halvings the range shrinks to a constant size, giving O(log n) worst-case time -- TRUE. A singly linked list has no O(1) random access to an arbitrary index, so even locating the "middle" element takes O(n) time by walking pointers, which destroys the O(log n) bound; binary search needs array-like random access (or a balanced-BST-like structure) to be efficient -- FALSE. Each call does O(1) work (one comparison) and recurses on a problem of half the size, so T(n) = T(n/2) + O(1); applying the Master theorem (or direct unrolling) gives T(n) = O(log n) -- TRUE.'
},
{
  id: 'algo-sorting-searching-y3',
  q: 'Regarding a binary MIN-heap stored as a 0-indexed array and heapsort built on it, which of the following statements are TRUE? (Select ALL that apply)',
  options: [
    'For a node at index i, its two children are located at indices 2i+1 and 2i+2',
    'Building a heap from an unsorted array of n elements via bottom-up heapify takes O(n) time',
    'Heapsort has O(n log n) time complexity in the worst case',
    'Heapsort is a stable sorting algorithm'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'This is the standard 0-indexed array encoding of a complete binary tree: left child at 2i+1, right child at 2i+2 (and parent of i at floor((i-1)/2)) -- TRUE. Although each of the n/2 leaf-adjacent calls to sift-down might seem to cost O(log n), the vast majority of nodes are near the bottom of the tree with very short sift-down paths; summing the work across all levels gives a geometric-like series that totals O(n), not O(n log n) -- TRUE. Heapsort repeatedly extracts the minimum (or maximum, for a max-heap variant) and sifts down, n times, each costing O(log n), for O(n log n) total, and this bound holds in the worst case (heapsort has no bad-input degeneration like quicksort) -- TRUE. Heapsort repeatedly swaps the root with a distant array position during extraction, which routinely reorders equal-valued elements relative to each other -- it is NOT stable -- FALSE.'
},
{
  id: 'algo-sorting-searching-y4',
  q: 'What is the maximum number of comparisons needed by binary search in the worst case (element not present) to search a sorted array of 32 elements? (Enter your numerical answer.)',
  options: [],
  answer: 6,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'Track the size of the remaining search range across each comparison, starting at 32: comparison 1 narrows 32 to 16; comparison 2 narrows 16 to 8; comparison 3 narrows 8 to 4; comparison 4 narrows 4 to 2; comparison 5 narrows 2 to 1; comparison 6 narrows 1 to 0, at which point the loop terminates (element absent). Counting each narrowing step as one comparison gives a total of 6 comparisons, matching the general worst-case formula floor(log2 n) + 1 = floor(log2 32) + 1 = 5 + 1 = 6.'
},
{
  id: 'algo-sorting-searching-y5',
  q: 'How many inversions (pairs i<j with arr[i] > arr[j]) does the array [8, 4, 2, 1] contain? (Enter your numerical answer.)',
  options: [],
  answer: 6,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'The array [8,4,2,1] is sorted in strictly decreasing order, so every one of its C(4,2) = 6 pairs is an inversion. Listing them explicitly (by position, 0-indexed): (0,1):8>4, (0,2):8>2, (0,3):8>1, (1,2):4>2, (1,3):4>1, (2,3):2>1 -- all 6 pairs qualify. This matches the general fact that a strictly decreasing array of length n has the maximum possible n(n-1)/2 inversions, here 4*3/2 = 6.'
},
{
  id: 'algo-sorting-searching-y6',
  q: 'The array [5, 3, 8, 4, 2] is sorted using standard selection sort (repeatedly find the minimum of the remaining unsorted suffix and swap it into place, skipping the swap when the minimum is already in place). How many actual element swaps are performed in total? (Enter your numerical answer.)',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Start: [5,3,8,4,2]. Pass i=0: minimum of the whole array is 2 at index 4; swap positions 0 and 4 -> [2,3,8,4,5] (swap #1). Pass i=1: minimum of [3,8,4,5] (indices 1-4) is 3, already at index 1, so no swap is performed. Pass i=2: minimum of [8,4,5] (indices 2-4) is 4 at index 3; swap positions 2 and 3 -> [2,3,4,8,5] (swap #2). Pass i=3: minimum of [8,5] (indices 3-4) is 5 at index 4; swap positions 3 and 4 -> [2,3,4,5,8] (swap #3). The array is now fully sorted after exactly 3 actual swaps (the i=1 pass needed no swap since the minimum was already correctly placed).'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-asymptotic';}).questions.push(
{
  id: 'algo-asymptotic-z7',
  q: 'A recurrence is defined as T(n) = 2*T(floor(n/2)) + n for n > 1, with T(1) = 1. What is the value of T(6)? (Enter your numerical answer.)',
  options: [],
  answer: 16,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Compute bottom-up using floor division. T(1)=1. T(2)=2*T(1)+2=2*1+2=4. T(3)=2*T(floor(3/2))+3=2*T(1)+3=2*1+3=5. T(4)=2*T(2)+4=2*4+4=12. T(5)=2*T(floor(5/2))+5=2*T(2)+5=2*4+5=13. T(6)=2*T(3)+6=2*5+6=16. So T(6)=16.'
},
{
  id: 'algo-asymptotic-z8',
  q: 'A binary counter starts at 0 (all bits 0) and is incremented 8 times in a row (reaching binary value 1000, i.e. decimal 8). Counting each bit that flips (0-to-1 or 1-to-0) during each increment, what is the TOTAL number of bit flips across all 8 increments? (Enter your numerical answer.)',
  options: [],
  answer: 15,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Trace every increment in binary and count flipped bits: 0000->0001 flips 1 bit; 0001->0010 flips 2 bits; 0010->0011 flips 1 bit; 0011->0100 flips 3 bits; 0100->0101 flips 1 bit; 0101->0110 flips 2 bits; 0110->0111 flips 1 bit; 0111->1000 flips 4 bits. Summing: 1+2+1+3+1+2+1+4 = 15 total bit flips. This matches the amortized-analysis result that bit 0 flips every increment (8 times), bit 1 flips every 2nd increment (4 times), bit 2 every 4th (2 times), bit 3 every 8th (1 time): 8+4+2+1 = 15, confirming that binary counter increments cost O(1) amortized time despite occasional O(log n) worst-case flips.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-divide-conquer';}).questions.push(
{
  id: 'algo-divide-conquer-z7',
  q: 'A recurrence is defined as T(n) = 3*T(floor(n/2)) + n for n > 1, with T(1) = 1. What is the value of T(10)? (Enter your numerical answer.)',
  options: [],
  answer: 70,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Compute bottom-up with floor division. T(1)=1. T(2)=3*T(1)+2=3+2=5. T(3)=3*T(1)+3=3+3=6 (floor(3/2)=1). T(4)=3*T(2)+4=15+4=19. T(5)=3*T(2)+5=15+5=20 (floor(5/2)=2). T(6)=3*T(3)+6=18+6=24. T(7)=3*T(3)+7=18+7=25 (floor(7/2)=3). T(8)=3*T(4)+8=57+8=65. T(9)=3*T(4)+9=57+9=66 (floor(9/2)=4). T(10)=3*T(5)+10=60+10=70 (floor(10/2)=5). So T(10)=70.'
},
{
  id: 'algo-divide-conquer-z8',
  q: 'What is the maximum (worst-case) total number of element comparisons performed by standard top-down merge sort when sorting an array of exactly 6 elements? (Enter your numerical answer.)',
  options: [],
  answer: 11,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Merge sort on 6 elements splits into two halves of size 3 each. Each size-3 half further splits into sizes 2 and 1: sorting the size-2 half costs 1 comparison, and merging that sorted pair with the single leftover element costs at most (2+1-1)=2 comparisons in the worst case, so each size-3 subproblem costs at most 1+2=3 comparisons. With two such size-3 subproblems (3+3=6 comparisons) plus the final merge of the two sorted size-3 lists, which costs at most (3+3-1)=5 comparisons in the worst case, the grand total is 3+3+5=11 comparisons. This matches the general worst-case merge sort comparison formula n*ceil(log2 n) - 2^ceil(log2 n) + 1 = 6*3 - 8 + 1 = 11.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-greedy';}).questions.push(
{
  id: 'algo-greedy-z7',
  q: 'A connected undirected graph has vertices {A,B,C,D} and edges A-B(1), B-C(2), C-D(3), A-D(4), A-C(5). First, the weight of edge C-D is increased from 3 to 10, and all other edges keep their original weights. What is the total weight of the Minimum Spanning Tree AFTER this change? (Enter your numerical answer.)',
  options: [],
  answer: 7,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'After the change the edges are A-B(1), B-C(2), C-D(10), A-D(4), A-C(5). Run Kruskal\\u2019s algorithm on the sorted list A-B(1), B-C(2), A-D(4), A-C(5), C-D(10): add A-B(1) -> {A,B}; add B-C(2) -> {A,B,C}; A-D(4) connects D, giving {A,B,C,D} using exactly 3 edges (n-1=3 for 4 vertices), so the MST is complete without ever needing C-D. Total MST weight = 1+2+4 = 7. (For reference, before the change the MST used edges A-B(1), B-C(2), C-D(3) for weight 6; raising C-D\\u2019s weight above 4 forces Kruskal to substitute A-D(4) in its place, raising the MST weight from 6 to 7.)'
},
{
  id: 'algo-greedy-z8',
  q: 'Using Huffman coding, six symbols have frequencies a=5, b=9, c=12, d=13, e=16, f=45. Building the optimal prefix-free code by greedily merging the two smallest-frequency nodes at each step (standard Huffman construction), what is the total weighted code length (sum of frequency times code-length over all symbols, equivalently the sum of all internal-node merge costs)? (Enter your numerical answer.)',
  options: [],
  answer: 224,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Repeatedly merge the two smallest frequencies, recording each merge cost (sum of the two merged values), and reinsert the sum. Start: {5,9,12,13,16,45}. Merge 5+9=14 (cost 14) -> {12,13,14,16,45}. Merge 12+13=25 (cost 25) -> {14,16,25,45}. Merge 14+16=30 (cost 30) -> {25,30,45}. Merge 25+30=55 (cost 55) -> {45,55}. Merge 45+55=100 (cost 100) -> {100}, construction complete. The total weighted code length equals the sum of all merge costs (a standard identity, since each merge cost counts every original frequency once for each level it rises through): 14+25+30+55+100 = 224.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-dp';}).questions.push(
{
  id: 'algo-dp-z7',
  q: 'Solve the 0/1 knapsack problem for items with (weight, value) pairs (1,1), (3,4), (4,5), (5,7) and knapsack capacity 7 (each item may be taken at most once). What is the maximum total value achievable? (Enter your numerical answer.)',
  options: [],
  answer: 9,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Build the DP table dp[c] = best value using capacity c, processing items one at a time from high capacity to low (standard 0/1 knapsack). After item (1,1): dp = [0,1,1,1,1,1,1,1] for c=0..7. After item (3,4): dp = [0,1,1,4,5,5,5,5]. After item (4,5): dp = [0,1,1,4,5,6,6,9] (dp[7] becomes dp[3]+5 = 4+5 = 9). After item (5,7): dp[7] stays max(9, dp[2]+7=1+7=8) = 9; final dp[7] = 9. Sanity check by direct combination: choosing items (3,4) and (4,5) uses weight 3+4=7 (exactly capacity) for value 4+5=9, which is indeed the best combination (e.g. (1,1)+(5,7) uses weight 6 for value 8, which is worse). Maximum value = 9.'
},
{
  id: 'algo-dp-z8',
  q: 'A recurrence is defined as T(n) = T(floor(n/3)) + T(floor(2n/3)) + n for n >= 2, with T(0) = 0 and T(1) = 1. What is the value of T(9)? (Enter your numerical answer.)',
  options: [],
  answer: 33,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Compute bottom-up with floor division. T(0)=0, T(1)=1. T(2)=T(0)+T(1)+2=0+1+2=3 (floor(2/3)=0, floor(4/3)=1). T(3)=T(1)+T(2)+3=1+3+3=7. T(4)=T(1)+T(2)+4=1+3+4=8 (floor(4/3)=1, floor(8/3)=2). T(5)=T(1)+T(3)+5=1+7+5=13 (floor(5/3)=1, floor(10/3)=3). T(6)=T(2)+T(4)+6=3+8+6=17. T(7)=T(2)+T(4)+7=3+8+7=18 (floor(7/3)=2, floor(14/3)=4). T(8)=T(2)+T(5)+8=3+13+8=24 (floor(8/3)=2, floor(16/3)=5). T(9)=T(3)+T(6)+9=7+17+9=33 (floor(9/3)=3, floor(18/3)=6). So T(9)=33.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-graph';}).questions.push(
{
  id: 'algo-graph-z7',
  q: 'A connected undirected graph has vertices {W,X,Y,Z} and edges W-X(2), X-Y(3), Y-Z(1), W-Z(6), W-Y(4), X-Z(5). The weight of edge W-X is then increased from 2 to 10, and all other edges keep their original weights. What is the total weight of the Minimum Spanning Tree AFTER this change? (Enter your numerical answer.)',
  options: [],
  answer: 8,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'After the change the edges are W-X(10), X-Y(3), Y-Z(1), W-Z(6), W-Y(4), X-Z(5). Sort by weight: Y-Z(1), X-Y(3), W-Y(4), X-Z(5), W-Z(6), W-X(10). Run Kruskal\\u2019s algorithm: add Y-Z(1) -> {Y,Z}; add X-Y(3) -> {X,Y,Z}; add W-Y(4) connects W -> {W,X,Y,Z} using exactly 3 edges (n-1=3 for 4 vertices), MST complete. Total MST weight = 1+3+4 = 8. (Before the change, the original MST used Y-Z(1), W-X(2), X-Y(3) for weight 6; raising W-X above 4 forces Kruskal to substitute W-Y(4) in its place.)'
},
{
  id: 'algo-graph-z8',
  q: 'An initially empty dynamic array starts with capacity 1 and doubles its capacity (1, 2, 4, 8, 16, ...) via a full copy of all existing elements whenever a push is attempted on a full array, before inserting the new element. Starting from empty, after exactly 10 push operations, what is the TOTAL number of element copies performed across all resizes (amortized analysis; count only copies made during resizing, not the final insertions)? (Enter your numerical answer.)',
  options: [],
  answer: 15,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Track size and capacity through each push. Push 1: size 0 < capacity 1, no resize, size becomes 1. Push 2: size 1 = capacity 1 (full), resize to capacity 2 copying 1 element, then insert, size becomes 2. Push 3: size 2 = capacity 2 (full), resize to capacity 4 copying 2 elements, insert, size becomes 3. Pushes 4: size 3 < 4, no resize, size becomes 4. Push 5: size 4 = capacity 4 (full), resize to capacity 8 copying 4 elements, insert, size becomes 5. Pushes 6,7,8: sizes 5,6,7 all < 8, no resize; after push 8, size = 8. Push 9: size 8 = capacity 8 (full), resize to capacity 16 copying 8 elements, insert, size becomes 9. Push 10: size 9 < 16, no resize. Total copies = 1+2+4+8 = 15, illustrating that although a single resize costs O(n), the total copying cost over n pushes is O(n), giving O(1) amortized cost per push.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-sorting-searching';}).questions.push(
{
  id: 'algo-sorting-searching-z7',
  q: 'A recurrence is defined as T(n) = 2*T(floor(n/2)) + (n-1) for n > 1, with T(0) = 0 and T(1) = 0. What is the value of T(7)? (Enter your numerical answer.)',
  options: [],
  answer: 10,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Compute bottom-up with floor division. T(0)=0, T(1)=0. T(2)=2*T(1)+1=0+1=1. T(3)=2*T(1)+2=0+2=2 (floor(3/2)=1). T(4)=2*T(2)+3=2*1+3=5. T(5)=2*T(2)+4=2*1+4=6 (floor(5/2)=2). T(6)=2*T(3)+5=2*2+5=9. T(7)=2*T(3)+6=2*2+6=10 (floor(7/2)=3). So T(7)=10 (this matches the worst-case comparison count for a merge-sort-like divide step costing n-1 comparisons per merge).'
},
{
  id: 'algo-sorting-searching-z8',
  q: 'An initially empty stack undergoes this sequence of operations: 6 individual push operations, then one multipop(4) (pop up to 4 elements, stopping early only if the stack becomes empty), then 2 individual push operations, then one multipop(10). What is the TOTAL number of individual pop operations actually executed across both multipop calls? (Enter your numerical answer.)',
  options: [],
  answer: 8,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'After 6 pushes, the stack holds 6 elements. multipop(4) requests 4 pops; since the stack has 6 (>=4) elements, all 4 requested pops execute, leaving 2 elements on the stack. Then 2 pushes bring the stack back up to 4 elements. multipop(10) requests 10 pops, but the stack only has 4 elements, so it pops all 4 available elements (stopping when empty) and leaves the stack empty. Total individual pops executed = 4 (first multipop) + 4 (second multipop) = 8. This illustrates the amortized aggregate-method argument: across any sequence of pushes and multipops, the total number of pop operations can never exceed the total number of push operations (here 8 pushes total, matching exactly 8 pops), so each operation is O(1) amortized even though a single multipop can cost O(n) in the worst case.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-graph';}).questions.push(
{
  id: 'algo-graph-u1',
  q: 'A disjoint-set (union-find) data structure uses BOTH union by rank AND path compression. Over a sequence of m union/find operations on a universe of n elements, what is the amortized time per operation?',
  options: [
    'O(log n) per operation',
    'O(α(n)) per operation, where α is the inverse Ackermann function (effectively constant for all practical n)',
    'O(sqrt(n)) per operation',
    'O(n) per operation'
  ],
  answer: 1,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'With union by rank alone, a single tree has height O(log n), giving O(log n) per find. Adding path compression (every node visited during a find is re-attached directly to the root) improves this further: Tarjan showed that the total cost of m operations on n elements is O(m α(n)), where α is the inverse Ackermann function. α(n) grows so slowly that it is less than 5 for any n conceivable in practice (up to values vastly larger than the number of atoms in the universe), so the amortized cost per operation is effectively O(1), though technically it is not a true constant. This is the standard GATE-tested result: union by rank + path compression together give near-linear O(m α(n)) total time, better than either heuristic alone (each alone gives O(log n) amortized).'
},
{
  id: 'algo-graph-u2',
  q: 'Starting with 8 singleton elements {0,1,2,3,4,5,6,7}, union-by-rank (no path compression triggered) is applied with these calls in order: union(0,1), union(2,3), union(4,5), union(0,2), union(4,6), union(0,4). Union-by-rank convention: when ranks differ, the lower-rank root is attached under the higher-rank root; when ranks are equal, the second argument\'s root is attached under the first argument\'s root and the first root\'s rank increases by 1. What is the value of parent[6] after all six unions? (Enter your numerical answer.)',
  options: [],
  answer: 4,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Trace step by step (rank in brackets). union(0,1): ranks 0=0, ranks tie, so parent[1]=0, rank[0]=1. union(2,3): tie, parent[3]=2, rank[2]=1. union(4,5): tie, parent[5]=4, rank[4]=1. union(0,2): rank[0]=1 = rank[2]=1, tie, so parent[2]=0, rank[0]=2. union(4,6): root of 4 is 4 (rank 1), root of 6 is 6 (rank 0); rank[4]>rank[6], so parent[6]=4 directly (6 attaches under 4). union(0,4): root of 0 is 0 (rank 2), root of 4 is 4 (rank 1); rank[0]>rank[4], so parent[4]=0 -- but this only updates parent[4], NOT parent[6], because no find() call traverses through 6 to trigger path compression. So parent[6] remains 4 even though the logical root of 6\'s set is now 0 (reachable via 6->4->0). The trap is assuming parent[6] becomes 0 immediately; without an intervening find(6), the tree pointer is not updated. Final answer: parent[6] = 4.'
},
{
  id: 'algo-graph-u3',
  q: 'Starting with 10 singleton elements {0,1,...,9}, the following union operations are performed in order: union(0,1), union(2,3), union(1,2), union(4,5), union(6,7), union(5,6), union(0,4), union(2,6). How many distinct components (disjoint sets) remain after all 8 union calls? (Enter your numerical answer.)',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Track sets as they merge. union(0,1): {0,1}. union(2,3): {2,3}. union(1,2): merges {0,1} with {2,3} -> {0,1,2,3}. union(4,5): {4,5}. union(6,7): {6,7}. union(5,6): merges {4,5} with {6,7} -> {4,5,6,7}. union(0,4): merges {0,1,2,3} with {4,5,6,7} -> {0,1,2,3,4,5,6,7}. union(2,6): both 2 and 6 are already in the same component (the big merged set), so this union is REDUNDANT and does not reduce the component count -- a classic case Kruskal-style algorithms must detect via find() to avoid creating a cycle. Elements 8 and 9 were never touched and remain singleton components. A general rule: with n elements and s SUCCESSFUL (non-redundant) unions, components = n - s. Here s = 7 successful unions (the 8th was redundant), so components = 10 - 7 = 3: {0,1,2,3,4,5,6,7}, {8}, {9}.'
},
{
  id: 'algo-graph-u4',
  q: 'Kruskal\'s MST algorithm is implemented using a disjoint-set (union-find) data structure with union by rank and path compression, on a graph with V vertices and E edges. What dominates the overall time complexity?',
  options: [
    'O(E log E) from sorting the edges by weight, since the union-find operations only add a near-linear O(E α(V)) overhead',
    'O(V^2) from scanning an adjacency matrix for the minimum edge at each step',
    'O(E α(V)) from the union-find calls, which dominates over the cost of sorting',
    'O(V log V) from maintaining a priority queue of vertices'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Kruskal\'s algorithm has two phases: (1) sort all E edges by weight, costing O(E log E); (2) process edges in sorted order, using find() to check whether the two endpoints are already connected (skip if so, to avoid a cycle) and union() to merge them when an edge is accepted, over E edges. With union by rank and path compression, this second phase costs O(E α(V)), which is nearly linear and asymptotically much smaller than O(E log E) for any non-trivial E. Since O(E log E) = O(E log V) (because E <= V^2 implies log E = O(log V)), the sorting step is the dominant term, giving overall Kruskal complexity O(E log E) = O(E log V). Options describing O(V^2) or O(V log V) describe Prim\'s variants (matrix-based or heap-based), not Kruskal\'s, and are not applicable here since Kruskal\'s does not use a priority queue over vertices at all.'
},
{
  id: 'algo-graph-u5',
  q: 'A disjoint-set data structure uses NEITHER union by rank/size NOR path compression -- every union simply attaches one root arbitrarily under the other, and finds never compress paths. What is the worst-case height of a resulting tree after n-1 unions have merged n singleton elements into a single set?',
  options: [
    'O(1), since union just changes one pointer',
    'O(log n), matching the balanced case',
    'O(sqrt(n)), matching Shell sort\'s gap behavior',
    'O(n), when unions are chosen adversarially to always attach the current root under a new node'
  ],
  answer: 3,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Without union by rank or size, nothing prevents a large tree from being attached beneath a small one. Consider the adversarial sequence union(1,0), union(2,1), union(3,2), ..., union(n-1,n-2), where each call attaches the existing (growing) tree\'s root under the newly introduced element\'s root. This produces a single degenerate chain: 0 is a child of 1, which is a child of 2, ..., up to n-1, giving a tree of height exactly n-1 = O(n). A find() on element 0 in this structure then costs O(n) in the worst case, since it must walk the entire chain to the root, even though path compression alone (without rank) can still bound the AMORTIZED cost to O(log n) per operation over a full sequence -- but the single-operation WORST CASE height, absent the rank/size heuristic, remains O(n). This is exactly why union by rank (or size) is essential: it guarantees O(log n) height on its own, regardless of path compression.'
}
);

window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-sorting-searching';}).questions.push(
{
  id: 'algo-sorting-searching-u1',
  q: 'A text of length n = 11 and a pattern of length m = 4 are compared using the naive (brute-force) string matching algorithm, which slides the pattern one position at a time and compares characters left to right, stopping a comparison run at the first mismatch. Consider the absolute worst case: text = "aaaaaaaaaaa" (11 a\'s) and pattern = "aaab" (matches the first 3 characters at every alignment, then mismatches on the 4th). What is the TOTAL number of character comparisons performed across all alignments? (Enter your numerical answer.)',
  options: [],
  answer: 32,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'The naive algorithm tries every possible starting alignment of the pattern within the text: there are n - m + 1 = 11 - 4 + 1 = 8 such alignments (shifts 0 through 7). At each alignment, since the text is all a\'s and the pattern is "aaab", the first 3 characters (a,a,a) match successfully but the 4th character comparison (text has \'a\', pattern has \'b\') fails, so exactly 4 comparisons are performed before moving to the next shift -- this is the worst case because the algorithm cannot exit early. Total comparisons = (number of alignments) x (comparisons per alignment) = 8 x 4 = 32. In general, the worst-case comparison count for naive string matching is (n-m+1)*m, which is Theta(nm) when m is a constant fraction of n -- this is why KMP and Rabin-Karp were developed to beat the naive algorithm\'s quadratic worst case.'
},
{
  id: 'algo-sorting-searching-u2',
  q: 'What is the correct KMP failure function (prefix function / lps array) for the pattern P = "AABAAAB" (indices 0 to 6)?',
  options: [
    '[0, 1, 0, 1, 2, 2, 3]',
    '[0, 1, 0, 1, 2, 3, 3]',
    '[0, 1, 1, 1, 2, 2, 3]',
    '[0, 0, 0, 1, 2, 2, 3]'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Compute pi[i] = length of the longest proper prefix of P[0..i] that is also a suffix of P[0..i], using the standard KMP recurrence with pointer k. pi[0]=0 by definition. i=1 (\'A\'): k=0, P[0]=\'A\' matches, k becomes 1, pi[1]=1. i=2 (\'B\'): k=1, P[1]=\'A\' != \'B\', fall back to k=pi[0]=0; P[0]=\'A\' != \'B\'; pi[2]=0. i=3 (\'A\'): k=0, P[0]=\'A\' matches, k=1, pi[3]=1. i=4 (\'A\'): k=1, P[1]=\'A\' matches, k=2, pi[4]=2. i=5 (\'A\'): k=2, P[2]=\'B\' != \'A\', fall back to k=pi[1]=1; P[1]=\'A\' matches, k=2, pi[5]=2. i=6 (\'B\'): k=2, P[2]=\'B\' matches, k=3, pi[6]=3. Final array: [0,1,0,1,2,2,3]. The common trap is assuming pi[5] should be 3 (option B) by naively extending the run of A\'s without correctly falling back through pi[1] first, or misjudging the mismatch at i=2.'
},
{
  id: 'algo-sorting-searching-u3',
  q: 'The Knuth-Morris-Pratt (KMP) string matching algorithm searches for a pattern of length m within a text of length n. What is its overall worst-case time complexity, including preprocessing?',
  options: [
    'O(n*m), same as the naive algorithm in the worst case',
    'O(n+m): O(m) to build the failure function plus O(n) for the scan, since the text pointer never backtracks',
    'O(n log m), from a binary-search-like matching step',
    'O(m log m) only, independent of the text length n'
  ],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'concept',
  explanation: 'KMP has two phases. Preprocessing builds the failure function (prefix function / lps array) for the pattern in O(m) time using the same amortized argument as the main scan. The matching phase scans the text with a pointer i that NEVER moves backward -- on a mismatch, only the pattern pointer k jumps back using the failure function (k = pi[k-1]), and each such fallback can be charged against a PRIOR successful advance of k, so the total work across the whole scan is O(n) (amortized, since k increases at most n times total across the whole scan and each fallback strictly decreases k, bounding total fallbacks by total advances). Combining both phases gives O(n+m) overall, a strict asymptotic improvement over the naive algorithm\'s O(nm) worst case, and this is precisely why KMP is preferred whenever repeated or adversarial patterns could trigger the naive algorithm\'s quadratic blowup.'
},
{
  id: 'algo-sorting-searching-u4',
  q: 'The Rabin-Karp string matching algorithm uses a rolling hash to search for a pattern of length m in a text of length n. Which statement correctly describes its core idea and a key pitfall?',
  options: [
    'It hashes the pattern once and each length-m window of the text using an incrementally updatable ("rolling") hash; a hash match does NOT guarantee a true match (a "spurious hit" from a hash collision), so the algorithm must verify with an explicit character-by-character comparison before accepting a match',
    'It builds a suffix tree of the text in O(n) time and looks up the pattern directly, guaranteeing O(m) worst-case search with no possibility of false positives',
    'It compares the pattern against every window using full character comparisons but skips ahead using a failure function computed from the pattern, exactly like KMP',
    'It sorts all length-m substrings of the text and binary searches for the pattern, giving O(n log n) time with no risk of false matches'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'Rabin-Karp computes a numeric hash of the pattern and, using a rolling-hash update (typically treating the window as a number in some base, e.g. polynomial hashing mod a prime), incrementally recomputes the hash of each successive length-m window of the text in O(1) per shift after an O(m) initial computation, rather than rehashing from scratch. If the window\'s hash does NOT equal the pattern\'s hash, no match is possible there (safely skip). If the hashes DO match, this is only a candidate -- a spurious hit can occur due to hash collisions (different substrings mapping to the same hash value), so the algorithm must perform an explicit O(m) character-by-character verification before confirming a true match. Average-case time is O(n+m) with a good hash function and modulus, but worst case degrades to O(nm) if many spurious hits occur (e.g., a poorly chosen hash or an adversarial/all-same-character text), which is precisely why hash and modulus choice matters in practice.'
}
);
window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-graph';}).questions.push(
{
  id: 'algo-graph-f1',
  q: 'For the weighted undirected graph shown (vertices A-F, edge weights as labeled), what is the total weight of a Minimum Spanning Tree?',
  figure: '<svg viewBox="0 0 220 320" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="40" y1="40" x2="180" y2="40"/><line x1="40" y1="40" x2="110" y2="110"/><line x1="180" y1="40" x2="110" y2="110"/><line x1="180" y1="40" x2="180" y2="220"/><line x1="110" y1="110" x2="180" y2="220"/><line x1="110" y1="110" x2="40" y2="220"/><line x1="180" y1="220" x2="40" y2="220"/><line x1="180" y1="220" x2="110" y2="290"/><line x1="40" y1="220" x2="110" y2="290"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="110" y="32">4</text><text x="60" y="68">2</text><text x="160" y="68">1</text><text x="196" y="132">5</text><text x="155" y="158">8</text><text x="65" y="158">10</text><text x="110" y="235">2</text><text x="155" y="248">6</text><text x="65" y="248">3</text></g><g fill="none" stroke="currentColor"><circle cx="40" cy="40" r="15"/><circle cx="180" cy="40" r="15"/><circle cx="110" cy="110" r="15"/><circle cx="180" cy="220" r="15"/><circle cx="40" cy="220" r="15"/><circle cx="110" cy="290" r="15"/></g><g font-size="13" fill="currentColor" text-anchor="middle"><text x="40" y="44">A</text><text x="180" y="44">B</text><text x="110" y="114">C</text><text x="180" y="224">D</text><text x="40" y="224">E</text><text x="110" y="294">F</text></g></svg>',
  options: ['13', '15', '11', '17'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Run Kruskal\'s algorithm: sort edges by weight -- B-C(1), A-C(2), D-E(2), E-F(3), A-B(4), B-D(5), D-F(6), C-D(8), C-E(10). Add B-C(1): components {B,C}. Add A-C(2): connects A to {B,C}, giving {A,B,C}. Add D-E(2): components {D,E}. Add E-F(3): connects F, giving {D,E,F}. Add A-B(4): both endpoints already in {A,B,C} -- forms a cycle, skip. Add B-D(5): connects the two components {A,B,C} and {D,E,F} into one tree spanning all 6 vertices -- accept. At this point all 6 vertices are connected with 5 edges (B-C, A-C, D-E, E-F, B-D), so the process stops. Total weight = 1+2+2+3+5 = 13. The remaining edges (A-B=4, C-D=8, C-E=10, D-F=6) are all correctly rejected as they would close a cycle.'
},
{
  id: 'algo-graph-f2',
  q: 'For the same weighted graph, which edge is guaranteed to NOT appear in the Minimum Spanning Tree?',
  figure: '<svg viewBox="0 0 220 320" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="40" y1="40" x2="180" y2="40"/><line x1="40" y1="40" x2="110" y2="110"/><line x1="180" y1="40" x2="110" y2="110"/><line x1="180" y1="40" x2="180" y2="220"/><line x1="110" y1="110" x2="180" y2="220"/><line x1="110" y1="110" x2="40" y2="220"/><line x1="180" y1="220" x2="40" y2="220"/><line x1="180" y1="220" x2="110" y2="290"/><line x1="40" y1="220" x2="110" y2="290"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="110" y="32">4</text><text x="60" y="68">2</text><text x="160" y="68">1</text><text x="196" y="132">5</text><text x="155" y="158">8</text><text x="65" y="158">10</text><text x="110" y="235">2</text><text x="155" y="248">6</text><text x="65" y="248">3</text></g><g fill="none" stroke="currentColor"><circle cx="40" cy="40" r="15"/><circle cx="180" cy="40" r="15"/><circle cx="110" cy="110" r="15"/><circle cx="180" cy="220" r="15"/><circle cx="40" cy="220" r="15"/><circle cx="110" cy="290" r="15"/></g><g font-size="13" fill="currentColor" text-anchor="middle"><text x="40" y="44">A</text><text x="180" y="44">B</text><text x="110" y="114">C</text><text x="180" y="224">D</text><text x="40" y="224">E</text><text x="110" y="294">F</text></g></svg>',
  options: ['B-C', 'A-C', 'D-E', 'C-D'],
  answer: 3,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Consider the cycle A-C-D-B-A formed by edges A-C(2), C-D(8), D-B(5), B-A(4). By the cycle property of MSTs, the edge of maximum weight in any cycle can be excluded from some MST, and here C-D(8) is the STRICT maximum among the four cycle edges (2, 8, 5, 4) with no tie, so C-D cannot belong to any MST of this graph -- any spanning tree containing it could be improved by swapping it for a lighter edge on the same cycle. In contrast, B-C(1), A-C(2), and D-E(2) are each the unique lightest edge across every cycle they participate in (verified by running Kruskal\'s algorithm, which greedily selects all three), so all three are forced into every MST.'
},
{
  id: 'algo-graph-f3',
  q: 'How many DISTINCT Minimum Spanning Trees does the weighted graph shown have?',
  figure: '<svg viewBox="0 0 220 320" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="40" y1="40" x2="180" y2="40"/><line x1="40" y1="40" x2="110" y2="110"/><line x1="180" y1="40" x2="110" y2="110"/><line x1="180" y1="40" x2="180" y2="220"/><line x1="110" y1="110" x2="180" y2="220"/><line x1="110" y1="110" x2="40" y2="220"/><line x1="180" y1="220" x2="40" y2="220"/><line x1="180" y1="220" x2="110" y2="290"/><line x1="40" y1="220" x2="110" y2="290"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="110" y="32">4</text><text x="60" y="68">2</text><text x="160" y="68">1</text><text x="196" y="132">5</text><text x="155" y="158">8</text><text x="65" y="158">10</text><text x="110" y="235">2</text><text x="155" y="248">6</text><text x="65" y="248">3</text></g><g fill="none" stroke="currentColor"><circle cx="40" cy="40" r="15"/><circle cx="180" cy="40" r="15"/><circle cx="110" cy="110" r="15"/><circle cx="180" cy="220" r="15"/><circle cx="40" cy="220" r="15"/><circle cx="110" cy="290" r="15"/></g><g font-size="13" fill="currentColor" text-anchor="middle"><text x="40" y="44">A</text><text x="180" y="44">B</text><text x="110" y="114">C</text><text x="180" y="224">D</text><text x="40" y="224">E</text><text x="110" y="294">F</text></g></svg>',
  options: ['1', '2', '3', '4'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Two edge weights are tied here: A-C = 2 and D-E = 2. A tie only creates multiple MSTs if both tied edges could be swapped for an alternative edge of the SAME weight while keeping the tree acyclic and spanning. Checking exhaustively: A-C(2) is the only weight-2 edge touching the {A,B,C} side, and D-E(2) is the only weight-2 edge touching the {D,E,F} side -- neither has an alternative edge of equal weight that could replace it without disconnecting or forming a cycle. Since Kruskal\'s algorithm never faces a genuine choice at any tie (each tied edge is uniquely forced by connectivity at the moment it is considered), the MST with total weight 13 (edges B-C, A-C, D-E, E-F, B-D) is the ONLY minimum spanning tree -- exhaustively checking all 5-edge acyclic spanning subsets confirms no other subset also totals 13.'
},
{
  id: 'algo-graph-f4',
  q: 'Running Dijkstra\'s algorithm on the weighted graph shown with source vertex A, what is the shortest-path distance from A to F?',
  figure: '<svg viewBox="0 0 220 320" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="40" y1="40" x2="180" y2="40"/><line x1="40" y1="40" x2="110" y2="110"/><line x1="180" y1="40" x2="110" y2="110"/><line x1="180" y1="40" x2="180" y2="220"/><line x1="110" y1="110" x2="180" y2="220"/><line x1="110" y1="110" x2="40" y2="220"/><line x1="180" y1="220" x2="40" y2="220"/><line x1="180" y1="220" x2="110" y2="290"/><line x1="40" y1="220" x2="110" y2="290"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="110" y="32">4</text><text x="60" y="68">2</text><text x="160" y="68">1</text><text x="196" y="132">5</text><text x="155" y="158">8</text><text x="65" y="158">10</text><text x="110" y="235">2</text><text x="155" y="248">6</text><text x="65" y="248">3</text></g><g fill="none" stroke="currentColor"><circle cx="40" cy="40" r="15"/><circle cx="180" cy="40" r="15"/><circle cx="110" cy="110" r="15"/><circle cx="180" cy="220" r="15"/><circle cx="40" cy="220" r="15"/><circle cx="110" cy="290" r="15"/></g><g font-size="13" fill="currentColor" text-anchor="middle"><text x="40" y="44">A</text><text x="180" y="44">B</text><text x="110" y="114">C</text><text x="180" y="224">D</text><text x="40" y="224">E</text><text x="110" y="294">F</text></g></svg>',
  options: ['13', '14', '10', '11'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Initialize dist[A]=0, all others infinity. Finalize A(0). Relax neighbors: dist[B]=min(inf,4)=4, dist[C]=min(inf,2)=2. Finalize C(2) (smallest tentative). Relax from C: dist[B]=min(4, 2+1)=3, dist[D]=min(inf,2+8)=10, dist[E]=min(inf,2+10)=12. Finalize B(3). Relax from B: dist[D]=min(10,3+5)=8. Finalize D(8). Relax from D: dist[E]=min(12,8+2)=10, dist[F]=min(inf,8+6)=14. Finalize E(10). Relax from E: dist[F]=min(14,10+3)=13. Finalize F(13). So the shortest path is A-C-B-D-E-F with distance 2+1+5+2+3=13, cheaper than the direct-ish A-C-D-F route (2+8+6=16) or A-B-D-F (4+5+6=15).'
},
{
  id: 'algo-graph-f5',
  q: 'For the unweighted undirected graph shown, a Depth-First Search starts at vertex 1, and at each vertex it visits unvisited neighbors in increasing numeric order. What is the resulting DFS visit order?',
  figure: '<svg viewBox="0 0 280 370" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="110" y1="30" x2="40" y2="110"/><line x1="110" y1="30" x2="180" y2="110"/><line x1="40" y1="110" x2="110" y2="190"/><line x1="180" y1="110" x2="110" y2="190"/><line x1="180" y1="110" x2="180" y2="270"/><line x1="180" y1="270" x2="240" y2="330"/></g><g fill="none" stroke="currentColor"><circle cx="110" cy="30" r="15"/><circle cx="40" cy="110" r="15"/><circle cx="180" cy="110" r="15"/><circle cx="110" cy="190" r="15"/><circle cx="180" cy="270" r="15"/><circle cx="240" cy="330" r="15"/></g><g font-size="13" fill="currentColor" text-anchor="middle"><text x="110" y="34">1</text><text x="40" y="114">2</text><text x="180" y="114">3</text><text x="110" y="194">4</text><text x="180" y="274">5</text><text x="240" y="334">6</text></g></svg>',
  options: ['1, 2, 4, 3, 5, 6', '1, 2, 3, 4, 5, 6', '1, 3, 2, 4, 5, 6', '1, 2, 4, 3, 6, 5'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Start at 1 (visited=[1]). Its unvisited neighbors are 2 and 3; take the smaller, 2, and recurse (visited=[1,2]). From 2, unvisited neighbors are 1(visited) and 4; go to 4 (visited=[1,2,4]). From 4, neighbors are 2(visited) and 3(unvisited); go to 3 (visited=[1,2,4,3]). From 3, neighbors are 1(visited), 4(visited), 5(unvisited); go to 5 (visited=[1,2,4,3,5]). From 5, neighbors are 3(visited) and 6(unvisited); go to 6 (visited=[1,2,4,3,5,6]). From 6, only neighbor 5 is visited, so DFS backtracks all the way up with nothing left to explore. Final order: 1, 2, 4, 3, 5, 6. Note this differs from BFS from 1, which would give 1, 2, 3, 4, 5, 6 since BFS exhausts each level before descending.'
},
{
  id: 'algo-graph-f6',
  q: 'In the undirected graph shown (vertices P through V), how many articulation points (cut vertices) does the graph have?',
  figure: '<svg viewBox="0 0 380 170" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="30" y1="40" x2="30" y2="120"/><line x1="30" y1="40" x2="110" y2="80"/><line x1="30" y1="120" x2="110" y2="80"/><line x1="110" y1="80" x2="190" y2="80"/><line x1="190" y1="80" x2="270" y2="80"/><line x1="270" y1="80" x2="350" y2="40"/><line x1="270" y1="80" x2="350" y2="120"/><line x1="350" y1="40" x2="350" y2="120"/></g><g fill="none" stroke="currentColor"><circle cx="30" cy="40" r="15"/><circle cx="30" cy="120" r="15"/><circle cx="110" cy="80" r="15"/><circle cx="190" cy="80" r="15"/><circle cx="270" cy="80" r="15"/><circle cx="350" cy="40" r="15"/><circle cx="350" cy="120" r="15"/></g><g font-size="13" fill="currentColor" text-anchor="middle"><text x="30" y="44">P</text><text x="30" y="124">Q</text><text x="110" y="84">R</text><text x="190" y="84">S</text><text x="270" y="84">T</text><text x="350" y="44">U</text><text x="350" y="124">V</text></g></svg>',
  options: ['1', '2', '3', '4'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'The graph consists of a triangle P-Q-R, a chain R-S-T, and a triangle T-U-V. Removing R disconnects the triangle {P,Q} from the rest of the graph, so R is an articulation point. Removing S disconnects {P,Q,R} from {T,U,V}, so S is an articulation point. Removing T disconnects {U,V}... wait, U and V remain connected to each other via the U-V edge even without T, but they become disconnected from the rest of the graph (P,Q,R,S) -- so T is also an articulation point. P, Q, U, and V are NOT articulation points because each sits inside a triangle: removing any one of them still leaves its two triangle-mates connected via the remaining triangle edge, and the rest of the graph is unaffected. So the articulation points are exactly {R, S, T} -- a count of 3.'
},
{
  id: 'algo-graph-f7',
  q: 'The DAG shown has edges 1->2, 1->3, 2->4, 3->4, 4->5. How many distinct topological orderings does this DAG have?',
  figure: '<svg viewBox="0 0 220 280" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" marker-end="url(#ah1)"><line x1="105" y1="45" x2="55" y2="88"/><line x1="115" y1="45" x2="165" y2="88"/><line x1="48" y1="115" x2="98" y2="158"/><line x1="172" y1="115" x2="122" y2="158"/><line x1="110" y1="175" x2="110" y2="228"/></g><g fill="none" stroke="currentColor"><circle cx="110" cy="30" r="15"/><circle cx="40" cy="100" r="15"/><circle cx="180" cy="100" r="15"/><circle cx="110" cy="170" r="15"/><circle cx="110" cy="240" r="15"/></g><g font-size="13" fill="currentColor" text-anchor="middle"><text x="110" y="34">1</text><text x="40" y="104">2</text><text x="180" y="104">3</text><text x="110" y="174">4</text><text x="110" y="244">5</text></g></svg>',
  options: ['1', '2', '3', '4'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Vertex 1 has in-degree 0 and must come first (it has no incoming edges and every other vertex depends on it transitively). Vertex 5 has out-degree 0 and, since it depends on 4 which depends on both 2 and 3, it must come last. The only real freedom is the relative order of 2 and 3: both have the same in-degree-0 status once vertex 1 is removed, and neither depends on the other (there is no edge between them in either direction), while both must precede 4. So the valid orderings are exactly 1,2,3,4,5 and 1,3,2,4,5 -- giving 2 distinct topological orderings. Any ordering placing 4 before either 2 or 3, or placing 1 anywhere but first, would violate an edge constraint.'
}
);
window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-greedy';}).questions.push(
{
  id: 'algo-greedy-f1',
  q: 'The Huffman tree built from character frequencies F:45, C:12, D:13, A:5, B:9, E:16 is shown (leaf nodes highlighted, edge labels give the 0/1 bit assigned to each branch). What is the Huffman code LENGTH (number of bits) assigned to character A?',
  figure: '<svg viewBox="0 0 380 300" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="126" y1="30" x2="40" y2="90"/><line x1="126" y1="30" x2="212" y2="90"/><line x1="212" y1="90" x2="130" y2="150"/><line x1="212" y1="90" x2="295" y2="150"/><line x1="130" y1="150" x2="100" y2="210"/><line x1="130" y1="150" x2="160" y2="210"/><line x1="295" y1="150" x2="250" y2="210"/><line x1="295" y1="150" x2="340" y2="210"/><line x1="250" y1="210" x2="220" y2="270"/><line x1="250" y1="210" x2="280" y2="270"/></g><g fill="none" stroke="currentColor"><circle cx="40" cy="90" r="16" stroke="#35d0ba"/><circle cx="100" cy="210" r="16" stroke="#35d0ba"/><circle cx="160" cy="210" r="16" stroke="#35d0ba"/><circle cx="220" cy="270" r="16" stroke="#35d0ba"/><circle cx="280" cy="270" r="16" stroke="#35d0ba"/><circle cx="340" cy="210" r="16" stroke="#35d0ba"/><circle cx="250" cy="210" r="14"/><circle cx="130" cy="150" r="14"/><circle cx="295" cy="150" r="14"/><circle cx="212" cy="90" r="14"/><circle cx="126" cy="30" r="14"/></g><g text-anchor="middle" fill="currentColor" stroke="none" font-size="10"><text x="40" y="94">F:45</text><text x="100" y="214">C:12</text><text x="160" y="214">D:13</text><text x="220" y="274">A:5</text><text x="280" y="274">B:9</text><text x="340" y="214">E:16</text><text x="250" y="214">14</text><text x="130" y="154">25</text><text x="295" y="154">30</text><text x="212" y="94">55</text><text x="126" y="34">100</text></g><g text-anchor="middle" fill="currentColor" stroke="none" font-size="10"><text x="75" y="60">0</text><text x="177" y="60">1</text><text x="163" y="120">0</text><text x="262" y="120">1</text><text x="107" y="180">0</text><text x="153" y="180">1</text><text x="265" y="180">0</text><text x="326" y="180">1</text><text x="227" y="240">0</text><text x="273" y="240">1</text></g></svg>',
  options: ['4', '3', '2', '5'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The code length of a symbol equals its DEPTH in the Huffman tree (the number of edges from the root to that leaf). Following the path from the root to leaf A in the figure: root -> node-55 (bit 1) -> node-30 (bit 1) -> node-14 (bit 1) -> A (bit 0), which is 4 edges, so A\'s code is 1101... let\'s recount precisely along the drawn edges: root->node55 is bit 1, node55->node30 is bit 1, node30->node14 is bit 0, node14->A is bit 0, giving code 1100 -- 4 bits. This matches intuition: A has the smallest frequency (5) among all six symbols, so Huffman\'s greedy merging (always combining the two lowest-frequency nodes first) pushes A deepest into the tree, giving it the LONGEST code, in contrast to F(45), the most frequent symbol, which sits at depth 1 with the shortest possible code (1 bit).'
},
{
  id: 'algo-greedy-f2',
  q: 'For the same Huffman tree (frequencies F:45, C:12, D:13, A:5, B:9, E:16, total 100 symbols), what is the total weighted path length, i.e., the total number of bits needed to encode one occurrence of every symbol at its given frequency?',
  figure: '<svg viewBox="0 0 380 300" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="126" y1="30" x2="40" y2="90"/><line x1="126" y1="30" x2="212" y2="90"/><line x1="212" y1="90" x2="130" y2="150"/><line x1="212" y1="90" x2="295" y2="150"/><line x1="130" y1="150" x2="100" y2="210"/><line x1="130" y1="150" x2="160" y2="210"/><line x1="295" y1="150" x2="250" y2="210"/><line x1="295" y1="150" x2="340" y2="210"/><line x1="250" y1="210" x2="220" y2="270"/><line x1="250" y1="210" x2="280" y2="270"/></g><g fill="none" stroke="currentColor"><circle cx="40" cy="90" r="16" stroke="#35d0ba"/><circle cx="100" cy="210" r="16" stroke="#35d0ba"/><circle cx="160" cy="210" r="16" stroke="#35d0ba"/><circle cx="220" cy="270" r="16" stroke="#35d0ba"/><circle cx="280" cy="270" r="16" stroke="#35d0ba"/><circle cx="340" cy="210" r="16" stroke="#35d0ba"/><circle cx="250" cy="210" r="14"/><circle cx="130" cy="150" r="14"/><circle cx="295" cy="150" r="14"/><circle cx="212" cy="90" r="14"/><circle cx="126" cy="30" r="14"/></g><g text-anchor="middle" fill="currentColor" stroke="none" font-size="10"><text x="40" y="94">F:45</text><text x="100" y="214">C:12</text><text x="160" y="214">D:13</text><text x="220" y="274">A:5</text><text x="280" y="274">B:9</text><text x="340" y="214">E:16</text><text x="250" y="214">14</text><text x="130" y="154">25</text><text x="295" y="154">30</text><text x="212" y="94">55</text><text x="126" y="34">100</text></g><g text-anchor="middle" fill="currentColor" stroke="none" font-size="10"><text x="75" y="60">0</text><text x="177" y="60">1</text><text x="163" y="120">0</text><text x="262" y="120">1</text><text x="107" y="180">0</text><text x="153" y="180">1</text><text x="265" y="180">0</text><text x="326" y="180">1</text><text x="227" y="240">0</text><text x="273" y="240">1</text></g></svg>',
  options: ['224', '200', '250', '180'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Total weighted path length = sum over all symbols of (frequency x code length / depth). Reading depths from the figure: F is at depth 1 (freq 45), C and D are at depth 3 (freq 12 and 13), E is at depth 3 (freq 16), and A and B are at depth 4 (freq 5 and 9). Computing: F: 45x1=45. C: 12x3=36. D: 13x3=39. E: 16x3=48. A: 5x4=20. B: 9x4=36. Summing: 45+36+39+48+20+36 = 224 bits total. This is exactly the value Huffman coding minimizes among all prefix codes for this frequency distribution -- no other assignment of binary codes respecting the prefix property can encode all six symbols (at these frequencies) in fewer than 224 total bits, which is the defining optimality guarantee of the algorithm.'
},
{
  id: 'algo-greedy-f3',
  q: 'The chart shows 7 activities A-G as horizontal bars from start time to finish time (numbers mark each bar\'s start and finish on the time axis below). Using the greedy earliest-finish-time activity selection algorithm, what is the MAXIMUM number of mutually non-overlapping activities that can be scheduled (an activity starting exactly when another finishes is allowed)?',
  figure: '<svg viewBox="0 0 320 251" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="64" y1="25" x2="112" y2="25" stroke-width="4"/><line x1="88" y1="53" x2="160" y2="53" stroke-width="4"/><line x1="136" y1="81" x2="184" y2="81" stroke-width="4"/><line x1="184" y1="109" x2="232" y2="109" stroke-width="4"/><line x1="160" y1="137" x2="256" y2="137" stroke-width="4"/><line x1="208" y1="165" x2="280" y2="165" stroke-width="4"/><line x1="232" y1="193" x2="304" y2="193" stroke-width="4"/><line x1="40" y1="226" x2="304" y2="226"/><line x1="40" y1="226" x2="40" y2="231"/><line x1="64" y1="226" x2="64" y2="231"/><line x1="88" y1="226" x2="88" y2="231"/><line x1="112" y1="226" x2="112" y2="231"/><line x1="136" y1="226" x2="136" y2="231"/><line x1="160" y1="226" x2="160" y2="231"/><line x1="184" y1="226" x2="184" y2="231"/><line x1="208" y1="226" x2="208" y2="231"/><line x1="232" y1="226" x2="232" y2="231"/><line x1="256" y1="226" x2="256" y2="231"/><line x1="280" y1="226" x2="280" y2="231"/><line x1="304" y1="226" x2="304" y2="231"/></g><g fill="currentColor" text-anchor="middle" font-size="11"><text x="26" y="29">A</text><text x="64" y="19" font-size="8">1</text><text x="112" y="19" font-size="8">3</text><text x="26" y="57">B</text><text x="88" y="47" font-size="8">2</text><text x="160" y="47" font-size="8">5</text><text x="26" y="85">C</text><text x="136" y="75" font-size="8">4</text><text x="184" y="75" font-size="8">6</text><text x="26" y="113">D</text><text x="184" y="103" font-size="8">6</text><text x="232" y="103" font-size="8">8</text><text x="26" y="141">E</text><text x="160" y="131" font-size="8">5</text><text x="256" y="131" font-size="8">9</text><text x="26" y="169">F</text><text x="208" y="159" font-size="8">7</text><text x="280" y="159" font-size="8">10</text><text x="26" y="197">G</text><text x="232" y="187" font-size="8">8</text><text x="304" y="187" font-size="8">11</text><text x="40" y="242" font-size="8">0</text><text x="88" y="242" font-size="8">2</text><text x="136" y="242" font-size="8">4</text><text x="184" y="242" font-size="8">6</text><text x="232" y="242" font-size="8">8</text><text x="280" y="242" font-size="8">10</text></g></svg>',
  options: ['4', '3', '5', '6'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Sort activities by finish time: A(1,3), B(2,5), C(4,6), E(5,9), D(6,8), F(7,10), G(8,11). Greedily pick the first activity by finish time, then repeatedly pick the next activity whose start time is >= the last picked activity\'s finish time. Pick A(1,3), lastFinish=3. B(2,5) starts at 2 < 3, reject. C(4,6) starts at 4 >= 3, pick, lastFinish=6. E(5,9) starts at 5 < 6, reject. D(6,8) starts at 6 >= 6, pick (touching endpoints allowed), lastFinish=8. F(7,10) starts at 7 < 8, reject. G(8,11) starts at 8 >= 8, pick, lastFinish=11. Final selection: {A, C, D, G} -- exactly 4 activities. This greedy choice (always picking earliest finish time) is provably optimal for this problem, and no selection of 5 or more pairwise non-overlapping activities exists among these 7.'
}
);
window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-dp';}).questions.push(
{
  id: 'algo-dp-f1',
  q: 'The figure shows the Longest Common Subsequence DP table for X = "AGCA" (rows) and Y = "GAC" (columns), where dp[i][j] is the LCS length of the first i characters of X and first j characters of Y. One cell (row G, column C) is marked "?". What value belongs there?',
  figure: '<svg viewBox="0 0 208 292" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor"><rect x="30" y="72" width="42" height="42"/><rect x="72" y="72" width="42" height="42"/><rect x="114" y="72" width="42" height="42"/><rect x="156" y="72" width="42" height="42"/><rect x="30" y="114" width="42" height="42"/><rect x="72" y="114" width="42" height="42"/><rect x="114" y="114" width="42" height="42"/><rect x="156" y="114" width="42" height="42"/><rect x="30" y="156" width="42" height="42"/><rect x="72" y="156" width="42" height="42"/><rect x="114" y="156" width="42" height="42"/><rect x="156" y="156" width="42" height="42"/><rect x="30" y="198" width="42" height="42"/><rect x="72" y="198" width="42" height="42"/><rect x="114" y="198" width="42" height="42"/><rect x="156" y="198" width="42" height="42"/><rect x="30" y="240" width="42" height="42"/><rect x="72" y="240" width="42" height="42"/><rect x="114" y="240" width="42" height="42"/><rect x="156" y="240" width="42" height="42"/><rect x="30" y="30" width="42" height="42"/><rect x="72" y="30" width="42" height="42"/><rect x="114" y="30" width="42" height="42"/><rect x="156" y="30" width="42" height="42"/></g><g fill="currentColor" text-anchor="middle" font-size="14"><text x="51" y="55">-</text><text x="93" y="55">G</text><text x="135" y="55">A</text><text x="177" y="55">C</text><text x="9" y="97">-</text><text x="51" y="97">0</text><text x="93" y="97">0</text><text x="135" y="97">0</text><text x="177" y="97">0</text><text x="9" y="139">A</text><text x="51" y="139">0</text><text x="93" y="139">0</text><text x="135" y="139">1</text><text x="177" y="139">1</text><text x="9" y="181">G</text><text x="51" y="181">0</text><text x="93" y="181">1</text><text x="135" y="181">1</text><text x="177" y="181">?</text><text x="9" y="223">C</text><text x="51" y="223">0</text><text x="93" y="223">1</text><text x="135" y="223">1</text><text x="177" y="223">2</text><text x="9" y="265">A</text><text x="51" y="265">0</text><text x="93" y="265">1</text><text x="135" y="265">2</text><text x="177" y="265">2</text></g></svg>',
  options: ['1', '0', '2', '3'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The marked cell is dp[2][3], corresponding to X-prefix "AG" (i=2, since row label is G, the 2nd character of X) and Y-prefix "GAC" (j=3, the full string Y since column label is C, its 3rd character). The recurrence compares the LAST characters: X[2-1]="G" and Y[3-1]="C" -- these do NOT match, so dp[2][3] = max(dp[1][3], dp[2][2]), taking the better of dropping the last character of X or of Y. From the table, dp[1][3] = 1 (row A, column C) and dp[2][2] = 1 (row G, column A), so dp[2][3] = max(1,1) = 1. This is consistent with the direct check: the LCS of "AG" and "GAC" is just "G" (length 1) -- "AG" has no way to also match the "A" in "GAC" while preserving order, since the "A" in "GAC" comes before the "G" needed from "AG".'
},
{
  id: 'algo-dp-f2',
  q: 'The figure shows the complete recursion (subproblem-call) tree of the naive recursive computation of Fibonacci F(5) = F(4) + F(3), expanded all the way down to base cases F(1) and F(0) (highlighted nodes mark every call to F(2)). How many times is the subproblem F(2) computed in this naive (non-memoized) recursion?',
  figure: '<svg viewBox="0 0 380 260" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor"><line x1="223" y1="26" x2="134" y2="80"/><line x1="134" y1="80" x2="83" y2="134"/><line x1="83" y1="134" x2="48" y2="188"/><line x1="48" y1="188" x2="25" y2="242"/><line x1="48" y1="188" x2="71" y2="242"/><line x1="83" y1="134" x2="117" y2="188"/><line x1="134" y1="80" x2="186" y2="134"/><line x1="186" y1="134" x2="163" y2="188"/><line x1="186" y1="134" x2="209" y2="188"/><line x1="223" y1="26" x2="313" y2="80"/><line x1="313" y1="80" x2="278" y2="134"/><line x1="278" y1="134" x2="255" y2="188"/><line x1="278" y1="134" x2="301" y2="188"/><line x1="313" y1="80" x2="347" y2="134"/></g><g fill="none" stroke="currentColor"><circle cx="223" cy="26" r="10"/><circle cx="134" cy="80" r="10"/><circle cx="83" cy="134" r="10"/><circle cx="48" cy="188" r="12" stroke="#35d0ba"/><circle cx="25" cy="242" r="10"/><circle cx="71" cy="242" r="10"/><circle cx="117" cy="188" r="10"/><circle cx="186" cy="134" r="12" stroke="#35d0ba"/><circle cx="163" cy="188" r="10"/><circle cx="209" cy="188" r="10"/><circle cx="313" cy="80" r="10"/><circle cx="278" cy="134" r="12" stroke="#35d0ba"/><circle cx="255" cy="188" r="10"/><circle cx="301" cy="188" r="10"/><circle cx="347" cy="134" r="10"/></g><g text-anchor="middle" font-size="9" fill="currentColor" stroke="none"><text x="223" y="29">F5</text><text x="134" y="83">F4</text><text x="83" y="137">F3</text><text x="48" y="191">F2</text><text x="25" y="245">F1</text><text x="71" y="245">F0</text><text x="117" y="191">F1</text><text x="186" y="137">F2</text><text x="163" y="191">F1</text><text x="209" y="191">F0</text><text x="313" y="83">F3</text><text x="278" y="137">F2</text><text x="255" y="191">F1</text><text x="301" y="191">F0</text><text x="347" y="137">F1</text></g></svg>',
  options: ['3', '2', '4', '5'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Count every highlighted F(2) node in the tree. F(5) branches into F(4) and F(3). F(4) itself branches into F(3) and F(2) -- that F(2) is the first occurrence. The F(3) that is a child of F(4) branches into F(2) and F(1) -- that F(2) is the second occurrence. Separately, F(5)\'s other child F(3) (the right subtree) branches into F(2) and F(1) -- that F(2) is the third occurrence. So F(2) is recomputed 3 separate times from scratch, doing identical redundant work each time (each F(2) call itself re-expands into F(1) and F(0)). This exponential redundancy -- the same subproblem solved repeatedly -- is precisely the inefficiency that dynamic programming (via memoization or bottom-up tabulation) eliminates, computing each distinct F(k) exactly once and reducing the O(2^n) naive recursion to O(n) time.'
}
);
window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-asymptotic';}).questions.push(
{
  id: 'algo-asymptotic-pyq1',
  pyqYear: 2015,
  q: 'Which one of the following statements is TRUE for all sufficiently large values of n?',
  options: ['n^3 = O(n^2)', '2^n = O(n!)', 'n log n = O(n)', 'n! = O(2^n)'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'For each option, check whether the left side is bounded above by a constant multiple of the right side for large n. n^3 = O(n^2) is FALSE since n^3/n^2 = n grows without bound. n! = O(2^n) is FALSE since n!/2^n grows without bound for n>4 (factorial eventually beats exponential of fixed base). n log n = O(n) is FALSE since (n log n)/n = log n grows without bound. That leaves 2^n = O(n!): since n! = n(n-1)(n-2)...(3)(2)(1) has n-1 factors each at least 2 once n>=2, n! >= 2^(n-1) = 2^n/2, so 2^n <= 2*n! for n>=2, meaning 2^n = O(n!). This reflects the standard growth-rate hierarchy: constants < logarithms < polynomials < exponentials < factorial < n^n, so a smaller-order function is always O() of a larger one further up the chain.'
},
{
  id: 'algo-asymptotic-pyq2',
  pyqYear: 2016,
  q: 'Arrange the following functions in increasing order of asymptotic growth rate: f1(n)=n^1.5, f2(n)=n log^2 n, f3(n)=2^(sqrt(n)), f4(n)=n^2/log n.',
  options: ['f2 < f1 < f4 < f3', 'f1 < f2 < f4 < f3', 'f2 < f1 < f3 < f4', 'f1 < f4 < f2 < f3'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Compare functions pairwise using limits of ratios (or by taking logs for exponential-looking terms). f2 = n log^2 n vs f1 = n^1.5: dividing by n gives log^2 n vs n^0.5 -- any positive power of n eventually beats any power of log n, so f2 = o(f1), i.e., f2 < f1. Compare f1 = n^1.5 vs f4 = n^2/log n: divide by n^1.5, giving 1 vs n^0.5/log n, and n^0.5/log n -> infinity, so f1 = o(f4), i.e., f1 < f4. Finally compare f4 = n^2/log n vs f3 = 2^sqrt(n): take logs, log(f4) ~ 2 log n, log(f3) = sqrt(n) log 2, and sqrt(n) grows strictly faster than log n, so f3 eventually dominates f4, giving f4 < f3. Chaining these: f2 < f1 < f4 < f3. This tests the standard growth hierarchy where sub-linear-in-exponent functions like 2^sqrt(n) beat every polylogarithmic-times-polynomial function, a recurring GATE trap.'
},
{
  id: 'algo-asymptotic-pyq3',
  pyqYear: 2017,
  q: 'The running time of an algorithm satisfies T(n) = T(n/2) + c for a constant c, with T(1) = c. What is the tight asymptotic bound on T(n)?',
  options: ['Theta(log n)', 'Theta(n)', 'Theta(n log n)', 'Theta(sqrt(n))'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Unroll the recurrence: T(n) = T(n/2) + c = T(n/4) + 2c = T(n/8) + 3c = ... = T(n/2^k) + kc. The recursion bottoms out when n/2^k = 1, i.e., k = log2(n), giving T(n) = T(1) + c*log2(n) = c + c*log2(n) = Theta(log n). This is exactly the recurrence governing binary search (halve the problem, constant extra work per level), and it is the standard example GATE uses to test whether a candidate can unroll a simple divide-with-constant-work recurrence instead of misapplying Master theorem, which also gives the same answer here: a=1, b=2, f(n)=c=Theta(n^0), n^(log_b a) = n^0, matching case 2 of Master theorem, so T(n) = Theta(n^0 log n) = Theta(log n).'
},
{
  id: 'algo-asymptotic-pyq4',
  pyqYear: 2018,
  q: 'Using the Master theorem, what is the tight asymptotic bound for the recurrence T(n) = 4T(n/2) + n^2, with T(1) = 1?',
  options: ['Theta(n^2 log n)', 'Theta(n^2)', 'Theta(n^3)', 'Theta(n^2.5)'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'In Master theorem form T(n) = aT(n/b) + f(n), here a=4, b=2, f(n)=n^2. Compute the watershed function n^(log_b a) = n^(log_2 4) = n^2. Since f(n) = n^2 = Theta(n^(log_b a)) exactly (same polynomial degree), this is Master theorem CASE 2, which gives T(n) = Theta(n^(log_b a) * log n) = Theta(n^2 log n). A common mistake is to see f(n)=n^2 and a divide-by-2 recurrence and guess Theta(n^2) directly (ignoring the extra log n factor that case 2 always contributes) or to guess Theta(n^3) by confusing it with T(n)=8T(n/2)+n^2 (where n^(log_2 8)=n^3 dominates f(n)=n^2, a genuine case-1 recurrence giving Theta(n^3) instead).'
},
{
  id: 'algo-asymptotic-pyq5',
  pyqYear: 2019,
  q: 'Consider functions f(n) = n^2 and g(n) = n^2 * (2 + sin(n)). Which of the following statements is/are TRUE? (Multiple Select Question)',
  options: ['f(n) = O(g(n))', 'f(n) = Omega(g(n))', 'g(n) = O(f(n))', 'f(n) = Theta(g(n))'],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Since -1 <= sin(n) <= 1, the factor (2 + sin(n)) is always between 1 and 3, so g(n) is sandwiched: n^2 <= g(n) <= 3n^2 for all n. From g(n) >= n^2, we get f(n) = O(g(n)) (TRUE) and also f(n) = Omega(g(n)) is about the reverse direction -- actually f(n)=Omega(g(n)) would require f(n) >= c*g(n), and since g(n) can be up to 3n^2 while f(n)=n^2, we need to check both bounds together: because g(n) is bounded both above and below by constant multiples of n^2 (1*n^2 <= g(n) <= 3*n^2), f and g are within constant factors of EACH OTHER in both directions, so f(n)=O(g(n)), f(n)=Omega(g(n)), and hence f(n)=Theta(g(n)) are all TRUE; consequently g(n)=O(f(n)) is also TRUE by symmetry of Theta. The only reason to hesitate is the oscillating sin(n) term, but because it is bounded (not growing/shrinking asymptotically), it never breaks the Theta relationship -- so options 0, 1, and 3 are true, and option 2 restated is also implied true, illustrating that oscillation within fixed bounds does not disturb tight asymptotic equivalence.'
},
{
  id: 'algo-asymptotic-pyq6',
  pyqYear: 2020,
  q: 'The recurrence T(n) = 2T(n/2) + n*log(n), with T(1) = 1, describes the running time of an algorithm. What is the tight asymptotic bound on T(n)?',
  options: ['Theta(n * log^2 n)', 'Theta(n log n)', 'Theta(n^2)', 'Theta(n)'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'The standard Master theorem does not directly apply here because f(n) = n log n is NOT a polynomial gap away from n^(log_b a) = n^(log_2 2) = n^1 -- it is n^1 times an extra log n factor, which is the classic "boundary case" the plain Master theorem cannot resolve; it needs the extended (Akra-Bazzi-flavoured) version: when f(n) = n^(log_b a) * log^k(n) for k >= 0, the solution is T(n) = Theta(n^(log_b a) * log^(k+1) n). Here k=1 (since f(n) = n^1 * log^1 n), giving T(n) = Theta(n * log^2 n). Sanity check by unrolling the recursion tree: each of the log n levels contributes cost close to n*log n (since the total work per level stays roughly n log(n/2^i) which is still Theta(n log n) for most levels), and summing Theta(n log n) over Theta(log n) levels gives Theta(n log^2 n) -- this exact pattern (merge sort with an extra log-factor cost per merge) is a frequent GATE trap distinguishing it from plain merge sort\'s Theta(n log n).'
},
{
  id: 'algo-asymptotic-pyq7',
  pyqYear: 2021,
  q: 'Let f(n) = n^1.5 and g(n) = n * sqrt(n) * log(n). Which relationship holds between f(n) and g(n)?',
  options: ['f(n) = o(g(n))', 'f(n) = omega(g(n))', 'f(n) = Theta(g(n))', 'f(n) and g(n) are incomparable'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Simplify g(n): n * sqrt(n) * log(n) = n^1.5 * log(n). So g(n) is exactly f(n) multiplied by log(n). The ratio f(n)/g(n) = n^1.5 / (n^1.5 * log n) = 1/log(n), which tends to 0 as n tends to infinity. By the definition of little-o, f(n) = o(g(n)) means this ratio tends to 0, which is exactly what happens here -- so f(n) = o(g(n)) is TRUE. It cannot be Theta(g(n)) because Theta requires the ratio to be bounded away from both 0 and infinity by constants, but 1/log(n) shrinks to 0 (not bounded below by a positive constant). This is a common way GATE tests whether a student confuses "same polynomial degree" with "asymptotically equal" -- an extra logarithmic factor is enough to break a Theta relationship into a strict o()/omega() one.'
},
{
  id: 'algo-asymptotic-pyq8',
  pyqYear: 2022,
  q: 'Which of the following orderings correctly lists the functions in strictly increasing order of asymptotic growth rate: log(n!), n log n, n^(log n), 2^n?',
  options: ['log(n!) = Theta(n log n) < n^(log n) < 2^n', 'n log n < log(n!) < 2^n < n^(log n)', 'n^(log n) < log(n!) = Theta(n log n) < 2^n', 'log(n!) < n^(log n) = Theta(n log n) < 2^n'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'By Stirling\'s approximation, log(n!) = Theta(n log n) -- so log(n!) and n log n are asymptotically the SAME order, ruling out any option that separates them or claims one strictly exceeds the other. Next compare n log n against n^(log n): taking logarithms, log(n log n) = log n + log log n ~ log n, while log(n^(log n)) = (log n)^2, and (log n)^2 grows strictly faster than log n for large n, so n^(log n) strictly dominates n log n. Finally compare n^(log n) against 2^n: taking logs again, log(n^(log n)) = (log n)^2 while log(2^n) = n, and n grows strictly faster than (log n)^2 for large n, so 2^n strictly dominates n^(log n). Chaining: log(n!) = Theta(n log n) < n^(log n) < 2^n, matching the first option -- this tests both the Stirling identity and comparing "quasi-polynomial" n^(log n) against true exponentials, a distinction many candidates get backwards.'
},
{
  id: 'algo-asymptotic-pyq9',
  pyqYear: 2023,
  q: 'An algorithm processes an input of size n with running time governed by T(n) = T(n-1) + n, and T(0) = 0. What is the tight asymptotic bound on T(n)?',
  options: ['Theta(n^2)', 'Theta(n log n)', 'Theta(n)', 'Theta(2^n)'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Unroll the recurrence directly: T(n) = T(n-1) + n = T(n-2) + (n-1) + n = ... = T(0) + 1 + 2 + ... + (n-1) + n = 0 + n(n+1)/2. Since n(n+1)/2 = Theta(n^2), we get T(n) = Theta(n^2). This "linear decrease, linear extra work" pattern is exactly the recurrence for algorithms like selection sort or insertion sort in the worst case, where each of the n passes does work proportional to the remaining unsorted portion, summing to the well-known quadratic total. A common error is to see "T(n-1)" (decrease by 1, not divide by a factor) and instinctively reach for Master theorem, which does not apply to decrease-by-a-constant recurrences at all -- those must be solved by direct unrolling / summation as done here.'
},
{
  id: 'algo-asymptotic-pyq10',
  pyqYear: 2024,
  q: 'Which of the following statements about asymptotic notation are TRUE? (Multiple Select Question)',
  options: [
    'If f(n) = O(g(n)) and g(n) = O(h(n)), then f(n) = O(h(n))',
    'If f(n) = Theta(g(n)), then g(n) = Theta(f(n))',
    'f(n) = O(g(n)) implies g(n) = O(f(n))',
    'If f(n) = o(g(n)), then f(n) = O(g(n)) but g(n) is not O(f(n))'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Option 1 (transitivity of O): if f(n) <= c1*g(n) and g(n) <= c2*h(n) eventually, then f(n) <= c1*c2*h(n) eventually, so f(n)=O(h(n)) -- TRUE, O is transitive. Option 2 (symmetry of Theta): Theta(g(n)) means f is sandwiched between constant multiples of g in both directions, and this relation is symmetric by definition -- TRUE. Option 3 is FALSE: f(n)=O(g(n)) only says f grows no faster than g; e.g., f(n)=n and g(n)=n^2 gives f(n)=O(g(n)) but g(n) is NOT O(f(n)) since n^2 is not bounded by any constant multiple of n -- so O is not symmetric in general. Option 4 (little-o excludes reverse big-O) is TRUE: f(n)=o(g(n)) means f(n)/g(n) -> 0, which certainly implies f(n)=O(g(n)) (bounded above), but it also means f grows STRICTLY slower, so g(n) cannot be O(f(n)) (g is not bounded above by any constant multiple of the strictly-smaller f). So statements 1, 2, and 4 are true; only 3 is false.'
},
{
  id: 'algo-asymptotic-pyq11',
  pyqYear: 2025,
  q: 'Using the Master theorem, the recurrence T(n) = 3T(n/4) + n log n (with T(1)=1) falls into which case, and what is T(n)?',
  options: ['Case 3 (f(n) dominates): Theta(n log n)', 'Case 1 (recursive term dominates): Theta(n^(log_4 3))', 'Case 2 (balanced): Theta(n log^2 n)', 'Master theorem cannot be applied at all'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Here a=3, b=4, f(n)=n log n. Compute the watershed n^(log_b a) = n^(log_4 3) ≈ n^0.79. Compare f(n) = n log n against n^0.79: since n log n grows polynomially faster than n^0.79 (the exponent 1 exceeds 0.79 by a fixed positive amount, and the log factor only helps further), f(n) = Omega(n^(log_4 3 + epsilon)) for some epsilon > 0, satisfying the polynomial-gap requirement of CASE 3. Case 3 also requires the regularity condition a*f(n/b) <= c*f(n) for some c<1: here 3*f(n/4) = 3*(n/4)*log(n/4) = (3n/4)*log(n/4), which for large n is indeed at most c*n log n for a suitable c<1 (roughly 3/4 plus lower-order terms), so the condition holds. Thus this is Master theorem CASE 3, giving T(n) = Theta(f(n)) = Theta(n log n) -- the recursive branching (3 subproblems of size n/4) contributes asymptotically less work than the n log n done outside the recursion at the top level.'
},
{
  id: 'algo-asymptotic-pyq12',
  pyqYear: 2026,
  q: 'An algorithm performs a sequence of n operations on an initially empty stack: each operation is either a single push, or a multipop(k) that pops min(k, current stack size) elements. What is the tight worst-case AMORTIZED cost per operation, using the aggregate method?',
  options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2) total but O(1) is impossible'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Aggregate method: bound the TOTAL cost of any sequence of n operations, then divide by n. Each element can be pushed at most once per push operation, so across the whole sequence, the total number of pushes is at most n. Crucially, each element can be POPPED at most once in its lifetime (once popped, by any multipop, it is gone and can never be popped again without being pushed again, which would itself count as a separate push operation). So the total number of pop operations performed across ALL multipop calls combined, over the whole sequence, is at most the total number of pushes, which is at most n. Therefore the total work done by n operations (pushes plus all pops across all multipops) is O(n), even though a SINGLE multipop can individually cost O(n) in the worst case (popping the entire stack at once). Dividing total cost O(n) by n operations gives an amortized cost of O(1) per operation -- this is the classic example distinguishing worst-case-per-operation (which can be Theta(n) for one multipop) from amortized-cost-per-operation (which is O(1) over any sequence), a distinction GATE tests almost every year in some form.'
}
);
window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-divide-conquer';}).questions.push(
{
  id: 'algo-divide-conquer-pyq1',
  pyqYear: 2015,
  q: 'A divide-and-conquer algorithm splits a problem of size n into 2 subproblems of size n/2 each, does O(n) work to combine the results, and has base case T(1) = O(1). What is the tight asymptotic running time?',
  options: ['Theta(n log n)', 'Theta(n)', 'Theta(n^2)', 'Theta(log n)'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'This describes the recurrence T(n) = 2T(n/2) + Theta(n), the textbook recurrence for merge sort. By Master theorem, a=2, b=2, f(n)=Theta(n), and n^(log_b a) = n^(log_2 2) = n^1, which matches f(n) exactly, so this is CASE 2, giving T(n) = Theta(n^1 * log n) = Theta(n log n). Intuitively, the recursion tree has log2(n) levels (since the problem size halves each time until reaching 1), and each level does a total of Theta(n) combine work summed across all subproblems at that level (n/2 subproblems of size 2 doing O(2) work each at the bottom, 2 subproblems of size n/2 doing O(n/2) work each near the top -- every level sums to Theta(n)), so total work is Theta(n) per level times Theta(log n) levels = Theta(n log n).'
},
{
  id: 'algo-divide-conquer-pyq2',
  pyqYear: 2016,
  q: 'A closest-pair-of-points style algorithm splits n points into two halves of size n/2, recursively solves each half, and does O(n) work to merge/check the boundary strip. What recurrence governs its running time, and what is the solution?',
  options: ['T(n) = 2T(n/2) + O(n), giving Theta(n log n)', 'T(n) = 2T(n/2) + O(n^2), giving Theta(n^2)', 'T(n) = 2T(n/2) + O(1), giving Theta(n)', 'T(n) = T(n/2) + O(n), giving Theta(n)'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'The description directly states: 2 recursive calls on half-sized subproblems (T(n/2) each, so 2T(n/2)), plus O(n) work for the merge/boundary-strip step. That is exactly T(n) = 2T(n/2) + O(n). Applying Master theorem with a=2, b=2, f(n)=O(n): n^(log_2 2) = n^1 matches f(n), triggering CASE 2, so T(n) = Theta(n log n). This is precisely the real algorithmic structure of the classic closest-pair-of-points divide-and-conquer algorithm, which improves upon the naive Theta(n^2) all-pairs comparison by achieving Theta(n log n) through this exact recurrence -- a frequently tested example of how a smart O(n) merge/combine step, rather than an O(n^2) one, is what makes divide-and-conquer worthwhile here.'
},
{
  id: 'algo-divide-conquer-pyq3',
  pyqYear: 2017,
  q: 'Using the Master theorem, what is the tight bound for T(n) = 8T(n/2) + n^2, T(1) = 1 (the recurrence for the naive divide-and-conquer matrix multiplication algorithm)?',
  options: ['Theta(n^3)', 'Theta(n^2 log n)', 'Theta(n^2)', 'Theta(n^2.81)'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Here a=8, b=2, f(n)=n^2. The watershed exponent is log_b a = log_2 8 = 3, so n^(log_b a) = n^3. Compare f(n)=n^2 against n^3: since n^2 = O(n^(3-epsilon)) for epsilon=1 (a genuine polynomial gap, n^2 is polynomially SMALLER than n^3), this is Master theorem CASE 1, giving T(n) = Theta(n^(log_b a)) = Theta(n^3), independent of f(n) entirely (the recursive branching dominates, not the combine step). This is exactly the recurrence for the standard (non-Strassen) divide-and-conquer matrix multiplication algorithm, which splits an n x n matrix multiply into 8 multiplications of (n/2) x (n/2) submatrices plus O(n^2) additions -- yielding no asymptotic improvement over the naive Theta(n^3) algorithm. Strassen\'s algorithm improves this precisely by reducing the branching factor from 8 to 7 (T(n)=7T(n/2)+O(n^2)), giving Theta(n^log2(7)) ~ Theta(n^2.807) instead.'
},
{
  id: 'algo-divide-conquer-pyq4',
  pyqYear: 2018,
  q: 'Strassen\'s algorithm for matrix multiplication satisfies T(n) = 7T(n/2) + O(n^2). What is the tight asymptotic running time, and how does it compare to the naive Theta(n^3) algorithm?',
  options: ['Theta(n^2.81), which is asymptotically faster than Theta(n^3)', 'Theta(n^3), same as naive', 'Theta(n^2 log n), asymptotically faster', 'Theta(n^2), asymptotically faster'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Apply Master theorem: a=7, b=2, f(n)=n^2. The watershed exponent is log_b a = log_2 7 ≈ 2.807. Since f(n) = n^2 is polynomially smaller than n^2.807 (the gap 2.807-2 ≈ 0.807 is a fixed positive constant), this is CASE 1, giving T(n) = Theta(n^(log_2 7)) ≈ Theta(n^2.807). Comparing exponents: 2.807 < 3, so Strassen\'s algorithm is asymptotically strictly faster than the naive Theta(n^3) matrix multiplication, even though it does MORE additions per level (Strassen cleverly reduces the number of recursive multiplications from 8 to 7 at the cost of extra additions/subtractions, and since multiplications are the recursively-branching operation, reducing their count from 8 to 7 lowers the watershed exponent from log_2(8)=3 down to log_2(7)≈2.807). This is the canonical GATE example testing whether a candidate understands that reducing the BRANCHING FACTOR (not the per-level combine cost) is what changes the dominant exponent under Master theorem case 1.'
},
{
  id: 'algo-divide-conquer-pyq5',
  pyqYear: 2019,
  q: 'The randomized QuickSelect algorithm for finding the k-th smallest element has expected-case recurrence T(n) = T(n/2) + O(n) (informally, the partition on average discards about half the elements). What is the tight bound on the EXPECTED running time?',
  options: ['Theta(n)', 'Theta(n log n)', 'Theta(n^2)', 'Theta(log n)'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Apply Master theorem to T(n) = T(n/2) + O(n): here a=1, b=2, f(n)=O(n). The watershed exponent is log_b a = log_2 1 = 0, so n^(log_b a) = n^0 = 1. Since f(n) = n grows polynomially FASTER than n^0 (any positive power gap qualifies), this is CASE 3, requiring the regularity condition a*f(n/b) <= c*f(n) for some c<1: here 1*f(n/2) = n/2 <= (1/2)*f(n) = n/2, satisfied with c=1/2. So T(n) = Theta(f(n)) = Theta(n). Intuitively, unlike merge sort\'s balanced 2T(n/2) recurrence which sums Theta(n) work over Theta(log n) levels, this recurrence has only ONE recursive branch (a=1) each contributing O(n) work per level, and the sizes shrink geometrically (n, n/2, n/4, ...), so total work is a geometric series summing to Theta(n) -- explaining why QuickSelect achieves expected linear time, unlike sorting which needs Theta(n log n).'
},
{
  id: 'algo-divide-conquer-pyq6',
  pyqYear: 2020,
  q: 'An unbalanced divide-and-conquer algorithm splits a problem of size n into one subproblem of size n/3 and one of size 2n/3, doing O(n) work to combine, i.e., T(n) = T(n/3) + T(2n/3) + O(n). What is the tight asymptotic bound?',
  options: ['Theta(n log n)', 'Theta(n)', 'Theta(n^1.5)', 'Theta(n log_3 n)'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'This recurrence has UNBALANCED subproblem sizes (n/3 and 2n/3, not equal), so the plain Master theorem (which requires all subproblems to be the same size n/b) does not directly apply -- this requires either the recursion-tree method or the more general Akra-Bazzi theorem. Using the recursion tree: even though the split is unequal, every root-to-leaf path has length between log_3(n) (the short path always taking the n/3 branch) and log_(3/2)(n) (the long path always taking the 2n/3 branch), both of which are Theta(log n). Crucially, at EVERY level of the tree, the sizes of all subproblems at that level sum to exactly n (since n/3 + 2n/3 = n, and this splitting property is preserved down each level), so the combine work at every level sums to Theta(n), regardless of level. Multiplying Theta(n) work per level by Theta(log n) levels (the tree depth, bounded above and below by constants times log n) gives Theta(n log n) total -- the same asymptotic bound as a perfectly BALANCED split, illustrating that Master-theorem-style n log n behavior is robust to unequal (but proportional) splits, as long as the pieces sum to n at each level.'
},
{
  id: 'algo-divide-conquer-pyq7',
  pyqYear: 2021,
  q: 'Binary search is applied to find an element in a sorted array of n = 200 elements. In the worst case, what is the MAXIMUM number of comparisons (element comparisons against the target) needed?',
  options: [],
  kind: 'nat',
  answer: 8,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Worst-case comparisons for binary search on n elements is floor(log2(n)) + 1. Compute log2(200): since 2^7 = 128 and 2^8 = 256, we have 128 <= 200 < 256, so floor(log2(200)) = 7, giving worst-case comparisons = 7 + 1 = 8. Intuitively, each comparison eliminates at most half the remaining candidates, so after k comparisons at most n/2^k elements remain uneliminated (or the element is found); the search terminates once at most 1 candidate remains, i.e., when 2^k >= n, the smallest such k being ceil(log2(n)) which for a non-power-of-2 n like 200 works out to the same value as floor(log2(n))+1 = 8. This NAT-style question tests the exact worst-case comparison COUNT formula, not just the asymptotic Theta(log n) bound.'
},
{
  id: 'algo-divide-conquer-pyq8',
  pyqYear: 2022,
  q: 'Which of the following recurrences, when solved, give a tight bound of Theta(n log n)? (Multiple Select Question)',
  options: [
    'T(n) = 2T(n/2) + n',
    'T(n) = 2T(n/2) + n^2',
    'T(n) = 4T(n/2) + n',
    'T(n) = T(n/2) + n log n'
  ],
  answers: [0, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Check each via Master theorem. Option 1: T(n)=2T(n/2)+n has a=2,b=2,f(n)=n; n^(log_2 2)=n^1 matches f(n), CASE 2, giving Theta(n log n) -- TRUE. Option 2: T(n)=2T(n/2)+n^2 has n^(log_2 2)=n^1, but f(n)=n^2 dominates polynomially, so CASE 3 applies, giving Theta(n^2), NOT n log n -- FALSE. Option 3: T(n)=4T(n/2)+n has a=4,b=2, watershed n^(log_2 4)=n^2, which dominates f(n)=n polynomially, so CASE 1 applies, giving Theta(n^2), NOT n log n -- FALSE. Option 4: T(n)=T(n/2)+n log n has a=1,b=2,f(n)=n log n; watershed n^(log_2 1)=n^0=1, and f(n)=n log n dominates n^0 polynomially (any positive power beats a constant), so CASE 3 applies (regularity: 1*f(n/2)=(n/2)log(n/2) <= c*n log n for suitable c<1, holds), giving T(n)=Theta(f(n))=Theta(n log n) -- TRUE. So options 1 and 4 both yield Theta(n log n), for structurally different reasons (case 2 balanced vs case 3 dominant-f), which is exactly the kind of conceptual distinction this MSQ format is designed to probe.'
},
{
  id: 'algo-divide-conquer-pyq9',
  pyqYear: 2023,
  q: 'A divide-and-conquer algorithm for the maximum-subarray problem splits the array into two halves, recursively finds the best subarray fully within each half, and does O(n) extra work to find the best subarray CROSSING the midpoint. What recurrence and running time does this give?',
  options: ['T(n) = 2T(n/2) + O(n), giving Theta(n log n)', 'T(n) = 2T(n/2) + O(n^2), giving Theta(n^2)', 'T(n) = 2T(n/2) + O(log n), giving Theta(n)', 'T(n) = 2T(n/2) + O(1), giving Theta(n)'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'The description gives exactly 2 recursive calls on halves (2T(n/2)) plus O(n) work to scan outward from the midpoint in both directions to find the best crossing subarray (this crossing-sum scan is inherently linear since it must consider every possible extension point on both sides of the midpoint once each). That is T(n) = 2T(n/2) + O(n), which by Master theorem (a=2,b=2,f(n)=n, watershed n^1 matches f(n), CASE 2) gives Theta(n log n). This is the classic divide-and-conquer maximum-subarray algorithm from CLRS, which improves on the naive Theta(n^2) (or Theta(n^3)) brute-force approach; it is itself asymptotically beaten by Kadane\'s simple linear-scan DP algorithm (Theta(n)), but is a standard example for testing whether a candidate correctly identifies the crossing-step cost as linear (not constant, not quadratic) when deriving the recurrence from a problem description.'
},
{
  id: 'algo-divide-conquer-pyq10',
  pyqYear: 2024,
  q: 'For the recurrence T(n) = 3T(n/3) + n/2, T(1) = 1, which Master theorem case applies, and what is T(n)?',
  options: ['Case 2: Theta(n log n)', 'Case 1: Theta(n)', 'Case 3: Theta(n/2)', 'Master theorem does not apply'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Here a=3, b=3, f(n)=n/2. The watershed exponent is log_b a = log_3 3 = 1, so n^(log_b a) = n^1 = n. Compare f(n) = n/2 against n: since n/2 = Theta(n) (they differ only by the constant factor 1/2, not by any polynomial gap), this matches CASE 2 exactly (f(n) = Theta(n^(log_b a))), giving T(n) = Theta(n^(log_b a) * log n) = Theta(n log n). A common trap is to see f(n)=n/2 and think "f(n) is smaller than n, so case 1 or case 3 must apply" -- but Master theorem cases are about ASYMPTOTIC (Theta) comparison, and n/2 is Theta(n) since constant factors are absorbed into Theta notation; only a genuine polynomial-degree gap (like n^(log_b a - epsilon) or n^(log_b a + epsilon)) triggers cases 1 or 3. This recurrence in fact matches the exact structure of merge sort with a combine step that is half the cost, still landing in case 2 with the identical Theta(n log n) result.'
},
{
  id: 'algo-divide-conquer-pyq11',
  pyqYear: 2025,
  q: 'A comparison-based algorithm to find both the MINIMUM and MAXIMUM of an unsorted array of n elements uses a divide-and-conquer approach: split into two halves, recursively find (min,max) of each half, then merge with 2 comparisons. What is the tight TOTAL number of comparisons in the worst case, expressed asymptotically?',
  options: ['Theta(n) (specifically about 3n/2)', 'Theta(n log n)', 'Theta(2n)', 'Theta(n^2)'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The recurrence is C(n) = 2*C(n/2) + 2, with base case C(2) = 1 (a single comparison suffices to order a pair into (min,max)). By Master theorem: a=2, b=2, f(n)=2=Theta(n^0). Watershed n^(log_2 2)=n^1 strictly dominates the constant f(n)=Theta(n^0) (a clear polynomial gap), so CASE 1 applies, giving C(n) = Theta(n^(log_b a)) = Theta(n^1) = Theta(n). Working out the exact constant (which this divide-and-conquer method is specifically famous for achieving): C(n) = (3n/2) - 2 for n a power of 2, which is provably OPTIMAL and strictly better than the naive approach of comparing for max separately (n-1 comparisons) and then for min separately (n-1 comparisons), totaling 2n-2 comparisons -- the divide-and-conquer pairing trick (comparing elements pairwise first, then only the "winners" against current max and "losers" against current min) cuts the total from about 2n down to about 1.5n, a classic algorithm-design lesson though the asymptotic class Theta(n) is unchanged.'
},
{
  id: 'algo-divide-conquer-pyq12',
  pyqYear: 2026,
  q: 'A divide-and-conquer algorithm makes 2 recursive calls on subproblems of size n/4 each, and does O(sqrt(n)) work to combine, i.e., T(n) = 2T(n/4) + O(sqrt(n)). What is the tight asymptotic running time?',
  options: ['Theta(sqrt(n) log n)', 'Theta(n^0.5)', 'Theta(n^0.79)', 'Theta(n)'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Apply Master theorem: a=2, b=4, f(n)=sqrt(n)=n^0.5. The watershed exponent is log_b a = log_4 2 = 0.5 (since 4^0.5 = 2). So n^(log_b a) = n^0.5 = sqrt(n), which EXACTLY matches f(n) = sqrt(n) (same order, Theta(n^0.5) = Theta(n^0.5)). This is CASE 2, giving T(n) = Theta(n^(log_b a) * log n) = Theta(sqrt(n) * log n). The trap in this question is computing log_4(2) correctly: since 4 = 2^2, log_4(2) = 1/2 exactly, so the watershed function is sqrt(n), not some other power -- and because it ties exactly with the given f(n)=sqrt(n), the extra log(n) factor from case 2 must be included, so the answer is Theta(sqrt(n) log n), not simply Theta(sqrt(n)) (which would be the case-1 or case-3 boundary answer without the log factor, applicable only when f(n) is polynomially smaller or larger than the watershed, not equal to it).'
}
);
window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-greedy';}).questions.push(
{
  id: 'algo-greedy-pyq1',
  pyqYear: 2015,
  q: 'For the Fractional Knapsack problem with items (value, weight) = (60,10), (100,20), (120,30) and knapsack capacity 50, what is the MAXIMUM total value achievable?',
  options: [],
  kind: 'nat',
  answer: 240,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The greedy strategy for fractional knapsack is to sort items by value-per-unit-weight ratio in decreasing order and take as much as possible of the highest-ratio item first. Ratios: item1 = 60/10 = 6, item2 = 100/20 = 5, item3 = 120/30 = 4. Sorted order: item1 (ratio 6), item2 (ratio 5), item3 (ratio 4). Take all of item1 (weight 10, value 60), capacity remaining 40. Take all of item2 (weight 20, value 100), capacity remaining 20. Only 20 of the 30 units of item3 remain capacity for: take 20/30 = 2/3 of item3, contributing (2/3)*120 = 80. Total value = 60 + 100 + 80 = 240. This greedy-by-ratio approach is PROVABLY optimal for the fractional (divisible) version because swapping any partial unit of a lower-ratio item for a higher-ratio item (whenever capacity permits) can only increase or maintain total value -- a classic exchange argument -- which is why fractional knapsack is solvable greedily while 0/1 knapsack (indivisible items) is not.'
},
{
  id: 'algo-greedy-pyq2',
  pyqYear: 2016,
  q: 'Which of the following statements about the standard greedy algorithm for Job Sequencing with Deadlines (maximize total profit, one unit-time job per slot, each job has a deadline) is/are TRUE? (Multiple Select Question)',
  options: [
    'Jobs should be considered in decreasing order of profit',
    'A job should be scheduled in the LATEST available free slot at or before its deadline',
    'The greedy choice is always optimal for this problem',
    'Every job is guaranteed to be scheduled regardless of deadlines'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The standard job-sequencing-with-deadlines greedy algorithm: sort jobs by profit in DECREASING order (statement 1 TRUE, so the highest-value jobs get first pick of slots), then for each job in that order, place it in the LATEST available slot at or before its deadline (statement 2 TRUE -- placing it as late as possible, rather than as early as possible, preserves earlier slots for other jobs with tighter deadlines, which is the key insight making the greedy correct). This greedy strategy is provably optimal via an exchange argument (statement 3 TRUE): if an optimal solution differs from the greedy one, they can be shown to have equal profit by swapping job assignments without violating any deadline. Statement 4 is FALSE: jobs whose deadline has already been "used up" by higher-profit jobs (i.e., no free slot exists at or before their deadline when their turn comes) are simply left unscheduled -- not every job need be scheduled, and low-profit or late-arriving jobs are routinely dropped, which is the entire point of the profit-maximization objective.'
},
{
  id: 'algo-greedy-pyq3',
  pyqYear: 2017,
  q: 'Jobs with (profit, deadline) pairs are J1(100,2), J2(19,1), J3(27,2), J4(25,1), J5(15,3). Each job takes 1 unit of time and at most one job can run per time slot (slots 1, 2, 3). Using the standard greedy algorithm (highest profit first, placed in latest free slot at or before its deadline), what is the MAXIMUM total profit achievable?',
  options: [],
  kind: 'nat',
  answer: 142,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Sort jobs by profit descending: J1(100,d2), J3(27,d2), J4(25,d1), J5(15,d3), J2(19,d1) -- correctly ordered by profit: J1(100), J3(27), J4(25), J2(19), J5(15). Process J1(d2): latest free slot at or before 2 is slot 2 -- assign, profit=100. Process J3(d2): slot 2 taken, try slot 1 -- free, assign, profit=127. Process J4(d1): slot 1 taken, no earlier slot exists -- reject. Process J2(d1): slot 1 taken -- reject. Process J5(d3): slot 3 is free -- assign, profit=127+15=142. Final schedule: slot1=J3(27), slot2=J1(100), slot3=J5(15), total profit = 27+100+15 = 142. This demonstrates the greedy correctly sacrifices lower-profit jobs (J4=25, J2=19) whose deadlines collide with already-filled higher-profit slots, in favor of the low-conflict job J5 which fits in the otherwise-unused slot 3.'
},
{
  id: 'algo-greedy-pyq4',
  pyqYear: 2018,
  q: 'Consider a coin system with denominations {1, 3, 4}. To make change for the amount 6 using the standard GREEDY algorithm (always pick the largest denomination that does not exceed the remaining amount), how many coins are used, and is this the minimum possible?',
  options: ['3 coins used (4+1+1); NOT minimum, since 3+3 uses only 2 coins', '2 coins used (4+... ); this IS minimum', '3 coins used; this IS minimum', '4 coins used; NOT minimum'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Trace the greedy algorithm: remaining=6, largest coin <=6 is 4, take it (remaining=2, coins used=1). Largest coin <=2 is 1 (since 3 and 4 exceed 2), take it (remaining=1, coins used=2). Largest coin <=1 is 1, take it (remaining=0, coins used=3). Greedy uses coins {4,1,1} = 3 coins. However, the OPTIMAL solution uses {3,3} = 2 coins, which is strictly better. This is the classic counterexample showing that the greedy "always take the largest coin" strategy is NOT optimal for arbitrary coin denomination systems -- it only provably works for "canonical" coin systems (like standard currency denominations 1,2,5,10,...). For general coin systems, minimum coin change actually requires dynamic programming, not greedy, which is precisely the conceptual point GATE tests by contrasting this topic with the DP topic\'s coin-change formulation.'
},
{
  id: 'algo-greedy-pyq5',
  pyqYear: 2019,
  q: 'Which of the following statements correctly explains WHY Prim\'s and Kruskal\'s greedy algorithms for Minimum Spanning Tree are provably correct?',
  options: [
    'The cut property: for any cut (partition of vertices into two sets), the minimum-weight edge crossing the cut is safe to include in some MST',
    'Because MST is always unique for any weighted graph',
    'Because greedy algorithms are correct for every optimization problem',
    'Because both algorithms happen to produce the same tree by coincidence'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The theoretical justification for greedy MST algorithms is the CUT PROPERTY: for any cut of the graph (any partition of vertices into two non-empty disjoint sets), the minimum-weight edge with one endpoint in each set is guaranteed to be part of SOME minimum spanning tree (it is "safe" to add). Kruskal\'s algorithm repeatedly picks the globally smallest untried edge that does not form a cycle -- which corresponds to the cut separating its two endpoints\' current components -- while Prim\'s algorithm grows a single tree by always adding the minimum-weight edge crossing the cut between the tree-so-far and the rest of the graph. Both are directly justified by the cut property. Option 2 is false: MST is unique only when all edge weights are DISTINCT; with tied weights, multiple MSTs of the same total weight can exist. Option 3 is false: greedy is NOT universally optimal (e.g., 0/1 knapsack, general coin change), so MST greedy correctness needs its own proof (the cut property / exchange argument), not a blanket greedy-always-works assumption.'
},
{
  id: 'algo-greedy-pyq6',
  pyqYear: 2020,
  q: 'A set of 6 activities have (start, finish) times: A(1,4), B(3,5), C(0,6), D(5,7), E(3,9), F(6,10), G(8,11). Using the greedy earliest-finish-time algorithm, how many mutually non-overlapping activities are selected in the maximum-size set?',
  options: [],
  kind: 'nat',
  answer: 3,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Sort by finish time: A(1,4), B(3,5), C(0,6), D(5,7), E(3,9), F(6,10), G(8,11). Greedily select the first (earliest finish), then repeatedly pick the next whose start >= last selected finish. Select A(1,4), lastFinish=4. B(3,5) starts at 3 < 4, reject. C(0,6) starts at 0 < 4, reject. D(5,7) starts at 5 >= 4, select, lastFinish=7. E(3,9) starts at 3 < 7, reject. F(6,10) starts at 6 < 7, reject. G(8,11) starts at 8 >= 7, select, lastFinish=11. Final selection: {A, D, G}, a set of 3 mutually non-overlapping activities. No selection of 4 or more pairwise-compatible activities exists among these 7 (verified because every other activity\'s interval overlaps with at least one of A, D, or the already-tight chain), confirming the greedy earliest-finish-time choice achieves the true maximum of 3.'
},
{
  id: 'algo-greedy-pyq7',
  pyqYear: 2021,
  q: 'Character frequencies are A:5, B:9, C:12, D:13, E:16, F:45 (same as a well-known example). Which of the following is/are TRUE about the Huffman code constructed for these frequencies? (Multiple Select Question)',
  options: [
    'The two least frequent symbols (A and B) are merged first',
    'F, being the most frequent, always receives the shortest code among all symbols',
    'The Huffman code is a prefix code (no codeword is a prefix of another)',
    'All codewords in a Huffman code must have exactly the same length'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Huffman\'s algorithm repeatedly extracts the two currently-lowest-frequency nodes and merges them into a new node with their summed frequency; among A(5), B(9), C(12), D(13), E(16), F(45), the two smallest are A(5) and B(9), so they are merged first -- statement 1 TRUE. Because Huffman\'s tree-building always keeps the largest-frequency symbols closest to being merged LAST (i.e., they stay near the root, at shallow depth), and F(45) is by far the largest and single frequency, it ends up at the shallowest depth among leaves, giving it the shortest (or tied-shortest) code -- statement 2 TRUE (and in this exact classic example, F does get the unique shortest 1-bit code). Statement 3 is a fundamental property of ALL Huffman codes (indeed of any tree-based binary code where each symbol is a leaf): since no leaf is an ancestor of another leaf in a binary tree, no codeword can be a prefix of another -- TRUE. Statement 4 is FALSE: Huffman codes are specifically variable-length -- that is the entire point, giving shorter codes to frequent symbols and longer codes to rare ones, unlike fixed-length encoding.'
},
{
  id: 'algo-greedy-pyq8',
  pyqYear: 2022,
  q: 'A set of 5 symbols has frequencies 2, 3, 5, 7, 11 (total 28). Using Huffman\'s algorithm, what is the total number of bits needed to encode one occurrence of each symbol (the total weighted path length)?',
  options: [],
  kind: 'nat',
  answer: 60,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Repeatedly merge the two smallest frequencies using a min-heap, adding the merge cost (sum of the two merged values) to a running total each time -- this running total exactly equals the final total weighted path length, because every symbol\'s frequency is counted once for every tree level (bit) it sits beneath the root, and summing per-merge costs telescopes to that same total. Starting heap {2,3,5,7,11}: pop 2 and 3, merge to 5, add cost 5 to total (total=5); heap becomes {5,5,7,11}. Pop 5 and 5, merge to 10, add cost 10 (total=15); heap becomes {7,10,11}. Pop 7 and 10, merge to 17, add cost 17 (total=32); heap becomes {11,17}. Pop 11 and 17, merge to 28, add cost 28 (total=60); heap becomes {28}, done. So the total weighted path length is 60 bits -- confirmed by direct min-heap simulation.'
},
{
  id: 'algo-greedy-pyq9',
  pyqYear: 2023,
  q: 'Which of the following problems CANNOT be solved optimally by a simple greedy algorithm (i.e., requires dynamic programming or another technique for optimality)?',
  options: ['0/1 Knapsack (items are indivisible, each item taken fully or not at all)', 'Minimum Spanning Tree', 'Activity Selection (maximize number of non-overlapping activities)', 'Huffman Coding (minimize total weighted code length)'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: '0/1 Knapsack, where each item must be taken entirely or not at all (no fractional pieces allowed), does NOT have the greedy-choice property in general: picking items by highest value-per-weight ratio first (the greedy strategy that works for the FRACTIONAL version) can produce a strictly suboptimal solution once items become indivisible, because a high-ratio item might not fit while a combination of lower-ratio items would fill the remaining capacity with higher total value. This is why 0/1 Knapsack is solved optimally via dynamic programming instead. In contrast, MST (via the cut property), Activity Selection (via an exchange argument on earliest finish time), and Huffman Coding (via the merge-the-two-smallest exchange argument) are all classic examples where a greedy strategy IS provably optimal, each with its own distinct correctness proof -- this question tests the ability to distinguish which problems have the greedy-choice + optimal-substructure properties needed for greedy correctness from those (like 0/1 knapsack) that only satisfy optimal substructure but not the greedy-choice property.'
},
{
  id: 'algo-greedy-pyq10',
  pyqYear: 2024,
  q: 'In a min-heap-based implementation of Huffman\'s algorithm processing n symbols, what is the tight asymptotic time complexity of building the complete Huffman tree?',
  options: ['Theta(n log n)', 'Theta(n)', 'Theta(n^2)', 'Theta(log n)'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Huffman\'s algorithm performs exactly n-1 merge operations to combine n symbols into a single tree (each merge reduces the symbol/node count by 1, starting from n and ending at 1). Each merge operation requires: two EXTRACT-MIN operations from the min-heap (each O(log n)) and one INSERT of the newly merged node back into the heap (also O(log n)). So each of the n-1 merges costs O(log n), giving total time Theta((n-1) * log n) = Theta(n log n). Building the initial min-heap from n frequencies takes only O(n) (via the standard bottom-up build-heap procedure), which is dominated by the Theta(n log n) merging phase. This Theta(n log n) bound is why Huffman coding, despite being conceptually a simple greedy algorithm, has the same asymptotic complexity class as comparison-based sorting -- both are fundamentally limited by needing repeated priority-queue operations (or equivalently, both are lower-bounded related to sorting-like operations on n elements).'
},
{
  id: 'algo-greedy-pyq11',
  pyqYear: 2025,
  q: 'A greedy interval-point-covering algorithm is given n intervals on a line and must choose the minimum number of POINTS such that every interval contains at least one chosen point. The standard greedy strategy is:',
  options: [
    'Sort intervals by RIGHT endpoint; repeatedly pick the right endpoint of the earliest not-yet-covered interval as a point, then skip all intervals it covers',
    'Sort intervals by LEFT endpoint; always pick the left endpoint of the first interval',
    'Pick points at every integer coordinate that appears as any endpoint',
    'This problem cannot be solved by any greedy algorithm'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'This is the classic "minimum points to stab all intervals" (interval point cover) problem, structurally the dual of activity selection. The correct greedy strategy sorts intervals by their RIGHT endpoint (ascending), then processes intervals left to right: whenever an interval is not yet covered by any previously chosen point, it greedily places a NEW point exactly at that interval\'s right endpoint (the rightmost possible choice that still covers this interval), and this single point automatically covers every other interval that overlaps it going forward, which are then skipped. Choosing the RIGHTMOST feasible point (rather than the leftmost, as in option 2) is the key greedy insight: it maximizes the chance of also covering subsequent intervals that start before this point ends, minimizing the total point count -- this is provably optimal via an exchange argument nearly identical to activity selection\'s. Option 3 (picking every distinct endpoint) massively over-counts and is not optimal; option 4 is false since this problem is a textbook example of correct greedy design.'
},
{
  id: 'algo-greedy-pyq12',
  pyqYear: 2026,
  q: 'Consider the greedy algorithm for MST using Prim\'s method starting from an arbitrary vertex, versus Kruskal\'s method. Which of the following statements is/are TRUE? (Multiple Select Question)',
  options: [
    'If all edge weights in the graph are distinct, the MST is unique, and both Prim\'s and Kruskal\'s algorithms will find the same MST',
    'If two edges have equal weight and both are candidates at some step, choosing either can still lead to a valid MST (possibly a different one, but of the same total weight)',
    'Prim\'s algorithm requires the graph to be connected for its output to be a single spanning tree',
    'Kruskal\'s algorithm sorts edges by weight in INCREASING order and adds an edge only if it does NOT create a cycle with previously added edges'
  ],
  answers: [0, 1, 2, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Statement 1 is TRUE: a standard theorem states that if all edge weights are pairwise distinct, the MST is unique, and since both Prim\'s and Kruskal\'s are correct greedy algorithms (justified by the cut property), they must both converge to that same unique tree. Statement 2 is TRUE: when weights tie, different valid tie-breaking choices can lead to different spanning trees, but all such trees are guaranteed to have the SAME total minimum weight (multiple MSTs can co-exist, all optimal). Statement 3 is TRUE: Prim\'s algorithm grows one connected tree by always attaching the minimum-weight edge leaving the current tree to a new vertex; if the graph is disconnected, Prim\'s algorithm (run from a single start vertex) can only ever reach vertices in that vertex\'s connected component, and will fail to produce a SPANNING tree covering all vertices -- connectivity is a precondition. Statement 4 correctly describes Kruskal\'s algorithm: sort all edges by weight ascending, then greedily add each edge unless it would close a cycle (checked via union-find), continuing until n-1 edges are added -- TRUE. All four statements are correct.'
}
);
window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-dp';}).questions.push(
{
  id: 'algo-dp-pyq1',
  pyqYear: 2015,
  q: 'For the 0/1 Knapsack problem with items of (weight, value) = (1,1), (3,4), (4,5), (5,7) and knapsack capacity W = 7, what is the MAXIMUM total value achievable (each item taken at most once)?',
  options: [],
  kind: 'nat',
  answer: 9,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Build the DP table dp[i][w] = max value using the first i items with capacity w, using the recurrence dp[i][w] = dp[i-1][w] if weight[i] > w, else max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]). Filling the table for items (1,1),(3,4),(4,5),(5,7) up to capacity 7 gives dp[4][7] = 9, achieved by choosing items with weights {3,4} (values 4+5=9, total weight 3+4=7, exactly filling the capacity) -- this beats other combinations like {1,3} (weight 4, value 5), {1,3,... nothing else fits}, or taking the single item (5,7) alone (value 7). The 0/1 constraint (no fractional items) is why this needs the DP table rather than the simple greedy-by-ratio approach that works for fractional knapsack; greedy by ratio here would rank item (1,1) ratio=1, (3,4) ratio=1.33, (4,5) ratio=1.25, (5,7) ratio=1.4, and taking the top-ratio items greedily would not necessarily find this optimal combination.'
},
{
  id: 'algo-dp-pyq2',
  pyqYear: 2016,
  q: 'What is the minimum EDIT DISTANCE (using insert, delete, and substitute, each cost 1) between the strings "SUNDAY" and "SATURDAY"?',
  options: [],
  kind: 'nat',
  answer: 3,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Using the standard DP recurrence dp[i][j] = dp[i-1][j-1] if the characters match, else 1 + min(dp[i-1][j] (delete), dp[i][j-1] (insert), dp[i-1][j-1] (substitute)), with dp[i][0]=i and dp[0][j]=j as base cases, filling the full 7x9 table (for "SUNDAY" of length 6 against "SATURDAY" of length 8) gives dp[6][8] = 3. One optimal alignment achieving cost 3: insert "A" after S (SAUNDAY), substitute "N" with "R"... more directly, one valid edit sequence is: insert \'A\' (S->SA), insert \'T\' before U appropriately, and one substitution -- the DP guarantees the MINIMUM regardless of which specific sequence of 3 edits is found, and no sequence of fewer than 3 edits can transform "SUNDAY" into "SATURDAY". This exact string pair is a well-known benchmark example for edit distance / Levenshtein distance computation.'
},
{
  id: 'algo-dp-pyq3',
  pyqYear: 2017,
  q: 'What is the length of the Longest Common Subsequence (LCS) between "ABCBDAB" and "BDCABA"?',
  options: [],
  kind: 'nat',
  answer: 4,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Using the LCS recurrence dp[i][j] = dp[i-1][j-1]+1 if the i-th character of the first string equals the j-th character of the second, else dp[i][j] = max(dp[i-1][j], dp[i][j-1]), filling the DP table for "ABCBDAB" (length 7) against "BDCABA" (length 6) gives dp[7][6] = 4. Two subsequences achieving this length are "BCBA" and "BDAB", both of length 4, and both can be verified to appear (in order, not necessarily contiguous) within both original strings. No common subsequence of length 5 or more exists between these two strings. This is one of the most frequently reused GATE example string pairs for testing LCS table construction, precisely because it requires several genuine max() tie-breaks that expose whether a candidate correctly applies the recurrence rather than guessing.'
},
{
  id: 'algo-dp-pyq4',
  pyqYear: 2018,
  q: 'For matrix chain multiplication with matrices of dimensions 5x10, 10x3, 3x12, 12x5, 5x50, 50x6 (i.e., p = [5,10,3,12,5,50,6]), what is the MINIMUM number of scalar multiplications needed to compute the full product using optimal parenthesization?',
  options: [],
  kind: 'nat',
  answer: 2010,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Using the matrix-chain DP recurrence dp[i][j] = min over all split points k (i<=k<j) of dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j], filling the table bottom-up by increasing chain length for 6 matrices (dimensions given by p=[5,10,3,12,5,50,6]) gives dp[1][6] = 2010 as the minimum total scalar multiplications. This demonstrates the huge cost difference correct parenthesization can make: multiplying strictly left-to-right (((((M1*M2)*M3)*M4)*M5)*M6) would cost far more multiplications than the DP-found optimal grouping, since the DP explores all O(2^n / n) possible parenthesizations implicitly via the O(n^3) table-filling recurrence rather than enumerating them all directly (which would itself be exponential).'
},
{
  id: 'algo-dp-pyq5',
  pyqYear: 2019,
  q: 'What is the length of the Longest Increasing Subsequence (LIS) of the array [10, 9, 2, 5, 3, 7, 101, 18]?',
  options: [],
  kind: 'nat',
  answer: 4,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Using the O(n^2) LIS DP recurrence dp[i] = 1 + max(dp[j]) over all j<i with a[j]<a[i] (or dp[i]=1 if no such j exists), and taking the maximum over all dp[i]: for array [10,9,2,5,3,7,101,18], one longest increasing subsequence is [2,5,7,101] or equivalently [2,3,7,101] or [2,3,7,18], each of length 4. No increasing subsequence of length 5 exists in this array (verified by exhaustive DP table computation: dp values are [1,1,1,2,2,3,4,4], and the maximum is 4). This exact array is a standard textbook/interview example for LIS, and this question format tests whether a candidate can correctly trace the O(n^2) table-filling recurrence (as opposed to only knowing the existence of an O(n log n) patience-sorting-based algorithm without being able to hand-compute a small example).'
},
{
  id: 'algo-dp-pyq6',
  pyqYear: 2020,
  q: 'Using the coin denominations {1, 2, 5}, what is the MINIMUM number of coins needed to make change for the amount 11 (using standard DP, not greedy)?',
  options: [],
  kind: 'nat',
  answer: 3,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Using the DP recurrence dp[a] = 1 + min(dp[a-c]) over all coin denominations c<=a, with dp[0]=0, filling the table from amount 0 up to 11 gives dp[11] = 3, achieved by the combination {5, 5, 1} (5+5+1=11, using 3 coins). No combination of 2 coins can sum to exactly 11 using denominations from {1,2,5} (checking all pairs: 5+5=10, 5+2=7, 5+1=6, 2+2=4, etc., none reach 11), confirming 3 is indeed minimal. This coin system {1,2,5} happens to be "canonical" (greedy also gives the correct answer here, taking 5+5+1=3 coins by picking largest-first), but the DP formulation is what generalizes correctly to ANY coin system, including non-canonical ones like {1,3,4} where greedy can fail.'
},
{
  id: 'algo-dp-pyq7',
  pyqYear: 2021,
  q: 'Using coin denominations {1, 2, 5}, how many DISTINCT ways (order does not matter, i.e., counting combinations not permutations) are there to make change for the amount 5?',
  options: [],
  kind: 'nat',
  answer: 4,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Using the "counting combinations" DP recurrence (process coins one denomination at a time in the outer loop, amounts in the inner loop, dp[a] += dp[a-c]), with dp[0]=1 initially, the number of ways to make amount 5 using coins from {1,2,5} is dp[5] = 4. The 4 distinct combinations are: {5} (one 5-coin), {2,2,1} (two 2-coins and one 1-coin), {2,1,1,1} (one 2-coin and three 1-coins), and {1,1,1,1,1} (five 1-coins). Note that the ORDER of the outer (coin) and inner (amount) loops matters critically for this variant: iterating coins in the outer loop and amounts in the inner loop counts combinations (order-independent), while swapping the loop order would instead count PERMUTATIONS (order-dependent, treating {2,1,1,1} arranged differently as distinct), a subtle but frequently tested distinction in coin-change DP formulations.'
},
{
  id: 'algo-dp-pyq8',
  pyqYear: 2022,
  q: 'The Rod Cutting problem has rod length 8 and price table (for lengths 1 through 8): [1, 5, 8, 9, 10, 17, 17, 20]. What is the MAXIMUM total revenue obtainable by optimally cutting the rod?',
  options: [],
  kind: 'nat',
  answer: 22,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Using the rod-cutting DP recurrence dp[n] = max over all first-cut lengths i (1<=i<=n) of price[i] + dp[n-i], with dp[0]=0, filling the table from length 0 up to 8 gives dp[8] = 22, achieved by cutting the rod into two pieces of length 2 and 6 (price[2]+price[6] = 5+17 = 22), which beats selling the rod whole at price[8]=20, or other cuts like length 1+7 (1+17=18) or 4+4 (9+9=18). This is the classic CLRS rod-cutting example, and the optimal cut here (2+6, giving revenue 22) is a frequently-tested "surprising" result since it is NOT simply the single best per-unit-price cut repeated (price[2]/2 = 2.5/unit is the best per-unit rate, but cutting the whole rod into four length-2 pieces would give 4*5=20, LESS than the 22 achieved by the 2+6 split), showing DP correctly balances marginal prices rather than naively maximizing a per-unit ratio.'
},
{
  id: 'algo-dp-pyq9',
  pyqYear: 2023,
  q: 'A DP algorithm for the 0/1 Knapsack problem with n items and capacity W is implemented using the standard 2D table dp[i][w]. What are the TIGHT time and space complexities of this standard DP formulation?',
  options: ['Time O(nW), Space O(nW)', 'Time O(n log W), Space O(n)', 'Time O(2^n), Space O(n)', 'Time O(nW), Space O(n) using a rolling array, but NEVER O(nW) time'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'The standard 0/1 knapsack DP fills a table of size (n+1) x (W+1), where n is the number of items and W is the knapsack capacity, and computing each cell dp[i][w] takes O(1) time given the previous row\'s values. So total time is O(n*W) and, using the full 2D table (needed if item-selection reconstruction via backtracking is required), space is also O(n*W). Note that this is PSEUDO-polynomial time -- it depends on the VALUE of W, not just the number of bits needed to represent W, meaning if W is exponentially large relative to n (e.g., W = 2^n), this algorithm becomes exponential in the input size; 0/1 Knapsack is NP-hard in general, and this pseudo-polynomial DP does not contradict that. A space optimization using a 1D rolling array (processing weights in decreasing order per item) can reduce space to O(W) while keeping time at O(n*W), but the question\'s stated 2D table formulation is O(nW) in both time and space as given.'
},
{
  id: 'algo-dp-pyq10',
  pyqYear: 2024,
  q: 'Which of the following statements about Dynamic Programming are TRUE? (Multiple Select Question)',
  options: [
    'DP is applicable when a problem has both optimal substructure and overlapping subproblems',
    'Memoization (top-down) and tabulation (bottom-up) both compute the same set of DP values but differ in evaluation order',
    'If subproblems do NOT overlap, DP typically offers no benefit over plain divide-and-conquer recursion',
    'Every problem with optimal substructure can be solved by DP in polynomial time'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Statement 1 is TRUE: DP requires BOTH optimal substructure (an optimal solution can be built from optimal solutions to subproblems) AND overlapping subproblems (the same subproblems recur multiple times) -- both are needed to justify caching. Statement 2 is TRUE: memoization computes values on-demand via recursion, caching results the first time each subproblem is seen (top-down), while tabulation computes values in a fixed order (typically smallest subproblems first) filling a table iteratively (bottom-up) -- both explore the exact same dependency DAG of subproblems and produce identical final values, just via different traversal orders and different overhead (tabulation avoids recursion-call overhead but must compute a valid topological order in advance). Statement 3 is TRUE: divide-and-conquer algorithms like merge sort have optimal substructure but NON-overlapping subproblems (each recursive call works on a disjoint portion of the array), so caching offers no speedup -- this is precisely why merge sort is "just" divide-and-conquer, not DP. Statement 4 is FALSE: optimal substructure alone is not sufficient for a polynomial-time DP -- the NUMBER of distinct subproblems must also be polynomial (bounded); problems like the general Traveling Salesman Problem have optimal substructure but an exponential number of distinct subproblems (subsets of cities), so their DP formulation (e.g., Held-Karp) is still exponential, just less so than brute force.'
},
{
  id: 'algo-dp-pyq11',
  pyqYear: 2025,
  q: 'In the Longest Common Subsequence DP table for two strings of lengths m and n, if the two strings share NO characters in common at all, what value appears in every cell of the table (except the necessarily-zero base row/column, which are also zero)?',
  options: ['0', '1', 'min(m,n)', 'It varies depending on string content even with no common characters'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'The LCS recurrence is dp[i][j] = dp[i-1][j-1]+1 if characters match, else dp[i][j] = max(dp[i-1][j], dp[i][j-1]). If the two strings share absolutely no character in common, the "characters match" branch (dp[i-1][j-1]+1) is NEVER taken anywhere in the table, so every cell falls back to max(dp[i-1][j], dp[i][j-1]). Since the base row (i=0) and base column (j=0) are initialized to 0 (an empty string has LCS length 0 with anything), and every subsequent cell only ever takes the max of already-zero neighbors (by induction, since the match branch never fires), EVERY cell in the entire table remains 0, including dp[m][n]. This makes intuitive sense: if the two strings have no character in common, their longest common SUBSEQUENCE must also be empty (length 0), since a subsequence is built entirely from characters that must appear in both strings.'
},
{
  id: 'algo-dp-pyq12',
  pyqYear: 2026,
  q: 'The Fibonacci-like recurrence f(n) = f(n-1) + f(n-2) + f(n-3) (a "tribonacci" sequence) with f(0)=0, f(1)=0, f(2)=1 is computed using BOTTOM-UP dynamic programming (tabulation) storing only the last 3 values at any time (not a full array). What are the TIME and SPACE complexities to compute f(n)?',
  options: ['Time O(n), Space O(1)', 'Time O(n), Space O(n)', 'Time O(2^n), Space O(1)', 'Time O(n^2), Space O(1)'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Computing f(3), f(4), ..., f(n) bottom-up, each requiring O(1) work given the previous three values already computed, takes a total of O(n) time across n-2 iterations. Because the recurrence only ever needs the most recent 3 values (a sliding window, not the entire history), maintaining just 3 variables (rather than a full array of size n) suffices, achieving O(1) auxiliary space -- this is the standard space-optimization trick for any DP recurrence whose dependency only reaches back a CONSTANT number of previous states (as opposed to something like LCS or knapsack, whose recurrences need an entire previous row and thus cannot be reduced below O(row size) space, or in special row-elimination cases like knapsack, reduced to O(W) via careful iteration order but not O(1)). This distinction -- constant-lookback recurrences reducible to O(1) space versus row-dependent recurrences needing O(row) space -- is a common space-complexity trap in DP questions.'
}
);
window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-graph';}).questions.push(
{
  id: 'algo-graph-pyq1',
  pyqYear: 2015,
  q: 'A weighted undirected graph has vertices A,B,C,D,E and edges A-B(2), A-C(3), B-C(1), B-D(5), C-D(4), C-E(6), D-E(2). Using Kruskal\'s algorithm, what is the TOTAL WEIGHT of the Minimum Spanning Tree?',
  options: [],
  kind: 'nat',
  answer: 9,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Sort edges by weight ascending: B-C(1), A-B(2), D-E(2), A-C(3), C-D(4), B-D(5), C-E(6). Apply Kruskal\'s (add an edge only if it does not form a cycle, using union-find): add B-C(1) [components: {B,C},{A},{D},{E}]. Add A-B(2) [components: {A,B,C},{D},{E}]. Add D-E(2) [components: {A,B,C},{D,E}]. Add A-C(3): both A and C already in the same component -- SKIP (would form a cycle). Add C-D(4): connects {A,B,C} and {D,E} -- add it, completing the spanning tree with 4 edges for 5 vertices. MST edges are {B-C, A-B, D-E, C-D}, total weight = 1+2+2+4 = 9. Note the weights are NOT all distinct here (two edges of weight 2), so multiple MSTs of the same total weight 9 could exist depending on tie-breaking, but the minimum total weight itself is a fixed, well-defined value of 9 regardless of which edge is chosen first among ties.'
},
{
  id: 'algo-graph-pyq2',
  pyqYear: 2016,
  q: 'For the directed weighted graph with vertices A(source),B,C,D,E and edges A-B(4), A-C(1), C-B(2), B-D(1), C-D(5), D-E(3), running Dijkstra\'s algorithm from A, what is the shortest distance from A to E?',
  options: [],
  kind: 'nat',
  answer: 7,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Initialize dist[A]=0, all others infinity. Finalize A(0), relax neighbors: dist[B]=min(inf,4)=4, dist[C]=min(inf,1)=1. Finalize C(1) (smallest tentative distance among unvisited). Relax from C: dist[B]=min(4, 1+2)=3, dist[D]=min(inf,1+5)=6. Finalize B(3). Relax from B: dist[D]=min(6, 3+1)=4. Finalize D(4). Relax from D: dist[E]=min(inf, 4+3)=7. Finalize E(7). So the shortest path A to E is A-C-B-D-E with total distance 1+2+1+3=7, which beats the alternative A-C-D-E (1+5+3=9) or A-B-D-E (4+1+3=8). This example specifically tests whether a candidate correctly re-relaxes B via the cheaper path through C rather than locking in the direct A-B(4) edge prematurely.'
},
{
  id: 'algo-graph-pyq3',
  pyqYear: 2017,
  q: 'A directed graph with vertices S,A,B,C,D has edges S-A(6), S-B(7), A-B(8), A-C(5), A-D(-4), B-C(-3), B-D(9), C-A(-2), D-C(7), D-S(2). This graph contains a NEGATIVE-weight edge. Using Bellman-Ford from S, what is the shortest distance from S to D?',
  options: [],
  kind: 'nat',
  answer: -2,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Since the graph has a negative edge (A-D = -4) but NO negative-weight CYCLE (verified by running one extra relaxation pass after n-1=4 iterations and confirming no distance improves further), Bellman-Ford is required (Dijkstra would give wrong answers here since it assumes non-negative weights). Running the standard Bellman-Ford relaxation for n-1=4 rounds over all edges converges to: dist[S]=0, dist[A]=2 (via S-B-C-A: 7-3-2=2, cheaper than direct S-A=6), dist[B]=7 (direct S-B), dist[C]=4 (via S-B-C: 7-3=4), dist[D]=-2 (via S-B-C-A-D: 7-3-2-4=-2, cheaper than S-A-D=6-4=2). So the shortest distance from S to D is -2. This exact graph is the classic CLRS Bellman-Ford textbook example, specifically constructed so that the shortest path to D requires traversing through the negative edge A-D after first reaching A via a roundabout cheaper route through B and C, rather than directly.'
},
{
  id: 'algo-graph-pyq4',
  pyqYear: 2018,
  q: 'A directed graph has a cycle 0->1(1), 1->2(-1), 2->0(-1). What happens when Bellman-Ford is run on this graph, and what happens if Dijkstra\'s algorithm is (incorrectly) applied to a graph with negative edges like this one?',
  options: [
    'Bellman-Ford correctly detects the negative-weight cycle (distances keep decreasing after n-1 iterations); Dijkstra can produce incorrect shortest-path distances since its greedy finalization assumes no negative edges',
    'Both Bellman-Ford and Dijkstra fail identically and cannot be distinguished',
    'Bellman-Ford cannot detect negative cycles; only Dijkstra can',
    'Neither algorithm is affected by negative edge weights'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'For this graph, the cycle 0->1->2->0 has total weight 1+(-1)+(-1) = -1, a genuine negative cycle, meaning distances along it can be made arbitrarily small by looping repeatedly, so no well-defined shortest path exists at all for vertices on/reachable-from this cycle. Bellman-Ford\'s standard detection mechanism runs exactly n-1 relaxation rounds (guaranteed sufficient for any negative-cycle-free graph with n vertices), then does ONE more pass: if any distance can still be improved, a negative cycle reachable from the source is confirmed to exist -- verified here, since further relaxation keeps reducing distances indefinitely. Dijkstra\'s algorithm, by contrast, greedily finalizes each vertex\'s distance the moment it is extracted as the current minimum, relying on the invariant that no unfinalized vertex could later offer a cheaper path -- an invariant that BREAKS with negative edges, since a not-yet-visited negative edge could retroactively improve an already-finalized vertex\'s distance, producing silently WRONG (not just undefined) results rather than an error or infinite loop.'
},
{
  id: 'algo-graph-pyq5',
  pyqYear: 2019,
  q: 'A weighted undirected graph has vertices A,B,C,D,E and edges A-B(2), A-C(3), B-C(4), B-D(5), C-D(1), C-E(6), D-E(7) -- note all edge weights here are DISTINCT. What can be concluded about its Minimum Spanning Tree, and what is its total weight?',
  options: ['The MST is unique (since all weights are distinct); total weight = 12', 'Multiple MSTs may exist; total weight = 12', 'The MST is unique; total weight = 15', 'Cannot determine uniqueness without running both Prim\'s and Kruskal\'s'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Since all 7 edge weights (2,3,4,5,1,6,7) are pairwise DISTINCT, a standard theorem guarantees the MST is UNIQUE -- no tie-breaking ambiguity can arise at any step of Kruskal\'s or Prim\'s algorithm. Running Kruskal\'s: sort edges C-D(1), A-B(2), A-C(3), B-C(4), B-D(5), C-E(6), D-E(7). Add C-D(1) [components: {C,D},{A},{B},{E}]. Add A-B(2) [components: {C,D},{A,B},{E}]. Add A-C(3): connects {A,B} and {C,D} -- add [components: {A,B,C,D},{E}]. Add B-C(4): both endpoints already in {A,B,C,D} -- skip (cycle). Add B-D(5): also both in same component -- skip. Add C-E(6): connects {A,B,C,D} and {E} -- add, completing the spanning tree with 4 edges. Total weight = 1+2+3+6 = 12. Since the MST is provably unique here, this is THE minimum spanning tree, not merely one of several equal-weight options.'
},
{
  id: 'algo-graph-pyq6',
  pyqYear: 2020,
  q: 'In an unweighted, undirected, connected graph with 7 vertices numbered 0-6 and edges forming a structure where vertex 0 connects to 1 and 2, vertices 1 and 2 both connect to 3, and vertex 3 connects to 4, which then connects to 5 and 6, a BFS starting from vertex 0 is performed. What is the shortest-path distance (in number of edges) from vertex 0 to vertex 5?',
  options: [],
  kind: 'nat',
  answer: 4,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'BFS explores the graph level by level, guaranteeing that the first time a vertex is reached, it is via a SHORTEST path (in terms of edge count) from the source, since BFS exhausts all vertices at distance k before considering any vertex at distance k+1. Level 0: {0} (distance 0). Level 1: {1, 2} (distance 1, direct neighbors of 0). Level 2: {3} (distance 2, reached from both 1 and 2, but only counted once at its first-discovered distance). Level 3: {4} (distance 3, reached from 3, the only neighbor of 4 not yet visited). Level 4: {5, 6} (distance 4, both reached from 4). So the shortest-path distance from vertex 0 to vertex 5 is 4 edges, along the unique path 0-1-3-4-5 (or equivalently 0-2-3-4-5).'
},
{
  id: 'algo-graph-pyq7',
  pyqYear: 2021,
  q: 'A DAG has vertices 0,1,2,3,4 with edges 0->1, 0->2, 0->3, 1->4, 2->4, 3->4 (vertex 0 is the unique source with three independent "middle" vertices 1,2,3, all feeding into the unique sink 4). How MANY distinct topological orderings does this DAG have?',
  options: [],
  kind: 'nat',
  answer: 6,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Vertex 0 has in-degree 0 and every other vertex depends on it (directly or transitively), so it MUST come first in any valid topological order. Vertex 4 has out-degree 0 and depends on all of 1, 2, and 3, so it MUST come last. The three middle vertices 1, 2, and 3 have NO edges among themselves (no edge like 1->2 or 2->3 exists), meaning they are mutually independent in the partial order and can be arranged in ANY relative order among themselves without violating any dependency constraint. The number of ways to arrange 3 mutually-independent elements is 3! = 6. So the total number of distinct topological orderings is 1 (fixed first) x 6 (free middle permutations) x 1 (fixed last) = 6. This is a standard technique for counting topological orderings: identify forced positions (sources/sinks with unique dependency chains) versus free "antichains" of mutually incomparable vertices, and multiply by the factorial of each such free group\'s size.'
},
{
  id: 'algo-graph-pyq8',
  pyqYear: 2022,
  q: 'Which of the following statements about Depth-First Search (DFS) edge classification in a directed graph are TRUE? (Multiple Select Question)',
  options: [
    'A back edge connects a vertex to one of its ancestors in the DFS tree',
    'A directed graph has a cycle if and only if a DFS of it produces at least one back edge',
    'Forward and cross edges can both appear when DFS is run on a directed acyclic graph (DAG)',
    'A cross edge always connects two vertices in the same DFS tree at the same depth'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Statement 1 is TRUE by definition: a back edge in DFS goes from a vertex to one of its ANCESTORS in the current DFS tree (i.e., it points "backward" toward the root along the current recursion path). Statement 2 is TRUE and is a fundamental theorem: a directed graph contains a cycle if and only if a DFS traversal discovers at least one back edge -- this is precisely the mechanism used for cycle detection via DFS (checking for edges into "gray"/currently-on-stack vertices). Statement 3 is TRUE: forward edges (from an ancestor to a non-child descendant) and cross edges (connecting unrelated subtrees or different DFS trees, with no ancestor-descendant relationship) CAN both appear even in an acyclic graph -- a DAG can have zero back edges (consistent with being acyclic) while still having forward and cross edges depending on traversal order and edge structure. Statement 4 is FALSE: a cross edge can connect vertices at DIFFERENT depths, or even vertices in entirely DIFFERENT DFS trees (in a DFS forest, when the graph is disconnected or when directed edges point into an already-fully-explored subtree) -- there is no requirement that cross edges connect same-depth vertices.'
},
{
  id: 'algo-graph-pyq9',
  pyqYear: 2023,
  q: 'A weighted undirected graph has 6 vertices and 9 edges. If it is known to be connected, how many edges does its Minimum Spanning Tree contain, and how many edges are NOT part of the MST?',
  options: [],
  kind: 'nat',
  answer: 5,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'A spanning tree on any connected graph with V vertices always has exactly V-1 edges (a fundamental tree property: a tree with V nodes has exactly V-1 edges, being minimally connected with no cycles). Here V=6, so the MST has exactly 6-1 = 5 edges. Since the graph has 9 total edges, the number of edges NOT in the MST is 9 - 5 = 4 (these are the edges that Kruskal\'s algorithm would reject during processing because they would form a cycle with already-included edges, or equivalently, the edges Prim\'s algorithm never needs to add since it stops once all vertices are connected). This NAT question tests the basic but essential tree-edge-count identity that underlies correctness arguments for both Kruskal\'s and Prim\'s algorithms (both are designed to add EXACTLY V-1 edges and then terminate).'
},
{
  id: 'algo-graph-pyq10',
  pyqYear: 2024,
  q: 'A connected undirected graph G has V vertices and E edges, and it is known that G contains at least one cycle. If T is a spanning tree of G, how many "non-tree" edges (edges of G not in T) does removing a spanning tree leave, and what is true about each such non-tree edge added back to T?',
  options: [
    'E - (V-1) non-tree edges remain; adding any single one back to T creates EXACTLY ONE cycle',
    'E - V non-tree edges remain; adding any one back creates no cycle',
    'V - E non-tree edges remain; adding any one back always creates two disjoint cycles',
    'The number of non-tree edges cannot be determined without knowing the exact structure of G'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Any spanning tree T of a connected graph with V vertices has exactly V-1 edges. So the number of non-tree edges is E - (V-1) = E - V + 1. Since G contains at least one cycle, E must be at least V (a connected graph is acyclic only when E = V-1, i.e., is itself already a tree), confirming E-(V-1) >= 1, i.e., at least one non-tree edge genuinely exists. For any single non-tree edge (u,v) added back into T: since T is a tree, there exists a UNIQUE path between u and v already within T, and adding the direct edge (u,v) creates exactly ONE additional cycle (the path in T from u to v, plus the new edge (u,v), forms exactly one simple cycle) -- no more, no fewer, because T itself has no other cycles to combine with. This "fundamental cycle" property (each non-tree edge, combined with the tree, induces exactly one unique cycle) underlies cycle-space arguments in graph theory and explains why Kruskal\'s algorithm correctly identifies "would create a cycle" via the union-find check.'
},
{
  id: 'algo-graph-pyq11',
  pyqYear: 2025,
  q: 'For a directed graph with V vertices and E edges represented using an ADJACENCY LIST, what are the tight time complexities of (a) BFS/DFS traversal and (b) checking whether a specific edge (u,v) exists?',
  options: [
    'BFS/DFS: O(V+E); Edge existence check: O(degree(u)) in the worst case, i.e., up to O(V)',
    'BFS/DFS: O(V*E); Edge existence check: O(1) always',
    'BFS/DFS: O(V^2); Edge existence check: O(log V)',
    'BFS/DFS: O(E); Edge existence check: O(V+E)'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'With an adjacency LIST representation, BFS and DFS both visit every vertex once (O(V) total across all vertex-visits) and, for each vertex, scan its entire adjacency list exactly once (summing to O(E) total across all vertices, since the sum of all list lengths equals the total edge count, or 2E for undirected graphs, still O(E)) -- giving the well-known O(V+E) tight bound for both traversals. Checking whether edge (u,v) exists requires linearly scanning vertex u\'s adjacency list to search for v, which takes O(degree(u)) time in the worst case -- and since degree(u) can be as large as V-1 (in a dense graph or specifically if u connects to nearly every other vertex), this is O(V) in the worst case. This contrasts with an ADJACENCY MATRIX representation, where edge existence check is O(1) (direct array lookup) but traversal and matrix storage cost O(V^2) regardless of how sparse the actual graph is -- the classic space/query-time tradeoff between the two graph representations that GATE frequently tests.'
},
{
  id: 'algo-graph-pyq12',
  pyqYear: 2026,
  q: 'Prim\'s algorithm for MST is implemented using a binary min-heap (priority queue) with decrease-key support, on a graph with V vertices and E edges. What is the tight time complexity?',
  options: ['O(E log V)', 'O(V^2)', 'O(E + V log V)', 'O(V*E)'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'With a binary heap implementation, Prim\'s algorithm performs V EXTRACT-MIN operations (one per vertex added to the MST, each costing O(log V)) and, across the whole run, performs at most E DECREASE-KEY operations in total (each edge can trigger at most one decrease-key, when it offers a cheaper connection to a vertex not yet in the tree, and each decrease-key also costs O(log V) with a binary heap). Total time = O(V log V) for extractions + O(E log V) for decrease-keys = O((V+E) log V), which simplifies to O(E log V) for connected graphs where E >= V-1 (E dominates V asymptotically in this sum). This matches Kruskal\'s O(E log E) = O(E log V) (since E is at most V^2, log E = O(log V)) -- both classic MST algorithms land at the same O(E log V) tight bound with these standard data structures, though a FIBONACCI heap implementation of Prim\'s can improve decrease-key to O(1) amortized, achieving the better O(E + V log V) bound instead (a distinction sometimes tested at a more advanced level).'
}
);
window.GATE_DATA.questions['algo'].topics.find(function(t){return t.id==='algo-sorting-searching';}).questions.push(
{
  id: 'algo-sorting-searching-pyq1',
  pyqYear: 2015,
  q: 'Quicksort is run on the array [5, 3, 8, 4, 2, 7, 1, 6] using the FIRST element of each subarray as the pivot (elements less than pivot go left, others go right, then recurse on each side). What is the TOTAL number of element comparisons (pivot-to-element comparisons) performed?',
  options: [],
  kind: 'nat',
  answer: 14,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Trace the partitioning at each level. Level 1: pivot=5, compare against {3,8,4,2,7,1,6} = 7 comparisons; splits into left=[3,4,2,1] and right=[8,7,6]. Level 2 (left=[3,4,2,1]): pivot=3, compare against {4,2,1} = 3 comparisons; splits into left=[2,1] and right=[4]. Level 2 (right=[8,7,6]): pivot=8, compare against {7,6} = 2 comparisons; splits into left=[7,6] and right=[] (empty, since both are less than 8). Level 3 (left=[2,1]): pivot=2, compare against {1} = 1 comparison. Level 3 (right=[7,6] from the right branch): pivot=7, compare against {6} = 1 comparison. All remaining subarrays have size <=1, requiring no more comparisons. Total: 7+3+2+1+1 = 14 comparisons. This exercise (already sorted arrays or first-element-pivot on adversarial-ish input) tests careful hand-tracing of the partition recursion, a frequently examined skill distinct from just knowing Quicksort\'s O(n log n) average / O(n^2) worst case asymptotic bounds.'
},
{
  id: 'algo-sorting-searching-pyq2',
  pyqYear: 2016,
  q: 'Merge sort is run on the same array [5, 3, 8, 4, 2, 7, 1, 6] (split at the midpoint each time, standard two-pointer merge). What is the TOTAL number of element comparisons performed during all the merge steps combined?',
  options: [],
  kind: 'nat',
  answer: 17,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Merge sort first recursively splits [5,3,8,4,2,7,1,6] down to 8 singleton subarrays (no comparisons during pure splitting), then merges bottom-up. Merging pairs of singletons into sorted pairs: (5,3)->1 cmp, (8,4)->1 cmp, (2,7)->1 cmp, (1,6)->1 cmp = 4 comparisons total, producing [3,5],[4,8],[2,7],[1,6]. Merging pairs of sorted-2-lists into sorted-4-lists: merging [3,5] and [4,8] takes 3 comparisons (3 vs 4, 5 vs 4, 5 vs 8) giving [3,4,5,8]; merging [2,7] and [1,6] takes 3 comparisons (2 vs 1, 2 vs 6, 7 vs 6) giving [1,2,6,7] -- subtotal 6 comparisons. Merging the two sorted-4-lists [3,4,5,8] and [1,2,6,7] into the final sorted-8 list takes 7 comparisons (3v1,3v2,3v6,4v6,5v6,5v7,8v7 -- tracing the standard merge pointer walk) giving the fully sorted [1,2,3,4,5,6,7,8]. Total comparisons: 4 + 6 + 7 = 17. This differs from quicksort\'s comparison count (14) on the identical input, illustrating that even though both are Theta(n log n) on average, their EXACT comparison counts on a specific input can differ.'
},
{
  id: 'algo-sorting-searching-pyq3',
  pyqYear: 2017,
  q: 'Build-Max-Heap is applied to the array [4, 10, 3, 5, 1, 8, 9, 2, 6] using the standard bottom-up (Floyd\'s) heapify procedure. What is the array AFTER Build-Max-Heap completes?',
  options: ['[10, 6, 9, 5, 1, 8, 3, 2, 4]', '[10, 9, 8, 6, 5, 4, 3, 2, 1]', '[4, 10, 9, 5, 1, 8, 3, 2, 6]', '[9, 10, 8, 6, 5, 4, 3, 2, 1]'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Build-Max-Heap calls Max-Heapify on every non-leaf node, starting from index floor(n/2)-1 = 3 down to index 0 (0-indexed array of 9 elements). Heapify(3) on subtree rooted at a[3]=5 with children a[7]=2,a[8]=6: largest is 6 at index 8, swap -> array becomes [4,10,3,6,1,8,9,2,5]. Heapify(2) on a[2]=3 with children a[5]=8,a[6]=9: largest is 9 at index 6, swap -> [4,10,9,6,1,8,3,2,5]. Heapify(1) on a[1]=10 with children a[3]=6,a[4]=1: 10 already largest, no change. Heapify(0) on a[0]=4 with children a[1]=10,a[2]=9: largest is 10 at index 1, swap -> [10,4,9,6,1,8,3,2,5]; recurse into index 1 (value now 4) with children a[3]=6,a[4]=1: largest is 6 at index 3, swap -> [10,6,9,4,1,8,3,2,5]; recurse into index 3 (value now 4) with children a[7]=2 only (index 8 out of subtree range for this node, index 3\'s children are 7 and 8: a[7]=2, a[8]=5): largest between 4,2,5 is 5 at index 8, swap -> [10,6,9,5,1,8,3,2,4]. Final heap array: [10,6,9,5,1,8,3,2,4], matching option 1.'
},
{
  id: 'algo-sorting-searching-pyq4',
  pyqYear: 2018,
  q: 'Given the max-heap array [10, 6, 9, 5, 1, 8, 3, 2, 4], one EXTRACT-MAX operation is performed (remove the max, move the last element to the root, then sift down). What is the resulting heap array?',
  options: ['[9, 6, 8, 5, 1, 4, 3, 2]', '[9, 6, 8, 5, 1, 2, 3, 4]', '[6, 9, 8, 5, 1, 4, 3, 2]', '[9, 5, 8, 6, 1, 4, 3, 2]'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Extract-Max removes a[0]=10 (the max, to be returned), moves the LAST element (a[8]=4) to the root, and shrinks the heap size to 8: array becomes [4, 6, 9, 5, 1, 8, 3, 2]. Now sift-down (max-heapify) from index 0: children of index 0 are a[1]=6, a[2]=9; largest of {4,6,9} is 9 at index 2, swap -> [9,6,4,5,1,8,3,2]; recurse into index 2 (value now 4) with children a[5]=8, a[6]=3: largest of {4,8,3} is 8 at index 5, swap -> [9,6,8,5,1,4,3,2]; recurse into index 5 (value now 4), which is a leaf (no children within heap size 8, since 2*5+1=11 exceeds the array), so sifting stops. Final heap array after extraction: [9,6,8,5,1,4,3,2], matching option 1. This exact chain of two operations (Build-Max-Heap then one Extract-Max) is a very common two-part GATE-style question testing careful heap manipulation tracing.'
},
{
  id: 'algo-sorting-searching-pyq5',
  pyqYear: 2019,
  q: 'What is the MINIMUM possible number of comparisons needed, in the worst case, by ANY comparison-based sorting algorithm to sort 7 distinct elements (the information-theoretic lower bound)?',
  options: [],
  kind: 'nat',
  answer: 13,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Any comparison-based sorting algorithm must be able to distinguish between all n! possible orderings of n distinct elements, and each comparison has only 2 possible outcomes, so a decision tree modeling the algorithm must have at least n! leaves and hence height at least ceil(log2(n!)) (since a binary tree of height h has at most 2^h leaves). For n=7: 7! = 5040. log2(5040) ≈ 12.299, so ceil(log2(5040)) = 13. This means NO comparison-based sorting algorithm can sort 7 elements in fewer than 13 comparisons in the worst case, regardless of cleverness -- this is a fundamental INFORMATION-THEORETIC lower bound, not tied to any specific algorithm\'s implementation. Merge sort\'s actual worst-case comparison count for n=7 is close to but can exceed this bound slightly (merge sort is not always comparison-optimal for every n), while more specialized optimal sorting networks or algorithms can sometimes achieve exactly this bound for small n.'
},
{
  id: 'algo-sorting-searching-pyq6',
  pyqYear: 2020,
  q: 'Which of the following statements about comparison-based sorting lower bounds are TRUE? (Multiple Select Question)',
  options: [
    'Any comparison-based sorting algorithm requires Omega(n log n) comparisons in the worst case',
    'Counting sort and Radix sort can sort in O(n) time because they are NOT comparison-based (they use key values directly, not pairwise comparisons)',
    'The Omega(n log n) lower bound applies to ALL sorting algorithms, including non-comparison-based ones like Radix sort',
    'Merge sort and Heap sort both achieve the Theta(n log n) worst-case bound, matching the lower bound asymptotically'
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Statement 1 is TRUE: the decision-tree argument (a binary tree with at least n! leaves needs height >= log2(n!) = Omega(n log n) by Stirling\'s approximation) applies to ANY algorithm that only gains information via pairwise comparisons, establishing Omega(n log n) as a universal lower bound for that MODEL of computation. Statement 2 is TRUE: Counting sort and Radix sort achieve O(n) or O(n+k) time precisely because they sidestep the comparison model entirely -- they use the actual VALUES of keys (e.g., as array indices in counting sort, or digit-by-digit bucketing in radix sort) rather than comparing pairs of elements, so the comparison-based lower bound simply does not constrain them. Statement 3 is FALSE: this is exactly the common misconception the question tests -- the Omega(n log n) bound is specific to the COMPARISON-BASED model; algorithms that exploit extra structure (bounded integer keys, fixed digit counts) can and do beat it, achieving linear time under different (reasonable) assumptions about the input. Statement 4 is TRUE: both merge sort and heap sort are comparison-based and achieve Theta(n log n) in the WORST case (unlike quicksort, whose worst case is Theta(n^2) despite Theta(n log n) average case), making them asymptotically optimal comparison-based sorts.'
},
{
  id: 'algo-sorting-searching-pyq7',
  pyqYear: 2021,
  q: 'Quicksort is applied to an array that is ALREADY SORTED IN ASCENDING ORDER, using the LAST element as the pivot each time. What is the WORST-CASE time complexity for this specific scenario, and why?',
  options: [
    'Theta(n^2), because the pivot is always the maximum of its subarray, producing maximally unbalanced partitions (n-1 and 0)',
    'Theta(n log n), because sorted input is always the best case for Quicksort',
    'Theta(n), because no swaps are needed on already-sorted input',
    'Theta(n^2), but only because the FIRST element is used as pivot, not the last'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'When the array is already sorted ascending and the LAST element is always chosen as the pivot, that pivot is always the LARGEST element in its current subarray (since everything before it, being sorted ascending, is smaller). Partitioning around the maximum element produces one side with all n-1 other elements and an empty other side -- the most UNBALANCED partition possible. This gives the recurrence T(n) = T(n-1) + T(0) + Theta(n) = T(n-1) + Theta(n), which unrolls to Theta(n^2) (the classic linear-decrease-with-linear-work pattern, same as insertion sort\'s worst case). This is precisely why naive Quicksort implementations that always pick a FIXED position (first or last element) as pivot are considered risky on nearly-sorted or adversarially-crafted input, motivating randomized pivot selection or median-of-three pivot strategies in practice, which make this specific worst-case scenario extremely unlikely.'
},
{
  id: 'algo-sorting-searching-pyq8',
  pyqYear: 2022,
  q: 'A sorting algorithm is described as STABLE. Which of the following statements correctly explains what this means, and which of the standard algorithms listed is/are stable? (Multiple Select Question)',
  options: [
    'A stable sort preserves the RELATIVE ORDER of elements that compare as equal',
    'Merge sort (with a standard <= comparison in the merge step) is stable',
    'Standard in-place Heap sort and standard Quicksort (Lomuto/Hoare partition) are typically NOT stable',
    'Stability is only relevant when sorting arrays of primitive numbers with no associated data'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Statement 1 correctly defines stability: a sort is stable if, whenever two elements are considered EQUAL by the comparison used, their relative order in the output matches their relative order in the input (important when sorting records/objects by one field, wanting ties broken by original order). Statement 2 is TRUE: merge sort, when its merge step consistently takes from the LEFT sublist on ties (using <= rather than <), never reorders equal elements relative to each other, making it stable. Statement 3 is TRUE: heap sort\'s repeated extract-max/swap-with-last operations, and quicksort\'s partitioning (which swaps elements across large jumps based on pivot comparisons), both routinely move equal elements past each other in ways that do not preserve original relative order -- both are standardly considered NOT stable (though quicksort CAN be made stable with extra space/tricks, that is not the default implementation). Statement 4 is FALSE: stability matters most precisely when sorting composite records by a subset of fields (e.g., sorting employee records by department while wanting ties within a department to remain in original name order) -- it is irrelevant only for pure primitive values with no distinguishing "identity" beyond their value, which is the opposite of when stability actually matters.'
},
{
  id: 'algo-sorting-searching-pyq9',
  pyqYear: 2023,
  q: 'Counting Sort is used to sort an array of 20 elements, where each element is an integer in the range [0, 9]. What is the TIGHT time complexity, expressed in terms of n=20 (number of elements) and k=10 (range size)?',
  options: ['Theta(n + k)', 'Theta(n log n)', 'Theta(n * k)', 'Theta(k log k)'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Counting sort works by: (1) initializing a count array of size k (here k=10, for values 0 through 9) and counting occurrences of each value, taking Theta(n) to scan the input plus Theta(k) to initialize the count array; (2) computing prefix sums over the count array, taking Theta(k); (3) placing each of the n input elements into its correct output position using the (adjusted) counts, taking Theta(n). Summing all phases: Theta(n) + Theta(k) + Theta(k) + Theta(n) = Theta(n + k). For n=20 and k=10, this is Theta(30) = Theta(n) in this specific case since n and k are comparable in size, but the general tight bound in terms of both parameters is Theta(n+k) -- crucially NOT Theta(n*k) (which would be pessimistic) nor Theta(n log n) (that bound applies to comparison-based sorts; counting sort is not comparison-based and can beat that bound when k = O(n)).'
},
{
  id: 'algo-sorting-searching-pyq10',
  pyqYear: 2024,
  q: 'Radix Sort is used to sort n integers, each having d digits (in some fixed base), using Counting Sort as the stable subroutine for each digit position (base b, so each digit is in range [0, b-1]). What is the TIGHT overall time complexity?',
  options: ['Theta(d * (n + b))', 'Theta(n log n)', 'Theta(d * n * b)', 'Theta(n^2)'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Radix sort processes the d digit positions one at a time (typically from least significant to most significant), running a STABLE sort (counting sort) on each digit position. Each single counting-sort pass over n numbers, with each digit in range [0,b-1] (so b distinct digit values), costs Theta(n+b) as established for counting sort. Since there are d such passes (one per digit position), and each pass\'s stability is essential to guarantee overall correctness (preserving the sorted order established by less-significant digits when sorting by a more-significant digit), the total time is d * Theta(n+b) = Theta(d*(n+b)). This is why radix sort is advantageous specifically when d is small (few digits/passes needed) and b is not too large relative to n (each pass stays cheap) -- for example, sorting n numbers each with d=O(log_b(max value)) digits can beat Theta(n log n) comparison sorts when the maximum value is polynomially bounded in n, since d then becomes O(log n / log b), and choosing b=Theta(n) makes each pass Theta(n) and the number of passes Theta(log n / log n) = O(1), giving overall Theta(n) -- a classic "beating the comparison lower bound via structure" argument.'
},
{
  id: 'algo-sorting-searching-pyq11',
  pyqYear: 2025,
  q: 'A sorted array of 1000 distinct integers is searched using BINARY SEARCH for a value known to be present. What is the MAXIMUM number of iterations (comparisons against the target) the search can take?',
  options: [],
  kind: 'nat',
  answer: 10,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'The worst-case number of comparisons for binary search on n elements is floor(log2(n)) + 1. For n=1000: since 2^9=512 and 2^10=1024, we have 512 <= 1000 < 1024, so floor(log2(1000)) = 9, giving worst-case comparisons = 9+1 = 10. Intuitively, each comparison discards (at least) half of the remaining candidate range, so after k comparisons, at most ceil(n/2^k) candidates remain (roughly); the search needs enough halvings to shrink the search space from 1000 down to a single element, requiring exactly ceil(log2(1000+1)) = 10 comparisons in the worst case (searching for the value at one of the extreme "hardest to find quickly" positions). This is a standard NAT-format question drilling the precise comparison-count formula, distinct from just knowing the Theta(log n) asymptotic class.'
},
{
  id: 'algo-sorting-searching-pyq12',
  pyqYear: 2026,
  q: 'Which of the following statements comparing Quicksort and Merge Sort are TRUE? (Multiple Select Question)',
  options: [
    'Merge sort has Theta(n log n) time complexity in ALL cases (best, average, worst), while Quicksort\'s worst case is Theta(n^2)',
    'Merge sort typically requires Theta(n) additional (auxiliary) space, while a well-implemented in-place Quicksort needs only O(log n) additional space (for the recursion stack)',
    'Quicksort is generally preferred in practice for in-memory array sorting due to better cache locality and lower constant factors, despite its worse worst-case bound',
    'Merge sort cannot be used to sort linked lists efficiently, unlike Quicksort'
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Statement 1 is TRUE: merge sort\'s divide-always-in-half-then-merge structure gives Theta(n log n) regardless of input arrangement (the recurrence T(n)=2T(n/2)+Theta(n) does not depend on data values at all), while quicksort\'s partition sizes DO depend on pivot choice relative to data, degrading to Theta(n^2) when partitions are maximally unbalanced (e.g., already-sorted input with naive pivot selection). Statement 2 is TRUE: merge sort\'s merge step conventionally needs an auxiliary array of size Theta(n) to merge two sorted halves without overwriting unread elements, while in-place quicksort partitions within the original array, needing only recursion-stack space, which is O(log n) on average (and can be bounded to O(log n) worst-case too, with the "recurse on smaller half first" tail-call optimization trick). Statement 3 is TRUE and reflects real-world practice: despite merge sort\'s better worst-case guarantee, quicksort\'s in-place operation (better cache behavior, less memory allocation/copying overhead) and smaller constant factors make it the more commonly used default in many standard library implementations for arrays (though many production sorts are hybrids, like Introsort, that fall back to heap sort to avoid quicksort\'s worst case). Statement 4 is FALSE: merge sort is actually PARTICULARLY well-suited to linked lists (merging two sorted linked lists needs only O(1) extra space via pointer rearrangement, unlike arrays), while quicksort\'s in-place partitioning advantage is specific to random-access arrays and is much less natural/efficient on linked lists (no O(1) random access for partitioning).'
}
);
