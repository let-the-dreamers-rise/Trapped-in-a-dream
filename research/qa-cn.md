# QA Audit — data/questions/cn.js

**Method:** Node-loaded `window.GATE_DATA.questions['cn']` (5 topics, 184 questions total: 73 concept, 93 numerical, 10 pyq-style, 8 multi-select). Sampled 30 questions across all 5 topics, weighted toward numerical items (propagation/transmission delay, Shannon/Nyquist capacity, CRC, bit stuffing, sliding-window/stop-and-wait efficiency, CSMA/CD minimum frame size, Hamming distance, IP fragmentation/offset, subnetting, route aggregation, TCP seq/ack numbers, cwnd slow-start/congestion-avoidance/fast-recovery, RTT EWMA, HTTP RTT counting, RSA key generation), plus one multi-select (CRC properties) to check answer-index membership. Each was recomputed independently with standalone `node -e` scripts (bit-stuffing simulator, generic CRC XOR-division simulator, IP network/broadcast bit-mask arithmetic, prefix-aggregation common-bit counter) rather than by re-deriving from the stored explanation.

**Result: 30/30 audited as CORRECT. 0 wrong, 0 ambiguous. No edits required.**

## Audit table

| # | id | Type | Claim checked | Recomputed | Stored answer | Verdict |
|---|----|------|----------------|------------|----------------|---------|
| 1 | cn-basics-q4 | numerical | Propagation delay, 2000 km @ 2e8 m/s | 10 ms | 10 ms (idx 1) | CORRECT |
| 2 | cn-basics-q5 | numerical | Tt+Tp, 1250B @ 10Mbps, Tp=5ms | 1+5=6 ms | 6 ms (idx 1) | CORRECT |
| 3 | cn-basics-q6 | numerical | Bandwidth-delay product, 10Mbps × 40ms | 4×10^5 bits | 4×10^5 bits (idx 1) | CORRECT |
| 4 | cn-basics-q7 | numerical | Store-and-forward, 3×1ms | 3 ms | 3 ms (idx 2) | CORRECT |
| 5 | cn-basics-q8 | pyq-style | Pipelined packets, (h+n-1)·Tt = (3+4-1)×1 | 6 ms | 6 ms (idx 1) | CORRECT |
| 6 | cn-basics-q12 | numerical | Shannon capacity, B=4kHz, SNR=30dB(=1000) | 4000·log2(1001)≈39.9 kbps | ≈40 kbps (idx 2) | CORRECT |
| 7 | cn-datalink-q2 | concept | CRC check bits = degree of x^3+x+1 | 3 | 3 (idx 1) | CORRECT |
| 8 | cn-datalink-q3 | numerical | Bit-stuff 01111111110 (flag 01111110) | Simulated stuffer → `011111011110` | `011111011110` (idx 0) | CORRECT |
| 9 | cn-datalink-q5 | numerical | CRC remainder, msg 110101, gen 1011 | XOR-division simulator → `111` | 111 (idx 2) | CORRECT |
| 10 | cn-datalink-q6 | numerical | Stop-and-wait utilization, Tt=1ms, 2Tp=20ms | 1/21≈4.8% | 4.8% (idx 0) | CORRECT |
| 11 | cn-datalink-q9 | numerical | Sliding window W=7 vs 1+2a=10 | 7/10×1Mbps=700kbps | 700 kbps (idx 0) | CORRECT |
| 12 | cn-datalink-q10 | pyq-style | CSMA/CD min frame, 100Mbps, 1km, 2×10^8 m/s | 2Tp·R=10μs×10^8=1000 bits | 1000 bits (idx 1) | CORRECT |
| 13 | cn-datalink-x2 | numerical | d_min=6 → detect/correct | detect 5, correct ⌊5/2⌋=2 | Detect 5, correct 2 (idx 0) | CORRECT |
| 14 | cn-datalink-z1 | multi-select | CRC property statements (4 options) | True: #0 (r-bit remainder), #2 (burst≤r detected), #3 ((x+1) factor detects odd-weight errors); False: #1 (claims carry arithmetic, actually XOR/mod-2) | answers=[0,2,3] | CORRECT (all 4 indices checked in/out) |
| 15 | cn-network-q5 | numerical | Usable hosts, /26 | 2^6-2=62 | 62 (idx 1) | CORRECT |
| 16 | cn-network-q6 | pyq-style | Fragmentation, 3000B total(20B hdr), MTU 1220 | Simulated → 3 frags, offsets [0,150,300] | 3 and 300 (idx 0) | CORRECT |
| 17 | cn-network-q7 | numerical | Fragment offset field 175 → byte position | 175×8=1400 | 1400 (idx 2) | CORRECT |
| 18 | cn-network-q8 | numerical | Network/broadcast for 172.16.19.40/21 | Bitmask calc → 172.16.16.0 / 172.16.23.255 | same (idx 1) | CORRECT |
| 19 | cn-network-q9 | numerical | 192.168.10.0/27: subnets & usable hosts | 2^3=8 subnets, 2^5-2=30 hosts | 8 and 30 (idx 1) | CORRECT |
| 20 | cn-network-q11 | numerical | Aggregate 200.1.4-7.0/24 | Common-prefix calc → /22, base 200.1.4.0 | 200.1.4.0/22 (idx 1) | CORRECT |
| 21 | cn-transport-q3 | numerical | SYN(seq 5000) → ACK number in SYN+ACK | 5000+1=5001 | 5001 (idx 1) | CORRECT |
| 22 | cn-transport-q4 | numerical | ACK number, seq 2001 + 500B data | 2001+500=2501 | 2501 (idx 2) | CORRECT |
| 23 | cn-transport-q6 | numerical | Slow start doubling, cwnd=1 after 4 RTTs | 1→2→4→8→16 | 16 (idx 2) | CORRECT |
| 24 | cn-transport-q7 | numerical | Congestion avoidance, cwnd=8 +3 RTTs | 8→9→10→11 | 11 MSS (idx 2) | CORRECT |
| 25 | cn-transport-q9 | pyq-style | Fast recovery after 3 dup ACKs, cwnd=20 | ssthresh=10, cwnd=ssthresh=10 | ssthresh=10, cwnd=10 (idx 1) | CORRECT |
| 26 | cn-transport-q10 | numerical | EWMA, Est=100, Sample=120, α=0.125 | 0.875×100+0.125×120=102.5 | 102.5 ms (idx 1) | CORRECT |
| 27 | cn-application-q3 | numerical | Non-persistent HTTP, 4 objects, RTT=10ms | 4×2×10=80 ms | 80 ms (idx 1) | CORRECT |
| 28 | cn-application-q11 | numerical | RSA d for e=3, φ(n)=20 | Brute force: d=7 (3×7=21≡1 mod 20) | 7 (idx 1) | CORRECT |
| 29 | cn-application-q15 | numerical | Cold-cache DNS, 3 hierarchy levels × 20ms | 60 ms | 60 ms (idx 2) | CORRECT |
| 30 | cn-application-x1 | numerical | Non-persistent HTTP, 11 objects, RTT count | 11×2=22 RTTs | 22 RTTs (idx 2) | CORRECT |

## Fixes applied

None. All 30 sampled questions (spanning every topic, weighted toward numerical/computational items, plus one multi-select whose full answer set was checked index-by-index) were independently recomputed and matched the stored `answer`/`answers` and explanation. `node --check` on the file confirms it remains syntactically valid (no edits were made, so this is a no-op confirmation of baseline health).

## Coverage note

30/184 questions audited (~16%), spread as: cn-basics 6, cn-datalink 8 (incl. 1 MSQ), cn-network 6, cn-transport 6, cn-application 4. Untested items (concept-only recall questions on OSI layering order, DNS/HTTP/FTP/SMTP protocol facts, NAT, split-horizon, etc., plus the remaining ~163 questions) were not independently recomputed since they are not numerically verifiable via `node -e`; a future pass could spot-check those against RFC/textbook facts if deeper coverage is desired.
