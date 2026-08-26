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
    /*__MARKER__*/
  ]
};
