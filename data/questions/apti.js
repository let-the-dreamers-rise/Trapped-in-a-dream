window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['apti'] = {
  subject: 'General Aptitude',
  topics: [
    {
      id: 'apti-quant',
      name: 'Quantitative Aptitude',
      theory: {
        intro: 'Quantitative Aptitude is the backbone of the 15-mark General Aptitude section that appears in every GATE paper, and it is where toppers quietly bank easy marks in under ten minutes. The syllabus is school-level arithmetic and algebra: ratios, percentages, profit and loss, simple and compound interest, speed-time-distance, work and time, mixtures, ages, divisibility, permutations, combinations and basic probability. Nothing here is conceptually deep, so GATE differentiates candidates on speed and on resistance to carefully planted traps such as successive percentage changes or relative speed of trains. Since GA marks count fully toward your score and rank, and quant questions are the most predictable in the entire paper, this topic offers the highest marks-per-minute return of anything you can revise. The goal is not to learn new mathematics but to compress each standard pattern into a two-line mental routine you can execute without a rough sheet.',
        core: 'Ratios and percentages. A ratio a:b splits a total T into parts aT/(a+b) and bT/(a+b). A percentage change of p% multiplies a quantity by (1 + p/100). Successive changes of p% and q% give a net factor (1 + p/100)(1 + q/100), never p + q; the shortcut net% = p + q + pq/100 handles signs automatically, so +25% followed by -20% gives 25 - 20 - 5 = 0.\n\nProfit and loss. Profit% is always computed on cost price unless stated otherwise: profit% = (SP - CP)/CP x 100. Marked price problems chain two factors: SP = MP x (1 - discount) and MP = CP x (1 + markup), so overall profit factor = (1 + markup)(1 - discount).\n\nInterest. Simple interest SI = P x r x t / 100 grows linearly. Compound interest gives amount A = P(1 + r/100)^t. A frequently tested identity: for 2 years, CI - SI = P(r/100)^2, and for 3 years CI - SI = P(r/100)^2 (3 + r/100).\n\nSpeed, time, distance. D = S x T. Convert km/h to m/s by multiplying by 5/18. A train crossing a pole covers its own length; crossing a platform covers train length plus platform length. Two objects moving toward each other close the gap at the sum of speeds; in the same direction, at the difference. For boats, downstream speed = boat + stream, upstream = boat - stream. Average speed over equal distances is the harmonic mean 2xy/(x+y), never the arithmetic mean.\n\nWork and time. Convert everything to rates: finishing a job in n days means a rate of 1/n per day. Rates add for people working together. If A is k times as efficient as B, A takes 1/k of the time B takes. When someone leaves midway, compute work done so far, then divide the remaining fraction by the remaining rate.\n\nMixtures and ages. Track one component in absolute terms: in 40 L of milk and water in ratio 3:1 there are 30 L milk and 10 L water; adding water changes only the water figure. Age problems reduce to one linear equation: assign the ratio as 5x and 3x, apply the time shift to both, and solve.\n\nNumbers and divisibility. Key rules: divisibility by 8 depends on the last three digits, by 9 on the digit sum, by 11 on the alternating digit sum. The largest n-digit multiple of k is found by dividing the largest n-digit number by k and taking the floor times k. Remainders of powers follow short cycles: reduce the base modulo m, then find the cycle length of its powers.\n\nCounting and probability. Permutations order, combinations do not: nPr = n!/(n-r)!, nCr = n!/(r!(n-r)!). Multiply counts across independent choices, add across mutually exclusive cases. Probability = favourable/total when outcomes are equally likely; for sequential draws without replacement, multiply conditional probabilities or use combinations directly. Complement counting (1 - P(none)) often collapses an ugly case analysis into one line.\n\n• Net factor for successive % changes: multiply (1 + p/100) terms.\n• CI - SI over 2 years = P(r/100)^2.\n• km/h to m/s: multiply by 5/18.\n• Average speed over equal distances: harmonic mean 2xy/(x+y).\n• Together-rate = sum of individual rates 1/n.\n• Largest n-digit multiple of k: floor(largest/k) x k.\n• P(at least one) = 1 - P(none).',
        strategy: 'GATE quant questions recycle a small pattern bank, so train pattern recognition first. The most common traps: adding successive percentages instead of multiplying factors; computing profit on selling price instead of cost price; averaging speeds arithmetically instead of harmonically; forgetting that a train crossing a platform covers both lengths; and mixing up permutation with combination. Whenever a percentage question involves two changes, immediately write the two multiplying factors before touching any numbers.\n\nSpeed tricks that pay off: choose a convenient total (100 for percentages, LCM of the day-counts for work problems). For a work problem with times 12 and 18 days, take the job as 36 units, so rates are 3 and 2 units/day and the combined time is 36/5 = 7.2 days with zero fractions along the way. For remainder-of-power questions, reduce the base mod m and list the first few powers until the cycle repeats; the cycle is rarely longer than 4.\n\nWorked mini-example: a shopkeeper marks up 40% and offers 15% discount. Net factor = 1.40 x 0.85 = 1.19, so profit is 19% in one multiplication; anyone who computes 40 - 15 = 25 falls into the intended trap.\n\nTime management: each quant question should take 60-90 seconds. If an equation is getting messy, plug the answer options back into the problem statement; option checking is fully legitimate in an MCQ exam and is often faster than solving forward. Never leave 1-mark quant questions unattempted since there is rarely negative-mark risk worth fearing on these when your method is clean.'
      },
      questions: [
        {
          id: 'apti-quant-q1',
          q: 'An amount of Rs. 1440 is divided between two friends in the ratio 3:5. The larger share is:',
          options: ['Rs. 810', 'Rs. 850', 'Rs. 900', 'Rs. 960'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'The ratio 3:5 has 3 + 5 = 8 total parts, so one part is 1440/8 = 180. The larger share corresponds to 5 parts: 5 x 180 = Rs. 900. Fast route: instead of computing both shares, note the larger share is 5/8 of the total, and 1440 x 5/8 = 180 x 5 = 900. A quick sanity check: the smaller share is 3 x 180 = 540, and 540 + 900 = 1440, which matches the total, confirming the answer. The common slip is reporting the smaller share (540, not offered here) or dividing by 2 out of habit.'
        },
        {
          id: 'apti-quant-q2',
          q: 'The price of an item is first increased by 25% and then decreased by 20%. The net change in price is:',
          options: ['5% increase', 'No net change', '5% decrease', '4% decrease'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Successive percentage changes multiply as factors, they never simply add. The net factor is 1.25 x 0.80 = 1.00, so the final price equals the original price and there is no net change. Using the shortcut net% = p + q + pq/100 with p = +25 and q = -20: 25 - 20 + (25)(-20)/100 = 5 - 5 = 0. Concretely, Rs. 100 becomes Rs. 125 after the increase, and 20% of 125 is 25, bringing it back to Rs. 100. The trap answer is 5% increase, which comes from wrongly adding 25 - 20 = 5.'
        },
        {
          id: 'apti-quant-q3',
          q: 'A trader buys an article for Rs. 480 and sells it for Rs. 552. The profit percentage is:',
          options: ['15%', '12%', '18%', '20%'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Profit = SP - CP = 552 - 480 = Rs. 72. Profit percentage is always computed on the cost price: 72/480 x 100 = 15%. Fast route: 10% of 480 is 48, and 5% is 24; since 48 + 24 = 72, the profit is exactly 10% + 5% = 15% without long division. Verify: 480 x 1.15 = 552, which matches the selling price. The classic error is dividing the profit by the selling price (72/552 is about 13%), which is why profit-on-CP must be an automatic reflex in GATE quant.'
        },
        {
          id: 'apti-quant-q4',
          q: 'The simple interest on Rs. 8000 at 7.5% per annum for 2 years is:',
          options: ['Rs. 1150', 'Rs. 1200', 'Rs. 1240', 'Rs. 1275'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Simple interest is SI = P x r x t / 100 = 8000 x 7.5 x 2 / 100. Fast route: 7.5% of 8000 is 600 (since 10% is 800 and a quarter of that, 200, subtracted gives 600). Over 2 years the interest is simply doubled: 600 x 2 = Rs. 1200. Simple interest grows linearly, so per-year interest is constant, which is what makes this a ten-second question. Note the contrast with compound interest, where the second year would earn interest on Rs. 8600 instead, giving 645 for year two; GATE regularly tests whether you keep the two schemes separate.'
        },
        {
          id: 'apti-quant-q5',
          q: 'A train 200 m long is running at 90 km/h. The time it takes to cross a signal pole is:',
          options: ['6 s', '7.2 s', '8 s', '9 s'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'To cross a pole, the train must cover exactly its own length, 200 m. Convert the speed: 90 km/h x 5/18 = 25 m/s. Time = distance/speed = 200/25 = 8 s. The 5/18 conversion is worth memorizing as a single step (90 x 5 = 450, divided by 18 gives 25). The typical trap in the train family is forgetting what distance is covered: a pole means train length only, while a platform or bridge means train length plus platform length. Here nothing is added, so the answer is a clean 8 seconds.'
        },
        {
          id: 'apti-quant-q6',
          q: 'A can complete a piece of work in 12 days and B can complete the same work in 18 days. Working together, they will finish it in:',
          options: ['6.5 days', '7.2 days', '7.5 days', '8 days'],
          answer: 1,
          marks: 2,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Use the LCM trick to avoid fractions: take the job as LCM(12, 18) = 36 units. Then A does 36/12 = 3 units per day and B does 36/18 = 2 units per day, so together they do 5 units per day. Time = 36/5 = 7.2 days. Equivalently with rates: 1/12 + 1/18 = 3/36 + 2/36 = 5/36 of the job per day, giving 36/5 days. Verify: in 7.2 days A alone does 7.2/12 = 0.6 of the job and B does 7.2/18 = 0.4, and 0.6 + 0.4 = 1 full job. The LCM route is faster because every intermediate number stays an integer.'
        },
        {
          id: 'apti-quant-q7',
          q: 'The present ages of two brothers are in the ratio 5:3. Six years from now the ratio of their ages will be 7:5. The present age of the elder brother is:',
          options: ['12 years', '15 years', '18 years', '20 years'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Let the present ages be 5x and 3x. After six years: (5x + 6)/(3x + 6) = 7/5. Cross-multiplying: 25x + 30 = 21x + 42, so 4x = 12 and x = 3. The elder brother is 5x = 15 years old. Verify: ages now are 15 and 9; in six years they become 21 and 15, and 21:15 = 7:5, which checks out. Fast route for MCQs: test the options directly. If the elder is 15, the ratio 5:3 forces the younger to be 9, and adding 6 to both gives 21:15 = 7:5 immediately, so option checking lands the answer in seconds.'
        },
        {
          id: 'apti-quant-q8',
          q: 'The difference between the compound interest (compounded annually) and the simple interest on Rs. 12000 for 2 years at 10% per annum is:',
          options: ['Rs. 100', 'Rs. 110', 'Rs. 120', 'Rs. 132'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'For exactly 2 years, the identity CI - SI = P(r/100)^2 gives the answer in one step: 12000 x (0.10)^2 = 12000 x 0.01 = Rs. 120. The reason: SI pays r% on the principal both years, while CI additionally pays r% on the first-year interest; that extra piece is r% of (r% of P). Full check: SI = 12000 x 0.1 x 2 = 2400. CI amount = 12000 x 1.1^2 = 12000 x 1.21 = 14520, so CI = 2520. Difference = 2520 - 2400 = 120, confirming the shortcut. Memorize this identity; GATE has used the 2-year difference pattern repeatedly.'
        },
        {
          id: 'apti-quant-q9',
          q: 'A 40-litre mixture contains milk and water in the ratio 3:1. How much water must be added so that the ratio of milk to water becomes 3:2?',
          options: ['5 L', '8 L', '10 L', '12 L'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Work with absolute quantities of each component. The 40 L mixture in ratio 3:1 contains 30 L milk and 10 L water. Adding water leaves the milk fixed at 30 L. For the new ratio 3:2, water must be (2/3) x 30 = 20 L. So the water added is 20 - 10 = 10 L. Verify: 30 L milk and 20 L water gives 30:20 = 3:2. The key insight that makes this fast: identify the component that does not change (milk) and anchor the new ratio to it, instead of setting up an equation in the total volume, which invites arithmetic slips.'
        },
        {
          id: 'apti-quant-q10',
          q: 'Two trains of lengths 150 m and 250 m are moving toward each other on parallel tracks at speeds of 54 km/h and 90 km/h. The time they take to completely cross each other is:',
          options: ['9 s', '10 s', '11.5 s', '12 s'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'When two trains move toward each other, their relative speed is the sum: 54 + 90 = 144 km/h = 144 x 5/18 = 40 m/s. To cross completely, together they must cover the sum of their lengths: 150 + 250 = 400 m. Time = 400/40 = 10 s. Fast route: add speeds first while still in km/h (144 is friendly with 5/18 since 144/18 = 8, so 8 x 5 = 40 m/s), then divide. The two standard traps are using the difference of speeds (that applies only to same-direction overtaking) and using only one train length instead of both.'
        },
        {
          id: 'apti-quant-q11',
          q: 'A is twice as efficient as B, and together they finish a job in 12 days. In how many days can A alone finish the job?',
          options: ['16 days', '18 days', '24 days', '36 days'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Let B do 1 unit of work per day; then A does 2 units per day, and together they do 3 units per day. In 12 days the whole job is 12 x 3 = 36 units. A alone, at 2 units per day, needs 36/2 = 18 days. Verify: B alone would need 36 days, and 1/18 + 1/36 = 2/36 + 1/36 = 3/36 = 1/12, matching the given 12 days together. General shortcut: if A is k times as efficient as B and together they take T days, A alone takes T(k+1)/k days; here 12 x 3/2 = 18. Efficiency ratios translate directly into rate ratios, never time ratios.'
        },
        {
          id: 'apti-quant-q12',
          q: 'The largest four-digit number that is exactly divisible by 88 is:',
          options: ['9856', '9900', '9944', '9988'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Divide the largest four-digit number, 9999, by 88: 88 x 113 = 9944, and 9999 - 9944 = 55, so 9999 = 88 x 113 + 55. Subtracting the remainder from 9999 gives the largest multiple: 9999 - 55 = 9944. Quick verification: 9944/8 = 1243 (integer), and for divisibility by 11 the alternating sum 9 - 9 + 4 - 4 = 0, so 9944 is divisible by both 8 and 11, hence by 88. Checking the tempting option 9988: alternating sum 9 - 9 + 8 - 8 = 0 passes the 11 test, but 988/8 = 123.5, so it fails divisibility by 8. The floor-of-division method is the universal one-liner for such questions.'
        },
        {
          id: 'apti-quant-q13',
          q: 'The remainder when 7^23 is divided by 5 is:',
          options: ['1', '2', '3', '4'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'First reduce the base: 7 mod 5 = 2, so we need 2^23 mod 5. List powers of 2 modulo 5: 2, 4, 3, 1, then the cycle repeats with length 4 (2^5 gives 2 again). Since 23 = 4 x 5 + 3, the remainder 23 mod 4 = 3 points to the third element of the cycle, which is 3. So 7^23 mod 5 = 3. Verify with a small case: 2^3 = 8 leaves remainder 3 when divided by 5, consistent with position 3 of the cycle. This two-step routine, reduce the base then find the power cycle, dispatches nearly every remainder-of-power question in under a minute; cycles modulo small numbers are rarely longer than 4.'
        },
        {
          id: 'apti-quant-q14',
          q: 'A committee of 3 men and 2 women is to be formed from 6 men and 5 women. The number of ways this can be done is:',
          options: ['120', '200', '250', '300'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Choosing people for a committee is unordered, so use combinations. Choose 3 men from 6: C(6,3) = 20. Choose 2 women from 5: C(5,2) = 10. The two choices are independent, so multiply: 20 x 10 = 200 ways. Computing the pieces quickly: C(6,3) = (6 x 5 x 4)/(3 x 2 x 1) = 120/6 = 20 and C(5,2) = (5 x 4)/2 = 10. The two standard errors here are adding instead of multiplying the independent stage counts (giving 30), and using permutations 6P3 x 5P2 (giving 2400), which wrongly treats committee seats as ordered positions.'
        },
        {
          id: 'apti-quant-q15',
          q: 'A bag contains 5 red and 3 blue balls. Two balls are drawn at random without replacement. The probability that both are red is:',
          options: ['5/14', '5/8', '15/56', '3/14'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Method 1, sequential: P(first red) = 5/8; given that, P(second red) = 4/7. Multiply: (5/8)(4/7) = 20/56 = 5/14. Method 2, combinations: favourable ways C(5,2) = 10, total ways C(8,2) = 28, so 10/28 = 5/14. Both routes agree, which is a built-in verification. The trap option 15/56 comes from multiplying 5/8 by 3/7, mixing in a blue draw; and 5/8 x 5/8 = 25/64 would be the with-replacement error (not offered, but the mindset behind it is the common slip). For without-replacement draws, always shrink both the favourable count and the total on the second draw.'
        },
        {
          id: 'apti-quant-q16',
          q: 'A shopkeeper marks an article 40% above its cost price and then offers a discount of 15% on the marked price. The net profit percentage is:',
          options: ['19%', '21%', '23%', '25%'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Chain the two factors on the cost price: marked price = CP x 1.40, selling price = MP x 0.85. Net factor = 1.40 x 0.85 = 1.19, so the profit is 19%. Fast mental route: 1.4 x 0.85 = 1.4 - (0.15 x 1.4) = 1.4 - 0.21 = 1.19. Concrete check with CP = 100: MP = 140, discount = 21, SP = 119, profit = 19. The intended trap is 40 - 15 = 25%, which ignores that the 15% discount acts on the already inflated marked price, not on the cost price. Markup-then-discount questions appear repeatedly in GATE GA, and the multiply-the-factors habit solves all of them in one line.'
        },
        {
          id: 'apti-quant-q17',
          q: 'A boat has a speed of 10 km/h in still water and the stream flows at 2 km/h. The total time taken to travel 36 km downstream and return 36 km upstream is:',
          options: ['6 h', '7 h', '7.5 h', '8 h'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Downstream speed = 10 + 2 = 12 km/h, upstream speed = 10 - 2 = 8 km/h. Downstream time = 36/12 = 3 h; upstream time = 36/8 = 4.5 h. Total = 3 + 4.5 = 7.5 h. The tempting wrong route is to average the two speeds to 10 km/h and compute 72/10 = 7.2 h; average speed over equal distances is the harmonic mean, not the arithmetic mean, and the boat spends more time at the slower upstream speed. As a check, harmonic mean = 2 x 12 x 8/(12 + 8) = 192/20 = 9.6 km/h, and 72/9.6 = 7.5 h, agreeing with the direct computation.'
        },
        {
          id: 'apti-quant-q18',
          q: 'A can finish a job in 10 days and B in 15 days. They start together, but A leaves after 2 days. The total number of days (from the start) taken to finish the job is:',
          options: ['10 days', '11 days', '12 days', '14 days'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Take the job as LCM(10, 15) = 30 units, so A does 3 units/day and B does 2 units/day. Together for 2 days they complete (3 + 2) x 2 = 10 units, leaving 20 units. B alone finishes the remaining 20 units at 2 units/day in 10 more days. Total time from the start = 2 + 10 = 12 days. Fraction check: in 2 days together they do 2 x (1/10 + 1/15) = 2 x 1/6 = 1/3 of the job; the remaining 2/3 done by B alone takes (2/3) x 15 = 10 days, confirming 12. The common slip is reporting only the 10 days B works alone and forgetting to add the initial 2 joint days.'
        }
      ]
    },
    {
      id: 'apti-logical',
      name: 'Logical Reasoning',
      theory: {
        intro: 'Logical reasoning questions in GATE General Aptitude test pure pattern-handling: number and letter series, coding-decoding, blood relations, direction sense, seating arrangements, syllogisms, ordering deductions, and calendar or clock arithmetic. No formula sheet exists for most of these; instead, each family has one standard representation that converts the puzzle into mechanical work: a difference row for series, position numbers for letters, a family tree for relations, a coordinate sketch for directions, and a slot diagram for seating. GATE reasoning questions are deliberately short, one or two marks each, and are designed to be solved in about a minute by a prepared candidate while consuming five minutes of an unprepared one. Because the underlying patterns repeat across years with only surface changes, drilling the representations pays off directly in rank. This topic rewards neat rough work: candidates who draw the tiny diagram almost never make errors, while those who juggle constraints mentally frequently do.',
        core: 'Series. For number series, write the row of differences first; if it is not obviously arithmetic, try second differences, ratios (geometric), or the mixed pattern x2 + c. Example families: n^2 + n (2, 6, 12, 20, 30, ...), doubling plus one (3, 7, 15, 31, ...), and squares of primes (4, 9, 25, 49, ...). For letter series, convert letters to positions A=1 ... Z=26 and treat it as a number series; increasing gaps like +2, +3, +4 are the single most common design.\n\nCoding-decoding. Three standard schemes: uniform shift (each letter moves k places), positional sum (word value equals the sum of letter positions), and substitution languages where each word maps to a code token. For substitution languages, intersect sentences: a code common to two sentences codes the word common to them, and the leftover token codes the leftover word.\n\nBlood relations. Draw a small tree: squares or plus signs for males, circles or minus signs for females, vertical lines for parent-child, horizontal for siblings or spouses. Translate one clause at a time. Phrases like the only son of my mother mean the speaker (if male) or the speaker’s brother; resolve them before reading further.\n\nDirections. Put the start at the origin with north up. Track net displacement as (east-west, north-south) components; final distance is by the Pythagorean theorem. Turns are relative to the current heading: left from facing east is north.\n\nSeating. For linear arrangements, draw numbered slots and note the facing direction, since left and right invert when people face south. Place the most constrained person first (extreme ends, fixed positions), then attach pairs like A immediately right of B as movable blocks, and use exclusion constraints last.\n\nSyllogisms. Use Venn thinking. All A are B puts circle A inside B; No A is B makes them disjoint; Some A are B forces an overlap. A conclusion follows only if it is true in every diagram consistent with the premises. The classic invalid jump: from All pens are books and Some books are chairs, nothing links pens with chairs, because the chair-overlap may avoid the pen region entirely. Conversions that are valid: Some A are B implies Some B are A; No A is B implies No B is A. All A are B does not convert to All B are A.\n\nCalendars and clocks. A normal year shifts the weekday of a fixed date by 1, a leap year by 2 (when the leap day is inside the interval). For clock angles, the hour hand moves 0.5 degrees per minute and the minute hand 6 degrees per minute; the angle at H:M is |30H - 5.5M|, taking the smaller of the result and 360 minus it. Hands coincide every 720/11 minutes, so between hour H and H+1 they meet at 60H/11 minutes past H.\n\n• Series: difference row first, then ratios, then mixed x2 + c.\n• Substitution codes: intersect sentences to isolate word-code pairs.\n• Relations: draw the tree, resolve self-references first.\n• Directions: coordinates plus Pythagoras.\n• Seating: fix extremes, then place blocks.\n• Clock angle: |30H - 5.5M|.\n• Weekday shift: +1 normal year, +2 leap year.',
        strategy: 'The speed differentiator in reasoning is choosing the right representation instantly rather than reasoning verbally. Traps to expect: in seating, forgetting that left and right flip for south-facing people; in syllogisms, accepting a conclusion that is merely possible instead of necessary; in blood relations, mis-assigning gender when the puzzle never states it (the question will then ask a relation that works either way, or you must answer cannot be determined); in calendars, applying +2 for a leap year even when February 29 lies outside the counted interval; in series, forcing an arithmetic pattern when the design is ratio-based.\n\nWorked mini-example: find the angle between clock hands at 3:40. Apply |30H - 5.5M| = |90 - 220| = 130 degrees. Done in ten seconds, and since 130 < 180 no reflex subtraction from 360 is needed. Compare that with mentally visualizing hand positions, which invites 5-degree errors from ignoring the hour-hand drift of 0.5 degrees per minute.\n\nProcess habits: always commit constraints to paper in symbolic form (C at slot 1, D at slot 4, BA as a block) and only then enumerate. For syllogisms, actively try to draw a counterexample diagram; if you can, the conclusion does not follow. For series, check your candidate rule against every given term, not just the last two. Budget about one minute per one-mark question; if a seating puzzle resists after two minutes, mark it, move on, and return, because reasoning questions late in a fatigue window are error factories.'
      },
      questions: [
        {
          id: 'apti-logical-q1',
          q: 'The next term of the series 3, 7, 15, 31, 63, ... is:',
          options: ['95', '111', '127', '131'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Check differences first: 4, 8, 16, 32, which double each time, so the next difference is 64 and the next term is 63 + 64 = 127. Equivalently, each term follows the rule next = 2 x current + 1: 2 x 63 + 1 = 127. A third view: every term is one less than a power of two (4, 8, 16, 32, 64, 128), so the next is 128 - 1 = 127. When three independent patterns agree, the answer is certain. Always verify a candidate rule against all given terms: 2 x 3 + 1 = 7, 2 x 7 + 1 = 15, and so on, which all check out here.'
        },
        {
          id: 'apti-logical-q2',
          q: 'The next letter in the sequence B, D, G, K, P, ... is:',
          options: ['U', 'V', 'W', 'T'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Convert letters to alphabet positions: B=2, D=4, G=7, K=11, P=16. The gaps are +2, +3, +4, +5, an increasing arithmetic pattern, so the next gap is +6, giving position 16 + 6 = 22, which is the letter V. Letter series in GATE are almost always number series in disguise, so the winning habit is to translate to positions immediately rather than staring at letters. Verify the whole chain: 2, 4, 7, 11, 16, 22 with differences 2, 3, 4, 5, 6, a clean consistent rule covering every term. Counting six letters forward from P (Q, R, S, T, U, V) confirms V.'
        },
        {
          id: 'apti-logical-q3',
          q: 'In a certain code, each word is assigned the sum of the alphabet positions of its letters, so CAT = 3 + 1 + 20 = 24. In this code, DOG equals:',
          options: ['25', '26', '28', '30'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The coding rule is stated directly: add the positions of the letters. D is the 4th letter, O is the 15th, and G is the 7th. Sum: 4 + 15 + 7 = 26. The only skill tested is recalling letter positions quickly; anchor letters help (E=5, J=10, O=15, T=20, Y=25), so O=15 is instant and D and G are within a hand-count of A=1 and E=5. Double-check by re-adding in a different order: 4 + 7 = 11, plus 15 gives 26. Positional-sum codes are one of the three standard GATE coding schemes, alongside uniform letter shifts and substitution languages.'
        },
        {
          id: 'apti-logical-q4',
          q: 'In a certain code, PLANT is written as QMBOU. In the same code, TIGER is written as:',
          options: ['UJHFS', 'SJHFQ', 'UHJSF', 'UJHSF'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Compare PLANT with QMBOU letter by letter: P to Q, L to M, A to B, N to O, T to U. Every letter shifts forward by exactly one place in the alphabet, a uniform +1 shift. Apply the same shift to TIGER: T to U, I to J, G to H, E to F, R to S, producing UJHFS. Verification is built into the decoding step: shifting UJHFS back by one recovers TIGER exactly. When you spot the first two letters shifting by the same amount, confirm with one more pair and then apply the rule; checking all five pairs of the example word first, as done here, guards against mixed-shift designs where odd and even positions shift differently.'
        },
        {
          id: 'apti-logical-q5',
          q: 'A person walks 4 km towards the north and then 3 km towards the east. The shortest distance from the starting point is:',
          options: ['5 km', '6 km', '7 km', '1 km'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Sketch the path on coordinates with the start at the origin: 4 km north reaches (0, 4), then 3 km east reaches (3, 4). The shortest distance back to the origin is the straight line, given by the Pythagorean theorem: sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5 km. The 3-4-5 right triangle is the most common triple in direction problems, with 6-8-10 and 5-12-13 close behind, so recognizing it saves the square-root computation entirely. The trap answer 7 km is the total walked path length, which the question does not ask for; shortest distance always means the straight-line displacement.'
        },
        {
          id: 'apti-logical-q6',
          q: 'Pointing to a photograph, a man says: she is the daughter of the only son of my mother. How is the woman in the photograph related to the man?',
          options: ['His sister', 'His daughter', 'His niece', 'His cousin'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Resolve the self-reference first: the only son of my mother must be the speaker himself, because he is male and his mother has no other son. The sentence then reduces to: she is the daughter of me. Therefore the woman is his daughter. The design of such questions is always a nested phrase that collapses onto the speaker or an immediate relative; peel it from the inside out. A quick tree check: mother at the top, her only son (the speaker) below, and the pictured girl one level below him as his child. Had the phrase been the only son of my grandmother, it would name his father or uncle instead, so read the generation levels carefully.'
        },
        {
          id: 'apti-logical-q7',
          q: 'B is the sister of A. C is the mother of A. D is the father of C. How is B related to D?',
          options: ['Granddaughter', 'Daughter', 'Niece', 'Sister'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Build the tree one clause at a time. B is the sister of A, so B and A are siblings and B is female. C is the mother of A, and since B is the sibling of A, C is also the mother of B. D is the father of C, placing D one generation above C and two generations above B. A child of the daughter of D is a grandchild of D, and B is female, so B is the granddaughter of D. Tracing the chain compactly: D to C (father to daughter), C to B (mother to daughter), so D to B spans two generations, which is exactly the grandparent-grandchild relation. Drawing the three-level tree makes the answer immediate and error-proof.'
        },
        {
          id: 'apti-logical-q8',
          q: 'Five friends A, B, C, D and E sit in a row facing north. C sits at the extreme left end. D is second from the right. A sits immediately to the right of B. E is not adjacent to C. Who sits in the middle?',
          options: ['A', 'B', 'E', 'D'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Number the seats 1 to 5 from the left (everyone faces north, so left and right match the reader view). Fixed constraints first: C takes seat 1, D takes seat 4 (second from right). The block BA (A immediately right of B) needs two adjacent free seats; the free seats are 2, 3 and 5, so the block must occupy 2 and 3, with B in 2 and A in 3. That leaves E in seat 5, and E is indeed not adjacent to C, satisfying the last constraint. Final order: C, B, A, D, E. The middle seat is 3, occupied by A. The method to internalize: place fixed positions first, then fit adjacent-pair blocks, and use negative constraints only as a final check.'
        },
        {
          id: 'apti-logical-q9',
          q: 'In a row of 40 students, Ram is 17th from the left end. His position from the right end is:',
          options: ['23rd', '24th', '25th', '22nd'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The standard identity: position from right = total - position from left + 1. Here 40 - 17 + 1 = 24, so Ram is 24th from the right. The +1 exists because Ram is counted from both ends; there are 16 students to his left and 40 - 17 = 23 to his right, and 23 students to the right make him the 24th person counting from that end. The trap answer 23rd forgets to add 1, which is precisely why the identity is worth memorizing rather than re-deriving under time pressure. Sanity check with a tiny case: in a row of 3, the 1st from left is 3rd from right, and 3 - 1 + 1 = 3 confirms the formula.'
        },
        {
          id: 'apti-logical-q10',
          q: 'Statements: All pens are books. Some books are chairs. Conclusions: I. Some pens are chairs. II. Some books are pens. Which conclusion logically follows?',
          options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither follows'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Draw the Venn picture: the pens circle sits entirely inside the books circle, and the chairs circle overlaps books somewhere. Conclusion I fails because the chair overlap can lie entirely in the part of books outside pens; since a counterexample diagram exists, I does not necessarily follow. Conclusion II is the valid conversion of All pens are books: if every pen is a book, then some books (namely those pens) are pens, so II follows. Hence only II follows. The tested principle: a syllogism conclusion must hold in every diagram consistent with the premises, not merely in one possible diagram. Chaining All A are B with Some B are C never yields a link between A and C.'
        },
        {
          id: 'apti-logical-q11',
          q: 'Statements: No engineer is an artist. All painters are artists. Conclusions: I. No painter is an engineer. II. Some engineers are painters. Which conclusion logically follows?',
          options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither follows'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Venn picture: the engineers circle and the artists circle are disjoint; the painters circle lies entirely inside artists. Since every painter is inside artists, and artists share nothing with engineers, no painter can be an engineer, so conclusion I necessarily follows in every valid diagram. Conclusion II claims some engineers are painters, which directly contradicts conclusion I and is therefore impossible, not merely unproven. Hence only I follows. This is the classic valid chain: All A are B combined with No B is C yields No A is C. Contrast it with the invalid chain in the previous pattern (All A are B plus Some B are C), which yields nothing; the difference is that a universal negative on B excludes every member of A too.'
        },
        {
          id: 'apti-logical-q12',
          q: 'January 1, 2024 was a Monday. What day of the week was January 1, 2025?',
          options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The year 2024 is a leap year (divisible by 4 and not a century year), so it has 366 days. From January 1, 2024 to January 1, 2025 is exactly 366 days, and 366 mod 7 = 2, so the weekday advances by two: Monday + 2 = Wednesday. The rule to remember: a fixed calendar date advances one weekday after a normal year and two after a leap year, provided February 29 lies inside the interval, which it does here (Feb 29, 2024 falls between the two dates). The common error is applying +1 out of habit, giving Tuesday. Whenever a calendar question spans a year boundary, first classify the year(s) crossed as leap or normal, then add the offsets modulo 7.'
        },
        {
          id: 'apti-logical-q13',
          q: 'The angle between the hour hand and the minute hand of a clock at 3:40 is:',
          options: ['120 degrees', '125 degrees', '130 degrees', '135 degrees'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Use the formula angle = |30H - 5.5M| with H = 3 and M = 40: |30 x 3 - 5.5 x 40| = |90 - 220| = 130 degrees. Since 130 is less than 180, it is already the required angle. The formula works because the hour hand sits at 30 degrees per hour plus 0.5 degrees per minute (30H + 0.5M) while the minute hand sits at 6M degrees; their difference simplifies to 30H - 5.5M. The classic error is treating the hour hand as fixed at the 3 (90 degrees), which gives 240 - 90 = 150 and is wrong because by 3:40 the hour hand has drifted 20 degrees toward the 4. The formula bakes that drift in automatically.'
        },
        {
          id: 'apti-logical-q14',
          q: 'The next term of the series 2, 6, 12, 20, 30, ... is:',
          options: ['36', '40', '42', '44'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Write the difference row: 4, 6, 8, 10, an arithmetic sequence increasing by 2, so the next difference is 12 and the next term is 30 + 12 = 42. A structural view confirms it: the terms are n(n+1) for n = 1, 2, 3, 4, 5 (1x2, 2x3, 3x4, 4x5, 5x6), so the next is 6 x 7 = 42. Equivalently each term is n^2 + n. Having two independent derivations agree is the quickest form of verification in series questions. The habit to build: compute first differences immediately; if they form a clean arithmetic pattern, the answer drops out in one addition, and the product form n(n+1) is a bonus recognition worth storing since GATE reuses this family often.'
        },
        {
          id: 'apti-logical-q15',
          q: 'The next term of the series 4, 9, 25, 49, 121, ... is:',
          options: ['144', '169', '196', '225'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'First differences (5, 16, 24, 72) show no clean pattern, which signals a property-based series rather than a difference-based one. Recognize the terms as perfect squares: 2^2, 3^2, 5^2, 7^2, 11^2. The bases 2, 3, 5, 7, 11 are the consecutive prime numbers, so the next base is the next prime, 13, and the next term is 13^2 = 169. The trap answer 144 = 12^2 comes from assuming consecutive integers get squared, but that would require 16, 36, 64, 100 in the list, which are absent. When differences and ratios both fail, test membership properties: squares, cubes, primes, factorials, and combinations of these cover nearly every hard GATE series.'
        },
        {
          id: 'apti-logical-q16',
          q: 'In a certain language, sky is blue is coded as pa qo ri, blue looks bright is coded as ri tu na, and sky looks clear is coded as pa tu se. The code for bright is:',
          options: ['ri', 'tu', 'na', 'pa'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Intersect the sentences pairwise. Sentences 1 and 2 share only the word blue and only the code ri, so blue = ri. Sentences 2 and 3 share only the word looks and only the code tu, so looks = tu. Now sentence 2 (blue looks bright = ri tu na) has two of its three codes identified: ri is blue and tu is looks, so the leftover token na must code bright. Cross-check with sentence 3: pa and se remain for sky and clear, and sentences 1 and 3 share sky with common code pa, so sky = pa, leaving se = clear and qo = is, a fully consistent assignment. Substitution-language questions always yield to this common-word intersection followed by elimination of leftovers.'
        },
        {
          id: 'apti-logical-q17',
          q: 'At what time between 4 and 5 do the hour hand and the minute hand of a clock coincide?',
          options: ['20 minutes past 4', '21 and 9/11 minutes past 4', '22 and 8/11 minutes past 4', '24 minutes past 4'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'At 4:00 the hour hand leads by 120 degrees. The minute hand gains on the hour hand at 6 - 0.5 = 5.5 degrees per minute, so it needs 120/5.5 = 240/11 = 21 and 9/11 minutes to close the gap. Hence the hands coincide at 21 and 9/11 minutes past 4. General shortcut worth memorizing: between hour H and H+1, coincidence occurs at 60H/11 minutes past H; with H = 4 that is 240/11 immediately. Verify: at that time the minute hand is at 5.5 x 240/11 x ... more directly, minute hand angle = 6 x 240/11 = 1440/11 degrees, hour hand angle = 120 + 0.5 x 240/11 = 120 + 120/11 = 1440/11 degrees, equal as required. The trap answer 20 minutes ignores the hour hand movement during those minutes.'
        },
        {
          id: 'apti-logical-q18',
          q: 'Among five people: P is taller than Q but shorter than R. S is shorter than Q. T is taller than R. Who is the second tallest?',
          options: ['P', 'R', 'T', 'Q'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Translate each clause into inequalities: P > Q and P < R give R > P > Q. S < Q extends the chain downward: R > P > Q > S. T > R caps the chain: T > R > P > Q > S. The ordering is a single total chain with no ambiguity, so the tallest is T and the second tallest is R. Writing the chain left to right as facts arrive is far safer than holding comparisons in your head, and it also instantly answers any variant question (shortest is S, middle is P). Watch for puzzles where the clauses do not force a total order; there the correct answer can be cannot be determined, so always check whether every pair in the asked position is actually resolved. Here every relation needed is fixed, so R is certain.'
        }
      ]
    },
    {
      id: 'apti-verbal',
      name: 'Verbal Ability',
      theory: {
        intro: 'Verbal Ability supplies roughly a third of the General Aptitude marks in GATE and is the section where engineering candidates lose marks they could secure with two weeks of focused pattern work. The tested areas are stable: core grammar (tenses, articles, prepositions, subject-verb agreement), sentence completion, word pairs and analogies, vocabulary in context, and critical reasoning covering inference, assumption and conclusion questions. GATE does not test obscure literary vocabulary; it tests precise reading and the handful of grammar rules that English learners most often violate. Critical reasoning questions look like logic puzzles dressed in prose, and the same necessarily-versus-possibly discipline used in syllogisms applies. Because verbal questions take almost no computation time, a prepared candidate finishes them in seconds each, banking time for the technical sections. The preparation goal is a small internalized checklist: locate the true subject, check the tense timeline, map the analogy relationship, and never infer beyond what the passage strictly states.',
        core: 'Subject-verb agreement. The verb agrees with the head noun of the subject, not with the nearest noun. In the list of items is long, the head is list (singular), so is is correct despite the plural items nearby. Words like each, either, neither, everyone take singular verbs: neither of the answers is correct. But in the construction one of the X who ..., the relative clause attaches to the plural X: one of the students who were absent, because who refers to students.\n\nTenses. Match the timeline. Past perfect (had left) marks the earlier of two past events: by the time we arrived, the train had left. Present perfect (has worked) connects past action to the present and pairs with since or for, not with a finished past time. After hardly, scarcely and no sooner, use inversion and the fixed pairings hardly ... when, no sooner ... than.\n\nArticles and prepositions. The choice of a versus an follows the sound, not the spelling: an hour, a university. Use since with a starting point (since 2019) and for with a duration (for five years). Verbs carry fixed prepositions: comprises takes no of, different from, capable of, inured to.\n\nWord pairs and analogies. State the relationship of the given pair in one sentence, then find the option pair satisfying the same sentence. Common relations: synonym, antonym, part-whole, worker-tool, cause-effect, and composition (ocean is a large body of water; glacier is a large body of ice). For antonym-based analogies like ephemeral : permanent, the answer pair must also be opposites.\n\nVocabulary in context. GATE favours words like candid (frank), inured (accustomed), caustic (bitingly sarcastic), prudent (wise), ambiguous (open to multiple meanings). The context sentence always disambiguates; substitute each option into the sentence and keep the one that preserves the intended meaning. Distinguish the affect/effect pair: affect is usually the verb (the policy will affect employees), effect the noun (the effect of the policy).\n\nCritical reasoning. Three question types recur. Inference: the answer must be necessarily true from the passage alone; the classic trap is affirming the converse, as in all scorers above 90 got scholarships, Ravi got a scholarship, therefore Ravi scored above 90, which is invalid because scholarships may have other routes. Assumption: an unstated premise the argument needs; negate a candidate assumption and see whether the argument collapses. Strengthen/weaken: identify the causal claim and find the option that supports or undercuts specifically that link, such as an alternative cause for the observed result.\n\n• Verb agrees with the head noun, not the nearest noun.\n• Past perfect = earlier of two past events; present perfect pairs with since/for.\n• Article choice follows sound: an hour, a university.\n• Analogies: phrase the relation as a sentence, then test options.\n• Inference must be necessarily true; beware the converse trap.\n• Test an assumption by negating it.\n• Weakeners usually supply an alternative cause.',
        strategy: 'Verbal traps in GATE are engineered around proximity and plausibility. In agreement questions, a plural noun is parked next to the verb to lure you away from the singular head noun (the list of items IS). In one of the X who constructions the lure is reversed: the singular one tempts you, but the relative pronoun points at the plural noun. In critical reasoning, the wrong options are statements that are probably true in the real world but not derivable from the passage; the correct answer can feel bland precisely because it claims less.\n\nSpeed routine for each question family: for grammar, underline the true subject and the time markers before reading options. For analogies, write the relation sentence first (X is frozen composition of Y) so options cannot seduce you by topic similarity. For sentence ordering, find the opener (the sentence that introduces the topic with no backward reference) and chase pronoun and article links (a letter ... it ... the letter) to chain the rest. For inference questions, ask of each option: could the passage be true while this option is false? If yes, eliminate it.\n\nWorked mini-example: statements say all students above 90 got scholarships and Ravi got a scholarship. Option: Ravi scored above 90. The passage can be true while Ravi got a merit-cum-means scholarship at 85, so the option is not inferable; the correct choice is that his score cannot be concluded. That single negation test resolves most inference items in under thirty seconds, making verbal the fastest marks on the paper.'
      },
      questions: [
        {
          id: 'apti-verbal-q1',
          q: 'Choose the correct article: The meeting started ___ hour ago.',
          options: ['a', 'an', 'the', 'no article needed'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Article choice between a and an depends on the initial sound of the following word, not its spelling. The word hour begins with a silent h, so it is pronounced with a vowel sound (like our), which requires an: an hour ago. Contrast this with a university and a European, where the spelled vowels u and e are pronounced with the consonant sound y, taking a. The definite article the would need a specific, already-identified hour, which the sentence does not provide, and omitting the article is ungrammatical before a singular countable noun. This sound-over-spelling rule is a GATE favourite because it punishes mechanical vowel-letter reasoning; always say the word mentally before choosing.'
        },
        {
          id: 'apti-verbal-q2',
          q: 'Choose the correct verb: The list of spare parts ___ on the table.',
          options: ['is', 'are', 'were', 'have been'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The verb must agree with the head noun of the subject phrase, which is list, a singular noun. The phrase of spare parts is only a prepositional modifier; the plural parts sitting next to the verb is the deliberately placed distractor. Since the subject is singular and the sentence states a present fact, the correct verb is is. Both are and have been wrongly agree with the nearby plural, and were additionally shifts the tense to past without any time cue. The reliable routine: strike out every of-phrase between subject and verb, then match the verb to what remains (the list ... is). This proximity trap is among the most repeated grammar patterns in GATE verbal questions.'
        },
        {
          id: 'apti-verbal-q3',
          q: 'Choose the correct option: By the time we reached the station, the train ___.',
          options: ['left', 'had left', 'has left', 'leaves'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Two past events are sequenced here: the train departing happened before our reaching the station. English marks the earlier of two past events with the past perfect, so the train had left is correct. The simple past left would place the two events without clear ordering and clashes with the by the time frame, which explicitly demands anteriority. The present perfect has left is impossible alongside a past-time clause (we reached), since present perfect ties an action to the present moment. The simple present leaves describes habits or schedules and breaks the narrative timeline entirely. Cue phrases like by the time, before and after are the fastest signals: by the time + past almost always forces had + past participle in the main clause.'
        },
        {
          id: 'apti-verbal-q4',
          q: 'Choose the correct preposition: She has been working in this laboratory ___ 2019.',
          options: ['for', 'since', 'from', 'before'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The present perfect continuous (has been working) links a past starting point to the present, and the year 2019 is a point in time, not a duration. A starting point takes since: since 2019. The preposition for pairs with durations (for six years), so for 2019 would absurdly mean a duration of 2019 years. From marks a starting point too, but idiomatic English pairs from with to or until (from 2019 to 2023) and does not sit naturally with the present perfect. Before 2019 would place the work earlier than 2019, contradicting the intended meaning. The two-second test: ask whether the time expression answers since when (point, use since) or how long (duration, use for); 2019 answers since when.'
        },
        {
          id: 'apti-verbal-q5',
          q: 'Ocean : Water :: Glacier : ?',
          options: ['Snow', 'Ice', 'Mountain', 'River'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'First phrase the relation of the given pair as a sentence: an ocean is a very large natural mass composed of water. Now demand the same sentence from the answer: a glacier is a very large natural mass composed of ice. Glaciers are formed from compacted snow that has recrystallized into ice, so ice, not snow, is the substance a glacier actually consists of; snow is the raw input, one step removed. Mountain fails because a glacier may sit on a mountain but is not made of it (location, not composition), and river fails similarly (a glacier can feed a river). The discipline of writing the relation sentence before looking at options is what prevents topic-similarity traps in GATE analogy questions.'
        },
        {
          id: 'apti-verbal-q6',
          q: 'Choose the word closest in meaning to CANDID:',
          options: ['Frank', 'Secretive', 'Rude', 'Hesitant'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Candid means truthful, direct and straightforward in speech or expression, as in a candid assessment of the project. Frank carries exactly this meaning of open honesty, making it the correct synonym. Secretive is close to an antonym, describing someone who conceals rather than reveals. Rude is the crafted near-trap: blunt honesty can shade into rudeness, but candid itself carries no implication of disrespect; a candid remark can be perfectly polite. Hesitant describes reluctance to speak, again opposing the directness in candid. When two options feel related, ask which one preserves the sentence meaning with no added connotation: replacing candid with frank changes nothing, while replacing it with rude injects hostility the original never had.'
        },
        {
          id: 'apti-verbal-q7',
          q: 'Ephemeral : Permanent :: Transparent : ?',
          options: ['Clear', 'Opaque', 'Fragile', 'Visible'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Identify the relation in the given pair first: ephemeral (lasting a very short time) and permanent (lasting indefinitely) are antonyms. The answer must therefore be the antonym of transparent. Transparent means allowing light through so objects behind are clearly seen; its opposite is opaque, allowing no light through. Clear and visible are near-synonyms of transparent and are placed to catch candidates who match by association instead of by relation; fragile belongs to a different axis entirely (strength, not light transmission). The one-sentence method makes this mechanical: the first pair are opposites, so pick the opposite of the third word. Analogy questions in GATE reward classifying the relation type (synonym, antonym, part-whole, cause-effect) before scanning any option.'
        },
        {
          id: 'apti-verbal-q8',
          q: 'Choose the correct verb: Neither of the two answers ___ correct.',
          options: ['are', 'is', 'were', 'have been'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The pronoun neither is grammatically singular, meaning not one of the two, so it takes a singular verb: neither of the answers is correct. The phrase of the two answers is a prepositional modifier whose plural noun sits next to the verb as a deliberate distractor, exactly like the list-of-items pattern. Are and have been wrongly agree with the nearby plural; were both pluralizes and shifts to past tense with no time cue. The same singular rule covers either, each, everyone, everybody, and every one of. One caution for harder variants: in the neither ... nor construction joining two subjects, the verb agrees with the nearer subject (neither the manager nor the workers were present), which is a different rule from the bare pronoun neither tested here.'
        },
        {
          id: 'apti-verbal-q9',
          q: 'Choose the correct option: Hardly had he reached the station ___ the train departed.',
          options: ['than', 'when', 'then', 'while'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The adverbs hardly and scarcely form a fixed correlative pair with when: hardly had he reached the station when the train departed. The parallel construction no sooner pairs with than instead, because sooner is a comparative and comparatives take than: no sooner had he reached than the train departed. The trap option than tests exactly this confusion between the two templates. Then is a sequencing adverb, not a conjunction, and cannot join the clauses; while would demand two overlapping ongoing actions, contradicting the instantaneous sequence the sentence describes. Also note the inversion (hardly had he, not hardly he had), which GATE sometimes tests in the same breath. Memorize the two frames as fixed units: hardly/scarcely ... when, no sooner ... than.'
        },
        {
          id: 'apti-verbal-q10',
          q: 'The idiom "to bite the bullet" means:',
          options: ['To speak aggressively in an argument', 'To act in unnecessary haste', 'To face a painful situation with courage', 'To take revenge on an enemy'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'To bite the bullet means to brace oneself and endure something painful or unpleasant that can no longer be avoided, as in the company finally bit the bullet and restructured its debt. The phrase is traced to battlefield surgery before anaesthesia, when a patient would bite on a bullet to endure the pain, which makes the meaning easy to anchor in memory. The wrong options each borrow surface imagery from the words: aggression from bite, haste and violence from bullet, but idioms are fixed expressions whose meanings cannot be assembled from their parts, which is precisely what such questions test. In usage-based questions, mentally substitute each option meaning into a sample sentence and keep the one that fits accepted usage rather than literal word imagery.'
        },
        {
          id: 'apti-verbal-q11',
          q: 'Choose the word closest in meaning to INURED in the sentence: Years of fieldwork had inured her to harsh criticism.',
          options: ['Opposed', 'Sensitive', 'Accustomed', 'Injured'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Inured means hardened by long exposure, so that something unpleasant no longer troubles you; the sentence says years of fieldwork made harsh criticism lose its sting for her, which matches accustomed (specifically, toughened by habit). The context confirms it: substitute accustomed to harsh criticism and the sentence keeps its meaning. Injured is the phonetic trap, chosen for its similar sound; it reverses the sense, since being inured to criticism means precisely that it no longer wounds. Sensitive is a direct antonym in this context, and opposed misreads the sentence as expressing disagreement rather than tolerance. GATE vocabulary items nearly always include one sound-alike distractor and one antonym; the substitution test into the given sentence eliminates both reliably.'
        },
        {
          id: 'apti-verbal-q12',
          q: 'Choose the correct word: The revised examination policy will ___ all final-year students.',
          options: ['effect', 'affect', 'effected', 'affection'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The sentence needs a verb meaning to influence or have an impact on, which is affect: the policy will affect all final-year students. Effect is ordinarily a noun (the effect of the policy); the auxiliary will requires a base-form verb, so the noun cannot fit, and effected is a past form and also carries the rarer verb sense to bring about (to effect a change), which would mean the policy creates the students, an absurd reading. Affection is a noun meaning fondness and fails both grammatically and semantically. The working rule: affect = verb (to influence), effect = noun (the result), with the narrow exception effect-as-verb meaning to bring about. GATE places this pair regularly because the misuse is common even among fluent writers.'
        },
        {
          id: 'apti-verbal-q13',
          q: 'Statement: All students who scored above 90 received scholarships. Ravi received a scholarship. Which of the following can be logically concluded?',
          options: ['Ravi scored above 90', 'Ravi scored below 90', 'Ravi may or may not have scored above 90', 'Ravi did not appear for the exam'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The statement says scoring above 90 guarantees a scholarship; it does not say scholarships come only from scoring above 90. There may be other routes, such as sports quotas or need-based awards, that the passage neither confirms nor rules out. Concluding that Ravi scored above 90 commits the converse fallacy: from if A then B and B, one cannot infer A. Equally, nothing supports the claim that he scored below 90 or skipped the exam. The only necessarily true option is that his score cannot be determined: he may or may not have scored above 90. The test to apply: can the passage be true while the option is false? For option one, yes (Ravi at 85 with a sports scholarship), so it fails; for option three, no, making it the valid conclusion.'
        },
        {
          id: 'apti-verbal-q14',
          q: 'Choose the most appropriate word: The reviewer’s ___ remarks left the young author too demoralized to write for months.',
          options: ['encouraging', 'caustic', 'neutral', 'ambiguous'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The second clause states the outcome: the author was demoralized for months, so the blank needs a word for harshly hurtful criticism. Caustic literally means capable of burning by chemical action and figuratively means bitingly sarcastic or scathing, which matches a review that wounds its target. Encouraging produces a contradiction with the demoralizing effect; neutral remarks would leave the author indifferent, not crushed; ambiguous remarks are merely unclear, which might confuse but not devastate. Sentence-completion items in GATE are solved by reading the consequence clause first and letting it dictate the emotional polarity of the blank: here the polarity is strongly negative and intense, and only caustic supplies both the negativity and the intensity.'
        },
        {
          id: 'apti-verbal-q15',
          q: 'Statements: No teacher is lazy. Some lazy people are rich. Which conclusion logically follows?',
          options: ['Some teachers are rich', 'Some rich people are not teachers', 'No rich person is a teacher', 'All rich people are lazy'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Draw the Venn picture: the teacher circle and the lazy circle are disjoint; the rich circle overlaps the lazy circle somewhere. Consider the rich people inside that overlap: they are lazy, and since no lazy person can be a teacher, those rich people are not teachers. Hence some rich people are not teachers necessarily follows in every consistent diagram. Option one is merely possible (rich non-lazy teachers could exist) but not forced. Option three overreaches: rich people outside the lazy region are free to be teachers, so a diagram refutes it. Option four reverses some into all, an illegal strengthening. The reasoning template: a particular premise (some) combined with a universal negative (no) yields a valid particular negative conclusion about the terms it connects.'
        },
        {
          id: 'apti-verbal-q16',
          q: 'Arrange the sentences into a coherent paragraph: P. He opened the letter with trembling hands. Q. A letter arrived for him early in the morning. R. The news inside changed his life forever. S. It bore the seal of a famous university.',
          options: ['QSPR', 'QPSR', 'SQPR', 'QPRS'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Find the opener: Q introduces the letter with the indefinite article (a letter) and no backward reference, so it must start the paragraph; S and P both use pronouns (it, the letter) that need an antecedent, and R refers to news inside something already opened. Next, chase the reference chain: S (it bore the seal) naturally describes the just-arrived letter, building anticipation before any action. P then narrates opening it, and R gives the consequence of reading, which must come last since news inside is accessible only after opening. The order QSPR reads: arrival, description, opening, outcome, a clean narrative arc. QPSR fails because describing the seal after the letter is opened breaks the suspense logic; the seal is observed on the sealed envelope. Pronoun antecedents plus chronological action ordering settle such questions quickly.'
        },
        {
          id: 'apti-verbal-q17',
          q: 'Choose the correct verb: One of the students who ___ absent yesterday has now apologized to the teacher.',
          options: ['was', 'were', 'is', 'has been'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'The relative pronoun who attaches to the nearest noun, students, which is plural: the clause means that several students were absent, and this person is one of them. So the verb inside the relative clause must be plural past: who were absent. The singular one is the engineered trap; note that the main clause verb has apologized correctly stays singular because its subject is one. Compare the contrasting frame the only one of the students who was absent, where the clause truly describes a single person and takes the singular. Tense also matters: yesterday demands past, eliminating is and has been outright. Parsing which noun the relative clause modifies, rather than grabbing the grammatical subject of the whole sentence, is the entire skill this classic GATE pattern tests.'
        },
        {
          id: 'apti-verbal-q18',
          q: 'Argument: In field trials, plots treated with fertilizer X yielded 30% more grain than untreated plots. Therefore, all farmers should adopt fertilizer X to raise their yields. Which of the following, if true, most weakens the argument?',
          options: ['Fertilizer X is manufactured by several companies', 'The trial plots had irrigation and soil quality far better than typical farms', 'Some farmers have already heard about fertilizer X', 'Grain prices have risen over the last two years'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'The argument generalizes from trial plots to all farms, silently assuming trial conditions resemble typical farm conditions. The option stating that trial plots enjoyed far better irrigation and soil directly attacks that assumption: the 30% gain may have depended on those superior conditions, so ordinary farms might see little or no benefit, undercutting the recommendation. The other options leave the causal generalization untouched: who manufactures the fertilizer, whether farmers have heard of it, and how grain prices moved say nothing about whether X raises yields on typical farms. The method for weaken questions: first isolate the inferential leap (trials imply everywhere), then pick the option that widens exactly that gap, usually by revealing unrepresentative evidence or an alternative explanation for the observed result.'
        }
      ]
    },
    {
      id: 'apti-data-spatial',
      name: 'Data Interpretation & Spatial Reasoning',
      theory: {
        intro: 'This topic bundles the two most visual families in GATE General Aptitude: data interpretation (reading tables, bar charts, pie charts and line graphs, then computing percentages, ratios, averages and growth rates from them) and spatial reasoning (paper folding, mirror and water images, pattern assembly, dice and painted-cube problems). Both families reward method over insight. Data interpretation is arithmetic wrapped in a chart: the danger is not difficulty but haste, since misreading one bar or one sector angle wastes the whole computation. Spatial questions have fixed rule sets: a pie sector converts to value through its angle, a mirror flips left-right, water flips top-bottom, opposite die faces sum to seven on a standard die, and a painted cube dissects into predictable face-count classes. GATE has increased the weight of DI questions in recent years, often pairing one chart with a two-mark computation, so fluency here directly protects your rank while costing very little preparation time.',
        core: 'Data interpretation. From a table or bar chart, the recurring computations are: percentage change = (new - old)/old x 100; ratio of two readings reduced to lowest terms; average over a period; and share of one category = category/total x 100. For line graphs asking for the highest percentage growth, compare growth divided by the starting value of each interval, not the raw increase: a rise from 50 to 60 (20%) beats a rise from 75 to 80 (6.7%) despite similar visual jumps. In pie charts, the full circle of 360 degrees represents the total, so a sector of angle A represents A/360 of the total; a 90-degree sector is exactly one quarter. Combined averages must be weighted: two groups of sizes n1 and n2 with averages a1 and a2 combine to (n1 a1 + n2 a2)/(n1 + n2), never the midpoint of a1 and a2.\n\nMirror and water images. A mirror placed vertically flips left and right but preserves top and bottom; letters symmetric about a vertical axis (A, H, I, M, O, T, U, V, W, X, Y) look unchanged. A water image is a reflection in a horizontal surface: it flips top and bottom, preserving left-right order; letters symmetric about a horizontal axis (B, C, D, E, H, I, K, O, X) look unchanged. For mirror-image clock problems, the mirror time and the actual time sum to 12:00 (or 11:60), so a clock showing 4:20 appears as 7:40 in the mirror.\n\nDice. On a standard die, opposite faces sum to 7: 1-6, 2-5, 3-4. For two views of an unknown die sharing a common face, list the faces adjacent to that common face across both views; the one number never adjacent to it must be opposite. A face can be adjacent to at most four others, so once four distinct neighbours are seen, the opposite face is forced.\n\nPainted cubes. An n x n x n cube painted outside and cut into unit cubes yields: 8 corner cubes with three painted faces; 12(n-2) edge cubes with exactly two; 6(n-2)^2 face cubes with exactly one; and (n-2)^3 interior cubes with none. For n = 3: 8, 12, 6, 1. For n = 4: 8, 24, 24, 8. The four counts always total n^3, which is the built-in check.\n\nPaper folding. Each fold doubles the number of layers, and a single punch creates one hole per layer: two folds give four layers and four holes. When unfolding, each hole reflects across every fold line in reverse order, so the final pattern is symmetric about all fold lines.\n\nCounting figures. Squares in an n x n grid of unit squares total 1^2 + 2^2 + ... + n^2 counted by size: for a 3 x 3 grid, 9 + 4 + 1 = 14.\n\n• Percentage growth compares to the starting value of that interval.\n• Pie: value = angle/360 x total; 90 degrees = quarter.\n• Combined average is weighted by group sizes.\n• Mirror flips left-right; water flips top-bottom.\n• Mirror clock: actual + image = 11:60.\n• Standard die: opposite faces sum to 7.\n• Painted n-cube: 8 corners, 12(n-2) edges, 6(n-2)^2 faces, (n-2)^3 interior.\n• Squares in an n x n grid: sum of squares up to n^2.',
        strategy: 'DI traps are calibrated misreadings: percentage of the wrong base (profit as a share of revenue when the question says expenses), growth compared against the final value instead of the initial one, and unweighted averaging of two group means. Before computing anything, restate the question in the form value A divided by value B and confirm both from the chart. Round smartly: GATE options are usually spaced widely enough that approximating 33.33% as one-third or 7200/12 as 600 settles the answer without long division.\n\nSpatial traps: confusing mirror (left-right flip) with water (top-bottom flip) images, assuming a die in a puzzle is the standard sum-to-seven die when two views are given instead (use adjacency elimination in that case), and forgetting that a punched hole multiplies by the number of layers, not the number of folds. For painted-cube questions, write the four formulas and total them to n^3 as a verification before answering.\n\nWorked mini-example: a 4 x 4 x 4 painted cube is cut into 64 unit cubes; how many have exactly two painted faces? Two-face cubes live on edges but not corners: 12 edges x (4 - 2) = 24. Check the full census: 8 + 24 + 24 + 8 = 64, which matches 4^3, so the answer is certain.\n\nTime policy: DI questions are two-mark questions that decompose into two or three one-line calculations; do them on paper, not mentally, because a single transposed digit destroys both marks. Spatial questions are thirty-second questions once the rule is known; if a figure-based item resists visualization, use the rule tables above rather than staring harder at the figure.'
      },
      questions: [
        {
          id: 'apti-data-spatial-q1',
          q: 'A company allocates 25% of its annual budget of Rs. 48 lakh to salaries, shown as a sector in a pie chart. The amount spent on salaries is:',
          options: ['Rs. 10 lakh', 'Rs. 12 lakh', 'Rs. 14 lakh', 'Rs. 16 lakh'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'A pie chart sector representing 25% corresponds to a quarter of the total, whichever way the chart labels it (25% or a 90-degree angle, since 90/360 = 1/4). Salaries = 25% of 48 lakh = 48/4 = Rs. 12 lakh. Fast route: for common percentages convert to fractions instantly (25% = 1/4, 12.5% = 1/8, 33.33% = 1/3, 20% = 1/5) rather than multiplying by 0.25. Verify by scaling: 10% of 48 is 4.8, so 25% is 4.8 x 2.5 = 12, consistent. The only real risk in such questions is applying the percentage to a partial total given elsewhere in a multi-part chart, so always confirm the base amount the percentage refers to.'
        },
        {
          id: 'apti-data-spatial-q2',
          q: 'A table shows factory production of 120 units in 2021 and 150 units in 2022. The percentage increase in production is:',
          options: ['20%', '25%', '30%', '15%'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Percentage change is always measured against the old (starting) value: (150 - 120)/120 x 100 = 30/120 x 100 = 25%. Fast route: 30/120 simplifies to 1/4 at sight, and 1/4 is 25%. The standard trap is dividing the increase by the new value, 30/150 = 20%, which is exactly the wrong option placed first. A useful asymmetry to remember: going from 120 to 150 is a 25% rise, but returning from 150 to 120 is only a 20% fall, because the base changes; GATE exploits this by asking one direction and offering the other as a distractor. Anchoring the phrase increase over 2021 to the 2021 denominator prevents the slip.'
        },
        {
          id: 'apti-data-spatial-q3',
          q: 'Which of the following letters appears unchanged in its mirror image (mirror placed vertically to the side)?',
          options: ['B', 'C', 'M', 'S'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A vertical mirror swaps left and right, so a letter survives unchanged only if it is symmetric about a vertical axis through its middle. M has identical left and right halves, so its mirror image is M itself. B and C are symmetric about a horizontal axis instead (their top and bottom halves match), so they stay unchanged in a water image but get reversed in a mirror. S has only rotational symmetry and is altered by both reflections. The full set of vertically symmetric capitals worth memorizing is A, H, I, M, O, T, U, V, W, X, Y; a handy mnemonic is that these are exactly the letters that read the same in words like MOM viewed in a mirror. Classifying the axis of symmetry answers every such question instantly.'
        },
        {
          id: 'apti-data-spatial-q4',
          q: 'Which of the following letters appears unchanged in its water image (reflection in water below it)?',
          options: ['A', 'O', 'P', 'R'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A water image is a reflection in a horizontal surface, flipping top and bottom while keeping left-right order. A letter is unchanged only if it is symmetric about a horizontal axis. O is symmetric about both axes, so it survives any reflection, including water. A is symmetric about a vertical axis, so it survives a mirror but turns upside down in water (its apex points down). P and R have no reflective symmetry at all and are distorted by both. The horizontally symmetric capitals to memorize are B, C, D, E, H, I, K, O, X. Note how the mirror set and the water set differ: contrasting the two lists (and their common members H, I, O, X) is exactly what GATE image questions probe.'
        },
        {
          id: 'apti-data-spatial-q5',
          q: 'On a standard die, the numbers on opposite faces add up to 7. If 3 is on the top face, the number on the bottom face is:',
          options: ['2', '4', '5', '6'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The top and bottom faces of a die are opposite faces. On a standard die the opposite pairs are fixed by the sum-to-seven rule: 1 pairs with 6, 2 with 5, and 3 with 4. With 3 on top, the bottom face is 7 - 3 = 4. This one-line rule dispatches all standard-die questions, but note its limits for harder variants: when a puzzle shows two views of an unlabeled die, you must not assume the sum-to-seven property; instead, list the faces seen adjacent to a common face and eliminate, since a face has only four neighbours. Recognizing which of the two regimes a dice question belongs to, standard rule versus adjacency deduction, is the entire skill being tested.'
        },
        {
          id: 'apti-data-spatial-q6',
          q: 'A bar chart shows quarterly sales: Q1 = 40 units, Q2 = 55 units, Q3 = 65 units, Q4 = 80 units. The ratio of Q1 sales to Q4 sales is:',
          options: ['1:2', '2:3', '2:1', '3:4'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Read the two required bars and ignore the rest: Q1 = 40 and Q4 = 80. The ratio 40:80 reduces by dividing both sides by 40, giving 1:2. The distractor 2:1 is the same ratio written in reverse order, testing whether you preserve the order stated in the question (Q1 to Q4, so the smaller number comes first). The middle bars Q2 and Q3 exist purely as noise; efficient DI reading means extracting only the values the question names. As a habit, reduce ratios by the obvious greatest common divisor in one step (here 40) rather than stepwise, and re-read the question once to confirm which quantity is the antecedent before locking the answer.'
        },
        {
          id: 'apti-data-spatial-q7',
          q: 'A table shows annual profits of a firm over five years: 20, 25, 30, 35 and 40 (in Rs. lakh). In how many years was the profit strictly above the five-year average?',
          options: ['1', '2', '3', '4'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'First compute the average: (20 + 25 + 30 + 35 + 40)/5 = 150/5 = 30. Fast route: the values form an arithmetic progression, and the average of an AP is its middle term, 30, with no addition needed. Now count the years strictly above 30: only 35 and 40 qualify, giving 2 years. The year at exactly 30 is the deliberate edge case; strictly above excludes it, and the option 3 is waiting for anyone who includes it. Two habits make such questions safe: exploit symmetry (AP average = middle term) to avoid arithmetic entirely, and honour boundary words like strictly, at least and more than, which GATE uses precisely to separate careful readers from hasty ones.'
        },
        {
          id: 'apti-data-spatial-q8',
          q: 'A line graph shows the number of users of an app: 2021 = 50k, 2022 = 60k, 2023 = 75k, 2024 = 80k. In which period was the percentage growth the highest?',
          options: ['2021 to 2022', '2022 to 2023', '2023 to 2024', 'Growth was equal in all periods'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Percentage growth compares each rise to the starting value of its own interval. 2021 to 2022: 10/50 = 20%. 2022 to 2023: 15/60 = 25%. 2023 to 2024: 5/75 = 6.67%. The highest is 25%, in 2022 to 2023. The trap is judging by raw increases (10, 15, 5) or by the visual steepness of the line, both of which ignore the changing base; here the raw-increase ranking happens to agree, but GATE frequently designs data where the largest absolute jump sits on the largest base and is not the fastest growth. The reliable routine: form the fraction rise/start for every interval before comparing, and simplify each to a familiar percentage (1/5, 1/4, 1/15) rather than computing decimals.'
        },
        {
          id: 'apti-data-spatial-q9',
          q: 'Two views of the same unlabeled die are shown. In the first view, the faces 2, 3 and 5 are visible; in the second view, the faces 3, 4 and 6 are visible. Which number is on the face opposite to 3?',
          options: ['1', '2', '5', '6'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'In any single view of a die, the three visible faces are mutually adjacent. From view one, 3 is adjacent to 2 and 5; from view two, 3 is adjacent to 4 and 6. So 3 touches four distinct faces: 2, 4, 5 and 6. A cube face has exactly four neighbours, so the list of neighbours of 3 is now complete, and the only remaining number, 1, must be on the opposite face. Note that the sum-to-seven rule for standard dice would give 4 as the answer, and 4 is impossible here because view two shows 3 and 4 side by side; this is precisely why unlabeled-die questions must be solved by adjacency elimination, never by assuming the standard layout. Seeing four distinct neighbours forces the opposite face immediately.'
        },
        {
          id: 'apti-data-spatial-q10',
          q: 'A 3 x 3 x 3 cube is painted on all six outer faces and then cut into 27 unit cubes. How many unit cubes have paint on exactly one face?',
          options: ['4', '6', '8', '12'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Unit cubes with exactly one painted face are those at the centre of each outer face: they touch one face of the big cube but no edge. Each face of a 3 x 3 x 3 cube has (3-2) x (3-2) = 1 such central cube, and there are 6 faces, giving 6 x 1 = 6. The general formula is 6(n-2)^2 with n = 3. Verify with the full census: 8 corners (three faces painted) + 12 edge cubes (two faces) + 6 face centres (one face) + 1 hidden centre (no paint) = 27 = 3^3, so the classification is exhaustive and the answer is confirmed. Writing all four counts and totalling to n^3 takes ten seconds and immunizes you against every variant of the painted-cube question.'
        },
        {
          id: 'apti-data-spatial-q11',
          q: 'A 3 x 3 x 3 cube is painted on all six outer faces and cut into 27 unit cubes. How many unit cubes have paint on exactly two faces?',
          options: ['8', '10', '12', '24'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Cubes with exactly two painted faces lie on the edges of the big cube, strictly between two corners. A cube has 12 edges, and each edge of a 3 x 3 x 3 cube contains n - 2 = 1 such middle cube, giving 12 x 1 = 12. The general count is 12(n-2). The distractor 8 is the corner count (three painted faces) and 24 is the two-face count for a 4 x 4 x 4 cube, so the options directly test whether you attach the right formula to the right cube size. Full check: 8 + 12 + 6 + 1 = 27 matches 3^3. Associating each face-count class with its geometric home, corners for three, edges for two, face interiors for one, body centre for zero, converts these into pure recall questions.'
        },
        {
          id: 'apti-data-spatial-q12',
          q: 'A data table shows that a company earned a revenue of Rs. 2400 crore against total expenses of Rs. 1800 crore. The profit expressed as a percentage of expenses is:',
          options: ['25%', '30%', '33.33%', '35%'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Profit = revenue - expenses = 2400 - 1800 = Rs. 600 crore. The question fixes the base explicitly: as a percentage of expenses, so compute 600/1800 x 100 = 33.33%. Fast route: 600/1800 is 1/3 at sight, and one-third is 33.33%. The trap option 25% is 600/2400, profit as a share of revenue, which answers a different question; DI answer choices routinely include the same numerator over the alternative base. The defensive habit: before dividing, write the fraction with the base named by the question in the denominator and glance back at the wording once. Percentage-of-what errors are the single largest source of lost DI marks in GATE, and they are entirely preventable.'
        },
        {
          id: 'apti-data-spatial-q13',
          q: 'How many squares of all sizes are there in a 3 x 3 grid of unit squares?',
          options: ['9', '13', '14', '15'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Count by size class. Unit squares (1x1): 3 x 3 = 9. Squares of size 2x2: their top-left corner can sit in a 2 x 2 range of positions, giving 4. Squares of size 3x3: just 1, the whole grid. Total: 9 + 4 + 1 = 14. The general rule for an n x n grid is the sum of the first n perfect squares, n^2 + (n-1)^2 + ... + 1; a k x k square can be placed in (n-k+1)^2 positions. The distractor 9 counts only the visible unit cells, the most common miscount. For rectangle-counting variants the formula changes to choosing two horizontal and two vertical lines, C(n+1,2)^2, so keep the two templates distinct. Size-class enumeration is systematic and immune to double counting.'
        },
        {
          id: 'apti-data-spatial-q14',
          q: 'A square sheet of paper is folded in half once, then folded in half again, and a single hole is punched through all layers. When the sheet is fully unfolded, the number of holes is:',
          options: ['2', '3', '4', '8'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Each fold doubles the number of paper layers: one fold gives 2 layers, the second fold gives 4. A single punch pierces every layer beneath it, creating one hole per layer, so unfolding reveals 4 holes. The count depends on layers, not on the number of folds, which is why the tempting answer 2 (one per fold) is wrong; 8 would require three folds. The positions of the holes also follow a rule worth knowing for figure-based variants: on unfolding, holes appear as reflections across each fold line in reverse order, so the four holes here form a pattern symmetric about both fold creases. The complete mental model is layers = 2^folds and holes mirror across every crease.'
        },
        {
          id: 'apti-data-spatial-q15',
          q: 'A table shows two branches of an institute. Branch 1 has 60 students with an average score of 70, and Branch 2 has 40 students with an average score of 55. The combined average score of all 100 students is:',
          options: ['62.5', '64', '65', '63'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'A combined average must be weighted by group sizes: (60 x 70 + 40 x 55)/(60 + 40) = (4200 + 2200)/100 = 6400/100 = 64. The distractor 62.5 is the unweighted midpoint of 70 and 55, which would be correct only for equal group sizes; here the larger group scores higher, pulling the combined mean above the midpoint, and 64 > 62.5 confirms the direction. Fast route via deviations: take 55 as base; Branch 1 sits 15 above it with weight 0.6, so the combined mean is 55 + 0.6 x 15 = 55 + 9 = 64, done mentally. Checking that the answer lies between the two group means, closer to the bigger group, is a built-in sanity test for every weighted-average question.'
        },
        {
          id: 'apti-data-spatial-q16',
          q: 'A pie chart of a monthly budget of Rs. 7200 shows rent as a 90-degree sector and food as a 120-degree sector. How much more is spent on food than on rent?',
          options: ['Rs. 400', 'Rs. 500', 'Rs. 600', 'Rs. 800'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Convert angles to money through the fraction of 360 degrees. Rent: 90/360 = 1/4 of 7200 = Rs. 1800. Food: 120/360 = 1/3 of 7200 = Rs. 2400. Difference = 2400 - 1800 = Rs. 600. Faster still, work with the angle difference directly: food exceeds rent by 30 degrees, and each degree is worth 7200/360 = Rs. 20, so the gap is 30 x 20 = Rs. 600, one multiplication. The per-degree rate trick (total/360) is the general accelerator for angle-based pie charts, and the fraction shortcuts 90 = quarter, 120 = third, 60 = sixth, 45 = eighth cover nearly every sector GATE draws. Both routes agreeing at 600 gives immediate verification.'
        },
        {
          id: 'apti-data-spatial-q17',
          q: 'A 4 x 4 x 4 cube is painted on all six outer faces and cut into 64 unit cubes. How many unit cubes have paint on exactly two faces?',
          options: ['16', '20', '24', '32'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Two-face cubes occupy edge positions between corners. Each of the 12 edges of the cube holds n - 2 = 4 - 2 = 2 such cubes, so the count is 12 x 2 = 24. Verify with the complete census for n = 4: corners 8 (three faces), edges 12 x 2 = 24 (two faces), face interiors 6 x (4-2)^2 = 24 (one face), hidden interior (4-2)^3 = 8 (no paint). Total: 8 + 24 + 24 + 8 = 64 = 4^3, confirming the classification. Note the coincidence that one-face and two-face counts are both 24 at n = 4, which the options exploit; at larger n the one-face count 6(n-2)^2 overtakes the two-face count 12(n-2). Formula recall plus the n^3 total check makes this a sixty-second question.'
        },
        {
          id: 'apti-data-spatial-q18',
          q: 'A wall clock shows the time as 4:20. The time shown by its image in a plane mirror is:',
          options: ['7:40', '8:40', '7:20', '6:40'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'A mirror reflects the dial left-right, and the reflected reading plus the actual reading always total 12 hours. Compute 11:60 - 4:20 (writing 12:00 as 11:60 to make the subtraction clean): hours 11 - 4 = 7, minutes 60 - 20 = 40, giving 7:40. Verify by adding back: 7:40 + 4:20 = 12:00, as required. The 11:60 form avoids the borrow error that produces the distractor 8:40 (subtracting from 12:00 incorrectly) and 7:20 (forgetting to subtract the minutes). One refinement for other problems: when the actual time is between 11:00 and 1:00, use 23:60 minus the time instead, so the answer stays on the dial. The sum-to-twelve rule turns every mirror-clock question into a single subtraction.'
        }
      ]
    }
  ]
};
