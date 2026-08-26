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
//__NEXT__
  ]
};
