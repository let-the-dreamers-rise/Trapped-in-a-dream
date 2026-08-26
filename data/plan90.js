// 90-day GATE CS&IT mission plan — expands phase blocks into 90 concrete days.
// 12 h/day, ADHD-friendly: every day has a small number of concrete, checkable objectives.
window.GATE_DATA = window.GATE_DATA || {};
(function () {
  // [startDay, endDay, subjectKey, subjectName, topicSpread[]]
  // topicSpread lists topic ids in teaching order; they are distributed across the block's days.
  var blocks = [
    [1, 7, 'engmath', 'Engineering Mathematics', ['engmath-discrete-logic','engmath-sets-relations','engmath-groups','engmath-graph-theory','engmath-combinatorics','engmath-linear-algebra','engmath-calculus','engmath-probability']],
    [8, 13, 'pds', 'Programming & Data Structures', ['pds-c-basics','pds-pointers','pds-recursion','pds-stacks-queues','pds-linked-lists','pds-trees','pds-heaps','pds-hashing','pds-graphs-rep']],
    [14, 19, 'algo', 'Algorithms', ['algo-asymptotic','algo-divide-conquer','algo-greedy','algo-dp','algo-graph','algo-sorting-searching']],
    [20, 24, 'digital', 'Digital Logic', ['digital-number-systems','digital-boolean','digital-combinational','digital-sequential','digital-arithmetic']],
    [25, 30, 'coa', 'Computer Organization', ['coa-instructions','coa-datapath','coa-pipelining','coa-memory','coa-io']],
    [31, 37, 'os', 'Operating Systems', ['os-processes','os-scheduling','os-sync','os-deadlock','os-memory','os-virtual-memory','os-file-disk']],
    [38, 44, 'dbms', 'Databases', ['dbms-er','dbms-ra-sql','dbms-normalization','dbms-indexing','dbms-transactions']],
    [45, 51, 'cn', 'Computer Networks', ['cn-basics','cn-datalink','cn-network','cn-transport','cn-application']],
    [52, 57, 'toc', 'Theory of Computation', ['toc-regular','toc-cfl','toc-turing','toc-decidability','toc-hierarchy']],
    [58, 64, 'compiler', 'Compiler Design', ['compiler-lexical','compiler-parsing','compiler-sdt','compiler-icg','compiler-runtime','compiler-optimization']]
  ];

  // Revision cycle order for days 65-90 (highest weight first)
  var revCycle = ['algo','pds','os','engmath','dbms','cn','coa','toc','digital','compiler','apti'];
  var revNames = { engmath:'Engineering Maths', digital:'Digital Logic', coa:'COA', pds:'Programming & DS', algo:'Algorithms', toc:'TOC', compiler:'Compiler Design', os:'Operating Systems', dbms:'DBMS', cn:'Computer Networks', apti:'Aptitude' };

  var days = [];

  function pushDay(d) { days.push(d); }

  // Phase 1 & 2: subject learning blocks
  blocks.forEach(function (b) {
    var start = b[0], end = b[1], key = b[2], name = b[3], topics = b[4];
    var nDays = end - start + 1;
    for (var i = 0; i < nDays; i++) {
      var dayNo = start + i;
      // distribute topics across days
      var from = Math.floor(i * topics.length / nDays);
      var to = Math.floor((i + 1) * topics.length / nDays);
      var todays = topics.slice(from, Math.max(to, from + 1));
      var tasks = [];
      todays.forEach(function (t) {
        tasks.push({ text: 'Read theory (Intro → Core → Strategy): ' + t.replace(key + '-', '').replace(/-/g, ' '), topic: t, kind: 'theory' });
        tasks.push({ text: 'Solve topic quiz to 85%+ accuracy: ' + t.replace(key + '-', '').replace(/-/g, ' '), topic: t, kind: 'quiz' });
      });
      tasks.push({ text: 'Redo every question you got wrong today (the app queues them for you)', kind: 'review' });
      tasks.push({ text: '45 min Aptitude drills (non-negotiable — 15 free marks live here)', topic: 'apti', kind: 'quiz' });
      if (key !== 'engmath') tasks.push({ text: '15 min discrete maths warm-up — 10 quick questions (the AIR-1 daily habit)', topic: 'engmath-discrete-logic', kind: 'quiz' });
      tasks.push({ text: '30 min recall: close the app, write everything you remember on paper', kind: 'recall' });
      pushDay({
        day: dayNo,
        phase: dayNo <= 30 ? 1 : 2,
        title: name + ' — day ' + (i + 1) + '/' + nDays,
        focus: [key, 'apti'],
        quota: 60,
        tasks: tasks,
        mock: false
      });
    }
  });

  // Milestone mocks inside phase 1-2
  [[30, 50, 'MOCK #1 — Full syllabus so far. Target: 50/100.'],
   [45, 60, 'MOCK #2 — Target: 60/100.'],
   [60, 70, 'MOCK #3 — Target: 70/100.']].forEach(function (m) {
    var d = days.find(function (x) { return x.day === m[0]; });
    if (d) {
      d.mock = true;
      d.target = m[1];
      d.tasks.unshift({ text: m[2] + ' Take it in the Mock tab under real timing. Then spend 2 h analysing every mistake.', kind: 'mock' });
    }
  });

  // Phase 3: days 65-90 revision + mocks (day 61-64 are compiler block end + start of revision handled above until 64)
  for (var dayNo = 65; dayNo <= 90; dayNo++) {
    var idx = dayNo - 65;
    var isMockDay = (dayNo % 2 === 1) || dayNo >= 86; // alternate days + daily in last week
    var subj = revCycle[idx % revCycle.length];
    var tasks = [];
    var target = 70 + Math.round((dayNo - 65) * (20 / 25)); // ramps 70 → 90
    if (isMockDay) {
      tasks.push({ text: 'FULL MOCK under exam conditions (3 h, no phone breaks). Target: ' + target + '/100.', kind: 'mock' });
      tasks.push({ text: '2 h post-mortem: for every wrong/skipped question write WHY in one line (concept gap / silly / time)', kind: 'review' });
      tasks.push({ text: 'Drill the 2 weakest topics the Progress tab shows (40 questions each)', kind: 'quiz' });
    } else {
      tasks.push({ text: 'Deep revision: ' + revNames[subj] + ' — reread every Strategy section, redo all hard questions', topic: null, kind: 'theory', subject: subj });
      tasks.push({ text: '120 mixed questions across ' + revNames[subj] + ' (use infinite mode — it resurfaces your mistakes)', kind: 'quiz', subject: subj });
      tasks.push({ text: '45 min Aptitude + 15 min discrete warm-up + 30 min formula-sheet recall on paper', kind: 'recall' });
    }
    tasks.push({ text: 'Sleep 7 h minimum. A tired brain scores like rank 5000.', kind: 'health' });
    pushDay({
      day: dayNo,
      phase: 3,
      title: isMockDay ? 'Mock + surgical analysis' : 'Revision sprint — ' + revNames[subj],
      focus: isMockDay ? [] : [subj],
      quota: isMockDay ? 65 : 120,
      tasks: tasks,
      mock: isMockDay,
      target: isMockDay ? target : undefined
    });
  }

  days.sort(function (a, b) { return a.day - b.day; });
  window.GATE_DATA.plan = days;

  // The daily 12-hour ADHD-friendly block template shown on the Today screen
  window.GATE_DATA.dayTemplate = [
    '06:30–07:00  Wake, water, 10 min movement. No phone scrolling.',
    '07:00–08:30  Block 1 — NEW theory (hardest thing first, brain is freshest)',
    '08:30–09:00  Breakfast + walk (real break, not reels)',
    '09:00–10:30  Block 2 — Questions on the theory you just read',
    '10:30–10:50  Break',
    '10:50–12:20  Block 3 — Questions continued / second topic theory',
    '12:20–13:30  Lunch + 20 min nap (set alarm)',
    '13:30–15:00  Block 4 — Topic quiz to 85% accuracy',
    '15:00–15:20  Break',
    '15:20–16:50  Block 5 — Mixed/PYQ-style practice',
    '16:50–17:30  Exercise / shower',
    '17:30–19:00  Block 6 — Wrong-answer redo queue',
    '19:00–20:00  Dinner',
    '20:00–21:00  Block 7 — Aptitude drills',
    '21:00–21:45  Block 8 — Paper recall + formula sheet',
    '21:45–22:30  Wind down. Same sleep time every night.'
  ];
})();
