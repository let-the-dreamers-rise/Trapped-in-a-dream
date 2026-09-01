window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.questions = window.GATE_DATA.questions || {};
window.GATE_DATA.questions['coa'] = {
  subject: 'Computer Organization & Architecture',
  topics: [
    {
      id: 'coa-instructions',
      name: 'Machine Instructions & Addressing Modes',
      theory: {
        intro: 'Every program a CPU runs is ultimately a stream of machine instructions, and this topic is about how those instructions are encoded and how they locate their operands. You will study instruction formats (how many bits go to the opcode, register fields and address fields), the classic addressing modes (immediate, direct, indirect, register, register indirect, displacement, indexed, relative, auto-increment and auto-decrement), and the expanding opcode technique that lets designers squeeze more instructions into a fixed word size. GATE loves this topic because it mixes short conceptual questions (identify the mode, count memory references) with clean bit-arithmetic problems (how many one-address instructions can still be encoded). Mastering it also builds the mental model of the fetch–decode–execute cycle that every later COA topic assumes, so treat it as the foundation of the whole subject rather than an isolated chapter.',
        core: 'An instruction typically contains an opcode plus zero or more operand specifiers. Architectures are classified by how many explicit addresses an instruction carries: three-address (ADD R1, R2, R3), two-address (ADD R1, R2 where R1 is both source and destination), one-address (accumulator machines: ADD X means AC = AC + M[X]) and zero-address (stack machines, where ADD pops two values and pushes the sum). Fewer addresses mean shorter instructions but longer programs, and GATE often asks you to count the instructions needed to evaluate an arithmetic expression on each style of machine.\n\nAddressing modes decide where an operand actually lives:\n\n• Immediate: the operand value is inside the instruction itself. Fast, needs no memory access for the operand, but the constant size is limited by the field width.\n• Register: the operand is in a CPU register; only the register number is encoded.\n• Direct (absolute): the instruction holds the memory address of the operand — one memory access to fetch the operand.\n• Memory indirect: the instruction holds the address of a location that in turn holds the address of the operand — two memory accesses.\n• Register indirect: a register holds the address of the operand — one memory access, and ideal for pointers.\n• Displacement / base / indexed: effective address = register contents + constant offset. Base addressing supports relocation; index addressing supports array traversal where the index register changes across iterations.\n• PC-relative: effective address = updated PC + signed offset. Crucial detail: the PC has already been incremented past the current instruction when the offset is added. This mode gives position-independent code and compact branch encodings.\n• Auto-increment / auto-decrement: register indirect access followed (or preceded) by adjusting the register by the operand size — perfect for stepping through arrays and implementing stacks.\n\nCounting memory references is a favourite question style: register and immediate modes need zero operand-memory accesses, direct and register-indirect need one, and memory-indirect needs two (plus the instruction fetch itself in all cases).\n\nExpanding (variable-length) opcodes exploit unused bit patterns. Suppose a 16-bit instruction has two 6-bit address fields, leaving 4 opcode bits. If only 14 of the 16 opcode patterns are used for two-address instructions, the remaining 2 patterns can each be extended into the next 6 bits, giving up to 2 × 64 = 128 one-address opcodes; leftover patterns there can expand again into zero-address instructions. The invariant to check in any such problem: the total number of distinct bit patterns consumed can never exceed 2^(instruction length). Work level by level — count the patterns reserved at each format, compute what remains, and multiply the remainder by 2^(bits of the next freed field).\n\nInstruction length itself is a design calculation: with I distinct opcodes you need ceil(log2 I) opcode bits, with R registers each register field needs ceil(log2 R) bits, and an instruction must be at least the sum of its fields (often rounded up to a byte or word multiple). Finally, remember the fetch–execute mechanics that questions quietly rely on: the PC is incremented during or right after fetch, the IR holds the fetched instruction, and effective-address computation happens before the operand fetch in the execute phase.',
        strategy: 'GATE patterns to expect: (1) expanding-opcode counting — appears again and again; always process formats from the most address fields to the fewest, and multiply leftover opcode patterns by 2^(freed bits); (2) PC-relative offset computation — the number one trap is forgetting that the offset is added to the already-incremented PC, so for a 4-byte instruction at address A the base is A + 4, not A; (3) identify-the-mode questions where "operand in the instruction" means immediate and "register holds the address" means register indirect; (4) memory-reference counting per mode; (5) minimum instruction width given register count and opcode count.\n\nWorked mini-example: a machine has 24-bit instructions and 10-bit memory addresses. Two-address instructions use 24 − 10 − 10 = 4 opcode bits, so 16 patterns exist. If 14 are used, 2 patterns remain; each expands across one freed 10-bit field, allowing 2 × 2^10 = 2048 one-address instructions at most.\n\nTraps to avoid: do not confuse indexed addressing (offset register varies, base constant) with base addressing (base register varies, offset constant) — GATE has asked exactly this distinction; in auto-increment mode the register changes by the operand size in bytes, not always by 1; and in stack-machine expression questions remember the final pop or store instruction when counting. Concept questions here are usually 1 mark and fast — bank these marks in under a minute each and spend the saved time on the numerical sets.'
      },
      questions: [
        {
          id: 'coa-instructions-q1',
          q: 'In which addressing mode is the operand itself contained within the instruction word?',
          options: ['Direct addressing', 'Immediate addressing', 'Register indirect addressing', 'Indexed addressing'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'In immediate addressing, the operand field of the instruction holds the actual data value, not an address. For example, MOV R1, #25 places the constant 25 directly into R1. No extra memory access is needed to fetch the operand, which makes it the fastest way to supply constants. Direct addressing instead stores the memory address of the operand, register indirect stores the address in a register, and indexed addressing computes the address as a register value plus an offset. All three of those require locating the operand somewhere outside the instruction, unlike immediate mode.'
        },
        {
          id: 'coa-instructions-q2',
          q: 'A processor executes LOAD R1, (R2), where the parentheses denote that R2 holds a memory address. Which addressing mode is used for the source operand?',
          options: ['Register addressing', 'Direct addressing', 'Register indirect addressing', 'Immediate addressing'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The source operand lives in memory, and its address is held in register R2. That is the definition of register indirect addressing: the instruction names a register, the register supplies the effective address, and one memory access fetches the operand. Register addressing would mean the operand value itself is in R2 (no memory access). Direct addressing would embed the memory address in the instruction word. Register indirect is the natural mode for pointer dereferencing in compiled code, which is why C pointer accesses typically translate to this mode.'
        },
        {
          id: 'coa-instructions-q3',
          q: 'A machine uses 16-bit instructions with two 6-bit address fields for its two-address instructions, leaving 4 bits for the opcode. If exactly 14 two-address instructions are defined, what is the maximum number of one-address instructions that can also be encoded using the expanding opcode scheme?',
          options: ['64', '128', '256', '2'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The 4-bit opcode gives 2^4 = 16 patterns. Two-address instructions consume 14 of them, leaving 16 − 14 = 2 unused patterns. Each unused pattern can expand into the next 6-bit field (one of the address fields becomes part of the opcode), so each of the 2 patterns yields 2^6 = 64 extended opcodes. Maximum one-address instructions = 2 × 64 = 128. The general rule: leftover opcode patterns × 2^(bits of the freed address field). The remaining single 6-bit field still serves as the one address of these instructions.'
        },
        {
          id: 'coa-instructions-q4',
          q: 'For evaluating the expression X = (A + B) * (C - D) on a zero-address (stack) machine using PUSH, POP, ADD, SUB and MUL, what is the minimum number of instructions required?',
          options: ['6', '7', '8', '9'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'A stack machine needs: PUSH A, PUSH B, ADD (pops A and B, pushes A+B), PUSH C, PUSH D, SUB (pushes C−D), MUL (pushes the product), POP X (stores the result). That is 8 instructions. The arithmetic operations carry no addresses — they implicitly use the top of stack — so every operand must first be pushed, and the final result must be explicitly popped to X. Counting traps: students often forget the final POP, answering 7, or miscount by treating SUB operand order; the operator instructions are 3 and the data movement instructions are 5, totalling 8.'
        },
        {
          id: 'coa-instructions-q5',
          q: 'A branch instruction is 4 bytes long and is stored at address 2000. The processor uses PC-relative addressing, adding the signed offset to the PC after it has been incremented past the instruction. What offset value must the instruction contain to branch to address 2056?',
          options: ['56', '52', '48', '60'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'After fetching the 4-byte instruction at 2000, the PC is incremented to 2000 + 4 = 2004. The branch target is computed as updated PC + offset, so offset = target − updated PC = 2056 − 2004 = 52. The classic trap is computing 2056 − 2000 = 56, which ignores the PC increment. Always confirm from the question when the offset is applied: in almost all GATE problems (and real pipelines) the PC already points to the next sequential instruction by the time the branch adds its displacement.'
        },
        {
          id: 'coa-instructions-q6',
          q: 'Which addressing mode requires the maximum number of memory accesses to fetch a single operand (not counting the instruction fetch itself)?',
          options: ['Register indirect', 'Direct', 'Memory indirect', 'Immediate'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Memory indirect addressing needs two memory accesses: the first reads the pointer location named by the instruction, and the second uses that fetched address to read the actual operand. Direct and register indirect each need exactly one operand access, since the effective address is available immediately (from the instruction or from a register respectively). Immediate needs zero, because the operand is inside the instruction word. This access-count comparison is a recurring 1-mark GATE question, sometimes phrased as ranking the modes by speed — immediate fastest, memory indirect slowest.'
        },
        {
          id: 'coa-instructions-q7',
          q: 'A relocatable program is loaded at different memory locations in different runs without modifying its branch instructions. Which addressing mode for branches makes this possible?',
          options: ['Absolute (direct) addressing', 'PC-relative addressing', 'Memory indirect addressing', 'Immediate addressing'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'PC-relative addressing encodes a branch target as a signed distance from the current instruction rather than as a fixed address. If the whole program shifts to a new load address, every instruction and its target shift by the same amount, so the relative distance is unchanged and the code runs correctly without relocation fix-ups. This is the basis of position-independent code. Absolute addressing would require patching every branch target at load time. Memory indirect could work through a relocated table but needs extra accesses and setup, and immediate mode supplies data constants, not branch targets, in this context.'
        },
        {
          id: 'coa-instructions-q8',
          q: 'An instruction set must support 45 distinct operations, and the processor has 64 general-purpose registers. For a three-register instruction format (one opcode field plus three register fields) with no other fields, what is the minimum instruction width in bits?',
          options: ['21', '24', '18', '27'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Opcode field: 45 operations need ceil(log2 45) = 6 bits, since 2^5 = 32 is insufficient and 2^6 = 64 suffices. Register fields: 64 registers need log2 64 = 6 bits each, and three fields need 18 bits. Minimum width = 6 + 18 = 24 bits. Note the question asks the minimum with exactly these fields — some variants then round up to a power of two or a byte multiple, but here 24 is already a byte multiple. The common error is using 5 bits for the opcode by computing log2 45 as about 5.49 and truncating instead of taking the ceiling.'
        },
        {
          id: 'coa-instructions-q9',
          q: 'In auto-increment addressing on a byte-addressable machine, the instruction LOAD R1, (R2)+ fetches a 4-byte word. If R2 initially contains 3000, what are the values loaded into R1 and left in R2 after execution?',
          options: ['R1 = M[3000..3003], R2 = 3001', 'R1 = M[3000..3003], R2 = 3004', 'R1 = M[3004..3007], R2 = 3004', 'R1 = M[3000..3003], R2 = 3000'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Auto-increment mode first uses the register as the effective address, then increments it by the size of the operand. R2 = 3000 is used to fetch the 4-byte word occupying addresses 3000 through 3003 into R1. Afterwards R2 is incremented by the operand size, 4 bytes, becoming 3004 — not 3001, which would only be correct for a 1-byte operand. Option 3 describes auto-pre-increment semantics (increment before use), which is not the standard (R2)+ notation. This mode makes sequential array scans a single instruction per element.'
        },
        {
          id: 'coa-instructions-q10',
          q: 'A processor has 32-bit instructions with two 12-bit address fields, so two-address instructions carry an 8-bit opcode. The design defines 250 two-address instructions and 24000 one-address instructions using expanding opcodes. What is the maximum number of zero-address instructions that can still be encoded?',
          options: ['576', '4096', '2359296', '147456'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Level 1: the 8-bit opcode has 2^8 = 256 patterns; 250 are used, leaving 6. Level 2: each leftover pattern expands into a freed 12-bit field, giving 6 × 2^12 = 24576 possible one-address opcodes; 24000 are used, leaving 24576 − 24000 = 576. Level 3: each of these 576 patterns expands into the last 12-bit field, giving 576 × 2^12 = 576 × 4096 = 2359296 zero-address instructions. The trap is stopping at 576 (the leftover count) without multiplying by 4096 for the final freed field, or multiplying leftover counts incorrectly across levels.'
        },
        {
          id: 'coa-instructions-q11',
          q: 'Which statement correctly distinguishes base-register addressing from indexed addressing?',
          options: ['They are identical in both usage and mechanism', 'In base addressing the register provides a relocatable starting address and the constant is an offset within it; in indexed addressing the constant is a starting address and the register supplies a varying index', 'Base addressing needs two memory accesses while indexed needs one', 'Indexed addressing cannot be used for arrays'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Both modes compute effective address = register + constant, but the roles differ. In base-register addressing, the register holds a base address (for example, the start of a process segment, changed by the OS for relocation) and the instruction constant is a fixed displacement within that region. In indexed addressing, the instruction constant is the fixed starting address (say, of an array) and the register holds an index that the program varies across loop iterations. Mechanically identical, semantically opposite — and GATE has asked precisely this role reversal. Both need one operand memory access, and indexed mode is the classic array-access mode.'
        },
        {
          id: 'coa-instructions-q12',
          q: 'A single-accumulator (one-address) machine supports LOAD X, STORE X, ADD X, SUB X and MUL X, each combining memory operand X with the accumulator. What is the minimum number of instructions to compute Y = A*B + C*D, given that intermediate results may be stored in a temporary memory location T?',
          options: ['6', '7', '8', '9'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'The two products must be formed one after the other because there is only one accumulator. Sequence: (1) LOAD A puts A in the accumulator; (2) MUL B makes AC = A*B; (3) STORE T saves the first product, since the accumulator must be freed; (4) LOAD C; (5) MUL D makes AC = C*D; (6) ADD T makes AC = A*B + C*D; (7) STORE Y writes the result. Total = 7 instructions. The STORE T cannot be eliminated: with a single accumulator, every independent sub-expression after the first forces a spill to memory. Six instructions would need a second accumulator or a three-address ISA, and eight would mean an unnecessary reload.'
        },
        {
          id: 'coa-instructions-q13',
          q: 'During the instruction fetch phase of the instruction cycle, which register receives the instruction read from memory, and what happens to the program counter?',
          options: ['The MAR receives the instruction; PC is cleared', 'The IR receives the instruction; PC is incremented to point to the next instruction', 'The accumulator receives the instruction; PC is unchanged', 'The IR receives the instruction; PC is decremented'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'In the fetch phase, the PC value is copied into the MAR, memory is read, and the fetched instruction word arrives (via the MDR/MBR) in the Instruction Register (IR), where the decoder examines its opcode. In the same phase, the PC is incremented by the instruction size so it points at the next sequential instruction. This updated PC is exactly the base used by PC-relative addressing later in the cycle. The MAR only ever holds addresses, never instructions, and the accumulator is a data register uninvolved in fetching. The PC is never cleared or decremented during a normal fetch.'
        },
        {
          id: 'coa-instructions-q14',
          q: 'A 32-bit instruction format allocates a 6-bit opcode, one 5-bit destination register field, one 5-bit source register field, and uses all remaining bits as a signed immediate constant. What is the range of the immediate value?',
          options: ['-32768 to +32767', '-65536 to +65535', '0 to 65535', '-16384 to +16383'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Bits remaining for the immediate = 32 − 6 − 5 − 5 = 16 bits. A signed 16-bit field in two\'s complement represents values from −2^15 to +2^15 − 1, i.e. −32768 to +32767. Option 3 (0 to 65535) would be correct only for an unsigned field, and option 2 wrongly uses 2^16 as the magnitude on both sides, which no two\'s complement field provides. This mirrors real MIPS I-format encoding. Always: first subtract all named fields from the instruction width, then apply the signed range formula −2^(n−1) to 2^(n−1) − 1.'
        }
      ]
    },
    {
      id: 'coa-datapath',
      name: 'ALU, Datapath & Control Unit',
      theory: {
        intro: 'The datapath is the collection of hardware that actually moves and transforms data — registers, buses, multiplexers, the register file and the ALU — while the control unit is the circuitry that tells every one of those components what to do in each clock cycle. This topic covers how an ALU computes arithmetic and logic results (and sets flags like carry, zero, sign and overflow), how a single-cycle datapath executes an entire instruction per clock, and the two philosophies for building control: hardwired (a finite state machine of gates) and microprogrammed (a control memory full of microinstructions). GATE questions here are a mix of concept checks (which control style is faster, what a microinstruction contains) and tidy calculations (control word width under horizontal versus vertical encoding, clock period of a single-cycle machine, CPI of a multi-cycle design). It rewards precise bookkeeping of bits and cycles.',
        core: 'The ALU performs add, subtract, AND, OR, XOR, shifts and comparisons, and produces status flags. For two\'s complement addition, overflow occurs when the carry into the sign bit differs from the carry out of it — equivalently, when two operands of the same sign produce a result of the opposite sign. The zero flag is the NOR of all result bits, and the sign flag is simply the MSB.\n\nA single-cycle datapath executes every instruction in exactly one clock period, so the clock must be long enough for the slowest instruction — usually the load, which passes through instruction fetch, register read, ALU address computation, data-memory access and register write-back. The clock period is the sum of the delays along that longest path, which is why single-cycle designs waste time on fast instructions. A multi-cycle design breaks execution into steps of one short cycle each (the cycle equals the slowest single step), letting different instructions take different numbers of cycles; its cost is a higher CPI, and comparing single-cycle versus multi-cycle total time is a standard exam exercise.\n\nControl signals steer the datapath: register-file read/write selects and write enable, ALU operation select, multiplexer selects, and memory read/write. A register file with 2^n registers needs n bits per port select; two read ports and one write port therefore need 3n select bits plus a write-enable.\n\n• Hardwired control: a combinational circuit plus a state register generates control signals directly from the opcode, step counter and flags. It is fast (just gate delays) but rigid — changing the instruction set means redesigning logic. RISC processors favour it.\n• Microprogrammed control: each machine instruction is executed by a sequence of microinstructions (a microroutine) stored in control memory. A microprogram counter steps through them, and a sequencer chooses the next microinstruction address, possibly based on condition flags. It is slower (every step is a control-memory read) but flexible — new instructions are added by writing microcode. CISC processors historically used it.\n\nMicroinstruction encoding is the big numerical area. In horizontal microprogramming, each control signal gets its own bit: wide words, maximum parallelism, no decoding delay. In vertical microprogramming, signals are grouped and encoded: if a group of k mutually exclusive signals may also be all-inactive, it needs ceil(log2(k+1)) bits, decoded before use — narrower words but serialized signal activation and decoder delay. A microinstruction generally holds the control field, a condition-select field for branching, and a next-address field of ceil(log2 W) bits for a control memory of W words. Control memory size = number of microinstructions × microinstruction width.\n\nTwo timing facts anchor most calculations: hardwired control produces signals within one machine cycle with only combinational delay, whereas a microprogrammed machine spends one control-memory access per microinstruction, so an instruction needing m microinstructions costs at least m control-memory reads. Multi-cycle CPI is computed as a weighted average over the instruction mix, and total execution time = instruction count × CPI × cycle time — the fundamental performance equation used across all of COA.',
        strategy: 'GATE favourites: (1) control word width — count horizontal bits as one per signal, and vertical bits as the sum over groups of ceil(log2(k+1)), remembering the +1 for the no-signal-active case unless the question says one signal is always active; (2) control memory sizing — words × (control bits + branch-condition bits + next-address bits); (3) single-cycle clock period = sum of worst-case path delays, versus pipelined or multi-cycle period = the maximum stage delay; (4) CPI-weighted comparisons of single-cycle and multi-cycle machines; (5) hardwired versus microprogrammed trade-off statements.\n\nWorked mini-example: 46 control signals fall into four mutually exclusive groups of 7, 6, 3 and 15 (a signal from at most one option per group active at a time, possibly none). Vertical encoding needs ceil(log2 8) + ceil(log2 7) + ceil(log2 4) + ceil(log2 16) = 3 + 3 + 2 + 4 = 12 bits, against 31 bits horizontally for those groups.\n\nTraps: forgetting the all-zero (inactive) combination in vertical encoding, using the sum instead of the maximum for a multi-cycle clock, and assuming microprogrammed control is faster because it sounds sophisticated — it is slower per signal but easier to modify. Also watch overflow questions: overflow is meaningful only for signed arithmetic, and carry-out alone does not imply it. When comparing designs, always compute total time for the same program, never compare CPI or clock alone.'
      },
      questions: [
        {
          id: 'coa-datapath-q1',
          q: 'Which of the following is TRUE when comparing hardwired control with microprogrammed control?',
          options: ['Hardwired control is generally faster but harder to modify', 'Microprogrammed control is faster because it uses memory', 'Hardwired control stores control words in a control memory', 'Microprogrammed control cannot implement complex instructions'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Hardwired control generates signals through combinational logic and a state machine, so signals appear after only gate delays — fast, but any instruction-set change requires redesigning the circuit. Microprogrammed control stores control words in a control memory and reads one per step, adding a memory access to every microoperation — slower, but new or complex instructions are added simply by writing more microcode, which is exactly why CISC machines used it. Option 3 reverses the definitions, and option 4 is backwards: microprogramming is especially suited to complex multi-step instructions.'
        },
        {
          id: 'coa-datapath-q2',
          q: 'In a microprogrammed control unit, a microinstruction is fetched from which of the following?',
          options: ['Main memory', 'The instruction cache', 'Control memory (control store)', 'The register file'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Microinstructions live in a dedicated, fast memory inside the control unit called the control memory or control store, addressed by the microprogram counter (micro-PC) and stepped by the microprogram sequencer. It is entirely separate from main memory, which holds machine instructions and data. Machine instructions are fetched from main memory (through the instruction cache), decoded, and the opcode is mapped to the starting address of the corresponding microroutine in the control store. Each control-store word then drives the datapath control signals for one micro-step. The register file holds operand data, never control words.'
        },
        {
          id: 'coa-datapath-q3',
          q: 'A CPU has 31 control signals divided into four groups of mutually exclusive signals: 7, 6, 3 and 15 signals. In each group at most one signal is active in any cycle, and a group may also have no active signal. Using vertical microprogramming with a separate encoded field per group, how many control bits does each microinstruction need?',
          options: ['31', '12', '10', '15'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Each group must encode its k signals plus the extra none-active state, so it needs ceil(log2(k+1)) bits. Group of 7: ceil(log2 8) = 3 bits. Group of 6: ceil(log2 7) = 3 bits. Group of 3: ceil(log2 4) = 2 bits. Group of 15: ceil(log2 16) = 4 bits. Total = 3 + 3 + 2 + 4 = 12 bits, versus 31 bits for a fully horizontal design. The classic trap is dropping the +1 and computing ceil(log2 15) = 4 but ceil(log2 3) = 2 correctly by luck — always add the inactive state unless the question states one signal is compulsorily active.'
        },
        {
          id: 'coa-datapath-q4',
          q: 'A single-cycle processor has these functional delays: instruction fetch 200 ps, register read 100 ps, ALU 150 ps, data memory access 200 ps, register write-back 100 ps. Every instruction completes in one clock cycle. What is the minimum clock period?',
          options: ['200 ps', '400 ps', '750 ps', '550 ps'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'In a single-cycle design the clock period must accommodate the slowest instruction, which traverses the longest path. The load instruction uses every unit in sequence: fetch (200) + register read (100) + ALU address calculation (150) + data memory (200) + write-back (100) = 750 ps. So the minimum clock period is 750 ps, even though an ALU instruction needing only 550 ps or a branch needing less will idle for the remainder. This waste is precisely the motivation for multi-cycle and pipelined designs, where the cycle time is set by the maximum single-stage delay (here 200 ps) rather than the sum.'
        },
        {
          id: 'coa-datapath-q5',
          q: 'For addition of two n-bit two\'s complement numbers, signed overflow is detected when:',
          options: ['The carry out of the most significant bit is 1', 'The carry into the sign bit differs from the carry out of the sign bit', 'The result is negative', 'Both operands are negative'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Two\'s complement overflow occurs exactly when the carry entering the sign (MSB) position differs from the carry leaving it — the ALU computes V = Cin(MSB) XOR Cout(MSB). Equivalently, overflow happens only when both operands share the same sign and the result has the opposite sign. Carry out alone (option 1) indicates unsigned overflow, not signed: for example, adding −1 and −1 produces a carry out but the correct result −2. A negative result (option 3) is perfectly normal, and adding two negative numbers (option 4) overflows only if the sum is too negative to represent.'
        },
        {
          id: 'coa-datapath-q6',
          q: 'A control memory holds 2048 microinstructions. Each microinstruction contains 26 control signal bits, a 4-bit condition-select field, and a next-address field large enough to address any microinstruction. What is the width of one microinstruction in bits?',
          options: ['30', '41', '37', '26'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The next-address field must address all 2048 = 2^11 control memory locations, so it needs 11 bits. Microinstruction width = control bits + condition-select bits + next-address bits = 26 + 4 + 11 = 41 bits. Total control memory capacity would be 2048 × 41 = 83968 bits. The frequent slip is forgetting the next-address field entirely (getting 30) or sizing it from the machine\'s main-memory address width instead of the control-store depth — the sequencer only ever addresses the control store, so log2(number of microinstructions) is the correct field size.'
        },
        {
          id: 'coa-datapath-q7',
          q: 'The main role of the microprogram sequencer in a microprogrammed control unit is to:',
          options: ['Decode machine instructions into assembly form', 'Determine the address of the next microinstruction to execute', 'Perform arithmetic on operands', 'Refresh the control memory periodically'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The sequencer decides where control flow in the microprogram goes next. Its choices each cycle typically include: increment the micro-PC (sequential microinstruction), branch to the address in the current microinstruction\'s next-address field (possibly conditioned on ALU flags via the condition-select field), or load the starting address of a microroutine obtained by mapping the opcode of a newly fetched machine instruction. It performs no data arithmetic — that is the ALU\'s job — and control memory is typically ROM or SRAM needing no refresh. Machine instruction decoding to assembly text is a software notion, not hardware.'
        },
        {
          id: 'coa-datapath-q8',
          q: 'A register file has 32 registers, two read ports and one write port. How many bits of control input does it require per cycle for port selection plus write enable?',
          options: ['15', '16', '11', '6'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Selecting one of 32 registers needs log2 32 = 5 bits. There are three ports to select independently — two read ports and one write port — needing 3 × 5 = 15 select bits. The write port additionally needs a 1-bit write-enable signal so that instructions which do not write a register (stores, branches) can disable the write. Total = 15 + 1 = 16 bits. Reading is usually harmless and needs no enable in this model. Answering 15 forgets the enable; answering 11 wrongly shares a single select across ports, which would prevent reading two different source registers simultaneously.'
        },
        {
          id: 'coa-datapath-q9',
          q: 'A multi-cycle processor has a 200 ps clock, with instruction cycle counts: load 5, store 4, ALU 4, branch 3. The instruction mix is 25% loads, 10% stores, 45% ALU and 20% branches. A single-cycle version of the same datapath needs a 750 ps clock. Which design executes a program faster, and what is the multi-cycle average time per instruction?',
          options: ['Multi-cycle; 810 ps per instruction', 'Single-cycle, because 750 ps is less than the multi-cycle average of 810 ps', 'Multi-cycle, because its clock is shorter', 'Both take exactly the same time'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Multi-cycle CPI = 0.25×5 + 0.10×4 + 0.45×4 + 0.20×3 = 1.25 + 0.40 + 1.80 + 0.60 = 4.05 cycles. Average time per instruction = 4.05 × 200 ps = 810 ps. The single-cycle machine takes exactly 750 ps for every instruction. Since 750 < 810, the single-cycle design is faster for this mix, despite its long clock. The lesson GATE tests: a shorter clock does not guarantee better performance — you must compare instruction time = CPI × cycle time. Multi-cycle wins only when enough instructions use few cycles to pull the weighted average below the single-cycle period.'
        },
        {
          id: 'coa-datapath-q10',
          q: 'In horizontal microprogramming, compared with vertical microprogramming:',
          options: ['Microinstructions are narrower and need decoders', 'Microinstructions are wider and can activate many signals in parallel without decoding', 'The control memory is always smaller in total bits', 'Signal activation requires two control memory reads'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Horizontal microprogramming dedicates one bit per control signal, so words are wide, but any combination of signals can be asserted simultaneously and no decoding logic sits between the control store output and the datapath — maximum parallelism and speed. Vertical microprogramming encodes groups of mutually exclusive signals into short fields, giving narrow words but requiring decoders (adding delay) and permitting only one signal per group per cycle. Option 1 describes vertical encoding. Option 3 is generally false for horizontal (wider words usually mean more total bits). Each microinstruction is fetched with one control-memory read in both schemes, so option 4 is wrong.'
        },
        {
          id: 'coa-datapath-q11',
          q: 'In a microprogrammed CPU, each machine instruction is interpreted by an average of 6 microinstructions, and each control memory access takes 20 ns. Ignoring all other delays, what is the average time to execute one machine instruction?',
          options: ['20 ns', '26 ns', '120 ns', '60 ns'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Every microinstruction requires one control-memory read before its signals can drive the datapath, so 6 microinstructions per machine instruction cost 6 × 20 ns = 120 ns. This calculation exposes the fundamental overhead of microprogrammed control: even if the datapath operations were instantaneous, the control store imposes one access per micro-step. A hardwired unit generating the same 6 steps would pay only combinational logic delay per step, typically far less than a memory access. This is why performance-critical RISC designs abandoned microcode for hardwired control, keeping microcode only for rare complex operations.'
        },
        {
          id: 'coa-datapath-q12',
          q: 'Two 8-bit two\'s complement numbers 0110 1100 and 0101 0001 are added. What are the resulting overflow (V) and carry (C) flags?',
          options: ['V = 0, C = 0', 'V = 1, C = 0', 'V = 0, C = 1', 'V = 1, C = 1'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Compute: 0110 1100 (decimal 108) + 0101 0001 (decimal 81) = 1011 1101. The true sum is 189, but the 8-bit signed range is −128 to +127, and the result pattern 1011 1101 reads as a negative number (−67): two positive operands produced a negative result, so V = 1. The carry out of bit 7 is 0 (108 + 81 = 189 < 256), so C = 0. Check with the carry rule: carry into the sign bit is 1 (from adding the lower 7 bits: 108 and 81 have low-7-bit sums exceeding 127), carry out is 0, and 1 XOR 0 = 1 confirms overflow. Carry and overflow are independent flags for unsigned and signed interpretations respectively.'
        },
        {
          id: 'coa-datapath-q13',
          q: 'Which statement about a single-bus CPU organization (one internal bus connecting all registers and the ALU) is correct?',
          options: ['Any number of register transfers can occur in one clock cycle', 'Only one register can drive the bus at a time, so multi-operand operations need multiple cycles and temporary registers', 'It eliminates the need for multiplexers and tri-state buffers', 'The ALU can read both operands from the bus simultaneously'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'With a single internal bus, exactly one source may drive the bus in any cycle (enforced by tri-state buffers or a multiplexer), and one or more destinations may latch from it. An operation like R3 = R1 + R2 therefore takes several cycles: move R1 into a temporary latch (often called Y) at one ALU input, then place R2 on the bus into the other ALU input, then transfer the ALU output (via register Z) to R3. Two- and three-bus organizations reduce the cycle count by moving operands in parallel. Options 1, 3 and 4 all contradict the single-driver constraint.'
        },
        {
          id: 'coa-datapath-q14',
          q: 'A hardwired control unit for a multi-cycle processor is designed as a finite state machine with 20 distinct states. The state register feeds combinational logic together with the 6-bit opcode. What is the minimum number of flip-flops needed for the state register?',
          options: ['20', '5', '6', '4'],
          answer: 1,
          marks: 2,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'With binary state encoding, n flip-flops can represent 2^n states, so 20 states need ceil(log2 20) = 5 flip-flops (2^4 = 16 is too few, 2^5 = 32 suffices). The combinational next-state logic takes these 5 state bits plus the opcode bits and condition flags to produce both the next state and the control signals — this is exactly how hardwired control implements the multi-cycle steps. Answering 20 corresponds to one-hot encoding, which is a valid design choice but not the minimum; the question asks for the fewest flip-flops, which binary encoding achieves.'
        }
      ]
    },
    {
      id: 'coa-pipelining',
      name: 'Pipelining, Hazards & Speedup',
      theory: {
        intro: 'Pipelining overlaps the execution of consecutive instructions the way an assembly line overlaps car production: while one instruction is being decoded, the next is being fetched. The classic five-stage RISC pipeline (IF, ID, EX, MEM, WB) can in the ideal case complete one instruction per clock, multiplying throughput by nearly the number of stages. This topic covers the timing arithmetic — cycle time from stage delays and latch overhead, completion time for n instructions, speedup and efficiency — and then the reasons reality falls short: structural hazards (resource conflicts), data hazards (an instruction needs a result that is not ready), and control hazards (branches change the instruction stream). You will learn the fixes: forwarding, stalls, delayed branches and branch prediction. Pipelining is arguably the single most reliable source of numerical questions in GATE COA, appearing in some form nearly every year, so fluency with its formulas pays directly.',
        core: 'Timing fundamentals. If a k-stage pipeline has stage delays t1..tk and an inter-stage latch (register) delay d, the clock period is max(ti) + d — the slowest stage sets the pace. Executing n instructions with no stalls takes (k + n − 1) cycles: k cycles for the first instruction to fill the pipe, then one completion per cycle. Total time = (k + n − 1) × cycle time. The non-pipelined equivalent takes n × (sum of ti), so speedup = non-pipelined time / pipelined time, which approaches (sum of ti) / (max ti + d) for large n — at best k when stages are perfectly balanced and latches are free.\n\nHazards reduce this ideal:\n\n• Structural hazards arise when two instructions need the same hardware in the same cycle — the textbook case is a single memory port shared by instruction fetch and data access. Fix: duplicate resources (separate I-cache and D-cache) or stall.\n• Data hazards occur when instructions are too close for a needed value to be ready. RAW (read after write) is the true dependency and the only kind possible in a simple in-order pipeline; WAR and WAW arise with out-of-order or multi-issue execution. Operand forwarding (bypassing) routes a result straight from the ALU or MEM output to a following instruction\'s input, removing most stalls; a load followed immediately by a dependent instruction still needs one bubble even with forwarding (the load-use hazard). Without forwarding, if registers are written in the first half of a cycle and read in the second half, a dependent instruction stalls until the producer\'s WB overlaps its ID — typically 2 stall cycles in a 5-stage pipe with split-phase access, 3 without it.\n• Control hazards come from branches: instructions after a branch are fetched before the outcome is known. If the branch resolves at the end of stage b, the penalty on a taken branch is b − 1 flushed cycles. Mitigations: resolve branches earlier (dedicated comparator in ID), delayed branching (the compiler fills the delay slot with a useful instruction that executes regardless), and branch prediction, where only mispredictions pay the flush penalty.\n\nEffective CPI with stalls: CPI = 1 + (stall cycles per instruction). For example, with 20% branches of which half cause a 2-cycle penalty, CPI = 1 + 0.2 × 0.5 × 2 = 1.2. Speedup of the pipelined machine over the ideal then scales down by this factor: real speedup = k / CPI for balanced stages.\n\nTwo comparison patterns recur. First, redesigns: splitting the slowest stage shortens the cycle to the new maximum; speedup for large n is old max / new max. Second, deeper pipelines: more stages raise the ideal throughput but also raise branch penalties and latch overhead, so a mix-weighted execution-time comparison decides the winner. Always compute total execution time — never compare stage counts or frequencies alone. Frequency itself is 1 / cycle time; converting picoseconds to gigahertz correctly (1 ns cycle = 1 GHz) is a small but real source of exam errors.',
        strategy: 'Formulas to have cold: cycle = max stage delay + latch; time for n instructions = (k + n − 1) × cycle; speedup = n × (sum of stages) / [(k + n − 1) × cycle]; CPI = 1 + average stalls; penalty of a branch resolved in stage b = b − 1.\n\nWorked mini-example: stages of 150, 120, 160 and 140 ps with 5 ps latches give a 165 ps cycle; the non-pipelined machine takes 570 ps per instruction, so asymptotic speedup = 570 / 165 ≈ 3.45, not 4 — latch overhead and imbalance always shave the ideal.\n\nGATE patterns: completion time for a short instruction sequence with a stated dependency (draw the cycle-by-cycle chart — it takes 60 seconds and prevents every off-by-one error); counting stalls with and without forwarding; register write/read half-cycle assumptions (read the question wording with care, since it changes stall counts by one); branch-penalty CPI; comparing two pipeline designs on a given instruction mix; splitting a stage and recomputing speedup.\n\nTraps: using the sum of stage delays as the pipelined cycle; forgetting the k − 1 fill cycles; applying branch penalty to all branches when only taken or mispredicted ones pay it; assuming forwarding removes the load-use bubble (it does not); and mixing units when converting cycle time to frequency. For any dependency question, the timing chart is your safety net — always sketch it for sequences of five instructions or fewer.'
      },
      questions: [
        {
          id: 'coa-pipelining-q1',
          q: 'For an ideal k-stage pipeline with perfectly balanced stages, no stalls, and negligible latch delay, the maximum speedup over a non-pipelined implementation for a very large number of instructions approaches:',
          options: ['k', 'k - 1', '2k', 'n, the number of instructions'],
          answer: 0,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'The non-pipelined machine takes n × k × t time for n instructions when each of the k balanced stages needs time t. The pipeline takes (k + n − 1) × t. Speedup = nk / (k + n − 1), and as n grows the k − 1 fill term becomes negligible, so speedup approaches k. Intuitively, once the pipe is full it finishes one instruction per stage-time instead of one per k stage-times. In practice, latch overhead, imbalanced stages and hazards keep the real speedup below the number of stages — a fact several conceptual GATE questions have tested.'
        },
        {
          id: 'coa-pipelining-q2',
          q: 'An instruction attempts to read a register that a previous, still-incomplete instruction is going to write. This situation is classified as a:',
          options: ['Structural hazard', 'RAW data hazard', 'WAR data hazard', 'Control hazard'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Read-after-write (RAW) is the true data dependency: the consumer must wait for the producer\'s result. In a 5-stage in-order pipeline this is the only data hazard that can actually occur, because writes happen in order and reads never move ahead of earlier writes to the same register in a way that reverses them. WAR (write before an earlier read completes) and WAW (writes finishing out of order) become possible only with out-of-order or multi-issue execution — they are name dependencies removable by register renaming. Structural hazards are resource conflicts, and control hazards involve branches, neither of which describes this scenario.'
        },
        {
          id: 'coa-pipelining-q3',
          q: 'A 5-stage pipeline has a 2 ns clock cycle. With no stalls, how long does it take to execute a program of 100 instructions?',
          options: ['200 ns', '208 ns', '1000 ns', '210 ns'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Total cycles for n instructions on a k-stage stall-free pipeline = k + n − 1. The first instruction needs all 5 stages (5 cycles), after which one instruction completes every cycle, adding n − 1 = 99 cycles. Cycles = 5 + 100 − 1 = 104. Time = 104 × 2 ns = 208 ns. Answering 200 ns forgets the 4 pipeline-fill cycles, and 1000 ns is the non-pipelined time (100 × 5 × 2). The k − 1 fill correction matters most for short programs and is a deliberate distractor in nearly every version of this question.'
        },
        {
          id: 'coa-pipelining-q4',
          q: 'A 4-stage pipeline has stage delays 150, 120, 160 and 140 ps, and each inter-stage buffer adds 5 ps. What is the asymptotic speedup over a non-pipelined version of the same hardware (which needs no buffers) for a very long instruction stream?',
          options: ['4.00', '3.45', '3.56', '2.87'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Pipeline cycle time = max stage delay + buffer delay = 160 + 5 = 165 ps. Non-pipelined execution time per instruction = 150 + 120 + 160 + 140 = 570 ps. For large n, pipelined time per instruction approaches one cycle, so speedup = 570 / 165 = 3.4545 ≈ 3.45. Note it is well below the stage count 4 for two reasons: the stages are imbalanced (the 160 ps stage sets the pace while others idle) and the buffers add overhead to every cycle. Using the sum 570 + 20 or dividing 570 by 160 are the standard wrong turns.'
        },
        {
          id: 'coa-pipelining-q5',
          q: 'In a pipelined processor, 20% of instructions are branches. Half of the branches are taken, and each taken branch incurs a 2-cycle penalty; not-taken branches proceed without penalty. All other instructions execute with CPI 1. What is the effective CPI?',
          options: ['1.0', '1.1', '1.2', '1.4'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Effective CPI = base CPI + average stall cycles per instruction. Only taken branches stall: the fraction of all instructions that are taken branches is 0.20 × 0.5 = 0.10, and each costs 2 extra cycles. Average stalls = 0.10 × 2 = 0.2. Effective CPI = 1 + 0.2 = 1.2. A common error is charging the 2-cycle penalty to all branches (giving 1.4) — read carefully whether the penalty applies to all branches, taken branches only, or mispredicted branches only, because GATE varies this wording deliberately across years.'
        },
        {
          id: 'coa-pipelining-q6',
          q: 'Consider a 5-stage pipeline (IF ID EX MEM WB) without operand forwarding. Register writes occur in the first half of WB and register reads in the second half of ID, so a write and read in the same cycle succeed. The sequence is: I1: ADD R1,R2,R3; I2: SUB R4,R1,R5; I3: OR R6,R7,R8; I4: AND R9,R6,R2. How many clock cycles does the sequence take?',
          options: ['8', '10', '12', '14'],
          answer: 2,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Base cycles without stalls = k + n − 1 = 5 + 4 − 1 = 8. I2 reads R1 in ID and must wait until I1\'s WB overlaps its ID (the split-phase rule allows same-cycle write-then-read): I1 is in WB in cycle 5, so I2\'s ID must be in cycle 5 instead of cycle 3 — a 2-cycle stall. I4 similarly depends on R6 produced by I3 and stalls 2 cycles (its ID must align with I3\'s WB; I3 was itself pushed back by I2\'s stall). Each immediate RAW dependency without forwarding costs 2 bubbles here. Total = 8 + 2 + 2 = 12 cycles. Drawing the timing chart confirms I4 finishes WB in cycle 12.'
        },
        {
          id: 'coa-pipelining-q7',
          q: 'In a pipelined processor, conditional branches are resolved at the end of the third stage. Instructions after the branch are fetched sequentially and squashed if the branch is taken. What is the branch penalty (wasted cycles) for a taken branch?',
          options: ['1', '2', '3', '0'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'While the branch occupies stages 1, 2 and 3, the pipeline fetches the next two sequential instructions behind it (one enters in each of the two cycles after the branch\'s fetch). When the branch resolves as taken at the end of stage 3, those two wrongly fetched instructions are squashed and the target is fetched next — 2 cycles of work are discarded. The general rule: if the outcome is known at the end of stage b, the taken-branch penalty is b − 1 cycles. Moving branch resolution earlier (say a comparator in stage 2) directly reduces this penalty to b − 1 = 1.'
        },
        {
          id: 'coa-pipelining-q8',
          q: 'A pipelined CPU with a unified single-port memory for both instructions and data suffers a hazard whenever a load or store overlaps an instruction fetch. This is an example of a:',
          options: ['Data hazard', 'Control hazard', 'Structural hazard', 'Page fault'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A structural hazard exists when two pipeline stages need the same hardware resource in the same cycle. Here the MEM stage of a load/store and the IF stage of a younger instruction both need the single memory port, so one must stall. The standard remedy is separate instruction and data caches (a Harvard-style split at the L1 level), giving each stage its own port; duplicating or multi-porting the resource always removes structural hazards at hardware cost. Data hazards involve operand values, and control hazards involve branch outcomes — neither is a resource conflict. A page fault is an exception, not a pipeline hazard class.'
        },
        {
          id: 'coa-pipelining-q9',
          q: 'A processor uses branch prediction with 80% accuracy. Branches are 25% of all instructions, and each misprediction costs 3 cycles. Non-branch instructions and correctly predicted branches take 1 cycle. What is the effective CPI?',
          options: ['1.60', '1.15', '1.25', '1.75'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Only mispredicted branches pay the penalty. Fraction of instructions that are mispredicted branches = 0.25 × (1 − 0.80) = 0.25 × 0.20 = 0.05. Each adds 3 stall cycles, so average stalls per instruction = 0.05 × 3 = 0.15. Effective CPI = 1 + 0.15 = 1.15. Charging all branches 3 cycles gives the distractor 1.75, and charging correctly predicted branches some cost gives other wrong values. This is the standard prediction model: penalty × branch fraction × misprediction rate — worth memorizing as a single expression since GATE reuses it with different numbers frequently.'
        },
        {
          id: 'coa-pipelining-q10',
          q: 'A 4-stage pipeline has stage latencies 600, 350, 550 and 400 ps, and each pipeline register adds 50 ps. What is the maximum clock frequency at which the pipeline can operate?',
          options: ['1.54 GHz', '2.00 GHz', '1.67 GHz', '0.51 GHz'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'The clock period must cover the slowest stage plus the pipeline register: T = 600 + 50 = 650 ps. Maximum frequency f = 1 / T = 1 / (650 × 10^-12 s) ≈ 1.538 × 10^9 Hz ≈ 1.54 GHz. Using 600 ps alone gives 1.67 GHz (forgetting the register), and using the sum 1900 + overheads gives roughly 0.51 GHz (the non-pipelined rate). Unit care: 1000 ps period corresponds to 1 GHz, so 650 ps corresponds to 1000/650 = 1.538 GHz — doing the division as 1000/period-in-ps is the quickest safe route.'
        },
        {
          id: 'coa-pipelining-q11',
          q: 'A 4-stage pipeline has stage delays 5, 6, 11 and 8 ns (ignore latch delays). The 11 ns stage is split into two stages of 5.5 ns each, making a 5-stage pipeline. For a very long instruction stream, what speedup does the new design achieve over the old pipelined design?',
          options: ['1.375', '2.00', '1.20', '1.10'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Old pipeline cycle = max(5, 6, 11, 8) = 11 ns. New stages are 5, 6, 5.5, 5.5, 8, so the new cycle = max = 8 ns. For a very long stream, time per instruction approaches one cycle in each design, so speedup = 11 / 8 = 1.375. Note the new bottleneck moved to the 8 ns stage — splitting the slowest stage helps only until the next-slowest stage takes over as the limit, which is why the answer is not 11/5.5 = 2. Comparing cycle times, not stage counts, is the entire technique for pipeline redesign questions.'
        },
        {
          id: 'coa-pipelining-q12',
          q: 'In the delayed branch technique, the instruction placed immediately after a branch (in the delay slot):',
          options: ['Is always squashed', 'Executes regardless of the branch outcome, and the compiler tries to fill the slot with a useful instruction', 'Executes only when the branch is taken', 'Must always be a NOP'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Delayed branching redefines the architecture so that the instruction in the delay slot always executes, whether or not the branch is taken. The compiler then tries to move an instruction into the slot that is needed on both paths — often an instruction from before the branch that the branch does not depend on. If nothing safe is found, a NOP is inserted, wasting the slot but keeping correctness; a NOP is the fallback, not a requirement. This converts a hardware flush penalty into a compiler scheduling problem and was used by MIPS and SPARC. Options 1 and 3 describe squashing/annulment variants, not the basic scheme.'
        },
        {
          id: 'coa-pipelining-q13',
          q: 'A 4-stage pipeline runs a program of 1000 instructions with one instruction issued per cycle. 5% of the instructions each cause a 2-cycle stall. How many total clock cycles does the program take?',
          options: ['1003', '1100', '1103', '1203'],
          answer: 2,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Stall-free cycles = k + n − 1 = 4 + 1000 − 1 = 1003. Stall cycles = 1000 × 0.05 × 2 = 100 extra cycles, since each affected instruction inserts 2 bubbles that delay everything behind it. Total = 1003 + 100 = 1103 cycles. The two classic mistakes are omitting the pipeline-fill correction (getting 1100) or omitting the stalls (getting 1003). For throughput-style questions on long programs, note that 1103/1000 gives an effective CPI of about 1.10, matching CPI = 1 + per-instruction stalls (plus the vanishing fill term).'
        },
        {
          id: 'coa-pipelining-q14',
          q: 'With operand forwarding implemented in a 5-stage pipeline (IF ID EX MEM WB), which dependent instruction pair still requires at least one stall cycle?',
          options: ['An ALU instruction followed immediately by a dependent ALU instruction', 'A load instruction followed immediately by an instruction using the loaded value', 'A store following the ALU instruction that computes the stored value', 'Two independent instructions in consecutive slots'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Forwarding routes results from the EX/MEM or MEM/WB latches directly to the ALU inputs. An ALU result exists at the end of EX and can feed the very next instruction\'s EX — zero stalls. But a load\'s data only exists at the end of MEM, one cycle too late for the immediately following instruction\'s EX, so one bubble (the load-use or load delay stall) is unavoidable; the compiler often fills it by scheduling an independent instruction between the load and its user. A store\'s data is needed in its own MEM stage and forwards cleanly, and independent instructions never stall. This single mandatory bubble is a very frequent exam point.'
        },
        {
          id: 'coa-pipelining-q15',
          q: 'A 5-stage pipeline would ideally achieve CPI 1, but data and control hazards add an average of 0.5 stall cycles per instruction. Assuming balanced stages and ignoring latch overhead, what speedup does this pipeline achieve over the equivalent non-pipelined processor for a long program?',
          options: ['5.00', '3.33', '4.50', '2.50'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'With balanced stages of delay t, the non-pipelined machine spends 5t per instruction. The pipeline\'s cycle is t and its effective CPI = 1 + 0.5 = 1.5, so it spends 1.5t per instruction on a long program. Speedup = 5t / 1.5t = 5 / 1.5 = 3.33. The general formula worth memorizing: real speedup = ideal speedup / effective CPI = k / (1 + stalls per instruction) for balanced stages. Hazards thus cost this machine a third of its ideal performance, which is exactly why forwarding, early branch resolution and prediction hardware exist.'
        }
      ]
    },
    {
      id: 'coa-memory',
      name: 'Memory Hierarchy & Cache',
      theory: {
        intro: 'Processors are far faster than main memory, so systems interpose a hierarchy — registers, one or more levels of SRAM cache, DRAM main memory, and disk — that exploits locality of reference to make memory look both fast and large. Temporal locality (recently used data is reused) and spatial locality (neighbours of used data are used soon) justify keeping recently accessed blocks in cache and fetching whole blocks at a time. This topic covers the three mapping policies (direct, set-associative, fully associative), the tag–index–offset partitioning of an address, replacement policies like LRU, write policies (write-through versus write-back, with write-allocate variants), average memory access time (AMAT) including multilevel caches, and the sizing of tag directories. Cache bit-arithmetic is the most heavily weighted numerical area in GATE COA — nearly every paper has at least one address-partitioning or AMAT question — and every problem reduces to a handful of powers-of-two manipulations done carefully.',
        core: 'Address partitioning. A physical address of A bits accessing a cache with block size B bytes is split into an offset of log2 B bits (which byte within a block), an index that selects a line or set, and a tag holding the remaining high-order bits, stored alongside the line for comparison.\n\n• Direct-mapped: each memory block maps to exactly one line, line = (block number) mod (number of lines). Index bits = log2(number of lines) where lines = cache size / block size. Simple and fast, but two hot blocks mapping to the same line evict each other (conflict misses).\n• k-way set-associative: lines are grouped into sets of k; a block maps to one set but may occupy any of its k ways. Sets = cache size / (block size × k); index bits = log2(sets). Tag = A − index − offset. Increasing associativity at fixed capacity halves the sets, moving one bit from index to tag per doubling.\n• Fully associative: a block may go anywhere; there is no index field at all, and tag = A − offset. Requires comparing all tags in parallel, so it is used only for small structures.\n\nReplacement: on a miss in a full set, LRU evicts the least recently used way (perfect for exam tracing), FIFO the oldest, random the cheapest. Direct-mapped caches need no policy — the victim is forced.\n\nWrite policies. Write-through updates cache and memory on every write; memory always stays current, usually paired with no-write-allocate (write misses bypass the cache) and a write buffer to hide latency. Write-back updates only the cache and marks the line dirty; memory is updated when the dirty line is evicted, so a miss that evicts a dirty block pays two memory transfers. Write-back pairs naturally with write-allocate (fetch the block on a write miss).\n\nPerformance. AMAT = hit time + miss rate × miss penalty. With two levels: AMAT = T(L1) + m1 × (T(L2) + m2 × T(memory)), where m2 is the local miss rate of L2 (misses in L2 per L1 miss). Read wording carefully — a global miss rate (per CPU access) changes the arithmetic. Hierarchical (serial) access adds the lower-level time only on a miss; simultaneous (parallel) access starts memory alongside the cache, giving T = h × Tc + (1 − h) × Tm. GATE has used both models, and the question specifies which.\n\nTag directory size = number of lines × (tag bits + status bits per line: valid, plus dirty for write-back, plus LRU bits for associative caches when stated). This is a very common ask — compute tag bits first, then multiply by the line count and add whatever status bits the question lists.\n\nMiss classification helps conceptual questions: compulsory (first access), capacity (working set exceeds cache size) and conflict (mapping collisions, absent in fully associative). Larger blocks cut compulsory misses via spatial locality but raise the miss penalty and can waste capacity; higher associativity cuts conflict misses but slows hit time slightly.',
        strategy: 'The reflex for every cache problem: write cache size, block size and associativity as powers of two, then compute offset = log2(block), sets = size/(block × ways), index = log2(sets), tag = address − index − offset. Check that tag + index + offset equals the full address width every single time — this one-line sanity check catches most slips.\n\nWorked mini-example: 32 KB 4-way set-associative cache, 32-byte blocks, 32-bit addresses. Blocks = 32K/32 = 1024; sets = 1024/4 = 256, so index = 8, offset = 5, tag = 32 − 13 = 19 bits.\n\nGATE patterns: address partitioning (every year in some guise); tag directory size in bits; AMAT with one or two levels, both serial and parallel wording; hit/miss tracing of a short reference sequence under LRU; which cache line a given hex address occupies; write-back versus write-through data traffic; and solve-in-reverse questions (find the hit rate needed for a target AMAT).\n\nTraps to respect: mixing up local versus global L2 miss rates; forgetting that fully associative caches have no index; treating byte addresses as block addresses in tracing questions (divide by block size first); overlooking the dirty-block writeback in write-back miss penalties; and quietly assuming K = 1000 when memory sizes always use K = 1024. In LRU tracing, track recency per set — blocks in different sets never evict one another. These questions are pure method: slow down for 30 seconds of setup and the marks are nearly guaranteed.'
      },
      questions: [
        {
          id: 'coa-memory-q1',
          q: 'A direct-mapped cache has a capacity of 16 KB with 64-byte blocks, and the processor issues 32-bit physical addresses. How many bits are in the tag field?',
          options: ['14', '18', '20', '8'],
          answer: 1,
          marks: 2,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'Number of lines = 16 KB / 64 B = 2^14 / 2^6 = 2^8 = 256 lines, so the index needs 8 bits. Block offset = log2 64 = 6 bits. Tag = total address bits − index − offset = 32 − 8 − 6 = 18 bits. Sanity check: 18 + 8 + 6 = 32, matching the address width. The tag is stored with each line and compared on every access to confirm the resident block is the requested one. Answering 14 comes from subtracting only cache-size bits; always subtract index and offset separately after computing the line count.'
        },
        {
          id: 'coa-memory-q2',
          q: 'A 4-way set-associative cache has 32 KB capacity and 32-byte blocks, with 32-bit addresses. What are the index and tag field sizes, respectively?',
          options: ['10 and 17 bits', '8 and 19 bits', '8 and 17 bits', '9 and 18 bits'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Total blocks = 32 KB / 32 B = 2^15 / 2^5 = 2^10 = 1024. With 4 ways per set, sets = 1024 / 4 = 256 = 2^8, so index = 8 bits. Offset = log2 32 = 5 bits. Tag = 32 − 8 − 5 = 19 bits. Check: 19 + 8 + 5 = 32. The frequent error is indexing by blocks (10 bits) instead of sets — associativity divides the block count by the number of ways before taking the logarithm. Each doubling of associativity at fixed capacity removes one index bit and adds one tag bit.'
        },
        {
          id: 'coa-memory-q3',
          q: 'Which field is absent from the address breakdown of a fully associative cache?',
          options: ['Tag', 'Block offset', 'Index', 'None; all three are present'],
          answer: 2,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'A fully associative cache lets any memory block reside in any cache line, so no address bits are needed to select a particular line or set — there is no index field. The address splits into only a tag (all high-order bits) and a block offset. On an access, the hardware compares the tag against every line\'s stored tag simultaneously, which requires one comparator per line; this cost is why full associativity is reserved for small structures such as TLBs or victim caches. Direct-mapped and set-associative caches use the index to limit the search to one line or one set respectively.'
        },
        {
          id: 'coa-memory-q4',
          q: 'A cache has a hit time of 2 ns and a hit ratio of 90%. The miss penalty (time to fetch from main memory after a miss is detected) is 20 ns. Using the hierarchical access model, what is the average memory access time?',
          options: ['3.8 ns', '4.0 ns', '2.2 ns', '20 ns'],
          answer: 1,
          marks: 2,
          difficulty: 'easy',
          type: 'numerical',
          explanation: 'AMAT = hit time + miss rate × miss penalty = 2 + (1 − 0.90) × 20 = 2 + 0.1 × 20 = 2 + 2 = 4 ns. In the hierarchical (serial) model, every access pays the cache hit time — the cache is always checked first — and only misses additionally pay the penalty. The distractor 3.8 ns comes from the parallel formula h×Tc + (1−h)×Tm = 0.9×2 + 0.1×20, which applies only when the question says memory access begins simultaneously with the cache lookup. Identifying which model the wording implies is half the battle in AMAT questions.'
        },
        {
          id: 'coa-memory-q5',
          q: 'A system has an L1 cache with 1-cycle hit time and 10% miss rate, an L2 with 10-cycle access time and a local miss rate of 20%, and main memory taking 100 cycles. Using hierarchical access, what is the average memory access time in cycles?',
          options: ['4', '13', '3', '31'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Work from the inside out. Average penalty for an L1 miss = L2 time + L2 local miss rate × memory time = 10 + 0.20 × 100 = 30 cycles. AMAT = L1 hit time + L1 miss rate × (that penalty) = 1 + 0.10 × 30 = 1 + 3 = 4 cycles. The key term is the local L2 miss rate: 20% of L1 misses go to memory, i.e. only 2% of all accesses. If the question had given a global L2 miss rate of 2%, the expansion 1 + 0.10×10 + 0.02×100 = 4 would be written differently but agree. Mixing local and global rates is the classic error here.'
        },
        {
          id: 'coa-memory-q6',
          q: 'Which cache write policy requires a dirty (modified) bit per cache line?',
          options: ['Write-through', 'Write-back', 'Both write-through and write-back', 'Neither policy'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Write-back updates only the cached copy on a write and defers the memory update until the line is evicted. The cache must therefore remember which lines have been modified — the dirty bit. On eviction, a dirty line is written back to memory (a clean line is simply discarded), so a miss that displaces a dirty block costs two block transfers. Write-through propagates every write to memory immediately, so memory is never stale and no dirty bit is needed; its price is higher write traffic, usually softened by a write buffer. Coherence and traffic trade-offs between these two policies are frequent one-mark questions.'
        },
        {
          id: 'coa-memory-q7',
          q: 'A direct-mapped cache of 64 KB with 32-byte blocks serves 32-bit addresses. What is the total size of the tag storage (tags only, ignoring valid and other status bits)?',
          options: ['32768 bits', '2048 bits', '16384 bits', '65536 bits'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Lines = 64 KB / 32 B = 2^16 / 2^5 = 2^11 = 2048. Offset = 5 bits, index = 11 bits, so tag = 32 − 11 − 5 = 16 bits per line. Tag storage = 2048 lines × 16 bits = 32768 bits (4 KB of bytes if converted). The method for every tag-directory question: partition the address, then multiply tag width by line count, then add any status bits the question includes — here none. If valid bits were included the answer would grow by 2048 bits, and a write-back cache would add another 2048 for dirty bits; read the inclusion list in the question with care.'
        },
        {
          id: 'coa-memory-q8',
          q: 'An 8-way set-associative cache has 256 KB capacity and 64-byte blocks in a machine with 40-bit physical addresses. What is the tag field width?',
          options: ['25 bits', '21 bits', '28 bits', '19 bits'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Blocks = 256 KB / 64 B = 2^18 / 2^6 = 2^12 = 4096. Sets = 4096 / 8 = 512 = 2^9, so index = 9 bits. Offset = log2 64 = 6 bits. Tag = 40 − 9 − 6 = 25 bits. Verify: 25 + 9 + 6 = 40. Two habits keep this error-free: convert every size to a power of two before dividing, and always run the final sum check against the address width. Note the 40-bit address — GATE increasingly uses address widths other than 32 to catch students who memorize 32-bit partitions rather than the method.'
        },
        {
          id: 'coa-memory-q9',
          q: 'A byte-addressable machine has a direct-mapped cache with 64 lines of 16 bytes each. To which cache line does the address 0x1234 map?',
          options: ['Line 35', 'Line 18', 'Line 52', 'Line 3'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Offset = log2 16 = 4 bits; index = log2 64 = 6 bits. Drop the offset by dividing the address by 16: 0x1234 >> 4 = 0x123 (the block number, 291 decimal). Line = block number mod 64 = 291 mod 64 = 291 − 4×64 = 35. Equivalently in binary, 0x1234 = 0001 0010 0011 0100; discarding the low 4 bits leaves 1 0010 0011, whose low 6 bits are 100011 = 35. Both routes must agree. The standard mistake is taking the address mod 64 without first removing the offset bits, which lands on a wrong line.'
        },
        {
          id: 'coa-memory-q10',
          q: 'A fully associative cache holds 4 blocks and uses LRU replacement, starting empty. The processor references blocks in the order 0, 1, 2, 3, 0, 1, 4, 0. How many of these 8 references are hits?',
          options: ['2', '3', '4', '5'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Trace with recency order (least recent first). 0: miss (cache 0). 1: miss (0,1). 2: miss (0,1,2). 3: miss (0,1,2,3). 0: hit, recency becomes (1,2,3,0). 1: hit, (2,3,0,1). 4: miss — evict LRU block 2, cache holds (3,0,1,4). 0: hit, (3,1,4,0). Hits = 3 (the references to 0, 1 and the final 0); misses = 5, four of them compulsory (first touches) and one a capacity/replacement miss. Keeping an explicit recency list at every step is the only reliable way to trace LRU — mental shortcuts routinely misplace the victim.'
        },
        {
          id: 'coa-memory-q11',
          q: 'A cache with a 10 ns access time fronts a main memory with a 100 ns access time. The hit ratio is 0.95, and memory is accessed only after a miss is detected (hierarchical access). What is the average access time?',
          options: ['14.5 ns', '15 ns', '105 ns', '10.5 ns'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Hierarchical model: every reference first spends the 10 ns cache access; the 5% that miss then spend the full 100 ns memory access. Average = 10 + 0.05 × 100 = 10 + 5 = 15 ns. The distractor 14.5 ns is the simultaneous-access value 0.95 × 10 + 0.05 × 100, valid only when the question states that cache and memory are accessed in parallel. Notice the leverage of the miss rate: improving the hit ratio from 0.95 to 0.99 would drop the average to 11 ns — small hit-rate gains dominate performance when the miss penalty is 10× the hit time.'
        },
        {
          id: 'coa-memory-q12',
          q: 'A program repeatedly sweeps a large array sequentially. Increasing the cache block size (at fixed cache capacity) initially improves its hit ratio primarily because of:',
          options: ['Temporal locality', 'Spatial locality', 'Reduced conflict misses', 'A shorter hit time'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Sequential array traversal touches consecutive addresses, so a larger block brought in on one miss prefetches many upcoming elements — this is spatial locality: neighbours of accessed data are accessed soon. With B-byte blocks and 4-byte elements, one miss serves B/4 consecutive references. Temporal locality (reuse of the same datum) does not increase with block size. Larger blocks at fixed capacity mean fewer lines, which if anything worsens conflict misses, and hit time is unaffected or slightly worse. Beyond a point, oversized blocks raise the miss penalty and displace useful data — the familiar U-shaped miss curve versus block size.'
        },
        {
          id: 'coa-memory-q13',
          q: 'A fully associative cache uses 128-byte blocks in a system with 32-bit physical addresses. How many tag bits are stored per cache line?',
          options: ['25', '24', '32', '20'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'In a fully associative cache the address has only two fields: block offset and tag. Offset = log2 128 = 7 bits, so tag = 32 − 7 = 25 bits per line. The cache capacity and line count are irrelevant to tag width here — with no index field, every bit above the offset must be stored and compared. This is also why full associativity is expensive: each of those 25-bit tags needs its own comparator for a parallel search. If the same block size were used in a direct-mapped cache, index bits would shrink the tag; only the fully associative case ignores capacity.'
        },
        {
          id: 'coa-memory-q14',
          q: 'A cache line must be filled from memory over a bus. Memory delivers the first 8-byte word after 40 ns and each subsequent 8-byte word in 10 ns. For a 64-byte cache block, what is the miss penalty for one block fill?',
          options: ['110 ns', '320 ns', '80 ns', '120 ns'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'A 64-byte block contains 64 / 8 = 8 words. The first word costs the full latency of 40 ns; the remaining 7 words stream out at 10 ns each in burst mode. Penalty = 40 + 7 × 10 = 110 ns. Charging 40 ns for every word gives the wrong 320 ns, and 8 × 10 = 80 forgets the initial latency. This access-pattern arithmetic — one long initial access plus cheaper sequential transfers — models real DRAM burst behaviour and reappears in questions on interleaved memory, where consecutive words in different banks similarly overlap their access times.'
        },
        {
          id: 'coa-memory-q15',
          q: 'A cache has a 1-cycle hit time and its miss penalty is 20 cycles. What is the minimum hit ratio required for the average memory access time (hierarchical model) not to exceed 2 cycles?',
          options: ['90%', '95%', '98%', '99%'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Set up AMAT = 1 + m × 20 where m is the miss ratio, and require 1 + 20m ≤ 2. Solving: 20m ≤ 1, so m ≤ 0.05, meaning the hit ratio must be at least 1 − 0.05 = 95%. This solve-in-reverse form appears regularly: instead of computing AMAT you are given the target and asked for the necessary hit rate, memory speed, or miss penalty. The same rearrangement handles all variants — isolate the unknown in hit + miss × penalty. Note how demanding the constraint is: even 5 misses per 100 accesses doubles the effective access time when the penalty is 20×.'
        },
        {
          id: 'coa-memory-q16',
          q: 'In a write-back cache with write-allocate, what happens on a write miss to a block whose target line currently holds a dirty block?',
          options: ['The write goes directly to memory and the cache is unchanged', 'The dirty block is written back to memory, the missed block is fetched into the line, and the write updates the cache copy', 'The dirty block is discarded and the write updates memory only', 'The write stalls forever'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'Write-allocate means a write miss brings the target block into the cache, and write-back means modified lines must be saved before eviction. So the sequence is: write the victim dirty block back to memory (first block transfer), fetch the requested block from memory into the line (second transfer), then perform the CPU write on the cached copy and set its dirty bit. This double transfer is why write-back miss penalties are stated as up to two block times when the victim is dirty. Option 1 describes no-write-allocate with write-through, and discarding a dirty block (option 3) would lose committed data.'
        }
      ]
    },
    {
      id: 'coa-io',
      name: 'I/O Organization, DMA & Disk',
      theory: {
        intro: 'Input/output devices are orders of magnitude slower than the CPU, so how the processor coordinates with them determines how much useful work it can do. This topic covers the three transfer techniques — programmed I/O (the CPU busy-waits, polling a status flag), interrupt-driven I/O (the device signals readiness and the CPU services it), and direct memory access (a DMA controller moves whole blocks between device and memory while the CPU computes) — along with interrupt mechanics (vectored interrupts, priorities, daisy chaining) and the two addressing styles for device registers (memory-mapped versus isolated I/O). It closes with magnetic disk timing: seek time, rotational latency derived from RPM, and transfer time from track capacity. GATE questions here are dominated by overhead percentages (what fraction of CPU time does a device consume under each scheme) and disk access-time sums, both short calculations once the model is clear.',
        core: 'Programmed I/O: the CPU reads a device status register in a loop until the device is ready, then transfers a word. The CPU is fully occupied during the wait, so this suits only very fast or very rare transfers. Polling cost = polls per second × cycles per poll, expressed as a fraction of the CPU clock rate.\n\nInterrupt-driven I/O: the device raises an interrupt when ready; the CPU finishes its current instruction, saves state (at minimum the PC and status word), runs an interrupt service routine (ISR) to transfer the data, and resumes. The CPU is free between interrupts, but each transfer pays ISR overhead — per-byte or per-word interrupts become crippling at high data rates. In vectored interrupts the device supplies an identifier from which the CPU obtains the ISR address directly (via the interrupt vector table); non-vectored schemes require software polling of devices to find the requester. Daisy chaining passes an interrupt-acknowledge signal serially through devices, so electrical position in the chain fixes priority — the nearest device wins. Interrupts are checked at instruction boundaries; maskable interrupts can be disabled, while the NMI cannot.\n\nDMA: the CPU programs the DMA controller with the memory address, word count and direction, then continues executing. The controller becomes bus master and moves data directly between the device and memory, interrupting the CPU only once, when the whole block finishes. Modes:\n\n• Burst (block) mode: the DMA controller seizes the bus for the entire block; fastest for the device, but the CPU is locked out of memory meanwhile.\n• Cycle stealing: the controller takes one bus cycle at a time, transferring one word and returning the bus; the CPU is slowed slightly rather than stopped.\n\nDMA overhead calculations use two ingredients: the fraction of bus/memory cycles stolen (device rate ÷ words per cycle ÷ cycle rate) and the CPU cycles spent on setup and completion interrupts, both expressed relative to the transfer duration.\n\nMemory-mapped I/O assigns device registers addresses inside the ordinary memory space, so any load/store instruction can access them — no special instructions, but the address space is shared and such regions must not be cached. Isolated (port-mapped) I/O uses a separate address space with dedicated IN/OUT instructions and a control line distinguishing the spaces.\n\nDisk timing. A disk spinning at R RPM completes one revolution in 60000/R ms; average rotational latency is half a revolution. Total access time for a request = seek time + rotational latency + transfer time, where transfer time = (bytes transferred / track capacity) × revolution time, or bytes ÷ sustained transfer rate. Reading a full track takes exactly one revolution after reaching the first sector. Sequential access amortizes the seek and latency across many sectors, while random access pays them per request — the source of the enormous throughput gap between the two patterns. Data is recorded in sectors (with the sector as the atomic transfer unit), and capacity = surfaces × tracks per surface × sectors per track × bytes per sector.',
        strategy: 'Three calculation templates cover most GATE questions. (1) Interrupt overhead: fraction = (transfers per second × service time per transfer); compare against programmed I/O where the CPU is busy the entire device time, and against DMA where only setup plus one completion interrupt per block count. (2) Cycle stealing: cycles stolen per second = device byte rate ÷ bytes per bus transfer; fraction = that × bus cycle time. (3) Disk: revolution time = 60000/RPM ms, average latency = half of that, then add seek and transfer.\n\nWorked mini-example: a disk at 7200 RPM revolves in 60000/7200 = 8.33 ms, so average rotational latency is 4.17 ms; with an 8 ms average seek and a 4 KB read at 50 MB/s (0.08 ms), one random access costs about 12.25 ms — note how seek and latency dwarf the transfer.\n\nTraps: using a full revolution instead of half for average latency; forgetting that DMA interrupts the CPU once per block, not per byte; quoting device rates in MB/s but bus cycles in ns and dropping a factor of 1000; assuming memory-mapped I/O needs special instructions (that is isolated I/O); and reversing daisy-chain priority (closest to the controller is highest). When a question asks what percentage of CPU time a scheme consumes, always convert everything to time per second — events per second times seconds per event — and the fraction falls out cleanly. Expect at least one disk-timing and one DMA/interrupt-overhead question in most papers; both are quick marks with these templates.'
      },
      questions: [
        {
          id: 'coa-io-q1',
          q: 'The key advantage of DMA over interrupt-driven I/O for large block transfers is that:',
          options: ['The CPU executes the transfer loop faster', 'The CPU is involved only at the start and end of the block, not per word', 'DMA eliminates the need for a system bus', 'Interrupts are completely disabled during DMA'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'With interrupt-driven I/O the CPU must execute an interrupt service routine for every word or byte transferred, which at high data rates consumes most of the processor. DMA moves the per-word work into a hardware controller: the CPU merely programs it with the address, count and direction, then receives a single interrupt when the whole block completes. Between those two moments the CPU computes freely (competing only for stolen bus cycles). The bus is still used — in fact the DMA controller becomes bus master — and ordinary interrupts remain enabled for other devices, so options 3 and 4 are wrong.'
        },
        {
          id: 'coa-io-q2',
          q: 'In cycle-stealing DMA, the DMA controller:',
          options: ['Holds the bus until the entire block is transferred', 'Takes control of the bus for one transfer at a time, releasing it between transfers', 'Copies data through CPU registers', 'Transfers data only while the CPU is halted'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Cycle stealing interleaves DMA activity with CPU activity at the granularity of single bus cycles: the controller requests the bus, transfers one word between device and memory, then releases the bus so the CPU can continue. The CPU is slowed — some of its memory cycles are stolen — but never stopped for long. Option 1 describes burst (block) mode, where the CPU can be locked out of memory for the whole block; burst mode suits very fast devices like disks, while cycle stealing suits moderate-rate devices. DMA data never passes through CPU registers; bypassing the CPU is the entire point.'
        },
        {
          id: 'coa-io-q3',
          q: 'A device delivers data at 10000 bytes per second using interrupt-driven I/O with one interrupt per byte. Each interrupt (including state saving, service and return) costs 2 microseconds of CPU time. What fraction of the CPU is consumed servicing this device?',
          options: ['0.2%', '2%', '20%', '5%'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Interrupts per second = 10000 (one per byte). CPU time consumed per second = 10000 × 2 μs = 20000 μs = 0.02 s. Fraction = 0.02 s per second = 2%. The template: overhead fraction = event rate × time per event, with everything converted to consistent units first. At this modest rate interrupt-driven I/O is fine, but scale the device to 1 MB/s and the same arithmetic gives 200% — impossible, meaning the CPU cannot keep up and DMA becomes mandatory. GATE often asks exactly this comparison or the maximum device rate a scheme can sustain.'
        },
        {
          id: 'coa-io-q4',
          q: 'A device transfers data at 10 MB/s into memory via cycle-stealing DMA, moving one 4-byte word per stolen bus cycle. Each bus cycle takes 100 ns. What fraction of bus cycles is stolen by the DMA controller?',
          options: ['10%', '25%', '40%', '2.5%'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Words per second = 10 MB/s ÷ 4 bytes per word = 2.5 × 10^6 word transfers per second, each stealing one 100 ns bus cycle. Bus time stolen per second = 2.5 × 10^6 × 100 ns = 0.25 s. Fraction = 25%. Equivalently, the bus supports 10^7 cycles per second, of which 2.5 × 10^6 are taken: 25%. The two standard slips are forgetting to divide the byte rate by the bus width (giving 100%, i.e. treating each byte as a cycle) and mixing ns with μs. Wider buses proportionally cut the stolen fraction — the reason DMA transfers use full-word cycles.'
        },
        {
          id: 'coa-io-q5',
          q: 'A disk rotates at 7200 RPM with an average seek time of 8 ms and a sustained transfer rate of 50 MB/s. Approximately how long does one random 4 KB read take (seek + average rotational latency + transfer)?',
          options: ['8.4 ms', '12.25 ms', '16.4 ms', '20.5 ms'],
          answer: 1,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Revolution time = 60000 / 7200 = 8.33 ms, so average rotational latency = half a revolution = 4.17 ms. Transfer time for 4 KB at 50 MB/s = 4096 / (50 × 10^6) s ≈ 0.08 ms. Total ≈ 8 + 4.17 + 0.08 = 12.25 ms. Observe the proportions: mechanical positioning (seek plus latency) accounts for over 99% of the time, while the actual data movement is negligible — the fundamental reason random disk I/O is slow and why operating systems batch, reorder and cache disk requests. Using a full revolution (8.33) instead of half is the trap that yields 16.4 ms.'
        },
        {
          id: 'coa-io-q6',
          q: 'A disk spins at 15000 RPM and each track holds 1 MB. Ignoring seek and initial latency, what is the maximum sustained rate at which a full track can be read?',
          options: ['15 MB/s', '250 MB/s', '62.5 MB/s', '125 MB/s'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Reading a complete track takes exactly one revolution once the head is positioned. Revolution time = 60000 / 15000 = 4 ms. Rate = 1 MB per 4 ms = 1 MB / 0.004 s = 250 MB/s. This media transfer rate is the physical ceiling set by rotation speed and areal density; sustained rates across multiple tracks are lower because of head switches and track-to-track seeks. The calculation template — track capacity ÷ revolution time — also inverts: given a transfer rate and RPM you can recover track capacity, a variant GATE has used. Confusing RPM with revolutions per second (giving 62.5) is the standard slip.'
        },
        {
          id: 'coa-io-q7',
          q: 'In memory-mapped I/O, device registers are accessed using:',
          options: ['Special IN and OUT instructions with a separate address space', 'Ordinary load and store instructions at reserved memory addresses', 'Only DMA transfers', 'The interrupt vector table'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Memory-mapped I/O places device data, status and control registers at addresses within the normal memory address space, so the full set of load/store instructions and addressing modes works on them — no special I/O instructions are needed. The costs: device regions consume address space and must be marked non-cacheable, since reading a status register twice must query the device, not a stale cached copy. Option 1 describes isolated (port-mapped) I/O, which uses a separate I/O space selected by a control line and accessed through dedicated IN/OUT instructions, as in x86. The vector table is for locating ISRs, unrelated to register addressing.'
        },
        {
          id: 'coa-io-q8',
          q: 'In a vectored interrupt scheme, the processor determines the starting address of the interrupt service routine by:',
          options: ['Polling every device in a fixed order until one responds', 'Using an identifier supplied by the interrupting device to index the interrupt vector table', 'Always jumping to address zero', 'Asking the DMA controller'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'With vectored interrupts, the device (or an interrupt controller acting for it) places a vector number on the bus during the interrupt-acknowledge cycle. The CPU uses this number as an index into the interrupt vector table, a memory structure holding the starting addresses of the service routines, and jumps directly to the right ISR. This makes ISR dispatch fast and independent of the number of devices. Option 1 describes non-vectored (polled) interrupt identification, where software queries device status registers one by one — simpler hardware but latency grows with device count. A fixed jump to one address would force that single routine to poll anyway.'
        },
        {
          id: 'coa-io-q9',
          q: 'A disk device transfers 32000-byte blocks by DMA at a rate of 8 MB/s. DMA initialization takes 50 CPU cycles and the completion interrupt handler takes 100 CPU cycles, on a 100 MHz CPU. What percentage of CPU time is spent managing this transfer while it proceeds?',
          options: ['0.0375%', '3.75%', '0.375%', '1.5%'],
          answer: 0,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'CPU overhead per block = 50 + 100 = 150 cycles; at 100 MHz each cycle is 10 ns, so overhead = 1500 ns = 1.5 μs. Block transfer time = 32000 bytes ÷ 8 MB/s = 32000 / (8 × 10^6) s = 4 ms = 4000 μs. Fraction = 1.5 / 4000 = 0.000375 = 0.0375%. The result shows why DMA scales: the CPU cost is fixed per block regardless of block size, so bigger blocks shrink the percentage further. Interrupt-per-byte I/O on the same device would instead interrupt 8 million times per second — utterly infeasible. Watch the μs/ms conversion, the main source of the 10× and 100× wrong options.'
        },
        {
          id: 'coa-io-q10',
          q: 'In a daisy-chained interrupt acknowledgement scheme, the priority of a device is determined by:',
          options: ['Its data transfer rate', 'Its electrical position in the chain — devices closer to the CPU/controller have higher priority', 'The alphabetical order of device names', 'A random arbiter'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'In a daisy chain, the interrupt-acknowledge signal from the CPU propagates serially from device to device. A device that requested the interrupt absorbs the acknowledge and places its vector on the bus; a device that did not request passes the signal to the next in line. Consequently the device electrically nearest the CPU always gets first chance — position in the chain is priority, a simple scheme requiring no arbiter but inflexible (priorities are fixed by wiring) and slower for far devices as the grant ripples through. This hardware ordering is a favourite one-mark fact, sometimes asked as which device can starve.'
        },
        {
          id: 'coa-io-q11',
          q: 'A mouse must be polled 60 times per second, and each poll consumes 200 clock cycles on a 50 MHz processor. What fraction of CPU time does polling this mouse consume?',
          options: ['0.024%', '0.24%', '2.4%', '0.0024%'],
          answer: 0,
          marks: 2,
          difficulty: 'medium',
          type: 'numerical',
          explanation: 'Cycles spent polling per second = 60 polls × 200 cycles = 12000 cycles. The CPU provides 50 × 10^6 cycles per second. Fraction = 12000 / (50 × 10^6) = 2.4 × 10^-4 = 0.024%. This illustrates when programmed I/O is perfectly acceptable: for slow devices with low required poll rates, the overhead is trivial and the simplicity is worth it. The same template applied to a hard disk needing hundreds of thousands of polls per second would consume the entire CPU, which is the comparative point such questions usually build toward. Keep the powers of ten straight — the options differ only by factors of 10.'
        },
        {
          id: 'coa-io-q12',
          q: 'A disk has 5 ms average seek time, spins at 6000 RPM, and reading one sector takes 0.1 ms once positioned. What is the total time to read 100 sectors located at random positions on the disk?',
          options: ['510 ms', '1010 ms', '101 ms', '760 ms'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Revolution time = 60000 / 6000 = 10 ms, so average rotational latency = 5 ms. Each random sector requires its own seek and latency: per-sector time = 5 (seek) + 5 (latency) + 0.1 (transfer) = 10.1 ms. For 100 independent random sectors: 100 × 10.1 = 1010 ms. Contrast with 100 sequential sectors on one track: one seek and one latency (10 ms) plus 100 × 0.1 = 10 ms of transfer, about 20 ms total — some fifty times faster. This random-versus-sequential contrast is the conceptual heart of most GATE disk questions and of real-world I/O scheduling.'
        },
        {
          id: 'coa-io-q13',
          q: 'Compared with programmed (polling) I/O, the fundamental benefit of interrupt-driven I/O is that:',
          options: ['Data transfers themselves become faster', 'The CPU can do useful work instead of busy-waiting for the device to become ready', 'No service routine is needed', 'The device no longer needs a status register'],
          answer: 1,
          marks: 1,
          difficulty: 'easy',
          type: 'concept',
          explanation: 'Under programmed I/O the CPU sits in a loop reading the device status register until the ready bit sets, wasting every cycle of the wait — for a slow device that can be millions of cycles per transfer. Interrupt-driven I/O inverts control: the CPU runs other work, and the device announces readiness by raising an interrupt, after which a short service routine performs the transfer. The transfer itself is no faster (the same data movement occurs, plus interrupt overhead), but CPU utilization improves enormously. A service routine is still required, and devices retain status registers; only the busy-waiting disappears.'
        },
        {
          id: 'coa-io-q14',
          q: 'When a processor accepts an interrupt, which of the following is the minimal state that the hardware must save before transferring control to the service routine?',
          options: ['All general-purpose registers and the cache contents', 'The program counter and the processor status word', 'Only the stack pointer', 'The contents of main memory'],
          answer: 1,
          marks: 1,
          difficulty: 'medium',
          type: 'concept',
          explanation: 'To resume the interrupted program transparently, the hardware must preserve where it was — the program counter — and the condition flags and mode/mask information in the processor status word, since the ISR will overwrite both. These are typically pushed onto the stack (or saved to dedicated registers) automatically during interrupt entry. General-purpose registers are saved selectively by the ISR software itself, only those it will use — making hardware entry fast. Cache and memory contents need no saving; they are not destroyed by running the ISR. This hardware/software split of state saving is a recurring conceptual question.'
        },
        {
          id: 'coa-io-q15',
          q: 'Using interrupt-driven I/O with one interrupt per byte, a system spends 4 microseconds of CPU time per interrupt. What is the maximum device data rate this scheme can sustain, even if the CPU does nothing else?',
          options: ['25 KB/s', '250 KB/s', '2.5 MB/s', '400 KB/s'],
          answer: 1,
          marks: 2,
          difficulty: 'hard',
          type: 'numerical',
          explanation: 'Each byte costs 4 μs of CPU time, so even at 100% CPU dedication the system can service at most 1 / (4 × 10^-6) = 250000 interrupts per second, i.e. 250000 bytes/s = 250 KB/s. Any device faster than this loses data or forces a different scheme. The saturation-rate template — maximum rate = 1 ÷ per-transfer overhead — is the mirror image of the overhead-fraction template (fraction = rate × overhead), and GATE uses both directions. It also quantifies exactly when to switch strategies: a 10 MB/s disk exceeds this ceiling forty-fold, which is why block devices universally use DMA.'
        }
      ]
    }
]};

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-instructions';}).questions.push(
  {
    id: 'coa-instructions-x1',
    q: 'In a three-address instruction ADD R1, R2, R3, what is the effect on the registers?',
    options: ['R1 = R1 + R2, and R3 is unused', 'R3 = R1 + R2', 'R1 = R2 + R3', 'R2 = R1 + R3'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A three-address instruction names a separate destination and two separate sources, so none of the operands need to be destroyed to hold the result. The convention (matching GATE and most textbooks) lists the destination first, so ADD R1, R2, R3 means R1 = R2 + R3: R2 and R3 supply the operands and R1 receives the sum, both R2 and R3 remaining unchanged. This is why three-address code is the natural target for compilers generating intermediate representations — every temporary gets its own name. The wrong options either reuse an operand as destination (two-address behaviour) or place the destination in the wrong field.'
  },
  {
    id: 'coa-instructions-x2',
    q: 'A machine uses 16-bit instructions. Two-address instructions use two 5-bit address fields, leaving 6 bits for the opcode. If 40 of the 64 possible opcode patterns are used for two-address instructions, what is the maximum number of one-address instructions obtainable via expanding opcodes?',
    options: ['640', '768', '384', '1024'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The 6-bit opcode field gives 2^6 = 64 patterns. Two-address instructions consume 40, leaving 64 − 40 = 24 unused patterns. Each unused pattern can be extended into the next 5-bit address field to create new opcodes, so each yields 2^5 = 32 one-address instructions. Maximum count = 24 × 32 = 768. The remaining 5-bit field still serves as the single address of each new instruction. A common slip is multiplying by 64 instead of the freed field width (32), or forgetting to subtract the 40 already-used patterns before multiplying.'
  },
  {
    id: 'coa-instructions-x3',
    q: 'A 12-bit instruction format has two 4-bit address fields, leaving 4 bits for the opcode (16 patterns). 10 patterns are used for two-address instructions. Of the 6 remaining patterns, each expands to give a maximum of 16 one-address instructions using one freed 4-bit field; 80 of those possible one-address instructions are actually used, leaving the rest unused. What is the maximum number of zero-address instructions obtainable by expanding the unused one-address patterns into the last 4-bit field?',
    options: ['96', '160', '256', '16'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Six unused two-address opcode patterns each free 8 bits (two 4-bit fields), giving a maximum of 6 × 2^4 = 96 one-address opcodes. Of these 96, only 80 are used, leaving 96 − 80 = 16 unused one-address patterns. Each of those 16 patterns can absorb the second freed 4-bit field to create zero-address instructions, giving 16 × 2^4 = 256. This is a three-level expanding-opcode chain: two-address → one-address → zero-address, and each level multiplies the leftover count by 2^(bits of the next freed field). A frequent error is expanding all 96 one-address slots instead of only the 16 that remain unused.'
  },
  {
    id: 'coa-instructions-x4',
    q: 'For the expression X = A*B + C*D on a two-address machine (where an operation like MUL R,S computes R = R*S, overwriting R), using MOV, MUL, ADD, what is the minimum number of instructions needed, assuming two scratch registers are available?',
    options: ['4', '5', '6', '7'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Sequence: MOV R1,A; MUL R1,B (R1=A*B); MOV R2,C; MUL R2,D (R2=C*D); ADD R1,R2 (R1=A*B+C*D); MOV X,R1 — six instructions total. Two-address operations destroy one operand, so each product must first be loaded into its own register with a MOV before multiplying, and the final sum must be explicitly stored to X. Students commonly forget the initial MOVs (thinking MUL A,B is legal when A is a memory location, not a register) or forget the final store, undercounting to 4 or 5.'
  },
  {
    id: 'coa-instructions-x5',
    q: 'For the same expression X = A*B + C*D, on a one-address (accumulator) machine with LOAD, STORE, MUL, ADD (each combining the accumulator with a memory operand), what is the minimum number of instructions, given one temporary memory location T?',
    options: ['5', '6', '7', '8'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Sequence: LOAD A; MUL B (AC=A*B); STORE T; LOAD C; MUL D (AC=C*D); ADD T (AC=A*B+C*D); STORE X — seven instructions. An accumulator machine can hold only one running value, so the first product must be evicted to a temporary T before the second product is computed, and it is added back in afterward. This is one more instruction than the two-address version because there is no second register to hold the first product simultaneously — the extra STORE/LOAD-via-T pair reflects that limitation.'
  },
  {
    id: 'coa-instructions-x6',
    q: 'For the same expression X = A*B + C*D, on a zero-address (stack) machine using PUSH, POP, MUL, ADD, what is the minimum number of instructions required?',
    options: ['6', '7', '8', '9'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Sequence: PUSH A; PUSH B; MUL (pops A,B, pushes A*B); PUSH C; PUSH D; MUL (pushes C*D); ADD (pops both products, pushes their sum); POP X — eight instructions. Every operand needs an explicit PUSH since operators only work on the top of stack implicitly, and the final result must be explicitly popped out to X. This mirrors the pattern of stack evaluation of a postfix expression A B * C D * +, which has 7 symbols, plus the mandatory final POP to store the answer, giving 8 total instructions.'
  },
  {
    id: 'coa-instructions-x7',
    q: 'An instruction computes its effective address as EA = (contents of register R) + (constant offset in the instruction), where R itself is never modified by the instruction. Which addressing mode is this?',
    options: ['Indexed addressing with an auto-incrementing index register', 'Base-register (displacement) addressing', 'PC-relative addressing', 'Register indirect addressing'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'This is base-register addressing: a base register holds a fixed reference address (e.g., the start of an array or activation record) and a constant offset in the instruction selects a specific field or element, with the register itself unchanged from instruction to instruction. It is distinguished from indexed addressing, where the roles are reversed — the offset (base) stays constant across a loop while the index register is incremented on each iteration to walk through consecutive elements. PC-relative uses the program counter specifically as the register, not any general register, and register indirect uses no offset at all.'
  },
  {
    id: 'coa-instructions-x8',
    q: 'An instruction encodes a signed displacement that is added to the value of the program counter after the counter has already advanced past the instruction, to compute the branch target. Which addressing mode does this describe?',
    options: ['Direct addressing', 'PC-relative addressing', 'Base addressing', 'Immediate addressing'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Adding a signed offset to the already-updated program counter to compute a target address is exactly PC-relative addressing, the standard mechanism for compact, position-independent branch instructions. Because the effective address is expressed relative to the current instruction rather than as an absolute value, the same object code runs correctly no matter where it is loaded in memory — a key requirement for relocatable code and shared libraries. Direct addressing would instead embed the full absolute target address; base addressing uses an arbitrary general register, not specifically the PC; and immediate addressing would use the offset itself as the final operand value, not as an address.'
  },
  {
    id: 'coa-instructions-x9',
    q: 'Which of the following is characteristic of a RISC instruction set architecture rather than a CISC one?',
    options: ['A large number of complex, variable-length instructions and many addressing modes', 'Fixed-length instructions and a load-store architecture with a small number of addressing modes', 'Direct memory operands allowed for arithmetic instructions', 'Extensive use of microprogrammed control for most instructions'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'RISC designs favour fixed-length, simple instructions and a load-store model where only LOAD and STORE touch memory; all arithmetic operates on registers. This regularity keeps the pipeline simple, since instruction decode and register-field extraction are uniform across all instructions. CISC, by contrast, packs richer functionality into each instruction — variable lengths, memory operands directly in arithmetic instructions, many addressing modes — which reduces code size and instruction count but complicates decoding and typically requires microprogrammed control. Options describing variable-length, memory-operand arithmetic, or heavy microcode use are hallmarks of CISC, the opposite of what the question asks.'
  },
  {
    id: 'coa-instructions-x10',
    q: 'Why do many CISC processors rely on a microprogrammed control unit rather than hardwired control?',
    options: ['Microprogramming always executes faster than hardwired control', 'The large and irregular instruction set with many variable-format instructions is easier to implement and modify as stored microcode', 'Microprogrammed control eliminates the need for a control store', 'Hardwired control cannot generate more than one control signal per cycle'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'CISC instruction sets typically include many complex, variable-length, and sometimes rarely used instructions. Implementing each as custom hardwired logic would be extremely complex to design, verify, and later modify. Microprogrammed control instead stores each instruction\'s control-signal sequence as microcode in a control store (ROM/PLA), so adding, fixing, or extending instructions mainly means rewriting microprogram entries rather than redesigning combinational logic. The trade-off is speed: microprogrammed control is generally slower than hardwired control because it must fetch and decode each microinstruction, which is why fast RISC processors overwhelmingly use hardwired control for their smaller instruction sets.'
  },
  {
    id: 'coa-instructions-x11',
    q: 'A processor architecture uses a three-address, register-to-register instruction format, has exactly 100 distinct opcodes and 32 general-purpose registers, and rounds instruction length up to the nearest multiple of 8 bits. What is the minimum instruction length?',
    options: ['16 bits', '22 bits', '24 bits', '32 bits'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Opcode bits needed = ceil(log2 100) = 7, since 2^6 = 64 is too small but 2^7 = 128 suffices. Each register field needs ceil(log2 32) = 5 bits, and a three-address register format has three such fields, needing 15 bits. Total = 7 + 15 = 22 bits. Rounding up to the next multiple of 8 gives 24 bits (3 bytes) — 22 bits is not byte-aligned, and hardware and memory systems overwhelmingly prefer byte-aligned instruction fetches, so the format is padded to 24 bits even though only 22 are functionally used. A common error is stopping at the unrounded 22 bits, ignoring the alignment requirement stated in the question.'
  },
  {
    id: 'coa-instructions-x12',
    q: 'An instruction set architecture must encode 300 distinct opcodes. What is the minimum number of bits needed for the opcode field?',
    options: ['8', '9', '10', '50'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The opcode field must have at least ceil(log2 300) bits. Since 2^8 = 256 is less than 300, 8 bits are insufficient; 2^9 = 512 comfortably covers 300 distinct codes, so 9 bits is the minimum. This ceil(log2 N) computation for "minimum bits to represent N distinct items" recurs throughout instruction-encoding and addressing questions — whether counting opcodes, registers, or addressable memory locations — and the recurring trap is rounding down instead of up, or confusing floor(log2 N) with ceil(log2 N) when N is not itself a power of two.'
  },
  {
    id: 'coa-instructions-x13',
    q: 'A processor has 20 general-purpose registers. What is the minimum number of bits required to specify one register in an instruction field?',
    options: ['4', '5', '20', '10'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'To uniquely address 20 registers, the field needs ceil(log2 20) bits. Since 2^4 = 16 is fewer than 20 registers, 4 bits cannot distinguish all of them; 2^5 = 32 is enough room, so 5 bits is the minimum, leaving 12 patterns unused (which real designs often reserve for future registers or special encodings). The wrong option of 20 bits confuses "number of registers" with "bits needed to encode them" — a one-hot-style misunderstanding — while 10 bits vastly over-provisions when 5 already suffices.'
  },
  {
    id: 'coa-instructions-x14',
    q: 'An instruction format has a 6-bit opcode, two 2-bit addressing-mode fields (one per operand, since 4 modes are supported), and two 4-bit register fields (one per operand). What is the minimum total instruction length in bits?',
    options: ['16', '18', '20', '24'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Sum the fields: opcode 6 bits, plus two addressing-mode fields at 2 bits each = 4 bits, plus two register fields at 4 bits each = 8 bits. Total = 6 + 4 + 8 = 18 bits. Each field size is independently justified: 4 addressing modes need ceil(log2 4) = 2 bits, and each register field width is given directly as 4 bits in the problem. The trap is forgetting one of the four non-opcode fields (there are two mode fields and two register fields, one pair per operand, not just one of each), which yields an undercount of 14 or 16.'
  },
  {
    id: 'coa-instructions-x15',
    q: 'An instruction specifies a register that holds the address of an operand; after the operand is accessed, the register is automatically increased by the size (in bytes) of the operand just accessed. Which addressing mode is this?',
    options: ['Register indirect addressing', 'Auto-increment addressing', 'Indexed addressing', 'Base addressing'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'This is auto-increment addressing: like register indirect, the register supplies the effective address of the operand, but as a side effect of the access the register is bumped forward by the size of the datum just read or written. This makes it ideal for stepping sequentially through an array or a stack without a separate increment instruction. Plain register indirect leaves the register unchanged after access. Indexed addressing instead computes the address as a base plus a separately-specified index/offset rather than modifying the pointer register itself, and base addressing keeps its register fixed across accesses.'
  },
  {
    id: 'coa-instructions-x16',
    q: 'A fixed 32-bit instruction format reserves 6 bits for the opcode and splits the remaining bits equally between two memory-address fields. If the memory is word-addressable, what is the maximum number of memory words directly addressable by one such address field?',
    options: ['4096', '8192', '16384', '65536'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'After removing the 6-bit opcode, 32 − 6 = 26 bits remain, split equally between the two address fields, giving 13 bits per field. With a word-addressable memory, a field of w bits can directly name 2^w distinct words, so each field addresses 2^13 = 8192 words. A common mistake is dividing 32 (not 26) by 2 to get 16 bits per field, forgetting to first subtract the opcode; another is computing 2^12 or 2^14 from an off-by-one slip in the bit count.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-datapath';}).questions.push(
  {
    id: 'coa-datapath-x1',
    q: 'What is the defining difference between horizontal and vertical microinstruction formats?',
    options: ['Horizontal formats are shorter because they encode signals into small groups', 'Horizontal formats assign one bit per control signal (wide but no decoding needed); vertical formats encode groups of mutually exclusive signals into short fields (narrow but need decoders)', 'Vertical formats always execute in fewer clock cycles than horizontal formats', 'Horizontal formats can only be used with hardwired control'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Horizontal microinstructions dedicate a separate bit to every possible control signal, so many signals can be asserted in parallel with no decoding delay, at the cost of a wide control word and larger control store. Vertical microinstructions instead group mutually exclusive signals (only one of which can be active at a time) and encode the chosen one in a short binary field, shrinking the word width but requiring a decoder between the control store and the datapath, adding gate delay. Neither format is tied exclusively to hardwired control — both are used with microprogrammed control, and cycle count depends on the sequence of microinstructions, not directly on encoding style.'
  },
  {
    id: 'coa-datapath-x2',
    q: 'A microprogrammed control unit has 32 control signals, organized into 8 mutually exclusive groups of 4 signals each (exactly one signal per group can be active at a time). Using vertical (encoded) microinstruction format, what is the width of the control-signal portion of the microinstruction?',
    options: ['32 bits', '8 bits', '16 bits', '4 bits'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Each group of 4 mutually exclusive signals can be identified with ceil(log2 4) = 2 bits, since 2^2 = 4 exactly covers all four choices. With 8 such groups, the total encoded width is 8 × 2 = 16 bits. Compare this to the horizontal format, which would need one bit per signal: 32 bits total — exactly double. This factor-of-two saving is the entire point of vertical encoding, paid for by the decoder needed on each group to convert the 2-bit code back into one-of-four signal lines during execution. Choosing 32 ignores the encoding; choosing 8 or 4 forgets to multiply per-group bits by the number of groups.'
  },
  {
    id: 'coa-datapath-x3',
    q: 'Continuing from a vertical control-signal field of 16 bits, the control store holds 4096 microinstructions and each microinstruction also carries a 2-bit condition-select field (for conditional branching in the microprogram) plus a next-address field wide enough to address the whole control store. What is the total microinstruction width?',
    options: ['18 bits', '28 bits', '30 bits', '12 bits'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'The next-address field must be able to name any of the 4096 control-store locations, requiring ceil(log2 4096) = 12 bits. Adding this to the 16-bit control-signal field and the 2-bit condition-select field gives 16 + 2 + 12 = 30 bits total. This models a realistic microinstruction: a control-signal portion that drives the datapath, a condition field that lets the microprogram branch based on flags, and an explicit next-address field (rather than always falling through to the next sequential microinstruction), which is exactly how residual-control microprogram sequencing works. Forgetting the address field, or using log2 of the word width instead of the store size, are the usual slips.'
  },
  {
    id: 'coa-datapath-x4',
    q: 'Which sequence of register transfers correctly describes the instruction fetch cycle in a typical bus-based CPU datapath?',
    options: ['IR ← MDR; MDR ← M[MAR]; MAR ← PC, PC ← PC + 1', 'MAR ← PC; MDR ← M[MAR], PC ← PC + 1; IR ← MDR', 'MAR ← PC, IR ← MDR; MDR ← M[MAR]; PC ← PC + 1', 'PC ← PC + 1; MAR ← PC; IR ← M[MAR]'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Fetch must first copy the program counter into the memory address register (MAR ← PC) so the memory system knows what to read. Next, the memory read is initiated and the result lands in the memory data register, while — in parallel, since the adder is free — the PC is incremented to point at the next instruction (MDR ← M[MAR], PC ← PC + 1). Finally, once the data has arrived, it is latched into the instruction register (IR ← MDR) for decoding. Any ordering that increments PC first, or loads IR before MDR has valid data, breaks this dependency chain and is incorrect.'
  },
  {
    id: 'coa-datapath-x5',
    q: 'In a single-bus datapath, executing R3 ← R1 + R2 (after the instruction has already been fetched and decoded) requires moving one operand through a temporary latch since only one register can drive the bus per cycle. What is the minimum number of clock cycles needed for this execute step?',
    options: ['1', '2', '3', '4'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Cycle 1: R1 drives the bus and is latched into a temporary register Y feeding one ALU input. Cycle 2: R2 drives the bus into the other ALU input while the ALU computes Y + R2, and the result is latched into a temporary output register Z (the ALU output cannot be written straight back onto the bus and into R3 in the same cycle because the bus is busy carrying R2). Cycle 3: Z is placed on the bus and written into R3. Three cycles is the minimum with a single shared bus; multi-bus datapaths (with separate paths to each ALU input) can complete the same operation in fewer cycles.'
  },
  {
    id: 'coa-datapath-x6',
    q: 'On the same single-bus CPU, the fetch cycle takes 3 cycles (MAR ← PC; MDR ← M[MAR], PC ← PC+1; IR ← MDR), decode/register-read takes 1 cycle, and executing a register-register ADD (as analyzed with a temporary latch) takes 3 cycles. What is the total number of clock cycles to complete one ADD instruction?',
    options: ['4', '6', '7', '9'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Add the phases in sequence: fetch (3 cycles) + decode (1 cycle) + execute (3 cycles) = 3 + 1 + 3 = 7 cycles total. This decomposition — fetch, decode, execute, each contributing its own cycle count — is exactly how multi-cycle (non-pipelined) processors are analyzed, and it explains why simple multi-cycle designs are slower per instruction than pipelined ones despite using the same clock period: every instruction pays the full fetch-decode-execute latency serially rather than overlapping it with neighbouring instructions. Skipping the decode cycle or miscounting the execute phase are the usual sources of a wrong total.'
  },
  {
    id: 'coa-datapath-x7',
    q: 'Compared to microprogrammed control, what is the main advantage of hardwired control?',
    options: ['It is easier to modify or extend after fabrication', 'It generates control signals directly through combinational logic, avoiding the control-store access delay, so it is generally faster', 'It requires no design verification effort', 'It supports a larger and more complex instruction set more easily'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Hardwired control implements the state machine of the control unit directly as combinational and sequential logic gates, so control signals appear after only gate propagation delay, with no memory read in the critical path. This makes it faster per step than microprogrammed control, which must fetch each microinstruction from a control store before its signals become available. The trade-off is flexibility: modifying hardwired logic after fabrication is difficult or impossible, whereas microprogrammed control can be updated by rewriting the control store contents. Hardwired control also becomes disproportionately complex for large, irregular instruction sets, which is why CISC machines historically preferred microcode.'
  },
  {
    id: 'coa-datapath-x8',
    q: 'What is the main practical benefit of microprogrammed control when a manufacturer wants to add a new instruction to an existing processor family?',
    options: ['The datapath registers automatically grow to accommodate new operations', 'New behaviour can often be added by writing new microcode into the control store, without redesigning the combinational control logic', 'It removes the need for an instruction decoder entirely', 'It always makes the new instruction execute in a single cycle'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Because a microprogrammed control unit reads its control-signal sequences out of a control store (essentially a small program), extending the instruction set can often be done by adding new microroutines and updating the mapping from opcode to starting microaddress, rather than redesigning hardwired logic gates. This is far less risky and costly than modifying fixed circuitry, especially useful for maintaining compatibility across a processor family. It does not automatically enlarge the datapath, does not remove the need for decoding (the opcode must still select the right microroutine), and typically makes new instructions slower, not faster, since each microinstruction still costs a control-store access.'
  },
  {
    id: 'coa-datapath-x9',
    q: 'What are the roles of the Memory Address Register (MAR) and Memory Data Register (MDR) in the CPU datapath?',
    options: ['MAR holds the next instruction to execute; MDR holds the current PC value', 'MAR holds the address to be sent to memory; MDR holds the data being transferred to or from memory', 'MAR and MDR are two names for the same register', 'MAR holds ALU results; MDR holds the condition flags'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'The MAR is loaded with whatever address the CPU needs to access in memory (an instruction address during fetch, or an operand address during a load/store), and this value is placed on the address lines of the memory bus. The MDR is the staging register for the actual data word: on a read, memory places the fetched word into MDR for the CPU to use; on a write, the CPU places the value to be stored into MDR before the memory write is triggered. They are distinct registers with distinct roles — MAR carries "where", MDR carries "what" — and neither holds instructions, flags, or ALU results directly.'
  },
  {
    id: 'coa-datapath-x10',
    q: 'In the broadest sense, what is the function of the control unit within a CPU?',
    options: ['To perform all arithmetic and logic computations directly', 'To generate the timed sequence of control signals that orchestrate register transfers and ALU operations needed to fetch and execute each instruction', 'To store the program and data being executed', 'To convert virtual addresses into physical addresses'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'The control unit does not itself compute results — that is the ALU\'s job — nor does it store the program (that is memory\'s job) or translate addresses (that is the MMU\'s job). Its role is purely to generate, at the right moments relative to the clock, the enable, select, read/write, and ALU-function signals that move data along the correct paths of the datapath so that each instruction\'s fetch and execute steps happen in the right order. Whether implemented as hardwired logic or as a microprogram, the control unit is the conductor coordinating every other datapath component, never performing the data operations itself.'
  },
  {
    id: 'coa-datapath-x11',
    q: 'A microprogrammed control store holds 200 microinstructions, each 40 bits wide. What is the total storage capacity of the control store, in bytes?',
    options: ['200 bytes', '800 bytes', '1000 bytes', '8000 bytes'],
    answer: 2,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Total bits = number of words × word width = 200 × 40 = 8000 bits. Converting to bytes, divide by 8: 8000 / 8 = 1000 bytes. This is a routine capacity computation that also appears for main memory and cache sizing, and the two common mistakes are stopping at the bit count (giving 8000, which is a valid but differently-unitted answer here mislabeled as bytes) or dividing by the wrong factor. Always confirm which unit the question asks for before finalizing the numeric answer, since control-store sizes are often quoted in bits during design but compared to memory chip sizes in bytes.'
  },
  {
    id: 'coa-datapath-x12',
    q: 'A microprogram control store contains 512 addressable microinstruction words, and next-microaddress selection is done by an explicit address field within each microinstruction. What is the minimum width of that next-address field?',
    options: ['8 bits', '9 bits', '10 bits', '512 bits'],
    answer: 1,
    marks: 1,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'To uniquely address any one of 512 locations, the field needs ceil(log2 512) bits. Since 512 = 2^9 exactly, 9 bits is both necessary and sufficient — 8 bits could only address 2^8 = 256 locations, too few. This is the same "bits to address N locations" computation used for memory address buses and register file specifiers, and it recurs across every control-store sizing question. The distractor of 512 bits confuses the number of locations with the number of bits needed to select among them, a mistake worth specifically guarding against under exam time pressure.'
  },
  {
    id: 'coa-datapath-x13',
    q: 'In a bus-based datapath, each register-transfer micro-operation takes 50 ns to complete (including bus settling and clocking overhead). Instruction fetch requires exactly 3 such micro-operations: MAR ← PC; MDR ← M[MAR] with PC ← PC + 1; IR ← MDR. How long does the entire fetch phase take?',
    options: ['50 ns', '100 ns', '150 ns', '200 ns'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Since the three listed transfers happen in three separate clock cycles (each a distinct micro-operation gated by the clock, even though the second step bundles a memory read with a PC increment into one cycle), the total fetch time is 3 × 50 ns = 150 ns. This is a direct multiplication once the number of sequential micro-operations is correctly identified from the RTL description; the usual error is either merging or splitting one of the three listed transfers, most often treating the memory-read-plus-increment step as two separate cycles instead of one, which would incorrectly give 200 ns.'
  },
  {
    id: 'coa-datapath-x14',
    q: 'A processor is implemented in two versions with identical instruction sets. The hardwired version generates each control step in 10 ns (combinational logic delay). The microprogrammed version needs 30 ns per microinstruction (control-store access plus decode). Both versions use exactly 5 sequential control steps to execute a given instruction. By what factor is the hardwired version faster for this instruction?',
    options: ['1.5x', '2x', '3x', '5x'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Hardwired total time = 5 steps × 10 ns/step = 50 ns. Microprogrammed total time = 5 steps × 30 ns/step = 150 ns. The speedup factor is 150 / 50 = 3. Because both designs execute the identical number of logical control steps for this instruction, the entire difference in execution time comes from the per-step delay difference (10 ns of pure logic versus 30 ns dominated by a control-store read), so the ratio of total times equals the ratio of per-step times — a shortcut worth recognizing instead of separately computing and then dividing both totals.'
  },
  {
    id: 'coa-datapath-x15',
    q: 'In a two-bus (or three-bus) datapath organization, where multiple registers can potentially feed a given ALU input path, which circuit element is typically used to select which single register\'s value actually reaches that ALU input in a given cycle?',
    options: ['A multiplexer, controlled by select lines from the control unit', 'A demultiplexer', 'An encoder', 'A magnitude comparator'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'A multiplexer takes several data inputs and, based on select control lines (driven by the control unit for the current micro-operation), routes exactly one of them through to its single output — precisely what is needed to choose, cycle by cycle, which register\'s value reaches a given ALU input in a multi-bus datapath. A demultiplexer does the opposite (one input routed to one of many outputs) and is not the right tool here. An encoder converts an active line into a binary code and a magnitude comparator only compares two values for ordering — neither performs the register-selection role the datapath needs.'
  },
  {
    id: 'coa-datapath-x16',
    q: 'In a single-bus CPU, why is each register connected to the shared bus through a tri-state buffer rather than a direct wire?',
    options: ['Tri-state buffers make the bus run at a higher clock frequency', 'Only one register may drive the bus in a given cycle; tri-state buffers let every other register present a high-impedance (disconnected) output so their values do not electrically conflict with the driving register', 'Tri-state buffers store data permanently, acting as extra registers', 'They are required only for input/output devices, never for internal CPU registers'],
    answer: 1,
    marks: 1,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'A shared bus can only carry one valid value at a time. If two registers with different values both tried to drive the same wire directly, the result would be an undefined or even damaging electrical conflict. A tri-state buffer solves this by giving each register output three possible states: logic 0, logic 1, or high-impedance (effectively disconnected). The control unit enables exactly one register\'s buffer per cycle (driving 0 or 1) and disables all others (forcing high-impedance), so the bus reliably reflects only the selected register\'s value. Tri-state buffers do not store data or affect clock frequency, and the same bus-contention problem applies equally to internal registers and I/O devices sharing a bus.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-pipelining';}).questions.push(
  {
    id: 'coa-pipelining-x1',
    q: 'For a k-stage pipeline executing a very large number of instructions n, what does the ideal speedup over a non-pipelined processor approach?',
    options: ['n', 'k', '1', 'n/k'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Pipelined execution time for n instructions is (k + n − 1) cycles, versus n × k cycles non-pipelined. Speedup = nk / (k + n − 1). As n grows very large, the "+n" term in the denominator dominates the constant (k − 1), so the ratio approaches nk / n = k — the number of pipeline stages. This is the theoretical ceiling: a 5-stage pipeline can, at best, run about 5 times faster than the unpipelined version once the pipeline is kept full for long enough programs. Real pipelines fall short of this ceiling because of hazards and non-uniform stage delays, which is exactly what the stall-cycle and cycle-time questions in this topic quantify.'
  },
  {
    id: 'coa-pipelining-x2',
    q: 'A 5-stage pipeline runs a program of 500 instructions, issuing one instruction per cycle in the best case. On average, each instruction incurs 0.4 stall cycles due to hazards. What speedup does this pipeline achieve over an equivalent non-pipelined processor (which takes 5 cycles per instruction) for this program?',
    options: ['5.00', '3.55', '4.20', '2.50'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'pyq-style',
    explanation: 'Pipelined cycles without stalls = k + n − 1 = 5 + 500 − 1 = 504. Added stall cycles = n × 0.4 = 500 × 0.4 = 200. Total pipelined cycles = 504 + 200 = 704. Non-pipelined cycles = n × k = 500 × 5 = 2500. Speedup = 2500 / 704 ≈ 3.55. Note the ideal ceiling for a 5-stage pipeline is 5 (from the previous concept), and the 0.4 stalls per instruction pull the achieved speedup well below that ceiling — this gap between ideal and achieved speedup, driven entirely by the stall rate, is exactly what GATE numerical questions in this style are testing.'
  },
  {
    id: 'coa-pipelining-x3',
    q: 'A 6-stage pipeline resolves branch outcomes at the end of stage 4. Branches make up 20% of all instructions, and the branch predictor is 90% accurate. Assuming non-branch instructions and correctly predicted branches take 1 cycle, what is the effective CPI?',
    options: ['1.06', '1.60', '1.20', '1.03'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Since the outcome resolves at the end of stage 4, a misprediction discards 4 − 1 = 3 wrongly fetched instructions, i.e., a 3-cycle penalty. Fraction of instructions that are mispredicted branches = 0.20 × (1 − 0.90) = 0.02. Extra stalls per instruction = 0.02 × 3 = 0.06. Effective CPI = 1 + 0.06 = 1.06. This problem combines two templates in sequence — first derive the branch penalty from where in the pipeline the outcome becomes known (b − 1 rule), then apply the standard prediction-overhead formula (branch fraction × misprediction rate × penalty) — exactly the kind of two-step composition GATE uses to raise difficulty without introducing new concepts.'
  },
  {
    id: 'coa-pipelining-x4',
    q: 'In a 7-stage pipeline that fetches one instruction per cycle, a branch instruction\'s outcome is determined at the end of stage 5. On a misprediction, how many wrongly fetched instructions must be squashed?',
    options: ['5', '4', '7', '2'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Once the branch is fetched (occupying stage 1), one new instruction enters the pipeline in each subsequent cycle while the branch itself is still working its way through stages 2, 3, 4 and 5. By the time the outcome is known at the end of stage 5, four more instructions have been fetched behind it (the ones that entered while the branch was in stages 2 through 5), all following the wrong (fall-through) path if the branch is actually taken. So 5 − 1 = 4 instructions are squashed. This b − 1 relationship (b = stage number where outcome resolves) is the standard way GATE frames branch penalty questions without giving the penalty directly.'
  },
  {
    id: 'coa-pipelining-x5',
    q: 'Consider I1: ADD R1, R2, R3 followed immediately by I2: SUB R4, R1, R5 in a 5-stage pipeline (IF ID EX MEM WB) with no operand forwarding. The register file supports writing in the first half of a cycle and reading in the second half of the same cycle. What is the minimum number of stall cycles needed before I2 can correctly read R1 in its ID stage?',
    options: ['0', '1', '2', '3'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'I1 writes R1 in its WB stage, which falls in cycle 5. Because the register file allows a same-cycle write-then-read, I2\'s ID stage can also occur in cycle 5 and still see the updated value. Normally (with no stalls) I2\'s ID would fall in cycle 3, so it must be delayed to cycle 5 — a delay of 2 cycles, meaning 2 stall (bubble) cycles are inserted between I1 and I2. This is the classic "2 stalls without forwarding, with the write/read same-cycle trick" result for an immediately-dependent ALU-to-ALU hazard, and it is the baseline every forwarding-based improvement in this topic is measured against.'
  },
  {
    id: 'coa-pipelining-x6',
    q: 'Repeat the previous scenario — I1: ADD R1, R2, R3 then I2: SUB R4, R1, R5 in a 5-stage pipeline with no forwarding — but now assume the register file does NOT support reading and writing in the same cycle (a read must happen in a strictly later cycle than the write). How many stall cycles are now needed before I2\'s ID stage?',
    options: ['1', '2', '3', '4'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'I1 writes R1 in cycle 5 (its WB stage). Without the same-cycle write-read trick, I2\'s ID must now happen strictly after cycle 5, i.e., in cycle 6. Normally I2\'s ID would occur in cycle 3, so it is delayed by 3 cycles, requiring 3 stall cycles. This is one more stall than the same-cycle-trick version, illustrating exactly why real register files are commonly designed to allow a write-then-read within one cycle: it eliminates one full stall cycle on every immediately-dependent instruction pair even before forwarding hardware is added.'
  },
  {
    id: 'coa-pipelining-x7',
    q: 'Now suppose the pipeline in the same I1/I2 scenario (ADD R1,R2,R3 then SUB R4,R1,R5) is equipped with full operand forwarding, including an EX/MEM-to-EX forwarding path. How many stall cycles are needed before I2 can correctly use R1 in its EX stage?',
    options: ['0', '1', '2', '3'],
    answer: 0,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'I1\'s ALU result is available at the end of its EX stage (cycle 3) and is captured in the EX/MEM pipeline latch. With an EX/MEM-to-EX forwarding path, that value is routed directly to the ALU input of I2, whose EX stage falls in cycle 4 — exactly when it is needed, with no waiting. So zero stall cycles are required. This is precisely why forwarding is so effective for back-to-back ALU instructions: it converts a hazard that would otherwise cost 2 or 3 stall cycles (as seen in the two preceding questions) into a hazard that costs nothing, simply by wiring the result to where it is needed one cycle earlier than the register file could supply it.'
  },
  {
    id: 'coa-pipelining-x8',
    q: 'Consider I1: LOAD R1, 0(R2) followed immediately by I2: ADD R3, R1, R4 in a 5-stage pipeline (IF ID EX MEM WB) with full forwarding, including forwarding from the MEM/WB latch to EX. What is the minimum number of stall cycles still required?',
    options: ['0', '1', '2', '3'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'The loaded value only becomes available at the end of I1\'s MEM stage (cycle 4), because that is when the data actually returns from memory — earlier than that, there is nothing valid to forward. I2\'s EX stage, without any stall, would fall in cycle 4 as well, which is too early: forwarding from MEM/WB can deliver the value to I2\'s EX only in cycle 5, one cycle later than I2 naturally wants it. So exactly 1 stall cycle (the mandatory load-use / load-delay stall) must be inserted even with full forwarding hardware present. This single unavoidable bubble is why compilers try to schedule an independent instruction right after a load whenever possible, to fill the slot productively instead of wasting it.'
  },
  {
    id: 'coa-pipelining-x9',
    q: 'A 5-stage pipeline has stage delays of 100, 150, 120, 160 and 140 ps, and each pipeline latch adds 20 ps of overhead. For a very long instruction stream, what is the maximum sustained throughput of this pipeline, in instructions per second?',
    options: ['About 5.56 billion instructions/sec', 'About 6.67 billion instructions/sec', 'About 1.43 billion instructions/sec', 'About 10 billion instructions/sec'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'The clock period must accommodate the slowest stage plus the latch overhead: the slowest stage is 160 ps, so T = 160 + 20 = 180 ps. For a very long stream, one instruction completes every cycle in steady state, so throughput = 1 / T = 1 / (180 × 10^-12 s) ≈ 5.56 × 10^9 instructions/sec, i.e., about 5.56 billion instructions per second (5.56 GIPS). Using the fastest stage (100 ps) instead of the slowest gives the wrong, overly optimistic 6.67 GIPS-style answer, and forgetting the 20 ps latch overhead gives 1/160ps ≈ 6.25 GIPS — the slowest stage plus its latch overhead is always the correct basis for cycle time in a synchronous pipeline.'
  },
  {
    id: 'coa-pipelining-x10',
    q: 'A pipelined processor has a single-ported unified cache shared by instruction fetch and data access. Every load/store instruction causes a 1-cycle structural-hazard stall against the fetch of a later instruction, and exactly 1 in every 4 instructions is a load or store. For a program of 800 instructions on a 5-stage pipeline, what is the total number of clock cycles?',
    options: ['804', '1004', '1000', '900'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Stall-free pipelined execution takes k + n − 1 = 5 + 800 − 1 = 804 cycles. The number of load/store instructions is 800 / 4 = 200, and each contributes one structural-hazard stall cycle, adding 200 × 1 = 200 cycles. Total = 804 + 200 = 1004 cycles. This is the same additive template used for data-hazard stalls (base pipeline cycles plus stalls-per-affected-instruction × count of affected instructions) applied instead to a structural hazard — the source of the stall differs, but the arithmetic for totalling cycles is identical, which is worth recognizing so the calculation feels familiar regardless of hazard type.'
  },
  {
    id: 'coa-pipelining-x11',
    q: 'What is the standard hardware remedy for a structural hazard caused by a single, unified memory port being needed simultaneously by instruction fetch and a data access?',
    options: ['Add more pipeline stages to slow down fetch', 'Provide separate instruction and data memory ports (e.g., split L1 instruction and data caches), giving each access its own path', 'Switch to a shorter pipeline with fewer stages', 'Increase the clock frequency'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A structural hazard exists because two operations compete for one shared resource in the same cycle. The direct fix is to duplicate the resource — giving instruction fetch and data access their own independent memory ports, most commonly realized as separate L1 instruction and data caches (a Harvard-style split at the cache level even though main memory remains unified). This removes the conflict entirely rather than just working around it. Adding pipeline stages or shortening the pipeline changes timing but does not address the resource conflict, and raising clock frequency would only make the same conflict occur more often relative to real time, not resolve it.'
  },
  {
    id: 'coa-pipelining-x12',
    q: 'Which of the following is NOT one of the three standard categories of pipeline hazards?',
    options: ['Structural hazard', 'Data hazard', 'Control hazard', 'Arithmetic overflow hazard'],
    answer: 3,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Pipeline hazards are conventionally classified into exactly three categories: structural hazards (resource conflicts, such as two stages needing the same memory port), data hazards (an instruction needs a value not yet produced by an earlier, still-in-flight instruction), and control hazards (the next instruction to fetch is not yet known, typically due to an unresolved branch). "Arithmetic overflow" is a runtime exception condition detected by the ALU — it may trigger a trap or interrupt, but it is not a category of pipeline hazard in the standard taxonomy used throughout computer architecture, so it is the odd one out among the four options.'
  },
  {
    id: 'coa-pipelining-x13',
    q: 'Using the standard pipeline speedup formula Speedup = nk / (k + n − 1), a 6-stage pipeline executes a program of 200 instructions. What is the speedup over the non-pipelined equivalent?',
    options: ['6.00', '5.85', '4.90', '3.33'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Substitute n = 200, k = 6: numerator nk = 200 × 6 = 1200; denominator k + n − 1 = 6 + 200 − 1 = 205. Speedup = 1200 / 205 ≈ 5.85. This falls just short of the theoretical ceiling of k = 6 because the pipeline-fill overhead (k − 1 = 5 extra cycles relative to the idealized n cycles) still matters somewhat for a program of only 200 instructions; the ceiling of exactly 6 would only be reached in the limit of an infinitely long program. A common wrong shortcut is answering exactly 6, ignoring the fill/drain correction that the formula\'s denominator captures.'
  },
  {
    id: 'coa-pipelining-x14',
    q: 'A processor needs its effective CPI not to exceed 1.10. Branches make up 15% of instructions, and each misprediction costs 4 cycles (non-branch and correctly predicted instructions cost 1 cycle). What is the minimum branch prediction accuracy required?',
    options: ['75%', '80%', '83.3%', '90%'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Let p be the prediction accuracy. CPI = 1 + 0.15 × (1 − p) × 4 ≤ 1.10. This simplifies to 0.6 × (1 − p) ≤ 0.10, so (1 − p) ≤ 0.10 / 0.6 = 0.1667, giving p ≥ 1 − 0.1667 = 0.8333, i.e., at least 83.3%. This is the mirror image of the usual "compute CPI from given accuracy" question: here the target CPI is fixed and the required accuracy is the unknown, so the same formula is simply solved in reverse. Rounding 0.1/0.6 incorrectly (e.g., to 0.15 instead of 0.1667) is the most common source of a wrong answer among the distractors.'
  },
  {
    id: 'coa-pipelining-x15',
    q: 'A 5-stage pipeline executes 100 instructions and a total of 10 stall (bubble) cycles are inserted across the whole run due to hazards. What is the effective CPI for this run?',
    options: ['1.00', '1.10', '1.14', '1.04'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Stall-free pipelined cycles = k + n − 1 = 5 + 100 − 1 = 104. Adding the 10 stall cycles gives a total of 104 + 10 = 114 cycles. Effective CPI = total cycles / number of instructions = 114 / 100 = 1.14. It is a common mistake to divide the raw stall count by the instruction count and add that to 1 (1 + 10/100 = 1.10), which quietly forgets that the 104 baseline itself already includes the (k − 1) = 4-cycle fill overhead beyond n; for large n this fill correction becomes negligible, but for a modest 100-instruction run it visibly shifts the answer from 1.10 to 1.14.'
  },
  {
    id: 'coa-pipelining-x16',
    q: 'A chain of four dependent instructions runs on a 5-stage pipeline with full forwarding: I1: LOAD R1, 0(R2); I2: ADD R3, R1, R4; I3: SUB R5, R3, R6; I4: OR R7, R5, R8. Each instruction depends only on the immediately preceding one. How many total clock cycles do these 4 instructions take to complete?',
    options: ['8', '9', '10', '12'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'With no hazards at all, 4 instructions would take k + n − 1 = 5 + 4 − 1 = 8 cycles. Checking each dependency: I1 (LOAD) to I2 (ADD) is a load-use hazard, which needs exactly 1 stall cycle even with full forwarding, as established earlier. I2 (ADD) to I3 (SUB) and I3 (SUB) to I4 (OR) are both ALU-to-ALU dependencies, which full forwarding resolves with zero stalls. So only the very first dependency contributes a stall, adding 1 cycle to the base 8, giving a total of 9 cycles. Recognizing that only the load-use link in a dependency chain costs anything under forwarding — every ALU-to-ALU link is free — is the key simplification for these multi-instruction chain problems.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-memory';}).questions.push(
  {
    id: 'coa-memory-x1',
    q: 'A cache miss occurs on a block the very first time it is ever referenced, even in an infinitely large cache. What category of miss is this?',
    options: ['Capacity miss', 'Conflict miss', 'Compulsory (cold-start) miss', 'Coherence miss'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A compulsory miss (also called a cold-start miss) happens the first time any block is touched, because it simply has never been brought into the cache before — no amount of cache size or associativity can prevent it, since even an infinite cache would still miss on the first reference to any block. This distinguishes it from capacity misses (which disappear in an infinite cache, because they are caused by the cache being too small to hold the working set) and conflict misses (which disappear with full associativity, because they are caused by multiple blocks contending for the same limited set). Coherence misses arise only in multiprocessor systems from another core invalidating a shared block, not from a single-core reference pattern.'
  },
  {
    id: 'coa-memory-x2',
    q: 'A program\'s working set is larger than the cache can hold, so useful blocks are evicted and later re-referenced, causing repeated misses even though the cache is fully associative with an optimal replacement policy. What category of miss is this?',
    options: ['Compulsory miss', 'Capacity miss', 'Conflict miss', 'TLB miss'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A capacity miss occurs because the cache is simply not large enough to hold all the blocks needed during execution, so blocks are evicted and later re-fetched purely due to limited capacity — this happens even with full associativity and an ideal (e.g., optimal/Belady) replacement policy, which rules out conflict misses (a placement-restriction problem) as the cause. It also is not compulsory, since these blocks were already resident once before being evicted; the miss is a re-miss caused by insufficient room, not a first-ever reference. Enlarging the cache directly reduces capacity misses, whereas enlarging associativity (with the same total capacity) would not, since the problem here is total space, not confinement to specific sets.'
  },
  {
    id: 'coa-memory-x3',
    q: 'In a direct-mapped cache, two frequently used blocks happen to map to the same cache line and repeatedly evict each other, even though the cache overall has plenty of free space in other lines. What category of miss is this?',
    options: ['Compulsory miss', 'Capacity miss', 'Conflict miss', 'Cold miss'],
    answer: 2,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A conflict miss happens when a block is evicted because another block maps to the same set, even though the cache as a whole is not full — the problem is restricted placement, not total capacity. Increasing associativity (allowing each set to hold more than one block at a time) directly reduces conflict misses, and a fully associative cache eliminates them entirely, since any block may occupy any line. This is different from a capacity miss, where even a fully associative cache would still miss because there genuinely is not enough total room, and different from a compulsory miss, which would occur regardless of the cache\'s mapping policy on the block\'s first reference.'
  },
  {
    id: 'coa-memory-x4',
    q: 'A system has L1 cache with a 1-cycle hit time and a 10% (local) miss rate, an L2 cache with a 10-cycle access time and a global miss rate (fraction of ALL accesses that reach main memory) of 2%, and main memory taking 100 cycles. Using the hierarchical access model, what is the average memory access time in cycles?',
    options: ['4', '3', '13', '112'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'When the L2 miss rate is already expressed globally, each term of the AMAT expansion can be added directly without further conversion: AMAT = L1 hit time + (L1 miss rate × L2 access time) + (global L2 miss rate × memory time) = 1 + (0.10 × 10) + (0.02 × 100) = 1 + 1 + 2 = 4 cycles. This is the same answer structure as the local-miss-rate version of this problem, but arrived at more directly since no conversion between local and global rates is needed — recognizing whether a given miss rate is local or global (and converting between them, global = local_L1miss × local_L2miss, when necessary) is the single most important skill for multilevel AMAT questions.'
  },
  {
    id: 'coa-memory-x5',
    q: 'A three-level memory hierarchy has: L1 with 1-cycle hit time and 10% local miss rate; L2 with 10-cycle access time and 40% local miss rate; L3 with 20-cycle access time and 25% local miss rate; and main memory taking 200 cycles. Using the hierarchical access model throughout, what is the average memory access time?',
    options: ['4.8 cycles', '3.8 cycles', '31 cycles', '1.475 cycles'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Work from the innermost level outward. If L3 misses, memory is accessed: L3 branch cost = L3 access + L3 local miss × memory = 20 + 0.25 × 200 = 20 + 50 = 70. If L2 misses, L3 is accessed: L2 branch cost = L2 access + L2 local miss × (L3 branch cost) = 10 + 0.40 × 70 = 10 + 28 = 38. Finally, AMAT = L1 hit + L1 miss × (L2 branch cost) = 1 + 0.10 × 38 = 1 + 3.8 = 4.8 cycles. This nested-expectation structure — each level\'s local miss rate weighting the cost of everything below it — extends cleanly to any number of cache levels, and the arithmetic must be done from the deepest level upward, never by trying to combine all rates in one flat expression.'
  },
  {
    id: 'coa-memory-x6',
    q: 'A program generates 1,000,000 memory references, 30% of which are writes, on a write-through cache with no write-allocate. Assuming every write is sent to main memory regardless of whether it hits or misses in the cache, and each write transfers 4 bytes, what is the total write traffic to main memory?',
    options: ['400,000 bytes', '1,200,000 bytes', '4,000,000 bytes', '300,000 bytes'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Write-through means every write instruction updates main memory immediately, independent of a cache hit or miss (a hit additionally updates the cached copy, a miss with no write-allocate updates only memory, but both send the write to memory). Number of writes = 0.30 × 1,000,000 = 300,000 writes, each moving 4 bytes, giving total traffic = 300,000 × 4 = 1,200,000 bytes. This traffic is independent of the cache\'s hit ratio entirely, which is the defining (and costly) property of write-through: it guarantees memory is never stale, at the price of generating write traffic proportional to the raw write count rather than to the much smaller number of dirty-block evictions that a write-back cache would generate.'
  },
  {
    id: 'coa-memory-x7',
    q: 'A write-back cache experiences 100,000 total accesses with a 5% miss rate. On average, 60% of the blocks evicted due to a miss are dirty and must be written back to memory (clean evictions are simply discarded). Each block is 64 bytes. What is the total write-back traffic to main memory due to dirty evictions?',
    options: ['192,000 bytes', '320,000 bytes', '96,000 bytes', '3,000,000 bytes'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Number of misses = 100,000 × 0.05 = 5,000. Of these, dirty evictions requiring a write-back = 5,000 × 0.60 = 3,000. Each write-back moves one full block, so traffic = 3,000 × 64 bytes = 192,000 bytes. Notice how much smaller this is than the equivalent write-through traffic would be for the same workload — write-back coalesces potentially many individual writes to the same block into at most one eventual block write-back, which is exactly why write-back caches are preferred whenever write traffic (not just correctness) matters, despite the added complexity of tracking dirty bits and handling the double transfer when an eviction target is itself dirty.'
  },
  {
    id: 'coa-memory-x8',
    q: 'For a workload where the same few memory locations are written to repeatedly in a short span (high write locality), which cache write policy generally produces less traffic to main memory, and why?',
    options: ['Write-through, because it never needs a dirty bit', 'Write-back, because repeated writes to the same block are coalesced into at most one eventual write-back instead of one memory write per store', 'They always produce identical traffic regardless of workload', 'Write-through, because it always writes larger blocks than write-back'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Write-back only updates the cached copy on each write, marking the line dirty; the actual memory update happens once, only when the line is eventually evicted. If a block is written many times before eviction, all but the last write are absorbed entirely within the cache, producing at most one memory transaction for the whole burst. Write-through, in contrast, sends every single write to memory immediately, so N writes to the same block cost N memory transactions no matter how close together they occur. The claim that write-through avoids needing a dirty bit is true but irrelevant to traffic volume, and write-through does not use larger block transfers than write-back — if anything it typically writes only the changed word, not a full block.'
  },
  {
    id: 'coa-memory-x9',
    q: 'A cache is indexed and tagged directly using the virtual address, before any translation to a physical address takes place. What kind of cache is this, and what is its main drawback?',
    options: ['Physically indexed, physically tagged (PIPT) — slow because it always waits for translation', 'Virtually indexed, virtually tagged (VIVT) — fast lookup, but suffers aliasing problems when multiple virtual addresses map to the same physical address', 'Virtually indexed, physically tagged (VIPT) — a compromise requiring no special handling', 'Content-addressable memory — used only for TLBs, never for data caches'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A virtually indexed, virtually tagged (VIVT) cache uses the virtual address for both indexing and tag comparison, so it can be probed even before the TLB completes translation — the fastest possible lookup path. Its major drawback is aliasing: if two different virtual addresses (e.g., in different processes, or shared memory mapped at different virtual addresses) map to the same physical location, they can end up cached as two separate, potentially inconsistent copies, since the cache never sees the physical address to detect the collision. This forces extra hardware or software (cache flushing on context switch, or restricting shared mappings) to maintain correctness, which is why VIVT caches are less common than VIPT designs in modern processors.'
  },
  {
    id: 'coa-memory-x10',
    q: 'A cache waits for the TLB to translate the virtual address to a physical address, and then uses that physical address for both indexing and tag comparison. What is this design called, and what is its chief benefit over a virtually addressed cache?',
    options: ['VIVT — faster, since it skips translation', 'PIPT (physically indexed, physically tagged) — free of aliasing problems, since indexing and tagging both use the unique physical address', 'VIPT — combines the speed of VIVT with no drawbacks', 'None of these; caches never use physical addresses'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'A physically indexed, physically tagged (PIPT) cache performs its indexing and tag comparison only after the virtual address has been translated by the TLB, so both fields are derived from the physical address. Since physical addresses are unique system-wide, this design has no aliasing problem: two virtual addresses mapping to the same physical location naturally land in the very same cache line, keeping a single consistent copy automatically. The cost is speed — the cache access cannot begin until translation completes, adding the TLB lookup to the critical path, which is exactly the delay a VIVT design avoids and which VIPT designs try to hide by overlapping translation with indexing.'
  },
  {
    id: 'coa-memory-x11',
    q: 'A cache uses the untranslated low-order bits of the virtual address (which are identical to the corresponding bits of the physical address, since they fall within the page offset) to select the index/set, but waits for the TLB to supply the physical address before comparing tags. What is this design called, and what advantage does it offer?',
    options: ['VIVT — it eliminates the TLB entirely', 'PIPT — it requires translation to complete before indexing can begin', 'VIPT (virtually indexed, physically tagged) — indexing can proceed in parallel with TLB translation, then physical tags are compared once translation completes, avoiding most of the aliasing problems of VIVT', 'It is not a valid cache design'],
    answer: 2,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'VIPT (virtually indexed, physically tagged) is a practical compromise: as long as the index bits are drawn entirely from the page offset (the portion of the address unchanged by translation), the cache can begin selecting the set immediately using the virtual address, in parallel with the TLB translation running for the tag comparison. Once the physical address arrives, its upper bits (the physical tag) are compared against the stored tag to confirm a hit. This overlaps translation latency with indexing latency, recovering most of VIVT\'s speed while avoiding most of its aliasing issues, since the tag comparison uses the unique physical address. The constraint that the index must stay within the page offset limits how large or how associative such a cache can be relative to the page size, a limit tested numerically elsewhere in this topic.'
  },
  {
    id: 'coa-memory-x12',
    q: 'A direct-mapped cache has 4 lines (line number = block number mod 4) and starts empty. The processor references memory blocks in this order: 0, 4, 0, 1, 5, 0, 4. How many of these 7 references are hits?',
    options: ['0', '1', '2', '3'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Trace line 0\'s contents: ref 0 → miss, line0=0. ref 4 (line 4 mod 4 = 0) → line0 held 0, miss, line0=4. ref 0 → line0 held 4, miss, line0=0. ref 1 (line 1) → miss, line1=1. ref 5 (line 1) → line1 held 1, miss, line1=5. ref 0 (line 0) → line0 still holds 0 from the third reference (untouched since) → HIT. ref 4 (line 0) → line0 holds 0, miss, line0=4. Total hits = 1. This trace deliberately makes blocks 0 and 4 (and 1 and 5) conflict on the same line despite being far apart in reference order, showing how direct-mapping can thrash even a small working set that would fit comfortably in a set-associative or fully associative cache of the same size.'
  },
  {
    id: 'coa-memory-x13',
    q: 'A 2-way set-associative cache has 2 sets (set number = block number mod 2), uses LRU replacement within each set, and starts empty. The processor references blocks in the order: 0, 1, 2, 3, 0, 4, 1. How many of these 7 references are hits?',
    options: ['0', '1', '2', '3'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Track each set (recency order, oldest first). ref 0 (set 0): miss, set0=[0]. ref 1 (set 1): miss, set1=[1]. ref 2 (set 0): miss, set0=[0,2]. ref 3 (set 1): miss, set1=[1,3]. ref 0 (set 0): block 0 is present → HIT; recency updates to set0=[2,0]. ref 4 (set 0): set0=[2,0] is full; block 4 absent → miss; evict LRU block 2; set0=[0,4]. ref 1 (set 1): block 1 is present in set1=[1,3] → HIT; recency updates to set1=[3,1]. Total hits = 2 (the second reference to block 0 and the second reference to block 1). This shows how associativity rescues exactly the kind of same-line conflicts (blocks 0 and 2, or 1 and 3, sharing a set) that would have caused thrashing in the direct-mapped version of a similar trace.'
  },
  {
    id: 'coa-memory-x14',
    q: 'For a cache of fixed total capacity and fixed associativity, how does the total tag storage overhead (in bits) change as the block size is increased?',
    options: ['It increases, since larger blocks need wider tags', 'It stays exactly the same regardless of block size', 'It decreases, because doubling the block size halves the number of lines needing a tag, even though each individual tag stays roughly the same width', 'It becomes zero once blocks are large enough'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'concept',
    explanation: 'For fixed capacity C and associativity, the number of lines is C / block_size, so doubling the block size halves the line count. Meanwhile, since (index bits + offset bits) = log2(C / associativity) is fixed by capacity and associativity alone, growing the block size only shifts bits from the index field to the offset field — the combined width barely changes, and so the tag width (total address bits minus index minus offset) stays essentially constant. Total tag storage = tag width × number of lines, so with tag width roughly constant and the number of lines shrinking, the overall tag storage overhead decreases as block size grows. This is one reason larger blocks reduce the relative cost of the tag directory, even though they can hurt performance in other ways (higher miss penalty, more pollution from unused bytes fetched).'
  },
  {
    id: 'coa-memory-x15',
    q: 'A direct-mapped cache holds 64 KB of data with 32-byte blocks, in a system with 32-bit addresses. Each line also stores 1 valid bit in addition to its tag. What is the total tag+valid storage overhead as a percentage of the 64 KB of cached data?',
    options: ['6.6%', '3.1%', '12.5%', '25%'],
    answer: 0,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Lines = 64 KB / 32 B = 2^16 / 2^5 = 2^11 = 2048. Offset = log2 32 = 5 bits, index = log2 2048 = 11 bits, tag = 32 − 11 − 5 = 16 bits. Overhead per line = tag + valid bit = 16 + 1 = 17 bits. Total overhead = 2048 × 17 = 34,816 bits = 4,352 bytes. As a fraction of the 65,536-byte data array: 4,352 / 65,536 ≈ 0.0664, i.e., about 6.6%. Omitting the valid bit (using only the 16-bit tag) would give 2048 × 16 = 32,768 bits = 4,096 bytes, or about 6.25% — close to, but distinguishably different from, the correct answer, which is exactly why the question explicitly specifies the extra valid bit.'
  },
  {
    id: 'coa-memory-x16',
    q: 'A system uses 4 KB pages (12-bit page offset) and a virtually indexed, physically tagged (VIPT) cache with 32-byte blocks and 2-way set associativity. To avoid aliasing problems, all index bits must come from the page offset (the untranslated portion of the address). What is the maximum total cache size (data capacity) this constraint allows?',
    options: ['8 KB', '4 KB', '16 KB', '2 KB'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'The block offset needs log2 32 = 5 bits, leaving at most 12 − 5 = 7 bits of the 12-bit page offset available for the index field without crossing into the translated part of the address. With 7 index bits, the maximum number of sets is 2^7 = 128. With 2-way associativity, total capacity = sets × ways × block size = 128 × 2 × 32 bytes = 8192 bytes = 8 KB. Any larger cache (or higher associativity at the same capacity) would need more index bits than the page offset can supply without translation, reintroducing the aliasing problem VIPT designs try to avoid — which is why practical VIPT caches are sized and organized specifically around this page-offset constraint.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-io';}).questions.push(
  {
    id: 'coa-io-x1',
    q: 'In isolated (port-mapped) I/O, how are device registers accessed?',
    options: ['Through ordinary load/store instructions at reserved memory addresses', 'Through dedicated IN and OUT instructions addressing a separate I/O address space, distinguished from memory by a control line', 'Only through DMA transfers, never directly by the CPU', 'Through the interrupt vector table'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Isolated I/O gives device registers their own address space, completely separate from main memory, accessed using special instructions (classically IN and OUT, as in the x86 architecture) rather than general load/store instructions. A dedicated control/status line on the bus tells memory and I/O devices which address space a given bus cycle refers to, so the same numeric address can validly refer to both a memory location and a device register without conflict. This contrasts with memory-mapped I/O, where device registers share the ordinary memory address space and any instruction that can touch memory can touch a device register, at the cost of consuming part of the memory address range.'
  },
  {
    id: 'coa-io-x2',
    q: 'What is the primary trade-off between memory-mapped I/O and isolated I/O?',
    options: ['Memory-mapped I/O is always faster because it uses DMA automatically', 'Memory-mapped I/O lets any instruction access device registers but consumes part of the memory address space and requires those regions to be non-cacheable; isolated I/O keeps the address spaces separate but needs dedicated instructions', 'Isolated I/O eliminates the need for status registers on devices', 'There is no real trade-off; the two are functionally identical in every respect'],
    answer: 1,
    marks: 1,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Memory-mapped I/O gains programming flexibility — the compiler and every addressing mode already available for memory can be used on device registers directly — but it uses up part of the address space for devices, and that region must be marked non-cacheable so that reads and writes reliably reach the device rather than a stale cached value. Isolated I/O avoids consuming memory address space and keeps the two spaces cleanly separate, but requires the instruction set to include special I/O instructions (IN/OUT) that ordinary compiled code cannot use as flexibly. Neither approach involves DMA automatically, and both device styles still need status/control registers regardless of which addressing scheme is used.'
  },
  {
    id: 'coa-io-x3',
    q: 'A device transfers data at 4 MB/s via cycle-stealing DMA, using one 4-byte bus cycle per word, where each bus cycle takes 100 ns. What fraction of bus cycles does the DMA controller steal?',
    options: ['4%', '10%', '25%', '40%'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Word transfers per second = 4,000,000 bytes/s ÷ 4 bytes/word = 1,000,000 words/s, each requiring one 100 ns bus cycle. Total bus time stolen per second = 1,000,000 × 100 ns = 1,000,000 × 10^-7 s = 0.1 s. As a fraction of the full second, that is 10%. The standard checkpoint: the total available bus cycles per second here is 1/(100ns) = 10^7, and 10^6 of them are stolen, giving the same 10% directly. Forgetting to divide the byte rate by the word size before comparing to the cycle rate is the most common way to land on the wrong 40% distractor.'
  },
  {
    id: 'coa-io-x4',
    q: 'A DMA controller operates in burst (block) mode, transferring an entire 8 KB block at a sustained rate of 4 MB/s while holding the bus for the whole transfer. For how long is the CPU locked out of the memory bus during this single transfer?',
    options: ['0.5 ms', '2.048 ms', '8 ms', '4.096 ms'],
    answer: 1,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Burst mode holds the bus continuously until the whole block moves, so the lockout duration equals the block\'s total transfer time: 8 KB / 4 MB/s = 8192 bytes / (4 × 10^6 bytes/s) = 0.002048 s = 2.048 ms. During this entire window the CPU cannot access memory at all — a stark contrast with cycle stealing, where the same total data would be moved in tiny interleaved slices, letting the CPU continue running (just slightly slowed) throughout. This is exactly why burst mode is reserved for very fast devices whose transfer windows are short enough that occasional total CPU lockout is an acceptable trade for the fastest possible device service.'
  },
  {
    id: 'coa-io-x5',
    q: 'A device must be checked often enough that it is never left waiting more than 5 ms after becoming ready. Using programmed polling at exactly this minimum safe frequency, with each poll costing 100 clock cycles on a 200 MHz CPU, what fraction of CPU time does polling consume?',
    options: ['0.001%', '0.01%', '0.1%', '1%'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'A 5 ms maximum wait requires polling at least once every 5 ms, i.e., 1 / 0.005 = 200 times per second. Cycles spent polling per second = 200 × 100 = 20,000 cycles. A 200 MHz CPU executes 200 × 10^6 cycles per second, so the fraction consumed = 20,000 / (200 × 10^6) = 10^-4 = 0.01%. This shows polling can be extremely cheap when the required responsiveness is modest (a 5 ms tolerance is generous for many slow devices); the overhead only becomes a serious burden when a device demands very frequent checks, at which point interrupt-driven I/O or DMA becomes the more efficient design choice.'
  },
  {
    id: 'coa-io-x6',
    q: 'For a device that produces data continuously at an extremely high rate — so high that it is essentially always ready every time it is checked — which servicing technique tends to have the lowest overhead, and why?',
    options: ['Interrupt-driven I/O, because interrupts always cost less than checking a status flag', 'Tight-loop polling, because the fixed per-event cost of taking an interrupt (saving and restoring processor state) is paid on every single transfer, while a simple status check when the device is already ready wastes almost nothing', 'Isolated I/O, because it uses a separate address space', 'None of these techniques can handle a continuously ready device'],
    answer: 1,
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Interrupt handling carries fixed overhead per event — saving the program counter and status word, dispatching to the ISR, and later restoring state — regardless of how predictable the event is. When a device is almost always ready the moment it is checked, a tight polling loop pays only the cost of testing a status bit each time, with essentially no wasted iterations, and never pays interrupt entry/exit overhead at all. This is why extremely high-throughput scenarios sometimes favor polling (or, more commonly in practice, DMA) over per-transfer interrupts — the crossover depends on how the fixed interrupt cost compares to the cost of a single poll, not on the address space used, which is unrelated to this trade-off.'
  },
  {
    id: 'coa-io-x7',
    q: 'A disk spins at 6000 RPM (giving a 10 ms revolution time) with an 5 ms average seek time. Reading one sector takes 0.1 ms once positioned. What is the total time to sequentially read 250 sectors, starting from the very first sector of a track (one seek and one rotational latency for the whole run, then continuous transfer)?',
    options: ['25 ms', '30 ms', '35 ms', '2525 ms'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'For a purely sequential read, the seek and the rotational latency are paid only once, at the very start; afterward the head simply continues reading consecutive sectors as they pass beneath it. Average rotational latency = half of 10 ms = 5 ms. One-time positioning cost = seek + latency = 5 + 5 = 10 ms. Transfer time = 250 sectors × 0.1 ms/sector = 25 ms. Total = 10 + 25 = 35 ms. Compare this to treating all 250 sectors as independent random accesses, which would cost 250 × 10.1 ms ≈ 2525 ms — roughly 72 times slower — the single clearest illustration in this topic of why sequential disk access vastly outperforms random access.'
  },
  {
    id: 'coa-io-x8',
    q: 'The disk head is already positioned on a track (no seek needed). The controller must read 20 sectors scattered at different, non-adjacent positions around that same track, so each read requires its own rotational wait. The disk spins at 6000 RPM, and each sector\'s transfer takes 0.1 ms. What is the total time for all 20 reads?',
    options: ['2 ms', '100 ms', '102 ms', '200 ms'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Revolution time = 60000 / 6000 = 10 ms, so average rotational latency per independent access = 5 ms. Since no seek is needed (already on the right track) but each of the 20 sectors is at a scattered, non-adjacent position, each read still needs its own average rotational wait before its 0.1 ms transfer: per-sector cost = 5 + 0.1 = 5.1 ms. Total for 20 sectors = 20 × 5.1 = 102 ms. This sits between the fully sequential case (near-zero extra latency after the first sector) and the fully random case with seeks (which would additionally add a seek time to every one of the 20 accesses) — a useful intermediate scenario to recognize on exams that specify "same track" but "non-sequential" access.'
  },
  {
    id: 'coa-io-x9',
    q: 'In the total access time for a disk request, what do "seek time," "rotational latency," and "transfer time" each represent?',
    options: ['They are three names for the same quantity, added together to avoid underestimating cost', 'Seek time moves the head to the correct track; rotational latency waits for the target sector to rotate under the head; transfer time is the duration to actually read/write the data once positioned', 'Seek time is the time to read data; rotational latency is the time to write data; transfer time is idle time', 'These terms apply only to solid-state drives, not magnetic disks'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'A disk access has three physically distinct phases. Seek time is the mechanical time for the read/write head assembly to move radially to the correct track/cylinder — it depends on how far the head must travel. Rotational latency is the time spent waiting for the platter to spin so the desired sector arrives under the head — on average, half a revolution, since the sector could be anywhere around the track. Transfer time is the time actually spent reading or writing the requested bytes once the head is correctly positioned over the start of the data, which depends on the data size and the disk\'s transfer rate. All three are physically necessary and distinct; total access time sums them, and these terms are standard for magnetic (spinning) disks specifically, describing their mechanical operation.'
  },
  {
    id: 'coa-io-x10',
    q: 'A disk has a 6 ms average seek time, spins at 7200 RPM, and delivers a sustained transfer rate of 40 MB/s. What is the approximate effective throughput (useful data rate) for random 512-byte sector reads, accounting for seek, average rotational latency and transfer time?',
    options: ['About 40 MB/s', 'About 512 KB/s', 'About 50 KB/s', 'About 5 KB/s'],
    answer: 2,
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Revolution time = 60000 / 7200 ≈ 8.33 ms, so average rotational latency ≈ 4.17 ms. Transfer time for 512 bytes at 40 MB/s = 512 / (40 × 10^6) s ≈ 0.0128 ms — negligible next to the mechanical delays. Total time per random access ≈ 6 + 4.17 + 0.0128 ≈ 10.18 ms. Effective throughput = 512 bytes / 0.01018 s ≈ 50,300 bytes/s, i.e., roughly 50 KB/s. This is dramatically lower than the disk\'s quoted 40 MB/s "sustained transfer rate," which only describes the data-movement phase once positioned — the entire point of this calculation is to show how mechanical overhead dominates for small, randomly scattered accesses, unlike the sequential case where the same seek and latency get amortized over far more data.'
  },
  {
    id: 'coa-io-x11',
    q: 'A DMA controller uses cycle stealing to take 15% of all memory bus cycles for a transfer. The CPU needs a memory cycle on essentially every one of its own execution cycles, so any stolen cycle directly delays it. By what factor does the CPU\'s effective program execution time increase while this DMA transfer is active?',
    options: ['1.05x (5% longer)', '1.15x (15% longer)', 'About 1.18x (about 17.6% longer)', '1.30x (30% longer)'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'If the DMA controller takes 15% of the bus cycles, the CPU is left with only 85% of the cycles to make its normal progress; the remaining 15% of every second is time it does not get to use. To finish the same amount of memory-bound work, it now needs 1 / (1 − 0.15) = 1 / 0.85 ≈ 1.176 times as long as it would with no DMA active — about an 17.6% increase, not 15%. The naive answer of 1.15x incorrectly treats "15% of cycles stolen" as equivalent to "15% more time needed," but the correct relationship is time multiplied by 1/(1 − stolen fraction), the same form used for occupancy/utilization problems elsewhere in this subject.'
  },
  {
    id: 'coa-io-x12',
    q: 'Which of the following instruction types are characteristic of isolated (port-mapped) I/O, as opposed to memory-mapped I/O?',
    options: ['Ordinary MOV/LOAD/STORE instructions used for both memory and devices', 'Dedicated IN and OUT instructions that access a separate I/O address space', 'Only interrupt-return instructions', 'Only branch instructions'],
    answer: 1,
    marks: 1,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Isolated I/O architecturally separates device registers into their own address space, distinct from main memory, and requires the instruction set to provide special instructions — classically IN (read from a port) and OUT (write to a port) — solely for accessing that space; ordinary load/store instructions cannot reach it. Memory-mapped I/O instead reuses the same load/store instructions already used for memory, since device registers occupy addresses within the shared memory address space, with no special instructions required. Interrupt-return and branch instructions are unrelated to how device registers are addressed; they belong to control flow and interrupt handling, not to the memory-versus-port addressing distinction.'
  },
  {
    id: 'coa-io-x13',
    q: 'Why must a region of the address space used for memory-mapped I/O device registers typically be excluded from caching?',
    options: ['Caching device registers would make writes to them illegal', 'A cached copy of a status or data register could become stale, so the CPU would see an old value instead of the device\'s current state, and writes might not reach the device promptly', 'Device registers are physically incompatible with SRAM cache cells', 'Caching is disallowed only for interrupt vector addresses, not device registers'],
    answer: 1,
    marks: 2,
    difficulty: 'easy',
    type: 'concept',
    explanation: 'Ordinary memory locations rarely change underneath the CPU except through its own accesses, so caching is safe and beneficial. Device registers are different: a status register can change asynchronously (the device sets a "ready" bit on its own schedule), and a data register\'s effect (like triggering a transfer) must actually reach the device promptly rather than being absorbed into a cache line and possibly delayed or coalesced. If such an address were cached, the CPU could keep reading a stale cached status value forever, or a write-back cache could delay a control write to the device indefinitely. Marking the I/O region non-cacheable ensures every access genuinely reaches the device, at the cost of losing the speed benefit of caching for that region — there is no physical incompatibility involved, and writes to device registers remain perfectly legal.'
  },
  {
    id: 'coa-io-x14',
    q: 'A device produces data at 500,000 bytes/second. Two schemes are proposed: (a) interrupt-driven I/O with one interrupt per byte costing 3 microseconds each, or (b) cycle-stealing DMA moving 4 bytes per stolen 100 ns bus cycle. Which scheme(s), if any, can sustain this device without exceeding 100% CPU utilization, and what is the utilization for the feasible one?',
    options: ['Only DMA is feasible, consuming about 1.25% of CPU time', 'Only interrupt-driven I/O is feasible, consuming about 1.25% of CPU time', 'Both are feasible, using 150% and 1.25% respectively', 'Neither scheme can sustain this data rate'],
    answer: 0,
    marks: 2,
    difficulty: 'hard',
    type: 'pyq-style',
    explanation: 'Interrupt-driven: 500,000 interrupts/sec × 3 μs each = 1.5 seconds of CPU time needed per second of real time — 150% of the CPU, which is impossible, so this scheme cannot sustain the device (data will be lost or the device will have to be throttled). Cycle-stealing DMA: word rate = 500,000 / 4 = 125,000 stolen cycles/sec, each costing 100 ns, giving 125,000 × 100 ns = 0.0125 s = 1.25% of CPU time stolen — easily sustainable, leaving 98.75% of the CPU free for other work. This pairing is exactly why high data-rate devices universally use DMA rather than per-unit interrupts: the per-transfer overhead of an interrupt is simply too large relative to the time budget once the data rate crosses a certain threshold.'
  },
  {
    id: 'coa-io-x15',
    q: 'A keyboard is polled every 20 ms, and each poll costs 50 clock cycles on a 100 MHz CPU. What fraction of CPU time does polling this keyboard consume?',
    options: ['0.0025%', '0.025%', '0.25%', '2.5%'],
    answer: 0,
    marks: 1,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Polls per second = 1000 ms / 20 ms = 50 polls/sec. Cycles spent per second = 50 × 50 = 2500 cycles. A 100 MHz CPU executes 100 × 10^6 cycles per second, so the fraction = 2500 / (100 × 10^6) = 2.5 × 10^-5 = 0.0025%. This tiny figure explains why polling remains an entirely reasonable choice for slow, infrequent human-interface devices like keyboards and mice — the overhead is so small that the added complexity of interrupt handling or DMA buys essentially nothing, and many embedded and simple systems poll such devices for exactly this reason.'
  },
  {
    id: 'coa-io-x16',
    q: 'A disk has 50 sectors per track, each sector transfer taking 0.2 ms, and switching the active head from one track to the next (with no seek, e.g. adjacent cylinders on a multi-surface stack) costs 2 ms. An initial seek plus rotational latency of 8 ms positions the head at the start of the first track. What is the total time to sequentially read 175 sectors, spanning multiple tracks?',
    options: ['35 ms', '43 ms', '49 ms', '55 ms'],
    answer: 2,
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: '175 sectors at 50 sectors/track span 4 tracks (sectors 1–50, 51–100, 101–150, and 151–175), requiring 3 head switches between consecutive tracks. Transfer time = 175 × 0.2 ms = 35 ms. Head-switch overhead = 3 × 2 ms = 6 ms. Adding the one-time initial positioning cost of 8 ms: total = 8 + 35 + 6 = 49 ms. This models a realistic large sequential transfer that crosses track boundaries: even though the bulk of the cost is still the raw transfer time, the extra head-switch overhead at each track boundary must be counted separately from both the initial seek/latency and the per-sector transfer time, since it is neither of those — leaving it out (getting 43 ms) or double-counting a switch for the very first track (getting 55 ms) are the usual errors.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-instructions';}).theory.deep = 'DEEP REFERENCE — MACHINE INSTRUCTIONS & ADDRESSING MODES\n\nINSTRUCTION SET CLASSIFICATION\n• n-address machines are classified by the number of explicit operand addresses an instruction format carries: 3-address (ADD A,B,C means A=B+C — a dedicated destination, most orthogonal, longest instructions), 2-address (ADD A,B means A=A+B — destination doubles as a source), 1-address / accumulator (ADD X means AC = AC + M[X] — all arithmetic funnels through one implicit register), and 0-address / stack (ADD pops top two stack values, pushes their sum — operands are always implicit, TOS and TOS-1).\n• General rule for evaluating an expression: with k operators you need exactly k arithmetic instructions on a 3- or 2-address machine (plus data movement instructions to stage operands), but on a stack machine you need k operator instructions plus one PUSH per distinct operand appearing in the postfix form, and on a pure accumulator machine you typically need one LOAD/STORE pair around most operators because only one operand can be in the AC at a time.\n\nINSTRUCTION LENGTH AND FIELD WIDTH FORMULAS\n• Opcode bits needed = ceil(log2(number of distinct opcodes)).\n• Register-field bits needed = ceil(log2(number of registers)).\n• Address-field bits needed = ceil(log2(memory size in addressable units)) — this equals the number of bits in the address bus for byte/word addressing respectively.\n• Minimum instruction width = opcode bits + sum of all operand field bits (register or address), rounded up to the implementation\'s word/byte granularity.\n\nEXPANDING OPCODE TECHNIQUE — FULL RECIPE\n• Purpose: let short instructions (many operands) and long instructions (few or no operands) share one fixed instruction width by "growing" the opcode into fields that shrink as operand count drops.\n• Invariant that must never be violated: total bit patterns consumed at every stage ≤ 2^(instruction length in bits). Equivalently, if you assign codes level by level, the fraction of the opcode space used must sum to ≤ 1 when each level\'s codes are weighted by 2^(-bits reserved for that level\'s opcode).\n• Step-by-step method: (1) start from the format with the most operand fields (it has the fewest opcode bits); (2) subtract the number of patterns you actually use for that format from the total 2^(that opcode width); (3) each leftover pattern, prefixed to the next-narrower operand format, frees up the bits of the field you just dropped, so leftover_patterns × 2^(freed field width) gives the maximum count at the next level; (4) repeat, shrinking one operand field each time, until you reach 0-address instructions.\n• Worked check: instruction length 16 bits, two 6-bit address fields for 2-address instructions ⇒ opcode width = 16 − 12 = 4 bits ⇒ 16 possible patterns. If 14 patterns are used for 2-address instructions, 2 patterns remain. Prefixing those 2 patterns onto the next 6-bit field (making a 10-bit opcode for 1-address instructions) yields 2 × 2^6 = 128 one-address instructions maximum. If, further, some of those 128 are left unused, say only 100 are used, the remaining 28 patterns could expand again into a 16-bit opcode giving 28 × 2^6 = 1792 zero-address instructions maximum.\n\nADDRESSING MODES — EFFECTIVE ADDRESS (EA) TABLE\nMode                  EA formula                          Memory accesses for operand\nImmediate             operand = instruction field itself   0\nRegister              operand = Rn contents                0\nDirect / Absolute     EA = address field A                 1\nRegister Indirect     EA = contents of register R           1\nMemory Indirect       EA = M[address field A]               2\nDisplacement/Base     EA = (Base register) + offset A       1\nIndexed               EA = (Index register) + base A        1 (register auto-increments across a loop, base constant)\nPC-relative           EA = (PC, already incremented past current instruction) + signed offset A   1\nAuto-increment        EA = contents of R; then R ← R + size(operand)   1\nAuto-decrement        R ← R − size(operand); then EA = contents of R   1\n• Base vs indexed distinction (a favourite GATE trap): in base addressing the offset is the constant and the base register is what varies (used for relocation — the same offsets apply after the whole program is moved by changing one base register); in indexed addressing the base is constant and the index register is what varies through a loop (used to walk arrays). Same EA formula, opposite roles.\n• PC-relative subtlety: by the time the offset is added, the PC has already advanced to point at the NEXT instruction (post-fetch increment), so for a 4-byte instruction located at address A, EA = (A+4) + offset, never A + offset.\n\nMEMORY-REFERENCE COUNTING\n• Total memory accesses for one instruction = 1 (instruction fetch) + operand accesses (0 for immediate/register, 1 for direct/register-indirect/displacement/indexed/PC-relative/auto-inc/auto-dec, 2 for memory-indirect) + 1 more if the instruction also writes the result to memory (e.g., ADD to a memory destination).\n\nWORKED EXAMPLE 1 (expanding opcode, full multi-level)\nA machine has 12-bit instructions. Two-address instructions use two 3-bit register fields (6 bits total for operands), leaving 12 − 6 = 6 opcode bits ⇒ 64 possible patterns. Suppose 40 two-address opcodes are used. Remaining = 64 − 40 = 24 patterns. Each of those 24 patterns can be extended over one freed 3-bit register field to form 1-address instructions ⇒ opcode field becomes 6+3 = 9 bits, giving 24 × 2^3 = 192 one-address instructions maximum. If only 150 of those are used, 192 − 150 = 42 patterns remain, and each can expand over the final 3-bit field to give 42 × 2^3 = 336 zero-address instructions maximum. Check the invariant: total patterns committed = 40×2^6 + 150×2^3 + 336×2^0 (in fetch-decode terms) never exceeds 2^12 = 4096 raw bit patterns — indeed 40×64 + 150×8 + 336×1 = 2560+1200+336 = 4096 exactly, confirming the space is fully and validly partitioned.\n\nWORKED EXAMPLE 2 (PC-relative branch target)\nA branch instruction BEQ occupies 4 bytes and sits at address 2000 (decimal). Its signed displacement field contains −20 (meaning 20 bytes backward). Because the PC is incremented to 2004 during fetch before the offset is applied, EA = 2004 + (−20) = 1984. A student who forgets the increment and computes 2000 − 20 = 1980 lands 4 bytes off — exactly the kind of one-mark-losing error GATE addressing questions are built to catch.\n\nGATE TRAPS\n• Forgetting the PC is already incremented before a PC-relative offset is added — always add to (instruction address + instruction length), not the instruction\'s own address.\n• Swapping base and indexed addressing roles — remember "base register moves the whole program, index register moves through the array".\n• In expanding-opcode problems, processing formats in the wrong order (must go from most operand fields → fewest) or forgetting to multiply leftover patterns by 2^(freed bits) rather than just adding a fixed count.\n• Treating memory-indirect as one access — it is always two (fetch the pointer, then fetch the operand), plus the instruction fetch itself.\n• Assuming auto-increment always changes the register by 1 — it changes by the operand\'s size in addressable units (e.g., 4 for a 32-bit word on a byte-addressed machine).\n• Confusing "operand in the instruction" (immediate) with "address in the instruction" (direct) — a very common one-mark distractor pair.\n• Miscounting instructions needed to evaluate an expression on a 0-address (stack) machine — every distinct operand needs its own PUSH even if the same variable appears twice in the expression tree.';

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-datapath';}).theory.deep = "DEEP REFERENCE \u2014 ALU, DATAPATH & CONTROL UNIT\n\nDATAPATH COMPONENTS AND THE INSTRUCTION CYCLE\n\u2022 The datapath is the network of registers, buses, ALU and multiplexers that data flows through; the control unit is the circuitry (hardwired or microprogrammed) that asserts the right control signals each cycle so the datapath performs the intended operation.\n\u2022 The basic instruction cycle is Fetch \u2192 Decode \u2192 Operand Fetch \u2192 Execute \u2192 Write-back (memory-reference instructions add a Memory-Access stage). Fetch: MAR \u2190 PC, MDR \u2190 M[MAR], IR \u2190 MDR, PC \u2190 PC + instruction-length. Decode: control unit interprets the opcode and generates control signals/microoperations for the remaining stages.\n\u2022 Register Transfer Language (RTL) is the notation for describing microoperations, e.g. R1 \u2190 R2 + R3, or MAR \u2190 PC. Each RTL statement that can complete within one clock period is one microoperation; a sequence of microoperations gated by a common control signal within one clock pulse forms one control step.\n\nHARDWIRED VS MICROPROGRAMMED CONTROL\n\u2022 Hardwired control: control signals are generated by fixed combinational logic (or a finite-state-machine sequencer) driven directly by the opcode, addressing mode, and cycle counter. Fast (single gate delays), but changing the instruction set means redesigning logic \u2014 inflexible, used in RISC/high-performance designs.\n\u2022 Microprogrammed control: each machine instruction is implemented by a sequence of micro-instructions stored in a Control Store (a ROM/RAM). Each micro-instruction contains control-signal bits plus a next-address field. A Control Address Register (CAR) indexes the control store; a sequencer computes the next CAR value (straight-line increment, or branch on condition/mapping from opcode).\n\u2022 Horizontal microinstruction: one bit per control signal, wide word, no decoding needed, but very large control store and only one microoperation-group encoded per field (highly parallel, minimal encoding).\n\u2022 Vertical microinstruction: control signals are encoded (like a mini-opcode) and need a decoder before driving the datapath \u2014 narrower words, less parallelism, cheaper store, more decode delay.\n\u2022 Control store size = number of microinstructions \u00d7 microinstruction width; number of microinstructions needed = ceil(log2(count)) bits for the address field alone, but total width also includes signal/field bits \u2014 a classic GATE numerical asks you to compute control-store size in bits or bytes given the instruction count and width.\n\nMICROINSTRUCTION SEQUENCING TECHNIQUES\n\u2022 Two-address (branch) field: every microinstruction explicitly carries the address of the next one \u2014 maximum flexibility, largest field.\n\u2022 Incrementing with branch control: default is CAR \u2190 CAR + 1 (implicit sequential execution); a separate branch microinstruction with a condition and explicit target is used only when control flow must diverge \u2014 saves address-field bits.\n\u2022 Mapping ROM / opcode mapping: on fetch, a small mapping table converts the opcode directly into the starting control-store address for that instruction's microroutine, avoiding a long dispatch chain.\n\nALU ORGANIZATION\n\u2022 A combinational ALU computes arithmetic (add, subtract, increment) and logic (AND, OR, XOR, NOT, shift) operations selected by function-select control lines; a ripple-carry adder chains 1-bit full adders with carry propagating from LSB to MSB \u2014 the critical-path delay is proportional to the number of bits (n stages of carry propagation), which is why carry-look-ahead adders exist (they compute all carries in parallel using generate/propagate signals, trading gates for speed).\n\u2022 A full adder computes Sum = A \u2295 B \u2295 Cin and Cout = AB + BCin + ACin (majority function) \u2014 remember these two boolean expressions exactly, since GATE sometimes asks for gate counts or truth-table derivations directly.\n\u2022 Booth's algorithm multiplies signed numbers by scanning multiplier bit-pairs (Qn, Qn+1): 00 or 11 \u2192 no operation, only arithmetic shift right; 01 \u2192 add multiplicand to the running partial product, then arithmetic shift right; 10 \u2192 subtract multiplicand from the running product, then arithmetic shift right. An implicit 0 is assumed to the right of the multiplier's LSB before the first shift. Booth's algorithm processes strings of consecutive 1s in one combined add/subtract at each end of the string, which is why it can be faster than naive shift-add multiplication for such patterns.\n\u2022 Restoring and non-restoring division are the standard sequential division algorithms: restoring division subtracts the divisor from the partial remainder each step; if the result goes negative, the divisor is added back (\"restored\") and the quotient bit is 0, otherwise the quotient bit is 1. Non-restoring division avoids the extra restore step by choosing to add or subtract the divisor on the next iteration depending on the sign of the current remainder, which is more efficient in hardware.\n\nCONTROL SIGNAL TIMING AND CLOCK PERIOD\n\u2022 The clock period must be at least as long as the longest register-transfer path delay for any single control step (the worst-case combinational delay between two clocked registers), including ALU propagation delay, MUX select delay, and bus/wire delay, plus register setup time.\n\u2022 Total execution time of an instruction = (number of control steps/clock cycles it requires) \u00d7 (clock period).\n\nWORKED EXAMPLE 1 (control store sizing)\nA microprogrammed control unit needs to store 512 distinct microinstructions, each 40 bits wide (containing 32 control-signal bits plus an 8-bit next-address field, since 2^8 = 256 which is not enough \u2014 but address bits needed = ceil(log2 512) = 9, so actually the field must be re-checked: with 512 microinstructions, the next-address field needs 9 bits, giving true microinstruction width = 32 + 9 = 41 bits). Total control store size = 512 \u00d7 41 = 20,992 bits = 2624 bytes. This illustrates the recurring GATE trap of first computing ceil(log2(count)) for the address field before adding it to the fixed control-signal-bit count, rather than assuming a round number like 8 bits.\n\nWORKED EXAMPLE 2 (Booth's algorithm trace)\nMultiply multiplicand M = 7 (0111) by multiplier Q = -3 (1101, 4-bit two's complement), using 4-bit Booth's algorithm with an implicit Q(-1) = 0 initially.\nInitial: A = 0000, Q = 1101, Q-1 = 0.\nStep 1: bits (Q0,Q-1) = (1,0) \u2192 subtract M: A = 0000 - 0111 = 1001. Arithmetic shift right (A,Q,Q-1): A=1100, Q=1110, Q-1=1.\nStep 2: bits (Q0,Q-1) = (0,1) \u2192 add M: A = 1100 + 0111 = 0011. Shift right: A=0001, Q=1111, Q-1=0.\nStep 3: bits (Q0,Q-1) = (1,0) \u2192 subtract M: A = 0001 - 0111 = 1010. Shift right: A=1101, Q=0111, Q-1=1.\nStep 4: bits (Q0,Q-1) = (1,1) \u2192 no arithmetic operation. Shift right: A=1110, Q=1011, Q-1=1.\nFinal result (A,Q) = 1110 1011, a 8-bit two's complement number = -(0001 0101) = -21, which correctly equals 7 \u00d7 (-3) = -21. This four-step trace is exactly the level of detail GATE numericals expect: show every (Q0,Q-1) pair, the operation chosen, and the arithmetic shift result at each step.\n\nGATE TRAPS\n\u2022 Confusing hardwired control (fast, fixed, used for simple/RISC-like control) with microprogrammed control (flexible, uses a control store, slower due to control-store access) \u2014 GATE conceptual MCQs frequently swap these descriptions as distractors.\n\u2022 Forgetting that the next-address field width in a microinstruction must be ceil(log2(number of microinstructions)), not an arbitrary assumed size \u2014 always compute it from the actual count.\n\u2022 In Booth's algorithm, forgetting the initial Q-1 = 0, or shifting before checking bits, or using a logical shift instead of an arithmetic shift right (which must preserve the sign bit in A).\n\u2022 Mixing up restoring division (always subtracts, then conditionally adds back) with non-restoring division (alternates add/subtract based on the previous remainder's sign, never restoring immediately).\n\u2022 Assuming ripple-carry adder delay is constant \u2014 it grows linearly with the number of bits, which carry-look-ahead adders specifically fix by computing generate/propagate terms in parallel.\n\u2022 Treating horizontal and vertical microinstructions as differing in \"control store size\" alone rather than in encoding/parallelism \u2014 horizontal is wide and parallel (unencoded fields, one bit per signal), vertical is narrow and requires a decoder (encoded fields, less parallelism).";

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-pipelining';}).theory.deep = "DEEP REFERENCE \u2014 INSTRUCTION PIPELINING\n\nPIPELINE BASICS AND THE SPEEDUP FORMULAS\n\u2022 A k-stage pipeline overlaps execution of n instructions so that, ideally, once the pipeline is full, one instruction completes every clock cycle. Ideal (no-stall) total time = (k + n - 1) cycles, versus k\u00d7n cycles for fully sequential (non-pipelined) execution of n instructions each taking k cycles.\n\u2022 Ideal speedup: S = (k \u00d7 n) / (k + n - 1). As n \u2192 \u221e, S \u2192 k, the theoretical maximum speedup equal to the number of pipeline stages.\n\u2022 CPI-based (realistic, with stalls) speedup: if the pipelined CPI is CPIpipelined = 1 + (average stall cycles per instruction), and the non-pipelined CPI is CPInon-pipe (often equal to k, the number of stages, if each instruction takes k cycles serially), then Speedup = CPInon-pipe / CPIpipelined = (Execution time non-pipelined) / (Execution time pipelined), assuming the same clock period; if clock periods differ, Speedup = (CPInon-pipe \u00d7 Tclock,non-pipe) / (CPIpipelined \u00d7 Tclock,pipe).\n\u2022 Pipelined execution time for n instructions with stalls = (k + n - 1 + total stall cycles) \u00d7 Tclock, or equivalently n \u00d7 CPIpipelined \u00d7 Tclock once steady state stall behaviour is captured in CPIpipelined.\n\u2022 Efficiency = S / k (how close actual speedup comes to the ideal maximum k); Throughput = n / (total execution time), often expressed as instructions completed per cycle (IPC = 1/CPI).\n\nHAZARD CLASSIFICATION\n\u2022 Structural hazard: two instructions in different pipeline stages need the same hardware resource simultaneously (e.g., a single unified memory port needed for both instruction fetch and a data-memory access in the same cycle). Fixed by resource duplication (separate instruction and data caches/ports) or by stalling one instruction.\n\u2022 Data hazard: an instruction depends on the result of a prior instruction still in the pipeline. Three sub-types by read/write ordering:\n  - RAW (Read After Write / true dependency): instruction reads a register that an earlier, not-yet-completed instruction will write. This is the only hazard that actually reflects a real program dependency and the only one forwarding directly fixes.\n  - WAR (Write After Read / anti-dependency): a later instruction writes a register before an earlier instruction has read the old value. Cannot occur in a simple in-order pipeline with a single write-back stage, but matters in out-of-order or multi-cycle designs.\n  - WAW (Write After Write / output dependency): two instructions write the same register out of program order, so the final value could be wrong. Also mainly a concern in out-of-order/superscalar pipelines.\n\u2022 Control hazard (branch hazard): the pipeline does not know the next PC (branch taken/not-taken and its target) until the branch is resolved, potentially several stages after fetch, so wrong-path instructions may have already been fetched.\n\nFORWARDING (BYPASSING) RULES\n\u2022 Forwarding routes a result directly from the output latch of one pipeline stage (typically EX/MEM or MEM/WB) back to the input of an earlier stage (typically the EX stage's ALU input mux) without waiting for it to be written to the register file and read back.\n\u2022 EX/MEM to EX forwarding handles the case where the immediately preceding instruction produces the needed value (a one-cycle-away RAW hazard).\n\u2022 MEM/WB to EX forwarding handles the case where the instruction two positions earlier produces the value.\n\u2022 Even with full forwarding, a Load-Use hazard cannot be fully eliminated by forwarding alone: a LOAD's result is only available at the end of the MEM stage, but the immediately following dependent instruction needs it at the start of its own EX stage \u2014 one cycle earlier than forwarding can supply it \u2014 so exactly one stall cycle (a \"load-delay slot\" or pipeline interlock bubble) is unavoidable unless the compiler reorders instructions to fill that slot with independent work.\n\u2022 Number of stall cycles for a RAW hazard without forwarding = (stage where the value is produced) \u2212 (stage where it is needed) if the needed stage comes first in program order timing; with forwarding, this reduces to 0 for most ALU-ALU dependencies and to exactly 1 for load-use dependencies in a classic 5-stage pipeline.\n\nCONTROL HAZARD HANDLING\n\u2022 Stall (freeze) until the branch resolves \u2014 simplest, costs (branch resolution stage \u2212 fetch stage) cycles per taken or every branch depending on design, called the branch penalty.\n\u2022 Predict not-taken: fetch the fall-through instruction speculatively; if the branch is actually taken, flush the fetched instructions (penalty only on taken branches).\n\u2022 Predict taken: fetch from the predicted target; penalty only on mispredicted branches.\n\u2022 Delayed branch: the compiler places an instruction that executes regardless of branch outcome into the \"delay slot(s)\" right after the branch, so the pipeline always does useful work; effective only if enough independent instructions exist to fill the slot(s).\n\u2022 Branch penalty = (number of instructions fetched/squashed due to the delay before resolution) \u00d7 1 cycle each, and the overall CPI penalty contribution = (branch frequency) \u00d7 (branch penalty) \u00d7 (misprediction rate, if using prediction).\n\nWORKED EXAMPLE 1 (ideal pipeline speedup)\nA processor has a 5-stage pipeline (k = 5) executing 100 instructions (n = 100) with no stalls. Non-pipelined time = k \u00d7 n = 5 \u00d7 100 = 500 cycles. Pipelined time = k + n \u2212 1 = 5 + 100 \u2212 1 = 104 cycles. Speedup S = 500 / 104 \u2248 4.81. As n grows very large, S approaches the ideal maximum of k = 5, confirming that overhead from filling/draining the pipeline (the \"+4\" extra cycles beyond n) becomes negligible only for large n.\n\nWORKED EXAMPLE 2 (CPI-based speedup with stalls)\nA 5-stage pipelined CPU has a base CPI of 1, but 20% of all instructions are loads immediately followed by a dependent instruction, each incurring exactly 1 stall cycle (load-use hazard), and 15% of instructions are taken branches with a 2-cycle penalty each (predict-not-taken scheme). CPIpipelined = 1 + (0.20 \u00d7 1) + (0.15 \u00d7 2) = 1 + 0.20 + 0.30 = 1.50. If the equivalent non-pipelined machine has CPInon-pipe = 5 (one instruction takes all 5 stages serially) and both machines share the same clock period, Speedup = CPInon-pipe / CPIpipelined = 5 / 1.50 \u2248 3.33. This demonstrates how hazard-induced stalls erode the ideal 5\u00d7 speedup down to about 3.33\u00d7, and is the standard two-step GATE computation: first build CPIpipelined from hazard frequencies and penalties, then divide into the reference CPI.\n\nGATE TRAPS\n\u2022 Using S = k\u00d7n/(k+n-1) when the question actually gives stall information \u2014 that ideal formula assumes zero stalls; once hazards/penalties are mentioned, you must switch to the CPI-based speedup formula instead.\n\u2022 Believing forwarding eliminates ALL data hazards \u2014 it eliminates ALU-to-ALU RAW hazards but leaves exactly one unavoidable stall for load-use hazards in a classic 5-stage design.\n\u2022 Confusing WAR and WAW hazards with RAW \u2014 in a simple single-issue in-order pipeline with one write-back stage, WAR and WAW literally cannot occur, a fact GATE tests directly via \"which hazard is NOT possible in a 5-stage in-order pipeline\" style questions.\n\u2022 Getting the branch-penalty direction backwards for predict-taken vs predict-not-taken \u2014 predict-not-taken pays a penalty only when the branch IS taken, and predict-taken pays a penalty only when the branch is NOT taken (misprediction only).\n\u2022 Forgetting the \"+ (k-1)\" pipeline fill/drain overhead when computing total pipelined execution cycles for a small n \u2014 this overhead is proportionally large and cannot be ignored for small instruction counts.\n\u2022 Miscounting delay slots needed for delayed branching \u2014 if resolution happens d stages after fetch, you generally need d delay slots to fully hide the penalty (real MIPS-style designs typically use exactly 1 delay slot because branches resolve early, in the ID stage).";

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-memory';}).theory.deep = "DEEP REFERENCE \u2014 MEMORY HIERARCHY & CACHE ORGANIZATION\n\nMEMORY HIERARCHY PRINCIPLES\n\u2022 The hierarchy (registers \u2192 cache (L1/L2/L3) \u2192 main memory (DRAM) \u2192 secondary storage) exploits temporal locality (recently accessed data/instructions are likely accessed again soon) and spatial locality (nearby addresses are likely accessed soon) to make a small, fast, expensive memory behave, on average, almost as fast as the fastest level while costing close to the cheapest level per bit.\n\u2022 Hit ratio (h) = hits / total accesses at a given level; Miss ratio = 1 \u2212 h.\n\nAVERAGE MEMORY ACCESS TIME (AMAT) FORMULAS\n\u2022 Single-level cache: AMAT = Hit time + Miss rate \u00d7 Miss penalty.\n\u2022 Multilevel cache (two levels, L1 and L2): AMAT = L1 Hit time + L1 Miss rate \u00d7 (L2 Hit time + L2 Miss rate \u00d7 Main memory access time), where the L2 miss rate here is LOCAL to L2 (misses in L2 / accesses to L2, i.e., only counting requests that already missed in L1).\n\u2022 Global miss rate of L2 = L1 Miss rate \u00d7 L2 Local miss rate (fraction of ALL CPU references that miss both levels) \u2014 GATE frequently gives one of {local miss rate, global miss rate} and expects you to derive the other via this relation.\n\u2022 Effective Access Time (EAT) for n cache/memory levels generalizes recursively: EAT = h1\u00d7t1 + (1\u2212h1)\u00d7[h2\u00d7t2 + (1\u2212h2)\u00d7(...)], built from the innermost (slowest) level outward, or built level-by-level from the fastest level outward as shown above \u2014 both are the same recursive structure, just phrased differently.\n\nCACHE MAPPING \u2014 BIT-PARTITION RECIPES\nGiven: Cache size C, Main memory size M, Block/line size B (all typically in bytes, powers of 2), all addresses are byte addresses with total address width = log2(M) bits.\n\u2022 Word/Byte offset bits (o) = log2(B) \u2014 identical for all three mapping schemes, since it just locates a byte within a block.\nDirect Mapped:\n\u2022 Number of cache lines = C / B. Index bits (i) = log2(C / B) \u2014 selects exactly one specific cache line that a given main-memory block must map to.\n\u2022 Tag bits (t) = log2(M) \u2212 i \u2212 o. Address layout: [ Tag | Line Index | Block Offset ].\n\u2022 Each memory block maps to exactly one cache line; conflicts between blocks mapping to the same line cause \"conflict misses\" even when the cache overall is not full.\nFully Associative:\n\u2022 No index field \u2014 a block can be placed in ANY cache line, so the entire remaining address (beyond the offset) is the tag. Tag bits (t) = log2(M) \u2212 o. Address layout: [ Tag | Block Offset ].\n\u2022 Needs an associative (parallel) search across ALL line tags simultaneously (comparator per line) \u2014 most flexible placement, but most expensive hardware, so used only for small caches (e.g., TLBs).\nSet-Associative (n-way):\n\u2022 Number of sets (S) = (C / B) / n. Set-index bits (i) = log2(S) = log2(C / (B \u00d7 n)).\n\u2022 Tag bits (t) = log2(M) \u2212 i \u2212 o. Address layout: [ Tag | Set Index | Block Offset ].\n\u2022 A block can go into any of the n lines within its designated set; direct-mapped is the special case n = 1, fully associative is the special case n = (C/B) (one giant set).\n\nREPLACEMENT POLICIES (associative/set-associative only)\n\u2022 LRU (Least Recently Used): evict the line unused for the longest time \u2014 good locality exploitation, but needs extra bits/counters per set to track recency, cost grows with associativity.\n\u2022 FIFO: evict the oldest-loaded line regardless of recent use \u2014 cheaper to implement than LRU, can perform worse.\n\u2022 Random: evict a randomly chosen line \u2014 cheapest, surprisingly competitive for high associativity.\n\u2022 Optimal (Belady's / MIN): evict the line that will not be used for the longest time in the future \u2014 theoretical lower bound on miss rate, not implementable online, used only as a benchmark.\n\nWRITE POLICIES AND TRAFFIC\n\u2022 Write-through: every write updates both cache and main memory immediately \u2014 main memory always consistent, simplifies coherence, but generates memory-bus traffic on EVERY write, not just on misses.\n\u2022 Write-back (copy-back): a write updates only the cache line, which is marked \"dirty\" (a dirty bit set); the line is written back to main memory only when it is evicted and was dirty \u2014 far less memory traffic, but a dirty block adds one extra memory write on eviction (only when dirty), and memory can be temporarily inconsistent with cache.\n\u2022 Memory traffic under write-through = (number of writes) \u00d7 (block or word size, depending on whether write-through also fetches on a write miss) \u2014 often approximated per-word if write-through writes only the modified word to memory.\n\u2022 Memory traffic under write-back = (number of block replacements that evict a DIRTY block) \u00d7 (block size) [for the write-back itself] + (number of misses) \u00d7 (block size) [for the block fetch on a miss], i.e., total traffic is much lower when writes are frequent but reuse is high, since only the final value per block is ever written back, not every intermediate write.\n\u2022 Write-allocate (fetch-on-write-miss): on a write miss, first bring the block into the cache, then write \u2014 typically paired with write-back. No-write-allocate (write-around): on a write miss, write directly to memory without loading the block into the cache \u2014 typically paired with write-through.\n\nWORKED EXAMPLE 1 (bit partition, set-associative)\nMain memory = 4 GB (2^32 bytes, so address width = 32 bits). Cache size = 256 KB (2^18 bytes). Block size = 64 bytes (2^6 bytes). Associativity = 4-way. Offset bits o = log2(64) = 6. Number of sets S = (C/B)/n = (2^18 / 2^6) / 4 = 2^12 / 4 = 2^10 = 1024, so index bits i = log2(1024) = 10. Tag bits t = 32 \u2212 10 \u2212 6 = 16. Address layout: 16-bit tag, 10-bit set index, 6-bit block offset (32 bits total, check: 16+10+6 = 32 \u2713).\n\nWORKED EXAMPLE 2 (two-level AMAT with local/global miss rates)\nL1 hit time = 2 ns, L1 local miss rate = 8%. L2 hit time = 15 ns, L2 local miss rate = 25% (of the requests that reach L2, i.e., of L1 misses). Main memory access time = 100 ns.\nGlobal L2 miss rate = L1 miss rate \u00d7 L2 local miss rate = 0.08 \u00d7 0.25 = 0.02 = 2% of all CPU references miss both caches.\nAMAT = L1 hit time + L1 miss rate \u00d7 (L2 hit time + L2 local miss rate \u00d7 Main memory time)\n     = 2 + 0.08 \u00d7 (15 + 0.25 \u00d7 100)\n     = 2 + 0.08 \u00d7 (15 + 25)\n     = 2 + 0.08 \u00d7 40\n     = 2 + 3.2 = 5.2 ns.\nCross-check using the global miss rate form: AMAT = L1 hit time + L1 miss rate \u00d7 L2 hit time + Global L2 miss rate \u00d7 Main memory time = 2 + 0.08\u00d715 + 0.02\u00d7100 = 2 + 1.2 + 2 = 5.2 ns \u2014 both forms agree, confirming the local/global relationship is applied correctly.\n\nGATE TRAPS\n\u2022 Confusing local miss rate (misses at a level / accesses reaching that level) with global miss rate (misses at a level / total original CPU references) \u2014 L1's local and global miss rates are always identical since ALL references reach L1, but L2 (and lower) levels' local and global rates differ, and GATE numericals often specify one while implicitly needing the other.\n\u2022 In bit-partition problems, forgetting that fully associative caches have NO index field at all \u2014 the entire non-offset address is tag, a common source of an incorrect index-bit answer choice among the options.\n\u2022 Forgetting direct-mapped is the n=1 special case of set-associative and fully associative is the S=1 special case \u2014 useful for sanity-checking a general set-associative formula against known extremes.\n\u2022 Assuming write-back always causes less total memory traffic in every scenario \u2014 it is true on average with reasonable reuse/locality, but a write-heavy workload with poor locality and immediate eviction can approach write-through traffic; the formula-level distinction (traffic tied to evictions of dirty blocks, not every write) is what GATE actually tests, not a blanket \"write-back always wins\" claim.\n\u2022 Mixing up which formula uses block size vs word size for write-through traffic \u2014 write-through with a write-allocate-on-miss policy still fetches a whole block on a miss even though only a word/byte is written per hit.\n\u2022 Off-by-one power errors when computing log2 of cache/memory sizes given in KB/MB/GB \u2014 always convert everything to bytes (or a consistent unit) and confirm 2^18 = 256K, 2^20 = 1M, 2^30 = 1G before taking logs, rather than trusting a rushed mental exponent.";

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-io';}).theory.deep = "DEEP REFERENCE \u2014 I/O ORGANIZATION, INTERRUPTS & DMA\n\nI/O TRANSFER TECHNIQUES \u2014 OVERVIEW AND COMPARISON\nTechnique         CPU involvement per transfer         Best suited for                    Overhead style\nProgrammed I/O    CPU polls a status/ready bit in a busy-wait loop, then moves each data item itself   Slow, simple, infrequent devices (keyboard)   Wastes CPU cycles busy-waiting\nInterrupt-driven  Device signals CPU via an interrupt only when ready; CPU handles other work meanwhile, then services the transfer   Medium-speed devices, when overlap with other work matters   Per-interrupt context-switch overhead (save/restore state)\nDMA               A DMA controller transfers entire blocks directly between device and memory, stealing individual bus cycles from or pausing the CPU only briefly per transfer, interrupting the CPU only once (at block completion)   High-speed, bulk transfers (disk, network)   Lowest CPU overhead, needs dedicated controller hardware\n\nINTERRUPT MECHANICS\n\u2022 On an interrupt request, the CPU (once it decides to accept it, typically at instruction boundary) completes the current instruction, saves the minimal required state (usually PC, and often flags/PSW) onto the stack or into designated registers, then vectors to the Interrupt Service Routine (ISR) whose address is found via a fixed vector, a device-supplied vector number, or a fixed memory location.\n\u2022 Vectored interrupts: the interrupting device itself supplies (or is looked up via) the address of its specific ISR, so the CPU can jump straight there \u2014 fast dispatch.\n\u2022 Non-vectored interrupts: all interrupts jump to one fixed common address; a software polling routine there must then check every device to discover which one actually interrupted \u2014 the CPU polls the source in priority order.\n\u2022 Interrupt latency = time from the interrupt signal being asserted to the first instruction of the ISR executing; this includes finishing the current instruction, saving state, and any priority arbitration among multiple simultaneous interrupt requests.\n\u2022 Multiple/nested interrupts are ordered using either polling (software checks devices in a fixed priority sequence \u2014 cheap hardware, slower response for low-priority devices) or a Vectored Priority Interrupt scheme / daisy-chaining (hardware directly grants the bus/acknowledges the highest-priority pending request \u2014 faster, more hardware). Priority determines which device is serviced first, and whether a lower-priority ISR can itself be interrupted by a higher-priority request (nested interrupts) if interrupts are enabled during ISR execution.\n\nDMA \u2014 CYCLE STEALING AND CPU IMPACT\n\u2022 A DMA controller holds source address, destination address, and word/byte count registers; the CPU programs these once, then the DMA controller independently drives the memory/data buses for the transfer, requesting the bus from the CPU only when the CPU is not using it (cycle stealing) or, in a \"burst\"/block mode, holding the bus for the entire transfer's duration.\n\u2022 Cycle-stealing percentage / fraction of CPU time consumed by DMA = (Number of DMA cycles used per second) / (Total memory cycles available per second), where memory cycles per second = 1 / (memory cycle time), so: Fraction of time DMA steals = (DMA transfer rate in words/sec \u00d7 memory cycle time) \u2014 equivalently, if the DMA controller needs one memory cycle per word transferred, and it transfers R words per second while the memory's cycle time is Tm, then fraction of memory bandwidth taken by DMA = R \u00d7 Tm, and the fraction of CPU throughput LOST equals this same fraction of cycles stolen (each stolen cycle is one cycle the CPU could not use).\n\u2022 Effective CPU execution time with DMA active = Original CPU time / (1 \u2212 fraction of cycles stolen by DMA), since the CPU's own instruction stream now takes proportionally longer due to memory cycles being unavailable to it during stolen slots.\n\u2022 Overall speed advantage of DMA over interrupt-driven or programmed I/O for a block of N words: DMA needs the CPU only for initial setup (a few cycles) and a single completion interrupt, versus programmed I/O needing full CPU attention (poll + move) for POSSIBLY every single word.\n\nDISK STORAGE \u2014 SERVICE TIME MODEL\n\u2022 Disk service time (average time to satisfy a random single-sector access request) = Seek time + Rotational latency + Transfer time.\n\u2022 Seek time: time for the read/write head to move to the correct cylinder/track \u2014 depends on how far the head must travel; average seek time is often given directly, or computed as an average over a uniform distribution of track distances.\n\u2022 Rotational latency: time waiting for the desired sector to rotate under the head. Average rotational latency = (1/2) \u00d7 (time for one full disk revolution) = (1/2) \u00d7 (60 / RPM) seconds, since on average the desired sector is half a revolution away.\n\u2022 Transfer time = (amount of data to transfer) / (data transfer rate), where transfer rate = (bytes per track) \u00d7 (RPM / 60) [bytes per second], or equivalently transfer time for one sector = (time for one revolution) / (sectors per track), since a full revolution passes every sector on the track once.\n\u2022 For a large sequential transfer spanning multiple tracks: Total time = Initial (seek + rotational latency) + (total sectors \u00d7 transfer time per sector) + (number of track/head switches \u00d7 head-switch time), where number of switches = ceil(total sectors / sectors-per-track) \u2212 1 for sequential access across boundaries.\n\u2022 Disk capacity = (number of surfaces) \u00d7 (tracks per surface) \u00d7 (sectors per track) \u00d7 (bytes per sector).\n\nWORKED EXAMPLE 1 (DMA cycle stealing, CPU time penalty)\nA DMA controller transfers data from a disk to memory at a rate of 2 \u00d7 10^6 words/second (2 MB/s effectively, one word per cycle). The main memory cycle time is 200 ns, so memory can perform 1 / (200\u00d710^-9) = 5 \u00d7 10^6 cycles/second. Fraction of memory cycles stolen by DMA = (2\u00d710^6) / (5\u00d710^6) = 0.4 = 40%. If, without DMA activity, a certain CPU task takes 10 ms of pure computation using memory continuously, then with DMA active and stealing 40% of memory cycles, the effective time for that task = 10 ms / (1 \u2212 0.4) = 10 / 0.6 \u2248 16.67 ms. This shows the CPU task is slowed to about 1.67\u00d7 its original duration purely due to memory-cycle contention with the DMA controller, even though the CPU itself never executes a single extra instruction for the transfer.\n\nWORKED EXAMPLE 2 (disk service time)\nA disk rotates at 6000 RPM, has 500 sectors per track, and an average seek time of 8 ms. One revolution takes 60/6000 = 0.01 s = 10 ms. Average rotational latency = 10/2 = 5 ms. Transfer time per sector = 10 ms / 500 = 0.02 ms. To read a single random sector: Service time = Seek + Rotational latency + Transfer = 8 + 5 + 0.02 = 13.02 ms. To instead sequentially read 1200 sectors starting from a random position (so still paying the initial seek + average rotational latency once): the 1200 sectors span ceil(1200/500) = 3 tracks, requiring 2 track switches; assume negligible/zero switch overhead if not stated. Total = 8 + 5 + (1200 \u00d7 0.02) = 13 + 24 = 37 ms. (If a head-switch time were given, e.g. 1 ms, it would add 2 \u00d7 1 = 2 ms more, giving 39 ms \u2014 always check whether the question supplies a switch-time parameter before assuming zero.)\n\nGATE TRAPS\n\u2022 Confusing DMA \"cycle stealing\" (brief per-cycle bus grants interleaved with CPU use, most common assumption) with DMA \"burst/block mode\" (DMA holds the bus for the WHOLE transfer, fully blocking the CPU for that duration) \u2014 the CPU-time-penalty formula differs conceptually between the two, and the question wording usually signals which mode applies.\n\u2022 Forgetting that average rotational latency is HALF a revolution, not a full revolution \u2014 a very common factor-of-2 slip.\n\u2022 Using RPM directly in seconds without converting (RPM is per MINUTE) \u2014 always compute time per revolution as 60/RPM to get seconds, not 1/RPM.\n\u2022 In multi-track sequential disk-read problems, forgetting to count head/track switches separately from the raw per-sector transfer time, or off-by-one errors in \"number of switches = number of tracks touched \u2212 1\".\n\u2022 Assuming vectored interrupts still require the CPU to poll every device \u2014 vectoring is specifically the technique that AVOIDS the polling loop by letting the device (or a vector table indexed by device ID) supply the ISR address directly.\n\u2022 Treating interrupt-driven I/O as having zero CPU overhead like DMA \u2014 interrupt-driven I/O still requires the CPU to execute the ISR and move each unit of data itself; only DMA offloads the actual data movement from the CPU entirely.\n\u2022 In cycle-stealing percentage problems, dividing DMA rate by CPU clock rate instead of by MEMORY cycle rate \u2014 the contention is specifically for memory bus cycles, not CPU instruction cycles, and using the wrong denominator gives a wrong fraction.";

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-instructions';}).questions.push(
  {
    id: 'coa-instructions-y1',
    q: 'Which of the following statements about addressing modes are TRUE? (Select ALL that apply)',
    options: [
      'In register indirect addressing, the effective address is the content of the specified register.',
      'In immediate addressing, the operand itself is present in the instruction, so no memory access is needed to fetch the operand.',
      'In indexed addressing, the effective address is computed by adding the content of an index register to a base address or displacement given in the instruction.',
      'Direct (absolute) addressing requires strictly more memory accesses to fetch the operand than indirect addressing.'
    ],
    answers: [0, 1, 2],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: register indirect addressing uses the register purely as a pointer, so EA = content of the register, and a further memory access at that address fetches the operand. Option 2 is true: immediate addressing embeds the operand value itself in the instruction word, so it is available the instant the instruction is fetched, with zero additional memory accesses. Option 3 is true: indexed addressing adds an index register to a base/displacement field to form the effective address, which is exactly how array-element access is implemented. Option 4 is FALSE and reversed: direct addressing needs exactly one memory access (read the operand at the address named in the instruction), while indirect addressing needs two (read the pointer at the named address, then read the operand at that pointer) — so it is indirect, not direct, that costs the extra access.'
  },
  {
    id: 'coa-instructions-y2',
    q: 'Which of the following statements about expanding-opcode instruction formats are TRUE? (Select ALL that apply)',
    options: [
      'Expanding opcode formats allow instructions with different numbers of address fields to coexist within one fixed overall instruction length.',
      'The number of one-address instructions obtainable from k unused two-address opcode patterns, each contributing one remaining n-bit address field, is k × 2^n.',
      'Expanding-opcode design typically assigns shorter opcodes to the LESS frequently used instructions, to save the most memory overall.',
      'If m of the 2^p total opcode patterns at a given field width are already assigned, the number of patterns still available for further expansion is 2^p − m.'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: this is the entire purpose of expanding opcodes — reserve some short opcode patterns for instructions needing more address fields and expand the remaining patterns into longer opcodes for instructions needing fewer, all within one fixed instruction width. Option 2 is true and matches the standard counting rule: each of the k unused patterns can be extended by one full n-bit field, giving 2^n new codes per pattern, hence k × 2^n total. Option 3 is FALSE and backwards: the Huffman-style principle behind expanding opcodes assigns the SHORTEST opcodes to the MOST frequently used instructions (minimizing average code length/decoding cost), not the least frequent ones. Option 4 is true by simple counting: of 2^p total patterns, m are already used, leaving 2^p − m free to expand into longer formats.'
  },
  {
    id: 'coa-instructions-y3',
    q: 'Which of the following statements about a zero-address (stack-based) instruction set are TRUE? (Select ALL that apply)',
    options: [
      'Operands for zero-address instructions are implicitly taken from the top of the stack, and results are pushed back onto the stack.',
      'A zero-address instruction set still requires an explicit register or memory address to be encoded for every arithmetic operand.',
      'Evaluating an arithmetic expression on a zero-address machine is naturally suited to postfix (reverse Polish) notation.',
      'For a given expression, a stack-based (zero-address) machine typically needs at least as many instructions as an equivalent three-address machine, since every operand needs an explicit PUSH and the result an explicit POP.'
    ],
    answers: [0, 2, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: arithmetic operators on a stack machine implicitly pop their operands from the top of the stack and push the result back — that is the defining behaviour of a zero-address design. Option 2 is FALSE and self-contradictory: the entire point of "zero-address" is that arithmetic instructions carry NO operand address fields at all; operands are located purely by stack position. Option 3 is true: postfix notation matches stack evaluation exactly (each operand is pushed as encountered, each operator pops and combines), which is why compilers targeting stack machines emit postfix-derived code. Option 4 is true: three-address code can share/reuse registers across sub-expressions in a single instruction, while a stack machine must explicitly PUSH every operand and POP the final result, generally needing at least as many instructions (often more) for the same expression, as seen by comparing the 6 three-/two-address instructions against the 8 needed on a stack machine for a similar expression.'
  },
  {
    id: 'coa-instructions-y4',
    q: 'A machine uses 16-bit instructions with a 4-bit opcode field and two 6-bit address fields for two-address instructions (4 + 6 + 6 = 16 bits). If 12 of the 16 possible opcode patterns are used for two-address instructions, what is the maximum number of one-address instructions obtainable by expanding the unused opcode patterns into one of the freed 6-bit address fields? (Enter your numerical answer.)',
    options: [],
    answer: 256,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The 4-bit opcode field gives 2^4 = 16 total patterns. Two-address instructions consume 12 of them, leaving 16 − 12 = 4 unused patterns. Each unused pattern can absorb one of its two freed 6-bit address fields to create new, longer one-address opcodes, yielding 2^6 = 64 one-address instructions per unused pattern. Maximum count = 4 × 64 = 256. The remaining 6-bit field still serves as the single address of each new instruction. The common slip is multiplying by 16 (the full opcode space) instead of the 4 actually-unused patterns, or using 2^12 instead of 2^6 by forgetting only one field is being absorbed.'
  },
  {
    id: 'coa-instructions-y5',
    q: 'An instruction set has 150 distinct opcodes and uses a three-address, register-to-register format with 64 general-purpose registers available for each register field. What is the minimum instruction length in bits, with no padding or byte-alignment rounding applied? (Enter your numerical answer.)',
    options: [],
    answer: 26,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Opcode bits needed = ceil(log2 150). Since 2^7 = 128 < 150 ≤ 2^8 = 256, the opcode field needs 8 bits. Each register field needs ceil(log2 64) = 6 bits (2^6 = 64 exactly matches the register count). A three-address format has three such register fields, needing 3 × 6 = 18 bits. Total minimum length = 8 (opcode) + 18 (three register fields) = 26 bits. The frequent error is rounding opcode bits down to 7 (since 128 is "close" to 150) instead of up, or forgetting that three-address format needs three separate register fields, not one.'
  },
  {
    id: 'coa-instructions-y6',
    q: 'For the expression X = (A + B) × (C − D) on a two-address machine (each two-address ADD/SUB/MUL instruction of the form OP R,S computes R = R op S, overwriting R), using MOV, ADD, SUB, MUL and two scratch registers, what is the minimum number of instructions required? (Enter your numerical answer.)',
    options: [],
    answer: 6,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Sequence: MOV R1,A; ADD R1,B (R1 = A+B); MOV R2,C; SUB R2,D (R2 = C−D); MUL R1,R2 (R1 = (A+B)×(C−D)); MOV X,R1 — six instructions total. Each sub-expression (A+B) and (C−D) must first be loaded into its own register with a MOV, since a two-address arithmetic instruction destroys one of its two operands and a memory location cannot generally serve as the destination of the running computation. The final MUL combines the two registers, and a final MOV stores the result to X. Forgetting either of the two initial MOVs (treating a memory operand as if it were already in a register) or the closing store are the usual sources of an undercount.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-datapath';}).questions.push(
  {
    id: 'coa-datapath-y1',
    q: 'Which of the following statements about hardwired versus microprogrammed control are TRUE? (Select ALL that apply)',
    options: [
      'Hardwired control is generally faster than microprogrammed control, since it uses fixed combinational/sequential logic with no control-store access step.',
      'Microprogrammed control makes it easier to modify or extend an instruction set, because changes are made to stored microcode rather than to hardware logic.',
      'Horizontal microinstructions require a decoder to translate encoded fields into individual control signals.',
      'A vertical microinstruction format is narrower (uses fewer bits per word) than an equivalent horizontal format, because its control signals are encoded rather than given one dedicated bit each.'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: hardwired logic reacts in a few gate delays, while microprogrammed control must additionally fetch and often decode a microinstruction from the control store every cycle, making it inherently slower. Option 2 is true: extending or fixing an instruction is a matter of rewriting microcode entries in the control store, not redesigning combinational logic, which is exactly why complex CISC instruction sets favour microprogramming. Option 3 is FALSE and reversed: horizontal microinstructions give one dedicated bit per control signal (no encoding, hence no decoder needed, but very wide words); it is the VERTICAL format that encodes signals like a mini-opcode and therefore needs a decoder. Option 4 is true: because vertical microinstructions encode groups of mutually-exclusive control signals into small fields, the word is narrower than the unencoded horizontal format, at the cost of decode delay and reduced parallelism.'
  },
  {
    id: 'coa-datapath-y2',
    q: 'Which of the following statements about Booth\'s algorithm are TRUE? (Select ALL that apply)',
    options: [
      'A (Q0, Q−1) bit pair of (0, 1) causes the multiplicand to be added to the running partial product before the shift.',
      'A (Q0, Q−1) bit pair of (1, 0) causes the multiplicand to be subtracted from the running partial product before the shift.',
      'The shift performed after each step is a logical shift right, which always inserts a 0 into the most significant bit of the accumulator.',
      'Booth\'s algorithm is used specifically because it multiplies signed (two\'s complement) numbers directly, including negative operands, without separate sign-handling logic.'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: a 01 pattern signals the start of a run of 1s in the multiplier, so the multiplicand is added at that boundary. Option 2 is true: a 10 pattern signals the end of a run of 1s, so the multiplicand is subtracted at that boundary. Option 3 is FALSE: the shift used is an ARITHMETIC shift right, which duplicates (sign-extends) the current MSB rather than always inserting 0 — a logical shift would corrupt the sign of negative partial products, which Booth\'s algorithm must preserve. Option 4 is true: this is precisely Booth\'s algorithm\'s main advantage — it handles two\'s complement multiplicands and multipliers of either sign uniformly, without a separate sign-correction pass, unlike naive unsigned shift-and-add multiplication.'
  },
  {
    id: 'coa-datapath-y3',
    q: 'Which of the following statements about ALU adder circuits are TRUE? (Select ALL that apply)',
    options: [
      'A full adder computes Sum = A XOR B XOR Cin.',
      'A full adder computes Cout = AB + BCin + ACin, the majority function of A, B, and Cin.',
      'A ripple-carry adder\'s worst-case propagation delay is independent of the number of bits, since every bit position computes its sum and carry in parallel.',
      'A carry-look-ahead adder computes all carries in parallel using generate and propagate signals, reducing delay compared to a ripple-carry adder of the same width.'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: this is the standard Boolean expression for the sum output of a full adder. Option 2 is true: Cout is 1 whenever at least two of A, B, Cin are 1, which is exactly the majority function AB + BCin + ACin. Option 3 is FALSE: in a ripple-carry adder each stage must wait for the carry-out of the previous stage, so the worst-case delay grows linearly with the number of bits (it is emphatically NOT parallel across bit positions) — this serial carry propagation is precisely the bottleneck that motivates faster adder designs. Option 4 is true: carry-look-ahead adders precompute generate (Gi = AiBi) and propagate (Pi = Ai XOR Bi) signals for every bit position simultaneously and combine them to produce all carries without waiting for a ripple, cutting delay at the cost of extra gates.'
  },
  {
    id: 'coa-datapath-y4',
    q: 'A microprogrammed control unit must store 300 distinct microinstructions. Each microinstruction contains 28 control-signal bits plus a next-address field sized just large enough to address any of the 300 microinstructions. What is the total control store size in bits? (Enter your numerical answer.)',
    options: [],
    answer: 11100,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'The next-address field must be ceil(log2 300) bits wide. Since 2^8 = 256 < 300 ≤ 2^9 = 512, the field needs 9 bits. Total microinstruction width = 28 (control-signal bits) + 9 (address bits) = 37 bits. Total control store size = (number of microinstructions) × (width) = 300 × 37 = 11100 bits. The common trap is assuming a round address-field size such as 8 bits without checking that 2^8 = 256 is insufficient to address all 300 locations, or forgetting to add the address-field width to the given control-signal-bit count before multiplying by the instruction count.'
  },
  {
    id: 'coa-datapath-y5',
    q: 'Using Booth\'s algorithm to multiply the multiplicand M = 5 (0101 in 4-bit two\'s complement) by the multiplier Q = −4 (1100 in 4-bit two\'s complement), how many add/subtract operations on the accumulator A are actually performed across all 4 steps (a step whose bit pair is 00 or 11 performs no arithmetic operation)? (Enter your numerical answer.)',
    options: [],
    answer: 1,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'Trace with A = 0000, Q = 1100, Q−1 = 0 initially. Step 1: (Q0,Q−1) = (0,0) → no operation; arithmetic-shift-right the triple gives A = 0000, Q = 0110, Q−1 = 0. Step 2: (Q0,Q−1) = (0,0) → no operation; shift gives A = 0000, Q = 0011, Q−1 = 0. Step 3: (Q0,Q−1) = (1,0) → subtract M: A = 0000 − 0101 = 1011 (one arithmetic operation); shift gives A = 1101, Q = 1001, Q−1 = 1. Step 4: (Q0,Q−1) = (1,1) → no operation; shift gives A = 1110, Q = 1100. Only step 3 performed an actual add/subtract, so the count is 1. As a sanity check, the final product (A,Q) = 1110 1100 in 8-bit two\'s complement equals −20, which correctly matches 5 × (−4) = −20, confirming the trace was done correctly even though just a single subtraction was needed.'
  },
  {
    id: 'coa-datapath-y6',
    q: 'A hardwired control unit\'s datapath has the following register-transfer path delays that must complete within a single control step: ALU propagation delay 8 ns, multiplexer select delay 2 ns, bus delay 1 ns, and register setup time 1 ns. If an instruction requires 5 such control steps to complete, and the clock period is set to accommodate the worst-case single-step delay, what is the total execution time (in ns) for one instruction? (Enter your numerical answer.)',
    options: [],
    answer: 60,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'The clock period must be at least as long as the sum of all delays that must complete within one control step: 8 + 2 + 1 + 1 = 12 ns. This is the standard rule that the clock period equals the worst-case combinational path delay between clocked registers, not any single component in isolation. With 5 control steps needed to complete the instruction, total execution time = (number of control steps) × (clock period) = 5 × 12 = 60 ns. A common error is using only the largest individual delay (8 ns) as the clock period instead of summing all delays that occur serially within one control step.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-pipelining';}).questions.push(
  {
    id: 'coa-pipelining-y1',
    q: 'Which of the following statements about hazards in a simple 5-stage in-order pipeline (single write-back stage, in-order issue and completion) are TRUE? (Select ALL that apply)',
    options: [
      'A RAW (Read After Write) hazard can occur when an instruction needs a register value that an earlier, not-yet-completed instruction has not yet produced.',
      'A WAR (Write After Read) hazard can occur in this simple in-order pipeline because instructions may read their source registers out of program order.',
      'A structural hazard arises when two instructions in different pipeline stages require the same hardware resource in the same clock cycle.',
      'A control hazard arises because the branch outcome and target address may not be known until several stages after the branch is fetched.'
    ],
    answers: [0, 2, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: this is the defining RAW/true-dependency hazard, the only hazard type that reflects a genuine program dependency. Option 2 is FALSE: in a simple in-order pipeline where every instruction reads its operands in the same relative stage and writes back in the same relative (later) stage, in program order, a later instruction can never read a register before an earlier instruction that is still ahead of it has read its own — WAR hazards require reads and writes to complete out of program order, which cannot happen here. Option 3 is true: this is the standard definition of a structural hazard, e.g., a shared single memory port needed by both instruction fetch and a data access in the same cycle. Option 4 is true: control hazards exist precisely because branch resolution typically happens in a later stage than fetch, leaving the fetch stage uncertain about which instruction to fetch next.'
  },
  {
    id: 'coa-pipelining-y2',
    q: 'Which of the following statements about forwarding (bypassing) in a pipelined datapath are TRUE? (Select ALL that apply)',
    options: [
      'Forwarding routes a result directly from a pipeline stage\'s output latch to an earlier stage\'s input, without waiting for a register-file write and subsequent read.',
      'With full EX/MEM-to-EX and MEM/WB-to-EX forwarding paths, a load-use hazard in a classic 5-stage pipeline can always be completely eliminated with zero stall cycles.',
      'MEM/WB-to-EX forwarding supplies a value produced by the instruction two positions earlier in program order to the instruction currently in the EX stage.',
      'Forwarding alone is sufficient to make WAR and WAW hazards impossible in any pipelined processor, including out-of-order designs.'
    ],
    answers: [0, 2],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: this is the definition of forwarding/bypassing — it exists specifically to skip the register-file round trip. Option 2 is FALSE: a LOAD produces its result only at the end of the MEM stage, but an immediately following dependent instruction needs that value at the start of its own EX stage, one cycle earlier than any forwarding path can deliver it — exactly one stall cycle remains unavoidable in the classic 5-stage design unless the compiler fills the slot with independent work. Option 3 is true: EX/MEM-to-EX forwarding covers the immediately preceding instruction, while MEM/WB-to-EX forwarding covers the instruction two positions earlier. Option 4 is FALSE: forwarding is a data-hazard mitigation technique for RAW dependencies in the pipeline\'s normal data path; WAR and WAW hazards are a separate concern that arises specifically in out-of-order or multi-write-port designs, and forwarding paths do not by themselves prevent those from existing in such designs.'
  },
  {
    id: 'coa-pipelining-y3',
    q: 'Which of the following statements about control-hazard handling techniques are TRUE? (Select ALL that apply)',
    options: [
      'Under a predict-not-taken scheme, a pipeline penalty is incurred only when the branch turns out to actually be taken.',
      'Under a predict-taken scheme, a pipeline penalty is incurred only when the branch turns out to actually not be taken (i.e., on misprediction).',
      'Delayed branching relies on the compiler filling the delay slot(s) after a branch with instruction(s) that must execute regardless of the branch outcome.',
      'Simply stalling the pipeline until every branch resolves has zero performance cost, since the pipeline remains fully utilized during the wait.'
    ],
    answers: [0, 1, 2],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: predict-not-taken speculatively fetches the fall-through path, so a penalty (flush) only occurs when the branch is actually taken and the speculation was wrong. Option 2 is true: predict-taken speculatively fetches from the branch target, so a penalty only occurs when the branch is not taken after all. Option 3 is true: this is exactly how delayed branching hides part of the control hazard — useful independent work is scheduled into the slot(s) that execute unconditionally. Option 4 is FALSE: stalling until resolution means the pipeline fetches no useful new instructions for that many cycles — those cycles are pure lost throughput (the branch penalty), not full utilization.'
  },
  {
    id: 'coa-pipelining-y4',
    q: 'A processor has an 8-stage pipeline. It executes 200 instructions with no stalls. What is the total pipelined execution time, measured in clock cycles? (Enter your numerical answer.)',
    options: [],
    answer: 207,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Ideal (no-stall) pipelined execution time for n instructions on a k-stage pipeline is (k + n − 1) cycles: the first instruction takes k cycles to clear all stages, and thereafter one additional instruction completes every subsequent cycle. Here k = 8, n = 200, so total = 8 + 200 − 1 = 207 cycles. The common error is using k × n (500 × ... no, 8×200=1600, the fully sequential non-pipelined figure) instead of the pipelined formula, or forgetting the "−1" and reporting 208.'
  },
  {
    id: 'coa-pipelining-y5',
    q: 'A 5-stage pipelined CPU has a base CPI of 1. 20% of all instructions are load instructions immediately followed by a dependent instruction, each incurring exactly 1 stall cycle (load-use hazard), and 5% of all instructions are taken branches incurring exactly 1 stall cycle each. The equivalent non-pipelined machine has a CPI of 5, and both machines use the same clock period. What is the resulting speedup of the pipelined machine over the non-pipelined machine? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'CPIpipelined = base CPI + stall contributions = 1 + (0.20 × 1) + (0.05 × 1) = 1 + 0.20 + 0.05 = 1.25. Since both machines share the same clock period, Speedup = CPInon-pipelined / CPIpipelined = 5 / 1.25 = 4. This is the standard two-step GATE computation: first build up CPIpipelined from every hazard\'s frequency times its per-occurrence penalty, then divide the reference (non-pipelined) CPI by it. Forgetting to add both hazard contributions (using only one of the two 20%/5% terms) is the usual source of error.'
  },
  {
    id: 'coa-pipelining-y6',
    q: 'In a classic 5-stage pipeline (IF, ID, EX, MEM, WB) with full forwarding implemented (EX/MEM-to-EX and MEM/WB-to-EX), a LOAD instruction is immediately followed in program order by an ADD instruction that uses the loaded register as a source operand. How many stall (bubble) cycles must be inserted before the ADD can proceed through EX? (Enter your numerical answer.)',
    options: [],
    answer: 1,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'The LOAD\'s value is only available at the end of its MEM stage. The immediately following ADD needs that value at the start of its own EX stage, which — with no stall — would occur one cycle before the LOAD\'s MEM stage completes. Even with full forwarding available, this exact one-cycle gap (the "load-use hazard") cannot be closed by any forwarding path, since there is nothing yet computed to forward earlier; exactly one stall cycle must be inserted (unless the compiler reorders code to fill it with independent work), after which MEM/WB or EX/MEM forwarding delivers the value in time.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-memory';}).questions.push(
  {
    id: 'coa-memory-y1',
    q: 'Which of the following statements about cache mapping schemes are TRUE? (Select ALL that apply)',
    options: [
      'In a direct-mapped cache, each main-memory block maps to exactly one specific cache line, determined by the block\'s index bits.',
      'A fully associative cache has no index field at all; the entire address portion beyond the block offset serves as the tag.',
      'An n-way set-associative cache reduces to a direct-mapped cache when n = 1, and reduces to a fully associative cache when the number of sets equals 1.',
      'For a fixed total cache size and fixed block size, increasing the associativity increases the number of sets in the cache.'
    ],
    answers: [0, 1, 2],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: direct mapping computes a fixed line index from the address, so every block that maps there must use that exact line, causing conflict misses when multiple blocks collide. Option 2 is true: fully associative placement allows a block to occupy any line, so there is no index field — the full remaining address is the tag, searched associatively across all lines. Option 3 is true: direct-mapped and fully associative are the two extreme special cases of n-way set-associative mapping (n = 1 and number-of-sets = 1 respectively). Option 4 is FALSE and reversed: for fixed cache size and block size, number of sets = (cache size / block size) / n, so INCREASING n (associativity) DECREASES the number of sets, not increases it — it increases the number of lines grouped per set instead.'
  },
  {
    id: 'coa-memory-y2',
    q: 'Which of the following statements about cache write policies are TRUE? (Select ALL that apply)',
    options: [
      'Write-through updates both the cache and main memory on every single write, keeping main memory always consistent with the cache.',
      'Write-back marks a modified cache line as dirty and defers writing it to main memory until that line is evicted.',
      'For a write-heavy workload with good locality (many repeated writes to the same block before eviction), write-through typically generates LESS total memory-bus traffic than write-back.',
      'Write-allocate (fetch-on-write-miss) is typically paired with write-back, while no-write-allocate (write-around) is typically paired with write-through.'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: this is the definition of write-through, guaranteeing memory consistency at the cost of traffic on every write. Option 2 is true: this is the definition of write-back — traffic to memory happens only at eviction, and only if the dirty bit is set. Option 3 is FALSE and backwards: with good locality, a block absorbs many writes in the cache before eventually being written back just once under write-back, whereas write-through pushes every single one of those writes to memory immediately — write-back generates dramatically LESS traffic in exactly this scenario. Option 4 is true: write-allocate brings the block into the cache on a write miss so subsequent writes hit in the cache (pairing naturally with write-back\'s deferred-traffic philosophy), while no-write-allocate sends the write straight to memory without caching it (pairing naturally with write-through, which is already going to memory on every write regardless).'
  },
  {
    id: 'coa-memory-y3',
    q: 'Which of the following statements about cache replacement policies are TRUE? (Select ALL that apply)',
    options: [
      'LRU (Least Recently Used) evicts the line that has gone unused for the longest time, requiring extra recency-tracking hardware/bits per set.',
      'FIFO evicts the oldest-loaded line in the set, regardless of how recently it was actually accessed.',
      'Belady\'s optimal (MIN) replacement algorithm is directly implementable in real online hardware because it only needs the recent access history, not future accesses.',
      'Random replacement is generally the most expensive of LRU, FIFO, and Random to implement in hardware.'
    ],
    answers: [0, 1],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: LRU exploits temporal locality by tracking recency, but that tracking cost (counters or stack bits per set) grows with associativity. Option 2 is true: FIFO simply evicts based on load order, ignoring subsequent accesses entirely, which is why it can sometimes evict a heavily-reused line. Option 3 is FALSE: Belady\'s MIN algorithm evicts the line that will NOT be used for the longest time in the FUTURE — this requires knowledge of the future reference sequence, which is not available online, so it serves only as a theoretical lower-bound benchmark, never an implementable real policy. Option 4 is FALSE and reversed: random replacement needs no recency or order tracking at all, making it the CHEAPEST of the three to implement, while LRU is the most expensive due to its tracking hardware.'
  },
  {
    id: 'coa-memory-y4',
    q: 'A two-level cache system has: L1 hit time = 2 ns, L1 local miss rate = 8%; L2 hit time = 15 ns, L2 local miss rate = 25% (of requests that reach L2); main memory access time = 100 ns. What is the Average Memory Access Time (AMAT) in ns? (Enter your numerical answer.)',
    options: [],
    answer: 5.2,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    tolerance: 0.05,
    explanation: 'AMAT = L1 hit time + L1 miss rate × (L2 hit time + L2 local miss rate × Main memory time) = 2 + 0.08 × (15 + 0.25 × 100) = 2 + 0.08 × (15 + 25) = 2 + 0.08 × 40 = 2 + 3.2 = 5.2 ns. The L2 miss rate used here must be the LOCAL rate (misses among requests that already missed L1), not the global rate; using the global rate (0.08 × 0.25 = 0.02) directly against main memory time alone, while skipping the L2 hit-time term, is the usual error that produces a wrong lower figure.'
  },
  {
    id: 'coa-memory-y5',
    q: 'A byte-addressable main memory is 1 GB (2^30 bytes). A direct-mapped cache has a total size of 64 KB (2^16 bytes) with a block size of 32 bytes (2^5 bytes). How many tag bits are in each cache line\'s address partition? (Enter your numerical answer.)',
    options: [],
    answer: 14,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Total address width = log2(2^30) = 30 bits. Offset bits o = log2(block size) = log2(32) = 5. Number of cache lines = cache size / block size = 2^16 / 2^5 = 2^11 = 2048, so index bits i = log2(2048) = 11. Tag bits t = total address bits − index bits − offset bits = 30 − 11 − 5 = 14. Address layout check: 14 + 11 + 5 = 30 ✓. A common mistake is using the cache size directly as if it were the number of lines (forgetting to divide by block size first) when computing the index-bit count.'
  },
  {
    id: 'coa-memory-y6',
    q: 'A CPU\'s L1 cache has a miss rate of 5% (fraction of all CPU memory references that miss L1). Of those L1 misses, the L2 cache\'s local miss rate is 40% (fraction of L1-miss requests that also miss L2). What is the GLOBAL miss rate of L2, expressed as a percentage of ALL original CPU memory references (e.g., enter 5 to mean 5%)? (Enter your numerical answer.)',
    options: [],
    answer: 2,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Global L2 miss rate = L1 miss rate × L2 local miss rate = 0.05 × 0.40 = 0.02 = 2% of all original CPU references miss both L1 and L2. The trap here is confusing this global figure with the given local figure (40%) — the local rate is relative only to requests that ALREADY missed L1, while the global rate is relative to the entire original reference stream, and the two are related by exactly this multiplication, never by addition or by using either rate alone.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-io';}).questions.push(
  {
    id: 'coa-io-y1',
    q: 'Which of the following statements comparing programmed I/O, interrupt-driven I/O, and DMA are TRUE? (Select ALL that apply)',
    options: [
      'Programmed I/O requires the CPU to busy-wait (poll) a device status bit before it can transfer each data item.',
      'Interrupt-driven I/O allows the CPU to perform other useful work between successive data transfers, unlike pure programmed I/O.',
      'DMA still requires the CPU itself to move every individual data word between the device and memory, exactly as in programmed I/O.',
      'DMA typically interrupts the CPU only once, at the completion of an entire block transfer, rather than once per transferred word.'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: programmed I/O\'s defining trait is the CPU actively spinning on a status/ready bit before every single transfer. Option 2 is true: interrupt-driven I/O frees the CPU to execute other instructions until the device signals readiness, which is precisely its advantage over busy-waiting programmed I/O. Option 3 is FALSE: DMA\'s entire purpose is to offload data movement to a dedicated DMA controller, which drives the buses directly between device and memory without CPU involvement in each word\'s transfer — the CPU only sets up the transfer beforehand. Option 4 is true: the DMA controller notifies the CPU with a single interrupt only when the whole programmed block transfer is complete, drastically reducing interrupt overhead compared to interrupting once per word.'
  },
  {
    id: 'coa-io-y2',
    q: 'Which of the following statements about interrupt mechanisms are TRUE? (Select ALL that apply)',
    options: [
      'In vectored interrupts, the interrupting device itself supplies, or is used to directly look up, the address of its own interrupt service routine.',
      'In non-vectored interrupts, all interrupt sources share one fixed common entry address, and software must then poll devices in priority order to find the actual source.',
      'Interrupt latency depends only on the time to jump to the ISR address and never depends on finishing the currently executing instruction.',
      'Daisy-chaining and vectored-priority schemes are hardware techniques used to resolve priority among multiple simultaneous interrupt requests.'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: vectoring specifically means the device identifies its own ISR address (directly or via a small vector table), avoiding a software search. Option 2 is true: without vectoring, every interrupt lands at the same fixed handler, which must then poll each device in a fixed priority order to determine who actually requested service. Option 3 is FALSE: interrupt latency includes the time for the CPU to finish (or at least reach a safe boundary in) its current instruction and save the necessary state before it can even begin jumping to the ISR — it is not simply the jump time alone. Option 4 is true: both are hardware-arbitration mechanisms specifically designed to grant/acknowledge the highest-priority pending interrupt request when several arrive together.'
  },
  {
    id: 'coa-io-y3',
    q: 'Which of the following statements about DMA-based data transfer are TRUE? (Select ALL that apply)',
    options: [
      'In cycle stealing, the DMA controller takes individual memory bus cycles only when the CPU is not using the bus, or by briefly delaying the CPU cycle by cycle.',
      'In burst/block mode DMA, the controller holds the memory bus for the entire transfer\'s duration, fully blocking ordinary CPU-memory accesses during that period.',
      'The fraction of memory bandwidth consumed by a cycle-stealing DMA controller is computed by dividing the DMA transfer rate by the CPU\'s instruction execution clock rate.',
      'Effective CPU execution time increases under active DMA cycle stealing, because a fraction of the memory cycles the CPU needs are instead consumed by the DMA controller.'
    ],
    answers: [0, 1, 3],
    marks: 2,
    difficulty: 'medium',
    type: 'concept',
    explanation: 'Option 1 is true: this is the defining behaviour of cycle stealing — fine-grained, per-cycle bus sharing rather than a long exclusive hold. Option 2 is true: burst/block mode trades CPU responsiveness for transfer speed by holding the bus continuously until the whole block completes. Option 3 is FALSE: the correct denominator is the MEMORY cycle rate (1 / memory cycle time), since the contention being measured is specifically for memory bus cycles, not for CPU instruction-execution cycles — using the CPU clock rate gives a physically wrong fraction. Option 4 is true: every memory cycle taken by the DMA controller is one the CPU\'s own instruction stream cannot use that cycle, stretching out the CPU\'s effective execution time proportionally to the fraction of cycles stolen.'
  },
  {
    id: 'coa-io-y4',
    q: 'A DMA controller transfers data at a rate of 2 × 10^6 words per second, consuming exactly one memory cycle per word transferred. The main memory cycle time is 100 ns. If a CPU task would take 20 ms of computation with no DMA activity, what is the effective time (in ms) for that task while the DMA transfer is active? (Enter your numerical answer.)',
    options: [],
    answer: 25,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    explanation: 'Memory can perform 1 / (100 × 10^-9 s) = 1 × 10^7 cycles per second. Fraction of memory cycles stolen by DMA = (2 × 10^6) / (1 × 10^7) = 0.2 = 20%. Effective CPU task time = original time / (1 − fraction stolen) = 20 ms / (1 − 0.2) = 20 / 0.8 = 25 ms. The frequent slip is dividing by the CPU\'s own clock rate instead of the memory cycle rate, or forgetting to divide by (1 − fraction) and instead simply adding the fraction\'s worth of extra time.'
  },
  {
    id: 'coa-io-y5',
    q: 'A disk rotates at 6000 RPM, has 400 sectors per track, and has an average seek time of 6 ms. What is the average service time (in ms) to read one randomly located sector, counting seek time plus average rotational latency plus the transfer time for that single sector? (Enter your numerical answer.)',
    options: [],
    answer: 11.025,
    kind: 'nat',
    marks: 2,
    difficulty: 'medium',
    type: 'numerical',
    tolerance: 0.01,
    explanation: 'Time for one full revolution = 60 / RPM = 60 / 6000 = 0.01 s = 10 ms. Average rotational latency = half a revolution = 10 / 2 = 5 ms. Transfer time per sector = (time per revolution) / (sectors per track) = 10 ms / 400 = 0.025 ms. Total service time = seek + rotational latency + transfer = 6 + 5 + 0.025 = 11.025 ms. A common slip is forgetting the average rotational latency is HALF a revolution (using the full 10 ms instead of 5 ms), or converting RPM to seconds incorrectly by using 1/RPM instead of 60/RPM.'
  },
  {
    id: 'coa-io-y6',
    q: 'An interrupt-driven I/O scheme incurs a fixed overhead of 200 CPU cycles per interrupt (covering state save, dispatch to the ISR, and state restore), and the device generates exactly one interrupt per word transferred. To transfer a block of 5000 words this way, how many CPU cycles are spent purely on interrupt overhead (excluding the cycles used for the actual data-movement instructions inside each ISR)? (Enter your numerical answer.)',
    options: [],
    answer: 1000000,
    kind: 'nat',
    marks: 1,
    difficulty: 'easy',
    type: 'numerical',
    explanation: 'Each of the 5000 words triggers one interrupt, and each interrupt costs a fixed 200 cycles of pure overhead (independent of the data-movement instructions themselves). Total overhead = 5000 × 200 = 1,000,000 cycles. This stark number is exactly why interrupt-driven I/O is unattractive for very frequent, small transfers compared to DMA, which would incur this per-event overhead only once for the entire block rather than once per word.'
  }
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-pipelining';}).questions.push(
  {
    id: 'coa-pipelining-z7',
    q: 'A 5-stage pipelined processor (clock period 2 ns) has a base CPI of 1. Its L1 instruction cache has a miss rate of 4%, and every I-cache miss stalls the pipeline for 20 extra cycles (miss penalty). Separately, 10% of instructions are taken branches with a 2-cycle penalty each under predict-not-taken. What is the average time (in ns) to execute one instruction? (Enter your numerical answer.)',
    options: [],
    answer: 4,
    kind: 'nat',
    marks: 2,
    difficulty: 'hard',
    type: 'numerical',
    explanation: 'This combines a cache-miss-driven CPI penalty with a branch-hazard CPI penalty into one effective CPI. I-cache miss contribution to CPI = miss rate × miss penalty = 0.04 × 20 = 0.80. Branch contribution to CPI = branch frequency × branch penalty = 0.10 × 2 = 0.20. Effective CPI = base CPI + cache contribution + branch contribution = 1 + 0.80 + 0.20 = 2.00. Average execution time per instruction = CPI × clock period = 2.00 × 2 ns = 4.00 ns. The trap is forgetting to add BOTH penalty sources into the same CPI before multiplying by the clock period, or multiplying each penalty by the clock period separately and then mismanaging the base-CPI term.'
  }
);


window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-pipelining';}).questions.push(
{
  id: 'coa-pipelining-v1',
  q: 'A system enhancement is applicable to 60% of the execution time (f = 0.6) and, when it applies, speeds up that fraction of the work by a factor of s = 4. Using Amdahl\'s Law, Speedup = 1 / ((1 - f) + f/s), what is the overall speedup? (Enter your numerical answer, correct to two decimal places.)',
  options: [],
  answer: 1.82,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'Amdahl\'s Law states that if a fraction f of a program\'s execution can be sped up by a factor s while the remaining fraction (1 - f) is untouched, the overall speedup is Speedup = 1 / ((1 - f) + f/s). Substituting f = 0.6 and s = 4: the unenhanced fraction contributes (1 - 0.6) = 0.4 to the denominator, and the enhanced fraction contributes f/s = 0.6/4 = 0.15. Summing gives 0.4 + 0.15 = 0.55, so Speedup = 1/0.55 = 1.8181... which rounds to 1.82. The key insight Amdahl\'s Law captures is that the unenhanced 40% of the program acts as a hard floor: no matter how large s becomes, that portion is untouched and continues to take 0.4 units of the original time, which is why the achievable speedup is far more modest than the raw acceleration factor s = 4 applied to only part of the workload.'
},
{
  id: 'coa-pipelining-v2',
  q: 'For the same enhancement applicable to a fraction f = 0.6 of execution time, what is the maximum possible speedup achievable if the enhanced portion could be sped up by an arbitrarily large factor (i.e., as s tends to infinity)? (Enter your numerical answer.)',
  options: [],
  answer: 2.5,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'As s tends to infinity in Speedup = 1 / ((1 - f) + f/s), the term f/s tends to 0, since the enhanced portion effectively takes zero time no matter how much of it there originally was. The formula collapses to the limiting speedup Speedup_max = 1 / (1 - f). With f = 0.6, this gives Speedup_max = 1 / (1 - 0.6) = 1 / 0.4 = 2.5. This is the single most important qualitative consequence of Amdahl\'s Law: speedup is fundamentally capped by the fraction of the program that CANNOT be improved, regardless of how much engineering effort is poured into accelerating the improvable fraction. Making the enhanced part infinitely fast only ever yields a 2.5x overall speedup here, because the untouched 40% remains a fixed bottleneck.'
},
{
  id: 'coa-pipelining-v3',
  q: 'An enhancement speeds up the portion of execution it applies to by a factor of s = 5, and this yields an observed overall speedup of exactly 3. Using Amdahl\'s Law, what fraction f of the original execution time was affected by (applicable to) this enhancement? (Enter your numerical answer, correct to two decimal places.)',
  options: [],
  answer: 0.83,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Starting from Speedup = 1 / ((1 - f) + f/s) = 3 with s = 5, invert both sides: (1 - f) + f/5 = 1/3. Expand the left side: 1 - f + 0.2f = 1 - 0.8f, so the equation becomes 1 - 0.8f = 1/3. Solving: 0.8f = 1 - 1/3 = 2/3, giving f = (2/3) / 0.8 = (2/3) x (5/4) = 10/12 = 5/6 = 0.8333..., which rounds to 0.83. Verifying by substitution: with f = 5/6, (1 - f) = 1/6, and f/s = (5/6)/5 = 1/6, so the denominator is 1/6 + 1/6 = 2/6 = 1/3, and Speedup = 1/(1/3) = 3, exactly matching the given observed speedup. This "solve for f given observed speedup and s" variant is the algebraic inverse of the standard Amdahl computation and is a common way GATE disguises the same formula to test whether students can rearrange it rather than just plug into it.'
}
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-memory';}).questions.push(
{
  id: 'coa-memory-v1',
  q: 'A system uses a TLB, a cache, and main memory with the following parameters: TLB access time = 20 ns, TLB hit ratio = 80%, cache access time = 10 ns, cache hit ratio = 90%, main memory access time = 100 ns (used both to fetch a page-table entry on a TLB miss, and to service data on a cache miss). Assume the cache is checked after address translation, and on a cache miss the requested word is fetched from main memory. What is the effective memory access time (EMAT), in ns? (Enter your numerical answer.)',
  options: [],
  answer: 60,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Solve this nested formula from the inside out. First find the effective time spent at the cache stage alone: EMAT_cache = (cache hit ratio x cache time) + (cache miss ratio x (cache time + memory time)) = (0.9 x 10) + (0.1 x (10 + 100)) = 9 + 0.1x110 = 9 + 11 = 20 ns. This is the expected time to resolve a reference once the physical address is known, whether or not it hits the cache. Now fold in the TLB: on a TLB hit (probability 0.8), the total time is TLB time + EMAT_cache = 20 + 20 = 40 ns. On a TLB miss (probability 0.2), a page-table entry must first be fetched from main memory before the cache stage can even begin, so the total time is TLB time + memory time (page table) + EMAT_cache = 20 + 100 + 20 = 140 ns. The overall EMAT is the probability-weighted average: EMAT = 0.8x40 + 0.2x140 = 32 + 28 = 60 ns. The essential trap is treating this as a flat weighted sum of three times instead of correctly nesting the cache-level computation inside each of the two TLB-outcome branches.'
},
{
  id: 'coa-memory-v2',
  q: 'A different system has: TLB access time = 10 ns, TLB hit ratio = 90%, cache access time = 5 ns, cache hit ratio = 95%, and main memory access time = 80 ns (used both for a page-table fetch on a TLB miss, and for data fetch on a cache miss). Following the same nested TLB-then-cache model as before, what is the effective memory access time (EMAT), in ns? (Enter your numerical answer.)',
  options: [],
  answer: 27,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'First compute the cache-level effective time: EMAT_cache = (0.95 x 5) + (0.05 x (5 + 80)) = 4.75 + 0.05x85 = 4.75 + 4.25 = 9.0 ns. Next, build the two TLB-outcome branches using this value. TLB hit (probability 0.9): total time = TLB time + EMAT_cache = 10 + 9 = 19 ns. TLB miss (probability 0.1): total time = TLB time + memory time (for the page-table fetch) + EMAT_cache = 10 + 80 + 9 = 99 ns. Combining with the TLB hit/miss probabilities: EMAT = 0.9x19 + 0.1x99 = 17.1 + 9.9 = 27.0 ns. Notice this comes out to an exact round number, which is a useful self-check: when the weighted terms are designed to sum cleanly, a fractional or wildly off intermediate result is a strong signal that a term was misplaced in the nesting (for example, adding memory time on a TLB HIT, or forgetting to add EMAT_cache inside the TLB-miss branch rather than after averaging).'
}
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-pipelining';}).questions.push(
{
  id: 'coa-pipelining-f1',
  q: 'A standard 5-stage pipeline (IF, ID, EX, MEM, WB) executes 4 instructions I1-I4 with NO hazards or stalls, as shown in the pipeline diagram (each row is an instruction, each column a clock cycle). How many total clock cycles are required to complete all 4 instructions?',
  figure: '<svg viewBox="-20 0 300 130" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><text x="130" y="10" fill="currentColor" font-size="9" text-anchor="middle">5-stage pipeline, 4 instructions, no hazards</text><text x="20" y="34" fill="currentColor" font-size="9">I1</text><text x="20" y="54" fill="currentColor" font-size="9">I2</text><text x="20" y="74" fill="currentColor" font-size="9">I3</text><text x="20" y="94" fill="currentColor" font-size="9">I4</text><text x="41" y="18" fill="currentColor" font-size="7" text-anchor="middle">1</text><text x="63" y="18" fill="currentColor" font-size="7" text-anchor="middle">2</text><text x="85" y="18" fill="currentColor" font-size="7" text-anchor="middle">3</text><text x="107" y="18" fill="currentColor" font-size="7" text-anchor="middle">4</text><text x="129" y="18" fill="currentColor" font-size="7" text-anchor="middle">5</text><text x="151" y="18" fill="currentColor" font-size="7" text-anchor="middle">6</text><text x="173" y="18" fill="currentColor" font-size="7" text-anchor="middle">7</text><text x="195" y="18" fill="currentColor" font-size="7" text-anchor="middle">8</text><rect x="30" y="22" width="22" height="18" fill="none" stroke="currentColor"/><text x="41" y="35" fill="currentColor" font-size="6" text-anchor="middle">IF</text><rect x="52" y="22" width="22" height="18" fill="none" stroke="currentColor"/><text x="63" y="35" fill="currentColor" font-size="6" text-anchor="middle">ID</text><rect x="74" y="22" width="22" height="18" fill="none" stroke="currentColor"/><text x="85" y="35" fill="currentColor" font-size="6" text-anchor="middle">EX</text><rect x="96" y="22" width="22" height="18" fill="none" stroke="currentColor"/><text x="107" y="35" fill="currentColor" font-size="6" text-anchor="middle">MEM</text><rect x="118" y="22" width="22" height="18" fill="none" stroke="currentColor"/><text x="129" y="35" fill="currentColor" font-size="6" text-anchor="middle">WB</text><rect x="52" y="42" width="22" height="18" fill="none" stroke="currentColor"/><text x="63" y="55" fill="currentColor" font-size="6" text-anchor="middle">IF</text><rect x="74" y="42" width="22" height="18" fill="none" stroke="currentColor"/><text x="85" y="55" fill="currentColor" font-size="6" text-anchor="middle">ID</text><rect x="96" y="42" width="22" height="18" fill="none" stroke="currentColor"/><text x="107" y="55" fill="currentColor" font-size="6" text-anchor="middle">EX</text><rect x="118" y="42" width="22" height="18" fill="none" stroke="currentColor"/><text x="129" y="55" fill="currentColor" font-size="6" text-anchor="middle">MEM</text><rect x="140" y="42" width="22" height="18" fill="none" stroke="currentColor"/><text x="151" y="55" fill="currentColor" font-size="6" text-anchor="middle">WB</text><rect x="74" y="62" width="22" height="18" fill="none" stroke="currentColor"/><text x="85" y="75" fill="currentColor" font-size="6" text-anchor="middle">IF</text><rect x="96" y="62" width="22" height="18" fill="none" stroke="currentColor"/><text x="107" y="75" fill="currentColor" font-size="6" text-anchor="middle">ID</text><rect x="118" y="62" width="22" height="18" fill="none" stroke="currentColor"/><text x="129" y="75" fill="currentColor" font-size="6" text-anchor="middle">EX</text><rect x="140" y="62" width="22" height="18" fill="none" stroke="currentColor"/><text x="151" y="75" fill="currentColor" font-size="6" text-anchor="middle">MEM</text><rect x="162" y="62" width="22" height="18" fill="none" stroke="currentColor"/><text x="173" y="75" fill="currentColor" font-size="6" text-anchor="middle">WB</text><rect x="96" y="82" width="22" height="18" fill="none" stroke="currentColor"/><text x="107" y="95" fill="currentColor" font-size="6" text-anchor="middle">IF</text><rect x="118" y="82" width="22" height="18" fill="none" stroke="currentColor"/><text x="129" y="95" fill="currentColor" font-size="6" text-anchor="middle">ID</text><rect x="140" y="82" width="22" height="18" fill="none" stroke="currentColor"/><text x="151" y="95" fill="currentColor" font-size="6" text-anchor="middle">EX</text><rect x="162" y="82" width="22" height="18" fill="none" stroke="currentColor"/><text x="173" y="95" fill="currentColor" font-size="6" text-anchor="middle">MEM</text><rect x="184" y="82" width="22" height="18" fill="none" stroke="currentColor"/><text x="195" y="95" fill="currentColor" font-size="6" text-anchor="middle">WB</text></svg>',
  options: [],
  answer: 8,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'numerical',
  explanation: 'In an ideal 5-stage pipeline with no stalls, each instruction moves diagonally through the stages one cycle after the previous instruction, so the general formula for total cycles is n + k - 1, where n is the number of instructions and k is the number of pipeline stages. Reading the diagram directly confirms this: I1 finishes its WB stage in cycle 5, and each subsequent instruction finishes exactly one cycle later (I2 finishes WB in cycle 6, I3 in cycle 7, I4 in cycle 8). So the last instruction, I4, completes its WB stage in cycle 8, meaning the entire 4-instruction sequence needs 8 total clock cycles. This matches the formula directly: n + k - 1 = 4 + 5 - 1 = 8. Without pipelining, executing these 4 instructions sequentially would take 4 x 5 = 20 cycles, so this ideal pipeline achieves a speedup of 20/8 = 2.5x.'
},
{
  id: 'coa-pipelining-f2',
  q: 'The pipeline diagram below shows 3 instructions I1-I3 executing on a 5-stage pipeline, where I2 experiences a data hazard that forces 2 stall cycles (bubbles, shown in teal) to be inserted before its EX stage, which in turn delays I3 identically. Based on the diagram, how many total clock cycles are required for all 3 instructions to complete (i.e., for I3\'s WB stage to finish)? (Enter your numerical answer.)',
  figure: '<svg viewBox="-51 0 352 110" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><text x="125" y="10" fill="currentColor" font-size="9" text-anchor="middle">Pipeline with stalls (teal = bubble), 3 instructions</text><text x="20" y="34" fill="currentColor" font-size="9">I1</text><text x="20" y="54" fill="currentColor" font-size="9">I2</text><text x="20" y="74" fill="currentColor" font-size="9">I3</text><text x="60" y="18" fill="currentColor" font-size="7" text-anchor="middle">1</text><text x="80" y="18" fill="currentColor" font-size="7" text-anchor="middle">2</text><text x="100" y="18" fill="currentColor" font-size="7" text-anchor="middle">3</text><text x="120" y="18" fill="currentColor" font-size="7" text-anchor="middle">4</text><text x="140" y="18" fill="currentColor" font-size="7" text-anchor="middle">5</text><text x="160" y="18" fill="currentColor" font-size="7" text-anchor="middle">6</text><text x="180" y="18" fill="currentColor" font-size="7" text-anchor="middle">7</text><text x="200" y="18" fill="currentColor" font-size="7" text-anchor="middle">8</text><text x="220" y="18" fill="currentColor" font-size="7" text-anchor="middle">9</text><rect x="50" y="22" width="20" height="18" fill="none" stroke="currentColor"/><text x="60" y="35" fill="currentColor" font-size="6" text-anchor="middle">IF</text><rect x="70" y="22" width="20" height="18" fill="none" stroke="currentColor"/><text x="80" y="35" fill="currentColor" font-size="6" text-anchor="middle">ID</text><rect x="90" y="22" width="20" height="18" fill="none" stroke="currentColor"/><text x="100" y="35" fill="currentColor" font-size="6" text-anchor="middle">EX</text><rect x="110" y="22" width="20" height="18" fill="none" stroke="currentColor"/><text x="120" y="35" fill="currentColor" font-size="6" text-anchor="middle">MEM</text><rect x="130" y="22" width="20" height="18" fill="none" stroke="currentColor"/><text x="140" y="35" fill="currentColor" font-size="6" text-anchor="middle">WB</text><rect x="70" y="42" width="20" height="18" fill="none" stroke="currentColor"/><text x="80" y="55" fill="currentColor" font-size="6" text-anchor="middle">IF</text><rect x="90" y="42" width="20" height="18" fill="none" stroke="currentColor"/><text x="100" y="55" fill="currentColor" font-size="6" text-anchor="middle">ID</text><rect x="110" y="42" width="20" height="18" fill="#35d0ba" fill-opacity="0.2" stroke="#35d0ba"/><text x="120" y="55" fill="currentColor" font-size="6" text-anchor="middle">stall</text><rect x="130" y="42" width="20" height="18" fill="#35d0ba" fill-opacity="0.2" stroke="#35d0ba"/><text x="140" y="55" fill="currentColor" font-size="6" text-anchor="middle">stall</text><rect x="150" y="42" width="20" height="18" fill="none" stroke="currentColor"/><text x="160" y="55" fill="currentColor" font-size="6" text-anchor="middle">EX</text><rect x="170" y="42" width="20" height="18" fill="none" stroke="currentColor"/><text x="180" y="55" fill="currentColor" font-size="6" text-anchor="middle">MEM</text><rect x="190" y="42" width="20" height="18" fill="none" stroke="currentColor"/><text x="200" y="55" fill="currentColor" font-size="6" text-anchor="middle">WB</text><rect x="90" y="62" width="20" height="18" fill="none" stroke="currentColor"/><text x="100" y="75" fill="currentColor" font-size="6" text-anchor="middle">IF</text><rect x="110" y="62" width="20" height="18" fill="#35d0ba" fill-opacity="0.2" stroke="#35d0ba"/><text x="120" y="75" fill="currentColor" font-size="6" text-anchor="middle">stall</text><rect x="130" y="62" width="20" height="18" fill="#35d0ba" fill-opacity="0.2" stroke="#35d0ba"/><text x="140" y="75" fill="currentColor" font-size="6" text-anchor="middle">stall</text><rect x="150" y="62" width="20" height="18" fill="none" stroke="currentColor"/><text x="160" y="75" fill="currentColor" font-size="6" text-anchor="middle">ID</text><rect x="170" y="62" width="20" height="18" fill="none" stroke="currentColor"/><text x="180" y="75" fill="currentColor" font-size="6" text-anchor="middle">EX</text><rect x="190" y="62" width="20" height="18" fill="none" stroke="currentColor"/><text x="200" y="75" fill="currentColor" font-size="6" text-anchor="middle">MEM</text><rect x="210" y="62" width="20" height="18" fill="none" stroke="currentColor"/><text x="220" y="75" fill="currentColor" font-size="6" text-anchor="middle">WB</text></svg>',
  options: [],
  answer: 9,
  kind: 'nat',
  marks: 2,
  difficulty: 'hard',
  type: 'numerical',
  explanation: 'Without any hazard, 3 instructions on a 5-stage pipeline would ideally finish in n + k - 1 = 3 + 5 - 1 = 7 cycles. The diagram shows a data hazard on I2 forcing 2 stall (bubble) cycles to be inserted right before its EX stage -- I2\'s ID completes in cycle 3, but instead of entering EX in cycle 4, it is held for 2 extra cycles and only enters EX in cycle 6. Every stall cycle inserted into the pipeline delays not just the stalled instruction but every instruction behind it by the same amount, since I3 cannot advance into a stage that I2 is still occupying (or blocking). Reading the diagram directly, I3\'s WB stage is shown completing in cycle 9. This matches the general rule: total cycles = ideal cycles + number of stall cycles = 7 + 2 = 9. Each bubble cycle in the pipeline diagram represents one full cycle in which no useful instruction work is retired, which is exactly the throughput cost hazards impose even though correctness is preserved.'
}
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-memory';}).questions.push(
{
  id: 'coa-memory-f1',
  q: 'A 32-bit address is used by a direct-mapped cache with a total capacity of 64 KB and a block size of 32 bytes, split into Tag, Index, and Offset fields as shown. Given that Offset = 5 bits (since block size = 32 B = 2^5) and Index = 11 bits (since number of lines = 64 KB / 32 B = 2048 = 2^11), how many bits are needed for the Tag field?',
  figure: '<svg viewBox="-69 0 398 90" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><text x="130" y="12" fill="currentColor" font-size="9" text-anchor="middle">32-bit address, direct-mapped cache: 64KB total, 32B blocks</text><rect x="20" y="22" width="110" height="30" fill="none" stroke="currentColor"/><text x="75" y="41" fill="currentColor" font-size="11" text-anchor="middle">Tag</text><rect x="130" y="22" width="80" height="30" fill="none" stroke="currentColor"/><text x="170" y="41" fill="currentColor" font-size="11" text-anchor="middle">Index</text><rect x="210" y="22" width="40" height="30" fill="none" stroke="currentColor"/><text x="230" y="41" fill="currentColor" font-size="10" text-anchor="middle">Offset</text><text x="75" y="68" fill="currentColor" font-size="9" text-anchor="middle">? bits</text><text x="170" y="68" fill="currentColor" font-size="9" text-anchor="middle">11 bits</text><text x="230" y="68" fill="currentColor" font-size="9" text-anchor="middle">5 bits</text></svg>',
  options: [],
  answer: 16,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'The three fields of a cache address (Tag, Index, Offset) always partition the full address width with no overlap and no gaps, so their bit-widths must sum to the total address width. The Offset field width is fixed by the block size: 32 B = 2^5 bytes, so 5 bits address every byte within a block, matching the diagram. The Index field width is fixed by the number of cache lines: with a 64 KB cache holding 32 B blocks, there are 65536/32 = 2048 = 2^11 lines, so 11 bits are needed to select a line, again matching the diagram. Since the total address is 32 bits, the remaining Tag field must consume 32 - 11 - 5 = 16 bits. The Tag is what gets stored alongside each cache line and compared against incoming addresses to detect a hit versus a miss, since many different memory blocks map to the same index (differing only in their tag) in a direct-mapped cache.'
},
{
  id: 'coa-memory-f2',
  q: 'A cache has 8 sets and a block size of 16 bytes. For the 12-bit address 0x1A3 (binary 0001 1010 0011), the bit-field breakdown into Tag, Index, and Offset is shown below. Based on the Index field shown, which cache set does this address map to?',
  figure: '<svg viewBox="-66 0 372 100" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><text x="120" y="12" fill="currentColor" font-size="9" text-anchor="middle">Address 0x1A3, 8-set cache, 16B blocks (12-bit address)</text><rect x="20" y="22" width="80" height="28" fill="none" stroke="currentColor"/><text x="60" y="40" fill="currentColor" font-size="10" text-anchor="middle">Tag: 00011</text><rect x="100" y="22" width="60" height="28" fill="none" stroke="currentColor"/><text x="130" y="40" fill="currentColor" font-size="10" text-anchor="middle">Index: 010</text><rect x="160" y="22" width="60" height="28" fill="none" stroke="currentColor"/><text x="190" y="40" fill="currentColor" font-size="10" text-anchor="middle">Offset: 0011</text><text x="60" y="65" fill="currentColor" font-size="8" text-anchor="middle">5 bits</text><text x="130" y="65" fill="currentColor" font-size="8" text-anchor="middle">3 bits</text><text x="190" y="65" fill="currentColor" font-size="8" text-anchor="middle">4 bits</text><text x="120" y="85" fill="currentColor" font-size="9" text-anchor="middle">Index field value in decimal = set number</text></svg>',
  options: ['Set 0', 'Set 1', 'Set 2', 'Set 3'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'numerical',
  explanation: 'With a block size of 16 B = 2^4 bytes, the least-significant 4 bits of the address form the Offset field (0011 in the diagram), and with 8 = 2^3 sets, the next 3 bits form the Index field, which directly names the set number. The diagram shows the Index field as the binary value 010. Converting to decimal: 010 = 0x4 + 1x2 + 0x1 = 2. This can be cross-checked using the direct division method: the address 0x1A3 = 419 in decimal; the block number is floor(419/16) = 26; the set number is then 26 mod 8 = 2, which agrees exactly with the bit-extraction result. So the block containing this address maps to Set 2 of the cache -- any other address whose block number is also congruent to 2 mod 8 would map to and potentially conflict with this same set.'
}
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-datapath';}).questions.push(
{
  id: 'coa-datapath-f1',
  q: 'The simplified single-cycle datapath diagram below highlights (in teal) the currently active data path: Register File -> ALU -> Data Memory -> Mux -> Register File, with the Mux selecting the Data Memory output (i.e., MemtoReg = 1) rather than the ALU output (shown as the dashed, non-active path). Based on this highlighted control path, which type of instruction is being executed?',
  figure: '<svg viewBox="-72 0 424 140" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker><marker id="ah4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#35d0ba"/></marker></defs><rect x="10" y="55" width="50" height="30" fill="none" stroke="#35d0ba"/><text x="35" y="74" fill="currentColor" font-size="9" text-anchor="middle">Reg File</text><rect x="90" y="55" width="50" height="30" fill="none" stroke="#35d0ba"/><text x="115" y="74" fill="currentColor" font-size="9" text-anchor="middle">ALU</text><rect x="170" y="55" width="60" height="30" fill="none" stroke="#35d0ba"/><text x="200" y="70" fill="currentColor" font-size="9" text-anchor="middle">Data</text><text x="200" y="80" fill="currentColor" font-size="9" text-anchor="middle">Memory</text><rect x="250" y="55" width="22" height="60" fill="none" stroke="#35d0ba"/><text x="261" y="88" fill="currentColor" font-size="8" text-anchor="middle">Mux</text><line x1="60" y1="70" x2="88" y2="70" stroke="#35d0ba" marker-end="url(#ah4)"/><line x1="140" y1="70" x2="168" y2="70" stroke="#35d0ba" marker-end="url(#ah4)"/><line x1="230" y1="70" x2="248" y2="80" stroke="#35d0ba" marker-end="url(#ah4)"/><line x1="115" y1="55" x2="255" y2="100" stroke="currentColor" stroke-dasharray="3,2" marker-end="url(#ah3)"/><line x1="272" y1="90" x2="35" y2="125" stroke="#35d0ba" marker-end="url(#ah4)"/><line x1="35" y1="125" x2="35" y2="87" stroke="#35d0ba"/><text x="140" y="15" fill="currentColor" font-size="9" text-anchor="middle">Datapath (teal = active path); MemtoReg = 1 selects Data Memory</text><text x="140" y="135" fill="currentColor" font-size="8" text-anchor="middle">Dashed = ALU-to-Mux path (not selected, MemtoReg=1)</text></svg>',
  options: ['lw (load word)', 'sw (store word)', 'add (register-register addition)', 'beq (branch if equal)'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'concept',
  explanation: 'The highlighted path shows the ALU computing a memory address (from a register value, typically added to an offset), that address being sent into Data Memory to be READ, and the value that comes back out of Data Memory being selected by the Mux (MemtoReg=1) to be written back into the Register File. This exact sequence -- compute address, read memory, write the loaded value into a register -- is precisely what a load word (lw) instruction does. It rules out sw (store word), since a store writes a register value INTO Data Memory and never routes anything back into the Register File, so there would be no active Mux-to-RegFile write path at all. It rules out add, since a register-register ALU instruction writes the ALU result directly back to the Register File, meaning the Mux would select the ALU output (the dashed path) rather than the Data Memory output. It rules out beq, since a branch does not write back to the Register File at all -- it only affects the PC via a separate branch-target adder and comparison, which is not shown as active here. Only lw matches every teal-highlighted segment in the diagram.'
}
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-instructions';}).questions.push(
{
  id: 'coa-instructions-p1',
  pyqYear: 2015,
  q: 'On a three-address machine (each instruction can name up to three operands directly from memory, e.g. ADD T,A,B), what is the minimum number of instructions needed to evaluate X = (A + B) * (C - D) / E?',
  options: ['3', '4', '5', '6'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'A three-address instruction can compute one binary operation per instruction, writing its result to a fresh temporary while reading both operands directly from memory or from earlier temporaries. The expression has exactly four binary operators: +, -, *, and /. So: ADD T1,A,B computes A+B; SUB T2,C,D computes C-D; MUL T3,T1,T2 computes (A+B)*(C-D); DIV X,T3,E computes the final quotient into X. That is exactly 4 instructions, one per operator, because a three-address format never needs extra MOV or LOAD/STORE instructions to hold intermediate results — the destination field of each instruction already serves as the temporary. This is the general rule GATE tests here: on a true three-address machine, instruction count equals the number of operators in the expression.'
},
{
  id: 'coa-instructions-p2',
  pyqYear: 2016,
  q: 'An instruction is 8 bits wide. Register operand fields are 3 bits each. Two-address (register-register) instructions use two such fields, leaving 2 bits for the opcode. If exactly 3 of the 4 opcode patterns are assigned to two-address instructions, what is the maximum number of one-address instructions obtainable from the unused pattern via expanding opcodes?',
  options: ['4', '6', '8', '16'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'A 2-bit opcode field provides 2^2 = 4 distinct patterns. Two-address instructions consume 3 of these 4 patterns (each still followed by two 3-bit register fields). That leaves 4 - 3 = 1 opcode pattern unused. In the expanding opcode scheme, this single unused pattern can be extended: one of the two 3-bit fields that used to be a register operand is reinterpreted as additional opcode bits, while the other 3-bit field still supplies the single register operand needed by a one-address instruction. This gives 1 (leftover pattern) x 2^3 (bits of the freed field) = 8 distinct one-address opcodes. The governing rule, as always with expanding opcodes, is: number of leftover patterns at one level, multiplied by 2^(bits reclaimed), gives the instruction count achievable at the next level.'
},
{
  id: 'coa-instructions-p3',
  pyqYear: 2017,
  q: 'An addressing mode computes the effective address as EA = Base register + (Index register x element size) + Displacement. Given Base = 2000, Index = 50, element size = 4 bytes, and Displacement = 100 (all in the same units), what effective address does the instruction access?',
  options: ['2300', '2150', '2250', '2400'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'This is base-indexed addressing with scaling, common for array-of-structures access where the index register counts elements rather than bytes. Substituting the given values: EA = 2000 + (50 x 4) + 100. First scale the index by the element size: 50 x 4 = 200, converting an element count into a byte offset. Then add the displacement: 200 + 100 = 300. Finally add the base: 2000 + 300 = 2300. A common error is forgetting to scale the index (which would wrongly give 2000+50+100=2150) or scaling the displacement as well (which is never scaled, since it is already a byte-granular constant baked into the instruction). The correct effective address is 2300.'
},
{
  id: 'coa-instructions-p4',
  pyqYear: 2018,
  q: 'A machine uses 12-bit instructions with 3-bit register fields. Two-address (register-register) instructions use two such fields, leaving 6 opcode bits (64 patterns). If 55 patterns are reserved for two-address instructions, what is the maximum number of one-address instructions (using a single 3-bit register field) obtainable from the remaining patterns via expanding opcodes?',
  options: ['63', '72', '81', '90'],
  answer: 1,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'The 6-bit opcode field allows 2^6 = 64 distinct patterns. Two-address instructions use 55 of them, each still followed by two 3-bit register fields. That leaves 64 - 55 = 9 unused patterns. Under expanding opcodes, each of these 9 patterns can absorb one of the two freed 3-bit register fields as extra opcode bits, while the remaining 3-bit field still supplies the one register operand a one-address instruction needs. So the maximum count is 9 (leftover patterns) x 2^3 (bits reclaimed from one freed field) = 9 x 8 = 72. This is the classic multi-level expanding-opcode calculation GATE has repeatedly tested: always compute leftover patterns at the current level first, then multiply by 2^(width of the field being folded into the opcode) to get the count achievable one level down.'
},
{
  id: 'coa-instructions-p5',
  pyqYear: 2019,
  q: 'A branch instruction 4 bytes long is stored at address 3000. The processor uses PC-relative addressing where the signed offset is added to the PC after it has already been incremented past the current instruction. What signed offset must the instruction encode to branch backward to address 2960?',
  options: ['-44', '-40', '-48', '-36'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'By the time the offset is added, the PC has already advanced past this 4-byte instruction, so the base for the addition is 3000 + 4 = 3004, not 3000. The offset needed is target - (updated PC) = 2960 - 3004 = -44. Because the branch target lies before the current instruction, the offset must be negative, and PC-relative addressing handles this naturally using a signed (two\'s-complement) offset field. A very common mistake is using the un-incremented PC (3000) as the base, which would give -40 instead — always remember the fetch stage increments the PC first, and PC-relative effective-address computation happens relative to that already-updated value, not the address the instruction itself was fetched from.'
},
{
  id: 'coa-instructions-p6',
  pyqYear: 2020,
  q: 'Register R3 holds the memory address 500. The instruction MOV (R3)+, R1 uses auto-increment addressing: it first fetches the operand from the address in R3, then increments R3 by the operand size, 4 bytes. What is the value of R3 immediately after this instruction executes?',
  options: ['500', '504', '496', '508'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Auto-increment addressing performs the memory access using the register\'s current contents first, and only afterward updates the register by the size of the data item just accessed. Here R3 starts at 500, so the operand is fetched from address 500 for R1. Then, because the operand size is 4 bytes (a word), R3 is incremented by 4, giving 500 + 4 = 504. This mode is ideal for stepping sequentially through an array: a loop repeating MOV (R3)+, R1 automatically advances R3 to the next element\'s address after each access, without a separate increment instruction. The increment amount always equals the size of the operand actually transferred, not a fixed value of 1, which is the detail GATE most often tests here.'
},
{
  id: 'coa-instructions-p7',
  pyqYear: 2021,
  q: 'An instruction ADD @X, R1 uses memory-indirect addressing for its source operand: location X in memory holds the address of the actual operand. Excluding the instruction fetch itself, how many memory read accesses are needed to obtain the source operand\'s value?',
  options: ['1', '2', '3', '4'],
  answer: 1,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Memory-indirect addressing requires two separate memory accesses to reach the operand. First, the processor reads location X to obtain the pointer stored there (this is one memory access). Second, it uses that pointer as an address and reads memory again to obtain the actual operand value (a second memory access). This is what distinguishes memory-indirect from register-indirect or direct addressing: register-indirect needs only one memory access (the register itself supplies the address for free), and direct addressing also needs only one access (the instruction directly embeds the operand address). Memory-indirect is more flexible (the pointer can be updated by other code) but strictly slower, needing exactly one extra memory reference compared to direct or register-indirect addressing.'
},
{
  id: 'coa-instructions-p8',
  pyqYear: 2022,
  q: 'On a one-address (accumulator-based) machine with LOAD, STORE, ADD, SUB and MUL instructions (each combining the accumulator with one memory operand), what is the minimum number of instructions needed to evaluate Y = (P + Q) * (R - S)?',
  options: ['5', '6', '7', '8'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'A minimal accumulator-machine sequence is: LOAD P (AC=P); ADD Q (AC=P+Q); STORE T (T=P+Q, freeing the accumulator); LOAD R (AC=R); SUB S (AC=R-S); MUL T (AC=(R-S)*T=(R-S)*(P+Q), which equals the desired product since multiplication commutes); STORE Y (Y=AC). Counting these: LOAD, ADD, STORE, LOAD, SUB, MUL, STORE is exactly 7 instructions. The key saving compared to a naive count is that the second operand of the final MUL can be read directly from memory location T without a separate LOAD, since MUL is itself a one-address (accumulator, memory) instruction. Each binary operator still needs one arithmetic instruction, but only sub-expressions that must be preserved across another LOAD need an explicit STORE, which is why the total is 7 rather than a flat 3 instructions per operator.'
},
{
  id: 'coa-instructions-p9',
  pyqYear: 2023,
  q: 'A CPU has 100 distinct opcodes and 16 general-purpose registers. A two-address register-register instruction format encodes the opcode plus two register operand fields, each field sized to just accommodate the register count. If the instruction must be a whole number of bytes, what is the minimum instruction length in bits?',
  options: ['15', '16', '14', '20'],
  answer: 1,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The opcode field must distinguish 100 distinct opcodes, needing ceil(log2 100) = 7 bits, since 2^6=64 is too few but 2^7=128 suffices. Each register field must distinguish 16 registers, needing ceil(log2 16) = 4 bits exactly, since 2^4=16. With two register operands, the raw total is 7 + 4 + 4 = 15 bits. However, the instruction is required to occupy a whole number of bytes, so 15 bits must be rounded up to the next multiple of 8, which is 16 bits. This is a two-step calculation GATE frequently tests: first compute the true information-theoretic minimum from ceil(log2(.)) on each field, then apply whatever alignment or word-size constraint the question states, since the raw bit count is very often not the final answer.'
},
{
  id: 'coa-instructions-p10',
  pyqYear: 2024,
  q: 'A zero-address (stack) machine evaluates the postfix expression A B + C D - * E / using PUSH, POP, ADD, SUB, MUL and DIV, where each arithmetic instruction pops its operands from the stack and pushes the result, and the final value must be popped into memory location X. What is the total number of instructions executed?',
  options: ['8', '9', '10', '11'],
  answer: 2,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The postfix expression has 5 distinct operands (A, B, C, D, E) and 4 operators (+, -, *, /). Every operand needs exactly one PUSH instruction to place it on the stack (5 PUSH instructions). Every operator needs exactly one arithmetic instruction, since on a stack machine ADD/SUB/MUL/DIV implicitly pop their two operands and push the single result (4 instructions: ADD for A+B, SUB for C-D, MUL to multiply the two intermediate results, DIV to divide by E). Finally, the last value remaining on the stack must be explicitly popped into X with one POP instruction. Total = 5 (PUSH) + 4 (operators) + 1 (final POP) = 10 instructions. A common miscount is forgetting the terminal POP, which would wrongly give 9.'
},
{
  id: 'coa-instructions-p11',
  pyqYear: 2025,
  q: 'An array of 8-byte double-precision elements begins at base address 1000 (encoded in the instruction). Indexed addressing computes EA = Base + (Index register x element size). If the index register holds 5, what effective address does the instruction access?',
  options: ['1040', '1005', '1008', '1045'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Indexed addressing is designed for array traversal: the base address (fixed, embedded in the instruction) marks the start of the array, and the index register (which the program increments across loop iterations) selects which element to access, automatically scaled by the element size so the programmer works in element counts rather than raw byte offsets. Here the index register holds 5, meaning "the 6th element" (0-indexed), and each element occupies 8 bytes, so the byte offset is 5 x 8 = 40. Adding this to the base gives EA = 1000 + 40 = 1040. Forgetting to scale by element size (giving 1005) is the most common error GATE targets with this pattern — the index register almost always counts elements, not bytes, unless a question explicitly says otherwise.'
},
{
  id: 'coa-instructions-p12',
  pyqYear: 2026,
  q: 'A 10-bit instruction word has two 4-bit address fields for two-address instructions, leaving a 2-bit opcode (4 patterns). Three of the 4 patterns are used for two-address instructions, so the remaining pattern expands into one-address instructions using one freed 4-bit field (giving 16 one-address opcodes). If only 10 of those 16 one-address opcodes are actually used, how many zero-address instructions can the remaining opcodes support using the last 4-bit field?',
  options: ['16', '32', '64', '96'],
  answer: 3,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Working top-down: the 2-bit opcode gives 4 patterns; 3 are used for two-address instructions, leaving 1 pattern, which expands across one freed 4-bit field to give 1 x 2^4 = 16 possible one-address opcodes (each still carrying one 4-bit address field). Of these 16, only 10 are assigned to actual one-address instructions, leaving 16 - 10 = 6 unused one-address-level patterns. Each of these 6 patterns can expand again by folding the last remaining 4-bit field into the opcode, since a zero-address instruction needs no address field at all. This gives 6 x 2^4 = 96 possible zero-address instructions. This three-level cascade — two-address to one-address to zero-address — is the fullest version of the expanding-opcode pattern GATE tests, and each level must be computed strictly in sequence using the previous level\'s leftover count.'
},
{
  id: 'coa-instructions-p13',
  pyqYear: 2017,
  q: 'On a two-address machine (each arithmetic instruction destroys its first operand, e.g. ADD dst,src computes dst = dst + src), what is the minimum number of instructions to evaluate W = (A - B) / (C + D * E), assuming a MOV instruction is available to load a temporary from a memory operand?',
  options: ['6', '7', '8', '9'],
  answer: 2,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'A safe two-address sequence, always evaluating into a temporary before it is overwritten, is: MOV T1,D; MUL T1,E (T1=D*E); MOV T2,C; ADD T2,T1 (T2=C+D*E); MOV T3,A; SUB T3,B (T3=A-B); DIV T3,T2 (T3=(A-B)/(C+D*E), using the two-address convention that DIV dst,src computes dst=dst/src); MOV W,T3. Counting instructions: 3 MOV-load pairs before their operators (6 instructions: 3 MOV + 3 operator) plus one more DIV plus the final MOV, giving MOV,MUL,MOV,ADD,MOV,SUB,DIV,MOV = 8 instructions total. Two-address machines need one extra MOV per operand that would otherwise be destroyed prematurely, which is why they typically need more instructions than an equivalent three-address machine for the same expression, even though each instruction is shorter.'
},
{
  id: 'coa-instructions-p14',
  pyqYear: 2019,
  q: 'A 16-bit instruction reserves 6 bits for the opcode and the remaining 10 bits for a signed (two\'s complement) immediate operand. What is the largest positive integer value that can be encoded in the immediate field?',
  options: ['511', '512', '1023', '255'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'A 10-bit two\'s complement field can represent 2^10 = 1024 distinct values in total, split asymmetrically between negative and non-negative numbers: it covers the range from -2^9 = -512 up to +(2^9 - 1) = +511. The largest positive value is therefore 511, not 512, because value 0 is counted among the non-negative values, leaving only 511 positive slots above it (0 through 511 is 512 values, matching half of the 1024-value range, while -512 through -1 is the other 512 values). A frequent slip is to answer 512 by treating the field as unsigned, or 1023 by forgetting the sign bit consumes half the range entirely. This immediate-range calculation — 2^(n-1) - 1 for the positive extreme — recurs any time GATE asks about the reach of a signed literal or displacement field.'
}
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-datapath';}).questions.push(
{
  id: 'coa-datapath-p1',
  pyqYear: 2015,
  q: 'A single-cycle processor has functional delays: instruction fetch 220 ps, register read 90 ps, ALU 140 ps, data memory access 210 ps, register write-back 90 ps. Every instruction, regardless of type, completes in exactly one clock cycle. What is the minimum clock period the design can use?',
  options: ['750 ps', '220 ps', '210 ps', '650 ps'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'In a single-cycle datapath, every instruction must complete within one clock period, so that period must be long enough for the slowest instruction to pass through every stage its execution needs. The worst case is a load, which visits all five stages: fetch (220), register read (90), ALU address computation (140), data memory access (210) and write-back (90). Summing these gives 220+90+140+210+90 = 750 ps. It is not correct to take only the maximum individual stage delay (210 ps), because unlike a pipeline, a single-cycle design does not overlap stages across instructions at all -- every stage of the current instruction must finish sequentially before the clock edge that starts the next instruction. The clock period is therefore the sum of delays along the longest path through the datapath, not the largest single stage.'
},
{
  id: 'coa-datapath-p2',
  pyqYear: 2015,
  q: 'Two 8-bit two\'s complement numbers, 01110010 (114) and 00110101 (53), are added. What are the resulting overflow (V) and carry-out flags?',
  options: ['V = 1, C = 0', 'V = 0, C = 1', 'V = 1, C = 1', 'V = 0, C = 0'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Adding the two 8-bit values bit by bit gives the sum 10100111, with a carry of 1 entering the sign (bit 7) position but a carry of 0 leaving it (no carry out of the MSB). Overflow is detected exactly when these two carries differ: V = Cin(MSB) XOR Cout(MSB) = 1 XOR 0 = 1, so V = 1. Since the final carry out of the MSB is 0, C = 0. This matches the arithmetic check: 114 + 53 = 167 in true decimal, but the maximum representable positive value in 8-bit two\'s complement is 127, so the true sum cannot fit and must overflow -- and indeed the result bit pattern 10100111 decodes as a negative number (-89), confirming that two positive operands wrongly produced a negative result, the textbook signature of signed overflow.'
},
{
  id: 'coa-datapath-p3',
  pyqYear: 2016,
  q: 'A control memory holds 1024 microinstructions. Each microinstruction has 20 control-signal bits, a 4-bit condition-select field, and a next-address field sized to address the entire control memory. What is the total size of the control memory in bits?',
  options: ['34816', '30720', '24576', '35840'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The next-address field must be able to select any one of the 1024 = 2^10 microinstructions, so it needs ceil(log2 1024) = 10 bits. The full microinstruction width is therefore 20 (control bits) + 4 (condition-select) + 10 (next-address) = 34 bits. Since the control memory holds 1024 such microinstructions, the total control memory size is 1024 x 34 = 34816 bits. A common error is to size the next-address field from the number of control bits or from an unrelated main-memory address width instead of the actual depth of the control store -- the sequencer only ever needs to address locations within the microprogram memory itself, so log2(depth of control memory) is always the right basis for that field.'
},
{
  id: 'coa-datapath-p4',
  pyqYear: 2016,
  q: 'A CPU has 46 control signals divided into three mutually exclusive groups of 5, 9 and 20 signals; within a group at most one signal is active per cycle, and a group may also have no active signal that cycle. Using vertical microprogramming with one separately encoded field per group, how many total control bits does each microinstruction need?',
  options: ['12', '10', '15', '46'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'In vertical microprogramming, each group of mutually exclusive signals is replaced by one encoded field wide enough to represent every signal in that group PLUS one extra pattern for "none active." A group of size k therefore needs ceil(log2(k+1)) bits. For the group of 5, ceil(log2 6) = 3 bits. For the group of 9, ceil(log2 10) = 4 bits. For the group of 20, ceil(log2 21) = 5 bits. Summing across the three independently encoded fields gives 3 + 4 + 5 = 12 bits total, far fewer than the 46 bits horizontal microprogramming would need (one bit per signal), at the cost of needing a decoder on each field before the signals can be used. This "+1 for none-active" detail is the step GATE most often catches students missing.'
},
{
  id: 'coa-datapath-p5',
  pyqYear: 2017,
  q: 'A multi-cycle processor with a 250 ps clock executes instructions in these cycle counts: load 5, store 4, ALU 4, branch 3. The instruction mix is 20% loads, 15% stores, 50% ALU and 15% branches. What is the average execution time per instruction?',
  options: ['1012.5 ps', '1000 ps', '900 ps', '1125 ps'],
  answer: 0,
  kind: 'nat',
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Average CPI is the mix-weighted sum of each instruction type\'s cycle count: CPI = 0.20x5 + 0.15x4 + 0.50x4 + 0.15x3 = 1.00 + 0.60 + 2.00 + 0.45 = 4.05 cycles per instruction. Multiplying by the clock period gives the average execution time per instruction: 4.05 x 250 ps = 1012.5 ps. This is the standard multi-cycle performance calculation: unlike a single-cycle design (one fixed, long cycle for every instruction) or an ideal pipeline (one cycle throughput after fill), a multi-cycle machine lets each instruction use only the cycles it needs, but the fair way to compare its overall speed against another design is always through this weighted-average CPI multiplied by the (typically much shorter) multi-cycle clock period.'
},
{
  id: 'coa-datapath-p6',
  pyqYear: 2018,
  q: 'A register file has 64 registers, three read ports and one write port. How many bits of control input are needed per cycle in total, to select the source/destination register on every port plus one write-enable bit?',
  options: ['25', '24', '18', '19'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'With 64 = 2^6 registers, selecting any one register requires n = 6 bits, and this same 6-bit select is needed independently on every port, since each port may access a different register in the same cycle. There are 3 read ports and 1 write port, i.e. 4 ports total, each needing its own 6-bit select field, giving 4 x 6 = 24 bits. In addition, the write port needs one write-enable bit to indicate whether the write should actually happen this cycle (reads are typically always "on" and simply return whatever is stored). Total control bits = 24 + 1 = 25. The general formula to remember is: (number of ports) x ceil(log2(number of registers)) + (number of write ports, for their enable bits).'
},
{
  id: 'coa-datapath-p7',
  pyqYear: 2019,
  q: 'A hardwired control unit for a multi-cycle processor is implemented as a finite state machine with 35 distinct states, whose state register feeds combinational logic together with the opcode. What is the minimum number of flip-flops needed for the state register?',
  options: ['6', '5', '7', '35'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'An n-bit state register can distinguish 2^n distinct states, so the minimum n must satisfy 2^n >= 35. Since 2^5 = 32 is not enough to give each of the 35 states a unique code, but 2^6 = 64 comfortably covers all 35 (with 29 unused codes to spare), the minimum number of flip-flops is 6. This is the same ceil(log2 .) calculation that recurs throughout digital design questions -- for register file addressing, opcode field sizing, and control-store addressing alike -- and it is worth memorizing that the answer is always the smallest n with 2^n at least as large as the count being encoded, not the closest power of two below it.'
},
{
  id: 'coa-datapath-p8',
  pyqYear: 2020,
  q: 'Compared with horizontal microprogramming, vertical microprogramming:',
  options: [
    'uses narrower microinstruction words by encoding grouped signals, but needs a decoder and typically allows fewer signals to be activated per cycle',
    'always executes machine instructions faster because its control memory is smaller',
    'requires no decoding logic between the control-memory output and the datapath',
    'is only usable in hardwired, not microprogrammed, control units'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Horizontal microprogramming dedicates one bit of the microinstruction to each control signal, so words are wide but every signal can be asserted independently and in full parallel with no decoding delay. Vertical microprogramming instead groups mutually exclusive signals and encodes each group into a compact field, shrinking the microinstruction width considerably -- but a decoder must now expand each field back into individual signal lines before they can drive the datapath, adding a small delay, and because signals within a group are mutually exclusive by construction, fewer signals can typically be active simultaneously than in the horizontal scheme. Vertical microprogramming does not inherently make the machine faster (control memory being smaller does not by itself reduce the number of microinstructions an instruction needs), and both horizontal and vertical styles apply specifically to microprogrammed control, not hardwired control, which has no control memory at all.'
},
{
  id: 'coa-datapath-p9',
  pyqYear: 2021,
  q: 'In a microprogrammed CPU, each machine instruction is interpreted by an average of 8 microinstructions, and each control memory access (fetching one microinstruction) takes 25 ns. Ignoring all other delays, what is the average time to execute one machine instruction?',
  options: ['200 ns', '160 ns', '225 ns', '175 ns'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'In a microprogrammed control unit, executing one machine instruction means stepping the microprogram sequencer through its associated microroutine one microinstruction at a time, and each step costs exactly one control-memory access. If a machine instruction needs, on average, 8 microinstructions, and each such access takes 25 ns, the average execution time is simply 8 x 25 ns = 200 ns. This directly illustrates why microprogrammed control units are inherently slower than hardwired ones for the same instruction: a hardwired unit generates its control signals combinationally within a single machine cycle, while a microprogrammed unit pays one control-memory access latency for every microinstruction in the routine, and more complex (CISC-style) instructions with longer microroutines take proportionally longer.'
},
{
  id: 'coa-datapath-p10',
  pyqYear: 2022,
  q: 'Which of the following is a correct statement about a single-bus CPU organization, where one shared internal bus connects the ALU inputs/output and all registers?',
  options: [
    'Transferring a value from one register to another, or through the ALU, may require multiple clock cycles because the shared bus can carry only one value at a time',
    'A single-bus organization always executes any given instruction faster than a multi-bus organization',
    'A single-bus CPU cannot support register-to-register ALU operations at all',
    'The ALU in a single-bus CPU never needs a temporary latch to hold one operand'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Because only one value can be present on the shared bus at any instant, an ALU operation needing two register operands cannot read both simultaneously the way a multi-bus datapath could. Instead, one operand is first moved onto the bus and latched into a temporary register feeding the ALU, and only then is the second operand placed on the bus for the ALU to combine with the latched value -- consuming an extra cycle compared to a design with multiple buses or dedicated ALU input latches. This is precisely why single-bus CPUs need at least one dedicated temporary register at an ALU input: without it, the single bus could never hold two different values at once for a binary operation. Register-to-register ALU operations are still fully supported, just spread across more cycles, and a single-bus design is simpler and cheaper in hardware but generally slower per instruction, not faster, than a multi-bus alternative.'
},
{
  id: 'coa-datapath-p11',
  pyqYear: 2023,
  q: 'A control memory holds 5000 microinstructions. What is the minimum number of bits required for the next-address field so that it can address any microinstruction in this control memory?',
  options: [],
  answer: 13,
  kind: 'nat',
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'The next-address field of a microinstruction must be wide enough to name any one of the 5000 locations in the control memory. Since 2^12 = 4096 is not enough to give a unique address to each of the 5000 microinstructions, but 2^13 = 8192 is more than enough (leaving 3192 unused addresses), the minimum field width is 13 bits. As with all such addressing-field problems, the answer is the smallest n satisfying 2^n >= (number of distinct items to be addressed), computed with ceil(log2 .), and it is never rounded down to the nearest power of two that falls short of the actual count -- 12 bits would leave 904 microinstructions with no valid address at all.'
},
{
  id: 'coa-datapath-p12',
  pyqYear: 2024,
  q: 'A single-cycle datapath needs a 750 ps clock period because every instruction, even the fastest, must budget for the load instruction\'s full critical path. A multi-cycle version of the same underlying hardware uses a 150 ps clock, with load taking 5 cycles, store 4, ALU 4, and branch 3, in a mix of 25% load, 15% store, 40% ALU and 20% branch. Which design executes a given program faster, and by roughly what factor?',
  options: [
    'Multi-cycle is faster, by roughly 750/(4.05 x 150) ≈ 1.235x',
    'Single-cycle is faster, by roughly (4.05 x 150)/750 ≈ 0.81x',
    'Both designs take exactly the same total time',
    'Multi-cycle is faster by exactly 5x, matching the load instruction\'s cycle count'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'First compute the multi-cycle average CPI from the mix: 0.25x5 + 0.15x4 + 0.40x4 + 0.20x3 = 1.25 + 0.60 + 1.60 + 0.60 = 4.05 cycles per instruction. Its average time per instruction is then 4.05 x 150 ps = 607.5 ps. The single-cycle design, by contrast, spends a flat 750 ps on every instruction regardless of type, since its clock must always accommodate the worst-case (load) critical path. Comparing the two average-time-per-instruction figures, 750 ps (single-cycle) versus 607.5 ps (multi-cycle), the multi-cycle design is faster, by a factor of 750/607.5 ≈ 1.235x. The general lesson: single-cycle designs waste time on every instruction to accommodate the slowest one, while multi-cycle designs let simple instructions finish in fewer cycles, and the fair comparison is always total (or average) execution time, never cycle count or clock period alone.'
},
{
  id: 'coa-datapath-p13',
  pyqYear: 2025,
  q: 'In a microprogrammed control unit, the microprogram sequencer\'s primary job is to:',
  options: [
    'determine the address of the next microinstruction to fetch from control memory, based on the current microinstruction\'s next-address field and, when needed, condition flags',
    'perform the arithmetic and logic operations specified by the current machine instruction',
    'decode the machine instruction\'s opcode directly into datapath control signals with no control memory access',
    'store the operands of the currently executing machine instruction'
  ],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'The microprogram sequencer is the piece of hardware that decides which control-memory location to read next, on every micro-cycle. Typically it takes the next-address field embedded in the current microinstruction as its default choice, but for conditional microbranches it also consults selected condition flags (or the machine instruction\'s opcode, at the start of a new microroutine) to choose among several possible next addresses. It does not itself perform arithmetic (that is the ALU\'s job), nor does it decode opcodes directly into datapath signals without going through control memory (that would describe hardwired control, which has no sequencer or control memory at all), nor does it store operands (that is the register file or memory\'s job). The sequencer is purely about navigating the microprogram, one microinstruction fetch at a time.'
},
{
  id: 'coa-datapath-p14',
  pyqYear: 2026,
  q: 'A CPU has 41 control signals split into three mutually exclusive groups of 6, 10 and 14 signals (each group may also have no signal active in a given cycle). Using vertical microprogramming with an independently encoded field per group, how many control bits does one microinstruction need in total?',
  options: ['11', '10', '9', '41'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Each group needs a field wide enough for its own signals plus one extra code for "none of this group\'s signals active." For the group of 6, ceil(log2(6+1)) = ceil(log2 7) = 3 bits. For the group of 10, ceil(log2(10+1)) = ceil(log2 11) = 4 bits. For the group of 14, ceil(log2(14+1)) = ceil(log2 15) = 4 bits. Adding the three independently encoded fields gives 3 + 4 + 4 = 11 bits total for the microinstruction\'s control portion -- a large reduction from the 41 bits that horizontal microprogramming would need if every signal got its own dedicated bit. The recurring trap is forgetting the "+1" for the inactive case within each group, which would undercount the required field width whenever a group need not always have exactly one signal firing.'
}
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-pipelining';}).questions.push(
{
  id: 'coa-pipelining-p1',
  pyqYear: 2015,
  q: 'A 5-stage pipeline has a clock cycle of 2.5 ns. With no stalls, how long does it take to execute a program of 200 instructions?',
  options: ['510 ns', '500 ns', '512.5 ns', '502.5 ns'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'With no hazards, a k-stage pipeline executing n instructions takes (k + n - 1) clock cycles: k cycles for the first instruction to fill the pipeline, and then one additional instruction completes every subsequent cycle. Here k = 5 and n = 200, so the total cycle count is 5 + 200 - 1 = 204 cycles. Multiplying by the 2.5 ns cycle time gives 204 x 2.5 = 510 ns. A frequent slip is to compute n x k = 1000 cycles (treating the pipeline as if it never overlapped instructions, i.e. as a non-pipelined machine), which massively overstates the time; the whole benefit of pipelining is that only the first instruction pays the full k-cycle latency, not every instruction.'
},
{
  id: 'coa-pipelining-p2',
  pyqYear: 2016,
  q: 'A 4-stage pipeline has stage delays of 180, 140, 190 and 150 ps, and each inter-stage latch adds 10 ps. What is the asymptotic (large n) speedup over a non-pipelined implementation of the same hardware, which needs no latches?',
  options: ['3.3', '4', '2.75', '3.0'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The non-pipelined machine executes each instruction by passing through all four stages sequentially with no latch overhead, taking 180+140+190+150 = 660 ps per instruction. The pipelined machine\'s cycle time is fixed by its slowest stage plus one latch delay: max(180,140,190,150) + 10 = 190 + 10 = 200 ps per cycle, and for a very large instruction count the pipeline completes essentially one instruction per cycle, so its per-instruction time approaches 200 ps. The asymptotic speedup is therefore 660 / 200 = 3.3. Note this falls short of the naive "speedup = number of stages = 4" because the stages are not perfectly balanced (190 ps dominates over the average) and the latch adds fixed overhead every cycle -- both of these are exactly what keep real pipelines below their ideal k-fold speedup.'
},
{
  id: 'coa-pipelining-p3',
  pyqYear: 2017,
  q: 'A 5-stage pipeline executes I1: ADD R1,R2,R3; I2: SUB R4,R1,R5; I3: MUL R6,R4,R7; I4: DIV R8,R6,R9, where each instruction is a RAW dependency on the one immediately before it. Without forwarding (each adjacent RAW dependency costs a 2-cycle stall, per the usual split-phase WB/ID convention), compared with full ALU-to-ALU forwarding (which entirely removes stalls for back-to-back single-cycle-EX dependencies), how many fewer cycles does the sequence take with forwarding?',
  options: ['6', '4', '8', '2'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Without any stalls at all, the base time for 4 instructions on a 5-stage pipeline is k+n-1 = 5+4-1 = 8 cycles. Without forwarding, each of the three adjacent RAW dependencies (I1 to I2, I2 to I3, I3 to I4) forces a 2-cycle stall so that the dependent instruction\'s ID lines up with its producer\'s WB, adding 2+2+2 = 6 stall cycles, for a total of 8+6 = 14 cycles. With full operand forwarding, the ALU result computed at the end of a producer\'s EX stage (available in the EX/MEM latch) is routed directly into the very next instruction\'s EX stage input in the following cycle -- exactly when a back-to-back dependent instruction needs it -- so none of these three dependencies causes any stall at all, and the sequence completes in the base 8 cycles. The difference is 14 - 8 = 6 cycles saved by forwarding.'
},
{
  id: 'coa-pipelining-p4',
  pyqYear: 2018,
  q: 'In a pipelined processor, conditional branches are resolved at the end of the 4th pipeline stage. Instructions after the branch are fetched sequentially and squashed if the branch turns out to be taken. What is the branch penalty (number of wasted cycles) for a taken branch?',
  options: ['3', '4', '2', '1'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'While the branch instruction itself is moving through stages 1 through 4, the pipeline keeps fetching subsequent sequential instructions one per cycle behind it, since the outcome is not yet known. By the time the branch resolves at the end of stage 4, three younger instructions have already been fetched into the pipeline (one entering in each of the three cycles following the branch\'s own fetch). If the branch is taken, all three of these wrongly-fetched instructions must be squashed and the correct target fetched instead, wasting exactly 3 cycles. The general formula, confirmed here, is: if the branch outcome becomes known at the end of stage b, the taken-branch penalty is b - 1 cycles -- resolving branches earlier in the pipeline is precisely why architectures add a dedicated early comparator to shrink this penalty.'
},
{
  id: 'coa-pipelining-p5',
  pyqYear: 2019,
  q: 'In a pipelined processor, 30% of instructions are branches. Half of all branches are taken, and each taken branch incurs a 2-cycle penalty; not-taken branches and all other instructions execute at CPI 1. What is the effective CPI?',
  options: ['1.3', '1.6', '1.15', '1.5'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Effective CPI = base CPI + (fraction of instructions that stall) x (stall cycles each). Here 30% of instructions are branches, and of those, half (i.e. 0.30 x 0.5 = 0.15, or 15% of all instructions) are taken and each such taken branch adds a 2-cycle penalty on top of its own 1 base cycle. So the extra CPI contributed is 0.15 x 2 = 0.30, and effective CPI = 1 + 0.30 = 1.3. The not-taken half of the branches, along with every non-branch instruction, execute at the baseline CPI of 1 and contribute nothing extra. This weighted-penalty pattern -- base CPI plus (hazard frequency x penalty per hazard) -- is the single most reused formula across GATE\'s pipeline-performance questions, whether the hazard is a branch, a stall, or a cache miss.'
},
{
  id: 'coa-pipelining-p6',
  pyqYear: 2020,
  q: 'A 4-stage pipeline has stage delays 4, 5, 11 and 5 ns (ignore latch delays). The 11 ns stage is split into two balanced stages of 5.5 ns each, turning it into a 5-stage pipeline. For a very long instruction stream, what speedup does the new 5-stage design achieve over the original 4-stage pipeline?',
  options: ['2', '2.2', '1.57', '4'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The original 4-stage pipeline\'s cycle time is set by its slowest stage: max(4,5,11,5) = 11 ns. After splitting the 11 ns stage into two equal 5.5 ns halves, the stage delays become {4,5,5.5,5.5,5}, and the new slowest stage is 5.5 ns, so the new cycle time is 5.5 ns. For a very long instruction stream, throughput approaches one instruction completed per cycle in both designs, so the asymptotic speedup of the new design over the old one is the ratio of cycle times: 11 / 5.5 = 2. This is the clean case where splitting the single bottleneck stage in half does translate directly into a 2x speedup, precisely because every other stage (4, 5 and 5 ns) already comfortably fits under the new 5.5 ns cycle time and none of them becomes a new bottleneck. Whenever splitting the worst stage does NOT achieve the full proportional speedup, it is because some other, previously-hidden stage becomes the new maximum instead — always recompute the new max(.) explicitly rather than assuming a clean halving.'
},
{
  id: 'coa-pipelining-p7',
  pyqYear: 2021,
  q: 'A processor uses branch prediction with 85% accuracy. Branches make up 20% of all instructions, and each misprediction costs a 4-cycle penalty. Non-branch instructions and correctly predicted branches execute at CPI 1. What is the effective CPI?',
  options: ['1.12', '1.20', '1.68', '1.05'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The misprediction rate is 100% - 85% = 15%. The fraction of all instructions that are mispredicted branches is 0.20 (branch fraction) x 0.15 (misprediction rate) = 0.03, i.e. 3% of all instructions. Each of these adds 4 extra cycles beyond the baseline CPI of 1, contributing 0.03 x 4 = 0.12 to the effective CPI. Every other instruction -- non-branches and correctly predicted branches, together 97% of the stream -- runs at the baseline CPI of 1 with no penalty. Effective CPI = 1 + 0.12 = 1.12. This confirms the general principle that even a fairly accurate predictor (85%) leaves a small but real performance tax whenever the branch frequency and misprediction penalty are both non-trivial.'
},
{
  id: 'coa-pipelining-p8',
  pyqYear: 2022,
  q: 'A 4-stage pipeline has stage latencies 500, 300, 450 and 350 ps, and each pipeline register (latch) adds 50 ps. What is the maximum clock frequency at which the pipeline can operate?',
  options: ['1.818 GHz', '2 GHz', '1.667 GHz', '1.538 GHz'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The pipeline\'s clock period must be at least as long as its slowest stage plus the fixed latch overhead that every stage boundary incurs: cycle time = max(500,300,450,350) + 50 = 500 + 50 = 550 ps. The maximum clock frequency is the reciprocal of this cycle time: 1 / 550 ps = 1 / (550 x 10^-12 s) ≈ 1.818 x 10^9 Hz = 1.818 GHz. A common slip is to forget the latch delay entirely (giving 1/500ps = 2 GHz) or to add the latch delay to every stage and sum them rather than adding it once to only the bottleneck stage -- the clock period is set by the single slowest stage-plus-latch path, not by the sum of all stages, since stages execute concurrently once the pipeline is full.'
},
{
  id: 'coa-pipelining-p9',
  pyqYear: 2023,
  q: 'A pipelined processor has full operand forwarding from the EX/MEM and MEM/WB latches into the EX stage. A load instruction is immediately followed by another instruction that needs the loaded value as an ALU input. What is the minimum number of stall cycles this "load-use" hazard still requires, even with forwarding enabled?',
  options: ['1', '0', '2', '3'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Forwarding eliminates stalls for ALU-to-ALU dependencies because the producer\'s result is available at the end of its EX stage, exactly one cycle before the consumer needs it in its own EX stage. A load, however, does not produce its result until the end of the MEM stage, one stage later than an ALU operation. If the very next instruction needs that loaded value in its EX stage, the timing is one cycle too tight even with forwarding: the load\'s MEM output is not ready until after the dependent instruction\'s EX stage would otherwise need it. So exactly 1 bubble (stall cycle) must still be inserted to delay the dependent instruction by one cycle, letting the load\'s MEM/WB result be forwarded into the now-delayed EX stage. This unavoidable single-cycle load-use hazard is why compilers try to schedule at least one independent instruction between a load and its first use.'
},
{
  id: 'coa-pipelining-p10',
  pyqYear: 2024,
  q: 'A 5-stage pipeline uses a single-port unified memory, so every load or store instruction (25% of a 40-instruction program) stalls the pipeline for 1 extra cycle whenever its memory access overlaps an instruction fetch. Assuming every load/store instruction causes exactly one such stall, how many total clock cycles does the program take?',
  options: ['54', '50', '44', '49'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'With no hazards, a 5-stage pipeline running 40 instructions takes k+n-1 = 5+40-1 = 44 cycles. This particular structural hazard arises whenever a load or store\'s MEM-stage access collides with a younger instruction\'s IF-stage access to the same single-ported memory, forcing a 1-cycle stall. With 25% of the 40 instructions being loads/stores, that is 0.25 x 40 = 10 instructions, each contributing one stall cycle, for 10 extra cycles. Total execution time = 44 (base) + 10 (structural-hazard stalls) = 54 cycles. This is the standard fix-it-with-arithmetic version of the structural hazard question: first get the ideal (k+n-1) baseline, then add one stall per resource conflict, exactly as with data or control hazards.'
},
{
  id: 'coa-pipelining-p11',
  pyqYear: 2025,
  q: 'A 500-instruction program has 15% branches, each of which previously incurred a 2-cycle penalty. The compiler now fills the branch delay slot with a useful, always-executed instruction in 80% of branches (fully absorbing 1 of the 2 penalty cycles for those branches), while the remaining 20% of branches still pay the full 2-cycle penalty. How many total penalty cycles does delayed branching save compared to never using a delay slot?',
  options: ['60', '75', '100', '40'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'The number of branches in the program is 15% of 500 = 75. Without any delayed-branch technique, every one of these 75 branches would pay the full 2-cycle penalty, for a baseline total of 75 x 2 = 150 penalty cycles. With delayed branching, 80% of the 75 branches (= 60 branches) have their delay slot filled with useful work, and that filled instruction executes regardless of the branch outcome, absorbing exactly 1 of the 2 penalty cycles per such branch — saving 60 x 1 = 60 cycles. The remaining 20% of branches (15 branches) gain nothing and still cost the full 2 cycles each. So the total saving compared to never using delayed branching is 60 cycles (only the successfully-filled branches contribute any saving at all — the unfilled ones are exactly as expensive as before).'
},
{
  id: 'coa-pipelining-p12',
  pyqYear: 2026,
  q: 'A processor has a balanced 6-stage pipeline (ideal speedup would be 6 with zero stalls) but stalls give it an effective CPI of 1.25. What is the actual speedup of this pipelined processor over an equivalent non-pipelined implementation?',
  options: ['4.8', '6', '7.5', '4.25'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'For a pipeline with perfectly balanced stages, the ideal (zero-stall) speedup over a non-pipelined machine equals the number of stages, k = 6, since the pipeline would then complete one instruction every single cycle instead of one every k cycles. Stalls reduce this ideal by inflating the effective CPI above 1: actual speedup = ideal speedup / effective CPI = k / CPI = 6 / 1.25 = 4.8. This captures the intuitive idea that a CPI of 1.25 means the pipeline is, on average, only 1/1.25 = 80% as efficient as the zero-stall ideal, so the realized speedup is 80% of the theoretical maximum: 0.8 x 6 = 4.8, matching the direct division. This k/CPI relationship is the fastest way to combine a pipeline\'s structural potential with its measured hazard overhead into one performance number.'
},
{
  id: 'coa-pipelining-p13',
  pyqYear: 2015,
  q: 'A 5-stage pipeline has every stage taking exactly 2 ns (ignore latch delay). For a program of 10 instructions, what is the actual speedup of the pipelined execution over a non-pipelined implementation of the same datapath (where each instruction takes 5 x 2 = 10 ns, executed one at a time)?',
  options: ['3.57', '5', '2.86', '4.5'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The non-pipelined machine executes all 5 stages of every instruction sequentially, taking 5 x 2 = 10 ns per instruction, so 10 instructions take 10 x 10 = 100 ns in total. The pipelined machine, with no hazards, takes (k+n-1) cycles = (5+10-1) = 14 cycles, each 2 ns long, giving 14 x 2 = 28 ns in total. The actual speedup for this finite instruction count is 100/28 ≈ 3.57 — noticeably less than the ideal asymptotic speedup of k = 5, because with only n = 10 instructions the pipeline fill/drain overhead (4 extra cycles beyond the ideal one-per-cycle rate) is still a significant fraction of the total time. This finite-n calculation, as opposed to the "for very large n" asymptotic shortcut, is exactly the distinction GATE tests when it specifies a concrete, small instruction count rather than saying "a very long instruction stream."'
},
{
  id: 'coa-pipelining-p14',
  pyqYear: 2024,
  q: 'A 6-stage pipeline has stage delays 3, 4, 9, 5, 6 and 4 ns, with each latch adding 1 ns. The 9 ns stage is split into three equal 3 ns sub-stages, making an 8-stage pipeline (still with 1 ns latches). What is the asymptotic speedup of the new 8-stage design over the original 6-stage design?',
  options: ['1.43', '3', '2', '1.67'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'The original pipeline\'s cycle time is its slowest stage plus one latch: max(3,4,9,5,6,4) + 1 = 9 + 1 = 10 ns. After splitting the 9 ns stage into three 3 ns sub-stages, the stage delays become {3,4,3,3,3,5,6,4}; the new slowest stage is now the 6 ns one (previously hidden behind the larger 9 ns stage), giving a new cycle time of 6 + 1 = 7 ns. For a very long instruction stream, both pipelines approach one instruction completed per cycle, so the asymptotic speedup of the new design over the old one is simply the ratio of cycle times: 10 / 7 ≈ 1.43. This illustrates an important subtlety: splitting the single worst stage does not automatically deliver a proportional speedup, because as soon as that stage shrinks, a different, previously-hidden stage (here the 6 ns one) becomes the new bottleneck and caps the achievable improvement.'
}
);

window.GATE_DATA.questions['coa'].topics.find(function(t){return t.id==='coa-memory';}).questions.push(
{
  id: 'coa-memory-p1',
  pyqYear: 2015,
  q: 'A direct-mapped cache has a total capacity of 32 KB with a block size of 64 bytes, addressed by a 32-bit byte address. How many bits are used for the Tag field?',
  options: ['17', '18', '15', '20'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The Offset field must address every byte within a block: with a 64-byte block (2^6), the offset needs 6 bits. The Index field must select among all the cache lines: with a 32 KB cache and 64-byte blocks, there are 32768/64 = 512 = 2^9 lines, so the index needs 9 bits (in a direct-mapped cache there is exactly one line per set, so index bits also equal set-select bits). The Tag field takes whatever remains of the 32-bit address: 32 - 9 - 6 = 17 bits. This tag is stored alongside each line and compared against every incoming address\'s tag bits to confirm a hit, since many different blocks in memory share the same index but differ in their tag.'
},
{
  id: 'coa-memory-p2',
  pyqYear: 2016,
  q: 'A 4-way set-associative cache has a total capacity of 64 KB, a block size of 32 bytes, and is addressed with a 32-bit byte address. How many bits are needed for the Tag field?',
  options: ['18', '17', '20', '15'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The Offset field addresses bytes within a 32-byte block: 32 = 2^5, so 5 offset bits. The total number of cache lines is 64 KB / 32 B = 65536/32 = 2048 lines; since this is 4-way associative, the lines are grouped into sets of 4, giving 2048/4 = 512 = 2^9 sets, so the Index field needs 9 bits (set-associative caches index by SET, not by individual line, which is exactly why increasing associativity at fixed capacity shrinks the index field). The Tag field then takes the remaining bits: 32 - 9 - 5 = 18 bits. Doubling the associativity while holding capacity and block size fixed always removes exactly one index bit and adds it to the tag, since it halves the number of sets while doubling the ways per set.'
},
{
  id: 'coa-memory-p3',
  pyqYear: 2017,
  q: 'A fully associative cache has a total capacity of 16 KB with a block size of 16 bytes, addressed with a 32-bit byte address. How many bits does the Tag field require?',
  options: ['28', '24', '30', '26'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'In a fully associative cache, a block can be placed in ANY line, so there is no index field at all -- the address splits into only Offset and Tag. The Offset field addresses bytes within a 16-byte block: 16 = 2^4, so 4 offset bits. The Tag field then consumes everything else: 32 - 4 = 28 bits, and every line\'s stored tag must be compared in parallel against this 28-bit value to detect a hit, which is why fully associative caches need expensive parallel (content-addressable) tag comparison hardware and are practical only for small, highly associative structures such as a TLB, not for large L1/L2 data caches.'
},
{
  id: 'coa-memory-p4',
  pyqYear: 2018,
  q: 'A processor has an L1 cache with 1 ns hit time and a 5% miss rate. On an L1 miss, it accesses an L2 cache with 8 ns hit time, whose LOCAL miss rate is 20%; an L2 miss then costs 80 ns to service from main memory. What is the average memory access time (AMAT)?',
  options: ['2.2 ns', '3.0 ns', '1.8 ns', '4.8 ns'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'AMAT is built from the inside out: the time to service an L2 access is its own hit time plus its local miss rate times the memory access time: T_L2 = 8 + 0.20 x 80 = 8 + 16 = 24 ns. Then AMAT = L1 hit time + L1 miss rate x T_L2 = 1 + 0.05 x 24 = 1 + 1.2 = 2.2 ns. The key idea in multi-level cache AMAT is that you only pay the L2 access cost when L1 actually misses (weighted by the L1 miss rate), and within L2 the LOCAL miss rate (misses in L2 divided by ACCESSES to L2, not by total references) correctly weights how often the even-more-expensive main-memory access is needed. This nested-average structure extends the same way to any number of cache levels.'
},
{
  id: 'coa-memory-p5',
  pyqYear: 2019,
  q: 'A direct-mapped cache has 4 lines (block numbers map to a line by block-number mod 4). The following sequence of block numbers is accessed in order: 0, 1, 2, 0, 1, 3, 0, 4, 0, 1. Starting from an empty cache, how many of these 10 accesses are misses?',
  options: ['6', '4', '5', '7'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'Mapping each block to line = block mod 4: block 0 to line 0, block 1 to line 1, block 2 to line 2, block 3 to line 3, and block 4 also to line 0 (since 4 mod 4 = 0), directly conflicting with block 0. Walking the trace: 0(miss,fills line0), 1(miss,fills line1), 2(miss,fills line2), 0(hit, line0 still holds block0), 1(hit), 3(miss,fills line3), 0(hit), 4(miss -- evicts block0 from line0, since 4 also maps to line0), 0(miss -- block0 was just evicted by 4), 1(hit). Counting misses: 0,1,2,3,4,0 -- that is 6 misses (0M,1M,2M,3M,4M and the final re-access of 0 is also a miss), and the remaining 4 accesses are hits. This trace exercises exactly the conflict-miss idea: blocks 0 and 4 alias to the same line and repeatedly evict each other despite plenty of unused capacity in the other three lines.'
},
{
  id: 'coa-memory-p6',
  pyqYear: 2020,
  q: 'A write-through, no-write-allocate cache serves 2000 memory references, of which 40% are writes, each writing one 4-byte word. Every write is sent through to main memory immediately. What is the total number of bytes written to main memory due to these writes?',
  options: ['3200', '2000', '8000', '1600'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'In a write-through policy, every single write updates both the cache and main memory at the same time, regardless of whether it was a cache hit or miss (with no-write-allocate, a write miss simply writes straight to memory without pulling the block into the cache at all). The number of write references is 40% of 2000 = 800, and since each write is exactly one 4-byte word, the total bytes written to main memory is 800 x 4 = 3200 bytes. Write-through keeps memory always consistent with the cache, which simplifies multiprocessor cache coherence, but it generates far more memory bus traffic than write-back for write-heavy workloads, since every individual write reaches memory rather than only the final value of a block when it is evicted.'
},
{
  id: 'coa-memory-p7',
  pyqYear: 2020,
  q: 'A write-back cache with a 32-byte block size experiences 100 block evictions over the course of a program, of which 60% are dirty (have been written to since being loaded). What is the total number of bytes written back to main memory due to these evictions?',
  options: ['1920', '3200', '1200', '2880'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'In a write-back cache, individual writes only update the cached copy of a block (setting its dirty bit) and do NOT go to main memory immediately; a block is written back to memory only when it is evicted AND it is dirty. Here, 60% of the 100 evictions are dirty: 0.60 x 100 = 60 dirty evictions. Each writeback transfers the ENTIRE 32-byte block, not just the specific bytes that were modified, since the cache typically tracks dirty status per block rather than per byte. Total bytes written back = 60 x 32 = 1920 bytes. This is dramatically less traffic than a write-through cache would generate for the same number of writes (which could easily exceed hundreds of individual word-sized writes), illustrating why write-back caches are preferred when write traffic to memory is a bottleneck, at the cost of needing extra hardware (the dirty bit) and more complex coherence handling.'
},
{
  id: 'coa-memory-p8',
  pyqYear: 2021,
  q: 'An L1 cache has a 2 ns hit time and an 8% miss rate. An L2 cache has a 10 ns hit time. Overall, 2% of ALL memory references (i.e. the GLOBAL miss rate) result in a main-memory access costing 100 ns. What is the average memory access time (AMAT)?',
  options: ['4.8 ns', '3.6 ns', '5.2 ns', '4.0 ns'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'The global L2 miss rate (2%) is the fraction of ALL references, not just of L1 misses, that end up needing main memory. To use it inside the standard nested-AMAT formula, first convert it into L2\'s LOCAL miss rate: local miss rate = global miss rate / L1 miss rate = 0.02 / 0.08 = 0.25 (25%), since L2 is only even accessed on the 8% of references that miss in L1. Then AMAT = L1 hit time + L1 miss rate x (L2 hit time + L2 local miss rate x memory time) = 2 + 0.08 x (10 + 0.25 x 100) = 2 + 0.08 x (10 + 25) = 2 + 0.08 x 35 = 2 + 2.8 = 4.8 ns. The recurring trap here is plugging a GLOBAL miss rate directly into the local-miss-rate slot of the formula without first dividing by the enclosing level\'s miss rate to convert it.'
},
{
  id: 'coa-memory-p9',
  pyqYear: 2022,
  q: 'A 2-way set-associative cache has 2 sets (block-number mod 2 selects the set) and uses true LRU replacement within each set. Starting from an empty cache, this block-number trace is accessed: 0, 2, 1, 0, 4, 1, 2, 3, 0, 4. How many of these 10 accesses are hits?',
  options: ['2', '3', '4', '1'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Even-numbered blocks (0, 2, 4) map to set 0, and odd-numbered blocks (1, 3) map to set 1, each set holding up to 2 blocks under LRU. Tracing set 0: access 0 (miss, set0=[0]); access 2 (miss, set0=[0,2]); access 0 (HIT, reorders to set0=[2,0], making 2 the LRU entry); access 4 (miss, set0 full so evicts LRU=2, set0=[0,4]); access 2 (miss, since 2 was evicted, now evicts LRU=0, set0=[4,2]); access 0 (miss, evicts LRU=4, set0=[2,0]); access 4 (miss, evicts LRU=2, set0=[0,4]). Tracing set 1: access 1 (miss, set1=[1]); access 1 again (HIT, set1=[1]); access 3 (miss, set1=[1,3], not full so no eviction needed). Counting all hits across both sets: exactly 2 hits (the two marked HIT above), and the other 8 accesses are misses -- even with 2-way associativity, three distinct even blocks (0,2,4) competing for only 2 ways in set 0 causes repeated LRU thrashing.'
},
{
  id: 'coa-memory-p10',
  pyqYear: 2022,
  q: 'A fully associative cache starts empty. The following block-number trace is accessed: 5, 3, 5, 7, 3, 9, 5, 11, 3, 7, 13. Assuming the cache is large enough that no block is ever evicted, how many of these 11 accesses are compulsory (cold-start) misses?',
  options: ['6', '5', '7', '11'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'A compulsory (cold) miss occurs the very first time a particular block is ever referenced, since it cannot possibly already be in the cache -- no replacement policy or associativity level can avoid this category of miss. Scanning the trace for each block\'s FIRST appearance: 5 (1st ref, miss), 3 (1st ref, miss), 5 (repeat, hit), 7 (1st ref, miss), 3 (repeat, hit), 9 (1st ref, miss), 5 (repeat, hit), 11 (1st ref, miss), 3 (repeat, hit), 7 (repeat, hit), 13 (1st ref, miss). The distinct blocks that ever appear are {5,3,7,9,11,13} -- exactly 6 distinct blocks -- so there are exactly 6 compulsory misses, one per distinct block, and the remaining 5 accesses (all repeat references, since the cache never evicts anything here) are hits.'
},
{
  id: 'coa-memory-p11',
  pyqYear: 2023,
  q: 'A cache uses a 40-bit byte address. The Tag field is 26 bits and the block size is 64 bytes. How many sets does this cache have?',
  options: ['256', '128', '512', '64'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The block size of 64 bytes fixes the Offset field at log2(64) = 6 bits. Since the three address fields (Tag, Index, Offset) always partition the full 40-bit address exactly, the Index field width is whatever remains after removing the given Tag and the computed Offset: 40 - 26 - 6 = 8 bits. The number of sets a cache has is always 2^(index bits), so the number of sets is 2^8 = 256. This is the reverse of the usual tag/index/offset problem: instead of being given the cache\'s capacity and associativity to compute the tag, you are given the tag width and must work backward to recover the index width and hence the set count -- the governing identity, tag + index + offset = total address width, applies in either direction.'
},
{
  id: 'coa-memory-p12',
  pyqYear: 2024,
  q: 'Two proposed L1 cache designs are compared for the same processor. Design A: 1 ns hit time, 6% miss rate, 50 ns miss penalty. Design B: 1.5 ns hit time, 3% miss rate, the same 50 ns miss penalty. Which design gives the lower average memory access time (AMAT), and by how much?',
  options: [
    'Design B is faster, by 1 ns (AMAT_A = 4 ns, AMAT_B = 3 ns)',
    'Design A is faster, by 1 ns',
    'Both designs have identical AMAT',
    'Design B is faster, by 0.5 ns'
  ],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'AMAT = hit time + miss rate x miss penalty for each design. For Design A: AMAT_A = 1 + 0.06 x 50 = 1 + 3 = 4 ns. For Design B: AMAT_B = 1.5 + 0.03 x 50 = 1.5 + 1.5 = 3 ns. Even though Design B has a slower hit time (1.5 ns versus 1 ns), its lower miss rate (3% versus 6%) more than compensates, since each miss is expensive (50 ns). Design B therefore achieves the lower AMAT, beating Design A by 4 - 3 = 1 ns. This exercise reflects a very real design tension in cache engineering: a larger or more associative cache (Design B, say) typically has a somewhat slower hit time but a meaningfully lower miss rate, and only computing full AMAT -- never comparing hit time or miss rate in isolation -- correctly captures which trade-off wins.'
},
{
  id: 'coa-memory-p13',
  pyqYear: 2024,
  q: 'A write-back cache with a 64-byte block size experiences 100 block evictions during a program run, of which 70% are dirty. What is the total number of bytes written back to main memory?',
  options: ['4480', '6400', '3200', '4800'],
  answer: 0,
  marks: 1,
  difficulty: 'easy',
  type: 'pyq-style',
  explanation: 'Only dirty evictions trigger a writeback in a write-back cache, since a clean (unmodified) block being evicted is already identical to what main memory holds and can simply be discarded. The number of dirty evictions is 70% of 100 = 70. Each writeback transfers the full 64-byte block, regardless of how many bytes within it were actually modified, because dirty status is tracked per block, not per byte. Total bytes written back = 70 x 64 = 4480 bytes. Comparing this to the earlier write-back example (60 dirty evictions of 32-byte blocks giving 1920 bytes) shows how both the eviction count, the dirty fraction, and the block size all directly scale the total writeback traffic -- doubling the block size, for instance, doubles the traffic for the same eviction pattern.'
},
{
  id: 'coa-memory-p14',
  pyqYear: 2025,
  q: 'An 8-way set-associative cache has a total capacity of 16 KB and a block size of 32 bytes. Byte address 8480 is accessed. Which set does this address map to?',
  options: ['Set 9', 'Set 34', 'Set 17', 'Set 0'],
  answer: 0,
  marks: 2,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'The total number of cache lines is 16384/32 = 512, and since the cache is 8-way associative, these lines form 512/8 = 64 sets. The block number containing byte address 8480 is floor(8480/32) = 265 (integer division discards the offset within the block). The set that this block maps to is the block number modulo the number of sets: 265 mod 64 = 9, since 64 x 4 = 256 and 265 - 256 = 9. So address 8480 maps to Set 9. This mirrors the direct division method used to double-check tag/index/offset bit extraction: block number = floor(address / block size), and set number = block number mod (number of sets) -- both must agree with whatever the bit-field partition of the address gives directly.'
},
{
  id: 'coa-memory-p15',
  pyqYear: 2026,
  q: 'A three-level cache hierarchy has: L1 hit time 1 ns with a 6% miss rate; L2 hit time 6 ns with a LOCAL miss rate of 25%; L3 hit time 20 ns with a LOCAL miss rate of 30%; a main memory access on an L3 miss costs 120 ns. What is the overall AMAT?',
  options: ['2.2 ns', '3.1 ns', '1.9 ns', '2.6 ns'],
  answer: 0,
  marks: 2,
  difficulty: 'hard',
  type: 'pyq-style',
  explanation: 'Build the nested AMAT formula from the innermost (slowest) level outward. First, the effective time when L3 is accessed: T_L3 = L3 hit time + L3 local miss rate x memory time = 20 + 0.30 x 120 = 20 + 36 = 56 ns. Next, the effective time when L2 is accessed: T_L2 = L2 hit time + L2 local miss rate x T_L3 = 6 + 0.25 x 56 = 6 + 14 = 20 ns. Finally, overall AMAT = L1 hit time + L1 miss rate x T_L2 = 1 + 0.06 x 20 = 1 + 1.2 = 2.2 ns. Each level is only ever charged when the level above it actually misses, and every LOCAL miss rate is with respect to accesses reaching that specific level, not the original reference stream -- exactly the pattern that extends the standard two-level AMAT formula to any number of cache levels.'
},
{
  id: 'coa-memory-p16',
  pyqYear: 2026,
  q: 'A direct-mapped cache has 8 lines (block-number mod 8 selects the line). A tight loop repeatedly accesses block numbers 0, 8 and 16 in a fixed round-robin order (0, 8, 16, 0, 8, 16, 0, 8), for a total of 8 accesses, starting from an empty cache. How many of these accesses are hits?',
  options: ['0', '2', '5', '6'],
  answer: 0,
  marks: 1,
  difficulty: 'medium',
  type: 'pyq-style',
  explanation: 'All three block numbers alias to the very same line, since 0 mod 8 = 0, 8 mod 8 = 0, and 16 mod 8 = 0 -- despite the cache having 8 lines total, this particular working set of 3 blocks only ever uses 1 of them and repeatedly evicts itself. Walking the trace: block 0 (miss, fills line0), block 8 (miss, evicts 0), block 16 (miss, evicts 8), block 0 (miss, evicts 16, since 0 is no longer present), block 8 (miss), block 16 (miss), block 0 (miss), block 8 (miss) -- every single access is a miss, giving 0 hits out of 8. This is a classic cache-thrashing / conflict-miss scenario: even though the cache is far from full in absolute capacity, poor address alignment (all three blocks conflict-mapping to the same line) destroys temporal locality entirely, which is exactly why real caches use set-associativity to tolerate a handful of simultaneously "hot" but conflicting addresses.'
}
);
