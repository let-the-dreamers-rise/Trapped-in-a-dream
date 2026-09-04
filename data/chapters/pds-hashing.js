// Textbook chapter: Hashing.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/pds.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure — here the two figures already defined on the
// pds-hashing topic (chain-vs-open, probe-seq) are reused, so no new figs are
// drawn in this file.

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['pds-hashing'] = {
  figs: [],
  text: `
WHAT THIS CHAPTER IS FOR

You now have three ways to store a set of keys. An unsorted array or linked list gives O(1) insertion but O(n) search — you must walk every element to know if something is present. A balanced binary search tree, the subject of the last chapter but one, gives O(log n) search, insert and delete by keeping the keys in order. A heap gives O(log n) access to the minimum but tells you nothing about an arbitrary key.

Hashing asks a sharper question: if we do not care about order at all — if all we want is "is key k present, and if so what is stored with it" — can we do better than O(log n)? The answer is yes, in the average case: O(1). This chapter builds that claim from the ground up, shows exactly where it can fail, and gives you the machinery to compute precisely how well or badly a given hash table will behave.

The price is that a hash table remembers nothing about order — you cannot ask it for the smallest key, or the keys between 10 and 20, the way a BST can. Hashing and balanced trees are answers to different questions asked of the same data, and knowing which question you are actually being asked is half of using either one correctly.

THE DICTIONARY PROBLEM

Strip away every data structure you know and ask what the underlying task actually is. You have a collection of keys — student roll numbers, variable names, IP addresses — and you want to support three operations: insert a key (with some associated data), search for a key (does it exist, and what is attached to it), and delete a key. This is called the dictionary problem, and essentially all of data structures is different answers to it under different constraints.

An unsorted array answers it with O(1) insert (append to the end) but O(n) search and delete (you must scan to find the key first). A sorted array flips this: O(log n) search via binary search, but O(n) insert and delete, because inserting in the middle means shifting every element after it. A balanced BST gets all three operations to O(log n) by keeping just enough order to binary-search while allowing local restructuring on insert and delete.

Hashing's ambition is to beat O(log n). The insight is that a BST's O(log n) comes specifically from comparing the key against other keys to decide which way to go — it is fundamentally a decision process, and with n items to distinguish, at least log n comparisons are needed to narrow down to one, exactly the same argument that lower-bounds comparison sorting. Hashing sidesteps this entirely: instead of comparing the key to other keys, it computes something directly FROM the key that tells you where to look. No comparisons against other keys are needed to find the neighbourhood; you compute an address and go straight there.

speedup over comparison-based search: O(log n) → O(1) average

KEY: The dictionary problem is insert, search and delete on a set of keys with no ordering requirement. Hashing solves it in expected O(1) by computing an address from the key itself, rather than comparing it to other stored keys the way a BST must.

DIRECT ADDRESSING: THE IDEA BEFORE THE PROBLEM

Before building a real hash table, look at the cleanest possible version of "compute an address from the key," because it shows exactly what has to be given up to make hashing practical.

Suppose the keys are guaranteed to be integers from a small, known range — say roll numbers 0 to 199 in a class of 200 students. Then you can simply allocate an array of 200 slots and store the data for roll number k directly at index k. To insert, write to slot k. To search, read slot k. To delete, clear slot k. Every operation is a single array access: exactly O(1), not merely on average but always, and with no collisions possible, because two different keys can never want the same slot.

This is called direct addressing, and it is not a compromise — it is the ideal. The only reason it is not used everywhere is the assumption it rests on: the universe of possible keys, call it U, must be small enough that an array of size |U| is affordable, and every key must map to a distinct, known small integer.

That assumption breaks almost immediately in practice. If the key is a 32-bit integer, |U| is about four billion; an array with four billion slots to store, say, 500 phone numbers wastes essentially all of it. If the key is a string — a variable name, a URL — there is no small integer address at all; U is not even naturally an integer range. Direct addressing needs |U| to be both known and small, and real keys almost never satisfy that.

REMEMBER: Direct addressing is hashing with the "compute an address" step made trivial (address = key) and the "handle collisions" step made unnecessary (every key gets its own slot). It fails only because it needs one array slot per POSSIBLE key, not per ACTUAL key, and the universe of possible keys is usually vastly larger than the number of keys you will ever store.

Hashing keeps direct addressing's core move — compute an address, do not compare — but fixes the wasted-space problem by mapping the large universe U down to a small table of size m, where m is close to the number of keys you actually expect to store, not the number that could theoretically exist. That compression is what a hash function does, and it is also exactly what creates the possibility of two different keys landing on the same address — a collision. Everything from here on is: how do you compress well, and what do you do when two keys collide anyway.

WHAT A HASH FUNCTION MUST DO

A hash function h takes a key k, from the large universe U, and produces an integer in the small range 0 to m−1 — a slot index in a table of size m.

h : U → {0, 1, 2, ..., m−1}

Three requirements make a hash function usable at all, and it is worth being explicit about each, because each one is violated by a plausible-looking bad choice.

First, it must be deterministic: the same key must always produce the same slot, every time it is computed, or a key you inserted could never be found again by searching for it.

Second, it must be fast to compute — ideally O(1) in the size of the key, or close to it — because the entire point of hashing is to avoid the cost of comparisons, and a hash function that costs as much as a comparison-based search defeats its own purpose.

Third, and hardest to guarantee, it must spread keys uniformly over the m slots. If every key you will actually insert happens to map to the same few slots, hashing degenerates into exactly the linked-list behaviour it was meant to avoid — O(n) search, because everything piles into one place. A hash function is judged almost entirely by how well it achieves this spread for the KIND of keys it will actually see, not by any property of the function in the abstract.

GATE TRAP: A hash function does not have to be one-to-one, and it is not "broken" when two different keys map to the same slot — that is a collision, expected and handled by the schemes in this chapter, not a defect in the hash function. A hash function IS defective, though, if it maps unequal SHARES of the key space to different slots when the actual keys are drawn in a way that lands disproportionately on the smaller share — the failures below are exactly that.

THE DIVISION METHOD

The simplest and most common hash function is the division method:

h(k) = k mod m

Take the key, divide by the table size, keep the remainder. It costs one division, satisfies determinism and speed immediately, and the only question is how well it spreads keys — which turns entirely on the choice of m.

Walk through why m matters by looking at what goes wrong with a bad choice. Suppose m = 6 and the keys that actually arrive are 12, 18, 24, 30, 36 — all multiples of 6, which happens whenever keys come from a source with some built-in structure (measurements taken every 6 units, memory addresses aligned to a boundary, IDs assigned in batches).

12 mod 6 = 0, 18 mod 6 = 0, 24 mod 6 = 0, 30 mod 6 = 0, 36 mod 6 = 0 — every single key lands on slot 0. Slots 1 through 5 are never touched. The table has degenerated into one long chain (or one long linear-probing run) holding all n keys, exactly the O(n) behaviour hashing exists to prevent. The failure is not the division method itself; it is that m shared a common factor (6) with every key, so the remainder is forced to repeat.

GATE TRAP: This is not a rare edge case to memorise as a curiosity — it is the general reason table sizes are chosen carefully. Any m that shares a common factor d > 1 with a noticeable fraction of the actual keys will send all of those keys to only m/d of the slots, wasting the rest. Prime m minimizes the chance that a structured key set shares such a factor, because a prime has no factors to share except itself and 1.

WHY THE TABLE SIZE SHOULD BE PRIME, NOT A POWER OF TWO

Powers of two are a tempting table size because they make the mod operation cheap on a computer (k mod 2^p is just "keep the low p bits" — a bitwise AND, no division circuit needed). This convenience is exactly the trap. Derive what it costs.

Write any key k in binary. If m = 2^p, then k mod m depends ONLY on the lowest p bits of k — every bit of k above position p is completely discarded by the remainder operation, because 2^p, 2^(p+1), 2^(p+2), and so on are all exact multiples of m and contribute nothing to the remainder.

1. Write k in binary as (higher bits)(lowest p bits).
2. k = (higher bits) × 2^p + (lowest p bits).
3. k mod 2^p = ((higher bits) × 2^p) mod 2^p + (lowest p bits) mod 2^p.
4. The first term is exactly 0, because it is a multiple of 2^p.
5. So k mod 2^p = lowest p bits of k, exactly — the higher bits play no role at all.

This is fine if the low-order bits of your actual keys are as good as random. It is a disaster if they are not, and in practice they often are not: pointers and memory addresses are commonly aligned to 4 or 8 bytes, so their lowest 2 or 3 bits are always zero; IDs handed out in sequence differ mostly in their low bits by design (which is USEFUL structure being thrown away, not noise); sensor readings taken at fixed intervals share low-bit patterns. Any of these, hashed with m a power of two, collapses onto a small fraction of the table exactly as the multiples-of-6 example did — except now it happens for a huge range of ordinary, non-adversarial key sets, not just a contrived one.

A prime m forces the remainder computation to depend on the WHOLE key, not a slice of it, because there is no way to split k into "a multiple of m" plus "the low part" the way there was for a power of two — a prime has no such structure to exploit. This is why textbooks and this syllabus insist on prime table sizes for the division method: it is not superstition, it is the direct fix for a derivable failure mode.

KEY: h(k) = k mod m with m a power of two only ever looks at the low-order bits of k. If those bits are not uniformly random for your actual keys — and for addresses, aligned data, and sequential IDs they usually are not — most of the table sits empty while one region absorbs everything. Choosing m prime (and not close to a power of two or ten) is the standard fix.

THE MULTIPLICATION METHOD

The division method's weakness is that it is sensitive to patterns in k because it uses k directly, once, in one arithmetic operation. The multiplication method spreads the key's influence out first, by multiplying it by an irrational-like constant and using the FRACTIONAL part of the result — a step deliberately designed to mix all of the key's bits together before an index is read off.

h(k) = ⌊ m · (k·A mod 1) ⌋

Read this left to right. Multiply k by a constant A, 0 < A < 1. Take k·A mod 1 — meaning throw away the integer part and keep only the fraction, a number strictly between 0 and 1. Multiply that fraction by m and take the floor: since the fraction is between 0 and 1, this always lands in {0, 1, ..., m−1}, exactly the range a slot index needs.

Donald Knuth's suggested choice for A, and the one this method is normally quoted with, is

A ≈ 0.6180339887 (the fractional part of the golden ratio)

This value is chosen because it is famously "hard to approximate well by fractions with small denominators" (a property of the golden ratio from continued-fraction theory), which in practice means multiplying by it scrambles the fractional part thoroughly regardless of what patterns k had — unlike the division method, no single small factor of m can conspire with a pattern in k to collapse the spread, because A's irrational-like behaviour is unrelated to m entirely (m does not even need to be prime for this method, which is one of its practical attractions).

Work a concrete example. Let k = 17, m = 10, A = 0.6180339887.

1. Compute k·A = 17 × 0.6180339887 = 10.5065778...
2. Take the fractional part: 10.5065778... mod 1 = 0.5065778...
3. Multiply by m: 10 × 0.5065778... = 5.065778...
4. Floor it: ⌊5.065778...⌋ = 5.

So h(17) = 5 under the multiplication method with this A and m = 10. Notice that unlike the division method, m plays no role in the mixing step at all — it is applied only at the very end, to rescale into the right range — so the choice of m does not need to be prime for this method to spread keys well.

MID-SQUARE AND FOLDING

Two older, simpler ideas achieve a similar mixing effect and are worth knowing because they appear by name.

Mid-square hashing squares the key and reads off the middle digits of the result. Squaring a number depends on ALL of its digits (unlike just taking a remainder, which as shown above can depend on only a few), so the middle digits of the square tend to depend on the whole key, giving a reasonably scrambled result cheaply.

Example: k = 44, table needs 2-digit addresses (m = 100). k² = 1936. The middle two digits of 1936 are "9" and "3" — read as 93. So h(44) = 93.

Folding splits the key into equal-sized pieces, adds the pieces together, and uses the sum (reduced mod m if needed) as the hash. It is used when the key is long — many digits, or a large number — and a single arithmetic operation on the whole thing would be expensive or would let one part of the key dominate.

Example: k = 123456789, split into groups of three digits: 123, 456, 789. Sum: 123 + 456 + 789 = 1368. If the table has m = 1000 slots, reduce: 1368 mod 1000 = 368. So h(123456789) = 368 by folding.

Both methods share the same goal as the multiplication method: make the hash value depend on as much of the key as possible, so that structure in one part of the key cannot dominate the result.

HASHING STRINGS

None of the methods above directly apply to a string — "apple" is not a number to take mod m of. The standard technique is a polynomial rolling hash: treat the string as a sequence of digits in some base p, and evaluate it as a number.

h(s) = ( s[0]·p^(n−1) + s[1]·p^(n−2) + ... + s[n−1]·p^0 ) mod M

Here s[0], s[1], ... are the numeric codes of the characters (ASCII or similar), p is a chosen base, and M is a chosen modulus. Two design choices decide whether this is a good hash function or a bad one, and both are frequently got wrong.

The base p must be at least as large as the size of the character set (so, for lowercase letters, p should be a prime bigger than 26, commonly 31 or 37). If p were smaller than the alphabet, or badly chosen, distinct short strings could evaluate to the same polynomial value even before any modulus is taken, purely from how the positional weights combine — the base is doing the same job here that it does in ordinary positional number systems, where base 10 needs ten distinct digits 0–9 to represent numbers uniquely.

The modulus M must be large — commonly a prime close to 10^9 or larger — for two reasons. First, a small M throws away information the same way a small table did in the division method: two different strings that are equal mod a small M will collide even if their true polynomial values were nowhere near each other. Second, M should not share structure with p (choosing p and M both prime, and different, is the standard safeguard) for the same reason m and the keys should not share a factor in the division method — shared structure between p and M can make certain families of strings collide systematically rather than by chance.

1. Read the string left to right.
2. Multiply the running total by the base p.
3. Add the numeric value of the next character.
4. Reduce mod M after each step, to keep the running total from growing without bound as longer strings are processed.
5. The final running total is h(s).

This is called "rolling" because, if you need to hash every substring of a fixed length as a window slides across a long text (the technique behind the Rabin–Karp string-matching algorithm, met in the algorithms syllabus), the hash of the next window can be computed from the hash of the current one by removing one term and adding another, in O(1), rather than recomputing the whole polynomial from scratch.

COLLISIONS ARE INEVITABLE

However good the hash function, collisions cannot be avoided in general, and this is worth proving rather than asserting, because it changes what you should expect from a hash table.

The universe of possible keys U is, in every realistic case, larger than the table size m — often vastly larger (four billion 32-bit integers into a table of a few thousand slots, say). By the pigeonhole principle, if you consider ALL |U| possible keys, at least two of them MUST map to the same slot, because there are more keys than slots to receive them. A hash function that avoided this entirely (a true one-to-one mapping) would need |U| ≤ m, which defeats the entire purpose of compressing a large universe into a small table.

So collisions are not a symptom of a poorly chosen hash function; they are a mathematical certainty once |U| > m, for ANY hash function whatsoever. What a good hash function controls is not WHETHER collisions happen across the whole universe, but how EVENLY they are spread among the keys you actually insert — and, sharper still, HOW SOON you should expect the first one, which turns out to be a much smaller number of keys than intuition suggests.

THE BIRTHDAY PARADOX IN A HASH TABLE

Suppose a hash function spreads keys uniformly at random over m slots (the standard "simple uniform hashing" assumption used throughout this chapter). How many keys can you insert before you should expect a collision? Intuition says "close to m" — but this is exactly the birthday paradox, and the real answer is much smaller.

The probability that n keys, hashed uniformly at random into m slots, produce NO collision at all is the probability that each successive key avoids every slot already taken by an earlier one:

P(no collision) = (1 − 1/m)(1 − 2/m)(1 − 3/m) ··· (1 − (n−1)/m)

Work a concrete case: m = 20 slots, n = 5 keys.

1. P(no collision) = (1 − 1/20)(1 − 2/20)(1 − 3/20)(1 − 4/20)
2. = 0.95 × 0.90 × 0.85 × 0.80
3. = 0.855 × 0.85 × 0.80 (multiplying the first two)
4. = 0.72675 × 0.80
5. = 0.5814

So with only 5 keys in a 20-slot table — a load factor of just 0.25 — there is already a 1 − 0.5814 ≈ 41.9% chance of at least one collision. This is far higher than the "5 out of 20, mostly empty" picture suggests, and it is the same arithmetic that makes 23 people enough for better-than-even odds that two share a birthday out of 365 days, even though 23 is nowhere near 365.

Using the approximation ln(1−x) ≈ −x for small x, setting P(no collision) ≈ 0.5 gives the standard birthday-paradox rule of thumb: the number of keys at which a collision becomes about as likely as not is roughly

n ≈ 1.18 · √m

For m = 365 this gives n ≈ 1.18 × 19.1 ≈ 22.5, matching the classic birthday-problem answer of 23 people. For a hash table with m = 1000 slots, n ≈ 1.18 × 31.6 ≈ 37 — meaning you should expect a first collision after inserting only about 37 keys into a 1000-slot table, at a load factor under 4%.

KEY: Collisions are not a sign that a hash table is nearly full. By the birthday-paradox argument, the expected number of insertions before the FIRST collision is only on the order of √m, not m. A hash table must be designed, from the very first few insertions, to handle collisions correctly — not treated as an edge case that only matters once the table is nearly full.

LOAD FACTOR

Every formula in the rest of this chapter is expressed in terms of one number, so define it precisely before going further. The load factor is

α = n / m

where n is the number of keys currently stored and m is the number of slots in the table. It is always keys divided by slots, never inverted — a table with 7 keys in 10 slots has α = 0.7, meaning on average 0.7 keys per slot.

Load factor is the single parameter that governs expected performance because it is exactly what the hash function's uniform-spreading assumption turns into a number: if n keys are spread evenly over m slots, each slot holds about α keys on average, and every cost formula below — for chaining and for open addressing alike — is a function of α and nothing else. This is also why the two families of collision resolution place a different hard constraint on α, which the next two sections build up to.

SEPARATE CHAINING

The most direct way to handle a collision is to not fight it: let each slot hold not one key but a whole linked list — a "chain" — of every key that has ever hashed to it. This is separate chaining.

[[FIG:chain-vs-open]]

To insert a key k, compute h(k), and prepend a new node to the front of the linked list at slot h(k). Because prepending to a linked list is O(1) regardless of how long the list already is, insertion under chaining is O(1) always — not just on average, and not degrading as the table fills. This is chaining's single biggest structural advantage over the open-addressing schemes still to come.

To search for k, compute h(k) and walk the linked list at that slot, comparing each node's key to k, until either a match is found (successful search) or the end of the list is reached (unsuccessful search).

To delete k, search for it as above, then unlink its node from the list — an ordinary linked-list deletion, needing no special marker, unlike the tombstone machinery open addressing will require. This simplicity of deletion is chaining's other major advantage.

THE COST OF SEARCHING A CHAIN

Because chaining stores overflow in a linked list rather than in the table array itself, there is no upper limit on how many keys one slot can hold, and therefore no upper limit on α. A chaining table with n = 20 keys in m = 10 slots (α = 2) is perfectly valid; it simply means each bucket holds two keys on average. Contrast this immediately with open addressing, discussed next, where every key must occupy its own slot in the array and α can never reach 1.

REMEMBER: For separate chaining, α > 1 is not an error — it just means chains are, on average, longer than one node. There is no structural ceiling on α the way there is for open addressing; the only cost of a high α is longer average chains, which is a performance concern, not a correctness one.

Assume simple uniform hashing: each of the n keys is equally likely to land in any of the m slots, independently. Then the expected length of any one chain is exactly n/m = α, by the definition of an average — n keys spread over m equally-likely bins average α keys per bin.

An unsuccessful search — looking for a key that is not in the table — must walk the ENTIRE chain at its slot before concluding the key is absent, because there is no way to know it is missing without checking every node. The expected cost is therefore the O(1) hash computation plus the expected chain length:

Θ(1 + α) — expected cost of an unsuccessful chained search

A successful search is cheaper, and it is worth deriving why rather than just stating the smaller constant. Think about WHERE in its chain a found key tends to sit, averaged over the order keys were inserted. Since each new key is prepended to the front of its bucket's chain, a key that was inserted earlier ends up further back (deeper into the chain) than one inserted later, because everything inserted after it into the same bucket got pushed in front of it.

1. Consider a bucket that ends up with j keys in it, in the order they were inserted: the 1st, 2nd, ..., jth key inserted into that bucket.
2. After prepend-based insertion, the ith key inserted sits at position (j − i + 1) from the front (the most recently inserted key is at the front, position 1).
3. A search for the ith key inserted therefore costs (j − i + 1) comparisons.
4. Averaged uniformly over which of the j keys you search for, the expected cost is the average of 1, 2, ..., j, which is (j+1)/2.
5. Averaged over all n keys across all buckets (a standard identity from analysing this exact structure), this works out to 1 + α/2 overall — the "1" for the successful comparison itself, and α/2 because, on average, a target key has about half its own bucket's OTHER occupants sitting in front of it.

1 + α/2 — expected number of comparisons, successful chained search

Notice the pattern: unsuccessful search scans the WHOLE expected chain (α), successful search scans on average HALF of it plus the match itself (1 + α/2) — cheaper, because a successful search can stop the instant it finds the key, while an unsuccessful one must go all the way to the end to be sure.

GATE TRAP: The two chaining formulas — 1 + α (unsuccessful) and 1 + α/2 (successful) — are easy to swap under time pressure because they look so similar. Anchor them by the reasoning, not the shape: unsuccessful search proves a negative, so it must exhaust the chain; successful search stops as soon as it wins, so on average it only goes halfway. Successful is always the cheaper of the two, at the same α.

WHEN CHAINING NEEDS TO REHASH

Chaining never fails outright as α grows — but Θ(1 + α) still means the average cost grows linearly with α, so a table that is allowed to grow unboundedly without resizing eventually behaves like one giant linked list in the limit, exactly the O(n) search hashing was built to avoid. In practice, a chaining table is resized once α crosses a chosen threshold — commonly somewhere around 0.75 to 1 — specifically to keep the CONSTANT in Θ(1 + α) small in absolute terms, even though nothing about chaining technically forces a resize the way open addressing's hard ceiling will.

OPEN ADDRESSING

Chaining pays for its flexibility with a second data structure per bucket (a linked list) and the pointer-chasing that comes with it. Open addressing avoids that entirely: every key lives directly inside the table array, with no auxiliary structure at all. When a slot is taken, the colliding key does not queue up behind it — it looks elsewhere in the SAME array, following a fixed rule called a probe sequence.

[[FIG:probe-seq]]

Because every key must occupy one of the m array slots directly, and no slot can hold more than one key, open addressing has a hard structural ceiling:

α ≤ 1, always, for any open-addressing scheme

This is not a design choice, it is forced by the storage model: n keys each needing their own slot in an m-slot array means n cannot exceed m. In practice α is kept well below 1, because — as the next sections derive precisely — performance degrades sharply as α approaches its ceiling.

The general form of a probe sequence, for probe attempt number i = 0, 1, 2, ..., is written h(k, i), and to insert or search you try h(k, 0), then h(k, 1), then h(k, 2), and so on, until you hit an empty slot (insertion succeeds there, or search concludes the key is absent) or find the key (search succeeds). Three standard choices of h(k, i) are covered below, in increasing order of how well they avoid the clustering that hurts the simplest one.

LINEAR PROBING

The simplest probe sequence just tries the next slot, then the next, wrapping around the end of the table:

h(k, i) = ( h(k) + i ) mod m

Trace this by hand on a concrete table, because the state after every insertion is exactly what exam-style questions ask you to reconstruct. Take m = 7, h(k) = k mod 7, and insert the keys 3, 10, 17, 24, 6 in that order.

1. Insert 3: h(3) = 3 mod 7 = 3. Slot 3 is empty. Place 3 at slot 3. Table: [_, _, _, 3, _, _, _].
2. Insert 10: h(10) = 10 mod 7 = 3. Slot 3 is occupied (by 3). Probe i = 1: (3+1) mod 7 = 4. Slot 4 is empty. Place 10 at slot 4. Table: [_, _, _, 3, 10, _, _].
3. Insert 17: h(17) = 17 mod 7 = 3. Slot 3 occupied, probe slot 4 — occupied (by 10) — probe i = 2: (3+2) mod 7 = 5. Slot 5 is empty. Place 17 at slot 5. Table: [_, _, _, 3, 10, 17, _].
4. Insert 24: h(24) = 24 mod 7 = 3 (21 = 3×7). Slot 3 occupied, slot 4 occupied, slot 5 occupied, probe i = 3: (3+3) mod 7 = 6. Slot 6 is empty. Place 24 at slot 6. Table: [_, _, _, 3, 10, 17, 24].
5. Insert 6: h(6) = 6 mod 7 = 6. Slot 6 is now occupied — not by anything that collided with key 6's own home slot, but because the earlier cluster starting at slot 3 has grown all the way into it. Probe i = 1: (6+1) mod 7 = 0 (wrapping around the end of the table). Slot 0 is empty. Place 6 at slot 0.

Final table (slots 0 through 6): slot 0 = 6, slot 1 = empty, slot 2 = empty, slot 3 = 3, slot 4 = 10, slot 5 = 17, slot 6 = 24.

Look closely at what happened to key 6. On its own, key 6 has no relationship at all to keys 3, 10, 17 and 24 — its home slot, 6, is not even adjacent to their shared home slot, 3. Yet it was forced all the way around the table to slot 0, purely because an unrelated cluster grew large enough to reach its home slot first. This is primary clustering, and the example is built to show it doing real damage to a key that "should" have had a trivial, collision-free insertion.

PRIMARY CLUSTERING

Primary clustering is the tendency of linear probing to form long, self-reinforcing runs of consecutively occupied slots. Once such a run exists, ANY key whose home slot falls inside the run — or immediately before it — must probe through the entire run before finding an empty slot, and in doing so extends the run by one more slot. The next colliding key then has an even longer run to get through, and an even higher chance its own home slot lands somewhere inside the now-larger span.

This is a genuinely self-reinforcing effect, not just "collisions happen often": a run of length L is roughly L times as likely to be hit by the next key's home slot as an isolated empty slot is (since L different possible home slots — the run itself, plus whichever slot immediately precedes it — all funnel into extending the same run), so runs that are already long grow disproportionately faster than short ones. This is exactly why the expected-probe formulas in the next section grow so much faster than a naive "just look at α" estimate would suggest.

GATE TRAP: A very common wrong belief is that linear probing's cost only depends on α through the simple uniform-hashing formulas that also apply to chaining. Primary clustering means linear probing performs WORSE than the idealized "uniform probing" model those exact-form formulas assume — the formulas in the next section already account for this (they are specific to linear probing, not restatements of the chaining formulas), but it is worth remembering that the underlying mechanism — runs feeding on themselves — is what produces the sharp blow-up, not some arbitrary constant.

HOW EXPENSIVE LINEAR PROBING GETS

Under the standard uniform-hashing assumption, the expected number of probes needed by linear probing (derived by Knuth from a careful accounting of run lengths) is:

E[unsuccessful search or insertion] ≈ ½ ( 1 + 1/(1−α)² )

E[successful search] ≈ ½ ( 1 + 1/(1−α) )

An unsuccessful search or a fresh insertion both behave the same way — they probe until they hit a genuinely empty slot — which is why they share a formula. A successful search, once again, tends to stop earlier, because it is retracing the (typically shorter) path that was taken when ITS key was originally inserted, rather than needing to reach all the way to empty space.

Evaluate both at three values of α to see the blow-up concretely.

1. α = 0.5: unsuccessful = ½(1 + 1/(0.5)²) = ½(1 + 1/0.25) = ½(1 + 4) = ½ × 5 = 2.5. Successful = ½(1 + 1/0.5) = ½(1 + 2) = ½ × 3 = 1.5.
2. α = 0.75: unsuccessful = ½(1 + 1/(0.25)²) = ½(1 + 1/0.0625) = ½(1 + 16) = ½ × 17 = 8.5. Successful = ½(1 + 1/0.25) = ½(1 + 4) = ½ × 5 = 2.5.
3. α = 0.9: unsuccessful = ½(1 + 1/(0.1)²) = ½(1 + 1/0.01) = ½(1 + 100) = ½ × 101 = 50.5. Successful = ½(1 + 1/0.1) = ½(1 + 10) = ½ × 11 = 5.5.

Between α = 0.5 and α = 0.9 — the table going from half full to nine-tenths full — the expected cost of an unsuccessful search rockets from 2.5 probes to 50.5 probes, a 20-fold increase, while α itself only grew by a factor of 1.8. The (1−α)² term in the denominator is the mechanism: as α → 1, (1−α) → 0, and squaring a small number makes it smaller still, so its reciprocal explodes even faster than the analogous chaining or successful-search formulas do. This is exactly why practical open-addressing tables are resized well before α gets anywhere near 0.9.

QUADRATIC PROBING

Linear probing's problem is that its step size (always +1) is fixed and small, so once a run starts, everything near it funnels into extending that exact run. Quadratic probing changes the step size as the probe count grows, so that colliding keys spread out rather than piling into the same consecutive stretch:

h(k, i) = ( h(k) + c1·i + c2·i² ) mod m

with c1 and c2 constants (commonly c1 = c2 = 1, giving offsets 0, 1, 4, 9, 16, ... for i = 0, 1, 2, 3, 4, ...). Trace it on m = 7, h(k) = k mod 7, offsets (h(k) + i²) mod m, inserting 10, 17, 24 — all three of which share home slot 3.

1. Insert 10: h(10) = 3. Slot 3 empty. Place 10 at slot 3.
2. Insert 17: h(17) = 3. Slot 3 occupied. Probe i = 1: offset 1² = 1, slot (3+1) mod 7 = 4. Slot 4 is empty. Place 17 at slot 4.
3. Insert 24: h(24) = 3. Slot 3 occupied. Probe i = 1: slot 4, occupied (by 17). Probe i = 2: offset 2² = 4, slot (3+4) mod 7 = 0. Slot 0 is empty. Place 24 at slot 0.

Final table: slot 0 = 24, slot 3 = 10, slot 4 = 17, slots 1, 2, 5, 6 empty. Compare this with the linear-probing trace above on the same keys' home slot: quadratic probing reached slot 0 by JUMPING there directly (offset 4), rather than by walking through every intervening slot the way linear probing's run-growth does — there is no equivalent of "the run keeps extending one slot at a time," because each new probe's offset is a different, larger quantity.

SECONDARY CLUSTERING AND THE GUARANTEE

Quadratic probing eliminates primary clustering, but not all clustering: two keys that hash to the SAME home slot always follow the IDENTICAL sequence of offsets afterwards, because the offsets (c1·i + c2·i²) depend only on the probe number i, never on the key itself. Keys 10 and 17 above, both home slot 3, both tried offset 0 then offset 1 in exactly the same order — they only diverged because one of them found offset 1 already taken. This residual effect, where SAME-home-slot keys share a probe path (though DIFFERENT-home-slot keys do not merge into a shared run the way linear probing's do), is called secondary clustering. It is milder than primary clustering, but double hashing, further below, removes it too.

Quadratic probing has a genuine failure mode worth deriving precisely, because it explains the guarantee that resolves it: for some choices of m, the sequence of offsets (i² mod m) does not cover every residue as i ranges over 0 to m−1 — it can get stuck cycling through a small subset of slots forever, leaving genuinely empty slots permanently unreachable from a given home slot. This happens for m = 8, for example, and it happens whenever m is not prime.

The guarantee that avoids this is: if m is prime and α < 0.5, quadratic probing (with c1 = c2 = ½, or equivalently working with the standard offsets scaled appropriately) is ALWAYS guaranteed to find an empty slot. This is worth proving properly, because "m prime" alone is not sufficient without the load-factor condition too — the proof shows exactly why both are needed.

Claim: if m is prime, the first ⌈m/2⌉ probes (i = 0, 1, ..., ⌊m/2⌋) from any home slot land on ⌈m/2⌉ DISTINCT slots.

1. Suppose, for contradiction, that two different probe numbers i and j, with 0 ≤ i < j ≤ ⌊m/2⌋, land on the same slot: h(k) + i² ≡ h(k) + j² (mod m).
2. Subtracting h(k) from both sides: i² ≡ j² (mod m), so i² − j² ≡ 0 (mod m).
3. Factor: (i − j)(i + j) ≡ 0 (mod m). Since m is prime, this forces m to divide (i − j) or m to divide (i + j) (a prime dividing a product must divide one of the factors — this is exactly why primality is used here).
4. Consider (i − j): since 0 ≤ i < j ≤ ⌊m/2⌋, we have 0 < j − i ≤ ⌊m/2⌋ < m, so m cannot divide (j − i) unless j − i = 0, which contradicts i < j.
5. Consider (i + j): since i, j ≤ ⌊m/2⌋, we have i + j ≤ 2⌊m/2⌋ ≤ m, with equality only possible if m is even and i = j = m/2 (impossible here since i < j) — and since m is prime and greater than 2, m is odd, so 2⌊m/2⌋ = m − 1 < m, meaning i + j ≤ m − 1 < m. So m cannot divide (i + j) unless i + j = 0, which forces i = j = 0, again contradicting i < j.
6. Both cases lead to a contradiction, so no such i, j exist: the first ⌈m/2⌉ probes are all distinct slots.

Now the load-factor half of the guarantee: if the table currently holds n keys with α < 0.5, then n < m/2 ≤ ⌈m/2⌉. The proof above shows the first ⌈m/2⌉ probes visit ⌈m/2⌉ distinct slots — strictly more slots than there are occupied slots in the whole table. By the pigeonhole principle, at least one of those ⌈m/2⌉ distinct probed slots CANNOT be among the n occupied ones, so it must be empty, and the probe sequence is guaranteed to reach it within the first ⌈m/2⌉ tries.

REMEMBER: The quadratic-probing guarantee needs BOTH conditions: m prime (so the first half of the probe sequence never repeats a slot) AND α < 0.5 (so there are provably fewer occupied slots than the number of distinct slots that first half visits). Drop either one and insertion can fail even with empty slots still sitting untouched elsewhere in the table.

DOUBLE HASHING

Quadratic probing's offsets depend only on the probe number, which is why same-home-slot keys still share a path. Double hashing fixes this by making the STEP SIZE itself depend on the key, via a second hash function:

h(k, i) = ( h1(k) + i · h2(k) ) mod m

Two keys that happen to share the same h1(k) will, in general, have DIFFERENT h2(k) values, and so scatter along completely different probe paths rather than merging — eliminating both primary and secondary clustering, and making double hashing's actual behaviour the closest of the three schemes to the idealized "uniform probing" the formulas assume.

For the probe sequence to be able to reach every slot in the table (rather than cycling through a strict subset, exactly the failure quadratic probing can suffer), h2(k) must satisfy two conditions: it must never be 0 for any key (a step size of 0 would repeat the same slot forever, making zero progress), and it must be relatively prime to m — gcd(h2(k), m) = 1 — because multiplying by i and reducing mod m cycles through all m residues exactly once, without repetition, precisely when the step size shares no common factor with m (the same modular-arithmetic fact used in the quadratic-probing proof above, now applied to a single fixed step rather than a growing one).

A standard choice that guarantees this automatically is h2(k) = 1 + (k mod (m−1)), which always lands in the range [1, m−1] — never 0 — and, when m itself is prime, is automatically coprime to m since every integer from 1 to m−1 is coprime to a prime m.

Trace double hashing on m = 13 (prime), h1(k) = k mod 13, h2(k) = 1 + (k mod 11), inserting 18, 44, 59, 31 in that order.

1. Insert 18: h1(18) = 18 mod 13 = 5. Slot 5 empty. Place 18 at slot 5.
2. Insert 44: h1(44) = 44 mod 13 = 5 (44 = 3×13 + 5). Slot 5 occupied. Compute h2(44) = 1 + (44 mod 11) = 1 + 0 = 1 (44 = 4×11 exactly). Probe i = 1: (5 + 1×1) mod 13 = 6. Slot 6 empty. Place 44 at slot 6.
3. Insert 59: h1(59) = 59 mod 13 = 7 (59 = 4×13 + 7). Slot 7 empty. Place 59 at slot 7.
4. Insert 31: h1(31) = 31 mod 13 = 5 (31 = 2×13 + 5). Slot 5 occupied. Compute h2(31) = 1 + (31 mod 11) = 1 + 9 = 10. Probe i = 1: (5 + 1×10) mod 13 = 15 mod 13 = 2. Slot 2 empty. Place 31 at slot 2.

Final table: slot 2 = 31, slot 5 = 18, slot 6 = 44, slot 7 = 59, all other slots empty. Both 44 and 31 collided with 18 at slot 5, but their DIFFERENT step sizes (h2(44) = 1, h2(31) = 10) sent them to completely different final slots — 6 and 2 respectively, nowhere near each other — exactly the scattering behaviour that eliminates clustering.

DELETION IN OPEN ADDRESSING: THE TOMBSTONE

Deleting a key from a chained bucket is an ordinary linked-list removal — no complication. Deleting from open addressing is genuinely subtle, and getting it wrong silently breaks future searches, so work through exactly why.

Suppose key A has home slot 3, but slot 3 was already occupied when A was inserted, so A probed onward and ended up at slot 4. Now suppose the key occupying slot 3 (call it B) is deleted, and the deletion simply marks slot 3 as plain EMPTY.

Later, someone searches for A. The search computes h(A) = 3, looks at slot 3, and finds it EMPTY. A plain empty slot is the standard signal to STOP probing — "nothing was ever placed via this path, so the key cannot be further along" — and the search reports A as not found, even though A is sitting right there at slot 4. The deletion of an unrelated key, B, has silently corrupted the ability to find A.

The fix is a third slot state, distinct from both OCCUPIED and EMPTY: a tombstone (or DELETED marker). When a key is deleted, its slot is set to the tombstone state, not plain empty. Search treats a tombstone exactly like an occupied slot for the purpose of CONTINUING to probe past it — since some other key, like A above, may have been pushed further along specifically because this slot was full at the time. Insertion, on the other hand, is free to REUSE a tombstoned slot as if it were empty, since there is no live data there to protect — though a careful insertion should still continue probing past the first tombstone it sees, to confirm the key is not already present further along, remembering the first tombstone's position to insert into once that confirmation is complete.

1. Table m = 7, h(k) = k mod 7. Insert 9, 16, 17, 23, 10 in that order.
2. h(9) = 2, empty, place at slot 2.
3. h(16) = 2, occupied, probe slot 3, empty, place at slot 3.
4. h(17) = 3, occupied, probe slot 4, empty, place at slot 4.
5. h(23) = 2, occupied (9), probe 3 occupied (16), probe 4 occupied (17), probe 5 empty, place at slot 5.
6. h(10) = 3, occupied (16), probe 4 occupied (17), probe 5 occupied (23), probe 6 empty, place at slot 6.
7. Table so far: slot2=9, slot3=16, slot4=17, slot5=23, slot6=10.
8. Delete 17 (at slot 4): mark slot 4 as a TOMBSTONE, not empty.
9. Insert 30: h(30) = 30 mod 7 = 2. Slot 2 occupied (9), probe slot 3 occupied (16), probe slot 4 — a TOMBSTONE, remembered as reusable, but probing continues to confirm 30 is not already present — probe slot 5 occupied (23), probe slot 6 occupied (10), probe slot 0 (wrapping) empty, confirming 30 is genuinely absent elsewhere. Insertion reuses the remembered tombstone: 30 is placed at slot 4, not at the further-along empty slot 0.

Final table: slot0=empty, slot1=empty, slot2=9, slot3=16, slot4=30, slot5=23, slot6=10 — the tombstone at slot 4 was correctly reused rather than leaving a permanent hole, and any search for 23 or 10 (both of which were pushed past slot 4 during their own insertion) would have continued correctly past the tombstone the whole time it existed.

GATE TRAP: A NAIVE search implementation that treats a tombstone exactly like a genuinely empty slot — stopping there instead of continuing — silently reintroduces the exact bug the tombstone exists to prevent. The distinction is not "tombstones matter for insertion, not search" — it is the reverse emphasis that matters most: search is where a wrong tombstone treatment causes a real, silent correctness failure (reporting a present key as absent), while insertion's only job regarding a tombstone is knowing it MAY reuse it.

Tombstones are not free, though: because search must probe past them just like occupied slots, a table with many deletions accumulates tombstones that make searches (including for keys that were never near those deleted ones) probe further than the CURRENT number of live keys would suggest, effectively inflating the EFFECTIVE load factor for search cost even as the true count of live keys, n, goes down. This is a second, independent reason (beyond simply α crossing a growth threshold) that heavily-deleted-from tables are periodically rehashed — a full rehash rebuilds the table with no tombstones at all, restoring the clean uniform-hashing-like behaviour the cost formulas assume.

CHAINING VERSUS OPEN ADDRESSING

Put the two families side by side, because the exam-style "which is better" question always has the same real answer: it depends on which resource you are optimizing.

• Memory: chaining needs extra memory for pointers (one per node, in addition to the key), and the table array itself can be sized close to the expected n without penalty since chains absorb overflow. Open addressing needs no extra pointers, but the array must be sized larger than n (α kept comfortably below 1) to keep probe counts reasonable, so it can waste array slots that chaining would not need to reserve.

• Cache behaviour: open addressing keeps all data in one contiguous array, which plays well with CPU caches — probing nearby slots tends to hit memory that is already loaded. Chaining scatters nodes across separately allocated memory, so walking a chain means following pointers to potentially distant memory locations, which is slower in practice even when the O(1 + α) count of steps is the same.

• Deletion: chaining's deletion is a plain linked-list removal with no special case. Open addressing needs the tombstone machinery derived above, and tombstones degrade performance over time until a rehash clears them.

• Load factor range: chaining tolerates α > 1 gracefully (longer chains, still Θ(1 + α)). Open addressing has a hard ceiling α < 1, and in practice must be kept much lower — the ½(1 + 1/(1−α)²) blow-up derived earlier makes α above roughly 0.7 to 0.8 impractical for linear probing specifically.

KEY: There is no universally "better" scheme. Chaining trades memory overhead and worse cache locality for graceful degradation and simple deletion. Open addressing trades a hard load-factor ceiling and tombstone bookkeeping for compact, cache-friendly storage. The choice in a real system depends on whether memory, deletion frequency, or raw cache-bound speed matters most for that workload.

REHASHING

Whichever scheme is used, performance depends on keeping α within a healthy range, and inserting keys forever without ever resizing the table eventually pushes α past that range no matter how good the hash function is. Rehashing is the fix: when α crosses a chosen threshold (commonly around 0.7 for open addressing, sometimes higher for chaining), allocate a new, larger table — typically double the size, though any sufficiently larger prime works — and reinsert every existing key into it using the hash function RECOMPUTED against the new table size.

That last point is not optional bookkeeping: h(k) = k mod m gives a completely different slot for a different m, so simply copying the old array's contents byte-for-byte into a bigger array would leave every key sitting under the WRONG index for the new size. Every key must have its hash recomputed from scratch and be reinserted as if arriving fresh.

1. Detect that α has crossed the resize threshold (on the insertion that would push it over).
2. Allocate a new table of size m′ (commonly 2m, or the next suitable prime above 2m if primality matters for the scheme in use).
3. For every key currently in the old table, compute its hash against m′ and insert it into the new table using the same collision-resolution scheme.
4. Discard the old table once every key has been moved.

Rehashing a table of n keys costs O(n) — a genuinely expensive, one-off operation. The reason this does not ruin the O(1) average-case story is amortised analysis, met properly in the algorithms syllabus: if the table doubles each time it is rehashed, a sequence of n insertions triggers rehashing only O(log n) times in total, and the total work done across all those rehashes, summed over the whole sequence of n insertions, is O(n) — meaning the AVERAGE cost per insertion, amortised over the whole sequence, is still O(1), even though any single insertion that happens to trigger a rehash costs O(n) by itself in that one instant.

amortised cost per insertion, across a doubling sequence of rehashes = O(1)

REMEMBER: A single insertion that triggers a rehash is expensive (O(n)) in that moment, but this does not contradict "hashing gives O(1) average-case insertion" — amortised analysis spreads that occasional expensive step over all the cheap insertions that came before it, and as long as the table at least doubles each time, the spread-out average genuinely is O(1).

UNIVERSAL HASHING

Every hash function discussed so far is FIXED — the same function h is used for every run of the program. This has a real weakness: for any fixed h, an adversary who knows h (or who simply supplies keys that happen to share structure, as the multiples-of-6 example showed) can construct a set of keys that all collide, forcing worst-case O(n) behaviour deliberately, not through bad luck. Universal hashing fixes this by not committing to one function at all: instead, a hash function is chosen RANDOMLY, at run time, from a carefully designed family of functions, in such a way that for any two distinct keys, the probability (over the random choice of function) that they collide is at most 1/m — the same as if the function were a genuinely random assignment. Because the adversary cannot know in advance which function from the family will be picked, no fixed set of keys can be constructed ahead of time to force collisions, and the uniform-hashing assumption this whole chapter has relied on becomes a guarantee rather than a hope.

PERFECT HASHING AND CUCKOO HASHING

When the full set of keys is known in advance and will not change — a compiler's table of reserved keywords, for instance — perfect hashing constructs a hash function (or a two-level scheme of hash functions) tailored to that exact key set so that there are NO collisions at all, giving worst-case O(1) lookup rather than merely average-case, at the cost of needing to know the keys ahead of time and rebuild the scheme if the key set ever changes. Cuckoo hashing is a different open-addressing-family idea for a key set that DOES change: it keeps two (or more) hash functions and two tables, and if inserting a key would collide, it evicts the CURRENT occupant of that slot and reinserts the evicted key into ITS other possible slot (in the other table), possibly triggering a chain of evictions — trading a more complex insertion procedure for a worst-case O(1) guarantee on search, since a key can only ever be in one of two known places.

WORKED PROBLEMS

Each problem below is solved in full, exactly as you should show working on paper: compute every hash value, trace every probe, and do not skip a step.

1. LINEAR PROBING FILL. Table size m = 11 (prime), h(k) = k mod 11, linear probing. Insert keys 15, 26, 4, 37, 5, 16 in that order. Give the final table.
   h(15) = 15 mod 11 = 4. Slot 4 empty, place 15 at slot 4.
   h(26) = 26 mod 11 = 4 (26 = 2×11 + 4). Slot 4 occupied, probe slot 5, empty, place 26 at slot 5.
   h(4) = 4. Slot 4 occupied, probe 5 occupied (26), probe slot 6, empty, place 4 at slot 6.
   h(37) = 37 mod 11 = 4 (37 = 3×11 + 4). Slot 4 occ, 5 occ, 6 occ (4), probe slot 7, empty, place 37 at slot 7.
   h(5) = 5. Slot 5 occupied (26) — key 5's OWN home slot happens to be occupied by an unrelated displaced key — probe slot 6 occ (4), probe 7 occ (37), probe slot 8, empty, place key 5 at slot 8.
   h(16) = 16 mod 11 = 5. Slot 5 occ, 6 occ, 7 occ, 8 occ (key 5), probe slot 9, empty, place 16 at slot 9.
   Final table (slots 0–10): slot4=15, slot5=26, slot6=4, slot7=37, slot8=5, slot9=16; slots 0,1,2,3,10 empty.

2. QUADRATIC PROBING COLLISION RESOLUTION. Table size m = 7 (prime), h(k) = k mod 7, probe sequence (h(k) + i²) mod 7. Insert 4, 11, 18, 25 in that order (all four are ≡ 4 mod 7).
   Insert 4: h = 4, empty, place at slot 4.
   Insert 11: h = 4, occupied. i=1: offset 1, slot (4+1) mod 7 = 5, empty, place 11 at slot 5.
   Insert 18: h = 4, occupied. i=1: slot 5, occupied (11). i=2: offset 4, slot (4+4) mod 7 = 1, empty, place 18 at slot 1.
   Insert 25: h = 4, occupied. i=1: slot 5, occ. i=2: slot 1, occ (18). i=3: offset 9 mod 7 = 2, slot (4+2) mod 7 = 6, empty, place 25 at slot 6.
   Final table: slot1=18, slot4=4, slot5=11, slot6=25; slots 0,2,3 empty. Since m=7 is prime, the guarantee proved earlier applies once α is checked: with 4 keys in 7 slots, α ≈ 0.57, just above the 0.5 guarantee threshold — and indeed here it still succeeded, since the guarantee is sufficient, not necessary, for success.

3. DOUBLE HASHING FILL. Table size m = 11 (prime), h1(k) = k mod 11, h2(k) = 1 + (k mod 9), probe sequence (h1(k) + i·h2(k)) mod 11. Insert 22, 44, 55, 13 in that order.
   Insert 22: h1 = 22 mod 11 = 0. Slot 0 empty, place at slot 0.
   Insert 44: h1 = 44 mod 11 = 0 (collision). h2(44) = 1 + (44 mod 9) = 1 + 8 = 9. Probe i=1: (0 + 9) mod 11 = 9. Slot 9 empty, place 44 at slot 9.
   Insert 55: h1 = 55 mod 11 = 0 (collision). h2(55) = 1 + (55 mod 9) = 1 + 1 = 2. Probe i=1: (0 + 2) mod 11 = 2. Slot 2 empty, place 55 at slot 2.
   Insert 13: h1 = 13 mod 11 = 2. Slot 2 is occupied — but by 55, a key that only landed there because of ITS OWN unrelated collision with 22, not because 13 and 55 share a home slot. h2(13) = 1 + (13 mod 9) = 1 + 4 = 5. Probe i=1: (2 + 5) mod 11 = 7. Slot 7 empty, place 13 at slot 7.
   Final table: slot0=22, slot2=55, slot7=13, slot9=44; all other slots empty.

4. COUNTING INSERTION ORDERS. Table size m = 11, h(k) = k mod 11. Keys 5, 16, 27 all have home slot 5 (16 mod 11 = 5, 27 mod 11 = 5), and key 8 has home slot 8, which the three-key chain starting at slot 5 can never reach (a chain of exactly 3 keys starting at slot 5 spans at most slots 5, 6, 7). The observed final table has slot5=5, slot6=16, slot7=27, slot8=8. In how many of the 4! = 24 possible insertion orders of these four keys does this EXACT final table result?
   First isolate the constraint on {5, 16, 27}. Because all three share home slot 5, linear probing behaves as a strict first-come-first-served chain: whichever of the three is inserted FIRST lands at slot 5 (its shared home, empty at that point); whichever is inserted SECOND finds slot 5 taken and lands at slot 6; whichever is inserted THIRD finds slots 5 and 6 taken and lands at slot 7. The mapping from "insertion order among these three" to "final slot" is therefore a bijection — for the observed table (5 at slot 5, 16 at slot 6, 27 at slot 7) there is exactly ONE valid relative order among these three keys: 5 before 16 before 27. Any other relative order among them produces a different final assignment.
   Key 8 does not interact with this chain at all — its home slot, 8, sits outside every slot the three-key chain could ever reach, so wherever 8 is inserted relative to the other three, it always lands at slot 8 directly (empty, since nothing else ever reaches there) and never disturbs their relative placement.
   So a valid overall order is exactly: the three chain-keys appear in the one fixed relative order (5, then 16, then 27), with key 8 inserted at ANY of the 4 possible positions in the combined sequence of 4 insertions. The number of ways to interleave one freely-placed element into a sequence of 3 already-ordered elements is 4 (choose which of the 4 ordinal positions in the full order the free element takes): n! / (c1! · c2!) = 4! / (3! · 1!) = 24 / 6 = 4.
   The four valid orders are: (8,5,16,27), (5,8,16,27), (5,16,8,27), (5,16,27,8) — verify one: order (5,16,8,27): 5→slot5; 16→home5 occupied, probe slot6, empty, place; 8→home8, empty, place; 27→home5 occupied, probe6 occupied(16), probe7 empty, place. Result matches: slot5=5, slot6=16, slot7=27, slot8=8. ✓. This "n! divided by the factorial of each independent same-home chain's length" method applies whenever the chains do not overlap in the slots they could reach — when they do overlap, the count must be found by direct case-by-case simulation instead.

5. EXPECTED PROBES AT A GIVEN LOAD FACTOR. An open-addressing table using linear probing has α = 0.6. Using the standard approximations, find the expected number of probes for an unsuccessful search and for a successful search.
   Unsuccessful: ½(1 + 1/(1−0.6)²) = ½(1 + 1/(0.4)²) = ½(1 + 1/0.16) = ½(1 + 6.25) = ½ × 7.25 = 3.625.
   Successful: ½(1 + 1/(1−0.6)) = ½(1 + 1/0.4) = ½(1 + 2.5) = ½ × 3.5 = 1.75.
   As a check, these sit correctly between the α=0.5 values (2.5, 1.5) and α=0.75 values (8.5, 2.5) computed earlier in the chapter — the unsuccessful-search cost is already growing much faster than the successful-search cost as α climbs, exactly as the squared denominator predicts.

6. CHAINING AVERAGE CHAIN LENGTH — AN UNEVEN CASE. Table size m = 6, h(k) = k mod 6, separate chaining, keys appended to the END of each bucket's chain in this insertion order: 7, 13, 19, 2, 8, 26. Find the exact total number of comparisons needed to successfully find every one of these 6 keys (summed over 6 separate searches), and compare it with the standard approximation.
   h(7)=1, h(13)=1, h(19)=1, h(2)=2, h(8)=2, h(26)=2 — the keys split into exactly two buckets. Bucket1 = [7, 13, 19] (in that append order), bucket2 = [2, 8, 26].
   Finding 7 (front of bucket1): 1 comparison. Finding 13 (2nd): 2. Finding 19 (3rd): 3. Bucket1 subtotal: 1+2+3 = 6.
   Finding 2 (front of bucket2): 1. Finding 8: 2. Finding 26: 3. Bucket2 subtotal: 6.
   Grand total: 6 + 6 = 12 comparisons across all 6 successful searches; exact average = 12/6 = 2.0 comparisons per search.
   Compare with the approximation 1 + α/2: here n=6, m=6, α=1, giving 1 + 0.5 = 1.5 — noticeably LOWER than the exact 2.0 just computed. The gap exists because the approximation assumes keys are spread perfectly uniformly across all 6 buckets (each holding exactly α = 1 key on average), whereas this actual distribution is lumpy — two buckets hold 3 keys each and four buckets hold none — so the two occupied buckets are each searched deeper than the uniform assumption predicts. The formula is a genuine average over random, evenly-spread inputs, not a guarantee for any specific, unevenly-distributed instance.

7. TOMBSTONE DELETION SCENARIO. Table size m = 7 (prime), h(k) = k mod 7, linear probing with tombstones. Insert 5, 12, 19, 26 in that order (all four are ≡ 5 mod 7), then delete 12, then search for 19, then insert 33 (also ≡ 5 mod 7).
   h(5)=5, empty, place at slot 5.
   h(12)=12 mod 7=5, occupied, probe slot 6, empty, place 12 at slot 6.
   h(19)=19 mod 7=5, occupied, probe slot 6 occupied (12), probe slot 0 (wrapping: (6+1) mod 7 = 0), empty, place 19 at slot 0.
   h(26)=26 mod 7=5, occupied, probe 6 occ, probe 0 occ (19), probe slot 1, empty, place 26 at slot 1.
   Table now: slot0=19, slot1=26, slot5=5, slot6=12; slots 2,3,4 empty.
   Delete 12 (at slot 6): mark slot 6 as a TOMBSTONE — not plain empty.
   Search for 19: h(19)=5. Slot 5 holds 5, not a match, but occupied — keep probing (correct: 5 is real data, so probing must continue past it regardless). Probe slot 6: a TOMBSTONE — treated as "keep probing," since some key (as it turns out, 19 itself) may have been pushed further along BECAUSE this slot was full at insertion time. Probe slot 0: holds 19 — MATCH, found after 3 probes. Had the naive (incorrect) implementation stopped at the tombstone in slot 6, it would have wrongly reported 19 as absent.
   Insert 33: h(33)=33 mod 7=5 (33 = 4×7+5). Slot 5 occupied (5), probe slot 6: a TOMBSTONE — remembered as reusable, but probing continues to rule out 33 already being present further on — probe slot 0: occupied (19, not 33), probe slot 1: occupied (26, not 33), probe slot 2: empty — confirms 33 is genuinely new. Insertion reuses the remembered tombstone: 33 is placed at slot 6, not at the further empty slot 2.
   Final table: slot0=19, slot1=26, slot5=5, slot6=33; slots 2,3,4 empty.

WHAT TO CARRY INTO THE NEXT CHAPTER

Hashing finished the story that this course has been building since the first array: pick the right structure for the question you are actually asking. When the question is "does this key exist" with no need for order, a hash table's expected O(1) beats a balanced tree's guaranteed O(log n) — but only once the load factor, the probe sequence, and the hash function itself have been chosen with the care this chapter derived, not assumed. Every collision-resolution formula here rested on the assumption that a hash function spreads keys uniformly; graphs, the next topic, will show you a structure where relationships between elements — not just membership — are the entire point, and neither hashing's O(1) lookup nor a tree's ordering will be enough on their own to represent them.
`
};
