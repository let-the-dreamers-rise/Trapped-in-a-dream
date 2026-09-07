// Textbook chapter: Linear Algebra.
// Written directly (no subagent) to match the depth and voice of the other
// chapters in data/chapters/.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['engmath-linear-algebra'] = {
  figs: [
    {
      id: 'matrix-mult-shape',
      caption: 'Matrix multiplication shape rule: an m×n matrix times an n×p matrix gives an m×p matrix. The inner dimensions (n and n) must match and disappear; the outer dimensions (m and p) survive into the result.',
      svg: '<svg viewBox="0 0 340 130" width="100%" style="max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="20" y="30" width="70" height="50"/><rect x="120" y="20" width="50" height="70"/><rect x="240" y="30" width="70" height="70"/></g><g font-size="12" fill="currentColor" text-anchor="middle"><text x="55" y="20">A (m×n)</text><text x="145" y="10">B (n×p)</text><text x="275" y="20">AB (m×p)</text><text x="55" y="60" font-size="14">m×n</text><text x="145" y="60" font-size="14">n×p</text><text x="275" y="70" font-size="14">m×p</text></g><g font-size="16" fill="currentColor" text-anchor="middle"><text x="105" y="60">×</text><text x="200" y="65">=</text></g></svg>'
    },
    {
      id: 'eigenvector-direction',
      caption: 'An eigenvector v is a direction that a linear map A does not rotate — it only scales v by the eigenvalue λ. Any other vector u, in general, gets both rotated and scaled.',
      svg: '<svg viewBox="0 0 300 180" width="100%" style="max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3" marker-end="url(#lahead)"><line x1="150" y1="150" x2="90" y2="50"/><line x1="150" y1="150" x2="60" y2="20"/><line x1="150" y1="150" x2="230" y2="90"/><line x1="150" y1="150" x2="270" y2="60"/></g><defs><marker id="lahead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g font-size="11" fill="currentColor"><text x="70" y="45">v</text><text x="35" y="15">Av = λv (same line)</text><text x="235" y="100">u</text><text x="255" y="55">Au (different direction)</text></g></svg>'
    }
  ],
  text: `
WHY LINEAR ALGEBRA, AND THE ONE OBJECT EVERYTHING BUILDS FROM

Linear algebra is the study of one single kind of object — the LINEAR TRANSFORMATION — represented concretely as a MATRIX, together with the handful of numbers a matrix can be boiled down to (its rank, determinant, eigenvalues) that summarise how it behaves without needing to look at every entry. Almost every question in this chapter is secretly asking one of a small number of underlying questions: does a system of equations have a solution, and if so how many; does a transformation preserve or destroy information (is it invertible); and what does repeatedly applying a transformation do to a vector in the long run (eigenvalues and eigenvectors). Keeping these three underlying questions in view — rather than treating each formula as an isolated fact to memorise — is what makes the large number of named theorems in this chapter feel connected rather than arbitrary.

MATRIX OPERATIONS AND THE SHAPE RULE

Matrix ADDITION and SUBTRACTION require the same dimensions and proceed entrywise: (A+B)ᵢⱼ = Aᵢⱼ+Bᵢⱼ. SCALAR MULTIPLICATION multiplies every entry by the scalar: (kA)ᵢⱼ = k·Aᵢⱼ.

[[FIG:matrix-mult-shape]]

MATRIX MULTIPLICATION is the operation that actually needs care. If A is m×n and B is n×p, the product AB is defined ONLY when the number of COLUMNS of A matches the number of ROWS of B (both equal to n here), and the result AB is m×p — the "outer" dimensions survive, the matching "inner" dimensions vanish. Entry (AB)ᵢⱼ is computed as the DOT PRODUCT of row i of A with column j of B: Σ_k Aᵢₖ Bₖⱼ.

1. Matrix multiplication is ASSOCIATIVE: (AB)C = A(BC) — the grouping of a chain of multiplications never matters, so a long product can be parenthesised however is computationally convenient.
2. Matrix multiplication DISTRIBUTES over addition: A(B+C) = AB+AC, and (A+B)C = AC+BC.
3. Matrix multiplication is, in general, NOT COMMUTATIVE: AB ≠ BA in general, even when both products are defined and both are the same shape. A single 2×2 counterexample settles this: A=[[1,1],[0,1]], B=[[1,0],[1,1]]. AB=[[2,1],[1,1]], BA=[[1,1],[1,2]] — visibly different matrices.

GATE TRAP: assuming AB=BA "because it worked out that way for one specific pair of matrices tried on scratch paper" is a common and serious error — commutativity must be checked, or explicitly stated as a given (e.g. "A and B commute"), never assumed by default the way it can be for ordinary number multiplication.

TRANSPOSE, SYMMETRIC, AND SKEW-SYMMETRIC MATRICES

The TRANSPOSE Aᵀ of a matrix A swaps rows for columns: (Aᵀ)ᵢⱼ = Aⱼᵢ. A key identity governing how transpose interacts with multiplication: (AB)ᵀ = BᵀAᵀ — the ORDER REVERSES, exactly mirroring how matrix inverses behave under multiplication (below).

1. Reversal derivation: ((AB)ᵀ)ᵢⱼ = (AB)ⱼᵢ = Σ_k Aⱼₖ Bₖᵢ.
2. (BᵀAᵀ)ᵢⱼ = Σ_k (Bᵀ)ᵢₖ(Aᵀ)ₖⱼ = Σ_k Bₖᵢ Aⱼₖ.
3. Both expressions are the same sum (Σ_k Aⱼₖ Bₖᵢ), just written with the two factors in a different order — and ordinary scalar multiplication inside the sum commutes even though matrix multiplication as a whole does not — so the two matrices are identical entry by entry, proving the reversal identity.

A matrix is SYMMETRIC if A=Aᵀ (entries mirror across the main diagonal). A matrix is SKEW-SYMMETRIC if Aᵀ=−A — this forces every DIAGONAL entry to be its own negative (Aᵢᵢ=−Aᵢᵢ), which is only possible if every diagonal entry is exactly 0.

KEY: symmetric and skew-symmetric matrices are not just two isolated definitions — EVERY square matrix A can be written uniquely as the sum of a symmetric part (A+Aᵀ)/2 and a skew-symmetric part (A−Aᵀ)/2, a decomposition worth recognising on sight since it appears as a standalone question type ("express A as the sum of a symmetric and a skew-symmetric matrix") as often as it appears buried inside a longer problem.

THE DETERMINANT

The DETERMINANT det(A) is defined only for SQUARE matrices, and it packages an enormous amount of information about A into one single number. For a 2×2 matrix [[a,b],[c,d]], det = ad−bc, derived directly from the area-scaling interpretation: the parallelogram spanned by the two column vectors (a,c) and (b,d) has this exact signed area. For a 3×3 matrix, expand along ANY row or column using COFACTORS: det(A) = Σⱼ (−1)^(i+j) Aᵢⱼ Mᵢⱼ, where Mᵢⱼ is the MINOR (the determinant of the 2×2 submatrix left after deleting row i and column j).

Properties of determinants, each worth being able to invoke directly rather than re-deriving:

1. det(AB) = det(A)·det(B) — the determinant of a product is the product of the determinants, for any two square matrices of the same size.
2. det(Aᵀ) = det(A) — transposing never changes the determinant.
3. For an n×n matrix, det(kA) = kⁿ·det(A) — scaling EVERY entry of an n×n matrix by k scales the determinant by kⁿ, not by k, since every one of the n rows independently contributes a factor of k to the determinant's expansion.
4. Swapping any two rows (or any two columns) FLIPS THE SIGN of the determinant.
5. If any row (or column) is a scalar multiple of another — or more generally, if the rows are LINEARLY DEPENDENT — det(A)=0.

GATE TRAP: the kⁿ scaling rule (property 3) is the single most commonly misapplied determinant fact — det(2A) for a 3×3 matrix A is 2³·det(A)=8·det(A), NOT 2·det(A); the exponent must match the actual matrix DIMENSION n, not be dropped or assumed equal to 1.

Worked trace, a full 3×3 cofactor expansion: find det(A) for A=[[1,2,3],[0,1,4],[5,6,0]], expanding along the FIRST row (any row or column gives the same final answer — the first row is chosen here purely for concreteness). det(A) = 1·M₁₁ − 2·M₁₂ + 3·M₁₃, where each Mᵢⱼ is the minor formed by deleting row i and column j, and the alternating +/− sign pattern follows the (−1)^(i+j) checkerboard rule.

1. M₁₁ (delete row 1, column 1) = det([[1,4],[6,0]]) = 1(0)−4(6) = −24.
2. M₁₂ (delete row 1, column 2) = det([[0,4],[5,0]]) = 0(0)−4(5) = −20.
3. M₁₃ (delete row 1, column 3) = det([[0,1],[5,6]]) = 0(6)−1(5) = −5.
4. Combining with the checkerboard signs (+,−,+ across the first row): det(A) = 1(−24) − 2(−20) + 3(−5) = −24 + 40 − 15 = 1.
5. Cross-check by expanding along the SECOND row instead, to confirm the answer is independent of which row was chosen: det(A) = −0·M₂₁ + 1·M₂₂ − 4·M₂₃ (signs −,+,− for row 2's checkerboard pattern). M₂₂ = det([[1,3],[5,0]]) = 1(0)−3(5) = −15. M₂₃ = det([[1,2],[5,6]]) = 1(6)−2(5) = −4. det(A) = 0 + 1(−15) − 4(−4) = −15+16 = 1 — matches exactly, confirming the row-independence property used freely throughout this chapter.

MATRIX INVERSE

A square matrix A has an INVERSE A⁻¹ (satisfying AA⁻¹=A⁻¹A=I) if and only if det(A)≠0 — such a matrix is called NONSINGULAR or INVERTIBLE; a matrix with det(A)=0 is SINGULAR and has no inverse at all. The explicit formula is A⁻¹ = adj(A)/det(A), where adj(A) (the ADJUGATE, or classical adjoint) is the TRANSPOSE of the COFACTOR MATRIX (the matrix whose (i,j) entry is the cofactor (−1)^(i+j)Mᵢⱼ used in the determinant expansion above).

1. For a 2×2 matrix A=[[a,b],[c,d]] with det(A)=ad−bc≠0, the cofactor matrix is [[d,−c],[−b,a]], and its transpose (the adjugate) is [[d,−b],[−c,a]] — for the 2×2 case specifically, this reduces to the well-known shortcut: swap the two diagonal entries, negate the two off-diagonal entries, then divide the whole matrix by det(A).
2. Just like transpose, matrix inversion REVERSES ORDER under multiplication: (AB)⁻¹ = B⁻¹A⁻¹, not A⁻¹B⁻¹. This can be verified directly: (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = A(I)A⁻¹ = AA⁻¹ = I, confirming B⁻¹A⁻¹ is genuinely the inverse of AB.

Worked trace: find A⁻¹ for A=[[2,1],[5,3]]. det(A)=2(3)−1(5)=6−5=1. Since det≠0, A is invertible. Swap diagonal, negate off-diagonal: [[3,−1],[−5,2]], then divide by det=1: A⁻¹=[[3,−1],[−5,2]]. Verify: A·A⁻¹ = [[2(3)+1(−5), 2(−1)+1(2)],[5(3)+3(−5), 5(−1)+3(2)]] = [[6−5, −2+2],[15−15, −5+6]] = [[1,0],[0,1]] = I, confirmed.

RANK OF A MATRIX

The RANK of a matrix is the number of LINEARLY INDEPENDENT rows (equivalently, and always giving the same number, the number of linearly independent columns — a non-obvious but standard fact). Rank is computed by ROW-REDUCING the matrix to echelon form and counting the nonzero rows that remain, or equivalently as the size of the LARGEST square submatrix with a nonzero determinant (a nonzero "minor").

KEY: rank(A) ≤ min(number of rows, number of columns) always — a matrix's rank can never exceed either of its own dimensions, since a set of linearly independent rows cannot exceed the total number of rows available, and the same logic applies to columns. A matrix achieving this maximum possible value is called FULL RANK.

SYSTEMS OF LINEAR EQUATIONS: THE RANK CRITERION

For a system Ax=b (A the m×n coefficient matrix, x the n unknowns, b the m constants), consistency and solution-count are governed entirely by comparing rank(A) to rank of the AUGMENTED MATRIX [A|b] (A with the column b appended):

1. If rank(A) ≠ rank([A|b]), the system is INCONSISTENT — no solution exists at all. Geometrically, this is the case where the equations describe, for instance, parallel planes with no common intersection point.
2. If rank(A) = rank([A|b]) = n (the number of unknowns), the system has EXACTLY ONE solution.
3. If rank(A) = rank([A|b]) < n, the system has INFINITELY MANY solutions, parametrised by n − rank(A) FREE VARIABLES (also called the system's degrees of freedom).
4. rank([A|b]) can never be LESS than rank(A) — appending a column to a matrix can only keep the rank the same or increase it, never decrease it, since every linear combination achievable using only A's columns remains achievable after adding one more column to choose from.

Worked trace: for the system x+y=3, 2x+2y=7, is it consistent? A=[[1,1],[2,2]], rank(A)=1 (row 2 = 2×row 1, so only one independent row). Augmented [A|b]=[[1,1,3],[2,2,7]]; row-reducing (row2 − 2·row1) gives [[1,1,3],[0,0,1]] — a row reading 0=1, an immediate contradiction, so rank([A|b])=2. Since 1≠2, the system is INCONSISTENT (the two lines are parallel and distinct, confirmed directly: x+y=3 and x+y=3.5 after dividing the second equation by 2 — same slope, different intercept).

HOMOGENEOUS SYSTEMS

A HOMOGENEOUS system Ax=0 (every constant term is zero) is ALWAYS consistent, since x=0 (the TRIVIAL solution) always satisfies it — rank(A) trivially equals rank([A|0]) always, since appending a column of zeros can never increase the rank. The only question worth asking for a homogeneous system is whether it has a NONTRIVIAL solution (some x≠0 that also satisfies Ax=0), and this happens if and only if rank(A) < n (equivalently, for a SQUARE coefficient matrix specifically, if and only if det(A)=0).

GATE TRAP: for a homogeneous system, "consistent" and "has infinitely many solutions" are NOT synonyms — a homogeneous system is trivially always consistent (via x=0), but it has genuinely MULTIPLE (infinitely many) solutions only when rank(A)<n; when rank(A)=n, the trivial solution x=0 is the UNIQUE solution, and the system is still perfectly consistent, just with nothing interesting beyond the zero vector.

EIGENVALUES AND EIGENVECTORS

[[FIG:eigenvector-direction]]

For a square matrix A, a nonzero vector v is an EIGENVECTOR with EIGENVALUE λ if Av = λv — applying the transformation A to v produces a vector pointing along the SAME LINE as v (possibly reversed if λ<0, possibly the zero vector's line only if λ=0), merely scaled by the factor λ, with no rotation off that line at all.

1. Rearranging Av=λv as Av−λv=0, then Av−λIv=0 (inserting the identity matrix so both terms are matrix-vector products), gives (A−λI)v=0.
2. For this equation to have a NONTRIVIAL solution v≠0 (an eigenvector must be nonzero by definition), the matrix (A−λI) must be SINGULAR — by the homogeneous-system fact above — meaning det(A−λI)=0.
3. det(A−λI)=0, expanded out, is a polynomial equation in λ called the CHARACTERISTIC EQUATION, and its roots are exactly the eigenvalues of A.
4. For each eigenvalue λ found this way, substituting it back into (A−λI)v=0 and solving this now-homogeneous system for v gives the corresponding eigenvector(s) (any nonzero v satisfying it, and any scalar multiple of it, since eigenvectors are only defined up to scaling).

Worked trace: find the eigenvalues of A=[[4,1],[2,3]]. Characteristic equation: det(A−λI) = det([[4−λ,1],[2,3−λ]]) = (4−λ)(3−λ)−1(2) = 12−4λ−3λ+λ²−2 = λ²−7λ+10 = 0. Factoring: (λ−5)(λ−2)=0, giving eigenvalues λ=5 and λ=2.

TRACE-DETERMINANT SHORTCUTS: two fast checks against the characteristic-equation computation, both worth using to catch arithmetic slips before committing to an answer: the SUM of the eigenvalues always equals the TRACE of A (the sum of its diagonal entries), and the PRODUCT of the eigenvalues always equals det(A). Checking the worked trace above: trace(A)=4+3=7, and the eigenvalues found were 5 and 2, summing to 7 — matches. det(A)=4(3)−1(2)=12−2=10, and 5×2=10 — matches.

1. Why these shortcuts hold, derived directly from the characteristic polynomial: for a 2×2 matrix, the characteristic equation λ²−(trace)λ+det=0 always has exactly this shape (expand det(A−λI) generally to confirm the λ¹ coefficient is always −trace(A) and the constant term is always det(A)).
2. By Vieta's formulas for a quadratic (relating a polynomial's roots to its coefficients), the sum of the two roots of λ²−(trace)λ+det=0 is exactly trace(A), and the product of the two roots is exactly det(A) — confirming the shortcuts are not a coincidence but a direct algebraic consequence.
3. This generalises to n×n matrices: the sum of ALL n eigenvalues (counted with multiplicity) equals trace(A), and the product of all n eigenvalues equals det(A), for any square matrix of any size.

FURTHER EIGENVALUE FACTS WORTH HOLDING AS FIXED KNOWLEDGE

KEY: the eigenvalues of a TRIANGULAR matrix (all entries strictly above the diagonal are zero — lower triangular — or all entries strictly below are zero — upper triangular) are EXACTLY its diagonal entries, read off directly with no computation at all — this follows because det(A−λI) for a triangular matrix is simply the product of its diagonal entries (each (Aᵢᵢ−λ)), since a triangular matrix's determinant is always the product of its diagonal entries, so the characteristic equation factors immediately into (A₁₁−λ)(A₂₂−λ)...(Aₙₙ−λ)=0.

If A is a REAL SYMMETRIC matrix, two strong guarantees hold, both worth recognising as "symmetric matrices are unusually well-behaved": every eigenvalue of A is REAL (never complex, even though a general real matrix can have complex eigenvalue pairs), and eigenvectors corresponding to DISTINCT eigenvalues are automatically ORTHOGONAL (their dot product is zero) — a fact used directly whenever a problem states a matrix is symmetric and then asks about its eigenvector directions without further computation.

Eigenvalues transform PREDICTABLY under simple operations on the matrix itself, each derivable directly from Av=λv: eigenvalues of Aᵏ (A multiplied by itself k times) are (eigenvalues of A)ᵏ — since A²v = A(Av) = A(λv) = λ(Av) = λ(λv) = λ²v, and this pattern continues by induction for any power k. Eigenvalues of A⁻¹ are 1/(eigenvalues of A), valid provided A is invertible (equivalently, provided 0 is not among A's eigenvalues) — derived by left-multiplying Av=λv by A⁻¹ to get v=λA⁻¹v, then dividing by λ (valid since λ≠0) to get A⁻¹v=(1/λ)v. Eigenvalues of (A+cI) for a scalar c are (eigenvalues of A)+c — derived directly since (A+cI)v = Av+cv = λv+cv = (λ+c)v.

KEY: A is SINGULAR (non-invertible) if and only if 0 is an eigenvalue of A — this is not a separate fact to memorise but a direct restatement of the determinant-product identity above: det(A) equals the product of A's eigenvalues, and this product is zero exactly when at least one factor (one eigenvalue) is zero, exactly matching the earlier singular-matrix criterion det(A)=0.

CAYLEY-HAMILTON THEOREM

The CAYLEY-HAMILTON THEOREM states that every square matrix A satisfies its OWN characteristic equation — substituting the matrix A itself in place of the scalar λ in the characteristic polynomial, and replacing the constant term's implicit "λ⁰" with the identity matrix I, yields the ZERO MATRIX.

1. For the worked 2×2 example above, A=[[4,1],[2,3]] had characteristic equation λ²−7λ+10=0. Cayley-Hamilton asserts A²−7A+10I = 0 (the zero matrix), which can be verified directly by computing A²=[[4,1],[2,3]]²=[[16+2,4+3],[8+6,2+9]]=[[18,7],[14,11]], then A²−7A+10I = [[18,7],[14,11]] − [[28,7],[14,21]] + [[10,0],[0,10]] = [[18−28+10, 7−7+0],[14−14+0, 11−21+10]] = [[0,0],[0,0]], confirmed.
2. The main practical use of Cayley-Hamilton is computing A⁻¹ or high powers of A WITHOUT direct matrix multiplication: from A²−7A+10I=0, rearranging gives 10I = 7A−A², i.e. I = (7A−A²)/10 = A(7I−A)/10, so A⁻¹ = (7I−A)/10 — expressing the inverse as a simple linear combination of I and A, entirely bypassing the adjugate-and-determinant computation for this particular matrix.
3. Verifying against the earlier direct inverse computation is not applicable here since this is a different matrix from the earlier A⁻¹ example — but the SAME technique applied to that earlier A=[[2,1],[5,3]] (characteristic equation derivable the same way: trace=5, det=1, so λ²−5λ+1=0, giving A²−5A+I=0, so A⁻¹=5I−A=[[5,0],[0,5]]−[[2,1],[5,3]]=[[3,−1],[−5,2]]) reproduces EXACTLY the A⁻¹=[[3,−1],[−5,2]] found earlier by the adjugate method — confirming both routes to the inverse agree.

VECTOR SPACES AND SUBSPACES

A VECTOR SPACE over the real numbers is a set V of objects (called vectors) equipped with an addition operation and a scalar-multiplication operation, satisfying a list of axioms (closure under both operations, associativity and commutativity of addition, existence of a zero vector, existence of additive inverses, and distributive laws linking scalar multiplication to both additions) that together guarantee vectors can be combined and scaled in all the ways ordinary geometric vectors can. The most familiar example is ℝⁿ (ordinary n-component real vectors under componentwise addition and scaling), but the SAME axioms are satisfied by other objects too — the set of all m×n matrices under matrix addition and scalar multiplication is itself a vector space, and so is the set of all polynomials of degree at most n.

A SUBSPACE W of a vector space V is a subset that is ITSELF a vector space under the same operations inherited from V. Rather than re-checking every axiom from scratch, a subset W qualifies as a subspace by the SUBSPACE TEST, three conditions that together guarantee all the vector-space axioms come along for free (since they already hold in the larger space V, and closure is the only thing that could fail for a subset):

1. The zero vector of V must be IN W (a subspace can never be empty, and it must contain the origin).
2. W must be CLOSED UNDER ADDITION: for any u,v ∈ W, u+v must also be in W.
3. W must be CLOSED UNDER SCALAR MULTIPLICATION: for any v ∈ W and any scalar c, cv must also be in W.

GATE TRAP: a set that "looks like" a natural subset of ℝⁿ often FAILS the subspace test on the very first condition — the set of all vectors (x,y) in ℝ² with x+y=1 (a line that does NOT pass through the origin) is not a subspace, since (0,0) does not satisfy x+y=1; only a line, plane, or hyperplane passing THROUGH the origin can ever be a subspace of ℝⁿ, and checking this single condition first is often the fastest way to immediately disqualify a proposed subspace before checking the other two conditions at all.

LINEAR INDEPENDENCE, SPAN, BASIS, AND DIMENSION

A set of vectors {v₁,v₂,...,vₖ} is LINEARLY INDEPENDENT if the only solution to c₁v₁+c₂v₂+...+cₖvₖ=0 (the zero vector) is the TRIVIAL solution c₁=c₂=...=cₖ=0 — no nontrivial linear combination of them produces the zero vector. Equivalently, no vector in the set can be written as a linear combination of the others; if one COULD be (say vₖ = a₁v₁+...+a_{k−1}v_{k−1} for some scalars), the set is LINEARLY DEPENDENT, since rearranging gives a₁v₁+...+a_{k−1}v_{k−1}−vₖ=0, a nontrivial combination (the coefficient on vₖ is −1≠0) equalling zero.

The SPAN of a set of vectors {v₁,...,vₖ} is the set of ALL possible linear combinations c₁v₁+...+cₖvₖ of them, for every choice of scalars c₁,...,cₖ — this is always itself a subspace (it automatically satisfies the subspace test above, since a linear combination of linear combinations of the vᵢ is still a linear combination of the vᵢ).

A BASIS of a vector space V is a set of vectors that is BOTH linearly independent AND spans V — a basis is, informally, a "minimal spanning set" or equivalently a "maximal independent set": removing any vector from a basis would make it fail to span V, and adding any vector to a basis would make it linearly dependent. Every vector in V can then be written as a linear combination of the basis vectors in EXACTLY ONE way (uniqueness of this representation is itself a direct consequence of linear independence — two different representations would subtract to give a nontrivial dependency).

The DIMENSION of a vector space V is the number of vectors in ANY basis of V — this number is the SAME for every basis of a given V (a non-obvious but standard fact, proved via the STEINITZ EXCHANGE argument: any two bases of the same space must have equal size, since a linearly independent set can never be larger than a spanning set).

KEY: rank, as defined earlier via row/column independence, IS exactly the dimension concept applied to a matrix's row space (or, equivalently, its column space, since both give the same number) — "rank(A)" and "the dimension of the space spanned by A's rows (or columns)" are two names for the identical quantity, which is why row-reducing to count nonzero rows (an echelon-form computation) correctly computes rank: each nonzero row of the echelon form is one basis vector for the row space.

DIAGONALIZATION

A square matrix A is DIAGONALIZABLE if it can be written as A = PDP⁻¹, where D is a DIAGONAL matrix (nonzero entries only on the main diagonal) and P is an invertible matrix whose COLUMNS are eigenvectors of A, with D's diagonal entries being the CORRESPONDING eigenvalues in the same column order. Diagonalization is the matrix version of "changing coordinates to the directions the transformation actually stretches along" — in the eigenvector basis (the columns of P), the transformation A acts as pure independent scaling along each axis, with no mixing between axes at all.

1. A is diagonalizable if and only if it has n LINEARLY INDEPENDENT eigenvectors (n being A's size) — equivalently, if the eigenvectors found across all of A's eigenvalues together span the entire space.
2. A SUFFICIENT (but not necessary) condition guaranteeing diagonalizability: if A has n DISTINCT eigenvalues, it is automatically diagonalizable, since eigenvectors corresponding to distinct eigenvalues are always linearly independent (a standard fact, not otherwise proved here) — n distinct eigenvalues therefore always yield n independent eigenvectors.
3. A REPEATED eigenvalue does not automatically break diagonalizability, but it requires checking directly whether that eigenvalue's eigenspace (the solution space of (A−λI)v=0) has dimension equal to its ALGEBRAIC MULTIPLICITY (how many times it is a root of the characteristic equation) — if the eigenspace's dimension (called the GEOMETRIC MULTIPLICITY) falls short of the algebraic multiplicity for even one eigenvalue, A is NOT diagonalizable.

GATE TRAP: assuming every matrix is diagonalizable is a serious and common error — the matrix [[1,1],[0,1]] has characteristic equation (1−λ)²=0, a single repeated eigenvalue λ=1 with algebraic multiplicity 2, but solving (A−I)v=0 gives [[0,1],[0,0]]v=0, forcing the second component of v to be 0 and leaving only ONE free parameter — the eigenspace has dimension 1 (geometric multiplicity 1), strictly less than the algebraic multiplicity 2, so this matrix is NOT diagonalizable despite being a perfectly ordinary-looking 2×2 matrix.

Worked trace: diagonalize A=[[4,1],[2,3]] (the same matrix used in the eigenvalue worked trace above, with eigenvalues λ=5 and λ=2). For λ=5: (A−5I)v=0 gives [[−1,1],[2,−2]]v=0, i.e. −v₁+v₂=0, so v₂=v₁; taking v₁=1 gives eigenvector (1,1). For λ=2: (A−2I)v=0 gives [[2,1],[2,1]]v=0, i.e. 2v₁+v₂=0, so v₂=−2v₁; taking v₁=1 gives eigenvector (1,−2). Since the two eigenvalues are distinct, these two eigenvectors are automatically independent, so A is diagonalizable: P=[[1,1],[1,−2]], D=[[5,0],[0,2]]. Verify AP=PD: AP = [[4,1],[2,3]][[1,1],[1,−2]] = [[4+1,4−2],[2+3,2−6]] = [[5,2],[5,−4]]. PD = [[1,1],[1,−2]][[5,0],[0,2]] = [[5,2],[5,−4]] — matches exactly, confirming A=PDP⁻¹.

THE NULL SPACE AND THE RANK-NULLITY THEOREM

The NULL SPACE (also called the KERNEL) of an m×n matrix A is the set of ALL vectors x satisfying Ax=0 — exactly the solution set of the homogeneous system studied above. The null space is always a subspace of ℝⁿ (it satisfies the subspace test directly: 0 is always in it, and if Ax=0 and Ay=0 then A(x+y)=Ax+Ay=0+0=0 and A(cx)=cAx=c(0)=0, confirming closure under both operations). The dimension of the null space is called the NULLITY of A.

THE RANK-NULLITY THEOREM: for an m×n matrix A, rank(A) + nullity(A) = n (the number of COLUMNS of A — the dimension of the space the matrix maps FROM). This single identity is a compact restatement of the free-parameter counting rule already used above for solving systems: the "n − rank(A) free parameters" in a consistent, underdetermined system is EXACTLY the nullity, since those free parameters parametrise precisely the null space (the homogeneous solutions), and the rank-nullity theorem is simply the general statement of why that count is always n − rank(A).

1. Intuition for the theorem: rank(A) counts how many independent "directions" A's rows actually constrain (equivalently, the dimension of A's row space, which by an standard fact equals the dimension of its column space), and nullity counts how many independent directions in the DOMAIN survive being mapped to zero — together, these two counts must account for the entire n-dimensional domain space, since every domain direction either gets "used up" constraining an independent equation or falls into the space that collapses to zero.
2. Worked check against the earlier consistency example (problem 2 above): the coefficient matrix there was 3×3 with rank(A)=2. By rank-nullity, nullity = n − rank = 3−2 = 1 — matching exactly the "1 free parameter" already found there by direct row-reduction, confirming the theorem gives the same count without needing to explicitly parametrise the solution set.

KEY: the rank-nullity theorem is the single fastest way to answer "how many free parameters will this system's solution have" without doing a full row-reduction by hand — computing rank(A) alone (a smaller computation than solving the whole system) and subtracting from n immediately gives the answer, useful whenever a problem only asks for the COUNT of free parameters rather than their explicit form.

QUADRATIC FORMS AND DEFINITENESS

A QUADRATIC FORM in n variables is an expression Q(x) = xᵀAx for a symmetric matrix A, expanding out to a sum of terms of the form Aᵢᵢxᵢ² (from the diagonal) and 2Aᵢⱼxᵢxⱼ for i≠j (from the off-diagonal, doubled since both Aᵢⱼ and Aⱼᵢ contribute identically when A is symmetric). Quadratic forms classify how a symmetric matrix behaves as a "curvature" or "energy" — whether xᵀAx is always positive, always negative, or can be either, for every nonzero x — and this classification is called the DEFINITENESS of A:

1. A is POSITIVE DEFINITE if xᵀAx > 0 for every nonzero vector x. Equivalently (a standard fact, since a symmetric matrix's eigenvalues are always real), A is positive definite if and only if ALL of its eigenvalues are strictly positive.
2. A is NEGATIVE DEFINITE if xᵀAx < 0 for every nonzero x, equivalently if all eigenvalues are strictly negative.
3. A is POSITIVE SEMI-DEFINITE if xᵀAx ≥ 0 for every x (allowing equality for some nonzero x), equivalently if all eigenvalues are non-negative (zero eigenvalues are allowed).
4. A is INDEFINITE if xᵀAx takes BOTH positive and negative values for different choices of x, equivalently if A has eigenvalues of both signs.

A fast computational test avoiding eigenvalues entirely for small matrices: SYLVESTER'S CRITERION states that a symmetric matrix A is positive definite if and only if every LEADING PRINCIPAL MINOR (the determinant of the top-left k×k submatrix, for every k from 1 to n) is strictly positive.

Worked trace: is A=[[2,1],[1,2]] positive definite? Leading principal minors: the 1×1 minor is simply the (1,1) entry, 2>0. The 2×2 minor is det(A)=2(2)−1(1)=4−1=3>0. Both positive, so A is positive definite by Sylvester's criterion. Cross-check via eigenvalues: trace=4, det=3, characteristic equation λ²−4λ+3=0, factoring (λ−1)(λ−3)=0, giving eigenvalues 1 and 3 — both strictly positive, confirming positive definiteness independently.

GATE TRAP: Sylvester's criterion requires checking the LEADING principal minors specifically (the top-left 1×1, then top-left 2×2, then top-left 3×3, and so on) — checking an arbitrary principal minor (say, a minor formed from rows/columns {1,3} skipping row/column 2) does not give a valid positive-definiteness test; only the specific nested sequence of TOP-LEFT minors, each strictly containing the previous one, is guaranteed to work.

GAUSSIAN ELIMINATION AND LU DECOMPOSITION

GAUSSIAN ELIMINATION is the systematic row-reduction procedure underlying every rank computation and every system-solving computation in this chapter: using ROW OPERATIONS (swap two rows; multiply a row by a nonzero scalar; add a multiple of one row to another) to transform a matrix into ROW ECHELON FORM (a "staircase" pattern where each row's first nonzero entry, its PIVOT, sits strictly to the right of the pivot in the row above it, and all-zero rows sink to the bottom).

An LU DECOMPOSITION expresses a square matrix A (satisfying certain conditions — informally, one where no row swaps are needed during elimination) as A = LU, where L is LOWER triangular with 1s on its diagonal, and U is UPPER triangular — U is exactly the matrix Gaussian elimination produces (before back-substitution), and L records the multipliers used to eliminate entries below each pivot.

1. Worked trace: decompose A=[[2,1],[4,5]]. Eliminate the (2,1) entry: R2 → R2 − 2R1 (multiplier m₂₁=2, since 4/2=2). This gives U=[[2,1],[0,3]] (the echelon form produced).
2. L records the multiplier used: L=[[1,0],[2,1]] (a 1 on the diagonal, and the multiplier 2 in the position corresponding to which row was eliminated using which pivot row).
3. Verify A=LU: LU = [[1,0],[2,1]][[2,1],[0,3]] = [[2,1],[4+0,2+3]] = [[2,1],[4,5]] = A, confirmed.
4. The practical value of LU decomposition is solving Ax=b for MANY different b vectors efficiently: once L and U are computed once (the expensive part), each new b only requires two cheap triangular solves — first Ly=b (forward substitution), then Ux=y (back substitution) — avoiding a full re-elimination of A from scratch for every new right-hand side.

Since U is upper triangular, and det(A)=det(L)·det(U) (using the product rule for determinants proved earlier), and det(L)=1 always (L's diagonal is fixed at 1s by construction), it follows that det(A) = det(U) = the product of U's diagonal entries — a direct route to computing a determinant that scales far better by hand for larger matrices than repeated cofactor expansion, since row-reduction (needed anyway for rank and for solving systems) produces the determinant as an immediate byproduct, with no extra cofactor computation required at all. This gives a THIRD independent method (alongside the direct 2×2/3×3 formulas and cofactor expansion) for computing a determinant, and cross-checking one method against another, exactly as done throughout this chapter, is the standard way to catch an arithmetic slip in either.

GATE TRAP: this row-reduction shortcut for the determinant applies ONLY when no row swaps were needed during the elimination — each row swap flips the determinant's sign (property 4 from the earlier determinant properties list), so if elimination required, say, one swap along the way, the product of U's final diagonal entries must be multiplied by −1 (or by (−1) raised to the number of swaps performed, for more than one) to recover the correct signed determinant of the original matrix A.

ORTHOGONAL MATRICES

A square matrix Q is ORTHOGONAL if its columns are pairwise ORTHOGONAL (perpendicular, dot product zero) UNIT vectors — equivalently, and more usefully for computation, if QᵀQ = I. This single condition packs in two useful consequences at once:

1. QᵀQ=I means Qᵀ = Q⁻¹ — for an orthogonal matrix, the inverse is simply the transpose, avoiding any determinant or adjugate computation entirely. This is a major computational shortcut whenever a matrix is known (or can be shown) to be orthogonal.
2. det(Q) = ±1 always, for any orthogonal matrix — derived from det(QᵀQ)=det(I)=1, and det(Qᵀ)=det(Q), giving det(Q)²=1, so det(Q)=±1.
3. Orthogonal matrices represent RIGID transformations (rotations, when det(Q)=+1, or reflections combined with rotations, when det(Q)=−1) — they preserve lengths and angles exactly, which is the geometric reason their inverse is so simple: "undoing" a pure rotation or reflection is just applying the transpose (running the same rotation backward).

INNER PRODUCTS, NORMS, AND ORTHOGONALITY OF VECTORS

The (standard) INNER PRODUCT (or DOT PRODUCT) of two vectors u,v ∈ ℝⁿ is u·v = Σᵢ uᵢvᵢ, and the NORM (length) of a vector is ‖v‖ = √(v·v). Two vectors are ORTHOGONAL (perpendicular) exactly when u·v=0 — this is the algebraic definition standing in for the geometric notion of a right angle, and it generalises the everyday geometric idea into any number of dimensions where a picture can no longer be drawn directly.

THE CAUCHY-SCHWARZ INEQUALITY: |u·v| ≤ ‖u‖‖v‖ for any two vectors u,v — the magnitude of the dot product can never exceed the product of the two vectors' lengths. This is not merely an abstract inequality; it is exactly what guarantees the familiar formula cos θ = (u·v)/(‖u‖‖v‖) always gives a value in the valid range [−1,1] for the angle θ between two vectors, since cos θ can never itself exceed 1 in magnitude — Cauchy-Schwarz is precisely the algebraic fact that makes defining an "angle between vectors" in ℝⁿ consistent at all.

1. A directly useful consequence: equality |u·v| = ‖u‖‖v‖ holds if and only if u and v are PARALLEL (one is a scalar multiple of the other) — the two extremes of the inequality correspond exactly to the two extremes of the angle (0° or 180°, where cos θ = ±1).
2. THE TRIANGLE INEQUALITY, ‖u+v‖ ≤ ‖u‖+‖v‖, follows directly from Cauchy-Schwarz: expanding ‖u+v‖² = (u+v)·(u+v) = ‖u‖²+2(u·v)+‖v‖² ≤ ‖u‖²+2‖u‖‖v‖+‖v‖² (using Cauchy-Schwarz to bound the middle term) = (‖u‖+‖v‖)², and taking square roots of both sides (valid since both sides are non-negative) gives the triangle inequality directly.

GRAM-SCHMIDT ORTHOGONALIZATION converts any linearly independent set of vectors {v₁,v₂,...,vₖ} into an ORTHOGONAL set {u₁,u₂,...,uₖ} spanning the SAME subspace, by subtracting off, at each step, the PROJECTION of the new vector onto everything already built.

1. Start with u₁ = v₁ (the first vector is kept unchanged; it defines the first direction of the new orthogonal set).
2. For u₂: subtract from v₂ its projection onto u₁: u₂ = v₂ − [(v₂·u₁)/(u₁·u₁)]u₁ — this construction guarantees u₂·u₁=0 by design (the projection term is precisely the "part of v₂ pointing along u₁," and removing it leaves only the part perpendicular to u₁).
3. For u₃ (and every subsequent vector): subtract off its projection onto EVERY previously built orthogonal vector: u₃ = v₃ − [(v₃·u₁)/(u₁·u₁)]u₁ − [(v₃·u₂)/(u₂·u₂)]u₂ — ensuring u₃ is simultaneously orthogonal to both u₁ and u₂.
4. Normalising each uᵢ by dividing by its own norm ‖uᵢ‖ turns the orthogonal set into an ORTHONORMAL set (unit length AND mutually orthogonal) — the columns of an orthogonal matrix Q, as defined above, are exactly such an orthonormal set.

Worked trace: apply Gram-Schmidt to v₁=(1,1,0) and v₂=(1,0,1). u₁=v₁=(1,1,0). Projection of v₂ onto u₁: (v₂·u₁)/(u₁·u₁) = (1·1+0·1+1·0)/(1+1+0) = 1/2. u₂ = v₂ − (1/2)u₁ = (1,0,1) − (0.5,0.5,0) = (0.5,−0.5,1). Verify orthogonality: u₁·u₂ = 1(0.5)+1(−0.5)+0(1) = 0.5−0.5+0 = 0, confirmed orthogonal.

KEY: Gram-Schmidt is the constructive proof that EVERY finite-dimensional inner product space has an orthonormal basis — it is worth recognising as the standard tool whenever a problem needs an orthogonal (or orthonormal) basis built from an arbitrary given spanning or independent set, and the projection-and-subtract pattern (subtract off everything already accounted for by the previous directions) is exactly the same "remove what's already explained, keep only what's genuinely new" idea that appears, in a different guise, in the residual-based thinking behind least-squares fitting.

WORKED PROBLEMS

1. DETERMINANT SCALING. If A is a 4×4 matrix with det(A)=3, find det(2A). Using the kⁿ rule with n=4: det(2A)=2⁴·det(A)=16×3=48.

2. RANK AND CONSISTENCY. For the system x+2y+z=3, 2x+4y+2z=6, x−y+z=2, determine whether it is consistent and, if so, how many solutions. Row 2 is exactly 2×row 1, so rank(A)≤2 (at most 2 independent rows among 3). Row-reducing: R2−2R1 gives [0,0,0,0] (an all-zero row, consistent with row 2 being a multiple of row 1, contributing no new information); R3 stands independently. So rank(A)=2 (rows 1 and 3 are independent, row 2 is redundant). Since row 2 reduced to 0=0 (not a contradiction), rank([A|b])=2 also. With n=3 unknowns and rank=2, rank(A)=rank([A|b])=2<3: infinitely many solutions, with 3−2=1 free parameter.

3. EIGENVALUES OF A TRIANGULAR MATRIX. Find the eigenvalues of A=[[5,3,7],[0,2,4],[0,0,9]]. A is upper triangular, so its eigenvalues are read directly off the diagonal: 5, 2, 9.

4. TRACE-DETERMINANT CHECK. A 2×2 matrix has eigenvalues 3 and −2. State its trace and determinant. Trace = sum of eigenvalues = 3+(−2)=1. Determinant = product of eigenvalues = 3×(−2)=−6.

5. INVERSE VIA THE 2×2 SHORTCUT. Find the inverse of B=[[3,4],[2,3]]. det(B)=3(3)−4(2)=9−8=1. Swap diagonal, negate off-diagonal, divide by 1: B⁻¹=[[3,−4],[−2,3]]. Verify: B·B⁻¹=[[3(3)+4(−2), 3(−4)+4(3)],[2(3)+3(−2), 2(−4)+3(3)]]=[[9−8,−12+12],[6−6,−8+9]]=[[1,0],[0,1]], confirmed.

6. NONTRIVIAL SOLUTION CONDITION. For what value of k does the homogeneous system x+2y=0, 3x+ky=0 have a nontrivial solution? The coefficient matrix is [[1,2],[3,k]], square, so a nontrivial solution exists iff det=0: 1(k)−2(3)=k−6=0, giving k=6.

7. EIGENVALUES OF A POWER. A matrix A has eigenvalues 2 and −1. Find the eigenvalues of A³. Using the power rule: eigenvalues of Aᵏ are (eigenvalues of A)ᵏ, so A³ has eigenvalues 2³=8 and (−1)³=−1.

8. SYMMETRIC/SKEW-SYMMETRIC DECOMPOSITION. Decompose A=[[4,6],[2,8]] into a symmetric part and a skew-symmetric part. Aᵀ=[[4,2],[6,8]]. Symmetric part = (A+Aᵀ)/2 = [[8,8],[8,16]]/2 = [[4,4],[4,8]]. Skew-symmetric part = (A−Aᵀ)/2 = [[0,4],[−4,0]]/2 = [[0,2],[−2,0]]. Check: symmetric part is indeed symmetric (equal to its own transpose by inspection) and has zero on its own diagonal only where forced — actually the SUM of the two parts should reconstruct A: [[4,4],[4,8]]+[[0,2],[−2,0]]=[[4,6],[2,8]]=A, confirmed.

9. LINEAR INDEPENDENCE CHECK. Are the vectors (1,2,3), (2,4,6), (1,0,1) linearly independent? Notice (2,4,6) = 2×(1,2,3) exactly — a nontrivial linear combination (2)(1,2,3) + (−1)(2,4,6) + (0)(1,0,1) = (0,0,0) exists with coefficients not all zero, so the set is LINEARLY DEPENDENT (not independent), regardless of the third vector.

10. DIAGONALIZABILITY CHECK. Is A=[[3,0],[0,3]] diagonalizable? A is already diagonal, so it is trivially diagonalizable with P=I, D=A. Cross-check via eigenvalues: characteristic equation (3−λ)²=0 gives a repeated eigenvalue λ=3 with algebraic multiplicity 2; solving (A−3I)v=0 gives [[0,0],[0,0]]v=0, which is satisfied by EVERY vector — the eigenspace has dimension 2, matching the algebraic multiplicity exactly, confirming diagonalizability directly from the eigenspace-dimension test as well.

11. ORTHOGONAL MATRIX SHORTCUT. Q=[[cos θ, −sin θ],[sin θ, cos θ]] is a standard rotation matrix, known to be orthogonal. Find Q⁻¹ without computing an adjugate. Since Q is orthogonal, Q⁻¹=Qᵀ=[[cos θ, sin θ],[−sin θ, cos θ]] directly — geometrically, rotating backward by the same angle θ, exactly the inverse of a rotation by θ, confirming the shortcut's geometric meaning.

12. RANK-NULLITY APPLICATION. A 5×7 matrix A has rank 4. Find the nullity (the dimension of its solution space for Ax=0). By rank-nullity, nullity = n − rank = 7 − 4 = 3.

13. SYLVESTER'S CRITERION. Is A=[[1,2],[2,1]] positive definite? Leading minors: 1×1 minor is 1>0 (passes). 2×2 minor is det(A)=1(1)−2(2)=1−4=−3, which is NOT >0 (fails). So A is not positive definite. Cross-check via eigenvalues: trace=2, det=−3, characteristic equation λ²−2λ−3=0, factoring (λ−3)(λ+1)=0, giving eigenvalues 3 and −1 — one positive, one negative, confirming A is INDEFINITE, not positive definite, matching Sylvester's criterion's verdict.

14. LU DECOMPOSITION. Find the LU decomposition of A=[[1,2],[3,8]]. Eliminate (2,1): R2 → R2 − 3R1 (multiplier 3, since 3/1=3), giving U=[[1,2],[0,2]]. L=[[1,0],[3,1]]. Verify: LU=[[1,0],[3,1]][[1,2],[0,2]]=[[1,2],[3,6+2]]=[[1,2],[3,8]]=A, confirmed.

15. CAUCHY-SCHWARZ CHECK. For u=(3,4) and v=(4,3), verify Cauchy-Schwarz and check whether equality holds. u·v = 3(4)+4(3) = 12+12 = 24. ‖u‖=√(9+16)=√25=5. ‖v‖=√(16+9)=√25=5. ‖u‖‖v‖=25. Since |24| ≤ 25, the inequality holds, and since 24≠25, it is strict — u and v are NOT parallel (confirmed directly: v is not a scalar multiple of u, since 4/3 ≠ 3/4).

16. POSITIVE SEMI-DEFINITE RECOGNITION. Classify A=[[1,1],[1,1]] as positive definite, positive semi-definite, negative definite, or indefinite. Leading minors: the 1×1 minor is 1>0, but the 2×2 minor is det(A)=1(1)−1(1)=0, not strictly positive — so A fails STRICT positive definiteness by Sylvester's criterion. Checking eigenvalues directly: trace=2, det=0, characteristic equation λ²−2λ=0, factoring λ(λ−2)=0, giving eigenvalues 0 and 2 — both NON-NEGATIVE (one is exactly zero), so A is POSITIVE SEMI-DEFINITE, matching the pattern of the 2×2 minor coming out to exactly zero rather than negative (a zero leading minor, rather than a negative one, is the signature of a semi-definite rather than an indefinite matrix).

17. DETERMINANT VIA ROW REDUCTION. Compute det(A) for A=[[2,4],[1,3]] using row reduction rather than the direct 2×2 formula, as a cross-check method. Eliminate (2,1): R2 → R2 − (1/2)R1, giving U=[[2,4],[0,1]] (no row swap was needed). Product of U's diagonal entries: 2×1=2. Cross-check via the direct formula: det(A)=2(3)−4(1)=6−4=2 — matches exactly, confirming the row-reduction method.

18. BASIS AND DIMENSION. Do the vectors (1,0,0), (0,1,0), (1,1,0) form a basis for ℝ³? They clearly cannot: all three vectors have a zero third component, so every linear combination of them also has a zero third component — they can only ever span the 2-dimensional subspace {(x,y,0)}, never the full 3-dimensional ℝ³, regardless of how many vectors of this restricted shape are added. A valid basis for ℝ³ must consist of exactly 3 vectors (matching ℝ³'s dimension) that are linearly independent AND not confined to any lower-dimensional subspace like this one — adding, say, (0,0,1) to the given set of three would fix the problem, giving four vectors spanning all of ℝ³, though a genuine basis still needs to drop one of the now-redundant original three to get back down to exactly 3 independent vectors — for instance keeping (1,0,0), (0,1,0), (0,0,1) and discarding (1,1,0), which is already a linear combination of the first two ((1,1,0)=(1,0,0)+(0,1,0)) and therefore contributes nothing new to the span once the other two are already present, exactly the kind of redundancy the linear-independence check built earlier in this chapter is meant to catch directly, well before any spanning or dimension claim is made about a proposed set of vectors at all, since a set already containing a redundant vector can never actually reach the full dimension it superficially appears to promise merely by its raw vector count alone, no matter how that count compares to the ambient space's own dimension.

CARRYING THIS FORWARD

Every technique in this chapter reduces, eventually, to one of the three underlying questions raised at the very start: does Ax=b have a solution and how many (answered entirely by comparing rank(A) to rank([A|b])), is a transformation invertible (answered entirely by whether det(A)=0, equivalently whether 0 is an eigenvalue), and what happens to a vector under repeated application of A (answered entirely by A's eigenvalues and eigenvectors). Recognising which of these three questions a given problem is actually asking — often disguised inside unfamiliar wording about "the number of independent solutions," "whether a matrix can be inverted," or "the long-run behaviour of a repeated transformation" — is worth doing explicitly before reaching for any specific formula, exactly the same translation discipline this chapter's sibling chapter on combinatorics emphasised for word problems: the arithmetic in this subject is rarely hard once the right underlying question has been identified, and nearly every error traces back to reaching for the wrong tool (an inverse formula where a rank check was needed, a determinant computation where an eigenvalue shortcut would have been faster) rather than to a computational mistake within the right tool.

The chapter's later sections — vector spaces, rank-nullity, diagonalization, quadratic forms, orthogonality — are best understood not as a separate, harder tier bolted onto the earlier material, but as the same three underlying questions asked with more precision. "How many free parameters does this system's solution have" (rank-nullity) is just a sharper version of the earlier system-solving question. "Can this transformation be simplified into pure independent scaling along some set of directions" (diagonalization) is a sharper version of the eigenvalue question, asking not just what the eigenvalues ARE but whether they are enough, on their own, to describe the whole transformation. "Is this symmetric matrix's associated quadratic form always positive" (definiteness) turns out, via the eigenvalue-sign characterisation, to be the SAME eigenvalue question yet again, now applied to a geometric question about curvature rather than a question about repeated transformation. Seeing these later, seemingly more advanced topics as refinements of the three founding questions — rather than as an unrelated new list to memorise — is the single habit most worth carrying out of this chapter and into the harder, more disguised numericals that combine several of these ideas within one question stem.

A final practical note on strategy: nearly every worked problem in this chapter was solved TWICE — once by the direct method, and once by an independent cross-check (trace-determinant against the characteristic equation, AP=PD against the diagonalization claim, LU multiplied back out against the original matrix, row-reduction cross-checked against rank-nullity). This is not incidental to the chapter's presentation; it is the single most valuable exam habit a chapter this dense in formulas can teach, since a matrix computation with several arithmetic steps has many places for a single sign error or transcription slip to enter silently, and a cheap independent check (multiply the claimed inverse back against the original, verify the claimed eigenvalues against trace and determinant, confirm a claimed decomposition reconstructs the original matrix exactly) catches such slips before they propagate into a wrong final answer, at a fraction of the cost of redoing the entire computation from scratch.
`
};
