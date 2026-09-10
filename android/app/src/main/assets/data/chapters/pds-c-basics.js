// Textbook chapter: C Programming Fundamentals.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/pds.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — here the two figures already defined for this
// topic (mem-layout, static-lifetime) are reused rather than redrawn.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['pds-c-basics'] = {
  figs: [],
  text: `
WHAT THIS CHAPTER IS FOR

Every other topic in Programming and Data Structures — arrays, pointers, recursion, linked lists, trees, sorting — is written in C, and every one of them assumes you can read a short piece of C code and say, with certainty, what it does. Not "probably prints 5" but "prints 5, and here is why, line by line." That skill is what this chapter builds, from nothing.

C looks like a small language, and it is: a handful of types, a handful of operators, a handful of control-flow constructs. The difficulty is not the size of the language but its precision. Every operator has an exact precedence and an exact associativity; every conversion between types follows an exact rule; every variable has an exact lifetime and an exact scope. Get one of these exact rules slightly wrong in your head and you will confidently predict the wrong output — which is worse than not knowing, because you will not go back and check. So this chapter is built the way the language itself is built: mechanically, one rule at a time, each one derived from what the machine actually has to do, with a full trace on a concrete example before moving to the next rule.

By the end you should be able to take almost any short C program this course throws at you, build a table of every variable, and fill it in statement by statement without guessing. That table-building habit is worth carrying into every later topic — a linked-list bug or a recursion trace is the same skill applied to bigger code.

FROM SOURCE FILE TO RUNNING PROGRAM

Before touching syntax, it helps to know what happens to the text you type before it becomes a running program, because this pipeline is often the real subject of a question that looks like it is about C syntax, and because the vocabulary — preprocessor, compiler, assembler, linker — is used loosely everywhere and needs pinning down once.

You write a .c file: plain text, readable by a human, meaningless to the CPU. Four tools turn it into something the CPU can execute, each one handing its output to the next.

1. The preprocessor runs first, and it does not know any C syntax at all — it only does text substitution. It expands every #include by pasting in the named file's text, expands every #define macro by replacing each use with its defined text, and resolves every #ifdef/#ifndef/#endif by keeping or discarding blocks of text before the compiler ever sees them. Its output is another text file (traditionally with the code's macros and includes already flattened in) — call it the translation unit. Nothing here understands what a function or a variable is; it is find-and-replace with rules.

2. The compiler takes that expanded text and does understand C. It runs a lexer that turns the characters into tokens, a parser that checks the tokens form valid C grammar (a missing semicolon dies here), and a semantic-analysis pass that checks types and rejects things like adding a struct to a function pointer. If the code passes, the compiler emits assembly language: a sequence of instructions in the target machine's instruction set, still in a human-readable text form, one file per translation unit. This is the stage where a syntax error or a type error is caught and reported with a line number.

3. The assembler takes that assembly text and turns each instruction into its exact binary encoding, producing an object file — machine code, but not yet a runnable program, because it may reference names (functions, global variables) defined in some other file, such as printf, which lives in the C standard library, not in your source. Those references are left as unresolved symbols with placeholder addresses.

4. The linker collects every object file the program needs — the ones compiled from your own .c files plus the ones from libraries like the C standard library — and resolves every unresolved symbol by finding where each name is actually defined, then patches in the real addresses. Its output is the executable file: a complete binary, ready to be loaded and run. An "undefined reference to foo" error happens here, not at compile time, which is precisely why it is possible to compile every file successfully and still fail to build the program.

Loading and running come after this pipeline and belong to the operating system rather than to C: the loader reads the executable, sets up the four memory regions described later in this chapter, and hands control to the CPU at the program's entry point.

KEY: Preprocessor does text substitution only, with no knowledge of C grammar. Compiler turns valid C into assembly and is where syntax and type errors are caught. Assembler turns assembly into machine code with unresolved symbols. Linker resolves those symbols across every object file and library, producing the final executable. A syntax error is a compile-time failure; a missing function definition is a link-time failure — different stages, different symptoms.

THE BASIC TYPES AND HOW BIG THEY ARE

A variable is a named box in memory; its type says how many bytes the box occupies and how those bytes are interpreted. C fixes a minimum guarantee for each type's range but deliberately leaves the exact size to the implementation, and understanding why explains a real, deliberate convention rather than an arbitrary one.

The C standard requires char to be at least 8 bits, short and int at least 16 bits, long at least 32 bits, and long long at least 64 bits, with the additional rule that each type in that list is no smaller than the one before it. That is a floor, not a fixed number — a compiler for a machine with a natural 16-bit word and a compiler for a machine with a natural 32-bit word can both be standard-conforming while disagreeing about how big an int is. This is exactly why sizeof(int) is called implementation-defined: the standard hands the decision to whoever writes the compiler for a given machine, based on what that machine's hardware handles most efficiently.

This textbook sidesteps that ambiguity with a fixed, stated convention: a 32-bit machine. Unless a problem states otherwise, assume:

• char — 1 byte, range -128 to 127 if signed, 0 to 255 if unsigned.
• short — 2 bytes, range -32768 to 32767 if signed, 0 to 65535 if unsigned.
• int — 4 bytes, range -2147483648 to 2147483647 if signed, 0 to 4294967295 if unsigned.
• long — 4 bytes on this convention (some systems make it 8; a question that cares will say so).
• long long — 8 bytes.
• float — 4 bytes, double — 8 bytes.
• pointer — 4 bytes on this convention (8 bytes on a real 64-bit machine).

char deserves special attention: it is not a separate "text" type with its own arithmetic rules, it is simply the smallest integer type, and every arithmetic operator that works on int works on char because — as the next section shows — char is promoted to int before any arithmetic happens anyway. 'A' is not a mysterious letter-object to the machine; it is the integer 65 stored in one byte. Whether plain char (with no signed or unsigned keyword) behaves as signed or unsigned is itself implementation-defined, which is why a question that depends on the sign of char will say "assume signed char" or "assume unsigned char" explicitly, and why writing signed char or unsigned char yourself when it matters is good practice, not paranoia.

GATE TRAP: sizeof('a') is not 1. A character constant like 'a' written directly in C source has type int, not char (this is one of the differences between C and C++, where it would be char), so sizeof('a') equals sizeof(int) — typically 4 — even though a variable declared char c = 'a'; does occupy exactly 1 byte. The 1-byte guarantee is about the storage of a char variable, not about the type of a character-literal expression.

HOW INTEGERS ARE ACTUALLY STORED: TWO'S COMPLEMENT

An unsigned integer of n bits stores its value directly in binary: with n bits you can write 2^n distinct patterns, and they are read as the numbers 0 through 2^n − 1 in the usual way each bit doubles the place value of the one before it.

range of an unsigned n-bit integer = 0 to 2^n − 1

Signed integers need a way to represent negative numbers using the same fixed-width bit pattern, and every mainstream machine — and the convention used throughout this book — represents them in two's complement. The idea: to represent −k for a positive k, write down the binary for k, flip every bit, and add 1. Working through this mechanically shows why it is the representation everyone settled on.

1. Take the magnitude k in ordinary binary, padded to n bits. For k = 20 in 8 bits: 00010100.
2. Invert every bit (this is called the one's complement): 11101011.
3. Add 1 to that result: 11101011 + 1 = 11101100.
4. That pattern, 11101100, is −20 in 8-bit two's complement. Check it by reversing the process: subtract 1 to get 11101011, invert to get 00010100, which is 20 — confirming the pattern really does represent negative 20.

The reason this scheme is universal rather than some other negative-number trick is that ordinary binary addition, applied without any special-casing, produces correct results whether the operands are positive or negative — a two's-complement adder is the same circuit as an unsigned adder. Add 20 (00010100) and −20 (11101100) with plain binary addition and the result is 100000000, which is 9 bits; the 9th bit falls off the top of an 8-bit register, leaving 00000000 — zero, exactly as 20 + (−20) should be. No separate subtraction hardware is needed.

Two's complement also explains where the asymmetric range comes from. With n bits there are 2^n patterns total. Half of them, those with a leading 0, are read as the non-negative numbers 0 through 2^(n−1) − 1. The other half, with a leading 1, are read as the negative numbers −2^(n−1) through −1. There is exactly one more negative number representable than positive, because 0 uses up one of the "non-negative" patterns and the negatives use every remaining pattern with no separate "negative zero".

range of a signed n-bit two's-complement integer = −2^(n−1) to 2^(n−1) − 1

For a 32-bit int that is −2147483648 to 2147483647 — note the asymmetry: 2147483647 can be represented, but 2147483648 cannot, only −2147483648 can, which is exactly the fact the next section turns into an overflow trap.

OVERFLOW: DEFINED WRAPAROUND VERSUS UNDEFINED BEHAVIOUR

What happens when an operation's true mathematical result does not fit in the type's range? C gives two completely different answers depending on whether the type is signed or unsigned, and mixing them up is one of the most heavily tested points in this topic.

Unsigned overflow is defined by the standard, precisely, as arithmetic modulo 2^n. There is no error, no crash, no unpredictability: the result is simply the true mathematical result reduced into the range 0 to 2^n − 1 by adding or subtracting multiples of 2^n. So for a 32-bit unsigned int, computing 0 minus 1 gives (0 − 1) mod 2^32 = 2^32 − 1 = 4294967295. Decrementing an unsigned value that is already 0 always produces the type's maximum value, and incrementing an unsigned value already at its maximum always wraps back to 0. This is not a bug to work around; C guarantees it, and code that relies on it (a circular buffer index, a hash computation) is behaving exactly as the standard promises.

Signed overflow is undefined behaviour. The standard places no requirement whatsoever on what happens when a signed computation's true result falls outside the type's range — not "it wraps", not "it saturates", nothing is guaranteed, and a compiler is technically permitted to do anything at all, including optimising away code that depends on the overflow occurring in a particular way. In practice, on every mainstream two's-complement compiler, adding 1 to INT_MAX does wrap the same way the bit pattern would suggest: 01111111111111111111111111111111 (2147483647) plus 1 becomes 10000000000000000000000000000000, which as a signed pattern reads as −2147483648, the most negative representable int. A problem that wants a specific numeric output is relying on this practical, if technically undefined, wraparound — but the honest statement of the rule is that the standard does not promise it, only real hardware does.

KEY: Unsigned overflow wraps modulo 2^n — this is defined behaviour, guaranteed by the standard, and never undefined. Signed overflow is undefined behaviour — the standard promises nothing, though two's-complement hardware in practice wraps INT_MAX + 1 to INT_MIN. Never call unsigned wraparound "undefined"; never call signed overflow "safe".

IMPLICIT CONVERSIONS AND INTEGER PROMOTION

C will silently convert one type to another in an expression rather than refusing to compile, and predicting output correctly means knowing exactly when and how it does this — the rules are called integer promotion and the usual arithmetic conversions, and they are two distinct, sequential steps.

Integer promotion happens first, to every individual operand, before any operator is even applied. Any operand of type char, signed char, unsigned char, or short (signed or unsigned) is converted to int, provided int can hold every value of the original type — which, on the 32-bit convention used here, it always can, since int is wider than char and short. This is why arithmetic on characters just works: 'a' + 1 is not "character plus number", it is int 97 plus int 1, because 'a' was promoted to int before the + ever ran.

After promotion, if a binary operator's two operands still have different types, the usual arithmetic conversions bring them to a single common type — the "wider" or "more general" one — so the operator has two operands of the same type to work with. The rule that produces the classic trap is: if one operand is unsigned int and the other is a (promoted) int of the same rank, the int operand is converted to unsigned int. The signed value's bit pattern is reinterpreted as unsigned; its numeric meaning changes completely if it was negative.

Trace it concretely. int a = −1; unsigned int b = 1; is a < b true or false?

1. Both operands are already at int/unsigned int rank, so no further promotion is needed, but their types differ.
2. The usual arithmetic conversions apply: since one operand is unsigned int, the signed int operand is converted to unsigned int by reinterpreting its bit pattern. −1 in 32-bit two's complement is the all-ones pattern, which as unsigned reads as 4294967295.
3. The comparison actually performed is 4294967295 < 1, which is false.
4. So a < b evaluates to false — the opposite of what the mathematical values −1 and 1 would suggest.

GATE TRAP: Comparing a negative int against an unsigned int of the same rank converts the negative value into an enormous positive one — it does not compare the mathematical values. A for loop written as for (unsigned int i = n; i >= 0; i--) is a related, extremely common bug: when i reaches 0, i-- does not go to −1 (unsigned cannot represent −1) but wraps to 4294967295, and i >= 0 is now always true for an unsigned i, so the loop never terminates by that test.

Integer division and modulo have their own implicit rule worth stating precisely: C99 and later specify that integer division truncates toward zero (not toward negative infinity), and that a % b is defined so the identity below always holds for integers, with b nonzero.

(a / b) * b + a % b == a

Because division truncates toward zero, the remainder's sign follows the sign of the dividend a, not the divisor b. Work out −7 / 2 and −7 % 2 to see it: −7 divided by 2 mathematically is −3.5; truncating toward zero (chopping the fractional part rather than rounding down) gives −3, not −4. Then by the identity, −3 × 2 + r = −7, so −6 + r = −7, so r = −1. Both the quotient and the remainder came out negative, matching the negative dividend, even though the divisor 2 was positive.

REMEMBER: Integer division truncates toward zero — it chops the fraction, it does not round down. The sign of a % b matches the sign of a, the dividend, regardless of the sign of b. Verify any remainder you compute against (a/b)*b + a%b == a; if it fails, you truncated the wrong way.

OPERATOR PRECEDENCE AND ASSOCIATIVITY

An expression like a + b * c is not evaluated left to right character by character; it is grouped by rules, and the two rules are precedence — which operator binds its operands first when different operators compete for the same operand — and associativity — which direction ties are broken when several operators of the same precedence sit side by side. Every "surprising output" question in this whole topic is really asking whether you know these rules exactly, so build the table by reasoning about it in bands, from tightest-binding to loosest.

Band 1, tightest: postfix operators — function call (), array subscript [], member access . and ->, and postfix ++/--. These bind before anything else because you must first obtain the specific object (call the function, index into the array, follow the struct member) before any other operator can act on the result. They associate left to right.

Band 2: unary operators — prefix ++/--, unary + and −, ! (logical not), ~ (bitwise not), * (dereference), & (address-of), sizeof, and a cast. These act on a single already-obtained operand, which is why they come after the postfix band, and they associate right to left — (type)*p reads as (type)(*p), applying the cast to whatever the dereference produces.

This band is where * and & are overloaded: as unary operators (band 2, right-to-left) they mean dereference and address-of; as binary operators — multiplication (band 3) and bitwise AND (band 8) — they mean something else entirely and bind at a different level with left-to-right associativity. The compiler tells them apart by context: an operator is unary if there is no valid operand to its left (the start of an expression, or right after another operator or an open parenthesis), binary otherwise.

That distinction resolves a classic-looking expression. *p++ is parsed as *(p++), not (*p)++, because postfix ++ (band 1) binds to p before the unary dereference * (band 2) is applied — postfix beats unary. The effect: p++ evaluates to the pointer's old value while incrementing the pointer itself, and then * dereferences that old value, so *p++ reads the object p used to point to and afterward leaves p advanced to the next object — exactly the idiom that walks an array one element at a time.

Band 3: multiplicative * / %, left to right.
Band 4: additive + −, left to right.
Band 5: shift << >>, left to right.
Band 6: relational < <= > >=, left to right.
Band 7: equality == !=, left to right.
Band 8: bitwise AND &, left to right.
Band 9: bitwise XOR ^, left to right.
Band 10: bitwise OR |, left to right.
Band 11: logical AND &&, left to right.
Band 12: logical OR ||, left to right.
Band 13: ternary ?:, right to left.
Band 14: assignment = += −= and the other compound-assignment operators, right to left.
Band 15, loosest: the comma operator ,, left to right.

Two placements in that ladder are where nearly every trap in this topic lives. The bitwise operators (bands 8, 9, 10) sit below the relational and equality operators (bands 6, 7) — lower precedence, meaning they bind looser and get grouped last. This is the opposite of the intuition most people bring from ordinary arithmetic, where multiplying feels "tighter" than comparing. Trace x & 1 == 0 to see the consequence.

1. Scan for the loosest-binding operator in the expression: between & (band 8) and == (band 7), == is tighter (higher precedence, closer to band 1), so it groups first.
2. So the expression parses as x & (1 == 0), not (x & 1) == 0.
3. 1 == 0 evaluates to 0 (false) regardless of x.
4. The whole expression is now x & 0, which is 0 for every x — a test that was presumably meant to check whether x is even always evaluates to false, silently, with no compiler error, because both sides typecheck fine as integers.

GATE TRAP: Never assume & binds tighter than == or the relational operators, by analogy with how * binds tighter than +. It is the reverse: bitwise AND, XOR and OR are all looser than the comparison operators. Any time a bitwise operator sits next to a comparison in the same expression without parentheses, parenthesise it explicitly before trusting your reading — (x & 1) == 0, not x & 1 == 0.

The assignment operator sits near the bottom (band 14), below every comparison, which is what makes a = b == c well defined rather than ambiguous: == (band 7) binds tighter than = (band 14), so it groups as a = (b == c) — b is compared to c first, producing 0 or 1, and that 0 or 1 is what gets stored into a. This is also the source of the classic typo trap: if (x = 0) inside a condition is not a comparison at all, it is an assignment, it always evaluates to 0 (false), and it silently overwrites x with 0 — the compiler accepts it because = is a perfectly legal expression to put inside an if.

The ternary operator's right-to-left associativity matters the moment you chain them. a > b ? 1 : a == b ? 2 : 3 groups as a > b ? 1 : (a == b ? 2 : 3) — the second ?: is entirely inside the else-branch of the first, which is the natural reading of "if not this, then check the next condition", and is exactly why chained ternaries work as an else-if chain rather than needing extra parentheses.

The comma operator, at the very bottom, evaluates every operand left to right purely for its side effects except the last, whose value becomes the value of the whole comma expression. x = (2, 4, 6); evaluates 2 (discarded), then 4 (discarded), then 6, and stores 6 into x — the parentheses matter here, because inside a variable declaration a bare comma instead separates declarators (int x = 2, y = 4; declares two variables), not comma-operator operands.

KEY: When two operators of different bands sit in the same expression with no parentheses, the higher-precedence one (further up this list) groups first, regardless of which one is written first or which "feels" tighter. When memory of the exact band order fails under time pressure, parenthesise explicitly rather than guessing — the two facts worth over-learning are that bitwise operators bind looser than comparisons, and that assignment binds looser than almost everything on its right.

INCREMENT, DECREMENT AND SEQUENCE POINTS

++x and x++ both add 1 to x, and --x and x-- both subtract 1, but they differ in what value the expression itself produces, and that difference is exactly what makes them usable inside larger expressions rather than only as standalone statements.

Prefix ++x performs the increment first and then the expression's value is the new, already-incremented x. Postfix x++ produces the expression's value first — the old value, before any change — and only after that value has been read does the increment actually take effect. Both leave x one larger afterward; they differ only in which value the surrounding expression sees.

Trace int a = 2, b = 3, c; c = a++ + ++b; to fix this. a++ is postfix, so the value used in the addition is the old a, 2, and a's own value becomes 3 as a side effect. ++b is prefix, so b becomes 4 first, and 4 is the value used in the addition. The addition itself is therefore 2 + 4 = 6, so c = 6. After the whole statement: a = 3 (incremented), b = 4 (incremented), c = 6.

This raises the question of when, exactly, the "side effect" of an increment is guaranteed to have happened relative to everything else in the same statement — and the honest answer is: only at specific points the standard calls sequence points, which include the end of a full statement (the semicolon), the point after evaluating the left side of && or || or the comma operator, and the point after evaluating a ternary's condition. Between sequence points, the order in which side effects happen is not fixed by the language at all.

That is why an expression like i = i++; or i = i++ + ++i; is undefined behaviour rather than merely "tricky": i is being modified more than once (by the assignment, and by the increment) with no sequence point separating those modifications, so the standard makes no promise about the result at all — not "compiler dependent in a knowable way", genuinely unspecified, and different optimisation levels of the same compiler can and do produce different answers. The honest response to such an expression is to recognise it as undefined, not to compute a confident numeric answer for it. A closely related trap is printf("%d %d", i, i++); — the order in which a function's arguments are evaluated is unspecified by C (the compiler may evaluate them left to right, right to left, or any order it likes), and here that unspecified order interacts with a variable being both read and modified, which makes the whole expression undefined behaviour, not just "compiler's choice".

GATE TRAP: An expression that modifies the same variable twice with no sequence point between the modifications (i = i++, a[i] = i++, f(i++, i++)) has no defined output. A question built around such an expression is testing whether you recognise it as undefined behaviour, not whether you can guess which of several plausible numbers a particular compiler happens to print.

Tokenising also has its own trap here, arising from how the compiler reads characters, not from evaluation order. C tokenisation uses maximal munch: at each point the lexer consumes the longest sequence of characters that forms a valid token, before the parser ever considers alternative groupings. So a+++b is read character by character as a, then ++ (the longest valid operator starting there, rather than stopping at a single +), then +, then b — giving the token sequence a ++ + b, which the parser reads as (a++) + b, using postfix increment on a. It is never parsed as a + (++b), even though that grouping might look equally plausible to a human eye, because the lexer commits to ++ before the parser gets a say.

SHORT-CIRCUIT EVALUATION

The logical operators && and || do not always evaluate both of their operands, and knowing precisely when the second one is skipped is essential, because it is common to put a side effect — an increment, an assignment, a function call — inside the operand that might be skipped.

For e1 && e2, C guarantees that if e1 evaluates to 0 (false), the overall result is already determined to be false no matter what e2 is, so e2 is not evaluated at all — not evaluated and discarded, simply never touched, and any side effect written inside it does not happen. Only when e1 is nonzero (true) does e2 get evaluated, and the result is then whether e2 is also nonzero.

For e1 || e2, the mirror rule holds: if e1 evaluates to nonzero (true), the overall result is already true regardless of e2, so e2 is skipped entirely. Only when e1 is 0 (false) is e2 evaluated.

Trace int i = 0, j = 1, k; k = i++ && j++; to see the consequence precisely. i++ is evaluated first as the left operand of &&: its value is the old i, which is 0 — false — and as a side effect i becomes 1. Because the left operand of && is false, the right operand j++ is never evaluated: j's increment never happens, j stays 1. The value of a false && expression is 0, so k = 0. Final state: i = 1 (it was incremented, that side effect did happen), j = 1 (unchanged, its increment was skipped), k = 0.

The mirror case with || confirms the rule is really about which side is guaranteed already-determined, not about && specifically. int a = 5, b = 0; if (a > 0 || (b = 10)) { } — a > 0 is 5 > 0, true, so the || is already known to be true and (b = 10) is never executed at all; b keeps its original value 0. Had a been 0 or negative, a > 0 would be false, the right side would run, and b would become 10.

KEY: In e1 && e2, e2 runs only if e1 is true. In e1 || e2, e2 runs only if e1 is false. In both cases, "does not run" means literally does not run — any assignment, increment, or function call written there has no effect and any printf inside it prints nothing. This is the single most common way a short program hides a side effect that a hasty trace would wrongly credit.

IF AND SWITCH

An if statement needs no new machinery beyond what has already been built: its condition is any expression, evaluated for truthiness (0 is false, anything else is true), and the classic if (x = 0) trap from the precedence section is really just this construct combined with the low precedence of =.

switch(expr) is a different shape of branch, and its defining behaviour is that it is not a set of independent if/else-if blocks. Execution jumps straight to the case label matching expr's value and then keeps running every statement after that point, through subsequent case labels, until it hits a break or reaches the end of the switch block. Falling into the next case's code when there is no break is called fall-through, and it is the normal, intended behaviour of the construct, not a bug — you have to opt out of it with break, not into it.

1. Evaluate the switch expression once, giving an integer value.
2. Find the case label matching that value and jump execution to immediately after that label — every case label before it in the source is skipped entirely, not executed and not "checked".
3. Execute statements sequentially from that point onward, exactly as if the case labels were not there, until a break statement is reached (which exits the switch immediately) or the closing brace of the switch is reached (which also ends it, having run every remaining case's statements along the way).

default is not "the first thing that runs" nor "checked first because it happens to be written first" — it is purely a fallback label used only when no case value matches expr, and it can be fallen into from an unbroken case above it exactly like any other label, or fallen through past like any other label if it lacks its own break and sits before further cases.

Trace int x = 3; switch (x) { case 0: printf("Z"); case 1: printf("A"); break; case 2: printf("B"); default: printf("D"); } to see fall-through carry across a case boundary. x is 3, which matches none of the case labels 0, 1, or 2 and there is no explicit default label matching that description here — wait, there is a default, so execution jumps there directly since no case matches. printf("D") runs. There is no break after it and no more statements follow, so the switch ends. Output: "D".

Now change x to 0. Execution jumps to case 0, printf("Z") runs, there is no break, so control falls through into case 1's code, printf("A") runs, and the break there ends the switch — case 2 and default are never reached. Output: "ZA".

GATE TRAP: A switch with no break anywhere runs every case from the matching one to the very end of the block, printing the accumulated output of all of them — this is very often the intended trap in a "how many characters are printed" question. Separately, default running is not evidence that no earlier case had a break; check whether execution reached default by falling through an unbroken case above it, or by jumping there directly because nothing matched.

LOOPS

C has three looping constructs, and while and do-while differ only in when the condition is checked, which changes whether the body is guaranteed to run at all. while (cond) { body } checks cond before every iteration, including the very first, so if cond is false to begin with the body never runs. do { body } while (cond); checks cond after the body, so the body always runs at least once no matter what cond is — this is the entire reason the construct exists, and any question contrasting a while loop against the "same" logic written as do-while is testing exactly this one difference.

for (init; cond; update) { body } is defined precisely as a rewriting of a while loop, and knowing that rewriting removes any ambiguity about the order of operations.

1. init runs exactly once, before anything else, typically setting up a loop counter.
2. cond is evaluated. If it is false, the loop ends immediately without running body even once — the for loop can execute zero iterations, unlike do-while.
3. If cond is true, body executes in full.
4. update runs — after the body, before the condition is checked again — and then control returns to step 2.

Any of the three clauses may be empty. An empty init simply means step 1 does nothing; an empty update means step 4 does nothing; an empty cond is treated as always true, which is why for (;;) { } is an idiom for an infinite loop with no built-in exit condition (one must break out of it explicitly from inside the body).

The most common accident in this construct is an unintended empty body. for (i = 0; i < 5; i++); with a semicolon immediately after the closing parenthesis makes that semicolon the entire loop body — an empty statement — so the loop runs to completion doing nothing five times, and whatever code appears on the next line, even if indented as though it belonged to the loop, executes exactly once, after the loop has already finished, using whatever value i was left with. Trace int i; for (i = 0; i < 5; i++); printf("%d", i); step by step: the loop runs with an empty body while i goes 0, 1, 2, 3, 4, and the condition fails once i reaches 5, at which point the loop ends; printf then runs once, printing the final i, which is 5 — not 4 (the last value the condition was true for) and certainly not all five values in sequence.

continue behaves differently from break: break exits the enclosing loop immediately, while continue skips only the remainder of the current iteration's body and moves on to the next iteration — it does not exit the loop. Where control goes next after a continue depends on the loop type, and this is the trap worth isolating. In a for loop, continue jumps to the update clause first and then re-checks the condition — the update still runs. In a while loop, there is no separate update clause, so continue jumps straight to re-checking the condition; if the only increment of the loop variable is written after the continue in the body, that increment is skipped every time continue fires, which can produce an infinite loop. In a do-while loop, continue jumps to the condition check at the bottom, exactly where it would have gone anyway at the end of a normal iteration.

KEY: for's continue still runs the update clause before re-testing the condition — it is not equivalent to jumping straight to the test the way continue in a while loop does. Confusing the two loop types' continue targets is the standard way this construct is mistraced.

STORAGE CLASSES AND WHERE VARIABLES LIVE

Every variable has two properties beyond its type: its scope, meaning where in the source code its name can legally be used, and its lifetime (or storage duration), meaning how long the memory it occupies actually exists. The four storage-class keywords — auto, static, extern, register — are really about lifetime and linkage (whether the name is visible outside its own source file), and the cleanest way to fix all four in your head is to see where each one actually lives in the running program's memory.

[[FIG:mem-layout]]

A running program's address space divides into four regions. Text holds the compiled machine instructions and does not change while the program runs. Data holds global variables and variables declared static, wherever they appear — the compiler knows their size and their initial value before the program even starts, so they can be allocated once, for the whole run. The heap holds memory requested explicitly at run time via malloc, growing and shrinking as the program requests and releases it. The stack holds each function call's local variables and bookkeeping, growing with every call and shrinking with every return.

auto is the default storage class for a variable declared inside a function with no keyword at all — int x; inside a function means the same thing as auto int x;. Its storage is the stack: a fresh copy is created every time the enclosing block is entered, holding an indeterminate, uninitialised (garbage) value unless you explicitly initialise it, and that copy is destroyed the instant the block exits. This is exactly why a local variable's value cannot be trusted to survive between separate calls to the same function — there is, quite literally, a new box in a new place on the stack each time, not the same box being reused.

static changes this completely, but it means two different things depending on where it is written, and the distinction is one of the most tested single facts in this chapter.

A static local — a variable declared static inside a function — moves out of the stack and into the data section. It is created once, when the program starts, initialised exactly once (to the value you give it, or to zero if you give none), and it keeps its value for the entire life of the program, across every call to the function, because it is the same box in memory every time, not a new one.

[[FIG:static-lifetime]]

Trace it. void f(void) { static int c = 0; c++; printf("%d ", c); } called three times as f(); f(); f();. Call 1: c already exists (allocated at program start) and has already been initialised to 0 — that initialisation is not re-run — c++ makes it 1, prints "1 ". Call 2: c is the very same memory as before, still holding 1 from the previous call; c++ makes it 2, prints "2 ". Call 3: c holds 2; c++ makes it 3, prints "3 ". Total output across all three calls: "1 2 3 ". Had c instead been declared as a plain auto int c = 0; inside the same function, every call would create a fresh c, initialise it to 0 again, increment it to 1, and discard it — the output would be "1 1 1 " every time, with no memory of previous calls at all.

A static global — static written on a variable (or a function) declared outside any function, at file scope — does not change lifetime at all, because a file-scope variable already lives for the whole program run with or without static. What static changes here is linkage: it gives the name internal linkage, meaning the name is visible only within the .c file it is declared in. An extern declaration of the same name written in a different file cannot bind to it; as far as any other file is concerned, that name does not exist. A plain global with no keyword, by contrast, has external linkage by default, so other files can reach it with their own extern declaration.

extern does not create storage at all when used as a declaration; it announces that a variable (or function) with this name and type is defined somewhere else — possibly later in the same file, more often in a different file — and tells the compiler to trust that a real definition with actual storage exists and will be supplied by the linker. extern int x; by itself reserves no memory; int x; at file scope both declares and defines x, reserving its storage. Confusing "extern declares" with "extern defines" is the source of link-time errors about duplicate or missing definitions.

register is the odd one out: it does not touch lifetime or the four memory regions at all. It is only a hint, asking the compiler to try to keep the variable in a CPU register rather than in ordinary memory, for speed — a hint the compiler is free to ignore entirely, and modern compilers routinely do, making their own decisions about register allocation regardless of this keyword. Its one enforced consequence is that the address-of operator cannot be applied to a register variable — &r is a compile error if r is declared register — because a value sitting in a CPU register has no memory address to take in the first place. Its scope and lifetime otherwise match auto exactly: block scope, automatic duration.

GATE TRAP: A local array, even a large one, lives on the stack, not the heap — int a[1000]; inside a function is 4000 bytes of stack space (on the 4-byte-int convention), created fresh on every call and destroyed on return, exactly like any other auto variable. Only memory obtained through malloc (or its relatives) lives on the heap. And a recursion that never terminates exhausts the stack specifically, producing a stack overflow, precisely because every call pushes a new frame and none of them ever return to pop it.

REMEMBER: static changes lifetime when applied to a local (auto's block-only life becomes the whole program's life) and changes linkage when applied to a global (external becomes internal — file-only visibility) — it is doing a different job in each place, not the same job in two locations. extern declares without allocating; a plain definition allocates. register only hints at CPU-register storage and forbids taking the variable's address; it does not change scope or lifetime.

SCOPE AND SHADOWING

Scope is a purely textual, compile-time property: the region of source code within which a name can be used to refer to a particular declaration. C scope nests with blocks — every { opens a new, inner scope, and every matching } closes it — and a name declared in an inner scope is visible from the point of its declaration to the end of that block, and nowhere outside it.

When an inner scope declares a name that is already in use in an enclosing scope, the inner declaration shadows the outer one for the remainder of the inner block: every unqualified use of that name inside the inner block refers to the new, inner variable, and the outer one becomes completely unreachable by that name until the inner block ends, at which point the outer name becomes visible again, untouched by whatever happened to the inner copy.

Trace int gx = 10; void bump() { gx += 5; } int main() { int gx = 1; { int y = gx + 2; gx = 100; } bump(); printf("%d", gx); } to see two separate objects sharing one name resolved purely by which scope is active at each point. main declares a local gx = 1, which shadows the file-scope global gx = 10 for the entire rest of main. Inside the nested block, gx + 2 refers to main's local gx (1), giving y = 3; the nested block does not redeclare gx, so it is not a new scope for that name — it still means main's local variable. gx = 100 then sets main's local gx to 100. Now bump() is called: bump is a separate function with no local variable named gx at all, so the unqualified gx inside it refers to the file-scope global — which is still 10, completely untouched by anything that happened inside main's local gx — and bump adds 5 to it, making the global 15. Back in main, printf prints main's own local gx, which is 100, never having been affected by bump() at all.

KEY: A name inside a function body always resolves to the nearest enclosing declaration of that name, chosen at compile time by textual scope, never by which function happens to be running or which variable was "meant". Two variables can share an identical name and coexist as genuinely separate storage, resolved purely by which scope encloses each use.

FUNCTIONS: PARAMETERS, RETURN VALUES AND PROTOTYPES

C passes every argument to a function by value, with no exception: the parameter inside the function is a brand-new local variable, initialised with a copy of whatever the caller's expression evaluated to. Changes the function makes to its parameter change only that local copy; the caller's original variable, if it had one, is never touched.

void inc(int x) { x = x + 1; } called as int a = 5; inc(a); leaves a at 5 afterward, because x inside inc is a separate box that happened to start out holding a copy of a's value. This is not an exception that some functions have and others do not — it is how every function call in C works, with no way to opt a parameter out of being copied.

"Pass by reference" — a function that can actually modify the caller's variable — does not exist as a separate mechanism in C; it is simulated by passing a pointer, which is itself passed by value, but the value being copied is an address rather than the data itself. void inc(int *x) { *x = *x + 1; } called as inc(&a); copies the address of a into the parameter x; x is still a fresh local copy, but what it is a copy of is a's address, so dereferencing it with *x reaches the very same memory that a occupies, and the modification is visible to the caller. The pointer is passed by value; what changes is what kind of value is being copied.

A function's return type, if omitted entirely in older, pre-standard C, defaults to int — modern compilers warn heavily or refuse this, but the legacy default is occasionally tested as a historical fact rather than as good practice; every function should declare its return type explicitly, including void when it returns nothing.

A function prototype — a declaration like int add(int, int); appearing before the function is used — tells the compiler the function's return type and parameter types in advance, so a call appearing earlier in the file than the function's actual definition can be checked for type correctness at compile time rather than assumed to be correct. Without a prototype visible before a call, a pre-standard compiler would assume the function returns int and accept whatever argument types were passed with no checking at all — a source of exactly the kind of silent type mismatch the type system exists to prevent; a modern standard-conforming compiler requires a visible declaration before any call.

THE PREPROCESSOR

Every line beginning with # is a preprocessor directive, handled entirely in the first pipeline stage described earlier, before the compiler has any notion of C grammar. The two you must know cold are #define and #include, and the trap in #define is the single most consistently tested item in this whole topic.

#define NAME replacement-text creates an object-like macro: from that point in the file onward, every occurrence of NAME as a standalone token is replaced, purely textually, by replacement-text, with no type checking and no evaluation — the preprocessor does not know or care whether replacement-text is a valid expression, it just pastes the characters in. #define PI 3.14159 makes every later occurrence of PI become the six characters 3.14159 before the compiler ever runs.

#define NAME(params) replacement-text, with no space between NAME and the opening parenthesis, creates a function-like macro: NAME(arg1, arg2) is replaced by replacement-text with every occurrence of each parameter name substituted by the literal text of the corresponding argument. This looks exactly like a function call but is nothing like one at compile time — there is no argument-passing, no type checking, no separate stack frame, just text substitution, and that gap between appearance and mechanism is where every macro trap lives.

Take #define SQ(x) x*x and expand SQ(a+b). The substitution replaces x with the literal text a+b everywhere x appears in the body, giving a+b*a+b — not (a+b)*(a+b) as the name SQ suggests. Multiplication binds tighter than addition, so this parses as a + (b*a) + b, a completely different value from the square of a+b whenever a and b are both nonzero.

Trace a concrete case of exactly this shape. #define DOUBLE(x) x+x and int y = 3 * DOUBLE(4+1);. The macro body x+x has x replaced by the literal argument text 4+1, giving 4+1+4+1, so the full expanded line reads int y = 3 * 4+1+4+1;. Now apply ordinary C precedence to the expanded text: * binds tighter than +, so 3 * 4 is grouped first, giving 12, and then the remaining additions run left to right: 12 + 1 = 13, 13 + 4 = 17, 17 + 1 = 18. So y = 18 — nothing like the 30 you would get from the intended 3 × (2 × 5).

The fix is to parenthesise defensively, both around the whole macro body and around every individual use of each parameter: #define SQ(x) ((x)*(x)). Expanding SQ(a+b) now gives ((a+b)*(a+b)), and the parentheses force exactly the grouping the name promised, regardless of what expression is substituted for x or what surrounds the macro call in the larger expression.

Parentheses cannot fix every macro trap, because textual substitution also duplicates any side effect written inside an argument, once for every occurrence of the parameter in the macro body. #define SQ(x) ((x)*(x)) expanded on SQ(i++) becomes ((i++)*(i++)) — i is incremented twice, not once, by what looks like a single call, and because both increments touch the same variable with no sequence point between them, the expression is also undefined behaviour on top of the double-increment surprise. A real function int sq(int x) { return x * x; } called as sq(i++) evaluates the argument exactly once, copies that one value into its own local x, and increments i exactly once — this is the deepest reason a macro is not a function: a function call evaluates its arguments once, each, before the call body runs; a macro call pastes the argument text in as many times as the parameter appears in the definition.

GATE TRAP: An unparenthesised macro parameter or macro body will silently combine with the surrounding expression's operators according to ordinary C precedence, exactly as if you had typed the substituted text yourself — the macro's name gives you no protection at all. Always mentally expand a macro into its literal substituted text before trusting an expression that uses it, and always assume an argument written with a side effect (i++, a function call with effects) will run once per occurrence of the parameter in the macro's body, not once total.

#include <file.h> tells the preprocessor to paste the entire contents of a standard-library header at that point, textually, exactly as if you had typed it there yourself; #include "file.h" does the same for a file you wrote, searched for relative to your own source first. Conditional compilation with #ifdef NAME ... #endif keeps the enclosed text only if NAME has been #defined somewhere earlier (regardless of what it is defined to), and discards it entirely — as if it were never there — otherwise; #ifndef is the negation, keeping the block only when NAME has not been defined, the standard idiom for include guards that prevent a header's contents from being pasted in twice.

PRINTF, SCANF AND FORMAT SPECIFIERS

printf and scanf communicate with the type system entirely through the format string, not through the compiler checking the arguments against it (older compilers do not check this at all; modern ones add optional warnings, but the underlying mechanism is unchecked), which is exactly why a mismatched specifier is a real, common bug rather than something the language prevents.

%d reads or writes a signed int, %u an unsigned int, %f a float in printf but specifically requires %lf for scanf into a double (printf, unusually, accepts %f for both float and double arguments, because a float argument passed through printf's variable-argument mechanism is automatically promoted to double before printf ever sees it — scanf has no such promotion, since it receives a pointer, not a value, so it must be told the exact size), %c a single character, %s a null-terminated string, %x hexadecimal.

scanf needs the address of the variable to write into, because it is receiving a pointer through which it writes a value back to the caller — scanf("%d", &x) is correct; writing scanf("%d", x) without the & passes x's current (likely garbage, for an uninitialised variable) value as if it were an address, and scanf then attempts to write through that bogus address, typically crashing the program. printf needs no such address, because it only reads values to print them, never writes back.

Both functions return a count, and the count means something specific worth knowing precisely: printf returns the number of characters successfully written (or a negative value on an output error, rarely checked in practice); scanf returns the number of input items successfully matched and assigned — not the number of specifiers in the format string, but how many of them actually succeeded before any failure or end-of-input was hit. scanf("%d %d", &a, &b) returns 2 if both integers were read successfully, 1 if only the first was read before something went wrong, and EOF if the input ended (or failed) before even the first conversion.

A frequently traced quirk: after scanf("%d", &x); reads a number, the newline character typed to terminate that input is left sitting, unread, in the input buffer, because %d stops consuming characters the moment it sees a non-digit and does not consume the newline that follows. A subsequent scanf("%c", &c); does not wait for new input at all — it immediately reads that leftover newline character as its answer, which is very rarely what the program intended, and is the standard explanation whenever a character read in a trace "gets skipped" right after a numeric read.

BITWISE OPERATORS AND THE STANDARD IDIOMS

The bitwise operators — & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift) — act on the individual bits of an integer's representation rather than on its numeric value as a whole, and a handful of combinations of them are used so often that they are worth deriving once, from the truth-table behaviour of each operator, rather than memorised as unexplained tricks.

& produces a 1 in each bit position only where both operands have a 1; every other position becomes 0. Because ANDing any bit with 1 leaves it unchanged and ANDing any bit with 0 forces it to 0, x & mask is the tool for testing or isolating specific bits: to test whether bit k of x is set, compute x & (1 << k) — 1 << k is a pattern with a single 1 in position k and 0 elsewhere, so ANDing it with x produces a nonzero result exactly when bit k of x was 1, and 0 exactly when it was 0.

| produces a 1 wherever either operand has a 1. Since ORing any bit with 0 leaves it unchanged and ORing with 1 forces it to 1, x | (1 << k) sets bit k of x to 1 unconditionally, leaving every other bit of x exactly as it was.

^ (XOR) produces a 1 exactly where the two operands disagree — one is 1 and the other is 0 — and a 0 where they agree. XORing a bit with 0 leaves it unchanged (they agree only if the bit was already 0, disagree and flip if it was 1 — either way the result equals what you'd want from "toggle if 1"); more usefully, XORing any bit with 1 always flips it, since the two bits necessarily disagree whenever the mask bit is 1. So x ^ (1 << k) toggles bit k of x — sets it if it was 0, clears it if it was 1 — while leaving every other bit alone, because those positions are XORed with 0 and pass through unchanged.

To clear bit k specifically (force it to 0 regardless of its current value), AND with a mask that has a 0 only in position k and 1s everywhere else: x & ~(1 << k). ~ (bitwise NOT) flips every bit of its operand, so ~(1 << k) turns the single 1 at position k into a single 0 there with 1s surrounding it, and ANDing with that mask leaves every other bit of x untouched while forcing position k to 0.

Two idioms built from & deserve a full derivation because they recur constantly in bit-manipulation problems. First: x & (x − 1) always clears the lowest set bit of x and changes nothing else. Reasoning: write x in binary as (some prefix bits)1(a run of zero bits). Subtracting 1 borrows through that trailing run of zeros: it turns the lowest 1 bit into a 0, and turns every 0 bit below it into a 1 — the bits above the lowest set bit are completely untouched by the subtraction. Now AND x with that result: every bit above the lowest set bit is unchanged (x has some bit there, x−1 has the identical bit there, since neither the prefix nor that specific position changed), the lowest set bit position is 1 in x but 0 in x−1, so ANDing gives 0 there, and every bit below it is 0 in x (they were already 0, that's what made this the lowest set bit) so ANDing there stays 0 regardless of what x−1 has. Net effect: identical to x everywhere except the lowest set bit, which becomes 0.

x & (x − 1) clears the lowest set bit of x

Second: x & (−x) isolates the lowest set bit — produces a value that is 0 everywhere except a single 1 exactly where x's lowest set bit was. In two's complement, −x is computed as ~x + 1, and adding 1 to ~x flips the same trailing run of bits that subtracting 1 from x flipped, for the identical reason (borrowing/carrying through trailing zeros), so −x's bit pattern below and at the lowest set bit of x mirrors x itself at that position and is the complement of x above it. ANDing x with −x therefore agrees with x exactly at the lowest set bit (both have a 1 there) and disagrees (giving 0) everywhere above it, because x has whatever it has there and −x has the opposite; below the lowest set bit, x is all zeros, so the AND is zero there regardless. The result is a single 1 bit, exactly at x's lowest set bit position.

x & (−x) isolates the lowest set bit of x

These two combine into the standard population-count (counting how many bits of x are 1) loop: repeatedly clear the lowest set bit and count how many clears it takes to reach zero.

Trace int x = 44; int count = 0; while (x) { x = x & (x - 1); count++; }. 44 in binary is 00101100 (32 + 8 + 4).

1. x = 00101100 (44), count = 0. Loop condition x nonzero: true. x − 1 = 00101011 (43). x & (x−1) = 00101100 & 00101011 = 00101000 (40). count becomes 1. x is now 40.
2. x = 00101000 (40), nonzero: true. x − 1 = 00100111 (39). x & (x−1) = 00101000 & 00100111 = 00100000 (32). count becomes 2. x is now 32.
3. x = 00100000 (32), nonzero: true. x − 1 = 00011111 (31). x & (x−1) = 00100000 & 00011111 = 00000000 (0). count becomes 3. x is now 0.
4. x = 0: the loop condition is false, the loop ends.

Final count = 3, matching a direct count of the 1-bits in 00101100 (positions for 32, 8 and 4) — three of them. This loop runs exactly once per set bit, regardless of how wide the integer type is, which is what makes it faster than checking every one of the (say) 32 bit positions individually when x is sparse.

A related, common test: is x a power of two? A power of two has exactly one set bit (1, 2, 4, 8, 16, ...), and x & (x − 1) clears that one bit, leaving 0 — so x is a power of two, for positive x, exactly when x & (x − 1) == 0. Check x = 16 (00010000): x − 1 = 15 (00001111), and 00010000 & 00001111 = 0, confirming 16 is a power of two. Check x = 12 (00001100), which has two set bits: x − 1 = 11 (00001011), and 00001100 & 00001011 = 00001000, which is not 0, correctly reporting 12 as not a power of two.

Shifting also carries the same signed-versus-unsigned split as division. Left-shifting, x << k, always fills the vacated low bits with 0 and is equivalent to multiplying x by 2^k, for both signed and unsigned x, provided the result does not overflow the type. Right-shifting a signed negative value is implementation-defined by the standard, but on essentially every real machine it performs an arithmetic shift, filling the vacated high bits with copies of the original sign bit, so it behaves like floor division by 2^k — (−20) >> 2 gives −5, matching floor(−20/4) = −5. Right-shifting an unsigned value always performs a logical shift, filling vacated high bits with 0 regardless of what the original top bit was, which is why casting the same bit pattern to unsigned before shifting can produce a dramatically different, always-nonnegative result compared to shifting it as signed.

GATE TRAP: The same bit pattern, right-shifted, can give two very different answers depending on whether the type is signed (arithmetic shift, sign-extends) or unsigned (logical shift, zero-fills) — always check the declared type of the operand being shifted before assuming which fill rule applies, and note that this only applies to right shifts; left shifts fill with 0 for both.

FLOATING POINT

Floating-point types store an approximation of a real number, not the number itself, using a fixed number of bits split into three fields, in the scheme called IEEE 754: a sign bit, an exponent field, and a mantissa (fraction) field. A single-precision float uses 1 sign bit, 8 exponent bits and 23 mantissa bits, for 32 bits total; a double uses 1, 11 and 52, for 64 bits total.

1. The sign bit is 0 for a non-negative number, 1 for negative — exactly like a label, contributing no magnitude.
2. The exponent field stores the power of two the number is scaled by, offset by a fixed bias (127 for single precision) so that the stored field, which is itself unsigned, can represent both positive and negative true exponents.
3. The mantissa stores the fractional part of the number written in the form 1.fraction × 2^exponent — the leading 1 before the binary point is not stored at all, because normalised binary scientific notation always has exactly one implicit leading 1, so those bits are free to hold more precision instead.

The consequence worth internalising is this: only numbers that are exact sums of powers of two — 0.5, 0.25, 0.125, and combinations of them — have an exact finite binary representation. 0.1 in binary is a repeating fraction, 0.0001100110011..., forever, exactly the way 1/3 is a repeating decimal in base 10. Stored in a fixed number of mantissa bits, it must be rounded to the nearest representable value, which is close to but not exactly 0.1. The same is true of 0.2. When 0.1 and 0.2 — each already a rounded approximation — are added, the result is the correctly rounded sum of those two approximations, which is a value extremely close to 0.3 but not bit-for-bit identical to the separately rounded approximation of 0.3 itself, so 0.1 + 0.2 == 0.3 evaluates to false in C, printing as a tiny, visible discrepancy if you print enough decimal digits.

REMEMBER: Never compare floating-point values for exact equality with ==; the accumulated rounding from any arithmetic on binary approximations of decimal fractions makes bit-for-bit equality unreliable even when two expressions are mathematically equal. Instead compare fabs(a − b) < epsilon for some small tolerance epsilon appropriate to the precision in use — this checks that the two values are close enough to count as equal for the computation's purpose, rather than demanding an exact match that floating-point arithmetic cannot reliably deliver.

CHARACTERS AND ASCII

A char is stored as a small integer, and the specific integer each printable character maps to is fixed by the ASCII standard, which any problem involving characters assumes without restating. A handful of these values are worth having memorised outright because arithmetic on characters is arithmetic on these numbers directly: 'A' is 65, and the uppercase letters run consecutively from there, so 'A' + 1 is 66, which is 'B'. 'a' is 97, and the lowercase letters likewise run consecutively from there. '0' is 48, and the digit characters '0' through '9' run consecutively as 48 through 57.

Because the digit characters are consecutive starting at 48, the idiom c − '0' converts a character digit into the integer it represents: if c holds '7' (the integer 55), c − '0' computes 55 − 48 = 7, the actual numeric value seven, not the character. This is how a digit typed as text is turned into a number to compute with, and it works precisely because both '0' and c are, underneath, just integers being subtracted.

The gap of exactly 32 between an uppercase letter and its lowercase counterpart (65 for 'A' versus 97 for 'a') is likewise not a coincidence to memorise separately — it is the reason c + 32 converts an uppercase ASCII letter to lowercase and c − 32 converts lowercase to uppercase, by shifting straight to the other block of 26 consecutive codes.

Trace char c = 'C'; int d = c - 'A'; printf("%d %c", d, 'a' + d);. 'C' is 67, 'A' is 65 (both promoted to int for the subtraction, per the promotion rule from earlier in this chapter), so d = 67 − 65 = 2. 'a' is 97, and 97 + 2 = 99, which is the ASCII code for 'c'. Printed with %d and %c respectively: "2 c" — the numeric position of C within the alphabet (0-indexed from A), and the corresponding lowercase letter reached by applying that same offset from 'a'.

UNDEFINED, IMPLEMENTATION-DEFINED AND UNSPECIFIED BEHAVIOUR

C's standard deliberately leaves three different kinds of gaps in what it guarantees, and this chapter has already met an example of each — telling them apart precisely matters because the correct answer to "what does this print" is sometimes "there is no fixed answer" rather than a number.

Undefined behaviour means the standard imposes no requirement whatsoever on the program's behaviour once it happens — not merely "unpredictable value", but genuinely anything, including a crash, or (in principle) a compiler optimising the surrounding code on the assumption that the undefined case never occurs. Signed integer overflow, dereferencing a NULL or dangling pointer, accessing an array out of bounds, dividing by zero, and modifying a variable twice with no sequence point between the modifications are all undefined behaviour. The honest convention for these is to give the answer "undefined behaviour" itself when nothing more is stated, or, when a numeric answer is still expected, to state explicitly what assumption to make (such as "on two's-complement hardware").

Implementation-defined behaviour means the standard requires the implementation to behave consistently one particular way, and to document which way — but different compilers or platforms are allowed to pick different answers, and the standard does not say which one is right. The exact size of int, whether plain char is signed or unsigned, and the direction of a right shift on a negative signed value are all implementation-defined: each compiler must behave the same way every time, and must document its choice, but that choice is not fixed language-wide. A well-posed problem resolves this ambiguity by stating its assumption (the 32-bit convention, or "assume signed char") whenever the answer depends on it.

Unspecified behaviour sits between the two: the standard allows more than one possible behaviour and does not require the implementation to document which one it picked, but every possibility the standard allows is at least individually well-defined and safe — nothing is genuinely "anything can happen". The order in which a function's arguments are evaluated is the standard example: a compiler may evaluate them left to right, right to left, or in any other order, and different calls in the same program might even use different orders, but whichever order is chosen, each individual argument is still evaluated exactly once, safely, to a definite value.

KEY: Undefined behaviour promises nothing at all, not even a documented answer. Implementation-defined behaviour promises a fixed, documented answer, but different platforms may document different answers. Unspecified behaviour promises the computation is safe and every value is individually well defined, but does not commit to which of several allowed choices actually happened. When a question depends on any of these, look for a stated assumption before computing a specific number, and answer "undefined" honestly when none is given and the code genuinely depends on it.

WORKED PROBLEMS

Each of these traces every variable after every statement — do not skip a step, and do not accept a final answer that was not built this way.

1. What does this print? int a = 4, b = 2, c; c = a++ + ++b * 2; printf("%d %d %d", a, b, c);
   a++ is postfix: its value in the addition is the old a, 4, and afterward a becomes 5. ++b is prefix: b becomes 3 first, and 3 is its value. Multiplication binds tighter than addition, so ++b * 2 is grouped first: 3 * 2 = 6. Now the addition: 4 + 6 = 10, so c = 10. Neither sub-expression here writes to a variable the other one also touches, so the unspecified order in which the two operands of + are evaluated does not change the result. Final state: a = 5, b = 3, c = 10. Output: "5 3 10".

2. Given #define DOUBLE(x) x+x, what is the value of y after int y = 3 * DOUBLE(4+1);?
   Textual substitution replaces every x in x+x with the literal argument text 4+1, giving 4+1+4+1, so the statement expands to int y = 3 * 4+1+4+1;. Apply ordinary precedence to the expanded text: * binds tighter than +, so 3 * 4 groups first, giving 12; the remaining additions then run left to right: 12 + 1 = 13, 13 + 4 = 17, 17 + 1 = 18. So y = 18 — not the 30 that the macro's name and the intended (2 × 5) × 3 would suggest, because the macro was never parenthesised.

3. A function is defined as int next(void) { static int n = 100; n += 10; return n; } and called three times inside a loop as for (i = 0; i < 3; i++) printf("%d ", next());. What is printed?
   n has static storage duration, so it is allocated once and initialised to 100 exactly once, before the first call; it is the same memory on every call, not recreated. Call 1: n = 100 + 10 = 110, returns 110. Call 2: n retains 110 from before, n = 110 + 10 = 120, returns 120. Call 3: n retains 120, n = 120 + 10 = 130, returns 130. Output: "110 120 130 ".

4. What does this print? int a = -1; unsigned int b = 1; if (a < b) printf("less"); else printf("not less");
   a and b have different types in the comparison, so the usual arithmetic conversions apply: since one operand is unsigned int, the signed int operand is converted to unsigned int by reinterpreting its bit pattern, not by any notion of its mathematical value. −1 in 32-bit two's complement is the all-ones bit pattern, which read as unsigned is 4294967295. The comparison actually performed is 4294967295 < 1, which is false. Output: "not less" — the opposite of what comparing the mathematical values −1 and 1 would suggest.

5. Trace this loop to find the final value of count. int x = 44, count = 0; while (x) { x = x & (x - 1); count++; }
   44 in binary is 00101100. Iteration 1: x − 1 = 00101011 (43); x & (x−1) = 00101100 & 00101011 = 00101000 (40); count = 1. Iteration 2: x − 1 = 00100111 (39); x & (x−1) = 00101000 & 00100111 = 00100000 (32); count = 2. Iteration 3: x − 1 = 00011111 (31); x & (x−1) = 00100000 & 00011111 = 00000000 (0); count = 3. Now x is 0, the loop condition fails, and the loop ends. Final count = 3, which is exactly the number of 1-bits in 44 (its 32, 8 and 4 place values) — this loop is the standard population-count idiom, and it runs once per set bit, not once per bit position.

6. What is printed? int m = 3; switch (m % 3) { case 0: printf("Z"); case 1: printf("A"); break; case 2: printf("B"); default: printf("D"); }
   m % 3 = 3 % 3 = 0, matching case 0. Control jumps there directly, skipping nothing before it since it is the first label. printf("Z") runs. There is no break after case 0, so execution falls through into case 1's statements: printf("A") runs. case 1 does have a break, so the switch ends there — case 2 and default are never reached at all. Output: "ZA".

7. What is printed? char c = 'C'; int d = c - 'A'; printf("%d %c", d, 'a' + d);
   'C' is ASCII 67 and 'A' is ASCII 65; both are promoted to int for the subtraction, giving d = 67 − 65 = 2. 'a' is ASCII 97, and 97 + 2 = 99, which is the ASCII code for 'c'. Output: "2 c".

8. What does this print? printf("%d %d", -7 / 2, -7 % 2);
   Integer division truncates toward zero, not toward negative infinity: −7 / 2 is mathematically −3.5, and chopping the fractional part (moving toward zero, not down) gives −3. The identity (a/b)*b + a%b == a then fixes the remainder: (−3) × 2 + r = −7, so −6 + r = −7, so r = −1 — the remainder's sign matches the dividend's sign, not the divisor's. Output: "-3 -1".

9. What does this print? int x = 6; if (x & 1 == 0) printf("even"); else printf("odd");
   == (band 7) has higher precedence than & (band 8), so the expression groups as x & (1 == 0), not (x & 1) == 0 as the code intends to test. 1 == 0 evaluates to 0 (false), so the whole condition becomes x & 0, which is 0 for every value of x, including the actually-even x = 6 used here. Since the condition is false, the else branch runs. Output: "odd" — a wrong answer for whether 6 is even, produced silently, with no compiler warning, purely because the bitwise operator was left unparenthesised next to a comparison.

WHAT THE NEXT TOPIC BUILDS ON

Everything in this chapter — types and their sizes, the exact meaning of each operator, storage classes tied to the same four memory regions used to explain lifetime — is the fixed vocabulary that every remaining topic in this course assumes without re-explaining. Pointers take the address-of and dereference operators from the precedence table here and build an entire chapter on what an address is and how arithmetic on it works. Recursion is nothing more than the function-call mechanism here — a fresh stack frame per call, parameters passed by value — applied to a function that calls itself, so the stack-overflow trap named in this chapter is the same failure recursion produces when it never reaches its base case. Arrays and structures are new ways of laying out memory that still obey the same storage-class and scope rules derived here. If a later trace ever goes wrong, the fix is almost always to come back to this chapter's habit: build the variable table, and update it one statement at a time, exactly as done in every worked problem above.
`
};
