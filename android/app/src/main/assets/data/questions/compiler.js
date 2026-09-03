window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['compiler'] = {
  subject: 'Compiler Design',
  topics: [
    {
      id: 'compiler-lexical',
      name: 'Lexical Analysis',
      theory: {
        intro: 'Lexical analysis is the first phase of a compiler. The lexical analyzer (scanner) reads the source program as a stream of characters and groups them into meaningful units called lexemes, emitting a stream of tokens to the parser. Understanding this phase means understanding three distinct ideas: the token (an abstract symbol class such as identifier or relational operator), the lexeme (the actual character string matched), and the pattern (the rule, usually a regular expression, that describes which lexemes belong to a token class). GATE loves this topic because it mixes conceptual questions (what can and cannot be done during scanning) with mechanical ones (count the tokens in a C statement using the maximal munch rule). It also anchors the bigger picture of compiler phases: which phase does what, what each phase consumes and produces, and where the symbol table and error handler fit in.',
        core: 'A compiler is conventionally split into analysis (front end) and synthesis (back end). The classic phase order is: lexical analysis, syntax analysis, semantic analysis, intermediate code generation, code optimization, and target code generation, with the symbol table manager and error handler interacting with every phase. The front end is largely source-language dependent and machine independent; the final code generation phase is machine dependent.\n\nThe lexical analyzer performs several jobs beyond tokenization:\n\n• It strips comments and whitespace so later phases never see them.\n• It correlates error messages with line numbers by counting newline characters.\n• It may expand macros in some implementations.\n• It enters identifiers into the symbol table and returns a token plus an attribute (for example a pointer to the symbol table entry, or the numeric value of a constant).\n\nTokens, lexemes and patterns must be kept straight. For the statement count = count + 1; the lexeme "count" matches the pattern for the token id. Keywords, identifiers, constants, string literals, operators and punctuation symbols are all tokens. A single token class such as id can have many lexemes, while a keyword token usually has exactly one lexeme.\n\nPatterns are specified with regular expressions and recognized with finite automata. In practice a tool such as lex converts the regular expressions into an NFA, then into a DFA (or simulates the NFA) that drives the scanner. Because regular languages cannot count unbounded nesting, a scanner cannot check balanced parentheses, matching begin-end pairs, or declaration before use; those tasks belong to the parser and the semantic analyzer. The only errors a scanner itself can report are lexical errors: a character sequence that matches no pattern at all, such as a stray @ in most languages or an ill-formed number.\n\nTokenization uses two disambiguation rules. First, maximal munch (longest match): at each step the scanner consumes the longest prefix of the remaining input that matches some pattern. This is why "intx" is a single identifier rather than the keyword int followed by x, and why a---b is scanned as a, --, -, b. Second, when two patterns match the same longest lexeme, the rule listed first wins; this is how keywords beat the identifier pattern in lex-style tools.\n\nArchitecturally, the scanner is usually a subroutine of the parser: the parser calls getNextToken() on demand rather than the scanner producing the whole token stream in advance. Separating lexing from parsing simplifies both (regular machinery for lexing, context-free machinery for parsing), improves efficiency through specialized buffering techniques such as two-buffer schemes with sentinels, and improves portability of the compiler.\n\nFor token counting questions, remember that a string literal is one token no matter what it contains, each punctuation symbol and operator is its own token, and compound operators such as >>=, ++, <= are single tokens by maximal munch. Comments and whitespace contribute zero tokens.',
        strategy: 'GATE asks two reliable question styles here. Style one is token counting on a C fragment. Work strictly left to right applying maximal munch, and remember the traps: an entire string literal including embedded % formats and spaces is one token; >>= is one token, not three; a---b gives five tokens including the semicolon-free four symbol split a, --, -, b; whitespace and comments count for nothing. Write the token list out explicitly rather than counting in your head.\n\nStyle two is conceptual phase placement. Memorize a mapping: illegal character to lexical error; unbalanced parentheses or misplaced semicolon to syntax error; undeclared variable or type mismatch to semantic error. Also memorize what the scanner does as side work: removing comments, tracking line numbers, creating symbol table entries for identifiers.\n\nWorked mini-example: count the tokens in printf("x=%d", x);. Scan: printf (identifier, 1), ( (2), "x=%d" (one string literal token, 3), , (4), x (5), ) (6), ; (7). Answer: 7 tokens. Notice that %d inside the string never becomes a separate token.\n\nFinally, expect one mark questions on why lexing is a separate phase (simplicity, efficiency, portability) and on the regular versus context-free boundary: anything requiring unbounded counting or matching cannot be done by the scanner. If an option claims the scanner detects undeclared identifiers or checks nesting, it is wrong.'
      },
      questions: [
        {
          id: 'compiler-lexical-q1',
          q: 'What is the output of the lexical analysis phase of a compiler?',
          options: ['A parse tree', 'A stream of tokens', 'Three-address code', 'A symbol table only'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The lexical analyzer reads the raw character stream of the source program and groups characters into lexemes, emitting one token per lexeme. The sequence of tokens is handed to the syntax analyzer, which builds the parse tree. So the parse tree is the output of parsing, not scanning. Three-address code is produced much later by the intermediate code generator. The symbol table is a shared data structure that the scanner contributes to (it enters identifiers), but it is not "the output" of the phase; the defining output is the token stream. Hence option 2 is correct.'
        },
        {
          id: 'compiler-lexical-q2',
          q: 'In compiler terminology, a lexeme is best described as:',
          options: ['The rule describing the strings of a token class', 'The abstract symbol class such as id or num', 'The actual sequence of characters in the source that matches the pattern for a token', 'The attribute value stored in the symbol table'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Three related terms must be separated. The pattern is the rule, typically a regular expression, that describes which character strings are legal for a token class; that is option 1. The token is the abstract class name, such as id, num, or relop; that is option 2. The lexeme is the concrete character string in the program text that the scanner actually matched against the pattern, for example the string "count" matching the identifier pattern. Attribute values (option 4) are extra information attached to a token, like a symbol table pointer. Therefore the correct description of a lexeme is option 3.'
        },
        {
          id: 'compiler-lexical-q3',
          q: 'Patterns for tokens in a lexical analyzer are most commonly specified using:',
          options: ['Context-free grammars', 'Regular expressions', 'Attribute grammars', 'Pushdown automata'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Token classes such as identifiers, numbers and operators form regular languages, so their patterns are written as regular expressions. Scanner generators like lex take these regular expressions, build an NFA by Thompson construction, convert it to a DFA (or simulate the NFA), and use that automaton to recognize lexemes. Context-free grammars and pushdown automata are the machinery of the parsing phase, which needs to handle nested structure that regular languages cannot express. Attribute grammars belong to semantic analysis and syntax-directed translation. Hence regular expressions, option 2, is correct.'
        },
        {
          id: 'compiler-lexical-q4',
          q: 'Which of the following is the correct order of compiler phases?',
          options: ['Syntax analysis, lexical analysis, semantic analysis, code generation', 'Lexical analysis, syntax analysis, semantic analysis, intermediate code generation, optimization, code generation', 'Lexical analysis, semantic analysis, syntax analysis, optimization, code generation', 'Semantic analysis, lexical analysis, syntax analysis, intermediate code generation'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The standard pipeline is: (1) lexical analysis converts characters to tokens; (2) syntax analysis parses tokens into a parse tree; (3) semantic analysis checks types and other context-sensitive rules on that tree; (4) intermediate code generation emits a machine-independent form such as three-address code; (5) machine-independent code optimization improves it; (6) target code generation produces assembly or machine code. Semantics cannot be checked before the structure is known, and structure cannot be parsed before tokens exist, which eliminates the other orderings. The symbol table and error handler run alongside all phases. Option 2 lists exactly this order.'
        },
        {
          id: 'compiler-lexical-q5',
          q: 'How many tokens does a C lexical analyzer produce for the statement: printf("sum=%d", s);',
          options: ['6', '7', '9', '11'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Scan left to right: (1) printf is an identifier token; (2) ( is a punctuation token; (3) "sum=%d" is a single string-literal token — everything between the quotes, including sum, = and %d, stays inside one token; (4) , is a token; (5) s is an identifier; (6) ) is a token; (7) ; is a token. Total = 7. The classic trap is to split the format string into pieces or to count %d separately; the scanner never looks inside a string literal. Hence the answer is 7.'
        },
        {
          id: 'compiler-lexical-q6',
          q: 'How many tokens are generated for the C statement: int y = x + 3 * z;',
          options: ['7', '8', '9', '10'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'List the lexemes in order: int (keyword, 1), y (identifier, 2), = (operator, 3), x (identifier, 4), + (operator, 5), 3 (integer constant, 6), * (operator, 7), z (identifier, 8), ; (punctuation, 9). Whitespace separates lexemes but produces no tokens. Every operator and the semicolon count individually, and the keyword int is one token. Total = 9, so option 3 is correct. A common slip is forgetting the semicolon or the assignment operator.'
        },
        {
          id: 'compiler-lexical-q7',
          q: 'Under the maximal munch (longest match) rule, the input characters "floatvalue" appearing in a C program are scanned as:',
          options: ['The keyword float followed by the identifier value', 'A single identifier floatvalue', 'A lexical error', 'Two identifiers float and value'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Maximal munch says the scanner always consumes the longest prefix of the remaining input that matches some token pattern. Starting at f, the identifier pattern [A-Za-z_][A-Za-z0-9_]* can match all ten characters of floatvalue, which is longer than the five characters that would match the keyword float. Therefore the whole string is one identifier token. Keywords are only recognized when the maximal lexeme exactly equals the keyword spelling. There is no error because the identifier pattern matches legally. This is why languages need a delimiter (space or operator) between a keyword and a following identifier.'
        },
        {
          id: 'compiler-lexical-q8',
          q: 'How many tokens does a C scanner produce for the input: a---b;',
          options: ['4', '5', '6', '3'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Apply maximal munch at each position. (1) a is an identifier. (2) At the first -, the scanner tries the longest operator: --- is not an operator, but -- is, so it emits the decrement token --. (3) The next character is a single -, and since -b starts a new context the scanner emits the minus token -. (4) b is an identifier. (5) ; is a token. The token stream is a, --, -, b, ; giving 5 tokens. Note that the parser will later reject a-- -b = ... style issues only if the grammar disallows them; lexically this is perfectly valid. The trap answers come from splitting into three single minus tokens (6) or grouping wrongly.'
        },
        {
          id: 'compiler-lexical-q9',
          q: 'Which of the following errors can be detected by the lexical analyzer itself?',
          options: ['Use of an undeclared variable', 'Unbalanced parentheses in an expression', 'Presence of an illegal character such as @ in an identifier', 'Type mismatch in an assignment'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The scanner only knows regular patterns over characters; it has no notion of structure or declarations. A character sequence that matches no token pattern, such as a stray @ where an identifier is being formed in a language that forbids it, is a lexical error and is caught here. Unbalanced parentheses require counting nested structure, which needs a context-free parser, so that is a syntax error. Undeclared variables and type mismatches require symbol table and type information, so they are semantic errors. Hence only option 3 is a lexical error.'
        },
        {
          id: 'compiler-lexical-q10',
          q: 'Which phase of the compiler is responsible for removing comments and consecutive whitespace from the source program?',
          options: ['Syntax analysis', 'Lexical analysis', 'Semantic analysis', 'Code optimization'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Stripping comments and collapsing whitespace is a side duty of the lexical analyzer. As the scanner reads the character stream it recognizes comment patterns and whitespace, discards them, and emits tokens only for meaningful lexemes; the parser therefore never sees a comment. Doing this in the scanner keeps the grammar of the language clean — otherwise every grammar rule would need to allow comments between any two symbols. The scanner also counts newlines here so later error messages can report line numbers. Option 2 is correct.'
        },
        {
          id: 'compiler-lexical-q11',
          q: 'How many tokens does a C scanner produce for the input: x>>=y>>2;',
          options: ['5', '6', '7', '8'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Scan with maximal munch. (1) x is an identifier. (2) At the first >, the scanner looks for the longest operator: >>= (shift-right-assign) is a valid C operator and is longer than >> or >, so >>= is one token. (3) y is an identifier. (4) At the next >, the longest match is >> (right shift), since >>2 is not an operator; >> is one token. (5) 2 is an integer constant. (6) ; is a token. Stream: x, >>=, y, >>, 2, ; = 6 tokens. Counting >>= as three tokens (giving 8) or >> as two (giving 7) are the standard traps.'
        },
        {
          id: 'compiler-lexical-q12',
          q: 'A lexical analyzer is typically implemented using which computational model?',
          options: ['Deterministic finite automaton', 'Pushdown automaton', 'Turing machine', 'Linear bounded automaton'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Token patterns are regular expressions, and the recognizer for a regular language is a finite automaton. Scanner generators convert the union of all token patterns into an NFA and then into a DFA whose transitions drive the scanning loop; the DFA form is preferred because each input character is processed in constant time with no backtracking between states. A pushdown automaton is the model for context-free parsing, and Turing machines or LBAs are far more power than tokenization needs. Hence a DFA, option 1, is the correct model.'
        },
        {
          id: 'compiler-lexical-q13',
          q: 'Which of the following tasks is impossible for the lexical analyzer, no matter how it is written, because token patterns are regular?',
          options: ['Recognizing the longest matching prefix of the input', 'Distinguishing keywords from identifiers', 'Verifying that parentheses in an expression are properly nested to arbitrary depth', 'Recognizing floating point constants such as 3.14e-2'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'A finite automaton has a fixed, finite number of states, so it cannot count unboundedly. Checking that parentheses nest correctly to arbitrary depth requires remembering how many are currently open, which needs a stack — the language of balanced parentheses is context-free but not regular (pumping lemma). Hence option 3 cannot be done during scanning and is left to the parser. The other tasks are all regular: longest-prefix matching is exactly how DFA-based scanning works; keywords are distinguished either by separate patterns with priority or a table lookup after matching the identifier pattern; and floating point constants like 3.14e-2 are described by a simple regular expression digit+(.digit+)?((e|E)(+|-)?digit+)?.'
        },
        {
          id: 'compiler-lexical-q14',
          q: 'In a typical compiler organization, how do the lexical analyzer and the parser interact?',
          options: ['The scanner produces the complete token list for the whole file before parsing begins, always', 'The parser calls the scanner to supply the next token on demand', 'The scanner calls the parser after every token', 'They run as independent passes with no communication'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'In the standard organization the parser is the driver: whenever it needs another input symbol it calls a routine such as getNextToken(), and the scanner reads just enough characters to return one token together with its attribute. This demand-driven design avoids materializing the whole token stream in memory and lets the scanner and parser share context easily (for example lexical feedback tricks). Option 1 describes a possible but non-typical batch design and the word "always" makes it wrong. Option 3 inverts the control relationship, and option 4 is false because the token stream itself is the communication channel. Option 2 is correct.'
        }
      ]
    },
    {
      id: 'compiler-parsing',
      name: 'Parsing',
      theory: {
        intro: 'Parsing (syntax analysis) checks that the token stream conforms to a context-free grammar and recovers the derivation, usually as a parse tree. GATE tests two families of parsers. Top-down (LL) parsers build the tree from the root, tracing a leftmost derivation; the workhorse is the predictive LL(1) parser driven by a table built from FIRST and FOLLOW sets. Bottom-up (LR) parsers build from the leaves, tracing a rightmost derivation in reverse using shift and reduce moves; the family runs LR(0), SLR(1), LALR(1), CLR(1) in increasing power. Almost every GATE compiler paper contains at least one question from this topic: computing a FIRST or FOLLOW set, deciding whether a grammar is LL(1), counting states or spotting conflicts in an LR automaton, or ordering the grammar classes. The computations are entirely mechanical, so this is the highest return-on-practice topic in compilers.',
        core: 'FIRST and FOLLOW. FIRST(X) is the set of terminals that can begin a string derived from X, plus epsilon if X can derive the empty string. Compute it bottom-up: for A -> Y1 Y2 ... Yk, add FIRST(Y1) minus epsilon; if Y1 is nullable continue into Y2, and so on; add epsilon only if every Yi is nullable. FOLLOW(A) is the set of terminals that can appear immediately after A in some sentential form. Rules: put $ in FOLLOW(start symbol); for a production B -> alpha A beta, add FIRST(beta) minus epsilon to FOLLOW(A); if beta is nullable (or absent), add FOLLOW(B) to FOLLOW(A). Iterate until nothing changes. Epsilon never appears in a FOLLOW set.\n\nLL(1) parsing. For each production A -> alpha, place it in table cell M[A, a] for every a in FIRST(alpha); if alpha is nullable, also place it in M[A, b] for every b in FOLLOW(A) (including $). The grammar is LL(1) iff no cell receives two productions. Consequences worth memorizing:\n\n• A left-recursive grammar is never LL(1); eliminate A -> A alpha | beta by rewriting to A -> beta A2, A2 -> alpha A2 | epsilon.\n• Two alternatives with a common prefix defeat prediction; left-factor A -> a b | a c into A -> a A2, A2 -> b | c.\n• An ambiguous grammar is never LL(1) and never LR(k) for any k.\n\nLR parsing. An LR parser keeps a stack of states and repeatedly shifts input symbols or reduces by a production when a handle is on top. LR(0) items are productions with a dot marking progress; the canonical collection of item sets, built with closure and goto, is the parser automaton. The four table constructions differ only in when they allow a reduction: LR(0) reduces by a completed item in every column; SLR(1) reduces A -> alpha only on symbols in FOLLOW(A); CLR(1) (canonical LR(1)) carries a precise lookahead in each item and reduces only on that lookahead; LALR(1) merges CLR(1) states having the same core, shrinking the table to LR(0) size. A shift-reduce conflict is a state offering both a shift and a reduce on the same symbol; a reduce-reduce conflict offers two different reductions. Merging states to form LALR(1) can create reduce-reduce conflicts but never a new shift-reduce conflict.\n\nThe strict hierarchy of grammar classes is LR(0) subset SLR(1) subset LALR(1) subset CLR(1), and every one of these grammars is unambiguous. LL(1) is incomparable with the larger LR classes in general but every LL(1) grammar is LALR(1)-parsable in the classical results quoted by GATE as: every LL(1) grammar is also LR(1).\n\nOperationally remember: number of LR(0)/SLR/LALR states is the same for a given grammar (LALR merges CLR states down to the LR(0) count); CLR may have many more. Recursive descent and predictive parsers are top-down; operator precedence, SLR, LALR, CLR are bottom-up.',
        strategy: 'Three question archetypes dominate. First, FIRST/FOLLOW computation: always process nullability first (find every nullable nonterminal), then FIRST sets bottom-up, then FOLLOW sets with repeated passes until stable. The trap is forgetting that when beta is nullable in B -> alpha A beta, FOLLOW(A) also receives FOLLOW(B), and that $ belongs to FOLLOW of the start symbol.\n\nSecond, LL(1) membership: do not build the whole table under time pressure; just check, for each nonterminal, that the FIRST sets of its alternatives are pairwise disjoint, and if some alternative is nullable, that FIRST of the others is disjoint from FOLLOW of the nonterminal. Spot instant disqualifiers: left recursion, common prefixes, ambiguity.\n\nThird, LR questions: for state counting, actually draw the item sets — closure then goto on every symbol — and remember that shift-reduce conflicts in SLR are resolved by checking whether the shifted terminal lies in FOLLOW of the reducing nonterminal.\n\nWorked mini-example: G: S -> a S b | epsilon. FIRST(S) = {a, epsilon}. FOLLOW(S): S is the start symbol so $ enters; from S -> a S b, FIRST(b) = {b} enters FOLLOW(S). So FOLLOW(S) = {b, $}. Table: M[S, a] = S -> aSb; M[S, b] = M[S, $] = S -> epsilon. No cell has two entries, so G is LL(1). Practicing this pipeline until it takes under two minutes is the single best preparation for the compiler section.'
      },
      questions: [
        {
          id: 'compiler-parsing-q1',
          q: 'A bottom-up (LR) parser recognizes the input by tracing out:',
          options: ['A leftmost derivation as it is', 'A rightmost derivation in reverse', 'A leftmost derivation in reverse', 'A rightmost derivation as it is'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Top-down parsers expand the leftmost nonterminal first, so an LL parse follows a leftmost derivation in forward order. A bottom-up parser does the opposite: it repeatedly finds a handle — the right side of the production used in the last step of a rightmost derivation — and reduces it to the nonterminal. Each reduction therefore undoes one step of the rightmost derivation, and the whole parse replays that derivation backwards, from the sentence up to the start symbol. Hence LR parsing traces a rightmost derivation in reverse, option 2. This is also why L and R in the name LR stand for left-to-right scanning and rightmost derivation.'
        },
        {
          id: 'compiler-parsing-q2',
          q: 'Why must left recursion be removed from a grammar before writing a recursive descent parser for it?',
          options: ['Left recursion makes the grammar ambiguous', 'The parser would enter an infinite loop, calling the same procedure without consuming input', 'Left recursion makes the language non context-free', 'FOLLOW sets cannot be computed for left-recursive grammars'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'In a recursive descent parser each nonterminal becomes a procedure. For a production A -> A alpha, the procedure for A begins by calling itself on the very same input position, since no token is consumed before the recursive reference. The recursion therefore never bottoms out and the parser loops forever. This is a property of the parsing method, not the language: left recursion does not by itself cause ambiguity (option 1), the language stays context-free (option 3), and FIRST/FOLLOW sets are still computable (option 4). The standard cure rewrites A -> A alpha | beta as A -> beta A2 with A2 -> alpha A2 | epsilon, converting left recursion into right recursion.'
        },
        {
          id: 'compiler-parsing-q3',
          q: 'After eliminating left recursion from E -> E + T | T, the resulting grammar is:',
          options: ['E -> T E2, E2 -> + T E2 | epsilon', 'E -> E2 T, E2 -> E2 + T | epsilon', 'E -> T + E | T', 'E -> + T E2, E2 -> T E2 | epsilon'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'application',
          explanation: 'The template: for A -> A alpha | beta, produce A -> beta A2 and A2 -> alpha A2 | epsilon. Here A = E, alpha = + T (what follows the recursive E), and beta = T (the non-recursive alternative). Substituting gives E -> T E2 and E2 -> + T E2 | epsilon, which is option 1. Check: E derives T, T+T, T+T+T, ... exactly as before, and the grammar is now right-recursive so a predictive parser can use it. Option 3 changes associativity structure and remains problematic for LL(1) due to the common prefix T; option 2 is still left-recursive in E2; option 4 generates strings beginning with + which the original never does.'
        },
        {
          id: 'compiler-parsing-q4',
          q: 'For the grammar S -> A B C, A -> a | epsilon, B -> b | epsilon, C -> c, what is FIRST(S)?',
          options: ['{a}', '{a, b}', '{a, b, c}', '{a, b, c, epsilon}'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'FIRST(A) = {a, epsilon}, FIRST(B) = {b, epsilon}, FIRST(C) = {c}. For S -> A B C, start with FIRST(A) minus epsilon, giving {a}. Because A is nullable, also include FIRST(B) minus epsilon, adding b. Because B is also nullable, continue into C and add FIRST(C) = {c}. C is not nullable, so we stop and epsilon is NOT added to FIRST(S). Result: FIRST(S) = {a, b, c}, option 3. Option 4 is the trap: epsilon would enter only if every symbol A, B and C were nullable, but C always produces c, so S can never derive the empty string.'
        },
        {
          id: 'compiler-parsing-q5',
          q: 'For the same grammar S -> A B C, A -> a | epsilon, B -> b | epsilon, C -> c, what is FOLLOW(A)?',
          options: ['{b}', '{b, c}', '{c}', '{b, c, $}'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A appears only in S -> A B C, so FOLLOW(A) gets FIRST(BC). Compute FIRST(BC): take FIRST(B) minus epsilon, giving {b}; since B is nullable, also add FIRST(C) = {c}; C is not nullable, so FIRST(BC) = {b, c} and BC is not nullable. Because BC cannot vanish entirely, FOLLOW(S) is not copied into FOLLOW(A), so $ does not enter. FOLLOW(A) = {b, c}, option 2. The trap in option 4 is adding $ — that would require everything after A to be nullable, but C always yields c. Option 1 forgets that B can be erased, letting c directly follow A as in the sentence "ac".'
        },
        {
          id: 'compiler-parsing-q6',
          q: 'In the standard expression grammar E -> T E2, E2 -> + T E2 | epsilon, T -> F T2, T2 -> * F T2 | epsilon, F -> ( E ) | id, what is FOLLOW(T)?',
          options: ['{+, $}', '{+, ), $}', '{*, +, ), $}', '{), $}'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'T occurs in E -> T E2 and in E2 -> + T E2. In both, T is followed by E2, so FOLLOW(T) receives FIRST(E2) minus epsilon = {+}. Since E2 is nullable, FOLLOW(T) also receives FOLLOW(E) and FOLLOW(E2). FOLLOW(E): E is the start symbol so $ enters, and F -> ( E ) contributes ), giving FOLLOW(E) = {), $}. FOLLOW(E2) = FOLLOW(E) = {), $} because E2 ends both productions it appears in. Union: FOLLOW(T) = {+} together with {), $} = {+, ), $}, option 2. The symbol * belongs to FOLLOW(F), not FOLLOW(T) — that is the trap in option 3.'
        },
        {
          id: 'compiler-parsing-q7',
          q: 'For the grammar S -> a S b | epsilon over terminals {a, b}, how many cells of the LL(1) parsing table (columns a, b, $) contain a production, and is the grammar LL(1)?',
          options: ['2 cells filled; the grammar is LL(1)', '3 cells filled; the grammar is LL(1)', '3 cells filled; the grammar is not LL(1)', '4 cells filled; the grammar is not LL(1)'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'application',
          explanation: 'FIRST(aSb) = {a}, so S -> aSb goes into M[S, a]. For the nullable alternative S -> epsilon, use FOLLOW(S). FOLLOW(S): $ enters since S is the start symbol; from S -> a S b, FIRST(b) = {b} enters. So FOLLOW(S) = {b, $}, and S -> epsilon goes into M[S, b] and M[S, $]. Filled cells: M[S,a], M[S,b], M[S,$] — exactly 3. No cell holds two productions, so the grammar is LL(1). Option 2 is correct. This grammar generates the non-regular language a^n b^n, a nice reminder that LL(1) grammars comfortably exceed regular languages.'
        },
        {
          id: 'compiler-parsing-q8',
          q: 'Consider G: S -> A c A d | B d B c, A -> epsilon, B -> epsilon. Which statement is true?',
          options: ['G is not LL(1) because both alternatives of S derive strings starting with epsilon-producing nonterminals', 'G is LL(1) because FIRST(AcAd) = {c} and FIRST(BdBc) = {d} are disjoint', 'G is ambiguous and hence not LL(1)', 'G is LL(1) only if we left-factor S first'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'application',
          explanation: 'Compute FIRST of each alternative of S. For A c A d: A is nullable, so skip past it and include FIRST(c) = {c}; c is a terminal so we stop: FIRST(AcAd) = {c}. Similarly FIRST(BdBc) = {d}. The two sets {c} and {d} are disjoint, neither alternative is nullable (each contains terminals), so the LL(1) condition for S holds. A and B each have a single production, trivially conflict-free: A -> epsilon fills row A under FOLLOW(A) = {c, d} and B -> epsilon fills row B under FOLLOW(B) = {c, d}, one production per cell. G generates exactly the two strings cd and dc, is unambiguous, and needs no left factoring (the alternatives share no common prefix — A and B are different symbols). Option 2 is correct; option 1 wrongly treats nullable prefixes as an automatic conflict.'
        },
        {
          id: 'compiler-parsing-q9',
          q: 'If a context-free grammar is ambiguous, then it is:',
          options: ['Possibly LL(1) but never LR(1)', 'Possibly LR(1) but never LL(1)', 'Never LL(k) and never LR(k) for any k', 'Always parsable by increasing the lookahead k sufficiently'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Every LL(k) and every LR(k) grammar is unambiguous. The reason: an LL or LR parser is deterministic — for each input string it commits to exactly one sequence of moves, hence one parse tree. An ambiguous grammar gives some string two distinct parse trees, so no amount of finite lookahead can make the choice deterministic; the conflict is inherent, not a lookahead shortage. Therefore ambiguity excludes membership in LL(k) and LR(k) for every k, option 3. Note the converse is false: unambiguous grammars exist that are not LR(k) for any k. Parser generators like yacc handle ambiguous grammars only by adding external disambiguation rules (precedence, associativity), which effectively changes the specification.'
        },
        {
          id: 'compiler-parsing-q10',
          q: 'Which of the following correctly orders the grammar classes from smallest to largest?',
          options: ['CLR(1) ⊂ LALR(1) ⊂ SLR(1) ⊂ LR(0)', 'LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1)', 'SLR(1) ⊂ LR(0) ⊂ CLR(1) ⊂ LALR(1)', 'LR(0) ⊂ LALR(1) ⊂ SLR(1) ⊂ CLR(1)'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The four constructions use progressively better lookahead information for deciding reductions. LR(0) allows a reduction everywhere in a state, so it is weakest. SLR(1) restricts reductions to symbols in FOLLOW of the left-hand side, resolving some LR(0) conflicts, so every LR(0) grammar is SLR(1). LALR(1) uses per-state lookahead sets obtained by merging canonical LR(1) states; these sets are subsets of FOLLOW, so every SLR(1) grammar is LALR(1). CLR(1) keeps the full unmerged LR(1) states with the most precise lookaheads, so every LALR(1) grammar is CLR(1). Each containment is strict — there are grammars separating every adjacent pair. Hence option 2.'
        },
        {
          id: 'compiler-parsing-q11',
          q: 'When canonical LR(1) states with identical cores are merged to build an LALR(1) parser, which of the following can happen?',
          options: ['A new shift-reduce conflict may be introduced', 'A new reduce-reduce conflict may be introduced', 'Both new shift-reduce and new reduce-reduce conflicts may be introduced', 'No new conflicts can ever be introduced'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Merging keeps the cores (the LR(0) items) identical and unions the lookahead sets. Shift actions depend only on the core: a state shifts on terminal a iff some item has the dot before a. Since merged states have the same cores, no merge creates a new shift possibility, and a reduce on a would conflict with a shift on a only if that conflict already existed in one of the original LR(1) states. However, reductions depend on lookaheads: state P may reduce A -> alpha on lookahead x and B -> beta on y, while state Q (same core) reduces A -> alpha on y and B -> beta on x. Individually conflict-free, but after merging the lookahead sets both reductions apply on both x and y — a reduce-reduce conflict. Hence only reduce-reduce conflicts can be newly introduced, option 2.'
        },
        {
          id: 'compiler-parsing-q12',
          q: 'For the grammar S -> B B, B -> b B | c, how many states does the LR(0) automaton (canonical collection of LR(0) item sets, with augmented start S2 -> S) have?',
          options: ['6', '7', '8', '10'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Build the collection. I0 = closure(S2 -> .S) = {S2 -> .S, S -> .BB, B -> .bB, B -> .c}. From I0: on S go to I1 = {S2 -> S.}; on B go to I2 = {S -> B.B, B -> .bB, B -> .c}; on b go to I3 = {B -> b.B, B -> .bB, B -> .c}; on c go to I4 = {B -> c.}. From I2: on B go to I5 = {S -> BB.}; on b go to I3 (existing); on c go to I4 (existing). From I3: on B go to I6 = {B -> bB.}; on b go to I3; on c go to I4. I1, I4, I5, I6 have no outgoing transitions on grammar symbols with dots before them. Distinct states: I0 through I6 = 7 states, option 2. The canonical LR(1) collection for this grammar has 10 states, which merge back to 7 in LALR(1) — a useful contrast to remember.'
        },
        {
          id: 'compiler-parsing-q13',
          q: 'Consider the grammar S -> L = R | R, L -> * R | id, R -> L. In the SLR(1) parser, the state containing the items {S -> L. = R, R -> L.} has a conflict. Why?',
          options: ['It is a reduce-reduce conflict because two completed items are present', 'It is a shift-reduce conflict because = is in FOLLOW(R), so the parser cannot decide between shifting = and reducing R -> L', 'The grammar is ambiguous, so every LR variant fails', 'FIRST(S) and FIRST(L) intersect, violating the SLR condition'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'application',
          explanation: 'In that state, item S -> L. = R asks to shift on =, and completed item R -> L. asks to reduce on every symbol in FOLLOW(R). Since S -> L = R and R -> L exist, L can be followed by =, and because R -> L, whatever follows L can follow R; concretely from S => L = R => * R = R, the R produced by L -> * R is followed by =, so = is in FOLLOW(R). SLR therefore sees both shift = and reduce R -> L on lookahead =, a shift-reduce conflict, option 2. There is only one completed item, so option 1 is wrong. The grammar is unambiguous and in fact LALR(1): canonical LR(1) items know that R -> L should be reduced on = only in right-side contexts, and the precise lookaheads exclude the spurious reduction. This is the classic proof that SLR(1) is strictly weaker than LALR(1).'
        },
        {
          id: 'compiler-parsing-q14',
          q: 'A shift-reduce conflict in an LR parsing table means:',
          options: ['Two different productions can be reduced in the same state on the same lookahead', 'In some state, on some lookahead symbol, the parser can either shift that symbol or reduce by a completed production', 'The grammar is left recursive', 'The stack may overflow during parsing'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'An LR table cell action[state, terminal] must hold exactly one action for the parser to be deterministic. A shift-reduce conflict is a cell that holds both a shift (some item A -> alpha . a beta wants to consume a) and a reduce (some completed item B -> gamma . is allowed to reduce on a). Option 1 describes a reduce-reduce conflict instead. Left recursion (option 3) is perfectly fine for LR parsers — indeed preferred, since it keeps the stack shallow. Stack overflow (option 4) is an implementation matter unrelated to table conflicts. The best known example is the dangling else: after "if E then S" with lookahead else, the parser may shift the else or reduce the if-statement; tools resolve it in favor of shifting, attaching the else to the nearest if.'
        },
        {
          id: 'compiler-parsing-q15',
          q: 'Left factoring the productions A -> x y | x z (where x, y, z are strings and x is the longest common prefix) yields:',
          options: ['A -> x A2, A2 -> y | z', 'A -> x | A2, A2 -> y z', 'A -> A2 x, A2 -> y | z', 'A -> x y A2, A2 -> z | epsilon'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'application',
          explanation: 'With two alternatives beginning with the same string x, an LL(1) parser cannot choose between them on one symbol of lookahead — both alternatives have overlapping FIRST sets. Left factoring defers the decision: first match the common prefix x, then decide between the differing tails. The transformation is A -> x A2 with A2 -> y | z, option 1. After matching x, the parser distinguishes y from z using their (hopefully disjoint) FIRST sets. Verify: A still derives exactly xy and xz. Option 3 puts the prefix after the choice, which changes the language; options 2 and 4 generate strings the original grammar never produced. Left factoring is necessary but not always sufficient for LL(1) — the tails may still conflict.'
        }
      ]
    },
    {
      id: 'compiler-sdt',
      name: 'Syntax-Directed Translation',
      theory: {
        intro: 'Syntax-directed translation (SDT) attaches meaning to parsing: each grammar symbol carries attributes, and each production carries semantic rules or embedded actions that compute those attributes. This is how compilers evaluate constant expressions, build abstract syntax trees, propagate types, and emit intermediate code, all guided by the shape of the parse tree. GATE questions revolve around a small vocabulary — synthesized versus inherited attributes, S-attributed versus L-attributed definitions — and a small set of mechanical skills: evaluating a given SDT on a given input string, predicting the printed output of embedded print actions, and deciding which class of definition can be evaluated during LL or LR parsing. The topic rewards careful tracing: draw the parse tree for the input under the given grammar, respecting how the grammar encodes precedence and associativity, then apply the semantic rules bottom-up or left-to-right as the definition dictates.',
        core: 'Attributes come in two kinds. A synthesized attribute of a nonterminal at a parse tree node is computed from attribute values of that node and its children — information flows up the tree. An inherited attribute is computed from the parent and/or left siblings — information flows down and across. Terminal symbols have only synthesized attributes (their lexical values, supplied by the scanner); the start symbol conventionally takes no inherited attribute.\n\nAn S-attributed definition uses synthesized attributes only. It can be evaluated by a single bottom-up pass: whenever an LR parser reduces by A -> X Y Z, all attributes of X, Y, Z are already available on the parser stack, so A.s can be computed at the moment of reduction. This is exactly how yacc-style $$ = $1 + $3 actions work.\n\nAn L-attributed definition allows synthesized attributes freely, and inherited attributes with a restriction: an inherited attribute of symbol Xi in A -> X1 ... Xn may depend only on the inherited attributes of A and on attributes of the siblings X1 ... X(i-1) to its left. Nothing may depend on a right sibling. This is precisely the information available during a depth-first, left-to-right traversal, so L-attributed definitions can be evaluated in one pass alongside LL parsing (or with marker tricks during LR parsing). Two facts to memorize:\n\n• Every S-attributed definition is L-attributed (it uses no inherited attributes at all, so the restriction holds vacuously).\n• Not every L-attributed definition is S-attributed.\n\nEvaluation order in general is given by the dependency graph: draw a node per attribute instance, an edge from each used attribute to the attribute computed from it, and evaluate in topological order. A cycle means the definition cannot be evaluated at all; acyclicity is required.\n\nEmbedded actions in an SDT scheme sit inside production bodies and execute when the parser reaches that point. For bottom-up evaluation of an S-attributed scheme, actions sit at the right end and fire at reduction time; the printed output of such a scheme equals the order in which reductions occur — effectively a postorder (depth-first, children before parent) walk of the parse tree.\n\nA classic application is building the syntax tree itself: E -> E1 + T sets E.node = mknode(+, E1.node, T.node), a pure S-attributed scheme. Another is type propagation in declarations: in D -> T L, the list L inherits L.in = T.type and passes it along L -> L1 , id via L1.in = L.in, entering each identifier with the inherited type — the standard example of a genuinely L-attributed (not S-attributed) definition. Remember also the distinction between a parse tree (every grammar symbol and production step appears) and an abstract syntax tree (operators become interior nodes, chain productions and punctuation disappear).',
        strategy: 'GATE questions here are of three flavors. Classification questions ask which definitions can be evaluated with which parser: answer with the two memorized implications — S-attributed pairs with bottom-up/LR evaluation, L-attributed with top-down/left-to-right evaluation, and S-attributed is a subset of L-attributed. Watch for the trap option claiming every L-attributed definition is S-attributed; the inclusion runs the other way.\n\nEvaluation questions give a grammar with unusual precedence and an input string. The intended trap is that the grammar swaps the usual roles of operators. Method: build the parse tree strictly from the grammar, never from arithmetic habit. The operator at the topmost production is applied last but binds loosest; the nonterminal that sits lower in the grammar chain binds tighter.\n\nWorked mini-example: grammar E -> E * T | T, T -> T + F | F, F -> num, with rules E.val = E.val * T.val, T.val = T.val + F.val. Input 2 * 3 + 4. Here + lives below *, so + binds tighter: the parse is E * T with E => 2 and T => 3 + 4 = 7, giving 2 * 7 = 14 — not the usual 10. For print-action questions, remember the output order is the reduction order: leftmost-innermost subtrees print first. Always write the parse tree down; almost every wrong answer on this topic comes from evaluating in conventional precedence instead of grammar precedence.'
      },
      questions: [
        {
          id: 'compiler-sdt-q1',
          q: 'A synthesized attribute of a nonterminal at a parse tree node is computed from:',
          options: ['Attribute values of the parent node only', 'Attribute values at the children of that node (and the node itself)', 'Attribute values of the left siblings only', 'The global symbol table only'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'By definition, in a semantic rule attached to production A -> X1 X2 ... Xn, a synthesized attribute A.s is defined in terms of attributes of the symbols on the right-hand side — which are the children of the A node in the parse tree — and possibly other attributes of A itself. Information therefore flows upward from leaves to root. Typical examples: E.val computed from E1.val and T.val, or E.code concatenated from the code attributes of subexpressions. Attributes computed from the parent or left siblings are inherited attributes, options 1 and 3. Option 2 is correct.'
        },
        {
          id: 'compiler-sdt-q2',
          q: 'An inherited attribute of a grammar symbol X in production A -> Y X Z may legally depend, in an L-attributed definition, on:',
          options: ['Attributes of Z, the right sibling', 'Inherited attributes of A and attributes of Y, the left sibling', 'Only synthesized attributes of X itself', 'Attributes of any node in the tree'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Inherited attributes carry information down and across the parse tree: the value at X comes from its parent A and from siblings already processed, i.e., those to its left. The L-attributed restriction makes this precise: X.i may use the inherited attributes of A and any attributes of Y (which lies to the left of X), but never attributes of Z, because during a depth-first left-to-right traversal Z has not been visited when X is entered. Option 1 violates exactly this. Option 3 describes nothing useful (an attribute defined from itself), and option 4 describes an unrestricted attribute grammar, not the L-attributed class. Hence option 2.'
        },
        {
          id: 'compiler-sdt-q3',
          q: 'An S-attributed syntax-directed definition is one that:',
          options: ['Uses only inherited attributes', 'Uses only synthesized attributes', 'Uses at least one synthesized and one inherited attribute', 'Uses attributes only on terminal symbols'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The S in S-attributed stands for synthesized: every attribute in the definition is synthesized, computed bottom-up from children to parent. This restriction is exactly what makes single-pass evaluation during LR parsing possible — at the moment of a reduction all children attributes sit on the parser stack, so the parent attribute can be computed immediately and pushed in their place. Desk-calculator style rules such as E.val = E1.val + T.val are the standard example. A definition mixing in inherited attributes may still be L-attributed but is no longer S-attributed. Option 2 is correct.'
        },
        {
          id: 'compiler-sdt-q4',
          q: 'Which of the following statements is TRUE?',
          options: ['Every L-attributed definition is S-attributed', 'Every S-attributed definition is L-attributed', 'No S-attributed definition is L-attributed', 'The two classes are incomparable'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The L-attributed condition restricts only inherited attributes: each may depend just on the parent inherited attributes and left-sibling attributes. Synthesized attributes are entirely unrestricted in an L-attributed definition. An S-attributed definition contains no inherited attributes at all, so the restriction is satisfied vacuously — there is nothing that could violate it. Hence every S-attributed definition is automatically L-attributed, option 2, and S-attributed is a proper subclass of L-attributed. The converse fails: a definition that passes a type down a declaration list uses inherited attributes and is L-attributed but not S-attributed. This inclusion direction is a perennial one-mark GATE question, and option 1 is its designed trap.'
        },
        {
          id: 'compiler-sdt-q5',
          q: 'S-attributed definitions are naturally evaluated during which kind of parse?',
          options: ['Bottom-up (LR) parsing, computing attributes at each reduction', 'Top-down parsing only', 'They require a separate tree walk after parsing, always', 'Operator precedence parsing only'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'In an S-attributed definition every rule computes a parent attribute from children attributes. An LR parser performs a reduction A -> X Y Z precisely when the subtrees for X, Y, Z are complete, so their synthesized attributes are already computed and stored in the stack entries about to be popped. The parser computes A.s from them and stores it with the new stack entry — one pass, no extra traversal. This is the mechanism behind yacc actions like $$ = $1 + $3. Top-down evaluation is also possible (postorder at procedure return), but the natural, classical pairing asked in exams is S-attributed with bottom-up parsing, option 1. Option 3 is wrong because no separate pass is needed.'
        },
        {
          id: 'compiler-sdt-q6',
          q: 'L-attributed definitions are important because they can be evaluated:',
          options: ['In a single depth-first left-to-right pass, matching the order of a predictive (LL) parse', 'Only by repeated passes over the parse tree', 'Only bottom-up, at reductions', 'In right-to-left order over each production'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The defining restriction of L-attributed definitions — inherited attributes depend only on the parent and left siblings — is engineered so that when a depth-first left-to-right traversal reaches a node, everything its inherited attributes need has already been computed: the parent was entered earlier and left siblings finished earlier. Synthesized attributes are computed when the node is left. This traversal order is exactly the order in which a recursive descent or table-driven LL parser expands the tree, so translation happens during parsing in one pass, option 1. The L in the name stands for this left-to-right dependency discipline. Bottom-up-only (option 3) describes the S-attributed pairing; multiple passes (option 2) are needed only for more general, non-L definitions.'
        },
        {
          id: 'compiler-sdt-q7',
          q: 'Grammar: E -> E * T | T, T -> T + F | F, F -> num, with values E.val = E1.val * T.val for E -> E * T and T.val = T1.val + F.val for T -> T + F. What value is computed for the input 5 * 4 + 3?',
          options: ['23', '35', '27', '60'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'trace',
          explanation: 'This grammar deliberately swaps conventional precedence: * appears at the E level (top, binds loosest) and + at the T level (lower, binds tighter). Parse 5 * 4 + 3: the only way to produce the * is E -> E * T, where E must derive 5 (via T, F) and T must derive 4 + 3 (via T -> T + F with T => 4 and F => 3). Evaluate bottom-up: inner T.val = 4 + 3 = 7; left E.val = 5; root E.val = 5 * 7 = 35. Option 2 is correct. The trap answer 23 comes from applying schoolbook precedence (5*4 + 3). Always let the grammar, not arithmetic habit, dictate the tree: the operator introduced nearer the start symbol is applied last.'
        },
        {
          id: 'compiler-sdt-q8',
          q: 'SDT scheme: E -> E + T { print("+") }, E -> T, T -> num { print(num.val) }. Evaluated bottom-up on the input 2 + 3 + 4, what is printed?',
          options: ['2 + 3 + 4', '2 3 + 4 +', '+ + 2 3 4', '2 3 4 + +'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'trace',
          explanation: 'Actions at the right end of productions fire at reduction time, so the output order is the reduction order — a postorder walk. The grammar is left recursive, so 2 + 3 + 4 parses as (2 + 3) + 4. Reductions in order: T -> 2 prints 2; E -> T; T -> 3 prints 3; E -> E + T prints + (completing 2+3); T -> 4 prints 4; E -> E + T prints + (completing the whole). Output: 2 3 + 4 +, which is the postfix form of the left-associative expression — option 2. Option 4 (2 3 4 + +) would be the postfix of right-associative grouping 2 + (3 + 4), which this left-recursive grammar never produces. Printing infix (option 1) would require actions placed around subexpressions, not at production ends.'
        },
        {
          id: 'compiler-sdt-q9',
          q: 'SDT scheme: S -> a S { print(1) } | b { print(2) }, with each action executed when its production body has been fully matched. What is printed for the input a a b?',
          options: ['1 1 2', '2 1 1', '1 2 1', '2 2 1'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'trace',
          explanation: 'The parse tree for aab is S(a, S(a, S(b))): the outer S uses S -> aS, its child uses S -> aS again, and the innermost uses S -> b. An action at the end of a production runs when that entire body — including nested subtrees — has been matched. The innermost production S -> b finishes first, printing 2. Then the middle S -> aS completes (its S child is done), printing 1. Finally the outer S -> aS completes, printing 1. Output: 2 1 1, option 2. This is postorder/reduction order: deepest first. The trap answer 1 1 2 assumes actions fire when a production is chosen (preorder, at prediction time), but end-of-body actions fire at completion, whether the evaluator is an LR parser reducing or a recursive descent parser returning.'
        },
        {
          id: 'compiler-sdt-q10',
          q: 'How does an abstract syntax tree (AST) differ from a parse tree?',
          options: ['The AST shows every grammar symbol and production used in the derivation', 'The AST omits single-production chains and punctuation, keeping operators as interior nodes and operands as leaves', 'The AST is always larger than the parse tree', 'They are identical for expression grammars'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A parse tree (concrete syntax tree) records the derivation exactly: one interior node per production application, including chain steps like E -> T -> F -> ( E ) and all punctuation tokens. An AST keeps only semantic essentials: an interior node per operator or construct, children per operand, with parentheses, semicolons and unit productions discarded — the structure they conveyed is already encoded in the tree shape. For a + b * c the AST has 5 nodes (two operators, three leaves) while the parse tree under the standard grammar has many more. The AST is therefore smaller, making options 1, 3 and 4 wrong. Compilers typically build the AST via an S-attributed scheme with rules like E.node = mknode(+, E1.node, T.node).'
        },
        {
          id: 'compiler-sdt-q11',
          q: 'When can the attributes of a syntax-directed definition NOT be evaluated in any order at all?',
          options: ['When the definition uses inherited attributes', 'When the dependency graph of attribute instances for some parse tree contains a cycle', 'When the grammar is left recursive', 'When there are more attributes than parse tree nodes'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Attribute evaluation must respect dependencies: if attribute p is used to compute q, then p must be evaluated before q. Drawing a node per attribute instance and an edge from each used attribute to each attribute computed from it gives the dependency graph; a valid evaluation order is exactly a topological sort of this graph. A topological order exists iff the graph is acyclic. If two attributes each (transitively) depend on the other, a cycle exists and no order can satisfy both — evaluation is impossible, option 2. Inherited attributes alone are harmless (L-attributed definitions guarantee acyclicity by construction), left recursion is a parsing concern not an attribute concern, and the count comparison in option 4 is meaningless.'
        },
        {
          id: 'compiler-sdt-q12',
          q: 'In the declaration grammar D -> T L, T -> int | float, L -> L , id | id, the attribute L.in that carries the declared type from T to each identifier is:',
          options: ['A synthesized attribute of L', 'An inherited attribute of L', 'A synthesized attribute of T', 'An attribute of the terminal id'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Follow the flow of the type information. T.type is synthesized (computed at T from the keyword). In D -> T L, the rule L.in = T.type gives L a value taken from its left sibling T — that is downward/across flow, the signature of an inherited attribute. Within L -> L1 , id, the rule L1.in = L.in passes the value from parent to child, again inherited, and each id is entered into the symbol table with type L.in. So L.in is inherited, option 2. This scheme is the textbook example of a definition that is L-attributed (dependence only on parent and left sibling) but not S-attributed, and it is why type declarations are the canonical motivation for inherited attributes.'
        },
        {
          id: 'compiler-sdt-q13',
          q: 'SDD: E -> E1 + T with E.val = E1.val + 2 * T.val; E -> T with E.val = T.val; T -> num with T.val = num.val. What is E.val for the input 1 + 2 + 3?',
          options: ['6', '11', '15', '9'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'trace',
          explanation: 'The grammar is left recursive, so 1 + 2 + 3 groups as (1 + 2) + 3. Evaluate bottom-up. Innermost: E => T => 1, so E.val = 1. First application of E -> E1 + T with E1.val = 1, T.val = 2: E.val = 1 + 2*2 = 5. Second application with E1.val = 5, T.val = 3: E.val = 5 + 2*3 = 11. Option 2 is correct. The trap answers: 6 is ordinary addition ignoring the doubling rule; 15 comes from doubling every operand including the first (2*1 + 2*2 + 2*3 with the wrong grouping logic); 9 comes from doubling only the last operand once (1 + 2 + 2*3), i.e., forgetting that the rule fires at every + node. The key is that only the T operand of each + is doubled, and the rule applies at both + nodes.'
        }
      ]
    },
    {
      id: 'compiler-icg',
      name: 'Intermediate Code Generation',
      theory: {
        intro: 'After semantic analysis the compiler lowers the program into an intermediate representation (IR) that is independent of both source language and target machine. The most examined IR is three-address code (TAC): a sequence of simple instructions, each with at most one operator and at most three addresses (two operands and a result). TAC is stored concretely as quadruples, triples, or indirect triples, and GATE regularly asks you to compare these forms. The second pillar of this topic is the directed acyclic graph (DAG) for expressions: a syntax tree in which identical subexpressions are shared, so common subexpressions appear exactly once. Counting nodes and edges in the DAG of a given expression, and counting the minimum number of TAC instructions needed for a statement, are staple two-mark questions. The mechanics are simple; the marks are lost through careless sharing or missed temporaries, so a disciplined drawing-and-counting routine matters more than theory here.',
        core: 'Three-address code. Each TAC instruction has one of a few forms: x = y op z (binary), x = op y (unary), x = y (copy), unconditional goto L, conditional if x relop y goto L, param/call/return for procedures, and indexed or pointer assignments like x = y[i] and x = *y. Compound expressions are decomposed using compiler-generated temporaries: a = b + c * d becomes t1 = c * d; a = b + t1. Counting minimum instructions means introducing a temporary only where the machine-independent form forces one, writing the final result directly into the target variable rather than through an extra copy.\n\nRepresentations of TAC:\n\n• Quadruples: four fields (op, arg1, arg2, result). Temporaries are named explicitly, so instructions can be moved or reordered freely — good for optimizing compilers.\n• Triples: three fields (op, arg1, arg2); a result is referred to by the position (number) of the instruction that computes it. Because references are positional, moving an instruction forces renumbering every reference to it — reordering is painful.\n• Indirect triples: keep the triples but execute them through a separate list of pointers; reordering permutes only the pointer list, restoring easy code motion while saving the space of explicit temporaries.\n\nDAG for expressions. Construct like a syntax tree, but before creating a node for op(l, r), check whether an identical node already exists and reuse it. Leaves are unique per variable or constant; interior nodes are unique per (operator, left child, right child) triple. The DAG thus exposes every common subexpression as a shared node with multiple parents, and generating code from the DAG computes each shared value once. Node counting procedure: list distinct leaves first, then build operators bottom-up, reusing any node whose operator and children match one already built.\n\nDAGs also represent basic blocks: each statement adds nodes, copies make labels move between nodes, and the final DAG yields the minimal instruction sequence for the block, which is how minimum-TAC questions connect to DAG questions.\n\nOther IR forms worth one mark: postfix (reverse Polish) notation, abstract syntax trees, and static single assignment (SSA) form in which every variable is assigned exactly once and merge points use phi functions. For control flow, boolean expressions translate either to numeric values or by short-circuit jumping code with true/false exit labels and backpatching to fill in unknown targets. For arrays, a reference a[i] with element width w lowers to an address computation t1 = i * w followed by an indexed access — the width multiplication is a favourite detail in questions.',
        strategy: 'For minimum-TAC-count questions: first mentally build the DAG so shared subexpressions are computed once, then emit one instruction per interior DAG node, writing the last result directly into the assigned variable. Do not emit x = t as a separate final copy unless the root value is genuinely needed twice under different names — the extra copy is the most common overcount. For x = (a+b)*(a+b), the DAG has one + node and one * node, so two instructions suffice: t1 = a + b; x = t1 * t1.\n\nFor DAG node counting: write the distinct variables and constants as leaves (count duplicates once), then process operators in precedence order, asking for each candidate node "does a node with this operator and exactly these children already exist?" Count nodes at the end, and count edges as two per interior binary node (a node whose two children coincide still contributes two edges).\n\nWorked mini-example: x = (p+q) * (p+q) + r. Leaves: p, q, r — 3 nodes. Interior: one shared + for p+q; one * whose both children are that + node; one top + combining the * with r. Total 3 + 3 = 6 nodes, and edges = 3 interior nodes x 2 = 6.\n\nFor quadruple/triple questions, remember one discriminating sentence: triples name results by position, so any optimization that moves code must renumber, which quadruples (explicit temporaries) and indirect triples (pointer list) both avoid. Expect exactly this contrast in the options.'
      },
      questions: [
        {
          id: 'compiler-icg-q1',
          q: 'Which property must every three-address instruction satisfy?',
          options: ['It contains exactly three operators', 'It contains at most one operator on the right-hand side, apart from the assignment', 'It always names three distinct variables', 'It cannot contain constants'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The name three-address refers to at most three addresses (two source operands and one result), and the defining structural rule is one operator per instruction besides the assignment itself: x = y op z. This forces the compiler to make evaluation order explicit — a compound source expression like a + b * c must be linearized into t1 = b * c; t2 = a + t1, exposing every intermediate value as a temporary that later phases can optimize. The addresses need not be distinct (x = x + 1 is legal), constants are perfectly allowed as operands, and unary or copy instructions have fewer than three addresses. Hence option 2.'
        },
        {
          id: 'compiler-icg-q2',
          q: 'A quadruple representation of three-address code has which four fields?',
          options: ['op, arg1, arg2, result', 'label, op, arg, target', 'op, result, next, prev', 'arg1, arg2, arg3, arg4'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A quadruple stores one TAC instruction as the record (op, arg1, arg2, result). For t1 = b * c the quadruple is (*, b, c, t1); for a unary t2 = minus t1 it is (minus, t1, -, t2) with arg2 empty; for a copy a = t2 it is (=, t2, -, a). The essential design point is that the result field names the temporary or variable explicitly. Because results are named rather than positional, instructions can be deleted, moved, or reordered without disturbing how other instructions refer to their values — the property that distinguishes quadruples from triples. Option 1 is correct.'
        },
        {
          id: 'compiler-icg-q3',
          q: 'The main disadvantage of triples compared with quadruples is that:',
          options: ['Triples need more memory per instruction', 'Results are referred to by instruction position, so reordering instructions during optimization requires updating all references', 'Triples cannot represent unary operators', 'Triples cannot represent conditional jumps'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'A triple has fields (op, arg1, arg2) and produces a value identified by its own position: instruction (7) might be (+, a, b) and a later triple refers to that sum as (7). This saves the memory of explicit temporary names — triples actually use less space, so option 1 is backwards. But an optimizer that moves or removes instructions changes positions, and every positional reference throughout the code must then be renumbered, making code motion expensive. Indirect triples fix this by executing through a separate pointer list, so only pointers move. Triples represent unary operators and jumps without difficulty. Hence option 2.'
        },
        {
          id: 'compiler-icg-q4',
          q: 'What is the minimum number of three-address instructions needed for the statement x = (a + b) * (a + b)?',
          options: ['1', '2', '3', '4'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The subexpression a + b occurs twice but needs computing only once — in the DAG both operands of the * node are the same + node. Emit one instruction per interior DAG node: t1 = a + b, then x = t1 * t1, writing the product directly into x. That is 2 instructions, option 2. The count 3 arises from computing a + b twice (t1 = a+b; t2 = a+b; x = t1*t2) or from adding an unnecessary final copy (t1 = a+b; t2 = t1*t1; x = t2); both waste an instruction. One instruction is impossible because TAC allows only one operator per instruction and the statement needs an addition and a multiplication.'
        },
        {
          id: 'compiler-icg-q5',
          q: 'How many three-address instructions are needed (minimum) for w = x * y + z * y, assuming no algebraic transformations such as distribution are applied?',
          options: ['2', '3', '4', '5'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Check for common subexpressions first: x * y and z * y share the operand y but are different products, so no sharing is possible without algebraic rewriting (factoring to (x+z)*y is a strength of algebra, not of plain common subexpression detection, and the question forbids it). The DAG therefore has three interior nodes: one for x*y, one for z*y, one for the +. Emit one instruction per interior node: t1 = x * y; t2 = z * y; w = t1 + t2 — 3 instructions, option 2. Answer 2 would require the forbidden factoring; answer 4 adds a redundant copy of the final sum into w instead of assigning it directly.'
        },
        {
          id: 'compiler-icg-q6',
          q: 'How many nodes does the DAG for the expression (p + q) * (p + q) + r contain?',
          options: ['5', '6', '7', '9'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Leaves: distinct variables p, q, r give 3 leaf nodes. Interior nodes, built bottom-up with reuse: (1) a + node for p + q — the second occurrence of p + q has the same operator and the same children, so it reuses this node rather than creating another; (2) a * node whose left and right children are both that single + node; (3) a top-level + node combining the * node with leaf r. Interior total 3, grand total 3 + 3 = 6 nodes, option 2. The answer 9 corresponds to the syntax tree, where p, q and the inner + are duplicated; the whole point of the DAG is that identical subexpressions collapse into one shared node, which is also why only two multiplications/additions (one +, one *, one +) need be computed.'
        },
        {
          id: 'compiler-icg-q7',
          q: 'How many nodes does the DAG for a * (b + c) + (b + c) * d contain?',
          options: ['7', '8', '9', '10'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Leaves: a, b, c, d — 4 nodes (each distinct variable once). Interior: (1) + node for b + c, created once and shared by both products since operator and children match; (2) * node for a * (b+c), children a and the shared +; (3) * node for (b+c) * d, children the shared + and d — this is a different node from the previous * because its children differ; (4) the top + combining the two products. Interior total 4, grand total 4 + 4 = 8 nodes, option 2. The corresponding minimal code has one instruction per interior node: t1 = b + c; t2 = a * t1; t3 = t1 * d; t4 = t2 + t3 — 4 instructions, another number this DAG immediately yields.'
        },
        {
          id: 'compiler-icg-q8',
          q: 'The chief advantage of using a DAG rather than a syntax tree as the IR for an expression is that the DAG:',
          options: ['Is always a binary tree', 'Automatically identifies common subexpressions by sharing identical subtrees as single nodes', 'Eliminates the need for temporaries entirely', 'Encodes operator precedence, which the syntax tree cannot'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'When building a DAG, before creating a node for op(l, r) the constructor searches for an existing node with the same operator and the same children and reuses it if found. A repeated subexpression therefore materializes as one node with several parents, and code generated from the DAG computes it exactly once — common subexpression elimination falls out of the representation itself. That is option 2. A DAG is generally not a tree at all (shared nodes have multiple parents), temporaries are still needed to hold shared values, and a syntax tree encodes precedence perfectly well through its shape, so the other options fail.'
        },
        {
          id: 'compiler-icg-q9',
          q: 'The source statement if (a < b) x = 1; typically translates to which three-address sequence?',
          options: ['t1 = a < b performed arithmetically, with no jumps ever used', 'if a < b goto L1; goto L2; L1: x = 1; L2: ...', 'x = a < b', 'call (a<b); x = 1'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'application',
          explanation: 'Control flow lowers to conditional and unconditional jumps. The standard translation tests the condition with a conditional jump to the true label, falls through (or jumps) to the false/exit label otherwise: if a < b goto L1; goto L2; L1: x = 1; L2: (next statement). Option 2 shows exactly this shape. Optimized generators fuse the two jumps into if a >= b goto L2, but the jump-based structure remains. Option 1 is wrong in claiming jumps are never used — a boolean controlling an if needs control transfer; option 3 computes a value but never conditions the assignment; option 4 misuses procedure-call instructions. During generation the targets L1/L2 may be unknown and are filled in later by backpatching.'
        },
        {
          id: 'compiler-icg-q10',
          q: 'Using DAG-based generation, what is the minimum number of TAC instructions for a = b * c + b * c?',
          options: ['2', '3', '4', '1'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Build the DAG: leaves b and c; a single * node for b * c (the second b * c has identical operator and children, so it is the same node); a + node whose two children are both that * node. Two interior nodes mean two instructions: t1 = b * c; a = t1 + t1. Option 1 (2 instructions) is correct. Without DAG sharing the naive translation takes three: t1 = b*c; t2 = b*c; a = t1 + t2 — the redundant second multiplication is exactly what common subexpression sharing removes. One instruction is impossible since the statement inherently needs a multiplication and an addition, and TAC permits one operator per instruction. (An algebraic optimizer might also rewrite t1 + t1 as 2*t1, but the count stays 2.)'
        },
        {
          id: 'compiler-icg-q11',
          q: 'Which of the following are all legitimate intermediate representations of a program?',
          options: ['Postfix notation, syntax trees, three-address code', 'Token stream, symbol table, register allocation', 'Parse table, DFA, FOLLOW sets', 'Object code, executable image, load map'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'An intermediate representation stands between the analyzed source and the target code: it must capture the meaning of the program in a machine-independent form that later phases consume. Postfix (reverse Polish) notation, abstract syntax trees / DAGs, and three-address code (in quadruple, triple, or SSA flavors) are the standard IRs, so option 1 is correct. The token stream is the output of scanning (input to parsing, not an IR of the whole program in the intended sense), the symbol table is an auxiliary structure, parse tables and automata are parser internals, and object/executable code is the final target output, not intermediate. Option 1 is the only list whose every member is an IR.'
        },
        {
          id: 'compiler-icg-q12',
          q: 'For an array a of 4-byte integers, the assignment a[i] = x is typically lowered to which TAC sequence?',
          options: ['a[i] = x directly, with no address arithmetic ever generated', 't1 = i * 4; a[t1] = x', 't1 = i + 4; a[t1] = x', 't1 = x * 4; a[i] = t1'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'application',
          explanation: 'Array elements occupy w bytes each, so element i lives at offset i * w from the base address. The generator therefore emits the address computation t1 = i * 4 (multiplication by the element width, 4 bytes for these integers) followed by the indexed store a[t1] = x, where the index is now a byte offset. Option 2 is correct. Option 3 adds instead of multiplying — offsets scale multiplicatively with the index. Option 4 scales the stored value, corrupting the data. Option 1 hides the arithmetic that real IR must expose so that the optimizer can, for instance, strength-reduce the multiplication to repeated addition inside a loop — a connection GATE likes to draw between ICG and loop optimization.'
        },
        {
          id: 'compiler-icg-q13',
          q: 'How many TAC instructions (minimum, one operator each) are needed for x = -(a + b) * (c + d)?',
          options: ['3', '4', '5', '2'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Identify the distinct operations: an addition a + b, an addition c + d, a multiplication, and a unary minus applied to the product (the minus is applied to the whole product since -(a+b)*(c+d) negates (a+b) first... take the expression as written: unary minus on (a+b), then multiply). Either reading gives four operator applications. Sequence for negating the sum first: t1 = a + b; t2 = minus t1; t3 = c + d; x = t2 * t3 — 4 instructions, option 2. There are no common subexpressions to share (the two sums have different operands), and each TAC instruction may carry only one operator, so 3 is unattainable; 5 would add a useless copy. Unary minus counts as a full instruction of the form x = op y.'
        },
        {
          id: 'compiler-icg-q14',
          q: 'How many nodes are in the DAG for m + m * (n - p) + (n - p) * q?',
          options: ['7', '8', '9', '11'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Leaves: m, n, p, q — 4 nodes; m occurs twice in the expression but is one shared leaf. Interior nodes: (1) the - node for n - p, built once and reused for its second occurrence (same operator, same children); (2) the * node for m * (n-p), children leaf m and the shared -; (3) the * node for (n-p) * q — distinct from the previous * because its children differ; (4) the + node for m + [m*(n-p)] (left-to-right association of +), children leaf m and *-node (2); (5) the top + combining node (4) with *-node (3). Interior total 5; grand total 4 + 5 = 9 nodes, option 3. Answer 11 counts the duplicated (n-p) and m again as in the syntax tree; answer 8 over-merges the two different * nodes.'
        }
      ]
    },
    {
      id: 'compiler-runtime',
      name: 'Runtime Environments',
      theory: {
        intro: 'The runtime environment is the machinery a compiled program relies on while executing: how storage is laid out (code, static data, stack, heap), how a procedure call creates and destroys an activation record, how names are bound to storage under static or dynamic scoping, and how arguments reach parameters under the various parameter passing mechanisms. GATE questions here are of two kinds. Conceptual one-markers probe the contents of an activation record, the difference between control links and access links, why recursion demands stack allocation, and how symbol tables model scopes. Two-mark questions are output-tracing puzzles: the same program fragment is executed under static versus dynamic scoping, or under call by value, reference, value-result or name, and you must predict what is printed. These traces are entirely deterministic once you apply the definitions strictly, so this topic converts practice directly into marks — provided you resist the habit of always thinking in C semantics.',
        core: 'Storage organization. A typical process image holds the code, static data (globals and compile-time constants), a stack growing from one end for activation records, and a heap growing from the other for dynamically allocated, arbitrarily-lived objects. Purely static allocation (as in old Fortran) fixes every variable address at compile time, which is fast but forbids recursion, since every activation of a procedure would share the same storage. Stack allocation gives each call its own activation record, enabling recursion; heap allocation is needed when data outlives its creating activation, as with closures or malloc-style objects.\n\nActivation records. A call pushes a record typically containing: actual parameters, the return address, the saved machine status/registers, the control link (dynamic link) pointing to the caller’s activation record, the access link (static link) pointing to the record of the most recent activation of the lexically enclosing procedure, local variables, and temporaries. Keep the two links straight: the control link follows the call chain (who called me) and is used for returning; the access link follows the lexical nesting (who encloses me in the source text) and is used to reach nonlocal variables under static scoping. To access a variable declared d levels out, the compiled code follows d access links; a display array of pointers, one per nesting depth, gives the same access in one step.\n\nScoping. Under static (lexical) scoping, a nonlocal name refers to the declaration in the closest lexically enclosing block — determined from the program text, at compile time. Under dynamic scoping, a free name refers to the most recently created and still-active binding on the call stack — determined by the calling history, at run time. The same program can print different values under the two disciplines whenever a called procedure references a name that both a global and some caller declare.\n\nParameter passing.\n\n• Call by value: the actual is evaluated and copied; assignments to the formal never affect the caller. C uses this exclusively (pointers are passed by value).\n• Call by reference: the formal is an alias for the actual’s location; assignments write through immediately. Passing the same variable for two formals aliases them to each other.\n• Call by value-result (copy-in copy-out): actuals are copied in, and on return the final formal values are copied back; differs from reference exactly when aliasing or intermediate observation occurs.\n• Call by name: the actual expression is substituted textually (implemented by thunks) and re-evaluated at every use of the formal, so side effects in the actual repeat.\n\nSymbol tables. Usually hash tables; nested scopes are handled by a stack of tables (push on scope entry, pop on exit) or by chaining entries per scope, so a lookup finds the innermost declaration first.',
        strategy: 'Scoping traces: first mark every variable reference in the called procedure as local or free. For each free reference, static scoping asks "which declaration encloses this procedure in the source text?" — walk outward through the lexical blocks, ignoring who called whom. Dynamic scoping asks "which declaration is most recent on the call stack?" — walk down the callers. Write both chains explicitly; the exam options are built from mixing them up.\n\nParameter passing traces: simulate mechanically. For reference, draw arrows from formals to the caller’s variables and apply every assignment through the arrow at once — and watch for two formals aliasing one actual, the favourite trap. For value-result, keep separate local copies and perform all copy-backs at return, noting that a variable passed twice gets copied back twice (the later copy-back wins, and GATE expects you to say the order or call it undefined). For name, re-evaluate the actual expression at each use, repeating its side effects.\n\nWorked mini-example: void f(int a, int b) { a = a + 3; b = b + 4; } with x = 10 and the call f(x, x). Call by value: copies change, x stays 10. Call by reference: a and b both alias x, so x becomes 13 then 17 — printed value 17. Call by value-result: a = 13, b = 14 locally; copy-back in order leaves x = 14. Three mechanisms, three different answers from four lines of code — which is exactly why this fragment shape keeps reappearing in exams.'
      },
      questions: [
        {
          id: 'compiler-runtime-q1',
          q: 'Which of the following is typically NOT stored in an activation record?',
          options: ['Return address', 'Actual parameters and local variables', 'The complete machine code of the called procedure', 'Control link to the caller’s activation record'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'An activation record (stack frame) holds the per-call data of one activation: the actual parameters passed in, the return address to resume the caller, saved registers/machine status, the control (dynamic) link to the caller’s record, the access (static) link for nonlocal access, local variables, and temporaries. The code of the procedure is not per-call data — it is shared, immutable, and lives in the code segment of the process; every activation of the procedure executes the same instructions. Putting code in the frame would duplicate it on every call for no purpose. Hence option 3 is the item that does not belong.'
        },
        {
          id: 'compiler-runtime-q2',
          q: 'In an activation record, the control link (dynamic link) points to:',
          options: ['The activation record of the lexically enclosing procedure', 'The activation record of the caller', 'The global data area', 'The top of the heap'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Two links must never be confused. The control link, also called the dynamic link, points to the activation record of the procedure that made the call — it mirrors the dynamic call chain and is used when the callee returns, to restore the caller’s frame. The access link, also called the static link, points to the most recent activation of the procedure that lexically encloses the callee in the source text — it mirrors static nesting and is followed to reach nonlocal variables under static scoping. Caller and lexical parent often differ (a procedure may be called from a sibling), which is exactly why both links exist. Option 2 describes the control link correctly.'
        },
        {
          id: 'compiler-runtime-q3',
          q: 'Program: global x = 5. Procedure p() { print(x); }. Procedure q() { local x = 10; p(); }. The main program calls q(). Under STATIC scoping, what is printed?',
          options: ['5', '10', '15', 'Undefined behaviour'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'trace',
          explanation: 'Static (lexical) scoping resolves the free variable x in p by looking at the program text, not the call history. Procedure p is declared at the outer level; walking outward from p’s body, the first enclosing declaration of x is the global x = 5. The fact that q declares its own x and happens to be the caller is irrelevant — q’s x is visible only inside q’s text, and p’s text is not nested inside q. So p prints the global value 5, option 1. This is the behaviour of C, Java, and almost every modern language: you can determine the answer by reading the source alone, at compile time, without simulating any calls.'
        },
        {
          id: 'compiler-runtime-q4',
          q: 'Same program: global x = 5; p() { print(x); }; q() { local x = 10; p(); }; main calls q(). Under DYNAMIC scoping, what is printed?',
          options: ['5', '10', '0', 'A compile-time error occurs'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'trace',
          explanation: 'Dynamic scoping resolves a free variable to the most recently established binding that is still active on the call stack at the moment of use. Execution: main calls q, which creates a binding x = 10; q then calls p; inside p, the reference to x searches the stack of live bindings from the top: p has no local x, its caller q has x = 10 — found. The global x = 5 sits deeper and is shadowed. So p prints 10, option 2. Contrast with the static answer of 5 for identical code: the pair of questions shows that scoping discipline, not the program text alone, determines the output. Early Lisp and shell variables behave dynamically; the lookup happens at run time along the control link chain.'
        },
        {
          id: 'compiler-runtime-q5',
          q: 'void f(int a, int b) { a = a + 3; b = b + 4; } Let x = 10 and call f(x, x). Under call by REFERENCE, what is the value of x after the call?',
          options: ['10', '13', '14', '17'],
          answer: 3,
          marks: 2,
          difficulty: 'medium',
          type: 'trace',
          explanation: 'Under call by reference both formals alias the same actual: a and b are two names for the single location x. Execute the body through the aliases. First a = a + 3 reads x (10), writes 13 into x. Then b = b + 4 reads x again — which is now 13, not 10 — and writes 17. Final x = 17, option 4. The trap answers: 13 stops after the first assignment; 14 is the call-by-value-result answer (independent copies a = 13, b = 14, with b copied back last); 10 is call by value. The aliasing of two formals onto one actual is the whole point of the question — with distinct actuals, reference and value-result would agree.'
        },
        {
          id: 'compiler-runtime-q6',
          q: 'Which parameter passing mechanism does the C language use?',
          options: ['Call by reference for all parameters', 'Call by value only (a pointer value is itself passed by value)', 'Call by name', 'Call by value-result'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'C passes every argument by value: the actual expression is evaluated and a copy is placed in the parameter; assignments to the parameter inside the function change only the copy. The idiom of passing &x and dereferencing through int *p simulates reference semantics, but the mechanism is still call by value — the pointer itself is copied, and reassigning p inside the function does not affect the caller’s pointer. C++ adds true reference parameters (int &r); C has none. Arrays appear to be an exception but actually decay to a pointer, which is then passed by value. So option 2 is the precise statement.'
        },
        {
          id: 'compiler-runtime-q7',
          q: 'Under call by NAME, the actual argument expression is:',
          options: ['Evaluated exactly once, before the call', 'Evaluated exactly once, after the call returns', 'Re-evaluated afresh at every use of the corresponding formal parameter in the body', 'Never evaluated'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'concept',
          explanation: 'Call by name behaves like textual substitution of the actual for the formal (with renaming to avoid capture), classically implemented by passing a thunk — a hidden parameterless procedure that computes the actual. Each appearance of the formal in the body invokes the thunk, so the actual is evaluated as many times as the formal is used: zero times if never used, several times otherwise, repeating any side effects and re-reading variables whose values may have changed between uses. This is why swap(i, a[i]) is the famous failure case: after i changes, re-evaluating a[i] indexes a different element, and no call-by-name swap routine can be written that works for all argument pairs. Options 1 and 2 describe call by value and by result respectively.'
        },
        {
          id: 'compiler-runtime-q8',
          q: 'Call by value-result (copy-in copy-out) produces the same observable behaviour as call by reference EXCEPT when:',
          options: ['The actual is a constant expression', 'Aliasing exists, e.g., the same variable is passed for two formals, or a global used inside the callee is also passed as a parameter', 'The procedure has no parameters', 'The procedure is recursive'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Under value-result each formal is a private copy, updated locally, with final values copied back at return; under reference each formal writes through to the actual immediately. If every formal binds a distinct location that the callee touches only via that formal, the end states coincide. They diverge under aliasing: with f(x, x) by reference the two formals share one cell so updates compound (each assignment sees the other’s effect), while value-result keeps two independent copies and the copy-backs overwrite each other. Similarly, if the callee reads a global that was also passed as a parameter, reference sees updates immediately, value-result only at return. Hence option 2. Recursion and constant actuals do not by themselves distinguish the mechanisms.'
        },
        {
          id: 'compiler-runtime-q9',
          q: 'Why does support for recursive procedures require stack (or heap) allocation of activation records rather than purely static allocation?',
          options: ['Recursive procedures have more local variables', 'Multiple activations of the same procedure can be live simultaneously, and each needs its own copy of locals and return address', 'Static allocation cannot store return addresses at all', 'Recursion requires garbage collection'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Static allocation assigns each procedure one fixed block of storage at compile time. A recursive call creates a second live activation while the first is still pending; with only one block, the inner call would overwrite the outer call’s locals and, fatally, its return address, so the outer activation could never resume correctly. Stack allocation solves this by pushing a fresh activation record per call — simultaneous activations occupy distinct frames, and returns pop them in LIFO order, which matches the nesting of calls exactly. That is option 2. Old Fortran forbade recursion precisely because it used static allocation. Garbage collection concerns heap object lifetimes and is unrelated.'
        },
        {
          id: 'compiler-runtime-q10',
          q: 'A common implementation of a block-structured symbol table handles scope entry and exit by:',
          options: ['Erasing the entire table at every scope boundary', 'Maintaining a stack of tables: push a new table on entering a scope, look up from innermost outward, pop on exit', 'Keeping one flat table and forbidding name reuse across scopes', 'Sorting all identifiers alphabetically at each scope change'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Block structure means an inner declaration shadows an outer one and disappears when its block ends. The stack-of-tables scheme models this directly: entering a block pushes a fresh (usually hash) table; a declaration inserts into the top table; a lookup searches from the top of the stack downward, so the innermost declaration is found first, implementing shadowing; leaving the block pops its table, discarding all its names at once and un-shadowing outer ones. An equivalent single-table variant chains entries with scope numbers and unlinks a scope’s entries on exit. Option 2 describes the scheme. A flat table without reuse (option 3) rejects legal programs, and the other options destroy needed information.'
        },
        {
          id: 'compiler-runtime-q11',
          q: 'Under static scoping with nested procedures, compiled code inside a procedure at nesting depth 5 accesses a variable declared in the enclosing procedure at depth 2 by:',
          options: ['Following 3 access links from the current activation record', 'Following 3 control links from the current activation record', 'Following 5 access links', 'Searching the heap for the variable'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'application',
          explanation: 'The access (static) link of an activation at depth d points to the most recent activation of its lexical parent at depth d-1. To reach a variable declared at depth m from code at depth n (n > m), the generated code follows exactly n - m access links: here 5 - 2 = 3 hops, landing in the frame that holds the variable, then adds the variable’s fixed offset. Option 1 is correct. Control links are useless for this — they follow the callers, and the caller chain need not correspond to lexical nesting at all (option 2 is the classic distractor). A display — a global array display[d] of frame pointers indexed by depth — replaces the link-following with a single indexed load, trading maintenance cost at call/return for faster nonlocal access.'
        },
        {
          id: 'compiler-runtime-q12',
          q: 'Heap allocation of activation records or environments becomes necessary (instead of pure stack allocation) when:',
          options: ['A procedure calls itself recursively', 'Local data of a call must outlive the call, e.g., a returned closure still references the enclosing function’s variables', 'A procedure has more than one return statement', 'Parameters are passed by value'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Stack discipline assumes LIFO lifetimes: a callee’s data dies no later than its caller’s, so frames can be popped on return. That assumption breaks when local data must survive the activation that created it. The standard example is a function that returns an inner function (a closure) capturing its local variables: after the outer call returns, the closure can still be invoked and must still find those variables, so the environment cannot sit in a popped stack frame — it must be heap allocated and reclaimed later (often by garbage collection). Option 2 is exactly this situation. Recursion (option 1) is handled perfectly by the stack; multiple returns and by-value parameters raise no lifetime issues.'
        },
        {
          id: 'compiler-runtime-q13',
          q: 'Let g() be a function that increments a global counter and returns its new value. Consider f(x) whose body is: return x + x;. Starting with the counter at 0, what does f(g()) return under call by NAME, and how many times does the counter get incremented?',
          options: ['Returns 2 with one increment', 'Returns 3 with two increments', 'Returns 2 with two increments', 'Returns 1 with one increment'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'trace',
          explanation: 'Under call by name, x stands for the unevaluated expression g(); each use of x in the body re-invokes it. The body x + x uses x twice. First use: g() increments the counter 0 -> 1 and returns 1. Second use: g() increments 1 -> 2 and returns 2. The sum is 1 + 2 = 3, and the counter was incremented twice — option 2. Under call by value the answer would be option 1: g() runs once (counter 1, value 1) and the copy is used twice, returning 1 + 1 = 2. The divergence whenever the actual has side effects is the standard exam signature of call by name, and it is why the mechanism (from Algol 60) survives mainly as lazy evaluation with memoization (call by need), which would evaluate g() once.'
        }
      ]
    },
    {
      id: 'compiler-optimization',
      name: 'Code Optimization',
      theory: {
        intro: 'Code optimization improves intermediate or target code without changing observable behaviour. GATE concentrates on machine-independent optimization over three-address code, and the entry point is the basic block: a maximal sequence of instructions with one entry (the first instruction) and one exit (the last), so that control always flows straight through. Partitioning code into basic blocks via the leader rules, and building the control flow graph over them, is a guaranteed exam skill. On top of that sit the named transformations — constant folding and propagation, copy propagation, common subexpression elimination, dead code elimination, strength reduction, loop-invariant code motion, and induction variable elimination — plus the dataflow intuition of liveness: which variables still matter at a program point. Questions either ask you to classify or define a transformation, to count basic blocks in a numbered TAC listing, or to reason about which variables are live at a marked point. All three are mechanical once the definitions are exact.',
        core: 'Basic blocks and leaders. Given a numbered TAC listing, an instruction is a leader if (1) it is the first instruction of the program, or (2) it is the target of any conditional or unconditional jump, or (3) it immediately follows a conditional or unconditional jump. Each basic block runs from a leader up to, but not including, the next leader (or to the end). The control flow graph (CFG) has one node per block with edges for jumps and fall-throughs. Optimizations confined to one block are local; those using the whole CFG (via dataflow analysis) are global.\n\nThe classical transformations:\n\n• Constant folding: evaluate constant expressions at compile time (replace 2 * 3.14 by 6.28).\n• Constant propagation: replace a variable known to hold a constant by that constant (after x = 3, turn y = x + 1 into y = 3 + 1, which folding then makes 4).\n• Copy propagation: after a copy x = y, use y in place of x while both are unchanged, often making the copy dead.\n• Common subexpression elimination (CSE): if an expression was already computed and its operands are unchanged since, reuse the previous value. Local CSE works within a block (DAG construction does it automatically); global CSE needs available-expression analysis over the CFG.\n• Dead code elimination: remove instructions whose results are never used, and unreachable code.\n• Strength reduction: replace an expensive operation by a cheaper one — x * 8 by x << 3, or inside a loop the induction expression i * 4 by an addition t = t + 4 per iteration.\n• Loop-invariant code motion: an instruction whose operands do not change inside the loop is hoisted to a preheader, executing once instead of every iteration (subject to safety: it must dominate the exits or otherwise be safe to execute).\n• Induction variable elimination: variables that change by a constant per iteration are combined, often removing the loop counter entirely.\n• Loop unrolling replicates the body to cut loop-control overhead per iteration (more code, fewer branches); loop jamming or fusion merges two loops with identical iteration ranges into one.\n• Peephole optimization slides a small window over (usually target) code, applying pattern fixes: eliminating redundant load/store pairs, algebraic identities (x = x + 0, x = x * 1), unreachable code after unconditional jumps, and jump-over-jump simplifications.\n\nLiveness. A variable v is live at a point p if some path from p to the exit uses v before v is redefined; otherwise v is dead at p. Liveness is computed backwards: a use makes the variable live before that instruction; a definition kills liveness of the defined variable above it. Liveness drives dead code elimination (a definition of a dead variable can go) and register allocation (only live variables need registers).',
        strategy: 'Basic block counting: underline the leaders using the three rules — first instruction, every jump target, every instruction just after a jump — then count the runs between leaders. The usual mistakes are missing the instruction after a conditional jump (rule 3 applies to conditional jumps too, because control may fall through) and forgetting that a label mentioned in a goto marks its target as a leader even when the jump is backwards.\n\nTransformation identification: exam options often present four transformations and one before/after code pair. Match by signature: constants replacing expressions is folding; a variable replaced by a constant is constant propagation; reuse of an earlier computation is CSE; multiplication turned into shift or addition is strength reduction; code hoisted out of a loop is invariant motion.\n\nWorked mini-example on liveness: 1: x = a + b; 2: y = x * c; 3: x = y + d; 4: print x. Which variables are live just after line 2? Work backwards from each later use: line 4 uses x, whose value comes from line 3, so the x defined at line 1 is dead after line 2 (it is redefined at 3 before any use). Line 3 uses y and d — both live. c is used only at line 2, so it is dead after it. Live set = {y, d} (plus nothing else among the named variables). Writing the use/def chain explicitly like this avoids the trap of counting x live merely because its name appears later — what appears later is a new value of x.'
      },
      questions: [
        {
          id: 'compiler-optimization-q1',
          q: 'Which of the following correctly lists the leader rules for partitioning three-address code into basic blocks?',
          options: ['Only the targets of unconditional jumps are leaders', 'The first instruction; any target of a conditional or unconditional jump; any instruction immediately following such a jump', 'Every labeled instruction and nothing else', 'The first and last instructions of the program only'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A basic block must have a single entry at its top and a single exit at its bottom. The three leader rules guarantee this: (1) the first instruction of the program starts the first block; (2) any instruction that is the target of a jump — conditional or unconditional — can be entered from elsewhere, so it must start a block; (3) any instruction immediately after a jump begins a block, because the jump ends the previous block (a conditional jump may fall through into it, an unconditional one makes it reachable only via labels). Each block then extends from its leader up to just before the next leader. Option 2 states all three rules; the others each omit cases.'
        },
        {
          id: 'compiler-optimization-q2',
          q: 'Consider the TAC: 1: a = 0; 2: b = 1; 3: c = a + b; 4: a = b; 5: b = c; 6: if c < n goto 3; 7: print c. How many basic blocks are there?',
          options: ['2', '3', '4', '5'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Find the leaders. Rule 1: instruction 1 is a leader (first instruction). Rule 2: instruction 3 is a leader (target of the goto in line 6). Rule 3: instruction 7 is a leader (it immediately follows the conditional jump at 6). No other instruction qualifies. Blocks run from each leader to just before the next: B1 = {1, 2}, B2 = {3, 4, 5, 6}, B3 = {7}. That is 3 basic blocks, option 2. The CFG edges are B1 -> B2 (fall-through), B2 -> B2 (the backward jump when c < n), and B2 -> B3 (fall-through when the condition fails) — a single-block loop body, the shape of this Fibonacci-style computation.'
        },
        {
          id: 'compiler-optimization-q3',
          q: 'Replacing the expression 4 * 2.5 by 10.0 at compile time is an example of:',
          options: ['Strength reduction', 'Constant folding', 'Copy propagation', 'Loop unrolling'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Constant folding evaluates, during compilation, any expression whose operands are all compile-time constants, replacing the expression by its value — here 4 * 2.5 becomes the literal 10.0, so no multiplication happens at run time. Distinguish the neighbours: strength reduction keeps the computation but swaps the operator for a cheaper one (a shift for a multiply); copy propagation replaces a variable by another variable after a copy assignment; loop unrolling is a loop restructuring. Folding is often enabled by constant propagation: once x = 4 is propagated into x * 2.5 it becomes 4 * 2.5, which folding finishes. Option 2 is correct.'
        },
        {
          id: 'compiler-optimization-q4',
          q: 'Given the block: x = 3; y = x + 2; z = y * x; — after constant propagation and folding, what does z become?',
          options: ['z = y * 3 with y unknown', 'z = 15', 'z = 9', 'The optimizer cannot simplify z at all'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'trace',
          explanation: 'Apply the transformations iteratively. Constant propagation of x = 3 into the second statement gives y = 3 + 2; constant folding evaluates it to y = 5. Now y is also a known constant, so propagate both into the third statement: z = y * x becomes z = 5 * 3, and folding gives z = 15, option 2. If the results y and x are unused afterwards, dead code elimination can then delete the first two assignments entirely. The answer 9 comes from the error of propagating x into both operand positions as if the statement were z = x * x. The example shows why these optimizations run to a fixed point: each round of propagation exposes new folding opportunities, which expose new propagation opportunities.'
        },
        {
          id: 'compiler-optimization-q5',
          q: 'The difference between local and global common subexpression elimination is that:',
          options: ['Local CSE works within a single basic block; global CSE works across blocks using dataflow (available expressions) over the control flow graph', 'Local CSE is done by the linker, global CSE by the loader', 'Global CSE only handles constants, local CSE only variables', 'There is no difference; the terms are synonyms'],
          answer: 0,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The scope of reasoning differs. Local CSE examines one basic block, where instructions execute in a fixed straight-line order; building the DAG of the block automatically merges repeated computations whose operands are unchanged. Global CSE must be sure an expression is available along EVERY path reaching a point before reusing it, which requires the available-expressions dataflow analysis over the whole control flow graph — an expression is available at a point if every path from the entry computes it and no operand is redefined afterwards. Same idea, different scope and machinery, so option 1 is correct. Linkers and loaders (option 2) perform no such semantic optimization.'
        },
        {
          id: 'compiler-optimization-q6',
          q: 'Dead code elimination removes:',
          options: ['All comments from the source program', 'Instructions computing values that are never used afterwards, and code that can never be reached', 'All conditional jumps', 'Every instruction inside a loop body'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Dead code has two flavours, both safely removable because their absence cannot change observable behaviour. First, a definition x = expr where x is dead — no path uses that value before x is redefined or the program ends — computes something nobody consumes (provided expr has no side effects). Liveness analysis identifies exactly these. Second, unreachable code: instructions to which no control path leads, such as statements after an unconditional return or a branch whose condition constant-folds to false. Removing comments is the scanner’s job long before optimization, and removing jumps or loop bodies wholesale would change behaviour. Option 2 captures both flavours.'
        },
        {
          id: 'compiler-optimization-q7',
          q: 'Replacing the loop computation t = i * 4 (recomputed each iteration as i increases by 1) with an addition t = t + 4 per iteration is called:',
          options: ['Loop jamming', 'Strength reduction on an induction variable', 'Constant folding', 'Peephole jump optimization'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Both i and t here are induction variables: they change by a fixed amount each trip around the loop (i by 1, hence i*4 by 4). Strength reduction exploits this linearity to replace the multiplication — relatively expensive — by a running addition: initialize t before the loop and add 4 each iteration. The values produced are identical, but each iteration now performs a cheap + instead of a *. This is the classic loop form of strength reduction (the non-loop form replaces x * 8 with x << 3). It frequently enables induction variable elimination next: if i itself is only used to compute t and the loop bound, i can disappear entirely with the test rewritten in terms of t. Option 2 is correct.'
        },
        {
          id: 'compiler-optimization-q8',
          q: 'Inside the loop: for (i = 0; i < n; i++) { x = y + z; a[i] = x * i; } — which statement may be moved out of the loop by loop-invariant code motion, assuming y and z are not modified in the loop?',
          options: ['a[i] = x * i, because it uses x', 'x = y + z, because its operands do not change during the loop', 'The loop test i < n', 'i++, to make the loop faster'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'application',
          explanation: 'An instruction is loop invariant when every operand is either constant or defined only outside the loop (or by other invariant instructions). Here y and z are unchanged inside the loop, so x = y + z computes the same value on every iteration; hoisting it into a preheader executes it once instead of n times, preserving semantics (with the usual safety caveat that the loop executes at least once or the hoisted code is safe anyway). Option 2 is correct. The store a[i] = x * i depends on i, which changes every iteration, so it is not invariant; the loop test and the increment are the loop machinery itself and obviously vary. Spotting the invariant by checking each operand against the loop’s definitions is the whole technique.'
        },
        {
          id: 'compiler-optimization-q9',
          q: 'Code: 1: x = a + b; 2: y = x * c; 3: x = y + d; 4: print x. Which variables (among x, y, c, d) are live immediately AFTER line 2?',
          options: ['{x, y, d}', '{y, d}', '{y, c, d}', '{x, y, c, d}'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'trace',
          explanation: 'A variable is live at a point if some later use of its CURRENT value occurs before it is redefined. Check each: y is used at line 3 with the value assigned at line 2, so y is live. d is used at line 3 and defined nowhere in the fragment, so d is live. x looks live because line 4 prints it — but the x printed at line 4 is the value assigned at line 3; the value x holds after line 2 (from line 1) is overwritten at line 3 before any use, so that x is dead. c’s last use is at line 2 itself; after line 2 it is never used, so c is dead. Live set after line 2 = {y, d}, option 2. Consequence for the optimizer: nothing yet — but if line 4 were removed, line 3 would define a dead x and could itself be deleted. The name-versus-value distinction for x is the entire point.'
        },
        {
          id: 'compiler-optimization-q10',
          q: 'A variable v is said to be live at a program point p if:',
          options: ['v has been assigned a value somewhere before p', 'There exists a path from p to the exit along which v is used before being redefined', 'v appears anywhere in the program text after p', 'v is stored in a register at p'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Liveness looks forward: the value v holds at p matters iff some execution path leaving p reaches a use of v without passing a redefinition of v first — that is option 2, the textbook definition. Option 1 looks backward and describes something closer to "defined", not live. Option 3 is the classic trap: a later textual occurrence of v might be a redefinition, or might use a NEW value assigned between p and there; mere appearance does not make the current value needed. Option 4 confuses the analysis with one of its applications — register allocators keep live variables in registers, but liveness is a property of the program, computed by a backward dataflow analysis (out[B] = union of in of successors; in[B] = use[B] union (out[B] minus def[B])).'
        },
        {
          id: 'compiler-optimization-q11',
          q: 'Peephole optimization is best described as:',
          options: ['A global dataflow analysis over the entire control flow graph', 'Examining a small sliding window of adjacent instructions and replacing patterns with better sequences, e.g., removing a store immediately followed by a load of the same location', 'Renaming all variables to shorter names', 'Splitting the program into basic blocks'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Peephole optimization slides a small window (a few adjacent instructions, typically over target or near-target code) and pattern-matches locally improvable sequences: a store to x immediately followed by a load from x (delete the load); algebraic identities like x = x + 0 or x = x * 1 (delete); strength reductions like multiply-by-power-of-two into shifts; a jump to a jump (retarget the first, possibly leaving the second unreachable); unreachable code after an unconditional branch. It is deliberately myopic — no global analysis — yet repeated passes catch many inefficiencies introduced by naive code generation, and one replacement often exposes another. Option 2 with its store/load example is the definition; option 1 describes global dataflow optimization instead.'
        },
        {
          id: 'compiler-optimization-q12',
          q: 'TAC: 1: read n; 2: i = 1; 3: s = 0; 4: if i > n goto 10; 5: t = i * i; 6: if t mod 2 == 0 goto 8; 7: s = s + t; 8: i = i + 1; 9: goto 4; 10: print s. How many basic blocks does this code have?',
          options: ['4', '5', '6', '7'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Leaders: instruction 1 (first instruction); instruction 4 (target of goto at 9); instruction 5 (immediately follows conditional jump 4); instruction 7 (immediately follows conditional jump 6); instruction 8 (target of the jump at 6); instruction 10 (target of the jump at 4, and also follows jump 9). Blocks between consecutive leaders: B1 = {1,2,3}, B2 = {4}, B3 = {5,6}, B4 = {7}, B5 = {8,9}, B6 = {10} — 6 basic blocks, option 3. The mistakes that give 4 or 5: forgetting rule 3 for the instruction after a CONDITIONAL jump (5 and 7 are leaders because control may fall through into them), or missing that instruction 8 is a jump target from 6. Note 8 would be a leader for two reasons if 7 ended in a jump, but one reason suffices.'
        },
        {
          id: 'compiler-optimization-q13',
          q: 'After the copy assignment x = y, copy propagation allows subsequent uses of x to be replaced by y as long as:',
          options: ['x and y are both global variables', 'Neither x nor y is reassigned between the copy and the use', 'y is a constant', 'x is used at most once'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Copy propagation exploits that after x = y, both names hold the same value, so a use of x can read y instead. The substitution is valid only while the equality still holds at the use: if x is reassigned in between, its uses no longer mean y; if y is reassigned, y no longer holds the copied value even though x still does. Hence the condition is that neither variable is redefined on any path from the copy to the use, option 2. The payoff is indirect: after all uses of x are rewritten to y, the copy x = y defines a dead variable and dead code elimination deletes it — copy propagation is an enabling transformation. Constants are the domain of constant propagation, a sibling but distinct optimization.'
        },
        {
          id: 'compiler-optimization-q14',
          q: 'Block: t1 = a + b; t2 = a + b; c = t1 * t2. After local common subexpression elimination, copy propagation and dead code elimination, the minimum number of instructions remaining is:',
          options: ['3', '2', '1', '4'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'trace',
          explanation: 'Step 1, local CSE: t2 = a + b recomputes the expression already held by t1 with operands unchanged, so replace it by the copy t2 = t1. Code: t1 = a + b; t2 = t1; c = t1 * t2. Step 2, copy propagation: substitute t1 for t2 in its use, giving c = t1 * t1. Step 3, dead code elimination: t2 = t1 now defines a value never used — delete it. Remaining: t1 = a + b; c = t1 * t1 — 2 instructions, option 2. One instruction is impossible: the computation needs an addition and a multiplication, and each TAC instruction carries one operator. The example is the standard illustration of optimizations enabling one another: CSE creates the copy, propagation makes it dead, elimination removes it.'
        }
      ]
    }
  ]
};

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-lexical';}).questions.push(
  {
    id: 'compiler-lexical-x1',
    q: 'Which one of the following inputs, when fed to a typical C lexical analyzer, causes a lexical error (as opposed to a syntax or semantic error)?',
    options: ['if (x == y)', 'int 3abc;', 'x = 5 # y;', 'if (x >= y) then'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A lexical error occurs only when some character sequence matches no token pattern at all. In "x = 5 # y;" every symbol scans fine until #, which is not part of any C token pattern, so the scanner itself fails there — a genuine lexical error. In "int 3abc;" the scanner happily returns two valid tokens, the number 3 and the identifier abc; the failure (a number where an identifier is expected) is caught later by the parser, so it is a syntax error. "if (x == y)" tokenizes perfectly (== is a single relop token by maximal munch). "if (x >= y) then" also tokenizes fine — then is just a valid, if unusual, identifier lexeme; the error surfaces only when the parser cannot fit it into the grammar, making it a syntax error. Hence option 3 is the only lexical error.'
  },
  {
    id: 'compiler-lexical-x2',
    q: 'How many tokens does the lexical analyzer emit for the following C fragment (the comment must be discarded and contributes nothing)?\n/* update sum */ sum >= 100 ? sum : sum++;',
    options: ['8', '9', '10', '11'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The block comment is stripped entirely and contributes zero tokens. Scanning what remains left to right: sum (1, identifier), >= (2, one relop token by maximal munch), 100 (3, number), ? (4), sum (5), : (6), sum (7), ++ (8, one increment token, not two separate plus signs), ; (9). That totals 9 tokens. The two traps are treating >= as two tokens (< then =) and forgetting that ++ is a single compound operator token rather than "+" followed by "+". With both handled correctly the count is 9, option 2.'
  },
  {
    id: 'compiler-lexical-x3',
    q: 'Which of the following strings is NOT generated by the regular expression (a|b)*abb, the classic Dragon-book example used to build a keyword-recognizing DFA?',
    options: ['ababb', 'bbabb', 'ababab', 'abb'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Every string matched by (a|b)*abb must, by construction, end exactly in the three characters a, b, b, with any mixture of a and b before that suffix. Check each option: "abb" itself ends in abb (the (a|b)* part matched zero characters) — accepted. "ababb" ends in ...abb — accepted. "bbabb" ends in ...abb — accepted. "ababab" ends in ...bab, not abb, so no matter how the prefix is chosen it cannot be split so the last three characters are a, b, b — it is rejected. Hence "ababab" is the string not in the language, option 3. This regex is the canonical example used to illustrate Thompson construction followed by subset construction to a DFA.'
  },
  {
    id: 'compiler-lexical-x4',
    q: 'What is the minimum number of states in a deterministic finite automaton that accepts exactly the language of the regular expression (a|b)*abb over the alphabet {a, b}?',
    options: ['3', '4', '5', '6'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'This is the standard minimized DFA presented for (a|b)*abb: one state tracking "no useful suffix of abb seen yet" (the start state, also reached after any character that breaks the pattern except restarting on a), one state after seeing a (progress toward abb), one state after seeing ab, and one accepting state after seeing abb, from which any further a or b transitions back into the appropriate progress state. That is exactly 4 states, and it is already minimal — no two of these states are equivalent because they are distinguished by different suffixes needed to reach acceptance. Fewer than 4 states cannot distinguish "just saw a", "just saw ab", and "just accepted abb" simultaneously, so 4, option 2, is correct.'
  },
  {
    id: 'compiler-lexical-x5',
    q: 'How many tokens are produced by the lexical analyzer for the statement (the /*skip*/ comment produces no tokens)?\nx = /*skip*/ a>=b && b<=c;',
    options: ['9', '10', '11', '12'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Discard the comment first. Remaining lexemes in order: x (1, id), = (2), a (3, id), >= (4, one relop token), b (5, id), && (6, one logical-and token, not two ampersands), b (7, id), <= (8, one relop token), c (9, id), ; (10). Total = 10 tokens. The two things a careless count gets wrong are splitting >= or <= into two symbols and splitting && into two "&" tokens; maximal munch always prefers the longest matching operator, so each compound operator is exactly one token. Hence option 2.'
  },
  {
    id: 'compiler-lexical-x6',
    q: 'Applying the maximal munch rule with no whitespace, how many tokens does a C-style scanner produce for the character sequence: x<--y ;',
    options: ['3', '4', '5', '6'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Scan left to right, always taking the longest possible match at each point. At "x", the identifier token x is taken (1). At "<--y", the scanner looks at symbols starting with "<": candidates are <, <=, <<, <<=, none of which match "<--", so it commits to the single-character relop token < (2). The remaining "--y" begins with "--", the longest match is the decrement operator -- as one token (3), since a lone "-" is not preferred over the longer "--" that does match. Finally y is an identifier token (4). The trailing space and semicolon are outside the sequence being asked about here if only "x<--y" is counted, giving exactly 4 tokens: x, <, --, y. Option 2 is correct.'
  },
  {
    id: 'compiler-lexical-x7',
    q: 'Which of the following checks can a lexical analyzer, built purely from regular expressions and a finite automaton, NOT perform?',
    options: ['Recognizing which lexeme matches the keyword pattern', 'Stripping whitespace and comments from the input', 'Verifying that parentheses in the source file are properly balanced', 'Recognizing the longest valid identifier lexeme at the current position'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Finite automata recognize only regular languages, and regular languages cannot express unbounded counting or matching, which is exactly what checking balanced parentheses requires (you would need to remember an arbitrarily deep count of unmatched opens). This is a job for a pushdown automaton, i.e. the parser using a context-free grammar. In contrast, recognizing keywords, stripping whitespace and comments, and applying maximal munch to find the longest identifier are all local, boundedly-lookahead tasks well within the power of a DFA. So option 3 is the one thing scanning alone cannot guarantee.'
  },
  {
    id: 'compiler-lexical-x8',
    q: 'A lex-style scanner specification lists two rules in this order: Rule 1: a*b* and Rule 2: ab (with action A2). For the input string "ab", the scanner\'s two disambiguation rules (longest match, then earliest-listed rule on a tie) cause which rule\'s action to fire?',
    options: ['Rule 2, because ab is more specific than a*b*', 'Rule 1, because it is listed first and both rules match the same longest lexeme "ab"', 'Neither rule fires; this is reported as a lexical error', 'Both actions fire simultaneously on the same lexeme'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Both a*b* and ab can match the full string "ab" (length 2), so the longest-match rule alone cannot break the tie — both patterns match the same, longest possible lexeme. Lex-style tools then apply the second disambiguation rule: among patterns tied for longest match, the pattern appearing earliest in the specification wins, regardless of how "specific" the other pattern looks. Since Rule 1 (a*b*) is listed before Rule 2 (ab), Rule 1 fires. This is a classic gotcha: many people assume the more specific pattern automatically wins as it would in some other regex engines, but lex/flex-style longest-match scanners break ties strictly by declaration order. Hence option 2.'
  },
  {
    id: 'compiler-lexical-x9',
    q: 'How many tokens does the lexical analyzer produce for the following C statement?\nfor(i=0;i<=10;i++) sum+=arr[i];',
    options: ['18', '19', '20', '21'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'List every lexeme in order: for(1) ((2) i(3) =(4) 0(5) ;(6) i(7) <=(8) 10(9) ;(10) i(11) ++(12) )(13) sum(14) +=(15) arr(16) [(17) i(18) ](19) ;(20). Counting carefully gives exactly 20 tokens. The common miscounts come from treating <= as two tokens instead of one relop, treating ++ as two "+" tokens instead of one increment token, or treating += as two tokens instead of one compound-assignment token — each of these compound operators is exactly one token under maximal munch. With all three handled as single tokens, the total is 20, option 3.'
  },
  {
    id: 'compiler-lexical-x10',
    q: 'For the C fragment: int x, y; int z; — how many tokens belong to the identifier (id) token class?',
    options: ['2', '3', '4', '5'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The full token stream is: int(keyword), x(id), ,(punctuation), y(id), ;(punctuation), int(keyword), z(id), ;(punctuation) — 8 tokens overall. Among these, the tokens whose token class is id are x, y and z: exactly 3 identifier tokens. The keyword int appears twice but belongs to the keyword class, not id, and the commas and semicolons belong to punctuation classes. So the answer, counting only id-class tokens, is 3, option 2. This distinguishes counting total tokens from counting tokens of one particular class.'
  },
  {
    id: 'compiler-lexical-x11',
    q: 'Which regular expression over the alphabet {a, b} generates precisely the set of strings that never contain "aa" as a substring?',
    options: ['(a|b)*aa(a|b)*', '(b|ab)*(a|epsilon)', '(ab)*', 'b*ab*ab*'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Build strings with no two consecutive a\'s by choosing, from left to right, either a lone b or the block ab, any number of times, and optionally ending with one final a: this is exactly (b|ab)*(a|epsilon). Inside every "ab" block the a is immediately followed by b, so an a can never be adjacent to another a from within the star; the only other place an a can occur is the single optional trailing a, which has nothing after it. Checking the other options: (a|b)*aa(a|b)* generates strings that DO contain "aa", the opposite requirement. (ab)* forces strict alternation and misses strings like "b" or "bb". b*ab*ab*only allows exactly two a\'s, missing "b" (zero a\'s) or three-a strings like "bababa". Hence option 2 is the exact match.'
  },
  {
    id: 'compiler-lexical-x12',
    q: 'Consider the (syntactically incomplete) C fragment: main() { int x = 5 int y = 10; } — the missing semicolon after "5" causes the compiler to report:',
    options: ['A lexical error, since the scanner cannot tokenize the line', 'A syntax error, since two valid tokens appear where the grammar expects a statement terminator', 'A semantic error, since x and y have incompatible types', 'No error, since C allows implicit statement separation'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Every character in the fragment scans into a perfectly valid token: int, x, =, 5, int, y, =, 10, ;. The scanner never fails, so this cannot be a lexical error. The problem only appears when the parser tries to match the token sequence against the grammar for a declaration statement: after "int x = 5" it expects a semicolon or comma but instead sees the keyword int beginning a new declaration with no separator, which cannot be reduced by any production — a textbook syntax error. There is no type mismatch to make it semantic, and C requires an explicit semicolon, so option 2 is correct.'
  },
  {
    id: 'compiler-lexical-x13',
    q: 'For the code total = total + 1; total = total + 1; how many distinct lexeme strings (not counting repeated occurrences) appear in the token stream?',
    options: ['4', '5', '6', '7'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The full token stream, in order, is: total, =, total, +, 1, ;, total, =, total, +, 1, ; — 12 tokens in all. But the question asks for distinct lexeme strings, i.e. the set of unique character sequences that occur, which is {total, =, +, 1, ;} — exactly 5 distinct lexemes, even though total appears four times and the statement is repeated verbatim. This distinguishes "how many tokens total" (12) from "how many distinct lexemes" (5); GATE occasionally tests exactly this difference between a token instance and the lexeme class it belongs to. Option 2 is correct.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-parsing';}).questions.push(
  {
    id: 'compiler-parsing-x1',
    q: 'For the grammar S -> A B, A -> a A | epsilon, B -> b B | c, what is FOLLOW(A)?',
    options: ['{a, b, c}', '{b, c}', '{b, c, $}', '{$}'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'A occurs only on the right side of S -> A B, with B immediately following it. The rule for a production of the form X -> alpha A beta says: add FIRST(beta) minus epsilon to FOLLOW(A); additionally add FOLLOW(X) to FOLLOW(A) only if beta is nullable. Here beta = B, and FIRST(B) = {b, c} (B is never nullable since neither of its alternatives is epsilon). Because B is not nullable, FOLLOW(S) = {$} is NOT propagated into FOLLOW(A). The self-recursive production A -> a A places A at the end, contributing FOLLOW(A) to itself, which adds nothing new. Hence FOLLOW(A) = {b, c}, option 2 — the $ is a common trap that does not belong here.'
  },
  {
    id: 'compiler-parsing-x2',
    q: 'Consider the grammar S -> S + T | T, T -> id. Which statement about this grammar is correct?',
    options: ['It is LL(1) because FIRST(S) and FIRST(T) are disjoint', 'It is not LL(1) because S is left-recursive', 'It is not LL(1) because the two alternatives of S share a common prefix', 'It is LL(1) after removing the epsilon production'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A predictive (LL(1)) parser must decide which alternative to expand using only the next input symbol, before consuming anything; a left-recursive rule such as S -> S + T immediately calls S again with no token consumed, sending the parser into infinite recursion with no lookahead ever advancing. This is a structural disqualifier independent of any FIRST/FOLLOW computation: no left-recursive grammar can be LL(1). It must first be rewritten (S -> T S2, S2 -> + T S2 | epsilon) before a predictive table can be built. There is no common prefix here (S and T start differently once recursion is removed) and there is no epsilon production in the original grammar, so options 1, 3 and 4 are incorrect; option 2 correctly names the actual obstacle.'
  },
  {
    id: 'compiler-parsing-x3',
    q: 'Consider the grammar S -> a S b | a c. Why does this grammar fail to be LL(1)?',
    options: ['S is left-recursive', 'Both alternatives of S begin with the terminal a, so FIRST sets overlap and one token of lookahead cannot choose between them', 'S has an epsilon production whose FOLLOW set overlaps with FIRST', 'The grammar generates an infinite language, which LL(1) parsers cannot handle'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'FIRST(a S b) = {a} and FIRST(a c) = {a}: both alternatives of S start by consuming the terminal a, so seeing an a on the input does not tell the predictive parser which production to expand — it would need to look past the shared prefix. This is the classic "common prefix" obstruction, fixed by left factoring: rewrite as S -> a S2, S2 -> S b | c. Neither alternative is left-recursive (both begin with a terminal), there is no epsilon production here at all, and generating an infinite language is completely normal for LL(1) grammars (most useful ones do). So the correct diagnosis is option 2.'
  },
  {
    id: 'compiler-parsing-x4',
    q: 'For the augmented grammar S\' -> S, S -> C C, C -> c C | d (the canonical Dragon-book worked example), how many states are in the LR(0) (equivalently SLR(1)) canonical collection of item sets?',
    options: ['5', '6', '7', '8'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Constructing the automaton by closure and goto gives exactly seven distinct item sets: I0 = {S\'→•S, S→•CC, C→•cC, C→•d}; I1 = {S\'→S•} (accept); I2 = {S→C•C, C→•cC, C→•d} = goto(I0,C); I3 = {C→c•C, C→•cC, C→•d} = goto(I0,c); I4 = {C→d•} = goto(I0,d); I5 = {S→CC•} = goto(I2,C); I6 = {C→cC•} = goto(I3,C). Crucially, goto(I2,c) and goto(I3,c) both produce the exact same item set as I3 itself (no new state), and goto(I2,d) and goto(I3,d) both equal I4, because LR(0) items carry no lookahead to distinguish contexts. So the collection does not keep growing — it closes at exactly 7 states, option 3.'
  },
  {
    id: 'compiler-parsing-x5',
    q: 'For the same grammar S\' -> S, S -> C C, C -> c C | d, the canonical LR(1) (CLR) collection of items is known to have more states than the LR(0)/SLR(1) collection, because per-item lookaheads keep contexts separate that LR(0) would merge. If the canonical LR(1) automaton has 10 states, how many states remain after the LALR(1) construction merges states sharing the same LR(0) core?',
    options: ['10 (LALR keeps every CLR state)', '7 (matches the LR(0)/SLR(1) state count exactly)', '5 (fewer than even LR(0))', '1 (all states collapse into one)'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'By construction, LALR(1) is built by taking the canonical LR(1) collection and merging every group of states that share the same core (the same LR(0) items, ignoring lookaheads) into a single state whose lookahead sets are the union of the merged states\' lookaheads. Since the LR(0) automaton for this grammar has exactly 7 states (as derived by closure/goto), and every LR(1) state\'s core corresponds to exactly one of those 7 LR(0) states, merging by core must produce exactly 7 LALR(1) states — never more, and never fewer, than the LR(0) count. This is the general theorem "LALR(1) always has the same number of states as LR(0)/SLR(1) for the same grammar," illustrated concretely here: 10 CLR states collapse to 7. Option 2 is correct.'
  },
  {
    id: 'compiler-parsing-x6',
    q: 'The well-known grammar S -> L = R | R, L -> * R | id, R -> L is the standard textbook example used to show that:',
    options: ['The grammar is ambiguous and cannot be parsed by any LR method', 'The grammar is LALR(1) but is not SLR(1)', 'The grammar is SLR(1) but is not LALR(1)', 'The grammar is LL(1) but is not LR(1)'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'This is the canonical "L = R" assignment-statement grammar used to demonstrate the gap between SLR(1) and LALR(1). Computing FOLLOW(R) gives a set that includes "=" (because R can be reduced from L, and L can be followed by "=" in S -> L = R), which causes the SLR construction to see a spurious shift-reduce conflict in a state where reducing R -> L is only actually valid before $ or specific tokens, not before every symbol in the coarse FOLLOW(R) set. The canonical LR(1)/LALR(1) construction tracks the precise lookahead actually reachable in that specific state, which does not include "=" there, so the conflict disappears. The grammar is unambiguous and perfectly parsable by LALR(1); it simply exceeds what the cruder FOLLOW-set-based SLR(1) test can validate. Option 2 is correct.'
  },
  {
    id: 'compiler-parsing-x7',
    q: 'In the classic dangling-else grammar stmt -> if expr then stmt | if expr then stmt else stmt | other, an LALR parser state contains both a completed item stmt -> if expr then stmt . (reduce) and an item stmt -> if expr then stmt . else stmt (shift on else). To bind each else to its nearest unmatched if, the parser generator should resolve this shift-reduce conflict by:',
    options: ['Always reducing, since reduce actions are preferred by default', 'Always shifting on else, discarding the reduce action in this state', 'Reporting a compile-time ambiguity error and refusing to generate a parser', 'Reducing only when the lookahead is $, shifting otherwise'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The dangling-else grammar is genuinely ambiguous, but the desired disambiguation rule — match every else to the closest preceding unmatched if — corresponds exactly to preferring shift over reduce whenever both are available on else. If the parser reduces early (closing off the inner if without its else), the else would be forced to attach to the outer if instead, which is the wrong, less intuitive binding. Parser generators such as yacc/bison implement this by defaulting to shift on a shift-reduce conflict, which is precisely correct for dangling-else and is the standard textbook resolution; no error needs to be reported and no lookahead-based special case (option 4) is needed. Option 2 is correct.'
  },
  {
    id: 'compiler-parsing-x8',
    q: 'Given the grammar E -> E + T | T, T -> T * F | F, F -> id, what does the shape of these productions imply about the operators + and *?',
    options: ['+ and * have equal precedence and are right-associative', '* has higher precedence than +, and both operators are left-associative', '+ has higher precedence than *, and both operators are right-associative', 'Precedence cannot be inferred from a context-free grammar'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Precedence is encoded by nesting depth: * is generated deeper in the grammar (inside T, which is itself a "unit" that E is built from), so a * is always grouped with its operands before the surrounding + can apply — meaning * binds tighter, i.e. has higher precedence. Associativity is encoded by the direction of recursion: both E -> E + T and T -> T * F are LEFT-recursive, which forces expressions like a + b + c to parse as (a + b) + c and a * b * c as (a * b) * c — left associativity for both operators. This is exactly why the standard expression grammar is written this way: left recursion for left-associativity, and layering (E over T over F) for precedence. Option 2 is correct.'
  },
  {
    id: 'compiler-parsing-x9',
    q: 'For the augmented grammar S\' -> S, S -> a S | b, how many states are there in the canonical LR(0) collection of item sets?',
    options: ['4', '5', '6', '7'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Build the automaton: I0 = closure({S\'→•S}) = {S\'→•S, S→•aS, S→•b}. goto(I0,S) = {S\'→S•} = I1 (accept). goto(I0,a) = closure({S→a•S}) = {S→a•S, S→•aS, S→•b} = I2. goto(I0,b) = {S→b•} = I3. From I2: goto(I2,S) = {S→aS•} = I4; goto(I2,a) = closure({S→a•S}), which is the identical item set to I2 itself, so it is a self-loop, not a new state; goto(I2,b) = {S→b•}, identical to I3, so it reuses I3. No further new states appear. The complete collection is {I0, I1, I2, I3, I4} — exactly 5 states, option 2.'
  },
  {
    id: 'compiler-parsing-x10',
    q: 'For the grammar S -> A B c, A -> a | epsilon, B -> b | epsilon, what is FIRST(S)?',
    options: ['{a, b, c}', '{a, b}', '{a, b, c, epsilon}', '{a, c}'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'S has one production, A B c, so FIRST(S) is built by walking the right-hand side: start with FIRST(A) minus epsilon = {a}. Since A is nullable (it has an epsilon alternative), continue into the next symbol: add FIRST(B) minus epsilon = {b}. Since B is also nullable, continue further: add FIRST(c) = {c}, and because c is a terminal (never nullable), the walk stops there. Since the walk terminated at a non-nullable symbol (c) rather than falling off the end of the production, epsilon is NOT added to FIRST(S). The result is FIRST(S) = {a, b, c}, option 1. This tests correctly chaining through two nullable nonterminals before reaching a solid terminal.'
  },
  {
    id: 'compiler-parsing-x11',
    q: 'For the grammar S -> A B, A -> a A | b, B -> c B | d, what is FOLLOW(A)?',
    options: ['{c, d}', '{c, d, $}', '{a, b}', '{$}'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'A appears only in S -> A B, immediately followed by B, and also recursively at the end of A -> a A. From S -> A B: since A is not the last symbol, add FIRST(B) minus epsilon to FOLLOW(A). Neither alternative of B is epsilon (B -> c B | d), so B is not nullable, FIRST(B) = {c, d} exactly, and this is added to FOLLOW(A) without also pulling in FOLLOW(S) (that extra step only applies when the following symbols are nullable). From A -> a A, A is the last symbol, so FOLLOW(A) is added to itself, contributing nothing new. Hence FOLLOW(A) = {c, d}, option 1 — note that $ does NOT belong here because A is never the very last symbol of the sentential form derivable from S.'
  },
  {
    id: 'compiler-parsing-x12',
    q: 'The classic ambiguous grammar E -> E + E | E * E | id, with no declared precedence or associativity, causes which specific problem when an LR item-set automaton is constructed for it?',
    options: ['A reduce-reduce conflict only, never a shift-reduce conflict', 'A shift-reduce conflict, because a state can simultaneously offer to shift the next operator and to reduce the completed E on top of the stack', 'No conflict at all; ambiguity only affects LL parsers, not LR parsers', 'A lexical error, because + and * cannot both be tokenized in the same expression'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
        type: 'concept',
    explanation: 'After parsing "E + E" with a lookahead of "*" (as in id + id * id), the parser reaches a state containing both the completed item E -> E + E . (offering to reduce) and, because E can also start a new E * E, effectively a live shift possibility on the operator that follows. This is a textbook shift-reduce conflict, and it arises specifically because the grammar does not encode precedence structurally (unlike the layered E/T/F grammar) — it must be resolved externally by declaring that * binds tighter than + and that both are left-associative, exactly what yacc-style %left/%right precedence declarations are for. Ambiguity affects both LL and LR parsing equally (an ambiguous grammar cannot be strictly LL(1) or LR(k) either), so option 3 is false, and there is no lexical issue. Option 2 is correct.'
  },
  {
    id: 'compiler-parsing-x13',
    q: 'For the (deliberately ambiguous) grammar S -> A | B, A -> a, B -> a, which LL(1) parsing table cell exposes a conflict?',
    options: ['M[A, a] only', 'M[S, a], because both S -> A and S -> B would be placed in this same cell', 'M[B, a] only', 'There is no conflict; the grammar is LL(1)'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'FIRST(A) = {a} and FIRST(B) = {a}, since both simply derive the terminal a. For the LL(1) table, production S -> A is entered into M[S, t] for every t in FIRST(A), i.e. M[S, a]; production S -> B is entered into M[S, t] for every t in FIRST(B), which is again just M[S, a]. Both productions land in the exact same table cell, meaning the parser cannot decide which one to use on seeing an a — a direct LL(1) conflict (in fact the grammar is ambiguous, since "a" has two distinct derivations from S). The individual rules A -> a and B -> a themselves cause no conflict in their own table rows, since each nonterminal has only one alternative. Option 2 correctly names the conflicting cell.'
  },
  {
    id: 'compiler-parsing-x14',
    q: 'The production pair E -> T ^ E | T, used for an exponentiation operator ^, is written with right recursion instead of left recursion. What does this imply about ^?',
    options: ['^ is left-associative, matching typical arithmetic operators', '^ is right-associative, so a ^ b ^ c groups as a ^ (b ^ c)', 'The grammar is ambiguous regardless of recursion direction', 'Right recursion makes the grammar unusable by any parser'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Associativity is read off the direction of recursion in the grammar: a right-recursive rule E -> T ^ E nests new expansions on the right, forcing a string like a ^ b ^ c to derive as a ^ (b ^ c) — right associativity — which correctly matches how exponentiation is conventionally evaluated (2^2^3 = 2^(2^3), not (2^2)^3). This mirrors, in reverse, why left recursion (E -> E + T) produces left-associative operators. Right recursion is perfectly usable by both LL and LR parsers (LL parsers in fact often prefer it, since left recursion must be eliminated for them anyway); it is not inherently a source of ambiguity. Option 2 is correct.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-sdt';}).questions.push(
  {
    id: 'compiler-sdt-x1',
    q: 'Given the synthesized SDD: E -> E1 + T {E.val = E1.val + T.val}; E -> T {E.val = T.val}; T -> T1 * F {T.val = T1.val * F.val}; T -> F {T.val = F.val}; F -> digit {F.val = digit.lexval}. What value does E.val take for the input string 3+4*2?',
    options: ['14', '11', '10', '24'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'This SDD mirrors the usual expression grammar, so it respects operator precedence exactly as the grammar layering enforces (T handles multiplication before it can be combined by an E-level addition). Parsing 3+4*2 the reduction sequence computes F.val=4, F.val=2, T.val = T1.val * F.val = 4*2 = 8 for the "4*2" part, and separately F.val = T.val = 3 for the leading 3. Then the top rule computes E.val = E1.val + T.val = 3 + 8 = 11. Adding 3 and 4 first (giving 7, then 7*2=14) would be the wrong answer that ignores precedence, so option 1 is a distractor for people who evaluate strictly left to right; the correct value honoring precedence is 11, option 2.'
  },
  {
    id: 'compiler-sdt-x2',
    q: 'Given the left-recursive SDD: E -> E1 + T {E.val = E1.val + T.val}; E -> E1 - T {E.val = E1.val - T.val}; E -> T {E.val = T.val}; T -> digit {T.val = digit.lexval}. What is E.val for the input 9-5+2?',
    options: ['6', '2', '12', '-6'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Because both + and - are introduced by left-recursive productions at the same grammar level, the operators are left-associative and are applied strictly left to right in the order they appear, exactly as ordinary arithmetic notation intends: 9-5+2 must be read as (9-5)+2, not 9-(5+2). Evaluating left to right: first E.val = 9 - 5 = 4 (using the E -> E1 - T rule), then that result is combined with the next term: E.val = 4 + 2 = 6 (using the E -> E1 + T rule). The wrong grouping 9-(5+2) would give 9-7=2, which is option 2, a classic trap for anyone who evaluates the rightmost operator first. The correctly left-associated value is 6, option 1.'
  },
  {
    id: 'compiler-sdt-x3',
    q: 'In the classic declaration SDD: D -> T L {L.in = T.type}; T -> int {T.type = integer}; T -> float {T.type = float}; L -> L1, id {L1.in = L.in; addtype(id.entry, L.in)}; L -> id {addtype(id.entry, L.in)} — the attribute L.in is best classified as:',
    options: ['A synthesized attribute of L, computed from its children', 'An inherited attribute of L, whose value flows down from the parent production D -> T L', 'A synthesized attribute of D', 'Neither synthesized nor inherited, since it is used only as a side effect'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'An attribute is inherited when its value is defined using attributes of the parent node or of siblings to its left, rather than being computed bottom-up from its own children. Here L.in is set by the rule attached to D -> T L using T.type, which comes from the sibling T positioned before L in the same production — this is exactly the defining pattern of an inherited attribute flowing "down and across" the parse tree. It is then further passed down inherited-style to L1.in in the recursive rule. It is not synthesized because L\'s own value is not built up from computations performed at or below L in the tree; it is handed to L from outside. Option 2 is correct.'
  },
  {
    id: 'compiler-sdt-x4',
    q: 'A synthesized attribute at a parse-tree node is one whose value is computed:',
    options: ['From the attribute values of that node\'s children (or the node\'s own lexical value), never from its parent or siblings', 'From the attribute values of the node\'s parent only', 'From the attribute values of the node\'s siblings to its right only', 'Independently of the parse tree, from global variables only'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'By definition, a synthesized attribute of a nonterminal A at a production A -> X1 X2 ... Xn is computed purely from the attribute values of X1 through Xn (its children in the parse tree) and possibly A\'s own terminal/lexical information, never from A\'s parent or from nodes elsewhere in the tree. This makes synthesized attributes natural to evaluate bottom-up, exactly matching the order in which a bottom-up (LR) parser reduces handles, which is why S-attributed definitions integrate so cleanly with bottom-up parsing using a single semantic value stack. Inherited attributes, by contrast, pull information from the parent or left siblings. Option 1 correctly captures the synthesized case.'
  },
  {
    id: 'compiler-sdt-x5',
    q: 'A syntax-directed definition is called L-attributed if, for every production A -> X1 X2 ... Xn, each inherited attribute of Xi depends only on:',
    options: ['Attributes of Xi\'s own children', 'Inherited attributes of A, and any attributes (inherited or synthesized) of X1, ..., Xi-1 — symbols strictly to its left, never to its right', 'Synthesized attributes of Xi+1, ..., Xn only', 'Global attributes shared across the entire parse tree'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The L-attributed restriction is designed so that attributes can be evaluated in a single left-to-right, depth-first pass over the parse tree (the same order a top-down or one-pass translator naturally visits nodes). It permits an inherited attribute on Xi to depend on the inherited attributes of the parent A and on any attribute of symbols appearing before Xi in the production (X1 through Xi-1), but forbids dependence on symbols to its right (Xi+1 onward), since those have not been processed yet in a left-to-right pass. Every S-attributed grammar is automatically L-attributed (since synthesized-only definitions have no inherited attributes to restrict), but not every L-attributed grammar is S-attributed. Option 2 is the precise definition.'
  },
  {
    id: 'compiler-sdt-x6',
    q: 'A translation scheme for converting infix to postfix uses: E -> E1 + T {print(\'+\')}; E -> T; T -> id {print(id.name)}. If the actions execute in the order the corresponding productions are reduced, what is printed for the input a+b+c?',
    options: ['ab+c+', 'abc++', 'a+b+c', '++abc'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Because + is left-associative here, a+b+c parses as (a+b)+c. Trace the reductions in order: first T->id for a prints "a"; the rule E->T makes this the current E. Next T->id for b prints "b" (output so far "ab"), and then the completed E1+T reduces, printing "+" (output "ab+") for the inner (a+b). That result becomes the new E1. Then T->id for c prints "c" (output "ab+c"), and the outer E1+T reduces, printing the final "+" (output "ab+c+"). This left-to-right, innermost-first firing of print actions is exactly why this translation scheme correctly converts infix to postfix. Option 1 is correct.'
  },
  {
    id: 'compiler-sdt-x7',
    q: 'Extend the same style of infix-to-postfix translation scheme to include multiplication, respecting precedence: E -> E1 + T {print(\'+\')} | T; T -> T1 * F {print(\'*\')} | F; F -> id {print(id.name)}. What is printed for the input a*b+c*d?',
    options: ['a*b+c*d', 'ab*cd*+', 'abcd*+*', '+*ab*cd'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The grammar forces a*b and c*d to each be fully reduced to a T (hence a completed subexpression) before the outer + can combine them, matching normal precedence. Trace the left subexpression a*b: F->id(a) prints "a"; F->id(b) prints "b"; then T->T1*F reduces and prints "*", giving "ab*" so far. Trace the right subexpression c*d identically: prints "c", then "d", then the T reduction prints "*", extending the output to "ab*cd*". Finally the outermost E->E1+T reduces and prints "+", giving the final output "ab*cd*+" — exactly the postfix form of a*b+c*d, where each operator appears immediately after both of its operands have been fully emitted. Option 2 is correct.'
  },
  {
    id: 'compiler-sdt-x8',
    q: 'Using the classic declaration SDD (D -> T L {L.in = T.type}; L -> L1, id {L1.in = L.in; addtype(id.entry, L.in)} | id {addtype(id.entry, L.in)}) for the source line "int x, y, z;", how many times is the addtype procedure invoked while processing this one declaration?',
    options: ['1', '2', '3', '4'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The identifier list L expands to match "x, y, z" via two applications of L -> L1, id (peeling off z then y) and one application of the base case L -> id (matching x). Every single one of these three alternatives — the base case and both recursive cases — calls addtype exactly once, each time entering the currently inherited type (integer, propagated down from T.type through the chain of L.in assignments) against one identifier\'s symbol table entry. Since there are exactly three identifiers in the list (x, y, z), addtype is called exactly 3 times, once per identifier, regardless of how deep the recursive L expansion goes. Option 3 is correct.'
  },
  {
    id: 'compiler-sdt-x9',
    q: 'Which of the following statements about evaluating attributes in a general (not necessarily S- or L-attributed) syntax-directed definition is TRUE?',
    options: ['Attributes can always be evaluated in a single left-to-right depth-first pass, regardless of the dependency structure', 'A valid evaluation order must be some topological sort of the dependency graph induced by the semantic rules on the parse tree; if that graph has a cycle, no evaluation order exists', 'Inherited attributes are always evaluated before synthesized attributes at every node', 'Attribute evaluation order is irrelevant as long as every rule eventually fires once'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'A general SDD lets each semantic rule define one attribute in terms of others, forming a dependency graph over all attribute instances in a specific parse tree. An attribute can only be computed once every attribute it depends on has already been computed, so any legal evaluation order must be a topological sort of this graph. If the dependency graph contains a cycle, the SDD is simply not well-defined for that tree — no evaluation order can satisfy all the dependencies, and the SDD is rejected as circular. A single left-to-right depth-first pass only suffices for the restricted L-attributed class, not for arbitrary SDDs, and there is no universal rule about inherited attributes always preceding synthesized ones — the correct order depends entirely on the actual dependency graph. Option 2 correctly states the general principle.'
  },
  {
    id: 'compiler-sdt-x10',
    q: 'Given the synthesized SDD: L -> L1, id {L.count = L1.count + 1}; L -> id {L.count = 1}, used to count identifiers in a list, what is L.count for the input a, b, c, d?',
    options: ['3', '4', '5', '1'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The base case L -> id fires once, on the very first identifier a, setting count = 1. Each subsequent identifier is attached via the recursive rule L -> L1, id, which simply adds 1 to the count already accumulated by the smaller list L1. Starting from a (count 1), adding b gives 2, adding c gives 3, and adding d gives 4. Since the input a, b, c, d has exactly 4 identifiers total, and each one contributes exactly +1 to the running synthesized count (with the very first one contributing the initial 1), the final L.count correctly equals 4, matching the identifier count exactly. Option 2 is correct.'
  },
  {
    id: 'compiler-sdt-x11',
    q: 'Consider a hypothetical SDD with the production A -> B C, where the semantic rule sets B.in = f(C.s) — that is, the inherited attribute of B is defined using the synthesized attribute of C, the symbol to its right in the same production. This SDD is:',
    options: ['L-attributed, since B and C are both children of A', 'Not L-attributed, because B\'s inherited attribute depends on C, which lies to the right of B in the production', 'S-attributed, since C.s is a synthesized attribute', 'Automatically circular and therefore invalid for any input'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The L-attributed restriction specifically requires that an inherited attribute of any symbol Xi in a production depend only on the inherited attributes of the left-hand side and on attributes (of any kind) of symbols strictly to Xi\'s left — X1 through Xi-1. Here B is X1 (leftmost) and C is X2, so B\'s inherited attribute is not permitted to depend on anything belonging to C, since C comes after B. This dependency violates the L-attributed condition outright, even though it does not necessarily make the SDD circular on any particular tree (B.in and C.s could still be computed without a cycle, just not in a single left-to-right depth-first pass). It is also not S-attributed, since B.in is inherited, not synthesized. Option 2 correctly identifies the violation.'
  },
  {
    id: 'compiler-sdt-x12',
    q: 'Given the left-recursive SDD: E -> E1 / T {E.val = E1.val / T.val}; E -> T {E.val = T.val}; T -> digit {T.val = digit.lexval}, what is E.val for the input 16/4/2 (using integer division)?',
    options: ['2', '8', '32', '4'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Division introduced through left recursion is left-associative, so 16/4/2 must be evaluated as (16/4)/2, not 16/(4/2). Following the reduction order dictated by the left-recursive rule: first E.val = 16/4 = 4 (via the leftmost E1/T application), and this intermediate E becomes the new E1 for the next reduction, giving E.val = 4/2 = 2. The alternative right-associated grouping 16/(4/2) = 16/2 = 8 (option 2) is the classic trap for anyone who evaluates the rightmost operation first, but that grouping is not what a left-recursive grammar produces. The correctly left-associated result is 2, option 1.'
  },
  {
    id: 'compiler-sdt-x13',
    q: 'S-attributed syntax-directed definitions (those using only synthesized attributes) are especially convenient to implement because their attribute values can be computed:',
    options: ['Only with a two-pass tree-walking interpreter', 'Naturally during bottom-up (LR) parsing, by attaching values to a semantic value stack alongside the parser stack and computing each value at the moment its production is reduced', 'Only by first building a fully inherited attribute dependency graph', 'Only during top-down predictive parsing, never during bottom-up parsing'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Because every synthesized attribute of A is computed purely from the attributes of A\'s children, and a bottom-up (LR-family) parser completes (reduces) a production only after all of its right-hand-side symbols have already been fully parsed and their attributes computed, the value for A can be computed exactly at the moment of reduction, using values already sitting on a parallel semantic value stack. This is precisely how yacc/bison-style actions ($$ = $1 + $3, for instance) are implemented in practice, requiring no separate tree-building or dependency-graph pass. It is not restricted to top-down parsing at all — in fact, S-attributed definitions are the natural fit for bottom-up parsing specifically. Option 2 is correct.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-icg';}).questions.push(
  {
    id: 'compiler-icg-x1',
    q: 'If a simple one-pass code generator (with no common subexpression elimination) translates a = b*c + b*c into three-address code, how many TAC instructions are generated in total, including the final assignment to a?',
    options: ['3', '4', '5', '6'],
    answer: 1,
    marks: 2,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Without any optimization, the generator translates each occurrence of b*c independently, since it has no memory of having already computed it: t1 = b * c (first occurrence); t2 = b * c (second occurrence, recomputed from scratch); t3 = t1 + t2 (the addition); a = t3 (the assignment). That is exactly 4 instructions. A naive one-pass generator has no way to notice that t1 and t2 compute the identical value from unchanged operands — that recognition is precisely what common subexpression elimination adds on top of this baseline. Option 2 is correct.'
  },
  {
    id: 'compiler-icg-x2',
    q: 'If the code generator instead builds a DAG for the expression a = b*c + b*c and generates code from the DAG (so the repeated subexpression b*c is computed once), how many TAC instructions are generated?',
    options: ['2', '3', '4', '5'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'A DAG for b*c + b*c has only one interior node for the multiplication b*c, since both occurrences are structurally identical with unchanged operands and therefore collapse onto the same shared node; the addition node then has this single multiplication node as BOTH of its operands. Generating code from this DAG requires only: t1 = b * c (computed once, for the single shared node); t2 = t1 + t1 (the addition, reusing t1 for both operands); a = t2. That is exactly 3 instructions, one fewer than the naive 4-instruction version, illustrating exactly how DAG-based code generation automatically achieves common subexpression elimination for free. Option 2 is correct.'
  },
  {
    id: 'compiler-icg-x3',
    q: 'How many distinct nodes does the DAG for the expression x = (p+q) * (p+q) + (p+q) contain?',
    options: ['4', '5', '6', '7'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'The subexpression p+q occurs three times with identical, unchanged operands, so a DAG represents it with exactly ONE shared interior node, reused by every occurrence. Enumerate the distinct nodes needed: two leaves (p and q), one "+" node for p+q (shared by all three uses), one "*" node whose both operand edges point to that same shared "+" node (representing the multiplication), and one final "+" node combining the multiplication result with the shared p+q node again (representing the outermost addition). That totals 5 distinct nodes: p, q, the shared +, the *, and the outer +. The identifier x is simply attached as a label on the outer + node, not a separate node. Option 2 is correct.'
  },
  {
    id: 'compiler-icg-x4',
    q: 'For the same expression x = (p+q) * (p+q) + (p+q), counting each operand link as a separate directed edge (so a node used twice by the same parent contributes two edges), how many edges does the DAG have?',
    options: ['4', '5', '6', '7'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Using the 5-node DAG from this expression (leaves p, q; shared node N3 = p+q; N4 = N3*N3; N5 = N4+N3), count every operand edge: N3 has two edges, to p and to q (2 edges). N4 has two edges, both pointing to N3 — one for each operand position of the multiplication, counted as two distinct edges even though they share a target (2 edges). N5 has two edges, one to N4 and one to N3 (2 edges). Summing 2+2+2 gives exactly 6 edges. This is a common trap: students sometimes count shared-target edges only once, arriving at 5 instead of the correct 6. Option 3 is correct.'
  },
  {
    id: 'compiler-icg-x5',
    q: 'In the triples representation of three-address code (each record storing only op, arg1, arg2, with no explicit result field), a later instruction refers to the result of an earlier operation by:',
    options: ['Naming a compiler-generated temporary variable such as t1', 'Giving the position (index) of the triple that computed that result, used as an implicit pointer to it', 'Repeating the entire earlier expression inline', 'Looking it up in the symbol table under a generated label'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The defining difference between quadruples and triples is exactly this: quadruples give every operation an explicit named or numbered result field (a temporary such as t1) that can be referenced independently of where the instruction sits in the list, whereas triples avoid naming temporaries at all and instead let a later triple\'s argument simply be a reference to the position (index) of the triple that produced the needed value — essentially "the value computed by instruction number k." This saves space (no symbol table entries for throwaway temporaries) but makes triples awkward to rearrange, since moving a triple changes its index and breaks every reference to it. Option 2 correctly describes this positional referencing scheme.'
  },
  {
    id: 'compiler-icg-x6',
    q: 'Indirect triples improve on plain triples specifically by:',
    options: ['Eliminating the need for a result field entirely, same as plain triples', 'Adding a separate list of pointers to the triples in the desired execution order, so that optimizations reordering or deleting statements only need to edit this pointer list, leaving the triples themselves untouched', 'Storing three operands per instruction instead of two', 'Removing the need for an operator field in each record'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Plain triples suffer because references between instructions are by position in the triple table, so reordering instructions during optimization (code motion, dead code removal, instruction scheduling) would silently break every reference that pointed to a moved triple\'s old position. Indirect triples fix this by introducing an extra level of indirection: a separate array of pointers into the (now immutable in position) triple table, and this pointer array — not the triples themselves — determines execution order. An optimizer can freely reorder, insert, or delete entries in the pointer list without touching the underlying triples or invalidating any existing intra-triple references. This is the specific benefit indirect triples add. Option 2 is correct.'
  },
  {
    id: 'compiler-icg-x7',
    q: 'In the backpatching technique for generating jump code for Boolean expressions without allocating explicit temporaries for true/false values, the truelist and falselist maintained for each subexpression serve to:',
    options: ['Store the runtime boolean values 1 and 0 for later use', 'Hold the list of generated jump instructions whose target label is not yet known, so the correct target address can be filled in (patched) once it becomes known later in code generation', 'Record which variables are live across the boolean expression', 'List the identifiers used inside the condition, for symbol table lookup'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Backpatching exists to avoid generating a separate label-defining pass or explicit boolean-valued temporaries: as jump instructions (like "if a<b goto _" or "goto _") are emitted, their target field is deliberately left unfilled because the correct destination (e.g., the start of the true branch, or the instruction after the whole statement) has not been generated yet. Each such incomplete instruction\'s address is recorded in a truelist (jumps to take when the condition is true) or falselist (jumps to take when false). Once the actual target address is known — for instance, once code generation reaches the point that should be jumped to — every instruction number in the appropriate list is "backpatched" with that address in one pass. Option 2 correctly describes this bookkeeping role.'
  },
  {
    id: 'compiler-icg-x8',
    q: 'Using Sethi-Ullman register labeling (label(leaf) = 1; for an interior node with children of equal label k, parent label = k+1; for unequal labels, parent label = the larger of the two), what is the minimum number of temporary registers needed to evaluate (a+b)*(c+d) - (e+f)*(g+h) with an optimal evaluation order?',
    options: ['2', '3', '4', '5'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'All eight leaves (a through h) have label 1. Each of the four "+" nodes (a+b), (c+d), (e+f), (g+h) combines two label-1 children of EQUAL label, so each gets label 1+1 = 2. The left multiplication (a+b)*(c+d) combines two label-2 children, again equal, giving label 2+1 = 3; the right multiplication (e+f)*(g+h) similarly gets label 3. Finally the root subtraction combines two label-3 children, equal again, giving label 3+1 = 4. This label is exactly the minimum number of registers needed when the larger (or, on ties, either) subtree is evaluated first so its registers can be freed and reused before evaluating the sibling subtree. Hence the minimum is 4 registers, option 3.'
  },
  {
    id: 'compiler-icg-x9',
    q: 'How many three-address instructions (assuming indexed array-element addressing is directly available, so a[i] is fetched or stored in one instruction) are needed to translate a[i] = b[i] + c[i] * d[i]?',
    options: ['4', '5', '6', '7'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Respecting precedence, the multiplication c[i]*d[i] must be computed before the addition. Step by step: t1 = c[i] (fetch, 1); t2 = d[i] (fetch, 2); t3 = t1 * t2 (multiply, 3); t4 = b[i] (fetch, 4); t5 = t4 + t3 (add, 5); a[i] = t5 (store, 6). That is exactly 6 instructions. This assumes the simplifying convention (common in introductory TAC generation) that indexed loads/stores like x[i] are single TAC operations rather than being further decomposed into explicit address arithmetic (offset multiplication and base-plus-offset computation); if address arithmetic were expanded explicitly the count would be higher. Under the stated assumption, option 3 is correct.'
  },
  {
    id: 'compiler-icg-x10',
    q: 'Compared to a triples-based intermediate representation, a quadruples-based representation is easier for an optimizer to freely reorder, delete, or duplicate statements in, mainly because:',
    options: ['Quadruples always require fewer instructions for the same expression', 'Each quadruple names its result with an explicit temporary (e.g. t5), so other instructions reference that name rather than a table position, and moving the instruction around does not break any reference to its result', 'Quadruples do not use temporary variables at all', 'Quadruples are always stored in a different memory segment than the code being optimized'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'The whole point of an explicit result field (a symbolic temporary name) in quadruples is that it decouples "what value is being referred to" from "where in the instruction list that value happened to be computed." Since other instructions refer to t5 by name, not by "the result of instruction number k," an optimizer is free to relocate, duplicate, or delete the instruction that defines t5 (as long as some definition of t5 still reaches each use) without needing to renumber or fix up any other instruction. Triples lack this decoupling because a reference IS a table position, making rearrangement fragile unless the extra indirection of indirect triples is added. Quadruples do not inherently need fewer instructions; the count depends purely on the expression. Option 2 is correct.'
  },
  {
    id: 'compiler-icg-x11',
    q: 'For the backpatching translation of E -> E1 || M E2 (where the marker nonterminal M records M.instr = the label of the next instruction to be generated, right before E2\'s code), which set of semantic actions is standard and correct?',
    options: ['backpatch(E1.truelist, M.instr); E.falselist = merge(E1.falselist, E2.falselist); E.truelist = E2.truelist', 'backpatch(E1.falselist, M.instr); E.truelist = merge(E1.truelist, E2.truelist); E.falselist = E2.falselist', 'backpatch(E2.falselist, M.instr); E.truelist = E1.truelist; E.falselist = merge(E1.falselist, E2.falselist)', 'No backpatching is needed for ||, since both operands always fall through sequentially'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'For OR, if E1 is true the whole expression E is already true, so E1\'s true-exits should join E\'s true-exits directly — no jump to E2\'s code is needed for that case. Only if E1 turns out false must control fall through into evaluating E2, which is exactly why E1.falselist gets backpatched to M.instr, the address where E2\'s code begins. Since E is true whenever either E1 or E2 is true, E.truelist is the merge of both operands\' truelists. Since E is false only when both are false, and E1-false control has already been redirected into E2, the only remaining false exits belong to E2, so E.falselist = E2.falselist. This is exactly the rule in option 2, the textbook-standard short-circuit OR translation.'
  },
  {
    id: 'compiler-icg-x12',
    q: 'A straightforward one-pass TAC generator (no register/temporary reuse across independent subexpressions) translates a*b + c*d - e*f into three-address code, introducing one fresh temporary per operation. How many temporaries (and hence how many TAC instructions) are generated in total?',
    options: ['3', '4', '5', '6'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The expression has exactly five binary operations: two multiplications forming the terms, and two more operations (an addition and a subtraction) combining them left to right, since + and - are left-associative at the same precedence level: ((a*b) + (c*d)) - (e*f). A naive one-pass generator with no reuse allocates one new temporary per operation: t1 = a*b; t2 = c*d; t3 = t1+t2; t4 = e*f; t5 = t3-t4. That is exactly 5 temporaries and 5 instructions. This naive count (5) is deliberately larger than the Sethi-Ullman-optimal register count for a similarly structured expression, illustrating the difference between "one temporary per operation" generation and register-reuse-optimized generation. Option 3 is correct.'
  },
  {
    id: 'compiler-icg-x13',
    q: 'A key structural limitation of plain (direct) triples, which indirect triples and quadruples both avoid, is that:',
    options: ['Triples cannot represent binary operators, only unary ones', 'A reference to an earlier triple\'s result is tied to that triple\'s position in the table, so relocating the triple during optimization silently breaks every instruction that referenced it by position', 'Triples require twice as much memory as quadruples for every instruction', 'Triples cannot be used for arithmetic expressions, only for control flow'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Because a triple has no explicit named result field, later instructions refer to "the value computed by triple number k" using k itself as the reference. This works fine as long as the triple table order never changes, but the moment an optimization pass reorders, inserts, or removes triples (which is exactly what optimizations like code motion or dead-code elimination need to do), every numeric reference that pointed at a moved triple\'s old slot becomes wrong. Indirect triples solve this with an extra pointer array that can be freely edited instead of the triples themselves, and quadruples sidestep the issue entirely by giving each result a name-based rather than position-based identity. Triples are perfectly capable of representing binary operators and arithmetic; that is not the limitation. Option 2 is correct.'
  },
  {
    id: 'compiler-icg-x14',
    q: 'Building a DAG (rather than a plain syntax tree) for a basic block during intermediate code generation automatically exposes which optimization opportunity within that block?',
    options: ['Loop-invariant code motion', 'Common subexpression elimination, since two computations of the same expression over unchanged operands collapse onto a single shared node', 'Global register allocation across the whole procedure', 'Elimination of unreachable basic blocks'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A syntax tree gives every occurrence of a subexpression its own separate subtree, even when two occurrences are textually and semantically identical (same operator, same operands, no intervening redefinition). A DAG instead merges any two nodes that compute the same value from the same, still-valid operands into a single shared node, so the operation is represented (and, downstream, computed) only once no matter how many times it textually appears in the block. This is precisely local common subexpression elimination, and it falls out automatically from the DAG construction algorithm rather than needing a separate analysis pass. Loop-invariant motion and global register allocation require information beyond a single basic block, and unreachable-block elimination is a control-flow-level optimization, not a local DAG property. Option 2 is correct.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-runtime';}).questions.push(
  {
    id: 'compiler-runtime-x1',
    q: 'Consider: int x = 1; void p() { print(x); } void q() { int x = 2; p(); } void main() { q(); }. What does the call to q() print under static (lexical) scoping, and what would it print under dynamic scoping?',
    options: ['Static: 1, Dynamic: 2', 'Static: 2, Dynamic: 1', 'Static: 1, Dynamic: 1', 'Static: 2, Dynamic: 2'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Under static scoping, the free variable x inside p is resolved using where p is textually DEFINED, not who calls it: since p is written at the top level, its x always refers to the global x = 1, no matter that q happens to call it — so static scoping prints 1. Under dynamic scoping, the free variable x inside p is resolved by searching the runtime call chain for the most recently created, still-active binding of x: the call sequence is main -> q -> p, and q has just declared its own local x = 2 which is still on the stack when p executes, so dynamic scoping finds and uses q\'s x = 2, printing 2. This pair (1 for static, 2 for dynamic) is exactly option 1, and is the classic minimal example distinguishing the two scoping disciplines.'
  },
  {
    id: 'compiler-runtime-x2',
    q: 'Consider: int x = 5; void r() { print(x); } void s() { int x = 10; r(); } void t() { int x = 20; s(); } void main() { t(); }. What does main() print under static scoping, and under dynamic scoping?',
    options: ['Static: 5, Dynamic: 10', 'Static: 20, Dynamic: 5', 'Static: 5, Dynamic: 20', 'Static: 10, Dynamic: 5'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Static scoping again resolves r\'s free x by where r is textually defined — at the top level — so it always refers to the global x = 5, regardless of the three-deep call chain main -> t -> s -> r; static scoping prints 5. Dynamic scoping instead walks the call chain backward from r looking for the nearest active binding: r itself declares no x, so look at its immediate caller s, which HAS an active local x = 10 — the search stops there and does not need to continue further back to t\'s x = 20, because s\'s binding is found first (nearer in the dynamic call chain). So dynamic scoping prints 10, not 20 — a common trap is assuming the outermost or first-declared shadowing variable wins, but dynamic scoping always uses the NEAREST active binding on the call stack. Option 1 (Static: 5, Dynamic: 10) is correct.'
  },
  {
    id: 'compiler-runtime-x3',
    q: 'In an activation record, the field commonly called the access link (or static link) is used to:',
    options: ['Point to the activation record of the procedure that directly called this one, so control can return there', 'Point to the activation record of the lexically (textually) enclosing procedure invocation, enabling correct resolution of non-local variables under static scoping regardless of the actual call chain', 'Store the return address in the calling procedure\'s code', 'Hold the saved values of machine registers to be restored on return'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Static scoping requires resolving a non-local variable reference by following lexical nesting, not the call chain — and the call chain and lexical nesting can differ whenever a procedure is called from somewhere other than its lexically enclosing procedure. The access link (static link) solves this: it always points to the activation record of the most recent invocation of the procedure that lexically encloses the current one, so following a fixed number of access links (equal to the difference in nesting depth) always lands on the correct enclosing scope\'s data, independent of who actually called whom. Pointing to the caller\'s activation record for control-flow purposes is instead the job of the control link (dynamic link), and register-save duties belong to the saved-machine-status field. Option 2 is correct.'
  },
  {
    id: 'compiler-runtime-x4',
    q: 'In an activation record, the control link (dynamic link) is used to:',
    options: ['Point to the activation record of the lexically enclosing procedure, for non-local variable access', 'Point to the activation record of the caller, so that the callee\'s activation record can be popped and control (and the stack) correctly returned to the caller on exit', 'Store the values of all actual parameters', 'Hold a pointer used only by garbage collection to trace live heap objects'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'The control link records exactly who called this procedure, i.e. it points to the caller\'s activation record on the runtime stack. This is what lets the runtime system, upon the callee\'s return, restore the stack pointer to the caller\'s frame and resume execution at the correct point in the caller — it is purely about the dynamic call sequence, unrelated to lexical structure. This is different from the access/static link, which serves lexical (non-local variable) resolution and may point somewhere completely different from the immediate caller when the call chain does not mirror the lexical nesting. Parameters have their own dedicated area, and control links have nothing to do with garbage collection. Option 2 is correct.'
  },
  {
    id: 'compiler-runtime-x5',
    q: 'For a language with statically nested procedures, an alternative to following a chain of access (static) links to reach an enclosing scope is to maintain a "display": what is a display?',
    options: ['A symbol table sorted by variable name for fast lookup', 'An array indexed by lexical nesting depth, where entry k holds a pointer to the activation record of the most recent invocation of the procedure currently active at nesting depth k, giving O(1) access to any enclosing scope', 'A visual debugger window showing the current call stack', 'A cache of the most recently computed expression values, used to avoid recomputation'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Following a static-link chain to reach a variable declared k lexical levels up costs k pointer dereferences, which can be slow for deeply nested procedures accessed frequently. A display trades a small amount of bookkeeping on every call/return for constant-time non-local access: it is simply an array where display[k] always points to the activation record of whichever invocation is currently the "active" one at nesting depth k. On a call, the display entry for the callee\'s nesting depth is updated (saving the old value to be restored on return), so at any moment, resolving a variable declared at depth k is a single array lookup rather than a chain walk. None of the other options describe this mechanism. Option 2 is correct.'
  },
  {
    id: 'compiler-runtime-x6',
    q: 'Consider: void swap(int a, int b) { int t = a; a = b; b = t; } void main() { int x = 1, y = 2; swap(x, y); print(x, y); }. What does main() print if parameters are passed by value, and what would it print if passed by reference instead?',
    options: ['By value: x=1, y=2 (unchanged); By reference: x=2, y=1 (swapped)', 'By value: x=2, y=1; By reference: x=1, y=2', 'Both by value and by reference print x=2, y=1', 'Both by value and by reference print x=1, y=2'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Under call by value, swap receives independent copies of x and y\'s values; the local variables a and b inside swap are swapped, but this has no effect whatsoever on the caller\'s x and y, which remain x=1, y=2 after the call — a very common misconception is that swap "works" here, but it provably cannot under pure call by value. Under call by reference, a and b are aliases (bound to the same storage locations) as x and y themselves, so assigning to a and b directly modifies x and y; the body\'s sequence (t=a so t=1; a=b so x becomes 2; b=t so y becomes 1) genuinely swaps the caller\'s variables, printing x=2, y=1. This contrast is the standard illustration of why swap needs reference (or pointer) semantics to work at all. Option 1 is correct.'
  },
  {
    id: 'compiler-runtime-x7',
    q: 'Consider call-by-name parameter passing (the actual argument expression is substituted textually and re-evaluated at every use inside the callee, rather than evaluated once at the call). Given: int i = 5; array a[]; void p(x) { i = i + 1; x = x + 1; } — and the call p(a[i]) is made when i = 5. Under call-by-name semantics, which array element actually gets incremented?',
    options: ['a[5], the same element that call-by-reference would have used', 'a[6], because i has already been incremented to 6 by the time x (standing for a[i]) is evaluated in the second statement', 'a[4], because i is decremented internally', 'No array element is modified; only the local copy of i changes'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Call-by-name does not fix the argument\'s address once at call time (unlike call-by-reference); instead, every occurrence of the formal parameter x inside p is replaced, at the moment it is used, by a fresh (re-evaluated) copy of the actual argument expression "a[i]". The first statement, i = i + 1, executes normally and changes the GLOBAL i from 5 to 6 — note this i is not the parameter, it is a separate global variable that a[i]\'s expression depends on. The second statement, x = x + 1, expands textually to a[i] = a[i] + 1, but by now i has already become 6, so this actually executes as a[6] = a[6] + 1 — NOT a[5], which is what one would naively expect (and what call-by-reference would actually do, since it would have fixed the address of a[5] once at the call). This surprising aliasing effect (Jensen\'s Device) is the classic textbook warning against call-by-name. Option 2 is correct.'
  },
  {
    id: 'compiler-runtime-x8',
    q: 'Which of the following is allocated on the heap rather than being part of some procedure\'s activation record on the runtime stack?',
    options: ['A local int variable declared inside a (non-recursive) function', 'A global array declared at file scope outside any function', 'A block of memory obtained by an explicit call to malloc(), to be explicitly freed later by the programmer', 'A value parameter passed into a function by copying'],
    answer: 2,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Storage classes map cleanly onto three allocation strategies: variables whose size and lifetime are fixed for the whole program run (globals, and locals of procedures that are never re-entered/recursive in some simple schemes) go in static storage, allocated once at compile/load time. Ordinary local variables and value parameters of a procedure are allocated inside that specific call\'s activation record on the stack, created on entry and destroyed on return. Memory whose size or lifetime cannot be determined until run time, and which must persist independently of any particular procedure call\'s lifetime (or be explicitly managed by the programmer), is allocated on the heap — exactly what malloc() (or new) provides. Only option 3 describes heap allocation; the rest are static or stack-based. Option 3 is correct.'
  },
  {
    id: 'compiler-runtime-x9',
    q: 'Why must the local variables of a recursive procedure be allocated on a stack (inside a fresh activation record per call) rather than in fixed static storage?',
    options: ['Because recursive procedures are not allowed to have local variables at all', 'Because each concurrently active invocation of the procedure needs its own independent copy of the locals; a single static location would be shared and overwritten by every nested call, corrupting all the outer invocations\' data', 'Because static storage cannot hold integer values, only strings', 'Because the compiler cannot compute the address of static variables at compile time'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A recursive call means multiple invocations of the same procedure are simultaneously "in progress," each potentially at a different point in its own computation with its own distinct values for what look like "the same" local variables. If those locals were static (one fixed memory location shared by every call), then a nested recursive call would overwrite the outer call\'s values in that same location, and when the nested call returned, the outer call would find its local variables corrupted. Giving each call its own activation record on a stack — pushed on call, popped on return — automatically gives every active invocation an independent, correctly preserved copy of its locals. Static allocation works fine for non-recursive procedures but fundamentally breaks recursion. Option 2 is correct.'
  },
  {
    id: 'compiler-runtime-x10',
    q: 'A recursive procedure declares one local integer variable count. At a moment when the recursion has reached a depth of 3 (three invocations of the procedure are simultaneously active on the call stack), how many separate, independently addressable copies of count currently exist in memory?',
    options: ['1', '2', '3', '0'],
    answer: 2,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Stack-based allocation gives every active activation record its own private storage for the procedure\'s local variables, completely independent of every other active invocation\'s storage for the "same" variable name. With exactly 3 invocations simultaneously active (recursion depth 3), there are exactly 3 separate activation records currently on the stack, and hence exactly 3 separate copies of count, one inside each activation record, each potentially holding a different value at that moment. This is precisely the mechanism that makes recursion work correctly: no invocation\'s local state interferes with any other\'s. Option 3 is correct.'
  },
  {
    id: 'compiler-runtime-x11',
    q: 'In general, the control (dynamic) link and the access (static) link of the same activation record:',
    options: ['Always point to the same activation record, since a procedure is always called from within its lexically enclosing procedure', 'Can point to different activation records, because the caller of a procedure (determined by the dynamic call chain) need not be the same as its lexically enclosing procedure (determined by where it is textually defined)', 'Are only both present in languages that disallow nested procedures', 'Are merged into a single field in every practical compiler implementation'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'The control link always points to whoever actually called the procedure at run time, following the dynamic call sequence. The access link always points to the most recent invocation of the procedure that lexically (textually) contains this one\'s declaration, following the static nesting structure. These two coincide only in the special case that a procedure happens to be called directly from within its own lexically enclosing procedure. In general — for example when a deeply nested procedure is called indirectly through several other unrelated procedures, or when procedures are passed as parameters and invoked far from their lexical "home" — the caller and the lexical parent are different activation records entirely, so the two links diverge. This distinction is precisely why languages supporting nested procedures with static scoping need both links maintained separately. Option 2 is correct.'
  },
  {
    id: 'compiler-runtime-x12',
    q: 'In copy-restore (also called copy-in copy-out) parameter passing, when are the final values of the formal parameters copied back into the actual argument variables?',
    options: ['Continuously, on every single assignment to the formal parameter during the procedure body, just like call by reference', 'Only once, at the moment the procedure returns, after which the actual arguments are updated with whatever final values the formals held', 'Never; copy-restore behaves identically to call by value with no copy-back at all', 'Before the procedure body executes, instead of after'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Copy-restore is a middle ground between call by value and call by reference: at call time the actual argument\'s current value is copied INTO the formal parameter (like call by value), the procedure body then operates purely on this local copy (unlike call by reference, so no aliasing effects occur during execution), and only when the procedure is about to return is the formal parameter\'s final value copied back OUT to the actual argument\'s storage location. This one-shot copy-back at exit is what distinguishes it from call by value (which never copies back) and from call by reference (which effectively "copies back" continuously and immediately, since it is really just aliasing). The distinction between copy-restore and true reference passing only becomes visible when the same variable is passed as two different aliased arguments, or when the callee has aliasing side effects during its execution. Option 2 is correct.'
  },
  {
    id: 'compiler-runtime-x13',
    q: 'The total size of a procedure\'s activation record can usually be computed entirely at compile time. Under which of the following circumstances does this stop being true, so that the size becomes known only when the procedure is actually called (or even only as it executes)?',
    options: ['Whenever the procedure has more than one local variable', 'Whenever the procedure declares a local array (or other local data) whose size depends on a value that is only known at run time, such as a variable-length array', 'Whenever the procedure has any parameters at all', 'Whenever the procedure is recursive, regardless of what it declares locally'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'For an "ordinary" procedure — fixed number of parameters, fixed number of simple local variables, no locals whose size depends on run-time data — the compiler knows exactly how many bytes each field of the activation record needs, so the whole frame size is a compile-time constant, baked directly into the generated prologue/epilogue code. This breaks down precisely when a local has a size that cannot be determined until execution reaches that declaration — the classic example is a local array declared with a bound that is itself a run-time expression (a variable-length array, as in C99, or certain dynamic-array declarations). In that case the activation record\'s size is only fixed at the point the procedure is actually invoked (or even partway through, once the bound is evaluated), not earlier at compile time. Simply having many locals, having parameters, or being recursive does not by itself prevent compile-time size computation — recursion only requires multiple same-sized frames, not variable-sized ones. Option 2 is correct.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-optimization';}).questions.push(
  {
    id: 'compiler-optimization-x1',
    q: 'A compiler rewrites the source statement x = 3 + 4 * 2; directly as x = 11; by evaluating the arithmetic at compile time. This transformation is called:',
    options: ['Constant folding', 'Copy propagation', 'Dead code elimination', 'Loop-invariant code motion'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Constant folding is precisely the optimization of evaluating expressions whose operands are all known constants at compile time, replacing the whole expression with its computed value so the runtime never has to perform that arithmetic at all. Here 4 * 2 folds to 8, and 3 + 8 folds to 11, letting the compiler emit x = 11 directly. Copy propagation would apply if a variable holding a known value were substituted for another variable, not when raw numeric literals are combined. Dead code elimination removes computations whose results are never used, and loop-invariant code motion relocates computations out of loops — neither applies to a single non-loop assignment of a constant expression. Option 1 is correct.'
  },
  {
    id: 'compiler-optimization-x2',
    q: 'Given the code a = b; c = a + d;, an optimizer rewrites the second statement as c = b + d; (and, if a is now unused, removes the first statement too). The rewriting of a to b in the second statement is an example of:',
    options: ['Strength reduction', 'Copy propagation', 'Induction variable elimination', 'Loop unrolling'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'After the copy assignment a = b, the values of a and b are guaranteed equal (until either is reassigned), so any later use of a can legally be replaced by b instead — this substitution is exactly copy propagation. Its typical payoff, seen here, is that once every use of a has been rewritten to use b directly, the original copy statement a = b becomes dead code (its result is never read) and can be deleted by a subsequent dead code elimination pass — copy propagation and dead code elimination are classic partners, each enabling more work for the other. Strength reduction replaces expensive operations with cheaper ones, induction variable elimination is specific to loop counters, and loop unrolling duplicates loop bodies — none of these describe substituting one variable name for another known-equal one. Option 2 is correct.'
  },
  {
    id: 'compiler-optimization-x3',
    q: 'Inside a loop where i increases by exactly 1 on every iteration, the statement t = i * 4; (recomputing the multiplication from scratch each time) is replaced by maintaining t across iterations and updating it with t = t + 4; instead, eliminating the multiplication entirely. This transformation is known as:',
    options: ['Dead code elimination', 'Common subexpression elimination', 'Strength reduction', 'Constant propagation'],
    answer: 2,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Strength reduction replaces a computation with an equivalent but cheaper one, exploiting a known relationship between values across loop iterations. Here, because i increases by exactly 1 each pass and t always equals i * 4, incrementing t by the constant 4 each iteration produces exactly the same sequence of values as recomputing i * 4 from scratch every time, but addition is typically far cheaper than multiplication on real hardware. This is the textbook strength-reduction pattern applied to an induction variable (t here is a derived induction variable tracking i). It is not dead code (t is actively used), not CSE (there is no repeated identical expression to merge), and not constant propagation (i and t are not compile-time constants). Option 3 is correct.'
  },
  {
    id: 'compiler-optimization-x4',
    q: 'In the sequence x = 5; x = 10; print(x); the first assignment x = 5; can safely be removed by the compiler because:',
    options: ['x = 5 is a syntax error', 'The value 5 assigned to x is never read by any statement before x is overwritten by x = 10; hence that assignment is dead code', 'The compiler always removes the first assignment to any variable', 'x = 5 and x = 10 are computed in parallel, so only one survives arbitrarily'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A statement is dead code, safe to eliminate, precisely when the value it computes is never used along any execution path before being overwritten (or the program ends). Here, between x = 5 and the very next statement x = 10, there is no read of x anywhere, so the value 5 is completely discarded before anyone could observe it — removing x = 5 changes nothing about the program\'s observable behavior. Only the final value assigned before a use, here 10, matters, and it is what print(x) actually sees. This is a straightforward instance of dead-store elimination, a common special case of dead code elimination applied specifically to assignments. Option 2 is correct.'
  },
  {
    id: 'compiler-optimization-x5',
    q: 'In the loop: for (i = 0; i < n; i++) { t = a * b; arr[i] = t + i; } — assuming a and b are never modified inside the loop, the statement t = a * b; is a good candidate for:',
    options: ['Dead code elimination, since t is never used', 'Loop-invariant code motion, hoisting t = a * b; to just before the loop begins, since it computes the same value on every iteration', 'Strength reduction, replacing the multiplication with repeated addition inside the loop', 'Induction variable elimination, since t behaves like a loop counter'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'A computation is loop-invariant if none of the operands it depends on change during any iteration of the loop; here a and b are stated to be unmodified throughout, so a * b evaluates to the exact same value on every single pass, making it pure wasted redundant work to recompute it n times. Hoisting the statement t = a * b; to execute exactly once, immediately before the loop starts, produces an identical result on every iteration while doing the multiplication only once — this is loop-invariant code motion. t is certainly used (inside arr[i] = t + i), ruling out dead code elimination; there is no per-iteration relationship between t and the loop counter that would make strength reduction or induction-variable treatment relevant, since t does not change value across iterations at all. Option 2 is correct.'
  },
  {
    id: 'compiler-optimization-x6',
    q: 'Inside a loop, j is updated by j = j + 4; on every iteration in lockstep with i being updated by i = i + 1;, such that j always equals 4*i + constant throughout the loop\'s execution, and j is never used for anything except this bookkeeping. If i is otherwise unused inside the loop body except to drive this relationship, which optimization allows the compiler to eliminate i and its update entirely, retaining only j?',
    options: ['Dead code elimination alone, with no relationship to i and j needed', 'Induction variable elimination, since j is a linear function of i and can be maintained on its own without ever needing i\'s actual value', 'Common subexpression elimination', 'Loop unrolling'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'When one loop variable (j) is discovered to be an affine (linear) function of another (i) — here j = 4*i + constant, maintained consistently every iteration via j = j + 4 exactly matching i = i + 1 scaled by 4 — the compiler can recognize j as a derived induction variable and maintain it directly with cheap additive updates, without ever needing to compute or store i\'s actual value at all, as long as nothing else in the loop depends on i itself. If the only remaining purpose of i was to drive this relationship, i and its update can be deleted outright once j is self-sufficient — this combined recognition-and-removal is called induction variable elimination (which typically also relies on strength reduction to have set j up as an additive update in the first place). Plain dead code elimination alone would not discover that j substitutes for i; it merely removes unused writes once that substitution is already established. Option 2 is correct.'
  },
  {
    id: 'compiler-optimization-x7',
    q: 'Consider this three-address code listing (line numbers shown for reference):\n1: x = 0\n2: i = 1\n3: if i > 10 goto 7\n4: x = x + i\n5: i = i + 1\n6: goto 3\n7: print x\nHow many basic blocks does this code contain?',
    options: ['3', '4', '5', '6'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Apply the three leader rules. Rule 1: instruction 1 is a leader (first instruction). Rule 2 (jump targets are leaders): instruction 7 is the target of the conditional jump at line 3, and instruction 3 is the target of the unconditional jump at line 6 — both are leaders. Rule 3 (instruction right after any jump is a leader): instruction 4 immediately follows the conditional jump at line 3, so it is a leader (instruction 7, immediately following the goto at line 6, is already a leader from rule 2). The complete leader set is {1, 3, 4, 7}. Partitioning into blocks between consecutive leaders gives: B1 = {1, 2}, B2 = {3}, B3 = {4, 5, 6}, B4 = {7} — exactly 4 basic blocks. A common miscount is merging 1 and 3 (forgetting 3 is a jump target) or splitting 4,5,6 further (forgetting that only jump instructions and their targets create new blocks, not every instruction). Option 2 is correct.'
  },
  {
    id: 'compiler-optimization-x8',
    q: 'Consider the straight-line code: 1: a = b + c; 2: d = a * 2; 3: a = e - f; 4: print(d, a); — is the value of a computed by statement 1 still live immediately after statement 2 executes (i.e., in the gap just before statement 3 runs)?',
    options: ['Yes, because a is used again later in the code, at statement 4', 'No, because the only use of statement 1\'s value of a is at statement 2, and statement 3 redefines a with a completely new value before any further use', 'Yes, because a is a global variable and globals are always considered live', 'It cannot be determined without seeing the rest of the program'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'A variable\'s value is live at a program point if there exists some later use of that specific value along some execution path before it gets overwritten. The value of a produced by statement 1 (b + c) is used exactly once, by statement 2 (d = a * 2). Immediately after statement 2 runs, that particular value of a has no remaining uses ahead of it: the very next thing that happens to a is statement 3 completely overwriting it with e - f, and it is THAT new value which reaches statement 4\'s print. So the statement-1 value of a is dead right after statement 2, even though "the variable named a" is read again later — liveness tracks specific values reaching specific uses, not just whether the name a appears again. Option 2 is correct.'
  },
  {
    id: 'compiler-optimization-x9',
    q: 'In the loop: for (i = 0; i < n; i++) { x = a * b; y = arr[i] + x; z = c + d; } — assuming a, b, c, d are never assigned inside the loop, which statement(s) are loop-invariant and can be safely hoisted above the loop?',
    options: ['Only y = arr[i] + x;', 'Both x = a * b; and z = c + d;, but not y = arr[i] + x;', 'All three statements are loop-invariant', 'None of the statements are loop-invariant'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'A statement is loop-invariant if every operand it uses either never changes inside the loop, or is itself defined (once and only once, reaching this use) by another loop-invariant computation. x = a * b; depends only on a and b, both stated to be unmodified throughout the loop, so it computes the identical value on every iteration and is invariant. Similarly, z = c + d; depends only on c and d, also unmodified, so it too is invariant. In contrast, y = arr[i] + x; depends on arr[i], which changes value every iteration because the index i itself changes — this makes y genuinely different on each pass, so it cannot be hoisted regardless of x being invariant. Hoisting x and z out of the loop lets each be computed exactly once instead of n times, while y must remain inside since its value legitimately varies with i. Option 2 is correct.'
  },
  {
    id: 'compiler-optimization-x10',
    q: 'In the straight-line sequence: a = 1; b = 2; a = 3; c = a + b; print(c); how many of the statements can be removed by dead code elimination without changing the program\'s output?',
    options: ['0', '1', '2', '3'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Trace which assigned values actually get used. a = 1; assigns a value to a, but before a is ever read, it is immediately overwritten by a = 3; — so the value 1 is never observed by any later statement, making a = 1; a dead store that can be deleted with zero effect on behavior. b = 2; IS used, since c = a + b; reads b, so it must stay. a = 3; is also used, by that same statement c = a + b;, so it must stay. c = a + b; and print(c); are both needed to produce the visible output. Only one statement, a = 1;, is eliminable as dead code — removing it, and only it, leaves the program\'s behavior completely unchanged. Option 2 is correct.'
  },
  {
    id: 'compiler-optimization-x11',
    q: 'A loop repeatedly computes address = base + i * elementSize; where i is the loop counter incremented by 1 each iteration and base and elementSize never change. Replacing the per-iteration multiplication with an accumulating variable that is simply increased by elementSize each iteration (instead of recomputing i * elementSize from scratch) is a direct application of:',
    options: ['Strength reduction', 'Dead code elimination', 'Global common subexpression elimination', 'Constant folding'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'This is the textbook motivating example for strength reduction: address computation inside array-indexing loops. Since i increases by a fixed amount (1) each iteration, i * elementSize also increases by a fixed amount (elementSize) each iteration, so instead of performing a multiplication every single pass, the compiler can maintain a running total that starts at base and is simply incremented by elementSize on each iteration — trading an expensive multiply for a cheap add, with identical results. It is not dead code (the address is used), not CSE (there is no single repeated identical expression being merged across the code, just a per-iteration recomputation pattern), and not constant folding (elementSize and i are not both known at compile time in general). Option 1 is correct.'
  },
  {
    id: 'compiler-optimization-x12',
    q: 'Consider the loop: for (i = 0; i < n; i++) { x[i] = i * 5 + k; } where k is a variable never modified inside the loop. Which combination of optimizations best applies to efficiently compute i * 5 across all iterations, without touching how k is used?',
    options: ['Loop-invariant code motion applied to i * 5, since it does not depend on the loop', 'Strength reduction / induction-variable optimization: introduce a new variable t, initialized to 0 before the loop and incremented by 5 each iteration, replacing i * 5 with t on each pass', 'Dead code elimination, since i * 5 is never actually used', 'Constant folding, since i * 5 can be computed once at compile time'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'i * 5 is NOT loop-invariant (it changes every iteration since i changes), so loop-invariant code motion does not apply — that rules out option 1. It is also clearly used (to compute x[i]), so dead code elimination is inapplicable, and i is not a compile-time constant, so constant folding cannot apply either. What does apply is strength reduction combined with induction-variable recognition: since i increases by 1 each iteration, i * 5 increases by exactly 5 each iteration, so a new induction variable t can be initialized to 0 (matching i=0 giving i*5=0) before the loop and simply incremented by 5 every iteration, replacing every use of i * 5 inside the loop with t — turning a per-iteration multiplication into a per-iteration addition while leaving k, which does not participate in this relationship, untouched. Option 2 is correct.'
  },
  {
    id: 'compiler-optimization-x13',
    q: 'A compiler simplifies the expression x = (2 * n) / 2; (where n is an arbitrary runtime variable, not a compile-time constant) directly to x = n; using the algebraic identity that multiplying then dividing by the same nonzero constant cancels out. This transformation is best classified as:',
    options: ['Constant folding, since 2 and 2 are constants', 'Algebraic simplification (an identity-based simplification, distinct from constant folding since n itself is not a known constant)', 'Dead code elimination', 'Loop-invariant code motion'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Constant folding specifically evaluates expressions in which every operand is a known constant, collapsing them to a single computed constant value — but here n is an arbitrary runtime variable, so the expression as a whole cannot be folded down to one fixed number at compile time; the result x = n; still depends on a runtime value. What is actually happening is algebraic simplification: the compiler recognizes the mathematical identity (2 * n) / 2 = n (for the constant factor 2, ignoring edge-case concerns like integer overflow) and rewrites the expression into an equivalent, cheaper one, eliminating both the multiplication and the division entirely. This is a distinct, closely related sibling optimization to constant folding and strength reduction, applying general algebraic identities rather than either pure constant evaluation or an induction-variable-driven operator swap. Option 2 is correct.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-parsing';}).theory.deep = "PARSER RESPONSIBILITIES\n\n• Input: token stream from the lexer; output: a parse tree / AST plus accept-reject, driving semantic actions if syntax-directed.\n• Verifies the token stream is a sentence of the CFG; reports syntax errors and recovers (panic mode / phrase level).\n• Top-down (root to leaves, predicts productions: recursive descent, LL(1)) vs bottom-up (leaves to root, reduces handles: operator-precedence, LR family SLR/CLR/LALR).\n• Before top-down parsing: remove left recursion (A -> Aα | β becomes A -> βA', A' -> αA' | ε) and left-factor common prefixes (A -> αβ1|αβ2 becomes A -> αA', A' -> β1|β2) so one lookahead symbol suffices.\n\nFIRST/FOLLOW COMPUTATION CHECKLIST\n\nFIRST(α): terminals that can start a string derived from α; ε ∈ FIRST(α) if α =>* ε.\n• Terminal a: FIRST(a) = {a}. Production X -> ε: add ε to FIRST(X).\n• X -> Y1Y2...Yk: add FIRST(Yi) − {ε} for i = 1,2,... stopping at the first Yi whose FIRST lacks ε; if ALL Yi are nullable, add ε too.\n• Iterate over all productions to a fixed point.\n\nFOLLOW(A): terminals that can immediately follow A in some sentential form.\n• FOLLOW(start symbol) contains $.\n• A -> αBβ: add FIRST(β) − {ε} to FOLLOW(B).\n• A -> αB, or A -> αBβ with β nullable: add FOLLOW(A) to FOLLOW(B).\n• Apply to every occurrence of every nonterminal on every RHS; iterate to a fixed point (FOLLOW sets are mutually dependent). FOLLOW is undefined for terminals.\n\nLL(1) TABLE CONSTRUCTION\n\nFor each production A -> α: put A -> α in M[A,a] for each a ∈ FIRST(α); if ε ∈ FIRST(α), put A -> α in M[A,b] for each b ∈ FOLLOW(A) (including $ if present).\nConflict conditions (grammar is NOT LL(1) if either holds): (a) two alternatives A -> α | β share a terminal in FIRST(α) ∩ FIRST(β); (b) if ε ∈ FIRST(α), then FIRST(β) of any other alternative overlaps FOLLOW(A). Left recursion and common prefixes always cause conflicts. The predictive parser is a stack ($S on top) + table automaton: match terminal on top with lookahead (pop both), or expand nonterminal on top via M[nonterminal, lookahead] (push RHS reversed); blank cell = error.\n\nLR ITEMS, CLOSURE, GOTO\n\nLR(0) item: A -> α·β. LR(1) item adds lookahead: [A -> α·β, a].\n• closure(I): while A -> α·Bβ ∈ I and B -> γ is a production, add B -> ·γ (LR(0)) or [B -> ·γ, b] for each b ∈ FIRST(βa) (LR(1)); repeat to fixed point.\n• goto(I,X) = closure of {A -> αX·β [,a] : A -> α·Xβ [,a] ∈ I}.\n• Canonical collection: C = {closure({[S'->·S,$]})}; repeatedly add goto(I,X) for every I∈C, symbol X, until stable — this IS the LR-automaton's state set.\n• Table: shift j on terminal a from an item with dot before a, j = goto(I,a); reduce A->α on lookaheads valid for completed item A->α· (SLR: FOLLOW(A); LR(1)/LALR: the item's own lookahead); accept for [S'->S·,$].\n\nSLR vs CLR vs LALR\n\nPower hierarchy: LL(1) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1) ⊂ unambiguous CFGs.\n• SLR(1): LR(0) items (no lookahead in items); reduce A->α placed on all of FOLLOW(A). Fewest states, but FOLLOW(A) mixes contexts and can cause spurious conflicts.\n• CLR(1): full LR(1) items; reduce lookahead is exact per context — most powerful, but many more states (table blow-up).\n• LALR(1): build LR(1) collection, merge states with identical LR(0) core (union lookaheads) — same state count as SLR, almost as powerful as CLR. Merging can only ever create NEW reduce/reduce conflicts, never new shift/reduce ones.\nWitness: S -> Aa | bAc | dc | bda ; A -> d is LALR(1) but not SLR(1) (SLR's merged FOLLOW(A) causes a conflict that LALR's context-sensitive lookaheads avoid). A grammar with S -> aAd|bBd|aBe|bAe, A->c, B->c separates LR(1) from LALR(1): LR(1) keeps A->c· and B->c· in different states with disjoint lookaheads {d} vs {e}; LALR merges them into one state with lookahead {d,e} on both, creating a reduce/reduce conflict CLR(1) never had.\n\nOPERATOR PRECEDENCE PARSING\n\n• Needs an \"operator grammar\": no ε-productions, no two adjacent nonterminals in any body.\n• Relations between terminal pairs: a ⋖ b (yields), a ≐ b (same, e.g. matching brackets), a ⋗ b (dominates), built from precedence/associativity.\n• Stack of terminals + input; compare stack-top terminal to next input terminal: ⋖ or ≐ → shift; ⋗ → reduce (pop to the handle). Simple and fast but weaker than full LR and gives less diagnostic power.\n\nATTRIBUTE GRAMMAR EVALUATION ORDER\n\n• S-attributed: only synthesized attributes (bottom-up); matches LR parsers directly (actions at reduction time using the semantic stack).\n• L-attributed: synthesized + inherited, where each inherited attribute on a RHS symbol depends only on attributes of symbols to its LEFT (plus inherited attributes of the head); evaluable in one left-to-right depth-first pass, so it fits top-down parsing with embedded actions (and bottom-up parsers after transformation).\n• General attribute grammars need a topological sort of the per-parse-tree dependency graph; a cycle in that graph makes the grammar ill-formed.\n\nWORKED EXAMPLE 1 — FIRST/FOLLOW FOR A 4-PRODUCTION GRAMMAR\n\nGrammar: S -> A B ; A -> a A ; A -> ε ; B -> b B (with B -> ε as an implicit fifth alternative folded into rule 2's ε case — treat the four listed as the working set): S -> AB, A -> aA | ε, B -> bB | ε.\nFIRST(a)={a}, FIRST(b)={b}.\nFIRST(A): from A->aA, contributes {a} (a has no ε, stop); from A->ε, add ε. FIRST(A) = {a, ε}.\nFIRST(B): symmetric. FIRST(B) = {b, ε}.\nFIRST(S): from S->AB: take FIRST(A)−{ε}={a}; since ε∈FIRST(A), continue to FIRST(B)−{ε}={b}; since ε∈FIRST(B) too and the body is exhausted, add ε. FIRST(S) = {a, b, ε}.\nFOLLOW(S) = {$} (start symbol).\nFOLLOW(A): from S->AB, add FIRST(B)−{ε}={b}; since ε∈FIRST(B), also add FOLLOW(S)={$}. From A->aA (A at end), add FOLLOW(A) to itself (nothing new). FOLLOW(A) = {b, $}.\nFOLLOW(B): from S->AB (B at end), add FOLLOW(S)={$}. From B->bB (B at end), add FOLLOW(B) to itself. FOLLOW(B) = {$}.\nLL(1) table: M[A,a]=A->aA; M[A,b]=M[A,$]=A->ε; M[B,b]=B->bB; M[B,$]=B->ε — every cell single-valued, so the grammar is LL(1).\n\nWORKED EXAMPLE 2 — LR(0) STATES AND SLR CHECK\n\nAugmented grammar: S'->S ; S -> (S) | a.\nI0 = closure({S'->·S}) = {S'->·S, S->·(S), S->·a}.\ngoto(I0,S)=I1={S'->S·} (accept). goto(I0,a)=I2={S->a·} (reduce). goto(I0,\"(\")=I3={S->(·S), S->·(S), S->·a}.\ngoto(I3,S)=I4={S->(S·)}... i.e. {S->(S·)} with dot before \")\". goto(I3,\"(\")=I3, goto(I3,a)=I2.\ngoto(I4,\")\")=I5={S->(S)·} (reduce).\nSix states total: I0..I5. FOLLOW(S) = {$, )}. In I2 the only action on $ or ) is reduce S->a; in I5 the only action on $ or ) is reduce S->(S); no state has a shift and a reduce competing on the same symbol, so this grammar is SLR(1) (and therefore LALR(1) and LR(1)).\n\nGATE TRAPS\n\n• Stopping the FIRST-of-a-body scan too early/late — always check whether EVERY symbol up to the stopping point is nullable before deciding whether to add ε.\n• Applying FOLLOW rule \"A->αBβ adds FIRST(β)\" but forgetting the extra FOLLOW(A)-into-FOLLOW(B) step whenever β is nullable.\n• Ambiguous ⇒ never LL(1)/LR(1); but unambiguous does NOT imply LL(1) — left recursion or a FIRST/FOLLOW clash can still block it.\n• An SLR(1) conflict does not prove the grammar is ambiguous — CLR(1)/LALR(1) may resolve it with sharper lookaheads (classic \"LALR but not SLR\" question).\n• Shift/reduce conflicts are often resolved by convention (prefer shift, e.g. dangling-else); reduce/reduce conflicts are not resolved sensibly by default and always flag a real weakness.\n• LALR(1) merging can only introduce new reduce/reduce conflicts, never new shift/reduce conflicts — memorize this direction.\n• Operator precedence parsing requires an operator grammar (no ε-productions, no adjacent nonterminals) before precedence tables even apply.";

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-lexical';}).theory.deep = "PHASE OVERVIEW: WHAT LEXICAL ANALYSIS CONSUMES AND PRODUCES\n\n• Consumes: the raw source character stream (plus, in a two-pass design, results of any preprocessing/macro expansion).\n• Produces: a stream of tokens (token-type, attribute-value) pairs handed to the parser on demand via getNextToken(); also produces symbol-table entries for new identifiers and reports lexical errors.\n• Sits before syntax analysis and works with the symbol table manager and error handler, which are cross-cutting components touching every phase (lexical, syntax, semantic, ICG, optimization, code generation).\n• Full classical phase pipeline for reference (front end to back end): lexical analysis -> syntax analysis -> semantic analysis -> intermediate code generation -> code optimization -> target code generation. Front end phases are source-language dependent, machine independent; code generation is machine dependent; optimization can happen on the IR (machine-independent) and again on the target code (machine-dependent, peephole).\n\nREGULAR EXPRESSIONS TO DFA — THE CHECKLIST\n\n• A pattern is written as a regular expression (RE); GATE expects familiarity with RE algebra: union (a|b), concatenation (ab), Kleene closure (a*), positive closure (a+ = aa*), and derived shorthand (a? = a|ε).\n• Construction pipeline: RE --(Thompson's construction)--> NFA --(subset construction, i.e. powerset construction)--> DFA --(state minimization, optional)--> minimized DFA. A lexical-analyzer generator such as lex/flex performs exactly this pipeline internally.\n• Thompson's construction rules: ε for the RE ε; a single state pair with an a-edge for symbol a; concatenation chains two NFAs by an ε-edge; union adds a new start with ε-edges to both NFA starts and a new final reached by ε from both old finals; Kleene star adds ε-edges looping the NFA's final back to its start and a bypass ε-edge from a new start straight to a new final.\n• Subset construction: each DFA state is a SET of NFA states; start state = ε-closure(NFA start); transition on symbol a from DFA state {N1,...} = ε-closure(union of NFA-moves on a from N1,...); a DFA state is accepting if it contains any NFA accepting state.\n• Counting states is a common GATE question: an NFA for a language built from k basic REs concatenated/unioned/starred has a state count you can total mechanically per Thompson's rules; the corresponding DFA can have up to 2^n states in the worst case (n = NFA states) but is normally far smaller in practice.\n\nMAXIMAL MUNCH AND TOKENIZATION RULES\n\n• Maximal munch (longest match): at each scan position the lexer takes the LONGEST prefix of remaining input matching any pattern; this resolves cases like reading \"<=\" as one token instead of \"<\" then \"=\", and \"intx\" as one identifier rather than keyword int + identifier x.\n• Tie-breaking rule: when two patterns match the same longest lexeme (e.g. a reserved word matches both the keyword pattern and the identifier pattern), the rule/pattern listed EARLIER (higher priority, as in a lex specification) wins — this is how keywords beat the generic identifier rule.\n• A single lexical error is reported only when NO pattern matches any prefix of the remaining input at all (an illegal character); everything else — undeclared variables, unmatched parentheses, type mismatches — is caught by later phases, not the scanner, because regular languages cannot count or nest arbitrarily.\n• Compound/multi-character operators (>>=, ++, --, <=, ==, &&) are each ONE token by maximal munch; string literals are one token regardless of internal content; comments and whitespace produce zero tokens but may still need scanning to track line numbers for error messages.\n\nBUFFERING TECHNIQUES\n\n• Two-buffer scheme: two buffers of equal size N (commonly a disk-block size, e.g. 4096 bytes) are refilled alternately; two pointers — lexeme-begin and forward — scan ahead; when forward hits the end of one buffer it reloads the other.\n• Sentinel trick: each buffer ends with an eof sentinel character; forward can then simply test \"is this character eof?\" once per read instead of two separate tests (buffer-end AND file-end), roughly halving the per-character test overhead — this is the textbook motivation GATE tests for the sentinel scheme.\n• Why buffering matters at all: reading the source file character-by-character via a system call is far too slow; block reads amortize I/O cost, and the two-buffer/sentinel design keeps the amortization while still supporting arbitrary lookahead needed by maximal munch.\n\nSYMBOL TABLE INTERACTION\n\n• The lexer typically installs a new identifier lexeme into the symbol table the first time it is seen (or looks it up if already present), and returns the token id together with a pointer/index into the table as the attribute value, so later phases share one canonical entry per name rather than re-parsing the string.\n• Numeric/string constants likewise get an attribute value (the parsed number, or a pointer to the literal), while keyword/operator/punctuation tokens usually need no extra attribute since the token type alone determines everything.\n\nWORKED EXAMPLE 1 — REGULAR EXPRESSION TO MINIMAL DFA\n\nRE: (a|b)*abb — the classic \"any string over {a,b} ending in abb\" language.\nNFA via Thompson's construction has 11 states (2 per basic symbol times 5 symbols in \"a|b\" plus closure plus concatenation nodes, by the standard textbook diagram), but the DIRECTLY CONSTRUCTED minimal DFA (skipping the NFA detour, since this pattern is famous enough to derive directly) has exactly 4 states, call them A (start, also reached on any 'b' not extending a match), B (last char seen was 'a'), C (last two chars seen were 'ab'), D (accepting: last three chars seen were 'abb').\nTransition table:\n        a       b\nA       B       A\nB       B       C\nC       B       D\nD       B       A\nD is the unique accepting state. Check with string \"aabb\": A -a-> B -a-> B -b-> C -b-> D, accept — correct, since \"aabb\" ends in \"abb\". Check with \"abab\": A -a-> B -b-> C -a-> B -b-> C, reject (C is not accepting) — correct, since \"abab\" does not end in \"abb\". This 4-state DFA is already minimal (no two of A,B,C,D are equivalent, since each remembers a different length of matched suffix of \"abb\", so a minimization pass changes nothing).\n\nWORKED EXAMPLE 2 — TOKEN COUNTING WITH MAXIMAL MUNCH\n\nSource line: if(x>=10&&flag){y=x++;}\nScan left to right applying maximal munch and keyword-before-identifier priority:\nif (keyword, 1), ( (2), x (id, 3), >= (compound operator, one token, 4), 10 (number, 5), && (compound operator, 6), flag (id, 7), ) (8), { (9), y (id, 10), = (11), x (id, 12), ++ (compound operator, one token — maximal munch takes ++ over + then +, 13), ; (14), } (15).\nTotal: 15 tokens. Common wrong answers come from splitting >= into two tokens (< then =, wrong — maximal munch), or splitting ++ into + +, or forgetting that x++ still needs its own ; token separately from the } that follows.\n\nGATE TRAPS\n\n• Treating balanced-parentheses checking, begin-end matching, or \"used before declared\" checks as something the lexer can do — regular expressions/finite automata cannot count unboundedly, so these are strictly parser/semantic-analyzer jobs, never lexer jobs.\n• Splitting a compound operator (<=, ==, &&, ||, ->, ++, --, >>=) into separate single-character tokens — always apply maximal munch first.\n• Counting characters inside a string literal or inside a comment as separate tokens — a whole string literal is ONE token, and comments/whitespace contribute ZERO tokens.\n• Forgetting the tie-break rule: when a lexeme matches both a keyword pattern and the identifier pattern (e.g. \"if\"), the keyword (listed with higher priority) wins, never the generic identifier token.\n• Assuming NFA-to-DFA subset construction always blows up to 2^n states — in most GATE-scale problems the reachable-subset count is small; only count states actually reachable from the start state's ε-closure, not all 2^n theoretical subsets.\n• Confusing the sentinel-based two-buffer scheme's benefit: it is about REDUCING THE NUMBER OF TESTS per character (one test instead of two), not about reducing the number of disk reads, which the block-buffering itself already handles.\n• Missing that a lexical error is reported ONLY when a character sequence matches no pattern at all — a syntactically wrong but lexically valid token sequence (e.g. \"2 + ;\") is not a lexical error.";

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-sdt';}).theory.deep = "PHASE OVERVIEW: SYNTAX-DIRECTED TRANSLATION AND SEMANTIC ANALYSIS\n\n• Consumes: the parse tree (or the parser's reduction/derivation sequence directly, with no explicit tree built) produced by syntax analysis, plus the grammar's associated semantic rules.\n• Produces: attribute values attached to grammar-symbol instances (types, addresses, code fragments, error flags) and ultimately triggers actions such as type checking, symbol-table updates, and intermediate-code emission.\n• A Syntax-Directed Definition (SDD) associates one or more attributes and semantic rules with each grammar production, without prescribing an evaluation order; a Syntax-Directed Translation scheme (SDT) embeds semantic actions {...} at specific positions within production bodies, fixing an evaluation order tied to the parse.\n• Two attribute kinds: synthesized (computed from children/siblings-below, flows bottom-up) and inherited (computed from parent and left siblings, flows top-down/left-to-right); a terminal's only meaningful attribute is normally synthesized (supplied by the lexer, e.g. id.lexval).\n\nATTRIBUTE CLASSES AND EVALUATION ORDER\n\n• S-attributed SDDs: every attribute is synthesized. Evaluate bottom-up in any order consistent with the parse tree (e.g. postorder traversal); these fit bottom-up (LR) parsers perfectly because a reduction naturally happens after all children are already reduced, so the semantic action runs exactly at reduce time using values already sitting on the parser's value/semantic stack.\n• L-attributed SDDs: attributes may be synthesized OR inherited, with the restriction that each inherited attribute of a symbol on a production's right-hand side depends only on: attributes of the symbols strictly to its LEFT in that same production, and/or inherited attributes of the head (left-hand side) nonterminal itself — never on anything to its right. L-attributed SDDs can always be evaluated by a single depth-first, left-to-right traversal, so they fit naturally with top-down (predictive/recursive descent) parsing with actions embedded in-line, and can also be implemented on bottom-up parsers via a grammar transformation that moves each embedded action into a marker (dummy) nonterminal.\n• Dependency-graph evaluation (general SDDs): build a directed graph per parse tree with one node per attribute instance and an edge from a to b if b's rule uses a's value; a topological sort of this graph gives a valid evaluation order. If the graph has a cycle for some parse tree, the SDD is not well-defined (unevaluable) for that tree.\n• S-attributed ⊂ L-attributed (every S-attributed SDD is trivially L-attributed, since synthesized attributes automatically satisfy the \"depends only on left/parent\" rule).\n\nTYPE CHECKING RULES\n\n• Type checking verifies that operator/operand type combinations are legal per the language's type rules, using a type expression system (basic types, plus constructors like arrays, pointers, products/records, and function types built with ->).\n• Type synthesis is done bottom-up in an SDD, e.g. for E -> E1 + E2, E.type is derived from a table/rule combining E1.type and E2.type (int+int=int, int+float=float via implicit widening, etc.); a mismatch not covered by any coercion rule is flagged as a semantic error.\n• Type checking of statements (assignments, function calls, array indexing) similarly uses synthesized/inherited attributes to compare the declared type against the type of an expression, and checks arity/type of actual vs formal parameters at call sites.\n\nSYMBOL TABLE OPERATIONS DURING SDT\n\n• enter(name, type): creates a new entry when a declaration is processed; lookup(name): retrieves the nearest enclosing declaration, following scope rules; the symbol table is typically organized as one table per scope, chained to its enclosing scope (or as a single table with scope-marker entries pushed/popped).\n• Semantic actions for declarations typically run S-attributed style at the END of a declaration production so the full type (built up left to right, e.g. \"int\" then \"*\" then array dimensions) is known before the entry is created — this is why declarations are commonly handled with inherited \"type so far\" attributes flowing left to right through the declarator list.\n\nSDT SCHEMES FOR EXPRESSIONS AND CONTROL STRUCTURES\n\n• Backpatching is the standard technique for generating code for boolean expressions and control-flow (if/while) in ONE left-to-right pass without knowing target label addresses in advance: incomplete jump instructions are generated with their target field blank, and their instruction numbers are collected into synthesized attributes truelist/falselist/nextlist; once the actual target is known (e.g. after generating the code for a following statement), the function backpatch(list, target) fills in every instruction on that list with the resolved address.\n• For E -> E1 or M E2 style productions (M is a marker nonterminal recording the instruction-count-so-far), the classic pattern is: E.truelist = merge(E1.truelist, E2.truelist); E.falselist = E2.falselist, with E1.falselist backpatched to M.instr (the start of E2) — this exact \"or\" pattern (and the symmetric \"and\" pattern) is one of the most examined SDT skeletons in GATE.\n\nWORKED EXAMPLE 1 — L-ATTRIBUTED SDD FOR VARIABLE DECLARATIONS\n\nGrammar: D -> T L ; T -> int | float ; L -> L1 , id | id.\nRules: T.type = 'int' for T->int, T.type = 'float' for T->float (synthesized on T).\nL -> L1 , id { L1.in = L.in; addtype(id.entry, L.in) } — L.in is INHERITED, passed down from D -> T L { L.in = T.type }.\nL -> id { addtype(id.entry, L.in) }.\nCheck L-attributedness: L1's inherited attribute L1.in depends only on L.in, which is L's OWN inherited attribute (allowed); id's use of L.in is likewise fine (inherited attribute of the head passed to a right-side symbol, allowed since nothing depends on symbols to id's right). No attribute depends on anything to its right, so this SDD is L-attributed (and not S-attributed, since L.in is inherited, not synthesized) — it requires a left-to-right, depth-first evaluation, matching a predictive top-down parse of \"int a, b, c\" where T.type='int' is computed first, then threaded down through each L1 -> id application to tag a, b, and c all as int.\n\nWORKED EXAMPLE 2 — BACKPATCHING FOR \"IF (B) S1\"\n\nGrammar: S -> if ( B ) M S1, with M -> ε { M.instr = nextinstr } marking the current instruction count.\nSemantic rule: S.next... more simply, B.truelist is backpatched to M.instr (the instruction where S1's code begins), and S.nextlist = merge(B.falselist, S1.nextlist) (both the case where B is false, and the case where S1 falls through, must jump to whatever follows the whole if).\nTrace for \"if (a < b) x = 1;\": parsing B = a<b emits \"if a<b goto _\" (target blank, added to B.truelist) and \"goto _\" (target blank, added to B.falselist) — two 3-address instructions, say instructions 100 and 101. M records instr = 102 (about to generate S1's code). S1 = \"x = 1;\" emits instruction 102: \"x = 1\". Backpatch B.truelist={100} to target 102 (so instruction 100 becomes \"if a<b goto 102\"). S.nextlist = merge({101}, S1.nextlist) = {101} (assuming S1 has no jumps of its own) — instruction 101 stays unresolved until whatever follows this if statement is generated, at which point IT gets backpatched to that following address. This shows exactly why backpatching needs only one pass: instruction 100's target (102) becomes known immediately after parsing \"(B)\", while instruction 101's target is deferred by carrying it forward in a synthesized list attribute.\n\nGATE TRAPS\n\n• Mislabeling an SDD as S-attributed just because it \"looks bottom-up\" — check every single attribute; ONE inherited attribute anywhere disqualifies S-attributed status even if the SDD is still L-attributed.\n• Assuming L-attributed SDDs can only be implemented with top-down parsers — they can also run on bottom-up parsers via the standard \"insert a marker nonterminal at the position of each embedded action\" transformation; the restriction is about dependency direction, not about which parser is used.\n• Forgetting the L-attributed rule's exact direction — inherited attributes may depend on the LEFT siblings and the head's own inherited attributes, never on anything to the right, and never on synthesized attributes of the head itself (the head's synthesized attribute is what everyone else feeds, not a source).\n• In backpatching questions, mixing up truelist (jumps taken when the condition is true) with falselist (jumps taken when false), or forgetting that a marker nonterminal M's ε-production is exactly what captures \"instruction number at this point in the parse\" without emitting any code of its own.\n• Treating \"type checking\" and \"type inference\" as identical — checking verifies a type is consistent with declared/expected types; inference derives a type where none was explicitly declared; GATE questions sometimes hinge on which one a given rule performs.\n• Confusing dependency-graph topological sort (needed for GENERAL, non-L, non-S attributed grammars) with the simpler single-pass rule that suffices specifically for S-attributed and L-attributed SDDs — a topological sort is always safe but is overkill machinery for exam-time evaluation of L- or S-attributed cases.";

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-icg';}).theory.deep = "PHASE OVERVIEW: INTERMEDIATE CODE GENERATION\n\n• Consumes: the annotated parse tree / AST with all types resolved from semantic analysis.\n• Produces: an intermediate representation (IR) — commonly three-address code (TAC) — that is independent of the source language's surface syntax and of the target machine's instruction set, enabling the optimizer and multiple back ends to share one middle layer.\n• Sits between semantic analysis and code optimization; a good IR should be easy to generate from a parse tree AND easy to translate into target code.\n\nTHREE-ADDRESS CODE (TAC): FORMS AND TRANSLATION TEMPLATES\n\n• A TAC instruction has AT MOST one operator on the right and at most three addresses total (result, operand1, operand2); complex expressions are broken into a sequence of such instructions using compiler-generated temporaries (t1, t2, ...).\n• Common instruction forms: x = y op z (binary op); x = op y (unary op, e.g. unary minus, or a plain copy x = y); x = y (copy); unconditional jump goto L; conditional jumps if x goto L, ifFalse x goto L, if x relop y goto L; procedure calls param x / call p, n / y = call p, n; and array/pointer forms x = y[i], x[i] = y, x = &y, x = *y, *x = y.\n• Translation templates (E is an expression node, S a statement node; \"code\" builds up the TAC list, \"place\"/\"addr\" is where a value lives):\n  - E -> E1 + E2: emit E.place = newtemp(); emit(E.place = E1.place + E2.place) after generating E1's and E2's code.\n  - E -> - E1 (unary minus): E.place = newtemp(); emit(E.place = uminus E1.place).\n  - S -> id = E: emit(id.place = E.place) (a copy instruction, or a direct assignment if id.place can be reused).\n  - S -> if (B) S1: generate B's code with B.true = a new label L1, B.false = S.next (fall through/exit label); place L1 before S1's code.\n  - S -> while (B) S1: place a label L_begin before B's code; B.true = a new label L1 before S1's code; after S1's code, emit goto L_begin; B.false = S.next.\n  - Array reference E -> id [ E1 ]: compute the address via id's base plus E1.place * width(id's element type), emit a temp holding that offset, then E.place = a temp loaded via an indexed copy t = base[offset].\n• Boolean expressions can be translated either \"by value\" (numerically, e.g. true=1/false=0, straightforward but wasteful for short-circuit contexts) or by \"jump code\" (flow-of-control translation using true/false label attributes and backpatching) — GATE mostly examines the jump-code style inside if/while templates shown above.\n\nREPRESENTATIONS OF TAC: QUADRUPLES, TRIPLES, INDIRECT TRIPLES\n\n• Quadruple: (op, arg1, arg2, result) — four fields per record; result is an explicit named temporary or variable, so quadruples can be reordered freely (each instruction is self-contained), which is convenient for the optimizer but uses more space and needs care when copying temporary names during optimization.\n• Triple: (op, arg1, arg2) — no explicit result field; an operand that refers to the result of another triple is represented by that triple's OWN POSITION/INDEX (e.g. arg = \"(0)\" meaning \"value produced by triple 0\"). This saves space over quadruples but makes triples hard to reorder or move (moving a triple changes everyone's index references into it), which is the classic trade-off GATE tests.\n• Indirect triples: like triples, but with an added list of pointers TO the triples, listed in the desired execution order; this restores the ability to reorder code (as in quadruples) while keeping the compact triple representation — reordering is done just by rearranging the pointer list, not the triples themselves. This is the usual \"best of both worlds\" answer choice in comparison questions.\n\nDAG CONSTRUCTION RULES FOR EXPRESSIONS\n\n• A Directed Acyclic Graph (DAG) represents an expression the same way a syntax tree does, EXCEPT that a node representing a previously-computed subexpression is SHARED (reused) rather than duplicated — this is exactly how a compiler detects and exploits common subexpressions and identifies which computed values are actually used (dead code) versus discarded.\n• Construction algorithm: process the expression bottom-up; before creating a new node for an operation op(n1, n2), check whether a node already exists with that SAME operator and the SAME child nodes (by identity, not just by textual similarity) — if so, reuse the existing node instead of creating a new one; leaf nodes represent variables/constants and are also shared across all uses of the same identifier/value within the block.\n• Each interior node of the DAG corresponds to exactly one TAC instruction needed (assuming reuse is exploited); the number of TAC instructions to evaluate an expression via its DAG equals the number of INTERIOR (non-leaf) nodes, since each interior node is computed exactly once no matter how many times its value is used afterward.\n• A DAG can be paired with value-numbering to detect algebraic identities beyond textual match (e.g. recognizing a+b and b+a as the same value if commutativity is applied), though the plain-sharing rule above (identical operator + identical children in the SAME order) is what GATE typically expects unless commutativity is explicitly invoked.\n\nWORKED EXAMPLE 1 — TAC FOR AN ASSIGNMENT WITH ARRAY REFERENCES\n\nStatement: a = b[i] + c[i] * 2;\nAssume integer width 4 for indexing arithmetic.\nt1 = i * 4          // offset for b[i]\nt2 = b[t1]           // load b[i]\nt3 = i * 4          // offset for c[i]\nt4 = c[t3]           // load c[i]\nt5 = t4 * 2\nt6 = t2 + t5\na  = t6\nSeven TAC instructions total. Note t1 and t3 are textually the same computation (i*4) but a naive left-to-right TAC generator without common-subexpression elimination emits it TWICE, since the two array accesses are on different base arrays (b and c) even though the offset expression is identical — this exact redundancy is what the DAG/CSE pass in Worked Example 2 removes.\n\nWORKED EXAMPLE 2 — DAG FOR THE SAME EXPRESSION WITH NODE COUNT\n\nExpression (right-hand side only): b[i] + c[i] * 2.\nBuild bottom-up, sharing identical subexpressions:\nLeaves: i, 4, b, c, 2 — 5 leaf nodes (constants/identifiers).\nNode N1 = i * 4 (used for BOTH b[i]'s offset and c[i]'s offset — since the subexpression \"i * 4\" is textually and structurally identical, it is built ONCE and shared) — 1 interior node.\nNode N2 = b[N1] (array access using base b, offset N1) — 1 interior node.\nNode N3 = c[N1] (array access using base c, the SAME offset node N1 reused) — 1 interior node.\nNode N4 = N3 * 2 — 1 interior node.\nNode N5 = N2 + N4 (the root, value of the whole expression) — 1 interior node.\nTotal interior nodes = 5 (N1..N5); total nodes in the DAG (leaves + interior) = 5 + 5 = 10, versus a plain syntax tree (no interior-node sharing) which needs a SEPARATE i*4 subtree for c[i]'s offset, i.e. 6 interior nodes instead of 5. Because the DAG has 5 interior nodes, only 5 TAC instructions are needed to evaluate the expression (matching N1..N5 above, one instruction each) instead of the 6 a naive tree-walk would produce (the naive walk recomputes i*4) — this is exactly the saving illustrated in Worked Example 1, where t1 and t3 collapse into one shared node.\n\nGATE TRAPS\n\n• Assuming quadruples and triples differ only in \"space used\" — the deeper exam-relevant difference is REORDERABILITY: triples break under statement reordering (positional references), quadruples don't, and indirect triples fix this by adding a separate execution-order pointer list on top of triples.\n• Forgetting that a DAG shares a subexpression only when operator AND operands match EXACTLY in the same order (a+b is not automatically shared with b+a unless commutativity is explicitly applied) — do not over-merge nodes in a DAG-drawing question.\n• Miscounting DAG nodes by including the root value's assignment target or omitting leaf identifiers/constants — always state clearly whether a question wants \"interior nodes\" (= number of TAC instructions) or \"total nodes\" (interior + leaves), since these numbers differ and are both commonly asked.\n• Emitting two identical index-offset computations (like i*4 appearing twice for two different array bases) in straight-line naive TAC generation and mislabeling this as an error — it is not wrong TAC, it is simply TAC that has NOT yet had common subexpression elimination applied; the DAG is the tool that reveals and removes this redundancy.\n• Believing IR must be TAC — quadruples/triples/indirect-triples are representations OF three-address code, all encoding the same semantic instruction sequence, so a question asking to \"convert quadruples to triples\" is a pure representational transcoding exercise, not a re-derivation of the underlying computation.\n• Overlooking that boolean/control-flow translation (if/while) uses JUMP-based TAC with unresolved label targets (needing backpatching) rather than value-based (0/1) TAC, unless the question explicitly asks for the numeric-value style translation.";

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-runtime';}).theory.deep = "PHASE OVERVIEW: RUN-TIME ENVIRONMENTS\n\n• Consumes: the structure of the program (procedure/function nesting, declarations, calls) as recorded by semantic analysis and the symbol table.\n• Produces: a storage-allocation strategy — a mapping from names to run-time memory locations — plus the calling-sequence code (prologue/epilogue) that the code generator emits at every procedure call and return.\n• Storage classes: static allocation (fixed address for the program's lifetime — globals, static locals; no recursion support since only one instance exists), stack allocation (one activation record per active call, supports recursion, freed automatically on return), and heap allocation (for data whose lifetime is not nested with any call, e.g. dynamically allocated objects, garbage collected or explicitly freed).\n\nACTIVATION RECORD LAYOUT (TEXT DIAGRAM)\n\nHigh memory\n+-------------------------------+\n|   Actual parameters           |   (arguments pushed by the CALLER)\n+-------------------------------+\n|   Return address              |   (where control resumes in the caller)\n+-------------------------------+\n|   Control link (dynamic link) |   (pointer to caller's activation record)\n+-------------------------------+\n|   Access link (static link)   |   (pointer to the record of the lexically enclosing procedure, used for nested-procedure non-local access)\n+-------------------------------+\n|   Saved machine status         |   (saved registers, saved program counter, etc., needed to restore the caller's state)\n+-------------------------------+\n|   Local data                  |   (this procedure's local variables)\n+-------------------------------+\n|   Temporaries                 |   (compiler-generated temporaries for this activation)\n+-------------------------------+\nLow memory                       <- top of stack grows this direction typically\n• The current activation's record is addressed via a frame pointer (FP)/stack pointer (SP) pair; the caller usually sets up actual parameters and the return address, while the callee's PROLOGUE sets up the control link, access link, saves registers, and allocates space for locals/temporaries — the EPILOGUE reverses this before returning (restore registers, pop the frame, jump to the return address).\n• The static (access) link is only needed for languages allowing nested procedures with non-local lexical access (e.g. Pascal-style nesting); plain C, without nested procedures, omits it.\n\nSTATIC vs DYNAMIC SCOPE RESOLUTION\n\n• Static (lexical) scoping: a name refers to the declaration that is textually/lexically closest enclosing it in the SOURCE CODE, determined entirely at compile time — resolved by walking the chain of enclosing lexical blocks/procedures as WRITTEN, regardless of the actual call sequence at run time. Implemented at run time via the access/static link chain: to find a non-local variable declared n lexical levels up, follow the static link exactly n times from the current activation record.\n• Dynamic scoping: a name refers to the declaration in the MOST RECENTLY ACTIVATED, still-active procedure that declares it, determined by the actual CALL SEQUENCE at run time, not by how the source text is nested. Implemented by searching the chain of activation records via the DYNAMIC (control) link, or by a run-time \"association list\"/central table pushed and popped as procedures are entered and exited.\n• The classic distinguishing example: procedure a declares x; procedure b (declared inside a, or calling into a's scope) refers to x without declaring its own; if some OTHER procedure c also declares an x and calls b, static scoping still resolves b's x to a's x (based on where b is WRITTEN), while dynamic scoping resolves it to c's x (based on who actually CALLED b) whenever c is the actual (dynamic) caller instead of a.\n• Most block-structured languages (C, Pascal, Java, C++) are statically scoped; classic dynamic scoping appears in older Lisp dialects and shell/macro-like constructs; GATE mostly tests the ability to trace a small program under BOTH rules and report the differing output.\n\nPARAMETER PASSING SEMANTICS TABLE\n\nMechanism            | What is passed / bound                                  | Effect on caller's variable                          | Aliasing possible?\nCall by value        | a COPY of the actual parameter's value                   | Caller's variable is NEVER modified by the callee      | No\nCall by reference    | the ADDRESS (l-value) of the actual parameter             | Callee's writes directly modify the caller's variable  | Yes (two parameters bound to the same address alias)\nCall by copy-restore  | a copy IN on entry; the copy is written BACK to the caller's variable on return (also called copy-in copy-out / value-result) | Caller's variable updated only at return, using the final value of the copy | Only at the return-time write-back point\nCall by name          | the UNEVALUATED actual-parameter expression, re-evaluated (textually substituted, Algol-60 style) at EVERY use inside the callee | Can behave like reference OR produce surprising re-evaluation each use (classic Jensen's device) | Yes, and can differ from reference semantics if the expression has side effects or depends on an index variable that changes\n• GATE's favourite trap uses call-by-reference or call-by-name with an ALIASING setup (e.g. swap(a,a) or passing a global and a local that refer to the same storage, or an array-index actual parameter combined with a loop variable used inside the callee) to produce a counter-intuitive final value — always trace instruction by instruction rather than assuming \"reference = same as passing a pointer casually.\"\n\nSTACK ALLOCATION FOR RECURSIVE PROCEDURES\n\n• Each call creates a NEW activation record pushed on top of the run-time stack; the depth of recursion equals the number of live activation records at any moment, and the STORAGE for locals in different (non-overlapping-in-time) activations of the SAME procedure is entirely separate, which is exactly why stack allocation (not static allocation) is mandatory for recursive procedures.\n• Variable-length data (arrays whose size depends on a run-time parameter) is handled by allocating them in the activation record but accessed indirectly through a pointer stored at a FIXED offset within the record, since the record's own size can then vary without breaking fixed-offset access to the pointer itself.\n\nWORKED EXAMPLE 1 — STATIC vs DYNAMIC SCOPE TRACE\n\nProgram (pseudo-code):\nint x = 1;\nproc a() { print(x); }\nproc b() { int x = 2; a(); }\nmain() { b(); }\nStatic scoping: a() is textually nested at the top level, so its reference to x resolves to the GLOBAL x = 1, regardless of who calls a() — output: 1.\nDynamic scoping: at the moment a() executes, the most recently activated declaration of x is b's local x = 2 (since b called a, and b's activation with x=2 is still on the run-time stack/association list when a looks up x) — output: 2.\nThis single trace is the standard GATE mechanism for testing whether a student can distinguish the two rules: the SAME program yields DIFFERENT outputs purely based on which resolution rule is assumed, and the difference hinges entirely on whether \"enclosing\" means lexical nesting (static) or live call chain (dynamic).\n\nWORKED EXAMPLE 2 — CALL BY VALUE vs REFERENCE vs COPY-RESTORE, WITH ALIASING\n\nGlobal: int a = 2, b = 3;\nproc swap(x, y) { int t = x; x = y; y = t; }\ncall: swap(a, b);\nCall by value: x and y are private copies of a and b; swapping x and y inside the procedure has NO effect on the caller — after the call, a = 2, b = 3 unchanged.\nCall by reference: x and y are bound to the ADDRESSES of a and b; t=x reads a's slot (2), x=y writes b's value (3) into a's slot, y=t writes the ORIGINAL x-value (2) into b's slot — after the call, a = 3, b = 2 (a genuine swap).\nCall by copy-restore: x and y start as copies of a (2) and b (3); the same internal swap happens on the copies (x becomes 3, y becomes 2); on return, x's final value (3) is written back to a, and y's final value (2) is written back to b — after the call, a = 3, b = 2, IDENTICAL to reference here since a and b do not alias each other.\nNow the trap: call swap(a, a) (both actual parameters are the SAME variable). Call by reference: x and y are BOTH bound to a's single address; t=x reads a (2); x=y writes a's own current value into a (no-op, still 2); y=t writes 2 into a (no-op) — a ends as 2, the swap silently fails because of ALIASING. Call by copy-restore: x and y are independent copies (2 and 2); the internal swap gives x=3 (old y), y=2 (old x); on return the write-backs to a happen in sequence, so the FINAL value of a depends entirely on the language-defined write-back ORDER (last write wins) — this order-dependency is the extra subtlety copy-restore adds over pure reference semantics.\n\nGATE TRAPS\n\n• Assuming call-by-reference and call-by-copy-restore always give identical results — they diverge exactly when there is ALIASING among the actual parameters (as in swap(a,a) above); without aliasing they typically agree.\n• Forgetting that the RETURN ADDRESS and CONTROL LINK are usually set up by different parties in different conventions (some texts have the caller push the return address, others have it pushed implicitly by a call instruction) — read the specific convention given in a question rather than assuming one fixed layout.\n• Confusing the STATIC (access) link, used to resolve non-local names by LEXICAL nesting depth, with the DYNAMIC (control) link, used purely to know where to restore the caller's frame on return — these two links can point to entirely DIFFERENT activation records whenever the calling sequence does not mirror the lexical nesting (e.g. recursive or mutually recursive calls).\n• Believing dynamic scoping is purely academic — GATE regularly gives a short trace program and asks for the output under BOTH static and dynamic scoping, expecting two different numeric answers.\n• Treating call-by-name as equivalent to call-by-reference — call-by-name RE-EVALUATES the actual-parameter expression at every textual use inside the callee body, which can produce different results from reference passing whenever the actual parameter is itself an expression with a side effect or a changing index (Jensen's device is the canonical example).\n• Assuming heap-allocated data always needs garbage collection — some languages use explicit alloc/free on the heap; GATE mainly wants you to recognize WHICH storage class (static/stack/heap) fits a given lifetime requirement, not the reclamation mechanism.";

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-optimization';}).theory.deep = "PHASE OVERVIEW: CODE OPTIMIZATION\n\n• Consumes: the intermediate representation (TAC) produced by ICG (machine-independent optimizations) or the generated target code (machine-dependent optimizations, e.g. peephole optimization).\n• Produces: a semantically EQUIVALENT but cheaper (faster and/or smaller) version of the same code — optimization never changes the observable meaning of a correct program.\n• Two broad categories: machine-independent optimizations (work on the IR: constant folding, CSE, dead code elimination, code motion, strength reduction, induction-variable elimination) and machine-dependent optimizations (register allocation/assignment, instruction selection, peephole optimization on the final target code).\n\nBASIC BLOCK PARTITION RULES\n\n• A basic block is a maximal sequence of consecutive TAC instructions such that control enters only at the FIRST instruction (no jumps into the middle) and leaves only after the LAST instruction (no jumps out except at the end).\n• Leader-identification algorithm (used to partition a TAC sequence into basic blocks): (1) the first instruction of the sequence is a leader; (2) any instruction that is the TARGET of a conditional or unconditional jump is a leader; (3) any instruction that immediately FOLLOWS a conditional or unconditional jump/goto is a leader. Every leader begins a new basic block, which extends up to (but not including) the next leader.\n• A control-flow graph (CFG) is then built with one node per basic block and an edge from block B1 to B2 if control can flow from the end of B1 directly to the start of B2 (via fall-through or via a jump).\n\nDATAFLOW CONCEPTS\n\n• Reaching definitions: a definition d of variable x REACHES a point p in the program if there is some path from immediately after d to p along which d is not \"killed\" (i.e., x is not redefined by another assignment anywhere on that path). Used for constant propagation and to detect use of possibly-undefined variables. Computed via the standard forward dataflow equations: OUT[B] = GEN[B] ∪ (IN[B] − KILL[B]); IN[B] = union of OUT[P] over all predecessors P of B.\n• Live variables (liveness analysis): a variable x is LIVE at a point p if there is some path from p to a USE of x along which x is not redefined before that use; live-variable analysis is a BACKWARD dataflow problem: IN[B] = USE[B] ∪ (OUT[B] − DEF[B]); OUT[B] = union of IN[S] over all successors S of B. Used to decide register allocation (a dead variable's register can be reused) and to detect genuinely dead code (an assignment whose target is not live immediately afterward can be removed).\n• Both are computed to a FIXED POINT by iterating over the CFG (initialize all sets empty, or IN/OUT accordingly, and repeat updates until no set changes); reaching definitions propagates FORWARD along control flow, live variables propagates BACKWARD — this direction distinction is one of the most frequently tested single facts in this area.\n\nCLASSIC OPTIMIZATIONS: BEFORE/AFTER MINI-EXAMPLES\n\n• Constant folding — evaluate constant expressions at compile time.\n  Before: x = 4 * 5 + 2;   After: x = 22;\n• Constant propagation — replace a variable known to hold a constant with that constant, then often triggers further folding.\n  Before: a = 5; b = a + 3;   After: a = 5; b = 8;\n• Common subexpression elimination (CSE) — compute a repeated identical expression once, reuse the value.\n  Before: x = a + b; y = a + b + c;   After: t = a + b; x = t; y = t + c;\n• Dead code elimination — remove computations whose results are never used (not live afterward).\n  Before: x = 5; x = 10; print(x);   After: x = 10; print(x); (the first assignment is dead — its value is never read before being overwritten).\n• Copy propagation — replace uses of a copy-assigned variable with the original, often exposing more dead code.\n  Before: x = y; z = x + 1;   After (with x = y substituted): z = y + 1; (x = y may now become dead and be removed too).\n• Loop-invariant code motion — hoist a computation that produces the SAME value every iteration out of the loop, into the preheader.\n  Before: for (i=0;i<n;i++) { t = a*b; x[i] = t + i; }   After: t = a*b; for (i=0;i<n;i++) { x[i] = t + i; }\n• Strength reduction — replace an expensive operation with a cheaper one that computes the same sequence of values (typically paired with induction-variable analysis).\n  Before: for (i=0;i<n;i++) { y = i * 5; use(y); }   After: t = 0; for (i=0;i<n;i++) { y = t; use(y); t = t + 5; }\n• Induction-variable elimination — after strength reduction adds a new induction variable tracking the loop counter's progression, the ORIGINAL counter may become dead inside the loop if nothing else needs it, and can then be eliminated.\n• Algebraic simplification — rewrite using an identity, regardless of whether operands are compile-time constants.\n  Before: x = (2 * n) / 2;   After: x = n;\n• Peephole optimization (machine-dependent, on target code) — scan a small sliding window of target instructions for inefficient patterns.\n  Before: MOV R0, a  followed by  MOV a, R0   After: MOV R0, a  (redundant store-back removed)\n• Loop unrolling — replicate the loop body to cut per-iteration branch/counter overhead; unlike the passes above it INCREASES code size to gain speed.\n\nCOMPARISON: LOCAL vs GLOBAL OPTIMIZATION SCOPE\n\nOptimization scope   | Region analyzed                         | Typical technique\nLocal (peephole/BB)  | Within ONE basic block only              | DAG-based CSE within a block, peephole on a small instruction window\nGlobal (intraprocedural) | Across ALL basic blocks of ONE procedure (whole CFG) | Dataflow analysis (reaching definitions, liveness), loop-invariant code motion, global CSE\nInterprocedural      | Across procedure/function CALL boundaries | Inlining, interprocedural constant propagation (rarely GATE-tested in depth, but recognize the term)\n\nWORKED EXAMPLE 1 — BASIC BLOCK PARTITION AND CFG\n\nTAC sequence (line numbers shown):\n1: i = 1\n2: if i > n goto 7\n3: t = a[i]\n4: sum = sum + t\n5: i = i + 1\n6: goto 2\n7: print(sum)\nApply the leader rules: line 1 is a leader (rule 1). Line 2 is a leader since it is the TARGET of the goto at line 6 (rule 2). Line 3 is a leader since it immediately follows the conditional jump at line 2 (rule 3). Line 7 is a leader both as the TARGET of the conditional jump at line 2 (rule 2) and as the instruction after the goto at line 6 (rule 3).\nResulting basic blocks: B1 = {1}; B2 = {2} (single-instruction block, since line 3 is the next leader); B3 = {3,4,5,6}; B4 = {7}.\nCFG edges: B1 -> B2 (fall-through). B2 -> B3 (fall-through, when i <= n) and B2 -> B4 (jump taken, when i > n). B3 -> B2 (the goto at line 6 jumps back to line 2). B4 has no successor (end of program). This is the canonical \"for-loop\" shaped CFG: a single-entry test block (B2) with two successors, one looping back (B3 -> B2) and one exiting (B2 -> B4).\n\nWORKED EXAMPLE 2 — LIVE VARIABLE ANALYSIS ON A SMALL CFG\n\nUsing the basic blocks from Example 1, focus on variable sum. DEF(B3) = {t, sum, i}; USE(B3) = {a, i, sum} — sum is read on the right of sum = sum + t BEFORE being redefined, so sum belongs to USE(B3) despite also being in DEF(B3).\nBackward pass: OUT(B4) = {} (no successor); IN(B4) = USE(B4) ∪ (OUT(B4) − DEF(B4)) = {sum} (print(sum) only uses sum).\nIN(B2) = USE(B2) ∪ (OUT(B2) − DEF(B2)); USE(B2) = {i, n}, DEF(B2) = {}; OUT(B2) = IN(B3) ∪ IN(B4) (B2's two successors are B3 and B4).\nBecause B2 and B3 form a loop (B3 -> B2 is a back-edge), the equations are solved by ITERATING to a fixed point rather than in one pass. The fixed point gives sum ∈ IN(B3), sum ∈ OUT(B3), sum ∈ IN(B2), and sum ∈ OUT(B1): sum is LIVE from before the loop all the way through every iteration until print(sum) finally consumes it in B4 — exactly what a variable carried across a loop back-edge should show under iterative liveness analysis.\n\nGATE TRAPS\n\n• Confusing reaching definitions (FORWARD dataflow, about which ASSIGNMENTS reach a point) with live variables (BACKWARD dataflow, about which VARIABLES will be read before being overwritten) — the direction of propagation is the single fact most often tested and most often mixed up.\n• Believing dead code elimination requires that a variable is never used ANYWHERE in the program — it only requires the variable is not LIVE immediately after that particular assignment (a later, different assignment to the same variable, with no intervening use, is enough to make the earlier one dead).\n• Applying loop-invariant code motion to an expression that LOOKS like it does not change (e.g. i * 5 in a loop where i itself changes) — invariance requires that the operands themselves are unchanged across iterations; i * 5 is NOT invariant since i changes every pass (that is a strength-reduction candidate instead, not code motion).\n• Marking a basic block boundary incorrectly by forgetting rule 3 (the instruction immediately after a jump is always a leader, even if nothing jumps directly to it) — a very common source of an extra missed block in leader-set questions.\n• Treating peephole optimization as equivalent to global optimization — peephole works on a SMALL, LOCAL, SLIDING WINDOW of target instructions and cannot see or exploit whole-CFG information the way dataflow-based global optimizations do.\n• Assuming every optimization reduces code size — loop unrolling deliberately INCREASES code size to reduce per-iteration control overhead, which is the classic size-versus-speed trade-off question.\n• Forgetting that copy propagation and constant propagation are DISTINCT passes even though they interact (copy propagation substitutes a variable-for-variable copy; constant propagation substitutes a variable-for-CONSTANT-value); applying one often exposes new opportunities for the other and for dead code elimination, which is why compilers iterate optimization passes rather than running each exactly once.";

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-lexical';}).questions.push(
  {
    id: 'compiler-lexical-y1',
    q: 'Which of the following statements about lexical analysis are TRUE? (Select ALL that apply)',
    options: [
      'A lexical-analyzer generator such as lex builds an NFA from the token regular expressions (Thompson construction) and then converts it to a DFA via subset construction',
      'The lexical analyzer can detect the use of an undeclared variable',
      'Maximal munch means the scanner always consumes the longest prefix of the remaining input that matches some token pattern',
      'A string literal contributes one token to the stream for every character enclosed within its quotes'
    ],
    answers: [0, 2],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: this RE -> NFA -> DFA pipeline (Thompson construction followed by subset/powerset construction) is exactly how tools like lex turn token patterns into a working scanner, usually with a minimization pass afterward. Option 2 is false: detecting an undeclared variable needs symbol-table/scope information built up over the whole program, which is semantic analysis, not lexical analysis; the scanner only matches regular patterns over characters and has no notion of "already declared". Option 3 is true by definition: maximal munch (longest match) is the core disambiguation rule that lets a scanner correctly read ">>=" as one token instead of ">", ">", "=" and "intx" as one identifier instead of keyword int plus x. Option 4 is false: a string literal, no matter how many characters or embedded format specifiers it contains, is treated as a single token by the scanner — the scanner never looks inside the quotes and creates one token per character. So the correct selections are options 1 and 3.'
  },
  {
    id: 'compiler-lexical-y2',
    q: 'Which of the following tasks are IMPOSSIBLE for a lexical analyzer to perform by itself, because token patterns are described using regular expressions/finite automata? (Select ALL that apply)',
    options: [
      'Verifying that parentheses in an arbitrarily long expression are balanced to arbitrary nesting depth',
      'Recognizing a floating point constant such as 3.14e-10',
      'Verifying that a variable was declared before it is used',
      'Distinguishing a keyword from an identifier using pattern priority (the rule listed first wins on a tie)'
    ],
    answers: [0, 2],
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'A finite automaton has a fixed number of states and cannot count without bound, so any task that needs unbounded counting or memory of prior context cannot be done purely lexically. Option 1 is impossible for the scanner: checking arbitrarily deep balanced parentheses is the classic context-free-but-not-regular problem (by the pumping lemma for regular languages), so it is left to the parser, which has a stack. Option 3 is likewise impossible lexically: knowing whether a name was declared earlier requires the symbol table state accumulated across statements, which is semantic analysis, not pattern matching on the current lexeme. Option 2 is possible: floating point constants are described by a straightforward regular expression such as digit+(.digit+)?((e|E)(+|-)?digit+)?, well within the power of a DFA. Option 4 is also possible: giving the keyword pattern higher priority than the generic identifier pattern when both match the same maximal lexeme is exactly how lex-style tie-breaking works. Hence the correct selections are options 1 and 3.'
  },
  {
    id: 'compiler-lexical-y3',
    q: 'How many tokens does a C lexical analyzer produce for the statement: while(x<=100&&y!=0){z=z+1;} (Enter your numerical answer.)',
    options: [],
    answer: 18,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'List the lexemes strictly left to right using maximal munch: while (keyword, 1), ( (2), x (identifier, 3), <= (compound relational operator, one token, 4), 100 (integer constant, 5), && (compound logical operator, one token, 6), y (identifier, 7), != (compound relational operator, one token, 8), 0 (integer constant, 9), ) (10), { (11), z (identifier, 12), = (13), z (identifier, 14), + (15), 1 (integer constant, 16), ; (17), } (18). Every compound operator (<=, &&, !=) is exactly one token by maximal munch, and each brace/semicolon/paren is its own token. Total = 18 tokens.'
  },
  {
    id: 'compiler-lexical-y4',
    q: 'How many tokens does a C lexical analyzer produce for the statement: for(i=0;i<n;i++)sum+=arr[i]; (Enter your numerical answer.)',
    options: [],
    answer: 20,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Scan left to right: for (keyword, 1), ( (2), i (identifier, 3), = (4), 0 (constant, 5), ; (6), i (identifier, 7), < (8), n (identifier, 9), ; (10), i (identifier, 11), ++ (compound operator, one token by maximal munch, 12), ) (13), sum (identifier, 14), += (compound operator, one token, 15), arr (identifier, 16), [ (17), i (identifier, 18), ] (19), ; (20). No whitespace produces tokens, and ++ / += are each a single token, never split into two symbols. Total = 20 tokens.'
  },
  {
    id: 'compiler-lexical-y5',
    q: 'Consider the regular expression (a|b)*abb, describing all strings over {a,b} that end in "abb". How many states does the MINIMAL DFA recognizing this language have (including the start state and any dead/trap-free accepting design, counting only states actually needed)? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'The minimal DFA for "ends in abb" needs one state per distinct length of matched suffix of "abb" seen so far: state A (start, and also reached whenever the running suffix match is reset to nothing), state B (the most recent character seen extends the match to "a"), state C (the last two characters seen match "ab"), and state D (the last three characters seen match "abb", the unique accepting state). The transition table is A-a->B, A-b->A, B-a->B, B-b->C, C-a->B, C-b->D, D-a->B, D-b->A. No two of these four states are equivalent, since each remembers a genuinely different matched-suffix length, so no further minimization is possible. Hence the minimal DFA has exactly 4 states.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-parsing';}).questions.push(
  {
    id: 'compiler-parsing-y1',
    q: 'Which of the following statements about parser classes are TRUE? (Select ALL that apply)',
    options: [
      'Every SLR(1) grammar is also LALR(1)',
      'Merging LR(1) states with identical LR(0) cores to build the LALR(1) table can introduce new shift-reduce conflicts that were absent from the canonical LR(1) collection',
      'Every unambiguous context-free grammar is LL(1)',
      'A grammar containing left recursion cannot be used directly by a predictive (top-down, table-driven LL) parser without first eliminating the left recursion'
    ],
    answers: [0, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: the power hierarchy is LL(1) subset-of SLR(1) subset-of LALR(1) subset-of LR(1), so every grammar accepted by the SLR(1) construction is also accepted by the (at-least-as-powerful) LALR(1) construction. Option 2 is false: merging states that share an LR(0) core can only ever create new reduce/reduce conflicts (because the union of the merged lookahead sets can make two different completed items valid on an overlapping lookahead); it can never introduce a shift-reduce conflict that the canonical LR(1) collection did not already have, since shift actions depend only on the LR(0) core, which is unchanged by merging. Option 3 is false: unambiguous is necessary but not sufficient for LL(1) — a grammar can be unambiguous yet fail LL(1) due to left recursion or a FIRST/FOLLOW clash between alternatives (the classic counterexample is any left-recursive but unambiguous grammar). Option 4 is true: left recursion (A -> A alpha | beta) makes a predictive parser loop forever trying to expand A before consuming input, so it must first be rewritten (A -> beta A-prime, A-prime -> alpha A-prime | epsilon) before an LL parser can use it. Hence the correct selections are options 1 and 4.'
  },
  {
    id: 'compiler-parsing-y2',
    q: 'For a context-free grammar to be usable with classical operator-precedence parsing, which of the following conditions are REQUIRED? (Select ALL that apply)',
    options: [
      'The grammar must contain no epsilon-productions',
      'No production body may contain two adjacent nonterminals',
      'The grammar must be ambiguous, since precedence and associativity resolve the ambiguity',
      'The grammar must first be left-factored, exactly as required for LL(1) parsing'
    ],
    answers: [0, 1],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Operator-precedence parsing needs an "operator grammar", defined by exactly two structural conditions: option 1, no epsilon-productions (otherwise the precedence relations between adjacent terminals become ill-defined), and option 2, no production body may have two nonterminals adjacent to each other (there must always be at least one terminal between any two nonterminals, so a definite precedence relation can be assigned between consecutive terminals on the stack and input). Option 3 is false: ambiguity is not a requirement of the grammar class; operator-precedence parsing works on operator grammars, ambiguous or not, and the precedence table is built independently from grammar ambiguity. Option 4 is false: left-factoring is a requirement for LL(1)/predictive parsing so that one lookahead symbol suffices to choose an alternative; it has nothing to do with the structural conditions for an operator grammar. Hence the correct selections are options 1 and 2.'
  },
  {
    id: 'compiler-parsing-y3',
    q: 'For the grammar S -> A B C ; A -> a A | epsilon ; B -> b ; C -> c C | epsilon, compute FOLLOW(A), FOLLOW(B) and FOLLOW(C). What is the TOTAL number of terminal/$ entries summed across these three FOLLOW sets (count $ as one entry each time it appears, and count each set separately even if a symbol repeats across sets)? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'FIRST(B) = {b} (no epsilon, since B -> b only). FIRST(C) = {c, epsilon}. From S -> A B C: A is followed by B, so add FIRST(B) - {epsilon} = {b} to FOLLOW(A); since FIRST(B) has no epsilon, nothing more is added here, and A -> aA contributes nothing new. So FOLLOW(A) = {b}, 1 entry. B is followed by C, so add FIRST(C) - {epsilon} = {c} to FOLLOW(B); since epsilon is in FIRST(C), also add FOLLOW(S) = {$} to FOLLOW(B) (because C can vanish, letting whatever follows S follow B too). So FOLLOW(B) = {c, $}, 2 entries. C is at the end of S -> ABC, so add FOLLOW(S) = {$} to FOLLOW(C); the recursive C -> cC contributes FOLLOW(C) to itself, nothing new. So FOLLOW(C) = {$}, 1 entry. Total entries = 1 (FOLLOW(A)) + 2 (FOLLOW(B)) + 1 (FOLLOW(C)) = 4.'
  },
  {
    id: 'compiler-parsing-y4',
    q: 'How many states are there in the canonical LR(0) collection (the LR(0) automaton) for the augmented grammar S\' -> S ; S -> ( S ) | a ? (Enter your numerical answer.)',
    options: [],
    answer: 6,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Build the canonical collection by closure and goto. I0 = closure({S\'->.S}) = {S\'->.S, S->.(S), S->.a}. goto(I0,S) = I1 = {S\'->S.} (accepting state). goto(I0,a) = I2 = {S->a.} (reduce state). goto(I0,"(") = I3 = {S->(.S), S->.(S), S->.a}. goto(I3,S) = I4 = {S->(S.)} (dot before the closing paren). goto(I3,"(") loops back into I3\'s own shape (an equivalent state, call it reachable and already counted once further closure is compared) and goto(I3,a) = I2 (same state as before, reused). goto(I4,")") = I5 = {S->(S).} (reduce state, this is the accepting-shaped state for a fully matched parenthesization). Enumerating all distinct states obtained: I0, I1, I2, I3, I4, I5 — six states in total, since goto(I3,"(") returns to a state identical in item-set to I3 itself and goto(I3,a) coincides with I2, so no new states are created beyond these six.'
  },
  {
    id: 'compiler-parsing-y5',
    q: 'For the production set { S -> a A b , A -> c A , A -> d }, how many distinct LR(0) items (dotted positions) exist in TOTAL across these three productions, counting only the dot positions within each individual production body (not the closure of any parser state)? Recall a production of length n (n grammar symbols on its right-hand side) has exactly n+1 dotted positions. (Enter your numerical answer.)',
    options: [],
    answer: 9,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Apply the rule "a production with n symbols on its right-hand side has n+1 possible dot positions" to each production. S -> a A b has 3 symbols on its right-hand side (a, A, b), giving 3+1 = 4 items: S->.aAb, S->a.Ab, S->aA.b, S->aAb. A -> c A has 2 symbols, giving 2+1 = 3 items: A->.cA, A->c.A, A->cA. A -> d has 1 symbol, giving 1+1 = 2 items: A->.d, A->d. Summing across all three productions: 4 + 3 + 2 = 9 distinct LR(0) items in total.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-sdt';}).questions.push(
  {
    id: 'compiler-sdt-y1',
    q: 'Which of the following statements about attribute grammars are TRUE? (Select ALL that apply)',
    options: [
      'Every S-attributed syntax-directed definition is also L-attributed',
      'An L-attributed SDD can always be evaluated using a single left-to-right, depth-first traversal of the parse tree',
      'In an L-attributed SDD, an inherited attribute of a right-hand-side symbol is allowed to depend on synthesized attributes of symbols appearing to its right in the same production',
      'S-attributed SDDs fit naturally with bottom-up (LR) parsing because every semantic action can run exactly at reduction time using values already on the parser stack'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: a synthesized-only SDD trivially satisfies the L-attributed restriction ("inherited attributes depend only on the left and on the head\'s own inherited attributes") because it has no inherited attributes to check at all, so S-attributed is a special case of L-attributed. Option 2 is true: that is precisely the defining guarantee of the L-attributed class — the left-to-right dependency restriction is exactly what makes a single depth-first left-to-right pass sufficient to evaluate every attribute. Option 3 is false and is the definition being violated: L-attributed forbids an inherited attribute from depending on anything to its right, whether synthesized or inherited; depending on a right sibling\'s synthesized attribute is exactly the kind of dependency that breaks single-pass left-to-right evaluation. Option 4 is true: because every attribute is synthesized (bottom-up), and a bottom-up LR parser completes all of a production\'s children before reducing it, the semantic action for a production can simply run at the moment of reduction, reading already-computed values off the semantic stack. Hence the correct selections are options 1, 2 and 4.'
  },
  {
    id: 'compiler-sdt-y2',
    q: 'Consider one-pass code generation for boolean expressions and control flow using the standard backpatching technique. Which of the following statements are TRUE? (Select ALL that apply)',
    options: [
      'truelist and falselist are synthesized attributes holding the numbers of jump instructions whose target address has not yet been filled in',
      'A marker nonterminal M with the production M -> epsilon is used purely to record the current instruction count at a specific point in the parse, and it emits no code of its own',
      'The function backpatch(list, target) evaluates the boolean expression associated with list at compile time and produces a 0/1 value',
      'Backpatching allows code for constructs like if and while to be generated in a single left-to-right pass without first building an explicit parse tree or syntax tree'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: truelist and falselist collect the indices of jump instructions generated so far whose target label is still blank; they are synthesized bottom-up as the boolean expression is parsed. Option 2 is true: an epsilon-production on a marker nonterminal is a standard trick purely to "record" nextinstr (the current instruction count) as a synthesized attribute at that exact point in the derivation, without emitting any three-address instruction itself. Option 3 is false: backpatch(list, target) does not evaluate anything; it is a bookkeeping procedure that goes through every instruction number in list and fills in its previously blank jump target field with the value target, purely a patching operation on already-generated code. Option 4 is true: this is the whole motivation for backpatching — it lets the compiler emit jump instructions with placeholder targets during a single left-to-right parse and fix them up later using synthesized lists, avoiding the need to build and then walk a full tree to resolve forward jump targets. Hence the correct selections are options 1, 2 and 4.'
  },
  {
    id: 'compiler-sdt-y3',
    q: 'Consider the L-attributed SDD: D -> T L ; T -> int | float ; L -> L1 , id { L1.in = L.in; addtype(id.entry, L.in) } | id { addtype(id.entry, L.in) }, where L.in is inherited (set to T.type at the top by D -> T L { L.in = T.type }). For the declaration "float a, b, c, d;", how many total addtype() calls are executed while processing this single declaration? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Every id in the declarator list triggers exactly one addtype(id.entry, L.in) call, once when that id is reduced by either the L -> id base case or the L -> L1 , id recursive case. The declaration "float a, b, c, d;" lists exactly four identifiers: a, b, c and d. Each one appears in exactly one L-production instance and gets exactly one addtype() call (all tagged with L.in = "float", inherited down from T.type through the chain of L nodes). Therefore the total number of addtype() calls is 4.'
  },
  {
    id: 'compiler-sdt-y4',
    q: 'Using the same SDD as above (L -> L1 , id | id, with L.in inherited left to right from D -> T L), consider the declaration "int p, q, r;". How many distinct parse-tree nodes for the nonterminal L are created while parsing the declarator list "p, q, r" (count every L / L1 instance in the derivation, i.e. every place L.in is separately instantiated as an inherited attribute)? (Enter your numerical answer.)',
    options: [],
    answer: 3,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Because L -> L1 , id | id is left-recursive, "p, q, r" is built bottom-up as: the innermost L-node covers just "p" via L -> id; the next L-node covers "p, q" via L -> L1 , id where L1 is the first node; the outermost L-node covers "p, q, r" via L -> L1 , id where L1 is the second node. That gives exactly three separate L-nonterminal instances in the parse tree (one per identifier added to the list), each receiving its own L.in value threaded down from the outermost node (whose L.in = T.type = "int") through L1.in = L.in at each level. So the count of distinct L nodes is 3.'
  },
  {
    id: 'compiler-sdt-y5',
    q: 'For the statement if (a < b) x = 1; translated with the standard backpatching SDT scheme (B.truelist backpatched to the label right before the then-branch code, S.nextlist collecting B.falselist merged with the then-branch\'s own nextlist), how many three-address instructions are generated in total for this statement, including both jump instructions produced for the boolean test and the assignment code for the then-branch? (Enter your numerical answer.)',
    options: [],
    answer: 3,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Translating the boolean test a < b in jump-code style produces exactly two conditional/unconditional jump instructions: instruction 1 is "if a < b goto _" (its target added to B.truelist) and instruction 2 is "goto _" (its target added to B.falselist). Then the then-branch "x = 1;" contributes exactly one more instruction: instruction 3, "x = 1". A marker nonterminal placed right after "(B)" records that instruction 3 is where the then-branch code begins, so backpatch(B.truelist, 3) fills instruction 1\'s target with 3; B.falselist (instruction 2) is left in S.nextlist to be patched later against whatever follows the whole if statement. Counting all generated instructions: 2 (for the test) + 1 (for the then-branch) = 3 instructions in total.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-icg';}).questions.push(
  {
    id: 'compiler-icg-y1',
    q: 'Which of the following statements about three-address code (TAC) generation are TRUE? (Select ALL that apply)',
    options: [
      'A quadruple representation stores (op, arg1, arg2, result) explicitly, so it does not need a separate symbol-table lookup to relocate temporaries when statements are reordered',
      'A triple representation refers to the result of an instruction by the position (index) of that instruction, which makes reordering triples during optimization awkward because every reference to a moved instruction must be updated',
      'Short-circuit (jumping) code for boolean expressions can produce a program with fewer instructions on the executed path than always evaluating and testing an explicit 0/1 value',
      'Backpatching is a technique that requires two full passes over the source program: one pass to generate code with all jump targets left blank, and a second pass over the source to fill them in'
    ],
    answers: [0, 1, 2],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: because a quadruple names its result as an explicit temporary/variable field, moving a quadruple around (e.g. during common-subexpression elimination or code motion) does not disturb any other quadruple, since nothing refers to it positionally. Option 2 is true: a triple has no separate result field and is instead referred to by other triples using its own index/position in the triple array (i.e. "(op, arg1, arg2)" where an arg can be "the result of triple #5"); if triples are reordered for optimization, every such positional reference must be patched, which is exactly the well-known drawback of triples versus quadruples. Option 3 is true: short-circuit/jumping code for something like "if (a<b) then ... " never has to explicitly materialize a boolean 0/1 value and then test it — it jumps directly to the true or false branch, which is often strictly fewer instructions than computing an explicit truth value into a temporary and then branching on that temporary. Option 4 is false: backpatching operates entirely within a single pass over the source/parse — it leaves the *target field* of jump instructions blank when a label is not yet known and fills those in later using label-list bookkeeping (truelist/falselist/nextlist), but it never requires re-scanning the source program a second time; it only requires a second look at the *already generated* instruction list, not the source text.'
  },
  {
    id: 'compiler-icg-y2',
    q: 'Which of the following statements about Directed Acyclic Graphs (DAGs) used for basic-block optimization are TRUE? (Select ALL that apply)',
    options: [
      'A DAG node is created for every occurrence of an operator in a basic block, even if an identical computation on identical operands already has a node',
      'DAG construction for a basic block naturally performs common-subexpression elimination, since a repeated computation on the same live operand values is represented by reusing the existing node',
      'Leaves of the DAG represent initial values of variables and constants that enter the basic block',
      'A DAG can be used to detect that an assignment to a variable is dead (its value is never used) if the corresponding node has no remaining live identifiers attached to it and nothing after it in the block uses that node'
    ],
    answers: [1, 2, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is false: this is precisely what a DAG avoids — before creating a new node for an operator, the DAG construction algorithm checks whether a node computing the same operator on the same current operand nodes already exists, and reuses it instead of duplicating it; that reuse is the whole point of building a DAG rather than a plain tree/list of instructions. Option 2 is true: reusing an existing node for a repeated identical computation (with unchanged operand values) is exactly common-subexpression elimination performed as a side effect of DAG construction. Option 3 is true: leaves are created for the values that are live on entry to the block — the initial values of variables — and for constants; interior nodes represent operators applied to these. Option 4 is true: if a node is labeled only with a variable whose value is later overwritten before ever being read (i.e. its list of attached identifiers becomes empty and no later leaf/interior node uses it), that assignment is dead code and can be removed since it has no observable effect within (or after) the block.'
  },
  {
    id: 'compiler-icg-y3',
    q: 'A one-address-code (accumulator-style) statement-by-statement translator, with no common-subexpression elimination across statements, generates TAC for the sequence: t1 = a + b; t2 = t1 * c; t3 = a + b; t4 = t2 - t3; How many TAC instructions are generated in total for this sequence exactly as written (treat each of the four given assignment statements as needing exactly one TAC instruction each, since each right-hand side already has at most one operator)? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Each of the four statements already has a right-hand side with at most one operator (a+b, t1*c, a+b, t2-t3), so the naive per-statement generator emits exactly one three-address instruction per statement with no splitting needed: (1) t1 = a + b, (2) t2 = t1 * c, (3) t3 = a + b, (4) t4 = t2 - t3. That is exactly 4 instructions in total (note that without CSE, statement 3 is regenerated in full even though it duplicates statement 1 — DAG-based construction would instead reuse t1, but a naive one-pass generator does not).'
  },
  {
    id: 'compiler-icg-y4',
    q: 'Consider the expression (a + b) * (a + b) + (a - b) translated into a DAG for a single basic block, where a and b are the only live variables entering the block. Counting only the interior (operator) nodes of the DAG (not the leaf nodes for a and b), how many distinct interior nodes does the DAG contain, given that identical subexpressions on identical operands are represented by a single shared node? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The two occurrences of "a + b" are structurally identical and operate on the same unchanged leaves a and b, so DAG construction represents both with a single shared "+" node, N1 = a+b, instead of building it twice. The multiplication needs its own interior node, N2 = N1 * N1, reusing N1 as both operands. The subtraction a - b is a different operator applied to a and b, so it cannot share N1 (only identical operator AND identical operands are merged); it gets its own node N3 = a - b. Finally the outer addition needs one more node, N4 = N2 + N3, which is the DAG root. Listing all interior nodes: N1 (a+b, shared), N2 (square of N1), N3 (a-b), N4 (final sum) — exactly 4 distinct interior nodes. Without sharing, a plain expression tree would have needed 5 operator nodes (two separate a+b nodes, one multiply, one subtract, one outer add); DAG sharing removes exactly the one duplicate a+b node, giving 5 - 1 = 4, which matches.'
  },
  {
    id: 'compiler-icg-y5',
    q: 'Using backpatching for the boolean expression (a < b) || (c < d) inside "if" translation, with jumping (short-circuit) code where the OR operator is translated so that the first operand\'s falselist falls through to evaluate the second operand, how many conditional/unconditional jump instructions are generated for evaluating this boolean expression alone (not counting the then/else branch bodies)? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Short-circuit jumping code for E1 || E2 generates: for E1 = (a<b): "if a<b goto _" (true jump, goes straight to E1.truelist, which becomes part of the whole expression\'s truelist) and "goto _" (false jump, goes to E1.falselist) — 2 instructions. E1.falselist is backpatched to fall through to the code for E2 (no extra instruction needed for that fallthrough). For E2 = (c<d): "if c<d goto _" (true jump, added to E2.truelist) and "goto _" (false jump, added to E2.falselist) — 2 more instructions. E1.truelist and E2.truelist are merged into the overall expression\'s truelist; E2.falselist becomes the overall falselist. Total jump instructions = 2 (for E1) + 2 (for E2) = 4.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-runtime';}).questions.push(
  {
    id: 'compiler-runtime-y1',
    q: 'Which of the following statements about storage-allocation strategies for procedure activations are TRUE? (Select ALL that apply)',
    options: [
      'Stack allocation can be used for a language whose procedures may not be recursive as well as for one whose procedures may be recursive',
      'A language that allows a nested procedure to return a reference to a local variable declared in an enclosing procedure, and to keep using that reference after the enclosing procedure has returned, cannot safely use pure stack allocation for that variable',
      'Static allocation binds a name to a storage location once, at compile time, for the entire execution of the program, which makes it fundamentally incompatible with any form of recursion in the language as a whole',
      'Heap allocation is needed to support arbitrary lifetimes for data, such as objects whose extent is not tied to the activation of the procedure that created them'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: stack allocation is a general implementation strategy for activation records that works whether or not the language permits recursion — recursive calls simply push more frames onto the same stack; non-recursive languages just never need more than a bounded stack depth for that reason. Option 2 is true: this is the classic dangling-reference problem — if a variable\'s storage is popped off the stack when its owning activation returns, any surviving reference to it becomes invalid; languages that allow this pattern (e.g. returning a pointer/closure over a local) must give that variable heap or otherwise extended lifetime, not pure stack storage. Option 3 is false: static allocation is incompatible with recursion only for the specific names that would need multiple simultaneous live instances (a recursive procedure\'s own locals cannot be purely static, since each active call needs its own copy); it does not make the entire program static allocation impossible in general — non-recursive parts of a program can still use static allocation even in a language whose other procedures recurse (mixed strategies are common, e.g. Fortran-style static locals for non-recursive routines). Option 4 is true: heap allocation exists precisely to give storage a lifetime independent of any particular procedure activation, letting an object outlive the call that created it, up until it is explicitly freed or garbage collected.'
  },
  {
    id: 'compiler-runtime-y2',
    q: 'Which of the following statements about access links (static links) versus control links (dynamic links) in activation records are TRUE? (Select ALL that apply)',
    options: [
      'The control link always points to the activation record of the caller, i.e. the activation that is dynamically resuming control when the current procedure returns',
      'The access link is used to support non-local (lexically scoped) name access by pointing to the activation record of the lexically enclosing procedure\'s most recent activation',
      'In a language with no nested procedure declarations (procedures cannot be defined inside other procedures), access links are unnecessary because non-local data can be reached directly through global/static storage or one level of the control-link chain',
      'The access link and the control link always point to the same activation record for every call, regardless of the nesting structure of the program'
    ],
    answers: [0, 1, 2],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: the control (dynamic) link records the caller\'s activation record so that control can return there, and it always reflects the actual call sequence at run time regardless of how procedures are lexically nested in the source. Option 2 is true: the access (static) link is built specifically to support lexical scoping — it points to the activation of the lexically (textually) enclosing procedure\'s most recent invocation, letting a nested procedure walk a chain of access links to reach nonlocal variables declared in enclosing scopes, independent of the actual call chain. Option 3 is true: without nested procedure declarations, every procedure\'s nonlocal names are either global (reachable via a single fixed area) or are truly local, so there is no lexical-nesting chain to traverse, making access links pointless — this is exactly why C, which disallows nested functions, has no need for static links. Option 4 is false: this is only true in the trivial case where each call\'s caller happens to also be its lexically enclosing procedure; in general (e.g. a deeply nested inner procedure called directly from main, or mutual/indirect recursion), the caller (control link target) and the lexically enclosing activation (access link target) are different activation records, which is the whole reason two separate links are needed.'
  },
  {
    id: 'compiler-runtime-y3',
    q: 'A procedure P calls itself recursively 5 times before hitting its base case (i.e. there are 6 total activations of P alive at the deepest point: the initial call plus 5 recursive calls). If each activation record for P occupies exactly 40 bytes on the runtime stack, how many bytes of stack space are occupied by P\'s activation records at the point of maximum recursion depth (ignore any other frames on the stack)? (Enter your numerical answer.)',
    options: [],
    answer: 240,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'At maximum depth there are 6 simultaneously live activations of P (the original call plus the 5 recursive calls before the base case returns), and each one needs its own 40-byte activation record since stack allocation gives every live activation independent storage. Total stack space used by P\'s frames = 6 x 40 = 240 bytes.'
  },
  {
    id: 'compiler-runtime-y4',
    q: 'Consider nested procedures: MAIN contains procedure A (nesting depth 1 relative to MAIN), and A contains procedure B (nesting depth 2 relative to MAIN). If B is called directly from MAIN (not through A), how many access-link (static-link) hops must be followed starting from B\'s own activation record to reach the activation record of A (B\'s lexically immediately enclosing procedure), assuming B\'s access link always correctly points to the most recent activation of its lexically enclosing procedure regardless of who actually called it? (Enter your numerical answer.)',
    options: [],
    answer: 1,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The access link is set up based on lexical (static) nesting, not the dynamic call chain — regardless of who actually calls B at run time, B\'s access link is always made to point to the most recent activation of B\'s lexically enclosing procedure, which is A (since B is declared textually inside A). So exactly 1 hop along B\'s own access link reaches A\'s activation record directly, even though B was called from MAIN rather than from A. (Note: for this to be correct in general, the calling convention must locate the correct enclosing A-activation via A\'s own access link chain at the call site in MAIN, but from B\'s own frame, only 1 hop is needed to reach A.)'
  },
  {
    id: 'compiler-runtime-y5',
    q: 'A garbage collector using reference counting maintains a count of incoming references for each heap object. Starting from an object X with reference count 3, the following events occur in order: (1) one reference to X is dropped, (2) a new reference to X is created, (3) two references to X are dropped, (4) one more reference to X is dropped. Assuming the count is decremented/incremented exactly once per such event and X is collected the instant its count reaches 0, what is X\'s reference count immediately after event (4), or 0 if X was already collected before event (4) (in which case answer 0)? (Enter your numerical answer.)',
    options: [],
    answer: 0,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Start: count = 3. Event 1 (drop): 3 - 1 = 2. Event 2 (new reference): 2 + 1 = 3. Event 3 (drop two references): 3 - 2 = 1. Event 4 (drop one more): 1 - 1 = 0. The count never hit 0 before event 4 (it was 2, 3, then 1 after event 3), so X survives through event 3 and is collected exactly at event 4, when the count reaches 0. The final/reported count is 0.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-optimization';}).questions.push(
  {
    id: 'compiler-optimization-y1',
    q: 'Which of the following statements about local versus global common-subexpression elimination (CSE) are TRUE? (Select ALL that apply)',
    options: [
      'Local CSE, performed via a DAG over a single basic block, can only detect and eliminate redundant computations whose operands have not been redefined between the two occurrences within that same block',
      'Global CSE across basic blocks requires data-flow analysis (such as available-expressions analysis) because whether an expression is redundant at a later block depends on the paths taken through the control-flow graph to reach it',
      'An expression is available at a program point if it has been computed on every path reaching that point and none of its operands have been redefined since the last such computation on any of those paths',
      'Global CSE is always safe to apply even without checking for redefinitions along intervening paths, since any two textually identical expressions in a program must compute the same value everywhere'
    ],
    answers: [0, 1, 2],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: within one basic block a DAG merges nodes for the same operator on the same current operand values, but if an operand is reassigned between two textually identical computations, the second occurrence gets a fresh node (using the new operand value) rather than being merged, so redefinitions correctly block the optimization locally. Option 2 is true: once you leave a single block, whether an expression\'s earlier computed value is still valid at a later point depends on what happens along every possible control-flow path between the two points (was an operand redefined on some path? was the expression itself not computed on some path?), which is exactly the kind of question available-expressions data-flow analysis is designed to answer. Option 3 is true: this is the standard definition of the available-expressions data-flow property, used as the safety condition for global CSE. Option 4 is false: two textually identical expressions can compute different values at different points if any operand has been reassigned in between (e.g. on some but not all paths, or via aliasing/pointer effects), which is precisely why global CSE cannot be applied blindly by pattern-matching text and must instead consult data-flow information.'
  },
  {
    id: 'compiler-optimization-y2',
    q: 'Which of the following statements about loop optimizations are TRUE? (Select ALL that apply)',
    options: [
      'Loop-invariant code motion moves a computation whose operands never change inside the loop body from inside the loop to a preheader block that executes once before the loop starts',
      'Strength reduction typically replaces a more expensive operation inside a loop (such as multiplication driven by a loop index) with a cheaper equivalent operation (such as addition), usually by introducing a new induction variable updated incrementally',
      'Induction-variable elimination can remove a variable from a loop entirely if its only use was to help compute another induction variable that has itself been replaced or is no longer needed after strength reduction',
      'Loop-invariant code motion is unsound in general and can never be safely applied to any expression that involves a load from memory, even if that memory location is never written to inside the loop'
    ],
    answers: [0, 1, 2],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: this is exactly the definition of loop-invariant code motion — hoisting a computation whose value would be identical on every iteration (because its operands are not modified inside the loop) out to a preheader that runs once, saving that recomputation on every subsequent iteration. Option 2 is true: strength reduction on an induction variable such as i in "t = i * c" (with i incremented by 1 each iteration) introduces a new variable t that is instead incremented by c each iteration (t = t + c), replacing a multiply with a cheaper add, which is the textbook strength-reduction transformation. Option 3 is true: after strength reduction, the original induction variable may become dead if its only remaining purpose was to drive the now-replaced computation (and it is not used for the loop test or elsewhere), letting induction-variable elimination remove it entirely, reducing the number of live variables and updates per iteration. Option 4 is false: loop-invariant code motion can be safely applied to a memory load as long as the compiler can prove (via alias analysis or other means) that the memory location is not written anywhere reachable inside the loop and the load cannot fault differently at a different point — this "can never" absolute claim is too strong; such analyses and hoisting of loop-invariant loads are routinely and safely performed by real optimizing compilers.'
  },
  {
    id: 'compiler-optimization-y3',
    q: 'A basic block contains the following TAC instructions in order: t1 = a + b; t2 = a + b; t3 = t1 * c; t4 = t2 * c; t5 = t3 + t4; After building a DAG for this block and eliminating common subexpressions (merging identical operator/operand nodes), how many distinct interior (operator) nodes remain in the DAG? (Enter your numerical answer.)',
    options: [],
    answer: 3,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'a+b is computed identically for both t1 and t2 (same operator, same unchanged operands a and b), so DAG construction merges them into one shared node N1 = a+b (used for both t1 and t2). Then t3 = t1*c and t4 = t2*c both reduce to N1*c since t1 and t2 both point to N1 — this is also the exact same operator on the exact same operand node N1 and the same c, so it too collapses to a single shared node N2 = N1*c (serving as both t3 and t4). Finally t5 = t3+t4 becomes N2+N2, which needs its own node N3 = N2+N2 (a distinct new operator application, even though both operands happen to be the same node). Total distinct interior nodes: N1 (a+b), N2 (N1*c), N3 (N2+N2) = 3.'
  },
  {
    id: 'compiler-optimization-y4',
    q: 'For the loop "for (i = 0; i < n; i = i + 1) { x = a[i]; y = b + c; z = z + y; }" where a, b, c are never modified inside the loop body and n is not modified inside the loop, how many of the three assignment statements inside the loop body (x = a[i]; y = b + c; z = z + y;) are loop-invariant computations eligible to be hoisted to a preheader (consider the right-hand-side computation of each statement; a statement counts as loop-invariant only if its right-hand side\'s value is guaranteed identical on every iteration)? (Enter your numerical answer.)',
    options: [],
    answer: 1,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'x = a[i]: the right-hand side depends on i, which changes every iteration, so this is NOT loop-invariant. y = b + c: both b and c are never modified inside the loop, so b+c computes the exact same value on every iteration — this IS loop-invariant and can be hoisted (y can be computed once in the preheader). z = z + y: the right-hand side depends on z, which is itself reassigned by this very statement every iteration (it accumulates), so its value is different each iteration — this is NOT loop-invariant. Exactly 1 of the 3 statements (y = b + c) is loop-invariant.'
  },
  {
    id: 'compiler-optimization-y5',
    q: 'A control-flow graph has basic blocks B1 (entry) -> B2, B1 -> B3, B2 -> B4, B3 -> B4, B4 -> B5 (exit). The expression "a + b" is computed (and a, b are not redefined afterward on that path) in B2 and also in B3, but is NOT computed in B1 or B4, and a, b are never redefined anywhere in the graph. Using the available-expressions data-flow equations (an expression is available at the entry of a block only if it is available in IN of every predecessor, intersected appropriately), is "a + b" available at the entry of B4? Answer 1 for yes (available) or 0 for no (not available). (Enter your numerical answer.)',
    options: [],
    answer: 1,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Available expressions use a "meet = intersection" data-flow framework (an expression is available at a point only if it is available along every path reaching that point). B4\'s predecessors are B2 and B3. Since a+b is computed in B2 (and a, b are never redefined after, including within B2 itself before exit and afterward), a+b is available at the exit of B2 (OUT(B2) contains a+b). Symmetrically, a+b is computed in B3 with no later redefinition of a or b, so a+b is available at the exit of B3 (OUT(B3) contains a+b) too. Since a+b is available along BOTH paths into B4 (via B2 and via B3), the intersection IN(B4) = OUT(B2) ∩ OUT(B3) still contains a+b. Therefore a+b IS available at the entry of B4. Answer: 1.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-lexical';}).questions.push(
  {
    id: 'compiler-lexical-z7',
    q: 'Consider building a DFA for the token pattern of unsigned integer or floating-point literals given by the regular expression digit+ ( . digit+ )? ( (e|E) (+|-)? digit+ )? via Thompson construction followed by subset construction. Which of the following statements about the resulting minimized DFA are TRUE? (Select ALL that apply)',
    options: [
      'The DFA needs at least one state that is reached only after seeing a "." following one or more digits, distinguishing "12" (still possibly extendable to "12.3") from "12." (decimal point already seen)',
      'After the DFA has consumed characters matching "digit+ . digit+ e", if the very next character is not a digit and not a sign, the DFA can safely reject and there is no valid completion of the token from that state',
      'The DFA must accept in a state reached right after consuming just the exponent marker "e" alone, before any exponent digit is seen, because the "e" alone could itself be the end of a valid numeric token',
      'A single DFA state can correctly represent both "just finished the integer part, no decimal point or exponent seen yet" and "just finished an exponent digit", because both are accepting states with identical outgoing transitions on all subsequent input'
    ],
    answers: [0, 1],
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Option 1 is true: the grammar treats "the digits before a decimal point" and "having just consumed a decimal point" as distinguishable prefixes (one still needs at least one digit to complete the fractional part if it continues with ".", the other is mid-token expecting mandatory fractional digits before it can accept again), so the automaton needs separate states to track this, e.g. distinguishing "read digit+" (accepting) from "read digit+ ." (not accepting, must see a digit next) from "read digit+ . digit+" (accepting again). Option 2 is true: once "digit+ . digit+ e" has been consumed, the grammar requires either an optional sign then mandatory exponent digits; if the next character is neither a sign nor a digit, no continuation can complete a valid token from that point (the "e" was consumed expecting to be followed eventually by digits), so rejection at this state is correct — this state is a non-accepting "trap toward digits/sign" state. Option 3 is false: the exponent marker "e" is only valid if followed (after an optional sign) by at least one digit — "digit+ . digit+ e" alone (with nothing after) is NOT a complete legal token per the given regex, since (e|E)(+|-)?digit+ requires the digit+ at the end; so the state right after just "e" must be non-accepting. Option 4 is false: even though both states might individually be accepting, they must be DISTINCT states because their outgoing transitions differ — "just finished the integer part" can transition to "." (decimal point, valid) or to "e"/"E" (valid, entering exponent) while "just finished an exponent digit" can only transition to another digit (to extend the exponent) and has no valid "." transition at all (a second decimal point after an exponent digit is invalid); different future behavior means they cannot be merged into one state even under minimization.'
  },
  {
    id: 'compiler-lexical-z8',
    q: 'A lexical analyzer for a language defines the keyword "int" and also allows general identifiers matching [a-zA-Z][a-zA-Z0-9]*, with the rule (as in most real scanners) that keywords take priority over the identifier pattern whenever both match the same maximal-munch lexeme. Given the input stream "integer = 5;" (11 characters before the space, i.e. i-n-t-e-g-e-r), how many tokens of type IDENTIFIER or KEYWORD are produced from scanning just the word "integer" (before the "=" sign), applying maximal munch correctly? (Enter your numerical answer.)',
    options: [],
    answer: 1,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'This question tests the classic maximal-munch + keyword-priority interaction, which is a common source of scanner bugs and GATE-style trick questions. Maximal munch says the scanner must first find the LONGEST prefix of the remaining input matching ANY token pattern before applying any priority rule between competing patterns of the SAME length. Although "int" matches the KEYWORD pattern after only 3 characters, the identifier pattern [a-zA-Z][a-zA-Z0-9]* can continue matching through all 7 characters "integer" (i-n-t-e-g-e-r), which is strictly longer than the 3-character match "int". Maximal munch always prefers the longest match regardless of what rule matched it, so the scanner continues past "int" and matches the full 7-character lexeme "integer", which does NOT equal the keyword "int" and therefore is classified as a single IDENTIFIER token, not as the KEYWORD "int" followed by an identifier "eger". The keyword-vs-identifier priority rule only applies as a tie-breaker WHEN two patterns match the identical (same-length) lexeme, which is not the case here. So exactly 1 token (one IDENTIFIER, "integer") is produced.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-parsing';}).questions.push(
  {
    id: 'compiler-parsing-z7',
    q: 'Consider the ambiguous dangling-else-shaped grammar S -> i S | i S e S | a, where i, e, a are terminals (if, else, other-statement) used to build an SLR(1) parsing table. In the canonical LR(0)/SLR(1) automaton, there exists a state reached after seeing "i S" (having just reduced/shifted into an S following an i) that contains both the item S -> i S . (a completed item ready to reduce) and the item S -> i S . e S (ready to shift on e). Which of the following statements about this state are TRUE? (Select ALL that apply)',
    options: [
      'This state has a shift-reduce conflict on lookahead symbol e if e is in FOLLOW(S), because the parser could either shift the e (per S -> i S . e S) or reduce by S -> i S (per S -> i S ., if e is in FOLLOW(S))',
      'Standard practice for this specific grammar is to resolve the conflict by preferring shift over reduce, which has the effect of associating a dangling else with the nearest unmatched if, matching the usual semantics of nested if-else in languages like C',
      'This shift-reduce conflict can never occur in any SLR(1) table for this grammar because SLR(1) parsers are guaranteed to be conflict-free for every grammar that is unambiguous',
      'If the parser generator instead always chooses reduce over shift whenever this conflict arises, the resulting parser would associate every "else" with the outermost (first, farthest) unmatched "if" rather than the nearest one'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Option 1 is true: this is exactly the textbook dangling-else shift-reduce conflict — in the state after "i S", seeing lookahead e, the parser item set contains both a shift action (continue matching S -> i S . e S, i.e. this if has a matching else) and, since e in FOLLOW(S), a reduce action (finish S -> i S ., treating the if as already complete with no else attached here). Option 2 is true: essentially every real parser generator (yacc, bison, etc.) resolves this specific, well-known conflict by defaulting to shift, and shifting here is exactly what causes the else to bind to the nearest enclosing unmatched if, which is the conventional and expected semantics. Option 3 is false: this grammar is ambiguous (it is the canonical dangling-else ambiguous grammar), so it is not SLR(1) at all in the sense of being automatically conflict-free — SLR(1) table construction for this grammar DOES produce this real shift-reduce conflict, which must be broken by an explicit disambiguating rule (like shift-preference); SLR(1) offers no guarantee of conflict-freedom for ambiguous grammars. Option 4 is true: if reduce is chosen instead of shift at this point, the inner if gets "closed" (reduced) before it ever gets a chance to see the following e, so the else instead attaches to whichever if is still open further out — effectively binding every dangling else to the outermost enclosing if rather than the nearest one, which is the opposite (and non-standard) behavior compared to shift-preference.'
  },
  {
    id: 'compiler-parsing-z8',
    q: 'A grammar has productions E -> E + T | T and T -> T * F | F and F -> ( E ) | id. In the canonical LR(1) (or LALR(1)) automaton for this grammar, consider the state reached after the parser has shifted "id" while trying to parse the input "id * id + id" from the very start. From that state (having just shifted the first id, with the entire rest "* id + id" plus end-of-input still to come), the parser must reduce F -> id regardless of what the next lookahead symbol is, because id only ever appears in the single production F -> id, so there is no ambiguity about which production to reduce by at this point. Given this, how many DISTINCT terminal symbols appear in FOLLOW(F) restricted to just {+, *, ), $} that could legally serve as the lookahead validating the reduce action F -> id in a correctly built LR table for this grammar (count how many of these four symbols can immediately follow F in some valid derivation)? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'FOLLOW(F) is computed from where F is used: F appears as T -> T * F (so whatever follows T also constrains here, and directly nothing new) and F -> ( E ) contributes ")" via E inside parens, and F itself is used inside T -> F and T -> T * F, so FOLLOW(F) = FOLLOW(T). FOLLOW(T) comes from E -> T (so FOLLOW(T) includes FOLLOW(E)) and E -> E + T (so FOLLOW(T) also includes FOLLOW(E) again) and T -> T * F (so FOLLOW(T) includes "*" itself, since T * F means after the first T comes "*"). FOLLOW(E) includes "$" (start symbol end-marker), ")" (from F -> ( E ), whatever follows the closing paren position, i.e. right after E inside "(E)" comes ")"), and "+" (from E -> E + T, after the first E comes "+"). So FOLLOW(E) = {+, ), $}, and FOLLOW(T) = FOLLOW(E) union {*} = {+, *, ), $}, and FOLLOW(F) = FOLLOW(T) = {+, *, ), $}. All four of the listed symbols +, *, ), $ are in FOLLOW(F), so all 4 of the restricted set {+, *, ), $} can validly serve as reduce-lookaheads for F -> id in an SLR(1)/LALR(1) table (this reduce action fires on any of these four lookaheads). Count = 4.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-sdt';}).questions.push(
  {
    id: 'compiler-sdt-z7',
    q: 'Given the SDD: E -> E1 + T { E.val = E1.val + T.val }; E -> T { E.val = T.val }; T -> T1 * F { T.val = T1.val * F.val }; T -> F { T.val = F.val }; F -> ( E ) { F.val = E.val }; F -> digit { F.val = digit.lexval }, evaluate this SDT bottom-up on the nested expression (2 + 3) * (4 + 1). What is the final E.val at the root of the parse tree? (Enter your numerical answer.)',
    options: [],
    answer: 25,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'This is standard left-to-right, standard-precedence arithmetic evaluation via the grammar\'s S-attributed rules, matching normal operator precedence (* binds tighter than +, and parentheses group). Innermost: F -> (E) for "(2+3)" requires evaluating E -> T -> F(2) then E1+T i.e. E.val = 2+3 = 5, so this F.val = 5. Similarly F -> (E) for "(4+1)" gives E.val = 4+1 = 5, so this F.val = 5. The outer structure is T -> T1 * F where T1.val (from the first parenthesized group, routed through T->F->(...)) = 5 and F.val (second parenthesized group) = 5, so T.val = 5 * 5 = 25. Finally E -> T gives E.val = T.val = 25. The root E.val = 25.'
  },
  {
    id: 'compiler-sdt-z8',
    q: 'Using the same SDD as above (E -> E1+T, E -> T, T -> T1*F, T -> F, F -> (E), F -> digit, all S-attributed with the natural evaluation rules) on the expression 2 * (3 + 4 * 5) - if this grammar also included E -> E1 - T { E.val = E1.val - T.val }, what would be the final E.val for 2 * (3 + 4 * 5) - 1 (evaluated with the usual precedence: * before +, before -, left-to-right for equal precedence, and parentheses grouping)? (Enter your numerical answer.)',
    options: [],
    answer: 45,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Evaluate inside-out following the grammar\'s built-in precedence (T handles * at tighter binding than E\'s + and -, and F -> (E) groups parens). Inside the parentheses: "3 + 4 * 5" first evaluates T -> T1*F for "4*5" giving T.val = 20 (since * binds tighter, F.val for digit 4 times F.val for digit 5), then E -> E1+T combines with the T -> F for digit 3, giving E.val = 3 + 20 = 23 inside the parens; so F.val for "(3+4*5)" = 23. Next, "2 * (3+4*5)" is T -> T1*F with T1.val = 2 (from T->F->digit 2) and F.val = 23, giving T.val = 2*23 = 46. This T reduces up through E -> T to give an E.val of 46 for everything before the trailing "- 1". Finally the outer E -> E1 - T applies with E1.val = 46 and the final T.val = 1 (from digit 1), giving the root E.val = 46 - 1 = 45.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-icg';}).questions.push(
  {
    id: 'compiler-icg-z7',
    q: 'For the expression a = (b - c) + (b - c) * (b - c), using DAG-based TAC generation (identical subexpressions on unchanged operands share one node) and then linearizing the DAG into three-address code with one instruction per distinct interior node plus the final assignment, how many TAC instructions are generated in total, including the final assignment to a? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'DAG interior nodes: N1 = b - c (all three occurrences of "b - c" share this single node since b, c are never reassigned). N2 = N1 * N1 (for the multiplication of the second and third occurrences). N3 = N1 + N2 (the outer addition). That is 3 interior nodes, each linearized to one TAC instruction (t1 = b - c; t2 = t1 * t1; t3 = t1 + t2), plus one final instruction a = t3. Total = 3 + 1 = 4 instructions.'
  },
  {
    id: 'compiler-icg-z8',
    q: 'Translating the nested boolean expression if ((a < b) && (c < d)) then S1 else S2 using backpatching (short-circuit jumping code, where && short-circuits: if the first operand is false, the second is never evaluated and control goes straight to the false branch), how many total jump instructions (conditional plus unconditional) are generated for evaluating just the boolean test "(a < b) && (c < d)" itself, not counting any instructions inside S1 or S2? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'For E1 = (a<b): "if a<b goto _" (true jump, into E1.truelist) and "goto _" (false jump, into E1.falselist) = 2 instructions. Since this is &&, E1.truelist is backpatched to fall through directly into the code for E2 (no extra instruction), while E1.falselist becomes part of the overall falselist (short-circuiting straight to the else branch). For E2 = (c<d): "if c<d goto _" (true jump, into E2.truelist) and "goto _" (false jump, into E2.falselist) = 2 more instructions. E2.truelist becomes the overall truelist (backpatched to S1) and E1.falselist merged with E2.falselist becomes the overall falselist (backpatched to S2). Total jump instructions = 2 + 2 = 4.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-runtime';}).questions.push(
  {
    id: 'compiler-runtime-z7',
    q: 'Which of the following statements about parameter-passing mechanisms and their runtime implementation are TRUE? (Select ALL that apply)',
    options: [
      'Call-by-value-result (copy-restore) copies the argument\'s value in at call time into a local, and copies the local\'s final value back out to the actual argument at return time, so it can behave differently from call-by-reference when aliasing is involved',
      'Call-by-reference passes the address (l-value) of the actual argument, so any assignment to the formal parameter inside the callee is immediately visible through any alias of the same actual argument during the call, not just after return',
      'Call-by-name, as used conceptually in Algol 60, re-evaluates the actual argument expression textually at every use of the formal parameter inside the callee, which can change behavior compared to call-by-value if the argument expression has side effects or depends on mutable state',
      'Call-by-value always requires heap allocation for the copied argument, since a stack-allocated copy would be destroyed before the callee could read it'
    ],
    answers: [0, 1, 2],
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Option 1 is true: copy-restore copies in at entry and copies back out at exit, so intermediate writes are not visible through any alias during the call, and if the actual argument was also modified through another alias during the call, the final copy-back can overwrite that with a stale value — a well-known difference from true call-by-reference. Option 2 is true: because the callee operates directly on the address of the actual argument, every write during the call is immediately observable through any other name (alias) referring to the same storage, unlike copy-restore where visibility is deferred to the return. Option 3 is true: call-by-name substitutes the unevaluated argument expression (with proper renaming to avoid capture, per the "Jensen\'s device" style semantics) at every textual use of the parameter, so an argument with side effects or one referencing a changing index variable is literally re-evaluated fresh each time, producing behavior that can differ substantially from binding the argument\'s value once at call time. Option 4 is false: call-by-value copies the argument\'s value into the callee\'s own activation record, which is ordinary stack-allocated storage exactly like any other local/parameter of that call — there is nothing about copying a value that requires heap allocation; the copy lives exactly as long as the callee\'s stack frame, which is precisely long enough.'
  },
  {
    id: 'compiler-runtime-z8',
    q: 'A program has procedure MAIN calling A, A calling B, and B calling A again (so activations on the stack, deepest first, are: A(2nd), B, A(1st), MAIN). If each activation record size is: MAIN = 60 bytes, A = 50 bytes, B = 70 bytes, what is the total stack space (in bytes) occupied by all currently live activation records at this point (MAIN, A(1st), B, A(2nd) all still active due to the call chain)? (Enter your numerical answer.)',
    options: [],
    answer: 230,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'At this point in the call chain, four activations are simultaneously live and occupy stack space: MAIN (60 bytes) + A\'s first activation (50 bytes) + B (70 bytes) + A\'s second, recursive activation (50 bytes, its own independent frame since stack allocation gives each activation independent storage even for the same procedure). Total = 60 + 50 + 70 + 50 = 230 bytes.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-optimization';}).questions.push(
  {
    id: 'compiler-optimization-z7',
    q: 'Which of the following statements about data-flow analysis for optimization (using reaching definitions and available expressions as examples) are TRUE? (Select ALL that apply)',
    options: [
      'Reaching definitions uses "meet = union" (a definition reaches a point if it reaches along AT LEAST ONE path), whereas available expressions uses "meet = intersection" (an expression is available only if it is available along EVERY path)',
      'The reaching-definitions analysis is used to build def-use chains, which support optimizations such as constant propagation and detecting possibly-uninitialized variable uses',
      'Because available expressions uses intersection at merge points, adding more incoming paths to a control-flow join point can never increase the set of expressions available there, only keep it the same or shrink it',
      'Both reaching definitions and available expressions are forward data-flow problems, propagating information in the same direction as program execution'
    ],
    answers: [0, 1, 2, 3],
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Option 1 is true: reaching definitions is an "any path" (may) analysis using union at confluence points (a definition reaches if it survives along some path), while available expressions is an "all paths" (must) analysis using intersection (an expression is available only if every path guarantees it), the two canonical examples of may- versus must-analysis. Option 2 is true: reaching definitions directly supports building def-use and use-def chains, which in turn enable constant propagation, dead-code elimination, and detecting uses of variables with no reaching definition (a proxy for possibly-uninitialized use). Option 3 is true: since IN at a join is the intersection of all predecessors\' OUT sets, adding another incoming edge can only intersect with (never add sets to) the existing result, so the available set at that join can only shrink or stay the same, never grow, as more paths merge in. Option 4 is true: both are forward problems — information about definitions/expressions flows from a block\'s entry to its exit and onward to successors, following the natural direction of control flow, unlike backward problems such as live-variable analysis.'
  },
  {
    id: 'compiler-optimization-z8',
    q: 'A basic block computes: t1 = a * b; t2 = a * b; t3 = t1 + c; a = t3; t4 = a * b; t5 = t4 - c; After performing local common-subexpression elimination on this block (treating a as redefined by the "a = t3" statement, which invalidates any earlier node using the OLD value of a for future reuse), how many multiplication (*) operations remain in the optimized code for this block (count each surviving distinct multiply computation once, i.e. count the number of TAC multiply instructions needed after CSE, not counting multiplications that get reused via a shared temporary)? (Enter your numerical answer.)',
    options: [],
    answer: 2,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'The first two statements, t1 = a*b and t2 = a*b, are on the SAME (old) value of a and b, so they are identical redundant computations: the DAG merges them into one node, meaning only 1 multiply is actually needed for both (t2 becomes just a copy/reference to t1\'s value). Then a is reassigned by "a = t3", which invalidates the old a-node for future computations — any later use of "a" refers to the NEW value. The later statement t4 = a * b uses this NEW a, so it is a different multiplication (different operand value for a) and cannot be merged with the earlier a*b node; it needs its own, second multiply instruction. So after CSE, exactly 2 distinct multiply operations remain: one shared node for the first two (old-a) multiplications, and one separate node for the later (new-a) multiplication.'
  }
);
window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-optimization';}).questions.push(
  {
    id: 'compiler-optimization-g1',
    q: 'Consider the basic block of four three-address statements: S1: t1 = a + b; S2: t2 = t1 * c; S3: a = t2 - d; S4: t3 = a + b. Only t3 is live on exit from this block (i.e., LiveOut(S4) = {t3}). Using backward live-variable data-flow analysis (LiveIn(S) = use(S) union (LiveOut(S) - def(S))), what is LiveIn(S1), the set of variables live at the ENTRY to the block?',
    options: ['{a, b, c, d}', '{a, b, c, d, t1, t2, t3}', '{t1, t2, t3}', '{a, b}'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'Working backward from the exit: LiveOut(S4) = {t3} (given). LiveIn(S4) = use(S4) U (LiveOut(S4) - def(S4)) = {a,b} U ({t3}-{t3}) = {a,b}. So LiveOut(S3) = LiveIn(S4) = {a,b}. LiveIn(S3) = use(S3) U (LiveOut(S3)-def(S3)) = {t2,d} U ({a,b}-{a}) = {t2,d,b}. So LiveOut(S2) = {t2,d,b}. LiveIn(S2) = use(S2) U (LiveOut(S2)-def(S2)) = {t1,c} U ({t2,d,b}-{t2}) = {t1,c,d,b}. So LiveOut(S1) = {t1,c,d,b}. LiveIn(S1) = use(S1) U (LiveOut(S1)-def(S1)) = {a,b} U ({t1,c,d,b}-{t1}) = {a,b,c,d}. So exactly a, b, c, and d must be live before the block executes -- all four are needed as inputs somewhere downstream, while the temporaries t1, t2, t3 are all produced and consumed entirely within the block itself, matching option 1.'
  },
  {
    id: 'compiler-optimization-g2',
    q: 'Using the same basic block as before -- S1: t1 = a + b; S2: t2 = t1 * c; S3: a = t2 - d; S4: t3 = a + b -- with LiveOut(S4) = {t3} as the only variable live on exit, how many distinct variables are live immediately AFTER S2 executes (i.e., in LiveOut(S2), which equals LiveIn(S3))? (Enter your numerical answer.)',
    options: [],
    answer: 3,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Computing backward from the exit: LiveOut(S4) = {t3}. LiveIn(S4) = use(S4) U (LiveOut(S4)-def(S4)) = {a,b} U ({t3}-{t3}) = {a,b}, so LiveOut(S3) = {a,b}. LiveIn(S3) = use(S3) U (LiveOut(S3)-def(S3)) = {t2,d} U ({a,b}-{a}) = {t2,d,b}. Since LiveOut(S2) is defined to equal LiveIn(S3) (S3 is S2\'s only successor in this straight-line block), LiveOut(S2) = {t2,d,b}, which contains exactly 3 distinct variables: t2, d, and b. This makes sense operationally: right after S2 computes t2, that value (t2) is still needed by S3, d is needed by S3 for the subtraction, and b is still needed later by S4 -- while a and t1 are not needed again until they are freshly produced or consumed elsewhere, so they do not appear in this particular live set.'
  },
  {
    id: 'compiler-optimization-g3',
    q: 'A basic block computes: t1 = b * c; t2 = b * c; t3 = t1 + t2; t4 = b * c; and b, c are never reassigned anywhere in the block. After applying local common-subexpression elimination (recognizing that all three "b * c" computations are identical since their operands never change), how many actual multiplication (*) instructions remain in the optimized code? (Enter your numerical answer.)',
    options: [],
    answer: 1,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'CSE builds a DAG (or value-numbering table) of expressions computed in the block. Since b and c are never redefined between the three statements, all three occurrences of "b * c" (in the definitions of t1, t2, and t4) refer to exactly the same operand values and therefore compute exactly the same result -- they all collapse into a SINGLE shared DAG node. Only one physical multiply instruction needs to actually execute this computation; every other reference to that same value (used to define t2, t3\'s operands, and t4) simply reuses the already-computed result rather than recomputing it. So after CSE, exactly 1 multiplication instruction remains in the block (the addition in t3 = t1 + t2 is a separate, non-redundant operation and is unaffected by this particular elimination).'
  },
  {
    id: 'compiler-optimization-g4',
    q: 'A basic block contains the five three-address statements: S1: t1 = a + b; S2: t2 = a + b; S3: t3 = t1 - c; S4: a = t3; S5: t4 = a + b; with a, b, c never redefined before S4. After applying local common-subexpression elimination (removing any statement whose right-hand-side expression is an exact duplicate of an earlier still-valid computation, and redirecting any of its later uses to the earlier temporary), how many three-address statements remain in the optimized block? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'S1 (t1 = a + b) is the first computation of a + b using the original value of a, so it is kept as-is. S2 (t2 = a + b) uses the SAME still-valid values of a and b (a has not yet been reassigned at this point), so it is an exact duplicate of S1 and can be eliminated entirely, with S2\'s temporary t2 simply becoming an alias for t1 wherever it might have been used later (here it is not used again, so it is just dropped). S3 (t3 = t1 - c) is a distinct computation and is kept. S4 (a = t3) reassigns a, which invalidates the earlier a + b node for any FUTURE use of a, so it is kept (it is not redundant, and it also matters for correctness). S5 (t4 = a + b) now uses the NEW value of a (post-reassignment), so it is a genuinely different computation from S1\'s a + b and must be kept as its own instruction. Counting the surviving statements: S1, S3, S4, S5 -- that is 4 statements remaining out of the original 5, with only the truly redundant S2 removed.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-lexical';}).questions.push(
  {
    id: 'compiler-lexical-p1',
    pyqStyle: true,
    q: 'How many lexical tokens does a standard C tokenizer produce for the statement `int x = a + b * (c - 1);` (count each keyword, identifier, constant, operator and punctuation symbol as one token; do not count whitespace)?',
    options: ['11', '12', '13', '14'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Scanning left to right the tokens are: int, x, =, a, +, b, *, (, c, -, 1, ), ; . That is: int(1) x(2) =(3) a(4) +(5) b(6) *(7) ((8) c(9) -(10) 1(11) )(12) ;(13) -- 13 tokens in total. Each identifier and keyword is one token regardless of length, each operator symbol (=, +, *, -) is a separate token, each parenthesis is its own token, the numeric literal 1 is one constant token, and the terminating semicolon is one punctuation token, giving 13 tokens overall, matching option 3.'
  },
  {
    id: 'compiler-lexical-p2',
    pyqStyle: true,
    q: 'How many tokens are produced when a C lexer scans the statement `for(i=0;i<n;i++) sum=sum+i;` (count keywords, identifiers, constants, operators and punctuation individually; ++ and < are each single tokens)?',
    options: ['17', '18', '19', '20'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Token by token: for, (, i, =, 0, ;, i, <, n, ;, i, ++, ), sum, =, sum, +, i, ; . Counting: for(1) ((2) i(3) =(4) 0(5) ;(6) i(7) <(8) n(9) ;(10) i(11) ++(12) )(13) sum(14) =(15) sum(16) +(17) i(18) ;(19). The increment operator ++ is scanned as a single maximal-munch token rather than two separate + tokens, and each semicolon inside the for-header is its own token. The total comes to 19 tokens, option 3.'
  },
  {
    id: 'compiler-lexical-p3',
    pyqStyle: true,
    q: 'Count the tokens in the C statement `if(a>b&&b>c) max=a; else max=c;` (&& is one token; each identifier/keyword/operator/punctuation counts once).',
    options: ['17', '18', '19', '20'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Tokenizing left to right: if, (, a, >, b, &&, b, >, c, ), max, =, a, ;, else, max, =, c, ; . Numbering them: if(1) ((2) a(3) >(4) b(5) &&(6) b(7) >(8) c(9) )(10) max(11) =(12) a(13) ;(14) else(15) max(16) =(17) c(18) ;(19). By maximal munch, && is scanned as one logical-AND token rather than two & tokens. The keyword else is one token even though it starts a new clause. Total = 19 tokens, option 3.'
  },
  {
    id: 'compiler-lexical-p4',
    pyqStyle: true,
    q: 'How many tokens does a C lexer generate for the expression statement `x = (a+b)*(c-d)/e;`?',
    options: ['13', '14', '15', '16'],
    answer: 3,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Scanning: x, =, (, a, +, b, ), *, (, c, -, d, ), /, e, ; . That gives x(1) =(2) ((3) a(4) +(5) b(6) )(7) *(8) ((9) c(10) -(11) d(12) )(13) /(14) e(15) ;(16). Each parenthesis is a distinct punctuation token and each arithmetic operator (+, -, *, /) is its own token, so the statement tokenizes into 16 tokens total, option 4.'
  },
  {
    id: 'compiler-lexical-p5',
    pyqStyle: true,
    q: 'How many tokens are produced by a C lexer for the statement `while(*p!=\'\\0\') p++;` (treat the character constant \'\\0\' as a single token, and != as a single relational-operator token)?',
    options: ['8', '9', '10', '11'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Tokens: while, (, *, p, !=, \'\\0\', ), p, ++, ; giving while(1) ((2) *(3) p(4) !=(5) \'\\0\'(6) )(7) p(8) ++(9) ;(10). The dereference operator * is one token distinct from the identifier p, the escaped character literal \'\\0\' is scanned by the lexer as a single character-constant token (the backslash-zero is consumed together with the surrounding quotes as one lexeme), and != is recognized as one relational operator by maximal munch rather than as ! followed by =. Total = 10 tokens, option 3.'
  },
  {
    id: 'compiler-lexical-p6',
    pyqStyle: true,
    q: 'How many tokens does the C declaration `struct node *next;` tokenize into?',
    options: ['3', '4', '5', '6'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The tokens are: struct (keyword), node (identifier), * (operator/punctuator marking a pointer), next (identifier), ; (punctuation) -- struct(1) node(2) *(3) next(4) ;(5), for a total of 5 tokens, option 3. Even though "struct node *" conceptually names one pointer type, the lexer has no notion of types; it simply emits one token per lexeme it recognizes, and the asterisk is scanned as a standalone operator token regardless of its later syntactic role as a pointer declarator.'
  },
  {
    id: 'compiler-lexical-p7',
    pyqStyle: true,
    q: 'How many tokens are produced when tokenizing the C statement `a[i]=a[i]+a[j]-1;`?',
    options: ['14', '15', '16', '17'],
    answer: 3,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Tokens: a, [, i, ], =, a, [, i, ], +, a, [, j, ], -, 1, ; . Numbering: a(1) [(2) i(3) ](4) =(5) a(6) [(7) i(8) ](9) +(10) a(11) [(12) j(13) ](14) -(15) 1(16) ;(17). Every occurrence of the identifier a is a separate token even though it is lexically the same lexeme each time, and each square bracket is its own punctuation token, since the lexer classifies by lexeme occurrence, not by uniqueness. Total = 17 tokens, option 3.'
  },
  {
    id: 'compiler-lexical-p8',
    pyqStyle: true,
    q: 'How many tokens does the C statement `printf("sum=%d\\n",sum);` tokenize into (treat the entire double-quoted string literal as a single token)?',
    options: ['5', '6', '7', '8'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Tokens: printf, (, "sum=%d\\n", , (comma), sum, ), ; . That is printf(1) ((2) "sum=%d\\n"(3) ,(4) sum(5) )(6) ;(7), for 7 tokens total, option 3. The entire string literal "sum=%d\\n" -- including its embedded format specifier and escape sequence -- is scanned by the lexer as ONE string-constant token, since the lexer treats everything between the matching double quotes (respecting escapes) as a single lexeme, not as separate tokens for its internal characters.'
  },
  {
    id: 'compiler-lexical-p9',
    pyqStyle: true,
    q: 'How many tokens does the C declaration statement `int arr[10],i,sum=0;` tokenize into? (Enter your numerical answer.)',
    options: [],
    answer: 12,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Tokens: int, arr, [, 10, ], ,, i, ,, sum, =, 0, ; . Numbering them: int(1) arr(2) [(3) 10(4) ](5) ,(6) i(7) ,(8) sum(9) =(10) 0(11) ;(12). Each comma separating declarators is its own punctuation token, the array size 10 is a single numeric-constant token, and the initializer "=0" contributes an operator token and a constant token. Total = 12 tokens.'
  },
  {
    id: 'compiler-lexical-p10',
    pyqStyle: true,
    q: 'How many tokens does the C statement `return (x>0)?x:-x;` tokenize into? (Enter your numerical answer.)',
    options: [],
    answer: 12,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Tokens: return, (, x, >, 0, ), ?, x, :, -, x, ; . Numbering: return(1) ((2) x(3) >(4) 0(5) )(6) ?(7) x(8) :(9) -(10) x(11) ;(12). The ternary operator contributes two separate single-character tokens, ? and :, and the unary minus before the final x is its own operator token distinct from the identifier that follows it. Total = 12 tokens.'
  },
  {
    id: 'compiler-lexical-p11',
    pyqStyle: true,
    q: 'A lexical analyzer uses the maximal-munch (longest-match) rule. Applying this rule, how is the input `a=b<=c` correctly split into tokens?',
    options: [
      'a  ,  =  ,  b  ,  <=  ,  c   (identifier, assign, identifier, relop, identifier -- 5 tokens)',
      'a  ,  =  ,  b  ,  <  ,  =  ,  c   (identifier, assign, identifier, less-than, assign, identifier -- 6 tokens)',
      'a=b  ,  <=  ,  c   (treating "a=b" as one identifier-like lexeme, then <=, then c -- 3 tokens)',
      'a  ,  =b<=c   (identifier, then everything else fused into one token -- 2 tokens)'
    ],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Maximal munch means that at each position the lexer consumes the LONGEST prefix of the remaining input that still matches some valid token pattern. Scanning left to right: "a" is a maximal identifier (the next character = cannot extend it), so it is emitted as an identifier token; "=" alone does not extend into "==" (next character is b), so it is emitted as the assignment operator; "b" is emitted as an identifier (cannot extend into "b<" since < is not an identifier character); then at "<=c", the lexer greedily tries to extend "<" and finds that "<=" is also a valid token (the relational operator), which is longer than "<" alone, so by maximal munch it emits "<=" as a single token rather than "<" followed by "="; finally "c" is emitted as an identifier. The correct tokenization is therefore a / = / b / <= / c, exactly 5 tokens, matching option 1; option 2 wrongly splits <= into two tokens, violating maximal munch.'
  },
  {
    id: 'compiler-lexical-p12',
    pyqStyle: true,
    q: 'How many tokens does the C statement `do{ i=i+1; }while(i<10);` tokenize into? (Enter your numerical answer.)',
    options: [],
    answer: 16,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Tokens: do, {, i, =, i, +, 1, ;, }, while, (, i, <, 10, ), ; . Numbering: do(1) {(2) i(3) =(4) i(5) +(6) 1(7) ;(8) }(9) while(10) ((11) i(12) <(13) 10(14) )(15) ;(16). Both braces of the do-while body are separate punctuation tokens, the keyword while introducing the loop condition is its own token distinct from the body, and the trailing semicolon that terminates a do-while statement (required in C, unlike a plain while loop) is counted as the final token. Total = 16 tokens.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-parsing';}).questions.push(
  {
    id: 'compiler-parsing-p1',
    pyqStyle: true,
    q: 'Consider the grammar S -> A B c, A -> a | epsilon, B -> b | epsilon. What is FIRST(S)?',
    options: ['{a, b, c}', '{a, b}', '{a}', '{a, b, c, epsilon}'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'FIRST(A) = {a, epsilon} and FIRST(B) = {b, epsilon}. To compute FIRST(S) for S -> A B c: start with FIRST(A) - {epsilon} = {a}. Since A can derive epsilon, also include FIRST(B) - {epsilon} = {b}. Since B can also derive epsilon, continue to the next symbol c and include FIRST(c) = {c} (since A and B can both vanish, S can start directly with c, as in the derivation S => AB c => Bc => c). So FIRST(S) = {a} U {b} U {c} = {a, b, c}, matching option 1. Epsilon itself is not included in FIRST(S) because S can never derive the empty string (the terminal c always remains).'
  },
  {
    id: 'compiler-parsing-p2',
    pyqStyle: true,
    q: 'Grammar: S -> A | B, A -> aA | a, B -> ab | b. Filling in the LL(1) parsing table entry M[S, a], what do you find?',
    options: [
      'M[S,a] contains only S -> A, so the grammar is LL(1) on this cell',
      'M[S,a] contains both S -> A and S -> B, a multiply-defined entry, so the grammar is NOT LL(1)',
      'M[S,a] is empty (a parse error), since neither A nor B can start with a',
      'M[S,a] contains only S -> B, so the grammar is LL(1) on this cell'
    ],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'FIRST(A) = {a} (from A -> aA | a, both alternatives start with a). FIRST(B) = {a, b} (from B -> ab, which starts with a, and B -> b). Since a is in FIRST(A) we place S -> A into M[S,a]; since a is also in FIRST(B) we place S -> B into the SAME cell M[S,a]. This gives two competing productions in one table cell, a classic multiply-defined entry, which means the top-down predictive parser cannot decide which production to use on seeing lookahead a, so the grammar is not LL(1), matching option 2.'
  },
  {
    id: 'compiler-parsing-p3',
    pyqStyle: true,
    q: 'For the augmented grammar S\' -> S, S -> aS | b, how many states are there in the canonical collection of LR(0) items (including the initial state)?',
    options: ['3', '4', '5', '6'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Build the LR(0) automaton. I0 = closure{S\'->.S} = {S\'->.S, S->.aS, S->.b}. goto(I0,S)=I1={S\'->S.}. goto(I0,a)=I2=closure{S->a.S}={S->a.S, S->.aS, S->.b}. goto(I0,b)=I3={S->b.}. From I2: goto(I2,S)=I4={S->aS.}; goto(I2,a) returns to the same item set as I2 (self-loop, so no new state); goto(I2,b)=I3 (same as before). No new states arise from I3 or I4 (both are complete "reduce" items with no outgoing transitions). So the full collection is {I0, I1, I2, I3, I4} -- exactly 5 states, matching option 3.'
  },
  {
    id: 'compiler-parsing-p4',
    pyqStyle: true,
    q: 'Grammar: S -> A a A b | C b C a, with A -> epsilon and C -> epsilon. In the SLR(1) construction, the state containing both items A -> . and C -> . has a reduce-reduce conflict because FOLLOW(A) and FOLLOW(C) overlap. What is FOLLOW(A) intersect FOLLOW(C)?',
    options: ['{a}', '{b}', '{a, b}', 'the empty set (no actual conflict)'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'From S -> A a A b, the first A is immediately followed by terminal a, and the second A is immediately followed by terminal b, so FOLLOW(A) superset {a, b}. From S -> C b C a, the first C is followed by b and the second C is followed by a, so FOLLOW(C) superset {a, b}. Hence FOLLOW(A) = FOLLOW(C) = {a, b}, and their intersection is {a, b}. This means in the SLR state where both A -> . and C -> . are valid items (reached after deriving the empty prefix at the very start), the SLR reduce action would try to reduce by A -> epsilon on lookaheads {a,b} AND by C -> epsilon on the same lookaheads {a,b} -- a genuine reduce-reduce conflict, so this grammar is not SLR(1) even though it is unambiguous and in fact LR(1) (a canonical example showing SLR\'s lookahead sets are sometimes too coarse). Option 3 is correct.'
  },
  {
    id: 'compiler-parsing-p5',
    pyqStyle: true,
    q: 'A grammar generates the language L = { aⁿbⁿcⁿ : n >= 1 } using productions S -> aSBC | abc, CB -> BC, bB -> bb, bC -> bc, cC -> cc. Since L is well known NOT to be a context-free language, what is the minimal Chomsky classification of this grammar?',
    options: ['Type 3 (regular)', 'Type 2 (context-free)', 'Type 1 (context-sensitive, non-context-free)', 'Type 0 (unrestricted / recursively enumerable only)'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Since L = {aⁿbⁿcⁿ} cannot be generated by any context-free grammar (this is a standard pumping-lemma-for-CFLs result), the grammar generating it cannot be Type 2 or Type 3 (both of those hierarchy levels only generate context-free or regular languages, a strict subset of context-sensitive languages). Examining the given rules -- CB->BC, bB->bb, bC->bc, cC->cc -- every right-hand side has length greater than or equal to the corresponding left-hand side (none of them shrink the sentential form), which is exactly the defining property of a Type 1 (context-sensitive / noncontracting) grammar. Since the grammar is noncontracting and generates a genuinely non-context-free language, it sits precisely at Type 1 in the Chomsky hierarchy, matching option 3 -- it need not be classified as unrestricted (Type 0) since it obeys the noncontracting length restriction.'
  },
  {
    id: 'compiler-parsing-p6',
    pyqStyle: true,
    q: 'Using the classically ambiguous dangling-else grammar (stmt -> if expr then stmt | if expr then stmt else stmt | other), how many distinct parse trees exist for the string "if E1 then if E2 then S1 else S2"?',
    options: ['1', '2', '3', '4'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'There are exactly two ways the grammar can attach the single "else S2" clause: (i) match it with the NEARER unmatched "then" (the inner "if E2 then"), giving if E1 then (if E2 then S1 else S2); or (ii) match it with the FARTHER "then" (the outer "if E1 then"), giving if E1 then (if E2 then S1) else S2 -- which requires reading the inner if-then as a complete stmt on its own and treating the else as belonging to the outer if. Both are syntactically valid derivations under this ambiguous grammar (the grammar itself does not disambiguate), so there are exactly 2 distinct parse trees, matching option 2. Real parsers avoid this by convention (match else to the nearest unmatched then), effectively picking interpretation (i) and discarding (ii), but the raw grammar is genuinely ambiguous with 2 parses for this string.'
  },
  {
    id: 'compiler-parsing-p7',
    pyqStyle: true,
    q: 'Standard expression grammar: E -> T E\', E\' -> + T E\' | epsilon, T -> F T\', T\' -> * F T\' | epsilon, F -> ( E ) | id. What is FOLLOW(T\')?',
    options: ['{+, *, ), $}', '{+, ), $}', '{*, +, id, (}', '{$}'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'T\' occurs only at the end of production T -> F T\', so FOLLOW(T\') = FOLLOW(T). To get FOLLOW(T): T occurs only in E -> T E\', so FOLLOW(T) = (FIRST(E\') - {epsilon}) U FOLLOW(E) (the second part included because E\' can derive epsilon, meaning T can effectively be immediately followed by whatever follows E). FIRST(E\') = {+, epsilon}, so its non-epsilon part contributes {+}. FOLLOW(E): E occurs inside F -> ( E ), so FOLLOW(E) includes {)}, and since E is also the grammar\'s start symbol, FOLLOW(E) includes {$}; so FOLLOW(E) = {), $}. Combining, FOLLOW(T) = {+} U {), $} = {+, ), $}. Since FOLLOW(T\') = FOLLOW(T), FOLLOW(T\') = {+, ), $}, matching option 2.'
  },
  {
    id: 'compiler-parsing-p8',
    pyqStyle: true,
    q: 'When an LR(1) canonical parsing table is reduced to an LALR(1) table by merging states, which condition determines that two LR(1) states get merged into a single LALR(1) state?',
    options: [
      'The two states have the same CORE (identical set of LR(0) items, ignoring lookahead symbols), regardless of what their lookaheads are',
      'The two states have the same lookahead sets on every item, regardless of the underlying LR(0) items',
      'The two states are reached from the start state by the same number of grammar symbols',
      'The two states both contain at least one reduce item, regardless of their cores or lookaheads'
    ],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'LALR(1) construction takes the full canonical LR(1) collection and merges together every group of LR(1) states that share the same CORE -- that is, the same underlying set of LR(0) items obtained by stripping away the lookahead component from every LR(1) item -- into one combined state whose lookahead sets are the UNION of the corresponding lookaheads from each merged state. States with different cores are never merged, since merging them would conflate genuinely different parsing configurations (different possible item sets), which is exactly what distinguishes LALR(1) (fewer states than canonical LR(1), same core-based automaton shape as LR(0)/SLR(1)) from full LR(1) (which keeps every lookahead-distinguished state separate). Option 1 correctly identifies "same core" as the merge criterion.'
  },
  {
    id: 'compiler-parsing-p9',
    pyqStyle: true,
    q: 'Grammar: S -> aA | b, A -> cA | epsilon. Building the LL(1) parsing table for nonterminals {S, A} against terminal columns {a, b, c, $}, how many of the 8 table cells are BLANK (error) entries? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'FIRST(S) = {a, b}. FIRST(A) = {c, epsilon}. FOLLOW(A) = FOLLOW(S) = {$} (A occurs only at the very end of S -> aA, and S is the start symbol with nothing following it). Table entries: M[S,a] = S->aA (from a in FIRST(S)); M[S,b] = S->b (from b in FIRST(S)); M[S,c] = blank; M[S,$] = blank. M[A,c] = A->cA (from c in FIRST(A)); M[A,a] = blank; M[A,b] = blank; M[A,$] = A->epsilon (since epsilon is in FIRST(A), place the epsilon-production under every terminal in FOLLOW(A) = {$}). So filled cells are (S,a), (S,b), (A,c), (A,$) -- 4 filled cells out of 8 total, leaving exactly 4 blank (error) cells: (S,c), (S,$), (A,a), (A,b).'
  },
  {
    id: 'compiler-parsing-p10',
    pyqStyle: true,
    q: 'Grammar: S -> A B, A -> a | epsilon, B -> b A | c. What is |FOLLOW(A)|, the number of terminals in FOLLOW(A)? (Enter your numerical answer.)',
    options: [],
    answer: 3,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'A occurs in two places: (i) in S -> A B, where A is immediately followed by B, contributing FIRST(B) - {epsilon} to FOLLOW(A); and (ii) in B -> b A, where A is at the very END of the production, contributing all of FOLLOW(B) to FOLLOW(A). FIRST(B) = {b, c} (no epsilon, since both alternatives of B start with a terminal). So from (i): FOLLOW(A) superset {b, c}. FOLLOW(B): B occurs only at the end of S -> A B, so FOLLOW(B) = FOLLOW(S) = {$} (S is the start symbol). So from (ii): FOLLOW(A) superset {$}. Combining both contributions, FOLLOW(A) = {b, c} U {$} = {b, c, $}, which has |FOLLOW(A)| = 3 elements.'
  },
  {
    id: 'compiler-parsing-p11',
    pyqStyle: true,
    q: 'For the string "if E1 then if E2 then if E3 then S1 else S2" parsed with the standard ambiguous dangling-else grammar, how many distinct parse trees exist (i.e., to how many different unmatched "then" clauses could the single "else" be attached)? (Enter your numerical answer.)',
    options: [],
    answer: 3,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'There are three nested if-then constructs (headed by E1, E2, E3 respectively) and only one "else" clause in the string. Since none of the three "if...then" clauses has yet been given its own else at the point the "else S2" appears, the ambiguous grammar allows this single else to be grammatically attached to ANY of the three enclosing unmatched thens: attaching it to the innermost (if E3 then), to the middle one (if E2 then), or to the outermost (if E1 then) -- in each case the remaining if-then clauses simply become a nested stmt with no else of their own, which the grammar permits. Each of these 3 attachments yields a syntactically valid, structurally distinct parse tree, so the count is 3 (the usual "match nearest unmatched then" disambiguation rule picks just one of these three, but the raw ambiguous grammar admits all three).'
  },
  {
    id: 'compiler-parsing-p12',
    pyqStyle: true,
    q: 'Which of the following statements about the standard grammar-class hierarchy used in parser construction are TRUE? (Select ALL that apply)',
    options: [
      'Every regular language can be generated by some context-free grammar',
      'Every LL(1) grammar is unambiguous',
      'Every SLR(1) grammar is also LALR(1) (the class of SLR(1) grammars is a subset of the class of LALR(1) grammars)',
      'Every LALR(1) grammar is also SLR(1) (the two classes are identical)'
    ],
    answers: [0, 1, 2],
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Option 1 is true: the regular languages are a strict subset of the context-free languages, so any regular language (recognizable by a finite automaton) can also be described by some context-free grammar (e.g., by directly encoding the automaton\'s transitions as productions). Option 2 is true: an LL(1) parsing table has, by definition, at most one production in every cell, meaning at each point in a leftmost derivation exactly one expansion is chosen by the parser -- this determinism is precisely what forces every LL(1) grammar to be unambiguous. Option 3 is true: the accepted grammar-class containment is LR(0) subset SLR(1) subset LALR(1) subset LR(1) -- SLR(1)\'s FOLLOW-set-based lookaheads are always at least as coarse (or equal) as LALR(1)\'s more precise, context-specific lookaheads, so anything decidable with SLR(1) lookaheads remains decidable with LALR(1)\'s at-least-as-fine lookaheads, making every SLR(1) grammar also LALR(1). Option 4 is FALSE: the containment is one-directional -- there exist grammars that are LALR(1) but not SLR(1) (i.e., resolvable with LALR(1)\'s per-state lookaheads but causing reduce-reduce or shift-reduce conflicts under SLR(1)\'s coarser FOLLOW-based lookaheads), so the two classes are not identical.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-sdt';}).questions.push(
  {
    id: 'compiler-sdt-p1',
    pyqStyle: true,
    q: 'A synthesized-attribute SDD for arithmetic expressions is: E -> E1 + T {E.val = E1.val + T.val} | T {E.val = T.val}; T -> T1 * F {T.val = T1.val * F.val} | F {T.val = F.val}; F -> digit {F.val = digit.lexval}. Using this SDD, what value is computed for E.val on input "2+3*4"? (Enter your numerical answer.)',
    options: [],
    answer: 14,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The grammar enforces the usual precedence of * over + through its structure (T handles multiplication, E handles addition of T terms), so "2+3*4" parses as 2 + (3*4). Evaluating bottom-up via the synthesized attributes: F.val=3, F.val=4 combine as T.val = 3*4 = 12 (via T -> T1*F); separately F.val=2 gives T.val=2 (via T->F); finally E.val = E1.val + T.val = 2 + 12 = 14. So the computed E.val is 14, matching standard operator precedence.'
  },
  {
    id: 'compiler-sdt-p2',
    pyqStyle: true,
    q: 'Consider the SDD: D -> T L {L.in = T.type}; T -> int {T.type = integer} | real {T.type = real}; L -> L1 , id {L1.in = L.in; addtype(id.entry, L.in)} | id {addtype(id.entry, L.in)}. Here L.in is an INHERITED attribute passed down from D to L and then leftward from L to L1. How should this SDD be classified?',
    options: [
      'S-attributed only (uses only synthesized attributes)',
      'L-attributed but NOT S-attributed (it uses an inherited attribute, but every inherited attribute depends only on the parent or symbols to its left)',
      'Neither S-attributed nor L-attributed (it violates the left-to-right dependency restriction)',
      'Not a valid SDD at all, since inherited attributes cannot be used in any evaluation order'
    ],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'This SDD is not S-attributed because L.in is an INHERITED attribute (it is not computed bottom-up purely from children; it is passed down from the parent D and then further down from L to its left child L1). However, it IS L-attributed: L.in in D -> T L depends only on T.type, a symbol to the LEFT of L in that production; and L1.in in L -> L1, id depends only on L.in, an inherited attribute of the PARENT L (which is allowed under the L-attributed rule -- an inherited attribute of Xi may depend on inherited attributes of the left-hand-side nonterminal and on attributes of symbols X1..X(i-1) to its left). Since every inherited-attribute dependency here respects this left-to-right, parent-or-left-sibling restriction, the SDD is L-attributed but not S-attributed, matching option 2. This is precisely the classic "distribute the declared type across a list of identifiers" pattern.'
  },
  {
    id: 'compiler-sdt-p3',
    pyqStyle: true,
    q: 'Using the same type-distribution SDD as before (D -> T L {L.in=T.type}; L -> L1,id {L1.in=L.in; addtype(id.entry,L.in)} | id {addtype(id.entry,L.in)}), how many times is addtype() invoked while processing the declaration "real x, y, z"? (Enter your numerical answer.)',
    options: [],
    answer: 3,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The identifier list "x, y, z" is parsed via the left-recursive L production, unwinding as L -> L1,id where L1 itself further expands until reaching the base case L -> id. There are exactly 3 identifiers in the list (x, y, z), and the SDT calls addtype() exactly once per identifier -- once at the base-case reduction for the first identifier x, and once at each subsequent L -> L1,id reduction for y and then z. Since T.type = real is propagated down as L.in = real to every one of these calls, addtype() is invoked exactly 3 times, once for each of x, y, and z, all recording type real.'
  },
  {
    id: 'compiler-sdt-p4',
    pyqStyle: true,
    q: 'An S-attributed SDD evaluates left-associative subtraction and addition: E -> E1 - T {E.val=E1.val-T.val} | E1 + T {E.val=E1.val+T.val} | T {E.val=T.val}; T -> digit {T.val=digit.lexval}. What value does E.val evaluate to for the input "9-5+2"? (Enter your numerical answer.)',
    options: [],
    answer: 6,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Because - and + have equal precedence and the grammar is left-recursive (E -> E1 op T), the expression is forced to associate strictly left-to-right, exactly like ordinary left-associative evaluation: "9-5+2" is grouped as (9-5)+2. Evaluating bottom-up: first E.val = 9-5 = 4 (from the E1-T alternative), then the outer E.val = 4+2 = 6 (from the E1+T alternative). So the SDT computes E.val = 6, confirming that this S-attributed grammar correctly encodes left-to-right associativity for operators of equal precedence.'
  },
  {
    id: 'compiler-sdt-p5',
    pyqStyle: true,
    q: 'Consider the SDD rule A -> B C {B.in = C.val}, where B.in is an inherited attribute assigned from C.val, and C.val is a synthesized attribute of C computed independently. Is this SDD L-attributed?',
    options: [
      'Yes, because B.in is still an inherited attribute, and any inherited attribute assignment automatically satisfies the L-attributed condition',
      'No, this violates the L-attributed restriction, because B is to the LEFT of C in the production, yet B\'s inherited attribute depends on C, which is to its RIGHT',
      'Yes, because C.val is synthesized, and inherited attributes are always allowed to depend on synthesized attributes regardless of position',
      'It cannot be determined without knowing the grammar rules for B and C individually'
    ],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'The L-attributed restriction requires that an inherited attribute of a right-hand-side symbol Xi may depend ONLY on: (a) inherited attributes of the left-hand-side nonterminal (here A), and (b) attributes (of any kind) of symbols X1, ..., X(i-1) that appear strictly to the LEFT of Xi in the same production. Here, B is X1 (leftmost) and C is X2 (to its right); the rule assigns B.in (an inherited attribute of the LEFT symbol B) using C.val, an attribute of C, which is to B\'s RIGHT. This dependency runs backward against the required left-to-right order, so it directly violates the L-attributed condition -- this SDD is neither S-attributed (it uses an inherited attribute at all) nor L-attributed (the dependency direction is wrong), matching option 2.'
  },
  {
    id: 'compiler-sdt-p6',
    pyqStyle: true,
    q: 'An SDT assigns storage offsets using inherited attributes: D -> D1 ; D2, with a running "offset" counter, where each declaration "id : T" gets addtype(id.entry, T.type, offset) and then offset is incremented by T.width (int has width 4, real has width 8). Processing the declarations "a:int; b:real; c:int" left to right, starting offset = 0, what offset is assigned to c? (Enter your numerical answer.)',
    options: [],
    answer: 12,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Processing declarations strictly left to right, tracking the running offset: a is declared at offset 0 (int, width 4), so after processing a, offset becomes 0+4=4. Next, b is declared at offset 4 (real, width 8), so after processing b, offset becomes 4+8=12. Finally, c is declared at the now-current offset, which is 12 (int, width 4; after c, offset would become 16, but that is not asked). So the offset assigned to c is 12, reflecting the cumulative storage consumed by a (4 bytes) and b (8 bytes) before it.'
  },
  {
    id: 'compiler-sdt-p7',
    pyqStyle: true,
    q: 'An S-attributed SDD for expressions with unary minus is: E -> E1+E2 {E.val=E1.val+E2.val} | E1*E2 {E.val=E1.val*E2.val} | -E1 {E.val = -E1.val} | digit {E.val=digit.lexval}, with the grammar structured so that * binds tighter than + and unary minus binds tighter than both. What value does E.val evaluate to for "-3+4*2"? (Enter your numerical answer.)',
    options: [],
    answer: 5,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'By the stated precedence (unary minus tightest, then *, then + loosest), "-3+4*2" parses as (-3) + (4*2). Evaluating bottom-up: the unary-minus production gives E.val = -(3) = -3 for the first term; the multiplication production gives E.val = 4*2 = 8 for the second term; the addition production then combines them as E.val = -3 + 8 = 5. So the SDT evaluates the whole expression to 5.'
  },
  {
    id: 'compiler-sdt-p8',
    pyqStyle: true,
    q: 'Which of the following syntax-directed definitions are S-ATTRIBUTED (use only synthesized attributes, with every semantic action computable after all of a production\'s children have been parsed)? (Select ALL that apply)',
    options: [
      'Every semantic action in the SDD sits at the end of the production\'s right-hand side and computes the LHS attribute purely from the SYNTHESIZED attributes of the RHS symbols',
      'A semantic action assigns an INHERITED attribute of a right-sibling symbol using a synthesized attribute of a left-sibling symbol that appears earlier in the same production',
      'The SDT is a pure "postfix" translation scheme, where every action appears only after all the grammar symbols of the production, computing new attributes strictly from already-available children attributes',
      'A semantic action assigns an inherited attribute of the LHS nonterminal using a synthesized attribute of a RIGHT sibling that appears later in the same production'
    ],
    answers: [0, 2],
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Option 1 describes exactly the definition of S-attributed: every attribute computed is synthesized, built bottom-up solely from the RHS symbols\' own synthesized attributes -- this is S-attributed. Option 3 describes a "postfix SDT", which is simply the syntax-directed TRANSLATION SCHEME realization of an S-attributed SDD (actions placed at the very end, after every symbol, computing purely synthesized values) -- also S-attributed. Option 2 is FALSE for S-attributed: it explicitly uses an INHERITED attribute (of the right sibling), so by definition it cannot be S-attributed, even though it happens to still respect L-attributed left-to-right ordering. Option 4 is FALSE for S-attributed for the same reason (it computes an inherited attribute of the LHS) and is additionally NOT even L-attributed, since it depends on a symbol to its right rather than to its left.'
  },
  {
    id: 'compiler-sdt-p9',
    pyqStyle: true,
    q: 'Using a postfix (S-attributed) SDT that evaluates * before + according to standard precedence, what value does the expression "3*4+5*2" evaluate to? (Enter your numerical answer.)',
    options: [],
    answer: 22,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'By standard operator precedence enforced by the layered expression grammar (multiplication binds tighter than addition), "3*4+5*2" evaluates as (3*4) + (5*2) = 12 + 10 = 22. The postfix SDT computes the multiplications first (as they occur at a lower level of the parse tree, in the T/F nonterminals), producing the synthesized values 12 and 10, which are then combined by the addition action at the E level to give the final synthesized value 22.'
  },
  {
    id: 'compiler-sdt-p10',
    pyqStyle: true,
    q: 'In a proper L-attributed SDD, for a production A -> X1 X2 ... Xn, an INHERITED attribute of the symbol Xi (for some i) is allowed to depend only on:',
    options: [
      'inherited attributes of A, and attributes (synthesized or inherited) of X1, X2, ..., X(i-1), i.e., only symbols to the LEFT of Xi plus the parent',
      'synthesized attributes of X(i+1), ..., Xn, i.e., only symbols to the RIGHT of Xi',
      'any attribute of any symbol anywhere in the entire parse tree, with no positional restriction',
      'only the synthesized attributes of Xi\'s own children, never attributes from outside the subtree rooted at Xi'
    ],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'This is precisely the defining restriction of an L-attributed SDD: an inherited attribute of a right-hand-side symbol Xi may depend only on (a) the inherited attributes of the production\'s left-hand-side nonterminal A (i.e., what was passed down from above), and (b) any attribute -- synthesized or inherited -- of the symbols X1 through X(i-1) that appear strictly to Xi\'s LEFT within the same production. This "left-to-right, parent-or-left-sibling-only" rule is exactly what permits attributes to be evaluated in a single left-to-right depth-first traversal of the parse tree, which is why L-attributed SDDs can be implemented efficiently with predictive (top-down, e.g., recursive-descent) parsers. Option 1 states this correctly; the other options either reverse the direction (option 2) or remove the restriction entirely (option 3), or describe pure synthesis with no inheritance at all (option 4).'
  },
  {
    id: 'compiler-sdt-p11',
    pyqStyle: true,
    q: 'A type-checking SDD promotes an arithmetic expression\'s type to "real" if ANY operand involved is real, and keeps it "int" only if EVERY operand is int, following the rule E -> E1 + E2 {E.type = if (E1.type==real or E2.type==real) then real else int}. Given the expression id1 + id2 + id3 where id1 is int, id2 is real, and id3 is int (left-associative, i.e. parsed as (id1+id2)+id3), what is the resulting E.type for the whole expression?',
    options: ['int', 'real', 'undefined / type error', 'depends on evaluation order, cannot be determined'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Evaluating bottom-up following the left-associative parse (id1+id2)+id3: first, the inner subexpression id1+id2 has id1.type=int and id2.type=real, so since at least one operand (id2) is real, this subexpression\'s type becomes real. Next, the outer expression combines this real-typed result with id3 (int): since at least one operand (the inner sum, now typed real) is real, the overall expression\'s type is also real. So the SDT computes E.type = real for the whole expression -- once any operand anywhere in the expression is real, type promotion propagates upward through every enclosing addition, regardless of how many int operands are also present.'
  },
  {
    id: 'compiler-sdt-p12',
    pyqStyle: true,
    q: 'Using a postfix SDT that respects standard precedence and left-to-right associativity for equal-precedence operators, evaluate the expression "6/2+3*2-1". (Enter your numerical answer.)',
    options: [],
    answer: 8,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'By standard precedence (/ and * bind tighter than + and -, and +/- of equal precedence associate left to right), "6/2+3*2-1" parses as ((6/2) + (3*2)) - 1. Evaluating bottom-up: 6/2=3 and 3*2=6 are computed first at the lower (T) level of the grammar; these combine via addition to give 3+6=9 at the E level; finally the trailing "-1" is applied left-to-right, giving 9-1=8. So the SDT evaluates the full expression to 8.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-icg';}).questions.push(
  {
    id: 'compiler-icg-p1',
    pyqStyle: true,
    q: 'Using the standard naive three-address-code translation (one TAC instruction per operator application, no common-subexpression sharing), how many three-address statements are generated for "a = b*c + b*c - d;"? (Enter your numerical answer.)',
    options: [],
    answer: 5,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Without any optimization, each operator becomes its own three-address instruction, in evaluation order: t1 = b*c; t2 = b*c; t3 = t1+t2; t4 = t3-d; a = t4. That is 5 separate TAC statements -- one for each of the two multiplications, one for the addition, one for the subtraction, and one for the final assignment to a. Naive translation does not notice that the two "b*c" computations are identical; that recognition only happens under common-subexpression elimination.'
  },
  {
    id: 'compiler-icg-p2',
    pyqStyle: true,
    q: 'Building a DAG (directed acyclic graph) for the expression "a = b*c + b*c - d" (which automatically shares identical subexpressions as a single node), how many total DAG nodes are there, counting both leaf (identifier/constant) nodes and interior (operator) nodes?',
    options: ['4', '5', '6', '7'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Leaves: b, c, and d are three distinct leaf nodes. Interior nodes: since both occurrences of "b*c" use the identical operands b and c, the DAG construction algorithm recognizes them as the SAME node -- a DAG never duplicates a node for an already-existing identical computation -- so there is only ONE "*" node representing b*c (shared, used twice as input to the "+" node below). Then there is one "+" node computing (b*c)+(b*c) using that single shared multiply node as BOTH of its operands, and one "-" node computing that sum minus d, which is labeled with a (the final assigned variable). Total nodes = 3 leaves (b,c,d) + 3 interior nodes (*, +, -) = 6 nodes, matching option 3.'
  },
  {
    id: 'compiler-icg-p3',
    pyqStyle: true,
    q: 'Using standard TAC translation for the statement "if (a<b) x=1; else x=2;" (with labels not counted as separate instructions), how many three-address instructions are generated? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'The standard translation is: (1) ifFalse a<b goto L1; (2) x=1; (3) goto L2; L1: (4) x=2; L2: (nothing after, just the label marking the join point). Labels themselves (L1, L2) mark positions in the code but are not counted as separate executable instructions. Counting only the actual instructions: the conditional test, the then-branch assignment, the unconditional jump over the else-branch, and the else-branch assignment -- that is exactly 4 three-address instructions.'
  },
  {
    id: 'compiler-icg-p4',
    pyqStyle: true,
    q: 'How many total DAG nodes (leaves plus interior operator nodes) are needed to represent the expression "(a+b)*(a+b-c)", exploiting the shared common subexpression "a+b"?',
    options: ['5', '6', '7', '8'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Leaves: a, b, c are three distinct leaves. The subexpression "a+b" appears identically in both the left factor and inside the right factor, so the DAG represents it with a SINGLE shared "+" node rather than computing it twice. That shared "+" node then feeds into a "-" node (computing (a+b)-c, using the shared node and leaf c), and separately feeds into the outer "*" node (computing (a+b)*((a+b)-c), using the SAME shared "+" node as its left operand and the "-" node as its right operand). Total nodes = 3 leaves + 3 interior nodes (the shared +, the -, and the outer *) = 6 nodes, matching option 2.'
  },
  {
    id: 'compiler-icg-p5',
    pyqStyle: true,
    q: 'How many three-address instructions (excluding labels) are generated by the standard translation of "while(i<n) { i=i+1; }"? (Enter your numerical answer.)',
    options: [],
    answer: 3,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Standard while-loop translation: L1: (1) ifFalse i<n goto L2; (2) i=i+1; (3) goto L1; L2: (end, no instruction). The label L1 marks the loop-test entry point and L2 marks the exit point, but neither label is itself an executable instruction. Counting only the real instructions -- the loop-condition test, the increment assignment inside the body, and the unconditional jump back to re-test the condition -- gives exactly 3 three-address instructions.'
  },
  {
    id: 'compiler-icg-p6',
    pyqStyle: true,
    q: 'Using standard indexed-addressing TAC translation (4 bytes per array element, requiring an explicit offset-multiply temporary for each array access) for the statement "a[i] = b[j] + c[k];", how many three-address instructions are generated? (Enter your numerical answer.)',
    options: [],
    answer: 7,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Each array reference needs its own byte-offset computed via a multiply by the element size (4), then an indexed load; the final indexed store needs its own offset computed too. The full translation is: (1) t1=j*4; (2) t2=b[t1]; (3) t3=k*4; (4) t4=c[t3]; (5) t5=t2+t4; (6) t6=i*4; (7) a[t6]=t5. That totals 7 three-address instructions: two offset-multiplies and one indexed load for each of the two source array reads (4 instructions), one addition combining them, and one more offset-multiply plus one indexed store for the destination array write (2 more instructions).'
  },
  {
    id: 'compiler-icg-p7',
    pyqStyle: true,
    q: 'How many total DAG nodes represent the expression "-(a+b)*(a+b)+c", where the two occurrences of "(a+b)" are recognized as the same subexpression?',
    options: ['5', '6', '7', '8'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Leaves: a, b, c are 3 distinct leaves. Interior nodes: one shared "+" node for "a+b" (used identically in both places it appears); one unary "-" node applied to that shared "+" node (giving -(a+b)); one "*" node multiplying the unary-minus result by the SAME shared "+" node again (giving -(a+b)*(a+b)); and finally one outer "+" node adding leaf c to that product. That is 4 interior nodes (shared +, unary -, *, outer +) plus 3 leaves = 7 total DAG nodes, matching option 3.'
  },
  {
    id: 'compiler-icg-p8',
    pyqStyle: true,
    q: 'Using standard TAC translation for the chained conditional "if(a==1) x=10; else if(a==2) x=20; else x=30;" (labels not counted as instructions), how many three-address instructions are generated? (Enter your numerical answer.)',
    options: [],
    answer: 7,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'The standard cascading translation is: (1) ifFalse a==1 goto L1; (2) x=10; (3) goto L3; L1: (4) ifFalse a==2 goto L2; (5) x=20; (6) goto L3; L2: (7) x=30; L3: (end). Counting only actual instructions (not the labels L1, L2, L3, which just mark jump targets): two conditional tests, two branch-taken assignments (x=10 and x=20), two jumps to the common exit label L3, and the final else-branch assignment x=30. That totals 7 three-address instructions.'
  },
  {
    id: 'compiler-icg-p9',
    pyqStyle: true,
    q: 'How many total DAG nodes represent the boolean expression "(a<b) && (c<d) || (a<b)", where the two identical occurrences of "(a<b)" are recognized as the same subexpression?',
    options: ['6', '7', '8', '9'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Leaves: a, b, c, d are 4 distinct leaves. Interior nodes: one shared "<" node for "a<b" (used in both the && and the ||, since both occurrences are textually and semantically identical, so the DAG reuses the same node rather than creating a duplicate); one separate "<" node for "c<d" (a different comparison, using different operands, so it cannot be merged with the a<b node); one "&&" node combining the shared a<b node with the c<d node; and one outer "||" node combining the "&&" result with the SAME shared a<b node again. That gives 4 interior nodes (shared <, second <, &&, ||) plus 4 leaves = 8 total DAG nodes, matching option 3.'
  },
  {
    id: 'compiler-icg-p10',
    pyqStyle: true,
    q: 'Using standard naive TAC translation respecting operator precedence (no CSE), how many three-address instructions (including the final assignment to x) are generated for "x = a+b*c-d/e+f;", given the expression associates as (((a+(b*c))-(d/e))+f)?',
    options: [],
    answer: 5,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Following the given associativity (((a+(b*c))-(d/e))+f), the naive translation is: (1) t1=b*c; (2) t2=a+t1; (3) t3=d/e; (4) t4=t2-t3; (5) x=t4+f. Each of the 5 binary operators in the expression (*, +, /, -, and the final +) becomes exactly one three-address instruction, with the very last one directly assigning the result to x rather than to a fresh temporary. So the total is 5 three-address instructions.'
  },
  {
    id: 'compiler-icg-p11',
    pyqStyle: true,
    q: 'How many total DAG nodes are needed for the block of statements "t1=a+b; t2=a+b; t3=t1*t2; t4=a+b;" (recognizing that all three occurrences of "a+b" use the same unchanged operands a and b)?',
    options: ['3', '4', '5', '6'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Leaves: a and b are the only 2 distinct leaves (a and b are never reassigned in this block). Since all three statements t1=a+b, t2=a+b, and t4=a+b compute the identical expression on identical, unchanged operands, the DAG merges them into a SINGLE "+" node -- t1, t2, and t4 all become labels attached to (or simple copies referencing) that one shared node. Then t3=t1*t2 becomes a "*" node whose BOTH operands point to that same single shared "+" node (since t1 and t2 both refer to it). Total distinct nodes = 2 leaves (a, b) + 2 interior nodes (the shared + node, and the * node) = 4 nodes, matching option 2.'
  },
  {
    id: 'compiler-icg-p12',
    pyqStyle: true,
    q: 'Using standard TAC translation with 4-byte array elements for "for(i=0;i<n;i++) sum=sum+a[i];" (labels not counted as instructions), how many three-address instructions are generated? (Enter your numerical answer.)',
    options: [],
    answer: 7,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Standard translation: (1) i=0; L1: (2) ifFalse i<n goto L2; (3) t1=i*4; (4) t2=a[t1]; (5) sum=sum+t2; (6) i=i+1; (7) goto L1; L2: (end). Counting only real instructions (not the L1/L2 labels): the loop initialization, the condition test, the array-offset computation and indexed load (2 instructions), the running-sum update, the increment, and the jump back to re-test -- that totals 7 three-address instructions for the full loop translation.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-runtime';}).questions.push(
  {
    id: 'compiler-runtime-p1',
    pyqStyle: true,
    q: 'Consider: int x=1; void p(){ print(x); } void q(){ int x=2; p(); } void main(){ q(); }. What does this program print under STATIC scoping and under DYNAMIC scoping, respectively?',
    options: ['1 and 2', '2 and 1', '1 and 1', '2 and 2'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Under STATIC (lexical) scoping, the free variable x inside p() is resolved according to where p is textually DEFINED, not where it is called from. Since p() is defined at the top level (not nested inside q), its free reference to x binds to the global x=1, regardless of who calls p -- so it prints 1. Under DYNAMIC scoping, the free variable x inside p() is resolved by searching the CALL chain (activation records currently on the stack) from most recent to least recent: main called q, q called p, so p looks for the nearest enclosing active x, which is q\'s local x=2 -- so it prints 2. Hence the outputs are 1 (static) and 2 (dynamic), matching option 1.'
  },
  {
    id: 'compiler-runtime-p2',
    pyqStyle: true,
    q: 'void swap(int a, int b){ int t=a; a=b; b=t; } void main(){ int x=5,y=10; swap(x,y); print(x,y); }. What is printed under call-by-value versus call-by-reference respectively?',
    options: ['"5 10" and "5 10"', '"5 10" and "10 5"', '"10 5" and "5 10"', '"10 5" and "10 5"'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Under call-by-value, the parameters a and b receive independent COPIES of x and y\'s values; swap() only rearranges its own local copies, and this has no effect on the caller\'s actual variables x and y, so print(x,y) still shows the original "5 10". Under call-by-reference, a and b are ALIASES for x and y themselves (bound to their addresses), so assigning to a and b inside swap() directly modifies x and y in the caller, correctly swapping them; print(x,y) now shows "10 5". This is the canonical example distinguishing the two parameter-passing mechanisms.'
  },
  {
    id: 'compiler-runtime-p3',
    pyqStyle: true,
    q: 'int a[3]={1,2,3}; void f(int x, int y){ x=x+1; y=y+2; } void main(){ f(a[0], a[1]); print(a[0]+a[1]); }. Under call-by-VALUE parameter passing, what value does this print? (Enter your numerical answer.)',
    options: [],
    answer: 3,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Under call-by-value, f receives copies of a[0] (=1) and a[1] (=2) in its local parameters x and y. The modifications x=x+1 and y=y+2 inside f only change these local copies and have absolutely no effect on the original array elements a[0] and a[1], since no address or reference back to the array was ever passed. So after the call returns, a[0] is still 1 and a[1] is still 2, and print(a[0]+a[1]) computes 1+2 = 3.'
  },
  {
    id: 'compiler-runtime-p4',
    pyqStyle: true,
    q: 'int x=4; void A(){ int x=1; B(); } void B(){ print(x); } void main(){ x=9; A(); }. What does this print under static scoping and dynamic scoping respectively?',
    options: ['9 and 1', '1 and 9', '4 and 1', '9 and 9'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'B() is defined at the TOP LEVEL, not nested inside A, so under STATIC scoping its free reference to x always binds to the global x, regardless of the call chain. main() sets the global x to 9 before calling A (which calls B), so under static scoping B() prints 9. Under DYNAMIC scoping, B()\'s reference to x is resolved by searching the live call chain main -> A -> B for the most recently established x: A has just declared its own local x=1 before calling B, so B finds and prints A\'s local x, which is 1. Hence static scoping gives 9 and dynamic scoping gives 1, matching option 1.'
  },
  {
    id: 'compiler-runtime-p5',
    pyqStyle: true,
    q: 'void p(int i){ i=i+1; print(i); } void main(){ int a=5; p(a); print(a); }. Under call-by-VALUE, what two values are printed, in order (first the print inside p, then the print after p returns)?',
    options: ['5, 5', '6, 5', '6, 6', '5, 6'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'Under call-by-value, p\'s parameter i receives a COPY of a\'s value (5). Inside p, i=i+1 makes the local copy 6, and print(i) inside p shows 6. Since i is only a local copy with no connection back to a, the caller\'s variable a remains completely unaffected (still 5) after p returns, so the second print(a) shows 5. The sequence of printed values is therefore 6, then 5, matching option 2.'
  },
  {
    id: 'compiler-runtime-p6',
    pyqStyle: true,
    q: 'int x=1; void f(){ print(x); } void g(){ int x=2; f(); } void h(){ int x=3; g(); } void main(){ h(); }. What does this print under static scoping, and under dynamic scoping, respectively?',
    options: ['1 and 2', '1 and 3', '3 and 1', '2 and 1'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'f() is defined at the TOP LEVEL, so under STATIC scoping its free reference to x always resolves to the global x=1, no matter how deeply it is called from within h() and g() -- so static scoping prints 1. Under DYNAMIC scoping, f()\'s reference is resolved by walking the current call chain (main -> h -> g -> f) from the point of call backward, looking for the nearest active declaration of x: g\'s local x=2 was declared most recently before calling f (h\'s local x=3 is further back in the chain and is shadowed by g\'s own x within g\'s scope), so dynamic scoping finds g\'s x=2 first and prints 2. Hence the outputs are 1 (static) and 2 (dynamic), matching option 1.'
  },
  {
    id: 'compiler-runtime-p7',
    pyqStyle: true,
    q: 'int a=2; void f(int x){ x=x*2; a=a+3; } void main(){ f(a); print(a); }. (Here f\'s body directly references the global variable a as well as its own parameter x.) What does print(a) show under call-by-value, call-by-reference, and call-by-value-result respectively?',
    options: ['5, 7, 4', '4, 7, 5', '7, 5, 4', '5, 4, 7'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Call-by-VALUE: x is an independent local copy of a\'s value 2; "x=x*2" makes x=4 locally, with no effect on the global a. Then "a=a+3" refers directly to the global a (still 2), making it 2+3=5. Final print(a)=5. Call-by-REFERENCE: x is an alias for a itself; "x=x*2" directly doubles a to 4; then "a=a+3" adds 3 to that same storage, giving 4+3=7. Final print(a)=7. Call-by-VALUE-RESULT (copy-restore): x starts as a local copy of a=2; "x=x*2" makes the local x=4 (global a still untouched, =2, at this point); "a=a+3" then operates on the STILL-UNCHANGED global a=2, setting it to 2+3=5; but at RETURN time, value-result copies x\'s final local value (4) back into a, OVERWRITING the interim 5 with 4. Final print(a)=4. So the three outputs in order are 5, 7, 4, matching option 1.'
  },
  {
    id: 'compiler-runtime-p8',
    pyqStyle: true,
    q: 'In a block-structured language with static scoping, procedures are nested three levels deep: A (outermost) statically contains B, which statically contains C. From within C\'s activation record, how many static links must be traversed to reach A\'s activation record and access a variable declared in A? (Enter your numerical answer.)',
    options: [],
    answer: 2,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Each activation record\'s static link points to the activation record of the LEXICALLY (statically) ENCLOSING procedure\'s most recent activation, not the caller. Starting at C\'s activation, following ONE static link reaches B\'s activation (since C is nested directly inside B), and following a SECOND static link from there reaches A\'s activation (since B is nested directly inside A). So exactly 2 static-link traversals are needed to get from C all the way up to A, matching the nesting depth difference of 2 between C (level 3) and A (level 1).'
  },
  {
    id: 'compiler-runtime-p9',
    pyqStyle: true,
    q: 'int i=1; int a[3]={2,4,6}; (0-indexed: a[0]=2, a[1]=4, a[2]=6) void f(int x){ i=2; x=0; } void main(){ i=1; f(a[i]); print(a[1], a[2]); }. What does print(a[1], a[2]) show under call-by-REFERENCE and under call-by-NAME respectively?',
    options: ['(0, 6) and (4, 0)', '(4, 0) and (0, 6)', '(0, 0) and (4, 6)', '(4, 6) and (0, 0)'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'CALL-BY-REFERENCE: the actual argument "a[i]" is evaluated ONCE at call time to determine which storage location x aliases; since i=1 at the moment of the call, x is bound to the ADDRESS of a[1] for the entire call, regardless of any later change to i. Inside f, "i=2" changes i but does not change what x refers to (already fixed to a[1]); "x=0" then sets a[1]=0. Final array: a[1]=0 (changed), a[2]=6 (untouched) -> prints (0, 6). CALL-BY-NAME: the argument "a[i]" is NOT evaluated once; instead, x is textually substituted by "a[i]" and RE-EVALUATED at every use inside f, using i\'s CURRENT value at that point. The only use of x is in the statement "x=0", which textually becomes "a[i]=0" -- but by the time this line executes, "i=2" has already run, so i is now 2, meaning this sets a[2]=0. Final array: a[1]=4 (untouched, its original value), a[2]=0 (changed) -> prints (4, 0). So the two results are (0,6) for reference and (4,0) for name, matching option 1 -- illustrating exactly why call-by-name can produce results that differ sharply from call-by-reference when the argument expression itself has side-effect-dependent components.'
  },
  {
    id: 'compiler-runtime-p10',
    pyqStyle: true,
    q: 'int x=5; void f(int x){ print(x); } void g(){ int x=10; f(20); } void main(){ g(); }. What does f print, under static scoping and under dynamic scoping respectively?',
    options: ['20 under both scoping disciplines', '5 (static) and 10 (dynamic)', '10 (static) and 20 (dynamic)', '5 under both scoping disciplines'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'This question tests whether static-vs-dynamic scoping is understood correctly: the scoping RULE only matters for resolving a FREE variable reference (one not declared locally in the current procedure). Here, x inside f\'s print(x) statement is NOT a free variable at all -- it directly refers to f\'s OWN formal parameter x (which shadows any outer x by ordinary, scoping-rule-independent local binding, exactly like any local variable declaration). Since f is called as f(20), its parameter x is bound to 20 regardless of what static or dynamic scoping would otherwise dictate for a free variable -- parameter binding always takes precedence within its own procedure body. So print(x) prints 20 under BOTH static and dynamic scoping, matching option 1; the global x=5 and g\'s local x=10 are simply irrelevant here since f never has an unbound (free) reference to x that would need scope resolution.'
  },
  {
    id: 'compiler-runtime-p11',
    pyqStyle: true,
    q: 'In a statically scoped, block-structured language, procedure D is nested directly inside C, which is nested directly inside B, which is nested directly inside A (so the static nesting depth order, outermost first, is A, B, C, D). From D\'s activation record, how many access (static) links must be traversed to reach the activation record of B, in order to access a variable declared in B? (Enter your numerical answer.)',
    options: [],
    answer: 2,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'D is nested 2 lexical levels below B (the nesting chain from D upward is D -> C -> B, i.e., D\'s immediate static parent is C, and C\'s immediate static parent is B). Each static (access) link points exactly one level up to the immediately statically enclosing procedure\'s current activation. So from D, ONE static-link traversal reaches C\'s activation, and a SECOND static-link traversal from there reaches B\'s activation. Therefore exactly 2 static links must be followed to get from D up to B, matching the difference in nesting depth (D is at depth 4, B is at depth 2, difference = 2).'
  },
  {
    id: 'compiler-runtime-p12',
    pyqStyle: true,
    q: 'int x=0; void inc(){ x=x+1; } void f(){ int x=100; inc(); print(x); } void main(){ f(); }. What does print(x) inside f show under static scoping and under dynamic scoping respectively?',
    options: ['100 and 101', '101 and 100', '100 and 100', '101 and 101'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'The final print(x) is inside f, referring to f\'s OWN locally declared variable x -- this is not a free-variable lookup at all, so its value is printed exactly as f\'s local x currently stands, under EITHER scoping rule; the scoping discipline only affects how inc()\'s free reference to x (inc has no local x of its own) gets resolved. Under STATIC scoping, inc() is defined at the top level, so its free x always binds to the GLOBAL x (0), completely independent of f\'s local x; inc() increments the global x from 0 to 1, but f\'s own local x=100 is never touched, so f\'s later print(x) shows 100. Under DYNAMIC scoping, inc()\'s free reference to x is resolved by searching the live call chain main->f->inc for the nearest active x: f\'s local x=100 is the nearest one found, so inc() increments THIS variable instead, changing it from 100 to 101; f\'s subsequent print(x) then shows 101 (since it is the very same local x that inc() just modified). So the outputs are 100 (static) and 101 (dynamic), matching option 1.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-optimization';}).questions.push(
  {
    id: 'compiler-optimization-p1',
    pyqStyle: true,
    q: 'Given the three-address code (line numbers shown): 1: i=0; 2: t1=i<n; 3: ifFalse t1 goto 9; 4: t2=i*4; 5: t3=a[t2]; 6: sum=sum+t3; 7: i=i+1; 8: goto 2; 9: print sum. Using the standard leader-identification rules, how many basic blocks does this code split into? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Leaders are: (a) the first statement, line 1; (b) any statement that is the TARGET of a conditional or unconditional jump: line 9 (target of the ifFalse at line 3) and line 2 (target of the goto at line 8); (c) any statement immediately following a conditional or unconditional jump: line 4 (follows the ifFalse at line 3; line 9 is already a leader from rule b). Collecting all leaders: {1, 2, 4, 9} -- exactly 4 leaders. Each leader begins a new basic block that extends up to (but not including) the next leader, giving the blocks {1}, {2,3}, {4,5,6,7,8}, {9}. So there are 4 basic blocks.'
  },
  {
    id: 'compiler-optimization-p2',
    pyqStyle: true,
    q: 'A basic block computes: S1: x=a+b; S2: y=x*c; S3: a=y-d; S4: z=a+b. Only z is live on exit (LiveOut(S4)={z}). Using backward live-variable analysis (LiveIn(S)=use(S) U (LiveOut(S)-def(S))), how many distinct variables are in LiveIn(S1)? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Working backward: LiveOut(S4)={z}. LiveIn(S4)=use(S4) U (LiveOut(S4)-def(S4)) = {a,b} U ({z}-{z}) = {a,b}, so LiveOut(S3)={a,b}. LiveIn(S3)=use(S3) U (LiveOut(S3)-def(S3)) = {y,d} U ({a,b}-{a}) = {y,d,b}, so LiveOut(S2)={y,d,b}. LiveIn(S2)=use(S2) U (LiveOut(S2)-def(S2)) = {x,c} U ({y,d,b}-{y}) = {x,c,d,b}, so LiveOut(S1)={x,c,d,b}. LiveIn(S1)=use(S1) U (LiveOut(S1)-def(S1)) = {a,b} U ({x,c,d,b}-{x}) = {a,b,c,d}. This set has exactly 4 distinct variables (a, b, c, d), while all of x, y, z are purely internal temporaries fully produced and consumed within the block.'
  },
  {
    id: 'compiler-optimization-p3',
    pyqStyle: true,
    q: 'Given the code: 1: x=5; 2: y=x+3; 3: z=y*2; 4: w=z+a; (a is not a compile-time constant). After forward constant propagation followed by constant folding, which of the following resulting statements are CORRECT? (Select ALL that apply)',
    options: [
      'Statement 2 folds to: y=8',
      'Statement 3 folds to: z=16',
      'Statement 4 folds to: w=20+a',
      'Statement 4 can be fully folded into a single constant, eliminating variable a entirely'
    ],
    answers: [0, 1],
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Since x=5 is a compile-time constant, propagating it into statement 2 gives y=5+3, which constant-folds to y=8 -- option 1 is correct. Propagating this new constant y=8 into statement 3 gives z=8*2, which folds to z=16 -- option 2 is correct. Propagating z=16 into statement 4 gives w=16+a, NOT w=20+a as option 3 incorrectly claims (20 does not arise from any correct computation here), so option 3 is false. Since a is not a compile-time constant, w=16+a cannot be folded any further into a single constant -- a must remain a run-time addition, so option 4 is also false. Only options 1 and 2 are correct.'
  },
  {
    id: 'compiler-optimization-p4',
    pyqStyle: true,
    q: 'Inside a loop, the statement "t = i*4;" recomputes a multiple of the loop index i every iteration, where i increases by exactly 1 each pass. Which classic compiler optimization directly replaces this per-iteration multiplication with successive additions of the constant 4 to an accumulator, exploiting the fact that i changes by a fixed amount each iteration?',
    options: ['Constant folding', 'Strength reduction', 'Dead-code elimination', 'Loop unrolling'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'This is the textbook definition of STRENGTH REDUCTION applied to an induction variable: because i increases by a fixed constant (1) on every iteration, the derived value i*4 also increases by a fixed constant (4) on every iteration, so instead of recomputing the multiplication i*4 from scratch each time, the compiler introduces a new variable that starts at the initial value of i*4 and is simply INCREMENTED by 4 each iteration -- replacing an expensive multiplication with a cheaper addition. Constant folding (option 1) only applies to expressions with purely compile-time-constant operands, which i*4 is not since i varies; dead-code elimination (option 3) removes computations whose results are never used, which does not apply here since t is presumably used; loop unrolling (option 4) replicates the loop body to reduce branch overhead, an unrelated transformation.'
  },
  {
    id: 'compiler-optimization-p5',
    pyqStyle: true,
    q: 'Inside the loop body "for(i=0;i<n;i++){ x=a*b; sum=sum+x+i; }", assuming a and b are never modified anywhere inside the loop, which statement is LOOP-INVARIANT and can be safely hoisted out of the loop (computed once before the loop starts)?',
    options: ['x=a*b', 'sum=sum+x+i', 'the loop condition i<n', 'i=i+1 (the increment)'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'pyq-style',
    explanation: 'A statement is loop-invariant if the value it computes does not change across iterations of the loop -- typically because all of its operands are either constants or variables not modified anywhere within the loop body. Since a and b are never reassigned inside this loop, the expression a*b always yields the same result on every iteration, so "x=a*b" is loop-invariant and can be computed just once before the loop and reused every iteration (code motion). By contrast, "sum=sum+x+i" depends on sum and i, both of which change every iteration, so it is NOT invariant; the loop condition i<n depends on the changing i, so it must be re-evaluated each pass; and the increment i=i+1 obviously changes i itself every time and cannot be hoisted.'
  },
  {
    id: 'compiler-optimization-p6',
    pyqStyle: true,
    q: 'A basic block contains: 1: x=a+b; 2: y=a-b; 3: x=c+d; 4: print(x); Assume y is never used anywhere else in the program. Which of the following statements are DEAD CODE that can be safely eliminated from this block? (Select ALL that apply)',
    options: [
      'Statement 1 (x=a+b)',
      'Statement 2 (y=a-b)',
      'Statement 3 (x=c+d)',
      'Statement 4 (print(x))'
    ],
    answers: [0, 1],
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Statement 1 assigns a+b to x, but x is REASSIGNED at statement 3 (x=c+d) before that first value is ever read anywhere in between -- so the value computed by statement 1 is never used by anyone, making statement 1 dead code that can be safely deleted. Statement 2 assigns a value to y, but the problem states y is never used anywhere else in the program at all -- an assignment whose result is never subsequently read is by definition dead code, so statement 2 can also be safely deleted. Statement 3 assigns to x, and this value IS used at statement 4 (print(x)), so it is live and must be kept. Statement 4 is the print itself, a statement with an observable side effect (I/O), so it can never be treated as dead code. Only statements 1 and 2 qualify as dead code.'
  },
  {
    id: 'compiler-optimization-p7',
    pyqStyle: true,
    q: 'Local common-subexpression elimination, applied within a single basic block, can detect and eliminate a redundant recomputation of "a+b" occurring twice in the SAME block. Why might it fail to eliminate a redundant recomputation of "a+b" that instead occurs in a DIFFERENT (later) basic block, one that is reached along every possible control-flow path from the block where "a+b" was first computed?',
    options: [
      'Because local CSE only examines expressions strictly within a single basic block and has no mechanism to track which expressions remain available across block boundaries; catching such cases requires a global, data-flow-based "available expressions" analysis over the whole control-flow graph',
      'Because "a+b" computed in two different basic blocks is never actually the same expression, regardless of any data-flow reasoning',
      'Because CSE can only ever be applied to array-indexing expressions, never to simple arithmetic like a+b',
      'Because local CSE always automatically extends its analysis across every basic block in the entire procedure with no extra work needed'
    ],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Local (basic-block-level) common-subexpression elimination works purely by scanning statements within one block, using a simple table of already-computed expressions valid only for that block\'s duration; it has no visibility into what was computed in a DIFFERENT block, since its analysis never crosses block boundaries. To recognize that "a+b" computed in an earlier block is STILL available (i.e., a and b have not been reassigned along any path reaching the later block) requires a GLOBAL, control-flow-graph-wide data-flow analysis known as "available expressions" -- which explicitly tracks, for every point in the program, the set of expressions guaranteed to have already been computed and not since invalidated along every incoming path. Without this global analysis, purely local CSE genuinely cannot catch such cross-block redundancy, matching option 1.'
  },
  {
    id: 'compiler-optimization-p8',
    pyqStyle: true,
    q: 'Given the three-address code: 1: a=1; 2: b=2; 3: if a<b goto 6; 4: c=3; 5: goto 7; 6: c=4; 7: print c. Using standard leader-identification rules, how many basic blocks does this code split into? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Leaders: (a) line 1 (first statement); (b) targets of jumps: line 6 (target of the conditional goto at line 3) and line 7 (target of the unconditional goto at line 5); (c) statements immediately following a jump: line 4 (follows the conditional at line 3) and line 6 (follows the goto at line 5, but it is already a leader from rule b). Collecting: {1, 4, 6, 7} -- exactly 4 leaders, giving 4 basic blocks: {1,2,3}, {4,5}, {6}, {7}.'
  },
  {
    id: 'compiler-optimization-p9',
    pyqStyle: true,
    q: 'A basic block computes: S1: t=a*b; S2: c=t+d; S3: e=c-a; with LiveOut(S3)={e} (e is the only variable live on exit). How many distinct variables are in LiveOut(S2)? (Enter your numerical answer.)',
    options: [],
    answer: 2,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'LiveOut(S3)={e} (given). LiveIn(S3)=use(S3) U (LiveOut(S3)-def(S3)) = {c,a} U ({e}-{e}) = {c,a}. Since S3 is the only (and immediate) successor of S2 in this straight-line block, LiveOut(S2) = LiveIn(S3) = {c,a}, which contains exactly 2 distinct variables: c and a. This makes intuitive sense: right after S2 computes c, that value is still needed by S3 (to compute e), and a is also still needed by S3 for the subtraction, while t (defined and fully consumed within S1-S2) is not needed again afterward.'
  },
  {
    id: 'compiler-optimization-p10',
    pyqStyle: true,
    q: 'Consider the loop "for(i=1;i<=n;i++){ y=i*i; z=b*c; arr[i]=y+z; }", where b and c are never modified inside the loop. Which of the following statements about optimizing this loop are TRUE? (Select ALL that apply)',
    options: [
      'z=b*c is loop-invariant and can be hoisted out of the loop, computed just once before it starts',
      'y=i*i is loop-invariant in exactly the same way as z=b*c, and can likewise be hoisted out of the loop entirely',
      'y=i*i is a natural candidate for induction-variable strength reduction: since i changes by a fixed amount each iteration, y can instead be maintained by cheaper incremental updates rather than being recomputed via multiplication every iteration',
      'Because z=b*c is textually written inside the loop body, it can never be classified as loop-invariant regardless of what the actual data flow shows'
    ],
    answers: [0, 2],
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Option 1 is true: since b and c are never modified anywhere inside the loop, the value of b*c is the same on every iteration, making z=b*c a textbook loop-invariant computation eligible for hoisting (code motion) to just before the loop. Option 2 is FALSE: y=i*i depends directly on the loop-control variable i, which changes on every iteration, so its value is genuinely different each time around the loop -- it cannot be treated as loop-invariant or hoisted out. Option 3 is true: this is exactly the classic induction-variable optimization -- since i increases by a constant 1 each iteration, i*i can be tracked by cheaper incremental updates (its own induction-variable recurrence) rather than paying for a fresh multiplication every single iteration, which is a form of strength reduction applied via induction-variable analysis. Option 4 is false: whether a statement is loop-invariant depends entirely on the DATA-FLOW facts (whether its operands are ever modified inside the loop along any executed path), not on where it happens to be written textually within the loop body.'
  },
  {
    id: 'compiler-optimization-p11',
    pyqStyle: true,
    q: 'A statement d: "x = y op z" inside a basic block can be safely deleted as dead code if and only if which condition holds?',
    options: [
      'x is not live immediately after d (i.e., x is not in LiveOut(d)), AND the operation has no other observable side effect (such as I/O or memory write through a pointer)',
      'y is not live immediately before d, regardless of whether x is used afterward',
      'z is a compile-time constant, regardless of whether x is ever subsequently used',
      'd is the very last statement physically written in the source program\'s basic block'
    ],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'The defining condition for dead-code elimination of an assignment is precisely liveness of its DEFINED variable: statement d defines x, so d can be safely removed exactly when x is NOT live immediately after d -- meaning no later use of x can be reached along any control-flow path without x being redefined first -- AND the statement produces no other externally observable effect (a call with I/O, a write through a pointer/array that might alias other live storage, etc., must always be kept regardless of whether its "result" variable is later used). The liveness of the OPERANDS y and z (options 2 and 3) is irrelevant to whether d itself is dead; those operands\' own liveness only matters for deciding whether THEIR defining statements, further up, are dead. Option 4 (textual position) has no bearing on dead-code analysis, which is a data-flow property, not a textual one.'
  },
  {
    id: 'compiler-optimization-p12',
    pyqStyle: true,
    q: 'Given the three-address code: 1: i=0; 2: j=0; 3: if i>=n goto 11; 4: if j>=m goto 9; 5: t=i*m+j; 6: a[t]=0; 7: j=j+1; 8: goto 4; 9: i=i+1; 10: goto 2; 11: print done. Using standard leader-identification rules, how many basic blocks does this code split into? (Enter your numerical answer.)',
    options: [],
    answer: 6,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Leaders: (a) line 1 (first statement); (b) targets of any jump: line 11 (target of the conditional at line 3), line 9 (target of the conditional at line 4), line 4 (target of the goto at line 8), line 2 (target of the goto at line 10); (c) statements immediately following a jump: line 4 (follows line 3, already a leader), line 5 (follows the conditional at line 4), line 9 (follows the goto at line 8, already a leader), line 11 (follows the goto at line 10, already a leader). Collecting all distinct leaders: {1, 2, 4, 5, 9, 11} -- exactly 6 leaders, giving 6 basic blocks: {1}, {2,3}, {4}, {5,6,7,8}, {9,10}, {11}.'
  }
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-parsing';}).questions.push(
{
  id: 'compiler-parsing-h1',
  q: 'Which of the following grammars are SLR(1)? (Select ALL that apply)',
  options: [
    "E -> E + T | T ; T -> T * F | F ; F -> ( E ) | id",
    "S -> L = R | R ; L -> * R | id ; R -> L",
    "S -> a S b S | b S a S | epsilon",
    "S -> ( S ) S | epsilon"
  ],
  answers: [0, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Each grammar needs its own item-set/table check. Option A is the canonical unambiguous expression grammar with precedence built in via the E/T/F nonterminal layering; its LR(0) automaton has no state where a shift and a reduce (or two reduces) compete under SLR's FOLLOW-set lookaheads, so it is SLR(1) (and consequently also LALR(1) and LR(1), since SLR(1) grammars are always LALR(1) and LR(1) too). Option B is the classic Dragon-book example that is NOT SLR(1): in the state reached after parsing L, containing items S -> L . = R and R -> L ., SLR must decide whether to shift on '=' or reduce R -> L . using FOLLOW(R); computing FOLLOW(R) reveals it includes '=' (because of the mutual dependency FOLLOW(R) contains FOLLOW(L), and FOLLOW(L) contains '=' from S -> L.=R), so SLR sees a shift/reduce conflict on '=' - this grammar IS LALR(1) and LR(1), just not SLR(1), because those stronger methods track more precise, state-specific lookaheads that correctly rule out '=' for the reduce in this particular context. Option C is a genuinely ambiguous grammar (multiple parse trees exist for strings like 'abab'), and ambiguous grammars are never SLR(1), LALR(1), or LR(k) for any k, since genuine ambiguity produces unavoidable conflicts no fixed amount of lookahead can resolve. Option D is the standard balanced-parentheses grammar, which is not only SLR(1) but even LL(1) (FIRST/FOLLOW sets cleanly separate the '(' -continuing production from the epsilon-production on any other lookahead), and by the parser-power hierarchy LL(1) subset-of SLR(1), so it is automatically SLR(1) too."
},
{
  id: 'compiler-parsing-h2',
  q: 'In the SLR(1) parsing table for the grammar S -> L = R | R ; L -> * R | id ; R -> L, a genuine conflict arises in one particular state. Which of the following correctly identifies the conflicting item set and the exact nature of the conflict?',
  options: [
    "Shift-reduce conflict in the state containing items S -> L . = R and R -> L ., on lookahead '=': SLR's table uses FOLLOW(R) = {=, $}, causing a spurious reduce-on-'=' action that conflicts with the shift action demanded by S -> L.=R; LALR(1) instead computes a context-specific lookahead of just {$} for the item R -> L . in this exact state, which removes the conflict.",
    "Reduce-reduce conflict in the state containing items L -> id . and R -> L ., since both are complete items whose FOLLOW sets happen to overlap on '='.",
    "Shift-reduce conflict in the initial state I0, between shifting on the terminal 'id' and reducing via S -> R ., triggered by the lookahead 'id'.",
    "Reduce-reduce conflict between the completed items S -> R . and R -> L . occurring together in the same state after reading a single 'id' token."
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Building the canonical LR(0) item sets for this grammar, the state reached by taking the goto on L from the initial state contains exactly the two items S -> L . = R and R -> L . (this is the state you reach after the parser has recognized an L and must decide what comes next). SLR resolves the completed item R -> L . by reducing whenever the lookahead lies in FOLLOW(R). Computing FOLLOW(R) requires resolving a mutual dependency: R appears in S -> L=R and S -> R, contributing FOLLOW(S) = {$}; L appears in R -> L, contributing FOLLOW(R) to FOLLOW(L); and L appears in S -> L=R, contributing '=' to FOLLOW(L). Chasing this cycle to its fixed point puts '=' into BOTH FOLLOW(L) and FOLLOW(R). So in the state described, SLR's table says: shift on '=' (from the item S -> L . = R) AND reduce R -> L . on lookahead '=' (since '=' is in FOLLOW(R)) - a genuine shift-reduce conflict, exactly as option A states. LALR(1), by contrast, computes lookaheads specific to each numbered state rather than using the grammar-wide FOLLOW set, and in this particular state the item R -> L . only ever needs to be reduced when the actual next symbol is end-of-input ($), never '=' (because whenever '=' truly follows, the parser is instead in the process of matching S -> L.=R, not needing this reduction at all) - so LALR(1)'s more precise lookahead set for this item is just {$}, and the conflict disappears. The other three options describe item sets or conflicts that do not actually arise in this grammar's canonical construction."
},
{
  id: 'compiler-parsing-h3',
  q: 'Which of the following statements about converting grammars toward LL(1) form are TRUE? (Select ALL that apply)',
  options: [
    "S -> S a | b, after eliminating left recursion, becomes S -> b S', S' -> a S' | epsilon, and this transformed grammar is LL(1).",
    "The dangling-else grammar stmt -> if expr then stmt | if expr then stmt else stmt | other cannot be made LL(1) (or even unambiguous) by any amount of left-factoring, because the ambiguity is inherent to the grammar's structure, not a mere FIRST/FIRST prefix-overlap issue.",
    "Left-factoring alone is always sufficient to convert any unambiguous, non-left-recursive context-free grammar into an equivalent LL(1) grammar.",
    "A grammar with no left recursion and no common prefixes among the alternative productions of any single nonterminal is automatically guaranteed to be LL(1)."
  ],
  answers: [0, 1],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: this is the textbook left-recursion-elimination transformation, and the result is LL(1) - FIRST(S) = {b}, and S' cleanly separates on FIRST(aS')={a} versus FOLLOW(S') for the epsilon-alternative, with no overlap, giving a conflict-free predictive parsing table. B is TRUE: the dangling-else ambiguity is a structural/semantic ambiguity (a given 'if-then-else' sequence can be parsed by associating the else with either enclosing unmatched if), not a superficial common-prefix issue that left-factoring is designed to fix; left-factoring only merges alternatives that share an initial symbol sequence, and cannot invent a way to disambiguate two genuinely different, equally valid parse structures for the same token sequence - real compilers instead resolve it by an external convention (match each else to the nearest unmatched if) enforced procedurally, outside the raw ambiguous grammar. C is FALSE: left-factoring only removes FIRST/FIRST conflicts caused by common prefixes; it does nothing about other LL(1) obstructions such as left recursion (a different transformation entirely) or FIRST/FOLLOW conflicts on nullable nonterminals, and there exist unambiguous, non-left-recursive CFGs that are inherently not LL(k) for any k due to structural reasons no amount of left-factoring can repair, so the blanket 'always sufficient' claim is false. D is FALSE and is a classic incomplete-checklist trap: absence of left recursion and absence of common prefixes are NECESSARY conditions for LL(1) but not SUFFICIENT - a nullable nonterminal also needs FIRST and FOLLOW to be disjoint (e.g. A -> a | epsilon fails LL(1) if FOLLOW(A) also contains 'a', even though there is no left recursion or shared prefix among A's own two alternatives)."
},
{
  id: 'compiler-parsing-h4',
  q: 'Which of the following grammars is LR(1) (i.e., parseable by the canonical/CLR method) but NOT LALR(1), due to a reduce-reduce conflict introduced specifically by merging LR(1) states that share the same core?',
  options: [
    "S -> a A d | b B d | a B e | b A e ; A -> c ; B -> c",
    "S -> L = R | R ; L -> * R | id ; R -> L",
    "E -> E + T | T ; T -> T * F | F ; F -> ( E ) | id",
    "S -> a S b S | b S a S | epsilon"
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Option A is the standard textbook example distinguishing LALR(1) from full canonical LR(1). In the canonical LR(1) automaton, the item 'A -> c .' appears in one state carrying only the lookahead 'd' (reached via the a...c... path), while the item 'B -> c .' appears in a DIFFERENT state carrying only the lookahead 'e' (reached via the b...c... path) - these two states have the same underlying LR(0) core (both just contain a completed '. -> c .' item after seeing 'c') but different, non-overlapping lookahead sets, so canonical LR(1) keeps them separate and conflict-free. LALR(1) construction merges any states sharing the same core to save space, which here forces 'A -> c .' and 'B -> c .' into a single merged state carrying the UNION of both lookaheads, {d, e}; since this merged state must decide between reducing to A or reducing to B while both 'd' and 'e' now look like valid lookaheads for either reduction, a reduce-reduce conflict appears that did not exist before merging - so this grammar is LR(1) but not LALR(1). Option B is the different, more commonly cited SLR-vs-LALR (not LALR-vs-CLR) example: it fails SLR(1) but succeeds at LALR(1) and CLR(1) equally, so it is not a valid answer to this specific question. Option C is fully SLR(1) already (and hence also LALR(1) and LR(1)) with no conflicts anywhere in its tables. Option D is genuinely ambiguous and therefore fails every deterministic parsing method, including full canonical LR(1), so it cannot be the LR(1)-but-not-LALR(1) example being asked for."
},
{
  id: 'compiler-parsing-h5',
  q: 'Consider the classic dangling-else grammar S -> i S e S | i S | a (where i stands for "if", e for "else", a for any other statement), used to illustrate the dangling-else ambiguity in a parser generator. Constructing its SLR(1) parsing table reveals exactly how many shift-reduce conflict CELLS? Enter your numerical answer.',
  options: [],
  answer: 1,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Building the canonical LR(0) automaton for this grammar produces exactly one problematic state: the state reached after recognizing 'i S' (i.e., containing the item S -> i S . e S alongside the completed item S -> i S .). At this point, the parser must decide, upon seeing the next input token, whether to shift a pending 'e' (continuing to match S -> iS.eS, i.e., attaching the else to THIS if) or to reduce via the completed S -> iS. (closing off this if without an else, letting the else, if any, attach to some OUTER enclosing if instead). Since FOLLOW(S) includes 'e' (because e can indeed follow an S inside the iSeS production), the SLR table's reduce action for S -> iS. is triggered by lookahead 'e', exactly the same lookahead that also triggers the shift action for S -> iS.eS - this produces exactly one shift-reduce conflict cell, at the row for this state and the column for terminal 'e'. No other state in this small grammar's automaton has any competing actions. Real parser generators such as yacc/bison resolve this specific, well-understood conflict by a documented default rule: prefer shift over reduce, which has the effect of always attaching a dangling else to the nearest unmatched if - exactly the conventional disambiguation rule used by essentially every real programming language, so the 'conflict' is intentionally left in place and silently resolved rather than treated as a grammar error."
},
{
  id: 'compiler-parsing-h6',
  q: 'Which of the following nonterminal definitions, taken in isolation together with the stated FOLLOW set, would cause a table-construction conflict that prevents the grammar from being LL(1)? (Select ALL that apply)',
  options: [
    "A -> a | epsilon, with FOLLOW(A) = { a, $ }",
    "B -> b | epsilon, with FOLLOW(B) = { c, $ }",
    "C -> d C | e, with FOLLOW(C) = { $ }",
    "D -> f | f g, with FOLLOW(D) = { $ }"
  ],
  answers: [0, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is a VIOLATION: since A can derive epsilon, LL(1) requires FIRST(A) minus {epsilon} = {a} to be disjoint from FOLLOW(A); here FOLLOW(A) = {a, $} contains 'a', so on lookahead 'a' the parser cannot decide whether to expand A -> a (matching the 'a' directly) or A -> epsilon (skipping A and letting the following context consume the 'a') - a genuine FIRST/FOLLOW conflict that blocks LL(1). B is NOT a violation: FIRST(B) minus {epsilon} = {b}, and FOLLOW(B) = {c, $}, which share no common element, so there is no ambiguity about when to pick B -> b versus B -> epsilon. C is NOT a violation: the two alternatives dC and e have disjoint FIRST sets ({d} versus {e}), there is no left recursion (the recursion is on the right, in dC, which is fine for LL(1)), and C is not nullable, so no FIRST/FOLLOW check is even needed - this nonterminal causes no conflict. D IS a violation: both alternatives f and fg begin with the same terminal 'f' (a genuine FIRST/FIRST common-prefix conflict, the kind left-factoring is designed to fix), so on seeing lookahead 'f' the parser cannot tell which alternative to commit to without additional lookahead - this nonterminal, as given, is not LL(1) and needs left-factoring into D -> f D', D' -> g | epsilon before it can be used in a predictive parser."
},
{
  id: 'compiler-parsing-h7',
  q: 'Which of the following statements about the relative power of parsing methods are TRUE? (Select ALL that apply)',
  options: [
    "Every grammar that is LL(1) is also SLR(1).",
    "Every grammar that is SLR(1) is also LALR(1).",
    "Every grammar that is LALR(1) is also LR(1) (parseable by the canonical/CLR method).",
    "Every grammar that is LR(1) (CLR) is also LALR(1)."
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "These four options trace the standard strict hierarchy of deterministic bottom-up-friendly grammar classes: LL(1) subset-of SLR(1) subset-of LALR(1) subset-of LR(1), with each containment proper (there exist grammars in each stronger class that fail the weaker one, though none are needed to answer this particular true/false battery). A is TRUE: it is a standard theorem that every LL(1) grammar is also SLR(1) - roughly, LL(1)'s FIRST/FOLLOW-based predictive determinism is strong enough to guarantee the weaker set of conditions SLR(1) parsing needs at the state level. B is TRUE: LALR(1) tables are built by taking the same canonical automaton structure SLR(1) implicitly relies on but resolving reduce actions with strictly more precise, state-specific lookahead sets rather than the coarser grammar-wide FOLLOW sets, so any state that was conflict-free under SLR's coarser lookahead remains conflict-free (or becomes even more clearly resolvable) under LALR's finer-grained lookahead - hence SLR(1) grammars are always LALR(1). C is TRUE: LALR(1) is built by merging states of the full canonical LR(1) automaton that share the same core; merging can only ever CREATE new conflicts (by unioning together lookahead sets that were previously kept safely separate), never remove a conflict that was already there - so if the merged (LALR) automaton is conflict-free, the unmerged (canonical LR(1)) automaton, having strictly more separated states and hence at least as much discriminating power, must also have been conflict-free, meaning every LALR(1) grammar is also LR(1). D is FALSE: this is the converse of C and is exactly the false direction - the LALR-vs-CLR example S -> aAd|bBd|aBe|bAe;A->c;B->c is LR(1) precisely because canonical LR(1) keeps two same-core states separate, yet it is NOT LALR(1) precisely because merging those same two states creates a reduce-reduce conflict, directly disproving this option."
}
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-optimization';}).questions.push(
{
  id: 'compiler-optimization-h1',
  q: 'Consider the code fragment:\n1: t1 = a + b\n2: t2 = a + b\n3: c = t1 * t2\n4: d = a + b\nAssume a and b are never reassigned between lines 1 and 4. Which of the following optimizations are VALID? (Select ALL that apply)',
  options: [
    "Common subexpression elimination can replace line 2 (t2 = a + b) with t2 = t1, since a+b was already computed at line 1 and neither a nor b changes in between.",
    "Line 4 (d = a + b) can also be rewritten as d = t1 via common subexpression elimination, for the same reason.",
    "Dead code elimination can remove line 2 entirely, on the grounds that t2 is never used anywhere later in the fragment.",
    "Constant folding can fold line 1 into a single computed value at compile time, PROVIDED a and b are both known compile-time constants; if they are ordinary runtime variables, constant folding does not apply here at all."
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: this is the textbook definition of common subexpression elimination - since a and b are unchanged between lines 1 and 2, the expression a+b is guaranteed to evaluate identically both times, so the second computation can simply reuse the already-computed value t1 instead of recomputing. B is TRUE for the identical reason, extended across a longer unchanged interval: as long as neither a nor b is reassigned anywhere between line 1 and line 4 (as stated), line 4's a+b is still the same expression with the same operand values, so it too can safely reuse t1. C is FALSE and is a deliberate trap: t2 is NOT dead - it is read on line 3 as an operand of c = t1 * t2, so removing its computation would silently break the program by leaving c computed from an undefined or stale t2; dead code elimination only applies to computations whose results are provably never used along any path, and checking that requires actually tracing uses, not assuming a variable is unused. D is TRUE as a carefully qualified statement: constant folding specifically refers to evaluating an expression made entirely of compile-time-known constants during compilation rather than at runtime; since the question does not establish a and b as constants (they are treated as ordinary variables whose values are not known until runtime), constant folding simply does not apply to line 1 as given, and the option correctly states this conditional scope rather than overclaiming."
},
{
  id: 'compiler-optimization-h2',
  q: 'Consider the loop:\nfor (i = 0; i < n; i++) {\n  x = a * b;\n  arr[i] = x + i;\n}\nAssume a and b are never modified inside the loop body. Which of the following are VALID observations? (Select ALL that apply)',
  options: [
    "x = a * b is loop-invariant and can be hoisted above the loop, computing it just once instead of on every iteration.",
    "arr[i] = x + i cannot be hoisted out of the loop, because i changes on every iteration.",
    "Strength reduction can replace the repeated address computation for arr[i] (typically base + i * elementSize) with an incrementally updated pointer that is advanced by elementSize each iteration, avoiding a multiplication every time.",
    "Since x is computed identically on every iteration, the correct optimization to apply here is dead code elimination, not loop-invariant code motion."
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: because a and b never change inside the loop, a*b evaluates to the same value on every pass, making it the standard textbook case for loop-invariant code motion - hoist the single computation into a preheader block executed once before the loop begins. B is TRUE: i is precisely the induction variable that changes every iteration, so an expression depending on it (x + i) cannot be treated as loop-invariant and must remain inside the loop body, recomputed each time i's new value is available. C is TRUE: this is the classic induction-variable strength-reduction optimization applied to array indexing inside loops - instead of recomputing base + i*elementSize (a multiplication) fresh on every iteration, the compiler introduces a new variable that starts at 'base' and is simply incremented by 'elementSize' (an addition) each iteration, replacing a multiply with a cheaper add. D is FALSE and is a conceptual mislabeling: x is NOT dead - it is used immediately afterward on the very same iteration (arr[i] = x + i reads x), so simply deleting its computation (which is what dead code elimination would do) would break correctness; the applicable optimization is precisely loop-invariant code motion, which computes x once and reuses that single stored value across iterations, rather than eliminating the computation of x altogether."
},
{
  id: 'compiler-optimization-h3',
  q: 'Consider the following control-flow graph with a loop:\nB1 (entry): a = 1; b = 2;\nB2 (loop header): if (a < 10) goto B3 else goto B4\nB3: c = a + b; a = a + 1; goto B2\nB4 (exit): print(c)\nUsing backward, iterative live-variable analysis (computed to a fixed point over the loop), which of the following are TRUE? (Select ALL that apply)',
  options: [
    "OUT(B2) = { a, b, c }",
    "IN(B3) = { a, b }",
    "b is a member of OUT(B3)",
    "c is a member of IN(B3)"
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "Set use(B3) = {a,b} (both a and b are read by c=a+b before B3 redefines a) and def(B3) = {a,c}; use(B2) = {a} (the condition reads a) and def(B2) = {}; use(B4) = {c}, def(B4) = {}. Applying the standard equations IN(B) = use(B) union (OUT(B) minus def(B)) and OUT(B) = union of IN(successors), iterated to a fixed point (needed because of the B3-to-B2 back edge): IN(B4) = {c}. OUT(B3) = IN(B2) (its only successor). OUT(B2) = IN(B3) union IN(B4). Iterating: first pass gives IN(B3) = {a,b} union (OUT(B3) - {a,c}); starting OUT(B3) = {} gives IN(B3) = {a,b}, then OUT(B2) = {a,b} union {c} = {a,b,c}, then IN(B2) = {a} union {a,b,c} = {a,b,c}; second pass: OUT(B3) = IN(B2) = {a,b,c}, so IN(B3) = {a,b} union ({a,b,c} - {a,c}) = {a,b} union {b} = {a,b} - unchanged, so the fixed point has converged. This confirms OUT(B2) = {a,b,c} (statement A, TRUE), IN(B3) = {a,b} (statement B, TRUE), and since OUT(B3) = IN(B2) = {a,b,c}, b IS a member of OUT(B3) (statement C, TRUE). Statement D is FALSE: c is explicitly REMOVED from IN(B3) precisely because B3 itself DEFINES c (via def(B3) containing c) before any use of the incoming c value could matter - the live-variable equation subtracts def(B) from OUT(B) before adding use(B), so a variable that is always overwritten before being read within a block never propagates backward into that block's IN set, regardless of whether it is live on exit."
},
{
  id: 'compiler-optimization-h4',
  q: 'Using the same control-flow graph as above (B1: a=1;b=2; B2 loop header: if(a<10) goto B3 else goto B4; B3: c=a+b; a=a+1; goto B2; B4: print(c)), compute IN(B1) via iterative live-variable analysis run to a fixed point. How many variables are in IN(B1)? Enter your numerical answer.',
  options: [],
  answer: 1,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "From the fixed-point computation (see the companion question on this same CFG), OUT(B2) = {a,b,c}, so OUT(B1) = IN(B2) = {a,b,c} (B1's only successor is B2). Since use(B1) = {} (B1 only performs assignments, reading no variables) and def(B1) = {a,b} (both a and b are assigned in B1), IN(B1) = use(B1) union (OUT(B1) - def(B1)) = {} union ({a,b,c} - {a,b}) = {c}. So IN(B1) contains exactly one variable, c. This result, while it may look surprising at first (c is 'live' before the program has even started), is a completely faithful and correct output of the dataflow equations applied to this exact CFG: it reflects the fact that along the path B1 -> B2 -> B4 (loop condition false immediately, so B3 - the only place that ever defines c - never executes), the print(c) statement in B4 would read c without it ever having been assigned anywhere on that path, so an analyzer correctly reports c as 'live on entry' to B1, flagging a genuine potential use-before-definition hazard that a real compiler's live-variable analysis is specifically designed to surface (this is exactly the kind of insight this analysis is used for in practice: catching possibly-uninitialized variable warnings), independent of whether the source program's author intended a bug."
},
{
  id: 'compiler-optimization-h5',
  q: 'Consider the code fragment (p and q are pointers):\n1: x = *p;\n2: y = x + 1;\n3: *q = 5;\n4: z = *p;\nWhich of the following optimizations are VALID? (Select ALL that apply)',
  options: [
    "If it is known (via alias analysis) that p and q never point to the same location, line 4 (z = *p) can be safely replaced with z = x, reusing the value loaded at line 1.",
    "Even without any aliasing information, the compiler can always safely replace z = *p at line 4 with z = x.",
    "Common subexpression elimination is, in general, unsafe to apply across an intervening call to a function whose side effects are unknown to the compiler, unless the compiler can prove the function does not modify any memory the expression depends on.",
    "Dead code elimination can always remove line 3 (*q = 5) on the grounds that the variable q itself is never read again after that line."
  ],
  answers: [0, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: this is precisely why alias analysis matters for optimization - once the compiler has PROVEN p and q cannot alias, the write through q on line 3 is guaranteed not to affect the memory p points to, so *p's value at line 4 is guaranteed identical to its value at line 1, making the reuse of x fully safe. B is FALSE: without that aliasing guarantee, this optimization is UNSAFE in general - if p and q could point to the same location, then *q = 5 on line 3 would change the value *p refers to, so blindly reusing the stale value x at line 4 would silently compute the wrong result; this is exactly the classic pointer-aliasing correctness hazard that compilers must be conservative about absent proof otherwise. C is TRUE: an opaque function call with unknown effects could, for all the compiler knows, modify global state or memory that the 'same' expression's operands depend on, so re-executing after such a call may legitimately produce a different value; common subexpression elimination is therefore correctly restricted to spans of code where the compiler can prove no relevant state has changed, treating unanalyzed calls conservatively as potential barriers. D is FALSE: a store THROUGH a pointer (*q = 5) writes to whatever memory location q currently refers to, which may well be observed elsewhere in the program (through p, through a global, through the caller after this function returns, and so on) even though the pointer VARIABLE q itself is never read again by name - dead code elimination cannot, in general, remove a memory write just because the pointer holding the address is not subsequently referenced, since the write's observable effect lives in memory, not in q."
},
{
  id: 'compiler-optimization-h6',
  q: 'Which of the following algebraic-simplification-based optimizations are VALID in general (i.e., correct for all inputs of the stated numeric type, including any special values)? (Select ALL that apply)',
  options: [
    "x = y * 1 (integer multiplication) can always be safely simplified to x = y.",
    "x = y * 0 can always be safely replaced with x = 0, for any numeric type, including IEEE 754 floating point.",
    "x = y - y can always be safely replaced with x = 0, for any numeric type, including IEEE 754 floating point.",
    "x = 2 * y (integer multiplication) can be strength-reduced to x = y + y, or equivalently x = y << 1."
  ],
  answers: [0, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: for integer arithmetic, multiplying by 1 is always exactly the identity operation with no exceptions or special cases, so this simplification is always safe. B is FALSE for the general case stated (which explicitly includes IEEE 754 floating point): under IEEE 754 rules, if y is NaN (Not-a-Number), then y * 0 evaluates to NaN, not 0 (any arithmetic operation involving NaN propagates NaN); and if y is positive or negative Infinity, Infinity * 0 is defined to be NaN as well, not 0 - so 'x = y*0 can always be replaced with x = 0' is simply false once NaN or Infinity operands are possible, which is exactly why real compilers do NOT apply this simplification unconditionally to floating-point code unless they can prove y is a normal finite value (or the language/flags explicitly permit ignoring NaN semantics, e.g. with fast-math options). C is FALSE for the identical reason: under IEEE 754, NaN - NaN evaluates to NaN, not 0 (since NaN is never considered equal to, or cancels with, anything including itself), so 'y - y is always 0' fails whenever y could be NaN, making this simplification unsafe for floating point in general, even though it is perfectly safe for plain integers. D is TRUE: multiplying an integer by the small constant 2 is a standard, always-correct strength reduction to either an addition (y+y) or a single left-shift (y<<1), both typically cheaper than a general multiply instruction, and integers have no NaN-like special values to worry about, so this simplification carries no such caveat."
},
{
  id: 'compiler-optimization-h7',
  q: 'How many of the following 5 statements about compiler optimizations are TRUE?\n1. Loop-invariant code motion is always semantically safe to apply with no preconditions whatsoever.\n2. Common subexpression elimination requires that no assignment to any operand of the expression occurs between the two occurrences being merged.\n3. Dead code elimination can remove an assignment to a variable that is never subsequently used and has no other observable side effect.\n4. Constant propagation followed by constant folding can expose further dead-code-elimination opportunities that were not visible beforehand.\n5. Strength reduction always decreases the asymptotic (big-O) time complexity of the program it is applied to.\nEnter your numerical answer.',
  options: [],
  answer: 3,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Statement 1 is FALSE: hoisting a loop-invariant computation above the loop is unsafe without precondition if the loop might execute zero times and the computation could raise an exception, trap, or otherwise have an observable effect that would not occur in the original zero-iteration execution (for example, hoisting a division that might divide by zero, when the original loop body guarding it would never actually have executed) - real compilers guard such hoists with a check, or restrict hoisting to provably-safe computations. Statement 2 is TRUE: this is precisely the correctness precondition for common subexpression elimination - if any operand were reassigned between the two occurrences, the second occurrence might compute a genuinely different value, so reusing the first result would be incorrect; the whole optimization hinges on proving no such intervening assignment exists. Statement 3 is TRUE: this is exactly the standard, textbook correctness condition for dead code elimination - a computation whose result is never used again and which has no other externally visible effect (no I/O, no volatile memory access, no exception it could raise that matters) can be removed with no change in observable program behavior. Statement 4 is TRUE: this is a well-known synergy between optimization passes - once a variable's value is known to be a specific constant everywhere it is used (constant propagation) and expressions involving only constants are pre-evaluated (constant folding), branches or computations that turn out to be provably unreachable or unused become visible and can then be eliminated by a subsequent dead-code-elimination pass, which is exactly why compilers iterate these passes together. Statement 5 is FALSE: strength reduction (such as replacing a multiply with repeated addition inside a loop, or a multiply with a shift) typically reduces the constant-factor COST per operation, not the algorithm's fundamental asymptotic complexity class - a loop that was O(n) before strength reduction is generally still O(n) afterward, just with cheaper per-iteration instructions. Counting the true statements: 2, 3, and 4 are true, giving a total of 3."
}
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-sdt';}).questions.push(
{
  id: 'compiler-sdt-h1',
  q: "Using the synthesized-attribute SDD E -> E1 + T {E.val=E1.val+T.val} | T {E.val=T.val}; T -> T1 * F {T.val=T1.val*F.val} | F {T.val=F.val}; F -> ( E ) {F.val=E.val} | digit {F.val=digit.lexval}, evaluate E.val for the nested input 2*(3+4*5). Enter your numerical answer.",
  options: [],
  answer: 46,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Evaluate bottom-up following the SDD's synthesized-attribute rules, respecting the grammar's built-in precedence (T handles multiplication tightly, E handles addition loosely) and the parenthesized nesting. Innermost first: inside the parentheses, 4*5 is parsed as a T (T1.val=4, F.val=5, so T.val=4*5=20); this T combines with 3 at the E level inside the parentheses (E1.val=3, T.val=20, so E.val=3+20=23), and F -> (E) copies this up as F.val=23. At the outer level, T -> T1 * F combines T1.val=2 (from the leading digit 2, via F->digit->T->F chain) with F.val=23 from the parenthesized group, giving T.val=2*23=46. Since this T is the only term at the top E level (no outer + present), E.val=T.val=46. This exercise specifically tests SDT evaluation on NESTED input: the F -> (E) {F.val=E.val} rule is what lets an inner, fully-evaluated E.val 'escape' the parenthesis and re-enter the outer expression's evaluation as an ordinary factor value, and correctly tracking which E/T/F level you are inside at each point in the nested parse tree is the main source of error in this kind of problem - answer 46."
},
{
  id: 'compiler-sdt-h2',
  q: "Consider the classic declaration SDD: D -> T L {L.in = T.type} ; T -> int {T.type=integer} | float {T.type=float} ; L -> L1 , id {L1.in=L.in; addtype(id.entry, L.in)} | id {addtype(id.entry, L.in)}. Which of the following statements about this SDD are TRUE? (Select ALL that apply)",
  options: [
    "L.in is an inherited attribute, since its value comes from context outside the L-production itself (ultimately from T.type) and is passed DOWN into L's own children.",
    "T.type is a synthesized attribute, since it is computed purely from T's own production (T -> int or T -> float) without depending on anything outside T.",
    "This SDD, as given, is S-attributed (i.e., every attribute used is synthesized, with no inherited attributes at all).",
    "This SDD is L-attributed: every inherited attribute (here, L.in for the recursive L1) depends only on attributes of the parent D or on attributes of symbols strictly to the LEFT of it in the same production, consistent with a standard left-to-right, depth-first evaluation order."
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: L.in is set once, at the top, from D's rule L.in = T.type, and then propagated DOWNWARD through the recursive chain of L's (each L1.in is copied from its parent L.in) - this top-down flow of information from an enclosing context into a nonterminal's own attribute is exactly the definition of an inherited attribute. B is TRUE: T.type is fixed entirely by which alternative production of T is used (int or float) and needs no information from T's surroundings, making it a straightforward synthesized attribute. C is FALSE: an SDD is S-attributed only if it uses EXCLUSIVELY synthesized attributes everywhere, but this SDD explicitly uses the inherited attribute L.in (identified correctly in option A), so it cannot be S-attributed - it is a different, broader category. D is TRUE: this SDD is L-attributed (a strictly larger class than S-attributed) because its one inherited attribute, L1.in, is defined purely in terms of L.in, an attribute of its own PARENT in the same production (L -> L1, id), which is allowed under the L-attributed rule (inherited attributes may depend on the parent's attributes or on siblings strictly to the left, never on siblings to the right or on later context) - this dependency shape is exactly why such declaration-list SDDs can be evaluated in a single left-to-right, depth-first pass during ordinary top-down (or suitably adapted bottom-up) parsing, without needing to build and revisit a full parse tree multiple times."
},
{
  id: 'compiler-sdt-h3',
  q: 'Which of the following SDT evaluation results are computed CORRECTLY? (Select ALL that apply)',
  options: [
    "Using the right-associative grammar E -> F ^ E {E.val=F.val^E.val} | F {E.val=F.val}; F -> ( E ) {F.val=E.val} | digit, evaluating the nested input 2^(3^2) gives E.val = 64, as if the expression were left-associative and computed as (2^3)^2.",
    "Using List -> List1 Bit {List.val=2*List1.val+Bit.val} | Bit {List.val=Bit.val}; Bit -> 0 {Bit.val=0} | 1 {Bit.val=1}, evaluating the binary input 1011 gives List.val = 11.",
    "Using E -> E1 + T {E.val=E1.val+T.val} | T; T -> T1 * F {T.val=T1.val*F.val} | F; F -> ( E ) {F.val=E.val} | digit, evaluating (2+3)*(4+(5*6)) gives E.val = 170.",
    "Using the same grammar as in the previous option, evaluating (2+3)*(4+(5*6)) instead gives E.val = 145, from a naive left-to-right evaluation that ignores the grammar's built-in operator precedence."
  ],
  answers: [1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is FALSE: the grammar E -> F^E|F is explicitly RIGHT-associative (the recursive E sits on the right of the ^), so 2^(3^2) must be evaluated with the innermost/rightmost exponentiation first, exactly matching the parenthesization already given: 3^2=9, then 2^9=512 - the claimed value of 64 corresponds instead to the WRONG, left-associative reading (2^3)^2=8^2=64, which this particular grammar's synthesized-attribute rule does not produce, since E.val=F.val^E.val always computes F's own base raised to whatever the (recursively, right-side) inner E evaluates to first. B is TRUE: reading the binary digits of 1011 via the doubling-and-adding synthesized rule gives, digit by digit from left to right, running value 1, then 1*2+0=2, then 2*2+1=5, then 5*2+1=11 - matching the direct interpretation of binary 1011 as the decimal value 11. C is TRUE: evaluate the innermost group first (5*6=30), then 4+30=34; separately, 2+3=5; finally the outer multiplication gives 5*34=170, correctly respecting the grammar's built-in precedence (T handles the tightly-binding multiplication, E the loosely-binding addition) regardless of the explicit parenthesization already present. D is FALSE: 145 does not correspond to any correct evaluation of this expression under this grammar's structural precedence rules or under the explicit parenthesization shown - it is simply an incorrect distractor value."
},
{
  id: 'compiler-sdt-h4',
  q: 'Which of the following statements about the evaluation order of syntax-directed definitions (SDDs) are TRUE? (Select ALL that apply)',
  options: [
    "Synthesized attributes can always be evaluated during a single bottom-up (postorder) traversal of the parse tree.",
    "In an S-attributed SDD, all semantic actions can be safely executed directly during bottom-up (LR) parsing, using a value stack running in parallel with the parsing stack, without ever constructing an explicit parse tree.",
    "L-attributed SDDs (whose inherited attributes flow strictly left-to-right) can be evaluated during ordinary top-down predictive parsing, but can NEVER be evaluated during any form of bottom-up parsing, under any circumstances.",
    "An SDD whose attribute-dependency graph (for a given parse tree) contains a genuine cycle cannot be evaluated by any fixed evaluation order at all, since no order of computing the attributes can be found that respects every dependency."
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: by definition, a synthesized attribute at any node depends only on attributes of that node's own children (and possibly its own production's terminals), so computing children before parents - exactly a postorder, bottom-up traversal - always respects every dependency and correctly evaluates every synthesized attribute, for any SDD that uses only synthesized attributes. B is TRUE: this is precisely why S-attributed SDDs are so convenient for practical yacc/bison-style tools - since every action only ever needs the already-computed values sitting on top of the parsing stack (for the symbols just reduced), a parallel value stack can carry attribute values alongside the LR parser's state stack, with no need to ever materialize the parse tree as an explicit data structure in memory. C is FALSE: the claim's absolute 'NEVER, under any circumstances' overreaches - L-attributed SDDs are naturally suited to top-down (LL) parsing, but with additional engineering (such as restructuring the grammar, introducing marker/action nonterminals, or delaying certain actions until enough of the right context has been shifted), many L-attributed SDDs CAN also be implemented during bottom-up (LR-style) parsing; L-attributedness is not an exclusively top-down-only property, even though it aligns most naturally with top-down evaluation. D is TRUE: a cycle in the dependency graph means some attribute would need its own value (possibly transitively, through other attributes) to already be known before it can be computed - a fundamental contradiction that makes the SDD ill-formed and uncomputable by any evaluation order whatsoever; every valid, well-formed SDD must have an ACYCLIC dependency graph for every possible parse tree."
},
{
  id: 'compiler-sdt-h5',
  q: "Using the synthesized-attribute SDD List -> List1 , id {List.count = List1.count + 1} | id {List.count = 1}, what is List.count for the input 'a,b,c,d,e' (five identifiers)? Enter your numerical answer.",
  options: [],
  answer: 5,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "The grammar builds the identifier list left-recursively, so the parse tree nests as ((((a),b),c),d),e reading the comma-separated list from left to right, one identifier added per level of recursion. Evaluating bottom-up (innermost/leftmost first): the base case List -> id (just 'a') gives List.count = 1. Each subsequent level applies List -> List1,id {List.count = List1.count+1}, adding exactly 1 to the running count for every additional identifier appended: after adding 'b', count=2; after 'c', count=3; after 'd', count=4; after 'e', count=5. So the final synthesized List.count at the root of the parse tree correctly equals the total number of identifiers in the comma-separated list, which is 5 - matching a simple, direct count of the input tokens 'a', 'b', 'c', 'd', 'e'. This kind of counting SDD is the natural generalization of the classic declaration-list SDD used for propagating a shared type to every identifier in a list, illustrating that a purely synthesized (bottom-up, postorder-evaluable) attribute can track cumulative information (like a running count) across an arbitrarily long recursive chain just as naturally as it computes an arithmetic value."
},
{
  id: 'compiler-sdt-h6',
  q: 'For each of the following small sets of semantic rules attached to a single production X -> Y Z, which define a WELL-FORMED (acyclic, evaluable) set of attribute equations? (Select ALL that apply)',
  options: [
    "X.s = Y.s + Z.s ; Y.i = X.i ; Z.i = X.i  (assume X.i is itself supplied from outside this production, e.g. inherited from X's own parent)",
    "Y.i = Z.s ; Z.i = Y.s  (assume, as is typical, that each side's own synthesized attribute, Y.s and Z.s, in turn depends on that same side's inherited attribute, Y.i and Z.i respectively)",
    "X.s = Y.s ; Y.s = Z.s ; Z.s = (some fixed value computed independently of any other attribute in this production)",
    "X.i = Y.i ; Y.i = X.i  (with no other rule anywhere providing an independent starting value for either)"
  ],
  answers: [0, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is WELL-FORMED: assuming X.i arrives already computed from outside (X's own inherited attribute, supplied by X's parent), the dependency order is simply X.i (given) leads to Y.i and Z.i (both copied directly from X.i), which in turn allow Y.s and Z.s to be computed within their own subtrees, which finally allow X.s to be computed as their sum - a clean, acyclic top-down-then-bottom-up order exists. B is CIRCULAR and NOT well-formed: Y.i depends on Z.s, but (by the stated typical assumption) Z.s itself depends on Z.i, which in turn depends on Y.s, which itself depends on Y.i, which depends on Z.s again - chasing this chain leads directly back to where it started, with no independent starting point anywhere in the cycle, so no valid evaluation order exists; this is exactly the shape of a genuinely circular SDD. C is WELL-FORMED: this is a simple, non-circular chain of purely synthesized attributes with an independent base case (Z.s is fixed with no dependency on anything else in the production), so the order Z.s, then Y.s, then X.s cleanly resolves every dependency with no cycles anywhere. D is CIRCULAR and NOT well-formed: X.i is defined purely in terms of Y.i, and Y.i is defined purely in terms of X.i, with no independent value ever supplied for either from any other rule - neither attribute can ever be computed first, since each strictly waits on the other, a textbook minimal example of a circular (invalid) attribute definition."
},
{
  id: 'compiler-sdt-h7',
  q: 'Which of the following SDDs can be correctly evaluated using actions embedded directly during a SINGLE-PASS parse (using only a synchronized attribute-value stack, with no separate tree-traversal pass)? (Select ALL that apply)',
  options: [
    "An S-attributed SDD, where every semantic action appears at the very end of its production (purely synthesized attributes only).",
    "An SDD in which an inherited attribute of some right-hand-side symbol depends on the SYNTHESIZED attributes of symbols to its RIGHT within the same production.",
    "A truly L-attributed SDD, in which every inherited attribute of each right-hand-side symbol depends only on the inherited attribute of the left-hand side and/or the (inherited or synthesized) attributes of right-hand-side symbols strictly to its LEFT.",
    "Any SDD whatsoever, regardless of the shape of its attribute dependencies, since a parser is fundamentally just a finite automaton equipped with a stack."
  ],
  answers: [0, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: this is exactly the S-attributed case discussed earlier - since every attribute needed by an action is already fully computed and sitting on the value stack for the symbols just reduced, a single bottom-up pass with a synchronized stack suffices, with no need to look ahead or revisit earlier stack entries. B is FALSE: an inherited attribute depending on synthesized attributes of symbols to its RIGHT violates the very definition of L-attributedness (which restricts dependencies to the left context only), and such a right-ward dependency generally cannot be resolved in a single left-to-right pass, because the needed information (the synthesized attribute of a symbol not yet parsed/reduced) simply does not exist yet at the point it would be needed - handling this shape typically requires either restructuring the grammar, deferring evaluation, or making multiple passes over a materialized tree. C is TRUE: this is the textbook L-attributed condition, and it is specifically designed to be evaluable in one left-to-right, depth-first pass - an LL parser augmented with an attribute stack (or an LR parser with suitable restructuring) can compute every inherited attribute at the moment it is needed, since by definition it only ever depends on already-available left-context information. D is FALSE: this significantly overclaims - having a stack does not magically resolve arbitrary dependency shapes; SDDs whose dependencies genuinely require information from the right (as in option B) or that are otherwise not L-attributed may require full parse-tree construction and multiple traversal passes rather than a single left-to-right stack-based pass, so the blanket claim that 'any SDD whatsoever' works this way is false."
}
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-icg';}).questions.push(
{
  id: 'compiler-icg-h1',
  q: "For the expression a + a * (b - c) + (b - c) * d, construct the DAG (sharing every repeated subexpression as a single node). How many DISTINCT nodes does the DAG have in total (leaves plus interior operation nodes)? Enter your numerical answer.",
  options: [],
  answer: 9,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Build the DAG bottom-up, creating a new node only for each DISTINCT subexpression (identical operator with identical operand nodes reuses the existing node instead of duplicating it). Leaves: a, b, c, d - four distinct leaf nodes (the two textual occurrences of 'a' share the SAME leaf node, since a DAG for identifiers always shares the identifier's node). Interior nodes, built bottom-up: (1) b - c, a single subtraction node (this exact subexpression appears twice in the source text but is built only once and then reused); (2) a * (b-c), a multiplication node taking the 'a' leaf and the shared (b-c) node as its two children; (3) (b-c) * d, a second, DIFFERENT multiplication node, taking the same shared (b-c) node together with the 'd' leaf (this is a distinct node from (2), since its operands differ - one has 'a' as the other operand, the other has 'd'); (4) a + [a*(b-c)], an addition node combining the 'a' leaf with node (2); (5) [a+a*(b-c)] + [(b-c)*d], the final, top-level addition node combining node (4) with node (3). Counting: 4 leaves + 5 interior nodes = 9 distinct nodes total. The key idea being tested is that only the (b-c) subexpression is literally repeated with identical operator AND identical operands, so it alone collapses to a single shared node used by two different parents, while the two multiplication nodes, despite both involving (b-c), are NOT the same node, since their OTHER operand (a vs d) differs."
},
{
  id: 'compiler-icg-h2',
  q: 'For the expression ((a+b) * (a+b)) - (a+b), which of the following are TRUE? (Select ALL that apply)',
  options: [
    "The DAG for this expression contains exactly 5 distinct nodes: leaves a and b, one shared node for (a+b), one node for the multiplication, and one node for the subtraction.",
    "The (a+b) node is referenced (used as a child) exactly 3 times in this DAG - twice by the multiplication node (as both its left and right operand) and once by the subtraction node.",
    "If a parse TREE were built instead of a DAG for this same expression (with no sharing of repeated subexpressions), it would also require only 5 nodes total, exactly the same as the DAG, since all three occurrences of a+b use identical operands.",
    "Building this expression as a DAG rather than a tree directly enables common-subexpression elimination by construction, since every repeated computation is automatically represented as a single node that need only be evaluated once."
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: with sharing, there are exactly 2 leaves (a, b), 1 node for the shared subexpression (a+b), 1 node for the multiplication (whose two children both point to the SAME (a+b) node), and 1 node for the final subtraction (whose two children are the multiplication node and, again, the same shared (a+b) node) - a total of 5 distinct nodes. B is TRUE: counting every edge that points INTO the (a+b) node - the multiplication node uses it as both its left child AND its right child (2 edges), and the subtraction node uses it as its right child (1 more edge) - gives an in-degree of exactly 3 for that single shared node, illustrating how one DAG node can be referenced by multiple parents (and even by the same parent more than once). C is FALSE: this is exactly the property a DAG is designed to avoid - a plain parse TREE, by definition, never shares nodes, so it would build THREE separate, textually-identical (a+b) subtrees (each with its own '+' node and its own pair of a and b leaf nodes duplicated across all three), giving roughly 3*(1 plus 2) = 9 nodes just for the three additions, plus the multiplication and subtraction nodes, for around 11 total - far more than the DAG's 5, directly contradicting the claim that both representations need the same node count. D is TRUE: because a DAG automatically merges any subexpression that is textually and structurally identical into one shared node the first time it is built, any later occurrence of that same subexpression is represented purely as an extra edge pointing to the already-existing node rather than a fresh computation - this is precisely the mechanism by which common subexpression elimination naturally falls out of DAG-based intermediate code generation, with no separate optimization pass needed to discover the sharing."
},
{
  id: 'compiler-icg-h3',
  q: "Using the same DAG as constructed for a + a * (b - c) + (b - c) * d (with the shared (b-c) subexpression computed only once), what is the MINIMUM number of three-address code instructions needed to evaluate this expression? Enter your numerical answer.",
  options: [],
  answer: 5,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Since three-address code generation from a DAG emits exactly one instruction per INTERIOR (operation) node, and never re-emits an instruction for a node that has already been computed and stored in a temporary (each interior node is visited and translated only once, regardless of how many parents reference it), the minimum instruction count equals the number of interior DAG nodes, which was established as 5 in the companion DAG-node-counting question: t1 = b - c (computed once, for the shared subexpression); t2 = a * t1; t3 = t1 * d (reusing t1 rather than recomputing b-c); t4 = a + t2; t5 = t4 + t3. This 5-instruction sequence correctly reuses t1 in both the second and third instructions, exactly reflecting the DAG's single shared node for (b-c), and it computes the fully correct value of the original expression in the final temporary t5. A NAIVE, non-DAG-based (tree-based) code generator, by contrast, would emit a separate pair of instructions to recompute b-c every time it appears textually, needing 6 or more instructions instead of 5 - so this question also illustrates concretely how DAG-based generation directly reduces the minimal instruction count compared to naive generation, purely by exploiting the exact same subexpression-sharing already identified when building the DAG."
},
{
  id: 'compiler-icg-h4',
  q: 'Which of the following statements about three-address code (TAC) generation are TRUE? (Select ALL that apply)',
  options: [
    "Naive (non-DAG-based) TAC generation for an expression containing a subexpression that is textually repeated k times will generate k separate copies of the code computing that subexpression, whereas DAG-based generation produces only 1 copy, reused via a shared temporary.",
    "For an expression tree with n operator (interior) nodes and NO repeated subexpressions, exactly n three-address instructions are needed, regardless of whether tree-based or DAG-based code generation is used.",
    "Three-address code requires every instruction to have exactly three explicit addresses (operands), so a simple copy instruction such as x = y (which has only two addresses) is not considered valid three-address code.",
    "Generating TAC from a DAG (rather than from the corresponding tree) can never require MORE distinct temporaries than tree-based generation of the same expression - it can only require the same number or fewer."
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: without DAG-based sharing, a naive generator walks the expression exactly as written and emits code for every textual occurrence of a subexpression independently, so a subexpression appearing k times textually gets recomputed (and re-emitted as code) k separate times, while a DAG-aware generator computes it once into a temporary and simply reuses that temporary's name everywhere else it is needed. B is TRUE: when there is no sharing to exploit (no subexpression repeats), a DAG for such an expression is structurally identical to its parse tree (every node has exactly one parent), so both approaches necessarily emit exactly one instruction per operator node, with no difference between them in this special case. C is FALSE: despite its name, three-address code is understood to permit certain instructions with fewer than three explicit addresses as standard, common forms - a plain copy x=y (two addresses) and a unary operation like x=-y (two addresses plus an implicit operator) are both completely standard, valid TAC instruction shapes in every textbook treatment; the 'three-address' name refers to the general design principle of at most one operator per instruction (so at most three addresses are ever needed in the worst case), not a strict requirement that every single instruction use exactly three. D is TRUE: because DAG-based generation reuses an already-computed temporary for any repeated subexpression instead of recomputing it into a brand new temporary, the total number of distinct value-producing temporaries/instructions needed can only stay the same as (when there is no sharing) or decrease below (when there is sharing) the naive tree-based count - sharing can never force MORE temporaries to be introduced than the naive approach would have used."
},
{
  id: 'compiler-icg-h5',
  q: "Consider the expression -(a+b) * (a+b) + c, where the (a+b) subexpression is shared as a single DAG node and reused by both the unary-minus node and the multiplication node. Which of the following are TRUE? (Select ALL that apply)",
  options: [
    "The DAG for this expression has exactly 7 distinct nodes in total: 3 leaves (a, b, c) plus 4 interior nodes (the shared (a+b) node, the unary-minus node, the multiplication node, and the final addition node).",
    "The minimum number of three-address instructions needed to evaluate this expression is 4, one per interior DAG node: t1=a+b; t2=-t1; t3=t2*t1; t4=t3+c.",
    "The (a+b) node has an in-degree of 2 in this DAG, since it is referenced as a child by both the unary-minus node and the multiplication node.",
    "This expression cannot actually benefit from DAG-based sharing, because the two occurrences of (a+b) sit under different surrounding operators (one under unary minus, one under multiplication), so they are not truly 'the same' subexpression and cannot share a single node."
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: leaves a, b, c give 3 nodes; interior nodes are the shared (a+b) node (1), the unary minus applied to it (1), the multiplication of the unary-minus result with the SAME (a+b) node (1), and the final addition with c (1) - that is 4 interior nodes, for 7 total. B is TRUE: since there are exactly 4 interior nodes, DAG-based TAC generation emits exactly 4 instructions, one per interior node, correctly reusing t1 (the value of a+b) as an operand in the third instruction rather than recomputing a+b a second time. C is TRUE: counting edges into the (a+b) node specifically - the unary-minus node uses it as its one child (1 edge), and the multiplication node uses it as its second operand (1 more edge) - gives an in-degree of exactly 2, one less than the previous question's example only because here neither individual parent uses it TWICE. D is FALSE and is an important conceptual trap: DAG sharing is determined entirely by whether a subexpression is structurally identical in itself (same operator, same operands) - it does NOT matter what operator or context sits ABOVE that subexpression afterward; (a+b) is exactly the same subexpression both times regardless of whether its result subsequently feeds into a unary minus or into a multiplication, so it is fully eligible for, and does in fact receive, sharing as a single DAG node with two different parents of different kinds."
},
{
  id: 'compiler-icg-h6',
  q: 'Using the Sethi-Ullman labeling algorithm (label(leaf)=1; label(node)=left.label+1 if left.label equals right.label, else max(left.label,right.label)) to determine the minimum number of registers needed to evaluate an expression tree with no repeated subexpressions and no spilling, which of the following are TRUE? (Select ALL that apply)',
  options: [
    "For the tree (a+b)*(c+d), the Sethi-Ullman label of the root (i.e., the minimum registers needed) is 3.",
    "For the tree (a+b)+c, the Sethi-Ullman label of the root is 2.",
    "For a fully left-skewed chain a+b+c+d+e (parsed left-associatively as ((((a+b)+c)+d)+e), the register requirement GROWS without bound as more terms are appended, eventually needing as many registers as there are terms.",
    "For expression trees with no shared subexpressions, the Sethi-Ullman algorithm is known to produce code using the theoretically minimum possible number of registers, assuming unlimited spill-to-memory is allowed whenever more registers are needed than are physically available."
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: leaves a,b,c,d each get label 1; the left subtree (a+b) has two equal-label-1 children, so its label is 1+1=2, and by symmetry (c+d) also gets label 2; the root's two children now both have label 2 (equal), so the root's label is 2+1=3 - three registers are needed. B is TRUE: leaves a,b,c each get label 1; the inner (a+b) has two equal-label-1 children, giving it label 2; at the root, the left child (a+b) has label 2 while the right child c has label 1 - since these are UNEQUAL, the root's label is simply max(2,1)=2, not 2+1. C is FALSE and is the most instructive claim here: applying the same unequal-labels rule repeatedly, a left-skewed chain of additions keeps the register requirement PERMANENTLY capped at 2, no matter how many terms are appended - each successive '+' combines a left subtree of label 2 with a fresh leaf of label 1, and since these labels are always unequal, the result is always max(2,1)=2 forever, never growing; this reflects the general principle that evaluating the heavier (higher-label) subtree FIRST and holding its result in one register while sequentially folding in cheap single-leaf terms with a second register is always sufficient for a skewed chain. D is TRUE: this is the well-established optimality guarantee of the Sethi-Ullman algorithm for ordinary expression trees (no common-subexpression sharing) - by always evaluating the higher-label (more register-hungry) subtree of each node first and freeing its result's register only after combining with the other operand, it provably achieves the true minimum register count for straight-line evaluation of any such tree, spilling to memory only when a subtree's own inherent label exceeds the number of physically available registers."
},
{
  id: 'compiler-icg-h7',
  q: 'For the expression (a*b) + (a*b) - (a*b) (the identical product a*b appearing three times), built as a DAG with the a*b subexpression shared as a single node, which of the following are TRUE? (Select ALL that apply)',
  options: [
    "The DAG has exactly 5 distinct nodes in total: 2 leaves (a, b) plus 3 interior nodes (the shared multiplication, the addition, and the subtraction).",
    "Minimal three-address code generated from this DAG requires exactly 3 instructions: t1 = a*b; t2 = t1+t1; t3 = t2-t1.",
    "Naive, tree-based (non-shared) TAC generation for this same expression would also require only 3 instructions, since all three occurrences use the same operator (multiplication) on the same operands.",
    "In this DAG, the shared a*b node has an in-degree (number of incoming references from parent nodes) of exactly 3."
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: leaves a and b give 2 nodes; the single shared a*b node is 1 interior node (built once and reused for all three textual occurrences); the addition node (whose both operands point to this same a*b node) is 1 more; the subtraction node (combining the addition's result with the SAME a*b node yet again) is 1 more - totaling 2+3=5 distinct nodes. B is TRUE: DAG-based generation emits exactly one instruction per interior node - t1=a*b computes the shared product once, t2=t1+t1 reuses t1 for both operands of the addition, and t3=t2-t1 reuses t1 a third time for the subtraction - correctly evaluating the expression in exactly 3 instructions. C is FALSE: without sharing, a naive tree-based generator would recompute a*b independently for EACH of its three textual occurrences (3 separate multiply instructions), then 1 addition and 1 subtraction, for 5 instructions total - not 3; only the DAG-based approach, by exploiting the identical repeated subexpression, achieves the smaller count of 3. D is TRUE: count every edge pointing into the shared a*b node - the addition node references it twice (as both its left AND right operand, since it is literally (a*b)+(a*b)), contributing 2 edges, and the subtraction node references it once more (as its right operand), contributing 1 more edge - for a total in-degree of 2+1=3, illustrating that a single DAG node can accumulate in-degree from being reused multiple times even within a single parent as well as across different parents."
}
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-runtime';}).questions.push(
{
  id: 'compiler-runtime-h1',
  q: 'Consider the following program:\nint x = 1;\nvoid f() { print(x); }\nvoid g() { int x = 2; f(); }\nvoid main() { int x = 3; g(); }\nmain() calls g(), which calls f(). Which of the following are TRUE? (Select ALL that apply)',
  options: [
    "Under static (lexical) scoping, f() prints 1.",
    "Under dynamic scoping, f() prints 2.",
    "Under dynamic scoping, f() prints 3, because main is the ultimate top-level caller in the call chain.",
    "Static scoping resolves a variable's binding based on WHERE the referencing function is textually/lexically DEFINED in the source, while dynamic scoping resolves it based on WHO is CALLING at runtime (the current call chain)."
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: under static scoping, f's free variable x is resolved by looking at where f is textually DEFINED - at the top level, alongside the global x=1 - completely independent of who happens to call f or what local x variables exist in the caller's scope; so f() always prints 1, no matter whether it is called from g, from main, or anywhere else. B is TRUE: under dynamic scoping, resolving x inside f() means searching the ACTIVE CALL CHAIN at the moment f executes, from the innermost currently-running frame outward; since g() (which has its own local x=2) is the frame that directly called f(), g's x=2 is the NEAREST binding on the call stack, so f() prints 2. C is FALSE and is a common misconception about dynamic scoping: dynamic scoping does not simply jump to the OUTERMOST or 'original' caller - it always uses the NEAREST (innermost) enclosing call frame that provides a binding for the variable being looked up; since g() is closer to f() on the call stack than main() is, g's x=2 wins over main's x=3, so f() does NOT print 3 under dynamic scoping (it would only print 3 if g() itself had no local x of its own, forcing the search to continue further out to main's frame). D is TRUE: this is exactly the correct, precise conceptual distinction between the two scoping disciplines - static scoping is a purely textual/compile-time notion tied to the program's written structure, while dynamic scoping is a purely runtime notion tied to the sequence of actual function calls in effect at the moment of the reference."
},
{
  id: 'compiler-runtime-h2',
  q: 'Consider the following pseudocode using proper lexical closures:\nfunction makeCounter() {\n  var n = 0;\n  function increment() { n = n + 1; return n; }\n  return increment;\n}\nvar c1 = makeCounter();\nvar c2 = makeCounter();\nprint(c1()); // prints 1\nprint(c1()); // prints 2\nWhat does c2() print, called for the first time here? Enter the numerical value.',
  options: [],
  answer: 1,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Each SEPARATE call to makeCounter() creates a brand-new, independent activation of its body, including a fresh local variable n initialized to 0, and returns a closure (the inner increment function) that captures a reference to THAT SPECIFIC activation's environment - not to makeCounter's code in the abstract, but to the exact instance of n created during that one particular call. Since c1 and c2 come from two SEPARATE calls to makeCounter(), they close over two entirely independent copies of n, each starting at 0 and mutated only by calls through that same closure. Calling c1() twice increments c1's own private n from 0 to 1 (printing 1) and then from 1 to 2 (printing 2), exactly as shown - but this has absolutely no effect on c2's completely separate n, which is still sitting at its own untouched initial value of 0 (from c2's own, distinct call to makeCounter()). So the first call to c2() increments c2's private n from 0 to 1 and returns/prints 1, completely independent of whatever c1 has done. This is the defining behavior of proper closures under static scoping: each closure captures its own defining ENVIRONMENT INSTANCE, not a single shared, global copy of the variable."
},
{
  id: 'compiler-runtime-h3',
  q: 'Continuing the same counters example (c1 and c2 are independent closures from two separate calls to makeCounter(), each with its own private n), which of the following are TRUE? (Select ALL that apply)',
  options: [
    "Calling c1() twice in succession returns 1 and then 2.",
    "c1 and c2 share the exact same variable n, since both closures were created by calling the exact same function, makeCounter.",
    "This independent-counters behavior fundamentally relies on the language using static scoping together with proper support for closures that capture their defining environment - it is not something dynamic scoping alone would naturally provide.",
    "If n were instead declared as a single GLOBAL variable (shared by all calls to makeCounter, rather than a fresh local each time), then the sequence c1(), c1(), c2() would print 1, 2, 3 - an accumulating shared count - instead of 1, 2, 1."
  ],
  answers: [0, 2, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE, matching the given example directly: each call through c1 mutates c1's own private n by 1 and returns the new value, so successive calls give 1 then 2. B is FALSE and is exactly the misconception this example is designed to correct: makeCounter being the SAME function does not mean every INVOCATION of it shares state - each call creates its own fresh activation record with its own independent local n, and it is that per-call instance, not the function's source code, that the returned closure remembers; c1 and c2 are closures over two different instances of n, which is precisely why they count independently. C is TRUE: this closure behavior depends on the language's evaluation model retaining access to a specific, already-returned-from function call's local environment for as long as a closure referencing it still exists - this is a hallmark of static (lexical) scoping combined with proper closures; a naive dynamic-scoping implementation would instead look up n via whatever is CURRENTLY on the call stack at the time increment() is invoked, which, once makeCounter() has already returned, would generally no longer include makeCounter's own now-popped frame at all, breaking this pattern entirely. D is TRUE: if n is a single shared global instead of a fresh per-call local, then every closure created by any call to makeCounter reads and writes the SAME underlying storage, so calls interleave on one running total regardless of which closure invokes them - c1(),c1(),c2() would then increment the single shared n from 0 to 1, 1 to 2, and 2 to 3 respectively, printing 1, 2, 3."
},
{
  id: 'compiler-runtime-h4',
  q: "Consider:\nx = 1\ndef A():\n    x = 2\n    def B():\n        print(x)\n    return B\ndef C():\n    x = 3\n    b = A()\n    b()\nC() is called (A() runs to completion and returns its inner function B, which C then stores in b and calls afterward). Which of the following are TRUE? (Select ALL that apply)",
  options: [
    "Under static (lexical) scoping, calling b() from within C prints 2, because B's free variable x resolves to A's x, fixed by where B is textually DEFINED (nested inside A).",
    "Under dynamic scoping, calling b() prints 3, because by the time b() actually executes, A's own activation record has already been popped off the call stack (A already returned), so the search for x continues up the currently ACTIVE call chain and finds C's x=3 instead.",
    "Under dynamic scoping, calling b() would print 2, the same as under static scoping, because B 'remembers' the x that was active during A's execution.",
    "This example illustrates that closures (functions returned from an enclosing scope, called later) are naturally well-defined under static scoping, but behave inconsistently - or break entirely - under pure dynamic scoping, since the enclosing activation that defined the free variable may no longer exist on the call stack by the time the returned function is actually invoked."
  ],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: under static scoping, B's free variable x is resolved purely by where B sits in the program's TEXT - nested directly inside A's definition - so it always refers to A's x (value 2), completely independent of who eventually calls the returned function or when. B is TRUE and is the crux of this example: under PURE dynamic scoping (with no closure-style environment capture), a variable reference is resolved by searching the call chain that is CURRENTLY active at the exact moment of the reference; since C() first calls A() (which runs to completion, printing nothing, and returns the function B) and A's activation record is popped off the stack once A returns, by the time C() subsequently calls b(), A's frame - and its x=2 - is simply gone from the active call chain, so the dynamic-scoping search continues outward to C's own frame, finding C's x=3 instead. C is FALSE: this conflates dynamic scoping with closures - the 'remembering' behavior described is exactly what STATIC scoping with proper closures provides (by capturing a reference to the defining environment that persists even after that function returns), but plain dynamic scoping has no such persistent memory of a since-exited call frame; it only ever looks at whichever frames are CURRENTLY on the stack, so it cannot reproduce this behavior. D is TRUE: this scenario is exactly why closures are considered a fundamentally static-scoping-oriented language feature - they rely on being able to retain access to a specific, already-returned-from lexical environment, which meshes naturally with static scoping's environment-capture model but is undefined or behaves inconsistently under a pure dynamic-scoping discipline, where the relevant activation may simply no longer exist by call time."
},
{
  id: 'compiler-runtime-h5',
  q: 'Consider:\nx = 5\ndef p(): print(x)\ndef q():\n    x = 6\n    p()\nq() is called. Under DYNAMIC scoping, what value does p() print? Enter the numerical answer.',
  options: [],
  answer: 6,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Under dynamic scoping, resolving the free variable x referenced inside p() requires searching the CURRENTLY ACTIVE call chain at the exact moment p() executes, starting from the innermost (most recently entered) frame and working outward, rather than looking at where p is textually defined. Since q() is the function that directly calls p(), and q() has already established its OWN local binding x=6 before making that call, q's frame - with x=6 - is the innermost frame on the active call stack at the moment p() runs and looks up x; p() itself defines no local x of its own, so the dynamic-scoping lookup immediately finds and uses q's x=6, printing 6. This is in direct contrast to what STATIC (lexical) scoping would do with the exact same program: since p() is textually defined at the top level (not nested inside q at all), a static-scoping resolution would instead bind p's free variable x to the top-level global x=5, completely ignoring q's local x=6 regardless of the fact that q happens to be the caller - giving a different printed value (5) under static scoping than under dynamic scoping (6) for this identical piece of code, which is exactly the kind of discrepancy that motivates careful study of the two disciplines."
},
{
  id: 'compiler-runtime-h6',
  q: 'Which of the following statements about the runtime implementation of static and dynamic scoping are TRUE? (Select ALL that apply)',
  options: [
    "Static scoping is typically implemented using access links (also called static links) stored in each activation record, each pointing to the activation record of the most recent invocation of the lexically ENCLOSING procedure.",
    "Dynamic scoping is typically implemented using dynamic links (control links) that reflect the actual CALL chain, or via a central reference table pushed and popped as procedures are called and return, rather than reflecting lexical nesting.",
    "A 'display' is a data structure used specifically to speed up ACCESS-LINK traversal (i.e., static-scope variable lookups) in deeply/statically-nested procedures, by keeping a direct array of pointers indexed by lexical nesting depth, avoiding walking a long chain of access links one hop at a time.",
    "Access links (static links) and control links (dynamic links) always point to the exact same activation record for every procedure call in every language, since a procedure's caller is always identical to its lexically enclosing procedure."
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: this is the standard mechanism for implementing static scoping at runtime - each activation record carries an access (static) link pointing to the activation record of the textually enclosing procedure's current invocation, letting a nested procedure walk outward through the LEXICAL structure (not the call history) to resolve non-local variable references. B is TRUE: dynamic scoping is instead implemented by following the CALL chain itself - typically via the control (dynamic) links that every activation record already carries for the purpose of returning control to the caller, or via a runtime central reference table (association list / deep-binding stack) that pushes a new binding for a variable name on entry to a scope defining it and pops it on exit, always reflecting who actually called whom rather than how the program is textually nested. C is TRUE: in deeply nested lexical scopes, walking the access-link chain hop by hop to reach a variable declared several levels out can be slow; a display keeps one array, indexed directly by nesting depth, holding a pointer to the correct enclosing activation record at each depth, letting any nested procedure jump straight to the right ancestor's frame in one step rather than traversing the chain - this is purely an optimization of static-link-based (static-scoping) lookups, not something used for dynamic scoping's call-chain-based search. D is FALSE: access links and control links coincide only in the special case where a procedure happens to be called directly from within its own lexically enclosing procedure; in general, a procedure (especially a globally visible utility procedure) can be CALLED from many different places that have nothing to do with where it is LEXICALLY nested, so its access link (fixed by lexical structure) and its control link (determined by the actual, possibly very different, calling location on this particular invocation) typically point to entirely different activation records."
},
{
  id: 'compiler-runtime-h7',
  q: 'Consider this pseudocode, run in a language where the loop variable is a single, shared, mutable binding across all iterations of the loop (closures capture the variable itself, by reference, not a snapshot of its value):\nfuncs = []\nfor i in range(3):\n    def f(): return i\n    funcs.append(f)\nAfter the loop, calling funcs[0](), funcs[1](), funcs[2]() in turn. Which of the following are TRUE? (Select ALL that apply)',
  options: [
    "All three calls print the SAME value, 2, corresponding to i's final value once the loop has finished.",
    "This behavior occurs because closures under static (lexical) scoping capture a live reference/link to the variable's storage location (its environment slot), not a frozen snapshot of its value at the moment the closure was created.",
    "If the loop instead created a FRESH, independent binding of i for each individual iteration (as some languages support, e.g. via a per-iteration block-scoped variable), the three functions would instead print 0, 1, 2 respectively.",
    "The difference between printing 2,2,2 (shared binding) versus 0,1,2 (fresh binding per iteration) is fundamentally a difference between DYNAMIC scoping (shared binding) and STATIC scoping (fresh binding per iteration)."
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: as stated, the loop variable i in this language is a single, shared mutable storage location reused across every iteration; all three closures created inside the loop capture a reference to that SAME location rather than its value at creation time, so by the time any of them is actually called (after the loop has fully finished and i has been left at its final value, 2), all three read the same final value and all three print 2. B is TRUE: this is exactly the correct mechanistic explanation - static (lexical) scoping with closures works by binding a free variable reference to the STORAGE LOCATION (environment slot) it refers to in the defining scope, and if that scope only ever creates one such slot for i across the whole loop, every closure captures a reference to that one slot, so later mutations of i (by the loop's own increment) are visible through every closure that captured it. C is TRUE: this is the well-known fix used by languages that provide per-iteration (rather than per-loop) variable scoping - if each pass through the loop body instead creates a brand NEW, independent binding of i (initialized to that iteration's value and never touched again), then each closure captures a DIFFERENT storage location frozen at its own iteration's value, correctly yielding 0, 1, 2 for funcs[0], funcs[1], funcs[2] respectively. D is FALSE and is an important conflation to avoid: BOTH behaviors described here (shared-binding-across-iterations and fresh-binding-per-iteration) occur entirely within STATIC (lexical) scoping - the distinction is purely about how many separate variable BINDINGS/storage locations the loop construct creates (one shared slot reused every iteration, versus one fresh slot created each iteration), not about static versus dynamic scoping at all; dynamic scoping is not involved in, and does not explain, this particular difference."
}
);

window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-lexical';}).questions.push(
{
  id: 'compiler-lexical-h1',
  q: "Using maximal munch, how many tokens does the lexical analyzer produce for the input a=b++ -c; ? Enter your numerical answer.",
  options: [],
  answer: 7,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Scan strictly left to right, at each point taking the LONGEST prefix of the remaining input that matches some valid token pattern (maximal munch). 'a' matches the identifier pattern and cannot be extended further (next char is '='), giving token 1: id(a). '=' is a single-character assignment operator, and the next character 'b' cannot extend it into any valid compound operator, giving token 2: '='. 'b' is an identifier, giving token 3: id(b). Next, '++' - the scanner greedily tries to extend past the first '+': the two characters '++' together DO form a valid compound token (the increment operator), and the character after that is a space (which cannot extend the match further), so maximal munch takes both '+' characters as one token, token 4: '++'. The following whitespace is skipped, contributing no token. Then '-' is next: the scanner checks whether it can extend '-' into '--' or '-=' by peeking at the next character, which is 'c' (a letter), so no compound operator applies, and '-' stands alone as a single minus token, token 5: '-'. 'c' is an identifier, token 6: id(c). Finally ';' is a single punctuation token, token 7: ';'. Total: a, =, b, ++, -, c, ; - exactly 7 tokens. This problem specifically tests the interaction between maximal munch (greedily combining '+' '+' into '++') and its LIMIT (refusing to also glue the following, unrelated '-' onto anything, since a lone '-' followed by a letter has no longer valid match)."
},
{
  id: 'compiler-lexical-h2',
  q: 'Which of the following claimed token counts are CORRECT? (Select ALL that apply)',
  options: [
    'Tokenizing x = "hello, world!"; // print greeting  gives exactly 4 tokens: x, =, the entire string literal, and ; (everything from // to the end of the line is a comment, contributing zero tokens).',
    'Tokenizing a>>=b<<=c; gives exactly 8 tokens, because >>= and <<= are each split into two separate tokens rather than treated as single compound operators.',
    'Tokenizing int *p=&x[10]; gives exactly 10 tokens.',
    'Tokenizing a---b; gives exactly 5 tokens: a, --, -, b, and the trailing semicolon.'
  ],
  answers: [0, 2, 3],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: x(1), =(2), the ENTIRE quoted string \"hello, world!\" as a single string-literal token regardless of the comma, space, and exclamation mark inside it (3), and ;(4) - after the semicolon, everything from // through the end of the line is a single-line comment and is discarded entirely by the scanner before any tokens are produced from it, contributing nothing. B is FALSE: by maximal munch, '>>=' is recognized as ONE single compound assignment-operator token (the longest valid match starting at that position), and likewise '<<=' is one token - so the correct count is a(1), >>=(2), b(3), <<=(4), c(5), ;(6), a total of 6 tokens, not 8; splitting these compound operators into separate pieces is exactly the mistake maximal munch is designed to prevent. C is TRUE: int(1), *(2, a standalone symbol token, since '*' followed by an identifier character does not combine into any single compound-token pattern), p(3), =(4), &(5), x(6), [(7), 10(8), ](9), ;(10) - 10 tokens total. D is TRUE: scanning a---b; left to right, 'a' is an identifier (1); at '---b', maximal munch first greedily matches the two-character decrement operator '--' (2) rather than stopping at a single '-', since '--' is a longer valid match; this leaves '-b', where the remaining single '-' cannot combine with anything further (next character is a letter), giving a lone minus token (3); then 'b' is an identifier (4); and finally ';' (5) - five tokens total, exactly matching the classic C lexer gotcha where a---b tokenizes as a, --, -, b."
},
{
  id: 'compiler-lexical-h3',
  q: "How many tokens does the lexical analyzer produce for the input if(x!=-1&&y>=0){z+=1;}// end check ? Enter your numerical answer.",
  options: [],
  answer: 17,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Scan left to right with maximal munch, remembering that the trailing // comment contributes nothing. Tokens in order: 'if' (keyword, 1), '(' (2), 'x' (identifier, 3), '!=' (a single compound not-equal-to operator, since '!' alone followed by '=' extends to the longer valid match '!=', 4), '-' (a standalone minus - it is NOT glued to the following digit '1' into a single lexeme, because unary versus binary interpretation of a minus sign is a PARSING/semantic decision, not a lexical one; the scanner simply emits '-' as an operator token whenever it sees a bare minus sign not part of a longer compound like '--' or '-=', 5), '1' (a separate number token, 6), '&&' (a single compound logical-AND token, 7), 'y' (identifier, 8), '>=' (a single compound greater-or-equal token, 9), '0' (number, 10), ')' (11), '{' (12), 'z' (identifier, 13), '+=' (a single compound compound-assignment token, 14), '1' (number, 15), ';' (16), '}' (17). After the closing brace, the trailing '// end check' is a comment and is discarded, contributing zero further tokens. Total count: 17 tokens. This problem deliberately stacks several classic traps together: a compound relational operator (!=), a bare unary-looking minus that stays a SEPARATE token from the number that follows it (never glued into a single '-1' lexeme), a compound logical operator (&&), a compound comparison (>=), a compound assignment (+=), and a trailing comment that must be correctly excluded from the count."
},
{
  id: 'compiler-lexical-h4',
  q: 'Which of the following statements about maximal munch and keyword-vs-identifier disambiguation are TRUE? (Select ALL that apply)',
  options: [
    "For the input 'inta' (no space), maximal munch combined with the 'longest match wins; prefer a keyword only on a length TIE' rule produces a single identifier token 'inta', NOT the keyword 'int' followed by a separate identifier 'a'.",
    "For the input '--a', maximal munch first matches the two-character decrement operator '--' as one token, leaving 'a' as a separate identifier token - 2 tokens total.",
    "For the input 'a---b', maximal munch tokenizes it as: a, --, -, b (4 tokens), exactly as in the classic C lexer example.",
    "For the input 'a>=b', maximal munch fails to combine '>' and '=' into a single token, since relational-comparison and assignment operator characters can never be combined into a single token in any language's lexical specification."
  ],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: maximal munch always tries to match the LONGEST possible lexeme starting at the current position first; since 'inta' (4 characters) matches the identifier pattern as a single longer lexeme, that longer match wins outright, and the 'prefer keyword over identifier' tie-breaking rule is only ever invoked when two patterns match lexemes of the EXACT SAME length (here, the keyword pattern for 'int' only matches the first 3 characters, a strictly shorter match, so it is never even in contention). B is TRUE: at the start of '--a', the scanner checks whether the single character '-' can be extended - it can, into the compound decrement operator '--' (2 characters) - so maximal munch takes both dashes as one token; the following 'a' cannot extend that match further (it is not part of any valid operator continuation), so it becomes its own separate identifier token, for 2 tokens total. C is TRUE: this is exactly the classic worked example - 'a' is matched as an identifier, then from the remaining '---b' the scanner greedily matches the longest available operator prefix, '--' (2 characters, the decrement operator), leaving '-b'; the remaining lone '-' cannot combine with the following letter 'b' into anything, so it stands alone, and 'b' is then its own identifier - giving exactly 4 tokens: a, --, -, b. D is FALSE and states a sweeping, incorrect blanket rule: combining a comparison character with '=' into a single compound token (like '>=', '<=', '==', '!=') is in fact the STANDARD, near-universal behavior in essentially every C-like lexical specification, and is precisely the sort of case maximal munch exists to handle correctly - claiming this combination 'can never' happen in any language directly contradicts standard, everyday lexical analysis practice."
},
{
  id: 'compiler-lexical-h5',
  q: "How many tokens does the lexical analyzer produce for the declaration int *p=&x[10]; ? Enter your numerical answer.",
  options: [],
  answer: 10,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Scan left to right: 'int' is a keyword token (1). '*' is a standalone punctuation/operator symbol - it cannot combine with the following identifier character 'p' into a single lexeme, since a symbol and a letter belong to entirely different, non-overlapping token pattern classes, so it forms its own token (2). 'p' is an identifier (3). '=' is a standalone assignment operator; the following character '&' cannot extend it into any valid compound operator, so it stands alone (4). '&' is likewise a standalone symbol token, not combinable with the following identifier 'x' (5). 'x' is an identifier (6). '[' is a punctuation token (7). '10' is a single number token (the two digits '1' and '0' combine into one maximal-munch numeric lexeme, not two separate single-digit tokens) (8). ']' is a punctuation token (9). ';' is a punctuation token (10). Total: int, *, p, =, &, x, [, 10, ], ; - exactly 10 tokens. The key traps here are recognizing that '*p' and '&x' are each TWO separate tokens (a symbol can never fuse with a following letter/digit lexeme under standard maximal munch, since they belong to disjoint pattern categories), while '10' is correctly kept as a SINGLE number token rather than being miscounted as two separate single-digit tokens."
},
{
  id: 'compiler-lexical-h6',
  q: 'Which of the following statements about lexical analysis are TRUE? (Select ALL that apply)',
  options: [
    "The lexer encountering the character '@' (which is not part of any valid token pattern in a typical C-like language) reports this as a LEXICAL error.",
    "The lexer encountering the input '123abc' (digits immediately followed directly by letters, no separator) will still produce tokens via maximal munch - typically matching '123' as the longest valid NUMBER pattern first, then continuing to scan 'abc' as a separate identifier token - rather than immediately declaring a lexical error simply because the two characters classes are adjacent.",
    "Detecting that a variable was used before it was declared is a job of the lexical analysis phase.",
    "Detecting an unbalanced or mismatched count of parentheses in the source code is a job of the lexical analysis phase."
  ],
  answers: [0, 1],
  marks: 2,
  difficulty: 'hard',
  type: 'concept',
  explanation: "A is TRUE: a character (or character sequence) that matches NO token pattern whatsoever in the language's lexical specification is exactly the definition of a lexical error - the scanner has no valid way to classify '@' into any token class, so it reports an error at that point rather than silently skipping or guessing. B is TRUE: maximal munch operates purely by matching the LONGEST prefix of the remaining input against ANY single valid token pattern at each step, without requiring the entire contiguous run of alphanumeric characters to form one single token; so at '123abc', the scanner matches '123' as the longest valid NUMBER-pattern prefix, emits that as one token, and then resumes scanning from 'abc', matching it as a separate IDENTIFIER token - two tokens are produced with no lexical error triggered merely by their direct adjacency in the source text (whether the language's SYNTAX or semantics later considers 'a number immediately followed by an identifier with no operator between them' to be a valid construct is a separate, later question, not a lexical-analysis concern). C is FALSE: checking whether a variable has been declared before use requires cross-referencing the symbol table against the point of use, which is a SEMANTIC analysis task, performed after parsing has built structure around the tokens - a scanner working purely via pattern matching, one lexeme at a time, has no notion of declarations or usage order at all. D is FALSE: verifying that parentheses (or other bracket-like symbols) are correctly balanced and properly nested requires unbounded counting/matching across arbitrarily long spans of the token stream, which is exactly the kind of task a finite-state, regular-pattern-based scanner cannot perform (this is precisely why parenthesis languages are not regular) - it is a SYNTAX analysis (parsing) task, handled by the context-free grammar and its stack-based recognition machinery, not by the lexer."
},
{
  id: 'compiler-lexical-h7',
  q: "How many tokens does the lexical analyzer produce for the input while(i<10)i=i+1; ? Enter your numerical answer.",
  options: [],
  answer: 12,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: "Scan left to right: 'while' is a keyword token (1). '(' is a punctuation token (2). 'i' is an identifier (3). '<' is a standalone relational operator - the following character '1' (a digit) does not extend it into any valid compound operator (there is no '<1' pattern), so it stands alone as a single '<' token (4). '10' is a single maximal-munch number token, combining both digits (5). ')' is a punctuation token (6). 'i' is an identifier (7). '=' is a standalone assignment operator, since the following character 'i' cannot extend it into any compound form (8). 'i' is an identifier (9). '+' is a standalone operator, since the following character '1' does not extend it into any compound operator like '++' or '+=' (10). '1' is a number token (11). ';' is a punctuation token (12). Total: while, (, i, <, 10, ), i, =, i, +, 1, ; - exactly 12 tokens. This example reinforces that a comparison/arithmetic operator immediately followed by a digit (as in '<10' or '+1') does NOT get glued to that digit into one combined lexeme - the operator and the following number are always two entirely separate tokens, since operator-symbol patterns and number patterns never overlap or merge under standard maximal munch."
}
);

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-lexical';});
  t.theory.deep = (t.theory.deep||'') + `

FROM ZERO: FOUNDATIONS

• Source program as characters. Before any compiler phase runs, a program is nothing but a raw sequence of characters (letters, digits, spaces, punctuation) - the lexer's entire job is to be the FIRST piece of code that imposes any structure on that raw character stream at all.
• Token, lexeme, pattern - the three-layer idea. A pattern is a rule (usually a regular expression) describing a whole CLASS of acceptable spellings, e.g. the pattern for identifiers might be "a letter followed by any number of letters/digits". A lexeme is one actual matched piece of text pulled straight from the source, e.g. the specific text "count1". A token is the abstract category label handed to the parser, e.g. ID, paired with an attribute value (often a pointer into the symbol table) that remembers which lexeme it actually was.
• Symbol table. A symbol table is simply a lookup data structure (often a hash table) mapping each identifier's spelling to information about it (its type, scope, memory location). The lexer typically inserts new identifiers into it as they are first seen.
• Maximal munch (longest match rule). When several prefixes of the remaining input could all validly form a token, the lexer always takes the LONGEST one that still matches some pattern - e.g. seeing the characters < and = in a row, it forms the single token <= rather than the token < followed separately by =.

EVERY EDGE CASE

GATE TRAP: an operator symbol immediately followed by a digit or letter that could START a different token does NOT get glued onto that following token - e.g. in i<10, the < stands alone (there is no such compound token as "<1"), while in i<=10 the <= DOES combine because <= is itself a valid, longer token pattern. Maximal munch only combines characters into ONE token when a longer matching pattern actually exists for that exact combination.
GATE TRAP: whitespace and comments are typically consumed and DISCARDED by the lexer - they generate NO tokens at all (not even a special "whitespace token" in most designs), though they do still serve as token separators (e.g. distinguishing "in t" as two tokens "in" and "t" versus "int" as one keyword token).
GATE TRAP: identifying whether a bracket/parenthesis stream is correctly balanced and nested is NOT a lexical-analysis task, even though brackets are individual tokens - checking balance requires unbounded matching across the whole token stream, which is a parsing (syntax analysis) job handled by the context-free grammar and its stack, not something a finite-state, single-token-at-a-time scanner can do.
KEY: a lexeme with LEADING zeros or unusual but still pattern-matching spelling is still one valid lexeme of its token class (e.g. "007" is still one NUM token) - the lexer does not judge semantic validity or "sensible" values, only pattern shape.
KEY: keywords are typically recognised by first matching the general identifier pattern, and then doing a SEPARATE lookup in a fixed reserved-word table to reclassify matches like "while", "if", "int" as their own specific keyword tokens rather than as generic ID tokens - this order (match as identifier pattern first, then filter) is the standard implementation technique asked about conceptually.
GATE TRAP: an unrecognised character sequence that matches NO valid pattern at all (a lexical error, e.g. a stray @ symbol where the language grammar never uses one) is reported and typically the lexer attempts error recovery by skipping characters and resuming, rather than the whole compilation immediately halting - lexical errors are usually the most localised and recoverable of all compiler error types.

WORKED EXAMPLE 1 - full token count for a complete statement

Input: if(x>=5)y=x*2;
1. 'if' - matches the reserved keyword pattern exactly (not left as generic ID since 'if' is in the keyword table) -> KEYWORD token (1).
2. '(' -> PUNCTUATION token (2).
3. 'x' -> ID token (3).
4. '>=' - maximal munch: '>' alone COULD be a token, but the next character '=' extends it into the longer valid pattern '>=', so the longer match wins -> RELOP token (4).
5. '5' -> NUM token (5).
6. ')' -> PUNCTUATION token (6).
7. 'y' -> ID token (7).
8. '=' - maximal munch check: the next character is 'x', which cannot extend '=' into any longer valid operator (there is no '=x' pattern), so '=' stands alone -> ASSIGN token (8).
9. 'x' -> ID token (9).
10. '*' - next character is '2', no compound '*2' pattern exists, so '*' stands alone -> OP token (10).
11. '2' -> NUM token (11).
12. ';' -> PUNCTUATION token (12).
Total: 12 tokens. This step-by-step "check the very next character for a longer valid pattern before finalising each token" discipline is exactly how every GATE token-counting numerical should be worked.

WORKED EXAMPLE 2 - designing a regular-expression-based scanner rule set

Task: define patterns recognising identifiers, unsigned integers, and the three operators +, ++, +=.
1. Identifier pattern: letter (letter | digit)* - one letter, followed by zero or more letters/digits. This single regular expression covers every valid identifier spelling in one rule.
2. Unsigned integer pattern: digit digit* (equivalently digit+) - one or more digits, with no separate rule needed for "how many digits" since the Kleene star/plus already covers any length.
3. Operator family +, ++, +=: because maximal munch always prefers the longest match, simply define all three as separate patterns ('+', '++', '+=') and let the scanner's tie-breaking rule (prefer longest match; if still tied, prefer the rule listed first / higher priority) pick correctly - seeing '+' followed by another '+' matches the two-character '++' pattern instead of two separate single '+' matches, because the scanner always looks ahead for a longer valid continuation before committing to the shorter token.
4. This illustrates the general design principle: each token class gets its own independent regular expression, and the lexer generator combines them all into a single big NFA/DFA (via the same union + subset construction from the Regular Languages topic) that picks, at each position, the longest lexeme matching ANY of the combined patterns.

WORKED EXAMPLE 3 - tracing keyword-vs-identifier disambiguation

Input snippet: intx = integer + 1;
1. Scan 'intx': the identifier pattern (letter, then letters/digits) matches all five characters 'i','n','t','x' greedily via maximal munch, producing the single lexeme "intx", five characters long - NOT the keyword "int" followed separately by "x", because maximal munch always grabs the longest matching identifier-pattern prefix before stopping, and "intx" as a whole matches the identifier pattern with no interruption (there's no space or symbol splitting the letters).
2. Since the matched lexeme "intx" (five characters) does NOT exactly equal the reserved word "int" (three characters) in the keyword lookup table, it is classified as a plain ID token, not a keyword - the keyword check only reclassifies an EXACT, WHOLE lexeme match, never a mere prefix or substring match.
3. Continuing: '=' (ASSIGN), 'integer' (again, checked against the keyword table as a WHOLE seven-character lexeme; assuming "integer" itself is not a listed keyword in this hypothetical language, it too is a plain ID), '+' (OP), '1' (NUM), ';' (PUNCTUATION). This example is the standard GATE trap illustrating that keyword recognition depends entirely on the FULL matched lexeme, never on merely containing a keyword as a substring or prefix.`; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-parsing';});
  t.theory.deep = (t.theory.deep||'') + `

FROM ZERO: FOUNDATIONS

• Parsing, plainly. Parsing takes the flat token stream from the lexer and figures out its GRAMMATICAL STRUCTURE according to the language's context-free grammar - the output is a parse tree (or an equivalent internal structure) showing how tokens group into expressions, statements, and larger constructs.
• Top-down vs bottom-up. A top-down parser starts at the grammar's start symbol and tries to EXPAND it, guessing which production to apply, until the expansion matches the input tokens exactly (like starting from the tree root and growing down to the leaves). A bottom-up parser starts at the actual input tokens (the leaves) and repeatedly RECOGNISES and collapses matched pieces (reduces them) upward until it reaches the start symbol at the root.
• Lookahead. Lookahead is simply how many upcoming, not-yet-consumed tokens the parser is allowed to peek at before deciding what to do next. LL(1) and LR(1) both mean "using exactly 1 token of lookahead" (the "1" in the name).
• Item (for LR parsing). An LR item is a production with a dot placed somewhere in its right-hand side, marking how much of that production has been matched so far during a bottom-up scan, e.g. A -> alpha . beta means alpha has already been recognised and beta is still expected next.
• Handle. A handle is the exact substring on the parsing stack that matches a complete production's right-hand side and is ready to be reduced back to its left-hand-side non-terminal, at exactly the right moment in a correct bottom-up parse.

EVERY EDGE CASE

GATE TRAP: an LL(1) grammar cannot have left recursion (direct or indirect) OR two alternatives sharing a common prefix (needing left factoring) - both must be eliminated first, and they are two DIFFERENT fixes for two DIFFERENT problems (see the CFL topic's worked example for both transformations side by side).
KEY: SLR(1), LALR(1), and CLR(1) [also called canonical LR(1)] are three bottom-up parsing techniques with STRICTLY increasing parsing power in that order: every SLR(1) grammar is LALR(1), and every LALR(1) grammar is CLR(1), but not conversely - there exist grammars that are LALR(1) but not SLR(1), and grammars that are CLR(1) but not LALR(1).
GATE TRAP: LALR(1) is built by MERGING CLR(1) states that have identical "core" (identical item sets ignoring lookahead sets) - this merging can occasionally introduce a NEW reduce-reduce conflict that was NOT present in the original CLR(1) table (because the merged state now combines lookahead sets from two formerly-separate states). A shift-reduce conflict, however, can never newly appear purely from this LALR merging step. So: "a conflict exists in the LALR table but not in the CLR table for the same grammar" can genuinely happen, and when it does, it is specifically a reduce-reduce conflict, not a shift-reduce one.
GATE TRAP: dangling else - the grammar stmt -> if expr then stmt | if expr then stmt else stmt | other is classically AMBIGUOUS, because on seeing "if E1 then if E2 then S1 else S2", the else could attach to EITHER the inner or the outer if. The standard disambiguating convention (and what every real parser generator does by default) is: match each else with the NEAREST unmatched then/if - this is typically enforced not by rewriting the grammar cleanly but by a parser-generator PRECEDENCE DIRECTIVE that resolves the resulting shift-reduce conflict in favour of SHIFT (shifting the else to attach it to the innermost if) rather than reducing early.
GATE TRAP: a shift-reduce conflict in an LR table is, by long-standing convention, ALWAYS resolved by preferring SHIFT (this is exactly what correctly handles dangling-else and operator-precedence situations by default) - a reduce-reduce conflict has no universal default and must be resolved by rule ordering or grammar redesign, since blindly always choosing "the first-listed rule" can silently produce a parser that accepts the wrong language.

WORKED EXAMPLE 1 - full FIRST/FOLLOW for a grammar with a nullable non-terminal, then build the LL(1) table

Grammar: S -> a A | epsilon is not used here; instead use S -> A B, A -> a | epsilon, B -> b.
1. FIRST(A) = {a, epsilon} (A can produce terminal a, or vanish to epsilon).
2. FIRST(B) = {b}.
3. FIRST(S) = (FIRST(A) minus epsilon) union FIRST(B), since A is nullable = {a, b}.
4. FOLLOW(S) = {$} (start symbol always gets end-marker).
5. FOLLOW(A) = FIRST(B) = {b} (A is immediately followed by B in the only production containing it).
6. FOLLOW(B) = FOLLOW(S) = {$} (B is at the very end of S's production, so it inherits S's own follow set).
7. LL(1) table entries: M[S, a] = S->AB, M[S,b] = S->AB (since a and b both appear in FIRST(S)); M[A,a] = A->a; M[A,b] = A->epsilon (because b is in FOLLOW(A), and A is nullable, so on seeing a FOLLOW(A) token we apply the epsilon-production); M[B,b] = B->b. No cell has two competing entries, confirming this grammar IS LL(1).

WORKED EXAMPLE 2 - full LR(0) item-set construction (canonical collection) for a tiny grammar

Grammar (augmented): S' -> S, S -> a S | b.
1. I0 = closure({S' -> .S}): adding S' -> .S forces closure to also add every production for S (since S appears right after a dot): S -> .aS, S -> .b. So I0 = {S'->.S, S->.aS, S->.b}.
2. GOTO(I0, S) = {S'->S.} - this state, call it I1, has the dot at the very end of S'->S, meaning "accept" (this is the accepting item for the augmented start production).
3. GOTO(I0, a) = closure({S->a.S}) - the dot follows a, and since a non-terminal S is right after the dot, closure re-adds S's own productions: {S->a.S, S->.aS, S->.b}. Call this I2.
4. GOTO(I0, b) = closure({S->b.}) = {S->b.} (dot at the end, a pure reduce item). Call this I3.
5. GOTO(I2, S) = {S->aS.} (dot at the end, reduce item) - call this I4. GOTO(I2, a) = I2 itself (self-loop, same closure as step 3 recomputed identically). GOTO(I2, b) = I3 (identical closure to step 4).
6. Final states: I0 (start), I1 (accept on S), I2 (after reading one a, expects another S), I3 (reduce S->b), I4 (reduce S->aS). This five-state machine is the complete LR(0) automaton, and every entry in the SLR/LALR/CLR parsing table is read directly off which state you are in and which item(s) that state contains.

WORKED EXAMPLE 3 - resolving the dangling-else shift-reduce conflict explicitly

Grammar: stmt -> if expr then stmt else stmt | if expr then stmt | other. Consider the LR state reached after parsing "if E then S" with lookahead "else" available.
1. In this state, the item if-expr-then-stmt-else-stmt-in-progress calls for a SHIFT of the else token (continuing to try to match the longer else-containing alternative).
2. Simultaneously, the item if-expr-then-stmt (the shorter, already-complete alternative) calls for a REDUCE right here, since "if expr then stmt" is itself a complete, valid stmt production body once nothing else follows it.
3. Both actions are legal in the same state with the same lookahead token else - this IS the shift-reduce conflict, occurring precisely at the else token. Standard parser generators resolve it by defaulting to SHIFT, which has the effect of extending the match to consume the else and attach it to the NEAREST enclosing if - exactly matching the universally expected dangling-else semantics, achieved without rewriting the ambiguous grammar at all, purely through this one default conflict-resolution rule.`; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-sdt';});
  t.theory.deep = (t.theory.deep||'') + `

FROM ZERO: FOUNDATIONS

• Syntax-directed definition (SDD), plainly. An SDD attaches ATTRIBUTES (extra pieces of information, like a computed value or a type) to grammar symbols, and attaches SEMANTIC RULES to each production telling how to compute one symbol's attributes from other symbols' attributes in that same production. It is a high-level specification, not tied to any particular evaluation order.
• Synthesized attribute. A synthesized attribute at a non-terminal is computed purely from the attributes of its CHILDREN in the parse tree (information flows UP the tree, from leaves toward the root) - e.g. an expression node's computed numeric value, built from its sub-expressions' values.
• Inherited attribute. An inherited attribute at a non-terminal is computed from the attributes of its PARENT and/or its SIBLINGS in the parse tree (information flows DOWN or SIDEWAYS) - e.g. passing a variable's declared type down into the specific place it is used, or passing a running left-to-right position down across sibling symbols.
• Syntax-directed translation scheme (SDT). An SDT is the same idea as an SDD but made concrete for execution: semantic actions (bits of code, written in curly braces) are embedded directly INSIDE the production bodies at specific positions, specifying exactly WHEN during parsing each action runs.
• Dependency graph. A dependency graph draws one node per attribute instance in a specific parse tree and one edge from attribute X to attribute Y whenever Y's computation rule directly needs X's value - this graph must have NO CYCLES for the attributes to be computable at all (a cycle would mean an attribute depends on itself, directly or indirectly).

EVERY EDGE CASE

GATE TRAP: S-attributed (only synthesized attributes, no inherited ones at all) SDDs can ALWAYS be evaluated during a purely bottom-up (LR) parse, attaching the semantic action at the END of each production (evaluated exactly when that production is reduced) - this is the easiest, most implementation-friendly case.
GATE TRAP: L-attributed SDDs (a broader class allowing inherited attributes, but ONLY ones that depend on attributes from the LEFT: the parent, or LEFT siblings already processed, never a RIGHT sibling not yet seen) can be evaluated during a single left-to-right depth-first tree walk, and specifically fit cleanly into predictive top-down (LL) parsing, where semantic actions can be interspersed within the production body at the position matching what information is available at that point.
GATE TRAP: NOT every SDD with inherited attributes is automatically L-attributed - an inherited attribute at a symbol that depends on a sibling appearing to its RIGHT in the same production body breaks the L-attributed restriction (that dependency would require information not yet available in a strict left-to-right pass), forcing a more general (and more complex) evaluation strategy, or a rewritten grammar/attribute scheme.
GATE TRAP: a dependency graph with a CYCLE means the SDD, as written, is simply not evaluable at all on that parse tree - no evaluation order exists that could compute every attribute, since some attribute would need its own not-yet-computed value. This is a genuine design error in the SDD, not just an inconvenience, and GATE loves drawing a small dependency graph and asking you to spot the cycle.
KEY: annotated parse tree = a parse tree with every attribute's actual COMPUTED VALUE written next to its node - the standard way GATE asks you to "evaluate" an SDD on a specific input string, working attribute-by-attribute according to the dependency graph's valid order.

WORKED EXAMPLE 1 - full synthesized-attribute evaluation for arithmetic expression grammar

Grammar with synthesized attribute val: E -> E1 + T { E.val = E1.val + T.val }, E -> T { E.val = T.val }, T -> T1 * F { T.val = T1.val * F.val }, T -> F { T.val = F.val }, F -> digit { F.val = digit.lexval }. Evaluate on input 2+3*4.
1. Parse tree bottom level: F.val = 2 (from digit lexval 2), F.val = 3, F.val = 4 - three separate F nodes for the three digit occurrences.
2. T -> F for the first F (value 2): T.val = 2. Separately, the second T is built from T1 -> F (value 3) times F (value 4) via T -> T1 * F: T.val = T1.val * F.val = 3 * 4 = 12.
3. E -> E1 + T where E1 reduces down to T -> F (value 2, so E1.val = 2 via E->T), and the second T just computed has val 12: E.val = E1.val + T.val = 2 + 12 = 14.
4. Final answer: E.val = 14 - correctly respecting operator precedence (multiplication grouped tighter than addition) purely because of how the GRAMMAR itself is structured (T handles * before E handles +), not because of any special-cased precedence logic in the semantic rules.

WORKED EXAMPLE 2 - L-attributed inherited-attribute evaluation for declarations

Grammar distributing a declared type across a list of identifiers: D -> T L, T -> int { T.type = int } | float { T.type = float }, L -> L1 , id { L1.inh = L.inh; addtype(id.entry, L.inh) } | id { addtype(id.entry, L.inh) }, with L.inh inherited from D -> T L via the rule { L.inh = T.type }. Evaluate on: float x , y , z.
1. T reduces from 'float', giving T.type = float.
2. D -> T L passes down L.inh = T.type = float to the top-level L (which spans "x , y , z").
3. That L is built as L -> L1 , id (matching ", z" at the outermost level), so L1.inh = L.inh = float is passed down to the L1 covering "x , y", and addtype(z.entry, float) records z's type immediately.
4. Recursing: L1 -> L2 , id (matching ", y"), so L2.inh = L1.inh = float, and addtype(y.entry, float) is called.
5. Finally L2 -> id (just "x"), so addtype(x.entry, float) is called using L2.inh = float. All three identifiers x, y, z get type float recorded, and note the inherited attribute flows strictly LEFTWARD/DOWNWARD (parent-to-child, same value threaded through each recursive L level) - exactly the L-attributed pattern.

WORKED EXAMPLE 3 - detecting a genuine dependency-graph cycle

Suppose (as a deliberately broken SDD) a production A -> B C carries the rules: B.inh = C.syn (B's inherited attribute needs C's synthesized attribute) and C.inh = B.syn (C's inherited attribute needs B's synthesized attribute), while additionally B.syn depends on B.inh, and C.syn depends on C.inh.
1. Draw the edges: B.inh <- C.syn, C.syn <- C.inh, C.inh <- B.syn, B.syn <- B.inh.
2. Trace the cycle: start at B.inh, follow to C.syn, follow to C.inh, follow to B.syn, follow back to B.inh - this is a complete cycle of four dependency edges returning to the starting attribute.
3. Conclusion: this SDD has NO valid evaluation order at all (every one of these four attributes transitively depends on itself), so it must be rejected/redesigned - this is exactly the kind of small four-node graph GATE draws and asks "can this SDD be evaluated on any parse tree", expecting the answer no, with a cycle identified as the reason.`; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-icg';});
  t.theory.deep = (t.theory.deep||'') + `

FROM ZERO: FOUNDATIONS

• Intermediate representation (IR), what it's actually FOR. After parsing produces a parse tree/AST, a compiler does not jump straight to machine code - it first translates into an IR: a simpler, machine-INDEPENDENT form that is easy to analyse and optimise. The point of an IR is to let ONE set of optimisation techniques work for MANY source languages and MANY target machines, instead of writing separate optimisers for every source-target pair.
• Three-address code (TAC). TAC is a common IR where every instruction has AT MOST one operator on the right-hand side and at most three addresses/operands total (e.g. t1 = t2 + t3) - complex expressions get broken into a sequence of these simple steps, each computing one elementary operation.
• Quadruple, triple. A quadruple represents one TAC instruction as four fields (operator, arg1, arg2, result) - the result gets an explicit name/temporary. A triple instead represents an instruction as three fields (operator, arg1, arg2) and refers to OTHER instructions' RESULTS by their position/index number in the triple list, rather than inventing an explicit named temporary for every intermediate result.
• DAG (directed acyclic graph) for expressions. A DAG represents an expression so that if the SAME sub-expression appears more than once, it is represented by just ONE shared node (reused), instead of duplicating the computation - this is the standard tool for local common-subexpression elimination.
• Backpatching. Backpatching is a technique for generating jump/branch instructions for control-flow constructs (if, while) BEFORE the target label/address is actually known yet - the jump instruction is emitted with its target left blank, and the blank is filled in ("patched") later once the true target position becomes known.

EVERY EDGE CASE

GATE TRAP: converting infix expressions with standard operator precedence to TAC must respect precedence and associativity EXACTLY as the grammar defines it (e.g. * before +, left-to-right for same precedence) - a numerical question asking "how many three-address statements are generated" is really testing whether you can correctly count each atomic OPERATION (not each operand or each parenthesis) in the fully precedence-resolved expression tree.
GATE TRAP: short-circuit evaluation of boolean expressions (a && b, a || b) generates control-flow jumps DURING evaluation itself, rather than computing a full true/false value first and then branching - e.g. for a && b, if a evaluates to false, the code must jump directly to the "false" outcome WITHOUT ever evaluating b at all. Counting instructions or predicting execution paths without accounting for this early-exit jump is a frequent source of wrong numerical answers.
KEY: DAG construction for an expression re-uses a node for a repeated sub-expression ONLY when that sub-expression is syntactically identical AND none of its operands have been reassigned/killed in between the two occurrences - if an intermediate variable gets overwritten by an assignment before its second use, the DAG must NOT merge the two occurrences (this is the classic "DAG vs available expressions with intervening assignment" trap).
GATE TRAP: quadruples and triples differ specifically in how they REFER to intermediate results - quadruples name every temporary explicitly (position-independent, so REORDERING quadruples for optimisation is safe), while triples refer to earlier instructions BY POSITION NUMBER, meaning reordering or deleting a triple can silently invalidate every later triple's references to it (this fragility-under-reordering distinction is a common conceptual true/false target).
KEY: for backpatching, three special lists are the standard tool - truelist (jump instructions still needing the "when true, go here" target filled in), falselist (same for the false case), and nextlist (unconditional jumps to "whatever comes right after this statement"); the whole technique is exactly: emit jumps with blanks now, remember their instruction numbers in these lists, and patch in the real target address once it becomes known (e.g. once the loop-body's start label or the statement-after-the-if's position is reached).

WORKED EXAMPLE 1 - full three-address code and full DAG for a single expression

Expression: (a + b) * (a + b) - c
1. Three-address code, respecting precedence (parenthesised addition first, then multiplication, then subtraction): t1 = a + b; t2 = a + b; t3 = t1 * t2; t4 = t3 - c. Naively this is FOUR instructions if generated straight from a tree with no sharing.
2. Now build the DAG: node1 = leaf 'a', node2 = leaf 'b', node3 = '+' with children node1,node2 (representing a+b) - crucially, since (a+b) appears TWICE in the source expression and neither a nor b is reassigned in between, BOTH occurrences point to the exact same node3, rather than creating a duplicate node.
3. node4 = '*' with children node3, node3 (both operands of the multiply point to the SAME shared addition node) - representing (a+b)*(a+b) using only one underlying addition computation.
4. node5 = '-' with children node4 (the multiply result) and leaf 'c' - representing the final subtraction.
5. DAG-optimised TAC, reading off the DAG (only 3 instructions now, one per DISTINCT node, since the DAG has only one addition node not two): t1 = a + b; t2 = t1 * t1; t3 = t2 - c. This is the concrete mechanism of common-subexpression elimination: the DAG naturally exposes and eliminates the redundant second computation of a+b.

WORKED EXAMPLE 2 - backpatching for an if-else statement

Statement: if (a < b) then S1 else S2, using backpatching with truelist/falselist/nextlist.
1. Generate code for the condition a < b as: code_cond; if a < b goto _ (target blank, add this instruction's number to truelist); goto _ (target blank, add to falselist).
2. Emit the label for S1's code (this is exactly the address to backpatch into every entry of truelist - patch truelist now to point here). Generate S1's code, then emit an unconditional goto _ with its target blank, add this to nextlist (this jump exists to skip over S2 once S1 finishes).
3. Emit the label for S2's code (this is exactly the address to backpatch into every entry of falselist - patch falselist now to point here). Generate S2's code.
4. Emit the label for the statement immediately AFTER the whole if-else (this is exactly the address to backpatch into nextlist, so that S1's trailing goto correctly skips past S2 and lands right after the entire construct). All blanks are now filled with real, correct addresses - and crucially, ALL of this could be emitted in a SINGLE left-to-right pass, never needing to go back and re-scan the source, precisely because the actual patching (writing the real number into the blank field) happens after the target position is known, not the code generation position itself.

WORKED EXAMPLE 3 - counting TAC statements for a boolean expression with short-circuiting

Expression used as a condition: if (a < b && c > d) goto L.
1. Because && short-circuits, the code must be: if a < b goto L2 (fall through/continue evaluating on true) else goto Lfalse (skip evaluating the second condition entirely) - this is already different from unconditionally computing both comparisons first.
2. L2: if c > d goto L else goto Lfalse - the second comparison is only evaluated at all when the first one succeeded, and its own result decides the final jump directly.
3. Total distinct conditional-jump instructions: exactly 2 (one per comparison), NOT computing two separate boolean temporary values and then a THIRD instruction ANDing them together - that "compute both fully, then combine" approach is what a naive non-short-circuit translation would do, and mistakenly assuming that style is the classic error this topic tests. Short-circuit code is generally MORE instructions in the worst case (multiple jump targets) but potentially FEWER actual operations executed at runtime (skips evaluating the second operand when the first already determines the outcome).`; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-runtime';});
  t.theory.deep = (t.theory.deep||'') + `

FROM ZERO: FOUNDATIONS

• Activation record (stack frame), plainly. Every time a procedure/function is CALLED (not just defined), the runtime system allocates a fresh block of memory called an activation record to hold that specific call's local variables, parameters, return address, and bookkeeping links - a recursive function running 5 levels deep has 5 SEPARATE activation records alive simultaneously, one per active call.
• Static scoping vs. dynamic scoping. Static (lexical) scoping means a variable reference is resolved by looking at WHERE THE CODE IS WRITTEN/NESTED in the source text - fixed at compile time, regardless of the actual call sequence at runtime. Dynamic scoping instead resolves a variable by looking at the actual CHAIN OF CALLERS at runtime (whoever happens to have called whom), which can change from one execution to the next even for the exact same line of code.
• Static link vs. dynamic link. A static link in an activation record points to the activation record of the LEXICALLY ENCLOSING procedure in the SOURCE CODE (used to find non-local variables under static scoping, by following static links outward exactly as many levels as the source nesting requires). A dynamic link instead points to the activation record of whoever actually CALLED this procedure at runtime (used to know where to return control, and to tear down the stack correctly) - these two links can point to completely different activation records when a function is called from somewhere other than its immediate lexical parent.
• Scope. The scope of a variable declaration is simply the region of program TEXT within which that particular declaration is the one that applies - outside that region, either no such name exists, or a DIFFERENT declaration of the same name (in an enclosing or later scope) applies instead.

EVERY EDGE CASE

GATE TRAP: at a point where a variable is SHADOWED (an inner block declares a variable with the SAME NAME as an outer one), any reference to that name INSIDE the inner block's scope refers to the INNER (nearest enclosing) declaration ONLY - the outer variable becomes completely inaccessible by that name until the inner scope ends, even though the outer variable's storage still exists unchanged the whole time.
GATE TRAP: counting static links to traverse is purely a function of LEXICAL NESTING DEPTH in the source code (how many levels of procedure-definition nesting separate the accessing procedure from the declaring procedure), completely independent of the actual call sequence/depth at runtime - a procedure nested 2 source-code levels inside another needs exactly 2 static-link hops regardless of how deep the actual call stack has grown through recursion or indirect calls.
GATE TRAP: dynamic link traversal counts CALLER-CALLEE hops (actual runtime call chain), which is a completely different number from static-link hops whenever a procedure is called from somewhere other than its immediate lexical parent (e.g. a deeply recursive call, or a callback passed to and invoked by unrelated code) - confusing "how many calls deep are we" with "how many lexical levels are we nested" is the single most common error in this topic's numerical questions.
KEY: heap allocation is required (rather than a simple stack) whenever a language allows data to OUTLIVE the procedure call that created it (e.g. an object returned by reference, or explicit dynamic allocation) - a pure stack discipline works only when strict last-in-first-out lifetime holds, i.e. a called procedure's activation record is always deallocated before its caller's, which fails for anything that must persist beyond its creating call's return.
GATE TRAP: parameter passing mechanisms have GATE-tested distinct behaviours - call by value copies the argument's VALUE in, so changes inside the callee never affect the caller's variable; call by reference passes the actual memory ADDRESS, so changes inside the callee DO affect the caller's variable; call by value-result copies the value in AND copies the (possibly modified) value back out at return, differing from true call-by-reference specifically when ALIASING occurs (the same variable passed via two different parameters, or a global also passed as a parameter) - value-result and reference can give visibly DIFFERENT final results in exactly these aliasing cases, a favourite "compute the final value" numerical trap.

WORKED EXAMPLE 1 - counting static links through three levels of nesting

Setup: procedure A (outermost) statically/lexically contains procedure B, which statically contains procedure C. From within an activation of C, how many static links must be followed to reach A's activation record?
1. C's own activation record's static link points to whichever activation is C's IMMEDIATE lexically enclosing procedure - that is B (one hop from C to B).
2. B's activation record's static link, in turn, points to B's own immediate lexical parent - that is A (one more hop, from B to A).
3. Total hops from C to A: 2 (C to B, then B to A) - exactly matching the lexical nesting depth difference (C is nested 2 levels inside A: A contains B contains C), regardless of how many times A, B, or C might currently be recursively active on the actual call stack.

WORKED EXAMPLE 2 - dynamic link chain differs from static link chain under indirect calling

Setup: A calls B directly; B, instead of calling C directly, passes C as a callback which some unrelated procedure D (lexically NOT nested inside A or B at all, e.g. a separate top-level procedure) eventually invokes. C is lexically nested directly inside A (not inside B or D).
1. Static link chain for C: since C is lexically nested one level inside A, C's static link points directly to (the currently active) A's activation record in ONE hop, completely ignoring the fact that the actual calling chain went A -> B -> D -> C.
2. Dynamic link chain for C: C's dynamic link points to D (whoever actually called it), D's dynamic link points to B (whoever called D), B's dynamic link points to A (whoever called B) - THREE hops via dynamic links to reach A's activation record.
3. Conclusion: static-link distance (1 hop) and dynamic-link/call-depth distance (3 hops) are completely different numbers here, precisely because C was not called by its own lexical parent - this exact mismatch scenario is what GATE numerical questions on this subtopic are built to test.

WORKED EXAMPLE 3 - aliasing under call-by-reference vs. call-by-value-result

Procedure swap-like call: procedure P(x, y) does { x = x + 1; y = y + 1; }, called as P(g, g) where g is a single global variable currently holding value 10 (the SAME variable g passed as BOTH arguments - deliberate aliasing).
1. Under call-by-reference: x and y both become ALIASES (references) to the same actual memory location g. x = x+1 sets g to 11 (both x and y now "see" 11, since they are literally the same location). Then y = y+1 sets g to 12. Final value of g: 12.
2. Under call-by-value-result: x and y are each given their OWN separate local copies, both initialised to 10 (the value of g at call time). x = x+1 makes local x become 11 (g itself untouched so far). y = y+1 makes local y become 11 too (using ITS OWN separate copy, still starting from 10, unaware of x's change). At return, the copy-back happens in parameter order: x's final value (11) is copied back to g first, then y's final value (11) is copied back to g second, OVERWRITING the first copy-back. Final value of g: 11.
3. This concrete numeric mismatch (12 under reference, 11 under value-result) for the exact same call is precisely why the two mechanisms are NOT interchangeable whenever aliasing (the same variable used more than once as an argument, or a global also aliased through a parameter) is present - a GATE numerical question naming both mechanisms is testing exactly this divergence.`; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-optimization';});
  t.theory.deep = (t.theory.deep||'') + `

FROM ZERO: FOUNDATIONS

• Basic block. A basic block is a maximal straight-line sequence of instructions with exactly ONE entry point (the first instruction, and control can only enter the block there, never in the middle) and exactly ONE exit point (the last instruction, typically a jump or branch, and control leaves only from there) - no jumps INTO the middle of a basic block are ever possible, and nothing inside jumps out early.
• Control flow graph (CFG), plainly. A CFG is a graph where each NODE is one basic block, and a directed EDGE from block X to block Y means control can flow directly from the end of X to the start of Y (via a fall-through or an explicit jump) - it is simply a map of every possible execution path through the program at the block level.
• Optimization, what it actually means here. A compiler optimization is any TRANSFORMATION of the code that preserves the program's observable MEANING (same output for every input) while improving some resource usage - typically running time, but sometimes code size or energy. "Preserves meaning" is the non-negotiable safety requirement; a transformation that is merely faster but occasionally changes behaviour is simply a bug, not an optimization.
• Data flow analysis, plainly. Data flow analysis computes, for every point in the program, some FACT about what is definitely true there (e.g. "which variable definitions could still be live/reaching this point"), by propagating information along the CFG's edges according to fixed rules, iterating until the computed facts stop changing (reach a fixed point).
• Loop-invariant computation. A computation inside a loop is loop-invariant if it produces the exact SAME result on every single iteration of that loop (its operands never change across iterations) - such a computation can safely be moved OUTSIDE the loop (computed once, before the loop starts) without changing the program's behaviour, since re-computing it every iteration was always redundant.

EVERY EDGE CASE

GATE TRAP: identifying basic block BOUNDARIES requires finding LEADERS first - a leader is the first instruction of the program, OR any instruction that is the TARGET of a jump/branch, OR any instruction immediately following a jump/branch instruction. Missing any one of these three leader rules (especially forgetting "the instruction right after a branch is always a new leader, even if nothing jumps there directly") is the most common basic-block-counting error.
GATE TRAP: an expression is only a valid target for common subexpression elimination if it is computed identically at two points AND none of its operands have been reassigned in between - if a variable used in the expression is modified by an intervening statement, the two occurrences are NOT the same value anymore and must NOT be merged, even though they look textually identical.
KEY: available expressions is a FORWARDS, MUST (intersection-based) data flow analysis - an expression is available at a program point only if it is computed along EVERY path reaching that point, and not invalidated (its operands not reassigned) along any of those paths since its last computation; used for global common subexpression elimination.
KEY: live variable analysis is a BACKWARDS, MAY (union-based) data flow analysis - a variable is live at a point if there EXISTS at least one path from that point to some later use of the variable, with no reassignment of it in between; used for dead code elimination (a variable definition whose value is never live afterward is dead and can be safely removed) and for register allocation decisions.
GATE TRAP: dead code elimination must be applied CAREFULLY around variables with side effects hidden in their computation (e.g. a function call that also writes to a global or performs I/O) - a variable assignment that LOOKS unused can still be unsafe to delete if computing its right-hand side has an externally visible side effect; pure "the assigned variable itself is never read again" reasoning is only safe when the right-hand side has no side effects.
GATE TRAP: moving a computation out of a loop (loop-invariant code motion) is only safe if the computation is GUARANTEED to execute on every iteration reaching that point (or, more carefully, if moving it earlier cannot introduce a computation, exception, or side effect that would not have occurred in the original code, e.g. moving a possibly-dividing-by-zero computation out of a loop whose body might sometimes skip that computation via an early exit) - blindly hoisting anything "textually invariant-looking" without checking control-flow safety is the classic mistake.

WORKED EXAMPLE 1 - finding leaders and basic blocks for a short numbered program

Instructions numbered 1 to 7: (1) t1 = a+b; (2) if t1 > 0 goto (5); (3) t2 = a-b; (4) goto (6); (5) t2 = a*b; (6) print t2; (7) end.
1. Instruction 1 is a leader by rule one (it's the very first instruction of the program).
2. Instruction 2 is a branch, so instruction 3 (immediately following it) is a leader by the "right after a branch" rule.
3. Instruction 2's branch TARGETS instruction 5, so instruction 5 is a leader by the "jump target" rule.
4. Instruction 4 is also a branch (goto), so instruction 5... is already a leader (no new information), but instruction 4's target is instruction 6, making instruction 6 ALSO a leader by the "jump target" rule (it was going to be one anyway as the instruction right after instruction 4's unconditional jump, but this confirms it via the target rule too).
5. Full leader set: {1, 3, 5, 6}. Basic blocks: B1={1,2} (ends right before leader 3), B2={3,4} (ends right before leader 5), B3={5} (ends right before leader 6, since 6 is a leader immediately), B4={6,7}. Four basic blocks total - each one entered only at its first instruction and exited only at its last.

WORKED EXAMPLE 2 - live variable analysis backward pass on a tiny CFG

Two connected blocks: B1: a = 1; b = 2; (falls through to B2). B2: c = a + b; print c; (exit).
1. Start from the very end of B2 (the exit) with an EMPTY live set (nothing needed after the program ends).
2. Walk B2 BACKWARDS: at 'print c', c is USED, so c becomes live going backward past this point (add c to the live set). At 'c = a + b', c is DEFINED here (so remove c from the live set going further backward past this def - its value going INTO this statement is not needed since it gets overwritten), and a, b are USED on the right-hand side, so add a and b to the live set. Live set entering B2 (i.e., live set at B1-to-B2 boundary): {a, b}.
3. Walk B1 BACKWARDS starting from that boundary set {a,b}: at 'b = 2', b is DEFINED (remove b from the live set going further back - nothing on the right-hand side uses any variable, it's a constant). Live set becomes {a}. At 'a = 1', a is DEFINED (remove a too, again a constant right-hand side). Live set entering B1 (i.e., at the very start of the program): {} (empty).
4. Interpretation: both a=1 and b=2 ARE necessary (their values ARE live immediately after each assignment, since they get used later in B2) - neither is dead code here. This full backward walk, block by block, def-kills-then-use-generates, is exactly the mechanical procedure to reuse on any live-variable GATE question.

WORKED EXAMPLE 3 - loop-invariant code motion, done correctly and done incorrectly

Loop: for (i = 0; i < n; i++) { x = a * b; y = arr[i] + x; }
1. Check 'x = a * b': does it depend on the loop variable i, or on anything reassigned inside the loop body? a and b are never reassigned anywhere in the loop, and i never appears in this computation at all - x = a*b computes the exact SAME value on every single iteration. It is loop-invariant, safe to hoist.
2. Correct transformation: x = a * b; (moved once, immediately BEFORE the loop starts) for (i = 0; i < n; i++) { y = arr[i] + x; } - the loop body now does strictly less repeated work, computing the multiplication once total instead of n times, while producing IDENTICAL output for every value of y across every iteration.
3. Contrast with 'y = arr[i] + x': this expression depends on i (through arr[i]), which changes every iteration - it is NOT loop-invariant and must NOT be hoisted; incorrectly moving it outside the loop would freeze arr[i] at just its first-iteration value for the entire loop, silently changing the program's actual behaviour on later iterations - exactly the kind of "optimization" that fails the safety requirement from the FROM ZERO definition above and would be marked wrong on GATE as an invalid transformation.`; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-lexical';});
  t.theory.deep += '\n\nQUICK-RECALL CARDS\n\nKEY: maximal munch rule - always take the LONGEST prefix that matches some valid token pattern; an operator followed by a digit/letter that cannot extend it into a longer valid pattern stands alone as a separate token.\nKEY: keyword recognition checks the FULL matched lexeme against a reserved-word table, never a prefix or substring - "intx" is one ID token, not keyword "int" plus leftover "x".\nREMEMBER: whitespace and comments are consumed and discarded, producing zero tokens, but they still act as token separators.\nREMEMBER: bracket/parenthesis BALANCE checking is a parsing (syntax) task, not a lexical task - the lexer only emits bracket tokens one at a time, it never verifies nesting correctness.'; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-parsing';});
  t.theory.deep += '\n\nQUICK-RECALL CARDS\n\nKEY: parser power chain - SLR(1) subset LALR(1) subset CLR(1), strictly increasing; every SLR(1) grammar is LALR(1) and CLR(1), but not conversely.\nKEY: LALR merging (combining CLR states with identical cores) can introduce a NEW reduce-reduce conflict not present in CLR, but can never introduce a new shift-reduce conflict.\nKEY: shift-reduce conflicts are resolved by preferring SHIFT by default (this is exactly what correctly resolves dangling-else); reduce-reduce conflicts have no universal default and need explicit grammar/rule-ordering fixes.\nREMEMBER: left recursion breaks LL(1) parsing entirely (infinite loop with no input consumed); common prefixes across alternatives break LL(1) lookahead decisions and need left factoring - two separate diagnoses, two separate fixes.'; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-sdt';});
  t.theory.deep += '\n\nQUICK-RECALL CARDS\n\nKEY: S-attributed (synthesized only) SDDs always fit bottom-up (LR) parsing, action at end of production.\nKEY: L-attributed SDDs (inherited attributes depending only on parent or already-processed LEFT siblings, never a right sibling) fit top-down (LL) parsing in one left-to-right pass.\nKEY: a dependency-graph CYCLE means the SDD has no valid evaluation order at all on that parse tree - this is a design error, not a minor inconvenience.\nREMEMBER: not every SDD with inherited attributes is L-attributed - an inherited attribute depending on a RIGHT sibling breaks the L-attributed restriction immediately.'; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-icg';});
  t.theory.deep += '\n\nQUICK-RECALL CARDS\n\nKEY: quadruples name every result explicitly (safe to reorder for optimization); triples refer to earlier results by POSITION NUMBER (reordering/deleting can silently break later references).\nKEY: DAG sharing requires syntactically identical sub-expressions with NO intervening reassignment of any operand - an assignment between two occurrences blocks sharing even if the text looks identical.\nKEY: short-circuit boolean code emits jumps DURING evaluation, skipping the second operand entirely when the first already determines the outcome - never compute-both-then-AND for && / || in three-address code.\nREMEMBER: backpatching uses truelist/falselist/nextlist to fill in jump targets AFTER they become known, enabling single-pass code generation with no backward re-scanning of source.'; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-runtime';});
  t.theory.deep += '\n\nQUICK-RECALL CARDS\n\nKEY: static link hop count = lexical NESTING DEPTH in source code, completely independent of actual runtime call depth.\nKEY: dynamic link hop count = actual CALLER chain at runtime, which can diverge sharply from static link count under indirect/callback calls.\nKEY: call-by-value never affects the caller variable; call-by-reference always does; call-by-value-result matches reference EXCEPT under aliasing (same variable passed twice, or a global also aliased via a parameter), where the LAST copy-back wins.\nREMEMBER: heap allocation (not a pure stack) is required whenever data must outlive the procedure call that created it.'; })();

(function(){ var t = window.GATE_DATA.questions['compiler'].topics.find(function(t){return t.id==='compiler-optimization';});
  t.theory.deep += '\n\nQUICK-RECALL CARDS\n\nKEY: leader rules for basic blocks - first instruction of the program; every branch/jump TARGET; every instruction immediately AFTER a branch/jump - miss any one of these three and the block count comes out wrong.\nKEY: available expressions is a FORWARDS, MUST (intersection) analysis used for common subexpression elimination; live variables is a BACKWARDS, MAY (union) analysis used for dead code elimination and register allocation.\nKEY: loop-invariant code motion is only safe when the moved computation is guaranteed to execute every iteration reaching that point and cannot introduce a new exception/side effect earlier than the original code would have.\nREMEMBER: any optimization must preserve observable program behaviour for every input - a transformation that is merely faster but sometimes changes output is a compiler bug, not a valid optimization.'; })();
