// Textbook chapter: File Systems, I/O and Disk Scheduling.
//
// This is the full teaching text for the topic — written to be read by someone
// who has never met the subject, in the order a good book would teach it, with
// every claim derived or demonstrated rather than stated. The short summaries in
// data/questions/os.js remain as reference cards; this is the thing you learn from.
//
// Format is the plain-text convention renderTheory() understands: ALL-CAPS lines
// are section headings, "• " starts a bullet, "1. " a numbered step, "KEY:" and
// "GATE TRAP:" make callout cards, a lone equation becomes a formula block, and
// [[FIG:id]] places a figure from the figs list below (or from the topic's own
// theory.figs — inode-indirect and disk-scan already exist there).

window.GATE_DATA = window.GATE_DATA || {};
window.GATE_DATA.chapters = window.GATE_DATA.chapters || {};
window.GATE_DATA.chapters['os-file-disk'] = {
  figs: [
    {
      id: 'dir-graph',
      caption: 'An acyclic graph directory: two hard links from different directories to the same file (its link count is 2), and a dangling symbolic link whose target has been deleted.',
      svg: '<svg viewBox="0 0 380 230" width="100%" style="max-width:380px;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah-dg1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><g stroke="currentColor" stroke-width="1.4" fill="none"><rect x="145" y="8" width="80" height="28"/><rect x="50" y="70" width="80" height="28"/><rect x="230" y="70" width="90" height="28"/><rect x="130" y="140" width="110" height="30"/><rect x="270" y="140" width="90" height="28"/></g><g stroke="currentColor" stroke-width="1.3"><line x1="165" y1="36" x2="100" y2="68" marker-end="url(#ah-dg1)"/><line x1="205" y1="36" x2="270" y2="68" marker-end="url(#ah-dg1)"/><line x1="95" y1="98" x2="175" y2="138" marker-end="url(#ah-dg1)"/><line x1="270" y1="98" x2="200" y2="138" marker-end="url(#ah-dg1)"/><line x1="290" y1="98" x2="310" y2="138" stroke-dasharray="3,3" marker-end="url(#ah-dg1)"/></g><g font-size="11" fill="currentColor"><text x="185" y="26" text-anchor="middle">root</text><text x="90" y="88" text-anchor="middle">dir A</text><text x="275" y="88" text-anchor="middle">dir B</text><text x="185" y="159" text-anchor="middle" font-size="10">file F  (link count = 2)</text><text x="315" y="158" text-anchor="middle" font-size="10">symlink s</text></g><g stroke="currentColor" stroke-width="1.3" stroke-dasharray="3,3"><line x1="310" y1="168" x2="330" y2="200" marker-end="url(#ah-dg1)"/></g><g><line x1="318" y1="192" x2="342" y2="216" stroke="currentColor" stroke-width="1.6"/><line x1="342" y1="192" x2="318" y2="216" stroke="currentColor" stroke-width="1.6"/></g><text x="335" y="228" font-size="9" fill="currentColor" text-anchor="middle">target deleted — dangling</text></svg>'
    },
    {
      id: 'disk-geometry',
      caption: 'A platter with tracks and a sector wedge (left); the same track number on every platter, stacked, forms one cylinder (right).',
      svg: '<svg viewBox="0 0 400 220" width="100%" style="max-width:400px;height:auto" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3" fill="none"><circle cx="110" cy="110" r="90"/><circle cx="110" cy="110" r="60"/><circle cx="110" cy="110" r="30"/></g><path d="M110,110 L94.4,21.4 L133.3,23.1 Z" fill="currentColor" opacity=".28" stroke="currentColor" stroke-width="1"/><circle cx="110" cy="110" r="2.2" fill="currentColor"/><g font-size="10" fill="currentColor"><text x="118" y="45">sector</text><text x="150" y="75">track</text><text x="16" y="112">platter</text></g><g stroke="currentColor" stroke-width="1.3" fill="none"><rect x="270" y="40" width="100" height="14"/><rect x="270" y="70" width="100" height="14"/><rect x="270" y="100" width="100" height="14"/><rect x="270" y="130" width="100" height="14"/><line x1="320" y1="30" x2="320" y2="154" stroke-width="1"/></g><line x1="316" y1="47" x2="324" y2="47" stroke="currentColor" stroke-width="2.2"/><line x1="316" y1="77" x2="324" y2="77" stroke="currentColor" stroke-width="2.2"/><line x1="316" y1="107" x2="324" y2="107" stroke="currentColor" stroke-width="2.2"/><line x1="316" y1="137" x2="324" y2="137" stroke="currentColor" stroke-width="2.2"/><g font-size="10" fill="currentColor"><text x="280" y="25">platters (edge-on)</text><text x="255" y="185">cylinder = same track</text><text x="255" y="198">number, every platter</text></g></svg>'
    },
    {
      id: 'raid-layout',
      caption: 'RAID 0 stripes with no redundancy; RAID 1 mirrors every block; RAID 5 stripes data and parity together so any one disk can be rebuilt.',
      svg: '<svg viewBox="0 0 420 210" width="100%" style="max-width:420px;height:auto" xmlns="http://www.w3.org/2000/svg"><g font-size="11" fill="currentColor"><text x="55" y="16" text-anchor="middle">RAID 0 (stripe)</text><text x="205" y="16" text-anchor="middle">RAID 1 (mirror)</text><text x="355" y="16" text-anchor="middle">RAID 5 (parity rotates)</text></g><g stroke="currentColor" stroke-width="1.2" fill="none"><rect x="20" y="30" width="35" height="120"/><rect x="60" y="30" width="35" height="120"/><rect x="170" y="30" width="35" height="120"/><rect x="210" y="30" width="35" height="120"/><rect x="300" y="30" width="35" height="150"/><rect x="340" y="30" width="35" height="150"/><rect x="380" y="30" width="35" height="150"/></g><g font-size="9" fill="currentColor" text-anchor="middle"><text x="37" y="48">A1</text><text x="77" y="48">A2</text><text x="37" y="78">A3</text><text x="77" y="78">A4</text><text x="37" y="108">A5</text><text x="77" y="108">A6</text><text x="187" y="48">A1</text><text x="227" y="48">A1</text><text x="187" y="78">A2</text><text x="227" y="78">A2</text><text x="187" y="108">A3</text><text x="227" y="108">A3</text><text x="317" y="48">A1</text><text x="357" y="48">A2</text><text x="397" y="48">P0</text><text x="317" y="78">A3</text><text x="357" y="78">P1</text><text x="397" y="78">A4</text><text x="317" y="108">P2</text><text x="357" y="108">A5</text><text x="397" y="108">A6</text></g><g font-size="9" fill="currentColor" text-anchor="middle" opacity=".75"><text x="37" y="145">disk 0</text><text x="77" y="145">disk 1</text><text x="187" y="145">disk 0</text><text x="227" y="145">disk 1</text><text x="317" y="175">disk 0</text><text x="357" y="175">disk 1</text><text x="397" y="175">disk 2</text></g><g font-size="10" fill="currentColor" text-anchor="middle"><text x="55" y="200">no redundancy</text><text x="205" y="200">every block written twice</text><text x="355" y="200">Pn = XOR of that row</text></g></svg>'
    }
  ],
  text: `
WHAT THIS CHAPTER IS FOR

Every chapter so far has been about things that live in RAM and vanish when the machine is switched off: processes, their memory, the pages that back that memory. None of that explains how your essay is still there tomorrow. Persistence — the property that data outlives the process that created it, and outlives a reboot — is the file system's job, and it is the last major piece of the "how does an OS manage its resources" story that this course tells.

The file system sits on top of a disk, which is a device that can only read and write whole fixed-size blocks, has no idea what a "file" is, and takes a genuinely long time (milliseconds, an eternity to a CPU) to move its mechanical parts to the right place. Everything in this chapter follows from reconciling those two facts: users want named, growable, byte-addressable files; the disk offers only numbered blocks and a slow arm. We will build the file abstraction, see how directories organise many files, see how a file's blocks are actually laid out and found on disk, and finish with how the OS gets bytes on and off the disk hardware itself, including the order in which it should service competing requests for that hardware.

THE FILE: WHAT IT IS AND WHAT IT IS NOT

A file is the smallest unit of storage the operating system is willing to talk about in the abstract. To a user, a file is a name and some content — a document, a photo, a program. The operating system's job is to make that abstraction hold no matter what the underlying hardware looks like: whether the bytes sit on a spinning disk, an SSD, or a memory card, a file is opened, read, written and closed the same way.

A file needs attributes beyond its content, because the OS and the user both need to ask questions about a file without reading the whole thing. Think about what you would need to know about a file without opening it, and you arrive at the standard list.

• Name — the human-readable identifier, kept in the directory entry, not in the file itself.
• Identifier — a unique number (on UNIX, the inode number) that identifies the file inside the file system even if it is renamed.
• Type — needed if the system distinguishes file types itself, rather than inferring type from the name's extension.
• Location — a pointer to the device and the place on that device where the file's data lives.
• Size — the current size in bytes, and sometimes a separately-tracked maximum allowed size.
• Protection — who may read, write or execute this file.
• Time, date, and user identification — created, last modified, last accessed, and by whom; used for protection, security and usage monitoring.

KEY: All of this — everything except the name and the raw content — is metadata the OS keeps about the file, not inside the file. On UNIX it lives in the inode; the directory entry maps a name to an inode number, nothing more.

Operations on a file are likewise a fixed small set, because every higher-level thing a program wants to do with a file reduces to some sequence of these: create, open, read, write, reposition within a file (seek), delete, truncate, plus operations on groups of attributes (get/set attributes) and on the file as a whole (rename, copy).

Note what is missing from that list: there is no "insert in the middle" or "delete a range from the middle" operation. A write at an offset overwrites what was there; it does not push the rest of the file along. If you have ever wondered why editing text in the middle of a large file feels expensive to implement efficiently, this is why — the file abstraction itself does not give you a cheap insert.

FILE ATTRIBUTES AND OPERATIONS: OPENING A FILE

Almost every operation above — read, write, seek — needs to happen many times on the same file in a row, and each of those operations, if it went all the way down to the directory structure and the disk every single time, would be needlessly slow: the same directory would be searched, the same permission check made, the same disk block address looked up, over and over. So the OS separates "find this file and get ready to use it" (open) from "use it" (read/write/seek), doing the expensive part once.

Here is what open() actually does, step by step, and each step explains a piece of the machinery you will meet again.

1. The kernel searches the directory structure for the given path name, resolving each component (each slash-separated piece) in turn, until it finds the directory entry naming the requested file. This is the expensive part: potentially one disk read per path component.

2. It checks the file's permission bits against the calling process's identity (its user ID and group ID) and the mode requested (read, write, …). If the check fails, open() fails with a permission error, and nothing further happens.

3. It creates (or reuses) a system-wide open-file table entry for this file, containing the file's current disk location, the file's size, and a count of how many processes currently have it open.

4. It creates an entry in the calling process's own per-process open-file table — the "file descriptor table" — pointing at the system-wide entry above, and initialises this entry's own file pointer (current read/write offset) to zero (or to the end, for append mode).

5. It returns to the process a small integer: the index into its per-process table. This is the file descriptor. Every subsequent read, write or seek names the file only by this small integer — the kernel already did the expensive lookup and translates the integer straight to the open-file-table entry.

Why two tables, one per process and one system-wide? Because two different things need to be per-process (where in the file this process currently is — its own file pointer, since two processes reading the same file are usually at different points in it) and two things need to be shared system-wide (the file's actual disk location and size — there is only one copy of the file, however many processes have it open, and only one place should track "how many processes have this file open" so the space can be reclaimed exactly when that count reaches zero).

KEY: A file descriptor is not a pointer into the file; it is an index into your process's private table, which in turn points at a system-wide table shared by every process that has that file open. Two file descriptors for the same file, opened separately (two independent open() calls), get separate file pointers and can be at different offsets; but if one process dup()s an existing descriptor, the copy shares the same open-file-table entry and hence the same file pointer.

GATE TRAP: "close() deletes the file" is wrong; close() only removes the process's file descriptor and decrements the open count in the system-wide table. The file's data and directory entry are untouched. Even unlink() (removing the directory entry) does not free the disk blocks while some process still has the file open — the space is reclaimed only once both the link count and the open count reach zero, which is why a program can delete its own log file, keep writing to it through the still-open descriptor, and have the space reappear only when it finally closes.

ACCESS METHODS

Given an open file, how does a program get at its bytes? There are three access methods, and the difference is purely about how the current position moves.

Sequential access reads the file from the beginning, byte after byte or record after record, with the file pointer automatically advancing after each read. This matches the oldest storage medium, magnetic tape, where you physically cannot jump to an arbitrary spot without winding through everything before it — and it remains the natural pattern for compilers reading source files, or programs reading a log top to bottom.

Direct access (also called relative access) lets the program jump straight to any block by number — read block 14, then read block 3, in any order — because disk blocks, unlike tape, are all equally reachable. This is what a database needs: to fetch record 500 of a million-record file, you compute which block holds record 500 and read exactly that block, rather than reading the 499 before it.

Indexed access builds an index — a smaller file of pointers — that maps a key (not a raw block number) to the block containing the record with that key. To find the record for customer "Singh", the program searches the (small, often entirely-in-memory) index for "Singh", finds the block number stored against it, and does one direct access to that block. Large indexes are themselves indexed in multiple levels, which is exactly the same idea the UNIX inode uses for large files, met later in this chapter.

REMEMBER: Sequential is a promise about pattern of access (in order, one after another); direct is a promise about capability (any block, at will, by number); indexed access uses direct access as its final step, after using a separate lookup structure to translate a meaningful key into a block number.

DIRECTORY STRUCTURES: FROM ONE LEVEL TO A TREE

A file system holds many files, and a directory is the structure that organises them — mapping names to files (in UNIX terms, to inode numbers) so users and programs can find things by name instead of by raw disk address. The operations a directory must support drive its design: search for a file, create a file, delete a file, list the directory's contents, rename a file, and traverse the whole file system (for backup, say).

The simplest possible directory structure is single-level: one directory, containing every file on the system, with no subdirectories at all. It fails almost immediately for two reasons that any real system runs into: every file needs a distinct name (two users cannot both have a file called "notes"), and there is no way to group related files together. It survives today only in the tiniest embedded systems.

Two-level directory gives every user their own directory. Now "notes" can exist once per user without collision, because a file is really named user/notes internally. This solves the naming collision between users but still gives each user only one flat directory — they cannot group their own files into projects — and, worse, users cannot easily share files or cooperate, since each user's namespace is walled off from every other user's.

The tree-structured directory generalises this all the way: a directory can contain files and other directories, to any depth, all descending from one root. This is the structure every general-purpose OS you have used actually presents. A path name — either absolute, starting from the root (/home/alex/notes.txt), or relative, starting from the process's current working directory (notes.txt, if alex is already the working directory) — names a file by the sequence of directories you pass through to reach it. Deleting a non-empty directory now needs a policy: refuse until it is empied, or recursively delete everything inside it (rm -rf on UNIX chooses the second, deliberately, because the first is the safe default and the second must be asked for explicitly).

A pure tree still has one restriction that matters in practice: each file can appear under exactly one path, in exactly one place in the tree. If two users are collaborating on one file, one of them owns it in their subtree and the other must either keep a separate copy (which drifts out of sync the moment either one edits it) or navigate all the way to the other user's directory every time. Removing this restriction is what the next structure is for.

ACYCLIC GRAPHS: HARD LINKS AND SYMBOLIC LINKS

An acyclic-graph directory structure allows sharing: the same file (not a copy of it — the same underlying data) can be named from more than one directory. This is implemented with links, and there are two different mechanisms with very different consequences, which is exactly why they are tested against each other.

A hard link is a second directory entry that points at the same inode as an existing one. There is no "original" and "copy" once this is done — both names are equally real, equally direct references to the one set of data blocks. The inode itself keeps a link count: the number of directory entries currently pointing at it. Creating a hard link increments this count; removing a directory entry (unlink) decrements it; the data blocks and the inode are freed only when the count reaches zero, because only then does nothing in the file system refer to that data any more.

[[FIG:dir-graph]]

A symbolic link (soft link, symlink) is different in kind: it is its own small file, whose content is simply the path name of the target. Following a symlink means reading that path and starting a fresh directory lookup from there. This resolves through the tree exactly like typing that path yourself would, and that has two consequences hard links do not share. First, a symbolic link can point across file systems (even to a file on a different disk or partition, since it stores a path, not an inode number, and inode numbers are only unique within one file system) — a hard link cannot, because "the same inode number" is meaningless across two separate inode tables. Second, if the target is deleted, the symlink is left pointing at nothing: this is a dangling link. Following it fails (the OS resolves the stored path, finds nothing there, and returns an error), but the symlink file itself still exists, inert, until someone removes it too.

GATE TRAP: A hard link keeps the data alive — as long as one hard link remains, deleting all other names for the file does not delete the data, because the link count has not reached zero. A symbolic link does the opposite: deleting the target leaves the symlink dangling and useless, because the symlink never held a reference to the data at all, only a path string that happened to lead there. "Deleting the original file breaks the link" is true for a symbolic link and false for a hard link — there is no "original" among hard links.

The reference-count problem is the general name for the bookkeeping hard links force on the file system: because a file can now have several names, "delete the file" cannot simply mean "remove this one directory entry and free the blocks" — it must mean "remove this directory entry, decrement the link count, and free the blocks only if the count is now zero." Get this wrong (free the blocks the moment any one name is removed) and every other hard link to the file becomes a dangling reference to freed, possibly-reused space — silent data corruption, not a clean error the way a dangling symlink gives you.

GENERAL GRAPHS AND THE CYCLE PROBLEM

Allowing directories, not just files, to be linked in more than one place turns the acyclic graph into a general graph, and a general graph can contain a cycle: directory A contains a link to directory B, which contains a link back to A (directly, or through several intermediate directories). This is more than a curiosity — it breaks operations that assume the structure is finite and non-repeating.

A naive traversal that follows every subdirectory (to list all files, or to back the file system up) will follow A → B → A → B forever, never terminating, because nothing in a plain "recurse into every subdirectory" algorithm knows it has been here before. Reference counting also breaks: a cycle of directories linking only to each other, with no path down from the root, can have every link count above zero while being completely unreachable from anywhere a user could ever navigate — garbage that ordinary reference counting will never identify as garbage, because nothing's count ever drops to zero.

Cycle detection is the fix, and it works the same way for either problem: during any traversal, keep track of which directories (by inode number, not by name — the same directory can have several names) have already been visited on the current path, and if a link would revisit one already on that path, stop rather than descend into it. Some systems avoid the problem at the source instead, by allowing links to ordinary files but simply disallowing a directory from being hard-linked into more than one place — UNIX takes this approach, permitting hard links to files only, precisely to keep the directory structure itself an acyclic (in fact, a tree) graph, and using symbolic links, which are already handled specially and can be detected and capped at a maximum resolution depth, for anything that would otherwise need to link a directory into two places.

KEY: A general graph of directories can contain a cycle; a naive recursive traversal or a simple reference count both fail on it. UNIX sidesteps the whole problem for directories by disallowing directory hard-links; symbolic links, which can point anywhere including in a loop, are guarded instead by capping how many symlinks a single path resolution will follow before giving up.

MOUNTING A FILE SYSTEM

A disk (or a partition of one) typically holds its own self-contained file system, complete with its own root directory. Mounting is the operation that attaches that file system into the single directory tree the OS presents to users, at a chosen existing directory called the mount point.

Before mounting, the mount point is an ordinary (usually empty) directory in the existing tree. The mount operation verifies the device holds a valid file system (by checking its structures — met in the next section — against what the OS expects), then makes the root of the new file system take the place of the mount point: any path that descends into that directory now continues into the mounted file system instead of whatever the mount point directory used to contain.

This is how a Windows machine presents C:\, D:\ and a USB drive as what look like separate trees while a UNIX machine presents everything — the root file system, a second disk, a USB drive, even a remote network share via NFS — as one single tree, with mount points scattered through it (/home, /mnt/usb, and so on) that are invisible as mount points once mounted; ls simply shows you the mounted content as if it had always been there. Unmounting reverses this, and normally fails safely if some process still has an open file inside the mounted file system, for exactly the same reason a file's blocks are not freed while it is still open — something still refers to that state.

PROTECTION: WHO MAY DO WHAT

Once files can be shared — across users, via links, via directories anyone can browse — the OS needs to say who is allowed to do what to a given file. Two rather different designs answer this question, and comparing them is what most protection questions are really asking.

An access control list (ACL) attaches, to each file, an explicit list of exactly which users (or groups) may perform exactly which operations — this precision is its whole point, since you can grant "Priya: read, write; Rahul: read only; everyone else: nothing" for one specific file. Its cost is size and management: a heavily-shared file's list can grow arbitrarily long, and every one of those file-level lists must be kept correct as users come and go.

UNIX's classic scheme trades that flexibility for a fixed, tiny representation: every file carries exactly nine permission bits, three bits (read, write, execute — rwx) for each of three classes of user (owner, group, others). This is compact — three bits times three classes fits in one byte with room to spare, no matter how many users exist on the system — at the cost of granularity: you cannot grant one specific non-owning user something different from every other non-owning user without first putting them in a distinct group.

r, w and x mean slightly different things for a directory than for an ordinary file, and this is a standard confusion. For a plain file: r permits reading its contents, w permits writing them, x permits executing it as a program. For a directory: r permits listing the names in it (ls), w permits creating or deleting entries in it (creating or removing files, which changes the directory's own content), and x — confusingly named "execute" — actually permits using the directory in a path, i.e. cd-ing into it or accessing a file inside it by name. A directory with r but not x lets you see what names exist inside it but not open any of them; x without r lets you access a file by name if you already know it exists, but not discover it by listing.

Reading the permission bits as an octal number is the standard exam format, and it works because each rwx triplet is exactly 3 bits, and 3 bits is one octal digit: r is worth 4, w is worth 2, x is worth 1 (the same place-value idea as binary, just grouped into threes), and the digit is the sum of whichever of those apply.

1. Split the octal number into its three digits: one for owner, one for group, one for others.
2. For each digit, work out which of 4 (r), 2 (w), 1 (x) sum to it. A digit can only be one of the eight sums 0 through 7, each a unique combination, so this is always unambiguous.
3. Translate each digit's sum back into the letters it stands for.

Take mode 754. Owner digit 7 = 4+2+1 = read, write, execute. Group digit 5 = 4+1 = read, execute (no write). Others digit 4 = 4 alone = read only. So 754 means: the owner has full control, group members can read and run it but not modify it, and everyone else can only read it. Written out as the familiar ten-character string, that is -rwxr-xr-- (the leading dash marks it as an ordinary file, not a directory).

GATE TRAP: A digit of 6 is read+write, not read+write+execute — 4+2=6, and 1 is not used, so 6 never includes x. Questions deliberately use 6, since it is the one digit students most often mis-expand by assuming "6 must be nearly everything." Also, chmod 777 (all bits set for everyone) does not itself make a file "run automatically" or grant it any special power beyond what its content already does — the execute bit only permits attempting to execute it; whether it does anything sensible when executed is a separate question entirely.

THE LAYERS OF A FILE SYSTEM

Everything above — files, directories, protection — describes what a file system looks like from a user's chair. Internally it is built as a stack of layers, each one hiding the messy detail of the layer below and offering the one above a cleaner interface. This layering is precisely why the same user-visible file behaves identically whether it sits on a hard disk, an SSD, or a network share: only the bottom layer changes.

• Application programs sit on top, calling ordinary library functions like fopen, fread, fwrite.
• The logical file system manages metadata — the whole directory structure, file attributes, protection — and translates a file name into a file's unique identifier (its inode number), without knowing or caring where on the physical disk any block actually is.
• The file-organisation module knows how logical blocks (block 0, block 1, … of a given file, as the file abstraction presents them) map to physical blocks on the device, applying whichever allocation method (contiguous, linked, indexed — the next section) the file system uses, and also handles free-space management.
• The basic file system issues generic commands ("read physical block 4917 from this device") to the appropriate device driver; it does not know what a "file" is at all, only blocks.
• I/O control is the layer of device drivers and interrupt handlers that translates a generic block request into the specific commands a particular piece of hardware understands, and reacts to the interrupt the hardware raises when the operation completes.
• Devices are the physical hardware — the disk itself.

REMEMBER: Each layer only talks to the layer immediately above and below it. The logical file system never issues a raw block command, and the device driver never knows a file name — that separation is exactly what lets one file system implementation run unmodified on a disk, an SSD or a network device, and what lets you plug in a new file-organisation strategy (say, a different allocation method) without touching how directories or protection work.

WHAT SITS ON THE DISK: BOOT BLOCK TO INODE

A disk (or partition) formatted with a file system is laid out with a small number of fixed structures that the layers above rely on. Knowing these makes the allocation and free-space material in the next sections concrete rather than abstract.

The boot block occupies the very first sector(s) of the disk and holds a tiny bootstrap program: the code the machine's firmware loads and runs first, whose entire job is to load the real operating system into memory. It exists at a fixed, known location precisely because at the moment it runs, nothing about the file system has been read yet — the firmware cannot look anything up, it can only read a fixed sector and execute it.

The superblock (called the master file table's start on some systems) holds file-system-wide metadata: the total number of blocks, the block size, a pointer to the free-block information, and a magic number identifying the file-system type (which is how mounting, above, checks that a device really holds the file system it claims to). Corruption of the superblock is catastrophic precisely because everything else is found by starting from it — most systems keep backup copies at other fixed locations for exactly this reason.

Per-file metadata is kept in a file control block, FCB (the general term; on UNIX specifically, this is the inode). One inode exists per file, holding everything from the file-attributes list earlier — permissions, owner, size, timestamps — plus the pointers that say where the file's data blocks actually are (worked out in full in the next two sections). Inodes are usually kept in a dedicated, fixed-size table on disk, separate from ordinary data blocks, which is why a file system can run out of inodes (too many small files) even while free data blocks remain.

A directory, mechanically, is nothing more than a file: its content is a list of (name, inode-number) pairs, its own inode describes it exactly like any other file's inode does, and it is read and written using the very same block-level machinery as any other file's data. Nothing about the layers below the logical file system needs to know that a particular file happens to be a directory.

ALLOCATING BLOCKS TO A FILE: CONTIGUOUS ALLOCATION

Given a file that needs N blocks, and a disk full of free and occupied blocks, where should those N blocks go? This is the file-allocation problem, and each of the three answers below trades off differently between fast access, easy growth, and wasted space — trade-offs you should expect, and derive, rather than memorise as isolated facts.

Contiguous allocation stores a file as one unbroken run of consecutive blocks: the directory entry (or inode) need only record the starting block and the length in blocks. This is the simplest possible scheme, and it gives the best possible access performance: sequential access needs no seeking at all block-to-block (consecutive blocks are consecutive on the disk, so after reading block k the head is already positioned for block k+1), and direct access to the i-th block is a single computed address, starting-block + i, with no traversal of anything.

The catch is exactly the one contiguous memory allocation has in the earlier chapter, for the same underlying reason: as files are created and deleted, the disk accumulates external fragmentation — free space broken into many small runs, none individually large enough for a new file that needs more blocks than any single run holds, even though the free blocks sum to plenty. Periodic compaction (copying files to consolidate free space into one run) fixes it but is expensive on a device this large, and cannot run while files are in active use.

The second catch is specific to files: you must decide how many blocks to allocate before you know how large the file will eventually grow, because contiguous allocation is only free of seeking as long as the run really is contiguous. Allocate too little and the file may need to grow past the space reserved for it, forcing either a fresh, larger contiguous run elsewhere (an expensive full copy) or a jump to a second, non-contiguous extent (which then needs exactly the same "where is the next piece" bookkeeping that linked or indexed allocation provides from the start). Allocate generously to leave growing room and you waste space in every file that never grows into it, and you make the fragmentation problem worse by handing out larger free runs than files ask for. This is precisely the internal-versus-external fragmentation trade-off met with memory, playing out again because the same abstract allocation problem is happening on a different resource.

LINKED ALLOCATION AND FAT

Linked allocation removes the "know the final size in advance" and "one broken pointer look-up" seeking cost of contiguity by keeping the file as a chain of blocks scattered anywhere on the disk, each block holding a pointer to the next; the directory entry needs only the address of the first block (and, often, the last, so appending does not require walking the whole chain).

This has no external fragmentation at all — any free block, however scattered, can be linked into any file, so the free-space list and the allocator never have to search for a run of any particular length. Files also grow trivially: link one more free block onto the tail whenever more space is needed, no relocation ever required, so there is no "guess the final size" problem to get wrong.

The cost is access speed for anything except pure sequential reading. To reach the i-th block of the file, there is no formula — you must start at the first block and follow i pointers, one disk read per hop, because the only place the "next block" address is recorded is inside the previous block. Sequential access is unaffected (you were following the chain in order anyway), but direct access, cheap under contiguous allocation, becomes the single most expensive part of using this scheme for anything but front-to-back reading. Reliability is also fragile in a specific way: because each block's only link to the rest of the file is the one pointer stored inside it, a single corrupted pointer — one bad sector — severs the chain, and every block after that point becomes unreachable, with no independent record of what should come next.

FAT (File Allocation Table) is the standard fix for the direct-access cost, without giving up linked allocation's freedom from external fragmentation and easy growth. Instead of scattering each "next block" pointer a few bytes into every individual data block (which forces a full block read just to discover where the next block is), FAT gathers every file's complete chain of next-block pointers into one single table, held once in a reserved area of the disk. This table is small enough to load into memory in its entirety and keep cached, so following (or even jumping partway into) a file's chain becomes a sequence of in-memory table look-ups rather than a sequence of disk reads — direct access is still not the single computed address contiguous allocation gives you, since you must still walk i entries of the (now in-memory) chain, but each of those i steps costs nothing once the table is cached, rather than costing a disk access as in plain linked allocation.

GATE TRAP: FAT is still fundamentally linked allocation — the file is still a chain of blocks in an arbitrary order on disk — and it is regularly set as a distractor answer to "which method avoids external fragmentation and supports easy file growth" alongside plain linked allocation, since both share that property; the distinguishing fact examiners actually test is where the pointers live (scattered in data blocks versus gathered into one cacheable table), not whether fragmentation occurs.

INDEXED ALLOCATION AND THE UNIX INODE

Indexed allocation gets direct access back without demanding contiguity, by giving each file a dedicated index block: an array of pointers, one per data block of the file, all gathered in one place instead of scattered one-per-block through the chain. To reach the i-th block, read the index block once (if it is not already cached), read pointer i out of it, and go straight to that data block — one indirection, not i of them.

The remaining question is what to do when a file needs more data blocks than fit the pointers in one index block. Three answers exist, and the third is the one every real UNIX-family file system actually uses.

Linked index blocks chain several index blocks together (each index block reserves its last pointer slot for the address of the next index block, rather than for a data block) — this removes the size limit but reintroduces exactly the linked-allocation cost for reaching a very distant block, since you may need to walk several index blocks in sequence to find the one holding pointer i.

Multilevel indexing uses a first-level index block whose pointers do not point at data blocks at all, but at second-level index blocks, which then point at the actual data — a two-level (or deeper) tree of pointers rather than a chain, so any block is reached in a fixed, small number of hops (two, for two levels) regardless of how large the file is, rather than a number of hops that grows with the file's size the way a linked chain of index blocks does.

The UNIX inode combines several fixed direct pointers (which point straight at the first several data blocks — no indirection at all, so the common case of a small file needs no index-block read whatsoever) with progressively deeper indirection for files that outgrow the direct pointers: one single-indirect pointer (to one index block, whose entries point directly at data blocks), one double-indirect pointer (to an index block whose entries point at further index blocks, whose entries in turn point at data blocks), and one triple-indirect pointer (one level deeper again). This is multilevel indexing, but with the levels only engaged as needed, so a small file pays no indexing overhead at all and only a file that has genuinely grown enormous pays for the deepest levels.

[[FIG:inode-indirect]]

DERIVING THE MAXIMUM FILE SIZE

The classic GATE numerical asks for the largest file this scheme can address, and it is worth deriving fully once so that any variation on the numbers is just re-doing the same four short calculations, rather than a fact to recall.

Let the block size be B bytes and each disk-address pointer occupy P bytes. A single block, used purely as a table of pointers, then holds B / P pointers — call this number p. Every level of indirection multiplies the reach by exactly this factor p, because one more level of indirection means "one pointer now leads to a whole block of p pointers instead of leading straight to data," and a block of p pointers each capable of addressing B bytes of data (directly, or via yet more indirection) is what makes the next level p times bigger than the one before it.

1. Direct blocks: with d direct pointers, they address d whole data blocks directly — no index block is read at all. Contribution: d × B bytes.

2. Single indirect: the one single-indirect pointer leads to one index block holding p pointers, each pointing straight at one data block. Contribution: p × B bytes.

3. Double indirect: the one double-indirect pointer leads to one index block holding p pointers — but now each of those p pointers leads to another index block of p pointers each, i.e. p × p = p² data blocks are reachable. Contribution: p² × B bytes.

4. Triple indirect: one more level of the same reasoning gives p × p × p = p³ data blocks reachable. Contribution: p³ × B bytes.

Adding all four contributions gives the maximum file size:

max file size = (d + p + p² + p³) × B, where p = B / P

Work the classic numbers: 12 direct pointers, block size B = 4096 bytes (4 KB), pointer size P = 4 bytes. First, p = B / P = 4096 / 4 = 1024 pointers per block.

Direct: 12 × 4096 = 49,152 bytes = 48 KB.
Single indirect: 1024 × 4096 = 4,194,304 bytes = 4 MB.
Double indirect: 1024² × 4096 = 1,048,576 × 4096 = 4,294,967,296 bytes = 4 GB.
Triple indirect: 1024³ × 4096 = 1,073,741,824 × 4096 = 4,398,046,511,104 bytes = 4 TB.

Summing exactly: total pointer-count term is 12 + 1024 + 1,048,576 + 1,073,741,824 = 1,074,791,436; multiplied by the block size 4096 gives 4,402,345,721,856 bytes, which is a little over 4 TB — about 4.004 TB, the extra 0.004 TB coming from the direct, single- and double-indirect terms, which are utterly swamped by the triple-indirect term alone.

max file size ≈ 4 TB (12 direct, 4 KB blocks, 4-byte pointers)

Notice the shape of the answer: each level is roughly 1024 times the one before it (48 KB → 4 MB → 4 GB → 4 TB), because that ratio is exactly p. Whenever p is large, as it almost always is, the highest level of indirection present completely dominates the total, and the direct pointers exist only so that small files — the overwhelming majority of files on any real system — never pay for any indirection at all.

Now a second case with different numbers, worked the same way, to check the method rather than the memorised figure: block size B = 2048 bytes (2 KB), pointer size P = 4 bytes, 10 direct pointers.

p = 2048 / 4 = 512 pointers per block.
Direct: 10 × 2048 = 20,480 bytes = 20 KB.
Single indirect: 512 × 2048 = 1,048,576 bytes = 1 MB.
Double indirect: 512² × 2048 = 262,144 × 2048 = 536,870,912 bytes = 512 MB.
Triple indirect: 512³ × 2048 = 134,217,728 × 2048 = 274,877,906,944 bytes = 256 GB.

Total ≈ 256 GB + 512 MB + 1 MB + 20 KB ≈ 256.5 GB, again dominated overwhelmingly by the triple-indirect term. Same method, completely different block and pointer sizes, same shape of answer: whichever indirection level is deepest available dominates by a factor of roughly p at each step down.

GATE TRAP: The formula only adds cleanly if you keep B and P consistent — a common error is to use B in KB in one term and bytes in another, or to forget that p itself depends on both B and P (p = B/P, not just B). Compute p once, as a plain number, before touching any of the four terms, exactly as done above.

HOW MANY DISK ACCESSES TO READ ONE BYTE

A closely related question asks how many separate disk reads are needed to fetch the byte at a given offset in a file, using the same indirect-pointer scheme — and the answer depends on exactly one thing: whether the file's inode is already sitting in memory (typically because it was cached from a recent operation) or must itself be read from disk first.

The method: first work out which of the direct / single-indirect / double-indirect / triple-indirect regions the target offset falls into, by comparing it against the cumulative sizes of each region (exactly the d×B, p×B, p²×B, p³×B terms derived above); then count one disk access for every index block that must be read along the way to that region, plus one final access for the actual data block, plus one more if the inode itself is not already in memory.

Take the classic 12-direct, 4 KB-block, 4-byte-pointer inode again (p = 1024), and ask for byte offset 20,000.

1. The direct region covers bytes 0 through 12 × 4096 − 1 = 49,151. Offset 20,000 is within that range, so this byte lives in a direct block — no index block is involved at all. Which direct block: 20,000 / 4096 = 4.88, so it is block index 4 (0-based), the fifth direct pointer.

2. If the inode is already in memory, the pointer is already known, so exactly 1 disk access is needed: read that one data block.

3. If the inode is not in memory, one further access is needed first, to read the inode itself — 2 disk accesses in total.

Now ask for byte offset 100,000 in the same file.

4. The direct region ends at byte 49,151, so offset 100,000 lies beyond it, in the single-indirect region, which covers bytes 49,152 through 49,152 + 1024 × 4096 − 1. The offset within that region is 100,000 − 49,152 = 50,848. Dividing by the block size, 50,848 / 4096 = 12.4, so this is pointer index 12 (0-based) inside the single-indirect block.

5. With the inode in memory, the single-indirect pointer's address is already known: one access reads the single-indirect index block (to get pointer 12's value), and a second access reads the actual data block it names. Total: 2 disk accesses.

6. Without the inode in memory: one more access to fetch the inode first, making 3 disk accesses in total.

The same reasoning extends outward: a byte in the double-indirect region costs one access for the double-indirect block, one for the single-indirect block it points to, one for the data block — 3 with the inode cached, 4 without; a byte in the triple-indirect region costs 4 with the inode cached, 5 without.

REMEMBER: The number of accesses equals the number of indirection levels the offset falls into, plus one for the final data block, plus one more only if the inode itself was not already resident. Direct = 0 index-block reads; single-indirect = 1; double = 2; triple = 3 — always plus 1 for the data block itself.

FREE SPACE MANAGEMENT

Whichever allocation method is in use, the file system must know which blocks are currently free, so it can hand them out to a growing or newly-created file. Four structures are standard, and each is a different point on the trade-off between compactness and speed of finding what you need.

A bit vector (bitmap) dedicates exactly one bit to every block on the disk: 1 for allocated, 0 for free. Finding n free blocks means scanning for n consecutive 0 bits, which is fast with word-at-a-time tricks (skip any all-1s word instantly, since it certainly has no free bit in it) and is especially convenient for finding a contiguous run for contiguous allocation. Its drawback is that its own size scales with total disk capacity — a very large disk needs a correspondingly large bitmap that must itself live somewhere, usually pinned in memory for speed.

Worked example: a 1 TB (2^40 byte) disk with a 4 KB (2^12 byte) block size has 2^40 / 2^12 = 2^28 blocks. At one bit per block, the bitmap needs 2^28 bits; dividing by 8 to get bytes (2^28 / 2^3 = 2^25 bytes), and since 2^20 bytes is one MB, that is 2^5 × 1 MB = 32 MB.

bitmap size (bytes) = (disk capacity / block size) / 8

A linked list of free blocks links every free block to the next free block, exactly as linked allocation links a file's data blocks — no space is wasted in proportion to disk size beyond the list pointers themselves (which live inside the free blocks, costing nothing extra, since a free block has no data to protect), but finding several contiguous free blocks means walking the list checking addresses, with no shortcut the way a bitmap's word-skipping gives you.

Grouping speeds up finding many free blocks at once: the first free block in a group stores the addresses of several other free blocks (not just the next one); the last of those addresses stored is itself the location of a further group's addresses, and so on — this gives fast access to a large number of free blocks with far fewer list-traversal steps than following one-link-at-a-time.

Counting exploits the fact that blocks tend to be allocated and freed in contiguous runs (a file's worth of blocks, freed together when the file is deleted): instead of one entry per free block, keep one entry per contiguous run — a starting block address plus a count of how many consecutive blocks starting there are free — compactly representing what might otherwise be hundreds of individual free-block entries as a single (address, count) pair.

GATE TRAP: "A bitmap wastes no space" is false — its size is exactly proportional to the number of blocks on the disk, growing without bound as disks grow, which is the whole reason grouping and counting exist as alternatives for very large disks. What is true is that a bitmap's size does not depend on how many of those blocks happen to be free at any moment, unlike a linked list or counting scheme, whose sizes shrink and grow with the free-block count itself.

THE PHYSICAL DISK: PLATTERS, TRACKS, SECTORS, CYLINDERS

Everything above assumed a disk that can be told "read block N" and does so. To reason about how long that takes — needed for the performance and scheduling sections that follow — you need the physical geometry those block numbers are ultimately translated into.

[[FIG:disk-geometry]]

A hard disk holds one or more platters, flat circular disks coated with magnetic material, stacked on a common spindle that spins them all together at a constant speed. Each platter surface is divided into concentric circles called tracks, and each track is divided into fixed-size arcs called sectors, the smallest unit the disk can read or write in one operation (this is the physical sector; the OS's logical "block," met throughout this chapter, is usually one sector or a small fixed group of them). A read/write head, one per platter surface, sits at the end of an arm; all the arms move together, so at any instant every head sits over the same track number on its own platter.

A cylinder is the set of all tracks, one from each platter, that share the same track number — because the arms move together, all of these tracks are directly above/below one another and are reachable without moving the arm at all, just by switching which head is active electronically. This is why cylinder, not track, is the unit disk scheduling actually reasons about: moving the arm (a seek) is the slow, mechanical part, and once positioned at a cylinder, reading any track within it (any platter) costs no further seek.

The CHS (cylinder-head-sector) address is the classical way of naming a physical block: which cylinder to seek to, which head (hence which platter surface) to select once there, and which sector on that track to wait for. Modern disks present a single flat number instead — logical block addressing (LBA) — and translate it to CHS internally, but the underlying mechanical reality CHS describes is exactly what makes seek time and rotational latency, next, real physical costs rather than accounting fictions.

HOW LONG A DISK ACCESS TAKES

A single disk access — read this one block — takes time made of three physically distinct pieces, and treating them separately is what lets you compute an access time from raw specifications rather than merely naming the pieces.

Seek time is how long the arm takes to move to the cylinder holding the target track. It depends on how far the arm must travel and is usually given directly as an average figure in problems (a genuine physical derivation from arm mechanics is not something GATE numericals ask for); this is also exactly the quantity disk scheduling, in the next section, is trying to minimise the total of, across many pending requests.

Rotational latency is how long, once positioned at the right cylinder, the disk must wait for the platter to spin around until the target sector arrives under the head. On average, across many requests landing at random points on the track, the head arrives when the target sector is anywhere from right there to a full revolution away, so the average wait is half a revolution — this is a genuine derivation, not a quoted constant: if the target sector's position relative to the head is uniformly random between 0 and one full revolution, the expected wait is exactly half of one revolution's time.

1. Time for one full revolution = 60 seconds / RPM (RPM is revolutions per minute; dividing 60 seconds by it gives seconds per revolution).
2. Average rotational latency = half of that: 30 / RPM seconds, or equivalently (60/RPM)/2.

average rotational latency = (1/2) × (60 / RPM)

Transfer time is how long it takes to actually move the requested bytes off the spinning platter once the head is positioned and the right sector has arrived, and it scales directly with how much of the track's total data you are reading relative to a full revolution's worth: transfer time = (bytes to transfer / bytes per track) × time for one revolution — a full track's worth of data takes one full revolution to go under the head; a fraction of a track takes that same fraction of a revolution.

Putting the three pieces together:

total access time = seek time + rotational latency + transfer time

Worked example, matching the style GATE poses: a disk spins at 6000 RPM, has 1000 sectors per track of 512 bytes each, and has an average seek time of 8 ms. Find the average time to read one sector.

1. Time per revolution = 60 / 6000 = 0.01 s = 10 ms.
2. Average rotational latency = half of that = 5 ms.
3. Transfer time for one sector out of 1000 on the track = 10 ms / 1000 = 0.01 ms.
4. Total access time = 8 + 5 + 0.01 = 13.01 ms.

GATE TRAP: "Rotational latency is the time for one full revolution" is a common misreading — it is HALF a revolution on average, because on average the target sector is already halfway round by the time the head is positioned. Using the full-revolution time as the latency, rather than halving it, is the single most common arithmetic slip in this numerical.

DISK SCHEDULING: CHOOSING THE ORDER

A busy disk has many pending requests queued up at once — several processes each wanting a different block read or written — and each request names a cylinder the arm must seek to. Since seek time dominates the cost of an access (rotational latency and transfer time are the same regardless of the order requests are serviced in, but total seek distance depends entirely on the order), the OS's job is to choose an order for the pending requests that minimises total head movement. This is disk scheduling, and every algorithm below is a different rule for that one choice.

FCFS (first-come, first-served) services requests strictly in the order they arrived, with no regard to their cylinder numbers. It is trivially fair and trivially simple, but arrival order has nothing to do with physical layout, so it can produce wildly erratic, back-and-forth head movement — the worst-case behaviour every other algorithm here exists to avoid.

SSTF (shortest seek time first) always services whichever pending request is currently nearest to the head, greedily. This generally gives excellent average movement, since it never takes a large step while a smaller one is available — but it can starve a request that happens to sit far from a cluster of closer, continually-arriving requests, since SSTF has no notion of how long a request has been waiting, only of how close it currently is.

SCAN (the "elevator" algorithm) moves the head steadily in one direction, servicing every request it passes, all the way to the disk's physical boundary (cylinder 0 or the maximum cylinder) even if no pending request sits exactly there — then reverses and sweeps back the same way. Moving all the way to the boundary regardless of where the last actual request was is the defining, and slightly wasteful, feature of plain SCAN.

C-SCAN (circular SCAN) also sweeps to the boundary servicing requests along the way, but instead of reversing and servicing on the return trip, it jumps back to the opposite boundary without servicing anything during the jump, then sweeps again in the same original direction. Treating the disk as circular this way makes the wait experienced by any given cylinder far more uniform than plain SCAN gives — under SCAN, a request just missed as the head passes can wait almost two full sweeps for the head to come back around, while under C-SCAN every cylinder is revisited via the same one-directional rhythm, so the worst-case wait is bounded much more tightly.

LOOK is the practical refinement of SCAN: rather than travelling all the way to the physical boundary, it reverses as soon as it has serviced the last pending request in the current direction — it "looks" at the queue and stops exactly where the requests stop, never touching a boundary no request needed it to touch.

C-LOOK does the same refinement to C-SCAN: instead of jumping all the way back to the opposite physical boundary, it jumps only as far as the lowest (or highest, depending on direction) pending request remaining, then resumes sweeping in the original direction from there.

REMEMBER: SCAN and C-SCAN always go all the way to 0 or the maximum cylinder, whether or not a request is waiting there; LOOK and C-LOOK stop (and, for C-LOOK, jump) exactly at the extreme pending request instead, never overshooting to an empty boundary.

TRACING ALL SIX ALGORITHMS ON ONE QUEUE

The only way to actually get these right under exam pressure is to trace every algorithm on identical numbers, so a single mistake in one trace stands out against the others. Use one running example throughout: a disk with cylinders numbered 0 to 199, the head currently at cylinder 50, and pending requests, in arrival order, of 45, 90, 150, 60, 20, 175. Assume SCAN, C-SCAN and LOOK first move toward increasing cylinder numbers, and that C-SCAN's return jump counts fully toward total head movement (the convention this chapter states explicitly, since other conventions exist and change only this one number).

Sorted by cylinder for convenience: 20, 45, 60, 90, 150, 175, with the head starting at 50.

FCFS — services strictly in arrival order 45, 90, 150, 60, 20, 175.

1. 50 → 45: distance 5.
2. 45 → 90: distance 45.
3. 90 → 150: distance 60.
4. 150 → 60: distance 90.
5. 60 → 20: distance 40.
6. 20 → 175: distance 155.

Total = 5 + 45 + 60 + 90 + 40 + 155 = 395.

SSTF — always the nearest remaining request.

7. From 50, nearest is 45 (distance 5).
8. From 45, nearest remaining is 60 (distance 15).
9. From 60, nearest remaining is 90 (distance 30).
10. From 90, nearest remaining is 150 (distance 60).
11. From 150, nearest remaining is 175 (distance 25).
12. From 175, only 20 remains (distance 155).

Total = 5 + 15 + 30 + 60 + 25 + 155 = 290.

SCAN — sweep up to the boundary (199), then down.

13. Upward from 50, servicing 60, 90, 150, 175 along the way, continuing to the boundary at 199: distance 199 − 50 = 149.
14. Reverse; downward from 199 to the lowest remaining request, 20 (servicing 45 on the way): distance 199 − 20 = 179.

Total = 149 + 179 = 328.

C-SCAN — sweep up to 199 servicing along the way, jump back to 0 (counted in full), resume upward.

15. Upward from 50 to 199, servicing 60, 90, 150, 175: distance 149.
16. Jump from 199 back to 0 (no service during the jump, full width counted): distance 199.
17. Upward again from 0, servicing 20 then 45: distance 45 − 0 = 45.

Total = 149 + 199 + 45 = 393.

LOOK — like SCAN, but reverses at the last request rather than the boundary.

18. Upward from 50, servicing 60, 90, 150, and finally 175 (the last request in this direction — reverse here, not at 199): distance 175 − 50 = 125.
19. Downward from 175, servicing 45 and finally 20 (the last request in this direction): distance 175 − 20 = 155.

Total = 125 + 155 = 280.

C-LOOK — like C-SCAN, but jumps only to the nearest pending request rather than the boundary.

20. Upward from 50, servicing 60, 90, 150, 175 (the last request going up): distance 125.
21. Jump from 175 directly to the lowest pending request, 20 (no service during the jump, and no trip to 199 or 0 — jump straight to 20): distance 175 − 20 = 155.
22. Resume upward from 20 to 45, servicing it: distance 25.

Total = 125 + 155 + 25 = 305.

[[FIG:disk-scan]]

Collected together, on this identical queue: FCFS 395, SSTF 290, SCAN 328, C-SCAN 393, LOOK 280, C-LOOK 305. Notice LOOK beats SSTF here (280 versus 290) — not a general law (no single algorithm wins for every possible queue, which is exactly why these must be traced rather than ranked from memory), but it is what this queue happens to produce, and reproducing every number above by hand is the actual skill being tested.

GATE TRAP: The most common error is applying LOOK's "stop at the last request" rule while still adding the trip to the boundary out of habit from SCAN, or the reverse — computing SCAN but forgetting to include the final run to the boundary. Write down, before tracing, exactly which of the two rules applies to the algorithm you are computing, and do not let the number for one contaminate the other.

RAID: REDUNDANCY ACROSS DISKS

A single disk is a single point of failure: however carefully the file system above is designed, if the physical platter fails, the data on it is gone. RAID (Redundant Array of Independent Disks) is the technique of spreading data across several physical disks so that the array as a whole survives — and often outperforms — any one disk failing.

[[FIG:raid-layout]]

RAID 0 stripes data across disks with no redundancy at all: consecutive chunks of a file go to disk 0, disk 1, disk 0, disk 1, and so on. Because several disks can be read or written simultaneously, this gives the best possible performance and the full combined capacity of every disk (n disks of size S give usable capacity n × S) — but it tolerates zero failures: losing any one disk loses stripes belonging to every file, effectively destroying the whole array. RAID 0 is redundancy in name only; it belongs on this list purely as the baseline every other level compares against.

RAID 1 mirrors: every block is written, identically, to two disks. Usable capacity is halved (n disks give n/2 × S usable, since every byte is stored twice) but any single disk in a mirrored pair can fail with zero data loss — reads can even be split across both mirrors for extra read throughput, though every write must go to both.

RAID 2 stripes at the bit level and stores error-correction (Hamming) codes on dedicated separate disks, so that many redundant disks are needed proportional to the number of data disks — this level was designed for disks without built-in error detection, is not used in practice on any modern hardware (modern disks already detect their own errors), and is mostly tested as a name-recognition fact: "which RAID level uses Hamming codes."

RAID 3 stripes at the byte level and dedicates exactly one disk to parity, computed across the corresponding bytes of every other disk. One disk's worth of capacity is lost to parity regardless of array size, and any single data disk's failure is recoverable by recomputing the missing bytes from the parity and the surviving disks. Its byte-level striping means every single read or write touches every disk in the array, so no two independent small requests can be serviced in parallel — good for one large sequential transfer, poor for many small simultaneous ones.

RAID 4 is RAID 3 with block-level (rather than byte-level) striping and, again, one dedicated parity disk. Block-level striping now lets independent reads of different blocks be serviced in parallel, since a read of one block touches only the one data disk holding it. But every single write, however small, must also update the one shared parity disk (since that write changes the parity for its stripe) — so the parity disk is touched by every write from every part of the array, becoming a serialising bottleneck exactly as one shared resource always does under concurrent demand, however fast the other disks are.

RAID 5 fixes RAID 4's parity bottleneck by not dedicating any one disk to parity at all: each stripe's parity block is stored on a different disk, rotating round the array stripe by stripe, so that parity-writing load is spread evenly across every disk rather than concentrated on one. Usable capacity is (n − 1) × S out of n disks of size S — exactly one disk's worth is lost to parity overall, same as RAID 4, just distributed rather than dedicated — and it tolerates exactly one disk failure, recovered the same way: recompute the missing disk's data from parity and the survivors.

The parity computation itself is a bitwise XOR across the corresponding bits (or bytes) of every data disk in the stripe: parity = D0 ⊕ D1 ⊕ D2 ⊕ … To recover a failed disk Dk, XOR the parity together with every surviving data disk in that stripe: the two appearances of every disk other than Dk cancel out under XOR (X ⊕ X = 0), leaving exactly Dk. This is why exactly one parity block suffices to recover exactly one missing disk, and why two simultaneous failures in the same stripe cannot be recovered from a single parity block — there is not enough independent information left to solve for two unknowns from one equation.

RAID 6 extends RAID 5 with a second, independently-computed parity block per stripe (typically using a different algorithm, such as Reed–Solomon coding, so the two parities are genuinely independent equations rather than the same one twice), at the cost of two disks' worth of capacity instead of one — usable capacity (n − 2) × S — in exchange for tolerating any two simultaneous disk failures rather than just one.

RAID 0+1 and RAID 1+0 (RAID 10) both combine striping and mirroring, and the order in which the two are combined is the tested distinction. RAID 0+1 first stripes across two sets of disks, then mirrors each entire stripe set onto the other — losing one disk takes out its whole stripe set, leaving the array running on the surviving mirrored set alone, so a second failure anywhere in that remaining set kills the array. RAID 1+0 first mirrors pairs of disks, then stripes across those mirrored pairs — losing one disk only takes out its one mirror partner as a pair, and the array survives any further failure as long as it does not also hit that same pair's other disk; this makes RAID 10 more resilient to a second failure than RAID 0+1 for the identical set of physical disks, and is why RAID 10 is generally preferred in practice.

GATE TRAP: "RAID 4 and RAID 5 have the same usable capacity and the same fault tolerance" is true and is not the trick; the trick is assuming they therefore perform the same, when the entire reason RAID 5 exists is that RAID 4's single dedicated parity disk becomes a write bottleneck under concurrent access that RAID 5's rotating parity avoids, even though both lose exactly one disk of capacity and both tolerate exactly one failure.

I/O: POLLING, INTERRUPTS AND DMA

Zoom out from the disk specifically to I/O devices generally, because the mechanisms below are shared by disks, keyboards, network cards and everything else the CPU talks to, and they are what actually make the "issue a read, then the process moves to Waiting until it completes" story from the process chapter physically happen.

Polling is the simplest possible way for the CPU to find out whether a device is ready: repeatedly read the device's status register in a loop, checking a busy/ready bit, until it says ready. This wastes CPU cycles on every iteration where the device is not yet ready — for a slow device, the CPU could have run another process instead — but it has no overhead at all for a device fast enough that it will almost certainly be ready by the time you check, which is exactly why polling is still used for very fast devices, or as the last microsecond of a longer wait that used interrupts to sleep through the slow part first.

Interrupts remove the busy-waiting: the CPU issues the I/O request and moves on to other work; the device itself raises a hardware interrupt when it finishes, which the CPU services (via the interrupt-handling mechanism, the same trap-based mode switch met in the processes chapter) only at that moment. This is why "Running → Waiting → (I/O completes) → Ready" works without the CPU ever having to ask "are we there yet" — the device tells it.

DMA (direct memory access) removes a further cost that plain interrupts still carry: transferring the actual data. Without DMA, the CPU itself must copy every single word or byte between the device and memory (an interrupt merely says "data is ready," not "data has arrived in memory" — something still has to move it, one access at a time, tying up the CPU for every word of what could be a very large transfer). A DMA controller is given the source, destination and length of a transfer once, and then moves the entire block directly between the device and memory on its own, interrupting the CPU only a single time, when the whole transfer is complete, rather than once per word.

1. The CPU programs the DMA controller with the source address, destination address and transfer length.
2. The CPU is free to run other work; the DMA controller and the device handle the transfer independently, without CPU involvement in moving each word.
3. When the entire transfer finishes, the DMA controller raises one interrupt, telling the CPU the data is now in memory and ready.

DMA is used for exactly the devices that move a lot of data per operation — disks, network cards — where saving the CPU one interrupt-and-copy per word matters; a keyboard, which produces one byte per keystroke at human typing speed, gains nothing from DMA and is universally handled by plain interrupts instead.

A device driver is the software, specific to one class of device, that translates the generic "read this block" commands the basic file system layer issues into the exact register-level commands that particular hardware understands, and translates the hardware's interrupts and status codes back into a result the OS layers above can use uniformly. This is exactly the I/O-control layer named earlier in the file-system layering, and it is what lets the same file-system code run over completely different physical disks: only the driver changes.

BUFFERING, CACHING, SPOOLING AND THE UNIFIED BUFFER CACHE

Three words describe superficially similar things — all involve holding data in memory rather than acting on a device immediately — and are worth telling apart precisely because they solve three different problems.

Buffering holds data in memory temporarily to cope with a speed mismatch between a producer and a consumer that transfer data at different rates or in different-sized chunks — a network card delivering data faster in bursts than an application reads it, say. A buffer smooths the mismatch out without either side needing to match the other's pace exactly.

Caching keeps a copy of data that already exists somewhere slower (typically disk) in a faster place (memory), specifically so that a second request for the same data can be satisfied without paying the slow device's cost again. Where buffering is about a mismatch in speed or size between two things being moved once, caching is about avoiding repeating the same slow fetch.

Spooling holds output destined for a device that can only serve one job at a time (the classic example is a printer) in a holding area on disk, so that many processes can each "print" independently without needing exclusive access to the device itself or waiting for each other; a separate spooler process feeds the device from that holding area, one job at a time, in whatever order it chooses.

REMEMBER: Buffering copes with a speed or size mismatch on one transfer; caching avoids repeating a slow fetch by keeping data around after it; spooling lets many independent processes share one serial device by holding their output until the device is free.

The buffer cache is the specific application of caching to disk blocks: recently read (or about-to-be-written) blocks are kept in memory, so that a second read of the same block is satisfied from memory, and writes can be accumulated and flushed to disk in a more efficient pattern than one write per system call. A unified buffer cache goes one step further and uses the same pool of memory for this purpose regardless of whether the data was reached through the ordinary file I/O calls (read/write) or through a memory-mapped file (where a file's contents are mapped directly into a process's address space and accessed as if they were memory) — without unification, the same disk block could exist twice in memory, once cached for file I/O and once cached for memory-mapping, with no way to keep the two copies consistent with each other; unifying them means every access path shares one authoritative in-memory copy of each block.

WORKED PROBLEMS

Each of these is a pattern that appears in the paper. Follow the working, not just the final number.

1. A UNIX-style inode has 10 direct pointers, one single-, one double- and one triple-indirect pointer. Block size is 4 KB, pointer size is 4 bytes. Find the maximum file size.
   p = 4096 / 4 = 1024. Direct: 10 × 4096 = 40,960 bytes ≈ 40 KB. Single indirect: 1024 × 4096 = 4,194,304 bytes = 4 MB. Double indirect: 1024² × 4096 = 4,294,967,296 bytes = 4 GB. Triple indirect: 1024³ × 4096 = 4,398,046,511,104 bytes = 4 TB. Total ≈ 4 TB + 4 GB + 4 MB + 40 KB, overwhelmingly dominated by the 4 TB triple-indirect term, giving a maximum file size of a little over 4 TB.

2. Same inode as problem 1. What is the offset, in bytes, of the very first byte reachable only through the double-indirect pointer (i.e. the first byte beyond everything the direct and single-indirect pointers can reach)?
   Direct covers bytes 0 to 10 × 4096 − 1 = 40,959. Single indirect covers the next 1024 × 4096 = 4,194,304 bytes, i.e. bytes 40,960 to 40,960 + 4,194,304 − 1 = 4,235,263. So the first byte needing the double-indirect pointer is byte 4,235,264.

3. Using the same inode, how many disk accesses are needed to read the byte at offset 4,300,000, (a) with the inode already cached in memory, and (b) with the inode not in memory?
   From problem 2, the double-indirect region starts at byte 4,235,264. Offset 4,300,000 is within it (4,300,000 − 4,235,264 = 64,736 bytes into that region), so it needs the double-indirect pointer. With the inode cached: 1 access for the double-indirect block, 1 for the single-indirect block it names, 1 for the data block itself — 3 accesses. Without the inode cached: one further access to read the inode first — 4 accesses.

4. A 1 TB disk uses 4 KB blocks and a bit-vector free-space map. Find the size of the bitmap, and find the block number of the first free block if the bitmap's first three bytes (in binary) are 11111111 11110000 00000000.
   Number of blocks = 2^40 / 2^12 = 2^28. Bitmap size = 2^28 bits / 8 = 2^25 bytes = 32 MB. Reading the given bits in order, bits 0–11 are 1 (allocated) and bit 12 (the first 0) is the first free block, so block number 12 is the first free block.

5. A disk rotates at 7200 RPM, has 500 sectors per track of 512 bytes each, and an average seek time of 6 ms. Find the average time to read one sector, and the time to read an entire track.
   Time per revolution = 60 / 7200 = 8.333 ms. Average rotational latency = half that = 4.167 ms. Transfer time for one sector = 8.333 / 500 = 0.0167 ms. Average access time for one sector = 6 + 4.167 + 0.0167 ≈ 10.18 ms. To read a whole track, the transfer time becomes the full 8.333 ms (a whole revolution), so total time = 6 + 4.167 + 8.333 = 18.5 ms.

6. Disk cylinders 0–199, head at 50, pending requests (arrival order) 45, 90, 150, 60, 20, 175, moving toward increasing cylinders first, C-SCAN's return jump counted in full. Compute total head movement for FCFS, SSTF, SCAN, C-SCAN, LOOK and C-LOOK.
   Tracing each exactly as above: FCFS = 5+45+60+90+40+155 = 395. SSTF = 5+15+30+60+25+155 = 290. SCAN = (199−50)+(199−20) = 149+179 = 328. C-SCAN = 149+199+45 = 393. LOOK = (175−50)+(175−20) = 125+155 = 280. C-LOOK = 125+155+25 = 305.

7. A RAID 5 array has 6 disks of 1 TB each. Find the usable capacity and the number of disk failures it can survive. Compare with the same 6 disks under RAID 6 and under RAID 1+0.
   RAID 5: usable = (6−1) × 1 TB = 5 TB, survives exactly 1 failure. RAID 6: usable = (6−2) × 1 TB = 4 TB, survives any 2 simultaneous failures. RAID 1+0 (mirrored pairs, then striped): usable = (6/2) × 1 TB = 3 TB, survives 1 failure for certain and a second failure only if it does not hit the surviving partner of an already-failed pair.

8. A file has mode 754. Rewrite this as an rwx string and state exactly who may write to the file.
   7 = 4+2+1 = rwx (owner). 5 = 4+1 = r-x (group). 4 = 4 = r-- (others). String: rwxr-xr--. Only the owner may write; group members may read and execute but not write, and others may only read.

9. Four disks in an array each independently fail 2% of the time in a given year, and failures are independent. What is the approximate probability that a RAID 5 array of these 4 disks loses data during the year (i.e. two or more fail)?
   P(a given disk survives) = 0.98. P(0 failures) = 0.98^4 ≈ 0.9224. P(exactly 1 failure) = C(4,1) × 0.02 × 0.98^3 ≈ 4 × 0.02 × 0.9412 ≈ 0.0753. P(at most 1 failure, i.e. RAID 5 survives) ≈ 0.9224 + 0.0753 ≈ 0.9977. P(data lost, two or more fail) ≈ 1 − 0.9977 = 0.0023, about 0.23%.

10. A context switch aside, a process reads a file sequentially in 4 KB chunks from a disk with contiguous allocation versus linked allocation, both with 4 KB blocks. Explain, without arithmetic, why contiguous allocation's advantage over linked allocation almost disappears for this specific access pattern.
    Linked allocation's cost, versus contiguous, is having to fetch a pointer from the previous block to find the next one — but for pure sequential access, the process is already reading block k before it needs block k+1, so the pointer to block k+1 is already sitting in memory (it came along with block k's own data) by the time it is needed; no extra disk access is incurred purely for the pointer. The two schemes differ sharply for direct (random) access, where linked allocation must walk the chain from the start, and negligibly for sequential access, which is exactly the pattern linked allocation was designed to remain competitive on.

WHAT COMES NEXT

This closes the syllabus's account of how an operating system manages every resource a program can touch: the CPU (processes and scheduling), memory (paging and segmentation), coordination between programs (synchronisation and deadlock), and now persistent storage (files, disks and I/O). Every one of those chapters solved the same underlying tension in a different setting — a scarce, slow or shared physical resource, and an abstraction layered on top of it that lets programs pretend the resource is generous, fast and private. Reading a byte from a file, dispatching a process, and servicing a page fault are all, underneath, the same kind of machinery: a request, a queue, a hardware limitation, and a policy for deciding what happens next.
`
};
