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
