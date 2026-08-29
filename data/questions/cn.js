window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['cn'] = {
  subject: 'Computer Networks',
  topics: [
    {
      id: 'cn-basics',
      name: 'Layering & Physical Basics',
      theory: {
        intro: 'Every Computer Networks paper in GATE opens the door through this topic: the OSI and TCP/IP reference models, what each layer is responsible for, how data is encapsulated as it moves down the stack, and the fundamental switching techniques. Layered on top of these concepts sit the delay computations that GATE loves: transmission delay, propagation delay, queueing and processing delay, and the bandwidth-delay product that tells you how many bits a pipe can hold. Circuit switching versus packet switching comparisons, store-and-forward timing across multiple hops, and pipelining of packets are all standard one-mark and two-mark questions. If you can classify a function to its correct layer in seconds and can compute end-to-end delivery time for a message split into packets over several links, you have banked easy marks. This topic also anchors everything later: sliding windows, congestion control and utilization formulas all reuse the same delay vocabulary.',
        core: 'Reference models. The OSI model has seven layers: physical, data link, network, transport, session, presentation, application. The TCP/IP model compresses this to four or five: the session and presentation duties (dialog control, translation, compression, encryption formatting) are folded into the application layer.\n\nLayer responsibilities, bottom up:\n• Physical: transmission of raw bits over a medium; concerns are encoding, signalling, bit rate, bandwidth in Hz.\n• Data link: node-to-node (hop-to-hop) delivery of frames; framing, physical (MAC) addressing, per-hop error detection, flow control on a single link, medium access.\n• Network: source-to-destination delivery of packets across multiple links; logical (IP) addressing, routing, fragmentation.\n• Transport: process-to-process delivery; port addressing, segmentation and reassembly, end-to-end reliability, end-to-end flow and congestion control.\n• Application: network services to user processes (HTTP, DNS, SMTP, FTP).\n\nEncapsulation. At the sender each layer adds its own header (the data link layer also adds a trailer). Application data becomes a segment at transport, a packet or datagram at network, a frame at data link, and finally bits on the wire. Intermediate routers process only up to the network layer; switches process up to the data link layer; hubs and repeaters live at the physical layer.\n\nSwitching. Circuit switching reserves a dedicated end-to-end path before data flows (setup, transfer, teardown); bandwidth is guaranteed but idle reservations are wasted, and there is no per-hop store-and-forward delay after setup. Packet switching sends independently addressed packets with no reservation; each router stores the whole packet, then forwards it, so each hop adds one transmission delay, but the network is shared efficiently and can route around failures. Virtual-circuit packet switching fixes the path per connection but still statistically shares links.\n\nDelay arithmetic. For a packet of L bits on a link of bandwidth R bits per second and length d metres with propagation speed v metres per second:\n• Transmission delay Tt = L / R (time to push the bits onto the link).\n• Propagation delay Tp = d / v (time for one bit to travel the wire; independent of packet size).\n• Total for one packet on one link = Tt + Tp, plus queueing delay (variable, depends on load) and processing delay.\n\nStore-and-forward over h links of equal rate, ignoring propagation and queueing, one packet takes h * Tt. If a message is split into n equal packets sent over h links, pipelining gives total time = (h + n - 1) * Tt: the first packet takes h slots to cross, and each remaining packet adds one more slot. Message switching (no splitting) would take h * (message time), which is why splitting into packets speeds delivery.\n\nBandwidth-delay product. BDP = R * delay. Using one-way propagation delay it gives the number of bits in flight on the wire in one direction; using RTT it gives the number of bits a sender must have unacknowledged to keep the link fully busy. BDP in bits divided by packet size gives the window size in packets — the bridge to sliding-window questions.\n\nPhysical-layer capacity. Nyquist limit for a noiseless channel of bandwidth B Hz with M signal levels: C = 2B log2(M) bits per second. Shannon capacity for a noisy channel: C = B log2(1 + SNR), where SNR is the linear ratio. Convert decibels first: SNR_dB = 10 log10(SNR), so 30 dB means SNR = 1000.',
        strategy: 'GATE patterns. (1) One-mark layer matching: which layer does routing, framing, process-to-process delivery, encryption. Answer from the responsibility list, not intuition. (2) Two-mark delay computations: total time for a file over one link, or a message split into n packets over h store-and-forward hops — apply (h + n - 1) * Tt and only add propagation if the question gives distances. (3) Bandwidth-delay product asked directly or disguised as minimum window size. (4) Circuit versus packet switching comparisons, sometimes numeric with setup time included.\n\nTraps. Propagation delay depends only on distance and speed, never on packet length; transmission delay depends only on packet length and bandwidth, never on distance. Do not double propagation unless the question asks about acknowledgements or RTT. Watch units relentlessly: Mbps usually means 10^6 bits per second in GATE, while KB in memory-flavoured questions may mean 2^10 bytes — follow the options. Routers add a full store-and-forward transmission delay per hop; circuit switching after setup does not.\n\nWorked mini-example. Send a 40,000-bit message over 3 links of 10 Mbps each, as four 10,000-bit packets, ignoring propagation. Tt per packet per link = 10^4 / 10^7 = 1 ms. Total = (3 + 4 - 1) * 1 ms = 6 ms, versus 12 ms unsplit. Practise until the pipelining formula is automatic, then re-derive it once from a timing diagram so you can adapt it when link rates differ.'
      },
      questions: [
        {
          id: 'cn-basics-q1',
          q: 'In the OSI reference model, which layer is responsible for process-to-process (end-to-end) delivery of a complete message?',
          options: ['Network layer', 'Transport layer', 'Data link layer', 'Session layer'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The transport layer delivers data from a process on the source host to a process on the destination host, using port numbers to identify the processes; this is called end-to-end or process-to-process delivery. The network layer only achieves host-to-host (source-to-destination machine) delivery via logical addressing and routing. The data link layer is responsible for hop-to-hop delivery of frames between two directly connected nodes. The session layer manages dialogs and synchronization, not delivery. Remember the delivery ladder: data link = node to node, network = host to host, transport = process to process.'
        },
        {
          id: 'cn-basics-q2',
          q: 'At the sending host, application data passes down the TCP/IP stack. The correct order of encapsulation units produced is:',
          options: ['Data, packet, segment, frame, bits', 'Data, frame, packet, segment, bits', 'Data, segment, packet, frame, bits', 'Data, segment, frame, packet, bits'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Encapsulation follows the layers top to bottom. The application hands data to the transport layer, which adds a TCP or UDP header to make a segment (or user datagram). The network layer adds an IP header to make a packet or datagram. The data link layer adds a header and trailer to make a frame. Finally the physical layer transmits the frame as raw bits. So the order is data, segment, packet, frame, bits. A quick memory aid: the protocol data unit names go S-P-F as you descend from transport to data link. At each receiving layer the matching header is stripped in reverse order.'
        },
        {
          id: 'cn-basics-q3',
          q: 'Which one of the following statements about switching techniques is TRUE?',
          options: ['Packet switching reserves a dedicated path before any data is sent', 'Circuit switching adds a store-and-forward delay at every intermediate node during data transfer', 'In circuit switching, link capacity reserved for a call is wasted when the call falls silent', 'Packet switching guarantees a fixed end-to-end bandwidth to every flow'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Circuit switching sets up a dedicated path with reserved capacity before transfer; while the parties are silent the reserved capacity cannot be used by anyone else, so it is wasted — this makes option three correct. The other statements invert the definitions: packet switching makes no reservation at all (each packet is routed independently and shares links statistically), so it cannot guarantee fixed bandwidth, and it is packet switching, not circuit switching, that stores each packet fully at every router before forwarding it, adding one transmission delay per hop. After circuit setup, data flows through without per-hop store-and-forward delays.'
        },
        {
          id: 'cn-basics-q4',
          q: 'A link is 2000 km long and the signal propagates at 2 x 10^8 m/s. The propagation delay of the link is:',
          options: ['1 ms', '10 ms', '20 ms', '100 ms'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Propagation delay is distance divided by propagation speed: Tp = d / v. Here d = 2000 km = 2 x 10^6 m and v = 2 x 10^8 m/s, so Tp = (2 x 10^6) / (2 x 10^8) = 10^-2 s = 10 ms. Note that the bandwidth of the link and the size of any packet are irrelevant to propagation delay — it is purely the travel time of one bit down the wire. A handy rule of thumb at 2 x 10^8 m/s: 5 microseconds per kilometre, so 2000 km gives 2000 x 5 us = 10 ms.'
        },
        {
          id: 'cn-basics-q5',
          q: 'A 1250-byte packet is sent over a 10 Mbps link whose one-way propagation delay is 5 ms. The time from the start of transmission until the last bit arrives at the receiver is:',
          options: ['5 ms', '6 ms', '1 ms', '11 ms'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Two delays add here. Transmission delay Tt = L / R = (1250 x 8 bits) / (10 x 10^6 bps) = 10,000 / 10^7 = 1 ms: the time to push all bits onto the link. The last bit leaves the sender at t = 1 ms and then needs the propagation delay of 5 ms to travel the wire, arriving at t = 1 + 5 = 6 ms. So total = Tt + Tp = 6 ms. The trap answers are using only one of the two components (1 ms or 5 ms) or doubling the propagation delay (11 ms would suggest waiting for an acknowledgement, which the question does not ask about).'
        },
        {
          id: 'cn-basics-q6',
          q: 'A link has a bandwidth of 10 Mbps and a round-trip time of 40 ms. To keep the link fully utilized, the minimum number of bits the sender must be able to have outstanding (unacknowledged) is:',
          options: ['2 x 10^5 bits', '4 x 10^5 bits', '8 x 10^5 bits', '10^5 bits'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The sender must keep transmitting for one full round-trip time before the first acknowledgement can possibly return. In that time the link can carry bandwidth x RTT bits, which is the bandwidth-delay product. Here BDP = (10 x 10^6 bps) x (40 x 10^-3 s) = 4 x 10^5 bits = 400,000 bits, or 50,000 bytes. If the sender window is smaller than this, it will stall waiting for acknowledgements and the link will idle. This exact quantity, divided by the packet size, reappears in sliding-window questions as the optimal window size in packets, so learn to compute it quickly.'
        },
        {
          id: 'cn-basics-q7',
          q: 'A 10,000-bit packet crosses a path of 3 store-and-forward links, each of bandwidth 10 Mbps. Ignoring propagation, queueing and processing delays, the total end-to-end delay is:',
          options: ['1 ms', '2 ms', '3 ms', '10 ms'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Each link requires the full packet to be received before it is forwarded (store-and-forward), so the packet pays one complete transmission delay per link. Per-link transmission delay Tt = L / R = 10^4 / 10^7 = 1 ms. With 3 links the total is 3 x 1 ms = 3 ms. The general rule: one packet over h store-and-forward hops of equal rate takes h x L / R, ignoring propagation. If the question had also given link lengths, you would add the sum of the propagation delays of all links. Confusing cut-through switching (which does not wait for the whole packet) with store-and-forward is the classic error here.'
        },
        {
          id: 'cn-basics-q8',
          q: 'A 40,000-bit message is split into four 10,000-bit packets (ignore headers) and sent over a path with 2 intermediate store-and-forward routers, all links being 10 Mbps. Ignoring propagation delay, the time until the last packet is fully received at the destination is:',
          options: ['4 ms', '6 ms', '12 ms', '3 ms'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'pyq-style',
          explanation: 'Two intermediate routers means 3 links. Per-packet per-link transmission delay Tt = 10^4 / 10^7 = 1 ms. With pipelining, the first packet reaches the destination after crossing 3 links: 3 x 1 = 3 ms. Thereafter the links work in parallel like an assembly line and one additional packet is delivered every 1 ms, so the remaining 3 packets add 3 ms. Total = (h + n - 1) x Tt = (3 + 4 - 1) x 1 ms = 6 ms. Compare with message switching, which would send all 40,000 bits as one unit: 3 x 4 ms = 12 ms. Splitting into packets pipelines the links and halves the delay here.'
        },
        {
          id: 'cn-basics-q9',
          q: 'Framing, physical addressing and per-hop error detection are the responsibilities of which layer?',
          options: ['Network layer', 'Transport layer', 'Data link layer', 'Physical layer'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The data link layer packages the bit stream from the network layer into frames, adds the physical (MAC) addresses of the sending and receiving nodes on the current link, and appends error-detection information (such as a CRC) so the receiver can detect corruption on that hop. It may also do hop-level flow control and medium access control. The physical layer below it deals only with raw bit transmission and signalling. The network layer uses logical (IP) addressing and routes across many links, while the transport layer works end to end with port numbers. The keywords frame and MAC address should immediately signal data link.'
        },
        {
          id: 'cn-basics-q10',
          q: 'In the OSI model, data translation, compression and encryption formatting are functions of the:',
          options: ['Session layer', 'Presentation layer', 'Application layer', 'Transport layer'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The presentation layer is concerned with the syntax and semantics of the information exchanged: translating between different data representations (for example character encodings), compressing data to reduce volume, and encrypting or decrypting it for privacy. The session layer, by contrast, handles dialog control and synchronization checkpoints, and the application layer provides user-facing services such as file transfer and mail. In the TCP/IP model there is no separate presentation layer; these duties are absorbed into the application layer, which is itself a frequent one-mark question. Memory aid: presentation = how the data looks (format), session = who may talk and when.'
        },
        {
          id: 'cn-basics-q11',
          q: 'A 4 MB file (1 MB = 10^6 bytes) is sent as one continuous stream over an 8 Mbps link with one-way propagation delay 50 ms. The time until the last bit reaches the receiver is:',
          options: ['4.00 s', '4.05 s', '4.10 s', '0.55 s'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'First compute the transmission delay for the entire file: L = 4 x 10^6 bytes = 3.2 x 10^7 bits, and R = 8 x 10^6 bps, so Tt = 3.2 x 10^7 / 8 x 10^6 = 4 s. The last bit leaves the sender at t = 4 s and then propagates for 50 ms, arriving at t = 4 + 0.05 = 4.05 s. Total = Tt + Tp = 4.05 s. Option 4.10 s wrongly doubles the propagation delay (that would be relevant only if we waited for an acknowledgement), and 0.55 s comes from misreading MB as Mb. Always convert bytes to bits before dividing by a bandwidth quoted in bits per second.'
        },
        {
          id: 'cn-basics-q12',
          q: 'A telephone channel has a bandwidth of 4 kHz and a signal-to-noise ratio of 30 dB. By the Shannon capacity formula, the maximum achievable data rate is approximately:',
          options: ['12 kbps', '24 kbps', '40 kbps', '80 kbps'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Shannon capacity: C = B log2(1 + SNR), where SNR must be the linear ratio, not decibels. Convert first: 30 dB means 10 log10(SNR) = 30, so SNR = 10^3 = 1000. Then C = 4000 x log2(1001). Since 2^10 = 1024, log2(1001) is just under 10, about 9.97. So C = 4000 x 9.97 = 39,880 bps, approximately 40 kbps. The standard trap is plugging 30 directly into the formula, which gives 4000 x log2(31) = about 19.8 kbps and matches a wrong option in many papers. Also do not confuse this with the Nyquist formula C = 2B log2(M), which applies to a noiseless channel with M signal levels.'
        },
        {
          id: 'cn-basics-q13',
          q: 'Which component of end-to-end packet delay is variable and depends on the instantaneous traffic load in the network?',
          options: ['Transmission delay', 'Propagation delay', 'Queueing delay', 'None; all components are fixed'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'For a given packet and path, transmission delay (L / R) is fixed by the packet length and link rate, and propagation delay (d / v) is fixed by the distance and medium. Processing delay at a router is roughly constant. Queueing delay, however, is the time a packet waits in a router buffer behind other packets, and it depends entirely on how much traffic happens to be sharing the outgoing link at that moment: it can be zero on an idle network and unbounded (until the buffer overflows and packets are dropped) under congestion. This variability is why real networks exhibit jitter, and why GATE questions asking for deterministic totals tell you to ignore queueing.'
        },
        {
          id: 'cn-basics-q14',
          q: 'A 1 Gbps link has an RTT of 20 ms. Packets are 1000 bytes each. The minimum number of packets the sender must keep in flight to fully utilize the link is:',
          options: ['250', '2500', '25000', '1250'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Compute the bandwidth-delay product using RTT, because the sender must fill the pipe for a whole round trip before feedback arrives. BDP = 10^9 bps x 20 x 10^-3 s = 2 x 10^7 bits. Convert to bytes: 2 x 10^7 / 8 = 2.5 x 10^6 bytes. Divide by the packet size: 2.5 x 10^6 / 1000 = 2500 packets. So the sender needs a window of at least 2500 packets in flight; anything smaller leaves the link idle part of each RTT. The distractor 1250 comes from using the one-way delay of 10 ms instead of the RTT, and 250 from a stray factor-of-10 slip, so keep the powers of ten written out.'
        },
        {
          id: 'cn-basics-q15',
          q: 'In the TCP/IP protocol suite, the functions of the OSI session and presentation layers are handled by:',
          options: ['The transport layer', 'The network layer', 'The application layer', 'A separate middleware layer defined in the suite'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The TCP/IP model does not define separate session and presentation layers. Whatever dialog management, data representation, compression or encryption an application needs is implemented inside the application layer itself, typically by the application protocol or supporting libraries (for example TLS providing encryption for HTTPS). The transport layer in TCP/IP is restricted to end-to-end delivery concerns (TCP and UDP), and the network layer to IP addressing and routing. So the mapping is: OSI application + presentation + session together correspond to the single TCP/IP application layer, a fact GATE has asked directly as a one-mark question.'
        }
      ]
    },
    {
      id: 'cn-datalink',
      name: 'Data Link Layer & MAC',
      theory: {
        intro: 'The data link layer is the most numerically rich chapter of GATE Computer Networks. It contributes reliable two-mark questions every year drawn from a small, fixed set of ideas: framing (byte and bit stuffing), error detection (parity, checksum and above all CRC division), and the sliding-window protocols stop-and-wait, go-back-N and selective repeat with their efficiency, window-size and sequence-number arithmetic. The medium access control sublayer adds pure and slotted ALOHA throughput, CSMA/CD and the famous minimum-frame-size condition that shapes Ethernet, plus the practical distinction between hubs, switches and bridges in terms of collision and broadcast domains. Almost every question reduces to the ratio a = Tp / Tt between propagation and transmission delay, or to binary long division with XOR. If you internalize the utilization formulas and can execute a CRC division without slips, this topic becomes the most predictable source of marks in the whole subject.',
        core: 'Framing. Frames are delimited either by length fields or by flags. With flag bytes, byte stuffing inserts an escape character before accidental flags in the data. With the HDLC bit-oriented flag 01111110, bit stuffing inserts a 0 after every run of five consecutive 1s in the payload so the flag pattern can never appear inside data; the receiver deletes the 0 that follows any five 1s.\n\nError detection. A single parity bit detects every error affecting an odd number of bits and misses all even-count errors. Two-dimensional parity can detect up to three-bit errors and correct any single-bit error. The internet checksum adds 16-bit words in ones-complement arithmetic and sends the complement of the sum; the receiver adds everything including the checksum and expects all 1s. CRC treats the message as a polynomial over GF(2): with a generator of degree r, append r zero bits, divide by the generator using XOR long division, and replace the appended zeros with the r-bit remainder. The receiver divides the received frame by the generator and accepts it if the remainder is zero. A good generator detects all burst errors of length at most r, all odd-count errors if (x + 1) divides it, and all single and double bit errors if it has an appropriate primitive factor.\n\nSliding windows. Define Tt = L / R (frame transmission time), Tp (one-way propagation time) and a = Tp / Tt. Cycle time for one window in stop-and-wait style reasoning is Tt + 2Tp = Tt(1 + 2a).\n• Stop-and-wait: one frame per cycle, so utilization U = 1 / (1 + 2a). Needs only a 1-bit sequence number.\n• With window size W: U = W / (1 + 2a) when W < 1 + 2a, and U = 1 (link fully busy) when W >= 1 + 2a. Throughput = U x bandwidth.\n• Sequence-number constraints with k bits: go-back-N allows a sender window of at most 2^k - 1; selective repeat requires sender window = receiver window <= 2^(k-1). Violating these lets an old frame be mistaken for a new one after acknowledgement loss.\n• Go-back-N receives strictly in order (receiver window 1) and discards out-of-order frames; selective repeat buffers out-of-order frames and retransmits only the missing one.\n\nMAC protocols. Pure ALOHA transmits whenever a frame is ready; a frame is vulnerable for two frame times, giving throughput S = G e^(-2G), maximized at G = 0.5 with S = 1/(2e), about 18.4 percent. Slotted ALOHA restricts transmissions to slot boundaries, halving the vulnerable period: S = G e^(-G), maximum 1/e, about 36.8 percent, at G = 1. With N stations each transmitting in a slot with probability p, the probability of a successful slot is N p (1 - p)^(N-1).\n\nCSMA/CD and Ethernet. A station listens before transmitting and aborts on detecting a collision. To guarantee that the sender is still transmitting when news of the worst-case collision returns, the frame transmission time must be at least twice the end-to-end propagation delay: L / R >= 2 Tp, so Lmin = 2 x Tp x R. This links minimum frame size, cable length and bit rate: classic Ethernet at 10 Mbps uses a 64-byte (512-bit) minimum frame. After a collision, binary exponential backoff waits a random number of slot times chosen from 0 to 2^i - 1 after the i-th collision (capped at 10).\n\nDevices. A hub is a physical-layer repeater: all ports share one collision domain and one broadcast domain. A switch (multiport bridge) works at the data link layer, learns MAC addresses, and gives every port its own collision domain, while all ports still share one broadcast domain until VLANs or routers separate them.',
        strategy: 'GATE patterns. (1) CRC: compute the remainder or verify a received frame — one appears in most papers; practise XOR long division until error-free. (2) Efficiency and throughput: given bandwidth, frame size and propagation delay, compute a, then U = W / (1 + 2a); or invert the question to find the minimum window or the minimum number of sequence-number bits. (3) CSMA/CD: solve Lmin = 2 x Tp x R for any one of frame size, distance or bandwidth. (4) ALOHA maximum throughput values, or the N p (1 - p)^(N-1) slot-success expression. (5) Collision and broadcast domain counting for a topology of hubs and switches.\n\nTraps. In window-size questions, check whether the given delay is one-way or round-trip before forming 1 + 2a. For sequence numbers, remember go-back-N tolerates 2^k - 1 while selective repeat needs 2^(k-1) — swapping these is the most common error. In CSMA/CD, the vulnerable time is 2 Tp, not Tp. Bit stuffing operates only on the payload, and the inserted bit is always a 0 after five 1s, regardless of the next bit.\n\nWorked mini-example. Link 1 Mbps, frames 1000 bits, one-way propagation 24.5 ms. Tt = 1 ms, a = 24.5, and 1 + 2a = 50. Full utilization needs a window of 50 frames; go-back-N then needs 2^k - 1 >= 50, so k = 6 bits. One computation, three possible questions — window, bits, or efficiency for a smaller window such as U = 25/50 = 50 percent.'
      },
      questions: [
        {
          id: 'cn-datalink-q1',
          q: 'Twelve hosts are connected to a 12-port Ethernet switch, one host per port. The number of collision domains and broadcast domains, respectively, is:',
          options: ['1 and 1', '12 and 12', '12 and 1', '1 and 12'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A switch operates at the data link layer and forwards frames only to the port where the destination MAC address was learned. Each switch port is therefore its own collision domain: a host and its port form a private segment, and with full duplex there are effectively no collisions at all. Twelve ports give 12 collision domains. However, a switch floods broadcast frames (destination FF:FF:FF:FF:FF:FF) out of every port, so all twelve hosts still hear each other at broadcast level: one broadcast domain. Only a router or VLAN configuration splits broadcast domains. A hub, by contrast, would give 1 collision domain and 1 broadcast domain.'
        },
        {
          id: 'cn-datalink-q2',
          q: 'A CRC scheme uses the generator polynomial x^3 + x + 1. The number of check bits appended to each message is:',
          options: ['2', '3', '4', 'Depends on the message length'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The number of CRC bits equals the degree of the generator polynomial, here 3. In binary the generator x^3 + x + 1 is written 1011 (coefficients of x^3, x^2, x^1, x^0), which is a 4-bit divisor, and dividing by a 4-bit pattern with XOR arithmetic always leaves a remainder of at most 3 bits. The transmitter appends 3 zeros to the message, divides, and replaces the zeros with the 3-bit remainder. The check-bit count is fixed by the generator and completely independent of how long the message is — that independence is exactly what makes the fourth option wrong.'
        },
        {
          id: 'cn-datalink-q3',
          q: 'In a bit-oriented protocol using the flag 01111110 and bit stuffing, the payload 01111111110 is transmitted as:',
          options: ['011111011110', '011111011111', '0111110111110', '01111101110'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Bit stuffing inserts a 0 immediately after every run of five consecutive 1s in the payload, so the flag pattern 01111110 can never occur inside data. Scan the payload 0 1 1 1 1 1 1 1 1 1 0: after the first bit 0 we meet nine 1s. After the first five 1s, insert a 0 and reset the count. Four more 1s follow (count reaches only 4), then the final payload 0 arrives. Output: 0 11111 0 1111 0 = 011111011110, which is 12 bits for an 11-bit payload. The receiver reverses this by deleting any 0 that follows five consecutive 1s.'
        },
        {
          id: 'cn-datalink-q4',
          q: 'The minimum number of sequence-number bits required by the stop-and-wait ARQ protocol is:',
          options: ['0', '1', '2', 'Depends on the bandwidth-delay product'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Stop-and-wait keeps exactly one frame outstanding, but it still needs sequence numbers 0 and 1 — a single bit. The reason is duplicate detection: if an acknowledgement is lost, the sender times out and retransmits the same frame; without a sequence number the receiver could not tell this retransmission from the next new frame and would deliver duplicate data. Alternating 0 and 1 resolves the ambiguity, which is why the protocol is also called the alternating-bit protocol. Zero bits fail for the reason just given, and more than one bit is unnecessary since only one frame is ever unacknowledged. The window size, not the bit count, is what the bandwidth-delay product would govern in pipelined protocols.'
        },
        {
          id: 'cn-datalink-q5',
          q: 'A message 110101 is protected by a CRC using generator 1011. The 3-bit CRC appended to the message is:',
          options: ['011', '100', '111', '001'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Append three zeros (degree of generator) to get the dividend 110101000, then divide by 1011 using XOR. Working left to right on the register: 1101 XOR 1011 = 0110; bring down 0 to get 1100, XOR 1011 = 0111; bring down 1 to get 1111, XOR 1011 = 0100; bring down 0 to get 1000, XOR 1011 = 0011; bring down 0 to get 0110; bring down the last 0 to get 1100, XOR 1011 = 0111. No bits remain, so the remainder is 111. The transmitted codeword is 110101111. As a check, dividing 110101111 by 1011 with the same process leaves remainder 000, which is what the receiver verifies.'
        },
        {
          id: 'cn-datalink-q6',
          q: 'A stop-and-wait protocol runs over a 1 Mbps link with 1000-bit frames and a one-way propagation delay of 10 ms. Ignoring acknowledgement transmission time, the link utilization is approximately:',
          options: ['4.8%', '9.1%', '50%', '100%'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Transmission time Tt = 1000 / 10^6 = 1 ms. The sender then waits for the frame to propagate (10 ms) and the acknowledgement to return (10 ms), so each cycle lasts Tt + 2Tp = 1 + 20 = 21 ms, of which the link carries data for only 1 ms. Utilization U = Tt / (Tt + 2Tp) = 1 / (1 + 2a) with a = Tp / Tt = 10, giving U = 1/21 = 0.0476, about 4.8 percent. The distractor 9.1 percent comes from using only one propagation delay (1/11), a frequent slip: stop-and-wait always pays the round trip before the next frame can start.'
        },
        {
          id: 'cn-datalink-q7',
          q: 'A go-back-N protocol runs over a link where the frame transmission time is 1 ms and the one-way propagation delay is 24.5 ms. The minimum number of sequence-number bits needed to achieve 100% utilization is:',
          options: ['5', '6', '7', '50'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'Full utilization requires the window to cover the whole cycle: W >= 1 + 2a where a = Tp / Tt = 24.5, so W >= 1 + 49 = 50 frames. Go-back-N with k sequence bits supports a sender window of at most 2^k - 1 (one value must stay unused to disambiguate a full window from an empty one). We need 2^k - 1 >= 50, i.e. 2^k >= 51. Since 2^5 = 32 is too small and 2^6 = 64 works, k = 6 bits. Note the two-step structure: first the utilization condition gives the window, then the protocol constraint gives the bits; quoting 50 directly answers the wrong question.'
        },
        {
          id: 'cn-datalink-q8',
          q: 'A selective repeat protocol uses 4-bit sequence numbers. The maximum sender window size that guarantees correct operation is:',
          options: ['15', '16', '8', '7'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Selective repeat requires sender window = receiver window <= 2^(k-1), which for k = 4 gives at most 2^3 = 8. The reason: the receiver accepts frames out of order, so after all acknowledgements for one full window are lost, the retransmitted old frames must not overlap the sequence numbers of the next expected window. That is guaranteed only when the two windows together do not exceed the sequence space of 2^k = 16, forcing each to be at most 8. The value 15 (2^k - 1) is the go-back-N limit, and mixing up the two formulas is precisely the trap this question sets.'
        },
        {
          id: 'cn-datalink-q9',
          q: 'A sliding-window protocol uses a window of 7 frames on a 1 Mbps link. Frames are 1000 bits and the one-way propagation delay is 4.5 ms. The maximum achievable throughput is:',
          options: ['700 kbps', '1 Mbps', '450 kbps', '100 kbps'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Tt = 1000 / 10^6 = 1 ms and Tp = 4.5 ms, so the cycle time is Tt + 2Tp = 1 + 9 = 10 ms and 1 + 2a = 10 frames would be needed for full utilization. The window is only 7, so in every 10 ms cycle the sender transmits 7 frames of 1000 bits and then stalls waiting for acknowledgements. Efficiency = W / (1 + 2a) = 7/10 = 70 percent, and throughput = 0.7 x 1 Mbps = 700 kbps. Equivalently, 7000 bits per 10 ms = 700 kbps. The 1 Mbps option would require W >= 10, and 450 kbps misuses the propagation number directly.'
        },
        {
          id: 'cn-datalink-q10',
          q: 'A CSMA/CD network runs at 100 Mbps over a 1 km cable with signal speed 2 x 10^8 m/s. For collision detection to always work, the minimum frame size is:',
          options: ['500 bits', '1000 bits', '2000 bits', '250 bits'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'pyq-style',
          explanation: 'The sender must still be transmitting when a collision from the far end is detected, and the worst case requires a round trip: the first bit travels the full cable (Tp) and the collision signal travels back (another Tp). One-way Tp = 1000 m / (2 x 10^8 m/s) = 5 microseconds, so the frame must last at least 2Tp = 10 microseconds. Minimum frame size = 2Tp x R = 10 x 10^-6 x 10^8 = 1000 bits, i.e. 125 bytes. Using only one propagation delay gives the 500-bit distractor. Notice the scaling law: raising the bit rate or lengthening the cable both raise the minimum frame size proportionally.'
        },
        {
          id: 'cn-datalink-q11',
          q: 'An Ethernet variant uses CSMA/CD at 10 Mbps with a minimum frame size of 512 bits. If the signal propagates at 2 x 10^8 m/s, the maximum possible cable length between two stations is:',
          options: ['2560 m', '5120 m', '10240 m', '1280 m'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Invert the CSMA/CD condition Lmin = 2 Tp x R to find the distance. The minimum frame lasts Tt = 512 / 10^7 = 51.2 microseconds, and this must be at least the round-trip propagation time, so 2Tp <= 51.2 us, giving one-way Tp <= 25.6 us. Distance d = Tp x v = 25.6 x 10^-6 x 2 x 10^8 = 5120 m. Forgetting the factor of two gives 10240 m, and applying it twice gives 2560 m — both are options on purpose. This inverse form (given frame size, find distance) alternates in GATE with the forward form (given distance, find frame size), so practise both directions of the same equation.'
        },
        {
          id: 'cn-datalink-q12',
          q: 'The maximum channel utilizations of pure ALOHA and slotted ALOHA, respectively, are approximately:',
          options: ['18.4% and 36.8%', '36.8% and 18.4%', '50% and 100%', '26.4% and 52.8%'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Pure ALOHA lets a station transmit at any instant, so a frame collides with anything sent in a window of two frame times (one before it starts and one during it). Throughput S = G e^(-2G), maximized at offered load G = 0.5, giving S = 1/(2e) = 0.184, about 18.4 percent. Slotted ALOHA forces transmissions to begin only at slot boundaries, shrinking the vulnerable period to one slot; S = G e^(-G) peaks at G = 1 with S = 1/e = 0.368, about 36.8 percent. Slotting exactly doubles the best-case efficiency, and remembering the pair (1/2e, 1/e) answers this recurring one-mark question instantly.'
        },
        {
          id: 'cn-datalink-q13',
          q: 'Three stations share a slotted ALOHA channel, and in every slot each station independently transmits with probability 1/3. The probability that a given slot carries a successful transmission is:',
          options: ['1/3', '4/9', '2/9', '8/27'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'A slot is successful when exactly one of the three stations transmits. The probability that a particular station transmits while the other two stay silent is (1/3) x (2/3)^2 = (1/3) x (4/9) = 4/27. Any of the 3 stations could be the lone transmitter, so the success probability is 3 x 4/27 = 12/27 = 4/9, about 0.444. This is the general formula N p (1 - p)^(N-1) with N = 3 and p = 1/3. The distractor 8/27 is the probability that nobody transmits (an idle slot), and 2/9 drops the factor for choosing which station succeeds — both classic slips in this computation.'
        },
        {
          id: 'cn-datalink-q14',
          q: 'In the internet checksum used with 16-bit words, the receiver adds all received words including the checksum field using ones-complement arithmetic. The frame is accepted as error-free when the final sum is:',
          options: ['All zeros', 'All ones', 'Equal to the checksum field', 'Any nonzero value'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'The sender adds the data words in ones-complement arithmetic (wrapping any carry out of the top bit back into the least significant bit) and transmits the complement of that sum as the checksum. At the receiver, summing all the data words reproduces the original sum, and adding its complement (the checksum) yields a word of all ones (the ones-complement representation of negative zero). Any other result signals corruption. If instead the sender transmitted the sum itself, the receiver test would be different — the all-ones test works precisely because the complement is sent. This detects all single-bit errors and most multi-bit errors, but it can miss errors that cancel out, which is why the link layer additionally relies on CRC.'
        },
        {
          id: 'cn-datalink-q15',
          q: 'A go-back-N sender uses a window of 3 frames on a 1 Mbps link. Frames are 1000 bits and the one-way propagation delay is 2 ms. Assuming no losses, the link efficiency is:',
          options: ['100%', '33%', '60%', '20%'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Tt = 1000 / 10^6 = 1 ms and Tp = 2 ms, so a = Tp / Tt = 2 and 1 + 2a = 5. Full utilization would need a window of at least 5 frames; the window is only 3. Efficiency = W / (1 + 2a) = 3/5 = 60 percent. Concretely: the sender transmits frames for 3 ms, then idles for 2 ms until the first acknowledgement returns at t = Tt + 2Tp = 5 ms, and the pattern repeats — 3 ms of useful work in every 5 ms cycle. Effective throughput would be 0.6 x 1 Mbps = 600 kbps. The 20 percent distractor is stop-and-wait behaviour (1/5), and 33 percent misreads the window fraction.'
        },
        {
          id: 'cn-datalink-q16',
          q: 'A frame is protected by a single (even) parity bit. Which error patterns is this scheme guaranteed to detect?',
          options: ['All single-bit errors only', 'All errors affecting an odd number of bits', 'All errors affecting at most two bits', 'All burst errors shorter than the frame'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The parity bit makes the total number of 1s in the frame even. Flipping any odd number of bits changes the parity of that count, so every odd-count error — 1 bit, 3 bits, 5 bits and so on — is detected. Flipping an even number of bits preserves the parity, so all even-count errors, including simple two-bit errors, escape unnoticed. Hence option one is too narrow and option three is wrong. Burst errors are only caught when they happen to flip an odd number of bits. This weakness is why practical links use CRC, and why two-dimensional parity (which can additionally correct a single-bit error) appears as a strengthening in textbook questions.'
        }
      ]
    },
    {
      id: 'cn-network',
      name: 'Network Layer: IP, Addressing & Routing',
      theory: {
        intro: 'The network layer carries the heaviest weight in GATE Computer Networks, and its questions are overwhelmingly numeric. You must know the IPv4 header fields and their sizes cold, because fragmentation questions hinge on the identification, flags and fragment-offset fields, and the offset is measured in 8-byte units. Addressing questions span classful classes A to E, CIDR prefixes, subnet masks, counting subnets and usable hosts, finding network and broadcast addresses for an arbitrary host, and aggregating blocks by supernetting. Routing contributes conceptual and small numeric questions on distance-vector (Bellman-Ford) versus link-state (Dijkstra) protocols, the count-to-infinity pathology, and split horizon. Finally the supporting protocols — ARP, DHCP, ICMP and NAT — each own a recurring one-mark slot. Nearly every two-mark question here is mechanical once you can convert between prefix lengths, masks and block sizes without hesitation, so drill that conversion first.',
        core: 'IPv4 header. Minimum 20 bytes, maximum 60 bytes. Key fields: version (4 bits), header length HLEN (4 bits, counts 4-byte words, so 5 to 15), total length (16 bits, whole datagram, max 65,535 bytes), identification (16 bits, same for all fragments of a datagram), flags (DF = do not fragment, MF = more fragments), fragment offset (13 bits, in units of 8 bytes), TTL (8 bits, decremented at each router, datagram discarded at zero with an ICMP time-exceeded message), protocol (6 = TCP, 17 = UDP, 1 = ICMP), header checksum (recomputed at every hop because TTL changes), and 32-bit source and destination addresses.\n\nFragmentation. A router fragments when the datagram exceeds the outgoing MTU. Each fragment gets a full IP header; the data carried per fragment must be a multiple of 8 bytes except in the last fragment. Offset of a fragment = (first data byte number) / 8. MF = 1 in all fragments except the last. Reassembly happens only at the final destination. Example: a 3000-byte datagram (20-byte header, 2980 data bytes) over an MTU of 1220 carries at most 1200 data bytes per fragment (1200 is a multiple of 8), producing fragments of 1200, 1200 and 580 data bytes with offsets 0, 150 and 300.\n\nClassful addressing. Class A: first bit 0, range 0 to 127, default mask /8. Class B: 10, range 128 to 191, /16. Class C: 110, range 192 to 223, /24. Class D: 1110, 224 to 239, multicast. Class E: 1111, 240 to 255, reserved.\n\nCIDR and subnetting. A /p network has 2^(32-p) addresses and 2^(32-p) - 2 usable hosts (network and broadcast addresses are excluded). Borrowing s subnet bits from the host part creates 2^s subnets. To find the network address of a host, AND the address with the mask; the broadcast address sets all remaining host bits to 1. The block size in the interesting octet is 256 minus the mask value in that octet: mask 255.255.248.0 means blocks of 8 in the third octet. For at least H hosts choose the smallest h with 2^h - 2 >= H and use prefix 32 - h.\n\nSupernetting. Aggregating 2^m contiguous, alignment-matched /p blocks yields one /(p-m) route; the first block address must be divisible by the aggregate block size. Routers use longest-prefix matching, so a more specific route always wins over an aggregate.\n\nRouting. Distance-vector protocols (RIP) run distributed Bellman-Ford: each router periodically sends its full distance table to neighbours only, and updates d(X) = min over neighbours N of (cost to N + distance N reports to X). Convergence is slow and bad news travels slowly: after a link failure, two routers can count each other up gradually — count to infinity — mitigated by a small infinity (16 in RIP), split horizon and poisoned reverse. Link-state protocols (OSPF) flood small link-state advertisements to all routers, so every router learns the full topology and runs Dijkstra locally; convergence is fast and loops are rare, at the cost of more memory and flooding traffic.\n\nSupport protocols. ARP maps a known IPv4 address to a MAC address by broadcasting a request on the local network; the owner replies unicast. DHCP leases an IP configuration via the DORA sequence: Discover, Offer, Request, Acknowledge, using UDP broadcast. ICMP carries error and diagnostic messages inside IP (echo request and reply for ping; time exceeded and destination unreachable for traceroute). NAT rewrites private source addresses and ports to a public address at the border, conserving IPv4 addresses at the price of breaking end-to-end addressing.',
        strategy: 'GATE patterns. (1) Fragmentation: given datagram size and MTU, find the number of fragments, per-fragment lengths, MF flags and offsets — always work in data bytes, subtract the 20-byte header from the MTU, and round the payload down to a multiple of 8. (2) Subnet arithmetic: network and broadcast addresses for a host with an odd prefix like /21 or /27; usable hosts; smallest block for a requirement. (3) Supernetting: find the single CIDR aggregate for consecutive /24 blocks. (4) Routing: one-step distance-vector table updates, count-to-infinity reasoning, distance-vector versus link-state contrasts. (5) One-markers on ARP, DHCP order, ICMP users, NAT and header field sizes.\n\nTraps. The fragment offset is in 8-byte units — dividing by the fragment size instead of 8 is the classic error. Total length includes the header, but MTU arithmetic concerns data bytes. Usable hosts are 2^h - 2, but the count of subnets is 2^s with no subtraction in the modern (CIDR) convention. In broadcast-address questions, check the block boundary of the interesting octet, not just the last octet. TTL prevents loops; it does not measure time.\n\nWorked mini-example. Host 172.16.19.40/21: the mask is 255.255.248.0, blocks of 8 in the third octet, so 19 falls in the block 16 to 23. Network = 172.16.16.0, broadcast = 172.16.23.255, usable range 172.16.16.1 to 172.16.23.254, hosts = 2^11 - 2 = 2046. Under exam pressure, this block-boundary method beats binary expansion every time.'
      },
      questions: [
        {
          id: 'cn-network-q1',
          q: 'The minimum and maximum sizes of an IPv4 header are, respectively:',
          options: ['20 bytes and 60 bytes', '20 bytes and 65,535 bytes', '16 bytes and 64 bytes', '20 bytes and 40 bytes'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The 4-bit HLEN field counts the header in 4-byte words. Its minimum legal value is 5, giving 5 x 4 = 20 bytes — the standard header with no options. Its maximum value is 15, giving 15 x 4 = 60 bytes, which allows up to 40 bytes of options. The value 65,535 is the maximum of the 16-bit total length field, which covers the entire datagram including data, not just the header — confusing these two fields is the intended trap. A useful corollary tested elsewhere: the options field length must keep the header a multiple of 4 bytes, padded if necessary.'
        },
        {
          id: 'cn-network-q2',
          q: 'Under classful addressing, the IPv4 address 227.12.14.87 belongs to:',
          options: ['Class B', 'Class C', 'Class D', 'Class E'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Classify by the first octet: class A covers 0 to 127 (leading bit 0), class B covers 128 to 191 (leading bits 10), class C covers 192 to 223 (110), class D covers 224 to 239 (1110) and class E covers 240 to 255 (1111). The first octet here is 227, which lies in the 224 to 239 range, so the address is class D. Class D addresses are multicast group identifiers: they have no network and host split, no subnet mask, and cannot be assigned to an individual interface. Class E is reserved for experimental use. Memorize the four boundary values 128, 192, 224 and 240 to answer such questions in seconds.'
        },
        {
          id: 'cn-network-q3',
          q: 'A host knows the IPv4 address of a neighbour on its LAN but needs the corresponding MAC address before it can deliver a frame. Which protocol does it use?',
          options: ['DHCP', 'ARP', 'ICMP', 'DNS'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The Address Resolution Protocol maps a known IPv4 address to the unknown MAC (hardware) address. The host broadcasts an ARP request on the LAN saying who has this IP address; every station receives it, but only the owner of that IP replies, unicasting its MAC address back. The result is cached in the ARP table to avoid repeating the exchange. DHCP does nearly the opposite job of assigning IP configuration to a host; DNS maps names to IP addresses at the application layer; and ICMP reports errors and diagnostics. A related one-marker: RARP (and later DHCP) handled the reverse mapping from MAC to IP for diskless stations.'
        },
        {
          id: 'cn-network-q4',
          q: 'The correct order of messages in a successful DHCP address acquisition is:',
          options: ['Request, Offer, Discover, Acknowledge', 'Discover, Offer, Request, Acknowledge', 'Discover, Request, Offer, Acknowledge', 'Offer, Discover, Request, Acknowledge'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'DHCP follows the DORA sequence. The client, having no address, broadcasts a Discover message to locate servers. Any DHCP server that can serve it broadcasts back an Offer containing a proposed IP address and lease parameters. The client chooses one offer and broadcasts a Request naming that server (broadcast so the other servers know their offers were declined). The chosen server finalizes with an Acknowledge, after which the client may use the address for the lease duration. The exchange runs over UDP (ports 67 and 68) because the client cannot use TCP without an address. Remembering the acronym DORA answers this recurring question immediately.'
        },
        {
          id: 'cn-network-q5',
          q: 'The maximum number of usable host addresses in the subnet 200.10.20.0/26 is:',
          options: ['64', '62', '30', '126'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'A /26 prefix leaves 32 - 26 = 6 host bits, so the block contains 2^6 = 64 addresses: 200.10.20.0 through 200.10.20.63. Two of them are unusable for hosts: the all-zeros host part 200.10.20.0 is the network (subnet) address, and the all-ones host part 200.10.20.63 is the directed broadcast address. Usable hosts = 64 - 2 = 62. The option 64 forgets the subtraction, 30 corresponds to a /27, and 126 to a /25. The general rule 2^(32-p) - 2 is worth committing to memory along with the small table of /24 to /30 host counts: 254, 126, 62, 30, 14, 6, 2.'
        },
        {
          id: 'cn-network-q6',
          q: 'An IP datagram of total length 3000 bytes (20-byte header) must cross a link with MTU 1220 bytes. The number of fragments created and the fragment-offset field of the last fragment are:',
          options: ['3 and 300', '3 and 2400', '2 and 150', '3 and 375'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'pyq-style',
          explanation: 'Data to carry = 3000 - 20 = 2980 bytes. Each fragment gets its own 20-byte header, so it can carry at most 1220 - 20 = 1200 data bytes, and 1200 is already a multiple of 8, so no rounding is needed. Fragments carry 1200, 1200 and 580 data bytes — three fragments. Offsets are measured in 8-byte units from the start of the original data: fragment 1 starts at byte 0 (offset 0), fragment 2 at byte 1200 (offset 1200/8 = 150), fragment 3 at byte 2400 (offset 2400/8 = 300). So the answer is 3 fragments with last offset 300. Writing 2400 forgets the divide-by-8 rule, the most common fragmentation error.'
        },
        {
          id: 'cn-network-q7',
          q: 'A received IP fragment has a fragment-offset field value of 175. The first data byte of this fragment occupies which byte position of the original datagram data?',
          options: ['175', '350', '1400', '2800'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The 13-bit fragment-offset field cannot count individual bytes, because the 16-bit total length field allows datagrams up to 65,535 bytes and 13 bits only reach 8191. The designers therefore made the field count 8-byte units: byte position = offset field x 8. Here 175 x 8 = 1400, so this fragment begins at data byte 1400 of the original datagram. This same scaling is why every fragment except the last must carry a multiple of 8 data bytes — otherwise the next fragment could not be given an exact offset. Reading the field as a byte count (175) or doubling instead of multiplying by 8 gives the distractors.'
        },
        {
          id: 'cn-network-q8',
          q: 'For the host 172.16.19.40/21, the network address and the directed broadcast address are, respectively:',
          options: ['172.16.19.0 and 172.16.19.255', '172.16.16.0 and 172.16.23.255', '172.16.18.0 and 172.16.21.255', '172.16.0.0 and 172.16.255.255'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A /21 mask is 255.255.248.0: the third octet keeps its top 5 bits, giving blocks of 256 - 248 = 8 in the third octet, starting at 0, 8, 16, 24 and so on. The host third octet 19 falls in the block 16 to 23. Setting all 11 host bits to zero gives the network address 172.16.16.0; setting them all to one gives the broadcast address 172.16.23.255. The usable host range is 172.16.16.1 through 172.16.23.254, containing 2^11 - 2 = 2046 hosts. The first option treats the mask as /24, and the last as /16 — both classful reflexes that CIDR questions are designed to punish.'
        },
        {
          id: 'cn-network-q9',
          q: 'The class C network 192.168.10.0 is subnetted with mask 255.255.255.224. The number of subnets and the number of usable hosts per subnet are:',
          options: ['8 and 32', '8 and 30', '6 and 30', '4 and 62'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The default class C mask is /24; the mask 255.255.255.224 is /27, so 3 bits have been borrowed for subnetting, creating 2^3 = 8 subnets: 192.168.10.0, .32, .64, .96, .128, .160, .192 and .224. Each subnet keeps 5 host bits, giving 2^5 = 32 addresses of which the subnet address and the broadcast address are reserved, leaving 30 usable hosts. In the modern CIDR convention all 8 subnets are usable, so no subtraction is applied to the subnet count; the old rule that discarded the all-zeros and all-ones subnets (giving 6) is obsolete and GATE answer keys follow the modern convention unless the question states otherwise.'
        },
        {
          id: 'cn-network-q10',
          q: 'An organization needs a single CIDR block that provides at least 500 usable host addresses. The longest (most address-efficient) prefix that suffices is:',
          options: ['/24', '/23', '/22', '/25'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'With h host bits a block offers 2^h - 2 usable addresses. Test increasing h: h = 8 gives 254, too few; h = 9 gives 2^9 - 2 = 510, which covers 500. So 9 host bits are needed and the prefix is 32 - 9 = /23. A /24 provides only 254 usable hosts and fails; a /22 provides 1022 and works but wastes half the space, so it is not the longest sufficient prefix. Remember to subtract 2 before comparing: a careless 2^9 = 512 versus 500 still lands on /23 here, but on boundary questions (exactly 510 versus 511 hosts) the subtraction decides the answer.'
        },
        {
          id: 'cn-network-q11',
          q: 'A router aggregates the four networks 200.1.4.0/24, 200.1.5.0/24, 200.1.6.0/24 and 200.1.7.0/24 into a single advertisement. The correct supernet is:',
          options: ['200.1.4.0/23', '200.1.4.0/22', '200.1.0.0/22', '200.1.6.0/22'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Four /24 blocks aggregate into a /22 (each halving of the prefix doubles the block count: /22 spans 2^2 = 4 consecutive /24s). Check alignment: a /22 block in the third octet must start at a multiple of 4, and 4 is a multiple of 4, so 200.1.4.0/22 exactly covers third octets 4, 5, 6 and 7. In binary, 4 = 00000100, 5 = 00000101, 6 = 00000110, 7 = 00000111 share the first 6 bits 000001, confirming 22 common leading bits overall. Option /23 covers only two of the blocks; 200.1.0.0/22 covers octets 0 to 3, the wrong ones. Alignment checking matters: octets 5 to 8 could not be aggregated into one /22 at all.'
        },
        {
          id: 'cn-network-q12',
          q: 'Which one of the following correctly contrasts distance-vector and link-state routing?',
          options: ['Distance-vector floods full topology information to all routers; link-state sends distance tables only to neighbours', 'Distance-vector runs Dijkstra at every router; link-state runs Bellman-Ford', 'Distance-vector sends its distance table only to neighbours; link-state floods link information to all routers, each of which runs Dijkstra', 'Both require every router to know the complete network topology'],
          answer: 2,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Distance-vector routing (RIP) is distributed Bellman-Ford: each router knows only distances, tells only its directly connected neighbours, and iteratively relaxes d(X) = min over neighbours (link cost + reported distance). No router ever learns the topology. Link-state routing (OSPF) is the opposite on both axes: each router floods small advertisements describing its own links to every router in the area, so all routers build the same topology database and each independently runs Dijkstra to compute shortest paths. The first two options swap the algorithms and the dissemination models, and the fourth is true only of link-state. The slogan worth memorizing: distance-vector tells neighbours about everything; link-state tells everyone about neighbours.'
        },
        {
          id: 'cn-network-q13',
          q: 'Router R reaches neighbour P at cost 2 and neighbour Q at cost 3. P advertises that its distance to network X is 5, and Q advertises distance 3 to X. After a distance-vector update, the entry of R for X is:',
          options: ['Distance 6 via Q', 'Distance 7 via P', 'Distance 5 via Q', 'Distance 6 via P'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Apply the Bellman-Ford relaxation: for each neighbour, candidate distance = cost to the neighbour + distance the neighbour advertises. Via P: 2 + 5 = 7. Via Q: 3 + 3 = 6. R selects the minimum, 6, and records Q as the next hop for X. Note that R adds its own link cost to each advertisement — forgetting the addition gives the distractor 5 via Q, and picking the neighbour with the cheaper direct link rather than the cheaper total gives 7 via P. In a full GATE table question the same relaxation is applied per destination, one row at a time; done carefully it is purely mechanical.'
        },
        {
          id: 'cn-network-q14',
          q: 'When a router decrements the TTL of a datagram to zero, it discards the datagram and sends which message back to the source?',
          options: ['An ARP reply', 'An ICMP time-exceeded message', 'An ICMP echo reply', 'A DHCP NAK'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Every router decrements TTL by at least one; when it reaches zero the datagram is dropped to prevent packets from circulating forever in a routing loop, and the router reports the event to the source with an ICMP time-exceeded message. Traceroute exploits exactly this mechanism: it sends probes with TTL = 1, 2, 3 and so on, and each time-exceeded reply reveals the address of one more router along the path. Echo request and reply are the ping pair, a different ICMP use. ARP and DHCP operate on the local link and have nothing to do with datagram lifetime. So TTL is a hop counter, not a timer, despite its name.'
        },
        {
          id: 'cn-network-q15',
          q: 'An organization holding the block 145.97.0.0/16 must create 64 subnets of equal size. The subnet prefix length and the number of usable hosts per subnet are:',
          options: ['/22 and 1022', '/22 and 1024', '/24 and 254', '/21 and 2046'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Creating 64 = 2^6 subnets requires borrowing 6 bits from the host part, extending the prefix from /16 to /22. Each subnet then keeps 32 - 22 = 10 host bits, giving 2^10 = 1024 addresses per subnet, of which the subnet address and the broadcast address are reserved: 1024 - 2 = 1022 usable hosts. The subnets are 145.97.0.0/22, 145.97.4.0/22, 145.97.8.0/22 and so on, stepping by 4 in the third octet. Option two forgets the two reserved addresses, /24 would create 256 subnets (over-dividing), and /21 yields only 32 subnets, too few. The two-step recipe — bits for subnets first, then hosts from what remains — solves every question of this family.'
        },
        {
          id: 'cn-network-q16',
          q: 'Which statement about NAT (network address translation) is TRUE?',
          options: ['NAT operates purely at the data link layer and rewrites MAC addresses', 'NAT allows many hosts with private addresses to share one public IPv4 address by translating addresses and port numbers', 'NAT increases the number of globally routable IPv4 addresses available worldwide', 'NAT encrypts private traffic before it enters the public internet'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'A NAT router sits at the border of a private network (addresses such as 10.0.0.0/8 or 192.168.0.0/16) and rewrites the source IP address and source port of outgoing packets to its own public address and a unique port, recording the mapping in a translation table; replies are mapped back using the destination port. Because the port field disambiguates connections, thousands of internal hosts can share one public address — this is why NAT dramatically slowed IPv4 exhaustion without creating any new addresses (option three is wrong). It works at the network and transport layers, not the link layer, and performs no encryption. Its known cost is breaking the end-to-end model, complicating inbound connections.'
        }
      ]
    }
]};


window.GATE_DATA.questions['cn'].topics.push({
  id: 'cn-transport',
  name: 'Transport Layer — TCP & UDP',
  theory: {
    intro: 'The transport layer is where GATE Computer Networks becomes an arithmetic exam. UDP is the easy half: connectionless, unreliable, no flow or congestion control, an 8-byte header, used where speed matters more than guaranteed delivery. TCP is the heavy half and dominates the marks: the 3-way handshake and 4-way teardown, sequence and acknowledgement number bookkeeping, the sliding receive window for flow control, and above all congestion control — slow start, congestion avoidance (AIMD), and the different reactions to a timeout versus three duplicate ACKs. GATE loves to hand you an initial cwnd, a threshold, and a sequence of rounds, and ask you to trace how cwnd evolves segment by segment or RTT by RTT, or to compute how many RTTs it takes to send a file of a given size. Round-trip time estimation via exponentially weighted moving averages is a smaller but recurring numeric theme. Master the arithmetic recipes here and this topic becomes as mechanical as the data link layer.',
    core: 'UDP versus TCP. UDP is connectionless: no handshake, no acknowledgements, no retransmission, no ordering guarantee, no flow or congestion control. Its header is a fixed 8 bytes: source port, destination port, length, checksum (each 2 bytes). It suits DNS queries, streaming media and applications that implement their own reliability. TCP is connection-oriented and provides reliable, ordered, byte-stream delivery with flow control and congestion control; its header is at least 20 bytes.\n\nTCP header fields. Source port and destination port (16 bits each) identify the connection along with the two IP addresses. Sequence number (32 bits) identifies the byte-stream position of the first data byte in the segment. Acknowledgement number (32 bits) is valid when the ACK flag is set and names the next byte the receiver expects (cumulative ACK). HLEN (4 bits, in 4-byte words) gives header length, 20 to 60 bytes. Control flags include URG, ACK, PSH, RST, SYN and FIN. Window size (16 bits) advertises the receiver\'s available buffer space for flow control. Checksum and urgent pointer complete the fixed fields; options (such as window scaling and MSS) can extend the header.\n\nConnection establishment: the 3-way handshake. Client sends SYN with an initial sequence number x (SYN = 1, seq = x). Server replies SYN+ACK with its own initial sequence number y and acknowledgement x+1 (SYN = 1, ACK = 1, seq = y, ack = x+1). Client replies ACK with seq = x+1 and ack = y+1. Both SYN segments consume one sequence number even though they carry no data, which is why the first real data byte in each direction starts at x+1 or y+1.\n\nConnection teardown: 4-way (usually). Either side can initiate: it sends FIN, the peer ACKs it, then when the peer is also done it sends its own FIN, which the first side ACKs. Because each FIN consumes one sequence number, the ack after a FIN is (that side\'s sequence number so far) + 1. When the peer\'s ACK and FIN can be piggybacked together, teardown compresses to 3 segments.\n\nSequence and acknowledgement arithmetic. If a segment carries seq = S and L bytes of data, the next expected sequence number (and hence the ACK value the receiver sends back, assuming no loss) is S + L. Cumulative ACKs mean a single ACK can cover several segments at once if they arrived in order.\n\nFlow control. The receiver advertises a window (rwnd) in every ACK, capping how many unacknowledged bytes the sender may have outstanding: LastByteSent - LastByteAcked <= rwnd. This protects a slow receiver regardless of network conditions; it is entirely separate from congestion control, which protects the network.\n\nCongestion control. TCP maintains a congestion window cwnd, in addition to rwnd, and sends min(cwnd, rwnd) bytes at a time. Slow start: cwnd begins at 1 MSS (or a small constant) and doubles every RTT (each received ACK increases cwnd by 1 MSS, so a full window of ACKs doubles it) until cwnd reaches the slow-start threshold ssthresh, or a loss occurs. Congestion avoidance (AIMD, additive increase): once cwnd >= ssthresh, cwnd grows by roughly 1 MSS per RTT (linear, additive increase) instead of doubling. On loss detected by a timeout: ssthresh is set to cwnd/2 (of the window at the time of loss), cwnd resets to 1 MSS, and slow start begins again — a severe reaction reserved for the worse signal. On loss detected by three duplicate ACKs (fast retransmit): the lost segment is resent immediately without waiting for a timeout, ssthresh is set to cwnd/2, and cwnd is set to ssthresh (not reset to 1) before resuming congestion avoidance — this is fast recovery, a much gentler response because duplicate ACKs prove that later segments are still getting through.\n\nRTT estimation. TCP maintains a smoothed round-trip time using an exponentially weighted moving average: EstimatedRTT = (1 - alpha) x EstimatedRTT + alpha x SampleRTT, with alpha typically 0.125. A companion deviation term DevRTT tracks variability, and the retransmission timeout is set as RTO = EstimatedRTT + 4 x DevRTT, giving more slack when RTT is jittery.',
    strategy: 'GATE patterns. (1) Handshake/teardown sequence-number tracing: given initial sequence numbers, fill in the SYN, SYN+ACK, ACK values, or find the ack number after a data segment. (2) cwnd evolution: given initial cwnd (often 1 MSS), ssthresh, MSS size and RTT, trace cwnd round by round through slow start and congestion avoidance, and answer "cwnd after round n" or "number of RTTs to send X KB". (3) Timeout versus 3-dup-ACK: know that a timeout is more punishing (cwnd to 1) while 3 dup ACKs trigger fast recovery (cwnd to ssthresh, not 1). (4) EWMA computation for EstimatedRTT given a sequence of SampleRTTs and alpha. (5) UDP vs TCP header size and use-case one-markers.\n\nTraps. Slow start doubles cwnd every RTT, it does not add a fixed amount — mixing this with additive increase is the single most common error. When cwnd (in MSS units) crosses ssthresh mid-round, growth switches from doubling to +1 per RTT starting from the next RTT, not mid-round. On a timeout, ssthresh takes half of the cwnd value at the moment of loss, not half of the current ssthresh. Sequence numbers for SYN and FIN each consume exactly one number even with zero data bytes — a frequent off-by-one trap.\n\nWorked mini-example. cwnd starts at 1 MSS, ssthresh = 8 MSS. Slow start: RTT1 cwnd=1->2, RTT2 cwnd=2->4, RTT3 cwnd=4->8 (hits ssthresh, switch to congestion avoidance from RTT4). RTT4 cwnd=8->9, RTT5 cwnd=9->10. If a timeout now occurs with cwnd=10: new ssthresh = 10/2 = 5, cwnd resets to 1, slow start resumes toward the new ssthresh of 5. If instead 3 dup ACKs occurred at cwnd=10: new ssthresh = 5, cwnd is set directly to 5 (fast recovery), and congestion avoidance resumes immediately without the doubling phase. Practise writing out such a round-by-round table; GATE frequently asks for the cwnd value at a specific numbered RTT.'
  },
  questions: [
    {
      id: 'cn-transport-q1',
      q: 'Which of the following is a key property that distinguishes UDP from TCP?',
      options: ['UDP guarantees in-order delivery of all datagrams', 'UDP performs no connection setup, acknowledgement, or congestion control', 'UDP header is larger than the TCP header', 'UDP retransmits lost datagrams automatically'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'UDP is a bare-bones, connectionless transport protocol: it sends each datagram independently with no three-way handshake, no acknowledgements, no retransmission of lost datagrams, no reordering, and no congestion or flow control. This keeps its header tiny (8 bytes: source port, destination port, length, checksum) versus TCP\'s minimum 20 bytes, and it makes UDP suitable for latency-sensitive or self-managed applications such as DNS queries and real-time media. TCP, in contrast, provides all of the reliability machinery UDP lacks. The other options each describe TCP behaviour incorrectly attributed to UDP, which has none of them.'
    },
    {
      id: 'cn-transport-q2',
      q: 'In the TCP header, which field allows a receiver to limit how much unacknowledged data a sender may have in flight, independent of network congestion?',
      options: ['Sequence number', 'Window size (advertised window)', 'Urgent pointer', 'Header length (HLEN)'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'The 16-bit window size field carried in every TCP segment advertises the receiver\'s current available buffer space, and the sender must ensure LastByteSent - LastByteAcked never exceeds this value. This mechanism is flow control: it protects a slow or busy receiver from being overwhelmed, and it is entirely determined by the receiver\'s buffer state, not by conditions in the network. Congestion control (the cwnd variable) is a separate, sender-side mechanism protecting the network itself. Sequence number tracks byte-stream position, the urgent pointer marks out-of-band data, and HLEN just records header length in 4-byte words.'
    },
    {
      id: 'cn-transport-q3',
      q: 'A TCP client sends a SYN with sequence number 5000 to open a connection. The server responds with SYN+ACK carrying sequence number 9000. The acknowledgement number in the server\'s SYN+ACK segment is:',
      options: ['5000', '5001', '9000', '9001'],
      answer: 1,
      marks: 1,
      difficulty: 'medium',
      type: 'numerical',
      explanation: 'Even though a SYN segment carries no application data, the SYN flag itself consumes one sequence number. The client\'s SYN uses seq = 5000, so the byte-stream position the server must next acknowledge is 5000 + 1 = 5001. The server\'s own sequence number, 9000, is unrelated to this acknowledgement value — it is the starting point for the server\'s own outgoing byte stream, which the client will separately acknowledge as 9001 in the final leg of the handshake. Confusing the two independent sequence-number spaces of the two directions is the main trap in three-way handshake questions.'
    },
    {
      id: 'cn-transport-q4',
      q: 'A TCP sender transmits a segment with sequence number 2001 carrying 500 bytes of data, and it is received correctly with no other segments in flight. The acknowledgement number the receiver sends back is:',
      options: ['2001', '2500', '2501', '500'],
      answer: 2,
      marks: 1,
      difficulty: 'easy',
      type: 'numerical',
      explanation: 'TCP acknowledgement numbers are cumulative and name the next byte the receiver expects, not the last byte received. The segment occupies byte positions 2001 through 2001 + 500 - 1 = 2500. The next byte the receiver has not yet seen is byte 2501, so the acknowledgement number is 2501 = seq + length = 2001 + 500. This "sequence number of first byte plus data length" rule is the single formula behind nearly every TCP ACK-number question, whether for one segment or a run of several segments received in order.'
    },
    {
      id: 'cn-transport-q5',
      q: 'During a normal TCP connection close where each side sends its own FIN separately, how many segments are exchanged in total, and how does each FIN affect sequence-number bookkeeping?',
      options: ['3 segments; only ACKs consume sequence numbers', '4 segments; each FIN consumes exactly one sequence number, just like a SYN', '2 segments; FIN carries no sequence-number cost', '4 segments; each FIN consumes one sequence number per byte of data it carries'],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'concept',
      explanation: 'A full, non-piggybacked TCP teardown is a four-way exchange: side A sends FIN, side B ACKs it, side B later sends its own FIN when it is also done, and side A ACKs that. Like SYN, the FIN flag consumes exactly one sequence number even though it typically carries zero data bytes, so the ACK that follows a FIN is (that side\'s sequence number at the FIN) + 1. If B\'s ACK and its own FIN happen to be sent together, the exchange compresses to three segments, but the question specifies each side sending its FIN separately, so four segments are needed. This one-sequence-number rule for control flags with no payload is easy to forget under time pressure.'
    },
    {
      id: 'cn-transport-q6',
      q: 'TCP begins a connection with cwnd = 1 MSS and ssthresh = 16 MSS, growing purely by slow start (no losses). What is cwnd, in MSS units, immediately after the 4th RTT of transmission?',
      options: ['4', '8', '16', '32'],
      answer: 2,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: 'In slow start, cwnd doubles after every RTT because each of the cwnd segments sent gets an ACK that adds 1 MSS, and a full window of ACKs therefore doubles the window. Starting at cwnd = 1: after RTT1, cwnd = 2; after RTT2, cwnd = 4; after RTT3, cwnd = 8; after RTT4, cwnd = 16. Since ssthresh is 16, this exactly reaches the threshold at RTT4 (the switch to linear congestion-avoidance growth begins from RTT5 onward). The doubling pattern (1, 2, 4, 8, 16 after RTTs 0 through 4) should become an instant mental table for these questions.'
    },
    {
      id: 'cn-transport-q7',
      q: 'TCP has cwnd = 8 MSS and ssthresh = 8 MSS, currently at the boundary between slow start and congestion avoidance. Assuming no loss, what is cwnd after 3 more RTTs?',
      options: ['16 MSS', '64 MSS', '11 MSS', '24 MSS'],
      answer: 2,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: 'Because cwnd has already reached ssthresh, all further growth (with no losses) uses congestion avoidance, which increases cwnd by roughly 1 MSS per RTT (additive increase), not by doubling. Starting at cwnd = 8: after RTT1, cwnd = 9; after RTT2, cwnd = 10; after RTT3, cwnd = 11 MSS. The distractor 64 MSS wrongly continues slow-start doubling (8->16->32->64) past the threshold, and 16 MSS applies only one doubling step. This question tests exactly the switch-over rule: once cwnd >= ssthresh, growth becomes linear, and it stays linear until a loss event resets the state.'
    },
    {
      id: 'cn-transport-q8',
      q: 'A TCP sender has cwnd = 20 MSS when it detects a lost segment via a retransmission timeout (no duplicate ACKs were received). Immediately after this event, ssthresh and cwnd become:',
      options: ['ssthresh = 10 MSS, cwnd = 10 MSS', 'ssthresh = 10 MSS, cwnd = 1 MSS', 'ssthresh = 20 MSS, cwnd = 1 MSS', 'ssthresh unchanged, cwnd = 20 MSS'],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'concept',
      explanation: 'A timeout is treated as a severe congestion signal because it means no feedback at all has arrived for a while. TCP sets the new ssthresh to half the cwnd value at the time of loss: 20 / 2 = 10 MSS. It then resets cwnd all the way down to 1 MSS and re-enters slow start from scratch, growing back up toward the new, lower ssthresh before switching to congestion avoidance. This harsh reset is what distinguishes timeout-triggered loss recovery from the gentler fast-recovery path taken after three duplicate ACKs, where cwnd is set to ssthresh rather than collapsed to 1.'
    },
    {
      id: 'cn-transport-q9',
      q: 'A TCP sender has cwnd = 20 MSS when it receives three duplicate ACKs indicating a single lost segment (fast retransmit is triggered). Under standard TCP Reno fast recovery, ssthresh and cwnd become:',
      options: ['ssthresh = 10 MSS, cwnd = 1 MSS', 'ssthresh = 10 MSS, cwnd = 10 MSS', 'ssthresh = 20 MSS, cwnd = 20 MSS', 'ssthresh unchanged, cwnd = 1 MSS'],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'pyq-style',
      explanation: 'Three duplicate ACKs indicate that segments after the lost one are still arriving, which is much better news than a timeout, so TCP Reno reacts more gently. As with a timeout, ssthresh is halved: 20 / 2 = 10 MSS. But instead of collapsing cwnd to 1 MSS and restarting slow start, fast recovery sets cwnd directly to the new ssthresh value, here 10 MSS, and the connection resumes in congestion avoidance (linear growth) immediately. This is the crux distinction GATE tests repeatedly: timeout collapses cwnd to 1, three duplicate ACKs collapse cwnd only to ssthresh.'
    },
    {
      id: 'cn-transport-q10',
      q: 'TCP measures a SampleRTT of 120 ms when the current EstimatedRTT is 100 ms, using the standard EWMA formula with alpha = 0.125. The new EstimatedRTT is:',
      options: ['110 ms', '102.5 ms', '100 ms', '120 ms'],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: 'The EWMA update is EstimatedRTT_new = (1 - alpha) x EstimatedRTT_old + alpha x SampleRTT. Substituting alpha = 0.125, EstimatedRTT_old = 100 and SampleRTT = 120: (0.875 x 100) + (0.125 x 120) = 87.5 + 15 = 102.5 ms. The formula deliberately weights the long-run history heavily (0.875) and the newest sample lightly (0.125), so a single fluctuating sample nudges the estimate only slightly rather than swinging it all the way to 120 ms or leaving it unchanged at 100 ms — both of which are the intended wrong-answer traps here.'
    },
    {
      id: 'cn-transport-q11',
      q: 'Which statement correctly contrasts flow control and congestion control in TCP?',
      options: ['Flow control protects the network from overload; congestion control protects the receiver buffer', 'Flow control uses the receiver-advertised window; congestion control uses the sender-maintained cwnd, and TCP sends min(cwnd, rwnd) bytes', 'Both mechanisms use the same single window variable', 'Congestion control is signalled by the receiver in every ACK, exactly like flow control'],
      answer: 1,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: 'Flow control exists to prevent a fast sender from overrunning a slow receiver\'s buffer; the receiver reports its available space as the advertised window (rwnd) in every ACK. Congestion control exists to prevent the sender from overloading the shared network; the sender itself estimates the network\'s capacity via the congestion window (cwnd), adjusting it based on signals like timeouts and duplicate ACKs that the receiver never directly reports. At any instant, TCP caps outstanding data by the smaller of the two: min(cwnd, rwnd). The two mechanisms address different problems (receiver capacity versus network capacity) and are computed by different parties.'
    },
    {
      id: 'cn-transport-q12',
      q: 'A TCP connection starts with cwnd = 1 MSS in slow start, with ssthresh = 64 MSS (never reached in this range) and RTT = 100 ms. Ignoring transmission and propagation time beyond RTT counting, how long after connection start does cwnd first reach 32 MSS?',
      options: ['300 ms', '400 ms', '500 ms', '600 ms'],
      answer: 2,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: 'In slow start cwnd doubles every RTT: after RTT1, cwnd = 2; RTT2, cwnd = 4; RTT3, cwnd = 8; RTT4, cwnd = 16; RTT5, cwnd = 32. Since ssthresh = 64 is never reached before cwnd hits 32, the doubling continues uninterrupted for all 5 RTTs. Elapsed time = 5 x RTT = 5 x 100 ms = 500 ms. The distractor 400 ms corresponds to stopping one RTT early (cwnd = 16), and 600 ms overshoots by one RTT (cwnd = 64) — both common off-by-one slips when counting doubling steps starting from cwnd = 1 rather than from RTT = 0.'
    },
    {
      id: 'cn-transport-q13',
      q: 'Which of the following correctly distinguishes go-back-N style loss recovery at the data link layer from TCP\'s response to duplicate ACKs at the transport layer?',
      options: ['Both discard all frames/segments after the lost one, whether or not they arrived correctly', 'Go-back-N retransmits everything from the lost frame onward regardless of what arrived later; TCP fast retransmit resends only the missing segment while later correctly received data may already be buffered or acknowledged by SACK', 'TCP always requires a full timeout before retransmitting anything, exactly like go-back-N', 'Neither protocol uses cumulative acknowledgements'],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'concept',
      explanation: 'Go-back-N receivers discard any frame that arrives out of order, so after a loss the sender must retransmit the lost frame and everything sent after it, even if some of those later frames were physically received correctly. TCP\'s fast retransmit, triggered by three duplicate ACKs, targets only the specific missing segment named by the duplicate ACKs; later segments that arrived correctly are not necessarily discarded (and with selective acknowledgement/SACK extensions the receiver can explicitly report them so they need not be resent at all). Both protocols do use cumulative-style acknowledgements at their base, so option four is wrong, and TCP does not need to wait for a timeout when duplicate ACKs already signal the loss.'
    },
    {
      id: 'cn-transport-q14',
      q: 'Which pair of transport-layer applications typically prefers UDP, and why?',
      options: ['File transfer and email, because reliability outweighs speed', 'DNS lookups and live audio/video streaming, because low latency and simplicity outweigh strict reliability and in-order delivery', 'Remote login and web browsing, because ordered byte streams are essential', 'Database transactions, because congestion control is unnecessary for them'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'DNS queries are short, latency-sensitive request-response exchanges where the overhead of a full TCP handshake would be wasteful, and the application itself can simply retry on timeout; UDP\'s connectionless, header-light design fits perfectly. Live audio and video streaming similarly favour UDP because a late-arriving retransmitted packet is often useless (the playback point has moved on), so occasional loss is preferred over the delay that TCP\'s reliability and congestion control would introduce. File transfer, email, remote login and web browsing all need guaranteed, ordered, complete delivery of every byte, which is exactly what TCP is built to provide, so they use TCP instead.'
    },
    {
      id: 'cn-transport-q15',
      q: 'In TCP, after the connection enters congestion avoidance and no losses occur, cwnd grows approximately linearly at about 1 MSS per RTT. If cwnd = 12 MSS at the start of congestion avoidance, what is cwnd after 6 RTTs of loss-free congestion avoidance?',
      options: ['18 MSS', '72 MSS', '48 MSS', '24 MSS'],
      answer: 0,
      marks: 1,
      difficulty: 'easy',
      type: 'numerical',
      explanation: 'Congestion avoidance is additive increase: cwnd grows by roughly 1 MSS for every RTT of successful transmission, unlike the doubling of slow start. Starting at cwnd = 12 MSS and adding 1 MSS per RTT for 6 RTTs gives 12 + 6 = 18 MSS. The distractor 72 MSS mistakenly doubles cwnd every RTT (a slow-start reflex applied where it does not belong), 48 MSS multiplies by 4, and 24 MSS mistakenly doubles once — all confusing the linear congestion-avoidance rule with the exponential slow-start rule.'
    },
    {
      id: 'cn-transport-q16',
      q: 'A TCP sender\'s current RTO (retransmission timeout) is computed as EstimatedRTT + 4 x DevRTT. If EstimatedRTT = 80 ms and DevRTT = 15 ms, the RTO is:',
      options: ['95 ms', '140 ms', '120 ms', '60 ms'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'numerical',
      explanation: 'The standard TCP timeout formula adds a safety margin proportional to how much RTT samples have recently varied: RTO = EstimatedRTT + 4 x DevRTT = 80 + 4 x 15 = 80 + 60 = 140 ms. The factor of 4 on the deviation term ensures that when the network is jittery (large DevRTT) the timer waits considerably longer before assuming a segment is lost, avoiding spurious retransmissions; when the network is stable, DevRTT stays small and RTO tracks close to EstimatedRTT. The distractor 95 ms drops the factor of 4, treating DevRTT as added only once.'
    }
  ]
});

window.GATE_DATA.questions['cn'].topics.push({
  id: 'cn-application',
  name: 'Application Layer & Network Security Basics',
  theory: {
    intro: 'The application layer collects the protocols that end users actually touch, and GATE tests them mostly at the conceptual level, with a handful of numeric questions on HTTP timing and DNS round trips. You must know DNS name resolution end to end, distinguishing iterative from recursive queries and the roles of root, TLD and authoritative servers. HTTP questions compare persistent versus non-persistent connections and, with or without pipelining, ask how many round-trip times are needed to fetch a page and its embedded objects. Mail protocols split cleanly into three roles: SMTP pushes mail between servers, while POP3 and IMAP let a client retrieve mail, with different sync behaviour. FTP is unusual for using two separate TCP connections. Finally, network security basics — symmetric versus asymmetric (public-key) cryptography, the RSA idea, digital signatures for authentication and integrity, and where a firewall sits — round out the topic with reliable one-mark and two-mark conceptual questions.',
    core: 'DNS. The Domain Name System resolves names to IP addresses through a distributed, hierarchical database of name servers: root servers (know the TLD servers), top-level-domain servers (.com, .org, .in, know the authoritative servers for domains under them), and authoritative servers (hold the actual records for a specific domain). A client typically makes a recursive query to its local (ISP) resolver: it asks one question and expects a complete final answer, with the resolver doing all the further work. The local resolver, in turn, usually makes iterative queries to the root, then TLD, then authoritative server: each queried server either answers directly or refers the resolver to the next server down the hierarchy, and the resolver itself follows each referral. Caching at every level (with a time-to-live) is what makes repeated lookups fast; without any cache, a full recursive resolution from scratch takes multiple round trips (root, then TLD, then authoritative, i.e. proportional to the number of hierarchy levels visited).\n\nHTTP connections. Non-persistent HTTP opens a fresh TCP connection for every single object (the base HTML page, then separately for each embedded image, script or stylesheet), so each object costs one full TCP connection setup (commonly modeled as 1 RTT for the handshake) plus 1 RTT for the HTTP request/response, i.e. 2 RTTs per object if connections are not overlapped, or 2 RTTs total for the first object followed by 2 RTTs per remaining object when done serially (using separate parallel connections can hide this behind concurrency). Persistent HTTP without pipelining reuses one TCP connection for all objects on the same server but still sends one request and waits for its full response before sending the next: 1 RTT for the (one-time) connection setup, then 1 RTT for the base page, then 1 RTT for each of the n embedded objects fetched serially, totaling 1 + 1 + n RTTs for a page with n embedded objects. Persistent HTTP with pipelining sends all requests back to back without waiting for individual responses, so after the initial connection and first exchange, all remaining objects can effectively be fetched in one further RTT (assuming they fit in the pipeline and bandwidth is not the bottleneck): total approximately 1 (setup) + 1 (base page) + 1 (all remaining objects pipelined) RTTs, dramatically fewer than the non-pipelined or non-persistent cases when n is large. HTTP itself is a stateless, text-based request-response protocol running over TCP; common methods are GET, POST, PUT, DELETE, and status codes such as 200 OK, 301/302 redirect, 404 Not Found, 500 server error.\n\nMail protocols. SMTP (Simple Mail Transfer Protocol) pushes a message from a sender\'s mail server to a recipient\'s mail server (and from client to its outgoing server); it is a push protocol and cannot be used by a client to pull mail down from its own mailbox. POP3 (Post Office Protocol) is a simple pull protocol: a client connects, authenticates, downloads all waiting mail, and typically deletes it from the server (though a "leave mail on server" option exists) — it does not maintain folders or synchronized state across multiple client devices. IMAP (Internet Message Access Protocol) is a richer pull protocol: mail stays on the server, organized into folders, and multiple clients can see the same synchronized mailbox state (read/unread flags, folder structure) — a heavier but more capable protocol than POP3.\n\nFTP. File Transfer Protocol is unusual among application-layer protocols for using two separate parallel TCP connections: a control connection (port 21) that stays open for the whole session, carrying commands and replies (login, directory listing, file requests), and a separate data connection (port 20 in active mode, or a negotiated port in passive mode) opened afresh for each actual file transfer or directory listing and closed once that transfer completes. This separation of control and data is a favourite one-mark distinguishing fact.\n\nSockets. A socket is the application programming interface endpoint identified by the combination of IP address and port number; a TCP server socket after accept() spawns a new connected socket per client while the original listening socket keeps accepting further connections, so a single well-known port can serve many simultaneous clients, each distinguished by the unique four-tuple (source IP, source port, destination IP, destination port).\n\nSecurity basics. Symmetric-key cryptography uses one shared secret key for both encryption and decryption (fast, but the key must be distributed securely in advance; example: AES). Asymmetric (public-key) cryptography uses a mathematically linked key pair: data encrypted with the public key can only be decrypted with the matching private key, and vice versa; the public key can be freely published while the private key stays secret. RSA is the classic example: it picks two large primes p and q, computes n = p x q and Euler\'s totient phi(n) = (p-1)(q-1), chooses a public exponent e coprime to phi(n), and derives a private exponent d such that e x d ≡ 1 (mod phi(n)); the public key is (e, n) and the private key is (d, n); encryption is c = m^e mod n and decryption is m = c^d mod n. A digital signature reverses the usual roles for authentication and integrity: the sender encrypts (signs) a message digest with its own private key, and anyone can verify the signature by decrypting with the sender\'s public key and comparing to a freshly computed hash — this proves the message came from that sender (authentication) and was not altered (integrity), but provides no confidentiality by itself, which is why signing is often combined with separate encryption. Firewalls sit at the boundary of a network and filter traffic by rules (packet-filter firewalls check IP/port/protocol headers at the network/transport layer; application-layer/proxy firewalls inspect content), blocking or allowing packets to protect internal hosts from unwanted external traffic.',
    strategy: 'GATE patterns. (1) DNS: recursive versus iterative query direction, and counting round trips for a cold (uncached) lookup through the hierarchy. (2) HTTP RTT counting: given n embedded objects, compute total time for non-persistent (no parallel connections), persistent without pipelining, and persistent with pipelining — these differ sharply and are a favourite two-mark question. (3) One-mark protocol-matching: which protocol pushes vs pulls mail, which uses two TCP connections, which port number goes with which protocol (well-known ports: HTTP 80, HTTPS 443, FTP 20/21, SMTP 25, POP3 110, IMAP 143, DNS 53, Telnet 23, SSH 22). (4) Symmetric vs asymmetric crypto: key count, speed, key-distribution problem, and what a digital signature actually achieves (authentication and integrity, not confidentiality). (5) RSA small-number computation: given p, q, e, find n, phi(n), d, or compute a small ciphertext/plaintext by modular exponentiation.\n\nTraps. A client asking its local resolver "give me the full answer" is a recursive query; the resolver asking root/TLD/authoritative servers, expecting to be told the next hop if the queried server does not know, is iterative — do not swap these labels. In HTTP RTT questions, the base HTML page itself must be fetched before the browser even knows which embedded objects exist, so its 1 RTT is never skipped or pipelined with the rest. POP3 by default removes mail from the server; IMAP does not — mixing these up is common. Digital signatures use the signer\'s private key to sign and the signer\'s public key to verify — the reverse of ordinary public-key encryption, where the sender uses the recipient\'s public key.\n\nWorked mini-example. A page has 1 base HTML file and 5 embedded images, all from the same server, RTT = 20 ms, negligible transmission time, no caching, connections not already open. Non-persistent (no parallel connections): 2 RTT for base page (connect + request) + 5 x 2 RTT for images = 12 RTT = 240 ms. Persistent without pipelining: 1 RTT (connect) + 1 RTT (base page) + 5 x 1 RTT (images, serial) = 7 RTT = 140 ms. Persistent with pipelining: 1 RTT (connect) + 1 RTT (base page) + 1 RTT (all 5 images pipelined together) = 3 RTT = 60 ms. Reproduce this three-way comparison from scratch; GATE often asks for just one of the three totals or for the difference between two of them.'
  },
  questions: [
    {
      id: 'cn-application-q1',
      q: 'A client sends a single DNS query to its local (ISP) resolver and expects a complete final answer, leaving all further contact with other name servers to the resolver. This query, from the client to the resolver, is best classified as:',
      options: ['An iterative query', 'A recursive query', 'A zone transfer', 'A reverse lookup'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'A recursive query places the entire burden of finding the final answer on the server that was asked: the client asks once and either gets the resolved IP address or an error, never a referral to another server. The local resolver, having accepted this recursive request from the client, typically then issues iterative queries of its own to the root, top-level-domain and authoritative servers — each of those servers responds either with the final answer or with a referral to the next server down, leaving the resolver to follow up itself. Confusing which leg of the resolution is recursive (client to resolver) and which is iterative (resolver to the hierarchy) is the most common DNS error in GATE.'
    },
    {
      id: 'cn-application-q2',
      q: 'In the standard DNS hierarchy resolving a name like www.example.com from a completely empty cache, the local resolver contacts, in order:',
      options: ['The authoritative server, then the TLD server, then the root server', 'The root server, then the TLD (.com) server, then the authoritative server for example.com', 'Only the TLD server, which always has the final IP address cached', 'The root server, which directly returns the IP address'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'DNS names are resolved by walking down the domain hierarchy from the most general to the most specific. With nothing cached, the resolver first asks a root server, which does not know the final address but knows which server handles the .com top-level domain and refers the resolver there. The .com TLD server does not know the address either, but knows which server is authoritative for example.com and refers the resolver there. Finally the authoritative server for example.com holds the actual record and returns the IP address. This root-then-TLD-then-authoritative order, and the fact that each level only ever holds a referral to the next level (never the final answer itself, except at the authoritative server), is a frequently tested fact.'
    },
    {
      id: 'cn-application-q3',
      q: 'A browser fetches a web page over HTTP using a separate, non-persistent TCP connection for every single object (base page and each embedded image), with no parallel connections. If RTT = 10 ms, TCP connection setup takes 1 RTT and each object request/response also takes 1 RTT, and the page has 3 embedded images besides the base HTML file, the total time to fetch everything is:',
      options: ['40 ms', '80 ms', '70 ms', '30 ms'],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: 'Non-persistent HTTP opens and closes a fresh TCP connection for every object. Each object therefore costs 1 RTT for the TCP handshake plus 1 RTT for the HTTP request and response, i.e. 2 RTTs per object. There are 4 objects total (1 base HTML page + 3 images), so total = 4 x 2 x RTT = 8 x 10 ms = 80 ms. This is markedly worse than a persistent connection, which pays the connection-setup RTT only once for the whole page; that saving is exactly why HTTP/1.1 made persistent connections the default. Forgetting to double for the handshake gives the 40 ms distractor.'
    },
    {
      id: 'cn-application-q4',
      q: 'The same page (1 base HTML file plus 3 embedded images from the same server, RTT = 10 ms) is fetched using a persistent HTTP connection without pipelining (one request is sent, and its full response is received, before the next request is sent). The total time is:',
      options: ['80 ms', '50 ms', '30 ms', '20 ms'],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: 'With a persistent connection, the TCP handshake happens only once: 1 RTT. The base HTML page is then requested and received: 1 more RTT (and only after this does the browser learn which images to request). Because pipelining is not used, each of the 3 images is requested and its response fully received before the next request goes out, costing 1 RTT each: 3 more RTTs. Total = 1 + 1 + 3 = 5 RTTs = 5 x 10 ms = 50 ms. Compare this to the 80 ms needed for non-persistent connections on the same page — persistence alone (without pipelining) already saves 30 ms here by eliminating the repeated handshakes.'
    },
    {
      id: 'cn-application-q5',
      q: 'The same page (1 base HTML file plus 3 embedded images, RTT = 10 ms) is fetched over a persistent HTTP connection WITH pipelining, so that after the base page arrives, all three image requests are sent back to back and their responses are effectively received within one further RTT. The total time is:',
      options: ['50 ms', '20 ms', '30 ms', '10 ms'],
      answer: 2,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: 'Pipelining still requires the one-time TCP handshake (1 RTT) and still requires fetching the base HTML page first, since the browser cannot know which images exist until it has parsed that page (1 more RTT). Only after that can pipelining help: instead of requesting each image serially, all three requests go out together and their responses come back within roughly one additional RTT. Total = 1 (setup) + 1 (base page) + 1 (all images pipelined) = 3 RTTs = 30 ms. This is faster than the 50 ms non-pipelined persistent case and much faster than the 80 ms non-persistent case, illustrating why pipelining benefits pages with many embedded objects the most.'
    },
    {
      id: 'cn-application-q6',
      q: 'Which statement correctly distinguishes SMTP from POP3?',
      options: ['SMTP is used to pull mail from a mailbox to a client; POP3 pushes mail between mail servers', 'SMTP pushes mail from a sender to a recipient\'s mail server; POP3 is used by a client to pull (download) mail from its mailbox', 'Both protocols are used only between two mail servers, never involving a client', 'SMTP and POP3 are two names for the same protocol running on different ports'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'SMTP (Simple Mail Transfer Protocol) is a push protocol: it is used both by a mail client to hand outgoing mail to its own outgoing mail server, and between mail servers to relay a message toward the recipient\'s server. It cannot be used to retrieve mail. POP3 (Post Office Protocol version 3) works in the opposite direction and role: an end-user\'s mail client uses it to connect to its own mailbox on the mail server and pull down (download) waiting messages, typically removing them from the server afterward. So sending always uses SMTP and retrieving always uses POP3 (or IMAP), a pairing GATE tests as a direct one-mark fact.'
    },
    {
      id: 'cn-application-q7',
      q: 'Which mail access protocol allows mail to remain stored on the server in organized folders, with multiple client devices seeing a synchronized view of read/unread status?',
      options: ['SMTP', 'POP3', 'IMAP', 'FTP'],
      answer: 2,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'IMAP (Internet Message Access Protocol) is designed to keep the authoritative copy of the mailbox on the server, organized into folders that the client merely views and manipulates remotely; because state (read/unread flags, folder membership, deletions) lives on the server, multiple devices logging into the same account see a consistent, synchronized mailbox. POP3, by contrast, is a simpler protocol built around downloading messages to a single client and, by default, removing them from the server, which makes multi-device synchronization awkward. SMTP is unrelated to retrieval (it only pushes mail toward a destination server), and FTP is a general file-transfer protocol with no mailbox concept at all.'
    },
    {
      id: 'cn-application-q8',
      q: 'Which statement about FTP (File Transfer Protocol) is correct?',
      options: ['FTP uses a single TCP connection that carries both commands and file data together', 'FTP uses one persistent control connection for commands and a separate connection opened per transfer for data', 'FTP is a connectionless protocol built directly over UDP', 'FTP requires no authentication because it always operates in anonymous mode'],
      answer: 1,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: 'FTP is distinctive precisely because it separates control from data onto two different TCP connections. The control connection, conventionally on port 21, is opened once at login and stays open for the whole session, carrying commands (login credentials, directory navigation, transfer requests) and their textual replies. A separate data connection (port 20 in active mode, or a port negotiated by the server in passive mode) is opened fresh for each actual file transfer or directory listing and is closed once that particular transfer finishes, while the control connection remains open for further commands. FTP does support (and by default expects) authenticated logins; anonymous FTP is only an optional configuration, not the norm the protocol requires.'
    },
    {
      id: 'cn-application-q9',
      q: 'A TCP server listens on well-known port 80 and accepts connections from many clients concurrently. What uniquely identifies each individual client connection to the server?',
      options: ['The destination port number alone (80)', 'The server\'s IP address alone', 'The four-tuple: source IP, source port, destination IP, destination port', 'The TCP sequence number of the first segment'],
      answer: 2,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: 'Every client connecting to the same server on port 80 shares the same destination IP and destination port, so those two values alone cannot distinguish between clients. What makes each connection unique to the operating system\'s socket layer is the complete four-tuple: source IP address, source port (usually an ephemeral port chosen by the client), destination IP address, and destination port. Two different clients (different source IPs) or the same client opening two connections (different source ports) each get their own distinct four-tuple, and hence their own connected socket, even though the server\'s listening socket remains bound to the single well-known port 80 throughout.'
    },
    {
      id: 'cn-application-q10',
      q: 'In symmetric-key cryptography compared with asymmetric (public-key) cryptography, which statement is TRUE?',
      options: ['Symmetric-key cryptography uses two different keys, one for encryption and one for decryption', 'Symmetric-key cryptography uses the same secret key for both encryption and decryption and is generally faster, but requires securely sharing that key in advance', 'Asymmetric cryptography cannot be used for encryption, only for digital signatures', 'Public-key cryptography requires no key at all'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'In symmetric-key cryptography (such as AES), the exact same secret key both encrypts and decrypts the data, which makes the arithmetic simple and fast, but creates the key-distribution problem: both parties must somehow agree on and protect that one shared key before they can communicate securely, and if the key leaks the whole channel is compromised. Asymmetric (public-key) cryptography solves the distribution problem by using a mathematically related key pair — a public key that can be freely shared and a private key kept secret — and it is used both for encryption/decryption (as in RSA) and for creating digital signatures; it is not restricted to signatures alone. Public-key operations are computationally heavier than symmetric ones, which is why real systems (like TLS) use asymmetric crypto briefly to exchange a symmetric session key, then switch to fast symmetric encryption for the bulk of the traffic.'
    },
    {
      id: 'cn-application-q11',
      q: 'In RSA, a user selects primes p = 3 and q = 11. This gives n = 33 and phi(n) = 20. If the public exponent is chosen as e = 3, the private exponent d satisfying e x d ≡ 1 (mod phi(n)) is:',
      options: ['3', '7', '9', '11'],
      answer: 1,
      marks: 2,
      difficulty: 'hard',
      type: 'numerical',
      explanation: 'We need d such that 3d mod 20 = 1, with d coprime to 20 and typically taken as the smallest positive such value. Testing d = 7: 3 x 7 = 21, and 21 mod 20 = 1 — this satisfies the requirement. Checking the distractors: d = 3 gives 3 x 3 = 9 mod 20 = 9, not 1; d = 9 gives 27 mod 20 = 7, not 1; d = 11 gives 33 mod 20 = 13, not 1. So d = 7 is the modular multiplicative inverse of e = 3 modulo phi(n) = 20, and the private key becomes (d, n) = (7, 33) while the public key is (e, n) = (3, 33). GATE typically keeps p and q small enough that this inverse can be found by direct trial, as done here, rather than requiring the extended Euclidean algorithm.'
    },
    {
      id: 'cn-application-q12',
      q: 'A digital signature scheme is used so that a recipient can verify both who sent a message and that it was not altered in transit. Which statement correctly describes how the signature is created and verified?',
      options: ['The sender encrypts the message digest with the recipient\'s public key; the recipient decrypts with their own private key', 'The sender encrypts the message digest with its own private key; anyone can verify by decrypting with the sender\'s public key and comparing to a freshly computed hash', 'The sender and recipient share one symmetric key used for both signing and verifying', 'Digital signatures provide confidentiality but no proof of who sent the message'],
      answer: 1,
      marks: 2,
      difficulty: 'medium',
      type: 'concept',
      explanation: 'Digital signatures deliberately reverse the usual encryption direction. The sender computes a hash (message digest) of the message and encrypts that digest using its own private key — something only the true sender can do, since only the sender holds that private key. Any recipient can then decrypt the signature using the sender\'s freely available public key, recompute the hash of the received message independently, and check the two match; a match proves both authentication (only the claimed sender could have produced a signature that decrypts correctly with their public key) and integrity (any alteration of the message changes its hash and breaks the match). This is the opposite of confidentiality-oriented encryption, where the sender uses the recipient\'s public key so that only the recipient (holding the matching private key) can read the message; signatures by themselves provide no confidentiality at all, since anyone holding the public key can verify (and see) the digest.'
    },
    {
      id: 'cn-application-q13',
      q: 'Which of the following best describes the primary function of a network firewall?',
      options: ['It encrypts all traffic leaving the private network to a public network', 'It filters incoming and outgoing traffic according to a defined set of rules, based on criteria such as IP address, port, and protocol, to protect internal hosts', 'It translates private IP addresses to a single public IP address', 'It resolves domain names to IP addresses for hosts inside the network'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'A firewall is a security checkpoint placed at the boundary between a trusted internal network and an untrusted external one (typically the internet); it inspects each packet or connection attempt against a configured rule set and permits or blocks it based on attributes such as source/destination IP address, port number, and protocol (a packet-filter firewall), or based on application-level content (a proxy/application-layer firewall). Its purpose is access control and threat mitigation, not encryption (that is the job of protocols like TLS), address translation (that is NAT\'s job), or name resolution (that is DNS\'s job). Confusing a firewall\'s filtering role with NAT\'s address-translation role, since both often run on the same border device, is a common exam trap.'
    },
    {
      id: 'cn-application-q14',
      q: 'Which of the following well-known port number and protocol pairings is INCORRECT?',
      options: ['Port 80 — HTTP', 'Port 25 — SMTP', 'Port 53 — DNS', 'Port 21 — HTTP'],
      answer: 3,
      marks: 1,
      difficulty: 'medium',
      type: 'concept',
      explanation: 'Port 21 is the well-known port for FTP\'s control connection, not HTTP; HTTP\'s well-known port is 80 (443 for HTTPS). The other three pairings are correct: port 80 is HTTP, port 25 is SMTP (mail relay/submission between servers), and port 53 is DNS (both for queries and, using TCP, for zone transfers). Memorizing the small table of well-known ports — 20/21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 80 HTTP, 110 POP3, 143 IMAP, 443 HTTPS — is worth the effort because GATE asks this kind of matching question directly and quickly.'
    },
    {
      id: 'cn-application-q15',
      q: 'A DNS resolver has a completely cold cache and must resolve a name through 3 hierarchy levels (root, TLD, authoritative), with each query-response exchange taking one round-trip time (RTT) of 20 ms, before the client can even begin its actual request to the target server. Ignoring any other delay, the minimum extra time added before the client\'s real application request can be sent is:',
      options: ['20 ms', '40 ms', '60 ms', '80 ms'],
      answer: 2,
      marks: 2,
      difficulty: 'medium',
      type: 'numerical',
      explanation: 'With a fully cold cache, the resolver must complete one round trip to the root server (which refers it to the correct TLD server), one round trip to the TLD server (which refers it to the correct authoritative server), and one round trip to the authoritative server (which finally returns the IP address) — three RTTs in total for the three hierarchy levels described. At 20 ms per RTT, that is 3 x 20 = 60 ms of pure DNS resolution delay before the client even knows the destination\'s IP address and can begin its actual application-layer request (for example, the TCP handshake for HTTP). This is exactly why DNS caching at every level is so valuable in practice: a cache hit at any level shortens this chain immediately.'
    },
    {
      id: 'cn-application-q16',
      q: 'Which statement about HTTP is correct?',
      options: ['HTTP is inherently a stateful protocol that remembers all previous requests from a client without any extra mechanism', 'HTTP is a stateless, text-based request-response protocol, typically running over TCP, and any need for state must be handled separately (e.g., using cookies)', 'HTTP requires UDP because it needs low latency more than reliability', 'HTTP responses can only ever be status code 200'],
      answer: 1,
      marks: 1,
      difficulty: 'easy',
      type: 'concept',
      explanation: 'HTTP is designed as a stateless protocol: by default, the server treats every request independently and retains no memory of previous requests from the same client. Any application that needs to track session state across multiple requests (a shopping cart, a login session) must layer a separate mechanism on top, most commonly cookies, which the client sends back with each subsequent request so the server can look up the associated state. HTTP messages are human-readable text (headers and, often, a body) and the protocol runs over a reliable transport, TCP, precisely because losing or reordering parts of a web page or form submission would be unacceptable; a response can carry many different status codes (200 OK, 301/302 redirects, 404 Not Found, 500 Internal Server Error, and others), not only 200.'
    }
  ]
});


window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-basics';}).questions.push(
  {
    id: "cn-basics-x1",
    q: "A link has bandwidth 10 Mbps and round-trip time (RTT) 40 ms. To keep the pipe completely full (so the sender never idles waiting for an acknowledgement), the sender must be able to have at least how many bytes of unacknowledged data outstanding?",
    options: ["25,000 bytes", "50,000 bytes", "100,000 bytes", "400,000 bytes"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "The bandwidth-delay product using RTT gives the number of bits that must be in flight to keep a stop-and-wait-style link fully utilized: BDP = bandwidth x RTT = 10 x 10^6 bits/s x 0.04 s = 400,000 bits. Converting to bytes: 400,000 / 8 = 50,000 bytes. If the sender keeps fewer than 50,000 bytes unacknowledged, it will finish transmitting and then sit idle waiting for the first ACK to return, wasting link capacity; 400,000 bits is the bit-count answer, a common distractor when the byte conversion is skipped."
  },
  {
    id: "cn-basics-x2",
    q: "A 1,000,000-bit message must travel across 4 store-and-forward links, each of rate 1 Mbps. Compare sending it as one whole message versus splitting it into 10 equal-sized packets of 100,000 bits each, pipelined across the links. What is the total delivery time using the packetized, pipelined approach (ignore propagation and queueing delay)?",
    options: ["0.4 s", "1.3 s", "1.7 s", "4.0 s"],
    answer: 1,
    marks: 2,
    difficulty: "hard",
    type: "pyq-style",
    explanation: "Per-packet transmission delay on each link is Tt = 100,000 bits / 1,000,000 bps = 0.1 s. With pipelining across h = 4 links and n = 10 packets, the first packet needs h hops to reach the destination and each subsequent packet trails by one more transmission slot, giving total time = (h + n - 1) x Tt = (4 + 10 - 1) x 0.1 = 13 x 0.1 = 1.3 s. For contrast, sending the whole 1,000,000-bit message unsplit (message switching) would need each of the 4 links to fully store and forward it: 4 x (1,000,000 / 1,000,000) = 4 s, over three times slower, which is exactly why splitting large transfers into packets and pipelining them across hops is central to packet-switched network performance."
  },
  {
    id: "cn-basics-x3",
    q: "A geostationary satellite link offers 50 Mbps bandwidth with 250 ms one-way propagation delay; a terrestrial fibre link offers 2 Mbps with 2 ms one-way propagation delay. For a very large bulk file transfer, and separately for short interactive request-response traffic, which link is preferable on each count?",
    options: ["The satellite link is better for both bulk throughput and interactive responsiveness", "The satellite link gives higher bulk-transfer throughput; the terrestrial link is more responsive for short interactive exchanges", "The terrestrial link gives higher bulk-transfer throughput; the satellite link is more responsive", "Throughput and responsiveness do not depend on bandwidth or propagation delay at all"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "Throughput for a large bulk transfer is dominated by bandwidth once the pipe is kept full, so the 50 Mbps satellite link moves far more data per second than the 2 Mbps terrestrial link despite its long propagation delay. Responsiveness for short interactive exchanges (a single small request-response, like a DNS query or a quick web click), however, is dominated by round-trip propagation delay rather than bandwidth, since barely any data needs to be pushed onto the wire; the terrestrial link's 2 ms delay makes it feel instantaneous compared to the satellite link's 250 ms round trip. This illustrates why high bandwidth and low latency are independent axes, and satellite links are a classic example of high bandwidth but poor interactivity."
  },
  {
    id: "cn-basics-x4",
    q: "A noiseless channel has bandwidth 4000 Hz and uses a signalling scheme with 8 discrete signal levels. Using the Nyquist formula, what is the maximum achievable bit rate?",
    options: ["12,000 bps", "24,000 bps", "32,000 bps", "48,000 bps"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "The Nyquist formula for a noiseless channel is C = 2B log2(M), where B is the bandwidth in Hz and M is the number of discrete signal levels. Here B = 4000 Hz and M = 8, so log2(8) = 3. C = 2 x 4000 x 3 = 24,000 bps. A common mistake is forgetting the factor of 2 (giving 12,000, the first distractor) or using log2(M) incorrectly as M itself (giving 32,000). The Nyquist limit applies strictly to an ideal noiseless channel; a real, noisy channel would instead be bounded by the lower Shannon capacity."
  },
  {
    id: "cn-basics-x5",
    q: "A noisy channel has bandwidth 3000 Hz and a signal-to-noise ratio of 30 dB. Using Shannon's capacity formula, the maximum theoretical channel capacity is approximately:",
    options: ["3 kbps", "9 kbps", "30 kbps", "300 kbps"],
    answer: 2,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "First convert the SNR from decibels to a linear ratio: SNR_dB = 10 log10(SNR) means 30 = 10 log10(SNR), so SNR = 10^3 = 1000. Shannon's capacity is C = B log2(1 + SNR) = 3000 x log2(1001). Since log2(1001) is approximately 9.97 (because 2^10 = 1024 is close to 1001), C is approximately 3000 x 9.97, about 29,900 bps, which rounds to about 30 kbps. The most common error is forgetting to convert dB to a linear ratio and plugging 30 directly into the formula, which drastically understates the true capacity."
  },
  {
    id: "cn-basics-x6",
    q: "As a received signal travels up the TCP/IP protocol stack at the destination host, in which order are the protocol headers stripped off (from first to last)?",
    options: ["Data link header, then network header, then transport header", "Transport header, then network header, then data link header", "Network header, then data link header, then transport header", "All headers are removed together by the physical layer before any layer sees the data"],
    answer: 0,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "Decapsulation exactly reverses encapsulation. The physical layer delivers raw bits to the data link layer, which first strips its own frame header/trailer to recover the network-layer packet. That packet is passed up to the network layer, which strips the IP header to recover the transport-layer segment. Finally the transport layer strips its TCP/UDP header to hand the raw application data to the receiving process. So the order, bottom to top, is data link, then network, then transport, the exact reverse of the order in which headers were added on the sending side."
  },
  {
    id: "cn-basics-x7",
    q: "A link has bandwidth 8 Mbps and RTT 25 ms. If packets are 2500 bytes each, how many packets must be in flight simultaneously to fully utilize the link (keep it always transmitting)?",
    options: ["8", "10", "12", "16"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "The bandwidth-delay product is BDP = 8 x 10^6 bits/s x 0.025 s = 200,000 bits = 25,000 bytes. Each packet carries 2500 bytes, so the number of packets needed in flight is 25,000 / 2500 = 10 packets exactly. Having fewer than 10 packets outstanding means the sender will exhaust its window and be forced to wait for an acknowledgement before the link has been kept continuously busy for a full RTT, reducing effective throughput below the link's nominal capacity."
  },
  {
    id: "cn-basics-x8",
    q: "An 800,000-bit message is split into 8 equal packets of 100,000 bits each and sent, pipelined, across 5 store-and-forward links each of rate 2 Mbps. Ignoring propagation and queueing delay, what is the total time for the last bit to arrive at the destination?",
    options: ["400 ms", "500 ms", "600 ms", "800 ms"],
    answer: 2,
    marks: 2,
    difficulty: "hard",
    type: "pyq-style",
    explanation: "Per-packet transmission time on each link is Tt = 100,000 bits / 2,000,000 bps = 0.05 s = 50 ms. With h = 5 links and n = 8 packets pipelined, total time = (h + n - 1) x Tt = (5 + 8 - 1) x 50 ms = 12 x 50 ms = 600 ms. The pipelining formula works because the first packet needs 5 hops (5 transmission slots) to traverse the whole path, and every remaining packet trails by exactly one more transmission slot as it follows the first through the links, so 7 more slots are added for the remaining 7 packets, 5 + 7 = 12 slots total."
  },
  {
    id: "cn-basics-x9",
    q: "A circuit-switched call requires 20 ms to set up the dedicated path before any data transfer, followed by transmission of 200,000 bits of data at 2 Mbps. What is the total time from call initiation to completion of data transfer (ignore teardown and propagation)?",
    options: ["80 ms", "100 ms", "120 ms", "140 ms"],
    answer: 2,
    marks: 1,
    difficulty: "medium",
    type: "numerical",
    explanation: "In circuit switching, the dedicated path must be fully established (setup phase) before any bits can be sent; only after that does the reserved, guaranteed-bandwidth channel carry the data. Transmission time = 200,000 bits / 2,000,000 bps = 100 ms. Adding the 20 ms setup time gives a total of 20 + 100 = 120 ms. Unlike packet switching, once the circuit is set up there is no further store-and-forward delay at intermediate switches, since the entire path behaves like one continuous dedicated wire for the duration of the call."
  },
  {
    id: "cn-basics-x10",
    q: "Which statement correctly distinguishes when the Nyquist formula versus the Shannon formula should be applied?",
    options: ["Nyquist is used for noisy channels because it accounts for SNR, while Shannon is used only for noiseless channels", "Shannon's formula accounts for noise via the signal-to-noise ratio and applies to real noisy channels, while Nyquist's formula is an idealized bound for a noiseless channel using a fixed number of discrete signal levels", "The two formulas are always interchangeable and give identical results for any channel", "Nyquist requires knowing the SNR, while Shannon requires knowing the number of discrete signal levels"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "Nyquist's formula, C = 2B log2(M), models an idealized noiseless channel where capacity is limited only by bandwidth and the number of discrete signal levels M the encoding uses; it says nothing about noise. Shannon's formula, C = B log2(1 + SNR), instead captures the fundamental limit imposed by noise via the signal-to-noise ratio, and applies to real, noisy channels, no amount of clever encoding can exceed it, regardless of how many signal levels are used. In practice, for a given real channel, Shannon's capacity is the true upper bound, while Nyquist's value (computed with the levels the equipment actually uses) may be lower and is what a specific encoding scheme practically achieves."
  },
  {
    id: "cn-basics-x11",
    q: "A signal must travel 2000 km along a cable where the propagation speed is 2 x 10^8 m/s. What is the propagation delay alone (ignoring transmission time)?",
    options: ["1 ms", "10 ms", "20 ms", "100 ms"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "numerical",
    explanation: "Propagation delay is distance divided by propagation speed: Tp = d / v = 2,000,000 m / (2 x 10^8 m/s) = 0.01 s = 10 ms. Note that this value depends only on the physical distance and the speed of signal propagation in the medium, it is completely independent of the packet's size or the link's bandwidth, which instead determine the separate transmission delay. Confusing these two delay components, or trying to compute propagation delay from bandwidth, is one of the most common errors in GATE-style timing problems."
  },
  {
    id: "cn-basics-x12",
    q: "An application sends 1000 bytes of pure data. It picks up a 20-byte TCP header, a 20-byte IP header, and an 18-byte Ethernet header-plus-trailer before hitting the wire, whose rate is 1 Mbps. What is the total transmission delay for this one frame?",
    options: ["8.00 ms", "8.46 ms", "10.00 ms", "12.00 ms"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "The total frame size is the application data plus every layer's overhead: 1000 + 20 (TCP) + 20 (IP) + 18 (Ethernet header and trailer) = 1058 bytes = 1058 x 8 = 8464 bits. Transmission delay is Tt = L / R = 8464 bits / 1,000,000 bps = 0.008464 s = 8.464 ms, which rounds to 8.46 ms. Ignoring the protocol overhead and computing only for the 1000 bytes of application data (1000 x 8 / 10^6 = 8 ms) is a common shortcut that slightly understates the real transmission time, encapsulation overhead is real bits that must actually be pushed onto the wire."
  },
  {
    id: "cn-basics-x13",
    q: "A modem uses 4 discrete signal levels (2 bits encoded per symbol) and transmits at a baud (symbol) rate of 2000 symbols per second. What is the resulting bit rate?",
    options: ["2000 bps", "4000 bps", "8000 bps", "16,000 bps"],
    answer: 1,
    marks: 1,
    difficulty: "medium",
    type: "numerical",
    explanation: "The bit rate equals the baud rate multiplied by the number of bits carried per symbol. With M = 4 signal levels, each symbol encodes log2(4) = 2 bits. At a baud rate of 2000 symbols/s, the bit rate is 2000 x 2 = 4000 bps. This distinction between baud rate (symbols per second, a property of the physical signalling) and bit rate (bits per second, what applications actually care about) is a classic GATE trap: they are equal only when each symbol carries exactly 1 bit (binary, two-level signalling)."
  },
  {
    id: "cn-basics-x14",
    q: "Data flows end-to-end across a path made of three successive links with capacities 100 Mbps, 10 Mbps, and 1 Gbps respectively. What is the maximum achievable end-to-end throughput along this path?",
    options: ["1 Gbps", "100 Mbps", "10 Mbps", "The average of the three link capacities"],
    answer: 2,
    marks: 1,
    difficulty: "medium",
    type: "concept",
    explanation: "End-to-end throughput along a path of multiple links in series is limited by the slowest link, called the bottleneck link, because every bit must pass through every link sequentially and no link can forward data faster than its own capacity allows. Here the three links offer 100 Mbps, 10 Mbps, and 1 Gbps; the smallest of these, 10 Mbps, caps what can actually be delivered end to end regardless of how fast the other two links are. This is why a single slow link anywhere along a route (a classic weak-link problem) determines overall achievable throughput, not an average or the fastest link."
  },
  {
    id: "cn-basics-x15",
    q: "A packet of 12,000 bits is sent over a single link of rate 2 Mbps, with the link spanning 2,000,000 metres and a propagation speed of 2 x 10^8 m/s. What is the total time from when the first bit is transmitted until the last bit arrives at the receiver?",
    options: ["6 ms", "10 ms", "16 ms", "22 ms"],
    answer: 2,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "Two delays add up for a single link: transmission delay Tt = L / R = 12,000 bits / 2,000,000 bps = 0.006 s = 6 ms, and propagation delay Tp = d / v = 2,000,000 m / (2 x 10^8 m/s) = 0.01 s = 10 ms. The total end-to-end time for the last bit to arrive is Tt + Tp = 6 + 10 = 16 ms, the last bit is transmitted only after all 12,000 bits have been pushed onto the wire (6 ms), and then it must still propagate the full length of the link (10 ms) before reaching the receiver. Adding these two independent delay components correctly, rather than confusing which formula uses which variable, is the core skill this question tests."
  }
);

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-datalink';}).questions.push(
  {
    id: "cn-datalink-x1",
    q: "A sender wants to transmit the 7-bit data word 1101011 using CRC with the generator polynomial represented as the bit pattern 1011 (a 4-bit generator, degree 3). After appending 3 zero bits and performing modulo-2 (XOR) division, what CRC remainder is appended to the data before transmission?",
    options: ["110", "101", "011", "100"],
    answer: 0,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "Append 3 zero bits (one less than the generator's length) to the data: 1101011000. Perform modulo-2 division by 1011 using XOR at every step where the leading bit is 1: dividing 1101011000 by 1011 bit by bit (XOR, no borrow) yields a quotient with a final 3-bit remainder of 110. This remainder is the CRC checksum; the transmitted frame becomes the original data followed by this remainder: 1101011 followed by 110, i.e., 1101011110. At the receiver, dividing the full received frame by the same generator 1011 should give a remainder of all zeros if no error occurred during transmission; any nonzero remainder signals a detected error."
  },
  {
    id: "cn-datalink-x2",
    q: "A block error-correcting code has a minimum Hamming distance of 6 between any two valid codewords. What is the maximum number of bit errors this code is guaranteed to detect, and the maximum number it is guaranteed to correct?",
    options: ["Detect 5, correct 2", "Detect 6, correct 3", "Detect 4, correct 2", "Detect 5, correct 3"],
    answer: 0,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "For a code with minimum Hamming distance d_min, the guaranteed error-detection capability is d_min - 1 bit errors, and the guaranteed error-correction capability is floor((d_min - 1) / 2) bit errors. With d_min = 6: detection = 6 - 1 = 5 errors, and correction = floor(5 / 2) = floor(2.5) = 2 errors. Intuitively, detection only needs the erroneous word to differ from every valid codeword, which distance 6 allows for up to 5 flipped bits; correction needs the erroneous word to still be strictly closer to the original codeword than to any other codeword, which requires the tighter floor((d_min-1)/2) bound so that error regions around codewords do not overlap."
  },
  {
    id: "cn-datalink-x3",
    q: "A Go-Back-N (GBN) sliding window protocol uses sequence numbers that are 4 bits wide (16 distinct sequence numbers, 0 to 15). What is the maximum possible sender window size for GBN in this scheme?",
    options: ["8", "15", "16", "31"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "For Go-Back-N with an n-bit sequence number space (2^n total sequence numbers), the maximum sender window size is 2^n - 1, not the full 2^n. Here n = 4, so 2^4 - 1 = 16 - 1 = 15. The reason for the minus one is that GBN receivers only ever expect exactly the next in-order sequence number and discard anything else, so if the window were the full 2^n, a fully lost ACK could make a retransmitted old frame appear identical to a new one, causing the receiver to misinterpret it as the next expected frame; capping the window at 2^n - 1 removes this ambiguity."
  },
  {
    id: "cn-datalink-x4",
    q: "A Selective Repeat (SR) sliding window protocol also uses 4-bit sequence numbers (16 total values). What is the maximum possible sender window size (which must equal the receiver window size) for SR in this scheme?",
    options: ["4", "7", "8", "15"],
    answer: 2,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "For Selective Repeat with an n-bit sequence number space, the maximum window size (both sender and receiver windows must be equal and this size) is 2^(n-1), which is exactly half of GBN's limit. Here n = 4, so 2^(4-1) = 2^3 = 8. SR needs this stricter bound because both sender and receiver windows can be active simultaneously and out of sync; if the combined window sizes exceeded 2^(n-1) each, a new frame using a recycled sequence number could arrive within the receiver's window while it was still expecting a retransmission of an old frame using that same number, causing the receiver to accept corrupted or duplicate data as valid."
  },
  {
    id: "cn-datalink-x5",
    q: "A sliding window sender uses a window of 8 packets, each requiring 1 ms transmission time (Tt = 1 ms) on the link. The one-way propagation delay is 10 ms, so a full send-and-acknowledge cycle takes Tt + 2Tp = 1 + 20 = 21 ms. What is the resulting link utilization (efficiency)?",
    options: ["19%", "38%", "50%", "76%"],
    answer: 1,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "Sliding window utilization is U = (window size x Tt) / (Tt + 2Tp), since the sender can push out window-size worth of packets (taking window x Tt time) before it must wait for the first acknowledgement to return, and the full cycle time before that first ACK arrives is Tt + 2Tp. Here U = (8 x 1) / 21 = 8/21 = 0.381, or about 38%. This means the link sits idle roughly 62% of the time because the window of 8 packets is not large enough to keep transmitting continuously across the full 21 ms round-trip cycle; only a larger window (or a shorter RTT) would raise utilization toward 100%."
  },
  {
    id: "cn-datalink-x6",
    q: "Using the same link parameters as above (Tt = 1 ms per packet, Tt + 2Tp = 21 ms), what is the minimum sender window size needed to achieve 100% link utilization?",
    options: ["10", "15", "21", "42"],
    answer: 2,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "To achieve 100% utilization, the sender must be able to keep transmitting continuously for the entire cycle time before the first acknowledgement returns, which requires window x Tt >= Tt + 2Tp. Solving for the minimum window: window >= (Tt + 2Tp) / Tt = 21 ms / 1 ms = 21. So a window of 21 packets lets the sender transmit continuously without ever running out of unacknowledged packets to send while waiting for the first ACK, achieving full link utilization; any window smaller than 21 leaves the link idle for part of each cycle, exactly as illustrated by the 8-packet window giving only 38% utilization in the earlier scenario."
  },
  {
    id: "cn-datalink-x7",
    q: "In pure (unslotted) ALOHA, what is the approximate maximum channel utilization (throughput) achievable at the optimum offered load?",
    options: ["About 18%", "About 37%", "About 50%", "About 100%"],
    answer: 0,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "Pure ALOHA allows stations to transmit whenever they have data, without any time synchronization, which means a frame's vulnerable period to collision spans two full frame times (one frame time before and one after it starts). Analysis shows the maximum throughput is S_max = 1/(2e), where e is Euler's number (approximately 2.718), giving S_max ~= 1/5.436 ~= 0.184, or about 18.4%. This low ceiling is the fundamental reason pure ALOHA is inefficient and largely of historical/theoretical interest, motivating the improvement to slotted ALOHA, which halves the vulnerable period by synchronizing transmissions to slot boundaries."
  },
  {
    id: "cn-datalink-x8",
    q: "In slotted ALOHA, what is the approximate maximum channel utilization (throughput) achievable at the optimum offered load?",
    options: ["About 18%", "About 37%", "About 50%", "About 63%"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "Slotted ALOHA requires all stations to synchronize their transmissions to the start of discrete time slots, so a collision can only occur between frames sent in exactly the same slot; this halves the vulnerable period compared to pure ALOHA. Analysis shows maximum throughput is S_max = 1/e ~= 0.368, or about 36.8%, exactly double pure ALOHA's roughly 18.4% ceiling. This doubling of achievable throughput, at the cost of requiring slot synchronization across all stations, is the key trade-off GATE questions test between the two ALOHA variants."
  },
  {
    id: "cn-datalink-x9",
    q: "A CSMA/CD LAN runs at 10 Mbps over a cable of length 2500 m, with an effective end-to-end propagation speed of 2 x 10^8 m/s (accounting for cabling and any repeaters). What is the minimum frame size (in bits) needed to guarantee that a collision is detected before the sender finishes transmitting?",
    options: ["125 bits", "150 bits", "250 bits", "500 bits"],
    answer: 2,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "For CSMA/CD, a sender must still be transmitting when a collision signal (from the far end of the cable) can propagate back, so the frame transmission time must be at least the round-trip propagation delay: Tt_min >= 2 x Tprop(one-way). One-way propagation delay is Tprop = d/v = 2500 m / (2 x 10^8 m/s) = 1.25 x 10^-5 s = 12.5 microseconds, so round-trip is 25 microseconds. The minimum frame size in bits is Lmin = R x (2 x Tprop) = 10 x 10^6 bps x 25 x 10^-6 s = 250 bits. Any frame shorter than this could finish transmission before a collision signal from the far end returns, letting the sender falsely believe the frame was sent successfully."
  },
  {
    id: "cn-datalink-x10",
    q: "A CSMA/CD network is upgraded from 10 Mbps to 100 Mbps while keeping the same cable length (hence the same round-trip propagation delay) and wanting to preserve the same minimum frame size for collision detection. What must happen to the maximum allowable cable span?",
    options: ["It must be increased by roughly 10 times", "It must be decreased by roughly 10 times", "It can remain exactly the same", "Cable span is unrelated to link speed in CSMA/CD"],
    answer: 1,
    marks: 2,
    difficulty: "hard",
    type: "concept",
    explanation: "The minimum frame size for collision detection is Lmin = R x 2Tprop, and Tprop is proportional to cable length d. If the link rate R increases 10-fold while the frame size Lmin is to stay fixed, then 2Tprop (and hence d) must shrink by the same factor of 10 to keep the product Lmin = R x 2Tprop constant. This is precisely why real 100 Mbps Ethernet (Fast Ethernet) standards specify a maximum segment length roughly one-tenth that of 10 Mbps Ethernet when the minimum frame size (64 bytes) was kept unchanged — a direct, practical consequence of the CSMA/CD collision-detection timing constraint."
  },
  {
    id: "cn-datalink-x11",
    q: "A LAN consists of one 8-port Ethernet switch with 8 hosts connected directly to its 8 ports (no VLANs configured). How many collision domains and how many broadcast domains does this network have?",
    options: ["8 collision domains, 8 broadcast domains", "8 collision domains, 1 broadcast domain", "1 collision domain, 8 broadcast domains", "1 collision domain, 1 broadcast domain"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "A switch forwards frames intelligently port-to-port based on learned MAC addresses and, critically, isolates collisions: each switch port is its own separate collision domain, since only the switch and the one device on that port ever contend for that particular link. With 8 ports each hosting one device, there are 8 collision domains. However, a plain switch (without VLANs) still floods broadcast frames (destination MAC all-1s) out every port, so all 8 hosts remain in a single shared broadcast domain. Contrast this with a hub, which forwards everything to every port and therefore has both a single collision domain and a single broadcast domain."
  },
  {
    id: "cn-datalink-x12",
    q: "Two 4-port hubs, each connecting 4 hosts, are themselves connected to two separate ports of an Ethernet switch (no VLANs). How many collision domains exist in total?",
    options: ["1", "2", "4", "8"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "Within each hub, every device shares the medium and any two devices transmitting simultaneously on that hub will collide, so each hub (with its 4 attached hosts plus the switch port it connects to) forms exactly one collision domain. Since there are 2 hubs, there are 2 collision domains total. The switch itself does not merge these into one collision domain because it isolates each of its ports; it only forwards frames as needed and does not blindly repeat bits the way a hub does. The broadcast domain, however, remains a single one spanning all 8 hosts, since the switch still floods broadcasts to every port including both hub segments."
  },
  {
    id: "cn-datalink-x13",
    q: "What does 'piggybacking' refer to in the context of sliding window data link protocols with bidirectional (duplex) traffic?",
    options: ["Sending the same frame twice in a row to improve reliability", "Attaching the acknowledgement for received data onto an outgoing data frame travelling in the reverse direction, instead of sending a separate ACK frame", "Compressing multiple small frames into a single larger frame before transmission", "Broadcasting a frame to multiple receivers simultaneously"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "In a full-duplex link where both ends are sending data to each other, piggybacking is an efficiency technique where a station about to send a data frame in the reverse direction attaches (piggybacks) an acknowledgement field for data it has already received, rather than sending a separate, dedicated ACK-only frame. This saves the overhead of composing, transmitting, and processing an extra frame purely for acknowledgement purposes, since the ACK information rides along in the header of a frame that was going to be sent anyway. If no data frame is ready to go within a short timeout, a standalone ACK is still sent so acknowledgements are not delayed indefinitely."
  },
  {
    id: "cn-datalink-x14",
    q: "A Hamming code must protect m = 11 data bits. What is the minimum number of redundant (parity) bits r required?",
    options: ["3", "4", "5", "6"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "The Hamming code requirement is that the redundant bits must be able to uniquely identify the position of a single-bit error among all m + r bits, plus indicate the no-error case, so 2^r must be at least m + r + 1. Testing r = 4 with m = 11: m + r + 1 = 11 + 4 + 1 = 16, and 2^4 = 16, so the inequality 2^r >= m + r + 1 holds exactly (16 >= 16). Testing r = 3 would need 2^3 = 8 >= 11 + 3 + 1 = 15, which fails. So the minimum number of redundant bits needed is r = 4, giving a total codeword length of 11 + 4 = 15 bits."
  },
  {
    id: "cn-datalink-x15",
    q: "When a frame in the middle of a sliding window is lost, how do Go-Back-N (GBN) and Selective Repeat (SR) differ in what gets retransmitted?",
    options: ["GBN retransmits only the single lost frame; SR retransmits the lost frame and every frame sent after it", "GBN retransmits the lost frame and every frame already sent after it in the window; SR retransmits only the specific lost frame", "Both protocols always retransmit the entire window regardless of which frame was lost", "Neither protocol retransmits automatically; the application layer must request retransmission"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "Go-Back-N uses a cumulative acknowledgement scheme and a receiver that discards any frame arriving out of order, so once a frame is lost, the sender's timeout forces it to retransmit that lost frame and every subsequent frame it already sent, even ones the receiver may have received correctly, because the receiver would have discarded them anyway. Selective Repeat instead uses individual acknowledgements per frame and a receiver that buffers out-of-order frames it has correctly received, so only the specifically lost frame needs to be retransmitted, out-of-order frames already received are kept, not discarded. This makes SR more bandwidth-efficient on lossy or high-latency links, at the cost of the more complex buffering and larger receiver window it requires."
  }
);

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-network';}).questions.push(
  {
    id: "cn-network-x1",
    q: "An ISP holds four contiguous /24 blocks: 192.168.16.0/24, 192.168.17.0/24, 192.168.18.0/24, and 192.168.19.0/24. What is the single, most specific CIDR block that exactly aggregates (summarizes) all four?",
    options: ["192.168.16.0/21", "192.168.16.0/22", "192.168.16.0/23", "192.168.16.0/24"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "Aggregation requires finding the number of leading bits shared by all four third-octet values 16, 17, 18, and 19. In binary these are 00010000, 00010001, 00010010, and 00010011 — the first 6 bits (000100) are identical across all four, while the remaining 2 bits vary across all four possible combinations (00, 01, 10, 11), exactly covering 16 through 19 with no extra or missing addresses. Since 6 bits of the third octet are fixed, the aggregate prefix length is 24 - 2 = 22 (the 2 comes from how many of the third octet's 8 bits are now variable). So the correct summary route is 192.168.16.0/22, which covers exactly 192.168.16.0 through 192.168.19.255 — precisely the four original /24 blocks and nothing more."
  },
  {
    id: "cn-network-x2",
    q: "A router's forwarding table contains these three entries for destination lookups: 10.10.0.0/16 via R1, 10.10.4.0/22 via R2, and 10.10.4.0/24 via R3. Using longest-prefix matching, which next hop is chosen for a packet addressed to 10.10.4.5?",
    options: ["R1", "R2", "R3", "None of the entries match this address"],
    answer: 2,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "All three entries actually match the destination 10.10.4.5: the /16 entry covers all of 10.10.0.0-10.10.255.255; the /22 entry covers 10.10.4.0-10.10.7.255; and the /24 entry covers exactly 10.10.4.0-10.10.4.255 — all of which include 10.10.4.5. Longest-prefix matching (the rule every IP router actually uses) always selects the matching entry with the most specific (longest) prefix length, since a longer prefix means a more precise, smaller-scope match. Here /24 is the longest of the three matching prefixes, so the packet is forwarded via R3, even though R1 and R2's broader entries also technically matched."
  },
  {
    id: "cn-network-x3",
    q: "An IP datagram has a total length of 4000 bytes, including its 20-byte header (so 3980 bytes of payload). It must cross a network whose MTU is 1500 bytes (including the 20-byte IP header on each fragment, so a maximum payload of 1480 bytes per fragment, which is a multiple of 8). Into how many fragments must this datagram be split?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    marks: 2,
    difficulty: "hard",
    type: "pyq-style",
    explanation: "Each fragment can carry at most 1480 bytes of the original 3980-byte payload (1480 is already a multiple of 8, as fragmentation offsets must be). The number of fragments needed is ceil(3980 / 1480) = ceil(2.689) = 3 fragments. Concretely: fragment 1 carries payload bytes 0-1479 (1480 bytes), fragment 2 carries bytes 1480-2959 (another 1480 bytes), and fragment 3 carries the remaining bytes 2960-3979, which is 3980 - 2960 = 1020 bytes. Each fragment also gets its own 20-byte IP header, so the network actually carries slightly more total bytes than the original datagram due to this replicated header overhead."
  },
  {
    id: "cn-network-x4",
    q: "Continuing the same datagram-fragmentation scenario (3980-byte payload, 1480-byte maximum fragment payload, 3 fragments total), what is the fragmentation Offset field value (in 8-byte units) carried in the third (last) fragment's IP header?",
    options: ["185", "296", "370", "395"],
    answer: 2,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "The IP Offset field records how far into the original payload a fragment's data begins, measured in units of 8 bytes. The first fragment carries bytes 0-1479, so its offset is 0. The second fragment carries bytes 1480-2959, so its offset is 1480 / 8 = 185. The third fragment carries bytes starting at byte 2960 (since the first two fragments together covered 1480 + 1480 = 2960 bytes), so its offset is 2960 / 8 = 370. This offset value is what allows the destination host to correctly reassemble all fragments back into the original payload in the right order, regardless of the order they actually arrive in."
  },
  {
    id: "cn-network-x5",
    q: "In that same 3-fragment scenario, what value does the More Fragments (MF) flag carry in the third (final) fragment's IP header?",
    options: ["MF = 1, indicating more fragments follow", "MF = 0, indicating this is the last fragment", "MF is not used once the Offset field is nonzero", "MF is only set on the first fragment, never on later ones"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "The More Fragments (MF) bit is set to 1 on every fragment of a split datagram except the very last one, telling the receiving host's reassembly logic that additional fragments belonging to this datagram are still on their way. The final fragment sets MF = 0, signalling that this is the last piece and, combined with its Offset value and length, allows the receiver to compute the total original datagram size and know reassembly is complete once all fragments (identified by the same Identification field) have arrived. Losing even one fragment, including a lost final fragment, means the entire original datagram cannot be reassembled and is eventually discarded after a reassembly timeout."
  },
  {
    id: "cn-network-x6",
    q: "Regarding the IPv4 header checksum, which of the following statements is correct?",
    options: ["The checksum covers the entire datagram, including all payload data, so any bit error anywhere is always caught", "The checksum covers only the IP header, and because fields like TTL change at every hop, every router along the path must recompute it", "The checksum is computed once at the source and never touched again by intermediate routers", "IPv4 does not use any checksum; only TCP and UDP provide checksums"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "concept",
    explanation: "The IPv4 header checksum is a ones-complement sum computed over the header fields only, deliberately excluding the payload, since payload integrity is instead the job of higher-layer checksums (TCP/UDP) or link-layer CRCs. Because at least one header field, the Time To Live (TTL), decrements at every router hop, the checksum necessarily becomes invalid after each hop and every router must recompute and rewrite it before forwarding the packet onward. When the receiver (or a router) sums all header words including the received checksum using ones-complement arithmetic, a result of all 1s (0xFFFF) indicates the header passed the check with no detected error."
  },
  {
    id: "cn-network-x7",
    q: "Router X uses the distance-vector algorithm and has three neighbours P, Q, and R for reaching destination Z, with direct link costs X-P = 2, X-Q = 4, and X-R = 1. The neighbours advertise their own current best distances to Z as: P advertises 5, Q advertises 2, and R advertises 8. What is router X's new best cost to Z, and via which neighbour?",
    options: ["Cost 6, via Q", "Cost 7, via P", "Cost 8, via R", "Cost 9, via R"],
    answer: 0,
    marks: 2,
    difficulty: "hard",
    type: "pyq-style",
    explanation: "The distance-vector (Bellman-Ford) update rule computes, for each neighbour, the direct link cost to that neighbour plus the neighbour's own advertised distance to the destination, and picks the minimum: via P, cost = 2 + 5 = 7; via Q, cost = 4 + 2 = 6; via R, cost = 1 + 8 = 9. The smallest of these is 6, achieved via Q, so router X updates its table to record a cost of 6 to Z with next hop Q. This is exactly how routers running RIP-style distance-vector protocols recompute their routing tables whenever they receive updated distance vectors from their neighbours, always choosing whichever neighbour yields the lowest total cost."
  },
  {
    id: "cn-network-x8",
    q: "In distance-vector routing, the 'count-to-infinity' problem arises when a link to a destination fails and neighbouring routers keep advertising stale, gradually incrementing routes to each other. What best describes this problem?",
    options: ["Routers permanently lose connectivity to all destinations, not just the failed one", "Two or more routers repeatedly increase their advertised distance to the now-unreachable destination in small steps, since each believes the other still has a valid path, causing very slow convergence", "The routing table grows in size until it exceeds available memory", "It only occurs in link-state protocols, never in distance-vector protocols"],
    answer: 1,
    marks: 1,
    difficulty: "medium",
    type: "concept",
    explanation: "Count-to-infinity happens because distance-vector routers only know the cost their neighbours advertise, not the actual topology, so after a failure two neighbours can each mistakenly believe the other still has a working path to the destination: as they exchange updates, each router's advertised cost creeps up by small increments (through the other) toward infinity rather than dropping to unreachable immediately. This causes very slow convergence and can produce routing loops during the process. Techniques like split horizon, poison reverse, and hold-down timers are specifically designed as partial fixes to this problem, though only link-state protocols, which see the full topology, avoid it entirely."
  },
  {
    id: "cn-network-x9",
    q: "The split-horizon rule in distance-vector routing states that:",
    options: ["A router should never advertise any route back out on the interface from which that route was originally learned", "A router should advertise all of its routes on every interface, including the one they were learned from", "A router should only advertise routes with even-numbered costs", "A router should split its routing table in half and send different halves to different neighbours"],
    answer: 0,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "Split horizon is a loop-prevention heuristic for distance-vector routing: a router does not advertise a route back toward the neighbour it originally learned that route from, on the reasoning that the neighbour already knows a path to that destination (indeed, it is the source of it) and re-advertising it back would only risk creating a false, circular sense of reachability if the original route later fails. A stronger variant, split horizon with poison reverse, actually advertises that route back with an infinite cost (explicitly signalling unreachability) rather than simply omitting it, which handles some scenarios split horizon alone does not."
  },
  {
    id: "cn-network-x10",
    q: "Host A wants to send an IP packet to host B on the same LAN but only knows B's IP address, not its MAC address. What sequence of ARP messages resolves this?",
    options: ["A sends an ARP request as a unicast frame directly to B; B replies with a broadcast ARP reply", "A broadcasts an ARP request to all hosts on the LAN asking for B's MAC address; only B replies, with a unicast ARP reply containing its MAC address", "A sends a DHCP request to the server, which replies with B's MAC address", "A must already know B's MAC address before any IP communication is possible; ARP is not needed"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "The Address Resolution Protocol maps an IP address to a link-layer (MAC) address on the local network. Host A broadcasts an ARP request frame (destination MAC all-1s, meaning every host on the LAN receives and processes it) containing B's IP address and asking who owns it. Every host on the LAN receives this broadcast, but only host B recognizes its own IP address and responds; B's ARP reply is sent as a unicast frame directly back to A's MAC address, containing B's actual MAC address. A then caches this mapping (in its ARP cache/table) for a period of time to avoid repeating this exchange for every subsequent packet to B."
  },
  {
    id: "cn-network-x11",
    q: "A host powers on and needs to obtain an IP address via DHCP. What is the correct order of the four core DHCP messages exchanged (the 'DORA' sequence)?",
    options: ["DHCPOFFER, DHCPDISCOVER, DHCPACK, DHCPREQUEST", "DHCPDISCOVER, DHCPOFFER, DHCPREQUEST, DHCPACK", "DHCPREQUEST, DHCPDISCOVER, DHCPOFFER, DHCPACK", "DHCPACK, DHCPREQUEST, DHCPOFFER, DHCPDISCOVER"],
    answer: 1,
    marks: 1,
    difficulty: "medium",
    type: "concept",
    explanation: "DHCP configuration follows the well-known DORA sequence. First, the client broadcasts a DHCPDISCOVER message (it has no IP address yet, so this must be a broadcast) looking for any DHCP server. Any listening server responds with a DHCPOFFER, proposing an IP address and lease parameters. The client then broadcasts a DHCPREQUEST explicitly accepting one particular offer (broadcast so any other servers that also offered know their offers were declined). Finally, the chosen server confirms with a DHCPACK, finalizing the lease. This 4-message handshake (Discover, Offer, Request, Acknowledge) is how a host with no prior configuration bootstraps full IP connectivity."
  },
  {
    id: "cn-network-x12",
    q: "When a router receives an IP packet whose Time To Live (TTL) field has just been decremented to 0, what does it do, and what ICMP message, if any, does it send back to the original source?",
    options: ["It forwards the packet anyway and sends no ICMP message", "It silently discards the packet with no notification sent to the source", "It discards the packet and sends an ICMP Time Exceeded message back to the source", "It discards the packet and sends an ICMP Destination Unreachable message back to the source"],
    answer: 2,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "TTL exists specifically to prevent packets from circulating forever in the presence of a routing loop: each router decrements TTL by at least 1 as it forwards a packet, and if TTL reaches 0 before the packet reaches its destination, the router discards the packet immediately rather than forwarding it. To inform the original sender that this happened, the discarding router sends back an ICMP Time Exceeded message. This exact mechanism is what the traceroute (or tracert) utility exploits: by sending successive probe packets with TTL = 1, 2, 3, and so on, it collects a Time Exceeded response from each router along the path, revealing the full route hop by hop."
  },
  {
    id: "cn-network-x13",
    q: "How many usable host addresses are available in a subnet with the CIDR prefix /27?",
    options: ["16", "30", "32", "62"],
    answer: 1,
    marks: 1,
    difficulty: "medium",
    type: "numerical",
    explanation: "A /27 prefix leaves 32 - 27 = 5 bits for the host portion, giving 2^5 = 32 total addresses in the subnet. Of these, one is reserved as the network address (all host bits 0) and one as the broadcast address (all host bits 1), leaving 32 - 2 = 30 usable addresses that can actually be assigned to hosts. This subtract-2 rule for network and broadcast addresses applies to any standard IPv4 subnet and is one of the most frequently tested arithmetic details in CIDR and subnetting questions."
  },
  {
    id: "cn-network-x14",
    q: "A router's table contains several specific routes plus a default route (0.0.0.0/0). Under what circumstance does the router actually use the default route to forward a packet?",
    options: ["The default route is always preferred over any other matching entry, regardless of prefix length", "The default route is used only when no other entry in the table has a longer (more specific) matching prefix for the destination address", "The default route is used only for broadcast traffic", "The default route is chosen at random whenever multiple entries match"],
    answer: 1,
    marks: 1,
    difficulty: "medium",
    type: "concept",
    explanation: "The default route 0.0.0.0/0 has a prefix length of 0, meaning it matches every possible destination address, but it is deliberately the least specific possible entry. Under longest-prefix matching, this makes it the catch-all fallback: the router only forwards a packet using the default route when it finds no other, more specific entry that also matches the destination. If even one specific route (say a /24 or /16) matches, that longer-prefix entry always wins over the default route, since it is presumed to represent more precise, more authoritative knowledge about how to reach that destination."
  },
  {
    id: "cn-network-x15",
    q: "Where in the network is IP fragment reassembly normally performed?",
    options: ["At every intermediate router along the path, immediately after each hop", "Only at the final destination host, never by intermediate routers", "At the first router that detects fragmentation occurred", "Reassembly happens simultaneously at all routers and the destination"],
    answer: 1,
    marks: 1,
    difficulty: "medium",
    type: "concept",
    explanation: "IP fragment reassembly is performed exclusively at the final destination host's network layer, not by any intermediate router. This is a deliberate design choice: different fragments of the same original datagram can potentially take different paths through the network (since IP is connectionless and each fragment is routed independently), so an intermediate router along one particular path has no guarantee it will ever see all the fragments belonging to that datagram, making it impossible to reliably reassemble there. Only the destination is guaranteed to eventually receive every fragment (or determine, after a reassembly timeout, that some are permanently missing and discard the partial set)."
  }
);

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-transport';}).questions.push(
  {
    id: "cn-transport-x1",
    q: "A TCP connection runs over a path with bandwidth 1 Mbps and RTT 100 ms. What is the minimum send window size (in bytes) the sender needs to fully utilize the available bandwidth?",
    options: ["6,250 bytes", "12,500 bytes", "25,000 bytes", "100,000 bytes"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "The bandwidth-delay product gives the number of bits that must be outstanding (unacknowledged) at any time to keep the connection using the full available bandwidth: BDP = bandwidth x RTT = 1 x 10^6 bits/s x 0.1 s = 100,000 bits. Converting to bytes, 100,000 / 8 = 12,500 bytes. If TCP's send window (limited by the smaller of the congestion window and the receiver's advertised window) is smaller than this, the sender will run out of data it is allowed to send and must idle waiting for ACKs before the RTT has elapsed, leaving bandwidth on the table even though the underlying link could carry more."
  },
  {
    id: "cn-transport-x2",
    q: "A TCP client sends a segment with sequence number 1000 carrying 500 bytes of data. The server acknowledges it, then sends its own segment with sequence number 2000 carrying 300 bytes of data. What acknowledgement number will the client put in its next ACK back to the server?",
    options: ["2000", "2300", "2500", "1500"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "In TCP, an acknowledgement number indicates the next byte of data the receiver expects to receive, which equals the sequence number of the received segment plus the number of data bytes it carried. The server's segment has sequence number 2000 and carries 300 bytes, so it occupies byte range 2000 to 2299; the next byte expected is 2000 + 300 = 2300. The client therefore sets its acknowledgement number to 2300 when acknowledging this segment. The earlier client-to-server exchange (seq 1000, 500 bytes, acknowledged as 1500) is a separate, independent flow of sequence numbers in the client-to-server direction and does not affect this server-to-client acknowledgement."
  },
  {
    id: "cn-transport-x3",
    q: "Continuing the same scenario, the client's first segment used sequence number 1000 and carried 500 bytes of data. If the client has no more new data to send at that point, what sequence number will it use for its very next data segment (whenever it does have more data)?",
    options: ["1000", "1500", "2000", "500"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "numerical",
    explanation: "TCP sequence numbers count bytes of application data in the stream, not segments or packets. Since the client's first segment started at sequence number 1000 and carried 500 bytes, it occupies byte positions 1000 through 1499. The next new byte of data the client sends will therefore be numbered 1000 + 500 = 1500, and this becomes the sequence number of its next data segment, regardless of how much time passes before that data becomes available to send. This byte-oriented (not segment-oriented) numbering is fundamental to how TCP tracks exactly which bytes have been sent and acknowledged."
  },
  {
    id: "cn-transport-x4",
    q: "A TCP sender starts in slow start with cwnd = 1 MSS and ssthresh = 8 MSS, doubling cwnd each RTT during slow start (1, 2, 4, 8 across RTTs 1 to 4), then switching to congestion avoidance and adding 1 MSS per RTT (9 at RTT 5, 10 at RTT 6). A timeout occurs at the end of RTT 6, when cwnd was 10 MSS. What is cwnd at the very start of RTT 7, immediately after this timeout?",
    options: ["1 MSS", "5 MSS", "10 MSS", "20 MSS"],
    answer: 0,
    marks: 2,
    difficulty: "hard",
    type: "pyq-style",
    explanation: "A timeout is TCP's strongest signal of severe congestion, and the classic (Tahoe-style) response is to reset cwnd all the way back to 1 MSS and restart slow start from scratch, rather than merely halving it as would happen for a triple-duplicate-ACK event. Tracing the scenario: cwnd doubles during slow start (1, 2, 4, 8 across RTTs 1-4, reaching ssthresh = 8 exactly at RTT 4), then grows linearly by 1 MSS per RTT during congestion avoidance (9 at RTT 5, 10 at RTT 6). When the timeout occurs at the end of RTT 6 with cwnd = 10, the sender resets cwnd to 1 MSS for RTT 7, since a full retransmission timeout indicates the network may be severely congested and warrants the most cautious possible restart."
  },
  {
    id: "cn-transport-x5",
    q: "In the same timeout scenario (cwnd = 10 MSS at the moment the timeout occurs), what does ssthresh become immediately after the timeout, following the standard TCP congestion control rule?",
    options: ["4 MSS", "5 MSS", "8 MSS", "10 MSS"],
    answer: 1,
    marks: 1,
    difficulty: "medium",
    type: "numerical",
    explanation: "The standard rule upon detecting congestion (whether by timeout or triple duplicate ACK) is to set the new slow-start threshold ssthresh to half of the current congestion window at the moment congestion was detected: ssthresh_new = cwnd / 2. Here cwnd was 10 MSS when the timeout occurred, so ssthresh_new = 10 / 2 = 5 MSS. This new, lower ssthresh marks the point at which the sender will switch from the fast, exponential slow-start growth back to the slower, linear congestion-avoidance growth on its next attempt to ramp up, reflecting the network's demonstrated capacity to be roughly half of what caused the earlier failure."
  },
  {
    id: "cn-transport-x6",
    q: "A TCP Reno sender's cwnd is 16 MSS when it detects three duplicate ACKs (indicating a single lost segment, not severe congestion). Using the standard simplified GATE model of fast recovery (halve cwnd, set ssthresh equal to that halved value, then resume congestion avoidance directly without slow start), what do cwnd and ssthresh become immediately after this event?",
    options: ["cwnd = 16, ssthresh = 16", "cwnd = 8, ssthresh = 8", "cwnd = 1, ssthresh = 8", "cwnd = 8, ssthresh = 16"],
    answer: 1,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "A triple duplicate ACK is a much milder congestion signal than a timeout, since it means later segments are still getting through (which is why duplicate ACKs for the missing segment can arrive at all), so TCP Reno reacts less drastically than on a timeout: instead of resetting cwnd to 1 MSS and restarting slow start, it halves cwnd and sets ssthresh to that same halved value, then resumes congestion avoidance directly. Here cwnd = 16 MSS, so ssthresh_new = 16 / 2 = 8 MSS and cwnd_new = 8 MSS. This fast-recovery style response lets the sender keep transmitting at a reasonably high rate rather than crashing all the way back to 1 MSS, in contrast to how the same sender would behave after a full timeout."
  },
  {
    id: "cn-transport-x7",
    q: "A TCP sender uses exponential weighted moving average (EWMA) with alpha = 0.125 to estimate RTT: EstimatedRTT_new = (1 - alpha) x EstimatedRTT_old + alpha x SampleRTT. If EstimatedRTT_old = 100 ms and a new SampleRTT of 180 ms is measured, what is the updated EstimatedRTT?",
    options: ["100 ms", "110 ms", "120 ms", "140 ms"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "Applying the EWMA formula directly: EstimatedRTT_new = (1 - 0.125) x 100 + 0.125 x 180 = 0.875 x 100 + 0.125 x 180 = 87.5 + 22.5 = 110 ms. The small weight alpha = 0.125 (the standard TCP default, equivalent to 1/8) deliberately keeps the estimate stable against a single noisy sample, so even though the new sample (180 ms) was 80 ms higher than the old estimate, the updated estimate only moved up by 10 ms, from 100 to 110 ms — smoothing out transient RTT fluctuations rather than reacting to them fully."
  },
  {
    id: "cn-transport-x8",
    q: "Continuing the EWMA scenario (EstimatedRTT_old = 100 ms, SampleRTT = 180 ms, new EstimatedRTT = 110 ms), suppose DevRTT_old = 20 ms and the deviation weight beta = 0.25, with DevRTT updated as DevRTT_new = (1 - beta) x DevRTT_old + beta x |SampleRTT - EstimatedRTT_old|. What is the resulting RTO (retransmission timeout), using RTO = EstimatedRTT_new + 4 x DevRTT_new?",
    options: ["110 ms", "180 ms", "250 ms", "320 ms"],
    answer: 2,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "First compute the deviation term using the OLD estimated RTT (100 ms), as the standard formula specifies: |SampleRTT - EstimatedRTT_old| = |180 - 100| = 80 ms. Then DevRTT_new = (1 - 0.25) x 20 + 0.25 x 80 = 0.75 x 20 + 0.25 x 80 = 15 + 20 = 35 ms. Finally, RTO = EstimatedRTT_new + 4 x DevRTT_new = 110 + 4 x 35 = 110 + 140 = 250 ms. This RTO formula deliberately widens the timeout well beyond just the average RTT estimate whenever RTT samples have recently been volatile (large DevRTT), preventing premature, spurious retransmissions during periods of variable network delay."
  },
  {
    id: "cn-transport-x9",
    q: "What is the specific purpose of TCP's persistence timer?",
    options: ["To periodically close idle connections that have had no traffic for a long time", "To handle the case where a receiver advertises a zero window (buffer full); the sender periodically probes with a small segment so it learns when the window reopens, since a window-update ACK could otherwise be lost and deadlock the connection", "To limit the maximum lifetime of a segment in the network before it must be discarded", "To decide how long to wait in TIME_WAIT before fully closing a connection"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "When a receiver's buffer fills up, it advertises a receive window of 0, telling the sender to stop sending new data. Ordinarily the sender would then wait for a future ACK carrying a nonzero window update before resuming, but if that particular window-update segment is lost in the network, the connection could deadlock forever, with the sender waiting for a notification that will never arrive and the receiver waiting for data it never signalled readiness for. The persistence timer solves this: the sender periodically sends a small probe segment (typically carrying 1 byte) even during the zero-window state, forcing the receiver to respond with an ACK that reports its current window size, breaking any potential deadlock."
  },
  {
    id: "cn-transport-x10",
    q: "How does TCP's keepalive timer differ in purpose from the persistence timer?",
    options: ["They serve the identical purpose and are simply two names for the same mechanism", "The keepalive timer detects whether an otherwise idle connection's peer is still alive and reachable, unrelated to flow control, while the persistence timer specifically handles a zero-window (buffer-full) condition", "The keepalive timer is used only during the initial three-way handshake", "The keepalive timer controls how fast the congestion window grows during slow start"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "The keepalive timer addresses a completely different problem from flow control: if a connection has been idle (no data exchanged) for a long period, one end may want to verify the other end (and the path to it) is still alive, particularly to detect a crashed peer or a silently dropped connection (for example, behind a NAT that has expired its mapping) rather than keeping resources allocated indefinitely for a dead connection. It periodically sends a small keepalive probe and expects an ACK in response; repeated failures to respond let the sender conclude the connection is dead and close it. The persistence timer, in contrast, is specifically about resuming data flow after a zero-window condition and has nothing to do with detecting a dead peer."
  },
  {
    id: "cn-transport-x11",
    q: "After the active closer of a TCP connection sends its final ACK (completing the four-way close handshake), it enters the TIME_WAIT state for a duration of 2 x MSL (maximum segment lifetime) before fully releasing the connection. What is the primary purpose of this wait?",
    options: ["To give the operating system time to free up unrelated memory used elsewhere in the network stack", "To ensure the final ACK is received (retransmitting it if the peer's retransmitted FIN arrives again) and to let any old, delayed duplicate segments from this connection expire in the network before the same (IP, port) pair is potentially reused", "To allow the receiving side extra time to read any remaining buffered application data", "TIME_WAIT exists purely for historical reasons and serves no functional purpose in modern networks"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "concept",
    explanation: "TIME_WAIT serves two related purposes. First, since the connection's very last message is an ACK (not itself acknowledged), if that ACK is lost, the peer will retransmit its FIN; by staying around for 2 x MSL, the active closer remains able to receive that retransmitted FIN and respond with another ACK, rather than having already torn down all state and potentially responding with a confusing RST. Second, waiting 2 x MSL, twice the maximum time any segment can wander the network before being discarded, guarantees that any old, straggling duplicate segments from this now-closed connection will have expired and vanished from the network before a new connection could reuse the exact same (source IP, source port, destination IP, destination port) tuple, preventing them from being mistakenly delivered into the new, unrelated connection."
  },
  {
    id: "cn-transport-x12",
    q: "A server process is listening on TCP port 80 and simultaneously handles three separate client connections, all directed at the server's IP address and port 80, but originating from three different client IP addresses (or client ports). How does the operating system's transport layer correctly demultiplex incoming segments to the correct connection?",
    options: ["It cannot distinguish them; all three clients must use different destination ports", "It uses only the destination port number (80) to identify the connection, since that is unique per listening service", "It uses the full 4-tuple: source IP, source port, destination IP, and destination port, so each distinct client connection is uniquely identified even though the destination port is identical for all of them", "It uses only the source IP address, since ports are irrelevant to TCP demultiplexing"],
    answer: 2,
    marks: 2,
    difficulty: "medium",
    type: "concept",
    explanation: "Unlike UDP, which only needs the 2-tuple of destination IP and destination port to demultiplex (since it is connectionless), TCP is connection-oriented and demultiplexes based on the full 4-tuple: (source IP address, source port, destination IP address, destination port). Even though all three example connections share the same destination IP and the same destination port 80, they differ in source IP and/or source port, so each combination uniquely identifies a distinct TCP connection (socket) in the operating system's connection table. This is exactly how a single web server process listening on one port can simultaneously and correctly serve many different clients without their data getting mixed up."
  },
  {
    id: "cn-transport-x13",
    q: "How does UDP's demultiplexing differ from TCP's, given that UDP is connectionless?",
    options: ["UDP also requires the full 4-tuple, identical to TCP", "UDP demultiplexes using only the 2-tuple of destination IP address and destination port, so any two datagrams sent to the same destination IP and port are delivered to the same socket regardless of their source", "UDP uses only the source port and ignores the destination port entirely", "UDP does not perform demultiplexing at all; every application on the host receives every UDP datagram"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "Because UDP has no notion of an established connection, it does not need to distinguish between different remote senders talking to the same local socket; it only needs to know which local application should receive the data. UDP demultiplexing therefore uses just the 2-tuple (destination IP address, destination port): any datagram arriving with that destination IP and port is delivered to whichever socket is bound to that pair, regardless of which source IP or source port sent it. This is why a single UDP socket, for example a DNS server socket, can simultaneously receive and correctly process datagrams from many different, unrelated clients without needing separate connection state for each one."
  },
  {
    id: "cn-transport-x14",
    q: "During a TCP three-way handshake, the client chooses initial sequence number (ISN) 5000 and sends a SYN with seq = 5000. The server chooses ISN 9000 and replies with a SYN-ACK carrying seq = 9000 and ack = 5001. What acknowledgement number will the client's final ACK segment (completing the handshake) carry?",
    options: ["9000", "9001", "5001", "5000"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "numerical",
    explanation: "Each side of a TCP handshake acknowledges the other's SYN by setting its acknowledgement number to the peer's sequence number plus 1 (since a bare SYN, carrying no data, is treated as consuming one sequence number). The server's SYN-ACK carried seq = 9000, so to acknowledge it, the client's final ACK must set ack = 9000 + 1 = 9001. This mirrors exactly how the server's own SYN-ACK already acknowledged the client's SYN (seq = 5000) by setting ack = 5001. Once this final ACK (ack = 9001) is sent, the three-way handshake is complete and both sides can begin exchanging application data."
  },
  {
    id: "cn-transport-x15",
    q: "A TCP connection has an underlying link capacity of 100 Mbps and RTT of 50 ms, but the receiver has advertised a fixed receive window of only 32 KB (32,768 bytes = 262,144 bits) which the sender's window cannot exceed. What is the achievable throughput on this connection?",
    options: ["100 Mbps (the full link capacity)", "50 Mbps", "About 5.24 Mbps", "About 0.05 Mbps"],
    answer: 2,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "Even though the underlying link could carry 100 Mbps, TCP throughput is fundamentally capped at window size / RTT whenever the receive window is the binding constraint, since the sender cannot have more than one window's worth of data outstanding at a time. Here, throughput <= 262,144 bits / 0.05 s = 5,242,880 bps, approximately 5.24 Mbps. Because this window-imposed ceiling (about 5.24 Mbps) is far below the link's actual 100 Mbps capacity, the connection will achieve only around 5.24 Mbps regardless of how fast or lightly loaded the physical link is — a classic illustration of why a receiver's small advertised window (or an unnecessarily small configured TCP buffer) can badly under-utilize an otherwise fast, high-latency path, a scenario often called the 'long fat pipe' problem."
  }
);

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-application';}).questions.push(
  {
    id: "cn-application-x1",
    q: "A web page consists of one base HTML file plus 10 embedded image objects, all hosted on the same server. Using non-persistent HTTP with no parallel connections (strictly one TCP connection opened, used once, and closed at a time), how many total round-trip times (RTTs) are needed to fetch the entire page, ignoring DNS lookup and transmission time?",
    options: ["11 RTTs", "20 RTTs", "22 RTTs", "24 RTTs"],
    answer: 2,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "Non-persistent HTTP opens a brand-new TCP connection for every single object retrieved, and each such connection costs 1 RTT for the TCP connection setup (SYN/SYN-ACK) plus 1 RTT for the HTTP request/response itself, so 2 RTTs per object. There are 11 total objects to fetch: the base HTML page itself, plus its 10 embedded images. With no parallelism, these are fetched strictly one after another, giving total time = 11 objects x 2 RTTs each = 22 RTTs. This large overhead from repeatedly re-establishing TCP connections is precisely the motivation for persistent HTTP connections in HTTP/1.1 and later."
  },
  {
    id: "cn-application-x2",
    q: "Using the same page (1 base HTML file + 10 embedded images), now fetched over a single persistent HTTP connection, but with requests sent one at a time (non-pipelined, each waiting for its response before the next request is sent), how many total RTTs are needed, ignoring DNS and transmission time?",
    options: ["10 RTTs", "11 RTTs", "12 RTTs", "22 RTTs"],
    answer: 2,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "A persistent connection is established just once, costing 1 RTT for the initial TCP setup, and then reused for every subsequent request, avoiding the repeated connection-setup overhead of the non-persistent case. With non-pipelined requests, each of the 11 objects (base page plus 10 images) still requires its own full request/response round trip of 1 RTT, sent strictly one after another. Total time = 1 RTT (connection setup) + 11 RTTs (11 sequential request/response exchanges) = 12 RTTs — nearly half of the 22 RTTs needed by non-persistent HTTP, simply by eliminating the repeated TCP handshakes."
  },
  {
    id: "cn-application-x3",
    q: "Using the same page again, but now with a persistent, pipelined HTTP connection where the client sends all 11 requests back-to-back without waiting for individual responses, what is the minimum number of RTTs needed, ignoring transmission and processing time?",
    options: ["1 RTT", "2 RTTs", "11 RTTs", "12 RTTs"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "Pipelining eliminates the need to wait for each response before sending the next request: the client fires off all 11 requests for the base page and 10 images essentially together, immediately after the connection is established, and the server streams back the responses. In the idealized case (ignoring transmission and processing time), this costs just 1 RTT to establish the TCP connection plus 1 more RTT for the round trip during which all the pipelined requests go out and all responses come back, for a minimum of 2 RTTs total. This dramatic reduction, from 22 RTTs (non-persistent) to 12 RTTs (persistent, non-pipelined) to just 2 RTTs (persistent, pipelined), is exactly why pipelining and, more recently, HTTP/2 multiplexing are such significant performance improvements."
  },
  {
    id: "cn-application-x4",
    q: "A client's local DNS resolver already has the .com TLD server's address cached from an earlier, unrelated lookup, but has no cached information about a new domain's authoritative name server. Each query-response exchange in the DNS hierarchy takes 15 ms. How much total DNS resolution time is needed before the client can begin its actual application request?",
    options: ["15 ms", "30 ms", "45 ms", "60 ms"],
    answer: 1,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "Because the local resolver already has the TLD (.com) server's address cached, it can skip querying the root server entirely and go straight to the cached TLD server. That leaves exactly 2 remaining round trips in the hierarchy: one to the TLD server (which returns a referral to the correct authoritative server), and one to that authoritative server (which finally returns the actual IP address). At 15 ms per round trip, this totals 2 x 15 = 30 ms, half of what a fully cold cache (needing all 3 levels: root, TLD, authoritative) would require. This illustrates how partial caching, even just one level of the hierarchy, still meaningfully speeds up resolution."
  },
  {
    id: "cn-application-x5",
    q: "If the local DNS resolver instead has a fully valid, unexpired cached entry for the exact domain name being looked up (from a previous, recent lookup), how many additional RTTs to the root, TLD, or authoritative servers are needed to resolve the name?",
    options: ["0", "1", "2", "3"],
    answer: 0,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "When the local DNS resolver's cache already holds a valid, unexpired mapping for the exact name being queried (typically because some other client recently looked up the same name and the record's TTL has not yet elapsed), the resolver can answer immediately from its cache without contacting the root, TLD, or authoritative servers at all. This means 0 additional RTTs are spent traversing the DNS hierarchy; the client only experiences whatever minimal delay exists between itself and its local resolver. This is exactly why DNS caching, at browsers, operating systems, and local resolvers, is so effective at hiding DNS lookup latency for popular, frequently accessed domains."
  },
  {
    id: "cn-application-x6",
    q: "Which of the following correctly describes the division of roles between SMTP and POP3/IMAP in email delivery?",
    options: ["SMTP is used both to push mail into the recipient's mail server and to let the recipient's client pull/download mail from it; POP3 and IMAP are never actually used", "SMTP pushes mail from a sender's client to its mail server and between mail servers, but is never used by a receiving client to pull mail down from its own mailbox; POP3 or IMAP are what the recipient's client uses to retrieve messages", "POP3 and IMAP are used to send mail out to other mail servers, while SMTP is only used by the final recipient to read their inbox", "All three protocols are functionally identical and interchangeable at every step of email delivery"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "SMTP is fundamentally a push protocol: it is used by a sender's mail client to submit an outgoing message to its own mail server, and then used again, server to server, to relay that message onward to the recipient's mail server, where it is deposited into the recipient's mailbox. Critically, SMTP is never used by the receiving user's client to download or read mail from their own mailbox — that final pull step is instead handled by POP3 (typically downloading, sometimes deleting, messages) or IMAP (which manages messages and folders while they remain stored on the server). This clean separation, push via SMTP, pull via POP3/IMAP, is a frequently tested distinction."
  },
  {
    id: "cn-application-x7",
    q: "What is the key functional difference between IMAP and POP3 for retrieving email?",
    options: ["POP3 and IMAP are identical protocols with different names used by different vendors", "IMAP keeps mail organized on the server, supporting folders and state that stay synchronized across multiple client devices, while POP3 is designed around downloading messages to a single client, offering no native multi-device folder synchronization", "POP3 supports multiple simultaneous devices with synchronized folders, while IMAP only works with a single device at a time", "Neither protocol supports accessing email from more than one device"],
    answer: 1,
    marks: 1,
    difficulty: "medium",
    type: "concept",
    explanation: "IMAP is designed around the idea that mail primarily lives on the server: it supports server-side folders, flags (read/unread, starred), and search, and any changes a client makes are reflected back to the server, so multiple devices (a phone, a laptop, a webmail client) all see a consistent, synchronized view of the mailbox. POP3, by contrast, was designed for a simpler model where a single client periodically connects, downloads new messages (often deleting them from the server afterward, though a 'leave a copy' option exists), and manages them locally, with no built-in concept of synchronizing folder structure or read status across multiple devices. This is why IMAP is the standard choice for anyone checking mail from more than one device."
  },
  {
    id: "cn-application-x8",
    q: "In FTP, how do active mode and passive mode differ in how the data connection (used for transferring files or directory listings) is established?",
    options: ["In active mode, the server initiates the data connection back to the client, requiring the client to open a listening port, which is often blocked by client-side firewalls/NAT; in passive mode, the client initiates both the control and data connections to server-specified ports, avoiding this problem", "In passive mode, the server always refuses to accept any data connection at all", "Active and passive modes differ only in the port number used for the control connection, not the data connection", "Passive mode does not use a separate data connection; all data flows over the control connection"],
    answer: 0,
    marks: 2,
    difficulty: "medium",
    type: "concept",
    explanation: "FTP always uses two separate TCP connections: a control connection (commands and responses) and a data connection (actual file/listing transfer). In active mode, after the client tells the server which port it is listening on, the server itself initiates the data connection back to the client; this frequently fails when the client sits behind a firewall or NAT that blocks unsolicited inbound connections, since from the network's perspective the server is 'calling in' to the client. Passive mode was introduced to fix this: the server instead opens a listening port and tells the client about it, and the client initiates both the control connection and the data connection outbound to the server, which is far friendlier to typical client-side firewalls and NAT devices that readily allow outbound connections."
  },
  {
    id: "cn-application-x9",
    q: "Why does FTP use two separate TCP connections (control and data) instead of a single connection the way HTTP does?",
    options: ["FTP maintains a persistent control connection for commands throughout the session, and opens a separate data connection specifically for each file transfer or directory listing, keeping command/response traffic separate from bulk data traffic", "FTP actually uses only one connection; the description of two connections is a common misconception", "The two connections in FTP both carry commands, and neither ever carries actual file data", "FTP uses two connections purely for historical compatibility reasons with a since-abandoned protocol, with no functional benefit"],
    answer: 0,
    marks: 1,
    difficulty: "medium",
    type: "concept",
    explanation: "FTP's design deliberately separates concerns: the control connection stays open for the duration of the session and carries commands (like login, change directory, or list files) and their textual responses, while a fresh data connection is opened specifically whenever an actual file transfer or directory listing needs to happen, and closed again once that transfer completes. This is different from HTTP, which since HTTP/1.1 typically reuses a single persistent connection for both requests/responses and any body data. FTP's separation allows commands to be exchanged (and status monitored) independently of whatever bulk data transfer might be in progress, though it is also precisely what makes FTP more firewall/NAT-unfriendly than protocols using just one connection type."
  },
  {
    id: "cn-application-x10",
    q: "Given that HTTP is a stateless protocol, how do cookies enable a web application to maintain session state (such as a shopping cart or a logged-in session) across multiple requests from the same user?",
    options: ["Cookies modify the fundamental HTTP protocol so it becomes inherently stateful for all servers", "The server sends a Set-Cookie header the first time a client visits; the client's browser stores this and automatically includes it as a Cookie header on all subsequent requests to that same domain, letting the server recognize the same client across otherwise-independent requests", "Cookies are stored only on the server and require no participation from the client browser at all", "Cookies work only for a single request and cannot persist across separate HTTP requests"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "HTTP itself remains stateless; cookies are a layered-on mechanism, not a change to HTTP's core semantics. On an initial response, the server includes a Set-Cookie header containing some identifying token (often a session ID mapping to server-side state). The browser stores this cookie and, on every subsequent request to the same domain (subject to the cookie's scope and expiration rules), automatically attaches it via a Cookie request header. This lets the server correlate a sequence of otherwise independent, stateless HTTP requests as belonging to the same client, enabling features like shopping carts, login sessions, and personalized content, all without altering HTTP's fundamentally stateless request-response model."
  },
  {
    id: "cn-application-x11",
    q: "A web caching proxy serves 40% of requests directly from its cache (a hit) and forwards the remaining 60% to the origin server (a miss). The RTT between client and proxy is 2 ms, and the RTT between proxy and origin server is 100 ms (ignore transmission time). What is the average response time per request?",
    options: ["44 ms", "84 ms", "124 ms", "204 ms"],
    answer: 2,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "On a cache hit, the client only needs a round trip to the proxy itself: response time = 2 x RTT(client-proxy) = 2 x 2 = 4 ms. On a cache miss, the proxy must additionally fetch the object from the origin server before returning it to the client, adding a round trip to the origin: response time = 2 x RTT(client-proxy) + 2 x RTT(proxy-origin) = 4 + 200 = 204 ms. The weighted average response time is (0.4 x 4 ms) + (0.6 x 204 ms) = 1.6 + 122.4 = 124 ms. This demonstrates the practical value of a high cache hit ratio: even a modest 40% hit rate substantially lowers average latency compared to fetching every single request all the way from the distant origin server (which alone would average 204 ms)."
  },
  {
    id: "cn-application-x12",
    q: "For RSA with small toy primes p = 5 and q = 11 (so n = p x q = 55 and phi(n) = (p-1)(q-1) = 4 x 10 = 40), and a chosen public exponent e = 7 (valid since gcd(7, 40) = 1), what is the corresponding private exponent d, satisfying e x d = 1 (mod 40)?",
    options: ["3", "13", "23", "33"],
    answer: 2,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "d must satisfy e x d = 1 (mod phi(n)), i.e., 7d = 1 (mod 40). Testing d = 23: 7 x 23 = 161. Dividing 161 by 40 gives 4 remainder 1 (since 4 x 40 = 160, and 161 - 160 = 1), so 161 = 1 (mod 40), confirming d = 23 satisfies the requirement. The public key is therefore (e=7, n=55) and the private key is (d=23, n=55). This is exactly the kind of small, hand-computable RSA example used to test whether a student actually understands modular multiplicative inverses rather than just memorizing the RSA algorithm's steps."
  },
  {
    id: "cn-application-x13",
    q: "Using the same toy RSA parameters (n = 55, public exponent e = 7), what is the ciphertext obtained by encrypting the plaintext message m = 2, using c = m^e (mod n)?",
    options: ["8", "18", "28", "38"],
    answer: 1,
    marks: 2,
    difficulty: "hard",
    type: "numerical",
    explanation: "RSA encryption computes c = m^e (mod n) = 2^7 (mod 55). First, 2^7 = 128. Then reduce modulo 55: 128 - 2 x 55 = 128 - 110 = 18, so 2^7 (mod 55) = 18. The ciphertext is therefore c = 18. To confirm the RSA scheme is consistent, decrypting this ciphertext with the private exponent d = 23 found earlier should recover the original plaintext: 18^23 (mod 55) = 2, which holds by Euler's theorem since e and d were chosen to be exact modular inverses with respect to phi(n) = 40, guaranteeing that (m^e)^d = m (mod n) for any valid message m."
  },
  {
    id: "cn-application-x14",
    q: "For a group of N = 6 users who all want to be able to communicate securely and privately with each other pairwise, how many distinct symmetric keys are needed to give every pair its own shared secret key, compared to how many public/private key pairs are needed if an asymmetric (public-key) scheme is used instead?",
    options: ["15 symmetric keys; 6 asymmetric key pairs", "6 symmetric keys; 15 asymmetric key pairs", "30 symmetric keys; 6 asymmetric key pairs", "15 symmetric keys; 12 asymmetric key pairs"],
    answer: 0,
    marks: 2,
    difficulty: "medium",
    type: "numerical",
    explanation: "For full pairwise secrecy using symmetric cryptography, every distinct pair of users needs its own unique shared key, and the number of unique pairs among N users is N(N-1)/2 = 6 x 5 / 2 = 15 keys. This is why symmetric key distribution scales quadratically and becomes unwieldy as N grows. In contrast, an asymmetric (public-key) scheme needs only one key pair (a public key and a private key) per user, since any user's public key can be used by everyone else to securely send them messages that only their matching private key can decrypt; with N = 6 users, that means just 6 key pairs total, regardless of how many pairwise communication channels are actually needed."
  },
  {
    id: "cn-application-x15",
    q: "As the number of users N in a network grows large, how does the key-management burden of symmetric cryptography compare to that of asymmetric (public-key) cryptography, in terms of scaling?",
    options: ["Symmetric key requirements grow linearly with N, the same as asymmetric", "Symmetric key requirements grow quadratically, roughly proportional to N^2, since every pair needs a unique key, while asymmetric key requirements grow only linearly, proportional to N, since each user needs just one key pair", "Both schemes require a number of keys proportional to N^2", "Asymmetric cryptography requires more keys than symmetric cryptography as N grows"],
    answer: 1,
    marks: 1,
    difficulty: "easy",
    type: "concept",
    explanation: "The number of unique pairwise symmetric keys needed for N users to each have a private shared secret with every other user is N(N-1)/2, which grows on the order of N^2 (quadratically) as N increases, making full pairwise symmetric key distribution impractical for large networks without a trusted key-distribution centre. Asymmetric cryptography sidesteps this entirely: each user generates just a single public/private key pair regardless of how many other users exist, so the total number of key pairs needed grows only linearly, proportional to N. This fundamental scaling difference is a major reason public-key cryptography (often combined with symmetric encryption for the bulk data, as in TLS) is preferred for key management in large, open networks like the internet."
  }
);

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-basics';}).theory.deep = "LAYER MODELS AND RESPONSIBILITIES\n\nOSI has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP/IP has 4-5 layers: Link (Physical+Data Link), Internet, Transport, Application (absorbs Session+Presentation).\n\n• Physical: bits on medium; encoding, modulation, bit rate, Nyquist/Shannon capacity.\n• Data Link: hop-to-hop frame delivery; MAC addressing, framing, per-link error detection (CRC), flow control (stop-and-wait, sliding window), media access (ALOHA, CSMA/CD/CA).\n• Network: source-to-destination packet delivery; logical (IP) addressing, routing (distance vector, link state), fragmentation, congestion avoidance at the network level.\n• Transport: process-to-process delivery; port addressing, segmentation/reassembly, end-to-end reliability (TCP), end-to-end flow control and congestion control, multiplexing/demultiplexing.\n• Session: dialog control, synchronization checkpoints (folded into TCP/IP application layer).\n• Presentation: data representation, compression, encryption/decryption (folded into TCP/IP application layer).\n• Application: user-facing protocols — HTTP, FTP, SMTP, DNS, Telnet.\n\nDevices per layer: repeater/hub = physical; bridge/switch = data link (uses MAC tables); router = network (uses IP routing tables); gateway = can operate up to application layer.\n\nEncapsulation names (top to bottom): Message/Data -> Segment (transport, TCP) or User Datagram (UDP) -> Packet/Datagram (network) -> Frame (data link) -> Bits (physical). Decapsulation strips headers in reverse order as the frame rises through a receiving stack.\n\nDELAY FORMULAS (the backbone of every timing numerical)\n\nFor a packet of L bits, link bandwidth R bps, link length d metres, propagation speed v m/s:\n• Transmission delay: Tt = L / R\n• Propagation delay: Tp = d / v\n• Queueing delay: Tq (variable, depends on traffic/load — not computable from L, R, d alone)\n• Processing delay: Tproc (router/switch overhead, often given or ignored)\n• Total delay across one hop = Tt + Tp + Tq + Tproc\n\nKEY RULE (most common trap): Tt depends only on packet size and bandwidth; Tp depends only on distance and propagation speed. Neither substitutes for the other; a bigger packet never changes Tp, and a longer wire never changes Tt.\n\nStore-and-forward across h links (hops), single packet, ignoring queueing: Total = h * Tt + h * Tp (each router fully receives before forwarding, so each link contributes its own Tt and Tp in series; if links differ, sum each Tt_i + Tp_i).\n\nPipelining a message split into n equal packets sent back-to-back over h equal-rate links, ignoring propagation: Total = (h + n - 1) * Tt. Reasoning: the first packet takes h time slots to traverse all hops; because packets are sent back to back, each subsequent packet only adds one more Tt slot at the last link. Including propagation (all links identical): Total = (n + h - 1) * Tt + h * Tp.\n\nMessage switching (no splitting): Total = h * (L_total / R) + h * Tp — always worse than or equal to packet splitting since (h + n - 1) < h * n for n, h > 1.\n\nBandwidth-Delay Product: BDP = R * delay (bits). Using one-way propagation delay, BDP = number of bits that can be \"in flight\" on the wire at once (the pipe's capacity). Using RTT, BDP = the number of unacknowledged bits a sender needs outstanding to keep the pipe 100% busy — this is exactly the required sliding-window size in bits (divide by packet size for window size in packets).\n\nPhysical layer capacity:\n• Nyquist (noiseless): C = 2B log2(M), B = bandwidth in Hz, M = number of discrete signal levels.\n• Shannon (noisy): C = B log2(1 + SNR), SNR as a linear power ratio (not dB).\n• Convert decibel SNR: SNR(dB) = 10 log10(SNR_linear), so SNR_dB = 30 means SNR_linear = 1000; SNR_dB = 20 means SNR_linear = 100.\n\nSWITCHING COMPARISON\n\n  Property            Circuit Switching          Packet Switching\n  Path                dedicated, reserved        none, shared per-packet\n  Setup overhead      yes (call setup/teardown)  no (or per-VC for VC mode)\n  Bandwidth use        can be wasted when idle   statistically shared, efficient\n  Delay per hop        none after setup          Tt + Tp each hop (store-and-forward)\n  Failure resilience   path fails => call drops  can reroute around failures\n  Example              PSTN telephone            Internet (IP)\n\nGATE TRAPS\n• Propagation delay is independent of packet/message size — never multiply it by number of packets.\n• Transmission delay is independent of distance — never multiply it by number of hops' distances.\n• In pipelined store-and-forward, do not use h*n*Tt (that is the non-pipelined/message-switched answer); use (h+n-1)*Tt.\n• Mbps in GATE networking problems is 10^6 bits/sec unless stated otherwise; memory sizes (KB, MB) are powers of 2 — do not mix conventions.\n• BDP must use the SAME delay type (one-way vs RTT) consistently with what the question calls \"window size.\"\n• SNR must be converted from dB to linear before applying Shannon's formula — plugging in dB directly is the single most common Shannon-formula error.\n• log2(M) requires M to be an integer power of 2 for a clean Nyquist answer; if M is given as a bit-per-symbol count already, do not take another log.\n\nWORKED EXAMPLE 1 (pipelined store-and-forward)\nA file of 800,000 bits must be sent over 4 links, each of bandwidth 2 Mbps, each 2000 km long, with propagation speed 2*10^8 m/s. The file is split into 8 equal packets. Find total transfer time.\nPer-packet size L = 800000/8 = 100,000 bits.\nTt per link = L/R = 100000 / (2*10^6) = 0.05 s = 50 ms.\nTp per link = d/v = (2*10^6 m)/(2*10^8 m/s) = 0.01 s = 10 ms.\nNumber of hops h = 4, number of packets n = 8.\nTotal = (h + n - 1)*Tt + h*Tp = (4+8-1)*50ms + 4*10ms = 11*50 + 40 = 550 + 40 = 590 ms.\n\nWORKED EXAMPLE 2 (bandwidth-delay product / window size)\nA link has bandwidth 100 Mbps and one-way propagation delay 20 ms (RTT = 40 ms). Packets are 1000 bytes = 8000 bits each. Find (a) the bandwidth-delay product using RTT, and (b) the minimum number of packets the sender must be able to have outstanding to fully utilize the link.\n(a) BDP = R * RTT = (100*10^6 bits/s) * (40*10^-3 s) = 4*10^6 bits = 4,000,000 bits = 500,000 bytes.\n(b) Number of packets = BDP / packet size = 4,000,000 / 8000 = 500 packets. So the sender needs a window of at least 500 packets (500,000 bytes) in flight to keep the link 100% utilized — this is exactly the sliding-window sizing calculation reused throughout the transport-layer topic.";

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-datalink';}).theory.deep = "DATA LINK LAYER RESPONSIBILITIES\n\nFraming (delimiting bits into frames: byte stuffing, bit stuffing with 0-insertion after five consecutive 1s in HDLC), physical/MAC addressing, error detection (parity, checksum, CRC), flow control (stop-and-wait, sliding window with Go-Back-N and Selective Repeat), and medium access control on shared/broadcast links (ALOHA, CSMA variants, token passing).\n\nERROR DETECTION: CRC PROCEDURE\n\nGiven message bits M and a generator polynomial G of degree r (r+1 bits):\n1. Append r zero bits to M, forming M'.\n2. Divide M' by G using modulo-2 (XOR) division.\n3. The remainder R (r bits) is the CRC/FCS.\n4. Transmit T = M' with the trailing zeros replaced by R (T = M shifted left by r, XORed with R). T is divisible by G with zero remainder.\n5. Receiver divides received T by G; a nonzero remainder signals an error; zero remainder is (usually) accepted as error-free — but a burst equal to a multiple of G can go undetected.\nCRC of degree r detects: all single-bit errors, all double-bit errors (if G has more than one term and is not divisible by x), all odd numbers of errors (if G has factor (x+1)), all burst errors of length <= r, and a fraction (1 - 2^-(r-1) for length r+1 bursts, 1 - 2^-r for longer bursts) of longer bursts.\n\nSTOP-AND-WAIT PROTOCOL AND EFFICIENCY\n\nSender sends one frame, waits for ACK before sending next. Let Tt = transmission time of a data frame, Tp = one-way propagation delay, a = Tp/Tt (ignoring ACK transmission time and processing delay).\n• Total time per frame (frame + ACK round trip) = Tt + 2*Tp (assuming ACK transmission time is negligible).\n• Efficiency (utilization) U = Tt / (Tt + 2*Tp) = 1 / (1 + 2a).\n• Throughput = U * R, where R is the link bandwidth.\nIf ACK transmission time Tt_ack is not negligible: Total time = Tt + 2*Tp + Tt_ack, and U = Tt / (Tt + 2*Tp + Tt_ack).\n\nSLIDING WINDOW EFFICIENCY AND OPTIMAL WINDOW SIZE\n\nWith window size W (frames sent before needing an ACK), and 1/(1+2a) being the stop-and-wait efficiency:\n• If W >= (1 + 2a) [i.e., W is large enough that the sender never stalls], efficiency = 100% (U = 1) — the pipe is kept continuously busy.\n• If W < (1 + 2a), the sender exhausts its window and must stall waiting for ACKs: efficiency U = W / (1 + 2a).\n• The optimal (minimum) window size to achieve 100% utilization is W_opt = ceil(1 + 2a) = ceil((Tt + 2*Tp)/Tt). This is exactly one stop-and-wait round trip's worth of frames, i.e., the bandwidth-delay product measured in frames.\n\nSEQUENCE NUMBER BITS VS WINDOW SIZE (GBN vs SR)\n\nWith n bits used for sequence numbers, the sequence space size is 2^n.\n• Go-Back-N (GBN): sender window size W_s must satisfy W_s <= 2^n - 1 (receiver window = 1). The \"-1\" avoids ambiguity between a new frame and a retransmitted old one when only cumulative ACKs and a single expected sequence number are tracked.\n• Selective Repeat (SR): sender window size W_s = receiver window size W_r, and both must satisfy W_s + W_r <= 2^n, i.e., W_s = W_r <= 2^n / 2 = 2^(n-1). This stricter bound (half the sequence space) is needed because SR receivers buffer out-of-order frames, and overlapping windows of size larger than 2^(n-1) can make the receiver mistake a retransmitted old frame for a new one.\n\nRANDOM ACCESS: ALOHA THROUGHPUT\n\nLet G = average number of transmission attempts (including retransmissions) per frame time.\n• Pure ALOHA: a frame's vulnerable period is 2 * Tframe (frame can be hit by any transmission starting up to one frame-time before or after it starts). Throughput S = G * e^(-2G). Maximum S = 1/(2e) ≈ 0.184 (18.4%), achieved at G = 0.5.\n• Slotted ALOHA: transmissions are aligned to slots equal to one frame time, halving the vulnerable period to 1 * Tframe. Throughput S = G * e^(-G). Maximum S = 1/e ≈ 0.368 (36.8%), achieved at G = 1.\n\nCSMA/CD MINIMUM FRAME SIZE RELATION\n\nFor collision detection to work, a station must still be transmitting when the collision signal returns, i.e., the transmission time must be at least the round-trip propagation delay:\nTt_min = 2 * Tp (using the maximum end-to-end propagation delay of the network).\n=> Minimum frame length L_min = 2 * Tp * R = R * (2d/v), where R = bandwidth, d = maximum distance between two stations, v = propagation speed.\nThis is why classic Ethernet (10 Mbps, 2500 m max span plus repeaters) mandates a 512-bit (64-byte) minimum frame — shorter frames are padded to meet L_min.\n\nCOMPARISON: ALOHA vs SLOTTED ALOHA vs CSMA/CD vs TOKEN PASSING\n\n  Scheme          Max Throughput   Coordination        Collision Handling\n  Pure ALOHA      18.4% (1/2e)     none                collide, backoff, retransmit\n  Slotted ALOHA   36.8% (1/e)      slot synchronization collide, backoff, retransmit\n  CSMA (1-persist)higher, load-dep listen-before-talk    collisions still possible\n  CSMA/CD          higher still    listen + abort early  detect & abort mid-transmission\n  Token passing   near 100% (no coll.) token circulates  no collisions, deterministic access\n\nGATE TRAPS\n• In CRC, remainder length equals the DEGREE of the generator (number of bits appended = degree, not degree+1).\n• Pure ALOHA vulnerable window is 2*Tframe; slotted ALOHA is only 1*Tframe — mixing these flips the whole answer.\n• Stop-and-wait efficiency formula uses \"a\" = Tp/Tt, not Tp/(Tt+Tp); always double-check which ratio a question defines as \"a.\"\n• GBN's window bound is 2^n - 1; students often forget the \"-1\" and use 2^n, which is the SR bound divided incorrectly.\n• SR's bound is 2^(n-1), often mistaken for 2^n - 1 (the GBN bound) — these two are the single most tested confusion in this topic.\n• CSMA/CD minimum frame size uses ROUND TRIP propagation (2*Tp), not one-way.\n\nWORKED EXAMPLE 1 (stop-and-wait efficiency and optimal window)\nA 1 Mbps link has a one-way propagation delay of 20 ms. Frames are 1000 bits. Find stop-and-wait efficiency and the window size needed for 100% utilization.\nTt = 1000 / (10^6) = 1 ms. Tp = 20 ms. a = Tp/Tt = 20.\nU(stop-and-wait) = 1/(1+2a) = 1/(1+40) = 1/41 ≈ 2.44%.\nW_opt = ceil(1+2a) = ceil(41) = 41 frames needed in the window for 100% utilization.\n\nWORKED EXAMPLE 2 (GBN vs SR sequence bits)\nA protocol uses n = 4 bits for sequence numbers (sequence space = 16). Find the maximum sender window size under Go-Back-N and under Selective Repeat.\nGBN: W_max = 2^n - 1 = 16 - 1 = 15.\nSR: W_max = 2^(n-1) = 2^3 = 8.\nSo with the same 4-bit sequence field, GBN can keep 15 frames outstanding while SR (needing unambiguous buffering at the receiver) is limited to only 8 — a frequently tested pairing in GATE numericals.";

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-network';}).theory.deep = "NETWORK LAYER RESPONSIBILITIES\n\nLogical (IP) addressing, routing (path selection via distance-vector or link-state algorithms), forwarding (per-packet next-hop lookup), fragmentation and reassembly of oversized datagrams, and (in IPv4) best-effort unreliable delivery with no guarantees on order, delivery, or duplication.\n\nIPv4 HEADER FIELDS (20 bytes minimum, no options)\n\n  Field                  Size       Purpose\n  Version                4 bits     IP version (4)\n  IHL                    4 bits     header length in 32-bit words (min 5 = 20 bytes)\n  Type of Service/DSCP   8 bits     priority/QoS marking\n  Total Length           16 bits    header + data, in bytes (max 65535)\n  Identification         16 bits    identifies fragments of one original datagram\n  Flags                  3 bits     bit0 reserved(0), DF (Don't Fragment), MF (More Fragments)\n  Fragment Offset        13 bits    offset of this fragment's data in units of 8 bytes\n  TTL                    8 bits     hop limit, decremented per router, discard at 0\n  Protocol               8 bits     next header (6=TCP, 17=UDP, 1=ICMP)\n  Header Checksum        16 bits    checksum over header only, recomputed every hop (TTL changes)\n  Source Address         32 bits    sender IP\n  Destination Address    32 bits    receiver IP\n  Options                variable   rarely used, padded to 32-bit boundary\n\nMaximum header size (with options) = 15*4 = 60 bytes (IHL max = 15 words). Minimum IHL = 5 => 20 bytes.\n\nSUBNETTING RECIPE\n\nGiven a network with prefix /p (or mask), to accommodate a required number of hosts H or a required number of subnets N:\n1. Host bits needed: find smallest h such that 2^h - 2 >= H (subtract 2 for network and broadcast addresses; some GATE questions say \"usable hosts\" needing -2, others say \"addresses\" with no -2 — read carefully).\n2. Subnet bits needed: find smallest s such that 2^s >= N.\n3. New prefix length = original prefix + s = 32 - h.\n4. Subnet mask = prefix p ones followed by (32-p) zeros, e.g., /26 = 255.255.255.192.\n5. Block size (number of addresses per subnet) = 2^(32-new_prefix) = 2^h.\n6. Subnet boundaries are multiples of the block size; e.g., a /26 network (block size 64) has subnets at .0, .64, .128, .192 within the last octet.\n7. Usable host range in a subnet = (network address + 1) to (broadcast address - 1); broadcast address = network address + block size - 1.\n\nVLSM (Variable Length Subnet Masking): allocate the largest host requirements first, assign the smallest sufficient block, and move to the next available block boundary — always keeping blocks aligned to their own size (a block of size 2^k must start at a multiple of 2^k).\n\nFRAGMENTATION OFFSET RULES\n\nWhen a datagram of data size D bytes (excluding header) must cross a link with MTU M (data payload capacity per fragment, M rounded down to a multiple of 8):\n• Each fragment's data size (except possibly the last) must be a multiple of 8 bytes, because Fragment Offset is measured in 8-byte units.\n• Fragment Offset (in the header) = (starting byte position of this fragment's data within the original data) / 8.\n• More Fragments (MF) = 1 for all fragments except the last, which has MF = 0.\n• Number of fragments = ceil(D / floor(M/8)*8).\n• All fragments carry the same Identification field as the original datagram so the destination can group them for reassembly; reassembly happens only at the final destination, never at intermediate routers.\n• Each fragment gets its own full IP header (so total transmitted bytes across fragments exceeds D by header-size * (fragments - 1) extra bytes versus one full-size datagram).\n\nROUTING ALGORITHM COMPARISON\n\n  Property             Distance Vector (e.g. RIP)      Link State (e.g. OSPF)\n  Information shared   own distance vector to neighbors full topology (link states) flooded to all\n  Algorithm            Bellman-Ford                    Dijkstra's shortest path\n  Convergence          slower, count-to-infinity issue  faster, more stable\n  Routing table size   knows next hop only              knows full topology, computes locally\n  Problem              routing loops, count-to-infinity requires more memory/CPU, flooding overhead\n  Scalability           poor for large networks          used for large networks (with areas)\n\nICMP: carries error/control messages (echo request/reply for ping, destination unreachable, time exceeded, redirect) — considered part of the network layer, though it rides inside IP packets (protocol number 1).\n\nNAT (Network Address Translation): maps private (RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) addresses to a smaller pool of public addresses, typically via port translation (NAPT), allowing many internal hosts to share few public IPs.\n\nGATE TRAPS\n• Fragment offset is in units of 8 BYTES, not 1 byte — forgetting to divide/multiply by 8 is the most common fragmentation error.\n• The LAST fragment can have a non-multiple-of-8 data size; all others must be exact multiples of 8.\n• Number of usable hosts is 2^h - 2 (subtract network + broadcast) unless the question explicitly asks for total addresses in the block.\n• Header checksum in IPv4 covers ONLY the header, not the payload — do not confuse with UDP/TCP checksums which cover pseudo-header + header + data.\n• TTL decrements at every router hop; when it hits 0 the packet is discarded and an ICMP Time Exceeded is sent back — this is unrelated to fragmentation.\n• Subnetwork block sizes must start at multiples of the block size — an answer like \"192.168.1.50/26 is a valid network address\" is wrong unless 50 is a multiple of 64.\n• Distance vector's \"count to infinity\" is specifically about failure/link-down scenarios, not about slow convergence on link-up.\n\nWORKED EXAMPLE 1 (subnetting)\nAn organization has address block 192.168.10.0/24 and needs 6 subnets, each supporting at least 25 hosts. Find the subnet mask and one subnet's usable range.\nSubnet bits s: 2^s >= 6 => s = 3 (2^3=8 subnets available).\nRemaining host bits h = 8 - 3 = 5 => 2^5 - 2 = 30 usable hosts, which is >= 25. Good.\nNew prefix = 24 + 3 = 27, mask = 255.255.255.224. Block size = 2^5 = 32.\nSubnet boundaries: .0, .32, .64, .96, .128, .160, .192, .224.\nSecond subnet: network = 192.168.10.32/27, broadcast = 192.168.10.63, usable hosts = 192.168.10.33 to 192.168.10.62 (30 addresses).\n\nWORKED EXAMPLE 2 (fragmentation)\nA datagram carries 4000 bytes of data (excluding the 20-byte header) and must cross a link with MTU = 1500 bytes (including a 20-byte IP header, so usable data per fragment = 1480 bytes, already a multiple of 8). Find the number of fragments and each fragment's offset and MF bit.\nData per fragment (max, multiple of 8) = 1480 bytes.\nNumber of fragments = ceil(4000/1480) = ceil(2.7) = 3.\nFragment 1: data bytes 0-1479 (1480 bytes), Offset = 0/8 = 0, MF = 1.\nFragment 2: data bytes 1480-2959 (1480 bytes), Offset = 1480/8 = 185, MF = 1.\nFragment 3: data bytes 2960-3999 (1040 bytes, the remainder, not required to be a multiple of 8), Offset = 2960/8 = 370, MF = 0.\nCheck: 1480+1480+1040 = 4000 bytes, matching the original data size exactly.";

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-transport';}).theory.deep = "TRANSPORT LAYER RESPONSIBILITIES\n\nProcess-to-process delivery via port numbers, multiplexing/demultiplexing (using the 4-tuple: source IP, source port, destination IP, destination port for TCP; destination port alone plus IP for UDP demux), segmentation of application data, and — for TCP only — reliable in-order delivery, flow control, and congestion control. UDP is connectionless and provides no reliability, ordering, or congestion control, only optional checksumming and multiplexing.\n\nUDP HEADER (8 bytes, fixed)\n\n  Field              Size      Purpose\n  Source Port        16 bits   optional, 0 if unused\n  Destination Port   16 bits   required for demultiplexing\n  Length              16 bits  header + data, in bytes (min 8)\n  Checksum            16 bits  optional in IPv4 (0 = unused), mandatory in IPv6\n\nTCP HEADER (20 bytes minimum, no options)\n\n  Field                   Size       Purpose\n  Source Port             16 bits    sending process\n  Destination Port        16 bits    receiving process\n  Sequence Number         32 bits    byte offset of first data byte in this segment\n  Acknowledgement Number  32 bits    next expected byte (cumulative ACK)\n  Header Length (Data Offset) 4 bits words, min 5 (20 bytes)\n  Reserved                6 bits     unused\n  Flags                   6 bits     URG, ACK, PSH, RST, SYN, FIN\n  Window Size             16 bits    receiver's advertised flow-control window (bytes)\n  Checksum                16 bits    over pseudo-header + TCP header + data\n  Urgent Pointer          16 bits    valid only if URG set\n  Options                 variable   e.g. MSS, window scale, SACK, timestamps\n\nBoth TCP and UDP checksums cover a pseudo-header (source IP, dest IP, protocol, TCP/UDP length) plus the segment itself — this is why a change in IP addresses (e.g. via NAT without checksum fixup) can invalidate a transport checksum even though the transport header itself is untouched.\n\nTHREE-WAY HANDSHAKE AND TEARDOWN\n\nConnection setup: SYN (client, seq=x) -> SYN+ACK (server, seq=y, ack=x+1) -> ACK (client, ack=y+1). Takes 1 RTT before the client can send data (data can piggyback on the final ACK).\nConnection teardown: FIN -> ACK -> FIN -> ACK (4-way, since each side closes independently); can be shortened if both FINs are combined.\n\nRTO ESTIMATION: EWMA FORMULAS\n\nUsing an Exponentially Weighted Moving Average (Jacobson/Karels algorithm), with standard constants alpha = 0.125, beta = 0.25:\n• EstimatedRTT = (1 - alpha) * EstimatedRTT + alpha * SampleRTT\n• DevRTT = (1 - beta) * DevRTT + beta * |SampleRTT - EstimatedRTT|\n• RTO (Retransmission Timeout) = EstimatedRTT + 4 * DevRTT\nThe factor of 4 on DevRTT provides safety margin against RTT variance; SampleRTT must never be measured on a retransmitted segment (Karn's algorithm) to avoid ambiguity about which transmission the ACK corresponds to. On a timeout, RTO is doubled (exponential backoff) for the next retry attempt, without needing a new sample.\n\nCONGESTION CONTROL: cwnd EVOLUTION RULES\n\nCongestion window (cwnd) is maintained in units of MSS (Maximum Segment Size); actual sending window = min(cwnd, receiver's advertised window).\n• Slow Start: begins with cwnd = 1 MSS (some implementations start higher); cwnd increases by 1 MSS per ACK received, which doubles cwnd every RTT (exponential growth), until cwnd reaches ssthresh (slow-start threshold).\n• Congestion Avoidance (AIMD - Additive Increase): once cwnd >= ssthresh, cwnd increases by 1 MSS per RTT (roughly +1/cwnd MSS per ACK) — linear growth.\n• Loss signal 1 — Timeout (severe congestion, e.g. TCP Tahoe and Reno both react this way): ssthresh = cwnd / 2 (but never less than 2 MSS), then cwnd resets to 1 MSS, and slow start restarts from scratch.\n• Loss signal 2 — Triple Duplicate ACK (mild congestion, fast retransmit):\n  - TCP Tahoe: treats it the same as timeout — ssthresh = cwnd/2, cwnd = 1 MSS, restart slow start.\n  - TCP Reno: Fast Recovery — ssthresh = cwnd/2, cwnd = ssthresh (not 1), then enters congestion avoidance directly (multiplicative decrease without the full slow-start restart) — this produces the classic AIMD \"sawtooth.\"\nThis asymmetry (halve on loss, +1 per RTT on success) is why TCP's long-run behavior is called AIMD (Additive Increase, Multiplicative Decrease).\n\nTCP THROUGHPUT FORMULAS\n\nFor the steady-state AIMD sawtooth oscillating between W/2 and W (window in MSS units, over RTT):\n• Average throughput ≈ (0.75 * W * MSS) / RTT (since the average of a linear ramp from W/2 to W is 0.75*W).\n• Loss-rate-based approximation (Mathis formula): Throughput ≈ (1.22 * MSS) / (RTT * sqrt(p)), where p is the packet loss probability — showing throughput falls off as 1/sqrt(p), so TCP over a lossy path suffers quadratically worse as loss increases.\n• Maximum achievable throughput is still capped by min(cwnd, rwnd)/RTT and by the link bandwidth itself.\n\nFLOW CONTROL: RECEIVER WINDOW\n\nTCP flow control uses the advertised Window Size field: sender may have at most (rwnd) unacknowledged bytes outstanding, where rwnd = receiver's free buffer space. Effective sending window = min(cwnd, rwnd). A rwnd of 0 triggers the sender to periodically probe (persist timer) since a pure \"window update\" ACK with new space could be lost.\n\nGATE TRAPS\n• RTO uses 4*DevRTT (not 2x or plain DevRTT) added to EstimatedRTT — remembering \"K=4\" is essential for numerical questions.\n• alpha (SRTT weight) = 0.125 = 1/8, and beta (deviation weight) = 0.25 = 1/4 — these are the standard values GATE expects unless stated otherwise.\n• Reno's fast recovery sets cwnd = ssthresh directly (skips slow start) after 3 dup ACKs; only Tahoe (and Reno on timeout) drops cwnd all the way to 1 MSS.\n• During slow start, cwnd doubles per RTT, NOT per ACK, in terms of net RTT-level growth — but the increment rule is +1 MSS per received ACK, which sums to +cwnd (i.e., doubling) over one full RTT of ACKs.\n• MSS is NOT the same as MTU: MSS = MTU - (IP header + TCP header), typically 1460 bytes for a 1500-byte Ethernet MTU with no options.\n• UDP checksum is optional in IPv4 (field of 0 means \"not computed\") but mandatory in IPv6.\n• ssthresh is set to cwnd/2 at the moment of loss detection, using the cwnd value AT loss, not the cwnd from the previous round.\n\nWORKED EXAMPLE 1 (RTO computation)\nInitial EstimatedRTT = 100 ms, DevRTT = 20 ms. A new SampleRTT of 140 ms is measured. Compute the new EstimatedRTT, DevRTT, and RTO using alpha=0.125, beta=0.25.\nNew EstimatedRTT = 0.875*100 + 0.125*140 = 87.5 + 17.5 = 105 ms.\n|SampleRTT - old EstimatedRTT| = |140 - 100| = 40 ms.\nNew DevRTT = 0.75*20 + 0.25*40 = 15 + 10 = 25 ms.\nRTO = EstimatedRTT + 4*DevRTT = 105 + 4*25 = 105 + 100 = 205 ms.\n\nWORKED EXAMPLE 2 (cwnd evolution)\nTCP Reno has ssthresh = 16 MSS and cwnd = 1 MSS at the start of a transfer. Trace cwnd for the first 5 RTTs assuming no loss, then find cwnd immediately after a triple-duplicate-ACK event when cwnd had grown to 20 MSS.\nRTT1: cwnd = 1 (slow start) -> after ACKs, cwnd = 2.\nRTT2: cwnd = 2 -> 4.\nRTT3: cwnd = 4 -> 8.\nRTT4: cwnd = 8 -> 16 (reaches ssthresh; slow start ends here).\nRTT5: cwnd = 16 -> 17 (congestion avoidance, +1 MSS per RTT from here on).\nNow suppose later cwnd has grown (linearly, +1/RTT) to 20 MSS when a triple duplicate ACK occurs. Reno's fast recovery: new ssthresh = cwnd/2 = 20/2 = 10 MSS; cwnd is set to ssthresh = 10 MSS, and the connection resumes in congestion avoidance (linear +1 MSS/RTT growth from 10), never dropping to 1 MSS since this was a mild-congestion signal, not a timeout.";

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-application';}).theory.deep = "APPLICATION LAYER RESPONSIBILITIES\n\nProvides network services directly to user processes: naming and address resolution (DNS), document transfer and retrieval (HTTP), file transfer (FTP), electronic mail (SMTP, POP3, IMAP), remote terminal access (Telnet, SSH), dynamic host configuration (DHCP), and network security primitives (symmetric/asymmetric cryptography, digital signatures, certificates) that other application protocols build on.\n\nHTTP CONNECTION MODES AND RTT COUNTING\n\nAssume DNS name is already resolved (add DNS lookup RTTs separately if not). Let RTT be the round-trip time between client and server, and suppose a base HTML page references n additional embedded objects (images, scripts) all on the same server.\n\n• Non-persistent HTTP, one object at a time (no parallel connections): each object requires its own new TCP connection.\n  - TCP handshake: 1 RTT.\n  - Request sent + response begins arriving: 1 RTT.\n  - So each object costs 2 RTT (handshake + request/response).\n  - Total for base page + n embedded objects = 2*(n+1) RTT = 2n + 2 RTT.\n\n• Non-persistent HTTP with parallel connections (browser opens k connections simultaneously): objects are fetched in ceil(n/k) parallel rounds, each round still costing 2 RTT, so total ≈ 2 RTT (for base page) + 2*ceil(n/k) RTT.\n\n• Persistent HTTP without pipelining (HTTP/1.1 default, keep-alive but client waits for each response before requesting the next): one TCP handshake for the whole session (1 RTT), then each object (including the base page) costs 1 RTT (request/response) since the connection is already open.\n  - Total = 1 RTT (handshake) + (n+1)*1 RTT = n + 2 RTT.\n\n• Persistent HTTP with pipelining (client fires all requests back-to-back without waiting for responses): 1 RTT handshake + 1 RTT to send all pipelined requests and receive all responses (approximately, if the server can respond fast enough and bandwidth is not the bottleneck) = 2 RTT total, independent of n (idealized case).\n\nAdding DNS: if the domain name is not cached, add the DNS resolution time (1 RTT to a local resolver in the simplest cached case, or several RTTs for iterative/recursive resolution across root, TLD, and authoritative servers) before the first connection can even begin.\n\nDNS RESOLUTION\n\n• Iterative query: client (via local/recursive resolver) queries root server, gets referral to TLD server, queries TLD, gets referral to authoritative server, queries authoritative server directly — the querying resolver does all the round trips itself.\n• Recursive query: client asks its local resolver once; the resolver does all the iterative work on the client's behalf and returns the final answer — the client incurs only 1 RTT (to its own resolver) regardless of how many hops the resolver made internally.\n• Caching at the local resolver (with a TTL) avoids repeating the full chain for popular domains — GATE often asks \"with caching, how many RTTs\" versus \"without caching, how many RTTs.\"\n\nFTP: uses TWO separate TCP connections — a control connection (port 21, stays open for the session, carries commands/replies) and a data connection (port 20 or a negotiated port, opened per-file-transfer and closed after) — this out-of-band control is a classic point of comparison against HTTP, which uses a single connection type for both.\n\nEMAIL PROTOCOLS: SMTP pushes mail from a client (or one mail server) to another mail server (always push, always uses port 25, and traditionally requires 7-bit ASCII, with MIME extensions for non-ASCII/binary content). POP3 and IMAP are pull protocols used by an end user's mail client to retrieve mail FROM their mailbox server; IMAP keeps mail organized in folders on the server and supports partial fetches, while POP3 traditionally downloads and optionally deletes from the server.\n\nCRYPTOGRAPHY: RSA KEY MATH (PUBLIC-KEY / ASYMMETRIC)\n\nKey generation:\n1. Choose two large primes p and q.\n2. Compute n = p * q (the modulus, made public).\n3. Compute Euler's totient: phi(n) = (p-1)*(q-1).\n4. Choose public exponent e such that 1 < e < phi(n) and gcd(e, phi(n)) = 1 (e is coprime to phi(n)).\n5. Compute private exponent d as the modular multiplicative inverse of e mod phi(n): d * e ≡ 1 (mod phi(n)).\nPublic key = (e, n); Private key = (d, n).\n\nEncryption: ciphertext c = m^e mod n (m is the plaintext, treated as an integer less than n).\nDecryption: plaintext m = c^d mod n.\nCorrectness relies on Euler's theorem: since e*d ≡ 1 (mod phi(n)), (m^e)^d = m^(ed) ≡ m (mod n) for any m coprime to n (and by CRT it also holds when m shares a factor with n).\n\nDigital signature (reverse use): sender \"signs\" with their own private key: s = m^d mod n; anyone can verify using the sender's public key: m' = s^e mod n, and checks m' = m, proving authenticity (only the private-key holder could have produced s) — this is separate from encryption for confidentiality.\n\nKey-management scaling: for N users needing pairwise secure symmetric channels, N(N-1)/2 distinct symmetric keys are required (quadratic growth); asymmetric schemes need only N key pairs total (linear growth), one per user, since a single public key lets anyone send that user confidential messages.\n\nGATE TRAPS\n• Non-persistent HTTP without parallelism costs 2 RTT PER OBJECT (handshake + request), not 1 RTT — a very common undercount.\n• Persistent non-pipelined HTTP costs 1 RTT per object AFTER a single one-time handshake RTT — total = (objects) + 1, not (objects)*2.\n• Persistent WITH pipelining collapses everything after the handshake into roughly one more RTT — do not multiply by the number of objects.\n• Recursive DNS resolution costs the client only 1 RTT to its local resolver, even though the resolver itself may need many RTTs internally — GATE sometimes asks for the resolver's total RTTs and sometimes for the client's; read which is asked.\n• RSA: e must be coprime to phi(n), NOT to n itself — a frequent substitution error.\n• d is the modular inverse of e mod phi(n), computed via the extended Euclidean algorithm — verify by checking (e*d) mod phi(n) = 1 before trusting a computed d.\n• FTP's control connection persists for the whole session; the data connection is opened and closed per transfer — do not say FTP uses \"one connection.\"\n\nWORKED EXAMPLE 1 (HTTP RTT counting)\nA web page has 1 base HTML file and 5 embedded images, all from the same server, with RTT = 50 ms, and the DNS name is already cached. Compute total page load time under (a) non-persistent HTTP with no parallelism, and (b) persistent HTTP with pipelining.\n(a) Non-persistent, sequential: 2*(n+1) RTT = 2*(5+1)*50ms = 2*6*50 = 600 ms.\n(b) Persistent with pipelining: 2 RTT total (1 for handshake + 1 for all pipelined requests/responses) = 2*50 = 100 ms.\nPipelined persistent HTTP is 6 times faster in RTT terms in this scenario — this dramatic gap is exactly why GATE tests this comparison.\n\nWORKED EXAMPLE 2 (RSA encryption/decryption)\nLet p = 5, q = 11. Choose e = 3. Find n, phi(n), d, and encrypt m = 4.\nn = p*q = 5*11 = 55.\nphi(n) = (5-1)*(11-1) = 4*10 = 40.\nCheck gcd(3, 40) = 1, valid.\nFind d: need 3*d ≡ 1 (mod 40). Try d = 27: 3*27 = 81 = 2*40 + 1, so 81 mod 40 = 1. d = 27.\nEncrypt m = 4: c = 4^3 mod 55 = 64 mod 55 = 9.\nDecrypt to verify: m = 9^27 mod 55. Using fast exponentiation: 9^2=81 mod55=26; 9^4=26^2=676 mod55=676-12*55=676-660=16; 9^8=16^2=256 mod55=256-4*55=36; 9^16=36^2=1296 mod55=1296-23*55=1296-1265=31. 27 = 16+8+2+1, so 9^27 = 9^16 * 9^8 * 9^2 * 9^1 mod 55 = 31*36*26*9 mod 55. 31*36=1116 mod55=1116-20*55=16. 16*26=416 mod55=416-7*55=31. 31*9=279 mod55=279-5*55=4. Result = 4, matching the original plaintext m = 4, confirming correct key generation.";

window.GATE_DATA.questions['cn'].topics.find(function(t){return t.id==='cn-basics';}).questions.push(
{
  id: "cn-basics-y1",
  q: "Which of the following statements about transmission delay and propagation delay are TRUE? (Select ALL that apply)",
  options: ["Transmission delay depends on the packet size and the link's bandwidth, but not on the distance between sender and receiver", "Propagation delay depends on the physical distance and the signal's propagation speed, but not on the packet size", "Increasing the bandwidth of a link always decreases the propagation delay on that link", "The bandwidth-delay product (using one-way propagation delay) represents the maximum number of bits that can be 'in flight' on the link at any instant"],
  answers: [0, 1, 3],
  marks: 2,
  difficulty: "medium",
  type: "concept",
  explanation: "Option A is true: transmission delay Tt = L/R depends only on packet length L and link bandwidth R; it is completely independent of how far apart the two ends of the link are. Option B is true: propagation delay Tp = d/v depends only on the physical distance d and the propagation speed v of the medium; it never depends on how large the packet is. Option C is false: bandwidth (bits per second capacity) has no effect on propagation delay at all, since Tp = d/v involves only distance and propagation speed -- increasing R changes Tt, not Tp, which is exactly why the two delays are treated as independent quantities that simply add. Option D is true: the bandwidth-delay product BDP = R x (one-way propagation delay) gives the number of bits that fit on the wire between sender and receiver at any given moment, i.e., the capacity of the 'pipe' -- this is the standard definition used throughout window-sizing questions. Hence A, B, and D are correct and C is the false statement, since it conflates a bandwidth-related term with a purely distance/speed-related term."
},
{
  id: "cn-basics-y2",
  q: "Which of the following correctly pair a network reference-model layer with a function actually performed at that layer? (Select ALL that apply)",
  options: ["Data link layer -- physical (MAC) addressing and framing of bits into frames", "Network layer -- logical (IP) addressing and routing of packets across multiple links", "Transport layer -- port-based multiplexing/demultiplexing enabling process-to-process delivery", "Physical layer -- end-to-end reliable, in-order delivery of an entire message between two hosts"],
  answers: [0, 1, 2],
  marks: 2,
  difficulty: "easy",
  type: "concept",
  explanation: "Option A is true: the data link layer frames bits into frames and uses physical (MAC) addresses to achieve hop-to-hop delivery on a single link. Option B is true: the network layer is precisely where logical IP addressing and route computation across multiple intermediate links live, enabling source-to-destination delivery. Option C is true: the transport layer uses port numbers to multiplex/demultiplex data among different processes on the same host, which is the defining feature of process-to-process delivery. Option D is false: the physical layer is concerned only with transmitting raw, unstructured bits over a medium (encoding, signalling, bit timing) -- it has no notion of reliability, ordering, or even of a 'message'; end-to-end reliable delivery is a transport-layer (TCP) responsibility, not a physical-layer one. Hence A, B, and C are correctly paired and D is a mismatched pairing."
},
{
  id: "cn-basics-y3",
  q: "A link has a bandwidth of 4 Mbps and a one-way propagation delay of 25 ms. What is the bandwidth-delay product of this link, in bits? (Enter your numerical answer.)",
  options: [],
  answer: 100000,
  kind: "nat",
  marks: 1,
  difficulty: "easy",
  type: "numerical",
  explanation: "Bandwidth-delay product (BDP) = bandwidth x one-way propagation delay = (4 x 10^6 bits/s) x (25 x 10^-3 s) = 4 x 10^6 x 0.025 = 100,000 bits. This represents the maximum number of bits that can be present 'in flight' on the wire between the two ends of the link at any single instant, and is the quantity a sender must be able to keep outstanding (using one-way delay) or, using RTT instead, the minimum unacknowledged data needed to keep the pipe continuously busy."
},
{
  id: "cn-basics-y4",
  q: "A message of 2,400,000 bits must be sent across 5 store-and-forward links, each of bandwidth 2 Mbps. The message is split into 6 equal-sized packets and pipelined across the links (ignore propagation and queueing delay). What is the total delivery time, in milliseconds? (Enter your numerical answer.)",
  options: [],
  answer: 2000,
  kind: "nat",
  marks: 2,
  difficulty: "medium",
  type: "numerical",
  explanation: "Each of the 6 packets carries L = 2,400,000 / 6 = 400,000 bits. Transmission delay per packet per link is Tt = L/R = 400,000 / (2 x 10^6) = 0.2 s = 200 ms. With h = 5 hops and n = 6 pipelined packets, the pipelining formula gives total time = (h + n - 1) x Tt = (5 + 6 - 1) x 200 ms = 10 x 200 ms = 2000 ms. The first packet takes 5 hop-times to cross all links, and because the remaining 5 packets are sent back-to-back, each adds exactly one more Tt slot at the final link, giving 5 + 5 = 10 total transmission slots."
},
{
  id: "cn-basics-y5",
  q: "A noiseless channel has a bandwidth of 3000 Hz and uses a signalling scheme with 8 discrete signal levels. Using the Nyquist formula, what is the maximum achievable data rate of this channel, in bits per second? (Enter your numerical answer.)",
  options: [],
  answer: 18000,
  kind: "nat",
  marks: 1,
  difficulty: "easy",
  type: "numerical",
  explanation: "The Nyquist capacity formula for a noiseless channel is C = 2B log2(M), where B is the bandwidth in Hz and M is the number of discrete signal levels. Here B = 3000 Hz and M = 8, so log2(8) = 3. Thus C = 2 x 3000 x 3 = 18,000 bits per second. This formula applies only in the absence of noise; a real (noisy) channel would instead be bounded by the Shannon capacity formula, which additionally accounts for the signal-to-noise ratio."
},
{
  id: "cn-basics-y6",
  q: "A noisy channel has a bandwidth of 4000 Hz and a signal-to-noise ratio (SNR) of 30 dB. Using Shannon's capacity formula, what is the channel's maximum theoretical data rate, in kbps? (Enter your numerical answer; a small tolerance is allowed since this involves a logarithm.)",
  options: [],
  answer: 39.87,
  kind: "nat",
  marks: 2,
  difficulty: "hard",
  type: "numerical",
  explanation: "First convert the SNR from decibels to a linear ratio: SNR(dB) = 10 log10(SNR_linear), so 30 = 10 log10(SNR_linear) gives SNR_linear = 10^3 = 1000. Shannon's capacity formula is C = B log2(1 + SNR_linear) = 4000 x log2(1001). Since log2(1001) = ln(1001)/ln(2) ≈ 6.9088/0.6931 ≈ 9.9676, C ≈ 4000 x 9.9676 ≈ 39,870 bits per second ≈ 39.87 kbps. A common error is plugging the SNR in decibels directly into log2(1 + SNR) without converting to the linear ratio first, which produces a drastically wrong (much smaller) capacity; because this involves an irrational logarithm, small rounding variation (roughly ±0.3 kbps) around 39.87 kbps should be accepted."
}
);
