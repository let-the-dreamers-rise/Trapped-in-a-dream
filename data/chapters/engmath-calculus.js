// Textbook chapter: Calculus.
// Written directly (no subagent) to match the depth and voice of the other
// chapters in data/chapters/.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['engmath-calculus'] = {
  figs: [
    {
      id: 'derivative-as-slope',
      caption: 'The derivative at a point is the limiting slope of the secant line through two nearby points as they merge into one — the tangent line at that point.',
      svg: "<svg viewBox=\"0 0 300 180\" width=\"100%\" style=\"max-width:300px;height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20,160 Q100,20 280,60\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\"/><g stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"><line x1=\"60\" y1=\"128\" x2=\"180\" y2=\"45\"/></g><circle cx=\"60\" cy=\"128\" r=\"3\" fill=\"currentColor\"/><circle cx=\"180\" cy=\"45\" r=\"3\" fill=\"currentColor\"/><g font-size=\"11\" fill=\"currentColor\"><text x=\"50\" y=\"145\">(a, f(a))</text><text x=\"185\" y=\"40\">(a+h, f(a+h))</text><text x=\"120\" y=\"150\">slope = [f(a+h)-f(a)]/h tends to f'(a) as h to 0</text></g></svg>"
    },
    {
      id: 'saddle-vs-extremum',
      caption: 'Contour sketches near a critical point: a bowl (local min, D>0, f_xx>0), a dome (local max, D>0, f_xx<0), and a saddle (D<0) that rises in one direction and falls in another.',
      svg: '<svg viewBox="0 0 340 120" width="100%" style="max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1" fill="none"><ellipse cx="60" cy="60" rx="40" ry="25"/><ellipse cx="60" cy="60" rx="25" ry="15"/><ellipse cx="60" cy="60" rx="10" ry="6"/></g><g stroke="currentColor" stroke-width="1" fill="none"><ellipse cx="170" cy="60" rx="40" ry="25"/><ellipse cx="170" cy="60" rx="25" ry="15"/><ellipse cx="170" cy="60" rx="10" ry="6"/></g><g stroke="currentColor" stroke-width="1" fill="none"><path d="M240,60 Q265,35 290,60 Q265,85 240,60"/><path d="M245,60 Q265,45 285,60 Q265,75 245,60"/><line x1="240" y1="30" x2="290" y2="90"/><line x1="290" y1="30" x2="240" y2="90"/></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="60" y="105">min (D&gt;0, f_xx&gt;0)</text><text x="170" y="105">max (D&gt;0, f_xx&lt;0)</text><text x="265" y="105">saddle (D&lt;0)</text></g></svg>'
    }
  ],
  text: `
WHY CALCULUS, AND THE THREE QUESTIONS IT ANSWERS

Calculus is built from exactly two operations — differentiation (measuring instantaneous rate of change) and integration (measuring accumulated total) — that turn out to be INVERSES of one another (the Fundamental Theorem of Calculus, met below, is precisely this inverse relationship made rigorous). Nearly every question in this chapter reduces to one of three underlying tasks: finding how fast something is changing at an instant (differentiation), finding where a function is largest, smallest, or changing behaviour (critical points and extrema, built from differentiation), or finding an accumulated total, area, or average (integration). As with the other Engineering Mathematics chapters, recognising WHICH of these three tasks a question is actually asking — often hidden behind unfamiliar physical or geometric language — is worth doing before reaching for any specific rule.

LIMITS AND CONTINUITY

A function f is CONTINUOUS at x=a if three conditions all hold: f(a) is defined, the LIMIT lim_{x→a} f(x) EXISTS (meaning the LEFT limit lim_{x→a⁻}f(x) and the RIGHT limit lim_{x→a⁺}f(x) both exist and are EQUAL to each other), and this common limit value EQUALS f(a) itself. Failing any one of these three conditions makes f discontinuous at a — a function can have a limit at a point without being continuous there (if the limit disagrees with f(a), a "removable" discontinuity), and a function can fail to have a limit at all (if the left and right limits disagree, a "jump" discontinuity).

STANDARD LIMITS worth having memorised outright, since deriving each from scratch under time pressure is far slower than recognising the pattern directly: lim_{x→0} sin(x)/x = 1. lim_{x→0} (1−cos x)/x² = 1/2. lim_{x→0} (eˣ−1)/x = 1. lim_{x→0} ln(1+x)/x = 1. lim_{x→∞} (1+1/x)ˣ = e. lim_{x→0} (aˣ−1)/x = ln(a).

1. These are not arbitrary facts to memorise in isolation — every one of them can be re-derived on the spot from the Maclaurin series of the function involved (introduced later in this chapter), which is exactly why cross-checking a limit computed one way against its series expansion is such a reliable habit: sin(x)/x = (x − x³/6 + ...)/x = 1 − x²/6 + ... → 1 as x→0, confirming the first standard limit directly from the series rather than from memory alone.
2. Recognising one of these SHAPES buried inside a more complicated limit (for instance, lim_{x→0} sin(3x)/(5x), which is really (3/5)·lim_{x→0} sin(3x)/(3x) = (3/5)(1) = 3/5 after a substitution u=3x) is a major speed tool, avoiding a full L'Hôpital derivation for a limit that is really just a disguised standard form.

L'HÔPITAL'S RULE: for INDETERMINATE FORMS specifically — 0/0 or ∞/∞, and ONLY these two forms — lim f(x)/g(x) = lim f'(x)/g'(x), PROVIDED the limit on the right actually exists (or is ±∞). The rule can be applied REPEATEDLY if, after one differentiation, the new ratio is still indeterminate in the same way.

GATE TRAP: applying L'Hôpital's rule to a limit that is NOT actually indeterminate (for example, attempting it on lim_{x→0} (x+1)/(x+2), which evaluates directly by substitution to 1/2 with no indeterminacy at all) gives a WRONG answer, since the rule's entire justification depends on the 0/0 or ∞/∞ starting condition; the very first step of any L'Hôpital application must be verifying the indeterminate form by direct substitution, not assuming it.

Worked trace: lim_{x→0} (eˣ−1−x)/x². Direct substitution gives (1−1−0)/0 = 0/0, indeterminate — L'Hôpital applies. Differentiate top and bottom: (eˣ−1)/(2x), which at x=0 is still 0/0 — apply again: eˣ/2, which at x=0 gives 1/2. Cross-check via the Maclaurin series eˣ = 1+x+x²/2+x³/6+...: eˣ−1−x = x²/2+x³/6+...; dividing by x² gives 1/2+x/6+... → 1/2 as x→0, matching exactly.

OTHER INDETERMINATE FORMS, CONVERTED TO 0/0 OR ∞/∞

L'Hôpital's rule directly handles only 0/0 and ∞/∞, but several OTHER classic indeterminate forms — 0·∞, ∞−∞, 0⁰, ∞⁰, and 1^∞ — arise regularly and can each be ALGEBRAICALLY REWRITTEN into one of the two forms L'Hôpital actually accepts, rather than needing a separate rule of their own.

1. FOR 0·∞ (a product where one factor →0 and the other →∞): rewrite f(x)g(x) as f(x)/(1/g(x)) — if g(x)→∞ then 1/g(x)→0, converting the product into a 0/0 quotient directly amenable to L'Hôpital.
2. FOR ∞−∞ (a difference of two terms each individually blowing up): typically combine the two terms over a COMMON DENOMINATOR first — the resulting single fraction usually reduces to a 0/0 or ∞/∞ form once combined, since the two original infinities are, in effect, cancelling against each other in a way only visible after combining.
3. FOR 0⁰, ∞⁰, and 1^∞ (all exponential indeterminate forms): take the NATURAL LOGARITHM of the expression first. If y = f(x)^g(x), then ln(y) = g(x)·ln(f(x)) — this converts the original exponential form into a 0·∞ product (handled by step 1 above), which further converts into 0/0 or ∞/∞ for L'Hôpital; once lim ln(y) is found, the original limit is recovered by EXPONENTIATING the result (lim y = e^{lim ln y}), since the exponential function is continuous.

Worked trace: evaluate lim_{x→0⁺} xˣ (a classic 0⁰ form, since x→0⁺ and the exponent x→0 too). Let y=xˣ, so ln(y)=x·ln(x), a 0·∞ form (x→0, ln(x)→−∞). Rewrite as ln(x)/(1/x), now a −∞/∞ form suitable for L'Hôpital: differentiate top and bottom, (1/x)/(−1/x²) = −x, which → 0 as x→0⁺. So lim ln(y) = 0, giving lim y = e⁰ = 1 — the surprising fact that xˣ → 1 as x→0⁺, despite the base shrinking to 0.

KEY: every "exotic" indeterminate form in this section (0·∞, ∞−∞, 0⁰, ∞⁰, 1^∞) is not a separate technique to memorise but a two-step ALGEBRAIC TRANSLATION exercise — first, rewrite the expression (via reciprocals, a common denominator, or a logarithm) until it becomes plainly 0/0 or ∞/∞, and only THEN apply L'Hôpital's rule, which itself is unchanged from the simpler cases already covered; the actual new skill here is the translation step, not a new limit rule.

DIFFERENTIATION RULES

Basic derivatives worth having as instant recall: d/dx(xⁿ)=nxⁿ⁻¹. d/dx(sin x)=cos x. d/dx(cos x)=−sin x. d/dx(tan x)=sec²x. d/dx(eˣ)=eˣ. d/dx(ln x)=1/x. d/dx(aˣ)=aˣ ln(a).

[[FIG:derivative-as-slope]]

Every derivative rule beyond these is built by combining functions, and each combination rule follows directly from the LIMIT DEFINITION of the derivative, f'(x) = lim_{h→0} [f(x+h)−f(x)]/h:

1. PRODUCT RULE: (fg)' = f'g + fg'. Derivation sketch: (fg)'(x) = lim_{h→0} [f(x+h)g(x+h) − f(x)g(x)]/h; adding and subtracting f(x+h)g(x) in the numerator splits this into f(x+h)·[g(x+h)−g(x)]/h + g(x)·[f(x+h)−f(x)]/h, and taking the limit of each piece (using f(x+h)→f(x) as h→0, since f is differentiable hence continuous) gives f(x)g'(x)+g(x)f'(x) exactly.
2. QUOTIENT RULE: (f/g)' = (f'g−fg')/g². This can be derived from the product rule by writing f/g = f·g⁻¹ and applying the product rule together with the chain rule (below) on g⁻¹.
3. CHAIN RULE: d/dx f(g(x)) = f'(g(x))·g'(x) — differentiate the "outer" function first (evaluated at the unchanged inner function), then multiply by the derivative of the "inner" function. This is the single most heavily used rule in practice, since almost every function encountered is a composition of simpler ones.

Worked trace, chaining all three rules together: differentiate y = x²·sin(3x²+1)/eˣ. Treat this as a product of x²sin(3x²+1) (itself needing the product and chain rules) and 1/eˣ (needing the chain rule, since 1/eˣ=e⁻ˣ and d/dx(e⁻ˣ)=−e⁻ˣ by the chain rule with inner function −x). Rather than working the full expression here, the key discipline is IDENTIFYING which rule governs the OUTERMOST structure first (here, a product of two factors — apply the product rule first) before descending into each factor's own internal rules — attempting to apply all rules simultaneously without this outside-in ordering is the most common source of dropped terms in a multi-rule differentiation.

MEAN VALUE THEOREM AND ROLLE'S THEOREM

THE MEAN VALUE THEOREM (MVT, also called LAGRANGE'S MEAN VALUE THEOREM): if f is continuous on the closed interval [a,b] and differentiable on the open interval (a,b), there EXISTS at least one point c in (a,b) such that f'(c) = [f(b)−f(a)]/(b−a) — the instantaneous rate of change at c exactly equals the AVERAGE rate of change (the slope of the secant line) across the whole interval.

ROLLE'S THEOREM is the SPECIAL CASE of MVT where f(a)=f(b) (the function returns to the same value at both endpoints): then [f(b)−f(a)]/(b−a)=0, so Rolle's theorem guarantees a point c in (a,b) with f'(c)=0 exactly — a horizontal tangent somewhere strictly between the two equal-height endpoints.

COMPARISON TABLE: Rolle's theorem needs the EXTRA condition f(a)=f(b), which MVT does not require at all; Rolle's conclusion is the SPECIFIC statement f'(c)=0, while MVT's conclusion is the MORE GENERAL statement f'(c) equals the secant slope; and Rolle's theorem is literally a special case of MVT, recovered exactly when MVT's secant slope happens to be zero.

GATE TRAP: applying Rolle's theorem to a function where f(a)≠f(b) is invalid — only the more general MVT applies in that case, guaranteeing a point matching the AVERAGE slope, which is generally NONZERO, not a point of zero slope; confusing which of the two theorems applies is a frequent, easily avoided error, and the single check that resolves it is simply comparing f(a) and f(b) directly before invoking either theorem.

MAXIMA, MINIMA, AND POINTS OF INFLECTION

A CRITICAL POINT of f is a point where f'(x)=0 (or where f' fails to exist). The FIRST DERIVATIVE TEST classifies a critical point by the SIGN CHANGE of f' across it: if f' changes from POSITIVE to NEGATIVE moving left-to-right through the critical point, it is a LOCAL MAXIMUM (the function was rising, then starts falling); if f' changes from NEGATIVE to POSITIVE, it is a LOCAL MINIMUM; if f' does NOT change sign at all (stays positive on both sides, or negative on both sides), the critical point is neither a max nor a min — often a point of inflection with a momentarily flat tangent.

THE SECOND DERIVATIVE TEST offers a shortcut avoiding an explicit sign-change check, whenever it applies: if f'(c)=0 and f''(c)<0, c is a LOCAL MAXIMUM (the function is concave DOWN there, curving away from a rising tangent into a falling one). If f'(c)=0 and f''(c)>0, c is a LOCAL MINIMUM (concave UP). If f''(c)=0, the test is genuinely INCONCLUSIVE — it says nothing at all, and falling back to the first-derivative sign-change test (or examining even higher derivatives) is the only correct next step.

GATE TRAP: when the second derivative test returns f''(c)=0, concluding "therefore c is NOT an extremum" (or, just as wrongly, assuming it must default to being an inflection point without further checking) is a common and entirely incorrect shortcut — f''(c)=0 truly proves nothing either way, and the standard textbook example x⁴ at x=0 has f''(0)=0 yet x=0 IS a genuine local (in fact global) minimum, confirmed only by checking that f'(x)=4x³ changes sign from negative to positive there.

A POINT OF INFLECTION is where the CONCAVITY of f switches — f'' changes SIGN, from concave-up (f''>0) to concave-down (f''<0) or vice versa. A NECESSARY condition for an inflection point is f''(x)=0 there, but this condition ALONE is not SUFFICIENT — f''=0 without an actual sign change on either side does not produce an inflection point.

GATE TRAP: a critical point (f'=0) is only a NECESSARY, not a SUFFICIENT, condition for a local extremum — the standard counterexample is f(x)=x³ at x=0: f'(x)=3x², so f'(0)=0, yet x=0 is a pure inflection point (f' stays non-negative on both sides, never actually changing from positive to negative or vice versa), not a maximum or minimum at all. This is worth holding as a fixed, immediately recalled counterexample whenever a problem's wording tempts the assumption that "f'(c)=0" by itself already guarantees an extremum.

KEY: three DIFFERENT conditions are frequently confused in this section and are worth keeping cleanly labelled — f'(c)=0 alone (a NECESSARY condition for an extremum, satisfied also by inflection points like x³ at 0, so not sufficient by itself), f'(c)=0 PLUS a sign change in f' across c (a fully sufficient and correct test for classifying the extremum type, valid even when f'' is hard to compute or equals zero), and f'(c)=0 PLUS f''(c)≠0 (a faster but sometimes inapplicable shortcut for the SAME classification, which reduces to the sign-change test whenever it does apply, and gives NO information whatsoever the moment f''(c)=0).

INTEGRATION AND THE FUNDAMENTAL THEOREM OF CALCULUS

THE FUNDAMENTAL THEOREM OF CALCULUS: if F is an ANTIDERIVATIVE of f (meaning F'=f), then ∫ₐᵇ f(x)dx = F(b)−F(a). This is the precise sense in which integration and differentiation are inverse operations: accumulating f's rate of change from a to b exactly recovers the net change in any antiderivative F over that same interval, regardless of which particular antiderivative (differing only by a constant) is chosen, since the constant cancels in F(b)−F(a).

Standard integrals, each the direct reverse of a standard derivative above: ∫xⁿdx = xⁿ⁺¹/(n+1)+C (for n≠−1, since dividing by n+1=0 would be undefined). ∫(1/x)dx = ln|x|+C (the special n=−1 case the power rule cannot handle, patched by the logarithm instead). ∫eˣdx = eˣ+C. ∫sin(x)dx = −cos(x)+C. ∫cos(x)dx = sin(x)+C. ∫sec²(x)dx = tan(x)+C.

INTEGRATION BY PARTS: ∫u dv = uv − ∫v du, derived directly by reversing the product rule (integrating both sides of (uv)'=u'v+uv' with respect to x, and rearranging). The ILATE mnemonic (Inverse trig, Logarithmic, Algebraic, Trigonometric, Exponential) suggests, in that priority order, which factor of a product to designate as "u" (the factor differentiated) — factors appearing EARLIER in ILATE are generally better choices for u, since they tend to SIMPLIFY (or at least not worsen) upon differentiation, while factors appearing later (especially exponentials) tend to reproduce themselves cleanly upon integration, making them good choices for "dv" instead.

GATE TRAP: ILATE is a HEURISTIC, not an absolute rule — blindly following it without checking whether the resulting ∫v du is actually simpler than the original integral can, in some edge cases, produce an infinitely recurring integral that never resolves; a quick sanity check (does the chosen dv have an easily computable antiderivative v, and does the resulting v du actually look more tractable than the original) is worth doing before committing to a choice, rather than trusting the mnemonic mechanically in every case.

DEFINITE INTEGRAL PROPERTIES AND SYMMETRY

Several structural properties of definite integrals are worth using directly as shortcuts, rather than re-deriving from the Fundamental Theorem every time: ∫ₐᵇf(x)dx = −∫ᵦᵃf(x)dx (reversing the limits flips the sign). ∫ₐᵃf(x)dx = 0 (an interval of zero width always integrates to zero). If f is EVEN (f(−x)=f(x), symmetric about the y-axis), ∫₋ₐᵃf(x)dx = 2∫₀ᵃf(x)dx (the two symmetric halves contribute equally, so only one half needs computing, then doubled). If f is ODD (f(−x)=−f(x), symmetric through the origin), ∫₋ₐᵃf(x)dx = 0 EXACTLY, regardless of how complicated f looks internally — the negative-side contribution exactly cancels the positive-side contribution by the very definition of odd symmetry.

1. Deriving the odd-function result directly: split ∫₋ₐᵃf(x)dx = ∫₋ₐ⁰f(x)dx + ∫₀ᵃf(x)dx. Substituting x=−t in the first integral (dx=−dt, limits flip from x=−a,0 to t=a,0) gives ∫ₐ⁰f(−t)(−dt) = ∫₀ᵃf(−t)dt = ∫₀ᵃ(−f(t))dt (using oddness, f(−t)=−f(t)) = −∫₀ᵃf(t)dt. Adding this to the second piece ∫₀ᵃf(x)dx gives −∫₀ᵃf(t)dt + ∫₀ᵃf(x)dx = 0 exactly, confirming the shortcut algebraically rather than just asserting it.
2. Recognising odd/even symmetry BEFORE attempting to compute an integral directly is a major time-saver on any symmetric-interval integral: a function like x⁵sin(x²) (odd × even = odd, using the standard product-of-parities rules) integrated from −2 to 2 is IMMEDIATELY zero, with no antiderivative computation needed at all.

GATE TRAP: the odd/even shortcuts apply ONLY to symmetric limits of the exact form [−a,a] — a superficially similar integral over, say, [−1,3] (not symmetric about zero) gets NO benefit from f being odd or even, and must be computed directly by the Fundamental Theorem; misapplying the shortcut to an asymmetric interval is a purely mechanical error worth watching for explicitly in the limits before reaching for the symmetry shortcut.

It is worth pausing on WHY the symmetry shortcuts save real computation, rather than treating them as arbitrary rules to apply on recognising the right shape: for an odd function, every bit of positive area accumulated on one side of the origin is mirrored by an EQUAL amount of negative area on the other side, so the net signed area — which is exactly what a definite integral measures — must cancel completely, no matter how intricate the function looks in between; for an even function, the two halves instead reinforce rather than cancel, so computing just one half and doubling it is mathematically identical to, but computationally roughly half the work of, evaluating the full antiderivative across the entire symmetric range from scratch every single time a symmetric-limits integral of this exact shape comes up again in a worked problem, or buried inside a longer multi-part question built around several of this chapter's earlier tools combined at once — spotting the symmetry FIRST, before setting up any antiderivative at all, is what turns a potentially lengthy computation into an instant answer, and it is a habit worth practising deliberately on sight rather than only after already committing pen to the full integration.

PARTIAL DERIVATIVES AND MULTIVARIABLE CRITICAL POINTS

A PARTIAL DERIVATIVE differentiates a multivariable function with respect to ONE variable, treating every other variable as a temporarily fixed CONSTANT — denoted ∂f/∂x (holding y, z, ... fixed) or ∂f/∂y (holding x, z, ... fixed), and so on.

[[FIG:saddle-vs-extremum]]

For z=f(x,y), a CRITICAL POINT requires BOTH partial derivatives to vanish SIMULTANEOUSLY: ∂f/∂x=0 AND ∂f/∂y=0 — a direct two-variable generalisation of the single-variable f'=0 condition, since a genuine local extremum in two dimensions must have zero slope in EVERY direction through that point, and the two axis-aligned partials being zero is (given enough smoothness) equivalent to every directional derivative being zero there.

THE SECOND DERIVATIVE TEST FOR TWO VARIABLES uses the HESSIAN determinant D = fₓₓ·f_yy − (fₓy)² evaluated at the critical point:

1. If D>0 and fₓₓ>0: LOCAL MINIMUM (the surface curves upward in every direction near the point, like the inside of a bowl).
2. If D>0 and fₓₓ<0: LOCAL MAXIMUM (the surface curves downward in every direction, like the top of a dome).
3. If D<0: SADDLE POINT — the surface rises in some directions through the point and falls in others (neither a max nor a min), the two-variable analogue of an inflection point, but now with an added twist that a saddle is possible even when BOTH fₓₓ and f_yy individually suggest a max or min in their own single-variable slice.
4. If D=0: the test is INCONCLUSIVE, exactly mirroring the single-variable f''(c)=0 case, and a different method (direct examination of f near the point) is required.

GATE TRAP: the saddle-point case is the single most frequently overlooked category in this test — a common incomplete approach computes only fₓₓ and f_yy, sees that (for example) fₓₓ>0 and f_yy>0 "look like" a minimum, and stops there without ever checking the CROSS term fₓy at all; but a large enough fₓy can flip D negative despite both individual second partials being positive, turning an apparent "minimum-looking" point into an actual saddle — the cross term must always be checked, never skipped as "probably small."

Worked trace: classify the critical points of f(x,y) = x²+y²−4x−6y+13. Partials: fₓ=2x−4, f_y=2y−6. Setting both to zero: x=2, y=3 — the unique critical point is (2,3). Hessian entries: fₓₓ=2, f_yy=2, fₓy=0 (no cross term at all in this particular function). D = (2)(2)−0² = 4 > 0, and fₓₓ=2>0, so (2,3) is a LOCAL MINIMUM. Value there: f(2,3)=4+9−8−18+13=0 — since this function is a sum of squares plus constants (completing the square confirms it equals (x−2)²+(y−3)² exactly), this local minimum is in fact the GLOBAL minimum, with value 0.

THE MULTIVARIABLE CHAIN RULE

If z=f(x,y) where x and y are themselves both functions of a single parameter t (x=x(t), y=y(t)), the TOTAL DERIVATIVE of z with respect to t is dz/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt) — each "path" from t to z (through x, and separately through y) contributes its own product-of-rates term, and the two contributions are summed, exactly mirroring how a change in t causes a change in BOTH x and y simultaneously, each of which independently nudges z.

EULER'S THEOREM ON HOMOGENEOUS FUNCTIONS: a function f(x,y) is HOMOGENEOUS OF DEGREE n if f(tx,ty) = tⁿf(x,y) for every scalar t — scaling every input by a common factor t scales the output by tⁿ. Euler's theorem states that for such a function, x(∂f/∂x) + y(∂f/∂y) = n·f(x,y).

1. Sketch of why this holds: differentiate both sides of f(tx,ty)=tⁿf(x,y) with respect to t (treating x,y as fixed constants and t as the variable), using the chain rule on the left side: x·fₓ(tx,ty) + y·f_y(tx,ty) = n·tⁿ⁻¹f(x,y).
2. Setting t=1 in this differentiated identity (a valid substitution, since the identity holds for every t) gives exactly x·fₓ(x,y)+y·f_y(x,y) = n·f(x,y), Euler's theorem.
3. Worked check: f(x,y)=x²y+xy² is homogeneous of degree 3 (f(tx,ty)=(tx)²(ty)+(tx)(ty)²=t³x²y+t³xy²=t³f(x,y), confirmed). fₓ=2xy+y², f_y=x²+2xy. Euler's sum: x(2xy+y²)+y(x²+2xy) = 2x²y+xy²+x²y+2xy² = 3x²y+3xy² = 3(x²y+xy²) = 3f(x,y), matching n=3 exactly.

TAYLOR AND MACLAURIN SERIES

The TAYLOR SERIES of f about a point x=a expresses f(x) as an infinite sum built from f and all its derivatives evaluated at that single point a: f(x) = f(a) + f'(a)(x−a) + f''(a)(x−a)²/2! + f'''(a)(x−a)³/3! + .... The MACLAURIN SERIES is simply the special case a=0.

Maclaurin series worth memorising outright, each derivable by repeatedly differentiating the function and evaluating at 0: eˣ = 1+x+x²/2!+x³/3!+.... sin(x) = x−x³/3!+x⁵/5!−.... cos(x) = 1−x²/2!+x⁴/4!−.... ln(1+x) = x−x²/2+x³/3−... (valid for −1<x≤1 — note x=1 IS included in the valid range, but x=−1 is NOT, a boundary detail occasionally tested directly). (1+x)ⁿ = 1+nx+n(n−1)x²/2!+... (the BINOMIAL SERIES, valid for |x|<1 whenever n is not itself a non-negative integer, in which case the series would otherwise terminate into the ordinary finite binomial expansion).

KEY: the standard limits given at the start of this chapter are not independent facts to memorise separately from these series — every one of them is a direct one-line consequence of truncating the relevant series to its first surviving term and letting the higher-order terms vanish as x→0, which is exactly why series expansion is such a reliable cross-check method for a limit computed by L'Hôpital's rule or by any other method: if the two methods disagree, at least one contains an arithmetic error, and re-deriving via the series (usually the more mechanical, less error-prone of the two routes) is often the fastest way to locate it.

SEQUENCES, SERIES, AND CONVERGENCE TESTS

A SEQUENCE {aₙ} CONVERGES to a limit L if aₙ→L as n→∞ (in the same limiting sense as the function limits above, but with n restricted to integers going to infinity). A SERIES Σaₙ is the sum of the terms of a sequence, and it CONVERGES if its sequence of PARTIAL SUMS (Sₙ = a₁+a₂+...+aₙ) converges to a finite limit as n→∞; otherwise the series DIVERGES.

THE GEOMETRIC SERIES Σrⁿ (starting from n=0) converges if and only if |r|<1, in which case it converges to exactly 1/(1−r) — this single fact underlies an enormous number of GATE-style convergence questions once a series is recognised as geometric (or as closely related to one).

1. Derivation of the sum formula: let Sₙ = 1+r+r²+...+rⁿ⁻¹ (n terms). Then rSₙ = r+r²+...+rⁿ. Subtracting: Sₙ−rSₙ = 1−rⁿ, so Sₙ(1−r)=1−rⁿ, giving Sₙ = (1−rⁿ)/(1−r).
2. As n→∞, if |r|<1, rⁿ→0, so Sₙ→1/(1−r) exactly. If |r|≥1, rⁿ does not go to 0 (it grows unboundedly for |r|>1, or oscillates/stays at a fixed nonzero magnitude for r=±1), so the series diverges.

THE RATIO TEST: for a series Σaₙ with positive terms, compute L = lim_{n→∞} |aₙ₊₁/aₙ|. If L<1, the series CONVERGES (absolutely). If L>1 (including L=∞), the series DIVERGES. If L=1, the test is INCONCLUSIVE — exactly analogous to the second-derivative test's D=0 case above, this outcome says nothing at all, and a different test must be tried instead.

Worked trace: does Σ(n/2ⁿ) converge? Ratio test: aₙ₊₁/aₙ = [(n+1)/2ⁿ⁺¹] / [n/2ⁿ] = [(n+1)/n]·(2ⁿ/2ⁿ⁺¹) = [(n+1)/n]·(1/2). As n→∞, (n+1)/n → 1, so the ratio → 1×(1/2) = 1/2 < 1 — the series CONVERGES by the ratio test.

THE p-SERIES TEST: Σ(1/nᵖ) converges if p>1 and diverges if p≤1 — in particular, the HARMONIC SERIES Σ(1/n) (the p=1 boundary case) DIVERGES, a famous and easily misjudged fact, since the individual terms 1/n do go to 0, yet the series' partial sums still grow without bound (arbitrarily slowly, but without limit).

GATE TRAP: individual terms of a series going to zero (aₙ→0) is a NECESSARY condition for convergence (the "nth term test" — if aₙ does NOT go to 0, the series diverges immediately, with no further test needed) but it is emphatically NOT SUFFICIENT — the harmonic series Σ(1/n) is the standard counterexample, with terms shrinking to zero yet the series still diverging; confirming aₙ→0 only rules divergence IN, it never confirms convergence.

KEY: convergence tests form a decision hierarchy worth using in a fixed, efficient order — first check whether aₙ→0 at all (a fast way to rule OUT convergence immediately if it fails); if that passes, check whether the series is geometric or a p-series (both resolved instantly by their respective closed conditions above); only then reach for the ratio test (most useful when factorials or exponentials are present) or another named test, since applying the ratio test to a simple geometric or p-series is valid but wastes time solving something already resolvable by inspection.

It is worth noting explicitly why the ratio test is the natural next tool specifically when FACTORIALS or EXPONENTIALS appear: both n! and constants raised to the n-th power collapse into a clean, simplifiable ratio aₙ₊₁/aₙ (since (n+1)!/n!=n+1 cancels almost entirely, and cⁿ⁺¹/cⁿ=c cancels completely), whereas the SAME series types tend to resist the p-series and geometric tests directly, since neither n! nor a mixed factorial-and-exponential expression fits either of those two tests' required shapes. This is precisely why the worked traces above chose n/2ⁿ and 3ⁿ/n! as the ratio-test examples: both combine an exponential (or factorial) term that the ratio test handles cleanly with an ordinary polynomial term that contributes only a vanishing correction factor ((n+1)/n → 1, or n!/(n+1)!=1/(n+1) → 0) as n grows, leaving the exponential or factorial factor to determine the entire limiting ratio and hence the entire convergence verdict.

IMPROPER INTEGRALS

An INTEGRAL is IMPROPER if it has an infinite limit of integration, or if the integrand becomes unbounded (blows up) somewhere within the interval of integration. Both kinds are handled the same way: replace the problematic bound with a variable, evaluate the ordinary (proper) definite integral in terms of that variable, and then take the LIMIT as the variable approaches the troublesome value.

1. Infinite-limit case: ∫ₐ^∞ f(x)dx is DEFINED as lim_{b→∞} ∫ₐᵇ f(x)dx — the improper integral CONVERGES if this limit exists (is finite), and DIVERGES otherwise.
2. Worked trace: evaluate ∫₁^∞ (1/x²)dx. ∫₁ᵇ(1/x²)dx = [−1/x]₁ᵇ = −1/b−(−1/1) = 1−1/b. Taking b→∞: 1−1/b → 1−0 = 1. The improper integral CONVERGES to 1.
3. Contrast directly with ∫₁^∞(1/x)dx (the same shape, but with the p=1 boundary case from the p-series discussion above, now as an integral rather than a sum): ∫₁ᵇ(1/x)dx = [ln x]₁ᵇ = ln(b)−ln(1) = ln(b). As b→∞, ln(b)→∞ — this improper integral DIVERGES, exactly mirroring the harmonic series' divergence and reinforcing that p=1 is genuinely the dividing line, on both the series side and the integral side of this comparison.
4. Unbounded-integrand case: for a function blowing up at an interior or boundary point c within [a,b], ∫ₐᵇf(x)dx is defined via a one-sided limit approaching c, similarly checked for convergence — for example ∫₀¹(1/√x)dx = lim_{ε→0⁺}∫_ε¹(1/√x)dx = lim_{ε→0⁺}[2√x]_ε¹ = lim_{ε→0⁺}(2−2√ε) = 2−0 = 2, CONVERGING despite the integrand blowing up at x=0, since the "spike" near zero is narrow enough for its area to stay finite.

GATE TRAP: an integral with an infinite bound or an unbounded integrand looks, superficially, just like an ordinary definite integral if the Fundamental Theorem's antiderivative-evaluation notation is applied carelessly without explicitly taking the limit — but ∫₁^∞(1/x)dx = [ln x]₁^∞ is NOT a valid final step on its own; the limit must be taken explicitly (as done in the worked trace above) to correctly identify divergence, since plugging "∞" directly into ln(x) without the limiting process obscures exactly the divergence the improper-integral machinery exists to detect.

GRADIENT AND DIRECTIONAL DERIVATIVE

For a multivariable function f(x,y), the GRADIENT ∇f is the VECTOR of its partial derivatives: ∇f = (∂f/∂x, ∂f/∂y). The gradient packs together, into a single object, all the directional-rate-of-change information about f at a point, and it has a clean geometric meaning worth holding as fixed knowledge:

1. The gradient ∇f points in the direction of STEEPEST INCREASE of f at that point, and its MAGNITUDE ‖∇f‖ is exactly the rate of that steepest increase.
2. The DIRECTIONAL DERIVATIVE of f at a point, in the direction of a UNIT vector û, is D_û f = ∇f · û (the dot product of the gradient with the direction vector) — this generalises the ordinary partial derivatives exactly, since taking û=(1,0) recovers ∂f/∂x and û=(0,1) recovers ∂f/∂y directly from the dot product.
3. By the Cauchy-Schwarz-flavoured reasoning met in the linear algebra chapter, D_û f = ∇f·û = ‖∇f‖‖û‖cos θ = ‖∇f‖cos θ (since û is a UNIT vector), and this is MAXIMISED exactly when cos θ=1, i.e. when û points in the SAME direction as ∇f — directly confirming the "steepest increase" claim above from the dot-product definition alone, rather than as a separate assumed fact.
4. The gradient is always PERPENDICULAR to the level curves (or level surfaces, in three variables) of f — the curves along which f stays CONSTANT — since moving ALONG a level curve produces zero directional derivative (f is not changing in that direction at all), and D_û f=0 exactly when ∇f·û=0, i.e. when û is perpendicular to ∇f.

Worked trace: for f(x,y)=x²y, find the gradient at (2,1) and the directional derivative in the direction of (3,4). ∇f = (2xy, x²) = at (2,1): (2(2)(1), 2²) = (4,4). Direction (3,4) has magnitude 5, so the unit vector is (3/5,4/5). D_û f = (4,4)·(3/5,4/5) = 12/5+16/5 = 28/5.

CURVE SKETCHING AND ASYMPTOTES

Sketching a curve accurately, or answering a question about its shape without a picture, combines several of this chapter's earlier tools into one checklist: DOMAIN restrictions (values of x the function is not defined at), INTERCEPTS (where the curve crosses the axes), CRITICAL POINTS and their classification (from the first/second derivative tests above), INFLECTION POINTS (from the second-derivative sign-change test above), and ASYMPTOTES — lines the curve approaches but never (or only eventually) touches.

1. A VERTICAL ASYMPTOTE at x=c occurs where f(x)→±∞ as x→c (from one or both sides) — typically where a denominator vanishes while the numerator does not, in a rational function.
2. A HORIZONTAL ASYMPTOTE at y=L occurs where lim_{x→∞}f(x)=L or lim_{x→−∞}f(x)=L (the two limits need not agree, giving potentially two different horizontal asymptotes on the two sides).
3. For a rational function P(x)/Q(x), comparing the DEGREES of P and Q gives an immediate shortcut for horizontal asymptotes without computing a limit directly: if deg(P)<deg(Q), the horizontal asymptote is y=0 (the denominator eventually dominates, driving the whole fraction to 0). If deg(P)=deg(Q), the horizontal asymptote is y = (leading coefficient of P)/(leading coefficient of Q) (the ratio of the two dominant terms as x→∞). If deg(P)>deg(Q), there is NO horizontal asymptote at all (the fraction grows without bound) — though there may instead be an OBLIQUE (slant) asymptote, found by polynomial long division, whenever deg(P) is exactly one more than deg(Q).

Worked trace: find all asymptotes of f(x) = (2x²+1)/(x²−4). Vertical asymptotes: the denominator x²−4=(x−2)(x+2) vanishes at x=2 and x=−2, and the numerator does not vanish at either point (2(4)+1=9≠0), so BOTH x=2 and x=−2 are vertical asymptotes. Horizontal asymptote: numerator and denominator both have degree 2, so the horizontal asymptote is y = 2/1 = 2 (the ratio of leading coefficients).

GATE TRAP: assuming a curve can never actually CROSS a horizontal asymptote is a common misconception — a horizontal asymptote only describes the curve's behaviour as x→±∞ (an "eventual" limiting statement), and a function is entirely free to cross its own horizontal asymptote any number of times at FINITE x-values; only a VERTICAL asymptote (where the function is undefined and genuinely blows up) cannot be crossed at the specific x=c itself, since the function has no value there at all.

KEY: the degree-comparison shortcut for a rational function's horizontal asymptote (compare deg(P) to deg(Q), then read off y=0, the leading-coefficient ratio, or "none," directly) is worth using as the default method rather than computing lim_{x→∞} via L'Hôpital's rule every single time — L'Hôpital would, of course, arrive at the identical answer if applied correctly, but the degree-comparison shortcut is faster and has no indeterminate-form bookkeeping to get wrong along the way.

VECTOR CALCULUS: DIVERGENCE AND CURL

For a VECTOR FIELD F = (P,Q,R) (a vector-valued function assigning a vector to every point in space, with components P, Q, R each themselves functions of x,y,z), two derived scalar/vector quantities recur throughout applications and appear at a recognition level:

1. The DIVERGENCE of F is the SCALAR quantity div F = ∂P/∂x + ∂Q/∂y + ∂R/∂z — informally, a measure of how much the vector field is "spreading out" (a positive divergence) or "converging inward" (a negative divergence) at a given point, like a local measure of a fluid's net outflow from an infinitesimal region.
2. The CURL of F is the VECTOR quantity curl F = ∇×F (the cross product of the vector differential operator ∇=(∂/∂x,∂/∂y,∂/∂z) with F), measuring the local ROTATION or "swirl" of the vector field at a point — a curl of zero everywhere means the field has no local rotation anywhere (such a field is called IRROTATIONAL), and this condition is exactly what characterises a CONSERVATIVE vector field (one that is the gradient of some scalar potential function).
3. A useful identity worth recognising: curl(∇f) = 0 for ANY scalar function f — the curl of a gradient is always identically zero, which is precisely why a gradient field is automatically irrotational; this also underlies the standard test "is this vector field conservative" by checking whether its curl vanishes.

Worked trace: for F=(y,−x,0), compute the divergence and curl. div F = ∂(y)/∂x + ∂(−x)/∂y + ∂(0)/∂z = 0+0+0 = 0 (this particular field has zero divergence everywhere — it is purely "rotational," with no net local spreading). curl F, computing only the z-component (the only nonzero one here, since P and Q depend only on x,y and R=0): (∂Q/∂x − ∂P/∂y) = ∂(−x)/∂x − ∂(y)/∂y = −1−1 = −2, giving curl F = (0,0,−2) — this field genuinely rotates (a nonzero curl), consistent with F=(y,−x,0) describing rotation around the z-axis directly (it is exactly the velocity field of rigid rotation).

WORKED PROBLEMS

1. L'HÔPITAL VALIDITY CHECK. Evaluate lim_{x→2} (x²−4)/(x−2) — first checking whether L'Hôpital's rule is even needed. Direct substitution gives (4−4)/(2−2)=0/0, indeterminate, so L'Hôpital applies: differentiate top and bottom, 2x/1, which at x=2 gives 4. Cross-check by factoring instead (avoiding L'Hôpital entirely): (x²−4)/(x−2) = (x−2)(x+2)/(x−2) = x+2 for x≠2, which at x→2 gives 4 — matching exactly.

2. STANDARD LIMIT RECOGNITION. Evaluate lim_{x→0} sin(5x)/(3x). Substituting u=5x (so x=u/5, and x→0 corresponds to u→0): sin(5x)/(3x) = sin(u)/(3u/5) = (5/3)·sin(u)/u → (5/3)(1) = 5/3 as u→0, using the standard limit sin(u)/u→1 directly.

3. FIRST VS SECOND DERIVATIVE TEST. Classify the critical points of f(x)=x³−3x. f'(x)=3x²−3=3(x−1)(x+1), zero at x=1 and x=−1. f''(x)=6x. At x=1: f''(1)=6>0, LOCAL MINIMUM. At x=−1: f''(−1)=−6<0, LOCAL MAXIMUM. Values: f(1)=1−3=−2 (local min value), f(−1)=−1+3=2 (local max value).

4. INFLECTION POINT. Find the inflection point of f(x)=x³−3x (continuing problem 3). f''(x)=6x, zero at x=0. Checking for an actual sign change (necessary since f''=0 alone is not sufficient): for x<0, f''(x)<0 (concave down); for x>0, f''(x)>0 (concave up) — a genuine sign change confirms x=0 is a true inflection point, with f(0)=0.

5. ODD FUNCTION SHORTCUT. Evaluate ∫₋₃³ (x³−4x) dx without expanding term by term. x³ is odd and 4x is odd, so x³−4x is a sum of two odd functions, hence itself odd. By the odd-function shortcut, the integral over the symmetric interval [−3,3] is exactly 0, with no antiderivative evaluation needed at all.

6. EVEN FUNCTION SHORTCUT. Evaluate ∫₋₂² (3x²+1) dx. 3x²+1 is even (unchanged under x→−x). Using the even-function shortcut: ∫₋₂²(3x²+1)dx = 2∫₀²(3x²+1)dx = 2[x³+x]₀² = 2[(8+2)−0] = 2(10) = 20.

7. INTEGRATION BY PARTS. Evaluate ∫x·eˣdx. By ILATE, "Algebraic" (x) ranks ahead of "Exponential" (eˣ), so choose u=x, dv=eˣdx, giving du=dx, v=eˣ. ∫u dv = uv−∫v du = xeˣ − ∫eˣdx = xeˣ−eˣ+C = eˣ(x−1)+C. Verify by differentiating the answer: d/dx[eˣ(x−1)] = eˣ(x−1)+eˣ(1) = eˣ(x−1+1) = xeˣ, matching the original integrand exactly.

8. TWO-VARIABLE CRITICAL POINT WITH A CROSS TERM. Classify the critical point of f(x,y)=x²+xy+y²−3x. Partials: fₓ=2x+y−3, f_y=x+2y. Setting both to zero: from f_y=0, x=−2y; substituting into fₓ=0: 2(−2y)+y−3=0, giving −4y+y−3=0, −3y=3, y=−1, so x=−2(−1)=2. Critical point: (2,−1). Hessian: fₓₓ=2, f_yy=2, fₓy=1 (the cross term, which must not be skipped). D = 2(2)−1² = 4−1=3>0, and fₓₓ=2>0, so (2,−1) is a LOCAL MINIMUM — but note the cross term fₓy=1 was essential to this computation, and a shortcut that stopped after checking only fₓₓ and f_yy would have missed the −1 correction to D entirely, though it happens not to flip the sign in this particular example.

9. EULER'S THEOREM CHECK. Verify Euler's theorem for f(x,y)=x³+3x²y (homogeneous of degree 3, confirmed by f(tx,ty)=t³x³+3t³x²y=t³f(x,y)). fₓ=3x²+6xy, f_y=3x². Euler's sum: x(3x²+6xy)+y(3x²) = 3x³+6x²y+3x²y = 3x³+9x²y. Compare to n·f = 3(x³+3x²y) = 3x³+9x²y — matches exactly.

10. RATIO TEST. Determine whether Σ(3ⁿ/n!) converges. aₙ₊₁/aₙ = [3ⁿ⁺¹/(n+1)!]/[3ⁿ/n!] = 3·n!/(n+1)! = 3/(n+1). As n→∞, this ratio → 0 < 1, so the series CONVERGES by the ratio test (factorial growth in the denominator eventually overwhelms any fixed exponential base in the numerator).

11. IMPROPER INTEGRAL. Evaluate ∫₁^∞ (1/x³)dx and determine convergence. ∫₁ᵇ(1/x³)dx = [−1/(2x²)]₁ᵇ = −1/(2b²)−(−1/2) = 1/2−1/(2b²). As b→∞, 1/(2b²)→0, so the integral CONVERGES to 1/2.

12. GRADIENT AND STEEPEST DIRECTION. For f(x,y)=x²+y², find the direction of steepest increase at the point (1,2), and the rate of increase in that direction. ∇f=(2x,2y), at (1,2): (2,4). The direction of steepest increase is along the vector (2,4) itself (or its unit form), and the rate of that steepest increase is ‖∇f‖ = √(4+16) = √20 = 2√5.

13. HORIZONTAL AND VERTICAL ASYMPTOTES. Find all asymptotes of f(x)=(3x)/(x−5). Vertical: denominator vanishes at x=5, numerator (15) does not, so x=5 is a vertical asymptote. Horizontal: both numerator and denominator have degree 1, so the horizontal asymptote is y = 3/1 = 3 (ratio of leading coefficients).

14. EXOTIC INDETERMINATE FORM. Evaluate lim_{x→∞} (1+3/x)ˣ (a 1^∞ form). Let y=(1+3/x)ˣ, ln(y)=x·ln(1+3/x), a ∞·0 form. Rewrite as ln(1+3/x)/(1/x), a 0/0 form as x→∞ (since 1/x→0 makes both numerator and denominator →0). Apply L'Hôpital, differentiating with respect to x: numerator derivative is [1/(1+3/x)]·(−3/x²) = −3/[x²(1+3/x)] = −3/(x²+3x); denominator derivative is −1/x². Ratio: [−3/(x²+3x)]/[−1/x²] = 3x²/(x²+3x) = 3x/(x+3) → 3 as x→∞. So lim ln(y)=3, giving lim y = e³ — matching the standard fact that (1+k/x)ˣ→eᵏ as x→∞, here with k=3.

15. DIVERGENCE AND CURL. For F=(x²,y²,z²), compute the divergence and curl. div F = ∂(x²)/∂x + ∂(y²)/∂y + ∂(z²)/∂z = 2x+2y+2z. curl F: each component is a difference of cross-partials of P=x²,Q=y²,R=z², and since each of P,Q,R depends on only ITS OWN variable (P has no y or z dependence, and so on), every cross-partial term (like ∂R/∂y or ∂P/∂z) is zero, giving curl F = (0,0,0) — this field is irrotational (consistent with F being the gradient of the scalar potential f(x,y,z)=(x³+y³+z³)/3, confirmed by ∇f=(x²,y²,z²)=F exactly, and curl of any gradient is always zero as noted above).

16. p-SERIES CLASSIFICATION. Classify Σ(1/n^1.5) and Σ(1/√n) as convergent or divergent. For Σ(1/n^1.5), p=1.5>1, so it CONVERGES by the p-series test. For Σ(1/√n)=Σ(1/n^0.5), p=0.5≤1, so it DIVERGES — despite the individual terms 1/√n shrinking to 0 just as the harmonic series' terms do, the slightly slower decay rate (p=0.5 versus the harmonic series' own boundary p=1) still is not enough to make the sum finite, exactly the same qualitative behaviour as the harmonic series itself.

17. nth-TERM DIVERGENCE TEST. Determine whether Σ(n/(n+1)) converges or diverges, using the fastest applicable check first. As n→∞, n/(n+1) → 1, NOT 0 — since the terms themselves fail to approach zero, the series DIVERGES immediately by the nth-term test, with no need to reach for the ratio test, a p-series comparison, or any other more elaborate machinery at all. This is exactly the ordering the earlier KEY card on convergence-test strategy recommends: checking the cheapest test (does aₙ actually tend to zero) before ever reaching for the ratio test saves real time here, since the ratio test would have needed a full limit computation to reach the same immediate conclusion this single glance already supplies — and it is worth stressing again, since the trap above depends on it directly, that the CONVERSE check (confirming aₙ→0) never by itself proves convergence; it only ever rules divergence in, never confirms convergence, so a series passing this cheap first test still genuinely needs one of the sharper tests (geometric, p-series, or ratio) before its convergence can actually be declared — the harmonic series itself is the standing reminder of exactly this gap, since its terms pass the necessary aₙ→0 check cleanly while the series as a whole still diverges without limit, growing (very slowly, but genuinely without bound) as more and more terms are added to the running total.

CARRYING THIS FORWARD

Every technique in this chapter traces back to one of the three tasks named at the start: instantaneous rate of change (differentiation and its rules), locating and classifying extrema (built from setting derivatives to zero and then checking a sign change or a second-derivative/Hessian test), and accumulated totals (integration, tied back to differentiation by the Fundamental Theorem). The recurring FAILURE MODE across nearly every worked problem and GATE TRAP in this chapter is the same one: treating a NECESSARY condition as if it were SUFFICIENT — a critical point is necessary but not sufficient for an extremum (x³ at 0 fails this), an indeterminate FORM is necessary before L'Hôpital applies at all (a non-indeterminate limit fails this in the other direction, ruling the rule out rather than in), f''(c)=0 or the two-variable D=0 are each necessary conditions the corresponding test cannot resolve on their own, and even a small missed cross term in the Hessian can silently change a computed D from positive to negative. The single habit worth carrying forward from this entire chapter is checking the ACTUAL hypotheses of a theorem or test (Is the form really indeterminate? Did the second derivative actually come out nonzero? Was the cross-partial actually computed, not assumed small?) before trusting its conclusion, rather than pattern-matching a problem to a remembered formula and assuming the formula's preconditions were automatically satisfied.

The later sections of this chapter — series convergence, improper integrals, asymptotes, gradients, divergence and curl — are, once again, not a separate harder layer bolted onto the earlier three tasks but the same three tasks pushed to their natural limiting cases. A series is exactly a limit of partial sums, so every convergence test is secretly a limit question dressed in new notation; an improper integral is exactly a limit of an ordinary definite integral as a bound is pushed to infinity or toward a singularity, so the Fundamental Theorem still does all the real work, with a limit wrapped around the outside; a horizontal asymptote is exactly the function-limit question asked as x itself goes to infinity rather than to some finite point; and the gradient is exactly the single-variable derivative's natural multivariable generalisation, still answering "how fast, and in which direction, is this changing right now." Recognising this pattern — that calculus is a small number of core limiting ideas (rate of change, accumulated total, and the limit process that defines both) applied at increasing levels of generality — makes the chapter's back half feel like an extension of already-familiar machinery rather than an entirely new list of rules to memorise from scratch.

A final cross-chapter connection worth flagging explicitly: the gradient's role in identifying a level curve's normal direction and the direction of steepest increase reuses the SAME dot-product and Cauchy-Schwarz reasoning already built out fully in the linear algebra chapter's discussion of inner products and orthogonality — the directional-derivative formula D_û f = ∇f·û is nothing more than that chapter's inner-product machinery applied to a specific vector (the gradient) and a specific class of vectors (unit direction vectors), and the "gradient is perpendicular to level curves" fact is exactly that chapter's orthogonality condition (dot product equal to zero) applied to this new setting. Seeing calculus and linear algebra as sharing this common vector-and-inner-product vocabulary, rather than as two unconnected subjects covered back to back, pays off directly the moment a question combines the two — asking, for instance, for the rate of change of a function along a specific eigenvector direction of some associated matrix, a hybrid question type that only makes sense once both chapters' vocabularies are recognised as talking about the same underlying vector-space structure.
`
};
