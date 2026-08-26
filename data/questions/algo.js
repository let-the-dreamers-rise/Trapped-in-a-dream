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
    core: "The comparison-sort lower bound. Any correct sorting algorithm that only compares pairs of elements (never inspects their bit patterns or numeric value directly) can be modeled as a binary decision tree: each internal node is one comparison, each root-to-leaf path is one possible execution, and each leaf must correspond to a distinct final ordering of the input. Since there are n! possible permutations of n distinct elements, and the algorithm must be able to output every one of them for some input, the tree needs at least n! leaves. A binary tree with L leaves must have height at least log2(L) (since a tree of height h has at most 2^h leaves). So the worst-case number of comparisons is at least log2(n!), and by Stirling's approximation log2(n!) = Theta(n log n). This proves Omega(n log n) is unavoidable for ANY comparison-based sort — merge sort and heapsort, both Theta(n log n) in the worst case, are therefore asymptotically optimal comparison sorts, and no cleverness can produce a comparison sort that is, say, Theta(n) in the worst case.\n\n• Stability and in-place classification. A sort is STABLE if it preserves the relative order of elements with equal keys — important when sorting records by one field while wanting ties to keep their prior order (e.g. re-sorting an already-name-sorted list by department). A sort is IN-PLACE if it uses only O(1) (or O(log n), counting recursion stack) extra memory beyond the input array. Insertion sort, bubble sort: stable and in-place. Selection sort: in-place but NOT stable (its characteristic long-distance swap can jump an equal element past another equal one). Merge sort: stable but NOT in-place (needs Theta(n) auxiliary space for merging). Quicksort and heapsort: in-place but NOT stable. Counting sort and radix sort: stable, but NOT in-place (need auxiliary count/output arrays). Bucket sort: stable if a stable method sorts within each bucket, and also not in-place.\n\n• Best/worst/average cases. Insertion sort and bubble sort: best case O(n) (already sorted, with an early-exit check), worst and average O(n^2). Selection sort: O(n^2) in ALL cases — it always scans the remaining unsorted portion fully regardless of input order, so its performance doesn't depend on input arrangement. Merge sort and heapsort: Theta(n log n) in best, worst, AND average cases — their performance never depends on input arrangement. Quicksort: best and average case Theta(n log n), but worst case Theta(n^2), triggered when the chosen pivot is always the minimum or maximum remaining element (classically, a fixed first-element pivot on an already-sorted array).\n\n• Non-comparison sorts and their conditions. Counting sort assumes keys are integers in a known bounded range [0, k); it counts occurrences of each key value, then computes prefix sums to place elements directly, running in Theta(n + k) time and space. It is efficient only when k = O(n); if k is much larger than n (e.g. k = n^2), the k term dominates and it loses its advantage. Radix sort sorts multi-digit (or multi-character) keys by repeatedly applying a STABLE sort (typically counting sort) one digit position at a time, from least significant to most significant digit; for n keys with d digits each in base b, it runs in Theta(d(n + b)) time — if d is a small constant and b = O(n), this is Theta(n), beating the comparison-sort lower bound because it never directly compares two whole keys. Bucket sort assumes keys are roughly uniformly distributed over a known range (classically real numbers in [0,1)); it distributes elements into k buckets, sorts each bucket (often with insertion sort, since buckets are expected to be small), and concatenates — giving expected time Theta(n + k), but a worst case of Theta(n^2) if the distribution assumption fails and all elements land in a single bucket.\n\n• Binary search comparison counting. Searching a sorted array of n elements by repeatedly halving the search range takes at most floor(log2(n)) + 1 comparisons in the worst case (equivalently, ceil(log2(n+1))), since each comparison eliminates roughly half the remaining candidates.\n\n• Selection (finding the kth smallest). Quickselect (Hoare's selection algorithm), which partitions like quicksort but recurses into only the one side containing the target rank, achieves EXPECTED Theta(n) time with a randomly chosen pivot, but degrades to worst-case Theta(n^2) under adversarial pivot choices (mirroring quicksort's own worst case). The median-of-medians (BFPRT) algorithm removes this risk: it splits the array into groups of 5, finds each group's median by brute force, recursively finds the median of those medians, and uses that as the pivot — this guarantees the pivot always eliminates a constant fraction of the array, giving worst-case Theta(n) time via the recurrence T(n) = T(n/5) + T(7n/10) + O(n), which solves to Theta(n) because the two recursive fractions sum to 9/10 < 1."
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
        "The tree must have at least n! leaves (one per possible output permutation), and a binary tree with L leaves has height at least log2(L), giving height Omega(n log n) by Stirling's approximation",
        "The tree must have at least 2^n leaves because each comparison doubles the number of reachable states, giving height exactly n",
        "The tree's height is irrelevant; only the number of internal nodes determines the running time"
      ],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'concept',
      explanation: "The correct argument: the algorithm must be able to correctly sort every one of the n! possible input permutations, and each distinct permutation must end at a distinct leaf of the decision tree (since a sorting algorithm cannot output the same fixed final arrangement for two different input orderings and still be correct in general — the leaf must record the specific rearrangement needed). So the tree needs at least n! leaves. Since a binary tree of height h has at most 2^h leaves, we need 2^h >= n!, i.e. h >= log2(n!), and Stirling's approximation gives log2(n!) = Theta(n log n). Option A undercounts drastically — n leaves would only be enough to identify n outcomes, not n! of them. Option C's '2^n leaves' claim is a common but wrong intuition; the tree's leaf count is driven by the number of DISTINCT OUTCOMES the algorithm must produce (n!), not by doubling per comparison in the abstract. Option D is wrong because the running time (worst-case comparisons) is exactly the tree's height, i.e. the longest root-to-leaf path, which is precisely what the argument bounds."
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
