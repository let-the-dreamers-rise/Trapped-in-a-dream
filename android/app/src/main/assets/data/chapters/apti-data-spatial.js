// Textbook chapter: Data Interpretation & Spatial Reasoning — the General
// Aptitude section's chart-arithmetic and visual-reasoning family. Written
// directly (no subagent) to match the depth and voice of the other chapters
// in data/chapters/.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['apti-data-spatial'] = {
  figs: [
    {
      id: 'pie-angle-anchors',
      caption: 'Fast angle-to-percent anchors for a pie chart: memorise these six instead of dividing by 360 every time.',
      svg: '<svg viewBox="0 0 240 120" width="100%" style="max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" stroke-width="1"/><path d="M60,60 L60,15 A45,45 0 0,1 100.9,37.5 Z" fill="none" stroke="currentColor" stroke-width="1"/><g font-size="8" fill="currentColor"><text x="130" y="20">36&#176; = 10%</text><text x="130" y="35">72&#176; = 20%</text><text x="130" y="50">90&#176; = 25%</text><text x="130" y="65">108&#176; = 30%</text><text x="130" y="80">144&#176; = 40%</text><text x="130" y="95">180&#176; = 50%</text></g></svg>'
    },
    {
      id: 'mirror-vs-water-image',
      caption: 'A mirror image flips left-right about a VERTICAL axis; a water image flips top-bottom about a HORIZONTAL axis. Never the same transformation.',
      svg: '<svg viewBox="0 0 240 110" width="100%" style="max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="20" fill="currentColor" text-anchor="middle"><text x="40" y="35">F</text><line x1="70" y1="10" x2="70" y2="60" stroke="currentColor" stroke-width="1"/><text x="100" y="35" transform="scale(-1,1) translate(-200,0)">F</text></g><g font-size="20" fill="currentColor" text-anchor="middle"><text x="40" y="95">F</text><line x1="10" y1="75" x2="70" y2="75" stroke="currentColor" stroke-width="1"/><text x="40" y="115" transform="scale(1,-1) translate(0,-198)">F</text></g><g font-size="7" fill="currentColor"><text x="130" y="35">mirror: left-right flip</text><text x="130" y="95">water: top-bottom flip</text></g></svg>'
    },
    {
      id: 'painted-cube-classes',
      caption: 'An n×n×n painted cube splits into four fixed classes of unit cube by how many painted faces each carries.',
      svg: '<svg viewBox="0 0 220 90" width="100%" style="max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1" fill="none"><rect x="10" y="10" width="50" height="50"/><circle cx="20" cy="20" r="4"/></g><g font-size="7" fill="currentColor"><text x="10" y="75">corner: 3 faces (always 8)</text><text x="80" y="30">edge: 2 faces = 12(n-2)</text><text x="80" y="45">face: 1 face = 6(n-2)&#178;</text><text x="80" y="60">interior: 0 faces = (n-2)&#179;</text></g></svg>'
    }
  ],
  text: `
WHY THIS CHAPTER EXISTS AS ITS OWN SUBJECT

This chapter bundles two families that look unrelated at a glance — DATA INTERPRETATION (reading tables, bar charts, pie charts, and line graphs, then computing percentages, ratios, averages, and growth rates from them) and SPATIAL REASONING (mirror and water images, dice, painted cubes, paper folding, cube nets, and figure counting) — but both share the same underlying skill: converting a VISUAL representation into a small, exact arithmetic or logical statement, then computing on that statement rather than on the picture itself. A pie chart's wedge is not "big" or "small", it is angle/360 of a total; a folded, punched sheet of paper is not "roughly symmetric", it is exactly 2^(number of folds) holes reflected across exact crease lines. Every trap in this chapter is a trap of MISREADING the picture, not of failing to compute — which is exactly why fluency here can be built almost entirely through fixed rules and practice, independent of raw mathematical difficulty.

1. Data interpretation is arithmetic wrapped in a chart. The arithmetic itself — percentages, ratios, averages, growth rates — is school-level; what GATE tests is whether you extract the RIGHT two numbers from the chart before computing, under time pressure, without a chart-reading error destroying an otherwise correct calculation.
2. Spatial reasoning has genuinely FIXED rule sets, not open-ended visualisation. A mirror flips left-right, a water reflection flips top-bottom, a standard die's opposite faces sum to seven, a painted cube's unit cubes split into exactly four countable classes, a paper fold doubles layers — every spatial question in this chapter's question bank reduces to applying one of a short list of such rules correctly, never to free-form 3D imagination.
3. Because both families are RULE-DRIVEN rather than concept-driven, this chapter is organised as a catalogue: each section states the rule, derives WHY it is true (so it survives being asked in an unfamiliar phrasing), and then drills the exact question patterns GATE has used to test it.

READING A CHART WITHOUT MISREADING IT

Before any computation, every chart-based question depends on correctly identifying four things, and skipping this step is the single most common source of an otherwise "correct" calculation producing a wrong answer.

1. Read the chart's TITLE first, to know what is actually being measured — "Revenue" and "Profit" plotted on structurally identical-looking bar charts are entirely different quantities, and confusing them invalidates every subsequent computation.
2. Read BOTH axis labels and their UNITS — a value plotted against "sales in lakhs" is not the same number as "sales in units", and mixing the two mid-calculation silently multiplies or divides the final answer by a factor of 100,000.
3. Check where the Y-AXIS actually starts. If it does not start at zero (marked by a zig-zag "break" symbol near the origin), bar heights visually EXAGGERATE the real differences between categories — always read the labelled numeric values, never estimate purely by comparing bar heights, when a broken axis is present.
4. For a MULTI-SERIES chart (several bars or lines per category), match each colour or pattern in the legend to its series BEFORE reading any individual data point — misassigning a series to the wrong colour silently swaps every reading for that series.

GATE TRAP: Truncated or broken y-axes (marked with a zig-zag break near the bottom) exist specifically to make small real differences look large. Always check for a break symbol near the axis origin, and if present, treat visual bar-height comparisons with extra caution — rely on the actual labelled values instead of eyeballed heights.

GATE TRAP: Dual-axis charts (two different y-axes, often one on the left in one unit and one on the right in a different unit) can make two completely unrelated-scale series look like they move together. Always check which axis each series belongs to before claiming a trend or correlation between them — matching visual slopes on different scales proves nothing about the real relationship between the two series.

PERCENTAGES, RATIOS, AND SHARES FROM A CHART

The four computations below cover the overwhelming majority of raw data-interpretation arithmetic, and every one of them reduces to a single formula applied to two numbers correctly read off the chart.

1. PERCENTAGE CHANGE between an old value and a new value is (new − old)/old × 100 — always divide by the OLD (starting) value, never the new value, since "percentage change" is defined relative to where a quantity started, not where it ended.
2. RATIO of two readings is simplified to lowest terms by dividing both by their GCD — a ratio of 40:80 is reported as 1:2, not left as 40:80, because GATE options are given in lowest-terms form and a non-reduced ratio will not match any option.
3. AVERAGE over a period is (sum of all values)/(number of values) — a straightforward mean, but one that silently assumes every period contributed equally, which matters the moment periods differ in size (covered under weighted averages below).
4. SHARE of one category out of a total is category/total × 100 — structurally identical to a pie-chart percentage, whether or not the chart is actually drawn as a pie.

actual value = (percentage / 100) × total

GATE TRAP: A percentage-point change and a percent change are different numbers, and data-interpretation questions are built specifically to test this distinction. If market share rises from 20% to 30%, that is a rise of 10 PERCENTAGE POINTS (simple subtraction: 30 − 20 = 10), but it is a 50% RELATIVE increase in market share itself (10/20 × 100 = 50%). Always check exactly which phrasing — "percentage point" versus "percent" or "percentage increase" — the question uses before picking an option; an option offering the wrong one of these two numbers is the standard trap answer in this exact question type.

WORKED EXAMPLE: A company's defect rate fell from 8% to 5% of units produced. The percentage-point drop is 8 − 5 = 3 percentage points, a plain subtraction of the two given percentages, requiring no division. The percent decrease (relative change) is (change/original) × 100 = (3/8) × 100 = 37.5%. Recognise instantly which phrase the question uses: "percentage points" always means simple subtraction of the two percentage figures; "percent decrease/increase" always means (difference/original) × 100. Without this fixed vocabulary-to-formula mapping, it is easy to compute (3/8)×100 for BOTH quantities by mistake, or to submit only one number when two separate options need the other.

WHEN "PERCENTAGE OF TOTAL" IS NOT ENOUGH ON ITS OWN

When a table or chart gives values purely as percentages (or as a pure ratio) of some total, you CANNOT recover the actual numeric values unless the actual total — or at least one actual value — is given somewhere else in the question. Percentages and ratios are pure RELATIONSHIPS, never absolute quantities, until anchored to a real number.

GATE TRAP: A ratio read off a chart (for example, "Product A sold twice as much as Product B") tells you nothing about actual quantities unless anchored to one real figure elsewhere in the chart or table. Do not assume round actual numbers just because the ratio itself looks clean — a 2:1 ratio is equally consistent with (200, 100) and with (2000000, 1000000).

MULTI-CHART AND MULTI-TABLE PROBLEMS: CHAINING TWO SHARES

A GATE data-interpretation set frequently splits information across TWO separate charts or tables that must be combined — one chart giving a category's share of an overall total, and a second chart giving a sub-category's share WITHIN that first category. The technique is to multiply the two fractions (or percentages) together, since the second percentage is a share OF the first category, not of the grand total directly.

1. Read the FIRST chart to find the category's value as a fraction (or percentage) of the grand total.
2. Read the SECOND chart to find the sub-category's value as a fraction (or percentage) WITHIN that category (not within the grand total).
3. Multiply: sub-category's share of the grand total = (category's share of total) × (sub-category's share of category).
4. Apply this combined fraction to the grand total's actual numeric value to get the sub-category's actual value.

WORKED EXAMPLE: A pie chart shows a company's total annual expenditure of Rs. 5,00,000 split as Marketing 20%, R&D 30%, Operations 35%, and Admin 15%. A second chart shows that within R&D expenditure specifically, 40% goes towards employee salaries. R&D's share of the total is 30% = 0.30. Employee salaries' share WITHIN R&D is 40% = 0.40. Combined share of the grand total = 0.30 × 0.40 = 0.12, i.e. 12%. R&D salaries = 0.12 × 5,00,000 = Rs. 60,000.

GATE TRAP: The single most common error in a two-chart problem is applying the SECOND chart's percentage directly to the GRAND TOTAL instead of to the first category's value — in the worked example above, computing 40% of 5,00,000 = 2,00,000 (wrong) instead of 40% of the R&D slice (30% of 5,00,000 = 1,50,000), giving the wrong final answer of 2,00,000 instead of the correct 60,000. Always confirm whether a percentage is stated "of the total" or "of [some sub-group]" before applying it.

PIE CHARTS: ANGLE-TO-VALUE CONVERSION

A pie chart's full circle of 360 degrees represents the total, so a sector of angle A represents A/360 of the total. Because 360 degrees corresponds to 100%, degrees and percent convert directly: 3.6 degrees = 1%.

value = (degrees / 360) × total  =  (percentage / 100) × total

1. Memorise these fast angle-to-percent anchors instead of dividing by 360 every single time: 36° = 10%, 72° = 20%, 90° = 25%, 108° = 30%, 144° = 40%, 180° = 50%.
2. To convert any OTHER angle, scale from the nearest anchor rather than dividing from scratch — 54° sits exactly halfway between 36° (10%) and 72° (20%), so it converts to 15% without any division at all.
3. When comparing two pie slices DIRECTLY against each other (not against the whole), skip converting either one to an absolute value — just compare their degree measures or percentages directly, since the total cancels out in a ratio.

[[FIG:pie-angle-anchors]]

WORKED EXAMPLE: A pie chart shows total sales of 7200 units, with the "Electronics" slice occupying 108 degrees. Fast route: 108° = 30% (a memorised anchor, since 108/3.6 = 30), so value = 0.30 × 7200 = 2160. Slow route: compute 108/360 × 7200 as a single long division to reach the same 2160 — the fast route reaches the identical answer without performing the division at all.

GATE TRAP: When a question gives TWO separate pie-chart sectors and asks for the difference between their values, compute EACH sector's value first (angle/360 × total for each), then subtract — do not subtract the two angles and then convert the resulting angle difference, since that only works correctly because both sectors share the identical total; for two DIFFERENT charts with different totals, angle differences cannot be combined this way at all.

BAR CHARTS, LINE GRAPHS, AND GROWTH-RATE COMPARISONS

For a line graph asking which period had the HIGHEST PERCENTAGE growth, compare each interval's growth DIVIDED BY its own starting value — never compare the raw (absolute) increase across periods, since a bigger absolute jump can still be a SMALLER percentage increase if its starting base is much larger.

1. For every candidate interval, compute (ending value − starting value)/(starting value) for that interval specifically.
2. Do NOT compare the raw increases directly against each other — a rise from 50 to 60 (a 20% increase) beats a rise from 75 to 80 (a 6.7% increase) despite the second interval's absolute increase (5) being smaller than what it might look like, and despite both increases looking visually similar on a chart.
3. When several intervals are close, use cross-multiplication instead of computing every decimal percentage: interval A's growth exceeds interval B's growth if (newA − oldA) × oldB > (newB − oldB) × oldA — this avoids computing either percentage as a decimal at all.

GROWTH RATE COMPARISON WITHOUT FULL DIVISION

1. To compare which of two quantities grew faster between two years, compare (new − old)/old as FRACTIONS using cross-multiplication instead of computing decimal percentages: A grew faster than B if (newA − oldA) × oldB > (newB − oldB) × oldA.
2. Approximate a percentage change fast by rounding to the nearest convenient fraction — a rise from 240 to 288 is 48/240 = 1/5 = 20%, spotted instantly by noticing 48 is exactly one-fifth of 240, with no long division needed.
3. When comparing MANY years or categories at once (as in a bar chart with several bars), rank candidates by eyeballing bar-height RATIOS first, and compute exact percentages only for the top two or three contenders that look genuinely close — this avoids wasting time computing an exact percentage for every bar when most are clearly not the answer.
4. FAST ROUTE: cross-multiply the two differences-over-bases instead of converting both to decimals. SLOW ROUTE: computing each percentage to two decimal places and then comparing them.
5. CAGR (compound annual growth rate) shortcut: for compounding growth from V0 to Vn over n years, CAGR = (Vn/V0)^(1/n) − 1; for quick estimation without a calculator, use the RULE OF 70 — a quantity doubling in n years corresponds roughly to a CAGR of 70/n percent.

WORKED EXAMPLE: Sales grew from 1500 in Year 1 to 1800 in Year 2 for Product A, and from 2000 to 2300 in the same period for Product B. Which product grew faster in percentage terms? Fast route: cross-multiply the differences over the bases: 300 × 2000 = 6,00,000 versus 300 × 1500 = 4,50,000. Since 6,00,000 > 4,50,000, Product A's percentage growth (300/1500 = 20%) beats Product B's (300/2000 = 15%) — confirmed without computing either decimal directly. Slow route: convert both to exact percentages (20% and 15%) via two separate divisions, then compare — reaching the identical conclusion by a longer path.

MULTI-YEAR CHAINED PERCENTAGE CHANGES

When a table lists YEAR-ON-YEAR percentage changes rather than absolute values, chain them MULTIPLICATIVELY across years, never additively — each year's change must be applied to that year's already-changed value, exactly like a successive-percentage-change problem.

1. A firm's revenue was Rs. 100 crore in Year 1. It grows by 20% in Year 2: revenue becomes 100 × 1.20 = 120 crore.
2. It then grows by a FURTHER 25% in Year 3, relative to the Year 2 figure (not the Year 1 figure): revenue becomes 120 × 1.25 = 150 crore.
3. The two percentage changes (20% and 25%) do NOT simply add to "45% total growth from Year 1 to Year 3" — the actual total growth is (150 − 100)/100 × 100 = 50%, which differs from the naive sum precisely because the second percentage compounds on an already-larger base.

KEY: When a table gives year-on-year percentage changes rather than actual values, you must chain them MULTIPLICATIVELY, not additively, to get the overall change across several years — treat each year's change exactly like a successive-percentage-change problem from the quantitative aptitude chapter.

AVERAGES: PLAIN AND WEIGHTED

An average (mean) redistributes a total equally across all contributing items: Total ÷ Count. But averaging several ALREADY-averaged figures together is valid only if each contributed with EQUAL weight (equal group size, or equal time period) — this single caveat is the source of one of the most heavily tested traps in this entire chapter.

average = (sum of values) / (number of values)

Combined averages of two or more GROUPS of unequal size must be WEIGHTED by group size, never simply averaged as if the groups were equal:

combined average = (n1×a1 + n2×a2) / (n1 + n2)

1. Identify the size of each group (n1, n2, ...) and each group's own average (a1, a2, ...) separately from the question.
2. Multiply each group's size by its own average to recover that group's actual TOTAL (not its average).
3. Sum all the group totals, then divide by the SUM of all the group sizes — never by the number of groups.

WORKED EXAMPLE: A factory's average monthly output was 200 units for the first 8 months and 300 units for the remaining 4 months of the year. Slow route: total output = (200 × 8) + (300 × 4) = 1600 + 1200 = 2800 units over 12 months; average = 2800/12 = 233.33 units per month. Fast route: apply the weighted-average formula directly with the month-counts as weights: (200×8 + 300×4)/(8+4) = 2800/12 = 233.33, skipping the intermediate "total output" sentence and going straight from the weighted-sum template to the answer.

GATE TRAP: Average of averages across UNEQUAL-sized groups (different years with different numbers of transactions, or different regions with different populations, or — as above — different numbers of months) is invalid unless you weight by the group size. A simple mean of several already-averaged values, (200+300)/2 = 250 in the worked example above, silently assumes both groups had equal size, which is rarely stated and rarely true — this is a classic average-of-averages trap embedded directly inside a data-interpretation question, and produces a plausible but wrong answer.

ASSUMED-MEAN DEVIATION METHOD FOR FAST AVERAGES

For "average" questions across a row or column of large numbers, use the DEVIATION-FROM-ASSUMED-MEAN method instead of summing every raw value directly: pick a round number close to the values (the "assumed mean"), sum the DEVIATIONS of each value from that assumed mean (which can be negative), then add the average deviation back onto the assumed mean.

1. Choose a convenient round number A close to the data (the assumed mean) — it need not be exact, only close.
2. For each value v, compute the deviation v − A (which may be positive or negative).
3. Sum all the deviations and divide by the count to get the average deviation.
4. Add the average deviation back onto A to get the true average: true average = A + (sum of deviations)/(count).

WORKED EXAMPLE: A table records units sold over four days: Monday 120, Tuesday 150, Wednesday 90, Thursday 140. Choose an assumed mean of A = 120 (a round number close to the data). Deviations: 120−120=0, 150−120=30, 90−120=−30, 140−120=20. Sum of deviations = 0+30−30+20 = 20. Average deviation = 20/4 = 5. True average = 120 + 5 = 125 — reached using only small numbers (0, 30, −30, 20) rather than adding four large three-digit numbers directly.

TABLE AND BAR-GRAPH SPEED-READING

1. For tables with multiple years or categories, scan for the row or column with the EXTREME (max/min) value first if the question asks for "highest" or "lowest" — do not compute a value for every single cell when only the extreme one is needed.
2. For ratio-based bar comparisons where two bars are visually close in height, estimate the ratio roughly (e.g. "roughly 4:5") before computing exact numbers — GATE's data-interpretation answer options are usually spaced far enough apart that estimation alone resolves the correct choice.
3. FAST ROUTE: use the assumed-mean deviation method for averages of large numbers. SLOW ROUTE: adding all raw values directly and dividing by count.

KEY: For "approximate value" data-interpretation questions, round the given numbers to convenient nearby values (e.g. 197 to 200, 48 to 50) before doing arithmetic — GATE options are usually spaced far enough apart that a sensibly rounded estimate lands unambiguously on the correct choice.

REMEMBER: Before comparing two bars, two pie slices, or two data points across different charts in the same question set, confirm they use the SAME unit and the SAME base (both in absolute numbers, or both as percentages of the same total) — comparing a percentage in one chart to an absolute count in another is meaningless.

GATE TRAP: A stacked bar chart's individual segment heights must be found by SUBTRACTING consecutive cumulative boundaries, not read directly off the y-axis — the top of the second segment gives the CUMULATIVE total of segments one and two, not the second segment's own value alone. Always subtract the previous boundary before treating a stacked segment's height as its own value.

SET THEORY AND VENN DIAGRAMS: THE TWO-SET FORMULA

Several data-interpretation questions describe overlapping groups (people who play multiple sports, read multiple newspapers, or like multiple beverages) rather than a chart, and are solved with set-theory counting rather than percentage arithmetic. For two sets A and B out of a total population T, the fundamental identity is:

n(A ∪ B) = n(A) + n(B) − n(A ∩ B)

where n(A ∪ B) is the count of people in AT LEAST ONE of the two sets, n(A) and n(B) are the individual set sizes, and n(A ∩ B) is the count in BOTH — this subtraction exists because anyone in both sets would otherwise be counted TWICE, once in n(A) and once in n(B).

1. Read off the total population T, the size of set A, the size of set B, and (if given) the size of the intersection (A ∩ B) or the count in NEITHER set.
2. If the count in NEITHER is given instead of the intersection, first find n(A ∪ B) = T − (count in neither), then solve the identity above for the missing intersection.
3. "Neither A nor B" = T − n(A ∪ B). "Exactly one of A, B" = n(A ∪ B) − n(A ∩ B). "Only A" (A but not B) = n(A) − n(A ∩ B).

WORKED EXAMPLE: In a class of 50 students, 30 play cricket, 25 play football, and 10 play both sports. How many play neither? n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = 30 + 25 − 10 = 45. Students playing neither = total − n(A ∪ B) = 50 − 45 = 5.

WORKED EXAMPLE: In a survey of 100 people, 60 like tea, 50 like coffee, and 20 like neither beverage. How many like both? First find n(A ∪ B) = total − neither = 100 − 20 = 80. Then solve for the intersection: n(A ∩ B) = n(A) + n(B) − n(A ∪ B) = 60 + 50 − 80 = 30.

THREE-SET VENN DIAGRAMS: THE FULL INCLUSION-EXCLUSION FORMULA

When THREE overlapping sets A, B, C are described (three sports, three newspapers), the two-set formula extends to the full inclusion-exclusion identity, which must ADD each pairwise overlap back out and then ADD the triple overlap back IN:

n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A∩B) − n(B∩C) − n(A∩C) + n(A∩B∩C)

The alternating addition and subtraction exists because a person in ALL THREE sets is counted three times in the first three terms (once per individual set), subtracted out three times by the three pairwise-overlap terms (since each pairwise overlap includes anyone in all three), and must therefore be added back in exactly once via the final n(A∩B∩C) term to be counted correctly a net one time overall.

1. List every given quantity precisely: each individual set size, each PAIRWISE overlap (A∩B, B∩C, A∩C — read carefully whether these are stated as "exactly two" or as raw pairwise overlaps that include the triple-overlap people), and the triple overlap n(A∩B∩C).
2. Apply the formula directly: sum the three individual sets, subtract the three pairwise overlaps, add back the triple overlap.
3. "Neither of the three" = total population − n(A∪B∪C).
4. "EXACTLY TWO of the three" (not all three) requires subtracting the triple-overlap count three times from the sum of the raw pairwise overlaps, since each raw pairwise-overlap figure (as typically stated in these problems) already includes the people who are in all three: exactly-two count = (A∩B + B∩C + A∩C) − 3×(A∩B∩C).

WORKED EXAMPLE: In a survey of 100 people about three newspapers A, B, C: 50 read A, 40 read B, 30 read C, 20 read both A and B, 15 read both B and C, 10 read both A and C, and 5 read all three. How many read at least one? n(A∪B∪C) = 50+40+30 − 20−15−10 + 5 = 120 − 45 + 5 = 80.

WORKED EXAMPLE (continuing the same data): how many read EXACTLY TWO of the three newspapers? Using exactly-two = (A∩B + B∩C + A∩C) − 3×(A∩B∩C) = (20+15+10) − 3×5 = 45 − 15 = 30 — this subtracts the triple-overlap people out of each of the three pairwise counts (removing them once from each of the three terms, i.e. three times total), since someone in all three should not be counted as "exactly two".

GATE TRAP: For a three-set problem, confirm carefully whether the given pairwise-overlap numbers (like "20 read both A and B") already INCLUDE the people who read all three, or whether they mean "exactly these two, not the third" — GATE's standard convention states raw pairwise overlaps that DO include the triple-overlap group (consistent with standard Venn-diagram/set-theory convention), which is why the inclusion-exclusion formula subtracts each pairwise term once and adds the triple term back exactly once; misreading a raw pairwise overlap as an "exactly two" figure and skipping the triple-overlap adjustment is the most common error on this question type.

DATA SUFFICIENCY: STATEMENT I / STATEMENT II REASONING

GATE also asks DATA SUFFICIENCY questions in this topic's format: a question is posed, followed by two independent statements (Statement I and Statement II), and you must decide whether EACH statement ALONE is sufficient to answer the question, whether BOTH TOGETHER are needed, or whether even both together are insufficient. Critically, you are testing SUFFICIENCY, not actually computing the final numeric answer — the question never asks you to state the answer itself, only whether it CAN be determined.

1. Read the question being asked FIRST, and fix precisely what would count as "answering" it (a single unique numeric value, or a single unique yes/no) before looking at either statement.
2. Evaluate Statement I COMPLETELY ALONE, temporarily forgetting Statement II exists — does it, by itself, pin the answer down to exactly one value or one yes/no, or does it leave more than one possibility open?
3. Then evaluate Statement II completely alone, independently, forgetting what Statement I said.
4. Only if NEITHER statement alone suffices, check whether the two TOGETHER pin down a unique answer.
5. Classify the result into exactly one of the standard categories: Statement I alone is sufficient (but II is not); Statement II alone is sufficient (but I is not); each statement ALONE is sufficient (both independently work); both TOGETHER are needed (neither alone works, but combined they do); or even both together are NOT sufficient.

WORKED EXAMPLE: What is the value of x? Statement I: x² = 49. Statement II: x > 0. Statement I ALONE gives x = 7 or x = −7 — two possible values, so Statement I alone is NOT sufficient (it does not pin down a single value). Statement II ALONE only says x is positive, which is consistent with infinitely many values, so Statement II alone is clearly not sufficient either. BOTH TOGETHER: x² = 49 restricts x to {7, −7}, and x > 0 eliminates −7, leaving the single value x = 7 — sufficient only when combined. The correct classification is "both statements together are needed, neither alone suffices."

WORKED EXAMPLE: What is the ratio of the present ages of A and B? Statement I: Five years ago, the ratio of A's age to B's age was 3:4. Statement II: Ten years from now, the ratio of A's age to B's age will be 5:6. Statement I ALONE gives one linear relationship between A's and B's ages at a fixed past point, but a RATIO five years ago does not fix the PRESENT ratio uniquely on its own (infinitely many actual age-pairs share that same past ratio, each giving a different present ratio) — insufficient alone. The same reasoning applies to Statement II alone. However, BOTH TOGETHER give two independent linear equations in A's and B's present ages, which can be solved simultaneously for both unknowns exactly, and hence for the present ratio — sufficient only when combined.

GATE TRAP: A data-sufficiency question NEVER asks you to state the numeric answer itself as your final response — it asks only whether the information given is enough to determine one. A statement that lets you narrow the answer down to two or more possibilities (as with x² = 49 giving x = ±7) is INSUFFICIENT on its own, even though it constrains the answer significantly; "narrows it down a lot" is not the same as "pins it down to exactly one value."

MIRROR IMAGES AND WATER IMAGES

A MIRROR image (a mirror placed vertically, to one side of the figure) flips the figure LEFT-RIGHT while preserving top and bottom, as if reflected about a VERTICAL axis running through the middle of the figure. A WATER image (reflection in a horizontal water surface below the figure) flips the figure TOP-BOTTOM while preserving left-right order, as if reflected about a HORIZONTAL axis. These are NOT the same transformation, and confusing the two is the single most common error in this entire spatial-reasoning family.

[[FIG:mirror-vs-water-image]]

1. A letter is unchanged in its MIRROR image exactly when it is symmetric about a VERTICAL axis — the following capital letters look identical after a mirror flip: A, H, I, M, O, T, U, V, W, X, Y.
2. A letter is unchanged in its WATER image exactly when it is symmetric about a HORIZONTAL axis — the following capital letters look identical after a water flip: B, C, D, E, H, I, K, O, X.
3. Note the OVERLAP between the two lists (H, I, O, X appear in both) — these four letters happen to be symmetric about BOTH axes simultaneously, and are unchanged under either transformation, while every other letter is unchanged under at most one of the two.
4. For a WORD (not a single letter), a mirror reflection also REVERSES the left-to-right ORDER of the letters (as well as mirroring each individual letter's shape) — a question asking only "which individual letters remain visually unchanged in shape" is asking about each letter's own symmetry, separately from the word's letter-order reversal, and the two effects should not be confused.

KEY: Mirror image reflects left-right (vertical mirror line); water image reflects top-to-bottom (horizontal mirror line) — for a clock face, a mirror image effectively shows the time as if reading it backwards through glass, while a water image shows it upside-down.

WORKED EXAMPLE: The word OXIDE is held up in front of a vertical mirror. Considering only which INDIVIDUAL letters look visually identical to their normal form when mirrored, check each letter of O-X-I-D-E against the mirror-unchanged list (A, H, I, M, O, T, U, V, W, X, Y): O is on the list (unchanged), X is on the list (unchanged), I is on the list (unchanged), D is NOT on the list (changed), E is NOT on the list (changed). Three of the five letters (O, X, I) remain visually unchanged.

WORKED EXAMPLE: Consider the letters D, E, H, N reflected in still water below them (a top-bottom flip). Check each against the water-unchanged list (B, C, D, E, H, I, K, O, X): D is on the list (unchanged), E is on the list (unchanged), H is on the list (unchanged), N is NOT on the list (changed). Three of the four letters (D, E, H) remain visually unchanged.

MIRROR-IMAGE AND WATER-IMAGE CLOCKS

Clock-reflection questions require a SPECIFIC arithmetic conversion, not visual guessing. For a 12-hour analogue clock reflected in a VERTICAL mirror, the mirror time and the actual time are related by a fixed subtraction from "11 hours 60 minutes":

mirror time = 11:60 − actual time   (equivalently, actual time = 11:60 − mirror time, since the relation is symmetric)

1. Subtract the MINUTES column first: 60 − (actual minutes).
2. Subtract the HOURS column next: 11 − (actual hours).
3. Combine the two results as hours:minutes to get the mirror (or actual) time.

WORKED EXAMPLE: A clock shows the actual time 4:20. Its mirror-image time: subtract minutes first, 60 − 20 = 40; subtract hours, 11 − 4 = 7. Mirror image shows 7:40.

WORKED EXAMPLE (inverse direction): A clock's reflection in a mirror shows 4:20. Find the actual time. Apply the identical formula, since it works in either direction: actual = 11:60 − mirror = (60−20) minutes and (11−4) hours = 7:40.

GATE TRAP: A student who instead computes 12:00 − 4:20 = 7:40 gets the same answer here only by COINCIDENCE of these particular numbers — the correct constant is 11 hours 60 minutes, not a plain 12:00, because subtracting minutes and hours as separate columns from a literal "12:00" requires an awkward borrow whenever the minutes are nonzero. Always use the 11:60 form to keep the subtraction clean in both columns; using 12:00 directly will give a WRONG answer whenever the minutes value forces a borrow that the solver does not correctly propagate.

A water-image clock reflection (flipping the clock face upside-down rather than mirroring it left-right) requires its own separate geometric reasoning about hand positions rather than the mirror clock's fixed 11:60 subtraction, and is comparatively rare in GATE's own question style — the mirror-clock formula above is the one to have fully automatic.

CLOCK-ANGLE REASONING COMBINED WITH MIRROR IMAGES

Some questions combine a mirror-clock conversion with a separate clock-ANGLE computation, requiring both techniques in sequence. Recall the clock-angle formula: at H hours and M minutes, the angle between the hour and minute hands is |30×H − 5.5×M| degrees (taking the smaller of this value and 360 minus it if it exceeds 180).

1. First, if the question gives a MIRROR time and asks about the ACTUAL time, convert using actual = 11:60 − mirror, exactly as above.
2. Only THEN apply the clock-angle formula to the ACTUAL time obtained in step 1 — never apply the angle formula directly to the mirror-image time, since the angle between the hands in a mirror image is numerically identical to the angle at the actual time in any case (a mirror reflection preserves angle magnitudes), but questions that name the ACTUAL time explicitly must be answered using the converted, actual time value for clarity and consistency.

WORKED EXAMPLE: A clock's image, viewed in a vertical mirror, shows 8:20. Find the angle between the hour and minute hands at the ACTUAL time. First convert: actual = 11:60 − 8:20 = (60−20) minutes, (11−8) hours = 3:40. Now apply the angle formula to 3:40: angle = |30×3 − 5.5×40| = |90 − 220| = 130 degrees. Since 130 ≤ 180, this is already the smaller angle, so the answer is 130 degrees.

DICE: STANDARD AND UNKNOWN

On a STANDARD die, opposite faces always sum to 7: 1 is opposite 6, 2 is opposite 5, 3 is opposite 4. This single fact resolves any question about a standard die instantly, without needing to physically rotate the die in your head.

GATE TRAP: The opposite-faces-sum-to-seven rule applies ONLY to a standard die. Some GATE questions explicitly describe a non-standard or unknown die (with an arbitrary, not-necessarily-standard face arrangement) — always check the question's own wording and given face arrangement first before applying the shortcut; applying the sum-to-7 rule to an explicitly non-standard die produces a confidently wrong answer.

DEDUCING AN UNKNOWN DIE'S OPPOSITE FACES FROM MULTIPLE VIEWS

For an UNKNOWN die (not necessarily following the sum-to-7 rule), two or more VIEWS of the same physical die — each view showing three mutually adjacent faces (since three faces meet at any corner of a cube) — let you deduce which faces are opposite by elimination, using the fact that a face can be ADJACENT to at most four other faces (every face except its own opposite).

1. For a target face F whose opposite you want to find, collect every number that appears ADJACENT to F across ALL the given views (any view where F itself is visible tells you the OTHER two visible faces in that same view are adjacent to F).
2. A cube has exactly 6 faces, so if you can identify 4 DISTINCT faces adjacent to F, the one remaining face (out of the 6 total, excluding F itself and the 4 confirmed neighbours) MUST be opposite F, by elimination — since F can have at most 4 neighbours and exactly 1 opposite face.
3. If fewer than 4 distinct neighbours have been identified so far, gather more views before concluding — do not guess the opposite face from partial adjacency information alone.

WORKED EXAMPLE: Two views of the same unlabelled die are given. View 1 shows faces 2, 3, 5 (mutually adjacent, meeting at one corner). View 2 shows faces 3, 4, 6. Find the face opposite 3. From View 1, faces 2 and 5 are adjacent to 3. From View 2, faces 4 and 6 are adjacent to 3. Combining both views, the faces adjacent to 3 are {2, 4, 5, 6} — four distinct faces. The only remaining face out of {1,2,3,4,5,6}, excluding 3 itself and its four confirmed neighbours {2,4,5,6}, is 1. So 1 is opposite 3.

WORKED EXAMPLE (three views, more data than strictly needed): View 1 shows 1, 2, 3. View 2 shows 1, 4, 5. View 3 shows 2, 4, 6. Find the face opposite 1. From View 1, faces 2 and 3 are adjacent to 1. From View 2, faces 4 and 5 are adjacent to 1. That already gives four distinct neighbours of 1: {2, 3, 4, 5}. The remaining face, excluding 1 and {2,3,4,5}, is 6. So 6 is opposite 1 — View 3 was not even needed for this particular deduction, though it is consistent with the same conclusion (it does not place 6 adjacent to 1, matching that 6 must be opposite 1, not adjacent).

GATE TRAP: When a question explicitly states a die is placed in "two different positions" (not necessarily a standard die) and gives a top, front, and right face for each position, do not silently assume opposite faces sum to seven just because the numbers happen to look like a standard die's — the question testing this pattern deliberately uses numbers that COULD look standard, but the deduction must come purely from matching the shared face between the two positions and eliminating, exactly as in the multi-view method above, never from assuming the sum-to-seven shortcut applies.

PAINTED CUBES: THE FOUR-CLASS FORMULA

An n×n×n cube, painted on all six outer faces and then cut into n³ unit cubes, splits into exactly FOUR classes based on how many painted faces each unit cube carries — and these four formulas, together, are the single most heavily tested spatial-reasoning pattern in this chapter.

[[FIG:painted-cube-classes]]

• CORNER cubes (exactly 3 painted faces): always exactly 8, regardless of n — every cube, of any size ≥ 2, has exactly 8 corners.
• EDGE cubes (exactly 2 painted faces): 12(n−2) — a cube has 12 edges, and each edge (excluding its two corner cubes) contributes (n−2) edge-class cubes.
• FACE cubes (exactly 1 painted face): 6(n−2)² — a cube has 6 faces, and each face's interior (excluding its border of edge and corner cubes) is an (n−2)×(n−2) square of face-class cubes.
• INTERIOR cubes (0 painted faces): (n−2)³ — the cube's core, entirely unpainted, forms a smaller (n−2)×(n−2)×(n−2) cube of its own.

1. Compute all FOUR counts for the given n.
2. VERIFY by summing all four: 8 + 12(n−2) + 6(n−2)² + (n−2)³ must equal n³ exactly — this identity holds for every n ≥ 2 and is the built-in arithmetic check that catches any computational slip before submitting an answer.
3. For n = 3: 8 corner, 12(1)=12 edge, 6(1)²=6 face, (1)³=1 interior; total 8+12+6+1=27=3³. For n = 4: 8 corner, 12(2)=24 edge, 6(2)²=24 face, (2)³=8 interior; total 8+24+24+8=64=4³. For n = 5: 8 corner, 12(3)=36 edge, 6(3)²=54 face, (3)³=27 interior; total 8+36+54+27=125=5³.

GATE TRAP: The corner-cube count is always exactly 8, regardless of cube size n — a frequent wrong answer incorrectly scales this count with n (for example, answering "8n" or "2n" instead of the fixed 8), forgetting that a cube always has exactly 8 corners no matter how large it is cut.

WORKED EXAMPLE: A 4×4×4 cube is painted on all six outer faces and cut into 64 unit cubes. How many have exactly two painted faces (edge cubes)? Using 12(n−2) with n=4: 12×(4−2) = 12×2 = 24. Verify: 8 (corner) + 24 (edge) + 6×(2)²=24 (face) + (2)³=8 (interior) = 8+24+24+8 = 64 = 4³ ✓.

WORKED EXAMPLE: A cube of side 5 cm is painted on all six faces and cut into 1cm×1cm×1cm smaller cubes. How many have NO face painted at all (fully interior)? Using (n−2)³ with n=5: (5−2)³ = 3³ = 27.

STRATEGY: For any painted-cube question, write out all four formulas for the given n and total them to n³ as a verification step BEFORE selecting an answer — this single habit catches the overwhelming majority of arithmetic slips on this question type, since an incorrect individual count will almost always fail to sum to the correct n³ total.

PAPER FOLDING AND HOLE PUNCHING

Each FOLD doubles the number of LAYERS of paper stacked on top of each other, and a single PUNCH through the folded stack creates exactly ONE hole per layer present at that punch location — the total number of holes in the fully unfolded sheet equals 2^(number of folds) × (number of punches), PROVIDED every punch goes through the full stack of layers at that point.

1. Count the number of folds performed. Each fold DOUBLES the layer count: 1 fold → 2 layers, 2 folds → 4 layers, 3 folds → 8 layers.
2. A single punch through the FULL folded stack (all layers) produces exactly (number of layers) holes once unfolded.
3. When unfolding, each hole reflects across EVERY fold line, in REVERSE order of how the folds were made — so the final hole pattern is symmetric about every fold line used, and the total layer-doubling rule above only holds when the punch actually passes through every layer at that exact location (a punch placed asymmetrically, missing some layers, produces fewer holes than the full doubling formula predicts).

WORKED EXAMPLE: A square sheet is folded in half once, then folded in half again (2 folds total), and a single hole is punched through all layers. Number of layers after 2 folds = 2² = 4. A single full-stack punch produces 4 holes once unfolded.

WORKED EXAMPLE: A sheet is folded in half along a vertical line, then folded again in half along a horizontal line (2 folds, in two DIFFERENT directions), then completely unfolded — how many CREASE LINES (not holes) are visible? Each fold, regardless of direction, leaves exactly ONE crease line when unfolded, so 2 folds leave exactly 2 crease lines total (one vertical, one horizontal) — this is a separate count from the hole-doubling rule, since crease lines count folds directly (not exponentially), while holes from a punch count layers (which DO grow exponentially with the number of folds).

GATE TRAP: Do not confuse the CREASE-LINE count (equal to the number of folds, growing LINEARLY) with the HOLE count from a punch (equal to 2^folds, growing EXPONENTIALLY) — these are two entirely different quantities governed by two entirely different growth rules, and a question may ask for either one within the same fold sequence.

PUNCH POSITION MATTERS: CORNER AND DIAGONAL PUNCHES

The simple 2^folds doubling rule assumes every punch passes through the SAME relative position in every layer. When a punch is placed specifically at a CORNER of the folded stack that corresponds to an actual OUTER corner of the original unfolded sheet, or when folds are made DIAGONALLY rather than in straight horizontal/vertical lines, the resulting hole pattern must be traced fold-by-fold rather than assumed automatically.

1. Identify each fold's crease line and which edges of the paper come together at that fold.
2. Trace the specific corner or point being punched back through each fold, in reverse, to see exactly which original corners or points of the unfolded sheet the punch actually corresponds to.
3. A punch through a folded stack's corner that lies on an OUTER edge of the original sheet (not created purely by folding) may correspond to FEWER distinct physical locations than the full layer count, because some of those "layers" at that specific corner may coincide with the sheet's genuine physical corner rather than being distinct interior points — always trace the actual geometry for a corner-specific or diagonal-fold punch rather than applying the doubling formula blindly.

WORKED EXAMPLE: A sheet is folded in half twice in succession (a smaller square, one-fourth the original area, 4 layers), and a hole is punched through the corner of this small folded square that corresponds to an ACTUAL outer corner of the original unfolded sheet. Because this specific corner sits at the sheet's genuine physical corner (not a fold-created corner), tracing it back through both folds shows the punch passes through that ONE physical corner region consistently in a way that still produces 4 holes when unfolded — one hole appears near each of the sheet's four original corners, because each fold maps this particular corner position onto a genuinely different original corner of the unfolded sheet (unlike a punch at a fold-created edge or center point, which can produce a more symmetric, non-corner pattern). The full 2^folds = 4 count still applies here specifically because the chosen punch point avoids lying exactly ON any crease line itself.

GATE TRAP: When a punch is diagonal-fold-based (paper folded along its DIAGONAL rather than along straight vertical/horizontal midlines), the resulting unfolded hole pattern is symmetric about the DIAGONAL fold lines specifically, not about the sheet's vertical/horizontal midlines — do not assume a diagonally-folded sheet's holes will appear in the same relative positions as a horizontally/vertically-folded sheet's holes would, even if the total hole COUNT (governed by 2^folds) is identical.

CUBE NETS: FOLDING TO FIND OPPOSITE FACES

A cube net is a flat, unfolded 2D layout of six connected squares that folds into a cube. The fastest and most reliable technique for finding which two faces become OPPOSITE each other does not require mentally folding the entire net at once — it uses a fixed rule about straight strips of squares within the net.

1. Locate the LONGEST straight run of consecutive squares in the net (a straight horizontal or vertical strip of 3 or 4 squares in a row).
2. In any straight strip of exactly FOUR consecutive squares, the 1st and 3rd squares become OPPOSITE faces once folded, and the 2nd and 4th squares become OPPOSITE faces — this is because folding a strip of four squares wraps it exactly halfway around the cube, landing the 1st and 3rd (two squares apart) on directly opposite sides, and likewise for the 2nd and 4th.
3. Any squares left OUTSIDE the main four-square strip pair up with EACH OTHER by elimination, since a cube has exactly 3 pairs of opposite faces total, and the four-square strip rule above already accounts for 2 of those 3 pairs.

GATE TRAP: Faces that are ADJACENT to each other in the FLAT net are almost never adjacent (touching) once folded into a cube — and faces separated by exactly one square in a straight strip of four (the 1st-3rd or 2nd-4th pairing) are precisely the ones that end up OPPOSITE, not adjacent. Always identify the longest straight strip in the net FIRST, rather than trying to fold the entire net mentally all at once, and never assume physical proximity in the flat net implies proximity (or its opposite, oppositeness) after folding.

WORKED EXAMPLE: A cube's net has four squares in a straight horizontal strip labelled, left to right, P, Q, R, S, with a fifth square T attached above Q and a sixth square U attached below R. Which face is opposite T? Apply the strip rule to the main strip P-Q-R-S: 1st and 3rd (P and R) become opposite; 2nd and 4th (Q and S) become opposite. That accounts for two of the cube's three opposite pairs (P-R, Q-S), leaving T and U as the third pair by elimination — so T is opposite U. A tempting but WRONG guess is "T is opposite Q" purely because T is drawn directly above Q in the flat net — but Q's true opposite is S (from the 2nd-4th rule on the main strip), and being adjacent in the flat layout says nothing about being opposite after folding.

WORKED EXAMPLE (extra squares on both sides of the strip): A cube net has four squares B, C, D, E in a straight horizontal row, with a fifth square A attached directly above C, and a sixth square F attached directly below D. Which face is opposite A? Main strip B-C-D-E: 1st and 3rd (B and D) are opposite; 2nd and 4th (C and E) are opposite. That leaves A and F as the third pair by elimination, so A is opposite F.

WORKED EXAMPLE (a T-shaped or cross-shaped net with a strip running the OTHER way): A cube net is a vertical strip of four squares, in order top to bottom U2, U1, C, D, with an extra square L attached to the left of C and another square R attached to the right of C. The main strip is now VERTICAL (U2, U1, C, D read top to bottom) — apply the identical 1st-3rd, 2nd-4th rule along this vertical direction: 1st and 3rd (U2 and C) become opposite; 2nd and 4th (U1 and D) become opposite. The two squares attached to the SIDES of C (L and R, which sit outside the main vertical strip) form the third opposite pair by elimination: L is opposite R — so the square OPPOSITE C in this net is neither L nor R nor U1 nor D, but specifically U2 (from the 1st-3rd rule on the main strip).

GATE TRAP: The "1st-3rd, 2nd-4th" rule applies specifically to a strip of consecutive squares that lie along ONE straight line in the net (horizontal or vertical) — it does not automatically apply to squares that merely appear "in a row" visually if the net actually bends or branches; always confirm the four squares you are applying the rule to are genuinely connected in a single unbroken straight line before using it, and correctly identify which direction (horizontal or vertical) that straight strip runs in the given net, since a net can have its long strip oriented either way.

KEY: The painted-cube four-formula split (8 corners, 12(n−2) edges, 6(n−2)² faces, (n−2)³ interior) and the cube-net "1st-3rd, 2nd-4th" opposite-face rule both come from the same underlying object — a cube has exactly 8 corners, 12 edges, 6 faces, and 3 opposite-face pairs, always, regardless of size or how it is drawn flat — so memorising these four cube constants (8, 12, 6, 3) once serves both the painted-cube formulas and the net-folding elimination step.

FIGURE COUNTING: SQUARES IN A GRID

Counting figures systematically (rather than trying to spot every shape at once) is the reliable method for "how many squares/triangles are there" questions. For SQUARES specifically, in an n×n grid of unit squares, count separately by SIZE — the number of squares of a given side-length k (for k = 1 to n) is (n − k + 1)², and the TOTAL count across all sizes is the sum of squares:

total squares in an n×n grid = 1² + 2² + ... + n² = n(n+1)(2n+1)/6

1. For each possible square size, from 1×1 up to n×n, count how many positions that size square can occupy: a k×k square can start at any of (n−k+1) positions along each axis, giving (n−k+1)² total positions for that size.
2. Sum the counts across every size from 1×1 to n×n.
3. For a 3×3 grid specifically: 1×1 squares number (3−1+1)²=3²=9; 2×2 squares number (3−2+1)²=2²=4; 3×3 squares number (3−3+1)²=1²=1. Total = 9+4+1=14.

WORKED EXAMPLE: How many squares of ALL sizes are in a 3×3 grid of unit squares? Count by size: nine 1×1 squares, four 2×2 squares, one 3×3 square. Total = 9+4+1 = 14 — matching the sum-of-squares formula 1²+2²+3² = 1+4+9 = 14 exactly.

DIRECTION SENSE AND STRAIGHT-LINE DISTANCE

Direction-sense questions describe someone walking in several stages along compass directions, and ask for the straight-line ("as the crow flies") distance from the final position back to the start — this is NEVER the sum of the distances actually walked along the path, but the direct Euclidean distance.

1. Track the NET East-West displacement and the NET North-South displacement SEPARATELY, adding movements in the same direction and subtracting movements in the opposite direction along each axis independently.
2. Once both net components are found, apply the Pythagorean theorem EXACTLY ONCE, at the very end, to the two net perpendicular components — never apply it to intermediate, uncombined stages of the walk.
3. Recognise common PYTHAGOREAN TRIPLES to skip square-root calculation entirely: 3-4-5, 6-8-10, 5-12-13, 8-15-17, 7-24-25, 9-12-15 — if the two net components match a scaled version of one of these triples, the hypotenuse (straight-line distance) can be read off directly.

WORKED EXAMPLE: Starting from point P, a man walks 8 km north, then 6 km east, then 8 km south. Net North-South displacement: +8 (north) − 8 (south) = 0 — the two north-south legs exactly cancel. Net East-West displacement: 6 km east, unchanged. The straight-line distance from the final position to P is therefore simply 6 km (a pure east-west displacement with zero net north-south component), not the total 8+6+8=22 km actually walked.

WORKED EXAMPLE: A cyclist starts at X, rides 5 km east, then 12 km north, then 5 km west, then 4 km north. Net East-West: +5 (east) − 5 (west) = 0. Net North-South: +12 + 4 = 16 (both northward, so they add rather than cancel). Straight-line distance = sqrt(0² + 16²) = 16 km.

GATE TRAP: For "shortest distance to return to the start" questions, the answer is ALWAYS the straight-line (Euclidean) distance from the current position back to the start, computed from the NET displacement components — never the sum of the distances already walked along the actual path, and never the sum of only SOME of the stages while ignoring others that partially cancel.

WORKED EXAMPLE: A person walks 6 km North, then 8 km East. Recognise the 6-8-10 Pythagorean triple instantly: since the two net components (6 and 8) are perpendicular and match a known triple exactly, the straight-line distance is 10 km directly, with no square-root computation required — computing sqrt(6²+8²) = sqrt(36+64) = sqrt(100) = 10 digit-by-digit reaches the identical answer by a slower route.

BRINGING IT TOGETHER: HOW A DI QUESTION IS ACTUALLY SOLVED

Restated as a single procedure, applicable to virtually every data-interpretation question in this chapter's question bank:

1. Restate the question in the exact form "value A divided by (or compared to) value B", and identify precisely what those two values are before touching the chart.
2. Locate BOTH values on the chart or table, double-checking the axis units and any broken-axis warning first.
3. Choose the correct formula from this chapter's catalogue (percentage change vs. percentage-point change; plain average vs. weighted average; two-set vs. three-set inclusion-exclusion; single-chart share vs. chained two-chart share) based on exactly what the question's wording asks for.
4. Round smartly where GATE's answer options are clearly spaced apart — approximating 33.33% as one-third, or 7200/12 as 600, often settles the answer without a single long division.
5. For a multi-part or multi-mark DI question, do the two or three underlying one-line calculations ON PAPER rather than mentally — a single transposed digit at this stage destroys every mark riding on that computation.

WORKED PROBLEMS

Worked Problem 1 — Two-chart chained percentage. A pie chart shows a college's total enrollment of 4000 students split as Arts 25%, Commerce 30%, Science 35%, Others 10%. A second chart shows that among Science students specifically, the ratio of male to female students is 3:2. How many female Science students are enrolled? Science's share of the total: 35% of 4000 = 1400 students. Within Science, the male:female ratio is 3:2, so female students = 1400 × 2/(3+2) = 1400 × 2/5 = 560. COMMON ERROR: computing 2/5 of the TOTAL 4000 (=1600) instead of 2/5 of the Science slice (1400) is the standard trap here — always apply the second chart's ratio to the FIRST chart's already-extracted sub-total, never to the grand total directly.

Worked Problem 2 — Weighted average with explicit credit weights. A student's marks (out of 100) with subject credit weights are: Maths 80 (weight 4), Physics 70 (weight 3), Chemistry 90 (weight 2), English 60 (weight 1). Find the weighted average percentage. Weighted sum = 80×4 + 70×3 + 90×2 + 60×1 = 320+210+180+60 = 770. Sum of weights = 4+3+2+1 = 10. Weighted average = 770/10 = 77. COMMON ERROR: a plain (unweighted) average of the four raw marks would give (80+70+90+60)/4 = 300/4 = 75 — a DIFFERENT, wrong answer, because it silently treats every subject as equally weighted despite the question explicitly giving different credit weights; always use the given weights whenever they are explicitly provided in the question.

Worked Problem 3 — Three-set Venn diagram, exactly-two count. In a college of 100 students: 50 play cricket, 40 play football, 30 play hockey. 15 play both cricket and football, 12 play both football and hockey, 10 play both cricket and hockey, and 5 play all three sports. How many students play NONE of the three sports? First, n(cricket ∪ football ∪ hockey) = 50+40+30 − 15−12−10 + 5 = 120 − 37 + 5 = 88. Students playing none = 100 − 88 = 12. COMMON ERROR: forgetting to add back the triple-overlap term (+5) at the end is the standard error here, and would give a wrong union of 83, and a wrong "none" count of 17 — the triple-overlap group was subtracted three times by the three pairwise terms and must be added back exactly once.

Worked Problem 4 — Data sufficiency with a ratio question. What is the ratio of the present ages of A and B? Statement I: five years ago, the ratio of A's age to B's age was 3:4. Statement II: ten years from now, the ratio of A's age to B's age will be 5:6. Evaluate each alone: Statement I fixes one linear relationship between (A−5) and (B−5) but leaves the actual present values (and hence the present ratio) underdetermined — many different actual age pairs satisfy a 3:4 ratio five years ago while giving DIFFERENT present ratios today, since the ratio of (a+5):(b+5) is not fixed just because (a):(b) at some past ratio is fixed unless the actual magnitudes are pinned down; insufficient alone. The identical reasoning applies to Statement II alone. Combining both gives two independent linear equations in A's and B's present ages, solvable simultaneously for both unknowns and hence the present ratio uniquely — sufficient only when BOTH are used together. COMMON ERROR: a solver who treats "ratio five years ago" as if it directly IS "ratio now" (assuming ratios stay constant over time by default) reaches a false sense of sufficiency from Statement I alone — ratios of two quantities that grow by a FIXED ADDITIVE amount over time (aging by the same 5 or 10 years each) do NOT stay constant even though each person's own age simply increases; only an exact algebraic solve confirms sufficiency, never an assumption that ratios persist unchanged.

Worked Problem 5 — Painted cube plus a rework-cost table combined in one DI-style set. A cube of side 5 units is painted on all outer faces and cut into 125 unit cubes. Separately, a table lists five inspection batches with defective-item counts 3, 7, 5, 9, 6, each costing Rs. 250 to rework. Find (a) the number of fully interior (unpainted) unit cubes, and (b) the total rework cost across all batches. (a) Using (n−2)³ with n=5: (5−2)³ = 27 fully interior cubes. (b) Total defective items = 3+7+5+9+6 = 30; total rework cost = 30 × 250 = Rs. 7500. This problem is a reminder that a single question set can combine a SPATIAL formula and a plain DI table-sum in two unrelated sub-parts — solve each sub-part using its own dedicated technique from this chapter rather than searching for one unified method across both.

Worked Problem 6 — Cube net folding with a non-obvious opposite face. A cube net is a horizontal row of four squares B, C, D, E left to right, with a fifth square A attached directly above C, and a sixth square F attached directly below D. Which face lies opposite A? Apply the strip rule to the main horizontal strip B-C-D-E: 1st and 3rd (B and D) are opposite; 2nd and 4th (C and E) are opposite. The two squares OUTSIDE the main strip, A and F, form the third opposite pair by elimination — A is opposite F. COMMON ERROR: A is drawn directly above C in the flat net, tempting a wrong guess of "A opposite C" by visual proximity — but C's true opposite is E (2nd-4th rule), and A's actual opposite (F) is determined only by elimination of the two leftover squares, never by adjacency in the flat layout.

STRATEGY

DI traps are calibrated misreadings: percentage of the wrong base (profit as a share of revenue when the question specifies expenses), growth compared against the final value instead of the initial one, and unweighted averaging of two group means. Before computing anything, restate the question in the form "value A divided by value B" and confirm both quantities directly from the chart. Round smartly: GATE's answer options are usually spaced widely enough that approximating 33.33% as one-third, or 7200/12 as 600, settles the answer without long division.

Spatial traps: confusing a mirror (left-right flip) with a water (top-bottom flip) image, assuming a die in a puzzle follows the standard sum-to-seven rule when two independent views are given instead (in which case use the adjacency-elimination method), and forgetting that a punched hole multiplies by the number of LAYERS, not the number of folds directly. For painted-cube questions, always write the four formulas and total them to n³ as a verification step before committing to an answer.

Time policy: DI questions are typically two-mark questions that decompose cleanly into two or three one-line calculations — do them on paper, not mentally, since a single transposed digit destroys every mark riding on that calculation. Spatial questions are effectively thirty-second questions once the governing rule is correctly recalled; if a figure-based item resists visualisation under time pressure, apply this chapter's rule tables directly rather than staring harder at the figure trying to "see" the fold.
`
};
