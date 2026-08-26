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
