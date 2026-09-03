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

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-quant';}).questions.push(
  {
    id: 'apti-quant-x1',
    q: 'The price of an item is first increased by 20 percent and then the new price is decreased by 10 percent. What is the net percentage change in the price compared to the original?',
    options: ['6 percent increase', '8 percent increase', '10 percent increase', '12 percent increase'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Use the successive percentage change formula: net change = a + b + ab/100, where a and b carry their own signs. Here a = 20 and b = -10, so net change = 20 - 10 + (20 x -10)/100 = 10 - 2 = 8 percent increase. The fast mental route: take a base of 100, apply +20 to get 120, then apply -10 to get 120 x 0.9 = 108, a net gain of 8. Never simply add 20 and subtract 10 to get 10, since one change acts on a different base than the other; the correction term ab/100 captures exactly this base shift. Memorizing this single formula replaces two multiplication steps with one arithmetic line, which is the speed advantage needed for GATE.'
  },
  {
    id: 'apti-quant-x2',
    q: 'A quantity is increased by 20 percent and then the resulting value is further increased by 25 percent. What single percentage increase applied once would produce the same final value?',
    options: ['45 percent', '48 percent', '50 percent', '55 percent'],
    answer: 2,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Apply net change = a + b + ab/100 with a = 20, b = 25: net = 20 + 25 + (20 x 25)/100 = 45 + 5 = 50 percent. Quick multiplier check: 1.20 x 1.25 = 1.50, confirming a 50 percent overall rise directly, which is the fastest route of all since it needs only one multiplication of the two growth factors. The naive sum of 45 percent, offered as a distractor, ignores that the second increase acts on an already-inflated base. Whenever two percentage changes are chained, multiplying (1 + a/100)(1 + b/100) and reading off the excess over 1 is quicker than the additive formula for GATE speed.'
  },
  {
    id: 'apti-quant-x3',
    q: 'A container holds 40 litres of pure milk. Eight litres of the mixture are withdrawn and replaced with water, and this same withdraw-and-replace operation is performed once more. How much pure milk remains in the container after the second operation?',
    options: ['20 litres', '24 litres', '25.6 litres', '28.8 litres'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'For repeated replacement, the milk left after n operations is initial x (1 - drawn/total)^n. Here drawn = 8 out of total = 40, so the retained fraction each time is 1 - 8/40 = 0.8. After two operations, milk = 40 x 0.8 x 0.8 = 40 x 0.64 = 25.6 litres. The shortcut is to compute the fraction 32/40 = 4/5 once and square it mentally (4/5)^2 = 16/25, then multiply by 40 to get 25.6 directly, avoiding two separate subtraction steps. This dilution formula is the single fact to memorize for every milk-water replacement question, regardless of how many operations are repeated.'
  },
  {
    id: 'apti-quant-x4',
    q: 'Tea costing Rs. 60 per kg is mixed with tea costing Rs. 75 per kg to obtain a blend that sells at Rs. 65 per kg. In what ratio should the two teas be mixed?',
    options: ['1 : 2', '2 : 1', '3 : 1', '1 : 3'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Apply the alligation rule directly on the price line: cheaper price 60, dearer price 75, mean price 65. The ratio of cheaper to dearer quantity equals (dearer - mean) : (mean - cheaper) = (75 - 65) : (65 - 60) = 10 : 5 = 2 : 1. The crisscross diagram of alligation gives this ratio in one subtraction on each side, without setting up any weighted-average equation. As a sanity check, since 65 is closer to 60 than to 75, the cheaper tea should dominate the mix, and 2 : 1 in favor of the cheaper tea confirms this direction instantly.'
  },
  {
    id: 'apti-quant-x5',
    q: 'A boat travels at 15 km/h downstream and at 9 km/h upstream. What is the speed of the boat in still water?',
    options: ['10 km/h', '12 km/h', '13 km/h', '14 km/h'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Speed in still water is the average of the downstream and upstream speeds: (15 + 9)/2 = 24/2 = 12 km/h. The stream speed, if needed, is the half-difference: (15 - 9)/2 = 3 km/h. Both quantities come from the same pair of half-sum and half-difference operations, so compute them together whenever a boats and streams question is seen, since either one might be asked. No equation setup is required beyond recognizing downstream = boat + stream and upstream = boat - stream, then adding or subtracting the two given values and halving.'
  },
  {
    id: 'apti-quant-x6',
    q: 'A boat covers 30 km upstream in 6 hours and returns downstream over the same distance in 3 hours. What is the speed of the stream?',
    options: ['2 km/h', '2.5 km/h', '3 km/h', '3.5 km/h'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'First convert distance and time into speed: upstream speed = 30/6 = 5 km/h, downstream speed = 30/3 = 10 km/h. Stream speed is half the difference of these two: (10 - 5)/2 = 2.5 km/h. The boat speed in still water, obtainable the same way as the half-sum, would be (10 + 5)/2 = 7.5 km/h, though it is not asked here. The two-step route of finding speeds from distance/time first, then applying the half-sum/half-difference pair, is faster than writing simultaneous equations for boat and stream speed separately.'
  },
  {
    id: 'apti-quant-x7',
    q: 'Two trains of lengths 120 m and 180 m are moving towards each other on parallel tracks at 54 km/h and 36 km/h respectively. How long will they take to cross each other completely?',
    options: ['10 seconds', '12 seconds', '14 seconds', '16 seconds'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'When two objects move towards each other, relative speed is the sum of their speeds: 54 + 36 = 90 km/h. Convert to m/s by multiplying by 5/18: 90 x 5/18 = 25 m/s. The total distance to be covered while crossing equals the sum of both lengths, 120 + 180 = 300 m, since each train must clear the entire length of the other. Time = distance/speed = 300/25 = 12 seconds. Doing the unit conversion once on the combined speed, rather than converting each train speed separately, saves an arithmetic step under time pressure.'
  },
  {
    id: 'apti-quant-x8',
    q: 'A train 120 m long, running at 45 km/h, crosses a platform 130 m long. How much time does it take to cross the platform completely?',
    options: ['15 seconds', '18 seconds', '20 seconds', '25 seconds'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Crossing a platform means the train must cover its own length plus the platform length: 120 + 130 = 250 m. Convert speed to m/s: 45 x 5/18 = 12.5 m/s. Time = 250/12.5 = 20 seconds. Recognizing 45 km/h as exactly 12.5 m/s (a common recurring conversion, since 45 x 5/18 simplifies cleanly) avoids long division and turns the final step into a two-step mental multiplication check: 12.5 x 20 = 250, confirming the answer immediately.'
  },
  {
    id: 'apti-quant-x9',
    q: 'Pipe A can fill an empty tank in 10 hours and pipe B can fill the same tank in 15 hours. If both pipes are opened together, how long will they take to fill the tank?',
    options: ['5 hours', '6 hours', '7 hours', '8 hours'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Combined time for two pipes filling together is given by the product-over-sum shortcut: (A x B)/(A + B) = (10 x 15)/(10 + 15) = 150/25 = 6 hours. This single-formula route avoids writing rate equations from scratch: add the reciprocals 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6, giving 6 hours directly, and the product-over-sum version is just this reciprocal addition pre-simplified into one division. Either method takes under ten seconds once the formula is memorized, which matters because pipes and cisterns questions recur often in GATE GA.'
  },
  {
    id: 'apti-quant-x10',
    q: 'A pipe can fill a tank in 8 hours, but a leak in the bottom of the tank can empty a full tank in 24 hours. With the pipe open and the leak also active, how long will it take to fill the empty tank?',
    options: ['10 hours', '12 hours', '14 hours', '16 hours'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Treat the leak as a negative rate. Net rate of filling = 1/8 - 1/24. Using a common denominator of 24: 3/24 - 1/24 = 2/24 = 1/12, so the tank fills in 12 hours. The quick check on direction: since the fill rate is faster than the leak rate, the tank does eventually fill, and the combined time must be longer than 8 hours alone (which it is, at 12), ruling out any option below 8 immediately. Subtracting reciprocals for an outlet, rather than adding them as for a second inlet, is the one conceptual distinction that separates this question from the pure fill-together case.'
  },
  {
    id: 'apti-quant-x11',
    q: 'The present ages of A and B are in the ratio 3 : 5. Six years from now, the ratio of their ages will become 2 : 3. What is the present age of B?',
    options: ['25 years', '28 years', '30 years', '32 years'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Let the present ages be 3x and 5x. Six years later: (3x + 6)/(5x + 6) = 2/3. Cross multiply: 9x + 18 = 10x + 12, giving x = 6. Present age of B = 5x = 30 years. As a check, present age of A = 18, and six years later A is 24 and B is 36, giving ratio 24 : 36 = 2 : 3 as required. Setting up a single cross-multiplied linear equation from the ratio condition is faster than tracking two separate age variables, and always reduces ratio-based age problems to one equation in one unknown, x, the common ratio multiplier.'
  },
  {
    id: 'apti-quant-x12',
    q: 'A number, when raised to the power 123, has 7 as its base. What is the unit digit of 7 raised to the power 123?',
    options: ['1', '3', '7', '9'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Unit digits of powers of 7 cycle every 4 steps: 7, 9, 3, 1, then repeat. Divide the exponent by 4 to find the position in the cycle: 123 divided by 4 leaves a remainder of 3, so the unit digit matches the 3rd term of the cycle, which is 3. If the remainder had been 0, the unit digit would be the 4th term, 1, since a remainder of 0 always maps to the last position in the cycle rather than a zeroth one. Memorizing the four-term cycles for digits 2, 3, 4, 7, 8, 9 (digits 0, 1, 5, 6 always repeat themselves) makes every unit-digit question a fifteen-second remainder calculation.'
  },
  {
    id: 'apti-quant-x13',
    q: 'What is the remainder when 3 raised to the power 47 is divided by 5?',
    options: ['1', '2', '3', '4'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The remainders of powers of 3 modulo 5 cycle every 4 steps: 3^1 gives 3, 3^2 gives 4, 3^3 gives 2, 3^4 gives 1, then the pattern repeats. Divide the exponent 47 by 4: the remainder is 3, so the answer matches the 3rd term of the cycle, which is 2. This cyclicity method replaces computing an enormous power outright with a four-term lookup table built from just the first few powers, and it generalizes to any modulus: find the cycle length of the base modulo the divisor, then use exponent mod cycle-length to index into it. Verifying the cycle length by computing 3^4 mod 5 = 81 mod 5 = 1 confirms the cycle truly closes after 4 steps.'
  },
  {
    id: 'apti-quant-x14',
    q: 'Three temple bells toll at intervals of 6, 8, and 12 minutes respectively. If all three toll together at 9:00 am, at what time will they next toll together?',
    options: ['9:12 am', '9:20 am', '9:24 am', '9:30 am'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'All three bells toll together again after a duration equal to the LCM of their individual intervals, since that is the smallest time that is simultaneously a multiple of 6, 8, and 12. Factor each: 6 = 2 x 3, 8 = 2^3, 12 = 2^2 x 3. LCM takes the highest power of each prime: 2^3 x 3 = 24 minutes. Adding 24 minutes to 9:00 am gives 9:24 am. Whenever a problem describes repeating periodic events synchronizing again, LCM is the operative tool, just as HCF is the tool whenever a problem asks for the largest common measuring unit; keeping this pairing straight avoids the common mix-up between the two.'
  },
  {
    id: 'apti-quant-x15',
    q: 'Triangles ABC and DEF are similar, with the ratio of their corresponding sides equal to 3 : 5. If the area of triangle ABC is 27 square cm, what is the area of triangle DEF?',
    options: ['45 square cm', '60 square cm', '75 square cm', '90 square cm'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'For similar triangles, the ratio of areas equals the square of the ratio of corresponding sides, not the side ratio itself. Side ratio 3 : 5 gives area ratio 9 : 25. Area of DEF = 27 x (25/9) = 3 x 25 = 75 square cm. The distractor 45 comes from wrongly scaling area by the linear ratio 5/3 instead of its square, so a quick check is to confirm the scale factor used is the square of the given side ratio whenever areas of similar figures are compared. The same squared-ratio rule extends to volumes of similar solids, but there the ratio must be cubed instead of squared.'
  },
  {
    id: 'apti-quant-x16',
    q: 'A solid metallic cone of base radius 6 cm and height 24 cm is melted down and recast into a solid cylinder having the same base radius. What is the height of the resulting cylinder?',
    options: ['6 cm', '7 cm', '8 cm', '9 cm'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Melting and recasting conserves volume, so equate the two volume formulas. Cone volume = (1/3) x pi x r^2 x h = (1/3) x pi x 36 x 24 = 288 x pi. Cylinder volume = pi x r^2 x H = 36 x pi x H, using the same radius r = 6. Setting them equal: 36H = 288, so H = 8 cm. The fast route skips computing the numeric volume entirely: since a cone with the same base and height as a cylinder has exactly one-third the cylinder volume, a cylinder of the same radius needs one-third the cone height to hold the same volume, so H = 24/3 = 8 cm directly from the 1 : 3 cone-to-cylinder volume ratio.'
  },
  {
    id: 'apti-quant-x17',
    q: 'What is the value of log base 2 of 32, plus log base 3 of one-ninth, minus log base 5 of 125?',
    options: ['-2', '0', '2', '4'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Evaluate each term by expressing it as a power of its base. log base 2 of 32 = log base 2 of 2^5 = 5. log base 3 of one-ninth = log base 3 of 3^-2 = -2. log base 5 of 125 = log base 5 of 5^3 = 3. Combine: 5 + (-2) - 3 = 0. The general shortcut for these expressions is to rewrite the argument as the base raised to some power, since log base b of b^k always simplifies instantly to k; no logarithm tables or approximations are ever needed when the argument is an exact power of the base, which GATE questions are deliberately constructed to allow.'
  },
  {
    id: 'apti-quant-x18',
    q: 'The sum of the squares of two consecutive positive integers is 113. What is the larger of the two integers?',
    options: ['6', '7', '8', '9'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Let the integers be n and n + 1. Then n^2 + (n + 1)^2 = 113 gives 2n^2 + 2n + 1 = 113, so 2n^2 + 2n - 112 = 0, which simplifies to n^2 + n - 56 = 0. Factor as (n + 8)(n - 7) = 0, giving n = 7 as the positive root. The larger integer is n + 1 = 8. Checking: 7^2 + 8^2 = 49 + 64 = 113, confirming the answer. For speed under exam conditions, testing the given options directly as the larger integer (try 8: is 7^2 + 8^2 = 113? yes) can be faster than factoring the quadratic from scratch, since GATE always supplies the answer among the four choices.'
  },
  {
    id: 'apti-quant-x19',
    q: 'A card is drawn at random from a well-shuffled standard deck of 52 playing cards. What is the probability that the card drawn is either a king or a queen?',
    options: ['1/13', '2/13', '3/13', '4/13'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'A standard deck has 4 kings and 4 queens, and these two events cannot happen at the same time on a single card, so their counts simply add: 4 + 4 = 8 favorable cards out of 52 total. Probability = 8/52 = 2/13. This is a direct application of the addition rule for mutually exclusive events, which applies whenever the two outcomes named (here, being a king and being a queen) share no overlap; had the question instead asked for a king or a heart, the king of hearts would be double counted and would need to be subtracted once before dividing by 52.'
  },
  {
    id: 'apti-quant-x20',
    q: 'In how many ways can 5 boys and 3 girls be arranged in a row so that no two girls are seated next to each other?',
    options: ['2880', '14400', '20160', '40320'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'First arrange the 5 boys in a row: 5! = 120 ways. This creates 6 gaps around them (one before the first boy, one after each boy, and one after the last), into which the 3 girls can be placed so that no two girls are adjacent. Choose and arrange 3 of these 6 gaps for the girls: 6P3 = 6 x 5 x 4 = 120 ways. Total arrangements = 120 x 120 = 14400. The gap method is the standard fast technique for any no-two-alike-adjacent restriction: always arrange the unrestricted group first to generate gaps, then place the restricted group into distinct gaps using a permutation, never a combination, since the girls themselves are distinguishable and their order within the row matters.'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-logical';}).questions.push(
  {
    id: 'apti-logical-x1',
    q: 'Look at the series: 2, 5, 4, 10, 6, 15, 8, ? Two interleaved patterns run through alternate terms. What number comes next?',
    options: ['16', '18', '20', '24'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Split the series into odd-position and even-position terms separately. Odd positions (1st, 3rd, 5th, 7th) read 2, 4, 6, 8, increasing by 2 each time, so the next odd-position term after 8 would be 10, but the missing term is the 8th (even) position. Even positions (2nd, 4th, 6th) read 5, 10, 15, increasing by 5 each time, so the 4th even term is 15 + 5 = 20. The general technique for any series where a single obvious pattern does not fit every term is to test whether alternate terms form two separate simpler series, which resolves almost all two-pattern GATE series within seconds.'
  },
  {
    id: 'apti-logical-x2',
    q: 'Find the missing number in the series: 5, 6, 10, 12, 20, 24, 40, ?',
    options: ['44', '46', '48', '50'],
    answer: 2,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Separate the odd-position and even-position terms. Odd positions (1st, 3rd, 5th, 7th) are 5, 10, 20, 40, each exactly double the previous one. Even positions (2nd, 4th, 6th) are 6, 12, 24, each also exactly double the previous one, so the 4th even-position term (the 8th term overall) is 24 x 2 = 48. Recognizing that both interleaved sub-series share the same doubling rule, just starting from different values, is the fast confirmation step: once one sub-series pattern is found, always check whether the other sub-series follows an identical rule, since GATE often designs both strands with matching logic for elegance.'
  },
  {
    id: 'apti-logical-x3',
    q: 'In the sequence A1, C4, E9, G16, I25, ?, the letters skip one position in the alphabet each time while the numbers are perfect squares. What comes next?',
    options: ['I36', 'K36', 'K25', 'K49'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Track the two interleaved patterns independently. The letters are A, C, E, G, I, each one skipping the letter in between (a jump of 2 positions in the alphabet), so after I the next letter is K. The numbers are 1, 4, 9, 16, 25, which are 1^2, 2^2, 3^2, 4^2, 5^2, so the next one is 6^2 = 36. Combining both gives K36. The key discipline is never letting the letter pattern and number pattern contaminate each other; solve each independently using its own simplest rule (arithmetic skip for letters, perfect squares for numbers), then merge only at the final answer.'
  },
  {
    id: 'apti-logical-x4',
    q: 'Five friends P, Q, R, S, and T are compared by height. P is taller than Q but shorter than R. S is the tallest of all five, and T is shorter than Q. Who is the shortest among the five?',
    options: ['P', 'Q', 'S', 'T'],
    answer: 3,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Chain the given comparisons into a single ordering. From R greater than P greater than Q, and S greatest of all, and T less than Q, the full order from tallest to shortest is S, R, P, Q, T. Reading directly off this chain, T sits at the very end, making T the shortest. The fast method for any height or rank puzzle is to convert every pairwise clue into a single greater-than chain as each clue is read, inserting new names into the correct position immediately rather than holding all clues in memory until the end.'
  },
  {
    id: 'apti-logical-x5',
    q: 'Five tasks A, B, C, D, and E must each be scheduled on a different day from Monday to Friday. Task C is done immediately after task A. Task B is scheduled on Wednesday. Task E is done sometime after task C but before task D. On which day is task A scheduled?',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Since B occupies Wednesday, the consecutive pair A-then-C cannot straddle Wednesday, so the pair must sit entirely within Monday-Tuesday or entirely within Thursday-Friday. If A and C took Thursday and Friday, there would be no days left after C for both E and D in the required order, since only Monday, Tuesday would remain and Wednesday is taken. So A and C must be Monday and Tuesday, giving A = Monday, C = Tuesday, and the remaining days Thursday and Friday go to E and D in order, E = Thursday, D = Friday. The technique of testing which placement of a fixed adjacent pair leaves enough room for the remaining ordering constraints quickly eliminates one of only two candidate slots.'
  },
  {
    id: 'apti-logical-x6',
    q: 'Statements: All pens are pencils. Some pencils are erasers. Conclusions: I. Some pens are erasers. II. Some erasers are pens. Which conclusion(s) logically follow?',
    options: ['Only conclusion I follows', 'Only conclusion II follows', 'Both conclusions follow', 'Neither conclusion follows'],
    answer: 3,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'An All-A-are-B statement combined with a Some-B-are-C statement never yields a valid conclusion linking A and C, because the pencils that happen to be erasers might be exactly the pencils that are not pens; nothing forces the eraser-pencils to overlap with the pen-pencils. Drawing a quick Venn sketch shows pens fully inside pencils, and the eraser circle overlapping pencils somewhere, but that overlap can sit entirely outside the pens region. Since this configuration is possible, no conclusion is guaranteed, so neither I nor II follows. The standard syllogism trap here is assuming that a universal statement automatically transfers a particular statement through it, which it does not.'
  },
  {
    id: 'apti-logical-x7',
    q: 'Statements: Some doctors are engineers. All engineers are teachers. Conclusions: I. Some doctors are teachers. II. Some teachers are doctors. Which conclusion(s) logically follow?',
    options: ['Only conclusion I follows', 'Only conclusion II follows', 'Both conclusions follow', 'Neither conclusion follows'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Some-A-are-B combined with All-B-are-C validly gives Some-A-are-C, because the doctors who are engineers are, by the second statement, definitely also teachers, so some doctors are teachers: conclusion I holds. A particular statement of the form Some-A-are-C can always be reversed to Some-C-are-A, since "some overlap exists" is a symmetric fact about the same group of individuals, so conclusion II also holds. The rule to retain is that Some-plus-All chains (in that order) always produce a valid Some conclusion, and any valid Some conclusion is automatically reversible, unlike All conclusions, which are not reversible in general.'
  },
  {
    id: 'apti-logical-x8',
    q: 'Statement: Road accidents near School X have increased sharply because the stretch lacks a pedestrian crossing. Courses of Action: I. The municipal authority should install a pedestrian crossing and warning signage near School X. II. School X should be permanently shut down. Which course(s) of action logically follow?',
    options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither follows'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'A valid course of action must be a practical, proportionate response that directly addresses the stated cause. Course I directly targets the identified cause, the missing pedestrian crossing, with a reasonable administrative fix, so it follows. Course II is a disproportionate and impractical overreaction, since shutting the school does not address road safety and ignores the actual remedy available; extreme measures that discard the underlying institution rather than fixing the specific defect are the hallmark of a course of action that does not follow. This same disproportionality test is the fastest filter for eliminating one option in most courses-of-action questions.'
  },
  {
    id: 'apti-logical-x9',
    q: 'Which one of the following words does not belong with the others?',
    options: ['Mango', 'Banana', 'Potato', 'Guava'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Mango, banana, and guava are all fruits, typically sweet and eaten raw, while potato is a vegetable, usually starchy and eaten after cooking. The classification test for odd-one-out word groups is to find the single shared category that binds three of the four items tightly (here, "fruit") and confirm the fourth item genuinely falls outside that category rather than just being a less typical example of it; potato clearly fails the fruit test on botanical and culinary grounds alike, making it the outlier with no ambiguity.'
  },
  {
    id: 'apti-logical-x10',
    q: 'Which of the following numbers is not a perfect cube?',
    options: ['27', '64', '100', '125'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Check each number against the cubes of small integers: 27 = 3^3, 64 = 4^3, 125 = 5^3, but 100 has no integer cube root, since 4^3 = 64 and 5^3 = 125 bracket it with nothing in between. Memorizing the cubes of 1 through 10 (1, 8, 27, 64, 125, 216, 343, 512, 729, 1000) turns this kind of odd-one-out question into an instant lookup rather than requiring any computation during the exam, which matters because GATE frequently tests recognition of perfect squares and cubes disguised among plausible-looking numbers.'
  },
  {
    id: 'apti-logical-x11',
    q: 'A man walks 5 km towards the north and then walks 3 km towards the south. How far is he from his starting point, and in which direction?',
    options: ['2 km north', '2 km south', '8 km north', '8 km south'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Since north and south are exactly opposite directions, the two displacements act along the same line and simply subtract: 5 km north minus 3 km south leaves a net 5 - 3 = 2 km displacement in the direction of the larger component, which is north. The distances do not add up to 8 km because the second leg partially cancels the first rather than extending further away from the start. For any direction-sense problem, the fast method is to track net displacement separately along the north-south axis and the east-west axis, adding movements in the same direction and subtracting movements in the opposite direction on each axis.'
  },
  {
    id: 'apti-logical-x12',
    q: 'A man walks 10 m towards the north, then turns right and walks 6 m, then turns right again and walks 10 m. How far is he now from his starting point, and in which direction?',
    options: ['6 m east', '6 m west', '16 m east', '4 m east'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Track direction changes step by step: facing north, a right turn means the man now faces east, so the 6 m leg is towards the east. Facing east, another right turn means he now faces south, so the final 10 m leg is towards the south. Net displacement on the north-south axis is 10 m north followed by 10 m south, which exactly cancels to zero. Net displacement on the east-west axis is simply the 6 m east leg, unopposed. Combining both axes, the man ends up 6 m east of the starting point. Drawing a quick compass cross and marking each leg as an arrow is the safest way to avoid direction errors under time pressure.'
  },
  {
    id: 'apti-logical-x13',
    q: 'In a certain code, P*Q means P is the father of Q, and Q+R means Q is the mother of R. If the relation P*Q+R holds, how is R related to P?',
    options: ['Grandfather', 'Grandmother', 'Father', 'Uncle'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Decode the chain one link at a time: P*Q means P is the father of Q, and Q+R means Q is the mother of R. So P is the father of Q, and Q is the mother of R, which makes P the parent of a parent of R, that is, a grandparent of R. Since P is specifically male (a father), P is the grandfather of R, not merely a grandparent of unspecified gender. The general method for coded blood-relation chains is to translate each symbol into a plain-English relation first, draw a two-generation family tree from the translations, and only then read off the relation asked, rather than trying to track the code symbolically throughout.'
  },
  {
    id: 'apti-logical-x14',
    q: 'In a certain code, P@Q means P is the father of Q, Q-R means Q is the sister of R, and R+S means R is the mother of S. If P@Q-R+S all hold true, how is S related to P?',
    options: ['Grandfather', 'Grandmother', 'Father', 'Uncle'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Translate each link: P is the father of Q; Q is the sister of R, meaning Q and R are siblings with the same parents, so P is also the father of R; R is the mother of S. Combining, P is the father of R, and R is the mother of S, so P is the grandfather of S, since P is a parent of a parent of S and is specifically male. The step easiest to miss is that a sister relation between Q and R implies they share both parents, which is what allows P to be identified as the father of R too, not just of Q; always propagate shared-parent information across sibling links before continuing the chain.'
  },
  {
    id: 'apti-logical-x15',
    q: 'What is the angle between the hour hand and the minute hand of a clock at exactly 3:00?',
    options: ['60 degrees', '75 degrees', '90 degrees', '120 degrees'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'At any exact hour, the minute hand points at 12 and the hour hand points at the hour number, and each hour mark on the dial is separated by 360/12 = 30 degrees. At 3:00 the hour hand is exactly at the 3 mark, which is 3 x 30 = 90 degrees away from the 12 mark where the minute hand sits. Memorizing this 30-degrees-per-hour-mark fact lets any exact-hour clock-angle question be answered by a single multiplication, without needing the full clock-angle formula reserved for times with non-zero minutes.'
  },
  {
    id: 'apti-logical-x16',
    q: 'What is the angle between the hour hand and the minute hand of a clock at 4:20?',
    options: ['0 degrees', '5 degrees', '10 degrees', '15 degrees'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The minute hand moves 6 degrees per minute, so at 20 minutes it stands at 20 x 6 = 120 degrees from 12. The hour hand moves 0.5 degrees per minute overall (30 degrees per hour plus a fraction for the minutes elapsed), so at 4 hours 20 minutes it stands at 4 x 30 + 20 x 0.5 = 120 + 10 = 130 degrees from 12. The angle between them is the absolute difference, 130 - 120 = 10 degrees. The formula angle = |30H - 5.5M|, with H the hour and M the minutes, packages both hand positions into one expression and is the fastest way to handle any non-exact-hour clock angle question in a single substitution.'
  },
  {
    id: 'apti-logical-x17',
    q: 'If 1 January 2023 fell on a Sunday, what day of the week was 1 January 2024?',
    options: ['Saturday', 'Sunday', 'Monday', 'Tuesday'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: '2023 is not a leap year, since it is not divisible by 4, so it contains exactly 365 days, which is 52 complete weeks plus 1 extra day. Each ordinary year therefore advances the day of the week for the same calendar date by exactly one day, while a leap year advances it by two days (because of the extra 29 February). Starting from Sunday and adding one day for the non-leap year 2023 gives Monday for 1 January 2024. The general rule, advance by 1 for a non-leap year and by 2 for a leap year that contains 29 February within the span being counted, resolves almost every year-to-year calendar shift question quickly.'
  },
  {
    id: 'apti-logical-x18',
    q: '15 August 1947 fell on a Friday. What day of the week was 15 August 2023?',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Across the 76 years from 1947 to 2023, every ordinary year advances the same calendar date by 1 day of the week, and every leap year among them (because it inserts 29 February before 15 August) advances it by 1 extra day on top of that. Leap years from 1948 through 2020, occurring every 4 years, number (2020 - 1948)/4 + 1 = 19. Total advance = 76 (one per year) + 19 (one extra per leap year) = 95 days. Reduce modulo 7: 95 = 13 x 7 + 4, so the net shift is 4 days. Advancing Friday by 4 days (Saturday, Sunday, Monday, Tuesday) gives Tuesday. This "1 per year, plus 1 more per leap year, then mod 7" shortcut avoids ever computing a raw day count over a multi-decade span.'
  },
  {
    id: 'apti-logical-x19',
    q: 'A cube with side 3 units is painted red on all six outer faces and then cut into 27 identical unit cubes. How many of these unit cubes have no paint on any face at all?',
    options: ['0', '1', '4', '6'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Unpainted unit cubes are exactly the ones fully hidden inside, away from every outer face, and their count for an n x n x n cube is (n - 2)^3. With n = 3, this gives (3 - 2)^3 = 1^3 = 1, meaning only the single cube dead center has no paint at all. This matches intuition: a 3-unit cube has just one layer of cubes surrounding a single central cube on every side, so exactly one cube can be fully interior. The formula (n-2)^3 for no-paint cubes, alongside 6(n-2)^2 for one-face cubes, 12(n-2) for two-face cubes, and a constant 8 for three-face corner cubes, together always sum to n^3, providing a built-in check.'
  },
  {
    id: 'apti-logical-x20',
    q: 'A cuboid measuring 4 units by 3 units by 3 units is painted on all its outer faces and then cut into unit cubes. How many of the resulting unit cubes have paint on exactly one face?',
    options: ['6', '8', '10', '12'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'For a cuboid of dimensions a, b, c, the count of unit cubes painted on exactly one face is 2[(a-2)(b-2) + (b-2)(c-2) + (c-2)(a-2)], since each pair of opposite faces contributes an interior rectangle of unpainted-edge cubes. With a = 4, b = 3, c = 3: (a-2)(b-2) = 2 x 1 = 2, (b-2)(c-2) = 1 x 1 = 1, (c-2)(a-2) = 1 x 2 = 2, summing to 5, then doubled for both faces of each pair gives 10. As a cross-check, the two faces of size 3 x 3 (perpendicular to the length-4 axis) each contribute (3-2)(3-2) = 1 interior cube, giving 2 total from those, and the four faces of size 4 x 3 each contribute (4-2)(3-2) = 2, giving 8 total, and 2 + 8 = 10 matches.'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-verbal';}).questions.push(
  {
    id: 'apti-verbal-x1',
    q: 'Despite the heavy rain, the outdoor event continued as scheduled because the organizers had been ______ prepared for such weather.',
    options: ['barely', 'meticulously', 'reluctantly', 'accidentally'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'The sentence describes an event continuing smoothly despite bad weather, which requires a word implying careful, thorough advance planning. "Meticulously" means with great attention to detail, exactly matching the implied cause of the event proceeding without disruption. "Barely" and "accidentally" both suggest inadequate or unintentional preparation, which contradicts the outcome described, while "reluctantly" describes attitude rather than the thoroughness needed to explain the smooth continuation. For sentence completion, first identify what quality the surrounding clause logically demands, here "prepared enough to handle rain," then match that meaning to the option before considering word familiarity.'
  },
  {
    id: 'apti-verbal-x2',
    q: 'The negotiations, which had dragged on for months without visible progress, were finally brought to a ______ when both sides agreed to bring in an independent mediator.',
    options: ['impasse', 'denouement', 'stalemate', 'deadlock'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The sentence structure signals a resolution, since agreeing to a mediator is an action that moves the negotiation forward rather than freezing it further. "Denouement" specifically means the final resolution or unraveling of a situation, fitting a positive turning point. "Impasse," "stalemate," and "deadlock" all describe being stuck with no progress, the opposite of what the sentence describes happening. This question rewards noticing that three of the four options are near-synonyms for the same idea (being stuck), so the correct answer must be the one word that breaks that pattern and actually matches the described forward movement.'
  },
  {
    id: 'apti-verbal-x3',
    q: 'Although the two business proposals appeared similar on the surface, the finance head identified a ______ difference in their long-term cost implications.',
    options: ['negligible', 'superficial', 'substantive', 'cosmetic'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'The word "although" signals a contrast with "appeared similar," so the missing word must describe a difference that is significant despite that surface-level similarity. "Substantive" means real and meaningful, exactly capturing an important underlying difference hidden beneath surface similarity. "Negligible," "superficial," and "cosmetic" all describe unimportant or surface-only differences, which would not warrant being highlighted by a finance head as a concern, and would also contradict the contrast signaled by "although." Spotting the contrast word ("although," "but," "however") first tells you the blank must oppose the preceding idea, which narrows the choice immediately.'
  },
  {
    id: 'apti-verbal-x4',
    q: 'After months of preparation, she finally decided to ______ and submit her resignation, rather than continue postponing the difficult conversation.',
    options: ['bite the bullet', 'beat around the bush', 'spill the beans', 'let the cat out of the bag'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: '"Bite the bullet" means to face a difficult or unpleasant situation with courage after a period of hesitation, which matches "finally decided" after "months of preparation" and avoiding further postponement. "Beat around the bush" means avoiding the main point, the opposite of taking direct action here. "Spill the beans" and "let the cat out of the bag" both mean revealing a secret, which is unrelated to the act of resigning. Idiom questions in context are solved by translating each idiom to its plain meaning first and then checking which meaning fits the sentence logically, rather than relying on surface keyword overlap.'
  },
  {
    id: 'apti-verbal-x5',
    q: 'Rather than admit that the project had failed, the manager tried to ______ during the review meeting, giving vague answers to every direct question.',
    options: ['bite the bullet', 'beat around the bush', 'hit the nail on the head', 'break the ice'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: '"Beat around the bush" means avoiding the central issue or speaking evasively instead of addressing it directly, which precisely matches "vague answers to every direct question." "Bite the bullet" means facing a hard situation directly, the opposite of evasiveness described here. "Hit the nail on the head" means being exactly correct or precise, and "break the ice" means easing initial social awkwardness, neither of which relates to evasive answering. Whenever a sentence explicitly describes vagueness or avoidance, that description is itself the definition being tested, so match it word for word against each idiom meaning.'
  },
  {
    id: 'apti-verbal-x6',
    q: 'Four sentences are given below, forming a single paragraph when arranged correctly. P: This, in turn, reduced crop yields across the region. Q: A prolonged drought struck the farming districts last summer. R: As a result, several farmers had to seek alternate sources of income. S: The lack of rainfall caused reservoirs to dry up rapidly. Choose the correct order.',
    options: ['QSPR', 'QPSR', 'SQPR', 'QRSP'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'The paragraph must follow a cause-to-effect chain. Q introduces the root cause, the drought, and must open the paragraph since every other sentence depends on it. S explains the immediate physical consequence of the drought, reservoirs drying up, following directly from Q. P then describes how that drying up affected crop yields, using "this, in turn," which explicitly refers back to the reservoir problem in S. R closes the paragraph with the final downstream human consequence, farmers seeking other income, following from the reduced yields in P. The sequence QSPR traces one continuous cause-effect thread, which is the fastest way to verify para-jumble ordering: follow referring words like "this" and "as a result" back to what they must point to.'
  },
  {
    id: 'apti-verbal-x7',
    q: 'Four sentences are given below, forming a single paragraph when arranged correctly. P: Consequently, many species that depend on coral reefs face habitat loss. Q: Rising ocean temperatures have led to widespread coral bleaching. R: This phenomenon weakens coral structures and can eventually kill them. S: Scientists warn that without intervention, reef ecosystems may collapse within decades. Choose the correct order.',
    options: ['QRPS', 'QPRS', 'RQPS', 'QRSP'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Q must open the paragraph since it introduces the triggering cause, rising ocean temperatures, that every other sentence builds on. R follows immediately, because "this phenomenon" in R can only refer back to the coral bleaching just named in Q. P then follows with "consequently," describing the downstream ecological effect, species facing habitat loss, which results from the weakened coral described in R. S closes the paragraph as the broadest, most forward-looking statement, a scientist warning about ecosystem collapse, a natural concluding sentence after the specific effects have been laid out. Tracing each referring phrase, "this phenomenon" and "consequently," back to its antecedent sentence is the reliable way to lock in QRPS without guessing.'
  },
  {
    id: 'apti-verbal-x8',
    q: 'Identify the part of the sentence that contains a grammatical error: "Each of the members / are required / to submit their report / by Friday."',
    options: ['Each of the members', 'are required', 'to submit their report', 'by Friday'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'The subject of the sentence is "each," which is always grammatically singular regardless of the plural noun that follows it in the phrase "of the members." A singular subject requires a singular verb, so "are required" is incorrect and should read "is required." The remaining parts of the sentence are grammatically sound in isolation. This is one of the most frequently tested agreement rules in GATE grammar questions: words like each, every, either, and neither always take a singular verb even when followed by a prepositional phrase containing a plural noun, since that phrase is not the true subject.'
  },
  {
    id: 'apti-verbal-x9',
    q: 'Identify the part of the sentence that contains a grammatical error: "The number of accidents / on this stretch of road / have increased dramatically / over the last decade."',
    options: ['The number of accidents', 'on this stretch of road', 'have increased dramatically', 'over the last decade.'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The subject here is "the number," which is treated as singular in standard usage, so it requires the singular verb "has increased," not "have increased." Note the contrast with the phrase "a number of accidents," which would instead take a plural verb, since "a number of" functions as a plural quantifier while "the number of" refers to a single count or figure. This distinction between "the number" (singular) and "a number of" (plural) is a classic subject-verb agreement trap, and recognizing which of the two phrasings is used is the fastest way to resolve it correctly.'
  },
  {
    id: 'apti-verbal-x10',
    q: 'Identify the part of the sentence that contains a grammatical error: "Neither the manager / nor the employees / was informed / about the sudden change in policy."',
    options: ['Neither the manager', 'nor the employees', 'was informed', 'about the sudden change in policy.'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'With "either...or" and "neither...nor" constructions, the verb must agree with whichever subject is closer to it, not with the first-mentioned subject. Here the subject nearer the verb is "the employees," which is plural, so the verb should be "were informed," not "was informed." Had the order been reversed, "neither the employees nor the manager," the singular "was informed" would have been correct instead. This proximity rule is distinct from ordinary compound-subject agreement with "and," where the combined subject is simply treated as plural, so recognizing which connecting word is used, "and" versus "either/or" or "neither/nor," changes which agreement rule applies.'
  },
  {
    id: 'apti-verbal-x11',
    q: 'Complete the analogy: Doctor is to Hospital as Teacher is to ______.',
    options: ['School', 'Book', 'Student', 'Blackboard'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'The relationship in the first pair is professional-to-workplace: a doctor typically practices at a hospital. Applying the same relationship to the second pair, a teacher typically practices at a school, making "School" the matching answer. "Book" and "Blackboard" are tools a teacher uses, not the workplace itself, and "Student" is the person a teacher serves, not the location, so both represent a different relationship than the one established by the first pair. For analogy questions, first state the exact relationship in words (here, "is the typical workplace of") before scanning the options, since this prevents being misled by superficially related but structurally different word pairs.'
  },
  {
    id: 'apti-verbal-x12',
    q: 'Complete the analogy: Frugal is to Miserly as Confident is to ______.',
    options: ['Humble', 'Arrogant', 'Shy', 'Careful'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The relationship in the first pair is one of degree: "miserly" is an excessive, negative extreme of the milder, more neutral quality "frugal." Applying the same degree-based relationship, the excessive, negative extreme of "confident" is "arrogant," where healthy self-assurance tips over into overbearing self-importance. "Humble" and "shy" describe qualities opposite to confidence rather than an intensified version of it, and "careful" is unrelated to confidence altogether. This "mild trait to its excessive negative version" pattern is a recurring analogy type, distinct from simple synonym or antonym pairs, and recognizing the degree relationship immediately rules out plain synonyms and antonyms as answers.'
  },
  {
    id: 'apti-verbal-x13',
    q: 'Complete the analogy: Author is to Manuscript as Sculptor is to ______.',
    options: ['Chisel', 'Statue', 'Museum', 'Marble'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The relationship in the first pair is creator-to-creation: an author produces a manuscript as the finished result of their work. Applying the same relationship, a sculptor produces a statue as the finished result of their work, making "Statue" the correct match. "Chisel" is a tool the sculptor uses, comparable to a pen for the author, not the output itself, and "Marble" is the raw material worked on, comparable to blank paper, again not the finished creation. "Museum" is merely a place where a statue might later be displayed, unrelated to the act of creation. Distinguishing tool, raw material, and finished product is essential whenever a creator-creation analogy is tested.'
  },
  {
    id: 'apti-verbal-x14',
    q: 'A city council claims that installing more streetlights on Elm Avenue will reduce nighttime crime there, citing that most reported crimes on that street occur after dark. Which finding, if true, would most strengthen this claim?',
    options: ['Crime rates on nearby streets that are already well-lit are significantly lower than on Elm Avenue', 'The city currently has limited funds available for infrastructure projects', 'Some residents oppose additional streetlights due to concerns about light pollution', 'Daytime crime on Elm Avenue is currently negligible'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'To strengthen a causal claim linking lighting to reduced crime, the strongest support is evidence of the same pattern holding elsewhere: nearby well-lit streets having lower crime directly supports that better lighting is associated with less nighttime crime, reinforcing that the proposed fix targets the right cause. Limited city funds is a practical obstacle, irrelevant to whether the claim itself is true. Resident opposition to light pollution is a social concern, not evidence about crime rates. Negligible daytime crime merely restates part of the existing premise (crime is a nighttime issue) without adding any new supporting evidence about lighting specifically reducing it.'
  },
  {
    id: 'apti-verbal-x15',
    q: 'A company argues that switching its entire workforce to a four-day workweek will raise overall productivity, based on a pilot study of one small team that showed higher output. Which statement, if true, would most weaken this argument?',
    options: ['The pilot team consisted of highly motivated volunteers, unlike the general workforce', 'The company currently employs about 500 people in total', 'The four-day week was well received by the pilot team members', 'Other companies have also tried similar four-day-week pilots'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The argument generalizes from one small, possibly unrepresentative pilot group to the entire workforce. If the pilot team was made up of unusually motivated volunteers, their productivity gain may not transfer to a general workforce with mixed motivation levels, directly undermining the generalization the argument depends on. The total employee count and general employee reception of the pilot team do not address whether the sample was representative. That other companies ran similar pilots is irrelevant without knowing their outcomes, so it neither strengthens nor weakens this specific argument. Weaken questions about small-sample generalizations are almost always answered by attacking the representativeness of the sample.'
  },
  {
    id: 'apti-verbal-x16',
    q: 'Advertisers should focus more of their budget on social media platforms than on television, an analyst argues, because a recent survey found that most consumers now spend more time browsing social media daily than watching television. This argument depends on which assumption?',
    options: ['Time spent by consumers on a medium correlates with how effectively advertisements placed there influence them', 'Television advertising costs more per slot than social media advertising', 'All consumers use at least one social media platform regularly', 'Social media platforms allow more precise audience targeting than television'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The argument moves from a fact about time spent on a medium to a conclusion about where advertising budget should go, which only makes sense if spending more time on a medium actually makes advertisements on that medium more effective, an unstated link the argument silently relies on. Without this assumption, consumers could spend hours on social media while systematically ignoring or blocking out its ads, breaking the logical bridge between the premise and conclusion. The cost comparison, universal social media usage, and targeting precision are all plausible related facts, but none of them is the specific gap that must be true for the stated premise to actually support the stated conclusion; only the effectiveness-correlation assumption fills that exact gap.'
  },
  {
    id: 'apti-verbal-x17',
    q: 'Read the following passage: The number of applicants to the university engineering program has risen every year for the past five years, even as the total number of available seats has stayed exactly the same. This year, for the first time, the admissions committee received twice as many applications as it did five years ago. Which of the following can be most reasonably inferred?',
    options: ['The acceptance rate for the engineering program has declined over the five years', 'The academic quality of applicants has improved over the five years', 'The university is planning to increase the number of available seats soon', 'Most rejected applicants are turned down because of poor academic grades'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The passage establishes two facts directly: applications have risen every year, and seats have remained constant. Since acceptance rate is the ratio of seats offered to applications received, a constant numerator combined with a strictly growing denominator mathematically forces the ratio to fall each year, so a declining acceptance rate follows directly from the stated facts alone. Improved applicant quality, plans to add seats, and rejection reasons are all plausible real-world scenarios, but none of them is stated or logically forced by the passage, whereas the declining acceptance rate is a direct mathematical consequence, not a wider speculation.'
  },
  {
    id: 'apti-verbal-x18',
    q: 'Read the following passage: In a small town, the only bakery is normally closed every Monday. Last week, a visitor seeking fresh bread found the bakery unexpectedly open on a Monday, and was told this was because of a local festival being celebrated that day. This week, the same festival is instead being celebrated in a neighboring town. Which of the following can be most reasonably inferred?',
    options: ['The bakery is likely to remain closed as usual this coming Monday', 'The bakery will always stay open on Mondays whenever any festival occurs anywhere', 'The visitor who found the bakery open actually lives in the neighboring town', 'The bakery has permanently changed its regular closing day'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The passage links the bakery being open last Monday specifically to the local festival happening in this town that day. Since the same festival has now moved to a neighboring town this week, the specific reason for the exception no longer applies here this week, so the bakery reverts to its normal closed status on Monday, which is the narrowest and most directly supported inference. Claiming the bakery always opens for any festival anywhere overgeneralizes far beyond the single case described. The visitor location and a permanent schedule change are unsupported speculations introduced by the reader, not conclusions drawn from the stated facts, which is the key distinction between a valid inference and an unwarranted guess.'
  },
  {
    id: 'apti-verbal-x19',
    q: 'The committee decision seemed ______ at first glance, but a closer reading revealed a carefully reasoned argument underlying it.',
    options: ['judicious', 'capricious', 'meticulous', 'unanimous'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The word "but" signals that the initial impression contrasts with the later discovery of careful reasoning, so the blank needs a word meaning arbitrary or whimsical, which the closer reading then disproves. "Capricious" means impulsive or unpredictable, exactly the kind of surface impression that a subsequent careful reading would overturn. "Judicious" and "meticulous" both already imply careful reasoning, which would not require a contrasting "but" afterward, and "unanimous" describes agreement among people, unrelated to the quality of the reasoning itself. Locating the contrast word first, here "but," and determining that the blank must describe the opposite of "carefully reasoned" is the fastest route to the answer.'
  },
  {
    id: 'apti-verbal-x20',
    q: 'The new intern was advised to ______ before proposing major changes to a workflow that had been in place for over a decade.',
    options: ['tread carefully', 'jump the gun', 'go the extra mile', 'cut corners'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: '"Tread carefully" means to proceed cautiously in a sensitive situation, which fits advising a new intern to be careful before challenging a long-established workflow. "Jump the gun" means acting prematurely without adequate preparation, which is advice the sentence is warning against, not recommending. "Go the extra mile" means putting in additional effort, and "cut corners" means doing something in a cheaper or easier but lower-quality way, neither of which relates to caution around proposing sensitive changes. Matching the idiom meaning to the situational tone described, here caution around a sensitive, established system, is more reliable than matching on any single keyword in the sentence.'
  },
  {
    id: 'apti-verbal-y1',
    q: 'Statement: All new employees at TechCorp who complete the mandatory ethics training receive a certification badge. Raj has a certification badge. Which of the following can be logically concluded?',
    options: [
      'Raj completed the mandatory ethics training.',
      'Raj is a new employee at TechCorp.',
      "Nothing can be concluded about Raj's training status from the given statement alone.",
      'Raj did not complete the mandatory ethics training.'
    ],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The statement gives a one-directional conditional: completing training guarantees a badge (training -> badge), but it never states that a badge is given ONLY to those who complete the training. Observing the effect (Raj has a badge) does not let you infer the stated cause (Raj completed training), since the badge could have been awarded through some other unstated route. This is the classic "affirming the consequent" trap. Concluding "Raj completed the training" or "Raj is a new employee" both assume the converse of the given rule, which was never stated, so the only logically safe answer is that nothing can be determined. Fastest route: whenever a statement reads "if X then Y," check whether the question tries to reason backward from Y to X — that reversal is valid only if the original statement was explicitly "only if" or "if and only if."'
  },
  {
    id: 'apti-verbal-y2',
    q: 'In a small survey, every respondent who preferred tea over coffee also reported drinking more than three cups of a hot beverage daily. Ravi drinks four cups of a hot beverage daily. Which of the following must be true?',
    options: [
      'Ravi prefers tea over coffee.',
      'Ravi prefers coffee over tea.',
      'It cannot be determined whether Ravi prefers tea or coffee.',
      'Ravi drinks fewer than three cups daily.'
    ],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The survey establishes only one direction: preferring tea implies drinking more than three cups (tea-preference -> more than 3 cups). It does not say that everyone who drinks more than three cups prefers tea, so coffee-lovers could just as easily drink four or more cups. Ravi satisfying the "more than three cups" condition tells us nothing about which beverage he prefers, since that condition could be met by tea-drinkers and coffee-drinkers alike. Both "prefers tea" and "prefers coffee" require information not given, so only "cannot be determined" is logically safe. Fastest route: rewrite the statement as an arrow (A -> B) and check which of the four options tries to reason from B back to A without justification — that reversal is the trap in nearly every such question.'
  },
  {
    id: 'apti-verbal-y3',
    q: "The committee's decision to indefinitely postpone the merger, despite months of painstaking negotiation, left the shareholders feeling ______.",
    options: ['vindicated', 'disillusioned', 'emboldened', 'indifferent'],
    answer: 1,
    marks: 1,
    difficulty: 'hard',
    type: 'concept',
    explanation: '"Despite months of painstaking negotiation" sets up an expectation of a positive outcome (the merger going through), and "indefinitely postpone" defeats that expectation, so the blank must capture a sense of disappointed hope. "Disillusioned" precisely means having one\'s positive expectations shattered by an unwelcome reality, matching the contrast set up by "despite." "Vindicated" means proven right, which fits neither the effort invested nor the negative outcome; "emboldened" means made more confident, the opposite of a stalled deal\'s effect; and "indifferent" contradicts the emotional weight implied by "months of painstaking negotiation." Fastest route: locate the contrast signal ("despite"), determine the positive expectation it sets up, and pick the word describing the emotional collapse of exactly that expectation.'
  },
  {
    id: 'apti-verbal-y4',
    q: 'Argument: The number of bicycle accidents in the city fell by 20% last year after the city introduced mandatory helmet laws. Therefore, the helmet law caused the decline in accidents. Which of the following, if true, would most weaken this argument?',
    options: [
      'Most cyclists in the city already owned helmets before the law was introduced.',
      'The number of cyclists on the road fell by 25% last year due to a new metro line opening.',
      'The helmet law included a monetary fine for non-compliance.',
      'Neighboring cities without helmet laws saw a slight increase in accidents.'
    ],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The argument assumes the helmet law is the cause of fewer accidents, but a drop in accidents could also occur simply because fewer people were cycling at all. If the number of cyclists fell by 25% due to an unrelated cause (the new metro line), a 20% drop in accident count would be fully explained by fewer people being on bicycles in the first place, independent of any safety effect from helmets. This directly supplies an alternative cause for the observed effect, which is the strongest way to weaken a causal claim. Option 0 suggests the law had little marginal effect but does not explain why accidents actually fell; option 2 is irrelevant to causation; option 3 is weak supporting evidence, not a direct alternative explanation. Fastest route: for "cause X leads to effect Y" arguments, the strongest weakener is always an option that offers a different plausible cause for Y that has nothing to do with X.'
  },
  {
    id: 'apti-verbal-y5',
    q: 'Studies show that employees who take a 10-minute walk after lunch report higher afternoon productivity than those who do not. A company concluded that mandating a 10-minute post-lunch walk for all employees will boost overall productivity. Which of the following, if true, would most strengthen this conclusion?',
    options: [
      'Employees who already walk after lunch tend to have healthier diets overall.',
      'The observed productivity boost is not explained by any other kind of short break taken after lunch.',
      'Most employees dislike walking outdoors in cold weather.',
      'Post-lunch walks are somewhat more pleasant in summer than in winter.'
    ],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The company\'s conclusion assumes that it is specifically the act of walking, not just taking any break, that produces the productivity boost. If any other kind of short break produced the same effect, then mandating a walk specifically would be an unjustified and overly narrow prescription. Ruling out that alternative explanation, that other short breaks do not produce the same benefit, directly supports the claim that the walk itself (and not merely stepping away from work) is responsible, which strengthens the causal link the company relies on. The other options describe unrelated side factors (diet, weather preference, seasonal comfort) that do not address whether the walk itself is the true cause. Fastest route: to strengthen a causal claim, look for the option that eliminates the most obvious alternative explanation for the observed effect.'
  },
  {
    id: 'apti-verbal-y6',
    q: "The senior diplomat's remarks were carefully ______, revealing almost nothing concrete despite appearing to answer every question asked.",
    options: ['forthright', 'equivocal', 'impulsive', 'candid'],
    answer: 1,
    marks: 1,
    difficulty: 'hard',
    type: 'concept',
    explanation: '"Equivocal" describes language that is deliberately ambiguous or non-committal, allowing a speaker to appear responsive while actually conveying no firm information, exactly what "appearing to answer every question" while "revealing almost nothing concrete" describes. "Forthright" and "candid" both mean direct and open, the opposite of the vagueness described; "impulsive" describes acting without forethought, which contradicts "carefully," a word signaling deliberate control rather than a lack of it. Fastest route: when a sentence explicitly says a quality was exercised "carefully" alongside a description of evasiveness, the blank must mean deliberate vagueness, not mere bluntness or spontaneity.'
  },
  {
    id: 'apti-verbal-y7',
    q: 'Passage: "Not all engineers are excellent programmers, but every excellent programmer at the firm holds an engineering degree." Which of the following must be true based on this passage?',
    options: [
      'Some engineers are not excellent programmers.',
      'All engineers are excellent programmers.',
      'No engineers are excellent programmers.',
      'Excellent programmers do not need an engineering degree.'
    ],
    answer: 0,
    marks: 1,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The phrase "not all engineers are excellent programmers" is logically identical in meaning to "some engineers are not excellent programmers" — this is a direct restatement, not an inference requiring extra reasoning. The second clause, that every excellent programmer holds an engineering degree, is a separate one-directional conditional and does not by itself imply anything about whether all, none, or some engineers are excellent programmers, ruling out options 1 and 2. Option 3 directly contradicts the second clause. Fastest route: check first whether any option is simply a rephrasing of a given statement using standard logical equivalences ("not all X are Y" = "some X are not Y") before searching for a more complex derived inference.'
  },
  {
    id: 'apti-verbal-y8',
    q: "A nutritionist argues: 'Every long-distance runner I have studied eats a high-carbohydrate diet the night before a race. Therefore, eating a high-carbohydrate diet the night before a race is necessary to run long distances successfully.' Which of the following best identifies a flaw in the nutritionist's reasoning?",
    options: [
      'It assumes that a practice common among a studied group is therefore necessary for success in that activity.',
      'It fails to define what counts as a long-distance race.',
      'It does not specify the exact quantity of carbohydrates consumed.',
      'It contradicts established nutritional science.'
    ],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The nutritionist observed a pattern common to a sample of runners and then leaped from "commonly practiced by successful runners" to "necessary for success," without ruling out that success could occur without this practice, or that the practice is merely correlated with (rather than a cause of) success. This is a classic sampling-to-necessity overreach: observing that X is present in every studied case of Y does not establish that X is required for Y, since the sample may be incomplete or the two may share an unrelated common cause. Options 1 and 2 raise minor definitional nitpicks that do not address the core logical leap, and option 3 is an unsupported claim not implied by the passage. Fastest route: whenever an argument moves from "every case I observed has property X" to "X is necessary," check whether the argument has actually shown that success is impossible without X, which it almost never does.'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-data-spatial';}).questions.push(
  {
    id: 'apti-data-spatial-x1',
    q: 'A table records the units sold by a store over four days: Monday 120, Tuesday 150, Wednesday 90, Thursday 140. What is the average number of units sold per day over these four days?',
    options: ['100', '110', '125', '130'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Add all four values first: 120 + 150 + 90 + 140 = 500. Divide by the number of days, 4, to get the average: 500/4 = 125. For quick table-based averages, adding in pairs that are easy to combine mentally, such as 120 + 140 = 260 and 150 + 90 = 240, then summing 260 + 240 = 500, is often faster than adding the numbers strictly left to right, especially when some pairs round to convenient totals.'
  },
  {
    id: 'apti-data-spatial-x2',
    q: 'A table lists the total marks (Maths plus Science, out of 100 each) of five students: A scored 150, B scored 155, C scored 140, D scored 145, E scored 160. How many of these students scored a total greater than 150?',
    options: ['1', '2', '3', '4'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Scan the five totals against the threshold of strictly greater than 150: A = 150 (not greater, equal does not count), B = 155 (greater), C = 140 (not greater), D = 145 (not greater), E = 160 (greater). Exactly two students, B and E, exceed 150. The common error here is including A, whose score of exactly 150 fails a strict "greater than" condition; always re-read whether a table question asks for "greater than," "at least," or "at most," since equal-value entries are included or excluded depending on the exact wording.'
  },
  {
    id: 'apti-data-spatial-x3',
    q: 'A pie chart shows a company total annual expenditure of Rs. 5,00,000 split as Marketing 20 percent, R&D 30 percent, Operations 35 percent, and Admin 15 percent. A second chart shows that within the R&D expenditure, 40 percent goes towards employee salaries. How much of the total company expenditure is spent on R&D salaries?',
    options: ['Rs. 50,000', 'Rs. 60,000', 'Rs. 70,000', 'Rs. 75,000'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'First find the R&D expenditure from the first chart: 30 percent of Rs. 5,00,000 = Rs. 1,50,000. Then apply the second chart percentage to that R&D amount, not to the total: 40 percent of Rs. 1,50,000 = Rs. 60,000. The key discipline in two-linked-chart questions is applying each percentage to the correct base amount in sequence, first chart percentage on the grand total, second chart percentage on the resulting sub-total, rather than multiplying both percentages directly against the grand total, which would give a wrong combined figure of only 12 percent of 5,00,000.'
  },
  {
    id: 'apti-data-spatial-x4',
    q: 'A pie chart shows that a college total enrollment of 4000 students is split as Arts 25 percent, Commerce 30 percent, Science 35 percent, and Others 10 percent. A second chart shows that among Science students specifically, the ratio of male to female students is 3 to 2. How many female students are enrolled in Science?',
    options: ['480', '520', '560', '600'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'First isolate the Science student count from the first chart: 35 percent of 4000 = 1400 students. The male-to-female ratio 3 : 2 within this group splits the 1400 into 5 equal parts, each part worth 1400/5 = 280. Females occupy 2 of those 5 parts, so female Science students = 2 x 280 = 560. As with any two-linked-chart question, resolve the whole-to-subgroup percentage first to get an actual headcount, then apply the internal ratio to that headcount, never to the original grand total of 4000 directly.'
  },
  {
    id: 'apti-data-spatial-x5',
    q: 'A company annual revenue grew from Rs. 200 crore in 2021 to Rs. 250 crore in 2022. What was the percentage growth in revenue?',
    options: ['20 percent', '25 percent', '30 percent', '50 percent'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Percentage growth is always computed as (increase / original value) x 100. The increase here is 250 - 200 = 50, and the original value is 200, giving (50/200) x 100 = 25 percent. A common error is dividing the increase by the new value, 250, instead of the original value, 200, which would incorrectly give 20 percent; always anchor the percentage change calculation to the starting figure, not the ending one, since growth is measured relative to where a quantity began.'
  },
  {
    id: 'apti-data-spatial-x6',
    q: 'A firm revenue was Rs. 100 crore in Year 1. It grew by 20 percent in Year 2, and then by a further 25 percent in Year 3 relative to the Year 2 figure. What is the revenue in Year 3?',
    options: ['Rs. 140 crore', 'Rs. 145 crore', 'Rs. 150 crore', 'Rs. 160 crore'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Apply each growth rate to the immediately preceding value, not to the original Year 1 figure. Year 2 revenue = 100 x 1.20 = Rs. 120 crore. Year 3 revenue = 120 x 1.25 = Rs. 150 crore. This can also be done in one step by multiplying the growth factors together first: 1.20 x 1.25 = 1.50, so Year 3 revenue = 100 x 1.50 = Rs. 150 crore directly. Whenever a bar or line chart describes successive year-on-year growth rates, chaining the multipliers into a single combined factor before applying it to the base year value is faster than computing each intermediate year separately when only the final value is needed.'
  },
  {
    id: 'apti-data-spatial-x7',
    q: 'In a class of 50 students, 30 play cricket and 25 play football, while 10 students play both sports. How many students play neither cricket nor football?',
    options: ['0', '5', '10', '15'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Use the inclusion-exclusion principle to find how many play at least one of the two sports: cricket + football - both = 30 + 25 - 10 = 45. Subtracting this from the total class size gives the number playing neither: 50 - 45 = 5. The subtraction of the "both" count is essential because those 10 students would otherwise be counted twice, once within the cricket group and once within the football group, inflating the at-least-one total beyond the true figure.'
  },
  {
    id: 'apti-data-spatial-x8',
    q: 'In a survey of 100 people, 60 like tea, 50 like coffee, and 20 like neither beverage. How many people like both tea and coffee?',
    options: ['20', '25', '30', '35'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Since 20 out of 100 people like neither drink, the number liking at least one of the two is 100 - 20 = 80. By inclusion-exclusion, tea + coffee - both = at least one, so 60 + 50 - both = 80, giving both = 110 - 80 = 30. The general Venn-diagram shortcut for two overlapping sets is: both = (sum of the two individual counts) - (count liking at least one), where the at-least-one figure itself is obtained by subtracting the "neither" count from the grand total whenever it is given instead of being stated directly.'
  },
  {
    id: 'apti-data-spatial-x9',
    q: 'Question: What is the value of x? Statement I: x squared equals 49. Statement II: x is greater than 0. Which of the following best describes the sufficiency of these statements?',
    options: ['Statement I alone is sufficient, but Statement II alone is not', 'Statement II alone is sufficient, but Statement I alone is not', 'Both statements together are sufficient, but neither statement alone is sufficient', 'Each statement alone is sufficient to answer the question'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Statement I alone gives x squared = 49, which allows x = 7 or x = -7, two possible values, so it does not pin down a unique answer on its own. Statement II alone only says x is positive, which is consistent with infinitely many values of x, giving no specific value at all. Combining both statements restricts x to being positive and satisfying x squared = 49, which uniquely forces x = 7, discarding the negative root. Since neither statement alone fixes a unique value but both together do, the correct classification is that they are sufficient only jointly, never individually.'
  },
  {
    id: 'apti-data-spatial-x10',
    q: 'Question: What is the ratio of the present ages of A and B? Statement I: Five years ago, the ratio of the age of A to the age of B was 3 to 4. Statement II: Ten years from now, the ratio of the age of A to the age of B will be 5 to 6. Which of the following best describes the sufficiency of these statements?',
    options: ['Statement I alone is sufficient, but Statement II alone is not', 'Statement II alone is sufficient, but Statement I alone is not', 'Both statements together are sufficient, but neither statement alone is sufficient', 'Each statement alone is sufficient to answer the question'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Each statement alone gives just one linear relationship between the present ages of A and B, which has infinitely many solutions since there are two unknowns and only one equation; for example, Statement I alone is satisfied by many different actual age pairs that all preserve a 3-to-4 ratio five years ago. Combining both statements provides two independent linear equations in the two unknowns, present age of A and present age of B, which together pin down a single unique solution and hence a single determinate ratio. This is the standard data-sufficiency signature for age or ratio problems: one equation per statement, needing both together to match the two unknowns actually present.'
  },
  {
    id: 'apti-data-spatial-x11',
    q: 'A square sheet of paper is folded exactly once in half along a straight vertical line and then unfolded completely. How many crease lines are visible on the unfolded sheet?',
    options: ['0', '1', '2', '4'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A single fold produces exactly one crease line along the fold axis, and unfolding the paper does not remove this crease, since the crease is a permanent mark left in the paper fibers. With only one fold performed in the entire process, only one crease line can possibly exist on the unfolded sheet. The general rule for paper-folding crease questions is that the number of distinct crease lines equals the number of distinct fold operations performed, provided each fold is made along a new line rather than repeating an existing crease.'
  },
  {
    id: 'apti-data-spatial-x12',
    q: 'A square sheet of paper is folded in half along a vertical line, and then folded again in half along a horizontal line, before being completely unfolded. How many crease lines are visible on the unfolded sheet in total?',
    options: ['1', '2', '3', '4'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Each distinct fold direction leaves behind exactly one crease line running the full length of the sheet along that fold axis. The vertical fold leaves one vertical crease, and the separate horizontal fold leaves one horizontal crease, giving 2 crease lines total once the sheet is fully unfolded. It does not matter that the second fold was made on an already-folded (smaller, doubled) sheet, since the crease still propagates through both layers and appears as a single continuous line across the full sheet once unfolded; the total crease count still equals the number of distinct fold directions used, which is 2 here.'
  },
  {
    id: 'apti-data-spatial-x13',
    q: 'A square sheet of paper is folded in half twice in succession, producing a smaller square exactly one-fourth the area of the original sheet. A small hole is then punched through the corner of this folded square that corresponds to an actual outer corner of the original, unfolded sheet. When the paper is completely unfolded, how many holes appear in total?',
    options: ['1', '2', '4', '8'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Folding a square sheet in half twice creates 4 layers of paper stacked together, and punching through the folded corner cuts through all 4 layers at once, at a position that maps to a genuine corner of the original sheet rather than to its center. Each of the 4 original corners of the unfolded sheet lands exactly on this stacked corner position after the two folds, so unfolding reveals one hole at each of the 4 original corners, giving 4 holes total. This differs from punching at the folded corner that corresponds to the sheet center, which would instead produce a single hole shared right at the middle, since all 4 layers there map onto the same central point rather than 4 distinct points.'
  },
  {
    id: 'apti-data-spatial-x14',
    q: 'The word OXIDE is held up in front of a vertical plane mirror. Considering only the individual letters that look visually identical to their normal form when mirrored left to right, how many of the letters in OXIDE remain unchanged in the mirror image?',
    options: ['2', '3', '4', '5'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A letter looks unchanged in a left-right mirror exactly when it has a vertical line of symmetry. Checking each letter of OXIDE: O is symmetric (unchanged), X is symmetric (unchanged), I is symmetric (unchanged), D is not vertically symmetric (its curved side reverses), E is not vertically symmetric (its open side reverses). This gives 3 letters, O, X, and I, that remain visually unchanged. The fast method for any mirror-image letter question is to mentally classify only the specific letters involved as either having a vertical symmetry axis (like A, H, I, M, O, T, U, V, W, X, Y) or not, rather than trying to mirror the entire word as one image.'
  },
  {
    id: 'apti-data-spatial-x15',
    q: 'Consider the letters D, E, H, and N reflected in still water below them, so each letter is flipped upside down (top to bottom) rather than left to right. How many of these four letters appear visually unchanged in this water image?',
    options: ['1', '2', '3', '4'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'A water image flips a shape about a horizontal axis, so a letter appears unchanged only if it has a horizontal line of symmetry, top and bottom mirroring each other. D has such symmetry (its curve is symmetric top to bottom), E has such symmetry (its three horizontal strokes mirror around the middle one), and H has such symmetry (its structure is identical when flipped vertically). N does not have horizontal symmetry, since its diagonal stroke reverses direction when flipped top to bottom, turning into a different-looking shape. This gives 3 letters, D, E, and H, that remain unchanged, distinguishing a water (horizontal-axis) reflection question from a plane-mirror (vertical-axis) reflection question, which would test a different symmetry property of the same letters.'
  },
  {
    id: 'apti-data-spatial-x16',
    q: 'A standard cubical die has its numbers arranged so that the numbers on any pair of opposite faces always add up to 7 (so 1 is opposite 6, 2 is opposite 5, and 3 is opposite 4). If the die is placed with 1 facing up and 2 facing towards you, which number faces directly away from you?',
    options: ['3', '4', '5', '6'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'The face pointing directly away from the viewer is the one opposite the face pointing towards the viewer, not the one opposite the top face. Since 2 is the face towards the viewer, its opposite face, which faces away, is the number that sums with 2 to make 7, namely 5. The top face showing 1 is not directly relevant to this particular question, since only the front-back pair of faces determines what lies directly behind; a common error is instead computing the opposite of the top face and answering 6, which actually names the bottom face, not the back face.'
  },
  {
    id: 'apti-data-spatial-x17',
    q: 'Three different views of the same die are described. View 1 shows the numbers 1, 2, and 3 on its three visible faces. View 2 shows the numbers 1, 4, and 5. View 3 shows the numbers 2, 4, and 6. Based on these views, which number lies on the face opposite to the face showing 1?',
    options: ['3', '4', '5', '6'],
    answer: 3,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Two faces that appear together in the same view of a die can never be opposite each other, since opposite faces of a cube can never be seen simultaneously in a single view. Face 1 appears together with 2 and 3 in View 1, and together with 4 and 5 in View 2, so 1 cannot be opposite any of 2, 3, 4, or 5, since each of these has been directly seen alongside 1 in some view. Among the six faces, the only number never seen in the same view as 1 is 6, since 6 only appears in View 3 alongside 2 and 4, never alongside 1. By elimination, 6 must be the face opposite 1. This elimination technique, ruling out every number that has co-appeared with the target face, is the standard method whenever several partial views of the same die are given instead of one direct pair of opposite faces.'
  },
  {
    id: 'apti-data-spatial-x18',
    q: 'A cube net is made of six squares arranged as a vertical strip of four squares (with the squares in order U2, U1, C, D from top to bottom), with an additional square L attached to the left of C and another square R attached to the right of C. When this net is folded into a cube, which square becomes the face opposite square C?',
    options: ['U1 (immediately above C)', 'U2 (two squares above C)', 'L (attached to the left of C)', 'D (immediately below C)'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'In any straight run of four consecutive squares within a cube net, the standard folding rule is that the 1st and 3rd squares in the run become opposite faces, and the 2nd and 4th squares become opposite faces, since folding a 4-strip wraps it exactly once around the four side faces of the cube. In the vertical run U2, U1, C, D (positions 1, 2, 3, 4), square C sits in the 3rd position, so its opposite face is the 1st position square, U2, which is two squares above it. The two side squares L and R, both attached directly to C on either side, become the remaining top and bottom faces of the cube and end up opposite each other, not opposite C, since C itself is already paired with U2 by the strip rule.'
  },
  {
    id: 'apti-data-spatial-x19',
    q: 'A cube net consists of four squares P, Q, R, and S arranged left to right in a straight horizontal row, with an extra square T attached above square Q and an extra square U attached below square Q. When this net is folded into a cube, which face becomes opposite face S?',
    options: ['P', 'Q', 'R', 'U'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Using the standard rule for a straight run of four squares, positions 1, 2, 3, 4 in the row P, Q, R, S pair up as (1st, 3rd) opposite and (2nd, 4th) opposite, since a 4-square strip wraps exactly once around the four lateral faces of the cube. Here S is the 4th square in the row, so its opposite face is the 2nd square, Q. The squares T and U, both attached to Q on opposite sides (above and below) in the flat net, become the remaining top and bottom faces of the cube and are opposite each other, but neither is opposite S, since S has already been paired with Q by the strip rule, leaving T and U to pair only with each other by elimination.'
  },
  {
    id: 'apti-data-spatial-x20',
    q: 'A cube net is drawn as a horizontal row of four squares B, C, D, E from left to right, with a fifth square A attached directly above square C, and a sixth square F attached directly below square D. When this net is folded into a cube, which face lies opposite face A?',
    options: ['B', 'C', 'D', 'F'],
    answer: 3,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Apply the straight-run rule to the horizontal strip B, C, D, E (positions 1, 2, 3, 4): the 1st and 3rd squares are opposite, giving B opposite D, and the 2nd and 4th squares are opposite, giving C opposite E. This accounts for two of the three opposite pairs among the six faces using the reliable strip rule alone. The two remaining squares, A and F, have not yet been paired with anything, since each is attached to a different square (A above C, F below D) rather than sharing one attachment point, so a fresh straight-run cannot be formed between them directly. However, since a cube has exactly three pairs of opposite faces and two pairs are already accounted for, the only two faces left over, A and F, must form the third and final pair by elimination, so F is opposite A.'
  },
  {
    id: 'apti-data-spatial-y1',
    q: "A company's quarterly revenue (in Rs. lakh) is: Branch A: Q1 = 40, Q2 = 55; Branch B: Q1 = 60, Q2 = 66; Branch C: Q1 = 50, Q2 = 45; Branch D: Q1 = 70, Q2 = 77. For how many of these branches did the revenue growth from Q1 to Q2 exceed 10%? (Enter your numerical answer.)",
    options: [],
    answer: 1,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: "Compute each branch's growth ratio: A = 55/40 = 1.375, a 37.5% rise, which exceeds 10%. B = 66/60 = 1.10, exactly a 10% rise, not strictly exceeding it. C = 45/50 = 0.90, a fall, not a rise at all. D = 77/70 = 1.10, exactly 10%, also not exceeding. Only Branch A strictly exceeds a 10% growth rate, so the count is 1. Fastest route: convert each Q2/Q1 ratio to a percentage change in one division per branch, and be careful with the word 'exceed' — an exact 10% growth does not count, since it is equal to, not greater than, the threshold."
  },
  {
    id: 'apti-data-spatial-y2',
    q: "A student's marks (out of 100) with subject credit weights are: Maths 80 (weight 4), Physics 70 (weight 3), Chemistry 90 (weight 2), English 60 (weight 1). What is the weighted average percentage mark, rounded to the nearest whole number? (Enter your numerical answer.)",
    options: [],
    answer: 77,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Weighted average = (sum of mark x weight) / (sum of weights). Numerator = 80x4 + 70x3 + 90x2 + 60x1 = 320 + 210 + 180 + 60 = 770. Denominator = 4 + 3 + 2 + 1 = 10. Weighted average = 770/10 = 77. Fastest route: multiply each mark by its weight and add all products in one running total before dividing once by the total weight, rather than computing a plain unweighted average, which would wrongly treat every subject as equally important.'
  },
  {
    id: 'apti-data-spatial-y3',
    q: 'A cube of side 4 cm is painted red on all six faces and then cut into 1 cm x 1 cm x 1 cm smaller cubes. How many of the smaller cubes have exactly one face painted? (Enter your numerical answer.)',
    options: [],
    answer: 24,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'For an n x n x n cube cut into unit cubes, the small cubes with exactly one painted face lie in the interior of each face (excluding the edge and corner cubes of that face), and there are (n-2)^2 such cubes per face, across all 6 faces. Here n = 4, so (n-2)^2 = 2^2 = 4 per face, and 6 faces give 6 x 4 = 24. Fastest route: memorize the three standard cube-cutting counts directly — corner cubes (3 faces painted) = 8 always, edge cubes (2 faces painted) = 12(n-2), face cubes (1 face painted) = 6(n-2)^2, interior cubes (0 faces painted) = (n-2)^3 — and simply substitute n, rather than counting positions manually.'
  },
  {
    id: 'apti-data-spatial-y4',
    q: 'A cube of side 5 cm is painted on all six faces and then cut into 1 cm x 1 cm x 1 cm smaller cubes. How many of the smaller cubes have no face painted at all? (Enter your numerical answer.)',
    options: [],
    answer: 27,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Unpainted small cubes form the solid interior block once the outer painted layer is removed from all six sides, giving a smaller cube of side (n-2) units. Here n = 5, so the interior cube has side 3, containing 3^3 = 27 unit cubes. Fastest route: use the memorized formula (n-2)^3 for zero-painted-face cubes directly instead of visualizing layer removal each time; it applies for any n >= 2, and gives 0 automatically whenever n is 2 or less, since there is no interior left to unpaint.'
  },
  {
    id: 'apti-data-spatial-y5',
    q: 'A table lists the number of defective items found in five inspection batches: Batch 1 = 3, Batch 2 = 7, Batch 3 = 5, Batch 4 = 9, Batch 5 = 6. If each defective item costs the company Rs. 250 to rework, what is the total rework cost for all batches combined, in rupees? (Enter your numerical answer.)',
    options: [],
    answer: 7500,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'First sum the defective counts across all batches: 3 + 7 + 5 + 9 + 6 = 30. Then multiply the total count by the per-item cost: 30 x 250 = 7500. Fastest route: always total the quantity column first and multiply once by the unit rate at the end, rather than computing a rework cost per batch and adding five separate products, which takes longer and multiplies the chance of an arithmetic slip.'
  },
  {
    id: 'apti-data-spatial-y6',
    q: 'Starting from point P, a man walks 8 km north, then 6 km east, then 8 km south. What is the shortest distance, in km, between his final position and point P? (Enter your numerical answer.)',
    options: [],
    answer: 6,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Track net displacement along each axis separately: north-south movement is 8 km north then 8 km south, which cancels exactly to a net vertical displacement of 0. East-west movement is a single 6 km east, giving a net horizontal displacement of 6 km. With zero net vertical displacement, the straight-line distance from P equals the horizontal displacement alone, which is 6 km. Fastest route: sum all north/south moves and all east/west moves separately into two net values first, and only invoke the Pythagorean theorem (hypotenuse of the two nets) when both net values are non-zero; here one net value is exactly zero, so the answer is simply the other leg.'
  },
  {
    id: 'apti-data-spatial-y7',
    q: 'A survey of 200 people recorded their preferred mode of commute: Car = 60, Bus = 50, Bike = 40, Walk = 30, Other = 20. What percentage of respondents preferred either Bus or Bike? (Enter your numerical answer.)',
    options: [],
    answer: 45,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Add the Bus and Bike counts: 50 + 40 = 90. Express this as a percentage of the total 200 respondents: (90/200) x 100 = 45%. Fastest route: for an "either/or" share question on a frequency table, add only the relevant category counts first and divide by the grand total once, rather than computing each category\'s percentage separately and adding the two percentages, which is an extra, unnecessary step.'
  },
  {
    id: 'apti-data-spatial-y8',
    q: 'A cyclist starts at point X, rides 5 km east, then 12 km north, then 5 km west, then 4 km north. What is the straight-line distance, in km, from X to the cyclist\'s final position? (Enter your numerical answer.)',
    options: [],
    answer: 16,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Track east-west and north-south movement separately: 5 km east followed later by 5 km west cancels exactly, giving a net east-west displacement of 0. The two northward legs add directly: 12 km + 4 km = 16 km net displacement north. Since the net east-west component is zero, the straight-line distance from X equals the net north-south displacement alone, which is 16 km. Fastest route: net out same-axis movements (east cancels west, north adds with north) before reaching for the Pythagorean theorem; a theorem is only needed when both final net components are non-zero.'
  }
);


window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-quant';}).theory.deep = 'PERCENTAGE-FRACTION EQUIVALENTS (memorize cold, never divide by hand)\n• 1/2 = 50% • 1/3 = 33.33% • 2/3 = 66.67% • 1/4 = 25% • 3/4 = 75%\n• 1/5 = 20% • 2/5 = 40% • 3/5 = 60% • 4/5 = 80%\n• 1/6 = 16.67% • 5/6 = 83.33% • 1/7 = 14.28% • 2/7 = 28.57% • 3/7 = 42.85%\n• 1/8 = 12.5% • 3/8 = 37.5% • 5/8 = 62.5% • 7/8 = 87.5%\n• 1/9 = 11.11% • 2/9 = 22.22% • 4/9 = 44.44% • 1/10 = 10%\n• 1/11 = 9.09% • 2/11 = 18.18% • 1/12 = 8.33% • 5/12 = 41.67%\nFAST ROUTE: to find 37.5% of 640, read it as 3/8 of 640 = 240 instantly. SLOW ROUTE: 0.375 x 640 by long multiplication.\n\nSUCCESSIVE PERCENTAGE CHANGE\n• Net factor = (1 + p/100)(1 + q/100); never add p and q directly.\n• Fast net% formula: net% = p + q + pq/100, with sign carried by p and q.\n• Example: price rises 20% then falls 10%. FAST: 20 - 10 + (20)(-10)/100 = 20 - 10 - 2 = 8% net rise. SLOW: compute 1.2 x 0.9 = 1.08 by multiplying decimals.\n• Repeated same change n times: factor = (1 + p/100)^n.\n\nALLIGATION (CROSS METHOD)\n• For mixing two quantities at values/concentrations d1 and d2 to get a mean m, the ratio of quantities is (d2 - m) : (m - d1) — cross-subtract diagonally.\n• Example: mix milk (pure, 100%) with water (0%) to get 40 L milk-water at 75% milk. Ratio milk:water = (0-25... use values 100 and 0, mean 75) -> (75-0):(100-75) = 75:25 = 3:1. FAST: split 40 L directly into 30 L milk, 10 L water using the 3:1 ratio. SLOW: set up simultaneous equations x + y = 40, x = 0.75(40).\n• Alligation also solves average-price, average-speed-of-mixed-population, and exam-average problems by treating any two-group blend the same way.\n\nWORK AND TIME — LCM METHOD (fastest for GATE-style problems)\n• Take total work = LCM of all given days, so every person\'s daily rate becomes a whole number of "units/day" instead of a fraction.\n• Example: A finishes in 12 days, B in 18 days. LCM = 36 units. A\'s rate = 3 units/day, B\'s rate = 2 units/day. Together they do 5 units/day, so time = 36/5 = 7.2 days. FAST: whole-number arithmetic throughout. SLOW: adding fractions 1/12 + 1/18 with an LCD of 36 done via algebra.\n• Efficiency ratio: if A is twice as efficient as B, A\'s units/day is twice B\'s, and their time ratio is the inverse, 1:2.\n• Pipes filling vs emptying: emptying pipes get negative units; net rate = sum of signed unit rates.\n\nRELATIVE SPEED AND TRAIN-CROSSING FORMULAS\n• Opposite directions: relative speed = sum of speeds. Same direction: relative speed = difference of speeds.\n• Train crossing a stationary pole/man: time = length of train / speed of train.\n• Train crossing a platform: time = (length of train + length of platform) / speed of train.\n• Two trains crossing each other: time = (L1 + L2) / (relative speed), using sum of speeds if opposite, difference if same direction.\n• Unit conversion: km/h to m/s multiply by 5/18; m/s to km/h multiply by 18/5.\n• Boats and streams: downstream speed = b + s, upstream speed = b - s, so b = (down+up)/2 and s = (down-up)/2.\n• Average speed for equal distances at speeds x and y = 2xy/(x+y) (harmonic mean) — NEVER (x+y)/2.\n\nSIMPLE VS COMPOUND INTEREST — DIFFERENCE FORMULAS\n• SI = Prt/100. CI amount A = P(1+r/100)^t, CI = A - P.\n• 2-year difference: CI - SI = P(r/100)^2.\n• 3-year difference: CI - SI = P(r/100)^2 x (3 + r/100).\n• Example: P=2000, r=10%, t=2 years. FAST: CI-SI = 2000 x 0.01 = 20. SLOW: compute CI and SI separately then subtract (SI=400, CI=420, diff=20 — matches).\n\nREMAINDER CYCLES FOR UNIT DIGITS (cyclicity table)\n• Digits 0,1,5,6 repeat every 1 power (unit digit stays the same).\n• Digits 4,9 repeat every 2 powers (4,6,4,6... and 9,1,9,1...).\n• Digits 2,3,7,8 repeat every 4 powers.\n• Method: find remainder of exponent mod cycle length (use 4 if remainder is 0), then read off the cycle.\n• Example: unit digit of 7^123. Cycle of 7 is 7,9,3,1 (length 4). 123 mod 4 = 3, so 3rd term = 3. FAST: one division. SLOW: computing 7^123 directly.\n\nPERMUTATIONS, COMBINATIONS, PROBABILITY\n• nPr = n!/(n-r)! (arrangement, order matters). nCr = n!/(r!(n-r)!) (selection, order doesn\'t matter).\n• nCr = nC(n-r); nC0 = nCn = 1; nC1 = n.\n• Circular arrangement of n distinct items = (n-1)!; if clockwise/anticlockwise are identical, (n-1)!/2.\n• Probability complement trick: P(at least one) = 1 - P(none). Almost always faster than summing individual cases.\n• Example: probability of at least one head in 3 coin tosses. FAST: 1 - P(no heads) = 1 - (1/2)^3 = 7/8. SLOW: sum P(exactly 1)+P(exactly 2)+P(exactly 3) using binomial terms.\n\nWORKED EXAMPLES: FAST VS SLOW\n1) Find 62.5% of 480. FAST: 62.5% = 5/8, so 5/8 x 480 = 300 (mental). SLOW: 0.625 x 480 via long multiplication (187.5 + ... error-prone).\n2) A shopkeeper marks goods 40% above cost and gives 25% discount. Net profit%? FAST: factor = 1.4 x 0.75 = 1.05, so 5% profit. SLOW: assume CP=100, compute MP=140, SP=140-25%of140=105, profit=5 — same answer but two extra steps of arithmetic.\n3) Two trains of length 150 m and 100 m move toward each other at 54 km/h and 36 km/h. Time to cross? FAST: relative speed = 90 km/h = 25 m/s (multiply by 5/18); time = 250/25 = 10 s. SLOW: convert each speed separately to m/s and add (15 + 10 = 25), same result but more conversion steps and more room for arithmetic slips.\n\nTIME TRAPS\n• Never add successive percentages directly — always use the product-of-factors or net% formula with the pq/100 correction term.\n• Profit% is on cost price by default; only use selling price as base if the question explicitly says so.\n• Average speed for equal distances is the harmonic mean, not the arithmetic mean — a very common GATE distractor.\n• "Crosses a platform" includes both train length and platform length in the distance, not just one.\n• Downstream/upstream problems: always solve for boat speed and stream speed separately using sum/difference halving, don\'t guess.\n• In work problems, a rate given as "days to finish alone" must be inverted to a per-day rate before adding.\n• Watch units: km/h vs m/s mismatches are the single most common careless-error source in speed problems.\n• "At least one" probability problems are solved fastest via the complement; direct enumeration wastes time and risks missing a case.';


window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-logical';}).theory.deep = 'SERIES PATTERN TAXONOMY (scan for these in order, fastest first)\n• Constant difference: 2,5,8,11 (d=+3). Constant ratio: 3,6,12,24 (r=x2).\n• Difference-of-differences (quadratic): 1,2,5,10,17 — differences 1,3,5,7 form their own AP, so next diff is 9, next term 26.\n• Alternating two interleaved series: 1,10,3,8,5,6 — odd positions 1,3,5 (+2 each), even positions 10,8,6 (-2 each).\n• Multiply-then-add/subtract: 2,5,11,23,47 — each term = prev x2 + 1.\n• Squares/cubes shifted: 2,5,10,17,26 = n^2+1 for n=1,2,3,4,5.\n• Prime number series: 2,3,5,7,11,13 — check primality when no arithmetic pattern fits.\n• FAST ROUTE: compute first-level differences immediately; if not constant, compute second-level differences before trying multiplication patterns. SLOW ROUTE: guessing random operations term by term.\n\nSYLLOGISM RULES WITH VENN SHORTCUTS\n• "All A are B": draw A as a small circle fully inside B.\n• "No A are B": draw A and B as fully separate, non-overlapping circles.\n• "Some A are B": draw A and B as partially overlapping circles (some overlap must exist, but exact extent is undetermined).\n• "Some A are not B": A has at least one part outside B.\n• Two-statement combination rule: if the middle term (common to both premises) is distributed (i.e., appears as the subject of a universal "All" or in a "No" statement) in at least one premise, a valid conclusion may follow; otherwise no definite conclusion exists.\n• Classic trap: "All A are B, All B are C" gives "All A are C" (valid, chain through B). But "All A are B, All C are B" gives NO definite relation between A and C — both A and C could be disjoint subsets of B. This is the single most common GATE-style syllogism trap.\n• "Some A are B, All B are C" gives "Some A are C" (valid): the overlap between A and B is inside C.\n• FAST ROUTE: draw one combined Venn diagram covering the extreme (most restrictive) case and the loosest possible case; if the conclusion holds in both, it is definite. SLOW ROUTE: verbally reasoning through every combination of set relations without a diagram.\n\nDIRECTION SENSE METHOD\n• Fix a standard compass on paper: up = North, right = East, down = South, left = West.\n• "Turn left" from facing North means now facing West; "turn right" from North means facing East (always rotate 90 degrees in the turn\'s direction).\n• Track net displacement as (x, y) coordinates: East/North add positively, West/South subtract, then use distance = sqrt(x^2+y^2) or simple Pythagorean triples (3-4-5, 5-12-13) for shortest-distance questions.\n• FAST ROUTE: plot each leg as a vector on an imaginary grid and sum x and y components separately, then apply Pythagoras once at the end. SLOW ROUTE: trying to visualize the entire path without coordinates and losing track of orientation after 3+ turns.\n• Example: walk 3 km North, turn right, walk 4 km, turn right, walk 3 km. Net displacement: North leg cancels with the final South-facing leg (after two right turns from North you face South), leaving only the 4 km East leg — so straight-line distance from start = 4 km. FAST: track that two right turns reverse direction (North to South), so the two 3 km legs cancel exactly. SLOW: draw the full path step by step on paper and measure.\n\nBLOOD RELATION NOTATION\n• Use shorthand: M = mother, F = father, S = sister, B = brother, D = daughter, So = son, H = husband, W = wife.\n• "A\'s father\'s only son" = A himself (if A is male) or A\'s brother (if A is female and the father has one son).\n• "Mother\'s brother" = maternal uncle; "father\'s sister\'s husband" = uncle (by marriage, paternal aunt\'s husband).\n• Build a family tree diagram top-down (grandparents to parents to children) as you read each clue; label gender with M/F to avoid ambiguity.\n• FAST ROUTE: draw the tree once, label every node as each clue arrives. SLOW ROUTE: trying to hold multiple generations in your head purely verbally.\n\nCLOCK ANGLE FORMULA\n• Angle of hour hand from 12 = 0.5 degrees per minute (30 degrees/hour + 0.5 degrees per minute past the hour).\n• Angle of minute hand from 12 = 6 degrees per minute.\n• Angle between hands = |30H - 5.5M| degrees, where H is the hour (0-11) and M is minutes; if the result exceeds 180, subtract from 360.\n• Example: angle at 3:40. FAST: |30(3) - 5.5(40)| = |90 - 220| = 130 degrees. SLOW: compute each hand\'s position separately (hour hand at 90+20=110 degrees, minute hand at 240 degrees, difference 130) — same answer via more steps.\n• Hands overlap (coincide) every 12/11 hours = 65 minutes 27.3 seconds apart, not exactly every 60 minutes.\n\nCALENDAR ODD-DAYS METHOD\n• Odd days = remainder when total days is divided by 7, mapped to a weekday (0=Sunday, 1=Monday, ... 6=Saturday, using a fixed reference).\n• A normal year has 1 odd day (365 mod 7 = 1); a leap year has 2 odd days (366 mod 7 = 2).\n• Century odd days: 100 years = 5 odd days, 200 years = 3 odd days, 300 years = 1 odd day, 400 years = 0 odd days (400-year cycles repeat the calendar exactly).\n• FAST ROUTE: break the total elapsed years into centuries plus remaining years, sum the odd days using the table above and add leap-year corrections, then take mod 7. SLOW ROUTE: counting every single day manually across years.\n• Leap year rule: divisible by 4 is a leap year, UNLESS divisible by 100, in which case it is NOT a leap year, UNLESS also divisible by 400, in which case it IS a leap year (2000 was leap, 1900 was not).\n\nCUBE PAINTING FORMULAS (for an n x n x n cube cut into unit cubes, outer surface painted)\n• Corner cubes (3 faces painted): always 8, regardless of n (n >= 2).\n• Edge cubes (2 faces painted): 12 x (n-2), one set per edge excluding corners.\n• Face cubes (1 face painted): 6 x (n-2)^2, the interior of each face excluding the edge border.\n• Completely unpainted (0 faces painted, fully interior): (n-2)^3.\n• Total unit cubes = n^3, and the four categories above must sum to n^3 as a sanity check.\n• Example: n=4 cube. Corners=8, edges=12x2=24, faces=6x4=24, interior=2^3=8. Sum = 8+24+24+8=64=4^3. FAST: plug into formulas directly. SLOW: physically visualizing and counting each of 64 small cubes.\n\nWORKED EXAMPLES: FAST VS SLOW\n1) Find the missing term: 5, 11, 23, 47, ? FAST: spot pattern x2+1 (5x2+1=11, 11x2+1=23, 23x2+1=47), so next = 47x2+1=95. SLOW: trying differences (6,12,24) then realizing they double too, taking longer to confirm the rule.\n2) Statements: "All pens are books. No book is a pencil." Conclusion: "No pen is a pencil." FAST: draw pens fully inside books, books fully outside pencils — pens automatically excluded from pencils, conclusion valid. SLOW: testing multiple conclusion options against the statements one by one without a diagram.\n3) A man walks 5 km East, turns left, walks 5 km, turns left again, walks 5 km. How far and in what direction is he from start? FAST: two left turns from East face = facing West after first turn... track vectors: East(+5,0), then facing North (+0,+5), then facing West (-5,0); net = (0,+5), so 5 km North of start. SLOW: sketching the entire square path and measuring by hand each time.\n\nTIME TRAPS\n• "All A are B, All C are B" never yields a relation between A and C — a very common false-conclusion trap in syllogisms.\n• In direction sense, always confirm which way "left" and "right" rotate relative to current facing direction — do not assume compass directions correspond to fixed screen directions.\n• Clock angle problems: always take the absolute value and check if it exceeds 180 degrees, since the reflex angle is not the intended answer.\n• Century leap year exception (divisible by 100 but not 400) is the most frequently tested calendar trap.\n• Cube painting: corner count is ALWAYS 8 regardless of cube size — a common wrong answer scales it with n.\n• In series questions, do not stop at first-level differences; if they are not constant, always check second-level differences before assuming no arithmetic pattern exists.\n• Blood relation puzzles: gender ambiguity ("child," "sibling") is a deliberate trap — resolve it only when the passage explicitly states gender.';


window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-verbal';}).theory.deep = 'SUBJECT-VERB AGREEMENT CASES\n• Basic rule: singular subject takes singular verb, plural subject takes plural verb, regardless of intervening phrases.\n• Phrases like "along with," "as well as," "together with," "in addition to" do NOT make the subject plural: "The manager, along with his team, is attending" (verb agrees with "manager," singular).\n• "Each," "every," "either," "neither," "everyone," "somebody" are always singular: "Each of the students has submitted."\n• Collective nouns (team, jury, family, committee) take a singular verb when acting as one unit, plural when members act individually: "The team is winning" vs "The team are arguing among themselves."\n• "Neither...nor" and "either...or": the verb agrees with the subject nearest to it: "Neither the teacher nor the students were present."\n• Indefinite pronouns "none," "any," "all," "some" can be singular or plural depending on the noun they refer to: "None of the milk is left" (uncountable, singular) vs "None of the students are absent" (countable, plural).\n• A subject followed by a parenthetical or a relative clause still governs the verb: "The list of items, which was long, was checked" (verb agrees with "list," not "items").\n• Inverted sentences ("There is/are," "Here comes/come"): the verb agrees with the noun that follows, not with "there/here": "There are three books on the table."\n• FAST ROUTE: mentally strip out every prepositional phrase and modifier between subject and verb, leaving only the bare subject to check agreement against. SLOW ROUTE: reading the full sentence with all modifiers and guessing by ear.\n\nTENSE SEQUENCE RULES\n• If the main clause is in a past tense, the subordinate clause is usually also in a past form (not present or future), except for universal truths: "He said that the earth revolves around the sun" (present allowed for permanent facts) vs "He said that he was tired" (past required for the specific past state).\n• Present perfect ("has/have + past participle") is used for actions with relevance to the present or unspecified past time; simple past is used for a definite, completed past time with a specific time marker: "I have visited Paris" (unspecified) vs "I visited Paris in 2019" (specific time, so NOT present perfect).\n• Past perfect ("had + past participle") marks the earlier of two past actions: "By the time the train arrived, the passengers had already boarded" (boarding happened before arrival, so past perfect for boarding).\n• "Since" pairs with a point in time and present perfect/past perfect ("since 2010," "since Monday"); "for" pairs with a duration ("for three years").\n• Conditional sentences: Type 1 (real future) — If + present, will + base verb; Type 2 (unreal present) — If + past, would + base verb; Type 3 (unreal past) — If + past perfect, would have + past participle. Mixing types (e.g., "If I was rich, I will buy") is a classic GATE-style error.\n• FAST ROUTE: identify the conditional type first by checking the "if" clause\'s tense, then apply the matching main-clause template mechanically. SLOW ROUTE: translating the sentence\'s intended meaning freely without checking which of the three fixed templates it must follow.\n\nCOMMON CONFUSABLE WORD PAIRS\n• Affect (verb, to influence) vs Effect (noun, a result): "The rain affected the match; the effect was a delay."\n• Principal (main; or head of a school) vs Principle (a fundamental rule): "The principal explained the principle of conservation of energy."\n• Stationary (not moving) vs Stationery (paper/office supplies).\n• Complement (something that completes) vs Compliment (praise): "Her scarf complements her dress; he paid her a compliment."\n• Its (possessive of it) vs It\'s (contraction of "it is"): "The dog wagged its tail; it\'s raining."\n• Their (possessive) vs There (place) vs They\'re (they are).\n• Loose (not tight, adjective) vs Lose (to misplace/fail to win, verb): "The screw is loose; don\'t lose the key."\n• Elicit (to draw out) vs Illicit (illegal).\n• Discreet (careful, tactful) vs Discrete (separate, distinct).\n• Farther (physical distance) vs Further (figurative extent/additional): "He walked farther; we discussed it further."\n• Fewer (countable nouns) vs Less (uncountable nouns): "Fewer books, less water."\n• Amount (uncountable) vs Number (countable): "A large number of students, a small amount of sugar."\n• Between (two items) vs Among (three or more).\n• Imply (speaker suggests) vs Infer (listener deduces): "He implied he was tired; I inferred he wanted to leave."\n• FAST ROUTE: memorize the pair as one anchor sentence each so recall is instant during the exam. SLOW ROUTE: reasoning out the meaning from Latin/Greek roots under time pressure.\n\nREADING COMPREHENSION AND VERBAL REASONING SPEED TECHNIQUES\n• Read the question stems first, then skim the passage for keywords rather than reading every line closely on a first pass.\n• For "which of the following can be concluded" questions, treat only options that must be true given the passage as correct — plausible-sounding but unstated options are traps.\n• Critical reasoning (strengthen/weaken arguments): identify the conclusion and the premise separately first; an answer that supports the premise but not the conclusion is a distractor.\n• Analogy questions: state the relationship between the given pair in one abstract phrase (e.g., "part of," "used to," "opposite of") before scanning the options for the same relationship.\n• Odd-one-out (classification) questions: check category membership by the most restrictive shared property, not just superficial similarity.\n• FAST ROUTE: extract the relationship/logic in one clause before touching the options. SLOW ROUTE: testing each option against the pair one at a time without first fixing the relationship type.\n\nWORKED EXAMPLES: FAST VS SLOW\n1) Choose the correct verb: "The number of students in the class ___ increasing." (has/have) FAST: "The number of" is always treated as singular, so "has" is correct — a memorized rule applied instantly. SLOW: mentally counting whether "students" (plural) or "number" (singular) should govern, and second-guessing.\n2) Correct the sentence: "If I was you, I would apologize." FAST: recognize this as a Type 2 conditional (unreal present), which requires "were" not "was" in the if-clause ("If I were you..."), a fixed subjunctive rule. SLOW: rephrasing the sentence entirely to avoid deciding between was/were.\n3) Analogy: DOCTOR : HOSPITAL :: TEACHER : ? (a) Student (b) Blackboard (c) School (d) Book. FAST: relationship is "workplace of," so the answer must be the teacher\'s workplace = School (c), found in one pass. SLOW: checking all four options against vague notions of "association with a teacher" without fixing the relationship type first.\n\nTIME TRAPS\n• "Along with / as well as / together with" phrases never change the number of the main subject — a very frequently tested trap.\n• Present perfect cannot be used with a specific past time marker (yesterday, last year, in 2019) — using it there is an automatic error.\n• Subjunctive "were" is mandatory in unreal/hypothetical conditionals ("If I were," "I wish I were"), not "was," even though "was" sounds natural to many learners.\n• "Fewer" vs "less" errors are extremely common with countable nouns (e.g., "less people" is wrong; "fewer people" is correct).\n• Collective nouns can take either singular or plural verbs depending on whether the group acts as one unit or as individuals — context decides, not a fixed rule.\n• In analogy and classification questions, do not pick the option that merely sounds thematically related; it must match the exact abstract relationship or shared property.\n• Homophones and near-homophones (its/it\'s, their/there/they\'re, affect/effect) are tested far more often than obscure vocabulary — prioritize these in last-minute revision.';


window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-data-spatial';}).theory.deep = 'GROWTH RATE COMPARISON WITHOUT FULL DIVISION\n• To compare which of two quantities grew faster between two years, compare (new-old)/old as fractions using cross-multiplication instead of computing decimal percentages: A grew faster than B if (newA-oldA) x oldB > (newB-oldB) x oldA.\n• Approximate percentage change fast by rounding to the nearest convenient fraction: a rise from 240 to 288 is 48/240 = 1/5 = 20%, spotted instantly by noticing 48 is exactly one-fifth of 240.\n• When comparing many years/categories at once (as in a bar chart), rank by eyeballing bar-height ratios first, and only compute exact percentages for the top 2-3 contenders that look close.\n• FAST ROUTE: cross-multiply the two differences-over-bases instead of converting both to decimals. SLOW ROUTE: computing each percentage to two decimal places and then comparing.\n• CAGR shortcut: for a compounding growth from V0 to Vn over n years, CAGR = (Vn/V0)^(1/n) - 1; for quick estimation, use the rule that doubling in n years corresponds roughly to CAGR = 70/n percent (rule of 70).\n\nPIE CHART TO VALUE CONVERSION\n• A pie chart\'s degree measure and percentage measure are directly proportional: 3.6 degrees = 1% (since 360 degrees = 100%).\n• To convert a slice\'s degrees to its actual value: value = (degrees/360) x total, or equivalently (percentage/100) x total.\n• Fast common angle-to-percent conversions: 36 degrees = 10%, 72 degrees = 20%, 90 degrees = 25%, 108 degrees = 30%, 144 degrees = 40%, 180 degrees = 50%.\n• When comparing two pie slices directly, skip computing absolute values and just compare degree measures or percentages directly, since the total cancels out in a ratio.\n• FAST ROUTE: memorize the degree-to-percent anchors above and read off values instantly. SLOW ROUTE: converting every slice\'s raw degree count through a full division by 360 each time.\n• Example: A pie chart shows total sales of 7200 units, with the "Electronics" slice occupying 108 degrees. FAST: 108 degrees = 30% (since 108/3.6=30), so value = 0.3 x 7200 = 2160. SLOW: compute 108/360 x 7200 as a single long division.\n\nTABLE AND BAR-GRAPH SPEED READING\n• For tables with multiple years/categories, scan for the row/column with the extreme (max/min) value first if the question asks for "highest" or "lowest" — do not compute every cell.\n• For "average" questions across a row or column, use the deviation-from-assumed-mean method: pick a round number close to the values, sum the deviations (which can be negative), and add the average deviation back to the assumed mean, avoiding large-number addition.\n• Ratio-based bar comparisons: when two bars are close in height, estimate the ratio visually (e.g., "roughly 4:5") before computing exact numbers, since GATE DI answer options are usually spaced far enough apart that estimation resolves the choice.\n• FAST ROUTE: use assumed-mean deviation method for averages of large numbers. SLOW ROUTE: adding all raw values directly and dividing by count.\n\nDIRECTION SENSE AND DISTANCE IN SPATIAL DI\n• Combine displacement vectors as in direction-sense reasoning: track net East-West and North-South components separately, then apply Pythagoras only once at the end for straight-line distance.\n• For "shortest distance to return" questions, the answer is always the straight-line (Euclidean) distance from current position to start, not the sum of the path already walked.\n• Recognize common Pythagorean triples to skip square-root calculation: 3-4-5, 6-8-10, 5-12-13, 8-15-17, 7-24-25, 9-12-15.\n• FAST ROUTE: recognize the leg lengths match a known triple and read off the hypotenuse directly. SLOW ROUTE: computing sqrt(a^2+b^2) by hand digit by digit.\n\nCUBE, DICE AND FIGURE-COUNTING SPATIAL FORMULAS\n• For an n x n x n painted cube cut into unit cubes: corners (3 faces) = 8 always; edges (2 faces) = 12(n-2); faces (1 face) = 6(n-2)^2; fully interior (0 faces) = (n-2)^3; total = n^3 (use as a cross-check).\n• Standard dice rule: opposite faces of a normal die always sum to 7 (1-6, 2-5, 3-4) — use this instantly for "which face is opposite" die questions instead of physically rotating the die in your head.\n• Cube net folding: in any straight run of four consecutive squares in a net, the 1st and 3rd squares become opposite faces, and the 2nd and 4th become opposite faces; any square left outside the 4-run pairs with the other leftover square by elimination (since a cube has exactly 3 opposite pairs).\n• Mirror and water images: a mirror image flips left-right (horizontal flip) as if reflected in a vertical mirror; a water image flips top-bottom (vertical flip) as if reflected in a horizontal surface below the figure — do not confuse the two axes.\n• Figure counting (triangles/squares in a complex figure): count systematically by size — first count all smallest unit shapes, then all shapes formed by combining exactly 2 units, then 4 units, etc., rather than trying to spot every shape at once.\n• FAST ROUTE: apply the fixed formula/rule (die opposite-faces-sum-to-7, cube net strip rule) directly. SLOW ROUTE: mentally folding or rotating the figure from scratch every time.\n\nWORKED EXAMPLES: FAST VS SLOW\n1) A pie chart of total expenditure 18000 shows "Rent" at 90 degrees. Find the rent amount. FAST: 90 degrees = 25% (memorized anchor), so rent = 0.25 x 18000 = 4500. SLOW: compute 90/360 x 18000 via long division to get the same 4500.\n2) Sales grew from 1500 in Year 1 to 1800 in Year 2, and from 2000 to 2300 in another product over the same period. Which grew faster in percentage terms? FAST: cross-multiply differences over bases: 300 x 2000 = 600000 vs 300 x 1500 = 450000; since 600000 > 450000, the first product\'s percentage growth (300/1500=20%) beats the second\'s (300/2000=15%) — confirmed without computing either decimal. SLOW: convert both to exact percentages (20% and 15%) via separate divisions, then compare.\n3) A person walks 6 km North, then 8 km East. How far is he from the start? FAST: recognize the 6-8-10 Pythagorean triple, so distance = 10 km instantly. SLOW: compute sqrt(6^2+8^2) = sqrt(36+64) = sqrt(100) step by step.\n\nTIME TRAPS\n• Pie chart degrees and percentages are directly proportional (3.6 degrees per percent) — forgetting this and dividing by 360 every single time wastes precious seconds versus using memorized anchors.\n• When comparing growth rates across categories, do not eyeball absolute differences — a bigger absolute increase can still be a smaller percentage increase if the base is much larger.\n• Mirror image flips horizontally, water image flips vertically — swapping these two is one of the most common spatial-reasoning errors.\n• Die opposite-faces-sum-to-7 applies ONLY to a standard die; some GATE questions explicitly describe a non-standard die, so always check the question\'s given face arrangement first before applying the shortcut.\n• In cube-painting problems, the corner-cube count is always exactly 8 regardless of n — a frequent wrong answer scales this with cube size.\n• For "average" questions over large tabular numbers, always use the assumed-mean deviation shortcut rather than summing large raw numbers directly, to avoid arithmetic slips under time pressure.\n• Distance/direction questions ask for straight-line displacement from start, not total distance walked along the path — a very common misread.';

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-quant';}).questions.push(
  {
    id: 'apti-quant-y1',
    q: 'A shopkeeper marks up the cost price of an article by 30%. He then allows two successive discounts of 10% and 5% on the marked price, after which the final selling price is Rs. 1111.50. Find the cost price of the article, in rupees. (Enter your numerical answer.)',
    options: [],
    answer: 1000,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Chain the three multiplying factors: markup of 30% gives 1.30, and the two successive discounts give 0.90 and 0.95. Net factor = 1.30 x 0.90 x 0.95 = 1.1115. So Selling Price = CP x 1.1115, giving CP = 1111.50 / 1.1115 = 1000. Fast route: never add or subtract the three percentages; multiply the factors in one line and divide the given SP by the combined factor directly to isolate CP.'
  },
  {
    id: 'apti-quant-y2',
    q: 'A alone can finish a job in 10 days and B alone in 20 days. A and B work together for the first 2 days, after which B leaves and C joins A. C is thrice as efficient as B. A and C together finish the remaining work. Find the total number of days taken to complete the entire job. (Enter your numerical answer.)',
    options: [],
    answer: 4.8,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Take total work as 100 units (LCM-friendly). A\'s rate = 10 units/day, B\'s rate = 5 units/day. In the first 2 days together they do (10+5) x 2 = 30 units, leaving 70 units. B leaves and C joins, with C\'s rate = 3 x B\'s rate = 15 units/day, so A and C together do 10 + 15 = 25 units/day. Time for the remaining 70 units = 70/25 = 2.8 days. Total time = 2 + 2.8 = 4.8 days. Fast route: convert everyone to units/day using a convenient total work so every rate is a whole number, then just add and divide.'
  },
  {
    id: 'apti-quant-y3',
    q: 'A boat\'s speed in still water is 15 km/h and the speed of the stream is 3 km/h. The boat travels a certain distance downstream and returns to the starting point, taking a total of 4 hours 30 minutes. Find the one-way downstream distance, in km. (Enter your numerical answer.)',
    options: [],
    answer: 32.4,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Downstream speed = 15 + 3 = 18 km/h, upstream speed = 15 - 3 = 12 km/h. Let the one-way distance be d. Total time = d/18 + d/12 = 4.5 hours. Using LCM 36: 2d/36 + 3d/36 = 5d/36 = 4.5, so d = 4.5 x 36/5 = 32.4 km. Check: 32.4/18 = 1.8 h and 32.4/12 = 2.7 h, summing to 4.5 h, which matches. Fast route: always combine the two fractional times over a common denominator built from the two speeds rather than solving separately.'
  },
  {
    id: 'apti-quant-y4',
    q: 'A bag contains 6 red, 4 blue, and 5 green balls. Two balls are drawn at random without replacement. Find the probability that both balls drawn are of the same colour. (Enter your answer correct to two decimal places.)',
    options: [],
    answer: 0.3,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Total balls = 15, so total ways to pick 2 = C(15,2) = 105. Favourable (same colour) ways = C(6,2) + C(4,2) + C(5,2) = 15 + 6 + 10 = 31. Probability = 31/105 = 0.2952..., which rounds to 0.30. Fast route: compute each same-colour combination separately and add them before dividing once by the total, rather than computing three separate probabilities and adding fractions with different denominators.'
  },
  {
    id: 'apti-quant-y5',
    q: 'The table below shows a company\'s revenue (in Rs. crore) across four quarters of a year:\nQ1 = 240, Q2 = 300, Q3 = 270, Q4 = 330.\nFind the percentage increase in revenue from Q1 to Q4. (Enter your numerical answer.)',
    options: [],
    answer: 37.5,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Percentage increase = (Q4 - Q1)/Q1 x 100 = (330 - 240)/240 x 100 = 90/240 x 100 = 37.5%. Fast route: recognise 90/240 simplifies to 3/8, and 3/8 = 37.5% directly from the standard fraction-to-percentage table, avoiding long division.'
  },
  {
    id: 'apti-quant-y6',
    q: 'A container has 80 litres of pure milk. 20 litres of the milk is withdrawn and replaced with water. This withdraw-and-replace process (withdrawing 20 litres of the mixture and replacing it with water) is repeated once more. How much milk is finally left in the container?',
    options: ['45 litres', '40 litres', '48 litres', '50 litres'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'For repeated dilution, final quantity of the original liquid = Initial x (1 - withdrawn/total)^n, where n is the number of repetitions. Here (1 - 20/80) = 0.75, and after 2 repetitions: 80 x 0.75^2 = 80 x 0.5625 = 45 litres. Fast route: apply the replacement formula directly instead of tracking milk and water quantities separately at each of the two steps.'
  },
  {
    id: 'apti-quant-y7',
    q: 'In how many ways can the letters of the word "MANAGEMENT" be arranged so that all the vowels always come together?',
    options: ['7560', '3780', '15120', '5040'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'MANAGEMENT has 10 letters: M(2), A(2), N(2), G(1), E(2), T(1). The vowels are A, A, E, E (4 vowels); the consonants are M, M, N, N, G, T (6 consonants). Bundle the vowels into one block, giving 7 units to arrange (6 consonants + 1 block) with M and N each repeated twice: 7!/(2!2!) = 5040/4 = 1260. Within the block, the 4 vowels A,A,E,E can be arranged in 4!/(2!2!) = 6 ways. Total = 1260 x 6 = 7560. Fast route: always bundle the "must be together" group into a single unit first, arrange the outer units accounting for repeats, then multiply by the internal arrangements of the bundle.'
  },
  {
    id: 'apti-quant-y8',
    q: 'A shopkeeper allows a discount of 20% on the marked price of an article and still makes a profit of 20%. If the marked price is Rs. 1500, find the cost price.',
    options: ['Rs. 1000', 'Rs. 1100', 'Rs. 960', 'Rs. 1200'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Selling price after discount = 1500 x 0.80 = Rs. 1200. Since this SP still gives a 20% profit on cost price, SP = CP x 1.20, so CP = 1200/1.20 = Rs. 1000. Fast route: compute the actual SP from the marked price and discount first, then divide by the profit factor once to get CP directly, rather than setting up CP as an unknown from the start.'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-logical';}).questions.push(
  {
    id: 'apti-logical-y1',
    q: 'In how many different ways can 4 boys and 4 girls be seated in a row such that boys and girls occupy alternate seats? (Enter your numerical answer.)',
    options: [],
    answer: 1152,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Alternate seating can start with either a boy or a girl in seat 1, giving 2 choices for which gender occupies the odd seats. Once the pattern is fixed, the 4 boys can be arranged among the 4 boy-seats in 4! = 24 ways, and the 4 girls among the 4 girl-seats in 4! = 24 ways, independently. Total arrangements = 2 x 4! x 4! = 2 x 24 x 24 = 1152. Fast route: always multiply by 2 for the starting-gender choice before multiplying the two independent internal arrangements, since forgetting the factor of 2 is the most common slip in alternate-seating counts.'
  },
  {
    id: 'apti-logical-y2',
    q: 'In how many ways can 6 distinct people be seated around a circular table such that two particular persons always sit next to each other? (Enter your numerical answer.)',
    options: [],
    answer: 48,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Treat the two particular persons who must sit together as a single block, leaving 5 units (4 other individuals + 1 block) to arrange around the circle. Circular arrangements of 5 distinct units = (5-1)! = 24. Within the block, the two people can swap places in 2! = 2 ways. Total = 24 x 2 = 48. Fast route: for circular "together" restrictions, always reduce by (n-1)! for the bundled units first, then multiply separately by the internal arrangement of the bundle, exactly as in a linear "together" problem except the outer arrangement uses (n-1)! instead of n!.'
  },
  {
    id: 'apti-logical-y3',
    q: 'A group of 5 friends is to be split into two teams for a game, one team of 2 members and one team of 3 members. In how many distinct ways can this split be made? (Enter your numerical answer.)',
    options: [],
    answer: 10,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Since the two teams have different sizes (2 and 3), simply choosing which 2 friends form the smaller team automatically determines the remaining 3 for the larger team, so no division for identical-group overcounting is needed. Number of ways = C(5,2) = 10. Fast route: whenever the two groups have unequal sizes, compute just one combination (the smaller group is usually easiest) and stop; only divide by 2 for double-counting when both groups are the same size.'
  },
  {
    id: 'apti-logical-y4',
    q: 'Statements: All pens are pencils. Some pencils are erasers. No eraser is a sharpener.\nConclusions:\nI. Some pens are erasers.\nII. No pen is a sharpener.\nIII. Some pencils are not sharpeners.\nWhich of the conclusions logically follow from the statements?',
    options: ['Only III follows', 'Only I and II follow', 'Only II and III follow', 'None of the conclusions follow'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Pens is a subset of pencils, and some pencils overlap with erasers, but that overlap is not guaranteed to include any pens, so conclusion I (some pens are erasers) does not definitely follow. Conclusion II (no pen is a sharpener) fails because only erasers are barred from sharpeners; pencils in general (and hence pens) have no stated relation to sharpeners outside that eraser overlap. Conclusion III does follow: since some pencils are erasers, and no eraser is a sharpener, those specific pencils that are erasers are definitely not sharpeners, which is exactly "some pencils are not sharpeners." This is the classic valid syllogism form (Some A are B, No B are C, therefore Some A are not C). Fast route: chain a valid "Some...No" pair directly into a "Some are not" conclusion, and reject any conclusion that requires an overlap the statements never guarantee.'
  },
  {
    id: 'apti-logical-y5',
    q: 'Pointing to a photograph, Rohan said, "She is the daughter of my grandfather\'s only son." Rohan has no brothers. How is the girl in the photograph related to Rohan?',
    options: ['Sister', 'Daughter', 'Cousin', 'Mother'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Rohan\'s grandfather\'s only son, given that Rohan is the grandson (not the son) of that grandfather and has no brothers, must be Rohan\'s own father, since there is exactly one son of the grandfather in this family line. The girl in the photograph is therefore the daughter of Rohan\'s father, which makes her Rohan\'s sister. Fast route: translate the relation description into "father" or "mother" using the "only son/daughter" clue first, then take one more step to the final relation, rather than trying to hold the whole chain in your head at once.'
  },
  {
    id: 'apti-logical-y6',
    q: 'Two persons P and Q start walking from the same point. P walks 6 km East and then 8 km North. Q walks 8 km West and then 6 km South from the same starting point. What is the straight-line distance between the final positions of P and Q?',
    options: ['14 sqrt(2) km (approx. 19.8 km)', '20 km', '28 km', '10 sqrt(2) km'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Taking the start as the origin with East as positive x and North as positive y: P ends at (6, 8). Q ends at (-8, -6). The horizontal separation is 6 - (-8) = 14, and the vertical separation is 8 - (-6) = 14. Distance = sqrt(14^2 + 14^2) = sqrt(392) = 14 sqrt(2), approximately 19.8 km. Fast route: convert each person\'s path into a single (x,y) coordinate first, then apply Pythagoras once on the two coordinate differences instead of trying to visualise the combined path geometrically.'
  },
  {
    id: 'apti-logical-y7',
    q: 'At what time between 4 o\'clock and 5 o\'clock will the minute hand and the hour hand of a clock be exactly opposite each other (180 degrees apart)?',
    options: ['4:54 and 6/11 minutes', '4:45', '4:50 and 5/11 minutes', '4:59 and 1/11 minutes'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The angle between the hands is |30H - 5.5M| degrees. For opposite hands this angle equals 180. With H = 4: |120 - 5.5M| = 180. Since 120 - 5.5M = -180 gives a negative M before 4 o\'clock (invalid here), take 5.5M - 120 = 180, so 5.5M = 300, giving M = 300/5.5 = 54 and 6/11 minutes. So the hands are opposite at 4:54 and 6/11 minutes. Fast route: set up the single absolute-value equation |30H - 5.5M| = 180 with the known hour, solve for M directly, and pick the root that lies between 0 and 60 minutes.'
  },
  {
    id: 'apti-logical-y8',
    q: 'In a certain code, all members of a city\'s "Elite Chess Club" are required to have won at least one district-level tournament as a condition of membership. Aman has won three district-level tournaments but has never applied to any club. Which of the following can be logically concluded?',
    options: ['Aman must be a member of the Elite Chess Club', 'Aman has won more tournaments than every club member', 'Winning district-level tournaments does not by itself guarantee membership in the Elite Chess Club', 'The Elite Chess Club has a strict limit on total membership'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The statement gives a necessary condition for membership (winning at least one tournament), not a sufficient one, so winning tournaments does not automatically make someone a member; Aman winning three tournaments does not force him into the club, especially since he never applied. Concluding "Aman must be a member" reverses the direction of the conditional, a classic logical trap. The only conclusion that is definitely and directly supported is that satisfying the tournament requirement alone does not guarantee membership. Fast route: whenever a rule is phrased as "all members satisfy X," treat X as necessary-not-sufficient, and reject any conclusion that assumes satisfying X is enough to grant the status.'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-quant';}).questions.push(
  {
    id: 'apti-quant-pyq2015a',
    pyqStyle: true,
    q: 'A sum of Rs. 6300 is divided among P, Q and R in the ratio 2:3:4. Find R\'s share.',
    options: ['Rs. 2100', 'Rs. 2800', 'Rs. 3200', 'Rs. 1800'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The ratio 2:3:4 has 2 + 3 + 4 = 9 total parts, so one part is 6300/9 = 700. R\'s share corresponds to 4 parts: 4 x 700 = Rs. 2800. Fast route: compute R\'s fraction of the whole directly as 4/9 and multiply once: 6300 x 4/9 = 700 x 4 = 2800, skipping the need to find P\'s and Q\'s shares first. A quick check: P = 2 x 700 = 1400 and Q = 3 x 700 = 2100, and 1400 + 2100 + 2800 = 6300, confirming the split. GATE frequently asks for one specific share rather than all three, so isolate that share\'s fraction immediately instead of solving the whole partition.'
  },
  {
    id: 'apti-quant-pyq2016a',
    pyqStyle: true,
    q: 'The population of a town increases by 10% in the first year and decreases by 10% in the second year. What is the net percentage change in population over the two years?',
    options: ['5% increase', 'No net change', '1% decrease', '1% increase'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Successive percentage changes multiply as factors rather than adding: the net factor is 1.10 x 0.90 = 0.99, a 1% decrease overall, not zero. Using the shortcut net% = p + q + pq/100 with p = +10 and q = -10: 10 - 10 + (10)(-10)/100 = 0 - 1 = -1%. Concretely, a population of 100 becomes 110 after the increase, and a 10% decrease on 110 removes 11, leaving 99, which is indeed 1% below the original 100. The trap answer "no net change" assumes equal-and-opposite percentages cancel exactly, which only happens when both changes act on the same fixed base, not sequentially. Fast route: always multiply the two factors first; never assume equal-magnitude opposite percentages return you to the start.'
  },
  {
    id: 'apti-quant-pyq2017a',
    pyqStyle: true,
    q: 'A shopkeeper marks an article at Rs. 1200 and allows a discount of 25%. He still makes a profit of 20% on the cost price. Find the cost price of the article.',
    options: ['Rs. 750', 'Rs. 800', 'Rs. 720', 'Rs. 700'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'The actual selling price after discount is SP = 1200 x (1 - 0.25) = 1200 x 0.75 = Rs. 900. Since this SP represents a 20% profit over cost price, SP = CP x 1.20, so CP = 900/1.20 = Rs. 750. Fast route: compute the real selling price from the marked price and discount factor first, then divide by the profit factor exactly once to isolate CP, instead of setting up CP as an unknown from the start and solving an equation. Verification: 750 x 1.20 = 900, and 900 matches the discounted selling price, confirming consistency. The most common slip is applying the profit percentage to the marked price instead of the cost price.'
  },
  {
    id: 'apti-quant-pyq2018a',
    pyqStyle: true,
    q: 'Two trains of lengths 120 m and 180 m are running on parallel tracks in opposite directions at speeds of 54 km/h and 36 km/h respectively. Find the time taken by the trains to completely cross each other.',
    options: ['12 seconds', '10 seconds', '15 seconds', '9 seconds'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'When two trains move in opposite directions, their speeds add: relative speed = 54 + 36 = 90 km/h. Converting to m/s using the standard factor 5/18: 90 x 5/18 = 25 m/s. To cross each other completely, the trains must together cover the sum of their lengths: 120 + 180 = 300 m. Time = distance/speed = 300/25 = 12 seconds. Fast route: always add speeds for opposite-direction crossing and subtract for same-direction crossing, add the two lengths (never just one), then convert once to m/s using x5/18 before dividing. The frequent error is forgetting to add both train lengths and using just one length instead.'
  },
  {
    id: 'apti-quant-pyq2019a',
    pyqStyle: true,
    q: 'Pipe A can fill a tank in 12 hours and pipe B can fill it in 15 hours, while an outlet pipe C can empty the full tank in 20 hours. If all three pipes are opened together, in how many hours will the tank be filled?',
    options: ['10 hours', '12 hours', '15 hours', '9 hours'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Convert every pipe to a rate per hour: A fills 1/12 per hour, B fills 1/15 per hour, and outlet C empties 1/20 per hour, so C\'s rate is subtracted. Using the LCM of 12, 15, 20 which is 60: A = 5/60, B = 4/60, C = -3/60 per hour. Combined rate = (5 + 4 - 3)/60 = 6/60 = 1/10 per hour, so the tank fills in 10 hours. Fast route: convert every pipe (filling or emptying) into a rate over a common LCM denominator immediately, add filling rates and subtract emptying rates, then invert the final combined fraction once. The common mistake is adding all three rates without flipping the sign on the outlet pipe.'
  },
  {
    id: 'apti-quant-pyq2020a',
    pyqStyle: true,
    q: 'Solution A contains 40% acid and solution B contains 60% acid. How many litres of solution A must be mixed with 5 litres of solution B to obtain a mixture that is 50% acid?',
    options: ['5 litres', '4 litres', '6 litres', '10 litres'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Using the alligation rule, the required ratio of quantities is inversely proportional to the distance of each concentration from the target mean: distance of A from mean = |50 - 40| = 10, distance of B from mean = |60 - 50| = 10, so the ratio A:B = 10:10 = 1:1. Since 5 litres of B is used, an equal 5 litres of A is needed to keep the ratio 1:1. Fast route: write the alligation cross with the mean in the centre, take the two absolute differences as the mixing ratio (swapped diagonally), and read the answer directly without setting up an acid-balance equation. Verification: total acid = 0.40(5) + 0.60(5) = 2 + 3 = 5, total volume = 10, giving 5/10 = 50%, exactly the target.'
  },
  {
    id: 'apti-quant-pyq2020b',
    pyqStyle: true,
    q: 'Find the difference between the compound interest and the simple interest on a principal of Rs. 8000 for 2 years at 5% per annum.',
    options: ['Rs. 20', 'Rs. 40', 'Rs. 16', 'Rs. 25'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'For exactly 2 years, the difference between compound and simple interest has a direct formula: CI - SI = P x (r/100)^2, independent of computing CI and SI separately. Here P = 8000 and r = 5, so CI - SI = 8000 x (0.05)^2 = 8000 x 0.0025 = Rs. 20. Fast route: memorize this 2-year identity and apply it in one step, since deriving CI and SI individually (SI = 800, CI = 8000 x 1.05^2 - 8000 = 820, difference 20) wastes time computing two full quantities to reach the same answer. This shortcut generalizes: for 3 years, CI - SI = P(r/100)^2(3 + r/100), useful whenever a "difference between CI and SI" question appears.'
  },
  {
    id: 'apti-quant-pyq2021a',
    pyqStyle: true,
    q: 'A committee of 5 members is to be formed from 6 men and 4 women such that the committee has at least 3 women. In how many ways can this committee be formed? (Enter your numerical answer.)',
    options: [],
    answer: 66,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: '"At least 3 women" out of 5 seats splits into two mutually exclusive cases: exactly 3 women and 2 men, or exactly 4 women and 1 man (there are only 4 women available, so 5 women is impossible). Case 1: C(4,3) x C(6,2) = 4 x 15 = 60. Case 2: C(4,4) x C(6,1) = 1 x 6 = 6. Total = 60 + 6 = 66. Fast route: whenever a constraint says "at least k," partition into the individually clean cases (exactly k, exactly k+1, ...) up to the maximum available, compute each case as an independent combination product, and add across cases rather than trying to subtract from the complement, which is more error-prone here since "at most 2 women" would still need multiple sub-cases.'
  },
  {
    id: 'apti-quant-pyq2022a',
    pyqStyle: true,
    q: 'A bag contains 5 red, 4 blue and 3 green balls. Two balls are drawn at random without replacement. What is the probability that both balls drawn are red?',
    options: ['5/33', '1/6', '5/22', '2/11'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Total balls = 5 + 4 + 3 = 12, so the total number of ways to choose 2 balls is C(12,2) = 66. The number of favourable ways to choose 2 red balls out of 5 is C(5,2) = 10. Probability = 10/66, which simplifies by dividing both by 2 to 5/33. Fast route: for "without replacement, both same colour" questions, always compute C(favourable, 2)/C(total, 2) directly rather than multiplying two shrinking fractions (5/12 x 4/11 = 20/132 = 5/33, same answer but combinations are quicker to set up and simplify). The trap answer 5/22 comes from an incorrect denominator, and 1/6 comes from ignoring that the balls are drawn without replacement.'
  },
  {
    id: 'apti-quant-pyq2022b',
    pyqStyle: true,
    q: 'The radius of a cylinder is increased by 20% and its height is decreased by 20%. Find the percentage change in its volume.',
    options: ['15.2% increase', '4% decrease', '20% increase', 'No change'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Cylinder volume V = pi r^2 h depends on the radius squared but on height only linearly, so the two percentage changes are not symmetric. The new volume factor is (1.20)^2 x (0.80) = 1.44 x 0.80 = 1.152, a 15.2% increase. Fast route: apply each percentage change as its own multiplying factor, squaring the factor for any dimension that appears squared in the formula, then multiply all factors together and subtract 1 to get the net percentage change; never assume that a matching percentage increase and decrease on different dimensions cancel out, since the exponents differ. The trap answer "no change" assumes r and h changes offset because the percentages look equal in magnitude, which ignores that radius contributes quadratically.'
  },
  {
    id: 'apti-quant-pyq2023a',
    pyqStyle: true,
    q: 'Find the remainder when 2^100 is divided by 7. (Enter your numerical answer.)',
    options: [],
    answer: 2,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Powers of 2 modulo 7 cycle with a short period: 2^1 = 2, 2^2 = 4, 2^3 = 1 (mod 7), and then the pattern 2, 4, 1 repeats every 3 powers. Since the cycle length is 3, reduce the exponent 100 modulo 3: 100 = 3 x 33 + 1, so 2^100 has the same remainder as 2^1, which is 2. Fast route: for "remainder of a^n mod m" questions, compute successive powers of a mod m only until the remainder repeats (rarely more than a handful of steps), note the cycle length, then reduce the exponent modulo that cycle length instead of computing the full power directly.'
  },
  {
    id: 'apti-quant-pyq2023b',
    pyqStyle: true,
    q: 'A can complete a piece of work in 18 days. B is twice as efficient as A. If A and B work together, in how many days will the work be completed? (Enter your numerical answer.)',
    options: [],
    answer: 6,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'A\'s rate of work is 1/18 per day. Since B is twice as efficient as A, B\'s rate is twice A\'s rate: 2/18 = 1/9 per day. Working together, the combined rate is 1/18 + 2/18 = 3/18 = 1/6 per day, so the work is completed in 6 days. Fast route: convert an "efficiency multiple" statement directly into a rate multiple (twice as efficient means twice the rate, not half the time relative to a wrong reference), add the two rates over a common denominator, then invert once. A common slip is halving A\'s time instead of doubling A\'s rate relative to A itself, which gives the same answer here but breaks down when the multiple is not a simple doubling.'
  },
  {
    id: 'apti-quant-pyq2024a',
    pyqStyle: true,
    q: 'The speed of a boat in still water is 15 km/h and the speed of the stream is 5 km/h. Find the total time taken by the boat to travel 60 km downstream and then return 60 km upstream to the starting point.',
    options: ['9 hours', '8 hours', '10 hours', '7.5 hours'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Downstream speed = boat speed + stream speed = 15 + 5 = 20 km/h, and upstream speed = boat speed - stream speed = 15 - 5 = 10 km/h. Time downstream = 60/20 = 3 hours, and time upstream = 60/10 = 6 hours. Total time = 3 + 6 = 9 hours. Fast route: compute the two effective speeds first by adding and subtracting the stream speed from the boat speed, then find each leg\'s time separately and add them; never average the two speeds and divide the total distance by that average, since downstream and upstream take unequal times for the same distance. A quick sanity check: the upstream leg naturally takes longer than the downstream leg since the boat fights the current, and 6 hours upstream versus 3 hours downstream reflects exactly that.'
  },
  {
    id: 'apti-quant-pyq2024b',
    pyqStyle: true,
    q: 'How many distinct arrangements can be made using all the letters of the word "STATISTICS"? (Enter your numerical answer.)',
    options: [],
    answer: 50400,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'STATISTICS has 10 letters with repetitions: S appears 3 times, T appears 3 times, I appears 2 times, A appears once, and C appears once (3 + 3 + 2 + 1 + 1 = 10). The number of distinct arrangements of a multiset is n! divided by the factorial of each repeated letter\'s count: 10!/(3! x 3! x 2!) = 3628800/(6 x 6 x 2) = 3628800/72 = 50400. Fast route: always write out the letter-frequency count first before touching factorials, since misidentifying even one repeated letter (for example, missing that both S and T repeat three times each) changes the denominator and gives a wrong final count. Cross-check that all the frequency counts sum to the total letter count as a safeguard before finalizing the division.'
  },
  {
    id: 'apti-quant-pyq2025a',
    pyqStyle: true,
    q: 'Two fair dice are thrown together. What is the probability that the sum of the numbers appearing on them is a multiple of 4? (Enter your numerical answer as a decimal.)',
    options: [],
    answer: 0.25,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'The total number of equally likely outcomes when two dice are thrown is 6 x 6 = 36. The sums that are multiples of 4 within the possible range 2 to 12 are 4, 8 and 12. Sum = 4 arises from (1,3),(2,2),(3,1): 3 ways. Sum = 8 arises from (2,6),(3,5),(4,4),(5,3),(6,2): 5 ways. Sum = 12 arises from (6,6) only: 1 way. Total favourable outcomes = 3 + 5 + 1 = 9. Probability = 9/36 = 0.25. Fast route: list only the sums that satisfy the target condition within the valid range, count each sum\'s outcome combinations using the standard triangular pattern for two-dice sums (sums closer to 7 have more combinations), and add before dividing by 36, rather than enumerating all 36 outcomes individually.'
  },
  {
    id: 'apti-quant-pyq2026a',
    pyqStyle: true,
    q: 'A shopkeeper marks his goods 40% above the cost price and then offers two successive discounts of 10% and 5%. Find his overall profit percentage.',
    options: ['19.7% profit', '20% profit', '15% profit', '25% profit'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Starting from cost price, the marked price factor is 1.40. Applying two successive discounts of 10% and 5% multiplies by 0.90 and then 0.95. The overall factor from cost price to final selling price is 1.40 x 0.90 x 0.95 = 1.40 x 0.855 = 1.197, which is a 19.7% profit. Fast route: chain every markup and every successive discount as its own multiplying factor in one continuous product, evaluate the full product once, and read the profit or loss percentage directly from how far the final factor is from 1; never add or subtract the individual percentages (40 - 10 - 5 = 25% is the trap answer here), since only multiplication of factors correctly captures compounding percentage changes.'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-logical';}).questions.push(
  {
    id: 'apti-logical-pyq2015a',
    pyqStyle: true,
    q: 'Find the next term in the series: 3, 8, 15, 24, 35, ? (Enter your numerical answer.)',
    options: [],
    answer: 48,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'The differences between consecutive terms are 8-3=5, 15-8=7, 24-15=9, 35-24=11, which form their own arithmetic series increasing by 2 each time (5, 7, 9, 11). The next difference must therefore be 13, so the next term is 35 + 13 = 48. Fast route: whenever a series does not have a constant common difference, compute the sequence of first differences and check if that sequence itself is arithmetic (constant second difference); here the second difference is a steady +2, confirming the pattern and letting you extend it in one extra step without guessing.'
  },
  {
    id: 'apti-logical-pyq2016a',
    pyqStyle: true,
    q: 'Choose the word that best completes the analogy: Book is to Author as Painting is to ?',
    options: ['Canvas', 'Painter', 'Frame', 'Gallery'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The relationship in "Book is to Author" is creator-to-creation: an Author creates a Book. Applying the same creator-to-creation relationship to a Painting, the creator is the Painter. Canvas is only the physical material the painting is made on (analogous to paper, not the author), Frame is a decorative accessory, and Gallery is merely a place of display, none of which parallel the "creator" role that Author holds for Book. Fast route: state the abstract relationship in the given pair first in words ("X creates Y" here), then apply that exact same abstract relationship to the second pair rather than looking for any loosely associated word.'
  },
  {
    id: 'apti-logical-pyq2017a',
    pyqStyle: true,
    q: 'Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?',
    options: ['Mother', 'Sister', 'Aunt', 'Daughter'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: '"The only daughter of my mother" describes the woman herself, since she is the only daughter of her own mother. So the statement reduces to "his mother is [the woman]," meaning the woman is directly the man\'s mother. Fast route: whenever a relation is phrased as "the only [relation] of my [relation]," first check whether it collapses to describe the speaker themself (as "only daughter of my mother" always does for a female speaker), which usually shortens a seemingly multi-step puzzle into a single direct relation.'
  },
  {
    id: 'apti-logical-pyq2018a',
    pyqStyle: true,
    q: 'A man starts walking from a point and goes 5 km North. He then turns right and walks 3 km, and turns right again and walks 5 km. How far is he from his starting point, and in which direction?',
    options: ['3 km, East', '5 km, North', '8 km, East', '3 km, West'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Track the position using coordinates with East as positive x and North as positive y, starting at (0,0). Walking 5 km North gives (0,5). Facing North and turning right means now facing East; walking 3 km gives (3,5). Facing East and turning right again means now facing South; walking 5 km gives (3,0). The final position (3,0) is exactly 3 km East of the origin (0,0), since the North and South legs of 5 km each cancel out. Fast route: convert each leg of the walk into a coordinate shift immediately using a fixed East-North axis convention, and notice when two legs are equal and opposite (the 5 km North and 5 km South here) so they can be cancelled by inspection before computing the final distance.'
  },
  {
    id: 'apti-logical-pyq2019a',
    pyqStyle: true,
    q: 'Five friends A, B, C, D and E are sitting in a row facing North. B is immediately to the right of A. D is immediately to the left of C. E is sitting at one of the two ends. C is second from the left end. Who is sitting at the left end?',
    options: ['D', 'A', 'E', 'C'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Number the seats 1 to 5 from the left. C is second from the left end, so C occupies seat 2. D is immediately to the left of C, so D occupies seat 1. Since seat 1 is already taken by D, and E must sit at one of the two ends, E must occupy the other end, seat 5. The remaining people A and B fill seats 3 and 4, and since B is immediately to the right of A, A occupies seat 3 and B occupies seat 4. The final row is D, C, A, B, E, so the left end (seat 1) is occupied by D. Fast route: fix the most specific clue first (C is second from left, an exact position) before applying relative clues (immediately left of, immediately right of), since exact-position clues anchor the whole row and let relative clues snap into place with no trial and error.'
  },
  {
    id: 'apti-logical-pyq2020a',
    pyqStyle: true,
    q: 'Statements: Some doctors are engineers. All engineers are teachers.\nConclusions:\nI. Some doctors are teachers.\nII. All teachers are engineers.\nWhich of the conclusions logically follow from the statements?',
    options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither I nor II follows'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'From "Some doctors are engineers" and "All engineers are teachers," the doctors who are engineers must also be teachers (since every engineer is a teacher), so "Some doctors are teachers" follows validly. This is the standard "Some A are B, All B are C, therefore Some A are C" syllogism form. Conclusion II reverses the universal statement: "All engineers are teachers" does not imply "All teachers are engineers," since there could be teachers who are not engineers at all; this is the classic converse error. Fast route: chain a "Some...All" pair directly into a "Some...are" conclusion about the outer categories, and always reject any conclusion that reverses the direction of a given "All A are B" statement into "All B are A."'
  },
  {
    id: 'apti-logical-pyq2021a',
    pyqStyle: true,
    q: 'A cube is painted red on all its faces and then cut into 64 smaller cubes of equal size (a 4 x 4 x 4 arrangement). How many of the smaller cubes have exactly two faces painted red? (Enter your numerical answer.)',
    options: [],
    answer: 24,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'For an n x n x n painted cube cut into unit cubes, the cubes with exactly two painted faces lie along the edges of the big cube, excluding the corners, and their count is 12(n-2), where 12 is the number of edges of a cube and each edge contributes (n-2) such cubes after removing the two corner cubes at its ends. Here n = 4, so the count is 12 x (4-2) = 12 x 2 = 24. Fast route: memorize the fixed census for a painted n-cube (corners = 8 always, edges = 12(n-2), faces = 6(n-2)^2, interior = (n-2)^3) and simply substitute n, rather than trying to visualize or count the 4x4x4 cube face by face; as a check, the four counts should sum to n^3 = 64, and indeed 8 + 24 + 24 + 8 = 64.'
  },
  {
    id: 'apti-logical-pyq2022a',
    pyqStyle: true,
    q: 'At what time between 3 o\'clock and 4 o\'clock (other than exactly 3:00) will the minute hand and hour hand of a clock first be at right angles (90 degrees apart)?',
    options: ['3:32 and 8/11 minutes', '3:27', '3:16 and 4/11 minutes', '3:00'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The angle between the hour and minute hands is given by |30H - 5.5M| degrees, where H is the hour and M is minutes past the hour. At exactly 3:00, the angle is |90 - 0| = 90 degrees, which is already a right angle, but the question asks for the next such instance after 3:00. Setting |90 - 5.5M| = 90 for M > 0 gives 5.5M - 90 = 90 (the other branch, since 90 - 5.5M = 90 only gives M = 0), so 5.5M = 180 and M = 180/5.5 = 32 and 8/11 minutes. Fast route: recognize that "on the hour" positions like 3:00 often already satisfy angle conditions trivially, so explicitly solve for the next non-trivial root of the absolute-value equation rather than accepting the hour mark itself as the answer.'
  },
  {
    id: 'apti-logical-pyq2023a',
    pyqStyle: true,
    q: '1st January 2023 was a Sunday. What day of the week was 1st January 2024? (2023 is not a leap year.)',
    options: ['Monday', 'Tuesday', 'Sunday', 'Wednesday'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Since 2023 is not a leap year, it has exactly 365 days. Dividing 365 by 7 gives a remainder of 1 (365 = 7 x 52 + 1), so the day of the week advances by exactly 1 day over a non-leap year. Starting from Sunday on 1st January 2023, adding 1 day gives Monday for 1st January 2024. Fast route: for consecutive-year day-of-week questions, skip counting actual dates and instead use the fixed odd-days rule: a non-leap year always shifts the weekday by 1 day, and a leap year (when the intervening 29th February is crossed) always shifts it by 2 days.'
  },
  {
    id: 'apti-logical-pyq2023b',
    pyqStyle: true,
    q: 'Find the missing term in the series: B, D, G, K, P, ?',
    options: ['V', 'U', 'W', 'T'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Converting each letter to its position in the alphabet: B=2, D=4, G=7, K=11, P=16. The differences between consecutive positions are 2, 3, 4, 5, increasing by 1 each time, so the next difference should be 6, giving the next position as 16 + 6 = 22, which corresponds to the letter V. Fast route: convert a letter series into its numeric alphabet positions first, then look for the same kind of arithmetic or increasing-difference pattern used in pure number series, since letter series on GATE almost always reduce to a disguised number series once converted.'
  },
  {
    id: 'apti-logical-pyq2024a',
    pyqStyle: true,
    q: 'Pointing to a boy, a girl said, "He is the son of the only son of my grandfather." How is the boy related to the girl?',
    options: ['Brother', 'Cousin', 'Nephew', 'Son'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'The "only son of my grandfather" is the girl\'s own father, since he is the single son of her grandfather and she is his child. The boy is described as the son of this only son, meaning the boy is the son of the girl\'s father, which makes the boy the girl\'s brother. Fast route: resolve the innermost nested relation first ("only son of my grandfather" reduces to "my father"), substitute that resolved relation back into the full sentence, and then take just the final remaining step, rather than trying to hold the entire nested chain in mind simultaneously.'
  },
  {
    id: 'apti-logical-pyq2024b',
    pyqStyle: true,
    q: 'A person walks 8 m towards South, then turns left and walks 6 m, then turns left again and walks 8 m. What is the distance, in metres, between his final position and his starting point? (Enter your numerical answer.)',
    options: [],
    answer: 6,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Track the walk on coordinates starting at (0,0), with East as positive x and North as positive y. Facing South and walking 8 m gives (0,-8). Facing South and turning left means now facing East; walking 6 m gives (6,-8). Facing East and turning left again means now facing North; walking 8 m gives (6,-8+8) = (6,0). The final position (6,0) is exactly 6 m from the origin (0,0) along the East direction, since the 8 m South and 8 m North legs are equal and opposite and cancel exactly. Fast route: convert each leg into a coordinate shift as it happens, and whenever two legs in the same axis are numerically equal and opposite in direction, cancel them immediately by inspection instead of carrying both through to a final Pythagorean calculation.'
  },
  {
    id: 'apti-logical-pyq2025a',
    pyqStyle: true,
    q: 'Statements: All fruits are sweet. No sweet thing is bitter.\nConclusion: No fruit is bitter.\nIs this conclusion logically valid?',
    options: ['Valid, it follows directly', 'Invalid, it needs an additional premise', 'Valid only if at least one fruit exists', 'Invalid, this is a converse error'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'This is the standard "All A are B, No B are C, therefore No A are C" syllogism form. Since all fruits (A) are sweet (B), and no sweet thing (B) is bitter (C), every fruit is automatically excluded from being bitter, because fruits fall entirely inside the sweet category, which has no overlap with bitter at all. The conclusion "No fruit is bitter" follows directly and validly, with no additional premise or existential assumption required, since a universal "All A are B" statement combined with a universal "No B are C" statement produces a universal "No A are C" without needing to assume any A actually exists. Fast route: memorize this specific AEE-1 syllogism pattern (All...No...therefore No) as automatically valid, so it can be recognized instantly rather than re-derived with a truth diagram each time.'
  },
  {
    id: 'apti-logical-pyq2025b',
    pyqStyle: true,
    q: 'Three distinct dice, each numbered 1 to 6, are thrown together. In how many ways can the numbers shown add up to a total of 10? (Enter your numerical answer.)',
    options: [],
    answer: 27,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'We need the number of ordered triples (x, y, z), each between 1 and 6 inclusive, with x + y + z = 10. Listing by the smallest value or using inclusion-exclusion on the stars-and-bars count for three dice, the total comes out to 27 ordered triples; this matches the well-known symmetric peak of the three-dice sum distribution, where sums of 10 and 11 are tied for the most frequent outcomes out of the 216 total equally likely triples. Fast route: for three-dice sum-count questions, recall or quickly rebuild the standard 3-dice frequency table (sums 3 and 18 have 1 way each, rising smoothly to a peak of 27 ways at both sums 10 and 11, then falling symmetrically), rather than manually enumerating every ordered triple from scratch.'
  },
  {
    id: 'apti-logical-pyq2026a',
    pyqStyle: true,
    q: 'Which of the following numbers does not belong with the others: 8, 27, 64, 100, 125?',
    options: ['100', '64', '125', '27'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The numbers 8, 27, 64 and 125 are all perfect cubes: 8 = 2^3, 27 = 3^3, 64 = 4^3, and 125 = 5^3. The number 100 is not a perfect cube (it is a perfect square, 10^2, and the nearest cubes to it are 64 = 4^3 and 125 = 5^3), so it is the one number that breaks the pattern shared by all the others. Fast route: for "odd one out" number sets, first test whether all the numbers share a common property such as being perfect squares, perfect cubes, primes, or members of a specific series, by quickly checking a few candidates against small known powers, rather than searching for a relationship among all five numbers simultaneously.'
  },
  {
    id: 'apti-logical-pyq2026b',
    pyqStyle: true,
    q: 'A man walks 10 m East, then turns and walks 10 m North, then turns and walks 10 m West. How far, in metres, is he from his starting point? (Enter your numerical answer.)',
    options: [],
    answer: 10,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Track the walk on coordinates starting at (0,0), East as positive x and North as positive y. Walking 10 m East gives (10,0). Walking 10 m North gives (10,10). Walking 10 m West gives (0,10). The final position (0,10) is exactly 10 m from the origin (0,0), directly to the North, since the 10 m East and 10 m West legs are equal and opposite and cancel exactly, leaving only the North leg as the net displacement. Fast route: track coordinates leg by leg, and whenever an East leg and a West leg (or a North leg and a South leg) are numerically equal, cross them out immediately rather than computing a full Pythagorean distance that is not actually needed here.'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-verbal';}).questions.push(
  {
    id: 'apti-verbal-pyq2015a',
    pyqStyle: true,
    q: 'Choose the most appropriate word to fill the blank: Despite his ______ efforts, he could not complete the project on time.',
    options: ['diligent', 'diligence', 'diligently', 'dilated'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The blank sits directly before the noun "efforts," so it must be filled by an adjective that modifies that noun. "Diligent" is the adjective form (meaning careful and persistent), correctly describing the noun "efforts." "Diligence" is a noun and cannot modify another noun in this slot, "diligently" is an adverb and would need to modify a verb rather than a noun, and "dilated" is an unrelated word (meaning widened) that does not fit the meaning at all. Fast route: identify the part of speech required by the surrounding grammar first (adjective before a noun, adverb before a verb) and eliminate every option that is the wrong part of speech before even considering meaning.'
  },
  {
    id: 'apti-verbal-pyq2016a',
    pyqStyle: true,
    q: 'Identify the part of the sentence that contains a grammatical error: "Neither the manager nor the employees (A) / was informed (B) / about the sudden change (C) / in the schedule (D)."',
    options: ['A', 'B', 'C', 'D'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'With "neither...nor" joining a singular subject (the manager) and a plural subject (the employees), the verb must agree with whichever subject is closer to it, which here is "the employees" (plural). The verb should therefore be "were informed," not "was informed," making part B the error. Parts A, C and D are grammatically fine as written. Fast route: for "neither...nor" or "either...or" subject pairs, always check agreement against the second (nearer) subject only, ignoring the first subject\'s number entirely when deciding singular versus plural verb form.'
  },
  {
    id: 'apti-verbal-pyq2017a',
    pyqStyle: true,
    q: 'What does the idiom "to let the cat out of the bag" mean?',
    options: ['To reveal a secret unintentionally', 'To adopt a pet', 'To escape from danger', 'To create confusion deliberately'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The idiom "to let the cat out of the bag" means to accidentally reveal a secret or piece of information that was supposed to remain hidden. It has nothing to do with literal cats or pets; the phrase originates from old market trickery involving sacks and animals but has become fixed as an idiom purely about unintended disclosure. Fast route: idiom-meaning questions cannot be solved by literal word analysis, so if an idiom is recognized as a standard fixed phrase, recall its conventional dictionary meaning directly rather than trying to reason from the individual words like "cat" or "bag."'
  },
  {
    id: 'apti-verbal-pyq2018a',
    pyqStyle: true,
    q: 'Arrange the following sentences (P, Q, R, S) in a logical order to form a coherent paragraph:\nP. Then, gradually, industries began adopting automation.\nQ. Automation initially faced resistance from workers who feared job losses.\nR. In the early twentieth century, manual labour dominated most industries.\nS. Today, automation is central to almost every manufacturing process.',
    options: ['RPQS', 'RQPS', 'PRQS', 'SRPQ'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'The paragraph follows a clear chronological progression. R sets the historical starting point (manual labour dominating industries in the early twentieth century). P then introduces the shift as industries began adopting automation. Q describes the resistance that this automation initially faced from workers. S concludes with the present-day state, where automation has become central. This gives the order R, P, Q, S. Fast route: scan the sentences for time markers and connecting words first ("then," "initially," "today") since these words almost always signal the intended chronological or logical sequence, letting you place the sentence with "today" last and the one establishing historical background first without testing every permutation.'
  },
  {
    id: 'apti-verbal-pyq2019a',
    pyqStyle: true,
    q: 'The government has announced free Wi-Fi in all public parks to encourage outdoor activity among youth. Which of the following is an assumption implicit in this statement?',
    options: ['Youth do not currently use public parks much due to lack of internet access there', 'Free Wi-Fi will improve government revenue', 'Parks lack proper seating arrangements', 'Youth prefer indoor activities over outdoor ones'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'An assumption is an unstated belief that must be true for the stated action to make sense as a solution. The government\'s plan (adding Wi-Fi to parks to boost outdoor activity) only makes logical sense if it assumes that the current lack of internet access in parks is at least part of why youth avoid parks or outdoor activity; otherwise adding Wi-Fi would not plausibly increase outdoor activity at all. The other options either introduce unrelated goals (revenue), unrelated deficiencies (seating), or an assumption that would actually work against the plan\'s logic (option D would suggest Wi-Fi in parks does not help since youth prefer being indoors anyway). Fast route: to test if a statement is a valid assumption, negate it and check whether the original argument or plan would then fall apart; negating option A ("youth already have full internet access in parks") makes the free-Wi-Fi plan pointless, confirming it is the necessary assumption.'
  },
  {
    id: 'apti-verbal-pyq2020a',
    pyqStyle: true,
    q: 'Choose the most appropriate word to fill the blank: The scientist\'s theory was so ______ that even experts in the field struggled to understand it.',
    options: ['esoteric', 'elementary', 'extroverted', 'eloquent'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: '"Esoteric" means intended for or understood by only a small, specialized group, which fits perfectly with a theory so difficult that even experts struggled with it. "Elementary" means simple or basic, which directly contradicts the idea of experts struggling to understand it. "Extroverted" describes a personality trait unrelated to the difficulty of a theory, and "eloquent" describes fluent, persuasive expression rather than conceptual difficulty. Fast route: for vocabulary-in-context blanks, first identify the logical direction implied by the sentence (here, a signal of difficulty and specialization from "even experts...struggled"), then pick the option whose core meaning matches that direction, discarding words that are merely thematically related but point the wrong way (like "elementary," which is the opposite direction).'
  },
  {
    id: 'apti-verbal-pyq2020b',
    pyqStyle: true,
    q: 'Choose the grammatically correct sentence.',
    options: ['Each of the students has submitted his or her assignment.', 'Each of the students have submitted his assignment.', 'Each of the student have submit their assignment.', 'Each of the students has submit their assignment.'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: '"Each" is a singular indefinite pronoun and always takes a singular verb, regardless of the plural noun phrase that follows it ("of the students"). The correct verb form is therefore "has," not "have." The subject-verb pair must also agree in tense and form: "has submitted" (present perfect, singular) is fully correct, and pairing it with the gender-neutral "his or her" correctly matches the singular subject "each." The other options either use the plural verb "have" incorrectly, use the wrong noun form "student" instead of "students," or use incorrect verb forms like "submit" instead of "submitted." Fast route: treat "each," "every," "either," and "neither" as always singular for verb agreement purposes, no matter what plural phrase follows them, and check the rest of the sentence only after this agreement rule is satisfied.'
  },
  {
    id: 'apti-verbal-pyq2021a',
    pyqStyle: true,
    q: 'What does the idiom "once in a blue moon" mean?',
    options: ['Very rarely', 'Every month', 'Very frequently', 'During the night'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The idiom "once in a blue moon" refers to an event that happens very rarely or almost never, drawing on the rare astronomical occurrence of a second full moon within a single calendar month, which is uncommon and irregular. It has no literal connection to actual moon color or monthly frequency in everyday usage. Fast route: recognize idioms as fixed units of meaning learned as vocabulary rather than analyzed compositionally; "blue moon" specifically is a well-known idiom for rarity and should be recalled directly rather than reasoned out from its individual words.'
  },
  {
    id: 'apti-verbal-pyq2022a',
    pyqStyle: true,
    q: 'All members of the cycling club own bicycles. Rohit owns a bicycle. Which of the following can be validly inferred from these two statements?',
    options: ['Rohit may or may not be a member of the cycling club', 'Rohit is definitely a member of the cycling club', 'Rohit owns more than one bicycle', 'All bicycle owners are club members'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The first statement establishes that club membership implies bicycle ownership (all club members own bicycles), but it does not establish the reverse: that owning a bicycle implies club membership. Rohit owning a bicycle is consistent with being a club member, but it is equally consistent with him owning a bicycle for reasons entirely unrelated to any club. Since the statements never assert that only club members own bicycles, no definite conclusion about Rohit\'s membership can be drawn either way. Fast route: when a statement is phrased as "all A are B," never treat "X is B" as proof that "X is A," since that reverses the direction of a one-way implication; the only valid inference from "X is B" alone is that X\'s status regarding A remains genuinely undetermined.'
  },
  {
    id: 'apti-verbal-pyq2022b',
    pyqStyle: true,
    q: 'Arrange the following sentences (P, Q, R, S) in a logical order:\nP. As a result, several nations have set ambitious targets for solar and wind capacity.\nQ. Fossil fuel reserves are finite and their combustion contributes heavily to global warming.\nR. Renewable energy sources, in contrast, offer a sustainable alternative.\nS. These targets, if met, could significantly reduce global carbon emissions.',
    options: ['QRPS', 'RQPS', 'QPRS', 'PQRS'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Q opens by stating the core problem with fossil fuels (finite reserves, global warming). R then contrasts this problem with renewable energy as a sustainable alternative, using the explicit contrast marker "in contrast." P follows with the consequence of that shift, that nations have set targets for solar and wind. S closes by describing what those targets could achieve if met. This gives the order Q, R, P, S. Fast route: look for explicit connector words such as "as a result," "in contrast," and "these targets" (which refers back to something named earlier), since these connectors reveal which sentence must directly follow which, letting you chain the paragraph together without brute-force testing every ordering.'
  },
  {
    id: 'apti-verbal-pyq2023a',
    pyqStyle: true,
    q: 'Choose the most appropriate word to fill the blank: The committee members could not reach a consensus, as their opinions were entirely ______.',
    options: ['divergent', 'convergent', 'congruent', 'identical'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: '"Divergent" means differing or moving apart, which logically explains why the committee could not reach a consensus: their opinions were too different from one another. "Convergent," "congruent," and "identical" all describe opinions that agree or are the same, which would make reaching a consensus easy rather than impossible, directly contradicting the sentence\'s stated outcome. Fast route: identify the logical relationship the sentence sets up (here, "could not reach a consensus" signals a cause of disagreement or difference) and eliminate every option whose meaning implies agreement or similarity before considering only words meaning difference or opposition.'
  },
  {
    id: 'apti-verbal-pyq2023b',
    pyqStyle: true,
    q: 'Identify the part of the sentence that contains a grammatical error: "The number of accidents on this highway (A) / have increased dramatically (B) / over the past few years (C) / due to reckless driving (D)."',
    options: ['A', 'B', 'C', 'D'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The subject of the sentence is "the number," which is a singular noun phrase, even though it is followed by the plural "of accidents." Since "the number of X" always takes a singular verb (unlike "a number of X," which takes a plural verb), the verb should be "has increased," not "have increased," making part B the error. Parts A, C, and D contain no grammatical faults. Fast route: distinguish "the number of" (always singular verb) from "a number of" (always plural verb) as a fixed rule, and apply it immediately whenever either phrase appears as a sentence\'s subject, without needing to analyze the rest of the sentence\'s grammar.'
  },
  {
    id: 'apti-verbal-pyq2024a',
    pyqStyle: true,
    q: 'All the participants who scored above 90% in the mock test were selected for the advanced batch. Priya was not selected for the advanced batch. What can be validly concluded?',
    options: ['Priya did not score above 90% in the mock test', 'Priya scored above 90% in the mock test', 'Priya did not take the mock test', 'The mock test had no cutoff score'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The first statement is a conditional: scoring above 90% guarantees selection. Priya\'s non-selection is the logical contrapositive situation: if she had scored above 90%, she would have been selected, but she was not selected, so she cannot have scored above 90%. This is a valid application of the contrapositive of "if P then Q" being "if not Q then not P." The other options either assert the opposite of what is logically forced (option B), introduce information not given at all (option C), or contradict the premise itself (option D, since a cutoff of 90% is explicitly implied). Fast route: whenever a statement gives "if condition then outcome" and you are told the outcome did not happen, apply the contrapositive directly to conclude the condition did not happen either, rather than treating the missing outcome as inconclusive.'
  },
  {
    id: 'apti-verbal-pyq2024b',
    pyqStyle: true,
    q: 'What does the idiom "to burn the midnight oil" mean?',
    options: ['To work late into the night', 'To waste resources carelessly', 'To start a fire accidentally', 'To finish work well ahead of time'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The idiom "to burn the midnight oil" means to work or study late into the night, originating from the historical practice of using oil lamps to work after dark before electric lighting existed. It carries a positive connotation of diligence and hard work, not carelessness, accidents, or early completion. Fast route: idioms involving old-fashioned everyday objects (oil lamps, candles) frequently trace back to a literal historical practice; recalling that origin story ("working by lamp oil at night") makes the idiomatic meaning immediately obvious and memorable rather than needing rote memorization alone.'
  },
  {
    id: 'apti-verbal-pyq2025a',
    pyqStyle: true,
    q: 'Choose the most appropriate pair of words to fill the blanks: The new policy, though ______ in intention, proved ______ in execution due to poor planning.',
    options: ['noble ... disastrous', 'noble ... successful', 'flawed ... perfect', 'vague ... clear'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The word "though" signals a contrast between the two blanks, and "due to poor planning" tells us the execution outcome must be negative. "Noble" (having good, well-meaning intentions) contrasts appropriately with "disastrous" (a clearly negative outcome caused by poor planning). "Noble...successful" fails the contrast signaled by "though" and also contradicts "due to poor planning," which demands a negative result. "Flawed...perfect" and "vague...clear" both misassign the sentence\'s required positive-to-negative direction across the two blanks. Fast route: for two-blank sentences with a contrast word like "though," "but," or "however," first decide the required positive/negative polarity of each blank from the surrounding clues, then test only option pairs matching that exact polarity pattern.'
  },
  {
    id: 'apti-verbal-pyq2026a',
    pyqStyle: true,
    q: 'Sales of a company\'s flagship product increased by 30% after it reduced the price by 10%. The company concluded that lowering prices further would continue to boost sales. Which of the following, if true, would most weaken this conclusion?',
    options: ['A rival company launched an aggressive marketing campaign for a competing product at the same time, which likely drove the increased customer interest', 'The company\'s profit margins improved despite the price cut', 'The product remains popular among younger customers', 'The price reduction was well publicized in the media'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The company\'s conclusion assumes that the price cut caused the sales increase, but this is only one possible explanation, and the argument is weakened if an alternative cause for the sales change is identified. A rival\'s aggressive marketing campaign occurring at the same time offers exactly such an alternative explanation: the increased customer interest (and thus sales) may have come from market disruption caused by the competitor, not from the company\'s own price reduction, undermining the causal link the company assumes. The other options either support the company\'s pricing strategy (options B and D) or are irrelevant to the causal claim about price and sales (option C). Fast route: for "weaken the conclusion" questions built on a causal claim (X caused Y), the strongest weakening option is always one that introduces a plausible alternative cause for Y, rather than one that merely provides supporting or tangential information.'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-data-spatial';}).questions.push(
  {
    id: 'apti-data-spatial-pyq2015a',
    pyqStyle: true,
    q: 'A company\'s total annual budget is Rs. 72 lakh, shown as a pie chart. The "Marketing" sector occupies 120 degrees of the chart. What amount is allocated to Marketing?',
    options: ['Rs. 24 lakh', 'Rs. 20 lakh', 'Rs. 18 lakh', 'Rs. 30 lakh'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'A pie chart\'s full circle of 360 degrees represents the entire total, so a sector\'s value is (its angle/360) x total. Here, Marketing\'s angle is 120 degrees, which is 120/360 = 1/3 of the circle. Marketing amount = 72 lakh x 1/3 = Rs. 24 lakh. Fast route: reduce the sector\'s angle-to-360 fraction to its simplest form first (120/360 = 1/3 here) and multiply that clean fraction by the total, rather than computing the decimal 120/360 = 0.333... and multiplying by that, since the exact fraction avoids any rounding risk.'
  },
  {
    id: 'apti-data-spatial-pyq2016a',
    pyqStyle: true,
    q: 'A company\'s annual sales (in Rs crore) were: 2018: 200, 2019: 250, 2020: 300, 2021: 330. In which year was the percentage growth over the previous year the highest?',
    options: ['2019', '2020', '2021', '2018'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Percentage growth for each year must be measured against that year\'s own previous-year base, not compared using absolute increases. 2019 over 2018: (250-200)/200 x 100 = 50/200 x 100 = 25%. 2020 over 2019: (300-250)/250 x 100 = 50/250 x 100 = 20%. 2021 over 2020: (330-300)/300 x 100 = 30/300 x 100 = 10%. Even though the absolute increase is the same (50 crore) for 2019 and 2020, 2019 shows a higher percentage growth because it grew from a smaller base. So 2019 has the highest percentage growth at 25%. Fast route: never rank years by absolute increase alone in a "highest percentage growth" question; always divide each year\'s increase by that specific year\'s own starting value, since an identical absolute rise from a smaller base always yields a larger percentage.'
  },
  {
    id: 'apti-data-spatial-pyq2017a',
    pyqStyle: true,
    q: 'A table shows monthly rainfall (in mm) as: January: 40, February: 60, March: 80, April: 100. What is the average rainfall over these four months?',
    options: ['70 mm', '75 mm', '65 mm', '80 mm'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The average is the sum of all values divided by the count of values: (40 + 60 + 80 + 100)/4 = 280/4 = 70 mm. Fast route: since the four values form an evenly spaced arithmetic sequence (40, 60, 80, 100, each step of +20), the average of an evenly spaced set equals the average of its first and last terms: (40 + 100)/2 = 70, skipping the need to add all four numbers individually. This shortcut works for any set of evenly spaced (arithmetic) data.'
  },
  {
    id: 'apti-data-spatial-pyq2018a',
    pyqStyle: true,
    q: 'A vertical mirror is placed to the right of a letter. Which of the following letters would appear unchanged in its mirror image?',
    options: ['H', 'P', 'J', 'R'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'A vertical mirror flips a figure left-right, so only letters that are symmetric about a vertical axis running through their centre will look unchanged. Letters with this vertical symmetry include A, H, I, M, O, T, U, V, W, X and Y. Among the given options, H has a clear vertical line of symmetry (its left half mirrors its right half exactly), so it remains unchanged. P, J and R are all asymmetric about a vertical axis and would visibly change shape (and effectively reverse) in a vertical mirror. Fast route: memorize the fixed list of vertically-symmetric capital letters and simply check option letters against that list, rather than mentally visualizing each letter\'s reflection from scratch.'
  },
  {
    id: 'apti-data-spatial-pyq2018b',
    pyqStyle: true,
    q: 'A water image is formed by reflecting a figure in a horizontal surface below it. Which of the following letters would appear unchanged in its water image?',
    options: ['K', 'A', 'P', 'J'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'A water image flips a figure top-to-bottom (vertically), so only letters symmetric about a horizontal axis running through their centre will look unchanged. Letters with this horizontal symmetry include B, C, D, E, H, I, K, O and X. Among the options, K has its top half mirroring its bottom half around a horizontal midline, so it remains unchanged in a water image. A, P and J are all asymmetric about a horizontal axis and would look different when flipped vertically. Fast route: never confuse the water-image rule (flips top-bottom, so check horizontal symmetry) with the mirror-image rule (flips left-right, so check vertical symmetry); the two symmetric-letter lists barely overlap (only H, I, O, X, and the always-symmetric shapes appear in both), making this mix-up a common and costly error.'
  },
  {
    id: 'apti-data-spatial-pyq2019a',
    pyqStyle: true,
    q: 'A square sheet of paper is folded in half, then folded in half again (two folds in total). A single hole is then punched through the folded paper at the centre. How many holes will appear when the paper is fully unfolded? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Each fold doubles the number of paper layers stacked on top of each other. After 2 folds, the number of layers is 2^2 = 4. A single punch through all the stacked layers creates one hole in each layer, so unfolding reveals 4 holes total, arranged symmetrically about both fold lines. Fast route: for "n folds, one punch" questions, the number of resulting holes is always 2^n (as long as the punch does not land exactly on a fold line, which would merge holes), so simply raise 2 to the power of the number of folds rather than trying to trace the hole through each unfolding step visually.'
  },
  {
    id: 'apti-data-spatial-pyq2020a',
    pyqStyle: true,
    q: 'In a class of 60 students, 35 play cricket, 30 play football, and 15 play both cricket and football. How many students play neither sport? (Enter your numerical answer.)',
    options: [],
    answer: 10,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Using the inclusion-exclusion principle for two overlapping sets, the number playing at least one sport = (cricket) + (football) - (both) = 35 + 30 - 15 = 50. Since the total class size is 60, the number playing neither sport is 60 - 50 = 10. Fast route: always subtract the "both" overlap exactly once from the sum of the two individual totals before subtracting from the grand total, since simply adding 35 + 30 = 65 and subtracting from 60 would wrongly double-count the 15 students who play both sports, producing a nonsensical negative answer as a warning sign of the error.'
  },
  {
    id: 'apti-data-spatial-pyq2020b',
    pyqStyle: true,
    q: 'Class A has 30 students with an average score of 60 marks, and Class B has 20 students with an average score of 75 marks. What is the combined average score of both classes together? (Enter your numerical answer.)',
    options: [],
    answer: 66,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Combining two group averages requires weighting by group size, never a simple midpoint of the two averages. Total marks in Class A = 30 x 60 = 1800, and total marks in Class B = 20 x 75 = 1500. Combined total marks = 1800 + 1500 = 3300, and combined total students = 30 + 20 = 50. Combined average = 3300/50 = 66. Fast route: convert each group\'s average back into a total (average x count), add the totals and the counts separately, then divide once at the end; never average the two averages directly (which would wrongly give (60+75)/2 = 67.5 here), since that ignores the unequal group sizes.'
  },
  {
    id: 'apti-data-spatial-pyq2021a',
    pyqStyle: true,
    q: 'A bar chart shows the sales (in units) of four products: P = 150, Q = 200, R = 250, S = 180. What is the ratio of R\'s sales to the total sales of all four products (in lowest terms)?',
    options: ['25:78', '25:76', '1:3', '5:16'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Total sales across all four products = 150 + 200 + 250 + 180 = 780. The ratio of R\'s sales to the total is 250:780. Dividing both terms by their greatest common divisor, 10, gives 25:78, which cannot be simplified further since 25 (5x5) and 78 (2x3x13) share no common factors. Fast route: always sum all category values first to get the correct denominator for a "share of total" ratio question, then find the greatest common divisor of the numerator and that total to reduce the ratio in one step, rather than trying to guess a "nice" fraction like 1:3 that does not actually match the exact numbers given.'
  },
  {
    id: 'apti-data-spatial-pyq2022a',
    pyqStyle: true,
    q: 'A cube of side 5 units is painted on all its outer faces and then cut into 125 unit cubes. How many of these unit cubes have no face painted at all (fully interior cubes)? (Enter your numerical answer.)',
    options: [],
    answer: 27,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'For an n x n x n painted cube, the fully interior unit cubes (no painted face at all) form a smaller (n-2) x (n-2) x (n-2) cube tucked entirely inside, away from every outer surface, giving a count of (n-2)^3. Here n = 5, so the interior count is (5-2)^3 = 3^3 = 27. Fast route: apply the fixed interior-cube formula (n-2)^3 directly by substituting n, and cross-check using the full census (corners 8, edges 12(n-2) = 36, faces 6(n-2)^2 = 54, interior 27) summing to 8+36+54+27 = 125, which matches n^3 = 125 exactly, confirming no arithmetic slip.'
  },
  {
    id: 'apti-data-spatial-pyq2022b',
    pyqStyle: true,
    q: 'A clock shows the time as 3:40. What time will its mirror image show?',
    options: ['8:20', '8:40', '7:20', '9:20'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'For a standard analog clock face, the mirror image time and the actual time always add up to 11:60 (equivalently, 12:00 read as 11 hours and 60 minutes for easy subtraction). Converting 3:40 to minutes past 3: 3 hours 40 minutes. Subtracting from 11:60: 11:60 - 3:40 = 8:20. Fast route: memorize the fixed rule "actual time + mirror time = 11:60" and perform a single subtraction (borrowing from hours when the minutes of the actual time exceed 0, since 60 minutes are being subtracted from), rather than trying to visualize the reflected clock face directly, which is much more error-prone under time pressure.'
  },
  {
    id: 'apti-data-spatial-pyq2023a',
    pyqStyle: true,
    q: 'A table shows a company\'s regional revenue (in Rs lakh): North = 120, South = 180, East = 90, West = 110. What percentage of the total revenue comes from the South region? (Enter your numerical answer, rounded to the nearest whole number.)',
    options: [],
    answer: 36,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Total revenue across all regions = 120 + 180 + 90 + 110 = 500 lakh. South\'s share of the total = (180/500) x 100 = 36%. Fast route: since the total here is a round number (500), convert the fraction 180/500 to a percentage by first simplifying to 18/50 = 36/100 = 36%, or equivalently multiply 180 by 100/500 = 0.2 directly (180 x 0.2 = 36), both of which avoid a long division by 500.'
  },
  {
    id: 'apti-data-spatial-pyq2023b',
    pyqStyle: true,
    q: 'In a survey of 100 people: 50 read newspaper A, 40 read newspaper B, 30 read newspaper C, 20 read both A and B, 15 read both B and C, 10 read both A and C, and 5 read all three newspapers. How many people read at least one of the three newspapers? (Enter your numerical answer.)',
    options: [],
    answer: 80,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The inclusion-exclusion principle for three overlapping sets states: |A union B union C| = |A| + |B| + |C| - |A and B| - |B and C| - |A and C| + |A and B and C|. Substituting the given values: 50 + 40 + 30 - 20 - 15 - 10 + 5 = 120 - 45 + 5 = 80. Fast route: write the inclusion-exclusion formula out explicitly with all six terms (three singles added, three pairwise overlaps subtracted, one triple overlap added back) before substituting numbers, since skipping the final "+ triple overlap" term (a very common mistake, since it was already subtracted three times in the pairwise terms and needs to be added back exactly once) is the single most frequent source of error in three-set counting.'
  },
  {
    id: 'apti-data-spatial-pyq2024a',
    pyqStyle: true,
    q: 'A square sheet of paper is folded diagonally in half, then folded diagonally in half again. Two holes are then punched near the folded corner, all the way through the folded stack. How many holes will appear when the paper is fully unfolded? (Enter your numerical answer.)',
    options: [],
    answer: 8,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Each fold doubles the number of layers, so after 2 folds there are 2^2 = 4 layers stacked together. Each of the 2 punches goes through all 4 layers, creating one hole per layer per punch location, so each punch produces 4 holes, and with 2 separate punch locations the total is 2 x 4 = 8 holes when unfolded. Fast route: generalize the single-punch rule (holes = 2^n for n folds) by multiplying by the number of distinct punch locations when more than one hole is punched per fold, since each punch location independently multiplies by the same layer count.'
  },
  {
    id: 'apti-data-spatial-pyq2025a',
    pyqStyle: true,
    q: 'A pie chart divides a company\'s total expenditure into five categories: Education 20%, Health 15%, Infrastructure 30%, Defense 25%, and Others 10%. What is the angle, in degrees, representing the Infrastructure sector? (Enter your numerical answer.)',
    options: [],
    answer: 108,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'A pie chart\'s full circle of 360 degrees corresponds to 100% of the total, so each percentage point equals 360/100 = 3.6 degrees. The Infrastructure sector is 30% of the total, so its angle = 30 x 3.6 = 108 degrees. Fast route: memorize common angle-to-percent anchors (10% = 36 degrees, 20% = 72 degrees, 25% = 90 degrees, 30% = 108 degrees, 40% = 144 degrees, 50% = 180 degrees) and read the answer off directly for round percentages like 30%, instead of multiplying by 3.6 from scratch each time.'
  },
  {
    id: 'apti-data-spatial-pyq2026a',
    pyqStyle: true,
    q: 'The word "CODE" is viewed in a vertical mirror placed to its right. Ignoring the reversal of letter order, which individual letters within the word would appear unchanged in shape?',
    options: ['Only O', 'O and D', 'C and O', 'All four letters'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'A vertical mirror flips each letter left-right, so only letters with a vertical line of symmetry (such as A, H, I, M, O, T, U, V, W, X, Y) look unchanged in shape. Checking each letter of "CODE" individually: C is symmetric about a horizontal axis but not a vertical one, so it changes in a vertical mirror; O is symmetric about both axes, so it remains unchanged; D has its flat edge on one side and curved edge on the other, so it is not vertically symmetric and changes shape; E has no vertical symmetry either and also changes. Only O remains visually unchanged as an individual letter shape. Fast route: check each letter of a word independently against the fixed list of vertically-symmetric letters, treating the "letter order reversal" (a separate, always-true effect of any mirror) as irrelevant to the question of which individual letter shapes stay visually the same.'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-quant';}).questions.push(
  {
    id: 'apti-quant-h1',
    q: 'A trader marks his goods 40% above cost price. During a clearance sale he offers two successive discounts of 10% and then 15% on the marked price. What is his overall profit percentage?',
    options: ['7.1%', '15%', '9%', '5.5%'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'This is a three-factor chain: markup, then two successive discounts, all multiplying rather than adding. The overall selling-price factor on cost price is 1.40 x 0.90 x 0.85. Compute stepwise: 1.40 x 0.90 = 1.26, and 1.26 x 0.85 = 1.071. So the shopkeeper still sells at 1.071 times the cost price, meaning a net profit of 7.1%. Fast route: convert each percentage to a decimal multiplier immediately (markup adds, so 1 + 0.40; discounts subtract, so 1 - 0.10 and 1 - 0.15) and multiply all three in one line, never adding the raw percentages. The trap answers come from wrong shortcuts: 40 - 10 - 15 = 15% (treating percentages as additive, which is never valid across different bases), or discounting only once and forgetting the second stage (giving 9% from 1.40 x 0.90 - 1 without the final 0.85 factor), or averaging the two discounts into one 12.5% cut. Since each discount applies to a progressively smaller marked price, and the markup applies to the original cost, only sequential multiplication of all three factors gives the correct 7.1%, which is why the answer is far below the naive 15%.'
  },
  {
    id: 'apti-quant-h2',
    q: 'A can complete a work in 12 days and B can complete it in 24 days. They work together for 4 days. A then leaves, and B is joined by C; working together, B and C finish the remaining work in exactly 3 more days. In how many days could C alone complete the entire work?',
    options: ['6 days', '8 days', '10 days', '9 days'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Set up rates as fractions of work per day: A = 1/12, B = 1/24. Together for 4 days they complete 4 x (1/12 + 1/24) = 4 x (3/24) = 4 x (1/8) = 1/2 of the work, leaving exactly 1/2 remaining — this is the step most students skip, wrongly treating the remaining work as the full job. Now B and C together clear this 1/2 in 3 days, so their combined rate is (1/2)/3 = 1/6 per day. Since B alone contributes 1/24 per day, C\'s rate is 1/6 - 1/24 = 4/24 - 1/24 = 3/24 = 1/8 per day, so C alone needs 8 days. Fast route: use a common work-unit of 24 (LCM of 12 and 24), so A = 2 units/day, B = 1 unit/day; in 4 days A+B finish 4x3 = 12 units out of 24, leaving 12 units for B+C in 3 days, i.e. 4 units/day combined, so C alone does 4 - 1 = 3 units/day, taking 24/3 = 8 days. The trap answers assume the remaining work is the full job (giving a much smaller time) or forget to subtract B\'s own contribution before inverting for C.'
  },
  {
    id: 'apti-quant-h3',
    q: 'A boat\'s speed in still water is 10 km/h. It travels 24 km downstream and then returns the same 24 km upstream, and the total time for the round trip is 5 hours. Find the speed of the stream, in km/h. (Enter your numerical answer.)',
    options: [],
    answer: 2,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Let the stream speed be s km/h. Downstream speed is (10+s), upstream speed is (10-s). The round-trip time equation is 24/(10+s) + 24/(10-s) = 5. Combine the fractions over a common denominator: 24[(10-s)+(10+s)] / (100 - s^2) = 5, which simplifies to 24 x 20 / (100 - s^2) = 5, i.e. 480/(100-s^2) = 5, so 100 - s^2 = 96, giving s^2 = 4 and s = 2 km/h (rejecting the negative root, since speed cannot be negative, and s must also be less than 10 for the boat to move upstream at all). Fast route: recognize that the sum of the two time fractions always simplifies to 2 x (still-water speed) x distance / (still-water-speed^2 - stream-speed^2), so plug numbers directly into that ready-made formula instead of expanding partial fractions from scratch. The trap here is to average the downstream and upstream speeds as if the boat covered each leg in equal time (it does not, since upstream is slower and takes longer), or to solve a linear equation ignoring that the denominator is a difference of squares, which silently drops the valid root.'
  },
  {
    id: 'apti-quant-h4',
    q: 'A container holds 81 litres of pure milk. 27 litres of the mixture is withdrawn and replaced with water. This same process — withdraw 27 litres of the current mixture and replace with water — is repeated once more. How many litres of pure milk remain in the container after the second replacement? (Enter your numerical answer.)',
    options: [],
    answer: 36,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'This is the repeated-dilution formula: after n replacements of x units from a total volume V, the remaining pure quantity is V x (1 - x/V)^n. Here V = 81, x = 27, n = 2, so the fraction of milk remaining is (1 - 27/81)^2 = (2/3)^2 = 4/9. Remaining milk = 81 x 4/9 = 36 litres. Fast route: track the multiplying fraction retained per step, (54/81) = 2/3, and square it directly for two identical replacements rather than tracking litres withdrawn at each stage separately. The classic trap is to assume each 27-litre withdrawal removes 27 litres of pure milk (since after the first replacement the container is a mixture, not pure milk), which would wrongly suggest 81 - 54 = 27 litres remain; that arithmetic only works for the very first withdrawal, when the container still holds pure milk, and fails for the second one where the withdrawn 27 litres is itself 2/3 milk, 1/3 water. The correct compounding factor approach is the only route to the right answer, 36 litres, not 27.'
  },
  {
    id: 'apti-quant-h5',
    q: 'The difference between the compound interest and the simple interest on a certain sum for 2 years at 10% per annum is Rs. 150. Find the sum (the principal). (Enter your numerical answer.)',
    options: [],
    answer: 15000,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'For exactly 2 years, the identity CI - SI = P(r/100)^2 holds (this is because the only extra amount compound interest earns over simple interest, over two years, is the interest-on-first-year-interest term). Substituting r = 10 and the given difference of Rs. 150: 150 = P x (10/100)^2 = P x 0.01, so P = 150/0.01 = 15000. Fast route: memorize the 2-year identity directly instead of computing full CI and SI amounts separately and subtracting, which is far slower and more error-prone under exam time pressure. The trap is applying the 3-year identity, CI - SI = P(r/100)^2 (3 + r/100), which has an extra factor and would give a wrong (smaller) principal if mistakenly used here; another common slip is forgetting to square the rate and instead computing P x (10/100) = 1500, an order-of-magnitude error that a quick sanity check catches (a Rs. 150 gap after only 2 years at 10% strongly implies a principal in the thousands, not hundreds).'
  },
  {
    id: 'apti-quant-h6',
    q: 'A committee of 5 members is to be formed from a pool of 6 men and 4 women. In how many ways can this committee be formed if it must include at least 2 women? (Enter your numerical answer.)',
    options: [],
    answer: 186,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Split by the number of women w, which can range from 2 to 4 (not higher, since only 4 women exist), with men filling the rest: w=2 gives C(4,2) x C(6,3) = 6 x 20 = 120; w=3 gives C(4,3) x C(6,2) = 4 x 15 = 60; w=4 gives C(4,4) x C(6,1) = 1 x 6 = 6. Total = 120 + 60 + 6 = 186. Fast route: use the complement instead — total ways to pick any 5 from 10 is C(10,5) = 252, and subtract the cases with fewer than 2 women (w=0: C(6,5) = 6, and w=1: C(4,1) x C(6,4) = 4 x 15 = 60), giving 252 - 66 = 186, matching exactly and confirming the direct sum. The trap is forgetting the upper cap of w=4 and mistakenly summing an extra w=5 term (which is impossible since only 4 women are available), or computing "at least 2" as merely "exactly 2" and stopping after the first case, both of which understate the true count.'
  },
  {
    id: 'apti-quant-h7',
    q: 'Two fair dice are rolled together. Given that the sum of the two numbers shown is even, what is the probability that both dice show the same number?',
    options: ['1/6', '1/3', '1/2', '2/3'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'This is a conditional probability question, so the sample space must shrink to only the outcomes satisfying the given condition, not the full 36 outcomes. The sum of two dice is even exactly when both dice are odd or both are even; since each die has 3 odd faces (1,3,5) and 3 even faces (2,4,6), the count of even-sum outcomes is 3x3 + 3x3 = 18 out of 36. Within this reduced space of 18 outcomes, count the doubles: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6) — all six doubles automatically have an even sum, since a number added to itself is always even, so all 6 qualify. The conditional probability is 6/18 = 1/3. Fast route: recognize that every doublet already lies inside the "even sum" condition, so the numerator stays the fixed count of 6, and only the denominator shrinks from 36 to 18. The trap is computing 6/36 = 1/6, which is the unconditional probability of a double and ignores that the question restricts attention only to already-even-sum outcomes; this is the classic error of not re-normalizing the sample space once a condition is imposed.'
  },
  {
    id: 'apti-quant-h8',
    q: 'A solid right circular cylinder of radius 7 cm and height 10 cm has a hemisphere of the same radius fixed exactly onto one of its circular faces. Using pi = 22/7, find the total exposed surface area of the resulting solid, in cm^2.',
    options: ['902', '1056', '748', '1210'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'When a hemisphere is fixed onto a cylinder\'s flat circular face, that shared circular face is completely covered on both sides and contributes zero exposed area — it must be dropped entirely, not counted once or twice. The exposed surface is: curved surface of the cylinder (2 x pi x r x h), the cylinder\'s other flat circular base (pi x r^2), and the curved surface of the hemisphere (2 x pi x r^2). With r=7, h=10, pi=22/7: curved cylinder = 2 x (22/7) x 7 x 10 = 440; flat base = (22/7) x 49 = 154; hemisphere curved = 2 x (22/7) x 49 = 308. Total = 440 + 154 + 308 = 902 cm^2. Fast route: since r=7 cancels the 7 in pi=22/7 cleanly, compute each term as a simple integer product without a calculator. The traps are well-populated here: including both the cylinder\'s top flat circle AND the hemisphere\'s flat base as if neither were hidden gives the inflated 1056 (double-counting a face that physically does not exist on the combined solid); forgetting the exposed bottom circle entirely gives 748; and treating the cap as a full sphere instead of a hemisphere gives 1210. Only careful accounting of exactly which faces remain physically visible yields 902.'
  },
  {
    id: 'apti-quant-h9',
    q: 'A dishonest dealer claims to sell rice at cost price, but he uses a rigged weight and gives only 800 grams of rice for every 1 kilogram he charges for. To appear generous, he also offers a further 5% discount on his invoiced price. What is his overall profit percentage?',
    options: ['18.75%', '25%', '20%', '13.75%'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Two effects combine here: a false-weight markup and a stated discount, and they must be applied to the correct bases. Let the true cost per gram be c. For every transaction, the dealer physically hands over only 800 g, so his actual cost of goods given is 800c. He invoices this as if it were 1000 g at cost price, so the invoiced price is 1000c; after a further 5% discount, the amount he actually collects is 1000c x 0.95 = 950c. His profit is what he collects minus what the goods actually cost him: 950c - 800c = 150c. Profit percentage must be computed on the true cost of goods given, 800c, not on the invoiced 1000c: 150c/800c x 100 = 18.75%. Fast route: treat the false weight as an automatic 25% profit factor (1000/800 = 1.25) with no discount, then apply the 5% discount as a further multiplying factor on the selling side only, giving overall factor 1.25 x 0.95 = 1.1875, i.e. 18.75% profit directly. The trap answers are 25% (false weight alone, ignoring the discount) and 20% (mistakenly computing profit as a fraction of the invoiced 1000c instead of the true cost 800c actually parted with).'
  },
  {
    id: 'apti-quant-h10',
    q: 'Train A is 100 m long and crosses a signal pole in 5 seconds. Train B is such that it crosses a 150 m long platform in 15 seconds, and its length works out to 75 m. If both trains now run on parallel tracks in the same direction, how long does the faster train take to completely cross the slower one?',
    options: ['5 seconds', '25 seconds', '35 seconds', '45 seconds'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'First extract each train\'s speed. Train A crosses a pole (covering only its own length) of 100 m in 5 s, so its speed is 100/5 = 20 m/s. Train B covers its own length plus the 150 m platform in 15 s; with length 75 m, total distance is 75 + 150 = 225 m, so its speed is 225/15 = 15 m/s. When two trains move in the SAME direction, the relevant relative speed for one to overtake and clear the other is the DIFFERENCE of their speeds, 20 - 15 = 5 m/s, not the sum — the sum applies only when they move toward each other. The faster train must cover the combined length of both trains, 100 + 75 = 175 m, relative to the slower one, so time = 175/5 = 35 seconds. Fast route: compute each train\'s speed from its own crossing data first, then immediately identify the direction word ("same" vs "opposite") before choosing sum or difference of speeds — this single word decision is where most errors occur. The trap answer 5 seconds comes from using the sum of speeds (35 m/s) as if the trains were moving toward each other, which would be correct only for opposite directions; 25 and 45 seconds come from combining lengths or speeds incorrectly (e.g., using only one train\'s length, or averaging the speeds instead of differencing them).'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-logical';}).questions.push(
  {
    id: 'apti-logical-h1',
    q: 'Six people A, B, C, D, E and F sit in a row facing north, numbered 1 to 6 from left to right. C sits at one of the two ends. Exactly two people sit between B and D. A sits immediately to the left of E. F does not sit adjacent to C. B sits to the left of D. F sits at the right end. How many people sit between C and D?',
    options: ['2', '3', '4', '1'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Start with the most restrictive clues. F sits at the right end, so seat 6 = F. Since F does not sit adjacent to C, C cannot be in seat 5; combined with "C sits at one of the two ends," C must be at the left end, seat 1. "Exactly two people between B and D" means their seat numbers differ by exactly 3, and "B sits to the left of D" fixes the order, so the pair (B, D) must be one of (1,4), (2,5), (3,6). Seats 1 and 6 are already taken by C and F, so only (2,5) survives: B = 2, D = 5. That leaves seats 3 and 4 for A and E, and since "A sits immediately to the left of E," A = 3 and E = 4. The full arrangement is C(1), B(2), A(3), E(4), D(5), F(6). Between C (seat 1) and D (seat 5) sit seats 2, 3, 4 — that is B, A, E, three people. Fast route: always resolve the single most restrictive absolute clue (an end position) first, then use it to eliminate branches of the "exactly two between" clue instead of testing all three pairs blindly. The trap is stopping at "2 people between" style clues without checking which candidate pairs remain legal once the end seats are already occupied, which silently admits impossible arrangements.'
  },
  {
    id: 'apti-logical-h2',
    q: 'Six friends P, Q, R, S, T and U have distinct heights. S is the tallest of all. T is shorter than S but taller than R. Q is taller than only two of the other five people. U is taller than P but shorter than R. R is taller than Q. Who is the third tallest among the six friends?',
    options: ['P', 'Q', 'R', 'T'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Rank heights 1 (shortest) to 6 (tallest). "S is the tallest" gives S = 6. "Q is taller than only two people" is a definitional trap: it fixes Q\'s absolute rank directly, since exactly two people being shorter than Q means Q is 3rd from the bottom, so Q = 3 (not 2, which would be the natural but wrong guess from misreading "only two"). "R is taller than Q" forces R into {4, 5} since 6 is taken. "T is shorter than S but taller than R" needs an integer strictly between R and 6; if R = 5, no integer lies strictly between 5 and 6, which is impossible, so R = 4, and then T must be strictly between 4 and 6, forcing T = 5. The only ranks left, 1 and 2, go to P and U; since "U is taller than P," P = 1 and U = 2. The full order from shortest to tallest is P, U, Q, R, T, S. Counting from the top: S is 1st tallest, T is 2nd tallest, R is 3rd tallest. Fast route: convert every "taller than only n people" phrase into an absolute rank immediately, since it is far more informative than a relative "taller than X" clue, and use it to prune the impossible branch (R=5) in one step rather than testing all orderings.'
  },
  {
    id: 'apti-logical-h3',
    q: 'Consider the three statements: (1) All squares are rectangles. (2) All rectangles are parallelograms. (3) Some parallelograms are rhombuses. Which conclusion definitely follows from these statements?',
    options: ['All squares are parallelograms.', 'Some rhombuses are squares.', 'All parallelograms are squares.', 'No parallelogram is a rhombus.'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Chain the two universal statements first: "All squares are rectangles" places the square-circle entirely inside the rectangle-circle, and "All rectangles are parallelograms" places the rectangle-circle entirely inside the parallelogram-circle. Since the square-circle is inside the rectangle-circle, which is inside the parallelogram-circle, the square-circle must also be entirely inside the parallelogram-circle — this transitivity of "All A are B" and "All B are C" giving "All A are C" is always valid, so "All squares are parallelograms" definitely follows. The third statement, "Some parallelograms are rhombuses," only guarantees an overlap somewhere inside the parallelogram-circle; that rhombus-overlap region could sit entirely outside the (smaller) square-circle, so nothing about squares and rhombuses can be concluded — "Some rhombuses are squares" is only possible, not certain, and is the classic trap of treating a valid-sounding combination of a universal and a particular statement as guaranteed. "All parallelograms are squares" reverses a valid universal statement, which is never a legitimate conversion. "No parallelogram is a rhombus" directly contradicts the given "Some parallelograms are rhombuses." Fast route: chain only the universal (All-All) statements first, since that combination is always safe, and treat any conclusion involving a term from a "Some" statement as unproven unless a diagram forces it in every case.'
  },
  {
    id: 'apti-logical-h4',
    q: 'Consider the three statements: (1) Some doctors are teachers. (2) All teachers are readers. (3) No reader is a painter. Which conclusion definitely follows from these statements?',
    options: ['Some doctors are readers.', 'No doctor is a painter.', 'Some painters are teachers.', 'All doctors are readers.'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Combine statement (1), a particular statement, with statement (2), a universal one: "Some doctors are teachers" and "All teachers are readers" together force that the specific doctors who are teachers must also be readers, so "Some doctors are readers" definitely follows — a particular-then-universal chain (Some A are B, All B are C, therefore Some A are C) is always valid. This is as far as the chain can safely go. "No doctor is a painter" over-claims: statement (3) tells us no reader is a painter, so the doctor-teachers (who are readers) are certainly not painters, but the remaining doctors who are NOT teachers have no stated connection to reading at all, so they might still be painters — the universal negative conclusion is not guaranteed, only a partial one ("some doctors are not painters") would be. "Some painters are teachers" is actually false in every valid diagram: since all teachers are readers and no reader is a painter, it follows validly that NO teacher is a painter, which is the opposite of this option. "All doctors are readers" over-generalizes a particular premise into a universal one, which is never valid. Fast route: track exactly how much quantifier strength survives each link in the chain — a "Some" premise can never produce an "All" conclusion, and this single check eliminates two of the four options instantly.'
  },
  {
    id: 'apti-logical-h5',
    q: 'In a coded family notation, "A + B" means A is the mother of B, "A - B" means A is the father of B, and "A x B" means A is the brother of B. If "P + Q - R x S" is true, how is P related to S?',
    options: ['Grandmother', 'Grandfather', 'Mother', 'Aunt'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Decode the chain one link at a time, generation by generation. "P + Q" means P is the mother of Q, so P is one generation above Q. "Q - R" means Q is the father of R, placing R one generation below Q, and therefore two generations below P — P is R\'s paternal grandmother. "R x S" means R is the brother of S, which places S in the same generation as R, as R\'s sibling, and consequently as a child of the same parent Q, making S also a grandchild of P. Since P is female (established by "mother" in the first clue) and is two generations above S, P is S\'s grandmother — and this holds regardless of whether S is male or female, since "grandmother" is determined by P\'s own gender and generational gap, not by S\'s. Fast route: build a small generation ladder (P at the top, Q below P, R and S together below Q) the moment the symbols are decoded, rather than trying to track the relation verbally; the ladder makes the two-generation gap and the correct gendered title immediately visible. The trap is assuming a sibling clue like "R x S" might change the generational count (it does not — siblings always sit at the same level) or defaulting to "grandfather" out of habit despite P being explicitly established as female via the "mother" clue.'
  },
  {
    id: 'apti-logical-h6',
    q: 'In a coded family notation, "A $ B" means A is the father of B, "A # B" means A is the mother of B, "A @ B" means A is the husband of B, "A & B" means A is the daughter of B, and "A % B" means A is the son of B. If "J @ K, K & L, L % M" is true, how is J related to M?',
    options: ['Grandson-in-law', 'Son-in-law', 'Grandson', 'Nephew'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Decode each link before combining: "J @ K" means J is the husband of K, so K is female and married to J. "K & L" means K is the daughter of L, placing L one generation above K. "L % M" means L is the son of M, placing M one generation above L, and therefore two generations above K — M is K\'s grandparent (specifically, since L is M\'s son, M could be L\'s father or mother, but either way M is K\'s paternal grandparent). K is thus the granddaughter of M. Since J is married to K, J is not a blood descendant of M at all, but a relation by marriage two generations down — the correct title is "grandson-in-law," the husband of a granddaughter, not "grandson" (which would wrongly claim a blood tie) and not "son-in-law" (which would wrongly place J only one generation down instead of two). Fast route: first build the generation ladder from the blood-relation clues alone (M above L above K), and only at the very end attach the marital clue (J to K) as a same-generation, non-blood link, adding "-in-law" to whatever blood title K herself holds relative to M. The trap is collapsing marriage and blood relations into the same step, which easily produces the wrong generational distance or wrongly upgrades an in-law into a blood relation.'
  },
  {
    id: 'apti-logical-h7',
    q: 'January 1, 2024 was a Monday. What day of the week was January 1, 2030?',
    options: ['Monday', 'Tuesday', 'Sunday', 'Wednesday'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'From January 1, 2024 to January 1, 2030 spans exactly 6 full years: 2024, 2025, 2026, 2027, 2028, 2029. The weekday shifts forward by 1 for each ordinary 365-day year and by 2 for each year containing a February 29 within the span (a leap year). Among these six years, 2024 and 2028 are leap years (divisible by 4 and not century-exceptions), so each contributes an extra day; 2025, 2026, 2027, 2029 are ordinary. Total forward shift = (6 years x 1 day each) + (2 leap years x 1 extra day each) = 6 + 2 = 8 days. Since weekdays cycle every 7 days, the net shift is 8 mod 7 = 1 day forward from Monday, landing on Tuesday. Fast route: count only ordinary years as +1 each, then add +1 more for every leap year that falls strictly within the interval (not the destination year itself, unless its own Feb 29 has already passed by the date in question — here Jan 1 is before Feb 29 in every year, so both 2024\'s and 2028\'s leap days lie fully inside the six-year span and both count). The trap is either forgetting to add extra days for leap years at all (giving 6 mod 7 = 6 days shift, i.e. Sunday) or overcounting by including 2030\'s own leap status (2030 is not a leap year and is also outside the counted span, so it must not be added).'
  },
  {
    id: 'apti-logical-h8',
    q: 'At what time between 7 o\'clock and 8 o\'clock are the hour hand and minute hand of a clock exactly opposite each other (180 degrees apart)?',
    options: ['7 hours 5 5/11 minutes', '7 hours 10 10/11 minutes', '7 hours 16 4/11 minutes', '7 hours 21 9/11 minutes'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'At H hours and M minutes, the hour hand is at angle 30H + 0.5M degrees and the minute hand is at 6M degrees. "Exactly opposite" means the two angles differ by 180 degrees: (30H + 0.5M) - 6M = 180 (choosing the sign so the result stays in range), i.e. 30H - 5.5M = 180. At 7 o\'clock, H = 7, so 210 - 5.5M = 180, giving 5.5M = 30, so M = 30/5.5 = 60/11 = 5 and 5/11 minutes. So the hands are opposite at 7 hours 5 5/11 minutes, shortly after 7:05. Fast route: memorize that hands are opposite exactly twice per hour-pair-cycle relative to the "coincide" formula, and that the opposite-angle condition simply replaces the coincidence equation\'s right-hand side of 0 with 180; solving 30H - 5.5M = 180 directly for M avoids re-deriving the angle formula from scratch under time pressure. The trap answers arise from using the coincidence formula\'s structure but misplacing the 180, or from solving 30H - 5.5M = -180 instead (which gives M = 70.9, outside the valid 0-60 range for this hour and must be discarded, not rounded into a wrong-looking answer choice).'
  },
  {
    id: 'apti-logical-h9',
    q: 'A cube of side 6 cm is painted red on all six faces and then cut into 1 cm x 1 cm x 1 cm unit cubes. How many of the unit cubes have at least one face painted red? (Enter your numerical answer.)',
    options: [],
    answer: 152,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The total number of unit cubes is 6^3 = 216. Rather than separately counting corner cubes (3 faces painted), edge cubes (2 faces painted), and face cubes (1 face painted) and adding all three, use the complement: the only cubes with NO paint at all are the fully interior ones, forming a smaller (n-2) x (n-2) x (n-2) cube tucked one layer inside every face, giving (6-2)^3 = 4^3 = 64 unpainted cubes. "At least one face painted" is simply the complement of "zero faces painted," so the count is 216 - 64 = 152. Fast route: for any painted-and-cut cube problem asking for "at least one painted face," always compute total minus the interior (n-2)^3 term in one subtraction, rather than summing the three separate painted categories (8 corners + 12(n-2) edges + 6(n-2)^2 faces), which is more arithmetic and more error-prone even though it gives the same 152. The trap is manually summing corner, edge, and face cube counts and making an arithmetic slip in one of the three terms, or forgetting that "at least one" is best attacked by its complement rather than direct casework.'
  },
  {
    id: 'apti-logical-h10',
    q: 'A cube of side 4 cm has one pair of opposite faces painted red, the second pair of opposite faces painted blue, and the third pair of opposite faces painted green. The cube is then cut into 64 unit cubes of side 1 cm. How many unit cubes have exactly two faces painted, each a different color? (Enter your numerical answer.)',
    options: [],
    answer: 24,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'In any n x n x n cube cut into unit cubes, the unit cubes lying along an edge (excluding the two corners of that edge) have exactly two painted faces, and there are 12(n-2) such edge cubes in total, since a cube has 12 edges. Here n = 4, so 12 x (4-2) = 12 x 2 = 24 edge cubes. The extra twist in this problem — three different colors on the three axis-pairs of faces — is actually automatically satisfied by every edge cube: any edge of a cube is the meeting line of two faces that belong to two DIFFERENT axis-pairs (no edge is shared by two opposite faces, since opposite faces never touch), so the two painted faces on every edge cube necessarily come from two different color-pairs. This means the count of "exactly two faces painted, both different colors" is identical to the plain count of edge cubes, 24 — no further filtering is needed. Fast route: recognize that the standard edge-cube formula 12(n-2) already guarantees the two colors differ, since the only way to get two same-colored painted faces on one small cube would require it to touch two opposite faces of the big cube simultaneously, which is geometrically impossible for a unit cube. The trap is assuming the multi-color setup requires extra casework beyond the standard formula, wasting time re-deriving what the geometry already guarantees, or mistakenly including corner cubes (which have three painted faces, all three different colors here, not two).'
  }
);

window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-verbal';}).questions.push(
  {
    id: 'apti-verbal-h1',
    q: 'Argument: "The city should replace all its diesel buses with electric buses, because electric buses emit no tailpipe pollutants, and this will reduce air pollution along every bus route." Which of the following is an assumption necessary for this argument to hold?',
    options: [
      'Electric buses can complete the same daily routes as diesel buses without requiring diesel buses as backup.',
      'Diesel buses are the single largest source of air pollution in the city.',
      'Passengers generally prefer riding electric buses over diesel buses.',
      'Electricity costs less per kilometre than diesel fuel.'
    ],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Apply the negation test to each option: negate it and check whether the argument collapses. Negating option 1 gives "electric buses cannot complete the same routes without diesel backup" — if true, diesel buses would still be running on those very routes, directly undermining the claim that replacing diesel with electric will reduce pollution "along every bus route." Since the argument falls apart when this is false, it is a necessary assumption. Negating option 2, "diesel buses are NOT the largest pollution source," leaves the argument completely intact — the argument never claimed diesel buses are the biggest polluter, only that replacing them helps, so this is irrelevant, not necessary. Option 3, passenger preference, has no bearing on the pollution claim at all. Option 4, relative cost, is a plausible reason to prefer electric buses on economic grounds, but the argument\'s conclusion is about air pollution, not cost, so it is unnecessary to the stated reasoning. Fastest route: negate each candidate assumption in turn and keep only the one whose negation actually breaks the argument\'s specific conclusion, not just any tangentially related fact.'
  },
  {
    id: 'apti-verbal-h2',
    q: 'Passage: "A study of 500 startup founders found that 68% of those who had a formal mentor during their first two years reported their company was still operating five years later, compared to 41% of founders without a formal mentor. The study did not control for founders\' prior industry experience or the amount of initial funding raised." Which of the following is the most defensible inference from this passage?',
    options: [
      'Having a formal mentor causes a startup to survive longer.',
      'In this surveyed group, founders with a formal mentor reported a higher five-year survival rate than those without one.',
      'Founders without mentors are doomed to fail within five years.',
      'If every founder in the survey had been given a mentor, the overall survival rate would have reached 68%.'
    ],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Option 2 simply restates the reported correlation exactly as the passage states it, without adding anything beyond what was measured — a survival-rate difference was observed between the two groups in this study, and that is all that can be safely claimed. Option 1 commits the classic correlation-to-causation leap: the passage explicitly flags that industry experience and funding were not controlled for, so the mentor group might simply have contained more experienced or better-funded founders, who would likely have survived longer regardless of mentorship. Option 3 is directly contradicted by the numbers themselves — 41% of unmentored founders did survive five years, so "doomed to fail" is false, not merely unsupported. Option 4 is an unwarranted hypothetical extrapolation: it assumes the 68% figure would generalize to founders who currently lack mentors, ignoring that those founders may differ systematically (in experience or funding) from those who sought mentors in the first place. Fastest route: whenever a passage explicitly names confounding variables it did not control for, treat that as a direct signal to reject any causal-sounding option and keep only the option that reports the correlation as observed.'
  },
  {
    id: 'apti-verbal-h3',
    q: 'Statement: "Rainfall this monsoon has been 15% below the ten-year average, and reservoir levels in the region are currently at their lowest recorded level for this time of year." Which conclusion follows most directly from this statement, without requiring any additional assumption?',
    options: [
      'The low reservoir levels are entirely caused by the below-average rainfall.',
      'Both the current rainfall and the current reservoir level are below their respective typical benchmarks for this time of year.',
      'Next year\'s monsoon is also likely to be below average.',
      'Water shortages will definitely occur in the region this year.'
    ],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Option 2 does nothing more than conjoin the two facts already given in the statement — rainfall is below its ten-year average, and reservoir level is below its typical level for this time of year — without introducing any new claim, making it the conclusion that follows most directly. Option 1 sounds like the natural real-world explanation, which is exactly what makes it the trap: it smuggles in an unstated assumption that below-average rainfall is the sole and complete cause of the low reservoir level, when the statement never rules out other contributing factors such as increased water usage, upstream diversions, or reduced snowmelt. Option 3 extrapolates a prediction about a future, entirely separate monsoon season, which the statement gives no basis for at all — past rainfall says nothing about next year\'s pattern. Option 4 uses the word "definitely" for an outcome that depends on many unstated factors, such as remaining reserves, alternative water sources, or conservation measures, none of which the statement addresses. Fastest route: when one option merely restates or conjoins the given facts and another offers a causal explanation that "feels obviously true," always prefer the plain restatement, since the causal option almost always smuggles in an assumption the passage never licenses.'
  },
  {
    id: 'apti-verbal-h4',
    q: 'The following five sentences form a coherent paragraph when arranged correctly. R: "Coral reefs cover less than one percent of the ocean floor, yet they support nearly a quarter of all marine species." P: "This disproportionate richness makes reefs one of the most biologically productive ecosystems on the planet." T: "However, reefs are highly sensitive to even small increases in water temperature." Q: "A rise of just one or two degrees Celsius can trigger coral bleaching, in which corals expel the algae that give them both color and nutrients." S: "If the warm conditions persist, bleached corals eventually starve and die, causing the wider ecosystem they support to collapse." What is the correct order?',
    options: ['R, P, T, Q, S', 'R, T, P, Q, S', 'P, R, T, Q, S', 'R, P, Q, T, S'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'R must open the paragraph since it introduces the topic (coral reefs and their species richness) with no pronoun or backward reference to anything earlier. P follows R directly because it explicitly refers back to "this disproportionate richness" — a phrase that only makes sense immediately after R has established the one-percent-yet-a-quarter contrast. T then pivots the paragraph with "however," introducing the new, contrasting idea of temperature sensitivity, which must come after the positive framing in R-P and before any elaboration of that sensitivity. Q naturally follows T because it explains the specific mechanism (bleaching) of the temperature sensitivity T just introduced. S closes the paragraph, describing the consequence of prolonged bleaching, and its opening phrase "if the warm conditions persist" presupposes that bleaching (introduced in Q) has already occurred. Fastest route: find the sentence with zero backward-pointing words (R) to anchor the start, then chase each explicit link word or phrase — "this disproportionate richness," "however," "if the warm conditions persist" — to chain the rest in one pass rather than testing every permutation.'
  },
  {
    id: 'apti-verbal-h5',
    q: 'The following five sentences form a coherent paragraph when arranged correctly. Q: "A placebo is a substance or treatment with no active therapeutic effect, such as a sugar pill." S: "Remarkably, patients given a placebo often report genuine improvement in their symptoms." P: "Researchers attribute this to the placebo effect, in which a patient\'s expectation of relief influences their actual physiological response." T: "Because of this effect, modern clinical trials compare a new drug against a placebo rather than against no treatment at all." R: "Only if the drug outperforms the placebo by a statistically significant margin is it considered genuinely effective." What is the correct order?',
    options: ['Q, S, P, T, R', 'Q, P, S, T, R', 'S, Q, P, T, R', 'Q, S, T, P, R'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Q must open the paragraph since it defines the key term ("a placebo is...") before anything else can reference it, and carries no pronoun or backward link. S follows because it introduces the surprising observation ("remarkably, patients given a placebo often report genuine improvement"), which requires the definition from Q to already be in place, and "this" in the next sentence must refer to the improvement just described in S, not to the bare definition in Q — this is exactly why P cannot directly follow Q. P then explains the mechanism behind that improvement, since "this" in P ("researchers attribute this...") points back to the improvement reported in S. T follows P because "this effect" in T refers to the placebo effect P just named, and introduces its practical consequence for clinical trials. R closes the paragraph by adding the specific statistical criterion trials use, building directly on the trial-design idea T just introduced. Fastest route: track pronoun references like "this" precisely — in this paragraph "this" in P clearly points to the observed improvement (S), not the bare definition (Q), which is the detail that breaks the tempting but wrong order Q-P-S-T-R.'
  },
  {
    id: 'apti-verbal-h6',
    q: 'Which sentence uses "imply" and "infer" correctly?',
    options: [
      'From your tone, I infer that you are upset, though you never said so directly.',
      'From your tone, I imply that you are upset, though you never said so directly.',
      'Are you inferring that I am to blame for this mistake?',
      'The report implies, based on the reader\'s careful analysis, a conclusion I never intended.'
    ],
    answer: 0,
    marks: 1,
    difficulty: 'hard',
    type: 'concept',
    explanation: '"Imply" is done by the source of information — a speaker, writer, or piece of evidence suggests something indirectly. "Infer" is done by the receiver of that information — a listener or reader draws a conclusion from indirect evidence. In option 1, the speaker is the one drawing a conclusion from someone else\'s tone, which is correctly labeled as inferring. Option 2 swaps the roles: the speaker cannot "imply" a conclusion about someone else\'s emotional state from that other person\'s tone — implying is something the tone itself (the source) would do, not the observer. Option 3 has the same swap: the person asking whether they are "to blame" is accusing the other party of suggesting blame, so the correct word is "implying" (are you implying that I am to blame), since the speaker of the accusation is the source suggesting the meaning, not the one drawing a conclusion. Option 4 muddles both roles into one confused sentence, attributing "implies" to the report while also crediting "the reader\'s careful analysis," conflating the source\'s act of implying with the reader\'s act of inferring in the same clause. Fastest route: mentally substitute "suggests" for "imply" and "concludes" for "infer" in each sentence — whichever substitution reads naturally, given who is the source and who is the audience, reveals the correct word.'
  },
  {
    id: 'apti-verbal-h7',
    q: 'Which sentence uses "comprise" and "compose" most correctly according to strict formal usage?',
    options: [
      'The committee is comprised of twelve members.',
      'The committee comprises twelve members.',
      'Twelve members comprise of the committee.',
      'The committee composes twelve members.'
    ],
    answer: 1,
    marks: 1,
    difficulty: 'hard',
    type: 'concept',
    explanation: '"Comprise" means "to include" or "to consist of," and by strict formal usage it is used actively, with the whole as the subject and the parts as the object, and it never takes the word "of": "the committee comprises twelve members" (the whole comprises the parts) is exactly this correct pattern. "Compose," by contrast, means "to make up," and by strict usage runs in the opposite direction, with the parts as the subject: "twelve members compose the committee," not the reverse. Option 1, "is comprised of," is extremely common in everyday speech and increasingly accepted informally, but strict formal usage treats it as incorrect, since it forces "comprise" into a passive construction with "of," which contradicts the word\'s own built-in meaning of "to include" (a whole cannot be passively "included of" its parts). Option 3, "comprise of," compounds the same error in the wrong direction, using the parts as the subject while still incorrectly attaching "of." Option 4 misapplies "compose" with the whole as the subject and the parts as the object, exactly reversing the direction that word requires. Fastest route: remember that "comprise" always runs whole-to-parts and never takes "of," while "compose" always runs parts-to-whole; testing whether "of" is present and which noun is the subject settles all four options at once.'
  },
  {
    id: 'apti-verbal-h8',
    q: 'The minister\'s speech, though ______ in its promises, was widely seen as ______ on specifics, leaving journalists with more questions than answers.',
    options: ['expansive .. vague', 'vague .. expansive', 'brief .. detailed', 'measured .. precise'],
    answer: 0,
    marks: 1,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The sentence\'s final clause, "leaving journalists with more questions than answers," describes an outcome of frustration and unresolved detail, so the two blanks must together set up a contrast that produces exactly that result: a speech that sounded generous or wide-ranging in what it promised, but that supplied little concrete substance about how those promises would be met. "Expansive" (broad, generously wide-ranging) for the promises, paired with "vague" (unclear, lacking specifics) for the details, produces precisely this contrast and logically causes the stated outcome. "Vague .. expansive" reverses the roles nonsensically, claiming the promises were unclear but the specifics were extensive, which would not leave journalists confused about specifics at all. "Brief .. detailed" is internally consistent as a description but produces the opposite of the stated outcome, since detailed specifics would answer journalists\' questions, not multiply them. "Measured .. precise" describes a careful, exact speech, which directly contradicts a speech that leaves an audience with unanswered questions. Fastest route: read the consequence clause first ("more questions than answers") and work backward to find the only word pair whose logical contrast actually produces that specific effect, rather than picking words that merely sound formal or ministerial in register.'
  },
  {
    id: 'apti-verbal-h9',
    q: 'Passage: "Sales of the company\'s flagship product fell 12% last quarter. Critics claim this proves the product has lost its appeal among consumers. The company disputes this, arguing the decline has other causes." Which finding, if true, would most strengthen the company\'s argument that the decline is NOT due to loss of consumer appeal?',
    options: [
      'A key competitor launched a similar product at a lower price during the same quarter.',
      'The company\'s marketing budget for the flagship product was cut by 20% at the start of the quarter.',
      'Sales of the flagship product fell in every region where the company operates.',
      'Independent customer satisfaction surveys for the flagship product this quarter showed ratings unchanged from the previous quarter, matching historical highs.'
    ],
    answer: 3,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The company needs to rebut a specific claim: that consumer APPEAL for the product has dropped. Option 4 measures appeal directly and finds it unchanged — customer satisfaction is still at historical highs — which most precisely undercuts the critics\' specific claim, since if consumers still rate the product as highly as ever, the sales dip cannot be attributed to reduced appeal. Option 1 is a plausible alternative cause (price competition) but, standing alone, does not rule out that appeal also declined somewhat relative to the flashier new entrant; it explains a possible trigger for switching without directly measuring whether appeal itself held steady, making it weaker and less direct than option 4. Option 2 is genuinely ambiguous: a marketing budget cut could just as easily be read as evidence supporting the critics (less visibility naturally depresses sales, and could itself be a response to declining interest) as it could support the company, so it does not cleanly strengthen either side. Option 3 actually strengthens the CRITICS, not the company: a decline occurring uniformly across every region is a hallmark of a broad, systemic drop in appeal, rather than a localized effect tied to a single region\'s competitor or economic condition, so it is the opposite of what the company needs. Fastest route: identify precisely which word in the dispute is being contested — here, "appeal" — and prefer the option that measures that exact quantity directly over options that only supply a plausible alternative story.'
  },
  {
    id: 'apti-verbal-h10',
    q: 'Passage: "A city\'s new bike-lane network was completed in March. Between April and September, the number of reported cycling accidents on those streets fell by 30% compared to the same six months the previous year. Bicycle traffic on those streets, measured by automated counters, increased by 45% over the same period." Which of the following is the most defensible inference from this passage?',
    options: [
      'The bike lanes caused a reduction in the accident rate per cyclist on those streets.',
      'The accident count fell even as recorded bicycle traffic on those same streets rose, over the same comparison period.',
      'Cycling has become completely safe on every street in the city.',
      'The bike lanes are the only factor responsible for the change in accident numbers.'
    ],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Option 2 states only the two measured facts side by side, exactly as reported: accident counts dropped 30% while bicycle traffic on the same streets rose 45% in the same period, with no added interpretation. This is the safe, fully supported inference. Option 1 sounds compelling — and is likely true in the real world — but overreaches: it converts a raw accident-count comparison into a rate-per-cyclist claim (accidents per cyclist would have fallen even more sharply than 30%, since far more cyclists rode with fewer total accidents), and it assigns causation to "the bike lanes" specifically, when the passage never isolates the lanes from other simultaneous factors like weather, enforcement changes, or vehicle traffic shifts. Option 3 is a wild overreach in scope ("every street in the city," "completely safe") far beyond what a 30% accident reduction on specific streets could ever establish. Option 4 claims exclusive causation ("the only factor"), which the passage cannot support since it presents only two correlated statistics and rules out no alternative explanations. Fastest route: whenever a passage gives two raw counts (not rates) moving in opposite directions, the only fully safe inference is to state that exact juxtaposition; converting counts into an implied per-unit rate, or attaching a cause, is where the tempting but unsupported inferences slip in.'
  }
);


window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-data-spatial';}).questions.push(
  {
    id: 'apti-data-spatial-h1',
    q: 'Table 1 (Revenue, Rs. lakh): Branch X: 2022 = 80, 2023 = 100; Branch Y: 2022 = 60, 2023 = 90. Table 2 (Cost, Rs. lakh): Branch X: 2022 = 60, 2023 = 70; Branch Y: 2022 = 50, 2023 = 60. Using both tables, find the ratio of Branch X\'s profit margin (profit/revenue) to Branch Y\'s profit margin, for the year 2023.',
    options: ['9 : 10', '10 : 9', '3 : 1', '1 : 1'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'This question requires pulling one figure from each of the two linked tables before any ratio can be formed. For 2023, Branch X: profit = revenue - cost = 100 - 70 = 30, so its profit margin is 30/100 = 0.30 (30%). Branch Y: profit = 90 - 60 = 30, so its profit margin is 30/90 = 1/3 (33.33%). Notice both branches earn the identical absolute profit of Rs. 30 lakh — this is the trap, since a hasty reader might conclude the margins (and hence the ratio) are equal simply because the profits are equal, ignoring that margin depends on revenue too. The actual ratio is 0.30 : (1/3), which multiplying both sides by 3 gives 0.9 : 1, i.e. 9 : 10. Fast route: convert both margins to a common fraction form immediately (30/100 and 30/90) and cross-multiply the ratio (30x90 : 30x100 = 9:10 after canceling the common 30 and the common factor of 10) rather than converting to decimal percentages, which invites rounding errors. The equal-profit trap is exactly why this margin ratio is not 1:1 despite both branches earning the same absolute profit that year.'
  },
  {
    id: 'apti-data-spatial-h2',
    q: 'Two industries, P and Q, reported the following production index values (base year 100): 2020: P = 100, Q = 100. 2021: P = 120, Q = 150. Between which pair of years, using only this data, did industry P show a HIGHER percentage growth than industry Q over the SAME one-year period?',
    options: ['2020 to 2021 (P grew faster than Q)', '2020 to 2021 (Q grew faster than P)', 'Both grew at exactly the same rate', 'Cannot be determined from the data given'],
    answer: 1,
    marks: 1,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'From 2020 to 2021, P\'s index moved from 100 to 120 and Q\'s moved from 100 to 150. Since both start from the same base value of 100, the percentage growth can be read directly from the new values without any division: P grew by 20 points on a base of 100, i.e. 20%, and Q grew by 50 points on the same base of 100, i.e. 50%. Because the starting values are identical here, the comparison collapses to simply comparing the two ending index values directly — Q\'s 150 exceeds P\'s 120, so Q grew faster, not P. Fast route: whenever a growth comparison starts from the same base value for both quantities, skip computing percentages altogether and just compare the ending values directly, since the base cancels out of the ratio entirely. The trap here is the phrasing of option 1, which sounds like the "obvious" default answer pattern from similar questions, tempting a rushed reader who assumes without checking which of the two actually grew faster; the data unambiguously shows Q, not P, had the higher growth.'
  },
  {
    id: 'apti-data-spatial-h3',
    q: 'In a college of 100 students, 50 play cricket, 40 play football, and 30 play hockey. 15 play both cricket and football, 12 play both football and hockey, 10 play both cricket and hockey, and 5 play all three sports. How many students play NONE of the three sports? (Enter your numerical answer.)',
    options: [],
    answer: 12,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Use the inclusion-exclusion principle for three sets: |A U B U C| = |A| + |B| + |C| - |A intersect B| - |B intersect C| - |A intersect C| + |A intersect B intersect C|. Substituting: 50 + 40 + 30 - 15 - 12 - 10 + 5 = 120 - 37 + 5 = 88. This gives the number of students who play at least one sport. The number playing none is the complement within the total: 100 - 88 = 12. Fast route: add the three single-set totals, subtract the three pairwise overlaps (each of which was double-counted once), then add back the triple overlap (which was subtracted three times as part of the pairwise terms but should only be excluded, so it needs restoring once) — this add-subtract-add pattern is the entire inclusion-exclusion formula for three sets, and it always ends with a single addition of the triple-overlap term. The trap is forgetting the final "+5" term (the all-three overlap), which if omitted would wrongly give 83 people playing at least one sport and 17 playing none — a very tempting wrong answer that results from only subtracting pairwise overlaps without correcting for the triple-counted center region.'
  },
  {
    id: 'apti-data-spatial-h4',
    q: 'A square sheet of paper is folded exactly in half vertically, and then the resulting rectangle is folded exactly in half horizontally, producing a smaller square made of 4 layers. A hole is punched exactly at the one corner of this small folded square where BOTH fold creases meet (i.e., the corner diagonally opposite to the two open, unfolded edges). How many distinct holes appear on the sheet once it is completely unfolded? (Enter your numerical answer.)',
    options: [],
    answer: 1,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The usual rule "n folds give 2^n layers, and a single punch away from every crease gives 2^n holes" only holds when the punch point is strictly inside all folded edges. Here, the punch point is exactly the corner where BOTH creases intersect — and that specific point is precisely the geometric CENTER of the original, fully unfolded square sheet, because both folds are reflections that map the sheet\'s center to itself. Since a reflection always fixes points lying exactly on its own fold line, and this corner lies on both fold lines simultaneously, all 4 layers at that corner correspond to the exact same physical point on the original sheet, not four different points. Punching through all 4 layers there therefore only ever removes material from that single, self-corresponding location, so unfolding reveals exactly 1 hole, sitting precisely at the center of the sheet. Fast route: before applying the standard 2^n layers-equals-holes shortcut, always check whether the punch point lies on a crease (which merges holes across that fold) or, more extremely, on the intersection of ALL creases (which collapses all layers to a single point) — the doubling rule is a default, not an unconditional law. The trap is applying "2 folds means 4 holes" mechanically without checking the punch location against the fold lines themselves.'
  },
  {
    id: 'apti-data-spatial-h5',
    q: 'A die is placed in two different positions. Position 1: top face shows 2, front face shows 3, right face shows 5. Position 2: top face shows 2, front face shows 4, right face shows 6. (This is not necessarily a standard die where opposite faces sum to 7 — treat it as an unknown die and reason only from the two views given.) Which number lies on the face opposite to the face showing 2?',
    options: ['3', '4', '1', '6'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Every face of a cube is adjacent (shares an edge) with exactly 4 of the other 5 faces, and opposite to exactly 1. So, to find the face opposite to the face showing 2, the fastest method is to identify every face that has ever been seen adjacent to the "2" face across all given views, and eliminate them — whatever number never appears as an adjacent neighbour of "2" must be the one opposite it. In Position 1, the "2" face (top) is directly adjacent to the front face (3) and the right face (5), since top, front and right all meet at a common corner and are pairwise adjacent. In Position 2, the "2" face (still top) is adjacent to the front face (4) and the right face (6). Combining both views, the faces confirmed adjacent to "2" are {3, 5, 4, 6} — four distinct numbers, which is the maximum possible number of neighbours a single face can have. Since the six faces must be numbered using six distinct values and 2, 3, 4, 5, 6 have all already been placed (as the "2" face itself, plus its four confirmed neighbours), the only remaining number, 1, cannot be adjacent to 2, and must therefore be the face opposite it. Fast route: as soon as four distinct neighbours of a face have been identified across any combination of views, stop — the opposite face is forced by elimination, with no need for a third view. The trap is assuming a standard opposite-sum-of-7 die (which would also give 1, but only by lucky coincidence here) instead of actually verifying the adjacency logic, which is the only method that works when the die is explicitly stated to be non-standard.'
  },
  {
    id: 'apti-data-spatial-h6',
    q: 'Table (Population, in lakh): City A = 24, City B = 36, City C = 18, City D = 30. Table (Area, in sq. km): City A = 120, City B = 150, City C = 90, City D = 100. Using both tables, which city has the HIGHEST population density (population per unit area)?',
    options: ['City A', 'City B', 'City C', 'City D'],
    answer: 3,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Population density requires combining one value from each of the two linked tables (population divided by area) for every city before any comparison is valid — comparing raw population or raw area alone, from a single table, answers a different question entirely. Compute each ratio as a simple fraction: City A = 24/120 = 1/5 = 0.20; City B = 36/150 = 6/25 = 0.24; City C = 18/90 = 1/5 = 0.20; City D = 30/100 = 3/10 = 0.30. Comparing these four decimals directly, City D has the highest density at 0.30 (30,000 per sq. km if population is read in lakh and area in sq. km, though the exact unit does not matter for comparison purposes). Fast route: reduce each population-to-area pair to a simple fraction with small numbers before comparing, rather than computing unwieldy decimals from the raw lakh figures; A and C both reduce cleanly to 1/5, immediately telling you they are tied for third, so only B and D need a closer look. The trap is picking City B, which has by far the largest raw population (36 lakh, the highest of all four) — a rushed reader who conflates "most populous" with "most densely populated" ignores that B is also spread over the largest area (150 sq. km), diluting its density below City D\'s.'
  },
  {
    id: 'apti-data-spatial-h7',
    q: 'Company P\'s revenue grew from Rs. 175 crore in 2020 to Rs. 210 crore in 2021. Company Q\'s revenue grew from Rs. 240 crore in 2020 to Rs. 276 crore in 2021. Which company recorded the higher PERCENTAGE growth in revenue over this period?',
    options: ['Company P', 'Company Q', 'Both grew by the same percentage', 'Cannot be determined from the data given'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Percentage growth must be measured against each company\'s OWN starting value, not compared by the size of the absolute increase. Company P increased by 210 - 175 = Rs. 35 crore on a base of 175, which is 35/175 = 1/5 = 20%. Company Q increased by 276 - 240 = Rs. 36 crore on a base of 240, which is 36/240 = 3/20 = 15%. Even though Q\'s absolute increase (Rs. 36 crore) is larger than P\'s (Rs. 35 crore), P\'s percentage growth (20%) is clearly higher than Q\'s (15%), because P grew from a much smaller base. Fast route: to compare two percentage growths without full division, cross-multiply the "new value x other base" pairs: compare 210 x 240 against 276 x 175. Here 210 x 240 = 50,400 and 276 x 175 = 48,300; since 50,400 > 48,300, P\'s growth ratio (210/175) exceeds Q\'s (276/240), confirming P grew faster without ever computing an explicit percentage. The trap is judging growth by the larger absolute increase (Rs. 36 crore for Q edges out Rs. 35 crore for P), which completely ignores the very different bases the two increases are measured against — a classic error when skimming a table for the "bigger number" instead of the correct ratio.'
  },
  {
    id: 'apti-data-spatial-h8',
    q: 'In a survey of 200 readers about three newspapers A, B and C: 100 read A, 80 read B, 60 read C. 30 read both A and B, 20 read both B and C, 25 read both A and C, and 10 read all three newspapers. How many readers read EXACTLY TWO of the three newspapers (not all three, not just one)? (Enter your numerical answer.)',
    options: [],
    answer: 45,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'The given pairwise overlap figures (30, 20, 25) each include the readers who read ALL THREE newspapers, since anyone reading all three is automatically counted in every pairwise overlap as well. To isolate the readers who read EXACTLY two, the all-three group (10) must be subtracted out of each pairwise figure before adding them: exactly-A-and-B-only = 30 - 10 = 20; exactly-B-and-C-only = 20 - 10 = 10; exactly-A-and-C-only = 25 - 10 = 15. Summing these three "exactly two" regions: 20 + 10 + 15 = 45. Fast route: never add the raw pairwise overlap numbers directly when a question asks for "exactly two," since each pairwise figure is contaminated by the all-three group by construction — always subtract the triple-overlap once from each pairwise number first, then add. The trap is answering with the raw sum 30 + 20 + 25 = 75, which overstates the true exactly-two count because it triple-counts the 10 all-three readers within all three pairwise terms (each of them is wrongly included as "exactly two" three times over, once in each pair), when they should not appear in the exactly-two count at all.'
  },
  {
    id: 'apti-data-spatial-h9',
    q: 'A clock\'s image, when viewed in a vertical mirror, shows the time as 8:20. What is the angle between the hour hand and the minute hand at the ACTUAL time (not the mirror image)?',
    options: ['130 degrees', '110 degrees', '150 degrees', '100 degrees'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'This problem chains two separate rules and must be solved in the correct order. First, convert the mirror-image time to the actual time using the identity: actual time + mirror time = 11 hours 60 minutes (i.e., 12:00, expressed this way so both sides can be handled purely in hours and minutes without carrying). Mirror time is 8:20, so actual time = 11:60 - 8:20 = 3:40 — subtract minutes first (60 - 20 = 40) then hours (11 - 8 = 3). Only now, with the correct actual time in hand, apply the clock-angle formula: angle = |30H - 5.5M| with H = 3, M = 40, giving |90 - 220| = 130 degrees, which is already the smaller of the two possible angles (130 and 360 - 130 = 230), so no further adjustment is needed. Fast route: always perform the mirror-to-actual time conversion as one full subtraction from 11:60 in a single step, rather than converting to total minutes past midnight and back, which is more error-prone; only after obtaining a clean H:M value should the angle formula be applied. The trap is applying the clock-angle formula directly to the mirror-displayed time (8:20), which gives a real but completely irrelevant angle for a clock that was never actually showing that time — the question explicitly asks for the angle at the ACTUAL time, a distinction that is easy to skip past when solving quickly.'
  },
  {
    id: 'apti-data-spatial-h10',
    q: 'The figure below shows a flat net of six squares that, when folded along the internal edges, forms a cube. When folded into a cube, which number lies on the face opposite the face numbered 3?',
    figure: '<svg viewBox="0 0 160 120" width="100%" style="max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="40" width="40" height="40" fill="none" stroke="currentColor"/><text x="20" y="65" font-size="18" text-anchor="middle" fill="currentColor">2</text><rect x="40" y="40" width="40" height="40" fill="none" stroke="currentColor"/><text x="60" y="65" font-size="18" text-anchor="middle" fill="currentColor">4</text><rect x="80" y="40" width="40" height="40" fill="none" stroke="currentColor"/><text x="100" y="65" font-size="18" text-anchor="middle" fill="currentColor">5</text><rect x="120" y="40" width="40" height="40" fill="none" stroke="currentColor"/><text x="140" y="65" font-size="18" text-anchor="middle" fill="currentColor">1</text><rect x="40" y="0" width="40" height="40" fill="none" stroke="currentColor"/><text x="60" y="25" font-size="18" text-anchor="middle" fill="currentColor">3</text><rect x="80" y="80" width="40" height="40" fill="none" stroke="currentColor"/><text x="100" y="105" font-size="18" text-anchor="middle" fill="currentColor">6</text></svg>',
    options: ['6', '5', '1', '2'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The net has a horizontal strip of four consecutive squares — numbered 2, 4, 5, 1 from left to right — with two extra squares folded off this strip: the 3 sits above the second square (4), and the 6 sits below the third square (5). For any strip of four squares attached consecutively in a straight line within a cube net, folding always brings the 1st and 3rd squares to opposite faces, and the 2nd and 4th squares to opposite faces — this is because folding a 4-long strip wraps it exactly halfway around the cube, landing the 1st and 3rd (two squares apart) directly across from each other. Applying this to the strip 2, 4, 5, 1: the 1st and 3rd give 2 opposite 5, and the 2nd and 4th give 4 opposite 1. That accounts for four of the six faces, leaving only 3 and 6 unpaired. Since a cube has exactly three pairs of opposite faces and two pairs are already determined, the two squares left over, 3 and 6, must be opposite each other by elimination, even though they are not part of the same straight strip and are attached to the net at different points (3 above the "4" square, 6 below the "5" square). Fast route: always locate the single longest straight run of four or more squares first and resolve its 1st-3rd and 2nd-4th opposite pairs immediately, then assign any remaining squares as opposite by elimination rather than attempting to mentally fold the entire net at once.'
  }
);


(function(){ var t = window.GATE_DATA.questions['apti'].topics.find(function(t){return t.id==='apti-verbal';});
  t.theory.deep += "\n\nSYLLOGISM VALID INFERENCE PATTERNS\nGATE syllogism questions test whether a conclusion is NECESSARILY true in every diagram consistent with the premises — not merely plausible. Draw All A are B as circle A fully inside B, No A is B as two disjoint circles, and Some A are B as two circles forced to overlap somewhere (with the rest of each circle free).\n\n1. All A are B, All B are C gives All A are C (valid — the chain rule). A sits inside B, which sits inside C, so A sits inside C.\n2. All A are B, All C are B gives NO valid conclusion between A and C. Both A and C sit inside B, but nothing forces them to touch each other — they could be disjoint subsets of B. This is the single most common GATE trap: two \"All\" statements sharing the same predicate look like they chain, but they do not.\n3. Some A are B, All B are C gives Some A are C (valid). The overlap region between A and B is entirely inside B, and all of B is inside C, so that overlap region is also inside C — meaning some A (specifically, the A's in the overlap) are definitely C.\n4. No A are B, Some B are C gives Some C are not A (valid). The B's that overlap with C are, by the first premise, guaranteed to be outside A (since A and B are disjoint). Those overlapping C's therefore lie outside A, which is exactly \"some C are not A.\"\n   GATE TRAP: do not strengthen conclusion 4 to \"No C is A\" — only the slice of C that overlaps B is proven to avoid A; the rest of the C circle is free to overlap A or not, so the universal form is not justified.\n5. All A are B, Some C are A gives Some C are B (valid). The A's that overlap C are a subset of B (by premise 1), so that same overlap region is inside B, giving \"some C are B.\"\n\nCLASSIC INVALID PATTERNS (do not fall for these)\n• All A are B, Some B are C. No conclusion follows about A and C: the C's that overlap B might avoid the A-region inside B entirely, since only PART of B is A.\n• Some A are B, Some B are C. No conclusion follows: the \"some\" overlaps with B in the two premises need not be the same slice of B, so A and C may never touch.\n• No A are B, No B are C. No conclusion follows about A and C: both are merely disjoint from B, which says nothing about whether A and C overlap each other.\n• All A are B, No B are C gives No A is C (valid, worth contrasting with the invalid ones above) — since every A is inside B, and B is entirely outside C, every A is also outside C.\n\n1. Draw the most restrictive diagram consistent with the premises (e.g. the smallest possible overlap for a \"Some\" statement).\n2. Draw the loosest diagram consistent with the premises (e.g. the largest possible overlap, or the overlap placed in the least helpful position).\n3. If the candidate conclusion holds in BOTH diagrams, it is valid; if it fails in even one, it is not — regardless of how \"likely\" it seems.\n\nKEY: \"Some\" only guarantees a non-empty overlap somewhere — it never tells you the overlap's size or exact position, so never assume a \"Some\" premise behaves like an \"All\" premise for the rest of its circle."; })();
