# QA Audit — data/questions/digital.js

Node-loaded successfully (`node --check` clean). `window.GATE_DATA.questions['digital']` has 5 topics, 168 questions total (33+34+34+33+34).

A dataset-wide scan of every MSQ `answers` array (all 168 questions) confirmed every index is in-range and free of duplicates — no structural index errors anywhere in the file.

## Sample audited: 30 questions, 6 per topic, weighted toward K-map minimization, counter/flip-flop traces, base conversion / 2's complement, and IEEE 754 encoding, per the task brief.

| # | Question ID | Topic | Focus | Verification method | Verdict |
|---|---|---|---|---|---|
| 1 | digital-boolean-q4 | Boolean Algebra | K-map, Σm(0,1,2,3,8,9,10,11) | Manual re-minimization (B=0 across all 8 cells) | CORRECT |
| 2 | digital-boolean-q5 | Boolean Algebra | PI count, Σm(0,1,2,5,7) | Quine–McCluskey script → 4 PIs | CORRECT |
| 3 | digital-boolean-q13 | Boolean Algebra | EPI count, Σm(0,1,4,5,6,7) | Quine–McCluskey script → PIs {A, B'}, both essential = 2 | CORRECT |
| 4 | digital-boolean-x1 | Boolean Algebra | Self-dual function count, n=3 | Formula 2^(2^(n-1)) = 2^4 = 16 | CORRECT |
| 5 | digital-boolean-x2 | Boolean Algebra | # functions with f(0,0,0,0)=0, n=4 | 2^(16-1) = 2^15 | CORRECT |
| 6 | digital-boolean-y4 | Boolean Algebra | Min literals, Σm(0,2,8,10) | K-map: B'D' quad, 2 literals | CORRECT |
| 7 | digital-combinational-q4 | Combinational | 4:1 MUX synthesis, Σm(1,2,6,7) | Brute-force truth table script → (C,C',0,1) | CORRECT |
| 8 | digital-combinational-q5 | Combinational | Ripple-carry adder timing | 4 stages × 2ns = 8ns | CORRECT |
| 9 | digital-combinational-q11 | Combinational | 4-bit CLA critical path | Gate-level trace: 1(P/G)+2(carry AND-OR)+1(XOR)=4 | CORRECT |
| 10 | digital-combinational-q15 | Combinational | 8:1 MUX, Σm(0,1,3,4,8,9,15), I2 | Brute-force script: ABC=010 → D=0→1,D=1→0 = D' | CORRECT |
| 11 | digital-combinational-x1 | Combinational | 4:1 MUX reverse synthesis | Brute-force script → Σm(0,4,5,7) | CORRECT |
| 12 | digital-combinational-y4 | Combinational | MUX select-line count, n=5 | n-1 = 4 select lines | CORRECT |
| 13 | digital-sequential-q4 | Sequential | Min FFs for mod-10 counter | ceil(log2 10) = 4 | CORRECT |
| 14 | digital-sequential-q6 | Sequential | T-FF toggle, 16MHz clock | fout = fclk/2 = 8MHz | CORRECT |
| 15 | digital-sequential-q7 | Sequential | 4-bit ripple counter fmax, tpd=10ns | fmax = 1/(4×10ns) = 25MHz | CORRECT |
| 16 | digital-sequential-q11 | Sequential | Cascaded mod-5 × mod-4 counter | 5×4 = mod-20 | CORRECT |
| 17 | digital-sequential-x1 | Sequential | Min FFs for 6 states | ceil(log2 6) = 3 | CORRECT |
| 18 | digital-sequential-y4 | Sequential | Modulus of 0–11 counter | 12 distinct states | CORRECT |
| 19 | digital-number-systems-q1 | Number Systems | Binary→decimal, 101101 | 32+8+4+1 = 45 | CORRECT |
| 20 | digital-number-systems-q2 | Number Systems | Hex→decimal, 2F | 2×16+15 = 47 | CORRECT |
| 21 | digital-number-systems-q4 | Number Systems | 1's complement of 01011010 | Bitwise flip → 10100101 | CORRECT |
| 22 | digital-number-systems-q5 | Number Systems | 2's complement of 01101100 | Flip+1: 10010011→10010100; check: -128+16+4=-108 | CORRECT |
| 23 | digital-number-systems-x1 | Number Systems | Solve radix r: (24)_r+(13)_r=(41)_r | 3r+7=4r+1 → r=6 | CORRECT |
| 24 | digital-number-systems-y4 | Number Systems | 2's complement decode, 11010110 | Invert+1: 00101010=42 → value -42 | CORRECT |
| 25 | digital-arithmetic-q2 | Arithmetic/IEEE754 | 2's complement overflow, 0101+0011 | 5+3=8 exceeds [-8,7]; same-sign-in/opposite-out rule confirms overflow | CORRECT |
| 26 | digital-arithmetic-q3 | Arithmetic/IEEE754 | 3-5 via 2's complement add | 0011+1011=1110 = -2, no overflow (opposite-sign operands) | CORRECT |
| 27 | digital-arithmetic-q5 | Arithmetic/IEEE754 | Booth's algorithm op count, 0111 | Manual Booth encoding: (1,0)→sub,(1,1)→-,(1,1)→-,(0,1)→add = 2 ops | CORRECT |
| 28 | digital-arithmetic-q7 | Arithmetic/IEEE754 | Double-precision exponent bias | 2^(11-1)-1 = 1023 | CORRECT |
| 29 | digital-arithmetic-x1 | Arithmetic/IEEE754 | 4-bit 2's complement, 5+4 overflow | 0101+0100=1001; carry-in≠carry-out sign bit → overflow | CORRECT |
| 30 | digital-arithmetic-y4 | Arithmetic/IEEE754 | IEEE 754 single-precision biased exponent of 8.0 | `DataView.setFloat32` bit dump → biased exponent field = 130 | CORRECT |

## Fixes applied

None. All 30 sampled questions verified CORRECT against independent re-computation (Quine–McCluskey scripting for K-map/PI/EPI problems, brute-force truth-table enumeration for MUX synthesis, manual bit-level arithmetic for 2's complement/overflow/Booth's algorithm, and `DataView`-based IEEE 754 bit-pattern reconstruction). The dataset-wide MSQ index-range/duplicate scan across all 168 questions also found no issues.

No edits were made to `data/questions/digital.js`.
