// Textbook chapter: Pointers, Arrays and Structures.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/pds.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — either one defined below or one already attached
// to this topic in data/questions/pds.js (ptr-boxes, 2d-array-layout).

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['pds-pointers'] = {
  figs: [
    {
      id: 'struct-padding-pds',
      caption: 'Two structs with the same members in different orders. Padding is inserted so every member starts at an address that is a multiple of its own size.',
      svg: '<svg viewBox="0 0 380 190" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" fill="currentColor"><text x="10" y="16">struct A { char c; int i; char d; };  — 12 bytes</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="10" y="26" width="24" height="26"/><rect x="34" y="26" width="72" height="26" stroke-dasharray="3,3"/><rect x="106" y="26" width="96" height="26"/><rect x="202" y="26" width="24" height="26"/><rect x="226" y="26" width="72" height="26" stroke-dasharray="3,3"/></g><g font-size="10" fill="currentColor"><text x="22" y="43" text-anchor="middle">c</text><text x="70" y="43" text-anchor="middle" opacity=".6">pad</text><text x="154" y="43" text-anchor="middle">i</text><text x="214" y="43" text-anchor="middle">d</text><text x="262" y="43" text-anchor="middle" opacity=".6">pad</text><text x="10" y="66" font-size="9">0</text><text x="106" y="66" font-size="9">4</text><text x="202" y="66" font-size="9">8</text><text x="298" y="66" font-size="9">12</text></g><g font-size="11" fill="currentColor"><text x="10" y="106">struct B { char c; char d; int i; };  — 8 bytes</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="10" y="116" width="24" height="26"/><rect x="34" y="116" width="24" height="26"/><rect x="58" y="116" width="48" height="26" stroke-dasharray="3,3"/><rect x="106" y="116" width="96" height="26"/></g><g font-size="10" fill="currentColor"><text x="22" y="133" text-anchor="middle">c</text><text x="46" y="133" text-anchor="middle">d</text><text x="82" y="133" text-anchor="middle" opacity=".6">pad</text><text x="154" y="133" text-anchor="middle">i</text><text x="10" y="156" font-size="9">0</text><text x="106" y="156" font-size="9">4</text><text x="202" y="156" font-size="9">8</text></g><text x="10" y="182" font-size="10" opacity=".8">Same three members, reordered — 4 bytes saved.</text></svg>'
    },
    {
      id: 'ptr-chain-pds',
      caption: 'A chain of indirection: r points to q, q points to p, p points to x. Each * peels back one arrow.',
      svg: '<svg viewBox="0 0 380 130" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-pc" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.4" fill="none"><rect x="10" y="70" width="60" height="30"/><rect x="110" y="70" width="60" height="30"/><rect x="210" y="70" width="60" height="30"/><rect x="310" y="70" width="60" height="30"/></g><g font-size="11" fill="currentColor" text-anchor="middle"><text x="40" y="90">x = 5</text><text x="40" y="112" font-size="9">@1000</text><text x="140" y="90">p = 1000</text><text x="140" y="112" font-size="9">@2000</text><text x="240" y="90">q = 2000</text><text x="240" y="112" font-size="9">@3000</text><text x="340" y="90">r = 3000</text><text x="340" y="112" font-size="9">@4000</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><path d="M110 85 L70 85" marker-end="url(#ah-pc)"/><path d="M210 85 L170 85" marker-end="url(#ah-pc)"/><path d="M310 85 L270 85" marker-end="url(#ah-pc)"/></g><g font-size="10" fill="currentColor"><text x="90" y="60" text-anchor="middle">*p</text><text x="190" y="60" text-anchor="middle">**q</text><text x="290" y="60" text-anchor="middle">***r</text></g></svg>'
    },
    {
      id: 'dyn2d-pds',
      caption: "Two ways to build a dynamic 2D array: an array of separately malloc'd rows (left) versus one contiguous block indexed by hand (right).",
      svg: '<svg viewBox="0 0 380 170" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-d2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g font-size="10" fill="currentColor"><text x="10" y="14">int **a; rows scattered</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="10" y="24" width="20" height="60"/><rect x="70" y="24" width="70" height="16"/><rect x="70" y="70" width="70" height="16"/></g><g font-size="9" fill="currentColor"><text x="20" y="40" text-anchor="middle">a[0]</text><text x="20" y="60" text-anchor="middle">a[1]</text></g><path d="M30 32 L70 32" stroke="currentColor" stroke-width="1.2" marker-end="url(#ah-d2)" fill="none"/><path d="M30 78 C 45 78, 45 78, 70 78" stroke="currentColor" stroke-width="1.2" marker-end="url(#ah-d2)" fill="none"/><g font-size="10" fill="currentColor"><text x="200" y="14">int (*a)[C]; one block</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="200" y="24" width="35" height="16"/><rect x="235" y="24" width="35" height="16"/><rect x="270" y="24" width="35" height="16"/><rect x="305" y="24" width="35" height="16"/></g><g font-size="9" fill="currentColor"><text x="217" y="40" text-anchor="middle">row0</text><text x="252" y="40" text-anchor="middle">row0</text><text x="287" y="40" text-anchor="middle">row1</text><text x="322" y="40" text-anchor="middle">row1</text></g><text x="200" y="65" font-size="9" fill="currentColor">a[i][j]  ==  *(*(a+i)+j),  one malloc, one free</text><text x="10" y="115" font-size="9" fill="currentColor">R mallocs for rows + 1 for the pointer array;</text><text x="10" y="130" font-size="9" fill="currentColor">R+1 frees, rows may not be adjacent.</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

Every data structure you will study after this — linked lists, trees, graphs, hash tables — is built out of exactly two raw materials: a way to group values together (a struct) and a way to refer to a value without copying it (a pointer). Arrays are the simplest possible grouping, and understanding how the compiler actually lays them out in memory is what makes every later structure make sense, because a struct or a node is really just an array's discipline applied to unlike types.

This chapter builds the whole machine from the ground up. We start at the only place it can start — what a byte of memory and an address actually are — and derive pointers, arrays, strings, two-dimensional layout, dynamic allocation and structures from that one idea, in the order a working C programmer needs them. Nothing here is a rule to memorise; every rule is a consequence of how the machine stores things, and once you can see why a rule holds you can no longer be tricked by a question that states it backwards.

MEMORY, ADDRESSES AND WHAT A POINTER ACTUALLY IS

A computer's memory is a long strip of bytes, and every byte has a number — its address — starting from 0 and going up. When a program declares a variable, the compiler reserves some number of consecutive bytes for it and remembers which address that reservation starts at. An int typically gets 4 bytes; a char gets 1; a double gets 8. The variable's name, for the rest of the program's text, is just a convenient stand-in for "the bytes at this address, interpreted as this type."

That parenthetical — interpreted as this type — is doing real work. The bytes themselves are just bits; nothing about a byte says whether it is part of an int, a float, or the first byte of a struct. The type attached to a variable tells the compiler two things: how many bytes belong to it, and how those bytes should be read back as a value. Without a type, an address is just a number; with a type, it becomes something you can read and write correctly.

A pointer is a variable whose job is to hold one of these addresses. Nothing more is required for something to be a pointer: it is a small chunk of memory (usually 4 or 8 bytes, the same size for every pointer on a given machine, regardless of what it points to) whose contents are interpreted as an address. What makes a pointer useful, rather than just a number, is that it is declared with a type describing what kind of thing lives at the address it holds — an int*, a char*, a struct Node* — so that the compiler knows how many bytes to read from that address and how to interpret them.

KEY: A pointer is an address plus a type. The address says where; the type says how many bytes live there and how to read them. int *p and char *p might hold the identical numeric address, but p + 1 means something different for each, because "one step" is measured in units of the pointed-to type.

THE ADDRESS-OF AND DEREFERENCE OPERATORS

Two operators move between a variable and a pointer to it, and they are exact inverses of each other.

The address-of operator, &, applied to a variable, produces a pointer holding that variable's address. If int a = 20;, then &a is a value of type "pointer to int" whose contents are wherever the compiler put a. You cannot take the address of a value that has no storage — you cannot write &5 or &(a + b) — because & needs an actual location, not a computed value.

The dereference operator, *, applied to a pointer, produces the object living at the address the pointer holds. If int *p = &a;, then *p is not a copy of a — it is a name for a itself, reached by a different route. Writing *p = 20; does not create a new value anywhere; it writes 20 into the exact bytes that a occupies, because *p and a are, at the hardware level, identical bytes.

[[FIG:ptr-boxes]]

This is the entire mechanism behind every pointer trick in this chapter: & manufactures an address from a named location, and * follows an address back to the location it names. Chain them — int **q = &p; — and you get a pointer to a pointer: q holds the address of p, so *q is p (a pointer, holding a's address) and **q is a (an int, dereferencing twice). Two stars undo two ampersands.

GATE TRAP: printf("%d", *&*&a); looks alarming but is the identity function on a. Reading it as one operator at a time from the inside out: &a is a pointer to a; *(&a) dereferences it, giving a back; &(that) takes its address again, giving a pointer to a again; *(that) dereferences once more, giving a back. Each & is immediately undone by the * next to it, so the whole expression just prints a's own value.

READING POINTER DECLARATIONS: THE RIGHT-LEFT RULE

C's declaration syntax is famous for being unreadable at a glance, but it follows one consistent rule, and once you have it, no declaration in this chapter is difficult. The rule: start at the name being declared, and alternate reading right, then left, applying whatever you meet, until you reach the base type. [] and () bind before *, so if [] or () sit immediately to the right of the name (or of a parenthesised group containing the name), they are read first.

Work through the four hardest cases GATE actually uses.

1. int *p; — Start at p. Nothing to its right (no [] or ()). To its left is *, so p is "pointer to". Continue left: int. Reading it off: p is pointer to int.

2. int *a[10]; — Start at a. Immediately to its right is [10], which binds tighter than the * to its left, so read that first: a is "array of 10 of...". Then the * to the left: "...pointer to...". Then int. Full reading: a is array of 10 pointers to int.

3. int (*a)[10]; — Start at a. The parentheses group (*a), so what is immediately around a inside those parentheses is read first: * to its left, meaning a is "pointer to". Now step outside the parentheses: to the right is [10], meaning what a points to is "an array of 10". Then int. Full reading: a is pointer to an array of 10 ints. The parentheses are the entire difference from case 2 — they force the * to bind to a before the [10] gets a chance to.

4. int (*f)(int); — Start at f. Parentheses group (*f): f is "pointer to". Outside the parentheses, to the right, is (int): what f points to is "a function taking an int and returning...". Then int, the return type. Full reading: f is a pointer to a function taking an int and returning int.

Now a fifth: char **argv;. Start at argv. To its left, one * at a time: the innermost * says argv is "pointer to", and the next * says pointer to "pointer to". Then char. Reading it off: argv is a pointer to a pointer to char — which is exactly why main's parameter list, int argc, char **argv, is read as an array-of-strings argument: argv points to the first element of an array of char pointers, each of which points to one command-line argument's first character.

REMEMBER: [] and () bind to the name before an unparenthesised * does. Put parentheses around *name yourself when reading, and read outward in the order: name → whatever is bound directly to it (array size or parameter list) → the * outside any parentheses → the base type.

GATE TRAP: int *a[10] and int (*a)[10] are the single most confused pair in this whole topic, precisely because they differ only by two parentheses and mean nearly opposite things: the first is 10 separate int pointers (each independently pointing anywhere), the second is one pointer that steps by whole rows of 10 ints at a time. If a question gives you one and asks about pointer arithmetic on a, check for the parentheses before doing anything else.

NULL, UNINITIALISED POINTERS AND WHAT DEREFERENCING THEM DOES

A pointer variable, like any other variable, holds garbage until it is given a value — declaring int *p; without initialising it leaves p holding whatever bit pattern happened to be in that memory before, which is very unlikely to be a valid address. Dereferencing such a pointer reads or writes through a meaningless address: undefined behaviour, which in practice usually means a crash (a segmentation fault, if you are lucky enough that the garbage address falls outside memory the OS gave your process) but is not guaranteed to crash — it might silently corrupt something else.

NULL is a special pointer value, conventionally the address 0, reserved to mean "this pointer does not point to anything." It is not garbage; it is a deliberate, checkable "no object here" flag, and functions that might fail to produce a valid pointer — malloc when memory is exhausted, a search function that finds nothing — return NULL to say so. Dereferencing NULL (*p when p is NULL) is exactly as undefined as dereferencing garbage, but because address 0 is deliberately left unmapped on essentially every real system, it reliably crashes rather than silently corrupting memory — which is precisely why NULL is the value chosen for "nothing": a bug that dereferences it fails loudly and immediately instead of hiding.

KEY: An uninitialised pointer and a NULL pointer are both dangerous to dereference, but for different reasons and with different reliability. NULL is a documented, checkable sentinel — always test if (p != NULL) before using a pointer that might be it. An uninitialised pointer is not a sentinel at all; it is whatever bytes were already there, and no check can distinguish it from a valid address.

POINTER ARITHMETIC IS SCALED BY THE TYPE

Suppose an array of ints starts at address 1000, and each int occupies 4 bytes on this machine. The array's elements therefore live at 1000, 1004, 1008, 1012, and so on — every element is 4 bytes further along than the last, because that is how much space each one needs. If pointer arithmetic simply added raw byte counts, moving "one element forward" would require the programmer to know and multiply by sizeof(int) every single time, and that multiplication would have to change if the element type ever changed. C removes that burden by defining p + k, for a pointer p to type T, as the address k elements of type T further along — that is, numerically, p's address plus k * sizeof(T).

address(p + k) = address(p) + k · sizeof(*p)

Work the concrete case. int *p holds 1000, and sizeof(int) is 4. p + 3 is not 1003; it is 1000 + 3 * 4 = 1012, the address of the fourth int in the array (index 3, since p itself is index 0). This is exactly why array indexing works regardless of element size: a[i] is defined so that it always lands on the i-th element, whether each element is a 1-byte char, a 4-byte int, or a 32-byte struct, because the scaling by sizeof happens automatically every time you add to a pointer.

1. Take a pointer's stored address.
2. Multiply the integer being added by sizeof(the pointed-to type).
3. Add that many bytes to the address.

This is why pointer types matter even though every pointer is the same physical size: a char* and an int* holding the identical numeric address will step to different places under +1, because the scaling factor is read from the type, not from the bits in the pointer itself. A void* — introduced below — cannot be given +1 at all, for exactly this reason: there is no type to read a step size from.

GATE TRAP: A machine has 4-byte ints. "int *p holds address 1000; what is p + 3?" tempts you toward 1003 — plain arithmetic on the number printed. The correct answer is 1012. Whenever a question gives you a numeric address and a pointer type, the size of the pointed-to type is not decoration; it is the multiplier you must apply.

COMPARING AND SUBTRACTING POINTERS

Two pointers into the same array can be compared with <, >, ==, exactly as you would expect: the one with the lower array index compares as "less than" the one with the higher index, because within one array, addresses increase monotonically with index. Comparing pointers into two unrelated objects (or of incompatible types) is undefined behaviour in the C standard — the "less than" relationship the language guarantees is only defined within a single array, or between a pointer and one-past-the-end of that array.

Subtracting two pointers into the same array, q - p, does not give the raw byte distance between them; it gives the number of elements between them, exactly reversing the scaling that addition applies. The compiler computes the raw byte difference and then divides by sizeof(the pointed-to type) automatically, so the result is directly usable as an array-index distance or a loop bound without the programmer ever touching sizeof.

elements between p and q = (address(q) − address(p)) ÷ sizeof(*p)

Worked example: int arr[10]; int *p = &arr[2], *q = &arr[7];. q - p is (address of arr[7] minus address of arr[2]) divided by sizeof(int). The raw byte gap is 5 * 4 = 20 bytes, but dividing by 4 gives 5 — the number of elements from index 2 to index 7. If you instead cast both pointers to char* before subtracting, char has size 1, so the division by 1 changes nothing and you get the raw byte count directly: (char*)(q) - (char*)(p) is 20. Casting to char* is exactly how a question forces you to see the byte count instead of the element count.

VOID POINTERS AND CASTING

A void* is a pointer with no declared pointed-to type — it holds an address, like any pointer, but carries no information about what is stored there or how many bytes it occupies. It exists for exactly the situations where a function must accept a pointer to any kind of data without knowing in advance what that data is: malloc returns void*, because it has no idea whether you are about to store ints, structs, or characters in the memory it hands back; memcpy takes void* source and destination for the same reason.

Because a void* carries no size information, three things follow directly. It cannot be dereferenced (*p is meaningless if the compiler does not know how many bytes or how to interpret them). Arithmetic on it (p + 1) is not standard C, because there is no sizeof(*p) to scale by — some compilers allow it as an extension, treating void the same as char (size 1), but portable code does not rely on this. And assigning a void* to a typed pointer, or a typed pointer to a void*, requires no explicit cast in C (though C++ is stricter here) — which is exactly how malloc's return value is normally used directly: int *p = malloc(10 * sizeof(int));, with the void* silently becoming an int*.

An explicit cast, (int*)somePointer, tells the compiler "trust me, treat this address as if it pointed to an int," without changing a single bit at that address. Casting is a promise about interpretation, not a conversion of data — get the promise wrong (cast a pointer to a struct as though it were an int*) and the program will read the right number of bytes from the right place but decode them incorrectly.

CONST WITH POINTERS

const can attach to two different things in a pointer declaration — the pointed-to object, or the pointer variable itself — and where you put it changes which one is protected. Read the declaration with the right-left rule from before to see which.

const int *p means "p is a pointer to a const int": the object at the far end is protected from being written through this pointer (*p = 5; is a compile error), but p itself is an ordinary variable and can be repointed at any time (p = &otherVar; is fine). This is the natural type for a function parameter that reads through a pointer without needing to modify what it points to — strlen's parameter, for instance, is conventionally const char*.

int * const p means "p is a const pointer to int": now the const binds to p itself (reading right-left: p is const, pointer to int), so p's own value — the address it holds — is fixed for its lifetime (p = &otherVar; is a compile error), but the int it points to is entirely writable (*p = 5; is fine, and changes the pointed-to object).

const int * const p combines both: neither the pointer's target address nor the value it points to can be changed through p.

1. Find the * closest to the name that has no const between it and the name — that pointer level is unrestricted for repointing (unless the whole thing is const, as above).
2. A const sitting to the LEFT of a * (with only the base type between them) protects the pointed-to value.
3. A const sitting between the * and the name protects the pointer variable itself.

GATE TRAP: int * const p = &x; — questions rely on you assuming const always protects the value, so they expect you to (wrongly) forbid *p = 20;. Read right-left: p is const (the pointer is fixed), int (pointing to a plain, writable int). So *p = 20; is legal and changes x, while p = &y; is the one that is forbidden. This is the mirror image of const int *p, and GATE deliberately swaps which side the const sits on to catch exactly this assumption.

ARRAYS ARE CONTIGUOUS MEMORY

An array is a block of memory holding a fixed number of elements of the same type, laid out one immediately after another with no gaps. int a[5]; reserves 5 * sizeof(int) contiguous bytes; a[0] occupies the first sizeof(int) of them, a[1] the next sizeof(int), and so on up to a[4]. "Contiguous" is not an implementation detail you could imagine being otherwise — it is the single fact that everything else in this section is derived from, because it is what makes computing any element's address a matter of simple multiplication rather than following a chain of stored links (the way a linked list, met in a later chapter, has to).

If the array starts at address base, then element a[i] starts at address base + i * sizeof(element), because there are exactly i complete elements before it, each occupying sizeof(element) bytes.

address(a[i]) = base + i · sizeof(element)

WHY a[i] IS *(a+i) IS i[a]

Once you know that an array name, in almost every expression, decays into a pointer to its first element (the exception list is next), the indexing notation a[i] is not a separate piece of syntax the language had to invent — it is defined purely in terms of pointer arithmetic and dereference, both of which you already have.

1. a decays to a pointer to a[0] — call its address base.
2. a + i is pointer arithmetic: base + i * sizeof(element), which is exactly the address of a[i], derived above.
3. *(a + i) dereferences that address, producing the value stored there — which is, by definition, a[i].

So the language defines a[i] as nothing more than shorthand for *(a + i). This is why a[i][j] indexing on multi-dimensional arrays, worked out fully later in this chapter, is just this rule applied twice.

The famous, slightly mind-bending consequence is that + is commutative: a + i is identical to i + a, so *(a + i) is identical to *(i + a), which — since *(i + a) is exactly what i[a] means once you substitute i for "the array" and a for "the index" in the definition — makes i[a] a legal, working, if perverse, way to write a[i]. It is never used in real code, but it is asked precisely because it exposes that indexing is not special syntax at all, just addition and dereference in whichever order you write them.

KEY: a[i], *(a + i) and i[a] are the same expression under the hood — indexing is pointer arithmetic plus dereference, and addition does not care which operand is written first. This single equivalence is the source of nearly every "which expression equals a[i][j]" question you will see.

ARRAY DECAY AND ITS THREE EXCEPTIONS

"Decay" is the name for the rule already used several times above: in most expression contexts, an array name is automatically converted to a pointer to its first element. int a[5]; int *p = a; works because a decays to &a[0] the moment it appears in an expression that expects a pointer — no explicit &a[0] is needed. This is also why a is a valid argument to a function expecting an int*, and why arithmetic like a + 1 is meaningful at all: the operand of + must be a pointer or a number, and a becomes a pointer to satisfy that.

Decay happens almost everywhere an array name appears, but there are exactly three contexts where it deliberately does not, because in each of them the array's identity as a whole object — not a pointer to its start — is what the operator needs.

• sizeof(a). If a decayed here, sizeof would report the size of a pointer (4 or 8 bytes) regardless of how large the array actually is, which would make sizeof useless for arrays. Instead sizeof looks at the declared type directly and reports the whole array's size: for int a[10] with 4-byte ints, sizeof(a) is 40.

• &a. Applying & to an already-decayed pointer would just give the address of that temporary pointer, which is not useful. Instead &a gives "the address of the whole array," with type pointer-to-array-of-5-int (int (*)[5], not int*). Numerically &a and &a[0] are the same address (the array starts where its first element starts), but their types differ, and that difference shows up the moment you add 1: &a + 1 skips past the entire array (all 5 elements at once), while &a[0] + 1 (equivalently a + 1) skips past a single element.

• String literal initialisation. char s[] = "GATE"; is special-cased: the literal is not decaying to a pointer here, it is being used to size and fill an array — the compiler counts the literal's characters, adds one for the terminating '\\0', and copies that many bytes into s, which is a genuinely separate, writable block of memory. Contrast char *p = "GATE";, where no array is created at all — p is simply a pointer to the literal's first character, wherever the compiler chose to store the read-only literal itself.

KEY: Array decay happens everywhere except as the operand of sizeof, as the operand of unary &, and in string-literal array initialisation. Every "surprising" sizeof or address question in this topic is testing whether you know these three exceptions.

WHY YOU CANNOT ASSIGN TO AN ARRAY NAME

int a[5]; a = someOtherArray; or even a++; is a compile-time error, and it is worth seeing exactly why, because it is not an arbitrary restriction — it follows from what a is. a names a fixed block of storage that the compiler set aside when the array was declared; it is not a variable that holds an address the way a pointer variable does, it is the address, baked into the compiled program at the point the array lives. A pointer variable like p can be reassigned because p is a box that currently contains one address and can later contain a different one. a is not a box containing an address — a is the location itself. Decay lets you read a as if it were a pointer value in an expression, but that read-only conversion never turns a into an assignable pointer variable; there is no storage anywhere holding "a's current pointer value" that an assignment could overwrite. This is precisely the meaning of "a is not a modifiable lvalue": there is no slot to modify.

sizeof ON ARRAYS, AND THE FUNCTION-PARAMETER TRAP

sizeof(a) for an array in the scope where it was declared gives the whole array's byte size, as established above: 40 for int a[10] with 4-byte ints. Dividing by the size of one element recovers the element count without hardcoding it anywhere:

number of elements = sizeof(array) / sizeof(array[0])

This idiom is used constantly, because it stays correct even if the element type or the array's declared size later changes — sizeof(array[0]) always matches whatever the element type currently is.

Now the trap. When an array is declared as a function's parameter — void f(int a[10]) or equivalently void f(int a[]) or void f(int *a), all three mean exactly the same thing to the compiler — the parameter is silently rewritten as a plain pointer. The [10] in the parameter list is not a promise that a full 10-element array will be checked or preserved; it is decorative and ignored. Inside f, a is a pointer variable, occupying just the size of a pointer, and it holds only the address the caller passed — no information about how many elements are there travels with it.

Consequently, sizeof(a) computed inside f gives the size of a pointer (4 or 8 bytes, depending on the machine), never the size of whatever array the caller happened to pass, however large that array truly is. This is why every function that needs to process a whole array must also be given its length as a separate parameter — the array itself does not carry that information across a function call once it has decayed.

GATE TRAP: A question shows int a[10]; sizeof(a) at file scope (giving 40) and then shows the identical expression sizeof(a) written inside a function whose parameter is declared int a[10] (giving 4 or 8, the pointer size), and asks whether they are equal. They are not, and this contrast — same source text, different meaning, because the surrounding declaration turned a into a pointer parameter — is one of the most frequently tested single facts in this whole subject.

STRINGS: CHAR ARRAYS WITH A TERMINATOR

C has no built-in string type; a string is simply a convention layered on top of char arrays: a sequence of character bytes, followed by one extra byte holding the value 0 (written '\\0'), marking where the meaningful characters end. Every function that operates on strings — printf's %s, strlen, strcpy — works by reading characters starting from a given address and stopping the instant it reads a 0 byte; nothing else marks the string's length.

char s[] = "GATE"; allocates 5 bytes, not 4: 'G', 'A', 'T', 'E', and finally '\\0', which the compiler appends automatically whenever a string literal initialises a char array. sizeof(s) here is 5 (the whole array, including the terminator, since this is a plain array in the declaring scope — the same sizeof rule as any other array). strlen(s), by contrast, counts only the visible characters by scanning until it hits the terminator and stopping there without counting it, giving 4.

KEY: sizeof on a string array counts the terminating '\\0'; strlen does not. For char s[] = "GATE", sizeof(s) is 5 and strlen(s) is 4 — and this off-by-one is deliberately placed in questions that otherwise look identical.

STRING LITERALS VS CHAR ARRAYS — WHERE EACH LIVES

The distinction between char s[] = "hello"; and char *p = "hello"; is not stylistic; it changes where the characters physically live and therefore whether writing to them is safe.

char s[] = "hello"; creates a genuine array — 6 bytes of ordinary, writable storage on the stack (if s is a local variable), initialised by copying the literal's characters into it. s[0] = 'H'; is completely legal: you are writing into your own array, which happens to have started out holding a copy of "hello".

char *p = "hello"; creates only a pointer; p is initialised to the address of a string literal that the compiler placed in a read-only region of memory (often merged with, or adjacent to, the program's text section, because it is fixed data that never needs to change and can safely be shared between multiple calls or even multiple processes running the same program). p[0] = 'H'; attempts to write into that read-only literal. The C standard declares this undefined behaviour; in practice, on essentially every modern operating system, it causes an immediate segmentation fault, because the literal's page of memory is marked write-protected by the loader.

GATE TRAP: A question gives char *s = "hello"; s[0] = 'H'; printf("%s", s); and offers "prints Hello" as a tempting option. The correct answer is undefined behaviour / typically a crash — many compilers accept the code with no warning at all, so "compilation error" is also wrong. Only char s[] = "hello"; makes that same-looking line of code safe.

WRITING strlen, strcpy AND strcmp WITH POINTERS

The standard library's string functions (declared in string.h) are worth building by hand once, because doing so is exactly how GATE poses "trace this code" questions on strings — they are frequently just one of these functions, inlined and disguised.

strlen counts characters up to but not including the terminator, and the pointer-based version does it by walking a pointer forward until it finds the 0 byte, then subtracting to recover the count:

1. Let p start equal to s (both pointing at the first character).
2. While *p is not '\\0', advance p by one (p++) and repeat.
3. When the loop stops, p points exactly at the terminator; return p − s, the number of elements walked — the pointer-subtraction rule from earlier applied to a char array.

This is precisely why "hello" gives 5: h, e, l, l, o are five non-zero characters walked before hitting the sixth byte, the terminator, and p ends up 5 elements past s.

strcpy copies one string, including its terminator, into another buffer that the caller must already have made large enough:

1. While the character at the source pointer is not '\\0', copy it to the destination pointer, then advance both pointers.
2. When the loop ends, copy the terminating '\\0' itself as the final byte — this last copy is what makes the destination a properly terminated string, and it is easy to forget when writing the loop condition around *src rather than doing the assignment first and testing what was just copied.

A common one-line idiom, while ((*dst++ = *src++)) { }, does exactly this: it assigns *src to *dst (copying one character, including the terminator when it is finally reached), the assignment's result is that copied character, the loop condition tests whether that character was nonzero, and only after the assignment do both pointers advance (because postfix ++ evaluates to the old pointer value, used for the dereference, and then increments) — so the terminator does get copied, and the loop then correctly stops.

strcmp compares two strings character by character and returns zero for equality, or the sign of the difference at the first character where they diverge:

1. Walk both pointers together, one character at a time, as long as the two characters are equal and neither is the terminator.
2. Stop at the first position where the characters differ, or where one (or both) strings has ended.
3. Return the difference between the two characters at that position (positive if the first string's character has the larger value, negative if smaller, zero only if both reached '\\0' together, meaning the strings were identical all the way through).

TWO-DIMENSIONAL ARRAYS: ROW-MAJOR LAYOUT

A two-dimensional array, int a[R][C];, is not implemented as a grid of separately allocated rows scattered around memory — it is one single contiguous block of R * C elements, exactly like a 1D array, with the compiler doing the work of translating a two-index access into the right position in that single block. C chooses row-major order: the entire first row (all C elements of a[0]) is stored first, immediately followed by the entire second row, and so on.

[[FIG:2d-array-layout]]

The choice of row-major is not the only possible one. Column-major order, used by Fortran and by some linear-algebra libraries, instead stores the entire first column before the second — a[0][0], a[1][0], a[2][0], ..., then a[0][1], a[1][1], and so on. Both orderings store exactly the same R * C elements; they differ only in which index varies fastest as you walk through memory address by address. C's choice of row-major is why, when you iterate a 2D array in C for performance, the inner loop should vary the column index (the fast-varying one in memory) rather than the row index — an inner loop over rows jumps C elements at a time through memory, defeating the cache.

THE ADDRESS FORMULA, DERIVED AND WORKED

Because row-major layout places entire rows one after another, finding element a[i][j]'s address is a two-step version of the 1D formula from earlier: first skip over i complete rows, then skip j more elements within the row you have reached.

1. Each row holds C elements, so i complete rows occupy i * C elements of space before row i even begins.
2. Within row i, element j is j elements further along.
3. So the element's position, counted in elements from the start of the whole array, is i * C + j.
4. Converting that element offset to a byte offset multiplies by the size of one element, exactly as in the 1D case.

address(a[i][j]) = base + (i · C + j) · sizeof(element)

Work a concrete case. int a[4][5]; base address 1000, sizeof(int) = 4. Find the address of a[2][3]. The element offset is i * C + j = 2 * 5 + 3 = 13 elements from the start. The byte offset is 13 * 4 = 52. The address is 1000 + 52 = 1052.

If the array were instead stored column-major with R rows, the same element a[i][j] would sit at offset j * R + i elements (now the row index i is the fast-varying one), giving a different address for the identical logical element — which is the whole reason the row-major/column-major distinction matters: the formula, and therefore the answer to any numeric address question, depends entirely on which convention the language or the question specifies.

THE TYPES OF a AND a[i] — AND WHY int** IS NOT A 2D ARRAY

For int a[R][C];, the name a, when it decays, becomes a pointer to its first element — but its "first element" is not an int, it is the first row, which itself is an array of C ints. So a decays to type int (*)[C]: a pointer to an array of C ints. This is exactly the type from the right-left rule's third worked example — a 2D array's name decays to precisely the "pointer to array of C" type you get by writing int (*p)[C].

a[i], correspondingly, is *(a + i): dereferencing that row-pointer, which yields the row itself — an object of type int[C], which then itself decays (in the further expression a[i][j], which is (a[i])[j]) to a pointer to its own first element, type int*. So a[i][j] is *( a[i] + j ), and substituting a[i] = *(a + i) gives the fully expanded form a[1][2] = *(*(a + 1) + 2): exactly the pattern GATE writes out explicitly and asks you to match against subscript notation.

1. a decays to int (*)[C] — pointer to a whole row.
2. a + i steps by one whole row (C * sizeof(int) bytes), landing on row i.
3. *(a + i) dereferences the row-pointer, producing row i itself, which decays to int* — a pointer to that row's first element.
4. *(a + i) + j steps j elements into that row.
5. The outer * dereferences to fetch the actual int at a[i][j].

This chain of types is exactly why int **p cannot be used as a stand-in for a genuine 2D array int a[R][C]. int** is a pointer to a pointer to int: it holds one address, and following it once gives you another single address, which you follow again to reach one int. Nowhere in that chain is there a block of C contiguous ints that (*(p+i)) would step through — a[i] for a real 2D array is a whole row you can then index with [j] using ordinary pointer arithmetic within that row, but *p for an int** is a single pointer variable, not a row, and adding j to it steps by individual ints from wherever THAT pointer happens to point, which need not have any relationship to any other row at all.

Concretely: int a[3][4]; genuinely is one contiguous block of 12 ints, and a[1][2] is found by arithmetic alone, with no memory access needed to find out where row 1 begins (it is always exactly 4 ints after row 0 begins). int **p, by contrast, requires actually reading the memory at p to find out where the first row is, then reading that row's own pointer arithmetic — there is no guarantee the rows referenced by different pointers are contiguous, or even that they are the same length. This is precisely the setup used when a 2D array is allocated dynamically as an array of separately malloc'd rows, covered fully below — that structure behaves somewhat like a 2D array through double indexing, but it is genuinely a different memory layout, with an extra layer of pointers and an extra memory access on every lookup.

GATE TRAP: A function is declared void f(int **a) and called with a genuine int b[3][4]; f(b);. This does not compile (or is undefined if forced through a cast), because b decays to int (*)[4], not int**, and these are different, incompatible pointer types — a 2D array parameter must be declared to match, as int (*a)[4] or equivalently int a[][4], never int **a.

ARRAYS OF POINTERS VERSUS POINTERS TO ARRAYS

int *q[2]; and int (*p)[2]; look almost identical and are read completely differently by the right-left rule from earlier, and they behave completely differently.

int *q[2]; — [2] binds to q first: q is an array of 2 elements, each of type "pointer to int." The two slots q[0] and q[1] are independent int pointers; nothing requires them to point into the same array, or into arrays of the same length, or to be related to each other in memory at all. Advancing q[0] with q[0]++ or q[0] = q[0] + 2 moves that one pointer by ordinary int-sized steps and has no effect whatsoever on q[1].

int (*p)[2]; — the parentheses force * to bind to p first: p is a single pointer, and what it points to is "an array of 2 ints." Advancing p with p++ moves it by one whole array-of-2 (that is, by 2 * sizeof(int) bytes) at a time — it steps by rows, the same behaviour derived for a 2D array's decayed name above, because that is exactly what this declaration is for: pointing at (and stepping through) the rows of a genuine 2D array.

char *s[] = { "ab", "cd", "ef" }; is a real, frequently tested instance of the array-of-pointers form: s is an array of 3 char pointers, each independently pointing at the first character of a different string literal (which may or may not be stored anywhere near each other — the compiler is free to place literals wherever it likes). s[1] is the pointer to "cd"'s 'c'; s[1] + 1 moves that one pointer forward within its own string, landing on 'd', and printing from there with %s gives "d". This layout — where the outer index selects which pointer, and any further arithmetic moves within the string that pointer targets — is exactly the shape of argv in main(int argc, char **argv): argv itself is a pointer to the first element of an array of char pointers, one per command-line argument.

GATE TRAP: int *q[2] (array of pointers) and int (*p)[2] (pointer to an array) are tested as a pair specifically because a question can show identical-looking pointer arithmetic — p++ versus q[0]++ — and expect you to know that one moves by a whole row and the other moves by one element, purely from which side of the parentheses the * sits on.

PASSING ARRAYS TO FUNCTIONS

A 1D array, passed to a function, decays to a pointer, as already established — the function receives just an address, and must be told the length separately if it needs one. A 2D array passed to a function decays similarly, but to the more specific type "pointer to an array of C ints" rather than a bare pointer, and this has a consequence that trips up nearly everyone the first time they meet it.

void f(int a[][4]) (or equivalently void f(int (*a)[4])) is a valid, meaningful declaration: the parameter's type is exactly what a genuine int b[R][4] argument decays to. Inside f, the compiler can compute a[i][j]'s address using the formula derived above — it needs the row length, 4, to know how many bytes to skip per row, and that row length is given explicitly in the parameter's own type.

void f(int a[][]) — leaving out the column count entirely — is not legal C, and the reason is exactly the address formula: without knowing C, the compiler has no way to compute i * C + j for any i beyond 0, because it does not know how many elements to skip to reach the start of row i. The row count, R, can be omitted (and usually is, passed instead as a separate int parameter) because it is never needed to locate an element — only C, the number of columns, is baked into the pointer arithmetic itself.

KEY: A 2D array parameter must specify every dimension except the first, because every dimension except the first determines how many bytes one step of the row-pointer must skip. The first dimension is purely informational and can be omitted or passed separately.

POINTERS TO POINTERS: A FULL TRACE

Trace a chain of indirection all the way through, one arrow at a time, the way a GATE question builds one up.

int x = 5;
int *p = &x;
int **q = &p;
int ***r = &q;
printf("%d", ***r);

[[FIG:ptr-chain-pds]]

1. x is an ordinary int, holding 5, at some address — say 1000.
2. p = &x stores 1000 in p, which itself lives at some other address, say 2000. p's type is int*.
3. q = &p stores 2000 (p's own address) in q, which lives at, say, 3000. q's type is int**.
4. r = &q stores 3000 (q's own address) in r, which lives at, say, 4000. r's type is int***.
5. *r dereferences r once: it reads the contents of address 4000, which is 3000 — so *r is q's value, meaning *r "is" q (a pointer, pointing at p).
6. **r dereferences again: from 3000 (what *r just gave), read the contents there, which is 2000 — so **r "is" p (a pointer, pointing at x).
7. ***r dereferences a third time: from 2000, read the contents there, which is 5 — so ***r is x's actual value.

Each * peels back exactly one arrow of the chain that was built by each &, in the reverse order it was built: r points to q, so one * reaches q; q points to p, so a second * reaches p; p points to x, so a third * reaches x. **q += 3 would add 3 directly to x through two levels (reaching p, then x), leaving p and q themselves completely unchanged — only the int at the far end of the chain is touched.

Pointers to pointers are not just a puzzle shape; they solve a real problem. A plain pointer parameter lets a function modify the object it points to, but not the caller's pointer variable itself — passing int *p to a function that does p = malloc(...); only changes the function's own local copy of p, leaving the caller's pointer unchanged, for exactly the same by-value reason a plain int argument cannot be changed by the callee. To let a function redirect the caller's pointer — make the caller's head pointer point at a newly allocated node, for instance — the function must receive a pointer to that pointer, and write through it: *pp = newNode;.

DYNAMIC MEMORY: malloc, calloc, realloc, free

Every array considered so far has had a size fixed at compile time. Real programs frequently do not know how much memory they will need until they are running — how many records are in a file, how many nodes a tree will grow — and for that, C provides a separate pool of memory, the heap, managed explicitly by the programmer through four standard functions.

malloc(n) requests n bytes from the heap and returns a void* pointing at the start of a block that large, or NULL if the request could not be satisfied (the heap is exhausted). The memory malloc returns is uninitialised — it holds whatever was left over from the last time that memory was used, not zeros — which is a common source of bugs when a programmer assumes freshly malloc'd memory starts clean. Because malloc takes a raw byte count, it is almost always written as malloc(n * sizeof(T)) for however many objects of type T are needed, rather than a hand-computed number, so that the code keeps working correctly if T's size ever changes: int *p = malloc(10 * sizeof(int));.

calloc(nmemb, size) requests space for nmemb objects of size bytes each, and, unlike malloc, guarantees the memory is zero-initialised before it is returned. Taking the count and the per-object size as two separate arguments (rather than one pre-multiplied total, as malloc does) lets calloc detect the overflow that would occur if nmemb * size were computed by the caller and happened to wrap around a fixed-width integer — a defensive design malloc does not offer.

realloc(ptr, newSize) changes the size of a block previously obtained from malloc or calloc. If the block can be grown or shrunk in place, it is; if not, realloc allocates a new block elsewhere, copies over the smaller of the old and new sizes' worth of bytes, frees the old block, and returns the new address. This is why the return value of realloc must always be captured, and never assumed to equal the pointer that was passed in — p = realloc(p, newSize); is safe only if you first check the return value is non-NULL, because assigning directly into p on a failed reallocation (which returns NULL while leaving the original block untouched) would overwrite your only remaining reference to that still-valid original block, leaking it.

free(ptr) returns a block previously obtained from malloc, calloc or realloc back to the heap allocator, so it can be reused by future allocations. free(NULL) is explicitly, deliberately guaranteed by the C standard to do nothing and be safe — this exists so that cleanup code does not need to wrap every free in a "was this ever allocated" check; a pointer that was never allocated (and is still NULL) can simply be freed unconditionally.

sizeof, note, is evaluated entirely at compile time when its argument's type is known statically (as with sizeof(int) or sizeof(a) for a real array) — it never queries the heap allocator or "asks" a pointer how big its block is. There is no C operator that recovers "how many bytes did malloc give this pointer" after the fact; if a program needs to remember an allocation's size, it must store that size itself, in a separate variable.

LEAKS, DANGLING POINTERS AND DOUBLE FREE

Three specific bugs recur constantly once memory is managed by hand, and each has a precise cause worth stating exactly.

A memory leak happens when the last pointer to a heap block is overwritten or goes out of scope before the block is freed — the memory is still reserved, the allocator still considers it in use, but the program has lost every way of reaching it, so it can never be freed and never be reused. p = malloc(100); p = malloc(200); leaks the first 100-byte block the instant the second malloc's result overwrites p, because nothing in the program still points at the first block.

A dangling pointer is a pointer that still holds the address of memory that has already been freed — the pointer variable itself was never told anything happened; it happily keeps holding the old address, but that address's memory may now have been handed out again to a completely unrelated allocation. Dereferencing a dangling pointer reads or writes memory that some other part of the program (or some future allocation) now believes is exclusively its own — a bug that can go unnoticed for a long time before it corrupts something visibly.

int *p = malloc(sizeof(int)); free(p); *p = 5; is exactly this: p still holds the old address after free, and writing through it is undefined behaviour, however innocuous it may look.

A double free is calling free on the same block twice (through the same pointer, or through two different pointers that happen to hold the same address). The heap allocator's internal bookkeeping typically treats the first free as returning the block to a list of free space; a second free on the same address corrupts that bookkeeping — the allocator may hand out overlapping memory to two unrelated parts of the program afterward, a serious and hard-to-diagnose bug. The standard fix is to set a pointer to NULL immediately after freeing it, so that a subsequent accidental free(p) becomes the harmless free(NULL) case rather than a genuine double free.

KEY: Leak — you lost the pointer while the memory was still allocated. Dangling — you kept the pointer after the memory was freed. Double free — you freed the same block twice. All three are consequences of the same underlying fact: malloc and free do not track how many pointers exist to a block, or update any of them; the programmer alone is responsible for making sure exactly one free happens, after every pointer to that block has stopped being used.

ALLOCATING A 2D ARRAY DYNAMICALLY

A fixed-size 2D array, int a[R][C];, cannot have R or C chosen at runtime (in standard, portable C89-style code) because the compiler must know the total size to reserve at compile time. Two genuinely different techniques build a 2D structure dynamically, and they were previewed in the "why int** is not a 2D array" section above — here is how each is actually built.

[[FIG:dyn2d-pds]]

Method one: an array of independently allocated rows.

1. Allocate an array of R pointers: int **a = malloc(R * sizeof(int*));. This block holds R addresses, not yet pointing anywhere useful.
2. For each row index i from 0 to R − 1, allocate that row's own block of C ints: a[i] = malloc(C * sizeof(int));.
3. Now a[i][j] works exactly like ordinary 2D indexing, but it is really two separate pointer dereferences under the hood: a[i] reads the i-th stored address (a genuine memory access, unlike the pure arithmetic a real 2D array uses), and [j] then indexes into that row.
4. Freeing requires undoing both allocations in the right order: free each row first, a[i] for every i, and only after every row has been freed, free(a) itself — freeing a first would lose the only remaining pointers to the individual rows, leaking every one of them.

This method's rows are not guaranteed to be adjacent in memory — each malloc(C * sizeof(int)) may land anywhere the allocator finds space — so it costs one extra pointer dereference per access compared to a genuine 2D array, and R + 1 separate allocations (and exactly that many frees) instead of one.

Method two: one contiguous block, indexed by hand or by a row-pointer type.

int *a = malloc(R * C * sizeof(int)); allocates one single block of R * C ints, exactly mirroring how a real int a[R][C] is laid out. There is no int** here at all — a is a plain int*, and the programmer computes a[i][j]'s position explicitly, using the address formula derived earlier: element (i, j) is at a[i * C + j]. This has the real 2D array's memory layout (one contiguous block, one allocation, one free) but not its convenient a[i][j] syntax.

To get the convenient syntax back while keeping one contiguous block, declare the pointer with the row type from earlier: int (*a)[C] = malloc(R * sizeof(int[C]));. Now a is a genuine pointer-to-array-of-C-ints, exactly the type a real 2D array's name decays to, so a[i][j] works with ordinary subscripting and the compiler performs the i * C + j arithmetic for you — while the underlying memory is still one single malloc'd block, freed with one single free(a);.

STRUCTURES: LAYOUT, PADDING AND ALIGNMENT

An array groups many values of the same type; a struct groups values of possibly different types under one name, giving each a field name instead of a numeric index. struct Point { int x; int y; }; declares a type whose values each contain an x and a y, laid out one after another in memory — for two ints with no alignment complications, sizeof(struct Point) is simply 8, the sum of its members.

The complication arises because most hardware requires (or at least strongly rewards, with a large speed penalty for violating it) certain types to start only at addresses that are multiples of their own size — a requirement called alignment. A 4-byte int, on the great majority of real machines, must start at an address divisible by 4; an 8-byte double must start at an address divisible by 8; a 1-byte char has no such restriction, since every address is divisible by 1. When a struct's members do not naturally fall on their required boundaries, the compiler inserts unused padding bytes to push the next member forward to a valid address.

Work through the case where this actually bites: struct A { char c; int i; char d; }; on a machine with 1-byte char, 4-byte int, default (natural) alignment.

1. c is placed first, at offset 0. It needs no particular alignment, so it fits exactly.
2. i comes next and needs to start at an address that is a multiple of 4. Offset 1 (immediately after c) is not a multiple of 4, so the compiler inserts 3 padding bytes (offsets 1, 2, 3) before i, placing i at offset 4.
3. i occupies offsets 4 through 7 (4 bytes).
4. d comes next, at offset 8. It is a char, needing no alignment, so it fits immediately with no padding before it.
5. So far the struct spans offsets 0 through 8 — 9 bytes of actual content.
6. But the struct's OVERALL size must also be a multiple of its largest member's alignment requirement (4, for the int) — this rule exists so that if you declare an array of these structs, every element after the first still lands correctly aligned, since each element starts exactly sizeof(struct) bytes after the last. 9 is not a multiple of 4, so 3 more padding bytes are added at the end (offsets 9, 10, 11), bringing the total to 12.

sizeof(struct A) = 12, not the naively expected 6 (1 + 4 + 1) — the gap comes entirely from the two padding regions the alignment rule forces in.

[[FIG:struct-padding-pds]]

GATE TRAP: The single most common wrong answer to a struct-size question is simply summing the members' individual sizes with no padding at all — for struct A above, that gives the tempting but wrong 6. Padding exists precisely because individual member sizes do not, by themselves, determine where each member is allowed to start.

Reordering the members changes the answer without changing what information the struct holds. struct B { char c; char d; int i; }; places both chars first: c at offset 0, d at offset 1 (needing no alignment, so it fits directly after c with no gap), then i needs a multiple-of-4 offset — offset 2 is not one, so 2 padding bytes are inserted (offsets 2 and 3), placing i at offset 4, occupying offsets 4 through 7. The struct now spans exactly 8 bytes, and 8 is already a multiple of 4, so no trailing padding is needed. sizeof(struct B) = 8 — four bytes smaller than struct A, purely from grouping the small members together instead of splitting them across the large one.

REMEMBER: Compute a struct's size by laying members out in declared order, inserting padding before each member so it starts at a multiple of its own size, and finally padding the whole struct's size up to a multiple of its largest member's alignment. To minimise padding, declare members from largest alignment requirement to smallest, so nothing large ever has to wait behind something small.

The same reasoning applies to a struct with an 8-byte member. struct C { char a; double d; int b; }; places a at offset 0; d needs an 8-byte-aligned offset, so offsets 1 through 7 (7 bytes) are padding, placing d at offset 8, occupying 8 through 15; b (4-byte int) needs a 4-byte-aligned offset, and 16 already qualifies, so b occupies 16 through 19 with no padding before it; the running total is 20 bytes, which must be rounded up to a multiple of 8 (the struct's largest alignment requirement), forcing 4 trailing padding bytes and a final size of 24. Reordering to struct D { double d; int b; char a; }; places d at 0–7, b at 8–11 (already aligned), a at 12, and the running total of 13 rounds up to the nearest multiple of 8, which is 16 — 8 bytes saved purely by ordering largest-alignment-first.

ACCESSING STRUCT MEMBERS: . AND ->

Given a struct value (not a pointer to one), the . operator reaches a named member directly: struct Point pt; pt.x = 3; treats pt.x exactly like any ordinary variable of x's type, because pt.x IS the bytes at pt's address plus x's offset within the struct, interpreted as x's type — the same "address plus type" idea that explained ordinary variables at the very start of this chapter, just with the offset added in.

Given a pointer to a struct instead, reaching a member requires first dereferencing the pointer to get the struct itself, and then applying . — written out fully as (*p).x. The parentheses are mandatory here because . binds tighter than unary *, so without them p.x would (incorrectly) try to apply . directly to the pointer, treating p as though it were the struct rather than a pointer to one. Because this pattern — dereference then dot — is used so constantly (essentially every time a struct is accessed through a pointer, which is the normal way structs are passed around and linked together), C provides -> as a direct shorthand: p->x means exactly (*p).x, no more and no less.

KEY: p->x is defined as (*p).x. There is no separate mechanism behind the arrow — it exists purely because dereference-then-dot is so common that writing the parentheses every time would be tedious and error-prone.

SELF-REFERENTIAL STRUCTS AND LINKED NODES

A struct can contain a pointer to its own type, and this single fact is the entire foundation of every linked structure covered in the data structures syllabus that follows this chapter — linked lists, trees, and graphs are all, at bottom, structs like this one, connected by pointers.

struct Node { int data; struct Node *next; };

This compiles even though struct Node's own definition is not yet complete at the point next is declared, because next is only a pointer — and a pointer's size (4 or 8 bytes, fixed for any pointer type on a given machine) does not depend on the size of what it points to. The compiler knows how big a struct Node* is without yet knowing how big a complete struct Node will turn out to be, so no circularity is actually required to resolve. (By contrast, struct Node { int data; struct Node next; }; — trying to embed a whole Node inside itself, with no pointer — genuinely is circular and does not compile: a Node would need to contain a Node would need to contain a Node, with no base case, and no finite size could ever be computed.)

Building a two-node list by hand shows exactly what next does. struct Node *head = malloc(sizeof(struct Node)); head->data = 10; head->next = malloc(sizeof(struct Node)); head->next->data = 20; head->next->next = NULL; creates two heap-allocated nodes: head points at the first, whose next field holds the address of the second, whose own next field holds NULL, marking the list's end. Walking the list — for (struct Node *cur = head; cur != NULL; cur = cur->next) — is nothing but following one address to the next, exactly the pointer-chasing skill built up throughout this chapter, now applied to a structure the program builds one piece at a time instead of one the compiler laid out in one contiguous block.

STRUCTS AS FUNCTION ARGUMENTS, AND ARRAYS OF STRUCTS

Passing a struct to a function by value — void f(struct Point p) — copies the entire struct into the parameter, exactly as passing an int by value copies that int: every member is duplicated, changes inside f to p's members never reach the caller's original struct, and for a large struct this copy is genuinely expensive, potentially copying hundreds of bytes on every call. Passing a pointer instead — void f(struct Point *p) — copies only the pointer (4 or 8 bytes, regardless of how large the struct is), and lets f reach and modify the caller's actual struct through p->x, p->y — the same by-value-of-the-address reasoning already used to explain why passing an array (which decays to a pointer) lets a function modify the caller's elements, while passing a plain int does not.

struct shift(struct Point p, int dx) { p.x += dx; return p; } compiles and runs, but only ever modifies its own local copy p; the caller must capture the returned (also copied) struct to see any change: pt = shift(pt, 5);. void shiftInPlace(struct Point *p, int dx) { p->x += dx; } modifies the caller's struct directly, with no return value needed, because p holds the caller's own address.

An array of structs — struct Point pts[3]; — is laid out exactly like an array of any other type: three copies of struct Point's full layout (padding included), placed contiguously, so pts[i] is found by the same address(a[i]) = base + i * sizeof(element) formula from the very start of this chapter's discussion of arrays, with sizeof(element) now meaning the padded size of the whole struct. Passed to a function, struct Point *pts (or struct Point pts[]) decays exactly like any other array parameter, requiring the element count to be passed alongside it if the function needs to know how many elements there are — no new rule is needed here at all; arrays of structs obey every array rule already derived, simply with a larger, possibly padded element size.

UNIONS

A union looks like a struct syntactically — union U { char c; int i; double d; }; — but its members do not get separate, non-overlapping storage; every member of a union shares the exact same starting address, and the union's total size is only just large enough to hold its single largest member (rounded up, if necessary, to satisfy that largest member's own alignment requirement). Writing to one member and then reading a different one reads back the same bytes, reinterpreted according to the second member's type — which is either a deliberate technique (reinterpreting the same bits as different types, used in some low-level and embedded code) or, if done carelessly, a straightforward bug, since the standard only guarantees the value of whichever member was written to MOST RECENTLY.

sizeof(union U) above is the size of its largest member — double, 8 bytes — possibly rounded up further if the union itself needs to satisfy an enclosing alignment requirement, though here 8 already satisfies double's own 8-byte alignment, so sizeof(union U) is exactly 8. Compare this directly against a struct with the identical members, struct S { char c; int i; double d; }; whose size (following the padding derivation above) would be substantially larger, because a struct reserves separate space for every member simultaneously, while a union reserves space for only whichever one member is largest.

KEY: A struct's members each get their own space, so its size is (at least) the sum of its members plus padding. A union's members all share one space, so its size is just the size of its largest member (plus, if needed, padding to that member's own alignment) — the two are complete opposites, despite the near-identical declaration syntax.

TYPEDEF

typedef introduces a new name for an existing type, purely for readability and convenience — it does not create a genuinely new type with different behaviour, only an alias. typedef unsigned long ulong; lets ulong be used anywhere unsigned long could be, meaning exactly the same thing to the compiler.

typedef is especially valuable for the more elaborate declarations this chapter has built up, where the right-left rule, though mechanical, produces syntax that is easy to misread at a glance. typedef struct Node { int data; struct Node *next; } Node; gives the struct a shorter usable name, Node, so that later code can write Node *head; instead of struct Node *head; — the struct's own internal tag name (Node, right after the struct keyword) is still needed inside the struct's own definition, to let next refer to it self-referentially, but everywhere else only the typedef'd name is needed.

typedef int (*Cmp)(const void *, const void *); is the pattern most worth internalising, because it turns the awkward function-pointer syntax from the right-left rule section into an ordinary-looking type name: once declared, Cmp can be used exactly like int or char* — Cmp comparator;, or a parameter written as int mySort(int *arr, int n, Cmp cmp) — without the reader needing to re-derive the pointer-to-function reading every time it appears.

FUNCTION POINTERS AND CALLBACKS

A function, like an array, decays: in most expressions a function's name converts to a pointer to that function, exactly parallel to the way an array name converts to a pointer to its first element. int add(int a, int b) { return a + b; } gives add, used as a value (rather than called with parentheses), the type "pointer to function taking two ints and returning int" — writing &add explicitly is equivalent, since the decay already produces a pointer.

int (*f)(int, int) = add; stores that pointer in f, using the exact declaration shape derived under the right-left rule earlier (the parentheses around *f are what make this a pointer to a function, rather than — without them — a declaration of a function returning int*). Calling through it, f(2, 3), invokes add(2, 3), returning 5; the explicit form (*f)(2, 3) means the identical thing, since calling either a function or a pointer-to-function with the same syntax is deliberately made interchangeable in C.

An array of function pointers builds a dispatch table — a way to select which function to call using an ordinary index instead of a chain of if/else: int (*ops[3])(int, int) = { add, sub, mul }; declares ops as an array of 3 function pointers (the [3] binds to ops before the * does, by the same rule governing int *a[10] earlier), each initialised to one of three functions with matching signatures. ops[0](3, 4) calls add(3, 4); ops[2](3, 4) calls mul(3, 4) — the index chooses the operation entirely at runtime, which is exactly how a calculator, a state machine's transition table, or a virtual-call mechanism in a language without built-in polymorphism is implemented.

The standard library's qsort is the canonical real use of a function pointer as a parameter: void qsort(void *base, size_t nmemb, size_t size, int (*compar)(const void*, const void*));. qsort has no idea what type of data it is sorting — that is exactly why base is void* and size must be given explicitly, mirroring the reasoning behind void* from earlier — so it cannot know how to compare two elements itself. Instead, the caller supplies a comparator function: compar(a, b) must return negative if the element at a should sort before the element at b, positive if after, and zero if they are equivalent. qsort calls this function itself, as many times as its sorting algorithm requires, treating it as a callback — a function the caller hands over to be invoked later, by different code, rather than called directly.

int cmpInts(const void *a, const void *b) { int x = *(const int*)a, y = *(const int*)b; return x - y; } is the standard comparator for sorting an array of ints ascending: qsort receives each pair of elements to compare as void*, so the comparator must first cast them back to the real type (const int*) before dereferencing — exactly the cast-then-dereference discipline established when void* was introduced — and returning x - y gives a negative, zero, or positive result matching the required convention directly from ordinary integer subtraction.

GATE TRAP: A question defines int (*ops[3])(int, int) and then, part-way through, reassigns one entry using an index computed by CALLING one of the function pointers as part of that same expression — for instance fp = ops[fp(1, 1) - 1];. C evaluates the entire right-hand side, including any function calls embedded in it, using fp's value BEFORE the assignment takes effect; the assignment only happens once the whole right-hand side has been fully computed. A question relying on this is testing evaluation order, not function pointers as such — trace what fp still equals at the moment the call inside the brackets happens, not what it is about to become.

THE CLASSIC OUTPUT-PREDICTION TRAPS

A handful of expression shapes recur across nearly every "what does this print" question in this topic, and each one is resolved by the same discipline: work out precedence and evaluation order explicitly, never by the shape the expression "looks like" it should mean.

*p++ versus (*p)++ versus *++p. Postfix ++ binds tighter than unary *, so *p++ parses as *(p++): p++ as a whole expression evaluates to p's OLD value (that is what postfix increment returns), and it is that old value that gets dereferenced — meanwhile, as a side effect, p itself is advanced to point one element further along. Net effect: you read the CURRENT element and move the pointer forward for next time, in one statement. (*p)++, by contrast, uses explicit parentheses to force the dereference first: it fetches the current pointed-to VALUE and increments that value in place — the pointer p itself never moves. *++p reads differently again: prefix ++ increments p FIRST (moving the pointer to the next element before anything else happens), and only then is the new location dereferenced — so this both advances the pointer and reads the NEW element it now points to, never the one it started on.

int a[] = {5, 10, 15}; int *p = a; (*p)++; p++; printf("%d %d", a[0], *p); traces as: (*p)++ increments a[0] in place (5 becomes 6; p still points at a[0]); p++ then moves p to a[1] (no value changes); the final printf reads a[0] (now 6) and *p (a[1], still 10) — output "6 10".

p = &a[0]; p[2]; is simply the a[i] equivalence from earlier applied to a pointer rather than the array name directly: p[2] means *(p + 2), and since p holds a[0]'s address, that is exactly a[2] — pointer indexing behaves identically whether the pointer is the decayed array name itself or a separate pointer variable that was assigned the same starting address.

char* vs char[] modification, and sizeof on a pointer versus an array, both inside and outside functions, were derived in full above — the first distinguishes writable stack storage from a read-only literal, the second distinguishes an array's true full size (visible only in the scope where it was actually declared as an array) from a decayed pointer's fixed size (visible the instant that same array crosses into a function parameter, or is otherwise stored in a pointer variable).

Pointer arithmetic on int** deserves one more explicit worked case, because it is easy to conflate with 2D-array row-stepping despite looking similar on the page. int a = 1, b = 2, c = 3; int *arr[3] = {&a, &b, &c}; int **p = arr; p++; — here p is a pointer to a pointer, initialised to arr's first element's address (arr itself decays to int**, since arr is an array of int pointers). p++ advances p by one step of WHATEVER p points to, which is an int* — so p moves by sizeof(int*) bytes, landing on arr[1] (the slot holding &b), not by sizeof(int) and not by a whole row the way a genuine 2D-array row-pointer would. **p at this point dereferences twice: *p is arr[1], namely &b, and *(*p) is b itself.

WORKED PROBLEMS

Each of these follows the exact shapes GATE uses. Work through every step; do not skip to the answer.

1. Two-dimensional address computation. int a[5][6]; is stored row-major with 4-byte ints, and the array begins at address 2000. Find the address of a[3][4].
   Using address(a[i][j]) = base + (i · C + j) · sizeof(element) with C = 6: the element offset is i · C + j = 3 · 6 + 4 = 22. The byte offset is 22 · 4 = 88. The address is 2000 + 88 = 2088.

2. Struct size with padding. On a machine with 1-byte char, 4-byte int, 8-byte double, and natural alignment, find sizeof(struct S) for struct S { char a; double b; short c; };, given a 2-byte short aligned to 2 bytes.
   a is placed at offset 0. b (double, needs 8-byte alignment) cannot start at offset 1, so 7 padding bytes are inserted (offsets 1–7), placing b at offset 8, occupying 8–15. c (short, needs 2-byte alignment) can start at offset 16 with no padding, occupying 16–17. Running total: 18 bytes. The overall size must be a multiple of the struct's largest alignment requirement, 8 (from the double); 18 is not a multiple of 8, so 6 trailing padding bytes are added, giving a final size of 24.

3. The *p++ family. int a[4] = {1, 2, 3, 4}; int *p = a; int x = *p++; int y = (*p)++; int z = *++p; printf("%d %d %d %d", x, y, z, a[1]);
   x = *p++: postfix binds tighter, so this reads *p (a[0] = 1) into x, THEN advances p to a[1]. x = 1; p now points at a[1] (value 2).
   y = (*p)++: parentheses force dereference first — the CURRENT value at p (a[1] = 2) is read into y and then a[1] itself is incremented in place. y = 2; a[1] becomes 3; p is unchanged, still pointing at a[1].
   z = *++p: prefix increments p first, moving it from a[1] to a[2] (value 3), and dereferences the new location. z = 3; p now points at a[2].
   Final values: x = 1, y = 2, z = 3, a[1] = 3 (updated by the (*p)++ step). Output: "1 2 3 3".

4. A string function output. char s[20] = "abcxyz"; char *p = s; int count = 0; while (*p) { if (*p >= 'a' && *p <= 'z') count++; p++; } printf("%d %lu", count, strlen(s));
   The loop walks p from s[0] through each character until it reaches the terminating '\\0', counting lowercase letters. "abcxyz" is 6 characters, all lowercase, so count reaches 6 when the loop stops (the terminator itself is not counted, since the while condition *p is false there). strlen(s) independently walks the same string the same way, also stopping at the terminator, and returns the same count of characters, 6. Output: "6 6" — count and strlen agree here only because every character in this particular string happens to be a lowercase letter; in general they measure different things and need not match.

5. Array-decay sizeof question. Assume sizeof(int) = 4 and sizeof(a pointer) = 8. Given: void f(int arr[10]) { printf("%lu ", sizeof(arr)); } int main() { int a[10]; printf("%lu ", sizeof(a)); f(a); }
   sizeof(a) in main is evaluated in the scope where a is a genuine array — none of sizeof's three decay exceptions apply anywhere else, but sizeof itself IS one of those exceptions, so it reports the whole array's true size: 10 · 4 = 40. Inside f, the parameter declared as int arr[10] is silently rewritten by the compiler to a plain int *arr — the [10] carries no weight in a parameter list — so sizeof(arr) there reports the size of a pointer, 8, entirely regardless of the 10-element array that was actually passed in. Output: "40 8 ".

6. Dynamic-allocation bug identification. Identify the bug: int *makeArray(int n) { int arr[n]; for (int i = 0; i < n; i++) arr[i] = i * i; return arr; }
   arr is declared as a local array, which is allocated on the function's stack frame. When makeArray returns, its stack frame is torn down and that memory becomes free to be overwritten by whatever the program calls next — but the function returns arr, which decays to a pointer to that now-invalid memory. The caller receives a dangling pointer to storage that no longer belongs to anything, and any use of it is undefined behaviour, even though the returned address is not NULL and the bug produces no immediate error. The fix is to allocate the array on the heap instead, where it survives the function's return: int *arr = malloc(n * sizeof(int)); ... return arr; — with the caller now responsible for eventually calling free on the returned pointer.

7. Fork-free trace: multi-level pointer arithmetic. int a = 1, b = 2, c = 3; int *arr[3] = {&a, &b, &c}; int **p = arr; *p = &c; **(p + 1) = 99; printf("%d %d %d", a, b, c);
   p is initialised to point at arr[0] (which holds &a). *p = &c reassigns arr[0] itself (since *p names arr[0], the object p points to) to now hold &c instead of &a — a is now unreferenced by arr, but its own value is untouched, still 1. p + 1 points at arr[1] (still holding &b, since only arr[0] was touched); *(p + 1) is arr[1], namely &b; **(p + 1) dereferences that to reach b itself, and setting it to 99 makes b = 99. c is never written to directly, only pointed at by the now-redirected arr[0], so c remains 3. Final values: a = 1, b = 99, c = 3.

WHAT TO CARRY INTO THE NEXT CHAPTER

Every structure the syllabus builds from here — a linked list's chain of nodes, a stack or queue implemented over an array or over pointers, a tree's left and right children, a graph's adjacency structure — is one of exactly two things covered in this chapter, combined: a struct holding a self-referential pointer, or an array indexed by the address arithmetic derived here. Reading list-manipulation code will mean tracing pointer chains exactly as done above for pointer-to-pointer; reasoning about a structure's memory cost will mean applying the struct-padding derivation to whatever fields that structure carries. Nothing in the rest of the syllabus introduces a new kind of memory access — only new shapes built out of these two.
`
};
