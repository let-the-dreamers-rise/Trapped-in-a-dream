# QA Audit — coa.js (Computer Organization & Architecture)

Date: 2026-08-29
Source: `/home/user/Trapped-in-a-dream/data/questions/coa.js` — `window.GATE_DATA.questions['coa']`
Scope: 5 topics, 166 total questions. Sample audited: 30 questions, all `type: numerical, difficulty: hard` (the highest-risk category for silent arithmetic errors), 6 per topic (`coa-instructions`, `coa-datapath`, `coa-pipelining`, `coa-memory`, `coa-io`).

Method: each question's answer was re-derived independently via `node -e` scripts (bit-field arithmetic, expanding-opcode chains, CPI/AMAT formulas, pipeline-stall timing simulation, two's-complement overflow/carry logic, cache tag/index/offset math, LRU set-associative trace simulation, and disk/DMA timing formulas), then compared against the stored `answer` index and `explanation`.

## Result Summary

Audited 30, Wrong 0, Fixed 0. All 30 sampled answers and explanations verified as CORRECT.

## Audit Table

| # | ID | Topic | Check performed | Verdict |
|---|----|-------|------------------|---------|
| 1 | coa-instructions-q10 | instructions | 3-level expanding opcode: 256−250=6 → 6×4096=24576−24000=576 → 576×4096=2,359,296 | CORRECT |
| 2 | coa-instructions-q12 | instructions | Min accumulator-machine sequence for A*B+C*D with spill: LOAD A, MUL B, STORE T, LOAD C, MUL D, ADD T, STORE Y = 7 | CORRECT |
| 3 | coa-instructions-x3 | instructions | 3-level expanding opcode: 16−10=6 → 6×16=96−80=16 → 16×16=256 | CORRECT |
| 4 | coa-instructions-x11 | instructions | ceil(log2 100)=7 opcode bits + 3×ceil(log2 32)=15 reg bits = 22, rounded up to byte boundary = 24 | CORRECT |
| 5 | coa-instructions-x14 | instructions | 6 (opcode) + 2×2 (mode fields) + 2×4 (reg fields) = 18 | CORRECT |
| 6 | coa-instructions-x6 | instructions | Stack machine: PUSH A, PUSH B, MUL, PUSH C, PUSH D, MUL, ADD, POP X = 8 | CORRECT |
| 7 | coa-datapath-q9 | datapath | Multi-cycle CPI = 0.25×5+0.10×4+0.45×4+0.20×3 = 4.05 → ×200ps = 810ps > single-cycle 750ps, so single-cycle wins | CORRECT |
| 8 | coa-datapath-q12 | datapath | Computed 0110_1100(108)+0101_0001(81)=1011_1101(189 truncated to −67 signed); carry-out=0, signed overflow (both positive→negative result)=1 → V=1,C=0, verified with actual binary addition in node | CORRECT |
| 9 | coa-datapath-x12 | datapath | ceil(log2 512) = 9 bits (512 = 2^9 exactly) | CORRECT |
| 10 | coa-datapath-x14 | datapath | Hardwired 5×10ns=50ns vs microprog 5×30ns=150ns → speedup 150/50=3x | CORRECT |
| 11 | coa-datapath-x3 | datapath | Next-address field = ceil(log2 4096)=12 bits; total = 16 (control) + 2 (condition) + 12 (address) = 30 | CORRECT |
| 12 | coa-datapath-x6 | datapath | Fetch 3 + decode 1 + execute 3 = 7 cycles | CORRECT |
| 13 | coa-pipelining-q6 | pipelining | Simulated full 5-stage timing chart with split-phase WB/ID rule for RAW hazards I1→I2 (R1) and I3→I4 (R6), no forwarding; manual cycle-by-cycle trace confirms completion at cycle 12 | CORRECT |
| 14 | coa-pipelining-q9 | pipelining | CPI = 1 + (0.25×0.20×3) = 1 + 0.15 = 1.15 | CORRECT |
| 15 | coa-pipelining-q11 | pipelining | Old cycle = max(5,6,11,8)=11ns; new cycle after split = max(5,6,5.5,5.5,8)=8ns; speedup = 11/8 = 1.375 | CORRECT |
| 16 | coa-pipelining-x3 | pipelining | Misprediction penalty = 4−1=3 cycles; mispredicted fraction = 0.20×0.10=0.02; CPI = 1+0.02×3 = 1.06 | CORRECT |
| 17 | coa-pipelining-x8 | pipelining | Load-use hazard: value ready end of MEM (cycle 4), consumer EX needs cycle 4 naturally but forwarding from MEM/WB only available cycle 5 → exactly 1 mandatory stall | CORRECT |
| 18 | coa-pipelining-x9 | pipelining | Cycle time = max(100,150,120,160,140)+20 latch = 180ps; throughput = 1/180ps ≈ 5.56×10^9/s, computed exactly in node | CORRECT |
| 19 | coa-memory-q14 | memory | Miss penalty for 64B block, 8 words: 40 + 7×10 = 110ns | CORRECT |
| 20 | coa-memory-q7 | memory | Lines=65536/32=2048; offset=5,index=11,tag=32−16=16 bits; tag storage=2048×16=32768 bits, computed in node | CORRECT |
| 21 | coa-memory-q9 | memory | 0x1234 >> 4 = block 291; 291 mod 64 = line 35, computed directly in node | CORRECT |
| 22 | coa-memory-x13 | memory | Simulated 2-way set-associative LRU cache trace [0,1,2,3,0,4,1] in node: exactly 2 hits (second refs to 0 and 1) | CORRECT |
| 23 | coa-memory-x5 | memory | 3-level nested AMAT: L3branch=20+0.25×200=70; L2branch=10+0.40×70=38; AMAT=1+0.10×38=4.8, computed in node | CORRECT |
| 24 | coa-memory-x7 | memory | Misses=100000×0.05=5000; dirty evictions=5000×0.60=3000; traffic=3000×64=192,000 bytes | CORRECT |
| 25 | coa-io-q12 | io | Revolution=10ms, avg latency=5ms; per-sector=5+5+0.1=10.1ms × 100 = 1010ms | CORRECT |
| 26 | coa-io-q6 | io | Revolution=60000/15000=4ms; rate=1MB/4ms=250MB/s | CORRECT |
| 27 | coa-io-q9 | io | Overhead=150 cycles×10ns=1500ns=1.5μs; transfer=32000B/8MB/s=4000μs; fraction=1.5/4000=0.0375%, computed in node | CORRECT |
| 28 | coa-io-x11 | io | Effective slowdown = 1/(1−0.15) ≈ 1.1765 ≈ 1.18x (17.6% longer), computed in node | CORRECT |
| 29 | coa-io-x4 | io | Burst lockout = 8192B/4MB/s = 0.002048s = 2.048ms | CORRECT |
| 30 | coa-io-x7 | io | Sequential read: one-time positioning 5+5=10ms + transfer 250×0.1=25ms = 35ms | CORRECT |

## Fixes Applied

None. No WRONG or AMBIGUOUS verdicts were found in the sampled 30 questions; no edits were made to `coa.js`.

## Notes / Coverage

- The sample deliberately concentrated on the entire `numerical`/`hard` population that exists per topic (6 of the topic's hard-numerical questions each, for `coa-instructions`, `coa-datapath`, `coa-pipelining`, `coa-memory`; `coa-io` also 6 of its 8) — this is the subset most likely to contain silent arithmetic or off-by-one/unit errors, per the task's prioritization guidance.
- Every option list was also checked for plausible-distractor consistency (e.g., the "half of the real value" or "off-by-one-field" style distractors matched the explanation's stated common mistakes), lending further confidence that the correct-option index, not just the raw number, was verified.
- Not audited in this pass: the `concept`/`easy`-`medium` questions (69 total) and the remaining `numerical`/`medium` questions (55 total) and the 2 `pyq-style` questions. These are lower-risk (conceptual recall, or lower difficulty numerical) but were out of scope for the time-boxed sample; a follow-up pass could extend coverage to `numerical/medium` next given it is the next-highest-risk bucket.
