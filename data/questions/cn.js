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
